// calc_null_by_tier.mjs — does the paper's §6.1 (Null B shuffle enrichment), §6.3 (compound
// split) and §6.4 (Canaanite/Yah 7:0) SURVIVE when computed on the 5-body and 6-body
// alignment readable sets, not only the 51 seven-body specials?
//
// The paper's three "rarest-skies" p-values are all computed on the |O|=1 gated |S|=1
// readable set (1 zone-mother per sign). The tier comparison (calc_alignments_tiers.mjs)
// showed that set is TIER-DEPENDENT: looser clusters light more mothers, so more |S|=1
// names pass the gate (138 -> 286 -> 313 distinct). This script runs the EXACT §6.1
// shuffle-collision null (null_lexicon.mjs protocol) + §6.3 compound split + §6.4
// theophoric split on each tier's own gated readable set, to see whether the enrichments
// hold (lexicon property, framing-only change) or fade (rarity-dependent, p-values change).
//
//   Run:  node scripts/calc_null_by_tier.mjs
import { readFileSync } from 'node:fs';
import * as Astronomy from '../data/astronomy-engine.mjs';

// ── inlined verbatim from core.jsx (gate) + null_lexicon.mjs (shuffle) ──
const SIGNS=['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const SIMPLE_BY_IDX=SIGNS.map(s=>({Aries:'ה',Taurus:'ו',Gemini:'ז',Cancer:'ח',Leo:'ט',Virgo:'י',Libra:'ל',Scorpio:'נ',Sagittarius:'ס',Capricorn:'ע',Aquarius:'צ',Pisces:'ק'}[s]));
const SIMP=['ה','ו','ז','ח','ט','י','ל','נ','ס','ע','צ','ק']; const SIMPSET=new Set(SIMP);
const MOTHERS=[['ש',38],['מ',89],['א',268]]; const MLET=new Set(MOTHERS.map(m=>m[0]));
const ang=(a,b)=>{let d=Math.abs(a-b)%360;return d>180?360-d:d;};
const nearestMother=lon=>{let best=null,bd=Infinity;for(const[h,m]of MOTHERS){const d=ang(lon,m);if(d<bd){bd=d;best=h;}}return best;};
const availableMothers=occSignIdx=>{const m=new Set();for(const si of occSignIdx){m.add(nearestMother(si*30+15));}return m;};
const FIN={'ן':'נ','ץ':'צ','ך':'כ','ם':'מ','ף':'פ'};
const norm=s=>[...s].map(c=>FIN[c]||c).join('');
const GV={א:1,ב:2,ג:3,ד:4,ה:5,ו:6,ז:7,ח:8,ט:9,י:10,כ:20,ל:30,מ:40,נ:50,ס:60,ע:70,פ:80,צ:90,ק:100,ר:200,ש:300,ת:400};
const gematria=s=>[...s].reduce((a,c)=>a+(GV[c]||0),0);
const mulberry32=a=>function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};
function daysInMonth(y,mo){if(mo===2)return(y%4===0&&(y%100!==0||y%400===0))?29:28;return[31,28,31,30,31,30,31,31,30,31,30,31][mo-1];}
function makeDate(y,mo,da,h=12){const d=new Date(Date.UTC(2000,mo-1,da,h,0,0));d.setUTCFullYear(y);return d;}
function parseDate(s){if(!s)return null;const m=/^(-?\d{1,5})-(\d{2})-(\d{2})$/.exec(s);if(!m)return null;const y=+m[1],mo=+m[2],da=+m[3];if(mo<1||mo>12||da<1||da>daysInMonth(y,mo))return null;const d=makeDate(y,mo,da);return isNaN(d.getTime())?null:d;}
const BODIES=['Saturn','Jupiter','Mars','Sun','Venus','Mercury','Moon'];
function skyAt7(s){if(!s)return[];const d=parseDate(s);if(!d)return[];return BODIES.map(b=>{const v=Astronomy.GeoVector(Astronomy.Body[b],d,true);const lon=Astronomy.Ecliptic(v).elon;let si=Math.floor(lon/30)%12;if(si<0)si+=12;return si;});}

// ── lexicon (ALL n-pr, matches calc_section7 / null_lexicon) ──
const isBibPos=p=>String(p||'').startsWith('n-pr');
const LEX=JSON.parse(readFileSync(new URL('../web/lexicon.json',import.meta.url),'utf8')).lexicon;
const nameRefs=JSON.parse(readFileSync(new URL('../web/name_refs.json',import.meta.url),'utf8'));
const displayOf=he=>{const nr=nameRefs[he];if(nr&&nr.name)return nr.name;const e=LEX.find(x=>x[0]===he);return e?(e[2]||e[1]||he):he;};
const entries=LEX.map(([cons,,gloss,pos])=>{const c=norm(cons);const simples=[...new Set([...c].filter(ch=>SIMPSET.has(ch)))];const mothers=[...new Set([...c].filter(ch=>MLET.has(ch)))];return{c,cons,pos,isBib:isBibPos(pos),simples,mothers,len:c.length,display:displayOf(cons)};});
const bibSet=new Set(entries.filter(e=>e.isBib).map(e=>e.c));
const allBibEntries=entries.filter(e=>e.isBib);

// §6.3 compound split (from discriminate8.mjs): a name splits into two lexicon sub-words
const LEXSET=new Set(entries.map(e=>e.c));
const THEO=['אל','יה','בעל','יו','עשתר','דגון','דגן','כמוש','כמש','ענת','צדק','נבו','כוש','אשרה','שמש','מלך'];
const isTheo=c=>{for(const r of THEO)if(c.includes(r))return true;return false;};
const isYah=c=>c.includes('יה')||c.includes('יו');
const isCan=c=>isTheo(c)&&!isYah(c);
// split into two non-empty sub-words both in lexicon (length-controlled: each half >=2)
function isCompound(c){
  for(let i=2;i<=c.length-2;i++){ if(LEXSET.has(c.slice(0,i)) && LEXSET.has(c.slice(i))) return true; }
  return false;
}

// ── load alignments, dedup events per tier ──
const align=JSON.parse(readFileSync(new URL('../web/alignments.json',import.meta.url),'utf8'));
const ALL=[...align.scanA,...align.scanB];
function eventsFor(tier){const seen=new Set();const ev=[];for(const a of ALL){if(a.maxInSign!==tier)continue;if(seen.has(a.date))continue;seen.add(a.date);const si=new Set(skyAt7(a.date));ev.push({date:a.date,occIdx:si,moms:availableMothers(si)});}return ev;}

// distinct readable |S|=1 biblical entries that read on >=1 event of a tier (tier's own gate)
function readableS1(tier){
  const ev=eventsFor(tier);
  const out=new Map(); // cons -> entry
  for(const e of ev){
    const occSimp=new Set([...e.occIdx].map(i=>SIMP[i]));
    for(const n of allBibEntries){
      if(n.simples.length!==1) continue;
      if(!occSimp.has(n.simples[0])) continue;
      if(![...n.mothers].every(m=>e.moms.has(m))) continue;
      if(!out.has(n.c)) out.set(n.c,n);
    }
  }
  return [...out.values()];
}
// distinct readable |S|>=1 biblical entries (the broader tier-readable set)
function readableSge1(tier){
  const ev=eventsFor(tier);
  const out=new Map();
  for(const e of ev){
    const occSimp=new Set([...e.occIdx].map(i=>SIMP[i]));
    for(const n of allBibEntries){
      if(n.simples.length===0) continue;
      if(![...n.simples].every(s=>occSimp.has(s))) continue;
      if(![...n.mothers].every(m=>e.moms.has(m))) continue;
      if(!out.has(n.c)) out.set(n.c,n);
    }
  }
  return [...out.values()];
}

// ── §6.1 shuffle-collision null on a readable set (null_lexicon protocol) ──
const N=200;
const SEEDS=Array.from({length:N},(_,i)=>20260813+i*101);
const pct=(arr,q)=>{const s=[...arr].sort((a,b)=>a-b);return s[Math.min(s.length-1,Math.floor(q*(s.length-1)))];};
function nullB(readable){
  const real=readable.length;
  const nullTotals=SEEDS.map(()=>0);
  for(let k=0;k<SEEDS.length;k++){
    const rnd=mulberry32(SEEDS[k]);
    let coll=0;
    for(const e of readable){
      const arr=[...e.c];
      for(let i=arr.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}
      if(bibSet.has(arr.join(''))) coll++;
    }
    nullTotals[k]=coll;
  }
  const mean=nullTotals.reduce((a,b)=>a+b,0)/N;
  const lo=pct(nullTotals,0.025),hi=pct(nullTotals,0.975);
  return {real,mean,lo,hi,enr:real/mean,enrLo:real/hi,enrHi:real/lo};
}

// ── subset index for fast readable enumeration (bib + non-bib) ──
const bySsetAll=new Map(); // ssetKey -> [{entry,isBib}]
for(const e of entries){ if(e.simples.length===0) continue; const k=[...e.simples].sort().join('|');
  if(!bySsetAll.has(k)) bySsetAll.set(k,[]); bySsetAll.get(k).push(e); }
function subsetKeys(arr){ const out=[]; for(let mask=1;mask<(1<<arr.length);mask++){const sub=[];for(let i=0;i<arr.length;i++) if(mask&(1<<i)) sub.push(arr[i]); out.push([...new Set(sub)].sort().join('|')); } return out; }
// gated readable entries (bib and non-bib separately) that read on >=1 event of a tier
function readableSets(tier){
  const ev=eventsFor(tier);
  const bib=new Map(), non=new Map();
  for(const e of ev){
    const occSimp=[...e.occIdx].map(i=>SIMP[i]);
    const keys=new Set(subsetKeys(occSimp));
    for(const k of keys){ const arr=bySsetAll.get(k); if(!arr) continue;
      for(const n of arr){ if(![...n.mothers].every(m=>e.moms.has(m))) continue;
        (n.isBib?bib:non).set(n.c,n); } }
  }
  return {bib:[...bib.values()], non:[...non.values()]};
}

// ── §6.3 compound split: biblical vs non-name, on the tier's gated readable sets ──
function compoundTest(readableBib, readableNon){
  const bibComp=readableBib.filter(e=>isCompound(e.c)).length;
  const nonComp=readableNon.filter(e=>isCompound(e.c)).length;
  const bibN=readableBib.length, nonN=readableNon.length;
  const bibRate=bibN?bibComp/bibN:0, nonRate=nonN?nonComp/nonN:0;
  // two-sided Fisher exact p via the 2x2 contingency table
  const a=bibComp, b=bibN-bibComp, c=nonComp, d=nonN-nonComp;
  const fisher=fisherExact(a,b,c,d);
  return {bibN,bibComp,bibRate,nonN,nonComp,nonRate,ratio:nonRate?bibRate/nonRate:Infinity,p:fisher};
}
// Fisher exact (two-sided) — small-table exact via log-factorial; fine for these n
function lgamma(z){let x=0.165947772234179e-06/z;let y=z+5.5;y-=z+0.5;const t=[76.18009172947146,-86.50532032941677,24.01409824083091,-1.371192376613566e-3,1.451913164116857e-4,-1.402324912067827e-5];let s=t[0];for(let i=1;i<6;i++)s+=t[i]/(z+i);return Math.log(Math.sqrt(2*Math.PI))+Math.log(z+s)+y+(Math.log(x)/z);};
function lfact(n){let s=0;for(let i=2;i<=n;i++)s+=Math.log(i);return s;};
function fisherExact(a,b,c,d){const n=a+b+c+d;const row1=a+b,row2=c+d,col1=a+c,col2=b+d;
  const lbase=lfact(row1)+lfact(row2)+lfact(col1)+lfact(col2)-lfact(n);
  const k0=Math.max(0,col1-row2), k1=Math.min(col1,row1);
  let pLess=0,pObs=0,pTot=0;const obs=Math.min(a,c);
  for(let k=k0;k<=k1;k++){const lp=lbase-lfact(k)-lfact(col1-k)-lfact(row1-k)-lfact(col2-(col1-k));pTot+=Math.exp(lp);if(k<=a)pLess+=Math.exp(lp);if(k===a)pObs=Math.exp(lp);}
  const pGreater=pTot-pLess+pObs; return Math.min(1, 2*Math.min(pLess,pGreater));}

// ── §6.4 theophoric split among |S|=1 readable ──
function theoSplit(readableS1){
  let can=0,yah=0,theoOther=0,nonTheo=0;
  for(const e of readableS1){
    if(isCan(e.c))can++; else if(isYah(e.c))yah++; else if(isTheo(e.c))theoOther++; else nonTheo++;
  }
  return {can,yah,theoOther,nonTheo,total:readableS1.length};
}

const p=(...a)=>console.log(...a);
p('Computing per-tier §6.1/§6.3/§6.4 on each tier\'s own gated readable set…\n');
const tiers=[7,6,5];
const results={};
for(const t of tiers){
  const s1=readableS1(t);
  const rs=readableSets(t);
  const sge1=rs.bib, non=rs.non;
  const nb1=nullB(s1);
  const nbGe1=nullB(sge1);
  const ct=compoundTest(sge1, non);
  const ts=theoSplit(s1);
  results[t]={s1,sge1,non,nb1,nbGe1,ct,ts};
}

p('═════════════════════════════════════════════════════════════════════════════════');
p('  §6.1 Null B (shuffle-collision enrichment) per tier — |S|=1 readable set');
p('═════════════════════════════════════════════════════════════════════════════════');
p('  tier   |S|=1 real   null mean   enrichment    95% CI');
for(const t of tiers){const r=results[t].nb1;
  p(`  t${t}     ${String(r.real).padStart(6)}      ${r.mean.toFixed(2).padStart(7)}     ${r.enr.toFixed(2)}×       [${r.enrLo.toFixed(2)}, ${r.enrHi.toFixed(2)}]`);}
p('  (paper §6.1 reports t7 = 7.04×, CI [5.11, 10.62], real 138, null 19.6)');
p('');
p('  §6.1 on the FULL |S|≥1 readable set (|S|≤3, what 5/6-body skies actually surface):');
p('  tier   |S|≥1 real   null mean   enrichment    95% CI');
for(const t of tiers){const r=results[t].nbGe1;
  p(`  t${t}     ${String(r.real).padStart(6)}      ${r.mean.toFixed(2).padStart(7)}     ${r.enr.toFixed(2)}×       [${r.enrLo.toFixed(2)}, ${r.enrHi.toFixed(2)}]`);}
p('');
p('═════════════════════════════════════════════════════════════════════════════════');
p('  §6.3 compound split (biblical names vs non-names) per tier — |S|≥1 readable set');
p('═════════════════════════════════════════════════════════════════════════════════');
p('  tier   bibN   bibComp%   nonN   nonComp%   ratio     Fisher p');
for(const t of tiers){const c=results[t].ct;
  p(`  t${t}     ${String(c.bibN).padStart(5)}  ${(100*c.bibRate).toFixed(1).padStart(6)}%    ${String(c.nonN).padStart(5)}  ${(100*c.nonRate).toFixed(1).padStart(6)}%    ${c.ratio.toFixed(2)}×    ${c.p.toExponential(2)}`);}
p('  (paper §6.3 reports 3.99×, p=1.59e-9, 35/138 names vs 43/677 non-names)');
p('');
p('═════════════════════════════════════════════════════════════════════════════════');
p('  §6.4 Canaanite/Yahwistic theophoric split per tier — |S|=1 readable set');
p('═════════════════════════════════════════════════════════════════════════════════');
p('  tier   Canaanite   Yahwistic   theoOther   nonTheo   total');
for(const t of tiers){const s=results[t].ts;
  p(`  t${t}     ${String(s.can).padStart(5)}        ${String(s.yah).padStart(5)}        ${String(s.theoOther).padStart(5)}       ${String(s.nonTheo).padStart(5)}     ${s.total}`);}
p('  (paper §6.4 reports 7 Canaanite : 0 Yahwistic, joint p≈0.06 on the 51 specials)');
p('');

// ── write summary ──
const md=`# Per-tier §6.1 / §6.3 / §6.4 — do the p-values survive on 5/6-body skies?\n
Generated by scripts/calc_null_by_tier.mjs. Runs the paper's three "rarest-skies" tests on
each tier's OWN gated readable set (not just the |O|=1 51 specials).\n
## §6.1 Null B shuffle enrichment (|S|=1 set)\n
| tier | real | null mean | enrichment | 95% CI |
|---|---|---|---|---|
${tiers.map(t=>{const r=results[t].nb1;return `| t${t} | ${r.real} | ${r.mean.toFixed(2)} | ${r.enr.toFixed(2)}× | [${r.enrLo.toFixed(2)}, ${r.enrHi.toFixed(2)}] |`;}).join('\n')}\n
## §6.1 on full |S|≥1 readable set\n
| tier | real | null mean | enrichment | 95% CI |
|---|---|---|---|---|
${tiers.map(t=>{const r=results[t].nbGe1;return `| t${t} | ${r.real} | ${r.mean.toFixed(2)} | ${r.enr.toFixed(2)}× | [${r.enrLo.toFixed(2)}, ${r.enrHi.toFixed(2)}] |`;}).join('\n')}\n
## §6.3 compound split\n
| tier | bibN | bibComp% | nonN | nonComp% | ratio | Fisher p |
|---|---|---|---|---|---|---|
${tiers.map(t=>{const c=results[t].ct;return `| t${t} | ${c.bibN} | ${(100*c.bibRate).toFixed(1)}% | ${c.nonN} | ${(100*c.nonRate).toFixed(1)}% | ${c.ratio.toFixed(2)}× | ${c.p.toExponential(2)} |`;}).join('\n')}\n
## §6.4 Canaanite/Yah theophoric split (|S|=1)\n
| tier | Canaanite | Yahwistic | theoOther | nonTheo | total |
|---|---|---|---|---|---|
${tiers.map(t=>{const s=results[t].ts;return `| t${t} | ${s.can} | ${s.yah} | ${s.theoOther} | ${s.nonTheo} | ${s.total} |`;}).join('\n')}\n
`;
import { writeFileSync } from 'node:fs';
writeFileSync(new URL('null_by_tier_report.md',import.meta.url), md);
p('→ report written to scripts/null_by_tier_report.md');