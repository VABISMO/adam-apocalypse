// calc_phonotactic_null.mjs — THREAT A extension / protocol item 5e (Hebrew phonotactic null).
// Generate pseudo-Hebrew strings from a phonotactic model learned from the NAME corpus
// (unigram + bigram consonant transitions, final-letter rules, name length distribution),
// and compare (a) gated readability on the 51 specials and (b) compound-split rate vs
// REAL NAMES and REAL non-name WORDS. This asks: is the name structure above a
// phonotactically-valid CHANCE baseline, or do Hebrew-like strings already read/compound
// at the name rate?
//
// The compound test is the sharper one: real NAMES compound 25.4%, real non-name WORDS
// 6.4% (3.99x). Where do phonotactic pseudo-names land?
//
//   Run:  node scripts/calc_phonotactic_null.mjs [K=20000] [seed=1]
import { readFileSync } from 'node:fs';
import * as Astronomy from '../data/astronomy-engine.mjs';

const SIMP=['ה','ו','ז','ח','ט','י','ל','נ','ס','ע','צ','ק']; const SIMPSET=new Set(SIMP);
const MOTHERS=[['ש',38],['מ',89],['א',268]]; const MLET=new Set(MOTHERS.map(m=>m[0]));
const ang=(a,b)=>{let d=Math.abs(a-b)%360;return d>180?360-d:d;};
const nearestMother=si=>{const lon=si*30+15;let best=null,bd=Infinity;for(const[h,m] of MOTHERS){const d=ang(lon,m);if(d<bd){bd=d;best=h;}}return best;};
const FIN={'ן':'נ','ץ':'צ','ך':'כ','ם':'מ','ף':'פ'};            // final -> regular
const FINFORM={'נ':'ן','צ':'ץ','כ':'ך','מ':'ם','פ':'ף'};        // regular -> final
const norm=s=>[...s].map(c=>FIN[c]||c).join('');
function daysInMonth(y,mo){if(mo===2)return(y%4===0&&(y%100!==0||y%400===0))?29:28;return[31,28,31,30,31,30,31,31,30,31,30,31][mo-1];}
function makeDate(y,mo,da,h=12){const d=new Date(Date.UTC(2000,mo-1,da,h,0,0));d.setUTCFullYear(y);return d;}
function parseDate(s){if(!s)return null;const m=/^(-?\d{1,5})-(\d{2})-(\d{2})$/.exec(s);if(!m)return null;const y=+m[1],mo=+m[2],da=+m[3];if(mo<1||mo>12||da<1||da>daysInMonth(y,mo))return null;const d=makeDate(y,mo,da);return isNaN(d.getTime())?null:d;}
const BODIES=['Saturn','Jupiter','Mars','Sun','Venus','Mercury','Moon'];
function skyAt7(s){if(!s)return[];const d=parseDate(s);if(!d)return[];return BODIES.map(b=>{const v=Astronomy.GeoVector(Astronomy.Body[b],d,true);const lon=Astronomy.Ecliptic(v).elon;let si=Math.floor(lon/30)%12;if(si<0)si+=12;return si;});}

// ── lexicon ──
const LEX=JSON.parse(readFileSync(new URL('../web/lexicon.json',import.meta.url),'utf8')).lexicon;
const isNamePos=p=>String(p||'').startsWith('n-pr');
const NAMES=LEX.filter(e=>isNamePos(e[3])).map(e=>norm(e[0]));
const WORDS=LEX.filter(e=>!isNamePos(e[3]) && norm(e[0]).length>=2).map(e=>norm(e[0]));
const LEXSET=new Set(LEX.map(e=>norm(e[0])));
console.log(`NAMES ${NAMES.length}, WORDS ${WORDS.length}, LEXSET ${LEXSET.size}`);

// compound rule (verbatim discriminate8): split into two non-empty lexicon sub-words, each >=2
function isCompound(c){for(let i=2;i<=c.length-2;i++){if(LEXSET.has(c.slice(0,i))&&LEXSET.has(c.slice(i)))return true;}return false;}

// ── 51 specials ──
const align=JSON.parse(readFileSync(new URL('../web/alignments.json',import.meta.url),'utf8'));
const ALL=[...align.scanA,...align.scanB];
const seen=new Set();const SPECIALS=[];
for(const a of ALL){if(a.maxInSign!==7)continue;if(seen.has(a.date))continue;seen.add(a.date);const occ=new Set(skyAt7(a.date));
  let mask=0;for(const si of occ)mask|=(1<<({ש:0,מ:1,א:2}[nearestMother(si)]));SPECIALS.push({occIdx:occ,moms:mask});}
// distinct readable |S|=1 of a set on the specials
function readableS1(set){const out=new Map();for(const sp of SPECIALS){const occSimp=new Set([...sp.occIdx].map(i=>SIMP[i]));
  for(const c of set){const simp=[...new Set([...c].filter(ch=>SIMPSET.has(ch)))];if(simp.length!==1)continue;
    if(!occSimp.has(simp[0]))continue;let mm=0;for(const ch of c)if(MLET.has(ch))mm|=(1<<({ש:0,מ:1,א:2}[ch]));if((sp.moms&mm)!==mm)continue;
    if(!out.has(c))out.set(c,c);}}return [...out.keys()];}
const rNames=readableS1(NAMES), rWords=readableS1(WORDS);
const nameComp=rNames.filter(isCompound).length, wordComp=rWords.filter(isCompound).length;
console.log(`readable |S|=1: NAMES ${rNames.length} (compound ${nameComp} = ${(100*nameComp/rNames.length).toFixed(1)}%),  WORDS ${rWords.length} (compound ${wordComp} = ${(100*wordComp/rWords.length).toFixed(1)}%)`);
console.log(`  -> paper §6.2: 35/138 = 25.4% names vs 43/677 = 6.4% non-names = 3.99x\n`);

// ── phonotactic model learner + generator (parameterized by source corpus) ──
// learn unigram+bigram+length-hist from a source corpus, generate K pseudo-strings.
function buildModel(corpus){
  const LENHIST={};for(const c of corpus){const L=c.length;LENHIST[L]=(LENHIST[L]||0)+1;}
  const lenList=Object.keys(LENHIST).map(Number).sort((a,b)=>a-b);const lenCum=[];let t=0;const T=corpus.length;
  for(const L of lenList){t+=LENHIST[L];lenCum.push([L,t/T]);}
  const uni={};for(const c of corpus)for(const ch of c)uni[ch]=(uni[ch]||0)+1;
  const big={};for(const c of corpus)for(let i=0;i<c.length-1;i++){const k=c[i]+c[i+1];big[k]=(big[k]||0)+1;}
  const uniTot=Object.values(uni).reduce((a,b)=>a+b,0);
  const uniKeys=Object.keys(uni),uniCum=[];let u=0;for(const k of uniKeys){u+=uni[k];uniCum.push([k,u/uniTot]);}
  return {lenCum,lenList,uni,big,uniKeys,uniCum};
}
function genFrom(model,rng){
  const sampleLen=()=>{const r=rng();for(const [L,p] of model.lenCum)if(r<=p)return L;return model.lenList[model.lenList.length-1];};
  const nextAfter=prev=>{const cands=[];let tot=0;for(const k in model.big)if(k[0]===prev){cands.push([k[1],model.big[k]]);tot+=model.big[k];}
    if(!cands.length){const r=rng();for(const [k,p] of model.uniCum)if(r<=p)return k;return model.uniKeys[0];}
    let r=rng()*tot;for(const [ch,w] of cands){r-=w;if(r<=0)return ch;}return cands[cands.length-1][0];};
  return ()=>{const L=sampleLen();let s=``;{const r=rng();for(const [k,p] of model.uniCum)if(r<=p){s=k;break;}}
    for(let i=1;i<L;i++)s+=nextAfter(s[s.length-1]);
    const last=s[s.length-1];if(FINFORM[last]&&rng()<0.25)s=s.slice(0,-1)+FINFORM[last];return s;};
}
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const K=parseInt((process.argv.find(a=>a.startsWith('K='))||'K=20000').slice(2),10);
const SEED=parseInt((process.argv.find(a=>a.startsWith('seed='))||'seed=1').slice(5),10);

// learn three models: from NAMES, from WORDS, from ALL lexicon (independent of the test set where possible)
const ALLLEX=LEX.map(e=>norm(e[0])).filter(c=>c.length>=2);
const mNames=buildModel(NAMES), mWords=buildModel(WORDS), mAll=buildModel(ALLLEX);

function run(label,model){
  const rng=mulberry32(SEED);const gen=genFrom(model,rng);
  const pseudo=[];for(let i=0;i<K;i++)pseudo.push(gen());
  const uniq=[...new Set(pseudo)];
  const rP=readableS1(uniq);
  const compR=rP.filter(isCompound).length;
  const compAll=uniq.filter(isCompound).length;
  return {uniq,readable:rP.length,compR,compAll};
}
const gN=run('NAMES-phon',mNames), gW=run('WORDS-phon',mWords), gA=run('ALL-phon',mAll);

console.log(`generated K=${K} each (seed=${SEED}); distinct: NAMES-phon ${gN.uniq.length}, WORDS-phon ${gW.uniq.length}, ALL-phon ${gA.uniq.length}\n`);
console.log(`══ COMPOUND RATE — READABLE |S|=1 on the 51 specials (the §6.2 setup) ══`);
console.log(`  REAL NAMES           : ${nameComp}/${rNames.length} = ${(100*nameComp/rNames.length).toFixed(1)}%   (paper 25.4%)`);
console.log(`  REAL WORDS (non-name): ${wordComp}/${rWords.length} = ${(100*wordComp/rWords.length).toFixed(1)}%   (paper 6.4%)`);
console.log(`  PSEUDO names-phon    : ${gN.compR}/${gN.readable} = ${gN.readable?(100*gN.compR/gN.readable).toFixed(1):'n/a'}%`);
console.log(`  PSEUDO words-phon    : ${gW.compR}/${gW.readable} = ${gW.readable?(100*gW.compR/gW.readable).toFixed(1):'n/a'}%`);
console.log(`  PSEUDO all-phon      : ${gA.compR}/${gA.readable} = ${gA.readable?(100*gA.compR/gA.readable).toFixed(1):'n/a'}%`);
console.log(`\n══ COMPOUND RATE — ALL strings (not gated) ══`);
const nameCompAll=NAMES.filter(isCompound).length, wordCompAll=WORDS.filter(isCompound).length;
console.log(`  REAL NAMES           : ${nameCompAll}/${NAMES.length} = ${(100*nameCompAll/NAMES.length).toFixed(1)}%`);
console.log(`  REAL WORDS           : ${wordCompAll}/${WORDS.length} = ${(100*wordCompAll/WORDS.length).toFixed(1)}%`);
console.log(`  PSEUDO names-phon    : ${gN.compAll}/${gN.uniq.length} = ${(100*gN.compAll/gN.uniq.length).toFixed(2)}%`);
console.log(`  PSEUDO words-phon    : ${gW.compAll}/${gW.uniq.length} = ${(100*gW.compAll/gW.uniq.length).toFixed(2)}%`);
console.log(`  PSEUDO all-phon      : ${gA.compAll}/${gA.uniq.length} = ${(100*gA.compAll/gA.uniq.length).toFixed(2)}%`);
console.log(`\n══ READABILITY (|S|=1 on specials) ══`);
console.log(`  PSEUDO names-phon: ${gN.readable}/${gN.uniq.length} = ${(100*gN.readable/gN.uniq.length).toFixed(2)}%`);
console.log(`  PSEUDO words-phon: ${gW.readable}/${gW.uniq.length} = ${(100*gW.readable/gW.uniq.length).toFixed(2)}%`);
console.log(`  PSEUDO all-phon  : ${gA.readable}/${gA.uniq.length} = ${(100*gA.readable/gA.uniq.length).toFixed(2)}%`);
console.log(`\n  DECISIVE: if WORDS-phon / ALL-phon pseudo-Hebrew compounds ~6.4% (word baseline), the 3.99x`);
console.log(`  name lift is a genuine NAME-phonotactic effect. If they compound ~20-25% (near names), the`);
console.log(`  compound rate is a general Hebrew-phonotactic property and the 3.99x is not name-design.`);