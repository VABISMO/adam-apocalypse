// One-off: bake ALL rare alignments (maxInSign ≥ 5 — the 5-, 6-, and 7-body clusterings
// the user asked for, not just the 51 all-7-in-sign grand conjunctions) into two compact
// arrays so alignmentRecurrence can show the true stellar-recurrence gap for EVERY word
// over the full 22,000-yr scan — using the REAL reading rule (simples ⊆ occupiedSigns AND
// mothers ⊆ availableMothers), not the single-sign approximation the 51-only set forced.
//
// For each alignment event we recompute the full occupied-sign set (the stored `sign` field
// is only the MAX sign; maxInSign 5/6 events spread bodies across 2–3 signs, so a multi-sign
// word can read at them — the 51-only version missed this entirely).
//   ALL_ALIGN_YEARS[i] = integer year (BCE negative), sorted ascending
//   ALL_ALIGN_OM[i]    = (occupied-simple bitmask, bit j = SIGNS[j]'s letter) |
//                        (available-mother bitmask << 12,  א=bit12 מ=bit13 ש=bit14)
import { readFileSync } from 'node:fs';
import { SIGNS, SIMPLE, MOTHERS, BODIES7, skyAt7, occupiedSigns, availableMothers, parseDate } from './src/core.jsx';

const ES2EN = { Acuario:'Aquarius', Aries:'Aries', Capricornio:'Capricorn', 'Cáncer':'Cancer',
  Escorpio:'Scorpio', Géminis:'Gemini', Leo:'Leo', Libra:'Libra', Piscis:'Pisces',
  Sagitario:'Sagittarius', Tauro:'Taurus', Virgo:'Virgo' };
const simpleBits = SIGNS.map(s => SIMPLE[s][0]);   // ['ה','ו','ז','ח','ט','י','ל','נ','ס','ע','צ','ק']
const momBits = MOTHERS.map(m => m[0]);             // ['א','מ','ש']
const bitOf = (c, arr) => { const i = arr.indexOf(c); return i < 0 ? 0 : (1 << i); };

const raw = JSON.parse(readFileSync(new URL('alignments.json', import.meta.url), 'utf8'));
// merge scanA + scanB, keep only maxInSign ≥ 5 (5, 6, 7), dedupe by date string
const byDate = new Map();
for (const e of [...raw.scanA, ...raw.scanB]) {
  if (e.maxInSign < 5) continue;
  if (byDate.has(e.date)) continue;                 // first occurrence wins; scanA+scanB overlap
  byDate.set(e.date, e);
}
console.error(`events maxInSign>=5 (deduped): ${byDate.size}`);

const recs = [];
let mismatch = 0;
for (const e of byDate.values()) {
  const d = parseDate(e.date);
  if (!d) { console.error('bad date', e.date); continue; }
  const rows = skyAt7(e.date);
  const occ = occupiedSigns(rows);                  // Set of occupied sign names (English)
  const moms = availableMothers(occ);
  // sanity: the stored Spanish max-sign must be among the recomputed occupied signs
  const en = ES2EN[e.sign];
  if (!en || !occ.has(en)) mismatch++;
  let om = 0; for (const c of occ)  om |= bitOf(SIMPLE[c][0], simpleBits);
  let mm = 0; for (const c of moms) mm |= bitOf(c, momBits);
  recs.push({ year: d.getUTCFullYear(), om: om | (mm << 12) });
}
console.error(`recomputed: ${recs.length}, max-sign mismatches: ${mismatch}`);
recs.sort((a, b) => a.year - b.year);

const YEARS = recs.map(r => r.year);
const OM = recs.map(r => r.om);

// sanity: how many of these alignments each test word reads at (real reading rule)
function alignCount(simpChars, momChars) {
  let n = 0;
  for (let i = 0; i < OM.length; i++) {
    const occ = OM[i] & 0xFFF, mom = (OM[i] >> 12) & 0x7;
    let ok = true;
    for (const c of simpChars) { const b = bitOf(c, simpleBits); if ((occ & b) !== b) { ok = false; break; } }
    if (ok) for (const c of momChars) { const b = bitOf(c, momBits); if ((mom & b) !== b) { ok = false; break; } }
    if (ok) n++;
  }
  return n;
}
// gap stats for a word
function gaps(simpChars, momChars) {
  const ys = [];
  for (let i = 0; i < OM.length; i++) {
    const occ = OM[i] & 0xFFF, mom = (OM[i] >> 12) & 0x7;
    let ok = true;
    for (const c of simpChars) { const b = bitOf(c, simpleBits); if ((occ & b) !== b) { ok = false; break; } }
    if (ok) for (const c of momChars) { const b = bitOf(c, momBits); if ((mom & b) !== b) { ok = false; break; } }
    if (ok) ys.push(YEARS[i]);
  }
  const g = []; for (let i = 1; i < ys.length; i++) g.push(ys[i] - ys[i - 1]);
  g.sort((a, b) => a - b);
  return { n: ys.length, first: ys[0], last: ys[ys.length - 1],
    min: g[0] || 0, median: g.length ? g[Math.floor(g.length / 2)] : 0, max: g[g.length - 1] || 0 };
}
console.error(JSON.stringify({
  total: YEARS.length,
  range: `${YEARS[0]} … ${YEARS[YEARS.length - 1]}`,
  sanity: {
    doubles_only_no_simp_no_mom: alignCount([], []),
    Esther_ס_Sagittarius_mom_א: { count: alignCount(['ס'], ['א']), gaps: gaps(['ס'], ['א']) },
    YHVH_יה_ו_is_double_so_simp_יה: { count: alignCount(['י', 'ה'], []), gaps: gaps(['י', 'ה'], []) },
    Heh_only_ה_Aries: alignCount(['ה'], []),
    Vav_only_ו_Taurus: alignCount(['ו'], []),
  }
}, null, 2));

// emit the two arrays as compact JS literals
const emit = (name, arr) => `const ${name} = [${arr.join(',')}];`;
console.log(emit('ALL_ALIGN_YEARS', YEARS));
console.log(emit('ALL_ALIGN_OM', OM));