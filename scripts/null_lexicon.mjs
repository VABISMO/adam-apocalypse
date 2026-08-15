// null_lexicon.mjs — Null B (lexicon letter-shuffle), reproducible. GATED.
// Protocol (notes/calc-probability-decomposition.md §7): shuffle consonants WITHIN each
// lexicon entry (preserves length, |S|, per-letter frequency), destroying name identity;
// count how many shuffled readable forms are themselves a biblical proper name (collision).
// Self-collisions (anagrammatically-fixed names — single letter / palindrome — that survive
// the shuffle) are INCLUDED: they are the chance-collision floor (names that cannot be
// destroyed by shuffling). N seeds × 12 |O|=1 conjunctions (one per zodiac sign = one per
// simple letter; the lit letter is the sign's simple, so the readable set is per-letter).
// PRNG: mulberry32, deterministic seeds (base + i, no Math.random). 200 seeds give a stable
// mean and a 95% CI on the enrichment, addressing the 5-seed variance objection.
//
// GEOMETRIC MOTHER-GATE (the real rule, §4/§7): on a single-sign grand conjunction exactly
// ONE mother is lit — the zone mother (the nearest circumpolar mother to that sign's ecliptic
// centre). A one-simple word reads on its sign's conjunction iff its mothers ⊆ {zoneMother}.
// Shuffling within an entry preserves the letter multiset, so a shuffled form keeps the same
// simples AND mothers → it stays gated-readable; only name identity is destroyed. (The
// pre-gate "mothers-always" rule gave the upper bound ~10.1× on 313 names; the gate is the
// rule the paper now reports.) Reproducible: `node scripts/null_lexicon.mjs`.
import { readFileSync } from 'node:fs';
const ROOT='/home/cryptocalypse/projects/articles/';
const FIN={'ן':'נ','ץ':'צ','ך':'כ','ם':'מ','ף':'פ'};
const norm=s=>[...s].map(c=>FIN[c]||c).join('');
const SIMP=['ה','ו','ז','ח','ט','י','ל','נ','ס','ע','צ','ק'];
const SIMPSET=new Set(SIMP);
// mothers: ש=Cassiopea 38°, מ=Ursa Minor 89°, א=Draco 268°. zoneMother(signIdx)=nearest mother.
const MOTHERS=[['ש',38],['מ',89],['א',268]]; const MLET=new Set(MOTHERS.map(m=>m[0]));
const ang=(a,b)=>{let d=Math.abs(a-b)%360;return d>180?360-d:d;};
const zoneMother=si=>{const lon=si*30+15;let best=null,bd=Infinity;for(const[h,m]of MOTHERS){const d=ang(lon,m);if(d<bd){bd=d;best=h;}}return best;};
const mulberry32=a=>function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};
const isBibPos=p=>String(p||'').startsWith('n-pr');
const LEX=JSON.parse(readFileSync(ROOT+'web/lexicon.json','utf8')).lexicon;
const entries=LEX.map(([cons,,gloss,pos])=>{const c=norm(cons);const simples=[...new Set([...c].filter(ch=>SIMPSET.has(ch)))];const mothers=[...new Set([...c].filter(ch=>MLET.has(ch)))];return{c,pos,isBib:isBibPos(pos),simples,mothers,len:c.length};});
const bibSet=new Set(entries.filter(e=>e.isBib).map(e=>e.c));
console.log('lexicon entries: '+entries.length+'  biblical proper (n-pr): '+bibSet.size);
const N=200;
const SEEDS=Array.from({length:N},(_,i)=>20260813+i*101);
const pct=(arr,q)=>{const s=[...arr].sort((a,b)=>a-b);return s[Math.min(s.length-1,Math.floor(q*(s.length-1)))];};
function run(minLen){
  let realTotal=0; const nullTotals=SEEDS.map(()=>0);
  for(let si=0;si<12;si++){
    const L=SIMP[si], zm=zoneMother(si);
    // gated readable bib names on this sign: one simple = L, mothers ⊆ {zm}, len>=minLen
    const readable=entries.filter(e=>e.isBib && e.simples.length===1 && e.simples[0]===L && e.mothers.every(m=>m===zm) && e.len>=minLen);
    realTotal+=readable.length;
    for(let k=0;k<SEEDS.length;k++){
      const rnd=mulberry32(SEEDS[k]+si*1000+minLen*7919);
      let coll=0;
      for(const e of readable){
        const arr=[...e.c];
        for(let i=arr.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}
        if(bibSet.has(arr.join(''))) coll++;   // collision (includes anagrammatically-fixed self)
      }
      nullTotals[k]+=coll;
    }
  }
  const mean=nullTotals.reduce((a,b)=>a+b,0)/N;
  const sd=Math.sqrt(nullTotals.reduce((a,b)=>a+(b-mean)*(b-mean),0)/N);
  const lo=pct(nullTotals,0.025), hi=pct(nullTotals,0.975);
  const enrMean=realTotal/mean, enrLo=realTotal/hi, enrHi=realTotal/lo; // inversion: low null -> high enrichment
  return {realTotal,mean,sd,lo,hi,enrMean,enrLo,enrHi};
}
for(const [label,minLen] of [['all (len>=1)',1],['len>=5',5]]){
  const r=run(minLen);
  console.log('\n=== Null B  ['+label+']  '+N+' seeds, 12 conjunctions ===');
  console.log('  real biblical proper readable:  '+r.realTotal);
  console.log('  null collisions:  mean='+r.mean.toFixed(2)+'  sd='+r.sd.toFixed(2)+'  95% CI ['+r.lo+', '+r.hi+']');
  console.log('  collapse (null/real):  '+(r.mean/r.realTotal).toFixed(4)+'x');
  console.log('  enrichment (real/null): '+r.enrMean.toFixed(2)+'x  95% CI ['+r.enrLo.toFixed(2)+', '+r.enrHi.toFixed(2)+']  above chance-collision floor');
}