// Baut Nastjas Tanz-Streifen von hinten (Dessous-Outfit) aus pixel/nastja_twerk_{1,2,3}_vorlage.png.
//   node tools/nastja-twerk.js
// 1 = aufrecht, Hände an der Hüfte · 2 = Zwischenstufe · 3 = tiefster Punkt (liegt im Spiel auf dem Schlag).
// Heller Karo-Hintergrund raus (Flutfüllung von den Rändern), nur die größte Fläche bleibt, alle Frames gleich skaliert (MASS)
// und an der Mitte zwischen den Stiefeln ausgerichtet, damit sie beim Abspielen nicht rutscht.
// Ergebnis: pixel/nastja_twerk.png (horizontaler Streifen) und js/56-nastja-twerk-pixel.js.
const fs=require('fs'),path=require('path'),os=require('os'),{execFileSync}=require('child_process');
const root=path.join(__dirname,'..'),MASS=.48;   // Bildpixel → Sprite-Pixel (passt zur Beinlänge des Dessous-Sprites, 500 px hoch)
const urls=[1,2,3].map(n=>'data:image/png;base64,'+fs.readFileSync(path.join(root,`pixel/nastja_twerk_${n}_vorlage.png`)).toString('base64'));
const page=`<!doctype html><meta charset="utf-8"><body><pre id="png"></pre><script>
const URLS=${JSON.stringify(urls)},S=${MASS};
function frei(im){const W=im.width,H=im.height,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');g.drawImage(im,0,0);
  const id=g.getImageData(0,0,W,H),d=id.data,bg=new Uint8Array(W*H),st=[];
  const hell=k=>{const q=k*4,r=d[q],gg=d[q+1],b=d[q+2],mx=Math.max(r,gg,b),mn=Math.min(r,gg,b);return mx-mn<=16&&(r+gg+b)/3>=150};
  const saat=k=>{if(hell(k)&&!bg[k]){bg[k]=1;st.push(k)}};
  for(let x=0;x<W;x++){saat(x);saat((H-1)*W+x)}for(let y=0;y<H;y++){saat(y*W);saat(y*W+W-1)}
  while(st.length){const k=st.pop(),x=k%W,y=(k-x)/W;for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const X=x+dx,Y=y+dy;if(X<0||Y<0||X>=W||Y>=H)continue;const j=Y*W+X;if(!bg[j]&&hell(j)){bg[j]=1;st.push(j)}}}
  // helle Inseln zwischen den Beinen (eingeschlossenes Karo) ebenfalls raus
  {const seen=new Uint8Array(W*H);for(let s0=0;s0<W*H;s0++){if(bg[s0]||seen[s0]||!hell(s0))continue;const comp=[s0],q=[s0];seen[s0]=1;
    while(q.length){const k=q.pop(),x=k%W,y=(k-x)/W;for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const X=x+dx,Y=y+dy;if(X<0||Y<0||X>=W||Y>=H)continue;const j=Y*W+X;if(!seen[j]&&!bg[j]&&hell(j)){seen[j]=1;q.push(j);comp.push(j)}}}
    if(comp.length>150)comp.forEach(k=>bg[k]=1)}}
  {const lab=new Int32Array(W*H).fill(-1),gr=[];for(let s=0;s<W*H;s++){if(bg[s]||lab[s]>=0)continue;const n=gr.length,q=[s];lab[s]=n;let c=0;
    while(q.length){const k=q.pop(),x=k%W,y=(k-x)/W;c++;for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const X=x+dx,Y=y+dy;if(X<0||Y<0||X>=W||Y>=H)continue;const j=Y*W+X;if(!bg[j]&&lab[j]<0){lab[j]=n;q.push(j)}}}gr.push(c)}
    const gross=gr.indexOf(Math.max(...gr));for(let k=0;k<W*H;k++)if(lab[k]!==gross)bg[k]=1}
  let x0=W,y0=H,x1=0,y1=0;for(let k=0;k<W*H;k++){if(bg[k]){d[k*4+3]=0;continue}const x=k%W,y=(k-x)/W;if(x<x0)x0=x;if(y<y0)y0=y;if(x>x1)x1=x;if(y>y1)y1=y}
  // Fußmitte: Mittel der deckenden Pixel in den untersten 60 Zeilen (Stiefel)
  let sx=0,n=0;for(let y=y1-60;y<=y1;y++)for(let x=x0;x<=x1;x++)if(!bg[y*W+x]){sx+=x;n++}
  g.putImageData(id,0,0);return{c,x0,y0,x1,y1,fuss:sx/n}}
let fertig=0;const ims=URLS.map(u=>{const im=new Image();im.onload=()=>{if(++fertig===3)los()};im.src=u;return im});
function los(){const F=ims.map(frei);
  // gemeinsamer Rahmen: links/rechts so weit, wie die Figur von der Fußmitte aus reicht, oben die höchste Figur
  const li=Math.max(...F.map(f=>f.fuss-f.x0)),re=Math.max(...F.map(f=>f.x1-f.fuss)),ob=Math.max(...F.map(f=>f.y1-f.y0));
  const w=Math.ceil((2*Math.max(li,re)+4)*S),h=Math.ceil((ob+4)*S),o=document.createElement('canvas');o.width=w*3;o.height=h;const og=o.getContext('2d');og.imageSmoothingEnabled=false;
  F.forEach((f,i)=>{const bw=f.x1-f.x0+1,bh=f.y1-f.y0+1,dx=i*w+w/2-(f.fuss-f.x0)*S,dy=h-2*S-bh*S;og.drawImage(f.c,f.x0,f.y0,bw,bh,Math.round(dx),Math.round(dy),Math.round(bw*S),Math.round(bh*S))});
  document.getElementById('png').textContent=JSON.stringify({url:o.toDataURL(),w,h,anker:[Math.round(w/2),h-2]})}
</script>`;
const tmp=path.join(os.tmpdir(),'twerk-'+Date.now()+'.html');fs.writeFileSync(tmp,page);
const prof=fs.mkdtempSync(path.join(os.tmpdir(),'twerk-prof-'));
const out=execFileSync('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',['--headless=new','--dump-dom','--virtual-time-budget=90000','--user-data-dir='+prof,'file:///'+tmp.replace(/\\/g,'/')],{maxBuffer:64<<20,timeout:240000}).toString('utf8');
fs.unlinkSync(tmp);
const p=out.match(/<pre id="png">([\s\S]*?)<\/pre>/);if(!p||!p[1])throw new Error('kein Ergebnis');
const r=JSON.parse(p[1].replace(/&quot;/g,'"').replace(/&amp;/g,'&'));
fs.writeFileSync(path.join(root,'pixel/nastja_twerk.png'),Buffer.from(r.url.split(',')[1],'base64'));
fs.writeFileSync(path.join(root,'js/56-nastja-twerk-pixel.js'),`// ================= Nastja tanzt von hinten (Dessous-Outfit): 3 Frames als horizontaler Streifen =================
// AUTOMATISCH erzeugt aus pixel/nastja_twerk_{1,2,3}_vorlage.png mit: node tools/nastja-twerk.js  – nicht von Hand ändern.
// Frame 0 aufrecht · 1 Zwischenstufe · 2 tiefster Punkt. Anker = Mitte zwischen den Stiefelsohlen.
const NASTJA_TWERK_URL=${JSON.stringify(r.url)};
const NASTJA_TWERK_W=${r.w},NASTJA_TWERK_H=${r.h},NASTJA_TWERK_ANKER=${JSON.stringify(r.anker)};
`);
console.log('ok',r.w,r.h,r.anker,Math.round(r.url.length/1024)+' KB');
