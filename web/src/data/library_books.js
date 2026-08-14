// data/library_books.js — the Luco Library bibliography.
// One entry per source in the paper "The Alphabet from the Sky" §12.2. Each ficha links
// to a COMPLETE English translation of the primary text (archive.org preferred) where one
// is freely available; modern copyrighted critical editions link to the publisher /
// WorldCat / lending library with an honest urlNote that no free complete edition exists.
//
// URLs verified 2026-08-14 via archive.org / Wikisource / Wellcome Collection / Sefaria /
// gnosis.org / JPL / publisher & WorldCat listings.
//
// `kind` — 'book' (a primary text or monograph) | 'reference' (a dataset, API, lexicon,
//           software, or technical ephemeris — not a single bound book).
// `lang` — the language of the linked edition (English where a free complete English
//          translation exists; otherwise the original language / facsimile).
// `url`  — the best free complete edition. `urlNote` — what it is + caveats.
export const LIBRARY_BOOKS = [
  {
    slug: 'sefer-yetzirah',
    title: 'Sefer Yetzirah (Book of Formation)',
    author: 'Anonymous (ed. A. Hayman 2004; trans. A. Kaplan 1990)',
    year: '~200–900 CE',
    kind: 'book',
    lang: 'English',
    desc: 'The frame text of this whole project: 3 mothers / 7 doubles / 12 simples; the letter↔luminary mapping; the 231 gates = C(22,2); AB+BA = ABBA. Commonly dated ~200–900 CE. The 22 letters, the 7 planets and the 12 zodiac signs are the apparatus the Reader computes.',
    url: 'https://archive.org/details/sepheryetzirahb00rittgoog',
    urlNote: 'W. W. Westcott’s 1893 public-domain translation (Sepher Yetzirah, from the Rittangelius 1642 Hebrew text + the 32 Paths of Wisdom) — a complete English edition on archive.org. The modern critical editions cited in the paper (Hayman 2004, Kaplan 1990) are copyrighted and have no free complete edition.'
  },
  {
    slug: 'sefer-raziel',
    title: 'Sefer Raziel HaMalakh (Book of the Angel Raziel)',
    author: 'Anonymous (ed. M. Margalioth)',
    year: 'medieval',
    kind: 'book',
    lang: 'Hebrew / Spanish',
    desc: 'The older sibling of the Sefer Yetzirah in this register: a medieval treatise on letter permutation and the construction of names/angels. Decimal gematria א=1…ת=400 (p. 95); triangulars T(2..9); 12 letters↔12 signs; 72 from Genesis 1:1; 73 names of God (p. 72); 28 Malachim/month; fixed zodiac; the Book of the Vestments (275 angel names, 4 seasons); “calculate the planets and the signs… to see the generations” (pp. 143–144).',
    url: 'https://commons.wikimedia.org/wiki/File:Sefer_Raziel_HaMalakh._18th_century.pdf',
    urlNote: 'No complete English translation of the Sefer Raziel HaMalakh is freely available. Linked is a free Hebrew facsimile (18th-c. manuscript, public domain). Note: the archive.org “Margalioth” item is Sefer ha-Razim, a different text — not the Sefer Raziel. The English reception runs through the academic articles listed below (Idel / Rebiger).'
  },
  {
    slug: 'saadia-commentary-sefer-yetzirah',
    title: 'Commentary on the Sefer Yetzirah',
    author: 'Saadia Gaon',
    year: 'c. 931 CE',
    kind: 'book',
    lang: 'Hebrew / Arabic',
    desc: 'The first explicit assignment of the 7 doubles → 7 planets (geocentric order) and the 12 simples → 12 signs — the mapping the Reader implements. Saadia’s commentary is the earliest systematic reading of the Sefer Yetzirah as a literal letter-astronomy.',
    url: 'https://hdl.handle.net/2027/hvd.32044012602587',
    urlNote: 'No free complete English translation. Linked is the HathiTrust scan of Mayer Lambert’s 1891 critical edition (Arabic text in Hebrew characters + French translation). English excerpts (Thompson & Marson 1985) circulate online; the Hebrew text is on Sefaria (Rasag on Sefer Yetzirah).'
  },
  {
    slug: 'ibn-ezra-sefer-ha-shem',
    title: 'Sefer ha-Shem / Sefer ha-Olam / Reshit Hokhmah',
    author: 'Abraham ibn Ezra',
    year: '1147–1148',
    kind: 'book',
    lang: 'Hebrew',
    desc: 'Ibn Ezra’s Hebrew treatises on the gematria of the Tetragrammaton and on astronomy/astrology — the mazzalot, the 28 lunar mansions, and precession/trepidation. The 28-mansion and precession anchors in the paper’s eclipse mnemonics (§9) trace here.',
    url: 'https://www.deutsche-digitale-bibliothek.de/item/7I5V3ZVMIPHNC4XGXJEPXQCZXCE6UKUL',
    urlNote: 'No free complete English translation. Linked is a Hebrew facsimile of the 1834 Fürth edition of Sefer ha-Shem (Deutsche Digitale Bibliothek / Bayerische Staatsbibliothek). Ibn Ezra’s astronomical works circulate in Hebrew; consult a research library for critical editions.'
  },
  {
    slug: 'abulafia-tzerufim',
    title: 'Chayei Ha-Olam Ha-Ba / Or Ha-Sekhel',
    author: 'Abraham Abulafia',
    year: '13th c.',
    kind: 'book',
    lang: 'Hebrew',
    desc: 'The prophetic combination of letters (tzerufim) — Abulafia’s ecstatic kabbalah of permuting the divine letters to reach prophecy. The tzerufim tradition is one of the documented-construction sources for the letter-permutation reading (§2). See also Idel, M., The Mystical Experience in Abraham Abulafia.',
    url: 'https://he.wikisource.org/wiki/%D7%A1%D7%A4%D7%A8_%D7%97%D7%99%D7%99_%D7%94%D7%A2%D7%95%D7%9C%D7%9D_%D7%94%D7%91%D7%90',
    urlNote: 'No free complete English translation of Abulafia’s Hebrew prophetic works. Linked is the full Hebrew text of Chayei ha-Olam ha-Ba on Hebrew Wikisource (also a PDF at HebrewBooks.org, Jerusalem 2001 ed.). Moshe Idel’s studies (copyrighted) are the English reception; consult a research library for the Hebrew texts.'
  },
  {
    slug: 'shem-ha-mephorash',
    title: 'Shem HaMephorash (Name of 72)',
    author: 'Tradition (Bahir, Zohar, Abulafia)',
    year: 'medieval',
    kind: 'book',
    lang: 'Hebrew',
    desc: 'The 72 triplets of Exodus 14:19–21 — the Shem HaMephorash that the app extracts (triplets[i] = v19[i] + v20[71−i] + v21[i]) and decorates with the -El / -Yah suffixes. The tradition runs through the Bahir, the Zohar, and Abulafia; the app’s mechanical extraction is medieval (Rashi, 11th c.).',
    url: 'https://www.sefaria.org/Sefer_HaBahir',
    urlNote: 'The Shem HaMephorash is not a single book but a tradition across the Bahir, Zohar and Abulafia. Linked is the free English Sefer HaBahir on Sefaria, which carries the Name-of-72 material; the Zohar (Sefaria English) is the other main witness.'
  },
  {
    slug: 'al-buni-shams-al-maarif',
    title: 'Shams al-Maʿārif',
    author: 'Ahmad al-Buni',
    year: '13th c.',
    kind: 'book',
    lang: 'Arabic',
    desc: 'Magic squares, the 99 Names, and the abjad isopsephy — the Islamic analogue of practical Kabbalah. The 28-letter ↔ 28-lunar-mansion correspondence (the Sufi / Arabic parallel of the letter↔star map) is received through this tradition. Cited in the paper as “received Shams al-kubra” (pseudepigraphic Ottoman compilation, not by al-Buni himself).',
    url: 'https://archive.org/details/al-buni',
    urlNote: 'The Shams al-Maʿārif al-Kubrā circulates in Arabic; no free complete English translation exists (partial English: Inloes 2022, copyrighted). Linked is the best available free Arabic facsimile, with a scholarly Spanish introduction (Coullaut Cordero 2009). Note the authorship caveat in the paper: the famous received compilation is pseudepigraphic.'
  },
  {
    slug: 'ibn-arabi-futuhat',
    title: 'Futūḥāt al-Makkiyya (Meccan Revelations), ch. 198',
    author: 'Muhyiddin Ibn ʿArabī',
    year: '13th c.',
    kind: 'book',
    lang: 'Arabic',
    desc: 'The Sufi parallel of the letter↔star correspondence: 28 Arabic letters ↔ 28 lunar mansions ↔ 7 planets (Futūḥāt ch. 198). Ibn ʿArabī maps the 14 luminous (undotted) letters to the 14 waxing phases and the 14 dark to the 14 waning — a complete lunar-letter isomorphism independent of the Hebrew tradition.',
    url: 'https://archive.org/details/Al-FutuhatAl-makkiya',
    urlNote: 'No free complete English translation of the Futūḥāt (~10,000 pages). Linked is the complete Arabic text (Bulaq edition, 4 vols, 1852) on archive.org. The ch. 198 letter-mansion material is partially translated in academic studies (Chodkiewicz, Morris; copyrighted). Consult the Ibn ʿArabī Society for the English reception.'
  },
  {
    slug: 'agrippa-occulta-philosophia',
    title: 'De occulta philosophia (Three Books of Occult Philosophy), Book III',
    author: 'Heinrich Cornelius Agrippa von Nettesheim',
    year: '1531/33',
    kind: 'book',
    lang: 'English',
    desc: 'The first attestation of the sigil-on-kamea method and of the Aiq Bekar table in Christian-Renaissance Kabbalah. The paper’s sigil forge (§6.3 / §15b.3) is documented as Renaissance (Agrippa, 1531), not medieval Jewish — Agrippa is the citation for that boundary.',
    url: 'https://en.wikisource.org/wiki/File:Three_Books_of_Occult_Philosophy_(De_Occulta_Philosophia)_(1651).djvu',
    urlNote: 'The complete 1651 English translation by “J.F.” (Three Books of Occult Philosophy) — public domain. The 1651 facsimile is on Wikisource (linked) and the Wellcome Collection; the archive.org items are the 1993 Tyson modern edition, not the 1651 facsimile. Book III carries the sigil-kamea and Aiq Bekar material cited in the paper.'
  },
  {
    slug: 'gaffarel-unheard-curiosities',
    title: 'Unheard-of Curiosities',
    author: 'Jacques Gaffarel (Eng. trans. Edmund Chilmead)',
    year: '1650',
    kind: 'book',
    lang: 'English',
    desc: 'The Persian magi read the heavens as a text of Hebrew letters; the stars are ranged in the heavens “in the form of Hebrew letters,” and the sky is a book (Isa 34:4). The ethnographic attestation of the stellar-alphabet reading as a living practice — the closest historical witness to what this app does. Reading instrument = the 3 Cabala: Gematria / Notaricon / Temurah.',
    url: 'https://archive.org/details/b30333817',
    urlNote: 'The 1650 Chilmead English translation (Curiositez inouyes, Paris 1629 → Unheard-of Curiosities, London 1650) — archive.org b30333817 is the complete English edition cited in the paper (public domain, Wellcome Library scan).'
  },
  {
    slug: 'idel-raziel-conduit',
    title: 'Sefer Razi’el ha-Mal’akh — A Conduit of Medieval Ashkenazi Culture',
    author: 'Moshe Idel (Aschkenas 34/2, 2024); Bernd Rebiger (FJB 32, 2005)',
    year: '2005–2024',
    kind: 'book',
    lang: 'English / German',
    desc: 'The modern academic reception of the Sefer Raziel: Idel’s article on Raziel as a conduit of medieval Ashkenazi culture, and Rebiger’s redaction-history study. These are the scholarly anchors for treating the Raziel as a late-antique/early-medieval letter-astronomy manual (not a Renaissance fabrication).',
    url: 'https://www.degruyter.com/document/doi/10.1515/asch-2024-2017/pdf?licenseType=open-access',
    urlNote: 'Idel’s “Sefer Razi’el ha-Mal’akh — A Conduit of Medieval Ashkenazi Culture” (Aschkenas 34/2, 2024) — open access (CC-BY 4.0), full PDF free from De Gruyter (linked). Rebiger’s FJB 32 (2005) redaction-history study is not freely available; consult the journal or a research library.'
  },
  {
    slug: 'book-of-the-luminaries',
    title: 'Book of the Luminaries (1 Enoch 72–82)',
    author: 'Anonymous (1 Enoch)',
    year: '~3rd c. BCE – 1st c. CE',
    kind: 'book',
    lang: 'English',
    desc: 'The calendrical substrate and the sky-as-text image: a 364-day year (72:32; 74:12; 82:6), twelve gates of the sun (ch. 72), 360 days (82:11), stars that transgress (80:6–7), heavenly tablets (81:1–2; 93; 103; 108). Broader than Qumran (attested at Masada, terminus ante quem 73 CE). Neugebauer’s Astronomical Chapters of the Book of Enoch (1981) is the technical commentary.',
    url: 'https://archive.org/details/bookofenochor1en00char',
    urlNote: 'The Book of the Luminaries = 1 Enoch chs. 72–82, included in the complete 1 Enoch (R. H. Charles 1917, public domain) linked here. Neugebauer’s 1981 monograph on the astronomical chapters is copyrighted (Brill).'
  },
  {
    slug: '1-enoch',
    title: '1 Enoch (Ethiopic Enoch)',
    author: 'Anonymous (trans. R. H. Charles 1917)',
    year: '~3rd c. BCE – 1st c. CE',
    kind: 'book',
    lang: 'English',
    desc: 'The 364-day calendar and Enochic astronomy (§13): the Book of the Luminaries, the heavenly tablets, the Watchers. The Charles 1917 translation is the free public-domain English edition; Nickelsburg & VanderKam (Hermeneia, 2012) and Ben-Dov, Head of All Years (Brill, 2008) are the modern copyrighted critical editions.',
    url: 'https://archive.org/details/bookofenochor1en00char',
    urlNote: 'R. H. Charles, The Book of Enoch (1917) — a complete public-domain English translation on archive.org. The modern critical editions (Nickelsburg/VanderKam 2012, Ben-Dov 2008) are copyrighted (Hermeneia / Brill).'
  },
  {
    slug: '2-enoch',
    title: '2 Enoch (Slavonic Enoch / Book of the Secrets of Enoch)',
    author: 'Anonymous (trans. W. R. Morfill & R. H. Charles)',
    year: '~1st c. CE',
    kind: 'book',
    lang: 'English',
    desc: 'Enoch’s 365 years (2 Enoch 1:2; cf. Gen 5:23, Philo De post. Caini) — the 365-day echo in the Enochic literature. The Slavonic Enoch is the late-antique apocalyptic text carrying the solar-year motif alongside the 364-day calendar of 1 Enoch.',
    url: 'https://archive.org/details/bookofsecretsofe00morf',
    urlNote: 'The Morfill & Charles 1896 English translation (The Book of the Secrets of Enoch) — public domain, the free complete English edition on archive.org. Also in Charles’s Apocrypha and Pseudepigrapha of the Old Testament.'
  },
  {
    slug: '3-enoch-odeberg',
    title: '3 Enoch (Hebrew Enoch)',
    author: 'Anonymous (trans. Hugo Odeberg 1928)',
    year: '~5th–10th c. CE',
    kind: 'book',
    lang: 'English',
    desc: 'Creation by letters including “the planets and the constellations” (13:1); Metatron the “lesser YHWH” and the seventy names. The Hebrew Enoch is the merkabah-stratum text carrying the creator-letter theology and the 70-name motif (§13).',
    url: 'https://archive.org/details/ksigaxiienochorthehebrewbookofenoch_202012',
    urlNote: 'Hugo Odeberg’s 1928 edition (3 Enoch, or the Hebrew Book of Enoch) — English translation + Hebrew text + commentary, public domain (1928+95=2023). The complete edition on archive.org (linked); otherwise in print from Ktav / Bloch.'
  },
  {
    slug: 'apocalypse-of-adam',
    title: 'Apocalypse of Adam',
    author: 'Anonymous (Nag Hammadi V,5; trans. G. W. MacRae)',
    year: '~1st–2nd c. CE',
    kind: 'book',
    lang: 'English',
    desc: 'The thirteenth kingdom: “every birth of their ruler is a word” — the closest the Nag Hammadi corpus comes to the creator-word / Sefer Yetzirah letter-theology, and the source of the project’s framing (§1). The 13 false oracles + the 14th kingless generation that speaks the truth.',
    url: 'http://gnosis.org/naghamm/adam.html',
    urlNote: 'The Apocalypse of Adam (NHC V,5) is in Robinson’s Nag Hammadi Library in English (copyrighted, 4th ed. 1996). A free complete English translation by George W. MacRae is hosted at gnosis.org (linked); the Barnstone translation is also there.'
  },
  {
    slug: 'aleppo-leningrad-codex',
    title: 'Aleppo Codex & Leningrad Codex (the Masoretic Text)',
    author: 'Masoretic scribes',
    year: '920 & 1008/9 CE',
    kind: 'book',
    lang: 'Hebrew (facsimile)',
    desc: 'The Masoretic (MT) base of the consonantal count of Exodus 14:19–21 — the 216 letters whose 72 triplets the Shem HaMephorash reads. The Aleppo Codex (c. 920) and the Leningrad Codex (1008/9) are the two authoritative MT manuscripts; the app’s lexicon and Genesis corpus are built on this consonantal base.',
    url: 'https://archive.org/details/Leningrad_Codex_Color_Images',
    urlNote: 'Facsimiles of both codices are freely available on archive.org: the Leningrad Codex color images (linked, 921 pp, the oldest complete Hebrew Bible, basis of BHS/BHQ) and the Aleppo Codex (archive.org/details/Aleppo_Codex, c. 920, many Torah pages lost in 1947). These are Hebrew manuscripts — the source text itself, no English translation.'
  },
  {
    slug: 'yeivin-tiberian-masorah',
    title: 'Introduction to the Tiberian Masorah',
    author: 'Israel Yeivin',
    year: '1980',
    kind: 'book',
    lang: 'English',
    desc: 'The Masoretic count of letters/words/verses — the central word darosh darash (Lev 10:16) — and the apparatus that preserved the consonantal text the app reads. Yeivin is the standard English handbook of the Tiberian Masorah.',
    url: 'https://search.worldcat.org/title/5750606',
    urlNote: 'Copyrighted (SBL / Scholars Press, 1980). No free complete edition — the link is the WorldCat record for the printed book. Consult a research library for the physical copy.'
  },
  {
    slug: 'domination-codex',
    title: 'Domination Codex',
    author: '—',
    year: '—',
    kind: 'book',
    lang: '—',
    desc: 'A hermeneutical source cited in §6.3 of the paper: the same 231 / ABBA / Abulafia arithmetic, but with no null tests. Cited critically — not as an independent corroborating witness — because it carries the letter arithmetic without the statistical controls this project applies.',
    url: '',
    urlNote: 'Obscure / hermeneutical source. No free online edition is currently linked; cited in the paper as a parallelistic source, not a primary text.'
  },
  {
    slug: 'tenen-meru',
    title: 'The Alphabet That Changed the World',
    author: 'Stan Tenen (MERU Foundation)',
    year: '2011',
    kind: 'book',
    lang: 'English',
    desc: 'A self-published geometric treatment of the Genesis 1:1 letter sequence: a base-3 mirror-pairing into a 7-turn toroidal pattern, independent of gematria and astronomy. Cited as a convergent but non-peer-reviewed parallelistic source — a different route to the same Genesis-1:1 structure, not an independent corroborating witness.',
    url: 'https://www.meru.org/',
    urlNote: 'Copyrighted (North Atlantic Books, 2011). No free complete edition. The MERU Foundation site (meru.org) carries the project’s free research writings, lecture videos and graphics; the printed book is available from the publisher.'
  },
  {
    slug: 'pingala-chandahsastra',
    title: 'Chandaḥśāstra',
    author: 'Piṅgala (comm. Halāyudha, 10th c.)',
    year: 'c. 2nd c. BCE',
    kind: 'book',
    lang: 'English / Sanskrit',
    desc: 'The Meru prastāra (the binomial triangle = Pascal’s) and the Lagakriyā (binomial coefficients ⁿCᵣ), with Halāyudha’s 10th-c. Mṛtasañjīvanī commentary fixing the triangular construction and the recurrence ⁿCᵣ = ⁿ⁻¹Cᵣ₋₁ + ⁿ⁻¹Cᵣ — ~1800 years before Pascal. The triangular-number structure behind the 28 lunar mansions (T(7)=28).',
    url: 'https://www.indica.today/quick-reads/pingalas-algorithm-meru-prastaar/',
    urlNote: 'Not a single archive.org book. The Meru prastāra (binomial triangle) and the Lagakriyā (binomial coefficients) are explained in English at the linked Indica Today article; the University of Hyderabad “Algorithms in Ancient India” PDF also carries the Sanskrit + Halāyudha commentary material.'
  },
  {
    slug: 'meeus-astronomical-algorithms',
    title: 'Astronomical Algorithms (2nd ed.)',
    author: 'Jean Meeus',
    year: '1998',
    kind: 'book',
    lang: 'English',
    desc: 'The reference for the eclipse cycles (Saros, Inex, Meton) the Saros tab and §15b.6 / §9 use. Meeus is the standard practitioner’s handbook for the algorithmic astronomy the app relies on (via astronomy-engine).',
    url: 'https://www.amazon.com/dp/0943396611',
    urlNote: 'Copyrighted (Willmann-Bell, 1998). No free complete edition — the link is the publisher listing for the 2nd edition. Open-source algorithm implementations (PyMeeus, Naughter C++) exist, but the book itself is not free.'
  },
  {
    slug: 'standish-plan404',
    title: 'Standish planetary ephemeris (PLAN404)',
    author: 'E. M. Standish / JPL',
    year: '1992',
    kind: 'reference',
    lang: 'English (dataset)',
    desc: 'The underlying planetary ephemeris for the planetary longitudes. The app computes geocentric ecliptic longitudes via astronomy-engine; the planetary series trace back to JPL ephemerides of the Standish lineage.',
    url: 'https://ssd.jpl.nasa.gov/planets/approx_pos.html',
    urlNote: 'A technical ephemeris dataset (JPL/Caltech), not a book. The JPL Solar System Dynamics site hosts the ephemerides (Approximate Positions of the Planets, linked); astronomy-engine packages a subset. High-precision SPK files at ssd.jpl.nasa.gov/ephem.html.'
  },
  {
    slug: 'lahiri-ayanamsa',
    title: 'Lahiri ayanamsa (Chitrapaksha)',
    author: 'N. C. Lahiri',
    year: '1955',
    kind: 'reference',
    lang: 'English (standard)',
    desc: 'The ayanamsa the Ages/Ayanamsa tabs use (24.18° today): the sidereal zero-point convention that fixes the precessional-era boundaries. The paper dates ages by tropical sign occupation (ayanamsa-independent) but reports the Lahiri value for the sidereal frame.',
    url: 'https://archive.org/details/HistoryOfCalendarPanchangaCommittee',
    urlNote: 'A calendrical standard, not a single book. The Lahiri (Chitrapaksha) ayanamsa was adopted in the Calendar Reform Committee Report (Saha & Lahiri, CSIR, 1955) — free PDF on archive.org (linked). The Indian Astronomical Ephhemeris (using Lahiri) is published annually with free PDFs from the IMD.'
  },
  {
    slug: 'jaspers-axial-age',
    title: 'Vom Ursprung und Ziel der Geschichte (The Origin and Goal of History — Axial Age)',
    author: 'Karl Jaspers',
    year: '1949',
    kind: 'book',
    lang: 'English / German',
    desc: 'The Axial Age thesis — the ~800–200 BCE window in which several civilizations independently turned to abstract, universal thought. The cross-cultural convergence of the letter/cosmology constants (7/12/28/72/360) sits in this frame.',
    url: 'https://archive.org/details/origingoalofhist0000jasp_q8t5',
    urlNote: 'Copyrighted (Yale UP / Routledge & Kegan Paul, 1953 English ed.). No free complete edition — the archive.org scan is lending/print-disabled only; the link is the Internet Archive catalog record for borrowing the physical book.'
  },
  {
    slug: 'jenkins-other-bible-code',
    title: 'The Other Bible Code',
    author: 'Vernon Jenkins',
    year: '1999–2010',
    kind: 'book',
    lang: 'English',
    desc: 'The 37/73 structure of Genesis 1:1 (2701 = 37×73), cited critically in the paper. Jenkins’s independent gematria study of Genesis 1:1 is a parallelistic source; the paper’s own 37/73 results are tested against nulls, not asserted from Jenkins.',
    url: 'https://www.creation.xtn.co/zzz/other-bible-code/',
    urlNote: 'Self-published on the web (not a formally published book). Jenkins’s “Other Bible Code” — the 37×73 = 2701 structure of Genesis 1:1 — is freely readable at the link. Cited critically in the paper, not as a primary text.'
  },
  {
    slug: 'khalifa-computer-manifests',
    title: 'The Computer Speaks: God’s Message to the World',
    author: 'Rashad Khalifa',
    year: '1982',
    kind: 'book',
    lang: 'English',
    desc: 'The 19-letters / 114-suras facts of the Quran (74:30 “Above it are nineteen”). Khalifa’s computer study of the Quranic 19 is the source of the Islamic-distinctive 19 cited in the Revelations/Sufi tab; the paper cites it for the arithmetic, with the disputed interpretive claims flagged.',
    url: 'https://docs.quraniclabs.com/library/books/the-computer-speaks.pdf',
    urlNote: 'The Computer Speaks: God’s Message to the World (Islamic Productions, Tucson, 1982) — Khalifa’s computer study of the Quranic 19. Distributed free by the Submitters community (linked PDF). Cited in the paper for the arithmetic, with the disputed interpretive claims flagged.'
  },
  {
    slug: 'strong-hebrew-lexicon',
    title: 'Strong Hebrew Lexicon (OpenScriptures)',
    author: 'James Strong / OpenScriptures',
    year: '1890 / ongoing',
    kind: 'reference',
    lang: 'English / Hebrew (dataset)',
    desc: 'The 6045-consonantal-root lexicon the Reader and the gloss fiches are built on, with the biblical proper names (n-pr / n-pr-loc = persons and cities). The OpenScriptures GitHub version is the machine-readable base; Strong’s 1890 lexicon is the public-domain original.',
    url: 'https://github.com/openscriptures/HebrewLexicon',
    urlNote: 'OpenScriptures HebrewLexicon on GitHub (the machine-readable base the app uses, open license) — linked. The 1890 Strong’s Exhaustive Concordance (public domain, with the full Hebrew/Chaldee + Greek dictionaries) is also on archive.org as the printed original.'
  },
  {
    slug: 'sefaria-api',
    title: 'Sefaria API (the Hebrew corpus)',
    author: 'Sefaria',
    year: 'ongoing',
    kind: 'reference',
    lang: 'English / Hebrew (API)',
    desc: 'The Genesis corpus (1533 verses + Exodus 14:19–21, consonantal) and the Bible-reference pills on the gloss/alignment fiches are fetched via the Sefaria API. The source text is the Masoretic Hebrew; the app strips to consonants for the ELS and reading layers.',
    url: 'https://www.sefaria.org/api',
    urlNote: 'A free open API (Sefaria.org) — not a book. The API serves the Hebrew Tanakh and English translations under an open license; the app fetches the consonantal text and name references from it.'
  },
  {
    slug: 'astronomy-engine',
    title: 'astronomy-engine',
    author: 'Don Rowell (cosinekitty)',
    year: 'ongoing',
    kind: 'reference',
    lang: 'English (software)',
    desc: 'The ephemerides engine: real geocentric ecliptic longitudes of the 7 classical bodies (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn) for any date, BCE included — the astronomy the whole reading is computed from. Vendored at v2.1.19 (MIT).',
    url: 'https://github.com/cosinekitty/astronomy-engine',
    urlNote: 'Open-source (MIT) on GitHub by cosinekitty (Don Rowell). The app vendors v2.1.19; the reading uses GeoVector → Ecliptic.elon at noon UT, with tropical signs floor(lon/30)%12.'
  }
];

// slug → book entry, for the client-side /library/<slug> lookup.
const _BY_SLUG = new Map(LIBRARY_BOOKS.map((b) => [b.slug, b]));
export function bookBySlug(slug){ return _BY_SLUG.get(slug); }