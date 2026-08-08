#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io
src = io.open('../pdf/lector-del-cielo_EN.html', encoding='utf-8').read()
R = []
def rep(a,b): R.append((a,b))

# ---- section 1 ----
rep('<h2 id="1-introducción-y-declaración-de-alcance">1. Introducción y declaración de alcance</h2>', '<h2 id="1-introducción-y-declaración-de-alcance">1. Introduction and declaration of scope</h2>')
rep('<p>El <em>Sefer Yetzirah</em> (SY, «Libro de la Formación», ss. II–VI d.C.) expone una cosmogonía lingüística: el universo fue formado con 22 letras —<strong>3 madres</strong> (א מ ש, elementos), <strong>7 dobles</strong> (ב ג ד כ פ ר ת, planetas y dimensiones duales) y <strong>12 simples</strong> (ה ו ז ח ט י ל נ ס ע צ ק, constelaciones y meses)—. El SY es lingüística cosmogónica, no un oráculo.</p>',
    '<p>The <em>Sefer Yetzirah</em> (SY, "Book of Formation", 2nd–6th c. CE) sets out a linguistic cosmogony: the universe was formed with 22 letters —<strong>3 mothers</strong> (א מ ש, elements), <strong>7 doubles</strong> (ב ג ד כ פ ר ת, planets and dual dimensions) and <strong>12 simples</strong> (ה ו ז ח ט י ל נ ס ע צ ק, constellations and months)—. The SY is cosmogonic linguistics, not an oracle.</p>')
rep('<p>Este trabajo <strong>no</strong> atribuye al SY clásico una práctica adivinatoria de lectura del cielo en tiempo real. La operacionalización es una <strong>innovación hermética moderna</strong>: tomar el mapeo letra→astro del SY como un protocolo verificable sobre efemérides astronómicas. El interés es <strong>estrictamente formal y empírico</strong>: dado el mapeo y una regla explícita, ¿qué regularidades emergen y son distinguibles de un modelo nulo? Toda afirmación numérica del artículo es reproducible con los scripts acompañantes.</p>',
    '<p>This work does <strong>not</strong> attribute to the classical SY a divinatory practice of reading the sky in real time. The operationalization is a <strong>modern hermetic innovation</strong>: to take the letter→luminary mapping of the SY as a verifiable protocol over astronomical ephemerides. The interest is <strong>strictly formal and empirical</strong>: given the mapping and an explicit rule, what regularities emerge and are distinguishable from a null model? Every numerical claim of the article is reproducible with the companion scripts.</p>')

# ---- section 2 ----
rep('<h2 id="2-el-sistema-de-valores-gematría-como-base-10-posicional">2. El sistema de valores: gematría como base-10 posicional</h2>', '<h2 id="2-el-sistema-de-valores-gematría-como-base-10-posicional">2. The system of values: gematria as positional base-10</h2>')
rep('<p>La gematría estándar (<em>mispar hechrachi</em>):</p>', '<p>Standard gematria (<em>mispar hechrachi</em>):</p>')
rep('<th>rango</th><th>letras</th><th>valores</th>', '<th>range</th><th>letters</th><th>values</th>')
rep('<td>unidades 1–9</td>', '<td>units 1–9</td>')
rep('<td>decenas 10–90</td>', '<td>tens 10–90</td>')
rep('<td>centenas 100–400</td>', '<td>hundreds 100–400</td>')
rep('<td>centenas 500–900 (finales)</td>', '<td>hundreds 500–900 (finals)</td>')
rep('<p>22 + 5 finales = <strong>27 = 9 + 9 + 9</strong>: la totalidad de los valores posicionales de base 10 hasta 900. En la gematría estándar las finales valen lo mismo que su forma regular (ם = מ = 40), de modo que Génesis 1:1 = 2701.</p>',
    '<p>22 + 5 finals = <strong>27 = 9 + 9 + 9</strong>: the totality of positional base-10 values up to 900. In standard gematria the finals are worth the same as their regular form (ם = מ = 40), so that Genesis 1:1 = 2701.</p>')
rep('<p><strong>Cálculo (Génesis 1:1):</strong></p>', '<p><strong>Calculation (Genesis 1:1):</strong></p>')
rep('<p>בראשית (913) + ברא (203) + אלהים (86) + את (401) + השמים (395) + ואת (407) + הארץ (296) = <strong>2701</strong>.<br>2701 = 37 × 73; 2701 = 73·74/2 (73.º triangular); 2701 + 1072 (inverso de cifras) = <strong>3773</strong> (palíndromo).</p>',
    '<p>בראשית (913) + ברא (203) + אלהים (86) + את (401) + השמים (395) + ואת (407) + הארץ (296) = <strong>2701</strong>.<br>2701 = 37 × 73; 2701 = 73·74/2 (73rd triangular); 2701 + 1072 (reverse of digits) = <strong>3773</strong> (palindrome).</p>')
rep('<blockquote>La asignación numérica no es arbitraria: el alfabeto (con finales) <strong>es</strong> el conjunto de cifras de un sistema decimal posicional. Coherente con la idea del SY de que las letras son las primitivas estructurales —aquí, las primitivas de la enumeración posicional.</blockquote>',
    '<blockquote>The numerical assignment is not arbitrary: the alphabet (with finals) <strong>is</strong> the set of digits of a positional decimal system. Consistent with the SY\'s idea that the letters are the structural primitives —here, the primitives of positional enumeration.</blockquote>')

# ---- section 3 ----
rep('<h2 id="3-precesión-y-el-grado-de-72-años">3. Precesión y el grado de 72 años</h2>', '<h2 id="3-precesión-y-el-grado-de-72-años">3. Precession and the degree of 72 years</h2>')
rep('<p>La precesión de los equinoccios desplaza el punto vernal retrógradamente sobre la eclíptica a razón de <strong>50,29″ de arco por año</strong> (constante IAU 2006, valor redondeado).</p>',
    '<p>The precession of the equinoxes displaces the vernal point retrogradely along the ecliptic at a rate of <strong>50.29″ of arc per year</strong> (IAU 2006 constant, rounded value).</p>')
rep('<p><strong>Cálculo:</strong></p>', '<p><strong>Calculation:</strong></p>')
rep('<ul><li>50,29″/año ÷ 3600 = <strong>0,01397°/año</strong>.</li><li>1° ÷ 0,01397 = <strong>71,58 años por grado</strong> → ≈ 72 a/° (cifra tradicional).</li><li>1 signo = 30° → 30 ÷ 0,01397 = <strong>2147,5 años por era zodiacal</strong>.</li><li>360° → 360 ÷ 0,01397 = <strong>25 771 años</strong> (año grande precesional real).</li><li>A la cifra tradicional de 72 a/°: 72 × 360 = <strong>25 920 años</strong> (año grande platónico).</li><li><strong>144 años</strong> × 0,01397°/año = <strong>2,01°</strong> (dos grados de precesión).</li></ul>',
    '<ul><li>50.29″/year ÷ 3600 = <strong>0.01397°/year</strong>.</li><li>1° ÷ 0.01397 = <strong>71.58 years per degree</strong> → ≈ 72 y/° (traditional figure).</li><li>1 sign = 30° → 30 ÷ 0.01397 = <strong>2147.5 years per zodiacal era</strong>.</li><li>360° → 360 ÷ 0.01397 = <strong>25 771 years</strong> (real precessional great year).</li><li>At the traditional figure of 72 y/°: 72 × 360 = <strong>25 920 years</strong> (Platonic great year).</li><li><strong>144 years</strong> × 0.01397°/year = <strong>2.01°</strong> (two degrees of precession).</li></ul>')
rep('<p>El <strong>72</strong> no es solo un redondeo: 72 = 6×12, y es la cifra del <em>Shem HaMephorash</em> (los 72 tríos de letras de Éxodo 14:19–21, tres versos de 72 letras). La correspondencia 1° ↔ 72 años dota de contenido a la cifra tradicional.</p>',
    '<p>The <strong>72</strong> is not merely a rounding: 72 = 6×12, and it is the figure of the <em>Shem HaMephorash</em> (the 72 letter-trios of Exodus 14:19–21, three verses of 72 letters). The correspondence 1° ↔ 72 years gives content to the traditional figure.</p>')
rep('<p><strong>Eras precesionales (entrada del equinoccio en cada signo, ayanamsa Lahiri 24,18° en 2024; equinoccio sidérico 335,82° = Piscis):</strong></p>',
    '<p><strong>Precessional eras (entry of the equinox into each sign, Lahiri ayanamsa 24.18° in 2024; sidereal equinox 335.82° = Pisces):</strong></p>')
rep('<th>signo</th><th>entrada</th><th></th><th>signo</th><th>entrada</th>', '<th>sign</th><th>entry</th><th></th><th>sign</th><th>entry</th>')
rep('<td>Aries (טלה)</td><td>~1854 a.C.</td>', '<td>Aries (טלה)</td><td>~1854 BCE</td>')
rep('<td>Libra</td><td>~11 031 d.C.</td>', '<td>Libra</td><td>~11 031 CE</td>')
rep('<td>Tauro (שור)</td><td>~4002 a.C.</td>', '<td>Taurus (שור)</td><td>~4002 BCE</td>')
rep('<td>Escorpio</td><td>~8883 d.C.</td>', '<td>Scorpio</td><td>~8883 CE</td>')
rep('<td>Géminis</td><td>~6150 a.C.</td>', '<td>Gemini</td><td>~6150 BCE</td>')
rep('<td>Sagitario</td><td>~6736 d.C.</td>', '<td>Sagittarius</td><td>~6736 CE</td>')
rep('<td>Cáncer</td><td>~8297 a.C.</td>', '<td>Cancer</td><td>~8297 BCE</td>')
rep('<td>Capricornio</td><td>~4588 d.C.</td>', '<td>Capricorn</td><td>~4588 CE</td>')
rep('<td>Leo (אריה)</td><td>~10 445 a.C.</td>', '<td>Leo (אריה)</td><td>~10 445 BCE</td>')
rep('<td><strong>Acuario (צ)</strong></td><td><strong>~2441 d.C.</strong></td>', '<td><strong>Aquarius (צ)</strong></td><td><strong>~2441 CE</strong></td>')
rep('<td>Virgo</td><td>~13 178 d.C.</td>', '<td>Virgo</td><td>~13 178 BCE</td>')
rep('<td><strong>Piscis (ק)</strong></td><td><strong>~293 d.C.</strong></td>', '<td><strong>Pisces (ק)</strong></td><td><strong>~293 CE</strong></td>')
rep('<p><strong>Lectura histórica de las eras recientes (ordenadas en el tiempo):</strong></p>', '<p><strong>Historical reading of the recent eras (ordered in time):</strong></p>')
rep('<li><strong>Era de Tauro</strong> (~4002 a.C.): apogeo de los cultos taurinos —Apis en Egipto, toro minoico, becerros sagrados—. El equinoccio de primavera se alzaba en la constelación del Toro.</li>',
    '<li><strong>Era of Taurus</strong> (~4002 BCE): apogee of the bovine cults —Apis in Egypt, the Minoan bull, sacred calves—. The spring equinox rose in the constellation of the Bull.</li>')
rep('<li><strong>Era de Aries</strong> (~1854 a.C.): tránsito al carnero. Patriarcas hebreos (Abraham, «el carnero trabado en la zarza»), cultos del carnero en Egipto (Amón con cuernos), fin de los imperios taurinos.</li>',
    '<li><strong>Era of Aries</strong> (~1854 BCE): transition to the ram. Hebrew patriarchs (Abraham, "the ram caught in the thicket"), ram cults in Egypt (Amun with horns), end of the bovine empires.</li>')
rep('<li><strong>Era de Piscis</strong> (~293 d.C.): el pez como símbolo cristiano; el equinoccio entra en Piscis. Coincide con la consolidación del cristianismo (s. IV).</li>',
    '<li><strong>Era of Pisces</strong> (~293 CE): the fish as a Christian symbol; the equinox enters Pisces. Coincides with the consolidation of Christianity (4th c.).</li>')
rep('<li><strong>Era de Acuario</strong> (~2441 d.C.): entrada futura. <strong>Pero la entrada de Plutón en Acuario (2024) y de Neptuno en Aries (2025) anticipan estructuralmente la era</strong> (sección 12).</li>',
    '<li><strong>Era of Aquarius</strong> (~2441 CE): future entry. <strong>But the entry of Pluto into Aquarius (2024) and of Neptune into Aries (2025) structurally anticipate the era</strong> (section 12).</li>')
rep('<blockquote>Las «eras de ~2000 años» son la <strong>era precesional</strong> (2147,5 a, ≈ 2000 en redondeo popular). Es una periodicidad de <strong>fondo</strong>, distinta del <strong>~491 años</strong> sinódico Neptuno–Plutón que rige la legibilidad de Génesis (sección 12). Ambas coinciden ahora.</blockquote>',
    '<blockquote>The "eras of ~2000 years" are the <strong>precessional era</strong> (2147.5 y, ≈ 2000 in popular rounding). It is a <strong>background</strong> periodicity, distinct from the <strong>~491-year</strong> Neptune–Pluto synodic that governs the legibility of Genesis (section 12). Both coincide now.</blockquote>')

# ---- section 4 ----
rep('<h2 id="4-equinoccios-solsticios-y-la-rejilla-tropical">4. Equinoccios, solsticios y la rejilla tropical</h2>', '<h2 id="4-equinoccios-solsticios-y-la-rejilla-tropical">4. Equinoxes, solstices, and the tropical grid</h2>')
rep('<figcaption><span class="fnum">Fig. 1.</span> Rueda estelar en el equinoccio de primavera 2026 (λ☉ = 0°, entrada de Aries). Cada sector de 30° es un signo tropical con su letra simple; los sectores resaltados están ocupados por ≥1 de los 10 cuerpos. Las 3 madres (א מ ש) en el eje circumpolar fijo (Draco, Osa Menor, Casiopea).</figcaption>',
    '<figcaption><span class="fnum">Fig. 1.</span> Stellar wheel at the spring equinox 2026 (λ☉ = 0°, entry of Aries). Each 30° sector is a tropical sign with its simple letter; the highlighted sectors are occupied by ≥1 of the 10 bodies. The 3 mothers (א מ ש) on the fixed circumpolar axis (Draco, Ursa Minor, Cassiopeia).</figcaption>')
rep('<p>El zodiaco <strong>tropical</strong> se define por la longitud solar aparente geocéntrica λ☉: el equinoccio de primavera es λ☉ = 0°, el solsticio de verano λ☉ = 90°, etc. Los 12 signos son los 12 sectores de 30°. Esta es la rejilla a la que se mapean las 12 simples.</p>',
    '<p>The <strong>tropical</strong> zodiac is defined by the geocentric apparent solar longitude λ☉: the spring equinox is λ☉ = 0°, the summer solstice λ☉ = 90°, etc. The 12 signs are the 12 sectors of 30°. This is the grid to which the 12 simples are mapped.</p>')
rep('<p><strong>Cálculo (astronomy-engine, <code>Seasons(2026)</code> + <code>Ecliptic(GeoVector(Sun)).elon</code>):</strong></p>',
    '<p><strong>Calculation (astronomy-engine, <code>Seasons(2026)</code> + <code>Ecliptic(GeoVector(Sun)).elon</code>):</strong></p>')
rep('<th>evento</th><th>instante (UT)</th><th>λ☉</th><th>signo cardinal</th>', '<th>event</th><th>instant (UT)</th><th>λ☉</th><th>cardinal sign</th>')
rep('<td>Equinoccio de primavera</td><td>2026-03-20 14:45:36</td><td><strong>0,000°</strong></td><td>Aries 0°</td>', '<td>Spring equinox</td><td>2026-03-20 14:45:36</td><td><strong>0.000°</strong></td><td>Aries 0°</td>')
rep('<td>Solsticio de verano</td><td>2026-06-21 08:25:00</td><td><strong>90,000°</strong></td><td>Cáncer 0°</td>', '<td>Summer solstice</td><td>2026-06-21 08:25:00</td><td><strong>90.000°</strong></td><td>Cancer 0°</td>')
rep('<td>Equinoccio de otoño</td><td>2026-09-23 00:05:38</td><td><strong>180,000°</strong></td><td>Libra 0°</td>', '<td>Autumn equinox</td><td>2026-09-23 00:05:38</td><td><strong>180.000°</strong></td><td>Libra 0°</td>')
rep('<td>Solsticio de invierno</td><td>2026-12-21 20:50:22</td><td><strong>270,000°</strong></td><td>Capricornio 0°</td>', '<td>Winter solstice</td><td>2026-12-21 20:50:22</td><td><strong>270.000°</strong></td><td>Capricorn 0°</td>')
rep('<p>La rejilla tropical de 30° iguales es, pues, <strong>una medición astronómica exacta</strong>, no una convención simbólica arbitraria. (Las constelaciones físicas IAU son 13, desiguales; el sistema usa la rejilla tropical por diseño —sección 5.)</p>',
    '<p>The tropical grid of equal 30° is, then, <strong>an exact astronomical measurement</strong>, not an arbitrary symbolic convention. (The physical IAU constellations are 13, unequal; the system uses the tropical grid by design —section 5.)</p>')

# ---- section 5 ----
rep('<h2 id="5-el-mapeo-estelar">5. El mapeo estelar</h2>', '<h2 id="5-el-mapeo-estelar">5. The stellar mapping</h2>')
rep('<figcaption><span class="fnum">Fig. 2.</span> El mapeo tripartito del Sefer Yetzirah sobre el cielo real (2026-08-07). Anillo externo: 12 simples = 12 signos con su letra. Anillo medio: glifos planetarios = las 7 dobles (ב ג ד כ פ ר ת) en sus longitudes. Centro: las 3 madres, eje fijo no precesiona. Sector resaltado = signo ocupado = simple legible ese día.</figcaption>',
    '<figcaption><span class="fnum">Fig. 2.</span> The tripartite mapping of the Sefer Yetzirah over the real sky (2026-08-07). Outer ring: 12 simples = 12 signs with their letter. Middle ring: planetary glyphs = the 7 doubles (ב ג ד כ פ ר ת) at their longitudes. Center: the 3 mothers, a fixed axis that does not precess. Highlighted sector = occupied sign = simple legible that day.</figcaption>')
rep('<th>clase</th><th>n</th><th>letras</th><th>asignación</th><th>depende de la posición</th><th>reutilizable</th>', '<th>class</th><th>n</th><th>letters</th><th>assignment</th><th>depends on position</th><th>reusable</th>')
rep('<td>madres</td><td>3</td><td>א מ ש</td><td>elementos · constelaciones circumpolares fijas (Draco 268°, Osa Menor 89°, Casiopea 38°)</td><td>no (eje fijo)</td><td>siempre</td>',
    '<td>mothers</td><td>3</td><td>א מ ש</td><td>elements · fixed circumpolar constellations (Draco 268°, Ursa Minor 89°, Cassiopeia 38°)</td><td>no (fixed axis)</td><td>always</td>')
rep('<td>dobles</td><td>7</td><td>ב ג ד כ פ ר ת</td><td>los 7 planetas clásicos (identidad del planeta)</td><td>no</td><td>siempre</td>',
    '<td>doubles</td><td>7</td><td>ב ג ד כ פ ר ת</td><td>the 7 classical planets (identity of the planet)</td><td>no</td><td>always</td>')
rep('<td>simples</td><td>12</td><td>ה ו ז ח ט י ל נ ס ע צ ק</td><td>los 12 signos tropicales</td><td><strong>sí</strong> (signo ocupado)</td><td>sí (pertenencia)</td>',
    '<td>simples</td><td>12</td><td>ה ו ז ח ט י ל נ ס ע צ ק</td><td>the 12 tropical signs</td><td><strong>yes</strong> (occupied sign)</td><td>yes (membership)</td>')
rep('<p><strong>Mapeo simple↔signo:</strong></p>', '<p><strong>Simple↔sign mapping:</strong></p>')
rep('<th>signo</th><th>letra</th><th>valor</th><th></th><th>signo</th><th>letra</th><th>valor</th>', '<th>sign</th><th>letter</th><th>value</th><th></th><th>sign</th><th>letter</th><th>value</th>')
rep('<td>Aries</td><td>ה</td><td>5</td><td>&nbsp;</td><td>Libra</td><td>ל</td><td>30</td>', '<td>Aries</td><td>ה</td><td>5</td><td>&nbsp;</td><td>Libra</td><td>ל</td><td>30</td>')
rep('<td>Tauro</td><td>ו</td><td>6</td>', '<td>Taurus</td><td>ו</td><td>6</td>')
rep('<td>Escorpio</td><td>נ</td><td>50</td>', '<td>Scorpio</td><td>נ</td><td>50</td>')
rep('<td>Géminis</td><td>ז</td><td>7</td>', '<td>Gemini</td><td>ז</td><td>7</td>')
rep('<td>Sagitario</td><td>ס</td><td>60</td>', '<td>Sagittarius</td><td>ס</td><td>60</td>')
rep('<td>Cáncer</td><td>ח</td><td>8</td>', '<td>Cancer</td><td>ח</td><td>8</td>')
rep('<td>Capricornio</td><td>ע</td><td>70</td>', '<td>Capricorn</td><td>ע</td><td>70</td>')
rep('<td>Leo</td><td>ט</td><td>9</td><td>&nbsp;</td><td>Acuario</td><td>צ</td><td>90</td>', '<td>Leo</td><td>ט</td><td>9</td><td>&nbsp;</td><td>Aquarius</td><td>צ</td><td>90</td>')
rep('<td>Virgo</td><td>י</td><td>10</td><td>&nbsp;</td><td>Piscis</td><td>ק</td><td>100</td>', '<td>Virgo</td><td>י</td><td>10</td><td>&nbsp;</td><td>Pisces</td><td>ק</td><td>100</td>')
rep('<p><strong>Dobles↔planeta:</strong> Saturno=ב, Júpiter=ג, Marte=ד, Sol=כ, Venus=פ, Mercurio=ר, Luna=ת.</p>',
    '<p><strong>Doubles↔planet:</strong> Saturn=ב, Jupiter=ג, Mars=ד, Sun=כ, Venus=פ, Mercury=ר, Moon=ת.</p>')
rep('<p><strong>Madres↔constelación circumpolar:</strong> א→Draco (268°), מ→Osa Menor (89°), ש→Casiopea (38°). El <strong>eje fijo</strong> no precesiona; las madres son el polo inmóvil del sistema, frente a las 12 simples que rotan con el equinoccio.</p>',
    '<p><strong>Mothers↔circumpolar constellation:</strong> א→Draco (268°), מ→Ursa Minor (89°), ש→Cassiopeia (38°). The <strong>fixed axis</strong> does not precess; the mothers are the motionless pole of the system, in contrast to the 12 simples which rotate with the equinox.</p>')
rep('<blockquote><strong>Nota tropical vs. IAU.</strong> Las 12 simples se mapean a sectores tropicales de 30° (sección 4), no a constelaciones IAU. Es una <strong>decisión de diseño</strong> necesaria para la rejilla letra↔signo uno-a-uno; aplicar fronteras IAU (13, desiguales) destruiría la premisa. Las madres, en cambio, sí se sitúan frente a sus constelaciones reales.</blockquote>',
    '<blockquote><strong>Tropical vs. IAU note.</strong> The 12 simples are mapped to tropical sectors of 30° (section 4), not to IAU constellations. It is a <strong>design decision</strong> necessary for the one-to-one letter↔sign grid; applying IAU boundaries (13, unequal) would destroy the premise. The mothers, by contrast, are indeed placed against their real constellations.</blockquote>')

missing=[]
for a,b in R:
    if a in src: src = src.replace(a,b)
    else: missing.append(a[:70])
io.open('../pdf/lector-del-cielo_EN.html','w',encoding='utf-8').write(src)
print("part2 done; reps:",len(R),"missing:",len(missing))
for m in missing: print("  MISS:",m)