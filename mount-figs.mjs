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
async function check(path){
  for(const [sel,txt] of path){ click(sel,txt); await new Promise(r=>setTimeout(r,120)); }
  const figs=root.querySelectorAll('.panel .fig');
  const svgs=root.querySelectorAll('.panel .fig svg');
  const caps=[...root.querySelectorAll('.panel .fig .cap')].map(c=>c.textContent.match(/Fig\. \d+/)?.[0]).filter(Boolean);
  console.log(`${path.map(p=>p[1]).join(' > ')} | .fig=${figs.length} svg=${svgs.length} caps=${JSON.stringify(caps)}`);
}
await check([['.tab','Reading'],['.subtab','Reading Rule']]);
await check([['.tab','Reading'],['.subtab','Genesis 1:1']]);
await check([['.tab','Time'],['.subtab','Ages']]);
await check([['.tab','Sigils'],['.subtab','Sigil Forge']]);
await check([['.tab','Sigils'],['.subtab','Kameot']]);
await check([['.tab','Sigils'],['.subtab','72 Angels']]);
await check([['.tab','Revelation']]);
process.exit(0);
