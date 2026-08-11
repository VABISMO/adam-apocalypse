// components/Ficha.jsx — shared detail "ficha" for a prophet or mage figure.
// Renders: back link, header (name, Hebrew, dates, region, role, designation pill),
// portrait thumbnail, Wikipedia description, an infobox facts table, a "life & work
// in brief" rows-for-fast-reading table, a life-span bar graphic, and a Wikipedia link.
// Presentational — renders identically server-side and client-side.
import React from 'react';
import { fmtYear } from './Timeline.jsx';

function datesOf(figure) {
  if (figure.years) return figure.years;
  if (figure.y0 != null && figure.y1 != null) return figure.y0 === figure.y1 ? fmtYear(figure.y0) : `${fmtYear(figure.y0)} – ${fmtYear(figure.y1)}`;
  return '';
}

function LifeBar({ figure, min, max }) {
  const y0 = figure.y0, y1 = figure.y1 == null ? figure.y0 : figure.y1;
  if (y0 == null) return null;
  const span = Math.max(1, max - min);
  const x0 = ((y0 - min) / span) * 100;
  const x1 = ((y1 - min) / span) * 100;
  const W = 100, H = 34;
  return <div className="lifebar-wrap" role="img" aria-label={`Life span ${fmtYear(y0)} to ${fmtYear(y1)}`}>
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="auto" style={{ maxWidth: '100%' }}>
      <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="#2a2a38" strokeWidth="2" />
      <line x1={x0} y1={H / 2 - 9} x2={x0} y2={H / 2 + 9} stroke="#9ca3af" strokeWidth="1.5" />
      <line x1={x1} y1={H / 2 - 9} x2={x1} y2={H / 2 + 9} stroke="#9ca3af" strokeWidth="1.5" />
      <rect x={x0} y={H / 2 - 5} width={Math.max(1.5, x1 - x0)} height={10} rx={5} fill="#8a05ff" />
      <text x={x0} y={6} textAnchor="start" fontSize="7" fill="#9ca3af">{fmtYear(y0)}</text>
      <text x={x1} y={H - 1} textAnchor="end" fontSize="7" fill="#9ca3af">{fmtYear(y1)}</text>
    </svg>
  </div>;
}

function Ficha({ figure, kind, axisMin, axisMax, backHref, backLabel, wiki }) {
  if (!figure) return <div className="panel"><h2>Not found</h2><p>No figure matches this path.</p></div>;
  const w = wiki || {};
  const desc = w.description || figure.role;
  const facts = w.infobox || [];
  const rows = w.works || [];
  const url = w.wikipediaUrl || ('https://en.wikipedia.org/wiki/' + encodeURIComponent(figure.name.replace(/ /g, '_')));
  const dates = datesOf(figure);
  const designation = figure.designation || (figure.endpoint ? (kind === 'mage' ? 'end of the era' : 'lineage end') : null);

  return <div className="ficha">
    <div className="controls" style={{ marginBottom: 14 }}>
      <button onClick={() => { if (typeof window !== 'undefined') window.history.back(); }}>◀ {backLabel}</button>
      <a href={url} target="_blank" rel="noreferrer" style={{ marginLeft: 'auto' }}>Wikipedia →</a>
    </div>

    <h1 style={{ marginBottom: 4 }}>{figure.name}{figure.he && <span className="he" style={{ marginLeft: 10, color: 'var(--gold)' }}>{figure.he}</span>}</h1>
    <div className="muted" style={{ marginBottom: 10, fontSize: '.9rem' }}>
      {dates}{dates && ' · '}{figure.region}
      {designation && <span className="pill" style={{ marginLeft: 8, color: 'var(--gold)', borderColor: 'var(--gold)' }}>{designation}</span>}
      {kind === 'mage' && figure.isIberian && <span className="pill" style={{ marginLeft: 6, color: 'var(--green)', borderColor: 'var(--green)' }}>Iberian</span>}
      {kind === 'mage' && figure.isRoyal && <span className="pill" style={{ marginLeft: 6, color: 'var(--violet)', borderColor: 'var(--violet)' }}>royal</span>}
      {figure.thread && <span className="pill" style={{ marginLeft: 6 }}>{figure.thread}</span>}
    </div>

    {axisMin != null && axisMax != null && <div className="panel" style={{ padding: 12, marginBottom: 14 }}>
      <LifeBar figure={figure} min={axisMin} max={axisMax} />
    </div>}

    <div className="grid2" style={{ alignItems: 'start' }}>
      <div>
        {w.thumbnail && <div className="fig" style={{ marginBottom: 12, padding: 8 }}>
          <img src={w.thumbnail} alt={figure.name} style={{ maxHeight: 320, width: 'auto', borderRadius: 8, maxWidth: '100%' }} loading="lazy" />
        </div>}
        <div className="panel" style={{ marginBottom: 14 }}>
          <h2 style={{ marginTop: 0 }}>Description</h2>
          <p style={{ lineHeight: 1.6, marginBottom: 0 }}>{desc || 'No Wikipedia description available.'}</p>
        </div>
      </div>
      <div>
        {facts.length > 0 && <div className="panel" style={{ marginBottom: 14 }}>
          <h2 style={{ marginTop: 0 }}>Facts</h2>
          <table style={{ fontSize: '.88rem' }}>
            <tbody>
              {facts.map((f, i) => <tr key={i}>
                <td style={{ padding: '5px 8px', color: 'var(--dim)', width: '38%', verticalAlign: 'top' }}>{f.label}</td>
                <td style={{ padding: '5px 8px' }}>{f.value}</td>
              </tr>)}
            </tbody>
          </table>
        </div>}
      </div>
    </div>

    {rows.length > 0 && <div className="panel" style={{ marginBottom: 14 }}>
      <h2 style={{ marginTop: 0 }}>Life &amp; work in brief</h2>
      <p className="muted" style={{ fontSize: '.82rem', marginTop: 0 }}>Summarised by section — one row per topic, for fast reading.</p>
      <table style={{ width: '100%', fontSize: '.9rem' }}>
        <thead><tr>
          <th style={{ textAlign: 'left', padding: '6px 8px', width: '32%' }}>{kind === 'mage' ? 'Work / contribution' : 'Topic'}</th>
          <th style={{ textAlign: 'left', padding: '6px 8px' }}>{kind === 'mage' ? 'Significance' : 'Summary'}</th>
        </tr></thead>
        <tbody>
          {rows.map((r, i) => <tr key={i}>
            <td style={{ padding: '6px 8px', fontWeight: 600, verticalAlign: 'top' }}>{r.title}</td>
            <td style={{ padding: '6px 8px' }} className="muted">{r.note}</td>
          </tr>)}
        </tbody>
      </table>
    </div>}

    <div style={{ marginTop: 8 }}>
      <a href={url} target="_blank" rel="noreferrer">Read the full article on Wikipedia →</a>
    </div>
  </div>;
}

export { Ficha, datesOf };
export default Ficha;