// data/library_manifest.js — catalog of every book in /library that the Luco Library
// app standardizes, searches, and serves. Each entry drives web/scripts/library_build.js
// (the normalizer, bundled into prerender.cjs) which emits web/library/data/<slug>.json +
// catalog.json + catalog.words.json and copies originals to web/library/original/<slug>/.
//
// `parser` selects the segmenter; `files` are paths relative to /library; `options` tune it.
// All sources are public domain (see each folder's README for edition/attribution).
const MANIFEST = [

  // ── sacred-texts per-chapter splits (English translations) ──────────────────
  {
    slug: 'avesta',
    title: 'Avesta — Zoroastrian Scriptures',
    author: 'James Darmesteter et al. (Sacred Books of the East)',
    year: 1898,
    lang: 'en',
    source: 'sacred-texts.com',
    license: 'public domain',
    description: 'The Zoroastrian scriptures: the Vendidad (22 Fargards), the Yashts (hymns to the yazatas), and the Yasna (sacred liturgy).',
    genre: 'scripture',
    parser: 'sacred-texts-chapter',
    files: ['avesta/vendidad_vd1sbe.txt','avesta/vendidad_vd2sbe.txt','avesta/vendidad_vd3sbe.txt','avesta/vendidad_vd4sbe.txt','avesta/vendidad_vd5sbe.txt','avesta/vendidad_vd6sbe.txt','avesta/vendidad_vd7sbe.txt','avesta/vendidad_vd8sbe.txt','avesta/vendidad_vd9sbe.txt','avesta/vendidad_vd10sbe.txt','avesta/vendidad_vd11sbe.txt','avesta/vendidad_vd12sbe.txt','avesta/vendidad_vd13sbe.txt','avesta/vendidad_vd14sbe.txt','avesta/vendidad_vd15sbe.txt','avesta/vendidad_vd16sbe.txt','avesta/vendidad_vd17sbe.txt','avesta/vendidad_vd18sbe.txt','avesta/vendidad_vd19sbe.txt','avesta/vendidad_vd20sbe.txt','avesta/vendidad_vd21sbe.txt','avesta/vendidad_vd22sbe.txt','avesta/yasht_yt5sbe.txt','avesta/yasht_yt6sbe.txt','avesta/yasht_yt7sbe.txt','avesta/yasht_yt8sbe.txt','avesta/yasht_yt9sbe.txt','avesta/yasht_yt10sbe.txt','avesta/yasht_yt11sbe.txt','avesta/yasht_yt12sbe.txt','avesta/yasht_yt13sbe.txt','avesta/yasht_yt14sbe.txt','avesta/yasht_yt15sbe.txt','avesta/yasht_yt16sbe.txt','avesta/yasht_yt17sbe.txt','avesta/yasht_yt18sbe.txt','avesta/yasht_yt19sbe.txt','avesta/yasht_yt21sbe.txt','avesta/yasna_y0to8.txt','avesta/yasna_y9to11.txt','avesta/yasna_y12.txt','avesta/yasna_y13to27.txt','avesta/yasna_y28to34.txt','avesta/yasna_y35to42.txt','avesta/yasna_y43to46.txt','avesta/yasna_y47to50.txt','avesta/yasna_y51.txt','avesta/yasna_y52.txt','avesta/yasna_y53.txt','avesta/yasna_y54to72.txt'],
    options: { labelFirstLine: true }
  },
  {
    slug: 'quran',
    title: "The Qur'an (Pickthall)",
    author: 'M.M. Pickthall',
    year: 1930,
    lang: 'en',
    source: 'sacred-texts.com',
    license: 'public domain',
    description: "The Meaning of the Glorious Qur'an, M.M. Pickthall's English translation — 114 surahs.",
    genre: 'scripture',
    parser: 'sacred-texts-chapter',
    files: Array.from({ length: 114 }, (_, i) => 'quran/surah_' + String(i + 1).padStart(3, '0') + '.txt'),
    options: { labelRegex: '^\\s*\\d+\\.\\s+al-' }
  },
  {
    slug: 'nag-hammadi',
    title: 'The Nag Hammadi Library',
    author: 'Various translators (Robinson edition)',
    year: 1978,
    lang: 'en',
    source: 'sacred-texts.com',
    license: 'public domain',
    description: 'The Gnostic scriptures found near Nag Hammadi in 1945 — Gospel of Thomas, Gospel of Truth, Thunder Perfect Mind, the Apocryphon of John, and other tractates.',
    genre: 'gnostic',
    parser: 'sacred-texts-chapter',
    files: ['nag-hammadi/1ja.txt','nag-hammadi/2ja.txt','nag-hammadi/2seth.txt','nag-hammadi/actp.txt','nag-hammadi/adam.txt','nag-hammadi/anoi.txt','nag-hammadi/apocjn.txt','nag-hammadi/apopet.txt','nag-hammadi/ascp.txt','nag-hammadi/autho.txt','nag-hammadi/bapta.txt','nag-hammadi/baptb.txt','nag-hammadi/bookt-jdt.txt','nag-hammadi/cgp.txt','nag-hammadi/dialog.txt','nag-hammadi/discorse.txt','nag-hammadi/eucha.txt','nag-hammadi/euchb.txt','nag-hammadi/eugn.txt','nag-hammadi/exe.txt','nag-hammadi/gop.txt','nag-hammadi/gosthom.txt','nag-hammadi/gostruth.txt','nag-hammadi/got.txt','nag-hammadi/gthlamb.txt','nag-hammadi/hyphis.txt','nag-hammadi/hypostas.txt','nag-hammadi/intpr.txt','nag-hammadi/jam.txt','nag-hammadi/jam2.txt','nag-hammadi/letpet.txt','nag-hammadi/marsanes.txt','nag-hammadi/nore.txt','nag-hammadi/origin.txt','nag-hammadi/para_shem.txt','nag-hammadi/plato.txt','nag-hammadi/prat.txt','nag-hammadi/prayp.txt','nag-hammadi/res.txt','nag-hammadi/sent.txt','nag-hammadi/sjc.txt','nag-hammadi/steles.txt','nag-hammadi/thunder.txt','nag-hammadi/trimorph.txt','nag-hammadi/valex.txt','nag-hammadi/zostr.txt'],
    options: { titleAfter: 'The Nag Hammadi Library', bodyAfter: 'Translated by' }
  },
  {
    slug: 'rig-veda',
    title: 'Rig Veda — Selected Hymns (Griffith)',
    author: 'Ralph T.H. Griffith',
    year: 1896,
    lang: 'en',
    source: 'sacred-texts.com',
    license: 'public domain',
    description: 'Selected hymns of the Rig Veda in Griffith’s translation — including the Nasadiya (creation), Purusha (cosmic man), Vac (speech), the Year-Wheel (1.164), and hymns to Agni, Surya, Visvakarman, and the Adityas.',
    genre: 'scripture',
    parser: 'sacred-texts-chapter',
    files: ['rig-veda/hymn_adityas_10-72.txt','rig-veda/hymn_agni_1-1.txt','rig-veda/hymn_nasadiya_10-129.txt','rig-veda/hymn_purusha_10-90.txt','rig-veda/hymn_surya_1-50.txt','rig-veda/hymn_vac_10-125.txt','rig-veda/hymn_visvakarman_1-73.txt','rig-veda/hymn_yearwheel_1-164.txt'],
    options: { labelRegex: '^\\s*HYMN\\s+[IVXLCDM]+\\.' }
  },

  // ── DjVu OCR prose (archive.org) ────────────────────────────────────────────
  {
    slug: 'hermetica-vol1',
    title: 'Thrice-Greatest Hermes, Vol. I (Prolegomena)',
    author: 'G.R.S. Mead',
    year: 1906,
    lang: 'en',
    source: 'archive.org (DjVuTXT)',
    license: 'public domain',
    description: 'Mead’s Prolegomena to the Hermetic literature: the remains of the Trismegistic literature, the history of opinion, and Thoth as Master of Wisdom.',
    genre: 'hermetic',
    parser: 'djvu-prose',
    files: ['hermetica/thrice-greatest-hermes-vol1.djvu.txt'],
    options: { skipUntil: 'I. THE REMAINS', headingRegex: '^([IVX]+\\.[A-Z].*)$', stripLines: ['^>.*$', '^[\\divxlcdm]+$', '^\\s*[\\u2022\\*] '] }
  },
  {
    slug: 'hermetica-vol2',
    title: 'Corpus Hermeticum (Mead, Vol. II)',
    author: 'G.R.S. Mead',
    year: 1906,
    lang: 'en',
    source: 'archive.org (DjVuTXT)',
    license: 'public domain',
    description: 'The Corpus Hermeticum — the Hermetic sermons (Poimandres, the Asclepius dialogue, etc.) in Mead’s translation.',
    genre: 'hermetic',
    parser: 'djvu-prose',
    files: ['hermetica/thrice-greatest-hermes-vol2.djvu.txt'],
    // Body sermon headers are OCR-garbled variants of "CORPUS HERMETICUM" (COKPUS/COEPUS/CORPUS + HEKMETICUM/HERMETICUM/HEEMETICUM).
    // The TOC line (48) starts with "/", the part-divider (301) is lowercase "Corpus Hermeticum" — neither matches this
    // uppercase-anchored regex, so front matter is auto-dropped (cur stays null until the first real sermon at line 307).
    // labelReplacements de-garbles the captured header into a clean "Corpus Hermeticum <roman>" label.
    options: { headingRegex: '^(C[O0][RKPEU]+S\\s+H[A-Z]*METICUM.*)$', labelReplacements: [['^C[O0][RKPEU]+S\\s+H[A-Z]*METICUM', 'Corpus Hermeticum']], stripLines: ['^\\*{3,}$', '^\\d{1,4}$'] }
  },
  {
    slug: 'hermetica-vol3',
    title: 'Thrice-Greatest Hermes, Vol. III (Excursions)',
    author: 'G.R.S. Mead',
    year: 1906,
    lang: 'en',
    source: 'archive.org (DjVuTXT)',
    license: 'public domain',
    description: 'Mead’s Excursions: the Hermetic fragments and supporting essays.',
    genre: 'hermetic',
    parser: 'djvu-prose',
    files: ['hermetica/thrice-greatest-hermes-vol3.djvu.txt'],
    options: { skipUntil: 'FRAGMENT', headingRegex: '^(FRAGMENT[^\n]*)$', stripLines: ['^\\d{1,4}$'] }
  },
  {
    slug: 'book-of-the-dead',
    title: 'The Book of the Dead (Budge)',
    author: 'E.A. Wallis Budge',
    year: 1895,
    lang: 'en',
    source: 'Project Gutenberg #1808',
    license: 'public domain',
    description: 'The Egyptian Book of the Dead — Budge’s translation of the Theban recension, with chapters and vignettes.',
    genre: 'egyptian',
    parser: 'gutenberg',
    files: ['book-of-the-dead/book-of-the-dead.gutenberg.txt'],
    options: { encoding: 'latin1', headingRegex: '^(CHAPTER\\s+[IVXLC]+\\.?.*)$' }
  },
  {
    slug: 'i-ching',
    title: 'I Ching (Legge, SBE vol. XVI)',
    author: 'James Legge',
    year: 1882,
    lang: 'en',
    source: 'archive.org (DjVuTXT)',
    license: 'public domain',
    description: 'The Book of Changes — Legge’s translation of the 64 hexagrams and the Wing commentaries. (OCR on hexagram headings is partly degraded; the full text remains searchable.)',
    genre: 'chinese',
    parser: 'djvu-prose',
    files: ['i-ching/yi-king-legge-sbe16.djvu.txt'],
    options: { skipUntil: 'I. The Khien Hexagram', headingRegex: '^([IVXLCDM]+\\. The .* Hexagram\\.)$', stripLines: ['^\\d{1,4}$'] }
  },
  {
    slug: 'popol-vuh',
    title: 'Popol Vuh (Spence)',
    author: 'Lewis Spence',
    year: 1908,
    lang: 'en',
    source: 'archive.org (DjVuTXT)',
    license: 'public domain',
    description: 'The sacred book of the Quiché Maya — Spence’s translation of the creation epic in four books.',
    genre: 'maya',
    parser: 'djvu-prose',
    files: ['popol-vuh/popol-vuh-spence-1908.djvu.txt'],
    options: { skipUntil: 'PREFACE', headingRegex: '^(The (First|Second|Third|Fourth) Book.*)$', fuzzyHeadings: true, stripLines: ['^\\s*\\d+\\s*$', '^[0-9]+\\s+THE POPOL VUH$'] }
  },
  {
    slug: 'josephus',
    title: 'The Complete Works of Flavius Josephus (Whiston)',
    author: 'Flavius Josephus (tr. William Whiston)',
    year: 1905,
    lang: 'en',
    source: 'archive.org (DjVuTXT)',
    license: 'public domain',
    description: 'Josephus’ complete works — Antiquities of the Jews, Wars of the Jews, Life, and Against Apion — segmented by Work > Book > Chapter.',
    genre: 'history',
    parser: 'josephus',
    files: ['josephus/josephus-complete-works-1905.djvu.txt']
  },

  // ── Wikisource sectioned ────────────────────────────────────────────────────
  {
    slug: 'enoch',
    title: 'The Book of Enoch (1 Enoch, Charles)',
    author: 'R.H. Charles',
    year: 1917,
    lang: 'en',
    source: 'Wikisource',
    license: 'public domain',
    description: '1 Enoch in Charles’ 1917 translation — the Book of Watchers, the Parables, the Astronomical Enoch, the Dream Visions, and the Epistle of Enoch.',
    genre: 'pseudepigrapha',
    parser: 'wikisource-section',
    files: ['enoch/1enoch_charles.txt']
  },

  // ── Sefaria JSON (clean PD Hebrew) ───────────────────────────────────────────
  {
    slug: 'sefer-yetzirah',
    title: 'Sefer Yetzirah (Hebrew)',
    author: 'Anonymous (Sefaria source)',
    year: null,
    lang: 'he',
    source: 'Sefaria',
    license: 'public domain',
    description: 'The Book of Formation — the Hebrew source text, 6 chapters / 48 mishnayot. The stellar-alphabet root text of the project.',
    genre: 'kabbalah',
    parser: 'sefaria-json',
    files: ['sefer-yetzirah/sefer_yetzirah_base.v3.json'],
    options: { depth: 2, rtl: true }
  },
  {
    slug: 'sefer-yetzirah-ramban',
    title: 'Ramban on Sefer Yetzirah (Hebrew commentary)',
    author: 'Nachmanides (Ramban of Girona) — Girona-school attribution',
    year: 1884,
    lang: 'he',
    source: 'Sefaria (Warsaw 1884 ed.)',
    license: 'public domain',
    description: 'The Ramban commentary on Sefer Yetzirah — 3 chapters / 28 mishnayot / 105 comments. «…» marks the dibur hamatchil (the lemma being glossed).',
    genre: 'kabbalah',
    parser: 'sefaria-json',
    files: ['sefer-yetzirah/ramban_on_sefer_yetzirah.v3.json'],
    options: { depth: 3, rtl: true, lemmaRegex: '^<b>(.+?)</b>' }
  },

  // ── Wikipedia reference dumps (secondary literature) ────────────────────────
  {
    slug: 'sufi-references',
    title: 'Sufi & Islamic-esoteric references',
    author: 'Wikipedia / Encyclopædia Iranica articles',
    year: null,
    lang: 'en',
    source: 'Wikipedia, Encyclopædia Iranica',
    license: 'CC-BY-SA / fair-use research excerpt',
    description: 'Reference articles on abjad numerals, the Hurufiyya, Ibn Arabi’s astrology and the seven weekdays, the Ikhwat al-Safa, jafr, and Shams al-Din al-Kubra.',
    genre: 'reference',
    parser: 'wiki-ref',
    files: ['sufi/ref_abjad_wiki.txt','sufi/ref_hurufi_iranica.txt','sufi/ref_ibnalarabi_astro.txt','sufi/ref_ibnalarabi_week.txt','sufi/ref_ikhwan_stanford.txt','sufi/ref_jaafar_esoteric_iranica.txt','sufi/ref_jafr_iranica.txt','sufi/ref_jawdanname_iranica.txt','sufi/ref_shams_kubra_wiki.txt'],
    options: { dedupeGroup: 'wiki-ref' }
  },
  {
    slug: 'gematria-references',
    title: 'Gematria & numerology references',
    author: 'Wikipedia articles',
    year: null,
    lang: 'en',
    source: 'Wikipedia',
    license: 'CC-BY-SA / fair-use research excerpt',
    description: 'Reference articles on gematria, isopsephy, the abjad and katapayadi systems, Hebrew/Greek/Coptic/Cyrillic numerals, and the Number of the Beast.',
    genre: 'reference',
    parser: 'wiki-ref',
    files: ['gematria/ref_abjad_numerals_wiki.txt','gematria/ref_aryabhata_numeration_wiki.txt','gematria/ref_coptic_numerals_wiki.txt','gematria/ref_cyrillic_numerals_wiki.txt','gematria/ref_gematria_wiki.txt','gematria/ref_greek_numerals_wiki.txt','gematria/ref_hebrew_numerals_wiki.txt','gematria/ref_isopsephy_wiki.txt','gematria/ref_katapayadi_wiki.txt','gematria/ref_number_beast_wiki.txt','gematria/ref_roman_numerals_wiki.txt'],
    options: { dedupeGroup: 'wiki-ref' }
  },

  // ── Gaffarel (clean excerpt; raw OCR blob skipped) ──────────────────────────
  {
    slug: 'gaffarel',
    title: 'Jacques Gaffarel — Reading of the Stars (1650, excerpt)',
    author: 'Jacques Gaffarel',
    year: 1650,
    lang: 'en',
    source: 'archive.org (clean excerpt)',
    license: 'public domain',
    description: 'An excerpt from Gaffarel’s 1650 work on the reading of the stars and its structure. (The raw 754 KB OCR blob is too degraded to index.)',
    genre: 'renaissance-magic',
    parser: 'plain',
    files: ['gaffarel/gaffarel_1650_part4_reading_of_stars.txt','gaffarel/gaffarel_1650_structure.txt','gaffarel/_idx.md'],
    options: { labelPrefix: 'gaffarel' }
  }
];

export { MANIFEST };