// tabs/TimeTab.jsx — Predictor + Ages
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SIGNS, SIMPLE, LETTER_TO_SIGN, DOUBLES, MOTHERS, BODIES, GLYPH, WEEK, FIN2REG, REG2FIN, SIMPLE_LETTERS, GV, norm, displayHe, gematria, simpleSet, formable, isPalindrome, ANGEL_LEXICON, ANGEL_NAME_MAP, readableWords, daysInMonth, makeDate, parseDate, fmtDate, BODIES7, skyAtSet, skyAt, skyAt7, occupiedLetters, bySign, GENESIS, genesisReadable, GEN_TOTAL, GEN_VALUES, PREC, AGE, FULL, AYANAMSIS, SYN, DRAC, ANOM, TROP, ECLY, HALAKIM_DAY, MOLAD, EQUINOX_LON, ageBoundaries, yrLabel, ERA_WINDOWS, FINALS, letterVal, reduce9, LO_SHU, LO_POS, sigilPath, aiqGroups, siamese, doublyEven, singlyEven, buildMagic, isMagic, KAMEOT, GREEK, isopsephy, ABJAD, ABJAD_NAME, abjad, KTP, katapayadi, countSubset, MON, MONTHNAMES, displayDate, motherSet } from '../core.jsx';
import { SkyMap, KameaGrid, Fig, DateEntry, YearInput, SubTabs } from '../ui.jsx';

function PredictorTab({date, setDate, genYear, setGenYear, genData, loading, scanYear, year, stepYear}){
  const [custom,setCustom]=useState('');
  const [sel,setSel]=useState('יהוה');
  const nDays = (genYear%4===0&&(genYear%100!==0||genYear%400===0))?366:365;
  // day-of-year of the chosen date (for the green outline), only if same year
  const curDoy = useMemo(()=>{
    const d=parseDate(date); if(!d) return -1;
    if(d.getUTCFullYear()!==genYear) return -1;
    return Math.floor((d.getTime()-makeDate(genYear,1,1).getTime())/86400000);
  },[date,genYear]);
  // presets: spread from the temporal Name (simples, time-gated) to the eternal tier (no
  // zodiac sign — doubles + mothers, gated only by the fixed mother-axis, not the turning sky)
  const presets=[
    ['יהוה','YHVH · the temporal Name'],
    ['אהיה','Ehyeh · I am'],
    ['משיח','Messiah'],
    ['אבדון','Abaddon'],
    ['ישראל','Israel'],
    ['אלהים','Elohim'],
    ['בראשית','Bereshit · Genesis 1:1'],
    ['אמת','Emet · truth (eternal)'],
    ['שבת','Shabbat · rest (eternal)'],
  ];
  function wordDoyList(word){
    // returns array of day-of-year indices where `word` is readable: required simples occupied
    // (S⊆O) AND required mothers geometrically available (motherSet ⊆ availableMothers). From dayOccs + dayMoms.
    if(!genData || !genData.dayOccs) return [];
    const req=simpleSet(norm(word));
    const moms=motherSet(norm(word));
    const out=[];
    for(let i=0;i<genData.dayOccs.length;i++){
      let ok=true;
      for(const c of req){ if(!genData.dayOccs[i].has(c)){ ok=false; break; } }
      if(ok && genData.dayMoms) for(const m of moms){ if(!genData.dayMoms[i].has(m)){ ok=false; break; } }
      if(ok) out.push(i);
    }
    return out;
  }
  function ProbPill({count}){
    const pct=nDays?count/nDays*100:0;
    const tag = pct>=80?'common':pct>=40?'frequent':pct>=10?'occasional':'special';
    const cls = pct>=40?'spec':pct>=10?'mid':'ok';
    return <span className={'prob '+cls}>{pct.toFixed(1)}% · {tag}</span>;
  }
  function CalendarRow({word,label}){
    const days=wordDoyList(word);
    const daySet=useMemo(()=>new Set(days),[days.join(',')]);
    const cad = days.length>0 ? (nDays/days.length).toFixed(1) : '—';
    const isSel = sel===word;
    return <>
      <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap',marginBottom:6}}>
        <span className="he" style={{fontSize:'1.5rem',color:isSel?'var(--green)':'var(--gold)',cursor:'pointer'}} onClick={()=>setSel(word)} title="click to select">{displayHe(word)}</span>
        <span className="muted" style={{flex:'0 0 180px'}}>{label}</span>
        <span className="pill">readable <b style={{color:'var(--gold)'}}>{days.length}</b>/{nDays} · ~every {cad} d</span>
        <ProbPill count={days.length}/>
      </div>
      <div className="tl" role="img" aria-label={`${word}: ${days.length} readable days in ${genYear}`}>
        {Array.from({length:nDays},(_,i)=>{
          const on=daySet.has(i);
          return <div key={i} className={'d'+(on?' on':'')+(i===curDoy?' cur':'')} title={`${genYear}-${String(i+1).padStart(3,'0')} (doy ${i+1})${on?' · readable':''}${i===curDoy?' · date':''}`}></div>;
        })}
      </div>
    </>;
  }
  return <>
    <h2>Predictor — gloss frequency across {genYear} {loading && <span className="pill">computing…</span>}</h2>
    <div className="muted" style={{marginBottom:10}}>For each gloss the strip shows the whole year (one square per day). <b style={{color:'var(--gold)'}}>Gold</b> = the word is readable that day (all its required zodiacal simples occupied); <b style={{color:'var(--green)'}}>green outline</b> = the chosen date ({date}). Words built only of mothers+doubles (Emet, Shabbat) have no zodiacal simples → readable every day. The cadence (≈every N days) measures how common each gloss is. Click a word to list its dates below.</div>
    <div className="controls" style={{marginBottom:12}}>
      <button onClick={()=>stepYear(-1)}>◀ {genYear-1}</button>
      <YearInput value={genYear} onCommit={setGenYear}/>
      <button onClick={()=>stepYear(1)}>{genYear+1} ▶</button>
      <button onClick={()=>setGenYear(year)}>this year</button>
      {genYear<0 && <span className="muted" style={{fontSize:'.78rem'}}>{Math.abs(genYear)} BCE</span>}
    </div>
    <div className="controls" style={{marginBottom:14}}>
      <input type="text" value={custom} onChange={e=>setCustom(e.target.value)} placeholder="add a Hebrew word, e.g. אהיה" style={{flex:'1 1 220px'}}/>
      <button onClick={()=>{ if(/[א-ת]/.test(custom)){ setSel(custom); } }} disabled={!/[א-ת]/.test(custom)}>add gloss</button>
    </div>
    {genData && <>
      {presets.map(([w,l])=> <CalendarRow key={w} word={w} label={l}/>)}
      {/[א-ת]/.test(custom) && <CalendarRow word={norm(custom)} label={`custom: ${custom}`}/>}
      <div style={{marginTop:12}}>
        <span className="muted">Readable dates of <span className="he" style={{fontSize:'1.2rem',color:'var(--green)'}}>{displayHe(sel)}</span> in {genYear} (click to set the date): </span>
        {(()=>{
          const days=wordDoyList(sel);
          if(days.length===0) return <span className="muted">none this year.</span>;
          return days.slice(0,200).map(i=>{
            const ds=fmtDate(makeDate(genYear,1,1+i));
            return <span key={ds} className="key on click" onClick={()=>setDate(ds)}>{ds}</span>;
          });
        })()}
        {wordDoyList(sel).length>200 && <span className="muted"> … ({wordDoyList(sel).length} total)</span>}
      </div>
      <div className="legend">Move years with ◀ ▶. Clusters appear when the 7 classical bodies concentrate into few signs, emptying the others and lifting the rare glosses' counts.</div>
    </>}
  </>;
}

function AgesTab({date, rows}){
  const ages=useMemo(()=>ageBoundaries(),[]);
  return <>
    <h2>Stellar ages · precession</h2>
    <div className="muted" style={{marginBottom:10}}>The equinox recedes 50.29″/year → one precessional age per sign, ≈{Math.round(AGE)} years. Equinox today: <b>{EQUINOX_LON.toFixed(1)}°</b> sidereal (Pisces). Lahiri ayanamsa 24.18° (2024). Genesis 1:1 is readable only when all five of its signs (Aquarius, Aries, Libra, Taurus, Virgo) are occupied by the 7 classical bodies at once — a rare conjunction; no fixed cadence is claimed.</div>
    <div className="muted" style={{marginBottom:8}}>Precessional ages (equinox entry into each sign):</div>
    <div className="grid2">
      {ages.map(a=>{
        const now = a.start<=2026 && 2026<a.end;
        const next = a.start>2026 && a.start<2460;
        return (
          <div key={a.sign} className={'era'+(now?' now':'')+(next?' next':'')}>
            <div className="top">
              <span><span className="ehe he" style={{color:now?'var(--gold)':next?'var(--violet)':'var(--dim)'}}>{a.he}</span> <b>{a.sign}</b></span>
              <span className="yr">{yrLabel(a.start)} — {yrLabel(a.end)}</span>
            </div>
            <div className="desc">Age of {a.sign} · letter {a.he}. {now?'← current age':next?'← incoming age':''}</div>
          </div>
        );
      })}
    </div>
  </>;
}

export { PredictorTab, AgesTab };
