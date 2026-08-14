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
    return (b.title+' '+b.author+' '+(b.desc||'')+' '+(b.kind||'')+' '+(b.lang||'')).toLowerCase().includes(qn);
  }),[qn]);
  const pages=Math.max(1,Math.ceil(filtered.length/PER_PAGE));
  const cur=Math.min(page,pages-1);
  // SSR (all=true) bakes the full grid so every book card is crawlable; the client
  // (no all) paginates 12/page with search.
  const slice = all ? filtered : filtered.slice(cur*PER_PAGE,cur*PER_PAGE+PER_PAGE);
  return <>
    <h1>Luco Library — the source books</h1>
    <p className="muted" style={{marginBottom:14}}>The bibliography behind <i>The Alphabet from the Sky</i>: every book that grounded a claim in the paper, here as a ficha (title, author, year, a one-line description). Each links to a <b>complete English translation</b> of the primary text on <b>archive.org</b> where one is in the public domain; modern copyrighted critical editions link to the publisher or WorldCat with an honest note that no free complete edition exists. Complete primary texts — not third-party commentaries or fragments.</p>
    <div className="controls" style={{marginBottom:14}}>
      <input type="text" value={q} onChange={e=>{setQ(e.target.value); setPage(0);}} placeholder="search title · author · description…" style={{flex:'1 1 280px'}} aria-label="Filter the Luco Library"/>
      <span className="pill">{filtered.length} of {LIBRARY_BOOKS.length} books{all?'':' · page '+(cur+1)+'/'+pages}</span>
    </div>
    <div className="tcards" style={{gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))'}}>
      {slice.map(b=>(
        <a key={b.slug} href={`/library/${b.slug}`} className="tcard" style={{textDecoration:'none',display:'block'}}>
          <div className="the" style={{fontSize:'.98rem',lineHeight:1.25}}>{b.title}</div>
          <div className="read">{b.author}{b.year?` · ${b.year}`:''}</div>
          <div className="trans" style={{WebkitLineClamp:3,display:'-webkit-box',WebkitBoxOrient:'vertical',overflow:'hidden'}}>{b.desc}</div>
          <div className="g muted" style={{fontSize:'.76rem'}}>{b.kind==='reference'?'reference':(b.lang||'')}</div>
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
    <div className="muted" style={{marginBottom:14}}>{b.author}{b.year?` · ${b.year}`:''}{b.lang?` · ${b.lang}`:''}{b.kind==='reference'?' · reference':''}</div>
    <div className="panel" style={{padding:18,marginBottom:14,lineHeight:1.65}}>{b.desc}</div>
    {b.url && <div className="panel" style={{padding:18,marginBottom:14}}>
      <h3 style={{marginTop:0}}>Read the book</h3>
      <p style={{marginBottom:8}}><a href={b.url} target="_blank" rel="noreferrer" style={{fontWeight:600}}>Open the complete text ↗</a></p>
      {b.urlNote && <div className="note">{b.urlNote}</div>}
    </div>}
    {!b.url && <div className="panel" style={{padding:18,marginBottom:14}}>
      <h3 style={{marginTop:0}}>Read the book</h3>
      <div className="note">{b.urlNote || 'No free online edition is currently linked for this title.'}</div>
    </div>}
  </>;
}

export { LucoLibraryPage, BookFicha };