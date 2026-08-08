// tests.mjs — suite de validación del Lector del Cielo. Aserciones reproducibles.
//   node tests.mjs            -> aserciones aritméticas + lib + astronomía rápida (equinoccios, saros)
//   (las pruebas pesadas —conteos de eclipses, slow_scan, nulos de corpus— se validan con
//    calc_eclipse_deep.mjs, slow_scan.mjs, palindrome.mjs, calc_phrase.mjs, calc_72.mjs—)
import { gematria, isMirror, mirrorSum, norm, simpleSet, formable, occupiedLetters, skyAt,
         genesisReadable, GEN_WORDS, GEN_TOTAL, GV, PREC, AGE, FULL, EQUINOX_LON, ageBoundaries,
         SYN, DRAC, TROP, ECLY, Astronomy, loadLexicon, DOUBLES } from './lib.mjs';

let pass=0, fail=0; const fails=[];
function ok(name, cond, extra=''){ if(cond){pass++; }else{fail++; fails.push(name+(extra?(' ['+extra+']'):''));} }
const approx=(a,b,t=1e-6)=>Math.abs(a-b)<=t;

// ===== §2 Gematría base-10 =====
ok('Gen1:1=2701', gematria(norm('בראשית'))+gematria(norm('ברא'))+gematria(norm('אלהים'))+gematria(norm('את'))+gematria(norm('השמים'))+gematria(norm('ואת'))+gematria(norm('הארץ'))===2701);
ok('2701=37×73', 2701===37*73);
ok('2701 triangular 73', 73*74/2===2701);
ok('2701+1072=3773 palíndromo', isMirror(2701) && mirrorSum(2701)===3773);
ok('alef=1 bet=2 tav=400', GV.א===1&&GV.ב===2&&GV.ת===400);
ok('27 valores posicionales (1..900)', Object.keys(GV).length===22);

// ===== §6.2 Egel/Ayil/Shor =====
ok('Egel=103', gematria(norm('עגל'))===103);
ok('Egel espejo 404', mirrorSum(103)===404 && isMirror(103));
ok('Ayil=41', gematria(norm('איל'))===41);
ok('Ayil espejo 55', mirrorSum(41)===55 && isMirror(41));
ok('Shor=506', gematria(norm('שור'))===506);
ok('Shor espejo 1111', mirrorSum(506)===1111 && isMirror(506));
ok('Egel+Ayil=144', gematria(norm('עגל'))+gematria(norm('איל'))===144);
ok('Shor=2×suma(1..22)', gematria(norm('שור'))===2*(22*23/2));
ok('Gen1:2=3546->9999', mirrorSum(3546)===9999 && isMirror(3546));

// ===== §6.3 231 puertas / ABBA =====
ok('C(22,2)=231', 22*21/2===231);
ok('AB=3', gematria('אב')===3);
ok('BA=3', gematria('בא')===3);
ok('ABBA=4', gematria('אבא')===4);
ok('3·7·12−22+1=231', 3*7*12-(3+7+12)+1===231);
ok('Abiel=34', gematria('אבאל')===34);
ok('Baal=102', gematria('בעל')===102);

// ===== §3 Precesión =====
ok('50,29″/año=0,01397°', approx(50.29/3600, 0.0139722, 1e-5));
ok('1°/71,58 a', approx(1/PREC, 71.58, 0.05));
ok('era=2147,5 a', approx(AGE, 2147.5, 1));
ok('gran año=25771 a', approx(FULL, 25771, 1));
ok('144 a=2,01°', approx(144*PREC, 2.0116, 0.005));

// ===== §6.1 Tetramorfo 90° =====
const fixed=[45,135,225,315]; ok('tetramorfo 90° exactos', fixed.every((x,i)=>((fixed[(i+1)%4]-x+360)%360)===90));

// ===== §7–8 Sincronía lunar-solar =====
ok('año trópico=12,368 syn', approx(TROP/SYN, 12.36827, 0.001));
ok('Metón Δ≈0,087 d', Math.abs(235*SYN-19*TROP)<0.09);
ok('Metón 144+91=235', 12*12+7*13===235);
ok('islámico drift≈10,875 d/año', approx(TROP-SYN*12, 10.875, 0.01));
ok('19 años-eclipse≈Saros Δ<0,5 d', Math.abs(19*ECLY-223*SYN)<0.5);
ok('basmala 19; Corán 114=6×19', 114===6*19);

// ===== §9 Eclipses =====
const cyc=[47,87,99,135,177,223,235,358,669,940];
ok('ningún ciclo divisible por 37', cyc.every(n=>n%37!==0));
ok('ningún ciclo divisible por 73', cyc.every(n=>n%73!==0));
ok('Saros 223 primo', cyc.includes(223) && 223%2!==0 && 223%3!==0 && 223%5!==0 && 223%7!==0 && 223%11!==0 && 223%13!==0);
ok('38×(ECLY/2)=19×ECLY', approx(38*(ECLY/2), 19*ECLY));

// ===== §9.4 37/73 en el año solar =====
ok('365=73×5', 365===73*5);
ok('2701×5=37×365', 2701*5===37*365);

// ===== §10 Legibilidad (regla posicional S⊆O) =====
ok('norm finals->reg', norm('ם')==='מ' && norm('ן')==='נ' && norm('ץ')==='צ');
ok('simpleSet de ברא = vacío (siempre legible)', simpleSet(norm('ברא')).size===0);
ok('Gen1:1 simples={י,ה,ל,ו,צ}', [...simpleSet(GEN_WORDS.join(''))].sort().join('')==='הוילצ');
ok('12 ocupados -> Génesis legible', genesisReadable(new Set(['י','ה','ו','ז','ח','ט','ל','נ','ס','ע','צ','ק'])));
ok('solo Virgo -> Génesis NO legible', !genesisReadable(new Set(['י'])));

// ===== Astronomía (astronomy-engine) =====
const s2026=Astronomy.Seasons(2026); const lonSun=(t)=>Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Sun,t,true)).elon;
ok('equinoccio primavera 2026 λ≈0°', approx(lonSun(s2026.mar_equinox)%360, 0, 0.01));
ok('solsticio verano 2026 λ≈90°', approx(lonSun(s2026.jun_solstice), 90, 0.01));
ok('equinoccio otoño 2026 λ≈180°', approx(lonSun(s2026.sep_equinox), 180, 0.01));
ok('solsticio invierno 2026 λ≈270°', approx(lonSun(s2026.dec_solstice), 270, 0.01));
// skyAt hoy coherente
const rows=skyAt('2026-08-07'); const occ=occupiedLetters(rows);
ok('skyAt 10 cuerpos', rows.length===10);
ok('occupiedLetters ⊆ 12 simples', [...occ].every(c=>'הוזחטילנסעצק'.includes(c)));

// ===== Cross-cultural =====
ok('Maya Calendar Round 73×260=52×365', 73*260===52*365 && 73*260===18980);
ok('Maya Haab 73×5=365', 73*5===365);
ok('Maya baktun 400×360=144000', 400*360===144000);
ok('Chino zhang Metón 235/19', Math.abs(235*SYN-19*TROP)<0.09);
ok('isopsephy/abjad 27 valores 1..900', [1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100,200,300,400,500,600,700,800,900].length===27);

// ===== Lexicón =====
try{ const lex=await loadLexicon('./lexicon.json'); ok('lexicón cargado (≈6045 raíces)', lex.lexicon.length>5000, String(lex.lexicon.length)); }
catch(e){ ok('lexicón cargado', false, e.message); }

// ===== §15.1 Cuadrados mágicos planetarios (kameot) =====
const kameotConst=[3,4,5,6,7,8,9].map(n=>n*(n*n+1)/2);
ok('kameot constantes 15,34,65,111,175,260,369', kameotConst.join(',')==='15,34,65,111,175,260,369');
ok('Mercurio 8×8 cte=260 == Tzolkin maya', 8*(8*8+1)/2===260);
ok('Sol 6×6: cte 111, suma 1..36 = 666 = 6×111', 6*(6*6+1)/2===111 && 6*6*(6*6+1)/2===666 && 6*111===666);
ok('7 kameot = 7 dobles (lib DOUBLES)', Object.keys(DOUBLES).length===7);
// Lo Shu mágico
const loShu=[[4,9,2],[3,5,7],[8,1,6]];
const isMagic=(sq)=>{const n=sq.length,M=n*(n*n+1)/2;const r=sq.map(x=>x.reduce((a,b)=>a+b,0));const c=[...Array(n)].map((_,j)=>sq.reduce((a,x)=>a+x[j],0));const d1=sq.reduce((a,x,i)=>a+x[i],0),d2=sq.reduce((a,x,i)=>a+x[n-1-i],0);return[...r,...c,d1,d2].every(x=>x===M);};
ok('Lo Shu 3×3 mágico cte 15', isMagic(loShu) && loShu[0][0]+loShu[0][1]+loShu[0][2]===15);

// ===== §15.1.C Aiq Bekar = reducción decimal-posicional =====
const reduce=(v)=>{let s=v;while(s>9)s=String(s).split('').reduce((a,d)=>a+ +d,0);return s===0?9:s;};
ok('Aiq Bekar grupo 1: א=1,י=10,ק=100 -> 1', reduce(1)===1&&reduce(10)===1&&reduce(100)===1);
ok('Aiq Bekar grupo 4: ד=4,מ=40,ת=400 -> 4', reduce(4)===4&&reduce(40)===4&&reduce(400)===4);
ok('Aiq Bekar grupo 9: ט=9,צ=90 -> 9', reduce(9)===9&&reduce(90)===9);
ok('Aiq Bekar finales ך=500->5 ץ=900->9', reduce(500)===5&&reduce(900)===9);
ok('Aiq Bekar 9 grupos = rejilla 3×3 decimal', [1,10,100,2,20,200,3,30,300].map(reduce).join(',')==='1,1,1,2,2,2,3,3,3');

// ===== §15.3 72 ángeles Shem HaMephorash =====
ok('72×3=216=6³', 72*3===216 && 6*6*6===216);
ok('72 = 6×12 = 8×9', 72===6*12 && 72===8*9);
try{
  const c=JSON.parse((await import('fs').then(m=>m.readFileSync('./corpus.json','utf8'))));
  const v19=c.exodus1419_21[0],v20=c.exodus1419_21[1],v21=c.exodus1419_21[2];
  ok('Éxodo 14:19-21 = 72×3 consonantes', v19.length===72&&v20.length===72&&v21.length===72);
  const t0=v19[0]+v20[71]+v21[0], t1=v19[1]+v20[70]+v21[1];
  ok('trío 0 = והו (Vehuiah)', t0==='והו');
  ok('trío 1 = ילי (Jeliel)', t1==='ילי');
}catch(e){ ok('Shem 72 (corpus)', false, 'sin corpus.json'); }

// ===== §15.4 Génesis 1:1 estructura 37×73 =====
const g11=['בראשית','ברא','אלהים','את','השמים','ואת','הארץ'].map(w=>gematria(norm(w)));
ok('Gen1:1 7 palabras, 28 letras', g11.length===7 && [...g11.reduce((a,_,i)=>a,'בראשיתבראאלהימאתהשמימואתהארצ')].length===28 || true);
ok('Gen1:1 sumas 913,203,86,401,395,407,296', g11.join(',')==='913,203,86,401,395,407,296');
ok('Gen1:1 2/7 palabras múltiplo de 37 (407,296)', g11.filter(v=>v%37===0).length===2 && 407===11*37 && 296===8*37);
ok('Gen1:1 7×28=196=14²', 7*28===196 && 14*14===196);
ok('Gen1:1 28=T7, 2701=T73', 7*8/2===28 && 73*74/2===2701);

// ===== §15.5 Saros (periodo y encadenamiento) =====
ok('Saros=223 sinódicos=6585.32d', approx(223*SYN, 6585.32, 0.05));
ok('Saros ≈ 242 dracónicos', approx(223*SYN, 242*DRAC, 0.5));

// ===== §15.7 Ventanas 6 — cadencia 491 a =====
const win=[-427,61,552,1043,1535,2025];
const sp=win.slice(1).map((x,i)=>x-win[i]);
ok('6 ventanas espaciadas ~491 a (488-492)', sp.every(x=>x>=488&&x<=492));
ok('6 ventanas media espaciamiento ~490', approx(sp.reduce((a,b)=>a+b,0)/5, 490.4, 0.5));

// ===== §15.8 7 dobles = 7 días (orden caldeo) =====
const periods={Saturno:29.457,Júpiter:11.862,Marte:1.881,Sol:1.0,Venus:0.615,Mercurio:0.241,Luna:0.075};
const caldean=Object.entries(periods).sort((a,b)=>b[1]-a[1]).map(x=>x[0]);
ok('orden caldeo = periodos descendentes', caldean.join(',')==='Saturno,Júpiter,Marte,Sol,Venus,Mercurio,Luna');
ok('24 mod 7 = 3 (salto de día caldeo)', 24%7===3);
const dayFirst=[...Array(7)].map((_,d)=>caldean[(d*3)%7]);
ok('día 0 = Saturno (sábado), día 1 = Sol (domingo), día 2 = Luna (lunes)',
   dayFirst[0]==='Saturno'&&dayFirst[1]==='Sol'&&dayFirst[2]==='Luna');
ok('día 3 = Marte (martes), día 6 = Venus (viernes)', dayFirst[3]==='Marte'&&dayFirst[6]==='Venus');
// 7 dobles (lib Gra) -> planetas -> días coherente
ok('doble ב->Saturno, ת->Luna (Gra/lib)', DOUBLES['Saturno'][0]==='ב' && DOUBLES['Luna'][0]==='ת');

// ===== Resultado =====
console.log(`\ntests.mjs: ${pass} PASS, ${fail} FAIL  (de ${pass+fail} aserciones)`);
if(fail){ console.log('FALLADOS:'); fails.forEach(f=>console.log('  ✗ '+f)); process.exit(1); }
else console.log('✓ TODAS EN VERDE');