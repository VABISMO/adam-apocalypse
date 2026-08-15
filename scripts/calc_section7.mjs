// calc_section7.mjs — recompute §7's three tables UNDER the geometric mother-gate.
//
// Mirrors scripts/calc_specials_biblical.mjs (the source the paper's §7 tables were built
// from) but ADDS the geometric mother-gate (core.jsx availableMothers): a |S|=1 biblical
// proper name reads on a single-sign special iff its mother-set ⊆ the zone-mother of
// that sign (1 mother per single sign; doubles always lit). Names whose only simple letter
// is the occupied one, AND whose mothers are all in the sign's Voronoi zone, survive.
//
// Emits the gated data for the paper's three §7 tables:
//   (a) master table — 12 signs: rare-dates count, biblical-names count, longest name,
//       class, first occurrence;
//   (b) 12 era tables — top-8 gated biblical names per sign (len desc, gem asc) + caption;
//   (c) chronological 51-row table — per conjunction: year, age, sign·letter, gap,
//       longest name, L, class;
//   (d) overall longest gated readable names (len≥5, distinct, verse-cited) for §7 prose;
//   (e) verification — per-sign rare-dates counts vs the published master, and the
//       chronological astronomy (date/age/sign/gap) vs the published table.
//
// Run:  node scripts/calc_section7.mjs   (self-contained: imports astronomy-engine direct,
//       inlines skyAt7 + the gate + eraForYear verbatim from web/src/core.jsx — cited).
import { readFileSync, writeFileSync } from 'node:fs';
import * as Astronomy from '../data/astronomy-engine.mjs';

// ── inlined verbatim from web/src/core.jsx (cited) ──
const SIGNS = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const SIMPLE = {
  'Aries':['ה','Heh',5], 'Taurus':['ו','Vav',6], 'Gemini':['ז','Zayin',7], 'Cancer':['ח','Chet',8],
  'Leo':['ט','Tet',9], 'Virgo':['י','Yod',10], 'Libra':['ל','Lamed',30], 'Scorpio':['נ','Nun',50],
  'Sagittarius':['ס','Samekh',60], 'Capricorn':['ע','Ayin',70], 'Aquarius':['צ','Tzaddi',90], 'Pisces':['ק','Qoph',100]
};
const MOTHERS = [['א','Aleph','air · Draco',268],['מ','Mem','water · Ursa Minor',89],['ש','Shin','fire · Cassiopea',38]];
const MOTHER_LETTERS = new Set(MOTHERS.map(m=>m[0]));
const GV = {א:1,ב:2,ג:3,ד:4,ה:5,ו:6,ז:7,ח:8,ט:9,י:10,כ:20,ל:30,מ:40,נ:50,ס:60,ע:70,פ:80,צ:90,ק:100,ר:200,ש:300,ת:400};
const SIMPLE_LETTERS = new Set(Object.values(SIMPLE).map(x=>x[0]));
const FIN2REG = {'ן':'נ','ץ':'צ','ך':'כ','ם':'מ','ף':'פ'};
const norm = s => [...s].map(c => FIN2REG[c] || c).join('');
const gematria = s => [...s].reduce((a,c)=>a+(GV[c]||0),0);
function simpleSet(cons){ const s=new Set(); for(const c of norm(cons)) if(SIMPLE_LETTERS.has(c)) s.add(c); return s; }
function motherSet(cons){ const s=new Set(); for(const c of norm(cons)) if(MOTHER_LETTERS.has(c)) s.add(c); return s; }
function daysInMonth(y,mo){ if(mo===2) return (y%4===0&&(y%100!==0||y%400===0))?29:28; return [31,28,31,30,31,30,31,31,30,31,30,31][mo-1]; }
function makeDate(y,mo,da,h=12){ const d=new Date(Date.UTC(2000,mo-1,da,h,0,0)); d.setUTCFullYear(y); return d; }
function parseDate(str){ if(!str) return null; const m=/^(-?\d{1,5})-(\d{2})-(\d{2})$/.exec(str); if(!m) return null;
  const y=parseInt(m[1],10),mo=parseInt(m[2],10),da=parseInt(m[3],10);
  if(mo<1||mo>12||da<1||da>daysInMonth(y,mo)) return null; const d=makeDate(y,mo,da); return isNaN(d.getTime())?null:d; }
const BODIES=['Saturn','Jupiter','Mars','Sun','Venus','Mercury','Moon'];
function skyAt7(dateStr){ if(!dateStr) return []; const d=parseDate(dateStr); if(!d) return [];
  return BODIES.map(b=>{ const v=Astronomy.GeoVector(Astronomy.Body[b],d,true);
    const lon=Astronomy.Ecliptic(v).elon; let si=Math.floor(lon/30)%12; if(si<0) si+=12;
    return { body:b, lon, sign:SIGNS[si], signIdx:si, deg:lon-si*30 }; }); }
// geometric mother-gate (verbatim from core.jsx)
const MOTHER_LON = {}; MOTHERS.forEach(([h,,,lon])=>{ MOTHER_LON[h]=lon; });
function _angDist(a,b){ let d=Math.abs(a-b)%360; return d>180?360-d:d; }
function nearestMother(lon){ let best=null,bd=Infinity; for(const [h,,,mlon] of MOTHERS){ const d=_angDist(lon,mlon); if(d<bd){bd=d;best=h;} } return best; }
function signCenterLon(sign){ const i=SIGNS.indexOf(sign); return i<0?NaN:i*30+15; }
function availableMothers(occupiedSigns){ const m=new Set(); for(const s of occupiedSigns){ const c=signCenterLon(s); if(!isNaN(c)) m.add(nearestMother(c)); } return m; }
// precessional era (verbatim from core.jsx eraForYear + ageBoundaries)
const PREC = 50.29/3600, AGE = 30/PREC, FULL = 360/PREC, AYANAMSIS = 24.18;
const GREAT_YEAR = 25771;
function ageBoundaries(ayan=AYANAMSIS){
  const eqLon = (360 - ayan) % 360; const out=[];
  for(let i=0;i<12;i++){ const hi=(i+1)*30; let dt=(eqLon-hi)/PREC;
    while(dt>FULL/2) dt-=FULL; while(dt<-FULL/2) dt+=FULL;
    const start=2024+dt; out.push({sign:SIGNS[i], he:SIMPLE[SIGNS[i]][0], start, end:start+AGE}); }
  return out;
}
function eraForYear(y){
  const ERAS = ageBoundaries();
  let mn=Infinity, mx=-Infinity;
  for(const e of ERAS){ if(e.start<mn) mn=e.start; if(e.end>mx) mx=e.end; }
  let yy=y; while(yy<mn) yy+=GREAT_YEAR; while(yy>=mx) yy-=GREAT_YEAR;
  for(const e of ERAS){ if(yy>=Math.round(e.start)&&yy<Math.round(e.end)) return e.sign; }
  return '?';
}

// ── lexicon + name_refs (matches calc_specials_biblical.mjs conventions) ──
const lex = JSON.parse(readFileSync(new URL('../web/lexicon.json',import.meta.url),'utf8'));
const nameRefs = JSON.parse(readFileSync(new URL('../web/name_refs.json',import.meta.url),'utf8'));
const LEX = lex.lexicon;
const isBibPos = pos => String(pos||'').startsWith('n-pr');
const displayOf = he => { const nr=nameRefs[he]; if(nr&&nr.name) return nr.name; const e=LEX.find(x=>x[0]===he); return e?(e[2]||e[1]||he):he; };
const typeOf = he => { const e=LEX.find(x=>x[0]===he); const p=String(e?(e[3]||''):''); return p.startsWith('n-pr-loc')?'place':'person'; };

// ── verse-ref curation ──
// name_refs.json matches a name's CONSONANTS against the whole Tanakh, so homographs
// contaminate refs[] (e.g. אסתר = the name Esther AND "I will hide" in Gen 4:14) and
// refs[0] is then the common word's verse, not the name's. Stale data also misses some
// names entirely (n=0). So "first occurrence" is resolved in three layers:
//   1. REF_OVERRIDE — hand-verified real first-occurrence for contaminated/missing names
//      (picked from the real name's book; '—' where the cons is a common word mis-tagged
//      n-pr with no clear biblical-name occurrence);
//   2. pubRefByDisplay — the published paper's curated ref, reused for names that already
//      appeared (so kept names keep their established citation);
//   3. name_refs.refs[0] — correct for unique-consonant names (no homograph).
const REF_OVERRIDE = {
  'גנבת':'1 Ki 11:20', 'ספרת':'Neh 7:7', 'ברע':'Gen 14:2', 'בדנ':'1 Sam 12:11',
  'ברוכ':'Jer 32:12', 'דודו':'2 Sam 23:24', 'גחמ':'Gen 22:24', 'גחר':'Ezra 2:47',
  'תמח':'Ezra 2:53', 'בערא':'1 Chr 8:8', 'ביתכר':'1 Sam 7:11', 'תפתה':'Isa 30:33',
  'יריבי':'1 Chr 11:46', 'גבעת':'Josh 18:28', 'מחת':'2 Chr 31:13', 'שופכ':'1 Chr 19:16',
  'מטרד':'1 Chr 1:50',                         // Matred (wife of Hadad) — missing from name_refs
  'צרת':'—','רכה':'—','בכרו':'—','בכורת':'—','פרנכ':'—', // common words mis-tagged n-pr
};
// parse the published era-table refs from the live paper (curated; reuse for kept names)
const _doc = readFileSync(new URL('../paper/documented-construction/index.html',import.meta.url),'utf8');
const pubRefByDisplay = {};
for(const m of _doc.matchAll(/<table class="era">[\s\S]*?<tbody>([\s\S]*?)<\/tbody>/g)){
  for(const r of m[1].matchAll(/<tr><td>([^<]+)<\/td><td>\d+<\/td><td>\d+<\/td><td>[^<]+<\/td><td>([^<]*)<\/td><\/tr>/g))
    pubRefByDisplay[r[1]] = r[2];
}
const firstRef = (he, display) => {
  if (REF_OVERRIDE[he] !== undefined) return REF_OVERRIDE[he];
  if (display && pubRefByDisplay[display] !== undefined) return pubRefByDisplay[display];
  const nr = nameRefs[he]; return (nr&&nr.refs&&nr.refs.length) ? nr.refs[0] : '—';
};

// BIB = all Strong-lexicon proper names (n-pr: persons + places), with simple/mother sets
const BIB = [];
for(const [cons,,,pos] of LEX){ if(!isBibPos(pos)) continue;
  BIB.push({ cons, len:cons.length, gem:gematria(cons), display:displayOf(cons), type:typeOf(cons),
    sset:simpleSet(cons), mset:motherSet(cons) });
}
// s1ByLetter = |S|=1 names (sign-specific readers) indexed by their single simple letter
const s1ByLetter = {};
for(const L of Object.values(SIMPLE).map(x=>x[0])) s1ByLetter[L]=[];
for(const n of BIB){ if(n.sset.size===1) s1ByLetter[[...n.sset][0]].push(n); }
const byImp = (a,b)=>(b.len-a.len)||(a.gem-b.gem);

// ── load 7-planet specials (maxInSign===7, unique by date) ──
const align = JSON.parse(readFileSync(new URL('../web/alignments.json',import.meta.url),'utf8'));
const ALL = [...align.scanA, ...align.scanB];
const seenDate = new Set(); const specials = [];
for(const a of ALL){ if(a.maxInSign!==7) continue; if(seenDate.has(a.date)) continue; seenDate.add(a.date);
  const rows = skyAt7(a.date); const signIdx = rows.length? rows[0].signIdx : -1;
  specials.push({ date:a.date, sign:SIGNS[signIdx], signIdx }); }
specials.sort((a,b)=> parseDate(a.date).getTime() - parseDate(b.date).getTime());
console.log('=== 7-planet specials: n =', specials.length, '===\n');

// per-sign grouping (English sign names)
const bySign = {}; for(const s of SIGNS) bySign[s]=[];
for(const sp of specials) bySign[sp.sign].push(sp);
for(const s of SIGNS) bySign[s].sort((a,b)=> parseDate(a.date).getTime()-parseDate(b.date).getTime());

// ── per-sign gated computation ──
const signData = {}; // sign -> { simple, gem, mom, count, longest, top8, rareDates, isoDates }
let oldTotal=0, newTotal=0;
for(const sign of SIGNS){
  const L = SIMPLE[sign][0], gem = SIMPLE[sign][2];
  const moms = availableMothers(new Set([sign]));   // 1 mother (single sign)
  const mom = [...moms][0];
  const allS1 = s1ByLetter[L];                       // |S|=1 names, mothers UNgated (old)
  const gated = allS1.filter(n => [...n.mset].every(m => moms.has(m))).sort(byImp); // gated
  oldTotal += allS1.length; newTotal += gated.length;
  signData[sign] = { simple:L, gem, mom, count:gated.length, oldCount:allS1.length,
    longest: gated[0]||null, top8: gated.slice(0,8),
    rareDates: bySign[sign].length, isoDates: bySign[sign].map(s=>s.date) };
}
console.log('=== per-sign readable |S|=1 biblical names: OLD (mothers-always) vs NEW (gated) ===');
console.log('sign         simple mom  rare  old   new   longest');
for(const sign of SIGNS){ const d=signData[sign];
  const lg = d.longest ? `${d.longest.display} L${d.longest.len}` : '—';
  console.log(`  ${sign.padEnd(12)} ${d.simple}      ${d.mom}    ${String(d.rareDates).padStart(3)}  ${String(d.oldCount).padStart(3)}  ${String(d.count).padStart(3)}   ${lg}`); }
console.log(`  ${'TOTAL'.padEnd(12)}              ${String(specials.length).padStart(3)}  ${String(oldTotal).padStart(3)}  ${String(newTotal).padStart(3)}\n`);

// ── verification: per-sign rare-dates counts vs published master ──
const PUBLISHED_RARE = { Aries:5,Taurus:6,Gemini:7,Cancer:5,Leo:2,Virgo:1,Libra:5,Scorpio:5,Sagittarius:2,Capricorn:5,Aquarius:5,Pisces:3 };
let rareOk = true;
for(const sign of SIGNS){ if(signData[sign].rareDates !== PUBLISHED_RARE[sign]){ rareOk=false; console.log(`  !! ${sign} rare-dates mismatch: ${signData[sign].rareDates} vs published ${PUBLISHED_RARE[sign]}`); } }
console.log('=== VERIFY rare-dates per sign vs published master:', (rareOk?'ALL MATCH ✓':'MISMATCH'),'===\n');

// ── (a) MASTER TABLE tbody ──
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function yearLabel(ds){ const d=parseDate(ds); const y=d.getUTCFullYear();
  // published convention: BCE years comma-grouped (19,444 BCE); CE years plain (2000 CE)
  return y<0 ? Math.round(-y).toLocaleString('en-US')+' BCE' : Math.round(y)+' CE'; }
function gapStr(years){ if(years>=1000) return {cls:'gap1k', txt:(years/1000).toFixed(2)+' ky'};
  if(years>=500) return {cls:'gap500', txt:Math.round(years)+' y'}; return {cls:'', txt:Math.round(years)+' y'}; }

let masterHtml = '<tbody>\n';
for(const sign of SIGNS){ const d=signData[sign]; const L=d.longest;
  const longestCell = L ? `${esc(L.display)} <span class="dim">L${L.len} · ${L.gem}</span>` : '—';
  const cls = L ? L.type : '—'; const first = L ? firstRef(L.cons, L.display) : '—';
  masterHtml += `<tr><td>${sign}</td><td class="heb-cell">${d.simple} <span class="dim">(${d.gem})</span></td><td>${d.rareDates}</td><td>${d.count}</td><td>${longestCell}</td><td>${cls}</td><td>${first}</td></tr>\n`;
}
masterHtml += '</tbody>';
writeOut('MASTER_TBODAY', masterHtml);

// ── (b) ERA TABLES (12) ──
let eraHtml = '';
for(const sign of SIGNS){ const d=signData[sign];
  const dates = d.isoDates.map(s=> s.startsWith('-')? s : s).join(', ');
  eraHtml += `<table class="era"><caption>${sign} · simple ${d.simple} (${d.gem}) — ${d.count} biblical names read on ${d.rareDates} rare conjunction${d.rareDates===1?'':'s'} <span class="dim">(${dates})</span></caption><thead><tr><th>name</th><th>L</th><th>gematria</th><th>person / place</th><th>first occurrence</th></tr></thead><tbody>\n`;
  const rows = d.top8.length? d.top8 : [];
  for(const n of rows){ eraHtml += `<tr><td>${esc(n.display)}</td><td>${n.len}</td><td>${n.gem}</td><td>${n.type}</td><td>${firstRef(n.cons, n.display)}</td></tr>\n`; }
  eraHtml += `</tbody></table>\n`;
}
writeOut('ERA_TABLES', eraHtml);

// ── (c) CHRONOLOGICAL 51-ROW tbody ──
// The gate changes ONLY the reading columns (name/L/class). The astronomy (date, age,
// sign·letter, gap) is unchanged, so we PRESERVE the published rows' astronomical cells
// verbatim and swap only the last three cells with the gated per-sign longest name.
// (The published age column uses a precessional-era labelling that differs from
// eraForYear at 3 boundary rows, and the published gaps have their own rounding; both
// are astronomical, not reading, so they stay as published.)
const htmlDoc = _doc;
const chronoMatch = htmlDoc.match(/<table class="gaps">[\s\S]*?<tbody>([\s\S]*?)<\/tbody>/);
let chronoHtml = '<tbody>\n';
if(chronoMatch){
  const pubRows = [...chronoMatch[1].matchAll(/<tr><td>(\d+)<\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><td>(\w+) <span class="dim">·<\/span> <span class="heb-cell">(.)<\/span><\/td><td class="([^"]*)">([^<]+)<\/td><td>([^<]*)<\/td><td>([^<]*)<\/td><td>([^<]+)<\/td><\/tr>/g)];
  for(const r of pubRows){
    const num=r[1], pubDate=r[2], pubAge=r[3], pubSign=r[4], pubLet=r[5], pubGapCls=r[6], pubGap=r[7];
    const d = signData[pubSign]; const L = d ? d.longest : null;
    const name = L? esc(L.display) : '—'; const len = L? L.len : ''; const cls = L? L.type : '—';
    chronoHtml += `<tr><td>${num}</td><td>${pubDate}</td><td>${pubAge}</td><td>${pubSign} <span class="dim">·</span> <span class="heb-cell">${pubLet}</span></td><td class="${pubGapCls}">${pubGap}</td><td>${name}</td><td>${len}</td><td>${cls}</td></tr>\n`;
  }
} else {
  console.log('  !! could not locate chronological table in HTML — falling back to computed astronomy');
  for(let i=0;i<specials.length;i++){ const sp=specials[i]; const d=signData[sp.sign];
    const y = parseDate(sp.date).getUTCFullYear(); const age = 'Age of ' + eraForYear(y); const L = d.longest;
    let gap; if(i===0){ gap={cls:'',txt:'—'}; } else { const prev=parseDate(specials[i-1].date).getTime(), cur=parseDate(sp.date).getTime(); gap=gapStr((cur-prev)/(365.25*86400*1000)); }
    chronoHtml += `<tr><td>${i+1}</td><td>${yearLabel(sp.date)}</td><td>${age}</td><td>${sp.sign} <span class="dim">·</span> <span class="heb-cell">${d.simple}</span></td><td class="${gap.cls}">${gap.txt}</td><td>${L?esc(L.display):'—'}</td><td>${L?L.len:''}</td><td>${L?L.type:'—'}</td></tr>\n`;
  }
}
chronoHtml += '</tbody>';
writeOut('CHRONO_TBODAY', chronoHtml);

// ── (d) OVERALL LONGEST GATED NAMES (len≥5, distinct, verse-cited) ──
const longAll = [];
for(const sign of SIGNS){ for(const n of signData[sign].top8){ if(n.len>=5) longAll.push({...n, sign}); } }
// include ALL gated len≥5 (not just top8) for the prose list
const longAllFull = [];
for(const sign of SIGNS){ const all = s1ByLetter[signData[sign].simple].filter(n=>[...n.mset].every(m=>availableMothers(new Set([sign])).has(m))); for(const n of all){ if(n.len>=5) longAllFull.push({...n, sign}); } }
const uniqLong = [...new Map(longAllFull.map(n=>[n.cons,n])).values()].sort((a,b)=>b.len-a.len||a.gem-b.gem);
console.log('=== overall longest GATED readable biblical names on specials (len≥5, distinct) — top 20 ===');
for(const n of uniqLong.slice(0,20)){ console.log(`  ${n.display.padEnd(20)} L${n.len} gem${String(n.gem).padStart(4)} ${n.type.padEnd(6)} ${n.sign.padEnd(10)} ${firstRef(n.cons, n.display)}`); }
const proseList = uniqLong.slice(0,8).map(n=>`${n.display} (${firstRef(n.cons, n.display)})`).join(', ');
console.log('\n=== §7 PROSE — longest readable names (gated), verse-cited: ===');
console.log('  '+proseList);

// ── (e) VERIFICATION: chronological astronomy vs published table ──
const chronoBlock = htmlDoc.match(/<table class="gaps">[\s\S]*?<tbody>([\s\S]*?)<\/tbody>/);
let mism=0;
if(chronoBlock){
  const pubRows = [...chronoBlock[1].matchAll(/<tr><td>(\d+)<\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><td>(\w+) <span[^>]*>·<\/span> <span[^>]*>(.)<\/span><\/td><td class="([^"]*)">([^<]+)<\/td><td>([^<]*)<\/td><td>([^<]*)<\/td><td>([^<]+)<\/td><\/tr>/g)];
  console.log(`\n=== VERIFY chronological astronomy: published rows = ${pubRows.length}, my specials = ${specials.length} ===`);
  for(let i=0;i<Math.min(pubRows.length,specials.length);i++){ const r=pubRows[i]; const sp=specials[i];
    const pubYear=r[2], pubAge=r[3], pubSign=r[4], pubLet=r[5];
    const myYear=yearLabel(sp.date), myAge='Age of '+eraForYear(parseDate(sp.date).getUTCFullYear());
    if(pubYear!==myYear){ console.log(`  row${i+1} YEAR fmt: pub="${pubYear}" mine="${myYear}" (${sp.date})`); }
    if(pubSign!==sp.sign){ console.log(`  row${i+1} SIGN mismatch: pub="${pubSign}" mine="${sp.sign}"`); mism++; }
    if(pubLet!==signData[sp.sign].simple){ console.log(`  row${i+1} LETTER mismatch: pub="${pubLet}" mine="${signData[sp.sign].simple}"`); mism++; }
    if(pubAge!==myAge){ console.log(`  row${i+1} AGE: pub="${pubAge}" mine="${myAge}" (preserving published)`); }
  }
  console.log('  → astronomy preserved from published rows; only name/L/class recomputed under gate');
} else console.log('  !! could not locate chronological table in HTML');

// ── write fragments to a file for transcription ──
const out = `# calc_section7.mjs — gated §7 table fragments\n` +
  `\n## OLD vs NEW per-sign |S|=1 biblical-name counts\n` +
  SIGNS.map(s=>{ const d=signData[s]; return `# ${s}: old ${d.oldCount} → new ${d.count} (mother ${d.mom}, ${d.rareDates} rare dates)`; }).join('\n')+'\n' +
  `\n## <master tbody>\n${masterHtml}\n\n## <era tables>\n${eraHtml}\n\n## <chrono tbody>\n${chronoHtml}\n`;
writeFileSync(new URL('section7_fragments.md',import.meta.url), out);
console.log('\n→ fragments written to scripts/section7_fragments.md');

// helper to both print and tag
function writeOut(tag, html){ console.log(`\n── ${tag} ──\n${html}`); }