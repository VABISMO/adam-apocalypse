// tabs/SkyTab.jsx
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SIGNS, SIMPLE, LETTER_TO_SIGN, DOUBLES, MOTHERS, BODIES, GLYPH, WEEK, FIN2REG, REG2FIN, SIMPLE_LETTERS, GV, norm, displayHe, gematria, simpleSet, formable, isPalindrome, ANGEL_LEXICON, ANGEL_NAME_MAP, readableWords, daysInMonth, makeDate, parseDate, fmtDate, BODIES7, skyAtSet, skyAt, skyAt7, occupiedLetters, bySign, GENESIS, genesisReadable, GEN_TOTAL, GEN_VALUES, PREC, AGE, FULL, AYANAMSIS, SYN, DRAC, ANOM, TROP, ECLY, HALAKIM_DAY, MOLAD, EQUINOX_LON, ageBoundaries, yrLabel, ERA_WINDOWS, FINALS, letterVal, reduce9, LO_SHU, LO_POS, sigilPath, aiqGroups, siamese, doublyEven, singlyEven, buildMagic, isMagic, KAMEOT, GREEK, isopsephy, ABJAD, ABJAD_NAME, abjad, KTP, katapayadi, countSubset, MON, MONTHNAMES, displayDate } from '../core.jsx';
import { SkyMap, KameaGrid, Fig, DateEntry, YearInput, SubTabs } from '../ui.jsx';

function SkyTab({date, rawDate, setDate, rows, occ, occSigns, yhvhOk, genesisOk, bs, sentence, step}){
  const dateEmpty = !rawDate || !parseDate(rawDate);
  return <>
    <div className="controls" style={{marginBottom:12}}>
      <button onClick={()=>step(-1)}>◀ day</button>
      <DateEntry value={rawDate} onChange={setDate}/>
      <button onClick={()=>step(1)}>day ▶</button>
      <button onClick={()=>step(7)}>+ week</button>
      <button onClick={()=>setDate('2026-08-08')}>today</button>
      <span className="muted">noon UT · geocentric apparent positions · ecliptic longitude{dateEmpty && <span style={{color:'var(--warn)'}}> · enter a date — showing {date}</span>}</span>
    </div>
    <div className="row">
      <div style={{flex:'1 1 100%'}}><SkyMap rows={rows} occ={occ}/></div>
    </div>
    <div className="note">Today: <b>{occSigns.size}</b> signs occupied, <b>{12-occSigns.size}</b> empty. Readable simples: <b style={{color:'var(--gold)'}}>{[...occ].sort().join(' ')||'none'}</b>. A sector <b>lights up</b> when a planet is inside it; “×N” = N planets in that sign (informational — the reuse rule needs no conjunction to repeat a letter). Centre: the 3 mothers <span className="he">א מ ש</span> on a fixed circumpolar axis. יהוה / Genesis legibility live in their own Reading tabs.</div>
    <h3>Angle table — ecliptic longitude per body ({date})</h3>
    <table>
      <thead><tr><th>Body</th><th>Sign</th><th>Longitude</th><th>Degree in sign</th><th>Simple</th><th>Double</th></tr></thead>
      <tbody>
      {rows.map(r=>(
        <tr key={r.body}>
          <td>{GLYPH[r.body]} {r.body}</td><td>{r.sign}</td>
          <td className="deg">{r.lon.toFixed(2)}°</td>
          <td className="deg">{r.deg.toFixed(2)}° {r.boundary && <span className="boundary">⚠</span>}</td>
          <td className="letter-cell"><span className="he">{SIMPLE[r.sign][0]}</span><br/><span className="muted">{SIMPLE[r.sign][1]}={SIMPLE[r.sign][2]}</span></td>
          <td className="letter-cell">{DOUBLES[r.body] ? <><span className="he" style={{color:'var(--blue)'}}>{DOUBLES[r.body][0]}</span><br/><span className="muted">{DOUBLES[r.body][1]}</span></> : <span className="muted">—</span>}</td>
        </tr>
      ))}
      </tbody>
    </table>
    <div className="muted">Stellar reading (simple letters of the 10 bodies, slow → fast):</div>
    <div className="sentence">{sentence}</div>
    <div className="note"><b>Precession & the map:</b> planet positions are computed for the actual date (astronomy-engine works for any year, past or future — including BCE, enter a negative year above), so the map reflects the real sky of that day. The 12 letter↔sign sectors are <b>tropical</b> — anchored to the equinox (Aries = λ☉=0°), so they do <b>not</b> precess and stay fixed to the seasons. <b>This is normal and intended:</b> the zodiac here is the fixed symbolic grid for reading letters, not the precessing sky. The slow drift of the sidereal constellations against the signs (precession, 50.29″/yr, 1° per ~72 yr) is tracked separately in the <b>Ages</b> and <b>Ayanamsa</b> tabs (precessional ages, Lahiri 24.18°). So: <b>tropical signs = the fixed grid that does NOT rotate with precession</b> (Raziel p.115 confirms: <i>“los signos del zodíaco están fijos”</i>); sidereal constellations = the precessing sky, handled in those tabs.</div>
  </>;
}

export { SkyTab };
