// Footer.jsx — professional multi-column site footer.
// Columns by type: the project, hub pages, data & sources, machine-readable endpoints.
import React from 'react';

const GITHUB = 'https://github.com/VABISMO/adam-apocalypse';
const PAPER = '/paper';

function Col({ title, children }){
  return <section className="ft-col">
    <h4 className="ft-h">{title}</h4>
    {children}
  </section>;
}
function L({ href, children, ext=false }){
  return <a className="ft-a" href={href} {...(ext ? { target:'_blank', rel:'noreferrer' } : {})}>{children}</a>;
}

function Footer(){
  const year = 2026;
  return <footer className="site-footer">
    <div className="ft-grid">
      <Col title="The Apocalypse of Adam">
        <p className="ft-blurb">Hebrew letters read in the sky. Real planet positions map the 12 zodiac signs to the 12 simple letters of the Sefer Yetzirah, so every date spells a set of readable names — the stellar alphabet behind the paper.</p>
        <L href={PAPER}>The paper — The Reader of the Sky →</L>
        <L href={GITHUB} ext>Source on GitHub ↗</L>
      </Col>

      <Col title="Hub pages">
        <L href="/prophets">Prophets timeline — Adam to Jacob Frank</L>
        <L href="/mages">Magi timeline — Daniel to Felipe II</L>
        <L href="/alignments">Stellar alignments (267 fiches)</L>
        <L href="/readings">Sky readings (6045 glosses)</L>
        <L href="/">Sky reader app</L>
      </Col>

      <Col title="Data & sources">
        <L href="https://github.com/cosinekitty/astronomy-engine" ext>astronomy-engine — ephemerides ↗</L>
        <L href="https://en.wikipedia.org/wiki/Sefer_Yetirah" ext>Sefer Yetzirah — the frame ↗</L>
        <L href="https://github.com/openscriptures/HebrewLexicon" ext>Strong Hebrew lexicon ↗</L>
        <L href="/angels72.json">72 Shem HaMephorash angels (JSON)</L>
        <L href="/alignments.json">Rare alignments dataset (JSON)</L>
      </Col>

      <Col title="For search & AI">
        <L href="/sitemap.xml">Sitemap index</L>
        <L href="/llms.txt">llms.txt — guide for LLMs</L>
        <L href="/robots.txt">robots.txt</L>
        <L href="/site.webmanifest">Web app manifest</L>
        <p className="ft-note">This page exposes <b>WebMCP</b> tools (read_sky, alignment_metrics, word_gloss, search_words, gematria_value, prophet_info, mage_info) for browser AI agents via <code>document.modelContext</code>.</p>
      </Col>
    </div>

    <div className="ft-bottom">
      <span>© {year} V. Nos &amp; Julian S. · The Apocalypse of Adam</span>
      <span className="ft-sep">·</span>
      <span>Hebrew letters in the stars · Sefer Yetzirah stellar alphabet</span>
    </div>
  </footer>;
}

export { Footer };