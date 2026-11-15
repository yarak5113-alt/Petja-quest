// ================= Nastja: Animations-Frames (Stange + Lounge) =================
// Posen aus den Teilen der Hauptzeichnung (NASTJA_NEU, 32-nastja-neu.js): Kopf, Korsett, Haare, Accessoires bleiben dieselben Pfade,
// Arme und Beine werden pro Pose neu als Gliedmaßen gezogen. Gerendert wie das Hauptsprite (feste Palette, Maßstab 500 px / 274 Einheiten, Federkontur).
// Das Gesicht wird danach pixelgenau aus pixel/nastja.json übernommen (tools/nastja-frames.js) – in allen Frames identisch.
// Koordinaten wie das Hauptsprite: x=0 Körpermitte bzw. Stange, Füße auf y=0.
const NASTJA_PX=500/274;                                     // Pixel pro Einheit (fest für alle Frames)
const NASTJA_UP=56;                                          // Stangen-Frames: 56 px mehr Platz nach oben (Hände über dem Kopf)
const NASTJA_STANGE_BOX=[-74,-270-NASTJA_UP/NASTJA_PX,154,274+NASTJA_UP/NASTJA_PX];
const NASTJA_LOUNGE_BOX=[-74,-270,134,274];
const NASTJA_PARTS=(()=>{const p=NASTJA_NEU.split(/<!-- [^>]*-->/);
  return{open:p[0],hairBack:p[1],legs:p[2],hips:p[3],straps:p[4],torso:p[5],armR:p[6],armL:p[7],corset:p[8],head:p[9],face:p[10],hairFront:p[11],acc:p[12].replace('</g>','')}})();
// Gliedmaße als geschlossene Kontur um eine Mittellinie (Punkte + halbe Breiten), weich über Mittelpunkte gerundet
function nLimb(pts,wid,fill){const L=[],R=[];pts.forEach((p,i)=>{const a=pts[Math.max(0,i-1)],b=pts[Math.min(pts.length-1,i+1)],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1,nx=-dy/l,ny=dx/l,w=wid[i];
    L.push([p[0]+nx*w,p[1]+ny*w]);R.push([p[0]-nx*w,p[1]-ny*w])});
  const f=q=>q[0].toFixed(2)+','+q[1].toFixed(2),mid=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2],side=s=>{let d='';for(let i=1;i<s.length-1;i++)d+=`Q${f(s[i])} ${f(mid(s[i],s[i+1]))} `;return d+`L${f(s[s.length-1])} `};
  const Rr=R.slice().reverse();return`<path d="M${f(L[0])} ${side(L)}L${f(Rr[0])} ${side(Rr)}Z" fill="${fill}"/>`}
const nPt=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
const N_SK='#f0d0af',N_ST='#4a4844',N_BK='#343238';
// Bein: Hüfte -> Knie -> Knöchel; Strumpf mit Abschlussband, Plateauschuh (rot = Neigung). o.from: Strapse-Ansätze am Korsett
function nLeg(h,k,a,o={}){const top=nPt(h,k,.36),band=nPt(h,k,.38);let s=nLimb([h,k,a],[8.4,4.4,3.2],N_ST);
  s+=nLimb([h,nPt(h,k,.2),top],[8.6,7.6,6.9],N_SK)+nLimb([top,nPt(h,k,.42)],[7.2,6.8],N_BK);
  s+=`<g transform="translate(${a[0]},${a[1]+20}) rotate(${o.rot||0})"><path d="M-3.5,-23C-8,-19 -10,-14 -10,-10L7.5,-10C7.5,-14 6.5,-19 4,-23Z" fill="${N_BK}"/><path d="M-11,-10.5L8.2,-10.5L8.2,0L-11,0Z" fill="#2c2c32"/><path d="M-7,-17C-5,-19.5 -1,-20 2,-19.5M-9,-6L6,-6" fill="none" stroke="#5a5a60" stroke-width="1.8"/><path d="M-3.6,-22.5L4.2,-22.5" fill="none" stroke-width="1.4"/></g>`;
  const dx=k[0]-h[0],dy=k[1]-h[1],l=Math.hypot(dx,dy),nx=-dy/l*4.5,ny=dx/l*4.5;
  const st=(o.from||[]).map((q,i)=>{const e=[band[0]+(i?nx:-nx),band[1]+(i?ny:-ny)];return`M${q[0].toFixed(2)},${q[1].toFixed(2)}L${e[0].toFixed(2)},${e[1].toFixed(2)}`}).join('');
  return{leg:s,strap:st?`<path d="${st}" fill="none" stroke-width="1.3"/>`:''}}
// Arm: Schulter -> Ellbogen -> Handgelenk. o.grip: Faust um die Stange, o.glass: Glas Rotwein in der Hand
function nArm(s,e,w,o={}){let r=nLimb([s,e,w],[3.6,2.9,2.3],N_SK)+`<circle cx="${s[0]}" cy="${s[1]}" r="3.4" fill="${N_SK}" stroke="none"/>`;const[x,y]=w;
  if(o.grip)r+=`<path d="M${x-4.6},${y-1}C${x-4.8},${y-5.2} ${x+4.8},${y-5.2} ${x+4.6},${y-1}C${x+4.8},${y+3.6} ${x-4.8},${y+3.6} ${x-4.6},${y-1}Z" fill="${N_SK}"/><path d="M${x-3.2},${y-2.6}L${x+3.2},${y-2.6}M${x-3.4},${y-0.2}L${x+3.4},${y-0.2}M${x-3},${y+2}L${x+3},${y+2}" fill="none" stroke-width=".8"/>`;
  else r+=`<path d="M${x-3.2},${y-1}C${x-3.4},${y-4.4} ${x+3.4},${y-4.4} ${x+3.2},${y-1}C${x+3.4},${y+3.4} ${x-3.4},${y+3.4} ${x-3.2},${y-1}Z" fill="${N_SK}"/>`;
  if(o.glass)r+=`<path d="M${x-1},${y-3}L${x-1},${y-9}M${x-4.5},${y+3.4}L${x+2.5},${y+3.4}" fill="none" stroke="#f0eeea" stroke-width="1.7"/><path d="M${x-5.5},${y-17}L${x+3.5},${y-17}C${x+3.5},${y-11} ${x+1.5},${y-9} ${x-1},${y-9}C${x-3.5},${y-9} ${x-5.5},${y-11} ${x-5.5},${y-17}Z" fill="#f0eeea"/><path d="M${x-5},${y-14}L${x+3},${y-14}C${x+2.6},${y-11} ${x+1},${y-10} ${x-1},${y-10}C${x-3},${y-10} ${x-4.6},${y-11} ${x-5},${y-14}Z" fill="#712834" stroke="none"/>`;
  return r}
// Federwedel im Strumpfband (Stange: Hände frei)
function nWedel(x,y){let fe='';for(let i=0;i<7;i++){const a=(-140+i*17)*Math.PI/180,L=11+(i%3)*2,cx=x,cy=y-16,ex=cx+Math.cos(a)*L,ey=cy+Math.sin(a)*L,nx=-Math.sin(a)*3,ny=Math.cos(a)*3;
    fe+=`<path d="M${cx},${cy}C${(cx+ex)/2+nx},${(cy+ey)/2+ny} ${ex+nx*.4},${ey+ny*.4} ${ex},${ey}C${ex-nx*.4},${ey-ny*.4} ${(cx+ex)/2-nx},${(cy+ey)/2-ny} ${cx},${cy}Z" fill="${i%3==1?'#d8d4cf':'#f6f3ee'}"/>`}
  return`<path d="M${x},${y+4}L${x},${y-16}" fill="none" stroke="${N_BK}" stroke-width="2.6"/>`+fe}
// Pose zusammensetzen. p.bx/p.by: Körperversatz in PIXELN (ganzzahlig -> Gesicht passt 1:1), p.hair: Haarschwung (Einheiten)
// p.legs(B) -> [{leg,strap}...] in Zeichenreihenfolge, p.armsBack(B)/p.armsFront(B), p.wedel: Federwedel im Strumpfband
function nastjaPose(p){const bx=(p.bx||0)/NASTJA_PX,by=(p.by||0)/NASTJA_PX,T=(dx,dy)=>`<g transform="translate(${(bx+dx).toFixed(3)},${(by+dy).toFixed(3)})">`,P=NASTJA_PARTS,B=([x,y])=>[x+bx,y+by];
  const legs=p.legs(B);
  return P.open+T(p.hair||0,0)+P.hairBack+'</g>'+legs.map(l=>l.leg).join('')+T(0,0)+P.hips+'</g>'+legs.map(l=>l.strap).join('')+(p.wedel?nWedel(bx+21,by-112):'')+
    (p.armsBack?p.armsBack(B):'')+T(0,0)+P.torso+P.corset+P.head+P.face+P.hairFront+P.acc+'</g>'+(p.armsFront?p.armsFront(B):'')+'</g>'}
const LF=B=>({from:[B([-10,-141]),B([-17,-140])]}),RF=B=>({from:[B([10,-141]),B([17,-140])]});
const NASTJA_POSEN={
  // ---- An der Stange (Stange bei x=0, mitten im Bild). front: Höhenbereiche, in denen die Stange VOR ihr liegt (Einheiten) ----
  // S1: rechter Oberschenkel schlingt sich vor der Stange herum, Wade dahinter; beide Hände greifen über dem Kopf
  stange1:{box:'stange',bx:5,by:0,hair:2,wedel:1,front:[[-99,-64]],
    legs:B=>[nLeg(B([9,-134]),[-11,-100],[8,-70],{...RF(B),rot:-35}),nLeg(B([-9,-134]),B([-9,-68]),B([-8,-20]),LF(B))],
    armsFront:B=>nArm(B([-17,-195]),B([-25,-246]),[0,-276],{grip:1})+nArm(B([17,-195]),B([25,-244]),[0,-265],{grip:1})},
  // S2: gleitet herab, Knie umklammern die Stange, Füße angewinkelt dahinter
  stange2:{box:'stange',bx:0,by:12,hair:0,wedel:1,front:[[-74,-46]],
    legs:B=>[nLeg(B([-9,-134]),[-4.5,-88],[-12,-58],{...LF(B),rot:30}),nLeg(B([9,-134]),[4.5,-88],[12,-58],{...RF(B),rot:-30})],
    armsFront:B=>nArm(B([-17,-195]),B([-24,-240]),[0,-266],{grip:1})+nArm(B([17,-195]),B([24,-236]),[0,-255],{grip:1})},
  // S3: linker Oberschenkel schlingt sich herum (Gegenbewegung)
  stange3:{box:'stange',bx:-5,by:0,hair:-2,wedel:1,front:[[-99,-64]],
    legs:B=>[nLeg(B([-9,-134]),[11,-100],[-8,-70],{...LF(B),rot:35}),nLeg(B([9,-134]),B([9,-68]),B([8,-20]),RF(B))],
    armsFront:B=>nArm(B([-17,-195]),B([-25,-244]),[0,-265],{grip:1})+nArm(B([17,-195]),B([25,-246]),[0,-276],{grip:1})},
  // ---- Private Lounge (Glas Rotwein, gelangweilt) ----
  // L1: Gewicht rechts, Hand in der Hüfte, Glas locker unten
  lounge1:{box:'lounge',bx:2,by:0,
    legs:B=>[nLeg(B([-9,-134]),B([-6,-70]),B([-9,-20]),LF(B)),nLeg(B([9,-134]),B([9,-68]),B([9,-20]),RF(B))],
    armsBack:B=>nArm(B([17,-195]),B([28,-166]),B([18,-140])),
    armsFront:B=>nArm(B([-17,-195]),B([-23,-164]),B([-20,-136]),{glass:1})},
  // L2: nippt am Glas (Glas neben dem Kinn, Mund bleibt frei)
  lounge2:{box:'lounge',bx:2,by:0,
    legs:B=>[nLeg(B([-9,-134]),B([-6,-70]),B([-9,-20]),LF(B)),nLeg(B([9,-134]),B([9,-68]),B([9,-20]),RF(B))],
    armsBack:B=>nArm(B([17,-195]),B([28,-166]),B([18,-140])),
    armsFront:B=>nArm(B([-17,-195]),B([-26,-176]),B([-17,-202]),{glass:1})},
  // L3: Gewicht nach links verlagert, zwirbelt eine Haarsträhne
  lounge3:{box:'lounge',bx:-2,by:0,hair:-1,
    legs:B=>[nLeg(B([9,-134]),B([6,-70]),B([9,-20]),RF(B)),nLeg(B([-9,-134]),B([-9,-68]),B([-9,-20]),LF(B))],
    armsFront:B=>nArm(B([17,-195]),B([29,-178]),B([21,-200]))+nArm(B([-17,-195]),B([-23,-164]),B([-20,-136]),{glass:1})}};
// Rendern: shift = Bodenverschiebung des Hauptsprites (px), damit alle Frames deckungsgleich mit dem Hauptsprite liegen
function nastjaFrame(name,shift){const p=NASTJA_POSEN[name],st=p.box==='stange';
  return pixSprite(nastjaPose(p),st?NASTJA_STANGE_BOX:NASTJA_LOUNGE_BOX,st?500+NASTJA_UP:500,{...NASTJA_NEU_PIX,floor:0,shift})}
// Bodenverschiebung des Hauptsprites messen (unterste Zeile ohne Verschiebung)
function nastjaShift(){return pixSprite(NASTJA_NEU,NASTJA_NEU_BOX,0,{...NASTJA_NEU_PIX,floor:0}).then(u=>new Promise(r=>{const im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d');g.drawImage(im,0,0);
  const d=g.getImageData(0,0,c.width,c.height).data;let m=-1;for(let y=c.height-1;y>=0&&m<0;y--)for(let x=0;x<c.width;x++)if(d[(y*c.width+x)*4+3]){m=y;break}r(c.height-1-m)};im.src=u}))}
