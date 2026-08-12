// components/NameFicha.jsx — shared detail profile for a biblical name readable in the
// sky (a Patriarchs/Conquest-section person or a Places-section place). Renders: back
// link, header (name + Hebrew + transliteration), a facts panel (type, biblical period,
// gematria, letter-count, theophoric, occurrences), the biblical reference with a Sefaria
// link, a Wikipedia panel (image + description + extract, baked at build time from the
// REST summary API, present when an article exists), a "readable on these rare
// conjunctions" list (each date → Reader on that date), and a stellar-letters line (the
// name's required simple letters → their zodiac signs). Presentational — renders
// identically server-side and client-side.
import React from 'react';
import { SIMPLE, LETTER_TO_SIGN, refUrl, displayDate } from '../core.jsx';
import { NAME_WIKI } from '../data/name_wiki.js';
import { nameVerse } from '../data/name_verses.js';

function NameFicha({ figure, kind, backHref, backLabel }) {
  if (!figure) return <div className="panel"><h2>Not found</h2><p>No name matches this path.</p></div>;
  const isPlace = kind === 'place';
  const stars = [...figure.simp].map(ch => {
    const sign = LETTER_TO_SIGN[ch];
    const sm = sign ? SIMPLE[sign] : null;
    return { ch, sign, name: sm ? sm[1] : null };
  });
  const refLink = refUrl(figure.ref);
  const wiki = NAME_WIKI[figure.slug] || null;
  const verse = nameVerse(figure.slug);
  return <div className="ficha">
    <div className="controls" style={{ marginBottom: 14 }}>
      <a href={backHref}>◀ {backLabel}</a>
      <span className="pill" style={{ marginLeft: 'auto', color: 'var(--gold)', borderColor: 'var(--gold)' }}>{isPlace ? 'biblical place' : 'patriarchs/conquest'}</span>
    </div>

    <h1 style={{ marginBottom: 4 }}>{figure.name}{figure.he && <span className="he" style={{ marginLeft: 12, color: 'var(--gold)' }}>{figure.he}</span>}</h1>
    <div className="muted" style={{ marginBottom: 12, fontSize: '.92rem' }}>
      {figure.translit}{figure.translit && ' · '}{figure.period}
    </div>

    <div className="grid2" style={{ alignItems: 'stretch' }}>
      <div className="panel" style={{ marginBottom: 14, display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ marginTop: 0 }}>In the Bible</h2>
        <p style={{ lineHeight: 1.6, marginBottom: 6 }}>
          {isPlace
            ? <span>A biblical toponym — <b>{figure.name}</b> — attested in <b style={{ color: 'var(--gold)' }}>{figure.ref}</b>{figure.refN != null && <> ({figure.refN} occurrence{figure.refN === 1 ? '' : 's'} in the Hebrew Bible)</>}.</span>
            : <span>A biblical {figure.theophoric ? 'theophoric ' : ''}personal name — <b>{figure.name}</b> (<span className="he">{figure.he}</span>) — attested in <b style={{ color: 'var(--gold)' }}>{figure.ref}</b>{figure.refN != null && <> ({figure.refN} occurrence{figure.refN === 1 ? '' : 's'} in the Hebrew Bible)</>}.</span>}
        </p>
        {refLink && <a href={refLink} target="_blank" rel="noreferrer">Read {figure.ref} on Sefaria →</a>}
        {verse && (verse.he || verse.en) && <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--line)' }}>
          <div className="muted" style={{ fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>{figure.ref}</div>
          {verse.he && <p className="he" dir="rtl" style={{ fontSize: '1.05rem', lineHeight: 1.9, margin: '0 0 8px', textAlign: 'right' }}>{verse.he}</p>}
          {verse.en && <p style={{ fontSize: '.86rem', lineHeight: 1.6, margin: 0, color: 'var(--dim)', fontStyle: 'italic' }}>{verse.en}</p>}
        </div>}
      </div>
      <div className="panel" style={{ marginBottom: 14 }}>
        <h2 style={{ marginTop: 0 }}>Facts</h2>
        <table style={{ fontSize: '.88rem' }}>
          <tbody>
            <tr><td style={{ padding: '5px 8px', color: 'var(--dim)', width: '42%', verticalAlign: 'top' }}>Type</td><td style={{ padding: '5px 8px' }}>{isPlace ? 'place (toponym)' : 'person'}</td></tr>
            <tr><td style={{ padding: '5px 8px', color: 'var(--dim)' }}>Biblical period</td><td style={{ padding: '5px 8px' }}>{figure.period}</td></tr>
            <tr><td style={{ padding: '5px 8px', color: 'var(--dim)' }}>Gematria</td><td style={{ padding: '5px 8px' }}>{figure.gem}</td></tr>
            <tr><td style={{ padding: '5px 8px', color: 'var(--dim)' }}>Letters</td><td style={{ padding: '5px 8px' }}>{figure.len} consonants</td></tr>
            {!isPlace && <tr><td style={{ padding: '5px 8px', color: 'var(--dim)' }}>Theophoric</td><td style={{ padding: '5px 8px' }}>{figure.theophoric ? 'yes (contains a divine element)' : 'no'}</td></tr>}
          </tbody>
        </table>
      </div>
    </div>

    {wiki && <div className="panel" style={{ marginBottom: 14 }}>
      <h2 style={{ marginTop: 0 }}>Wikipedia — {wiki.title}</h2>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {wiki.thumbnail && <img src={wiki.thumbnail.source} alt={wiki.title} style={{ maxWidth: 200, maxHeight: 260, borderRadius: 8, border: '1px solid var(--line)' }} loading="lazy" />}
        <div style={{ flex: '1 1 320px' }}>
          {wiki.description && <div className="muted" style={{ marginBottom: 6 }}>{wiki.description}</div>}
          {wiki.extract && <p style={{ lineHeight: 1.6, marginBottom: 0 }}>{wiki.extract}</p>}
          <div style={{ marginTop: 8 }}><a href={wiki.url} target="_blank" rel="noreferrer">Read more on Wikipedia →</a></div>
        </div>
      </div>
    </div>}

    {stars.length > 0 && <div className="panel" style={{ marginBottom: 14 }}>
      <h2 style={{ marginTop: 0 }}>Stellar letters</h2>
      <p className="muted" style={{ fontSize: '.84rem', marginTop: 0 }}>The {figure.len}-consonant name needs its {stars.length} distinct simple-letter{stars.length === 1 ? '' : 's'} to be occupied in the sky. The 7 classical bodies open a sign → its Hebrew simple letter; this name reads only when the planets sit in exactly these signs.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 6 }}>
        {stars.map(s => <span key={s.ch} className="panel" style={{ padding: '8px 12px', textAlign: 'center' }}>
          <span className="he" style={{ fontSize: '1.6rem', color: 'var(--gold)' }}>{s.ch}</span>
          <div className="muted" style={{ fontSize: '.72rem', marginTop: 2 }}>{s.sign} · {s.name}</div>
        </span>)}
      </div>
    </div>}

    <div className="panel" style={{ marginBottom: 14 }}>
      <h2 style={{ marginTop: 0 }}>Readable on these rare conjunctions</h2>
      <p className="muted" style={{ fontSize: '.84rem', marginTop: 0 }}>{figure.name} appears in the stellar reading on {figure.dates.length} of the 12 dated rare conjunctions (proofs.json). Open any date in the Reader to verify it on that sky.</p>
      <table style={{ width: '100%', fontSize: '.9rem' }}>
        <thead><tr>
          <th style={{ textAlign: 'left', padding: '6px 8px', width: '40%' }}>Date</th>
          <th style={{ textAlign: 'left', padding: '6px 8px', width: '24%' }}>Precessional era</th>
          <th style={{ textAlign: 'left', padding: '6px 8px' }}>Occupied letters |O|</th>
        </tr></thead>
        <tbody>
          {figure.dates.map(d => <tr key={d.date}>
            <td style={{ padding: '6px 8px' }}><a href={`/app?date=${d.date}&tab=translator`}>{displayDate(d.date)}</a></td>
            <td style={{ padding: '6px 8px' }} className="muted">{d.era}</td>
            <td style={{ padding: '6px 8px' }} className="muted">{d.O}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  </div>;
}

export { NameFicha };
export default NameFicha;