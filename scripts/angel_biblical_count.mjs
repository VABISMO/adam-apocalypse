// angel_biblical_count.mjs — of the 275 distinct Raziel angels, how many have a
// Hebrew consonantal form that is a biblical proper name (n-pr / n-pr-loc)?
// extra-biblical = 275 - matches. Verifies the paper's §8.1 "242 (88%)" claim.
import { readFileSync } from 'node:fs';
const ROOT='/home/cryptocalypse/projects/articles/';
const FIN={'ן':'נ','ץ':'צ','ך':'כ','ם':'מ','ף':'פ'};
const norm=s=>[...s].map(c=>FIN[c]||c).join('');
const MAP=[
  [/SH/g,'ש'],[/CH/g,'ח'],[/TZ/g,'צ'],[/DZ/g,'צ'],[/TH/g,'ת'],[/PH/g,'פ'],[/Q/g,'ק'],
  [/A/g,'א'],[/B/g,'ב'],[/G/g,'ג'],[/D/g,'ד'],[/E/g,''],
  [/H/g,'ה'],[/I/g,'י'],[/K/g,'כ'],[/L/g,'ל'],[/M/g,'מ'],[/N/g,'נ'],
  [/O/g,''],[/P/g,'פ'],[/R/g,'ר'],[/S/g,'ס'],[/T/g,'ט'],[/U/g,'ו'],[/V/g,'ו'],[/W/g,'ו'],[/X/g,'ס'],[/Y/g,'י'],[/Z/g,'ז'],
];
function toHeb(t){let s=t.replace(/['’\.\-]/g,'').toUpperCase();for(const [re,ch] of MAP) s=s.replace(re,ch);return s;}
const ZODIAC={'TALEH':'טלה','SHOR':'שור','TAVOMIEM':'תאומים','SARETAN':'סרטן','AREYIEH':'אריה','BETHOLEH':'בתולה','MADZENAYIEM':'מאזנים','AQEROV':'עקרב','QASHAT':'קשת','GEDI':'גדי','DELI':'דלי','DAGIEM':'דגים'};

const LEX=JSON.parse(readFileSync(ROOT+'web/lexicon.json','utf8')).lexicon;
const isBibPos=p=>String(p||'').startsWith('n-pr');
// set of biblical proper-name Hebrew forms (persons + places)
const bibSet=new Set();
for(const [cons,,gloss,pos] of LEX){ if(isBibPos(pos)) bibSet.add(norm(cons)); }
console.log('biblical proper-name Hebrew forms in lexicon: '+bibSet.size);

// load 275 distinct angels
const angelText=readFileSync(ROOT+'scripts/razel_angels_by_season.txt','utf8');
const lines=angelText.split('\n');
const angels=[];
for(let i=0;i<lines.length;i++){
  const m=/^## SEASON (\d)/.exec(lines[i]); if(!m) continue;
  for(const n of lines[i+1].split(',').map(s=>s.trim()).filter(Boolean)){
    angels.push({name:n,he:ZODIAC[n]?norm(ZODIAC[n]):norm(toHeb(n))});
  }
}
const seen=new Set(); const uniq=[];
for(const a of angels){ if(seen.has(a.name)) continue; seen.add(a.name); uniq.push(a); }
console.log('distinct angel names: '+uniq.length);

// per-season distinct (to verify 74/69/66/83 and the 292 overlap)
const perSeason={1:new Set(),2:new Set(),3:new Set(),4:new Set()};
for(const a of angels) perSeason[angels.find(x=>x.name===a.name && true)?0:0]; // noop
const bySeason={1:new Set(),2:new Set(),3:new Set(),4:new Set()};
for(let i=0;i<lines.length;i++){
  const m=/^## SEASON (\d)/.exec(lines[i]); if(!m) continue;
  const s=+m[1];
  for(const n of lines[i+1].split(',').map(t=>t.trim()).filter(Boolean)) bySeason[s].add(n);
}
console.log('per-season distinct rosters: s1='+bySeason[1].size+' s2='+bySeason[2].size+' s3='+bySeason[3].size+' s4='+bySeason[4].size+'  (sum='+[1,2,3,4].reduce((a,k)=>a+bySeason[k].size,0)+', distinct-total='+uniq.length+', overlap='+[1,2,3,4].reduce((a,k)=>a+bySeason[k].size,0)-uniq.length+')');

// match: angel Hebrew form is a biblical proper name
const matched=[];
for(const a of uniq){ if(a.he.length && bibSet.has(a.he)) matched.push(a); }
console.log('\nangel Hebrew forms that ARE biblical proper names: '+matched.length+' / '+uniq.length);
console.log('=> extra-biblical: '+(uniq.length-matched.length)+' / '+uniq.length+' ('+((uniq.length-matched.length)/uniq.length*100).toFixed(1)+'%)');
console.log('\nthe biblical (in-lexicon) angels:');
for(const a of matched) console.log('  '+a.name+' -> '+a.he);
