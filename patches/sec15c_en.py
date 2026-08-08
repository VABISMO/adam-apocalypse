#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Insert §15c (English) + Fig 11 (zodiacal scroll) + Fig 12 (New Jerusalem cube)
into lector-del-cielo_EN.html before <h2 id="16-limitaciones">."""
import io, shutil

SRC = "../pdf/lector-del-cielo_EN.html"
BAK = "../backups/lector-del-cielo_EN.html.bak-pre-15c"
with io.open(SRC, "r", encoding="utf-8") as f:
    src = f.read()
shutil.copyfile(SRC, BAK)

ANCHOR = '<h2 id="16-limitaciones">16. Limitations</h2>'
assert ANCHOR in src, "anchor not found"

def fig11():
    signs = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓']
    p = []
    p.append('<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Zodiacal scroll rolling up">')
    p.append('<rect x="0" y="0" width="600" height="240" fill="#0e1320"/>')
    p.append('<text x="300" y="22" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#cfe0ff">Rev 6:14 — the sky as a scroll that rolls up</text>')
    p.append('<defs><g id="star11"><polygon points="0,-6 1.4,-2 6,-2 2.2,1 3.6,5 0,2.5 -3.6,5 -2.2,1 -6,-2 -1.4,-2" fill="#cfe0ff"/></g></defs>')
    # left rolled end
    p.append('<circle cx="50" cy="120" r="16" fill="none" stroke="#3a4762" stroke-width="1.4"/>')
    p.append('<circle cx="50" cy="120" r="9" fill="none" stroke="#3a4762" stroke-width="1"/>')
    # zodiac band: 12 cells from x=66 to x=366 (300 wide, 25 each)
    p.append('<rect x="66" y="95" width="300" height="50" rx="3" fill="#10182a" stroke="#3a4762" stroke-width="1.2"/>')
    for k in range(1, 12):
        x = 66 + 25 * k
        p.append('<line x1="%g" y1="95" x2="%g" y2="145" stroke="#283145" stroke-width="0.6"/>' % (x, x))
    for k, g in enumerate(signs):
        x = 66 + 25 * k + 12.5
        p.append('<text x="%g" y="126" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#cfe0ff">%s</text>' % (x, g))
    # band rolls into a spiral at the right
    p.append('<path d="M366,120 C 396,120 410,108 416,96 A 26 26 0 1 1 416 144 C 408,150 396,150 380,140" fill="none" stroke="#3a4762" stroke-width="1.4"/>')
    p.append('<circle cx="416" cy="120" r="26" fill="none" stroke="#3a4762" stroke-width="1.2"/>')
    p.append('<circle cx="416" cy="120" r="17" fill="none" stroke="#3a4762" stroke-width="0.9"/>')
    p.append('<circle cx="416" cy="120" r="8" fill="none" stroke="#3a4762" stroke-width="0.7"/>')
    # Alpha at the start, Omega at the roll
    p.append('<text x="50" y="126" text-anchor="middle" font-family="serif" font-size="17" fill="#ffcf6a">Α</text>')
    p.append('<text x="416" y="100" text-anchor="middle" font-family="serif" font-size="17" fill="#ffcf6a">Ω</text>')
    # stars falling out of the roll
    for (x, y) in [(430, 150), (455, 165), (478, 178)]:
        p.append('<line x1="%g" y1="%g" x2="%g" y2="%g" stroke="#283145" stroke-width="0.5"/>' % (x, y, x + 10, y + 16))
    for (x, y) in [(430, 150), (455, 165), (478, 178), (445, 195), (500, 150), (470, 200), (515, 172)]:
        p.append('<use href="#star11" x="%g" y="%g"/>' % (x, y))
    p.append('<text x="588" y="212" text-anchor="end" font-family="sans-serif" font-size="8" fill="#8aa0c0">stars = letters that fall</text>')
    p.append('<text x="300" y="232" text-anchor="middle" font-family="sans-serif" font-size="8.5" fill="#7fb0ff">the Lamb opens the book = the Lector Caeli  ·  the sky is a βιβλίον</text>')
    p.append('</svg>')
    svg = ''.join(p)
    return ('<figure class="fig" id="fig11"><div class="fig-frame">' + svg + '</div>'
            '<figcaption><span class="fnum">Fig. 11.</span> Rev 6:14 — the zodiacal band (the 12 simples) as a written scroll that rolls up; the stars (the constellation-letters) fall out of their seats. "I am the Alpha and the Omega" = the bounds of the alphabet = the cosmos as text. The Lamb who opens the sealed scroll is the one who can read the sky as a book — the Lector Caeli.</figcaption></figure>')

def fig12():
    p = []
    p.append('<svg viewBox="0 0 440 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="New Jerusalem cube of 12">')
    p.append('<rect x="0" y="0" width="440" height="340" fill="#0e1320"/>')
    p.append('<text x="220" y="22" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#cfe0ff">Rev 21 — the New Jerusalem = the 12-cube</text>')
    p.append('<polygon points="220,87 287.5,126 220,165 152.5,126" fill="#14223a" stroke="#3a4762" stroke-width="1.2"/>')
    p.append('<polygon points="287.5,126 287.5,204 220,243 220,165" fill="#0e1320" stroke="#3a4762" stroke-width="1.2"/>')
    p.append('<polygon points="152.5,126 220,165 220,243 152.5,204" fill="#11192a" stroke="#3a4762" stroke-width="1.2"/>')
    p.append('<text x="220" y="120" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffcf6a">12</text>')
    p.append('<text x="300" y="168" text-anchor="start" font-family="sans-serif" font-size="7.5" fill="#8aa0c0">12 000 stadia</text>')
    p.append('<text x="160" y="168" text-anchor="end" font-family="sans-serif" font-size="7.5" fill="#8aa0c0">wall 144 = 12²</text>')
    p.append('<text x="220" y="156" text-anchor="middle" font-family="sans-serif" font-size="7.5" fill="#8aa0c0">cubit</text>')
    p.append('<line x1="150" y1="262" x2="290" y2="262" stroke="#3a4762" stroke-width="1"/>')
    for k in range(12):
        x = 153 + 11.5 * k
        p.append('<line x1="%g" y1="259" x2="%g" y2="265" stroke="#7fb0ff" stroke-width="1"/>' % (x, x))
    p.append('<text x="220" y="278" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#7fb0ff">12 gates (3 × 4 sides)</text>')
    p.append('<text x="220" y="292" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#8aa0c0">12 foundations (apostles)</text>')
    p.append('<text x="220" y="312" text-anchor="middle" font-family="sans-serif" font-size="8.5" fill="#cfe0ff">144 000 sealed = 12² × 10³   ·   12³ = 1 728   ·   cube = 3 mothers × edge 12 (simples)</text>')
    p.append('<text x="220" y="328" text-anchor="middle" font-family="sans-serif" font-size="7.5" fill="#8aa0c0">144 = 12² (Meton 144+91 = 235 · Maya baktun 144 000 · Rev 7 sealed)</text>')
    p.append('</svg>')
    svg = ''.join(p)
    return ('<figure class="fig" id="fig12"><div class="fig-frame">' + svg + '</div>'
            '<figcaption><span class="fnum">Fig. 12.</span> Rev 21 — the New Jerusalem is a cube of edge 12,000 stadia (the 3 mothers = the 3 dimensions × edge 12 = the simples; 12³ = 1728), walled in 144 = 12² cubits, with 12 gates + 12 foundations = 24 (= 12 tribes + 12 apostles). The 144,000 sealed = 12² × 10³ = (zodiac)² × (millennium = 10 sefirot cubed).</figcaption></figure>')

SEC15C = (
'<h2 id="15c-apocalipsis-el-cielo-como-pergamino-sellado">15c. Revelation: the sky as a sealed scroll</h2>'
'<p>A structural reading, not a confessional exegesis. Revelation (c. 95 CE) emerges from the same milieu as the textualized Sefer Yetzirah (merkabah + creator-letters + 360/7/12 calendar). What follows maps the numbers of Revelation onto the 3/7/12 arithmetic of the SY: the numbers are in the text (verifiable); the mapping is interpretive (it does not claim that John read the SY — they converge without borrowing).</p>'
'<h3 id="15c-1-el-cielo-texto-a-o-y-el-pergamino-que-se-enrolla">15c.1 The sky-text: Α, Ω, and the scroll that rolls up</h3>'
'<p>Rev 6:14: "the sky vanished like a scroll that is being rolled up, and every mountain and island was removed from its place", preceded by "the stars of the sky fell to the earth as the fig tree sheds its winter fruit". The sky is a <strong>book</strong> (βιβλίον); the stars are the <strong>letters</strong>; rolling up the scroll = the zodiac band (the 12 simples) closing and the letters coming loose from their seats. "I am the Alpha and the Omega, the first and the last" (Rev 1:8; 21:6; 22:13) = the bounds of the alphabet = the totality of the letters = the cosmos as text. In the SY this is literal: "with 22 letters He formed the whole of His creation." The Lamb who takes the sealed scroll and opens it (Rev 5) is the one who can <strong>read the sky as a book</strong> = the <em>Lector Caeli</em>.</p>'
+ fig11() +
'<h3 id="15c-2-los-7-sellos-y-las-7-trompetas-letra-y-voz">15c.2 The 7 seals and the 7 trumpets = letter and voice</h3>'
'<p>The SY calls its 7 doubles (ב ג ד כ פ ר ת) letters "with two tongues": each has two pronunciations (stop/fricative, e.g. ב = b/v). The same letter exists in two modalities: <strong>inscribed, silent</strong> and <strong>sounded, voiced</strong>. The 7 seals = the 7 doubles as <strong>inscribed, closed letters</strong> (σφραγίς = seal); the seventh seal is <strong>silence in heaven for half an hour</strong> (Rev 8:1) = the silent letter, the seventh = the Sabbath = the rest of the 7th double (§15b.9: 7 doubles = 7 days, the 7th = Sabbath). The 7 trumpets = the 7 doubles as <strong>voice, sound, the shofar</strong>: they sound only after the seventh seal, because the letter is read first and then made to sound. Seal→trumpet = letter→voice, the engraved/sounded duality of the SY. The Lamb who opens them is himself <strong>7 horns + 7 eyes + 7 spirits</strong> (Rev 5:6): the triple-7, the 7 in its three modes.</p>'
'<h3 id="15c-3-el-21-c7-2">15c.3 The 21 = C(7,2)</h3>'
'<p>Revelation has three heptads of judgments: 7 seals + 7 trumpets + 7 bowls = <strong>21</strong>. And 21 = <strong>C(7,2) = 7×6/2</strong> = the number of distinct pairs among the 7 doubles. The 231 gates of the SY are C(22,2) for the whole alphabet; at the level of the 7 doubles, C(7,2) = 21 = the 21 two-by-two combinations. There is moreover a <strong>fourth</strong> heptad, the 7 thunders (Rev 10), which are <strong>sealed and not written down</strong>: the hidden 7. 21 revealed + 7 hidden = <strong>28</strong> = the 28 lunar mansions / the abjad. Counting the 7 churches at the start, there are 5 heptads (35 = 5×7); 4 revealed (28) + 1 sealed (7).</p>'
'<h3 id="15c-4-los-12-el-144-000-y-el-cubo-de-12">15c.4 The 12, the 144,000, and the cube of 12</h3>'
'<p>The 144,000 sealed (Rev 7:4; 14:1) = 12 × 12,000 = the <strong>12 simples</strong> sealed (σφραγίς, the same word as the 7 seals) on the forehead; the seal = the signature = the letter. 144 = 12². The city wall = <strong>144 cubits</strong> (Rev 21:17) = 12². The New Jerusalem is a <strong>cube</strong> of edge 12,000 stadia (Rev 21:16): the cube = the <strong>3 mothers</strong> (the 3 dimensions) × edge <strong>12</strong> (the simples); 12³ = 1728. And 144,000 = 12² × 1,000 = <strong>(zodiac)² × millennium</strong>, where the millennium (1,000, Rev 20) = 10³ = the 10 sefirot cubed. Thus 144,000 = 12² × 10³. Cross-cultural convergence: 144,000 = the sealed of Revelation, the Maya baktun (144,000 days), and 144 = 12² in Meton (12×12+7×13 = 144+91 = 235); the 12² unifies all three.</p>'
'<p>Around the throne (Rev 4): 24 elders + 4 living creatures = <strong>28</strong>. The 24 = 12 tribes + 12 apostles = the 12 doubled; the 4 living creatures = the tetramorph (lion/ox/man/eagle). 24+4 = 28 lunar mansions. And the 4 = ⅓ of 12 = one triplicity.</p>'
'<p>The <strong>judgment fractions</strong> climb in twelfths: the horsemen (4th seal) are given authority over <strong>¼</strong> of the earth (Rev 6:8); the trumpets strike <strong>⅓</strong> of the sea, rivers, sun-moon-stars, mankind (Rev 8:7-12; 9:15); the bowls strike <strong>the whole</strong> (Rev 16). In twelfths: ¼ = 3/12 → ⅓ = 4/12 → 1 = 12/12; each heptad raises the fraction by 1/12 = one zodiacal sign. The ⅓ = 4/12 = one triplicity (one element). And the dragon (Rev 12:4) sweeps <strong>a third of the stars</strong> with its tail: the same ⅓ = the unseated triplicity. "The sky rolls up and the stars fall" (6th seal) and "the dragon sweeps ⅓ of the stars" (Rev 12) are the same event from two sides.</p>'
+ fig12() +
'<h3 id="15c-5-el-3-medio-heptad-el-dominio-de-la-bestia">15c.5 The 3½ = the half-heptad = the domain of the beast</h3>'
'<p>The "time of the beast" = 3½ everywhere: the beast is given 42 months of authority (Rev 13:5); the woman is nourished 1,260 days = "a time, times, and half a time" (Rev 12:6,14); the two witnesses prophesy 1,260 days and the holy city is trampled 42 months (Rev 11:2-3). 1,260 = 3½ × 360 = <strong>half of 7 × the degree-circle</strong>. The 3½ = the 7 <strong>split</strong> = the broken symmetry. Evil wins exactly the half-7; when the 7th trumpet sounds, "the kingdom of the world has become our Lord\'s" (Rev 11:15): the half-7 yields to the whole 7. Honestly, 3½ is theological, not orbital (1,260 days ≈ 43 synodic months, not a clean eclipse cycle).</p>'
'<p>The beast does not invent numbers: it <strong>parodies</strong> them. The dragon (Rev 12:3) has 7 heads + 7 diadems = it counterfeits the divine 7 (7 spirits/seals); the sea-beast (Rev 13:1) has 10 horns + 10 diadems = it counterfeits the 10 (the 10 sefirot / the 10 commandments); the trio dragon + beast + false prophet = it counterfeits the 3 (the trinity / the 3 mothers). The 7, moreover, is <strong>the same instrument with two voices</strong>: the divine 7 (seals) and the beast\'s 7 (7 crowned heads) are the 7 doubles "with two tongues" sounding the divine or the beast.</p>'
'<h3 id="15c-6-la-isopsefia-del-apocalipsis-verificada-por-calculo">15c.6 The isopsephy of Revelation (verified by calculation)</h3>'
'<p>Revelation 13:18 is the <strong>only verse in the NT that commands a gematria calculation</strong>: "let him who has understanding calculate the number of the beast... 666". And 666 = Σ(1..36) = the constant of the <strong>kamea of the Sun</strong> (§15b.1: the Sun 6×6 sums 1+…+36 = 666 = 6×111). The beast = the solar/material number.</p>'
'<p>Computed by Greek isopsephy (verified):</p>'
'<table><thead><tr><th>name</th><th>value</th></tr></thead><tbody>'
'<tr><td>Ἰησοῦς (Jesus)</td><td><strong>888</strong> = 8×111</td></tr>'
'<tr><td>Χριστός (Christ)</td><td><strong>1480</strong></td></tr>'
'<tr><td>Jesus + Christ</td><td><strong>2368</strong></td></tr>'
'<tr><td>the beast (Rev 13:18)</td><td><strong>666</strong> = 6×111</td></tr>'
'<tr><td>Ἀπολλύων (Apollyon, Rev 9:11)</td><td><strong>1461</strong> = Sothic cycle</td></tr>'
'<tr><td>אבדון (Abaddon, Hebrew)</td><td>63 = 7×9</td></tr>'
'</tbody></table>'
'<p><strong>The 111 family</strong>: 666 = 6×111 (the beast, the 6 that falls short of 7 = the material) and 888 = 8×111 (Christ, the 8 = the eighth day, the beyond-7 = the resurrection). 666/888 = 3/4. The beast and Christ are the same 111 scaled by 6 and by 8.</p>'
'<p><strong>Apollyon = 1461 = the Sothic cycle</strong>: 1461 vague Egyptian years (= 1460 Julian) is the return period of the heliacal rising of <strong>Sirius</strong> (the dog star). And the 5th seal-trumpet where Apollyon appears is <strong>literally</strong> about a star that falls from heaven and opens the abyss (Rev 9:1), and its king bears the Sothic number. The fallen star = Sirius; the destroyer = the cycle of the dog. Rev 9:11 gives the name in <strong>both systems</strong> — Hebrew (Abaddon) and Greek (Apollyon) — a gematria/isopsephy bridge. This closes the "Sothic" item on the list of open findings.</p>'
'<h3 id="15c-7-caveat-epistemico">15c.7 Epistemic caveat</h3>'
'<p><strong>Old and verifiable (attested 1st-2nd c., in the text)</strong>: the numbers 7 / 12 / 144 / 144,000 / 1,260 / 3½ / ¼-⅓-1 / 28 (24+4) and the isopsephy 888-1480-2368-666-1461 (computable today); the motif of the sky-as-a-sealed-book (apocalyptic + merkabah, contemporary with the SY). <strong>Interpretive (reading, not fact)</strong>: the mapping SY 3/7/12 → seals/trumpets/21/144,000/cube/28; the identification Apollyon=Sirius; "beast = parody of the 7/10/3". These are structural and clean, but they do not claim that John read the SY: they share the late-Jewish symbolic cosmos (merkabah + creator-letters + 360/7/12 calendar), so they <strong>converge without borrowing</strong>. The isopsephy 1461=Sothic is an <strong>arithmetic fact</strong>; that John meant to signal Sirius is a <strong>hypothesis</strong> (a strong one, given that the 5th seal is explicitly about a falling star and its king bears the Sothic number, but not a demonstration of intent).</p>'
'<hr/>'
)

src = src.replace(ANCHOR, SEC15C + ANCHOR, 1)
with io.open(SRC, "w", encoding="utf-8") as f:
    f.write(src)
print("OK: §15c + Fig 11/12 inserted into EN HTML before §16")
print("new size:", len(src), "bytes")