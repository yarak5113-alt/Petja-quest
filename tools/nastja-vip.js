// Baut js/40-nastja-vip-pixel.js aus pixel/nastja_vip.json (VIP-Outfit, zwinkert, Braue hoch):
// erzeugt dazu pixel/nastja_vip_zu.json (beide Augen genießerisch zu: offenes Auge übermalt, Lidbogen + Wimpern).
//   node tools/nastja-vip.js
const fs=require('fs'),path=require('path'),root=path.join(__dirname,'..');
const o=JSON.parse(fs.readFileSync(path.join(root,'pixel/nastja_vip.json'),'utf8'));
const dec=r=>{const a=[];for(const m of r.matchAll(/([^0-9])([0-9]*)/g))for(let i=0;i<(+m[2]||1);i++)a.push(m[1]);while(a.length<o.width)a.push('.');return a};
const enc=a=>{let s='',x=0,last=a.length-1;while(last>=0&&a[last]==='.')last--;while(x<=last){let n=1;while(x+n<=last&&a[x+n]===a[x])n++;s+=a[x]+(n>1?n:'');x+=n}return s};
const G=o.rows.map(dec),set=(x,y,c)=>{G[y][x]=c};
// einzelne Tusche-Sprenkel (Reste vom Schachbrett-Hintergrund) mitten in Flächen weg
let weg=0;for(let y=1;y<o.height-1;y++)for(let x=1;x<o.width-1;x++){if(G[y][x]!=='K')continue;const n=[G[y-1][x],G[y+1][x],G[y][x-1],G[y][x+1]];if(n.some(c=>c==='K'||c==='.'))continue;const h={};n.forEach(c=>h[c]=(h[c]||0)+1);G[y][x]=Object.keys(h).sort((a,b)=>h[b]-h[a])[0];weg++}
o.rows=G.map(enc);console.log('Sprenkel entfernt:',weg);
// offenes Auge (x 64–81, y 49–60) mit Haut füllen
for(let y=49;y<=59;y++)for(let x=64;x<=81;x++)set(x,y,'S');for(let x=70;x<=77;x++)set(x,60,'S');
// Lid leicht schattiert, darunter der geschlossene Bogen (nach unten gewölbt), Lidstrich-Schwung außen, Wimpern unten
for(let x=68;x<=78;x++)set(x,55,'R');for(let x=69;x<=77;x++)set(x,56,'Q');
[[65,55],[66,55],[67,56],[68,56],[78,56],[79,56],[80,55]].forEach(([x,y])=>set(x,y,'D'));for(let x=69;x<=77;x++)set(x,57,'D');
[[64,54],[63,53]].forEach(([x,y])=>set(x,y,'D'));[[70,58],[73,58],[76,58]].forEach(([x,y])=>set(x,y,'F'));
const zu={...o,name:'nastja_vip_zu',rows:G.map(enc)};
fs.writeFileSync(path.join(root,'pixel/nastja_vip_zu.json'),JSON.stringify(zu));
const arr=q=>({w:q.width,h:q.height,palette:q.palette,rows:q.rows}),s=266/500,CX=o.width/2;
fs.writeFileSync(path.join(root,'js/40-nastja-vip-pixel.js'),`// ================= Nastja im VIP-Outfit (Pixel-Arrays) =================
// AUTOMATISCH erzeugt aus pixel/nastja_vip.json mit: node tools/nastja-vip.js  – nicht von Hand ändern.
// [0] zwinkert, Braue hoch (Enthüllung) · [1] beide Augen zu (Umziehen hinter dem Vorhang)
const NASTJA_VIP_URL=${JSON.stringify([o,zu].map(arr))}.map(nastjaURL);
const NASTJA_VIP_IMG=NASTJA_VIP_URL.map(u=>{const im=new Image();im.src=u;return im});
const NASTJA_VIP_G=${JSON.stringify([+(-CX*s).toFixed(2),-264,+(o.width*s).toFixed(2),266])};
`);
console.log('ok',o.width,o.height);
