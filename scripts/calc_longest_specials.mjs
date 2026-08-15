// calc_longest_specials.mjs — find the LONGEST names (all names, not just theo) that surface
// on the |O|=1 specials under each config, with their dates. Verify the two the user named:
//   Parshandatha (פרשנדתא) on 5 Nov 4018 BCE, Moresheth-gath (מורשתגת) on Apr 17007 BCE.
//   Run:  node scripts/calc_longest_specials.mjs
import { readFileSync } from 'node:fs';
import * as Astronomy from '../data/astronomy-engine.mjs';
const LETTERS=['א','ב','ג','ד','ה','ו','ז','ח','ט','י','כ','ל','מ','נ','ס','ע','פ','צ','ק','ר','ש','ת'];
const GEM={'א':1,'ב':2,'ג':3,'ד':4,'ה':5,'ו':6,'ז':7,'ח':8,'ט':9,'י':10,'כ':20,'ל':30,'מ':40,'נ':50,'ס':60,'ע':70,'פ':80,'צ':90,'ק':100,'ר':200,'ש':300,'ת':400};
const DOC_SIMPLES=['ה','ו','ז','ח','ט','י','ל','נ','ס','ע','צ','ק'];
const GOD_DOUBLES=['ל','ע','י','ה','ו','נ','ש'];const GOD_MOTHERS=['ז','ח','ט'];
const GOD_SIMPLES=LETTERS.filter(l=>!GOD_DOUBLES.includes(l)&&!GOD_MOTHERS.includes(l)).sort((a,b)=>GEM[a]-GEM[b]);
const SWAP_SIMPLES=['א','ב','ג','ד','ז','ח','כ','מ','פ','ר','ש','ת'];
const SIGNS=['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const FIN2REG={'ן':'נ','ץ':'צ','ך':'כ','ם':'מ','ף':'פ'};const norm=s=>[...s].map(c=>FIN2REG[c]||c).join('');
const LN={'א':'aleph','ב':'bet','ג':'gimel','ד':'dalet','ה':'heh','ו':'vav','ז':'zayin','ח':'chet','ט':'tet','י':'yod','כ':'kaf','ל':'lamed','מ':'mem','נ':'nun','ס':'samekh','ע':'ayin','פ':'peh','צ':'tsaddi','ק':'qoph','ר':'resh','ש':'shin','ת':'tav'};
const BODIES=['Saturn','Jupiter','Mars','Sun','Venus','Mercury','Moon'];
function daysInMonth(y,mo){if(mo===2)return(y%4===0&&(y%100!==0||y%400===0))?29:28;return[31,28,31,30,31,30,31,31,30,31,30,31][mo-1];}
function makeDate(y,mo,da,h=12){const d=new Date(Date.UTC(2000,mo-1,da,h,0,0));d.setUTCFullYear(y);return d;}
function parseDate(str){if(!str)return null;const m=/^(-?\d{1,5})-(\d{2})-(\d{2})$/.exec(str);if(!m)return null;const y=parseInt(m[1],10),mo=parseInt(m[2],10),da=parseInt(m[3],10);if(mo<1||mo>12||da<1||da>daysInMonth(y,mo))return null;const d=makeDate(y,mo,da);return isNaN(d.getTime())?null:d;}
function skyAt7(dateStr){if(!dateStr)return[];const d=parseDate(dateStr);if(!d)return[];return BODIES.map(b=>{const v=Astronomy.GeoVector(Astronomy.Body[b],d,true);const lon=Astronomy.Ecliptic(v).elon;let si=Math.floor(lon/30)%12;if(si<0)si+=12;return{body:b,lon,sign:SIGNS[si],deg:lon-si*30};});}
const occSignIdx=rows=>{const s=new Set();rows.forEach(r=>s.add(SIGNS.indexOf(r.sign)));return s;};
const THEO_ROOTS=['בעל','אל','יה','יו','עשתר','דגון','דגן','כמוש','כמש','ענת','צדק','נבו','כוש','אשרה','שמש'];
const isTheo=cons=>{const c=norm(cons);for(const r of THEO_ROOTS)if(c.includes(r))return true;return false;};
const isYah=cons=>{const c=norm(cons);return c.includes('יה')||c.includes('יו');};
const isCan=cons=>isTheo(cons)&&!isYah(cons);
const lex=JSON.parse(readFileSync(new URL('../web/lexicon.json',import.meta.url),'utf8'));
const nameRefs=JSON.parse(readFileSync(new URL('../web/name_refs.json',import.meta.url),'utf8'));
const LEX=lex.lexicon;
// isBib = every n-pr entry in the (biblical) lexicon is a biblical proper name.
// NOTE: nameRefs.n is an incomplete index (e.g. Parshandatha Esther 9:7, Moresheth-gath
// Micah 1:14 have n=0 because their refs were never populated) — do NOT gate on n>0.
const isBibPos=pos=>String(pos||'').startsWith('n-pr');
const displayOf=he=>{const nr=nameRefs[he];if(nr&&nr.name)return nr.name;const e=LEX.find(x=>x[0]===he);return e?(e[2]||e[1]||he):he;};
// ALL biblical proper names (not just theo)
const BIB=[];
for(const [cons,,,pos] of LEX){if(!isBibPos(pos))continue;BIB.push({cons,len:cons.length,theo:isTheo(cons),yah:isYah(cons),can:isCan(cons),display:displayOf(cons)});}
const align=JSON.parse(readFileSync(new URL('../web/alignments.json',import.meta.url),'utf8'));
const ALL_ALIGN=[...align.scanA,...align.scanB];
const occIdx=ALL_ALIGN.map(a=>occSignIdx(skyAt7(a.date)));
const seenDate=new Set();const specials=[];
for(let i=0;i<ALL_ALIGN.length;i++){const a=ALL_ALIGN[i];if(a.maxInSign!==7)continue;if(seenDate.has(a.date))continue;seenDate.add(a.date);specials.push({date:a.date,occIdx:occIdx[i],i});}
console.log('specials: '+specials.length+'\n');

function surfDetailed(simpleList){const simpleSet=new Set(simpleList);const s1=new Map();
  for(const n of BIB){const ss=[...new Set([...norm(n.cons)].filter(c=>simpleSet.has(c)))];if(ss.length===1){const L=ss[0];if(!s1.has(L))s1.set(L,[]);s1.get(L).push(n);}}
  const out=[];
  for(const sp of specials){const si=[...sp.occIdx][0];const L=simpleList[si];const names=(s1.get(L)||[]);
    for(const n of names)out.push({...n,letter:LN[L],date:sp.date});}
  return out;}
function report(label,simpleList){const s=surfDetailed(simpleList);
  const max=Math.max(0,...s.map(n=>n.len));
  console.log('=== '+label+' === max length on specials = '+max+'  (total surfacing '+s.length+')');
  const top=[...s].sort((a,b)=>b.len-a.len||a.display.localeCompare(b.display)).slice(0,15);
  console.log('  longest 15 (name, len, letter-special, date, class):');
  for(const n of top)console.log('    '+n.display.padEnd(20)+' L'+n.len+'  '+n.letter+'-special  '+n.date+'  '+(n.can?'CANAANITE':n.yah?'YAHWISTIC':n.theo?'theo':'(non-theo)'));
  console.log('');}
report('DOCUMENTED',DOC_SIMPLES);
report('SWAP',SWAP_SIMPLES);
report('GOD-DOUBLES',GOD_SIMPLES);

// verify the two named long names
console.log('=== VERIFY user-named long names (DOCUMENTED) ===');
const s=surfDetailed(DOC_SIMPLES);
for(const target of ['פרשנדתא','מורשתגת']){const found=s.filter(n=>n.cons===target);
  if(found.length){for(const f of found)console.log('  '+f.display+' (L'+f.len+', '+f.letter+'-special) surfaces on '+f.date+'  '+(f.can?'CANAANITE':f.yah?'YAHWISTIC':f.theo?'theo':'(non-theo)'));}
  else console.log('  '+target+' ('+displayOf(target)+'): NOT surfacing on specials under documented');}
// also check these under swap/god
console.log('  --- under SWAP/GOD? ---');
for(const [lab,sl] of [['SWAP',SWAP_SIMPLES],['GOD',GOD_SIMPLES]]){const ss=surfDetailed(sl);
  for(const target of ['פרשנדתא','מורשתגת']){const f=ss.filter(n=>n.cons===target);console.log('  '+lab+': '+target+' ('+displayOf(target)+') -> '+(f.length?'surfaces on '+f.map(x=>x.date).join(', '):'NO'));}}