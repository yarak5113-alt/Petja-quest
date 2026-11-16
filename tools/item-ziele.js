// Ermittelt aus dem Quelltext, welche Gegenstände bei welchem Hotspot etwas bewirken können (für „Gegenstand auf X ziehen“):
// sammelt je Hotspot den Code (T-Eintrag, T.x.fn=…, wrapFn('x',…)) plus aufgerufene Funktionen (2 Ebenen) und sucht darin Gegenstands-IDs.
//   node tools/item-ziele.js   → schreibt js/43-item-ziele.js
const fs=require('fs'),path=require('path'),root=path.join(__dirname,'..');
const files=fs.readdirSync(path.join(root,'js')).filter(f=>f.endsWith('.js')&&!/^(10-tester|12-patch|26-durch|43-)/.test(f));
const src=files.map(f=>fs.readFileSync(path.join(root,'js',f),'utf8')).join('\n');
const block=(s,i)=>{const a=s.indexOf('{',i);if(a<0)return'';let d=0;for(let j=a;j<s.length;j++){const c=s[j];if(c==='{')d++;else if(c==='}'){d--;if(!d)return s.slice(a,j+1)}else if(c==="'"||c==='"'||c==='`'){const q=c;j++;while(j<s.length&&s[j]!==q){if(s[j]==='\\')j++;j++}}}return s.slice(a)};
// Gegenstände
const ITEM=new Set();for(const m of src.matchAll(/inv\.push\('([a-z0-9]+)'\)/g))ITEM.add(m[1]);for(const m of src.matchAll(/ITEMS\.([a-z0-9]+)=/g))ITEM.add(m[1]);
{const t=fs.readFileSync(path.join(root,'js/07-objekte.js'),'utf8'),a=t.indexOf('const ITEMS={');for(const m of block(t,a).matchAll(/([a-z0-9]+):\['/g))ITEM.add(m[1])}
// Funktionen (für Aufrufe)
const FN={};for(const m of src.matchAll(/function ([a-zA-Z_]\w*)\(/g))FN[m[1]]=block(src,m.index);
// Hotspot-Codeblöcke
const H={};const add=(id,code)=>{(H[id]=H[id]||[]).push(code)};
{const t=fs.readFileSync(path.join(root,'js/07-objekte.js'),'utf8'),a=t.indexOf('const T={'),body=block(t,a);for(const m of body.matchAll(/[\n,{]\s*([a-zA-Z]\w*):\{n:/g))add(m[1],block(body,m.index+m[0].length-4))}
for(const m of src.matchAll(/T\.([a-zA-Z]\w*)(?:\.fn)?=(?:\{|function)/g))add(m[1],block(src,m.index));
for(const m of src.matchAll(/wrapFn\('([a-zA-Z]\w*)'/g))add(m[1],block(src,m.index));
const items=code=>{const seen=new Set(),out=new Set();const walk=(c,d)=>{for(const m of c.matchAll(/'([a-z0-9]+)'/g))if(ITEM.has(m[1]))out.add(m[1]);
    if(d<2)for(const m of c.matchAll(/\b([a-zA-Z_]\w*)\(/g))if(FN[m[1]]&&!seen.has(m[1])){seen.add(m[1]);walk(FN[m[1]],d+1)}};walk(code,0);return[...out].sort()};
const Z={};for(const id in H){const it=items(H[id].join('\n'));if(it.length)Z[id]=it}
fs.writeFileSync(path.join(root,'js/43-item-ziele.js'),`// ================= Welche Gegenstände wo etwas bewirken (für „Gegenstand auf X ziehen“) =================
// AUTOMATISCH erzeugt mit: node tools/item-ziele.js – nicht von Hand ändern. Fehlt ein Ziel, kommt eine sarkastische Absage.
const ITEM_ZIELE=${JSON.stringify(Z)};
`);
console.log(Object.keys(Z).length,'Hotspots mit Gegenständen');console.log(Object.entries(Z).slice(0,60).map(([k,v])=>k+': '+v.join(',')).join('\n'));
