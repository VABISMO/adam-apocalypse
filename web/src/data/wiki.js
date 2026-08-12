// data/wiki.js — loader for the Wikipedia profile content (scraped by
// scripts/scrape_wikipedia.mjs into wiki_content.json, keyed by figure name).
// Bundled at build time (esbuild JSON import) so profile pages render immediately,
// server-side and client-side, with no async load.
import WIKI_JSON from './wiki_content.json';

export const WIKI = WIKI_JSON;

export function wikiEntry(name) {
  return WIKI[name] || null;
}

// stable URL slug for a figure name, e.g. "Jacob Frank" → "jacob-frank",
// "Felipe II of Spain" → "felipe-ii-of-spain", "Shadrach (Hananiah)" → "shadrach-hananiah".
export function slugify(name) {
  return String(name).toLowerCase().replace(/[()]/g, ' ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function deslugify(slug) {
  // best-effort reverse; the route handler matches by recomputing slugify over the list.
  return decodeURIComponent(String(slug)).replace(/-/g, ' ');
}