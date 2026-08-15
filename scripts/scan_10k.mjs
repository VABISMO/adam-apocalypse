// scan_10k.mjs — 10000 BCE..0 CE, 7-day step, 7 classical bodies.
// Collects rare alignment peaks (maxInSign primary, -span secondary, span<=120°,
// dedup within 30-day window). For each peak computes readable Hebrew names from
// the Sefer Yetzirah simple-letter subset occupied by the 7 bodies, classifies
// name/place/other + biblical (Sefaria Tanakh name_refs.json key presence), and
// compares to a deterministic null (M=200 random |O|-matched simple-letter subsets
// per peak). Also tracks |S|>=2 alignment-specific subset and long-name (len>=5)
// peak-membership uniqueness. Output: scripts/scan_10k.json + stdout summary.
//
// Run:  cd scripts && node scan_10k.mjs
// (scripts/ has symlinks to astronomy-engine.mjs, lexicon.json; name_refs.json lives here)
import * as Lib from './lib.mjs';
const { SIMPLE, SIGNS, LETTER_TO_SIGN, AE_NAME, simpleSet, norm, gematria, ageBoundaries, makeDate } = Lib;
const A = await import('./astronomy-engine.mjs');
const fs = await import('node:fs/promises');

const B7 = ['Saturno','Júpiter','Marte','Sol','Venus','Mercurio','Luna'];
const Y0 = -10000, Y1 = 0, STEP = 7;
const NSH = 200;            // null shuffles per peak
const DEDUP_DAYS = 30;      // peak dedup window
const MAX_SPAN = 120;       // rare-alignment arc threshold
const TOP_N = 12;           // top readable names recorded per peak
const PATRIARCHS = new Set([
  'אברהם','יצחק','יעקב','ישראל','נח','שם','משה','אהרן',
  'דוד','שלמה','יוסף','בנימן','שמואל','יהושע','יששכר','זבולן','אפרים','מנשה'
]);

// ---- load lexicon + name_refs ----
const D = JSON.parse(await fs.readFile('./lexicon.json','utf8'));
const LEX = D.lexicon;                                   // [[cons,trans,gloss,pos],...]
const NREFS = JSON.parse(await fs.readFile('./name_refs.json','utf8'));
const isBib = (cons) => Object.prototype.hasOwnProperty.call(NREFS, cons);

// 12 simple letters -> bit index
const SIMP_LIST = Object.values(SIMPLE).map(([he]) => he);
const SIMP_IDX = new Map(SIMP_LIST.map((l, i) => [l, i]));

function classify(pos) {
  if (!pos) return 'other';
  if (pos.includes('loc')) return 'place';
  if (pos.includes('n-pr')) return 'name';
  return 'other';
}

// precompute lexicon entries with bitmask + classification
const entries = [];
for (const [cons, trans, gloss, pos] of LEX) {
  let mask = 0, nS = 0;
  for (const c of simpleSet(cons)) { mask |= 1 << SIMP_IDX.get(c); nS++; }
  const type = classify(pos);
  entries.push({
    he: cons, trans, gloss, pos,
    mask, nS, len: cons.length, gem: gematria(norm(cons)),
    type, biblical: isBib(cons),
    patriarch: PATRIARCHS.has(norm(cons)),
  });
}
// index entries by mask, and precompute per-mask aggregates
const byMask = new Map();
for (const e of entries) {
  if (!byMask.has(e.mask)) byMask.set(e.mask, []);
  byMask.get(e.mask).push(e);
}
const maskAgg = new Map();   // mask -> {total, bibProper, bibPlace, nS2BibProper, nS2BibPlace, patriarchs:Set}
for (const [mask, list] of byMask) {
  let total = 0, bibProper = 0, bibPlace = 0, nS2BP = 0, nS2BP2 = 0;
  const patri = new Set();
  for (const e of list) {
    total++;
    if (e.type === 'name' && e.biblical) bibProper++;
    if (e.type === 'place' && e.biblical) bibPlace++;
    if (e.nS >= 2) {
      if (e.type === 'name' && e.biblical) nS2BP++;
      if (e.type === 'place' && e.biblical) nS2BP2++;
    }
    if (e.patriarch) patri.add(e.he);
  }
  maskAgg.set(mask, { total, bibProper, bibPlace, nS2BibProper: nS2BP, nS2BibPlace: nS2BP2, patriarchs: patri });
}

// iterate all submasks of occMask (inclusive), summing precomputed aggregates
function aggFor(occMask) {
  let total = 0, bibProper = 0, bibPlace = 0, nS2BP = 0, nS2BP2 = 0;
  const patri = new Set();
  let sub = occMask;
  do {
    const a = maskAgg.get(sub);
    if (a) {
      total += a.total; bibProper += a.bibProper; bibPlace += a.bibPlace;
      nS2BP += a.nS2BibProper; nS2BP2 += a.nS2BibPlace;
      if (a.patriarchs.size) for (const p of a.patriarchs) patri.add(p);
    }
    sub = (sub - 1) & occMask;
  } while (sub !== occMask);
  return { total, bibProper, bibPlace, nS2BibProper: nS2BP, nS2BibPlace: nS2BP2, patriarchs: patri };
}
// collect actual readable entries for a real peak (for top-N + long-name tracking)
function entriesFor(occMask) {
  const out = [];
  let sub = occMask;
  do {
    const list = byMask.get(sub);
    if (list) for (const e of list) out.push(e);
    sub = (sub - 1) & occMask;
  } while (sub !== occMask);
  return out;
}

// ---- sky / astronomy ----
function sky7(d) {
  const rows = [];
  for (const b of B7) {
    const v = A.GeoVector(A.Body[AE_NAME[b]], d, true);
    const lon = A.Ecliptic(v).elon;
    let si = Math.floor(lon / 30) % 12; if (si < 0) si += 12;
    rows.push({ body: b, lon, sign: SIGNS[si] });
  }
  return rows;
}
function occMaskOf(rows) { let m = 0; for (const r of rows) m |= 1 << SIMP_IDX.get(SIMPLE[r.sign][0]); return m; }
function occSizeOf(rows) { const s = new Set(); rows.forEach(r => s.add(SIMPLE[r.sign][0])); return s.size; }
function occupiedLettersOf(rows) { const s = new Set(); rows.forEach(r => s.add(SIMPLE[r.sign][0])); return s; }
function maxInSign(rows) { const c = {}; rows.forEach(r => c[r.sign] = (c[r.sign] || 0) + 1); return Math.max(...Object.values(c)); }
function clusterSign(rows) {
  const c = {}; rows.forEach(r => c[r.sign] = (c[r.sign] || 0) + 1);
  let best = rows[0].sign, bn = -1;
  for (const [sg, n] of Object.entries(c)) if (n > bn) { bn = n; best = sg; }
  return best;
}
function arcSpan(rows) {
  const lons = rows.map(r => { let si = SIGNS.indexOf(r.sign); return si * 30 + (r.lon - si * 30); });
  const s = [...lons].sort((a, b) => a - b);
  let maxGap = (s[0] + 360) - s[s.length - 1];
  for (let i = 1; i < s.length; i++) maxGap = Math.max(maxGap, s[i] - s[i - 1]);
  return 360 - maxGap;
}
function fmtDay(d) {
  const y = d.getUTCFullYear(), mo = String(d.getUTCMonth() + 1).padStart(2, '0'), da = String(d.getUTCDate()).padStart(2, '0');
  return (y < 0 ? '-' : '') + String(Math.abs(y)).padStart(4, '0') + '-' + mo + '-' + da;
}

// precessional era (cyclic, ~2147 y each, great year ~25771 y) — mirrors calc_alignments
const ERAS = ageBoundaries();
const GREAT_YEAR = 25771;
let ERA_MIN = Infinity, ERA_MAX = -Infinity;
for (const e of ERAS) { if (e.start < ERA_MIN) ERA_MIN = e.start; if (e.end > ERA_MAX) ERA_MAX = e.end; }
function eraForYear(y) {
  let yy = y;
  while (yy < ERA_MIN) yy += GREAT_YEAR;
  while (yy >= ERA_MAX) yy -= GREAT_YEAR;
  for (const e of ERAS) if (yy >= Math.round(e.start) && yy < Math.round(e.end)) return e.sign;
  return '?';
}

// ---- scan: collect rare days (span<=MAX_SPAN), then dedup to peaks ----
function daysInMonth(y, mo) {
  if (mo === 2) return (y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0)) ? 29 : 28;
  return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][mo - 1];
}
const rareDays = [];
process.stderr.write(`scanning ${Y0}..${Y1} step ${STEP}d\n`);
const t0 = Date.now();
for (let y = Y0; y <= Y1; y++) {
  for (let mo = 1; mo <= 12; mo++) {
    const dm = daysInMonth(y, mo);
    for (let da = 1; da <= dm; da += STEP) {
      const d = makeDate(y, mo, da);
      const rows = sky7(d);
      const span = arcSpan(rows);
      if (span <= MAX_SPAN) {
        rareDays.push({ date: d, rows, m: maxInSign(rows), span });
      }
    }
  }
}
process.stderr.write(`rare days (span<=${MAX_SPAN}°): ${rareDays.length}  [${((Date.now() - t0) / 1000).toFixed(1)}s]\n`);

// dedup: sort by date, cluster within DEDUP_DAYS; keep peak = max maxInSign, tiebreak min span
rareDays.sort((a, b) => a.date - b.date);
const peaks = [];
let cur = null;
for (const rd of rareDays) {
  if (cur && (rd.date - cur.date) / 86400000 <= DEDUP_DAYS) {
    if (rd.m > cur.m || (rd.m === cur.m && rd.span < cur.span)) cur = rd;
  } else {
    if (cur) peaks.push(cur);
    cur = rd;
  }
}
if (cur) peaks.push(cur);
process.stderr.write(`peaks (dedup ${DEDUP_DAYS}d, maxInSign then -span): ${peaks.length}  cadence ~${((Y1 - Y0) / (peaks.length || 1)).toFixed(0)} y\n`);

// ---- PRNG (deterministic, seeded) ----
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const rnd = mulberry32(20260811);
function nullOccMask(occSize) {   // random subset of 12 simples of given size
  const idx = [...Array(12).keys()];
  for (let i = 11; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  let m = 0; for (let i = 0; i < occSize; i++) m |= 1 << idx[i];
  return m;
}

// ---- per-peak real + null ----
const perPeak = [];
// long-name (len>=5, nS>=1) peak-membership
const longNamePeaks = new Map();   // he -> array of peak indices
const t1 = Date.now();
peaks.forEach((pk, idx) => {
  const occMask = occMaskOf(pk.rows);
  const occSize = occSizeOf(pk.rows);
  const occLetters = [...occupiedLettersOf(pk.rows)].sort();
  const real = aggFor(occMask);
  const allEntries = entriesFor(occMask);
  // top-N by length desc, then gematria asc, then he
  const top = allEntries.slice().sort((a, b) => b.len - a.len || a.gem - b.gem || (a.he < b.he ? -1 : 1)).slice(0, TOP_N);
  const topNames = top.map(e => ({
    he: e.he, gloss: e.gloss, type: e.type, biblical: e.biblical,
    len: e.len, nS: e.nS, gem: e.gem,
  }));
  // long-name membership (len>=5, nS>=1)
  for (const e of allEntries) {
    if (e.len >= 5 && e.nS >= 1) {
      if (!longNamePeaks.has(e.he)) longNamePeaks.set(e.he, []);
      longNamePeaks.get(e.he).push(idx);
    }
  }
  // null: M shuffles
  let nBP = 0, nBP2 = 0;
  for (let s = 0; s < NSH; s++) {
    const om = nullOccMask(occSize);
    const a = aggFor(om);
    nBP += a.bibProper; nBP2 += a.bibPlace;
  }
  const nullBibProper = nBP / NSH;
  const nullBibPlace = nBP2 / NSH;
  perPeak.push({
    date: fmtDay(pk.date),
    era: eraForYear(pk.date.getUTCFullYear()),
    sign: clusterSign(pk.rows),
    occupiedLetters: occLetters.join(''),
    occSize,
    maxInSign: pk.m,
    span: +pk.span.toFixed(1),
    total: real.total,
    bibProper: real.bibProper,
    bibPlace: real.bibPlace,
    nS2BibProper: real.nS2BibProper,
    nS2BibPlace: real.nS2BibPlace,
    patriarchs: [...real.patriarchs],
    nullBibProper, nullBibPlace,
    topNames,
  });
});
process.stderr.write(`per-peak real+null computed [${((Date.now() - t1) / 1000).toFixed(1)}s]\n`);

// ---- aggregate ----
const n = perPeak.length || 1;
const sum = (f) => perPeak.reduce((a, x) => a + f(x), 0);
const avgTotal = sum(x => x.total) / n;
const avgBibProper = sum(x => x.bibProper) / n;
const avgBibPlace = sum(x => x.bibPlace) / n;
const avgFrac = sum(x => x.total ? x.bibProper / x.total : 0) / n;
const nullAvgBibProper = sum(x => x.nullBibProper) / n;
const nullAvgBibPlace = sum(x => x.nullBibPlace) / n;
const enrichment = nullAvgBibProper ? avgBibProper / nullAvgBibProper : null;
const enrichmentPlace = nullAvgBibPlace ? avgBibPlace / nullAvgBibPlace : null;
const nS2AvgBibProper = sum(x => x.nS2BibProper) / n;
const nS2AvgBibPlace = sum(x => x.nS2BibPlace) / n;
// long-name unique-to-one-peak
let longNamesUniqueToOne = 0, longNamesTotal = 0;
for (const [he, arr] of longNamePeaks) {
  const distinct = new Set(arr).size;
  longNamesTotal++;
  if (distinct === 1) longNamesUniqueToOne++;
}
// patriarchs enrichment
const realPatriCount = perPeak.filter(x => x.patriarchs.length > 0).length;
const realPatriNames = sum(x => x.patriarchs.length) / n;
let nullPatriMean = 0;
{
  // null patriarch rate: re-use stored null occMasks? we didn't keep them; recompute cheaply
  // per peak, M shuffles already consumed the PRNG in order; for patriarch null we approximate
  // by drawing NSH fresh shuffles per peak and counting peaks with >=1 patriarch readable.
  // (Independent stream would need a second PRNG; we reuse the same seeded one continuing.)
  let nullPatriPeaks = 0;
  for (const pk of perPeak) {
    const occSize = pk.occSize;
    let any = 0;
    for (let s = 0; s < NSH; s++) {
      const om = nullOccMask(occSize);
      const a = aggFor(om);
      if (a.patriarchs.size > 0) any++;
    }
    if (any / NSH > 0) nullPatriPeaks += any / NSH;  // expected fraction per peak, summed
  }
  nullPatriMean = nullPatriPeaks / n;
}
const patriEnrichment = nullPatriMean ? (realPatriCount / n) / nullPatriMean : null;

const aggregate = {
  avgTotal: +avgTotal.toFixed(2),
  avgBibProper: +avgBibProper.toFixed(3),
  avgBibPlace: +avgBibPlace.toFixed(3),
  avgFrac: +avgFrac.toFixed(4),
  nullAvgBibProper: +nullAvgBibProper.toFixed(3),
  nullAvgBibPlace: +nullAvgBibPlace.toFixed(3),
  enrichment: enrichment ? +enrichment.toFixed(3) : null,
  enrichmentPlace: enrichmentPlace ? +enrichmentPlace.toFixed(3) : null,
  nS2AvgBibProper: +nS2AvgBibProper.toFixed(3),
  nS2AvgBibPlace: +nS2AvgBibPlace.toFixed(3),
  longNamesUniqueToOnePeak: longNamesUniqueToOne,
  longNamesTotal,
  patriachs: {
    set: [...PATRIARCHS],
    realPeakCount: realPatriCount,
    realPeakFraction: +(realPatriCount / n).toFixed(4),
    realMeanNamesPerPeak: +realPatriNames.toFixed(3),
    nullMeanPeaksWithPatriarch: +nullPatriMean.toFixed(4),
    enrichment: patriEnrichment ? +patriEnrichment.toFixed(3) : null,
  },
};

const out = {
  generated: new Date().toISOString().slice(0, 10),
  range: { from: `${Y0} BCE`, to: `${Y1} CE`, step: STEP, bodies: B7, maxSpan: MAX_SPAN, dedupDays: DEDUP_DAYS, nullShuffles: NSH },
  nPeaks: peaks.length,
  perPeak,
  aggregate,
};
await fs.writeFile('./scan_10k.json', JSON.stringify(out, null, 1));
process.stderr.write(`scan_10k.json written [total ${((Date.now() - t0) / 1000).toFixed(1)}s]\n`);

// ---- stdout summary ----
const line = (x) => console.log(x);
line(`\n=== scan_10k: ${Y0} BCE..${Y1} CE, step ${STEP}d, 7 classical bodies ===`);
line(`peaks: ${peaks.length}  (span<=${MAX_SPAN}°, dedup ${DEDUP_DAYS}d)  cadence ~${((Y1 - Y0) / (peaks.length || 1)).toFixed(0)} y/peak`);
line(`\n--- AGGREGATE over ${peaks.length} peaks ---`);
line(`avgTotal readable        = ${aggregate.avgTotal}`);
line(`avgBibProper             = ${aggregate.avgBibProper}   null = ${aggregate.nullAvgBibProper}   enrichment = ${aggregate.enrichment}x`);
line(`avgBibPlace              = ${aggregate.avgBibPlace}   null = ${aggregate.nullAvgBibPlace}   enrichment = ${aggregate.enrichmentPlace}x`);
line(`avgFrac (bibProper/total)= ${aggregate.avgFrac}`);
line(`|S|>=2  bibProper avg    = ${aggregate.nS2AvgBibProper}   bibPlace avg = ${aggregate.nS2AvgBibPlace}`);
line(`long names (len>=5): total distinct = ${aggregate.longNamesTotal}, unique to ONE peak = ${aggregate.longNamesUniqueToOnePeak}`);
line(`patriarchs: real peaks with >=1 = ${realPatriCount}/${peaks.length} (${aggregate.patriachs.realPeakFraction}), null mean = ${aggregate.patriachs.nullMeanPeaksWithPatriarch}, enrichment = ${aggregate.patriachs.enrichment}x`);

line(`\n--- FIRST 15 PEAKS (date | era | sign | maxInSign | span | |O| | total | bibProper | bibPlace | nullBP | nullBPl | top-5) ---`);
for (const pk of perPeak.slice(0, 15)) {
  line(`\n${pk.date}  era=${pk.era}  ${pk.sign}  m=${pk.maxInSign}  span=${pk.span}°  |O|=${pk.occSize}  [${pk.occupiedLetters}]`);
  line(`  total=${pk.total}  bibProper=${pk.bibProper}  bibPlace=${pk.bibPlace}  nullBP=${pk.nullBibProper.toFixed(2)}  nullBPl=${pk.nullBibPlace.toFixed(2)}  nS2BP=${pk.nS2BibProper}  nS2BPl=${pk.nS2BibPlace}` + (pk.patriarchs.length ? `  PATRI=[${pk.patriarchs.join(',')}]` : ''));
  pk.topNames.slice(0, 5).forEach((t, i) =>
    line(`    ${i + 1}. len=${t.len} |S|=${t.nS} ${t.type}${t.biblical ? ' [BIB]' : ''}  ${t.he}  ${t.gloss}`)
  );
}
line(`\nRe-run:  cd scripts && node scan_10k.mjs`);