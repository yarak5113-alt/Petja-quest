// ================= Wege: begehbare Flächen, Hindernisse, Wegsuche =================
// Vorher lief Petja schnurgerade zum Klickpunkt, begrenzt nur durch den Rahmen des Orts (x0/x1, ymin/ymax, xr) – mitten durch
// Menschen, Brunnen, Karren, Gräber. Jetzt:
//   • Begehbar = der bisherige Rahmen des Orts PLUS die gemalten Wege in die Tiefe (WEGE[ort].plus, Polygone),
//     MINUS Hindernisse: von Hand eingetragene Dinge (WEGE[ort].block) und automatisch jede Figur im Ort.
//   • Figuren: jede sichtbare .interactive-Gruppe mit einem Figurenbild (image.spr) im Raum des Orts – auch solche, die erst
//     später ins Spiel kommen. Fußfläche = Ellipse um die Unterkante ihres Bildes.
//   • Wegsuche: A* auf einem 6-px-Raster (8 Richtungen), danach werden Ecken geglättet (direkte Sichtlinie), damit er nicht
//     im Zickzack läuft. Liegt das Ziel auf einem Hindernis (z. B. „zur Oma laufen“), geht er zum nächsten freien Punkt.
//   • Hindernisse werden um Petjas halbe Breite (RAND) vergrößert, damit er nicht mit der Schulter durch Leute läuft.
// Koordinaten wie überall im Spiel: 800 × 500. Formen: {p:[[x,y],…]} Polygon · {e:[x,y,rx,ry]} Ellipse (Fußfläche).
const WEGE_RASTER=6,WEGE_RAND=7;
const WEGE={
  wald:{plus:[[[400,398],[522,398],[497,318],[455,318]]],                     // Waldweg in die Tiefe
    block:[{e:[213,455,32,10]},{e:[612,455,42,12]},{e:[300,412,7,4]}]},       // Fliegenpilz, Baumstumpf, Wegweiser
  gabel:{block:[{e:[291,376,14,6]},{e:[170,443,8,4]},{e:[600,352,62,10]}]},        // Apfelbaumstamm, Wegweiser, umgestürzte Birke
  dorf:{plus:[[[300,334],[533,334],[470,288],[405,288]]],                      // Dorfweg nach hinten
    block:[{e:[111,440,8,4]},{e:[488,346,7,4]}]},                             // Wegweiser
  dorfstr:{plus:[[[307,343],[563,343],[476,290],[421,290]]],                   // Dorfstraße nach hinten
    block:[{e:[110,447,8,4]}]},
  kirche:{plus:[[[330,334],[520,334],[487,303],[433,303]]],                    // Weg zur Kirchentür
    block:[{e:[200,370,22,7]},{e:[150,417,22,7]},{e:[293,380,22,7]},{e:[287,433,22,7]},{e:[87,357,20,6]},   // Gräber links
      {e:[640,367,22,7]},{e:[700,420,24,7]},{e:[740,373,22,7]},{e:[111,445,8,4]}]},                        // Gräber rechts, Wegweiser
  schmiede:{plus:[[[370,390],[720,390],[720,420],[370,420]]],                    // Erdboden vor der Schmiede: hinter dem Brunnen vorbei
    block:[{p:[[556,420],[640,420],[640,490],[556,490]]},{e:[387,416,26,8]},{e:[690,416,58,9]},{e:[142,427,9,4]}]},   // Brunnen, Amboss, Holzstapel, Pfosten
  muehle:{block:[{e:[423,447,32,9]},{e:[580,447,72,11]},{e:[170,410,42,9]},{e:[90,440,8,4]},{e:[700,440,8,4]}]},            // Säcke, Karren, Mühlsteine, Wegweiser
  fischer:{block:[{e:[303,370,42,9]},{e:[400,372,62,10]},{e:[110,460,9,4]},{e:[552,490,8,4]}]},                             // Netzgestell, Boot, Wegweiser
  ufer:{block:[{e:[600,372,62,9]},{e:[110,460,9,4]},{e:[195,400,7,4]},{e:[675,427,8,4]}]},                                  // Wrack, Wegweiser
  huette:{block:[{e:[640,445,42,9]},{e:[700,435,8,4]}]},                                                                     // Holzstapel, Wegweiser
  gnome:{block:[{e:[240,390,22,7]},{e:[111,450,8,4]},{e:[194,467,7,4]},{e:[605,413,7,4]}]},                                  // Baumstumpf, Wegweiser
  garten:{block:[{p:[[0,372],[300,372],[300,488],[0,488]]},{p:[[466,406],[658,406],[658,456],[466,456]]},{e:[700,440,8,4]}]}, // Kohlbeet, Pilzbeet, Wegweiser
  banjaH:{block:[{p:[[477,412],[745,412],[745,443],[477,443]]},{e:[110,480,9,4]}]},                                         // Heuhaufen, Wegweiser
  banjaV:{block:[{e:[120,487,8,4]},{e:[690,485,8,4]}]},
  irrwald:{block:[{e:[318,388,8,4]},{e:[542,390,8,4]},{e:[110,485,9,4]}]},
  innen:{block:[{p:[[30,398],[242,398],[242,420],[30,420]]}]},                                                               // Ofen
  banja:{block:[{e:[420,440,24,7]},{e:[620,447,24,7]},{e:[700,485,8,4]}]},                                                  // Stehtische, Wegweiser
  hoehle:{block:[{p:[[38,418],[252,418],[252,462],[38,462]]},{p:[[618,418],[792,418],[792,442],[618,442]]},{e:[110,485,9,4]}]}, // Leuchtpilze, Kristalle, Wegweiser
};

// ---- Geometrie ----
const wegeInPoly=(x,y,P)=>{let r=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const[xi,yi]=P[i],[xj,yj]=P[j];if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)r=!r}return r};
function wegeImRahmen(o,x,y){if(x<o.x0||x>o.x1||y<o.ymin(x)||y>o.ymax)return false;if(o.xr){const[a,b]=o.xr(y);if(x<a||x>b)return false}return true}
function wegeInForm(f,x,y,rand){if(f.e){const[cx,cy,rx,ry]=f.e;return((x-cx)/(rx+rand))**2+((y-cy)/(ry+rand*.45))**2<=1}
  if(f.p){if(wegeInPoly(x,y,f.p))return true;if(!rand)return false;   // Polygon um rand vergrößert: Abstand zu den Kanten
    const P=f.p;for(let i=0,j=P.length-1;i<P.length;j=i++){const[ax,ay]=P[j],[bx,by]=P[i],dx=bx-ax,dy=by-ay,t=Math.max(0,Math.min(1,((x-ax)*dx+(y-ay)*dy)/(dx*dx+dy*dy||1)));
      if(Math.hypot(x-ax-t*dx,(y-ay-t*dy)*2.2)<=rand)return true}}return false}

// ---- Figuren im aktuellen Ort (automatisch) ----
function wegeFiguren(){const sv=document.getElementById('scene'),room=cur&&document.getElementById('r-'+cur);if(!sv||!room)return[];
  const sr=sv.getBoundingClientRect();if(!sr.width)return[];const out=[];
  room.querySelectorAll('.interactive').forEach(g=>{if(g.dataset.id==='petja'||!g.querySelector('image.spr'))return;const r=g.getBoundingClientRect();if(!r.width||!r.height)return;
    const x0=(r.left-sr.left)/sr.width*800,w=r.width/sr.width*800,yb=(r.bottom-sr.top)/sr.height*500,h=r.height/sr.height*500;if(h<40)return;   // Kleinkram (Krähe, Kater) zählt nicht
    const rx=Math.max(10,Math.min(34,w*.3)),ry=Math.max(5,rx*.38);out.push({e:[x0+w/2,yb-ry*.4,rx,ry],id:g.dataset.id})});
  return out}

// ---- Raster: 1 = begehbar ----
function wegeMaske(){const o=S0;if(!o)return null;const def=WEGE[cur]||{},fig=wegeFiguren(),G=WEGE_RASTER,cw=Math.ceil(800/G),ch=Math.ceil(500/G);
  const block=(def.block||[]).concat(fig),m=new Uint8Array(cw*ch);
  for(let j=0;j<ch;j++)for(let i=0;i<cw;i++){const x=i*G+G/2,y=j*G+G/2;
    let ok=wegeImRahmen(o,x,y)||(def.plus||[]).some(P=>wegeInPoly(x,y,P));
    if(ok&&block.some(f=>wegeInForm(f,x,y,WEGE_RAND)))ok=false;m[j*cw+i]=ok?1:0}
  return{m,cw,ch,G,block}}

// nächstes freies Feld (Breitensuche nach Abstand)
function wegeNaechstes(W,i,j){const{m,cw,ch}=W;if(i>=0&&j>=0&&i<cw&&j<ch&&m[j*cw+i])return[i,j];let best=null,bd=1e9;
  for(let r=1;r<Math.max(cw,ch);r++){for(let dj=-r;dj<=r;dj++)for(let di=-r;di<=r;di++){if(Math.max(Math.abs(di),Math.abs(dj))!==r)continue;const I=i+di,J=j+dj;
      if(I<0||J<0||I>=cw||J>=ch||!m[J*cw+I])continue;const d=di*di+dj*dj*1.6;if(d<bd){bd=d;best=[I,J]}}if(best&&r*r>bd)break}return best}

// A* (8 Richtungen, keine Ecken schneiden); kommt er nicht hin, endet der Weg am erreichbaren Feld, das dem Ziel am nächsten ist
function wegeAStern(W,s,z){const{m,cw,ch}=W,N=cw*ch,g=new Float32Array(N).fill(Infinity),von=new Int32Array(N).fill(-1),zu=new Uint8Array(N);
  const id=(i,j)=>j*cw+i,h=(i,j)=>{const dx=Math.abs(i-z[0]),dy=Math.abs(j-z[1]);return Math.max(dx,dy)+.414*Math.min(dx,dy)};
  const heap=[];const push=(k,f)=>{heap.push([f,k]);let c=heap.length-1;while(c){const p=(c-1)>>1;if(heap[p][0]<=heap[c][0])break;[heap[p],heap[c]]=[heap[c],heap[p]];c=p}};
  const pop=()=>{const t=heap[0],e=heap.pop();if(heap.length){heap[0]=e;let c=0;for(;;){const l=2*c+1,r=l+1;let s2=c;if(l<heap.length&&heap[l][0]<heap[s2][0])s2=l;if(r<heap.length&&heap[r][0]<heap[s2][0])s2=r;if(s2===c)break;[heap[s2],heap[c]]=[heap[c],heap[s2]];c=s2}}return t};
  const S=id(...s),Z=id(...z);g[S]=0;push(S,h(...s));let nah=S,nahH=h(...s);
  while(heap.length){const[,k]=pop();if(zu[k])continue;zu[k]=1;if(k===Z){nah=Z;break}const i=k%cw,j=(k-i)/cw,hk=h(i,j);if(hk<nahH){nahH=hk;nah=k}
    for(let dj=-1;dj<=1;dj++)for(let di=-1;di<=1;di++){if(!di&&!dj)continue;const I=i+di,J=j+dj;if(I<0||J<0||I>=cw||J>=ch)continue;const q=id(I,J);if(!m[q]||zu[q])continue;
      if(di&&dj&&(!m[id(i+di,j)]||!m[id(i,j+dj)]))continue;const ng=g[k]+(di&&dj?1.414:1);if(ng<g[q]){g[q]=ng;von[q]=k;push(q,ng+h(I,J))}}}
  const weg=[];for(let k=nah;k>=0;k=von[k])weg.push([k%cw,(k-k%cw)/cw]);return weg.reverse()}

// Sichtlinie zwischen zwei Punkten (in 2-px-Schritten über das Raster)
function wegeFrei(W,a,b){const{m,cw,ch,G}=W,d=Math.hypot(b[0]-a[0],b[1]-a[1]),n=Math.max(1,Math.ceil(d/2));
  for(let s=0;s<=n;s++){const x=a[0]+(b[0]-a[0])*s/n,y=a[1]+(b[1]-a[1])*s/n,i=Math.floor(x/G),j=Math.floor(y/G);if(i<0||j<0||i>=cw||j>=ch||!m[j*cw+i])return false}return true}

// Weg von (x0,y0) nach (x1,y1) als Liste von Wegpunkten (ohne Start). Zielpunkt bleibt exakt, wenn er frei ist.
function wegePlan(x0,y0,x1,y1){const W=wegeMaske();if(!W)return[[x1,y1]];const G=W.G,zelle=(x,y)=>[Math.floor(x/G),Math.floor(y/G)];
  const s=wegeNaechstes(W,...zelle(x0,y0)),zRoh=zelle(x1,y1),z=wegeNaechstes(W,...zRoh);if(!s||!z)return[[x1,y1]];
  const zielFrei=z[0]===zRoh[0]&&z[1]===zRoh[1],mitte=([i,j])=>[i*G+G/2,j*G+G/2];
  const zellen=wegeAStern(W,s,z),pts=zellen.map(mitte);const ende=pts.length&&zellen[zellen.length-1];
  if(zielFrei&&ende&&ende[0]===z[0]&&ende[1]===z[1])pts[pts.length-1]=[x1,y1];
  // Glätten: von jedem Punkt so weit wie möglich geradeaus
  const start=[x0,y0],out=[];let a=start,k=0;
  while(k<pts.length){let b=pts.length-1;while(b>k&&!wegeFrei(W,a,pts[b]))b--;out.push(pts[b]);a=pts[b];k=b+1}
  return out.length?out:[[x1,y1]]}

// ---- walkTo ersetzen: Wegpunkte nacheinander ablaufen (die Laufschleife in 05 bleibt unverändert) ----
let WEGE_NR=0;
walkTo=function(tx,ty,cb){const nr=++WEGE_NR;let weg;try{weg=wegePlan(P.x,P.y,tx,ty)}catch(e){console.error('Wege',e);weg=[[tx,ty]]}
  const naechster=i=>{if(nr!==WEGE_NR)return;if(i>=weg.length){cb&&cb();return}const[x,y]=weg[i];mv={tx:x,ty:y,cb:()=>naechster(i+1)}};naechster(0)};
