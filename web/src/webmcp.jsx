// webmcp.jsx — exposes the app's stellar-reading computation to browser AI agents
// via the WebMCP imperative API (document.modelContext.registerTool). WebMCP is a
// proposed web standard (Chrome origin trial, webmachinelearning/webmcp) letting a
// page declare structured tools — name, description, JSON-Schema input, async execute
// returning a string — that agents such as Gemini in Chrome can discover and invoke.
//
// All tools wrap the SAME pure compute core the UI uses (core.jsx), so an agent's answer
// is bit-identical to what a human sees on screen. No-op when the API is absent (older
// browsers, SSR prerender in Node) — registration is feature-gated.
import {
  skyAt, skyAt7, occupiedLetters, bySign, eraForYear, readableWords, genesisReadable,
  gematria, simpleSet, norm, displayHe, displayDate, isopsephy, abjad, katapayadi,
  ANGEL_NAME_MAP, SIMPLE, SIGNS
} from './core.jsx';
import { PROPHETS } from './data/prophets.js';
import { MAGES } from './data/mages.js';
import { MAGES_CONTENT } from './data/mages-content.js';

const j = (o) => JSON.stringify(o);

function smallestArc(lons){
  const s=[...lons].sort((a,b)=>a-b);
  if(s.length<2) return 0;
  let maxGap=0;
  for(let i=1;i<s.length;i++) maxGap=Math.max(maxGap, s[i]-s[i-1]);
  maxGap=Math.max(maxGap, (s[0]+360)-s[s.length-1]);
  return 360-maxGap;
}

function alignmentMetrics(date){
  const rows = skyAt7(date);   // 7 classical bodies — the Sefer Yetzirah's 7 doubles (the alignment set)
  const bs = bySign(rows);
  let best=null;
  for(const [sg,list] of Object.entries(bs)) if(!best || list.length>best.list.length) best={sign:sg,list};
  const lons = rows.map(r=>r.lon);
  const year = parseInt(String(date).slice(0,4),10) || 2026;
  return {
    date, nBodies: rows.length, maxInSign: best?best.list.length:0, sign: best?best.sign:'—',
    span: +smallestArc(lons).toFixed(2), era: eraForYear(year),
    occupiedSigns: [...new Set(rows.map(r=>r.sign))], bySign: Object.fromEntries(Object.entries(bs).map(([k,v])=>[k,v.length]))
  };
}

// Register every tool. `lex` = parsed lexicon.json, `angelMap` = ANGEL72 Map (may be null).
// Idempotent + best-effort: a failed registration is logged but never throws into the UI.
export function registerWebMCPTools({ lex, angelMap }){
  if(typeof document==='undefined' || !document.modelContext || typeof document.modelContext.registerTool!=='function') return;
  const LEX = lex ? lex.lexicon : null;
  const reg = (tool) => {
    try { Promise.resolve(document.modelContext.registerTool(tool)).catch(()=>{}); }
    catch(e){ /* feature absent or blocked — ignore */ }
  };

  reg({
    name: 'read_sky',
    description: 'Read the Hebrew letters spelled in the sky on a given Gregorian date. Returns the occupied zodiac signs, the readable simple letters (Sefer Yetzirah), the precessional era, whether Genesis 1:1 is legible, and the top readable Hebrew names. Use ISO date YYYY-MM-DD (BCE as -YYYY-MM-DD).',
    inputSchema: { type:'object', properties:{ date:{ type:'string', description:'ISO date, e.g. 2026-08-10 or -0427-01-01' } }, required:['date'] },
    execute: async ({ date }) => {
      const rows = skyAt7(date);   // 7 classical bodies — the only bodies that occupy letters in the reading
      const occ = occupiedLetters(rows);
      const words = LEX ? readableWords(occ, LEX, angelMap) : [];
      const top = words.slice(0,20).map(w=>({ he:w.disp, translit:w.translit, gloss:w.gloss, gematria:w.gem, letters:w.len, name:!!w.name, angel:!!w.angelName }));
      return j({ date:displayDate(date), nBodies:rows.length, occupiedSigns:[...new Set(rows.map(r=>r.sign))], readableSimples:[...occ].sort(), era:eraForYear(parseInt(String(date).slice(0,4),10)||2026), genesisLegible: genesisReadable(occ), readableCount: words.length, topNames: top });
    }
  });

  reg({
    name: 'alignment_metrics',
    description: 'Compute the rare-alignment metrics for a date: how many of the 7 classical bodies (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn — the Sefer Yetzirah\'s 7 doubles) fall in a single zodiac sign, the tightest enclosing arc in degrees, and the precessional era. Use ISO date YYYY-MM-DD.',
    inputSchema: { type:'object', properties:{ date:{ type:'string' } }, required:['date'] },
    execute: async ({ date }) => j(alignmentMetrics(date))
  });

  reg({
    name: 'word_gloss',
    description: 'Look up a Hebrew word (unpointed consonants) in the Strong lexicon: transliteration, gloss, part of speech, gematria (ancient standard א=1…ת=400), the Sefer Yetzirah simple letters it requires, length, and whether it is a proper name or a known angel. Works for any consonants even if not readable in today\'s sky.',
    inputSchema: { type:'object', properties:{ hebrew:{ type:'string', description:'Unpointed Hebrew consonants, e.g. מלאך or אלהים' } }, required:['hebrew'] },
    execute: async ({ hebrew }) => {
      const he = norm(hebrew);
      const simp = [...simpleSet(he)].sort().join('');
      const isAngel = ANGEL_NAME_MAP.has(he);
      let entry = null;
      if(LEX){
        for(const [cons,trans,gloss,pos] of LEX){ if(norm(cons)===he){ entry={ he:displayHe(cons), translit:trans, gloss, pos, gematria:gematria(cons), simpleLetters:simp, letters:cons.length }; break; } }
      }
      const an = ANGEL_NAME_MAP.get(he);
      return j(entry || { he:displayHe(hebrew), translit: an?an.en:'—', gloss: an?('angel — '+an.en):'(not in lexicon)', gematria:gematria(hebrew), simpleLetters:simp, letters:hebrew.length, isAngel, angelSource: an?an.src:null });
    }
  });

  reg({
    name: 'search_words',
    description: 'Search the Hebrew lexicon by transliteration, gloss, or Hebrew consonants. Returns up to N matching entries with their gematria and required simple letters. Useful for finding names/roots by meaning.',
    inputSchema: { type:'object', properties:{ query:{ type:'string' }, max:{ type:'integer', description:'Max results (default 25)', minimum:1, maximum:100 } }, required:['query'] },
    execute: async ({ query, max }) => {
      if(!LEX) return j({ error:'lexicon not loaded' });
      const q = String(query||'').toLowerCase().trim();
      const n = Math.min(Math.max(max||25,1),100);
      const out=[];
      for(const [cons,trans,gloss,pos] of LEX){
        if(!q) break;
        if(trans.toLowerCase().includes(q) || gloss.toLowerCase().includes(q) || cons.includes(q)){
          out.push({ he:displayHe(cons), translit:trans, gloss, pos, gematria:gematria(cons), simpleLetters:[...simpleSet(cons)].sort().join('') });
          if(out.length>=n) break;
        }
      }
      return j({ query, count:out.length, results:out });
    }
  });

  reg({
    name: 'gematria_value',
    description: 'Compute the numeric value of a word in one of four historical letter-number systems: Hebrew (standard א=1…ת=400, finals take base value), Greek isopsephy, Arabic abjad (28-letter Mashriqi order), or Indian katapayadi (right-to-left, consonants only). Default system is hebrew.',
    inputSchema: { type:'object', properties:{ text:{ type:'string' }, system:{ type:'string', enum:['hebrew','greek','arabic','katapayadi'], description:'Letter-number system (default hebrew)' } }, required:['text'] },
    execute: async ({ text, system }) => {
      const sys = system || 'hebrew';
      let value=0, perLetter=[];
      if(sys==='hebrew'){
        for(const ch of String(text)) { const v=gematria(ch); if(v||/[֐-ת]/.test(ch)){ value+=v; perLetter.push({letter:ch, value:v}); } }
      } else if(sys==='greek'){ value=isopsephy(text); }
      else if(sys==='arabic'){ for(const ch of String(text)){ const v=abjad(ch); if(v){ value+=v; perLetter.push({letter:ch,value:v}); } } }
      else if(sys==='katapayadi'){ const s=katapayadi(text); value=parseInt(s,10)||0; perLetter=[{digits:s}]; }
      else return j({ error:'unknown system; use hebrew|greek|arabic|katapayadi' });
      return j({ system:sys, text, value, perLetter });
    }
  });

  reg({
    name: 'prophet_info',
    description: 'Return the prophet/mage lineage entry by name (e.g. "Daniel", "Jacob Frank"), or the full list of 61 prophetic figures from Adam to Jacob Frank if no name is given. Each entry has years, region, role, and thread.',
    inputSchema: { type:'object', properties:{ name:{ type:'string', description:'Prophet name (case-insensitive); omit for the full list' } } },
    execute: async ({ name }) => {
      if(!name) return j({ count:PROPHETS.length, prophets:PROPHETS.map(p=>({name:p.name, years:p.years, role:p.role, thread:p.thread, endpoint:!!p.endpoint})) });
      const n = String(name).toLowerCase();
      const p = PROPHETS.find(x=>x.name.toLowerCase()===n || x.name.toLowerCase().includes(n));
      return p ? j({ name:p.name, years:p.years, era:p.era, region:p.region, role:p.role, thread:p.thread, endpoint:!!p.endpoint }) : j({ error:'prophet not found', available:PROPHETS.map(x=>x.name) });
    }
  });

  reg({
    name: 'mage_info',
    description: 'Return the magi lineage entry by name (e.g. "Ramon Llull", "Alfonso X of Castile", "Aleister Crowley"), with a 2-3 paragraph Wikipedia-grounded biography and a profile (table) of the mage\'s most important works. Omit name for the full list of 40 magi from Adapa to Aleister Crowley.',
    inputSchema: { type:'object', properties:{ name:{ type:'string', description:'Mage name (case-insensitive); omit for the full list' } } },
    execute: async ({ name }) => {
      if(!name) return j({ count:MAGES.length, mages:MAGES.map(m=>({name:m.name, years:m.years, region:m.region, role:m.role, endpoint:!!m.endpoint})) });
      const n = String(name).toLowerCase();
      const m = MAGES.find(x=>x.name.toLowerCase()===n || x.name.toLowerCase().includes(n));
      if(!m) return j({ error:'mage not found', available:MAGES.map(x=>x.name) });
      const c = MAGES_CONTENT[m.name] || {};
      return j({ name:m.name, years:m.years, region:m.region, role:m.role, isIberian:m.isIberian, isRoyal:m.isRoyal, endpoint:!!m.endpoint, wikipediaUrl:c.wikipediaUrl||null, bio:c.bio||null, works:c.works||[] });
    }
  });
}