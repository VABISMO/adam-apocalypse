// tabs/ReaderTab.jsx — Reader list + individual gloss detail page
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SIGNS, SIMPLE, LETTER_TO_SIGN, DOUBLES, MOTHERS, BODIES, GLYPH, WEEK, FIN2REG, REG2FIN, SIMPLE_LETTERS, GV, norm, displayHe, gematria, simpleSet, formable, isPalindrome, ANGEL_LEXICON, ANGEL_NAME_MAP, readableWords, daysInMonth, makeDate, parseDate, fmtDate, BODIES7, skyAtSet, skyAt, skyAt7, occupiedLetters, bySign, GENESIS, genesisReadable, GEN_TOTAL, GEN_VALUES, PREC, AGE, FULL, AYANAMSIS, SYN, DRAC, ANOM, TROP, ECLY, HALAKIM_DAY, MOLAD, EQUINOX_LON, ageBoundaries, yrLabel, ERA_WINDOWS, FINALS, letterVal, reduce9, LO_SHU, LO_POS, sigilPath, aiqGroups, siamese, doublyEven, singlyEven, buildMagic, isMagic, KAMEOT, GREEK, isopsephy, ABJAD, ABJAD_NAME, abjad, KTP, katapayadi, countSubset, MON, MONTHNAMES, displayDate, SEFARIA_TITLE, refUrl } from '../core.jsx';
import { SkyMap, KameaGrid, Fig, DateEntry, YearInput, SubTabs } from '../ui.jsx';

const PAGE_SIZE = 48;

function FilterChip({active, count, label, title, onToggle}){
  return <button className={active?'on':''} onClick={onToggle} title={title} aria-pressed={active}>{label} ({count})</button>;
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
  const CATS = ['special','frequent','common'];   // legibility-category filters (from probsAll)
  const toggle=(id)=>setSel(prev=>{const n=new Set(prev); n.has(id)?n.delete(id):n.add(id); return n;});
  // Per-word legibility over the scanned Predictor year, for ALL readable words (not just
  // the page) so the special/frequent/common filters can select on it. Empirical S⊆O count,
  // no independence assumption, no fixed q. Low % = special/rare (green); high % = common (red).
  const probsAll = useMemo(()=>{
    const m=new Map();
    if(!genData?.dayOccs) return m;
    const n=genData.dayOccs.length || 1;
    for(const w of words){
      const req = w.simp ? [...w.simp] : [];
      if(!req.length){ m.set(w.he,1); continue; }
      let c=0; for(const o of genData.dayOccs) if(req.every(x=>o.has(x))) c++;
      m.set(w.he, c/n);
    }
    return m;
  },[words,genData]);
  const wordCat=(w)=>{ const p=probsAll.get(w.he); if(p==null) return null; return p>=0.5?'common':p>=0.2?'frequent':'special'; };
  const matchFilter=(w,id)=> CATS.includes(id) ? wordCat(w)===id : !!w[PROPS[id]];
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
  }, [words, qn, sel, mode, minLen, probsAll]);
  useEffect(()=>{ setPage(0); }, [qn, date, sel, mode, minLen]);
  const dateCount = useMemo(()=>words.filter(w=>w.simp).length,[words]);
  const alwaysCount = useMemo(()=>words.filter(w=>!w.simp).length,[words]);
  const palCount = useMemo(()=>words.filter(w=>w.pal).length,[words]);
  const g37Count = useMemo(()=>words.filter(w=>w.m37).length,[words]);
  const angelCount = useMemo(()=>words.filter(w=>w.angelName).length,[words]);
  const nameCount = useMemo(()=>words.filter(w=>w.name).length,[words]);
  const placeCount = useMemo(()=>words.filter(w=>w.place).length,[words]);
  const compCount = useMemo(()=>words.filter(w=>w.compound).length,[words]);
  const specialCount = useMemo(()=>words.filter(w=>wordCat(w)==='special').length,[words,probsAll]);
  const frequentCount = useMemo(()=>words.filter(w=>wordCat(w)==='frequent').length,[words,probsAll]);
  const commonCount = useMemo(()=>words.filter(w=>wordCat(w)==='common').length,[words,probsAll]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const cur = Math.min(page, pages-1);
  const slice = filtered.slice(cur*PAGE_SIZE, cur*PAGE_SIZE + PAGE_SIZE);
  return <>
    <h2>Reader — everything readable on {date} <span className="pill">{words.length} words</span> <span className="muted" style={{fontSize:'.78rem'}}>· click a gloss for its single-reading page (sky map · year timeline · Wikipedia)</span></h2>
    <div className="controls" style={{marginBottom:8}}>
      <input type="text" placeholder="search by gloss or transliteration…" value={q} onChange={e=>setQ(e.target.value)} style={{flex:'1 1 240px'}} autoFocus aria-label="Search readable words"/>
    </div>
    <div className="muted" style={{marginBottom:6, fontSize:'.8rem'}}>Select filters, then choose a mode. <b>Include ✓</b> keeps only words matching <b>all</b> selected filters; <b>Exclude ✗</b> drops words matching <b>any</b> selected filter. With no filter selected, all words show. Glosses are Strong's English.</div>
    <div className="controls" style={{marginBottom:8, flexWrap:'wrap', alignItems:'center'}}>
      <span className="muted" style={{fontSize:'.8rem'}}>filters:</span>
      <FilterChip active={sel.has('date')} count={dateCount} label="date-specific" title="Words with zodiac simples (date signal). Include = only date-specific; exclude = only always-readable" onToggle={()=>toggle('date')}/>
      <FilterChip active={sel.has('pal')} count={palCount} label="palindrome" title="Consonant palindrome (reads the same backwards)" onToggle={()=>toggle('pal')}/>
      <FilterChip active={sel.has('g37')} count={g37Count} label="gematria ×37" title="Gematria is a multiple of 37" onToggle={()=>toggle('g37')}/>
      <FilterChip active={sel.has('angel')} count={angelCount} label="angel name" title="A known angel name in Hebrew — Bible, Apocrypha, 1 Enoch watchers, Kabbalah, Islamic/Judeo-Arabic (Michael, Gabriel, Raphael, Uriel, Metatron, Sandalphon, Raziel, Azrael, the Watchers…). Matched by consonants, not suffix." onToggle={()=>toggle('angel')}/>
      <FilterChip active={sel.has('name')} count={nameCount} label="name (proper)" title="The word is a proper noun (name) in Strong — incl. theophoric names bearing אל / יה" onToggle={()=>toggle('name')}/>
      <FilterChip active={sel.has('place')} count={placeCount} label="place (LUGAR)" title="The word is a biblical PLACE — a proper locative noun in Strong (n-pr-loc): city, mountain, region, etc." onToggle={()=>toggle('place')}/>
      <FilterChip active={sel.has('comp')} count={compCount} label="compound" title="Concatenated multi-root entry whose gloss is truncated (e.g. 'dove of')" onToggle={()=>toggle('comp')}/>
      <span className="muted" style={{fontSize:'.8rem',marginLeft:4}}>·</span>
      <FilterChip active={sel.has('special')} count={specialCount} label="special" title="Empirically rare this year: required simples co-occupied < 20% of days (green). Include = only rare/special words" onToggle={()=>toggle('special')}/>
      <FilterChip active={sel.has('frequent')} count={frequentCount} label="frequent" title="Empirically moderate this year: required simples co-occupied 20–50% of days (rose)" onToggle={()=>toggle('frequent')}/>
      <FilterChip active={sel.has('common')} count={commonCount} label="common" title="Empirically common this year: required simples co-occupied ≥ 50% of days (red) — incl. always-readable words (no simples)" onToggle={()=>toggle('common')}/>
      <span className="muted" style={{fontSize:'.8rem', marginLeft:6}}>mode:</span>
      <button className={mode==='include'?'on':''} onClick={()=>setMode('include')} title="Keep only words matching ALL selected filters" aria-pressed={mode==='include'}>✓ include</button>
      <button className={mode==='exclude'?'ex':''} onClick={()=>setMode('exclude')} title="Drop words matching ANY selected filter" aria-pressed={mode==='exclude'}>✗ exclude</button>
      {sel.size>0 && <button onClick={()=>setSel(new Set())} title="Clear all selected filters" style={{fontSize:'.78rem'}}>clear ({sel.size})</button>}
    </div>
    <div className="controls" style={{marginBottom:8, flexWrap:'wrap', alignItems:'center'}}>
      <span className="muted">min length</span>
      <input type="number" min="1" max="12" value={minLen} onChange={e=>{const n=parseInt(e.target.value,10); setMinLen(isNaN(n)||n<1?1:n);}} style={{width:56}} aria-label="Minimum word length"/>
      <span className="muted">{filtered.length} shown · {alwaysCount} always-readable</span>
    </div>
    <div className="muted" style={{marginBottom:8}}>
      Reading rule applied: every <b>simple (zodiac) letter</b> in a word must sit in an <b>occupied sign</b> today. Mothers + doubles are always available. Available today: <b style={{color:'var(--gold)'}}>{[...occ].sort().join(' ')||'none'}</b>. <span style={{color:'var(--violet)'}}>violet</span> = always readable (no simples). Badges: <span style={{color:'var(--gold)'}}>palindrome</span> · <span style={{color:'var(--green)'}}>×37</span> · <span style={{color:'var(--violet)'}}>angel name</span> · <span style={{color:'var(--brand-hi)'}}>name</span> · <span style={{color:'var(--warn)'}}>compound</span>. <span className="prob ok">%</span> = empirical legibility over the scanned year (computed from astronomy-engine, not hardcoded): <span className="prob ok">green</span> special (rare), <span className="prob mid">rose</span> frequent, <span className="prob spec">red</span> common. <b>This within-year % measures only how often a word's required simples are co-occupied as the planets drift this year — it is NOT the recurrence of a specific stellar alignment.</b> A particular sky configuration recurs over years → centuries → millennia (the precalculated rare grand conjunctions in the <b>Alignments</b> subtab, §15c.11); a reading during such a rare alignment is the significant one, while ordinary readability is the common noise floor (~1 day in 9, ~2031 names/day). Sorted: longest first.
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
          {probsAll.has(w.he) && (()=>{ const p=probsAll.get(w.he); const n=genData.dayOccs.length; const pct = p<0.001 ? '<0.1' : (p*100).toFixed(p<0.1?1:0); const cls = p>=0.5 ? 'spec' : p>=0.2 ? 'mid' : 'ok'; const tag = p>=0.5 ? 'common' : p>=0.2 ? 'frequent' : 'special'; return <span className={'prob '+cls} title={`Empirical legibility over ${n} days of ${genData.year}: ${pct}% of days this word's required simples are all occupied (S⊆O, computed from astronomy-engine — not hardcoded). This is a within-year rate, NOT the recurrence of a specific stellar alignment: a particular sky configuration recurs over years→centuries→millennia (rare grand conjunctions, §15c.11). Low % = special/rare (green); high % = common (red).`}>{pct}% · {tag}</span>; })()}
          {w.angelName && <div className="simp" style={{color:'var(--violet)'}}>angel: {w.angelName.en} <span style={{color:'var(--dim)'}}>· {w.angelName.src}</span></div>}
          {w.angel && <div className="simp" style={{color:'var(--violet)'}}>Shem triplet +אל → <span className="he" style={{fontSize:'.95rem'}}>{w.angel.el}</span> · +יה → <span className="he" style={{fontSize:'.95rem'}}>{w.angel.yh}</span></div>}
          <div className="simp">{w.simp ? ('simples: '+[...w.simp].join(' ')) : 'no simples (always)'}</div>
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

function GlossPage({word, date, rows, occ, genData, onBack, nameRefs}){
  const w = word;
  const req = w.simp ? [...w.simp] : [];
  // Year legibility timeline: which days of the scanned Predictor year this word's
  // required simples are all occupied (S⊆O). Empirical, from astronomy-engine dayOccs.
  const tl = useMemo(()=>{
    if(!genData || !genData.dayOccs || !req.length) return null;
    const n=genData.dayOccs.length;
    const onDays=[];
    for(let i=0;i<n;i++){ let ok=true; for(const c of req){ if(!genData.dayOccs[i].has(c)){ ok=false; break; } } if(ok) onDays.push(i); }
    const curDoy = (()=>{ const d=parseDate(date); if(!d||d.getUTCFullYear()!==genData.year) return -1;
      return Math.floor((d.getTime()-Date.UTC(d.getUTCFullYear(),0,1,12))/86400000); })();
    return { n, onDays, daySet:new Set(onDays), curDoy };
  },[genData,date,w]);

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
  const readableNow = !req.length ? true : missing.length===0;
  const probsAll = (()=>{ if(!tl||!req.length) return null; const pct=(tl.onDays.length/tl.n*100); return pct; })();
  // KPI derivations: empirical within-year legibility rate + traffic-light category, matching
  // the inline card's prob badge (green=special/rare, rose=frequent, red=common).
  const prob = (tl && req.length) ? tl.onDays.length/tl.n : 1;
  const pctStr = req.length ? (prob<0.001?'<0.1':(prob*100).toFixed(prob<0.1?1:0)) : '100';
  const cat = req.length ? (prob>=0.5?'common':prob>=0.2?'frequent':'special') : 'always';
  const catCls = req.length ? (prob>=0.5?'spec':prob>=0.2?'mid':'ok') : 'ok';

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
        <div className="sub">{readableNow?'readable — all simples occupied':'missing '+missing.join(' ')}</div>
      </div>
      <div className="kpi">
        <div className="v">{w.len}</div>
        <div className="l">consonants</div>
      </div>
      <div className="kpi">
        <div className="v" style={{color:'var(--gold)'}}>{w.gem}</div>
        <div className="l">gematria{w.m37?' · ×37':''}</div>
      </div>
      <div className={'kpi '+catCls}>
        <div className="v">{pctStr}{req.length?'%':''}</div>
        <div className="l">year legibility</div>
        <div className="sub">{cat}</div>
      </div>
      <div className="kpi">
        <div className="v">{tl? `${tl.onDays.length}/${tl.n}`:'—'}</div>
        <div className="l">readable days</div>
      </div>
      <div className="kpi">
        <div className="v" style={{color: req.length?'var(--violet)':'var(--green)'}}>{req.length? req.length : '0'}</div>
        <div className="l">simple letters</div>
        <div className="sub">{req.length? [...w.simp].join(' ') : 'none · always'}</div>
      </div>
    </div>

    <div className="grid2" style={{alignItems:'start'}}>
      <div className="panel" style={{padding:14}}>
        <div className="muted" style={{marginBottom:8,fontSize:'.8rem'}}>
          {readableNow
            ? <span style={{color:'var(--green)'}}>● readable on {displayDate(date)} — all required simples occupied</span>
            : <span style={{color:'var(--red)'}}>○ not readable on {displayDate(date)} — missing: <b style={{color:'var(--gold)'}}>{missing.join(' ')}</b></span>}
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
            <tr><th>Length</th><td>{w.len} consonants</td></tr>
            <tr><th>Gematria</th><td><b style={{color:'var(--gold)'}}>{w.gem}</b>{w.m37 && <span style={{color:'var(--green)'}}> · multiple of 37</span>}</td></tr>
            <tr><th>Simple letters</th><td>{w.simp ? <span style={{color:'var(--blue)'}}>{[...w.simp].join(' ')}</span> : <span style={{color:'var(--violet)'}}>none (always readable)</span>}</td></tr>
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
      <h3 style={{marginTop:0}}>Year legibility — when {w.disp} is readable in {genData?genData.year:'the scanned year'}</h3>
      <div className="muted" style={{marginBottom:10,fontSize:'.82rem'}}>
        Each cell = one day of the scanned Predictor year (computed from astronomy-engine, not hardcoded). <span style={{color:'var(--gold)'}}>gold</span> = the required simples are all occupied that day (S⊆O); <span style={{color:'var(--green)'}}>green outline</span> = {displayDate(date)}.
        {req.length===0 && ' This word has no simple letters, so it is always readable — every day is gold.'}
      </div>
      {tl ? (
        <>
          <div className="tl" role="img" aria-label={`${w.translit}: ${tl.onDays.length} readable days in ${genData.year}`}>
            {Array.from({length:tl.n},(_,i)=>{
              const on=tl.daySet.has(i);
              return <div key={i} className={'d'+(on?' on':'')+(i===tl.curDoy?' cur':'')} title={`${genData.year}-${String(i+1).padStart(3,'0')} (day ${i+1})${on?' · readable':''}${i===tl.curDoy?' · current':''}`}></div>;
            })}
          </div>
          <div className="legend">
            {req.length===0
              ? <>every day · {tl.n} days</>
              : <>{tl.onDays.length} of {tl.n} days ({probsAll!=null?probsAll.toFixed(probsAll<1?1:0):'?'}%) · first {tl.onDays.length?displayDate(fmtDate(makeDate(genData.year,1,1+tl.onDays[0]))):'—'} · last {tl.onDays.length?displayDate(fmtDate(makeDate(genData.year,1,1+tl.onDays[tl.onDays.length-1]))):'—'}</>}
          </div>
        </>
      ) : <div className="muted">Run the Predictor scan for this year to see the day-by-day timeline.</div>}
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
