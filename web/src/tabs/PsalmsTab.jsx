// tabs/PsalmsTab.jsx — Daily Psalms (JS port of daily-psalms-api)
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SIGNS, SIMPLE, LETTER_TO_SIGN, DOUBLES, MOTHERS, BODIES, GLYPH, WEEK, FIN2REG, REG2FIN, SIMPLE_LETTERS, GV, norm, displayHe, gematria, simpleSet, formable, isPalindrome, ANGEL_LEXICON, ANGEL_NAME_MAP, readableWords, daysInMonth, makeDate, parseDate, fmtDate, BODIES7, skyAtSet, skyAt, skyAt7, occupiedLetters, bySign, GENESIS, genesisReadable, GEN_TOTAL, GEN_VALUES, PREC, AGE, FULL, AYANAMSIS, SYN, DRAC, ANOM, TROP, ECLY, HALAKIM_DAY, MOLAD, EQUINOX_LON, ageBoundaries, yrLabel, ERA_WINDOWS, FINALS, letterVal, reduce9, LO_SHU, LO_POS, sigilPath, aiqGroups, siamese, doublyEven, singlyEven, buildMagic, isMagic, KAMEOT, GREEK, isopsephy, ABJAD, ABJAD_NAME, abjad, KTP, katapayadi, countSubset, MON, MONTHNAMES, displayDate } from '../core.jsx';
import { SkyMap, KameaGrid, Fig, DateEntry, YearInput, SubTabs } from '../ui.jsx';

// ====== Daily Psalms (JS port of gitlab.com/ch-zz/daily-psalms-api, /api/psalm) ======
// Default pipeline (calendar=gregorian, adjusted_sum=true, subharmonic=true):
//   name + date-in-words  ->  Latin/Hebrew gematria sum  ->  +sum/137.035999177 (ceil) adjustment
//   ->  ELS step (every Nth char) on Hebrew Genesis  ->  Hebrew gematria of the ELS string
//   ->  shortest Hebrew Psalms phrase with that gematria (subharmonic ÷2..÷128 fallback).
// calendar=jewish bypasses the ELS step and feeds the raw sum straight to the Psalm match
// (upstream behaviour). Data: web/data/genesis_els.json (the exact ELS source string, incl.
// maqafim) + web/data/psalms_he.json (Sefaria MT, 150 chapters). The phrase->gematria index is
// built in-browser on first use — no server, no .db (the upstream 418 MB SQLite index is
// rebuilt client-side from the reduced text), so it runs on a free static host.
const PSALM_ADJ = 137.035999177;
const SUBHARMONIC_DIVISORS = [1,2,4,8,16,32,64,128];

// Gematria map — verbatim copy of upstream gematria.py letter_to_value (Latin + Hebrew with
// final forms + Arabic + Greek + Katapayadi). Uppercase Latin is filled from lowercase below.
// NOTE: this is NOT the project's own GV (which uses regular, non-final Hebrew values); the
// psalms pipeline requires the upstream Mispar-Gadol finals (ך500 ם600 ן700 ף800 ץ900).
const PSALM_GEM = {
  a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:600,k:10,l:20,m:30,n:40,o:50,p:60,q:70,r:80,s:90,
  t:100,u:200,v:700,w:900,x:300,y:400,z:500,
  'ا':1,'أ':1,'إ':1,'آ':1,'ب':2,'ج':3,'د':4,'ه':5,'و':6,'ز':7,'ح':8,'ط':9,'ي':10,'ى':10,
  'ك':20,'ک':20,'ل':30,'م':40,'ن':50,'س':60,'ع':70,'ف':80,'ص':90,'ق':100,'ر':200,'ش':300,
  'ت':400,'ث':500,'خ':600,'ذ':700,'ض':800,'ظ':900,'غ':1000,'ٱ':1,'ـ':0,'ة':400,'ؤ':6,'ئ':10,
  'ء':1,'ٹ':400,'پ':2,'چ':3,'ژ':7,'گ':20,'ڭ':20,'ں':50,'ۀ':5,'ے':10,'؋':0,
  'א':1,'ב':2,'ג':3,'ד':4,'ה':5,'ו':6,'ז':7,'ח':8,'ט':9,'י':10,'כ':20,'ך':500,'ל':30,
  'מ':40,'ם':600,'נ':50,'ן':700,'ס':60,'ע':70,'פ':80,'ף':800,'צ':90,'ץ':900,'ק':100,'ר':200,'ש':300,'ת':400,
  'α':1,'β':2,'γ':3,'δ':4,'ε':5,'ϝ':6,'ζ':7,'η':8,'θ':9,'ι':10,'κ':20,'λ':30,'μ':40,'ν':50,
  'ξ':60,'ο':70,'π':80,'ϟ':90,'ρ':100,'σ':200,'τ':300,'υ':400,'φ':500,'χ':600,'ψ':700,'ω':800,'ϡ':900,
  'ς':200,'ϲ':200,
  'Α':1,'Β':2,'Γ':3,'Δ':4,'Ε':5,'Ϝ':6,'Ζ':7,'Η':8,'Θ':9,'Ι':10,'Κ':20,'Λ':30,'Μ':40,'Ν':50,
  'Ξ':60,'Ο':70,'Π':80,'Ϟ':90,'Ρ':100,'Σ':200,'Τ':300,'Υ':400,'Φ':500,'Χ':600,'Ψ':700,'Ω':800,'Ϡ':900,'Ϲ':200,
  'क':1,'ख':2,'ग':3,'घ':4,'ङ':5,'च':6,'छ':7,'ज':8,'झ':9,'ञ':0,'ट':1,'ठ':2,'ड':3,'ढ':4,'ण':5,
  'त':6,'थ':7,'द':8,'ध':9,'न':0,'प':1,'फ':2,'ब':3,'भ':4,'म':5,'य':1,'र':2,'ल':3,'व':4,'श':5,'ष':6,'स':7,'ह':8,
};
for(const _pk in PSALM_GEM){ if(_pk.length===1 && _pk>='a' && _pk<='z') PSALM_GEM[_pk.toUpperCase()]=PSALM_GEM[_pk]; }

function psalmStripDiacritics(text){
  // NFD then drop combining marks (Mn) + format chars (Cf) — mirrors unicodedata category filter.
  return String(text).normalize('NFD').replace(/[\p{Mn}\p{Cf}]/gu,'');
}
function psalmGematria(text){
  if(!text) return 0;
  let t=0; for(const c of text) t += PSALM_GEM[c]||0; return t;
}
function psalmGematriaSum(name, dateWords){
  const combined = `${name||''} ${dateWords||''}`;
  if(!combined.trim()) return null;
  const numbers = combined.match(/\d+/g) || [];
  const numberSum = numbers.reduce((a,n)=>a+parseInt(n,10),0);
  const textNoNums = combined.replace(/\d+/g,'');
  return psalmGematria(psalmStripDiacritics(textNoNums)) + numberSum;
}

// ---- date -> words (Gregorian) : port of utils.date_to_words, gregorian branch ----
const PSALM_ONES=['','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const PSALM_TENS=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
const PSALM_ORD_DAY=['','first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','eleventh','twelfth','thirteenth','fourteenth','fifteenth','sixteenth','seventeenth','eighteenth','nineteenth','twentieth','twenty-first','twenty-second','twenty-third','twenty-fourth','twenty-fifth','twenty-sixth','twenty-seventh','twenty-eighth','twenty-ninth','thirtieth','thirty-first'];
const PSALM_MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
const PSALM_HYPH_EXCL=new Set([30,40,50,60,70,80,90]);
function num2words(n){
  if(n===0) return 'zero';
  if(n<0) return 'minus '+num2words(-n);
  if(n<20) return PSALM_ONES[n];
  if(n<100){ const t=Math.floor(n/10),o=n%10; return o?PSALM_TENS[t]+'-'+PSALM_ONES[o]:PSALM_TENS[t]; }
  if(n<1000){ const h=Math.floor(n/100),r=n%100; return r?PSALM_ONES[h]+' hundred '+num2words(r):PSALM_ONES[h]+' hundred'; }
  if(n<1000000){ const th=Math.floor(n/1000),r=n%1000; return r?num2words(th)+' thousand '+num2words(r):num2words(th)+' thousand'; }
  return String(n);
}
function psalmYearWords(year){
  if(year>=1100 && year<=1999){
    const century=Math.floor(year/100), rem=year%100;
    let yw = num2words(century)+' hundred';
    if(rem!==0){
      let rw = num2words(rem);
      if(rem>=21 && rem<=99 && !PSALM_HYPH_EXCL.has(rem)){
        const tens=Math.floor(rem/10)*10, ones=rem%10;
        if(ones!==0) rw = num2words(tens)+'-'+num2words(ones);
      }
      yw += ' '+rw;
    }
    return yw;
  }
  let yw = num2words(year);
  if(year>2000){
    const rem=year%100;
    if(rem>=21 && rem<=99 && !PSALM_HYPH_EXCL.has(rem)){
      const base=year-rem, tens=Math.floor(rem/10)*10, ones=rem%10;
      if(ones!==0) yw = num2words(base)+' '+num2words(tens)+'-'+num2words(ones);
    }
  } else if(year<1100){
    const rem=year%100;
    if(rem>=21 && rem<=99 && !PSALM_HYPH_EXCL.has(rem)){
      const thousands=Math.floor(year/1000)*1000;
      if(thousands){
        const tens=Math.floor(rem/10)*10, ones=rem%10;
        if(ones!==0) yw = num2words(thousands)+' '+num2words(tens)+'-'+num2words(ones);
      }
    }
  }
  return yw;
}
function dateToWordsGregorian(dateStr){
  let s = dateStr||'';
  if(/^\d{4}-00-00$/.test(s)) s = s.slice(0,4);
  else if(/^\d{4}-\d{2}-00$/.test(s)) s = s.slice(0,7);
  let year=null, month=null, dayOrd=null, m;
  if((m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s))){ year=+m[1]; month=+m[2]; dayOrd=PSALM_ORD_DAY[+m[3]]||null; }
  else if((m=/^(\d{4})-(\d{2})$/.exec(s))){ year=+m[1]; month=+m[2]; }
  else if((m=/^(\d{4})$/.exec(s))){ year=+m[1]; }
  else return '';
  const parts=[];
  const monthName=(month>=1&&month<=12)?PSALM_MONTHS[month-1]:null;
  if(dayOrd && monthName) parts.push(dayOrd, monthName);
  else if(monthName) parts.push(monthName);
  if(year!=null) parts.push(psalmYearWords(year).replace(/,/g,''));
  return parts.join(' ');
}

// ---- date -> words (Jewish) : port of utils.hebrew_date_to_words ----
// The input string is interpreted AS a Hebrew-calendar date (this is the upstream behaviour:
// /api/psalm passes the raw date_str to hebrew_date_to_words without Gregorian->Hebrew
// conversion, so calendar=jewish expects a Hebrew date string).
const HEBREW_MONTH_NAMES=['ניסן','אייר','סיוון','תמוז','אב','אלול','תשרי','חשוון','כסלו','טבת','שבט','אדר'];
const HEBREW_LEAP_MONTH_NAMES={12:'אדר א',13:'אדר ב'};
function hebrewDayWord(day){
  const base={1:'ראשון',2:'שני',3:'שלישי',4:'רביעי',5:'חמישי',6:'שישי',7:'שביעי',8:'שמיני',9:'תשיעי',10:'עשירי'};
  if(day<=10) return base[day]||'';
  if(day<20){ const o={1:'אחד',2:'שנים',3:'שלושה',4:'ארבעה',5:'חמשה',6:'ששה',7:'שבעה',8:'שמונה',9:'תשעה'}; return o[day-10]+' עשר'; }
  const tens={20:'עשרים',30:'שלושים'};
  if(tens[day]) return tens[day];
  const o={1:'אחד',2:'שנים',3:'שלושה',4:'ארבעה',5:'חמשה',6:'ששה',7:'שבעה',8:'שמונה',9:'תשעה'};
  return o[day-20]+' ועשרים';
}
function hebrewYearWord(year){
  const parts=[];
  if(year>=1000){
    const th={1:'אלף',2:'אלפיים',3:'שלושת אלפים',4:'ארבעת אלפים',5:'חמשת אלפים',6:'ששת אלפים',7:'שבעת אלפים',8:'שמונת אלפים',9:'תשעת אלפים'};
    const t=Math.floor(year/1000); if(th[t]) parts.push(th[t]); year-=t*1000;
  }
  const hundreds={100:'מאה',200:'מאתיים',300:'שלוש מאות',400:'ארבע מאות',500:'חמש מאות',600:'שש מאות',700:'שבע מאות',800:'שמונה מאות',900:'תשע מאות'};
  if(year>=100){ const h=Math.floor(year/100)*100; if(hundreds[h]) parts.push(hundreds[h]); year-=h; }
  const ones={1:'אחת',2:'שתים',3:'שלוש',4:'ארבע',5:'חמש',6:'שש',7:'שבע',8:'שמונה',9:'תשע'};
  const tens={10:'עשר',20:'עשרים',30:'שלושים',40:'ארבעים',50:'חמישים',60:'שישים',70:'שבעים',80:'שמונים',90:'תשעים'};
  if(year===0) {}
  else if(ones[year]) parts.push(ones[year]);
  else if(tens[year]) parts.push(tens[year]);
  else { const t=Math.floor(year/10)*10, o=year-t; if(ones[o]&&tens[t]) parts.push(ones[o]+' ו'+tens[t]); }
  return parts.join(' ו');
}
function dateToWordsJewish(dateStr){
  let s=dateStr||'';
  if(/^\d{4}-00-00$/.test(s)) s=s.slice(0,4);
  else if(/^\d{4}-\d{2}-00$/.test(s)) s=s.slice(0,7);
  let m;
  if((m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s))){
    const year=+m[1],month=+m[2],day=+m[3];
    if(month<1||month>13||day<1||day>30) return '';
    const bd=hebrewDayWord(day);
    const dayWord = bd.includes(' ') ? 'ה'+bd.split(' ')[0]+' '+bd.split(' ').slice(1).join(' ') : 'ה'+bd;
    const monthName=HEBREW_LEAP_MONTH_NAMES[month]||HEBREW_MONTH_NAMES[month-1];
    if(!monthName) return '';
    return `${dayWord} ב${monthName} שנת ${hebrewYearWord(year)}`;
  }
  if((m=/^(\d{4})-(\d{2})$/.exec(s))){
    const year=+m[1],month=+m[2]; if(month<1||month>13) return '';
    const monthName=HEBREW_LEAP_MONTH_NAMES[month]||HEBREW_MONTH_NAMES[month-1]; if(!monthName) return '';
    return `${monthName} שנת ${hebrewYearWord(year)}`;
  }
  if((m=/^(\d{4})$/.exec(s))) return `שנת ${hebrewYearWord(+m[1])}`;
  return '';
}

// ---- ELS + Psalms phrase index (built in browser) ----
// upstream torah.process_json_files with rounds="1,-1": a FORWARD pass concatenated
// with a BACKWARD pass. Each pass picks floor(len/step) characters.
//   forward : start index (step-1) % len, step +step
//   backward: start index (len-step) % len, step -step   (Python modulo — always ≥0)
// elsText is the cleaned Genesis consonant string (maqaf stripped, spaces stripped →
// 78069 Hebrew letters), matching upstream's clean_text exactly.
function elsGenesis(elsText, step){
  if(step<1 || !elsText) return '';
  const L = elsText.length;
  const base = Math.floor(L / step);     // chars per pass (= upstream chars_per_full_pass for abs_r=1)
  if(base === 0) return '';               // step ≥ len → no whole chars (abs_r=1, not >1 → 0 chars)
  const mod = x => ((x % L) + L) % L;     // Python-style always-non-negative modulo
  let out = '';
  // forward pass (r=+1)
  let idx = mod(step - 1);
  for(let k=0; k<base; k++){ out += elsText[idx]; idx = mod(idx + step); }
  // backward pass (r=-1)
  idx = mod(L - step);
  for(let k=0; k<base; k++){ out += elsText[idx]; idx = mod(idx - step); }
  return out;
}
let _PSALMS_CACHE=null, _PSALMS_PROMISE=null;
function loadPsalmsData(){
  if(_PSALMS_CACHE) return Promise.resolve(_PSALMS_CACHE);
  if(_PSALMS_PROMISE) return _PSALMS_PROMISE;
  _PSALMS_PROMISE = Promise.all([
    fetch('data/genesis_els.json').then(r=>{ if(!r.ok) throw new Error('genesis_els.json HTTP '+r.status); return r.json(); }),
    fetch('data/psalms_he.json').then(r=>{ if(!r.ok) throw new Error('psalms_he.json HTTP '+r.status); return r.json(); }),
  ]).then(([gen,ps])=>{ _PSALMS_CACHE={elsText:gen.text, psalms:ps, idx:null}; return _PSALMS_CACHE; });
  return _PSALMS_PROMISE;
}
function buildPsalmsIndex(psalms){
  // enumerate every contiguous word-run per verse; keep the SHORTEST phrase per gematria sum
  // (upstream: ORDER BY LENGTH(words) ASC LIMIT 1 — first encountered wins on ties, which
  // approximates SQLite rowid / insertion order).
  const idx=new Map();
  psalms.chapters.forEach((verses,ci)=>{
    const chapter=ci+1;
    verses.forEach((v,vi)=>{
      const verse=vi+1;
      const words=v.split(/\s+/).filter(w=>w.length>0);
      for(let i=0;i<words.length;i++){
        let run=[], g=0;
        for(let j=i;j<words.length;j++){
          const w=words[j];
          for(const c of w) g += PSALM_GEM[c]||0;
          run.push(w);
          const phrase=run.join(' ');
          const len=phrase.length;
          const prev=idx.get(g);
          if(!prev || len<prev.len) idx.set(g,{words:phrase,chapter,verse,len});
        }
      }
    });
  });
  return idx;
}
function findPsalmMatch(idx, gsum, useSubharmonic){
  if(gsum==null || gsum<1) return {match:null,divisor:null,queried:null};
  if(useSubharmonic){
    const g=+gsum;
    for(const d of SUBHARMONIC_DIVISORS){
      const q=Math.floor(g/d);
      if(q<1) break;
      const m=idx.get(q);
      if(m) return {match:m,divisor:d,queried:q};
    }
    return {match:null,divisor:null,queried:null};
  }
  const m=idx.get(gsum);
  return m ? {match:m,divisor:1,queried:gsum} : {match:null,divisor:1,queried:gsum};
}
async function computePsalm(name, dateStr, {adjusted=true, calendar='gregorian', subharmonic=true}={}){
  const data = await loadPsalmsData();
  if(!data.idx) data.idx = buildPsalmsIndex(data.psalms);
  const dateWords = calendar==='jewish' ? dateToWordsJewish(dateStr) : dateToWordsGregorian(dateStr);
  let rawGsum = psalmGematriaSum(name, dateWords);
  if(rawGsum==null) return {error:'Could not calculate the gematria sum — a name and/or a date is needed.'};
  const isAdj = adjusted && calendar!=='jewish';
  let gsum = isAdj ? Math.ceil(rawGsum + rawGsum/PSALM_ADJ) : rawGsum;
  let elsText='', elsGsum=gsum, bypassed=false;
  if(calendar==='jewish'){
    bypassed=true; // ELS scan of Genesis is skipped; raw sum feeds the Psalm match directly.
  } else {
    elsText = elsGenesis(data.elsText, gsum);
    elsGsum = psalmGematria(elsText);
  }
  const {match, divisor, queried} = findPsalmMatch(data.idx, elsGsum, subharmonic);
  return {
    input:{ name, date:dateStr, date_words:dateWords, calendar, raw_gematria_sum:rawGsum,
      initial_gematria_sum:gsum, adjusted:isAdj },
    els_result:{ text:elsText, step:gsum, book:'Genesis', gematria_sum:elsGsum, bypassed },
    psalm: match ? { words:match.words, chapter:match.chapter, verse:match.verse,
      reference:`Psalms ${match.chapter}:${match.verse}`,
      url:`https://www.biblegateway.com/passage/?search=Psalms+${match.chapter}&version=CJB`,
      queried_gematria_sum:queried, original_gematria_sum:elsGsum, subharmonic_divisor:divisor }
      : { error:'No matching Psalm found for the ELS gematria (even after subharmonic fallback).',
          queried_gematria_sum:queried, original_gematria_sum:elsGsum, subharmonic_divisor:divisor }
  };
}

function PsalmsTab(){
  const today = (()=>{ try{ return new Date().toISOString().slice(0,10); }catch(e){ return '2026-08-10'; } })();
  const [name,setName]=useState('');
  const [date,setDate]=useState(today);
  const [calendar,setCalendar]=useState('gregorian');
  const [adjusted,setAdjusted]=useState(true);
  const [subharmonic,setSubharmonic]=useState(true);
  const [res,setRes]=useState(null);
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState(null);
  const [ready,setReady]=useState(false);
  const [showEls,setShowEls]=useState(false);
  useEffect(()=>{ loadPsalmsData().then(()=>setReady(true)).catch(e=>setErr('Data load failed: '+e.message)); },[]);
  async function run(){ setLoading(true); setErr(null); setShowEls(false);
    try{ setRes(await computePsalm(name, date, {adjusted, calendar, subharmonic})); }
    catch(e){ setErr(e.message); } setLoading(false);
  }
  const elsLong = res && res.els_result && res.els_result.text.length>400;
  return <>
    <h2>Daily Psalms — name &amp; date → Genesis ELS → Psalm</h2>
    <div className="muted" style={{marginBottom:10}}>A JavaScript port of the <i>daily-psalms-api</i> pipeline (<code>gitlab.com/ch-zz/daily-psalms-api</code>, route <code>/api/psalm</code>). The gematria of your <b>name + the date written out in words</b> sets an Equidistant-Letter-Sequence step over <b>Genesis</b>; the gematria of that ELS string is then matched to the <b>shortest Hebrew phrase in the Psalms</b> with the same value (falling back through octave sub-harmonics ÷2, ÷4 … ÷128). All data is bundled — the phrase index is built in your browser, so nothing depends on a server or a database upload.</div>

    <div className="controls" style={{marginBottom:10}}>
      <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Name (Latin / Hebrew / Greek / Arabic)" style={{flex:'1 1 260px'}}/>
      <input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{flex:'0 0 170px'}}/>
      <select value={calendar} onChange={e=>setCalendar(e.target.value)} style={{flex:'0 0 200px'}}>
        <option value="gregorian">Gregorian (ELS on Genesis)</option>
        <option value="jewish">Jewish (ELS bypassed)</option>
      </select>
    </div>
    <div className="controls" style={{marginBottom:12}}>
      <label style={{display:'inline-flex',gap:6,alignItems:'center',cursor:'pointer'}}><input type="checkbox" checked={adjusted} onChange={e=>setAdjusted(e.target.checked)}/> 137.036 adjustment</label>
      <label style={{display:'inline-flex',gap:6,alignItems:'center',cursor:'pointer'}}><input type="checkbox" checked={subharmonic} onChange={e=>setSubharmonic(e.target.checked)}/> subharmonic fallback (÷2…÷128)</label>
      <button onClick={run} disabled={!ready||loading} className="btn-cta">{loading?'Computing…':(ready?'Reveal Psalm →':'Loading data…')}</button>
      <span className="muted" style={{marginLeft:'auto'}}>{ready?'phrase index ready':'building phrase index…'}</span>
    </div>

    {err && <div className="note" style={{color:'var(--red)'}}>{err}</div>}
    {res && <>
      {res.error
        ? <div className="note" style={{color:'var(--red)'}}>{res.error}</div>
        : <>
      <h3>Input</h3>
      <table><tbody>
        <tr><th>name</th><td>{res.input.name||<span className="muted">—</span>}</td></tr>
        <tr><th>date</th><td>{res.input.date} <span className="muted">({res.input.calendar})</span></td></tr>
        <tr><th>date in words</th><td>{res.input.date_words ? (res.input.calendar==='jewish'? <span className="he" style={{direction:'rtl'}}>{res.input.date_words}</span> : res.input.date_words) : <span className="muted">—</span>}</td></tr>
        <tr><th>raw gematria sum</th><td className="big" style={{color:'var(--gold)'}}>{res.input.raw_gematria_sum}</td></tr>
        {res.input.adjusted && <tr><th>adjusted sum (+sum ÷ 137.035999177, ceiled)</th><td className="big" style={{color:'var(--gold)'}}>{res.input.initial_gematria_sum}</td></tr>}
      </tbody></table>

      <h3>ELS result — Genesis</h3>
      {res.els_result.bypassed
        ? <div className="note">Jewish calendar: the ELS scan of Genesis is bypassed and the raw gematria sum (<b>{res.els_result.gematria_sum}</b>) feeds the Psalm match directly (upstream behaviour).</div>
        : <>
          <table><tbody>
            <tr><th>step (every Nth letter)</th><td>{res.els_result.step}</td></tr>
            <tr><th>gematria of the ELS string</th><td className="big" style={{color:'var(--gold)'}}>{res.els_result.gematria_sum}</td></tr>
          </tbody></table>
          <div className="muted" style={{marginBottom:4}}>ELS string ({res.els_result.text.length} chars):</div>
          <div className="he" style={{direction:'rtl',fontSize:'1.1rem',lineHeight:1.8,wordBreak:'break-all',
              maxHeight:elsLong&&!showEls?'7.5em':null,overflow:elsLong&&!showEls?'hidden':null,marginBottom:6}}>{res.els_result.text||' '}</div>
          {elsLong && <div className="click muted" onClick={()=>setShowEls(!showEls)}>{showEls?'▲ collapse':'▼ expand full string'}</div>}
        </>}

      <h3>Psalm</h3>
      {res.psalm.error
        ? <div className="note" style={{color:'var(--red)'}}>{res.psalm.error}</div>
        : <>
          <div className="he" style={{direction:'rtl',fontSize:'1.6rem',lineHeight:1.7,marginBottom:8}}>{res.psalm.words}</div>
          <table><tbody>
            <tr><th>reference</th><td><b>{res.psalm.reference}</b> — <a href={res.psalm.url} target="_blank" rel="noopener noreferrer">BibleGateway (CJB)</a></td></tr>
            {res.psalm.subharmonic_divisor && res.psalm.subharmonic_divisor>1 && <tr><th>subharmonic divisor</th><td>÷{res.psalm.subharmonic_divisor} — the ELS gematria ÷ {res.psalm.subharmonic_divisor} = {res.psalm.queried_gematria_sum} matched</td></tr>}
            <tr><th>queried gematria</th><td>{res.psalm.queried_gematria_sum}</td></tr>
            <tr><th>ELS gematria (original)</th><td>{res.psalm.original_gematria_sum}</td></tr>
          </tbody></table>
        </>}
    </>}
    </>}
  </>;
}

export { PsalmsTab, computePsalm, psalmGematria, dateToWordsGregorian, loadPsalmsData };
