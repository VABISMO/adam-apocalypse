// fetch_gen.mjs — descarga el corpus de Génesis y Éxodo 14:19-21 vía API Sefaria,
// los reduce a consonantes masoréticas (sin vocales ni teamim) y los cachea en corpus.json.
// Uso:  node fetch_gen.mjs
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';

const OUT = './corpus.json';
const TIMEOUT = 30000;

// Conserva SOLO consonantes hebreas (incluidas las 5 finales). Quita niqqud, teamim, signos, números.
const HEB = /[א-תןץךםף]/g; // א-ת + ן ץ ך ם ף
function stripHe(s){
  if(!s) return '';
  return (s.match(HEB)||[]).join('');
}

async function fetchJSON(url){
  const ctrl = new AbortController();
  const to = setTimeout(()=>ctrl.abort(), TIMEOUT);
  try{
    const r = await fetch(url, {signal: ctrl.signal});
    if(!r.ok) throw new Error('HTTP '+r.status);
    return await r.json();
  } finally { clearTimeout(to); }
}

// Aplana el campo text de una versión Sefaria (array anidado capítulo→verso, o string)
function flattenVerses(text){
  const out=[];
  const walk=(x)=>{ if(Array.isArray(x)) x.forEach(walk); else if(typeof x==='string'){ const s=stripHe(x); if(s) out.push(s); } };
  walk(text);
  return out;
}

async function fetchBookChapters(ref, nCh){
  const verses=[];
  for(let c=1;c<=nCh;c++){
    const url=`https://www.sefaria.org/api/v3/texts/${ref}.${c}?version=hebrew&context=0`;
    try{
      const j=await fetchJSON(url);
      const v=j.versions?.[0]?.text;
      const flat=flattenVerses(v);
      flat.forEach(s=>verses.push(s));
      process.stdout.write(`\r  ${ref} cap ${c}/${nCh}: ${verses.length} versos`);
    }catch(e){ console.error(`\n  ✗ ${ref} cap ${c}: ${e.message}`); }
  }
  console.log('');
  return verses;
}

async function fetchVerses(ref){
  const url=`https://www.sefaria.org/api/v3/texts/${ref}?version=hebrew&context=0`;
  const j=await fetchJSON(url);
  return flattenVerses(j.versions?.[0]?.text);
}

async function main(){
  if(existsSync(OUT)){
    console.log(`corpus.json ya existe. (borra para re-descargar.)`);
    return;
  }
  console.log('Descargando Génesis (50 capítulos)…');
  const genesis = await fetchBookChapters('Genesis', 50);
  console.log('Descargando Éxodo 14:19-21…');
  const exo = await fetchVerses('Exodus.14.19-Exodus.14.21');
  const corpus = { genesis, exodus1419_21: exo,
    nGenesis: genesis.length, nExo: exo.length,
    fetchedAt: '2026-08-07' };
  await fs.writeFile(OUT, JSON.stringify(corpus));
  console.log(`\nGuardado ${OUT}: Génesis ${genesis.length} versos; Éxodo 14:19-21 ${exo.length} versos.`);
  if(exo.length>=3){
    console.log('  Ex 14:19 =',exo[0].length,'consonantes');
    console.log('  Ex 14:20 =',exo[1].length,'consonantes');
    console.log('  Ex 14:21 =',exo[2].length,'consonantes');
  }
}

main().catch(e=>{ console.error('FATAL:',e.message); process.exit(1); });