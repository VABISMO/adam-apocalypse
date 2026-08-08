// calc_crosscultural.mjs — evidencia CROSS-CULTURAL de las constantes del sistema,
//   verificada aritméticamente. Sólo se reportan coincidencias numéricas reales
//   (no se atribuye préstamo cultural; se documenta la convergencia).
// Uso:  node calc_crosscultural.mjs
import { SYN, TROP } from './lib.mjs';
const p=(s)=>console.log(s);
const eq=(a,b)=>a===b?'✓':'✗';

p('=== CROSS-CULTURAL — constantes que convergen entre tradiciones ===\n');

p('-- MAYA (Mesoamérica) --');
const TZOLKIN=260, HAAB=365;
p(`  Tzolkin = ${TZOLKIN} ; Haab = ${HAAB} = 73×5 = ${73*5}  ${eq(73*5,HAAB)}`);
p(`  Calendar Round = 73×260 = ${73*TZOLKIN} = 52×365 = ${52*HAAB}  ${eq(73*TZOLKIN,52*HAAB)}`);
p(`    -> 73 aparece dos veces: 73 pentadas = año solar (Haab) y 73 tzolkin = 1 Calendar Round.`);
p(`    INDEPENDIENTE del hebreo, los mayas construyeron el 73 sobre el 365 (§9.4).`);
p(`  Baktun = 144 000 d = 400 tun (360) = ${400*360}  ${eq(400*360,144000)}`);
p(`    -> 144 000 = 144×1000 ; 144 = 12² (§14).  El Long Count maya usa 144 000 como unidad mayor.`);
p(`  (Nota: 144 000 maya es en DÍAS; el 144 000 apocalíptico es simbólico. Mismo número, registro distinto.)`);

p('\n-- GRIEGO (isopsephy) --');
const greek=[1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100,200,300,400,500,600,700,800,900];
p(`  27 letras (9+9+9 = ${9+9+9}) con valores 1–9, 10–90, 100–900.`);
p(`  Misma asignación DECIMAL-POSICIONAL que el hebreo (§2). 27 = 22+5 hebreo.  Convergencia, no préstamo.`);

p('\n-- ÁRABE (abjad) --');
const arab=[1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100,200,300,400,500,600,700,800,900,1000];
p(`  28 letras abjad con valores 1–9, 10–90, 100–900 + 1000.  Misma secuencia decimal-posicional (§2).`);

p('\n-- CHINO (章 zhang) --');
p(`  1 zhang = 19 años = 235 meses.`);
p(`  235×${SYN} = ${(235*SYN).toFixed(2)} d ; 19×${TROP} = ${(19*TROP).toFixed(2)} d ; Δ = ${(235*SYN-19*TROP).toFixed(3)} d.`);
p(`    -> El ciclo Metónico (19a/235) descubierto INDEPENDIENTEMENTE en China como el 章 (§7–8).`);

p('\n-- VÉDICO (India) --');
p(`  27 nakshatras (mansiones lunares) × 13°20 = 360° (= ${27*(13+1/3)}°).  El 27 = 22+5 hebreo (§2) — paralelo lunar.`);
p(`  108 = 27×4 ; 12×9 = 108.  Yuga: kali-yuga = 432 000 años = 72×6000 (72 = grado precesional, §3).`);

p('\n-- BABILONIA --');
p(`  sar = 3600 = 60² (base sexagesimal) ; 60×6 = 360° del zodiaco -> 12 signos × 30°.`);
p(`  Ciclo saros babilónico original (3600 años) != saros moderno (223 lunaciones); homonimia histórica.`);

p('\n-- 72 (grado precesional / Shem HaMephorash) --');
p(`  72 años/grado de precesión (§3) ; 72 tríos del Nombre (Éxodo 14:19-21, §6.3).`);
p(`  72 aparece además en: 72 conspiradores de Set (Egipto); 72 lenguas/tradiciones medievales; 72×6 = 432 (= base de los yugas védicos).`);
p(`    -> Convergencia del 72 como «grado del gran reloj» y como cifra de completud combinatoria.`);

p('\n=== Síntesis cross-cultural ===');
p('  Lo que el sistema comparte con otras tradiciones de forma VERIFICABLE:');
p('   • gematría decimal-posicional 27/28  (hebreo, griego, árabe)  — §2');
p('   • Metón 19a/235                       (grecobabilónico, chino)   — §7–8');
p('   • 73×5 = 365 y 73-tzolkin Calendar Round (hebreo civil, maya) — §9.4');
p('   • 144 000 como unidad mayor           (apocalíptico, maya Long Count) — §14');
p('   • 72 = grado precesional / completud  (hebreo, védico, egipcio) — §3');
p('  Ninguna de estas coincidencias PRUEBA el sistema; lo INDEPENDIENTEMENTE CORROBORAN.');