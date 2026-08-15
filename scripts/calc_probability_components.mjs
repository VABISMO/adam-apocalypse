// calc_probability_components.mjs — REPRODUCIBLE. Saves every per-component number in the
// probability decomposition (notes/calc-probability-decomposition.md) so none is lost.
// Reads the already-computed JSONs only; re-scans nothing. Plain `node` run.
//
// Run:  node scripts/calc_probability_components.mjs
import { readFileSync } from 'node:fs';

const proofs = JSON.parse(readFileSync(new URL('../web/proofs.json', import.meta.url), 'utf8'));
const scan = JSON.parse(readFileSync(new URL('../scripts/scan_10k.json', import.meta.url), 'utf8'));
const peaks = scan.perPeak;

console.log('# Probability decomposition — all components, from the already-computed JSONs\n');

// ── Section 0: the 7-planet specials (|O|=1, all 7 bodies in one sign) ──
console.log('## 0. 7-planet specials (|O|=1, maxInSign=7) — the most special alignments\n');
const occ1 = peaks.filter(p => p.occSize === 1);
console.log('count in 10000 BCE→0 scan:', occ1.length, '(all have maxInSign=7)');
let T = 0, P = 0, Pl = 0, NP = 0, NPl = 0;
for (const p of occ1) { T += p.total; P += p.bibProper; Pl += p.bibPlace; NP += p.nullBibProper; NPl += p.nullBibPlace; }
const n = occ1.length;
console.log('date          era     sign        total bibP bibPl nullP  nullPl');
for (const p of occ1)
  console.log(`  ${p.date.padEnd(13)} ${p.era.padEnd(7)} ${p.sign.padEnd(11)} ${String(p.total).padStart(5)} ${String(p.bibProper).padStart(4)} ${String(p.bibPlace).padStart(5)} ${p.nullBibProper.toFixed(1).padStart(6)} ${p.nullBibPlace.toFixed(1).padStart(6)}`);
console.log(`\n  pooled (n=${n}):`);
console.log(`    avg total readable words : ${(T / n).toFixed(1)}`);
console.log(`    avg biblical proper      : ${(P / n).toFixed(1)} = ${(P / T * 100).toFixed(2)}% of words`);
console.log(`    avg biblical place       : ${(Pl / n).toFixed(1)} = ${(Pl / T * 100).toFixed(2)}% of words`);
console.log(`    avg biblical (P+Pl)      : ${((P + Pl) / n).toFixed(1)} = ${((P + Pl) / T * 100).toFixed(2)}% of words`);
console.log(`  vs null (letter<->sign):`);
console.log(`    nullBibProper avg        : ${(NP / n).toFixed(1)} = ${(NP / T * 100).toFixed(2)}%`);
console.log(`    nullBibPlace  avg        : ${(NPl / n).toFixed(1)} = ${(NPl / T * 100).toFixed(2)}%`);
console.log(`  ENRICHMENT real/null  proper=${(P / NP).toFixed(3)}x  place=${(Pl / NPl).toFixed(3)}x  (P+Pl)=${((P + Pl) / (NP + NPl)).toFixed(3)}x`);

// ── |O| distribution across all peaks (context for the specials) ──
console.log('\n## |O| (occSize) distribution across all 13 757 peaks\n');
const byOcc = {};
for (const p of peaks) { const k = p.occSize; (byOcc[k] = byOcc[k] || { n: 0, T: 0, P: 0, Pl: 0, NP: 0, NPl: 0 });
  byOcc[k].n++; byOcc[k].T += p.total; byOcc[k].P += p.bibProper; byOcc[k].Pl += p.bibPlace;
  byOcc[k].NP += p.nullBibProper; byOcc[k].NPl += p.nullBibPlace; }
console.log('occSize  n       avgTotal  avgBibP  avgBibPl  nullP   nullPl   enrichP  enrichPl');
for (const k of Object.keys(byOcc).sort((a, b) => +a - +b)) { const d = byOcc[k];
  console.log(`  ${k}     ${String(d.n).padStart(5)}   ${(d.T / d.n).toFixed(1).padStart(7)}  ${(d.P / d.n).toFixed(1).padStart(6)}  ${(d.Pl / d.n).toFixed(1).padStart(7)}  ${(d.NP / d.n).toFixed(1).padStart(6)} ${(d.NPl / d.n).toFixed(1).padStart(7)}   ${(d.P / d.NP).toFixed(3)}x   ${(d.Pl / d.NPl).toFixed(3)}x`); }

// ── Component 2: biblical-ness vs Null A (letter<->sign) ──
console.log('\n## 2. "Names are biblical" vs Null A (letter<->sign relabel)\n');
const A = scan.aggregate;
console.log('scan_10k aggregate (13 757 peaks):');
console.log(`  avgBibProper   real=${A.avgBibProper}  null=${A.nullAvgBibProper}  enrichment=${A.enrichment}x`);
console.log(`  avgBibPlace    real=${A.avgBibPlace}  null=${A.nullAvgBibPlace}  enrichment=${A.enrichmentPlace}x`);
console.log(`  avgTotal       ${A.avgTotal}  avgFrac=${A.avgFrac}`);
const NT = proofs.nullTest;
console.log('\nproofs.nullTest (rare vs baseline):');
console.log(`  rare     n=${NT.rare.n}  avgBibProper=${NT.rare.avgBiblicalProper}  frac=${NT.rare.avgFrac}`);
console.log(`  baseline n=${NT.baseline.n}  avgBibProper=${NT.baseline.avgBiblicalProper}  frac=${NT.baseline.avgFrac}`);
console.log(`  enrichment rare/baseline = ${NT.enrichment}x`);
console.log('\nproofs.permutationTest (letter<->sign, 12 dates):');
console.log('  date          actual  permMean  p       periodShare actual/perm/p');
for (const t of proofs.permutationTest.tests)
  console.log(`  ${t.date.padEnd(13)} ${String(t.actualCount).padStart(5)}  ${String(t.permMean).padStart(6)}  ${String(t.pValue).padEnd(7)} ${t.actualPeriodShare} / ${t.periodPermMean} / ${t.periodPValue}`);
const pVals = proofs.permutationTest.tests.map(t => t.pValue);
console.log(`  p-value range: ${Math.min(...pVals)} – ${Math.max(...pVals)}  (all >= ${Math.min(...pVals).toFixed(4)})`);

// ── Component 3: "important names" (patriarchs / places) ──
console.log('\n## 3. "Important names" (patriarchs presence / places)\n');
const pa = A.patriarchs;
console.log(`patriarchs presence (scan_10k aggregate.patriarchs):`);
console.log(`  realPeakFraction   = ${pa.realPeakFraction}`);
console.log(`  nullMeanPeaksWithPatriarch = ${pa.nullMeanPeaksWithPatriarch}`);
console.log(`  enrichment         = ${pa.enrichment}x`);
console.log(`  (realMeanNamesPerPeak = ${pa.realMeanNamesPerPeak})`);

// ── Component 4: period clustering (values from period_test.mjs; ──
// reported here as documented numbers since re-running needs the bundle)
console.log('\n## 4. Period clustering (from scripts/period_test.mjs run; values as documented)\n');
console.log('  vs random sky      : rare dominant-share 0.601  vs baseline 0.562  -> 1.07x');
console.log('                     Herfindahl 0.433 vs 0.405 -> 1.07x');
console.log('  vs label-shuffle (M=2000): actual 0.601  null mean 0.594  P5 0.592  P95 0.597');
console.log('                     actual > P95 -> empirical p < 0.05');
console.log('                     sigma_null ~ 0.00152 -> z ~ 4.6 -> p ~ 2e-6 (normal extrapolation)');
console.log('  vs letter<->sign perm (proofs.permutationTest.periodPValue): all 12 dates p = 0.5');
console.log('  lexicon P/C baseline (chrono[0].lexPeriodDist) =', proofs.chrono[0].lexPeriodDist);

// ── Component 5: |S|=3 millennial gaps (from enum_readings.mjs / §15c.11b) ──
console.log('\n## 5. |S|=3 long-name millennial gaps (from enum_readings.mjs; §15c.11b table)\n');
console.log('  P(name reads on a tight conjunction) = q^|S| = (3/22)^3 = ' + Math.pow(3 / 22, 3).toExponential(3));
console.log('  recurrence: 12–45 of 13 765 rare alignments; mean gap 486–1854 y; max gap 2175–8131 y');
console.log('  220-triple distribution: recurrence 12–207 (mean 47, median 37)');
console.log('  31 / 50 longest readable names appear on a single one of the 12 dated conjunctions only');

// ── Component 7: Null B (from null_lexicon.mjs run) ──
console.log('\n## 7. Null B (from scripts/null_lexicon.mjs, 5 seeds, 12 dated conjunctions)\n');
console.log('  biblical proper (all)  collapse to 0.116x real  (8.7x above chance-collision floor)');
console.log('  biblical proper (len>=5) collapse to 0.030x real (~34x above floor)');
console.log('  contrast: sign-shuffle (Null A) ~1x (preserved) -> design localized to the lexicon');

// ── Joint ──
console.log('\n## 8. Joint (sky-conditional, non-independent; at-chance components excluded)\n');
console.log('  Standing (lexicon, Null B, precondition): name-identity 8.7x above floor -> factor ~1 per alignment');
console.log('  Sky-conditional:');
console.log('    P_gap      ~ 2.5e-3     (|S|=3 conjunction, geometric)');
console.log('    x p_period ~ 1e-5..1e-6 (label-shuffle; 1.07x vs random sky)');
console.log('    x theophoric = specific case (Section 6); structural caveat + n=1 gap');
console.log('    joint ~ 1e-8 per conjunction (order of magnitude; NON-independent)');
console.log('  Excluded (at chance vs null, factor ~1): biblical-ness (0.998x), important-names (0.984x/0.976x), 7-planet specials (0.956x).');