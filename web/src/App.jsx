// App.jsx — root component: app state, SPA routing (path + hash), tab switching.
import React, { useState, useMemo, useEffect } from 'react';
import { SIGNS, SIMPLE, LETTER_TO_SIGN, DOUBLES, MOTHERS, BODIES, GLYPH, WEEK, FIN2REG, REG2FIN, SIMPLE_LETTERS, GV, norm, displayHe, gematria, simpleSet, formable, isPalindrome, ANGEL_LEXICON, ANGEL_NAME_MAP, readableWords, daysInMonth, makeDate, parseDate, fmtDate, BODIES7, skyAtSet, skyAt, skyAt7, occupiedLetters, bySign, GENESIS, genesisReadable, GEN_TOTAL, GEN_VALUES, PREC, AGE, FULL, AYANAMSIS, SYN, DRAC, ANOM, TROP, ECLY, HALAKIM_DAY, MOLAD, EQUINOX_LON, ageBoundaries, yrLabel, ERA_WINDOWS, FINALS, letterVal, reduce9, LO_SHU, LO_POS, sigilPath, aiqGroups, siamese, doublyEven, singlyEven, buildMagic, isMagic, KAMEOT, GREEK, isopsephy, ABJAD, ABJAD_NAME, abjad, KTP, katapayadi, countSubset, MON, MONTHNAMES, displayDate } from './core.jsx';
import { SubTabs } from './ui.jsx';
import { BASE_TITLE, BASE_DESC, setRouteMeta } from './seo.jsx';
import { Footer } from './Footer.jsx';
import { registerWebMCPTools } from './webmcp.jsx';
import { SkyTab } from './tabs/SkyTab.jsx';
import { TranslatorTab, GlossPage, findWord } from './tabs/ReaderTab.jsx';
import { RuleTab, YhvhTab, GenesisTab } from './tabs/ReadingTab.jsx';
import { PredictorTab, AgesTab } from './tabs/TimeTab.jsx';
import { GematriaTab } from './tabs/GematriaTab.jsx';
import { SigilTab, KameotTab, AngelsTab } from './tabs/SigilsTab.jsx';
import { SarosTab, AyanamsaTab, LunarSolarTab, AlignmentsTab, WeekTab } from './tabs/CyclesTab.jsx';
import { RevelationsTab } from './tabs/RevelationsTab.jsx';
import { PsalmsTab } from './tabs/PsalmsTab.jsx';
import { CodesTab } from './tabs/CodesTab.jsx';
import { MethodTab } from './tabs/MethodTab.jsx';
import { ProphetsPage } from './pages/ProphetsPage.jsx';
import { MagesPage } from './pages/MagesPage.jsx';
import { AlignmentFicha } from './pages/AlignmentFicha.jsx';
import { ProphetFicha } from './pages/ProphetFicha.jsx';
import { MageFicha } from './pages/MageFicha.jsx';
import { Landing } from './pages/Landing.jsx';
import { About } from './pages/About.jsx';
import { slugify } from './data/wiki.js';
import { PROPHETS } from './data/prophets.js';
import { MAGES } from './data/mages.js';

// slug → figure, for client-side <title>/<meta> on ficha routes (the prerendered
// deep links carry the precise per-ficha meta; this is for in-app navigation).
const PROPHET_BY_SLUG = new Map(PROPHETS.map((p) => [slugify(p.name), p]));
const MAGE_BY_SLUG = new Map(MAGES.map((m) => [slugify(m.name), m]));

// The academic paper — served on the same domain at /paper (no external redirect).
const PAPER_URL = '/paper';
function PaperTab() {
  return <a className="tab" style={{ textDecoration: 'none', borderColor: 'var(--line)' }} href={PAPER_URL} title="The academic paper">Paper →</a>;
}

const TABS = [
  ['cycles','Cycles'],['sky','Sky Map'],['translator','Reader'],['reading','Reading'],['time','Time'],
  ['gematria','Gematria'],['sigils','Sigils'],['revelation','Revelations'],['psalms','Psalms'],['codes','Codes'],['method','Methodology'],
];
const SUB = {
  reading:[['rule','Reading Rule'],['yhvh','YHVH'],['genesis','Genesis 1:1']],
  time:[['predictor','Predictor'],['ages','Ages']],
  sigils:[['sigil','Sigil Forge'],['kameot','Kameot'],['angels','72 Angels']],
  cycles:[['alignments','Alignments'],['saros','Saros'],['ayanamsa','Ayanamsa'],['lunarsolar','Lunar-Solar'],['week','Week']],
  revelation:[['hebrew','Hebrew · Christian'],['raziel','Raziel'],['gnostic','Gnostic / Nag Hammadi'],['vedic','Indian / Vedic'],['persian','Persian / Avestan'],['sufi','Islamic / Sufi'],['egyptian','Egyptian'],['maya','Maya'],['chinese','Chinese']],
  codes:[['els','ELS grid'],['temurah','Temurah / Atbash'],['ziruph','Ziruph']],
};

// path/hash → route. Server (prerender) has no window; the route path is injected via
// globalThis.__ROUTE_PATH__ by the prerender before rendering.
function parseRoute(){
  const pathname = (typeof window!=='undefined') ? window.location.pathname : ((typeof globalThis!=='undefined' && globalThis.__ROUTE_PATH__) || '/');
  const hash = (typeof window!=='undefined') ? window.location.hash : '';
  // Normalise a trailing slash so /prophets/ matches /prophets (static hosts serve
  // prerendered /prophets/index.html at the /prophets/ URL). Without this, the exact
  // `==='/prophets'` checks fail and the SPA falls back to home after boot.
  const path = pathname.replace(/\/+$/, '') || '/';
  let m;
  if((m=/^\/reader\/(.+)$/.exec(path))){ try{ return {name:'gloss', he:decodeURIComponent(m[1])}; }catch(e){ return {name:'home'}; } }
  if((m=/^\/align\/(.+)$/.exec(path))){ return {name:'align', date:decodeURIComponent(m[1])}; }
  if((m=/^\/prophet\/(.+)$/.exec(path))){ return {name:'prophet', slug:decodeURIComponent(m[1])}; }
  if((m=/^\/mage\/(.+)$/.exec(path))){ return {name:'mage', slug:decodeURIComponent(m[1])}; }
  if(path==='/prophets') return {name:'prophets'};
  if(path==='/mages') return {name:'mages'};
  if(path==='/alignments') return {name:'alignments'};
  if(path==='/readings') return {name:'readings'};
  if(path==='/app') return {name:'app'};
  if(path==='/about') return {name:'about'};
  if((m=/^#\/reader\/(.+)$/.exec(hash))){ try{ return {name:'gloss', he:decodeURIComponent(m[1])}; }catch(e){ return {name:'landing'}; } }
  return {name:'landing'};
}

function App(){
  const today='2026-08-08';
  // The app opens on the cited example alignment (-6352-10-21): a millennium-grade
  // stellar constriction whose readable layer is verse-attested biblical names + cities.
  const DEFAULT_DATE='-6352-10-21';
  const [active,setActive]=useState('cycles');
  const [sub,setSub]=useState({reading:'rule',time:'predictor',sigils:'sigil',cycles:'alignments',revelation:'hebrew',codes:'els'});
  const [lex,setLex]=useState(null);
  const [lexErr,setLexErr]=useState(null);
  const [angels,setAngels]=useState(null);
  const [nameRefs,setNameRefs]=useState(null);
  const [date,setDate]=useState(DEFAULT_DATE);
  const [genYear,setGenYear]=useState(2026);
  const [genData,setGenData]=useState(null);
  const [loading,setLoading]=useState(false);
  const [q,setQ]=useState('');
  const [loc,setLoc]=useState(()=> typeof window!=='undefined' ? (window.location.pathname+window.location.hash) : '/');

  // Absolute paths: the SPA boots on path routes (/prophets, /reader/<he>…) where a
  // relative 'lexicon.json' would resolve to /prophets/lexicon.json → 404.
  useEffect(()=>{ fetch('/lexicon.json').then(r=>{ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); }).then(setLex).catch(e=>setLexErr(e.message)); },[]);
  useEffect(()=>{ fetch('/angels72.json').then(r=>{ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); }).then(setAngels).catch(()=>{}); },[]);
  // Bible references per proper name (scraped from the Sefaria Hebrew Tanakh, scripts/build_name_refs.mjs).
  // Object keyed by lexicon consonants (== w.he), value {translit, name, n, refs:[...]}. Empty catch: refs are an
  // enhancement, not load-bearing — the app still works if the file is absent.
  useEffect(()=>{ fetch('/name_refs.json').then(r=>{ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); }).then(setNameRefs).catch(()=>{}); },[]);
  useEffect(()=>{
    const h=()=>setLoc(window.location.pathname+window.location.hash);
    window.addEventListener('popstate',h); window.addEventListener('hashchange',h);
    return ()=>{ window.removeEventListener('popstate',h); window.removeEventListener('hashchange',h); };
  },[]);

  const navigate=(to)=>{ if(typeof window==='undefined') return; window.history.pushState({},'',to); setLoc(to); };

  const effDate = useMemo(()=>{ if(!date) return today; return parseDate(date) ? date : today; },[date]);
  const rows=useMemo(()=>skyAt(effDate),[effDate]);
  const occ=useMemo(()=>occupiedLetters(rows),[rows]);
  const occSigns=useMemo(()=>new Set(rows.map(r=>r.sign)),[rows]);
  const bs=useMemo(()=>bySign(rows),[rows]);
  const yhvhOk=occ.has('י')&&occ.has('ה')&&occ.has('ו');
  const genesisOk=genesisReadable(occ);
  const ANGEL72=useMemo(()=>{ const m=new Map(); if(angels) angels.triplets.forEach((t,i)=>{ m.set(norm(t), {el:angels.angelsEL[i], yh:angels.angelsYH[i]}); }); return m; },[angels]);
  // Expose the app's stellar computation to browser AI agents via WebMCP
  // (document.modelContext). No-op where the API is absent. Registered once the lexicon is
  // loaded so word/search tools have data; re-registration is idempotent + best-effort.
  useEffect(()=>{ if(lex) registerWebMCPTools({ lex, angelMap: ANGEL72 }); },[lex,ANGEL72]);
  const words=useMemo(()=> lex?readableWords(occ,lex.lexicon,ANGEL72):[],[occ,lex,ANGEL72]);
  const sentence=rows.map(r=>SIMPLE[r.sign][0]).join(' ');
  const year = (()=>{ const d=parseDate(effDate); return d ? d.getUTCFullYear() : 2026; })();

  const route = useMemo(()=>parseRoute(),[loc]);
  const glossWord = useMemo(()=>{
    if(route.name!=='gloss' || !lex) return null;
    return words.find(x=>x.he===route.he) || findWord(route.he, lex.lexicon, ANGEL72);
  },[route,words,lex,ANGEL72]);
  const openGloss = (w)=>{ navigate('/reader/'+encodeURIComponent(w.he)); };
  const backHome = ()=>{ navigate('/app'); };

  // per-route SEO: title + meta description.
  useEffect(()=>{
    let t=BASE_TITLE, d=BASE_DESC;
    if(route.name==='gloss' && glossWord){
      const w=glossWord;
      t = `${w.translit} · ${w.gloss} — Hebrew sky-reading | Apocalypse of Adam`;
      d = `${w.translit} (${w.disp}, “${w.gloss}”): ${w.len} Hebrew letters, gematria ${w.gem}. Which zodiac signs spell this word on ${displayDate(effDate)}, its year legibility timeline, and ${w.name||w.angelName?'Wikipedia info':''}.`;
    } else if(route.name==='align'){
      t = `Stellar alignment ${displayDate(route.date)} — rare planet conjunction | Apocalypse of Adam`;
      d = `The stellar alignment of ${displayDate(route.date)}: planets in one zodiac sign, tightest arc, precessional era, and the top Hebrew names readable in that sky.`;
    } else if(route.name==='prophets'){
      t='Prophets timeline — Adam to Jacob Frank | Apocalypse of Adam';
      d='A chronology of prophetic and revelatory figures from Adam through the biblical prophets, the apocalyptic writers, and the Sabbatean–Frankist thread, ending at Jacob Frank (1726–1791).';
    } else if(route.name==='mages'){
      t='Magi timeline — Daniel to Felipe II | Apocalypse of Adam';
      d='A chronology of magi and royal-sage occult figures from the Babylonian court magi (Daniel, Shadrach, Meshach, Abednego) through Ramon Llull, Alfonso X and Felipe II, with Wikipedia bios and a ficha of their works.';
    } else if(route.name==='prophet'){
      const p = PROPHET_BY_SLUG.get(route.slug);
      t = p ? `${p.name} — prophet ficha | Apocalypse of Adam` : 'Prophet ficha | Apocalypse of Adam';
      d = p ? `${p.name} (${p.region}, ${p.y0===p.y1?p.y0:p.y0+'–'+p.y1}): Wikipedia-sourced biography, an infobox of facts, and a life-and-work summary table. ${p.role}` : 'Prophet detail ficha with Wikipedia biography and a summary table.';
    } else if(route.name==='mage'){
      const m2 = MAGE_BY_SLUG.get(route.slug);
      t = m2 ? `${m2.name} — magus ficha | Apocalypse of Adam` : 'Magus ficha | Apocalypse of Adam';
      d = m2 ? `${m2.name} (${m2.region}, ${m2.years}): Wikipedia-sourced biography, an infobox of facts, and a works-and-contributions summary table. ${m2.role}` : 'Magus detail ficha with Wikipedia biography and a works table.';
    } else if(route.name==='alignments'){
      t='Stellar alignments — rare century & millennium conjunctions | Apocalypse of Adam';
      d='All rare stellar alignments (planets concentrated in one zodiac sign): dates, tightest arc, precessional era, and the readable names of each alignment day.';
    } else if(route.name==='readings'){
      t='Sky readings — Hebrew words readable in the stars | Apocalypse of Adam';
      d='Every Hebrew word readable from the zodiac signs occupied by the planets: a glossary of consonantal roots, gematria, and the stellar letters that spell each name.';
    } else if(route.name==='landing'){
      t='The Apocalypse of Adam — Hebrew letters in the stars · stellar alphabet & sky reader';
      d='Apocalypse means revelation. The thirteenth kingdom says every birth of their ruler is a word. Real planet positions map the 12 zodiac signs to the 12 simple letters of the Sefer Yetzirah, so every date spells readable Hebrew names. Sky map, alignments, reader, time, gematria, sigils, codes and psalms.';
    } else if(route.name==='about'){
      t='About — The Apocalypse of Adam | Hebrew sky reader';
      d='About The Apocalypse of Adam: a stellar-alphabet reader that maps real planet positions to the 12 simple letters of the Sefer Yetzirah. Authors, sources, and how a reading works.';
    } else if(route.name==='app'){
      t='Sky reader app — Cycles, Sky Map, Reader, Gematria, Alignments | Apocalypse of Adam';
      d='The interactive calculators: live sky map, readable-word reader, reading rule (YHVH, Genesis), time predictor, gematria, sigils, 72 angels, ELS codes, rare alignments, revelations, psalms.';
    }
    setRouteMeta(t, d);
  },[route,glossWord,effDate]);

  function scanYear(y){
    setLoading(true);
    setTimeout(()=>{
      const days=[], dayOccs=[];
      const nDays=(y%4===0&&(y%100!==0||y%400===0))?366:365;
      for(let i=0;i<nDays;i++){
        const ds=fmtDate(makeDate(y,1,1+i));
        const o=occupiedLetters(skyAt(ds));
        dayOccs.push(o);
        if(genesisReadable(o)) days.push(ds);
      }
      setGenData({year:y,days:new Set(days),list:days,dayOccs}); setLoading(false);
    },20);
  }
  useEffect(()=>{ if(lex) scanYear(genYear); },[genYear,lex]);
  function step(n){ const d=parseDate(effDate); if(!d) return; d.setUTCDate(d.getUTCDate()+n); setDate(fmtDate(d)); }
  function stepYear(n){ setGenYear(genYear+n); }

  if(lexErr) return <div className="panel app-panel"><h2>Error</h2><p>Could not load the lexicon. Please refresh the page; if the problem persists, the data may be unavailable right now.</p></div>;
  if(!lex) return <div className="panel app-panel"><h2>Loading lexicon…</h2><p>Reading the lexicon (6045 consonantal roots).</p></div>;

  const setSubTab = (g)=>(id)=>setSub(s=>({...s,[g]:id}));
  const goTab = (id)=>{ const p=(typeof window!=='undefined')?window.location.pathname:'/'; if(p!=='/app') navigate('/app'); setActive(id); };

  // Path-based dedicated pages (full-page routes for SEO / deep links).
  if(route.name==='landing') return <div><Landing goApp={()=>navigate('/app')}/><Footer/></div>;
  if(route.name==='about') return <div><About/><Footer/></div>;
  if(route.name==='prophets') return <div><TabsBar goTab={goTab}/><section className="panel app-panel"><ProphetsPage/></section><Footer/></div>;
  if(route.name==='mages') return <div><TabsBar goTab={goTab}/><section className="panel app-panel"><MagesPage/></section><Footer/></div>;
  if(route.name==='align') return <div><TabsBar goTab={goTab}/><section className="panel app-panel"><AlignmentFicha date={route.date} lex={lex} angelMap={ANGEL72} onBack={backHome} nameRefs={nameRefs}/></section><Footer/></div>;
  if(route.name==='prophet') return <div><TabsBar goTab={goTab}/><section className="panel app-panel"><ProphetFicha slug={route.slug}/></section><Footer/></div>;
  if(route.name==='mage') return <div><TabsBar goTab={goTab}/><section className="panel app-panel"><MageFicha slug={route.slug}/></section><Footer/></div>;
  if(route.name==='alignments') return <div><TabsBar goTab={goTab}/><section className="panel app-panel"><AlignmentsTab setDate={setDate} goReader={(d)=>{ setDate(d); setActive('translator'); navigate('/'); }} lex={lex} angelMap={ANGEL72} genData={genData} nameRefs={nameRefs}/></section><Footer/></div>;
  if(route.name==='readings') return <div><TabsBar goTab={goTab}/><section className="panel app-panel"><TranslatorTab date={effDate} occ={occ} words={words} q={q} setQ={setQ} genData={genData} onOpen={openGloss} nameRefs={nameRefs}/></section><Footer/></div>;

  return (
    <div>
      <div className="tabs" role="tablist">
        {TABS.map(([id,label])=> <div key={id} role="tab" aria-selected={active===id} className={'tab'+(active===id?' active':'')} onClick={()=>goTab(id)}>{label}</div>)}
        <PaperTab/>
      </div>

      <section className="panel app-panel">
        {route.name==='gloss' && glossWord && (
          <GlossPage word={glossWord} date={effDate} rows={rows} occ={occ} genData={genData} onBack={backHome} nameRefs={nameRefs}/>
        )}
        {route.name==='gloss' && !glossWord && (
          <div>
            <div className="controls" style={{marginBottom:14}}><button onClick={backHome}>◀ back</button></div>
            <h2>Gloss not found</h2>
            <div className="muted">No Hebrew word matches “{route.he}” in the lexicon. It may use letters unavailable today; open it from the Reader list on a date when it is readable.</div>
          </div>
        )}
        {route.name!=='gloss' && <>
        {active==='sky' && <SkyTab date={effDate} rawDate={date} setDate={setDate} rows={rows} occ={occ} occSigns={occSigns} yhvhOk={yhvhOk} genesisOk={genesisOk} bs={bs} sentence={sentence} step={step}/>}
        {active==='translator' && <TranslatorTab date={effDate} occ={occ} words={words} q={q} setQ={setQ} genData={genData} onOpen={openGloss} nameRefs={nameRefs}/>}

        {active==='reading' && <>
          <SubTabs items={SUB.reading} active={sub.reading} onChange={setSubTab('reading')}/>
          {sub.reading==='rule' && <RuleTab occ={occ}/>}
          {sub.reading==='yhvh' && <YhvhTab date={effDate} occ={occ} yhvhOk={yhvhOk} bs={bs}/>}
          {sub.reading==='genesis' && <GenesisTab date={effDate} occ={occ} genesisOk={genesisOk}/>}
        </>}

        {active==='time' && <>
          <SubTabs items={SUB.time} active={sub.time} onChange={setSubTab('time')}/>
          {sub.time==='predictor' && <PredictorTab date={effDate} setDate={setDate} genYear={genYear} setGenYear={setGenYear} genData={genData} loading={loading} scanYear={scanYear} year={year} stepYear={stepYear}/>}
          {sub.time==='ages' && <AgesTab date={effDate} rows={rows}/>}
        </>}

        {active==='gematria' && <GematriaTab/>}

        {active==='sigils' && <>
          <SubTabs items={SUB.sigils} active={sub.sigils} onChange={setSubTab('sigils')}/>
          {sub.sigils==='sigil' && <SigilTab/>}
          {sub.sigils==='kameot' && <KameotTab/>}
          {sub.sigils==='angels' && <AngelsTab/>}
        </>}

        {active==='cycles' && <>
          <SubTabs items={SUB.cycles} active={sub.cycles} onChange={setSubTab('cycles')}/>
          {sub.cycles==='saros' && <SarosTab/>}
          {sub.cycles==='ayanamsa' && <AyanamsaTab/>}
          {sub.cycles==='lunarsolar' && <LunarSolarTab/>}
          {sub.cycles==='alignments' && <AlignmentsTab setDate={setDate} goReader={(d)=>{ setDate(d); setActive('translator'); }} lex={lex} angelMap={ANGEL72} genData={genData} nameRefs={nameRefs}/>}
          {sub.cycles==='week' && <WeekTab date={effDate} rows={rows}/>}
        </>}

        {active==='revelation' && <RevelationsTab sub={sub.revelation} setSubTab={setSubTab('revelation')} date={effDate} rows={rows} occ={occ} words={words} genData={genData} genYear={genYear}/>}
        {active==='psalms' && <PsalmsTab/>}
        {active==='codes' && <CodesTab sub={sub.codes} setSubTab={setSubTab('codes')}/>}
        {active==='method' && <MethodTab esGlossCount={Object.keys(lex.esGloss||{}).length}/>}
        </>}
      </section>

      <Footer/>
    </div>
  );
}

// Tab bar reused by the dedicated path pages (so they still show top-level nav).
function TabsBar({goTab}){
  return <div className="tabs" role="tablist">
    {TABS.map(([id,label])=> <div key={id} role="tab" className="tab" onClick={()=>goTab(id)}>{label}</div>)}
    <PaperTab/>
  </div>;
}

export { App };