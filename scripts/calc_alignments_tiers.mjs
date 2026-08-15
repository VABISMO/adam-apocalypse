// calc_alignments_tiers.mjs — run the paper's §7 readability calculation not only on the
// 51 seven-body specials (maxInSign===7) but on ALL the 6-body and 5-body alignments too.
//
// The paper's §7 (scripts/calc_section7.mjs) computes, for the 51 rarest alignments (all 7
// classical bodies in ONE zodiac sign → |O|=1 occupied simple), which biblical proper names
// read under the geometric mother-gate (simpleSet(name) ⊆ occupiedSimples AND
// motherSet(name) ⊆ availableMothers(occupiedSigns)). This script generalises that exact
// calculation to the looser clusters:
//   tier 7 → |O|=1  (7 bodies in one sign)         — the paper's 51 specials (verification)
//   tier 6 → |O|=2  (6 bodies in one sign + 1 elsewhere)
//   tier 5 → |O|∈{2,3} (5 bodies in one sign + 2 elsewhere)
// and compares the three tiers: does the long-biblical-name signal hold, scale, or dilute as
// the cluster loosens?
//
// Self-contained: imports astronomy-engine direct (no esbuild), inlines skyAt7 + the
// geometric mother-gate + eraForYear verbatim from web/src/core.jsx (cited, identical to
// calc_section7.mjs). PRNG-free.
//   Run:  node scripts/calc_alignments_tiers.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import * as Astronomy from '../data/astronomy-engine.mjs';

// ── inlined verbatim from web/src/core.jsx (cited) ──
const SIGNS = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const SIMPLE = {
  'Aries':['ה','Heh',5], 'Taurus':['ו','Vav',6], 'Gemini':['ז','Zayin',7], 'Cancer':['ח','Chet',8],
  'Leo':['ט','Tet',9], 'Virgo':['י','Yod',10], 'Libra':['ל','Lamed',30], 'Scorpio':['נ','Nun',50],
  'Sagittarius':['ס','Samekh',60], 'Capricorn':['ע','Ayin',70], 'Aquarius':['צ','Tzaddi',90], 'Pisces':['ק','Qoph',100]
};
const SIMPLE_BY_IDX = SIGNS.map(s => SIMPLE[s][0]);
const MOTHERS = [['א','Aleph','air · Draco',268],['מ','Mem','water · Ursa Minor',89],['ש','Shin','fire · Cassiopea',38]];
const MOTHER_LETTERS = new Set(MOTHERS.map(m=>m[0]));
const GV = {א:1,ב:2,ג:3,ד:4,ה:5,ו:6,ז:7,ח:8,ט:9,י:10,כ:20,ל:30,מ:40,נ:50,ס:60,ע:70,פ:80,צ:90,ק:100,ר:200,ש:300,ת:400};
const SIMPLE_LETTERS = new Set(Object.values(SIMPLE).map(x=>x[0]));
const FIN2REG = {'ן':'נ','ץ':'צ','ך':'כ','ם':'מ','ף':'פ'};
const norm = s => [...s].map(c => FIN2REG[c] || c).join('');
const gematria = s => [...s].reduce((a,c)=>a+(GV[c]||0),0);
function simpleSet(cons){ const s=new Set(); for(const c of norm(cons)) if(SIMPLE_LETTERS.has(c)) s.add(c); return s; }
function motherSet(cons){ const s=new Set(); for(const c of norm(cons)) if(MOTHER_LETTERS.has(c)) s.add(c); return s; }
function daysInMonth(y,mo){ if(mo===2) return (y%4===0&&(y%100!==0||y%400===0))?29:28; return [31,28,31,30,31,30,31,31,30,31,30,31][mo-1]; }
function makeDate(y,mo,da,h=12){ const d=new Date(Date.UTC(2000,mo-1,da,h,0,0)); d.setUTCFullYear(y); return d; }
function parseDate(str){ if(!str) return null; const m=/^(-?\d{1,5})-(\d{2})-(\d{2})$/.exec(str); if(!m) return null;
  const y=parseInt(m[1],10),mo=parseInt(m[2],10),da=parseInt(m[3],10);
  if(mo<1||mo>12||da<1||da>daysInMonth(y,mo)) return null; const d=makeDate(y,mo,da); return isNaN(d.getTime())?null:d; }
const BODIES=['Saturn','Jupiter','Mars','Sun','Venus','Mercury','Moon'];
function skyAt7(dateStr){ if(!dateStr) return []; const d=parseDate(dateStr); if(!d) return [];
  return BODIES.map(b=>{ const v=Astronomy.GeoVector(Astronomy.Body[b],d,true);
    const lon=Astronomy.Ecliptic(v).elon; let si=Math.floor(lon/30)%12; if(si<0) si+=12;
    return { body:b, lon, sign:SIGNS[si], signIdx:si, deg:lon-si*30 }; }); }
// geometric mother-gate (verbatim from core.jsx)
const MOTHER_LON = {}; MOTHERS.forEach(([h,,,lon])=>{ MOTHER_LON[h]=lon; });
function _angDist(a,b){ let d=Math.abs(a-b)%360; return d>180?360-d:d; }
function nearestMother(lon){ let best=null,bd=Infinity; for(const [h,,,mlon] of MOTHERS){ const d=_angDist(lon,mlon); if(d<bd){bd=d;best=h;} } return best; }
function signCenterLon(sign){ const i=SIGNS.indexOf(sign); return i<0?NaN:i*30+15; }
function availableMothers(occupiedSigns){ const m=new Set(); for(const s of occupiedSigns){ const c=signCenterLon(s); if(!isNaN(c)) m.add(nearestMother(c)); } return m; }
// precessional era (verbatim from core.jsx eraForYear + ageBoundaries)
const PREC = 50.29/3600, AGE = 30/PREC, FULL = 360/PREC, AYANAMSIS = 24.18;
const GREAT_YEAR = 25771;
function ageBoundaries(ayan=AYANAMSIS){
  const eqLon = (360 - ayan) % 360; const out=[];
  for(let i=0;i<12;i++){ const hi=(i+1)*30; let dt=(eqLon-hi)/PREC;
    while(dt>FULL/2) dt-=FULL; while(dt<-FULL/2) dt+=FULL;
    const start=2024+dt; out.push({sign:SIGNS[i], he:SIMPLE[SIGNS[i]][0], start, end:start+AGE}); }
  return out;
}
function eraForYear(y){
  const ERAS = ageBoundaries();
  let mn=Infinity, mx=-Infinity;
  for(const e of ERAS){ if(e.start<mn) mn=e.start; if(e.end>mx) mx=e.end; }
  let yy=y; while(yy<mn) yy+=GREAT_YEAR; while(yy>=mx) yy-=GREAT_YEAR;
  for(const e of ERAS){ if(yy>=Math.round(e.start)&&yy<Math.round(e.end)) return e.sign; }
  return '?';
}

// ── theophoric / Canaanite classifier (verbatim from calc_specials_classify.mjs) ──
const THEO_ROOTS=['בעל','אל','יה','יו','עשתר','דגון','דגן','כמוש','כמש','ענת','צדק','נבו','כוש','אשרה','שמש','מלך'];
const isTheo=cons=>{const c=norm(cons);for(const r of THEO_ROOTS)if(c.includes(r))return true;return false;};
const isYah=cons=>{const c=norm(cons);return c.includes('יה')||c.includes('יו');};
const isCan=cons=>isTheo(cons)&&!isYah(cons);

// ── lexicon + name_refs (matches calc_section7.mjs conventions) ──
const lex = JSON.parse(readFileSync(new URL('../web/lexicon.json',import.meta.url),'utf8'));
const nameRefs = JSON.parse(readFileSync(new URL('../web/name_refs.json',import.meta.url),'utf8'));
const LEX = lex.lexicon;
const isBibPos = pos => String(pos||'').startsWith('n-pr');
const displayOf = he => { const nr=nameRefs[he]; if(nr&&nr.name) return nr.name; const e=LEX.find(x=>x[0]===he); return e?(e[2]||e[1]||he):he; };
const typeOf = he => { const e=LEX.find(x=>x[0]===he); const p=String(e?(e[3]||''):''); return p.startsWith('n-pr-loc')?'place':'person'; };

// BIB = all Strong-lexicon proper names (n-pr persons + places) — matches calc_section7.mjs /
// calc_specials_biblical.mjs (the paper's §7 source): ALL 1882 n-pr, NOT isBib(n>0)-filtered,
// so names missing from name_refs (Matred, Zamzummite, …) are kept as the paper keeps them.
const BIB = [];
for(const [cons,,,pos] of LEX){ if(!isBibPos(pos)) continue;
  BIB.push({ cons, len:cons.length, gem:gematria(cons), display:displayOf(cons), type:typeOf(cons),
    sset:simpleSet(cons), mset:motherSet(cons), theo:isTheo(cons), yah:isYah(cons), can:isCan(cons),
    s1: simpleSet(cons).size===1 }); }
// index |S|≥1 names by sorted-simple-string key for fast subset lookup
const namesBySset = new Map(); // "ה|ו" -> [name,...]
for(const n of BIB){ if(n.sset.size===0) continue; const k=[...n.sset].sort().join('|');
  if(!namesBySset.has(k)) namesBySset.set(k,[]); namesBySset.get(k).push(n); }
const S0names = BIB.filter(n=>n.sset.size===0); // |S|=0 always-readable baseline
const byImp = (a,b)=>(b.len-a.len)||(a.gem-b.gem);
const p = (...a) => console.log(...a);

// ── load alignments, dedup by date per tier ──
const align = JSON.parse(readFileSync(new URL('../web/alignments.json',import.meta.url),'utf8'));
const ALL = [...align.scanA, ...align.scanB];

// non-empty subsets of an array (as sorted "a|b|c" keys), for occSimples lookup
function subsetKeys(arr){ const out=[];
  for(let mask=1; mask<(1<<arr.length); mask++){ const sub=[]; for(let i=0;i<arr.length;i++) if(mask&(1<<i)) sub.push(arr[i]);
    out.push([...new Set(sub)].sort().join('|')); } return out; }

// analyse one tier
function analyse(tier){
  const seenDate = new Set(); const events = [];
  for(const a of ALL){ if(a.maxInSign!==tier) continue; if(seenDate.has(a.date)) continue; seenDate.add(a.date);
    const rows = skyAt7(a.date);
    const occSignIdx = new Set(rows.map(r=>r.signIdx));
    const occSigns = [...occSignIdx].map(i=>SIGNS[i]);
    const occSimples = [...occSignIdx].map(i=>SIMPLE_BY_IDX[i]);
    const moms = availableMothers(new Set(occSigns));
    // dominant sign = the one holding `tier` bodies (the maxInSign sign)
    const cnt={}; for(const r of rows){ cnt[r.signIdx]=(cnt[r.signIdx]||0)+1; }
    let domIdx=-1,domC=-1; for(const idx of occSignIdx){ if((cnt[idx]||0)>domC){domC=cnt[idx];domIdx=idx;} }
    events.push({ date:a.date, occSignIdx, occSigns, occSimples, moms, oSize:occSignIdx.size, domIdx }); }
  events.sort((a,b)=> parseDate(a.date).getTime() - parseDate(b.date).getTime());

  // per-event readable names (gated). |S|=0 always read (mothers still gated).
  // accumulate
  const oDist={}; for(const e of events) oDist[e.oSize]=(oDist[e.oSize]||0)+1;
  let totalReadings=0, totalS1readings=0, totalS0readings=0, totalSge1readings=0;
  const distinctAll=new Set(), distinctS0=new Set(), distinctS1=new Set(), distinctSge1=new Set(), distinctSge2=new Set();
  let lenGe5=0, lenGe7=0, lenGe8=0, personN=0, placeN=0, theoN=0, yahN=0, canN=0;
  let s1lenGe5=0, s0readings=0;
  const perEventLongest=[]; const perEventCount=[]; const perEventS1count=[];
  const signEventCount={}; for(const s of SIGNS) signEventCount[s]=0;
  // longest distinct name per sign (the dominant sign of each event)
  const longestPerSign={}; for(const s of SIGNS) longestPerSign[s]=null;

  for(const e of events){
    const domSign=SIGNS[e.domIdx]; signEventCount[domSign]++;
    const occSimpArr=[...e.occSimples];
    // gather candidate names whose sset ⊆ occSimples (via subset keys) + mother-gate
    const readable=[];
    // |S|=0 (always-readable baseline; still mother-gated)
    for(const n of S0names){ if([...n.mset].every(m=>e.moms.has(m))){ readable.push(n); } }
    // |S|≥1 via subset enumeration
    for(const key of subsetKeys(occSimpArr)){ const arr=namesBySset.get(key); if(!arr) continue;
      for(const n of arr){ if([...n.mset].every(m=>e.moms.has(m))) readable.push(n); } }
    // dedupe within event
    const uniq=[]; const us=new Set(); for(const n of readable){ if(us.has(n.cons))continue; us.add(n.cons); uniq.push(n); }
    totalReadings += uniq.length;
    perEventCount.push(uniq.length);
    let longest=null; let s1count=0;
    for(const n of uniq){
      distinctAll.add(n.cons);
      const sz=n.sset.size;
      if(sz===0){ distinctS0.add(n.cons); totalS0readings++; s0readings++; }
      else { distinctSge1.add(n.cons); totalSge1readings++; if(sz>=2) distinctSge2.add(n.cons);
             if(n.s1){ distinctS1.add(n.cons); totalS1readings++; s1count++; if(n.len>=5) s1lenGe5++; } }
      if(n.len>=5) lenGe5++; if(n.len>=7) lenGe7++; if(n.len>=8) lenGe8++;
      if(n.type==='person') personN++; else placeN++;
      if(n.theo) theoN++; if(n.yah) yahN++; if(n.can) canN++;
      if(!longest || n.len>longest.len) longest=n;
    }
    perEventLongest.push(longest?longest.len:0);
    perEventS1count.push(s1count);
    // per-sign longest among |S|≥1 (sign-specific) only — |S|=0 reads on every event (baseline)
    const longestSge1 = uniq.filter(n=>n.sset.size>=1).sort((a,b)=>b.len-a.len||a.gem-b.gem)[0]||null;
    if(longestSge1){ if(!longestPerSign[domSign]||longestSge1.len>longestPerSign[domSign].len) longestPerSign[domSign]=longestSge1; }
  }

  // top distinct longest |S|≥1 names across the tier
  const topLong=[...distinctSge1].map(cons=>BIB.find(n=>n.cons===cons)).filter(Boolean).sort(byImp).slice(0,20);
  const topLongS1=[...distinctS1].map(cons=>BIB.find(n=>n.cons===cons)).filter(Boolean).sort(byImp).slice(0,20);

  const mean=(xs)=>xs.length?xs.reduce((a,b)=>a+b,0)/xs.length:0;
  return {
    tier, n:events.length, oDist, events,
    totalReadings, totalS1readings, totalS0readings, totalSge1readings,
    distinctAll:distinctAll.size, distinctS0:distinctS0.size, distinctSge1:distinctSge1.size,
    distinctSge2:distinctSge2.size, distinctS1:distinctS1.size,
    meanPerEvent:mean(perEventCount), meanLongest:mean(perEventLongest), meanS1:mean(perEventS1count),
    lenGe5, lenGe7, lenGe8, s1lenGe5, personN, placeN, theoN, yahN, canN,
    signEventCount, longestPerSign, topLong, topLongS1
  };
}

// ── run all three tiers (7 first = paper baseline) ──
p('Computing tier 7 (paper baseline: 7 bodies in one sign, |O|=1)…');
const T7 = analyse(7);
p('Computing tier 6 (6 bodies in one sign, |O|=2)…');
const T6 = analyse(6);
p('Computing tier 5 (5 bodies in one sign, |O|∈{2,3})…');
const T5 = analyse(5);
p('');

function fmt(n,w=8){ return String(n).padStart(w); }
function pct(num,den){ return den? (100*num/den).toFixed(1)+'%':'—'; }

// ── comparison table ──
p('═════════════════════════════════════════════════════════════════════════════════');
p('  TIER COMPARISON — paper §7 readability (mother-gated) across alignment tiers');
p('═════════════════════════════════════════════════════════════════════════════════');
p(`  metric                              tier5      tier6      tier7(51)`);
p(`  ─────────────────────────────────────────────────────────────────────────`);
const rows=[
  ['alignment events (dedup by date)', T5.n, T6.n, T7.n],
  ['|O| distribution', JSON.stringify(T5.oDist), JSON.stringify(T6.oDist), JSON.stringify(T7.oDist)],
  ['total name×event readings', T5.totalReadings, T6.totalReadings, T7.totalReadings],
  ['  of which |S|=0 (baseline)', T5.totalS0readings, T6.totalS0readings, T7.totalS0readings],
  ['  of which |S|≥1 (sign-specific)', T5.totalSge1readings, T6.totalSge1readings, T7.totalSge1readings],
  ['  of which |S|=1', T5.totalS1readings, T6.totalS1readings, T7.totalS1readings],
  ['mean readable names / event', T5.meanPerEvent.toFixed(1), T6.meanPerEvent.toFixed(1), T7.meanPerEvent.toFixed(1)],
  ['mean LONGEST name len / event', T5.meanLongest.toFixed(2), T6.meanLongest.toFixed(2), T7.meanLongest.toFixed(2)],
  ['distinct readable names (all)', T5.distinctAll, T6.distinctAll, T7.distinctAll],
  ['distinct |S|=0 (baseline)', T5.distinctS0, T6.distinctS0, T7.distinctS0],
  ['distinct |S|≥1 names', T5.distinctSge1, T6.distinctSge1, T7.distinctSge1],
  ['distinct |S|≥2 names', T5.distinctSge2, T6.distinctSge2, T7.distinctSge2],
  ['distinct |S|=1 names', T5.distinctS1, T6.distinctS1, T7.distinctS1],
  ['readings len≥5', T5.lenGe5, T6.lenGe5, T7.lenGe5],
  ['readings len≥7', T5.lenGe7, T6.lenGe7, T7.lenGe7],
  ['readings len≥8', T5.lenGe8, T6.lenGe8, T7.lenGe8],
  ['|S|=1 readings len≥5', T5.s1lenGe5, T6.s1lenGe5, T7.s1lenGe5],
  ['readings person / place', `${T5.personN}/${T5.placeN}`, `${T6.personN}/${T6.placeN}`, `${T7.personN}/${T7.placeN}`],
  ['readings theophoric / Yah / Can', `${T5.theoN}/${T5.yahN}/${T5.canN}`, `${T6.theoN}/${T6.yahN}/${T6.canN}`, `${T7.theoN}/${T7.yahN}/${T7.canN}`],
];
for(const [label,a,b,c] of rows){ p(`  ${label.padEnd(36)} ${String(a).padStart(10)} ${String(b).padStart(10)} ${String(c).padStart(10)}`); }
p('');

// ── per-tier detail ──
function detail(T){
  p(`──────── tier ${T.tier} — n=${T.n} events ────────────────`);
  p(`|O| distribution: ${JSON.stringify(T.oDist)}`);
  p(`per-sign event counts (dominant sign):`);
  let line='  '; for(const s of SIGNS){ line+=`${s.slice(0,3)}:${T.signEventCount[s]} `; } p(line);
  p(`longest readable name per dominant sign:`);
  for(const s of SIGNS){ const L=T.longestPerSign[s]; p(`  ${s.padEnd(12)} ${L?L.display+' L'+L.len+' ('+L.type+', '+(L.can?'Canaanite':L.yah?'Yah':L.theo?'theo':'non-theo')+')':'—'}`); }
  p(`top-20 longest DISTINCT |S|≥1 biblical names reading on ≥1 event (gated):`);
  for(const n of T.topLong){ p(`  ${n.display.padEnd(20)} L${n.len} gem${String(n.gem).padStart(4)} ${n.type.padEnd(6)} ${(n.can?'Canaanite':n.yah?'Yah':n.theo?'theo':'non-theo').padEnd(10)} s|S|=${n.sset.size}`); }
  p(`top-20 longest DISTINCT |S|=1 (sign-specific) names:`);
  for(const n of T.topLongS1){ p(`  ${n.display.padEnd(20)} L${n.len} gem${String(n.gem).padStart(4)} ${n.type.padEnd(6)} ${(n.can?'Canaanite':n.yah?'Yah':n.theo?'theo':'non-theo').padEnd(10)}`); }
  p('');
}
detail(T7); detail(T6); detail(T5);

// ── write markdown summary ──
const md = `# Alignment-tier readability comparison (mother-gated)\n
Generated by scripts/calc_alignments_tiers.mjs — the paper's §7 readability calculation
(simpleSet ⊆ occupiedSimples AND motherSet ⊆ availableMothers, geometric mother-gate from
core.jsx) run on three alignment tiers from web/alignments.json (dedup by date):\n
- tier 7 — 7 classical bodies in one sign (|O|=1): the paper's 51 specials (verification)
- tier 6 — 6 bodies in one sign + 1 elsewhere (|O|=2)
- tier 5 — 5 bodies in one sign + 2 elsewhere (|O|∈{2,3})\n
## comparison\n
| metric | tier5 | tier6 | tier7(51) |
|---|---|---|---|
${rows.map(r=>`| ${r[0]} | ${r[1]} | ${r[2]} | ${r[3]} |`).join('\n')}\n
## tier 7 (paper baseline) — n=${T7.n}
|O|=${JSON.stringify(T7.oDist)}; per-sign events: ${SIGNS.map(s=>s.slice(0,3)+':'+T7.signEventCount[s]).join(' ')}\n
## tier 6 — n=${T6.n}
|O|=${JSON.stringify(T6.oDist)}; per-sign events: ${SIGNS.map(s=>s.slice(0,3)+':'+T6.signEventCount[s]).join(' ')}\n
## tier 5 — n=${T5.n}
|O|=${JSON.stringify(T5.oDist)}; per-sign events: ${SIGNS.map(s=>s.slice(0,3)+':'+T5.signEventCount[s]).join(' ')}\n
## top-20 longest distinct |S|≥1 names per tier\n
### tier 7
${T7.topLong.map(n=>`- ${n.display} L${n.len} gem${n.gem} ${n.type} ${n.can?'Canaanite':n.yah?'Yah':n.theo?'theo':'non-theo'}`).join('\n')}\n
### tier 6
${T6.topLong.map(n=>`- ${n.display} L${n.len} gem${n.gem} ${n.type} ${n.can?'Canaanite':n.yah?'Yah':n.theo?'theo':'non-theo'}`).join('\n')}\n
### tier 5
${T5.topLong.map(n=>`- ${n.display} L${n.len} gem${n.gem} ${n.type} ${n.can?'Canaanite':n.yah?'Yah':n.theo?'theo':'non-theo'}`).join('\n')}\n
`;
writeFileSync(new URL('alignments_tiers_report.md',import.meta.url), md);
p('→ report written to scripts/alignments_tiers_report.md');