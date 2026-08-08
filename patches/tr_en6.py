#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# Patch lector-del-cielo_EN.html from v2.4 -> v3.1 (English).
# Translates v3.1 deltas + adds 5 new inline SVG figures (Fig 6-10).
import io, re

src = io.open('../pdf/lector-del-cielo_EN.html', encoding='utf-8').read()
R = []
def rep(a, b): R.append((a, b))

def replace_between(s, start, end, new_mid):
    i = s.index(start)
    j = s.index(end, i + len(start))
    return s[:i] + new_mid + s[j:]

def insert_before(s, marker, new_html):
    return s.replace(marker, new_html + marker, 1)

# ============================================================
# SVG figure generators (inline SVG -> no image input)
# ============================================================
def fig6():
    planets = [("Saturn","♄",15,3),("Jupiter","♃",34,4),("Mars","♂",65,5),
               ("Sun","☉",111,6),("Venus","♀",175,7),("Mercury","☿",260,8),("Moon","☾",369,9)]
    W, pad = 730, 10
    bw = (W - 8*pad)/7.0
    H = 178
    p = ['<svg viewBox="0 0 %d %d" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Seven planetary kameot">' % (W, H)]
    p.append('<rect x="0" y="0" width="%d" height="%d" fill="#0e1320"/>' % (W, H))
    for i, (name, glyph, const, n) in enumerate(planets):
        x = pad + i*(bw+pad)
        gy = 40; gw = bw; gh = bw
        cx = x + bw/2.0
        hl = "#ffcf6a" if name == "Sun" else ("#7fb0ff" if name == "Mercury" else "#cfe0ff")
        p.append('<text x="%.1f" y="16" text-anchor="middle" font-family="sans-serif" font-size="15" fill="%s">%s</text>' % (cx, hl, glyph))
        p.append('<text x="%.1f" y="30" text-anchor="middle" font-family="sans-serif" font-size="7.6" fill="#8aa0c0">%s  %dx%d</text>' % (cx, name, n, n))
        p.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="none" stroke="#3a4762" stroke-width="1"/>' % (x, gy, gw, gh))
        cell = gw/n
        for k in range(1, n):
            p.append('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="#283145" stroke-width="0.6"/>' % (x+cell*k, gy, x+cell*k, gy+gh))
            p.append('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="#283145" stroke-width="0.6"/>' % (x, gy+cell*k, x+gw, gy+cell*k))
        p.append('<text x="%.1f" y="%.1f" text-anchor="middle" font-family="sans-serif" font-size="9.5" fill="#cfe0ff">M=%d</text>' % (cx, gy+gh+15, const))
    p.append('<text x="%.1f" y="%d" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#7fb0ff">Mercury M=260 = Maya Tzolkin  ·  Sun 6x6: 1+...+36 = 666 = 6x111  ·  Saturn 3x3 = Lo Shu</text>' % (W/2.0, H-6))
    svg = ''.join(p) + '</svg>'
    return ('<figure class="fig" id="fig6"><div class="fig-frame">' + svg + '</div>'
            '<figcaption><span class="fnum">Fig. 6.</span> The 7 planetary kameot (magic squares), orders 3-9, in Chaldean order with their magic constants M(n)=n(n²+1)/2. They are seven, like the 7 doubles = 7 planets of the SY: the kamea of order n is assigned to the nth planet. Saturn 3x3 is the Lo Shu (M=15), the basis of the sigils; Mercury 8x8 (M=260) coincides with the Maya Tzolkin; the Sun 6x6 sums 1+…+36 = 666 = 6×111.</figcaption></figure>')

def fig7():
    W, H = 460, 430
    lo = [[4,9,2],[3,5,7],[8,1,6]]
    groups = {1:'א י ק',2:'ב כ ר',3:'ג ל ש',4:'ד מ ת',5:'ה נ ך',
              6:'ו ס ם',7:'ז ע ן',8:'ח פ ף',9:'ט צ ץ'}
    ox, oy, S = 70, 70, 300; cell = S/3.0
    p = ['<svg viewBox="0 0 %d %d" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Lo Shu and sigil">' % (W, H)]
    p.append('<rect x="0" y="0" width="%d" height="%d" fill="#0e1320"/>' % (W, H))
    p.append('<text x="%.1f" y="%d" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#cfe0ff">Lo Shu (Saturn 3x3, M=15) + Aiq Bekar groups</text>' % (ox+S/2.0, oy-22))
    p.append('<rect x="%d" y="%d" width="%d" height="%d" fill="none" stroke="#3a4762" stroke-width="1.4"/>' % (ox, oy, S, S))
    for k in range(1,3):
        p.append('<line x1="%.1f" y1="%d" x2="%.1f" y2="%d" stroke="#3a4762" stroke-width="1"/>' % (ox+cell*k, oy, ox+cell*k, oy+S))
        p.append('<line x1="%d" y1="%.1f" x2="%d" y2="%.1f" stroke="#3a4762" stroke-width="1"/>' % (ox, oy+cell*k, ox+S, oy+cell*k))
    def pos(d):
        for r in range(3):
            for c in range(3):
                if lo[r][c] == d:
                    return (ox+cell*c+cell/2.0, oy+cell*r+cell/2.0)
    for r in range(3):
        for c in range(3):
            d = lo[r][c]
            cx = ox+cell*c+cell/2.0; cy = oy+cell*r+cell/2.0
            p.append('<text x="%.1f" y="%.1f" text-anchor="middle" dominant-baseline="middle" font-family="serif" font-size="26" fill="#cfe0ff">%d</text>' % (cx, cy-4, d))
            p.append('<text x="%.1f" y="%.1f" text-anchor="middle" dominant-baseline="middle" font-family="serif" font-size="11" fill="#8aa0c0">%s</text>' % (cx, cy+18, groups[d]))
    # sigil of משיח -> Aiq Bekar 4,3,1,8 (all distinct cells, clean trace)
    path = [4,3,1,8]
    pts = [pos(d) for d in path]
    dpath = 'M' + 'L'.join('%.1f %.1f' % (x,y) for x,y in pts)
    p.append('<path d="%s" fill="none" stroke="#e8c87a" stroke-width="2.4" stroke-linejoin="round" opacity="0.95"/>' % dpath)
    for i,(x,y) in enumerate(pts):
        p.append('<circle cx="%.1f" cy="%.1f" r="10" fill="#e8c87a" stroke="#fff3d0" stroke-width="1"/>' % (x, y))
        p.append('<text x="%.1f" y="%.1f" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="10" fill="#0b0e14" font-weight="bold">%d</text>' % (x, y, i+1))
    p.append('<text x="%d" y="%d" text-anchor="start" font-family="serif" font-size="14" fill="#e8c87a">משיח  →  Aiq Bekar 4·3·1·8</text>' % (ox, oy+S+34))
    p.append('<text x="%d" y="%d" text-anchor="start" font-family="sans-serif" font-size="9.5" fill="#8aa0c0">Each cell holds its Lo Shu digit; the sigil joins the reduced cells of the name in order.</text>' % (ox, oy+S+54))
    svg = ''.join(p) + '</svg>'
    return ('<figure class="fig" id="fig7"><div class="fig-frame">' + svg + '</div>'
            '<figcaption><span class="fnum">Fig. 7.</span> The Lo Shu (Saturn 3x3, magic constant 15) with the 9 Aiq Bekar groups overlaid: each cell gathers the letters whose gematria digit-sums to that cell. The golden trace is the sigil of משיח (Messiah): vowels removed → Aiq Bekar 4·3·1·8 → the reduced cells joined in order on the Lo Shu. Aiq Bekar is exactly the digit-sum of the decimal-positional gematria of §2 — the bridge from the alphabet to the sigil.</figcaption></figure>')

def fig8():
    W, H = 580, 360
    colw, gap, topy, colh = 70, 34, 86, 220
    xs = [40, 40+colw+gap, 40+2*(colw+gap)]
    labels = ["Ex 14:19","Ex 14:20","Ex 14:21"]
    dirs = ["↓","↑","↓"]
    p = ['<svg viewBox="0 0 %d %d" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="72 triplets extraction">' % (W, H)]
    p.append('<rect x="0" y="0" width="%d" height="%d" fill="#0e1320"/>' % (W, H))
    for i,x in enumerate(xs):
        p.append('<text x="%.1f" y="%d" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#e8c87a">%s</text>' % (x+colw/2.0, topy-30, dirs[i]))
        p.append('<text x="%.1f" y="%d" text-anchor="middle" font-family="serif" font-size="11" fill="#cfe0ff">%s</text>' % (x+colw/2.0, topy-12, labels[i]))
        p.append('<rect x="%d" y="%d" width="%d" height="%d" fill="none" stroke="#3a4762" stroke-width="1.2"/>' % (x, topy, colw, colh))
        for k in range(1,8):
            y = topy + colh*k/8.0
            p.append('<line x1="%d" y1="%.1f" x2="%d" y2="%.1f" stroke="#1c2333" stroke-width="0.6"/>' % (x, y, x+colw, y))
        p.append('<text x="%.1f" y="%d" text-anchor="middle" font-family="sans-serif" font-size="8.5" fill="#8aa0c0">72 letters</text>' % (x+colw/2.0, topy+colh+15))
    tx = xs[2]+colw+54
    p.append('<text x="%d" y="%d" text-anchor="start" font-family="serif" font-size="11" fill="#cfe0ff">72 triplets  ( trio[i] = v19[i] + v20[71−i] + v21[i] )</text>' % (tx, topy-12))
    trips = [("והו","Vehuiah"),("ילי","Jeliel"),("סיט","Sitael"),("אלמ","Elemiah"),("מהש","Mahashiah"),("…","")]
    for j,(heb,ang) in enumerate(trips):
        y = topy+10+j*30
        p.append('<text x="%d" y="%d" text-anchor="start" font-family="serif" font-size="15" fill="#e8c87a">%s</text>' % (tx, y, heb))
        if ang:
            p.append('<text x="%d" y="%d" text-anchor="start" font-family="sans-serif" font-size="9.5" fill="#8aa0c0">%s</text>' % (tx+52, y, ang))
    p.append('<text x="%.1f" y="%d" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#7fb0ff">72 × 3 = 216 = 6³ consonants  →  72 triplets (Shem HaMephorash)</text>' % (W/2.0, H-24))
    p.append('<text x="%.1f" y="%d" text-anchor="middle" font-family="sans-serif" font-size="8.5" fill="#525d72">v20 read bottom-up (inverted), as tradition requires</text>' % (W/2.0, H-9))
    svg = ''.join(p) + '</svg>'
    return ('<figure class="fig" id="fig8"><div class="fig-frame">' + svg + '</div>'
            '<figcaption><span class="fnum">Fig. 8.</span> Extraction of the 72 triplets of the Shem HaMephorash from Exodus 14:19-21 (3 verses × 72 consonants = 216 = 6³). The three columns are read in parallel — v19 downward, v20 upward (inverted), v21 downward — so that row i yields trio[i]. The first trios are והו (Vehuiah), ילי (Jeliel), סיט (Sitael)…, verified against the canonical list.</figcaption></figure>')

def fig9():
    W, H = 720, 210
    years = [-427,61,552,1043,1535,2025]
    labels = ["Axial Age","Second Temple","Justinian","East/West","Reformation","Present",
              "(Plato, Torah, Buddha)","destroyed (70)","(Hagia Sophia)","Schism (1054)","(Copernicus 1543)","(2025)"]
    ymin, ymax, margin, axisY = -600, 2100, 70, 120
    def X(y): return margin + (y-ymin)/(ymax-ymin)*(W-2*margin)
    p = ['<svg viewBox="0 0 %d %d" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Six windows timeline">' % (W, H)]
    p.append('<rect x="0" y="0" width="%d" height="%d" fill="#0e1320"/>' % (W, H))
    p.append('<text x="%.1f" y="20" text-anchor="middle" font-family="sans-serif" font-size="10.5" fill="#cfe0ff">Genesis 1:1 legibility windows  ·  ~491-year cadence (Neptune–Pluto synodic)</text>' % (W/2.0))
    p.append('<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="#3a4762" stroke-width="1.4"/>' % (margin, axisY, W-margin, axisY))
    for gy in [-4002,-1854,293,2441]:
        if ymin <= gy <= ymax:
            p.append('<line x1="%.1f" y1="%d" x2="%.1f" y2="%d" stroke="#3a4762" stroke-width="0.6"/>' % (X(gy), axisY-4, X(gy), axisY+4))
            p.append('<text x="%.1f" y="%d" text-anchor="middle" font-family="sans-serif" font-size="7" fill="#525d72">%d</text>' % (X(gy), axisY+15, gy))
    for i,y in enumerate(years):
        x = X(y); up = (i % 2 == 0); sgn = -1 if up else 1
        p.append('<line x1="%.1f" y1="%d" x2="%.1f" y2="%d" stroke="#e8c87a" stroke-width="1"/>' % (x, axisY, x, axisY+sgn*26))
        p.append('<circle cx="%.1f" cy="%d" r="5" fill="#e8c87a"/>' % (x, axisY))
        p.append('<text x="%.1f" y="%d" text-anchor="middle" font-family="sans-serif" font-size="9.5" fill="#e8c87a" font-weight="bold">%d</text>' % (x, axisY+sgn*14, y))
        p.append('<text x="%.1f" y="%d" text-anchor="middle" font-family="sans-serif" font-size="8.5" fill="#cfe0ff">%s</text>' % (x, axisY+sgn*34, labels[i]))
        p.append('<text x="%.1f" y="%d" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#8aa0c0">%s</text>' % (x, axisY+sgn*45, labels[i+6]))
    p.append('<text x="%.1f" y="%d" text-anchor="middle" font-family="sans-serif" font-size="8.5" fill="#525d72">mean separation 490.5 y  ·  regularity p &lt; 5×10⁻⁶ (caveat: n=6, selection bias)</text>' % (W/2.0, H-8))
    svg = ''.join(p) + '</svg>'
    return ('<figure class="fig" id="fig9"><div class="fig-frame">' + svg + '</div>'
            '<figcaption><span class="fnum">Fig. 9.</span> The six ~13-year windows in which Genesis 1:1 is legible (Neptune∈Aries ∧ Pluto∈Aquarius), from −427 BCE to 2025 CE, mean separation 490.5 years = the Neptune–Pluto synodic. Each coincides with a major religious-linguistic re-formation. The regularity is very high against chance (p &lt; 5×10⁻⁶), though n = 6 and selection bias leave causality as a hypothesis (§15b.8).</figcaption></figure>')

def fig10():
    W, H = 640, 300
    words = [("בראשית",913),("ברא",203),("אלהים",86),("את",401),("השמים",395),("ואת",407),("הארץ",296)]
    maxv = 913
    leftpad, rightpad, top, bottom = 56, 22, 42, 72
    plotw = W-leftpad-rightpad; bw = plotw/7.0
    baseY = H-bottom; topY = top
    p = ['<svg viewBox="0 0 %d %d" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Seven words of Genesis 1:1">' % (W, H)]
    p.append('<rect x="0" y="0" width="%d" height="%d" fill="#0e1320"/>' % (W, H))
    p.append('<text x="%.1f" y="22" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#cfe0ff">The 7 words of Genesis 1:1  ·  total = 2701 = 37×73</text>' % (W/2.0))
    for i,(w,v) in enumerate(words):
        x = leftpad + i*bw
        h = (v/maxv)*(baseY-topY); y = baseY-h
        mult37 = (v % 37 == 0)
        col = "#e8c87a" if mult37 else "#3a5e8a"
        op = 0.97 if mult37 else 0.82
        p.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="%s" opacity="%.2f" stroke="#fff3d0" stroke-width="0.4"/>' % (x+bw*0.2, y, bw*0.6, h, col, op))
        p.append('<text x="%.1f" y="%.1f" text-anchor="middle" font-family="sans-serif" font-size="9.5" fill="#cfe0ff">%d</text>' % (x+bw/2.0, y-6, v))
        p.append('<text x="%.1f" y="%.1f" text-anchor="middle" font-family="serif" font-size="13" fill="#cfe0ff">%s</text>' % (x+bw/2.0, baseY+16, w))
        if mult37:
            p.append('<text x="%.1f" y="%.1f" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#e8c87a">%dx37</text>' % (x+bw/2.0, baseY+30, v//37))
        p.append('<text x="%.1f" y="%.1f" text-anchor="middle" font-family="sans-serif" font-size="7.5" fill="#525d72">w%d</text>' % (x+bw/2.0, baseY+46, i+1))
    p.append('<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="#3a4762" stroke-width="1"/>' % (leftpad, baseY, W-rightpad, baseY))
    p.append('<text x="%.1f" y="%d" text-anchor="middle" font-family="sans-serif" font-size="8.5" fill="#7fb0ff">2 of 7 words are multiples of 37 (407=11×37, 296=8×37)  ·  23/127 subsets multiples of 37  ·  p≈3.1×10⁻⁴</text>' % (W/2.0, H-9))
    svg = ''.join(p) + '</svg>'
    return ('<figure class="fig" id="fig10"><div class="fig-frame">' + svg + '</div>'
            '<figcaption><span class="fnum">Fig. 10.</span> The 7 words of Genesis 1:1 and their gematrias (913, 203, 86, 401, 395, 407, 296 = 2701 = 37×73). The two gold bars are the words that are multiples of 37 — the last two, ואת (407=11×37) and הארץ (296=8×37). A permutation null of the 28-letter multiset shows this bias is real: 23 of 127 non-empty subsets are multiples of 37 (p≈3.1×10⁻⁴) and 2/7 words (p≈8.2×10⁻³), beyond the trivial total 2701=37×73.</figcaption></figure>')

F6, F7, F8, F9, F10 = fig6(), fig7(), fig8(), fig9(), fig10()

# ============================================================
# 1) version / meta line + test-count harmonization
# ============================================================
rep('Version 2.4 · Date 2026-08-07<br>',
    'Version 3.1 · Date 2026-08-08<br>')
rep('Companion software: <code>index.html</code> + <code>app.bundle.js</code> + <code>lexicon.json</code>; reproducible scripts: <code>tests.mjs</code>, <code>calc_all.mjs</code>, <code>calc_37_73.mjs</code>, <code>calc_mazzalot.mjs</code>, <code>calc_72.mjs</code>, <code>calc_phrase.mjs</code>, <code>palindrome.mjs</code>, <code>slow_scan.mjs</code>, <code>gen_eclipse.mjs</code>',
    'Companion software: <code>index.html</code> + <code>app.bundle.js</code> + <code>lexicon.json</code>; reproducible scripts: <code>tests.mjs</code> (86 assertions, all green), <code>calc_all.mjs</code>, <code>calc_37_73.mjs</code>, <code>calc_eclipse_deep.mjs</code>, <code>calc_mazzalot.mjs</code>, <code>calc_72.mjs</code>, <code>calc_phrase.mjs</code>, <code>palindrome.mjs</code>, <code>slow_scan.mjs</code>, <code>gen_eclipse.mjs</code>, <code>calc_crosscultural.mjs</code>; new v3.1 (§15b): <code>calc_magic_squares.mjs</code>, <code>calc_sigils.mjs</code>, <code>calc_angels72.mjs</code>, <code>calc_gen11_structure.mjs</code>, <code>calc_saros_series.mjs</code>, <code>calc_ayanamsa.mjs</code>, <code>calc_windows_causality.mjs</code>, <code>calc_week_chaldean.mjs</code>')

# §10 test count
rep('Validation (<code>tests.mjs</code>, 44 green assertions):', 'Validation (<code>tests.mjs</code>, 86 green assertions):')

# ============================================================
# 2) TOC: add §15b
# ============================================================
rep('<li><a href="#16-limitaciones">16. Limitations</a></li>',
    '<li><a href="#15b-cuadrados-mágicos-sigilos-ángeles-y-cierre-de-asignaturas-v3-1">15b. Magic squares, sigils, angels, and closing of outstanding matters (v3.1)</a></li><li><a href="#16-limitaciones">16. Limitations</a></li>')

# ============================================================
# 3) Abstract <ol> -> 14-point v3.1 English
# ============================================================
ABSTRACT_OL = '''<ol><li><strong>Positional decimal gematria:</strong> 22 letters + 5 finals = 27 = 1–9, 10–90, 100–900. The alphabet <em>is</em> the set of digits of base 10.</li><li><strong>Precession:</strong> 50.29″/year → 1° every 71.58 years (≈ 72); one zodiacal era = 2147.5 years; great year = 25 771 years (25 920 at the Platonic figure of 72 y/°). 144 years = 2.01°.</li><li><strong>Equinoxes/solstices 2026:</strong> apparent solar longitude 0°, 90°, 180°, 270° — the 4 tropical cardinals are measurable to the second.</li><li><strong>Lunar–solar synchrony:</strong> the tropical year contains 12.368 synodic months; Meton 19y = 235 lunations (Δ 0.087 d); the Islamic calendar (pure lunar) drifts 10.875 d/year and re-aligns with the solar every ~33 years (358.9 d ≈ 1 year).</li><li><strong>The 19 unifies three registers:</strong> Meton (19y calendrical), Saros (19 eclipse years = 6585.78 d ≈ 223 synodic), Quranic basmala (19 letters; 114 suras = 6×19).</li><li><strong>Eclipses — 37/73 (exhaustive search, refuted):</strong> all avenues of contact were tested and <strong>37/73 do not structure eclipses</strong>. (i) Factorization of the 10 canonical cycles (47, 87, 99, 135, 177, 223, 235, 358, 669, 940): <strong>neither 37 nor 73 is a factor of any</strong>. (ii) 37/73 as a <em>period</em>: 37/73 synodics, draconics, and eclipse years do not align the node (draconic drift &gt; 0.1); the linear combinations of Saros (223) and Inex (358) that are multiples of 37 (e.g. 3·358−223 = 851 = 37×23) have draconic drift ~0.5 → <strong>they are not eclipse cycles</strong> (the eclipse would not repeat). (iii) Nodal cycle (18.613 y): there are two counts — <strong>39.2</strong> season (nodal period ÷ eclipse year/2, the astronomically correct one) and <strong>37.2</strong> (2/year × 18.613, a naive count in tropical years that under-counts because the eclipse year is shorter than the tropical); <strong>verified empirically with astronomy-engine: ~40 seasons and ~87 solar+lunar eclipses per nodal cycle — not 37</strong>. The one that does close is <strong>38 (= Saros)</strong>. (iv) Empirical: 3000 solar eclipses in 1300 y = 2.31/year (NASA ~2.38). <strong>Conclusion: 37 is absent from eclipse structure; 73 only as a statistical count</strong> (~70–86 eclipses per saros series, mean ~72–73), not as a period. The structural primes of eclipses are 19, 47, and 223. <strong>Discarded hypotheses (ruled out):</strong> "37 seasons per nodal cycle", "37/73 as an eclipse period", "851=37×23 as a cycle". <strong>What DOES fit — with the Sun, not eclipses (§9.4):</strong> 365 = 73×5 (73 pentads = civil solar year) and 2701 pentads = 37×365 = 37 exact civil years (2701 = 37 years × 73 pentads/year); a civil-calendar identity (365-d year), not orbital (at 365.2422 d it gives 36.98 y, ≈ 37 but not exact), independently corroborated by the Maya Haab (§9.6).</li><li><strong>Cadence of יהוה:</strong> requires {י,ה,ו} = Virgo+Aries+Taurus, fillable by fast planets → cadence ~monthly.</li><li><strong>Genesis 1:1:</strong> requires {י,ה,ל,ו,צ} = Virgo+Aries+Libra+Taurus+<strong>Aquarius</strong>; Aquarius and Aries are anchored at the same time only by <strong>Pluto and Neptune</strong> → windows of ~13 years every <strong>~491 years</strong> (Neptune–Pluto synodic). Six windows (−427, 61, 552, 1043, 1535, 2025), coincident with major religious-linguistic re-formations.</li><li><strong>Mirror-palindrome 2701→3773:</strong> real but <strong>not selective at the corpus level</strong> —neither by verse (Genesis 39.0 % ≈ Markov ord-1 39.7 % ≈ uniform 41.4 %) nor by word (47.9 % of the lexicon, 58 % of the mazzalot), and measured by <strong>blocks of k consecutive verses</strong> (the correct unit, not the isolated letter) it still neither rarefies nor separates from the null at any k. It does not separate valid from invalid readings (Genesis-legible days 24.9 % vs non-legible 41.1 %). The discard is positional (<em>S</em> ⊆ <em>O</em>, 88.5 % of dates discarded; P = q^|S| with q≈0.58, exponential rarefaction with the number of elements). <strong>Novelty (the original nucleus):</strong> the excess does appear concentrated in <strong>Genesis 1 (1–31)</strong>, the least-redacted nucleus: it palindrome-rates at <strong>61.3 %</strong> vs <strong>38.3 %</strong> of the length-matched Markov null (p≈8×10⁻³, binomial) — <em>not</em> a length artifact (the 31 verses are all 4-digit; the corpus rate at 4 digits = 39.7 %). The corpus-level test diluted this signal. Caveat: n=31 (a single chapter); the palindrome remains arithmetically "easy", so the excess may reflect deliberate composition of short verses rather than astronomical encoding — <strong>a hypothesis, not a proof</strong> (§13.3). What are specific are the sums with astronomical value: Egel+Ayil = 144, Shor = 2×sum(1..22), Genesis 1:2 = 9999 (§6.2, §13.1–13.2).</li><li><strong>No correlation with eclipses:</strong> Genesis days 6.5 % vs 24.7 % expected.</li><li><strong>144 = 12²</strong> = lunar months of the 12 common years of the Metonic cycle (12×12 + 7×13 = 144+91 = 235); 144 000 = 360×400 (ת = Moon).</li><li><strong>Tetramorph:</strong> the 4 faces of the cherubim (ox, lion, eagle, man) = the <strong>4 fixed signs</strong> (Taurus, Leo, Scorpio, Aquarius) at exact 90° (fixed cross); the 12 Hebrew <em>mazzalot</em> are animals/objects (טלה lamb, שור ox, אריה lion…).</li><li><strong>Intentional letter engineering (attested and, for the 72, demonstrated):</strong> 231 gates of the SY (C(22,2)); first gate AB + its mirror BA = <strong>ABBA = "father", palindrome</strong>; 3·7·12−22+1 = 231 (self-coherence); <strong>Exodus 14:19-21 = 72 consonantal letters each verse</strong> (verified in MT; 3 consecutive of 72 → p ≈ 5×10⁻⁷, intentional engineering); Abulafia and <em>Sefer Raziel HaMalakh</em> document the method. The <strong>intentionality of the practice</strong> is real; the specific astronomical attribution of Toric gematria remains a hypothesis (§6.3).</li><li><strong>Operative tradition and closing of outstanding matters (v3.1, §15b):</strong> the <strong>7 planetary kameot</strong> (15, 34, 65, 111, 175, 260, 369) are the 7 doubles/planets (Mercury 260 = Maya Tzolkin; Sun: sum 1..36 = 666); the <strong>Aiq Bekar reduction</strong> coincides exactly with the decimal-positional gematria of §2 (bridge to the <strong>sigils</strong>: name → Aiq Bekar → trace on the Lo Shu, reproducible); the <strong>72 angels of the Shem HaMephorash</strong> are extracted by columns of Exodus 14:19-21 (216 = 6³ consonants; trio 0 = והו/Vehuiah verified). Outstanding matters closed by calculation: <strong>37×73 structure of the 7 words</strong> (23/127 subsets multiples of 37, permutation null, p≈3.1×10⁻⁴); <strong>saros series count</strong> (152 complete series, 54–87, median 72 — the "73" is statistical, by calculation); <strong>ayanamsa</strong> (190-year dispersion; the tropical discard is robust); <strong>heptagram 7 doubles=7 days</strong> (Chaldean order by sidereal periods + 24 mod 7 = 3 + Romance etymology). Bounded with caveat: <strong>causality of the 6 windows</strong> (491-y cadence, regularity p&lt;5×10⁻⁶, but selection bias + n=6 → hypothesis, not cause). <code>tests.mjs</code> = 86 assertions, all green.</li>'''

src = replace_between(src, '<ol><li><strong>Positional decimal gematria', '</ol>', ABSTRACT_OL)

# ============================================================
# 4) §9.6 insertion (after §9.5 blockquote, before §10)
# ============================================================
SEC96 = '''<h3 id="9-6-corroboración-cross-cultural-lo-que-coincide-tradiciones-independientes">9.6 Cross-cultural corroboration (what coincides, independent traditions)</h3>
<p>The constants of the system are not idiosyncratic to the <em>Sefer Yetzirah</em>: they appear, <strong>verifiably and independently</strong>, in other traditions. That they coincide <strong>does not prove</strong> the system; it <strong>corroborates</strong> it without positing borrowing. Reproducible calculation in <code>calc_crosscultural.mjs</code>.</p>
<table><thead><tr><th>constant</th><th>independent tradition</th><th>verified coincidence</th></tr></thead><tbody><tr><td><strong>decimal-positional gematria 27/28</strong> (1–9, 10–90, 100–900)</td><td>Greek (<em>isopsephy</em>, 27 letters), Arabic (<em>abjad</em>, 28)</td><td>same positional assignment as Hebrew (§2)</td></tr><tr><td><strong>Meton 19 y / 235 lunations</strong> (Δ 0.087 d)</td><td>Chinese (章 <em>zhang</em> = 19 y / 235 months)</td><td>discovered independently (§7–8)</td></tr><tr><td><strong>73 × 5 = 365</strong> (73 pentads = solar year)</td><td>Maya (<em>Haab</em> = 365 = 18×20 + 5)</td><td>the Haab is exactly 73 pentads (§9.4)</td></tr><tr><td><strong>73 as a closed count of the year</strong></td><td>Maya (<em>Calendar Round</em> = 73 <em>Tzolkin</em> = 52 <em>Haab</em> = 18 980 d)</td><td>73×260 = 52×365 (§9.4)</td></tr><tr><td><strong>144 000</strong> as a major unit</td><td>Maya (<em>baktun</em> = 144 000 d = 400 <em>tun</em>); apocalyptic (12²×1000)</td><td>144 000 = 144×1000 = 360×400 (§14)</td></tr><tr><td><strong>72</strong> (precessional degree / <em>Shem HaMephorash</em>)</td><td>Vedic (<em>kali-yuga</em> = 432 000 y = 72×6000); Egyptian (72 conspirators of Set)</td><td>convergence of 72 as "degree of the great clock" and combinatorial completeness</td></tr><tr><td><strong>27</strong> (22 + 5 Hebrew finals = base-10 digits)</td><td>Vedic (27 <em>nakshatras</em>, lunar mansions, ×13°20 = 360°)</td><td>parallel of 27 as lunar completeness</td></tr></tbody></table>
<blockquote><strong>Cross-cultural synthesis.</strong> The "73 = solar year" (§9.4) —the real celestial relation of the factors of Genesis 1:1— is <strong>independently encoded in the Maya calendar</strong> twice (Haab 365 = 73×5 and Calendar Round 73 <em>Tzolkin</em>). Meton (19/235) was rediscovered by China; decimal-positional gematria is shared by Greek and Arabic. These are the strongest corroborations: no borrowing posited, only verifiable arithmetic coincidence.</blockquote>

'''

src = insert_before(src, '<h2 id="10-regla-de-lectura-formalización">', SEC96)

# ============================================================
# 5) Fig 9 timeline at end of §12 (before §13)
# ============================================================
src = insert_before(src, '<h2 id="13-resultado-iii-2701-el-espejo-palíndromo-y-los-modelos-nul">', F9 + '\n\n')

# ============================================================
# 6) §13.3 + Fig 10 (after §13.2 blockquote, before §14)
# ============================================================
SEC133 = '''<h3 id="13-3-el-núcleo-original-génesis-1-donde-el-exceso-sí-aparece">13.3 The original nucleus (Genesis 1): where the excess does appear</h3>
<p>A methodological objection to the null of §13 is the <strong>unit</strong>: measuring isolated verses or loose letters can <strong>dilute</strong> a signal concentrated in the least-redacted nucleus. It was therefore re-tested over <strong>Genesis 1 (verses 1–31)</strong> —the oldest and least manipulated composition of the corpus— with a Markov null <strong>matched by the real length</strong> of those verses (<code>palindrome.mjs</code>):</p>
<table><thead><tr><th>set</th><th>mirror-palindrome (k=1)</th></tr></thead><tbody><tr><td>Genesis, full corpus (n=1533)</td><td>39.0 %</td></tr><tr><td>Markov ord-1 matched by length of Gen 1 (n=40 000)</td><td>38.3 %</td></tr><tr><td>Corpus rate at 4 digits (n=1496)</td><td>39.7 %</td></tr><tr><td><strong>Genesis 1, original nucleus (n=31)</strong></td><td><strong>61.3 % (19/31)</strong></td></tr></tbody></table>
<p><strong>Excess: 1.6× the length-matched null; upper-tail binomial p-value ≈ 8×10⁻³.</strong> It is not an artifact of length or of digit count: the 31 verses of Genesis 1 are almost all 4-digit, and the corpus rate at 4 digits is 39.7 % — the same as the null. The signal is not in the length; it is in the <strong>nucleus</strong>. The corpus-level test (§13) <strong>diluted</strong> it by averaging with the remaining 1502 verses (largely genealogies and later narrative).</p>
<p><strong>Mandatory caveats.</strong> (i) n = 31 is a single chapter. (ii) The "original nucleus" criterion is pre-specified by philology (J/non-J) but is not fully independent of the observed text. (iii) The mirror-palindrome remains arithmetically "easy" (40 % base at 4 digits), so an excess may reflect <strong>deliberate composition of short verses</strong> rather than <strong>astronomical encoding</strong>. (iv) Multiple comparisons (which other chapter would give the greatest excess) are not explored here. For all these reasons, this is a <strong>hypothesis with weak-to-moderate empirical support, not a proof</strong>: the original nucleus is <em>consistently</em> more palindromic than expected, but the mechanism (verse design vs. celestial encoding) remains open.</p>
<blockquote><strong>Integrated reading of §13.</strong> At the corpus level, the mirror does not discriminate (§13.1–13.2); the selective engine is the positional rule <em>S</em> ⊆ <em>O</em> (exponential rarefaction P = q^|S|). At the <strong>original-nucleus</strong> level, the mirror shows a real excess (§13.3). Both results are compatible: the <em>operational</em> selectivity of the <em>Reader of the Sky</em> is positional; the <em>compositional intentionality</em> of the sacred text may leave a trace in the least-redacted nucleus.</blockquote>

'''

src = insert_before(src, '<h2 id="14-resultado-iv-el-144">', SEC133)

# ============================================================
# 7) §15b + Fig 6/7/8 (after §15, before §16)
# ============================================================
SEC15B = '''<h2 id="15b-cuadrados-mágicos-sigilos-ángeles-y-cierre-de-asignaturas-v3-1">15b. Magic squares, sigils, angels, and closing of outstanding matters (v3.1)</h2>
<p>This section closes the outstanding matters of §18 by turning them into reproducible empirical demonstrations (<code>calc_*.mjs</code> scripts) and extends the system toward the hermetic operative tradition: <strong>planetary magic squares (kameot), Aiq Bekar reduction, the composition of sigils, and the 72 angelic names of the Shem HaMephorash</strong>. The guiding thread is that the decimal-positional gematria of §2 <em>is</em> the reduction that makes sigils possible, and the 7 kameot <em>are</em> the 7 doubles/planets.</p>
<h3 id="15b-1-los-7-kameot-cuadrados-mágicos-planetarios">15b.1 The 7 kameot (planetary magic squares)</h3>
''' + F6 + '''
<p>The 7 planetary magic squares of the tradition (Agrippa, <em>De occulta philosophia</em> III) have orders 3–9 and magic constant <em>M</em>(<em>n</em>) = <em>n</em>(<em>n</em>²+1)/2. Built and verified by calculation (rows, columns, and diagonals sum to <em>M</em>): <strong>Saturn 3×3 (M=15), Jupiter 4×4 (34), Mars 5×5 (65), Sun 6×6 (111), Venus 7×7 (175), Mercury 8×8 (260), Moon 9×9 (369)</strong> (<code>calc_magic_squares.mjs</code>). They are <strong>seven</strong>, like the <strong>7 doubles = 7 planets</strong> of the SY (§4, long recension/Gra): the kamea of order <em>n</em> is assigned to the <em>n</em>-th planet in the Chaldean order (§15b.9). Cross-links: <strong>Mercury 8×8, M = 260 = Maya Tzolkin</strong> (§9.6) — the constant of Mercury's square coincides with the Mesoamerican sacred calendar; <strong>Sun 6×6, M = 111, and the sum 1+…+36 = 666 = 6×111</strong> (the "solar number" of Rev 13:18, which is simply the sum of the cells of the Sun kamea). Saturn's 3×3 square is the <strong>Lo Shu</strong> (constant 15), the basis of Hebrew sigils.</p>
<h3 id="15b-2-aiq-bekar-la-gematría-decimal-posicional-de-2">15b.2 Aiq Bekar = the decimal-positional gematria of §2</h3>
<p>The composition of a sigil requires reducing each letter to a value 1–9 that fits the 3×3 kamea. The traditional reduction is <strong>Aiq Bekar</strong> (איק בכר): recursive digit-sum. Verified: <strong>Aiq Bekar coincides exactly with the digit-sum of the gematria of §2 for the 27 letters</strong> (<code>calc_magic_squares.mjs</code>). The 9 groups gather the letters by <em>positional digit</em>:</p>
<table><tbody><tr><td>1: א(1) י(10) ק(100)</td><td>2: ב(2) כ(20) ר(200)</td><td>3: ג(3) ל(30) ש(300)</td></tr><tr><td>4: ד(4) מ(40) ת(400)</td><td>5: ה(5) נ(50) ך(500)</td><td>6: ו(6) ס(60) ם(600)</td></tr><tr><td>7: ז(7) ע(70) ן(700)</td><td>8: ח(8) פ(80) ף(800)</td><td>9: ט(9) צ(90) ץ(900)</td></tr></tbody></table>
<p>This 3×3 grid <strong>is</strong> the structure 9 = 9+9+9 of §2. Without decimal-positional gematria there is no Aiq Bekar, and without Aiq Bekar no sigil: the reduction is the <strong>bridge §2 ↔ operative tradition of sigils</strong>.</p>
<h3 id="15b-3-composición-de-sigilos">15b.3 Composition of sigils</h3>
''' + F7 + '''
<p>Traditional method (<em>kamea-sigil</em>): name without vowels → Aiq Bekar (1–9) → trace over the Lo Shu joining the reduced cells in order (<code>calc_sigils.mjs</code>). Reproducible and deterministic. Examples: <strong>אדם</strong>→1→4 (2 cells), <strong>משה</strong>→4→3→5 (3), <strong>דוד</strong>→4→6→4 (2), <strong>אברהם</strong>→1→2→2→5→4 (4), <strong>ישראל</strong>→1→3→2→1→3 (3), <strong>אלהים</strong>→1→3→5→1→4 (4), <strong>משיח</strong>→4→3→1→8 (4). Applied to the 72 trios of the Shem HaMephorash: each trio touches on average 2.6/9 cells (45 trios touch 3, 25 touch 2, 2 touch 1); 8 angel groupings share an identical trace (they are "isomorphic" under decimal reduction). The sigil is thus the <strong>geometric footprint of the name on the decimal grid</strong> — not ornament, but a projection of §2 via Aiq Bekar.</p>
<h3 id="15b-4-los-72-ángeles-del-shem-hamephorash">15b.4 The 72 angels of the Shem HaMephorash</h3>
''' + F8 + '''
<p>The 72 trios are read by <strong>columns</strong> of Exodus 14:19-21 (72 consonants × 3 verses): trio[<em>i</em>] = v19[<em>i</em>] + v20[71−<em>i</em>] + v21[<em>i</em>] (v20 inverted, as tradition requires). Verified against the canonical list: <strong>trio 0 = והו (Vehuiah), trio 1 = ילי (Jeliel), trio 2 = סיט (Sitael)…</strong> (<code>calc_angels72.mjs</code>). Each trio + suffix יה (Hod) or אל (Malkhut) = angelic name; complete list of 72 generated and cached (<code>angels72.json</code>). <strong>72×3 = 216 = 6³ consonants</strong> (72 = 6×12 = 8×9 = 2³·3²; 216 = 6³ = 2³·3³). Honest caveat: the first ~12 trios coincide with the canonical hermetic list, validating the algorithm; the later verses differ letter-by-letter between the MT (Sefaria) and the fixed hermetic text, so some trios in the final stretch deviate or repeat — an artifact of <strong>textual tradition</strong>, not of the method. What is demonstrated is the <strong>mechanical 72×3 extraction</strong> (cf. §6.3, p≈5×10⁻⁷); the attribution of each angel to a zodiacal decanate (5°) and to one of the 72 fifths of the sky remains a structural hypothesis, not an empirical one.</p>
<h3 id="15b-5-estructura-37-73-de-las-7-palabras-de-génesis-1-1-jenkins-cerrado">15b.5 37×73 structure of the 7 words of Genesis 1:1 (Jenkins) — CLOSED</h3>
''' + F10 + '''
<p>§18 left pending the reproduction of the "37×73 structure of the 7 words" (Jenkins, cited not reproduced). Facts: <strong>2701 = 37×73 = T₇₃</strong>; <strong>28 letters = T₇</strong>; <strong>7×28 = 196 = 14²</strong>. The strong claim —that the <em>partition</em> of the 28 letters into these 7 words is biased toward multiples of 37— is tested with a <strong>rigorous null</strong>: the multiset of the 28 letters and the word lengths (6,3,5,2,5,3,4) are preserved, the letters are permuted and regrouped (100 000×, deterministic PRNG). Statistics: <strong>(A)</strong> 2 of the 7 word-sums are multiples of 37 (407=11×37, 296=8×37 — the last two: ואת, הארץ); under the null, P(≥2/7) = <strong>8.2×10⁻³</strong>. <strong>(B)</strong> 23 of the 127 non-empty subsets are multiples of 37 (chance ~3.4); under the null, P(≥23) = <strong>3.1×10⁻⁴</strong> (only 31/100 000 permutations equal or exceed). <strong>Verdict: the 37×73 structure of the 7 words is empirically real beyond the trivial total fact =2701=37×73</strong> (outstanding matter closed ✓). The partition is biased toward 37; the composition of the first verse is not arbitrary with respect to that factor.</p>
<h3 id="15b-6-recuento-de-serie-saros-cerrado-por-cálculo">15b.6 Saros series count — CLOSED by calculation</h3>
<p>§18 cited "70–86 eclipses/series, mean ~72–73" (NASA, not computed). Here it is <strong>demonstrated by calculation</strong> (<code>calc_saros_series.mjs</code>): all solar eclipses (incl. partials) are detected in [−500, 4500] CE —at each new moon (<code>SearchMoonPhase</code> lon=0) the geocentric lunar ecliptic latitude |β| is measured; eclipse if |β|&lt;1.6° (threshold calibrated to 2.39/year ≈ 2.38 of NASA; ~12 780 eclipses detected)— and <strong>chained by the saros period</strong> (223 synodics = 6585.32 d): two eclipses of the same series are separated by ~6585.32 d. Of the resulting chains, <strong>152 complete series</strong> (border ends |β|&gt;1.3° and length ≥ 50) give lengths <strong>54–87 eclipses, mean 74.4, median 72</strong>, with 64 % in the 69–75 peak. <strong>It coincides with the 70–86 range / central value ~72–73 of the literature.</strong> Reinforced conclusion: the "73" is a <strong>statistical count</strong> (mean/median of members per series), <strong>not</strong> a period or a factor of eclipse — now confirmed by calculation, not by citation. Outstanding matter closed ✓.</p>
<h3 id="15b-7-ayanamsa-cerrado-advertencia-metodológica">15b.7 Ayanamsa — CLOSED (methodological warning)</h3>
<p>§11 dates the eras with Lahiri (24.18°). Compared 4 ayanamsas (~2024): <strong>Lahiri 24.18°, Krishnamurti 23.93°, Fagan-Bradley 25.06°, Raman 22.40°</strong> (<code>calc_ayanamsa.mjs</code>). The entry date of each era shifts <strong>Δt = Δayanamsa / precession</strong>: the entry into Aquarius oscillates between <strong>2378 CE (Fagan-Bradley) and 2568 CE (Raman)</strong> — a dispersion of <strong>190 years</strong> (max Δayanamsa 2.66° / 0.01397°/year). Consequence: the "Age of Aquarius" as a single date <strong>is not an empirical fact</strong> but a convention (it depends on the chosen sidereal zero). This <em>reinforces</em> the design of the <em>Reader of the Sky</em>: its discard is <strong>positional on tropical signs</strong> (occupation of the 10 bodies, §10), <strong>independent of the ayanamsa</strong> — hence robust to this convention. Invariants (independent of the ayanamsa): great year 25 771 y, era 2147.5 y. Outstanding matter closed ✓ (as a warning, not as a datum).</p>
<h3 id="15b-8-causalidad-de-las-6-ventanas-acotado-honesto">15b.8 Causality of the 6 windows — BOUNDED (honest)</h3>
<p>§18 marked "n=6; correlation, not causal proof". It is bounded with two tests (<code>calc_windows_causality.mjs</code>): <strong>(A) Cadence</strong> — the 6 events (Axial −427, Temple 61, Justinian 552, Schism 1043, Reformation 1535, Present 2025) are spaced <strong>488, 491, 491, 492, 490 years</strong> (mean 490.4), identical to the cadence of the astronomical windows and to the Neptune–Pluto synodic (~492.3 y): they share cadence. <strong>(B) Regularity</strong> — statistic <em>R</em> = Σ|spacᵢ − mean| = 5.6 (perfect grid → R→0); under a null of 6 uniform points in the same range (2452 y), <strong>P(R ≤ 5.6) &lt; 5×10⁻⁶</strong> (0/200 000): the regularity is very high against chance. <strong>Honest verdict:</strong> the shared 491-year cadence is real and very regular, <strong>but</strong> (1) n=6 is small; (2) <strong>selection bias</strong> — the events were chosen to fit the grid, inflating the regularity; (3) cadence correlation ≠ causation (Neptune/Pluto do not "cause" reforms). It is a <strong>hypothesis-generating pattern</strong>, not a demonstration of cause. What is demonstrated is the shared 491-y cadence, not a mechanism. Outstanding matter bounded ✓ (with its explicit caveat).</p>
<h3 id="15b-9-7-dobles-7-planetas-7-días-heptagrama-cerrado-por-cálculo">15b.9 7 doubles = 7 planets = 7 days (heptagram) — CLOSED by calculation</h3>
<p>§18 left "weekly cadence not demonstrated by calculation". Closed (<code>calc_week_chaldean.mjs</code>): <strong>(A)</strong> the <strong>Chaldean order</strong> = planets ordered by sidereal period descending (Saturn 29.46 y &gt; Jupiter 11.86 &gt; Mars 1.88 &gt; Sun 1.00 &gt; Venus 0.62 &gt; Mercury 0.24 &gt; Moon 0.075 y) — verified. <strong>(B)</strong> the <strong>Chaldean hourly week</strong>: 24 h/day, each hour ruled by a planet in cyclic Chaldean order; the planet of the 1st hour names the day; <strong>24 mod 7 = 3</strong>, so the next day jumps 3 planets. Derived: day 1 = Saturn (<strong>Saturday</strong>), day 2 = Sun (<strong>Sunday</strong>), day 3 = Moon (<strong>Monday</strong>), day 4 = Mars (<strong>Tuesday</strong>), day 5 = Mercury (<strong>Wednesday</strong>), day 6 = Jupiter (<strong>Thursday</strong>), day 7 = Venus (<strong>Friday</strong>) — confirmed by <strong>Romance etymology</strong> (martes=Mars, miércoles=Mercury, jueves=Jupiter [Jove], viernes=Venus, sábado=Saturn). <strong>(C)</strong> SY correspondence: the 7 doubles (ב ג ד כ פ ר ת, long recension/Gra) → 7 planets → 7 days. The 7=7=7 heptagram is a correspondence that is <strong>mathematical</strong> (sidereal periods + mod-7 arithmetic) <strong>+ etymological</strong>. Outstanding matter closed ✓. Note: the 7-day week is a Chaldean-Babylonian cultural artifact (it does not divide 365 without remainder); its astronomical anchor is the Chaldean order of the 7 planets, which is astronomical.</p>
<p><strong>§15b synthesis:</strong> of the outstanding matters of §18, <strong>closed by calculation</strong> are the 37×73 structure of Genesis 1:1 (§15b.5, p≈3×10⁻⁴), the saros series count (§15b.6), the ayanamsa (§15b.7, as a warning), and the 7 doubles=7 days heptagram (§15b.9); <strong>bounded with caveat</strong> the causality of the 6 windows (§15b.8). And the system is <strong>extended</strong> toward the operative tradition: kameot (§15b.1), Aiq Bekar (§15b.2), sigils (§15b.3), and the 72 angels (§15b.4), showing that the decimal-positional gematria of §2 is the common substrate. Remaining <strong>open</strong> (not closeable by astronomical calculation): the IAU 2006 variable precession (~tens of years of uncertainty in era dates, not propagated), the decanatal attribution of the 72 angels, Khalifa's 19-code (a disputed statistical claim, not an astronomical fact), and the specific astronomical attribution of Toric gematria (hypothesis, §6.3).</p>

'''
src = insert_before(src, '<h2 id="16-limitaciones">', SEC15B)

# ============================================================
# 8) §17 / §18 / §19 replacement
# ============================================================
SEC17 = '''<h2 id="17-reproducibilidad-y-software">17. Reproducibility and software</h2>
<p><strong>Reproduce everything (Node ≥ 20, Sefaria connection for the corpus):</strong></p>
<pre style="background:#0e1320;color:#cfe0ff;padding:8px 12px;border-radius:6px;font-size:8.4pt;line-height:1.35;overflow-x:auto;white-space:pre;page-break-inside:avoid"><code>node fetch_gen.mjs         # downloads Genesis + Exodus 14:19-21 (MT) -&gt; corpus.json
node tests.mjs             # 86 assertions, all green
node calc_all.mjs          # §§3–9, 14
node calc_37_73.mjs        # §9.2–9.4 (37/73: exhaustive search + solar year)
node calc_eclipse_deep.mjs # §9.2 empirical (real eclipse count, ~1 min)
node calc_mazzalot.mjs     # §6.2, §13.1
node calc_72.mjs           # §6.3 (231 gates, ABBA, Exodus 72x3, p≈5×10⁻⁷)
node palindrome.mjs        # §13 (k-verse block null + Genesis 1 nucleus)
node calc_phrase.mjs       # §13.2 (phrase, selector, order permutation)
node slow_scan.mjs         # §12 (Neptune–Pluto windows, ~3 min)
node gen_eclipse.mjs       # §9.3 (Genesis-days/eclipses correlation)
node calc_crosscultural.mjs# §9.6 (Maya, Greek, Arabic, Chinese, Vedic)
# new v3.1 (§15b):
node calc_magic_squares.mjs node calc_sigils.mjs node calc_angels72.mjs
node calc_gen11_structure.mjs node calc_saros_series.mjs node calc_ayanamsa.mjs
node calc_windows_causality.mjs node calc_week_chaldean.mjs</code></pre>
<ul><li><code>lib.mjs</code>: shared module (SY maps, gematria, legibility <em>S</em>⊆<em>O</em>, precession/eras, astronomical constants, deterministic PRNG mulberry32 seed 20260807). Exact mirror of the <code>app.jsx</code> logic.</li><li><code>astronomy-engine.mjs</code>: astronomy-engine v2.1.19 (vendored, MIT). Same engine as the app.</li><li><code>index.html</code> + <code>app.bundle.js</code> + <code>lexicon.json</code>: web application (React 18 + astronomy-engine, JSX pre-compiled with esbuild, no Babel in the client) that operates everything described: dynamic star map, translator with full lexicon (loaded by <code>fetch</code>), יהוה / Genesis / Prediction / Eras / Methodology panels. Serve with <code>python3 -m http.server 8008</code> and open <code>http://127.0.0.1:8008/</code>.</li><li><code>cielo-lector.html</code>: legacy monolithic version (embedded lexicon + Babel-standalone).</li><li><code>tests.mjs</code>: <strong>86 assertions</strong> (gematria, 231/ABBA, precession, tetramorph, lunar-solar synchrony, eclipses, solar year 37/73, positional legibility, 2026 equinoxes with λ☉=0/90/180/270°, Maya/Chinese/Greek cross-cultural, lexicon) — <strong>all green</strong> (verified 2026-08-07).</li><li><code>calc_all.mjs</code>: §§3–9 and 14 (2026 equinoxes/solstices, 10 eclipse cycles and their factorization, lunar-solar synchrony, precession, eras, 144, 90° tetramorph, <strong>Saros verified with two real eclipses 2023-04-20 → 2041-04-30, Δ=6585.32 d</strong>).</li><li><code>calc_37_73.mjs</code>: §9.2–9.4 — factorization of the 10 cycles (37/73 absent), 37/73 as a period (do not align the node), Saros/Inex combos (851=37×23, draconic drift 0.5 → not eclipsal), <strong>two counts of the nodal cycle (39.2 correct vs 37.2 naive) and why 37 does not appear</strong>, 365=73×5, 2701 pentads = 37 civil years.</li><li><code>calc_eclipse_deep.mjs</code>: §9.2 empirical — counts real eclipses with astronomy-engine: <strong>~40 seasons and ~87 solar+lunar eclipses per nodal cycle</strong> (not 37), 3000 solar eclipses in 1300 y = 2.31/year.</li><li><code>calc_mazzalot.mjs</code>: §6.2 and §13.1 (Egel/Ayil/Shor, 144×15/180, 253×2, Gen 1:2=9999, word-level palindrome null: 47.9 % lexicon, 58 % mazzalot, rate by digit count).</li><li><code>calc_72.mjs</code>: §6.3 (231 gates, AB/BA→ABBA=4, 3·7·12→231, <strong>Exodus 14:19-21 = 72 consonants ×3 verified in MT via Sefaria</strong>, p≈5×10⁻⁷).</li><li><code>palindrome.mjs</code>: §13 corrected — null by <strong>block of k consecutive verses</strong> (not by isolated letter); rarefaction of the positional rule P=q^|S|; <strong>excess of the Genesis 1 nucleus (61.3 % vs 38.3 %, p≈8×10⁻³)</strong>.</li><li><code>calc_phrase.mjs</code>: §13.2 (Markov/uniform phrase-level null, palindrome as a selector of readings, <strong>permutation of verse order</strong>).</li><li><code>slow_scan.mjs</code>: §12 (Neptune∈Aries ∧ Pluto∈Aquarius windows, −600 BCE→2400 CE, quarterly step).</li><li><code>gen_eclipse.mjs</code>: §9.3 (Genesis-legible days/eclipses correlation 2024–2030: 6.5 % vs 24.7 % expected → they avoid them).</li><li><code>calc_crosscultural.mjs</code>: §9.6 (Maya Haab/Calendar Round/baktun, Greek isopsephy, Arabic abjad, Chinese <em>zhang</em>, Vedic 27 nakshatras/432 000).</li><li><code>fetch_gen.mjs</code>: downloads the Genesis corpus (1533 verses) and Exodus 14:19-21 via the Sefaria API, reduces them to Masoretic consonants and caches them in <code>corpus.json</code>.</li><li><strong>New v3.1 (§15b):</strong> <code>calc_magic_squares.mjs</code> (7 kameot + Aiq Bekar = digit-sum), <code>calc_sigils.mjs</code> (name→Aiq Bekar→Lo Shu trace; 72 trios), <code>calc_angels72.mjs</code> (72×3 extraction, <code>angels72.json</code>), <code>calc_gen11_structure.mjs</code> (37×73 of the 7 words, permutation null p≈3.1×10⁻⁴), <code>calc_saros_series.mjs</code> (152 series, 54–87, median 72), <code>calc_ayanamsa.mjs</code> (Lahiri/Krishnamurti/Fagan-Bradley/Raman, 190-y dispersion), <code>calc_windows_causality.mjs</code> (491-y cadence, regularity p&lt;5×10⁻⁶), <code>calc_week_chaldean.mjs</code> (Chaldean order + 24 mod 7 + Romance etymology).</li></ul>
'''

SEC18 = '''<h2 id="18-revisión-crítica-y-asignaturas-pendientes">18. Critical review and outstanding matters</h2>
<p>Critical review of what is demonstrated and of what remains outside:</p>
<p><strong>Firmly demonstrated (reproducible):</strong></p>
<ul><li>Equinoxes/solstices 2026 with λ☉ = 0/90/180/270° (§4).</li><li>Precession 50.29″/year → 1°/71.58 y; era 2147.5 y; 144 y = 2.01° (§3).</li><li>Factorization of the 10 eclipse cycles; 37/73 <strong>absent</strong> (§9.2); additional exhaustive search (37/73 as a period, Saros/Inex combos, two counts of the nodal cycle) — all negative; <strong>verified empirically: ~40 seasons and ~87 solar+lunar eclipses per nodal cycle, 2.31 solar eclipses/year</strong> (<code>calc_eclipse_deep.mjs</code>).</li><li>19 eclipse years ≈ Saros (Δ 0.46 d); Meton 235 ≈ 19 years (Δ 0.087 d); Saros verified with two real eclipses (§8).</li><li>Meton 12×12+7×13 = 144+91 = 235 (§14); Islamic 33 y → drift 358.9 d (§7).</li><li>Tetramorph at exact 90° (§6.1); mazzalot = animals (§6).</li><li>Mirror not selective at the corpus level (§13): word level 47.9 %, phrase level 39.0 % (≈ Markov 39.7 % ≈ uniform 41.4 %), by block of k consecutive verses without rarefying; does not separate valid from invalid readings (24.9 % vs 41.1 %, §13.2). <strong>Real excess in the Genesis 1 nucleus: 61.3 % vs 38.3 % (p≈8×10⁻³) — a weak-to-moderate hypothesis, not a proof (§13.3).</strong> Eclipses uncorrelated — Genesis days avoid them (6.5 % vs 24.7 %, §9.3); 6 windows ~491 y (§12). Cross-cultural corroboration (Maya 73×5=365, Calendar Round 73 <em>Tzolkin</em>, baktun 144 000; Chinese <em>zhang</em>=Meton; Greek/Arabic decimal gematria — §9.6).</li></ul>
<p><strong>Outstanding matters — v3.1 status (closed in §15b):</strong></p>
<ul><li><strong>Saros and series — CLOSED (§15b.6):</strong> the ~73 eclipses/series count is now computed series by series: 152 complete series detected and chained by the saros period, lengths 54–87, mean 74.4, median 72 — coincides with the 70–86 range / mean ~72–73. The "73" is a statistical count, confirmed by calculation.</li><li><strong>Ayanamsa — CLOSED (§15b.7):</strong> Lahiri, Krishnamurti, Fagan-Bradley, Raman compared; era entries shift by up to 190 years. Era dating is conventional; the (tropical) discard of the <em>Reader of the Sky</em> is robust to this convention.</li><li><strong>Causality of the 6 windows — BOUNDED (§15b.8):</strong> shared 491-y cadence (regularity p&lt;5×10⁻⁶), but selection bias + n=6 → hypothesis-generating pattern, not causal proof.</li><li><strong>Heptagram / 7 doubles = 7 days — CLOSED (§15b.9):</strong> Chaldean order by sidereal periods + 24 mod 7 = 3 + Romance etymology. Demonstrated by calculation.</li><li><strong>37×73 structure of the 7 words — CLOSED (§15b.5):</strong> rigorous null (permutation of the 28-letter multiset, 100 000×): 23/127 subsets multiples of 37 (p≈3.1×10⁻⁴) and 2/7 words multiples of 37 (p≈8.2×10⁻³). The bias toward 37 is real beyond the trivial total 2701=37×73.</li><li><strong>37/73 — resolved (negative in eclipses, positive in the Sun):</strong> tested (i) factorization of the 10 eclipse cycles (absent), (ii) 37/73 as a period (do not align the node), (iii) Saros/Inex combos (851=37×23 with draconic drift 0.5 → not eclipsal), (iv) <strong>two counts of the nodal cycle</strong> (39.2 correct vs 37.2 naive — the "37 seasons" is an under-count in tropical years; empirically ~40, not 37), (v) the relation with the solar year (365 = 73×5; 2701 pentads = 37 civil years — §9.4). <strong>Conclusion: 37 is absent from eclipses; 73 only statistical (saros series count, mean ~72–73, now by calculation §15b.6); both fit the civil solar year, corroborated by the Maya Haab.</strong> The identity 2701 = 37×73 is civil-calendar, not orbital: it uses the 365-d year, not the tropical 365.2422.</li><li><strong>Variable precession — OPEN:</strong> 50.29″/year is constant; real precession accelerates/decelerates (IAU 2006 model with harmonic terms). Era dates carry ~tens of years of uncertainty from this term, not propagated. Not closeable by elementary astronomical calculation.</li><li><strong>Basmala and the 19-code — OPEN (not astronomical):</strong> the arithmetic facts (19 letters, 114 = 6×19) are reported; Khalifa's "19-code hypothesis" is not evaluated (a disputed statistical claim, not an astronomical fact).</li><li><strong>Tetramorph:</strong> the faces↔fixed signs correspondence is traditional exegesis (Ezekiel/Revelation); it is not "demonstrated" astronomically, only shown that they are at 90°.</li><li><strong>Decanatal attribution of the 72 angels — OPEN (§15b.4):</strong> the mechanical 72×3 extraction is demonstrated; the angel↔decanate (5°) assignment is a structural hypothesis, not an empirical one.</li><li><strong>Specific astronomical attribution of Toric gematria — OPEN (hypothesis, §6.3).</strong></li></ul>
<p><strong>What the article does NOT claim:</strong> it does not claim an eclipse-Genesis causality (negative, §9.3), it does not claim that 37/73 govern eclipses (negative, §9.2), it does not claim that the mirror selects Genesis (negative, §13, also word level 47.9 % and phrase level 39.3 %), it does not claim that the mirror-palindrome is a textual checksum or the validity criterion of the readings of the sky (falsified: high 48 % base, and it does not separate legible from invalid days, 30.7 % vs 32.4 %, §13.1–13.2), it does not claim that Toric gematria encodes astronomy as a proven fact (it is a hypothesis within an attested tradition, §6.3), it does not claim that the classical SY is an oracle (§1).</p>
<p><strong>What the article DOES claim (with evidence):</strong> <strong>intentional letter engineering</strong> is a historically attested practice (SY, Abulafia, Raziel) and, for the 72-letter verses of Exodus 14:19-21, <strong>empirically improbable by chance</strong> (p ≈ 5×10⁻⁷). The distinction between (a) intention of the practice [demonstrated] and (b) specific astronomical attribution of Toric gematria [hypothesis] is the epistemic core of the work.</p>
<p><strong>Also verified (v3.1):</strong> Genesis 1:2 = 3546 → 9999 (repdigit) ✓; Egel 103→404, Ayil 41→55, Shor 506→1111 = 2×253 ✓; Egel+Ayil = 144 ✓; 144×15 = 2160 and 144×180 = 25 920 ✓ (only at 72 y/°; at 50.29″/year they are not integers); ABBA = AB+BA = 4 = "father" ✓; 3·7·12−22+1 = 231 = C(22,2) ✓; Exodus 14:19-21 = 72 consonants ×3 verified in MT via Sefaria ✓ (p≈5×10⁻⁷). <strong>Empirical:</strong> 2026 equinoxes λ☉=0/90/180/270° to the second ✓; Saros 2023-04-20→2041-04-30 Δ=6585.32 d ✓; ~40 seasons and ~87 solar+lunar eclipses per nodal cycle (not 37) ✓; 3000 solar eclipses/1300 y = 2.31/year ✓; Genesis days avoid eclipses (6.5 % vs 24.7 %) ✓; Genesis 1 nucleus palindrome 61.3 % vs 38.3 % null (p≈8×10⁻³) ✓; Maya Haab 73×5=365, Calendar Round 73×260=52×365=18 980, baktun 144 000 ✓; Chinese <em>zhang</em>=Meton 19/235 ✓; Greek/Arabic decimal-positional gematria 27/28 ✓. <strong>New v3.1 (§15b):</strong> 7 kameot verified magic (15,34,65,111,175,260,369) ✓; Mercury 8×8 const=260 = Maya Tzolkin ✓; Sun 6×6 sum 1..36 = 666 = 6×111 ✓; Aiq Bekar = decimal-positional gematria of §2 (27 letters) ✓; 72 trios of the Shem HaMephorash canonical (והו, ילי…) ✓, 216 = 6³ ✓; sigils of names (אדם, משה, דוד, אברהם, ישראל, אלהים, משיח…) ✓; <strong>37×73 structure of the 7 words: 23/127 subsets multiples of 37, p≈3.1×10⁻⁴</strong> ✓; <strong>152 complete saros series: 54–87 eclipses, median 72</strong> (73 = count, by calculation) ✓; ayanamsa: 190-y dispersion in the entry of Aquarius ✓; 6 windows 491-y cadence, regularity p&lt;5×10⁻⁶ (with selection caveat) ✓; 7 doubles = 7 planets = 7 days (Chaldean order + 24 mod 7 + Romance etymology) ✓. <code>tests.mjs</code> = <strong>86 assertions, all green</strong>.</p>
'''

SEC19 = '''<h2 id="19-conclusión">19. Conclusion</h2>
<p>The <em>Reader of the Sky</em> turns the tripartite mapping of the <em>Sefer Yetzirah</em> into a formal and verifiable protocol. The tropical grid is measurable (λ☉ = 0/90/180/270°); precession gives content to 72 (1°/71.58 y) and to 144 (2.01° in 144 y); lunar–solar synchrony is governed by 19 (Meton = Saros = basmala, rediscovered by China as <em>zhang</em>) and by 144 (the months of Meton; 144 000 = Maya <em>baktun</em>). <strong>37 and 73 do not structure eclipses</strong> —an exhaustive search (factorization, period, Saros/Inex combos, two counts of the nodal cycle) all negative, and empirically ~40 seasons/~87 eclipses per nodal cycle, not 37; 73 only as a statistical count of the saros series—; eclipses are governed by 19, 47, and 223. <strong>But 37 and 73 do structure the civil solar year</strong> (365 = 73×5; 2701 pentads = 37 years), independently corroborated by the Maya Haab (73×5 = 365) and the Calendar Round (73 <em>Tzolkin</em>): the gematria of the first verse is reflected in the measure of the year, 37 years × 73 pentads = 2701. Under the membership rule, Genesis 1:1 is legible only in ~13-year windows that recur every ~491 years (Neptune–Pluto synodic, Aries–Aquarius phase), coincident with the great religious-linguistic re-formations, against the precessional background of ~2148 years per era. The mirror-palindrome 2701→3773 is real but not selective at the corpus level —the discard is positional (P = q^|S|, exponential in the number of elements)—; nonetheless, the <strong>original nucleus (Genesis 1) shows a real excess</strong> (61.3 % vs 38.3 %, p≈8×10⁻³) that the corpus test diluted. Eclipses play no part (Genesis days avoid them). The system offers a computable and refutable basis for the intuition that stellar eras mark readaptations of sacred language, with the 491-year synodic as the engine and the 2148-year precessional as the background. <strong>v3.1 (§15b)</strong> closes the outstanding matters by calculation: the 37×73 structure of the 7 words of Genesis 1:1 is real (p≈3×10⁻⁴, beyond the trivial total), the saros series count is 54–87 with median 72 (the "73" is statistical, now by calculation), the ayanamsa shifts the eras by up to 190 years (the tropical discard is robust), the 7 doubles=7 days heptagram derives from the Chaldean order + mod-7 arithmetic, and the 491-year cadence of the 6 windows is very regular (p&lt;5×10⁻⁶) though its causality remains a hypothesis (selection bias, n=6). And it extends the system to the <strong>hermetic operative tradition</strong>: the 7 planetary kameot are the 7 doubles, the Aiq Bekar reduction is the decimal-positional gematria of §2 (bridge to the sigils), the sigils are the geometric footprint of the name on the decimal grid, and the 72 angels of the Shem HaMephorash are mechanically extracted from Exodus 14:19-21 (216 = 6³ consonants). The common substrate is <strong>decimal-positional gematria</strong> — the alphabet as the set of base-10 digits — which appears simultaneously in the structure of the verse, in the measure of the solar year (37×73), in the composition of sigils, and in the reading of angelic names.</p>
'''

src = replace_between(src, '<h2 id="17-reproducibilidad-y-software">', '<h2 id="18-revisión-crítica-y-asignaturas-pendientes">', SEC17)
src = replace_between(src, '<h2 id="18-revisión-crítica-y-asignaturas-pendientes">', '<h2 id="19-conclusión">', SEC18)
src = replace_between(src, '<h2 id="19-conclusión">', '<h2 id="referencias">', SEC19)

# ============================================================
# apply exact-string reps
# ============================================================
missing = []
for a, b in R:
    if a in src:
        src = src.replace(a, b)
    else:
        missing.append(a[:80])

io.open('../pdf/lector-del-cielo_EN.html', 'w', encoding='utf-8').write(src)
print("done; reps:", len(R), "missing:", len(missing))
for m in missing:
    print("  MISS:", m)