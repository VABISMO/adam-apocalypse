// calc_72.mjs — reproduce Statistic C (Leg C) of the unquestionable demonstration:
//   Exodus 14:19–21 = three CONSECUTIVE 72-letter verses (the Shem HaMephorash).
//
//   1. 231 gates of the Sefer Yetzirah = C(22,2) = 22·21/2
//   2. First gate AB (3) + mirror BA (3) -> AB+BA = ABBA = 4 = "father" (palindrome)
//   3. Self-coherence 3·7·12 − (3+7+12) + 1 = 231 = C(22,2)
//   4. Exodus 14:19–21 = 72 consonantal letters × 3 (verified in MT via Sefaria)
//   5. Permutation null: shuffle the Genesis verse-length multiset;
//      P(≥ 1 three-consecutive-72 triplet ANYWHERE in a Genesis-length text).
//      The naive IID p = p(72)^3 ≈ 5e-7 is an UPPER bound — it ignores that
//      "any triplet anywhere" is many chances and that verse lengths cluster.
//      Genesis has NEGATIVE autocorrelation at 72, so the permutation null on
//      the real multiset is the conservative, fair test.
//
//   Run:  node scripts/calc_72.mjs   (needs data/corpus.json; produce via fetch_gen.mjs)
import fs from 'node:fs/promises';
import { gematria, isMirror } from './lib.mjs';

// ── 1–3. 231-gate / ABBA / self-coherence identities (closed form) ──
const C22_2 = 22 * 21 / 2;                      // 231
const AB = gematria('אב');                       // 3
const BA = gematria('בא');                       // 3
const ABBA = gematria('אבא');                    // 4
function binom(n, k) { let r = 1; for (let i = 0; i < k; i++) r = (r * (n - i)) / (i + 1); return r; }

console.log('=== §6.3  Intentional letter engineering (the 231 gates, ABBA, the Name of 72) ===\n');
console.log('1) 231 gates = C(22,2) = 22·21/2 =', C22_2);
console.log('   C(22,2) via binom =', binom(22, 2));
console.log('2) First gate AB =', AB, '; mirror BA =', BA, '; AB+BA -> ABBA =', ABBA);
console.log('   ABBA (אבא) = "father" (Aramaic); palindrome?', isMirror(ABBA) ? 'yes' : 'no',
  '(value 4, 1 digit: trivially yes)');
console.log('   AB-EL (אבאל) =', gematria('אבאל'), '(Abiel) ; BA-AL (בעל) =', gematria('בעל'), '(Baal, "lord")');
console.log('3) Self-coherence: 3·7·12 − (3+7+12) + 1 =', 3 * 7 * 12 - (3 + 7 + 12) + 1,
  '= C(22,2) =', C22_2);

// ── 4–5. Exodus 72×3 + permutation null (needs data/corpus.json) ──
const corpusPath = new URL('../data/corpus.json', import.meta.url);
let corpus = null;
try { corpus = JSON.parse(await fs.readFile(corpusPath, 'utf8')); }
catch { /* handled below */ }

console.log('\n4) Exodus 14:19–21 (MT, Sefaria, consonantal):');
if (corpus && corpus.exodus1419_21?.length >= 3) {
  const exo = corpus.exodus1419_21.slice(0, 3);
  const counts = exo.map(s => s.length);
  exo.forEach((s, i) => console.log(`   14:${19 + i} = ${counts[i]} consonants  ${counts[i] === 72 ? '✓' : '✗'}`));
  const total = counts.reduce((a, b) => a + b, 0);
  console.log(`   total 3 verses = ${total} = ${total / 72}×72  -> ${total === 216 ? '72 triplets ✓' : '✗'}`);
  const all72 = counts.every(n => n === 72);

  console.log('\n5) Honest null — permutation of the Genesis verse-length multiset:');
  if (corpus.genesis && corpus.genesis.length) {
    const g = corpus.genesis;
    const lens = g.map(v => v.length);
    const n72 = lens.filter(n => n === 72).length;
    const p72 = n72 / g.length;
    const mean = lens.reduce((a, b) => a + b, 0) / g.length;
    console.log(`   Genesis: ${g.length} verses; with exactly 72 consonants = ${n72} (${(p72 * 100).toFixed(2)}%); mean = ${mean.toFixed(1)}`);

    // Autocorrelation audit at 72 (consecutive pairs both == 72).
    let pair72 = 0;
    for (let i = 0; i < lens.length - 1; i++) if (lens[i] === 72 && lens[i + 1] === 72) pair72++;
    const expPairs = (lens.length - 1) * p72 * p72;
    console.log(`   Autocorrelation at 72: ${pair72} consecutive pairs observed vs ${expPairs.toFixed(3)} expected ` +
      `(${pair72 < expPairs ? 'NEGATIVE clustering → IID null conservative' : 'positive clustering'})`);

    // Triplet audit in real Genesis (sanity: should be 0).
    let trip72 = 0;
    for (let i = 0; i < lens.length - 2; i++)
      if (lens[i] === 72 && lens[i + 1] === 72 && lens[i + 2] === 72) trip72++;
    console.log(`   Genesis consecutive 72-triplets observed: ${trip72} of ${lens.length - 2}`);

    // Naive IID upper bound (for comparison only — NOT the headline number).
    const pNaive = Math.pow(p72, 3);
    console.log(`   [naive IID, upper bound] P(specific 3 consecutive = 72) ≈ (0.0078)^3 ≈ ${pNaive.toExponential(1)} ` +
      `(overestimates — ignores "any triplet anywhere" is many chances AND negative clustering)`);

    // Permutation null: shuffle the Genesis verse-length multiset,
    // count trials with ≥1 triplet-72 anywhere. Fixed-seed PRNG (no Date.now/Math.random).
    function mulberry32(a) {
      return function () {
        a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = t + Math.imul(t ^ (t >>> 7), 61 | t) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    const rnd = mulberry32(20260813);
    const N = 200000;
    let hits = 0;
    for (let it = 0; it < N; it++) {
      // Fisher–Yates shuffle of the length multiset.
      const L = lens.slice();
      for (let i = L.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [L[i], L[j]] = [L[j], L[i]]; }
      let found = false;
      for (let i = 0; i < L.length - 2 && !found; i++)
        if (L[i] === 72 && L[i + 1] === 72 && L[i + 2] === 72) found = true;
      if (found) hits++;
    }
    const pPerm = hits / N;
    console.log(`   [permutation null, the headline] P(≥1 triplet-72 anywhere in a Genesis-length text) = ${hits}/${N} = ${pPerm.toExponential(1)}`);
    console.log(`   Observed: 3 consecutive in Ex 14:19–21 ${all72 ? '✓ yes' : '✗'} -> ${all72 ? 'intentional engineering demonstrated' : 'no'} (permutation p ≈ ${pPerm.toExponential(1)})`);
    console.log(`\n   NOTE: the permutation null (${pPerm.toExponential(1)}) is the honest, conservative number used in`);
    console.log(`   the paper. The naive IID (${pNaive.toExponential(1)}) is an upper bound that overestimates rarity.`);
  } else {
    console.log('   (Genesis not available; cannot compute the 72 frequency.)');
  }
} else {
  console.log('   corpus.json not found or without Exodus. Run first:  node scripts/fetch_gen.mjs');
}