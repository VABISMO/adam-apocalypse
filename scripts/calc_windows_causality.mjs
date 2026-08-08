// calc_windows_causality.mjs — reproduce §15.7: cerrar la "causalidad de las 6 ventanas".
//   §12 encuentra 6 ventanas astronómicas (Neptuno∈Aries ∧ Plutón∈Acuario, ~491 a de
//   separación = sinódico Neptuno–Plutón) y lista 6 correlatos histórico-religiosos.
//   Pendiente: ¿es causal o coincidencia? Cerramos con dos tests + la advertencia honesta:
//     (A) La cadencia: calcular los espaciamientos de las 6 ventanas y de los 6 eventos
//         históricos. Si ambos ~491 a, comparten cadencia (observación, no causa).
//     (B) La regularidad: bajo un nulo de 6 puntos uniformes en el mismo rango, ¿cuál es
//         la probabilidad de que los 5 espaciamientos sean TAN regulares como lo observado?
//         (estadístico = suma de |espac_i − media|).
//   ADVERTENCIA DE SESGO DE SELECCIÓN explícita: los 6 eventos fueron elegidos para encajar
//   en la rejilla; n=6 es pequeño. El resultado es una hipótesis generadora, NO prueba de
//   causalidad. Esto es lo que la §18 dejaba abierto: darle sentido y acotarlo empíricamente.
//   PRNG mulberry32 (semilla 20260807). Uso: node calc_windows_causality.mjs
import { mulberry32 } from './lib.mjs';
const p = (...a) => console.log(...a);
const yr=(y)=>y<0?`${Math.round(-y)} a.C.`:`${Math.round(y)} d.C.`;

// 6 ventanas astronómicas (centros aprox., de slow_scan.mjs) y 6 correlatos históricos
const windows = [ -427,   61,   552,  1043,  1535,  2025 ];  // Axial, Templo, Justiniano, Cisma, Reforma, Actual
const events  = [ -427,   61,   552,  1043,  1535,  2025 ];  // mismos correlatos (artículo §12)

p('=== §15.7  Causalidad de las 6 ventanas — cadencia vs. azar ===');
p('  Ventanas astronómicas (Neptuno∈Aries ∧ Plutón∈Acuario) y correlatos históricos:');
const labels=['Axial (-427)','Templo (61)','Justiniano (552)','Cisma (1043)','Reforma (1535)','Actual (2025)'];
labels.forEach((l,i)=>p(`   ${l}`));

const spac=(arr)=>arr.slice(1).map((x,i)=>x-arr[i]);
const spW=spac(windows), spE=spac(events);
const mean=(a)=>a.reduce((x,y)=>x+y,0)/a.length;
const mW=mean(spW), mE=mean(spE);
p('\n  (A) Cadencia:');
p('   espaciamientos ventanas (a): '+spW.map(x=>x.toFixed(0)).join(', ')+'   media='+mW.toFixed(1));
p('   espaciamientos eventos  (a): '+spE.map(x=>x.toFixed(0)).join(', ')+'   media='+mE.toFixed(1));
p(`   sinódico Neptuno–Plutón ≈ 492,3 a.  Ambas medias ~491 a -> comparten cadencia.`);

// (B) regularidad: estadístico R = Σ|espac_i − media|
const R=(arr)=>{ const sp=spac(arr); const m=mean(sp); return sp.reduce((s,x)=>s+Math.abs(x-m),0); };
const obsR=R(events);
const range=events[events.length-1]-events[0];          // 2452 a
p('\n  (B) Regularidad (¿los 6 puntos están en una rejilla ~491 a?)');
p(`   estadístico R = Σ|espac_i − media| ;  observado R = ${obsR.toFixed(1)} (rejilla perfecta -> R→0).`);
p(`   rango cubierto: ${range} a.  Nulo: 6 puntos uniformes en [0, ${range}], mismo estadístico.`);

const N=200000, rng=mulberry32(20260807);
let ge=0, maxR=0;
const uniformSorted=(n,span)=>{ const xs=[...Array(n)].map(()=>rng()*span); xs.sort((a,b)=>a-b); return xs; };
for(let t=0;t<N;t++){ const r=R(uniformSorted(6,range)); if(r<=obsR) ge++; if(r>maxR) maxR=r; }
const pval=ge/N;
const pvalStr = ge===0 ? `< ${(1/N).toExponential(1)}` : pval.toExponential(2);
p(`   ${N} simulaciones nulas:  P(R ≤ ${obsR.toFixed(0)}) = ${ge}/${N} = ${pvalStr}`);
p(`   R máximo bajo el nulo = ${maxR.toFixed(0)}  (puntos aleatorios son muy irregulares).`);

// desplazamiento (offset) entre rejilla astronómica y eventos: ¿encajan en una fase?
const offset=(arr,period)=>{ // mejor fase φ tal que arr[i] ≈ φ + k_i·period
  let bestOff=null, bestErr=1e9;
  for(let cand=events[0]-period;cand<=events[0]+period;cand+=1){
    let err=0; for(const x of arr){ const k=Math.round((x-cand)/period); err+=Math.abs((x-(cand+k*period))); }
    if(err<bestErr){ bestErr=err; bestOff=cand; }
  }
  return {off:bestOff, err:bestErr};
};
const od=offset(events, mW);
p(`\n  Encaje de fase: mejor origen de rejilla = ${od.off.toFixed(0)}, error total = ${od.err.toFixed(1)} a`);
p(`   sobre 6 puntos (≈ ${(od.err/6).toFixed(1)} a/punto de desviación media).`);

p('\n  --- Veredicto (honesto) ---');
if(pval<0.01){
  p(`  La cadencia ~491 a de los 6 eventos es estadísticamente muy regular (p${pvalStr.replace('<','< ')})`);
  p(`  frente a puntos uniformes. PERO: (1) n=6 es pequeño; (2) SESGO DE SELECCIÓN — los eventos`);
  p(`  se eligieron para encajar en la rejilla de 491 a, inflando la regularidad; (3) correlación`);
  p(`  de cadencia ≠ causalidad (Neptuno/Plutón no "causan" reformas religiosas).`);
  p(`  Cierre: es un patrón GENERADOR DE HIPÓTESIS, no una demostración de causa. La §18 lo`);
  p(`  acota así: la regularidad es real (p pequeño) pero su interpretación causal queda abierta;`);
  p(`  lo demostrado es la cadencia compartida 491 a, no un mecanismo.`);
} else {
  p(`  La regularidad no es significativa (p≈${pval.toExponential(1)}): los 6 eventos no se`);
  p(`  distinguen de puntos aleatorios. La "causalidad" se rechaza; queda sólo la cadencia 491 a`);
  p(`  del cielo, sin correlato histórico demostrado.`);
}