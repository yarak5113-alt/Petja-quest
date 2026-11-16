// Baut js/40-nastja-vip-pixel.js aus pixel/nastja_vip.json (VIP-Outfit, zwinkert, Braue hoch):
// erzeugt dazu pixel/nastja_vip_zu.json (beide Augen genießerisch zu: offenes Auge übermalt, Lidbogen + Wimpern).
//   node tools/nastja-vip.js
const fs=require('fs'),path=require('path'),root=path.join(__dirname,'..');
const o=JSON.parse(fs.readFileSync(path.join(root,'pixel/nastja_vip.json'),'utf8'));
const dec=r=>{const a=[];for(const m of r.matchAll(/([^0-9])([0-9]*)/g))for(let i=0;i<(+m[2]||1);i++)a.push(m[1]);while(a.length<o.width)a.push('.');return a};
const enc=a=>{let s='',x=0,last=a.length-1;while(last>=0&&a[last]==='.')last--;while(x<=last){let n=1;while(x+n<=last&&a[x+n]===a[x])n++;s+=a[x]+(n>1?n:'');x+=n}return s};
// Farben an Nastjas übrige Bilder angleichen (das Vorlagenbild ist grauer): Korsett-Rot, Strumpf-Grau und Weiß auf ihre Palette
// (nach Helligkeit), Haare und Haut kräftiger (Sättigung hoch, minimal wärmer). Die Augen-Zeichen merken wir uns vorher (nach Originalfarbe).
const hex=c=>'#'+c.map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join(''),rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)),lum=c=>.299*c[0]+.587*c[1]+.114*c[2];
const naechst=h=>{const t=rgb(h);let bk='K',bd=1e9;for(const k in o.palette){const v=o.palette[k];if(!v||k==='K')continue;const c=rgb(v),d=(c[0]-t[0])**2+(c[1]-t[1])**2+(c[2]-t[2])**2;if(d<bd){bd=d;bk=k}}return bk};
const HAUT=naechst('#f3e3c3'),SCHATTEN=naechst('#dcccb9'),WIMPER=naechst('#3e3834');
const ROT=['#41171f','#521e27','#64242f','#712834'],GRAU=['#27262a','#373535','#53514f'];
const nachL=(c,L)=>{const l=lum(c);return L.reduce((b,h)=>Math.abs(lum(rgb(h))-l*1.15)<Math.abs(lum(rgb(b))-l*1.15)?h:b)};
for(const k in o.palette){const v=o.palette[k];if(!v||k==='K')continue;const c=rgb(v),L=lum(c),sat=Math.max(...c)-Math.min(...c);
  if(c[0]-c[1]>28&&c[0]>c[1]*1.5)o.palette[k]=nachL(c,ROT);
  else if(L<90&&sat<40)o.palette[k]=nachL(c,GRAU);
  else if(L>232&&sat<40)o.palette[k]='#f0eeea';
  else o.palette[k]=hex(c.map((x,i)=>L+(x-L)*1.4+[5,3,-3][i]))}
const G=o.rows.map(dec),set=(x,y,c)=>{G[y][x]=c};
// einzelne Tusche-Sprenkel (Reste vom Schachbrett-Hintergrund) mitten in Flächen weg
let weg=0;for(let y=1;y<o.height-1;y++)for(let x=1;x<o.width-1;x++){if(G[y][x]!=='K')continue;const n=[G[y-1][x],G[y+1][x],G[y][x-1],G[y][x+1]];if(n.some(c=>c==='K'||c==='.'))continue;const h={};n.forEach(c=>h[c]=(h[c]||0)+1);G[y][x]=Object.keys(h).sort((a,b)=>h[b]-h[a])[0];weg++}
// Flächen beruhigen (die Vorlage rauscht): Mehrheitsfilter 3×3 über Farbflächen, Tusche-Linien und Rand bleiben
let ruhig=0;for(let it=0;it<3;it++){const N=G.map(r=>r.slice());for(let y=1;y<o.height-1;y++)for(let x=1;x<o.width-1;x++){const c=G[y][x];if(c==='K'||c==='.')continue;
  const h={};for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const q=G[y+dy][x+dx];if(q!=='.'&&q!=='K')h[q]=(h[q]||0)+1}
  let best=c,bn=h[c]||0;for(const q in h)if(h[q]>bn){best=q;bn=h[q]}if(best!==c&&bn>=4&&(h[c]||0)<=2){N[y][x]=best;ruhig++}}G.splice(0,G.length,...N)}
o.rows=G.map(enc);console.log('Sprenkel entfernt:',weg,'beruhigt:',ruhig);
// offenes Auge (x 63–83, y 48–60) mit Haut füllen, dann ein geschlossener Lidbogen (nach unten gewölbt), Lidstrich-Schwung außen, Wimpern unten
for(let y=48;y<=60;y++)for(let x=63;x<=83;x++)set(x,y,HAUT);
for(let x=68;x<=80;x++)set(x,55,SCHATTEN);
[[64,54],[65,55],[66,55],[67,56],[68,56],[80,56],[81,56],[82,55]].forEach(([x,y])=>set(x,y,'K'));for(let x=69;x<=79;x++)set(x,57,'K');
[[63,53],[62,52]].forEach(([x,y])=>set(x,y,'K'));[[70,58],[73,58],[76,58],[79,58]].forEach(([x,y])=>set(x,y,WIMPER));
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
