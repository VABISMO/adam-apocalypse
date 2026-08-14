// core.jsx — constants & pure helpers (no React, no JSX).
import * as Astronomy from 'astronomy-engine';
import { ALL_ALIGN_YEARS, ALL_ALIGN_OM } from './align_data.mjs';

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
// BODIES = the 7 classical bodies the Sefer Yetzirah assigns to the 7 doubles: Sun, Moon,
// Mercury, Venus, Mars, Jupiter, Saturn. These are the ONLY moving bodies the app tracks —
// they occupy letters, light sectors, and drive every reading. The modern planets Uranus,
// Neptune, and Pluto are NOT in the Sefer Yetzirah and are excluded entirely (no display,
// no letter, no count). BODIES7 / skyAt7 are kept as aliases of BODIES / skyAt for callers
// that name the reading set explicitly.
const BODIES = ['Saturn','Jupiter','Mars','Sun','Venus','Mercury','Moon'];
const GLYPH = {Sun:'☉',Moon:'☽',Mercury:'☿',Venus:'♀',Mars:'♂',Jupiter:'♃',Saturn:'♄'};
const WEEK = [['Sunday','Sun'],['Monday','Moon'],['Tuesday','Mars'],['Wednesday','Mercury'],['Thursday','Jupiter'],['Friday','Venus'],['Saturday','Saturn']];

const FIN2REG = {'ן':'נ','ץ':'צ','ך':'כ','ם':'מ','ף':'פ'};
const REG2FIN = {'נ':'ן','צ':'ץ','כ':'ך','מ':'ם','פ':'ף'};
const SIMPLE_LETTERS = new Set(Object.values(SIMPLE).map(x=>x[0]));
const MOTHER_LETTERS = new Set(MOTHERS.map(m=>m[0]));
const GV = {א:1,ב:2,ג:3,ד:4,ה:5,ו:6,ז:7,ח:8,ט:9,י:10,כ:20,ל:30,מ:40,נ:50,ס:60,ע:70,פ:80,צ:90,ק:100,ר:200,ש:300,ת:400};

function norm(s){ return [...s].map(c=>FIN2REG[c]||c).join(''); }
function displayHe(s){ if(!s) return s; const last=s[s.length-1]; const f=REG2FIN[last]; return f ? s.slice(0,-1)+f : s; }
function gematria(s){ return [...s].reduce((a,c)=>a+(GV[c]||0),0); }
function simpleSet(cons){ const s=new Set(); for(const c of norm(cons)) if(SIMPLE_LETTERS.has(c)) s.add(c); return s; }
function motherSet(cons){ const s=new Set(); for(const c of norm(cons)) if(MOTHER_LETTERS.has(c)) s.add(c); return s; }
// A word reads on a sky iff its simple-letters ⊆ occupied simples AND (when `moms` is
// passed) its mother-letters ⊆ the geometrically-available mothers. `moms` is OPTIONAL
// for backward compatibility: omitted → mothers unconstrained (the pre-gate behaviour).
// Genesis 1:1 / יהוה contain only simples, so callers that never pass `moms` are unaffected.
function formable(cons, occ, moms){ for(const c of simpleSet(cons)) if(!occ.has(c)) return false; if(moms){ for(const c of motherSet(cons)) if(!moms.has(c)) return false; } return true; }
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

function readableWords(occ, LEX, angelMap, moms){
  const res=[], seen=new Set();
  for(const [cons,trans,gloss,pos] of LEX){
    if(seen.has(cons)) continue;
    if(formable(cons, occ, moms)){
      seen.add(cons);
      const simp=[...simpleSet(cons)].sort().join('');
      const am = angelMap ? angelMap.get(norm(cons)) : null;
      const an = ANGEL_NAME_MAP.get(norm(cons));
      res.push({he:cons, disp:displayHe(cons), translit:trans, gloss, pos, len:cons.length, gem:gematria(cons), simp,
        moms:[...motherSet(cons)].sort(),
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
    if(formable(n, occ, moms)){
      seen.add(he);
      const gem=gematria(n);
      const simp=[...simpleSet(n)].sort().join('');
      res.push({he, disp:displayHe(he), translit:en, gloss:'angel — '+en, pos:'n-pr', len:he.length, gem, simp,
        moms:[...motherSet(n)].sort(),
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

// BODIES7 — alias of BODIES (the 7 classical bodies). Kept so the many call sites that name
// the reading set explicitly (skyAt7, occupiedLetters(skyAt7(...))) stay readable; BODIES
// and BODIES7 are now the same array. Accurate over millennia AND fast at every date.
const BODIES7 = BODIES;
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
function occupiedSigns(rows){ const s=new Set(); rows.forEach(r=>s.add(r.sign)); return s; }
function bySign(rows){ const m={}; rows.forEach(r=>{(m[r.sign]=m[r.sign]||[]).push(r)}); return m; }

// Geometric mother-gate (Sefer Yetzirah reading rule). The three mothers sit at fixed
// ecliptic longitudes (ש Cassiopea 38°, מ Ursa Minor 89°, א Draco 268°). A mother is
// available on a sky iff its constellation is the nearest mother to an occupied sign's
// centre (Voronoi). One occupied sign → exactly one mother. Two consecutive signs
// straddling a mother-zone boundary (Taurus–Gemini ~60°, Virgo–Libra ~180°,
// Aquarius–Pisces ~330°) → two mothers. Any other consecutive pair → one mother; a
// wide span → up to three. Doubles are always lit; only the mothers are gated.
const MOTHER_LON = {}; MOTHERS.forEach(([h,,,lon])=>{ MOTHER_LON[h]=lon; });
function _angDist(a,b){ let d=Math.abs(a-b)%360; return d>180?360-d:d; }
function nearestMother(lon){ let best=null,bd=Infinity; for(const [h,,,mlon] of MOTHERS){ const d=_angDist(lon,mlon); if(d<bd){bd=d;best=h;} } return best; }
function signCenterLon(sign){ const i=SIGNS.indexOf(sign); return i<0?NaN:i*30+15; }
function availableMothers(occupiedSigns){ const m=new Set(); for(const s of occupiedSigns){ const c=signCenterLon(s); if(!isNaN(c)) m.add(nearestMother(c)); } return m; }

const GENESIS = [
  ['בראשית','In the beginning'],['ברא','created'],['אלהים','God'],['את','(object marker)'],
  ['השמים','the heavens'],['ואת','and (object marker)'],['הארץ','the earth']
];
function genesisReadable(occ, moms){ return GENESIS.every(([w])=>formable(norm(w), occ, moms)); }
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

// ── All rare alignments (maxInSign ≥ 5: the 5-, 6-, and 7-body clusterings) over the full ──
// 22,000-yr scan — 12,505 deduped events from web/alignments.json (scanA+scanB), recomputed
// per event so the REAL reading rule applies: a word reads at an alignment iff every simple
// sits in an occupied sign AND every mother is geometrically available (doubles always free).
// The 51 maxInSign===7 grand conjunctions were a single-sign proxy for this; the full 5/6/7 set
// is the honest stellar-recurrence census — multi-sign words (e.g. יהוה, simples י+ה) now get
// a real alignment recurrence (they read when both their signs are occupied), instead of being
// dismissed as "ordinary-only" because no single-sign conjunction can light two simples.
//   ALL_ALIGN_YEARS[i] = integer year (BCE negative), sorted ascending
//   ALL_ALIGN_OM[i]    = (occupied-simple bitmask, bit j = SIGNS[j]'s letter) |
//                        (available-mother bitmask << 12,  א=bit12 מ=bit13 ש=bit14)
// Generated by web/build_align_bake.jsx (run once; baked here so the Reader shows the gap with
// no runtime scan). Planet periods are secularly stable, so the alignment cadence is fixed.
const _ALIGN_SIMPLE_BITS = SIGNS.map(s => SIMPLE[s][0]);   // ['ה','ו','ז','ח','ט','י','ל','נ','ס','ע','צ','ק']
const _ALIGN_MOM_BITS = MOTHERS.map(m => m[0]);             // ['א','מ','ש']
function _alignOccMask(om){ return om & 0xFFF; }
function _alignMomMask(om){ return (om >>> 12) & 0x7; }

// ── Baked 2026 ordinary-day scan ── the everyday recurrence gap for EVERY word, instantly ──
// ORD_OCC[i] = bitmask of occupied SIMPLE letters on day i of 2026 (bit j = SIGNS[j]'s letter,
// i.e. bit 0=ה Aries … bit 11=ק Pisces). ORD_MOM[i] = bitmask of geometrically-available MOTHERS
// (bit 0=א, bit 1=מ, bit 2=ש). Generated by web/build_ord_bake.jsx, which mirrors App.jsx scanYear
// exactly (skyAt7(fmtDate(makeDate(2026,1,1+i))) → occupiedLetters + availableMothers). Planet
// periods are stable, so the everyday cadence is year-independent; the live scanYear result
// (when loaded) overrides for the exact year, but this baked reference lets the Reader show
// the "how often can I read it again" gap before the scan finishes and on the prerendered snapshot.
const ORD_YEAR = 2026;
const ORD_OCC = [2828,2572,2568,2568,2584,2584,2600,2600,2632,2632,2696,2696,2696,2824,2824,2568,2568,3592,3592,3592,3592,3592,3080,3081,3081,3082,3082,3084,3084,3080,3080,3096,3096,3112,3112,3144,3144,3144,3208,3208,3336,3336,3336,3592,3593,3081,3081,3081,3081,3081,3081,3081,3083,3083,3085,3085,3081,3081,3097,3097,3097,3097,2089,2089,2121,2121,2185,2185,2185,2313,2313,2569,2569,2569,3081,3081,2057,2057,2057,2057,2059,2059,2061,2061,2057,2057,2057,2073,2073,2089,2091,2123,2123,2123,2187,2187,2315,2315,2315,2571,2571,3083,3083,2059,2059,2059,11,11,11,11,15,15,11,11,31,31,47,47,79,79,79,143,143,271,271,271,527,527,1039,1039,1039,2063,2063,15,15,15,15,15,15,15,15,31,31,47,47,47,79,79,143,143,143,271,271,527,527,527,1039,1039,2063,2063,15,15,15,15,31,31,31,31,31,31,31,63,59,91,91,155,155,155,283,283,541,541,541,1053,1053,2077,2077,2077,29,29,31,63,61,61,61,61,61,61,61,61,125,125,125,189,189,317,317,317,573,573,1085,1085,1085,2109,2109,61,61,63,63,93,93,93,93,89,89,121,121,121,89,89,217,217,345,345,345,633,633,1145,1145,1145,2169,2169,121,121,123,123,125,125,125,121,121,121,121,185,249,249,249,249,249,249,505,505,761,761,761,1273,1241,2265,2265,217,217,209,211,211,213,213,217,217,209,209,241,241,209,209,209,209,209,465,465,465,721,721,1233,1233,1233,2257,2193,145,209,211,211,213,213,217,217,209,209,241,241,241,209,209,209,209,465,465,465,721,721,1233,1233,1233,2257,2257,209,209,467,467,469,469,505,505,497,497,497,497,497,497,497,433,433,433,433,433,945,945,945,1457,1457,2481,2481,2481,433,433,435,435,949,949,953,953,689,689,689,689,753];
const ORD_MOM = [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,6,7,7,7,7,7,7,7,7,7,7,7,7,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7];
const ORD_SIMPLE_BITS = SIGNS.map(s => SIMPLE[s][0]);   // ['ה','ו','ז','ח','ט','י','ל','נ','ס','ע','צ','ק']  bit 0..11
const ORD_MOM_BITS = MOTHERS.map(m => m[0]);              // ['א','מ','ש']  bit 0..2
function _ordMaskToSet(mask, bits){ const s=new Set(); for(let i=0;i<bits.length;i++) if(mask&(1<<i)) s.add(bits[i]); return s; }
let _bakedOrdCache = null;
// Baked 2026 genData, built once: per-day occupied-simple Sets + available-mother Sets, the same
// shape scanYear produces. Used by ordinaryRecurrence when no live scan is loaded yet.
function _bakedOrdGenData(){
  if(_bakedOrdCache) return _bakedOrdCache;
  const dayOccs = ORD_OCC.map(m => _ordMaskToSet(m, ORD_SIMPLE_BITS));
  const dayMoms = ORD_MOM.map(m => _ordMaskToSet(m, ORD_MOM_BITS));
  _bakedOrdCache = { year:ORD_YEAR, dayOccs, dayMoms, nDays:dayOccs.length };
  return _bakedOrdCache;
}

// How often a word reads at a stellar ALIGNMENT — over all 12,505 rare alignments (maxInSign
// ≥ 5: the 5-, 6-, and 7-body clusterings) catalogued across the 22,000-yr scan. A word reads
// at alignment i iff every simple ⊆ occupiedSigns(i) AND every mother ⊆ availableMothers(i)
// (the 7 doubles are always free) — the SAME rule readableWords applies on any given date, so
// this is the honest stellar recurrence, not a single-sign proxy. Returns one of three regimes
// + the alignment years the word reads at + gap stats, so the Reader can show "how rare" each
// word's stellar reading is (the user's "π de frecuencia"): a one-simple word reads at most
// alignments (short gap); a multi-simple word reads only when all its signs coincide (long gap).
function alignmentRecurrence(he, simp, refYear=0){
  const cons = (typeof he==='string') ? norm(he) : he;
  const moms = motherSet(cons);                 // Set of mother letters
  const ss = (simp && simp.size) ? simp : simpleSet(cons);  // Set of simple letters
  // required simple-bitmask + mother-bitmask (the reading rule, as bit tests)
  let simpReq = 0; for(const c of ss){ const b = 1 << _ALIGN_SIMPLE_BITS.indexOf(c); if(b>0) simpReq |= b; }
  let momReq = 0;  for(const c of moms){ const b = 1 << _ALIGN_MOM_BITS.indexOf(c); if(b>0) momReq |= b; }
  // scan every baked alignment; keep the years where the word reads
  const years = [];
  for(let i=0;i<ALL_ALIGN_YEARS.length;i++){
    const om = ALL_ALIGN_OM[i];
    if(((_alignOccMask(om)) & simpReq) !== simpReq) continue;   // simples ⊆ occupiedSigns
    if(((_alignMomMask(om)) & momReq) !== momReq) continue;     // mothers ⊆ availableMothers
    years.push(ALL_ALIGN_YEARS[i]);
  }
  // gap stats (year granularity; 0 = two alignments in the same year)
  let gaps=[], min=0, median=0, max=0;
  if(years.length>=2){ for(let i=1;i<years.length;i++) gaps.push(years[i]-years[i-1]); const g=[...gaps].sort((a,b)=>a-b); min=g[0]; median=g[Math.floor(g.length/2)]; max=g[g.length-1]; }
  // nearest prev/next to refYear
  let prev=null, next=null;
  for(const y of years){ if(y<=refYear) prev=y; else if(next===null) next=y; }
  // regime: no simples → eternal (reads at every alignment whose mothers allow it; with no
  // mothers, all 12,505). ≥1 simple and ≥1 readable alignment → alignment. ≥1 simple but the
  // sign-combination never occurs in any scanned alignment → ordinary (only scattered days).
  const regime = ss.size ? (years.length ? 'alignment' : 'ordinary') : 'eternal';
  const signsReq = [...ss].map(c => LETTER_TO_SIGN[c]).filter(Boolean);
  return { regime, signs:signsReq, simples:[...ss], mothers:[...moms], years, gaps, min, median, max, prev, next, n:years.length, total:ALL_ALIGN_YEARS.length };
}

// ── Ordinary-day recurrence: how often a word reads AGAIN on the scattered (everyday) ──
// timescale — the answer to "cada cuánto se puede volver a leer". This is the complement of
// alignmentRecurrence: the alignment gap is years→centuries (the rare stellar-reading scale);
// the ordinary-day gap is days→weeks (the noise floor every word sits on, including alignment
// and eternal words, which also read whenever any planet transits their sign).
// Computed from a precomputed 365-day scan (genData from scanYear: per-day occupied simples
// dayOccs[i] + available mothers dayMoms[i]). A word reads on day i iff every simple ⊆ dayOccs[i]
// AND every mother ⊆ dayMoms[i] (the 7 doubles are always free). Returns within-year stats:
// count of readable days, the gap distribution (min/median/max, with year wrap-around), and the
// average cadence (nDays/count ≈ "every ~G days"). Returns null when no scan is available so the
// UI can degrade to the regime label alone.
function ordinaryRecurrence(he, simp, genData){
  // Always available: the live scanYear result (exact year) when loaded, else the baked 2026
  // reference (everyday cadence is year-independent). So the Reader shows the everyday gap
  // for every word instantly — before the scan finishes and on the prerendered SSG snapshot.
  const gd = (genData && genData.dayOccs && genData.dayMoms) ? genData : _bakedOrdGenData();
  const cons = (typeof he==='string') ? norm(he) : he;
  const ss = (simp && simp.size) ? simp : simpleSet(cons);
  const moms = motherSet(cons);
  const occs = gd.dayOccs, ms = gd.dayMoms, nDays = occs.length;
  const days = [];
  for(let i=0;i<nDays;i++){
    const o = occs[i], av = ms[i];
    let ok = true;
    if(ss.size){ for(const c of ss){ if(!o.has(c)){ ok=false; break; } } }
    if(ok && moms.size){ for(const m of moms){ if(!av.has(m)){ ok=false; break; } } }
    if(ok) days.push(i);
  }
  if(!days.length) return { count:0, nDays, pct:0, days:[], gaps:[], min:0, median:0, max:0, avg:0, year:gd.year };
  const gaps=[];
  for(let i=1;i<days.length;i++) gaps.push(days[i]-days[i-1]);
  gaps.push(days[0]+nDays-days[days.length-1]);   // wrap the year so the last→first gap is counted
  const g=[...gaps].sort((a,b)=>a-b);
  const median = g.length%2 ? g[(g.length-1)/2] : g[g.length/2];
  return { count:days.length, nDays, pct:days.length/nDays, days, gaps,
    min:g[0], median, max:g[g.length-1], avg:nDays/days.length, year:gd.year };
}

export {
  SIGNS, SIMPLE, LETTER_TO_SIGN, DOUBLES, MOTHERS, BODIES, GLYPH, WEEK,
  FIN2REG, REG2FIN, SIMPLE_LETTERS, MOTHER_LETTERS, GV, norm, displayHe, gematria, simpleSet, motherSet, formable, isPalindrome,
  ANGEL_LEXICON, ANGEL_NAME_MAP, readableWords,
  daysInMonth, makeDate, parseDate, fmtDate, BODIES7, skyAtSet, skyAt, skyAt7, occupiedLetters, occupiedSigns, bySign, availableMothers, MOTHER_LON,
  GENESIS, genesisReadable, GEN_TOTAL, GEN_VALUES,
  PREC, AGE, FULL, AYANAMSIS, SYN, DRAC, ANOM, TROP, ECLY, HALAKIM_DAY, MOLAD, EQUINOX_LON,
  ageBoundaries, eraForYear, yrLabel, ERA_WINDOWS,
  FINALS, letterVal, reduce9, LO_SHU, LO_POS, sigilPath, aiqGroups, siamese, doublyEven, singlyEven, buildMagic, isMagic, KAMEOT,
  GREEK, isopsephy, ABJAD, ABJAD_NAME, abjad, KTP, katapayadi, countSubset,
  MON, MONTHNAMES, displayDate,
  ALL_ALIGN_YEARS, ALL_ALIGN_OM, alignmentRecurrence, ordinaryRecurrence
};
