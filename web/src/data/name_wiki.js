// data/name_wiki.js — loader for the Wikipedia REST summaries of the 293 biblical
// names readable in the sky (185 Patriarchs/Conquest persons + 108 places), baked at
// build time by scripts/build_name_wiki.mjs into name_wiki.json. Keyed by the entry slug
// (== figure.slug on NameFicha), so the ficha looks up `NAME_WIKI[figure.slug]`.
// Bundled at build time (esbuild JSON import) so the ficha renders the Wikipedia block
// (image + description + extract) server-side with no async load — same pattern as
// wiki_content.json for the prophet/mage fichas. Only entries Wikipedia actually has an
// article for are present; the rest fall back to graceful absence on the ficha.
import NAME_WIKI_JSON from './name_wiki.json';

export const NAME_WIKI = NAME_WIKI_JSON;
export function nameWikiEntry(slug) {
  return NAME_WIKI[slug] || null;
}