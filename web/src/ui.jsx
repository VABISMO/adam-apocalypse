// ui.jsx — shared React components used across tabs.
import React, { useState, useEffect, useRef } from 'react';
import { FIGS } from '../figures.js';
import { SIGNS, SIMPLE, LETTER_TO_SIGN, DOUBLES, MOTHERS, BODIES, GLYPH, WEEK, FIN2REG, REG2FIN, SIMPLE_LETTERS, GV, norm, displayHe, gematria, simpleSet, formable, isPalindrome, ANGEL_LEXICON, ANGEL_NAME_MAP, readableWords, daysInMonth, makeDate, parseDate, fmtDate, BODIES7, skyAtSet, skyAt, skyAt7, occupiedLetters, bySign, GENESIS, genesisReadable, GEN_TOTAL, GEN_VALUES, PREC, AGE, FULL, AYANAMSIS, SYN, DRAC, ANOM, TROP, ECLY, HALAKIM_DAY, MOLAD, EQUINOX_LON, ageBoundaries, yrLabel, ERA_WINDOWS, FINALS, letterVal, reduce9, LO_SHU, LO_POS, sigilPath, aiqGroups, siamese, doublyEven, singlyEven, buildMagic, isMagic, KAMEOT, GREEK, isopsephy, ABJAD, ABJAD_NAME, abjad, KTP, katapayadi, countSubset, MON, MONTHNAMES, displayDate } from './core.jsx';

// ====== SkyMap ======
// Each celestial element gets its own coordinating color (no monocolor):
//   gold    #e8c87a  the word being read (highlighted sectors)
//   teal    #5eead4  the 7 planets (moving bodies, the "doubles")
//   indigo  #9b8ec4  the 3 mothers / fixed circumpolar constellations
//   lavender#cfd0e8  occupied zodiac letters (the available alphabet today)
//   rose    #f4a8c0  a body sitting on a sign boundary
// `hl` = optional Set of simple letters to highlight in gold; a highlighted sector
// glows whether or not it is occupied today, so a deep link to a word not readable on
// the current date still shows which signs it needs.
function SkyMap({rows, occ, hl}){
  const C=220, R=196, Rp=120;
  const pt=(lon,r)=>{const a=lon*Math.PI/180;return [C+r*Math.sin(a), C-r*Math.cos(a)];};
  const MOTHER_LON=[['א','Draco',268],['מ','Ursa Minor',89],['ש','Cassiopea',38]];
  const signCount={}; rows.forEach(r=>{signCount[r.sign]=(signCount[r.sign]||0)+1;});
  const HLS = hl ? new Set(hl) : null;
  const occupied = occ.size;
  return (
    <svg viewBox="0 0 440 440" width="100%" height="auto" style={{maxWidth:'100%'}} role="img" aria-label={HLS?`Sky map: word requires ${[...HLS].join(' ')} (${occupied} signs occupied)`:`Sky map: ${occupied} of 12 signs occupied`}>
      <circle cx={C} cy={C} r={R} fill="#0f0f15" stroke="#2a2a38" strokeWidth="2"/>
      <circle cx={C} cy={C} r={Rp+22} fill="none" stroke="#202028" strokeWidth="1"/>
      {SIGNS.map((s,i)=>{
        const [x0,y0]=pt(i*30,R), [x1,y1]=pt((i+1)*30,R);
        const on=occ.has(SIMPLE[s][0]);
        const isHl = HLS && HLS.has(SIMPLE[s][0]);
        const fill = isHl ? 'rgba(232,200,122,0.18)' : (on?'rgba(207,208,232,0.10)':'transparent');
        const stroke = isHl ? '#e8c87a' : (on?'#3a3a4a':'#2a2a38');
        return <path key={s} d={`M ${C} ${C} L ${x0} ${y0} A ${R} ${R} 0 0 0 ${x1} ${y1} Z`} fill={fill} stroke={stroke} strokeWidth={isHl?1.4:0.7}/>;
      })}
      {SIGNS.map((s,i)=>{
        const [lx,ly]=pt(i*30+15, R-20); const [nx,ny]=pt(i*30+15, R-3);
        const on=occ.has(SIMPLE[s][0]), n=signCount[s]||0;
        const isHl = HLS && HLS.has(SIMPLE[s][0]);
        const letterFill = isHl ? '#e8c87a' : (on?'#cfd0e8':'#5a5a6e');
        const nameFill = isHl ? '#e8c87a' : (on?'#9ca3af':'#4a4a55');
        return <g key={s}>
          <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="21" fontWeight={isHl?700:400} fill={letterFill}>{SIMPLE[s][0]}</text>
          <text x={nx} y={ny} textAnchor="middle" dominantBaseline="middle" fontSize="8.5" fill={nameFill}>{s}{n>1?(' ·×'+n):''}</text>
        </g>;
      })}
      {rows.map(r=>{
        const [px,py]=pt(r.lon,Rp);
        return <g key={r.body}>
          <circle cx={px} cy={py} r="8.5" fill="#0f1518" stroke="#5eead4" strokeWidth="1.2"/>
          <text x={px} y={py} textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#5eead4">{GLYPH[r.body]}</text>
          {r.boundary && <circle cx={px} cy={py} r="11.5" fill="none" stroke="#f4a8c0" strokeWidth="1" strokeDasharray="2 2" opacity="0.8"/>}
        </g>;
      })}
      <circle cx={C} cy={C} r="32" fill="#0f0f15" stroke="#2a2a38" strokeWidth="1" strokeDasharray="3 3"/>
      {MOTHER_LON.map(([h,con,lon])=>{
        const [lx,ly]=pt(lon,18); const [nx,ny]=pt(lon,38); const [ox,oy]=pt(lon,R-24); const [sx,sy]=pt(lon,44);

        return <g key={h}>
          <line x1={sx} y1={sy} x2={ox} y2={oy} stroke="#3a3a4a" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.55"/>
          <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="19" fill="#9b8ec4">{h}</text>
          <text x={nx} y={ny} textAnchor="middle" dominantBaseline="middle" fontSize="5.6" fill="#6a6a86">{con}</text>
        </g>;
      })}
      <text x={C} y={C+34} textAnchor="middle" fontSize="6.5" fill="#6a6a86">3 mothers · fixed circumpolar axis</text>
    </svg>
  );
}

function Fig({n, doc}){
  const f = FIGS[n];
  if(!f) return null;
  return <div className="fig" role="img" aria-label={`Figure ${n}`}>
    <div dangerouslySetInnerHTML={{__html: f.svg}}/>
    <div className="cap">{f.cap}</div>
    {doc && <div className="muted" style={{marginTop:6,textAlign:'left'}}>{doc}</div>}
  </div>;
}

function DateEntry({value, onChange}){
  const d = parseDate(value) || parseDate('2026-08-08');
  const y = d.getUTCFullYear(), mo = d.getUTCMonth()+1, da = d.getUTCDate();
  const [ys,setYs]=useState(String(y));
  useEffect(()=>setYs(String(y)),[y]);
  const dim = daysInMonth(y, mo);
  const set = (ny, nm, nd)=> onChange(fmtDate(makeDate(ny, nm, Math.min(nd, daysInMonth(ny, nm)))));
  const commitYear=()=>{ const n=parseInt(ys,10); if(!isNaN(n)) set(n, mo, da); else setYs(String(y)); };
  return <span style={{display:'inline-flex',gap:5,alignItems:'center'}}>
    <input type="text" inputMode="numeric" value={ys} style={{width:78}} title="year — negative = BCE"
      onChange={e=>setYs(e.target.value)} onBlur={commitYear}
      onKeyDown={e=>{ if(e.key==='Enter') e.target.blur(); }} aria-label="Year (negative = BCE)"/>
    <select value={mo} onChange={e=>set(y, parseInt(e.target.value,10), da)} aria-label="Month">
      {MON.map((n,i)=><option key={n} value={i+1}>{n}</option>)}
    </select>
    <select value={da} onChange={e=>set(y, mo, parseInt(e.target.value,10))} aria-label="Day">
      {Array.from({length:dim},(_,i)=><option key={i+1} value={i+1}>{i+1}</option>)}
    </select>
    {y<0 && <span className="muted" style={{fontSize:'.78rem'}}>{Math.abs(y)} BCE</span>}
  </span>;
}
// Reusable year field (text, commits on blur/Enter) for the Predictor & Saros year scans.
function YearInput({value, onCommit, width=90, title="year — negative = BCE"}){
  const [s,setS]=useState(String(value));
  useEffect(()=>setS(String(value)),[value]);
  const commit=()=>{ const n=parseInt(s,10); if(!isNaN(n) && n!==value) onCommit(n); else setS(String(value)); };
  return <input type="text" inputMode="numeric" value={s} style={{width}} title={title}
    onChange={e=>setS(e.target.value)} onBlur={commit}
    onKeyDown={e=>{ if(e.key==='Enter') e.target.blur(); }} aria-label="Year (negative = BCE)"/>;
}

function KameaGrid({n, hl}){
  const sq=buildMagic(n);
  const hlset=hl?new Set(hl):null;
  return <div className="kamea" style={{gridTemplateColumns:`repeat(${n},auto)`}}>
    {sq.flat().map((v,i)=> <div key={i} className={'kc'+(hlset&&hlset.has(v)?' hl':'')}>{v}</div>)}
  </div>;
}

function SubTabs({items, active, onChange}){
  return <div className="subtabs" role="tablist">
    {items.map(([id,label])=> <div key={id} role="tab" aria-selected={active===id} className={'subtab'+(active===id?' active':'')} onClick={()=>onChange(id)}>{label}</div>)}
  </div>;
}

export { SkyMap, KameaGrid, Fig, DateEntry, YearInput, SubTabs };
