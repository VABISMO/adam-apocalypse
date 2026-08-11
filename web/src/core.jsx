// core.jsx — constants & pure helpers (no React, no JSX).
import * as Astronomy from 'astronomy-engine';

// ====== Sefer Yetzirah (English keys) ======
const SIGNS = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const SIMPLE = {
  'Aries':['ה','Heh',5], 'Taurus':['ו','Vav',6], 'Gemini':['ז','Zayin',7], 'Cancer':['ח','Chet',8],
  'Leo':['ט','Tet',9], 'Virgo':['י','Yod',10], 'Libra':['ל','Lamed',30], 'Scorpio':['נ','Nun',50],
  'Sagittarius':['ס','Samekh',60], 'Capricorn':['ע','Ayin',70], 'Aquarius':['צ','Tzaddi',90], 'Pisces':['ק','Qoph',100]
};
const LETTER_TO_SIGN = {}; Object.entries(SIMPLE).forEach(([s,[he]])=>{LETTER_TO_SIGN[he]=s});
const DOUBLES = {
  'Saturn':['ב','Bet',2], 'Jupiter':['ג','Gimel',3], 'Mars':['ד','Dalet',4], 'Sun':['כ','Kaph',20],
  'Venus':['פ','Pe',80], 'Mercury':['ר','Resh',200], 'Moon':['ת','Tav',400]
};
const MOTHERS = [
  ['א','Aleph','air · Draco',268],
  ['מ','Mem','water · Ursa Minor',89],
  ['ש','Shin','fire · Cassiopea',38]
];
// BODIES = the modern set shown for astronomical display (7 classical + Uranus + Neptune).
// Pluto is excluded — it is not in the Sefer Yetzirah and has no letter role. The READING
// (occupied letters, readable words, Genesis legibility) uses BODIES7 / skyAt7 — the 7
// classical bodies that the SY assigns to the 7 doubles. Uranus/Neptune are display-only.
const BODIES = ['Saturn','Jupiter','Mars','Sun','Venus','Mercury','Moon','Uranus','Neptune'];
const GLYPH = {Sun:'☉',Moon:'☽',Mercury:'☿',Venus:'♀',Mars:'♂',Jupiter:'♃',Saturn:'♄',Uranus:'♅',Neptune:'♆'};
const WEEK = [['Sunday','Sun'],['Monday','Moon'],['Tuesday','Mars'],['Wednesday','Mercury'],['Thursday','Jupiter'],['Friday','Venus'],['Saturday','Saturn']];

const FIN2REG = {'ן':'נ','ץ':'צ','ך':'כ','ם':'מ','ף':'פ'};
const REG2FIN = {'נ':'ן','צ':'ץ','כ':'ך','מ':'ם','פ':'ף'};
const SIMPLE_LETTERS = new Set(Object.values(SIMPLE).map(x=>x[0]));
const GV = {א:1,ב:2,ג:3,ד:4,ה:5,ו:6,ז:7,ח:8,ט:9,י:10,כ:20,ל:30,מ:40,נ:50,ס:60,ע:70,פ:80,צ:90,ק:100,ר:200,ש:300,ת:400};

function norm(s){ return [...s].map(c=>FIN2REG[c]||c).join(''); }
function displayHe(s){ if(!s) return s; const last=s[s.length-1]; const f=REG2FIN[last]; return f ? s.slice(0,-1)+f : s; }
function gematria(s){ return [...s].reduce((a,c)=>a+(GV[c]||0),0); }
function simpleSet(cons){ const s=new Set(); for(const c of norm(cons)) if(SIMPLE_LETTERS.has(c)) s.add(c); return s; }
function formable(cons, occ){ for(const c of simpleSet(cons)) if(!occ.has(c)) return false; return true; }
function isPalindrome(cons){ const n=norm(cons); return n.length>=2 && n===[...n].reverse().join(''); }
// Curated lexicon of known angel names in Hebrew consonants, across traditions.
// The Strong lexicon covers biblical Hebrew proper names, so biblical angels
// (Michael, Gabriel, Ariel, Azazel…) already appear as readable words; this list
// ALSO adds the extra-biblical names (Metatron, Sandalphon, Raziel, Azrael, the
// Enochian watchers…) so the Reader surfaces every known angel name when its
// zodiacal simples are occupied. Match is on normalised consonants.
const ANGEL_LEXICON = [
  // — Hebrew Bible / Apocrypha —
  ['מיכאל','Michael','Bible · Dan 10:13; Jude 9; Rev 12:7'],
  ['גבריאל','Gabriel','Bible · Dan 8:16; Luke 1:19'],
  ['רפאל','Raphael','Apocrypha · Tobit 3:17; 1 Enoch'],
  ['אוריאל','Uriel','Apocrypha · 2 Esdras; 1 Enoch'],
  ['עזאזל','Azazel','Bible · Lev 16:8; 1 Enoch 10'],
  ['אריאל','Ariel','Bible · Ezra 8:16; Isa 29:1'],
  ['ירמיאל','Jeremiel','Apocrypha · 2 Esdras 4:36'],
  // — 1 Enoch: the leaders of the Watchers (chs 6, 8) —
  ['שמחזי','Shemhazai (Semyaza)','1 Enoch 6:7'],
  ['רמיאל','Ramiel (Remiel)','1 Enoch'],
  ['סריאל','Sariel','1 Enoch 6:7'],
  ['שריאל','Sariel (variant)','1 Enoch'],
  ['רגואל','Raguel','1 Enoch 20:4'],
  ['דניאל','Daniel (the watcher)','1 Enoch 6:7 — distinct from the prophet'],
  ['כוכביאל','Kokabiel','1 Enoch 6:7 (angel of the stars)'],
  ['ארמיאל','Arakiel','1 Enoch 6:7'],
  ['שמשיאל','Shamsiel','1 Enoch 6:7'],
  ['תמיאל','Tamiel','1 Enoch 6:7'],
  ['יקומיאל','Yekamiel','1 Enoch 6:7'],
  ['קזביאל','Kasbeel','1 Enoch 8:2'],
  ['עזיאל','Azael','1 Enoch (variant)'],
  ['שחיאל','Shachiel','1 Enoch tradition'],
  // — Kabbalah / Merkavah —
  ['מטטרון','Metatron','3 Enoch; Talmud (angel of the presence)'],
  ['סנדלפון','Sandalphon','3 Enoch; Kabbalah'],
  ['סמאל','Samael','Talmud; Zohar (angel of death / adversary)'],
  ['רזיאל','Raziel','Sefer Raziel HaMalakh'],
  ['כפזיאל','Kafziel (Cassiel)','Kabbalah · angel of Saturn'],
  ['צדקיאל','Zadkiel','Kabbalah · angel of Jupiter / mercy'],
  ['כמאל','Camael','Kabbalah · angel of Mars'],
  ['חמאל','Chamuel','Kabbalah · angel of Mars (variant)'],
  ['הניאל','Haniel','Kabbalah · angel of Venus'],
  ['יופיאל','Jophiel','Kabbalah · angel of wisdom'],
  ['זפקיאל','Zaphkiel','Kabbalah'],
  ['ברכיאל','Barakiel','Kabbalah · angel of lightning'],
  ['יהואל','Jehoel','Kabbalah (Metatron’s surrogate)'],
  ['אקטריאל','Akatriel','Kabbalah'],
  ['סבריאל','Sabriel','Kabbalah'],
  ['נוריאל','Nuriel','Kabbalah (angel of fire / hail)'],
  ['מלכיאל','Malkiel','Kabbalah'],
  ['סטריאל','Satariel','Kabbalah (angel of concealment)'],
  // — Islamic / Judeo-Arabic, rendered in Hebrew —
  ['עזראל','Azrael','Islamic & Jewish · angel of death'],
  ['אסראפיאל','Israfil','Islamic · angel of the trumpet'],
  ['ישרפיאל','Israfil (Jewish form)','Jewish lists · trumpet'],
];
const ANGEL_NAME_MAP = new Map(ANGEL_LEXICON.map(([he,en,src])=>[norm(he), {en, src}]));

// Bible-reference pills: abbrev (as stored in name_refs.json) → Sefaria book title.
export const SEFARIA_TITLE = {
  'Gen':'Genesis','Ex':'Exodus','Lev':'Leviticus','Num':'Numbers','Deut':'Deuteronomy',
  'Josh':'Joshua','Judg':'Judges','1 Sam':'I_Samuel','2 Sam':'II_Samuel','1 Ki':'I_Kings','2 Ki':'II_Kings',
  'Isa':'Isaiah','Jer':'Jeremiah','Ezek':'Ezekiel','Hos':'Hosea','Joel':'Joel','Amos':'Amos','Obad':'Obadiah',
  'Jon':'Jonah','Mic':'Micah','Nah':'Nahum','Hab':'Habakkuk','Zeph':'Zephaniah','Hag':'Haggai','Zech':'Zechariah','Mal':'Malachi',
  'Ps':'Psalms','Prov':'Proverbs','Job':'Job','Song':'Song_of_Songs','Ruth':'Ruth','Lam':'Lamentations',
  'Eccl':'Ecclesiastes','Esth':'Esther','Dan':'Daniel','Ezra':'Ezra','Neh':'Nehemiah','1 Chr':'I_Chronicles','2 Chr':'II_Chronicles',
};
// "1 Ki 4:14" -> "https://www.sefaria.org/I_Kings.4:14"  (Sefaria accepts title.chap:verse)
export function refUrl(ref){ const li=String(ref).lastIndexOf(' '); const book=ref.slice(0,li), cv=ref.slice(li+1); const t=SEFARIA_TITLE[book]; return t ? `https://www.sefaria.org/${t}.${cv}` : null; }

function readableWords(occ, LEX, angelMap){
  const res=[], seen=new Set();
  for(const [cons,trans,gloss,pos] of LEX){
    if(seen.has(cons)) continue;
    if(formable(cons, occ)){
      seen.add(cons);
      const simp=[...simpleSet(cons)].sort().join('');
      const am = angelMap ? angelMap.get(norm(cons)) : null;
      const an = ANGEL_NAME_MAP.get(norm(cons));
      res.push({he:cons, disp:displayHe(cons), translit:trans, gloss, pos, len:cons.length, gem:gematria(cons), simp,
        pal:isPalindrome(cons), m37:gematria(cons)%37===0,
        name: (pos||'').startsWith('n-pr'),
        person: /n-pr-m|n-pr-f/.test(pos||'') || ((pos||'').startsWith('n-pr') && !/loc/.test(pos||'')),
        place: /loc/.test(pos||''),
        theo: /אל|יהו|יאל|יה/.test(cons),
        compound: /\s/.test(trans),
        angel: am ? {el:am.el, yh:am.yh} : null,
        angelName: an || null});
    }
  }
  // add extra-biblical angel names not already in the Strong lexicon
  for(const [he,en,src] of ANGEL_LEXICON){
    if(seen.has(he)) continue;
    const n=norm(he);   // final letters (ן/ץ/ך/ם/ף) must count as their base value — norm first
    if(formable(n, occ)){
      seen.add(he);
      const gem=gematria(n);
      const simp=[...simpleSet(n)].sort().join('');
      res.push({he, disp:displayHe(he), translit:en, gloss:'angel — '+en, pos:'n-pr', len:he.length, gem, simp,
        pal:isPalindrome(he), m37:gem%37===0,
        name:true, person:true, place:false, theo:/אל|יה/.test(he), compound:false,
        angel: angelMap?angelMap.get(n):null, angelName:{en,src}});
    }
  }
  res.sort((a,b)=> b.len-a.len || a.gem-b.gem || (a.he<b.he?-1:1));
  return res;
}

// ====== Date plumbing (BCE / negative-year aware) ======
// Stored string formats:  CE  "YYYY-MM-DD"   (year >= 1)
//                         BCE "-YYYY-MM-DD"  (year <= -1, sign + 4-digit abs)
// <input type="date"> cannot represent BCE, so the Sky tab uses DateEntry below.
// `new Date(str+'T12:00:00Z')` and `toISOString().slice(0,10)` BOTH break for
// negative years (extended ISO uses sign + 6 digits), so every date site goes
// through parseDate / fmtDate / makeDate instead.
function daysInMonth(y, mo){                   // mo = 1..12, proleptic Gregorian
  if(mo===2) return (y%4===0 && (y%100!==0 || y%400===0)) ? 29 : 28;
  return [31,28,31,30,31,30,31,31,30,31,30,31][mo-1];
}
function makeDate(y, mo, da, h=12){            // builds a noon-UT Date with literal year (no 0-99 remap)
  const d = new Date(Date.UTC(2000, mo-1, da, h, 0, 0));
  d.setUTCFullYear(y);                          // setUTCFullYear treats 0-99 and negatives literally
  return d;
}
function parseDate(str){                       // "YYYY-MM-DD" | "-YYYY-MM-DD" -> Date | null
  if(!str) return null;
  const m = /^(-?\d{1,5})-(\d{2})-(\d{2})$/.exec(str);
  if(!m) return null;
  const y = parseInt(m[1],10), mo = parseInt(m[2],10), da = parseInt(m[3],10);
  if(mo<1||mo>12||da<1||da>daysInMonth(y,mo)) return null;
  const d = makeDate(y, mo, da);
  return isNaN(d.getTime()) ? null : d;
}
function fmtDate(d){                           // Date -> "YYYY-MM-DD" | "-YYYY-MM-DD"
  const y = d.getUTCFullYear();
  const mo = String(d.getUTCMonth()+1).padStart(2,'0');
  const da = String(d.getUTCDate()).padStart(2,'0');
  if(y >= 1 && y <= 9999) return String(y).padStart(4,'0')+'-'+mo+'-'+da;
  const sign = y < 0 ? '-' : '';
  return sign + String(Math.abs(y)).padStart(4,'0') + '-' + mo + '-' + da;
}

// The 7 classical bodies (Sun, Moon, Mercury..Saturn): the set the Sefer Yetzirah assigns
// to the 7 doubles — the ONLY bodies that occupy letters in the reading. Accurate over
// millennia AND fast at every date. Used for the reading (skyAt7) and for the deep-past
// alignment readings, where the 9-body skyAt (incl. Uranus/Neptune) is imprecise far from J2000.
const BODIES7 = ['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn'];
function skyAtSet(dateStr, bodies){
  if(!dateStr) return [];
  const d = parseDate(dateStr);
  if(!d) return [];
  return bodies.map(b=>{
    const v = Astronomy.GeoVector(Astronomy.Body[b], d, true);
    const lon = Astronomy.Ecliptic(v).elon;
    let si = Math.floor(lon/30) % 12; if(si<0) si+=12;
    return { body:b, lon, sign:SIGNS[si], deg: lon - si*30, boundary:(lon-si*30)<1||(lon-si*30)>29 };
  });
}
function skyAt(dateStr){ return skyAtSet(dateStr, BODIES); }
function skyAt7(dateStr){ return skyAtSet(dateStr, BODIES7); }
function occupiedLetters(rows){ const s=new Set(); rows.forEach(r=>s.add(SIMPLE[r.sign][0])); return s; }
function bySign(rows){ const m={}; rows.forEach(r=>{(m[r.sign]=m[r.sign]||[]).push(r)}); return m; }

const GENESIS = [
  ['בראשית','In the beginning'],['ברא','created'],['אלהים','God'],['את','(object marker)'],
  ['השמים','the heavens'],['ואת','and (object marker)'],['הארץ','the earth']
];
function genesisReadable(occ){ return GENESIS.every(([w])=>formable(norm(w), occ)); }
const GEN_TOTAL = 2701;
const GEN_VALUES = GENESIS.map(([w])=>gematria(norm(w))); // 913,203,86,401,395,407,296

const PREC = 50.29/3600, AGE = 30/PREC, FULL = 360/PREC, AYANAMSIS = 24.18;
// Base astronomical constants (measured standards, mirroring scripts/lib.mjs). Derived
// numbers shown to the user (saros = 223·SYN, molad, Δ, eclipse year…) are computed
// from these — never written as hardcoded literals.
const SYN = 29.530589, DRAC = 27.212221, ANOM = 27.554550, TROP = 365.24219, ECLY = 346.620083;
const HALAKIM_DAY = 24*1080;                 // 1 day = 24 h × 1080 halakim (parts)
const MOLAD = 29 + 12/24 + 793/HALAKIM_DAY;  // Hebrew molad: 29 d 12 h 793 parts
const EQUINOX_LON = (360 - AYANAMSIS) % 360;
function ageBoundaries(ayan=AYANAMSIS){
  const eqLon = (360 - ayan) % 360; const out=[];
  for(let i=0;i<12;i++){
    const hi=(i+1)*30; let dt=(eqLon-hi)/PREC;
    while(dt>FULL/2) dt-=FULL; while(dt<-FULL/2) dt+=FULL;
    const start=2024+dt; out.push({sign:SIGNS[i], he:SIMPLE[SIGNS[i]][0], start, end:start+AGE});
  }
  return out;
}
// Precessional era (Spanish sign name, e.g. "Piscis") containing a year — ~2147 y per
// era, cyclic mod the ~25771-y great year. ageBoundaries() lists the 12 eras in
// non-monotonic order, so the wrap window is the true min-start / max-end across all.
const GREAT_YEAR = 25771;
function eraForYear(y){
  const ERAS = ageBoundaries();
  let mn=Infinity, mx=-Infinity;
  for(const e of ERAS){ if(e.start<mn) mn=e.start; if(e.end>mx) mx=e.end; }
  let yy=y; while(yy<mn) yy+=GREAT_YEAR; while(yy>=mx) yy-=GREAT_YEAR;
  for(const e of ERAS){ if(yy>=Math.round(e.start)&&yy<Math.round(e.end)) return e.sign; }
  return '?';
}
function yrLabel(y){ return y<0 ? Math.round(-y)+' BCE' : Math.round(y)+' CE'; }

const ERA_WINDOWS = [
  {w:'427–417 BCE', ev:'Axial Age (Plato b. 427; Torah redaction; Buddha)'},
  {w:'61–73 CE', ev:'Second Temple destroyed (70); rabbinic Judaism; Christian break'},
  {w:'552–565', ev:'Justinian; Hagia Sophia; closure of the Talmud; pre-Islam'},
  {w:'1043–1056', ev:'East–West Schism (1054)'},
  {w:'1535–1547', ev:'Reformation (1517); Copernicus, De revolutionibus (1543)'},
  {w:'2025–2038', ev:'current window'},
];

// ====== Aiq Bekar / sigils / kameot ======
// Ancient 22-letter Hebrew gematria: א=1 … ת=400, no vowels. Final-form letters
// (ך ם ן ף ץ) are allographs of their base letter and take its VALUE (ם=40 like מ),
// NOT the medieval Mispar Gadol 500–900. This is the system the Sefer Yetzirah uses.
const FINALS = new Set(['ך','ם','ן','ף','ץ']);
function letterVal(ch){ return GV[FIN2REG[ch] || ch] ?? 0; }
function reduce9(v){ let s=v; while(s>9) s=String(s).split('').reduce((a,d)=>a+ +d,0); return s===0?9:s; }
const LO_SHU=[[4,9,2],[3,5,7],[8,1,6]];
const LO_POS={}; for(let i=0;i<3;i++)for(let j=0;j<3;j++) LO_POS[LO_SHU[i][j]]=[i,j];
function sigilPath(name){
  const letters=[...norm(name)].filter(ch=>GV[ch]);
  const reduced=letters.map(ch=>reduce9(letterVal(ch)));
  const cells=[];
  for(const r of reduced){ if(!cells.length || cells[cells.length-1].v!==r) cells.push({v:r}); }
  return { letters, reduced, cells, cellsUsed:[...new Set(reduced)] };
}
function aiqGroups(){
  const g={1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[]};
  const all='אבגדהוזחטיכלמנסעפצקרשת';   // 22 base letters (finals are allographs, same value)
  for(const ch of all){ const v=letterVal(ch); g[reduce9(v)].push(ch+''+v); }
  return g;
}
function siamese(n){
  const sq=[...Array(n)].map(()=>Array(n).fill(0));
  let r=0,c=(n>>1); for(let k=1;k<=n*n;k++){
    if(sq[r][c]){ r=(r+2)%n; c=(c+n-1)%n; }
    sq[r][c]=k; r=(r+n-1)%n; c=(c+1)%n;
  } return sq;
}
function doublyEven(n){
  const sq=[...Array(n)].map((_,i)=>[...Array(n)].map((_,j)=>i*n+j+1));
  const mark=(i,j)=>{ const bi=i%4,bj=j%4; return (bi===bj)||(bi+bj===3); };
  for(let i=0;i<n;i++)for(let j=0;j<n;j++) if(mark(i,j)) sq[i][j]=n*n+1-sq[i][j];
  return sq;
}
function singlyEven(n){
  const m=n>>1, A=siamese(m), M=m*m;
  const g=[...Array(n)].map(()=>Array(n).fill(0));
  for(let i=0;i<m;i++)for(let j=0;j<m;j++){
    g[i][j]=A[i][j]; g[i+m][j+m]=A[i][j]+M; g[i][j+m]=A[i][j]+2*M; g[i+m][j]=A[i][j]+3*M;
  }
  const k=(m-1)>>1;
  for(let i=0;i<m;i++)for(let j=0;j<k;j++){ const t=g[i][j]; g[i][j]=g[i+m][j]; g[i+m][j]=t; }
  { const t=g[k][k-1]; g[k][k-1]=g[k+m][k-1]; g[k+m][k-1]=t; }
  { const t=g[k][k];   g[k][k]=g[k+m][k];     g[k+m][k]=t; }
  for(let j=0;j<k-1;j++){ const col=m+1+j; const t=g[k][col]; g[k][col]=g[k+m][col]; g[k+m][col]=t; }
  return g;
}
function buildMagic(n){ return n%2? siamese(n) : n%4===0? doublyEven(n) : singlyEven(n); }
function isMagic(sq){ const n=sq.length, M=n*(n*n+1)/2;
  const rows=sq.map(r=>r.reduce((a,b)=>a+b,0));
  const cols=[...Array(n)].map((_,j)=>sq.reduce((a,r)=>a+r[j],0));
  const d1=sq.reduce((a,r,i)=>a+r[i],0), d2=sq.reduce((a,r,i)=>a+r[n-1-i],0);
  return [...rows,...cols,d1,d2].every(x=>x===M);
}
const KAMEOT=[
  ['Saturn',3,'ב'],['Jupiter',4,'ג'],['Mars',5,'ד'],['Sun',6,'כ'],
  ['Venus',7,'פ'],['Mercury',8,'ר'],['Moon',9,'ת'],
];

// ====== Greek isopsephy (Revelation) ======
const GREEK = {α:1,β:2,γ:3,δ:4,ε:5,ϝ:6,ϛ:6,ζ:7,η:8,θ:9,ι:10,κ:20,λ:30,μ:40,ν:50,ξ:60,ο:70,π:80,ϟ:90,ϙ:90,ρ:100,σ:200,ς:200,τ:300,υ:400,φ:500,χ:600,ψ:700,ω:800,ϡ:900};
function isopsephy(s){
  const n = s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
  let v=0; for(const ch of n){ if(GREEK[ch]!=null) v+=GREEK[ch]; } return v;
}

// Arabic abjad (Mashriqi/eastern order) — the 28-letter numeral order
const ABJAD = {ا:1,ب:2,ج:3,د:4,ه:5,و:6,ز:7,ح:8,ط:9,ي:10,ك:20,ل:30,م:40,ن:50,س:60,ع:70,ف:80,ص:90,ق:100,ر:200,ش:300,ت:400,ث:500,خ:600,ذ:700,ض:800,ظ:900,غ:1000};
const ABJAD_NAME = {ا:'alif',ب:'ba',ج:'jim',د:'dal',ه:'ha',و:'waw',ز:'zay',ح:'ḥa',ط:'ṭa',ي:'ya',ك:'kaf',ل:'lam',م:'mim',ن:'nun',س:'sin',ع:'ayn',ف:'fa',ص:'ṣad',ق:'qaf',ر:'ra',ش:'shin',ت:'ta',ث:'tha',خ:'kha',ذ:'dhal',ض:'ḍad',ظ:'ẓha',غ:'ghayn'};
function abjad(s){ let v=0; for(const ch of s){ if(ABJAD[ch]!=null) v+=ABJAD[ch]; } return v; }

// Katapayadi — Indian consonant→digit (right-to-left reading). Vowels = 0.
const KTP = {क:1,ख:2,ग:3,घ:4,ङ:5,ट:1,ठ:2,ड:3,ढ:4,ण:5,प:1,फ:2,ब:3,भ:4,म:5,य:1,र:2,ल:3,व:4,श:5,च:6,छ:7,ज:8,झ:9,ञ:0,त:6,थ:7,द:8,ध:9,न:0,ष:6,स:7,ह:8};
function katapayadi(s){
  // a consonant carries a value UNLESS immediately followed by virama (्) —
  // i.e. only the cluster-final consonant (the one with a vowel) counts.
  // Then read the digits right-to-left.
  const chars=[...s];
  const digits=[];
  for(let i=0;i<chars.length;i++){
    const c=chars[i];
    if(!/[क-हक़-य़]/.test(c)) continue;          // only consonants
    if(chars[i+1]==='्') continue;              // conjunct non-final -> no value
    if(KTP[c]!=null) digits.push(KTP[c]);
  }
  return digits.reverse().join('');
}

// ====== subset multiples of 37 (Gen 1:1 structure) ======
function countSubset(arr,div){ let cnt=0; const n=arr.length;
  for(let mask=1;mask<(1<<n);mask++){ let s=0; for(let i=0;i<n;i++) if(mask&(1<<i)) s+=arr[i]; if(s%div===0) cnt++; } return cnt; }

const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function displayDate(ds){
  const d=parseDate(ds); if(!d) return ds;
  const y=d.getUTCFullYear(), mo=MON[d.getUTCMonth()], da=d.getUTCDate();
  return `${da} ${mo} ${y<0?Math.abs(y)+' BCE':y}`;
}

const MONTHNAMES=['January','February','March','April','May','June','July','August','September','October','November','December'];

export {
  SIGNS, SIMPLE, LETTER_TO_SIGN, DOUBLES, MOTHERS, BODIES, GLYPH, WEEK,
  FIN2REG, REG2FIN, SIMPLE_LETTERS, GV, norm, displayHe, gematria, simpleSet, formable, isPalindrome,
  ANGEL_LEXICON, ANGEL_NAME_MAP, readableWords,
  daysInMonth, makeDate, parseDate, fmtDate, BODIES7, skyAtSet, skyAt, skyAt7, occupiedLetters, bySign,
  GENESIS, genesisReadable, GEN_TOTAL, GEN_VALUES,
  PREC, AGE, FULL, AYANAMSIS, SYN, DRAC, ANOM, TROP, ECLY, HALAKIM_DAY, MOLAD, EQUINOX_LON,
  ageBoundaries, eraForYear, yrLabel, ERA_WINDOWS,
  FINALS, letterVal, reduce9, LO_SHU, LO_POS, sigilPath, aiqGroups, siamese, doublyEven, singlyEven, buildMagic, isMagic, KAMEOT,
  GREEK, isopsephy, ABJAD, ABJAD_NAME, abjad, KTP, katapayadi, countSubset,
  MON, MONTHNAMES, displayDate
};
