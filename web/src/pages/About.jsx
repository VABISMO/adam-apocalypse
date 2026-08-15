// pages/About.jsx — About page (top-level /about). For now: what the project is,
// how it works, who made it, and where to go next. Reachable from the navbar.
import React from 'react';
import { AGE, PREC, FULL } from "../core.jsx";
import { APOCALYPSE_ADAM } from "../data/apocalypse_adam.mjs";

function About(){
  return (
    <div className="about-page">
      <h1 style={{fontSize:'1.9rem',marginBottom:4}}>About <span style={{color:'var(--gold)'}}>The Apocalypse of Adam</span></h1>
      <div className="sub" style={{marginBottom:16}}>Hebrew letters read in the sky — a stellar-alphabet reader behind the paper <i>The Alphabet from the Sky</i>.</div>

      <div className="panel" style={{padding:18,marginBottom:14}}>
        <h2 style={{marginTop:0}}>What this is</h2>
        <p><i>Apocalypse</i> means <b style={{color:'var(--gold)'}}>revelation</b> — the unveiling of knowledge, not something sinister. This project reads the sky as the ancients did: real planet positions (computed live by astronomy-engine) map the <b>12 zodiac signs</b> to the <b>12 simple letters</b>, the <b>7 planets</b> to the <b>7 double letters</b>, and the <b>3 mothers</b> to the <b>fixed axis</b> — the 22 letters of the <a href="https://en.wikipedia.org/wiki/Sefer_Yetirah" target="_blank" rel="noreferrer">Sefer Yetzirah</a>. Every date spells a set of readable Hebrew names — a stellar alphabet that no one can erase, encoded across the only medium that survives the malice of men.</p>
        <p>The app is a calculator suite: a live <b>Sky Map</b>, a <b>Reader</b> of every readable word, the <b>Reading Rule</b> (YHVH, Genesis 1:1), a <b>Time</b> predictor and precessional ages, <b>Gematria</b> (Hebrew / Greek / Arabic / Indian), the <b>Sigil</b> forge, the <b>72</b> Shem HaMephorash angels, <b>ELS / Torah codes</b>, Temurah, Ziruph, rare stellar <b>Alignments</b>, a 9-culture <b>Revelations</b> survey, and <b>Psalms</b> by date.</p>
      </div>

      <div className="panel" style={{padding:18,marginBottom:14}}>
        <h2 style={{marginTop:0}}>The Apocalypse of Adam</h2>
        <p className="muted" style={{marginBottom:14}}>The source text this project is named after — a Gnostic revelation from the <i>Nag Hammadi Library</i> (Codex V,5), translated by George W. MacRae. It is the passage of the <b>thirteenth kingdom</b> — <i>every birth of their ruler is a word</i> — that the stellar reader decodes.</p>
        <div className="apoc-intro">{APOCALYPSE_ADAM.intro}</div>
        <div className="apoc-body">
          {APOCALYPSE_ADAM.paragraphs.map((p,i)=> <p key={i}>{p}</p>)}
        </div>
        <p className="muted" style={{fontSize:'.78rem',marginTop:16,borderTop:'1px solid var(--line)',paddingTop:12}}>Translation by George W. MacRae, Coptic Gnostic Library Project (Institute for Antiquity and Christianity, Claremont). For academic citation refer to the published edition. The complete text is also in the <a href="/library/nag-hammadi">Nag Hammadi Library</a> entry of the Luco Library.</p>
      </div>

      <div className="grid2">
        <div className="panel" style={{padding:16}}>
          <h2 style={{marginTop:0}}>How a reading works</h2>
          <p className="muted">The <b>3 mothers</b> (א מ ש) sit on a fixed circumpolar axis. The <b>7 doubles</b> (ב ג ד כ פ ר ת) are the 7 moving bodies. The <b>12 simples</b> are the 12 signs. A word is readable on a date when every simple it needs sits in an <b>occupied</b> sign (S⊆O). Rare alignments concentrate the planets — fewer letters, fewer words, a sharper reading.</p>
        </div>
        <div className="panel" style={{padding:16}}>
          <h2 style={{marginTop:0}}>The numbers, briefly</h2>
          <ul className="muted" style={{margin:'6px 0 0',paddingLeft:20}}>
            <li><b style={{color:'var(--gold)'}}>6,045</b> consonantal Hebrew roots in the lexicon.</li>
            <li><b style={{color:'var(--gold)'}}>267</b> rare century/millennium alignments catalogued.</li>
            <li><b style={{color:'var(--gold)'}}>72</b> Shem HaMephorash triplets (Exodus 14:19–21).</li>
            <li>Precessional age length ≈ <b>{AGE.toFixed(0)}</b> years; full cycle ≈ <b>{(FULL||0).toFixed(0)}</b> years.</li>
          </ul>
        </div>
      </div>

      <div className="panel" style={{padding:18,marginTop:14}}>
        <h2 style={{marginTop:0}}>Authors &amp; sources</h2>
        <p className="muted">By <b><a href="https://medium.com/@ancientencoder/sons-of-stars-269765bda7db" target="_blank" rel="noreferrer" style={{color:'inherit',textDecoration:'none'}}>AncientEncoder</a></b> · Source on <a href="https://github.com/VABISMO/adam-apocalypse" target="_blank" rel="noreferrer">GitHub</a> · Paper: <a href="/paper">The Alphabet from the Sky</a>.</p>
        <p className="muted">Ephemerides: astronomy-engine. Frame: Sefer Yetzirah. Lexicon: Strong Hebrew lexicon (OpenScriptures). No content on this site is medical, financial, or doctrinal advice — it is a reading of symbols and astronomy.</p>
        <div style={{marginTop:12}}><a className="btn-cta" href="/app" style={{display:'inline-block',textDecoration:'none'}}>Open the app →</a></div>
      </div>
    </div>
  );
}

export { About };