// pages/LucoLibrary.jsx — the Luco Library: a bibliography of the source books behind
// "The Alphabet from the Sky", with one ficha per book. Footer-linked hub at /library
// + per-book ficha at /library/<slug>. Each ficha links to a COMPLETE English translation
// of the primary text (archive.org preferred) where one is freely available; modern
// copyrighted critical editions link to the publisher/WorldCat with an honest note.
//
// The paginate + search pattern mirrors the long-list hubs (prophets/mages/…): the SSR
// bakes the full grid (crawlable), and the client enhances it with filter + search.
import React, { useState, useMemo } from 'react';
import { LIBRARY_BOOKS, bookBySlug } from '../data/library_books.js';

const PER_PAGE = 12;

function LucoLibraryPage({all}){
  const [q,setQ]=useState('');
  const [page,setPage]=useState(0);
  const qn=q.trim().toLowerCase();
  const filtered=useMemo(()=> LIBRARY_BOOKS.filter(b=>{
    if(!qn) return true;
    return (b.title+' '+b.author+' '+(b.summary||'')+' '+(b.relevance||'')+' '+(b.kind||'')+' '+(b.lang||'')).toLowerCase().includes(qn);
  }),[qn]);
  const pages=Math.max(1,Math.ceil(filtered.length/PER_PAGE));
  const cur=Math.min(page,pages-1);
  // SSR (all=true) bakes the full grid so every book card is crawlable; the client
  // (no all) paginates 12/page with search.
  const slice = all ? filtered : filtered.slice(cur*PER_PAGE,cur*PER_PAGE+PER_PAGE);
  return <>
    <h1>Luco Library — the source books</h1>
    <p className="muted" style={{marginBottom:14}}>The bibliography behind <i>The Alphabet from the Sky</i>: every book that grounded a claim in the paper, here as a ficha with a summary of the book and the specific findings this project draws from it. Each links to a <b>complete source on archive.org</b> — a full English translation where one is in the public domain, otherwise a complete facsimile in the original language or a lending copy of the printed book. Complete primary texts, not third-party commentaries or fragments.</p>
    <div className="controls" style={{marginBottom:14}}>
      <input type="text" value={q} onChange={e=>{setQ(e.target.value); setPage(0);}} placeholder="search title · author · summary…" style={{flex:'1 1 280px'}} aria-label="Filter the Luco Library"/>
      <span className="pill">{filtered.length} of {LIBRARY_BOOKS.length} books{all?'':' · page '+(cur+1)+'/'+pages}</span>
    </div>
    <div className="tcards lib-cards" style={{gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))'}}>
      {slice.map(b=>(
        <a key={b.slug} href={`/library/${b.slug}`} className="tcard lib-card" style={{textDecoration:'none'}}>
          <div className="lib-title">{b.title}</div>
          <div className="lib-author">{b.author}{b.year?` · ${b.year}`:''}</div>
          <div className="lib-summary">{b.summary}</div>
          <div className="lib-kind">{b.kind==='reference'?'reference':(b.lang||'')}</div>
        </a>
      ))}
    </div>
    {!all && pages>1 && <div className="controls" style={{marginTop:12}}>
      <button onClick={()=>setPage(p=>Math.max(0,p-1))} disabled={cur===0}>◀ prev</button>
      <span className="pill">page {cur+1} / {pages}</span>
      <button onClick={()=>setPage(p=>Math.min(pages-1,p+1))} disabled={cur>=pages-1}>next ▶</button>
    </div>}
  </>;
}

function BookFicha({slug}){
  const b=bookBySlug(slug);
  if(!b) return <>
    <div className="controls" style={{marginBottom:14}}><a href="/library" className="linkish">◀ Luco Library</a></div>
    <h2>Book not found</h2>
    <div className="muted">No book in the Luco Library matches “{slug}”. <a href="/library">Browse the full library →</a></div>
  </>;
  return <>
    <div className="controls" style={{marginBottom:14}}><a href="/library" className="linkish">◀ Luco Library</a></div>
    <h1 style={{fontSize:'1.7rem',marginBottom:4}}>{b.title}</h1>
    <div className="muted" style={{marginBottom:16}}>{b.author}{b.year?` · ${b.year}`:''}{b.lang?` · ${b.lang}`:''}{b.kind==='reference'?' · reference':''}</div>
    <div className="lib-ficha">
      <div className="panel lib-panel">
        <h3 style={{marginTop:0}}>About this book</h3>
        <p className="lib-prose">{b.summary}</p>
      </div>
      <div className="panel lib-panel">
        <h3 style={{marginTop:0}}>Relevance to this project</h3>
        <p className="lib-prose">{b.relevance}</p>
      </div>
      <div className="panel lib-panel">
        <h3 style={{marginTop:0}}>Read the complete book</h3>
        {b.url
          ? <p style={{marginBottom:8}}><a href={b.url} target="_blank" rel="noreferrer" style={{fontWeight:600}}>Open the complete source on archive.org ↗</a></p>
          : <p style={{marginBottom:8}} className="muted">No complete edition of this title is available on archive.org.</p>}
        {b.urlNote && <div className="note">{b.urlNote}</div>}
      </div>
    </div>
  </>;
}

export { LucoLibraryPage, BookFicha };