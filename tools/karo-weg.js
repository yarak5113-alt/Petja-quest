// Entfernt einen dunklen Karo-/Transparenz-Hintergrund (graue Kacheln) und legt die Figur auf Weiß – Vorstufe für bild2array.js.
//   node tools/karo-weg.js <bild.png> <aus.png>
// Flutet von oben/links/rechts durch neutral-graue dunkle Pixel (Helligkeit ≤ 48); die braune Kontur hält die Füllung auf. Läuft in Edge headless.
const fs=require('fs'),path=require('path'),os=require('os'),{execFileSync}=require('child_process');
const [IN,OUT]=process.argv.slice(2);
const data='data:image/png;base64,'+fs.readFileSync(IN).toString('base64');
const page=`<!doctype html><meta charset="utf-8"><body><pre id="png"></pre><script>
const im=new Image();im.onload=()=>{const W=im.width,H=im.height,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');g.drawImage(im,0,0);
  const id=g.getImageData(0,0,W,H),d=id.data,bg=new Uint8Array(W*H),st=[];
  const grau=k=>{const q=k*4,r=d[q],gg=d[q+1],b=d[q+2],mx=Math.max(r,gg,b),mn=Math.min(r,gg,b),L=.299*r+.587*gg+.114*b;return mx-mn<=10&&L<=48};   // Karo-Kacheln liegen bei ~10 und ~40 Helligkeit
  for(let x=0;x<W;x++)for(const k of[x])   // nicht vom unteren Rand: dort stehen oft die Stiefel
 if(grau(k)&&!bg[k]){bg[k]=1;st.push(k)}
  for(let y=0;y<H;y++)for(const k of[y*W,y*W+W-1])if(grau(k)&&!bg[k]){bg[k]=1;st.push(k)}
  while(st.length){const k=st.pop(),x=k%W,y=(k-x)/W;for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const X=x+dx,Y=y+dy;if(X<0||Y<0||X>=W||Y>=H)continue;const j=Y*W+X;if(!bg[j]&&grau(j)){bg[j]=1;st.push(j)}}}
  // eingeschlossene graue Inseln (z. B. zwischen den Stiefeln): Hintergrund, wenn beide Karo-Töne darin gut vertreten sind (Sohlen sind einfarbig)
  {const seen=new Uint8Array(W*H);for(let s0=0;s0<W*H;s0++){if(bg[s0]||seen[s0]||!grau(s0))continue;const comp=[s0],q=[s0];seen[s0]=1;let dunkel=0,hell=0;
    while(q.length){const k=q.pop(),x=k%W,y=(k-x)/W,L=.299*d[k*4]+.587*d[k*4+1]+.114*d[k*4+2];if(L<25)dunkel++;else hell++;
      for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const X=x+dx,Y=y+dy;if(X<0||Y<0||X>=W||Y>=H)continue;const j=Y*W+X;if(!seen[j]&&!bg[j]&&grau(j)){seen[j]=1;q.push(j);comp.push(j)}}}
    if(comp.length>200&&Math.min(dunkel,hell)>comp.length*.25)comp.forEach(k=>bg[k]=1)}}
  for(let k=0;k<W*H;k++)if(bg[k]){d[k*4]=d[k*4+1]=d[k*4+2]=255;d[k*4+3]=255}
  g.putImageData(id,0,0);document.getElementById('png').textContent=c.toDataURL()};
im.src=${JSON.stringify(data)};
</script>`;
const tmp=path.join(os.tmpdir(),'karo-'+Date.now()+'.html');fs.writeFileSync(tmp,page);
const prof=fs.mkdtempSync(path.join(os.tmpdir(),'karo-prof-'));
const out=execFileSync('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',['--headless=new','--dump-dom','--virtual-time-budget=60000','--user-data-dir='+prof,'file:///'+tmp.replace(/\\/g,'/')],{maxBuffer:64<<20,timeout:180000}).toString('utf8');
fs.unlinkSync(tmp);
const p=out.match(/<pre id="png">([\s\S]*?)<\/pre>/);if(!p||!p[1])throw new Error('kein Ergebnis');
fs.writeFileSync(OUT,Buffer.from(p[1].split(',')[1],'base64'));console.log('ok',OUT);
