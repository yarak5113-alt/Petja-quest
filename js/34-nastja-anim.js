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
// Sitzendes Bein (auf dem Schoß, Oberschenkel zeigen zum Betrachter): Hüfte -> Knie -> Unterschenkel-Ansatz, ohne Schuh
function nSitLeg(h,k,a,o={}){const top=nPt(h,k,.36);let s=nLimb([h,k,a],[8.6,7,5],N_ST)+nLimb([h,nPt(h,k,.2),top],[8.8,8,7.2],N_SK)+nLimb([top,nPt(h,k,.42)],[7.6,7.2],N_BK);
  const band=nPt(h,k,.38),dx=k[0]-h[0],dy=k[1]-h[1],l=Math.hypot(dx,dy),nx=-dy/l*4.5,ny=dx/l*4.5;
  const st=(o.from||[]).map((q,i)=>{const e=[band[0]+(i?nx:-nx),band[1]+(i?ny:-ny)];return`M${q[0].toFixed(2)},${q[1].toFixed(2)}L${e[0].toFixed(2)},${e[1].toFixed(2)}`}).join('');
  return{leg:s,strap:st?`<path d="${st}" fill="none" stroke-width="1.3"/>`:''}}
// Arm: Schulter -> Ellbogen -> Handgelenk. o.grip: Faust um die Stange, o.glass: Glas Rotwein in der Hand
function nArm(s,e,w,o={}){let r=nLimb([s,e,w],[3.6,2.9,2.3],N_SK)+`<circle cx="${s[0]}" cy="${s[1]}" r="3.4" fill="${N_SK}" stroke="none"/>`;const[x,y]=w;
  if(o.grip)r+=`<path d="M${x-4.6},${y-1}C${x-4.8},${y-5.2} ${x+4.8},${y-5.2} ${x+4.6},${y-1}C${x+4.8},${y+3.6} ${x-4.8},${y+3.6} ${x-4.6},${y-1}Z" fill="${N_SK}"/><path d="M${x-3.2},${y-2.6}L${x+3.2},${y-2.6}M${x-3.4},${y-0.2}L${x+3.4},${y-0.2}M${x-3},${y+2}L${x+3},${y+2}" fill="none" stroke-width=".8"/>`;
  else r+=`<path d="M${x-3.2},${y-1}C${x-3.4},${y-4.4} ${x+3.4},${y-4.4} ${x+3.2},${y-1}C${x+3.4},${y+3.4} ${x-3.4},${y+3.4} ${x-3.2},${y-1}Z" fill="${N_SK}"/>`;
  if(o.glass)r+=`<path d="M${x-1},${y-3}L${x-1},${y-9}M${x-4.5},${y+3.4}L${x+2.5},${y+3.4}" fill="none" stroke="#f0eeea" stroke-width="1.7"/><path d="M${x-5.5},${y-17}L${x+3.5},${y-17}C${x+3.5},${y-11} ${x+1.5},${y-9} ${x-1},${y-9}C${x-3.5},${y-9} ${x-5.5},${y-11} ${x-5.5},${y-17}Z" fill="#f0eeea"/><path d="M${x-5},${y-14}L${x+3},${y-14}C${x+2.6},${y-11} ${x+1},${y-10} ${x-1},${y-10}C${x-3},${y-10} ${x-4.6},${y-11} ${x-5},${y-14}Z" fill="#712834" stroke="none"/>`;
  if(o.finger){const[fx,fy]=o.finger;r+=nLimb([[x,y-1],[x+fx*.6,y-1+fy*.6],[x+fx,y-1+fy]],[1.4,1.2,1],N_SK)}
  if(o.heart){const[hx,hy]=o.heart;r+=`<path d="M${hx},${hy+4}C${hx-7},${hy-1} ${hx-4},${hy-7} ${hx},${hy-3}C${hx+4},${hy-7} ${hx+7},${hy-1} ${hx},${hy+4}Z" fill="#a82034" stroke-width=".9"/>`}
  return r}
// Federwedel im Strumpfband (Stange: Hände frei)
function nWedel(x,y){let fe='';for(let i=0;i<7;i++){const a=(-140+i*17)*Math.PI/180,L=11+(i%3)*2,cx=x,cy=y-16,ex=cx+Math.cos(a)*L,ey=cy+Math.sin(a)*L,nx=-Math.sin(a)*3,ny=Math.cos(a)*3;
    fe+=`<path d="M${cx},${cy}C${(cx+ex)/2+nx},${(cy+ey)/2+ny} ${ex+nx*.4},${ey+ny*.4} ${ex},${ey}C${ex-nx*.4},${ey-ny*.4} ${(cx+ex)/2-nx},${(cy+ey)/2-ny} ${cx},${cy}Z" fill="${i%3==1?'#d8d4cf':'#f6f3ee'}"/>`}
  return`<path d="M${x},${y+4}L${x},${y-16}" fill="none" stroke="${N_BK}" stroke-width="2.6"/>`+fe}
// Mund pro Pose (liegt unter dem pixelgenau übernommenen Augenbereich): grins = freches schiefes Grinsen mit Zähnen, kuss = Kussmund
const N_MUND={
  grins:`<path d="M-5.6,-216.2C-3,-217 3,-218.4 6.4,-218.8C5.2,-213.4 -2.6,-212.6 -5.6,-216.2Z" fill="#a82034" stroke-width=".9"/><path d="M-4.2,-216.1C-1,-216.8 2.6,-217.8 5.3,-218.2L4.8,-216.8C2,-216.4 -1.2,-215.8 -3.9,-215.4Z" fill="#f6f3ee" stroke="none"/><path d="M6.4,-218.8L7.8,-220.4M-5.6,-216.2L-6.4,-216" fill="none" stroke-width="1"/>`,
  fluester:`<ellipse cx="1.6" cy="-215.3" rx="2.3" ry="1.5" fill="#a82034" stroke-width=".9"/><path d="M3.9,-215.6L5,-216.6" fill="none" stroke-width=".8"/>`,
  zitter:`<path d="M-4.6,-214.4C-3,-216 -1.5,-214.6 0,-216C1.5,-214.6 3,-216 4.6,-214.4C3.4,-211.8 -3.4,-211.8 -4.6,-214.4Z" fill="#712834" stroke-width=".9"/><path d="M-3.2,-214.6C-1.6,-215.4 1.6,-215.4 3.2,-214.6" fill="none" stroke="#f6f3ee" stroke-width=".8"/>`,
  kuss:`<ellipse cx="0.4" cy="-215.6" rx="2.7" ry="2.3" fill="#a82034" stroke-width=".9"/><ellipse cx="0.4" cy="-215.5" rx="0.9" ry="0.8" fill="#712834" stroke="none"/>`};
const nFace=m=>m?NASTJA_PARTS.face.replace(/<path d="M-4\.6,-215\.4[\s\S]*$/,"")+N_MUND[m]:NASTJA_PARTS.face;
// Pose zusammensetzen. p.bx/p.by: Körperversatz in PIXELN (ganzzahlig -> Gesicht passt 1:1), p.hair: Haarschwung (Einheiten)
// p.legs(B) -> [{leg,strap}...] in Zeichenreihenfolge, p.armsBack(B)/p.armsFront(B), p.wedel: Federwedel im Strumpfband
function nastjaPose(p){const bx=(p.bx||0)/NASTJA_PX,by=(p.by||0)/NASTJA_PX,T=(dx,dy)=>`<g transform="translate(${(bx+dx).toFixed(3)},${(by+dy).toFixed(3)})">`,P=NASTJA_PARTS,B=([x,y])=>[x+bx,y+by];
  const legs=p.legs(B);
  return P.open+T(p.hair||0,0)+P.hairBack+'</g>'+legs.map(l=>l.leg).join('')+T(0,0)+P.hips+'</g>'+legs.map(l=>l.strap).join('')+(p.wedel?nWedel(bx+21,by-112):'')+
    (p.armsBack?p.armsBack(B):'')+T(0,0)+P.torso+P.corset+P.head+nFace(p.mouth)+P.hairFront+P.acc+'</g>'+(p.armsFront?p.armsFront(B):'')+'</g>'}
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
    armsFront:B=>nArm(B([17,-195]),B([29,-178]),B([21,-200]))+nArm(B([-17,-195]),B([-23,-164]),B([-20,-136]),{glass:1})},
  // ---- Privattanz in der Lounge: frech und offensiv (Gesicht/Augen identisch, nur der Mund wechselt) ----
  // T1: Heranwinken – Hüfte raus, eine Hand in der Hüfte, die andere winkt mit dem Zeigefinger, schiefes Grinsen
  tanz1:{box:'lounge',bx:4,by:0,hair:1,mouth:'grins',brow:2,
    legs:B=>[nLeg(B([9,-134]),[3,-72],[11,-20],{...RF(B),rot:-12}),nLeg(B([-9,-134]),B([-10,-68]),B([-12,-20]),LF(B))],
    armsFront:B=>nArm(B([-17,-195]),B([-31,-168]),B([-18,-142]))+nArm(B([17,-195]),B([31,-186]),B([26,-210]),{finger:[-3,-7]})},
  // T2: Hüftkreis links – Hüfte weit raus, Hand hinterm Kopf, die andere streicht über den Oberschenkel
  tanz2:{box:'lounge',bx:-8,by:2,hair:-2,mouth:'grins',
    legs:B=>[nLeg(B([9,-134]),[8,-72],[13,-20],RF(B)),nLeg(B([-9,-134]),[-17,-70],[-13,-20],LF(B))],
    armsBack:B=>nArm(B([17,-195]),B([30,-226]),B([9,-242])),
    armsFront:B=>nArm(B([-17,-195]),B([-31,-160]),B([-17,-110]))},
  // T3: lehnt sich über den Gast – eine Hand stützt sich auf seiner Schulter ab (rechts unten aus dem Bild), die andere hakt den Finger in den Choker
  //     Hüfte zur Seite gekippt, ein Knie locker eingedreht; freches Grinsen + extra hochgezogene Braue (brow: px nach oben)
  tanz3:{box:'lounge',bx:6,by:4,hair:2,mouth:'grins',brow:3,
    legs:B=>[nLeg(B([-9,-134]),[-4,-72],[-10,-20],{...LF(B),rot:8}),nLeg(B([9,-134]),B([14,-70]),B([15,-20]),RF(B))],
    armsFront:B=>nArm(B([17,-195]),B([37,-180]),[55,-168],{grip:1})+nArm(B([-17,-195]),B([-30,-182]),B([-6,-203]),{finger:[4,-2]})},
  // T4: Hüftkreis rechts – Gegenbewegung zu T2
  tanz4:{box:'lounge',bx:8,by:2,hair:2,mouth:'grins',
    legs:B=>[nLeg(B([-9,-134]),[-8,-72],[-13,-20],LF(B)),nLeg(B([9,-134]),[17,-70],[13,-20],RF(B))],
    armsBack:B=>nArm(B([-17,-195]),B([-30,-226]),B([-9,-242])),
    armsFront:B=>nArm(B([17,-195]),B([31,-160]),B([17,-110]))},
  // T5: Kussmund – Fingerspitzen an den Lippen, Knie eingedreht, andere Hand in der Hüfte
  tanz5:{box:'lounge',bx:0,by:0,hair:0,mouth:'kuss',
    legs:B=>[nLeg(B([9,-134]),[10,-68],[12,-20],RF(B)),nLeg(B([-9,-134]),[2,-74],[-9,-20],{...LF(B),rot:10})],
    armsFront:B=>nArm(B([17,-195]),B([31,-168]),B([18,-142]))+nArm(B([-17,-195]),B([-28,-186]),B([-9,-211]),{finger:[1,-6]})},
  // T6: Kuss zuwerfen – Arm schnellt zum Gast, Herzchen fliegt, Hüfte raus
  tanz6:{box:'lounge',bx:-4,by:0,hair:-1,mouth:'kuss',
    legs:B=>[nLeg(B([9,-134]),[12,-70],[12,-20],RF(B)),nLeg(B([-9,-134]),[-13,-70],[-14,-20],LF(B))],
    armsFront:B=>nArm(B([17,-195]),B([31,-168]),B([18,-142]))+nArm(B([-17,-195]),B([-38,-204]),B([-50,-222]),{finger:[-5,-3],heart:[-62,-236]})},
  // T7: spielt mit den Haaren – Hand fährt seitlich durchs Haar, die andere gleitet die Hüfte entlang, Hüfte kreist raus; Grinsen + Braue
  tanz7:{box:'lounge',bx:-6,by:2,hair:-3,mouth:'grins',brow:3,
    legs:B=>[nLeg(B([9,-134]),[6,-72],[12,-20],{...RF(B),rot:-8}),nLeg(B([-9,-134]),[-15,-70],[-13,-20],LF(B))],
    armsFront:B=>nArm(B([-17,-195]),B([-37,-200]),B([-21,-225]))+nArm(B([17,-195]),B([30,-166]),B([21,-132]))},
  // ---- Ich-Sicht: auf dem Schoß (Oberschenkel kommen breitbeinig auf den Betrachter zu, Hände auf seinen Schultern) ----
  // S1 sitzt: beide Hände auf seinen Schultern, freches Grinsen, Braue hoch
  sitz:{box:'lounge',bx:0,by:0,hair:0,mouth:'grins',brow:3,legs:B=>[nSitLeg(B([-9,-134]),[-44,-114],[-45,-92],LF(B)),nSitLeg(B([9,-134]),[44,-114],[45,-92],RF(B))],
    armsFront:B=>nArm(B([-17,-195]),B([-37,-184]),[-56,-170],{grip:1})+nArm(B([17,-195]),B([37,-184]),[56,-170],{grip:1})},
  // S2 flüstert ins Ohr: Hand am Mund, andere Hand auf der Schulter, Lippen gespitzt
  fluester:{box:'lounge',bx:0,by:0,hair:2,mouth:'fluester',brow:3,legs:B=>[nSitLeg(B([-9,-134]),[-44,-114],[-45,-92],LF(B)),nSitLeg(B([9,-134]),[44,-114],[45,-92],RF(B))],
    armsFront:B=>nArm(B([17,-195]),B([37,-184]),[56,-170],{grip:1})+nArm(B([-17,-195]),B([-33,-190]),B([-10,-214]),{finger:[1,-5]})},
  // S3 die Zwiebel wirkt: zitternde Unterlippe, eine Hand an der Brust, die andere krallt sich an seiner Schulter fest (Tränen malt die Ich-Sicht dazu)
  weinen:{box:'lounge',bx:0,by:0,hair:0,mouth:'zitter',legs:B=>[nSitLeg(B([-9,-134]),[-44,-114],[-45,-92],LF(B)),nSitLeg(B([9,-134]),[44,-114],[45,-92],RF(B))],
    armsFront:B=>nArm(B([17,-195]),B([37,-184]),[56,-170],{grip:1})+nArm(B([-17,-195]),B([-30,-180]),B([-7,-196]))}};
// Rendern: shift = Bodenverschiebung des Hauptsprites (px), damit alle Frames deckungsgleich mit dem Hauptsprite liegen
function nastjaFrame(name,shift){const p=NASTJA_POSEN[name],st=p.box==='stange';
  return pixSprite(nastjaPose(p),st?NASTJA_STANGE_BOX:NASTJA_LOUNGE_BOX,st?500+NASTJA_UP:500,{...NASTJA_NEU_PIX,floor:0,shift})}
// Bodenverschiebung des Hauptsprites messen (unterste Zeile ohne Verschiebung)
function nastjaShift(){return pixSprite(NASTJA_NEU,NASTJA_NEU_BOX,0,{...NASTJA_NEU_PIX,floor:0}).then(u=>new Promise(r=>{const im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d');g.drawImage(im,0,0);
  const d=g.getImageData(0,0,c.width,c.height).data;let m=-1;for(let y=c.height-1;y>=0&&m<0;y--)for(let x=0;x<c.width;x++)if(d[(y*c.width+x)*4+3]){m=y;break}r(c.height-1-m)};im.src=u}))}
