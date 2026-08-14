// tabs/CyclesTab.jsx — Saros / Ayanamsa / Lunar-Solar / Alignments / Week + diagrams
import React, { useState, useMemo, useEffect, useRef } from 'react';
import * as Astronomy from 'astronomy-engine';
import { SIGNS, SIMPLE, LETTER_TO_SIGN, DOUBLES, MOTHERS, BODIES, GLYPH, WEEK, FIN2REG, REG2FIN, SIMPLE_LETTERS, GV, norm, displayHe, gematria, simpleSet, formable, isPalindrome, ANGEL_LEXICON, ANGEL_NAME_MAP, readableWords, daysInMonth, makeDate, parseDate, fmtDate, BODIES7, skyAtSet, skyAt, skyAt7, occupiedLetters, bySign, GENESIS, genesisReadable, GEN_TOTAL, GEN_VALUES, PREC, AGE, FULL, AYANAMSIS, SYN, DRAC, ANOM, TROP, ECLY, HALAKIM_DAY, MOLAD, EQUINOX_LON, ageBoundaries, yrLabel, ERA_WINDOWS, FINALS, letterVal, reduce9, LO_SHU, LO_POS, sigilPath, aiqGroups, siamese, doublyEven, singlyEven, buildMagic, isMagic, KAMEOT, GREEK, isopsephy, ABJAD, ABJAD_NAME, abjad, KTP, katapayadi, countSubset, MON, MONTHNAMES, displayDate, refUrl, availableMothers, occupiedSigns, motherSet } from '../core.jsx';
import { SkyMap, KameaGrid, Fig, DateEntry, YearInput, SubTabs } from '../ui.jsx';

// ====== Cycles tab — graphical representations (inline SVG, self-contained) ======

// Chaldean heptagram: 7 planets in sidereal order around the ring; the {7/3} star joins
// them in weekday order (each day jumps 3 planets, 24 h mod 7 = 3). 7 doubles = 7 days.
function Heptagram(){
  const cx=170, cy=150, R=120;
  const planets=['Saturn','Jupiter','Mars','Sun','Venus','Mercury','Moon'];
  const dayOf={Saturn:'Sat',Sun:'Sun',Moon:'Mon',Mars:'Tue',Mercury:'Wed',Jupiter:'Thu',Venus:'Fri'};
  const he=['ב','ג','ד','כ','פ','ר','ת'];
  const pt=i=>{ const a=(-90+i*360/7)*Math.PI/180; return [cx+R*Math.cos(a), cy+R*Math.sin(a)]; };
  const order=[0,3,6,2,5,1,4,0];           // weekday (jump-3) order through the 7
  const starD=order.map((k,j)=>{ const [x,y]=pt(k); return (j===0?'M':'L')+x.toFixed(1)+' '+y.toFixed(1); }).join(' ')+' Z';
  return <svg viewBox="0 0 340 300" width="100%" style={{maxWidth:340}} role="img" aria-label="Chaldean heptagram">
    <path d={starD} fill="none" stroke="#e8c87a" strokeWidth="1.4" opacity="0.85"/>
    <circle cx={cx} cy={cy} r={R} fill="none" stroke="#2a2a38" strokeWidth="1"/>
    {planets.map((p,i)=>{ const [x,y]=pt(i); return <g key={p}>
      <circle cx={x} cy={y} r="18" fill="#0f1518" stroke="#5eead4" strokeWidth="1.4"/>
      <text x={x} y={y-1} textAnchor="middle" fontSize="15" fill="#5eead4">{GLYPH[p]}</text>
      <text x={x} y={y+11} textAnchor="middle" fontSize="13" fill="#e8c87a" fontFamily="serif">{he[i]}</text>
      <text x={x} y={y-26} textAnchor="middle" fontSize="10" fill="#8a96ad">{p} · {dayOf[p]}</text>
    </g>; })}
    <text x={cx} y={cy-6} textAnchor="middle" fontSize="11" fill="#8a96ad">Chaldean order</text>
    <text x={cx} y={cy+10} textAnchor="middle" fontSize="11" fill="#e8c87a">7 = 7 = 7</text>
    <text x={cx} y={cy+26} textAnchor="middle" fontSize="9" fill="#8a96ad">sidereal · mod 7 · days</text>
  </svg>;
}

// Eclipse geometry: the ecliptic (Sun), the Moon's inclined path crossing at a node, and
// the |β|<1.6° window that the live scan uses. Moon at node → eclipse; far from node → none.
function SarosDiagram(){
  return <svg viewBox="0 0 460 220" width="100%" style={{maxWidth:460}} role="img" aria-label="Eclipse node geometry">
    <rect x="40" y="98" width="380" height="24" fill="#00db7c" opacity="0.07"/>
    <line x1="40" y1="110" x2="420" y2="110" stroke="#5eead4" strokeWidth="1.5"/>
    <line x1="60" y1="95" x2="400" y2="125" stroke="#9b8ec4" strokeWidth="1.3" strokeDasharray="5 4"/>
    <circle cx="230" cy="110" r="16" fill="#e8c87a"/>
    <circle cx="230" cy="110" r="16" fill="none" stroke="#f4a8c0" strokeWidth="1"/>
    <circle cx="262" cy="110" r="6" fill="#16161f" stroke="#00db7c" strokeWidth="1.4"/>
    <circle cx="120" cy="92" r="6" fill="#16161f" stroke="#e96770" strokeWidth="1.4"/>
    <text x="230" y="74" textAnchor="middle" fontSize="10" fill="#f4a8c0">node · eclipse season</text>
    <text x="262" y="135" textAnchor="middle" fontSize="9" fill="#00db7c">Moon at node → eclipse</text>
    <text x="120" y="80" textAnchor="middle" fontSize="9" fill="#e96770">Moon far from node → none</text>
    <text x="40" y="92" fontSize="9" fill="#5eead4">ecliptic (Sun's path)</text>
    <text x="300" y="140" fontSize="9" fill="#9b8ec4">Moon's path · 5.1° incline</text>
    <text x="40" y="158" fontSize="9" fill="#00db7c">|β| &lt; 1.6° window (scan threshold)</text>
  </svg>;
}

// Precession: one zodiac wheel, two zero-points. Tropical Aries 0° is fixed to the equinox
// (does NOT precess); sidereal Aries 0° is fixed to the stars and precesses away from it —
// the gap is the ayanamsa (24.18° now). The sidereal frame rotates clockwise with precession.
function PrecessionDiagram(){
  const cx=230, cy=130, R=120, r=70;
  const seg=(i,cls,lab)=>{ const a1=(-90+i*30)*Math.PI/180, a2=(-90+(i+1)*30)*Math.PI/180;
    const x1=cx+R*Math.cos(a1), y1=cy+R*Math.sin(a1), x2=cx+R*Math.cos(a2), y2=cy+R*Math.sin(a2);
    const mx=cx+(R-22)*Math.cos((a1+a2)/2), my=cy+(R-22)*Math.sin((a1+a2)/2);
    return <g key={i}>
      <path d={`M ${cx} ${cy} L ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2} Z`} fill={cls} stroke="#2a2a38" strokeWidth="0.8"/>
      <text x={mx} y={my} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#8a96ad">{lab}</text>
    </g>; };
  // tropical Aries 0° at top (-90°); sidereal Aries 0° offset by +ayanamsa
  const ayAng=(-90+24.18)*Math.PI/180;
  const tx=cx+R*Math.cos(-90*Math.PI/180), ty=cy+R*Math.sin(-90*Math.PI/180);
  const sx=cx+R*Math.cos(ayAng), sy=cy+R*Math.sin(ayAng);
  return <svg viewBox="0 0 460 280" width="100%" style={{maxWidth:460}} role="img" aria-label="Precession: tropical vs sidereal zodiac">
    <circle cx={cx} cy={cy} r={R} fill="#16161f" stroke="#2a2a38"/>
    {SIGNS.map((s,i)=>seg(i, i%2? '#16161f':'#16161f', s.slice(0,3)))}
    {/* tropical Aries 0° marker — fixed */}
    <line x1={cx} y1={cy} x2={tx} y2={ty} stroke="#e8c87a" strokeWidth="2"/>
    <circle cx={tx} cy={ty} r="5" fill="#e8c87a"/>
    <text x={tx} y={ty-10} textAnchor="middle" fontSize="9" fill="#e8c87a">♈ tropical 0° (fixed to equinox — does NOT precess)</text>
    {/* sidereal Aries 0° marker — precessing */}
    <line x1={cx} y1={cy} x2={sx} y2={sy} stroke="#9b8ec4" strokeWidth="2" strokeDasharray="4 3"/>
    <circle cx={sx} cy={sy} r="5" fill="#9b8ec4"/>
    <text x={sx+10} y={sy+4} fontSize="9" fill="#9b8ec4">sidereal 0° (fixed to stars — precesses)</text>
    {/* ayanamsa arc */}
    <path d={`M ${cx+(R-34)*Math.cos(-90*Math.PI/180)} ${cy+(R-34)*Math.sin(-90*Math.PI/180)} A ${R-34} ${R-34} 0 0 1 ${cx+(R-34)*Math.cos(ayAng)} ${cy+(R-34)*Math.sin(ayAng)}`} fill="none" stroke="#f4a8c0" strokeWidth="1.4"/>
    <text x={cx+ (R-50)*Math.cos((-90+12)*Math.PI/180)} y={cy+(R-50)*Math.sin((-90+12)*Math.PI/180)+3} textAnchor="middle" fontSize="9" fill="#f4a8c0">ayanamsa 24.18°</text>
    {/* precession direction arrow */}
    <path d={`M ${cx} ${cy+44} A 44 44 0 0 0 ${cx-31} ${cy+31}`} fill="none" stroke="#8a96ad" strokeWidth="1.2" markerEnd="url(#ar)"/>
    <defs><marker id="ar" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#8a96ad"/></marker></defs>
    <text x={cx} y={cy} textAnchor="middle" fontSize="9" fill="#8a96ad">precession →</text>
  </svg>;
}

// Metonic 19-year cycle: 19 nodes around a ring. 7 leap years (13 months) in gold = the 7
// doubles; 12 common (12 months). 19 yr ≈ 235 lunations. 19 = 7 doubles + 12 simples.
function MetonDiagram(){
  const cx=160, cy=110, R=95;
  const leap=new Set([3,6,8,11,14,17,19]);
  const pt=y=>{ const a=(-90+(y-1)*360/19)*Math.PI/180; return [cx+R*Math.cos(a), cy+R*Math.sin(a)]; };
  return <svg viewBox="0 0 360 220" width="100%" style={{maxWidth:360}} role="img" aria-label="Metonic 19-year cycle">
    <circle cx={cx} cy={cy} r={R+14} fill="none" stroke="#2a2a38"/>
    {Array.from({length:19},(_,i)=>i+1).map(y=>{ const [x,yp]=pt(y); const L=leap.has(y); return <g key={y}>
      <circle cx={x} cy={yp} r={L?13:10} fill={L?'#e8c87a':'#16161f'} stroke={L?'#e8c87a':'#2a2a38'} strokeWidth="1.2"/>
      <text x={x} y={yp+3} textAnchor="middle" fontSize="9" fill={L?'#0b0e14':'#8a96ad'} fontWeight={L?700:400}>{L?'13':'12'}</text>
      <text x={x} y={L?yp-19:yp-16} textAnchor="middle" fontSize="8" fill="#8a96ad">{y}</text>
    </g>; })}
    <text x={cx} y={cy-8} textAnchor="middle" fontSize="11" fill="#e8c87a">19 yr</text>
    <text x={cx} y={cy+6} textAnchor="middle" fontSize="9" fill="#8a96ad">= 235 months</text>
    <text x={cx} y={cy+20} textAnchor="middle" fontSize="9" fill="#8a96ad">7 leap + 12 common</text>
  </svg>;
}

function WeekTab({date, rows}){
  return <>
    <h2>The week — 7 doubles = 7 planets = 7 days · where each is on {date}</h2>
    <div className="week">
      {WEEK.map(([day,plan],idx)=>{
        const r=rows.find(x=>x.body===plan);
        const isToday = (()=>{ const d=parseDate(date); return d ? idx===d.getUTCDay() : false; })();
        return (
          <div key={day} className={'day'+(isToday?' today':'')}>
            <div className="dn">{day}{isToday?' · date':''}</div>
            <div className="pl">{plan}</div>
            <div className="l">{DOUBLES[plan][0]}</div>
            <div className="pl">{r ? <>{r.sign} <span className="he" style={{fontSize:'1rem'}}>{SIMPLE[r.sign][0]}</span></> : '—'}</div>
          </div>
        );
      })}
    </div>
    <h3>Chaldean order — the heptagram 7 = 7 = 7 (§15b.9, verified)</h3>
    <ul className="muted">
      <li><b>(A) Sidereal periods</b>, slow → fast: Saturn (29.46 a) &gt; Jupiter (11.86) &gt; Mars (1.88) &gt; Sun (1.00) &gt; Venus (0.615) &gt; Mercury (0.241) &gt; Moon (0.075). This is the Chaldean order — an astronomical fact.</li>
      <li><b>(B) Hourly week</b>: 24 h/day, each hour ruled by the next planet in Chaldean order. The planet of the 1st hour names the day. 24 mod 7 = 3 → the next day jumps 3 planets.</li>
      <li><b>(C) Etymology</b>: Tuesday = Mars/Martes, Wednesday = Mercury/Miércoles, Thursday = Jupiter/Jueves, Friday = Venus/Viernes, Saturday = Saturn/Sábado — the Romance names preserve the planet.</li>
      <li>The 7 doubles (ב ג ד כ פ ר ת) are the 7 planets; the 7 planets are the 7 days. The heptagram 7=7=7 closes by sidereal periods + mod-7 arithmetic + etymology. <b>Note</b>: the 7-day week is a cultural (Chaldean-Babylonian) artefact, not a continuous astronomical cycle; its astronomical anchor is the Chaldean order of the 7 planets, which is real.</li>
    </ul>
    <div className="fig"><Heptagram/><div className="cap">The Chaldean heptagram — 7 planets in sidereal order on the ring; the gold {`{7/3}`} star traces weekday order (Sat→Sun→Mon→Tue→Wed→Thu→Fri), each day jumping 3 planets (24 h mod 7 = 3). 7 doubles = 7 planets = 7 days.</div></div>
    <div className="note">Each planet (a double) travels through the 12 signs (simples); that planet is read in a different sign depending on the day.</div>
  </>;
}


function SarosTab(){
  const [yr,setYr]=useState(2026);
  const [list,setList]=useState(null);
  const [busy,setBusy]=useState(false);
  function scan(y){
    setBusy(true);
    setTimeout(()=>{
      const out=[]; let cur=makeDate(y,1,1);
      const endMs=makeDate(y+1,1,1).getTime(); let guard=0;
      while(cur.getTime()<endMs && guard++<40){
        const t=Astronomy.SearchMoonPhase(0, cur, 40);
        if(!t) break;
        const lat=Astronomy.EclipticGeoMoon(t).lat; const ds=fmtDate(t.date);
        if(Math.abs(lat)<1.6) out.push({ds, beta:lat, kind:Math.abs(lat)<0.6?'central':'partial'});
        cur=new Date(t.date.getTime()+2*86400000);
      }
      setList({y, out}); setBusy(false);
    },20);
  }
  useEffect(()=>{ scan(yr); },[yr]);
  return <>
    <h2>Saros — solar eclipses &amp; the saros series (§15b.6, §9)</h2>
    <div className="muted" style={{marginBottom:10}}>A live scan: every new moon in the chosen year, a solar eclipse if the Moon's ecliptic latitude |β| &lt; 1.6° (the calibrated eclipse threshold). One year is fast; the full 5000-year enumeration that counts saros series members runs offline.</div>
    <div className="fig"><SarosDiagram/><div className="cap">Why eclipses cluster at nodes: the Moon's path is inclined 5.1° to the ecliptic and crosses it only twice per month. A new moon within the |β|&lt;1.6° window (green band) = solar eclipse; elsewhere = a normal new moon. The scan tests exactly this.</div></div>
    <div className="controls" style={{marginBottom:10}}>
      <button onClick={()=>setYr(yr-1)}>◀ {yr-1}</button>
      <YearInput value={yr} onCommit={setYr}/>
      <button onClick={()=>setYr(yr+1)}>{yr+1} ▶</button>
      {yr<0 && <span className="muted" style={{fontSize:'.78rem'}}>{Math.abs(yr)} BCE</span>}
      {busy && <span className="pill">scanning…</span>}
    </div>
    {list && <>
      <div className="muted">Solar eclipses in {list.y}: <b style={{color:'var(--gold)'}}>{list.out.length}</b></div>
      <table>
        <thead><tr><th>Date</th><th>β (Moon lat)</th><th>Type</th></tr></thead>
        <tbody>
        {list.out.length===0 && <tr><td className="muted">none</td><td></td><td></td></tr>}
        {list.out.map(e=> <tr key={e.ds}><td>{e.ds}</td><td className="deg">{e.beta.toFixed(3)}°</td><td>{e.kind==='central'?'<b style="color:var(--gold)">central</b>':'partial'}</td></tr>)}
        </tbody>
      </table>
    </>}
    <h3>The saros-series count (§15b.6 — verified by calculation)</h3>
    <ul className="muted">
      <li>The saros = 223 synodic months = <b>{(223*SYN).toFixed(2)} d</b>. Eclipses of one series are separated by ~{(223*SYN).toFixed(2)} d; a chain = a saros series.</li>
      <li>Full enumeration (5000 years, all new moons, |β| &lt; 1.6°): <b>152 complete series, lengths 54–87, median 72</b> — the empirical member count of a saros series.</li>
    </ul>
    <h3>Hebrew stellar-alphabet mnemonics for eclipse seasons</h3>
    <div className="muted" style={{marginBottom:8}}>The <i>Sefer Yetzirah</i> does not predict eclipses, and the <i>Sefer Raziel</i> (p.144: “combina los signos y la rueda… calcula los períodos… calcula para ver las generaciones”) gives the letter-astronomy scaffold but no eclipse algorithm. The real engine is the Hebrew calendar, and its constants are the SY's constants:</div>
    <table>
      <thead><tr><th>Astronomy</th><th>Stellar alphabet (SY)</th></tr></thead>
      <tbody>
      <tr><td>Molad = 29d 12h 793p = <b>{MOLAD.toFixed(6)} d</b></td><td>≈ synodic month <b>{SYN.toFixed(6)} d</b> ⇒ a conjunction engine (eclipse = conjunction/opposition near a node)</td></tr>
      <tr><td>Metonic cycle = <b>19 yr</b> (12 common + 7 leap)</td><td><b>19 = 7 doubles + 12 simples</b> (the SY's own partition)</td></tr>
      <tr><td>7 leap years of the 19-yr cycle</td><td>= the <b>7 doubles</b> (mnemonic)</td></tr>
      <tr><td>28 lunar mansions (node / Moon path)</td><td><b>28 = T₇</b> — triangular number of the 7 doubles</td></tr>
      <tr><td>Saros ≈ 19 eclipse years (Δ {(19*ECLY-223*SYN).toFixed(2)} d)</td><td>the SY's <b>19</b> structures the saros</td></tr>
      <tr><td>Saros = 223 synodic = 242 draconic months</td><td><b>242 − 223 = 19</b> — the SY number embedded in the saros</td></tr>
      </tbody>
    </table>
    <div className="note">Sources the Hebrew calendar actually uses (absent from the rest of this app): molad + tekufot (Shmuel/Ada), <i>Baraita of Samuel</i> (the one Jewish source with a nodal cycle), Maimonides <i>Kiddush HaChodesh</i> (mean lunar motion), Ibn Ezra <i>Sefer ha-Olam</i> (28 mansions, precession). <b>Caveat:</b> these mnemonics predict <i>eclipse seasons</i> (a window near a node), not individual eclipses or paths; the molad + 19-yr cycle is a real calculation engine, the stellar-alphabet constants are a mnemonic, not a physical model.</div>
  </>;
}

function AyanamsaTab(){
  const AYA={'Lahiri (Chitrapaksha)':24.18,'Krishnamurti (KP)':23.93,'Fagan-Bradley':25.06,'Raman':22.40};
  const aqu={};
  for(const [name,a] of Object.entries(AYA)){ const b=ageBoundaries(a); aqu[name]=b.find(x=>x.sign==='Aquarius').start; }
  const allD=Object.values(aqu); const spread=Math.max(...allD)-Math.min(...allD);
  return <>
    <h2>Ayanamsa — sensitivity of the precessional ages (§15b.7)</h2>
    <div className="muted" style={{marginBottom:10}}>The Ages tab dates the eras with Lahiri (24.18°). Other ayanamsas shift every era boundary by Δayanamsa / precession — up to ~190 years between extremes. The “Age of Aquarius” is not a clean astronomical prediction; it depends on the chosen sidereal zero. The Reader does <b>not</b> date ages by ayanamsa but by <b>tropical</b> sign occupation (the 7 classical bodies) — independent of the ayanamsa, so its discard is robust.</div>
    <div className="fig"><PrecessionDiagram/><div className="cap">Tropical Aries 0° (gold) is fixed to the vernal equinox — it does <b>not</b> precess, so the Reader's 12 letter↔sign sectors never rotate. Sidereal Aries 0° (violet) is fixed to the stars and precesses away from it; the gap is the ayanamsa (24.18° today). This is why the zodiacs here don't move with precession — by design.</div></div>
    <table>
      <thead><tr><th>Ayanamsa</th><th>value (°, ~2024)</th><th>Aquarius entry</th></tr></thead>
      <tbody>
      {Object.entries(AYA).map(([name,a])=> <tr key={name}><td>{name}</td><td className="deg">{a.toFixed(2)}</td><td className="deg">{yrLabel(aqu[name])}</td></tr>)}
      </tbody>
    </table>
    <div className="note">Spread of the Aquarius entry: <b style={{color:'var(--gold)'}}>{spread.toFixed(0)} years</b>. Invariants (independent of ayanamsa): great year = 360°/PREC = {Math.round(FULL)} y; one age = 30°/PREC = {AGE.toFixed(1)} y.</div>
  </>;
}

function LunarSolarTab(){
  const meton19=19*TROP, meton235=235*SYN;
  const oct8=8*TROP, oct99=99*SYN;
  const isl33lunar=33*12*SYN, isl33solar=33*TROP;
  return <>
    <h2>Lunar–Solar synchronisation — Meton, octaeteris, Islamic (§7–§8)</h2>
    <div className="muted" style={{marginBottom:10}}>The 19-year lunisolar cycle (Meton) and its cross-cultural echoes. All numbers computed live from SYN = {SYN} and TROP = {TROP}.</div>
    <div className="fig"><MetonDiagram/><div className="cap">The Metonic 19-year cycle: 7 leap years (13 months, gold = the 7 doubles) + 12 common years (12 months) = 235 lunations ≈ 19 tropical years. 19 = 7 doubles + 12 simples — the SY's own partition is the lunisolar cycle.</div></div>
    <table>
      <thead><tr><th>Cycle</th><th>Relation</th><th>Days (lunar)</th><th>Days (solar)</th><th>Δ</th></tr></thead>
      <tbody>
        <tr><td><b>Meton</b> (19a / 235m)</td><td>12×12 + 7×13 = 144 + 91 = 235</td><td className="deg">{meton235.toFixed(2)}</td><td className="deg">{meton19.toFixed(2)}</td><td className="deg">{(meton235-meton19).toFixed(3)}</td></tr>
        <tr><td><b>Octaeteris</b> (8a / 99m)</td><td>8×12 + 3 = 99</td><td className="deg">{oct99.toFixed(2)}</td><td className="deg">{oct8.toFixed(2)}</td><td className="deg">{(oct99-oct8).toFixed(3)}</td></tr>
        <tr><td>Islamic 33y (33×12m)</td><td>drift of the Hijri year</td><td className="deg">{isl33lunar.toFixed(0)}</td><td className="deg">{isl33solar.toFixed(0)}</td><td className="deg">{(isl33lunar-isl33solar).toFixed(0)}</td></tr>
      </tbody>
    </table>
    <ul className="muted">
      <li><b>Meton</b>: 19 tropical years ≈ 235 synodic months (Δ ≈ {(meton235-meton19).toFixed(2)} d). 235 = 12×12 + 7×13 — the 12² appears here too (cf. 144 in the Revelation tab).</li>
      <li><b>Octaeteris</b>: 8 years ≈ 99 months (the older, rougher cycle; Δ ≈ {(oct99-oct8).toFixed(2)} d).</li>
      <li><b>Islamic</b>: a 33-year cycle brings the lunar calendar back near the solar year (drift ≈ {(isl33lunar-isl33solar).toFixed(0)} d over 33 y ≈ 11 d/y).</li>
      <li><b>China</b>: the 章 (zhāng) = 19 years = 235 months = Meton, discovered independently.</li>
      <li>Draconic month {DRAC} d · anomalistic {ANOM} d · eclipse year {ECLY.toFixed(2)} d → saros 223×SYN = {(223*SYN).toFixed(2)} d (see the Saros tab).</li>
    </ul>
  </>;
}


function AlignTable({title, sub, items, set, sel, pick, openEph, goReader, showMax=true}){
  const [page,setPage]=useState(0);
  const [q,setQ]=useState('');
  const [yr,setYr]=useState('');          // year filter — empty = show all (as before)
  const qn=q.trim().toLowerCase();
  // year-of-date without parsing a full Date: leading signed int of the ISO-ish string.
  // yearOf("2001-09-11")=2001, yearOf("-0144-07-05")=-144.
  const yrN = yr.trim()==='' ? null : ((()=>{ const n=parseInt(yr.trim(),10); return isNaN(n)?null:n; })());
  const filtered=useMemo(()=> items.filter(e=>{
    if(yrN!==null){ const m=e.date.match(/^(-?\d+)/); if(!m || parseInt(m[1],10)!==yrN) return false; }
    if(qn && !(e.date.includes(qn) || e.sign.toLowerCase().includes(qn) || e.era.toLowerCase().includes(qn) || (''+e.maxInSign)===qn)) return false;
    return true;
  }), [items,qn,yrN]);
  // Reset to page 1 ONLY when a filter changes — NOT on `items` identity, which churns
  // every parent render (the parent re-creates the sorted arrays). Resetting on items would
  // snap the user back to page 1 the moment they click a date (the bug: "cuando pinchas en
  // una fecha las paginas se resetean"). `cur` below clamps page to the valid range, so a
  // one-time items swap (null→data) needs no explicit reset.
  useEffect(()=>{ setPage(0); },[qn,yrN]);
  const PS=22, pages=Math.max(1,Math.ceil(filtered.length/PS)), cur=Math.min(page,pages-1);
  const slice=filtered.slice(cur*PS,cur*PS+PS);
  return <div style={{marginBottom:18}}>
    <h3>{title}</h3>
    {sub && <div className="muted" style={{marginBottom:6}}>{sub}</div>}
    <div className="controls" style={{marginBottom:8}}>
      <input type="text" placeholder="search date · sign · era · max…" value={q} onChange={e=>setQ(e.target.value)} style={{flex:'1 1 220px'}} aria-label="Filter alignments"/>
      <input type="number" placeholder="year" value={yr} onChange={e=>setYr(e.target.value)} style={{width:84}} aria-label="Filter by year (empty = all years)"/>
      <span className="pill">{filtered.length} alignments · page {cur+1}/{pages} · {PS}/page</span>
    </div>
    <table>
      <thead><tr><th>Date</th>{showMax&&<th>maxInSign</th>}<th>Sign</th><th>Span</th><th>Era</th><th>Actions</th></tr></thead>
      <tbody>{slice.map(e=> <tr key={e.date} style={e.date===sel?{background:'rgba(127,176,255,0.10)'}:undefined}>
        <td><button className="linkish" onClick={()=>pick(e.date,set)}>{displayDate(e.date)}</button></td>
        {showMax&&<td className="deg">{e.maxInSign}</td>}
        <td>{e.sign}</td><td className="deg">{e.span}°</td><td>{e.era}</td>
        <td><div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
          <button onClick={()=>openEph(e,set)} title="What historically happened on this date (Wikipedia On This Day + AI search, opens a modal)" aria-label={`What happened on ${e.date}`} style={{fontSize:'.76rem',padding:'3px 9px',whiteSpace:'nowrap'}}>📜 what happened</button>
          <button onClick={()=>goReader(e.date)} title="Open this day in the Reader tab (the readable names of that sky)" aria-label={`Open ${e.date} in Reader`} style={{fontSize:'.76rem',padding:'3px 9px',whiteSpace:'nowrap'}}>📖 Reader</button>
        </div></td>
      </tr>)}</tbody>
    </table>
    {pages>1 && <div className="controls" style={{marginTop:8}}>
      <button onClick={()=>setPage(p=>Math.max(0,p-1))} disabled={cur===0}>◀ prev</button>
      <span className="pill">page {cur+1} / {pages}</span>
      <button onClick={()=>setPage(p=>Math.min(pages-1,p+1))} disabled={cur>=pages-1}>next ▶</button>
      <span className="muted">jump:</span>
      <input type="number" min="1" max={pages} value={cur+1} onChange={e=>{const n=parseInt(e.target.value,10); if(!isNaN(n)) setPage(Math.max(0,Math.min(pages-1,n-1)));}} style={{width:64}} aria-label="Jump to page"/>
    </div>}
  </div>;
}

function HistEvent({e}){
  const yr = e.year<0 ? Math.abs(e.year)+' BCE' : ''+e.year;
  return <div style={{display:'flex',gap:8,padding:'4px 0',borderBottom:'1px solid var(--line)',alignItems:'flex-start'}}>
    <span className="deg" style={{minWidth:54,color:'var(--gold)',fontWeight:600,flexShrink:0}}>{yr}</span>
    <span style={{flex:1,fontSize:'.86rem'}}>{e.text}{e.url && <> · <a href={e.url} target="_blank" rel="noopener">Wikipedia</a></>}</span>
  </div>;
}
// Ephemerides = "what actually happened on this date" (human history), per the user.
// Source: Wikipedia's free "On This Day" REST feed — the largest free day-by-day
// historical corpus (recorded history back to antiquity), CORS-enabled, no API key —
// usable from a static site. The Google "ask an AI" link is the universal fallback the
// user asked for (works for any date, including BCE / pre-history). Hooks run BEFORE the
// early return so the Rules of Hooks hold.
function EphemeridesModal({eph, onClose}){
  const [hist,setHist]=useState(null);
  useEffect(()=>{
    if(!eph){ setHist(null); return; }
    const d=parseDate(eph.date);
    if(!d){ setHist({error:'bad date'}); return; }
    const mm=String(d.getUTCMonth()+1).padStart(2,'0'), dd=String(d.getUTCDate()).padStart(2,'0'), yr=d.getUTCFullYear();
    setHist({loading:true, year:yr, mm, dd});
    fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${mm}/${dd}`)
      .then(r=>{ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); })
      .then(j=>{
        const evs=(j.events||[]).map(e=>{
          const p=e.pages&&e.pages[0];
          return { year:e.year, text:e.text,
            url: p&&p.content_urls?p.content_urls.desktop.page:null };
        }).sort((a,b)=>b.year-a.year);
        setHist({loading:false, year:yr, mm, dd, events:evs, exact:evs.filter(e=>e.year===yr)});
      })
      .catch(err=>setHist({loading:false, year:yr, mm, dd, error:err.message}));
  },[eph]);
  if(!eph) return null;
  const ev=eph.ev;
  const disp=displayDate(eph.date);
  const googleQ=encodeURIComponent('what happened on '+disp);
  const mi=hist&&parseInt(hist.mm,10)-1, di=hist&&parseInt(hist.dd,10);
  const mmName = hist ? MONTHNAMES[mi] : '';
  const wikiDay = hist ? `https://en.wikipedia.org/wiki/${mmName}_${di}` : null;
  const CAP=40, shown=hist&&hist.events?hist.events.slice(0,CAP):[];
  return <div className="eph-modal" onClick={onClose}>
    <div className="panel eph-panel" onClick={e=>e.stopPropagation()}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
        <h3 style={{margin:0}}>What happened — {disp}</h3>
        <button className="linkish" onClick={onClose} style={{fontSize:'1.1rem'}} title="Close">close ✕</button>
      </div>
      <div className="muted" style={{marginBottom:8}}>Historical events on this date — from Wikipedia's <b>On This Day</b>, the largest free day-by-day historical corpus (recorded history back to antiquity). Sorted current → past. This is <b>human history</b>, not the astronomical alignment.</div>

      {hist&&hist.loading && <div className="muted">Loading historical events…</div>}
      {hist&&hist.error && <div className="muted" style={{color:'var(--red)'}}>Could not load events ({hist.error}). Use the AI search below.</div>}

      {hist&&!hist.loading&&hist.events && <>
        {hist.exact.length>0 && <>
          <div style={{color:'var(--gold)',fontWeight:700,margin:'6px 0 4px'}}>On this date — {disp}</div>
          {hist.exact.map((e,i)=><HistEvent key={'x'+i} e={e}/>)}
        </>}
        <div style={{color:'var(--blue)',fontWeight:600,margin:'10px 0 4px'}}>
          {hist.exact.length>0 ? `Also on ${mmName} ${di} in history (current → past)` : `On ${mmName} ${di} in history (current → past)`}
        </div>
        {hist.exact.length===0 && <div className="muted" style={{marginBottom:6,fontSize:'.84rem'}}>No event recorded for the exact year {hist.year<0?Math.abs(hist.year)+' BCE':hist.year}.{hist.year<0?' This date is before recorded history;':''} ask the AI (below) for more.</div>}
        {shown.map((e,i)=><HistEvent key={i} e={e}/>)}
        {hist.events.length>CAP && <div className="note"><a href={wikiDay} target="_blank" rel="noopener">See all {hist.events.length} events on Wikipedia →</a></div>}
      </>}

      <div style={{marginTop:10,padding:'8px 10px',background:'var(--panel2)',border:'1px solid var(--line)',borderRadius:8}}>
        <div className="muted" style={{marginBottom:4,fontSize:'.82rem'}}>Ask an AI what happened on this date:</div>
        <a href={`https://www.google.com/search?q=${googleQ}`} target="_blank" rel="noopener" style={{fontWeight:600}}>🔍 what happened on {disp} →</a>
      </div>

      {ev && <div className="note" style={{marginTop:8}}>Astronomical alignment on this date: {ev.maxInSign} bodies in {ev.sign}, span {ev.span}°, era {ev.era}.</div>}
    </div>
  </div>;
}

function AlignmentsTab({setDate, goReader, lex, angelMap, genData, nameRefs}){
  const [data,setData]=useState(null);
  const [err,setErr]=useState(null);
  const [sel,setSel]=useState(null);
  const [selSet,setSelSet]=useState('B');
  const [eph,setEph]=useState(null);          // {date, set, ev} for the ephemerides modal
  const [topView,setTopView]=useState('date'); // 'date' (this sky) | 'always' (every day)
  const mapRef=useRef(null);
  const [dayOccs7,setDayOccs7]=useState(null); // 7-classical occupied-sets over a reference year (top-8 legibility %)
  const [dayMoms7,setDayMoms7]=useState(null); // ...matching geometric mother-gate per day (top-8 legibility %)
  useEffect(()=>{ fetch('/alignments.json').then(r=>{ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); }).then(setData).catch(e=>setErr(e.message)); },[]);
  // default to the tightest classical grand conjunction once data is in
  useEffect(()=>{ if(data && !sel){ const t=[...data.scanB].filter(e=>e.maxInSign>=7).sort((a,b)=>a.span-b.span); if(t.length){ setSel(t[0].date); setSelSet('B'); } } },[data,sel]);
  // 7-classical year scan (once, on lex load): the within-year occupied-sign distribution
  // so each top-8 word can show an empirical legibility % (special/frequent/common) like
  // the Translator tab. Both body sets are now the 7 classical bodies, so the App's
  // genData.dayOccs (modern) and this dayOccs7 are the same scan; this one covers the
  // deep-chronology default. It runs in a setTimeout so it never blocks first paint.
  useEffect(()=>{
    if(!lex) return;
    let cancelled=false;
    setTimeout(()=>{
      const y=2026, nDays=(y%4===0&&(y%100!==0||y%400===0))?366:365;
      const occs=[], moms=[]; for(let i=0;i<nDays;i++){ const rows=skyAt7(fmtDate(makeDate(y,1,1+i))); occs.push(occupiedLetters(rows)); moms.push(availableMothers(occupiedSigns(rows))); }
      if(!cancelled){ setDayOccs7(occs); setDayMoms7(moms); }
    },20);
    return ()=>{ cancelled=true; };
  },[lex]);
  // per-word empirical legibility fraction for the ACTIVE body set, keyed by consonants.
  // {map: he->frac, n: days scanned, year}. null until the relevant dayOccs are ready.
  const probs=useMemo(()=>{
    if(!lex) return null;
    const dayOccs = selSet==='A' ? (genData&&genData.dayOccs) : dayOccs7;
    const dayMoms = selSet==='A' ? (genData&&genData.dayMoms) : dayMoms7;
    if(!dayOccs) return null;
    const m=new Map(), n=dayOccs.length||1;
    const frac=(cons)=>{ const req=[...simpleSet(cons)]; const moms=[...motherSet(cons)]; if(!req.length && !moms.length){ m.set(cons,1); return; } let c=0; for(let i=0;i<dayOccs.length;i++){ let ok=true; for(const x of req) if(!dayOccs[i].has(x)){ ok=false; break; } if(ok && dayMoms) for(const mc of moms) if(!dayMoms[i].has(mc)){ ok=false; break; } if(ok) c++; } m.set(cons,c/n); };
    for(const [cons] of lex.lexicon) frac(cons);
    for(const [he] of ANGEL_LEXICON) if(!m.has(he)) frac(he);
    return { map:m, n:dayOccs.length, year: selSet==='A' ? ((genData&&genData.year)||2026) : 2026, bodies: '7 classical' };
  },[lex,selSet,genData,dayOccs7,dayMoms7]);
  const pick=(d,set='B')=>{ setSel(d); setSelSet(set); if(setDate) setDate(d);
    // Anchor to the sky-map + top reading so the user sees what changed on that alignment.
    setTimeout(()=>{ if(mapRef.current) mapRef.current.scrollIntoView({behavior:'smooth', block:'start'}); }, 60); };
  const openEph=(e,set)=>setEph({date:e.date,set,ev:e});
  if(err) return <div className="panel app-panel"><h2>Alignments</h2><p>Could not load the alignment data. Please refresh the page; if the problem persists, the data may be unavailable right now.</p></div>;
  if(!data) return <div className="panel"><h2>Alignments</h2><p>Loading alignments.json…</p></div>;

  const byDateDesc=(a,b)=>parseDate(b.date)-parseDate(a.date);                 // newest first, past last
  const deep=[...data.scanB].sort(byDateDesc);                                  // deep chronology, current→past
  const all7=deep.filter(e=>e.maxInSign>=7);                                    // all-7-in-sign, current→past
  const tight=all7.slice().sort((a,b)=>a.span-b.span);                          // tightest first
  const tight4=[...tight.slice(0,4)].sort(byDateDesc);                          // 4 tightest, shown current→past
  const tightGap=tight.length>=2 ? Math.abs((parseDate(tight[0].date)-parseDate(tight[1].date))/86400000/365.25) : null;
  const ev = (selSet==='A'?data.scanA:data.scanB).find(e=>e.date===sel);
  const rows = sel ? skyAt(sel) : [];                          // 7 classical bodies (sky-map dots)
  const rows7sel = sel ? skyAt7(sel) : [];                     // 7 classical bodies (reading) — same set
  const occ = sel ? occupiedLetters(rows7sel) : new Set();     // 7 classical bodies (reading) — same set
  const moms = sel ? availableMothers(new Set(rows7sel.map(r=>r.sign))) : new Set(); // geometric mother-gate
  // client-side stellar reading for the selected alignment (no precomputed reading
  // in the JSON — keeps alignments.json lean even with ~10⁴ deep events). Plain const,
  // NOT a hook: a useMemo here would sit after the early returns above and break the
  // Rules of Hooks (first render data=null returns early → next render runs the memo →
  // "more hooks than previous render" crash). readableWords on one day is cheap.
  // "Importance" ranking: proper names (biblical people/places) first, then longest, then
  // lowest gematria — so the top surfaces the notable biblical names that occur on this sky.
  const r = (sel && lex) ? (() => {
    const names = readableWords(occ, lex.lexicon, angelMap, moms);
    const byImp=(a,b)=>((b.name?1:0)-(a.name?1:0))||(b.len-a.len)||(a.gem-b.gem);
    return {
      genesisLegible: genesisReadable(occ, moms),
      occupied: [...occ].sort().join(''),
      readableCount: names.length,
      properNames: names.filter(n=>n.name).length,
      angels: names.filter(n=>n.angel).map(n=>n.he),
      // date-specific: ≥1 zodiac simple → readable BECAUSE of this alignment's sky (changes with date)
      topDate: names.filter(n=>n.simp).sort(byImp).slice(0,8),
      // eternal tier: no zodiac simples (mothers+doubles only) → not time-gated by the turning
      // zodiac, but still bounded by the geometric mother-gate (already applied via `moms` above)
      topAlways: names.filter(n=>!n.simp).sort(byImp).slice(0,8),
    };
  })() : null;

  return <>
    <h2>Alignments — rare century/millennium stellar conjunctions</h2>
    <div className="panel" style={{marginBottom:14,padding:16,lineHeight:1.6}}>
      <p className="muted" style={{marginTop:0,marginBottom:12}}>An offline scan of the 7 classical bodies — Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn — the set the ancients observed and the one this project reads.</p>

      <div style={{marginBottom:12}}>
        <div style={{fontWeight:600,color:'var(--gold)',marginBottom:4}}>Deep chronology · 7 classical bodies</div>
        <p className="muted" style={{margin:0,fontSize:'.9rem'}}>20000 BCE → 2200 CE. Fast at every date and its mean motion is secularly stable, so great-conjunction <i>dates</i> stay trustworthy across the whole range. Beyond ~±4000 y from J2000 the VSOP87 perturbation terms diverge, so exact <i>degrees</i> in the deep past are an extrapolation.</p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:10,marginBottom:12}}>
        <div style={{border:'1px solid var(--line)',borderRadius:8,padding:'8px 10px'}}>
          <span style={{color:'var(--violet)',fontWeight:700}}>maxInSign</span>
          <div className="muted" style={{fontSize:'.82rem',marginTop:2}}>the most planets in a single zodiacal sign that day</div>
        </div>
        <div style={{border:'1px solid var(--line)',borderRadius:8,padding:'8px 10px'}}>
          <span style={{color:'var(--violet)',fontWeight:700}}>span</span>
          <div className="muted" style={{fontSize:'.82rem',marginTop:2}}>the smallest arc (°) containing every body</div>
        </div>
        <div style={{border:'1px solid var(--line)',borderRadius:8,padding:'8px 10px'}}>
          <span style={{color:'var(--violet)',fontWeight:700}}>era</span>
          <div className="muted" style={{fontSize:'.82rem',marginTop:2}}>the precessional era (~{AGE.toFixed(0)} y each, cyclic)</div>
        </div>
      </div>

    </div>

    <div className="fig" style={{maxWidth:760}}>
      <div style={{fontWeight:600,color:'var(--gold)',marginBottom:4}}>The millennia signal — tightest classical grand conjunctions</div>
      <div className="muted" style={{marginBottom:8}}>All 7 classical planets in one zodiacal sign, within the smallest arc found (the 4 tightest, current→past):</div>
      <table>
        <thead><tr><th>Date</th><th>Bodies</th><th>Sign</th><th>Span</th><th>Era</th></tr></thead>
        <tbody>{tight4.map(e=> <tr key={e.date} style={e.date===sel?{background:'rgba(127,176,255,0.10)'}:undefined}>
          <td><button className="linkish" onClick={()=>pick(e.date,'B')}>{displayDate(e.date)}</button></td>
          <td>7 classical</td><td>{e.sign}</td><td className="deg">{e.span}°</td><td>{e.era}</td>
        </tr>)}</tbody>
      </table>
      {tightGap!=null && <div className="note">Tightest pair gap: <b style={{color:'var(--gold)'}}>{tightGap.toFixed(0)} y</b> ≈ <b>{(tightGap/AGE).toFixed(2)}</b> precessional era(s). The two tightest grand conjunctions — {displayDate(tight[0].date)} ({tight[0].span}°, era {tight[0].era}) and {displayDate(tight[1].date)} ({tight[1].span}°, era {tight[1].era}) — are ~{tightGap.toFixed(0)} y apart. The tightest classical alignments (all 7 within a small arc) are the rarest class and recur on a multi-millennium scale; the all-7-in-one-sign events below recur on a centuries scale (avg ~429 y, 51 events in 22000 y).</div>}
    </div>

    {ev && <>
      <h3 ref={mapRef}>Sky map — {displayDate(sel)} <span className="pill" style={{fontSize:'.72rem'}}>7 classical</span></h3>
      <div className="fig" style={{maxWidth:700, margin:'14px auto'}}><SkyMap rows={rows} occ={occ}/></div>
      <div className="muted" style={{marginBottom:8}}>maxInSign <b>{ev.maxInSign}</b> in {ev.sign} · span <b>{ev.span}°</b> · era <b>{ev.era}</b></div>
      {r && <>
        <div className="muted" style={{marginBottom:8}}>Genesis 1:1 legible: <b style={{color:r.genesisLegible?'var(--gold)':'var(--warn)'}}>{r.genesisLegible?'YES':'no'}</b> · readable names: <b>{r.readableCount}</b> · proper names: <b>{r.properNames}</b> · occupied simples: <span className="he" style={{fontSize:'1.15rem',color:'var(--gold)'}}>{r.occupied||'—'}</span></div>
        {r.angels && r.angels.length>0 && <div className="muted" style={{marginBottom:10}}>Shem HaMephorash angel-roots readable: <span className="he">{r.angels.join(' ')}</span></div>}
        {r && (r.topDate.length>0 || r.topAlways.length>0) && <>
          <div className="controls" style={{marginTop:6, marginBottom:4}}>
            <span className="muted" style={{fontSize:'.82rem'}}>top readable names:</span>
            <button className={topView==='date'?'on':''} onClick={()=>setTopView('date')} aria-pressed={topView==='date'}>this sky ({r.topDate.length})</button>
            <button className={topView==='always'?'on':''} onClick={()=>setTopView('always')} aria-pressed={topView==='always'}>eternal tier ({r.topAlways.length})</button>
            {!probs && <span className="muted" style={{fontSize:'.78rem'}}>· computing legibility %…</span>}
            {probs && <span className="muted" style={{fontSize:'.76rem'}}>· % = empirical legibility over {probs.n} days of {probs.year} ({probs.bodies}): <span className="prob ok">green</span>=special/rare · <span className="prob mid">rose</span>=frequent · <span className="prob spec">red</span>=common</span>}
          </div>
          <div className="muted" style={{marginBottom:6,fontSize:'.82rem'}}>{topView==='date'
            ? <>Date-specific — the most important names whose zodiac letters are among <b>this alignment's</b> occupied signs, so the list changes with the alignment. Proper names first, then longest.</>
            : <>Eternal tier — words with no zodiac letters (mothers + doubles only), not bound to the turning zodiac. They are still bounded by the geometric mother-gate: on a single-sign grand conjunction only the one available mother lights, so this list <b>does</b> narrow with the alignment (e.g. <span className="he">ארפכשד</span> Arphaxad, <span className="he">פרמשתא</span> Parmashta, <span className="he">שמאבר</span> Shem-eber). Proper names first, then longest.</>}</div>
          <div className="tcards" style={{gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))'}}>{(topView==='date'?r.topDate:r.topAlways).map((n,i)=>(
            <div key={i} className={'tcard'+(n.simp?'':' always')}>
              <div className="the">{n.disp||n.he}</div>
              <div className="read">{n.translit}</div>
              <div className="trans">{n.gloss}</div>
              <div className="g">{n.len} letters · gematria {n.gem}{n.pal && <span style={{color:'var(--gold)'}}> · palindrome</span>}{n.m37 && <span style={{color:'var(--green)'}}> · ×37</span>}{n.angelName && <span style={{color:'var(--violet)'}}> · angel</span>}</div>
              {(n.person||n.place||n.compound||(nameRefs&&nameRefs[n.he]&&nameRefs[n.he].n>0)) && (
                <div style={{marginTop:4,display:'flex',flexWrap:'wrap',gap:4}}>
                  {n.person && <span className="pill" style={{color:'var(--blue)',borderColor:'var(--blue)'}}>name{n.theo?' (theophoric)':''}</span>}
                  {n.place && <span className="pill" style={{color:'var(--green)',borderColor:'var(--green)'}} title="A biblical PLACE — proper locative noun in Strong (city, mountain, region…)">place</span>}
                  {n.compound && <span className="pill" style={{color:'var(--warn)',borderColor:'var(--warn)'}} title="Concatenated multi-root entry whose gloss is truncated">compound</span>}
                  {nameRefs && nameRefs[n.he] && nameRefs[n.he].n>0 && (()=>{ const r=nameRefs[n.he]; return <span className="pill" style={{color:'var(--violet)',borderColor:'var(--violet)'}} title={'Where this name appears in the Hebrew Bible (Sefaria): '+r.refs.join(', ')}>📖 {r.refs[0]}{r.n>1?' · +'+(r.n-1):''}</span>; })()}
                </div>
              )}
              {probs && probs.map.has(n.he) && (()=>{ const p=probs.map.get(n.he); const pct = p<0.001 ? '<0.1' : (p*100).toFixed(p<0.1?1:0); const cls = p>=0.5 ? 'spec' : p>=0.2 ? 'mid' : 'ok'; const tag = p>=0.5 ? 'common' : p>=0.2 ? 'frequent' : 'special'; return <span className={'prob '+cls} title={`Empirical legibility over ${probs.n} days of ${probs.year} (${probs.bodies}): ${pct}% of days this word's required simples are all occupied (S⊆O, computed from astronomy-engine — not hardcoded). A within-year rate, NOT the recurrence of a specific stellar alignment (which recurs over centuries→millennia, §15c.11). Low % = special/rare (green); high % = common (red).`}>{pct}% · {tag}</span>; })()}
              {n.angelName && <div className="simp" style={{color:'var(--violet)'}}>angel: {n.angelName.en} <span style={{color:'var(--dim)'}}>· {n.angelName.src}</span></div>}
              {n.angel && <div className="simp" style={{color:'var(--violet)'}}>Shem triplet +אל → <span className="he" style={{fontSize:'.95rem'}}>{n.angel.el}</span> · +יה → <span className="he" style={{fontSize:'.95rem'}}>{n.angel.yh}</span></div>}
              <div className="simp">{n.simp ? ('simples: '+[...n.simp].join(' ')) : 'no zodiac sign · eternal tier'}</div>
            </div>
          ))}</div>
        </>}
      </>}
    </>}

    <AlignTable title="Deep chronology — 7 classical bodies, 20000 BCE → 2200 CE (all rare alignments, current→past)" sub={`${deep.length} rare alignments (maxInSign ≥ 5 or span ≤ 60°), sorted newest first. The 7-classical set makes the centuries/millennia scale visible: great conjunctions recur every ~20 y and drift through the signs over the precessional era (~${AGE.toFixed(0)} y).`} items={deep} set="B" sel={sel} pick={pick} openEph={openEph} goReader={goReader}/>

    <AlignTable title="All-7-in-one-sign timeline — every classical grand conjunction (current→past)" sub={`${all7.length} occurrences where all 7 classical bodies share one zodiacal sign — the rarest class, recurring every few centuries (irregular). Click to render that conjunction.`} items={all7} set="B" sel={sel} pick={pick} openEph={openEph} goReader={goReader} showMax={false}/>

    <div className="note">Method: astronomy-engine v2.1.19, GeoVector → Ecliptic.elon, noon UT. Deep scan 3-day step (daily-refined around peaks). Beyond ~±4000 y from J2000 the planetary series are an extrapolation — alignment <i>dates</i> (mean motion, secularly stable) are reliable, exact <i>degrees</i> in the deep past are approximate. Per-event stellar readings are computed in the browser for the selected alignment (skyAt7 is fast).</div>

    <EphemeridesModal eph={eph} onClose={()=>setEph(null)}/>
  </>;
}

export { SarosTab, AyanamsaTab, LunarSolarTab, AlignmentsTab, WeekTab, Heptagram, SarosDiagram, PrecessionDiagram, MetonDiagram };
