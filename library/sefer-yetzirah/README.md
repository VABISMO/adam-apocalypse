# library/sefer-yetzirah — Nachmanides (Ramban of Gerona) commentary on Sefer Yetzirah

This folder holds the **Ramban (Nachmanides) commentary on Sefer Yetzirah**, the version
whose commentaries are most closely aligned with this project's work — the Girona kabbalist
Moses ben Nachman (c.1194–1270) reading the Sefer Yetzirah's letter/element/sefirot
correspondences in light of his own kabbalistic system (Ein-Sof → Keter → Ḥokhmah → the
32 paths and 22 letters).

## Source

- **Sefaria** — "Ramban on Sefer Yetzirah"
  - Reader: https://www.sefaria.org/Ramban_on_Sefer_Yetzirah
  - Edition: **Warsaw 1884** (Ramban on Sefer Yetzirah, ורשה תרמ"ד), **Public Domain**.
  - Source scan: https://www.nli.org.il/he/books/NNL_ALEPH001310968
  - Author: Moses ben Nachman (Ramban), Gerona c.1194–1270.
  - Composed c.1225–1265 CE. Sefaria records the attribution as debated — see
    R' C.D. Chavel, *Kitvei Ramban* Vol. 2 p.451; Scholem and Jellinek link the long
    recension to the **Girona school** (possibly 'Ezra or 'Azriel of Gerona), which is
    exactly the Catalan-kabbalah milieu central to this project (Ramon Llull, Moses de León).

## Files

- `ramban_on_sefer_yetzirah.v3.json` — raw Sefaria v3 API response (full nested text).
- `ramban_index.json` — Sefaria index metadata (schema, categories, description).
- `ramban_on_sefer_yetzirah.he.txt` — **clean Hebrew commentary**, one block per
  comment. `«...»` marks the *dibur hamatchil* — the exact Sefer Yetzirah lemma being
  glossed — so the link between base-text verse and Nachmanides' reading is explicit.
  Structure: 3 chapters / 28 mishnayot / 105 comments.
- `sefer_yetzirah_base.v3.json` — raw base Sefer Yetzirah text (Sefaria v3).
- `sefer_yetzirah_base_index.json` — base-text index metadata.
- `sefer_yetzirah_base.txt` — base Sefer Yetzirah, Hebrew (primary) + English
  translation where Sefaria provides a public one, per mishnah. Included so the
  commentary's lemmas are readable in context.

## Why this version

Per the project brief: the Nachmanides commentary is the Sefer Yetzirah edition whose
commentaries relate most directly to the stellar-letter / 22-letter / 32-path framework
the project builds on. The Hebrew Warsaw 1884 edition is the public-domain text; recent
scholarly English translations are under copyright and are not reproduced here.

Fetched 2026-08-12 by `/tmp/build_sefer_yetzirah.mjs` from
the Sefaria API (one request per resource, descriptive User-Agent).
