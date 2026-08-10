// seo.jsx — SEO library: base title/description + per-route <title>/<meta> updates.
// The static <title> and <meta name="description"> live in index.html (for crawlers that
// don't run JS); this module updates them per route so each shareable deep link
// (#/reader/<he>) and the home view carry a meaningful, keyworded title + description.

const BASE_TITLE = 'Hebrew Letters in the Stars · Sefer Yetzirah Stellar Alphabet & Sky Reader';
const BASE_DESC = 'Read Hebrew words written in the sky: real planet positions (astronomy-engine) map the 12 zodiac signs to the 12 simple letters of the Sefer Yetzirah, so every date spells a set of readable names. Stellar alphabet, gematria, 72 angels, ELS / Torah codes, Temurah, Ziruph, rare planetary alignments, Psalms-by-date — the live calculators behind The Apocalypse of Adam.';

// set one <meta name="..."> content; no-op outside a browser.
function setMeta(name, content){
  if(typeof document==='undefined') return;
  const m = document.querySelector(`meta[name="${name}"]`);
  if(m) m.setAttribute('content', content);
}

// apply a title + description to the document (per-route SEO).
function setRouteMeta(title, desc){
  if(typeof document==='undefined') return;
  document.title = title;
  setMeta('description', desc);
}

export { BASE_TITLE, BASE_DESC, setMeta, setRouteMeta };