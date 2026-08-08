// gen_eclipse.mjs — reproduce §9.3: correlación días-Génesis-legibles / eclipses (2024–2030).
//   Cuenta días Génesis-legibles y eclipses (sol+lun) globales; mide cuántos días legibles
//   tienen un eclipse en ventana ±10 d; compara con la esperanza aleatoria.
// Uso:  node gen_eclipse.mjs   (tarda ~30–60 s)
import { skyAt, occupiedLetters, genesisReadable, Astronomy } from './lib.mjs';

const p=(s)=>console.log(s);
const T0=new Date(Date.UTC(2024,0,1)), T1=new Date(Date.UTC(2030,11,31));
const W=10; // ventana ±10 días

// Días Génesis-legibles
const legDays=[]; for(let d=new Date(T0);d<=T1;d=new Date(d.getTime()+86400000)){const ds=d.toISOString().slice(0,10); if(genesisReadable(occupiedLetters(skyAt(ds)))) legDays.push(d.getTime());}
p(`Días Génesis-legibles 2024–2030: ${legDays.length}`);

// Eclipses solares + lunares globales en el periodo (±margen)
const eclipses=[]; const M=T0.getTime()-40*86400000, E=T1.getTime()+40*86400000;
let cur=new Date(M), guard=0;
while(cur.getTime()<E && guard<500){ guard++;
  const es=Astronomy.SearchGlobalSolarEclipse(cur); if(!es)break; eclipses.push(es.peak.date.getTime()); cur=new Date(es.peak.date.getTime()+5*86400000);
}
cur=new Date(M); guard=0;
while(cur.getTime()<E && guard<500){ guard++;
  const el=Astronomy.SearchLunarEclipse(cur); if(!el)break; eclipses.push(el.peak.date.getTime()); cur=new Date(el.peak.date.getTime()+5*86400000);
}
eclipses.sort((a,b)=>a-b);
p(`Eclipses (sol+lun) en 2024–2030: ${eclipses.length}`);

let hit=0; for(const t of legDays){ if(eclipses.some(e=>Math.abs(e-t)<=W*86400000)) hit++; }
const obs=100*hit/legDays.length;
const expected=100*(eclipses.length/((T1-T0)/86400000/365.25))*((2*W+1)/365);
p(`Días Génesis con eclipse en ±${W} d: ${hit}/${legDays.length} = ${obs.toFixed(1)}%`);
p(`Esperanza aleatoria: ${expected.toFixed(1)}%  (eclipses/año × ventana ${2*W+1}d / 365)`);
p(`-> ${obs<expected?'EVITAN':'coinciden con'} las ventanas eclipsales (${obs.toFixed(1)}% vs ${expected.toFixed(1)}% esperado).`);
p(`   El motor es la posición de los planetas lentos, no la geometría Sol–Luna–nodo.`);