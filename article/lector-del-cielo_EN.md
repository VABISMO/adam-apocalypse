H E R M E T I C – A S T R O N O M I C A L  S Y N T H E S I S  ·  2 0 2 6

The Reader of the Sky: the stellar alphabet of
the Sefer Yetzirah as a framework for versicular
legibility, lunar–solar synchrony, and a marker of
precessional eras

The stellar alphabet of the Sefer Yetzirah as a framework for versicular legibility,

lunar–solar synchrony, and a marker of precessional eras

AncientEncoder

Model: GLM-5.2

Version 2.4 · Date 2026-08-07

Companion software: index.html  + app.bundle.js  + lexicon.json ;

reproducible scripts: tests.mjs , calc_all.mjs , calc_37_73.mjs ,

calc_mazzalot.mjs , calc_72.mjs , calc_phrase.mjs ,

palindrome.mjs , slow_scan.mjs , gen_eclipse.mjs

Abstract

A system is formalized and computationally tested —Reader of the Sky (קורא השמים)— that operates the tripartite mapping
of the Sefer Yetzirah (3 mothers / 7 doubles / 12 simples) over the real sky calculated with modern ephemerides (astronomy-
engine v2.1.19). Under a rule of legibility by set membership (reuse), a Hebrew verse is legible
at a date t iff the set of simple letters it requires is a subset of the set of zodiacal signs occupied
by the 10 bodies. The work demonstrates, with reproducible calculations:

1. Positional decimal gematria: 22 letters + 5 finals = 27 = 1–9, 10–90, 100–900. The alphabet is the set of digits
of base 10.

2. Precession: 50.29″/year → 1° every 71.58 years (≈ 72); one zodiacal era = 2147.5 years; great year = 25 771 years (25
920 at the Platonic figure of 72 y/°). 144 years = 2.01°.

3. Equinoxes/solstices 2026: apparent solar longitude 0°, 90°, 180°, 270° — the 4 tropical cardinals are measurable
to the second.

4. Lunar–solar synchrony: the tropical year contains 12.368 synodic months; Meton 19y = 235 lunations (Δ 0.087 d); the
Islamic calendar (pure lunar) drifts 10.875 d/year and re-aligns with the solar every ~33 years (358.9 d ≈ 1 year).

5. The 19 unifies three registers: Meton (19y calendrical), Saros (19 eclipse years = 6585.78 d ≈ 223 synodic),
Quranic basmala (19 letters; 114 suras = 6×19).

6. Eclipses — 37/73: factorization of the 10 canonical eclipse cycles (47, 87, 99, 135, 177, 223, 235, 358, 669, 940):
neither 37 nor 73 is a factor of any of them. The nodal cycle (18.613 y) contains ~39.2 eclipse seasons, not 37 (the Saros
is 38). 37×73 = 2701 = Genesis 1:1, not an eclipse number; the structural primes of eclipses are 19, 47, and
223. But 37 and 73 do fit into the civil solar year: 365 = 73×5 and 2701 pentads = 37×365 = 37 civil years (§9.4). The
contact of 73 with eclipses is only statistical (~70–86 eclipses per saros series, with no fixed value).

7. Cadence of יהוה: requires {י,ה,ו} = Virgo+Aries+Taurus, fillable by fast planets → cadence ~monthly.

8. Genesis 1:1: requires {י,ה,ל,ו,צ} = Virgo+Aries+Libra+Taurus+Aquarius; Aquarius and Aries are anchored at the same time only
by Pluto and Neptune → windows of ~13 years every ~491 years (Neptune–Pluto synodic). Six windows (−427, 61,
552, 1043, 1535, 2025), coincident with major religious-linguistic re-formations.

9. Mirror-palindrome 2701→3773: real but not selective —neither at verse level (Genesis 39.3 % ≈ Markov 38.8 % ≈
uniform 38.0 %; ratio 1.01×) nor at word level (47.9 % of the lexicon, 58 % of the mazzalot). The phrase is more selective
than the word (39.3 % vs 47.9 %) but does not rarefy with magnitude (gematria ≥ 1000 → 39.6 %) and does not separate valid
from invalid readings (Genesis-legible days 30.7 % vs non-legible 32.4 %). The palindrome is neither a checksum nor a criterion
of validity: the discard is positional (S ⊆ O, 88.5 % of dates discarded). What are specific are the sums with astronomical
value: Egel+Ayil = 144, Shor = 2×sum(1..22), Genesis 1:2 = 9999 (§6.2, §13.1–13.2).

10. No correlation with eclipses: Genesis days 6.5 % vs 24.7 % expected.

11. 144 = 12² = lunar months of the 12 common years of the Metonic cycle (12×12 + 7×13 = 144+91 = 235); 144 000 =
360×400 (ת = Moon).

12. Tetramorph: the 4 faces of the cherubim (ox, lion, eagle, man) = the 4 fixed signs (Taurus, Leo, Scorpio,
Aquarius) at exact 90° (fixed cross); the 12 Hebrew mazzalot are animals/objects (טלה lamb, שור ox, אריה
lion…).

13. Intentional letter engineering (attested and, for the 72, demonstrated): 231 gates of the SY (C(22,2)); first
gate AB + its mirror BA = ABBA = "father", palindrome; 3·7·12−22+1 = 231 (self-coherence); Exodus 14:19-21 =
72 consonantal letters each verse (verified in MT; 3 consecutive of 72 → p ≈ 5×10⁻⁷, intentional engineering);
Abulafia and Sefer Raziel HaMalakh document the method. The intentionality of the practice is real; the specific astronomical
attribution of Toric gematria remains a hypothesis (§6.3).

The scope is declared: modern hermetic-astronomical synthesis, not classical Sefer Yetzirah practice.

Index

1. Introduction and declaration of scope

2. The system of values: gematria as positional base-10

3. Precession and the degree of 72 years

4. Equinoxes, solstices, and the tropical grid

5. The stellar mapping

6. The 12 mazzalot: the animals of the zodiac and the tetramorph

7. Lunar–solar synchrony: Meton, octaeteris, and the Islamic calendar

8. The 19: Meton, Saros, and the basmala

9. Eclipses: cycles, factorization, and the 37 / 73 question

10. Reading rule (formalization)

11. Result I — Cadence of יהוה

12. Result II — Genesis 1:1 and the ~491-year windows

13. Result III — 2701, the mirror-palindrome, and the null models

14. Result IV — The 144

15. Discussion

16. Limitations

17. Reproducibility and software

18. Critical review and outstanding matters

19. Conclusion

References

1. Introduction and declaration of scope

The Sefer Yetzirah (SY, "Book of Formation", 2nd–6th c. CE) sets out a linguistic cosmogony: the universe was
formed with 22 letters —3 mothers (א מ ש, elements), 7 doubles (ב ג ד כ פ ר ת, planets and dual dimensions) and 12
simples (ה ו ז ח ט י ל נ ס ע צ ק, constellations and months)—. The SY is cosmogonic linguistics, not an oracle.

This work does not attribute to the classical SY a divinatory practice of reading the sky in real time. The operationalization
is a modern hermetic innovation: to take the letter→luminary mapping of the SY as a verifiable protocol over
astronomical ephemerides. The interest is strictly formal and empirical: given the mapping and an explicit rule, what
regularities emerge and are distinguishable from a null model? Every numerical claim of the article is reproducible with
the companion scripts.

2. The system of values: gematria as positional base-10

Standard gematria (mispar hechrachi):

range
letters
values

units 1–9א ב ג ד ה ו ז ח ט1 2 3 4 5 6 7 8 9

tens 10–90י כ ל מ נ ס ע פ צ10 20 30 40 50 60 70 80 90

hundreds 100–400ק ר ש ת100 200 300 400

hundreds 500–900 (finals)ך ם ן ף ץ500 600 700 800 900

22 + 5 finals = 27 = 9 + 9 + 9: the totality of positional base-10 values up to 900. In standard gematria the
finals are worth the same as their regular form (40 = ם = מ), so that Genesis 1:1 = 2701.

Calculation (Genesis 1:1):

2701 = )296(  הארץ+ )407(  ואת+ )395(  השמים+ )401(  את+ )86(  אלהים+ )203(  ברא+ )913( בראשית.

2701 = 37 × 73; 2701 = 73·74/2 (73rd triangular); 2701 + 1072 (reverse of digits) = 3773 (palindrome).

The numerical assignment is not arbitrary: the alphabet (with finals) is the set of digits of a positional decimal system.
Consistent with the SY's idea that the letters are the structural primitives —here, the primitives of positional
enumeration.

3. Precession and the degree of 72 years

The precession of the equinoxes displaces the vernal point retrogradely along the ecliptic at a rate of 50.29″ of arc per
year (IAU 2006 constant, rounded value).

Calculation:

50.29″/year ÷ 3600 = 0.01397°/year.

1° ÷ 0.01397 = 71.58 years per degree → ≈ 72 y/° (traditional figure).

1 sign = 30° → 30 ÷ 0.01397 = 2147.5 years per zodiacal era.

360° → 360 ÷ 0.01397 = 25 771 years (real precessional great year).

At the traditional figure of 72 y/°: 72 × 360 = 25 920 years (Platonic great year).

144 years × 0.01397°/year = 2.01° (two degrees of precession).

The 72 is not merely a rounding: 72 = 6×12, and it is the figure of the Shem HaMephorash (the 72 letter-trios of Exodus 14:19–21,
three verses of 72 letters). The correspondence 1° ↔ 72 years gives content to the traditional figure.

Precessional eras (entry of the equinox into each sign, Lahiri ayanamsa 24.18° in 2024; sidereal equinox
335.82° = Pisces):

sign
entry
sign
entry

Aries (טלה)
~1854 BCE
 
Libra
~11 031 CE

Taurus (שור)
~4002 BCE
 
Scorpio
~8883 CE

Gemini
~6150 BCE
 
Sagittarius
~6736 CE

Cancer
~8297 BCE
 
Capricorn
~4588 CE

Leo (אריה)
~10 445 BCE
 
Aquarius (צ)
~2441 CE

Virgo
~13 178 BCE
 
Pisces (ק)
~293 CE

Historical reading of the recent eras (ordered in time):

Era of Taurus (~4002 BCE): apogee of the bovine cults —Apis in Egypt, the Minoan bull, sacred calves—. The
spring equinox rose in the constellation of the Bull.

Era of Aries (~1854 BCE): transition to the ram. Hebrew patriarchs (Abraham, "the ram caught in the thicket"), ram
cults in Egypt (Amun with horns), end of the bovine empires.

Era of Pisces (~293 CE): the fish as a Christian symbol; the equinox enters Pisces. Coincides with the consolidation
of Christianity (4th c.).

Era of Aquarius (~2441 CE): future entry. But the entry of Pluto into Aquarius (2024) and of Neptune into Aries
(2025) structurally anticipate the era (section 12).

The "eras of ~2000 years" are the precessional era (2147.5 y, ≈ 2000 in popular rounding). It is a background periodicity,
distinct from the ~491-year Neptune–Pluto synodic that governs the legibility of Genesis (section 12). Both coincide now.

4. Equinoxes, solstices, and the tropical grid

ה

Aries ·×4

ו

Taurus

ז

Gemini

חCancer

ט

Leo

י

Virgoל

Libra

נ

Scorpio

סSagittarius

ע

Capricorn

צ

Aquarius

ק

Pisces ·×3

ה

♃

♂

☉

♀

☿

☽

ו

♆

♇

יהוה ✗

Genesis ✗

אDracoמUrsa Minorש

Cassiopeia

3 mothers · fixed circumpolar axis

Spring equinox 2026 — λ☉ = 0° (Aries 0°)

Fig. 1. Stellar wheel at the spring equinox 2026 (λ☉ = 0°, entry of Aries). Each 30° sector is a tropical sign
with its simple letter; the highlighted sectors are occupied by ≥1 of the 10 bodies. The 3 mothers (א מ ש) on the
fixed circumpolar axis (Draco, Ursa Minor, Cassiopeia).

The tropical zodiac is defined by the geocentric apparent solar longitude λ☉: the spring equinox is λ☉ = 0°, the
summer solstice λ☉ = 90°, etc. The 12 signs are the 12 sectors of 30°. This is the grid to which the 12
simples are mapped.

Calculation (astronomy-engine, Seasons(2026)  + Ecliptic(GeoVector(Sun)).elon ):

event
instant (UT)
λ☉
cardinal sign

Spring equinox
2026-03-20 14:45:36
0.000°
Aries 0°

Summer solstice
2026-06-21 08:25:00
90.000°
Cancer 0°

Autumn equinox
2026-09-23 00:05:38
180.000°
Libra 0°

Winter solstice
2026-12-21 20:50:22
270.000°
Capricorn 0°

The tropical grid of equal 30° is, then, an exact astronomical measurement, not an arbitrary symbolic convention.
(The physical IAU constellations are 13, unequal; the system uses the tropical grid by design —section 5.)

5. The stellar mapping

ה

Aries ·×2

ו

Taurus

ז

Gemini ·×3

חCancer

ט

Leo ·×2

י

Virgoל

Libra

נ

Scorpio

סSagittarius

ע

Capricorn

צ

Aquarius

ק

Pisces

ה

♃

♂

☉

♀

☿

☽

♅

♆

♇

יהוה ✗

Genesis ✗

אDracoמUrsa Minorש

Cassiopeia

3 mothers · fixed circumpolar axis

Sky 2026-08-07 · 10 bodies, 12 simples, 3 mothers

Fig. 2. The tripartite mapping of the Sefer Yetzirah over the real sky (2026-08-07). Outer ring: 12 simples = 12 signs with their
letter. Middle ring: planetary glyphs = the 7 doubles (ב ג ד כ פ ר ת) at their longitudes. Center: the 3 mothers, a fixed axis that does not
precess. Highlighted sector = occupied sign = simple legible that day.

class
n
letters
assignment
depends on
position

reusable

mothers
3א מ שelements · fixed circumpolar constellations (Draco 268°, Ursa
Minor 89°, Cassiopeia 38°)

no (fixed axis)
always

doubles
7ב ג ד כ פ ר תthe 7 classical planets (identity of the planet)
no
always

simples
12ה ו ז ח ט י ל נ ס

ע צ ק

the 12 tropical signs
yes (occupied sign)
yes
(membership)

Simple↔sign mapping:

sign
letter
value
sign
letter
value

Ariesה5
 
Libraל30

Taurusו6
 
Scorpioנ50

Geminiז7
 
Sagittariusס60

Cancerח8
 
Capricornע70

Leoט9
 
Aquariusצ90

Virgoי10
 
Piscesק100

Doubles↔planet: Saturn=ב, Jupiter=ג, Mars=ד, Sun=כ, Venus=פ, Mercury=ר, Moon=ת.

Mothers↔circumpolar constellation: א→Draco (268°), מ→Ursa Minor (89°), ש→Cassiopeia (38°). The fixed axis does not
precess; the mothers are the motionless pole of the system, in contrast to the 12 simples which rotate with the equinox.

Tropical vs. IAU note. The 12 simples are mapped to tropical sectors of 30° (section 4), not to IAU constellations. It is a
design decision necessary for the one-to-one letter↔sign grid; applying IAU boundaries (13, unequal) would destroy the
premise. The mothers, by contrast, are indeed placed against their real constellations.

6. The 12 mazzalot: the animals of the zodiac and the tetramorph

The Hebrew zodiac (mazzalot) names each sign by an animal or object. These names are the figures that reappear
in religious symbols (ram, calf, ox, lion):

sign
letter
Hebrew mazzal
meaning

Ariesה
טלה Taleh
lamb / ram

Taurusו
שור Shor
ox / bull

Geminiז
תאומים Teomim
twins

Cancerח
סרטן Sartan
crab

Leoט
אריה Aryeh
lion

Virgoי
בתולה Betulah
virgin

Libraל
מאזניים Moznayim
balance / scales

Scorpioנ
עקרב Akrav
scorpion

Sagittariusס
קשת Keshet
bow

Capricornע
גדי Gedi
kid / young goat

Aquariusצ
דלי D'li
pitcher / bucket

Piscesק
דגים Dagim
fishes

Ram = Aries = טלה = letter ה (Heh).

Ox / calf / bull = Taurus = שור = letter ו (Vav).

Lion = Leo = אריה = letter ט (Tet).

These two letters —ה (Aries/ram) and ו (Taurus/ox)— are precisely those that appear in יהוה (together with י/Virgo) and in
Genesis 1:1. The golden calf and the ram of Abraham are the figures of the Taurian and Arian eras (section 3).

6.1 The tetramorph = the fixed cross

ה

Aries ·×2

ו

Taurus

ז

Gemini ·×3

חCancer

ט

Leo ·×2

י

Virgoל

Libra

נ

Scorpio

סSagittarius

ע

Capricorn

צ

Aquarius

ק

Pisces

ה

♃

♂

☉

♀

☿

☽

♅

♆

♇

יהוה ✗

Genesis ✗

אDracoמUrsa Minorש

Cassiopeia

3 mothers · fixed circumpolar axis

Fixed cross: Taurus-Leo-Scorpio-Aquarius (exact 90°) = tetramorph

Fig. 3. The fixed cross: Taurus-Leo-Scorpio-Aquarius at exact 90° (135−45 = 225−135 = 315−225 = 90), the geometric image of
the tetramorph of Ezekiel 1 / Revelation 4 (ox, lion, eagle, man). Dashed rings marking the 4 fixed signs.

Ezekiel 1 and Revelation 4 describe four beings with faces of man, lion, ox, and eagle. They correspond to the 4 fixed
signs of the zodiac (the fixed axis, opposite the cardinal axis):

face
fixed sign
longitude (center)

ox
Taurus (שור)
45°

lion
Leo (אריה)
135°

eagle
Scorpio (עקרב)
225°

man
Aquarius (דלי)
315°

Calculation: 135 − 45 = 90; 225 − 135 = 90; 315 − 225 = 90; (45 + 360) − 315 = 90. The four fixed signs are at exact
90° → they form a square cross (the "fixed cross"), the geometric image of the tetramorph. The eagle replaces the scorpion
in the exegetical tradition (the ascending aspect of the scorpion octant).

6.2 Gematria of the Taurus→Aries transition: Egel, Ayil, Shor

The transition between the Era of Taurus and that of Aries (§3) is narrated in the exodus from the calf to the ram. The three Hebrew words
—calf, ram, bull— have gematrias with verifiable arithmetic properties:

word
Hebrew
letters
gematria
+ reverse
result

Calfעגל Egel
30 ל3 ג70ע103
103 + 301
404 (palindrome)

Ramאיל Ayil
30 ל10 י1א41
41 + 14
55 (repdigit)

Bullשור Shor
200 ר6 ו300ש506
506 + 605
1111 (repdigit)

Sum of the transition: Egel + Ayil = 103 + 41 = 144 (the idol that ends + the symbol that begins = 144; see §14).

Shor and the alphabet: sum(1..22) = 22·23/2 = 253 (the 22nd triangular, the 22 letters). And 253 × 2 = 506 = Shor. The Hebrew
name of Taurus equals twice the sum of the 22 letters —the "duplicated alphabet" (heaven and earth) of the SY—.

Genesis 1:2: gematria = 3546; 3546 + 6453 = 9999 (4-digit repdigit), verifiable in the Sefaria corpus.

Real arithmetic, bounded interpretation. All the above sums are exact. The mirror-palindrome property by
itself is not a selective checksum (§13.1): 47.9 % of the 6045 roots of the lexicon and 58 % of the mazzalot are already
mirror-palindromes —high base of decimal gematria—. What is specific (non-trivial) to these three words is not the palindrome,
but the sums with astronomical meaning (Egel+Ayil = 144; Shor = 2×sum(1..22)). Now then: the intentionality of the
practice of designing language by letter rules is indeed historically attested (§6.3), and for the 72-letter verses,
empirically demonstrated. What remains a hypothesis (not falsified, not statistically proven) is the specific astronomical
attribution of Toric gematria (2701 = 37×73 ↔ era; 144 ↔ transition): consistent with the attested tradition,
but the palindrome method does not confirm it (48 % base) and there is no null for "numbers with meaning".

6.3 Intentional letter engineering: the 231 gates, ABBA, and the Name of 72

The hypothesis of an intentional design of the Hebrew language by letter rules is not a statistical inference: it is a
documented practice. The sources are verifiable:

*1. The 231 gates of the Sefer Yetzirah (ch. 2). From 22 letters, the combinations of 2 without repetition = C(22,2) = 22×21/2
= 231 gates (שערים). The SY explicitly orders them to be permuted: AB and BA, AG and GB… The first gate is AB (= ,אב
3); its mirror is BA (3 = ,בא); concatenated, AB+BA = ABBA (אבא) = 4 = "father" (Aramaic), a palindrome. The initial
operation of the SY produces, by mirror symmetry, the word "father": as above so below (AB ↔ BA). Adding the
theonym EL: AB-EL = 34 = אבאל (Abiel); BA-AL = 102 = בעל (Baal, "lord"). The suffixing method (triolet +
EL/YAH) is that of the Shem HaMephorash*.

2. Internal coherence 3-7-12 → 231. The very tripartite structure of the SY generates its number of gates: 3·7·12 −
(3+7+12) + 1 = 252 − 22 + 1 = 231 = C(22,2). The counts of mothers/doubles/simples reproduce the number of gates: the
system is numerically self-coherent.

3. The Name of 72 and the 72-letter verses (Exodus 14:19-21). The Shem HaMephorash is built with the 72 triplets
read in columns over three consecutive verses of Exodus. Verification against the Masoretic text (Sefaria): Exodus
14:19 = 72 consonantal letters; 14:20 = 72; 14:21 = 72 (216 in total → 72 triplets). In Genesis, only 0.78 % of
verses have exactly 72 consonants (mean 51.1); the probability of three consecutive verses with exactly 72
by chance is ≈ (0.0078)³ ≈ 5×10⁻⁷. This is intentional verse engineering, empirically verified, not inference.

4. The tradition of the method. Abraham Abulafia (1240–1291) codified the prophetic combination of letters (tzerufim); the
Sefer Raziel HaMalakh (book of the angel Raziel) is a medieval treatise on the construction of names and angels by
permutation of letters. The practice of designing sacred language by combinatorial rules is, then, documented and
continued for millennia.

Synthesis on intentionality. There are two distinct arguments: (a) statistical —the mirror-palindrome as a seal— which
does not discriminate (48 % base, §13.1); and (b) methodological-historical —the existence of an attested tradition and, for the 72
verses, of an empirically improbable construction (p ≈ 5×10⁻⁷)— which does demonstrate that intentional letter engineering
is a real practice. The Reader of the Sky situates itself in this tradition: it operates the SY mapping as a protocol, and the question
of whether Toric gematria encodes astronomy is a hypothesis within an attested tradition, not an isolated claim.
(The Domination Codex source cites the same arithmetic —231, factorials, ABBA, Abulafia— but provides no null tests; it is
hermeneutical tradition, not statistical proof.)

7. Lunar–solar synchrony: Meton, octaeteris, and the Islamic calendar

Constants (days): synodic month = 29.530589; draconic month = 27.212221; anomalistic month = 27.554550; tropical year =
365.24219; eclipse year = 346.620083.

The tropical year contains 365.24219 / 29.530589 = 12.36827 synodic months. No integer number of lunations closes the
solar year; hence all lunisolar calendars need intercalation.

cycle
years
lunations
calculation
error

Octaeteris
8
99
99×29.5306 = 2923.53 d ; 8×365.2422 = 2921.94 d
1.59 d

Meton
19
235
235×29.5306 = 6939.69 d ; 19×365.2422 = 6939.60 d
0.087 d

Callippus
76
940
940×29.5306 = 27758.75 d ; 76×365.2422 = 27758.41 d
0.35 d

The Hebrew calendar (Metonic) inserts 7 intercalary months in 19 years: 12 common years (12 months) + 7 leap
years (13 months) = 12×12 + 7×13 = 144 + 91 = 235 lunations = 19 solar years. (See §14 on the 144.)

The Islamic calendar (hijri) is purely lunar, without intercalation (Qur'an 9:36–37 forbids the nasīʾ): 12 synodics = 354.367
d; it drifts 10.875 d/year relative to the solar.

33 Islamic years: 33 × 10.875 = 358.9 d ≈ 1 solar year (365 d) → the hijri year returns to the same season every ~33
years.

Verification: 33×354.367 = 11 694.1 d ; 32×365.2422 = 11 687.8 d ; Δ = 6.4 d.

8. The 19: Meton, Saros, and the basmala

The number 19 appears in three distinct registers which are, however, the same lunar arc:

1. Meton (calendar): 19 tropical years = 235 lunations (section 7; Δ 0.087 d).

2. Saros (eclipses): the eclipse year (346.620083 d) is the time it takes the Sun to return to the lunar node. 19 eclipse
years = 19 × 346.620083 = 6585.78 d, and the Saros = 223 synodics = 6585.32 d → Δ = 0.46 d. The Saros is almost
exactly 19 eclipse years.

3. Quranic basmala: «19 = »الرحيم الرحمن الله بسم letters; the Qur'an has 114 suras = 6×19. (The "19 hypothesis" of
R. Khalifa is a numerological reading of the Qur'an; the arithmetic facts —19 letters of the basmala, 114 = 6×19— are
verifiable; its encoding interpretation is disputed.)

Astronomical verification of the Saros (astronomy-engine): global solar eclipse of 2023-04-20 (peak 04:16:42 UT);
adding 223 synodics (6585.32 d) gives 2041-04-30 (peak 11:50:53 UT); real Δ = 6585.32 d = the theoretical. Both
belong to the same saros series.

The 19 unifies the calendar (Meton), the eclipse (Saros = 19 eclipse years), and the Quranic numerology (19-letter basmala). It is
the number of lunar synchrony.

9. Eclipses: cycles, factorization, and the 37 / 73 question

9.1 Eclipse cycles and their factorization

An eclipse cycle is an integer N of synodic months close to an integer of draconic months (return to the node). Canonical
table:

cycle
N (synodics)
days
N draconics
factorization of N

Octon
47
1387.94
51
47 (prime)

Hepton
87
2569.16
94
3 × 29

Octaeteris
99
2923.53
107
3² × 11

Tritos
135
3986.63
147
3³ × 5

Sar
177
5226.91
192
3 × 59

Saros
223
6585.32
242
223 (prime)

Meton
235
6939.69
255
5 × 47

Inex
358
10 571.95
389
2 × 179

Exeligmos
669
19 755.96
726
3 × 223

Callippus
940
27 758.75
1020
2² × 5 × 47

Saros = 223 synodics = 242 draconics (6585.36 d) = 239 anomalistics (6585.54 d) — a triple coincidence that makes
an eclipse repeat with nearly identical geometry every 18.03 years.

9.2 Do 37 or 73 appear?

Direct calculation: the divisibility of the 10 canonical cycles (and their doubles/triples) by 37 and 73 is checked:

47: 37 ✗, 73 ✗

87: 37 ✗, 73 ✗

99: 37 ✗, 73 ✗

135: 37 ✗, 73 ✗

177: 37 ✗, 73 ✗

223: 37 ✗ (223/37 = 6.03), 73 ✗ (223/73 = 3.05)

235: 37 ✗ (235/37 = 6.35), 73 ✗ (235/73 = 3.22)

358: 37 ✗, 73 ✗

669: 37 ✗, 73 ✗

940: 37 ✗, 73 ✗

37 × 73 = 2701 = Genesis 1:1. No canonical eclipse cycle is divisible by 37 or by 73. The structural primes of
eclipses are 19 (eclipse year ×19 ≈ Saros), 47 (Octon; factor of Meton), and 223 (Saros).

The only contact of 73 with eclipses is statistical, not structural: a saros series contains between ~70 and ~86 eclipses
over ~1226–1550 years (mean value ~72–73, with no fixed number). It is a count, not a period.

Clarification on the nodal cycle (18.6 y). It has been held that the lunar nodal precession (18.613 years) contains "37
eclipse seasons". The calculation refutes it: the nodal period = 18.613 × 365.2422 = 6798.24 d; the eclipse season =
eclipse year/2 = 346.6201/2 = 173.310 d; the quotient = 6798.24 / 173.310 = 39.23 seasons (≈ 39), not 37. The number
that does close is 38: 38 × 173.310 = 6585.78 d = 19 eclipse years = Saros. Thus, 37 does not appear even in the nodal cycle.

Demonstrated conclusion. 37 and 73 are the factors of Genesis 1:1 (2701), not eclipse numbers. They do not appear as factors
of any eclipse cycle nor in the count of the nodal cycle (~39, not 37). The structural primes of eclipses are 19, 47, and
223. 37 and 73 do fit, by contrast, into the solar year (§9.4).

9.3 Correlation Genesis-days / eclipses (empirical test)

The 293 Genesis-legible days (2024–2030) were contrasted with the 30 eclipses of the same period (astronomy-engine:
global solar + lunar eclipses). Genesis days with an eclipse within ±10 days: 6.5 % (19/293). Random expectation
(eclipses/year × 21-day window / 365): 24.7 %. Genesis days avoid eclipse windows; the engine is the position of the
slow planets, not the Sun–Moon–node geometry.

9.4 37 and 73 in the solar year (the real celestial relation)

Although 37 and 73 do not govern eclipses (§9.2–9.3), they do fit exactly into the civil solar year, and that fit is the
genuine celestial connection of the factors of Genesis 1:1:

1. 365 = 73 × 5. The whole solar year (civil, Julian/Egyptian) factorizes as 73 pentads of 5 days.

2. 2701 × 5 = 13 505 = 37 × 365. The gematria of Genesis 1:1 expressed in pentads equals exactly 37 civil years.

3. Coherent closure: 2701 = 37 × 73, and 2701 pentads = 37 years × 73 pentads/year. That is, Genesis 1:1 = (37 years) ×
(73 pentads/year).

This is a solid arithmetic identity of the 365-day solar year. It must be bounded precisely:
It uses the civil year of 365 d, not the tropical year (365.2422 d): 13 505 / 365.2422 = 36.975 years (≈ 37, but not exact). It is,
then, civil calendrical arithmetic, not orbital mechanics.

It does not correspond to an attested ancient calendar. The Enoch/Qumran calendar is 364 d = 52 weeks =
4×91 (not divisible into pentads: 364/5 = 72.8); the Egyptian civil is 365 = 36 decans×10 + 5 epagomenal (the 5 days are
a separate block, not a 73rd pentad). Neither organizes the year into 73 pentads. The 73×5 structure is a
factorization of the integer 365, not a documented calendrical practice.

37 lunations ≈ 3 solar years is only approximate: 37×29.5306 = 1092.63 d vs 3×365.2422 = 1095.73 d (Δ 3.1 d); 37
is not a classical lunisolar cycle (19, 8, 76 are).

Synthesis. 37 and 73 are not eclipse numbers (§9.2–9.3), but they are numbers of the civil solar year: 73 pentads = 365 d, and 2701
pentads = 37 years. The gematria of Genesis 1:1 (37×73) is thus reflected in the measure of the year: 37 years × 73 pentads. It is
arithmetic coherence of the civil calendar, not of eclipse mechanics.

9.5 Masoretic textual preservation

The structure 37×73 = 2701 of Genesis 1:1 acquires relevance in the context of Masoretic textual preservation (6th–
10th c. CE): the Masoretes developed a counting system to prevent alterations to the Torah —exact number of
letters, words, and verses of each book; middle letter and middle word marked (the middle word of the Torah is ָּד ֹרׁש ָּד ַר ׁש,
darosh darash, Leviticus 10:16)—. In that framework, so loaded a factorization of the first verse (2701 = 37×73, 73rd
triangular, 2701+1072 = 3773) functions as a verifiable seal: any change of letters would alter the sum and, with it,
the factorization. Note, nonetheless, that the test of §13 shows that the mirror-palindrome 2701→3773 is not selective (~38 % of
any verse satisfies it), so that the operative seal is the specific 37×73 factorization of 2701, not the
generalized mirror.

10. Reading rule (formalization)

Let O(t) ⊆ {ה,ו,ז,ח,ט,י,ל,נ,ס,ע,צ,ק} be the set of simple letters whose sign is occupied by at least one of the 10
bodies (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto) at instant t. Let S(w) be the
set of simple letters of word w (after normalization of finals to regulars).

Definition (legibility). w is legible at t ⟺ S(w) ⊆ O(t).

Reuse rule. Mothers and doubles are always available and reusable. A simple is read if its sign is occupied;
repeating a simple does not require conjunction (membership, not consumption). Words without simples (ברא "created", אב
"father", שבת "sabbath", אמת "truth") are always legible.

Validation ( tests.mjs , 44 assertions in the green): 12 occupied → 6045 legible words; only Virgo → 634; 0 signs →
377 always legible.

The discard is measurable and massive. For Genesis 1:1, over 2024–2030 (2555 days), only 293 days (11.5 %) are legible →
the positional rule discards 88.5 % of dates. For יהוה, legible most of the year (cadence ~monthly). The
discard is not arithmetic (palindrome, §13.2) but positional: what distinguishes a valid reading from an invalid one is which
signs are occupied, not the sum of its letters.

11. Result I — Cadence of יהוה

ה

Aries

ו

Taurus

ז

Gemini

חCancer

ט

Leo

י

Virgoל

Libra

נ

Scorpio

סSagittarius

ע

Capricorn

צ

Aquarius ·×5

ק

Pisces

♄

♃

♂☉♀

☿

י

ו

ה

♇

יהוה ✓

Genesis ✗

אDracoמUrsa Minorש

Cassiopeia

3 mothers · fixed circumpolar axis

יהוה: {י Virgo, ה Aries, ו Taurus} — cadence ~monthly (no Aquarius: not Genesis)

Fig. 4. Cadence of יהוה. The golden line traces the path י→ה→ו→ה over the signs Virgo-Aries-Taurus-Aries, occupied by
fast planets (2026-02-03, יהוה legible). With no Aquarius (צ) in the set → not Genesis: the cadence is monthly, not
secular.

S(יהוה) = {י,ה,ו} = Virgo + Aries + Taurus. The Moon traverses the 12 signs every 27.3 days, so those three signs are
occupied most of the year, with brief gaps → cadence ~monthly. יהוה does not mark eras: it marks the month. Its three
signs are filled by fast planets.

Relation to the tetramorph (§6): the two Hehs of יהוה are Aries (טלה, ram) and the Vav is Taurus (שור, ox); the Yod is
Virgo (בתולה). The Name is thus composed of ram + ox + virgin.

12. Result II — Genesis 1:1 and the ~491-year windows

ה

Aries ·×2

ו

Taurus

ז

Gemini

חCancer

ט

Leo

י

Virgo ·×2ל

Libra

נ

Scorpio

סSagittarius

ע

Capricorn

צ

Aquarius

ק

Pisces

ה

♃

♂

י♀

☿

ו

♅

♆

♇

יהוה ✓

Genesis ✓

אDracoמUrsa Minorש

Cassiopeia

3 mothers · fixed circumpolar axis

Genesis 1:1 legible — window 2025–2038 (Neptune∈Aries, Pluto∈Aquarius)

Fig. 5. Genesis 1:1 legible (2026-09-01, window 2025–2038). The set {י,ה,ל,ו,צ} = Virgo+Aries+Libra+Taurus+Aquarius
requires Aquarius (צ, anchored by Pluto) and Aries (ה, anchored by Neptune): the slow pair Neptune–Pluto in the Aries–Aquarius phase
opens the ~13-year window that recurs every ~491 years.

S(Genesis 1:1) = {י,ה,ל,ו,צ} = Virgo + Aries + Libra + Taurus + Aquarius. Virgo, Libra, and Taurus are filled by fast
planets in months; but Aries and Aquarius are persistently anchored only by the two slowest planets: Neptune
(Aries) and Pluto (Aquarius). Sustained legibility requires Pluto ∈ Aquarius ∧ Neptune ∈ Aries.

Scan (−600 BCE to 2400 CE, quarterly step, historical dates via setUTCFullYear ):

#
window
duration
separation
religious-linguistic correlate

1
−427 to −417 BCE
~10 y
—
Axial Age: Plato (b. 427), final redaction of the Torah, Buddha

2
61–73 CE
~13 y
488 y
Destruction of the Second Temple (70): rabbinic Judaism, Christian break

3
552–565 CE
~13 y
491 y
Justinian, Hagia Sophia, closing of the Talmud, eve of Islam

4
1043–1056 CE
~13 y
491 y
East/West Schism (1054)

5
1535–1547 CE
~12 y
492 y
Reformation (1517), Copernicus, De revolutionibus (1543)

6
2025–2038 CE
~13 y
490 y
current window

Mean separation 490.5 years = Neptune–Pluto synodic cycle (492.3 y). 2024–2030 yields 293 Genesis-legible days,
a dense cluster 2028–2029 (first: 2026-09-01).

Genesis 1:1 is an era-marker verse: its set of simples is exactly the set of signs that activates the
Neptune–Pluto synodic configuration in the Aries–Aquarius phase. The structural difference from יהוה (Aquarius ∈ S) is what
separates the monthly cadence from the secular one. The precessional Age of Aquarius (~2441 CE, §3) and the synodic window (~491 y)
coincide now.

13. Result III — 2701, the mirror-palindrome, and the null models

Properties of Genesis 1:1: 2701 = 37×73; 73rd triangular; 2701 + 1072 = 3773 (palindrome).

Selectivity test. Does the mirror distinguish Genesis from arbitrary text? 30 660 null verses were generated (20× Genesis, n
= 1533), with (a) order-1 Markov over the letters of Genesis itself and (b) uniform iid, both with the real
length distribution. Deterministic PRNG (mulberry32, seed 20260807) for exact reproducibility:

property
Genesis (n=1533)
Markov ord-1
uniform iid

G + rev(G) = palindrome
39.3 % (603)
38.8 % (11 883)
38.0 % (11 657)

G divisible by 37
3.13 % (48)
2.80 % (858)
2.79 % (855)

G triangular
1.57 % (24)
1.20 % (368)
1.15 % (352)

Mirror ratio Genesis/Markov = 1.01×; Genesis/uniform = 1.03×. It does not discriminate: ~4 of every 10 arbitrary Hebrew
verses of comparable length already satisfy it, by the arithmetic of the sum with digit reversal. Divisibility by
37 shows a weak excess (~1.12×) and triangularity a moderate excess (~1.31×); with n = 1533 neither is
conclusive, and both are independent of the mirror.

13.1 Word-level null (is the mirror-palindrome a checksum?)

The "checksum by palindrome" hypothesis (§6.2, §9.5) requires the mirror-palindrome to be rare. It is not. Direct test
over the Strong lexicon (6045 roots) and the 12 mazzalot ( calc_mazzalot.mjs ):

set
mirror-palindrome
rate

Strong lexicon (6045 roots)
2895
47.9 %

12 mazzalot
7/12
58 %

Genesis (verses, n=1533)
603
39.3 %

By number of digits of the gematria: 1 digit 5.1 %, 2 digits 54.6 %, 3 digits 45.8 %, 4 digits 84.7 %. The rate grows with
length because more pairs of digits can sum ≤ 9 without carry.

Implication: ~1 of every 2 arbitrary Hebrew words is a mirror-palindrome. That Egel→404, Ayil→55, Shor→1111 are
so is not, by itself, evidence of design: it is what is expected from decimal arithmetic. The mirror cannot function as a
checksum because it does not discriminate "marked" text from arbitrary text. What is specific to those words are the
sums with astronomical value (Egel+Ayil = 144; Shor = 2×sum(1..22)) —real arithmetic, but whose attribution to
authorial intent requires a null of "numbers with meaning" that is not defined here (multiple-comparisons
problem).

13.2 Phrase level and the palindrome as a validity criterion

Two methodological objections require going beyond the word level: (i) the real units of the text are phrases, verses, and
large numbers, not isolated words; (ii) the hypothesis that the mirror-palindrome is the method to distinguish which
readings of the sky are valid and which are not (discarding thousands of combinations), not a checksum.

(i) Phrase level. Computed over the 1533 verses of Genesis ( calc_phrase.mjs ), broken down by digits of the gematria
of the verse:

level
unit
mirror-palindrome

word
6045 roots (lexicon)
47.9 %

phrase
Genesis verses (n=1533)
39.3 %

large phrase
verses with gematria ≥ 1000 (n=1503)
39.6 %

The phrase is more selective than the word (39.3 % vs 47.9 %): the objection is correct in direction. But the rarefaction
stops there —long verses (gematria ≥ 1000, already 4 digits) do not palindromize less than the total (39.6 % vs 39.3 %)—, and
the rate remains indistinguishable from the Markov null (38.8 %, §13). The magnitude of the number, by itself, does not make the
mirror rare.

(ii) The palindrome as a selector of readings. Direct test: the "phrase of the sky" on a date = the simple letters of the 10
bodies, ordered; its gematria + mirror. Comparing Genesis-legible days (valid) vs non-legible (invalid) over
2024–2030:

day class
mirror-palindrome

Genesis-legible (n=293)
30.7 %

Genesis-non-legible (n=2262)
32.4 %

If the palindrome were the criterion of validity, the legible ones would palindromize more. They palindromize less (30.7 % < 32.4 %). The
palindrome does not select the valid readings. What does select them —and discards 88.5 % of dates (§10)— is the
positional rule S ⊆ O. The mirror and set membership are independent criteria; the second operates, the first does not
separate.

Synthesis. The mirror-palindrome is real in concrete cases (2701→3773, Egel→404) and the phrase is more selective than the word
(39 % vs 48 %), but it is not enough to be either a checksum or a criterion of validity of reading: it does not distinguish from a Markov null, it does not
rarefy with magnitude, and it does not separate legible days from invalid ones. The operational discard of the Reader of the Sky is positional (S
⊆ O), not arithmetic. What is attested and, for the 72 verses, demonstrated, is the intentional engineering of letters as a
practice (§6.3) —a historical fact, distinct from the statistical selectivity of the mirror.

14. Result IV — The 144

1. 144 = 12² — the 12 simples squared; the square of the completeness of the zodiac.

2. 144 = lunar months of the 12 common years of the Metonic cycle: 12×12 + 7×13 = 144 + 91 = 235 (§7). The 144 is
structural in lunar–solar synchrony.

3. 144 = Egel + Ayil = 103 + 41 (§6.2): the gematria of the calf (Era of Taurus ending) plus that of the ram (Era of
Aries beginning) sums 144 —the zodiacal transition in a single figure.

4. 144 000 = 144 × 1000 = 360 × 400. Here 360 = the complete zodiacal circle (12×30°) and 400 = ת (Tav), the seventh
double, assigned to the Moon (§5). 144 000/360 = 400. In the SY framework, "the whole circle × the Moon" = 144 000. (Rev
7/14: 144 000 = 12 tribes × 12 000 = 12² × 1000.)

5. 144 years = 2.01° of precession (§3): two degrees of the great precessional clock.

6. 144 as a divisor of the era and of the great year —only at the Platonic rate of 72 y/°—: 144 × 15 = 2160 (zodiacal era at 72
y/°) and 144 × 180 = 25 920 (great year at 72 y/°). Caveat: at the real IAU rate (50.29″/year) the era is 2147.5 y and the great year
25 771 y, and neither is divisible by 144 (2147.5/144 = 14.913; 25 771/144 = 178.965). Clean divisibility is a
property of the 72 y/° rounding, not of observed precession.

The 144 is not an isolated figure: it unites the 12 of the zodiac (12²), the 144 lunar months of Meton, the Egel+Ayil transition, the 144
000 = circle×Moon (ת) of apocalyptic symbolism, and —at the Platonic rate— the division of the era (2160) and of the great year (25
920). At the observed rate (50.29″/year) it retains only the 2.01° per 144 years.

15. Discussion

Two distinct cycles that common sense conflates:
~491 years (Neptune–Pluto synodic, Aries–Aquarius phase): periodicity of the Genesis legibility window and,
empirically, of religious-linguistic re-formations (§12).

~2148 years (precession per sign): periodicity of the background zodiacal Era (§3). The "2000-year intuition"
corresponds to this; but the legibility of Genesis does not wait 2000 years between windows, but ~491.

Genesis 1:1 as an era-marker verse. The correlation of the six windows with religious-linguistic re-formations
(Axial, Temple, Justinian, Schism, Reformation, present) is an empirical pattern, not a causal demonstration (n = 6). But
the recurrence is physically explicable (celestial mechanics, not ad hoc adjustment): Genesis 1:1 requires Aquarius (צ, incoming era) and
Aries (טלה, preceding era), anchored by the two slowest planets.

On the discard. "Why Genesis and not another combination?" — structural answer: the discard is positional (S ⊆ O).
Genesis was not chosen by an arithmetic seal (§13 rules it out, §9.2 rules out 37/73 in eclipses), but because its list of
simples coincides with the set of signs that activates the era: Aquarius (צ) requires Pluto; Aries (טלה) requires Neptune.

On the 19. The 19 unifies Meton, Saros, and the basmala (§8): it is the number of lunar synchrony. The 144 (§14) is the number of
the completeness of the 12 applied to the moon (144 months of Meton) and to the circle (144 000 = 360×400). The 72 is the precessional degree
(§3) and the Name of 72 letters.

16. Limitations

1. Tropical mapping. The simples are assigned to tropical sectors of 30° (§4), not to IAU constellations. A documented design decision,
not correctable without breaking the system.

2. Pluto ephemeris. Precision degrades outside 1700–2200; the ancient windows rest on sign-level (30°) determination, validated by
smooth continuity (variation 19–51°/20y, no jumps) back to 600 BCE, not by arcminute
precision.

3. n = 6. The historical correlations are an observational hypothesis, not a statistical proof.

4. Modern hermetic framework. The operationalization of the SY as a reading of the sky is not classical Kabbalistic practice; it is
a contemporary synthesis.

5. Lexicon. Strong (OpenScriptures), 6045 consonantal roots + 290 curated Spanish glosses; the rest English.
Incomplete for post-biblical Hebrew.

6. 37/73 in eclipses. Negative result demonstrated (§9.2): they are not factors of any eclipse cycle. Any
claim of a "37/73-eclipse relation" lacks a periodic basis.

17. Reproducibility and software

index.html  + app.bundle.js  + lexicon.json : web application (React 18 + astronomy-engine, JSX pre-
compiled with esbuild, no Babel in the client) that operates everything described: dynamic star map, translator with full
lexicon (loaded by fetch ), יהוה / Genesis / Prediction / Eras / Methodology panels. Serve with python3 -m
http.server 8008  and open http://127.0.0.1:8008/ .

cielo-lector.html : legacy monolithic version (embedded lexicon + Babel-standalone).

tests.mjs : 44 assertions (astronomy, reader, Genesis, eras, gematria), all in the green. Mounted in jsdom: 11 panels
+ SkyMap + translator, 16/16 in the green.

calc_all.mjs : reproduces the calculations of §§3–9 and 14 (equinoxes/solstices, eclipse cycles and factorization,
lunar–solar synchrony, precession, eras, 144, tetramorph, verified Saros). calc_37_73.mjs : reproduces §9.2–9.4
(37/73 factorization, nodal cycle ~39 seasons, pentads 365=73×5, 2701 pentads = 37 civil years).

calc_mazzalot.mjs : reproduces §6.2 and §13.1 (Egel/Ayil/Shor, 144×15/180, 253×2, Genesis 1:2=9999, and the
word-level palindrome null: 47.9 % lexicon, 58 % mazzalot). calc_72.mjs : reproduces §6.3 (231 gates,
AB/BA→ABBA, 3·7·12→231, and MT verification of Exodus 14:19-21 = 72 letters ×3 via Sefaria API).

palindrome.mjs  (Markov/uniform, §13), calc_phrase.mjs  (phrase-level null + test of the palindrome as a
selector of readings, §13.2), slow_scan.mjs  (Neptune–Pluto windows, §12), gen_eclipse.mjs  (eclipse
correlation, §9.3), fetch_gen.mjs  (Genesis corpus via Sefaria API).

18. Critical review and outstanding matters

Critical review of what is demonstrated and of what is left out:

Firmly demonstrated (reproducible):

Equinoxes/solstices 2026 with λ☉ = 0/90/180/270° (§4).

Precession 50.29″/year → 1°/71.58 y; era 2147.5 y; 144 y = 2.01° (§3).

Factorization of the 10 eclipse cycles; 37/73 absent (§9.2).

19 eclipse years ≈ Saros (Δ 0.46 d); Meton 235 ≈ 19 years (Δ 0.087 d); Saros verified with two real eclipses (§8).

Meton 12×12+7×13 = 144+91 = 235 (§14); Islamic 33 y → drift 358.9 d (§7).

Tetramorph at exact 90° (§6.1); mazzalot = animals (§6).

Mirror not selective (§13): at word level 47.9 %, at phrase level 39.3 % (≈ Markov 38.8 %), large phrases 39.6 %; does not
separate valid from invalid readings (30.7 % vs 32.4 %, §13.2). Eclipses uncorrelated (§9.3); 6 windows ~491 y
(§12).

Outstanding matters (not covered, and why):

Saros and series: the ~73 eclipses/series count is cited as a statistical range (70–86), not computed series by series.
Pending: scanning with astronomy-engine a complete saros series and counting exact members.

Ayanamsa: Lahiri (24.18°) is used. Other ayanamsas (Krishnamurti, Fagan-Bradley, Raman) shift the era entries
by decades. They were not compared.

Variable precession: 50.29″/year is constant; real precession accelerates/decelerates (IAU 2006 model with harmonic
terms). The era dates have an uncertainty of ~tens of years from this term, not propagated.

37/73 — resolved: it was tested (i) factorization of the 10 eclipse cycles (absent), (ii) the count of the nodal cycle (~39.2
seasons, not 37), (iii) the relation to the solar year (365 = 73×5; 2701 pentads = 37 civil years — §9.4). It remains as an
extension to test whether 37/73 appear in eclipse counts by other cuts (by century, by series). The identity 2701 =
37×73 is civil-calendrical, not orbital: it uses the 365-d year, not the tropical 365.2422.

Basmala and the code-19: the arithmetic facts (19 letters, 114 = 6×19) are reported; Khalifa's "code-19
hypothesis" is not evaluated (it is a disputed statistical CLAIM, not an astronomical fact).

Tetramorph: the correspondence faces↔fixed signs is traditional exegetical (Ezekiel/Revelation); it is not
"demonstrated" astronomically, only shown that they are at 90°.

Causality of the 6 windows: n = 6; correlation, not causal proof. Positing a rigorous statistical test would require an
operational definition of "religious-linguistic re-formation" and a historical null model, beyond scope.

Heptagram / 7 doubles and the 7 days: it is stated (§5, app) but the weekly cadence is not demonstrated by calculation.

Gematria of the 7 words and 37: 2701 = 37×73 is given; the 37×73 structure as a grid of the 7 words is not explored
( Jenkins, Other Bible Code) — cited, not reproduced.

What the article does NOT claim: it does not claim eclipse-Genesis causality (negative, §9.3), it does not claim that 37/73 govern eclipses
(negative, §9.2), it does not claim that the mirror selects Genesis (negative, §13, also at word level 47.9 % and at phrase level
39.3 %), it does not claim that the mirror-palindrome is a textual checksum or the criterion of validity of the readings of the sky
(falsified: 48 % high base, and it does not separate legible from invalid days, 30.7 % vs 32.4 %, §13.1–13.2), it does not claim that
Toric gematria encodes astronomy as a proven fact (it is a hypothesis within an attested tradition, §6.3), it does not claim
that the classical SY is an oracle (§1).

What the article DOES claim (with evidence): intentional letter engineering is a historically attested practice
(SY, Abulafia, Raziel) and, for the 72-letter verses of Exodus 14:19-21, empirically improbable by chance (p ≈
5×10⁻⁷). The distinction between (a) intention of the practice [demonstrated] and (b) specific astronomical attribution of
Toric gematria [hypothesis] is the epistemic core of the work.

Also verified (v2.2): Genesis 1:2 = 3546 → 9999 (repdigit) ✓; Egel 103→404, Ayil 41→55, Shor 506→1111 =
2×253 ✓; Egel+Ayil = 144 ✓; 144×15 = 2160 and 144×180 = 25 920 ✓ (only at 72 y/°; at 50.29″/year they are not integers); ABBA
= AB+BA = 4 = "father" ✓; 3·7·12−22+1 = 231 = C(22,2) ✓; Exodus 14:19-21 = 72 letters ×3 ✓.

19. Conclusion

The Reader of the Sky converts the tripartite mapping of the Sefer Yetzirah into a formal and verifiable protocol. The tropical grid
is measurable (λ☉ = 0/90/180/270°); precession gives content to the 72 (1°/71.58 y) and to the 144 (2.01° in 144 y); lunar–solar synchrony
is governed by the 19 (Meton = Saros = basmala) and the 144 (months of Meton). Eclipses are governed by 19, 47, and 223
—not by 37 nor 73, which are the factors of Genesis 1:1—; but 37 and 73 do structure the civil solar year (365 = 73×5; 2701
pentads = 37 years), so that the gematria of the first verse is reflected in the measure of the year: 37 years × 73 pentads =
2701. Under the membership rule, Genesis 1:1 is legible only in windows of ~13 years that recur every ~491 years
(Neptune–Pluto synodic, Aries–Aquarius phase), coincident with the great religious-linguistic re-formations, over
the precessional background of ~2148 years per era. The mirror-palindrome 2701→3773 is real but not selective; eclipses do not
intervene. The system offers a computable and refutable basis for the intuition that stellar eras mark
readaptations of sacred language, with the 491-year synodic as the engine and the 2148-year precessional as the backdrop.

References

Sefer Yetzirah. Ed. A. Hayman (2004); trans. A. Kaplan (1990).

astronomy-engine — D. Rowell. https://github.com/cosinekitty/astronomy-engine

Strong, J. Hebrew Lexicon; OpenScriptures. https://github.com/openscriptures/HebrewLexicon

Sefaria API (Genesis corpus). https://www.sefaria.org/api

Lahiri, N. C. Ayanamsa (1957).

Meeus, J. Astronomical Algorithms (eclipse cycles: Saros, Inex, Meton; 2nd ed., 1998).

Jaspers, K. Vom Ursprung und Ziel der Geschichte (Axial Age, 1949).

Jenkins, V. The Other Bible Code (37/73 structure of Genesis 1:1; cited critically).

Khalifa, R. Computer Manifests the Message (19-letters/114-suras facts; disputed interpretation).

Standish, E. M. / PLAN404 (underlying planetary ephemeris, Pluto).

Book of the Watchers (1 Enoch 72–82) and the Qumran calendar (364 d = 52 weeks); Talmon, S. "Yahadic
Fragments".

Yeivin, I. Introduction to the Tiberian Masorah (Masoretic count of letters/words/verses; middle word darosh
darash, Lev 10:16).

Sefer Raziel HaMalakh (Book of the angel Raziel), ed. M. Margalioth (medieval treatise on the permutation of letters and
the construction of names/angels).

Abulafia, A. Chayei Ha-Olam Ha-Ba / Or Ha-Sekhel (prophetic combination of letters, tzerufim); Idel, M. The Mystical
Experience in Abraham Abulafia.

Shem HaMephorash (Name of 72): triplets of Exodus 14:19-21; tradition in Bahir, Zohar, and Abulafia.