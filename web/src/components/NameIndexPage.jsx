// components/NameIndexPage.jsx — shared index page for the Patriarchs/Conquest (persons)
// and Places sections. Renders the names as a paginated, searchable card grid in the
// same "gloss" style as the Reader tab (.tcards/.tcard), each card linking to its profile
// (/patriarch/<slug> or /place/<slug>). onOpen (when provided by the live SPA) navigates
// client-side without a full reload; the <a href> stays as the no-JS fallback. 48/page.
import React, { useState, useMemo, useEffect } from 'react';

const PAGE_SIZE = 48;

function NameIndexPage({ title, intro, kind, items, basePath, onOpen }) {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(0);
  const [period, setPeriod] = useState('all');
  const qn = q.trim().toLowerCase();

  const periods = useMemo(() => {
    const s = new Set();
    for (const it of items) s.add(it.period);
    return ['all', ...[...s].sort()];
  }, [items]);

  const filtered = useMemo(() => {
    let r = items;
    if (qn) r = r.filter(it => (it.name || '').toLowerCase().includes(qn) || (it.translit || '').toLowerCase().includes(qn) || (it.ref || '').toLowerCase().includes(qn) || (it.he || '').includes(q.trim()));
    if (period !== 'all') r = r.filter(it => it.period === period);
    return r;
  }, [items, qn, period]);

  useEffect(() => { setPage(0); }, [qn, period]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const cur = Math.min(page, pages - 1);
  const slice = filtered.slice(cur * PAGE_SIZE, cur * PAGE_SIZE + PAGE_SIZE);
  const isPlace = kind === 'place';
  const href = (slug) => basePath + slug;

  return <div>
    <h1 style={{ marginTop: 0 }}>{title}</h1>
    <p className="muted">{intro}</p>

    <div className="controls" style={{ marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <input type="text" placeholder="search by name, transliteration, or Bible ref…" value={q} onChange={e => setQ(e.target.value)} style={{ flex: '1 1 240px' }} aria-label="Search names" />
      <select value={period} onChange={e => setPeriod(e.target.value)} aria-label="Filter by biblical period">
        {periods.map(p => <option key={p} value={p}>{p === 'all' ? 'all periods' : p}</option>)}
      </select>
      <span className="muted" style={{ fontSize: '.82rem' }}>{filtered.length} of {items.length} names · {PAGE_SIZE}/page</span>
    </div>

    <div className="tcards">
      {slice.map((it, i) => (
        <a key={it.slug + i} className="tcard" href={href(it.slug)} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer', transition: 'border-color .12s,transform .12s' }}
          title={`Open the profile for ${it.name}`}
          onClick={onOpen ? (e => { e.preventDefault(); onOpen(href(it.slug)); }) : undefined}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.transform = ''; }}>
          <div className="the">{it.he}</div>
          <div className="read">{it.name}</div>
          <div className="trans">{it.translit}</div>
          <div className="g">{it.len} letters · gematria {it.gem}</div>
          <div className="simp">{it.period} · {it.ref} · {it.dates.length}/12</div>
          <div style={{ marginTop: 4, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {!isPlace && it.theophoric && <span className="pill" style={{ color: 'var(--gold)', borderColor: 'var(--gold)' }}>theophoric</span>}
            {isPlace && <span className="pill" style={{ color: 'var(--green)', borderColor: 'var(--green)' }} title="A biblical PLACE — proper locative noun in Strong (city, mountain, region…)">place</span>}
          </div>
        </a>
      ))}
    </div>

    {filtered.length === 0 && <div className="muted" style={{ padding: '18px 0' }}>No names match. Clear the search or pick another period.</div>}

    {filtered.length > PAGE_SIZE && (
      <div className="controls" style={{ marginTop: 12 }}>
        <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={cur === 0}>◀ prev</button>
        <span className="pill">page {cur + 1} / {pages} · {filtered.length} names · {PAGE_SIZE}/page</span>
        <button onClick={() => setPage(p => Math.min(pages - 1, p + 1))} disabled={cur >= pages - 1}>next ▶</button>
        <span className="muted">jump:</span>
        <input type="number" min="1" max={pages} value={cur + 1} onChange={e => { const n = parseInt(e.target.value, 10); if (!isNaN(n)) setPage(Math.max(0, Math.min(pages - 1, n - 1))); }} style={{ width: 64 }} aria-label="Jump to page" />
      </div>
    )}
  </div>;
}

export { NameIndexPage };
export default NameIndexPage;