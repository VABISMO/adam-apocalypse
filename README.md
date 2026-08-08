# Lector del Cielo (קורא השמים)

Operacionalización del mapeo tripartito del *Sefer Yetzirah* (3 madres / 7 dobles / 12 simples) sobre efemérides astronómicas reales (astronomy-engine). Versión del artículo: **3.1**.

Artículo completo: `article/lector-del-cielo-articulo.md`.

## Estructura de carpetas

```
articles/
  README.md
  data/        # fuente única de la verdad: dependencias compartidas (symlinkeadas desde scripts/ y web/)
    astronomy-engine.mjs   # astronomy-engine v2.1.19 (vendored, MIT)
    corpus.json            # cache Sefaria (lo genera fetch_gen.mjs)
    lexicon.json           # Strong (OpenScriptures), 6045 raíces
    angels72.json          # 72 tríos + nombres +EL/+H + gematrías (lo genera calc_angels72.mjs)
  scripts/     # todos los .mjs (lib, tests, calc_*, ...) + symlinks a data/
  web/         # la app: index.html, app.jsx, app.bundle.js + symlinks a data/
  article/     # másters markdown (ES + EN)
  pdf/         # HTML renderizados + PDFs + texto extraído + legado cielo-lector.html
  patches/     # scripts python que editan article/ y pdf/ (paths repuntados a ../article, ../pdf, ../backups)
  backups/     # *.bak-*  y snapshots (read_stars.tar.xz)
  fonts/       # fuentes .ttf huérfanas (no referenciadas por nada)
```

`data/` es la **única fuente** de `astronomy-engine.mjs`, `corpus.json`, `lexicon.json` y `angels72.json`; `scripts/` y `web/` las enlazan por symlink, así no hay derivas entre copias. `node_modules` (React 18) queda en la raíz y lo resuelven tanto `scripts/` como `web/` subiendo un nivel.

## Reproducir todo

Requisitos: Node ≥ 20 y (para el corpus) conexión a internet (API Sefaria). Ejecutar desde `scripts/`:

```bash
cd scripts
node fetch_gen.mjs          # Génesis (1533 versos) + Éxodo 14:19-21 (MT) -> ../data/corpus.json
node tests.mjs              # 86 aserciones — TODAS EN VERDE
node calc_all.mjs           # §§3–9, 14  (equinoccios 2026, eclipses, Metón, precesión, Saros verificado)
node calc_37_73.mjs         # §9.2–9.4   (37/73: búsqueda exhaustiva en eclipses + encaje en el año solar)
node calc_eclipse_deep.mjs  # §9.2 empírico (conteo real de eclipses con astronomy-engine, ~1 min)
node calc_mazzalot.mjs      # §6.2, §13.1 (Egel/Ayil/Shor, 144, nulo de palíndromos por palabra)
node calc_72.mjs            # §6.3        (231 puertas, ABBA, Éxodo 72×3, p≈5×10⁻⁷)
node palindrome.mjs         # §13 corregido (nulo por bloque de k versos + núcleo Génesis 1)
node calc_phrase.mjs        # §13.2       (frase, selector, permutación del orden de versos)
node slow_scan.mjs          # §12         (ventanas Neptuno–Plutón, −600 a.C.→2400 d.C., ~3 min)
node gen_eclipse.mjs        # §9.3        (correlación días-Génesis/eclipses 2024–2030)
node calc_crosscultural.mjs # §9.6        (Maya, griego, árabe, chino, védico)
node calc_magic_squares.mjs # §15b.1-2    (7 kameot mágicos, Lo Shu, Aiq Bekar = gematría decimal)
node calc_angels72.mjs      # §15b.4      (72 tríos del Shem HaMephorash desde Éxodo, 216=6³ -> ../data/angels72.json)
node calc_sigils.mjs        # §15b.3      (sigilos: nombre -> Aiq Bekar -> Lo Shu; 72 ángeles)
node calc_gen11_structure.mjs # §15b.5    (estructura 37×73 de las 7 palabras, nulo p≈3e-4)
node calc_saros_series.mjs  # §15b.6      (152 series saros completas, 54-87, mediana 72; ~2 min)
node calc_ayanamsa.mjs      # §15b.7      (eras vs Lahiri/KP/Fagan-Bradley/Raman, dispersión 190 a)
node calc_windows_causality.mjs # §15b.8  (6 ventanas: cadencia 491 a, regularidad p<5e-6 + caveat)
node calc_week_chaldean.mjs # §15b.9      (7 dobles = 7 planetas = 7 días; orden caldeo + mod 7)
```

## App web (inglés, por pestañas)

```bash
cd web
npx esbuild app.jsx --bundle --format=esm --alias:astronomy-engine=./astronomy-engine.mjs --outfile=app.bundle.js
python3 -m http.server 8008
# abrir http://127.0.0.1:8008/   (lexicon.json + angels72.json se cargan por fetch; NO abrir con file://)
```

Archivos: `web/index.html` + `web/app.bundle.js` + symlinks `lexicon.json`/`angels72.json`/`astronomy-engine.mjs` (React 18 + astronomy-engine, sin Babel en cliente). Fuente: `web/app.jsx`. Cada sección del artículo y cada calculadora son una pestaña (mapa estelar, cálculo de ángulos, lectura estelar, gematría+Aiq Bekar, forja de sigilos, 7 kameot, 72 ángeles, saros, ayanamsa, lunar-solar, Apocalipsis/isopsefia, cross-cultural…). Versión legacy monolítica: `pdf/cielo-lector.html`.

## Archivos

| archivo | rol |
|---|---|
| `scripts/lib.mjs` | módulo compartido (mapas SY, gematría, legibilidad `S⊆O`, precesión, constantes, PRNG) |
| `data/astronomy-engine.mjs` | astronomy-engine v2.1.19 (vendored, MIT) |
| `scripts/tests.mjs` | 86 aserciones (gematría, kameot, Aiq Bekar, 72 ángeles, Gen1:1 37×73, saros, precesión, eclipses, año solar, legibilidad, equinoccios 2026, cross-cultural, orden caldeo) |
| `scripts/calc_*.mjs`, `palindrome.mjs`, `slow_scan.mjs`, `gen_eclipse.mjs`, `fetch_gen.mjs` | reproducen cada sección del artículo (v3.1: `calc_magic_squares`, `calc_sigils`, `calc_angels72`, `calc_gen11_structure`, `calc_saros_series`, `calc_ayanamsa`, `calc_windows_causality`, `calc_week_chaldean`) |
| `data/corpus.json` | cache del corpus Sefaria (lo genera `fetch_gen.mjs`) |
| `data/angels72.json` | 72 tríos + nombres +EL/+H + gematrías (lo genera `calc_angels72.mjs`) |
| `web/app.jsx` | app React por pestañas (inglés) — fuente; se compila a `app.bundle.js` con esbuild |

## Hallazgos clave (v3.1)

- **37/73 no estructuran los eclipses** (factorización, periodo, combos, ciclo nodal — todo negativo; empírico: ~40 estaciones / ~87 eclipses sol+lun por ciclo nodal, no 37). **73 = recuento estadístico de serie saros, ahora por cálculo: 152 series completas, 54–87 eclipses, mediana 72** (`calc_saros_series.mjs`).
- **37/73 sí estructuran el año solar civil** (365 = 73×5; 2701 pentadas = 37 años), corroborado por el Haab maya y el Calendar Round (73 tzolkin).
- **Estructura 37×73 de las 7 palabras de Génesis 1:1 — demostrada (v3.1):** 23/127 subconjuntos múltiplos de 37, nulo por permutación del multiset de 28 letras (100 000×), p≈3,1×10⁻⁴; 2/7 palabras múltiplos de 37 (p≈8,2×10⁻³) — sesgo real hacia 37 más allá del total trivial 2701=37×73 (`calc_gen11_structure.mjs`).
- **El descarte del Lector del Cielo es posicional** (`S ⊆ O`, P = q^|S|, exponencial en el nº de elementos), no aritmético — e independiente del ayanamsa (signos tropicales).
- **Núcleo Génesis 1**: exceso real de palíndromo-espejo (61,3 % vs 38,3 % nulo emparejado, p≈8×10⁻³) — hipótesis débil-a-moderada.
- **Ingeniería intencional de letras demostrada**: Éxodo 14:19-21 = 72 consonantes ×3 (p≈5×10⁻⁷). **72 ángeles del Shem HaMephorash** extraídos por columnas (216 = 6³; trío 0 = והו/Vehuiah verificado) — `calc_angels72.mjs`.
- **Tradición operativa (v3.1, §15b):** 7 kameot mágicos planetarios = 7 dobles (Mercurio 260 = Tzolkin; Sol: 1..36 = 666); **Aiq Bekar = gematría decimal-posicional de §2** (puente a los sigilos); **sigilos** = nombre → Aiq Bekar → trazo sobre el Lo Shu (`calc_magic_squares.mjs`, `calc_sigils.mjs`).
- **Heptagrama 7 dobles = 7 días — demostrado (v3.1):** orden caldeo por periodos sidéreos + 24 mod 7 = 3 + etimología romance (`calc_week_chaldean.mjs`).
- **Ayanamsa (v3.1):** 4 sistemas desplazan la entrada de Acuario hasta 190 años — la datación de eras es convencional; el descarte tropical es robusto (`calc_ayanamsa.mjs`).
- **6 ventanas (v3.1):** cadencia 491 a compartida, regularidad p<5×10⁻⁶ — pero sesgo de selección + n=6 → hipótesis, no causa (`calc_windows_causality.mjs`).
- Cross-cultural: Metón (chino *zhang*), gematría decimal (griego/árabe), 144 000 (baktun maya), 72 (védico/egipcio), **Mercurio 260 = Tzolkin (kameot)**.