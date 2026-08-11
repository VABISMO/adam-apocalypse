// tabs/MethodTab.jsx
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SIGNS, SIMPLE, LETTER_TO_SIGN, DOUBLES, MOTHERS, BODIES, GLYPH, WEEK, FIN2REG, REG2FIN, SIMPLE_LETTERS, GV, norm, displayHe, gematria, simpleSet, formable, isPalindrome, ANGEL_LEXICON, ANGEL_NAME_MAP, readableWords, daysInMonth, makeDate, parseDate, fmtDate, BODIES7, skyAtSet, skyAt, skyAt7, occupiedLetters, bySign, GENESIS, genesisReadable, GEN_TOTAL, GEN_VALUES, PREC, AGE, FULL, AYANAMSIS, SYN, DRAC, ANOM, TROP, ECLY, HALAKIM_DAY, MOLAD, EQUINOX_LON, ageBoundaries, yrLabel, ERA_WINDOWS, FINALS, letterVal, reduce9, LO_SHU, LO_POS, sigilPath, aiqGroups, siamese, doublyEven, singlyEven, buildMagic, isMagic, KAMEOT, GREEK, isopsephy, ABJAD, ABJAD_NAME, abjad, KTP, katapayadi, countSubset, MON, MONTHNAMES, displayDate } from '../core.jsx';
import { SkyMap, KameaGrid, Fig, DateEntry, YearInput, SubTabs } from '../ui.jsx';

function MethodTab({esGlossCount}){
  return <>
    <h2>Methodology &amp; scope</h2>
    <ul className="muted" style={{marginTop:4,lineHeight:1.7}}>
      <li><b>Frame:</b> a formal synthesis of the Sefer Yetzirah's letter→luminary mapping with astronomical ephemerides. The classical <i>Sefer Yetzirah</i> is cosmogonic linguistics — it binds the 22 letters to sky and speech; this operationalisation takes that mapping as a verifiable protocol and tests the regularities it produces against a null model, posing the design question directly. The stellar-letter reading was historically a divinatory technique, attested in the Sefer Yetzirah, Sefer Raziel, and Gaffarel's Persian–Hebrew star-reading (§15c.8/§15c.10) and replicated here from those instructions; this work documents that use and the intentional design behind it, without claiming the technique predicts the future.</li>
      <li><b>Simple↔sign mapping:</b> equal 30° tropical sectors (not IAU constellations, which are unequal and 13). A symbolic convention necessary for the one-to-one letter↔sign grid. The mothers are placed opposite their real circumpolar constellations (Draco, Ursa Minor, Cassiopea).</li>
      <li><b>Astronomy:</b> astronomy-engine v2.1.19, geocentric apparent ecliptic longitude, noon UT.</li>
      <li><b>Lexicon:</b> Strong (OpenScriptures), 6045 consonantal roots.</li>
      <li><b>Negative results (tested):</b> the mirror-palindrome 2701→3773 does not discriminate at corpus level (Genesis 39.3% ≈ Markov 39.2% ≈ uniform 38.4%); Genesis-days do not correlate with eclipses (7.5% observed vs 28% expected — they avoid them).</li>
      <li><b>Positive results:</b> 37/73 fit the civil solar year (365=73×5; 2701 pentads = 37 years), corroborated by the Maya Haab and Calendar Round; Genesis 1 core palindromes 51.6% vs 37.4% paired null (p≈0.076, borderline — not significant, but very close; hypothesis).</li>
      <li><b>Positive results v3.1 (§15b):</b> 37×73 structure of the 7 Genesis words demonstrated (23/127 subsets, p≈3.1×10⁻⁴); saros-series count by calculation (152 series, 54–87, median 72); 7 kameot = 7 doubles (Mercury 260 = Tzolkin); Aiq Bekar = decimal-positional gematria of §2 (bridge to sigils); 72 Shem HaMephorash angels from Exodus (216=6³); the 7-doubles=7-days heptagram (Chaldean order + mod 7 + Romance etymology); ayanamsa: 190-year spread (tropical discard robust); 6 windows 491-year cadence (p&lt;5×10⁻⁶, hypothesis not cause).</li>
      <li><b>Validation:</b> 88 assertions — all green. Full source and the paper are available in the repository.</li>
    </ul>
  </>;
}

export { MethodTab };
