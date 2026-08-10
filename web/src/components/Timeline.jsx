// components/Timeline.jsx — reusable horizontal SVG timeline of dated figures.
// `items`: [{ name, y0, y1, endpoint?, color? }]. Renders a linear year-axis with one
// dot per figure (at the midpoint of y0..y1), the endpoint highlighted in gold, and a
// few key labels. Pure/presentational — renders identically on server and client.
import React from 'react';

function fmtYear(y){
  if(y<0) return Math.abs(y)+' BCE';
  return y+' CE';
}

function Timeline({items, title, accent='#7fb0ff'}){
  if(!items || !items.length) return null;
  const W=1000, H=180, PADX=40;
  const min=Math.min(...items.map(i=>i.y0));
  const max=Math.max(...items.map(i=>i.y1==null?i.y0:i.y1));
  const span=Math.max(1, max-min);
  const xOf=(y)=> PADX + ((y-min)/span)*(W-2*PADX);
  const midY=70;
  // decade/millennium ticks
  const step = span>3000?1000 : span>1000?500 : span>400?100 : 50;
  const firstTick = Math.ceil(min/step)*step;
  const ticks=[];
  for(let t=firstTick; t<=max; t+=step) ticks.push(t);
  // label only a few key figures to avoid overlap: first, last(endpoint), and a sparse sample
  const labelIdx = new Set([0, items.length-1]);
  items.forEach((it,i)=>{ if(it.endpoint) labelIdx.add(i); });
  // add a few intermediates spread out
  for(const i of [Math.floor(items.length*0.25), Math.floor(items.length*0.5), Math.floor(items.length*0.75)]) labelIdx.add(i);

  return <div className="timeline-wrap" role="img" aria-label={title}>
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="auto" style={{maxWidth:'100%'}}>
      <line x1={PADX} y1={midY} x2={W-PADX} y2={midY} stroke="#33405a" strokeWidth="2"/>
      {ticks.map(t=>(
        <g key={t}>
          <line x1={xOf(t)} y1={midY-6} x2={xOf(t)} y2={midY+6} stroke="#3a4762" strokeWidth="1"/>
          <text x={xOf(t)} y={midY+20} textAnchor="middle" fontSize="11" fill="#6a7588">{fmtYear(t)}</text>
        </g>
      ))}
      {items.map((it,i)=>{
        const ym = it.y1==null? it.y0 : Math.round((it.y0+it.y1)/2);
        const x = xOf(ym);
        const end = !!it.endpoint;
        const r = end?8:5;
        const fill = end? '#e8c87a' : (it.isRoyal? '#c792ea' : accent);
        const above = i%2===0;
        const ly = above? midY-18 : midY+34;
        return <g key={i}>
          <line x1={x} y1={midY} x2={x} y2={above? midY-12 : midY+12} stroke={fill} strokeWidth="1" opacity="0.5"/>
          {end
            ? <g><circle cx={x} cy={midY} r={r+3} fill="none" stroke="#e8c87a" strokeWidth="1.2" opacity="0.7"/>
               <circle cx={x} cy={midY} r={r} fill="#e8c87a" stroke="#fff5d0" strokeWidth="1"/></g>
            : <circle cx={x} cy={midY} r={r} fill={fill} stroke="#0e1320" strokeWidth="1.2"/>}
          {labelIdx.has(i) &&
            <text x={x} y={ly} textAnchor="middle" fontSize="12" fontWeight={end?700:400} fill={end?'#e8c87a':'#9aa6bd'}>{it.name}</text>}
          <title>{`${it.name} (${it.years||fmtYear(it.y0)}) — ${it.role||''}`}</title>
        </g>;
      })}
    </svg>
    <div className="muted" style={{textAlign:'center',fontSize:'.78rem',marginTop:2}}>
      <span style={{color:'#e8c87a'}}>●</span> endpoint · <span style={{color:'#c792ea'}}>●</span> royal · <span style={{color:accent}}>●</span> mage/prophet · hover a dot for the figure
    </div>
  </div>;
}

export { Timeline, fmtYear };