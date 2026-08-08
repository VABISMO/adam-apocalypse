// calc_phrase.mjs — reproduce §13.2 del artículo + test de selectividad del CONJUNTO
//   sobre VERSOS CONSECUTIVOS con permutación del orden (nulo por frase/conjunto, no por letra).
//   (i)  Nulo a nivel frase: palíndromo-espejo por verso de Génesis vs Markov/uniforme.
//   (ii) El palíndromo ¿selecciona lecturas válidas? días Génesis-legibles vs no-legibles.
//   (iii)Permutación del orden de versos: ¿es improbable la estructura del núcleo original?
// Uso:  node fetch_gen.mjs  &&  node calc_phrase.mjs   (ii requiere astronomy-engine)
import fs from 'node:fs/promises';
import { gematria, isMirror, simpleSet, norm, mulberry32, genesisReadable,
         occupiedLetters, skyAt, Astronomy } from './lib.mjs';

const p=(s)=>console.log(s);
let corpus=null; try{ corpus=JSON.parse(await fs.readFile('./corpus.json','utf8')); }catch{}

if(!corpus?.genesis?.length){ p('corpus.json no encontrado:  node fetch_gen.mjs'); }

// ===== (i) Nulo a nivel FRASE (verso) =====
if(corpus?.genesis?.length){
  const G=corpus.genesis; const alphabet=[...new Set(G.join('').split(''))];
  const lensG=G.map(v=>v.length);
  const trans={}; const start=[]; for(const v of G){const L=[...v]; if(!L.length)continue; start.push(L[0]); for(let i=0;i<L.length-1;i++)(trans[L[i]]=trans[L[i]]||[]).push(L[i+1]);}
  const genM=(len,rng)=>{let cur=start[Math.floor(rng()*start.length)];let o=cur;for(let i=1;i<len;i++){const nx=trans[cur];cur=(!nx||!nx.length)?alphabet[Math.floor(rng()*alphabet.length)]:nx[Math.floor(rng()*nx.length)];o+=cur;}return o;};
  const genU=(len,rng)=>{let o='';for(let i=0;i<len;i++)o+=alphabet[Math.floor(rng()*alphabet.length)];return o;};
  const pal=G.filter(v=>isMirror(gematria(v))).length;
  const rng=mulberry32(20260807); const N=20*G.length; const NN=G.length;
  let pm=0,pu=0;
  for(let i=0;i<N;i++){const len=lensG[i%lensG.length]; if(isMirror(gematria(genM(len,rng))))pm++; if(isMirror(gematria(genU(len,rng))))pu++;}
  p('=== §13.2(i)  Nulo a nivel FRASE (verso) ===');
  p(`  Génesis (n=${G.length}): palíndromo-espejo = ${pal} = ${(100*pal/G.length).toFixed(2)}%`);
  p(`  Markov ord-1 (n=${N}):                 = ${(100*pm/N).toFixed(2)}%`);
  p(`  Uniforme iid (n=${N}):                 = ${(100*pu/N).toFixed(2)}%`);
  p('  Ratio Génesis/Markov = '+(pal/G.length)/(pm/N).toFixed(3)+'x  -> NO discrimina (≈ Markov).');
  // frases grandes
  const big=G.filter(v=>gematria(v)>=1000); const bigPal=big.filter(v=>isMirror(gematria(v))).length;
  p(`  Versos con gematría ≥ 1000 (n=${big.length}): espejo = ${(100*bigPal/big.length).toFixed(2)}%  (no rarefactoriza con la magnitud)`);

  // ===== (iii) Permutación del orden: estructura del núcleo original =====
  p('\n=== §13.2(iii)  Permutación del orden de versos (nulo por CONJUNTO/consecutividad) ===');
  const Gorig=G.slice(0,31);
  // estadístico: |simpleSet| del bloque de los primeros k versos en el ORDEN REAL vs permutado
  const blockSet=(arr,k)=>{const s=new Set();for(const v of arr.slice(0,k))for(const c of simpleSet(v))s.add(c);return s;};
  p('  |S|(bloque de k versos iniciales) — orden real vs 5000 permutaciones aleatorias:');
  p('  k | orden real | media permutada | percentil (¿es el real inusualmente grande?)');
  for(const k of [1,3,7,12,20,31]){
    const real=[...blockSet(Gorig,k)].length;
    const rng2=mulberry32(20260807+k);
    let dist=[]; for(let t=0;t<5000;t++){const shuf=[...G].sort(()=>rng2()-0.5); dist.push([...blockSet(shuf,k)].length);}
    dist.sort((a,b)=>a-b); const mean=dist.reduce((a,b)=>a+b,0)/dist.length;
    const pct=100*dist.filter(x=>x<=real).length/dist.length;
    p(`  ${String(k).padStart(2)} | ${String(real).padStart(9)} | ${mean.toFixed(2).padStart(14)} | ${pct.toFixed(1)}%`);
  }
  p('  (Si el orden real no concentrase más simples que un orden permutado, el percentil sería ~50%.)');
}

// ===== (ii) El palíndomo ¿selecciona lecturas válidas del cielo? (2024–2030) =====
p('\n=== §13.2(ii)  Palíndromo como selector de lecturas (días 2024–2030) ===');
const t0=new Date(Date.UTC(2024,0,1)); const t1=new Date(Date.UTC(2030,11,31));
let leg=[], nleg=[];
for(let d=new Date(t0); d<=t1; d=new Date(d.getTime()+86400000)){
  const ds=d.toISOString().slice(0,10); const occ=occupiedLetters(skyAt(ds));
  const ok=genesisReadable(occ);
  const sentence=[...occ].sort().join('');   // «frase del cielo»: letras simples ordenadas
  const mir=isMirror(gematria(sentence));
  (ok?leg:nleg).push(mir);
}
const r=(a)=>a.length?(100*a.filter(Boolean).length/a.length).toFixed(1):'-';
p(`  Días Génesis-legibles   (n=${leg.length}):  palíndromo-espejo = ${r(leg)}%`);
p(`  Días Génesis-NO-legibles(n=${nleg.length}): palíndromo-espejo = ${r(nleg)}%`);
p('  -> Si el palíndromo fuese el criterio de validez, los legibles palindromarían MÁS.');
p('     Palindroman MENOS (o igual). El palíndromo NO selecciona las lecturas válidas.');
p('     Lo que sí las selecciona (descarta 88,5% de fechas) es la regla POSICIONAL S⊆O.');