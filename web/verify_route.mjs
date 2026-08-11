// verify_route.mjs — verify the trailing-slash parseRoute fix actually stops the
// redirect-to-home bug. Mounts the REAL app bundle in jsdom at URL /prophets/ (the
// trailing-slash URL static hosts serve) and confirms the client renders ProphetsPage,
// not home. This is the exact scenario the user reported ("carga 1 segundo y se
// redirecciona a la home").
import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';

const ROUTES = [
  { url: 'http://127.0.0.1:8008/prophets/', label: '/prophets/ (trailing slash)',
    expect: ['Prophets — from Adam to Jacob Frank', 'timeline-wrap'] },
  { url: 'http://127.0.0.1:8008/mages/', label: '/mages/ (trailing slash)',
    expect: ['Magi — from Daniel to Felipe II', 'timeline-wrap'] },
  { url: 'http://127.0.0.1:8008/alignments/', label: '/alignments/ (trailing slash)',
    expect: ['Alignments'] },
  { url: 'http://127.0.0.1:8008/readings/', label: '/readings/ (trailing slash)',
    expect: ['Reader', 'readable'] },
  { url: 'http://127.0.0.1:8008/prophets', label: '/prophets (no slash)',
    expect: ['Prophets — from Adam to Jacob Frank', 'timeline-wrap'] },
];

const FILES = { 'lexicon.json': 'lexicon.json', 'alignments.json': 'alignments.json', 'angels72.json': 'angels72.json', 'genesis_els.json': 'data/genesis_els.json', 'psalms_he.json': 'data/psalms_he.json' };
function makeFetch() {
  return (url) => {
    const name = String(url).replace(/^.*\//, '');
    if (FILES[name]) {
      const body = readFileSync(new URL(FILES[name], import.meta.url), 'utf8');
      return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve(JSON.parse(body)), text: () => Promise.resolve(body) });
    }
    return Promise.resolve({ ok: false, status: 404, json: () => Promise.resolve(null), text: () => Promise.resolve('') });
  };
}

let pass = 0, fail = 0;
for (const r of ROUTES) {
  const dom = new JSDOM(`<!doctype html><html><head><meta charset="utf-8"></head><body><div id="root"></div></body></html>`,
    { url: r.url, pretendToBeVisual: true });
  const { window } = dom;
  window.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
  window.cancelAnimationFrame = (id) => clearTimeout(id);
  window.Element.prototype.scrollIntoView = function () {};
  window.HTMLElement.prototype.scrollIntoView = function () {};
  const f = makeFetch();
  window.fetch = f;

  // fresh globals for each route so parseRoute reads the right window.location
  globalThis.window = window;
  globalThis.document = window.document;
  globalThis.navigator = window.navigator;
  globalThis.requestAnimationFrame = window.requestAnimationFrame;
  globalThis.cancelAnimationFrame = window.cancelAnimationFrame;
  globalThis.fetch = f;

  // re-import fresh per route (cache-bust via query)
  const mod = await import(`./test-entry.bundle.mjs?route=${encodeURIComponent(r.label)}`);
  const root = window.document.getElementById('root');
  let err = null;
  try {
    await act(async () => { createRoot(root).render(React.createElement(mod.App)); });
  } catch (e) { err = e; }
  await new Promise((res) => setTimeout(res, 700));

  const bodyText = window.document.body.textContent || '';
  const bodyHtml = window.document.body.innerHTML || '';
  if (err) {
    console.log(`FAIL  ${r.label}  — threw: ${err.message}`); fail++;
    continue;
  }
  let ok = true, missing = [];
  for (const ex of r.expect) {
    if (!bodyText.includes(ex) && !bodyHtml.includes(ex)) { ok = false; missing.push(ex); }
  }
  // The expected markers are unique to each dedicated page (they do not appear on home),
  // so ok=true is sufficient proof the route resolved to its page, not home. Every
  // dedicated route also renders TabsBar (with "Cycles"/"Sky Map" labels), so we cannot
  // use those tab labels to detect home — discriminate by the dedicated-page h1 instead.
  if (ok) {
    console.log(`PASS  ${r.label}  — routed to dedicated page (${r.expect.join(' / ')})`); pass++;
  } else {
    console.log(`FAIL  ${r.label}  — missing=[${missing.join(',')}]`); fail++;
  }
}
console.log(`\n=== route verification: ${pass}/${pass+fail} passed ===`);
process.exit(fail ? 1 : 0);