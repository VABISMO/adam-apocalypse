// calc_37_73.mjs — reproduce §9.2–9.4 y prueba a fondo el contacto 37/73 con eclipses y con el sol.
//   (i)  factorización de los 10 ciclos eclipsales: ¿alguno divisible por 37 o 73?
//   (ii) ciclo nodal: estaciones de eclipse — dos definiciones (39,2 y 37,2) y cuál es correcta
//   (iii) ¿37/73 como periodo? (37/73 sinódicos, dracónicos, años-eclipse, combos Saros/Inex)
//   (iv) encaje con el año solar civil: 365 = 73×5 ; 2701 pentadas = 37 años
// Uso:  node calc_37_73.mjs
import { SYN, DRAC, TROP, ECLY } from './lib.mjs';

const p=(s)=>console.log(s);
const NODAL_YR=18.613, NODAL_D=NODAL_YR*TROP, HALF_ECLY=ECLY/2;

p('=== §9.2  37/73 ¿factores de ciclos eclipsales? ===');
const cyc=[47,87,99,135,177,223,235,358,669,940];
let any=false;
for(const N of cyc){
  const b37=N%37===0, b73=N%73===0;
  if(b37||b73){p(`  ${N}: ${b37?'÷37':''} ${b73?'÷73':''}`); any=true;}
}
p(`  ${any?'(alguno encaja)':'Ningún ciclo canónico es divisible por 37 o por 73.'}  37×73 = 2701 = Génesis 1:1.`);
p(`  Primos estructurales de los eclipses: 19 (año-eclipse×19≈Saros), 47 (Octon, factor de Meton), 223 (Saros).`);

p('\n=== §9.2 (ampliado)  37/73 como PERIODO eclipsal ===');
const test=(N,lab)=>{
  const d=N*SYN; const dr=d/DRAC; const ey=d/ECLY;
  const drR=Math.round(dr), eyR=Math.round(ey);
  p(`  ${lab}: ${N} sinódicos = ${d.toFixed(1)}d ; drac≈${dr.toFixed(2)} (err ${Math.abs(dr-drR).toFixed(3)}) ; eclipse-year≈${ey.toFixed(2)}`);
};
test(37,'37 sinódicos'); test(73,'73 sinódicos');
p(`  37 dracónicos = ${(37*DRAC).toFixed(1)}d ; /syn = ${(37*DRAC/SYN).toFixed(3)}`);
p(`  73 dracónicos = ${(73*DRAC).toFixed(1)}d ; /syn = ${(73*DRAC/SYN).toFixed(3)}`);
p(`  37 años-eclipse = ${(37*ECLY).toFixed(0)}d = ${(37*ECLY/TROP).toFixed(2)}a ; 73 años-eclipse = ${(73*ECLY).toFixed(0)}d = ${(73*ECLY/TROP).toFixed(2)}a`);
// combos lineales Saros(223) + Inex(358)
let combos=[];
for(let a=-4;a<=4;a++)for(let b=-4;b<=4;b++){if(a===0&&b===0)continue;const v=a*223+b*358;if(v>0&&(v%37===0||v%73===0))combos.push([a,b,v,v%37===0,v%73===0]);}
p(`  Combos lineales a·Saros(223)+b·Inex(358) múltiplos de 37/73 (|a|,|b|≤4):`);
if(!combos.length) p('    ninguno'); else for(const [a,b,v,d37,d73] of combos){
  const drac=v*SYN/DRAC; const drift=Math.abs(drac-Math.round(drac)); p(`    ${a}×223 + ${b}×358 = ${v} ${d37?'÷37':''}${d73?'÷73':''}  — drac≈${drac.toFixed(2)} (drift ${drift.toFixed(3)}; ¿eclipsal? ${drift<0.05?'alineado':'NO — drift demasiado grande, el eclipse no se repetiría'})`);
}

p('\n=== §9.2  Ciclo nodal: ¿37 estaciones de eclipse? (lo pasado por alto) ===');
p(`  Periodo nodal lunar = 18,613 a = ${NODAL_D.toFixed(2)} d`);
p(`  (a) / (año-eclipse/2 = ${HALF_ECLY.toFixed(3)} d)  =>  ${(NODAL_D/HALF_ECLY).toFixed(3)} estaciones  [def. astronomía]`);
p(`  (b) 2 estaciones/año × 18,613 a        =>  ${(2*NODAL_YR).toFixed(3)}            [cuenta ingenua en años trópicos]`);
p(`  Diferencia: la (b) sub-conta porque el año-eclipse (${ECLY} d) es más corto que el trópico (${TROP} d):`);
p(`    estaciones reales por ciclo nodal ≈ ${ (NODAL_D/HALF_ECLY).toFixed(2) }  (~39–40), NO 37.`);
p(`  El que SÍ cierra es 38:  38 × ${HALF_ECLY.toFixed(3)} = ${(38*HALF_ECLY).toFixed(2)} d = 19 años-eclipse = Saros.`);
p(`  Conclusión: 37 NO aparece en el ciclo nodal ni como periodo; 38 sí (= Saros).`);
p(`  (Verificado empíricamente con astronomy-engine en calc_eclipse_deep.mjs: ~40 estaciones, ~87 eclipses sol+lun por ciclo nodal.)`);

p('\n=== §9.4  37/73 en el AÑO SOLAR (la relación celeste real) ===');
p(`  365 = 73 × 5           -> 73 pentadas de 5 días = año civil.  ${73*5===365?'✓':''}`);
p(`  2701 = 37 × 73         -> Génesis 1:1.`);
p(`  2701 × 5 = ${2701*5} = 37 × 365  -> 2701 pentadas = 37 años civiles EXACTOS.  ${2701*5===37*365?'✓':''}`);
p(`  Cierre: 2701 = (37 años) × (73 pentadas/año).`);
p(`  Año trópico: ${2701*5}/${TROP} = ${(2701*5/TROP).toFixed(4)} a (≈37, pero NO exacto).  -> aritmética CALENDRÁRICA CIVIL, no orbital.`);
p(`  37 lunaciones = ${(37*SYN).toFixed(2)} d vs 3 años trópicos = ${(3*TROP).toFixed(2)} d ; Δ = ${(37*SYN-3*TROP).toFixed(2)} d (≈3 años, no exacto).`);
p('\n  NOTA: 73×5=365 es compartido INDEPENDIENTEMENTE por el Haab maya (ver calc_crosscultural.mjs).');