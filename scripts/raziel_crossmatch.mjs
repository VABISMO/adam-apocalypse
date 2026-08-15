// raziel_crossmatch.mjs — do the compound-readable NON-NAME words (the "false
// positives" of discriminate9) match Raziel angel names? If yes, the "false
// positives" are recovered Raziel onomastics, not noise.
import { readFileSync } from 'node:fs';
const ROOT='/home/cryptocalypse/projects/articles/';
const FIN={'ן':'נ','ץ':'צ','ך':'כ','ם':'מ','ף':'פ'};
const norm=s=>[...s].map(c=>FIN[c]||c).join('');
const SIMP=['ה','ו','ז','ח','ט','י','ל','נ','ס','ע','צ','ק'];
const SIMPSET=new Set(SIMP);
const MAP=[
  [/SH/g,'ש'],[/CH/g,'ח'],[/TZ/g,'צ'],[/DZ/g,'צ'],[/TH/g,'ת'],[/PH/g,'פ'],[/Q/g,'ק'],
  [/A/g,'א'],[/B/g,'ב'],[/G/g,'ג'],[/D/g,'ד'],[/E/g,''],
  [/H/g,'ה'],[/I/g,'י'],[/K/g,'כ'],[/L/g,'ל'],[/M/g,'מ'],[/N/g,'נ'],
  [/O/g,''],[/P/g,'פ'],[/R/g,'ר'],[/S/g,'ס'],[/T/g,'ט'],[/U/g,'ו'],[/V/g,'ו'],[/W/g,'ו'],[/X/g,'ס'],[/Y/g,'י'],[/Z/g,'ז'],
];
function toHeb(t){let s=t.replace(/['’\.\-]/g,'').toUpperCase();for(const [re,ch] of MAP) s=s.replace(re,ch);return s;}
// exact Hebrew for the 12 zodiac names (override the lossy toHeb)
const ZODIAC={'TALEH':'טלה','SHOR':'שור','TAVOMIEM':'תאומים','SARETAN':'סרטן','AREYIEH':'אריה','BETHOLEH':'בתולה','MADZENAYIEM':'מאזנים','AQEROV':'עקרב','QASHAT':'קשת','GEDI':'גדי','DELI':'דלי','DAGIEM':'דגים'};

// 1. Load lexicon, compute compound words, split names vs non-names
const LEX=JSON.parse(readFileSync(ROOT+'web/lexicon.json','utf8')).lexicon;
const LEXSET=new Set(LEX.map(e=>norm(e[0])));
const isBibPos=p=>String(p||'').startsWith('n-pr');
const isPlace=p=>String(p||'').includes('loc');
const nameRefs=JSON.parse(readFileSync(ROOT+'web/name_refs.json','utf8'));
const displayOf=he=>{const nr=nameRefs[he];if(nr&&nr.name)return nr.name;const e=LEX.find(x=>x[0]===he);return e?(e[2]||e[1]||he):he;};
const glossOf=he=>{const e=LEX.find(x=>x[0]===he);return e?(e[2]||''):'';};
const isCompound=c=>{for(let i=2;i<=c.length-2;i++){const L=c.slice(0,i),R=c.slice(i);if(LEXSET.has(L)&&LEXSET.has(R))return {L,R};}return null;};
const words=LEX.map(([cons,,gloss,pos])=>{
  const c=norm(cons);
  let mask=0;for(const ch of c){const idx=SIMP.indexOf(ch);if(idx>=0)mask|=(1<<idx);}
  return {cons,c,pos:String(pos||''),isName:isBibPos(pos),isPlace:isPlace(pos),mask,comp:isCompound(c),display:displayOf(cons),gloss:glossOf(cons)};
}).filter(w=>w.comp);
const names=words.filter(w=>w.isName);
const nons=words.filter(w=>!w.isName);
console.log('# CROSS-MATCH: compound-readable NON-NAMES vs Raziel angel names\n');
console.log('compound words: '+words.length+'  (names '+names.length+', non '+nons.length+')');

// 2. Load 275 angel names -> Hebrew (with zodiac override)
const angelText=readFileSync(ROOT+'scripts/razel_angels_by_season.txt','utf8');
const lines=angelText.split('\n');
const angels=[];
for(let i=0;i<lines.length;i++){
  const m=/^## SEASON (\d)/.exec(lines[i]);if(!m)continue;
  const season=+m[1];
  const nm=lines[i+1].split(',').map(s=>s.trim()).filter(Boolean);
  for(const n of nm){
    const h=ZODIAC[n]?norm(ZODIAC[n]):toHeb(n);
    angels.push({name:n,he:h,season,nSimples:[...new Set([...h].filter(c=>SIMPSET.has(c)))].length});
  }
}
const seenN=new Set();const uniqAngels=[];
for(const a of angels){if(seenN.has(a.name))continue;seenN.add(a.name);uniqAngels.push(a);}
console.log('distinct angel names: '+uniqAngels.length+'\n');

// 3. Cross-match: non-name Hebrew vs angel Hebrew
// match types: EXACT, NONNAME_IS_PREFIX_OF_ANGEL, ANGEL_IS_PREFIX_OF_NONNAME, STRIP_THEO_MATCH
const THEO=['אל','יה'];
function stripTheo(h){for(const t of THEO){if(h.endsWith(t)&&h.length>t.length)return h.slice(0,-t.length);if(h.startsWith(t)&&h.length>t.length)return h.slice(t.length);}return h;}
const angHeMap=new Map(); // he -> [angel names]
for(const a of uniqAngels){if(a.he.length===0)continue;if(!angHeMap.has(a.he))angHeMap.set(a.he,[]);angHeMap.get(a.he).push(a.name);}
const angHeSet=new Set(angHeMap.keys());
const angStems=new Map(); // stripped stem -> [angel names]
for(const a of uniqAngels){if(a.he.length===0)continue;const st=stripTheo(a.he);if(st.length===0)continue;if(!angStems.has(st))angStems.set(st,[]);angStems.get(st).push(a.name);}

const matches=[]; // {non, angName, type}
const matchedNon=new Set();
for(const w of nons){
  const c=w.c;
  if(c.length===0)continue;
  // EXACT
  if(angHeSet.has(c)){matches.push({non:w,angName:angHeMap.get(c).join('/'),type:'EXACT'});matchedNon.add(c);continue;}
  // non-name is prefix of angel (angel has theo suffix added)
  for(const a of uniqAngels){if(a.he.length>c.length && a.he.startsWith(c)){matches.push({non:w,angName:a.name,type:'NON+THEOsuffix'});matchedNon.add(c);break;}}
  if(matchedNon.has(c))continue;
  // angel is prefix of non-name (non-name extends angel stem)
  for(const a of uniqAngels){if(c.length>a.he.length && a.he.length>=2 && c.startsWith(a.he)){matches.push({non:w,angName:a.name,type:'ANGEL+EXT'});matchedNon.add(c);break;}}
  if(matchedNon.has(c))continue;
  // stripped-theo stem match
  const st=stripTheo(c);
  if(st.length>=2 && angStems.has(st)){matches.push({non:w,angName:angStems.get(st).join('/'),type:'STEM(stripTheo)'});matchedNon.add(c);continue;}
}
console.log('══ CROSS-MATCH RESULTS ══');
console.log('compound non-names matched to a Raziel angel: '+matchedNon.size+' / '+nons.length+' ('+(matchedNon.size/nons.length*100).toFixed(1)+'%)');
console.log('total match rows: '+matches.length+'\n');
const byType={};
for(const m of matches){byType[m.type]=(byType[m.type]||0)+1;}
console.log('by match type:');for(const[t,c]of Object.entries(byType))console.log('  '+t+': '+c);
console.log('\n══ ALL MATCHED NON-NAMES -> RAZIEL ANGEL ══');
console.log('  non-name(he)        display/gloss          -> angel            type');
for(const m of matches.sort((a,b)=>a.type.localeCompare(b.type))){
  console.log('  '+m.non.c.padEnd(18)+' '+(m.non.gloss||m.non.display||'').slice(0,20).padEnd(22)+' -> '+m.angName.padEnd(18)+' '+m.type);
}
// also: how many compound NAMES match angel names? (biblical names that are ALSO raziel angels)
const nameMatches=[];
for(const w of names){if(angHeSet.has(w.c))nameMatches.push({name:w,ang:angHeMap.get(w.c).join('/')});}
console.log('\n══ BONUS: compound BIBLICAL NAMES that are ALSO Raziel angel names: '+nameMatches.length+' ══');
for(const m of nameMatches){console.log('  '+m.name.display+' ('+m.name.c+') -> '+m.ang);}

// 4. The unmatched non-names — are they reduplicative eternal noise (the known |S|=0 class)?
const unmatched=nons.filter(w=>!matchedNon.has(w.c));
const redup=unmatched.filter(w=>{const c=w.c;return c.length>=4 && c.slice(0,c.length/2)===c.slice(c.length/2);});
console.log('\n══ UNMATCHED non-names: '+unmatched.length+'  (of which reduplicative '+redup.length+') ══');
console.log('  unmatched non-reduplicative sample (candidate recovered names NOT in Raziel):');
const cand=unmatched.filter(w=>{const c=w.c;return !(c.length>=4 && c.slice(0,c.length/2)===c.slice(c.length/2));});
for(const w of cand.slice(0,30))console.log('  '+w.c.padEnd(16)+' '+(w.gloss||w.display||'').slice(0,28)+'  ['+w.display+']');