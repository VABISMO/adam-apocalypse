// components/NameIndexPage.jsx — shared index page for the Patriarchs/Conquest (persons)
// and Places sections. Groups the names by biblical period, each row linking to its
// ficha (/patriarch/<slug> or /place/<slug>). Presentational (renders server & client).
import React from 'react';

const PERIOD_ORDER = ['Patriarchs/Conquest', 'Monarchy (David/Solomon)', 'Exile/Prophets', 'Post-exile/Writings'];

function NameIndexPage({ title, intro, kind, items, basePath }) {
  const byPeriod = {};
  for (const it of items) (byPeriod[it.period] = byPeriod[it.period] || []).push(it);
  const ordered = PERIOD_ORDER.filter(p => byPeriod[p]).map(p => [p, byPeriod[p]]);
  const href = (slug) => basePath + slug;
  return <div>
    <h1>{title}</h1>
    <p className="muted">{intro}</p>
    {ordered.map(([period, group]) => <div key={period} className="panel" style={{ padding: 14, marginBottom: 14 }}>
      <h2 style={{ marginTop: 0 }}>{period} <span className="muted" style={{ fontSize: '.8rem', fontWeight: 400 }}>· {group.length} name{group.length === 1 ? '' : 's'}</span></h2>
      <table style={{ width: '100%', fontSize: '.9rem' }}>
        <thead><tr>
          <th style={{ textAlign: 'left', padding: '6px 8px', width: '26%' }}>Name</th>
          <th style={{ textAlign: 'left', padding: '6px 8px', width: '14%' }}>Hebrew</th>
          <th style={{ textAlign: 'left', padding: '6px 8px', width: '12%' }}>Gematria</th>
          <th style={{ textAlign: 'left', padding: '6px 8px', width: '22%' }}>Reference</th>
          <th style={{ textAlign: 'left', padding: '6px 8px' }}>On conjunctions</th>
        </tr></thead>
        <tbody>
          {group.map(it => <tr key={it.slug}>
            <td style={{ padding: '6px 8px' }}><a href={href(it.slug)}>{it.name}</a>{it.theophoric && kind === 'person' && <span className="muted" style={{ fontSize: '.74rem', marginLeft: 5 }}>theoph.</span>}</td>
            <td style={{ padding: '6px 8px' }} className="he">{it.he}</td>
            <td style={{ padding: '6px 8px' }} className="muted">{it.gem}</td>
            <td style={{ padding: '6px 8px' }} className="muted">{it.ref}</td>
            <td style={{ padding: '6px 8px' }} className="muted">{it.dates.length}/12</td>
          </tr>)}
        </tbody>
      </table>
    </div>)}
  </div>;
}

export { NameIndexPage };
export default NameIndexPage;