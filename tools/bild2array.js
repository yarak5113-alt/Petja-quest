// node bild2array.js <bild.png> <name> <aus.json> <vorschau.png> [farben=20] [hoehe=500]
// Freistellen (Flutfüllung vom Rand, Kontur hält sie auf), auf Höhe skalieren, harte Pixel, max. N Farben,
// Kontur #2e1c10: 2 px rundum + 2 px extra rechts/unten, Füße auf der untersten Zeile. Läuft in Edge headless (Canvas).
const fs=require('fs'),path=require('path'),os=require('os'),{execFileSync}=require('child_process');
const [IN,NAME,OUT,PREV,NC='20',HH='500']=process.argv.slice(2);
const data='data:image/png;base64,'+fs.readFileSync(IN).toString('base64');
const page=`<!doctype html><meta charset="utf-8"><body><pre id="json"></pre><pre id="png"></pre><script>
const N=${+NC},HOUT=${+HH},INK=[46,28,16],OUTR=2,SHAD=2;
const im=new Image();im.onload=()=>{const W0=im.width,H0=im.height,c=document.createElement('canvas');c.width=W0;c.height=H0;const g=c.getContext('2d');g.drawImage(im,0,0);
  const d=g.getImageData(0,0,W0,H0).data,bg=new Uint8Array(W0*H0),st=[];
  // Hintergrund: vom Rand fluten, solange der Nachbar ähnlich ist und nicht dunkel (Konturlinien halten auf)
  const lum=q=>.299*d[q]+.587*d[q+1]+.114*d[q+2];
  for(let x=0;x<W0;x++){st.push(x,(H0-1)*W0+x)}for(let y=0;y<H0;y++){st.push(y*W0,y*W0+W0-1)}st.forEach(k=>bg[k]=1);
  while(st.length){const k=st.pop(),x=k%W0,y=(k-x)/W0,q=k*4;for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const X=x+dx,Y=y+dy;if(X<0||Y<0||X>=W0||Y>=H0)continue;const j=Y*W0+X;if(bg[j])continue;const p=j*4;
    if(Math.abs(d[p]-d[q])+Math.abs(d[p+1]-d[q+1])+Math.abs(d[p+2]-d[q+2])>22||lum(p)<70)continue;bg[j]=1;st.push(j)}}
  // Figur-Kiste
  let x0=W0,x1=0,y0=H0,y1=0;for(let k=0;k<W0*H0;k++)if(!bg[k]){const x=k%W0,y=(k-x)/W0;x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y)}
  for(let k=0;k<W0*H0;k++)d[k*4+3]=bg[k]?0:255;
  const src=document.createElement('canvas');src.width=W0;src.height=H0;const sg=src.getContext('2d'),sid=sg.createImageData(W0,H0);sid.data.set(d);sg.putImageData(sid,0,0);
  // Flächenmittel beim Verkleinern (nur deckende Pixel), dann harte Kante
  const FH=HOUT-OUTR-OUTR-SHAD,sc=FH/(y1-y0+1),FW=Math.round((x1-x0+1)*sc),W=FW+OUTR*2+SHAD,H=HOUT;
  const acc=new Float64Array(FW*FH*4);for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const k=y*W0+x;if(bg[k])continue;const X=Math.min(FW-1,Math.floor((x-x0)*sc)),Y=Math.min(FH-1,Math.floor((y-y0)*sc)),a=(Y*FW+X)*4,q=k*4;acc[a]+=d[q];acc[a+1]+=d[q+1];acc[a+2]+=d[q+2];acc[a+3]++}
  const cell=1/(sc*sc),px=new Array(W*H).fill(null);
  for(let Y=0;Y<FH;Y++)for(let X=0;X<FW;X++){const a=(Y*FW+X)*4,n=acc[a+3];if(n<cell*.5)continue;let r=acc[a]/n,gg=acc[a+1]/n,b=acc[a+2]/n;
    const L=.299*r+.587*gg+.114*b,S=.85;r=L+(r-L)*S;gg=L+(gg-L)*S;b=L+(b-L)*S;   // leicht entsättigt
    px[(Y+OUTR)*W+X+OUTR]=L<38?'K':[r,gg,b]}
  // Farben reduzieren: Median-Cut (Wurzel-Gewicht, damit kleine Flächen wie Lippen bleiben) + k-Means, Tusche fest
  const cols=[];px.forEach(p=>{if(p&&p!=='K')cols.push(p)});
  const key=p=>(p[0]>>2)<<12|(p[1]>>2)<<6|(p[2]>>2),m=new Map();cols.forEach(p=>{const k=key(p);const e=m.get(k);if(e){e[0]+=p[0];e[1]+=p[1];e[2]+=p[2];e[3]++}else m.set(k,[p[0],p[1],p[2],1])});
  const U=[...m.values()].map(e=>[e[0]/e[3],e[1]/e[3],e[2]/e[3],e[3]]);
  const stat=b=>{let lo=[255,255,255],hi=[0,0,0],w=0;for(const c of b){for(let j=0;j<3;j++){lo[j]=Math.min(lo[j],c[j]);hi[j]=Math.max(hi[j],c[j])}w+=Math.sqrt(c[3])}const r=hi.map((h,j)=>h-lo[j]),ch=r.indexOf(Math.max(...r));return{b,ch,score:r[ch]*w,w}};
  let boxes=[stat(U)];while(boxes.length<N-1){let bi=-1,bs=0;boxes.forEach((x,i)=>{if(x.b.length>1&&x.score>bs){bs=x.score;bi=i}});if(bi<0)break;const{b,ch,w}=boxes[bi];b.sort((p,q)=>p[ch]-q[ch]);let s=0,i=0;while(i<b.length-1&&s+Math.sqrt(b[i][3])<=w/2)s+=Math.sqrt(b[i++][3]);if(!i)i=1;boxes.splice(bi,1,stat(b.slice(0,i)),stat(b.slice(i)))}
  let P=boxes.map(({b})=>{let r=0,gg=0,bl=0,n=0;for(const c of b){const w=Math.sqrt(c[3]);r+=c[0]*w;gg+=c[1]*w;bl+=c[2]*w;n+=w}return[r/n,gg/n,bl/n]});
  const near=c=>{let bd=1e9,bi=0;P.forEach((p,i)=>{const e=(p[0]-c[0])**2+(p[1]-c[1])**2+(p[2]-c[2])**2;if(e<bd){bd=e;bi=i}});return bi};
  for(let it=0;it<6;it++){const S=P.map(()=>[0,0,0,0]);U.forEach(c=>{const j=near(c),w=Math.sqrt(c[3]);S[j][0]+=c[0]*w;S[j][1]+=c[1]*w;S[j][2]+=c[2]*w;S[j][3]+=w});P=P.map((p,j)=>S[j][3]?[S[j][0]/S[j][3],S[j][1]/S[j][3],S[j][2]/S[j][3]]:p)}
  P=P.map(p=>p.map(v=>Math.max(0,Math.min(255,Math.round(v)))));
  // fast gleiche Paletteneinträge zusammenlegen, Tusche-nahe Einträge in die Tusche
  const idx=px.map(p=>p===null?-1:p==='K'?0:near(p)+1);
  const PAL=[INK,...P];
  // Kontur: 2 Ringe rundum, 2 weitere nur rechts/unten
  const on=(X,Y)=>X>=0&&Y>=0&&X<W&&Y<H&&idx[Y*W+X]>=0,grow=dirs=>{const add=[];for(let Y=0;Y<H;Y++)for(let X=0;X<W;X++){const k=Y*W+X;if(idx[k]<0&&dirs.some(([dx,dy])=>on(X+dx,Y+dy)))add.push(k)}add.forEach(k=>idx[k]=0)};
  for(let r=0;r<OUTR;r++)grow([[-1,0],[1,0],[0,-1],[0,1]]);for(let r=0;r<SHAD;r++)grow([[-1,0],[0,-1]]);
  // Füße auf die unterste Zeile, leere Spalten weg
  let maxY=-1,minX=W,maxX=-1;for(let k=0;k<W*H;k++)if(idx[k]>=0){const x=k%W,y=(k-x)/W;maxY=Math.max(maxY,y);minX=Math.min(minX,x);maxX=Math.max(maxX,x)}
  const sh=H-1-maxY,W2=maxX-minX+1,fin=new Int16Array(W2*H).fill(-1);for(let y=0;y<H;y++)for(let x=0;x<W2;x++){const sy=y-sh;if(sy>=0)fin[y*W2+x]=idx[sy*W+x+minX]}
  // nur benutzte Farben, Zeichen vergeben (K = Tusche)
  const used=[...new Set(fin)].filter(v=>v>=0).sort((a,b)=>a-b),CH='ABCDEFGHIJLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),sym={};let ci=0;used.forEach(v=>sym[v]=v===0?'K':CH[ci++]);
  const hex=c=>'#'+c.map(v=>v.toString(16).padStart(2,'0')).join('');
  const pal={'.':null};used.forEach(v=>pal[sym[v]]=hex(PAL[v]));
  const rows=[];for(let y=0;y<H;y++){let s='',last=-1;for(let x=0;x<W2;x++)if(fin[y*W2+x]>=0)last=x;let x=0;while(x<=last){const v=fin[y*W2+x],ch=v<0?'.':sym[v];let n=1;while(x+n<=last&&fin[y*W2+x+n]===v)n++;s+=ch+(n>1?n:'');x+=n}rows.push(s)}
  const json='{"name":"${NAME}",\\n"width":'+W2+',"height":'+H+',"format":"rle",\\n"info":"Pro Zeile: Zeichen + Anzahl (ohne Zahl = 1). \\\\".\\\\" = transparent, fehlendes Zeilenende = transparent.",\\n"palette":{'+Object.entries(pal).map(([k,v])=>JSON.stringify(k)+':'+JSON.stringify(v)).join(',\\n')+'},"rows":[\\n'+rows.map(r=>JSON.stringify(r)).join(',\\n')+']}';
  document.getElementById('json').textContent=json;
  const o=document.createElement('canvas');o.width=W2;o.height=H;const og=o.getContext('2d'),oi=og.createImageData(W2,H);fin.forEach((v,k)=>{if(v<0)return;const c=PAL[v];oi.data.set([c[0],c[1],c[2],255],k*4)});og.putImageData(oi,0,0);
  document.getElementById('png').textContent=o.toDataURL()};
im.src=${JSON.stringify(data)};
</script>`;
const tmp=path.join(os.tmpdir(),'b2a-'+Date.now()+'.html');fs.writeFileSync(tmp,page);
const prof=fs.mkdtempSync(path.join(os.tmpdir(),'b2a-prof-'));
const out=execFileSync('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',['--headless=new','--dump-dom','--virtual-time-budget=60000','--user-data-dir='+prof,'file:///'+tmp.replace(/\\/g,'/')],{maxBuffer:64<<20,timeout:180000}).toString('utf8');
fs.unlinkSync(tmp);
const dec=s=>s.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,'&');
const j=out.match(/<pre id="json">([\s\S]*?)<\/pre>/),p=out.match(/<pre id="png">([\s\S]*?)<\/pre>/);
if(!j||!j[1])throw new Error('kein Ergebnis');
const json=dec(j[1]);const o=JSON.parse(json);fs.writeFileSync(OUT,json);
fs.writeFileSync(PREV,Buffer.from(dec(p[1]).split(',')[1],'base64'));
console.log(`${o.width}x${o.height}, ${Object.keys(o.palette).length-1} Farben, ${o.rows.length} Zeilen`);
