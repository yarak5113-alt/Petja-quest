// Baut js/33-nastja-pixel.js aus pixel/nastja.json (+ Stangen-Frames pixel/nastja_stange*.json, falls vorhanden):
// die freigegebenen Arrays werden im Spiel 1:1 angezeigt (Bühne, Tanz, Lounge, Ich-Sicht).
//   node tools/nastja-insspiel.js   (nach jeder Änderung an pixel/nastja*.json erneut ausführen)
const fs=require('fs'),path=require('path'),root=path.join(__dirname,'..');
const rd=f=>JSON.parse(fs.readFileSync(path.join(root,'pixel',f),'utf8')),arr=o=>({w:o.width,h:o.height,palette:o.palette,rows:o.rows});
const o=rd('nastja.json');
// Lage im Spiel: gleicher Maßstab wie die alte Nastja (266 Einheiten = 500 px), Körpermitte (x=0) bei Pixelspalte 131.3, Füße auf y≈+2
const s=266/500,CX=131.3,G=[+(-CX*s).toFixed(2),-264,+(o.width*s).toFixed(2),266];
// Stangen-Frames: ungekürzt, Stange (x=0 der Figurgruppe) bei Spalte pole_x
const ld=ns=>ns.filter(n=>fs.existsSync(path.join(root,'pixel',`nastja_${n}.json`))).map(n=>rd(`nastja_${n}.json`));
const FR=ld(['stange1','stange2','stange3']),LO=ld(['lounge1','lounge2','lounge3']);
const geo=o=>[+(-o.pole_x*s).toFixed(2),+(-264-(o.top_extra||0)*s).toFixed(2),+(o.width*s).toFixed(2),+(o.height*s).toFixed(2)];
const FG=FR.length?geo(FR[0]):null,LG=LO.length?geo(LO[0]):null;
fs.writeFileSync(path.join(root,'js/33-nastja-pixel.js'),`// ================= Nastja im Spiel: freigegebene Pixel-Arrays =================
// AUTOMATISCH erzeugt aus pixel/nastja*.json mit: node tools/nastja-insspiel.js  – nicht von Hand ändern.
// Hauptsprite ersetzt das alte Bühnen-Sprite (DANCER): Privattanz, Lounge, Ich-Sicht. An der Stange laufen die Stangen-Frames.
const NASTJA_ARR=${JSON.stringify(arr(o))};
const NASTJA_G=${JSON.stringify(G)};
const nastjaURL=({w,h,palette,rows})=>{const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d'),id=g.createImageData(w,h),d=id.data;
  rows.forEach((r,y)=>{let x=0;for(const m of r.matchAll(/([^0-9])([0-9]*)/g)){const col=palette[m[1]],n=+m[2]||1;if(col){const v=[1,3,5].map(i=>parseInt(col.slice(i,i+2),16));for(let i=0;i<n;i++){const q=(y*w+x+i)*4;d[q]=v[0];d[q+1]=v[1];d[q+2]=v[2];d[q+3]=255}}x+=n}});
  g.putImageData(id,0,0);return c.toDataURL()};
const NASTJA_URL=nastjaURL(NASTJA_ARR);
const setImg=(e,u,G)=>{e.setAttribute('href',u);['x','y','width','height'].forEach((k,i)=>e.setAttribute(k,G[i]))};
['dancerimg','dancer2img','poleimg'].forEach(id=>{const e=document.getElementById(id);if(e)setImg(e,NASTJA_URL,NASTJA_G)});
DANCERIMG.src=NASTJA_URL;DANCER_G.splice(0,4,...NASTJA_G);
${FR.length?`// ----- An der Stange: S1 (Bein links herum) → S2 (gleitet) → S3 (Bein rechts herum) → S2 → … ; Stange liegt stellenweise VOR ihr -----
const NASTJA_STANGE=${JSON.stringify(FR.map(arr))}.map(nastjaURL),NASTJA_FG=${JSON.stringify(FG)},NASTJA_FRONT=${JSON.stringify(FR.map(o=>o.front_rows||[]))};
{const e=document.getElementById('poleimg');if(e){const g=e.parentNode;g.classList.remove('pole');   // alte Schwing-Animation aus
  // Stange vor ihr (Wade hinter der Stange): drei harte Streifen wie die gemalte Stange (x 395–405, Gruppe ist 1.05-fach skaliert)
  const NS='http://www.w3.org/2000/svg',front=document.createElementNS(NS,'g');front.setAttribute('shape-rendering','crispEdges');front.style.pointerEvents='none';g.appendChild(front);
  const W=10/1.05,x0=-W/2,cols=[['#74747e',0,.32],['#ececf4',.32,.68],['#5e5e66',.68,1]];
  const showFront=i=>{front.innerHTML='';(NASTJA_FRONT[i]||[]).forEach(([r0,r1])=>cols.forEach(([c,a,b])=>{const r=document.createElementNS(NS,'rect');Object.entries({x:x0+W*a,y:NASTJA_FG[1]+r0*${s},width:W*(b-a),height:(r1-r0)*${s},fill:c}).forEach(([k,v])=>r.setAttribute(k,v));front.appendChild(r)}))};
  const SEQ=[[0,1100],[1,700],[2,1100],[1,700]].filter(([i])=>NASTJA_STANGE[i]);let k=0,next=0;
  // setInterval statt setTimeout-Kette: der Durchlauf-Test zählt kurze Timeouts als „Spiel ist beschäftigt“
  setInterval(()=>{const t=performance.now();if(t<next)return;const[i,ms]=SEQ[k++%SEQ.length];setImg(e,NASTJA_STANGE[i],NASTJA_FG);showFront(i);next=t+ms},40)}}`:''}
${LO.length?`// ----- Private Lounge: L1 (Glas unten) → L2 (nippt) → L1 → L3 (Gewicht verlagert, Haarsträhne) → … -----
const NASTJA_LOUNGE=${JSON.stringify(LO.map(arr))}.map(nastjaURL),NASTJA_LG=${JSON.stringify(LG)};
{const e=document.getElementById('dancer2img');if(e){e.parentNode.classList.remove('dance');
  const SEQ=[[0,2600],[1,800],[0,1600],[2,2000]].filter(([i])=>NASTJA_LOUNGE[i]);let k=0,next=0;
  setInterval(()=>{const t=performance.now();if(t<next)return;const[i,ms]=SEQ[k++%SEQ.length];setImg(e,NASTJA_LOUNGE[i],NASTJA_LG);next=t+ms},40)}}`:''}
`);
console.log('js/33-nastja-pixel.js geschrieben',G,FR.length+' Stangen-Frames',FG,LO.length+' Lounge-Frames',LG);
