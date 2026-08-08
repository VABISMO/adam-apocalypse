import React, { useState, useMemo, useEffect } from 'react';
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
        angel: am ? {el:am.el, yh:am.yh} : null});
    }
  }
  res.sort((a,b)=> b.len-a.len || a.gem-b.gem || (a.he<b.he?-1:1));
  return res;
}

function skyAt(dateStr){
  const d = new Date(dateStr + 'T12:00:00Z');
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
const FINALS = {'ך':500,'ם':600,'ן':700,'ף':800,'ץ':900};
function letterVal(ch){ return FINALS[ch] ?? GV[ch]; }
function reduce9(v){ let s=v; while(s>9) s=String(s).split('').reduce((a,d)=>a+ +d,0); return s===0?9:s; }
const LO_SHU=[[4,9,2],[3,5,7],[8,1,6]];
const LO_POS={}; for(let i=0;i<3;i++)for(let j=0;j<3;j++) LO_POS[LO_SHU[i][j]]=[i,j];
function sigilPath(name){
  const letters=[...norm(name)].filter(ch=>GV[ch]||FINALS[ch]);
  const reduced=letters.map(ch=>reduce9(letterVal(ch)));
  const cells=[];
  for(const r of reduced){ if(!cells.length || cells[cells.length-1].v!==r) cells.push({v:r}); }
  return { letters, reduced, cells, cellsUsed:[...new Set(reduced)] };
}
function aiqGroups(){
  const g={1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[]};
  const all='אבגדהוזחטיכלמנסעפצקרשתךםןףץ';
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

// ====== subset multiples of 37 (Gen 1:1 structure) ======
function countSubset(arr,div){ let cnt=0; const n=arr.length;
  for(let mask=1;mask<(1<<n);mask++){ let s=0; for(let i=0;i<n;i++) if(mask&(1<<i)) s+=arr[i]; if(s%div===0) cnt++; } return cnt; }

// ====== SkyMap ======
function SkyMap({rows, occ, yhvhOk, genesisOk}){
  const C=220, R=196, Rp=120;
  const pt=(lon,r)=>{const a=lon*Math.PI/180;return [C+r*Math.sin(a), C-r*Math.cos(a)];};
  const MOTHER_LON=[['א','Draco',268],['מ','Ursa Minor',89],['ש','Cassiopea',38]];
  const signCount={}; rows.forEach(r=>{signCount[r.sign]=(signCount[r.sign]||0)+1;});
  const yod = rows.find(r=>r.sign==='Virgo');
  const heh = rows.find(r=>r.sign==='Aries');
  const vav = rows.find(r=>r.sign==='Taurus');
  const order=[];
  if(yod) order.push({r:yod,l:'י'});
  if(heh) order.push({r:heh,l:'ה'});
  if(vav) order.push({r:vav,l:'ו'});
  if(heh) order.push({r:heh,l:'ה'});
  const contrib=new Set(order.map(o=>o.r.body));
  const pathStr = order.map((o,i)=>{const [x,y]=pt(o.r.lon,Rp);return (i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1);}).join(' ');
  return (
    <svg viewBox="0 0 440 440" width="340" height="340" style={{maxWidth:'100%'}} role="img" aria-label={`Sky map: ${occ.size} signs occupied; YHVH ${yhvhOk?'readable':'not readable'}; Genesis ${genesisOk?'readable':'not readable'}`}>
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
      {order.length>=2 && <path d={pathStr} fill="none" stroke="#e8c87a" strokeWidth="2.4" strokeDasharray={yhvhOk?'none':'5 4'} opacity="0.9" strokeLinejoin="round"/>}
      {rows.map(r=>{
        const [px,py]=pt(r.lon,Rp);
        if(contrib.has(r.body)){
          return <g key={r.body}>
            <circle cx={px} cy={py} r="12" fill="#e8c87a" stroke="#fff3d0" strokeWidth="1"/>
            <text x={px} y={py} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="#0b0e14" fontWeight="bold">{order.find(o=>o.r.body===r.body).l}</text>
          </g>;
        }
        return <g key={r.body}>
          <circle cx={px} cy={py} r="8.5" fill="#131826" stroke="#7fb0ff" strokeWidth="1.2"/>
          <text x={px} y={py} textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#7fb0ff">{GLYPH[r.body]}</text>
          {r.boundary && <circle cx={px} cy={py} r="11.5" fill="none" stroke="#ffcf6a" strokeWidth="1" strokeDasharray="2 2" opacity="0.8"/>}
        </g>;
      })}
      <text x={C} y={16} textAnchor="middle" fontSize="11" fill={yhvhOk?'#e8c87a':'#ff8a8a'}>יהוה {yhvhOk?'✓':'✗'}</text>
      <text x={C} y={30} textAnchor="middle" fontSize="9.5" fill={genesisOk?'#6fe0a0':'#ff8a8a'}>Genesis {genesisOk?'✓':'✗'}</text>
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
function SigilSVG({name}){
  const { cells } = sigilPath(name);
  if(cells.length<2) return <div className="muted">Enter a name with at least 2 Hebrew consonants.</div>;
  const S=150, pad=18, cell=(S-2*pad)/3;
  const center=(v)=>{ const [i,j]=LO_POS[v]; return [pad+cell*(j+0.5), pad+cell*(i+0.5)]; };
  const d = cells.map((c,i)=>{ const [x,y]=center(c.v); return (i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1); }).join(' ');
  const used=new Set(cells.map(c=>c.v));
  return (
    <svg viewBox={`0 0 ${S} ${S}`} width={S} height={S} role="img" aria-label={`Sigil of ${name}`}>
      <rect x="0" y="0" width={S} height={S} fill="#0e1320" rx="8"/>
      {LO_SHU.flat().map((v,idx)=>{ const [i,j]=Object.entries(LO_POS).find(([k])=>+k===v)[1]; const cx=pad+cell*(j+0.5), cy=pad+cell*(i+0.5);
        return <g key={idx}>
          <rect x={pad+cell*j+2} y={pad+cell*i+2} width={cell-4} height={cell-4} rx="4" fill={used.has(v)?'#243657':'#131826'} stroke="#283145" strokeWidth="1"/>
          <text x={cx} y={cy-4} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill={used.has(v)?'#e8c87a':'#5d6883'}>{v}</text>
          {used.has(v) && <text x={cx} y={cy+8} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="#8aa0c0">{cells.findIndex(c=>c.v===v)+1}</text>}
        </g>; })}
      <path d={d} fill="none" stroke="#e8c87a" strokeWidth="2.2" opacity="0.9" strokeLinejoin="round" strokeLinecap="round"/>
      {cells.map((c,i)=>{ const [x,y]=center(c.v); return <circle key={i} cx={x} cy={y} r={i===0||i===cells.length-1?4:2.6} fill={i===0?'#6fe0a0':i===cells.length-1?'#ff8a8a':'#e8c87a'}/>; })}
    </svg>
  );
}

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

function SkyTab({date, setDate, rows, occ, occSigns, yhvhOk, genesisOk, bs, sentence, step}){
  return <>
    <div className="controls" style={{marginBottom:12}}>
      <button onClick={()=>step(-1)}>◀ day</button>
      <input type="date" value={date} onChange={e=>setDate(e.target.value)} aria-label="Date"/>
      <button onClick={()=>step(1)}>day ▶</button>
      <button onClick={()=>step(7)}>+ week</button>
      <button onClick={()=>setDate('2026-08-08')}>today</button>
      <span className="muted">noon UT · geocentric apparent positions · ecliptic longitude</span>
    </div>
    <div className="row">
      <div style={{flex:'0 0 auto'}}><SkyMap rows={rows} occ={occ} yhvhOk={yhvhOk} genesisOk={genesisOk}/></div>
      <div style={{flex:'1 1 240px'}}>
        <div className="muted">The wheel is the ecliptic: 12 signs, each with its simple letter. A sector <b>lights up</b> when a planet is inside it — that is the simple read today. “×N” = N planets in that sign (informational; the reuse rule needs no conjunction to repeat a letter). ⚠ = planet within &lt;1° of a boundary.</div>
        <div className="note">Today: <b>{occSigns.size}</b> signs occupied, <b>{12-occSigns.size}</b> empty. Readable simples: <b style={{color:'var(--gold)'}}>{[...occ].sort().join(' ')}</b>.</div>
        <div className="note"><span className="he">יהוה</span> (with reuse) forms from just 3 signs: <b>י</b>(Virgo)+<b>ה</b>(Aries)+<b>ו</b>(Taurus). The second <b>ה</b> reuses Aries. Gold line: י→ה→ו→ה.</div>
        <div className="note">At the <b>centre</b>, the 3 mothers <span className="he">א מ ש</span>: a fixed circumpolar axis, each <b>opposite its constellation</b> (Draco, Ursa Minor, Cassiopea), linked to its zodiac sector.</div>
      </div>
    </div>
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
  </>;
}

const PAGE_SIZE = 48;
function TranslatorTab({date, occ, words, q, setQ}){
  const [page,setPage] = useState(0);
  const [onlyDate,setOnlyDate] = useState(true);
  const [pal,setPal] = useState(false);
  const [g37,setG37] = useState(false);
  const [angel,setAngel] = useState(false);
  const [name,setName] = useState(false);
  const [minLen,setMinLen] = useState(1);
  const qn = q.trim().toLowerCase();
  const filtered = useMemo(()=>{
    let r = words;
    if(qn) r = r.filter(w => (w.gloss||'').toLowerCase().includes(qn) || w.translit.toLowerCase().includes(qn) || w.disp.includes(q.trim()));
    if(onlyDate) r = r.filter(w=>w.simp);
    if(pal) r = r.filter(w=>w.pal);
    if(g37) r = r.filter(w=>w.m37);
    if(angel) r = r.filter(w=>w.angel);
    if(name) r = r.filter(w=>w.name);
    if(minLen>1) r = r.filter(w=>w.len>=minLen);
    return r;
  }, [words, qn, onlyDate, pal, g37, angel, name, minLen]);
  useEffect(()=>{ setPage(0); }, [qn, date, onlyDate, pal, g37, angel, name, minLen]);
  const alwaysCount = useMemo(()=>words.filter(w=>!w.simp).length, [words]);
  const palCount = useMemo(()=>words.filter(w=>w.pal).length, [words]);
  const g37Count = useMemo(()=>words.filter(w=>w.m37).length, [words]);
  const angelCount = useMemo(()=>words.filter(w=>w.angel).length, [words]);
  const nameCount = useMemo(()=>words.filter(w=>w.name).length, [words]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const cur = Math.min(page, pages-1);
  const slice = filtered.slice(cur*PAGE_SIZE, cur*PAGE_SIZE + PAGE_SIZE);
  return <>
    <h2>Reader — everything readable on {date} <span className="pill">{words.length} words</span></h2>
    <div className="controls" style={{marginBottom:8}}>
      <input type="text" placeholder="search by gloss or transliteration…" value={q} onChange={e=>setQ(e.target.value)} style={{flex:'1 1 240px'}} autoFocus aria-label="Search readable words"/>
    </div>
    <div className="controls" style={{marginBottom:8, flexWrap:'wrap'}}>
      <button className={onlyDate?'on':''} onClick={()=>setOnlyDate(v=>!v)} title="Hide words with no zodiac simples — they read every day and carry no date signal">only date-specific</button>
      <button className={pal?'on':''} onClick={()=>setPal(v=>!v)} title="Consonant palindrome (reads the same backwards)">palindrome ({palCount})</button>
      <button className={g37?'on':''} onClick={()=>setG37(v=>!v)} title="Gematria is a multiple of 37">gematria × 37 ({g37Count})</button>
      <button className={angel?'on':''} onClick={()=>setAngel(v=>!v)} title="The word + suffix אל / יה is one of the 72 Shem HaMephorash angel names (Exodus 14:19-21)">angel +אל/+יה ({angelCount})</button>
      <button className={name?'on':''} onClick={()=>setName(v=>!v)} title="The word is a proper noun (name) in the Strong lexicon — incl. theophoric names bearing אל / יה">name (proper) ({nameCount})</button>
      <span className="muted">min length</span>
      <input type="number" min="1" max="12" value={minLen} onChange={e=>{const n=parseInt(e.target.value,10); setMinLen(isNaN(n)||n<1?1:n);}} style={{width:56}} aria-label="Minimum word length"/>
      <span className="muted">{filtered.length} shown · {alwaysCount} always-readable hidden{onlyDate?'':' (shown)'}</span>
    </div>
    <div className="muted" style={{marginBottom:8}}>
      Reading rule applied: every <b>simple (zodiac) letter</b> in a word must sit in an <b>occupied sign</b> today. Mothers + doubles are always available. Available today: <b style={{color:'var(--gold)'}}>{[...occ].sort().join(' ')||'none'}</b>. <span style={{color:'var(--violet)'}}>violet</span> = always readable (no simples). Badges: <span style={{color:'var(--gold)'}}>palindrome</span> · <span style={{color:'var(--green)'}}>×37</span> · <span style={{color:'var(--violet)'}}>angel</span> · <span style={{color:'var(--blue)'}}>name</span>. Sorted: longest first.
    </div>
    <div className="tcards">
      {slice.map((w,i)=>(
        <div key={w.he+w.translit+i} className={'tcard'+(w.simp?'':' always')}>
          <div className="the">{w.disp}</div>
          <div className="read">{w.translit}</div>
          <div className="trans">{w.gloss}</div>
          <div className="g">{w.len} letters · gematria {w.gem}{w.pal && <span style={{color:'var(--gold)'}}> · palindrome</span>}{w.m37 && <span style={{color:'var(--green)'}}> · ×37</span>}{w.angel && <span style={{color:'var(--violet)'}}> · angel</span>}{w.name && <span style={{color:'var(--blue)'}}> · name{w.theo?' (theophoric)':''}</span>}</div>
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
    <Fig n={4} doc="From the article (§4): the cadence of יהוה. The golden line traces י→ה→ו→ה over Virgo-Aries-Taurus-Aries, occupied by fast planets (a date on which יהוה is legible). Without Aquarius (צ) in the set it is not Genesis — the cadence is monthly, not secular."/>
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
  return <>
    <h2>Predictor — days with readable Genesis in {genYear} {loading && <span className="pill">computing…</span>}</h2>
    <div className="controls" style={{marginBottom:10}}>
      <button onClick={()=>stepYear(-1)}>◀ {genYear-1}</button>
      <span className="pill">{genYear}</span>
      <button onClick={()=>stepYear(1)}>{genYear+1} ▶</button>
      <button onClick={()=>setGenYear(year)}>this year</button>
    </div>
    {genData && <>
      <div className="muted">Total: <b style={{color:'var(--gold)'}}>{genData.list.length}</b> days in {genYear}. Gold = readable Genesis; green outline = chosen date ({date}).</div>
      <div className="tl" style={{marginTop:10}} role="img" aria-label={`Calendar ${genYear}: ${genData.list.length} readable days`}>
        {Array.from({length: genYear%4===0&&(genYear%100!==0||genYear%400===0)?366:365},(_,i)=>{
          const ds=new Date(Date.UTC(genYear,0,1+i,12)).toISOString().slice(0,10);
          return <div key={i} className={'d'+(genData.days.has(ds)?' on':'')+(ds===date?' cur':'')} title={ds+(genData.days.has(ds)?' · Genesis':'')+(ds===date?' · date':'')}></div>;
        })}
      </div>
      <div style={{marginTop:10}}>
        <span className="muted">Readable dates in {genYear}: </span>
        {genData.list.length===0 ? <span className="muted">none this year.</span> : genData.list.map(d=> <span key={d} className="key on click" onClick={()=>setDate(d)}>{d}</span>)}
      </div>
      <div className="legend">Move years with ◀ ▶ to see the 2028–2029 cluster (Pluto settled in Aquarius, Neptune in Aries).</div>
    </>}
  </>;
}

function WeekTab({date, rows}){
  return <>
    <h2>The week — 7 doubles = 7 planets = 7 days · where each is on {date}</h2>
    <div className="week">
      {WEEK.map(([day,plan],idx)=>{
        const r=rows.find(x=>x.body===plan);
        const isToday = idx===new Date(date+'T12:00:00Z').getUTCDay();
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
  const [inp,setInp]=useState('משיח');
  const c=norm(inp);
  const letters=[...c].filter(ch=>GV[ch]||FINALS[ch]);
  const total=letters.reduce((a,ch)=>a+letterVal(ch),0);
  const groups=aiqGroups();
  return <>
    <h2>Gematria &amp; Aiq Bekar (§2, §15b.2)</h2>
    <div className="controls" style={{marginBottom:10}}>
      <input type="text" value={inp} onChange={e=>setInp(e.target.value)} placeholder="Hebrew name, e.g. משיח / אברהם" style={{flex:'1 1 260px'}}/>
      <span className="pill">letters: {letters.length}</span>
    </div>
    {letters.length>0 && <>
      <table>
        <thead><tr><th>Letter</th><th>Name</th><th>Value</th><th>Aiq Bekar (1–9)</th></tr></thead>
        <tbody>
        {letters.map((ch,i)=>{
          const name=Object.entries({...Object.fromEntries(Object.entries(GV)),...{'ך':'Kaph-final','ם':'Mem-final','ן':'Nun-final','ף':'Pe-final','ץ':'Tzaddi-final'}});
          return <tr key={i}><td className="letter-cell"><span className="he">{displayHe(c).includes(ch)?ch:ch}</span></td>
            <td className="muted">{ch}</td>
            <td className="big">{letterVal(ch)}</td>
            <td className="big" style={{color:'var(--blue)'}}>{reduce9(letterVal(ch))}</td></tr>;
        })}
        </tbody>
      </table>
      <div style={{marginTop:10,padding:'12px 14px',background:'var(--panel2)',borderRadius:8}}>
        <span className="muted">Standard gematria: </span><b className="big">{total}</b>
        <span className="muted"> · Aiq Bekar reduction: </span><b className="big" style={{color:'var(--blue)'}}>{reduce9(total)===0?9:reduce9(total)}</b>
      </div>
    </>}
    <h3>Aiq Bekar = the decimal-positional gematria of §2</h3>
    <div className="muted" style={{marginBottom:8}}>Each letter reduces (sum of digits) to 1–9. The 9 groups are exactly the decimal grid {`{1,10,100},{2,20,200},…,{9,90,900}`} — the 9 = 9+9+9 structure of §2. Without this reduction there is no sigil (§15b.3): it is the bridge §2 → kamea → trace.</div>
    <div className="grid2">
      {[1,2,3,4,5,6,7,8,9].map(g=> <div key={g} className="kbox"><b style={{color:'var(--gold)'}}>{g}</b> · {groups[g].join(', ')}</div>)}
    </div>
    <div className="note">Try: <span className="key click" onClick={()=>setInp('אברהם')}>אברהם</span> <span className="key click" onClick={()=>setInp('שלמה')}>שלמה</span> <span className="key click" onClick={()=>setInp('אלהים')}>אלהים</span> <span className="key click" onClick={()=>setInp('אבדון')}>אבדון</span> (Abaddon = 63 = 7×9).</div>
  </>;
}

function SigilTab(){
  const [inp,setInp]=useState('משיח');
  const sp=sigilPath(inp);
  return <>
    <h2>Sigil Forge — name → Aiq Bekar → Lo Shu trace (§15b.3)</h2>
    <div className="muted" style={{marginBottom:10}}>The traditional kamea-sigil method: (1) take the name (consonants); (2) reduce each letter to 1–9 by Aiq Bekar; (3) on Saturn's kamea (the Lo Shu 3×3) mark the reduced cells in order and join them — the trace <b>is</b> the sigil; (4) consecutive repeats collapse (the pen does not lift). <span style={{color:'var(--green)'}}>Green</span> = first cell, <span style={{color:'var(--red)'}}>red</span> = last.</div>
    <div className="controls" style={{marginBottom:12}}>
      <input type="text" value={inp} onChange={e=>setInp(e.target.value)} placeholder="Hebrew name, e.g. משיח" style={{flex:'1 1 260px'}}/>
      <span className="pill">cells used: {sp.cellsUsed.length}/9</span>
    </div>
    <div className="sigil-grid" style={{display:'flex',gap:24,flexWrap:'wrap',alignItems:'flex-start'}}>
      <SigilSVG name={inp}/>
      <div style={{flex:'1 1 220px'}}>
        <div className="muted">Letters: <b style={{color:'var(--gold)'}}>{sp.letters.map(displayHe).join(' ')}</b></div>
        <div className="muted">Values: {sp.letters.map(ch=>letterVal(ch)).join(', ')}</div>
        <div className="muted">Aiq Bekar (1–9): <b style={{color:'var(--blue)'}}>{sp.reduced.join('  ')}</b></div>
        <div className="muted">Trace (consecutive repeats collapsed):</div>
        <div className="big" style={{color:'var(--gold)'}}>{sp.cells.map(c=>c.v).join(' → ') || '—'}</div>
        <div className="note">The sigil is the geometric footprint of the name on the decimal grid (Aiq Bekar). It is deterministic and reproducible from the name alone. <em>Caveat (§6.3 / §15b.3):</em> the sigil-over-kamea method is Renaissance (Agrippa, 1531), not medieval Jewish.</div>
        <div className="note">Try: <span className="key click" onClick={()=>setInp('אדם')}>אדם</span> <span className="key click" onClick={()=>setInp('משה')}>משה</span> <span className="key click" onClick={()=>setInp('ישראל')}>ישראל</span> <span className="key click" onClick={()=>setInp('והו')}>והו</span> (1st Shem HaMephorash angel).</div>
      </div>
    </div>
    <Fig n={7} doc="From the article (§15b.3): the Lo Shu (Saturn 3×3, M=15) with the 9 Aiq Bekar groups overlaid — each cell gathers the letters whose gematria digit-sums to it. The golden trace is the sigil of משיח (Messiah): Aiq Bekar 4·3·1·8, the reduced cells joined in order. Aiq Bekar = the digit-sum of the decimal-positional gematria of §2 — the bridge from alphabet to sigil."/>
  </>;
}

function KameaSigil({ n, word }){
  const sq = buildMagic(n);
  const N = n*n;
  const pos = {}; for(let i=0;i<n;i++) for(let j=0;j<n;j++) pos[sq[i][j]]=[i,j];
  const isHeb = /[א-ת]/.test(word);
  let entries;
  if(isHeb){
    entries = [...norm(word)].filter(ch=>GV[ch]||FINALS[ch]).map(ch=>({l:displayHe(ch), v:letterVal(ch)}));
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
    <div style={{marginTop:8, minWidth:200}}>
      <div className="muted">{isHeb?'Hebrew gematria (finals included)':'Latin A=1…Z=26'} → reduced into the square (n²={N}){n===3?' — for Saturn n²=9 this is the digital root = the Aiq Bekar method of §15b.3':''}.</div>
      {entries.length===0
        ? <div className="note">Type a word to trace its sigil on this kamea.</div>
        : <table style={{marginTop:6}}>
            <thead><tr><th>Letter</th><th>Value</th><th>Cell</th></tr></thead>
            <tbody>{entries.map((e,i)=><tr key={i}><td><span className={isHeb?'he':'gk'} style={{fontSize:'1.2rem'}}>{e.l}</span></td><td className="deg">{e.v}</td><td className="deg">{targets[i]}</td></tr>)}</tbody>
          </table>}
      <div className="muted" style={{marginTop:6}}>Trace ({path.length} pts, repeats collapsed): <b style={{color:'var(--gold)'}}>{path.join(' → ')||'—'}</b> · cells {used.size}/{N}</div>
    </div>
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
        <div className="note">How the trace is built: letters of the word → gematria value (Hebrew, finals included; or A=1…Z=26 for Latin) → reduce each value into the square's range (1…n²) by ((value−1) mod n²)+1 → mark those cells in order → join them. For <b>Saturn</b> (n²=9) this reduces to the digital root — exactly the Aiq Bekar → Lo Shu method verified in §15b.3 and used in the Sigil Forge tab.</div>
        <div className="note">Try: <span className="key click" onClick={()=>setWord('יהוה')}>יהוה</span> <span className="key click" onClick={()=>setWord('משיח')}>משיח</span> <span className="key click" onClick={()=>setWord('אדם')}>אדם</span> <span className="key click" onClick={()=>setWord('MICHAEL')}>MICHAEL</span> <span className="key click" onClick={()=>setWord('RAPHAEL')}>RAPHAEL</span> — then switch planet.</div>
        <div className="note"><em>Caveat (§6.3 / §15b.3):</em> the sigil-over-kamea method is Renaissance (Agrippa, 1531), not medieval Jewish. The English A=1…Z=26 mapping is a modern Latin gematria, not traditional.</div>
      </div>
    </div>
    <h3>All 7 kameot (reference)</h3>
    <div className="grid2">
      {KAMEOT.map(([planet,n,dbl])=>{
        const M=n*(n*n+1)/2, total=n*n*M;
        const sq=buildMagic(n); const ok=isMagic(sq);
        return <div key={planet} className="kbox">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
            <b>{GLYPH[planet]} {planet}</b>
            <span className="muted">{n}×{n} · double <span className="he" style={{fontSize:'1.1rem'}}>{dbl}</span></span>
          </div>
          <KameaGrid n={n}/>
          <div className="muted" style={{marginTop:6}}>constant <b style={{color:'var(--gold)'}}>{M}</b> · sum <b>{total}</b> · magic {ok?'✓':'✗'}</div>
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
    <Fig n={8} doc="From the article (§15b.4): the three columns of Exodus 14:19-21 read in parallel — v19 downward, v20 upward (inverted, as tradition requires), v21 downward — so row i yields trio[i]. 72 × 3 = 216 = 6³ consonants → 72 triplets (Shem HaMephorash). The first trios והו (Vehuiah), ילי (Jeliel), סיט (Sitael)… are verified against the canonical list."/>
  </>;
}

function SarosTab(){
  const [yr,setYr]=useState(2026);
  const [list,setList]=useState(null);
  const [busy,setBusy]=useState(false);
  function scan(y){
    setBusy(true);
    setTimeout(()=>{
      const out=[]; let cur=new Date(Date.UTC(y,0,1,12));
      const endMs=Date.UTC(y+1,0,1,12); let guard=0;
      while(cur.getTime()<endMs && guard++<40){
        const t=Astronomy.SearchMoonPhase(0, cur, 40);
        if(!t) break;
        const lat=Astronomy.EclipticGeoMoon(t).lat; const ds=t.date.toISOString().slice(0,10);
        if(Math.abs(lat)<1.6) out.push({ds, beta:lat, kind:Math.abs(lat)<0.6?'central':'partial'});
        cur=new Date(t.date.getTime()+2*86400000);
      }
      setList({y, out}); setBusy(false);
    },20);
  }
  useEffect(()=>{ scan(yr); },[yr]);
  return <>
    <h2>Saros — solar eclipses &amp; the 73 statistic (§15b.6, §9)</h2>
    <div className="muted" style={{marginBottom:10}}>A live scan: every new moon in the chosen year, a solar eclipse if the Moon's ecliptic latitude |β| &lt; 1.6° (the same threshold calibrated in <code>calc_saros_series.mjs</code>). One year is fast; the full 5000-year enumeration that counts saros series members runs offline.</div>
    <div className="controls" style={{marginBottom:10}}>
      <button onClick={()=>setYr(yr-1)}>◀ {yr-1}</button>
      <span className="pill">{yr}</span>
      <button onClick={()=>setYr(yr+1)}>{yr+1} ▶</button>
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
      <li>The saros = 223 synodic months = 6585.32 d. Eclipses of one series are separated by ~6585.32 d; a chain = a saros series.</li>
      <li>Full enumeration (5000 years, all new moons, |β| &lt; 1.6°): <b>152 complete series, lengths 54–87, median 72</b>. The “73” is a <b>statistical count</b> (mean/median members per series) — not a period and not an eclipse factor.</li>
      <li><b style={{color:'var(--red)'}}>Negative result (§9):</b> 37/73 do <b>not</b> structure eclipses (factorisation, period, nodal-cycle stations ~40/~87 — all negative). 73 appears <i>only</i> as the saros-series member count.</li>
    </ul>
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
  const SYN=29.530589, TROP=365.24219, DRAC=27.212221, ANOM=27.554550;
  const meton19=19*TROP, meton235=235*SYN;
  const oct8=8*TROP, oct99=99*SYN;
  const isl33lunar=33*12*SYN, isl33solar=33*TROP;
  return <>
    <h2>Lunar–Solar synchronisation — Meton, octaeteris, Islamic (§7–§8)</h2>
    <div className="muted" style={{marginBottom:10}}>The 19-year lunisolar cycle (Meton) and its cross-cultural echoes. All numbers computed live from SYN = {SYN} and TROP = {TROP}.</div>
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
      <li>Draconic month {DRAC} d · anomalistic {ANOM} d · eclipse year {346.62} d → saros 223×SYN = 6585.32 d (see the Saros tab).</li>
    </ul>
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

function RevelationTab({date, rows, occ, words, genData, genYear}){
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

    <h3>Verified on {date} — the mock of today</h3>
    <div className="muted" style={{marginBottom:8}}>Each line of the Raziel instruction, mapped to what the apparatus actually computes today (live, not asserted):</div>
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

function CrossCulturalTab(){
  const rows=[
    ['Maya','Tzolkin = 260; Haab = 365 = 73×5','73 appears twice: 73 pentads = solar year (Haab) and 73 tzolkin = 1 Calendar Round (52×365). Independent of Hebrew.'],
    ['Maya','Baktun = 144,000 d = 400 tun','144,000 = 144×1000; 144 = 12². The Long Count uses 144,000 as its major unit (cf. Rev 7 sealed).'],
    ['Greek','27 letters (9+9+9), values 1–9, 10–90, 100–900','Same decimal-positional assignment as Hebrew (§2). Convergence, not borrowing.'],
    ['Arabic','28-letter abjad, 1–9, 10–90, 100–900 + 1000','Same decimal-positional sequence (§2).'],
    ['Chinese','章 (zhāng) = 19 years = 235 months','The Metonic cycle discovered independently in China (§7–8).'],
    ['Vedic','27 nakshatras × 13°20 = 360°; kali-yuga = 432,000 y','27 = 22+5 Hebrew; 432,000 = 72×6000 (72 = precessional degree, §3).'],
    ['Babylonia','sar = 3600 = 60²; 60×6 = 360° → 12×30°','Sexagesimal base → the 12 signs × 30° grid.'],
    ['Hebrew/Egyptian','72 = precessional degree / Shem HaMephorash','72 years/degree (§3); 72 conspirators of Set; 72 languages; 72×6 = 432 (yuga base).'],
  ];
  return <>
    <h2>Cross-cultural convergence (§9.6)</h2>
    <div className="muted" style={{marginBottom:10}}>Real arithmetic convergences, verified. No cultural borrowing is claimed — only independent corroboration of the system's constants.</div>
    <table>
      <thead><tr><th>Tradition</th><th>Constant</th><th>What it shares</th></tr></thead>
      <tbody>
      {rows.map((r,i)=> <tr key={i}><td>{r[0]}</td><td>{r[1]}</td><td className="muted">{r[2]}</td></tr>)}
      </tbody>
    </table>
    <div className="note"><b>What the system shares, verifiably:</b> decimal-positional gematria 27/28 (Hebrew/Greek/Arabic); Meton 19a/235 (Greco-Babylonian, Chinese); 73×5=365 and 73-tzolkin Calendar Round (Hebrew civil, Maya); 144,000 as major unit (Revelation, Maya Long Count); 72 as precessional degree / completeness (Hebrew, Vedic, Egyptian). None proves the system; they independently corroborate it.</div>
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
      <li><b>Negative results (tested):</b> the mirror-palindrome 2701→3773 does not discriminate at corpus level (Genesis 39.0% ≈ Markov 39.7% ≈ uniform 41.4%); 37/73 do not structure eclipses; Genesis-days do not correlate with eclipses (7.5% observed vs 28% expected — they avoid them).</li>
      <li><b>Positive results:</b> 37/73 fit the civil solar year (365=73×5; 2701 pentads = 37 years), corroborated by the Maya Haab and Calendar Round; Genesis 1 core palindromes 61.3% vs 38.3% paired null (p≈8×10⁻³, hypothesis).</li>
      <li><b>Positive results v3.1 (§15b):</b> 37×73 structure of the 7 Genesis words demonstrated (23/127 subsets, p≈3.1×10⁻⁴); saros-series count by calculation (152 series, 54–87, median 72); 7 kameot = 7 doubles (Mercury 260 = Tzolkin); Aiq Bekar = decimal-positional gematria of §2 (bridge to sigils); 72 Shem HaMephorash angels from Exodus (216=6³); the 7-doubles=7-days heptagram (Chaldean order + mod 7 + Romance etymology); ayanamsa: 190-year spread (tropical discard robust); 6 windows 491-year cadence (p&lt;5×10⁻⁶, hypothesis not cause).</li>
      <li><b>Validation:</b> 86 assertions in <code>scripts/tests.mjs</code> — all green. Scripts in <code>scripts/</code>; article in <code>article/lector-del-cielo-articulo.md</code>.</li>
    </ul>
  </>;
}

// ====== App / Tabs ======
const TABS = [
  ['sky','Sky Map'],['translator','Reader'],['reading','Reading'],['time','Time'],
  ['sigils','Sigils'],['cycles','Cycles'],['revelation','Revelation'],['crosscultural','Cross-Cultural'],['method','Methodology'],
];
const SUB = {
  reading:[['rule','Reading Rule'],['yhvh','YHVH'],['genesis','Genesis 1:1']],
  time:[['predictor','Predictor'],['ages','Ages']],
  sigils:[['gematria','Gematria'],['sigil','Sigil Forge'],['kameot','Kameot'],['angels','72 Angels']],
  cycles:[['saros','Saros'],['ayanamsa','Ayanamsa'],['lunarsolar','Lunar-Solar'],['week','Week']],
};

function SubTabs({items, active, onChange}){
  return <div className="subtabs" role="tablist">
    {items.map(([id,label])=> <div key={id} role="tab" aria-selected={active===id} className={'subtab'+(active===id?' active':'')} onClick={()=>onChange(id)}>{label}</div>)}
  </div>;
}

function App(){
  const today='2026-08-08';
  const [active,setActive]=useState('sky');
  const [sub,setSub]=useState({reading:'rule',time:'predictor',sigils:'gematria',cycles:'saros'});
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

  const rows=useMemo(()=>skyAt(date),[date]);
  const occ=useMemo(()=>occupiedLetters(rows),[rows]);
  const occSigns=useMemo(()=>new Set(rows.map(r=>r.sign)),[rows]);
  const bs=useMemo(()=>bySign(rows),[rows]);
  const yhvhOk=occ.has('י')&&occ.has('ה')&&occ.has('ו');
  const genesisOk=genesisReadable(occ);
  const ANGEL72=useMemo(()=>{ const m=new Map(); if(angels) angels.triplets.forEach((t,i)=>{ m.set(norm(t), {el:angels.angelsEL[i], yh:angels.angelsYH[i]}); }); return m; },[angels]);
  const words=useMemo(()=> lex?readableWords(occ,lex.lexicon,ANGEL72):[],[occ,lex,ANGEL72]);
  const sentence=rows.map(r=>SIMPLE[r.sign][0]).join(' ');
  const year=parseInt(date.slice(0,4),10);

  function scanYear(y){
    setLoading(true);
    setTimeout(()=>{
      const days=[];
      for(let i=0;i<365;i++){
        const ds=new Date(Date.UTC(y,0,1+i,12,0,0)).toISOString().slice(0,10);
        if(genesisReadable(occupiedLetters(skyAt(ds)))) days.push(ds);
      }
      setGenData({year:y,days:new Set(days),list:days}); setLoading(false);
    },20);
  }
  useEffect(()=>{ if(lex) scanYear(genYear); },[genYear,lex]);
  function step(n){ const d=new Date(date+'T12:00:00Z'); d.setUTCDate(d.getUTCDate()+n); setDate(d.toISOString().slice(0,10)); }
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
        {active==='sky' && <SkyTab date={date} setDate={setDate} rows={rows} occ={occ} occSigns={occSigns} yhvhOk={yhvhOk} genesisOk={genesisOk} bs={bs} sentence={sentence} step={step}/>}
        {active==='translator' && <TranslatorTab date={date} occ={occ} words={words} q={q} setQ={setQ}/>}

        {active==='reading' && <>
          <SubTabs items={SUB.reading} active={sub.reading} onChange={setSubTab('reading')}/>
          {sub.reading==='rule' && <RuleTab occ={occ}/>}
          {sub.reading==='yhvh' && <YhvhTab date={date} occ={occ} yhvhOk={yhvhOk} bs={bs}/>}
          {sub.reading==='genesis' && <GenesisTab date={date} occ={occ} genesisOk={genesisOk}/>}
        </>}

        {active==='time' && <>
          <SubTabs items={SUB.time} active={sub.time} onChange={setSubTab('time')}/>
          {sub.time==='predictor' && <PredictorTab date={date} setDate={setDate} genYear={genYear} setGenYear={setGenYear} genData={genData} loading={loading} scanYear={scanYear} year={year} stepYear={stepYear}/>}
          {sub.time==='ages' && <AgesTab date={date} rows={rows}/>}
        </>}

        {active==='sigils' && <>
          <SubTabs items={SUB.sigils} active={sub.sigils} onChange={setSubTab('sigils')}/>
          {sub.sigils==='gematria' && <GematriaTab/>}
          {sub.sigils==='sigil' && <SigilTab/>}
          {sub.sigils==='kameot' && <KameotTab/>}
          {sub.sigils==='angels' && <AngelsTab/>}
        </>}

        {active==='cycles' && <>
          <SubTabs items={SUB.cycles} active={sub.cycles} onChange={setSubTab('cycles')}/>
          {sub.cycles==='saros' && <SarosTab/>}
          {sub.cycles==='ayanamsa' && <AyanamsaTab/>}
          {sub.cycles==='lunarsolar' && <LunarSolarTab/>}
          {sub.cycles==='week' && <WeekTab date={date} rows={rows}/>}
        </>}

        {active==='revelation' && <RevelationTab date={date} rows={rows} occ={occ} words={words} genData={genData} genYear={genYear}/>}
        {active==='crosscultural' && <CrossCulturalTab/>}
        {active==='method' && <MethodTab esGlossCount={Object.keys(lex.esGloss||{}).length}/>}
      </section>

      <div className="note" style={{textAlign:'center',marginTop:14}}>
        Positions: <a href="https://github.com/cosinekitty/astronomy-engine" target="_blank" rel="noreferrer">astronomy-engine</a> · frame: <a href="https://en.wikipedia.org/wiki/Sefer_Yetirah" target="_blank" rel="noreferrer">Sefer Yetzirah</a> · lexicon: <a href="https://github.com/openscriptures/HebrewLexicon" target="_blank" rel="noreferrer">Strong (OpenScriptures)</a>
      </div>
    </div>
  );
}

const root=document.getElementById('root');
createRoot(root).render(<App/>);