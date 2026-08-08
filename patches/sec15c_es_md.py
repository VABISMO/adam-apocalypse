#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Inserta §15c Apocalipsis en el máster ES .md antes de '## 16. Limitaciones'.
Prose autocontenido, sin SVG (.md no tiene figuras)."""
import io, shutil

SRC = "../article/lector-del-cielo-articulo.md"
BAK = "../backups/lector-del-cielo-articulo.md.bak-pre-15c"
with io.open(SRC, "r", encoding="utf-8") as f:
    src = f.read()
shutil.copyfile(SRC, BAK)

ANCHOR = "## 16. Limitaciones"
assert ANCHOR in src, "ancla no encontrada"

SEC15C = r"""## 15c. Apocalipsis: el cielo como pergamino sellado

Una lectura estructural, no una exégesis confesional. El Apocalipsis (c. 95 d.C.) emerge del mismo milieu que el Sefer Yetzirah textualizado (merkabá + letras-creadoras + calendario 360/7/12). Lo que sigue mapea los números del Apocalipsis sobre la aritmética 3/7/12 del SY: los números están en el texto (verificable); el mapeo es interpretativo (no afirma que Juan leyera el SY — convergen sin préstamo).

### 15c.1 El cielo-texto: Α, Ω y el pergamino que se enrolla

Ap 6:14: «el cielo se retiró como un pergamino que se enrolla, y todo monte y toda isla se movió de su lugar», precedido de «las estrellas del cielo cayeron a la tierra como la higuera deja caer sus frutos». El cielo es un **libro** (βιβλίον); las estrellas son las **letras**; enrollar el pergamino = la banda zodiacal (las 12 simples) que se cierra y las letras que se desatan de su asiento. «Yo soy el Alfa y la Omega, el primero y el último» (Ap 1:8; 21:6; 22:13) = los límites del alfabeto = la totalidad de las letras = el cosmos como texto. En el SY esto es literal: «con 22 letras formó toda su creación». El Cordero que toma el pergamino sellado y lo abre (Ap 5) = el que sabe **leer el cielo como un libro** = el *Lector Caeli*.

### 15c.2 Los 7 sellos y las 7 trompetas = letra y voz

El SY llama a sus 7 dobles (ב ג ד כ פ ר ת) letras «con dos lenguas»: cada una tiene dos pronunciaciones (plosiva/fricativa, p. ej. ב = b/v). La misma letra existe en dos modalidades: **inscrita, muda** y **sonada, voceada**. Los 7 sellos = las 7 dobles como **letras inscritas y cerradas** (σφραγίς = sello); el séptimo sello es **silencio en el cielo por media hora** (Ap 8:1) = la letra muda, el séptimo = el sábado = el reposo de la 7ª doble (§15b.9: 7 dobles = 7 días, el 7º = sábado). Las 7 trompetas = las 7 dobles como **voz, sonido, el shofar**: suenan sólo después del séptimo sello, porque primero se lee la letra y luego se la hace sonar. Sello→trompeta = letra→voz, la dualidad grabado/sonado del SY. El Cordero que las abre es él mismo **7 cuernos + 7 ojos + 7 espíritus** (Ap 5:6): el triple-7, las 7 en sus tres modos.

### 15c.3 El 21 = C(7,2)

El Apocalipsis tiene tres heptadas de juicios: 7 sellos + 7 trompetas + 7 copas = **21**. Y 21 = **C(7,2) = 7×6/2** = el número de parejas distintas entre las 7 dobles. Las 231 puertas del SY son C(22,2) para el alfabeto entero; al nivel de las 7 dobles, C(7,2) = 21 = las 21 combinaciones dos a dos. Hay además una **cuarta** heptad, los 7 truenos (Ap 10), que están **sellados y no se escriben**: el 7 oculto. 21 revelados + 7 escondidos = **28** = las 28 mansiones lunares / el abjad. Contando las 7 iglesias del inicio, son 5 heptadas (35 = 5×7); 4 reveladas (28) + 1 sellada (7).

### 15c.4 Los 12, el 144.000 y el cubo de 12

Los 144.000 sellados (Ap 7:4; 14:1) = 12 × 12.000 = las **12 simples** selladas (σφραγίς, la misma palabra que los 7 sellos) en la frente; el sello = la firma = la letra. 144 = 12². El muro de la ciudad = **144 codos** (Ap 21:17) = 12². La Nueva Jerusalén es un **cubo** de arista 12.000 estadios (Ap 21:16): el cubo = las **3 madres** (las 3 dimensiones) × arista **12** (las simples); 12³ = 1728. Y 144.000 = 12² × 1.000 = **(zodiaco)² × milenio**, donde el milenio (1.000, Ap 20) = 10³ = las 10 sefirot al cubo. Así 144.000 = 12² × 10³. Convergencia cross-cultural: 144.000 = los sellados del Apocalipsis, el baktun maya (144.000 días) y 144 = 12² en Metón (12×12+7×13 = 144+91 = 235); el 12² unifica los tres.

Alrededor del trono (Ap 4): 24 ancianos + 4 vivientes = **28**. Los 24 = 12 tribus + 12 apóstoles = el 12 duplicado; los 4 vivientes = el tetramorfo (león/buey/hombre/águila). 24+4 = 28 mansiones lunares. Y el 4 = ⅓ de 12 = una triplicidad.

Las **fracciones de juicio** escalan en doceavos: los jinetes (4º sello) reciben autoridad sobre **¼** de la tierra (Ap 6:8); las trompetas hieren **⅓** del mar, los ríos, el sol-luna-estrellas, la humanidad (Ap 8:7-12; 9:15); las copas hieren **el todo** (Ap 16). En doceavos: ¼ = 3/12 → ⅓ = 4/12 → 1 = 12/12; cada heptad sube la fracción en 1/12 = un signo zodiacal. El ⅓ = 4/12 = una triplicidad (un elemento). Y el dragón (Ap 12:4) barre con la cola **un tercio de las estrellas**: la misma ⅓ = la triplicidad desatada. «El cielo se enrolla y las estrellas caen» (6º sello) y «el dragón barre ⅓ de las estrellas» (Ap 12) son el mismo evento desde dos lados.

### 15c.5 El 3½ = el medio-heptad = el dominio de la bestia

El «tiempo de la bestia» = 3½ en todas partes: la bestia recibe 42 meses de autoridad (Ap 13:5); la mujer es nutrida 1.260 días = «tiempo, tiempos y medio tiempo» (Ap 12:6,14); los dos testigos profetizan 1.260 días y la ciudad santa es hollada 42 meses (Ap 11:2-3). 1.260 = 3½ × 360 = **la mitad del 7 × el círculo-grado**. El 3½ = el 7 **partido** = la simetría rota. El mal gana exactamente el medio-7; cuando suena la 7ª trompeta, «el reino del mundo viene a ser de nuestro Señor» (Ap 11:15): el medio-7 cede al 7 entero. Honestamente, 3½ es teológico, no orbital (1.260 días ≈ 43 meses sinódicos, no es un ciclo eclipsal limpio).

La bestia no inventa números: los **parodia**. El dragón (Ap 12:3) tiene 7 cabezas + 7 diademas = falsifica el 7 divino (7 espíritus/sellos); la bestia del mar (Ap 13:1) tiene 10 cuernos + 10 diademas = falsifica el 10 (las 10 sefirot / los 10 mandamientos); el trío dragón + bestia + falso profeta = falsifica el 3 (la trinidad / las 3 madres). El 7, además, es **el mismo instrumento con dos voces**: el 7 divino (sellos) y el 7 de la bestia (7 cabezas coronadas) son las 7 dobles «con dos lenguas» sonando lo divino o la bestia.

### 15c.6 La isopsefia del Apocalipsis (verificada por cálculo)

El Apocalipsis 13:18 es el **único verso del NT que ordena un cálculo de gematría**: «el que tenga entendimiento, calcule el número de la bestia... 666». Y 666 = Σ(1..36) = la constante del **kamea del Sol** (§15b.1: el Sol 6×6 suma 1+…+36 = 666 = 6×111). La bestia = el número solar/material.

Computado por isopsefia griega (verificado):

| nombre | valor |
|---|---|
| Ἰησοῦς (Jesús) | **888** = 8×111 |
| Χριστός (Cristo) | **1480** |
| Jesús + Cristo | **2368** |
| la bestia (Ap 13:18) | **666** = 6×111 |
| Ἀπολλύων (Apolión, Ap 9:11) | **1461** = ciclo sótico |
| אבדון (Abadón, hebreo) | 63 = 7×9 |

**Familia 111**: 666 = 6×111 (la bestia, el 6 que se queda corto del 7 = lo material) y 888 = 8×111 (Cristo, el 8 = el octavo día, el más-allá-del-7 = la resurrección). 666/888 = 3/4. La bestia y el Cristo son el mismo 111 escalado por 6 y por 8.

**Apolión = 1461 = el ciclo sótico**: 1461 años vagos egipcios (= 1460 julianos) es el periodo de retorno del orto helíaco de **Sirio** (la estrella perro). Y el 5º sello-trompeta donde aparece Apolión es **literalmente** sobre una estrella que cae del cielo y abre el abismo (Ap 9:1), y su rey tiene el número sótico. La estrella caída = Sirio; el destructor = el ciclo del perro. Ap 9:11 da el nombre en **los dos sistemas** — hebreo (Abadón) y griego (Apolión) — un puente gematría/isopsefia. Esto cierra la asignatura «sótico» de la lista de hallazgos pendientes.

### 15c.7 Caveat epistémico

**Viejo y verificable (atestiguado ss.I-II, en el texto)**: los números 7 / 12 / 144 / 144.000 / 1.260 / 3½ / ¼-⅓-1 / 28 (24+4) y la isopsefia 888-1480-2368-666-1461 (computable hoy); el motivo del cielo-como-libro-sellado (apocalíptico + merkabá, coetáneo del SY). **Interpretativo (lectura, no hecho)**: el mapeo SY 3/7/12 → sellos/trompetas/21/144.000/cubo/28; la identificación Apolión=Sirio; «bestia = parodia del 7/10/3». Son estructurales y limpias, pero no afirman que Juan leyera el SY: comparten el cosmos simbólico judío tardío (merkabá + letras-creadoras + calendario 360/7/12), de modo que **convergen sin préstamo**. La isopsefia 1461=Sothic es **hecho aritmético**; que Juan quisiera señalar Sirio es **hipótesis** (fuerte, dado que el 5º sello es explícitamente sobre una estrella que cae y su rey tiene el número sótico, pero no demostración de intención).

---

"""

src = src.replace(ANCHOR, SEC15C + ANCHOR, 1)
with io.open(SRC, "w", encoding="utf-8") as f:
    f.write(src)
print("OK: §15c insertado en .md antes de '## 16. Limitaciones'")
print("tamaño nuevo:", len(src), "bytes")