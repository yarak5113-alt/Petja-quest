// Wandelt ein Figuren-Array (pixel/*.json) ins kompakte Format um: max. 60 Farben + Lauflängen pro Zeile (~80 % kleiner, Optik gleich).
// node pixel/kompakt.js pixel/opa.json pixel/opa.json 60 [vergleich.png]   (PNG: links alt, rechts neu)
const fs=require('fs'),zlib=require('zlib');
const [,,IN,OUT,NC='60',PNG]=process.argv;
const d=JSON.parse(fs.readFileSync(IN,'utf8')),cl=d.code_len||1,W=d.width,H=d.height;
const hex=h=>h?[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)]:null;
// Pixel lesen
const px=[];for(const r of d.grid)for(let i=0;i<r.length;i+=cl)px.push(hex(d.palette[r.substr(i,cl)]));
const INK=hex(d.palette.KK||'#301c10');
const same=(a,b)=>a&&b&&a[0]==b[0]&&a[1]==b[1]&&a[2]==b[2];
// Farben (ohne Tusche) per Median-Cut auf NC-1 Farben reduzieren, Tusche bleibt exakt
const cols=px.filter(p=>p&&!same(p,INK));
function mcut(box,n){let boxes=[box];while(boxes.length<n){boxes.sort((a,b)=>b.length-a.length);const b=boxes.shift();if(b.length<2){boxes.push(b);break}
  let ch=0,rg=-1;for(let c=0;c<3;c++){let lo=255,hi=0;for(const p of b){lo=Math.min(lo,p[c]);hi=Math.max(hi,p[c])}if(hi-lo>rg){rg=hi-lo;ch=c}}
  b.sort((x,y)=>x[ch]-y[ch]);const m=b.length>>1;boxes.push(b.slice(0,m),b.slice(m))}
  return boxes.map(b=>[0,1,2].map(c=>Math.round(b.reduce((s,p)=>s+p[c],0)/b.length)))}
let pal=mcut(cols,+NC-1);
// 3 Runden k-means zum Nachschärfen
const dist=(a,b)=>{const r=(a[0]+b[0])/2,dr=a[0]-b[0],dg=a[1]-b[1],db=a[2]-b[2];return (2+r/256)*dr*dr+4*dg*dg+(2+(255-r)/256)*db*db};
const near=p=>{let bi=0,bd=1e9;for(let i=0;i<pal.length;i++){const e=dist(p,pal[i]);if(e<bd){bd=e;bi=i}}return bi};
for(let it=0;it<3;it++){const acc=pal.map(()=>[0,0,0,0]);for(const p of cols){const a=acc[near(p)];a[0]+=p[0];a[1]+=p[1];a[2]+=p[2];a[3]++}
  pal=pal.map((c,i)=>acc[i][3]?[0,1,2].map(k=>Math.round(acc[i][k]/acc[i][3])):c)}
// Duplikate entfernen, freie Plätze an die am schlechtesten getroffenen Farben (Lichter, Augen …), dann nachschärfen
const uniq=()=>{const s=new Set();pal=pal.filter(c=>{const k=c.join();if(s.has(k))return false;s.add(k);return true})};
const ucols=[...new Map(cols.map(p=>[p.join(),p])).values()];
for(let round=0;round<4;round++){uniq();
  while(pal.length<+NC-1){let w=null,wd=-1;for(const p of ucols){const e=Math.max(...[0,1,2].map(k=>Math.abs(p[k]-pal[near(p)][k])));if(e>wd){wd=e;w=p}}if(wd<6)break;pal.push(w)}
  const acc=pal.map(()=>[0,0,0,0]);for(const p of cols){const a=acc[near(p)];a[0]+=p[0];a[1]+=p[1];a[2]+=p[2];a[3]++}
  pal=pal.map((c,i)=>acc[i][3]?[0,1,2].map(k=>Math.round(acc[i][k]/acc[i][3])):c).filter((c,i)=>acc[i][3])}
uniq();
// Zeichen: keine Ziffern (die sind für Längen), '.' = transparent, 'K' = Tusche
const SYM='ABCDEFGHIJLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+,-/:;<=>?@[]^_{|}~'.split('');
const P2={'.':null,K:'#'+INK.map(v=>v.toString(16).padStart(2,'0')).join('')};
const code=pal.map((c,i)=>{const s=SYM[i];P2[s]='#'+c.map(v=>v.toString(16).padStart(2,'0')).join('');return s});
const sym=p=>!p?'.':same(p,INK)?'K':code[near(p)];
// Lauflängen pro Zeile: "K3" = 3x K, einzelne Pixel ohne Zahl; leere Zeilenenden werden weggelassen
const rows=[];const out=[];
for(let y=0;y<H;y++){let s='',x=0;const line=[];for(let i=0;i<W;i++)line.push(sym(px[y*W+i]));out.push(...line);
  let end=W;while(end>0&&line[end-1]=='.')end--;
  while(x<end){let n=1;while(x+n<end&&line[x+n]==line[x])n++;s+=line[x]+(n>1?n:'');x+=n}rows.push(s)}
const res={name:d.name,width:W,height:H,format:'rle',info:'Pro Zeile: Zeichen + Anzahl (ohne Zahl = 1). "." = transparent, fehlendes Zeilenende = transparent.',palette:P2,rows};
const txt=JSON.stringify(res).replace('"rows":[','"rows":[\n').replace(/","/g,'",\n"');
fs.writeFileSync(OUT,txt);
// Abweichung messen
let err=0,n=0,mx=0;for(let i=0;i<px.length;i++)if(px[i]){const q=hex(P2[out[i]]);err+=Math.abs(q[0]-px[i][0])+Math.abs(q[1]-px[i][1])+Math.abs(q[2]-px[i][2]);n++;mx=Math.max(mx,...[0,1,2].map(k=>Math.abs(q[k]-px[i][k])))}
console.log(`${OUT}: ${txt.length} Zeichen (vorher ${fs.statSync(IN).size}), Farben ${Object.keys(P2).length}, mittl. Abweichung ${(err/n/3).toFixed(2)}/255, max ${mx}`);
// PNG zum Vergleich (links Original, rechts neu, 3x)
if(PNG){const S=3,w=W*2*S+S*4,h=H*S,raw=Buffer.alloc((w*4+1)*h);
  for(let y=0;y<h;y++){raw[y*(w*4+1)]=0;for(let x=0;x<w;x++){const o=y*(w*4+1)+1+x*4;let p=null;const sx=Math.floor(x/S),sy=Math.floor(y/S);
    if(sx<W)p=px[sy*W+sx];else if(sx>=W+4/1&&sx-W-4<W){}
    const rx=Math.floor((x-W*S-S*4)/S);if(x>=W*S+S*4)p=hex(P2[out[sy*W+rx]]);
    const c=p||[235,230,220];raw[o]=c[0];raw[o+1]=c[1];raw[o+2]=c[2];raw[o+3]=255}}
  const crc=b=>{let c,t=[];for(let n=0;n<256;n++){c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;t[n]=c>>>0}c=0xffffffff;for(const x of b)c=t[(c^x)&255]^(c>>>8);return (c^0xffffffff)>>>0};
  const chunk=(ty,data)=>{const l=Buffer.alloc(4);l.writeUInt32BE(data.length);const td=Buffer.concat([Buffer.from(ty),data]);const c=Buffer.alloc(4);c.writeUInt32BE(crc(td));return Buffer.concat([l,td,c])};
  const ih=Buffer.alloc(13);ih.writeUInt32BE(w,0);ih.writeUInt32BE(h,4);ih[8]=8;ih[9]=6;
  fs.writeFileSync(PNG,Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',ih),chunk('IDAT',zlib.deflateSync(raw)),chunk('IEND',Buffer.alloc(0))]))}
