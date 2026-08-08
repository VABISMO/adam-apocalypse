// calc_angels72.mjs — reproduce §15.3: los 72 nombres del Shem HaMephorash y su lectura.
//   Los 72 tríos se leen por COLUMNAS de Éxodo 14:19-21 (72 consonantes × 3 versos):
//     tríos[i] = v19[i] + v20[71-i] + v21[i]   (v20 se lee al revés, como manda la tradición).
//   Cada trío + sufijo יה (Hod) o אל (Malkhut) = nombre angélico. Verificamos:
//     (a) los dos primeros tríos contra los nombres canónicos (Vehuiah, Jeliel);
//     (b) 72×3 = 216 = 6³ consonantes; estructura de 72 = 6×12, 8×9, etc.;
//     (c) distribución de letras / reducción Aiq Bekar (puente a sigilos, §15.2);
//     (d) la lista completa de 72 tríos y nombres.
//   El corpus lo provee fetch_gen.mjs (corpus.json). Uso: node calc_angels72.mjs
import { readFileSync, writeFileSync } from 'fs';
import { GV, gematria, norm } from './lib.mjs';
const p = (...a) => console.log(...a);

const corpus = JSON.parse(readFileSync('./corpus.json','utf8'));
const v19=corpus.exodus1419_21[0], v20=corpus.exodus1419_21[1], v21=corpus.exodus1419_21[2];

// --- reducción Aiq Bekar (compartida con §15.2) ---
const finals={0x05DA:500,0x05DD:600,0x05DF:700,0x05E3:800,0x05E5:900};
const letterVal=(ch)=> finals[ch.charCodeAt(0)] ?? GV[ch];
const reduce=(v)=>{ let s=v; while(s>9) s=String(s).split('').reduce((a,d)=>a+ +d,0); return s===0?9:s; };

p('=== §15.3  Shem HaMephorash — los 72 nombres desde Éxodo 14:19-21 ===');
p(`  versos: 14:19=${v19.length} conson., 14:20=${v20.length}, 14:21=${v21.length} (72 × 3 ✓: ${v19.length===72&&v20.length===72&&v21.length===72})`);

// 72 tríos por columnas (v20 invertido)
const triplets=[];
for(let i=0;i<72;i++) triplets.push(v19[i]+v20[71-i]+v21[i]);

// (a) verificación canónica
const canonical=['והו','ילי','סיט','עלמ','מהש'];   // Vehuiah, Jeliel, Sitael, Elemiah, Mahasiah
let canonOk=true;
for(let i=0;i<canonical.length;i++) if(triplets[i]!==canonical[i]) canonOk=false;
p(`  (a) primeros 5 tríos: ${triplets.slice(0,5).join(' ')}`);
p(`      canónicos:        ${canonical.join(' ')}   -> ${canonOk?'coinciden ✓':'DESCUADRE ✗'}`);

// (b) estructura numérica
p('  (b) 72×3 = 216 consonantes = 6³ ✓.');
p('      72 = 6×12 = 8×9 = 2³·3² ; 216 = 6³ = 2³·3³.');
// suma gemátrica de los 72 tríos
let sum72=0; for(const t of triplets) sum72+=gematria(norm(t));
p(`      suma gemátrica de los 72 tríos = ${sum72}  (216 letras).`);
// factor 72 ya demostrado estructuralmente en §6.3 (Éxodo 72×3, p≈5×10⁻⁷).

// (c) distribución Aiq Bekar de las 216 letras -> qué celdas del Lo Shu tocan
const cellHits={};
for(const t of triplets) for(const ch of t.split('')){ const r=reduce(letterVal(ch)); cellHits[r]=(cellHits[r]||0)+1; }
p('  (c) celdas Lo Shu (1..9) tocadas por las 216 letras (Aiq Bekar):');
const cells=[1,2,3,4,5,6,7,8,9];
p('      ' + cells.map(c=>`${c}:${cellHits[c]||0}`).join('  '));
const totalHits=216, maxCell=cells.reduce((a,b)=> (cellHits[b]||0)>(cellHits[a]||0)?b:a);
p(`      celda más tocada = ${maxCell} (${cellHits[maxCell]}/216 = ${(100*cellHits[maxCell]/216).toFixed(1)}%).`);
// ¿cubre los 9? (en sigilos, cuantas más celdas, más "información" del nombre)
const covered=cells.filter(c=>(cellHits[c]||0)>0).length;
p(`      celdas cubiertas: ${covered}/9  (un nombre que usa las 9 celdas es "completo").`);

// (d) lista completa: trío + nombre con EL y con YH
p('  (d) los 72 tríos + nombres (+אל / +יה):');
const rows=[];
for(let i=0;i<72;i++){
  const t=triplets[i];
  const el=t+'אל', yh=t+'יה';
  rows.push({i:i+1, trio:t, el, yh, gemEL:gematria(norm(el)), gemYH:gematria(norm(yh))});
}
// imprimir en bloques de 12
for(let b=0;b<6;b++){
  const blk=rows.slice(b*12,b*12+12);
  p('   ' + blk.map(r=>`#${String(r.i).padStart(2)} ${r.trio}(${r.el}/${r.yh}=${r.gemEL}/${r.gemYH})`).join('   '));
}

// guardar para calc_sigils.mjs
const out={ triplets, angelsEL: triplets.map(t=>t+'אל'), angelsYH: triplets.map(t=>t+'יה'),
            gemEL: rows.map(r=>r.gemEL), gemYH: rows.map(r=>r.gemYH) };
writeFileSync('./angels72.json', JSON.stringify(out));
p('\n  (guardado angels72.json: 72 tríos + nombres +EL/+H + gematrias)');
p('  Hipótesis (no demostrada empíricamente aquí, sólo estructural): la atribución de');
p('  cada ángel a un decanato zodiacal (5°) y a una de las 72 quintas parte del cielo.');
p('  Lo que SÍ está demostrado: la extracción mecánica 72×3 desde Éxodo (cf. §6.3).');