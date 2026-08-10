// pages/ProphetsPage.jsx — /prophets: the prophet lineage Adam → Jacob Frank, as a
// timeline + per-figure cards. Presentational (renders identically server & client).
import React from 'react';
import { PROPHETS } from '../data/prophets.js';
import { Timeline, fmtYear } from '../components/Timeline.jsx';

function wiki(name){ return 'https://en.wikipedia.org/wiki/'+encodeURIComponent(name.replace(/ /g,'_')); }

function ProphetCard({p}){
  const dates = (p.y0===p.y1) ? fmtYear(p.y0) : `${fmtYear(p.y0)} – ${fmtYear(p.y1)}`;
  const end = !!p.endpoint;
  return <div className={'tcard'+(end?' always':'')} style={end?{borderColor:'var(--gold)',boxShadow:'0 0 0 1px var(--gold)'}:null}>
    <div className="the">{p.he && <span className="he" style={{fontSize:'1.5rem',marginLeft:6}}>{p.he}</span>} {end && <span className="pill" style={{color:'var(--gold)',borderColor:'var(--gold)'}}>endpoint</span>}</div>
    <div className="read"><a href={wiki(p.name)} target="_blank" rel="noreferrer" style={{color:'inherit',textDecoration:'none'}}>{p.name}</a></div>
    <div className="trans">{dates} · {p.region}</div>
    <div className="g"><span className="pill" style={{fontSize:'.7rem'}}>{p.thread}</span></div>
    <div className="simp">{p.role}</div>
  </div>;
}

function ProphetsPage(){
  const span = `${fmtYear(PROPHETS[0].y0)} – ${fmtYear(PROPHETS[PROPHETS.length-1].y1)}`;
  return <div>
    <h1>Prophets — from Adam to Jacob Frank</h1>
    <p className="muted">A chronology of prophetic and revelatory figures, from the first human <span className="he">אדם</span> through the biblical prophets, the second-temple and apocalyptic writers, the early-Christian and merkabah-mystical tradition, down to the Sabbatean–Frankist thread whose endpoint is <b style={{color:'var(--gold)'}}>Jacob Frank (1726–1791)</b>. {PROPHETS.length} figures across {span}. Each card links to its Wikipedia page.</p>
    <div className="panel" style={{padding:14,marginBottom:14}}>
      <Timeline items={PROPHETS} title="Prophet timeline — Adam to Jacob Frank" accent="#7fb0ff"/>
    </div>
    <div className="tcards">
      {PROPHETS.map((p,i)=><ProphetCard key={i} p={p}/>)}
    </div>
  </div>;
}

export { ProphetsPage };