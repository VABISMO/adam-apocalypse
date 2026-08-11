// tabs/GematriaTab.jsx — gematria by culture (5 subtabs)
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SIGNS, SIMPLE, LETTER_TO_SIGN, DOUBLES, MOTHERS, BODIES, GLYPH, WEEK, FIN2REG, REG2FIN, SIMPLE_LETTERS, GV, norm, displayHe, gematria, simpleSet, formable, isPalindrome, ANGEL_LEXICON, ANGEL_NAME_MAP, readableWords, daysInMonth, makeDate, parseDate, fmtDate, BODIES7, skyAtSet, skyAt, skyAt7, occupiedLetters, bySign, GENESIS, genesisReadable, GEN_TOTAL, GEN_VALUES, PREC, AGE, FULL, AYANAMSIS, SYN, DRAC, ANOM, TROP, ECLY, HALAKIM_DAY, MOLAD, EQUINOX_LON, ageBoundaries, yrLabel, ERA_WINDOWS, FINALS, letterVal, reduce9, LO_SHU, LO_POS, sigilPath, aiqGroups, siamese, doublyEven, singlyEven, buildMagic, isMagic, KAMEOT, GREEK, isopsephy, ABJAD, ABJAD_NAME, abjad, KTP, katapayadi, countSubset, MON, MONTHNAMES, displayDate } from '../core.jsx';
import { SkyMap, KameaGrid, Fig, DateEntry, YearInput, SubTabs } from '../ui.jsx';

function GematriaTab(){
  const [gSub,setGSub]=useState('hebrew');
  const subs=[['hebrew','Hebrew'],['greek','Greek'],['arabic','Arabic'],['indian','Indian'],['more','More']];
  return <>
    <h2>Gematria — letter-number systems across cultures (§2, §15b.2)</h2>
    <div className="muted" style={{marginBottom:10}}>Every culture with a written alphabet developed a letter→number system. The additive isopsephies (Hebrew, Greek, Arabic, Coptic, Cyrillic) share one structure — units 1–9, tens 10–90, hundreds 100–900/1000 — because all descend from the Phoenician/Greek scheme. India is different: the katapayadi is <b>positional</b> (right-to-left) and the Āryabhaṭa is consonant×vowel-power. Pre-1500 systems only; post-1500 constructions are flagged.</div>
    <SubTabs items={subs} active={gSub} onChange={setGSub}/>
    {gSub==='hebrew' && <GematriaHebrew/>}
    {gSub==='greek'  && <GematriaGreek/>}
    {gSub==='arabic' && <GematriaArabic/>}
    {gSub==='indian' && <GematriaIndian/>}
    {gSub==='more'   && <GematriaMore/>}
  </>;
}

function GematriaHebrew(){
  const [inp,setInp]=useState('משיח');
  const [big,setBig]=useState(false); // Mispar Gadol toggle
  const c=norm(inp);
  // Mispar Gadol: final letters (ך ם ן ף ץ) count 500–900; Hechrachi (default): they count as their base letter.
  const BIG_GV={'ך':500,'ם':600,'ן':700,'ף':800,'ץ':900};
  const isLetter=(ch)=>!!GV[FIN2REG[ch]||ch];
  const letters=[...inp].filter(isLetter);
  const val=(ch)=> big && BIG_GV[ch]!==undefined ? BIG_GV[ch] : letterVal(ch);
  const total=letters.reduce((a,ch)=>a+val(ch),0);
  const groups=aiqGroups();
  return <>
    <div className="controls" style={{marginBottom:10}}>
      <input type="text" value={inp} onChange={e=>setInp(e.target.value)} placeholder="Hebrew name, e.g. משיח / אברהם" style={{flex:'1 1 260px'}}/>
      <span className="pill">letters: {letters.length}</span>
      <button className={'subtab'+(big?' active':'')} onClick={()=>setBig(b=>!b)} title="Mispar Gadol: finals = 500–900 (off = Mispar Hechrachi, finals = regular). Genesis 1:1 = 2701 needs Hechrachi.">Mispar Gadol {big?'ON':'off'}</button>
    </div>
    <div className="muted" style={{marginBottom:8}}>22-letter gematria, א=1 … ת=400. <b>Mispar Hechrachi</b> (default): final letters count as their regular value — required for Gen 1:1 = 2701 = 37×73. <b>Mispar Gadol</b>: finals = 500–900. <b>Mispar Katan Mispari</b> = the digital-root reduction (below, "Aiq Bekar").</div>
    {letters.length>0 && <>
      <table>
        <thead><tr><th>Letter</th><th>Name</th><th>Value</th><th>Reduction (1–9)</th></tr></thead>
        <tbody>
        {letters.map((ch,i)=>{
          return <tr key={i}><td className="letter-cell"><span className="he">{displayHe(c).includes(ch)?ch:ch}</span></td>
            <td className="muted">{ch}</td>
            <td className="big">{val(ch)}</td>
            <td className="big" style={{color:'var(--blue)'}}>{reduce9(val(ch))}</td></tr>;
        })}
        </tbody>
      </table>
      <div style={{marginTop:10,padding:'12px 14px',background:'var(--panel2)',borderRadius:8}}>
        <span className="muted">Standard gematria: </span><b className="big">{total}</b>
        <span className="muted"> · Mispar Katan (digital root): </span><b className="big" style={{color:'var(--blue)'}}>{reduce9(total)===0?9:reduce9(total)}</b>
      </div>
    </>}
    <h3>The 22 letters → digital-root groups (Mispar Katan Mispari)</h3>
    <div className="muted" style={{marginBottom:8}}>Each of the 22 letters reduces (sum of digits) to 1–9. Groups 1–4 gather three letters each (units / tens / hundreds 100–400); groups 5–9 gather two (the hundreds stop at 400 — ancient Hebrew has only 22 letters, no medieval 500–900 finals). This digital root is the bridge to the kamea: without it there is no sigil (§15b.3). <b>Terminology note:</b> this reduction is <i>Mispar Katan Mispari</i>; "Aiq Bekar" properly names a 10× letter-substitution cipher, not this reduction.</div>
    <div className="grid2">
      {[1,2,3,4,5,6,7,8,9].map(g=> <div key={g} className="kbox"><b style={{color:'var(--gold)'}}>{g}</b> · {groups[g].join(', ')}</div>)}
    </div>
    <div className="note">Try: <span className="key click" onClick={()=>setInp('אברהם')}>אברהם</span> <span className="key click" onClick={()=>setInp('שלמה')}>שלמה</span> <span className="key click" onClick={()=>setInp('אלהים')}>אלהים</span> <span className="key click" onClick={()=>setInp('אבדון')}>אבדון</span> (Abaddon = 63 = 7×9). Gen 1:1 = <span className="key click" onClick={()=>setInp('בראשית')}>בראשית</span> <span className="key click" onClick={()=>setInp('אלהים')}>אלהים</span> <span className="key click" onClick={()=>setInp('השמים')}>השמים</span> <span className="key click" onClick={()=>setInp('הארץ')}>הארץ</span> → 913+86+395+401+407+296+203 = 2701 = 37×73.</div>
  </>;
}

function GematriaGreek(){
  const [inp,setInp]=useState('Ἰησοῦς');
  const v=isopsephy(inp);
  const ex=[['Ἰησοῦς','Jesus',888,'8×111'],['Χριστός','Christ',1480,'40×37'],['Jesus + Christ','',2368,'64×37 = 888+1480'],['Κύριος','Lord',800,''],['Ἀπολλύων','Apollyon (Rev 9:11)',1461,'Sothic cycle'],['666','the beast (Rev 13:18)',666,'6×111 = Σ1..36']];
  return <>
    <div className="controls" style={{marginBottom:10}}>
      <input type="text" value={inp} onChange={e=>setInp(e.target.value)} placeholder="Greek, e.g. Ἰησοῦς / Ἀπολλύων" style={{flex:'1 1 280px'}}/>
      <span className="pill">isopsephy: <b style={{color:'var(--gold)'}}>{v}</b></span>
    </div>
    <div className="muted" style={{marginBottom:8}}>27 letters: 24 standard + 3 archaic retained only as numerals (digamma ϝ/ϛ=6, koppa ϟ/ϙ=90, sampi ϡ=900). Final sigma ς = 200. Additive — no reduction. Thousands reuse α–θ with a lower keraia (͵α=1000).</div>
    <table style={{marginBottom:10}}>
      <thead><tr><th>Units 1–9</th><th>Tens 10–90</th><th>Hundreds 100–900</th></tr></thead>
      <tbody>
        <tr><td className="gk">α β γ δ ε ϛ ζ η θ</td><td className="gk">ι κ λ μ ν ξ ο π ϟ</td><td className="gk">ρ σ τ υ φ χ ψ ω ϡ</td></tr>
        <tr className="muted"><td>1 2 3 4 5 6 7 8 9</td><td>10 20 30 40 50 60 70 80 90</td><td>100 200 300 400 500 600 700 800 900</td></tr>
      </tbody>
    </table>
    <table>
      <thead><tr><th>Name</th><th>Reading</th><th>Value</th><th>Notes</th></tr></thead>
      <tbody>
      {ex.map((r,i)=><tr key={i}><td className="letter-cell">{r[0]? <span className="gk" style={{fontSize:'1.4rem'}}>{r[0]}</span> : ''}</td><td>{r[1]}</td><td className="big" style={{color:'var(--gold)'}}>{r[2]}</td><td className="muted">{r[3]}</td></tr>)}
      </tbody>
    </table>
    <div className="note"><b>666 / original referent:</b> the scholarly consensus is the <i>Hebrew</i> gematria נרון קסר (Neron Kesar) = 666; the Latin form (dropping final nun) = 616 (alternate manuscript). No single Greek word is widely accepted as the original Revelation 666. <b>Apollyon 1461 ↔ Sothic</b> is an esoteric parallel (arithmetic exact), not a scholarly lexicon entry.</div>
  </>;
}

function GematriaArabic(){
  const [inp,setInp]=useState('بسم الله الرحمن الرحيم');
  const v=abjad(inp);
  const letters=[...inp].filter(ch=>ABJAD[ch]);
  const ex=[['بسم الله الرحمن الرحيم','Bismillah',786,'19 letters; 2+60+40+66+329+289'],['الله','Allah',66,''],['محمد','Muhammad',92,''],['علي','Ali',110,''],['حسين','Husayn',128,'']];
  return <>
    <div className="controls" style={{marginBottom:10}}>
      <input type="text" dir="rtl" lang="ar" value={inp} onChange={e=>setInp(e.target.value)} placeholder="Arabic, e.g. بسم الله الرحمن الرحيم" style={{flex:'1 1 320px',textAlign:'right'}}/>
      <span className="pill">abjad (ḥisāb al-jummal): <b style={{color:'var(--gold)'}}>{v}</b></span>
    </div>
    <div className="muted" style={{marginBottom:8}}>28 letters in the <b>abjad (Ḥijāʾī) order</b> — the numeral order, <i>not</i> the alphabetical alifbāʾī order (اب ت ث…). Mnemonic: ʾabjad hawwaz ḥuṭṭī kalaman saʿfaṣ qarashat thakhadh ḍaẓagh. Additive. (The Maghrebi/archaic variant differs at 6 positions — not shown.)</div>
    <table style={{marginBottom:10}}>
      <thead><tr><th>Units 1–9</th><th>Tens 10–90</th><th>Hundreds 100–900</th><th>1000</th></tr></thead>
      <tbody>
        <tr><td className="he" dir="rtl" style={{fontSize:'1.25rem'}}>ا ب ج د ه و ز ح ط</td><td className="he" dir="rtl" style={{fontSize:'1.25rem'}}>ي ك ل م ن س ع ف ص</td><td className="he" dir="rtl" style={{fontSize:'1.25rem'}}>ق ر ش ت ث خ ذ ض ظ</td><td className="he" dir="rtl" style={{fontSize:'1.25rem'}}>غ</td></tr>
        <tr className="muted"><td>1 2 3 4 5 6 7 8 9</td><td>10 20 30 40 50 60 70 80 90</td><td>100 200 300 400 500 600 700 800 900</td><td>1000</td></tr>
      </tbody>
    </table>
    {letters.length>0 && <div style={{marginBottom:10,padding:'10px 14px',background:'var(--panel2)',borderRadius:8}}>
      <span className="muted">letters: </span>{letters.map((ch,i)=><span key={i} className="he" dir="rtl" style={{fontSize:'1.3rem',marginLeft:6}}>{ch}={ABJAD[ch]}</span>)}
    </div>}
    <table>
      <thead><tr><th>Phrase</th><th>Reading</th><th>Value</th><th>Notes</th></tr></thead>
      <tbody>
      {ex.map((r,i)=><tr key={i}><td className="letter-cell"><span className="he" dir="rtl" style={{fontSize:'1.3rem'}}>{r[0]}</span></td><td>{r[1]}</td><td className="big" style={{color:'var(--gold)'}}>{r[2]}</td><td className="muted">{r[3]}</td></tr>)}
      </tbody>
    </table>
    <div className="note"><b>The 19 Bismillah claim:</b> بسم الله الرحمن الرحيم = 19 letters (the alif of the article is counted) — the count is correct; the Code-19 / Rashad Khalifa debate rests on it. <b>786</b> is the abjad sum, used as a shorthand for Bismillah in South Asia (some scholars call it bidʿah). Both are tradition, not Quran text.</div>
  </>;
}

function GematriaIndian(){
  const [inp,setInp]=useState('गप्यभाग्य');
  const dec=katapayadi(inp);
  return <>
    <div className="controls" style={{marginBottom:10}}>
      <input type="text" value={inp} onChange={e=>setInp(e.target.value)} placeholder="Devanagari consonants, e.g. अनुष्टुभ्न (or any)" style={{flex:'1 1 320px'}}/>
      <span className="pill">decoded (right-to-left): <b style={{color:'var(--gold)'}}>{dec||'—'}</b></span>
    </div>
    <div className="muted" style={{marginBottom:8}}><b>Katapayadi</b> (Haridatta, 683 CE; Kerala school, pre-1500): consonants → digits, read <b>right-to-left</b> (अङ्कानां वामतो गतिः, "numbers go from left to right" reversed). <b>Vowels = 0</b>; न, ञ = 0. In a conjunct, only the <b>last</b> consonant carries a value. Named for the four consonants heading the four groups (क ट प य, all = 1). This is <b>positional</b>, not additive isopsephy.</div>
    <table style={{marginBottom:10}}>
      <thead><tr><th>Digit</th><th>ka-group</th><th>ṭa-group</th><th>pa-group</th><th>ya-group</th></tr></thead>
      <tbody>
        {[['1','क','ट','प','य'],['2','ख','ठ','फ','र'],['3','ग','ड','ब','ल'],['4','घ','ढ','भ','व'],['5','ङ','ण','म','श'],['6','च','त','—','ष'],['7','छ','थ','—','स'],['8','ज','द','—','ह'],['9','झ','ध','—','—'],['0','ञ','न','—','—']].map(r=>(
          <tr key={r[0]}><td className="big" style={{color:'var(--gold)'}}>{r[0]}</td>{r.slice(1).map((c,i)=><td key={i} className="he" style={{fontSize:'1.3rem'}}>{c}</td>)}</tr>
        ))}
      </tbody>
    </table>
    <div className="note"><b>Famous encodings (π):</b> the Karaṇapaddhati verse (Kerala school, 15th c.) decodes to <b>31415926536</b> (π to 10 places) under the standard right-to-left rule. The 31-place gopībhāgya verse <i>violates</i> the reversal rule — a standard decoder will not reproduce it. <b>Flag:</b> "कटपयादि encodes 31416" is FALSE — the name is etymological ("starting with ka,ṭa,pa,ya"), not a numerical encoding.</div>
    <div className="muted" style={{marginTop:8}}>The Sanskrit vargas (5 consonant classes) and the 14 Shiva Sutras are <b>phonological/grammatical</b>, NOT gematria — no numbers are assigned. The sacred numbers 108 (= 27 nakshatras × 4 pādas), 1008, 432,000 are fixed constants, not letter-sums.</div>
  </>;
}

function GematriaMore(){
  return <>
    <h3>Āryabhaṭa numeration (India, early 6th c. CE) — positional, not additive</h3>
    <div className="muted" style={{marginBottom:8}}>A true alphasyllabic numeral: <b>consonant = fixed value 1–100; vowel = power-of-100 multiplier</b>; syllable = consonant × vowel. e.g. कि = क(1) × 100 = 100; हौ = ह(100) × 10¹⁶ = 10¹⁸. Concatenated least-significant first. Pre-1500. This is a large-number positional notation, <b>not</b> a word-summing gematria.</div>
    <table style={{marginBottom:12}}>
      <thead><tr><th>Category</th><th>Consonants → values</th></tr></thead>
      <tbody>
        <tr><td>Velar</td><td className="he">क1 ख2 ग3 घ4 ङ5</td></tr>
        <tr><td>Palatal</td><td className="he">च6 छ7 ज8 झ9 ञ10</td></tr>
        <tr><td>Retroflex</td><td className="he">ट11 ठ12 ड13 ढ14 ण15</td></tr>
        <tr><td>Dental</td><td className="he">त16 थ17 द18 ध19 न20</td></tr>
        <tr><td>Labial</td><td className="he">प21 फ22 ब23 भ24 म25</td></tr>
        <tr><td>Semivowels</td><td className="he">य30 र40 ल50 व60</td></tr>
        <tr><td>Fricatives</td><td className="he">श70 ष80 स90 ह100</td></tr>
        <tr className="muted"><td>Vowel mult.</td><td>a=1, i=100, u=10⁴, ṛ=10⁶, ḷ=10⁸, e=10¹⁰, ai=10¹², o=10¹⁴, au=10¹⁶</td></tr>
      </tbody>
    </table>
    <h3>Cyrillic (10th c., Greek-derived) — true pre-1500 isopsephy</h3>
    <div className="muted" style={{marginBottom:8}}>Direct adaptation of Byzantine Greek isopsephy. Order follows Greek, not Cyrillic alphabetical. Borrowed letters Ѯ(ksi)=60, Ѱ(psi)=700, Ѳ(theta)=9 carry numerals; Slavic-only letters (б ж ш щ…) get NO value. e.g. ѰЗ = 700+7 = 707.</div>
    <h3>Coptic — Greek + Fai=90</h3>
    <div className="muted" style={{marginBottom:8}}>Essentially Greek isopsephy reused, with ONE Demotic addition: <b>ϥ (Fai) = 90</b>, filling the Greek qoppa slot. The other 5 Demotic letters have no numeric value. Treat as "Greek + Fai=90."</div>
    <h3>POST-1500 / NOT gematria (flagged)</h3>
    <ul className="muted">
      <li><b>Latin A-Z gematria</b> — <span style={{color:'var(--red)'}}>post-1500</span>. No pre-1500 full Latin A-Z system exists. Earliest: Rudolff 1525; famous: <b>Agrippa, De Occulta Philosophia (1532), Bk II ch. XX</b> (A=1…Z=500). e.g. IESUS = 394. A Renaissance construction — flag, do not treat as ancient.</li>
      <li><b>Roman numerals</b> — 7 symbols (I V X L C D M), additive/subtractive. Numeral notation, <b>not</b> word-summing isopsephy.</li>
      <li><b>Runic calendars</b> — 16 Younger Futhark runes encode golden numbers 1–16 + 3 special (Metonic calendrical), not gematria.</li>
      <li><b>Ogham</b> — the 20 fid have NO numeric assignment; stroke-count is phonological organization.</li>
      <li><b>Chinese stroke-count divination</b> (測字) — pre-1500 roots but NO fixed standardized stroke→number table; systematized only post-1612.</li>
    </ul>
  </>;
}

export { GematriaTab };
