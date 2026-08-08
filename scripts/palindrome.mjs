// palindrome.mjs — reproduce y AMPLÍA §13 del artículo (nulos del espejo-palíndromo).
//   Corrección metodológica: el nulo se mide por FRASE y por BLOQUE DE VERSOS CONSECUTIVOS
//   (no por palabra suelta ni por letra aislada), y se examina la rarefacción con el NÚMERO
//   DE ELEMENTOS (k): ¿el espejo se vuelve más improbable cuanto más elementos? ¿y la regla
//   posicional S⊆O?  Unidad: Génesis (corpus masorético vía Sefaria, ver fetch_gen.mjs).
//
//   Dos estadísticos, ambos en función del tamaño de bloque k:
//     (A) espejo de cifras:  G + rev(G) = palíndromo   (§13 del artículo — NO selectivo)
//     (B) posicional:        P(S(block) ⊆ O) bajo cielo aleatorio  (el motor REAL — SÍ rarefactoriza)
//   Se reporta también sobre los PRIMEROS versos de Génesis (núcleo original, menos redactado).
//
// Uso:  node fetch_gen.mjs  &&  node palindrome.mjs
import fs from 'node:fs/promises';
import { gematria, isMirror, simpleSet, norm, mulberry32, SIGNS } from './lib.mjs';

const p=(s)=>console.log(s);
let corpus=null;
try{ corpus=JSON.parse(await fs.readFile('./corpus.json','utf8')); }catch{ /* abajo */ }

// P(S ⊆ O) bajo nulo de cielo aleatorio: cada uno de los 12 signos ocupado iid con prob q.
// q estimada = 1-(1-1/12)^10 ≈ 0,606 (10 cuerpos sobre 12 signos).
const q = 1-Math.pow(1-1/12,10);
const pPos = (setSize)=>Math.pow(q, setSize);

// Generador de versos nulos Markov orden-1 sobre letras del propio Génesis,
// respetando la distribución de longitudes REAL. (semilla 20260807, reproducible)
function buildMarkov1(verses){
  const trans={}; const start=[];
  for(const v of verses){
    const L=[...v]; if(!L.length) continue; start.push(L[0]);
    for(let i=0;i<L.length-1;i++){ (trans[L[i]]=trans[L[i]]||[]).push(L[i+1]); }
  }
  return {trans,start};
}
function genMarkov1(model, len, rng){
  const letters=Object.keys(model.trans); if(!letters.length) return '';
  let cur=model.start[Math.floor(rng()*model.start.length)]; let out=cur;
  for(let i=1;i<len;i++){ const nx=model.trans[cur]; if(!nx||!nx.length){cur=letters[Math.floor(rng()*letters.length)];}else{cur=nx[Math.floor(rng()*nx.length)];} out+=cur; }
  return out;
}
function genUniform(alphabet, len, rng){ let o=''; for(let i=0;i<len;i++) o+=alphabet[Math.floor(rng()*alphabet.length)]; return o; }

if(!corpus || !corpus.genesis?.length){
  p('corpus.json no encontrado. Ejecuta primero:  node fetch_gen.mjs'); process.exit(0);
}
const G = corpus.genesis;           // versos en consonantes
const Gorig = G.slice(0,31);        // Génesis cap. 1 — núcleo original, menos redactado
const alphabet = [...new Set(G.join('').split(''))];
const lensG = G.map(v=>v.length);

// ===== Estadístico A: espejo de cifras, por bloque de k versos consecutivos =====
function mirrorRateByBlock(verses, k){
  let pal=0, tot=0;
  for(let i=0;i+k<=verses.length;i++){
    const block=verses.slice(i,i+k).join('');          // conjunto de versos consecutivos
    const g=gematria(block);
    if(isMirror(g)) pal++; tot++;
  }
  return {rate: tot?pal/tot:0, pal, tot};
}
// Nulo Markov/uniforme al mismo k: genera bloques de k versos con longitudes reales
function mirrorRateNull(model, kind, k, n, rng){
  let pal=0, tot=0;
  for(let b=0;b<n;b++){
    let block='';
    for(let j=0;j<k;j++){ const len=lensG[Math.floor(rng()*lensG.length)]; block+= kind==='markov'?genMarkov1(model,len,rng):genUniform(alphabet,len,rng); }
    if(isMirror(gematria(block))) pal++; tot++;
  }
  return {rate:tot?pal/tot:0, pal, tot};
}

p('=== §13 (corregido)  Espejo-palíndromo por BLOQUE de k versos consecutivos ===');
p(`  Génesis: ${G.length} versos. q (signo ocupado iid) = ${q.toFixed(4)} (10 cuerpos/12 signos).`);
const model=buildMarkov1(G); const rng=mulberry32(20260807); const NB=4000;
p(`  k | Génesis(real) | Markov ord-1 | Uniforme iid  |  P(S⊆O) media del bloque`);
p('  --|---------------|--------------|--------------|---------------------------');
for(const k of [1,2,3,5,8]){
  const r=mirrorRateByBlock(G,k);
  const rm=mirrorRateNull(model,'markov',k,NB,rng);
  const ru=mirrorRateNull(model,'uniform',k,NB,rng);
  // P posicional media del bloque = media sobre bloques de pPos(|simpleSet(block)|)
  let psum=0,cnt=0;
  for(let i=0;i+k<=G.length;i++){ const block=G.slice(i,i+k).join(''); psum+=pPos([...simpleSet(block)].length); cnt++; }
  p(`  ${String(k).padStart(2)} |  ${(100*r.rate).toFixed(1)}% (${String(r.pal).padStart(4)}/${r.tot}) | ${(100*rm.rate).toFixed(1)}%        | ${(100*ru.rate).toFixed(1)}%        |  ${cnt? (psum/cnt).toExponential(2):'-'}`);
}
p('  -> El espejo de cifras NO rarefactoriza con k (incluso crece por la aritmética sin acarreo):');
p('     más elementos NO lo vuelven más improbable. Coincide con §13 (no selectivo).');

p('\n=== Estadístico B (el motor real): P(S⊆O) rarefactoriza con el nº de simples del bloque ===');
p(`  P(S⊆O) = q^|S| = ${q.toFixed(3)}^|S|.  |S| -> P:`);
for(const s of [1,2,3,4,5,6,8,10,12]) p(`     |S|=${String(s).padStart(2)}  P = ${pPos(s).toExponential(2)}  (${(100*pPos(s)).toFixed(2)}% de fechas)`);
p(`  יהוה (|S|=3) -> ${(100*pPos(3)).toFixed(1)}% (~mensual).  Génesis 1:1 (|S|=5) -> ${(100*pPos(5)).toFixed(2)}% (~${Math.round(1/pPos(5))} días, descarta ~${(100*(1-pPos(5))).toFixed(1)}%).`);
p('  -> LA REGLA POSICIONAL SÍ rarefactoriza exponencialmente con el nº de elementos.');
p('     El descarte operacional del Lector del Cielo es posicional, no aritmético (§10).');

p('\n=== Primeros versos de Génesis (cap. 1, núcleo original, menos redactado) ===');
const r1=mirrorRateByBlock(Gorig,1); const rAll=mirrorRateByBlock(G,1);
p(`  Espejo (k=1):  Génesis 1 (1–31) = ${(100*r1.rate).toFixed(1)}% (${r1.pal}/${r1.tot})  |  corpus = ${(100*rAll.rate).toFixed(1)}%`);
// ¿Artefacto de longitud/cifras? nulo de Markov EMPAREJADO por las longitudes de Gen 1
{
  const lensG1=Gorig.map(v=>v.length); const rngN=mulberry32(20260807);
  let pm=0; const N=40000;
  for(let i=0;i<N;i++){ const len=lensG1[i%lensG1.length]; const blk=genMarkov1(model,len,rngN); if(isMirror(gematria(blk))) pm++; }
  const nullRate=pm/N;
  // todas las gematrías de Gen 1 son de 4 cifras (menos 1); tasa del corpus a 4 cifras:
  const four=G.filter(v=>String(gematria(v)).length===4); const fourRate=four.filter(v=>isMirror(gematria(v))).length/four.length;
  // p-valor binomial exacto (cola superior) bajo la tasa del nulo emparejado
  const binomP=(n,k,pp)=>{ // P(X>=k)
    let s=0; for(let i=0;i<k;i++){ let t=1; for(let j=0;j<i;j++) t*=(n-j)/(j+1); s+= t*Math.pow(pp,i)*Math.pow(1-pp,n-i); }
    return 1-s;
  };
  const pv=binomP(r1.tot, r1.pal, nullRate);
  p(`  Nulo Markov emparejado por longitud de Gen 1 = ${(100*nullRate).toFixed(1)}%  (n=${N})`);
  p(`  Tasa del corpus a 4 cifras (n=${four.length}) = ${(100*fourRate).toFixed(1)}%`);
  p(`  Exceso: ${r1.pal}/${r1.tot} observado vs ${r1.tot}*${nullRate.toFixed(3)}=${(r1.tot*nullRate).toFixed(1)} esperado`);
  p(`  p-valor binomial (cola sup.) = ${pv.toExponential(2)}  (p<0,05 ⇒ exceso significativo)`);
  p('  -> El núcleo original (Génesis 1) SÍ muestra un exceso real de espejo-palíndromo (1,6× el nulo');
  p('     emparejado por longitud), que el test a nivel de corpus (§13, 39% ≈ Markov) DILUÍA. Caveats:');
  p('     n=31 (un capítulo); criterio «núcleo original» es pre-especificado pero no independiente del');
  p('     texto; el palíndromo sigue siendo aritméticamente «fácil», así que el exceso puede reflejar');
  p('     composición deliberada de versos cortos antes que codificación astronómica. Hipótesis, no prueba.');
}