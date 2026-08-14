// pages/LucoLibrary.jsx — the Luco Library: the complete primary-text source books
// behind "The Alphabet from the Sky", HOSTED ON THIS SITE and downloadable as a ZIP.
// Footer-linked hub at /library + per-book ficha at /library/<slug>. Each ficha carries a
// summary of the book, the findings this project draws from it, and a Download button for
// the complete text packaged as a ZIP from the repo `library/<slug>/` folder.
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
    <p className="muted" style={{marginBottom:14}}>The source books behind <i>The Alphabet from the Sky</i>: every complete primary text that grounded a claim in the paper — the Hebrew letter-tradition sources and the cross-cultural scriptures (Avesta, Ṛg Veda, Qur’an, Nag Hammadi, Book of the Dead, I Ching, Popol Vuh). Each is hosted <b>complete on this site</b> and downloadable as a ZIP from its ficha. Complete primary texts, not third-party commentaries or fragments.</p>
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
        <h3 style={{marginTop:0}}>Download the complete book</h3>
        <a className="lib-download" href={`/library/original/${b.slug}/${b.slug}.zip`} download={`${b.slug}.zip`}>⬇ Download the complete text (ZIP)</a>
        <div className="note" style={{marginTop:10}}>The complete text of this book, hosted on this site and packaged as a ZIP from the source files in the project repository.</div>
      </div>
    </div>
  </>;
}

export { LucoLibraryPage, BookFicha };