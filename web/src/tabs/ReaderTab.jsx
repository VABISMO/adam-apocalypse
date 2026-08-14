// tabs/ReaderTab.jsx — Reader list + individual gloss detail page
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SIGNS, SIMPLE, LETTER_TO_SIGN, DOUBLES, MOTHERS, BODIES, GLYPH, WEEK, FIN2REG, REG2FIN, SIMPLE_LETTERS, GV, norm, displayHe, gematria, simpleSet, formable, isPalindrome, ANGEL_LEXICON, ANGEL_NAME_MAP, readableWords, daysInMonth, makeDate, parseDate, fmtDate, BODIES7, skyAtSet, skyAt, skyAt7, occupiedLetters, bySign, GENESIS, genesisReadable, GEN_TOTAL, GEN_VALUES, PREC, AGE, FULL, AYANAMSIS, SYN, DRAC, ANOM, TROP, ECLY, HALAKIM_DAY, MOLAD, EQUINOX_LON, ageBoundaries, yrLabel, ERA_WINDOWS, FINALS, letterVal, reduce9, LO_SHU, LO_POS, sigilPath, aiqGroups, siamese, doublyEven, singlyEven, buildMagic, isMagic, KAMEOT, GREEK, isopsephy, ABJAD, ABJAD_NAME, abjad, KTP, katapayadi, countSubset, MON, MONTHNAMES, displayDate, motherSet, SEFARIA_TITLE, refUrl, ALL_ALIGN_YEARS, ALL_ALIGN_OM, alignmentRecurrence, ordinaryRecurrence } from '../core.jsx';
import { SkyMap, KameaGrid, Fig, DateEntry, YearInput, SubTabs } from '../ui.jsx';

const PAGE_SIZE = 48;

function FilterChip({active, count, label, title, onToggle}){
  return <button className={active?'on':''} onClick={onToggle} title={title} aria-pressed={active}>{label} ({count})</button>;
}

// Compact recurrence badge for the list card + gloss page. Returns {symbol, text, cls, style, title}.
// regime: 'alignment' (reads at ≥1 rare alignment, ◆ green), 'ordinary' (only scattered days, ○ dim),
// 'eternal' (no zodiac simple, reads at every alignment, ✦ violet). The optional `ord` is the
// ordinary-day recurrence (ordinaryRecurrence): for ordinary-regime words it supplies the everyday
// "how often it reads again" gap (days), which the old badge lacked — every word now shows a gap.
// "Rare alignment" = maxInSign ≥ 5 (the 5-, 6-, and 7-body clusterings): 12,505 events over 22,000 yr.
function recurrenceHint(r, ord){
  if(!r) return null;
  if(r.regime==='alignment'){
    const gap = r.median>=1000 ? '~'+Math.round(r.median/1000)+'k yr' : (r.median?r.median+' yr':'single event');
    const signLabel = r.signs && r.signs.length===1 ? r.signs[0] : (r.signs?r.signs.length+' signs':'align');
    return { symbol:'◆', text:`${signLabel} · ${gap}`, cls:'ok', style:null,
      title:`Reads at ${r.n} of ${r.total} rare alignments (maxInSign 5/6/7) where {${r.signs?r.signs.join(' / '):'—'}} are all occupied. Gap ${r.min}–${r.max} yr, median ${r.median} yr — the stellar-recurrence "frequency constant": a one-simple word reads at most alignments (short gap); a multi-simple word reads only when all its signs coincide (long gap). It also reads on ordinary transit days (not shown).` };
  }
  if(r.regime==='eternal'){
    return { symbol:'✦', text:'eternal', cls:null, style:{color:'var(--violet)'},
      title:`No zodiac simple (doubles${r.mothers&&r.mothers.length?' + mother '+r.mothers.join(''):''}) — reads at ${r.n} of ${r.total} rare alignments across every sign. Gaps ${r.min}–${r.max} yr, median ${r.median} yr; no fixed cadence.` };
  }
  // ordinary regime: the sign-combination never occurs in any of the 12,505 scanned alignments,
  // so the everyday-day gap IS the only recurrence. Show it when a scan is available.
  const why = `its required sign-combination {${(r.signs||[]).join(' / ')||'—'}} never coincides in any of the ${r.total} rare alignments`;
  if(ord && ord.count){
    return { symbol:'○', text:`${ord.count} d/yr · ~${ord.median} d gap`, cls:null, style:{color:'var(--dim)'},
      title:`Reads on ${ord.count} of ${ord.nDays} ordinary days (≈${Math.round(ord.pct*100)}%), roughly every ~${ord.median} days (gap range ${ord.min}–${ord.max} d). Never at a rare alignment (${why}).` };
  }
  return { symbol:'○', text:'ordinary only', cls:null, style:{color:'var(--dim)'},
    title:`Reads only on scattered ordinary days — never at a rare alignment (${why}). No stellar-alignment recurrence.` };
}

function TranslatorTab({date, occ, words, q, setQ, genData, onOpen, nameRefs}){
  const [page,setPage] = useState(0);
  // Filters are now binary (selected/not). A single global mode switch decides whether the
  // selected filters INCLUDE (keep only words matching all of them) or EXCLUDE (drop words
  // matching any of them). Default: include date-specific (=> only sky-dependent words).
  const [sel,setSel] = useState(new Set(['date']));
  const [mode,setMode] = useState('include');   // 'include' | 'exclude'
  const [minLen,setMinLen] = useState(1);
  const qn = q.trim().toLowerCase();
  const PROPS = {date:'simp', pal:'pal', g37:'m37', angel:'angelName', name:'name', place:'place', comp:'compound'};
  const CATS = ['alignment','ordinary','eternal'];   // stellar-alignment recurrence-regime filters
  const toggle=(id)=>setSel(prev=>{const n=new Set(prev); n.has(id)?n.delete(id):n.add(id); return n;});
  // Per-word stellar-alignment recurrence — the "significant" reading: at how many of the 12,505
  // rare alignments (maxInSign ≥ 5: the 5-, 6-, and 7-body clusterings) this word reads, and the
  // gap (years) between them. This REPLACES the former within-year % badge: that % measured
  // ordinary-day transit legibility (the noise floor), so rare-alignment signatures like Esther
  // read on 98/365 ordinary days and got labelled "frequent" — the wrong timescale. The alignment
  // gap (years→centuries, no fixed cadence) is the honest rarity metric: a one-simple word reads
  // at most alignments (short gap); a multi-simple word reads only when all its signs coincide
  // (long gap). Computed once over all readable words so the alignment/ordinary/eternal filters
  // can select on it. See alignmentRecurrence in core.jsx.
  const recAll = useMemo(()=>{
    const m=new Map();
    for(const w of words){ m.set(w.he, alignmentRecurrence(w.he, w.simp)); }
    return m;
  },[words]);
  const wordRegime=(w)=>{ const r=recAll.get(w.he); return r?r.regime:null; };
  const matchFilter=(w,id)=> CATS.includes(id) ? wordRegime(w)===id : !!w[PROPS[id]];
  const filtered = useMemo(()=>{
    let r = words;
    if(qn) r = r.filter(w => (w.gloss||'').toLowerCase().includes(qn) || w.translit.toLowerCase().includes(qn) || w.disp.includes(q.trim()));
    if(sel.size){
      const ids=[...sel];
      if(mode==='include') r = r.filter(w => ids.every(id => matchFilter(w,id)));      // AND: must match all selected
      else                  r = r.filter(w => !ids.some(id => matchFilter(w,id)));     // drop if matches any selected
    }
    if(minLen>1) r = r.filter(w=>w.len>=minLen);
    return r;
  }, [words, qn, sel, mode, minLen, recAll]);
  useEffect(()=>{ setPage(0); }, [qn, date, sel, mode, minLen]);
  const dateCount = useMemo(()=>words.filter(w=>w.simp).length,[words]);
  const alwaysCount = useMemo(()=>words.filter(w=>!w.simp).length,[words]);
  const palCount = useMemo(()=>words.filter(w=>w.pal).length,[words]);
  const g37Count = useMemo(()=>words.filter(w=>w.m37).length,[words]);
  const angelCount = useMemo(()=>words.filter(w=>w.angelName).length,[words]);
  const nameCount = useMemo(()=>words.filter(w=>w.name).length,[words]);
  const placeCount = useMemo(()=>words.filter(w=>w.place).length,[words]);
  const compCount = useMemo(()=>words.filter(w=>w.compound).length,[words]);
  const alignmentCount = useMemo(()=>words.filter(w=>wordRegime(w)==='alignment').length,[words,recAll]);
  const ordinaryCount = useMemo(()=>words.filter(w=>wordRegime(w)==='ordinary').length,[words,recAll]);
  const eternalCount = useMemo(()=>words.filter(w=>wordRegime(w)==='eternal').length,[words,recAll]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const cur = Math.min(page, pages-1);
  const slice = filtered.slice(cur*PAGE_SIZE, cur*PAGE_SIZE + PAGE_SIZE);
  return <>
    <h2>Reader — everything readable on {date} <span className="pill">{words.length} words</span> <span className="muted" style={{fontSize:'.78rem'}}>· click a gloss for its single-reading page (sky map · stellar-alignment recurrence · Wikipedia)</span></h2>
    <div className="controls" style={{marginBottom:8}}>
      <input type="text" placeholder="search by gloss or transliteration…" value={q} onChange={e=>setQ(e.target.value)} style={{flex:'1 1 240px'}} autoFocus aria-label="Search readable words"/>
    </div>
    <div className="muted" style={{marginBottom:6, fontSize:'.8rem'}}>Select filters, then choose a mode. <b>Include ✓</b> keeps only words matching <b>all</b> selected filters; <b>Exclude ✗</b> drops words matching <b>any</b> selected filter. With no filter selected, all words show. Glosses are Strong's English.</div>
    <div className="controls" style={{marginBottom:8, flexWrap:'wrap', alignItems:'center'}}>
      <span className="muted" style={{fontSize:'.8rem'}}>filters:</span>
      <FilterChip active={sel.has('date')} count={dateCount} label="date-specific" title="Words with zodiac simples (date signal). Include = only date-specific; exclude = only the eternal tier (no zodiac sign, mother-gated)" onToggle={()=>toggle('date')}/>
      <FilterChip active={sel.has('pal')} count={palCount} label="palindrome" title="Consonant palindrome (reads the same backwards)" onToggle={()=>toggle('pal')}/>
      <FilterChip active={sel.has('g37')} count={g37Count} label="gematria ×37" title="Gematria is a multiple of 37" onToggle={()=>toggle('g37')}/>
      <FilterChip active={sel.has('angel')} count={angelCount} label="angel name" title="A known angel name in Hebrew — Bible, Apocrypha, 1 Enoch watchers, Kabbalah, Islamic/Judeo-Arabic (Michael, Gabriel, Raphael, Uriel, Metatron, Sandalphon, Raziel, Azrael, the Watchers…). Matched by consonants, not suffix." onToggle={()=>toggle('angel')}/>
      <FilterChip active={sel.has('name')} count={nameCount} label="name (proper)" title="The word is a proper noun (name) in Strong — incl. theophoric names bearing אל / יה" onToggle={()=>toggle('name')}/>
      <FilterChip active={sel.has('place')} count={placeCount} label="place (LUGAR)" title="The word is a biblical PLACE — a proper locative noun in Strong (n-pr-loc): city, mountain, region, etc." onToggle={()=>toggle('place')}/>
      <FilterChip active={sel.has('comp')} count={compCount} label="compound" title="Concatenated multi-root entry whose gloss is truncated (e.g. 'dove of')" onToggle={()=>toggle('comp')}/>
      <span className="muted" style={{fontSize:'.8rem',marginLeft:4}}>·</span>
      <FilterChip active={sel.has('alignment')} count={alignmentCount} label="alignment" title="Reads at ≥1 rare alignment (maxInSign 5/6/7) — the significant stellar reading. A one-simple word reads at most alignments (short gap); a multi-simple word reads only when all its signs coincide (long gap). ◆ green" onToggle={()=>toggle('alignment')}/>
      <FilterChip active={sel.has('ordinary')} count={ordinaryCount} label="ordinary only" title="Reads only on scattered ordinary days — its required sign-combination never coincides in any of the 12,505 rare alignments. ○ dim" onToggle={()=>toggle('ordinary')}/>
      <FilterChip active={sel.has('eternal')} count={eternalCount} label="eternal" title="No zodiac simple (doubles-only, ±a mother): reads at every rare alignment across all signs — the widest recurrence. ✦ violet" onToggle={()=>toggle('eternal')}/>
      <span className="muted" style={{fontSize:'.8rem', marginLeft:6}}>mode:</span>
      <button className={mode==='include'?'on':''} onClick={()=>setMode('include')} title="Keep only words matching ALL selected filters" aria-pressed={mode==='include'}>✓ include</button>
      <button className={mode==='exclude'?'ex':''} onClick={()=>setMode('exclude')} title="Drop words matching ANY selected filter" aria-pressed={mode==='exclude'}>✗ exclude</button>
      {sel.size>0 && <button onClick={()=>setSel(new Set())} title="Clear all selected filters" style={{fontSize:'.78rem'}}>clear ({sel.size})</button>}
    </div>
    <div className="controls" style={{marginBottom:8, flexWrap:'wrap', alignItems:'center'}}>
      <span className="muted">min length</span>
      <input type="number" min="1" max="12" value={minLen} onChange={e=>{const n=parseInt(e.target.value,10); setMinLen(isNaN(n)||n<1?1:n);}} style={{width:56}} aria-label="Minimum word length"/>
      <span className="muted">{filtered.length} shown · {alwaysCount} eternal-tier (no zodiac sign)</span>
    </div>
    <div className="muted" style={{marginBottom:8}}>
      Reading rule applied: every <b>simple (zodiac) letter</b> in a word must sit in an <b>occupied sign</b> today, and every <b>mother</b> must be geometrically available — its fixed circumpolar constellation the nearest mother to an occupied sign (all three zones covered on an ordinary scattered sky; a grand conjunction narrows to one). The 7 doubles are always lit. Available simples today: <b style={{color:'var(--gold)'}}>{[...occ].sort().join(' ')||'none'}</b>. <span style={{color:'var(--violet)'}}>violet</span> = no zodiac sign (doubles-only, always readable). Badges: <span style={{color:'var(--gold)'}}>palindrome</span> · <span style={{color:'var(--green)'}}>×37</span> · <span style={{color:'var(--violet)'}}>angel name</span> · <span style={{color:'var(--brand-hi)'}}>name</span> · <span style={{color:'var(--warn)'}}>compound</span>. <b>Recurrence badge</b> = the gap between the rare <b>stellar alignments</b> (maxInSign ≥ 5 — the 5-, 6-, and 7-body clusterings) that make this word legible — the significant reading, recurring over years→centuries with <b>no fixed cadence</b> (12,505 such alignments across the 22,000-year scan). It is the stellar-recurrence "frequency constant": a one-simple word reads at most alignments (short gap, e.g. every few years); a multi-simple word reads only when all its signs coincide (long gap, e.g. centuries). <span className="prob ok">◆ green</span> reads at ≥1 rare alignment (years→centuries gap); <span style={{color:'var(--dim)'}}>○ ordinary only</span> reads only on scattered days — its required sign-combination never coincides in any alignment, so its badge shows the everyday gap (N days/yr · ~G-day gap); <span style={{color:'var(--violet)'}}>✦ eternal</span> reads at every alignment (no zodiac simple). <b>This is NOT an annual frequency:</b> a word also reads on ordinary transit days (the noise floor), and every word's gloss page shows that ordinary-day recurrence — how often it can be read again — alongside the rare-alignment gap. See the <b>Alignments</b> subtab for the full alignment list. Sorted: longest first.
    </div>
    <div className="tcards">
      {slice.map((w,i)=>(
        <div key={w.he+w.translit+i} className={'tcard'+(w.simp?'':' always')} style={{cursor:'pointer',transition:'border-color .12s,transform .12s'}} title={`Open the single-reading page for ${w.translit} (${w.gloss})`} onClick={()=>onOpen&&onOpen(w)} onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--brand)';e.currentTarget.style.transform='translateY(-1px)';}} onMouseLeave={e=>{e.currentTarget.style.borderColor='';e.currentTarget.style.transform='';}}>
          <div className="the">{w.disp}</div>
          <div className="read">{w.translit}</div>
          <div className="trans">{w.gloss}</div>
          <div className="g">{w.len} letters · gematria {w.gem}{w.pal && <span style={{color:'var(--gold)'}}> · palindrome</span>}{w.m37 && <span style={{color:'var(--green)'}}> · ×37</span>}{w.angelName && <span style={{color:'var(--violet)'}}> · angel</span>}</div>
          {(w.person||w.place||w.compound||(nameRefs&&nameRefs[w.he]&&nameRefs[w.he].n>0)) && (
            <div style={{marginTop:4,display:'flex',flexWrap:'wrap',gap:4}}>
              {w.person && <span className="pill" style={{color:'var(--blue)',borderColor:'var(--blue)'}}>name{w.theo?' (theophoric)':''}</span>}
              {w.place && <span className="pill" style={{color:'var(--green)',borderColor:'var(--green)'}} title="A biblical PLACE — proper locative noun in Strong (city, mountain, region…)">place</span>}
              {w.compound && <span className="pill" style={{color:'var(--warn)',borderColor:'var(--warn)'}} title="Concatenated multi-root entry whose gloss is truncated (e.g. ‘dove of’)">compound</span>}
              {nameRefs && nameRefs[w.he] && nameRefs[w.he].n>0 && (()=>{ const r=nameRefs[w.he]; return <span className="pill" style={{color:'var(--violet)',borderColor:'var(--violet)'}} title={'Where this name appears in the Hebrew Bible (Sefaria): '+r.refs.join(', ')}>📖 {r.refs[0]}{r.n>1?' · +'+(r.n-1):''}</span>; })()}
            </div>
          )}
          {(() => { const reg = recAll.get(w.he); const ord = (reg && reg.regime==='ordinary') ? ordinaryRecurrence(w.he, w.simp, genData) : null; const h = recurrenceHint(reg, ord); if(!h) return null; return <span className={h.cls?('prob '+h.cls):'prob'} style={h.style||{}} title={h.title}>{h.symbol} {h.text}</span>; })()}
          {w.angelName && <div className="simp" style={{color:'var(--violet)'}}>angel: {w.angelName.en} <span style={{color:'var(--dim)'}}>· {w.angelName.src}</span></div>}
          {w.angel && <div className="simp" style={{color:'var(--violet)'}}>Shem triplet +אל → <span className="he" style={{fontSize:'.95rem'}}>{w.angel.el}</span> · +יה → <span className="he" style={{fontSize:'.95rem'}}>{w.angel.yh}</span></div>}
          <div className="simp">{w.simp ? ('simples: '+[...w.simp].join(' ')) : (w.moms && w.moms.length ? 'eternal tier · mothers '+[...w.moms].join(' ') : 'no zodiac sign · doubles only')}</div>
        </div>
      ))}
    </div>
    {filtered.length===0 && <div className="muted" style={{padding:'18px 0'}}>No words match these filters on {date}. Loosen a filter or pick another date.</div>}
    {filtered.length > PAGE_SIZE && (
      <div className="controls" style={{marginTop:12}}>
        <button onClick={()=>setPage(p=>Math.max(0,p-1))} disabled={cur===0} className={cur===0?'':''}>◀ prev</button>
        <span className="pill">page {cur+1} / {pages} · {filtered.length} words · {PAGE_SIZE}/page</span>
        <button onClick={()=>setPage(p=>Math.min(pages-1,p+1))} disabled={cur>=pages-1}>next ▶</button>
        <span className="muted">jump:</span>
        <input type="number" min="1" max={pages} value={cur+1} onChange={e=>{const n=parseInt(e.target.value,10); if(!isNaN(n)) setPage(Math.max(0,Math.min(pages-1,n-1)));}} style={{width:64}} aria-label="Jump to page"/>
      </div>
    )}
    <div className="note">Reuse rule: a simple is either present or not; revisiting a sign adds or removes no letters. That is why one date reads thousands of words — paginate, search and filter to cut them down. Palindrome and ×37 are textual facts about the word, not sky-reading rules; use them to surface structure, not to decide legibility. <b>Angel name</b> = the word is a known angel name in Hebrew — from the Bible (Michael, Gabriel, Azazel, Ariel…), the Apocrypha (Raphael, Uriel, Jeremiel), the 1 Enoch watchers (Shemhazai, Kokabiel, Kasbeel…), the Kabbalah (Metatron, Sandalphon, Raziel, Samael, the planetary archangels) and the Islamic/Judeo-Arabic tradition (Azrael, Israfil) — matched by its consonants, not by a suffix. Extra-biblical names not in the Strong lexicon are added in so the Reader can surface them. <b>Shem triplet</b> (shown under the card where present) = the word is also a 3-letter root of one of the 72 Shem HaMephorash names (Exodus 14:19-21, §15b.4), shown with its +<span className="he">אל</span> / +<span className="he">יה</span> forms. <b>Name</b> = the word is a proper noun in Strong (people, places, theophoric names bearing <span className="he">אל</span>/<span className="he">יה</span>).</div>
  </>;
}

function findWord(he, LEX, angelMap){
  if(!LEX) return null;
  for(const [cons,trans,gloss,pos] of LEX){
    if(cons===he){
      const simp=[...simpleSet(cons)].sort().join('');
      const am = angelMap ? angelMap.get(norm(cons)) : null;
      const an = ANGEL_NAME_MAP.get(norm(cons));
      return {he:cons, disp:displayHe(cons), translit:trans, gloss, pos, len:cons.length, gem:gematria(cons), simp,
        pal:isPalindrome(cons), m37:gematria(cons)%37===0,
        name:(pos||'').startsWith('n-pr'),
        person: /n-pr-m|n-pr-f/.test(pos||'') || ((pos||'').startsWith('n-pr') && !/loc/.test(pos||'')),
        place: /loc/.test(pos||''),
        theo:/אל|יהו|יאל|יה/.test(cons), compound:/\s/.test(trans),
        angel: am?{el:am.el,yh:am.yh}:null, angelName: an||null};
    }
  }
  for(const [ahe,aen,asrc] of ANGEL_LEXICON){
    if(ahe===he){
      const simp=[...simpleSet(ahe)].sort().join('');
      return {he:ahe, disp:displayHe(ahe), translit:aen, gloss:'angel — '+aen, pos:'n-pr', len:ahe.length, gem:gematria(ahe), simp,
        pal:isPalindrome(ahe), m37:gematria(ahe)%37===0, name:true, person:true, place:false, theo:/אל|יה/.test(ahe), compound:false,
        angel: angelMap?angelMap.get(norm(ahe)):null, angelName:{en:aen,src:asrc}};
    }
  }
  return null;
}

// Wikipedia REST summary (CORS-enabled, no key) — only fetched for proper names.
// Source: en.wikipedia.org/api/rest_v1/page/summary/{title}. Returns extract + thumbnail + link.
function wikiCleanTitle(s){ return (s||'').replace(/\s*\([^)]*\)\s*/g,' ').split(',')[0].trim(); }

function GlossPage({word, date, rows, occ, moms, genData, onBack, nameRefs}){
  const w = word;
  const req = w.simp ? [...w.simp] : [];
  const wMoms = [...motherSet(w.he)];                 // geometric mother-gate: this word's required mother letters
  const onlyDoubles = !req.length && !wMoms.length;   // no zodiac sign AND no mother → truly always readable
  // Stellar-alignment recurrence: the rare, "significant" reading timescale. A word reads
  // at a rare alignment (maxInSign ≥ 5: a 5-, 6-, or 7-body clustering) iff its simples ⊆
  // occupiedSigns AND its mothers ⊆ availableMothers (doubles always free) — the SAME rule
  // readableWords applies on any date. alignmentRecurrence returns how many of the 12,505
  // alignments the word reads at, the years (over the 22,000-yr scan), gap stats, and the
  // nearest alignment before/after the selected date. This REPLACES the former within-year %
  // badge: that % measured ordinary-day transit legibility (the noise floor), so rare
  // signatures like Esther read on 98/365 ordinary days and got labelled "frequent" — the
  // wrong timescale. The alignment gap (years→centuries, no fixed cadence) is the honest
  // rarity metric. See core.jsx alignmentRecurrence + ALL_ALIGN_YEARS/ALL_ALIGN_OM.
  const refYear = (parseDate(date) && parseDate(date).getUTCFullYear()) || 0;
  const rec = useMemo(()=> alignmentRecurrence(w.he, w.simp, refYear), [w, refYear]);
  // Ordinary-day recurrence — "cada cuánto se puede volver a leer" on the everyday timescale.
  // Every word (alignment, eternal, ordinary) also reads on scattered ordinary transit days;
  // this is that frequency from the 365-day scan (genData). Computed for every gloss page so
  // the "how often can I read it again" answer appears in ANY reading, not only the rare
  // stellar alignments. Degrades to null when no scan is loaded.
  const ord = useMemo(()=> ordinaryRecurrence(w.he, w.simp, genData), [w, genData]);

  // Wikipedia lookup — proper names + angel names only.
  const wikiTitle = (w.name || w.angelName) ? wikiCleanTitle(w.angelName?w.angelName.en:w.translit) : null;
  const [wiki,setWiki]=useState(null);
  useEffect(()=>{
    if(!wikiTitle){ setWiki(null); return; }
    let cancelled=false;
    setWiki({loading:true});
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`)
      .then(r=>{ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); })
      .then(j=>{ if(!cancelled) setWiki({loading:false, j}); })
      .catch(err=>{ if(!cancelled) setWiki({loading:false, error:err.message}); });
    return ()=>{ cancelled=true; };
  },[wikiTitle]);

  const occArr=[...occ].sort();
  const missing = req.filter(c=>!occ.has(c));
  const momsNow = moms || new Set();
  const missingMoms = wMoms.filter(m=>!momsNow.has(m));
  const readableNow = onlyDoubles ? true : (missing.length===0 && missingMoms.length===0);
  const hint = recurrenceHint(rec, ord);   // compact badge reused in the KPI row (ord→everyday gap)
  // characteristic frequency ("π de frecuencia") for the KPI: the gap that defines this word's rarity
  const freqKPI = (() => {
    if(!rec) return '—';
    if(rec.regime==='alignment') return rec.median>=1000 ? '~'+Math.round(rec.median/1000)+'k yr' : (rec.median? rec.median+' yr':'1 event');
    if(rec.regime==='eternal') return 'always';
    return ord ? '~'+Math.round(ord.median)+' d' : '—';
  })();

  return <>
    <div className="controls" style={{marginBottom:14}}>
      <button onClick={onBack} title="Back to the Reader list">◀ back to Reader</button>
      <span className="pill">single reading</span>
      <span className="muted" style={{fontSize:'.82rem'}}>sky on {displayDate(date)}</span>
    </div>

    <h1 style={{margin:'0 0 2px'}}><span className="he" style={{fontSize:'1.9rem'}}>{w.disp}</span> <span style={{color:'var(--dim)',fontSize:'.95rem'}}>· {w.translit}</span></h1>
    <div className="sub" style={{marginBottom:14}}>{w.gloss}</div>

    <div className="kpi-row">
      <div className={'kpi '+(readableNow?'ok':'no')}>
        <div className="v">{readableNow?'●':'○'}</div>
        <div className="l">{displayDate(date)}</div>
        <div className="sub">{readableNow?'readable — all required letters occupied':'missing '+[...missing,...missingMoms].join(' ')}</div>
      </div>
      <div className="kpi">
        <div className="v">{w.len}</div>
        <div className="l">letters</div>
      </div>
      <div className="kpi">
        <div className="v" style={{color:'var(--gold)'}}>{w.gem}</div>
        <div className="l">gematria{w.m37?' · ×37':''}</div>
      </div>
      <div className={'kpi '+(hint&&hint.cls?hint.cls:'')} style={hint&&!hint.cls?hint.style:null}>
        <div className="v">{hint? `${hint.symbol} ${freqKPI}` : '—'}</div>
        <div className="l">recurrence</div>
        <div className="sub">{hint? hint.text : '—'}</div>
      </div>
      <div className="kpi">
        <div className="v" style={{color: req.length?'var(--violet)':'var(--green)'}}>{req.length? req.length : '0'}</div>
        <div className="l">simple letters</div>
        <div className="sub">{req.length? [...w.simp].join(' ') : (onlyDoubles?'none · always':'none · mother-gated')}</div>
      </div>
    </div>

    <div className="grid2" style={{alignItems:'start'}}>
      <div className="panel" style={{padding:14}}>
        <div className="muted" style={{marginBottom:8,fontSize:'.8rem'}}>
          {readableNow
            ? <span style={{color:'var(--green)'}}>● readable on {displayDate(date)} — all required letters occupied</span>
            : <span style={{color:'var(--red)'}}>○ not readable on {displayDate(date)} — missing: <b style={{color:'var(--gold)'}}>{[...missing,...missingMoms].join(' ')}</b>{missingMoms.length? <span className="muted"> (mother-zone not spanned)</span>:null}</span>}
        </div>
        <SkyMap rows={rows} occ={occ} hl={req.length?new Set(req):null}/>
        <div className="legend">Gold sectors = the simple (zodiac) letters this word needs. Lavender = occupied today but not required by this word.</div>
      </div>

      <div className="panel" style={{padding:16}}>
        <h3 style={{marginTop:0}}>Gloss</h3>
        <table>
          <tbody>
            <tr><th>Hebrew</th><td><span className="he" style={{fontSize:'1.8rem'}}>{w.disp}</span></td></tr>
            <tr><th>Transliteration</th><td><b>{w.translit}</b></td></tr>
            <tr><th>Gloss</th><td>{w.gloss}</td></tr>
            <tr><th>Part of speech</th><td>{w.pos||'—'}</td></tr>
            <tr><th>Length</th><td>{w.len} letters</td></tr>
            <tr><th>Gematria</th><td><b style={{color:'var(--gold)'}}>{w.gem}</b>{w.m37 && <span style={{color:'var(--green)'}}> · multiple of 37</span>}</td></tr>
            <tr><th>Simple letters</th><td>{w.simp ? <span style={{color:'var(--blue)'}}>{[...w.simp].join(' ')}</span> : <span style={{color:'var(--violet)'}}>none ({onlyDoubles?'always readable · doubles only':'no zodiac sign · mother-gated'})</span>}</td></tr>
            <tr><th>Badges</th><td>
              {w.pal && <span className="pill" style={{color:'var(--gold)',borderColor:'var(--gold)'}}>palindrome</span>}
              {w.m37 && <span className="pill ok">×37</span>}
              {w.angelName && <span className="pill" style={{color:'var(--violet)',borderColor:'var(--violet)'}}>angel name</span>}
              {w.person && <span className="pill" style={{color:'var(--blue)',borderColor:'var(--blue)'}}>name{w.theo?' (theophoric)':''}</span>}
              {w.place && <span className="pill" style={{color:'var(--green)',borderColor:'var(--green)'}} title="A biblical PLACE — proper locative noun in Strong (city, mountain, region…)">place</span>}
              {w.compound && <span className="pill" style={{color:'var(--warn)',borderColor:'var(--warn)'}}>compound</span>}
              {!w.pal && !w.m37 && !w.angelName && !w.person && !w.place && !w.compound && <span className="muted">—</span>}
            </td></tr>
            {nameRefs && nameRefs[w.he] && nameRefs[w.he].n>0 && (()=>{ const r=nameRefs[w.he]; return <tr><th>Bible refs</th><td style={{display:'flex',flexWrap:'wrap',gap:4}}>{r.refs.map((ref,idx)=>{ const u=refUrl(ref); return u ? <a key={ref+idx} className="pill" style={{color:'var(--violet)',borderColor:'var(--violet)',textDecoration:'none'}} href={u} target="_blank" rel="noopener noreferrer" title={`Open ${ref} on Sefaria (Hebrew + translation)`}>📖 {ref}</a> : <span key={ref+idx} className="pill" style={{color:'var(--violet)',borderColor:'var(--violet)'}}>📖 {ref}</span>; })}</td></tr>; })()}
            {w.angelName && <tr><th>Angel</th><td style={{color:'var(--violet)'}}>{w.angelName.en} <span style={{color:'var(--dim)'}}>· {w.angelName.src}</span></td></tr>}
            {w.angel && <tr><th>Shem triplet</th><td>+<span className="he" style={{fontSize:'.95rem'}}>{w.angel.el}</span> · +<span className="he" style={{fontSize:'.95rem'}}>{w.angel.yh}</span></td></tr>}
          </tbody>
        </table>
      </div>
    </div>

    <div className="panel" style={{marginTop:14,padding:16}}>
      <h3 style={{marginTop:0}}>Recurrence — how often {w.disp} reads</h3>
      {(() => {
        if(!rec) return <div className="muted">—</div>;
        const yrLabel = y => y<0 ? Math.abs(y)+' BCE' : (y===0?'1 BCE':y+' CE');
        // the everyday cadence (baked 2026 reference, or the live scan when loaded) — always present now
        const ordLine = ord ? `${ord.count} of ${ord.nDays} days · gap ${ord.min}–${ord.max} d · ~every ${Math.round(ord.avg)} d` : null;
        if(rec.regime==='alignment'){
          const gap = rec.median>=1000 ? '~'+Math.round(rec.median/1000)+'k years' : (rec.median? rec.median+' years':'a single recorded event');
          const yrs = rec.years;
          const yrsCell = yrs.length<=24 ? yrs.map(y=>yrLabel(y)).join(' · ')
            : `${yrs.slice(0,8).map(yrLabel).join(' · ')} … ${yrs.slice(-4).map(yrLabel).join(' · ')} (${yrs.length} total)`;
          return <>
            <div style={{marginBottom:10,fontSize:'1.05rem'}}>
              <span style={{color:'var(--green)'}}>◆ {gap}</span> between the rare alignments that make {w.disp} legible — the significant stellar reading, recurring over years→centuries with no fixed cadence.{ordLine ? <> It also reads on ordinary days ({ordLine}).</> : null}
            </div>
            <table style={{marginBottom:10}}>
              <tbody>
                <tr><th>Required sign(s) / simple(s)</th><td><b>{rec.signs.join(' / ')}</b> · <span style={{color:'var(--blue)'}}>{rec.simples.join(' ')}</span>{rec.mothers&&rec.mothers.length?<> · mother <span style={{color:'var(--violet)'}}>{rec.mothers.join(' ')}</span></>:null}</td></tr>
                <tr><th>Rare alignments read at</th><td><b>{rec.n}</b> of {rec.total} (maxInSign 5/6/7, across 22,000 yr)</td></tr>
                <tr><th>Years</th><td>{yrsCell}</td></tr>
                <tr><th>Gap between alignments</th><td>{rec.min}–{rec.max} yr · median {rec.median} yr</td></tr>
                <tr><th>Nearest to {displayDate(date)}</th><td>{rec.prev!=null?`${yrLabel(rec.prev)} (${refYear-rec.prev} yr ago)`:'—'} · next {rec.next!=null?`${yrLabel(rec.next)} (in ${rec.next-refYear} yr)`:'none recorded'}</td></tr>
                {ord && <tr><th>Ordinary-day cadence</th><td>{ordLine}</td></tr>}
              </tbody>
            </table>
            <div className="muted" style={{fontSize:'.82rem'}}>The alignment gap is the rare, significant reading — the stellar-recurrence "frequency constant": a one-simple word reads at most alignments (short gap, e.g. every few years); a multi-simple word reads only when all its signs coincide (long gap). The ordinary-day cadence is the noise floor every word also sits on (when any planet transits its sign). Planet periods are stable, so the everyday cadence is the same in any year.</div>
          </>;
        }
        if(rec.regime==='eternal'){
          return <>
            <div style={{marginBottom:10,fontSize:'1.05rem'}}>
              <span style={{color:'var(--violet)'}}>✦ always</span> — {w.disp} uses no zodiac simple ({onlyDoubles?'doubles only':'doubles + mother '+(rec.mothers||[]).join(' ')}), so it reads at every rare alignment regardless of sign{ordLine ? <>, and on most ordinary days ({ordLine})</> : null}.
            </div>
            <table style={{marginBottom:10}}>
              <tbody>
                <tr><th>Rare alignments read at</th><td><b>{rec.n}</b> of {rec.total} (all 12,505, across every sign)</td></tr>
                <tr><th>Gap between alignments</th><td>{rec.min}–{rec.max} yr · median {rec.median} yr</td></tr>
                {ord && <tr><th>Ordinary-day cadence</th><td>{ordLine}</td></tr>}
              </tbody>
            </table>
            <div className="muted" style={{fontSize:'.82rem'}}>Not gated to any sign, so it reads at all {rec.total} rare alignments across the 22,000-yr scan (and most ordinary days). The gaps are between successive alignments of any sign — no fixed cadence.</div>
          </>;
        }
        // ordinary regime — the sign-combination never occurs in any scanned alignment, so the
        // everyday-day gap IS the only recurrence.
        const why = `its required sign-combination {${(rec.signs||[]).join(' / ')||'—'}} never coincides in any of the ${rec.total} rare alignments`;
        const ordGap = ord ? '~'+Math.round(ord.median)+' d' : 'scattered days';
        return <>
          <div style={{marginBottom:10,fontSize:'1.05rem'}}>
            <span style={{color:'var(--dim)'}}>○ {ordGap}</span> — {w.disp} reads only on scattered ordinary days, never at a rare alignment, so this everyday cadence is its only recurrence.
          </div>
          <table style={{marginBottom:10}}>
            <tbody>
              {ord && <><tr><th>Readable days / year</th><td><b>{ord.count}</b> of {ord.nDays} (≈{Math.round(ord.pct*100)}%)</td></tr>
              <tr><th>Gap between readable days</th><td>{ord.min}–{ord.max} d · median {ord.median} d</td></tr>
              <tr><th>Average cadence</th><td>roughly every ~{Math.round(ord.avg)} days</td></tr></>}
            </tbody>
          </table>
          <div className="muted" style={{fontSize:'.82rem'}}>Why no rare-alignment recurrence: {why}. This is the everyday timescale — the noise floor every word sits on. The years→centuries alignment gap does not apply here because the word's required signs never all coincide at any of the scanned alignments. (Everyday cadence from the {ord?ord.year:'2026'} reference scan; planet periods are stable, so it is the same in any year.)</div>
        </>;
      })()}
    </div>

    {wikiTitle && (
      <div className="panel" style={{marginTop:14,padding:16}}>
        <h3 style={{marginTop:0}}>Wikipedia — {wikiTitle}</h3>
        {wiki && wiki.loading && <div className="muted">Looking up {wikiTitle} on Wikipedia…</div>}
        {wiki && wiki.error && <div className="muted" style={{color:'var(--red)'}}>No Wikipedia article found for “{wikiTitle}” ({wiki.error}).</div>}
        {wiki && wiki.j && <>
          {wiki.j.type==='disambiguation'
            ? <div className="muted">“{wiki.j.title}” is a disambiguation page — see <a href={wiki.j.content_urls?.desktop?.page} target="_blank" rel="noreferrer">Wikipedia</a> for the list of meanings.</div>
            : <>
              <div style={{display:'flex',gap:14,flexWrap:'wrap',alignItems:'flex-start'}}>
                {wiki.j.thumbnail && <img src={wiki.j.thumbnail.source} alt={wiki.j.title} style={{maxWidth:160,maxHeight:200,borderRadius:8,border:'1px solid var(--line)'}}/>}
                <div style={{flex:'1 1 320px'}}>
                  {wiki.j.description && <div className="muted" style={{marginBottom:6}}>{wiki.j.description}</div>}
                  <div>{wiki.j.extract}</div>
                  <div style={{marginTop:8}}><a href={wiki.j.content_urls?.desktop?.page} target="_blank" rel="noreferrer">Read more on Wikipedia →</a></div>
                </div>
              </div>
            </>}
        </>}
        {!wiki && <div className="muted">Preparing Wikipedia lookup…</div>}
      </div>
    )}

    <div className="note" style={{marginTop:14}}>This single-reading page is a shareable deep link: <code>{typeof window!=='undefined'?window.location.href:''}</code>. The sky map, gloss and year timeline are computed live from astronomy-engine planet positions; the Wikipedia panel (shown for proper and angel names) is the free Wikipedia REST summary API.</div>
  </>;
}

export { TranslatorTab, GlossPage, findWord };
