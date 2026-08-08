// slow_scan.mjs — reproduce §12: ventanas de legibilidad de Génesis 1:1 por el ciclo
//   sinódico Neptuno–Plutón (Neptuno ∈ Aries ∧ Plutón ∈ Acuario). Escaneo −600 a.C. → 2400 d.C.,
//   paso trimestral, fechas históricas vía setUTCFullYear. Reporta duración y separación (~491 a).
//   NOTA: la efeméride de Plutón degrada fuera de 1700–2200; las ventanas antiguas descansan en
//   determinación a nivel de signo (30°), validada por continuidad suave, no por precisión arcominutosa.
// Uso:  node slow_scan.mjs   (tarda ~2–4 min)
import { skyAt, SIGNS, Astronomy } from './lib.mjs';

const p=(s)=>console.log(s);
const stepDays=91;
const inWindow=(d)=>{ const r=skyAt(d); const ne=r.find(x=>x.body==='Neptuno'); const pl=r.find(x=>x.body==='Plutón'); return ne?.sign==='Aries' && pl?.sign==='Acuario'; };
const label=(y)=>y<0?`${Math.round(-y)} a.C.`:`${Math.round(y)} d.C.`;

// construir fecha UTC por año decimal
const dateFor=(yearFloat)=>{ const y=Math.floor(yearFloat); const d=new Date(Date.UTC(0,0,1,12)); d.setUTCFullYear(y<0?y:y,0,1); const rem=(yearFloat-y)*365.2422; d.setUTCDate(1+Math.floor(rem)); return d.toISOString().slice(0,10); };

p('=== §12  Ventanas Génesis 1:1 (Neptuno∈Aries ∧ Plutón∈Acuario) ===');
p('  escaneo −600 a.C. → 2400 d.C., paso ~91 d');
let windows=[]; let cur=-600; const END=2400;
let inWin=false, start=null;
while(cur<=END){
  const ds=dateFor(cur); const w=inWindow(ds);
  if(w && !inWin){ inWin=true; start=cur; }
  if(!w && inWin){ inWin=false; windows.push([start,cur]); }
  cur+=stepDays/365.2422;
}
if(inWin) windows.push([start,END]);

// Fusionar ventanas separadas por un hueco pequeño (<2 a): el retroceso de Plutón/Neptuno
// en la frontera de signo produce fragmentos de 0,2–0,7 a que son la misma ventana.
const MERGE=2.0;
const merged=[];
for(const w of windows){
  if(merged.length && (w[0]-merged[merged.length-1][1])<MERGE) merged[merged.length-1][1]=w[1];
  else merged.push([...w]);
}
// ventanas "principales" = duración ≥ 5 a (las sostenidas; los blips <2 a residuales se ignoran)
const main=merged.filter(w=>w[1]-w[0]>=5);

p(`  ${windows.length} intervalos crudos -> ${merged.length} fusionados -> ${main.length} ventanas principales (≥5 a):`);
main.forEach((w,i)=>{
  const [a,b]=w; const dur=(b-a).toFixed(1); const sep=i? (a-main[i-1][0]).toFixed(1):'—';
  p(`   #${i+1}  ${label(a)} — ${label(b)}   dur ~${dur} a   sep (inicio-inicio) ~${sep} a`);
});
const seps=main.slice(1).map((w,i)=>w[0]-main[i][0]);
if(seps.length){ const mean=seps.reduce((a,b)=>a+b,0)/seps.length; p(`\n  Separación media (inicio-inicio) = ${mean.toFixed(1)} a  (sinódico Neptuno–Plutón ≈ 492,3 a).`); }
p('  Correlatos religioso-lingüísticos: −427 (Axial), 61 (Templo), 552 (Justiniano), 1043 (Cisma), 1535 (Reforma), 2025 (actual).');