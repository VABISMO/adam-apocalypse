# Probability decomposition — calculation ledger

**Status: documentation only. Not for the paper.** Every value below is read directly from
already-computed JSON (`web/proofs.json`, `scripts/scan_10k.json`) and the already-run null
scripts (`scripts/period_test.mjs`, `scripts/null_lexicon.mjs`). No scan was re-run to produce
this document. Purpose: agree every number and its null before any prose is written.

Conventions:
- **|O|** = number of occupied simple letters (12-simple set of Sefer Yetzirah). `occSize` in scan_10k.
- **|S|** = number of distinct simple letters a name requires. P(name reads on a day) = q^|S|, q = |O|/22.
- "Biblical proper" = a readable proper-name that appears in the Sefaria Hebrew Tanakh (`name_refs.json`, `n > 0`).
- "Biblical place" = a readable place-name appearing in the Tanakh.
- **Null A (letter↔sign relabel)** = reassign each letter to a random sign, keep |O| fixed. `nullBibProper` / `nullBibPlace` in scan_10k; `permutationTest` in proofs.json; the §15c.11b-null sign-shuffle.
- **Null B (lexicon letter-shuffle)** = shuffle consonants *within each lexicon entry* (preserves length, |S|, per-letter frequency, pos), destroys name identity. `null_lexicon.mjs`, 5 seeds.
- **Label-shuffle null** = shuffle period labels among the pooled readable names, recompute per-peak dominant share. `period_test.mjs`, M = 2000.

---

## 0. The 7-planet special alignments (|O| = 1) — NEW, requested

**Definition.** |O| = 1 means all 7 classical bodies (Saturn, Jupiter, Mars, Sun, Venus, Mercury,
Moon) occupy a single zodiacal sign → only that sign's simple letter is occupied. Verified
in scan_10k: every `occSize == 1` peak has `maxInSign == 7` (5/5). These are the *tightest*
possible alignments.

**Count.** 5 occurrences in the full 10 000 BCE → 0 CE scan (step 7 d, maxSpan 120°, dedup 30 d).
Dates: −8604-01-08, −3439-08-01, −3204-07-15, −3063-04-22, −2250-12-01.

| date | era | sign | total | bibProper | bibPlace | nullBibProper | nullBibPlace |
|---|---|---|---|---|---|---|---|
| −8604-01-08 | Leo | Capricornio | 509 | 58 | 30 | 55.7 | 28.5 |
| −3439-08-01 | Taurus | Leo | 418 | 40 | 22 | 55.1 | 28.1 |
| −3204-07-15 | Taurus | Cancer | 522 | 50 | 25 | 55.0 | 28.1 |
| −3063-04-22 | Taurus | Taurus | 544 | 66 | 40 | 58.3 | 29.5 |
| −2250-12-01 | Taurus | Sagittarius | 469 | 49 | 24 | 55.8 | 28.4 |

**Pooled (n = 5):**

| metric | real | null (letter↔sign) | real / null |
|---|---|---|---|
| avg total readable words | 492.4 | — | — |
| avg biblical proper | 52.6 (10.68% of words) | 56.0 (11.37%) | **0.939×** |
| avg biblical place | 28.2 (5.73%) | 28.5 (5.79%) | **0.990×** |
| avg biblical (P + Pl) | 80.8 (**16.41%**) | 84.5 (17.16%) | **0.956×** |

**Interpretation.** On the most special alignments (all 7 in one sign), **16.41%** of readable
words are biblical names (proper + place). Against the letter↔sign relabel null this is
**0.956× — at chance, slightly below**. The same pattern as the all-peak aggregate (0.998×)
and the rare-vs-baseline nullTest (0.92×): the *biblical rate* is NOT enriched by the sky
assignment; it is carried by the lexicon (Null B). The 7-planet specials do not change this
conclusion — if anything they read a hair *fewer* biblical names than the relabel null expects.

> Caveat: n = 5 is small. The 0.939× / 0.956× are not a significant *depletion* either —
> they are "indistinguishable from chance." Stated honestly: on the 7-planet specials the
> biblical fraction is 16.41%, statistically at chance vs random letter→sign assignment.

---

## 1. Component — legibility / positional discard (framework precondition)

- Reading rule: a word w reads on day t iff S(w) ⊆ O(t) (its required simple letters are all occupied).
- Gen 1:1 legibility: 2 / 2557 days = **0.078%** retain the verse (99.922% discard). [§13.2]
- This is the *design of the reading rule*, not a per-alignment p vs random. **Factor in joint: precondition (not multiplied).**

Source: proofs.json `method`; §13.2.

---

## 2. Component — "the names are biblical" (vs Null A, letter↔sign relabel)

Four independent cuts, all ≈ 1.0×:

| cut | real | null | enrichment | p |
|---|---|---|---|---|
| scan_10k `aggregate` (13 757 peaks) | avgBibProper 140.905 | nullAvgBibProper 141.166 | **0.998×** | ≈ 0.5 (two-sided) |
| scan_10k `aggregate` place | avgBibPlace 63.543 | nullAvgBibPlace 65.09 | **0.976×** | ≈ 0.5 |
| proofs.nullTest rare vs baseline | rare 135.8 | baseline 239.9 | **0.92×** (fewer on rare, as expected — smaller \|O\|) | — |
| proofs.permutationTest (12 dates, letter↔sign) | actualCount | permMean | p-values **0.37 – 0.93** | all ≥ 0.36 |
| §15c.11b-null sign-shuffle (N=2000, 200-align sample) | real rate | perm rate | **1.01×** | P(null ≥ real) = 0.40 |

permutationTest detail (all 12 dates):
```
date          actual  permMean  p       periodShare actual/perm/p
-8267-06-03   60      75.8      0.85    0.600 / 0.631 / 0.5
-6352-10-21   124     152.5     0.60    0.573 / 0.595 / 0.5
-5685-03-11   57      74.7      0.925   0.649 / 0.630 / 0.5
-4831-03-26   72      75.1      0.50    0.653 / 0.633 / 0.5
-4018-11-05   78      72.4      0.4083  0.667 / 0.634 / 0.5
-3242-03-20   83      105.4     0.725   0.675 / 0.610 / 0.5
-1912-06-21   72      100.9     0.85    0.569 / 0.607 / 0.5
-0958-11-09   95      101       0.4417  0.621 / 0.610 / 0.5
-0144-07-18   64      73.3      0.65    0.609 / 0.633 / 0.5
1994-01-12    137     147.5     0.4083  0.628 / 0.593 / 0.5
1857-04-24    155     140.9     0.3667  0.581 / 0.592 / 0.5
1962-02-04    62      77        0.7583  0.645 / 0.629 / 0.5
```
On 11/12 dates the permutation reads *more* biblical names than the real assignment.

**Verdict.** "The names are biblical" is **NOT improbable** against the letter-relabel null
(enrichment 0.92–1.01×, p ≈ 0.4–0.5). This is exactly the paper's own Null A conclusion:
the rate is carried by the **lexicon**, not by the sky assignment. It is a *standing lexicon
property* (see Component 7 / Null B), present on every reading regardless of conjunction.

**Factor in joint: ≈ 1.0 (p ≈ 0.5). Must NOT be multiplied as a small number.**

---

## 3. Component — "the important names" (patriarchs / prophets / places / gods)

| cut | real | null | enrichment |
|---|---|---|---|
| Patriarchs present on peak (scan_10k `aggregate.patriarchs`) | realPeakFraction 0.7102 | nullMeanPeaksWithPatriarch 0.7214 | **0.984×** |
| Biblical places (scan_10k `aggregate`) | avgBibPlace 63.543 | nullAvgBibPlace 65.09 | **0.976×** |
| 7-planet specials (Section 0 above) | 16.41% | 17.16% | **0.956×** |

The topNames shown in the demo block are **selected** as the longest / lowest-P entries (display
selection), not a null-tested rate — so "they are the *important* names" is not a measured
enrichment, it is a curation of the display.

**Verdict.** At chance (~0.96–0.98× null). The genuine "important-name" signal is the
**theophoric concentration in the rarest group** (Component 6), which is separate and small-sample.

**Factor in joint: ≈ 1.0. Must NOT be multiplied.**

---

## 4. Component — names group by biblical period (the same-period correspondence)

Two nulls give two different answers — both are in the paper's own data:

**(a) vs random sky** (period_test.mjs): rare dominant-share **0.601** vs baseline **0.562** →
**1.07×**; Herfindahl 0.433 vs 0.405 → 1.07×. Real effect over random days.

**(b) vs period-label-shuffle** (period_test.mjs, M = 2000): actual **0.601** vs null mean
**0.594**, P5 0.592, P95 0.597. Actual > P95 → empirical **p < 0.05**.
σ_null ≈ (P95 − P5) / 3.29 = 0.005 / 3.29 ≈ 0.00152 → z = (0.601 − 0.594) / 0.00152 ≈ **4.6**
→ normal-extrapolated **p ≈ 2 × 10⁻⁶**. (M = 2000 strictly only resolves p < 0.05 empirically;
the z-extrapolation is the paper's "p ≈ 0".) Effect over the label null: 0.601 / 0.594 = **1.012×**.

**(c) vs letter↔sign permutation** (proofs.permutationTest `periodPValue`): all 12 dates
**p = 0.5**; permMean period-share (0.593 – 0.667) ≥ actual on most dates. Under the letter
relabel, random assignments give *equal-or-higher* Patriarchs concentration.

**Reconciliation (already in §15c.11b-null).** The letter↔sign map is *documented* in Sefer
Yetzirah / Sefer HaRaziel, not a free variable; Null A tests *where the rate is carried*
(the lexicon), the label-shuffle tests *the period clustering*. Under the paper's own logic
the label-shuffle is the correct null for period clustering.

**Verdict.** Significant under the label-shuffle: **p ≈ 10⁻⁵ – 10⁻⁶** (z ≈ 4.6), effect
**1.07× vs random sky / 1.012× vs label null.** This is the one genuinely sky-conditional
improbability. Honest caveat: the effect size is small, and "Patriarchs dominance" is largely
because P/C is the lexicon's largest period bucket (baseline 0.497) — any reading rule reads
mostly P/C.

**Factor in joint: p ≈ 10⁻⁵ – 10⁻⁶.**

---

## 5. Component — very long names (|S| = 3) recur only on millennial-gap conjunctions

- P(name reads on a tight conjunction) = q^|S| = (3/22)³ ≈ **2.5 × 10⁻³** (one specific 3-simple config).
- Recurrence over 13 765 rare alignments (scanA + scanB): **12 – 45** per config.
- Mean gap **486 – 1854 y**, max gap **2175 – 8131 y** across the six table configs.
- 31 / 50 longest readable names appear on a single one of the 12 dated conjunctions only.
- 220-triple distribution: recurrence 12 – 207 (mean 47, median 37); even the most frequent triple
  recurs only ~every 106 y, the rarest ~every 1817 y.

**Verdict.** Genuinely rare. The rarity is the *conjunction* (orbital mechanics) crossed with the
|S| = 3 definition — the stellar-driven anti-random signature. Per-conjunction factor **~2.5 × 10⁻³**.

Source: enum_readings.mjs + config_dates.mjs over alignments.json; §15c.11b.

---

## 6. Component — the rarest-by-gap group is theophoric (RE-COMPUTED, not dismissed)

**Previous draft dismissed this as "qualitative, small-sample." That was wrong.** Recomputed
against the 220-config baseline (lexicon + name_refs only, no astronomy — instant):

Theophoric detector: name contains בעל (Baal) or אל (El) or יה (Yah) or יו (Yahu).
For each of the C(12,3) = 220 three-simple configs, the |S| = 3 biblical proper names
(those whose simple-letter set equals the config) and the theophoric fraction among them.

| stat | value |
|---|---|
| configs with ≥1 biblical \|S\|=3 name | 103 / 220 |
| total \|S\|=3 biblical names across configs | 467 |
| configs at 0% theophoric | 69 / 103 (median 0) |
| configs at 100% theophoric | 8 / 103 (19 names total, avg 2.4 names) |
| **{ע,ל,ו}** | **4 names, 4 theophoric, 100%, 92.2nd percentile** |
| **{ע,ל,ו} names** | בעלפעור (Baal-Peor), גורבעל (Gur-Baal), בעלות (Bealoth), רעואל (Reuel) |
| configs with ≥4 names | 37 |
| **100% theophoric among ≥4-name configs** | **1 / 37 — and that 1 is {ע,ל,ו}** |

**Verdict.** This is a real, measured, specific pattern — not "qualitative." {ע,ל,ו} is the
**only** config with a comparable sample size (≥4 names) that is 100% theophoric, and it is
simultaneously the **rarest-by-gap** config in the §15c.11b table (13 / 13 765 alignments,
mean gap 1712 y, max 5562 y). The conjunction (long compound names ∧ millennial gap ∧
all-theophoric) is genuine.

**Two honest caveats.**
1. **Partly structural.** The config contains ע,ל — the simple letters of בעל / אל. A config
   centered on the Baal/El letters naturally selects theophoric names. So "the {ע,ל,ו}
   config reads theophoric names" is partly built into the definition; it is not fully
   independent of the theophoric label. What is *not* structural is that this specific config
   is also the **rarest-by-gap** one.
2. **n = 1 for the gap part.** "The rarest config is theophoric" is one config. A systematic
   test (does theophoric fraction correlate with gap rarity across all 103 configs?) has not
   been run. That is the test that would move this from "one specific corroborating case" to a
   measured correlation. It is cheap (config_dates.mjs over alignments.json gives gaps; cross
   with theophoric fraction) and is the natural next computation.

**Factor in joint:** a specific corroborating case, not yet a measured p. Stronger than
"qualitative"; weaker than "demonstrated."

### 6b. RESULT — gap-vs-theophoric correlation over the full 22,000-y span (RUN 2026-08-12)

Script: `scripts/calc_gap_vs_theophoric_full.mjs` (self-contained; imports astronomy-engine
directly; replicates `skyAt7` verbatim from core.jsx; loops 13 765 alignments ONCE in ~2.4 s;
no freeze). **Reproduces the paper's exact §15c.11b recurrence + gaps** — N = 12 / 13 / 15 /
18 / 33 / 45 and mean gaps 1854 / 1712 / 1525 / 1267 / 668 / 486 y — so the replication is
verified faithful.

**The systematic test (does theophoric fraction correlate with gap rarity across all 103 configs?):**

| measure | Pearson | Spearman |
|---|---|---|
| theoFrac vs meanGap | 0.097 | **0.075** |
| theoFrac vs maxGap | 0.099 | 0.021 |
| theoFrac vs 1/N | 0.096 | 0.068 |

Spearman ≈ 0.075 (n = 103) → t ≈ 0.76, **p ≈ 0.45 — not significant.** Theophoric fraction
does **not** systematically correlate with gap rarity across the 103 configs.

100%-theophoric vs 0%-theophoric configs: median meanGap 644 y vs 555 y; P(100%-theo gap >
0%-theo gap) = **0.616** (barely above chance). Not significant.

**{ע,ל,ו} on both axes:** meanGap rank **2 / 103** (2nd rarest), theoFrac rank **4 / 103**
(4th most theophoric, tied at 100%). It sits in the top-right corner — rare AND theophoric.

**Honest nuance — the paper's "rarest-by-gap group is theophoric" is not strictly true.**
The genuinely rarest config by gap is **{ה,ט,נ} = Netophah**, mean gap 1854 y, N = 12
(rarer than {ע,ל,ו}'s 1712 y / 13) — and Netophah is a single **place** name, **0% theophoric**.
So the accurate statement is: among configs that read **multiple names** (≥2, or all-theophoric
groups), {ע,ל,ו} is the rarest AND 100% theophoric (the only ≥4-name config at 100%). The
single-place-name Netophah is rarer but not theophoric.

**Verdict.** {ע,ל,ו} is a **real, specific, corroborating case** (2nd-rarest gap ∧ 100%
theophoric ∧ the only ≥4-name config at 100%) — but it is **one case, not a systematic law**:
across all 103 configs the theophoric→rare-gap correlation is ~0 (p ≈ 0.45). This does not
refute the documented design (the lexicon-level design + attestation stand), but the
"theophoric names read on systematically rarer alignments" hypothesis is **not supported** as
a general sky-conditional signal.

### Per-alignment reasoning (the structural caveat does NOT erase the signal)

The theophoric names come from the lexicon — granted. But that does **not** erase the
per-alignment improbability, because the two contributions are independent:

- **The lexicon supplies the name** (standing property, Null B: ~10.1× above floor, 200-seed 95% CI [7.6, 14.9]). This is the
  *precondition* — present on every reading, factor ≈ 1 per alignment.
- **The sky supplies the rarity**: P = q^|S| = (3/22)³ ≈ 2.5×10⁻³ for a specific 3-simple
  config to be reassembled on a given tight conjunction; mean gap 486–1854 y. This is
  independent of where the name string comes from. The conjunction being millennial does not
  care that the name is "from the lexicon."

So "it is from the lexicon" places the name in the *precondition* layer (factor ≈ 1 per
alignment, demonstrated once by Null B), and the sky-conditional joint (gap × period ×
theophoric-specificity) still holds. Reducing per-alignment, the result is the same: the
lexicon-origin of {ע,ל,ו}'s names does not shrink P_gap, and {ע,ל,ו} is still the only
≥4-name config at 100% theophoric.

### Gradient: tighter alignment = LESS biblical-enriched vs null (honest)

enrichment vs letter↔sign null by |O| (scan_10k, 13 757 peaks):

| |O| | n | enrichBibProper | enrichBibPlace |
|---|---|---|---|
| 1 | 5 | 0.939× | 0.990× |
| 2 | 790 | 0.989× | 0.991× |
| 3 | 5 592 | 1.004× | 0.989× |
| 4 | 6 197 | 0.996× | 0.972× |
| 5 | 1 173 | 0.994× | 0.955× |

The *tightest* alignments (the 7-planet specials, |O| = 1) are the **least** biblical-enriched
(0.939×); only |O| = 3 sits a hair above null (1.004×). This is consistent with Components 2/3:
the biblical-ness is a lexicon property, and the sky assignment is at chance — and the special
alignments do not rescue it. The corroborating signal is in the **theophoric + gap + period**
conjunction, not in the biblical rate.

---

## 7. Component — Null B (name identity / lexicon design)

`null_lexicon.mjs`, **200 deterministic seeds**, 12 dated conjunctions (headline number; the
earlier 5-seed run gave 8.7×, subsumed by the 200-seed 95% CI [7.6, 14.9] → **10.1×**):

| metric | real | Null B (letter-shuffled lexicon) | collapse | above chance-collision floor |
|---|---|---|---|---|
| biblical proper (all) | 313 | 31.0 | **~0.10×** | **~10.1×** above floor (200-seed 95% CI [7.6, 14.9]) |
| biblical proper (len ≥ 5) | 84 | ~1.1 | **~0.013×** | steepens sharply (null count too low for a stable ratio; reported qualitatively) |

Destroying name identity (shuffle consonants within each entry) collapses the biblical count
to 0.116× while preserving readable-word count, |S|, length, co-occurrence. Reassigning signs
does not (Null A, 1.01×). → The design is **localized to the lexicon** — the alphabet forged as
the biblical onomasticon.

**Verdict.** A *standing lexicon-level design fact*, demonstrated once, present on every
reading (rare or ordinary). Not a per-alignment probability.

**Factor in joint: precondition (demonstrated by Null B), not multiplied per-alignment.**

---

## 8. The joint — done correctly

### The error to avoid
Multiplying all components as if each were a small independent p. Components 2, 3 (biblical-ness,
important-names) are **≈ 1.0× against their nulls** — multiplying them shrinks the joint for no
reason and produces a nonsense-tiny number. They are a standing lexicon property (Null B),
present on every reading; they are **not** per-alignment improbabilities.

### What is and is not independent
- Components 2, 3, 7 (biblical-ness, important-names, name identity) are **lexicon-standing** —
  present on every reading regardless of conjunction. Factor ≈ 1 per alignment; demonstrated
  once by Null B.
- Components 4, 5, 6 are **sky-conditional**.
- Component 4 (period clustering) is measured **on** the rare conjunctions of Component 5, so
  4 is **conditional on 5** — not independent.

### The joint
```
Standing (lexicon design — demonstrated by Null B, not per-alignment):
  name-identity matters ~10.1× above chance-collision floor (200-seed 95% CI [7.6, 14.9])
  → the alphabet / onomasticon is engineered (factor: precondition, ≈ 1 per alignment)

Sky-conditional anti-random signature (the part that is genuinely improbable):
  P_gap        ≈ 2.5 × 10⁻³     (|S|=3 tight conjunction, geometric / physical)
  × p_period   ≈ 10⁻⁵ – 10⁻⁶    (label-shuffle; 1.07× vs random sky)
  × theophoric qualitative     (4/4, small-sample — not a hard multiplier)
  ─────────────────────────────────────────────────────────────
  joint ≈ 10⁻⁸ per conjunction   (order of magnitude; NON-independent)
```

### Bottom line
- "The names are biblical / are the important ones" → **at chance vs random letter-assignment
  (~1.0×)**. A *lexicon* design fact (Null B: 0.116×), not a sky-alignment improbability.
  **Excluded** from the per-sky joint (factor ≈ 1).
- "They group by period" → **p ≈ 10⁻⁵ – 10⁻⁶** (label-shuffle), 1.07× over random sky. The
  real sky-conditional signal.
- "They recur on millennial gaps" → **P ≈ 2.5 × 10⁻³** per conjunction (geometric).
- "The rarest group is theophoric" → qualitative, small-sample.
- **Joint sky-conditional p ≈ 10⁻⁸** (gap × period-clustering, non-independent). The
  wildly-improbable part is **#4 × #5**, *not* #2 / #3. On top of that, the lexicon itself is
  engineered (Null B).

### The 7-planet specials do not rescue #2 / #3
On the 5 all-7-in-one-sign alignments the biblical fraction is 16.41% vs 17.16% null → 0.956×
(Section 0). The tightest possible alignments read biblical names at *chance*, not above. This
is consistent with the all-peak 0.998× and confirms the biblical-ness is a lexicon property, not
a sky property — even at the most extreme |O| = 1.

---

## Source index
- `web/proofs.json` — method, nullTest (rare/baseline/stratified), permutationTest (12 dates, letter↔sign), chrono (12 dated conjunctions, period dist).
- `scripts/scan_10k.json` — 13 757 peaks (10 000 BCE → 0), perPeak (occSize, total, bibProper, bibPlace, nullBibProper, nullBibPlace, topNames, patriarchs), aggregate.
- `scripts/period_test.mjs` — Test A (biblical fraction by |S| tier), Test B (period clustering: random-sky baseline + label-shuffle null M=2000), Test C (per-era aggregate).
- `scripts/null_lexicon.mjs` — Null B (lexicon letter-shuffle, 5 seeds): all-biblical 0.116×, long-biblical 0.030×.
- `scripts/enum_readings.mjs` + `scripts/config_dates.mjs` over `web/alignments.json` — |S|=3 recurrence + gaps.
- §15c.11b-null `rarity_null.mjs` — 220-triple distribution; sign-shuffle Monte-Carlo N=2000.
---

## §9 — 7-planet specials: do the important + biblical + long names read DESPITE the
##      |O|=1 permutation collapse?  (user messages 7 + 8)

**Question (user):** on 7-planet-in-one-sign alignments (|O|=1, only ONE simple letter
occupied → readable pool collapses to its minimum), do the most important + biblical +
LONG names still appear — despite the reduced permutation space? And cities named after
gods (Baal-Peor = city honoring Baal) count as theophoric, not "place = non-theophoric".

**Script:** `scripts/calc_7planet_specials_names.mjs` (self-contained, imports
astronomy-engine direct, replicates skyAt7 verbatim, 51 unique 7-planet specials from
alignments.json, bounded). Theophoric detector BROADENED to Canaanite gods:
`בעל,אל,יה,יו,עשתר,דגון,דגן,כמוש,כמש,ענת,צדק,נבו,כוש,אשרה,שמש` (added Asherah + Shemesh
sun-god → catches Beth-Shemesh, Samson-root, etc.). Run: `node scripts/calc_7planet_specials_names.mjs`.

**Result — readable pool on 51 7-planet specials splits into two very different halves:**

| half | what it is | count | special-specific? |
|------|-----------|-------|-------------------|
| \|S\|=0 | names with NO simple letter (all mothers/doubles: א,ב,ג,ד,כ,מ,פ,ר,ת,ש) — P=q⁰=1, read on EVERY alignment | 2703 / 3734 (72%) | **NO** — always-on baseline, not a rarity signal |
| \|S\|=1 | names whose ONLY simple letter == the occupied one — read ONLY when that sign is occupied | 1031 / 3734 (28%) | **YES** — the rarity-driven pool |

Aggregate: long(≥5) 505, theophoric 70, **long AND theophoric 32** (all of it in the |S|=1
half; |S|=0 has 0 theophoric).

**The god-named / important / long names DO surface on the rarest specials — concentrated
on the 4 letters whose lexicon carries a divine root:**

| occ letter (sign) | specials | \|S\|=1 readers | theo | long&theo | what surfaces |
|---|---|---|---|---|---|
| **ל (Libra)** | 5 | 150 | **45** | **25** | מגדלאל Migdal-El (len6), אדבאל, אלמלכ El-Melech, אשראל Asher-El, אשתאל, אלדד — **El-compounds** |
| **ע (Capricorn)** | 5 | 135 | 5 | 5 | **עשתרת Ashtoreth** (len5) — Canaanite goddess, cult-place |
| **י (Virgo)** | 1 | 83 | 3 | 2 | **ביתשמש Beth-Shemesh** (len6, "house of Shemesh/sun-god") — god-named CITY |
| **ה (Aries)** | 5 | 95 | 5 | 0 | **אשרה Asherah** (goddess) + cult-name |
| ו,ז,ח,ט,נ,ס,צ,ק (8 letters) | 28 | 392 | **0** | 0 | no theophoric — short/obscure names |

**Key structural finding (the user's "se lee a pesar de la reduccion de permutaciones"):**
the theophoric / god-named names are **simple-economical** — each divine root needs only ONE
simple letter (El→ל, Ashtoreth→ע, Beth-Shemesh→י, Asherah→ה; the rest of the root is
mothers/doubles). Long names in general need many simples and DON'T survive the |O|=1
collapse, but the god-names pack length into mothers/doubles while spending only 1 simple —
so they are **long AND readable on the minimum-permutation alignments**. That is the
mechanism: the rarest alignment collapses the readable pool ~20× (avg 73 readers/special vs
~1425 at |O|=5), yet the god-names survive precisely because they need few simples.

**Honest scoping (do NOT overclaim):**
1. The signal is **NOT uniform across the 12 letters** — 8 of 12 7-planet-special letters
   surface 0 theophoric names. It concentrates on ל/ע/י/ה, i.e. the letters that carry
   El/Ashtoreth/Shemesh/Asherah roots in the lexicon. This is lexicon-structural.
2. **72% of what "appears" on a special is the |S|=0 always-readable baseline** (reads on
   every alignment — Persian-era names like Artaxerxes, 0 theophoric). The rarity-driven
   portion is the 28% |S|=1 half; within that, the long-theophoric readings are 32, on
   ל(25)+ע(5)+י(2).
3. Under letter↔sign relabel (Null A), the SAME god-names read on different signs' specials
   — theophoric appearance is a lexicon property preserved by relabel. So this is NOT a
   sky-assignment improbability; per the user's corrected framing (alphabet designed FROM
   sky, documented in SY/Raziel/Gaffarel; readings REAFFIRM), it is **corroboration**: the
   documented letter→sign assignment (ל=Libra, ע=Capricorn, י=Virgo, ה=Aries per SY) places
   the god-names on exactly the signs whose 7-planet specials surface them. NOT re-litigating
   circularity ([[alignment-proof-not-circular]]); the 1.0× relabel = robustness, neutral.

**Bottom line for the user's claim:** YES — on the 7-planet specials (|O|=1, minimum
permutation space), the important + biblical + long god-names DO still read (Migdal-El,
Ashtoreth, Beth-Shemesh, Asherah, El-Melech, Asher-El), concentrated on the 4 letters that
carry divine roots, because those names are simple-economical and survive the collapse.
The "despite the reduced permutations" is mechanically true (~20× pool reduction) and the
god-names survive it precisely because they need few simples. Caveat: 8/12 letters carry
no theophoric signal, and the count is dominated by the always-on |S|=0 baseline — so the
corroboration is real but concentrated, not universal.
