// pages/AlignmentFicha.jsx — single stellar-alignment detail page for /align/<date>.
// Computes the sky for that date from astronomy-engine, the alignment metrics
// (maxInSign / span / era), and the top readable names. Self-contained: only needs
// {date, lex, angelMap}. Presentational (renders identically server & client).
import React, { useMemo } from 'react';
import { SkyMap } from '../ui.jsx';
import { SIMPLE, BODIES, GLYPH, skyAt, skyAt7, occupiedLetters, bySign, readableWords, displayDate, makeDate, fmtDate, eraForYear, refUrl } from '../core.jsx';

const SIGN_EN = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];

function smallestArc(lons){
  // smallest arc (degrees) on the circle containing all longitudes
  const s=[...lons].sort((a,b)=>a-b);
  if(s.length<2) return 0;
  let maxGap=0;
  for(let i=1;i<s.length;i++) maxGap=Math.max(maxGap, s[i]-s[i-1]);
  maxGap=Math.max(maxGap, (s[0]+360)-s[s.length-1]); // wrap gap
  return 360-maxGap;
}

function AlignmentFicha({date, lex, angelMap, onBack, nameRefs}){
  // rows = 9-body set (7 classical + Uranus + Neptune) for the SkyMap dots — astronomical
  // context only. rows7 = the 7 classical bodies the Sefer Yetzirah assigns to the 7 doubles —
  // the ONLY bodies that occupy letters, so the reading (occ, words, occSigns) and the
  // alignment metrics (maxInSign, span) are computed from rows7. Uranus/Neptune are plotted
  // on the map but contribute no letter and no alignment count (they have no SY letter).
  const rows = useMemo(()=>skyAt(date),[date]);
  const rows7 = useMemo(()=>skyAt7(date),[date]);
  const occ = useMemo(()=>occupiedLetters(rows7),[rows7]);
  const occSigns = useMemo(()=>new Set(rows7.map(r=>r.sign)),[rows7]);
  const bs = useMemo(()=>bySign(rows7),[rows7]);
  const words = useMemo(()=> lex?readableWords(occ,lex.lexicon,angelMap):[],[occ,lex,angelMap]);
  const meta = useMemo(()=>{
    let best=null;
    for(const [sign,list] of Object.entries(bs)){ if(!best || list.length>best.list.length) best={sign,list}; }
    const lons=rows7.map(r=>r.lon);
    const year=parseInt(date.slice(0,4),10)||2026;
    return { maxInSign: best?best.list.length:0, sign: best?best.sign:'—', span: smallestArc(lons), era: eraForYear(year) };
  },[rows7,bs,date]);

  const dateWords = words.filter(w=>w.simp).sort((a,b)=> (b.name?1:0)-(a.name?1:0) || b.len-a.len);
  const top = dateWords.slice(0,12);
  const year = parseInt(date.slice(0,4),10)||2026;

  return <div>
    {onBack && <div className="controls" style={{marginBottom:14}}>
      <button onClick={onBack} title="Back">◀ back to Alignments</button>
      <span className="pill">stellar alignment</span>
    </div>}

    <h1>Stellar alignment — {displayDate(date)}</h1>
    <div className="sub" style={{marginBottom:14}}>
      <b style={{color:'var(--gold)'}}>{meta.maxInSign}</b> of {rows7.length} classical bodies in <b>{meta.sign}</b> · span <b className="deg">{meta.span.toFixed(1)}°</b> · era <b>{meta.era}</b>
    </div>

    <div className="grid2" style={{alignItems:'start'}}>
      <div className="panel" style={{padding:14}}>
        <SkyMap rows={rows} occ={occ}/>
        <div className="legend">{occSigns.size} of 12 zodiac signs occupied on {displayDate(date)} (by the 7 classical bodies). Readable simples: <b style={{color:'var(--gold)'}}>{[...occ].sort().join(' ')||'none'}</b>. Uranus and Neptune are plotted on the map for astronomical context but do <b>not</b> light a sector (they have no letter in the Sefer Yetzirah).</div>
      </div>
      <div className="panel" style={{padding:16}}>
        <h3 style={{marginTop:0}}>Alignment metrics</h3>
        <table><tbody>
          <tr><th>Date</th><td>{displayDate(date)}</td></tr>
          <tr><th>Bodies</th><td>{rows7.length} classical ({rows7.map(r=>GLYPH[r.body]).join(' ')}) <span className="muted">· {rows.length-rows7.length} modern plotted on map only ({rows.filter(r=>!rows7.some(r7=>r7.body===r.body)).map(r=>GLYPH[r.body]).join(' ')})</span></td></tr>
          <tr><th>Max in one sign</th><td><b style={{color:'var(--gold)'}}>{meta.maxInSign}</b> in {meta.sign}</td></tr>
          <tr><th>Span (tightest arc)</th><td className="deg">{meta.span.toFixed(2)}°</td></tr>
          <tr><th>Precessional era</th><td>{meta.era}</td></tr>
          <tr><th>Occupied signs</th><td>{occSigns.size}/12</td></tr>
          <tr><th>Readable simples</th><td><span className="he" style={{fontSize:'1.1rem'}}>{[...occ].sort().join(' ')||'none'}</span></td></tr>
        </tbody></table>
      </div>
    </div>

    <div className="panel" style={{marginTop:14,padding:16}}>
      <h3 style={{marginTop:0}}>Top readable names on {displayDate(date)} — {dateWords.length} date-specific</h3>
      <div className="muted" style={{marginBottom:8,fontSize:'.82rem'}}>Names whose zodiac simples are among this alignment's occupied signs (proper names first, then longest). A particular sky configuration recurs over years → centuries → millennia; this is the readable layer of that day.</div>
      {top.length ? <div className="tcards">
        {top.map((w,i)=>(
          <div key={i} className="tcard">
            <div className="the">{w.disp}</div>
            <div className="read">{w.translit}</div>
            <div className="trans">{w.gloss}</div>
            <div className="g">{w.len} letters · gematria {w.gem}{w.angelName && <span style={{color:'var(--violet)'}}> · angel</span>}</div>
            {(w.person||w.place||w.compound||(nameRefs&&nameRefs[w.he]&&nameRefs[w.he].n>0)) && (
              <div style={{marginTop:4,display:'flex',flexWrap:'wrap',gap:4}}>
                {w.person && <span className="pill" style={{color:'var(--blue)',borderColor:'var(--blue)'}}>name{w.theo?' (theophoric)':''}</span>}
                {w.place && <span className="pill" style={{color:'var(--green)',borderColor:'var(--green)'}} title="A biblical PLACE — proper locative noun in Strong (city, mountain, region…)">place</span>}
                {w.compound && <span className="pill" style={{color:'var(--warn)',borderColor:'var(--warn)'}} title="Concatenated multi-root entry whose gloss is truncated">compound</span>}
                {nameRefs && nameRefs[w.he] && nameRefs[w.he].n>0 && (()=>{ const r=nameRefs[w.he]; return <span className="pill" style={{color:'var(--violet)',borderColor:'var(--violet)'}} title={'Where this name appears in the Hebrew Bible (Sefaria): '+r.refs.join(', ')}>📖 {r.refs[0]}{r.n>1?' · +'+(r.n-1):''}</span>; })()}
              </div>
            )}
          </div>
        ))}
      </div> : <div className="muted">No date-specific readable names on this day.</div>}
    </div>
  </div>;
}

export { AlignmentFicha };
