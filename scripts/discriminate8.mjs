// discriminate8.mjs — COMPOUND-NAME discrimination rule from Sefer Raziel.
// Raziel p.65: "Divide el nombre Mem. Comienza la palabra y combina las letras, creando
// dos palabras" — a name is formed by combining two words. Biblical names are famously
// compounds (Bethel = בית+אל, Abdiel = עבד+אל, Mattithiah = מת+יה).
// TEST: are readable NAMES splittable into two lexicon sub-words more than readable
// non-names? Length-controlled. Plus theophoric-compound variant.
import { readFileSync } from 'node:fs';

const FIN2REG={'ן':'נ','ץ':'צ','ך':'כ','ם':'מ','ף':'פ'};
const norm=s=>[...s].map(c=>FIN2REG[c]||c).join('');
const DOC_SIMPLES=['ה','ו','ז','ח','ט','י','ל','נ','ס','ע','צ','ק'];
const simpleSet=new Set(DOC_SIMPLES);
// geometric mother-gate (§4/§7): a one-simple word reads on its sign's |O|=1 conjunction
// iff its mothers ⊆ {zoneMother}. Mothers: ש=38°, מ=89°, א=268°; zoneMother(signIdx)=nearest.
const MOTHERS=[['ש',38],['מ',89],['א',268]]; const MLET=new Set(MOTHERS.map(m=>m[0]));
const ang=(a,b)=>{let d=Math.abs(a-b)%360;return d>180?360-d:d;};
const zoneMother=si=>{const lon=si*30+15;let best=null,bd=Infinity;for(const[h,m]of MOTHERS){const d=ang(lon,m);if(d<bd){bd=d;best=h;}}return best;};
const mothersOf=c=>[...new Set([...c].filter(ch=>MLET.has(ch)))];

const lex=JSON.parse(readFileSync(new URL('../web/lexicon.json',import.meta.url),'utf8')).lexicon;
const LEXSET=new Set(lex.map(e=>norm(e[0])));
const isBibPos=pos=>String(pos||'').startsWith('n-pr');
const THEO=['אל','יה','בעל','יו','עשתר','דגון','כמוש','כמש','ענת','צדק','נבו','כוש','אשרה','שמש'];
const THEOSET=new Set(THEO);

const tagged=lex.map(([cons,,gloss,pos])=>{const c=norm(cons);const S=[...new Set([...c].filter(ch=>simpleSet.has(ch)))];return {c,cons,isName:isBibPos(pos),nS:S.length,len:c.length};});
// GATED readable sets: one simple AND mothers ⊆ {zoneMother(sign of that simple)}.
// (Pre-gate "mothers-always" gave 313 names / 1246 non-names at 3.26×; the gate is the rule
// the paper now reports — the readable-on-rare-conjunctions set, consistent with §7's 138.)
const gated = w => { if(w.nS!==1) return false; const si=DOC_SIMPLES.indexOf([...new Set([...w.c].filter(ch=>simpleSet.has(ch)))][0]); const ms=mothersOf(w.c); return ms.every(m=>m===zoneMother(si)); };
const readableNames=tagged.filter(w=>w.nS===1 && w.isName && gated(w));
const readableNon=tagged.filter(w=>w.nS===1 && !w.isName && gated(w));
const all=readableNames.concat(readableNon);

// compound: split c into two non-empty parts, both in LEXSET
function compound(c,minLen=1){
  for(let i=1;i<c.length;i++){
    const L=c.slice(0,i),R=c.slice(i);
    if(L.length>=minLen && R.length>=minLen && LEXSET.has(L) && LEXSET.has(R)) return {L,R,i};
  }
  return null;
}
// theophoric compound: one side is a god-name element, other side any lexicon word
function theoCompound(c){
  for(let i=1;i<c.length;i++){
    const L=c.slice(0,i),R=c.slice(i);
    if(L.length>=1 && R.length>=1 && LEXSET.has(L) && LEXSET.has(R)){
      if(THEOSET.has(L)||THEOSET.has(R)) return {L,R,i};
    }
  }
  return null;
}
function fisher(a,b,c,d){const n=a+b+c+d,r1=a+b,c1=a+c;const lg=Math.log,lf=k=>{let s=0;for(let i=2;i<=k;i++)s+=lg(i);return s;};const lc=(N,r)=>lf(N)-lf(r)-lf(N-r);const lh=aa=>lc(r1,aa)+lc(n-r1,c1-aa)-lc(n,c1);let pL=0,pM=0;const lo=Math.max(0,c1-(n-r1)),hi=Math.min(c1,r1);for(let k=lo;k<=hi;k++){const p=Math.exp(lh(k));if(k<=a)pL+=p;if(k>=a)pM+=p;}return Math.min(1,2*Math.min(pL,pM));}
function cmp(label,fn,namesArr,nonArr){
  const aN=namesArr.filter(w=>fn(w.c)).length, aNN=nonArr.filter(w=>fn(w.c)).length;
  const rN=aN/namesArr.length, rNN=aNN/nonArr.length, enr=rNN>0?rN/rNN:(rN>0?Infinity:1);
  const p=fisher(aN,namesArr.length-aN,aNN,nonArr.length-aNN);
  console.log(label.padEnd(44)+' names='+String(aN).padStart(4)+'/'+namesArr.length+' ('+(rN*100).toFixed(1)+'%)  non='+String(aNN).padStart(4)+'/'+nonArr.length+' ('+(rNN*100).toFixed(1)+'%)  enrich='+enr.toFixed(2)+'  p='+(p<1e-4?p.toExponential(2):p.toFixed(4)));
}

console.log('# COMPOUND-NAME rule (Raziel p.65: divide the name into two words)\n');
console.log('readable names: '+readableNames.length+'  readable non-names: '+readableNon.length+'\n');

console.log('══ 1. GENERIC compound (any split, both halves in lexicon, both >=1 letter) ══');
cmp('compound (both halves >=1 letter)',c=>!!compound(c,1),readableNames,readableNon);
console.log('══ 2. compound both halves >=2 letters (kills 1-letter false matches) ══');
cmp('compound (both halves >=2 letters)',c=>!!compound(c,2),readableNames,readableNon);
console.log('══ 3. THEOPHORIC compound (one half = god-name element) ══');
cmp('theophoric compound',c=>!!theoCompound(c),readableNames,readableNon);

console.log('\n══ 4. LENGTH CONTROL — generic compound (>=2), per length ══');
console.log('len | nN nNN | compound-rate names vs non-names  enrich');
for(const L of [3,4,5,6]){
  const nN=readableNames.filter(w=>w.len===L), nNN=readableNon.filter(w=>w.len===L);
  if(nN.length<15||nNN.length<15) continue;
  const cN=nN.filter(w=>compound(w.c,2)).length/nN.length;
  const cNN=nNN.filter(w=>compound(w.c,2)).length/nNN.length;
  console.log(' '+L+'  | '+String(nN.length).padStart(3)+' '+String(nNN.length).padStart(4)+' | '+(cN*100).toFixed(1)+'% vs '+(cNN*100).toFixed(1)+'%  '+(cNN>0?(cN/cNN).toFixed(2):'-')+'x');
}

console.log('\n══ 5. PRACTICAL FILTER — compound as name discriminator ══');
const base=readableNames.length/(readableNames.length+readableNon.length);
console.log('baseline purity: '+(base*100).toFixed(1)+'%');
function purity(fn){const k=all.filter(w=>fn(w.c));const nn=k.filter(w=>w.isName);return {kept:k.length,purity:nn.length/Math.max(1,k.length),names:nn.length};}
const f1=purity(c=>!!compound(c,2));
console.log('keep compound(>=2):  purity='+(f1.purity*100).toFixed(1)+'%  lift='+(f1.purity/base).toFixed(2)+'x  (kept '+f1.kept+', names '+f1.names+')');
const f2=purity(c=>!!theoCompound(c));
console.log('keep theo-compound:  purity='+(f2.purity*100).toFixed(1)+'%  lift='+(f2.purity/base).toFixed(2)+'x  (kept '+f2.kept+', names '+f2.names+')');

console.log('\n══ 6. EXAMPLES — readable names that are compounds, vs non-name compounds ══');
function show(arr,label,n){
  const cs=arr.filter(w=>compound(w.c,2)).slice(0,n);
  console.log(label);
  for(const w of cs){const cp=compound(w.c,2);console.log('  '+w.c+' = '+cp.L+' + '+cp.R+'   '+(w.isName?'NAME':'non-name'));}}
show(readableNames.filter(w=>compound(w.c,2)&&theoCompound(w.c)),'theophoric-compound NAMES:',12);
show(readableNon.filter(w=>compound(w.c,2)&&!theoCompound(w.c)),'non-theophoric-compound NON-NAMES:',12);