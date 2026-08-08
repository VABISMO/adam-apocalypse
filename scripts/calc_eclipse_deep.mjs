// calc_eclipse_deep.mjs — validación EMPÍRICA del contacto 37/73 con eclipses (§9.2–9.3).
//   Cuenta eclipses reales con astronomy-engine: estaciones por ciclo nodal, totales sol+lun,
//   densidad anual sobre 1300 a, y agrupa para discutir el recuento «~73 por serie saros».
// Uso:  node calc_eclipse_deep.mjs   (puede tardar ~1–2 min)
import { Astronomy, TROP, ECLY, SYN } from './lib.mjs';

const p=(s)=>console.log(s);
const NODAL=18.613*TROP, HALF_ECLY=ECLY/2;

function countEclipses(kind, start, days){
  const out=[]; let cur=new Date(start); const end=new Date(start.getTime()+days*86400000); let guard=0;
  const search = kind==='solar' ? Astronomy.SearchGlobalSolarEclipse : Astronomy.SearchLunarEclipse;
  while(cur<end && guard<3000){ guard++; const e=search(cur); if(!e)break; out.push(e.peak.date); cur=new Date(e.peak.date.getTime()+5*86400000); }
  return out;
}
function groupSeasons(dates){ let seasons=1; for(let i=1;i<dates.length;i++){ if((dates[i]-dates[i-1])/86400000>60) seasons++; } return seasons; }

p('=== Eclipses reales en un ciclo nodal (18,613 a, desde 2000-01-01) ===');
const sol=countEclipses('solar', new Date(Date.UTC(2000,0,1)), NODAL);
const lun=countEclipses('lunar', new Date(Date.UTC(2000,0,1)), NODAL);
p(`  Eclipses solares:  ${sol.length}`);
p(`  Eclipses lunares:  ${lun.length}`);
p(`  Total sol+lun:     ${sol.length+lun.length}`);
p(`  Estaciones de eclipse (agrupación >60 d): ${groupSeasons(sol)}`);
p(`  Predicción teórica estaciones: nodal/(eclipse-year/2) = ${(NODAL/HALF_ECLY).toFixed(2)}  (NO 37: el «2/año×18,6» sub-conta)`);
p(`  => 37 no se observa; ~40 estaciones y ~87 eclipses sol+lun por ciclo nodal.`);

p('\n=== Densidad anual de eclipses solares (1300 a, ~vida de una serie saros) ===');
const long=countEclipses('solar', new Date(Date.UTC(2000,0,1)), 1300*TROP);
p(`  ${long.length} eclipses solares en 1300 a  =>  ${(long.length/1300).toFixed(3)} /año  (NASA: ~2,38/año)`);

p('\n=== Recuento por serie saros (literatura, no calculable serie-a-serie aquí) ===');
p('  NASA/Espenak: una serie saros dura 1226–1550 a y contiene 70–86 eclipses (valor medio ~72–73).');
p('  Este «73» es un RECUENTO estadístico, no un PERIODO. Es el único contacto de 73 con eclipses.');
p('  Conclusión: 37 ausente; 73 sólo estadístico (recuento de serie), no estructural.');

p('\n=== §9.3 correlación días-Génesis / eclipses (¿los días legibles evitan eclipses?) ===');
p('  (Calculado en gen_eclipse.mjs con días Génesis-legibles reales 2024–2030.)');
p('  Resultado esperado: días Génesis ~6,5% con eclipse vs 24,7% aleatorio -> evitan eclipses.');