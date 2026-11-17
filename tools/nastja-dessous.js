// Baut js/48-nastja-dessous-pixel.js aus pixel/nastja_dessous.json (Nastja im Dessous-Outfit ab 80 % Beziehung).
//   node tools/nastja-dessous.js
// Vorlage neu umwandeln (Vorlage mit dunklem Karo-Hintergrund):
//   node tools/karo-weg.js pixel/nastja_dessous_vorlage.png <frei.png>
//   node tools/bild2array.js <frei.png> nastja_dessous pixel/nastja_dessous.json <vorschau.png> 20 500
//   node tools/json2png.js pixel/nastja_dessous.json pixel/nastja_dessous.png
const fs=require('fs'),path=require('path'),root=path.join(__dirname,'..');
const o=JSON.parse(fs.readFileSync(path.join(root,'pixel/nastja_dessous.json'),'utf8'));
const dec=r=>{const a=[];for(const m of r.matchAll(/([^0-9])([0-9]*)/g))for(let i=0;i<(+m[2]||1);i++)a.push(m[1]);while(a.length<o.width)a.push('.');return a};
const enc=a=>{let s='',x=0,last=a.length-1;while(last>=0&&a[last]==='.')last--;while(x<=last){let n=1;while(x+n<=last&&a[x+n]===a[x])n++;s+=a[x]+(n>1?n:'');x+=n}return s};
// bild2array entsättigt um 15 % – hier zurück auf die Farben der Vorlage
for(const k in o.palette){const v=o.palette[k];if(!v||k==='K')continue;const c=[1,3,5].map(i=>parseInt(v.slice(i,i+2),16)),L=.299*c[0]+.587*c[1]+.114*c[2];o.palette[k]='#'+c.map(x=>Math.max(0,Math.min(255,Math.round(L+(x-L)/.85))).toString(16).padStart(2,'0')).join('')}
const W=o.width,H=o.height,G=o.rows.map(dec);
// nur die größte zusammenhängende Fläche behalten (8er-Nachbarschaft) – Karo-Reste weg
{const lab=new Int32Array(W*H).fill(-1),groesse=[];for(let s=0;s<W*H;s++){const sx=s%W,sy=(s-sx)/W;if(lab[s]>=0||G[sy][sx]==='.')continue;const n=groesse.length;let c=0;const st=[s];lab[s]=n;
  while(st.length){const k=st.pop(),x=k%W,y=(k-x)/W;c++;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const X=x+dx,Y=y+dy;if(X<0||Y<0||X>=W||Y>=H)continue;const j=Y*W+X;if(lab[j]<0&&G[Y][X]!=='.'){lab[j]=n;st.push(j)}}}groesse.push(c)}
  const gross=groesse.indexOf(Math.max(...groesse));let weg=0;for(let k=0;k<W*H;k++)if(lab[k]>=0&&lab[k]!==gross){G[(k-k%W)/W][k%W]='.';weg++}console.log('Reste entfernt:',weg)}
const des={...o,rows:G.map(enc)};
fs.writeFileSync(path.join(root,'pixel/nastja_dessous.json'),JSON.stringify(des));
const arr=q=>({w:q.width,h:q.height,palette:q.palette,rows:q.rows}),s=266/500,CX=W/2;
fs.writeFileSync(path.join(root,'js/48-nastja-dessous-pixel.js'),`// ================= Nastja im Dessous-Outfit (Pixel-Array, ab 80 % Beziehung) =================
// AUTOMATISCH erzeugt aus pixel/nastja_dessous.json mit: node tools/nastja-dessous.js  – nicht von Hand ändern.
const NASTJA_DES_URL=nastjaURL(${JSON.stringify(arr(des))});
const NASTJA_DES_IMG=(()=>{const im=new Image();im.src=NASTJA_DES_URL;return im})();
const NASTJA_DES_G=${JSON.stringify([+(-CX*s).toFixed(2),-264,+(W*s).toFixed(2),266])};
`);
console.log('ok',W,H);
