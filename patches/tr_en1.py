#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io
src = io.open('../pdf/lector-del-cielo.html', encoding='utf-8').read()

R = []
def rep(a,b): R.append((a,b))

# ---- head / cover ----
rep('<html lang="es">', '<html lang="en">')
rep('<title>El Lector del Cielo: el alfabeto estelar del *Sefer Yetzirah* como marco de legibilidad versicular, sincronía lunar-solar y marcador de eras precesionales</title>',
    '<title>The Reader of the Sky: the stellar alphabet of *Sefer Yetzirah* as a framework for versicular legibility, lunar–solar synchrony, and a marker of precessional eras</title>')
rep('<div class="kicker">Síntesis hermético-astronómica · 2026</div>', '<div class="kicker">Hermetic–Astronomical Synthesis · 2026</div>')
rep('<h1>El Lector del Cielo: el alfabeto estelar del <em>Sefer Yetzirah</em> como marco de legibilidad versicular, sincronía lunar-solar y marcador de eras precesionales</h1>',
    '<h1>The Reader of the Sky: the stellar alphabet of the <em>Sefer Yetzirah</em> as a framework for versicular legibility, lunar–solar synchrony, and a marker of precessional eras</h1>')
rep('<div class="subtitle">El alfabeto estelar del <em>Sefer Yetzirah</em> como marco de legibilidad versicular, sincronía lunar-solar y marcador de eras precesionales</div>',
    '<div class="subtitle">The stellar alphabet of the <em>Sefer Yetzirah</em> as a framework for versicular legibility, lunar–solar synchrony, and a marker of precessional eras</div>')
rep('<div class="model">Modelo: GLM-5.2</div>', '<div class="model">Model: GLM-5.2</div>')
rep('Versión 2.4 · Fecha 2026-08-07<br>', 'Version 2.4 · Date 2026-08-07<br>')
rep('Software acompañante:', 'Companion software:')
rep('scripts reproducibles:', 'reproducible scripts:')

# ---- abstract ----
rep('<h2>Resumen</h2>', '<h2>Abstract</h2>')
rep('<p>Se formaliza y testa computacionalmente un sistema —<em>Lector del Cielo</em> (קורא השמים)— que opera el mapeo tripartito del <em>Sefer Yetzirah</em> (3 madres / 7 dobles / 12 simples) sobre el cielo real calculado con efemérides modernas (astronomy-engine v2.1.19). Bajo una <strong>regla de legibilidad por pertenencia a conjunto</strong> (reutilización), un verso hebreo es legible en una fecha <em>t</em> sii el conjunto de letras simples que requiere es subconjunto del conjunto de signos zodiacales ocupados por los 10 cuerpos. El trabajo demuestra, con cálculos reproducibles:</p>',
    '<p>A system is formalized and computationally tested —<em>Reader of the Sky</em> (קורא השמים)— that operates the tripartite mapping of the <em>Sefer Yetzirah</em> (3 mothers / 7 doubles / 12 simples) over the real sky calculated with modern ephemerides (astronomy-engine v2.1.19). Under a <strong>rule of legibility by set membership</strong> (reuse), a Hebrew verse is legible at a date <em>t</em> iff the set of simple letters it requires is a subset of the set of zodiacal signs occupied by the 10 bodies. The work demonstrates, with reproducible calculations:</p>')
rep('<li><strong>Gematría decimal posicional:</strong> 22 letras + 5 finales = 27 = 1–9, 10–90, 100–900. El alfabeto <em>es</em> el conjunto de cifras de base 10.</li>',
    '<li><strong>Positional decimal gematria:</strong> 22 letters + 5 finals = 27 = 1–9, 10–90, 100–900. The alphabet <em>is</em> the set of digits of base 10.</li>')
rep('<li><strong>Precesión:</strong> 50,29″/año → 1° cada 71,58 años (≈ 72); una era zodiacal = 2147,5 años; año grande = 25 771 años (25 920 a la cifra platónica de 72 a/°). 144 años = 2,01°.</li>',
    '<li><strong>Precession:</strong> 50.29″/year → 1° every 71.58 years (≈ 72); one zodiacal era = 2147.5 years; great year = 25 771 years (25 920 at the Platonic figure of 72 y/°). 144 years = 2.01°.</li>')
rep('<li><strong>Equinoccios/solsticios 2026:</strong> longitud solar aparente 0°, 90°, 180°, 270° — los 4 cardinales tropicales son medibles al segundo.</li>',
    '<li><strong>Equinoxes/solstices 2026:</strong> apparent solar longitude 0°, 90°, 180°, 270° — the 4 tropical cardinals are measurable to the second.</li>')
rep('<li><strong>Sincronía lunar-solar:</strong> el año trópico contiene 12,368 meses sinódicos; Metón 19a = 235 lunaciones (Δ 0,087 d); el calendario islámico (lunar puro) deriva 10,875 d/año y se re-alinea con el solar cada ~33 años (358,9 d ≈ 1 año).</li>',
    '<li><strong>Lunar–solar synchrony:</strong> the tropical year contains 12.368 synodic months; Meton 19y = 235 lunations (Δ 0.087 d); the Islamic calendar (pure lunar) drifts 10.875 d/year and re-aligns with the solar every ~33 years (358.9 d ≈ 1 year).</li>')
rep('<li><strong>El 19 unifica tres registros:</strong> Metón (19a calendárico), Saros (19 años de eclipse = 6585,78 d ≈ 223 sinódicos), basmala coránica (19 letras; 114 azoras = 6×19).</li>',
    '<li><strong>The 19 unifies three registers:</strong> Meton (19y calendrical), Saros (19 eclipse years = 6585.78 d ≈ 223 synodic), Quranic basmala (19 letters; 114 suras = 6×19).</li>')
rep('<li><strong>Eclipses — 37/73:</strong> factorización de los 10 ciclos eclipsales canónicos (47, 87, 99, 135, 177, 223, 235, 358, 669, 940): <strong>ni 37 ni 73 son factores de ninguno</strong>. El ciclo nodal (18,613 a) contiene <strong>~39,2 estaciones</strong> de eclipse, no 37 (el Saros son 38). 37×73 = 2701 = Génesis 1:1, no un número eclipsal; los primos estructurales de los eclipses son 19, 47 y 223. <strong>Pero 37 y 73 sí encajan en el año solar civil:</strong> 365 = 73×5 y 2701 pentadas = 37×365 = 37 años civiles (§9.4). El contacto de 73 con eclipses es solo estadístico (~70–86 eclipses por serie saros, sin valor fijo).</li>',
    '<li><strong>Eclipses — 37/73:</strong> factorization of the 10 canonical eclipse cycles (47, 87, 99, 135, 177, 223, 235, 358, 669, 940): <strong>neither 37 nor 73 is a factor of any</strong>. The nodal cycle (18.613 y) contains <strong>~39.2 eclipse seasons</strong>, not 37 (the Saros is 38). 37×73 = 2701 = Genesis 1:1, not an eclipse number; the structural primes of eclipses are 19, 47, and 223. <strong>But 37 and 73 do fit into the civil solar year:</strong> 365 = 73×5 and 2701 pentads = 37×365 = 37 civil years (§9.4). The contact of 73 with eclipses is only statistical (~70–86 eclipses per saros series, with no fixed value).</li>')
rep('<li><strong>Cadencia de יהוה:</strong> requiere {י,ה,ו} = Virgo+Aries+Tauro, rellenable por planetas rápidos → cadencia ~mensual.</li>',
    '<li><strong>Cadence of יהוה:</strong> requires {י,ה,ו} = Virgo+Aries+Taurus, fillable by fast planets → cadence ~monthly.</li>')
rep('<li><strong>Génesis 1:1:</strong> requiere {י,ה,ל,ו,צ} = Virgo+Aries+Libra+Tauro+<strong>Acuario</strong>; Acuario y Aries solo anclados a la vez por <strong>Plutón y Neptuno</strong> → ventanas de ~13 años cada <strong>~491 años</strong> (sinódico Neptuno–Plutón). Seis ventanas (−427, 61, 552, 1043, 1535, 2025), coincidentes con re-formaciones religioso-lingüísticas mayores.</li>',
    '<li><strong>Genesis 1:1:</strong> requires {י,ה,ל,ו,צ} = Virgo+Aries+Libra+Taurus+<strong>Aquarius</strong>; Aquarius and Aries are anchored at the same time only by <strong>Pluto and Neptune</strong> → windows of ~13 years every <strong>~491 years</strong> (Neptune–Pluto synodic). Six windows (−427, 61, 552, 1043, 1535, 2025), coincident with major religious-linguistic re-formations.</li>')
rep('<li><strong>Espejo-palíndromo 2701→3773:</strong> real pero <strong>no selectivo</strong> —ni a nivel verso (Génesis 39,3 % ≈ Markov 38,8 % ≈ uniforme 38,0 %; ratio 1,01×) ni a nivel palabra (47,9 % del lexicón, 58 % de los mazzalot). La frase es más selectiva que la palabra (39,3 % vs 47,9 %) pero no rareface con la magnitud (gematría ≥ 1000 → 39,6 %) y no separa lecturas válidas de inválidas (días Génesis-legibles 30,7 % vs no-legibles 32,4 %). El palíndromo no es checksum ni criterio de validez: el descarte es posicional (<em>S</em> ⊆ <em>O</em>, 88,5 % de fechas descartadas). Sí son específicas las sumas con valor astronómico: Egel+Ayil = 144, Shor = 2×suma(1..22), Génesis 1:2 = 9999 (§6.2, §13.1–13.2).</li>',
    '<li><strong>Mirror-palindrome 2701→3773:</strong> real but <strong>not selective</strong> —neither at verse level (Genesis 39.3 % ≈ Markov 38.8 % ≈ uniform 38.0 %; ratio 1.01×) nor at word level (47.9 % of the lexicon, 58 % of the mazzalot). The phrase is more selective than the word (39.3 % vs 47.9 %) but does not rarefy with magnitude (gematria ≥ 1000 → 39.6 %) and does not separate valid from invalid readings (Genesis-legible days 30.7 % vs non-legible 32.4 %). The palindrome is neither a checksum nor a criterion of validity: the discard is positional (<em>S</em> ⊆ <em>O</em>, 88.5 % of dates discarded). What are specific are the sums with astronomical value: Egel+Ayil = 144, Shor = 2×sum(1..22), Genesis 1:2 = 9999 (§6.2, §13.1–13.2).</li>')
rep('<li><strong>Sin correlación con eclipses:</strong> días Génesis 6,5 % vs 24,7 % esperado.</li>',
    '<li><strong>No correlation with eclipses:</strong> Genesis days 6.5 % vs 24.7 % expected.</li>')
rep('<li><strong>144 = 12²</strong> = meses lunares de los 12 años comunes del ciclo metónico (12×12 + 7×13 = 144+91 = 235); 144 000 = 360×400 (ת = Luna).</li>',
    '<li><strong>144 = 12²</strong> = lunar months of the 12 common years of the Metonic cycle (12×12 + 7×13 = 144+91 = 235); 144 000 = 360×400 (ת = Moon).</li>')
rep('<li><strong>Tetramorfo:</strong> las 4 caras de los querubines (buey, león, águila, hombre) = los 4 signos <strong>fijos</strong> (Tauro, Leo, Escorpio, Acuario) a 90° exactos (cruz fija); los 12 <em>mazzalot</em> hebreos son animales/objetos (טלה cordero, שור buey, אריה león…).</li>',
    '<li><strong>Tetramorph:</strong> the 4 faces of the cherubim (ox, lion, eagle, man) = the <strong>4 fixed signs</strong> (Taurus, Leo, Scorpio, Aquarius) at exact 90° (fixed cross); the 12 Hebrew <em>mazzalot</em> are animals/objects (טלה lamb, שור ox, אריה lion…).</li>')
rep('<li><strong>Ingeniería intencional de letras (atestada y, para los 72, demostrada):</strong> 231 puertas del SY (C(22,2)); primera puerta AB + espejo BA = <strong>ABBA = «padre», palíndromo</strong>; 3·7·12−22+1 = 231 (autocoherencia); <strong>Éxodo 14:19-21 = 72 letras consonánticas cada verso</strong> (verificado en MT; 3 consecutivos de 72 → p ≈ 5×10⁻⁷, ingeniería intencional); Abulafia y <em>Sefer Raziel HaMalakh</em> documentan el método. La <strong>intencionalidad de la práctica</strong> es real; la atribución astronómica específica de la gematría tórica permanece como hipótesis (§6.3).</li>',
    '<li><strong>Intentional letter engineering (attested and, for the 72, demonstrated):</strong> 231 gates of the SY (C(22,2)); first gate AB + its mirror BA = <strong>ABBA = "father", palindrome</strong>; 3·7·12−22+1 = 231 (self-coherence); <strong>Exodus 14:19-21 = 72 consonantal letters each verse</strong> (verified in MT; 3 consecutive of 72 → p ≈ 5×10⁻⁷, intentional engineering); Abulafia and <em>Sefer Raziel HaMalakh</em> document the method. The <strong>intentionality of the practice</strong> is real; the specific astronomical attribution of Toric gematria remains a hypothesis (§6.3).</li>')
rep('<p>Se declara el alcance: síntesis <strong>hermético-astronómica moderna</strong>, no práctica del <em>Sefer Yetzirah</em> clásico.</p>',
    '<p>The scope is declared: <strong>modern hermetic–astronomical synthesis</strong>, not classical <em>Sefer Yetzirah</em> practice.</p>')

# ---- TOC (translate visible text, keep spanish slugs) ----
rep('<h2>Índice</h2>', '<h2>Index</h2>')
rep('<li><a href="#1-introducción-y-declaración-de-alcance">1. Introducción y declaración de alcance</a></li>', '<li><a href="#1-introducción-y-declaración-de-alcance">1. Introduction and declaration of scope</a></li>')
rep('<li><a href="#2-el-sistema-de-valores-gematría-como-base-10-posicional">2. El sistema de valores: gematría como base-10 posicional</a></li>', '<li><a href="#2-el-sistema-de-valores-gematría-como-base-10-posicional">2. The system of values: gematria as positional base-10</a></li>')
rep('<li><a href="#3-precesión-y-el-grado-de-72-años">3. Precesión y el grado de 72 años</a></li>', '<li><a href="#3-precesión-y-el-grado-de-72-años">3. Precession and the degree of 72 years</a></li>')
rep('<li><a href="#4-equinoccios-solsticios-y-la-rejilla-tropical">4. Equinoccios, solsticios y la rejilla tropical</a></li>', '<li><a href="#4-equinoccios-solsticios-y-la-rejilla-tropical">4. Equinoxes, solstices, and the tropical grid</a></li>')
rep('<li><a href="#5-el-mapeo-estelar">5. El mapeo estelar</a></li>', '<li><a href="#5-el-mapeo-estelar">5. The stellar mapping</a></li>')
rep('<li><a href="#6-los-12-mazzalot-los-animales-del-zodiaco-y-el-tetramorfo">6. Los 12 mazzalot: los animales del zodiaco y el tetramorfo</a></li>', '<li><a href="#6-los-12-mazzalot-los-animales-del-zodiaco-y-el-tetramorfo">6. The 12 mazzalot: the animals of the zodiac and the tetramorph</a></li>')
rep('<li><a href="#7-sincronía-lunar-solar-metón-octaeteris-y-calendario-islámi">7. Sincronía lunar-solar: Metón, octaeteris y calendario islámico</a></li>', '<li><a href="#7-sincronía-lunar-solar-metón-octaeteris-y-calendario-islámi">7. Lunar–solar synchrony: Meton, octaeteris, and the Islamic calendar</a></li>')
rep('<li><a href="#8-el-19-metón-saros-y-la-basmala">8. El 19: Metón, Saros y la basmala</a></li>', '<li><a href="#8-el-19-metón-saros-y-la-basmala">8. The 19: Meton, Saros, and the basmala</a></li>')
rep('<li><a href="#9-eclipses-ciclos-factorización-y-la-cuestión-37-73">9. Eclipses: ciclos, factorización y la cuestión 37 / 73</a></li>', '<li><a href="#9-eclipses-ciclos-factorización-y-la-cuestión-37-73">9. Eclipses: cycles, factorization, and the 37 / 73 question</a></li>')
rep('<li><a href="#10-regla-de-lectura-formalización">10. Regla de lectura (formalización)</a></li>', '<li><a href="#10-regla-de-lectura-formalización">10. Reading rule (formalization)</a></li>')
rep('<li><a href="#11-resultado-i-cadencia-de">11. Resultado I — Cadencia de יהוה</a></li>', '<li><a href="#11-resultado-i-cadencia-de">11. Result I — Cadence of יהוה</a></li>')
rep('<li><a href="#12-resultado-ii-génesis-1-1-y-las-ventanas-de-491-años">12. Resultado II — Génesis 1:1 y las ventanas de ~491 años</a></li>', '<li><a href="#12-resultado-ii-génesis-1-1-y-las-ventanas-de-491-años">12. Result II — Genesis 1:1 and the ~491-year windows</a></li>')
rep('<li><a href="#13-resultado-iii-2701-el-espejo-palíndromo-y-los-modelos-nul">13. Resultado III — 2701, el espejo-palíndromo y los modelos nulos</a></li>', '<li><a href="#13-resultado-iii-2701-el-espejo-palíndromo-y-los-modelos-nul">13. Result III — 2701, the mirror-palindrome, and the null models</a></li>')
rep('<li><a href="#14-resultado-iv-el-144">14. Resultado IV — El 144</a></li>', '<li><a href="#14-resultado-iv-el-144">14. Result IV — The 144</a></li>')
rep('<li><a href="#15-discusión">15. Discusión</a></li>', '<li><a href="#15-discusión">15. Discussion</a></li>')
rep('<li><a href="#16-limitaciones">16. Limitaciones</a></li>', '<li><a href="#16-limitaciones">16. Limitations</a></li>')
rep('<li><a href="#17-reproducibilidad-y-software">17. Reproducibilidad y software</a></li>', '<li><a href="#17-reproducibilidad-y-software">17. Reproducibility and software</a></li>')
rep('<li><a href="#18-revisión-crítica-y-asignaturas-pendientes">18. Revisión crítica y asignaturas pendientes</a></li>', '<li><a href="#18-revisión-crítica-y-asignaturas-pendientes">18. Critical review and outstanding matters</a></li>')
rep('<li><a href="#19-conclusión">19. Conclusión</a></li>', '<li><a href="#19-conclusión">19. Conclusion</a></li>')
rep('<li><a href="#referencias">Referencias</a></li>', '<li><a href="#referencias">References</a></li>')

missing = []
for a,b in R:
    if a in src:
        src = src.replace(a,b)
    else:
        missing.append(a[:60])
io.open('../pdf/lector-del-cielo_EN.html','w',encoding='utf-8').write(src)
print("part1 done; replacements:", len(R), "missing:", len(missing))
for m in missing: print("  MISS:", m)