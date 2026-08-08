import { JSDOM } from 'jsdom';
import { readFileSync } from 'fs';
const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>', { url:'http://127.0.0.1:8008/', pretendToBeVisual:true });
const { window } = dom;
Object.assign(global, { window, document: window.document, navigator: window.navigator, HTMLElement: window.HTMLElement, Node: window.Node, Element: window.Element });
global.requestAnimationFrame=(cb)=>setTimeout(cb,0); global.cancelAnimationFrame=(id)=>clearTimeout(id);
global.IS_REACT_ACT_ENVIRONMENT=true;
global.fetch=(url)=>{const s=String(url);const p=s.startsWith('http')?s.replace('http://127.0.0.1:8008/','./web/'):'./web/'+s;return Promise.resolve({ok:true,status:200,json:()=>JSON.parse(readFileSync(p,'utf8'))});};
await import('./web/app.bundle.js');
await new Promise(r=>setTimeout(r,400));
const root=document.getElementById('root');
const click=(sel,txt)=>{const el=[...root.querySelectorAll(sel)].find(x=>x.textContent===txt); el&&el.dispatchEvent(new window.MouseEvent('click',{bubbles:true}));};
const topTabs=[...root.querySelectorAll('.tab')].map(t=>t.textContent);
console.log('TOP TABS:', topTabs.length, JSON.stringify(topTabs));
async function check(top, sub){
  click('.tab', top); await new Promise(r=>setTimeout(r,120));
  const subs=[...root.querySelectorAll('.subtab')].map(t=>t.textContent);
  if(sub){ click('.subtab', sub); await new Promise(r=>setTimeout(r,120)); }
  const panel=root.querySelector('.panel');
  const h2=panel.querySelector('h2')?.textContent.slice(0,40);
  const phrases=panel.textContent.includes('sealed scroll — the biblical phrases')?'phrases✓':'';
  console.log(`${top}${sub?'/'+sub:''} | subtabs=${JSON.stringify(subs)} | h2=${h2} ${phrases}`);
}
await check('Sky Map');
await check('Translator');
await check('Reading'); await check('Reading','YHVH'); await check('Reading','Genesis 1:1');
await check('Time'); await check('Time','Ages');
await check('Sigils'); await check('Sigils','Kameot'); await check('Sigils','72 Angels');
await check('Cycles'); await check('Cycles','Week');
await check('Revelation');
await check('Cross-Cultural');
await check('Methodology');
process.exit(0);
