#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Aplica 3 correcciones de sourcing al ES HTML v2.4 (§15b/§9.6 ausentes en v2.4,
por eso sólo #1/#2/#4). NO toca la estructura v2.4. rep(a,b) seguro: reporta MISS sin romper."""
import io, shutil

SRC = "../pdf/lector-del-cielo.html"
BAK = "../backups/lector-del-cielo.html.bak-pre-caveats"

with io.open(SRC, "r", encoding="utf-8") as f:
    src = f.read()
shutil.copyfile(SRC, BAK)

misses = []
def rep(a, b, label):
    global src
    if a in src:
        src = src.replace(a, b, 1)
        print("OK  [%s]" % label)
    else:
        misses.append(label)
        print("MISS[%s]" % label)

# ── Edit 4: §6.1 tetramorfo caveat ────────────────────────────────────────
rep(
 "<p>Ezequiel 1 y Apocalipsis 4 describen cuatro seres con caras de <strong>hombre, león, buey y águila</strong>. Corresponden a los <strong>4 signos fijos</strong> del zodiaco (el eje fijo, opuesto al eje cardinal):</p>",
 "<p>Ezequiel 1 y Apocalipsis 4 describen cuatro seres con caras de <strong>hombre, león, buey y águila</strong>. Se interpretan aquí como los <strong>4 signos fijos</strong> del zodiaco (el eje fijo, opuesto al eje cardinal). <em>Caveat de datación:</em> la identificación criatura↔signo fijo (Tauro-Leo-Escorpio-Acuario) es una lectura astrológica moderna; la exégesis patrística antigua (Ireneo, c.180) mapeaba las cuatro criaturas a los <strong>cuatro evangelistas</strong>, no a signos zodiacales. Se conserva la correspondencia como hipótesis astrológico-teológica, no como exégesis atestiguada:</p>",
 "§6.1 tetramorfo caveat"
)

# ── Edit 2: §6.3 degradar a hipótesis ─────────────────────────────────────
rep(
 "<strong>Esto es ingeniería intencional de versos, empíricamente verificada</strong>, no inferencia.",
 "<strong>Esto es un hecho aritmético real del texto masorético recibido</strong>; su lectura como <em>ingeniería intencional</em> es una hipótesis, no una demostración: el método de extracción de los 72 tripletes es medieval (primero Rashi, s.XI, sobre una lectura secundaria de la Mishná), no antiguo, y la estabilidad del conteo 72-72-72 entre tradiciones textuales no está verificada (las <em>matres lectionis</em> no estaban fijadas al componerse los versos).",
 "§6.3 degradar a hipótesis"
)

# ── Edit 1: bibliografía ──────────────────────────────────────────────────
BIB_NEW = (
"<li>Saadia Gaon, <em>Comentario al Sefer Yetzirah</em> (c. 931 d.C.): primera asignación explícita 7 dobles→7 planetas (orden geocéntrico) y 12 simples→12 signos.</li>"
"<li>Ibn Ezra, A. <em>Sefer ha-Shem</em> (1148), <em>Sefer ha-Olam</em>, <em>Reshit Hokhmah</em> (1147): gematría del Tetragrammaton; astronomía/astrología (mazzalot, 28 mansiones, precesión/trepidación).</li>"
"<li>al-Buni, A. <em>Shams al-Maʿārif</em> (s.XIII): cuadrados mágicos, 99 Nombres, isopsefia abjad (análogo islámico de la cábala práctica).</li>"
"<li>Ibn Arabi, <em>Futūḥāt al-Makkiyya</em> cap.198: 28 letras ↔ 28 mansiones lunares ↔ 7 planetas (paralelo sufí de la correspondencia letra↔estrella).</li>"
"<li>Codex Aleppo (c. 920 d.C.) y Codex Leningrado (1008/9 d.C.): base del texto masorético (MT) del recuento consonántico de Éxodo 14:19-21.</li>"
"<li>Agrippa von Nettesheim, H. C. <em>De occulta philosophia</em> III (1531/33): primera atestación del método del sigilo sobre kamea y de la tabla Aiq Bekar en cábala cristiano-renacentista.</li>"
"<li><em>Domination Codex</em> (fuente hermenéutica citada en §6.3; misma aritmética 231/ABBA/Abulafia, sin tests nulos).</li>"
"<li>Idel, M. «Sefer Razi'el ha-Mal'akh — A Conduit of Medieval Ashkenazi Culture», <em>Aschkenas</em> 34/2 (2024); Rebiger, B. «Zur Redaktionsgeschichte des Sefer Razi'el ha-Mal'akh», <em>FJB</em> 32 (2005).</li>"
)

rep(
 "<li><em>Shem HaMephorash</em> (Nombre de 72): tripletes de Éxodo 14:19-21; tradición en <em>Bahir</em>, <em>Zohar</em> y Abulafia.</li></ul>",
 "<li><em>Shem HaMephorash</em> (Nombre de 72): tripletes de Éxodo 14:19-21; tradición en <em>Bahir</em>, <em>Zohar</em> y Abulafia.</li>" + BIB_NEW + "</ul>",
 "bibliografía añadir fuentes"
)

with io.open(SRC, "w", encoding="utf-8") as f:
    f.write(src)

print("\n==== RESULTADO ====")
print("MISS count: %d  %s" % (len(misses), misses if misses else "(todos OK)"))