// calc_negative_control.mjs — THE DECISIVE SECOND EXPERIMENT.
//
// A negative-control alphabet. Keep EVERYTHING fixed:
//   - the same 22 characters
//   - the same letter frequencies (within-entry, by construction)
//   - the same corpus + the same names (lexicon.json, n-pr)
//   - the same skies (the 51 |O|=1 seven-planet specials, from alignments.json)
//   - the same rule (3 mothers / 7 doubles / 12 simples; the geometric mother-gate)
// and randomize ONLY the letter↔sign wiring (permute the 12 simple letters across the
// 12 signs; the 3 mothers stay fixed to their zone-angles by geometry, as the gate
// requires — mothers depend on the occupied SIGN, not on the simple↔sign permutation,
// per build_proofs.mjs permutationTest).
//
// Then re-run the FULL battery on each rewired alphabet and ask, for every statistic the
// paper presents as a sky signal: is the REAL wiring extreme vs the random wirings?
//
//   Run:  node scripts/calc_negative_control.mjs [N=2000] [seed=1]
import { readFileSync } from 'node:fs';
import * as Astronomy from '../data/astronomy-engine.mjs';

// ── gate (verbatim, same as calc_threat_b_jongeling / core.jsx) ──
const SIMP = ['ה','ו','ז','ח','ט','י','ל','נ','ס','ע','צ','ק'];            // 12 simples, gematria-ascending → Aries..Pisces
const SIMPSET = new Set(SIMP);
const MOTHERS = [['ש',38],['מ',89],['א',268]];                            // 3 mothers at zone angles
const MLET = new Set(MOTHERS.map(m => m[0]));
const MOTHERBIT = { 'ש':0, 'מ':1, 'א':2 };
const ang = (a,b) => { let d = Math.abs(a-b)%360; return d>180?360-d:d; };
const nearestMother = si => { const lon = si*30+15; let best=null, bd=Infinity; for(const [h,m] of MOTHERS){ const d=ang(lon,m); if(d<bd){bd=d;best=h;} } return best; };

// ── lexicon + name_refs (the SAME corpus, the SAME names) ──
const LEX = JSON.parse(readFileSync(new URL('../web/lexicon.json', import.meta.url),'utf8')).lexicon;
const isNamePos = p => String(p||'').startsWith('n-pr');
const FIN = { 'ן':'נ','ץ':'צ','ך':'כ','ם':'מ','ף':'פ' };
const norm = s => [...s].map(c => FIN[c]||c).join('');
const NAMES = LEX.filter(e => isNamePos(e[3])).map(e => norm(e[0]));     // biblical proper names (n-pr + n-pr-loc)
const LEXSET = new Set(LEX.map(e => norm(e[0])));
const nameRefs = JSON.parse(readFileSync(new URL('../web/name_refs.json', import.meta.url),'utf8'));

// Canaanite / Yahwistic classification (verbatim calc_canaanite_vs_yahwistic.mjs)
const THEO_ROOTS = ['בעל','אל','יה','יו','עשתר','דגון','דגן','כמוש','כמש','ענת','צדק','נבו','כוש','אשרה','שמש'];
const isTheo = c => { for(const r of THEO_ROOTS) if(c.includes(r)) return true; return false; };
const isYahwistic = c => c.includes('יה')||c.includes('יו');
const isCanaanite = c => isTheo(c) && !isYahwistic(c);

// period classification (verbatim build_proofs.mjs) — for the period-clustering test
const PERIOD_OF_BOOK = { Genesis:'Patriarchs/Conquest', Exodus:'Patriarchs/Conquest', Leviticus:'Patriarchs/Conquest',
  Numbers:'Patriarchs/Conquest', Deuteronomy:'Patriarchs/Conquest', Joshua:'Patriarchs/Conquest', Judges:'Patriarchs/Conquest',
  '1 Samuel':'Monarchy', '2 Samuel':'Monarchy', '1 Kings':'Monarchy', '2 Kings':'Monarchy', Ruth:'Monarchy',
  Psalms:'Monarchy', Proverbs:'Monarchy', Ecclesiastes:'Monarchy', Song:'Monarchy', Job:'Monarchy',
  Isaiah:'Exile/Prophets', Jeremiah:'Exile/Prophets', Ezekiel:'Exile/Prophets', Hosea:'Exile/Prophets',
  Joel:'Exile/Prophets', Amos:'Exile/Prophets', Obadiah:'Exile/Prophets', Jonah:'Exile/Prophets',
  Micah:'Exile/Prophets', Nahum:'Exile/Prophets', Habakkuk:'Exile/Prophets', Zephaniah:'Exile/Prophets',
  Haggai:'Exile/Prophets', Zechariah:'Exile/Prophets', Malachi:'Exile/Prophets',
  Lamentations:'Post-exile', Daniel:'Post-exile', Ezra:'Post-exile', Nehemiah:'Post-exile',
  Esther:'Post-exile', '1 Chronicles':'Post-exile', '2 Chronicles':'Post-exile' };
const bookOf = ref => { if(!ref) return null; const m = /^([1-3]?\s?[A-Z][a-z]+)/.exec(ref); return m ? m[1].replace(/\s+/g,' ') : null; };
const periodOf = ref => { const b = bookOf(ref); return b ? (PERIOD_OF_BOOK[b]||'Other') : null; };

// ── the 51 specials (the SAME skies) ──
function daysInMonth(y,mo){ if(mo===2) return (y%4===0&&(y%100!==0||y%400===0))?29:28; return [31,28,31,30,31,30,31,31,30,31,30,31][mo-1]; }
function makeDate(y,mo,da,h=12){ const d=new Date(Date.UTC(2000,mo-1,da,h,0,0)); d.setUTCFullYear(y); return d; }
function parseDate(s){ if(!s) return null; const m=/^(-?\d{1,5})-(\d{2})-(\d{2})$/.exec(s); if(!m) return null; const y=+m[1],mo=+m[2],da=+m[3]; if(mo<1||mo>12||da<1||da>daysInMonth(y,mo)) return null; const d=makeDate(y,mo,da); return isNaN(d.getTime())?null:d; }
const BODIES = ['Saturn','Jupiter','Mars','Sun','Venus','Mercury','Moon'];
function skyAt7(s){ if(!s) return []; const d=parseDate(s); if(!d) return []; return BODIES.map(b => { const v=Astronomy.GeoVector(Astronomy.Body[b],d,true); const lon=Astronomy.Ecliptic(v).elon; let si=Math.floor(lon/30)%12; if(si<0) si+=12; return si; }); }
const align = JSON.parse(readFileSync(new URL('../web/alignments.json', import.meta.url),'utf8'));
const ALL = [...align.scanA, ...align.scanB];
const seen = new Set(); const SPECIALS = [];
for(const a of ALL){ if(a.maxInSign!==7) continue; if(seen.has(a.date)) continue; seen.add(a.date); const occ=new Set(skyAt7(a.date));
  let mask=0; for(const si of occ) mask |= (1<<MOTHERBIT[nearestMother(si)]); SPECIALS.push({ occIdx:occ, moms:mask }); }
console.log(`negative-control harness — 51 specials, ${NAMES.length} biblical proper names, ${LEXSET.size} lexicon entries\n`);

// ── the battery, parameterized by a simpleList (12 simples in SIGN order Aries..Pisces) ──
// compound rule (verbatim discriminate8): split into two lexicon sub-words, each >=2
function isCompound(c){ for(let i=2;i<=c.length-2;i++){ if(LEXSET.has(c.slice(0,i))&&LEXSET.has(c.slice(i))) return true; } return false; }

// PRECOMPUTE every name's gate-invariant attributes ONCE (do not depend on the wiring):
// the single simple it has (or null if |S|≠1), its mother-mask, length, class, compound, period.
// Index names by their single simple so the per-wiring loop is O(specials × names-on-that-simple).
const NAME_TAB = [];
const BY_SIMP = new Map(); // simple-letter -> array of name entries with that single simple
const BY_CONS = new Map(); // cons -> entry (for fast summarize join)
for(const c of NAMES){
  const simp = [...new Set([...c].filter(ch => SIMPSET.has(ch)))];
  if(simp.length !== 1) continue;                       // only |S|=1 names can surface on |O|=1 specials
  const s = simp[0];
  let mm=0; for(const ch of c) if(MLET.has(ch)) mm |= (1<<MOTHERBIT[ch]);
  const ref = nameRefs[c] && nameRefs[c].refs && nameRefs[c].refs[0];
  const e = { cons:c, simp:s, mm, len:c.length, theo:isTheo(c), yah:isYahwistic(c), can:isCanaanite(c), compound:isCompound(c), period:periodOf(ref) };
  NAME_TAB.push(e);
  BY_CONS.set(c, e);
  if(!BY_SIMP.has(s)) BY_SIMP.set(s, []);
  BY_SIMP.get(s).push(e);
}

// readable |S|=1 distinct strings of the NAME set on the 51 specials, under a given wiring.
function battery(simpleList){
  const out = new Set();
  for(const sp of SPECIALS){
    const signIdx = [...sp.occIdx][0];                 // |O|=1 ⇒ exactly one sign
    const lit = simpleList[signIdx];                   // the simple this sign lights under THIS wiring
    const cand = BY_SIMP.get(lit); if(!cand) continue;
    for(const e of cand){ if((sp.moms & e.mm) === e.mm) out.add(e.cons); }
  }
  return out;
}

// summarize a battery result into the statistic vector
function summarize(surfaced){
  // join surfaced cons -> their precomputed entries
  const ents = [...surfaced].map(c => BY_CONS.get(c)).filter(Boolean);
  const n = ents.length;
  const compound = ents.filter(x => x.compound).length;
  const canAll = ents.filter(x => x.can).length;       // Canaanite theo, ANY length (the §6.4 "7" claim)
  const yahAll = ents.filter(x => x.yah).length;       // Yahwistic, ANY length (the §6.4 "0" claim)
  const canLong = ents.filter(x => x.can && x.len>=5).length;
  const yahLong = ents.filter(x => x.yah && x.len>=5).length;
  const maxLen = ents.reduce((m,x) => Math.max(m,x.len), 0);
  const tally = {}; let tot=0;
  for(const x of ents){ if(!x.period) continue; tally[x.period]=(tally[x.period]||0)+1; tot++; }
  const domShare = tot ? Math.max(...Object.values(tally))/tot : 0;
  return { readable:n, compound, compoundRate: n?compound/n:0, canAll, yahAll, canLong, yahLong, maxLen, domShare, domTot:tot };
}

// ── RNG + permutation (the negative control: shuffle the 12 simples across the 12 signs) ──
function mulberry32(a){ return function(){ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
function shuffle(arr,rng){ const a=arr.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(rng()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }

const N = parseInt((process.argv.find(a=>a.startsWith('N='))||'N=2000').slice(2),10);
const SEED = parseInt((process.argv.find(a=>a.startsWith('seed='))||'seed=1').slice(5),10);
const rng = mulberry32(SEED);

// ── REAL wiring ──
const REAL = summarize(battery(SIMP));
console.log('REAL wiring (documented SY gematria-ascending):');
console.log(JSON.stringify(REAL, null, 2), '\n');

// ── N random wirings ──
const stats = { readable:[], compound:[], compoundRate:[], canAll:[], yahAll:[], canLong:[], yahLong:[], maxLen:[], domShare:[] };
const t0 = Date.now();
for(let r=0; r<N; r++){
  const s = summarize(battery(shuffle(SIMP, rng)));
  for(const k of Object.keys(stats)) stats[k].push(s[k]);
  if((r+1)%500===0) console.error(`  ...${r+1}/${N}  (${Date.now()-t0}ms)`);
}

// ── report ──
const pct = (arr,q) => { const s=[...arr].sort((a,b)=>a-b); return s[Math.min(s.length-1, Math.floor(q*(s.length-1)))]; };
const mean = arr => arr.reduce((a,b)=>a+b,0)/arr.length;
// p-value: for "higher is more extreme" stats, fraction of null >= real; for domShare same.
function row(label, realArr, real, higherBetter=true){
  const arr = realArr;
  const m = mean(arr), p5 = pct(arr,0.05), p95 = pct(arr,0.95);
  const ge = arr.filter(x => higherBetter ? x>=real : x<=real).length;
  const p = ge/arr.length;
  const enr = real/m;
  let verdict;
  // INVARIANT: null band is essentially a spike at the real value (sd ~ 0)
  const sd = Math.sqrt(mean(arr.map(x => (x-m)**2)));
  if(sd < 1e-9) verdict = 'INVARIANT (wiring does no work — measures the lexicon/rule, not the wiring)';
  else if(p >= 0.05) verdict = 'AT CHANCE (real wiring not detectably special vs random)';
  else verdict = `SURVIVES (p=${p.toFixed(4)})`;
  return { label, real, nullMean:+m.toFixed(3), P5:+p5.toFixed(3), P95:+p95.toFixed(3), enrichment:+enr.toFixed(3), p, sd:+sd.toFixed(4), verdict };
}

const rows = [
  row('readable |S|=1 count on 51 specials (§7)',         stats.readable,      REAL.readable),
  row('compound count (§6.2)',                            stats.compound,      REAL.compound),
  row('compound RATE (§6.2, 3.99× claim)',                stats.compoundRate,  REAL.compoundRate),
  row('Canaanite theo surfacing, ANY length (§6.4 "7" claim)', stats.canAll,   REAL.canAll),
  row('Yahwistic surfacing, ANY length (§6.4 "0" claim)', stats.yahAll,        REAL.yahAll),
  row('Canaanite long-compounds (len≥5)',                 stats.canLong,       REAL.canLong),
  row('Yahwistic long-compounds (len≥5)',                 stats.yahLong,       REAL.yahLong),
  row('longest readable name (§7 length claim)',          stats.maxLen,        REAL.maxLen),
  row('period dominant-share (§6.3 clustering claim)',    stats.domShare,      REAL.domShare),
];

console.log(`\n══ NEGATIVE CONTROL — ${N} random letter↔sign wirings (seed=${SEED}) ══`);
console.log('everything fixed (22 chars, corpus, names, 51 skies, 3/7/12 rule); ONLY letter↔sign permuted.\n');
for(const r of rows){
  console.log(`▸ ${r.label}`);
  console.log(`    real=${r.real}  null: mean=${r.nullMean} [P5=${r.P5}, P95=${r.P95}]  enrich=${r.enrichment}×  p=${r.p.toFixed(4)}  sd=${r.sd}`);
  console.log(`    → ${r.verdict}\n`);
}

console.log('══ CONTRAST: Statistic A (7 doubles ↔ 7 planets sidereal order) ══');
console.log('    This is a DIFFERENT wiring (doubles↔planets, not simples↔signs) and IS the');
console.log('    quantity varied by its own exhaustive 5040-permutation null: r=-0.944 reverse,');
console.log('    p = 3/5040 = 0.060% (forward 1/5040, the single strongest of all 5040 pairings).');
console.log('    → SURVIVES its own exhaustive negative control. (scripts/calc_godperiod.mjs)\n');

console.log('══ STRUCTURAL NOTE ══');
console.log('  Yahwistic compounds contain יה/יו; {yod,heh,vav} are ALL simples, so every');
console.log('  Yahwistic name has |S|≥2 and can NEVER surface on a |O|=1 special — INVARIANT under');
console.log('  any simple↔sign permutation (it depends only on WHICH letters are simples, which the');
console.log('  rule fixes, not on the sign assignment). The Canaanite count, by contrast, depends on');
console.log('  the mother-zone alignment each simple lands in, so it varies — watch that row.\n');

console.log(`done (${Date.now()-t0}ms).`);