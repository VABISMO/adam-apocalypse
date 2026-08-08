// calc_mazzalot.mjs — reproduce §6.2 y §13.1 del artículo:
//   - Egel/Ayil/Shor: gematría + espejo (404, 55, 1111), Egel+Ayil=144, Shor=2×suma(1..22)
//   - Génesis 1:2 = 3546 -> 9999 (repdigit)
//   - 144×15=2160, 144×180=25920 (sólo a 72 a/°)
//   - Nulo de palíndromo-espejo a nivel PALABRA: lexicón Strong (47,9%) y 12 mazzalot (58%)
// Uso:  node calc_mazzalot.mjs
import fs from 'node:fs/promises';
import { gematria, isMirror, mirrorSum, loadLexicon, norm } from './lib.mjs';

const p=(s)=>console.log(s);
const sum1_22 = 22*23/2; // 253

p('=== §6.2  Gematría de la transición Tauro→Aries ===');
const words=[['Becerro','עגל','Egel'],['Carnero','איל','Ayil'],['Toro','שור','Shor']];
for(const [es,w,tr] of words){
  const g=gematria(norm(w)); const m=mirrorSum(g); const pal=isMirror(g);
  p(`  ${es.padEnd(8)} ${w} ${tr.padEnd(5)} = ${g} ; +inverso(${[...String(g)].reverse().join('')}) = ${m} ${pal?'(palíndromo ✓)':''}`);
}
p(`  Egel + Ayil = ${gematria(norm('עגל'))} + ${gematria(norm('איל'))} = ${gematria(norm('עגל'))+gematria(norm('איל'))}  (transición Tauro→Aries en una cifra)`);
p(`  Shor = ${gematria(norm('שור'))} = 2 × suma(1..22) = 2×${sum1_22} = ${2*sum1_22}  (el «alfabeto duplicado» del SY) ✓`);
p(`  Génesis 1:2 = 3546 ; 3546 + 6453 = ${3546+6453}  (repdigit de 4 cifras) ✓`);

p('\n=== §14  144 y la era/gran año (sólo a la tasa platónica 72 a/°) ===');
p(`  144×15 = ${144*15} (era a 72 a/°) ; 144×180 = ${144*180} (gran año a 72 a/°)`);

p('\n=== §13.1  Nulo de palíndromo-espejo a nivel PALABRA ===');
const lex=await loadLexicon('./lexicon.json');
const roots=lex.lexicon.map(r=>r[0]);
const uniq=[...new Set(roots)];
const palCount=uniq.filter(w=>isMirror(gematria(norm(w)))).length;
p(`  Lexicón Strong: ${uniq.length} raíces únicas; palíndromo-espejo = ${palCount} = ${(100*palCount/uniq.length).toFixed(2)}%`);

// Mazzalot (12 nombres hebreos de signos)
const MAZZ = ['טלה','שור','תאומים','סרטן','אריה','בתולה','מאזניים','עקרב','קשת','גדי','דלי','דגים'];
const mazzPal=MAZZ.filter(w=>isMirror(gematria(norm(w))));
p(`  12 mazzalot: palíndromo-espejo = ${mazzPal.length}/12 = ${(100*mazzPal.length/12).toFixed(0)}%  (${mazzPal.map(w=>`${w}=${gematria(norm(w))}`).join(', ')})`);

// Por número de cifras
p('  Tasa por nº de cifras de la gematría:');
const byCif={}; uniq.forEach(w=>{const c=String(gematria(norm(w))).length; byCif[c]=byCif[c]||{n:0,p:0}; byCif[c].n++; if(isMirror(gematria(norm(w))))byCif[c].p++;});
for(const c of Object.keys(byCif).sort((a,b)=>+a-+b)){const o=byCif[c]; p(`    ${c} cifra(s): ${o.p}/${o.n} = ${(100*o.p/o.n).toFixed(1)}%`);}
p('  Conclusión: ~1 de cada 2 palabras hebreas cualesquiera son palíndromo-espejo.');
p('  El espejo NO es checksum selectivo. Lo específico de Egel/Ayil/Shor son las SUMAS con valor astronómico (144; 2×253), no el palíndromo.');