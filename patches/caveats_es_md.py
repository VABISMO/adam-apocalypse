#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Aplica las 5 correcciones de sourcing (VIEJO vs MODERNO) al máster español v3.1.
Patrón seguro: rep(a,b) con reporte de MISS (no rompe en fallo). Re-ejecutable."""
import io, sys

SRC = "../article/lector-del-cielo-articulo.md"
BAK = "../backups/lector-del-cielo-articulo.md.bak-pre-caveats"

with io.open(SRC, "r", encoding="utf-8") as f:
    src = f.read()

import shutil
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

# ── Edit 4: §6.1 tetramorfo → caveat lectura moderna ──────────────────────
rep(
 "Ezequiel 1 y Apocalipsis 4 describen cuatro seres con caras de **hombre, león, buey y águila**. Corresponden a los **4 signos fijos** del zodiaco (el eje fijo, opuesto al eje cardinal):",
 "Ezequiel 1 y Apocalipsis 4 describen cuatro seres con caras de **hombre, león, buey y águila**. Se interpretan aquí como los **4 signos fijos** del zodiaco (el eje fijo, opuesto al eje cardinal). **Caveat de datación:** la identificación criatura↔signo fijo (Tauro-Leo-Escorpio-Acuario) es una lectura astrológica moderna; la exégesis patrística antigua (Ireneo, c.180) mapeaba las cuatro criaturas a los **cuatro evangelistas**, no a signos zodiacales. Se conserva la correspondencia como hipótesis astrológico-teológica, no como exégesis atestiguada:",
 "§6.1 tetramorfo caveat"
)

# ── Edit 2: §6.3 degradar "ingeniería demostrada" → hipótesis ──────────────
rep(
 "**Esto es ingeniería intencional de versos, empíricamente verificada**, no inferencia.",
 "**Esto es un hecho aritmético real del texto masorético recibido**; su lectura como *ingeniería intencional* es una hipótesis, no una demostración: el método de extracción de los 72 tripletes es medieval (primero Rashi, s.XI, sobre una lectura secundaria de la Mishná), no antiguo, y la estabilidad del conteo 72-72-72 entre tradiciones textuales no está verificada (las *matres lectionis* no estaban fijadas al componerse los versos).",
 "§6.3 degradar a hipótesis"
)

# ── Edit 5a: §9.6 fila tabla abjad → parentesco genealógico ───────────────
rep(
 "misma asignación posicional que el hebreo (§2) |",
 "misma asignación posicional que el hebreo (§2) — **parentesco genealógico, no invención independiente** |",
 "§9.6 tabla abjad genealógico"
)

# ── Edit 5b: §9.6 síntesis → abjad no independiente + Ibn Arabi ────────────
rep(
 "> **Síntesis cross-cultural.** El «73 = año solar» (§9.4) —la relación celeste real de los factores de Génesis 1:1— está **independientemente codificado en el calendario maya** dos veces (Haab 365 = 73×5 y Calendar Round 73 *Tzolkin*). El Metón (19/235) lo redescubrió China; la gematría decimal-posicional la comparten griego y árabe. Estas son las corroboraciones más sólidas: ningún préstamo postulado, sólo coincidencia aritmética verificable.",
 "> **Síntesis cross-cultural.** El «73 = año solar» (§9.4) —la relación celeste real de los factores de Génesis 1:1— está **independientemente codificado en el calendario maya** dos veces (Haab 365 = 73×5 y Calendar Round 73 *Tzolkin*); el Metón (19/235) lo redescubrió China de forma independiente. La gematría decimal-posicional, en cambio, la comparten griego (*isopsephy*), hebreo y árabe (*abjad*) **por parentesco genealógico** (todos descienden del sistema numeral alfabético griego/semítico, ss. VI–II a.C.), no por invención independiente; por tanto no cuenta como corroboración independiente. El paralelo islámico más fuerte de la correspondencia letra↔estrella es **Ibn Arabi** (m.1240, *Futūḥāt* cap.198): 28 letras ↔ 28 mansiones lunares ↔ 7 planetas ↔ días, pero es **lunar (28), no solar (12+7+3)**, y el propio Ibn Arabi llama a las mansiones «convención». Las corroboraciones independientes más sólidas son, pues, las maya (73×5, Calendar Round) y la china (Metón).",
 "§9.6 síntesis abjad+Ibn Arabi"
)

# ── Edit 3a: §15b.2 caveat renacentista ───────────────────────────────────
rep(
 "la reducción es el **puente §2 ↔ tradición operativa de los sigilos**.",
 "la reducción es el **puente §2 ↔ tradición operativa de los sigilos**. **Caveat de datación:** la *reducción* Aiq Bekar es medieval (atestiguada en Midrash Tannaim, Abulafia y Baal ha-Turim; raíz griega *pythmen*), pero el *nombre* «Aiq Bekar», la tabla 3×3 y, sobre todo, el *método del sigilo trazado sobre el kamea* son renacentistas (primero Agrippa, *De occulta philosophia* III, 1531), no judíos medievales; el vínculo Aiq Bekar↔Lo Shu es moderno (Golden Dawn, s.XIX).",
 "§15b.2 caveat renacentista"
)

# ── Edit 3b: §15b.3 caveat sigilo-sobre-kamea ─────────────────────────────
rep(
 "El sigilo es así la **huella geométrica del nombre sobre la rejilla decimal** — no adorno, sino proyección de §2 vía Aiq Bekar.",
 "El sigilo es así la **huella geométrica del nombre sobre la rejilla decimal** — no adorno, sino proyección de §2 vía Aiq Bekar. (Caveat de datación: el método del sigilo-sobre-kamea, aunque operativamente claro y reproducible, está atestiguado primero en la tradición renacentista cristiano-cabalística de Agrippa [1531], no en fuentes judías medievales; se presenta aquí como tradición operativa, no como práctica tannática o geónica.)",
 "§15b.3 caveat sigilo"
)

# ── Edit 1: bibliografía — añadir fuentes nuevas ─────────────────────────
BIB_NEW = """
- Saadia Gaon, *Comentario al Sefer Yetzirah* (c. 931 d.C.): primera asignación explícita 7 dobles→7 planetas (orden geocéntrico) y 12 simples→12 signos.
- Ibn Ezra, A. *Sefer ha-Shem* (1148), *Sefer ha-Olam*, *Reshit Hokhmah* (1147): gematría del Tetragrammaton; astronomía/astrología (mazzalot, 28 mansiones, precesión/trepidación).
- al-Buni, A. *Shams al-Maʿārif* (s.XIII): cuadrados mágicos, 99 Nombres, isopsefia abjad (análogo islámico de la cábala práctica).
- Ibn Arabi, *Futūḥāt al-Makkiyya* cap.198: 28 letras ↔ 28 mansiones lunares ↔ 7 planetas (paralelo sufí de la correspondencia letra↔estrella).
- Codex Aleppo (c. 920 d.C.) y Codex Leningrado (1008/9 d.C.): base del texto masorético (MT) del recuento consonántico de Éxodo 14:19-21.
- Agrippa von Nettesheim, H. C. *De occulta philosophia* III (1531/33): primera atestación del método del sigilo sobre kamea y de la tabla Aiq Bekar en cábala cristiano-renacentista.
- *Domination Codex* (fuente hermenéutica citada en §6.3; misma aritmética 231/ABBA/Abulafia, sin tests nulos).
- Idel, M. «Sefer Razi'el ha-Mal'akh — A Conduit of Medieval Ashkenazi Culture», *Aschkenas* 34/2 (2024); Rebiger, B. «Zur Redaktionsgeschichte des Sefer Razi'el ha-Mal'akh», *FJB* 32 (2005)."""

rep(
 "- *Shem HaMephorash* (Nombre de 72): tripletes de Éxodo 14:19-21; tradición en *Bahir*, *Zohar* y Abulafia.",
 "- *Shem HaMephorash* (Nombre de 72): tripletes de Éxodo 14:19-21; tradición en *Bahir*, *Zohar* y Abulafia." + BIB_NEW,
 "bibliografía añadir fuentes"
)

with io.open(SRC, "w", encoding="utf-8") as f:
    f.write(src)

print("\n==== RESULTADO ====")
print("MISS count: %d  %s" % (len(misses), misses if misses else "(todos OK)"))