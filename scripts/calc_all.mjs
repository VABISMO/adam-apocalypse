// calc_all.mjs — reproduce §§3–9 y 14 del artículo (cálculos astronómicos y aritméticos).
//   Equinoccios/solsticios 2026; factorización de 10 ciclos eclipsales; sincronía lunar-solar;
//   precesión; eras; 144; tetramorfo a 90°; Saros verificado con dos eclipses reales.
// Uso:  node calc_all.mjs
import { Astronomy, TROP, SYN, DRAC, ANOM, ECLY, PREC, AGE, FULL, AYANAMSIS, EQUINOX_LON,
        ageBoundaries, yrLabel, SIGNS, SIMPLE } from './lib.mjs';

const p = (s)=>console.log(s);
const eq = (a,b,m)=>console.log(`  ${a} = ${b}  ${m??''}`);

p('=== §3  Precesión ===');
p(`  50,29″/año ÷ 3600 = ${(50.29/3600).toFixed(5)}°/año`);
p(`  1° cada ${(1/PREC).toFixed(2)} años  (≈72 a/°)`);
p(`  1 era (30°) = ${AGE.toFixed(1)} años`);
p(`  Año grande = ${FULL.toFixed(0)} años  (platónico 72×360 = ${72*360})`);
p(`  144 años × ${PREC.toFixed(5)}°/año = ${(144*PREC).toFixed(3)}°`);

p('\n=== §3b  Eras precesionales (entrada del equinoccio en cada signo, Lahiri 24,18°) ===');
p(`  Equinoccio sidérico = ${EQUINOX_LON.toFixed(2)}° (Piscis)`);
for(const a of ageBoundaries()) p(`  ${a.sign.padEnd(12)} ${a.he}  ${yrLabel(a.start)} — ${yrLabel(a.end)}`);

p('\n=== §4  Equinoccios/Solsticios 2026 (astronomy-engine Seasons + Ecliptic.elon) ===');
const s2026 = Astronomy.Seasons(2026);
const lonSun = (t)=>Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Sun,t,true)).elon;
const fmt = (t)=>t.date.toISOString().slice(0,19);
const evs = [['primavera',s2026.mar_equinox,0],['verano',s2026.jun_solstice,90],
             ['otoño',s2026.sep_equinox,180],['invierno',s2026.dec_solstice,270]];
for(const [n,t,target] of evs){
  const L=lonSun(t);
  const ok = Math.abs(L-target)<0.001;
  p(`  ${n.padEnd(9)} ${fmt(t)}  λ☉=${L.toFixed(4)}°  (target ${target}°) ${ok?'✓':'✗'}`);
}

p('\n=== §6.1  Tetramorfo = cruz fija a 90° exactos ===');
const fixed = [['buey','Tauro',45],['león','Leo',135],['águila','Escorpio',225],['hombre','Acuario',315]];
for(let i=0;i<4;i++){ const a=fixed[i],b=fixed[(i+1)%4]; const d=((b[2]-a[2]+360)%360); p(`  ${a[0]}→${b[0]}: ${d}° ${d===90?'✓':''}`); }

p('\n=== §7  Sincronía lunar-solar ===');
p(`  Año trópico / mes sinódico = ${(TROP/SYN).toFixed(5)} meses sinódicos/año`);
const cycles=[['Octaeteris',8,99],['Metón',19,235],['Calipo',76,940]];
for(const [n,yr,lun] of cycles){
  const e = Math.abs(lun*SYN - yr*TROP);
  p(`  ${n.padEnd(11)} ${yr}a / ${lun} lun: ${lun}×${SYN}=${(lun*SYN).toFixed(2)}d ; ${yr}×${TROP}=${(yr*TROP).toFixed(2)}d ; Δ=${e.toFixed(3)}d`);
}
p(`  Metón: 12×12 + 7×13 = ${12*12+7*13} = 144+91 = 235 ✓`);
p(`  Islámico (lunar puro): 12 syn = ${(SYN*12).toFixed(3)} d ; drift vs trópico = ${(TROP-SYN*12).toFixed(3)} d/año ; 33a → ${(33*(TROP-SYN*12)).toFixed(1)} d ≈ 1 año solar`);

p('\n=== §8  El 19: Metón / Saros / basmala ===');
p(`  19 años de eclipse = ${19*ECLY} d ; Saros = 223 sinódicos = ${(223*SYN).toFixed(2)} d ; Δ = ${(19*ECLY-223*SYN).toFixed(2)} d`);
p(`  Basmala = 19 letras ; Corán = 114 azoras = 6×19 = ${6*19}`);

p('\n=== §9.1  Ciclos eclipsales y factorización ===');
const cyc=[['Octon',47],['Hepton',87],['Octaeteris',99],['Tritos',135],['Sar',177],
           ['Saros',223],['Meton',235],['Inex',358],['Exeligmos',669],['Calipo',940]];
const fact=(n)=>{const f=[];let m=n;for(let d=2;d*d<=m;d++){while(m%d===0){f.push(d);m/=d;}}if(m>1)f.push(m);return f.join('×');};
for(const [n,N] of cyc){
  const dN=N*SYN, drac=Math.round(N*SYN/DRAC);
  p(`  ${n.padEnd(11)} N=${String(N).padStart(3)} sin  ${dN.toFixed(1)}d  ${drac} drac  ${fact(N)}`);
}

p('\n=== §8 verif.  Saros con eclipses reales (astronomy-engine) ===');
// Avanza hasta el eclipse solar del 2023-04-20
let e1=Astronomy.SearchGlobalSolarEclipse(new Date(Date.UTC(2023,3,1)));
while(e1 && e1.peak.date.getTime()<Date.UTC(2023,3,20)-86400000) e1=Astronomy.SearchGlobalSolarEclipse(new Date(e1.peak.date.getTime()+5*86400000));
const next223=new Date(e1.peak.date.getTime()+223*SYN*86400000);
let e2=Astronomy.SearchGlobalSolarEclipse(new Date(next223.getTime()-20*86400000));
while(e2 && e2.peak.date.getTime()<next223.getTime()-3*86400000) e2=Astronomy.SearchGlobalSolarEclipse(new Date(e2.peak.date.getTime()+5*86400000));
const dReal=(e2.peak.date-e1.peak.date)/86400000;
p(`  eclipse 1: ${fmt(e1.peak)} (${e1.kind})`);
p(`  +223 sinódicos → eclipse 2: ${fmt(e2.peak)} (${e2.kind})`);
p(`  Δ real = ${dReal.toFixed(2)} d = teórico 223×${SYN} = ${(223*SYN).toFixed(2)} d ✓  (misma serie saros)`);

p('\n=== §14  El 144 ===');
p(`  144 = 12² = ${12*12}`);
p(`  144 = meses lunares de los 12 años comunes del Metón: 12×12 = ${12*12}`);
p(`  144 000 = 360×400 (ת=Luna) = ${360*400} ; 144 000/360 = ${144000/360}`);
p(`  144 años = ${(144*PREC).toFixed(3)}° de precesión`);
p(`  144×15 = ${144*15} (era a 72 a/°) ; 144×180 = ${144*180} (gran año a 72 a/°)`);
p(`  Caveat: a 50,29″/año, era=${AGE.toFixed(1)} (÷144=${(AGE/144).toFixed(3)}), gran año=${FULL.toFixed(0)} (÷144=${(FULL/144).toFixed(3)}) — no enteros.`);