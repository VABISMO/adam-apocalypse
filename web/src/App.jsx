// App.jsx — root component: app state, SPA routing (path + hash), tab switching.
import React, { useState, useMemo, useEffect } from 'react';
import { SIGNS, SIMPLE, LETTER_TO_SIGN, DOUBLES, MOTHERS, BODIES, GLYPH, WEEK, FIN2REG, REG2FIN, SIMPLE_LETTERS, GV, norm, displayHe, gematria, simpleSet, formable, isPalindrome, ANGEL_LEXICON, ANGEL_NAME_MAP, readableWords, daysInMonth, makeDate, parseDate, fmtDate, BODIES7, skyAtSet, skyAt, skyAt7, occupiedLetters, occupiedSigns, bySign, availableMothers, GENESIS, genesisReadable, GEN_TOTAL, GEN_VALUES, PREC, AGE, FULL, AYANAMSIS, SYN, DRAC, ANOM, TROP, ECLY, HALAKIM_DAY, MOLAD, EQUINOX_LON, ageBoundaries, yrLabel, ERA_WINDOWS, FINALS, letterVal, reduce9, LO_SHU, LO_POS, sigilPath, aiqGroups, siamese, doublyEven, singlyEven, buildMagic, isMagic, KAMEOT, GREEK, isopsephy, ABJAD, ABJAD_NAME, abjad, KTP, katapayadi, countSubset, MON, MONTHNAMES, displayDate } from './core.jsx';
import { SubTabs } from './ui.jsx';
import { BASE_TITLE, BASE_DESC, setRouteMeta } from './seo.jsx';
import { Footer } from './Footer.jsx';
import { registerWebMCPTools } from './webmcp.jsx';
import { SkyTab } from './tabs/SkyTab.jsx';
import { TranslatorTab, GlossPage, findWord } from './tabs/ReaderTab.jsx';
import { RuleTab } from './tabs/ReadingTab.jsx';
import { PredictorTab, AgesTab } from './tabs/TimeTab.jsx';
import { GematriaTab } from './tabs/GematriaTab.jsx';
import { SigilTab, KameotTab, AngelsTab } from './tabs/SigilsTab.jsx';
import { SarosTab, AyanamsaTab, LunarSolarTab, AlignmentsTab, WeekTab } from './tabs/CyclesTab.jsx';
import { RevelationsTab } from './tabs/RevelationsTab.jsx';
import { PsalmsTab } from './tabs/PsalmsTab.jsx';
import { CodesTab } from './tabs/CodesTab.jsx';
import { ProphetsPage } from './pages/ProphetsPage.jsx';
import { MagesPage } from './pages/MagesPage.jsx';
import { AlignmentFicha } from './pages/AlignmentFicha.jsx';
import { ProphetFicha } from './pages/ProphetFicha.jsx';
import { MageFicha } from './pages/MageFicha.jsx';
import { PatriarchFicha } from './pages/PatriarchFicha.jsx';
import { PlaceFicha } from './pages/PlaceFicha.jsx';
import { PatriarchsPage } from './pages/PatriarchsPage.jsx';
import { PlacesPage } from './pages/PlacesPage.jsx';
import { Landing } from './pages/Landing.jsx';
import { About } from './pages/About.jsx';
import { LucoLibraryPage, BookFicha } from './pages/LucoLibrary.jsx';
import { slugify } from './data/wiki.js';
import { PROPHETS } from './data/prophets.js';
import { MAGES } from './data/mages.js';
import { PATRIARCHS, BY_SLUG as PATRIARCH_BY } from './data/patriarchs.js';
import { PLACES, BY_SLUG as PLACE_BY } from './data/places.js';

// slug → figure, for client-side <title>/<meta> on profile routes (the prerendered
// deep links carry the precise per-profile meta; this is for in-app navigation).
const PROPHET_BY_SLUG = new Map(PROPHETS.map((p) => [slugify(p.name), p]));
const MAGE_BY_SLUG = new Map(MAGES.map((m) => [slugify(m.name), m]));
const PATRIARCH_BY_SLUG = PATRIARCH_BY;
const PLACE_BY_SLUG = PLACE_BY;

// query-param read for the ?date= / ?tab= boot (the §15c.11a table links here). Safe on
// the server (prerender) where window is undefined — returns null.
function qp(k){ if(typeof window==='undefined') return null; return new URLSearchParams(window.location.search).get(k); }

// The academic paper — served on the same domain at /paper (no external redirect).
// Linked from the Footer (every page) and the Landing hero, so no Paper tab in the tab bar.
const TABS = [
  ['cycles','Cycles'],['sky','Sky Map'],['translator','Reader'],['reading','Reading'],['time','Time'],
  ['gematria','Gematria'],['sigils','Sigils'],['revelation','Revelations'],['psalms','Psalms'],['codes','Codes'],
];
const SUB = {
  time:[['predictor','Predictor'],['ages','Ages']],
  sigils:[['sigil','Sigil Forge'],['kameot','Kameot'],['angels','72 Angels']],
  cycles:[['alignments','Alignments'],['saros','Saros'],['ayanamsa','Ayanamsa'],['lunarsolar','Lunar-Solar'],['week','Week']],
  revelation:[['hebrew','Hebrew · Christian'],['raziel','Raziel'],['gnostic','Gnostic / Nag Hammadi'],['vedic','Indian / Vedic'],['persian','Persian / Avestan'],['sufi','Islamic / Sufi'],['egyptian','Egyptian'],['maya','Maya'],['chinese','Chinese']],
  codes:[['els','ELS grid'],['temurah','Temurah / Atbash'],['ziruph','Ziruph']],
};

// ---- Friendly deep-link slugs (one canonical URL per tab + per subtab) ----
// A tab's root URL is its default subtab's slug (no separate root page → no duplicate
// content). /alignments and /readings are the existing canonical hub URLs for the
// Cycles and Reader tabs (kept, not broken — they are the rich SSR index pages).
const TAB_SLUG = {
  cycles:'alignments', sky:'sky-map', translator:'readings', reading:'reading', time:'time',
  gematria:'gematria', sigils:'sigils', revelation:'revelations', psalms:'psalms', codes:'codes',
};
const SUB_SLUG = {
  time:{predictor:'time',ages:'time/ages'},
  sigils:{sigil:'sigils',kameot:'sigils/kameot',angels:'sigils/angels'},
  cycles:{alignments:'alignments',saros:'cycles/saros',ayanamsa:'cycles/ayanamsa',lunarsolar:'cycles/lunarsolar',week:'cycles/week'},
  revelation:{hebrew:'revelations',raziel:'revelations/raziel',gnostic:'revelations/gnostic',vedic:'revelations/vedic',persian:'revelations/persian',sufi:'revelations/sufi',egyptian:'revelations/egyptian',maya:'revelations/maya',chinese:'revelations/chinese'},
  codes:{els:'codes',temurah:'codes/temurah',ziruph:'codes/ziruph'},
};
// reverse lookups: slug path (no leading slash) → {tab, sub}
const PATH_TO_TAB = {};
for(const [id,slug] of Object.entries(TAB_SLUG)) PATH_TO_TAB[slug]={tab:id, sub:defaultSub(id)};
for(const [tab,subs] of Object.entries(SUB_SLUG)) for(const [sub,slug] of Object.entries(subs)) PATH_TO_TAB[slug]={tab, sub};
function defaultSub(tab){ const s=SUB[tab]; return s? s[0][0] : null; }
function tabPath(tab, sub){ const ss=SUB_SLUG[tab]; if(sub && ss && ss[sub]) return '/'+ss[sub]; return '/'+TAB_SLUG[tab]; }
// per-tab client SEO (the prerender carries the precise per-subtab meta for indexing).
const TAB_META = {
  cycles:['Stellar alignments — rare conjunctions | Apocalypse of Adam','All rare stellar alignments (planets in one zodiac sign): dates, arc, era, readable names — plus the Saros, Ayanamsa, Lunar-Solar and Week cycle calculators.'],
  sky:['Sky map — live planet positions → Hebrew letters | Apocalypse of Adam','A live sky map: real planet positions (astronomy-engine) map the 12 zodiac signs to the 12 simple letters of the Sefer Yetzirah for any date, BCE included.'],
  translator:['Sky readings — Hebrew words readable in the stars | Apocalypse of Adam','Every Hebrew word readable from the zodiac signs occupied by the planets: a glossary of consonantal roots, gematria, and the stellar letters that spell each name.'],
  reading:['Reading rule — the reuse rule & mother-gate | Apocalypse of Adam','How the sky reads: the 3 mothers, 7 doubles and 12 simples, the reuse rule (S⊆O), and the geometric mother-gate that makes rare alignments reductive.'],
  time:['Time predictor & precessional ages | Apocalypse of Adam','Predict which Hebrew words are readable on each day of a year (one square per day), and the precessional ages of the equinox through the 12 signs.'],
  gematria:['Gematria calculator — Hebrew, Greek, Arabic, Indian | Apocalypse of Adam','Gematria of any word in four scripts (Hebrew 22-letter, Greek isopsephy, Arabic abjad, Indian katapayadi), with Aiq Bekar reduction.'],
  sigils:['Sigil forge, kameot & 72 angels | Apocalypse of Adam','Trace a name\'s sigil on the Lo Shu and the 7 planetary kameot, and the 72 Shem HaMephorash angel triplets from Exodus 14:19-21.'],
  revelation:['Revelations — cross-cultural constants | Apocalypse of Adam','The constants (gematria, cosmology, prophecy) carried independently across 9 cultures: Hebrew, Raziel, Gnostic, Vedic, Persian, Sufi, Egyptian, Maya, Chinese.'],
  psalms:['Daily Psalms — name & date → Genesis ELS → Psalm | Apocalypse of Adam','A JavaScript port of the daily-psalms-api: the gematria of a name + date sets a Genesis ELS step, matched to the shortest Hebrew phrase in the Psalms.'],
  codes:['Codes — ELS, Temurah, Ziruph | Apocalypse of Adam','Three kabbalistic ciphers in the browser: ELS (Torah codes), Temurah / Atbash, and Ziruph substitution — ported from their original Python.'],
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
  if((m=/^\/patriarch\/(.+)$/.exec(path))){ return {name:'patriarch', slug:decodeURIComponent(m[1])}; }
  if((m=/^\/place\/(.+)$/.exec(path))){ return {name:'place', slug:decodeURIComponent(m[1])}; }
  if(path==='/prophets') return {name:'prophets'};
  if(path==='/mages') return {name:'mages'};
  if(path==='/patriarchs') return {name:'patriarchs'};
  if(path==='/places') return {name:'places'};
  if(path==='/about') return {name:'about'};
  if(path==='/app') return {name:'app'};
  // Luco Library — bibliography hub + per-book ficha
  if(path==='/library') return {name:'luco'};
  if((m=/^\/library\/(.+)$/.exec(path))){ return {name:'book', slug:decodeURIComponent(m[1])}; }
  // friendly tab/subtab deep links: /sky-map, /cycles/saros, /revelations/raziel, …
  // (also covers the existing /alignments → cycles/alignments and /readings → translator)
  const segs = path==='/' ? [] : path.split('/').filter(Boolean);
  if(segs.length>=1){
    const slug2 = segs.slice(0,2).join('/');
    if(PATH_TO_TAB[slug2]) return {name:'apptab', tab:PATH_TO_TAB[slug2].tab, sub:PATH_TO_TAB[slug2].sub};
    if(PATH_TO_TAB[segs[0]]) return {name:'apptab', tab:PATH_TO_TAB[segs[0]].tab, sub:PATH_TO_TAB[segs[0]].sub};
  }
  if((m=/^#\/reader\/(.+)$/.exec(hash))){ try{ return {name:'gloss', he:decodeURIComponent(m[1])}; }catch(e){ return {name:'landing'}; } }
  return {name:'landing'};
}

function App(){
  const today='2026-08-08';
  // The app opens on the cited example alignment (-6352-10-21): a millennium-grade
  // stellar constriction whose readable layer is verse-attested biblical names + cities.
  const DEFAULT_DATE='-6352-10-21';
  const [active,setActive]=useState(()=>{
    const r=parseRoute();
    if(r.tab && TABS.some(([id])=>id===r.tab)) return r.tab;
    const t=qp('tab'); return t && TABS.some(([id])=>id===t) ? t : 'cycles';
  });
  const [sub,setSub]=useState(()=>{
    const base={reading:'rule',time:'predictor',sigils:'sigil',cycles:'alignments',revelation:'hebrew',codes:'els'};
    const r=parseRoute();
    if(r.tab && r.sub!=null && base[r.tab]!==undefined) base[r.tab]=r.sub;
    return base;
  });
  const [lex,setLex]=useState(null);
  const [lexErr,setLexErr]=useState(null);
  const [angels,setAngels]=useState(null);
  const [nameRefs,setNameRefs]=useState(null);
  const [date,setDate]=useState(()=>{ const d=qp('date'); return d && parseDate(d) ? d : DEFAULT_DATE; });
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
  // rows = rows7 = the 7 classical bodies the Sefer Yetzirah assigns to the 7 doubles
  // (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn). These are the ONLY moving bodies
  // the app tracks — they occupy letters, light sectors, and drive the reading. The
  // modern planets Uranus/Neptune/Pluto are not in the SY and are excluded entirely.
  // rows and rows7 are the same set; both names kept for call-site readability.
  const rows=useMemo(()=>skyAt(effDate),[effDate]);
  const rows7=useMemo(()=>skyAt7(effDate),[effDate]);
  const occ=useMemo(()=>occupiedLetters(rows7),[rows7]);
  const occSigns=useMemo(()=>new Set(rows7.map(r=>r.sign)),[rows7]);
  const moms=useMemo(()=>availableMothers(occSigns),[occSigns]);
  const bs=useMemo(()=>bySign(rows7),[rows7]);
  const yhvhOk=occ.has('י')&&occ.has('ה')&&occ.has('ו');
  const genesisOk=genesisReadable(occ, moms);
  const ANGEL72=useMemo(()=>{ const m=new Map(); if(angels) angels.triplets.forEach((t,i)=>{ m.set(norm(t), {el:angels.angelsEL[i], yh:angels.angelsYH[i]}); }); return m; },[angels]);
  // Expose the app's stellar computation to browser AI agents via WebMCP
  // (document.modelContext). No-op where the API is absent. Registered once the lexicon is
  // loaded so word/search tools have data; re-registration is idempotent + best-effort.
  useEffect(()=>{ if(lex) registerWebMCPTools({ lex, angelMap: ANGEL72 }); },[lex,ANGEL72]);
  const words=useMemo(()=> lex?readableWords(occ,lex.lexicon,ANGEL72,moms):[],[occ,lex,ANGEL72,moms]);
  const sentence=rows7.map(r=>SIMPLE[r.sign][0]).join(' ');
  const year = (()=>{ const d=parseDate(effDate); return d ? d.getUTCFullYear() : 2026; })();

  const route = useMemo(()=>parseRoute(),[loc]);
  // back/forward (popstate) restores the tab+subtab from the friendly URL. Also runs on
  // boot, where it is a no-op (active/sub were already initialised from the same route).
  useEffect(()=>{
    if(route.name!=='apptab' || !route.tab || !TABS.some(([id])=>id===route.tab)) return;
    setActive(route.tab);
    if(route.sub!=null) setSub(s=> s[route.tab]===route.sub ? s : { ...s, [route.tab]: route.sub });
  },[route]);
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
      t='Magi timeline — Adapa to Aleister Crowley | Apocalypse of Adam';
      d='A chronology of magi and royal-sage occult figures from the Babylonian court magi (Daniel, Shadrach, Meshach, Abednego) through Ramon Llull, Alfonso X and Felipe II, with Wikipedia bios and a profile of their works.';
    } else if(route.name==='prophet'){
      const p = PROPHET_BY_SLUG.get(route.slug);
      t = p ? `${p.name} — prophet profile | Apocalypse of Adam` : 'Prophet profile | Apocalypse of Adam';
      d = p ? `${p.name} (${p.region}, ${p.y0===p.y1?p.y0:p.y0+'–'+p.y1}): Wikipedia-sourced biography, an infobox of facts, and a life-and-work summary table. ${p.role}` : 'Prophet detail profile with Wikipedia biography and a summary table.';
    } else if(route.name==='mage'){
      const m2 = MAGE_BY_SLUG.get(route.slug);
      t = m2 ? `${m2.name} — magus profile | Apocalypse of Adam` : 'Magus profile | Apocalypse of Adam';
      d = m2 ? `${m2.name} (${m2.region}, ${m2.years}): Wikipedia-sourced biography, an infobox of facts, and a works-and-contributions summary table. ${m2.role}` : 'Magus detail profile with Wikipedia biography and a works table.';
    } else if(route.name==='patriarchs'){
      t='Patriarchs/Conquest — biblical names readable in the sky | Apocalypse of Adam';
      d='The biblical persons whose names the stellar reading surfaces on the 12 dated rare conjunctions, grouped by biblical period. Each name links to a profile: Hebrew, gematria, the stellar letters it needs, and the conjunctions where it reads.';
    } else if(route.name==='places'){
      t='Places — biblical toponyms readable in the sky | Apocalypse of Adam';
      d='The biblical places (toponyms) the stellar reading surfaces on the 12 dated rare conjunctions, grouped by biblical period. Each place links to a profile: Hebrew, gematria, the stellar letters it needs, and the conjunctions where it reads.';
    } else if(route.name==='patriarch'){
      const p = PATRIARCH_BY_SLUG.get(route.slug);
      t = p ? `${p.name} — patriarch profile | Apocalypse of Adam` : 'Patriarch profile | Apocalypse of Adam';
      d = p ? `${p.name} (${p.translit}, ${p.ref}): a biblical person readable in the sky. Gematria ${p.gem}, ${p.len} consonants, ${p.period}, readable on ${p.dates.length} of the 12 dated rare conjunctions.` : 'Patriarch detail profile.';
    } else if(route.name==='place'){
      const p = PLACE_BY_SLUG.get(route.slug);
      t = p ? `${p.name} — place profile | Apocalypse of Adam` : 'Place profile | Apocalypse of Adam';
      d = p ? `${p.name} (${p.translit}, ${p.ref}): a biblical toponym readable in the sky. Gematria ${p.gem}, ${p.len} consonants, ${p.period}, readable on ${p.dates.length} of the 12 dated rare conjunctions.` : 'Place detail profile.';
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
      d='The interactive calculators: live sky map, readable-word reader, reading rule, time predictor, gematria, sigils, 72 angels, ELS codes, rare alignments, revelations, psalms.';
    } else if(route.name==='apptab' && route.tab && TAB_META[route.tab]){
      [t,d]=TAB_META[route.tab];
    } else if(route.name==='luco'){
      t='Luco Library — source books | Apocalypse of Adam';
      d='The bibliography behind The Alphabet from the Sky: each book as a ficha (title, author, description) linking to a complete English translation on archive.org where freely available.';
    } else if(route.name==='book'){
      t='Luco Library — book ficha | Apocalypse of Adam';
      d='A book from the Luco Library bibliography: title, author, description, and a link to a complete English translation where freely available.';
    }
    setRouteMeta(t, d);
  },[route,glossWord,effDate]);

  function scanYear(y){
    setLoading(true);
    setTimeout(()=>{
      const days=[], dayOccs=[], dayMoms=[];
      const nDays=(y%4===0&&(y%100!==0||y%400===0))?366:365;
      for(let i=0;i<nDays;i++){
        const ds=fmtDate(makeDate(y,1,1+i));
        const rows=skyAt7(ds);
        const o=occupiedLetters(rows);
        const m=availableMothers(occupiedSigns(rows));   // geometric mother-gate per day
        dayOccs.push(o);
        dayMoms.push(m);
        if(genesisReadable(o, m)) days.push(ds);          // Genesis legible = simples + mothers both satisfied
      }
      setGenData({year:y,days:new Set(days),list:days,dayOccs,dayMoms}); setLoading(false);
    },20);
  }
  useEffect(()=>{ if(lex) scanYear(genYear); },[genYear,lex]);
  function step(n){ const d=parseDate(effDate); if(!d) return; d.setUTCDate(d.getUTCDate()+n); setDate(fmtDate(d)); }
  function stepYear(n){ setGenYear(genYear+n); }

  // Clicking a tab/subtab navigates to its friendly URL (deep-linkable + indexable).
  // setSubTab is also passed into RevelationsTab / CodesTab, whose internal subtab bars
  // call it → the URL updates to /revelations/<sub> or /codes/<sub>.
  const setSubTab = (g)=>(id)=>{ setSub(s=>({...s,[g]:id})); navigate(tabPath(g,id)); };
  const goTab = (id)=>{ setActive(id); navigate(tabPath(id)); };

  // Loading / error states keep the route chrome (TabsBar + Footer) so the layout is
  // stable while the lexicon fetches — this is what holds CLS down on /app. Landing and
  // About do not read the lexicon, so they render fully at once.
  if(lexErr){
    if(route.name==='landing') return <div><Landing goApp={()=>navigate('/app')}/><Footer/></div>;
    if(route.name==='about') return <div><About/><Footer/></div>;
    return <div><TabsBar goTab={goTab}/><section className="panel app-panel" style={{minHeight:'55vh'}}><h2>Error</h2><p>Could not load the lexicon. Please refresh the page; if the problem persists, the data may be unavailable right now.</p></section><Footer/></div>;
  }
  if(!lex){
    if(route.name==='landing') return <div><Landing goApp={()=>navigate('/app')}/><Footer/></div>;
    if(route.name==='about') return <div><About/><Footer/></div>;
    return <div><TabsBar goTab={goTab}/><section className="panel app-panel" style={{minHeight:'55vh'}}><h2>Loading lexicon…</h2><p>Reading the lexicon (6045 consonantal roots).</p></section><Footer/></div>;
  }

  // Path-based dedicated pages (full-page routes for SEO / deep links).
  if(route.name==='landing') return <div><Landing goApp={()=>navigate('/app')}/><Footer/></div>;
  if(route.name==='about') return <div><About/><Footer/></div>;
  if(route.name==='prophets') return <div><TabsBar goTab={goTab}/><section className="panel app-panel"><ProphetsPage onOpen={navigate}/></section><Footer/></div>;
  if(route.name==='mages') return <div><TabsBar goTab={goTab}/><section className="panel app-panel"><MagesPage onOpen={navigate}/></section><Footer/></div>;
  if(route.name==='patriarchs') return <div><TabsBar goTab={goTab}/><section className="panel app-panel"><PatriarchsPage onOpen={navigate}/></section><Footer/></div>;
  if(route.name==='places') return <div><TabsBar goTab={goTab}/><section className="panel app-panel"><PlacesPage onOpen={navigate}/></section><Footer/></div>;
  if(route.name==='align') return <div><TabsBar goTab={goTab}/><section className="panel app-panel"><AlignmentFicha date={route.date} lex={lex} angelMap={ANGEL72} onBack={backHome} nameRefs={nameRefs}/></section><Footer/></div>;
  if(route.name==='prophet') return <div><TabsBar goTab={goTab}/><section className="panel app-panel"><ProphetFicha slug={route.slug}/></section><Footer/></div>;
  if(route.name==='mage') return <div><TabsBar goTab={goTab}/><section className="panel app-panel"><MageFicha slug={route.slug}/></section><Footer/></div>;
  if(route.name==='patriarch') return <div><TabsBar goTab={goTab}/><section className="panel app-panel"><PatriarchFicha slug={route.slug}/></section><Footer/></div>;
  if(route.name==='place') return <div><TabsBar goTab={goTab}/><section className="panel app-panel"><PlaceFicha slug={route.slug}/></section><Footer/></div>;
  // Luco Library — bibliography hub (/library) + per-book ficha (/library/<slug>)
  if(route.name==='luco') return <div><TabsBar goTab={goTab}/><section className="panel app-panel"><LucoLibraryPage/></section><Footer/></div>;
  if(route.name==='book') return <div><TabsBar goTab={goTab}/><section className="panel app-panel"><BookFicha slug={route.slug}/></section><Footer/></div>;

  return (
    <div>
      <div className="tabs" role="tablist">
        {TABS.map(([id,label])=> <div key={id} role="tab" aria-selected={active===id} className={'tab'+(active===id?' active':'')} onClick={()=>goTab(id)}>{label}</div>)}
      </div>

      <section className="panel app-panel">
        {route.name==='gloss' && glossWord && (
          <GlossPage word={glossWord} date={effDate} rows={rows} occ={occ} moms={moms} genData={genData} onBack={backHome} nameRefs={nameRefs}/>
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
          <RuleTab occ={occ}/>
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
          {sub.cycles==='alignments' && <AlignmentsTab setDate={setDate} goReader={(d)=>{ setDate(d); setActive('translator'); navigate('/readings'); }} lex={lex} angelMap={ANGEL72} genData={genData} nameRefs={nameRefs}/>}
          {sub.cycles==='week' && <WeekTab date={effDate} rows={rows}/>}
        </>}

        {active==='revelation' && <RevelationsTab sub={sub.revelation} setSubTab={setSubTab('revelation')} date={effDate} rows={rows} occ={occ} words={words} genData={genData} genYear={genYear}/>}
        {active==='psalms' && <PsalmsTab/>}
        {active==='codes' && <CodesTab sub={sub.codes} setSubTab={setSubTab('codes')}/>}
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
  </div>;
}

export { App };