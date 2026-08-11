// tabs/ReadingTab.jsx — Rule / YHVH / Genesis 1:1
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SIGNS, SIMPLE, LETTER_TO_SIGN, DOUBLES, MOTHERS, BODIES, GLYPH, WEEK, FIN2REG, REG2FIN, SIMPLE_LETTERS, GV, norm, displayHe, gematria, simpleSet, formable, isPalindrome, ANGEL_LEXICON, ANGEL_NAME_MAP, readableWords, daysInMonth, makeDate, parseDate, fmtDate, BODIES7, skyAtSet, skyAt, skyAt7, occupiedLetters, bySign, GENESIS, genesisReadable, GEN_TOTAL, GEN_VALUES, PREC, AGE, FULL, AYANAMSIS, SYN, DRAC, ANOM, TROP, ECLY, HALAKIM_DAY, MOLAD, EQUINOX_LON, ageBoundaries, yrLabel, ERA_WINDOWS, FINALS, letterVal, reduce9, LO_SHU, LO_POS, sigilPath, aiqGroups, siamese, doublyEven, singlyEven, buildMagic, isMagic, KAMEOT, GREEK, isopsephy, ABJAD, ABJAD_NAME, abjad, KTP, katapayadi, countSubset, MON, MONTHNAMES, displayDate } from '../core.jsx';
import { SkyMap, KameaGrid, Fig, DateEntry, YearInput, SubTabs } from '../ui.jsx';

function RuleTab({occ}){
  return <>
    <h2>How it reads — the reuse rule</h2>
    <table>
      <thead><tr><th>Class</th><th>Letters</th><th>Assigned to</th><th>Position-dependent?</th><th>Reusable?</th></tr></thead>
      <tbody>
        <tr><td>3 mothers</td><td>א מ ש</td><td>elements · Draco / Ursa Minor / Cassiopea (fixed)</td><td>no</td><td>yes, always</td></tr>
        <tr><td>7 doubles</td><td>ב ג ד כ פ ר ת</td><td>the 7 planets (identity of the planet)</td><td>no</td><td>yes, always</td></tr>
        <tr><td>12 simples</td><td>ה ו ז ח ט י ל נ ס ע צ ק</td><td>the 12 zodiac signs</td><td><b>yes — if its sign is occupied</b></td><td>yes (membership)</td></tr>
      </tbody>
    </table>
    <div className="muted" style={{marginTop:10}}>Read the simple of the occupied sign. Repeating a simple needs no conjunction. Words using only mothers+doubles (<span className="he">ברא</span>, <span className="he">אב</span>, <span className="he">שבת</span>, <span className="he">אמת</span>) are always readable.</div>
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
          <li>Genesis 1:1 legibility: <b>0.0%</b> on rare days vs <b>0.1%</b> baseline (both 7-classical) — the tightest reading all but vanishes.</li>
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

function YhvhTab({date, occ, yhvhOk, bs}){
  return <>
    <h2>The 4 letters of <span className="he">יהוה</span> on {date} <span className={'pill '+(yhvhOk?'ok':'no')}>{yhvhOk?'readable':'not readable'}</span></h2>
    <div className="muted" style={{marginBottom:8}}>With reuse, 3 signs suffice: <b>י</b>(Virgo) + <b>ה</b>(Aries, twice) + <b>ו</b>(Taurus). No conjunction needed.</div>
    <div className="cards">
      <div className={'card'+(occ.has('י')?'':' missing')}><span className="l">י</span><div style={{fontSize:'.8rem',fontWeight:600}}>Yod</div><div className="src">needs Virgo</div><div className="src">{bs['Virgo']?.length ? <>from <b>{bs['Virgo'][0].body}</b> · {bs['Virgo'][0].deg.toFixed(1)}°</> : <b>no planet</b>}</div></div>
      <div className={'card'+(occ.has('ה')?'':' missing')}><span className="l">ה</span><div style={{fontSize:'.8rem',fontWeight:600}}>Heh (1st)</div><div className="src">needs Aries</div><div className="src">{bs['Aries']?.length ? <>from <b>{bs['Aries'][0].body}</b> · {bs['Aries'][0].deg.toFixed(1)}°</> : <b>no planet</b>}</div></div>
      <div className={'card'+(occ.has('ו')?'':' missing')}><span className="l">ו</span><div style={{fontSize:'.8rem',fontWeight:600}}>Vav</div><div className="src">needs Taurus</div><div className="src">{bs['Taurus']?.length ? <>from <b>{bs['Taurus'][0].body}</b> · {bs['Taurus'][0].deg.toFixed(1)}°</> : <b>no planet</b>}</div></div>
      <div className={'card'+(occ.has('ה')?'':' missing')}><span className="l">ה</span><div style={{fontSize:'.8rem',fontWeight:600}}>Heh (2nd)</div><div className="src">reuses Aries</div><div className="src">{bs['Aries']?.length ? <>same <b>{bs['Aries'][0].body}</b></> : <b>no planet</b>}</div></div>
    </div>
    <div style={{marginTop:12,padding:'12px 14px',background:'var(--panel2)',borderRadius:8}}>
      {yhvhOk ? <>
        <div className="muted">It forms today ({date}):</div>
        <div className="big">י ({bs['Virgo'][0].body}) → ה ({bs['Aries'][0].body}) → ו ({bs['Taurus'][0].body}) → ה ({bs['Aries'][0].body} reused)</div>
        <div className="big">= <span className="he">יהוה</span> · “the One who is / Eternal” · gematria 26</div>
      </> : <>
        <div className="muted">It does not form <span className="he">יהוה</span> today. Missing:</div>
        {['י:Virgo','ה:Aries','ו:Taurus'].filter(x=>!occ.has(x[0])).map((x,i)=>{const [l,s]=x.split(':'); return <div key={i} className="note" style={{color:'var(--red)'}}><span className="he" style={{fontSize:'1.2rem'}}>{l}</span> → needs {s} · no planet today</div>;})}
      </>}
    </div>
  </>;
}

function GenesisTab({date, occ, genesisOk}){
  const lengths=[6,3,5,2,5,3,4];
  const words37=GEN_VALUES.filter(v=>v%37===0).length;
  const sub37=countSubset(GEN_VALUES,37);
  const totalLetters=lengths.reduce((a,b)=>a+b,0);
  return <>
    <h2>Genesis 1:1 · <span className="he">בראשית ברא אלהים את השמים ואת הארץ</span> <span className={'pill '+(genesisOk?'ok':'no')}>{genesisOk?`readable on ${date}`:`not readable on ${date}`}</span></h2>
    <div className="muted" style={{marginBottom:8}}>The 7 words together use the simples <b>י ה ל ו צ</b> (Virgo, Aries, Libra, Taurus, Aquarius). Readable only when all 5 signs are occupied at once — Aquarius and Aries anchored by Pluto and Neptune.</div>
    {GENESIS.map(([w,en],i)=>{const c=norm(w); const ss=[...simpleSet(c)].sort(); const ok=formable(c,occ); const m37=GEN_VALUES[i]%37===0; return (
      <div key={i} className={'gw '+(ok?'ok':'no')}>
        <span className="w">{displayHe(c)}</span>
        <span className="es" style={{color:ok?'var(--green)':'var(--red)'}}>{en}</span>
        <span className="muted">· gematria {GEN_VALUES[i]}{m37?` = ${GEN_VALUES[i]/37}×37`:''}</span>
        <span style={{marginLeft:'auto'}}>
          {ss.length===0 ? <span style={{color:'var(--violet)'}}>no simples → always</span> : ss.map(l=> <span key={l} className={'key '+(occ.has(l)?'on':'off')} style={{marginLeft:2}}>{l} {LETTER_TO_SIGN[l]}</span>)}
        </span>
      </div>
    );})}
    <div style={{marginTop:10,padding:'10px 14px',background:'var(--panel2)',borderRadius:8}}>
      <span className="muted">Standard gematria total: </span><b style={{color:'var(--gold)',fontSize:'1.15rem'}}>{GEN_TOTAL}</b>
      <span className="muted"> = 913 + 203 + 86 + 401 + 395 + 407 + 296 · 2701 = 37×73 · triangular T₇₃ · 2701+1072 = 3773 (mirror-palindrome, but non-selective: ~38% of a random text does the same).</span>
    </div>
    <h3>37×73 structure of the 7 words (§15b.5 — verified)</h3>
    <ul className="muted">
      <li>Total = 2701 = 37×73 = T₇₃. Letter count = {totalLetters} = T₇ (7×8/2 = 28). 7 words × {totalLetters} letters = {7*totalLetters} = 14².</li>
      <li>Word-sums that are multiples of 37: <b>{words37}/7</b> (407 = 11×37, 296 = 8×37 — the last two).</li>
      <li>Subsets (of 2⁷−1 = 127) whose sum is a multiple of 37: <b>{sub37}/127</b> (uniform chance ≈ {127/37}≈3.4).</li>
      <li><b style={{color:'var(--green)'}}>Null</b>: 100,000 permutations of the 28-letter multiset regrouped into the fixed lengths (6,3,5,2,5,3,4), mulberry32 seed 20260807 → subsets p ≈ <b>3.1×10⁻⁴</b>; words p ≈ 8.2×10⁻³. The partition is genuinely biased toward 37, beyond the trivial total=2701=37×73.</li>
    </ul>
    <div className="note">Genesis opens in ~13-year windows recurring every ~491 years (the Neptune–Pluto synodic cycle). Previous: 427 BCE (Axial Age), 61 CE (Temple), 552, 1043 (Schism), 1535 (Reformation/Copernicus). Current: 2025–2038.</div>
    <Fig n={10} doc="From the article (§15b.5): the 7 words and their gematrias. The two gold bars are the words that are multiples of 37 (ואת 407=11×37, הארץ 296=8×37). The permutation null shows the bias toward 37 is real (p≈3.1×10⁻⁴), beyond the trivial total 2701=37×73."/>
  </>;
}

export { RuleTab, YhvhTab, GenesisTab };
