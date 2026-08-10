// tabs/CodesTab.jsx — ELS / Temurah / Ziruph
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SIGNS, SIMPLE, LETTER_TO_SIGN, DOUBLES, MOTHERS, BODIES, GLYPH, WEEK, FIN2REG, REG2FIN, SIMPLE_LETTERS, GV, norm, displayHe, gematria, simpleSet, formable, isPalindrome, ANGEL_LEXICON, ANGEL_NAME_MAP, readableWords, daysInMonth, makeDate, parseDate, fmtDate, BODIES7, skyAtSet, skyAt, skyAt7, occupiedLetters, bySign, GENESIS, genesisReadable, GEN_TOTAL, GEN_VALUES, PREC, AGE, FULL, AYANAMSIS, SYN, DRAC, ANOM, TROP, ECLY, HALAKIM_DAY, MOLAD, EQUINOX_LON, ageBoundaries, yrLabel, ERA_WINDOWS, FINALS, letterVal, reduce9, LO_SHU, LO_POS, sigilPath, aiqGroups, siamese, doublyEven, singlyEven, buildMagic, isMagic, KAMEOT, GREEK, isopsephy, ABJAD, ABJAD_NAME, abjad, KTP, katapayadi, countSubset, MON, MONTHNAMES, displayDate } from '../core.jsx';
import { SkyMap, KameaGrid, Fig, DateEntry, YearInput, SubTabs } from '../ui.jsx';
import { loadPsalmsData } from './PsalmsTab.jsx';

// ====== Codes — ELS · Temurah · Ziruph (JS ports of torahcodespython + sophia space) ======
//   ELS grid   — github.com/pedroelbanquero/torahcodespython (resources/func/torah.py `els`):
//                a single global counter walks the book consonants; every Nth char (1-based
//                positions N, 2N, 3N … = 0-based N-1, 2N-1, …) is collected. We run it on the
//                cleaned Genesis consonant string (78069 letters, maqaf-stripped) already bundled
//                for the Psalms tab, and lay it out as a search matrix whose last column is the ELS.
//   Temurah    — huggingface.co/spaces/cryptocalypse/sophia_ai_robot_prophet lib/temuraeh.py:
//                pair each alphabet letter with its mirror (reverse=True). The cited example
//                BAPHOMET = בפומת → שופיא = SOPHIA is reproduced exactly.
//   Ziruph     — sophia space lib/ziruph.py: Kircher substitution with a case-swap (the source
//                `encrypt`/`decrypt`). The source never splits its key string (a bug that injects
//                spaces for half the alphabet); we split the dictionary into letters and run the
//                cipher as intended, so it actually round-trips. Custom dictionary supported.

const HEB_ALPHA = 'אבגדהוזחטיכלמנסעפצקרשת';      // 22 letters, no finals (matches sophia source)
const LAT_ALPHA = 'abcdefghijklmnopqrstuvwxyz';
const GRK_ALPHA = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ';     // 24 greek letters

function atbashMap(alpha){
  const rev=[...alpha].reverse().join('');
  const m={};
  for(let i=0;i<alpha.length;i++) m[alpha[i]]=rev[i];
  return m;
}
// sophia temuraeh.temurah(reverse=True): map each letter to its mirror. Hebrew finals are
// normalized to base form first (proper atbash); the cited בפומת example has no finals, so the
// output is byte-identical to the source (שופיא). Latin is case-preserving (source left uppercase
// unchanged — a quirk; we map both cases, so lowercase results match the source exactly).
function temurah(text, alphabet){
  const m=atbashMap(alphabet);
  let out='';
  for(const ch of text){
    if(alphabet===LAT_ALPHA){
      const low=ch.toLowerCase();
      if(Object.prototype.hasOwnProperty.call(m,low)){ out += ch===ch.toUpperCase() ? m[low].toUpperCase() : m[low]; continue; }
      out += ch;
    } else {
      const base=FIN2REG[ch]||ch;          // hebrew final → base
      if(Object.prototype.hasOwnProperty.call(m,base)){ out += m[base]; continue; }
      out += ch;
    }
  }
  return out;
}

// torahcodes `els`: every Nth consonant, 1-based start. Forward-only, across the whole book.
function elsForward(text, skip){
  if(skip<1 || !text) return '';
  const L=text.length;
  let out=''; for(let p=skip-1; p<L; p+=skip) out+=text[p];
  return out;
}
// torahcodes Torah.gcode (Latin gematria used to turn a search term into a skip), digits added.
const TC_GCODE = {a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:600,k:10,l:20,m:30,n:40,o:50,p:60,q:70,r:80,s:90,t:100,u:200,v:700,w:900,x:300,y:400,z:500};
function tcGematria(s){
  let t=0;
  for(const ch of s){
    if(/[0-9]/.test(ch)) t+=parseInt(ch,10);
    else { const v=TC_GCODE[ch.toLowerCase()]; if(v) t+=v; }
  }
  return t;
}
function termGematria(term){
  return /[א-ת]/.test(term) ? gematria(norm(term)) : tcGematria(term);   // Hebrew→GV, else Latin gcode
}

// Ziruph — Kircher substitution with case-swap. 25-letter key ⇒ I/J merged (J shares I's slot).
function ziruphKey(rawKey){ return rawKey.trim().split(/\s+/).filter(Boolean); }
function ziruphEncrypt(text, keyArr){
  const n=keyArr.length;
  function idx(ch){ let i=ch.toUpperCase().charCodeAt(0)-65; if(i<0||i>25) return -1; if(n===25 && i>8) i-=1; return i; }
  let out='';
  for(const ch of text){
    if(/[A-Za-z]/.test(ch)){
      const i=idx(ch);
      if(i<0||i>=n){ out+=ch; continue; }
      const mapped=keyArr[i];
      out += ch===ch.toUpperCase() ? mapped.toLowerCase() : mapped.toUpperCase();  // Kircher case-swap
    } else out+=ch;
  }
  return out;
}
function ziruphDecrypt(text, keyArr){
  const n=keyArr.length;
  const rev=new Map();
  for(let i=0;i<n;i++) rev.set(keyArr[i].toUpperCase(), i);
  let out='';
  for(const ch of text){
    if(/[A-Za-z]/.test(ch)){
      const i=rev.get(ch.toUpperCase());
      if(i==null){ out+=ch; continue; }
      let ai=i; if(n===25 && ai>=8) ai+=1;                // undo I/J merge → restore alphabet index
      const letter=String.fromCharCode(65+ai);
      out += ch===ch.toUpperCase() ? letter.toLowerCase() : letter.toUpperCase();
    } else out+=ch;
  }
  return out;
}

function ElsSubTab(){
  const [term,setTerm]=useState('אלהים');
  const [manualSkip,setManualSkip]=useState('');
  const [ctxCols,setCtxCols]=useState(14);
  const [rows,setRows]=useState(42);
  const [data,setData]=useState(null);
  const [err,setErr]=useState(null);
  const [finds,setFinds]=useState(null);
  const [finding,setFinding]=useState(false);
  useEffect(()=>{ loadPsalmsData().then(d=>setData(d.elsText)).catch(e=>setErr(e.message)); },[]);
  const hasHebrew=/[א-ת]/.test(term);
  const tGem=termGematria(term);
  const ms=manualSkip.trim();
  const skip = ms!=='' ? (parseInt(ms,10)||tGem) : (tGem||1);
  const els=useMemo(()=> data?elsForward(data,skip):'', [data,skip]);
  const matrix=useMemo(()=>{
    if(!data||skip<1) return [];
    const R=Math.min(rows, Math.floor(data.length/skip));
    const out=[];
    for(let k=0;k<R;k++){
      const end=(k+1)*skip;
      const start=Math.max(0, end-ctxCols);
      out.push(data.slice(start,end));
    }
    return out;
  },[data,skip,ctxCols,rows]);
  function findAny(){
    setFinding(true); setFinds(null);
    setTimeout(()=>{
      const t=norm(term);
      if(!t||!data){ setFinding(false); return; }
      const maxSkip=2000; const res=[];
      outer: for(let s=2;s<=maxSkip;s++){
        const e=elsForward(data,s);
        let idx=e.indexOf(t);
        while(idx!==-1){ res.push({skip:s, pos:idx, els:e.length, snippet:e.slice(Math.max(0,idx-5),idx+t.length+5)});
          if(res.length>=60) break outer; idx=e.indexOf(t,idx+1); }
      }
      setFinds(res); setFinding(false);
    },20);
  }
  return <>
    <h3>ELS search grid — Equidistant Letter Sequence over Genesis</h3>
    <div className="muted" style={{marginBottom:10}}>A JS port of the <i>torahcodes</i> library (<code>github.com/pedroelbanquero/torahcodespython</code>, <code>torah.els</code>). A single counter walks the Genesis consonants and picks every <b>N</b>th letter (1-based positions N, 2N, 3N…). The <b>gematria of a search term</b> sets N; the extracted letters are laid out as a matrix whose <b>last column is the ELS</b> (highlighted gold) — the hidden word reads <i>down</i> that column. Source text = the cleaned 78069-letter Genesis (maqaf-stripped, identical to upstream).</div>
    <div className="controls" style={{marginBottom:10}}>
      <input type="text" value={term} onChange={e=>setTerm(e.target.value)} placeholder="search term (Hebrew or Latin)" style={{flex:'1 1 240px',direction:hasHebrew?'rtl':'ltr'}}/>
      <input type="number" value={manualSkip} onChange={e=>setManualSkip(e.target.value)} placeholder="skip (auto = gematria)" style={{width:170}}/>
      <button onClick={()=>setManualSkip('')} className="linkish">auto</button>
    </div>
    {err && <div className="note" style={{color:'var(--red)'}}>{err}</div>}
    {data && <>
      <table><tbody>
        <tr><th>term</th><td><span className="he" style={{direction:'rtl'}}>{term||'—'}</span> <span className="muted">({hasHebrew?'Hebrew GV':'Latin gcode'})</span></td></tr>
        <tr><th>gematria → skip (N)</th><td className="big" style={{color:'var(--gold)'}}>{tGem}{ms!=='' && <span className="muted"> (manual: {skip})</span>}</td></tr>
        <tr><th>Genesis letters</th><td>{data.length}</td></tr>
        <tr><th>ELS length</th><td>{els.length} letters</td></tr>
      </tbody></table>

      <h3>ELS string (every {skip}-th letter)</h3>
      <div className="he" style={{direction:'rtl',fontSize:'1.15rem',lineHeight:1.8,wordBreak:'break-all',maxHeight:'7em',overflow:'auto',marginBottom:10,padding:'6px 8px',background:'var(--panel2)',border:'1px solid var(--line)',borderRadius:8}}>{els||' '}</div>

      <div className="controls" style={{marginBottom:10}}>
        <span className="muted">context columns</span>
        <input type="number" min={4} max={60} value={ctxCols} onChange={e=>setCtxCols(Math.max(4,Math.min(60,parseInt(e.target.value,10)||14)))} style={{width:70}}/>
        <span className="muted">rows</span>
        <input type="number" min={5} max={200} value={rows} onChange={e=>setRows(Math.max(5,Math.min(200,parseInt(e.target.value,10)||42)))} style={{width:70}}/>
        <span className="muted" style={{marginLeft:'auto'}}>ELS column = rightmost (gold)</span>
      </div>
      <div className="els-grid" style={{'--cols':ctxCols}}>
        {matrix.map((row,k)=>(
          <div key={k} className="els-row">
            {[...row].map((c,i)=> <span key={i} className={'els-cell'+(i===row.length-1?' hl':'')}>{c}</span>)}
          </div>
        ))}
      </div>
      <div className="muted" style={{marginTop:6}}>Row {0}…{matrix.length-1} of the matrix; the gold rightmost cell of each row is the (k+1)-th ELS letter — read top-to-bottom to recover the ELS string above.</div>

      <h3>Find this word at any skip (2–2000)</h3>
      <div className="muted" style={{marginBottom:8}}>Scans every skip and reports where the literal term appears in the forward ELS (the classic “Torah codes” term search).</div>
      <button onClick={findAny} disabled={finding||!data} className="btn-cta">{finding?'Scanning…':'Find at any skip →'}</button>
      {finds && (finds.length===0
        ? <div className="note">No occurrences of <span className="he">{term}</span> found in any forward ELS of skip 2–2000.</div>
        : <>
          <div className="note">{finds.length} occurrence{finds.length>1?'s':''} (capped at 60):</div>
          <table><thead><tr><th>skip</th><th>position in ELS</th><th>ELS length</th><th>snippet</th></tr></thead><tbody>
            {finds.map((f,i)=> <tr key={i}><td className="deg" style={{color:'var(--gold)'}}>{f.skip}</td><td className="deg">{f.pos}</td><td className="deg">{f.els}</td><td className="he" style={{direction:'rtl'}}>{f.snippet}</td></tr>)}
          </tbody></table>
        </>)}
    </>}
  </>;
}

function TemurahSubTab(){
  const [text,setText]=useState('בפומת');
  const [lang,setLang]=useState('Hebrew');
  const alpha = lang==='Hebrew'?HEB_ALPHA : lang==='Latin'?LAT_ALPHA : GRK_ALPHA;
  const out = temurah(text, alpha);
  const m=atbashMap(alpha);
  const pairs=[];
  for(let i=0;i<alpha.length;i++){ const a=alpha[i],b=m[a]; if(i<alpha.length/2) pairs.push([a,b]); }
  return <>
    <h3>Temurah / Atbash — the mirror cipher</h3>
    <div className="muted" style={{marginBottom:10}}>A JS port of <code>sophia_ai_robot_prophet</code> <i>lib/temuraeh.py</i> (<code>temurah(reverse=True)</code>): each letter of the alphabet is paired with its mirror (א↔ת, ב↔ש …). The classic Templar example is reproduced exactly: <b>BAPHOMET</b> = <span className="he">בפומת</span> → <span className="he">שופיא</span> = <b>SOPHIA</b>.</div>
    <div className="controls" style={{marginBottom:10}}>
      <input type="text" value={text} onChange={e=>setText(e.target.value)} placeholder="text to encode" style={{flex:'1 1 280px',direction:lang==='Hebrew'?'rtl':'ltr'}}/>
      <select value={lang} onChange={e=>setLang(e.target.value)} style={{flex:'0 0 140px'}}>
        <option value="Hebrew">Hebrew (22)</option>
        <option value="Latin">Latin (26)</option>
        <option value="Greek">Greek (24)</option>
      </select>
    </div>
    <div className="grid2">
      <div className="iv"><div className="muted" style={{marginBottom:4}}>Input</div><div className="he" style={{direction:lang==='Hebrew'?'rtl':'ltr',fontSize:'1.5rem',lineHeight:1.6,wordBreak:'break-all'}}>{text||' '}</div></div>
      <div className="iv"><div className="muted" style={{marginBottom:4}}>Temurah / Atbash</div><div className="he" style={{direction:lang==='Hebrew'?'rtl':'ltr',fontSize:'1.5rem',lineHeight:1.6,wordBreak:'break-all',color:'var(--gold)'}}>{out||' '}</div></div>
    </div>
    <h3 style={{marginTop:14}}>Substitution table — {lang}</h3>
    <div className="kbox" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(74px,1fr))',gap:6,textAlign:'center'}}>
      {pairs.map(([a,b],i)=> <div key={i} className="chip" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:4}}><span className="he" style={{color:'var(--dim)'}}>{a}</span><span className="muted">↔</span><span className="he" style={{color:'var(--gold)'}}>{b}</span></div>)}
    </div>
    {lang==='Hebrew' && <div className="note" style={{marginTop:10}}>Final forms (ך ם ן ף ץ) are normalized to their base letter before the mirror, so the cipher is a proper atbash. The cited <span className="he">בפומת</span> contains no finals, so the output <span className="he">שופיא</span> is byte-identical to the upstream Python (<code>temura_conv('בפומת','Hebrew')</code> → <span className="he">שופיא</span>).</div>}
  </>;
}

function ZiruphSubTab(){
  const [text,setText]=useState('BAPHOMET');
  const [dict,setDict]=useState('C X Y B W P R V Q J Z M N T K E L D F G H I O U S');
  const [mode,setMode]=useState('encrypt');
  const keyArr=ziruphKey(dict);
  const n=keyArr.length;
  const out = mode==='encrypt' ? ziruphEncrypt(text,keyArr) : ziruphDecrypt(text,keyArr);
  const roundtrip = ziruphDecrypt(ziruphEncrypt(text,keyArr),keyArr);
  // build A→? preview (first 26)
  const preview=[];
  for(let i=0;i<26;i++){ const ch=String.fromCharCode(65+i); let idx=i; if(n===25 && idx>8) idx-=1; preview.push([ch, idx<n?keyArr[idx]:'—']); }
  return <>
    <h3>Ziruph — Kircher substitution cipher</h3>
    <div className="muted" style={{marginBottom:10}}>A JS port of <code>sophia_ai_robot_prophet</code> <i>lib/ziruph.py</i>. Kircher’s <b>Ziruph</b> substitutes each letter from a key alphabet and <b>swaps case</b> (uppercase→lowercase, lowercase→uppercase, as in the source). The upstream code never split its key string — a bug that injected spaces for half the alphabet — so it could not round-trip; here the dictionary is split into letters and the cipher runs as intended (with I/J merged for a 25-letter key), so encrypt→decrypt restores the plaintext letters. Custom dictionary supported.</div>
    <div className="controls" style={{marginBottom:8}}>
      <input type="text" value={text} onChange={e=>setText(e.target.value)} placeholder="text" style={{flex:'1 1 220px'}}/>
      <div className="chips">
        <button className={'subtab'+(mode==='encrypt'?' active':'')} onClick={()=>setMode('encrypt')}>Encrypt</button>
        <button className={'subtab'+(mode==='decrypt'?' active':'')} onClick={()=>setMode('decrypt')}>Decrypt</button>
      </div>
    </div>
    <div className="controls" style={{marginBottom:10}}>
      <input type="text" value={dict} onChange={e=>setDict(e.target.value)} style={{flex:'1 1 460px',fontFamily:'monospace'}}/>
      <span className="muted">{n} letters {n===25?'(I/J merged)':'(A–Z)'}</span>
    </div>
    <div className="grid2">
      <div className="iv"><div className="muted" style={{marginBottom:4}}>{mode==='encrypt'?'Plaintext':'Ciphertext'}</div><div style={{fontSize:'1.3rem',wordBreak:'break-all'}}>{text||' '}</div></div>
      <div className="iv"><div className="muted" style={{marginBottom:4}}>{mode==='encrypt'?'Ciphertext':'Plaintext'} (case-swapped)</div><div style={{fontSize:'1.3rem',wordBreak:'break-all',color:'var(--gold)'}}>{out||' '}</div></div>
    </div>
    <h3 style={{marginTop:14}}>Key map (A→?)</h3>
    <div className="kbox" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(64px,1fr))',gap:6,textAlign:'center'}}>
      {preview.map(([a,b])=> <div key={a} className="chip" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:4}}><b style={{color:'var(--dim)'}}>{a}</b><span className="muted">→</span><b style={{color:'var(--gold)'}}>{b}</b></div>)}
    </div>
    <div className="note" style={{marginTop:10}}>Round-trip (encrypt then decrypt) restores the letters: <b>{text}</b> → <span style={{color:'var(--gold)'}}>{ziruphEncrypt(text,keyArr)}</span> → <b style={{color:'var(--green)'}}>{roundtrip}</b> (case may swap, per the Kircher case-swap).</div>
  </>;
}

function CodesTab({sub, setSubTab}){
  const subtabs=[['els','ELS grid'],['temurah','Temurah / Atbash'],['ziruph','Ziruph']];
  return <>
    <h2>Codes — ELS · Temurah · Ziruph</h2>
    <div className="muted" style={{marginBottom:10}}>Three kabbalistic ciphers, ported to JavaScript from their original Python and bundled for in-browser use. <b>ELS</b> lays the Torah as a search matrix (source: <code>pedroelbanquero/torahcodespython</code>); <b>Temurah</b> and <b>Ziruph</b> are substitution ciphers (source: <code>cryptocalypse/sophia_ai_robot_prophet</code>). Nothing leaves your browser.</div>
    <SubTabs items={subtabs} active={sub} onChange={setSubTab}/>
    {sub==='els' && <ElsSubTab/>}
    {sub==='temurah' && <TemurahSubTab/>}
    {sub==='ziruph' && <ZiruphSubTab/>}
  </>;
}

export { CodesTab, ElsSubTab, TemurahSubTab, ZiruphSubTab };
