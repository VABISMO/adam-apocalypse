// Footer.jsx — site footer.
// Three columns: the project, the corpus browser, and the reader/tools. Internal SPA-route
// links navigate client-side (pushState + popstate) instead of a full page reload — the
// click is delegated here so no onNav prop needs threading through every render site.
// External links (/paper, GitHub) keep the browser default. The <a href> stays intact as the
// no-JS fallback.
import React from 'react';

const GITHUB = 'https://github.com/VABISMO/adam-apocalypse';
const PAPER = '/paper';

// Routes the SPA owns (handled by parseRoute in App.jsx). Everything else starting with '/'
// (notably /paper) does a normal navigation. Matches a top-level segment + '/' or end, so it
// covers sub-routes too (/cycles/saros, /revelations/raziel, /library/<slug>, /time/ages…).
const SPA_RE = /^\/(prophet|mage|patriarch|place|align|reader|library|sky-map|reading|time|gematria|sigils|cycles|revelations|psalms|codes|prophets|mages|patriarchs|places|alignments|readings|app|about)(\/|$)/;

function goInternal(href){
  if(typeof window==='undefined') return;
  window.history.pushState({}, '', href);
  window.dispatchEvent(new PopStateEvent('popstate'));
  // scroll the profile/hub page to the top on navigation (no flash, no full reload)
  window.scrollTo(0, 0);
}

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
  // delegated click handler: if the clicked anchor is an internal SPA route, navigate
  // client-side instead of letting the browser do a full reload.
  const onClick = (e) => {
    if(e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a.ft-a');
    if(!a) return;
    const href = a.getAttribute('href') || '';
    if(SPA_RE.test(href)){ e.preventDefault(); goInternal(href); }
  };
  return <footer className="site-footer" onClick={onClick}>
    <div className="ft-grid">
      <Col title="The Apocalypse of Adam">
        <p className="ft-blurb">Hebrew letters read in the sky. Real planet positions map the 12 zodiac signs to the 12 simple letters, the 7 planets to the 7 double letters, and the 3 mothers to the fixed axis — the 22 letters of the Sefer Yetzirah — so every date spells a set of readable names, the stellar alphabet behind the paper.</p>
        <L href={PAPER}>The paper — The Alphabet from the Sky →</L>
        <L href={GITHUB} ext>Source on GitHub ↗</L>
      </Col>

      <Col title="Browse the corpus">
        <L href="/prophets">Prophets timeline — Adam to Jacob Frank</L>
        <L href="/mages">Magi timeline — Adapa to Aleister Crowley</L>
        <L href="/patriarchs">Patriarchs/Conquest — names readable in the sky</L>
        <L href="/places">Places — biblical toponyms readable in the sky</L>
        <L href="/alignments">Stellar alignments (267 fiches)</L>
        <L href="/readings">Sky readings (6045 glosses)</L>
      </Col>

      <Col title="Reader & tools">
        <L href="/library">Luco Library — source books</L>
        <L href="/sky-map">Sky map</L>
        <L href="/time">Time predictor · precessional ages</L>
        <L href="/gematria">Gematria</L>
        <L href="/sigils">Sigils · kameot · 72 angels</L>
        <L href="/revelations">Revelations (9 cultures)</L>
        <L href="/codes">Codes — ELS · temurah · ziruph</L>
        <L href="/psalms">Psalms by date</L>
        <L href="/app">Sky reader app</L>
      </Col>
    </div>

    <div className="ft-bottom">
      <span>© {year} <a href="https://medium.com/@ancientencoder/sons-of-stars-269765bda7db" target="_blank" rel="noreferrer">AncientEncoder</a> · The Apocalypse of Adam</span>
      <span className="ft-sep">·</span>
      <span>Hebrew letters in the stars · Sefer Yetzirah stellar alphabet</span>
    </div>
  </footer>;
}

export { Footer };