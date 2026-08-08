// lib.mjs — módulo compartido para todos los calc_*.mjs y tests.mjs
// Espejo exacto de la lógica de app.jsx + constantes astronómicas + helpers de validación.
import * as Astronomy from './astronomy-engine.mjs';
export { Astronomy };

// ====== Sefer Yetzirah: mapas (idénticos a app.jsx) ======
export const SIGNS = ['Aries','Tauro','Géminis','Cáncer','Leo','Virgo','Libra','Escorpio','Sagitario','Capricornio','Acuario','Piscis'];
export const SIMPLE = {
  'Aries':['ה','Heh',5], 'Tauro':['ו','Vav',6], 'Géminis':['ז','Zayin',7], 'Cáncer':['ח','Chet',8],
  'Leo':['ט','Tet',9], 'Virgo':['י','Yod',10], 'Libra':['ל','Lamed',30], 'Escorpio':['נ','Nun',50],
  'Sagitario':['ס','Samekh',60], 'Capricornio':['ע','Ayin',70], 'Acuario':['צ','Tzaddi',90], 'Piscis':['ק','Qoph',100]
};
export const LETTER_TO_SIGN = {}; Object.entries(SIMPLE).forEach(([s,[he]])=>{LETTER_TO_SIGN[he]=s});
export const DOUBLES = {
  'Saturno':['ב','Bet',2], 'Júpiter':['ג','Gimel',3], 'Marte':['ד','Dalet',4], 'Sol':['כ','Kaph',20],
  'Venus':['פ','Pe',80], 'Mercurio':['ר','Resh',200], 'Luna':['ת','Tav',400]
};
export const MOTHERS = [
  ['א','Aleph','aire · Draco',268],
  ['מ','Mem','agua · Osa Menor',89],
  ['ש','Shin','fuego · Casiopea',38]
];
export const BODIES = ['Saturno','Júpiter','Marte','Sol','Venus','Mercurio','Luna','Urano','Neptuno','Plutón'];
export const AE_NAME = {Saturno:'Saturn',Júpiter:'Jupiter',Marte:'Mars',Sol:'Sun',Venus:'Venus',Mercurio:'Mercury',Luna:'Moon',Urano:'Uranus',Neptuno:'Neptune',Plutón:'Pluto'};

export const FIN2REG = {'ן':'נ','ץ':'צ','ך':'כ','ם':'מ','ף':'פ'};
export const REG2FIN = {'נ':'ן','צ':'ץ','כ':'ך','מ':'ם','פ':'ף'};
export const SIMPLE_LETTERS = new Set(Object.values(SIMPLE).map(x=>x[0]));
export const GV = {א:1,ב:2,ג:3,ד:4,ה:5,ו:6,ז:7,ח:8,ט:9,י:10,כ:20,ל:30,מ:40,נ:50,ס:60,ע:70,פ:80,צ:90,ק:100,ר:200,ש:300,ת:400};

// ====== Gematría / legibilidad (idéntico a app.jsx) ======
export function norm(s){ return [...s].map(c=>FIN2REG[c]||c).join(''); }
export function displayHe(s){ if(!s) return s; const last=s[s.length-1]; const f=REG2FIN[last]; return f ? s.slice(0,-1)+f : s; }
export function gematria(s){ return [...s].reduce((a,c)=>a+(GV[c]||0),0); }
export function simpleSet(cons){ const s=new Set(); for(const c of cons) if(SIMPLE_LETTERS.has(c)) s.add(c); return s; }
export function formable(cons, occ){ for(const c of simpleSet(cons)) if(!occ.has(c)) return false; return true; }

export function skyAt(dateStr){
  const d = new Date(dateStr + 'T12:00:00Z');
  return BODIES.map(b=>{
    const v = Astronomy.GeoVector(Astronomy.Body[AE_NAME[b]], d, true);
    const lon = Astronomy.Ecliptic(v).elon;
    let si = Math.floor(lon/30) % 12; if(si<0) si+=12;
    return { body:b, lon, sign:SIGNS[si], deg: lon - si*30, boundary:(lon-si*30)<1||(lon-si*30)>29 };
  });
}
export function occupiedLetters(rows){ const s=new Set(); rows.forEach(r=>s.add(SIMPLE[r.sign][0])); return s; }
export function occupiedSigns(rows){ return new Set(rows.map(r=>r.sign)); }

export const GENESIS = [
  ['בראשית','en el principio'],['ברא','creó'],['אלהים','Dios'],['את','(acusativo: a)'],
  ['השמים','los cielos'],['ואת','y (acusativo)'],['הארץ','la tierra']
];
export const GEN_WORDS = GENESIS.map(([w])=>norm(w));
export function genesisReadable(occ){ return GEN_WORDS.every(w=>formable(w, occ)); }
export const GEN_TOTAL = 2701;

// ====== Precesión / eras (idéntico a app.jsx) ======
export const PREC = 50.29/3600;          // grados/año
export const AGE = 30/PREC;              // años por era zodiacal
export const FULL = 360/PREC;            // año grande precesional
export const AYANAMSIS = 24.18;
export const EQUINOX_LON = (360 - AYANAMSIS) % 360;
export function ageBoundaries(){
  const out=[];
  for(let i=0;i<12;i++){
    const hi=(i+1)*30; let dt=(EQUINOX_LON-hi)/PREC;
    while(dt>FULL/2) dt-=FULL; while(dt<-FULL/2) dt+=FULL;
    const start=2024+dt; out.push({sign:SIGNS[i], he:SIMPLE[SIGNS[i]][0], start, end:start+AGE});
  }
  return out;
}
export function yrLabel(y){ return y<0 ? Math.round(-y)+' a.C.' : Math.round(y)+' d.C.'; }

// ====== Constantes astronómicas (días) ======
export const SYN = 29.530589;   // mes sinódico
export const DRAC = 27.212221;  // mes dracónico
export const ANOM = 27.554550;  // mes anomalístico
export const TROP = 365.24219;  // año trópico
export const ECLY = 346.620083; // año de eclipses (retorno al nodo)

// ====== Palíndromo-espejo (gematría + inverso de cifras = palíndromo) ======
export function mirrorSum(g){ const s=String(g); const r=[...s].reverse().join(''); return g + Number(r); }
export function isMirror(g){ const s=String(mirrorSum(g)); return s === [...s].reverse().join(''); }
export function divisibleBy(g,n){ return g % n === 0; }
export function isTriangular(g){ const k=Math.round(Math.sqrt(2*g)); return k*(k+1)/2 === g; }

// ====== Lector de lexicón ======
export async function loadLexicon(path='./lexicon.json'){
  const fs = await import('node:fs/promises');
  const j = JSON.parse(await fs.readFile(path,'utf8'));
  return j; // { lexicon: [[cons,translit,gloss,pos],...], esGloss: {...} }
}

// PRNG determinista (mulberry32) — semilla 20260807 para reproducibilidad exacta
export function mulberry32(seed){
  return function(){
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}