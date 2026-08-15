// verify_mother_gate.mjs — verify the geometric mother-gating rule and its impact
// on the 7-planet specials' readable names.
//
// RULE: the 3 mothers (א=Draco 268°, מ=Ursa Minor 89°, ש=Cassiopea 38°)
// are NOT always available. A mother is available for an alignment iff it is the
// nearest mother (angularly, ecliptic longitude) to the occupied sign(s) — i.e. the
// mother whose Voronoi zone contains the occupied sign. A single-sign special → exactly
// 1 mother. A multi-sign ("horizontal") span can cross a zone boundary → at most 2.
//
// A name reads on a sky iff: simpleSet(name) ⊆ occupiedSimples  AND  motherSet(name) ⊆ availableMothers.
// (doubles always available.)
//
// This recomputes the readable biblical-proper names on the 51 specials WITH the gate,
// and compares to the OLD (mothers-always) counts, to see whether the paper's
// "five longest readable names" survive.
import { readFileSync } from 'node:fs';

// ── letters ──
// alignments.json stores sign names in SPANISH (Géminis, Cáncer, Acuario, Piscis…)
const SIGNS_ES = ['Aries','Tauro','Géminis','Cáncer','Leo','Virgo','Libra','Escorpio','Sagitario','Capricornio','Acuario','Piscis'];
const SIMPLE = {}; SIGNS_ES.forEach((s,i)=>{ const he=['ה','ו','ז','ח','ט','י','ל','נ','ס','ע','צ','ק'][i]; SIMPLE[s]=he; });
const SIGN_LON = {}; SIGNS_ES.forEach((s,i)=>{ SIGN_LON[s]=[i*30, i*30+30, i*30+15]; }); // [lo,hi,center]
const FIN2REG = {'ן':'נ','ץ':'צ','ך':'כ','ם':'מ','ף':'פ'};
const norm = s => [...s].map(c => FIN2REG[c] || c).join('');
const SIMPLE_SET = new Set(Object.values(SIMPLE));
const MOTHER_SET = new Set(['א','מ','ש']);
// mothers with ecliptic longitudes (from web/src/ui.jsx MOTHER_LON)
const MOTHERS = [['ש','Cassiopea',38],['מ','Ursa Minor',89],['א','Draco',268]];

// ── Voronoi: nearest mother by ecliptic longitude ──
function angularDist(a,b){ let d=Math.abs(a-b)%360; return d>180?360-d:d; }
function nearestMother(lon){ // returns mother letter whose longitude is closest to lon
  let best=null,bd=Infinity;
  for(const [h,,mlon] of MOTHERS){ const d=angularDist(lon,mlon); if(d<bd){bd=d;best=h;} }
  return best;
}
// available mothers for a set of occupied signs = nearest mother to each occupied sign center
function availableMothers(occupiedSigns){
  const m=new Set();
  for(const s of occupiedSigns) m.add(nearestMother(SIGN_LON[s][2]));
  return m;
}

// ── lexicon + biblical ──
const lex=JSON.parse(readFileSync(new URL('../web/lexicon.json',import.meta.url),'utf8'));
const nameRefs=JSON.parse(readFileSync(new URL('../web/name_refs.json',import.meta.url),'utf8'));
const LEX=lex.lexicon;
const isBib = he => nameRefs[he] && nameRefs[he].n>0;
const glossOf = he => (nameRefs[he]&&nameRefs[he].gloss)||'?';
function simpleSetOf(cons){ return new Set([...norm(cons)].filter(c=>SIMPLE_SET.has(c))); }
function motherSetOf(cons){ return new Set([...norm(cons)].filter(c=>MOTHER_SET.has(c))); }

// index biblical proper names by sorted-simple-string AND by mother-set
// (we need both to gate)
const bySset = new Map();
for(const [cons,,,pos] of LEX){
  if(!String(pos||'').startsWith('n-pr')) continue;
  if(!isBib(cons)) continue;
  const ss=[...simpleSetOf(cons)].sort().join('');
  if(!bySset.has(ss)) bySset.set(ss,[]);
  bySset.get(ss).push({cons, len:cons.length, ms:[...motherSetOf(cons)].sort().join(''), gloss:glossOf(cons)});
}

// readers given occupied simples (Set) + available mothers (Set)
function readersFor(occ, moms){
  const out=[];
  for(const [ss,names] of bySset){
    const need=[...ss]; let ok=true;
    for(const l of need) if(!occ.has(l)){ok=false;break;}
    if(!ok) continue;
    for(const n of names){ if(n.ms.split('').every(m=>moms.has(m))) out.push({...n, s:need.length}); }
  }
  return out;
}

// ── load specials ──
const align=JSON.parse(readFileSync(new URL('../web/alignments.json',import.meta.url),'utf8'));
const all=[...align.scanA,...align.scanB];
const seen=new Set(); const specials=[];
for(const a of all){ if(a.maxInSign!==7) continue; if(seen.has(a.date)) continue; seen.add(a.date); specials.push(a); }

console.log('=== 7-planet specials: n =', specials.length, '===\n');

// ── 1. VERIFY: each special (1 sign) → exactly 1 mother? ──
let momCount={1:0,2:0,3:0,0:0};
const perSignMother={};
for(const a of specials){
  const s=a.sign; // the occupied sign (single for maxInSign===7)
  const moms=availableMothers([s]);
  momCount[moms.size]=(momCount[moms.size]||0)+1;
  perSignMother[s]=moms.size===1?[...moms][0]:('??'+moms.size);
}
console.log('=== VERIFY: mothers available per special (should be 1 each) ===');
console.log('  size distribution:', momCount);
console.log('  sign → mother:', perSignMother);
const allOne = Object.values(momCount).filter((_,i)=>i!==1).every(()=>false) && (momCount[1]===specials.length);
console.log('  → all specials have exactly 1 mother:', momCount[1]===specials.length, '\n');

// ── 2. RECALC readable names on specials WITH gate vs OLD (mothers-always) ──
let totOld=0, totNew=0, totOldLong=0, totNewLong=0;
const newLongAll=[]; // longest readable names under the gate
const droppedLong=[]; // long (≥5) names that WERE readable (mothers-always) but DROP under gate
for(const a of specials){
  const s=a.sign;
  const occ=new Set([SIMPLE[s]]);
  const moms=availableMothers([s]);
  // OLD: mothers always available (all 3)
  const old=readersFor(occ, new Set(['א','מ','ש']));
  // NEW: gated
  const neu=readersFor(occ, moms);
  totOld+=old.length; totNew+=neu.length;
  const oldLong=old.filter(n=>n.len>=5), newLong=neu.filter(n=>n.len>=5);
  totOldLong+=oldLong.length; totNewLong+=newLong.length;
  for(const n of newLong) newLongAll.push({...n, sign:s, mom:[...moms][0], date:a.date});
  const neuSet=new Set(neu.map(n=>n.cons));
  for(const n of oldLong){ if(!neuSet.has(n.cons)) droppedLong.push({...n, sign:s, mom:[...moms][0]}); }
}
console.log('=== readable biblical-proper names on specials: OLD (mothers-always) vs NEW (gated) ===');
console.log('  total readers  OLD:', totOld, ' NEW:', totNew, ' (dropped', totOld-totNew, ')');
console.log('  long (len≥5)   OLD:', totOldLong, ' NEW:', totNewLong, ' (dropped', totOldLong-totNewLong, ')');

// ── 3. THE FIVE CLAIMED LONGEST NAMES — do they survive? ──
const claimed=['ארתחששת','בית בירי','יושבשבת','מורשת גת','פרשנדתא']; // Artachshasta, Beth-Biri, Joshebbash-Shebeth, Moresheth-Gath, Parshandatha
console.log('\n=== the paper\'s five claimed longest names — survival under gate ===');
for(const c of claimed){
  const cons=c.replace(/ /g,'');
  const ss=[...simpleSetOf(cons)].sort().join('');
  const ms=[...motherSetOf(cons)].sort().join('');
  // on which sign would it be readable (old rule: its simple set must be a single sign's letter)
  let readableSign=null;
  for(const s of SIGNS_ES){ if(ss===[...new Set([SIMPLE[s]])].sort().join('')){ readableSign=s; break; } }
  let survives=false, availMom='-';
  if(readableSign){ const moms=availableMothers([readableSign]); availMom=[...moms].sort().join(''); survives=ms.split('').every(m=>moms.has(m)); }
  console.log(`  ${c.padEnd(12)} simples={${ss}} mothers={${ms||'∅'}} sign=${readableSign||'-'} zone-mom={${availMom}} → ${survives?'READABLE':'DROPS'}`);
}

// ── 4. NEW longest readable names under the gate (top 15) ──
console.log('\n=== NEW longest readable biblical-proper names on specials (gate, len≥5) — top 15 ===');
newLongAll.sort((a,b)=>b.len-a.len || a.cons.localeCompare(b.cons));
const shown=new Set();
let cnt=0;
for(const n of newLongAll){
  const k=n.cons;
  if(shown.has(k)) continue; shown.add(k);
  console.log(`  ${n.cons.padEnd(14)} len${n.len}  sign=${n.sign} mom=${n.mom}  simples={${[...simpleSetOf(n.cons)].sort().join('')}} mothers={${n.ms||'∅'}}  ${n.gloss}`);
  if(++cnt>=15) break;
}

// ── 5. long names that DROP under the gate (readable old, not new) ──
console.log('\n=== long (≥5) names that DROP under the gate (readable old, not new) — sample 15 ===');
droppedLong.sort((a,b)=>b.len-a.len);
const dshown=new Set(); let dc=0;
for(const n of droppedLong){ if(dshown.has(n.cons))continue; dshown.add(n.cons);
  console.log(`  ${n.cons.padEnd(14)} len${n.len}  sign=${n.sign} zone-mom=${n.mom}  mothers={${n.ms||'∅'}}  ${n.gloss}`);
  if(++dc>=15) break; }