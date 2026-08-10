// pages/MagesPage.jsx — /mages: the magi lineage Daniel → Felipe II, as a timeline +
// per-mage cards with Wikipedia-grounded bios and a "ficha" of their most important works.
// Presentational (renders identically server & client).
import React from 'react';
import { MAGES } from '../data/mages.js';
import { MAGES_CONTENT } from '../data/mages-content.js';
import { Timeline, fmtYear } from '../components/Timeline.jsx';

function wiki(name){ return 'https://en.wikipedia.org/wiki/'+encodeURIComponent(name.replace(/ /g,'_')); }

function MageCard({m}){
  const c = MAGES_CONTENT[m.name] || {};
  const dates = m.years || `${fmtYear(m.y0)} – ${fmtYear(m.y1)}`;
  const end = !!m.endpoint;
  const bio = c.bio || m.role;
  const works = c.works || [];
  const url = c.wikipediaUrl || wiki(m.name);
  return <div className={'panel mage-card'+(end?' endpoint':'')} style={{padding:16,marginBottom:14,borderColor:end?'var(--gold)':undefined,boxShadow:end?'0 0 0 1px var(--gold)':undefined}}>
    <h3 style={{marginTop:0,marginBottom:4}}>
      <a href={url} target="_blank" rel="noreferrer" style={{color:'inherit',textDecoration:'none'}}>{m.name}</a>
      {end && <span className="pill" style={{marginLeft:8,color:'var(--gold)',borderColor:'var(--gold)'}}>endpoint · end of the era of kings</span>}
    </h3>
    <div className="muted" style={{marginBottom:8,fontSize:'.82rem'}}>
      {dates} · {m.region}
      {m.isIberian && <span className="pill" style={{fontSize:'.68rem',marginLeft:6,color:'var(--green)',borderColor:'var(--green)'}}>Iberian</span>}
      {m.isRoyal && <span className="pill" style={{fontSize:'.68rem',marginLeft:6,color:'var(--violet)',borderColor:'var(--violet)'}}>royal</span>}
    </div>
    {bio && bio.split(/\n\n+/).map((para,i)=><p key={i} style={{marginBottom:8,lineHeight:1.55}}>{para}</p>)}
    {works.length>0 && <>
      <table style={{marginTop:6,width:'100%',fontSize:'.86rem'}}>
        <thead><tr><th style={{textAlign:'left',padding:'4px 8px'}}>Work / contribution</th><th style={{textAlign:'left',padding:'4px 8px'}}>Significance</th></tr></thead>
        <tbody>
        {works.map((w,i)=><tr key={i}>
          <td style={{padding:'4px 8px',fontWeight:600}}>{w.title}</td>
          <td style={{padding:'4px 8px'}} className="muted">{w.note}</td>
        </tr>)}
        </tbody>
      </table>
    </>}
    <div style={{marginTop:8}}><a href={url} target="_blank" rel="noreferrer">Read more on Wikipedia →</a></div>
  </div>;
}

function MagesPage(){
  const span = `${fmtYear(MAGES[0].y0)} – ${fmtYear(MAGES[MAGES.length-1].y1)}`;
  return <div>
    <h1>Magi — from Daniel to Felipe II</h1>
    <p className="muted">A chronology of <b>magi / wise-men / royal-sage occult figures</b>, from the Babylonian court magi (<b>Daniel, Shadrach, Meshach, Abednego</b>) through the medieval Iberian sages — <b>Ramon Llull, Alfonso X the Wise, Arnaldus de Villanova, Moses de León</b> — to the Renaissance Christian-kabbalists and royal astrologers, ending with <b style={{color:'var(--gold)'}}>Felipe II of Spain (1527–1598)</b>, who closes the era of kings. {MAGES.length} figures across {span}. Each mage's card gives a Wikipedia-grounded bio and a <i>ficha</i> of their most important works.</p>
    <div className="panel" style={{padding:14,marginBottom:14}}>
      <Timeline items={MAGES} title="Magi timeline — Daniel to Felipe II" accent="#7fb0ff"/>
    </div>
    {MAGES.map((m,i)=><MageCard key={i} m={m}/>)}
  </div>;
}

export { MagesPage };