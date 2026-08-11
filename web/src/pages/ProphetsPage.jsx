// pages/ProphetsPage.jsx — /prophets: an INDEX of the prophet lineage Adam → Jacob Frank.
// Shows the timeline graphic + a compact card grid; each card links to the figure's
// detail ficha at /prophet/<slug> (Wikipedia biography, facts, and a summary table).
// Presentational (renders identically server & client).
import React from 'react';
import { PROPHETS } from '../data/prophets.js';
import { slugify } from '../data/wiki.js';
import { Timeline, fmtYear } from '../components/Timeline.jsx';

function ProphetCard({ p }) {
  const dates = (p.y0 === p.y1) ? fmtYear(p.y0) : `${fmtYear(p.y0)} – ${fmtYear(p.y1)}`;
  const end = !!p.endpoint;
  const pill = p.designation || (end ? 'lineage end' : null);
  return <a className={'tcard' + (end ? ' always' : '')} href={'/prophet/' + slugify(p.name)}
      style={{ textDecoration: 'none', display: 'block', borderColor: end ? 'var(--gold)' : undefined, boxShadow: end ? '0 0 0 1px var(--gold)' : undefined }}>
    <div className="the">{p.he && <span className="he" style={{ fontSize: '1.5rem', marginLeft: 6 }}>{p.he}</span>}</div>
    <div className="read">{p.name}</div>
    <div className="trans">{dates} · {p.region}</div>
    <div className="g"><span className="pill" style={{ fontSize: '.7rem' }}>{p.thread}</span>{pill && <span className="pill" style={{ fontSize: '.68rem', marginLeft: 6, color: 'var(--gold)', borderColor: 'var(--gold)' }}>{pill}</span>}</div>
    <div className="simp">{p.role}</div>
  </a>;
}

function ProphetsPage() {
  const span = `${fmtYear(PROPHETS[0].y0)} – ${fmtYear(PROPHETS[PROPHETS.length - 1].y1)}`;
  const last = PROPHETS[PROPHETS.length - 1];
  return <div>
    <h1>Prophets — from Adam to Jacob Frank</h1>
    <p className="muted">A chronology of prophetic and revelatory figures, from the first human <span className="he">אדם</span> through the biblical prophets, the second-temple and apocalyptic writers, the early-Christian and merkabah-mystical tradition, down to the Sabbatean–Frankist thread whose <b style={{ color: 'var(--gold)' }}>{last.designation || 'final'} figure is {last.name} ({fmtYear(last.y0)}–{fmtYear(last.y1)})</b>. {PROPHETS.length} figures across {span}. Click a card to open its ficha — a Wikipedia-sourced biography, an infobox of facts, and a life-and-work summary table.</p>
    <div className="panel" style={{ padding: 14, marginBottom: 14 }}>
      <Timeline items={PROPHETS} title="Prophet timeline — Adam to Jacob Frank" accent="#8a05ff" />
    </div>
    <div className="tcards">
      {PROPHETS.map((p, i) => <ProphetCard key={i} p={p} />)}
    </div>
  </div>;
}

export { ProphetsPage };