// calc_threat_b_jongeling.mjs — THREAT B (preregistered adversarial replication).
// Independent NW-Semitic name corpus the author never used: Jongeling 1994,
// North African Names from Latin Sources (punic.co.uk), parsed reconstructions.
// Question: do the §6.1 Null B ~7x and §6.2 compound ~25% survive on an INDEPENDENT
// Semitic onomasticon, or are they a Bible-specific / Hebrew-lexicon artifact?
//
// FAIR cross-corpus test = Null B (within-entry consonant shuffle, collision with the
// corpus's OWN set). Compound is NOT fair across corpora (it splits against the HEBREW
// lexicon, so a Punic compound won't match Hebrew sub-words by construction) — reported
// only as a caveated sanity check, plus an intra-corpus compound (split into two
// Jongeling-set strings).
//
//   Run:  node scripts/calc_threat_b_jongeling.mjs
import { readFileSync } from 'node:fs';
import * as Astronomy from '../data/astronomy-engine.mjs';

// ── gate (verbatim) ──
const SIMP=['ה','ו','ז','ח','ט','י','ל','נ','ס','ע','צ','ק']; const SIMPSET=new Set(SIMP);
const MOTHERS=[['ש',38],['מ',89],['א',268]]; const MLET=new Set(MOTHERS.map(m=>m[0]));
const ang=(a,b)=>{let d=Math.abs(a-b)%360;return d>180?360-d:d;};
const nearestMother=si=>{const lon=si*30+15;let best=null,bd=Infinity;for(const[h,m]of MOTHERS){const d=ang(lon,m);if(d<bd){bd=d;best=h;}}return best;};
const MOTHERBIT={'ש':0,'מ':1,'א':2};
function daysInMonth(y,mo){if(mo===2)return(y%4===0&&(y%100!==0||y%400===0))?29:28;return[31,28,31,30,31,30,31,31,30,31,30,31][mo-1];}
function makeDate(y,mo,da,h=12){const d=new Date(Date.UTC(2000,mo-1,da,h,0,0));d.setUTCFullYear(y);return d;}
function parseDate(s){if(!s)return null;const m=/^(-?\d{1,5})-(\d{2})-(\d{2})$/.exec(s);if(!m)return null;const y=+m[1],mo=+m[2],da=+m[3];if(mo<1||mo>12||da<1||da>daysInMonth(y,mo))return null;const d=makeDate(y,mo,da);return isNaN(d.getTime())?null:d;}
const BODIES=['Saturn','Jupiter','Mars','Sun','Venus','Mercury','Moon'];
function skyAt7(s){if(!s)return[];const d=parseDate(s);if(!d)return[];return BODIES.map(b=>{const v=Astronomy.GeoVector(Astronomy.Body[b],d,true);const lon=Astronomy.Ecliptic(v).elon;let si=Math.floor(lon/30)%12;if(si<0)si+=12;return si;});}

// ── load Jongeling reconstructions, map transliteration -> Hebrew consonants ──
const JONG=JSON.parse(readFileSync(new URL('../library/phoenician-names/jongeling_north_african_names.json',import.meta.url),'utf8'));
// transliteration -> Hebrew. mothers: aleph/shin/mem. simples per documented gate.
const T2H={'ᵓ':'א','ʾ':'א','ʼ':'א','ᶜ':'ע','ʿ':'ע','š':'ש','ṭ':'ט','ḥ':'ח','ṣ':'צ',
  'b':'ב','g':'ג','d':'ד','h':'ה','w':'ו','z':'ז','y':'י','k':'כ','l':'ל',
  'm':'מ','n':'נ','s':'ס','p':'פ','q':'ק','r':'ר','t':'ת'};
const ALLHEB=new Set([...SIMP,...MOTHERS.map(m=>m[0]),'ב','ג','ד','כ','פ','ר','ת']);
function toHeb(s){
  if(!s)return '';
  let out='';
  for(const ch of s.toLowerCase()){
    if(ch in T2H)out+=T2H[ch];
    // else: vowel / space / bracket / punctuation -> dropped
  }
  return out;
}
const forms=new Set();
let nReconEntries=0,nFormsMapped=0,nPartialDropped=0;
for(const e of JONG){
  if(!e.reconstructions||!e.reconstructions.length)continue;
  nReconEntries++;
  for(const r of e.reconstructions){
    const h=toHeb(r);
    if(!h)continue;
    if([...h].every(c=>ALLHEB.has(c))){forms.add(h);nFormsMapped++;}
    else nPartialDropped++;
  }
}
const JSET=[...forms].filter(h=>h.length>=2);
const JSETset=new Set(JSET);
console.log(`Jongeling: ${JONG.length} entries, ${nReconEntries} with reconstructions,`);
console.log(`  ${nFormsMapped} forms mapped cleanly (${nPartialDropped} partial/unmappable dropped), ${JSET.length} distinct Hebrew forms len>=2`);

// ── biblical NAMES + lexicon (for the comparison + Hebrew-lexicon compound) ──
const LEX=JSON.parse(readFileSync(new URL('../web/lexicon.json',import.meta.url),'utf8')).lexicon;
const isNamePos=p=>String(p||'').startsWith('n-pr');
const FIN={'ן':'נ','ץ':'צ','ך':'כ','ם':'מ','ף':'פ'};
const norm=s=>[...s].map(c=>FIN[c]||c).join('');
const NAMES=LEX.filter(e=>isNamePos(e[3])).map(e=>norm(e[0]));
const LEXSET=new Set(LEX.map(e=>norm(e[0])));
const nameSet=new Set(NAMES);

// ── 51 specials ──
const align=JSON.parse(readFileSync(new URL('../web/alignments.json',import.meta.url),'utf8'));
const ALL=[...align.scanA,...align.scanB];
const seen=new Set();const SPECIALS=[];
for(const a of ALL){if(a.maxInSign!==7)continue;if(seen.has(a.date))continue;seen.add(a.date);const occ=new Set(skyAt7(a.date));
  let mask=0;for(const si of occ)mask|=(1<<MOTHERBIT[nearestMother(si)]);SPECIALS.push({occIdx:occ,moms:mask});}
console.log(`51 specials: ${SPECIALS.length}\n`);

// gated |S|=1 readable distinct strings of a set on the specials
function readableS1(set){
  const out=new Set();
  for(const sp of SPECIALS){
    const occSimp=new Set([...sp.occIdx].map(i=>SIMP[i]));
    for(const c of set){
      const simp=[...new Set([...c].filter(ch=>SIMPSET.has(ch)))];
      if(simp.length!==1)continue;
      if(!occSimp.has(simp[0]))continue;
      let mm=0;for(const ch of c)if(MLET.has(ch))mm|=(1<<MOTHERBIT[ch]);
      if((sp.moms&mm)!==mm)continue;
      out.add(c);
    }
  }
  return [...out];
}
const rJ=readableS1(JSET);
const rN=readableS1(NAMES);
console.log(`readable |S|=1 on 51 specials:  PUNIC(Jongeling) ${rJ.length},  BIBLICAL NAMES ${rN.length} (paper 138)`);

// ── Null B: within-entry consonant shuffle, collision with the corpus's OWN set ──
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const NSEEDS=parseInt(process.argv[2],10)||200;
const SEEDS=Array.from({length:NSEEDS},(_,i)=>20260815+i*101);
const pct=(arr,q)=>{const s=[...arr].sort((a,b)=>a-b);return s[Math.min(s.length-1,Math.floor(q*(s.length-1)))];};
function nullB(readable,targetSet,label){
  const real=readable.length;
  if(real===0){console.log(`  ${label}: no readable entries — Null B undefined`);return null;}
  const totals=SEEDS.map(()=>0);
  for(let k=0;k<SEEDS.length;k++){
    const rnd=mulberry32(SEEDS[k]);let coll=0;
    for(const c of readable){const arr=[...c];for(let i=arr.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}if(targetSet.has(arr.join('')))coll++;}
    totals[k]=coll;
  }
  const mean=totals.reduce((a,b)=>a+b,0)/NSEEDS;
  const r={real,mean,enr:real/mean,lo:real/pct(totals,0.975),hi:real/pct(totals,0.025),label};
  console.log(`  ${label}: real ${r.real}, null ${r.mean.toFixed(2)}, enrichment ${r.enr.toFixed(2)}x  [${r.lo.toFixed(2)}, ${r.hi.toFixed(2)}]`);
  return r;
}
console.log(`\n══ Null B enrichment (real readable vs own-corpus anagram-collision floor) ══`);
const nbJ=nullB(rJ,JSETset,'PUNIC  ');
const nbN=nullB(rN,nameSet,'BIBLICAL');

// ── compound (caveated): split into two Hebrew-lexicon words; + intra-corpus split ──
function isCompoundIn(c,targetSet){for(let i=2;i<=c.length-2;i++){if(targetSet.has(c.slice(0,i))&&targetSet.has(c.slice(i)))return true;}return false;}
const compJ_heb=rJ.filter(c=>isCompoundIn(c,LEXSET)).length;
const compN_heb=rN.filter(c=>isCompoundIn(c,LEXSET)).length;
const compJ_intra=rJ.filter(c=>isCompoundIn(c,JSETset)).length;
console.log(`\n══ compound rate (readable |S|=1) ══`);
console.log(`  PUNIC vs HEBREW lexicon : ${compJ_heb}/${rJ.length} = ${rJ.length?(100*compJ_heb/rJ.length).toFixed(1):'n/a'}%   [BIASED LOW: Punic compounds don't match Hebrew sub-words by construction]`);
console.log(`  PUNIC intra-corpus      : ${compJ_intra}/${rJ.length} = ${rJ.length?(100*compJ_intra/rJ.length).toFixed(1):'n/a'}%   [split into two OTHER Jongeling-set strings]`);
console.log(`  BIBLICAL vs HEBREW lex  : ${compN_heb}/${rN.length} = ${(100*compN_heb/rN.length).toFixed(1)}%   (paper 25.4%)`);

// ── verdict ──
console.log(`\n══ VERDICT (Threat B — independent Punic corpus) ══`);
if(nbJ&&nbN){
  console.log(`  Null B: PUNIC ${nbJ.enr.toFixed(2)}x vs BIBLICAL ${nbN.enr.toFixed(2)}x (paper ~7x).`);
  if(nbJ.enr>4)console.log(`  -> INDEPENDENT corpus ALSO strongly enriched: the ~7x is a general Semitic-name property, NOT Bible-specific.`);
  else if(nbJ.enr<2)console.log(`  -> INDEPENDENT corpus NOT enriched: biblical names are specifically non-random (Bible-specific signal).`);
  else console.log(`  -> INDEPENDENT corpus moderately enriched: partial general-Semitic effect; biblical still stronger.`);
  console.log(`  CAVEAT: Punic set is small (n=${rJ.length} readable) -> wide CI; reconstructions are a subset of a mixed-origin`);
  console.log(`  North-African corpus, not the full Phoenician homeland onomasticon (Kikuchi 1963, the gold corpus, is OCR-blocked).`);
}