# paper/parts/ — the paper, split into per-heading fragments

The academic paper `paper/index.html` (~300 KB, one file) is now authored as
**fragment files** in this directory — one file per `<h2>`/`<h3>` heading, plus
`00-preamble.html` (the `<head>` + `<style>` + opening `<body>`, everything
before `<h2>Abstract</h2>`).

The split is at the **byte level** (every `<h2`/`<h3` tag starts a new fragment),
so the large single-line sections (e.g. §15c, which was one ~150 KB line) are
also split cleanly into 15c-1 … 15c-12.

## How to edit

1. Edit one fragment file here (e.g. `42-15c-2-los-7-sellos-y-las-7-trompetas-letra-y-voz.html`).
2. Reassemble: `node scripts/build_paper.mjs` → regenerates `paper/index.html`
   from the fragments (in `manifest.json` order).
3. `build_paper.mjs` verifies the output against `paper/index.html.bak` if present,
   and refuses to write a divergent build (it exits non-zero). So a build that
   silently breaks the paper is impossible.

## Files

- `00-preamble.html` … `60-referencias.html` — the fragments, in document order.
- `manifest.json` — the ordered list of fragment filenames. **Order is authoritative.**
  To add a new section, insert its filename at the right position here and `build_paper.mjs`
  will place it there.
- `../index.html` — the reassembled paper (the deployed artifact; `prerender.cjs`
  copies it to `web/paper/index.html` at deploy time). Tracked in git; rebuild before commit.

## Scripts (gitignored under `scripts/`, run from repo root)

- `scripts/split_paper.mjs` — (re)split `paper/index.html` into fragments. Idempotent:
  re-running overwrites the fragment files and verifies byte-identical reassembly.
  Use only if you want to regenerate the fragments from the single file (e.g. after a
  bulk edit to `index.html`).
- `scripts/build_paper.mjs` — reassemble `paper/index.html` from fragments. **This is
  the day-to-day command.** Run it after any fragment edit, then commit both the
  changed fragment(s) and the regenerated `paper/index.html`.

## Nothing breaks

The split was verified byte-identical: `build_paper.mjs` reproduces `paper/index.html`
to the exact byte (301 520 bytes). The deploy pipeline (`prerender.cjs` copies
`paper/index.html`) is unchanged — it still reads the single reassembled file.