// tabs/MethodTab.jsx
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SIGNS, SIMPLE, LETTER_TO_SIGN, DOUBLES, MOTHERS, BODIES, GLYPH, WEEK, FIN2REG, REG2FIN, SIMPLE_LETTERS, GV, norm, displayHe, gematria, simpleSet, formable, isPalindrome, ANGEL_LEXICON, ANGEL_NAME_MAP, readableWords, daysInMonth, makeDate, parseDate, fmtDate, BODIES7, skyAtSet, skyAt, skyAt7, occupiedLetters, bySign, GENESIS, genesisReadable, GEN_TOTAL, GEN_VALUES, PREC, AGE, FULL, AYANAMSIS, SYN, DRAC, ANOM, TROP, ECLY, HALAKIM_DAY, MOLAD, EQUINOX_LON, ageBoundaries, yrLabel, ERA_WINDOWS, FINALS, letterVal, reduce9, LO_SHU, LO_POS, sigilPath, aiqGroups, siamese, doublyEven, singlyEven, buildMagic, isMagic, KAMEOT, GREEK, isopsephy, ABJAD, ABJAD_NAME, abjad, KTP, katapayadi, countSubset, MON, MONTHNAMES, displayDate } from '../core.jsx';
import { SkyMap, KameaGrid, Fig, DateEntry, YearInput, SubTabs } from '../ui.jsx';

function MethodTab({esGlossCount}){
  return <>
    <h2>Methodology &amp; scope</h2>
    <ul className="muted" style={{marginTop:4,lineHeight:1.7}}>
      <li><b>Frame:</b> a modern hermetic-astronomical synthesis. The classical <i>Sefer Yetzirah</i> is cosmogonic linguistics, not an oracle; this operationalisation is a contemporary reading, not traditional kabbalistic practice.</li>
      <li><b>Simple↔sign mapping:</b> equal 30° tropical sectors (not IAU constellations, which are unequal and 13). A symbolic convention necessary for the one-to-one letter↔sign grid. The mothers are placed opposite their real circumpolar constellations (Draco, Ursa Minor, Cassiopea).</li>
      <li><b>Astronomy:</b> astronomy-engine v2.1.19, geocentric apparent ecliptic longitude (<code>GeoVector→Ecliptic.elon</code>), noon UT.</li>
      <li><b>Lexicon:</b> Strong (OpenScriptures), 6045 consonantal roots.</li>
      <li><b>Pluto ephemeris:</b> precision degrades outside 1700–2200; ancient windows rely on sign-level (30°) determination, validated by smooth continuity, not arcminute precision.</li>
      <li><b>Negative results (tested):</b> the mirror-palindrome 2701→3773 does not discriminate at corpus level (Genesis 39.3% ≈ Markov 39.2% ≈ uniform 38.4%); Genesis-days do not correlate with eclipses (7.5% observed vs 28% expected — they avoid them).</li>
      <li><b>Positive results:</b> 37/73 fit the civil solar year (365=73×5; 2701 pentads = 37 years), corroborated by the Maya Haab and Calendar Round; Genesis 1 core palindromes 51.6% vs 37.4% paired null (p≈0.076, borderline — not significant, but very close; hypothesis).</li>
      <li><b>Positive results v3.1 (§15b):</b> 37×73 structure of the 7 Genesis words demonstrated (23/127 subsets, p≈3.1×10⁻⁴); saros-series count by calculation (152 series, 54–87, median 72); 7 kameot = 7 doubles (Mercury 260 = Tzolkin); Aiq Bekar = decimal-positional gematria of §2 (bridge to sigils); 72 Shem HaMephorash angels from Exodus (216=6³); the 7-doubles=7-days heptagram (Chaldean order + mod 7 + Romance etymology); ayanamsa: 190-year spread (tropical discard robust); 6 windows 491-year cadence (p&lt;5×10⁻⁶, hypothesis not cause).</li>
      <li><b>Validation:</b> 88 assertions in <code>scripts/tests.mjs</code> — all green. Scripts in <code>scripts/</code>; paper in <code>paper/index.html</code>.</li>
    </ul>
  </>;
}

export { MethodTab };
