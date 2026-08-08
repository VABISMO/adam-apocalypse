#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Insert §15c (Spanish, autocontenido, sin refs a §15b/§9.6) + Fig 11/12 (SVG en español)
en lector-del-cielo.html (v2.4) antes de <h2 id="16-limitaciones">. No rompe la estructura v2.4."""
import io, shutil

SRC = "../pdf/lector-del-cielo.html"
BAK = "../backups/lector-del-cielo.html.bak-pre-15c"
with io.open(SRC, "r", encoding="utf-8") as f:
    src = f.read()
shutil.copyfile(SRC, BAK)

ANCHOR = '<h2 id="16-limitaciones">16. Limitaciones</h2>'
assert ANCHOR in src, "ancla no encontrada"

def fig11():
    signs = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓']
    p = []
    p.append('<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pergamino zodiacal que se enrolla">')
    p.append('<rect x="0" y="0" width="600" height="240" fill="#0e1320"/>')
    p.append('<text x="300" y="22" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#cfe0ff">Ap 6:14 — el cielo como pergamino que se enrolla</text>')
    p.append('<defs><g id="star11"><polygon points="0,-6 1.4,-2 6,-2 2.2,1 3.6,5 0,2.5 -3.6,5 -2.2,1 -6,-2 -1.4,-2" fill="#cfe0ff"/></g></defs>')
    p.append('<circle cx="50" cy="120" r="16" fill="none" stroke="#3a4762" stroke-width="1.4"/>')
    p.append('<circle cx="50" cy="120" r="9" fill="none" stroke="#3a4762" stroke-width="1"/>')
    p.append('<rect x="66" y="95" width="300" height="50" rx="3" fill="#10182a" stroke="#3a4762" stroke-width="1.2"/>')
    for k in range(1, 12):
        x = 66 + 25 * k
        p.append('<line x1="%g" y1="95" x2="%g" y2="145" stroke="#283145" stroke-width="0.6"/>' % (x, x))
    for k, g in enumerate(signs):
        x = 66 + 25 * k + 12.5
        p.append('<text x="%g" y="126" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#cfe0ff">%s</text>' % (x, g))
    p.append('<path d="M366,120 C 396,120 410,108 416,96 A 26 26 0 1 1 416 144 C 408,150 396,150 380,140" fill="none" stroke="#3a4762" stroke-width="1.4"/>')
    p.append('<circle cx="416" cy="120" r="26" fill="none" stroke="#3a4762" stroke-width="1.2"/>')
    p.append('<circle cx="416" cy="120" r="17" fill="none" stroke="#3a4762" stroke-width="0.9"/>')
    p.append('<circle cx="416" cy="120" r="8" fill="none" stroke="#3a4762" stroke-width="0.7"/>')
    p.append('<text x="50" y="126" text-anchor="middle" font-family="serif" font-size="17" fill="#ffcf6a">Α</text>')
    p.append('<text x="416" y="100" text-anchor="middle" font-family="serif" font-size="17" fill="#ffcf6a">Ω</text>')
    for (x, y) in [(430, 150), (455, 165), (478, 178)]:
        p.append('<line x1="%g" y1="%g" x2="%g" y2="%g" stroke="#283145" stroke-width="0.5"/>' % (x, y, x + 10, y + 16))
    for (x, y) in [(430, 150), (455, 165), (478, 178), (445, 195), (500, 150), (470, 200), (515, 172)]:
        p.append('<use href="#star11" x="%g" y="%g"/>' % (x, y))
    p.append('<text x="588" y="212" text-anchor="end" font-family="sans-serif" font-size="8" fill="#8aa0c0">estrellas = letras que caen</text>')
    p.append('<text x="300" y="232" text-anchor="middle" font-family="sans-serif" font-size="8.5" fill="#7fb0ff">el Cordero abre el libro = el Lector Caeli  ·  el cielo es un βιβλίον</text>')
    p.append('</svg>')
    svg = ''.join(p)
    return ('<figure class="fig" id="fig11"><div class="fig-frame">' + svg + '</div>'
            '<figcaption><span class="fnum">Fig. 11.</span> Ap 6:14 — la banda zodiacal (las 12 simples) como un pergamino escrito que se enrolla; las estrellas (las letras constelacionales) caen de su asiento. «Yo soy el Alfa y la Omega» = los límites del alfabeto = el cosmos como texto. El Cordero que abre el pergamino sellado es el que sabe leer el cielo como un libro — el Lector Caeli.</figcaption></figure>')

def fig12():
    p = []
    p.append('<svg viewBox="0 0 440 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Nueva Jerusalen cubo de 12">')
    p.append('<rect x="0" y="0" width="440" height="340" fill="#0e1320"/>')
    p.append('<text x="220" y="22" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#cfe0ff">Ap 21 — la Nueva Jerusalén = el cubo de 12</text>')
    p.append('<polygon points="220,87 287.5,126 220,165 152.5,126" fill="#14223a" stroke="#3a4762" stroke-width="1.2"/>')
    p.append('<polygon points="287.5,126 287.5,204 220,243 220,165" fill="#0e1320" stroke="#3a4762" stroke-width="1.2"/>')
    p.append('<polygon points="152.5,126 220,165 220,243 152.5,204" fill="#11192a" stroke="#3a4762" stroke-width="1.2"/>')
    p.append('<text x="220" y="120" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffcf6a">12</text>')
    p.append('<text x="300" y="168" text-anchor="start" font-family="sans-serif" font-size="7.5" fill="#8aa0c0">12 000 estadios</text>')
    p.append('<text x="160" y="168" text-anchor="end" font-family="sans-serif" font-size="7.5" fill="#8aa0c0">muro 144 = 12²</text>')
    p.append('<text x="220" y="156" text-anchor="middle" font-family="sans-serif" font-size="7.5" fill="#8aa0c0">codos</text>')
    p.append('<line x1="150" y1="262" x2="290" y2="262" stroke="#3a4762" stroke-width="1"/>')
    for k in range(12):
        x = 153 + 11.5 * k
        p.append('<line x1="%g" y1="259" x2="%g" y2="265" stroke="#7fb0ff" stroke-width="1"/>' % (x, x))
    p.append('<text x="220" y="278" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#7fb0ff">12 puertas (3 × 4 lados)</text>')
    p.append('<text x="220" y="292" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#8aa0c0">12 cimientos (apóstoles)</text>')
    p.append('<text x="220" y="312" text-anchor="middle" font-family="sans-serif" font-size="8.5" fill="#cfe0ff">144 000 sellados = 12² × 10³   ·   12³ = 1 728   ·   cubo = 3 madres × arista 12 (simples)</text>')
    p.append('<text x="220" y="328" text-anchor="middle" font-family="sans-serif" font-size="7.5" fill="#8aa0c0">144 = 12² (Metón 144+91 = 235 · baktun maya 144 000 · sellados Ap 7)</text>')
    p.append('</svg>')
    svg = ''.join(p)
    return ('<figure class="fig" id="fig12"><div class="fig-frame">' + svg + '</div>'
            '<figcaption><span class="fnum">Fig. 12.</span> Ap 21 — la Nueva Jerusalén es un cubo de arista 12 000 estadios (las 3 madres = las 3 dimensiones × arista 12 = las simples; 12³ = 1728), con muro de 144 = 12² codos, y 12 puertas + 12 cimientos = 24 (= 12 tribus + 12 apóstoles). Los 144 000 sellados = 12² × 10³ = (zodiaco)² × (milenio = 10 sefirot al cubo).</figcaption></figure>')

SEC15C = (
'<h2 id="15c-apocalipsis-el-cielo-como-pergamino-sellado">15c. Apocalipsis: el cielo como pergamino sellado</h2>'
'<p>Una lectura estructural, no una exégesis confesional. El Apocalipsis (c. 95 d.C.) emerge del mismo milieu que el Sefer Yetzirah textualizado (merkabá + letras-creadoras + calendario 360/7/12). Lo que sigue mapea los números del Apocalipsis sobre la aritmética 3/7/12 del SY: los números están en el texto (verificable); el mapeo es interpretativo (no afirma que Juan leyera el SY — convergen sin préstamo).</p>'
'<h3 id="15c-1-el-cielo-texto-a-o-y-el-pergamino-que-se-enrolla">15c.1 El cielo-texto: Α, Ω y el pergamino que se enrolla</h3>'
'<p>Ap 6:14: «el cielo se retiró como un pergamino que se enrolla, y todo monte y toda isla se movió de su lugar», precedido de «las estrellas del cielo cayeron a la tierra como la higuera deja caer sus frutos». El cielo es un <strong>libro</strong> (βιβλίον); las estrellas son las <strong>letras</strong>; enrollar el pergamino = la banda zodiacal (las 12 simples) que se cierra y las letras que se desatan de su asiento. «Yo soy el Alfa y la Omega, el primero y el último» (Ap 1:8; 21:6; 22:13) = los límites del alfabeto = la totalidad de las letras = el cosmos como texto. En el SY esto es literal: «con 22 letras formó toda su creación». El Cordero que toma el pergamino sellado y lo abre (Ap 5) = el que sabe <strong>leer el cielo como un libro</strong> = el <em>Lector Caeli</em>.</p>'
+ fig11() +
'<h3 id="15c-2-los-7-sellos-y-las-7-trompetas-letra-y-voz">15c.2 Los 7 sellos y las 7 trompetas = letra y voz</h3>'
'<p>El SY llama a sus 7 dobles (ב ג ד כ פ ר ת) letras «con dos lenguas»: cada una tiene dos pronunciaciones (plosiva/fricativa, p. ej. ב = b/v). La misma letra existe en dos modalidades: <strong>inscrita, muda</strong> y <strong>sonada, voceada</strong>. Los 7 sellos = las 7 dobles como <strong>letras inscritas y cerradas</strong> (σφραγίς = sello); el séptimo sello es <strong>silencio en el cielo por media hora</strong> (Ap 8:1) = la letra muda, el séptimo = el sábado = el reposo de la 7ª doble (las 7 dobles = 7 días; el 7º = sábado). Las 7 trompetas = las 7 dobles como <strong>voz, sonido, el shofar</strong>: suenan sólo después del séptimo sello, porque primero se lee la letra y luego se la hace sonar. Sello→trompeta = letra→voz, la dualidad grabado/sonado del SY. El Cordero que las abre es él mismo <strong>7 cuernos + 7 ojos + 7 espíritus</strong> (Ap 5:6): el triple-7, las 7 en sus tres modos.</p>'
'<h3 id="15c-3-el-21-c7-2">15c.3 El 21 = C(7,2)</h3>'
'<p>El Apocalipsis tiene tres heptadas de juicios: 7 sellos + 7 trompetas + 7 copas = <strong>21</strong>. Y 21 = <strong>C(7,2) = 7×6/2</strong> = el número de parejas distintas entre las 7 dobles. Las 231 puertas del SY son C(22,2) para el alfabeto entero; al nivel de las 7 dobles, C(7,2) = 21 = las 21 combinaciones dos a dos. Hay además una <strong>cuarta</strong> heptad, los 7 truenos (Ap 10), que están <strong>sellados y no se escriben</strong>: el 7 oculto. 21 revelados + 7 escondidos = <strong>28</strong> = las 28 mansiones lunares / el abjad. Contando las 7 iglesias del inicio, son 5 heptadas (35 = 5×7); 4 reveladas (28) + 1 sellada (7).</p>'
'<h3 id="15c-4-los-12-el-144-000-y-el-cubo-de-12">15c.4 Los 12, el 144.000 y el cubo de 12</h3>'
'<p>Los 144.000 sellados (Ap 7:4; 14:1) = 12 × 12.000 = las <strong>12 simples</strong> selladas (σφραγίς, la misma palabra que los 7 sellos) en la frente; el sello = la firma = la letra. 144 = 12². El muro de la ciudad = <strong>144 codos</strong> (Ap 21:17) = 12². La Nueva Jerusalén es un <strong>cubo</strong> de arista 12.000 estadios (Ap 21:16): el cubo = las <strong>3 madres</strong> (las 3 dimensiones) × arista <strong>12</strong> (las simples); 12³ = 1728. Y 144.000 = 12² × 1.000 = <strong>(zodiaco)² × milenio</strong>, donde el milenio (1.000, Ap 20) = 10³ = las 10 sefirot al cubo. Así 144.000 = 12² × 10³. Convergencia cross-cultural: 144.000 = los sellados del Apocalipsis, el baktun maya (144.000 días) y 144 = 12² en Metón (12×12+7×13 = 144+91 = 235); el 12² unifica los tres.</p>'
'<p>Alrededor del trono (Ap 4): 24 ancianos + 4 vivientes = <strong>28</strong>. Los 24 = 12 tribus + 12 apóstoles = el 12 duplicado; los 4 vivientes = el tetramorfo (león/buey/hombre/águila). 24+4 = 28 mansiones lunares. Y el 4 = ⅓ de 12 = una triplicidad.</p>'
'<p>Las <strong>fracciones de juicio</strong> escalan en doceavos: los jinetes (4º sello) reciben autoridad sobre <strong>¼</strong> de la tierra (Ap 6:8); las trompetas hieren <strong>⅓</strong> del mar, los ríos, el sol-luna-estrellas, la humanidad (Ap 8:7-12; 9:15); las copas hieren <strong>el todo</strong> (Ap 16). En doceavos: ¼ = 3/12 → ⅓ = 4/12 → 1 = 12/12; cada heptad sube la fracción en 1/12 = un signo zodiacal. El ⅓ = 4/12 = una triplicidad (un elemento). Y el dragón (Ap 12:4) barre con la cola <strong>un tercio de las estrellas</strong>: la misma ⅓ = la triplicidad desatada. «El cielo se enrolla y las estrellas caen» (6º sello) y «el dragón barre ⅓ de las estrellas» (Ap 12) son el mismo evento desde dos lados.</p>'
+ fig12() +
'<h3 id="15c-5-el-3-medio-heptad-el-dominio-de-la-bestia">15c.5 El 3½ = el medio-heptad = el dominio de la bestia</h3>'
'<p>El «tiempo de la bestia» = 3½ en todas partes: la bestia recibe 42 meses de autoridad (Ap 13:5); la mujer es nutrida 1.260 días = «tiempo, tiempos y medio tiempo» (Ap 12:6,14); los dos testigos profetizan 1.260 días y la ciudad santa es hollada 42 meses (Ap 11:2-3). 1.260 = 3½ × 360 = <strong>la mitad del 7 × el círculo-grado</strong>. El 3½ = el 7 <strong>partido</strong> = la simetría rota. El mal gana exactamente el medio-7; cuando suena la 7ª trompeta, «el reino del mundo viene a ser de nuestro Señor» (Ap 11:15): el medio-7 cede al 7 entero. Honestamente, 3½ es teológico, no orbital (1.260 días ≈ 43 meses sinódicos, no es un ciclo eclipsal limpio).</p>'
'<p>La bestia no inventa números: los <strong>parodia</strong>. El dragón (Ap 12:3) tiene 7 cabezas + 7 diademas = falsifica el 7 divino (7 espíritus/sellos); la bestia del mar (Ap 13:1) tiene 10 cuernos + 10 diademas = falsifica el 10 (las 10 sefirot / los 10 mandamientos); el trío dragón + bestia + falso profeta = falsifica el 3 (la trinidad / las 3 madres). El 7, además, es <strong>el mismo instrumento con dos voces</strong>: el 7 divino (sellos) y el 7 de la bestia (7 cabezas coronadas) son las 7 dobles «con dos lenguas» sonando lo divino o la bestia.</p>'
'<h3 id="15c-6-la-isopsefia-del-apocalipsis-verificada-por-calculo">15c.6 La isopsefia del Apocalipsis (verificada por cálculo)</h3>'
'<p>El Apocalipsis 13:18 es el <strong>único verso del NT que ordena un cálculo de gematría</strong>: «el que tenga entendimiento, calcule el número de la bestia... 666». Y 666 = Σ(1..36) = la constante del <strong>kamea del Sol</strong> (el Sol 6×6 suma 1+…+36 = 666 = 6×111). La bestia = el número solar/material.</p>'
'<p>Computado por isopsefia griega (verificado):</p>'
'<table><thead><tr><th>nombre</th><th>valor</th></tr></thead><tbody>'
'<tr><td>Ἰησοῦς (Jesús)</td><td><strong>888</strong> = 8×111</td></tr>'
'<tr><td>Χριστός (Cristo)</td><td><strong>1480</strong></td></tr>'
'<tr><td>Jesús + Cristo</td><td><strong>2368</strong></td></tr>'
'<tr><td>la bestia (Ap 13:18)</td><td><strong>666</strong> = 6×111</td></tr>'
'<tr><td>Ἀπολλύων (Apolión, Ap 9:11)</td><td><strong>1461</strong> = ciclo sótico</td></tr>'
'<tr><td>אבדון (Abadón, hebreo)</td><td>63 = 7×9</td></tr>'
'</tbody></table>'
'<p><strong>Familia 111</strong>: 666 = 6×111 (la bestia, el 6 que se queda corto del 7 = lo material) y 888 = 8×111 (Cristo, el 8 = el octavo día, el más-allá-del-7 = la resurrección). 666/888 = 3/4. La bestia y el Cristo son el mismo 111 escalado por 6 y por 8.</p>'
'<p><strong>Apolión = 1461 = el ciclo sótico</strong>: 1461 años vagos egipcios (= 1460 julianos) es el periodo de retorno del orto helíaco de <strong>Sirio</strong> (la estrella perro). Y el 5º sello-trompeta donde aparece Apolión es <strong>literalmente</strong> sobre una estrella que cae del cielo y abre el abismo (Ap 9:1), y su rey tiene el número sótico. La estrella caída = Sirio; el destructor = el ciclo del perro. Ap 9:11 da el nombre en <strong>los dos sistemas</strong> — hebreo (Abadón) y griego (Apolión) — un puente gematría/isopsefia. Esto cierra la asignatura «sótico» de la lista de hallazgos pendientes.</p>'
'<h3 id="15c-7-caveat-epistemico">15c.7 Caveat epistémico</h3>'
'<p><strong>Viejo y verificable (atestiguado ss.I-II, en el texto)</strong>: los números 7 / 12 / 144 / 144.000 / 1.260 / 3½ / ¼-⅓-1 / 28 (24+4) y la isopsefia 888-1480-2368-666-1461 (computable hoy); el motivo del cielo-como-libro-sellado (apocalíptico + merkabá, coetáneo del SY). <strong>Interpretativo (lectura, no hecho)</strong>: el mapeo SY 3/7/12 → sellos/trompetas/21/144.000/cubo/28; la identificación Apolión=Sirio; «bestia = parodia del 7/10/3». Son estructurales y limpias, pero no afirman que Juan leyera el SY: comparten el cosmos simbólico judío tardío (merkabá + letras-creadoras + calendario 360/7/12), de modo que <strong>convergen sin préstamo</strong>. La isopsefia 1461=Sothic es <strong>hecho aritmético</strong>; que Juan quisiera señalar Sirio es <strong>hipótesis</strong> (fuerte, dado que el 5º sello es explícitamente sobre una estrella que cae y su rey tiene el número sótico, pero no demostración de intención).</p>'
'<hr/>'
)

src = src.replace(ANCHOR, SEC15C + ANCHOR, 1)
with io.open(SRC, "w", encoding="utf-8") as f:
    f.write(src)
print("OK: §15c + Fig 11/12 insertado en ES HTML antes de §16")
print("nuevo tamaño:", len(src), "bytes")