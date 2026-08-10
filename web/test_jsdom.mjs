// jsdom runtime mount test. Stubs fetch with local JSON, mounts <App/> via createRoot,
// and asserts home tabs render; then renderToStaticMarkup the dedicated path pages.
import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { renderToStaticMarkup } from 'react-dom/server';

const ROOT_HTML = `<!doctype html><html><head><meta charset="utf-8"></head><body><div id="root"></div></body></html>`;
const dom = new JSDOM(ROOT_HTML, { url: 'http://127.0.0.1:8008/', pretendToBeVisual: true });
const { window } = dom;

window.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
window.cancelAnimationFrame = (id) => clearTimeout(id);
window.Element.prototype.scrollIntoView = function () {};
window.HTMLElement.prototype.scrollIntoView = function () {};

globalThis.window = window;
globalThis.document = window.document;
globalThis.navigator = window.navigator;
globalThis.requestAnimationFrame = window.requestAnimationFrame;
globalThis.cancelAnimationFrame = window.cancelAnimationFrame;

const FILES = { 'lexicon.json': 'lexicon.json', 'alignments.json': 'alignments.json', 'angels72.json': 'angels72.json', 'genesis_els.json': 'data/genesis_els.json', 'psalms_he.json': 'data/psalms_he.json' };
globalThis.fetch = (url) => {
  const name = String(url).replace(/^.*\//, '');
  if (FILES[name]) {
    const body = readFileSync(new URL(FILES[name], import.meta.url), 'utf8');
    return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve(JSON.parse(body)), text: () => Promise.resolve(body) });
  }
  return Promise.resolve({ ok: false, status: 404, json: () => Promise.resolve(null), text: () => Promise.resolve('') });
};
window.fetch = globalThis.fetch;

const results = [];
const check = (name, cond, extra) => results.push({ name, ok: !!cond, extra: extra || '' });

const { App, ProphetsPage, MagesPage, AlignmentFicha } = await import('./test-entry.bundle.mjs');

// --- mount App ---
const root = window.document.getElementById('root');
let mountErr = null;
try {
  await act(async () => {
    createRoot(root).render(React.createElement(App));
  });
} catch (e) {
  mountErr = e;
}
await new Promise((r) => setTimeout(r, 800)); // let fetch + scanYear effects settle

const doc = window.document;
if (mountErr) {
  check('App mounts without throwing', false, String(mountErr && mountErr.message));
} else {
  check('App mounts without throwing', root.childNodes.length > 0);
  check('home: tab bar renders', !!doc.querySelector('.tabs'));
  const tabCount = doc.querySelectorAll('.tab').length;
  check('home: 11 tabs present', tabCount === 11, `found ${tabCount}`);
  check('home: panel content renders', !!doc.querySelector('.panel'));
  check('footer renders', !!doc.querySelector('.site-footer'));
  check('footer: column grid renders', !!doc.querySelector('.ft-grid'));
  const ftH = doc.querySelectorAll('.ft-h').length;
  check('footer: 4 column headers', ftH === 4, `found ${ftH}`);
  check('footer: machine-readable section (llms.txt/sitemap)', /llms\.txt|sitemap/i.test(doc.body.textContent||''));
  // Cycles → Alignments is default; the alignments list or sky map should be present
  const bodyText = doc.body.textContent || '';
  check('home: Cycles/Alignments default content', /alignment|sky|zodiac|cycle/i.test(bodyText));
}

// --- dedicated path pages via SSR (presentational) ---
try {
  const html = renderToStaticMarkup(React.createElement(ProphetsPage));
  check('route /prophets: h1 renders', /Prophets — from Adam to Jacob Frank/.test(html));
  check('route /prophets: timeline svg', /timeline-wrap/.test(html));
  check('route /prophets: Jacob Frank marked', /Jacob Frank/.test(html));
} catch (e) { check('route /prophets renders', false, String(e.message)); }

try {
  const html = renderToStaticMarkup(React.createElement(MagesPage));
  check('route /mages: h1 renders', /Magi — from Daniel to Felipe II/.test(html));
  check('route /mages: timeline svg', /timeline-wrap/.test(html));
  check('route /mages: Felipe II marked', /Felipe II/.test(html));
  check('route /mages: Llull bio renders (Ars Magna)', /Ars generalis ultima|Ars Magna|Ramon Llull/.test(html));
  check('route /mages: works table renders', /Work \/ contribution|Significance/.test(html));
  check('route /mages: Wikipedia links render', /en\.wikipedia\.org/.test(html));
} catch (e) { check('route /mages renders', false, String(e.message)); }

try {
  const lex = JSON.parse(readFileSync(new URL('lexicon.json', import.meta.url), 'utf8'));
  const angelMap = new Map();
  const html = renderToStaticMarkup(
    React.createElement(AlignmentFicha, { date: '2000-05-05', lex, angelMap, onBack: () => {} })
  );
  check('route /align/<date>: h1 renders', /Stellar alignment/.test(html));
  check('route /align/<date>: metrics table', /Alignment metrics/.test(html));
  check('route /align/<date>: produces markup', html.length > 500, `${html.length} chars`);
} catch (e) { check('route /align/<date> renders', false, String(e.message)); }

const passed = results.filter((r) => r.ok).length;
const failed = results.filter((r) => !r.ok);
console.log(`\n=== jsdom mount test: ${passed}/${results.length} passed ===`);
for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.extra ? '  — ' + r.extra : ''}`);
if (failed.length) process.exit(1);