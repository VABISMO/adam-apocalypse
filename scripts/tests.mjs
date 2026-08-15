// tests.mjs — suite de validación del Lector del Cielo. Aserciones reproducibles.
//   node tests.mjs            -> aserciones aritméticas + lib + astronomía rápida (equinoccios, saros)
//   (las pruebas pesadas de eclipses y nulos de corpus se validan con calc_72.mjs y la suite de reproducibilidad de §12.1)
import { gematria, isMirror, mirrorSum, norm, simpleSet, formable, occupiedLetters, occupiedSigns, skyAt,
         genesisReadable, GEN_WORDS, GEN_TOTAL, GV, PREC, AGE, FULL, EQUINOX_LON, ageBoundaries,
         SYN, DRAC, TROP, ECLY, Astronomy, loadLexicon, DOUBLES, MOTHERS } from './lib.mjs';
import { buildMagic } from './calc_magic_squares.mjs';
import { ALL_ALIGN_YEARS, ALL_ALIGN_OM } from '../web/src/align_data.mjs';

let pass=0, fail=0; const fails=[];
function ok(name, cond, extra=''){ if(cond){pass++; }else{fail++; fails.push(name+(extra?(' ['+extra+']'):''));} }
const approx=(a,b,t=1e-6)=>Math.abs(a-b)<=t;

// ===== §2 Gematría base-10 =====
ok('Gen1:1=2701', gematria(norm('בראשית'))+gematria(norm('ברא'))+gematria(norm('אלהים'))+gematria(norm('את'))+gematria(norm('השמים'))+gematria(norm('ואת'))+gematria(norm('הארץ'))===2701);
ok('2701=37×73', 2701===37*73);
ok('2701 triangular 73', 73*74/2===2701);
ok('2701+1072=3773 palíndromo', isMirror(2701) && mirrorSum(2701)===3773);
ok('alef=1 bet=2 tav=400', GV.א===1&&GV.ב===2&&GV.ת===400);
ok('22 letras base (27 valores posicionales con finales)', Object.keys(GV).length===22);

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
// Los 7 kameot planetarios (n=3..9) son efectivamente mágicos (filas/cols/diagonales = M(n))
const kameotOrders=[3,4,5,6,7,8,9];
ok('7 kameot (n=3..9) todos mágicos', kameotOrders.map(buildMagic).every(isMagic));
ok('kameot ctes 15,34,65,111,175,260,369 por construcción', kameotOrders.map(n=>buildMagic(n)[0].reduce((a,b)=>a+b,0)).join(',')==='15,34,65,111,175,260,369');

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
const g11words=['בראשית','ברא','אלהים','את','השמים','ואת','הארץ'];
const g11=g11words.map(w=>gematria(norm(w)));
ok('Gen1:1 7 palabras, 28 letras', g11words.length===7 && g11words.join('').length===28);
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

// ===== §Stellar-alignment recurrence (all rare alignments, maxInSign ≥ 5) =====
// The Reader's recurrence badge is driven by ALL_ALIGN_YEARS/ALL_ALIGN_OM baked into
// web/src/align_data.mjs (12,505 deduped events from web/alignments.json, maxInSign 5/6/7 — the
// 5-, 6-, and 7-body clusterings — recomputed per event so the REAL reading rule applies:
// simples ⊆ occupiedSigns AND mothers ⊆ availableMothers). These assertions (a) rebuild the
// event selection from the canonical source and confirm the baked years match it; (b) verify
// the baked masks were computed correctly by recomputing a handful of maxInSign===7 events
// independently with lib.mjs skyAt (all 7 in one sign → occupiedSigns = {that sign}); and
// (c) mirror alignmentRecurrence's reading-rule bit-logic for representative words. The
// integrated function is also exercised end-to-end by web/test_jsdom.mjs (renders the Reader
// list + gloss page, calling alignmentRecurrence per word).
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const _ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const _AL = JSON.parse(readFileSync(join(_ROOT,'web/alignments.json'),'utf8'));
const _ES2EN = {Aries:'Aries',Tauro:'Taurus','Géminis':'Gemini','Cáncer':'Cancer',Leo:'Leo',Virgo:'Virgo',Libra:'Libra',Escorpio:'Scorpio',Sagitario:'Sagittarius',Capricornio:'Capricorn',Acuario:'Aquarius',Piscis:'Pisces'};
const _yr = d => parseInt(d.match(/^(-?\d+)/)[1],10);
// (a) rebuild the event selection: maxInSign ≥ 5, deduped by date string
const _ded = (()=>{ const seen=new Set(), out=[];
  for(const e of [..._AL.scanA,..._AL.scanB].filter(e=>e.maxInSign>=5)){ if(seen.has(e.date)) continue; seen.add(e.date); out.push(e); } return out; })();
const _dedYears = _ded.map(e=>_yr(e.date)).sort((a,b)=>a-b);
ok('alignments.json → 12,505 rare alignments (deduped maxInSign≥5)', _ded.length===12505);
ok('baked ALL_ALIGN_YEARS = 12,505 events matching alignments.json selection', ALL_ALIGN_YEARS.length===12505 && ALL_ALIGN_YEARS.join(',')===_dedYears.join(','));
ok('baked ALL_ALIGN_YEARS sorted ascending, range -19999..2200', ALL_ALIGN_YEARS.every((y,i)=>i===0||y>=ALL_ALIGN_YEARS[i-1]) && ALL_ALIGN_YEARS[0]===-19999 && ALL_ALIGN_YEARS[ALL_ALIGN_YEARS.length-1]===2200);
ok('baked ALL_ALIGN_OM same length', ALL_ALIGN_OM.length===12505);
// bit maps (mirror core.jsx _ALIGN_SIMPLE_BITS / _ALIGN_MOM_BITS exactly)
const _SIGNS_EN=['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const _SIMPLE_EN={Aries:'ה',Taurus:'ו',Gemini:'ז',Cancer:'ח',Leo:'ט',Virgo:'י',Libra:'ל',Scorpio:'נ',Sagittarius:'ס',Capricorn:'ע',Aquarius:'צ',Pisces:'ק'};
const _SB = {}; _SIGNS_EN.forEach((s,i)=>_SB[_SIMPLE_EN[s]] = 1<<i);   // simple letter → bit
const _MB = { 'א':1, 'מ':2, 'ש':4 };                                    // mother letter → bit
const _MLET=new Set(['א','מ','ש']);
const _ad=(a,b)=>{let d=Math.abs(a-b)%360;return d>180?360-d:d;};
const _nearM=lon=>{let best=null,bd=Infinity;for(const[h,,,m] of MOTHERS){const d=_ad(lon,m);if(d<bd){bd=d;best=h;}}return best;};
const _zoneM=sign=>_nearM(_SIGNS_EN.indexOf(sign)*30+15);
const _momSet=cons=>{const s=new Set();for(const c of cons)if(_MLET.has(c))s.add(c);return s;};
// (b) independent skyAt spot-check: a handful of maxInSign===7 events must have occ = exactly
// that one sign's bit (all 7 bodies in one sign) and mom = that sign's zone mother. lib.mjs
// skyAt returns 10 bodies → filter to the 7 classical (drop Uranus/Neptune/Pluto).
const _CLASS=new Set(['Saturno','Júpiter','Marte','Sol','Venus','Mercurio','Luna']);
const _spot = [
  { date:'1962-02-04', sign:'Acuario' },     // famous Aquarius grand conjunction
  { date:'2000-05-03', sign:'Tauro' },
  { date:'-2250-12-02', sign:'Sagitario' },  // Esther's Sagittarius conjunction
  { date:'0531-06-02', sign:'Géminis' },
  { date:'0907-02-20', sign:'Piscis' },
];
for(const s of _spot){
  const en = _ES2EN[s.sign];
  const rows = skyAt(s.date).filter(r=>_CLASS.has(r.body));
  const occLetters = occupiedLetters(rows);              // Set of simple letters occupied
  const occSigns = occupiedSigns(rows);                  // Set of sign names (Spanish, from lib)
  const expOccBits = [...occLetters].reduce((m,c)=>m|(_SB[c]||0),0);
  const expMomBits = [...occupiedSigns(rows)].reduce((m,sg)=>{ const mm=_zoneM(_ES2EN[sg]); return mm? m|(_MB[mm]||0):m; },0);
  const Y = _yr(s.date);
  // find the baked entry for this year whose occ bits match; then verify mom bits too
  const hit = ALL_ALIGN_YEARS.reduce((found,y,i)=> (y===Y && (ALL_ALIGN_OM[i]&0xFFF)===expOccBits)? i : found, -1);
  ok(`skyAt spot-check ${s.date} (${en}, maxInSign 7): baked occ bits match recompute`, hit>=0);
  if(hit>=0) ok(`skyAt spot-check ${s.date}: baked mom bits match recompute`, ((ALL_ALIGN_OM[hit]>>>12)&7)===expMomBits);
}
// (c) reading-rule bit-logic oracle (mirrors core.jsx alignmentRecurrence over the baked arrays)
function _rec(he, simp){
  const cons = norm(he);
  const moms = [..._momSet(cons)];
  const ss = simp ? [...simp] : [...simpleSet(cons)];
  let simpReq=0; for(const c of ss) simpReq |= (_SB[c]||0);
  let momReq=0;  for(const c of moms) momReq |= (_MB[c]||0);
  const years=[];
  for(let i=0;i<ALL_ALIGN_YEARS.length;i++){
    const om=ALL_ALIGN_OM[i];
    if(((om&0xFFF)&simpReq)!==simpReq) continue;
    if((((om>>>12)&7)&momReq)!==momReq) continue;
    years.push(ALL_ALIGN_YEARS[i]);
  }
  const g=[]; for(let i=1;i<years.length;i++) g.push(years[i]-years[i-1]); g.sort((a,b)=>a-b);
  const median = g.length ? g[Math.floor(g.length/2)] : 0;
  const regime = ss.length ? (years.length?'alignment':'ordinary') : 'eternal';
  return { regime, n:years.length, median, signs:ss.map(c=>_SIGNS_EN.find(s=>_SIMPLE_EN[s]===c)) };
}
const _esther=_rec('אסתר', simpleSet(norm('אסתר')));
ok('Esther אסתר (ס=Sagittarius, mom א) → alignment, n=2838, median 5 yr', _esther.regime==='alignment' && _esther.n===2838 && _esther.median===5 && _esther.signs.join()==='Sagittarius');
const _yhvh=_rec('יהוה', simpleSet(norm('יהוה')));
ok('YHVH יהוה (simples י+ה+ו = Virgo+Aries+Taurus) → alignment, n=45, median 297 yr', _yhvh.regime==='alignment' && _yhvh.n===45 && _yhvh.median===297 && _yhvh.signs.join()==='Virgo,Aries,Taurus');
const _gd=_rec('גד', simpleSet(norm('גד')));   // גד = both doubles, no simple, no mother → eternal
ok('גד (doubles only) → eternal, reads at all 12,505 alignments', _gd.regime==='eternal' && _gd.n===12505);
const _kbs=_rec('כבשה', simpleSet(norm('כבשה')));   // כבשה = כב doubles + ש mother + ה simple (Aries)
ok('כבשה (ewe, ה=Aries + mom ש) → alignment, n>0', _kbs.regime==='alignment' && _kbs.n>0 && _kbs.signs.join()==='Aries');

// ===== Resultado =====
console.log(`\ntests.mjs: ${pass} PASS, ${fail} FAIL  (de ${pass+fail} aserciones)`);
if(fail){ console.log('FALLADOS:'); fails.forEach(f=>console.log('  ✗ '+f)); process.exit(1); }
else console.log('✓ TODAS EN VERDE');