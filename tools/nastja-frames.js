// Rendert Nastjas Animations-Frames (js/34-nastja-anim.js) und übernimmt das Gesicht pixelgenau aus pixel/nastja.json.
//   node tools/nastja-frames.js stange1 stange2 stange3
// Ergebnis: pixel/nastja_<frame>.json + .png – ungekürzt (alle Frames gleich breit, Stange bei Spalte 135), damit sie im Spiel deckungsgleich liegen.
const fs=require('fs'),path=require('path'),os=require('os'),zlib=require('zlib'),{execFileSync}=require('child_process');
const root=path.join(__dirname,'..'),names=process.argv.slice(2);
const PX=500/274,BXPX=37,MAIN_X0=4;   // Pixel pro Einheit, Körperversatz in px, abgeschnittene Spalten des Hauptsprites
// ---- PNG lesen/schreiben (RGBA 8 bit) ----
function readPNG(b){let p=8,W,H;const id=[];while(p<b.length){const l=b.readUInt32BE(p),t=b.toString('ascii',p+4,p+8),d=b.slice(p+8,p+8+l);if(t==='IHDR'){W=d.readUInt32BE(0);H=d.readUInt32BE(4)}if(t==='IDAT')id.push(d);p+=12+l}
  const r=zlib.inflateSync(Buffer.concat(id)),st=W*4,o=Buffer.alloc(st*H);
  for(let y=0;y<H;y++){const f=r[y*(st+1)];for(let x=0;x<st;x++){const raw=r[y*(st+1)+1+x],a=x>=4?o[y*st+x-4]:0,u=y?o[(y-1)*st+x]:0,c=x>=4&&y?o[(y-1)*st+x-4]:0;let v;
    if(f===0)v=raw;else if(f===1)v=raw+a;else if(f===2)v=raw+u;else if(f===3)v=raw+((a+u)>>1);else{const q=a+u-c,pa=Math.abs(q-a),pb=Math.abs(q-u),pc=Math.abs(q-c);v=raw+(pa<=pb&&pa<=pc?a:pb<=pc?u:c)}o[y*st+x]=v&255}}
  return{W,H,d:o}}
const crcT=[];for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;crcT[n]=c>>>0}
const crc=b=>{let c=0xffffffff;for(const v of b)c=crcT[(c^v)&255]^(c>>>8);return(c^0xffffffff)>>>0};
const chunk=(t,d)=>{const l=Buffer.alloc(4);l.writeUInt32BE(d.length);const td=Buffer.concat([Buffer.from(t),d]),c=Buffer.alloc(4);c.writeUInt32BE(crc(td));return Buffer.concat([l,td,c])};
function writePNG(W,H,d){const raw=Buffer.alloc((W*4+1)*H);for(let y=0;y<H;y++)d.copy(raw,y*(W*4+1)+1,y*W*4,(y+1)*W*4);const ih=Buffer.alloc(13);ih.writeUInt32BE(W,0);ih.writeUInt32BE(H,4);ih[8]=8;ih[9]=6;
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',ih),chunk('IDAT',zlib.deflateSync(raw)),chunk('IEND',Buffer.alloc(0))])}
// ---- Hauptsprite (Gesicht) ----
const M=JSON.parse(fs.readFileSync(path.join(root,'pixel/nastja.json'),'utf8')),MR=M.rows.map(r=>{const a=[];for(const m of r.matchAll(/([^0-9])([0-9]*)/g))for(let i=0;i<(+m[2]||1);i++)a.push(M.palette[m[1]]);return a});
// Gesichtsbereich in Einheiten (x -15..15, y -258..-219.5 = oberhalb der Nase) -> Pixel des ungekürzten Hauptsprites
const C0=Math.floor((-15+74)*PX),C1=Math.ceil((15+74)*PX),R0=20,R1=91;
// ---- Frames im Spiel rendern (Edge headless), ungekürzt ----
let h=fs.readFileSync(path.join(root,'index.html'),'utf8');
h=h.replace('</body>',`<pre id="xout"></pre><script>setTimeout(async()=>{const o={};for(const n of ${JSON.stringify(names)})o[n]={u:await nastjaFrame(n),by:NASTJA_POSEN[n].by||0};document.getElementById('xout').textContent=JSON.stringify(o)},500)</script></body>`);
const tmp=path.join(root,'_frames_'+Date.now()+'.html');fs.writeFileSync(tmp,h);const prof=fs.mkdtempSync(path.join(os.tmpdir(),'nfr-'));let out;
try{out=execFileSync('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',['--headless=new','--dump-dom','--virtual-time-budget=60000','--user-data-dir='+prof,'file:///'+tmp.split(path.sep).join('/')],{maxBuffer:256<<20,timeout:300000,stdio:['ignore','pipe','ignore']}).toString('utf8')}finally{fs.unlinkSync(tmp)}
const mm=out.match(/<pre id="xout">([\s\S]*?)<\/pre>/);if(!mm||!mm[1])throw new Error('kein Ergebnis');
const res=JSON.parse(mm[1].replace(/&quot;/g,'"').replace(/&amp;/g,'&'));
for(const n of names){const img=readPNG(Buffer.from(res[n].u.split(',')[1],'base64')),{W,H,d}=img,DY=Math.round(res[n].by*PX);let pasted=0;
  // Gesicht pixelgenau einsetzen (nur deckende Pixel des Hauptsprites)
  for(let y=R0;y<=R1;y++)for(let x=C0;x<=C1;x++){const c=MR[y][x-MAIN_X0];if(!c)continue;const X=x+BXPX,Y=y+DY;if(X<0||Y<0||X>=W||Y>=H)continue;const q=(Y*W+X)*4;
    d[q]=parseInt(c.slice(1,3),16);d[q+1]=parseInt(c.slice(3,5),16);d[q+2]=parseInt(c.slice(5,7),16);d[q+3]=255;pasted++}
  // Array (rle, ungekürzt) + PNG
  const pal={'.':null},sym={},CH='ABCDEFGHIJLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';let ci=0;const hex=q=>'#'+[d[q],d[q+1],d[q+2]].map(v=>v.toString(16).padStart(2,'0')).join('');
  const sy=q=>{if(!d[q+3])return'.';const k=hex(q);if(!(k in sym)){sym[k]=k==='#2e1c10'?'K':CH[ci++];pal[sym[k]]=k}return sym[k]};
  const rows=[];for(let y=0;y<H;y++){let last=-1;for(let x=0;x<W;x++)if(d[(y*W+x)*4+3])last=x;let s='',x=0;while(x<=last){const ch=sy((y*W+x)*4);let k=1;while(x+k<=last&&sy((y*W+x+k)*4)===ch)k++;s+=ch+(k>1?k:'');x+=k}rows.push(s)}
  const P={'.':null};if(pal.K)P.K=pal.K;Object.keys(pal).filter(k=>k!=='.'&&k!=='K').sort().forEach(k=>P[k]=pal[k]);
  const json=`{"name":"nastja_${n}",\n"width":${W},"height":${H},"format":"rle","pole_x":135,\n"info":"Pro Zeile: Zeichen + Anzahl (ohne Zahl = 1). \\".\\" = transparent, fehlendes Zeilenende = transparent. Ungekürzt: Stange bei Spalte pole_x.",\n"palette":{${Object.entries(P).map(([k,v])=>JSON.stringify(k)+':'+JSON.stringify(v)).join(',\n')}},"rows":[\n${rows.map(r=>JSON.stringify(r)).join(',\n')}]}`;
  fs.writeFileSync(path.join(root,`pixel/nastja_${n}.json`),json);fs.writeFileSync(path.join(root,`pixel/nastja_${n}.png`),writePNG(W,H,d));
  console.log(`nastja_${n}: ${W}x${H}, ${Object.keys(P).length-1} Farben, Gesicht ${pasted} px übernommen (um ${DY} px abgesenkt)`)}
