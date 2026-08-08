#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Aplica las 5 correcciones de sourcing al EN HTML v3.1. rep(a,b) seguro."""
import io, shutil

SRC = "../pdf/lector-del-cielo_EN.html"
BAK = "../backups/lector-del-cielo_EN.html.bak-pre-caveats"

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
 "<p>Ezekiel 1 and Revelation 4 describe four beings with faces of <strong>man, lion, ox, and eagle</strong>. They correspond to the <strong>4 fixed signs</strong> of the zodiac (the fixed axis, opposite the cardinal axis):</p>",
 "<p>Ezekiel 1 and Revelation 4 describe four beings with faces of <strong>man, lion, ox, and eagle</strong>. They are read here as the <strong>4 fixed signs</strong> of the zodiac (the fixed axis, opposite the cardinal axis). <em>Dating caveat:</em> the creature↔fixed-sign identification (Taurus-Leo-Scorpio-Aquarius) is a modern astrological reading; ancient patristic exegesis (Irenaeus, c.180) mapped the four creatures to the <strong>four Evangelists</strong>, not to zodiac signs. The correspondence is kept as an astrological-theological hypothesis, not as attested exegesis:</p>",
 "§6.1 tetramorfo caveat"
)

# ── Edit 2: §6.3 degradar a hipótesis ─────────────────────────────────────
rep(
 "<strong>This is intentional verse engineering, empirically verified</strong>, not inference.",
 "<strong>This is a real arithmetic fact of the received Masoretic text</strong>; its reading as <em>intentional engineering</em> is a hypothesis, not a demonstration: the 72-triplet extraction method is medieval (first Rashi, 11th c., on a secondary reading of the Mishnah), not ancient, and the stability of the 72-72-72 count across textual traditions is unverified (the <em>matres lectionis</em> were not fixed when the verses were composed).",
 "§6.3 degradar a hipótesis"
)

# ── Edit 5a: §9.6 tabla abjad genealógico ────────────────────────────────
rep(
 "<td>same positional assignment as Hebrew (§2)</td>",
 "<td>same positional assignment as Hebrew (§2) — <strong>shared descent, not independent invention</strong></td>",
 "§9.6 tabla abjad genealógico"
)

# ── Edit 5b: §9.6 síntesis ────────────────────────────────────────────────
rep(
 "<blockquote><strong>Cross-cultural synthesis.</strong> The \"73 = solar year\" (§9.4) —the real celestial relation of the factors of Genesis 1:1— is <strong>independently encoded in the Maya calendar</strong> twice (Haab 365 = 73×5 and Calendar Round 73 <em>Tzolkin</em>). Meton (19/235) was rediscovered by China; decimal-positional gematria is shared by Greek and Arabic. These are the strongest corroborations: no borrowing posited, only verifiable arithmetic coincidence.</blockquote>",
 "<blockquote><strong>Cross-cultural synthesis.</strong> The \"73 = solar year\" (§9.4) —the real celestial relation of the factors of Genesis 1:1— is <strong>independently encoded in the Maya calendar</strong> twice (Haab 365 = 73×5 and Calendar Round 73 <em>Tzolkin</em>); Meton (19/235) was rediscovered independently by China. Decimal-positional gematria, by contrast, is shared by Greek (<em>isopsephy</em>), Hebrew, and Arabic (<em>abjad</em>) <strong>by shared descent</strong> (all derive from the Greek/Semitic alphabetic numeral system, 6th–2nd c. BCE), not by independent invention; it therefore does not count as independent corroboration. The strongest Islamic parallel of the letter↔star correspondence is <strong>Ibn Arabi</strong> (d.1240, <em>Futūḥāt</em> ch.198): 28 letters ↔ 28 lunar mansions ↔ 7 planets ↔ days, but it is <strong>lunar (28), not solar (12+7+3)</strong>, and Ibn Arabi himself calls the mansions a \"convention\". The strongest independent corroborations are thus the Maya (73×5, Calendar Round) and the Chinese (Meton).</blockquote>",
 "§9.6 síntesis abjad+Ibn Arabi"
)

# ── Edit 3a: §15b.2 caveat renacentista ──────────────────────────────────
rep(
 "the reduction is the <strong>bridge §2 ↔ operative tradition of sigils</strong>.</p>",
 "the reduction is the <strong>bridge §2 ↔ operative tradition of sigils</strong>. <em>Dating caveat:</em> the Aiq Bekar <em>reduction</em> is medieval (attested in Midrash Tannaim, Abulafia, Baal ha-Turim; Greek root <em>pythmen</em>), but the <em>name</em> \"Aiq Bekar\", the 3×3 table, and above all the <em>sigil-traced-on-the-kamea method</em> are Renaissance (first Agrippa, <em>De occulta philosophia</em> III, 1531), not medieval Jewish; the Aiq Bekar↔Lo Shu link is modern (Golden Dawn, 19th c.).</p>",
 "§15b.2 caveat renacentista"
)

# ── Edit 3b: §15b.3 caveat sigilo ────────────────────────────────────────
rep(
 "The sigil is thus the <strong>geometric footprint of the name on the decimal grid</strong> — not ornament, but a projection of §2 via Aiq Bekar.</p>",
 "The sigil is thus the <strong>geometric footprint of the name on the decimal grid</strong> — not ornament, but a projection of §2 via Aiq Bekar. (<em>Dating caveat:</em> the sigil-on-kamea method, though operationally clear and reproducible, is first attested in the Christian-Renaissance Kabbalah of Agrippa [1531], not in medieval Jewish sources; it is presented here as operative tradition, not as tannaitic or gaonic practice.)</p>",
 "§15b.3 caveat sigilo"
)

# ── Edit 1: bibliografía ──────────────────────────────────────────────────
BIB_NEW = (
"<li>Saadia Gaon, <em>Commentary on the Sefer Yetzirah</em> (c. 931 CE): first explicit assignment 7 doubles→7 planets (geocentric order) and 12 simples→12 signs.</li>"
"<li>Ibn Ezra, A. <em>Sefer ha-Shem</em> (1148), <em>Sefer ha-Olam</em>, <em>Reshit Hokhmah</em> (1147): gematria of the Tetragrammaton; astronomy/astrology (mazzalot, 28 mansions, precession/trepidation).</li>"
"<li>al-Buni, A. <em>Shams al-Maʿārif</em> (13th c.): magic squares, 99 Names, abjad isopsephy (Islamic analogue of practical Kabbalah).</li>"
"<li>Ibn Arabi, <em>Futūḥāt al-Makkiyya</em> ch.198: 28 letters ↔ 28 lunar mansions ↔ 7 planets (Sufi parallel of the letter↔star correspondence).</li>"
"<li>Aleppo Codex (c. 920 CE) and Leningrad Codex (1008/9 CE): Masoretic (MT) base of the consonantal count of Exodus 14:19-21.</li>"
"<li>Agrippa von Nettesheim, H. C. <em>De occulta philosophia</em> III (1531/33): first attestation of the sigil-on-kamea method and of the Aiq Bekar table in Christian-Renaissance Kabbalah.</li>"
"<li><em>Domination Codex</em> (hermeneutical source cited in §6.3; same 231/ABBA/Abulafia arithmetic, no null tests).</li>"
"<li>Idel, M. \"Sefer Razi'el ha-Mal'akh — A Conduit of Medieval Ashkenazi Culture\", <em>Aschkenas</em> 34/2 (2024); Rebiger, B. \"Zur Redaktionsgeschichte des Sefer Razi'el ha-Mal'akh\", <em>FJB</em> 32 (2005).</li>"
)

rep(
 "<li><em>Shem HaMephorash</em> (Name of 72): triplets of Exodus 14:19-21; tradition in <em>Bahir</em>, <em>Zohar</em>, and Abulafia.</li></ul>",
 "<li><em>Shem HaMephorash</em> (Name of 72): triplets of Exodus 14:19-21; tradition in <em>Bahir</em>, <em>Zohar</em>, and Abulafia.</li>" + BIB_NEW + "</ul>",
 "bibliografía añadir fuentes"
)

with io.open(SRC, "w", encoding="utf-8") as f:
    f.write(src)

print("\n==== RESULTADO ====")
print("MISS count: %d  %s" % (len(misses), misses if misses else "(todos OK)"))