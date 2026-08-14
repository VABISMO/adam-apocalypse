// tabs/SigilsTab.jsx — Sigil Forge / Kameot / 72 Angels
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SIGNS, SIMPLE, LETTER_TO_SIGN, DOUBLES, MOTHERS, BODIES, GLYPH, WEEK, FIN2REG, REG2FIN, SIMPLE_LETTERS, GV, norm, displayHe, gematria, simpleSet, formable, isPalindrome, ANGEL_LEXICON, ANGEL_NAME_MAP, readableWords, daysInMonth, makeDate, parseDate, fmtDate, BODIES7, skyAtSet, skyAt, skyAt7, occupiedLetters, bySign, GENESIS, genesisReadable, GEN_TOTAL, GEN_VALUES, PREC, AGE, FULL, AYANAMSIS, SYN, DRAC, ANOM, TROP, ECLY, HALAKIM_DAY, MOLAD, EQUINOX_LON, ageBoundaries, yrLabel, ERA_WINDOWS, FINALS, letterVal, reduce9, LO_SHU, LO_POS, sigilPath, aiqGroups, siamese, doublyEven, singlyEven, buildMagic, isMagic, KAMEOT, GREEK, isopsephy, ABJAD, ABJAD_NAME, abjad, KTP, katapayadi, countSubset, MON, MONTHNAMES, displayDate } from '../core.jsx';
import { SkyMap, KameaGrid, Fig, DateEntry, YearInput, SubTabs } from '../ui.jsx';

function SigilTab(){
  const [inp,setInp]=useState('משיח');
  const sp=sigilPath(inp);
  const isHeb=/[א-ת]/.test(inp);
  // build per-letter entries (same logic as KameaSigil, for the shared text panel)
  const entries = isHeb
    ? [...norm(inp)].filter(ch=>GV[ch]).map(ch=>({l:displayHe(ch), v:letterVal(ch)}))
    : [...inp.toUpperCase().replace(/[^A-Z]/g,'')].map(ch=>({l:ch, v:ch.charCodeAt(0)-64}));
  return <>
    <h2>Sigil Forge — the Aiq Bekar / Lo Shu sigil (Saturn 3×3, §15b.3)</h2>
    <div className="muted" style={{marginBottom:10}}>The kamea-sigil method: (1) take the name (consonants); (2) reduce each letter's gematria to its digital root 1–9 (Aiq Bekar); (3) mark those cells on the Lo Shu (Saturn 3×3) in order and join them — the trace <b>is</b> the sigil; (4) consecutive repeats collapse (the pen does not lift). Aiq Bekar = the digit-sum of the 22-letter gematria of §2, the bridge from alphabet to sigil. <span style={{color:'var(--green)'}}>Green</span> = first cell, <span style={{color:'var(--red)'}}>red</span> = last. The <b>Kameot</b> tab traces the same name on all 7 planetary squares (Saturn → Moon).</div>
    <div className="controls" style={{marginBottom:12}}>
      <input type="text" value={inp} onChange={e=>setInp(e.target.value)} placeholder="Hebrew name, e.g. משיח" style={{flex:'1 1 260px'}} autoFocus/>
      <span className="pill">Aiq Bekar cells used: {sp.cellsUsed.length}/9</span>
    </div>
    <div className="row" style={{alignItems:'flex-start'}}>
      <div style={{flex:'0 0 auto'}}><KameaSigil n={3} word={inp} compact/></div>
      <div style={{flex:'1 1 200px'}}>
        <div className="muted">Letters: <b style={{color:'var(--gold)'}}>{entries.map(e=>e.l).join(' ')||'—'}</b></div>
        <div className="muted">Values: {entries.map(e=>e.v).join(', ')||'—'}</div>
        <div className="muted">Aiq Bekar (1–9): <b style={{color:'var(--blue)'}}>{sp.reduced.join('  ')||'—'}</b></div>
        <div className="muted">Saturn trace (repeats collapsed):</div>
        <div className="big" style={{color:'var(--gold)'}}>{sp.cells.map(c=>c.v).join(' → ') || '—'}</div>
        <div className="note">The sigil is the geometric footprint of the name on the Lo Shu — deterministic from the name alone. The <b>Kameot</b> tab traces the same name on all 7 planetary squares (Saturn → Moon): each square's different modulus n² = 9,16,25,36,49,64,81 yields a distinct sigil per planet. <em>Caveat (§6.3 / §15b.3):</em> the sigil-over-kamea method is Renaissance (Agrippa, 1531), not medieval Jewish.</div>
        <div className="note">Try: <span className="key click" onClick={()=>setInp('אדם')}>אדם</span> <span className="key click" onClick={()=>setInp('משה')}>משה</span> <span className="key click" onClick={()=>setInp('ישראל')}>ישראל</span> <span className="key click" onClick={()=>setInp('והו')}>והו</span> (1st Shem angel) · <span className="key click" onClick={()=>setInp('MICHAEL')}>MICHAEL</span></div>
      </div>
    </div>
    <Fig n={7} doc="From the article (§15b.3): the Lo Shu (Saturn 3×3, M=15) with the 9 Aiq Bekar groups overlaid — each cell gathers the letters whose gematria digit-sums to it. The gold trace is the sigil of משיח (Messiah): Aiq Bekar 4·3·1·8, the reduced cells joined in order. Aiq Bekar = the digit-sum of the 22-letter gematria of §2 — the bridge from alphabet to sigil."/>
  </>;
}

function KameaSigil({ n, word, compact }){
  const sq = buildMagic(n);
  const N = n*n;
  const pos = {}; for(let i=0;i<n;i++) for(let j=0;j<n;j++) pos[sq[i][j]]=[i,j];
  const isHeb = /[א-ת]/.test(word);
  let entries;
  if(isHeb){
    entries = [...norm(word)].filter(ch=>GV[ch]).map(ch=>({l:displayHe(ch), v:letterVal(ch)}));
  } else {
    entries = [...word.toUpperCase().replace(/[^A-Z]/g,'')].map(ch=>({l:ch, v:ch.charCodeAt(0)-64}));
  }
  const targets = entries.map(e=> ((e.v-1)%N)+1);
  const path=[]; for(const t of targets){ if(!path.length||path[path.length-1]!==t) path.push(t); }
  const used=new Set(path);
  const order={}; path.forEach((v,k)=>{ if(!(v in order)) order[v]=k+1; });
  const cellPx = n<=4?42 : n<=6?32 : n<=8?26 : 22; const pad=16; const S=pad*2+n*cellPx;
  const center=v=>{const [i,j]=pos[v]; return [pad+cellPx*(j+0.5), pad+cellPx*(i+0.5)];};
  const d=path.map((v,k)=>{const [x,y]=center(v); return (k?'L':'M')+x.toFixed(1)+' '+y.toFixed(1);}).join(' ');
  return <>
    <svg viewBox={`0 0 ${S} ${S}`} width={S} height={S} style={{maxWidth:'100%'}} role="img" aria-label={`Sigil of ${word} on ${n}×${n} kamea`}>
      <rect x="0" y="0" width={S} height={S} fill="#0f0f15" rx="8"/>
      {sq.flat().map((v,idx)=>{const [i,j]=pos[v]; const x=pad+cellPx*j, y=pad+cellPx*i; const on=used.has(v);
        return <g key={idx}>
          <rect x={x+1.5} y={y+1.5} width={cellPx-3} height={cellPx-3} rx="3" fill={on?'#332b1a':'#16161f'} stroke="#2a2a38" strokeWidth="1"/>
          <text x={x+cellPx/2} y={y+cellPx/2-1} textAnchor="middle" dominantBaseline="middle" fontSize={n<=6?11:9} fill={on?'#e8c87a':'#5a5a6e'}>{v}</text>
          {on && <text x={x+cellPx/2} y={y+cellPx/2+9} textAnchor="middle" dominantBaseline="middle" fontSize={6.5} fill="#9ca3af">#{order[v]}</text>}
        </g>;})}
      {path.length>=2 && <path d={d} fill="none" stroke="#e8c87a" strokeWidth="2.2" opacity="0.9" strokeLinejoin="round" strokeLinecap="round"/>}
      {path.map((v,k)=>{const [x,y]=center(v); const r=k===0||k===path.length-1?4.5:2.8; const fill=k===0?'#6fe0a0':k===path.length-1?'#ff8a8a':'#e8c87a'; return <circle key={k} cx={x} cy={y} r={r} fill={fill} stroke="#08080b" strokeWidth="0.6"/>;})}
    </svg>
    {!compact && <div style={{marginTop:8, minWidth:200}}>
      <div className="muted">{isHeb?'Hebrew gematria (22 letters; finals = base letter)':'Latin A=1…Z=26'} → reduced into the square (n²={N}){n===3?' — for Saturn n²=9 this is the digital root = the Aiq Bekar method of §15b.3':''}.</div>
      {entries.length===0
        ? <div className="note">Type a word to trace its sigil on this kamea.</div>
        : <table style={{marginTop:6}}>
            <thead><tr><th>Letter</th><th>Value</th><th>Cell</th></tr></thead>
            <tbody>{entries.map((e,i)=><tr key={i}><td><span className={isHeb?'he':'gk'} style={{fontSize:'1.2rem'}}>{e.l}</span></td><td className="deg">{e.v}</td><td className="deg">{targets[i]}</td></tr>)}</tbody>
          </table>}
      <div className="muted" style={{marginTop:6}}>Trace ({path.length} pts, repeats collapsed): <b style={{color:'var(--gold)'}}>{path.join(' → ')||'—'}</b> · cells {used.size}/{N}</div>
    </div>}
  </>;
}

function KameotTab(){
  const [word,setWord]=useState('יהוה');
  const [planet,setPlanet]=useState('Saturn');
  const [pn,n,pdbl]=KAMEOT.find(k=>k[0]===planet);
  return <>
    <h2>The 7 kameot — planetary magic squares + sigil tracer (§15b.1, §15b.3)</h2>
    <div className="muted" style={{marginBottom:10}}>7 magic squares ↔ 7 doubles ↔ 7 planets (Sefer Yetzirah §4). Type a word (Hebrew or English/Latin), pick a planet, and trace its sigil on that kamea: each letter → value → cell on the square (values reduced modulo n²; for Saturn n²=9 this is the digital root = Aiq Bekar). <span style={{color:'var(--green)'}}>green</span> = first, <span style={{color:'var(--red)'}}>red</span> = last; consecutive repeats collapse (the pen does not lift).</div>
    <div className="controls" style={{marginBottom:12}}>
      <input type="text" value={word} onChange={e=>setWord(e.target.value)} placeholder="Hebrew (יהוה) or English (MICHAEL)" style={{flex:'1 1 260px'}} autoFocus/>
      <select value={planet} onChange={e=>setPlanet(e.target.value)} aria-label="Planet kamea" style={{background:'var(--panel2)',color:'var(--txt)',border:'1px solid var(--line)',borderRadius:8,padding:'8px',fontSize:'.9rem'}}>
        {KAMEOT.map(([p,nn])=> <option key={p} value={p}>{GLYPH[p]} {p} ({nn}×{nn})</option>)}
      </select>
    </div>
    <div className="row" style={{alignItems:'flex-start'}}>
      <div style={{flex:'0 0 auto'}}><KameaSigil n={n} word={word}/></div>
      <div style={{flex:'1 1 200px'}}>
        <div className="muted">Planet: <b>{GLYPH[planet]} {planet}</b> · {n}×{n} kamea · double <span className="he" style={{fontSize:'1.2rem'}}>{pdbl}</span> · constant <b style={{color:'var(--gold)'}}>{n*(n*n+1)/2}</b>.</div>
        <div className="note">How the trace is built: letters of the word → gematria value (Hebrew, 22 letters — finals = base letter, no 500–900; or A=1…Z=26 for Latin) → reduce each value into the square's range (1…n²) by ((value−1) mod n²)+1 → mark those cells in order → join them. For <b>Saturn</b> (n²=9) this reduces to the digital root — exactly the Aiq Bekar → Lo Shu method verified in §15b.3 and used in the Sigil Forge tab.</div>
        <div className="note">Try: <span className="key click" onClick={()=>setWord('יהוה')}>יהוה</span> <span className="key click" onClick={()=>setWord('משיח')}>משיח</span> <span className="key click" onClick={()=>setWord('אדם')}>אדם</span> <span className="key click" onClick={()=>setWord('MICHAEL')}>MICHAEL</span> <span className="key click" onClick={()=>setWord('RAPHAEL')}>RAPHAEL</span> — then switch planet.</div>
        <div className="note"><em>Caveat (§6.3 / §15b.3):</em> the sigil-over-kamea method is Renaissance (Agrippa, 1531), not medieval Jewish. The English A=1…Z=26 mapping is a modern Latin gematria, not traditional.</div>
      </div>
    </div>
    <h3>All 7 kameot — <span className="he" style={{fontSize:'1.1rem'}}>{word?displayHe(norm(word)):''}</span> traced on each square</h3>
    <div className="tcards" style={{gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))'}}>
      {KAMEOT.map(([planet,n,dbl])=>{
        const M=n*(n*n+1)/2;
        const sq=buildMagic(n); const ok=isMagic(sq);
        return <div key={planet} className="kbox" style={{textAlign:'center'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
            <b>{GLYPH[planet]} {planet}</b>
            <span className="muted">{n}×{n} · M={M}</span>
          </div>
          <div style={{display:'flex',justifyContent:'center'}}><KameaSigil n={n} word={word} compact/></div>
          <div className="muted" style={{marginTop:6}}>double <span className="he" style={{fontSize:'1rem'}}>{dbl}</span> · constant <b style={{color:'var(--gold)'}}>{M}</b> · magic {ok?'✓':'✗'}</div>
        </div>;
      })}
    </div>
    <h3>Cross-links (§15b.1.D)</h3>
    <ul className="muted">
      <li><b>Mercury</b> 8×8 constant = 260 = the Maya <b>Tzolkin</b> (260 days).</li>
      <li><b>Sun</b> 6×6 constant = 111; sum 1..36 = 666 = 6×111 (the “solar number”, Rev 13:18 — see the Revelation tab).</li>
      <li><b>Saturn</b> 3×3 = the Lo Shu, constant 15 = יה (10+5); total 45 = מה (40+5), “What?”.</li>
      <li>The 7 kameot = the 7 days of the planetary week in Chaldean order (see the Week tab).</li>
    </ul>
    <Fig n={6} doc="From the article (§15b.1): the 7 planetary kameot, orders 3–9 in Chaldean order, with constants M(n)=n(n²+1)/2. Saturn 3×3 = the Lo Shu (M=15, basis of the sigils); Mercury 8×8 (M=260) = the Maya Tzolkin; the Sun 6×6 sums 1+…+36 = 666 = 6×111."/>
  </>;
}

// 72 Shem HaMephorash angels placed around a circle of 72 divisions (5° each).
// The 72-fold division is the precessional clock: precession ≈ 71.6 yr/° ≈ 72 yr per
// degree, so 72 = years-per-degree, and 72 × 360 yr ≈ 25 920 yr = the Platonic great
// year (modern 25 771). Each angel = 5° = ~360 yr of precession.
function AngelsCircle({triplets}){
  const C=240;
  const ang=(i)=>(-90 + i*5)*Math.PI/180;
  const pt=(r,a)=>[C+r*Math.cos(a), C+r*Math.sin(a)];
  const Rout=212, RtickIn=200, Rnum=224, RlabOut=188, RlabIn=168;
  return <svg viewBox="0 0 480 482" width="100%" height="auto" style={{maxWidth:470,margin:'0 auto'}} role="img" aria-label="72 angels around the precessional circle">
    <rect x="0" y="0" width="480" height="482" fill="#0f0f15" rx="10"/>
    <circle cx={C} cy={C} r={Rout} fill="none" stroke="#2a2a38" strokeWidth="1.4"/>
    <circle cx={C} cy={C} r={RlabOut+10} fill="none" stroke="#202028" strokeWidth="0.7"/>
    {triplets.map((t,i)=>{
      const a=ang(i); const [x0,y0]=pt(Rout,a); const [x1,y1]=pt(RtickIn,a);
      const major=i%6===0;
      return <line key={'t'+i} x1={x0} y1={y0} x2={x1} y2={y1} stroke={major?'#c29eff':'#33343f'} strokeWidth={major?1.3:0.6}/>;
    })}
    {triplets.map((t,i)=>{
      const a=ang(i); const outer=i%2===0; const rl=outer?RlabOut:RlabIn;
      const [lx,ly]=pt(rl,a); const [nx,ny]=pt(Rnum,a);
      return <g key={'a'+i}>
        <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="8.6" fill={outer?'#e8c87a':'#c29eff'} fontFamily="serif">{t}</text>
        <text x={nx} y={ny} textAnchor="middle" dominantBaseline="middle" fontSize="5" fill="#5a5a6e">{i+1}</text>
      </g>;
    })}
    <circle cx={C} cy={C} r="58" fill="#0f0f15" stroke="#2a2a38" strokeWidth="0.8"/>
    <text x={C} y={C-18} textAnchor="middle" fontSize="24" fill="#e8c87a" fontFamily="serif">72</text>
    <text x={C} y={C-2} textAnchor="middle" fontSize="8" fill="#9ca3af">5° per angel · 360°/72</text>
    <text x={C} y={C+13} textAnchor="middle" fontSize="7.6" fill="#c29eff">1° / 72 yr precession</text>
    <text x={C} y={C+25} textAnchor="middle" fontSize="6.8" fill="#5a5a6e">72 × 360 = 25 920 yr</text>
  </svg>;
}

function AngelsTab(){
  const [data,setData]=useState(null);
  const [err,setErr]=useState(null);
  const [q,setQ]=useState('');
  useEffect(()=>{ fetch('/angels72.json').then(r=>{ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); }).then(setData).catch(e=>setErr(e.message)); },[]);
  if(err) return <div className="panel app-panel"><h2>72 Angels</h2><p>Could not load the 72-angel data. Please refresh the page; if the problem persists, the data may be unavailable right now.</p></div>;
  if(!data) return <div className="muted">Loading the 72 Shem HaMephorash triplets…</div>;
  const qn=q.trim().toLowerCase();
  const rows=data.triplets.map((t,i)=>({i:i+1, trio:t, el:t+'אל', yh:t+'יה', gemEL:data.gemEL?data.gemEL[i]:gematria(norm(t+'אל')), gemYH:data.gemYH?data.gemYH[i]:gematria(norm(t+'יה'))}));
  const filtered=qn?rows.filter(r=>r.trio.includes(qn)||(''+r.i)===qn||r.el.includes(qn)||r.yh.includes(qn)):rows;
  return <>
    <h2>The 72 angels — Shem HaMephorash from Exodus 14:19-21 (§15b.4)</h2>
    <div className="muted" style={{marginBottom:10}}>72 consonants × 3 verses. The 72 triplets are read by <b>columns</b>: triplets[i] = v19[i] + v20[71−i] + v21[i] (v20 read backwards, as tradition requires). 72×3 = 216 = 6³. Triplet 0 = <span className="he">והו</span> = Vehuiah (canonical ✓). Each triplet + suffix <span className="he">אל</span> (Hod) or <span className="he">יה</span> (Malkhut) gives the angelic name.</div>
    <h3>The 72 around the precessional circle</h3>
    <div className="muted" style={{marginBottom:8}}>The 72 angels placed one every 5° (360°/72). This is the precessional clock: precession carries the equinox ≈ 1° every 71.6 ≈ <b>72 years</b>, so <b>72 = the years per degree of precession</b>, and each 5° angel = ~360 yr of precession; the full 72-division circuit = 72 × 360 ≈ <b>25 920 yr</b> — the traditional Platonic great year (modern value 25 771 yr). Major ticks every 6th (the 12 decans). The decanatal attribution (each Shem angel → 5°) is traditional; the precessional reading is a mnemonic, not a physical model.</div>
    <div style={{marginBottom:14}}><AngelsCircle triplets={data.triplets}/></div>
    <div className="controls" style={{marginBottom:10}}>
      <input type="text" value={q} onChange={e=>setQ(e.target.value)} placeholder="filter by # or triplet…" style={{flex:'1 1 220px'}}/>
      <span className="pill">{filtered.length} of 72</span>
    </div>
    <table>
      <thead><tr><th>#</th><th>Triplet</th><th>+אל (Hod)</th><th>gem</th><th>+יה (Malkhut)</th><th>gem</th></tr></thead>
      <tbody>
      {filtered.map(r=>(
        <tr key={r.i}><td>{r.i}</td>
          <td className="letter-cell"><span className="he">{r.trio}</span></td>
          <td className="letter-cell"><span className="he" style={{fontSize:'1.2rem'}}>{r.el}</span></td>
          <td className="deg">{r.gemEL}</td>
          <td className="letter-cell"><span className="he" style={{fontSize:'1.2rem'}}>{r.yh}</span></td>
          <td className="deg">{r.gemYH}</td>
        </tr>
      ))}
      </tbody>
    </table>
    <div className="note"><em>Caveat (§6.3):</em> the mechanical extraction 72×3 from Exodus is demonstrated (p≈5×10⁻⁷); the method is medieval (Rashi, 11th c.); the decanatal attribution (each angel → 5°) is a hypothesis, not demonstrated here. The sigil of each triplet is computed on the Sigil Forge tab.</div>
  </>;
}


export { SigilTab, KameotTab, AngelsTab };
