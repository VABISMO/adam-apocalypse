// calc_magic_squares.mjs — reproduce §15.1 (kameot, Aiq Bekar, sigilos).
//   (1) Los 7 cuadrados mágicos planetarios (kameot de Agrippa): constantes y verificación
//       de que filas/cols/diagonales suman M(n)=n(n²+1)/2. Orden planeta↔doble↔kamea.
//   (2) Lo Shu 3×3 (Saturno) — el kamea sobre el que se trazan los sigilos hebreos.
//   (3) Aiq Bekar: la reducción de cada letra a 1..9 por suma de dígitos. Demostramos que
//       es EXACTAMENTE la gematría decimal-posicional de §2: los 9 grupos son la rejilla
//       {1,10,100},{2,20,200},…,{9,90,900}. Sin esta reducción no hay sigilo: es el puente.
//   (4) Enlaces cruzados: Mercurio 8×8 cte 260 == Tzolkin maya (260); Sol 6×6 total 666.
// Uso:  node calc_magic_squares.mjs
import { GV } from './lib.mjs';
const p = (...a) => console.log(...a);

// ── magic-square construction for any n ──
function siamese(n){                       // n impar
  const sq=[...Array(n)].map(()=>Array(n).fill(0));
  let r=0,c=(n>>1); for(let k=1;k<=n*n;k++){
    if(sq[r][c]){ r=(r+2)%n; c=(c+n-1)%n; }
    sq[r][c]=k; r=(r+n-1)%n; c=(c+1)%n;
  } return sq;
}
function doublyEven(n){                    // n múltiplo de 4
  const sq=[...Array(n)].map((_,i)=>[...Array(n)].map((_,j)=>i*n+j+1));
  const mark=(i,j)=>{ const bi=i%4,bj=j%4; return (bi===bj)||(bi+bj===3); };
  for(let i=0;i<n;i++)for(let j=0;j<n;j++) if(mark(i,j)) sq[i][j]=n*n+1-sq[i][j];
  return sq;
}
function singlyEven(n){                    // n = 4k+2  (Strachey; aquí sólo n=6)
  const m=n>>1, A=siamese(m), M=m*m;
  const g=[...Array(n)].map(()=>Array(n).fill(0));
  for(let i=0;i<m;i++)for(let j=0;j<m;j++){
    g[i][j]=A[i][j]; g[i+m][j+m]=A[i][j]+M; g[i][j+m]=A[i][j]+2*M; g[i+m][j]=A[i][j]+3*M;
  }
  const k=(m-1)>>1;
  // (a) intercambiar las primeras k columnas entre TL y BL (todas las filas)
  for(let i=0;i<m;i++)for(let j=0;j<k;j++){ const t=g[i][j]; g[i][j]=g[i+m][j]; g[i+m][j]=t; }
  // (b) fila central del semicuadrante superior: desplazar el intercambio una col. a la derecha
  { const t=g[k][k-1]; g[k][k-1]=g[k+m][k-1]; g[k+m][k-1]=t; }
  { const t=g[k][k];   g[k][k]=g[k+m][k];     g[k+m][k]=t; }
  // (c) últimas k-1 celdas de la fila central en la mitad derecha (TR<->BR)
  for(let j=0;j<k-1;j++){ const col=m+1+j; const t=g[k][col]; g[k][col]=g[k+m][col]; g[k+m][col]=t; }
  return g;
}
export function buildMagic(n){ return n%2? siamese(n) : n%4===0? doublyEven(n) : singlyEven(n); }

const isMagic=(sq)=>{ const n=sq.length, M=n*(n*n+1)/2;
  const rows=sq.map(r=>r.reduce((a,b)=>a+b,0));
  const cols=[...Array(n)].map((_,j)=>sq.reduce((a,r)=>a+r[j],0));
  const d1=sq.reduce((a,r,i)=>a+r[i],0), d2=sq.reduce((a,r,i)=>a+r[n-1-i],0);
  const all=[...rows,...cols,d1,d2];
  return all.every(x=>x===M);
};

// ── §15.1.A  los 7 kameot ──
p('=== §15.1.A  Los 7 cuadrados mágicos planetarios (kameot) ===');
// planeta -> orden -> doble (Sefer Yetzirah, recensión larga/Gra, = lib.mjs DOUBLES)
const KAMEOT=[
  ['Saturno (שבתאי)',3,'ב'], ['Júpiter (צדק)',4,'ג'],
  ['Marte (מאדים)',5,'ד'],   ['Sol (חמה)',6,'כ'],
  ['Venus (נוגה)',7,'פ'],    ['Mercurio (כוכב)',8,'ר'],
  ['Luna (לבנה)',9,'ת'],
];
let allMagic=true;
for(const [name,n,dbl] of KAMEOT){
  const M=n*(n*n+1)/2, total=n*n*M;
  const sq=buildMagic(n);
  const ok=isMagic(sq); if(!ok) allMagic=false;
  p(`  ${name.padEnd(20)} ${n}×${n}  doble=${dbl}  cte=${M}  total=${total}  mágico=${ok?'✓':'✗'}`);
}
p(`  -> los 7 kameot verifican su propiedad mágica: ${allMagic?'SÍ ✓':'NO ✗'}`);
p('  -> 7 cuadrados ↔ 7 dobles ↔ 7 planetas: misma correspondencia Sefer Yetzirah §4.');

// ── §15.1.B  Lo Shu ──
const loShu=siamese(3);  // Siamese da el Lo Shu rotado; usamos el canónico:
const LO_SHU=[[4,9,2],[3,5,7],[8,1,6]];
p('\n=== §15.1.B  Lo Shu 3×3 (kamea de Saturno, base de los sigilos) ===');
p('  Lo Shu:'); LO_SHU.forEach(r=>p('   '+r.map(x=>String(x).padStart(2)).join(' ')));
p('  mágico:', isMagic(LO_SHU), ' cte=15');

// ── §15.1.C  Aiq Bekar = gematría decimal-posicional ──
const reduce=(v)=>{ let s=v; while(s>9) s=String(s).split('').reduce((a,d)=>a+ +d,0); return s===0?9:s; };
const finals={0x05DA:500,0x05DD:600,0x05DF:700,0x05E3:800,0x05E5:900};
const letterVal=(ch)=> finals[ch.charCodeAt(0)] ?? GV[ch];
p('\n=== §15.1.C  Aiq Bekar (reducción 1..9) = gematría decimal-posicional de §2 ===');
const all27='אבגדהוזחטיכלמנסעפצקרשתךםןףץ';
let matchGV=true;
for(const ch of all27){ const v=letterVal(ch); const r=reduce(v);
  let s=GV[ch]??finals[ch.charCodeAt(0)]; while(s>9) s=String(s).split('').reduce((a,d)=>a+ +d,0); if(s===0)s=9;
  if(r!==s) matchGV=false;
}
p(`  reducción Aiq Bekar == suma-de-dígitos de GV para las 27 letras: ${matchGV?'SÍ ✓':'NO ✗'}`);
const groups={1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[]};
for(const ch of all27){ const v=letterVal(ch); groups[reduce(v)].push(`${ch}${v}`); }
p('  los 9 grupos (rejilla decimal 3×3):');
for(const g of[1,2,3,4,5,6,7,8,9]) p(`   ${g}: { ${groups[g].join(', ')} }`);
p('  -> cada grupo reúne las letras de igual dígito en unidades/decenas/centenas.');
p('  -> la rejilla 3×3 de Aiq Bekar ES la estructura 9=9+9+9 de §2. Sin ella, el sigilo');
p('     (que traza letras reducidas sobre el Lo Shu 3×3) no existiría. Puente §2↔sigilo.');

// ── §15.1.D  enlaces cruzados ──
p('\n=== §15.1.D  Enlaces cruzados ===');
p('  Mercurio 8×8  cte mágica = 260 == Tzolkin maya (260 días).  (cf. §9.6)');
p('  Sol 6×6       cte=111 ; suma 1..36 = 666 = 6×111 (el «número solar», Apoc 13:18).');
p('  Saturno 3×3   cte = 15   = יה (10+5) ; total 45 = מה (40+5) "¿Qué?".');
p('  7 kameot = 7 días de la semana planetaria (orden caldeo)');