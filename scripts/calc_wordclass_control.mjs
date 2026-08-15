// calc_wordclass_control.mjs — THREAT A (preregistered adversarial replication).
// Is the §6.1 Null B ~7x enrichment SPECIFIC TO NAMES, or does ANY Hebrew word class
// show it (i.e. is it a general "real Hebrew words are more gate-readable than their
// anagrams" property, not name-design)?
//
// Method: split the lexicon into NAMES (n-pr*) and WORDS (everything else, len>=2).
// For each class, take the gated |S|=1 readable set on the 51 specials (verbatim gate
// from calc_null_by_tier.mjs), run the within-entry consonant-shuffle null with the
// class's OWN set as the collision target, and compare enrichments. Each class is
// internally normalized to its own null (same letters, same target set), so set-size /
// letter-distribution differences are handled. Also reported by length band, and as a
// length+|S|+mother MATCHED comparison.
//
//   Run:  node scripts/calc_wordclass_control.mjs
import { readFileSync } from 'node:fs';
import * as Astronomy from '../data/astronomy-engine.mjs';

// ── gate (verbatim core.jsx / calc_null_by_tier) ──
const SIGNS=['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const SIMP=['ה','ו','ז','ח','ט','י','ל','נ','ס','ע','צ','ק']; const SIMPSET=new Set(SIMP);
const MOTHERS=[['ש',38],['מ',89],['א',268]]; const MLET=new Set(MOTHERS.map(m=>m[0]));
const ang=(a,b)=>{let d=Math.abs(a-b)%360;return d>180?360-d:d;};
const nearestMother=si=>{const lon=si*30+15;let best=null,bd=Infinity;for(const[h,m] of MOTHERS){const d=ang(lon,m);if(d<bd){bd=d;best=h;}}return best;};
const availMaskOf=occIdx=>{let mask=0;for(const si of occIdx)mask|=(1<<({ש:0,מ:1,א:2}[nearestMother(si)]));return mask;};
const FIN={'ן':'נ','ץ':'צ','ך':'כ','ם':'מ','ף':'פ'};
const norm=s=>[...s].map(c=>FIN[c]||c).join('');
function daysInMonth(y,mo){if(mo===2)return(y%4===0&&(y%100!==0||y%400===0))?29:28;return[31,28,31,30,31,30,31,31,30,31,30,31][mo-1];}
function makeDate(y,mo,da,h=12){const d=new Date(Date.UTC(2000,mo-1,da,h,0,0));d.setUTCFullYear(y);return d;}
function parseDate(s){if(!s)return null;const m=/^(-?\d{1,5})-(\d{2})-(\d{2})$/.exec(s);if(!m)return null;const y=+m[1],mo=+m[2],da=+m[3];if(mo<1||mo>12||da<1||da>daysInMonth(y,mo))return null;const d=makeDate(y,mo,da);return isNaN(d.getTime())?null:d;}
const BODIES=['Saturn','Jupiter','Mars','Sun','Venus','Mercury','Moon'];
function skyAt7(s){if(!s)return[];const d=parseDate(s);if(!d)return[];return BODIES.map(b=>{const v=Astronomy.GeoVector(Astronomy.Body[b],d,true);const lon=Astronomy.Ecliptic(v).elon;let si=Math.floor(lon/30)%12;if(si<0)si+=12;return si;});}

// ── lexicon split: NAMES (n-pr*) vs WORDS (rest, len>=2) ──
const LEX=JSON.parse(readFileSync(new URL('../web/lexicon.json',import.meta.url),'utf8')).lexicon;
const isNamePos=p=>String(p||'').startsWith('n-pr');
const entries=LEX.map(([cons,,gloss,pos])=>{const c=norm(cons);
  const simples=[...new Set([...c].filter(ch=>SIMPSET.has(ch)))];
  const mothers=[...new Set([...c].filter(ch=>MLET.has(ch)))];
  return{c,cons,pos,isName:isNamePos(pos),simples,mothers,len:c.length};});
const NAMES=entries.filter(e=>e.isName);
const WORDS=entries.filter(e=>!e.isName && e.len>=2);
const nameSet=new Set(NAMES.map(e=>e.c));
const wordSet=new Set(WORDS.map(e=>e.c));
console.log(`lexicon: ${entries.length} entries — NAMES ${NAMES.length}, WORDS ${WORDS.length}`);

// ── 51 specials (tier 7) ──
const align=JSON.parse(readFileSync(new URL('../web/alignments.json',import.meta.url),'utf8'));
const ALL=[...align.scanA,...align.scanB];
const seen=new Set();const SPECIALS=[];
for(const a of ALL){if(a.maxInSign!==7)continue;if(seen.has(a.date))continue;seen.add(a.date);const occ=new Set(skyAt7(a.date));SPECIALS.push({date:a.date,occIdx:occ,moms:availMaskOf(occ)});}
console.log(`51 specials: ${SPECIALS.length}\n`);

// gated |S|=1 readable entries of a class on the specials (distinct)
function readableS1(classEntries){
  const out=new Map();
  for(const sp of SPECIALS){
    const occSimp=new Set([...sp.occIdx].map(i=>SIMP[i]));
    for(const n of classEntries){
      if(n.simples.length!==1)continue;
      if(!occSimp.has(n.simples[0]))continue;
      let mm=0;for(const ch of n.mothers)mm|=(1<<({ש:0,מ:1,א:2}[ch]));
      if((sp.moms&mm)!==mm)continue;  // name's mothers ⊆ available mothers
      if(!out.has(n.c))out.set(n.c,n);
    }
  }
  return [...out.values()];
}
const rNames=readableS1(NAMES);
const rWords=readableS1(WORDS);
console.log(`readable |S|=1 on 51 specials: NAMES ${rNames.length}, WORDS ${rWords.length}`);

// ── Null B: within-entry consonant shuffle, collision with the class's own set ──
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const NSEEDS=200;
const SEEDS=Array.from({length:NSEEDS},(_,i)=>20260815+i*101);
const pct=(arr,q)=>{const s=[...arr].sort((a,b)=>a-b);return s[Math.min(s.length-1,Math.floor(q*(s.length-1)))];};
function nullB(readable,targetSet){
  const real=readable.length;
  const totals=SEEDS.map(()=>0);
  for(let k=0;k<SEEDS.length;k++){
    const rnd=mulberry32(SEEDS[k]);let coll=0;
    for(const e of readable){const arr=[...e.c];for(let i=arr.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}if(targetSet.has(arr.join('')))coll++;}
    totals[k]=coll;
  }
  const mean=totals.reduce((a,b)=>a+b,0)/NSEEDS;
  return {real,mean,enr:real/mean,lo:real/pct(totals,0.975),hi:real/pct(totals,0.025)};
}
const nbNames=nullB(rNames,nameSet);
const nbWords=nullB(rWords,wordSet);
console.log(`\n══ Null B enrichment (real vs own-class anagram-collision floor) ══`);
console.log(`  NAMES: real ${nbNames.real}, null ${nbNames.mean.toFixed(2)}, enrichment ${nbNames.enr.toFixed(2)}×  [${nbNames.lo.toFixed(2)}, ${nbNames.hi.toFixed(2)}]`);
console.log(`  WORDS: real ${nbWords.real}, null ${nbWords.mean.toFixed(2)}, enrichment ${nbWords.enr.toFixed(2)}×  [${nbWords.lo.toFixed(2)}, ${nbWords.hi.toFixed(2)}]`);
console.log(`  (paper §6.1 reports NAMES 7.04× [5.11, 10.62], real 138, null 19.6)`);

// ── by length band ──
function nullBbyLen(readable,targetSet){
  const bands={};
  for(const e of readable){const b=e.len<=3?'L2-3':e.len<=4?'L4':e.len<=5?'L5':'L6+';
    if(!bands[b])bands[b]={arr:[]};bands[b].arr.push(e);}
  const out={};
  for(const [b,{arr}] of Object.entries(bands)){
    if(arr.length<3){out[b]={n:arr.length,skip:true};continue;}
    const r=nullB(arr,targetSet);
    out[b]={n:arr.length,real:r.real,mean:r.mean,enr:r.enr,lo:r.lo,hi:r.hi};
  }
  return out;
}
const byN=nullBbyLen(rNames,nameSet);
const byW=nullBbyLen(rWords,wordSet);
console.log(`\n══ by length band ══`);
console.log(`  band  | NAMES n  enrch        | WORDS n  enrch`);
for(const b of ['L2-3','L4','L5','L6+']){
  const n=byN[b],w=byW[b];
  const ns=n.skip?`  (n=${n.n})`:`${n.enr.toFixed(2)}× [${n.lo.toFixed(1)},${n.hi.toFixed(1)}] (n=${n.n})`;
  const ws=!w?`  —`:(w.skip?`  (n=${w.n})`:`${w.enr.toFixed(2)}× [${w.lo.toFixed(1)},${w.hi.toFixed(1)}] (n=${w.n})`);
  console.log(`  ${b.padEnd(5)} | ${ns.padEnd(28)}| ${ws}`);
}

// ── MATCHED comparison: same len + |S| + mother-set, name vs word ──
function matched(){
  // bucket readable words by (len, simples.join, mothers.sort.join)
  const bucket=new Map();
  for(const w of rWords){const k=`${w.len}|${w.simples.join(',')}|${[...w.mothers].sort().join(',')}`;
    if(!bucket.has(k))bucket.set(k,[]);bucket.get(k).push(w);}
  let matchedPairs=0,nameColl=0,wordColl=0;
  const SEED=20260815;const rnd=mulberry32(SEED);
  for(const n of rNames){const k=`${n.len}|${n.simples.join(',')}|${[...n.mothers].sort().join(',')}`;
    const cand=bucket.get(k);if(!cand||!cand.length)continue;const w=cand[Math.floor(rnd()*cand.length)];
    matchedPairs++;
    // shuffle name, check name-collision
    {const arr=[...n.c];for(let i=arr.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}if(nameSet.has(arr.join('')))nameColl++;}
    // shuffle word (same length/letters-structure), check word-collision
    {const arr=[...w.c];for(let i=arr.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}if(wordSet.has(arr.join('')))wordColl++;}
  }
  return {matchedPairs,nameColl,wordColl};
}
const m=matched();
console.log(`\n══ MATCHED (same len + same |S| simples + same mothers) ══`);
console.log(`  matched pairs: ${m.matchedPairs} (of ${rNames.length} readable names)`);
if(m.matchedPairs>0){
  console.log(`  name anagram-collision rate: ${(m.nameColl/m.matchedPairs).toFixed(3)} (${m.nameColl}/${m.matchedPairs})`);
  console.log(`  word  anagram-collision rate: ${(m.wordColl/m.matchedPairs).toFixed(3)} (${m.wordColl}/${m.matchedPairs})`);
  console.log(`  -> if name rate >> word rate, readability is NAME-specific (design); if ~equal, it is a Hebrew-word property.`);
}

// ── interpretation header ──
console.log(`\n══ INTERPRETATION ══`);
console.log(`  Null B enrichment is within-class (each class / its own anagram floor).`);
console.log(`  NAMES ${nbNames.enr.toFixed(2)}× vs WORDS ${nbWords.enr.toFixed(2)}×.`);
if(nbWords.enr>4)console.log(`  -> WORDS also strongly enriched: the ~7x is a general Hebrew-WORD property, NOT name-specific.`);
else if(nbWords.enr<2)console.log(`  -> WORDS NOT enriched: the ~7x is NAME-specific (design signal).`);
else console.log(`  -> WORDS moderately enriched: partial Hebrew-word effect; names still stronger.`);