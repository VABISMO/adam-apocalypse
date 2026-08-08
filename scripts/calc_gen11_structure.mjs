// calc_gen11_structure.mjs — reproduce §15.4: estructura 37×73 de las 7 palabras de Génesis 1:1.
//   Hechos verificables:
//     • total = 2701 = 37×73 = T73 (triangular 73).  nº letras = 28 = T7.
//     • 7 palabras × 28 letras = 196 = 14².
//   La afirmación pendiente ("estructura 37×73 de las 7 palabras", citada como Jenkins)
//   la cerramos con un NULO RIGUROSO: conservamos el multiset de las 28 letras y las
//   longitudes de palabra (6,3,5,2,5,3,4), permutamos aleatoriamente las letras y
//   reagrupamos en 7 palabras. Medimos dos estadísticos:
//     (A) nº de las 7 sumas-palabra que son múltiplo de 37  (observado = 2).
//     (B) nº de subconjuntos no vacíos (de 2^7-1=127) que son múltiplo de 37 (observado = 23).
//   p-valor = fracción de permutaciones nulas que igualan o superan lo observado.
//   PRNG determinista mulberry32 (semilla 20260807). Uso: node calc_gen11_structure.mjs
import { GV, gematria, norm, mulberry32 } from './lib.mjs';
const p = (...a) => console.log(...a);

const gen11=['בראשית','ברא','אלהים','את','השמים','ואת','הארץ'];
const words=gen11.map(w=>norm(w));
const vals=words.map(w=>gematria(w));
const lengths=words.map(w=>[...w].length);                  // 6,3,5,2,5,3,4
const letters=[].concat(...words.map(w=>[...w].map(ch=>GV[ch]))); // 28 valores
const total=vals.reduce((a,b)=>a+b,0);

p('=== §15.4  Estructura 37×73 de las 7 palabras de Génesis 1:1 ===');
p('  palabras : '+gen11.join(' '));
p('  valores  : '+vals.join(', '));
p('  longitudes: '+lengths.join(', ')+'  (suma '+lengths.reduce((a,b)=>a+b,0)+' = 28)');
p(`  total    : ${total} = 37×73 = ${37*73}  (T73 = ${73*74/2}) ✓`);
p(`  nº letras: ${letters.length} = 28 = T7 (${7*8/2}) ;  7×28 = ${7*28} = 14² ✓`);

// estadístico observado
const multOf=(s,d)=>s%d===0;
let obsWords=0; for(const v of vals) if(multOf(v,37)) obsWords++;
const countSubset=(arr,div)=>{ let cnt=0; const n=arr.length;
  for(let mask=1;mask<(1<<n);mask++){ let s=0; for(let i=0;i<n;i++) if(mask&(1<<i)) s+=arr[i]; if(s%div===0) cnt++; } return cnt; };
const obsSub=countSubset(vals,37);
p(`  (A) sumas-palabra múltiplo de 37: ${obsWords}/7  (407=${407/37}×37, 296=${296/37}×37 — las 2 últimas)`);
p(`  (B) subconjuntos (127) múltiplo de 37: ${obsSub}  (azar uniforme ~${(127/37).toFixed(1)})`);

// ---------- nulo: permutar las 28 letras, reagrupar en longitudes fijas ----------
const N=100000, rng=mulberry32(20260807);
const shuffle=(a)=>{ const x=a.slice(); for(let i=x.length-1;i>0;i--){ const j=Math.floor(rng()*(i+1)); [x[i],x[j]]=[x[j],x[i]]; } return x; };
const groupSums=(perm)=>{ const sums=[]; let k=0; for(const len of lengths){ let s=0; for(let j=0;j<len;j++) s+=perm[k++]; sums.push(s);} return sums; };

let geWords=0, geSub=0;
let maxWords=0, maxSub=0;
const distWords={0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0};
for(let t=0;t<N;t++){
  const sums=groupSums(shuffle(letters));
  let w=0; for(const s of sums) if(multOf(s,37)) w++;
  distWords[w]=(distWords[w]||0)+1;
  if(w>=obsWords) geWords++;
  if(w>maxWords) maxWords=w;
  const sub=countSubset(sums,37);
  if(sub>=obsSub) geSub++;
  if(sub>maxSub) maxSub=sub;
}
p(`\n  --- Nulo: ${N} permutaciones del multiset de 28 letras, reagrupadas en longitudes (6,3,5,2,5,3,4) ---`);
p('  distribución de (A) nº de sumas-palabra múltiplo de 37:');
for(const k of[0,1,2,3,4,5,6,7]) if(distWords[k]) p(`     ${k}/7: ${distWords[k]}  (${(100*distWords[k]/N).toFixed(2)}%)`);
p(`  (A) observado ${obsWords}/7 :  p-valor = P(nulo ≥ ${obsWords}) = ${geWords}/${N} = ${(geWords/N).toExponential(2)}`);
p(`      máximo bajo el nulo = ${maxWords}/7`);
p(`  (B) observado ${obsSub} subconjuntos : p-valor = P(nulo ≥ ${obsSub}) = ${geSub}/${N} = ${(geSub/N).toExponential(2)}`);
p(`      máximo bajo el nulo = ${maxSub}`);

// conclusión
const pA=geWords/N, pB=geSub/N;
p('\n  --- Veredicto ---');
if(pB<0.01){
  p(`  El estadístico (B) ${obsSub} subconjuntos múltiplo de 37 es altamente improbable bajo el`);
  p(`  nulo (p≈${pB.toExponential(1)}): la partición de las 28 letras en estas 7 palabras está`);
  p(`  SESGADA hacia múltiplos de 37. La "estructura 37×73 de Jenkins" es empíricamente real`);
  p(`  más allá del hecho trivial total=2701=37×73. Asignatura cerrada ✓.`);
} else if(pB<0.05){
  p(`  El estadístico (B) da p≈${pB.toExponential(1)}: señal moderada. La estructura 37 está`);
  p(`  presente pero no abrumadoramente. Se reporta como hipótesis moderada.`);
} else {
  p(`  El estadístico (B) da p≈${pB.toExponential(1)}: NO significativo. La estructura 37×73`);
  p(`  se reduce al hecho trivial total=2701=37×73 (que es inevitable dado el texto).`);
  p(`  La afirmación de "estructura interlocking" NO se sostiene empíricamente.`);
}