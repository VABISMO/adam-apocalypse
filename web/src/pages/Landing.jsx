// pages/Landing.jsx — the home landing page (route '/').
// A hero with a live sky map (today), an auto-advancing slider that uses the panel's
// own graphics + a few compact inline visuals to explain the ideas, feature blocks
// with Font Awesome icons in the corporate palette, the philosophy (rewritten from
// the project's source text in a Sethian / Nag-Hammadi register), and an entry CTA
// that opens a content-notice modal before going to /app.
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { SkyMap } from '../ui.jsx';
import { PrecessionDiagram } from '../tabs/CyclesTab.jsx';
import { WarningModal } from '../components/WarningModal.jsx';
import { skyAt, occupiedLetters } from '../core.jsx';

// Today's date, local — the hero sky map loads the planets of the actual day.
const REF_DATE = (() => {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
})();

// ── Font Awesome icon helper: <Fa n="star" c="gold"/> → <i class="fa-solid fa-star" style="color:var(--gold)"/>
function Fa({ n, c, size, spin }){
  return <i className={'fa-solid fa-' + n + (spin ? ' fa-spin' : '')} style={{ color: c ? ('var(--' + c + ')') : 'var(--txt)', fontSize: size || '1.4rem' }} aria-hidden="true"/>;
}

// ── compact inline slider graphics (each fits the fixed-height slide box) ──

// The reading rule S ⊆ O: a word's simple letters (S) must all fall inside the
// occupied signs (O) for the word to read on that date.
function ReadingRule(){
  return (
    <svg viewBox="0 0 320 240" style={{ width: '100%', height: '100%', maxHeight: 300 }} role="img" aria-label="Reading rule: S is a subset of O">
      <circle cx="135" cy="115" r="92" fill="none" stroke="var(--violet)" strokeWidth="2" opacity=".5"/>
      <text x="135" y="40" textAnchor="middle" fill="var(--violet)" fontSize="13" fontWeight="700">O · occupied signs</text>
      <circle cx="135" cy="115" r="52" fill="rgba(232,200,122,.10)" stroke="var(--gold)" strokeWidth="2"/>
      <text x="135" y="122" textAnchor="middle" fill="var(--gold)" fontSize="22" fontWeight="700">S</text>
      <text x="135" y="148" textAnchor="middle" fill="var(--gold)" fontSize="11">word&apos;s simples</text>
      <text x="160" y="215" textAnchor="middle" fill="var(--txt)" fontSize="16" fontWeight="700">S ⊆ O  →  readable</text>
    </svg>
  );
}

// Gematria — the 22 letters and their values (א=1 … ת=400).
function GematriaTable(){
  const L = [['א',1],['ב',2],['ג',3],['ד',4],['ה',5],['ו',6],['ז',7],['ח',8],['ט',9],['י',10],['כ',20],['ל',30],['מ',40],['נ',50],['ס',60],['ע',70],['פ',80],['צ',90],['ק',100],['ר',200],['ש',300],['ת',400]];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', alignContent: 'center', maxWidth: 340 }}>
      {L.map(([h, v]) => (
        <div key={h} style={{ width: 52, textAlign: 'center', border: '1px solid var(--line)', borderRadius: 8, padding: '5px 2px', background: '#000' }}>
          <div style={{ color: 'var(--gold)', fontSize: '1.25rem', fontWeight: 700 }}>{h}</div>
          <div style={{ color: 'var(--dim)', fontSize: '.72rem' }}>{v}</div>
        </div>
      ))}
    </div>
  );
}

// The 72 triplets of the Shem HaMephorash — Exodus 14:19–21, 72 letters each,
// read columnwise. A numbered, colour-coded 12×6 grid (one colour per source verse).
function ShemGrid(){
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span style={{ color: 'var(--gold)', fontSize: '2.6rem', fontWeight: 800, lineHeight: 1 }}>72</span>
        <span className="muted" style={{ fontSize: '.8rem' }}>triplets · 3 verses × 72 letters</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: 5, width: 330, maxWidth: '100%' }}>
        {Array.from({ length: 72 }, (_, i) => {
          const v = i % 3;
          const bg = v === 0 ? '#8a05ff' : v === 1 ? '#c29eff' : '#00db7c';
          return (
            <div key={i} title={'Triplet ' + (i + 1)} style={{ height: 22, borderRadius: 4, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.58rem', color: '#0a0a0a', fontWeight: 700 }}>{i + 1}</div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 14, fontSize: '.72rem', color: 'var(--dim)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><i style={{ width: 9, height: 9, borderRadius: 2, background: '#8a05ff', display: 'inline-block' }}/>14:19</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><i style={{ width: 9, height: 9, borderRadius: 2, background: '#c29eff', display: 'inline-block' }}/>14:20</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><i style={{ width: 9, height: 9, borderRadius: 2, background: '#00db7c', display: 'inline-block' }}/>14:21</span>
      </div>
      <div className="muted" style={{ fontSize: '.74rem' }}>each triplet +אל / +יה → a 5-letter angel</div>
    </div>
  );
}

// Equidistant letter sequence — skip a fixed number of letters and a word emerges.
function ELSGrid(){
  const letters = ['א','ב','ג','ד','ה','ו','ז','ח','ט','י','כ','ל','מ','נ','ס','ע','פ','צ','ק','ר','ש','ת','א','ב','ג','ד','ה','ו','ז','ח','ט','י','כ','ל','מ','נ','ס','ע','פ','צ','ק','ר','ש','ת'];
  const hits = new Set([4, 9, 14, 19, 24, 29, 34]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(11,1fr)', gap: 3, maxWidth: 340 }}>
        {letters.map((l, i) => (
          <div key={i} style={{ textAlign: 'center', padding: '4px 0', borderRadius: 4, fontSize: '.85rem', color: hits.has(i) ? 'var(--gold)' : 'var(--dim)', background: hits.has(i) ? 'rgba(232,200,122,.14)' : 'transparent', border: '1px solid ' + (hits.has(i) ? 'var(--gold)' : 'transparent') }}>{l}</div>
        ))}
      </div>
      <div className="muted" style={{ fontSize: '.76rem' }}>skip every 5th letter → a hidden word emerges</div>
    </div>
  );
}

// A rare alignment — many planets concentrated inside a single zodiac sign.
function AlignDiagram(){
  const signs = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
  const planets = ['☉','☽','☿','♀','♂','♃','♄'];
  const hot = 4; // one sign lit up with the whole planetary retinue
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 7, maxWidth: 300 }}>
        {signs.map((s, i) => (
          <div key={i} style={{ width: 64, height: 58, border: '1px solid ' + (i === hot ? 'var(--gold)' : 'var(--line)'), borderRadius: 9, background: i === hot ? 'rgba(232,200,122,.14)' : '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
            <div style={{ fontSize: '1.15rem', color: i === hot ? 'var(--gold)' : 'var(--dim)' }}>{s}</div>
            {i === hot && <div style={{ display: 'flex', gap: 2, fontSize: '.72rem', color: 'var(--gold)', fontWeight: 700 }}>{planets.map((p, j) => <span key={j}>{p}</span>)}</div>}
          </div>
        ))}
      </div>
      <div className="muted" style={{ fontSize: '.76rem' }}>7 bodies in one sign · a century-grade conjunction</div>
    </div>
  );
}

// Psalms — one of the 150 appointed to each day.
function PsalmsGrid(){
  const today = 42;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span style={{ color: 'var(--gold)', fontSize: '2.6rem', fontWeight: 800, lineHeight: 1 }}>150</span>
        <span className="muted" style={{ fontSize: '.8rem' }}>Psalms · one per day</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(15,1fr)', gap: 3, width: 340, maxWidth: '100%' }}>
        {Array.from({ length: 150 }, (_, i) => {
          const n = i + 1;
          const hot = n === today;
          return <div key={i} style={{ height: 15, borderRadius: 2, background: hot ? 'var(--gold)' : 'var(--panel2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.5rem', color: hot ? '#0a0a0a' : 'var(--dim)', fontWeight: 700 }}>{n}</div>;
        })}
      </div>
      <div className="muted" style={{ fontSize: '.76rem' }}>today → Psalm {today}</div>
    </div>
  );
}

// ── the slider slides — each carries a graphic + a short explainer ──
function Slides({ rows, occ }){
  return [
    {
      key: 'skymap',
      graphic: <SkyMap rows={rows} occ={occ}/>,
      icon: 'star', iconColor: 'gold',
      title: 'Sky map',
      body: 'The twelve signs of the zodiac are not symbols — they are the twelve simple letters of the Sefer Yetzirah. As the planets move, they occupy signs and light up letters; whichever signs hold a planet today is the alphabet the sky is spelling tonight. The gold sectors are the letters you can read right now.'
    },
    {
      key: 'align',
      graphic: <AlignDiagram/>,
      icon: 'compass', iconColor: 'violet',
      title: 'Rare alignments',
      body: 'Most nights the planets spread across many signs. Once a century or so they concentrate inside a single one — the whole moving retinue in one house of the zodiac. These are the rare alignments: 171 of them across the recorded span, each a day when the sky narrows its alphabet to a few letters and the readable names tighten with it.'
    },
    {
      key: 'reader',
      graphic: <ReadingRule/>,
      icon: 'circle-check', iconColor: 'green',
      title: 'Reader',
      body: 'A name is built from letters, and a letter is readable only when its sign is occupied. So a word reads on a given day only if every letter it needs sits inside an occupied sign — a subset of the sky\'s current alphabet. Nothing is forced, nothing invented: the word either rises from the sky or it does not. The reader lists every Hebrew name the sky spells on that date.'
    },
    {
      key: 'time',
      graphic: <PrecessionDiagram/>,
      icon: 'arrows-rotate', iconColor: 'violet',
      title: 'Time',
      body: 'The zero-point of Aries can be read two ways: fixed to the equinox (tropical) or fixed to the stars (sidereal). The stars drift away from the equinox by a degree every seventy-two years, and the widening gap between them is the ayanamsa — the slow engine that turns the great ages. The predictor scans years ahead for the days a chosen word rises.'
    },
    {
      key: 'gematria',
      graphic: <GematriaTable/>,
      icon: 'hashtag', iconColor: 'violet',
      title: 'Gematria',
      body: 'Every letter is also a number, from א = 1 to ת = 400. Add the letters of a name and it yields a value; words that share a value rhyme in meaning, as if they were translations of the same idea. The same arithmetic runs through Hebrew, Greek, Arabic and Indian letters — and through the digital roots and Aiq Bekar that fold the numbers back into themselves.'
    },
    {
      key: 'sigils',
      graphic: <ShemGrid/>,
      icon: 'feather', iconColor: 'teal',
      title: 'Sigils',
      body: 'Three consecutive verses of Exodus — 14:19, 14:20, 14:21 — hold seventy-two letters each. Read columnwise, they yield the seventy-two triplets of the Shem HaMephorash; each takes +אל or +יה and becomes a five-letter angel. Around them stand the sigil forge and the Kameot magic squares — the practical craft of the letters.'
    },
    {
      key: 'codes',
      graphic: <ELSGrid/>,
      icon: 'barcode', iconColor: 'brand',
      title: 'Codes',
      body: 'Skip a fixed number of letters through the Torah and, at equal intervals, a word surfaces — as if the text were written in two directions at once. Around it sit the older arts: Temurah and Atbash, which rearrange the alphabet, and Ziruph, which pairs letter with letter. The techniques are ancient; the source text is fixed and unchanging.'
    },
    {
      key: 'psalms',
      graphic: <PsalmsGrid/>,
      icon: 'music', iconColor: 'gold',
      title: 'Psalms',
      body: 'A Psalm is appointed to each day, read alongside the sky of that date — one hundred and fifty songs laid over the turning year. The stellar alphabet spells its names; the Psalms answer them back, a second voice in the same key.'
    }
  ];
}

function Slider({ rows, occ }){
  const slides = useMemo(() => Slides({ rows, occ }), [rows, occ]);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const next = useCallback(() => setI(p => (p + 1) % slides.length), [slides.length]);
  const prev = () => setI(p => (p - 1 + slides.length) % slides.length);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 6500);
    return () => clearInterval(t);
  }, [next, paused]);
  const s = slides[i];
  return (
    <div className="slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} role="region" aria-label="Concept slider">
      <div className="slide">
        <div className="slide-graphic">{s.graphic}</div>
        <div className="slide-copy">
          <div className="slide-icon"><Fa n={s.icon} c={s.iconColor} size="1.6rem"/></div>
          <h3 style={{ margin: '6px 0 8px', color: 'var(--gold)', fontSize: '1.15rem' }}>{s.title}</h3>
          <p className="muted" style={{ fontSize: '.92rem', lineHeight: 1.6 }}>{s.body}</p>
        </div>
      </div>
      <div className="slider-ctrl">
        <button onClick={prev} aria-label="Previous slide">◀</button>
        <div className="slider-dots">
          {slides.map((x, j) => <button key={x.key} className={'dot' + (j === i ? ' active' : '')} onClick={() => setI(j)} aria-label={`Go to slide ${j + 1}`}/>)}
        </div>
        <button onClick={next} aria-label="Next slide">▶</button>
      </div>
    </div>
  );
}

// ── feature blocks ──
const FEATURES = [
  { n: 'star', c: 'gold', t: 'Sky map', d: 'Real planet positions in the 12 zodiac signs — the 12 simple letters lit up today.', go: '/app' },
  { n: 'compass', c: 'violet', t: 'Rare alignments', d: '171 century & millennium conjunctions — planets concentrated in a single sign.', go: '/alignments' },
  { n: 'book-open', c: 'green', t: 'Reader', d: 'The Hebrew names and words the occupied signs spell on a given date.', go: '/app' },
  { n: 'clock', c: 'teal', t: 'Time', d: 'The day predictor and the precessional ages — deep time of the stellar alphabet.', go: '/app' },
  { n: 'hashtag', c: 'violet', t: 'Gematria', d: 'Hebrew, Greek, Arabic and Indian numerology — Aiq Bekar and digital roots.', go: '/app' },
  { n: 'wand-magic', c: 'gold', t: 'Sigils', d: 'The sigil forge, the Kameot magic squares, and the 72 angels of the Shem HaMephorash.', go: '/app' },
  { n: 'barcode', c: 'brand', t: 'Codes', d: 'Equidistant letter sequences, Temurah / Atbash and Ziruph on the source texts.', go: '/app' },
  { n: 'music', c: 'gold', t: 'Psalms', d: 'A Psalm appointed to each day, read alongside the sky of that date.', go: '/app' }
];

function Landing({ goApp }){
  const rows = useMemo(() => skyAt(REF_DATE), []);
  const occ = useMemo(() => occupiedLetters(rows), [rows]);
  const [warnOpen, setWarnOpen] = useState(false);
  const enterApp = () => { setWarnOpen(false); goApp && goApp(); };

  return (
    <div className="landing">
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-copy">
          <div className="hero-eyebrow"><Fa n="star-of-life" c="gold" size="1rem"/> Hebrew letters in the stars · Sefer Yetzirah stellar alphabet</div>
          <h1 className="hero-title">The Apocalypse <span style={{ color: 'var(--gold)' }}>of Adam</span></h1>
          <blockquote className="hero-tag" style={{ borderLeft: '3px solid var(--gold)', paddingLeft: 14, fontStyle: 'italic', color: 'var(--dim)' }}>
            “And the thirteenth kingdom says of him that every birth of their ruler is a word. And this word received a mandate there. He received glory and power. And thus he came to the water, in order that the desire of those powers might be satisfied.”
            <cite style={{ display: 'block', marginTop: 10, fontStyle: 'normal', fontSize: '.82rem', color: 'var(--dim)' }}>— The Apocalypse of Adam · the thirteenth kingdom</cite>
          </blockquote>
          <div className="hero-cta">
            <button className="btn-cta" onClick={() => setWarnOpen(true)}><Fa n="compass" c="txt" size="1rem"/> &nbsp;Initiate — explore the stars</button>
            <a className="hero-ghost" href="/paper">Read the paper →</a>
          </div>
          <button className="hero-note-link" onClick={() => setWarnOpen(true)}><Fa n="triangle-exclamation" c="warn" size=".85rem"/> &nbsp;Content notice — for visitors with psychosis, mania, or schizophrenia</button>
        </div>
        <div className="hero-sky panel">
          <div className="hero-sky-label muted">Sky of {REF_DATE} · {occ.size} of 12 signs occupied</div>
          <SkyMap rows={rows} occ={occ}/>
        </div>
      </section>

      {/* ── SLIDER ── */}
      <section className="panel" style={{ padding: 18, marginTop: 18 }}>
        <div className="section-head">
          <h2 style={{ margin: 0 }}>The grammar of the sky</h2>
        </div>
        <Slider rows={rows} occ={occ}/>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ marginTop: 22 }}>
        <div className="section-head"><h2 style={{ margin: 0 }}>What you can do in the app</h2></div>
        <div className="feat-grid">
          {FEATURES.map((f, idx) => (
            <a key={idx} className="feat-card" href={f.go}>
              <div className="feat-icon"><Fa n={f.n} c={f.c} size="1.5rem"/></div>
              <div className="feat-t">{f.t}</div>
              <div className="feat-d muted">{f.d}</div>
              <div className="feat-go muted">open →</div>
            </a>
          ))}
        </div>
      </section>

      {/* ── ENTRY CTA ── */}
      <section className="panel entry-cta" style={{ marginTop: 26, padding: 28, textAlign: 'center', borderColor: 'var(--brand)' }}>
        <h2 style={{ marginTop: 0 }}>Initiate — explore the stars</h2>
        <p className="muted" style={{ maxWidth: 620, margin: '0 auto 16px' }}>Learn a few simple things about the ancients, then read the sky for yourself. A short content notice opens first — for visitors diagnosed with psychosis or schizophrenia.</p>
        <button className="btn-cta" style={{ fontSize: '1.1rem', padding: '14px 34px' }} onClick={() => setWarnOpen(true)}><Fa n="compass" c="txt" size="1.1rem"/> &nbsp;Enter the app</button>
        <div className="muted" style={{ marginTop: 14, fontSize: '.8rem' }}>
          <Fa n="triangle-exclamation" c="warn" size=".9rem"/> &nbsp;<b>Notice:</b> I have schizophrenia · I am psychotic · I am manic — a short self-check is offered before entry.
        </div>
      </section>

      <WarningModal open={warnOpen} onClose={() => setWarnOpen(false)} onProceed={enterApp}/>
    </div>
  );
}

export { Landing };