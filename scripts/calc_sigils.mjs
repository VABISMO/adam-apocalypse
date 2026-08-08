// calc_sigils.mjs — reproduce §15.2: composición de sigilos desde nombres.
//   Método tradicional (kamea-sigil):
//     1. Tomar el nombre (sin vocales), p.ej. משה.
//     2. Reducir cada letra a 1..9 por Aiq Bekar (= gematría decimal-posicional, §15.1.C).
//     3. Sobre el kamea de Saturno (Lo Shu 3×3, celdas 1..9), marcar las celdas reducidas
//        en orden y unirlas: el trazo ES el sigilo.
//     4. Celdas repetidas consecutivas se colapsan (la pluma no se levanta).
//   Mostramos el sigilo de nombres importantes y de los 72 tríos del Shem HaMephorash
//   (cargados de angels72.json), y medimos cuántas celdas del Lo Shu usa cada nombre.
//   El sigilo es, así, el puente empírico: gematría (§2) -> Aiq Bekar (§15.1.C) -> kamea
//   (§15.1.A) -> trazo. Uso: node calc_sigils.mjs
import { GV, gematria, norm } from './lib.mjs';
import { readFileSync } from 'fs';
const p = (...a) => console.log(...a);

const LO_SHU=[[4,9,2],[3,5,7],[8,1,6]];          // cte 15
const posOf={}; for(let i=0;i<3;i++)for(let j=0;j<3;j++) posOf[LO_SHU[i][j]]=[i,j];
const finals={0x05DA:500,0x05DD:600,0x05DF:700,0x05E3:800,0x05E5:900};
const letterVal=(ch)=> finals[ch.charCodeAt(0)] ?? GV[ch];
const reduce=(v)=>{ let s=v; while(s>9) s=String(s).split('').reduce((a,d)=>a+ +d,0); return s===0?9:s; };

// trazo del sigilo: secuencia de celdas (con colapso de repeticiones consecutivas)
function sigilPath(name){
  const letters=[...norm(name)].filter(ch=>GV[ch]||finals[ch.charCodeAt(0)]);
  const reduced=letters.map(ch=>reduce(letterVal(ch)));
  const cells=[];                                   // celdas con su orden de visita
  for(const r of reduced){ if(!cells.length || cells[cells.length-1].v!==r) cells.push({v:r}); }
  return { letters, reduced, cells, cellsUsed:[...new Set(reduced)] };
}

// render ASCII del Lo Shu con el trazo marcado (números de visita en las celdas)
function renderSigil(name){
  const { letters, reduced, cells, cellsUsed }=sigilPath(name);
  const visit={}; cells.forEach((c,k)=> visit[c.v]=(visit[c.v]??[]).concat(k+1));
  p(`\n  sigilo de ${name}  (gem=${gematria(norm(name))})`);
  p('   letras : '+letters.join(' '));
  p('   valores: '+letters.map(ch=>letterVal(ch)).join(','));
  p('   Aiq Bekar (1..9): '+reduced.join('  '));
  p('   trazo (celdas visitadas, repeticiones consecutivas colapsadas): '
      + cells.map(c=>c.v).join(' → '));
  // grid con nº de visita en cada celda
  p('   Lo Shu con trazo:');
  for(let i=0;i<3;i++){
    let line='    ';
    for(let j=0;j<3;j++){
      const v=LO_SHU[i][j];
      const vis=visit[v];
      line += vis ? `[${vis.join(',')}]` : ` ${v} `;
      line += '  ';
    }
    p(line.trimEnd());
  }
  p(`   celdas usadas: ${cellsUsed.length}/9  (${cellsUsed.join(',')})`);
  return cellsUsed.length;
}

p('=== §15.2  Composición de sigilos (kamea de Saturno, Lo Shu 3×3) ===');
p('  método: nombre -> Aiq Bekar (reducción 1..9, = §15.1.C) -> trazo sobre Lo Shu.');

// --- nombres importantes ---
p('\n  --- Nombres importantes ---');
const names=['אדם','משה','אהרן','דוד','שלמה','אברהם','יצחק','יעקב','ישראל','אלהים','משיח'];
const used={};
for(const n of names){ const u=renderSigil(n); used[n]=u; }

// --- los 72 tríos del Shem HaMephorash ---
p('\n  --- 72 tríos del Shem HaMephorash (raíz del nombre angélico) ---');
const a72=JSON.parse(readFileSync('./angels72.json','utf8'));
const tripletUsage=a72.triplets.map(t=>sigilPath(t).cellsUsed.length);
const dist={}; tripletUsage.forEach(u=>dist[u]=(dist[u]||0)+1);
p('  distribución del nº de celdas del Lo Shu usadas por cada trío (72 tríos):');
for(const k of Object.keys(dist).sort((a,b)=>+a-+b)) p(`     ${k} celdas: ${dist[k]} tríos`);
const avg=(tripletUsage.reduce((a,b)=>a+b,0)/72).toFixed(2);
p(`  media de celdas usadas = ${avg}/9  (un trío de 3 letras toca ~2-3 celdas).`);
p('  trazo de los 3 primeros tríos:');
for(let i=0;i<3;i++) renderSigil(a72.triplets[i]);

// --- "lectura" de un nombre: lo que el sigilo codifica ---
p('\n  --- Lectura: qué codifica el sigilo ---');
p('  El sigilo es la huella geométrica del nombre sobre la rejilla decimal (Aiq Bekar).');
p('  Dos nombres con el mismo trazo son "isomorfos" bajo reducción decimal: comparten');
p('  estructura de paridad posicional. Ej.: buscar pares con el mismo trazo entre los 72.');
const map={};
a72.triplets.forEach((t,i)=>{ const key=sigilPath(t).cells.map(c=>c.v).join('→'); (map[key]??=[]).push(i+1); });
const iso=Object.entries(map).filter(([k,v])=>v.length>1);
p(`  pares/tríos de ángeles con trazo idéntico: ${iso.length} agrupaciones.`);
iso.slice(0,8).forEach(([k,v])=>p(`     "${k}"  ->  ángeles #${v.join(', #')}`));

p('\n  Conclusión §15.2: el sigilo no es adorno — es la proyección del nombre sobre la');
p('  rejilla 9=9+9+9 de §2 vía Aiq Bekar. Reproducible y determinista a partir del nombre.');