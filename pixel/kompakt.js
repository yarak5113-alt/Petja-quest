// Wandelt ein Figuren-Array (pixel/*.json) ins kompakte Format um: wenige Farben + Lauflängen pro Zeile.
//   node pixel/kompakt.js <ein.json> <aus.json> [farben|auto] [vergleich.png]
//   farben: feste Anzahl (inkl. Tusche); "auto" (Standard) = kleinste Zahl von 15–40, die noch sauber aussieht.
//   vergleich.png: links vorher, rechts nachher (3x).
// Liest altes Format (grid + code_len) und kompaktes Format (rows).
const fs=require('fs'),zlib=require('zlib');
const [,,IN,OUT,NC='auto',PNG]=process.argv;
const MIN=15,MAX=40,GUT=3.0,SPITZE=36;   // auto: mittlere + größte Abweichung pro Kanal (von 255), ab der es "gleich" aussieht
const d=JSON.parse(fs.readFileSync(IN,'utf8')),H=d.height;let W=d.width;
const hex=h=>h?[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)):null;
const toHex=c=>'#'+c.map(v=>v.toString(16).padStart(2,'0')).join('');
// Pixel lesen
let px=[];
if(d.rows)for(const r of d.rows){const line=[];for(const m of r.matchAll(/(\D)(\d*)/g))for(let i=0;i<(+m[2]||1);i++)line.push(hex(d.palette[m[1]]));while(line.length<W)line.push(null);px.push(...line)}
else{const cl=d.code_len||1;for(const r of d.grid)for(let i=0;i<r.length;i+=cl)px.push(hex(d.palette[r.substr(i,cl)]))}
// leere Spalten links/rechts abschneiden
let x0=W,x1=0;px.forEach((p,i)=>{if(p){x0=Math.min(x0,i%W);x1=Math.max(x1,i%W)}});
if(x0>0||x1<W-1){const np=[];for(let y=0;y<H;y++)for(let x=x0;x<=x1;x++)np.push(px[y*W+x]);px=np;W=x1-x0+1}
// Tusche = "K"/"KK" in vorhandenen Dateien, sonst die häufigste Farbe (die Umrisslinie); bleibt exakt erhalten
const same=(a,b)=>a&&b&&a[0]==b[0]&&a[1]==b[1]&&a[2]==b[2];
const INK=d.palette.KK?hex(d.palette.KK):d.palette.K?hex(d.palette.K):(()=>{const n={};for(const p of px)if(p){const k=p.join();n[k]=(n[k]||0)+1}return Object.entries(n).sort((a,b)=>b[1]-a[1])[0][0].split(',').map(Number)})();
const cols=px.filter(p=>p&&!same(p,INK)),ucols=[...new Map(cols.map(p=>[p.join(),p])).values()];
const dist=(a,b)=>{const r=(a[0]+b[0])/2,dr=a[0]-b[0],dg=a[1]-b[1],db=a[2]-b[2];return (2+r/256)*dr*dr+4*dg*dg+(2+(255-r)/256)*db*db};

// Palette mit n Farben (ohne Tusche): Median-Cut, k-means, freie Plätze an die schlechtest getroffenen Farben
function quant(n){
  let boxes=[cols];while(boxes.length<Math.ceil(n*.75)){boxes.sort((a,b)=>b.length-a.length);const b=boxes.shift();if(b.length<2){boxes.push(b);break}
    let ch=0,rg=-1;for(let c=0;c<3;c++){let lo=255,hi=0;for(const p of b){lo=Math.min(lo,p[c]);hi=Math.max(hi,p[c])}if(hi-lo>rg){rg=hi-lo;ch=c}}
    b.sort((x,y)=>x[ch]-y[ch]);const m=b.length>>1;boxes.push(b.slice(0,m),b.slice(m))}
  let pal=boxes.map(b=>[0,1,2].map(c=>Math.round(b.reduce((s,p)=>s+p[c],0)/b.length)));
  const memo=new Map(),near=p=>{const k=p.join();if(memo.has(k))return memo.get(k);let bi=0,bd=1e9;for(let i=0;i<pal.length;i++){const e=dist(p,pal[i]);if(e<bd){bd=e;bi=i}}memo.set(k,bi);return bi};
  const uniq=()=>{const s=new Set();pal=pal.filter(c=>{const k=c.join();if(s.has(k))return false;s.add(k);return true})};
  const kmeans=()=>{memo.clear();const acc=pal.map(()=>[0,0,0,0]);for(const p of cols){const a=acc[near(p)];a[0]+=p[0];a[1]+=p[1];a[2]+=p[2];a[3]++}
    pal=pal.map((c,i)=>acc[i][3]?[0,1,2].map(k=>Math.round(acc[i][k]/acc[i][3])):null).filter(Boolean);uniq();memo.clear()};
  for(let i=0;i<3;i++)kmeans();
  for(let round=0;round<4;round++){
    while(pal.length<n){let w=null,wd=-1;for(const p of ucols){const e=Math.max(...[0,1,2].map(k=>Math.abs(p[k]-pal[near(p)][k])));if(e>wd){wd=e;w=p}}if(wd<6)break;pal.push(w);memo.clear()}
    kmeans()}
  let err=0,mx=0;for(const p of cols){const q=pal[near(p)];for(let k=0;k<3;k++){const e=Math.abs(q[k]-p[k]);err+=e;mx=Math.max(mx,e)}}
  return{pal,near,mean:err/cols.length/3,mx}}

let Q;if(NC==='auto'){for(let n=MIN;n<=MAX;n++){Q=quant(n-1);if(Q.mean<=GUT&&Q.mx<=SPITZE)break}}else Q=quant(+NC-1);
// Zeichen: keine Ziffern (die sind für Längen), '.' = transparent, 'K' = Tusche
const SYM='ABCDEFGHIJLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+,-/:;<=>?@[]^_{|}~'.split('');
const P2={'.':null,K:toHex(INK)};Q.pal.forEach((c,i)=>P2[SYM[i]]=toHex(c));
const sym=p=>!p?'.':same(p,INK)?'K':SYM[Q.near(p)];
// Lauflängen pro Zeile: "K3" = 3x K, einzelne Pixel ohne Zahl; leere Zeilenenden fallen weg
const rows=[],out=[];
for(let y=0;y<H;y++){const line=[];for(let x=0;x<W;x++)line.push(sym(px[y*W+x]));out.push(...line);
  let end=W,s='',x=0;while(end>0&&line[end-1]=='.')end--;
  while(x<end){let n=1;while(x+n<end&&line[x+n]==line[x])n++;s+=line[x]+(n>1?n:'');x+=n}rows.push(s)}
const res={name:d.name,width:W,height:H,format:'rle',info:'Pro Zeile: Zeichen + Anzahl (ohne Zahl = 1). "." = transparent, fehlendes Zeilenende = transparent.',palette:P2,rows};
const txt=JSON.stringify(res).replace('"rows":[','"rows":[\n').replace(/","/g,'",\n"');
fs.writeFileSync(OUT,txt);
console.log(`${OUT}: ${txt.length} Zeichen (vorher ${fs.statSync(IN).size}), ${W}x${H}, Farben ${Object.keys(P2).length-1}, mittl. Abweichung ${Q.mean.toFixed(2)}/255, max ${Q.mx}`);
// Vergleichsbild: links vorher, rechts nachher
if(PNG){const S=3,G=4,w=(W*2+G)*S,h=H*S,raw=Buffer.alloc((w*4+1)*h);
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){const sx=Math.floor(x/S),sy=Math.floor(y/S),o=y*(w*4+1)+1+x*4;
    const p=sx<W?px[sy*W+sx]:sx>=W+G?hex(P2[out[sy*W+sx-W-G]]):null,c=p||[235,230,220];raw[o]=c[0];raw[o+1]=c[1];raw[o+2]=c[2];raw[o+3]=255}
  const T=[];for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;T[n]=c>>>0}
  const crc=b=>{let c=0xffffffff;for(const x of b)c=T[(c^x)&255]^(c>>>8);return(c^0xffffffff)>>>0};
  const chunk=(t,b)=>{const l=Buffer.alloc(4);l.writeUInt32BE(b.length);const tb=Buffer.concat([Buffer.from(t),b]),c=Buffer.alloc(4);c.writeUInt32BE(crc(tb));return Buffer.concat([l,tb,c])};
  const ih=Buffer.alloc(13);ih.writeUInt32BE(w,0);ih.writeUInt32BE(h,4);ih[8]=8;ih[9]=6;
  fs.writeFileSync(PNG,Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',ih),chunk('IDAT',zlib.deflateSync(raw)),chunk('IEND',Buffer.alloc(0))]))}
