// Footer.jsx — site footer: SEO hub pages + source links (incl. the paper & this repo on GitHub).
import React from 'react';

function Footer(){
  const hub = (to, label)=> <a href={to}>{label}</a>;
  return <footer className="site-footer" style={{marginTop:18, paddingTop:14, borderTop:'1px solid var(--line)'}}>
    <div className="footer-hubs" style={{display:'flex',flexWrap:'wrap',gap:'4px 18px',justifyContent:'center',marginBottom:10,fontSize:'.86rem'}}>
      {hub('/prophets','Prophets timeline')}
      <span className="muted">·</span>
      {hub('/mages','Magi timeline')}
      <span className="muted">·</span>
      {hub('/alignments','Stellar alignments')}
      <span className="muted">·</span>
      {hub('/readings','Sky readings')}
      <span className="muted">·</span>
      {hub('/','Sky reader app')}
    </div>
    <div className="note" style={{textAlign:'center'}}>
      Positions: <a href="https://github.com/cosinekitty/astronomy-engine" target="_blank" rel="noreferrer">astronomy-engine</a> · frame: <a href="https://en.wikipedia.org/wiki/Sefer_Yetirah" target="_blank" rel="noreferrer">Sefer Yetzirah</a> · lexicon: <a href="https://github.com/openscriptures/HebrewLexicon" target="_blank" rel="noreferrer">Strong (OpenScriptures)</a> · paper: <a href="https://adam-apocalypse-paper.onrender.com/" target="_blank" rel="noreferrer">The Reader of the Sky</a> · source: <a href="https://github.com/VABISMO/adam-apocalypse" target="_blank" rel="noreferrer">GitHub</a>
    </div>
  </footer>;
}

export { Footer };