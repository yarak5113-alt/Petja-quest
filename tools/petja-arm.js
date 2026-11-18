// Baut Petjas ausgestreckten Arm (Ich-Sicht, Griff zur Brust beim Tanz) aus pixel/petja_arm_vorlage.png.
//   node tools/petja-arm.js
// Die Vorlage hat einen hellen, eingebackenen Karo-Hintergrund: Flutfüllung von allen Rändern durch helle, graue Pixel;
// die dunkle Kontur hält sie auf. Danach zuschneiden, auf 75 % verkleinern (pixelig, ohne Glätten) und als PNG + JS-Datei ablegen.
// Ergebnis: pixel/petja_arm.png und js/54-petja-arm-pixel.js (PETJA_ARM_IMG, PETJA_ARM_ANKER = Handfläche im Bild).
// HINWEIS: Seit 2.47 benutzt das Spiel den Arm nicht mehr (der Griff im Tanz wurde durch „Twerken“ ersetzt). Wer ihn zurückwill:
// Werkzeug laufen lassen, die erzeugte Datei in index.html vor 49 eintragen und den Griff-Code aus der Git-Geschichte (bis 2.46) holen.
const fs=require('fs'),path=require('path'),os=require('os'),{execFileSync}=require('child_process');
const root=path.join(__dirname,'..'),IN=path.join(root,'pixel/petja_arm_vorlage.png');
const data='data:image/png;base64,'+fs.readFileSync(IN).toString('base64');
const page=`<!doctype html><meta charset="utf-8"><body><pre id="png"></pre><script>
const im=new Image();im.onload=()=>{const W=im.width,H=im.height,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');g.drawImage(im,0,0);
  const id=g.getImageData(0,0,W,H),d=id.data,bg=new Uint8Array(W*H),st=[];
  const hell=k=>{const q=k*4,r=d[q],gg=d[q+1],b=d[q+2],mx=Math.max(r,gg,b),mn=Math.min(r,gg,b);return mx-mn<=16&&(r+gg+b)/3>=150};
  const saat=k=>{if(hell(k)&&!bg[k]){bg[k]=1;st.push(k)}};
  for(let x=0;x<W;x++){saat(x);saat((H-1)*W+x)}for(let y=0;y<H;y++){saat(y*W);saat(y*W+W-1)}
  while(st.length){const k=st.pop(),x=k%W,y=(k-x)/W;for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const X=x+dx,Y=y+dy;if(X<0||Y<0||X>=W||Y>=H)continue;const j=Y*W+X;if(!bg[j]&&hell(j)){bg[j]=1;st.push(j)}}}
  {const lab=new Int32Array(W*H).fill(-1),gr=[];for(let s=0;s<W*H;s++){if(bg[s]||lab[s]>=0)continue;const n=gr.length,q=[s];lab[s]=n;let c=0;   // nur die größte Fläche (der Arm) bleibt
    while(q.length){const k=q.pop(),x=k%W,y=(k-x)/W;c++;for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const X=x+dx,Y=y+dy;if(X<0||Y<0||X>=W||Y>=H)continue;const j=Y*W+X;if(!bg[j]&&lab[j]<0){lab[j]=n;q.push(j)}}}gr.push(c)}
    const gross=gr.indexOf(Math.max(...gr));for(let k=0;k<W*H;k++)if(lab[k]!==gross)bg[k]=1}
  let x0=W,y0=H,x1=0,y1=0;for(let k=0;k<W*H;k++){if(bg[k]){d[k*4+3]=0;continue}const x=k%W,y=(k-x)/W;if(x<x0)x0=x;if(y<y0)y0=y;if(x>x1)x1=x;if(y>y1)y1=y}
  // einzelne helle Reste am Rand der Kontur (Kantenglättung der Vorlage) weich machen
  for(let k=0;k<W*H;k++)if(!bg[k]){const x=k%W,y=(k-x)/W;let n=0;for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const X=x+dx,Y=y+dy;if(X>=0&&Y>=0&&X<W&&Y<H&&bg[Y*W+X])n++}if(n>=3)d[k*4+3]=0}
  g.putImageData(id,0,0);const S=.75,w=Math.round((x1-x0+1)*S),h=Math.round((y1-y0+1)*S),o=document.createElement('canvas');o.width=w;o.height=h;const og=o.getContext('2d');og.imageSmoothingEnabled=false;
  og.drawImage(c,x0,y0,x1-x0+1,y1-y0+1,0,0,w,h);
  document.getElementById('png').textContent=JSON.stringify({url:o.toDataURL(),w,h,anker:[Math.round((340-x0)*S),Math.round((215-y0)*S)]})};
im.src=${JSON.stringify(data)};
</script>`;
const tmp=path.join(os.tmpdir(),'arm-'+Date.now()+'.html');fs.writeFileSync(tmp,page);
const prof=fs.mkdtempSync(path.join(os.tmpdir(),'arm-prof-'));
const out=execFileSync('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',['--headless=new','--dump-dom','--virtual-time-budget=60000','--user-data-dir='+prof,'file:///'+tmp.replace(/\\/g,'/')],{maxBuffer:64<<20,timeout:180000}).toString('utf8');
fs.unlinkSync(tmp);
const p=out.match(/<pre id="png">([\s\S]*?)<\/pre>/);if(!p||!p[1])throw new Error('kein Ergebnis');
const r=JSON.parse(p[1].replace(/&quot;/g,'"').replace(/&amp;/g,'&'));
fs.writeFileSync(path.join(root,'pixel/petja_arm.png'),Buffer.from(r.url.split(',')[1],'base64'));
fs.writeFileSync(path.join(root,'js/54-petja-arm-pixel.js'),`// ================= Petjas ausgestreckter Arm (Ich-Sicht, Tanz: Griff zur Brust) =================
// AUTOMATISCH erzeugt aus pixel/petja_arm_vorlage.png mit: node tools/petja-arm.js  – nicht von Hand ändern.
// PETJA_ARM_ANKER = Handfläche im Bild (dort soll das Ziel liegen); der Ärmel läuft nach rechts unten aus dem Bild.
const PETJA_ARM_IMG=(()=>{const im=new Image();im.src=${JSON.stringify(r.url)};return im})();
const PETJA_ARM_W=${r.w},PETJA_ARM_H=${r.h},PETJA_ARM_ANKER=${JSON.stringify(r.anker)};
`);
console.log('ok',r.w,r.h,r.anker,Math.round(r.url.length/1024)+' KB');
