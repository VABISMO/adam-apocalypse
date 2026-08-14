// data/library_books.js — the Luco Library: complete primary-text source books,
// HOSTED ON THIS SITE and downloadable as a ZIP from /library/original/<slug>/<slug>.zip.
//
// One entry per complete book behind "The Alphabet from the Sky" — the Hebrew letter-
// tradition sources AND the cross-cultural primary texts (Avesta, Ṛg Veda, Qur'an,
// Nag Hammadi, Book of the Dead, I Ching, Popol Vuh, Hermetica, Josephus). Every book is
// COMPLETE (verified) and lives in the repo `library/<slug>/` folder; the build zips each
// folder so the download is served from our own domain, not an external link.
//
// `folder` — the repo `library/<slug>` path the download ZIP is built from.
// `kind`  — 'book' (a primary text or monograph) | 'reference' (a concordance / lexicon /
//           reference report — a lookup work, not a narrative text).
// `lang`  — the language of the hosted text.
//
// Per the user's rule, no book ships incomplete and no download links out to a
// lending-only / no-file archive.org item: the complete text is hosted here. Non-hostable
// sources (image-only Hebrew MS scans, copyrighted critical editions, software, APIs,
// datasets, journal articles) stay cited in the paper §12.2 and are NOT in this library.
export const LIBRARY_BOOKS = [
  {
    slug: 'sefer-yetzirah',
    title: 'Sefer Yetzirah (Book of Formation)',
    author: 'Anonymous (Hebrew base + Ramban commentary; trans. W. W. Westcott 1893)',
    year: '~200–900 CE',
    lang: 'Hebrew + English',
    kind: 'book',
    summary: 'Sefer Yetzirah ("Book of Formation") is the earliest surviving Hebrew cosmological treatise, composed anonymously between roughly the 2nd and 9th centuries CE. In fewer than two thousand words it describes the creation of the universe through 22 Hebrew letters — 3 mother letters (air, water, fire), 7 double letters, and 12 simple letters — which it maps onto the 7 planets and the 12 zodiac signs, and arranges into the 231 two-letter gates. It is the foundational text of Jewish letter-mysticism and the direct ancestor of the later Kabbalah. The folder holds the Hebrew base text (Sefaria), the Nachmanides/Ramban commentary (Warsaw 1884), and the Westcott 1893 English translation (with the "Thirty-Two Paths of Wisdom" supplement).',
    relevance: 'The frame text of this whole project: 3 mothers / 7 doubles / 12 simples; the letter↔luminary mapping; the 231 gates = C(22,2); AB+BA = ABBA. The 22 letters, the 7 planets and the 12 zodiac signs are the apparatus the Reader computes.',
    folder: 'sefer-yetzirah'
  },
  {
    slug: 'enoch',
    title: '1 Enoch (the Book of Enoch)',
    author: 'Anonymous (trans. R. H. Charles)',
    year: '~3rd c. BCE – 1st c. CE',
    lang: 'English (from Ge‘ez)',
    kind: 'book',
    summary: '1 Enoch (the Ethiopic Book of Enoch) is a Jewish apocalyptic work composed from the 3rd century BCE onward and preserved in Ge‘ez in the Ethiopian Orthodox canon. It collects the Book of the Watchers, the Book of the Luminaries (chs 72–82, the Astronomical Book), the Similitudes, the Animal Apocalypse, and the Apocalypse of Weeks. The Charles 1917 SPCK translation (all 108 chapters) is the complete public-domain English edition hosted here.',
    relevance: 'The calendrical substrate and the sky-as-text image (§13): the 364-day calendar and the twelve gates of the sun (Book of the Luminaries, chs 72–82), the heavenly tablets, the Watchers who teach the forbidden arts, and the stars that transgress — the Enochic astronomy the stellar-alphabet thesis rests on.',
    folder: 'enoch'
  },
  {
    slug: '2-enoch',
    title: '2 Enoch (Slavonic Enoch / Book of the Secrets of Enoch)',
    author: 'Anonymous (trans. W. R. S. Morfill)',
    year: '~1st c. CE',
    lang: 'English (from Slavonic)',
    kind: 'book',
    summary: '2 Enoch (the Slavonic Book of the Secrets of Enoch) is a late-antique Jewish apocalyptic text preserved in Old Church Slavonic. It describes Enoch’s ascension through the seven heavens, the creation account, and the angelology, and gives his 365 years (echoing the solar-year 365 motif alongside the 364-day calendar of 1 Enoch). The Morfill 1896 English translation is the complete edition hosted here.',
    relevance: 'Enoch’s 365 years (2 Enoch 1:2; cf. Gen 5:23) and the seven-heaven cosmology — the 365-day echo in the Enochic literature and the seven-tiered heaven that matches the Sefer Yetzirah 7 doubles.',
    folder: '2-enoch'
  },
  {
    slug: '3-enoch',
    title: '3 Enoch (the Hebrew Book of Enoch)',
    author: 'Anonymous (trans. Hugo Odeberg)',
    year: '~5th–10th c. CE',
    lang: 'English (from Hebrew)',
    kind: 'book',
    summary: '3 Enoch (the Hebrew Book of Enoch, Sefer Hekhalot) is a merkabah-mysticism text of the late-antique to early-medieval Heikhalot literature. It narrates Rabbi Ishmael’s ascent to the divine chariot and his encounter with Metatron, "the lesser YHWH," and describes creation by letters, including "the planets and the constellations." The Odeberg 1928 edition (English + Hebrew + commentary) is the complete edition hosted here.',
    relevance: 'Creation by letters including "the planets and the constellations" (13:1); Metatron the "lesser YHWH" and the seventy names. The merkabah-stratum text carrying the creator-letter theology and the 70-name motif (§13).',
    folder: '3-enoch'
  },
  {
    slug: 'nag-hammadi',
    title: 'The Nag Hammadi Library in English',
    author: 'James M. Robinson (ed., various translators)',
    year: '1977',
    lang: 'English (from Coptic)',
    kind: 'book',
    summary: 'The Nag Hammadi Library is the cache of 45 Gnostic Christian texts in 4th-century Coptic, discovered in 1945 buried in a sealed jar near Nag Hammadi, Egypt. Robinson’s standard complete English edition of the corpus is hosted here — the Gospel of Thomas, the Gospel of Philip, the Apocryphon of John, the Thunder: Perfect Mind, and the Apocalypse of Adam (NHC V,5) among the 45+ tractates (multiple translations).',
    relevance: '365 angels (Apocryphon of John) = the solar year; 72 gods = 72 languages (Origin of the World); the 12→72→360 cascade (Eugnostos); the Apocalypse of Adam supplies the eschatological register (12 / 13 / 14 kingdoms) and its 13th kingdom, "every birth of their ruler is a word" — the project’s framing source (§1).',
    folder: 'nag-hammadi'
  },
  {
    slug: 'avesta',
    title: 'The Avesta (Zend-Avesta)',
    author: 'tr. James Darmesteter, L. H. Mills & A. V. W. Jackson (Sacred Books of the East)',
    year: '1898',
    lang: 'English (from Avestan)',
    kind: 'book',
    summary: 'The Zoroastrian scriptures — the Vendidad (22 Fargards), the Yashts (hymns to the yazatas), and the Yasna (the sacred liturgy, 72 chapters). The complete Sacred Books of the East translation (Darmesteter, Mills, Jackson) is hosted here.',
    relevance: '7 Amesha Spentas, 16 sacred lands, 21 Yashts, 72 Yasna chapters, 99,999 diseases — the Indo-Iranian sibling of the Ṛg Veda carrying the system’s constants in its own frame.',
    folder: 'avesta'
  },
  {
    slug: 'quran',
    title: 'The Qur’ān (The Meaning of the Glorious Qur’an)',
    author: 'tr. M. M. Pickthall',
    year: '1930',
    lang: 'English (from Arabic)',
    kind: 'book',
    summary: 'The Qur’an — Pickthall’s English translation of all 114 surahs. The complete public-domain text is hosted here.',
    relevance: 'The constants carried in the Arabic text itself: 7, 12, 28 (= the lunar mansions / the Arabic letters), and 19 (sura 74:30, "Above it are nineteen") — the ‘ilm al-ḥurūf ("science of letters"), the closest non-Hebrew sibling of the Sefer Yetzirah letter-astronomy.',
    folder: 'quran'
  },
  {
    slug: 'rig-veda',
    title: 'The Hymns of the Ṛg Veda',
    author: 'tr. Ralph T. H. Griffith',
    year: '1896',
    lang: 'English (from Sanskrit)',
    kind: 'book',
    summary: 'The complete Ṛg Veda Saṃhitā — all 10 maṇḍalas, 1028 hymns — in Griffith’s English translation (2nd edition, 1896). The sanskritweb.net proofread 7-bit-ASCII edition is hosted here, hymns tagged [BB-HHH] (book–hymn).',
    relevance: 'The oldest text in the library and the strongest single witness to the system’s constants in their own idiom: the 12-spoked / 360-spoke year-wheel (RV 1.164), 720 sons, 7 metres, the 7 horses of Sūrya, the 27/28 nakṣatras, the Nāsadīya creation hymn (10.129) and the Puruṣa Sūkta (10.90).',
    folder: 'rig-veda'
  },
  {
    slug: 'hermetica',
    title: 'Thrice Greatest Hermes (the Hermetic Fragments)',
    author: 'tr. G. R. S. Mead',
    year: '1906',
    lang: 'English (from Greek/Latin)',
    kind: 'book',
    summary: 'Thrice Greatest Hermes — Mead’s three-volume 1906 translation of the Corpus Hermeticum, the Stobaeus Hermetic fragments, and the Perfect Sermon (Asclepius), with introduction and commentary. The complete three volumes are hosted here.',
    relevance: 'The Greco-Egyptian Hermetic corpus — the decans, the seven planetary spheres, and the cosmic sympathy — is the late-antique astral milieu behind the Gnostic and Sefer Yetzirah letter-cosmologies.',
    folder: 'hermetica'
  },
  {
    slug: 'book-of-the-dead',
    title: 'The Book of the Dead (Papyrus of Ani)',
    author: 'tr. E. A. Wallis Budge',
    year: '1895',
    lang: 'English (from Egyptian)',
    kind: 'book',
    summary: 'The Egyptian Book of the Dead — the complete English translation of the Papyrus of Ani by Budge: the Hymn to Osiris, the Negative Confession, and all the chapters, spells and rubrics. The clean e-text (ed. Ali B. Ali-Dinar, University of Pennsylvania African Studies Center) is hosted here.',
    relevance: 'The 365-day civil year, the 36 decans (→ the 12-sign zodiac, 3 decans/sign), the Sothic 1461-year Sirius cycle, and the 72 conspirators of Set — the Egyptian strand of the system’s constants.',
    folder: 'book-of-the-dead'
  },
  {
    slug: 'i-ching',
    title: 'The I Ching (Yi Jing / Book of Changes)',
    author: 'tr. James Legge (Sacred Books of the East, vol. XVI)',
    year: '1882',
    lang: 'English (from Chinese)',
    kind: 'book',
    summary: 'The I Ching — the Book of Changes: the 64 hexagrams, the Ten Wings, and the commentary. Legge’s complete 1882 translation (Sacred Books of the East, vol. XVI) is hosted here.',
    relevance: 'Independent Chinese astronomy: the Metonic 19-year cycle and the 28-lunar-mansion scheme converge on the same constants with no borrowing — the east-Asian witness to 19 and 28.',
    folder: 'i-ching'
  },
  {
    slug: 'popol-vuh',
    title: 'The Popol Vuh',
    author: 'tr. Lewis Spence',
    year: '1908',
    lang: 'English (from K’iche’)',
    kind: 'book',
    summary: 'The Popol Vuh — the K’iche’ Maya creation myth: the genesis of the world, the Hero Twins, and the genealogies of the Quiché lords. Spence’s 1908 English translation is hosted here.',
    relevance: 'The Maya calendar corroborates 73, 144000 and 260 with no contact with Hebrew or Revelation — the strongest independent witness to the system’s constants outside the Old World.',
    folder: 'popol-vuh'
  },
  {
    slug: 'josephus',
    title: 'The Complete Works of Flavius Josephus',
    author: 'tr. William Whiston',
    year: '1905',
    lang: 'English (from Greek)',
    kind: 'book',
    summary: 'The Complete Works of Josephus — the Antiquities of the Jews, the Jewish War, the Life, and Against Apion. Whiston’s complete English translation is hosted here.',
    relevance: 'Josephus (Antiquities 1.2) records the Sethian tradition of the two antediluvian pillars — one of brick, one of stone — inscribed with the astronomical knowledge of the world before the flood, the classical attestation of the "documented construction" theme.',
    folder: 'josephus'
  },
  {
    slug: 'gaffarel',
    title: 'Unheard-of Curiosities',
    author: 'Jacques Gaffarel (Eng. trans. Edmund Chilmead)',
    year: '1650',
    lang: 'English (from French)',
    kind: 'book',
    summary: 'Unheard-of Curiosities concerning the talismanical sculpture of the Persians, the horoscope of the patriarchs, and the reading of the stars — Gaffarel’s Curiositez inouyes (Paris 1629) in the 1650 Chilmead English translation. The complete EEBO-TCP transcription (CC0, Text Creation Partnership) is hosted here; the folder also holds a curated extract of Part IV (the reading of the stars) and the table of contents.',
    relevance: 'The Persian magi read the heavens as a text of Hebrew letters; the stars are ranged in the heavens "in the form of Hebrew letters," and the sky is a book (Isa 34:4); Part IV ch. XIII on the celestiall writing in Hebrew characters. The closest historical witness to the stellar-alphabet reading as a living practice.',
    folder: 'gaffarel'
  },
  {
    slug: 'ibn-ezra',
    title: 'Sefer ha-Mispar (the Book of the Number)',
    author: 'Abraham ibn Ezra',
    year: '1147 / 1895 ed.',
    lang: 'Hebrew',
    kind: 'book',
    summary: 'Abraham ibn Ezra (1089–1167), the Andalusian-Jewish biblical exegete, mathematician and astrologer, wrote on gematria, the divine names, the mazzalot, the 28 lunar mansions, and the theory of precession. Sefer ha-Mispar ("Book of the Number") is his Hebrew treatise on arithmetic and the Hebrew numerals — the 1895 edition is hosted here.',
    relevance: 'A primary Hebrew source for the gematria conventions (א=1…ת=400) the paper’s calculations rely on, and for the 28-lunar-mansion / precession substrate of the letter-mansion correspondence (§9).',
    folder: 'ibn-ezra'
  },
  {
    slug: 'agrippa',
    title: 'Three Books of Occult Philosophy',
    author: 'Heinrich Cornelius Agrippa von Nettesheim',
    year: '1651',
    lang: 'English (from Latin)',
    kind: 'book',
    summary: 'Three Books of Occult Philosophy — Agrippa’s encyclopaedia of Renaissance magic: the elemental, celestial and intellectual worlds, the planetary sigils, the magic squares (kameot), and the Hebrew/Aramaic divine names. The complete 1651 "J.F." (John French) English translation, all three books, is hosted here.',
    relevance: 'The early-modern conduit of the Sefer Yetzirah letter-astrology into the Western sigil/kamea tradition: the first attestation of the sigil-on-kamea method and the Aiq Bekar table in Christian Kabbalah. The paper’s sigil forge (§6.3 / §15b.3) is documented as Renaissance (Agrippa, 1531), not medieval Jewish.',
    folder: 'agrippa'
  },
  {
    slug: 'strong-concordance',
    title: 'Strong’s Exhaustive Concordance of the Bible',
    author: 'James Strong',
    year: '1890',
    lang: 'English / Hebrew / Greek',
    kind: 'reference',
    summary: 'Strong’s Exhaustive Concordance (1890) — the first exhaustive concordance of the King James Version, with a complete Hebrew & Chaldee dictionary and a complete Greek dictionary keyed to the Strong numbering system (the 8674 Hebrew + 5624 Greek entries) still in universal use. The complete 1890 first edition (1832 pages) is hosted here.',
    relevance: 'The lexicon backbone of the paper’s biblical-name and toponym datasets: every Hebrew root and theophoric element (the n-pr / n-pr-loc persons and cities) is resolved via the Strong numbers. The OpenScriptures machine-readable lexicon the Reader uses is built on this public-domain original.',
    folder: 'strong-concordance'
  },
  {
    slug: 'lahiri',
    title: 'Report of the Calendar Reform Committee (the Lahiri ayanāṃśa)',
    author: 'Calendar Reform Committee, CSIR (Government of India)',
    year: '1955',
    lang: 'English',
    kind: 'reference',
    summary: 'The Report of the Calendar Reform Committee (CSIR, Government of India, 1955) — the basis of the Indian National Calendar and the Lahiri (Chitrapaksha) ayanāṃśa, the sidereal zero-point convention that fixes the offset (~24.18° today) between the tropical and sidereal zodiacs. The complete 1955 report is hosted here.',
    relevance: 'The reference ayanāṃśa the Ages / Ayanamsa tabs report. The paper dates the precessional ages by tropical sign occupation (ayanāṃśa-independent) but cites the Lahiri value for the sidereal frame.',
    folder: 'lahiri'
  }
];

// slug → book entry, for the client-side /library/<slug> lookup.
const _BY_SLUG = new Map(LIBRARY_BOOKS.map((b) => [b.slug, b]));
export function bookBySlug(slug){ return _BY_SLUG.get(slug); }