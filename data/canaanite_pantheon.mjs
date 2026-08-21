// data/canaanite_pantheon.mjs — the comprehensive attested Canaanite / Ugaritic / Phoenician /
// biblical pantheon, for stellar-readability tests (§6.6).
//
// Every entry is a REAL attested name — biblical (B), Ugaritic (U), or a documented compound
// epithet (C). No invented forms. Hebrew spellings use the biblical square form where attested;
// non-biblical Ugaritic names use the standard scholarly Hebrew transliteration of the Ugaritic
// consonants. Uncertain transliterations are flagged in `note`.
//
//   kind:   chief | daughter | minor | national | epithet | compound | object
//   src:    B (biblical) | U (Ugaritic) | C (compound) | BU
//
// The Canaanite pantheon is NOT a fixed count:
//   • KTU 1.47 (the Ugaritic god-list, RS 1929.7 + RS 24.264) lists ~33 entries — but several are
//     divine PAIRS (Earth+Heaven, Gupan+Ugar) and DEIFIED CULTIC OBJECTS (the thurible, the lyre),
//     so ~33 entries ≠ 33 gods. (Healey 1985, SEL 2.)
//   • J.C. de Moor (UF 2, 1970, pp.187–228) statistically isolated ~22 MAJOR deities from the
//     offering texts. All 22 appear in KTU 1.47 except Ṯukamuna-wa-Šunama.  22 majors ≈ 22 Hebrew
//     letters — a noted numerical resonance (NOT a 1:1 readable mapping; tested separately).
//   • The round mythological number is 70 — the 70 SONS OF EL & Athirat (KTU 1.4.VI.46), El's
//     divine council. These are NOT 70 individually-named deities; only some are named (the chiefs
//     + daughters below). The 70 → 70 nations of Genesis 10 → 70 sons of God (Deut 32:8, LXX/4QDeutʲ)
//     → 70 angels of the nations (1 Enoch 89:59; 90:22,25) → 72 princes (LXX Gen 10 / Shem
//     HaMephorash) is the cross-cultural chain. We record the 70 as a structural echo, not 70 names.
//
// Total attested divine NAMES across the Ugaritic corpus is larger (hundreds incl. epithets/local
// hypostases); this file is the readable NAMED set — chiefs + daughters + minors + nationals +
// attested epithets + attested wa-compounds — ~45 entries.

export const PANTHEON = [
  // ── chief / older gods ──
  { h: 'אל',        name: 'El',         role: 'creator, chief of the pantheon',     kind: 'chief', src: 'BU' },
  { h: 'אשרה',      name: 'Asherah',    role: 'mother goddess, El\'s consort',      kind: 'chief', src: 'BU' },
  { h: 'דגן',       name: 'Dagan',      role: 'grain / underworld, father of Baal', kind: 'chief', src: 'BU' },

  // ── storm / Baal cycle ──
  { h: 'בעל',       name: 'Baal',       role: 'storm lord (title "Lord")',          kind: 'chief', src: 'BU' },
  { h: 'הדד',       name: 'Hadad',      role: 'storm / rain (Baal\'s proper name)',  kind: 'chief', src: 'BU' },
  { h: 'עלין',      name: 'Aliyan',     role: '"the mighty one", Baal epithet',      kind: 'epithet', src: 'U' },
  { h: 'ענת',       name: 'Anat',       role: 'war / sister of Baal',               kind: 'chief', src: 'BU' },
  { h: 'עשתרת',     name: 'Ashtoreth',  role: 'war / love / fertility',             kind: 'chief', src: 'BU' },
  { h: 'מות',       name: 'Mot',        role: 'death, adversary of Baal',           kind: 'chief', src: 'U' },
  { h: 'ים',        name: 'Yam',        role: 'sea, adversary of Baal',             kind: 'chief', src: 'BU' },
  { h: 'כושר',      name: 'Kothar',     role: 'craftsman / magic (short form)',     kind: 'chief', src: 'U' },
  { h: 'חסיס',      name: 'Khasis',     role: '"wise" (Kothar\'s epithet, never alone)', kind: 'epithet', src: 'U' },
  { h: 'רשף',       name: 'Resheph',    role: 'plague / arrow / underworld',        kind: 'chief', src: 'BU' },

  // ── astral / diel ──
  { h: 'שחר',       name: 'Shahar',     role: 'dawn god, son of El',                kind: 'chief', src: 'BU' },
  { h: 'שלם',       name: 'Shalim',     role: 'dusk god, son of El (Jerusalem)',    kind: 'chief', src: 'U' },
  { h: 'שפש',       name: 'Shapash',    role: 'sun goddess, chthonic messenger',    kind: 'chief', src: 'U' },
  { h: 'ירח',       name: 'Yarikh',     role: 'moon god',                           kind: 'chief', src: 'BU' },
  { h: 'עתר',       name: 'Athtar',     role: 'fertility / war (Venus, south Sem.)',kind: 'minor', src: 'U', note: 'Ugaritic ʿṯtr; transliteration uncertain — shin-bearing cognate עשתר also possible. Either form does NOT self-read (Capricorn\'s nearest mother is א).' },
  { h: 'רמון',      name: 'Rimmon',     role: 'storm epithet of Hadad',             kind: 'epithet', src: 'B' },

  // ── daughters of Baal (the three) ──
  { h: 'פדרי',      name: 'Pidray',     role: 'Baal\'s daughter (mist / lightning)',kind: 'daughter', src: 'U' },
  { h: 'טלי',       name: 'Tallay',     role: 'Baal\'s daughter (dew)',             kind: 'daughter', src: 'U' },
  { h: 'ארצי',      name: 'Arsay',      role: 'Baal\'s daughter (earth)',           kind: 'daughter', src: 'U' },

  // ── others attested ──
  { h: 'נכל',       name: 'Nikkal',     role: 'orchard goddess (Ningal)',           kind: 'chief', src: 'U' },
  { h: 'קדש',       name: 'Qudshu',     role: 'holiness / fertility',               kind: 'chief', src: 'U' },
  { h: 'אשימא',     name: 'Ashima',     role: 'Aramaean deity (2 Kgs 17:30)',       kind: 'national', src: 'B' },
  { h: 'כמוש',      name: 'Chemosh',    role: 'national god of Moab',               kind: 'national', src: 'B' },
  { h: 'מלכם',      name: 'Milcom',     role: 'national god of Ammon (Molech)',     kind: 'national', src: 'B' },
  { h: 'וד',        name: 'Wadd',       role: 'south-Arabian moon god',             kind: 'minor', src: 'U' },
  { h: 'תמוז',      name: 'Tammuz',     role: 'dying grain god (Ezek 8:14)',        kind: 'chief', src: 'BU' },
  { h: 'אמורו',     name: 'Amurru',     role: 'Amorite / steppe god',               kind: 'minor', src: 'U' },
  { h: 'שדי',       name: 'Shaddai',    role: 'epithet (El Shaddai)',               kind: 'epithet', src: 'B' },
  { h: 'עליון',     name: 'Elyon',      role: '"Most High" (El Elyon, Gen 14)',     kind: 'epithet', src: 'B' },
  { h: 'גפן',       name: 'Gapan',      role: '"Vine", Baal\'s messenger',          kind: 'minor', src: 'U' },
  { h: 'דדמש',      name: 'Dadmiš',     role: 'minor deity (KTU 1.47 line 20)',     kind: 'minor', src: 'U' },

  // ── compound / binomial names (wa = "and") and epithet compounds ──
  { h: 'בעל הדד',   name: 'Baal-Hadad',      role: 'title + proper name (the storm god)',     kind: 'compound', src: 'C' },
  { h: 'עלין בעל',   name: 'Aliyan Baal',     role: 'epithet + title (Baal Cycle)',            kind: 'compound', src: 'U' },
  { h: 'בעל צפון',   name: 'Baal Saphon',     role: 'Baal of the North (Mt Saphon)',           kind: 'compound', src: 'BU' },
  { h: 'הדד רמון',   name: 'Hadad-Rimmon',    role: 'name + epithet (Zech 12:11)',             kind: 'compound', src: 'B' },
  { h: 'כושר וחסיס', name: 'Kothar-wa-Khasis',role: 'craftsman + "wise" (hendiadys)',          kind: 'compound', src: 'U' },
  { h: 'נכל ואב',    name: 'Nikkal-wa-Ib',    role: 'Nikkal + "fruit"',                         kind: 'compound', src: 'U' },
  { h: 'שחר ושלם',   name: 'Shahar-wa-Shalim',role: 'dawn + dusk twins',                        kind: 'compound', src: 'U' },
  { h: 'ענת ועשתרת', name: 'Anat-wa-Ashtart',role: 'two warrior goddesses merged',             kind: 'compound', src: 'U' },
  { h: 'קדש ואמררו', name: 'Qudšu-wa-Amrur',  role: 'Athirat\'s messenger/fisherman',           kind: 'compound', src: 'U' },
  { h: 'ארץ ושמם',   name: 'Arṣu-wa-Šamuma',  role: 'Earth and Heaven (double deity)',          kind: 'compound', src: 'U' },
  { h: 'תכמנ ושנם', name: 'Ṯukamuna-wa-Šunama', role: 'two sons of El & Athirat',              kind: 'compound', src: 'U' },
  { h: 'גפן ועגר',   name: 'Gupan-wa-Ugar',   role: 'Baal\'s messengers (Vine + Field)',        kind: 'compound', src: 'U' },
  { h: 'אל עליון',   name: 'El Elyon',        role: 'El the Most High (Gen 14)',                kind: 'compound', src: 'B' },
  { h: 'אל שדי',     name: 'El Shaddai',      role: 'El of the steppe (Gen 17)',                kind: 'compound', src: 'B' },
];

// de Moor's ~22 majors (UF 2, 1970) — the named major-pantheon tier. Listed from the union of
// KTU 1.47 + de Moor (Healey 1985). 22 ≈ 22 Hebrew letters (numerical resonance; not a mapping).
export const MAJORS_22 = [
  'El','Athirat/Asherah','Dagan','Baal','Hadad','Anat','Athtart/Ashtoreth',
  'Mot','Yam','Kothar-wa-Khasis','Resheph','Shahar','Shalim','Shapash',
  'Yarikh','Nikkal','Pidray','Tallay','Arsay','Qudšu','Athtar','Ṯukamuna-wa-Šunama',
];

// The 70 sons of El & Athirat (KTU 1.4.VI.46) = El's divine council. NOT 70 named deities —
// a round mythological count. The named sons are already among the chiefs above (Baal, Mot,
// Shahar, Shalim, Ṯukamuna, Šunama…). Cross-cultural chain: 70 → Gen 10 nations → Deut 32:8
// (LXX/4QDeutʲ) sons of God → 1 Enoch 89:59 angels of the nations → 72 princes (LXX Gen 10).
export const SONS_OF_EL = { count: 70, source: 'KTU 1.4.VI.46', named: 'subset — see chiefs above' };