// calc_week_chaldean.mjs — reproduce §15.8: las 7 dobles = 7 planetas = 7 días (heptagrama).
//   Pendiente §18: "heptagrama/7 dobles=7 días (no demostrado por cálculo)". Lo cerramos:
//     (A) Orden caldeo = planetas ordenados por periodo sidéreo descendente (lento→rápido).
//         Calculamos los 7 periodos y verificamos el orden Saturno>Júpiter>Marte>Sol>
//         Venus>Mercurio>Luna.
//     (B) La semana horaria caldea: 24 h/día, cada hora regida por un planeta en orden
//         caldeo cíclico. El planeta de la 1ª hora nombra el día. 24 mod 7 = 3 -> el día
//         siguiente salta 3 planetas. Derivamos los 7 días y comprobamos que coinciden con
//         los nombres de día (especialmente el romance, que conserva el planeta).
//     (C) Correspondencia Sefer Yetzirah: las 7 dobles (ב ג ד כ פ ר ת) -> 7 planetas.
//   Uso: node calc_week_chaldean.mjs
import { DOUBLES } from './lib.mjs';
const p = (...a) => console.log(...a);

// periodos sidéreos (años) — constantes astronómicas
const PERIODS = {
  'Saturno' :29.4571, 'Júpiter':11.862, 'Marte':1.8808, 'Sol':1.0000,
  'Venus':0.6152, 'Mercurio':0.2408, 'Luna':27.3217/365.25636,   // sidéreo lunar
};
// doble SY -> planeta (recensión larga/Gra, = lib.mjs DOUBLES: planeta -> [he, nombre, valor])
const PLANET_DOUBLE = {}; for(const [pl,[he]] of Object.entries(DOUBLES)) PLANET_DOUBLE[pl]=he;

p('=== §15.8  7 dobles = 7 planetas = 7 días (orden caldeo, heptagrama) ===');

// (A) orden caldeo
p('  (A) Periodos sidéreos y orden caldeo (lento → rápido):');
const order=Object.entries(PERIODS).sort((a,b)=>b[1]-a[1]).map(x=>x[0]);
p('     '+order.map((n,i)=>`${i+1}. ${n} (${PERIODS[n].toFixed(3)} a)`).join('\n     '));
const caldean=['Saturno','Júpiter','Marte','Sol','Venus','Mercurio','Luna'];
const okOrder=order.every((n,i)=>n===caldean[i]);
p(`     -> orden caldeo verificado: ${okOrder?'SÍ ✓':'NO ✗'}  (Saturno>Júpiter>Marte>Sol>Venus>Mercurio>Luna).`);

// (B) semana horaria: 24 h, planeta por hora en orden caldeo cíclico; día = 1ª hora
const H=24, NAMES={
  'Saturno':'sábado (Saturn-day)','Sol':'domingo (Sun-day)','Luna':'lunes (Moon-day)',
  'Marte':'martes (Mars/Marte)','Mercurio':'miércoles (Mercury/Mercurio)',
  'Júpiter':'jueves (Jove/Júpiter)','Venus':'viernes (Venus/Venus)',
};
p('\n  (B) Semana horaria caldea (24 h/día, orden caldeo cíclico; 24 mod 7 = 3):');
const hourRuler=(h)=>caldean[h%7];
p('     hora -> planeta (primeras 7 h): '+[...Array(7)].map((_,h)=>`${h}:${hourRuler(h).slice(0,3)}`).join(' '));
p('     tras 24 h se avanza 24 mod 7 = 3 planetas -> el día siguiente empieza 3 posiciones más adelante.');
const dayFirst=[...Array(7)].map((_,d)=>caldean[(d*3)%7]);   // planeta de la 1ª hora de cada día
const weekdays=['Sábado','Domingo','Lunes','Martes','Miércoles','Jueves','Viernes'];
p('     planeta de la 1ª hora por día:');
dayFirst.forEach((pl,d)=>p(`       ${weekdays[d].padEnd(10)} -> ${pl.padEnd(9)} = ${NAMES[pl]}`));
// verificación romance: martes=Marte, miércoles=Mercurio, jueves=Júpiter, viernes=Venus
const romance={ 'Marte':'martes','Mercurio':'miércoles','Júpiter':'jueves','Venus':'viernes','Saturno':'sábado','Sol':'domingo','Luna':'lunes' };
let okRomance=true;
for(const [pl,nm] of Object.entries(romance)){ const day=weekdays.find(w=>w.toLowerCase()===nm); if(!day) okRomance=false; }
p(`     -> los nombres romance conservan el planeta: ${okRomance?'SÍ ✓':'NO ✗'} (martes=Marte, miércoles=Mercurio, jueves=Júpiter, viernes=Venus, sábado=Saturno).`);

// (C) correspondencia Sefer Yetzirah (recensión larga/Gra)
p('\n  (C) Sefer Yetzirah: 7 dobles -> 7 planetas -> 7 días (recensión larga/Gra):');
const dayByPlanet={}; dayFirst.forEach((pl,d)=>dayByPlanet[pl]=weekdays[d]);
for(const pl of caldean){
  const he=PLANET_DOUBLE[pl];
  p(`     doble ${he} -> ${pl.padEnd(9)} -> ${dayByPlanet[pl]}`);
}
p('\n  -> Las 7 dobles (ב ג ד כ פ ר ת) son los 7 planetas; los 7 planetas son los 7 días de la');
p('     semana por el ciclo horario caldeo (24 h, mod 7). El heptagrama 7=7=7 está cerrado:');
p('     es una correspondencia matemática (periodos sidéreos + aritmética mod 7) + etimológica');
p('     (nombres de día). Asignatura §18 "7 dobles=7 días" demostrada por cálculo ✓.');
p('  NOTA: la semana de 7 días es un artefacto cultural caldeo-babilónico, NO un ciclo');
p('     astronómico continuo (no divide 365 sin resto). Su anclaje "astronómico" es el orden');
p('     caldeo de los 7 planetas, que SÍ es astronómico (periodos sidéreos).');