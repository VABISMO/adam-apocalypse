// tabs/ReadingTab.jsx — the reading rule (reuse / mother-gate)
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SIGNS, SIMPLE, LETTER_TO_SIGN, DOUBLES, MOTHERS, BODIES, GLYPH, WEEK, FIN2REG, REG2FIN, SIMPLE_LETTERS, GV, norm, displayHe, gematria, simpleSet, formable, isPalindrome, ANGEL_LEXICON, ANGEL_NAME_MAP, readableWords, daysInMonth, makeDate, parseDate, fmtDate, BODIES7, skyAtSet, skyAt, skyAt7, occupiedLetters, bySign, GENESIS, genesisReadable, GEN_TOTAL, GEN_VALUES, PREC, AGE, FULL, AYANAMSIS, SYN, DRAC, ANOM, TROP, ECLY, HALAKIM_DAY, MOLAD, EQUINOX_LON, ageBoundaries, yrLabel, ERA_WINDOWS, FINALS, letterVal, reduce9, LO_SHU, LO_POS, sigilPath, aiqGroups, siamese, doublyEven, singlyEven, buildMagic, isMagic, KAMEOT, GREEK, isopsephy, ABJAD, ABJAD_NAME, abjad, KTP, katapayadi, countSubset, MON, MONTHNAMES, displayDate, motherSet } from '../core.jsx';
import { SkyMap, KameaGrid, Fig, DateEntry, YearInput, SubTabs } from '../ui.jsx';

function RuleTab({occ}){
  return <>
    <h2>How it reads — the reuse rule</h2>
    <table>
      <thead><tr><th>Class</th><th>Letters</th><th>Assigned to</th><th>Position-dependent?</th><th>Reusable?</th></tr></thead>
      <tbody>
        <tr><td>3 mothers</td><td>א מ ש</td><td>elements · Draco / Ursa Minor / Cassiopea (fixed circumpolar axis)</td><td><b>yes — nearest-mother zone of the occupied sign(s)</b></td><td>gated: 1 per single sign; 2 only at a sign-pair boundary</td></tr>
        <tr><td>7 doubles</td><td>ב ג ד כ פ ר ת</td><td>the 7 planets (identity of the planet)</td><td>no</td><td>yes, always</td></tr>
        <tr><td>12 simples</td><td>ה ו ז ח ט י ל נ ס ע צ ק</td><td>the 12 zodiac signs</td><td><b>yes — if its sign is occupied</b></td><td>yes (membership)</td></tr>
      </tbody>
    </table>
    <div className="muted" style={{marginTop:10}}>Read the simple of the occupied sign. Repeating a simple needs no conjunction. The 7 doubles are always lit, so words of doubles only (<span className="he">ברת</span>) always read. A word that also uses a mother is readable only when the sky spans that mother's zone: on an ordinary scattered day all three mother-zones are covered, so mothers+doubles words (<span className="he">ברא</span>, <span className="he">אב</span>, <span className="he">שבת</span>, <span className="he">אמת</span>) read — but a grand conjunction (all seven bodies in one sign) narrows even this to a single mother, and a word needing a different mother does not read.</div>
    <div style={{marginTop:10}}><span className="muted">Simples today: </span>{SIGNS.map(s=>{const he=SIMPLE[s][0]; return <span key={s} className={'key '+(occ.has(he)?'on':'off')}>{he} {s}</span>;})}</div>
    <div className="note">Empty today: {SIGNS.filter(s=>!occ.has(SIMPLE[s][0])).map(s=>SIMPLE[s][0]+' ('+s+')').join(', ')||'none'}.</div>
    <Fig n={2} doc="From the article (§3): the tripartite mapping of the Sefer Yetzirah over the real sky. Outer ring: 12 simples = 12 signs. Middle ring: the 7 doubles = the 7 planets at their longitudes. Centre: the 3 mothers on the fixed circumpolar axis that does not precess. A highlighted sector = an occupied sign = a simple legible that day — this is the reading rule, drawn."/>

    <h2 style={{marginTop:18}}>Why stellar alignments matter — rare <i>and</i> reductive</h2>
    <div className="muted" style={{marginBottom:8}}>An ordinary day scatters the 7 planets across many signs, so most of the 12 simples are occupied and the readable set is large. A rare stellar alignment concentrates those planets into one sign, which empties the others — so <b>fewer</b> letters are legible and <b>fewer</b> words are readable. Two things make such a day astronomically distinctive, and both are proven below.</div>

    <div className="grid2" style={{marginTop:6}}>
      <div className="iv">
        <div style={{fontWeight:600,color:'var(--gold)',marginBottom:4}}>1. It reduces what can be read</div>
        <div className="muted">Concentrating planets in one zodiacal sign lowers letter diversity: the occupied-sign set shrinks, so fewer Hebrew roots are formable. Measured on the 7-classical set, apples-to-apples (rare-alignment days vs an ordinary 2024–2030 baseline):</div>
        <ul className="muted" style={{marginTop:6}}>
          <li>average readable names: <b style={{color:'var(--warn)'}}>826</b> on rare days vs <b style={{color:'var(--green)'}}>1486</b> on ordinary days — a <b>~44% reduction</b>.</li>
          <li>Shem HaMephorash angel-roots: the <b>same 13</b> roots on rare days as on ordinary days — <b>0 new</b>. Clustering <i>removes</i> readings; it never invents unique ones.</li>
        </ul>
        <div className="note">So a rare alignment is a <b>rarity filter</b>, not a richness source: it selects a smaller, sharper subset of words — the opposite of an ordinary day's broad scatter.</div>
      </div>
      <div className="iv">
        <div style={{fontWeight:600,color:'var(--gold)',marginBottom:4}}>2. It recurs every centuries / millennia</div>
        <div className="muted">The alignment itself is rare on a human timescale. From the 20000 BCE → 2200 CE deep scan (7 classical bodies, 3-day step):</div>
        <ul className="muted" style={{marginTop:6}}>
          <li><b>51</b> all-7-in-one-sign events in 22000 years — gaps from <b>38 y</b> to <b>1768 y</b> (avg <b>~429 y</b>): a <i>centuries</i> rhythm, irregular.</li>
          <li>the tightest conjunctions (all 7 within a small arc) reach <b>5.1°</b> (−8267 BCE, Gemini) and recur on a <i>multi-millennium</i> scale.</li>
          <li>Jupiter–Saturn great conjunctions recur every <b>~20 y</b> and drift through the signs over one precessional era (~{AGE.toFixed(0)} y) — the slow engine behind the pattern.</li>
        </ul>
        <div className="note">An event that <i>both</i> shrinks the readable set <i>and</i> returns only every few centuries is what makes a stellar alignment a meaningful reading moment: a small, stable lexicon that co-occurs only on those rare days. Ordinary days are common and read broadly; alignments are rare and read narrowly.</div>
      </div>
    </div>
    <div className="note" style={{marginTop:10}}>Proof = the stored cross-check in <b>Alignments</b> (Cycles tab): rare-day readability vs ordinary baseline, same 7-classical set. Numbers above are read from that cross-check, so the claim is reproducible, not asserted.</div>
  </>;
}

export { RuleTab };
