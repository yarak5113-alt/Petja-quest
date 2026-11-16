// Baut js/40-nastja-vip-pixel.js aus pixel/nastja_vip.json (Nastja im VIP-Outfit, vom gelieferten Pixelbild umgewandelt):
// räumt Reste vom Karo-Hintergrund weg (nur die zusammenhängende Figur bleibt, einzelne Tuschepunkte in Flächen weg)
// und erzeugt pixel/nastja_vip_zu.json (beide Augen genießerisch zu: offenes Auge übermalt, Lidbogen + Wimpern).
//   node tools/nastja-vip.js
// Vorlage neu umwandeln: node tools/bild2array.js <freigestellt.png> nastja_vip pixel/nastja_vip.json <vorschau.png> 20 500
const fs=require('fs'),path=require('path'),root=path.join(__dirname,'..');
const o=JSON.parse(fs.readFileSync(path.join(root,'pixel/nastja_vip.json'),'utf8'));
const dec=r=>{const a=[];for(const m of r.matchAll(/([^0-9])([0-9]*)/g))for(let i=0;i<(+m[2]||1);i++)a.push(m[1]);while(a.length<o.width)a.push('.');return a};
const enc=a=>{let s='',x=0,last=a.length-1;while(last>=0&&a[last]==='.')last--;while(x<=last){let n=1;while(x+n<=last&&a[x+n]===a[x])n++;s+=a[x]+(n>1?n:'');x+=n}return s};
// bild2array entsättigt um 15 % – hier zurück auf die Farben der Vorlage
for(const k in o.palette){const v=o.palette[k];if(!v||k==='K')continue;const c=[1,3,5].map(i=>parseInt(v.slice(i,i+2),16)),L=.299*c[0]+.587*c[1]+.114*c[2];o.palette[k]='#'+c.map(x=>Math.max(0,Math.min(255,Math.round(L+(x-L)/.85))).toString(16).padStart(2,'0')).join('')}
const W=o.width,H=o.height,G=o.rows.map(dec),set=(x,y,c)=>{G[y][x]=c};
// nur die größte zusammenhängende Fläche behalten (8er-Nachbarschaft)
{const lab=new Int32Array(W*H).fill(-1),groesse=[];for(let s=0;s<W*H;s++){const sx=s%W,sy=(s-sx)/W;if(lab[s]>=0||G[sy][sx]==='.')continue;const n=groesse.length;let c=0;const st=[s];lab[s]=n;
  while(st.length){const k=st.pop(),x=k%W,y=(k-x)/W;c++;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const X=x+dx,Y=y+dy;if(X<0||Y<0||X>=W||Y>=H)continue;const j=Y*W+X;if(lab[j]<0&&G[Y][X]!=='.'){lab[j]=n;st.push(j)}}}groesse.push(c)}
  const gross=groesse.indexOf(Math.max(...groesse));let weg=0;for(let k=0;k<W*H;k++)if(lab[k]>=0&&lab[k]!==gross){G[(k-k%W)/W][k%W]='.';weg++}console.log('Reste entfernt:',weg)}
// einzelne Tuschepunkte mitten in Flächen weg
for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++){if(G[y][x]!=='K')continue;const n=[G[y-1][x],G[y+1][x],G[y][x-1],G[y][x+1]];if(n.some(c=>c==='K'||c==='.'))continue;const h={};n.forEach(c=>h[c]=(h[c]||0)+1);G[y][x]=Object.keys(h).sort((a,b)=>h[b]-h[a])[0]}
const vip={...o,rows:G.map(enc)};
// Augen zu: offenes Auge (x 63–79, y 61–72) mit Haut füllen, Lidbogen nach unten, Lidstrich außen, Wimpern
for(let y=61;y<=72;y++)for(let x=63;x<=79;x++)set(x,y,x>=78?'R':'S');
[[65,68],[66,68],[67,69],[68,69],[77,69],[78,69],[79,68]].forEach(([x,y])=>set(x,y,'A'));for(let x=69;x<=76;x++)set(x,70,'A');
for(let x=67;x<=77;x++)set(x,69,G[69][x]==='A'?'A':'R');[[64,67],[63,66]].forEach(([x,y])=>set(x,y,'A'));[[69,71],[72,71],[75,71]].forEach(([x,y])=>set(x,y,'D'));
const zu={...o,name:'nastja_vip_zu',rows:G.map(enc)};
fs.writeFileSync(path.join(root,'pixel/nastja_vip_zu.json'),JSON.stringify(zu));
const arr=q=>({w:q.width,h:q.height,palette:q.palette,rows:q.rows}),s=266/500,CX=W/2;
fs.writeFileSync(path.join(root,'js/40-nastja-vip-pixel.js'),`// ================= Nastja im VIP-Outfit (Pixel-Arrays) =================
// AUTOMATISCH erzeugt aus pixel/nastja_vip.json mit: node tools/nastja-vip.js  – nicht von Hand ändern.
// [0] zwinkert (Enthüllung) · [1] beide Augen zu (beim Umziehen)
const NASTJA_VIP_URL=${JSON.stringify([vip,zu].map(arr))}.map(nastjaURL);
const NASTJA_VIP_IMG=NASTJA_VIP_URL.map(u=>{const im=new Image();im.src=u;return im});
const NASTJA_VIP_G=${JSON.stringify([+(-CX*s).toFixed(2),-264,+(W*s).toFixed(2),266])};
`);
console.log('ok',W,H);
