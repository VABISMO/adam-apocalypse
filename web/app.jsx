import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import * as Astronomy from 'astronomy-engine';
import { FIGS } from './figures.js';

// ====== Sefer Yetzirah (English keys) ======
const SIGNS = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const SIMPLE = {
  'Aries':['ה','Heh',5], 'Taurus':['ו','Vav',6], 'Gemini':['ז','Zayin',7], 'Cancer':['ח','Chet',8],
  'Leo':['ט','Tet',9], 'Virgo':['י','Yod',10], 'Libra':['ל','Lamed',30], 'Scorpio':['נ','Nun',50],
  'Sagittarius':['ס','Samekh',60], 'Capricorn':['ע','Ayin',70], 'Aquarius':['צ','Tzaddi',90], 'Pisces':['ק','Qoph',100]
};
const LETTER_TO_SIGN = {}; Object.entries(SIMPLE).forEach(([s,[he]])=>{LETTER_TO_SIGN[he]=s});
const DOUBLES = {
  'Saturn':['ב','Bet',2], 'Jupiter':['ג','Gimel',3], 'Mars':['ד','Dalet',4], 'Sun':['כ','Kaph',20],
  'Venus':['פ','Pe',80], 'Mercury':['ר','Resh',200], 'Moon':['ת','Tav',400]
};
const MOTHERS = [
  ['א','Aleph','air · Draco',268],
  ['מ','Mem','water · Ursa Minor',89],
  ['ש','Shin','fire · Cassiopea',38]
];
const BODIES = ['Saturn','Jupiter','Mars','Sun','Venus','Mercury','Moon','Uranus','Neptune','Pluto'];
const GLYPH = {Sun:'☉',Moon:'☽',Mercury:'☿',Venus:'♀',Mars:'♂',Jupiter:'♃',Saturn:'♄',Uranus:'♅',Neptune:'♆',Pluto:'♇'};
const WEEK = [['Sunday','Sun'],['Monday','Moon'],['Tuesday','Mars'],['Wednesday','Mercury'],['Thursday','Jupiter'],['Friday','Venus'],['Saturday','Saturn']];

const FIN2REG = {'ן':'נ','ץ':'צ','ך':'כ','ם':'מ','ף':'פ'};
const REG2FIN = {'נ':'ן','צ':'ץ','כ':'ך','מ':'ם','פ':'ף'};
const SIMPLE_LETTERS = new Set(Object.values(SIMPLE).map(x=>x[0]));
const GV = {א:1,ב:2,ג:3,ד:4,ה:5,ו:6,ז:7,ח:8,ט:9,י:10,כ:20,ל:30,מ:40,נ:50,ס:60,ע:70,פ:80,צ:90,ק:100,ר:200,ש:300,ת:400};

function norm(s){ return [...s].map(c=>FIN2REG[c]||c).join(''); }
function displayHe(s){ if(!s) return s; const last=s[s.length-1]; const f=REG2FIN[last]; return f ? s.slice(0,-1)+f : s; }
function gematria(s){ return [...s].reduce((a,c)=>a+(GV[c]||0),0); }
function simpleSet(cons){ const s=new Set(); for(const c of cons) if(SIMPLE_LETTERS.has(c)) s.add(c); return s; }
function formable(cons, occ){ for(const c of simpleSet(cons)) if(!occ.has(c)) return false; return true; }
function isPalindrome(cons){ const n=norm(cons); return n.length>=2 && n===[...n].reverse().join(''); }
function readableWords(occ, LEX, angelMap){
  const res=[], seen=new Set();
  for(const [cons,trans,gloss,pos] of LEX){
    if(seen.has(cons)) continue;
    if(formable(cons, occ)){
      seen.add(cons);
      const simp=[...simpleSet(cons)].sort().join('');
      const am = angelMap ? angelMap.get(norm(cons)) : null;
      res.push({he:cons, disp:displayHe(cons), translit:trans, gloss, pos, len:cons.length, gem:gematria(cons), simp,
        pal:isPalindrome(cons), m37:gematria(cons)%37===0,
        name: (pos||'').startsWith('n-pr'),
        theo: /אל|יהו|יאל|יה/.test(cons),
        compound: /\s/.test(trans),
        angel: am ? {el:am.el, yh:am.yh} : null});
    }
  }
  res.sort((a,b)=> b.len-a.len || a.gem-b.gem || (a.he<b.he?-1:1));
  return res;
}

// ====== Date plumbing (BCE / negative-year aware) ======
// Stored string formats:  CE  "YYYY-MM-DD"   (year >= 1)
//                         BCE "-YYYY-MM-DD"  (year <= -1, sign + 4-digit abs)
// <input type="date"> cannot represent BCE, so the Sky tab uses DateEntry below.
// `new Date(str+'T12:00:00Z')` and `toISOString().slice(0,10)` BOTH break for
// negative years (extended ISO uses sign + 6 digits), so every date site goes
// through parseDate / fmtDate / makeDate instead.
function daysInMonth(y, mo){                   // mo = 1..12, proleptic Gregorian
  if(mo===2) return (y%4===0 && (y%100!==0 || y%400===0)) ? 29 : 28;
  return [31,28,31,30,31,30,31,31,30,31,30,31][mo-1];
}
function makeDate(y, mo, da, h=12){            // builds a noon-UT Date with literal year (no 0-99 remap)
  const d = new Date(Date.UTC(2000, mo-1, da, h, 0, 0));
  d.setUTCFullYear(y);                          // setUTCFullYear treats 0-99 and negatives literally
  return d;
}
function parseDate(str){                       // "YYYY-MM-DD" | "-YYYY-MM-DD" -> Date | null
  if(!str) return null;
  const m = /^(-?\d{1,5})-(\d{2})-(\d{2})$/.exec(str);
  if(!m) return null;
  const y = parseInt(m[1],10), mo = parseInt(m[2],10), da = parseInt(m[3],10);
  if(mo<1||mo>12||da<1||da>daysInMonth(y,mo)) return null;
  const d = makeDate(y, mo, da);
  return isNaN(d.getTime()) ? null : d;
}
function fmtDate(d){                           // Date -> "YYYY-MM-DD" | "-YYYY-MM-DD"
  const y = d.getUTCFullYear();
  const mo = String(d.getUTCMonth()+1).padStart(2,'0');
  const da = String(d.getUTCDate()).padStart(2,'0');
  if(y >= 1 && y <= 9999) return String(y).padStart(4,'0')+'-'+mo+'-'+da;
  const sign = y < 0 ? '-' : '';
  return sign + String(Math.abs(y)).padStart(4,'0') + '-' + mo + '-' + da;
}

function skyAt(dateStr){
  if(!dateStr) return [];
  const d = parseDate(dateStr);
  if(!d) return [];
  return BODIES.map(b=>{
    const v = Astronomy.GeoVector(Astronomy.Body[b], d, true);
    const lon = Astronomy.Ecliptic(v).elon;
    let si = Math.floor(lon/30) % 12; if(si<0) si+=12;
    return { body:b, lon, sign:SIGNS[si], deg: lon - si*30, boundary:(lon-si*30)<1||(lon-si*30)>29 };
  });
}
function occupiedLetters(rows){ const s=new Set(); rows.forEach(r=>s.add(SIMPLE[r.sign][0])); return s; }
function bySign(rows){ const m={}; rows.forEach(r=>{(m[r.sign]=m[r.sign]||[]).push(r)}); return m; }

const GENESIS = [
  ['בראשית','In the beginning'],['ברא','created'],['אלהים','God'],['את','(object marker)'],
  ['השמים','the heavens'],['ואת','and (object marker)'],['הארץ','the earth']
];
function genesisReadable(occ){ return GENESIS.every(([w])=>formable(norm(w), occ)); }
const GEN_TOTAL = 2701;
const GEN_VALUES = GENESIS.map(([w])=>gematria(norm(w))); // 913,203,86,401,395,407,296

const PREC = 50.29/3600, AGE = 30/PREC, FULL = 360/PREC, AYANAMSIS = 24.18;
// Base astronomical constants (measured standards, mirroring scripts/lib.mjs). Derived
// numbers shown to the user (saros = 223·SYN, molad, Δ, eclipse year…) are computed
// from these — never written as hardcoded literals.
const SYN = 29.530589, DRAC = 27.212221, ANOM = 27.554550, TROP = 365.24219, ECLY = 346.620083;
const HALAKIM_DAY = 24*1080;                 // 1 day = 24 h × 1080 halakim (parts)
const MOLAD = 29 + 12/24 + 793/HALAKIM_DAY;  // Hebrew molad: 29 d 12 h 793 parts
const EQUINOX_LON = (360 - AYANAMSIS) % 360;
function ageBoundaries(ayan=AYANAMSIS){
  const eqLon = (360 - ayan) % 360; const out=[];
  for(let i=0;i<12;i++){
    const hi=(i+1)*30; let dt=(eqLon-hi)/PREC;
    while(dt>FULL/2) dt-=FULL; while(dt<-FULL/2) dt+=FULL;
    const start=2024+dt; out.push({sign:SIGNS[i], he:SIMPLE[SIGNS[i]][0], start, end:start+AGE});
  }
  return out;
}
function yrLabel(y){ return y<0 ? Math.round(-y)+' BCE' : Math.round(y)+' CE'; }

const ERA_WINDOWS = [
  {w:'427–417 BCE', ev:'Axial Age (Plato b. 427; Torah redaction; Buddha)'},
  {w:'61–73 CE', ev:'Second Temple destroyed (70); rabbinic Judaism; Christian break'},
  {w:'552–565', ev:'Justinian; Hagia Sophia; closure of the Talmud; pre-Islam'},
  {w:'1043–1056', ev:'East–West Schism (1054)'},
  {w:'1535–1547', ev:'Reformation (1517); Copernicus, De revolutionibus (1543)'},
  {w:'2025–2038', ev:'current window'},
];

// ====== Aiq Bekar / sigils / kameot ======
// Ancient 22-letter Hebrew gematria: א=1 … ת=400, no vowels. Final-form letters
// (ך ם ן ף ץ) are allographs of their base letter and take its VALUE (ם=40 like מ),
// NOT the medieval Mispar Gadol 500–900. This is the system the Sefer Yetzirah uses.
const FINALS = new Set(['ך','ם','ן','ף','ץ']);
function letterVal(ch){ return GV[FIN2REG[ch] || ch] ?? 0; }
function reduce9(v){ let s=v; while(s>9) s=String(s).split('').reduce((a,d)=>a+ +d,0); return s===0?9:s; }
const LO_SHU=[[4,9,2],[3,5,7],[8,1,6]];
const LO_POS={}; for(let i=0;i<3;i++)for(let j=0;j<3;j++) LO_POS[LO_SHU[i][j]]=[i,j];
function sigilPath(name){
  const letters=[...norm(name)].filter(ch=>GV[ch]);
  const reduced=letters.map(ch=>reduce9(letterVal(ch)));
  const cells=[];
  for(const r of reduced){ if(!cells.length || cells[cells.length-1].v!==r) cells.push({v:r}); }
  return { letters, reduced, cells, cellsUsed:[...new Set(reduced)] };
}
function aiqGroups(){
  const g={1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[]};
  const all='אבגדהוזחטיכלמנסעפצקרשת';   // 22 base letters (finals are allographs, same value)
  for(const ch of all){ const v=letterVal(ch); g[reduce9(v)].push(ch+''+v); }
  return g;
}
function siamese(n){
  const sq=[...Array(n)].map(()=>Array(n).fill(0));
  let r=0,c=(n>>1); for(let k=1;k<=n*n;k++){
    if(sq[r][c]){ r=(r+2)%n; c=(c+n-1)%n; }
    sq[r][c]=k; r=(r+n-1)%n; c=(c+1)%n;
  } return sq;
}
function doublyEven(n){
  const sq=[...Array(n)].map((_,i)=>[...Array(n)].map((_,j)=>i*n+j+1));
  const mark=(i,j)=>{ const bi=i%4,bj=j%4; return (bi===bj)||(bi+bj===3); };
  for(let i=0;i<n;i++)for(let j=0;j<n;j++) if(mark(i,j)) sq[i][j]=n*n+1-sq[i][j];
  return sq;
}
function singlyEven(n){
  const m=n>>1, A=siamese(m), M=m*m;
  const g=[...Array(n)].map(()=>Array(n).fill(0));
  for(let i=0;i<m;i++)for(let j=0;j<m;j++){
    g[i][j]=A[i][j]; g[i+m][j+m]=A[i][j]+M; g[i][j+m]=A[i][j]+2*M; g[i+m][j]=A[i][j]+3*M;
  }
  const k=(m-1)>>1;
  for(let i=0;i<m;i++)for(let j=0;j<k;j++){ const t=g[i][j]; g[i][j]=g[i+m][j]; g[i+m][j]=t; }
  { const t=g[k][k-1]; g[k][k-1]=g[k+m][k-1]; g[k+m][k-1]=t; }
  { const t=g[k][k];   g[k][k]=g[k+m][k];     g[k+m][k]=t; }
  for(let j=0;j<k-1;j++){ const col=m+1+j; const t=g[k][col]; g[k][col]=g[k+m][col]; g[k+m][col]=t; }
  return g;
}
function buildMagic(n){ return n%2? siamese(n) : n%4===0? doublyEven(n) : singlyEven(n); }
function isMagic(sq){ const n=sq.length, M=n*(n*n+1)/2;
  const rows=sq.map(r=>r.reduce((a,b)=>a+b,0));
  const cols=[...Array(n)].map((_,j)=>sq.reduce((a,r)=>a+r[j],0));
  const d1=sq.reduce((a,r,i)=>a+r[i],0), d2=sq.reduce((a,r,i)=>a+r[n-1-i],0);
  return [...rows,...cols,d1,d2].every(x=>x===M);
}
const KAMEOT=[
  ['Saturn',3,'ב'],['Jupiter',4,'ג'],['Mars',5,'ד'],['Sun',6,'כ'],
  ['Venus',7,'פ'],['Mercury',8,'ר'],['Moon',9,'ת'],
];

// ====== Greek isopsephy (Revelation) ======
const GREEK = {α:1,β:2,γ:3,δ:4,ε:5,ϝ:6,ϛ:6,ζ:7,η:8,θ:9,ι:10,κ:20,λ:30,μ:40,ν:50,ξ:60,ο:70,π:80,ϟ:90,ϙ:90,ρ:100,σ:200,ς:200,τ:300,υ:400,φ:500,χ:600,ψ:700,ω:800,ϡ:900};
function isopsephy(s){
  const n = s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
  let v=0; for(const ch of n){ if(GREEK[ch]!=null) v+=GREEK[ch]; } return v;
}

// Arabic abjad (Mashriqi/eastern order) — the 28-letter numeral order
const ABJAD = {ا:1,ب:2,ج:3,د:4,ه:5,و:6,ز:7,ح:8,ط:9,ي:10,ك:20,ل:30,م:40,ن:50,س:60,ع:70,ف:80,ص:90,ق:100,ر:200,ش:300,ت:400,ث:500,خ:600,ذ:700,ض:800,ظ:900,غ:1000};
const ABJAD_NAME = {ا:'alif',ب:'ba',ج:'jim',د:'dal',ه:'ha',و:'waw',ز:'zay',ح:'ḥa',ط:'ṭa',ي:'ya',ك:'kaf',ل:'lam',م:'mim',ن:'nun',س:'sin',ع:'ayn',ف:'fa',ص:'ṣad',ق:'qaf',ر:'ra',ش:'shin',ت:'ta',ث:'tha',خ:'kha',ذ:'dhal',ض:'ḍad',ظ:'ẓha',غ:'ghayn'};
function abjad(s){ let v=0; for(const ch of s){ if(ABJAD[ch]!=null) v+=ABJAD[ch]; } return v; }

// Katapayadi — Indian consonant→digit (right-to-left reading). Vowels = 0.
const KTP = {क:1,ख:2,ग:3,घ:4,ङ:5,ट:1,ठ:2,ड:3,ढ:4,ण:5,प:1,फ:2,ब:3,भ:4,म:5,य:1,र:2,ल:3,व:4,श:5,च:6,छ:7,ज:8,झ:9,ञ:0,त:6,थ:7,द:8,ध:9,न:0,ष:6,स:7,ह:8};
function katapayadi(s){
  // a consonant carries a value UNLESS immediately followed by virama (्) —
  // i.e. only the cluster-final consonant (the one with a vowel) counts.
  // Then read the digits right-to-left.
  const chars=[...s];
  const digits=[];
  for(let i=0;i<chars.length;i++){
    const c=chars[i];
    if(!/[क-हक़-य़]/.test(c)) continue;          // only consonants
    if(chars[i+1]==='्') continue;              // conjunct non-final -> no value
    if(KTP[c]!=null) digits.push(KTP[c]);
  }
  return digits.reverse().join('');
}

// ====== subset multiples of 37 (Gen 1:1 structure) ======
function countSubset(arr,div){ let cnt=0; const n=arr.length;
  for(let mask=1;mask<(1<<n);mask++){ let s=0; for(let i=0;i<n;i++) if(mask&(1<<i)) s+=arr[i]; if(s%div===0) cnt++; } return cnt; }

// ====== SkyMap ======
function SkyMap({rows, occ}){
  const C=220, R=196, Rp=120;
  const pt=(lon,r)=>{const a=lon*Math.PI/180;return [C+r*Math.sin(a), C-r*Math.cos(a)];};
  const MOTHER_LON=[['א','Draco',268],['מ','Ursa Minor',89],['ש','Cassiopea',38]];
  const signCount={}; rows.forEach(r=>{signCount[r.sign]=(signCount[r.sign]||0)+1;});
  return (
    <svg viewBox="0 0 440 440" width="100%" height="auto" style={{maxWidth:'100%'}} role="img" aria-label={`Sky map: ${occ.size} of 12 signs occupied`}>
      <circle cx={C} cy={C} r={R} fill="#0e1320" stroke="#283145" strokeWidth="2"/>
      <circle cx={C} cy={C} r={Rp+22} fill="none" stroke="#1c2333" strokeWidth="1"/>
      {SIGNS.map((s,i)=>{
        const [x0,y0]=pt(i*30,R), [x1,y1]=pt((i+1)*30,R);
        const on=occ.has(SIMPLE[s][0]);
        return <path key={s} d={`M ${C} ${C} L ${x0} ${y0} A ${R} ${R} 0 0 0 ${x1} ${y1} Z`} fill={on?'rgba(127,176,255,0.10)':'transparent'} stroke={on?'#3a4762':'#283145'} strokeWidth="0.7"/>;
      })}
      {SIGNS.map((s,i)=>{
        const [lx,ly]=pt(i*30+15, R-20); const [nx,ny]=pt(i*30+15, R-3);
        const on=occ.has(SIMPLE[s][0]), n=signCount[s]||0;
        return <g key={s}>
          <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="21" fill={on?'#cfe0ff':'#5a647a'}>{SIMPLE[s][0]}</text>
          <text x={nx} y={ny} textAnchor="middle" dominantBaseline="middle" fontSize="8.5" fill={on?'#8aa0c0':'#424b5e'}>{s}{n>1?(' ·×'+n):''}</text>
        </g>;
      })}
      {rows.map(r=>{
        const [px,py]=pt(r.lon,Rp);
        return <g key={r.body}>
          <circle cx={px} cy={py} r="8.5" fill="#131826" stroke="#7fb0ff" strokeWidth="1.2"/>
          <text x={px} y={py} textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#7fb0ff">{GLYPH[r.body]}</text>
          {r.boundary && <circle cx={px} cy={py} r="11.5" fill="none" stroke="#ffcf6a" strokeWidth="1" strokeDasharray="2 2" opacity="0.8"/>}
        </g>;
      })}
      <circle cx={C} cy={C} r="32" fill="#0e1320" stroke="#2a3346" strokeWidth="1" strokeDasharray="3 3"/>
      {MOTHER_LON.map(([h,con,lon])=>{
        const [lx,ly]=pt(lon,18); const [nx,ny]=pt(lon,38); const [ox,oy]=pt(lon,R-24); const [sx,sy]=pt(lon,44);
        return <g key={h}>
          <line x1={sx} y1={sy} x2={ox} y2={oy} stroke="#33405a" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.55"/>
          <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="19" fill="#9aa6bd">{h}</text>
          <text x={nx} y={ny} textAnchor="middle" dominantBaseline="middle" fontSize="5.6" fill="#5d6883">{con}</text>
        </g>;
      })}
      <text x={C} y={C+34} textAnchor="middle" fontSize="6.5" fill="#525d72">3 mothers · fixed circumpolar axis</text>
    </svg>
  );
}

// ====== Sigil SVG (Lo Shu 3×3 trace) ======
// ====== Magic-square render ======
function KameaGrid({n, hl}){
  const sq=buildMagic(n); const M=n*(n*n+1)/2;
  const hlset=hl?new Set(hl):null;
  return <div className="kamea" style={{gridTemplateColumns:`repeat(${n},auto)`}}>
    {sq.flat().map((v,i)=> <div key={i} className={'kc'+(hlset&&hlset.has(v)?' hl':'')}>{v}</div>)}
  </div>;
}

// ====== TAB SECTIONS ======
function Fig({n, doc}){
  const f = FIGS[n];
  if(!f) return null;
  return <div className="fig" role="img" aria-label={`Figure ${n}`}>
    <div dangerouslySetInnerHTML={{__html: f.svg}}/>
    <div className="cap">{f.cap}</div>
    {doc && <div className="muted" style={{marginTop:6,textAlign:'left'}}>{doc}</div>}
  </div>;
}

// Composite date entry: a year number (allows negative = BCE) + month + day selects.
// Replaces <input type="date"> so the Sky tab can search BCE dates (e.g. -427 Axial Age).
const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
// Composite date entry: year (text input, allows a leading "-" for BCE) + month + day selects.
// Replaces <input type="date"> so the Sky tab can search BCE dates (e.g. -427 Axial Age).
// The year is a free text field committed on blur/Enter, so the user can type "-427"
// without the controlled input snapping "-" back to NaN mid-keystroke.
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

function SkyTab({date, rawDate, setDate, rows, occ, occSigns, yhvhOk, genesisOk, bs, sentence, step}){
  const dateEmpty = !rawDate || !parseDate(rawDate);
  return <>
    <div className="controls" style={{marginBottom:12}}>
      <button onClick={()=>step(-1)}>◀ day</button>
      <DateEntry value={rawDate} onChange={setDate}/>
      <button onClick={()=>step(1)}>day ▶</button>
      <button onClick={()=>step(7)}>+ week</button>
      <button onClick={()=>setDate('2026-08-08')}>today</button>
      <span className="muted">noon UT · geocentric apparent positions · ecliptic longitude{dateEmpty && <span style={{color:'var(--warn)'}}> · enter a date — showing {date}</span>}</span>
    </div>
    <div className="row">
      <div style={{flex:'1 1 100%'}}><SkyMap rows={rows} occ={occ}/></div>
    </div>
    <div className="note">Today: <b>{occSigns.size}</b> signs occupied, <b>{12-occSigns.size}</b> empty. Readable simples: <b style={{color:'var(--gold)'}}>{[...occ].sort().join(' ')||'none'}</b>. A sector <b>lights up</b> when a planet is inside it; “×N” = N planets in that sign (informational — the reuse rule needs no conjunction to repeat a letter). Centre: the 3 mothers <span className="he">א מ ש</span> on a fixed circumpolar axis. יהוה / Genesis legibility live in their own Reading tabs.</div>
    <h3>Angle table — ecliptic longitude per body ({date})</h3>
    <table>
      <thead><tr><th>Body</th><th>Sign</th><th>Longitude</th><th>Degree in sign</th><th>Simple</th><th>Double</th></tr></thead>
      <tbody>
      {rows.map(r=>(
        <tr key={r.body}>
          <td>{GLYPH[r.body]} {r.body}</td><td>{r.sign}</td>
          <td className="deg">{r.lon.toFixed(2)}°</td>
          <td className="deg">{r.deg.toFixed(2)}° {r.boundary && <span className="boundary">⚠</span>}</td>
          <td className="letter-cell"><span className="he">{SIMPLE[r.sign][0]}</span><br/><span className="muted">{SIMPLE[r.sign][1]}={SIMPLE[r.sign][2]}</span></td>
          <td className="letter-cell">{DOUBLES[r.body] ? <><span className="he" style={{color:'var(--blue)'}}>{DOUBLES[r.body][0]}</span><br/><span className="muted">{DOUBLES[r.body][1]}</span></> : <span className="muted">—</span>}</td>
        </tr>
      ))}
      </tbody>
    </table>
    <div className="muted">Stellar reading (simple letters of the 10 bodies, slow → fast):</div>
    <div className="sentence">{sentence}</div>
    <div className="note"><b>Precession &amp; the map:</b> planet positions are computed for the actual date (astronomy-engine works for any year, past or future — including BCE, enter a negative year above), so the map reflects the real sky of that day. The 12 letter↔sign sectors are <b>tropical</b> — anchored to the equinox (Aries = λ☉=0°), so they do <b>not</b> precess and stay fixed to the seasons. <b>This is normal and intended:</b> the zodiac here is the fixed symbolic grid for reading letters, not the precessing sky. The slow drift of the sidereal constellations against the signs (precession, 50.29″/yr, 1° per ~72 yr) is tracked separately in the <b>Ages</b> and <b>Ayanamsa</b> tabs (precessional ages, Lahiri 24.18°). So: <b>tropical signs = the fixed grid that does NOT rotate with precession</b> (Raziel p.115 confirms: <i>“los signos del zodíaco están fijos”</i>); sidereal constellations = the precessing sky, handled in those tabs.</div>
  </>;
}

const PAGE_SIZE = 48;
// tri-state filter: 0 = off, 1 = include (keep only matching), 2 = exclude (drop matching)
function FilterChip({active, count, label, title, onToggle}){
  return <button className={active?'on':''} onClick={onToggle} title={title} aria-pressed={active}>{label} ({count})</button>;
}
function TranslatorTab({date, occ, words, q, setQ, genData}){
  const [page,setPage] = useState(0);
  // Filters are now binary (selected/not). A single global mode switch decides whether the
  // selected filters INCLUDE (keep only words matching all of them) or EXCLUDE (drop words
  // matching any of them). Default: include date-specific (=> only sky-dependent words).
  const [sel,setSel] = useState(new Set(['date']));
  const [mode,setMode] = useState('include');   // 'include' | 'exclude'
  const [minLen,setMinLen] = useState(1);
  const qn = q.trim().toLowerCase();
  const PROPS = {date:'simp', pal:'pal', g37:'m37', angel:'angel', name:'name', comp:'compound'};
  const toggle=(id)=>setSel(prev=>{const n=new Set(prev); n.has(id)?n.delete(id):n.add(id); return n;});
  const filtered = useMemo(()=>{
    let r = words;
    if(qn) r = r.filter(w => (w.gloss||'').toLowerCase().includes(qn) || w.translit.toLowerCase().includes(qn) || w.disp.includes(q.trim()));
    if(sel.size){
      const ids=[...sel];
      if(mode==='include') r = r.filter(w => ids.every(id => w[PROPS[id]]));      // AND: must match all selected
      else                  r = r.filter(w => !ids.some(id => w[PROPS[id]]));     // drop if matches any selected
    }
    if(minLen>1) r = r.filter(w=>w.len>=minLen);
    return r;
  }, [words, qn, sel, mode, minLen]);
  useEffect(()=>{ setPage(0); }, [qn, date, sel, mode, minLen]);
  const dateCount = useMemo(()=>words.filter(w=>w.simp).length,[words]);
  const alwaysCount = useMemo(()=>words.filter(w=>!w.simp).length,[words]);
  const palCount = useMemo(()=>words.filter(w=>w.pal).length,[words]);
  const g37Count = useMemo(()=>words.filter(w=>w.m37).length,[words]);
  const angelCount = useMemo(()=>words.filter(w=>w.angel).length,[words]);
  const nameCount = useMemo(()=>words.filter(w=>w.name).length,[words]);
  const compCount = useMemo(()=>words.filter(w=>w.compound).length,[words]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const cur = Math.min(page, pages-1);
  const slice = filtered.slice(cur*PAGE_SIZE, cur*PAGE_SIZE + PAGE_SIZE);
  // Per-gloss legibility probability — computed, not hardcoded. For each displayed word,
  // count the exact fraction of days in the scanned Predictor year whose occupied simple
  // set covers the word's required simples (the S⊆O rule, empirical — no independence
  // assumption, no fixed q). Low % = special/rare (green); high % = common (red).
  const probs = useMemo(()=>{
    const m=new Map();
    if(!genData?.dayOccs) return m;
    const n=genData.dayOccs.length || 1;
    for(const w of slice){
      const req = w.simp ? [...w.simp] : [];
      if(!req.length){ m.set(w.he,1); continue; }
      let c=0; for(const o of genData.dayOccs) if(req.every(x=>o.has(x))) c++;
      m.set(w.he, c/n);
    }
    return m;
  },[slice,genData]);
  return <>
    <h2>Reader — everything readable on {date} <span className="pill">{words.length} words</span></h2>
    <div className="controls" style={{marginBottom:8}}>
      <input type="text" placeholder="search by gloss or transliteration…" value={q} onChange={e=>setQ(e.target.value)} style={{flex:'1 1 240px'}} autoFocus aria-label="Search readable words"/>
    </div>
    <div className="muted" style={{marginBottom:6, fontSize:'.8rem'}}>Select filters, then choose a mode. <b>Include ✓</b> keeps only words matching <b>all</b> selected filters; <b>Exclude ✗</b> drops words matching <b>any</b> selected filter. With no filter selected, all words show. Glosses are Strong's English.</div>
    <div className="controls" style={{marginBottom:8, flexWrap:'wrap', alignItems:'center'}}>
      <span className="muted" style={{fontSize:'.8rem'}}>filters:</span>
      <FilterChip active={sel.has('date')} count={dateCount} label="date-specific" title="Words with zodiac simples (date signal). Include = only date-specific; exclude = only always-readable" onToggle={()=>toggle('date')}/>
      <FilterChip active={sel.has('pal')} count={palCount} label="palindrome" title="Consonant palindrome (reads the same backwards)" onToggle={()=>toggle('pal')}/>
      <FilterChip active={sel.has('g37')} count={g37Count} label="gematria ×37" title="Gematria is a multiple of 37" onToggle={()=>toggle('g37')}/>
      <FilterChip active={sel.has('angel')} count={angelCount} label="angel +אל/+יה" title="The word + suffix אל / יה is one of the 72 Shem HaMephorash angel names (Exodus 14:19-21)" onToggle={()=>toggle('angel')}/>
      <FilterChip active={sel.has('name')} count={nameCount} label="name (proper)" title="The word is a proper noun (name) in Strong — incl. theophoric names bearing אל / יה" onToggle={()=>toggle('name')}/>
      <FilterChip active={sel.has('comp')} count={compCount} label="compound" title="Concatenated multi-root entry whose gloss is truncated (e.g. 'dove of')" onToggle={()=>toggle('comp')}/>
      <span className="muted" style={{fontSize:'.8rem', marginLeft:6}}>mode:</span>
      <button className={mode==='include'?'on':''} onClick={()=>setMode('include')} title="Keep only words matching ALL selected filters" aria-pressed={mode==='include'}>✓ include</button>
      <button className={mode==='exclude'?'ex':''} onClick={()=>setMode('exclude')} title="Drop words matching ANY selected filter" aria-pressed={mode==='exclude'}>✗ exclude</button>
      {sel.size>0 && <button onClick={()=>setSel(new Set())} title="Clear all selected filters" style={{fontSize:'.78rem'}}>clear ({sel.size})</button>}
    </div>
    <div className="controls" style={{marginBottom:8, flexWrap:'wrap', alignItems:'center'}}>
      <span className="muted">min length</span>
      <input type="number" min="1" max="12" value={minLen} onChange={e=>{const n=parseInt(e.target.value,10); setMinLen(isNaN(n)||n<1?1:n);}} style={{width:56}} aria-label="Minimum word length"/>
      <span className="muted">{filtered.length} shown · {alwaysCount} always-readable</span>
    </div>
    <div className="muted" style={{marginBottom:8}}>
      Reading rule applied: every <b>simple (zodiac) letter</b> in a word must sit in an <b>occupied sign</b> today. Mothers + doubles are always available. Available today: <b style={{color:'var(--gold)'}}>{[...occ].sort().join(' ')||'none'}</b>. <span style={{color:'var(--violet)'}}>violet</span> = always readable (no simples). Badges: <span style={{color:'var(--gold)'}}>palindrome</span> · <span style={{color:'var(--green)'}}>×37</span> · <span style={{color:'var(--violet)'}}>angel</span> · <span style={{color:'var(--blue)'}}>name</span> · <span style={{color:'var(--warn)'}}>compound</span>. <span className="prob ok">%</span> = legibility over the scanned year (computed, not hardcoded): <span className="prob ok">green</span> special (rare), <span className="prob mid">amber</span> frequent, <span className="prob spec">red</span> common — each pill also shows the recurrence (≈ every N d). Sorted: longest first.
    </div>
    <div className="tcards">
      {slice.map((w,i)=>(
        <div key={w.he+w.translit+i} className={'tcard'+(w.simp?'':' always')}>
          <div className="the">{w.disp}</div>
          <div className="read">{w.translit}</div>
          <div className="trans">{w.gloss}</div>
          <div className="g">{w.len} letters · gematria {w.gem}{w.pal && <span style={{color:'var(--gold)'}}> · palindrome</span>}{w.m37 && <span style={{color:'var(--green)'}}> · ×37</span>}{w.angel && <span style={{color:'var(--violet)'}}> · angel</span>}{w.name && <span style={{color:'var(--blue)'}}> · name{w.theo?' (theophoric)':''}</span>}{w.compound && <span style={{color:'var(--warn)'}}> · compound (gloss truncated)</span>}</div>
          {probs.has(w.he) && (()=>{ const p=probs.get(w.he); const n=genData.dayOccs.length; const pct = p<0.001 ? '<0.1' : (p*100).toFixed(p<0.1?1:0); const cls = p>=0.5 ? 'spec' : p>=0.2 ? 'mid' : 'ok'; const tag = p>=0.5 ? 'common' : p>=0.2 ? 'frequent' : 'special'; const leg=p*n; const cad = leg<=1 ? '≈ once / year' : leg>=n ? 'every day' : `≈ every ${Math.max(1,Math.round(n/leg))} d`; return <span className={'prob '+cls} title={`Empirical legibility over ${n} days of ${genData.year}: ${pct}% of days this word's required simples are all occupied (S⊆O, computed from astronomy-engine — not a hardcoded value). Recurrence: ${cad}. Low % = special/rare (green); high % = common (red).`}>{pct}% · {tag} · {cad}</span>; })()}
          {w.angel && <div className="simp" style={{color:'var(--violet)'}}>angel: +אל → <span className="he" style={{fontSize:'.95rem'}}>{w.angel.el}</span> · +יה → <span className="he" style={{fontSize:'.95rem'}}>{w.angel.yh}</span></div>}
          <div className="simp">{w.simp ? ('simples: '+[...w.simp].join(' ')) : 'no simples (always)'}</div>
        </div>
      ))}
    </div>
    {filtered.length===0 && <div className="muted" style={{padding:'18px 0'}}>No words match these filters on {date}. Loosen a filter or pick another date.</div>}
    {filtered.length > PAGE_SIZE && (
      <div className="controls" style={{marginTop:12}}>
        <button onClick={()=>setPage(p=>Math.max(0,p-1))} disabled={cur===0} className={cur===0?'':''}>◀ prev</button>
        <span className="pill">page {cur+1} / {pages} · {filtered.length} words · {PAGE_SIZE}/page</span>
        <button onClick={()=>setPage(p=>Math.min(pages-1,p+1))} disabled={cur>=pages-1}>next ▶</button>
        <span className="muted">jump:</span>
        <input type="number" min="1" max={pages} value={cur+1} onChange={e=>{const n=parseInt(e.target.value,10); if(!isNaN(n)) setPage(Math.max(0,Math.min(pages-1,n-1)));}} style={{width:64}} aria-label="Jump to page"/>
      </div>
    )}
    <div className="note">Reuse rule: a simple is either present or not; revisiting a sign adds or removes no letters. That is why one date reads thousands of words — paginate, search and filter to cut them down. Palindrome and ×37 are textual facts about the word, not sky-reading rules; use them to surface structure, not to decide legibility. <b>Angel</b> = the word + suffix <span className="he">אל</span> / <span className="he">יה</span> is one of the 72 Shem HaMephorash names (Exodus 14:19-21, §15b.4) — a name made by adding the suffix. <b>Name</b> = the word is a proper noun in Strong (people, places, theophoric names bearing <span className="he">אל</span>/<span className="he">יה</span>).</div>
  </>;
}

function RuleTab({occ}){
  return <>
    <h2>How it reads — the reuse rule</h2>
    <table>
      <thead><tr><th>Class</th><th>Letters</th><th>Assigned to</th><th>Position-dependent?</th><th>Reusable?</th></tr></thead>
      <tbody>
        <tr><td>3 mothers</td><td>א מ ש</td><td>elements · Draco / Ursa Minor / Cassiopea (fixed)</td><td>no</td><td>yes, always</td></tr>
        <tr><td>7 doubles</td><td>ב ג ד כ פ ר ת</td><td>the 7 planets (identity of the planet)</td><td>no</td><td>yes, always</td></tr>
        <tr><td>12 simples</td><td>ה ו ז ח ט י ל נ ס ע צ ק</td><td>the 12 zodiac signs</td><td><b>yes — if its sign is occupied</b></td><td>yes (membership)</td></tr>
      </tbody>
    </table>
    <div className="muted" style={{marginTop:10}}>Read the simple of the occupied sign. Repeating a simple needs no conjunction. Words using only mothers+doubles (<span className="he">ברא</span>, <span className="he">אב</span>, <span className="he">שבת</span>, <span className="he">אמת</span>) are always readable.</div>
    <div style={{marginTop:10}}><span className="muted">Simples today: </span>{SIGNS.map(s=>{const he=SIMPLE[s][0]; return <span key={s} className={'key '+(occ.has(he)?'on':'off')}>{he} {s}</span>;})}</div>
    <div className="note">Empty today: {SIGNS.filter(s=>!occ.has(SIMPLE[s][0])).map(s=>SIMPLE[s][0]+' ('+s+')').join(', ')||'none'}.</div>
    <Fig n={2} doc="From the article (§3): the tripartite mapping of the Sefer Yetzirah over the real sky. Outer ring: 12 simples = 12 signs. Middle ring: the 7 doubles = the 7 planets at their longitudes. Centre: the 3 mothers on the fixed circumpolar axis that does not precess. A highlighted sector = an occupied sign = a simple legible that day — this is the reading rule, drawn."/>
  </>;
}

function YhvhTab({date, occ, yhvhOk, bs}){
  return <>
    <h2>The 4 letters of <span className="he">יהוה</span> on {date} <span className={'pill '+(yhvhOk?'ok':'no')}>{yhvhOk?'readable':'not readable'}</span></h2>
    <div className="muted" style={{marginBottom:8}}>With reuse, 3 signs suffice: <b>י</b>(Virgo) + <b>ה</b>(Aries, twice) + <b>ו</b>(Taurus). No conjunction needed.</div>
    <div className="cards">
      <div className={'card'+(occ.has('י')?'':' missing')}><span className="l">י</span><div style={{fontSize:'.8rem',fontWeight:600}}>Yod</div><div className="src">needs Virgo</div><div className="src">{bs['Virgo']?.length ? <>from <b>{bs['Virgo'][0].body}</b> · {bs['Virgo'][0].deg.toFixed(1)}°</> : <b>no planet</b>}</div></div>
      <div className={'card'+(occ.has('ה')?'':' missing')}><span className="l">ה</span><div style={{fontSize:'.8rem',fontWeight:600}}>Heh (1st)</div><div className="src">needs Aries</div><div className="src">{bs['Aries']?.length ? <>from <b>{bs['Aries'][0].body}</b> · {bs['Aries'][0].deg.toFixed(1)}°</> : <b>no planet</b>}</div></div>
      <div className={'card'+(occ.has('ו')?'':' missing')}><span className="l">ו</span><div style={{fontSize:'.8rem',fontWeight:600}}>Vav</div><div className="src">needs Taurus</div><div className="src">{bs['Taurus']?.length ? <>from <b>{bs['Taurus'][0].body}</b> · {bs['Taurus'][0].deg.toFixed(1)}°</> : <b>no planet</b>}</div></div>
      <div className={'card'+(occ.has('ה')?'':' missing')}><span className="l">ה</span><div style={{fontSize:'.8rem',fontWeight:600}}>Heh (2nd)</div><div className="src">reuses Aries</div><div className="src">{bs['Aries']?.length ? <>same <b>{bs['Aries'][0].body}</b></> : <b>no planet</b>}</div></div>
    </div>
    <div style={{marginTop:12,padding:'12px 14px',background:'var(--panel2)',borderRadius:8}}>
      {yhvhOk ? <>
        <div className="muted">It forms today ({date}):</div>
        <div className="big">י ({bs['Virgo'][0].body}) → ה ({bs['Aries'][0].body}) → ו ({bs['Taurus'][0].body}) → ה ({bs['Aries'][0].body} reused)</div>
        <div className="big">= <span className="he">יהוה</span> · “the One who is / Eternal” · gematria 26</div>
      </> : <>
        <div className="muted">It does not form <span className="he">יהוה</span> today. Missing:</div>
        {['י:Virgo','ה:Aries','ו:Taurus'].filter(x=>!occ.has(x[0])).map((x,i)=>{const [l,s]=x.split(':'); return <div key={i} className="note" style={{color:'var(--red)'}}><span className="he" style={{fontSize:'1.2rem'}}>{l}</span> → needs {s} · no planet today</div>;})}
      </>}
    </div>
  </>;
}

function GenesisTab({date, occ, genesisOk}){
  const lengths=[6,3,5,2,5,3,4];
  const letters=GEN_VALUES.reduce((a,v)=>a+ (''+v).split('').reduce((x,d)=>x+ +d,0),0); // not used; keep for note
  const words37=GEN_VALUES.filter(v=>v%37===0).length;
  const sub37=countSubset(GEN_VALUES,37);
  const totalLetters=lengths.reduce((a,b)=>a+b,0);
  return <>
    <h2>Genesis 1:1 · <span className="he">בראשית ברא אלהים את השמים ואת הארץ</span> <span className={'pill '+(genesisOk?'ok':'no')}>{genesisOk?`readable on ${date}`:`not readable on ${date}`}</span></h2>
    <div className="muted" style={{marginBottom:8}}>The 7 words together use the simples <b>י ה ל ו צ</b> (Virgo, Aries, Libra, Taurus, Aquarius). Readable only when all 5 signs are occupied at once — Aquarius and Aries anchored by Pluto and Neptune.</div>
    {GENESIS.map(([w,en],i)=>{const c=norm(w); const ss=[...simpleSet(c)].sort(); const ok=formable(c,occ); const m37=GEN_VALUES[i]%37===0; return (
      <div key={i} className={'gw '+(ok?'ok':'no')}>
        <span className="w">{displayHe(c)}</span>
        <span className="es" style={{color:ok?'var(--green)':'var(--red)'}}>{en}</span>
        <span className="muted">· gematria {GEN_VALUES[i]}{m37?` = ${GEN_VALUES[i]/37}×37`:''}</span>
        <span style={{marginLeft:'auto'}}>
          {ss.length===0 ? <span style={{color:'var(--violet)'}}>no simples → always</span> : ss.map(l=> <span key={l} className={'key '+(occ.has(l)?'on':'off')} style={{marginLeft:2}}>{l} {LETTER_TO_SIGN[l]}</span>)}
        </span>
      </div>
    );})}
    <div style={{marginTop:10,padding:'10px 14px',background:'var(--panel2)',borderRadius:8}}>
      <span className="muted">Standard gematria total: </span><b style={{color:'var(--gold)',fontSize:'1.15rem'}}>{GEN_TOTAL}</b>
      <span className="muted"> = 913 + 203 + 86 + 401 + 395 + 407 + 296 · 2701 = 37×73 · triangular T₇₃ · 2701+1072 = 3773 (mirror-palindrome, but non-selective: ~38% of a random text does the same).</span>
    </div>
    <h3>37×73 structure of the 7 words (§15b.5 — verified)</h3>
    <ul className="muted">
      <li>Total = 2701 = 37×73 = T₇₃. Letter count = {totalLetters} = T₇ (7+8/2×… = 28). 7 words × {totalLetters} letters = {7*totalLetters} = 14².</li>
      <li>Word-sums that are multiples of 37: <b>{words37}/7</b> (407 = 11×37, 296 = 8×37 — the last two).</li>
      <li>Subsets (of 2⁷−1 = 127) whose sum is a multiple of 37: <b>{sub37}/127</b> (uniform chance ≈ {127/37}≈3.4).</li>
      <li><b style={{color:'var(--green)'}}>Null</b>: 100,000 permutations of the 28-letter multiset regrouped into the fixed lengths (6,3,5,2,5,3,4), mulberry32 seed 20260807 → subsets p ≈ <b>3.1×10⁻⁴</b>; words p ≈ 8.2×10⁻³. The partition is genuinely biased toward 37, beyond the trivial total=2701=37×73.</li>
    </ul>
    <div className="note">Genesis opens in ~13-year windows recurring every ~491 years (the Neptune–Pluto synodic cycle). Previous: 427 BCE (Axial Age), 61 CE (Temple), 552, 1043 (Schism), 1535 (Reformation/Copernicus). Current: 2025–2038.</div>
    <Fig n={10} doc="From the article (§15b.5): the 7 words and their gematrias. The two gold bars are the words that are multiples of 37 (ואת 407=11×37, הארץ 296=8×37). The permutation null shows the bias toward 37 is real (p≈3.1×10⁻⁴), beyond the trivial total 2701=37×73."/>
  </>;
}

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
  // presets: spread from always-readable (no simples) to rare
  const presets=[
    ['יהוה','YHVH · the temporal Name'],
    ['אהיה','Ehyeh · I am'],
    ['משיח','Messiah'],
    ['אבדון','Abaddon'],
    ['ישראל','Israel'],
    ['אלהים','Elohim'],
    ['בראשית','Bereshit · Genesis 1:1'],
    ['אמת','Emet · truth (always)'],
    ['שבת','Shabbat · rest (always)'],
  ];
  function wordDoyList(word){
    // returns array of day-of-year indices where `word` is readable, computed from dayOccs
    if(!genData || !genData.dayOccs) return [];
    const req=simpleSet(norm(word));
    const out=[];
    for(let i=0;i<genData.dayOccs.length;i++){
      let ok=true;
      for(const c of req){ if(!genData.dayOccs[i].has(c)){ ok=false; break; } }
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
      <div className="legend">Move years with ◀ ▶. The 2028–2029 cluster (Pluto in Aquarius, Neptune in Aries) lifts the rare glosses' counts.</div>
    </>}
  </>;
}

// ====== Cycles tab — graphical representations (inline SVG, self-contained) ======

// Chaldean heptagram: 7 planets in sidereal order around the ring; the {7/3} star joins
// them in weekday order (each day jumps 3 planets, 24 h mod 7 = 3). 7 doubles = 7 days.
function Heptagram(){
  const cx=170, cy=150, R=120;
  const planets=['Saturn','Jupiter','Mars','Sun','Venus','Mercury','Moon'];
  const dayOf={Saturn:'Sat',Sun:'Sun',Moon:'Mon',Mars:'Tue',Mercury:'Wed',Jupiter:'Thu',Venus:'Fri'};
  const he=['ב','ג','ד','כ','פ','ר','ת'];
  const pt=i=>{ const a=(-90+i*360/7)*Math.PI/180; return [cx+R*Math.cos(a), cy+R*Math.sin(a)]; };
  const order=[0,3,6,2,5,1,4,0];           // weekday (jump-3) order through the 7
  const starD=order.map((k,j)=>{ const [x,y]=pt(k); return (j===0?'M':'L')+x.toFixed(1)+' '+y.toFixed(1); }).join(' ')+' Z';
  return <svg viewBox="0 0 340 300" width="100%" style={{maxWidth:340}} role="img" aria-label="Chaldean heptagram">
    <path d={starD} fill="none" stroke="#e8c87a" strokeWidth="1.4" opacity="0.85"/>
    <circle cx={cx} cy={cy} r={R} fill="none" stroke="#283145" strokeWidth="1"/>
    {planets.map((p,i)=>{ const [x,y]=pt(i); return <g key={p}>
      <circle cx={x} cy={y} r="18" fill="#1a2030" stroke="#7fb0ff" strokeWidth="1.4"/>
      <text x={x} y={y-1} textAnchor="middle" fontSize="15" fill="#e8c87a">{GLYPH[p]}</text>
      <text x={x} y={y+11} textAnchor="middle" fontSize="13" fill="#7fb0ff" fontFamily="serif">{he[i]}</text>
      <text x={x} y={y-26} textAnchor="middle" fontSize="10" fill="#8a96ad">{p} · {dayOf[p]}</text>
    </g>; })}
    <text x={cx} y={cy-6} textAnchor="middle" fontSize="11" fill="#8a96ad">Chaldean order</text>
    <text x={cx} y={cy+10} textAnchor="middle" fontSize="11" fill="#e8c87a">7 = 7 = 7</text>
    <text x={cx} y={cy+26} textAnchor="middle" fontSize="9" fill="#8a96ad">sidereal · mod 7 · days</text>
  </svg>;
}

// Eclipse geometry: the ecliptic (Sun), the Moon's inclined path crossing at a node, and
// the |β|<1.6° window that the live scan uses. Moon at node → eclipse; far from node → none.
function SarosDiagram(){
  return <svg viewBox="0 0 460 220" width="100%" style={{maxWidth:460}} role="img" aria-label="Eclipse node geometry">
    <rect x="40" y="98" width="380" height="24" fill="#6fe0a0" opacity="0.07"/>
    <line x1="40" y1="110" x2="420" y2="110" stroke="#7fb0ff" strokeWidth="1.5"/>
    <line x1="60" y1="95" x2="400" y2="125" stroke="#c79bff" strokeWidth="1.3" strokeDasharray="5 4"/>
    <circle cx="230" cy="110" r="16" fill="#e8c87a"/>
    <circle cx="230" cy="110" r="16" fill="none" stroke="#ffcf6a" strokeWidth="1"/>
    <circle cx="262" cy="110" r="6" fill="#1a2030" stroke="#6fe0a0" strokeWidth="1.4"/>
    <circle cx="120" cy="92" r="6" fill="#1a2030" stroke="#ff8a8a" strokeWidth="1.4"/>
    <text x="230" y="74" textAnchor="middle" fontSize="10" fill="#ffcf6a">node · eclipse season</text>
    <text x="262" y="135" textAnchor="middle" fontSize="9" fill="#6fe0a0">Moon at node → eclipse</text>
    <text x="120" y="80" textAnchor="middle" fontSize="9" fill="#ff8a8a">Moon far from node → none</text>
    <text x="40" y="92" fontSize="9" fill="#7fb0ff">ecliptic (Sun's path)</text>
    <text x="300" y="140" fontSize="9" fill="#c79bff">Moon's path · 5.1° incline</text>
    <text x="40" y="158" fontSize="9" fill="#6fe0a0">|β| &lt; 1.6° window (scan threshold)</text>
  </svg>;
}

// Precession: one zodiac wheel, two zero-points. Tropical Aries 0° is fixed to the equinox
// (does NOT precess); sidereal Aries 0° is fixed to the stars and precesses away from it —
// the gap is the ayanamsa (24.18° now). The sidereal frame rotates clockwise with precession.
function PrecessionDiagram(){
  const cx=230, cy=130, R=120, r=70;
  const seg=(i,cls,lab)=>{ const a1=(-90+i*30)*Math.PI/180, a2=(-90+(i+1)*30)*Math.PI/180;
    const x1=cx+R*Math.cos(a1), y1=cy+R*Math.sin(a1), x2=cx+R*Math.cos(a2), y2=cy+R*Math.sin(a2);
    const mx=cx+(R-22)*Math.cos((a1+a2)/2), my=cy+(R-22)*Math.sin((a1+a2)/2);
    return <g key={i}>
      <path d={`M ${cx} ${cy} L ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2} Z`} fill={cls} stroke="#283145" strokeWidth="0.8"/>
      <text x={mx} y={my} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#8a96ad">{lab}</text>
    </g>; };
  // tropical Aries 0° at top (-90°); sidereal Aries 0° offset by +ayanamsa
  const ayAng=(-90+24.18)*Math.PI/180;
  const tx=cx+R*Math.cos(-90*Math.PI/180), ty=cy+R*Math.sin(-90*Math.PI/180);
  const sx=cx+R*Math.cos(ayAng), sy=cy+R*Math.sin(ayAng);
  return <svg viewBox="0 0 460 280" width="100%" style={{maxWidth:460}} role="img" aria-label="Precession: tropical vs sidereal zodiac">
    <circle cx={cx} cy={cy} r={R} fill="#1a2030" stroke="#283145"/>
    {SIGNS.map((s,i)=>seg(i, i%2? '#131826':'#1a2030', s.slice(0,3)))}
    {/* tropical Aries 0° marker — fixed */}
    <line x1={cx} y1={cy} x2={tx} y2={ty} stroke="#e8c87a" strokeWidth="2"/>
    <circle cx={tx} cy={ty} r="5" fill="#e8c87a"/>
    <text x={tx} y={ty-10} textAnchor="middle" fontSize="9" fill="#e8c87a">♈ tropical 0° (fixed to equinox — does NOT precess)</text>
    {/* sidereal Aries 0° marker — precessing */}
    <line x1={cx} y1={cy} x2={sx} y2={sy} stroke="#c79bff" strokeWidth="2" strokeDasharray="4 3"/>
    <circle cx={sx} cy={sy} r="5" fill="#c79bff"/>
    <text x={sx+10} y={sy+4} fontSize="9" fill="#c79bff">sidereal 0° (fixed to stars — precesses)</text>
    {/* ayanamsa arc */}
    <path d={`M ${cx+(R-34)*Math.cos(-90*Math.PI/180)} ${cy+(R-34)*Math.sin(-90*Math.PI/180)} A ${R-34} ${R-34} 0 0 1 ${cx+(R-34)*Math.cos(ayAng)} ${cy+(R-34)*Math.sin(ayAng)}`} fill="none" stroke="#ffcf6a" strokeWidth="1.4"/>
    <text x={cx+ (R-50)*Math.cos((-90+12)*Math.PI/180)} y={cy+(R-50)*Math.sin((-90+12)*Math.PI/180)+3} textAnchor="middle" fontSize="9" fill="#ffcf6a">ayanamsa 24.18°</text>
    {/* precession direction arrow */}
    <path d={`M ${cx} ${cy+44} A 44 44 0 0 0 ${cx-31} ${cy+31}`} fill="none" stroke="#8a96ad" strokeWidth="1.2" markerEnd="url(#ar)"/>
    <defs><marker id="ar" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#8a96ad"/></marker></defs>
    <text x={cx} y={cy} textAnchor="middle" fontSize="9" fill="#8a96ad">precession →</text>
  </svg>;
}

// Metonic 19-year cycle: 19 nodes around a ring. 7 leap years (13 months) in gold = the 7
// doubles; 12 common (12 months). 19 yr ≈ 235 lunations. 19 = 7 doubles + 12 simples.
function MetonDiagram(){
  const cx=160, cy=110, R=95;
  const leap=new Set([3,6,8,11,14,17,19]);
  const pt=y=>{ const a=(-90+(y-1)*360/19)*Math.PI/180; return [cx+R*Math.cos(a), cy+R*Math.sin(a)]; };
  return <svg viewBox="0 0 360 220" width="100%" style={{maxWidth:360}} role="img" aria-label="Metonic 19-year cycle">
    <circle cx={cx} cy={cy} r={R+14} fill="none" stroke="#283145"/>
    {Array.from({length:19},(_,i)=>i+1).map(y=>{ const [x,yp]=pt(y); const L=leap.has(y); return <g key={y}>
      <circle cx={x} cy={yp} r={L?13:10} fill={L?'#e8c87a':'#1a2030'} stroke={L?'#e8c87a':'#283145'} strokeWidth="1.2"/>
      <text x={x} y={yp+3} textAnchor="middle" fontSize="9" fill={L?'#0b0e14':'#8a96ad'} fontWeight={L?700:400}>{L?'13':'12'}</text>
      <text x={x} y={L?yp-19:yp-16} textAnchor="middle" fontSize="8" fill="#8a96ad">{y}</text>
    </g>; })}
    <text x={cx} y={cy-8} textAnchor="middle" fontSize="11" fill="#e8c87a">19 yr</text>
    <text x={cx} y={cy+6} textAnchor="middle" fontSize="9" fill="#8a96ad">= 235 months</text>
    <text x={cx} y={cy+20} textAnchor="middle" fontSize="9" fill="#8a96ad">7 leap + 12 common</text>
  </svg>;
}

function WeekTab({date, rows}){
  return <>
    <h2>The week — 7 doubles = 7 planets = 7 days · where each is on {date}</h2>
    <div className="week">
      {WEEK.map(([day,plan],idx)=>{
        const r=rows.find(x=>x.body===plan);
        const isToday = (()=>{ const d=parseDate(date); return d ? idx===d.getUTCDay() : false; })();
        return (
          <div key={day} className={'day'+(isToday?' today':'')}>
            <div className="dn">{day}{isToday?' · date':''}</div>
            <div className="pl">{plan}</div>
            <div className="l">{DOUBLES[plan][0]}</div>
            <div className="pl">{r ? <>{r.sign} <span className="he" style={{fontSize:'1rem'}}>{SIMPLE[r.sign][0]}</span></> : '—'}</div>
          </div>
        );
      })}
    </div>
    <h3>Chaldean order — the heptagram 7 = 7 = 7 (§15b.9, verified)</h3>
    <ul className="muted">
      <li><b>(A) Sidereal periods</b>, slow → fast: Saturn (29.46 a) &gt; Jupiter (11.86) &gt; Mars (1.88) &gt; Sun (1.00) &gt; Venus (0.615) &gt; Mercury (0.241) &gt; Moon (0.075). This is the Chaldean order — an astronomical fact.</li>
      <li><b>(B) Hourly week</b>: 24 h/day, each hour ruled by the next planet in Chaldean order. The planet of the 1st hour names the day. 24 mod 7 = 3 → the next day jumps 3 planets.</li>
      <li><b>(C) Etymology</b>: Tuesday = Mars/Martes, Wednesday = Mercury/Miércoles, Thursday = Jupiter/Jueves, Friday = Venus/Viernes, Saturday = Saturn/Sábado — the Romance names preserve the planet.</li>
      <li>The 7 doubles (ב ג ד כ פ ר ת) are the 7 planets; the 7 planets are the 7 days. The heptagram 7=7=7 closes by sidereal periods + mod-7 arithmetic + etymology. <b>Note</b>: the 7-day week is a cultural (Chaldean-Babylonian) artefact, not a continuous astronomical cycle; its astronomical anchor is the Chaldean order of the 7 planets, which is real.</li>
    </ul>
    <div className="fig"><Heptagram/><div className="cap">The Chaldean heptagram — 7 planets in sidereal order on the ring; the gold {`{7/3}`} star traces weekday order (Sat→Sun→Mon→Tue→Wed→Thu→Fri), each day jumping 3 planets (24 h mod 7 = 3). 7 doubles = 7 planets = 7 days.</div></div>
    <div className="note">Each planet (a double) travels through the 12 signs (simples); that planet is read in a different sign depending on the day.</div>
  </>;
}

function AgesTab({date, rows}){
  const ages=useMemo(()=>ageBoundaries(),[]);
  return <>
    <h2>Stellar ages · precession + the Neptune–Pluto cycle</h2>
    <div className="muted" style={{marginBottom:10}}>The equinox recedes 50.29″/year → one precessional age per sign, ≈{Math.round(AGE)} years. Equinox today: <b>{EQUINOX_LON.toFixed(1)}°</b> sidereal (Pisces). Lahiri ayanamsa 24.18° (2024). The 6 Genesis windows (Neptune∈Aries ∧ Pluto∈Aquarius) recur every ~491 years and coincide with major religious-linguistic reformations:</div>
    <div className="grid2" style={{marginBottom:10}}>
      {ERA_WINDOWS.map((e,i)=>(
        <div key={i} className={'era'+(i===ERA_WINDOWS.length-1?' next':'')}>
          <div className="top"><span><b>{e.w}</b></span><span className="yr">~491 y</span></div>
          <div className="desc">{e.ev}</div>
        </div>
      ))}
    </div>
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
    <div style={{marginTop:12,padding:'12px 14px',background:'var(--panel2)',borderRadius:8}}>
      <div className="muted"><b>Slow activators today ({date}):</b></div>
      <div style={{marginTop:6}}>
        {['Pluto','Neptune','Uranus'].map(p=>{const r=rows.find(x=>x.body===p); const era=ages.find(a=>a.sign===r.sign); return (
          <div key={p} className="note">{GLYPH[p]} <b>{p}</b> in {r.sign} (<span className="he">{SIMPLE[r.sign][0]}</span>{era&&era.start<=2026&&2026<era.end?' · current age':''}{era&&era.start>2026?' · incoming age':''}) · {r.deg.toFixed(1)}°</div>
        );})}
      </div>
      <div className="note" style={{marginTop:8}}>Pluto in Aquarius (<span className="he">צ</span>) and Neptune in Aries (<span className="he">ה</span>) are the two anchors that make Genesis 1:1 readable. The Age of Aquarius (~{yrLabel(ages.find(a=>a.sign==='Aquarius').start)}, precessional) and the Neptune–Pluto synodic cycle (~491 y) coincide now.</div>
    </div>
    <Fig n={9} doc="From the article (§15b.8): the six ~13-year windows in which Genesis 1:1 is legible (Neptune∈Aries ∧ Pluto∈Aquarius), mean separation 490.5 y = the Neptune–Pluto synodic. Each marks a major religious-linguistic re-formation. Regularity p &lt; 5×10⁻⁶; caveat: n=6 and selection bias — hypothesis, not cause."/>
  </>;
}

function GematriaTab(){
  const [gSub,setGSub]=useState('hebrew');
  const subs=[['hebrew','Hebrew'],['greek','Greek'],['arabic','Arabic'],['indian','Indian'],['more','More']];
  return <>
    <h2>Gematria — letter-number systems across cultures (§2, §15b.2)</h2>
    <div className="muted" style={{marginBottom:10}}>Every culture with a written alphabet developed a letter→number system. The additive isopsephies (Hebrew, Greek, Arabic, Coptic, Cyrillic) share one structure — units 1–9, tens 10–90, hundreds 100–900/1000 — because all descend from the Phoenician/Greek scheme. India is different: the katapayadi is <b>positional</b> (right-to-left) and the Āryabhaṭa is consonant×vowel-power. Pre-1500 systems only; post-1500 constructions are flagged.</div>
    <SubTabs items={subs} active={gSub} onChange={setGSub}/>
    {gSub==='hebrew' && <GematriaHebrew/>}
    {gSub==='greek'  && <GematriaGreek/>}
    {gSub==='arabic' && <GematriaArabic/>}
    {gSub==='indian' && <GematriaIndian/>}
    {gSub==='more'   && <GematriaMore/>}
  </>;
}

function GematriaHebrew(){
  const [inp,setInp]=useState('משיח');
  const [big,setBig]=useState(false); // Mispar Gadol toggle
  const c=norm(inp);
  const letters=[...c].filter(ch=>GV[ch]);
  const total=letters.reduce((a,ch)=>a+letterVal(ch),0);
  const groups=aiqGroups();
  return <>
    <div className="controls" style={{marginBottom:10}}>
      <input type="text" value={inp} onChange={e=>setInp(e.target.value)} placeholder="Hebrew name, e.g. משיח / אברהם" style={{flex:'1 1 260px'}}/>
      <span className="pill">letters: {letters.length}</span>
      <button className={'subtab'+(big?' active':'')} onClick={()=>setBig(b=>!b)} title="Mispar Gadol: finals = 500–900 (off = Mispar Hechrachi, finals = regular). Genesis 1:1 = 2701 needs Hechrachi.">Mispar Gadol {big?'ON':'off'}</button>
    </div>
    <div className="muted" style={{marginBottom:8}}>22-letter gematria, א=1 … ת=400. <b>Mispar Hechrachi</b> (default): final letters count as their regular value — required for Gen 1:1 = 2701 = 37×73. <b>Mispar Gadol</b>: finals = 500–900. <b>Mispar Katan Mispari</b> = the digital-root reduction (below, "Aiq Bekar").</div>
    {letters.length>0 && <>
      <table>
        <thead><tr><th>Letter</th><th>Name</th><th>Value</th><th>Reduction (1–9)</th></tr></thead>
        <tbody>
        {letters.map((ch,i)=>{
          return <tr key={i}><td className="letter-cell"><span className="he">{displayHe(c).includes(ch)?ch:ch}</span></td>
            <td className="muted">{ch}</td>
            <td className="big">{letterVal(ch)}</td>
            <td className="big" style={{color:'var(--blue)'}}>{reduce9(letterVal(ch))}</td></tr>;
        })}
        </tbody>
      </table>
      <div style={{marginTop:10,padding:'12px 14px',background:'var(--panel2)',borderRadius:8}}>
        <span className="muted">Standard gematria: </span><b className="big">{total}</b>
        <span className="muted"> · Mispar Katan (digital root): </span><b className="big" style={{color:'var(--blue)'}}>{reduce9(total)===0?9:reduce9(total)}</b>
      </div>
    </>}
    <h3>The 22 letters → digital-root groups (Mispar Katan Mispari)</h3>
    <div className="muted" style={{marginBottom:8}}>Each of the 22 letters reduces (sum of digits) to 1–9. Groups 1–4 gather three letters each (units / tens / hundreds 100–400); groups 5–9 gather two (the hundreds stop at 400 — ancient Hebrew has only 22 letters, no medieval 500–900 finals). This digital root is the bridge to the kamea: without it there is no sigil (§15b.3). <b>Terminology note:</b> this reduction is <i>Mispar Katan Mispari</i>; "Aiq Bekar" properly names a 10× letter-substitution cipher, not this reduction.</div>
    <div className="grid2">
      {[1,2,3,4,5,6,7,8,9].map(g=> <div key={g} className="kbox"><b style={{color:'var(--gold)'}}>{g}</b> · {groups[g].join(', ')}</div>)}
    </div>
    <div className="note">Try: <span className="key click" onClick={()=>setInp('אברהם')}>אברהם</span> <span className="key click" onClick={()=>setInp('שלמה')}>שלמה</span> <span className="key click" onClick={()=>setInp('אלהים')}>אלהים</span> <span className="key click" onClick={()=>setInp('אבדון')}>אבדון</span> (Abaddon = 63 = 7×9). Gen 1:1 = <span className="key click" onClick={()=>setInp('בראשית')}>בראשית</span> <span className="key click" onClick={()=>setInp('אלהים')}>אלהים</span> <span className="key click" onClick={()=>setInp('השמים')}>השמים</span> <span className="key click" onClick={()=>setInp('הארץ')}>הארץ</span> → 913+86+395+401+407+296+203 = 2701 = 37×73.</div>
  </>;
}

function GematriaGreek(){
  const [inp,setInp]=useState('Ἰησοῦς');
  const v=isopsephy(inp);
  const ex=[['Ἰησοῦς','Jesus',888,'8×111'],['Χριστός','Christ',1480,'40×37'],['Jesus + Christ','',2368,'64×37 = 888+1480'],['Κύριος','Lord',800,''],['Ἀπολλύων','Apollyon (Rev 9:11)',1461,'Sothic cycle'],['666','the beast (Rev 13:18)',666,'6×111 = Σ1..36']];
  return <>
    <div className="controls" style={{marginBottom:10}}>
      <input type="text" value={inp} onChange={e=>setInp(e.target.value)} placeholder="Greek, e.g. Ἰησοῦς / Ἀπολλύων" style={{flex:'1 1 280px'}}/>
      <span className="pill">isopsephy: <b style={{color:'var(--gold)'}}>{v}</b></span>
    </div>
    <div className="muted" style={{marginBottom:8}}>27 letters: 24 standard + 3 archaic retained only as numerals (digamma ϝ/ϛ=6, koppa ϟ/ϙ=90, sampi ϡ=900). Final sigma ς = 200. Additive — no reduction. Thousands reuse α–θ with a lower keraia (͵α=1000).</div>
    <table style={{marginBottom:10}}>
      <thead><tr><th>Units 1–9</th><th>Tens 10–90</th><th>Hundreds 100–900</th></tr></thead>
      <tbody>
        <tr><td className="gk">α β γ δ ε ϛ ζ η θ</td><td className="gk">ι κ λ μ ν ξ ο π ϟ</td><td className="gk">ρ σ τ υ φ χ ψ ω ϡ</td></tr>
        <tr className="muted"><td>1 2 3 4 5 6 7 8 9</td><td>10 20 30 40 50 60 70 80 90</td><td>100 200 300 400 500 600 700 800 900</td></tr>
      </tbody>
    </table>
    <table>
      <thead><tr><th>Name</th><th>Reading</th><th>Value</th><th>Notes</th></tr></thead>
      <tbody>
      {ex.map((r,i)=><tr key={i}><td className="letter-cell">{r[0]? <span className="gk" style={{fontSize:'1.4rem'}}>{r[0]}</span> : ''}</td><td>{r[1]}</td><td className="big" style={{color:'var(--gold)'}}>{r[2]}</td><td className="muted">{r[3]}</td></tr>)}
      </tbody>
    </table>
    <div className="note"><b>666 / original referent:</b> the scholarly consensus is the <i>Hebrew</i> gematria נרון קסר (Neron Kesar) = 666; the Latin form (dropping final nun) = 616 (alternate manuscript). No single Greek word is widely accepted as the original Revelation 666. <b>Apollyon 1461 ↔ Sothic</b> is an esoteric parallel (arithmetic exact), not a scholarly lexicon entry.</div>
  </>;
}

function GematriaArabic(){
  const [inp,setInp]=useState('بسم الله الرحمن الرحيم');
  const v=abjad(inp);
  const letters=[...inp].filter(ch=>ABJAD[ch]);
  const ex=[['بسم الله الرحمن الرحيم','Bismillah',786,'19 letters; 2+60+40+66+329+289'],['الله','Allah',66,''],['محمد','Muhammad',92,''],['علي','Ali',110,''],['حسين','Husayn',128,'']];
  return <>
    <div className="controls" style={{marginBottom:10}}>
      <input type="text" dir="rtl" lang="ar" value={inp} onChange={e=>setInp(e.target.value)} placeholder="Arabic, e.g. بسم الله الرحمن الرحيم" style={{flex:'1 1 320px',textAlign:'right'}}/>
      <span className="pill">abjad (ḥisāb al-jummal): <b style={{color:'var(--gold)'}}>{v}</b></span>
    </div>
    <div className="muted" style={{marginBottom:8}}>28 letters in the <b>abjad (Ḥijāʾī) order</b> — the numeral order, <i>not</i> the alphabetical alifbāʾī order (اب ت ث…). Mnemonic: ʾabjad hawwaz ḥuṭṭī kalaman saʿfaṣ qarashat thakhadh ḍaẓagh. Additive. (The Maghrebi/archaic variant differs at 6 positions — not shown.)</div>
    <table style={{marginBottom:10}}>
      <thead><tr><th>Units 1–9</th><th>Tens 10–90</th><th>Hundreds 100–900</th><th>1000</th></tr></thead>
      <tbody>
        <tr><td className="he" dir="rtl" style={{fontSize:'1.25rem'}}>ا ب ج د ه و ز ح ط</td><td className="he" dir="rtl" style={{fontSize:'1.25rem'}}>ي ك ل م ن س ع ف ص</td><td className="he" dir="rtl" style={{fontSize:'1.25rem'}}>ق ر ش ت ث خ ذ ض ظ</td><td className="he" dir="rtl" style={{fontSize:'1.25rem'}}>غ</td></tr>
        <tr className="muted"><td>1 2 3 4 5 6 7 8 9</td><td>10 20 30 40 50 60 70 80 90</td><td>100 200 300 400 500 600 700 800 900</td><td>1000</td></tr>
      </tbody>
    </table>
    {letters.length>0 && <div style={{marginBottom:10,padding:'10px 14px',background:'var(--panel2)',borderRadius:8}}>
      <span className="muted">letters: </span>{letters.map((ch,i)=><span key={i} className="he" dir="rtl" style={{fontSize:'1.3rem',marginLeft:6}}>{ch}={ABJAD[ch]}</span>)}
    </div>}
    <table>
      <thead><tr><th>Phrase</th><th>Reading</th><th>Value</th><th>Notes</th></tr></thead>
      <tbody>
      {ex.map((r,i)=><tr key={i}><td className="letter-cell"><span className="he" dir="rtl" style={{fontSize:'1.3rem'}}>{r[0]}</span></td><td>{r[1]}</td><td className="big" style={{color:'var(--gold)'}}>{r[2]}</td><td className="muted">{r[3]}</td></tr>)}
      </tbody>
    </table>
    <div className="note"><b>The 19 Bismillah claim:</b> بسم الله الرحمن الرحيم = 19 letters (the alif of the article is counted) — the count is correct; the Code-19 / Rashad Khalifa debate rests on it. <b>786</b> is the abjad sum, used as a shorthand for Bismillah in South Asia (some scholars call it bidʿah). Both are tradition, not Quran text.</div>
  </>;
}

function GematriaIndian(){
  const [inp,setInp]=useState('गप्यभाग्य');
  const dec=katapayadi(inp);
  return <>
    <div className="controls" style={{marginBottom:10}}>
      <input type="text" value={inp} onChange={e=>setInp(e.target.value)} placeholder="Devanagari consonants, e.g. अनुष्टुभ्न (or any)" style={{flex:'1 1 320px'}}/>
      <span className="pill">decoded (right-to-left): <b style={{color:'var(--gold)'}}>{dec||'—'}</b></span>
    </div>
    <div className="muted" style={{marginBottom:8}}><b>Katapayadi</b> (Haridatta, 683 CE; Kerala school, pre-1500): consonants → digits, read <b>right-to-left</b> (अङ्कानां वामतो गतिः, "numbers go from left to right" reversed). <b>Vowels = 0</b>; न, ञ = 0. In a conjunct, only the <b>last</b> consonant carries a value. Named for the four consonants heading the four groups (क ट प य, all = 1). This is <b>positional</b>, not additive isopsephy.</div>
    <table style={{marginBottom:10}}>
      <thead><tr><th>Digit</th><th>ka-group</th><th>ṭa-group</th><th>pa-group</th><th>ya-group</th></tr></thead>
      <tbody>
        {[['1','क','ट','प','य'],['2','ख','ठ','फ','र'],['3','ग','ड','ब','ल'],['4','घ','ढ','भ','व'],['5','ङ','ण','म','श'],['6','च','त','—','ष'],['7','छ','थ','—','स'],['8','ज','द','—','ह'],['9','झ','ध','—','—'],['0','ञ','न','—','—']].map(r=>(
          <tr key={r[0]}><td className="big" style={{color:'var(--gold)'}}>{r[0]}</td>{r.slice(1).map((c,i)=><td key={i} className="he" style={{fontSize:'1.3rem'}}>{c}</td>)}</tr>
        ))}
      </tbody>
    </table>
    <div className="note"><b>Famous encodings (π):</b> the Karaṇapaddhati verse (Kerala school, 15th c.) decodes to <b>31415926536</b> (π to 10 places) under the standard right-to-left rule. The 31-place gopībhāgya verse <i>violates</i> the reversal rule — a standard decoder will not reproduce it. <b>Flag:</b> "कटपयादि encodes 31416" is FALSE — the name is etymological ("starting with ka,ṭa,pa,ya"), not a numerical encoding.</div>
    <div className="muted" style={{marginTop:8}}>The Sanskrit vargas (5 consonant classes) and the 14 Shiva Sutras are <b>phonological/grammatical</b>, NOT gematria — no numbers are assigned. The sacred numbers 108 (= 27 nakshatras × 4 pādas), 1008, 432,000 are fixed constants, not letter-sums.</div>
  </>;
}

function GematriaMore(){
  return <>
    <h3>Āryabhaṭa numeration (India, early 6th c. CE) — positional, not additive</h3>
    <div className="muted" style={{marginBottom:8}}>A true alphasyllabic numeral: <b>consonant = fixed value 1–100; vowel = power-of-100 multiplier</b>; syllable = consonant × vowel. e.g. कि = क(1) × 100 = 100; हौ = ह(100) × 10¹⁶ = 10¹⁸. Concatenated least-significant first. Pre-1500. This is a large-number positional notation, <b>not</b> a word-summing gematria.</div>
    <table style={{marginBottom:12}}>
      <thead><tr><th>Category</th><th>Consonants → values</th></tr></thead>
      <tbody>
        <tr><td>Velar</td><td className="he">क1 ख2 ग3 घ4 ङ5</td></tr>
        <tr><td>Palatal</td><td className="he">च6 छ7 ज8 झ9 ञ10</td></tr>
        <tr><td>Retroflex</td><td className="he">ट11 ठ12 ड13 ढ14 ण15</td></tr>
        <tr><td>Dental</td><td className="he">त16 थ17 द18 ध19 न20</td></tr>
        <tr><td>Labial</td><td className="he">प21 फ22 ब23 भ24 म25</td></tr>
        <tr><td>Semivowels</td><td className="he">य30 र40 ल50 व60</td></tr>
        <tr><td>Fricatives</td><td className="he">श70 ष80 स90 ह100</td></tr>
        <tr className="muted"><td>Vowel mult.</td><td>a=1, i=100, u=10⁴, ṛ=10⁶, ḷ=10⁸, e=10¹⁰, ai=10¹², o=10¹⁴, au=10¹⁶</td></tr>
      </tbody>
    </table>
    <h3>Cyrillic (10th c., Greek-derived) — true pre-1500 isopsephy</h3>
    <div className="muted" style={{marginBottom:8}}>Direct adaptation of Byzantine Greek isopsephy. Order follows Greek, not Cyrillic alphabetical. Borrowed letters Ѯ(ksi)=60, Ѱ(psi)=700, Ѳ(theta)=9 carry numerals; Slavic-only letters (б ж ш щ…) get NO value. e.g. ѰЗ = 700+7 = 707.</div>
    <h3>Coptic — Greek + Fai=90</h3>
    <div className="muted" style={{marginBottom:8}}>Essentially Greek isopsephy reused, with ONE Demotic addition: <b>ϥ (Fai) = 90</b>, filling the Greek qoppa slot. The other 5 Demotic letters have no numeric value. Treat as "Greek + Fai=90."</div>
    <h3>POST-1500 / NOT gematria (flagged)</h3>
    <ul className="muted">
      <li><b>Latin A-Z gematria</b> — <span style={{color:'var(--red)'}}>post-1500</span>. No pre-1500 full Latin A-Z system exists. Earliest: Rudolff 1525; famous: <b>Agrippa, De Occulta Philosophia (1532), Bk II ch. XX</b> (A=1…Z=500). e.g. IESUS = 394. A Renaissance construction — flag, do not treat as ancient.</li>
      <li><b>Roman numerals</b> — 7 symbols (I V X L C D M), additive/subtractive. Numeral notation, <b>not</b> word-summing isopsephy.</li>
      <li><b>Runic calendars</b> — 16 Younger Futhark runes encode golden numbers 1–16 + 3 special (Metonic calendrical), not gematria.</li>
      <li><b>Ogham</b> — the 20 fid have NO numeric assignment; stroke-count is phonological organization.</li>
      <li><b>Chinese stroke-count divination</b> (測字) — pre-1500 roots but NO fixed standardized stroke→number table; systematized only post-1612.</li>
    </ul>
  </>;
}

function SigilTab(){
  const [inp,setInp]=useState('משיח');
  const sp=sigilPath(inp);
  const isHeb=/[א-ת]/.test(inp);
  // build per-letter entries (same logic as KameaSigil, for the shared text panel)
  const entries = isHeb
    ? [...norm(inp)].filter(ch=>GV[ch]).map(ch=>({l:displayHe(ch), v:letterVal(ch)}))
    : [...inp.toUpperCase().replace(/[^A-Z]/g,'')].map(ch=>({l:ch, v:ch.charCodeAt(0)-64}));
  return <>
    <h2>Sigil Forge — the Aiq Bekar / Lo Shu sigil (Saturn 3×3, §15b.3)</h2>
    <div className="muted" style={{marginBottom:10}}>The kamea-sigil method: (1) take the name (consonants); (2) reduce each letter's gematria to its digital root 1–9 (Aiq Bekar); (3) mark those cells on the Lo Shu (Saturn 3×3) in order and join them — the trace <b>is</b> the sigil; (4) consecutive repeats collapse (the pen does not lift). Aiq Bekar = the digit-sum of the 22-letter gematria of §2, the bridge from alphabet to sigil. <span style={{color:'var(--green)'}}>Green</span> = first cell, <span style={{color:'var(--red)'}}>red</span> = last. The <b>Kameot</b> tab traces the same name on all 7 planetary squares (Saturn → Moon).</div>
    <div className="controls" style={{marginBottom:12}}>
      <input type="text" value={inp} onChange={e=>setInp(e.target.value)} placeholder="Hebrew name, e.g. משיח" style={{flex:'1 1 260px'}} autoFocus/>
      <span className="pill">Aiq Bekar cells used: {sp.cellsUsed.length}/9</span>
    </div>
    <div className="row" style={{alignItems:'flex-start'}}>
      <div style={{flex:'0 0 auto'}}><KameaSigil n={3} word={inp} compact/></div>
      <div style={{flex:'1 1 200px'}}>
        <div className="muted">Letters: <b style={{color:'var(--gold)'}}>{entries.map(e=>e.l).join(' ')||'—'}</b></div>
        <div className="muted">Values: {entries.map(e=>e.v).join(', ')||'—'}</div>
        <div className="muted">Aiq Bekar (1–9): <b style={{color:'var(--blue)'}}>{sp.reduced.join('  ')||'—'}</b></div>
        <div className="muted">Saturn trace (repeats collapsed):</div>
        <div className="big" style={{color:'var(--gold)'}}>{sp.cells.map(c=>c.v).join(' → ') || '—'}</div>
        <div className="note">The sigil is the geometric footprint of the name on the Lo Shu — deterministic from the name alone. The <b>Kameot</b> tab traces the same name on all 7 planetary squares (Saturn → Moon): each square's different modulus n² = 9,16,25,36,49,64,81 yields a distinct sigil per planet. <em>Caveat (§6.3 / §15b.3):</em> the sigil-over-kamea method is Renaissance (Agrippa, 1531), not medieval Jewish.</div>
        <div className="note">Try: <span className="key click" onClick={()=>setInp('אדם')}>אדם</span> <span className="key click" onClick={()=>setInp('משה')}>משה</span> <span className="key click" onClick={()=>setInp('ישראל')}>ישראל</span> <span className="key click" onClick={()=>setInp('והו')}>והו</span> (1st Shem angel) · <span className="key click" onClick={()=>setInp('MICHAEL')}>MICHAEL</span></div>
      </div>
    </div>
    <Fig n={7} doc="From the article (§15b.3): the Lo Shu (Saturn 3×3, M=15) with the 9 Aiq Bekar groups overlaid — each cell gathers the letters whose gematria digit-sums to it. The golden trace is the sigil of משיח (Messiah): Aiq Bekar 4·3·1·8, the reduced cells joined in order. Aiq Bekar = the digit-sum of the 22-letter gematria of §2 — the bridge from alphabet to sigil."/>
  </>;
}

function KameaSigil({ n, word, compact }){
  const sq = buildMagic(n);
  const N = n*n;
  const pos = {}; for(let i=0;i<n;i++) for(let j=0;j<n;j++) pos[sq[i][j]]=[i,j];
  const isHeb = /[א-ת]/.test(word);
  let entries;
  if(isHeb){
    entries = [...norm(word)].filter(ch=>GV[ch]).map(ch=>({l:displayHe(ch), v:letterVal(ch)}));
  } else {
    entries = [...word.toUpperCase().replace(/[^A-Z]/g,'')].map(ch=>({l:ch, v:ch.charCodeAt(0)-64}));
  }
  const targets = entries.map(e=> ((e.v-1)%N)+1);
  const path=[]; for(const t of targets){ if(!path.length||path[path.length-1]!==t) path.push(t); }
  const used=new Set(path);
  const order={}; path.forEach((v,k)=>{ if(!(v in order)) order[v]=k+1; });
  const cellPx = n<=4?42 : n<=6?32 : n<=8?26 : 22; const pad=16; const S=pad*2+n*cellPx;
  const center=v=>{const [i,j]=pos[v]; return [pad+cellPx*(j+0.5), pad+cellPx*(i+0.5)];};
  const d=path.map((v,k)=>{const [x,y]=center(v); return (k?'L':'M')+x.toFixed(1)+' '+y.toFixed(1);}).join(' ');
  return <>
    <svg viewBox={`0 0 ${S} ${S}`} width={S} height={S} style={{maxWidth:'100%'}} role="img" aria-label={`Sigil of ${word} on ${n}×${n} kamea`}>
      <rect x="0" y="0" width={S} height={S} fill="#0e1320" rx="8"/>
      {sq.flat().map((v,idx)=>{const [i,j]=pos[v]; const x=pad+cellPx*j, y=pad+cellPx*i; const on=used.has(v);
        return <g key={idx}>
          <rect x={x+1.5} y={y+1.5} width={cellPx-3} height={cellPx-3} rx="3" fill={on?'#243657':'#131826'} stroke="#283145" strokeWidth="1"/>
          <text x={x+cellPx/2} y={y+cellPx/2-1} textAnchor="middle" dominantBaseline="middle" fontSize={n<=6?11:9} fill={on?'#e8c87a':'#5d6883'}>{v}</text>
          {on && <text x={x+cellPx/2} y={y+cellPx/2+9} textAnchor="middle" dominantBaseline="middle" fontSize={6.5} fill="#8aa0c0">#{order[v]}</text>}
        </g>;})}
      {path.length>=2 && <path d={d} fill="none" stroke="#e8c87a" strokeWidth="2.2" opacity="0.9" strokeLinejoin="round" strokeLinecap="round"/>}
      {path.map((v,k)=>{const [x,y]=center(v); const r=k===0||k===path.length-1?4.5:2.8; const fill=k===0?'#6fe0a0':k===path.length-1?'#ff8a8a':'#e8c87a'; return <circle key={k} cx={x} cy={y} r={r} fill={fill} stroke="#0b0e14" strokeWidth="0.6"/>;})}
    </svg>
    {!compact && <div style={{marginTop:8, minWidth:200}}>
      <div className="muted">{isHeb?'Hebrew gematria (22 letters; finals = base letter)':'Latin A=1…Z=26'} → reduced into the square (n²={N}){n===3?' — for Saturn n²=9 this is the digital root = the Aiq Bekar method of §15b.3':''}.</div>
      {entries.length===0
        ? <div className="note">Type a word to trace its sigil on this kamea.</div>
        : <table style={{marginTop:6}}>
            <thead><tr><th>Letter</th><th>Value</th><th>Cell</th></tr></thead>
            <tbody>{entries.map((e,i)=><tr key={i}><td><span className={isHeb?'he':'gk'} style={{fontSize:'1.2rem'}}>{e.l}</span></td><td className="deg">{e.v}</td><td className="deg">{targets[i]}</td></tr>)}</tbody>
          </table>}
      <div className="muted" style={{marginTop:6}}>Trace ({path.length} pts, repeats collapsed): <b style={{color:'var(--gold)'}}>{path.join(' → ')||'—'}</b> · cells {used.size}/{N}</div>
    </div>}
  </>;
}

function KameotTab(){
  const [word,setWord]=useState('יהוה');
  const [planet,setPlanet]=useState('Saturn');
  const [pn,n,pdbl]=KAMEOT.find(k=>k[0]===planet);
  return <>
    <h2>The 7 kameot — planetary magic squares + sigil tracer (§15b.1, §15b.3)</h2>
    <div className="muted" style={{marginBottom:10}}>7 magic squares ↔ 7 doubles ↔ 7 planets (Sefer Yetzirah §4). Type a word (Hebrew or English/Latin), pick a planet, and trace its sigil on that kamea: each letter → value → cell on the square (values reduced modulo n²; for Saturn n²=9 this is the digital root = Aiq Bekar). <span style={{color:'var(--green)'}}>green</span> = first, <span style={{color:'var(--red)'}}>red</span> = last; consecutive repeats collapse (the pen does not lift).</div>
    <div className="controls" style={{marginBottom:12}}>
      <input type="text" value={word} onChange={e=>setWord(e.target.value)} placeholder="Hebrew (יהוה) or English (MICHAEL)" style={{flex:'1 1 260px'}} autoFocus/>
      <select value={planet} onChange={e=>setPlanet(e.target.value)} aria-label="Planet kamea" style={{background:'var(--panel2)',color:'var(--txt)',border:'1px solid var(--line)',borderRadius:8,padding:'8px',fontSize:'.9rem'}}>
        {KAMEOT.map(([p,nn])=> <option key={p} value={p}>{GLYPH[p]} {p} ({nn}×{nn})</option>)}
      </select>
    </div>
    <div className="row" style={{alignItems:'flex-start'}}>
      <div style={{flex:'0 0 auto'}}><KameaSigil n={n} word={word}/></div>
      <div style={{flex:'1 1 200px'}}>
        <div className="muted">Planet: <b>{GLYPH[planet]} {planet}</b> · {n}×{n} kamea · double <span className="he" style={{fontSize:'1.2rem'}}>{pdbl}</span> · constant <b style={{color:'var(--gold)'}}>{n*(n*n+1)/2}</b>.</div>
        <div className="note">How the trace is built: letters of the word → gematria value (Hebrew, 22 letters — finals = base letter, no 500–900; or A=1…Z=26 for Latin) → reduce each value into the square's range (1…n²) by ((value−1) mod n²)+1 → mark those cells in order → join them. For <b>Saturn</b> (n²=9) this reduces to the digital root — exactly the Aiq Bekar → Lo Shu method verified in §15b.3 and used in the Sigil Forge tab.</div>
        <div className="note">Try: <span className="key click" onClick={()=>setWord('יהוה')}>יהוה</span> <span className="key click" onClick={()=>setWord('משיח')}>משיח</span> <span className="key click" onClick={()=>setWord('אדם')}>אדם</span> <span className="key click" onClick={()=>setWord('MICHAEL')}>MICHAEL</span> <span className="key click" onClick={()=>setWord('RAPHAEL')}>RAPHAEL</span> — then switch planet.</div>
        <div className="note"><em>Caveat (§6.3 / §15b.3):</em> the sigil-over-kamea method is Renaissance (Agrippa, 1531), not medieval Jewish. The English A=1…Z=26 mapping is a modern Latin gematria, not traditional.</div>
      </div>
    </div>
    <h3>All 7 kameot — <span className="he" style={{fontSize:'1.1rem'}}>{word?displayHe(norm(word)):''}</span> traced on each square</h3>
    <div className="tcards" style={{gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))'}}>
      {KAMEOT.map(([planet,n,dbl])=>{
        const M=n*(n*n+1)/2;
        const sq=buildMagic(n); const ok=isMagic(sq);
        return <div key={planet} className="kbox" style={{textAlign:'center'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
            <b>{GLYPH[planet]} {planet}</b>
            <span className="muted">{n}×{n} · M={M}</span>
          </div>
          <div style={{display:'flex',justifyContent:'center'}}><KameaSigil n={n} word={word} compact/></div>
          <div className="muted" style={{marginTop:6}}>double <span className="he" style={{fontSize:'1rem'}}>{dbl}</span> · constant <b style={{color:'var(--gold)'}}>{M}</b> · magic {ok?'✓':'✗'}</div>
        </div>;
      })}
    </div>
    <h3>Cross-links (§15b.1.D)</h3>
    <ul className="muted">
      <li><b>Mercury</b> 8×8 constant = 260 = the Maya <b>Tzolkin</b> (260 days).</li>
      <li><b>Sun</b> 6×6 constant = 111; sum 1..36 = 666 = 6×111 (the “solar number”, Rev 13:18 — see the Revelation tab).</li>
      <li><b>Saturn</b> 3×3 = the Lo Shu, constant 15 = יה (10+5); total 45 = מה (40+5), “What?”.</li>
      <li>The 7 kameot = the 7 days of the planetary week in Chaldean order (see the Week tab).</li>
    </ul>
    <Fig n={6} doc="From the article (§15b.1): the 7 planetary kameot, orders 3–9 in Chaldean order, with constants M(n)=n(n²+1)/2. Saturn 3×3 = the Lo Shu (M=15, basis of the sigils); Mercury 8×8 (M=260) = the Maya Tzolkin; the Sun 6×6 sums 1+…+36 = 666 = 6×111."/>
  </>;
}

// 72 Shem HaMephorash angels placed around a circle of 72 divisions (5° each).
// The 72-fold division is the precessional clock: precession ≈ 71.6 yr/° ≈ 72 yr per
// degree, so 72 = years-per-degree, and 72 × 360 yr ≈ 25 920 yr = the Platonic great
// year (modern 25 772). Each angel = 5° = ~360 yr of precession.
function AngelsCircle({triplets}){
  const C=240;
  const ang=(i)=>(-90 + i*5)*Math.PI/180;
  const pt=(r,a)=>[C+r*Math.cos(a), C+r*Math.sin(a)];
  const Rout=212, RtickIn=200, Rnum=224, RlabOut=188, RlabIn=168;
  return <svg viewBox="0 0 480 482" width="100%" height="auto" style={{maxWidth:470,margin:'0 auto'}} role="img" aria-label="72 angels around the precessional circle">
    <rect x="0" y="0" width="480" height="482" fill="#0e1320" rx="10"/>
    <circle cx={C} cy={C} r={Rout} fill="none" stroke="#283145" strokeWidth="1.4"/>
    <circle cx={C} cy={C} r={RlabOut+10} fill="none" stroke="#1c2333" strokeWidth="0.7"/>
    {triplets.map((t,i)=>{
      const a=ang(i); const [x0,y0]=pt(Rout,a); const [x1,y1]=pt(RtickIn,a);
      const major=i%6===0;
      return <line key={'t'+i} x1={x0} y1={y0} x2={x1} y2={y1} stroke={major?'#7fb0ff':'#33405a'} strokeWidth={major?1.3:0.6}/>;
    })}
    {triplets.map((t,i)=>{
      const a=ang(i); const outer=i%2===0; const rl=outer?RlabOut:RlabIn;
      const [lx,ly]=pt(rl,a); const [nx,ny]=pt(Rnum,a);
      return <g key={'a'+i}>
        <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="8.6" fill={outer?'#e8c87a':'#c9a558'} fontFamily="serif">{t}</text>
        <text x={nx} y={ny} textAnchor="middle" dominantBaseline="middle" fontSize="5" fill="#5d6883">{i+1}</text>
      </g>;
    })}
    <circle cx={C} cy={C} r="58" fill="#0e1320" stroke="#2a3346" strokeWidth="0.8"/>
    <text x={C} y={C-18} textAnchor="middle" fontSize="24" fill="#e8c87a" fontFamily="serif">72</text>
    <text x={C} y={C-2} textAnchor="middle" fontSize="8" fill="#8aa0c0">5° per angel · 360°/72</text>
    <text x={C} y={C+13} textAnchor="middle" fontSize="7.6" fill="#7fb0ff">1° / 72 yr precession</text>
    <text x={C} y={C+25} textAnchor="middle" fontSize="6.8" fill="#5d6883">72 × 360 = 25 920 yr</text>
  </svg>;
}

function AngelsTab(){
  const [data,setData]=useState(null);
  const [err,setErr]=useState(null);
  const [q,setQ]=useState('');
  useEffect(()=>{ fetch('angels72.json').then(r=>{ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); }).then(setData).catch(e=>setErr(e.message)); },[]);
  if(err) return <div className="panel"><h2>72 Angels</h2><p>Could not load angels72.json ({err}). Serve the web/ folder over HTTP (python3 -m http.server 8008).</p></div>;
  if(!data) return <div className="muted">Loading the 72 Shem HaMephorash triplets…</div>;
  const qn=q.trim().toLowerCase();
  const rows=data.triplets.map((t,i)=>({i:i+1, trio:t, el:t+'אל', yh:t+'יה', gemEL:data.gemEL?data.gemEL[i]:gematria(norm(t+'אל')), gemYH:data.gemYH?data.gemYH[i]:gematria(norm(t+'יה'))}));
  const filtered=qn?rows.filter(r=>r.trio.includes(qn)||(''+r.i)===qn||r.el.includes(qn)||r.yh.includes(qn)):rows;
  return <>
    <h2>The 72 angels — Shem HaMephorash from Exodus 14:19-21 (§15b.4)</h2>
    <div className="muted" style={{marginBottom:10}}>72 consonants × 3 verses. The 72 triplets are read by <b>columns</b>: tríos[i] = v19[i] + v20[71−i] + v21[i] (v20 read backwards, as tradition requires). 72×3 = 216 = 6³. Triplet 0 = <span className="he">והו</span> = Vehuiah (canonical ✓). Each triplet + suffix <span className="he">אל</span> (Hod) or <span className="he">יה</span> (Malkhut) gives the angelic name.</div>
    <h3>The 72 around the precessional circle</h3>
    <div className="muted" style={{marginBottom:8}}>The 72 angels placed one every 5° (360°/72). This is the precessional clock: precession carries the equinox ≈ 1° every 71.6 ≈ <b>72 years</b>, so <b>72 = the years per degree of precession</b>, and each 5° angel = ~360 yr of precession; the full 72-division circuit = 72 × 360 ≈ <b>25 920 yr</b> — the traditional Platonic great year (modern value 25 772 yr). Major ticks every 6th (the 12 decans). The decanatal attribution (each Shem angel → 5°) is traditional; the precessional reading is a mnemonic, not a physical model.</div>
    <div style={{marginBottom:14}}><AngelsCircle triplets={data.triplets}/></div>
    <div className="controls" style={{marginBottom:10}}>
      <input type="text" value={q} onChange={e=>setQ(e.target.value)} placeholder="filter by # or triplet…" style={{flex:'1 1 220px'}}/>
      <span className="pill">{filtered.length} of 72</span>
    </div>
    <table>
      <thead><tr><th>#</th><th>Triplet</th><th>+אל (Hod)</th><th>gem</th><th>+יה (Malkhut)</th><th>gem</th></tr></thead>
      <tbody>
      {filtered.map(r=>(
        <tr key={r.i}><td>{r.i}</td>
          <td className="letter-cell"><span className="he">{r.trio}</span></td>
          <td className="letter-cell"><span className="he" style={{fontSize:'1.2rem'}}>{r.el}</span></td>
          <td className="deg">{r.gemEL}</td>
          <td className="letter-cell"><span className="he" style={{fontSize:'1.2rem'}}>{r.yh}</span></td>
          <td className="deg">{r.gemYH}</td>
        </tr>
      ))}
      </tbody>
    </table>
    <div className="note"><em>Caveat (§6.3):</em> the mechanical extraction 72×3 from Exodus is demonstrated (p≈5×10⁻⁷); the method is medieval (Rashi, 11th c.); the decanatal attribution (each angel → 5°) is a hypothesis, not demonstrated here. The sigil of each triplet is computed on the Sigil Forge tab.</div>
  </>;
}

function SarosTab(){
  const [yr,setYr]=useState(2026);
  const [list,setList]=useState(null);
  const [busy,setBusy]=useState(false);
  function scan(y){
    setBusy(true);
    setTimeout(()=>{
      const out=[]; let cur=makeDate(y,1,1);
      const endMs=makeDate(y+1,1,1).getTime(); let guard=0;
      while(cur.getTime()<endMs && guard++<40){
        const t=Astronomy.SearchMoonPhase(0, cur, 40);
        if(!t) break;
        const lat=Astronomy.EclipticGeoMoon(t).lat; const ds=fmtDate(t.date);
        if(Math.abs(lat)<1.6) out.push({ds, beta:lat, kind:Math.abs(lat)<0.6?'central':'partial'});
        cur=new Date(t.date.getTime()+2*86400000);
      }
      setList({y, out}); setBusy(false);
    },20);
  }
  useEffect(()=>{ scan(yr); },[yr]);
  return <>
    <h2>Saros — solar eclipses &amp; the saros series (§15b.6, §9)</h2>
    <div className="muted" style={{marginBottom:10}}>A live scan: every new moon in the chosen year, a solar eclipse if the Moon's ecliptic latitude |β| &lt; 1.6° (the same threshold calibrated in <code>calc_saros_series.mjs</code>). One year is fast; the full 5000-year enumeration that counts saros series members runs offline.</div>
    <div className="fig"><SarosDiagram/><div className="cap">Why eclipses cluster at nodes: the Moon's path is inclined 5.1° to the ecliptic and crosses it only twice per month. A new moon within the |β|&lt;1.6° window (green band) = solar eclipse; elsewhere = a normal new moon. The scan tests exactly this.</div></div>
    <div className="controls" style={{marginBottom:10}}>
      <button onClick={()=>setYr(yr-1)}>◀ {yr-1}</button>
      <YearInput value={yr} onCommit={setYr}/>
      <button onClick={()=>setYr(yr+1)}>{yr+1} ▶</button>
      {yr<0 && <span className="muted" style={{fontSize:'.78rem'}}>{Math.abs(yr)} BCE</span>}
      {busy && <span className="pill">scanning…</span>}
    </div>
    {list && <>
      <div className="muted">Solar eclipses in {list.y}: <b style={{color:'var(--gold)'}}>{list.out.length}</b></div>
      <table>
        <thead><tr><th>Date</th><th>β (Moon lat)</th><th>Type</th></tr></thead>
        <tbody>
        {list.out.length===0 && <tr><td className="muted">none</td><td></td><td></td></tr>}
        {list.out.map(e=> <tr key={e.ds}><td>{e.ds}</td><td className="deg">{e.beta.toFixed(3)}°</td><td>{e.kind==='central'?'<b style="color:var(--gold)">central</b>':'partial'}</td></tr>)}
        </tbody>
      </table>
    </>}
    <h3>The saros-series count (§15b.6 — verified by calculation)</h3>
    <ul className="muted">
      <li>The saros = 223 synodic months = <b>{(223*SYN).toFixed(2)} d</b>. Eclipses of one series are separated by ~{(223*SYN).toFixed(2)} d; a chain = a saros series.</li>
      <li>Full enumeration (5000 years, all new moons, |β| &lt; 1.6°): <b>152 complete series, lengths 54–87, median 72</b> — the empirical member count of a saros series.</li>
    </ul>
    <h3>Hebrew stellar-alphabet mnemonics for eclipse seasons</h3>
    <div className="muted" style={{marginBottom:8}}>The <i>Sefer Yetzirah</i> does not predict eclipses, and the <i>Sefer Raziel</i> (p.144: “combina los signos y la rueda… calcula los períodos… calcula para ver las generaciones”) gives the letter-astronomy scaffold but no eclipse algorithm. The real engine is the Hebrew calendar, and its constants are the SY's constants:</div>
    <table>
      <thead><tr><th>Astronomy</th><th>Stellar alphabet (SY)</th></tr></thead>
      <tbody>
      <tr><td>Molad = 29d 12h 793p = <b>{MOLAD.toFixed(6)} d</b></td><td>≈ synodic month <b>{SYN.toFixed(6)} d</b> ⇒ a conjunction engine (eclipse = conjunction/opposition near a node)</td></tr>
      <tr><td>Metonic cycle = <b>19 yr</b> (12 common + 7 leap)</td><td><b>19 = 7 doubles + 12 simples</b> (the SY's own partition)</td></tr>
      <tr><td>7 leap years of the 19-yr cycle</td><td>= the <b>7 doubles</b> (mnemonic)</td></tr>
      <tr><td>28 lunar mansions (node / Moon path)</td><td><b>28 = T₇</b> — triangular number of the 7 doubles</td></tr>
      <tr><td>Saros ≈ 19 eclipse years (Δ {(19*ECLY-223*SYN).toFixed(2)} d)</td><td>the SY's <b>19</b> structures the saros</td></tr>
      <tr><td>Saros = 223 synodic = 242 draconic months</td><td><b>242 − 223 = 19</b> — the SY number embedded in the saros</td></tr>
      </tbody>
    </table>
    <div className="note">Sources the Hebrew calendar actually uses (absent from the rest of this app): molad + tekufot (Shmuel/Ada), <i>Baraita of Samuel</i> (the one Jewish source with a nodal cycle), Maimonides <i>Kiddush HaChodesh</i> (mean lunar motion), Ibn Ezra <i>Sefer ha-Olam</i> (28 mansions, precession). <b>Caveat:</b> these mnemonics predict <i>eclipse seasons</i> (a window near a node), not individual eclipses or paths; the molad + 19-yr cycle is a real calculation engine, the stellar-alphabet constants are a mnemonic, not a physical model.</div>
  </>;
}

function AyanamsaTab(){
  const AYA={'Lahiri (Chitrapaksha)':24.18,'Krishnamurti (KP)':23.93,'Fagan-Bradley':25.06,'Raman':22.40};
  const aqu={};
  for(const [name,a] of Object.entries(AYA)){ const b=ageBoundaries(a); aqu[name]=b.find(x=>x.sign==='Aquarius').start; }
  const allD=Object.values(aqu); const spread=Math.max(...allD)-Math.min(...allD);
  return <>
    <h2>Ayanamsa — sensitivity of the precessional ages (§15b.7)</h2>
    <div className="muted" style={{marginBottom:10}}>The Ages tab dates the eras with Lahiri (24.18°). Other ayanamsas shift every era boundary by Δayanamsa / precession — up to ~190 years between extremes. The “Age of Aquarius” is not a clean astronomical prediction; it depends on the chosen sidereal zero. Caeli Reader does <b>not</b> date ages by ayanamsa but by <b>tropical</b> sign occupation (the 10 bodies) — independent of the ayanamsa, so its discard is robust.</div>
    <div className="fig"><PrecessionDiagram/><div className="cap">Tropical Aries 0° (gold) is fixed to the vernal equinox — it does <b>not</b> precess, so the Reader's 12 letter↔sign sectors never rotate. Sidereal Aries 0° (violet) is fixed to the stars and precesses away from it; the gap is the ayanamsa (24.18° today). This is why the zodiacs here don't move with precession — by design.</div></div>
    <table>
      <thead><tr><th>Ayanamsa</th><th>value (°, ~2024)</th><th>Aquarius entry</th></tr></thead>
      <tbody>
      {Object.entries(AYA).map(([name,a])=> <tr key={name}><td>{name}</td><td className="deg">{a.toFixed(2)}</td><td className="deg">{yrLabel(aqu[name])}</td></tr>)}
      </tbody>
    </table>
    <div className="note">Spread of the Aquarius entry: <b style={{color:'var(--gold)'}}>{spread.toFixed(0)} years</b>. Invariants (independent of ayanamsa): great year = 360°/PREC = {Math.round(FULL)} y; one age = 30°/PREC = {AGE.toFixed(1)} y.</div>
  </>;
}

function LunarSolarTab(){
  const meton19=19*TROP, meton235=235*SYN;
  const oct8=8*TROP, oct99=99*SYN;
  const isl33lunar=33*12*SYN, isl33solar=33*TROP;
  return <>
    <h2>Lunar–Solar synchronisation — Meton, octaeteris, Islamic (§7–§8)</h2>
    <div className="muted" style={{marginBottom:10}}>The 19-year lunisolar cycle (Meton) and its cross-cultural echoes. All numbers computed live from SYN = {SYN} and TROP = {TROP}.</div>
    <div className="fig"><MetonDiagram/><div className="cap">The Metonic 19-year cycle: 7 leap years (13 months, gold = the 7 doubles) + 12 common years (12 months) = 235 lunations ≈ 19 tropical years. 19 = 7 doubles + 12 simples — the SY's own partition is the lunisolar cycle.</div></div>
    <table>
      <thead><tr><th>Cycle</th><th>Relation</th><th>Days (lunar)</th><th>Days (solar)</th><th>Δ</th></tr></thead>
      <tbody>
        <tr><td><b>Meton</b> (19a / 235m)</td><td>12×12 + 7×13 = 144 + 91 = 235</td><td className="deg">{meton235.toFixed(2)}</td><td className="deg">{meton19.toFixed(2)}</td><td className="deg">{(meton235-meton19).toFixed(3)}</td></tr>
        <tr><td><b>Octaeteris</b> (8a / 99m)</td><td>8×12 + 3 = 99</td><td className="deg">{oct99.toFixed(2)}</td><td className="deg">{oct8.toFixed(2)}</td><td className="deg">{(oct99-oct8).toFixed(3)}</td></tr>
        <tr><td>Islamic 33y (33×12m)</td><td>drift of the Hijri year</td><td className="deg">{isl33lunar.toFixed(0)}</td><td className="deg">{isl33solar.toFixed(0)}</td><td className="deg">{(isl33lunar-isl33solar).toFixed(0)}</td></tr>
      </tbody>
    </table>
    <ul className="muted">
      <li><b>Meton</b>: 19 tropical years ≈ 235 synodic months (Δ ≈ {(meton235-meton19).toFixed(2)} d). 235 = 12×12 + 7×13 — the 12² appears here too (cf. 144 in the Revelation tab).</li>
      <li><b>Octaeteris</b>: 8 years ≈ 99 months (the older, rougher cycle; Δ ≈ {(oct99-oct8).toFixed(2)} d).</li>
      <li><b>Islamic</b>: a 33-year cycle brings the lunar calendar back near the solar year (drift ≈ {(isl33lunar-isl33solar).toFixed(0)} d over 33 y ≈ 11 d/y).</li>
      <li><b>China</b>: the 章 (zhāng) = 19 years = 235 months = Meton, discovered independently.</li>
      <li>Draconic month {DRAC} d · anomalistic {ANOM} d · eclipse year {ECLY.toFixed(2)} d → saros 223×SYN = {(223*SYN).toFixed(2)} d (see the Saros tab).</li>
    </ul>
  </>;
}

// ====== Alignments tab — rare century/millennium stellar alignments ======
// alignments.json is produced offline by scripts/calc_alignments.mjs (two scans:
// SCAN_A 10 bodies 1700–2200 daily; SCAN_B 7 classical -1000..2200 3-day step).
// Each rare event carries maxInSign (most planets in one sign), span (smallest arc
// containing all bodies), precessional era, and the stellar reading for that day.
function displayDate(ds){
  const d=parseDate(ds); if(!d) return ds;
  const y=d.getUTCFullYear(), mo=MON[d.getUTCMonth()], da=d.getUTCDate();
  return `${da} ${mo} ${y<0?Math.abs(y)+' BCE':y}`;
}
function AlignmentsTab(){
  const [data,setData]=useState(null);
  const [err,setErr]=useState(null);
  const [sel,setSel]=useState('1962-02-04');   // default: the famous grand conjunction
  const mapRef=useRef(null);
  useEffect(()=>{ fetch('alignments.json').then(r=>{ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); }).then(setData).catch(e=>setErr(e.message)); },[]);
  // pick a date: update selection and scroll the sky-map section into view
  const pick=(d)=>{ setSel(d); requestAnimationFrame(()=>{ if(mapRef.current) mapRef.current.scrollIntoView({behavior:'smooth', block:'start'}); }); };
  if(err) return <div className="panel"><h2>Alignments</h2><p>Could not load alignments.json ({err}). Run <code>node calc_alignments.mjs</code> in <code>scripts/</code> and serve <code>web/</code> over HTTP.</p></div>;
  if(!data) return <div className="panel"><h2>Alignments</h2><p>Loading alignments.json…</p></div>;

  const byDateDesc=(a,b)=>parseDate(b.date)-parseDate(a.date);   // chronological: newest first, past last
  const A=[...data.scanA].sort((a,b)=>b.maxInSign-a.maxInSign||a.span-b.span);   // rarest first (selection)
  const B=[...data.scanB].sort((a,b)=>b.maxInSign-a.maxInSign||a.span-b.span);   // rarest first (selection)
  const all7=data.scanB.filter(e=>e.maxInSign>=7).sort(byDateDesc);              // all 7-in-sign, current→past
  const tight=all7.slice().sort((a,b)=>a.span-b.span);                            // tightest first (for the gap note)
  const tight4=[...tight.slice(0,4)].sort(byDateDesc);                            // 4 tightest, shown current→past
  const B20=[...B.slice(0,20)].sort(byDateDesc);                                  // 20 rarest SCAN B, shown current→past
  const A20=[...A.slice(0,20)].sort(byDateDesc);                                  // 20 rarest SCAN A, shown current→past
  const tightGap=tight.length>=2 ? Math.abs((parseDate(tight[0].date)-parseDate(tight[1].date))/86400000/365.25) : null;
  const cc=data.crossCheck||{};
  const ev = data.scanA.find(e=>e.date===sel) || data.scanB.find(e=>e.date===sel);
  const rows = ev ? skyAt(sel) : [];
  const occ = occupiedLetters(rows);
  const r = ev && ev.reading ? ev.reading : null;

  return <>
    <h2>Alignments — rare century/millennium stellar conjunctions</h2>
    <div className="muted" style={{marginBottom:10}}>An offline scan (<code>calc_alignments.mjs</code>) of two body-sets: <b>SCAN A</b> = the app's 10 bodies, 1700–2200 CE daily (Pluto-valid range); <b>SCAN B</b> = the 7 classical bodies, accurate over millennia, −1000 to 2200 CE. For each day <b>maxInSign</b> = the most planets in a single zodiacal sign, <b>span</b> = the smallest arc (°) containing every body, <b>era</b> = the precessional era (~{AGE.toFixed(0)} y each). Click a row to render that day's sky-map and stellar reading. Generated {data.generated}.</div>

    <div className="fig" style={{maxWidth:760}}>
      <div style={{fontWeight:600,color:'var(--gold)',marginBottom:4}}>The millennia signal — tightest classical grand conjunctions</div>
      <div className="muted" style={{marginBottom:8}}>All 7 classical planets in one zodiacal sign, within the smallest arc found in 3200 years (the 4 tightest, current→past):</div>
      <table>
        <thead><tr><th>Date</th><th>Bodies</th><th>Sign</th><th>Span</th><th>Era</th></tr></thead>
        <tbody>{tight4.map(e=> <tr key={e.date} style={e.date===sel?{background:'rgba(127,176,255,0.10)'}:undefined}>
          <td><button className="linkish" onClick={()=>pick(e.date)}>{displayDate(e.date)}</button></td>
          <td>7 classical</td><td>{e.sign}</td><td className="deg">{e.span}°</td><td>{e.era}</td>
        </tr>)}</tbody>
      </table>
      {tightGap!=null && <div className="note">Tightest pair gap: <b style={{color:'var(--gold)'}}>{tightGap.toFixed(0)} y</b> ≈ <b>{(tightGap/AGE).toFixed(2)}</b> precessional era(s). The two tightest grand conjunctions of the 3200-y scan — {displayDate(tight[0].date)} ({tight[0].span}°) and {displayDate(tight[1].date)} ({tight[1].span}°) — fall in <b>adjacent</b> precessional eras ({tight[0].era} → {tight[1].era}), ~{tightGap.toFixed(0)} y apart ≈ one age ({AGE.toFixed(0)} y). The tightest classical alignment marks the precessional-era boundary.</div>}
    </div>

    <h3>Cross-check — does a rare alignment produce a stellar reading NOT seen on ordinary days?</h3>
    <div className="note">
      <b>Question:</b> does any stellar reading arise <i>only</i> on these special century/millennium alignments, and not on ordinary days?
      <br/><b>Result: NO.</b> Across {cc.rareDays} rare-alignment days, Genesis 1:1 is legible <b>{cc.rareGenRate}%</b> ({cc.rareGenLegible}/{cc.rareDays}) vs <b>{cc.baselineGenRate}%</b> on {cc.baselineDays} ordinary 2024–2030 days; avg readable names <b>{cc.rareAvgReadable}</b> vs <b>{cc.baselineAvgReadable}</b>; and the <b>same {cc.rareDistinctAngelRoots}</b> Shem HaMephorash angel-roots are readable as on ordinary days — <b>{(cc.angelRootsOnlyOnRare||[]).length} new</b>. Concentrating planets in one sign <i>reduces</i> letter diversity, so rare alignments are <i>poorer</i> readings, not richer ones.
    </div>

    {ev && <>
      <h3 ref={mapRef}>Sky map — {displayDate(sel)}</h3>
      <div className="fig" style={{maxWidth:700, margin:'14px auto'}}><SkyMap rows={rows} occ={occ}/></div>
      <div className="muted" style={{marginBottom:8}}>maxInSign <b>{ev.maxInSign}</b> in {ev.sign} · span <b>{ev.span}°</b> · era <b>{ev.era}</b></div>
      {r && <>
        <div className="muted" style={{marginBottom:8}}>Genesis 1:1 legible: <b style={{color:r.genesisLegible?'var(--gold)':'var(--warn)'}}>{r.genesisLegible?'YES':'no'}</b> · readable names: <b>{r.readableCount}</b> · proper names: <b>{r.properNames}</b> · occupied simples: <span className="he" style={{fontSize:'1.15rem',color:'var(--gold)'}}>{r.occupied||'—'}</span></div>
        {r.angels && r.angels.length>0 && <div className="muted" style={{marginBottom:10}}>Shem HaMephorash angel-roots readable: <span className="he">{r.angels.join(' ')}</span></div>}
        {r.topNames && r.topNames.length>0 && <>
          <h3>Top readable names ({r.topNames.length})</h3>
          <div className="tcards">{r.topNames.map((n,i)=>{ const p=n.split('='); return <div className="tcard" key={i}><div className="the">{p[0]}</div><div className="trans">{p.slice(1).join('=')}</div></div>; })}</div>
        </>}
      </>}
    </>}

    <h3>SCAN B — 7 classical bodies, −1000 to 2200 CE (20 rarest, current→past)</h3>
    <table>
      <thead><tr><th>Date</th><th>maxInSign</th><th>Sign</th><th>Span</th><th>Era</th><th>Gen1:1</th><th>Names</th></tr></thead>
      <tbody>{B20.map(e=>{ const rr=e.reading||{}; return <tr key={e.date} style={e.date===sel?{background:'rgba(127,176,255,0.10)'}:undefined}>
        <td><button className="linkish" onClick={()=>pick(e.date)}>{displayDate(e.date)}</button></td>
        <td className="deg">{e.maxInSign}</td><td>{e.sign}</td><td className="deg">{e.span}°</td><td>{e.era}</td>
        <td>{rr.genesisLegible?<b style={{color:'var(--gold)'}}>YES</b>:'no'}</td><td className="deg">{rr.readableCount!=null?rr.readableCount:'—'}</td>
      </tr>; })}</tbody>
    </table>

    <h3>SCAN B — all-7-in-one-sign timeline (the centuries recurrence, current→past)</h3>
    <div className="muted" style={{marginBottom:6}}>{all7.length} occurrences in 3200 years — gaps (y), current→past: {all7.map((e,i)=>i<all7.length-1?Math.abs(parseDate(all7[i+1].date)-parseDate(e.date)).toFixed(0):'').filter(Boolean).join(', ')}</div>
    <table>
      <thead><tr><th>Date</th><th>Sign</th><th>Span</th><th>Era</th></tr></thead>
      <tbody>{all7.map(e=> <tr key={e.date} style={e.date===sel?{background:'rgba(127,176,255,0.10)'}:undefined}>
        <td><button className="linkish" onClick={()=>pick(e.date)}>{displayDate(e.date)}</button></td>
        <td>{e.sign}</td><td className="deg">{e.span}°</td><td>{e.era}</td>
      </tr>)}</tbody>
    </table>

    <h3>SCAN A — 10 bodies (app set), 1700–2200 CE (20 rarest, current→past)</h3>
    <table>
      <thead><tr><th>Date</th><th>maxInSign</th><th>Sign</th><th>Span</th><th>Era</th><th>Gen1:1</th><th>Names</th></tr></thead>
      <tbody>{A20.map(e=>{ const rr=e.reading||{}; return <tr key={e.date} style={e.date===sel?{background:'rgba(127,176,255,0.10)'}:undefined}>
        <td><button className="linkish" onClick={()=>pick(e.date)}>{displayDate(e.date)}</button></td>
        <td className="deg">{e.maxInSign}</td><td>{e.sign}</td><td className="deg">{e.span}°</td><td>{e.era}</td>
        <td>{rr.genesisLegible?<b style={{color:'var(--gold)'}}>YES</b>:'no'}</td><td className="deg">{rr.readableCount!=null?rr.readableCount:'—'}</td>
      </tr>; })}</tbody>
    </table>
    <div className="note">SCAN_A reaches only 7-in-one-sign in 500 y (8-in-sign never occurs) — the 10-body set clusters on a ~decades scale, not centuries. The <i>centuries</i> scale belongs to the 7 classical bodies (all-7-in-one-sign ≈ every few centuries, irregular), and the <i>millennia</i> scale to the tightest classical conjunctions (≈ one precessional era, above). astronomy-engine v2.1.19, GeoVector→Ecliptic.elon, noon UT.</div>
  </>;
}

const PHRASES = [
  ['The sky vanished like a scroll that is rolled up, and every mountain and island was removed','Rev 6:14','The zodiac <b>is the scroll</b>: 12 signs inscribed, rolled along the ecliptic. Echoes Isa 34:4.'],
  ['I am the Alpha and the Omega, the first and the last','Rev 1:8; 22:13','Α and Ω <b>bracket the alphabet</b> — the letters are the frame of creation. Christ names himself as the whole alphabet.'],
  ['A scroll written within and on the back, sealed with seven seals','Rev 5:1','The 7 seals = the <b>7 doubles inscribed &amp; silent</b>; the scroll = the sky. Only the Lamb (= the reader of the letters) can open it.'],
  ['When he opened the seventh seal, there was silence in heaven for about half an hour','Rev 8:1','The <b>7th seal = the Sabbath</b> = the 7th double at rest. Silence = the stop (un-sounded) tongue of the SY.'],
  ['I heard the number of the sealed, 144,000','Rev 7:4','144,000 = <b>12² × 10³</b> = zodiac² × millennium. 12 tribes × 12,000 = the 12 simples squared.'],
  ['Let the one who has understanding calculate the number of the beast… 666','Rev 13:18','666 = <b>6×111 = Σ1..36</b> (the Sun kamea). The 6 falls short of 7 = the material. The only NT verse that <b>commands a gematria</b>.'],
  ['They have as king the angel of the abyss… in Hebrew Abaddon, in Greek Apollyon','Rev 9:11','Named in <b>both</b> systems: Hebrew אבדון = 63 = 7×9; Greek Ἀπολλύων = 1461 = the <b>Sothic (Sirius) cycle</b>. A gematria/isopsephy bridge.'],
  ['A star fallen from heaven… opened the shaft of the abyss','Rev 9:1','A star = a planet = a <b>letter</b> that marks a sign. The Sirius–Sothic link (1461) sits in the same seal-trumpet.'],
  ['The holy city… a cube, its length and breadth and height equal, 12,000 stadia','Rev 21:16','A <b>cube of edge 12</b> = the 12 simples measured in <b>3 dimensions</b> = the 3 mothers. 12³ = 1728.'],
  ['Its wall, 144 cubits','Rev 21:17','144 = <b>12²</b> = zodiac squared. 24 elders + 4 living creatures = 28 = the lunar mansions / abjad.'],
  ['The tree of life, twelve kinds of fruit, yielding its fruit each month','Rev 22:2','Twelve fruits, one per month = the <b>12 simples = the 12 months</b>.'],
  ['A woman clothed with the sun, the moon under her feet, and on her head a crown of twelve stars','Rev 12:1','Sun + Moon + 12 = the SY apparatus: the <b>2 luminaries (doubles) + the 12 simples</b>. The sky-woman wears the whole frame.'],
  ['A great red dragon… seven heads and ten horns','Rev 12:3','Parody of <b>7 / 10 / 3</b>: the 7 doubles, the 10 commandments/planets, the false trinity — a counter-alphabet.'],
  ['The stars fell to the earth as the fig tree sheds its winter fruit','Rev 6:13','The <b>letters/signs falling</b> = the sky dismantled, the scroll unrolled and emptied.'],
  ['I saw a new heaven and a new earth; the first heaven and earth had passed away','Rev 21:1','A <b>new alphabet / new sky</b> = precessional renewal; one era passes, the next is inscribed.'],
  ['Write what you see in a book','Rev 1:11, 19','The explicit command to <b>read the sky as letters and write it down</b> — the hermeneutic of the whole book.'],
];

function RevelationHebrewTab({date, rows, occ, words, genData, genYear}){
  const [inp,setInp]=useState('Ἀπολλύων');
  const verified=[
    ['Ἰησοῦς','Jesus',888,'8×111'],
    ['Χριστός','Christ',1480,''],
    ['Jesus + Christ','',2368,'888+1480'],
    ['','the beast (Rev 13:18)',666,'6×111 = Σ1..36 (Sun kamea)'],
    ['Ἀπολλύων','Apollyon (Rev 9:11)',1461,'Sothic cycle'],
    ['אבדון','Abaddon (Hebrew)',63,'7×9'],
  ];
  const greek = isopsephy(inp);
  const hebrew = /[א-ת]/.test(inp) ? gematria(norm(inp)) : null;
  const nameCount = (words||[]).filter(w=>w.name).length;
  const angelCount = (words||[]).filter(w=>w.angel).length;
  const genDays = genData && genData.list ? genData.list.length : null;
  return <>
    <h2>Revelation — the sky as a sealed scroll (§15c) · isopsephy</h2>
    <div className="muted" style={{marginBottom:10}}>A structural reading, not a confessional exegesis. Revelation (c. 95 CE) shares the late-Jewish symbolic cosmos (merkabah + creator-letters + 360/7/12) with the textualised Sefer Yetzirah — they <b>converge without borrowing</b>. Rev 13:18 is the only NT verse that <b>commands a gematria calculation</b>.</div>

    <h3>Sefer Raziel HaMalakh — “calculate to see the generations”</h3>
    <div className="muted" style={{marginBottom:8}}>An older sibling text frames exactly what this app does: <b>compute the planets and the zodiacal signs in their fixed order, and so read the generations from beginning to end</b>. From the Spanish <i>Sefer Raziel HaMalakh</i> (p. 144 of the source PDF):</div>
    <blockquote style={{borderLeft:'3px solid var(--gold)', margin:'8px 0', paddingLeft:14, color:'var(--txt)'}}>
      <i>“Combina los signos y la rueda. Graba y calcula y asigna y numera. Considera los cálculos de los planetas y los signos del zodíaco. Calcula los períodos y dando vueltas los planetas. De aquellos suspendidos y los signos del zodíaco en el orden perpetuo, ve con la luz. Calcula en orden para ver las generaciones. Prepara para verlos desde el principio hasta el final.</i><br/><br/>
      <i>Está escrito, quien actúa y crea, proclama las generaciones desde el principio, antes de la creación del universo. Para comprender las acciones de cada hombre en la rectitud y la maldad, decreta sobre cada uno. De acuerdo a las obras, prepara las obras entre el bien y el mal.”</i>
    </blockquote>
    <div className="muted" style={{marginBottom:10}}>— <i>Sefer Raziel HaMalakh</i> (Spanish ed.), p. 144. The “144” the eye reads as <i>ve144 con la luz</i> is the page number the text extractor merged into “ve con la luz” — a real textual fact of the document, and 144 = 12² = the New Jerusalem wall (Rev 21:17) / the 144,000 sealed (Rev 7:4).</div>

    <h3>The Raziel instruction, computed on today's sky</h3>
    <div className="muted" style={{marginBottom:8}}>Each line of the Raziel instruction, mapped to what the apparatus computes live (not asserted):</div>
    <table>
      <thead><tr><th>Raziel instruction</th><th>Computed on {date}</th></tr></thead>
      <tbody>
        <tr><td><i>“Calcula los períodos y dando vueltas los planetas”</i></td><td>{(rows||[]).length} bodies, ecliptic longitude → sign. Today: {(rows||[]).map(r=>`${r.body} ${r.deg.toFixed(0)}°→${r.sign}`).join(' · ')}.</td></tr>
        <tr><td><i>“los signos del zodíaco en el orden perpetuo”</i></td><td>12 signs × 30°, fixed order. Today <b>{(occ||new Set()).size}</b> occupied: <b style={{color:'var(--gold)'}}>{[...(occ||[])].sort().join(' ')||'none'}</b>.</td></tr>
        <tr><td><i>“ve [144] con la luz”</i></td><td>144 = <b>12²</b> = the New Jerusalem wall (Rev 21:17) / 144,000 sealed (Rev 7:4) = (zodiac)².</td></tr>
        <tr><td><i>“Calcula en orden para ver las generaciones”</i></td><td>The Reader enumerates every readable name today: <b style={{color:'var(--gold)'}}>{(words||[]).length}</b> names (the generations <i>now</i>) — incl. <b>{nameCount}</b> proper names and <b>{angelCount}</b> Shem HaMephorash angel-roots (word + suffix <span className="he">אל</span>/<span className="he">יה</span>).</td></tr>
        <tr><td><i>“Prepara para verlos desde el principio hasta el final”</i></td><td>The Predictor scans the whole year {genYear} (beginning → end): <b style={{color:'var(--gold)'}}>{genDays!=null ? genDays : '…'}</b> days where Genesis 1:1 is legible = the generations across time.</td></tr>
        <tr><td><i>“decreta sobre cada uno… entre el bien y el mal”</i></td><td>Revelation's judgment: the sky read as a decree on each — the sealed scroll opened (Rev 5–8), the same letters that name the generations now judging them.</td></tr>
      </tbody>
    </table>
    <div className="note" style={{marginBottom:12}}>Verdict: the Raziel instruction is not metaphor. <b>Calculate the planets</b> = astronomy-engine longitudes; <b>the signs in perpetual order</b> = the 12 simples; <b>see the generations from beginning to end</b> = the Reader (today's names) + the Predictor (the year's legible days). The “names of the ancestors and those to come” are the readable names of any date — past or future — and the apparatus enumerates them.</div>
    <h3>15c.9 · The two registers of the Name — the eternal and the temporal</h3>
    <p className="muted">The reading rule opens a theological contrast the apparatus makes measurable. 3 <i>mothers</i> (aleph, mem, shin — primordial elements, fixed) + 7 <i>doubles</i> (bet, gimel, dalet, kaf, pe, resh, tav — the 7 planets, always available) do not depend on the zodiac; the 12 <i>simples</i> do. A word of only mothers+doubles is <b>always readable</b> — it transcends the sky. A word of simples is <b>gated</b> — readable only when its signs are occupied, i.e. in time.</p>
    <p className="muted">The always-readable tier holds the theological anchors:</p>
    <table>
      <thead><tr><th>Hebrew</th><th>translation</th><th>letters</th><th>gematria</th><th>note</th></tr></thead>
      <tbody>
        <tr><td className="he" style={{fontSize:'1.25rem'}}>ברא</td><td>to create</td><td>2 doubles + 1 mother</td><td>203</td><td className="muted">the act of creation</td></tr>
        <tr><td className="he" style={{fontSize:'1.25rem'}}>אב</td><td>father</td><td>1 mother + 1 double</td><td>3</td><td className="muted">—</td></tr>
        <tr><td className="he" style={{fontSize:'1.25rem'}}>אמ</td><td>mother</td><td>2 mothers</td><td>41</td><td className="muted">—</td></tr>
        <tr><td className="he" style={{fontSize:'1.25rem'}}>שבת</td><td>sabbath (rest)</td><td>1 mother + 2 doubles</td><td>702 = 27×26</td><td className="muted">the whole alphabet × the Name</td></tr>
        <tr><td className="he" style={{fontSize:'1.25rem'}}>אמת</td><td>truth</td><td>2 mothers + 1 double</td><td>441 = 21²</td><td className="muted">the seal of God is Truth</td></tr>
      </tbody>
    </table>
    <ul className="muted">
      <li><b>Truth (אמת) = 441 = 21²</b>, and 21 = C(7,2) = seals + trumpets + bowls (§15c.3). The rabbinic “the seal of the Holy One is Truth (אמת)” is the same 21 that structures the sealed scroll of Revelation — the seal, squared.</li>
      <li><b>Sabbath (שבת) = 702 = 27 × 26</b>: the alphabet with finals (27) × יהוה (26). Rest = the whole language × the Name.</li>
      <li><b>יהוה is built entirely of simples</b> — yod (Virgo), he (Aries), vav (Taurus) — three temporal letters, none eternal. The Name is <i>never</i> always-readable: bound to the turning sky, legible only in its windows (the ~monthly cadence of §11, “the cadence of יהוה”).</li>
    </ul>
    <div className="note" style={{marginBottom:12}}>The sealed scroll of Revelation is the zodiac, and the names divide as the scroll does: the <b>eternal</b> register (mothers+doubles: create, father, mother, sabbath, truth…) readable always, needing no opening; the <b>temporal</b> register (the 12 simples: <b>יהוה</b>) — the Name of “who was and is and is to come” (Rev 1:4), readable only when the sky computes it, only when the scroll is opened. Truth is the seal (441 = 21²); the Name is what the seal guards. He who opens the scroll (Rev 5) is he who can calculate the temporal Name — and the eternal tier was never sealed.</div>

    <div className="controls" style={{marginBottom:10}}>
      <input type="text" value={inp} onChange={e=>setInp(e.target.value)} placeholder="Greek (Ἰησοῦς) or Hebrew (אבדון)" style={{flex:'1 1 280px'}}/>
      <span className="pill">{hebrew!=null ? 'Hebrew gematria' : 'Greek isopsephy'}: <b style={{color:'var(--gold)'}}>{hebrew!=null ? hebrew : greek}</b></span>
    </div>
    <table>
      <thead><tr><th>Name</th><th>Reading</th><th>Value</th><th>Notes</th></tr></thead>
      <tbody>
      {verified.map((v,i)=> <tr key={i}>
        <td className="letter-cell">{v[0]? <span className={/[א-ת]/.test(v[0])?'he':'gk'} style={{fontSize:'1.4rem'}}>{v[0]}</span> : ''}</td>
        <td>{v[1]}</td>
        <td className="big" style={{color:'var(--gold)'}}>{v[2]}</td>
        <td className="muted">{v[3]}</td>
      </tr>)}
      </tbody>
    </table>
    <h3>The arithmetic of Revelation → Sefer Yetzirah</h3>
    <ul className="muted">
      <li><b>The 111 family</b>: 666 = 6×111 (the beast, the 6 falling short of 7 = the material); 888 = 8×111 (Christ, the 8 = the eighth day, beyond-7 = resurrection). 666/888 = 3/4. Beast and Christ are the same 111 scaled by 6 and by 8.</li>
      <li><b>Apollyon = 1461 = the Sothic cycle</b>: 1461 vague Egyptian years (= 1460 Julian) is the return period of the heliacal rising of <b>Sirius</b> (the dog star). The 5th seal-trumpet where Apollyon appears is literally about a star falling from heaven and opening the abyss (Rev 9:1). Rev 9:11 gives the name in <b>both</b> systems — Hebrew (Abaddon, 63) and Greek (Apollyon, 1461) — a gematria/isopsephy bridge. <em>1461 is an arithmetic fact; that John meant Sirius is a hypothesis (strong, but not intent).</em></li>
      <li><b>7 seals + 7 trumpets + 7 bowls = 21 = C(7,2)</b> = the distinct pairs among the 7 doubles. + 7 thunders sealed (hidden) = 28 = the 28 lunar mansions / the abjad.</li>
      <li><b>144,000 sealed = 12² × 10³</b> = (zodiac)² × millennium. The New Jerusalem is a <b>cube</b> of edge 12,000 stadia = 3 mothers (3 dimensions) × edge 12 (the simples); 12³ = 1728; wall 144 = 12² cubits; 24 elders + 4 creatures = 28.</li>
      <li><b>Judgment fractions</b> climb in twelfths: ¼ = 3/12 → ⅓ = 4/12 → 1 = 12/12; each heptad raises the fraction by one zodiacal sign.</li>
      <li><b>3½ = the half-heptad</b> = the beast's domain: 1260 days = 3½ × 360 = half of 7 × the degree-circle (theological, not orbital).</li>
      <li>The 7 seals = the 7 doubles <b>inscribed &amp; silent</b>; the 7 trumpets = the same 7 doubles <b>sounded</b> (the shofar) — the “two tongues” (stop/fricative) of the SY. The 7th seal = silence in heaven = the Sabbath = the 7th double at rest.</li>
    </ul>
    <h3>The sky as a sealed scroll — the biblical phrases</h3>
    <div className="muted" style={{marginBottom:8}}>Revelation is one long act of <b>reading the sky as writing</b>: a sealed scroll, letters that sound, stars that fall, a city measured in 12s. Every one of these images maps onto the Sefer Yetzirah frame (3 mothers / 7 doubles / 12 simples). The full list, with reference and its reading in the system:</div>
    <table>
      <thead><tr><th>Phrase</th><th>Ref.</th><th>Reading in the system</th></tr></thead>
      <tbody>
      {PHRASES.map((p,i)=> <tr key={i}>
        <td><i>“{p[0]}”</i></td>
        <td className="deg">{p[1]}</td>
        <td className="muted" dangerouslySetInnerHTML={{__html:p[2]}}/>
      </tr>)}
      </tbody>
    </table>
    <div className="note">Two roots reach further back than Revelation: <i>“The heavens declare the glory of God; day to day pours out speech”</i> (Ps 19:1-2) and <i>“Lift up your eyes on high and see: who created these? He brings out their host by number”</i> (Isa 40:26) — the OT seed of the sky-as-text idea that Revelation dramatizes and the Sefer Yetzirah formalises.</div>
    <Fig n={11} doc="From the article (§15c.1): Rev 6:14 — the zodiacal band (the 12 simples) as a written scroll that rolls up; the stars (the constellation-letters) fall out of their seats. “I am the Alpha and the Omega” = the bounds of the alphabet = the cosmos as text. The Lamb who opens the sealed scroll is the one who can read the sky as a book — the Caeli Reader."/>
    <Fig n={12} doc="From the article (§15c.4): Rev 21 — the New Jerusalem is a cube of edge 12,000 stadia (the 3 mothers = the 3 dimensions × edge 12 = the simples; 12³ = 1728), walled in 144 = 12² cubits, with 12 gates + 12 foundations = 24 (= 12 tribes + 12 apostles). The 144,000 sealed = 12² × 10³ = (zodiac)² × (millennium = 10 sefirot cubed)."/>
    <div className="note">Try: <span className="key click" onClick={()=>setInp('Ἰησοῦς')}>Ἰησοῦς</span> <span className="key click" onClick={()=>setInp('Χριστός')}>Χριστός</span> <span className="key click" onClick={()=>setInp('Ἀπολλύων')}>Ἀπολλύων</span> <span className="key click" onClick={()=>setInp('אבדון')}>אבדון</span></div>
  </>;
}

// ====== Revelations — cross-cultural (subtabs by culture) ======
// Class tags: (a) verifiable astronomy/cycle · (b) eschatological/prophecy · (c) cosmological-doctrine · (u) unverified
const REV_CLS = {'(a)':'var(--green)','(b)':'var(--warn)','(c)':'var(--blue)','(u)':'var(--red)'};
function ClassTag({c}){ const col=REV_CLS[c]||'var(--dim)'; return <span className="pill" style={{color:col,borderColor:col,fontSize:'.68rem',padding:'1px 7px'}}>{c}</span>; }
function SrcList({items}){ return <details style={{marginTop:8}}><summary className="muted" style={{cursor:'pointer'}}>sources ({items.length})</summary><ul className="muted" style={{marginTop:6}}>{items.map((s,i)=><li key={i}><a href={s[1]} target="_blank" rel="noreferrer">{s[0]}</a></li>)}</ul></details>; }
function Section({name, rows}){
  return <>
    <h3>{name}</h3>
    <table>
      <thead><tr><th>Claim</th><th>Number</th><th></th><th>Note</th></tr></thead>
      <tbody>
      {rows.map((r,i)=><tr key={i}>
        <td>{r[0]}</td>
        <td className="big" style={{color:'var(--gold)',whiteSpace:'nowrap'}}>{r[1]}</td>
        <td><ClassTag c={r[2]}/></td>
        <td className="muted">{r[3]}</td>
      </tr>)}
      </tbody>
    </table>
  </>;
}
const REV_SUMMARY = [
  ['7','7 planets / powers / heavens','Hebrew · Gnostic · Sufi · Vedic · Egyptian','(a)'],
  ['12','12 signs / authorities / ages','Hebrew · Gnostic · Sufi · Vedic','(a)'],
  ['28','28 lunar mansions / letters / vertebrae','Sufi · Vedic · Chinese','(a)'],
  ['72','72 nations / languages / Yasna ch. / precessional °','Hebrew · Gnostic · Egyptian · Avestan','(a)/(c)'],
  ['360','360° / 360 powers / 360 veins / spokes / days','Hebrew · Gnostic · Sufi · Egyptian · Vedic','(a)'],
  ['720','720 = 360×2 (year-wheel sons, days + nights)','Vedic (RV 1.164.11)','(a)'],
  ['365','365 days / angels','Hebrew · Gnostic · Egyptian','(a)'],
  ['14','14 luminous/dark · 13+1 voices','Gnostic · Sufi','(c)'],
  ['19','Metonic 19 yr · 19 keepers of Hell','Hebrew · Chinese · Greco-Babylonian · Quran','(a)/(b)'],
  ['22','22 Hebrew letters (Sefer Yetzirah)','Hebrew only — NOT cross-cultural','(c)'],
  ['37 / 73','Gen 1:1 · 73×5=365 civil','Hebrew only — NOT cross-cultural','(c)'],
  ['144 / 144000','(zodiac)² / sealed / Long-Count unit','Hebrew-Christian · Maya','(c)'],
  ['1260 / 42 mo','half-heptad · beast domain','Hebrew-Christian only','(c)'],
];

function RevelationMayaTab(){ return <>
  <h2>Maya — independent 73, 144000, 260</h2>
  <div className="muted" style={{marginBottom:10}}>The Maya calendar corroborates 73, 144, 260 and 365 with no contact with Hebrew or Revelation — the strongest independent witnesses to the system's constants.</div>
  <Section name="Maya astronomy" rows={[
    ['Tzolkin 260-day sacred round','260','(a)','= the Mercury 8×8 kamea constant (§15b.1). 260 = 4×5×13.'],
    ['Haab 365 = 73 × 5','365','(a)','73 pentads of 5 days = the civil solar year (cf. Hebrew 73×5=365, §9.4).'],
    ['Calendar Round = 73 × 260 = 52 × 365','18,980','(a)','73 tzolkin cycles = 52 Haab years. 73 appears twice — pentads and tzolkin-rounds.'],
    ['Baktun = 144,000 days = 400 × 360','144,000','(a)/(c)','144,000 = 144×1000 = 12²×10³ — the Long Count major unit (cf. Rev 7:4 sealed). Independent of Revelation.'],
    ['144 = 12²','144','(c)','the square of the zodiac — Maya and Revelation agree without contact.'],
  ]}/>
  <SrcList items={[['Maya Long Count (Wikipedia)','https://en.wikipedia.org/wiki/Mesoamerican_Long_Count'],['Tzolkin (Wikipedia)','https://en.wikipedia.org/wiki/Tzolk%27in']]}/>
</>; }

function RevelationChineseTab(){ return <>
  <h2>Chinese — independent Meton & 28 mansions</h2>
  <div className="muted" style={{marginBottom:10}}>Chinese astronomy independently recovered the Metonic 19-year cycle and runs a 28-lunar-mansion scheme — convergences with no borrowing.</div>
  <Section name="Chinese astronomy" rows={[
    ['章 zhāng = 19 years = 235 months','19 / 235','(a)','the Metonic cycle, discovered independently in China (§7–8). 19 = 7 doubles + 12 simples in the SY.'],
    ['28 lunar mansions (xiu 宿)','28','(a)','28 stations along the equator — same 28 = T₇ = abjad / Sufi letters.'],
    ['24 solar terms (12 × 2)','24','(a)','12 major + 12 minor solar terms = 12 signs × 2.'],
    ['sexagenary cycle = 12 × 5','60','(a)','12 Earthly Branches × 5 Elements; 60 = 12×5.'],
  ]}/>
  <SrcList items={[['Metonic cycle (Wikipedia)','https://en.wikipedia.org/wiki/Metonic_cycle'],['Chinese lunar mansions (Wikipedia)','https://en.wikipedia.org/wiki/Twenty-Eight_Mansions']]}/>
</>; }

function RevelationVedicTab(){ return <>
  <h2>Indian / Vedic — the year-wheel, 7 metres, 27 nakshatras</h2>
  <div className="muted" style={{marginBottom:10}}>The Ṛg Veda Samhita (c. 1500–1000 BCE) is the oldest text here and carries the system's constants in its own idiom: a <b>12-spoked / 360-spoke year-wheel</b>, <b>720 sons</b>, <b>7 metres</b>, the <b>7 horses of Sūrya</b>, and the <b>27/28 nakshatras</b>. Mined from the Griffith translation (source copies in <code>library/rig-veda/</code>).</div>
  <Section name="Ṛg Veda 1.164 — the riddle of the year-wheel (strongest Vedic overlap)" rows={[
    ['"Twelve are the fellies, and the wheel is single; three are the naves"','12 / 3','(a)','RV 1.164.48 — a wheel of 12 (the months/signs) on 3 (the mothers?), undivided.'],
    ['"therein are set together spokes three hundred and sixty"','360','(a)','RV 1.164.48 — 360 spokes = the degrees/days of the year. The explicit 12×30.'],
    ['"seven hundred Sons and twenty stand, O Agni"','720','(a)','RV 1.164.11 — 720 = 360×2 = days + nights = the full year of the wheel.'],
    ['"with the syllable they form seven metres"','7','(a)','RV 1.164.24 — the 7 chandas (metres) of Vedic verse.'],
    ['"the six twin pairs are called Ṛṣis… the seventh single-born"','6+1','(c)','RV 1.164.15 — 6 paired + 1 alone = the 7, structurally like the 7 doubles (2 tongues / 1 single).'],
    ['"Speech hath been measured out in four divisions"','4','(c)','RV 1.164.45 — 3 hidden + 1 spoken = the 3 mothers + the manifest (cf. the 3 soft + 4 hard of the SY).'],
    ['"Two Birds with fair wings… in the same tree"','2','(c)','RV 1.164.20 — the Self and the soul on the cosmic tree (a pan-Indo-Iranian image).'],
  ]}/>
  <Section name="The 7 chandas (Vedic metres) — the 7 as poetic measure" rows={[
    ['Gāyatrī = 24 syllables','24','(a)','3×8. The simplest metre.'],
    ['Uṣṇih = 28','28','(a)','= the lunar mansions — 28 appears as a metre.'],
    ['Anuṣṭubh = 32','32','(a)','4×8; later the śloka of epic verse.'],
    ['Bṛhatī = 36','36','(a)','4×9.'],
    ['Pankti = 40','40','(a)','5×8.'],
    ['Triṣṭubh = 44','44','(a)','4×11; the dominant metre of the Ṛg Veda.'],
    ['Jagatī = 48','48','(a)','6×8.'],
  ]}/>
  <Section name="Sūrya, the Adityas, the Nasadiya" rows={[
    ['"Seven Bay Steeds harnessed to thy car" — Sūrya','7','(a)','RV 1.50.8 — the 7 horses of the Sun = the 7 days / 7 colours of the spectrum (traditional).'],
    ['"Eight are the Sons of Aditi… with seven she went to meet the Gods; she cast Martanda far away"','8 → 7+1','(a)/(c)','RV 10.72.8–9 — 8 Adityas, 7 + the mortal Martanda (the throwaway = the material), structurally like 8 vs 7.'],
    ['"Darkness was hidden by darkness… that One, breathing without wind, by its own impulse"','1','(c)','RV 10.129 (Nasadiya) — the uncreated One before being/non-being (the cosmogonic seed).'],
  ]}/>
  <Section name="Cosmology — nakshatras, rasis, yugas" rows={[
    ['27 nakshatras × 13°20′ = 360°','27 / 360','(a)','27 lunar mansions (or 28 with Abhijit); 27 = 22 Hebrew + 5 finals, structurally.'],
    ['12 rasis × 30° = 360°','12 / 360','(a)','the 12-sign zodiac, India receiving it from Babylonia/Greece.'],
    ['Kali-yuga = 432,000 years','432,000','(c)','= 72 × 6000; 432 = 72×6 — the yuga base (cf. Berossos’s Chaldean 432,000).'],
  ]}/>
  <div className="note"><b>Not Rig Vedic (flagged):</b> the 12 Adityas and 108 are <i>later</i> Vedic / Puranic, not Ṛg Veda Samhita. 108 = 27 nakshatras × 4 pādas (or 12 × 9) — a later sacred number, not an Ṛg Vedic constant. The Ṛg Vedic set is 7 (metres/horses), 12, 27/28, 360, 720.</div>
  <SrcList items={[
    ['Ṛg Veda 1.164 (Griffith, sacred-texts)','https://www.sacred-texts.com/hin/rigveda/rv01164.htm'],
    ['Ṛg Veda 10.72 Aditi (Griffith)','https://www.sacred-texts.com/hin/rigveda/rv10072.htm'],
    ['Ṛg Veda 1.50 Sūrya (Griffith)','https://www.sacred-texts.com/hin/rigveda/rv01050.htm'],
    ['Nakshatra (Wikipedia)','https://en.wikipedia.org/wiki/Nakshatra'],
    ['Yuga Cycle (Wikipedia)','https://en.wikipedia.org/wiki/Yuga_Cycle'],
  ]}/>
</>; }

function RevelationEgyptianTab(){ return <>
  <h2>Egyptian — 365, 36 decans, Sothis 1461, 72</h2>
  <div className="muted" style={{marginBottom:10}}>Egypt gives the 365-day civil year, the 36 decans (→ the zodiac), the Sothic 1461-year Sirius cycle, and 72 conspirators of Set.</div>
  <Section name="Egyptian astronomy & myth" rows={[
    ['365-day civil year','365','(a)','the Egyptian civil calendar (12×30 + 5 epagomenal); = the 365 angels of the Apocryphon of John.'],
    ['36 decans × 10 = 360 (+5)','36 / 360','(a)','36 ten-day asterisms → the 36 decans that seed the 12-sign zodiac (3 decans/sign).'],
    ['Sothic cycle = 1461 years','1,461','(a)','1461 vague civil years (= 1460 Julian): the heliacal rising of Sirius resets the calendar (cf. Apollyon 1461, §15c).'],
    ['72 conspirators of Set','72','(c)','the 72 accomplices in the murder of Osiris → 72 nations/languages (cf. Shem HaMephorash 72, §15b.5).'],
  ]}/>
  <SrcList items={[['Egyptian calendar (Wikipedia)','https://en.wikipedia.org/wiki/Egyptian_calendar'],['Sothic cycle (Wikipedia)','https://en.wikipedia.org/wiki/Sothic_cycle'],['Decan (Wikipedia)','https://en.wikipedia.org/wiki/Decan']]}/>
</>; }

function RevelationPersianTab(){
  const asrc=[
    ['Yasna 28–34 Ahunavaiti Gatha (avesta.org SBE)','https://www.avesta.org/yasna/y28to34.htm'],
    ['Vendidad (Vendidad) fargard 1 — 16 lands (SBE)','https://www.avesta.org/vendidad/vd1sbe.htm'],
    ['Vendidad fargard 2 — Yima / Vara (SBE)','https://www.avesta.org/vendidad/vd2sbe.htm'],
    ['Vendidad fargard 22 — 99,999 diseases (SBE)','https://www.avesta.org/vendidad/vd22sbe.htm'],
    ['Yasht 13 Farvardin (SBE)','https://www.avesta.org/ka/yt13sbe.htm'],
    ['Zoroastrianism (Encyclopaedia Iranica)','https://www.iranicaonline.org/articles/zoroastrianism'],
    ['Gaffarel, Unheard-of Curiosities (1650 EN, Chilmead) — archive.org','https://archive.org/details/b30333817'],
    ['Gaffarel — EEBO-TCP transcription (Univ. Michigan, CC0)','https://quod.lib.umich.edu/e/eebo2/A85346.0001.001'],
    ['Gaffarel — folding plates (Science History Institute)','https://digital.sciencehistory.org/works/fpj6eec'],
  ];
  return <>
    <h2>Persian / Avestan — 7 Amesha Spentas, 16 lands, 72 Yasna chapters</h2>
    <div className="muted" style={{marginBottom:10}}>The <i>Avesta</i> (the Zoroastrian scripture, Gathas c. 1000 BCE; Young Avestan and Vendidad later) is the Indo-Iranian sibling of the Ṛg Veda and carries the constants in its own frame: the <b>7 Amesha Spentas</b>, <b>16 sacred lands</b>, <b>21 Yashts</b>, <b>72 Yasna chapters</b>, and the striking <b>99,999 diseases</b>. Mined from the SBE translation (source copies in <code>library/avesta/</code>).</div>
    <Section name="The 7 Amesha Spentas — the Bountiful Immortals" rows={[
      ['7 Amesha Spentas (Vohu Manah, Asha Vahishta, Khshathra Vairya, Spenta Armaiti, Haurvatat, Ameterat, + Ahura Mazda)','7','(c)','Yasna 28–34 (Ahunavaiti Gatha): 6 emanations + the Lord = 7; the 7 correspond to the 7 creations (sky, water, earth, plants, animals, metals, fire). The closest Avestan parallel to the 7 doubles.'],
      ['"the seven, who are the lords" / "the seven that have the best rule"','7','(a)','Yasna 39.3 — the 7 named lords of creation.'],
    ]}/>
    <Section name="Vendidad — 16 lands, Yima, 99,999 diseases" rows={[
      ['16 sacred lands created by Ahura Mazda (Vendidad 1)','16','(a)','vd1: 16 ideal lands, each with a paired evil-counterpart. 16 = 4² (cf. the 4 mothers×4, or the doubled 8).'],
      ['Yima\'s Vara — a three-storied enclosure for the seed','3 / 9','(c)','vd2: Yima/Khshaeta builds a refuge against the winter. The three rows (three, six, ninefold) echo 3×3.'],
      ['99,999 diseases (Vendidad 22)','99,999','(c)','vd22: 99,999 diseases and 99,999 cures — the most striking Avestan large number; cf. the limitless legions of Revelation.'],
    ]}/>
    <Section name="Structure — Yasna, Yashts" rows={[
      ['Yasna = 72 chapters','72','(a)','the Yasna liturgy (including the Gathas) runs to 72 chapters = the same 72 as the nations/languages/angels.'],
      ['21 Yashts (hymns to the yazatas)','21','(a)','21 = C(7,2) = the seals/trumpets/bowls (§15c.3); the Yashts honor the 21 divine entities.'],
      ['72+5 = 77 "good names" of Ahura Mazda (tradition)','77','(c)','later tradition: 72 + 5 = 77 names; 72 recurs.'],
    ]}/>
    <Section name="Cosmology" rows={[
      ['12 × 30 = 360° zodiac (received from Babylonia)','12 / 360','(a)','the 12-sign frame shared across Persia, India, Greece, and the Hebrew SY.'],
      ['Haoma = the plant of immortality','—','(c)','the Indo-Iranian soma/haoma — the Vedic Soma (RV 9) and the Avestan Haoma are the same rite.'],
    ]}/>
    <Section name="Gaffarel (1629/1650) — the Persian talismanic reading of the stars" rows={[
      ['Stars ranged in the heavens in the form of Hebrew letters','22','(b)','Part IV ch. XIII: the "celestiall writing" is in Hebrew characters (not Arabick/Samaritan); the heavens are a book (Isa 34:4, "rolled together… Because they are a Booke") = the same sky-as-βιβλίον as Rev 6:14. Source text in library/gaffarel/.'],
      ['Reading instrument = the 3 Cabala: Gematria / Notaricon / Temurah','3','(c)','to read the celestial word: Gematria (number↔event), Notaricon (letter=initial of a word), Temurah (anagram). The same operations the Reader uses to turn a sky-config into a name+number (§6, §15b).'],
      ['Rabbi Chomer — nations read in the stars by Gematria','—','(u)','חרב/Charab "desolate" over Greece = יון/Javan (Gen 10); נתק/Nataq=505 = the years of the Jewish kingdom (Saul→Zedekiah); כעה/Caah=1025 over Turkey. The celestial word names the nation and its fate by number — attested tradition, not reproduced here.'],
      ['A new star rewrites the word (AKE→LAKE→ARKE)','—','(c)','a new star/comet adds a letter and changes the reading — the dynamical core the Lector Caeli replaces with celestial mechanics: a planet entering a sign rewrites the sky-sentence.'],
      ['Persian talismanic sculpture (Part II) — images under constellations','—','(c)','figures cast "under certain Constellations" = the operative counterpart; Part IV reads the configuration itself as the Hebrew letter-word. Persian (Part II) + Hebrew (Part IV) converge with Rev\'s sealed-book sky (§15c.1, §15c.10).'],
    ]}/>
    <div className="note"><b>Boundary respected:</b> the Gathas (Yasna 28–54, the oldest stratum, attributed to Zarathushtra) are kept distinct from the later Young Avestan / Vendidad material. The 7 Amesha Spentas are Gathic; the 99,999 and the 16 lands are Vendidad (later).</div>
    <SrcList items={asrc}/>
  </>;
}

function RevelationSufiTab(){
  const sufiSrc=[
    ['Ramlan & Ludovico (2023), Religions','https://doi.org/10.3390/rel14060692'],
    ['Rašić (2023), J. Sufi Studies','https://doi.org/10.1163/22105956-bja10029'],
    ['Chodkiewicz, Futuhat & its Commentators','https://ibnarabisociety.org/the-futuhat-makkiyya-and-its-commentators-michel-chodkiewicz/'],
    ['Morris, Ibn Arabi on the Barzakh','https://ibnarabisociety.org/wp-content/uploads/PDFs/Morris_Ibn-Arabi-on-the-barzakh.pdf'],
    ['SEP — Ikhwan al-Safa','https://plato.stanford.edu/entries/ikhwan-al-safa/'],
    ['De Callataÿ, Ikhwan on Animals (2022)','https://doi.org/10.5617/jais.9879'],
    ['Varisco, al-Buni Lunar Stations (Arabica 2017)','https://brill.com/view/journals/arab/64/3-4/article-p487_487.xml'],
    ['Gardiner, Forbidden Knowledge? al-Buni (JAIS 2012)','https://journals.uio.no/JAIS/article/view/4618'],
    ['Usluer, Hurufi Cosmology (2024)','https://dergipark.org.tr/en/download/article-file/3630967'],
    ['Iranica — Hurufism','https://www.iranicaonline.org/articles/horufism/'],
    ['Hadith 73 sects (Abu Dawud 4596)','https://en.tohed.com/hadith/abu-dawud/4596/'],
    ['Hadith 72 branches (Bukhari 9)','https://sunnah.com/bukhari:9'],
    ['Hadith 70,000 tawakkul (Bukhari 6233)','https://livingnoor.com/quran/hadiths/sahih-al-bukhari/6233'],
  ];
  return <>
    <h2>Islamic / Sufi — 28 letters = 28 mansions, Hurufi 360 = 6×(28+32)</h2>
    <div className="muted" style={{marginBottom:10}}>The Arabic letter-science ('ilm al-huruf) is the closest non-Hebrew sibling of the Sefer Yetzirah: <b>28 letters = 28 lunar mansions</b> recurs in Ibn al-Arabi, the Ikhwan al-Safa, the received <i>Shams al-ma'arif</i>, and the Hurufiyya. The Hurufi equation <b>360° = 6 × (28 + 32)</b> directly welds the astronomical circle to the Arabic/Persian letter-counts. The Quran itself carries the constants in its own text (Pickthall translation, source copies in <code>library/quran/</code>).</div>
    <Section name="The Quran — in the text (Pickthall)" rows={[
      ['"seven heavens, and of the earth the like thereof"','7 + 7','(c)','65:12 — 7 heavens + 7 earths; cf. 67:3 "seven heavens in harmony (tibāqan)", 71:15.'],
      ['"the number of the months with Allah is twelve months"','12','(c)','9:36 — 12 lunar months, 4 sacred; 9:37 condemns nasīʾ (intercalation) → the strict lunar calendar.'],
      ['"for the moon We have appointed mansions (manāzil)"','28','(a)/(c)','36:39 — the WORD manāzil is in the text; the COUNT 28 is from Arabic astronomy, not the verse. (53:1 "an-najm" = Pleiades/Venus in tafsir, NOT the 28 mansions.)'],
      ['"Above it are nineteen"','19','(b)','74:30 — 19 keepers over Hell; the only explicit 19 in the Quran (Islamic-distinctive, cf. Metonic 19 elsewhere).'],
      ['"seven of the oft-repeated (al-mathānī) and the great Quran"','7','(c)','15:87 — "seven oft-repeated"; identification with al-Fātiha\'s 7 verses is traditional tafsir, not the text.'],
      ['"the sun and the moon [move] by calculation (ḥisbān)"','—','(a)','55:5; cf. 6:96, 10:5 — reckoning; 36:40 "each floats in an orbit."'],
    ]}/>
    <Section name="Not in the Quran text (flagged)" rows={[
      ['360 — NOT a Quran verse','—','(u)','360 appears only in tafsir (al-Tabari: 360 sunrises) and hadith (360 joints/idols); the lunar year is 354. A Late-Antique symbolic number absorbed into cosmology.'],
      ['99 Names — hadith, not text','99','(b)/(u)','Sahih Muslim 2675 states only the NUMBER 99; the LISTS (Tirmidhi 3507 etc.) are graded gharib/mudraj and differ between collections.'],
      ['73 sects — hadith','73','(b)','Abu Dawud 4596 (Hasan Sahih) = "73 sects"; the "72 in Hell, 1 saved" addition (4597) is weak/fabricated (al-Shawkani: fabrication). 72≠73 — do not conflate.'],
      ['Bismillah abjad = 786','786','(c)','بسم الله الرحمن الرحيم = 2+60+40+66+329+289 = 786 (19 letters). Verifiable arithmetic; the use of "786" for Bismillah is tradition, not Quran text.'],
      ['114 suras / 6236 verses','114 / 6236','(c)','structural only, NOT cosmic.'],
    ]}/>
    <Section name="Ibn al-Arabi (1165–1240) — Futuhat al-Makkiyya" rows={[
      ['28 Arabic letters = 28 lunar mansions','28','(c)','each letter ↔ a mansion ↔ a lunar phase (Futuhat ch. 198, Vol II 390–478; not "ch. 2" — the locus is ch. 198).'],
      ['29th letter (lam-alif) = the qutb','29','(c)','"If not for that twenty-ninth, the 28 would not be stabilized" — the cosmic pole.'],
      ['14 luminous (undotted) ↔ 14 waxing; 14 dark ↔ 14 waning','14+14','(c)','14th letter ra (= full moon / badr); 28th (waw) = darkest phase.'],
      ['7 heavens; Sun at the heart of the 7','7','(a)/(c)','Futuhat Ch. 371; earth spherical and rotating.'],
      ['114 abode-chapters ↔ 114 Quran suras','114','(c)','114 = 6×19; the Futuhat mirrors the Quran in reverse.'],
    ]}/>
    <Section name="Ikhwan al-Safa (Brethren of Purity, 10th c. Basra)" rows={[
      ['7 planets; 12 signs = 12 world-ages','7 / 12','(a)','12 ages of decreasing length; Adam created in the 7th age (Virgo).'],
      ['28 lunar mansions = 28 vertebrae of the spine','28','(a)/(c)','Epistle 22: "every organ agrees in number with some category of existent beings."'],
      ['360 veins in the body ↔ 360° of the zodiac','360','(c)','alongside 12 orifices and 28 vertebrae (Epistle 22).'],
      ['36,000-year precession; 360,000-year great cycle','36k / 360k','(b)','Epistle 36: equinoctial precession → geological interchange; "Annus Platonicus."'],
    ]}/>
    <Section name="al-Buni (d. ca. 1225) — received Shams al-ma'arif al-kubra" rows={[
      ['28 mansions ↔ 28 letters (14 undotted / 14 dotted)','28','(c)','14 luminous → 14 visible mansions (benefic); 14 dark → 14 hidden (malefic).'],
      ['abjad 1…1000 builds magic squares (awfaq)','—','(c)','squares tied to divine names, planets, intentions.'],
      ['12 signs ↔ 12 letters of "La ilaha illa Allah"','12','(c)','integrating mansions, 7 planets, and divine unity.'],
      ['AUTHORSHIP CAVEAT','—','(u)','the famous Shams al-kubra is a pseudepigraphic Ottoman compilation (Gardiner/Coulon), not by al-Buni himself. Cite as "received Shams al-kubra."'],
    ]}/>
    <Section name="Hurufiyya — Fazlallah Astarabadi (d. 1394)" rows={[
      ['28 letters = 28 mansions = 28 lines on the face','28','(c)','the lettrist incarnation: letters/mansions substantively present in the human form.'],
      ['360° = 6 × (28 + 32)','360','(c)','six directions × (28 Arabic + 32 Persian letters) — fuses the astronomical circle to the letter-counts (Usluer 2024).'],
      ['32 Persian letters = 32 pre-eternal words taught to Adam','32','(c)','28 Arabic (to Muhammad) vs 32 Persian (to Adam); 32 human teeth confirm physiologically.'],
      ['khatt al-istiwā divides the zodiac into 14 + 14','14+14','(c)','14 maternal/visible + 14 paternal/hidden.'],
    ]}/>
    <Section name="The 72 / 73 / 70,000 hadiths (do not conflate)" rows={[
      ['73 sects (al-iftiraq)','73','(b)','core = Hasan/Sahih; the "72 in Hell, 1 saved" addition is only in weaker chains.'],
      ['72 branches of faith','72','(c)','scholastic derivation from the sahih "over seventy branches" hadith — the exact 72 is later, not in the sahih text.'],
      ['70,000 enter Paradise without account','70,000','(b)','a separate tawakkul hadith (Bukhari); not the sects, not the branches.'],
    ]}/>
    <div className="note"><b>Not found in pre-1500 Sufi sources:</b> 19, 22, 37, 144, 144000, 1260, 42 months, and a direct 365 — these are Hebrew/Sefer Yetzirah or Revelation constants, absent from the Arabic-Islamic corpus. Their absence is itself a finding.</div>
    <SrcList items={sufiSrc}/>
  </>;
}

function RevelationGnosticTab(){
  const gsrc=[
    ['Apocalypse of Adam (text)','https://earlychristianwritings.com/text/adam.html'],
    ['Apocryphon of John (Wisse)','https://pseudepigrapha.com/apocrypha_nt/apocjn.html'],
    ['On the Origin of the World (text)','https://earlychristianwritings.com/text/originworld.html'],
    ['Eugnostos the Blessed (text)','https://earlychristianwritings.com/text/eugnostos.html'],
    ['Concept of Our Great Power (text)','http://earlychristianwritings.com/text/greatpower.html'],
    ['Pleše, Fate/Astrology in Gnosticism (2007)','https://www.scribd.com/document/382360129/Fate-Providence-and-Astrology-in-Gnosticism-1-The-Apocryphon-of-John-Zlatko-Plese-pdf'],
  ];
  return <>
    <h2>Gnostic / Nag Hammadi — 365 angels, 72 languages, the 12→72→360 cascade</h2>
    <div className="muted" style={{marginBottom:10}}>The Nag Hammadi library (Coptic Gnostic codices, copies of 1st–3rd-c. originals) carries the cleanest astronomical overlaps: <b>365 angels</b> (Apocryphon of John) = the solar year; <b>72 gods = 72 languages</b> (Origin of the World); the <b>12 → 72 → 360</b> cascade (Eugnostos) mirroring 12 months / 360 days. The Apocalypse of Adam supplies the eschatological register (12 / 13 / 14 kingdoms).</div>
    <Section name="Apocalypse of Adam (NHC V,5) — eschatological register" rows={[
      ['Adam reveals to Seth "in the 700th year"','700','(c)','testamentary frame echoing Genesis 5; no explicit star/planet references.'],
      ['seed of Ham & Japheth establish 12 kingdoms','12','(b)','12 false mythic origins.'],
      ['13 kingdoms each give a false oracle of the Illuminator\'s birth','13','(c)','explicitly numbered 1st–13th; each gives a false cosmogony (a spirit, a prophet, a virgin womb, a drop from heaven, a cloud, the nine Muses, two illuminators…).'],
      ['13th kingdom: "every birth of their ruler is a word"','13 / word','(b)/(c)','the 13th oracle — the messiah\'s birth <b>is</b> a word, and "this word received a mandate… glory and power." <b>Not</b> "born of a word alone" (a common misreading) — the text says the ruler\'s every birth <i>is</i> a word. The closest the NH comes to the creator-word / Sefer Yetzirah letter-theology.'],
      ['14th voice — "the generation without a king"','14','(c)','the kingless generation alone says the truth: "God chose him from all the aeons." 13 false + 1 true = 14 voices (structural 14, not Matthew 1:17).'],
      ['Illuminator "will for a third time pass by"','3','(b)','eschatological prophecy of the Phōtēr.'],
      ['400,000 join the seed of Seth','400,000','(b)','eschatological number.'],
    ]}/>
    <Section name="Apocryphon of John (NHC II,1)" rows={[
      ['365 angels fashion Adam\'s body','365','(a)','= days of the solar year — the single strongest astronomical overlap in NH.'],
      ['7 powers = "the sevenness of the week"','7','(a)','7 planets / 7 weekdays.'],
      ['12 authorities; 7 kings + 5 = 12','12','(a)','12 zodiac / months.'],
      ['4 lights preside over 12 aeons','4 / 12','(c)','4 lights × 3 aeons each.'],
      ['72 pentads underlying the melothesia','72','(u)','Pleše reconstruction of the Egyptian 72×5-day periods; NOT explicit in the text.'],
    ]}/>
    <Section name="On the Origin of the World (NHC II,5)" rows={[
      ['7 heavens of chaos','7','(a)','7 planets.'],
      ['12 gods of chaos (the zodiac)','12','(a)','"above the twelve gods of chaos."'],
      ['64 forms (8 shapes × 4 corners) + 7 archangels + Sabaoth = 72','64 / 72','(c)','the strongest 72 overlap: 72 gods rule the 72 languages of the peoples (cf. Deut 32:8 LXX).'],
      ['49 demons (7 offspring × 7)','49','(c)','7×7.'],
      ['930 years of Adam; luminaries for "signs, seasons, years, months, days"','930','(c)','echoes Genesis 5:5; the luminaries mark time.'],
    ]}/>
    <Section name="Eugnostos the Blessed (NHC III,3 / V,1)" rows={[
      ['12 → 72 → 360 cascade','12/72/360','(c)','12 powers → 72 powers (12 pairs) → 360 powers (72 × 5); mirrored by 12 months / 360 days.'],
      ['12 aeons · 72 heavens (12×6) · 360 firmaments (72×5)','12/72/360','(c)','the cleanest numerical cascade in the corpus — maps directly onto the project.'],
      ['360 days of the year = type of the 360 powers','360','(a)','Egyptian 360-day civil calendar (NOT 365).'],
      ['8 = the Ogdoad','8','(c)','the Assembly of the Eighth.'],
    ]}/>
    <Section name="Concept of Our Great Power (NHC VI,4)" rows={[
      ['120 appears 3× (age-limit, Noah\'s preaching, "the perfect number")','120','(c)'],
      ['final conflagration after 1,460 years','1,460','(b)','Wisse translation (some cite 1,468 — UNVERIFIED discrepancy).'],
      ['72 tongues','72','(c)'],
    ]}/>
    <div className="note"><b>Not found in Nag Hammadi:</b> 144, 144000, 1260, 42 months, 19, 22, 28, 37, 73 — these belong to Revelation / Hebrew / Sufi, not the Gnostic corpus.</div>
    <SrcList items={gsrc}/>
  </>;
}

function RevelationRazielTab(){
  const rsrc=[
    ['Sefer Raziel HaMalakh — Spanish ed. (322pp, source PDF)','pdf/razielbook.pdf'],
    ['Sefer Raziel HaMalakh — Hebrew ed. (90pp, source PDF)','pdf/raziel-hebrew.pdf'],
  ];
  return <>
    <h2>Sefer Raziel HaMalakh — the indisputable findings (§9.6)</h2>
    <div className="muted" style={{marginBottom:10}}>The <i>Sefer Raziel HaMalakh</i> (Book of the Angel Raziel) is the older sibling of the <i>Sefer Yetzirah</i> in this register: a late-antique / early-medieval manual of letter-astronomy that tells the reader to <b>compute the planets and the fixed zodiacal signs to read the generations</b>. Mined 2026-08-10 from the two source PDFs in <code>pdf/</code> — the Spanish <i>Sepher Raziel Hamelach</i> (322pp, clean text) and the Hebrew edition (90pp, OCR-garbled but cross-confirming). Page refs = Spanish PDF. Only findings verified against the text are listed; loose coincidences are flagged at the end.</div>

    <Section name="1 · Alphabet ↔ astronomy (the core thesis — strongest validation)" rows={[
      ['22-letter gematria explicit, א=1 … ת=400, NO 500–900 finals','22','(a)','p.95: "Aleph es 1, Beth es 2 … Qoph 100, Resh 200, Shin 300, Tau 400." = the SAME ancient system this app uses (not Mispar Gadol).'],
      ['Triangular numbers T(2..9) by letter','T(n)','(a)','p.95: אב→3, ג→6, ד→10, ה→15, ו→21, ז(Zayin,7)→28, ח(8)→36, ט(9)→45. Confirms T(7)=28 = lunar mansions and gives the full series.'],
      ['12 simples ↔ 12 hours day + 12 night, 12 months, 12 signs, 12 tribes','12','(a)','p.106 — the explicit 12-simples↔12-signs mapping this app reads.'],
      ['22 letters in 3 palaces, engraved with each sign','22 / 3','(c)','p.226 — 22↔signs via 3 palaces (= the 3 mothers).'],
      ['3 letters (the mothers) ↔ 12 signs','3 / 12','(c)','p.81.'],
      ['Raziel cites the Sefer Yetzirah directly','—','(a)','Heb p.24: "as written in Sefer Yetzirah: ten sefirot…" — Raziel is built on the SY.'],
    ]}/>
    <h3>1b · The triangular series T(2..9) — the lunar-mansion key</h3>
    <table style={{marginBottom:6}}>
      <thead><tr><th>Letter</th><th>n</th><th>T(n) = n(n+1)/2</th><th>astronomy</th></tr></thead>
      <tbody>
        {[['א',1,1,'unity'],['ב',2,3,'—'],['ג',3,6,'—'],['ד',4,10,'—'],['ה',5,15,'—'],['ו',6,21,'—'],['ז',7,28,'28 lunar mansions'],['ח',8,36,'—'],['ט',9,45,'—']].map(r=>(
          <tr key={r[0]}><td className="he" style={{fontSize:'1.2rem',color:'var(--gold)'}}>{r[0]}</td><td className="deg">{r[1]}</td><td className="deg" style={{color:'var(--gold)'}}>{r[2]}</td><td className="muted">{r[3]}</td></tr>
        ))}
      </tbody>
    </table>
    <div className="note" style={{marginBottom:12}}>Zayin (ז=7) → T(7)=28 = the 28 lunar mansions (Manzil), tying the 7 doubles to the Moon's path — the same 28 the Saros mnemonic panel uses.</div>

    <Section name="2 · The 72 / 73 / 28 / 248+365" rows={[
      ['72 names derived from Genesis 1:1 (Bereshit → Bohu)','72','(a)','= the Shem HaMephorash triplets (והו/ילי/סיט…). Variant of the Exodus-14:19-21 extraction this app uses; Raziel is Genesis-centric like the project.'],
      ['72 letters from patriarchs + 12 tribes + Sabbatai + Yesheron','72','(c)','Abraham…Benjamin.'],
      ['73 names of God inscribed on the right','73','(c)','p.72; Heb p.24 "ע״ג שמות" = 73 names — attests 73 (= 2701 = 37×73).'],
      ['28 Malachim per lunar month (Tammuz & Adar = 28)','28','(a)','p.148 — 28 = lunar mansions tied to the Hebrew months.'],
      ['248 mighty [limbs] + 365 degrees = 613','248+365','(a)','the 613 structure (248 positive + 365 negative commandments); 365 = degrees/days.'],
    ]}/>

    <Section name="3 · Astronomy scaffold" rows={[
      ['360° → 12 signs (Aries…Pisces), each 30°','360 / 12','(a)','p.146-147 — base-60 sexagesimal subdivision chain (60×60×60…).'],
      ['"Los signos del zodíaco están fijos" — the signs are FIXED','fixed','(a)','p.115 — tropical (equinox-anchored), non-precessing grid. Directly supports this app\'s tropical-vs-sidereal split: the Reader\'s 12 sectors do NOT rotate with precession (see Sky tab note).'],
      ['4 tekufot (Nisán/Tammuz/Tishri/Tevet), each 3 months = 12','4 / 12','(a)','p.114; Heb p.10 lists all 12 signs across 4 tekufot with month-angels. Sun qualities: warm / hot-dry / cold-moist / cold-dry.'],
      ['7 planets in Chaldean order','7','(a)','p.114-115 — שבתאי/צדק/מאדים/שמש/נוגה/כוכב/לבנה.'],
      ['Planet periods: Saturn 30y, Jupiter 12y','30 / 12','(a)','Both match real sidereal periods (29.46 / 11.86 yr). 28-year & 36-year cycles also present (see caveat).'],
      ['Draqon Dinor (the dragon) surrounding the 7 planets','Draco','(a)','p.146 — the Draco axis = this app\'s 3rd mother (Shin · Cassiopea axis / circumpolar).'],
      ['Planet-angel assignments','7','(c)','Saturn=Gabriel, Jupiter=Tzedeqial, Mars=Samael, Sun=Raphael, Venus=Anael, Mercury=Beraqial, Moon=Chesedial; Michael = force in the Sun.'],
    ]}/>

    <h3>4 · Loose — do not force</h3>
    <ul className="muted">
      <li><b>7×70 = 490</b> (p.71) ≈ the 491-year Neptune–Pluto Genesis window. An arithmetic-mnemonic coincidence, <b>not</b> a real link — flagged, not claimed.</li>
      <li><b>"23 princes of the signs"</b> (p.147) — unclear; does not map to any app constant. Left unmapped.</li>
      <li><b>The 28-year cycle</b> the Spanish PDF attributes to Venus is likely a garbled tekufat-chamah (the 28-year solar cycle), since real Venus sidereal = 225 days. Needs clean Hebrew verification before any claim.</li>
    </ul>
    <div className="note"><b>Why this matters:</b> Raziel independently attests the apparatus this app is built on — the 22-letter gematria, the triangular-to-28 lunar key, the 12↔signs mapping, the fixed tropical zodiac, the 72-from-Genesis, the 7 Chaldean planets, and the Draco axis — in a text that explicitly instructs the reader to <i>calculate</i> them. That is corroboration of the <i>method</i>, not a prediction.</div>
    <SrcList items={rsrc}/>
  </>;
}

function RevelationsTab({sub, setSubTab, date, rows, occ, words, genData, genYear}){
  const subtabs=[['hebrew','Hebrew · Christian'],['raziel','Raziel'],['gnostic','Gnostic / Nag Hammadi'],['vedic','Indian / Vedic'],['persian','Persian / Avestan'],['sufi','Islamic / Sufi'],['egyptian','Egyptian'],['maya','Maya'],['chinese','Chinese']];
  return <>
    <h2>Revelations — the constants across all cultures (§15c, §9.6)</h2>
    <div className="muted" style={{marginBottom:10}}>Revelation = the cross-cultural register: every tradition that independently carries the system's constants (gematria, prophecies, cosmology). No cultural borrowing is claimed — only independent corroboration. Class tags: <ClassTag c="(a)"/> verifiable astronomy · <ClassTag c="(b)"/> eschatological/prophecy · <ClassTag c="(c)"/> cosmological-doctrine · <ClassTag c="(u)"/> unverified.</div>
    <h3>Cross-cultural numeric summary — project constants vs. the corpora</h3>
    <table style={{marginBottom:6}}>
      <thead><tr><th>Constant</th><th>Meaning</th><th>Where attested</th><th></th></tr></thead>
      <tbody>
      {REV_SUMMARY.map((r,i)=><tr key={i}>
        <td className="big" style={{color:'var(--gold)',whiteSpace:'nowrap'}}>{r[0]}</td>
        <td>{r[1]}</td>
        <td className="muted">{r[2]}</td>
        <td><ClassTag c={r[3]}/></td>
      </tr>)}
      </tbody>
    </table>
    <div className="note" style={{marginBottom:12}}><b>Load-bearing for accuracy:</b> 22, 37, 73, 144, 1260, 42 months are NOT securely attested in either Nag Hammadi or pre-1500 Sufi sources — they are Hebrew/Sefer Yetzirah (22) or Revelation (144, 1260, 42) constants. The citable cross-cultural overlaps concentrate on <b>7, 12, 28, 72, 360, 365, 14</b>.</div>
    <SubTabs items={subtabs} active={sub} onChange={setSubTab}/>
    {sub==='hebrew' && <RevelationHebrewTab date={date} rows={rows} occ={occ} words={words} genData={genData} genYear={genYear}/>}
    {sub==='raziel' && <RevelationRazielTab/>}
    {sub==='maya' && <RevelationMayaTab/>}
    {sub==='chinese' && <RevelationChineseTab/>}
    {sub==='vedic' && <RevelationVedicTab/>}
    {sub==='sufi' && <RevelationSufiTab/>}
    {sub==='egyptian' && <RevelationEgyptianTab/>}
    {sub==='gnostic' && <RevelationGnosticTab/>}
    {sub==='persian' && <RevelationPersianTab/>}
  </>;
}

function MethodTab({esGlossCount}){
  return <>
    <h2>Methodology &amp; scope</h2>
    <ul className="muted" style={{marginTop:4,lineHeight:1.7}}>
      <li><b>Frame:</b> a modern hermetic-astronomical synthesis. The classical <i>Sefer Yetzirah</i> is cosmogonic linguistics, not an oracle; this operationalisation is a contemporary reading, not traditional kabbalistic practice.</li>
      <li><b>Simple↔sign mapping:</b> equal 30° tropical sectors (not IAU constellations, which are unequal and 13). A symbolic convention necessary for the one-to-one letter↔sign grid. The mothers are placed opposite their real circumpolar constellations (Draco, Ursa Minor, Cassiopea).</li>
      <li><b>Astronomy:</b> astronomy-engine v2.1.19, geocentric apparent ecliptic longitude (<code>GeoVector→Ecliptic.elon</code>), noon UT.</li>
      <li><b>Lexicon:</b> Strong (OpenScriptures), 6045 consonantal roots.</li>
      <li><b>Pluto ephemeris:</b> precision degrades outside 1700–2200; ancient windows rely on sign-level (30°) determination, validated by smooth continuity, not arcminute precision.</li>
      <li><b>Negative results (tested):</b> the mirror-palindrome 2701→3773 does not discriminate at corpus level (Genesis 39.3% ≈ Markov 39.2% ≈ uniform 38.4%); Genesis-days do not correlate with eclipses (7.5% observed vs 28% expected — they avoid them).</li>
      <li><b>Positive results:</b> 37/73 fit the civil solar year (365=73×5; 2701 pentads = 37 years), corroborated by the Maya Haab and Calendar Round; Genesis 1 core palindromes 51.6% vs 37.4% paired null (p≈0.076, borderline — not significant, but very close; hypothesis).</li>
      <li><b>Positive results v3.1 (§15b):</b> 37×73 structure of the 7 Genesis words demonstrated (23/127 subsets, p≈3.1×10⁻⁴); saros-series count by calculation (152 series, 54–87, median 72); 7 kameot = 7 doubles (Mercury 260 = Tzolkin); Aiq Bekar = decimal-positional gematria of §2 (bridge to sigils); 72 Shem HaMephorash angels from Exodus (216=6³); the 7-doubles=7-days heptagram (Chaldean order + mod 7 + Romance etymology); ayanamsa: 190-year spread (tropical discard robust); 6 windows 491-year cadence (p&lt;5×10⁻⁶, hypothesis not cause).</li>
      <li><b>Validation:</b> 88 assertions in <code>scripts/tests.mjs</code> — all green. Scripts in <code>scripts/</code>; paper in <code>paper/index.html</code>.</li>
    </ul>
  </>;
}

// ====== Daily Psalms (JS port of gitlab.com/ch-zz/daily-psalms-api, /api/psalm) ======
// Default pipeline (calendar=gregorian, adjusted_sum=true, subharmonic=true):
//   name + date-in-words  ->  Latin/Hebrew gematria sum  ->  +sum/137.035999177 (ceil) adjustment
//   ->  ELS step (every Nth char) on Hebrew Genesis  ->  Hebrew gematria of the ELS string
//   ->  shortest Hebrew Psalms phrase with that gematria (subharmonic ÷2..÷128 fallback).
// calendar=jewish bypasses the ELS step and feeds the raw sum straight to the Psalm match
// (upstream behaviour). Data: web/data/genesis_els.json (the exact ELS source string, incl.
// maqafim) + web/data/psalms_he.json (Sefaria MT, 150 chapters). The phrase->gematria index is
// built in-browser on first use — no server, no .db (the upstream 418 MB SQLite index is
// rebuilt client-side from the reduced text), so it runs on a free static host.
const PSALM_ADJ = 137.035999177;
const SUBHARMONIC_DIVISORS = [1,2,4,8,16,32,64,128];

// Gematria map — verbatim copy of upstream gematria.py letter_to_value (Latin + Hebrew with
// final forms + Arabic + Greek + Katapayadi). Uppercase Latin is filled from lowercase below.
// NOTE: this is NOT the project's own GV (which uses regular, non-final Hebrew values); the
// psalms pipeline requires the upstream Mispar-Gadol finals (ך500 ם600 ן700 ף800 ץ900).
const PSALM_GEM = {
  a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:600,k:10,l:20,m:30,n:40,o:50,p:60,q:70,r:80,s:90,
  t:100,u:200,v:700,w:900,x:300,y:400,z:500,
  'ا':1,'أ':1,'إ':1,'آ':1,'ب':2,'ج':3,'د':4,'ه':5,'و':6,'ز':7,'ح':8,'ط':9,'ي':10,'ى':10,
  'ك':20,'ک':20,'ل':30,'م':40,'ن':50,'س':60,'ع':70,'ف':80,'ص':90,'ق':100,'ر':200,'ش':300,
  'ت':400,'ث':500,'خ':600,'ذ':700,'ض':800,'ظ':900,'غ':1000,'ٱ':1,'ـ':0,'ة':400,'ؤ':6,'ئ':10,
  'ء':1,'ٹ':400,'پ':2,'چ':3,'ژ':7,'گ':20,'ڭ':20,'ں':50,'ۀ':5,'ے':10,'؋':0,
  'א':1,'ב':2,'ג':3,'ד':4,'ה':5,'ו':6,'ז':7,'ח':8,'ט':9,'י':10,'כ':20,'ך':500,'ל':30,
  'מ':40,'ם':600,'נ':50,'ן':700,'ס':60,'ע':70,'פ':80,'ף':800,'צ':90,'ץ':900,'ק':100,'ר':200,'ש':300,'ת':400,
  'α':1,'β':2,'γ':3,'δ':4,'ε':5,'ϝ':6,'ζ':7,'η':8,'θ':9,'ι':10,'κ':20,'λ':30,'μ':40,'ν':50,
  'ξ':60,'ο':70,'π':80,'ϟ':90,'ρ':100,'σ':200,'τ':300,'υ':400,'φ':500,'χ':600,'ψ':700,'ω':800,'ϡ':900,
  'ς':200,'ϲ':200,
  'Α':1,'Β':2,'Γ':3,'Δ':4,'Ε':5,'Ϝ':6,'Ζ':7,'Η':8,'Θ':9,'Ι':10,'Κ':20,'Λ':30,'Μ':40,'Ν':50,
  'Ξ':60,'Ο':70,'Π':80,'Ϟ':90,'Ρ':100,'Σ':200,'Τ':300,'Υ':400,'Φ':500,'Χ':600,'Ψ':700,'Ω':800,'Ϡ':900,'Ϲ':200,
  'क':1,'ख':2,'ग':3,'घ':4,'ङ':5,'च':6,'छ':7,'ज':8,'झ':9,'ञ':0,'ट':1,'ठ':2,'ड':3,'ढ':4,'ण':5,
  'त':6,'थ':7,'द':8,'ध':9,'न':0,'प':1,'फ':2,'ब':3,'भ':4,'म':5,'य':1,'र':2,'ल':3,'व':4,'श':5,'ष':6,'स':7,'ह':8,
};
for(const _pk in PSALM_GEM){ if(_pk.length===1 && _pk>='a' && _pk<='z') PSALM_GEM[_pk.toUpperCase()]=PSALM_GEM[_pk]; }

function psalmStripDiacritics(text){
  // NFD then drop combining marks (Mn) + format chars (Cf) — mirrors unicodedata category filter.
  return String(text).normalize('NFD').replace(/[\p{Mn}\p{Cf}]/gu,'');
}
function psalmGematria(text){
  if(!text) return 0;
  let t=0; for(const c of text) t += PSALM_GEM[c]||0; return t;
}
function psalmGematriaSum(name, dateWords){
  const combined = `${name||''} ${dateWords||''}`;
  if(!combined.trim()) return null;
  const numbers = combined.match(/\d+/g) || [];
  const numberSum = numbers.reduce((a,n)=>a+parseInt(n,10),0);
  const textNoNums = combined.replace(/\d+/g,'');
  return psalmGematria(psalmStripDiacritics(textNoNums)) + numberSum;
}

// ---- date -> words (Gregorian) : port of utils.date_to_words, gregorian branch ----
const PSALM_ONES=['','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const PSALM_TENS=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
const PSALM_ORD_DAY=['','first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','eleventh','twelfth','thirteenth','fourteenth','fifteenth','sixteenth','seventeenth','eighteenth','nineteenth','twentieth','twenty-first','twenty-second','twenty-third','twenty-fourth','twenty-fifth','twenty-sixth','twenty-seventh','twenty-eighth','twenty-ninth','thirtieth','thirty-first'];
const PSALM_MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
const PSALM_HYPH_EXCL=new Set([30,40,50,60,70,80,90]);
function num2words(n){
  if(n===0) return 'zero';
  if(n<0) return 'minus '+num2words(-n);
  if(n<20) return PSALM_ONES[n];
  if(n<100){ const t=Math.floor(n/10),o=n%10; return o?PSALM_TENS[t]+'-'+PSALM_ONES[o]:PSALM_TENS[t]; }
  if(n<1000){ const h=Math.floor(n/100),r=n%100; return r?PSALM_ONES[h]+' hundred '+num2words(r):PSALM_ONES[h]+' hundred'; }
  if(n<1000000){ const th=Math.floor(n/1000),r=n%1000; return r?num2words(th)+' thousand '+num2words(r):num2words(th)+' thousand'; }
  return String(n);
}
function psalmYearWords(year){
  if(year>=1100 && year<=1999){
    const century=Math.floor(year/100), rem=year%100;
    let yw = num2words(century)+' hundred';
    if(rem!==0){
      let rw = num2words(rem);
      if(rem>=21 && rem<=99 && !PSALM_HYPH_EXCL.has(rem)){
        const tens=Math.floor(rem/10)*10, ones=rem%10;
        if(ones!==0) rw = num2words(tens)+'-'+num2words(ones);
      }
      yw += ' '+rw;
    }
    return yw;
  }
  let yw = num2words(year);
  if(year>2000){
    const rem=year%100;
    if(rem>=21 && rem<=99 && !PSALM_HYPH_EXCL.has(rem)){
      const base=year-rem, tens=Math.floor(rem/10)*10, ones=rem%10;
      if(ones!==0) yw = num2words(base)+' '+num2words(tens)+'-'+num2words(ones);
    }
  } else if(year<1100){
    const rem=year%100;
    if(rem>=21 && rem<=99 && !PSALM_HYPH_EXCL.has(rem)){
      const thousands=Math.floor(year/1000)*1000;
      if(thousands){
        const tens=Math.floor(rem/10)*10, ones=rem%10;
        if(ones!==0) yw = num2words(thousands)+' '+num2words(tens)+'-'+num2words(ones);
      }
    }
  }
  return yw;
}
function dateToWordsGregorian(dateStr){
  let s = dateStr||'';
  if(/^\d{4}-00-00$/.test(s)) s = s.slice(0,4);
  else if(/^\d{4}-\d{2}-00$/.test(s)) s = s.slice(0,7);
  let year=null, month=null, dayOrd=null, m;
  if((m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s))){ year=+m[1]; month=+m[2]; dayOrd=PSALM_ORD_DAY[+m[3]]||null; }
  else if((m=/^(\d{4})-(\d{2})$/.exec(s))){ year=+m[1]; month=+m[2]; }
  else if((m=/^(\d{4})$/.exec(s))){ year=+m[1]; }
  else return '';
  const parts=[];
  const monthName=(month>=1&&month<=12)?PSALM_MONTHS[month-1]:null;
  if(dayOrd && monthName) parts.push(dayOrd, monthName);
  else if(monthName) parts.push(monthName);
  if(year!=null) parts.push(psalmYearWords(year).replace(/,/g,''));
  return parts.join(' ');
}

// ---- date -> words (Jewish) : port of utils.hebrew_date_to_words ----
// The input string is interpreted AS a Hebrew-calendar date (this is the upstream behaviour:
// /api/psalm passes the raw date_str to hebrew_date_to_words without Gregorian->Hebrew
// conversion, so calendar=jewish expects a Hebrew date string).
const HEBREW_MONTH_NAMES=['ניסן','אייר','סיוון','תמוז','אב','אלול','תשרי','חשוון','כסלו','טבת','שבט','אדר'];
const HEBREW_LEAP_MONTH_NAMES={12:'אדר א',13:'אדר ב'};
function hebrewDayWord(day){
  const base={1:'ראשון',2:'שני',3:'שלישי',4:'רביעי',5:'חמישי',6:'שישי',7:'שביעי',8:'שמיני',9:'תשיעי',10:'עשירי'};
  if(day<=10) return base[day]||'';
  if(day<20){ const o={1:'אחד',2:'שנים',3:'שלושה',4:'ארבעה',5:'חמשה',6:'ששה',7:'שבעה',8:'שמונה',9:'תשעה'}; return o[day-10]+' עשר'; }
  const tens={20:'עשרים',30:'שלושים'};
  if(tens[day]) return tens[day];
  const o={1:'אחד',2:'שנים',3:'שלושה',4:'ארבעה',5:'חמשה',6:'ששה',7:'שבעה',8:'שמונה',9:'תשעה'};
  return o[day-20]+' ועשרים';
}
function hebrewYearWord(year){
  const parts=[];
  if(year>=1000){
    const th={1:'אלף',2:'אלפיים',3:'שלושת אלפים',4:'ארבעת אלפים',5:'חמשת אלפים',6:'ששת אלפים',7:'שבעת אלפים',8:'שמונת אלפים',9:'תשעת אלפים'};
    const t=Math.floor(year/1000); if(th[t]) parts.push(th[t]); year-=t*1000;
  }
  const hundreds={100:'מאה',200:'מאתיים',300:'שלוש מאות',400:'ארבע מאות',500:'חמש מאות',600:'שש מאות',700:'שבע מאות',800:'שמונה מאות',900:'תשע מאות'};
  if(year>=100){ const h=Math.floor(year/100)*100; if(hundreds[h]) parts.push(hundreds[h]); year-=h; }
  const ones={1:'אחת',2:'שתים',3:'שלוש',4:'ארבע',5:'חמש',6:'שש',7:'שבע',8:'שמונה',9:'תשע'};
  const tens={10:'עשר',20:'עשרים',30:'שלושים',40:'ארבעים',50:'חמישים',60:'שישים',70:'שבעים',80:'שמונים',90:'תשעים'};
  if(year===0) {}
  else if(ones[year]) parts.push(ones[year]);
  else if(tens[year]) parts.push(tens[year]);
  else { const t=Math.floor(year/10)*10, o=year-t; if(ones[o]&&tens[t]) parts.push(ones[o]+' ו'+tens[t]); }
  return parts.join(' ו');
}
function dateToWordsJewish(dateStr){
  let s=dateStr||'';
  if(/^\d{4}-00-00$/.test(s)) s=s.slice(0,4);
  else if(/^\d{4}-\d{2}-00$/.test(s)) s=s.slice(0,7);
  let m;
  if((m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s))){
    const year=+m[1],month=+m[2],day=+m[3];
    if(month<1||month>13||day<1||day>30) return '';
    const bd=hebrewDayWord(day);
    const dayWord = bd.includes(' ') ? 'ה'+bd.split(' ')[0]+' '+bd.split(' ').slice(1).join(' ') : 'ה'+bd;
    const monthName=HEBREW_LEAP_MONTH_NAMES[month]||HEBREW_MONTH_NAMES[month-1];
    if(!monthName) return '';
    return `${dayWord} ב${monthName} שנת ${hebrewYearWord(year)}`;
  }
  if((m=/^(\d{4})-(\d{2})$/.exec(s))){
    const year=+m[1],month=+m[2]; if(month<1||month>13) return '';
    const monthName=HEBREW_LEAP_MONTH_NAMES[month]||HEBREW_MONTH_NAMES[month-1]; if(!monthName) return '';
    return `${monthName} שנת ${hebrewYearWord(year)}`;
  }
  if((m=/^(\d{4})$/.exec(s))) return `שנת ${hebrewYearWord(+m[1])}`;
  return '';
}

// ---- ELS + Psalms phrase index (built in-browser) ----
function elsGenesis(elsText, step){
  if(step<1 || !elsText) return '';
  let out=''; for(let pos=0; pos<elsText.length; pos+=step) out+=elsText[pos];
  return out;
}
let _PSALMS_CACHE=null, _PSALMS_PROMISE=null;
function loadPsalmsData(){
  if(_PSALMS_CACHE) return Promise.resolve(_PSALMS_CACHE);
  if(_PSALMS_PROMISE) return _PSALMS_PROMISE;
  _PSALMS_PROMISE = Promise.all([
    fetch('data/genesis_els.json').then(r=>{ if(!r.ok) throw new Error('genesis_els.json HTTP '+r.status); return r.json(); }),
    fetch('data/psalms_he.json').then(r=>{ if(!r.ok) throw new Error('psalms_he.json HTTP '+r.status); return r.json(); }),
  ]).then(([gen,ps])=>{ _PSALMS_CACHE={elsText:gen.text, psalms:ps, idx:null}; return _PSALMS_CACHE; });
  return _PSALMS_PROMISE;
}
function buildPsalmsIndex(psalms){
  // enumerate every contiguous word-run per verse; keep the SHORTEST phrase per gematria sum
  // (upstream: ORDER BY LENGTH(words) ASC LIMIT 1 — first encountered wins on ties, which
  // approximates SQLite rowid / insertion order).
  const idx=new Map();
  psalms.chapters.forEach((verses,ci)=>{
    const chapter=ci+1;
    verses.forEach((v,vi)=>{
      const verse=vi+1;
      const words=v.split(/\s+/).filter(w=>w.length>0);
      for(let i=0;i<words.length;i++){
        let run=[], g=0;
        for(let j=i;j<words.length;j++){
          const w=words[j];
          for(const c of w) g += PSALM_GEM[c]||0;
          run.push(w);
          const phrase=run.join(' ');
          const len=phrase.length;
          const prev=idx.get(g);
          if(!prev || len<prev.len) idx.set(g,{words:phrase,chapter,verse,len});
        }
      }
    });
  });
  return idx;
}
function findPsalmMatch(idx, gsum, useSubharmonic){
  if(gsum==null || gsum<1) return {match:null,divisor:null,queried:null};
  if(useSubharmonic){
    const g=+gsum;
    for(const d of SUBHARMONIC_DIVISORS){
      const q=Math.floor(g/d);
      if(q<1) break;
      const m=idx.get(q);
      if(m) return {match:m,divisor:d,queried:q};
    }
    return {match:null,divisor:null,queried:null};
  }
  const m=idx.get(gsum);
  return m ? {match:m,divisor:1,queried:gsum} : {match:null,divisor:1,queried:gsum};
}
async function computePsalm(name, dateStr, {adjusted=true, calendar='gregorian', subharmonic=true}={}){
  const data = await loadPsalmsData();
  if(!data.idx) data.idx = buildPsalmsIndex(data.psalms);
  const dateWords = calendar==='jewish' ? dateToWordsJewish(dateStr) : dateToWordsGregorian(dateStr);
  let rawGsum = psalmGematriaSum(name, dateWords);
  if(rawGsum==null) return {error:'Could not calculate the gematria sum — a name and/or a date is needed.'};
  const isAdj = adjusted && calendar!=='jewish';
  let gsum = isAdj ? Math.ceil(rawGsum + rawGsum/PSALM_ADJ) : rawGsum;
  let elsText='', elsGsum=gsum, bypassed=false;
  if(calendar==='jewish'){
    bypassed=true; // ELS scan of Genesis is skipped; raw sum feeds the Psalm match directly.
  } else {
    elsText = elsGenesis(data.elsText, gsum);
    elsGsum = psalmGematria(elsText);
  }
  const {match, divisor, queried} = findPsalmMatch(data.idx, elsGsum, subharmonic);
  return {
    input:{ name, date:dateStr, date_words:dateWords, calendar, raw_gematria_sum:rawGsum,
      initial_gematria_sum:gsum, adjusted:isAdj },
    els_result:{ text:elsText, step:gsum, book:'Genesis', gematria_sum:elsGsum, bypassed },
    psalm: match ? { words:match.words, chapter:match.chapter, verse:match.verse,
      reference:`Psalms ${match.chapter}:${match.verse}`,
      url:`https://www.biblegateway.com/passage/?search=Psalms+${match.chapter}&version=CJB`,
      queried_gematria_sum:queried, original_gematria_sum:elsGsum, subharmonic_divisor:divisor }
      : { error:'No matching Psalm found for the ELS gematria (even after subharmonic fallback).',
          queried_gematria_sum:queried, original_gematria_sum:elsGsum, subharmonic_divisor:divisor }
  };
}

function PsalmsTab(){
  const today = (()=>{ try{ return new Date().toISOString().slice(0,10); }catch(e){ return '2026-08-10'; } })();
  const [name,setName]=useState('');
  const [date,setDate]=useState(today);
  const [calendar,setCalendar]=useState('gregorian');
  const [adjusted,setAdjusted]=useState(true);
  const [subharmonic,setSubharmonic]=useState(true);
  const [res,setRes]=useState(null);
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState(null);
  const [ready,setReady]=useState(false);
  const [showEls,setShowEls]=useState(false);
  useEffect(()=>{ loadPsalmsData().then(()=>setReady(true)).catch(e=>setErr('Data load failed: '+e.message)); },[]);
  async function run(){ setLoading(true); setErr(null); setShowEls(false);
    try{ setRes(await computePsalm(name, date, {adjusted, calendar, subharmonic})); }
    catch(e){ setErr(e.message); } setLoading(false);
  }
  const elsLong = res && res.els_result && res.els_result.text.length>400;
  return <>
    <h2>Daily Psalms — name &amp; date → Genesis ELS → Psalm</h2>
    <div className="muted" style={{marginBottom:10}}>A JavaScript port of the <i>daily-psalms-api</i> pipeline (<code>gitlab.com/ch-zz/daily-psalms-api</code>, route <code>/api/psalm</code>). The gematria of your <b>name + the date written out in words</b> sets an Equidistant-Letter-Sequence step over <b>Genesis</b>; the gematria of that ELS string is then matched to the <b>shortest Hebrew phrase in the Psalms</b> with the same value (falling back through octave sub-harmonics ÷2, ÷4 … ÷128). All data is bundled — the phrase index is built in your browser, so nothing depends on a server or a database upload.</div>

    <div className="controls" style={{marginBottom:10}}>
      <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Name (Latin / Hebrew / Greek / Arabic)" style={{flex:'1 1 260px'}}/>
      <input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{flex:'0 0 170px'}}/>
      <select value={calendar} onChange={e=>setCalendar(e.target.value)} style={{flex:'0 0 200px'}}>
        <option value="gregorian">Gregorian (ELS on Genesis)</option>
        <option value="jewish">Jewish (ELS bypassed)</option>
      </select>
    </div>
    <div className="controls" style={{marginBottom:12}}>
      <label style={{display:'inline-flex',gap:6,alignItems:'center',cursor:'pointer'}}><input type="checkbox" checked={adjusted} onChange={e=>setAdjusted(e.target.checked)}/> 137.036 adjustment</label>
      <label style={{display:'inline-flex',gap:6,alignItems:'center',cursor:'pointer'}}><input type="checkbox" checked={subharmonic} onChange={e=>setSubharmonic(e.target.checked)}/> subharmonic fallback (÷2…÷128)</label>
      <button onClick={run} disabled={!ready||loading} className="btn-cta">{loading?'Computing…':(ready?'Reveal Psalm →':'Loading data…')}</button>
      <span className="muted" style={{marginLeft:'auto'}}>{ready?'phrase index ready':'building phrase index…'}</span>
    </div>

    {err && <div className="note" style={{color:'var(--red)'}}>{err}</div>}
    {res && <>
      {res.error
        ? <div className="note" style={{color:'var(--red)'}}>{res.error}</div>
        : <>
      <h3>Input</h3>
      <table><tbody>
        <tr><th>name</th><td>{res.input.name||<span className="muted">—</span>}</td></tr>
        <tr><th>date</th><td>{res.input.date} <span className="muted">({res.input.calendar})</span></td></tr>
        <tr><th>date in words</th><td>{res.input.date_words ? (res.input.calendar==='jewish'? <span className="he" style={{direction:'rtl'}}>{res.input.date_words}</span> : res.input.date_words) : <span className="muted">—</span>}</td></tr>
        <tr><th>raw gematria sum</th><td className="big" style={{color:'var(--gold)'}}>{res.input.raw_gematria_sum}</td></tr>
        {res.input.adjusted && <tr><th>adjusted sum (+sum ÷ 137.035999177, ceiled)</th><td className="big" style={{color:'var(--gold)'}}>{res.input.initial_gematria_sum}</td></tr>}
      </tbody></table>

      <h3>ELS result — Genesis</h3>
      {res.els_result.bypassed
        ? <div className="note">Jewish calendar: the ELS scan of Genesis is bypassed and the raw gematria sum (<b>{res.els_result.gematria_sum}</b>) feeds the Psalm match directly (upstream behaviour).</div>
        : <>
          <table><tbody>
            <tr><th>step (every Nth letter)</th><td>{res.els_result.step}</td></tr>
            <tr><th>gematria of the ELS string</th><td className="big" style={{color:'var(--gold)'}}>{res.els_result.gematria_sum}</td></tr>
          </tbody></table>
          <div className="muted" style={{marginBottom:4}}>ELS string ({res.els_result.text.length} chars):</div>
          <div className="he" style={{direction:'rtl',fontSize:'1.1rem',lineHeight:1.8,wordBreak:'break-all',
              maxHeight:elsLong&&!showEls?'7.5em':null,overflow:elsLong&&!showEls?'hidden':null,marginBottom:6}}>{res.els_result.text||' '}</div>
          {elsLong && <div className="click muted" onClick={()=>setShowEls(!showEls)}>{showEls?'▲ collapse':'▼ expand full string'}</div>}
        </>}

      <h3>Psalm</h3>
      {res.psalm.error
        ? <div className="note" style={{color:'var(--red)'}}>{res.psalm.error}</div>
        : <>
          <div className="he" style={{direction:'rtl',fontSize:'1.6rem',lineHeight:1.7,marginBottom:8}}>{res.psalm.words}</div>
          <table><tbody>
            <tr><th>reference</th><td><b>{res.psalm.reference}</b> — <a href={res.psalm.url} target="_blank" rel="noopener noreferrer">BibleGateway (CJB)</a></td></tr>
            {res.psalm.subharmonic_divisor && res.psalm.subharmonic_divisor>1 && <tr><th>subharmonic divisor</th><td>÷{res.psalm.subharmonic_divisor} — the ELS gematria ÷ {res.psalm.subharmonic_divisor} = {res.psalm.queried_gematria_sum} matched</td></tr>}
            <tr><th>queried gematria</th><td>{res.psalm.queried_gematria_sum}</td></tr>
            <tr><th>ELS gematria (original)</th><td>{res.psalm.original_gematria_sum}</td></tr>
          </tbody></table>
        </>}
    </>}
    </>}
  </>;
}

// ====== App / Tabs ======
const TABS = [
  ['cycles','Cycles'],['sky','Sky Map'],['translator','Reader'],['reading','Reading'],['time','Time'],
  ['gematria','Gematria'],['sigils','Sigils'],['revelation','Revelations'],['psalms','Psalms'],['method','Methodology'],
];
const SUB = {
  reading:[['rule','Reading Rule'],['yhvh','YHVH'],['genesis','Genesis 1:1']],
  time:[['predictor','Predictor'],['ages','Ages']],
  sigils:[['sigil','Sigil Forge'],['kameot','Kameot'],['angels','72 Angels']],
  cycles:[['alignments','Alignments'],['saros','Saros'],['ayanamsa','Ayanamsa'],['lunarsolar','Lunar-Solar'],['week','Week']],
  revelation:[['hebrew','Hebrew · Christian'],['raziel','Raziel'],['gnostic','Gnostic / Nag Hammadi'],['vedic','Indian / Vedic'],['persian','Persian / Avestan'],['sufi','Islamic / Sufi'],['egyptian','Egyptian'],['maya','Maya'],['chinese','Chinese']],
};

function SubTabs({items, active, onChange}){
  return <div className="subtabs" role="tablist">
    {items.map(([id,label])=> <div key={id} role="tab" aria-selected={active===id} className={'subtab'+(active===id?' active':'')} onClick={()=>onChange(id)}>{label}</div>)}
  </div>;
}

function App(){
  const today='2026-08-08';
  const [active,setActive]=useState('cycles');
  const [sub,setSub]=useState({reading:'rule',time:'predictor',sigils:'sigil',cycles:'alignments',revelation:'hebrew'});
  const [lex,setLex]=useState(null);
  const [lexErr,setLexErr]=useState(null);
  const [angels,setAngels]=useState(null);
  const [date,setDate]=useState(today);
  const [genYear,setGenYear]=useState(2026);
  const [genData,setGenData]=useState(null);
  const [loading,setLoading]=useState(false);
  const [q,setQ]=useState('');

  useEffect(()=>{ fetch('lexicon.json').then(r=>{ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); }).then(setLex).catch(e=>setLexErr(e.message)); },[]);
  useEffect(()=>{ fetch('angels72.json').then(r=>{ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); }).then(setAngels).catch(()=>{}); },[]);

  // effDate: when the date input is cleared (or invalid), keep computing against the
  // reference date so the page never goes blank. The raw `date` still drives the input
  // so the user's clear action is respected visually.
  const effDate = useMemo(()=>{ if(!date) return today; return parseDate(date) ? date : today; },[date]);
  const rows=useMemo(()=>skyAt(effDate),[effDate]);
  const occ=useMemo(()=>occupiedLetters(rows),[rows]);
  const occSigns=useMemo(()=>new Set(rows.map(r=>r.sign)),[rows]);
  const bs=useMemo(()=>bySign(rows),[rows]);
  const yhvhOk=occ.has('י')&&occ.has('ה')&&occ.has('ו');
  const genesisOk=genesisReadable(occ);
  const ANGEL72=useMemo(()=>{ const m=new Map(); if(angels) angels.triplets.forEach((t,i)=>{ m.set(norm(t), {el:angels.angelsEL[i], yh:angels.angelsYH[i]}); }); return m; },[angels]);
  const words=useMemo(()=> lex?readableWords(occ,lex.lexicon,ANGEL72):[],[occ,lex,ANGEL72]);
  const sentence=rows.map(r=>SIMPLE[r.sign][0]).join(' ');
  const year = (()=>{ const d=parseDate(effDate); return d ? d.getUTCFullYear() : 2026; })();

  function scanYear(y){
    setLoading(true);
    setTimeout(()=>{
      const days=[], dayOccs=[];
      const nDays=(y%4===0&&(y%100!==0||y%400===0))?366:365;
      for(let i=0;i<nDays;i++){
        const ds=fmtDate(makeDate(y,1,1+i));
        const o=occupiedLetters(skyAt(ds));
        dayOccs.push(o);
        if(genesisReadable(o)) days.push(ds);
      }
      setGenData({year:y,days:new Set(days),list:days,dayOccs}); setLoading(false);
    },20);
  }
  useEffect(()=>{ if(lex) scanYear(genYear); },[genYear,lex]);
  function step(n){ const d=parseDate(effDate); if(!d) return; d.setUTCDate(d.getUTCDate()+n); setDate(fmtDate(d)); }
  function stepYear(n){ setGenYear(genYear+n); }

  if(lexErr) return <div className="panel"><h2>Error</h2><p>Could not load lexicon.json ({lexErr}). Serve the <code>web/</code> folder over HTTP (<code>python3 -m http.server 8008</code>) and open <code>http://127.0.0.1:8008/</code>.</p></div>;
  if(!lex) return <div className="panel"><h2>Loading lexicon…</h2><p>Reading lexicon.json (6045 consonantal roots).</p></div>;

  const setSubTab = (g)=>(id)=>setSub(s=>({...s,[g]:id}));

  return (
    <div>
      <div className="tabs" role="tablist">
        {TABS.map(([id,label])=> <div key={id} role="tab" aria-selected={active===id} className={'tab'+(active===id?' active':'')} onClick={()=>setActive(id)}>{label}</div>)}
      </div>

      <section className="panel">
        {active==='sky' && <SkyTab date={effDate} rawDate={date} setDate={setDate} rows={rows} occ={occ} occSigns={occSigns} yhvhOk={yhvhOk} genesisOk={genesisOk} bs={bs} sentence={sentence} step={step}/>}
        {active==='translator' && <TranslatorTab date={effDate} occ={occ} words={words} q={q} setQ={setQ} genData={genData}/>}

        {active==='reading' && <>
          <SubTabs items={SUB.reading} active={sub.reading} onChange={setSubTab('reading')}/>
          {sub.reading==='rule' && <RuleTab occ={occ}/>}
          {sub.reading==='yhvh' && <YhvhTab date={effDate} occ={occ} yhvhOk={yhvhOk} bs={bs}/>}
          {sub.reading==='genesis' && <GenesisTab date={effDate} occ={occ} genesisOk={genesisOk}/>}
        </>}

        {active==='time' && <>
          <SubTabs items={SUB.time} active={sub.time} onChange={setSubTab('time')}/>
          {sub.time==='predictor' && <PredictorTab date={effDate} setDate={setDate} genYear={genYear} setGenYear={setGenYear} genData={genData} loading={loading} scanYear={scanYear} year={year} stepYear={stepYear}/>}
          {sub.time==='ages' && <AgesTab date={effDate} rows={rows}/>}
        </>}

        {active==='gematria' && <GematriaTab/>}

        {active==='sigils' && <>
          <SubTabs items={SUB.sigils} active={sub.sigils} onChange={setSubTab('sigils')}/>
          {sub.sigils==='sigil' && <SigilTab/>}
          {sub.sigils==='kameot' && <KameotTab/>}
          {sub.sigils==='angels' && <AngelsTab/>}
        </>}

        {active==='cycles' && <>
          <SubTabs items={SUB.cycles} active={sub.cycles} onChange={setSubTab('cycles')}/>
          {sub.cycles==='saros' && <SarosTab/>}
          {sub.cycles==='ayanamsa' && <AyanamsaTab/>}
          {sub.cycles==='lunarsolar' && <LunarSolarTab/>}
          {sub.cycles==='alignments' && <AlignmentsTab/>}
          {sub.cycles==='week' && <WeekTab date={effDate} rows={rows}/>}
        </>}

        {active==='revelation' && <RevelationsTab sub={sub.revelation} setSubTab={setSubTab('revelation')} date={effDate} rows={rows} occ={occ} words={words} genData={genData} genYear={genYear}/>}
        {active==='psalms' && <PsalmsTab/>}
        {active==='method' && <MethodTab esGlossCount={Object.keys(lex.esGloss||{}).length}/>}
      </section>

      <div className="note" style={{textAlign:'center',marginTop:14}}>
        Positions: <a href="https://github.com/cosinekitty/astronomy-engine" target="_blank" rel="noreferrer">astronomy-engine</a> · frame: <a href="https://en.wikipedia.org/wiki/Sefer_Yetirah" target="_blank" rel="noreferrer">Sefer Yetzirah</a> · lexicon: <a href="https://github.com/openscriptures/HebrewLexicon" target="_blank" rel="noreferrer">Strong (OpenScriptures)</a>
      </div>
    </div>
  );
}

if(typeof document!=='undefined'){
  const root=document.getElementById('root');
  createRoot(root).render(<App/>);
}
export { App, Heptagram, SarosDiagram, PrecessionDiagram, MetonDiagram, DateEntry, YearInput, parseDate, fmtDate, makeDate, GematriaTab, RevelationHebrewTab, RevelationVedicTab, RevelationPersianTab, RevelationSufiTab, RevelationGnosticTab, RevelationRazielTab, isopsephy, abjad, katapayadi, PsalmsTab, computePsalm, psalmGematria, dateToWordsGregorian };