// data/library_books.js — the Luco Library bibliography.
// One entry per source in the paper "The Alphabet from the Sky" §12.2 (+ the complete
// Nag Hammadi Library). Each ficha carries two texts: `summary` (what the book IS) and
// `relevance` (the specific findings this project draws from it), and links to a COMPLETE
// source on archive.org where one is verified to exist.
//
// URLs verified 2026-08-14 via the archive.org metadata API (imagecount / page-count
// cross-checked against known full-book extents; TOC checked where present). Every link
// points to archive.org. Items that are a DIFFERENT text or incomplete were rejected.
// Where no complete edition exists on archive.org (a journal article, a web-published
// essay, a copyrighted book with no lending scan, a dataset/API/software, or a text only
// present as a different work), `url` is empty and `urlNote` says so honestly — no
// non-archive.org fallback, by the user's explicit instruction.
//
// `kind` — 'book' (a primary text or monograph) | 'reference' (a dataset, API, lexicon,
//           software, or technical ephemeris — not a single bound book).
// `lang` — the language of the linked archive.org edition (English where a complete
//          English edition exists; otherwise the original-language facsimile).
export const LIBRARY_BOOKS = [
  {
    slug: 'sefer-yetzirah',
    title: 'Sefer Yetzirah (Book of Formation)',
    author: 'Anonymous (ed. A. Hayman 2004; trans. A. Kaplan 1990)',
    year: '~200–900 CE',
    kind: 'book',
    lang: 'English',
    summary: 'Sefer Yetzirah ("Book of Formation") is the earliest surviving Hebrew cosmological treatise, composed anonymously between roughly the 2nd and 9th centuries CE. In fewer than two thousand words it describes the creation of the universe through 22 Hebrew letters — 3 mother letters (air, water, fire), 7 double letters, and 12 simple letters — which it maps onto the 7 planets and the 12 zodiac signs, and arranges into the 231 two-letter gates. It is the foundational text of Jewish letter-mysticism and the direct ancestor of the later Kabbalah; virtually every medieval Hebrew alphabet-astronomy commentary, from Saadia to the Sefer Raziel, takes it as its starting point. The 1893 Westcott edition reprinted here (following the Rittangelius 1642 Hebrew) also appends the related "Thirty-Two Paths of Wisdom".',
    relevance: 'The frame text of this whole project: 3 mothers / 7 doubles / 12 simples; the letter↔luminary mapping; the 231 gates = C(22,2); AB+BA = ABBA. The 22 letters, the 7 planets and the 12 zodiac signs are the apparatus the Reader computes.',
    url: 'https://archive.org/details/sepheryetzirahb00rittgoog',
    urlNote: 'W. Wynn Westcott, "Sepher Yetzirah" (Theosophical Publishing Society, 1893) — the complete public-domain English edition incl. the 32 Paths of Wisdom supplement (imagecount=53). A modern lending backup (Aryeh Kaplan 1997) is at archive.org/details/sefer-yetzirah-the-book-of-creation-1997-aryeh-kaplan.'
  },
  {
    slug: 'sefer-raziel',
    title: 'Sefer Raziel HaMalakh (Book of the Angel Raziel)',
    author: 'Anonymous (medieval Hebrew compilation)',
    year: '12th–13th c. CE',
    kind: 'book',
    lang: 'Hebrew',
    summary: 'Sefer Raziel HaMalakh ("Book of the Angel Raziel") is a medieval Jewish compendium of practical Kabbalah, compiled in the 12th–13th centuries from older late-antique material. Presented as a book given to Adam by the angel Raziel, it covers angelology, the divine names, gematria, the 72-Name tradition, and explicit instructions to "calculate the planets and the signs" from the letters. The Book of the Vestments within it lists 275 angel names arranged across the four seasons. The 1701 Amsterdam edition became the most widely printed Hebrew grimoire.',
    relevance: 'The older sibling of the Sefer Yetzirah in this register. Decimal gematria א=1…ת=400 (p. 95); triangulars T(2..9); 12 letters↔12 signs; 72 from Genesis 1:1; 73 names of God (p. 72); 28 Malachim/month; fixed zodiac; the Book of the Vestments (275 angel names, 4 seasons); "calculate the planets and the signs… to see the generations" (pp. 143–144).',
    url: '',
    urlNote: 'No complete Sefer Raziel HaMalakh is on archive.org. The archive.org "Margalioth" item is Sefer ha-Razim, a DIFFERENT text, and the one uploader-marked "Raziel" item is an incomplete JPEG dump. The real Hebrew facsimiles (Amsterdam 1701, Hamburg Cod. hebr. 156) are not on archive.org. See the Idel / Rebiger entries for the scholarly English reception.'
  },
  {
    slug: 'saadia-commentary-sefer-yetzirah',
    title: 'Commentary on the Sefer Yetzirah',
    author: 'Saadia Gaon',
    year: 'c. 931 CE',
    kind: 'book',
    lang: 'Hebrew / Arabic',
    summary: 'Saadia Gaon (882–942), the foremost early medieval Jewish philosopher, wrote the first systematic commentary on the Sefer Yetzirah around 931 CE, in Judeo-Arabic. He reads the text’s 7 double letters as the 7 classical planets in their geocentric order and the 12 simple letters as the 12 zodiac signs, giving the earliest explicit letter-astronomy assignment. Mayer Lambert’s 1891 critical edition (Arabic text + Hebrew + French translation) remains the scholarly standard.',
    relevance: 'The first explicit assignment of the 7 doubles → 7 planets (geocentric order) and the 12 simples → 12 signs — the mapping the Reader implements. Saadia’s commentary is the earliest systematic reading of the Sefer Yetzirah as a literal letter-astronomy.',
    url: '',
    urlNote: 'No complete edition on archive.org. The Mayer Lambert 1891 critical edition (Arabic + Hebrew + French, Bibliothèque de l’EPHE) lives only on HathiTrust and the Deutsche Digitale Bibliothek, both excluded by the archive.org-only rule.'
  },
  {
    slug: 'ibn-ezra-sefer-ha-shem',
    title: 'Sefer ha-Shem / Sefer ha-Olam / Reshit Hokhmah',
    author: 'Abraham ibn Ezra',
    year: '1147–1148',
    kind: 'book',
    lang: 'Hebrew',
    summary: 'Abraham ibn Ezra (1089–1167) was a peripatetic Andalusian-Jewish biblical exegete, mathematician, and astrologer. His Hebrew astronomical treatises — Sefer ha-Shem ("Book of the Name"), Sefer ha-Olam ("Book of the World") and Reshit Hokhmah ("Beginning of Wisdom") — treat the gematria of the divine names, the mazzalot, the 28 lunar mansions, and the theory of precession. They were a major conduit by which astronomy reached medieval Hebrew readers.',
    relevance: 'The gematria of the Tetragrammaton and the 28-mansion / precession anchors in the paper’s eclipse mnemonics (§9) trace here. The 28 lunar mansions and the precession/trepidation theory are the astronomical substrate the letter-mansion correspondence rests on.',
    url: 'https://archive.org/details/seferhamispar00ezragoog',
    urlNote: 'Fallback: the three named works (Sefer ha-Shem / Sefer ha-Olam / Reshit Hokhmah) are not on archive.org as complete items — the items under those names are by different authors (Eleazar of Worms, Elijah de Vidas). Linked is Ibn Ezra’s Sefer ha-Mispar ("Book of the Number", 1895 ed., imagecount=229, complete), a genuine Ibn Ezra Hebrew work on the same number/letter themes. Other Ibn Ezra Hebrew works on archive.org include Sefer Tsafenat Pa’neach and Sefer ha-Eḥad.'
  },
  {
    slug: 'abulafia-tzerufim',
    title: 'Chayei Ha-Olam Ha-Ba / Or Ha-Sekhel',
    author: 'Abraham Abulafia',
    year: '13th c.',
    kind: 'book',
    lang: 'Hebrew',
    summary: 'Abraham Abulafia (1240–c.1292) was the founder of ecstatic Kabbalah. His prophetic method, the tzerufim, combines Hebrew letters in rhythmic permutations with breath-work to induce a state of prophecy. His treatises Chayei Ha-Olam Ha-Ba ("Life of the World to Come") and Or Ha-Sekhel ("Light of the Intellect") are manuals of this letter-combination meditation, predating the later Lurianic system by centuries.',
    relevance: 'The prophetic combination of letters (tzerufim) — Abulafia’s ecstatic kabbalah of permuting the divine letters to reach prophecy. The tzerufim tradition is a documented-construction source for the letter-permutation reading (§2).',
    url: 'https://archive.org/details/VAT597',
    urlNote: 'Or Ha-Sekhel (1285 CE), Abraham Abulafia — Vatican Library MS Vat. ebr. 597, a complete manuscript facsimile (imagecount=254, with PDF + JP2 ZIP + DjVu). The authoritative text-specific source. (A user-compiled "Abulafia Complete Writings Hebrew" also exists but is an unattributed compilation.)'
  },
  {
    slug: 'shem-ha-mephorash',
    title: 'Shem HaMephorash (Name of 72)',
    author: 'Tradition (Bahir, Zohar, Abulafia)',
    year: 'medieval',
    kind: 'book',
    lang: 'English',
    summary: 'The Shem HaMephorash ("the explicit name") is the tradition of the 72-fold divine name derived by reading the three consecutive verses of Exodus 14:19–21 in interleaved triplets (72 verses of three letters each = 216 letters). It is attested in the Sefer HaBahir, the Zohar, and Abulafia, and the mechanical extraction of the triplets is already medieval (Rashi, 11th c.).',
    relevance: 'The 72 triplets of Exodus 14:19–21 — the Shem HaMephorash the app extracts (triplets[i] = v19[i] + v20[71−i] + v21[i]) and decorates with the -El / -Yah suffixes. The tradition runs through the Bahir, the Zohar, and Abulafia.',
    url: 'https://archive.org/details/bahironeofo00nehu',
    urlNote: 'The Bahir, translated with introduction & commentary by Aryeh Kaplan (Samuel Weiser, 1989) — a complete lending-library scan (imagecount=278) carrying the 72-Name material. The Bahir is the cleanest complete single-volume source for the 72-Name tradition on archive.org (the Zohar items are partial single volumes or 12-vol lending sets).'
  },
  {
    slug: 'al-buni-shams-al-maarif',
    title: 'Shams al-Maʿārif',
    author: 'Ahmad al-Buni',
    year: '13th c.',
    kind: 'book',
    lang: 'Arabic',
    summary: 'Ahmad al-Buni (d. 622 AH/1225 CE) was a North-African Sufi scholar of the occult sciences. His Shams al-Ma’arif al-Kubra ("The Great Sun of Gnosis") is the most influential Arabic manual of the esoteric sciences — magic squares, the 99 Names of God, abjad isopsephy, and the abjad-mansions correspondence. It is the Islamic analogue of practical Kabbalah and the conduit by which the 28-letter ↔ 28-lunar-mansion correspondence reached Arabic readers.',
    relevance: 'Magic squares, the 99 Names, and the abjad isopsephy — the Islamic analogue of practical Kabbalah. The 28-letter ↔ 28-lunar-mansion correspondence (the Sufi / Arabic parallel of the letter↔star map) is received through this tradition. The paper cites it as "received Shams al-kubra" (pseudepigraphic Ottoman compilation, not by al-Buni himself).',
    url: 'https://archive.org/details/McGillLibrary-131812-5180',
    urlNote: 'Complete Arabic facsimile of Shams al-Ma’arif al-Kubra (Miṣṭafá al-Bābī al-Ḥalabī, Cairo, 1345 AH / ~1926 CE, 4 vols bound in 1, imagecount=604), public domain. A second complete copy is at archive.org/details/shams_al_maarif (616 pp, 2006 Beirut 2nd ed.). No complete English translation exists; partial English (Inloes 2022) is copyrighted.'
  },
  {
    slug: 'ibn-arabi-futuhat',
    title: 'Futūḥāt al-Makkiyya (Meccan Revelations), ch. 198',
    author: 'Muhyiddin Ibn ʿArabī',
    year: '13th c.',
    kind: 'book',
    lang: 'Arabic',
    summary: 'Muhyiddin Ibn ʿArabī (1165–1240) was the greatest Sufi mystical philosopher. His al-Futūḥāt al-Makkiyya ("Meccan Revelations"), written ~1230, runs to ~10,000 pages in modern print and is a summa of Sufi metaphysics and cosmology. Chapter 198 maps the 28 Arabic letters onto the 28 lunar mansions and the 7 planets, and is the Arabic parallel of the Sefer Yetzirah letter-astronomy. The 1999 Beirut 9-volume edition is the complete text archived here.',
    relevance: 'The Sufi parallel of the letter↔star correspondence: 28 Arabic letters ↔ 28 lunar mansions ↔ 7 planets (Futūḥāt ch. 198). Ibn ʿArabī maps the 14 luminous (undotted) letters to the 14 waxing phases and the 14 dark to the 14 waning — a complete lunar-letter isomorphism independent of the Hebrew tradition.',
    url: 'https://archive.org/details/FTMAKIA',
    urlNote: 'Complete Arabic Futūḥāt al-Makkiyya, 9 volumes (Dar al-Kutub al-Ilmiyya, Beirut, 1999, ed. Ahmad Shams al-Din, ~4,178 pp) — contains ch. 198. The older archive.org/details/Al-FutuhatAl-makkiya item is INCOMPLETE (only vols I–IV) and was rejected; use FTMAKIA. No complete English translation of the Futūḥāt exists.'
  },
  {
    slug: 'agrippa-occulta-philosophia',
    title: 'De occulta philosophia (Three Books of Occult Philosophy), Book III',
    author: 'Heinrich Cornelius Agrippa von Nettesheim',
    year: '1531/33',
    kind: 'book',
    lang: 'English',
    summary: 'Heinrich Cornelius Agrippa von Nettesheim (1486–1535) was a German humanist and occult philosopher. His De occulta philosophia (1531/1533) is the most influential Renaissance compendium of Western esotericism, its third book dedicated to celestial Kabbalah. The 1651 English translation "by J.F." (John French) reprinted here is the first attestation of the sigil-on-kamea method and the Aiq Bekar table in Christian Kabbalah.',
    relevance: 'The first attestation of the sigil-on-kamea method and of the Aiq Bekar table in Christian-Renaissance Kabbalah. The paper’s sigil forge (§6.3 / §15b.3) is documented as Renaissance (Agrippa, 1531), not medieval Jewish — Agrippa is the citation for that boundary.',
    url: 'https://archive.org/details/bim_early-english-books-1641-1700_three-books-of-occult-ph_agrippa-henricus-cornel_1651',
    urlNote: 'The complete 1651 "J.F." English translation (London, printed by R.W. for Gregory Moule), imagecount=625 = the full 1651 edition, all 3 books present (Book III has the sigil/kamea material). A freely-downloadable 1898 reprint of the same translation is at archive.org/details/cu31924028928236.'
  },
  {
    slug: 'gaffarel-unheard-curiosities',
    title: 'Unheard-of Curiosities',
    author: 'Jacques Gaffarel (Eng. trans. Edmund Chilmead)',
    year: '1650',
    kind: 'book',
    lang: 'English',
    summary: 'Jacques Gaffarel (1601–1681) was a French scholar, astrologer, and librarian to Cardinal Richelieu. His Curiositez inouyes (Paris, 1629) is an ethnographic study of Eastern astrology and magic, including the chapter on Persian magi who read the heavens as a text of Hebrew letters — the closest historical witness to the stellar-alphabet reading as a living practice. The 1650 Chilmead English translation (Unheard-of Curiosities) is the archive.org edition.',
    relevance: 'The Persian magi read the heavens as a text of Hebrew letters; the stars are ranged in the heavens "in the form of Hebrew letters," and the sky is a book (Isa 34:4). The ethnographic attestation of the stellar-alphabet reading as a living practice — the closest historical witness to what this app does. Reading instrument = the 3 Cabala: Gematria / Notaricon / Temurah.',
    url: 'https://archive.org/details/b30333817',
    urlNote: 'The 1650 Chilmead English translation (London, printed by G.D. for H. Moseley) — archive.org b30333817, the complete English edition cited in the paper (imagecount=490 = 433 pp text + front/folded matter), public domain.'
  },
  {
    slug: 'idel-raziel-conduit',
    title: 'Sefer Razi’el ha-Mal’akh — A Conduit of Medieval Ashkenazi Culture',
    author: 'Moshe Idel (Aschkenas 34/2, 2024); Bernd Rebiger (FJB 32, 2005)',
    year: '2005–2024',
    kind: 'book',
    lang: 'English / German',
    summary: 'Moshe Idel and Bernd Rebiger are the modern academic scholars who have reconstructed the redaction history of the Sefer Raziel HaMalakh. Idel’s article treats Raziel as a conduit of medieval Ashkenazi culture; Rebiger’s Frankfurter Judaistische Beiträge study traces the text’s sources and layers. Their work is the scholarly anchor for treating Raziel as a late-antique/early-medieval letter-astronomy manual, not a Renaissance fabrication.',
    relevance: 'The modern academic reception of the Sefer Raziel: Idel on Raziel as a conduit of medieval Ashkenazi culture, and Rebiger’s redaction-history study. These are the scholarly anchors for treating the Raziel as a late-antique/early-medieval letter-astronomy manual (not a Renaissance fabrication).',
    url: '',
    urlNote: 'No archive.org source. Idel’s "Sefer Razi’el ha-Mal’akh — A Conduit of Medieval Ashkenazi Culture" (Aschkenas 34/2, 2024) is a recent peer-reviewed journal article, not a book on archive.org. (Idel’s related "Studies in Ecstatic Kabbalah" on archive.org is about Abulafia, not Raziel.)'
  },
  {
    slug: 'book-of-the-luminaries',
    title: 'Book of the Luminaries (1 Enoch 72–82)',
    author: 'Anonymous (1 Enoch)',
    year: '~3rd c. BCE – 1st c. CE',
    kind: 'book',
    lang: 'English',
    summary: 'The Book of the Luminaries (1 Enoch chs 72–82), also called the Astronomical Book of Enoch, is the oldest layer of Enochic literature (~3rd c. BCE). It describes a 364-day solar calendar, the twelve gates of the sun, the 360-day year, the stars that transgress, and the heavenly tablets. It is attested at Masada (terminus ante quem 73 CE), showing it circulated widely beyond Qumran.',
    relevance: 'The calendrical substrate and the sky-as-text image: a 364-day year (72:32; 74:12; 82:6), twelve gates of the sun (ch. 72), 360 days (82:11), stars that transgress (80:6–7), heavenly tablets (81:1–2; 93; 103; 108). Broader than Qumran (attested at Masada, terminus ante quem 73 CE).',
    url: 'https://archive.org/details/bookofenochor1en00char',
    urlNote: 'R. H. Charles, "The Book of Enoch, or 1 Enoch" (Oxford Clarendon Press, 1912) — the complete unabridged critical edition (imagecount=458) containing all 108 chapters including chs 72–82, with Greek fragments. The fuller scholarly superset of the 1917 SPCK compact edition. Neugebauer’s 1981 monograph on the astronomical chapters is copyrighted (Brill).'
  },
  {
    slug: '1-enoch',
    title: '1 Enoch (Ethiopic Enoch)',
    author: 'Anonymous (trans. R. H. Charles 1917)',
    year: '~3rd c. BCE – 1st c. CE',
    kind: 'book',
    lang: 'English',
    summary: '1 Enoch (the Ethiopic Book of Enoch) is a Jewish apocalyptic work composed from the 3rd century BCE onward and preserved in Ge’ez in the Ethiopian Orthodox canon. It collects the Book of the Watchers, the Book of the Luminaries, the Animal Apocalypse, and the Apocalypse of Weeks, among other sections, and is the source of the 364-day calendar and the heavenly-tablet imagery the paper uses in §13. R. H. Charles’s 1917 translation is the public-domain English edition.',
    relevance: 'The 364-day calendar and Enochic astronomy (§13): the Book of the Luminaries, the heavenly tablets, the Watchers. The Charles 1917 translation is the free public-domain English edition.',
    url: 'https://archive.org/details/bookofenoch0000unse',
    urlNote: 'R. H. Charles, "The Book of Enoch" (SPCK, 1917) — a complete public-domain English translation on archive.org (imagecount=162, all 108 chapters). The fuller 1912 Clarendon critical edition (bookofenochor1en00char, 458 pp, with Greek fragments) is also on archive.org.'
  },
  {
    slug: '2-enoch',
    title: '2 Enoch (Slavonic Enoch / Book of the Secrets of Enoch)',
    author: 'Anonymous (trans. W. R. Morfill & R. H. Charles)',
    year: '~1st c. CE',
    kind: 'book',
    lang: 'English',
    summary: '2 Enoch (the Slavonic Book of the Secrets of Enoch) is a late-antique Jewish apocalyptic text preserved in Old Church Slavonic. It describes Enoch’s ascension through the seven heavens and gives his 365 years (echoing the solar-year 365 motif alongside the 364-day calendar of 1 Enoch). The 1896 Morfill and Charles English translation is the archive.org edition.',
    relevance: 'Enoch’s 365 years (2 Enoch 1:2; cf. Gen 5:23, Philo De post. Caini) — the 365-day echo in the Enochic literature. The Slavonic Enoch is the late-antique apocalyptic text carrying the solar-year motif alongside the 364-day calendar of 1 Enoch.',
    url: 'https://archive.org/details/bookofsecretsofe00morf',
    urlNote: 'The Morfill & Charles 1896 English translation (Oxford Clarendon Press, "The Book of the Secrets of Enoch") — public domain, the complete English edition on archive.org (imagecount=168). Backup copies: booksecretsenoc00morfgoog, bookofsecretsofe0000unse.'
  },
  {
    slug: '3-enoch-odeberg',
    title: '3 Enoch (Hebrew Enoch)',
    author: 'Anonymous (trans. Hugo Odeberg 1928)',
    year: '~5th–10th c. CE',
    kind: 'book',
    lang: 'English / Hebrew',
    summary: '3 Enoch (the Hebrew Book of Enoch) is a merkabah-mysticism text, a product of the late-antique to early-medieval Heikhalot literature (~5th–10th c. CE). It narrates Rabbi Ishmael’s ascent to the divine chariot and his encounter with Metatron, "the lesser YHWH," and describes creation by letters, including "the planets and the constellations." Hugo Odeberg’s 1928 edition (English + Hebrew + commentary) is the archive.org source.',
    relevance: 'Creation by letters including "the planets and the constellations" (13:1); Metatron the "lesser YHWH" and the seventy names. The Hebrew Enoch is the merkabah-stratum text carrying the creator-letter theology and the 70-name motif (§13).',
    url: 'https://archive.org/details/ksigaxiienochorthehebrewbookofenoch_202012',
    urlNote: 'Hugo Odeberg’s 1928 edition (Cambridge University Press, "3 Enoch, or the Hebrew Book of Enoch") — English translation + Hebrew text + commentary, public domain (1928+95=2023). The complete edition on archive.org (imagecount=504, matching the ~481-pp book).'
  },
  {
    slug: 'apocalypse-of-adam',
    title: 'Apocalypse of Adam',
    author: 'Anonymous (Nag Hammadi V,5; trans. G. W. MacRae)',
    year: '~1st–2nd c. CE',
    kind: 'book',
    lang: 'English',
    summary: 'The Apocalypse of Adam is a Gnostic text among the Nag Hammadi codices (NHC V,5), probably composed in the 1st–2nd century CE. It recounts Adam’s revelation to Seth and, in its thirteenth kingdom, describes "every birth of their ruler is a word" — the closest the Nag Hammadi corpus comes to the Sefer Yetzirah letter-theology. George MacRae’s translation is in the Robinson Nag Hammadi Library in English, the complete corpus archived here.',
    relevance: 'The thirteenth kingdom: "every birth of their ruler is a word" — the closest the Nag Hammadi corpus comes to the creator-word / Sefer Yetzirah letter-theology, and the source of the project’s framing (§1). The 13 false oracles + the 14th kingless generation that speaks the truth.',
    url: 'https://archive.org/details/naghammadilibrar0000unse_y5r7',
    urlNote: 'The Apocalypse of Adam (NHC V,5, trans. G. W. MacRae) is contained in Robinson’s "Nag Hammadi Library in English" — the complete corpus (1996 Brill 4th rev. ed., xiv+549 pp, imagecount=578, lending/print-disabled). The metadata TOC confirms the full tractate list. See also the separate complete Nag Hammadi Library entry.'
  },
  {
    slug: 'aleppo-leningrad-codex',
    title: 'Aleppo Codex & Leningrad Codex (the Masoretic Text)',
    author: 'Masoretic scribes (ben Asher family)',
    year: '920 & 1008/9 CE',
    kind: 'book',
    lang: 'Hebrew (facsimile)',
    summary: 'The Aleppo Codex (c. 920–930 CE) and the Leningrad Codex (1008/9 CE) are the two most authoritative manuscripts of the Masoretic Text of the Hebrew Bible. Both were written by scribes of the ben Asher family; the Aleppo Codex was the master model for centuries until nearly all its Torah pages were lost in the 1947 Aleppo riots, while the Leningrad Codex remains the oldest complete Hebrew Bible manuscript and is the textual base of the Biblia Hebraica Stuttgartensia. Their consonantal text is the base from which the app reads the 216 letters of Exodus 14:19–21.',
    relevance: 'The Masoretic (MT) base of the consonantal count of Exodus 14:19–21 — the 216 letters whose 72 triplets the Shem HaMephorash reads. The app’s lexicon and Genesis corpus are built on this consonantal base.',
    url: 'https://archive.org/details/aleppo-codex-tanakh-full-scan-images',
    urlNote: 'The Aleppo Codex full scan (c. 920 CE, photographed by Ardon Bar-Hama, 596 images of all extant folios incl. appended now-lost Torah page photos) — linked. The Leningrad Codex (1008/9 CE, the oldest complete Hebrew Bible, basis of BHS/BHQ) is also a complete facsimile at archive.org/details/Leningrad_Codex_Color_Images. These are Hebrew manuscripts — the source text itself, no English translation.'
  },
  {
    slug: 'yeivin-tiberian-masorah',
    title: 'Introduction to the Tiberian Masorah',
    author: 'Israel Yeivin (trans. E. J. Revell)',
    year: '1980',
    kind: 'book',
    lang: 'English',
    summary: 'Israel Yeivin’s Introduction to the Tiberian Masorah (1980, English translation by E. J. Revell) is the standard English handbook of the Tiberian Masoretic apparatus — the marginal notes that recorded the exact count of letters, words and verses and preserved the consonantal text. It includes the central-word and middle-letter counts the paper cites (darosh darash, Lev 10:16).',
    relevance: 'The Masoretic count of letters/words/verses — the central word darosh darash (Lev 10:16) — and the apparatus that preserved the consonantal text the app reads. Yeivin is the standard English handbook of the Tiberian Masorah.',
    url: '',
    urlNote: 'No archive.org source. Copyrighted (SBL / Scholars Press, Masoretic Studies 5, 1980, x+324 pp); no lending scan exists on archive.org. The only Yeivin items on archive.org are his 1968 Aleppo Codex study and a catalogue — not this book.'
  },
  {
    slug: 'domination-codex',
    title: 'Domination Codex',
    author: '—',
    year: '—',
    kind: 'book',
    lang: '—',
    summary: 'The Domination Codex is a hermeneutical/allegorical serial work that reproduces the same 231-gate and ABBA letter arithmetic as the Sefer Yetzirah and Abulafia traditions, but presents it without any statistical controls. The paper cites it in §6.3 only as a parallelistic source, not as a corroborating witness.',
    relevance: 'The same 231 / ABBA / Abulafia arithmetic, but with no null tests (§6.3). Cited critically — not as an independent corroborating witness — because it carries the letter arithmetic without the statistical controls this project applies.',
    url: '',
    urlNote: 'No archive.org source. The Domination Codex is web-published serial fiction, not a book; no archive.org item exists. Cited in the paper as a parallelistic source only.'
  },
  {
    slug: 'tenen-meru',
    title: 'The Alphabet That Changed the World',
    author: 'Stan Tenen (MERU Foundation)',
    year: '2011',
    kind: 'book',
    lang: 'English',
    summary: 'Stan Tenen (1938–2022) was an independent geometric researcher who, in The Alphabet That Changed the World (2011), argued that the Genesis 1:1 letter sequence can be folded, via base-3 mirror-pairing, into a 7-turn toroidal pattern that suggests hand-gestures behind the Hebrew letters. The work is self-published and non-peer-reviewed; the paper cites it as a convergent parallelistic source — a different route to the same Genesis-1:1 structure rather than an independent witness.',
    relevance: 'A base-3 mirror-pairing of the Genesis 1:1 letter sequence into a 7-turn toroidal pattern, independent of gematria and astronomy. Cited as a convergent but non-peer-reviewed parallelistic source — a different route to the same Genesis-1:1 structure, not an independent corroborating witness.',
    url: 'https://archive.org/details/kupdf.net_stan-tenen-the-alphabet-that-changed-the-world',
    urlNote: 'Complete community upload of Stan Tenen, "The Alphabet That Changed the World" (North Atlantic Books, 2011, imagecount=319 = full book), with PDF + EPUB + DjVu derivatives. Provenance caveat: the "kupdf.net" prefix marks it as a community upload, not a publisher/library deposit.'
  },
  {
    slug: 'pingala-chandahsastra',
    title: 'Chandaḥśāstra',
    author: 'Piṅgala (comm. Halāyudha, 10th c.)',
    year: 'c. 2nd c. BCE',
    kind: 'book',
    lang: 'Sanskrit',
    summary: 'The Chandaḥśāstra of Piṅgala (~2nd c. BCE) is the foundational Sanskrit treatise on prosody and metrics, the study of syllabic meters. In its eighth chapter it gives the Meru prastāra (the binomial triangle, long known in Europe as Pascal’s triangle) and the Lagakriyā (the recurrence that generates binomial coefficients ⁿCᵣ) — roughly 1800 years before Pascal. Halāyudha’s 10th-century Mṛtasañjīvanī commentary fixes and explains the construction.',
    relevance: 'The Meru prastāra (the binomial triangle = Pascal’s) and the Lagakriyā (binomial coefficients ⁿCᵣ), with Halāyudha’s commentary fixing the recurrence ⁿCᵣ = ⁿ⁻¹Cᵣ₋₁ + ⁿ⁻¹Cᵣ — ~1800 years before Pascal. The triangular-number structure behind the 28 lunar mansions (T(7)=28).',
    url: 'https://archive.org/details/chandahsutram00pinguoft',
    urlNote: 'The "Chandahsūtram" of Piṅgala with the Mṛtasañjīvanī commentary of Halāyudha (Asiatic Society of Bengal, 1874) — a complete Sanskrit facsimile incl. the Halāyudha commentary (imagecount=262), public domain.'
  },
  {
    slug: 'meeus-astronomical-algorithms',
    title: 'Astronomical Algorithms',
    author: 'Jean Meeus',
    year: '1991 / 1998',
    kind: 'book',
    lang: 'English',
    summary: 'Jean Meeus’s Astronomical Algorithms (1991, 2nd ed. 1998) is the standard practitioner’s handbook of computational astronomy. It collects the formulae for solar and lunar positions, eclipses, planetary longitudes, and the eclipse cycles (Saros, Inex, Meton) that the app’s Cycles and Saros tabs implement (via astronomy-engine).',
    relevance: 'The reference for the eclipse cycles (Saros, Inex, Meton) the Saros tab and §15b.6 / §9 use. Meeus is the standard practitioner’s handbook for the algorithmic astronomy the app relies on (via astronomy-engine).',
    url: 'https://archive.org/details/astronomicalalgorithmsjeanmeeus1991',
    urlNote: 'Complete community upload of Jean Meeus, "Astronomical Algorithms" (imagecount=435 = full book). NOTE: this is the 1991 1st edition, not the 1998 2nd edition — the 2nd ed. is not on archive.org. The 1st ed. is the complete usable Meeus for the eclipse-cycle and position formulae the app uses.'
  },
  {
    slug: 'standish-plan404',
    title: 'Standish planetary ephemeris (PLAN404)',
    author: 'E. M. Standish / JPL',
    year: '1992',
    kind: 'reference',
    lang: 'English (dataset)',
    summary: 'The JPL planetary ephemerides (Standish and successors) are the numerical tables of planetary positions produced by the Jet Propulsion Laboratory. The PLAN404 series is the long-term subset used by lightweight astronomy engines; the app computes geocentric ecliptic longitudes via astronomy-engine, which packages these series.',
    relevance: 'The underlying planetary ephemeris for the planetary longitudes. The app computes geocentric ecliptic longitudes via astronomy-engine; the planetary series trace back to JPL ephemerides of the Standish lineage.',
    url: '',
    urlNote: 'No archive.org source — a numerical dataset, not a book. Only web snapshots of the JPL Solar System Dynamics pages exist; no archive.org/details item applies.'
  },
  {
    slug: 'lahiri-ayanamsa',
    title: 'Lahiri ayanamsa (Chitrapaksha)',
    author: 'N. C. Lahiri / Calendar Reform Committee',
    year: '1955',
    kind: 'reference',
    lang: 'English',
    summary: 'The Lahiri ayanamsa (also Chitrapaksha) is the sidereal zero-point convention adopted by India’s Calendar Reform Committee in 1955 (CSIR report) and the official Indian national calendar standard since. It defines the offset (about 24.18° today) between the tropical and sidereal zodiacs, fixing the precessional-era boundaries the paper’s Ages/Ayanamsa tabs reference.',
    relevance: 'The ayanamsa the Ages/Ayanamsa tabs use (24.18° today): the sidereal zero-point convention that fixes the precessional-era boundaries. The paper dates ages by tropical sign occupation (ayanamsa-independent) but reports the Lahiri value for the sidereal frame.',
    url: 'https://archive.org/details/dli.csl.963',
    urlNote: 'Calendar Reform Committee, "Report of the Calendar Reform Committee" (CSIR, Government of India, 1955) — the complete 1955 CSIR report that defines the Lahiri (Chitrapaksha) ayanamsa (imagecount=292, Digital Library of India scan).'
  },
  {
    slug: 'jaspers-axial-age',
    title: 'Vom Ursprung und Ziel der Geschichte (The Origin and Goal of History — Axial Age)',
    author: 'Karl Jaspers',
    year: '1949',
    kind: 'book',
    lang: 'English',
    summary: 'Karl Jaspers’s Vom Ursprung und Ziel der Geschichte (1949, English: The Origin and Goal of History, 1953) introduced the "Axial Age" thesis — the ~800–200 BCE window in which several civilizations independently turned to abstract, universal thought. The paper uses this frame to contextualize the independent cross-cultural convergence of the cosmological constants (7/12/28/72/360).',
    relevance: 'The Axial Age thesis — the ~800–200 BCE window in which several civilizations independently turned to abstract, universal thought. The cross-cultural convergence of the letter/cosmology constants (7/12/28/72/360) sits in this frame.',
    url: 'https://archive.org/details/origingoalofhist0000jasp',
    urlNote: 'Karl Jaspers, "The Origin and Goal of History" (English tr. Michael Bullock, Routledge & K. Paul / Yale UP, 1953) — a complete lending/print-disabled scan (imagecount=322 = xvi + 294 pp). (The _q8t5 copy has missing pp xi–xii and was avoided.)'
  },
  {
    slug: 'jenkins-other-bible-code',
    title: 'The Other Bible Code',
    author: 'Vernon Jenkins',
    year: '1999–2010',
    kind: 'book',
    lang: 'English',
    summary: 'Vernon Jenkins’s The Other Bible Code was a self-published web study (otherbiblecode.com, 1999–2010) of the gematria of Genesis 1:1, especially the 37×73 = 2701 factorization. The paper cites it critically in §13: Jenkins’s independent study is a parallelistic source, while the paper’s own 37/73 results are tested against null distributions, not asserted from Jenkins.',
    relevance: 'The 37/73 structure of Genesis 1:1 (2701 = 37×73), cited critically in the paper. Jenkins’s independent gematria study of Genesis 1:1 is a parallelistic source; the paper’s own 37/73 results are tested against nulls, not asserted from Jenkins.',
    url: '',
    urlNote: 'No archive.org source. The Other Bible Code was web-published (otherbiblecode.com / whatabeginning.com), never issued as a book, and is not on archive.org. Cited in the paper critically, not as a primary text.'
  },
  {
    slug: 'khalifa-computer-manifests',
    title: 'The Computer Speaks: God’s Message to the World',
    author: 'Rashad Khalifa',
    year: '1982',
    kind: 'book',
    lang: 'English',
    summary: 'Rashad Khalifa (1935–1990) was an Egyptian-American biochemist who in The Computer Speaks: God’s Message to the World (1982) published a computer analysis of the Quran’s "19" pattern (the 19 of Quran 74:30), counting 114 suras and other 19-fold counts. The paper cites it for the arithmetic only, with his disputed interpretive claims flagged; it is the source of the Islamic-distinctive 19 in the Revelations/Sufi tab.',
    relevance: 'The 19-letters / 114-suras facts of the Quran (74:30 "Above it are nineteen"). Khalifa’s computer study of the Quranic 19 is the source of the Islamic-distinctive 19 cited in the Revelations/Sufi tab; the paper cites it for the arithmetic, with the disputed interpretive claims flagged.',
    url: '',
    urlNote: 'No archive.org source. "The Computer Speaks" (Islamic Productions, Tucson, 1981/82) is not on archive.org; it exists only on the author’s organization site (masjidtucson.org). Cited in the paper for the arithmetic only.'
  },
  {
    slug: 'strong-hebrew-lexicon',
    title: 'Strong Exhaustive Concordance (Hebrew & Greek dictionaries)',
    author: 'James Strong',
    year: '1890',
    kind: 'reference',
    lang: 'English / Hebrew',
    summary: 'James Strong’s Exhaustive Concordance of the Bible (1890) was the first exhaustive concordance of the King James Version, with a complete Hebrew and Chaldee dictionary and a complete Greek dictionary keyed to a numbering system (the Strong numbers) still in universal use. The OpenScriptures machine-readable lexicon the app uses is built on the public-domain 1890 original.',
    relevance: 'The 6045-consonantal-root lexicon the Reader and the gloss fiches are built on, with the biblical proper names (n-pr / n-pr-loc = persons and cities). Strong’s 1890 lexicon is the public-domain original.',
    url: 'https://archive.org/details/exhaustiveconcor1890stro',
    urlNote: 'James Strong, "The Exhaustive Concordance of the Bible" (Hunt & Eaton / Cranston & Curts, 1890, first edition) — complete (imagecount=1832 = main concordance + comparative concordance + Hebrew dictionary + Greek dictionary + front/back matter), Brigham Young University / americana scan.'
  },
  {
    slug: 'sefaria-api',
    title: 'Sefaria API (the Hebrew corpus)',
    author: 'Sefaria',
    year: 'ongoing',
    kind: 'reference',
    lang: 'English / Hebrew (API)',
    summary: 'The Sefaria API is a free REST API from Sefaria.org serving the Hebrew Tanakh and its English translations under an open license. The app fetches the consonantal Genesis corpus (1533 verses + Exodus 14:19–21) and the Bible-reference pills on the gloss and alignment fiches from it, stripping the text to consonants for the ELS and reading layers.',
    relevance: 'The Genesis corpus (1533 verses + Exodus 14:19–21, consonantal) and the Bible-reference pills on the gloss/alignment fiches are fetched via the Sefaria API. The source text is the Masoretic Hebrew; the app strips to consonants for the ELS and reading layers.',
    url: '',
    urlNote: 'No archive.org source — a live REST API (sefaria.org/api), not a published book. No archive.org item exists or applies.'
  },
  {
    slug: 'astronomy-engine',
    title: 'astronomy-engine',
    author: 'Don Rowell (cosinekitty)',
    year: 'ongoing',
    kind: 'reference',
    lang: 'English (software)',
    summary: 'astronomy-engine is an open-source ephemerides library (MIT license, by cosinekitty / Don Rowell) computing real geocentric ecliptic longitudes of the seven classical bodies — Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn — for any historical date including BCE. The app vendors v2.1.19 and computes every reading from it (GeoVector → Ecliptic longitude, tropical signs floor(lon/30)%12).',
    relevance: 'Real geocentric ecliptic longitudes of the 7 classical bodies (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn) for any date, BCE included — the astronomy the whole reading is computed from. Vendored at v2.1.19 (MIT).',
    url: '',
    urlNote: 'No archive.org source — open-source software (MIT) hosted in its repository, not a book. No archive.org item exists or applies.'
  },
  {
    slug: 'nag-hammadi-library',
    title: 'The Nag Hammadi Library in English',
    author: 'James M. Robinson (ed.)',
    year: '1977',
    kind: 'book',
    lang: 'English',
    summary: 'The Nag Hammadi Library is the cache of 45 Gnostic Christian texts in 4th-century Coptic, discovered in 1945 buried in a sealed jar near Nag Hammadi, Egypt. James M. Robinson’s "Nag Hammadi Library in English" (1977, revised 1988/1996) is the standard complete English edition of the whole corpus, including the Gospel of Thomas, the Gospel of Philip, the Apocryphon of John, and the Apocalypse of Adam. The 1977 first edition archived here is the complete corpus (xv+493 pp).',
    relevance: 'The complete Gnostic corpus: 45 tractates in Coptic, including the Apocalypse of Adam whose 13th kingdom ("every birth of their ruler is a word") is the project’s framing source (§1). The complete corpus contextualizes the Apocalypse of Adam among the creator-word / letter-theology texts and supplies the 13 false oracles + the 14th kingless generation that speaks the truth.',
    url: 'https://archive.org/details/naghammadilibrar0000unse_y4x7',
    urlNote: 'Robinson (ed.), "The Nag Hammadi Library in English" (Harper & Row, 1977 1st ed., xv+493 pp, ISBN 0060669292) — a complete lending/print-disabled scan (imagecount=522). Completeness confirmed via the metadata TOC: all 45 tractates present incl. Apocryphon of John, Gospel of Thomas, Gospel of Philip, Apocalypse of Adam, plus BG 8502 (Gospel of Mary, Act of Peter). Access-restricted (IA controlled lending). A backup complete copy is at archive.org/details/naghammadilibrar0000unse_k3v2 (1988 revised ed., xiv+549 pp).'
  }
];

// slug → book entry, for the client-side /library/<slug> lookup.
const _BY_SLUG = new Map(LIBRARY_BOOKS.map((b) => [b.slug, b]));
export function bookBySlug(slug){ return _BY_SLUG.get(slug); }