// data/name_verses.js — loader for the actual Bible verse text (Hebrew + English) of the
// 293 biblical names readable in the sky (185 Patriarchs/Conquest persons + 108 places),
// baked at build time by scripts/build_name_verses.mjs into name_verses.json (one Sefaria
// API call per unique ref). Keyed by the entry slug (== figure.slug on NameFicha), so the
// profile looks up `NAME_VERSES[figure.slug]` and renders the verse content (not just the
// citation) server-side with no async load — same build-time-bake pattern as name_wiki.js.
// Entries without a resolvable Sefaria path are absent; the profile falls back gracefully.
import NAME_VERSES_JSON from './name_verses.json';

export const NAME_VERSES = NAME_VERSES_JSON;
export function nameVerse(slug) {
  return NAME_VERSES[slug] || null;
}