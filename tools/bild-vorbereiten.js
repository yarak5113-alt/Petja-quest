// Vorlage vorbereiten: Schachbrett-Hintergrund (dunkelgrau) vom Rand her weiß machen und weiche/hochskalierte Bilder schärfen (Unscharf-Maskieren).
//   node tools/bild-vorbereiten.js <bild.png> <aus.png> [stärke=2.2] [radius=2.5] [hintergrund-max-helligkeit=42] [max-buntheit=8] [kontur-verbreitern=0]   danach: node tools/bild2array.js <aus.png> <name> <json> <vorschau.png> 16 500
const fs=require('fs'),path=require('path'),os=require('os'),{execFileSync}=require('child_process');
const [IN,OUT,AMT="0",RAD="2",MAXL="42",CHROMA="8",DIL="0"]=process.argv.slice(2);
const data='data:image/png;base64,'+fs.readFileSync(IN).toString('base64');
const page=`<!doctype html><body><pre id="png"></pre><script>
const im=new Image();im.onload=()=>{const W=im.width,H=im.height,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');g.drawImage(im,0,0);
const id=g.getImageData(0,0,W,H),d=id.data,bg=new Uint8Array(W*H),st=[];
// Sperre: bräunliche Konturpixel (bunt, dunkel), um DIL px verbreitert – schließt Lücken in der Kontur, damit die Flut nicht in dunkle Stiefel/Strümpfe läuft
const DIL=${DIL},sperre=new Uint8Array(W*H);if(DIL>0){const br=new Uint8Array(W*H);for(let k=0;k<W*H;k++){const q=k*4,mx=Math.max(d[q],d[q+1],d[q+2]),mn=Math.min(d[q],d[q+1],d[q+2]);if(mx-mn>=12&&mx<110)br[k]=1}
  for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(br[y*W+x])for(let dy=-DIL;dy<=DIL;dy++)for(let dx=-DIL;dx<=DIL;dx++){const X=x+dx,Y=y+dy;if(X>=0&&Y>=0&&X<W&&Y<H)sperre[Y*W+X]=1}}
const ok=k=>{if(sperre[k])return false;const q=k*4,mx=Math.max(d[q],d[q+1],d[q+2]),mn=Math.min(d[q],d[q+1],d[q+2]);return mx-mn<${CHROMA}&&mx<${MAXL}};
for(let x=0;x<W;x++)st.push(x,(H-1)*W+x);for(let y=0;y<H;y++)st.push(y*W,y*W+W-1);
while(st.length){const k=st.pop();if(bg[k]||!ok(k))continue;bg[k]=1;const x=k%W,y=(k-x)/W;if(x>0)st.push(k-1);if(x<W-1)st.push(k+1);if(y>0)st.push(k-W);if(y<H-1)st.push(k+W)}
for(let k=0;k<W*H;k++)if(bg[k]){d[k*4]=d[k*4+1]=d[k*4+2]=255}
g.putImageData(id,0,0);const AMT=+(${AMT}),RAD=+(${RAD});if(AMT>0){const b=document.createElement('canvas');b.width=W;b.height=H;const bg2=b.getContext('2d');bg2.filter='blur('+RAD+'px)';bg2.drawImage(c,0,0);const bd=bg2.getImageData(0,0,W,H).data,o=g.getImageData(0,0,W,H),od=o.data;for(let i=0;i<od.length;i+=4)for(let j=0;j<3;j++)od[i+j]=Math.max(0,Math.min(255,od[i+j]+AMT*(od[i+j]-bd[i+j])));g.putImageData(o,0,0)}document.getElementById('png').textContent=c.toDataURL()};
im.src=${JSON.stringify(data)};</script>`;
const tmp=path.join(os.tmpdir(),'vf-'+Date.now()+'.html');fs.writeFileSync(tmp,page);
const prof=fs.mkdtempSync(path.join(os.tmpdir(),'vf-prof-'));
const out=execFileSync('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',['--headless=new','--dump-dom','--virtual-time-budget=30000','--user-data-dir='+prof,'file:///'+tmp.split(path.sep).join("/")],{maxBuffer:64<<20}).toString();
const p=out.match(/<pre id="png">([\s\S]*?)<\/pre>/);fs.writeFileSync(OUT,Buffer.from(p[1].split(',')[1],'base64'));console.log('ok');
