// One-off: bake the 2026 ordinary-day scan into two compact bitmask arrays so the
// Reader can show the everyday recurrence gap for EVERY word instantly — without
// waiting for the live scanYear to finish (and on the prerendered SSG snapshot).
// Mirrors App.jsx scanYear exactly: skyAt7(fmtDate(makeDate(YEAR,1,1+i))) per day.
//   ORD_OCC[i]  = bitmask of occupied SIMPLE letters on day i (bit j = SIGNS[j]'s letter)
//   ORD_MOM[i]  = bitmask of geometrically-available MOTHERS on day i (א=bit0, מ=bit1, ש=bit2)
import { SIGNS, SIMPLE, MOTHERS, BODIES7, skyAt7, occupiedLetters, occupiedSigns, availableMothers, makeDate, fmtDate } from './src/core.jsx';

const YEAR = 2026;
const nDays = (YEAR%4===0 && (YEAR%100!==0 || YEAR%400===0)) ? 366 : 365;
const simpleBits = SIGNS.map(s => SIMPLE[s][0]);   // ['ה','ו','ז','ח','ט','י','ל','נ','ס','ע','צ','ק']
const momBits = MOTHERS.map(m => m[0]);             // ['א','מ','ש']
const bitOf = (c, arr) => { const i = arr.indexOf(c); return i < 0 ? 0 : (1 << i); };

const OCC = [], MOM = [];
for (let i = 0; i < nDays; i++) {
  const ds = fmtDate(makeDate(YEAR, 1, 1 + i));
  const rows = skyAt7(ds);
  const occ = occupiedLetters(rows);
  const moms = availableMothers(occupiedSigns(rows));
  let om = 0; for (const c of occ) om |= bitOf(c, simpleBits);
  let mm = 0; for (const c of moms) mm |= bitOf(c, momBits);
  OCC.push(om); MOM.push(mm);
}
// sanity: report a couple of known words' ordinary-day counts vs the live scan
function ordCount(simpChars, momsChars) {
  let n = 0;
  for (let i = 0; i < nDays; i++) {
    let ok = true;
    for (const c of simpChars) { const b = bitOf(c, simpleBits); if (!(OCC[i] & b)) { ok = false; break; } }
    if (ok) for (const c of momsChars) { const b = bitOf(c, momBits); if (!(MOM[i] & b)) { ok = false; break; } }
    if (ok) n++;
  }
  return n;
}
console.log(JSON.stringify({
  YEAR, nDays, simpleBits, momBits, OCC, MOM,
  sanity: {
    doubles_only_no_simp_no_mom: ordCount([], []),
    Vav_only_ו_Taurus: ordCount(['ו'], []),
    Heh_only_ה_Aries: ordCount(['ה'], []),
    Heh_Vav_ה_ו: ordCount(['ה','ו'], []),
  }
}));