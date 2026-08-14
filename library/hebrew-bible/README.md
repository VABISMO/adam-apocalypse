# Hebrew Bible — Masoretic Text (Westminster Leningrad Codex), machine-readable

This is the **Open Scriptures Hebrew Bible (OSHB)** text of the Westminster
Leningrad Codex (WLC): the full consonantal Hebrew Bible with vowels and
cantillation marks, plus lemma and morphology attributes, in OSIS XML — one
file per book.

## Source

- GitHub: https://github.com/openscriptures/morphhb (directory `wlc/`)
- Raw files: https://raw.githubusercontent.com/openscriptures/morphhb/master/wlc/<Book>.xml

## License

- The **WLC text** is in the **Public Domain** (CC0).
- The **lemma/morphism data** is **CC BY 4.0**. Attribution:
  "Original work of the Open Scriptures Hebrew Bible available at
  https://github.com/openscriptures/morphhb"

## Format

OSIS XML, UTF-8, one file per biblical book. Each `<w>` word element carries:
- `lemma` — Strong's-style number (e.g. `b/7225`)
- `morph` — morphology code (e.g. `HR/Ncfsa`)
- `id` — unique immutable word id
- the element text is the full pointed Hebrew (consonants + vowels + accents)

## Files (39 books + VerseMap = 40 XML files)

Torah (5): Gen, Exod, Lev, Num, Deut
Nevi'im Rishonim (4): Josh, Judg, 1Sam, 2Sam, 1Kgs, 2Kgs
Nevi'im Aharonim (4): Isa, Jer, Ezek, Hos, Joel, Amos, Obad, Jonah, Mic, Nah, Hab, Zeph, Hag, Zech, Mal
Ketuvim (11): Ps, Prov, Job, Song, Ruth, Lam, Eccl, Esth, Dan, Ezra, Neh, 1Chr, 2Chr

(All 39 books of the Hebrew Bible are present, covering the full Tanakh
Genesis → 2 Chronicles.)

## Completeness verification

- **39/39 books present** (Gen.xml … Mal.xml), plus VerseMap.xml.
- **Genesis 1:1** verified present and correct:
  `בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ` (7 words, pointed).
- **2 Chronicles ends at 36:23** — the final verse of the Tanakh in the
  Hebrew ordering (822 verses in 2Chr, matching the canonical count).

## Total size

~27 MB across 40 XML files.