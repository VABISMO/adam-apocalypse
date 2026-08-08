// calc_ayanamsa.mjs — reproduce §15.6: sensibilidad de las eras precesionales al ayanamsa.
//   La §11 databa las eras (Aries→Piscis→Acuario…) con el ayanamsa de Lahiri (24,18°).
//   Pendiente: comparar con otros ayanamsas. Mostramos que la FECHA de entrada en cada era
//   se desplaza (Δayanamsa / precesión) años entre sistemas — hasta ~190 a entre extremos.
//   Consecuencia: la "Era de Acuario" no es una predicción astronómica nítida; depende del
//   cero sidéreo elegido. Es una advertencia metodológica, no una "asignatura" a demostrar.
//   Uso: node calc_ayanamsa.mjs
import { PREC, AGE, FULL, SIGNS, SIMPLE, yrLabel } from './lib.mjs';
const p = (...a) => console.log(...a);

// ayanamsas (valores ~2024, grados)
const AYA = {
  'Lahiri (Chitrapaksha)' : 24.18,
  'Krishnamurti (KP)'     : 23.93,   // Lahiri − 0,25
  'Fagan-Bradley'         : 25.06,   // sidéreo occidental
  'Raman'                 : 22.40,   // B.V. Raman
};
const REF = 2024;

p('=== §15.6  Sensibilidad de las eras precesionales al ayanamsa ===');
p(`  precesión ${PREC.toFixed(5)}°/año ; era zodiacal = 30°/PREC = ${AGE.toFixed(1)} a ; año grande = ${FULL.toFixed(0)} a`);
p(`  referencia: ${REF} d.C.  EQUINOX_LON(sidéreo del equinoccio) = (360 − ayanamsa) mod 360.`);

// réplica de ageBoundaries() con ayanamsa arbitrario
function ageBoundaries(ayan){
  const eqLon = (360 - ayan) % 360;
  const out=[];
  for(let i=0;i<12;i++){
    const hi=(i+1)*30; let dt=(eqLon-hi)/PREC;
    while(dt>FULL/2) dt-=FULL; while(dt<-FULL/2) dt+=FULL;
    out.push({sign:SIGNS[i], start:REF+dt});
  }
  return out;
}

// tabla: para cada ayanamsa, la fecha de entrada en Acuario (sign idx 10, Aquarius)
p('\n  Entrada en la Era de Acuario (sidéreo) según ayanamsa:');
const dates={};
for(const [name,a] of Object.entries(AYA)){
  const b=ageBoundaries(a);
  const aqu=b.find(x=>x.sign==='Acuario');
  dates[name]=aqu.start;
  p(`   ${name.padEnd(24)} ayanamsa=${a.toFixed(2)}°  ->  ${aqu.start.toFixed(1)} d.C.  (${yrLabel(aqu.start)})`);
}
const allD=Object.values(dates);
const spread=Math.max(...allD)-Math.min(...allD);
p(`\n  Dispersión de la fecha de entrada en Acuario entre ayanamsas: ${spread.toFixed(0)} años.`);
p(`  Teoría: Δayanamsa_máx = ${(Math.max(...Object.values(AYA))-Math.min(...Object.values(AYA))).toFixed(2)}°  ->  Δt = ${((Math.max(...Object.values(AYA))-Math.min(...Object.values(AYA)))/PREC).toFixed(0)} a.  ✓`);

// desplazamiento de TODAS las fronteras entre Lahiri y Fagan-Bradley
p('\n  Desplazamiento de cada frontera de era: Lahiri -> Fagan-Bradley:');
const la=ageBoundaries(AYA['Lahiri (Chitrapaksha)']), fb=ageBoundaries(AYA['Fagan-Bradley']);
const dAya = AYA['Fagan-Bradley'] - AYA['Lahiri (Chitrapaksha)'];
for(let i=0;i<12;i++){
  const shift=fb[i].start-la[i].start;
  p(`   ${la[i].sign.padEnd(10)}  Lahiri ${la[i].start.toFixed(0)}  ->  FB ${fb[i].start.toFixed(0)}   (Δ = ${shift.toFixed(0)} a)`);
}
p(`\n  Todas las fronteras se desplazan un mismo Δt = Δayanamsa/PREC = ${(dAya/PREC).toFixed(0)} a.`);
p('  Conclusión §15.6: la datación de eras es CONVENCIONAL (depende del cero sidéreo).');
p('  El Lector del Cielo NO data eras por ayanamsa sino por signos TROPICALES (ocupación de');
p('  los 10 cuerpos), que son independientes del ayanamsa. Por eso su descarte es robusto a');
p('  esta convención. La "Era de Acuario" como fecha única NO es un hecho empírico.');

// verificación: el año grande y la era son invariantes (no dependen del ayanamsa)
p('\n  Invariantes (independientes del ayanamsa): año grande = 360°/PREC = '
  + `${FULL.toFixed(0)} a ; era = 30°/PREC = ${AGE.toFixed(1)} a.  ✓`);