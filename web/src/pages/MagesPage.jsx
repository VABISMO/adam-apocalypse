// pages/MagesPage.jsx — /mages: an INDEX of the magi lineage Daniel → Aleister Crowley.
// Shows the timeline graphic + a compact card grid; each card links to the figure's
// detail profile at /mage/<slug> (Wikipedia biography, facts, and a works table). The
// full bios live on the profiles, not here — this page is a scannable index, not a feed.
// Presentational (renders identically server & client).
import React from 'react';
import { MAGES } from '../data/mages.js';
import { WIKI, slugify } from '../data/wiki.js';
import { Timeline, fmtYear } from '../components/Timeline.jsx';

function MageCard({ m, onOpen }) {
  const dates = m.years || `${fmtYear(m.y0)} – ${fmtYear(m.y1)}`;
  const end = !!m.endpoint;
  const pill = m.designation || (end ? 'lineage end' : null);
  const hasWiki = !!(WIKI[m.name] && WIKI[m.name].description);
  const href = '/mage/' + slugify(m.name);
  const onClick = onOpen ? (e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return; e.preventDefault(); onOpen(href); } : null;
  return <a className={'tcard' + (end ? ' always' : '')} href={href}
      onClick={onClick}
      style={{ textDecoration: 'none', display: 'block', borderColor: end ? 'var(--gold)' : undefined, boxShadow: end ? '0 0 0 1px var(--gold)' : undefined }}>
    <div className="the" style={{ minHeight: 26 }}>{m.name}</div>
    <div className="read">{dates} · {m.region}</div>
    <div className="g" style={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center' }}>
      <span className="pill" style={{ fontSize: '.7rem' }}>{m.role.split(';')[0]}</span>
      {m.isIberian && <span className="pill" style={{ fontSize: '.68rem', color: 'var(--green)', borderColor: 'var(--green)' }}>Iberian</span>}
      {m.isRoyal && <span className="pill" style={{ fontSize: '.68rem', color: 'var(--violet)', borderColor: 'var(--violet)' }}>royal</span>}
      {m.isJesuit && <span className="pill" style={{ fontSize: '.68rem', color: 'var(--pink)', borderColor: 'var(--pink)' }}>Jesuit</span>}
      {pill && <span className="pill" style={{ fontSize: '.68rem', color: 'var(--gold)', borderColor: 'var(--gold)' }}>{pill}</span>}
    </div>
    {hasWiki && <div className="simp">{WIKI[m.name].description.slice(0, 120)}…</div>}
  </a>;
}

function MagesPage({ onOpen }) {
  const span = `${fmtYear(MAGES[0].y0)} – ${fmtYear(MAGES[MAGES.length - 1].y1)}`;
  const last = MAGES[MAGES.length - 1];
  return <div>
    <h1>Magi — from Daniel to Aleister Crowley</h1>
    <p className="muted">A chronology of <b>magi / wise-men / royal-sage occult figures</b>, opening with the deepest sage-strata — the Sumerian apkallu <b>Adapa</b>, the Egyptian deified sage <b>Imhotep</b>, the priestess-poet <b>Enheduanna</b>, <b>Hermes Trismegistus</b>, and Pharaoh's magicians <b>Jannes and Jambres</b> of Moses' era — through <b>Pythagoras</b> (number as the root of the cosmos), the Babylonian court magi (<b>Daniel, Shadrach, Meshach, Abednego</b>), the priest-astronomer <b>Berossus</b>, the star-following <b>Magi of Matthew 2</b>, the neo-Pythagorean magus <b>Apollonius of Tyana</b>, the theurgist <b>Iamblichus</b>, the magician-martyr <b>Saint Cyprian of Antioch</b> ('San Cipriano', whose Libro de San Cipriano and Dragón Rojo transmit the Solomonic-Egyptian magical lineage to Iberia), the Arabic astrologers <b>Abu Ma'shar, Al-Kindi</b> (De radiis stellarum) and <b>Maslama al-Qurtubi</b> (Picatrix), the medieval Iberian sages — <b>Ramon Llull, Alfonso X the Wise, Arnaldus de Villanova, Moses de León</b> — the Renaissance Christian-kabbalists and royal astrologers, the Baroque <b>Jesuit mage Athanasius Kircher</b> (<i>Oedipus Aegyptiacus</i>), and the modern Hermetic line of <b>Eliphas Lévi and S.L. Mathers</b>, ending with <b style={{ color: 'var(--gold)' }}>{last.name} ({last.years})</b>, founder of Thelema, who re-read scripture by the stars and codified the Solomonic Goetia. {MAGES.length} figures across {span}. Click a card to open its profile — a Wikipedia-sourced biography, an infobox of facts, and a works-and-contributions table.</p>
    <div className="panel" style={{ padding: 14, marginBottom: 14 }}>
      <Timeline items={MAGES} title="Magi timeline — Daniel to Aleister Crowley" accent="#8a05ff" />
    </div>
    <div className="tcards">
      {MAGES.map((m, i) => <MageCard key={i} m={m} onOpen={onOpen} />)}
    </div>
  </div>;
}

export { MagesPage };