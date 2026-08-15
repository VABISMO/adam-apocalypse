import {readFileSync} from 'node:fs';
import * as Astronomy from '../data/astronomy-engine.mjs';
const ROOT='/home/cryptocalypse/projects/articles/';
const FIN={'ן':'נ','ץ':'צ','ך':'כ','ם':'מ','ף':'פ'};
const norm=s=>[...s].map(c=>FIN[c]||c).join('');
const SIMP=['ה','ו','ז','ח','ט','י','ל','נ','ס','ע','צ','ק'];
const SIMPSET=new Set(SIMP);
const SIGNS=['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const MAP=[
  [/SH/g,'ש'],[/CH/g,'ח'],[/TZ/g,'צ'],[/DZ/g,'צ'],[/TH/g,'ת'],[/PH/g,'פ'],[/Q/g,'ק'],
  [/A/g,'א'],[/B/g,'ב'],[/G/g,'ג'],[/D/g,'ד'],[/E/g,''],
  [/H/g,'ה'],[/I/g,'י'],[/K/g,'כ'],[/L/g,'ל'],[/M/g,'מ'],[/N/g,'נ'],
  [/O/g,''],[/P/g,'פ'],[/R/g,'ר'],[/S/g,'ס'],[/T/g,'ט'],[/U/g,'ו'],[/V/g,'ו'],[/W/g,'ו'],[/X/g,'ס'],[/Y/g,'י'],[/Z/g,'ז'],
];
function toHeb(t){let s=t.replace(/['’\.\-]/g,'').toUpperCase();for(const [re,ch] of MAP) s=s.replace(re,ch);return s;}
function simpleSet(t){const h=toHeb(t);const s=[...new Set([...h].filter(c=>SIMPSET.has(c)))];return {h,s,mask:s.reduce((m,c)=>m|(1<<SIMP.indexOf(c)),0)};}
const angelText=readFileSync(ROOT+'scripts/razel_angels_by_season.txt','utf8');
const lines=angelText.split('\n');
const angels=[];
for(let i=0;i<lines.length;i++){
  const m=/^## SEASON (\d)/.exec(lines[i]);if(!m)continue;
  const season=+m[1];
  const names=lines[i+1].split(',').map(s=>s.trim()).filter(Boolean);
  for(const n of names){const {h,s,mask}=simpleSet(n);angels.push({name:n,he:h,simples:s,mask,season,nSimples:s.length});}
}
const seen=new Set();const uniq=[];
for(const a of angels){if(seen.has(a.name))continue;seen.add(a.name);uniq.push(a);}
console.log('# Raziel angel names as readable candidates (S(w)⊆O(t))\n');
console.log('distinct: '+uniq.length+'  temporal(|S|>=1): '+uniq.filter(a=>a.nSimples>0).length+'  eternal(|S|=0): '+uniq.filter(a=>a.nSimples===0).length+'\n');
console.log('=== sample mappings ===');
for(const a of uniq.slice(0,20)){if(!a||!a.name){console.log('  BAD:',JSON.stringify(a));continue;}const sg=a.simples.map(c=>SIGNS[SIMP.indexOf(c)]);console.log('  '+String(a.name).padEnd(22)+'-> '+String(a.h).padEnd(10)+' ['+a.simples.join('')+'] ->['+sg.join(',')+']'+(a.nSimples===0?' ETERNAL':''));}
const BODIES=['Saturn','Jupiter','Mars','Sun','Venus','Mercury','Moon'];
const dim=(y,mo)=>mo===2?(y%4===0&&(y%100!==0||y%400===0))?29:28:[31,28,31,30,31,30,31,31,30,31,30,31][mo-1];
const md=(y,mo,da)=>{const d=new Date(Date.UTC(2000,mo-1,da,12,0,0));d.setUTCFullYear(y);return d;};
const pd=s=>{const m=/^(-?\d{1,5})-(\d{2})-(\d{2})$/.exec(s);if(!m)return null;const y=+m[1],mo=+m[2],da=+m[3];if(mo<1||mo>12||da<1||da>dim(y,mo))return null;const d=md(y,mo,da);return isNaN(d)?null:d;};
function occMask(s){const d=pd(s);if(!d)return -1;let m=0;for(const b of BODIES){const v=Astronomy.GeoVector(Astronomy.Body[b],d,true);const lon=Astronomy.Ecliptic(v).elon;let si=Math.floor(lon/30)%12;if(si<0)si+=12;m|=(1<<si);}return m;}
function occSigns(s){const m=occMask(s);if(m<0)return [];const r=[];for(let i=0;i<12;i++)if(m&(1<<i))r.push(SIGNS[i]);return r;}
const A=JSON.parse(readFileSync(ROOT+'web/alignments.json','utf8'));const ALL=[...A.scanA,...A.scanB];
const byMask=new Map();
for(const a of uniq){if(!byMask.has(a.mask))byMask.set(a.mask,[]);byMask.get(a.mask).push(a);}
const reads=[];
for(let i=0;i<ALL.length;i++){const O=occMask(ALL[i].date);if(O<0)continue;for(let m=O;m>=0;m=(m===0?-1:(m-1)&O)){const b=byMask.get(m);if(!b)continue;for(const a of b)reads.push({date:ALL[i].date,angel:a.name,season:a.season,simples:a.simples.join(''),maxInSign:ALL[i].maxInSign});}}
const readNames=new Map();
for(const r of reads){if(!readNames.has(r.angel))readNames.set(r.angel,{count:0,season:r.season,simples:r.simples});readNames.get(r.angel).count++;}
const N=ALL.length;
console.log('\n# readable pairs: '+reads.length+'  distinct readable: '+readNames.size+'/'+uniq.length);
console.log('eternal (|S|=0, read ~all): '+[...readNames.values()].filter(v=>v.count>=N*0.999).length);
const temporal=[...readNames.entries()].filter(([n,v])=>v.count<N*0.999).sort((a,b)=>a[1].count-b[1].count);
console.log('temporal (sky-specific): '+temporal.length+'\n');
console.log('=== TEMPORAL angel names that READ (rarest-sky-first = most sky-specific recovered names) ===');
console.log('  name                     simples  season #align');
for(const [n,v] of temporal.slice(0,50))console.log('  '+n.padEnd(24)+v.simples.padEnd(8)+'   s'+v.season+'    '+v.count);
const byDate=new Map();
for(const r of reads){if(!byDate.has(r.date))byDate.set(r.date,new Set());byDate.get(r.date).add(r.angel);}
const topDates=[...byDate.entries()].map(([d,s])=>[d,s.size]).sort((a,b)=>b[1]-a[1]).slice(0,12);
console.log('\n=== alignments reading the MOST angel names ===');
console.log('  date          maxInSign #angels occupied');
for(const [d,c] of topDates){const al=ALL.find(a=>a.date===d);console.log('  '+d+'  '+al.maxInSign+'        '+c+'      ['+occSigns(d).join(',')+']');}
// rare 7-body specials: how many angel names read on them?
const specials=ALL.filter(a=>a.maxInSign===7);
console.log('\n=== 7-body specials ('+specials.length+'): angel names readable ===');
for(const a of specials.slice(0,8)){const O=occMask(a.date);const names=[];for(let m=O;m>=0;m=(m===0?-1:(m-1)&O)){const b=byMask.get(m);if(!b)continue;for(const x of b)names.push(x.name);}console.log('  '+a.date+' ['+occSigns(a.date).join(',')+']  '+names.length+' angels: '+names.slice(0,12).join(', ')+(names.length>12?'…':''));}

// follow-up details
console.log('\n=== ETERNAL angel names (|S|=0, read EVERY alignment) ===');
const et=[...readNames.entries()].filter(([n,v])=>v.count>=N*0.999).map(([n])=>n);
console.log('  '+et.join(', '));
const never=uniq.filter(a=>!readNames.has(a.name)).map(a=>a.name);
console.log('\n=== NEVER readable (simple set never co-occurs as occupied): '+never.length+' ===');
console.log('  '+never.join(', '));
// rarest sky-specific: which alignments?
console.log('\n=== rarest sky-specific angels: exact alignments ===');
for(const target of ['SEGENIAL','SENENIAL','SHELETIN','TENEBIAL']){
  const dates=[...new Set(reads.filter(r=>r.angel===target).map(r=>r.date))].sort();
  console.log('  '+target+' (simples '+readNames.get(target).simples+', s'+readNames.get(target).season+'): '+dates.length+' alignments');
  for(const d of dates.slice(0,5)){const al=ALL.find(a=>a.date===d);console.log('      '+d+'  maxInSign='+al.maxInSign+'  signs=['+occSigns(d).join(',')+']');}
}
// known Hebrew zodiac sign names — direct mapping check
console.log('\n=== 12 HEBREW ZODIAC NAMES (known) — do they read? ===');
const ZODIAC={'TALEH':'טלה','SHOR':'שור','TAVOMIEM':'תאומים','SARETAN':'סרטן','AREYIEH':'אריה','BETHOLEH':'בתולה','MADZENAYIEM':'מאזנים','AQEROV':'עקרב','QASHAT':'קשת','GEDI':'גדי','DELI':'דלי','DAGIEM':'דגים'};
const ZSIGN=['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
for(const [tr,he] of Object.entries(ZODIAC)){
  const c=norm(he);const s=[...new Set([...c].filter(ch=>SIMPSET.has(ch)))];const mask=s.reduce((m,ch)=>m|(1<<SIMP.indexOf(ch)),0);
  const cnt=reads.filter(r=>{const O=occMask(r.date);return (mask&~O)===0;}).length;
  // need distinct count: read on how many alignments
  const ds=new Set();for(let i=0;i<ALL.length;i++){const O=occMask(ALL[i].date);if(O<0)continue;if((mask&~O)===0)ds.add(ALL[i].date);}
  console.log('  '+tr.padEnd(12)+'='+he+'  simples:['+s.join('')+'] needs ['+s.map(c=>ZSIGN[SIMP.indexOf(c)]).join(',')+']  reads on '+ds.size+' alignments');
}
