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

const FILES = { 'lexicon.json': 'lexicon.json', 'alignments.json': 'alignments.json', 'angels72.json': 'angels72.json', 'name_refs.json': 'name_refs.json', 'genesis_els.json': 'data/genesis_els.json', 'psalms_he.json': 'data/psalms_he.json' };
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

const { App, ProphetsPage, MagesPage, AlignmentFicha, ProphetFicha, MageFicha, Landing, About, WarningModal } = await import('./test-entry.bundle.mjs');

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
  // '/' is now the Landing page (the app moved to /app).
  check('home: landing hero renders', !!doc.querySelector('.hero'));
  check('home: hero title (Apocalypse of Adam)', /Apocalypse/.test(doc.querySelector('.hero-title')?.textContent || ''));
  check('home: slider renders', !!doc.querySelector('.slider'));
  check('home: feature grid renders', !!doc.querySelector('.feat-grid'));
  const featCount = doc.querySelectorAll('.feat-card').length;
  check('home: 8 feature cards', featCount === 8, `found ${featCount}`);
  check('home: entry CTA renders', !!doc.querySelector('.entry-cta'));
  check('footer renders', !!doc.querySelector('.site-footer'));
  check('footer: column grid renders', !!doc.querySelector('.ft-grid'));
  const ftH = doc.querySelectorAll('.ft-h').length;
  check('footer: 4 column headers', ftH === 4, `found ${ftH}`);
  check('footer: machine-readable section (llms.txt/sitemap)', /llms\.txt|sitemap/i.test(doc.body.textContent||''));
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
  check('route /mages: Llull card renders', /Ramon Llull/.test(html));
  check('route /mages: cards link to fichas', /href="\/mage\//.test(html));
} catch (e) { check('route /mages renders', false, String(e.message)); }

// --- mage ficha: /mage/<slug> has the works table + Wikipedia link (the hub no longer has them) ---
try {
  const slug = 'ramon-llull';
  const html = renderToStaticMarkup(React.createElement(MageFicha, { slug }));
  check('route /mage/ramon-llull: name renders', /Ramon Llull/.test(html));
  check('route /mage/ramon-llull: Description panel', /Description/.test(html));
  check('route /mage/ramon-llull: works table renders', /Work \/ contribution|Significance/.test(html));
  check('route /mage/ramon-llull: Wikipedia link', /en\.wikipedia\.org/.test(html));
} catch (e) { check('route /mage/ramon-llull renders', false, String(e.message)); }

// --- prophet ficha: /prophet/jacob-frank carries the Antichrist designation ---
try {
  const html = renderToStaticMarkup(React.createElement(ProphetFicha, { slug: 'jacob-frank' }));
  check('route /prophet/jacob-frank: name renders', /Jacob Frank/.test(html));
  check('route /prophet/jacob-frank: Antichrist designation', /Antichrist/.test(html));
  check('route /prophet/jacob-frank: works table renders', /Life & work in brief|Life &amp; work in brief/.test(html));
  check('route /prophet/jacob-frank: Wikipedia link', /en\.wikipedia\.org/.test(html));
} catch (e) { check('route /prophet/jacob-frank renders', false, String(e.message)); }

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

// --- Landing page (SSR) ---
try {
  const html = renderToStaticMarkup(React.createElement(Landing, { goApp: () => {} }));
  check('Landing: hero title renders', /Apocalypse/.test(html) && /of Adam/.test(html));
  check('Landing: slider + slides render', /slider/.test(html) && /stellar alphabet/i.test(html));
  check('Landing: feature cards render', /feat-card/.test(html) && /Gematria/.test(html));
  check('Landing: Adam quote (13th kingdom) in hero', /thirteenth kingdom/i.test(html) && /every birth of their ruler is a word/i.test(html));
  check('Landing: pseudo-philosophy section removed', !/archive no power can erase/i.test(html) && !/copies of copies/i.test(html));
  check('Landing: entry CTA + notice render', /Initiate/.test(html) && /schizophrenia/i.test(html));
} catch (e) { check('Landing renders', false, String(e.message)); }

// --- About page (SSR) ---
try {
  const html = renderToStaticMarkup(React.createElement(About));
  check('About: title renders', /About/.test(html) && /Apocalypse of Adam/.test(html));
  check('About: what-this-is section', /What this is/.test(html));
  check('About: open-the-app CTA links to /app', /href="\/app"/.test(html));
} catch (e) { check('About renders', false, String(e.message)); }

// --- WarningModal (SSR, open) ---
try {
  const html = renderToStaticMarkup(React.createElement(WarningModal, { open: true, onClose: () => {}, onProceed: () => {} }));
  check('WarningModal: title renders', /Before you enter/.test(html));
  check('WarningModal: self-check questions', /self-check/.test(html) && /Yes/.test(html));
  check('WarningModal: crisis resource', /988|crisis/i.test(html));
} catch (e) { check('WarningModal renders', false, String(e.message)); }

// --- /app route maps to the app shell (SSR: lex null → "Loading lexicon…") ---
// The global jsdom `window` (installed above for the mount test) would make
// parseRoute read window.location.pathname ('/') and ignore __ROUTE_PATH__, so
// the app shell never gets exercised. Temporarily drop window so the SSR render
// resolves the route from __ROUTE_PATH__ (as the hook intends), then restore.
try {
  globalThis.__ROUTE_PATH__ = '/app';
  const savedWin = globalThis.window;
  delete globalThis.window;
  const html = renderToStaticMarkup(React.createElement(App));
  globalThis.window = savedWin;
  check('route /app: renders app shell (not landing)', /Loading lexicon/.test(html) && !/hero-title/.test(html));
  delete globalThis.__ROUTE_PATH__;
} catch (e) { check('route /app renders', false, String(e.message)); globalThis.window = window; delete globalThis.__ROUTE_PATH__; }

const passed = results.filter((r) => r.ok).length;
const failed = results.filter((r) => !r.ok);
console.log(`\n=== jsdom mount test: ${passed}/${results.length} passed ===`);
for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.extra ? '  — ' + r.extra : ''}`);
// Force exit — the mounted Landing's auto-advancing Slider holds a setInterval that
// would otherwise keep the event loop alive and hang the test runner on success.
process.exit(failed.length ? 1 : 0);