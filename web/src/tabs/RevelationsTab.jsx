// tabs/RevelationsTab.jsx — Revelation readings by culture (9 subtabs)
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SIGNS, SIMPLE, LETTER_TO_SIGN, DOUBLES, MOTHERS, BODIES, GLYPH, WEEK, FIN2REG, REG2FIN, SIMPLE_LETTERS, GV, norm, displayHe, gematria, simpleSet, formable, isPalindrome, ANGEL_LEXICON, ANGEL_NAME_MAP, readableWords, daysInMonth, makeDate, parseDate, fmtDate, BODIES7, skyAtSet, skyAt, skyAt7, occupiedLetters, bySign, GENESIS, genesisReadable, GEN_TOTAL, GEN_VALUES, PREC, AGE, FULL, AYANAMSIS, SYN, DRAC, ANOM, TROP, ECLY, HALAKIM_DAY, MOLAD, EQUINOX_LON, ageBoundaries, yrLabel, ERA_WINDOWS, FINALS, letterVal, reduce9, LO_SHU, LO_POS, sigilPath, aiqGroups, siamese, doublyEven, singlyEven, buildMagic, isMagic, KAMEOT, GREEK, isopsephy, ABJAD, ABJAD_NAME, abjad, KTP, katapayadi, countSubset, MON, MONTHNAMES, displayDate } from '../core.jsx';
import { SkyMap, KameaGrid, Fig, DateEntry, YearInput, SubTabs } from '../ui.jsx';
import { PATRIARCHS } from '../data/patriarchs.js';

const PHRASES = [
  ['The sky vanished like a scroll that is rolled up, and every mountain and island was removed','Rev 6:14','The zodiac <b>is the scroll</b>: 12 signs inscribed, rolled along the ecliptic. Echoes Isa 34:4.'],
  ['I am the Alpha and the Omega, the first and the last','Rev 1:8; 22:13','Α and Ω <b>bracket the alphabet</b> — the letters are the frame of creation. Christ names himself as the whole alphabet.'],
  ['A scroll written within and on the back, sealed with seven seals','Rev 5:1','The 7 seals = the <b>7 doubles inscribed &amp; silent</b>; the scroll = the sky. Only the Lamb (= the reader of the letters) can open it.'],
  ['When he opened the seventh seal, there was silence in heaven for about half an hour','Rev 8:1','The <b>7th seal = the Sabbath</b> = the 7th double at rest. Silence = the stop (un-sounded) tongue of the SY.'],
  ['I heard the number of the sealed, 144,000','Rev 7:4','144,000 = <b>12² × 10³</b> = zodiac² × millennium. 12 tribes × 12,000 = the 12 simples squared.'],
  ['Let the one who has understanding calculate the number of the beast… 666','Rev 13:18','666 = <b>6×111 = Σ1..36</b> (the Sun kamea). The 6 falls short of 7 = the material. The only NT verse that <b>commands a gematria</b>.'],
  ['They have as king the angel of the abyss… in Hebrew Abaddon, in Greek Apollyon','Rev 9:11','Named in <b>both</b> systems: Hebrew אבדון = 63 = 7×9; Greek Ἀπολλύων = 1461 = the <b>Sothic (Sirius) cycle</b>. A gematria/isopsephy bridge.'],
  ['A star fallen from heaven… opened the shaft of the abyss','Rev 9:1','A star = a planet = a <b>letter</b> that marks a sign. The Sirius–Sothic link (1461) sits in the same seal-trumpet.'],
  ['The holy city… a cube, its length and breadth and height equal, 12,000 stadia','Rev 21:16','A <b>cube of edge 12</b> = the 12 simples measured in <b>3 dimensions</b> = the 3 mothers. 12³ = 1728.'],
  ['Its wall, 144 cubits','Rev 21:17','144 = <b>12²</b> = zodiac squared. 24 elders + 4 living creatures = 28 = the lunar mansions / abjad.'],
  ['The tree of life, twelve kinds of fruit, yielding its fruit each month','Rev 22:2','Twelve fruits, one per month = the <b>12 simples = the 12 months</b>.'],
  ['A woman clothed with the sun, the moon under her feet, and on her head a crown of twelve stars','Rev 12:1','Sun + Moon + 12 = the SY apparatus: the <b>2 luminaries (doubles) + the 12 simples</b>. The sky-woman wears the whole frame.'],
  ['A great red dragon… seven heads and ten horns','Rev 12:3','Parody of <b>7 / 10 / 3</b>: the 7 doubles, the 10 commandments/planets, the false trinity — a counter-alphabet.'],
  ['The stars fell to the earth as the fig tree sheds its winter fruit','Rev 6:13','The <b>letters/signs falling</b> = the sky dismantled, the scroll unrolled and emptied.'],
  ['I saw a new heaven and a new earth; the first heaven and earth had passed away','Rev 21:1','A <b>new alphabet / new sky</b> = precessional renewal; one era passes, the next is inscribed.'],
  ['Write what you see in a book','Rev 1:11, 19','The explicit command to <b>read the sky as letters and write it down</b> — the hermeneutic of the whole book.'],
];

function RevelationHebrewTab({date, rows, occ, words, genData, genYear}){
  const [inp,setInp]=useState('Ἀπολλύων');
  const verified=[
    ['Ἰησοῦς','Jesus',888,'8×111'],
    ['Χριστός','Christ',1480,''],
    ['Jesus + Christ','',2368,'888+1480'],
    ['','the beast (Rev 13:18)',666,'6×111 = Σ1..36 (Sun kamea)'],
    ['Ἀπολλύων','Apollyon (Rev 9:11)',1461,'Sothic cycle'],
    ['אבדון','Abaddon (Hebrew)',63,'7×9'],
  ];
  const greek = isopsephy(inp);
  const hebrew = /[א-ת]/.test(inp) ? gematria(norm(inp)) : null;
  const nameCount = (words||[]).filter(w=>w.name).length;
  const angelCount = (words||[]).filter(w=>w.angel).length;
  return <>
    <h2>Revelation — the sky as a sealed scroll (§15c) · isopsephy</h2>
    <div className="muted" style={{marginBottom:10}}>A structural reading, not a confessional exegesis. Revelation (c. 95 CE) shares the late-Jewish symbolic cosmos (merkabah + creator-letters + 360/7/12) with the textualised Sefer Yetzirah — they <b>converge without borrowing</b>. Rev 13:18 is the only NT verse that <b>commands a gematria calculation</b>.</div>

    <h3>Sefer Raziel HaMalakh — “calculate to see the generations”</h3>
    <div className="muted" style={{marginBottom:8}}>An older sibling text frames exactly what this app does: <b>compute the planets and the zodiacal signs in their fixed order, and so read the generations from beginning to end</b>. From the Spanish <i>Sefer Raziel HaMalakh</i> (pp. 143–144 of the source PDF, Sepher Hamezeloth — Book Five), one continuous passage that reads like a specification of the Lector Caeli:</div>
    <blockquote style={{borderLeft:'3px solid var(--gold)', margin:'8px 0', paddingLeft:14, color:'var(--txt)'}}>
      <i>“Combine the signs and the wheel. Engrave and compute and assign and number. Consider the reckonings of the planets and the signs of the zodiac. Compute the periods and the turning planets. Of those suspended and the signs of the zodiac in their perpetual order, see with the light. Compute in order to see the generations. Prepare to see them from the beginning to the end.</i><br/><br/>
      <i>It is written: he who acts and creates proclaims the generations from the beginning, before the creation of the universe [Isaiah 41:4]. To understand the actions of each man in righteousness and in wickedness, he decrees upon each one. According to the works, he prepares the works between good and evil.</i><br/><br/>
      <i>Number the planets and the signs of the zodiac, dispersed in the hours. Make manifest between good and evil. All was created by Elohim in wisdom and in understanding, before the raising-up of the universe.</i><br/><br/>
      <i>The wisdom of the Lord is the foundation of the earth [Proverbs 3:19]. Number the planets and the signs of the zodiac of each man. The universe was formed before them. According to the works, man is created to prepare. God does not give the planets and the signs of the zodiac by permission of evil or of good.”</i>
    </blockquote>
    <div className="muted" style={{marginBottom:10}}>— <i>Sefer Raziel HaMalakh</i> (Spanish ed.), pp. 143–144. The passage spans the page break: page 143 ends “…ve”, page 144 begins “con la luz”, and the printed page number “144” is what the text extractor merged into the non-word <i>ve144 con la luz</i>. The text itself says <i>ve con la luz</i> — “see, with the light” — not “144”. (144 = 12² does appear elsewhere in this study, from Meton / Revelation — §15c.4 — but it is <b>not</b> in this Raziel passage; the page-number coincidence is pagination, not an encoded signal.)</div>

    <h3>The Raziel instruction, computed on today's sky</h3>
    <div className="muted" style={{marginBottom:8}}>Each line of the Raziel instruction, mapped to what the apparatus computes live (not asserted):</div>
    <table>
      <thead><tr><th>Raziel instruction</th><th>Computed on {date}</th></tr></thead>
      <tbody>
        <tr><td><i>“Compute the periods and the turning planets”</i></td><td>{(rows||[]).length} bodies, ecliptic longitude → sign. Today: {(rows||[]).map(r=>`${r.body} ${r.deg.toFixed(0)}°→${r.sign}`).join(' · ')}.</td></tr>
        <tr><td><i>“the signs of the zodiac in their perpetual order”</i></td><td>12 signs × 30°, fixed order. Today <b>{(occ||new Set()).size}</b> occupied: <b style={{color:'var(--gold)'}}>{[...(occ||[])].sort().join(' ')||'none'}</b>.</td></tr>
        <tr><td><i>“see with the light”</i></td><td>“See, with the light” — the planets' longitude is the light; the signs they touch are the readable letters. Today <b>{(occ||new Set()).size}</b>/12 signs are lit.</td></tr>
        <tr><td><i>“Compute in order to see the generations”</i></td><td>The Reader enumerates every readable name today: <b style={{color:'var(--gold)'}}>{(words||[]).length}</b> names (the generations <i>now</i>) — incl. <b>{nameCount}</b> proper names and <b>{angelCount}</b> Shem HaMephorash angel-roots (word + suffix <span className="he">אל</span>/<span className="he">יה</span>).</td></tr>
        <tr><td><i>“Prepare to see them from the beginning to the end”</i></td><td>The curated scan spans ~10 millennia (−8267 BCE → 1962 CE): <b style={{color:'var(--gold)'}}>12 dated rare conjunctions</b> across five precessional eras, each enumerating its own readable generations — <b>the patriarchs and the men of the Conquest</b>, <b style={{color:'var(--gold)'}}>{PATRIARCHS.length}</b> distinct biblical persons readable from beginning to end. <a href="/patriarchs" style={{color:'var(--violet)'}}>→ all {PATRIARCHS.length}</a></td></tr>
        <tr><td><i>“he decrees upon each one… between good and evil”</i></td><td>Revelation's judgment: the sky read as a decree on each — the sealed scroll opened (Rev 5–8), the same letters that name the generations now judging them.</td></tr>
      </tbody>
    </table>
    <div className="note" style={{marginBottom:12}}>Verdict: the Raziel instruction is not metaphor. <b>Calculate the planets</b> = astronomy-engine longitudes of the seven classical bodies; <b>the signs in perpetual order</b> = the 12 simples; <b>see the generations from beginning to end</b> = the Reader (today's names) + the curated scan (the readable conjunctions across ten millennia — the patriarchs and men of the Conquest, {PATRIARCHS.length} biblical persons, from the ancestors to those to come). The “names of the ancestors and those to come” are the readable names of any date — past or future — and the apparatus enumerates them.</div>
    <h3>15c.9 · The two registers of the Name — the eternal and the temporal</h3>
    <p className="muted">The reading rule opens a theological contrast the apparatus makes measurable. 3 <i>mothers</i> (aleph, mem, shin — primordial elements, on the fixed circumpolar axis that does not precess) + 7 <i>doubles</i> (bet, gimel, dalet, kaf, pe, resh, tav — the 7 planets, always available) do not depend on the turning zodiac; the 12 <i>simples</i> do. A word of doubles only is <b>always readable</b> — the 7 doubles never close. A word of mothers+doubles is <b>zodiacally unbounded but mother-axis bounded</b>: it needs no occupied sign, yet it reads only when the sky spans the relevant mother-zone(s). On an ordinary scattered sky all three mother-zones are covered, so the whole tier reads; a grand conjunction (all seven bodies in one sign) collapses even it to a single mother — so a word needing two mothers (e.g. <span className="he">אמ</span>, <span className="he">אמת</span>) does <i>not</i> read then. A word of simples is <b>time-gated</b> — readable only when its signs are occupied, i.e. in time.</p>
    <p className="muted">The eternal tier (doubles + the zone-available mothers — fixed axis, never the turning scroll) holds the theological anchors:</p>
    <table>
      <thead><tr><th>Hebrew</th><th>translation</th><th>letters</th><th>gematria</th><th>note</th></tr></thead>
      <tbody>
        <tr><td className="he" style={{fontSize:'1.25rem'}}>ברא</td><td>to create</td><td>2 doubles + 1 mother</td><td>203</td><td className="muted">the act of creation</td></tr>
        <tr><td className="he" style={{fontSize:'1.25rem'}}>אב</td><td>father</td><td>1 mother + 1 double</td><td>3</td><td className="muted">—</td></tr>
        <tr><td className="he" style={{fontSize:'1.25rem'}}>אמ</td><td>mother</td><td>2 mothers</td><td>41</td><td className="muted">—</td></tr>
        <tr><td className="he" style={{fontSize:'1.25rem'}}>שבת</td><td>sabbath (rest)</td><td>1 mother + 2 doubles</td><td>702 = 27×26</td><td className="muted">the whole alphabet × the Name</td></tr>
        <tr><td className="he" style={{fontSize:'1.25rem'}}>אמת</td><td>truth</td><td>2 mothers + 1 double</td><td>441 = 21²</td><td className="muted">the seal of God is Truth</td></tr>
      </tbody>
    </table>
    <ul className="muted">
      <li><b>Truth (אמת) = 441 = 21²</b>, and 21 = C(7,2) = seals + trumpets + bowls (§15c.3). The rabbinic “the seal of the Holy One is Truth (אמת)” is the same 21 that structures the sealed scroll of Revelation — the seal, squared.</li>
      <li><b>Sabbath (שבת) = 702 = 27 × 26</b>: the alphabet with finals (27) × יהוה (26). Rest = the whole language × the Name.</li>
      <li><b>יהוה is built entirely of simples</b> — yod (Virgo), he (Aries), vav (Taurus) — three temporal letters, none eternal. The Name is <i>never</i> always-readable: bound to the turning sky, legible only in its windows (the ~monthly cadence of §11, “the cadence of יהוה”).</li>
    </ul>
    <div className="note" style={{marginBottom:12}}>The sealed scroll of Revelation is the zodiac, and the names divide as the scroll does: the <b>eternal</b> register (mothers+doubles: create, father, mother, sabbath, truth…) — needing no <i>zodiacal</i> opening, bounded only by the fixed mother-axis and never by the turning scroll; the <b>temporal</b> register (the 12 simples: <b>יהוה</b>) — the Name of “who was and is and is to come” (Rev 1:4), readable only when the sky computes it, only when the scroll is opened. Truth is the seal (441 = 21²); the Name is what the seal guards. He who opens the scroll (Rev 5) is he who can calculate the temporal Name — and the eternal tier was never sealed by the zodiac (a grand conjunction can narrow even it to one mother, but the scroll itself never closes it).</div>

    <div className="controls" style={{marginBottom:10}}>
      <input type="text" value={inp} onChange={e=>setInp(e.target.value)} placeholder="Greek (Ἰησοῦς) or Hebrew (אבדון)" style={{flex:'1 1 280px'}}/>
      <span className="pill">{hebrew!=null ? 'Hebrew gematria' : 'Greek isopsephy'}: <b style={{color:'var(--gold)'}}>{hebrew!=null ? hebrew : greek}</b></span>
    </div>
    <table>
      <thead><tr><th>Name</th><th>Reading</th><th>Value</th><th>Notes</th></tr></thead>
      <tbody>
      {verified.map((v,i)=> <tr key={i}>
        <td className="letter-cell">{v[0]? <span className={/[א-ת]/.test(v[0])?'he':'gk'} style={{fontSize:'1.4rem'}}>{v[0]}</span> : ''}</td>
        <td>{v[1]}</td>
        <td className="big" style={{color:'var(--gold)'}}>{v[2]}</td>
        <td className="muted">{v[3]}</td>
      </tr>)}
      </tbody>
    </table>
    <h3>The arithmetic of Revelation → Sefer Yetzirah</h3>
    <ul className="muted">
      <li><b>The 111 family</b>: 666 = 6×111 (the beast, the 6 falling short of 7 = the material); 888 = 8×111 (Christ, the 8 = the eighth day, beyond-7 = resurrection). 666/888 = 3/4. Beast and Christ are the same 111 scaled by 6 and by 8.</li>
      <li><b>Apollyon = 1461 = the Sothic cycle</b>: 1461 vague Egyptian years (= 1460 Julian) is the return period of the heliacal rising of <b>Sirius</b> (the dog star). The 5th seal-trumpet where Apollyon appears is literally about a star falling from heaven and opening the abyss (Rev 9:1). Rev 9:11 gives the name in <b>both</b> systems — Hebrew (Abaddon, 63) and Greek (Apollyon, 1461) — a gematria/isopsephy bridge. <em>1461 is an arithmetic fact; that John meant Sirius is a hypothesis (strong, but not intent).</em></li>
      <li><b>7 seals + 7 trumpets + 7 bowls = 21 = C(7,2)</b> = the distinct pairs among the 7 doubles. + 7 thunders sealed (hidden) = 28 = the 28 lunar mansions / the abjad.</li>
      <li><b>144,000 sealed = 12² × 10³</b> = (zodiac)² × millennium. The New Jerusalem is a <b>cube</b> of edge 12,000 stadia = 3 mothers (3 dimensions) × edge 12 (the simples); 12³ = 1728; wall 144 = 12² cubits; 24 elders + 4 creatures = 28.</li>
      <li><b>Judgment fractions</b> climb in twelfths: ¼ = 3/12 → ⅓ = 4/12 → 1 = 12/12; each heptad raises the fraction by one zodiacal sign.</li>
      <li><b>3½ = the half-heptad</b> = the beast's domain: 1260 days = 3½ × 360 = half of 7 × the degree-circle (theological, not orbital).</li>
      <li>The 7 seals = the 7 doubles <b>inscribed &amp; silent</b>; the 7 trumpets = the same 7 doubles <b>sounded</b> (the shofar) — the “two tongues” (stop/fricative) of the SY. The 7th seal = silence in heaven = the Sabbath = the 7th double at rest.</li>
    </ul>
    <h3>The sky as a sealed scroll — the biblical phrases</h3>
    <div className="muted" style={{marginBottom:8}}>Revelation is one long act of <b>reading the sky as writing</b>: a sealed scroll, letters that sound, stars that fall, a city measured in 12s. Every one of these images maps onto the Sefer Yetzirah frame (3 mothers / 7 doubles / 12 simples). The full list, with reference and its reading in the system:</div>
    <table>
      <thead><tr><th>Phrase</th><th>Ref.</th><th>Reading in the system</th></tr></thead>
      <tbody>
      {PHRASES.map((p,i)=> <tr key={i}>
        <td><i>“{p[0]}”</i></td>
        <td className="deg">{p[1]}</td>
        <td className="muted" dangerouslySetInnerHTML={{__html:p[2]}}/>
      </tr>)}
      </tbody>
    </table>
    <div className="note">Two roots reach further back than Revelation: <i>“The heavens declare the glory of God; day to day pours out speech”</i> (Ps 19:1-2) and <i>“Lift up your eyes on high and see: who created these? He brings out their host by number”</i> (Isa 40:26) — the OT seed of the sky-as-text idea that Revelation dramatizes and the Sefer Yetzirah formalises.</div>
    <Fig n={11} doc="From the article (§15c.1): Rev 6:14 — the zodiacal band (the 12 simples) as a written scroll that rolls up; the stars (the constellation-letters) fall out of their seats. “I am the Alpha and the Omega” = the bounds of the alphabet = the cosmos as text. The Lamb who opens the sealed scroll is the one who can read the sky as a book — the Caeli Reader."/>
    <Fig n={12} doc="From the article (§15c.4): Rev 21 — the New Jerusalem is a cube of edge 12,000 stadia (the 3 mothers = the 3 dimensions × edge 12 = the simples; 12³ = 1728), walled in 144 = 12² cubits, with 12 gates + 12 foundations = 24 (= 12 tribes + 12 apostles). The 144,000 sealed = 12² × 10³ = (zodiac)² × (millennium = 10 sefirot cubed)."/>
    <div className="note">Try: <span className="key click" onClick={()=>setInp('Ἰησοῦς')}>Ἰησοῦς</span> <span className="key click" onClick={()=>setInp('Χριστός')}>Χριστός</span> <span className="key click" onClick={()=>setInp('Ἀπολλύων')}>Ἀπολλύων</span> <span className="key click" onClick={()=>setInp('אבדון')}>אבדון</span></div>
  </>;
}

// ====== Revelations — cross-cultural (subtabs by culture) ======
// Class tags: (a) verifiable astronomy/cycle · (b) eschatological/prophecy · (c) cosmological-doctrine · (u) unverified
const REV_CLS = {'(a)':'var(--green)','(b)':'var(--warn)','(c)':'var(--blue)','(u)':'var(--red)'};
function ClassTag({c}){ const col=REV_CLS[c]||'var(--dim)'; return <span className="pill" style={{color:col,borderColor:col,fontSize:'.68rem',padding:'1px 7px'}}>{c}</span>; }
function SrcList({items}){ return <details style={{marginTop:8}}><summary className="muted" style={{cursor:'pointer'}}>sources ({items.length})</summary><ul className="muted" style={{marginTop:6}}>{items.map((s,i)=><li key={i}><a href={s[1]} target="_blank" rel="noreferrer">{s[0]}</a></li>)}</ul></details>; }
function Section({name, rows}){
  return <>
    <h3>{name}</h3>
    <table>
      <thead><tr><th>Claim</th><th>Number</th><th></th><th>Note</th></tr></thead>
      <tbody>
      {rows.map((r,i)=><tr key={i}>
        <td>{r[0]}</td>
        <td className="big" style={{color:'var(--gold)',whiteSpace:'nowrap'}}>{r[1]}</td>
        <td><ClassTag c={r[2]}/></td>
        <td className="muted">{r[3]}</td>
      </tr>)}
      </tbody>
    </table>
  </>;
}
const REV_SUMMARY = [
  ['7','7 planets / powers / heavens','Hebrew · Gnostic · Sufi · Vedic · Egyptian','(a)'],
  ['12','12 signs / authorities / ages','Hebrew · Gnostic · Sufi · Vedic','(a)'],
  ['28','28 lunar mansions / letters / vertebrae','Sufi · Vedic · Chinese','(a)'],
  ['72','72 nations / languages / Yasna ch. / precessional °','Hebrew · Gnostic · Egyptian · Avestan','(a)/(c)'],
  ['360','360° / 360 powers / 360 veins / spokes / days','Hebrew · Gnostic · Sufi · Egyptian · Vedic','(a)'],
  ['720','720 = 360×2 (year-wheel sons, days + nights)','Vedic (RV 1.164.11)','(a)'],
  ['365','365 days / angels','Hebrew · Gnostic · Egyptian','(a)'],
  ['14','14 luminous/dark · 13+1 voices','Gnostic · Sufi','(c)'],
  ['19','Metonic 19 yr · 19 keepers of Hell','Hebrew · Chinese · Greco-Babylonian · Quran','(a)/(b)'],
  ['22','22 Hebrew letters (Sefer Yetzirah)','Hebrew only — NOT cross-cultural','(c)'],
  ['37 / 73','Gen 1:1 · 73×5=365 civil','Hebrew only — NOT cross-cultural','(c)'],
  ['144 / 144000','(zodiac)² / sealed / Long-Count unit','Hebrew-Christian · Maya','(c)'],
  ['1260 / 42 mo','half-heptad · beast domain','Hebrew-Christian only','(c)'],
];

function RevelationMayaTab(){ return <>
  <h2>Maya — independent 73, 144000, 260</h2>
  <div className="muted" style={{marginBottom:10}}>The Maya calendar corroborates 73, 144, 260 and 365 with no contact with Hebrew or Revelation — the strongest independent witnesses to the system's constants.</div>
  <Section name="Maya astronomy" rows={[
    ['Tzolkin 260-day sacred round','260','(a)','= the Mercury 8×8 kamea constant (§15b.1). 260 = 4×5×13.'],
    ['Haab 365 = 73 × 5','365','(a)','73 pentads of 5 days = the civil solar year (cf. Hebrew 73×5=365, §9.4).'],
    ['Calendar Round = 73 × 260 = 52 × 365','18,980','(a)','73 tzolkin cycles = 52 Haab years. 73 appears twice — pentads and tzolkin-rounds.'],
    ['Baktun = 144,000 days = 400 × 360','144,000','(a)/(c)','144,000 = 144×1000 = 12²×10³ — the Long Count major unit (cf. Rev 7:4 sealed). Independent of Revelation.'],
    ['144 = 12²','144','(c)','the square of the zodiac — Maya and Revelation agree without contact.'],
  ]}/>
  <SrcList items={[['Maya Long Count (Wikipedia)','https://en.wikipedia.org/wiki/Mesoamerican_Long_Count'],['Tzolkin (Wikipedia)','https://en.wikipedia.org/wiki/Tzolk%27in']]}/>
</>; }

function RevelationChineseTab(){ return <>
  <h2>Chinese — independent Meton & 28 mansions</h2>
  <div className="muted" style={{marginBottom:10}}>Chinese astronomy independently recovered the Metonic 19-year cycle and runs a 28-lunar-mansion scheme — convergences with no borrowing.</div>
  <Section name="Chinese astronomy" rows={[
    ['章 zhāng = 19 years = 235 months','19 / 235','(a)','the Metonic cycle, discovered independently in China (§7–8). 19 = 7 doubles + 12 simples in the SY.'],
    ['28 lunar mansions (xiu 宿)','28','(a)','28 stations along the equator — same 28 = T₇ = abjad / Sufi letters.'],
    ['24 solar terms (12 × 2)','24','(a)','12 major + 12 minor solar terms = 12 signs × 2.'],
    ['sexagenary cycle = 12 × 5','60','(a)','12 Earthly Branches × 5 Elements; 60 = 12×5.'],
  ]}/>
  <SrcList items={[['Metonic cycle (Wikipedia)','https://en.wikipedia.org/wiki/Metonic_cycle'],['Chinese lunar mansions (Wikipedia)','https://en.wikipedia.org/wiki/Twenty-Eight_Mansions']]}/>
</>; }

function RevelationVedicTab(){ return <>
  <h2>Indian / Vedic — the year-wheel, 7 metres, 27 nakshatras</h2>
  <div className="muted" style={{marginBottom:10}}>The Ṛg Veda Samhita (c. 1500–1000 BCE) is the oldest text here and carries the system's constants in its own idiom: a <b>12-spoked / 360-spoke year-wheel</b>, <b>720 sons</b>, <b>7 metres</b>, the <b>7 horses of Sūrya</b>, and the <b>27/28 nakshatras</b>. Mined from the Griffith translation (source copies in <code>library/rig-veda/</code>).</div>
  <Section name="Ṛg Veda 1.164 — the riddle of the year-wheel (strongest Vedic overlap)" rows={[
    ['"Twelve are the fellies, and the wheel is single; three are the naves"','12 / 3','(a)','RV 1.164.48 — a wheel of 12 (the months/signs) on 3 (the mothers?), undivided.'],
    ['"therein are set together spokes three hundred and sixty"','360','(a)','RV 1.164.48 — 360 spokes = the degrees/days of the year. The explicit 12×30.'],
    ['"seven hundred Sons and twenty stand, O Agni"','720','(a)','RV 1.164.11 — 720 = 360×2 = days + nights = the full year of the wheel.'],
    ['"with the syllable they form seven metres"','7','(a)','RV 1.164.24 — the 7 chandas (metres) of Vedic verse.'],
    ['"the six twin pairs are called Ṛṣis… the seventh single-born"','6+1','(c)','RV 1.164.15 — 6 paired + 1 alone = the 7, structurally like the 7 doubles (2 tongues / 1 single).'],
    ['"Speech hath been measured out in four divisions"','4','(c)','RV 1.164.45 — 3 hidden + 1 spoken = the 3 mothers + the manifest (cf. the 3 soft + 4 hard of the SY).'],
    ['"Two Birds with fair wings… in the same tree"','2','(c)','RV 1.164.20 — the Self and the soul on the cosmic tree (a pan-Indo-Iranian image).'],
  ]}/>
  <Section name="The 7 chandas (Vedic metres) — the 7 as poetic measure" rows={[
    ['Gāyatrī = 24 syllables','24','(a)','3×8. The simplest metre.'],
    ['Uṣṇih = 28','28','(a)','= the lunar mansions — 28 appears as a metre.'],
    ['Anuṣṭubh = 32','32','(a)','4×8; later the śloka of epic verse.'],
    ['Bṛhatī = 36','36','(a)','4×9.'],
    ['Pankti = 40','40','(a)','5×8.'],
    ['Triṣṭubh = 44','44','(a)','4×11; the dominant metre of the Ṛg Veda.'],
    ['Jagatī = 48','48','(a)','6×8.'],
  ]}/>
  <Section name="Sūrya, the Adityas, the Nasadiya" rows={[
    ['"Seven Bay Steeds harnessed to thy car" — Sūrya','7','(a)','RV 1.50.8 — the 7 horses of the Sun = the 7 days / 7 colours of the spectrum (traditional).'],
    ['"Eight are the Sons of Aditi… with seven she went to meet the Gods; she cast Martanda far away"','8 → 7+1','(a)/(c)','RV 10.72.8–9 — 8 Adityas, 7 + the mortal Martanda (the throwaway = the material), structurally like 8 vs 7.'],
    ['"Darkness was hidden by darkness… that One, breathing without wind, by its own impulse"','1','(c)','RV 10.129 (Nasadiya) — the uncreated One before being/non-being (the cosmogonic seed).'],
  ]}/>
  <Section name="Cosmology — nakshatras, rasis, yugas" rows={[
    ['27 nakshatras × 13°20′ = 360°','27 / 360','(a)','27 lunar mansions (or 28 with Abhijit); 27 = 22 Hebrew + 5 finals, structurally.'],
    ['12 rasis × 30° = 360°','12 / 360','(a)','the 12-sign zodiac, India receiving it from Babylonia/Greece.'],
    ['Kali-yuga = 432,000 years','432,000','(c)','= 72 × 6000; 432 = 72×6 — the yuga base (cf. Berossos’s Chaldean 432,000).'],
  ]}/>
  <div className="note"><b>Not Rig Vedic (flagged):</b> the 12 Adityas and 108 are <i>later</i> Vedic / Puranic, not Ṛg Veda Samhita. 108 = 27 nakshatras × 4 pādas (or 12 × 9) — a later sacred number, not an Ṛg Vedic constant. The Ṛg Vedic set is 7 (metres/horses), 12, 27/28, 360, 720.</div>
  <SrcList items={[
    ['Ṛg Veda 1.164 (Griffith, sacred-texts)','https://www.sacred-texts.com/hin/rigveda/rv01164.htm'],
    ['Ṛg Veda 10.72 Aditi (Griffith)','https://www.sacred-texts.com/hin/rigveda/rv10072.htm'],
    ['Ṛg Veda 1.50 Sūrya (Griffith)','https://www.sacred-texts.com/hin/rigveda/rv01050.htm'],
    ['Nakshatra (Wikipedia)','https://en.wikipedia.org/wiki/Nakshatra'],
    ['Yuga Cycle (Wikipedia)','https://en.wikipedia.org/wiki/Yuga_Cycle'],
  ]}/>
</>; }

function RevelationEgyptianTab(){ return <>
  <h2>Egyptian — 365, 36 decans, Sothis 1461, 72</h2>
  <div className="muted" style={{marginBottom:10}}>Egypt gives the 365-day civil year, the 36 decans (→ the zodiac), the Sothic 1461-year Sirius cycle, and 72 conspirators of Set.</div>
  <Section name="Egyptian astronomy & myth" rows={[
    ['365-day civil year','365','(a)','the Egyptian civil calendar (12×30 + 5 epagomenal); = the 365 angels of the Apocryphon of John.'],
    ['36 decans × 10 = 360 (+5)','36 / 360','(a)','36 ten-day asterisms → the 36 decans that seed the 12-sign zodiac (3 decans/sign).'],
    ['Sothic cycle = 1461 years','1,461','(a)','1461 vague civil years (= 1460 Julian): the heliacal rising of Sirius resets the calendar (cf. Apollyon 1461, §15c).'],
    ['72 conspirators of Set','72','(c)','the 72 accomplices in the murder of Osiris → 72 nations/languages (cf. Shem HaMephorash 72, §15b.5).'],
  ]}/>
  <SrcList items={[['Egyptian calendar (Wikipedia)','https://en.wikipedia.org/wiki/Egyptian_calendar'],['Sothic cycle (Wikipedia)','https://en.wikipedia.org/wiki/Sothic_cycle'],['Decan (Wikipedia)','https://en.wikipedia.org/wiki/Decan']]}/>
</>; }

function RevelationPersianTab(){
  const asrc=[
    ['Yasna 28–34 Ahunavaiti Gatha (avesta.org SBE)','https://www.avesta.org/yasna/y28to34.htm'],
    ['Vendidad (Vendidad) fargard 1 — 16 lands (SBE)','https://www.avesta.org/vendidad/vd1sbe.htm'],
    ['Vendidad fargard 2 — Yima / Vara (SBE)','https://www.avesta.org/vendidad/vd2sbe.htm'],
    ['Vendidad fargard 22 — 99,999 diseases (SBE)','https://www.avesta.org/vendidad/vd22sbe.htm'],
    ['Yasht 13 Farvardin (SBE)','https://www.avesta.org/ka/yt13sbe.htm'],
    ['Zoroastrianism (Encyclopaedia Iranica)','https://www.iranicaonline.org/articles/zoroastrianism'],
    ['Gaffarel, Unheard-of Curiosities (1650 EN, Chilmead) — archive.org','https://archive.org/details/b30333817'],
    ['Gaffarel — EEBO-TCP transcription (Univ. Michigan, CC0)','https://quod.lib.umich.edu/e/eebo2/A85346.0001.001'],
    ['Gaffarel — folding plates (Science History Institute)','https://digital.sciencehistory.org/works/fpj6eec'],
  ];
  return <>
    <h2>Persian / Avestan — 7 Amesha Spentas, 16 lands, 72 Yasna chapters</h2>
    <div className="muted" style={{marginBottom:10}}>The <i>Avesta</i> (the Zoroastrian scripture, Gathas c. 1000 BCE; Young Avestan and Vendidad later) is the Indo-Iranian sibling of the Ṛg Veda and carries the constants in its own frame: the <b>7 Amesha Spentas</b>, <b>16 sacred lands</b>, <b>21 Yashts</b>, <b>72 Yasna chapters</b>, and the striking <b>99,999 diseases</b>. Mined from the SBE translation (source copies in <code>library/avesta/</code>).</div>
    <Section name="The 7 Amesha Spentas — the Bountiful Immortals" rows={[
      ['7 Amesha Spentas (Vohu Manah, Asha Vahishta, Khshathra Vairya, Spenta Armaiti, Haurvatat, Ameterat, + Ahura Mazda)','7','(c)','Yasna 28–34 (Ahunavaiti Gatha): 6 emanations + the Lord = 7; the 7 correspond to the 7 creations (sky, water, earth, plants, animals, metals, fire). The closest Avestan parallel to the 7 doubles.'],
      ['"the seven, who are the lords" / "the seven that have the best rule"','7','(a)','Yasna 39.3 — the 7 named lords of creation.'],
    ]}/>
    <Section name="Vendidad — 16 lands, Yima, 99,999 diseases" rows={[
      ['16 sacred lands created by Ahura Mazda (Vendidad 1)','16','(a)','vd1: 16 ideal lands, each with a paired evil-counterpart. 16 = 4² (cf. the 4 mothers×4, or the doubled 8).'],
      ['Yima\'s Vara — a three-storied enclosure for the seed','3 / 9','(c)','vd2: Yima/Khshaeta builds a refuge against the winter. The three rows (three, six, ninefold) echo 3×3.'],
      ['99,999 diseases (Vendidad 22)','99,999','(c)','vd22: 99,999 diseases and 99,999 cures — the most striking Avestan large number; cf. the limitless legions of Revelation.'],
    ]}/>
    <Section name="Structure — Yasna, Yashts" rows={[
      ['Yasna = 72 chapters','72','(a)','the Yasna liturgy (including the Gathas) runs to 72 chapters = the same 72 as the nations/languages/angels.'],
      ['21 Yashts (hymns to the yazatas)','21','(a)','21 = C(7,2) = the seals/trumpets/bowls (§15c.3); the Yashts honor the 21 divine entities.'],
      ['72+5 = 77 "good names" of Ahura Mazda (tradition)','77','(c)','later tradition: 72 + 5 = 77 names; 72 recurs.'],
    ]}/>
    <Section name="Cosmology" rows={[
      ['12 × 30 = 360° zodiac (received from Babylonia)','12 / 360','(a)','the 12-sign frame shared across Persia, India, Greece, and the Hebrew SY.'],
      ['Haoma = the plant of immortality','—','(c)','the Indo-Iranian soma/haoma — the Vedic Soma (RV 9) and the Avestan Haoma are the same rite.'],
    ]}/>
    <Section name="Gaffarel (1629/1650) — the Persian talismanic reading of the stars" rows={[
      ['Stars ranged in the heavens in the form of Hebrew letters','22','(b)','Part IV ch. XIII: the "celestiall writing" is in Hebrew characters (not Arabick/Samaritan); the heavens are a book (Isa 34:4, "rolled together… Because they are a Booke") = the same sky-as-βιβλίον as Rev 6:14. Source text in library/gaffarel/.'],
      ['Reading instrument = the 3 Cabala: Gematria / Notaricon / Temurah','3','(c)','to read the celestial word: Gematria (number↔event), Notaricon (letter=initial of a word), Temurah (anagram). The same operations the Reader uses to turn a sky-config into a name+number (§6, §15b).'],
      ['Rabbi Chomer — nations read in the stars by Gematria','—','(u)','חרב/Charab "desolate" over Greece = יון/Javan (Gen 10); נתק/Nataq=505 = the years of the Jewish kingdom (Saul→Zedekiah); כעה/Caah=1025 over Turkey. The celestial word names the nation and its fate by number — attested tradition, not reproduced here.'],
      ['A new star rewrites the word (AKE→LAKE→ARKE)','—','(c)','a new star/comet adds a letter and changes the reading — the dynamical core the Lector Caeli replaces with celestial mechanics: a planet entering a sign rewrites the sky-sentence.'],
      ['Persian talismanic sculpture (Part II) — images under constellations','—','(c)','figures cast "under certain Constellations" = the operative counterpart; Part IV reads the configuration itself as the Hebrew letter-word. Persian (Part II) + Hebrew (Part IV) converge with Rev\'s sealed-book sky (§15c.1, §15c.10).'],
    ]}/>
    <div className="note"><b>Boundary respected:</b> the Gathas (Yasna 28–54, the oldest stratum, attributed to Zarathushtra) are kept distinct from the later Young Avestan / Vendidad material. The 7 Amesha Spentas are Gathic; the 99,999 and the 16 lands are Vendidad (later).</div>
    <SrcList items={asrc}/>
  </>;
}

function RevelationSufiTab(){
  const sufiSrc=[
    ['Ramlan & Ludovico (2023), Religions','https://doi.org/10.3390/rel14060692'],
    ['Rašić (2023), J. Sufi Studies','https://doi.org/10.1163/22105956-bja10029'],
    ['Chodkiewicz, Futuhat & its Commentators','https://ibnarabisociety.org/the-futuhat-makkiyya-and-its-commentators-michel-chodkiewicz/'],
    ['Morris, Ibn Arabi on the Barzakh','https://ibnarabisociety.org/wp-content/uploads/PDFs/Morris_Ibn-Arabi-on-the-barzakh.pdf'],
    ['SEP — Ikhwan al-Safa','https://plato.stanford.edu/entries/ikhwan-al-safa/'],
    ['De Callataÿ, Ikhwan on Animals (2022)','https://doi.org/10.5617/jais.9879'],
    ['Varisco, al-Buni Lunar Stations (Arabica 2017)','https://brill.com/view/journals/arab/64/3-4/article-p487_487.xml'],
    ['Gardiner, Forbidden Knowledge? al-Buni (JAIS 2012)','https://journals.uio.no/JAIS/article/view/4618'],
    ['Usluer, Hurufi Cosmology (2024)','https://dergipark.org.tr/en/download/article-file/3630967'],
    ['Iranica — Hurufism','https://www.iranicaonline.org/articles/horufism/'],
    ['Hadith 73 sects (Abu Dawud 4596)','https://en.tohed.com/hadith/abu-dawud/4596/'],
    ['Hadith 72 branches (Bukhari 9)','https://sunnah.com/bukhari:9'],
    ['Hadith 70,000 tawakkul (Bukhari 6233)','https://livingnoor.com/quran/hadiths/sahih-al-bukhari/6233'],
  ];
  return <>
    <h2>Islamic / Sufi — 28 letters = 28 mansions, Hurufi 360 = 6×(28+32)</h2>
    <div className="muted" style={{marginBottom:10}}>The Arabic letter-science ('ilm al-huruf) is the closest non-Hebrew sibling of the Sefer Yetzirah: <b>28 letters = 28 lunar mansions</b> recurs in Ibn al-Arabi, the Ikhwan al-Safa, the received <i>Shams al-ma'arif</i>, and the Hurufiyya. The Hurufi equation <b>360° = 6 × (28 + 32)</b> directly welds the astronomical circle to the Arabic/Persian letter-counts. The Quran itself carries the constants in its own text (Pickthall translation, source copies in <code>library/quran/</code>).</div>
    <Section name="The Quran — in the text (Pickthall)" rows={[
      ['"seven heavens, and of the earth the like thereof"','7 + 7','(c)','65:12 — 7 heavens + 7 earths; cf. 67:3 "seven heavens in harmony (tibāqan)", 71:15.'],
      ['"the number of the months with Allah is twelve months"','12','(c)','9:36 — 12 lunar months, 4 sacred; 9:37 condemns nasīʾ (intercalation) → the strict lunar calendar.'],
      ['"for the moon We have appointed mansions (manāzil)"','28','(a)/(c)','36:39 — the WORD manāzil is in the text; the COUNT 28 is from Arabic astronomy, not the verse. (53:1 "an-najm" = Pleiades/Venus in tafsir, NOT the 28 mansions.)'],
      ['"Above it are nineteen"','19','(b)','74:30 — 19 keepers over Hell; the only explicit 19 in the Quran (Islamic-distinctive, cf. Metonic 19 elsewhere).'],
      ['"seven of the oft-repeated (al-mathānī) and the great Quran"','7','(c)','15:87 — "seven oft-repeated"; identification with al-Fātiha\'s 7 verses is traditional tafsir, not the text.'],
      ['"the sun and the moon [move] by calculation (ḥisbān)"','—','(a)','55:5; cf. 6:96, 10:5 — reckoning; 36:40 "each floats in an orbit."'],
    ]}/>
    <Section name="Not in the Quran text (flagged)" rows={[
      ['360 — NOT a Quran verse','—','(u)','360 appears only in tafsir (al-Tabari: 360 sunrises) and hadith (360 joints/idols); the lunar year is 354. A Late-Antique symbolic number absorbed into cosmology.'],
      ['99 Names — hadith, not text','99','(b)/(u)','Sahih Muslim 2675 states only the NUMBER 99; the LISTS (Tirmidhi 3507 etc.) are graded gharib/mudraj and differ between collections.'],
      ['73 sects — hadith','73','(b)','Abu Dawud 4596 (Hasan Sahih) = "73 sects"; the "72 in Hell, 1 saved" addition (4597) is weak/fabricated (al-Shawkani: fabrication). 72≠73 — do not conflate.'],
      ['Bismillah abjad = 786','786','(c)','بسم الله الرحمن الرحيم = 2+60+40+66+329+289 = 786 (19 letters). Verifiable arithmetic; the use of "786" for Bismillah is tradition, not Quran text.'],
      ['114 suras / 6236 verses','114 / 6236','(c)','structural only, NOT cosmic.'],
    ]}/>
    <Section name="Ibn al-Arabi (1165–1240) — Futuhat al-Makkiyya" rows={[
      ['28 Arabic letters = 28 lunar mansions','28','(c)','each letter ↔ a mansion ↔ a lunar phase (Futuhat ch. 198, Vol II 390–478; not "ch. 2" — the locus is ch. 198).'],
      ['29th letter (lam-alif) = the qutb','29','(c)','"If not for that twenty-ninth, the 28 would not be stabilized" — the cosmic pole.'],
      ['14 luminous (undotted) ↔ 14 waxing; 14 dark ↔ 14 waning','14+14','(c)','14th letter ra (= full moon / badr); 28th (waw) = darkest phase.'],
      ['7 heavens; Sun at the heart of the 7','7','(a)/(c)','Futuhat Ch. 371; earth spherical and rotating.'],
      ['114 abode-chapters ↔ 114 Quran suras','114','(c)','114 = 6×19; the Futuhat mirrors the Quran in reverse.'],
    ]}/>
    <Section name="Ikhwan al-Safa (Brethren of Purity, 10th c. Basra)" rows={[
      ['7 planets; 12 signs = 12 world-ages','7 / 12','(a)','12 ages of decreasing length; Adam created in the 7th age (Virgo).'],
      ['28 lunar mansions = 28 vertebrae of the spine','28','(a)/(c)','Epistle 22: "every organ agrees in number with some category of existent beings."'],
      ['360 veins in the body ↔ 360° of the zodiac','360','(c)','alongside 12 orifices and 28 vertebrae (Epistle 22).'],
      ['36,000-year precession; 360,000-year great cycle','36k / 360k','(b)','Epistle 36: equinoctial precession → geological interchange; "Annus Platonicus."'],
    ]}/>
    <Section name="al-Buni (d. ca. 1225) — received Shams al-ma'arif al-kubra" rows={[
      ['28 mansions ↔ 28 letters (14 undotted / 14 dotted)','28','(c)','14 luminous → 14 visible mansions (benefic); 14 dark → 14 hidden (malefic).'],
      ['abjad 1…1000 builds magic squares (awfaq)','—','(c)','squares tied to divine names, planets, intentions.'],
      ['12 signs ↔ 12 letters of "La ilaha illa Allah"','12','(c)','integrating mansions, 7 planets, and divine unity.'],
      ['AUTHORSHIP CAVEAT','—','(u)','the famous Shams al-kubra is a pseudepigraphic Ottoman compilation (Gardiner/Coulon), not by al-Buni himself. Cite as "received Shams al-kubra."'],
    ]}/>
    <Section name="Hurufiyya — Fazlallah Astarabadi (d. 1394)" rows={[
      ['28 letters = 28 mansions = 28 lines on the face','28','(c)','the lettrist incarnation: letters/mansions substantively present in the human form.'],
      ['360° = 6 × (28 + 32)','360','(c)','six directions × (28 Arabic + 32 Persian letters) — fuses the astronomical circle to the letter-counts (Usluer 2024).'],
      ['32 Persian letters = 32 pre-eternal words taught to Adam','32','(c)','28 Arabic (to Muhammad) vs 32 Persian (to Adam); 32 human teeth confirm physiologically.'],
      ['khatt al-istiwā divides the zodiac into 14 + 14','14+14','(c)','14 maternal/visible + 14 paternal/hidden.'],
    ]}/>
    <Section name="The 72 / 73 / 70,000 hadiths (do not conflate)" rows={[
      ['73 sects (al-iftiraq)','73','(b)','core = Hasan/Sahih; the "72 in Hell, 1 saved" addition is only in weaker chains.'],
      ['72 branches of faith','72','(c)','scholastic derivation from the sahih "over seventy branches" hadith — the exact 72 is later, not in the sahih text.'],
      ['70,000 enter Paradise without account','70,000','(b)','a separate tawakkul hadith (Bukhari); not the sects, not the branches.'],
    ]}/>
    <div className="note"><b>Not found in pre-1500 Sufi sources:</b> 19, 22, 37, 144, 144000, 1260, 42 months, and a direct 365 — these are Hebrew/Sefer Yetzirah or Revelation constants, absent from the Arabic-Islamic corpus. Their absence is itself a finding.</div>
    <SrcList items={sufiSrc}/>
  </>;
}

function RevelationGnosticTab(){
  const gsrc=[
    ['Apocalypse of Adam (text)','https://earlychristianwritings.com/text/adam.html'],
    ['Apocryphon of John (Wisse)','https://pseudepigrapha.com/apocrypha_nt/apocjn.html'],
    ['On the Origin of the World (text)','https://earlychristianwritings.com/text/originworld.html'],
    ['Eugnostos the Blessed (text)','https://earlychristianwritings.com/text/eugnostos.html'],
    ['Concept of Our Great Power (text)','http://earlychristianwritings.com/text/greatpower.html'],
    ['Pleše, Fate/Astrology in Gnosticism (2007)','https://www.scribd.com/document/382360129/Fate-Providence-and-Astrology-in-Gnosticism-1-The-Apocryphon-of-John-Zlatko-Plese-pdf'],
  ];
  return <>
    <h2>Gnostic / Nag Hammadi — 365 angels, 72 languages, the 12→72→360 cascade</h2>
    <div className="muted" style={{marginBottom:10}}>The Nag Hammadi library (Coptic Gnostic codices, copies of 1st–3rd-c. originals) carries the cleanest astronomical overlaps: <b>365 angels</b> (Apocryphon of John) = the solar year; <b>72 gods = 72 languages</b> (Origin of the World); the <b>12 → 72 → 360</b> cascade (Eugnostos) mirroring 12 months / 360 days. The Apocalypse of Adam supplies the eschatological register (12 / 13 / 14 kingdoms).</div>
    <Section name="Apocalypse of Adam (NHC V,5) — eschatological register" rows={[
      ['Adam reveals to Seth "in the 700th year"','700','(c)','testamentary frame echoing Genesis 5; no explicit star/planet references.'],
      ['seed of Ham & Japheth establish 12 kingdoms','12','(b)','12 false mythic origins.'],
      ['13 kingdoms each give a false oracle of the Illuminator\'s birth','13','(c)','explicitly numbered 1st–13th; each gives a false cosmogony (a spirit, a prophet, a virgin womb, a drop from heaven, a cloud, the nine Muses, two illuminators…).'],
      ['13th kingdom: "every birth of their ruler is a word"','13 / word','(b)/(c)','the 13th oracle — the messiah\'s birth <b>is</b> a word, and "this word received a mandate… glory and power." <b>Not</b> "born of a word alone" (a common misreading) — the text says the ruler\'s every birth <i>is</i> a word. The closest the NH comes to the creator-word / Sefer Yetzirah letter-theology.'],
      ['14th voice — "the generation without a king"','14','(c)','the kingless generation alone says the truth: "God chose him from all the aeons." 13 false + 1 true = 14 voices (structural 14, not Matthew 1:17).'],
      ['Illuminator "will for a third time pass by"','3','(b)','eschatological prophecy of the Phōtēr.'],
      ['400,000 join the seed of Seth','400,000','(b)','eschatological number.'],
    ]}/>
    <Section name="Apocryphon of John (NHC II,1)" rows={[
      ['365 angels fashion Adam\'s body','365','(a)','= days of the solar year — the single strongest astronomical overlap in NH.'],
      ['7 powers = "the sevenness of the week"','7','(a)','7 planets / 7 weekdays.'],
      ['12 authorities; 7 kings + 5 = 12','12','(a)','12 zodiac / months.'],
      ['4 lights preside over 12 aeons','4 / 12','(c)','4 lights × 3 aeons each.'],
      ['72 pentads underlying the melothesia','72','(u)','Pleše reconstruction of the Egyptian 72×5-day periods; NOT explicit in the text.'],
    ]}/>
    <Section name="On the Origin of the World (NHC II,5)" rows={[
      ['7 heavens of chaos','7','(a)','7 planets.'],
      ['12 gods of chaos (the zodiac)','12','(a)','"above the twelve gods of chaos."'],
      ['64 forms (8 shapes × 4 corners) + 7 archangels + Sabaoth = 72','64 / 72','(c)','the strongest 72 overlap: 72 gods rule the 72 languages of the peoples (cf. Deut 32:8 LXX).'],
      ['49 demons (7 offspring × 7)','49','(c)','7×7.'],
      ['930 years of Adam; luminaries for "signs, seasons, years, months, days"','930','(c)','echoes Genesis 5:5; the luminaries mark time.'],
    ]}/>
    <Section name="Eugnostos the Blessed (NHC III,3 / V,1)" rows={[
      ['12 → 72 → 360 cascade','12/72/360','(c)','12 powers → 72 powers (12 pairs) → 360 powers (72 × 5); mirrored by 12 months / 360 days.'],
      ['12 aeons · 72 heavens (12×6) · 360 firmaments (72×5)','12/72/360','(c)','the cleanest numerical cascade in the corpus — maps directly onto the project.'],
      ['360 days of the year = type of the 360 powers','360','(a)','Egyptian 360-day civil calendar (NOT 365).'],
      ['8 = the Ogdoad','8','(c)','the Assembly of the Eighth.'],
    ]}/>
    <Section name="Concept of Our Great Power (NHC VI,4)" rows={[
      ['120 appears 3× (age-limit, Noah\'s preaching, "the perfect number")','120','(c)'],
      ['final conflagration after 1,460 years','1,460','(b)','Wisse translation (some cite 1,468 — UNVERIFIED discrepancy).'],
      ['72 tongues','72','(c)'],
    ]}/>
    <div className="note"><b>Not found in Nag Hammadi:</b> 144, 144000, 1260, 42 months, 19, 22, 28, 37, 73 — these belong to Revelation / Hebrew / Sufi, not the Gnostic corpus.</div>
    <SrcList items={gsrc}/>
  </>;
}

function RevelationRazielTab(){
  const rsrc=[
    ['Sefer Raziel HaMalakh — Spanish ed. (322pp, source PDF)','pdf/razielbook.pdf'],
    ['Sefer Raziel HaMalakh — Hebrew ed. (90pp, source PDF)','pdf/raziel-hebrew.pdf'],
  ];
  return <>
    <h2>Sefer Raziel HaMalakh — the indisputable findings (§9.6)</h2>
    <div className="muted" style={{marginBottom:10}}>The <i>Sefer Raziel HaMalakh</i> (Book of the Angel Raziel) is the older sibling of the <i>Sefer Yetzirah</i> in this register: a late-antique / early-medieval manual of letter-astronomy that tells the reader to <b>compute the planets and the fixed zodiacal signs to read the generations</b>. Mined 2026-08-10 from the two source PDFs in <code>pdf/</code> — the Spanish <i>Sepher Raziel Hamelach</i> (322pp, clean text) and the Hebrew edition (90pp, OCR-garbled but cross-confirming). Page refs = Spanish PDF. Only findings verified against the text are listed; loose coincidences are flagged at the end.</div>

    <Section name="1 · Alphabet ↔ astronomy (the core thesis — strongest validation)" rows={[
      ['22-letter gematria explicit, א=1 … ת=400, NO 500–900 finals','22','(a)','p.95: "Aleph es 1, Beth es 2 … Qoph 100, Resh 200, Shin 300, Tau 400." = the SAME ancient system this app uses (not Mispar Gadol).'],
      ['Triangular numbers T(2..9) by letter','T(n)','(a)','p.95: אב→3, ג→6, ד→10, ה→15, ו→21, ז(Zayin,7)→28, ח(8)→36, ט(9)→45. Confirms T(7)=28 = lunar mansions and gives the full series.'],
      ['12 simples ↔ 12 hours day + 12 night, 12 months, 12 signs, 12 tribes','12','(a)','p.106 — the explicit 12-simples↔12-signs mapping this app reads.'],
      ['22 letters in 3 palaces, engraved with each sign','22 / 3','(c)','p.226 — 22↔signs via 3 palaces (= the 3 mothers).'],
      ['3 letters (the mothers) ↔ 12 signs','3 / 12','(c)','p.81.'],
      ['Raziel cites the Sefer Yetzirah directly','—','(a)','Heb p.24: "as written in Sefer Yetzirah: ten sefirot…" — Raziel is built on the SY.'],
    ]}/>
    <h3>1b · The triangular series T(2..9) — the lunar-mansion key</h3>
    <table style={{marginBottom:6}}>
      <thead><tr><th>Letter</th><th>n</th><th>T(n) = n(n+1)/2</th><th>astronomy</th></tr></thead>
      <tbody>
        {[['א',1,1,'unity'],['ב',2,3,'—'],['ג',3,6,'—'],['ד',4,10,'—'],['ה',5,15,'—'],['ו',6,21,'—'],['ז',7,28,'28 lunar mansions'],['ח',8,36,'—'],['ט',9,45,'—']].map(r=>(
          <tr key={r[0]}><td className="he" style={{fontSize:'1.2rem',color:'var(--gold)'}}>{r[0]}</td><td className="deg">{r[1]}</td><td className="deg" style={{color:'var(--gold)'}}>{r[2]}</td><td className="muted">{r[3]}</td></tr>
        ))}
      </tbody>
    </table>
    <div className="note" style={{marginBottom:12}}>Zayin (ז=7) → T(7)=28 = the 28 lunar mansions (Manzil), tying the 7 doubles to the Moon's path — the same 28 the Saros mnemonic panel uses.</div>

    <Section name="2 · The 72 / 73 / 28 / 248+365" rows={[
      ['72 names derived from Genesis 1:1 (Bereshit → Bohu)','72','(a)','= the Shem HaMephorash triplets (והו/ילי/סיט…). Variant of the Exodus-14:19-21 extraction this app uses; Raziel is Genesis-centric like the project.'],
      ['72 letters from patriarchs + 12 tribes + Sabbatai + Yesheron','72','(c)','Abraham…Benjamin.'],
      ['73 names of God inscribed on the right','73','(c)','p.72; Heb p.24 "ע״ג שמות" = 73 names — attests 73 (= 2701 = 37×73).'],
      ['28 Malachim per lunar month (Tammuz & Adar = 28)','28','(a)','p.148 — 28 = lunar mansions tied to the Hebrew months.'],
      ['248 mighty [limbs] + 365 degrees = 613','248+365','(a)','the 613 structure (248 positive + 365 negative commandments); 365 = degrees/days.'],
    ]}/>

    <Section name="3 · Astronomy scaffold" rows={[
      ['360° → 12 signs (Aries…Pisces), each 30°','360 / 12','(a)','p.146-147 — base-60 sexagesimal subdivision chain (60×60×60…).'],
      ['"The signs of the zodiac are fixed" — the signs are FIXED','fixed','(a)','p.115 — tropical (equinox-anchored), non-precessing grid. Directly supports this app\'s tropical-vs-sidereal split: the Reader\'s 12 sectors do NOT rotate with precession (see Sky tab note).'],
      ['4 tekufot (Nisan/Tammuz/Tishri/Tevet), each 3 months = 12','4 / 12','(a)','p.114; Heb p.10 lists all 12 signs across 4 tekufot with month-angels. Sun qualities: warm / hot-dry / cold-moist / cold-dry.'],
      ['7 planets in Chaldean order','7','(a)','p.114-115 — שבתאי/צדק/מאדים/שמש/נוגה/כוכב/לבנה.'],
      ['Planet periods: Saturn 30y, Jupiter 12y','30 / 12','(a)','Both match real sidereal periods (29.46 / 11.86 yr). 28-year & 36-year cycles also present (see caveat).'],
      ['Draqon Dinor (the dragon) surrounding the 7 planets','Draco','(a)','p.146 — the Draco axis = this app\'s 3rd mother (Shin · Cassiopea axis / circumpolar).'],
      ['Planet-angel assignments','7','(c)','Saturn=Gabriel, Jupiter=Tzedeqial, Mars=Samael, Sun=Raphael, Venus=Anael, Mercury=Beraqial, Moon=Chesedial; Michael = force in the Sun.'],
    ]}/>

    <h3>4 · Loose — do not force</h3>
    <ul className="muted">
      <li><b>7×70 = 490</b> (p.71). An arithmetic-mnemonic figure; <b>not</b> tied to any astronomical window in this app — flagged, not claimed.</li>
      <li><b>"23 princes of the signs"</b> (p.147) — unclear; does not map to any app constant. Left unmapped.</li>
      <li><b>The 28-year cycle</b> the Spanish PDF attributes to Venus is likely a garbled tekufat-chamah (the 28-year solar cycle), since real Venus sidereal = 225 days. Needs clean Hebrew verification before any claim.</li>
    </ul>
    <div className="note"><b>Why this matters:</b> Raziel independently attests the apparatus this app is built on — the 22-letter gematria, the triangular-to-28 lunar key, the 12↔signs mapping, the fixed tropical zodiac, the 72-from-Genesis, the 7 Chaldean planets, and the Draco axis — in a text that explicitly instructs the reader to <i>calculate</i> them. That is corroboration of the <i>method</i>, not a prediction.</div>
    <SrcList items={rsrc}/>
  </>;
}

function RevelationsTab({sub, setSubTab, date, rows, occ, words, genData, genYear}){
  const subtabs=[['hebrew','Hebrew · Christian'],['raziel','Raziel'],['gnostic','Gnostic / Nag Hammadi'],['vedic','Indian / Vedic'],['persian','Persian / Avestan'],['sufi','Islamic / Sufi'],['egyptian','Egyptian'],['maya','Maya'],['chinese','Chinese']];
  return <>
    <h2>Revelations — the constants across all cultures (§15c, §9.6)</h2>
    <div className="muted" style={{marginBottom:10}}>Revelation = the cross-cultural register: every tradition that independently carries the system's constants (gematria, prophecies, cosmology). No cultural borrowing is claimed — only independent corroboration. Class tags: <ClassTag c="(a)"/> verifiable astronomy · <ClassTag c="(b)"/> eschatological/prophecy · <ClassTag c="(c)"/> cosmological-doctrine · <ClassTag c="(u)"/> unverified.</div>
    <h3>Cross-cultural numeric summary — project constants vs. the corpora</h3>
    <table style={{marginBottom:6}}>
      <thead><tr><th>Constant</th><th>Meaning</th><th>Where attested</th><th></th></tr></thead>
      <tbody>
      {REV_SUMMARY.map((r,i)=><tr key={i}>
        <td className="big" style={{color:'var(--gold)',whiteSpace:'nowrap'}}>{r[0]}</td>
        <td>{r[1]}</td>
        <td className="muted">{r[2]}</td>
        <td><ClassTag c={r[3]}/></td>
      </tr>)}
      </tbody>
    </table>
    <div className="note" style={{marginBottom:12}}><b>Load-bearing for accuracy:</b> 22, 37, 73, 144, 1260, 42 months are NOT securely attested in either Nag Hammadi or pre-1500 Sufi sources — they are Hebrew/Sefer Yetzirah (22) or Revelation (144, 1260, 42) constants. The citable cross-cultural overlaps concentrate on <b>7, 12, 28, 72, 360, 365, 14</b>.</div>
    <SubTabs items={subtabs} active={sub} onChange={setSubTab}/>
    {sub==='hebrew' && <RevelationHebrewTab date={date} rows={rows} occ={occ} words={words} genData={genData} genYear={genYear}/>}
    {sub==='raziel' && <RevelationRazielTab/>}
    {sub==='maya' && <RevelationMayaTab/>}
    {sub==='chinese' && <RevelationChineseTab/>}
    {sub==='vedic' && <RevelationVedicTab/>}
    {sub==='sufi' && <RevelationSufiTab/>}
    {sub==='egyptian' && <RevelationEgyptianTab/>}
    {sub==='gnostic' && <RevelationGnosticTab/>}
    {sub==='persian' && <RevelationPersianTab/>}
  </>;
}

export { RevelationsTab };
