// ================= Nastja: Animations-Frames (Stange) =================
// Baut Posen aus den Teilen der Hauptzeichnung (NASTJA_NEU, 32-nastja-neu.js): Kopf, Korsett, Haare, Accessoires bleiben dieselben Pfade,
// Arme und Beine werden pro Pose neu als Gliedmaßen gezogen. Gerendert wie das Hauptsprite (feste Palette, 500 px, Federkontur).
// Das Gesicht wird danach pixelgenau aus pixel/nastja.json übernommen (tools/nastja-frames.js) – es ist in allen Frames identisch.
// Koordinaten: x=0 ist die Stange (die Figur steht rechts daneben), Füße auf y=0.
const NASTJA_ANIM_BOX=[-74,-270,154,274];          // gleicher linker Rand wie das Hauptsprite, rechts Platz für die versetzte Figur
const NASTJA_PX=500/274;                           // Pixel pro Einheit
const NASTJA_BX=37/NASTJA_PX;                      // Körper 37 px rechts der Stange (ganzzahlig, damit das Gesicht 1:1 passt)
const NASTJA_PARTS=(()=>{const p=NASTJA_NEU.split(/<!-- [^>]*-->/);
  return{open:p[0],hairBack:p[1],legs:p[2],hips:p[3],straps:p[4],torso:p[5],armR:p[6],armL:p[7],corset:p[8],head:p[9],face:p[10],hairFront:p[11],acc:p[12].replace('</g>','')}})();
// Gliedmaße als geschlossene Kontur um eine Mittellinie (Punkte + halbe Breiten), weich über Mittelpunkte gerundet
function nLimb(pts,wid,fill){const L=[],R=[];pts.forEach((p,i)=>{const a=pts[Math.max(0,i-1)],b=pts[Math.min(pts.length-1,i+1)],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1,nx=-dy/l,ny=dx/l,w=wid[i];
    L.push([p[0]+nx*w,p[1]+ny*w]);R.push([p[0]-nx*w,p[1]-ny*w])});
  const f=q=>q[0].toFixed(2)+','+q[1].toFixed(2),mid=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2],side=s=>{let d='';for(let i=1;i<s.length-1;i++)d+=`Q${f(s[i])} ${f(mid(s[i],s[i+1]))} `;return d+`L${f(s[s.length-1])} `};
  const Rr=R.slice().reverse();return`<path d="M${f(L[0])} ${side(L)}L${f(Rr[0])} ${side(Rr)}Z" fill="${fill}"/>`}
const nPt=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
// Bein: Hüfte -> Knie -> Knöchel; Strumpf mit Abschlussband, Plateauschuh (stehend oder auf der Spitze)
function nLeg(h,k,a,o={}){const SK='#f0d0af',ST='#4a4844',BK='#343238',top=nPt(h,k,.36),band=nPt(h,k,.38);let s=nLimb([h,k,a],[8.4,4.4,3.2],ST);
  s+=nLimb([h,nPt(h,k,.2),top],[8.6,7.6,6.9],SK)+nLimb([top,nPt(h,k,.42)],[7.2,6.8],BK);
  const rot=o.tip?(o.tip>0?-12:12):0;s+=`<g transform="translate(${a[0]},${a[1]+20}) rotate(${rot})"><path d="M-3.5,-23C-8,-19 -10,-14 -10,-10L7.5,-10C7.5,-14 6.5,-19 4,-23Z" fill="${BK}"/><path d="M-11,-10.5L8.2,-10.5L8.2,0L-11,0Z" fill="#2c2c32"/><path d="M-7,-17C-5,-19.5 -1,-20 2,-19.5M-9,-6L6,-6" fill="none" stroke="#5a5a60" stroke-width="1.8"/><path d="M-3.6,-22.5L4.2,-22.5" fill="none" stroke-width="1.4"/></g>`;
  // Strapse: vom Korsettrand (o.from = 2 Punkte) zum Strumpfband
  const dx=k[0]-h[0],dy=k[1]-h[1],l=Math.hypot(dx,dy),nx=-dy/l*4.5,ny=dx/l*4.5;const st=(o.from||[]).map((q,i)=>{const e=[band[0]+(i?nx:-nx),band[1]+(i?ny:-ny)];return`M${q[0].toFixed(2)},${q[1].toFixed(2)}L${e[0].toFixed(2)},${e[1].toFixed(2)}`}).join('');
  return{leg:s,strap:st?`<path d="${st}" fill="none" stroke-width="1.3"/>`:''}}
// Arm: Schulter -> Ellbogen -> Handgelenk; Hand als Faust um die Stange (grip) oder locker
function nArm(s,e,w,o={}){const SK='#f0d0af';let r=nLimb([s,e,w],[3.6,2.9,2.3],SK)+`<circle cx="${s[0]}" cy="${s[1]}" r="3.4" fill="${SK}" stroke="none"/>`;const[x,y]=w;
  if(o.grip)r+=`<path d="M${x-4.2},${y-1}C${x-4.4},${y-5} ${x+4.4},${y-5} ${x+4.2},${y-1}C${x+4.4},${y+3.5} ${x-4.4},${y+3.5} ${x-4.2},${y-1}Z" fill="${SK}"/><path d="M${x-3},${y-2.6}L${x+3},${y-2.6}M${x-3.2},${y-0.2}L${x+3.2},${y-0.2}M${x-2.8},${y+2}L${x+2.8},${y+2}" fill="none" stroke-width=".8"/>`;
  return r}
// Federwedel im Strumpfband (Hände frei)
function nWedel(x,y){let fe='';for(let i=0;i<7;i++){const a=(-140+i*17)*Math.PI/180,L=11+(i%3)*2,cx=x,cy=y-16,ex=cx+Math.cos(a)*L,ey=cy+Math.sin(a)*L,nx=-Math.sin(a)*3,ny=Math.cos(a)*3;
    fe+=`<path d="M${cx},${cy}C${(cx+ex)/2+nx},${(cy+ey)/2+ny} ${ex+nx*.4},${ey+ny*.4} ${ex},${ey}C${ex-nx*.4},${ey-ny*.4} ${(cx+ex)/2-nx},${(cy+ey)/2-ny} ${cx},${cy}Z" fill="${i%3==1?'#d8d4cf':'#f6f3ee'}"/>`}
  return`<path d="M${x},${y+4}L${x},${y-16}" fill="none" stroke="#343238" stroke-width="2.6"/>`+fe}
// Pose zusammensetzen. p: {by: Absinken in Einheiten, hair: Haarschwung x, legs(B), arms(B)} – B = Körperversatz-Funktion
function nastjaPose(p){const bx=NASTJA_BX,by=p.by||0,T=(dx,dy)=>`<g transform="translate(${bx+dx},${by+dy})">`,P=NASTJA_PARTS,B=([x,y])=>[x+bx,y+by];
  const lb=p.legsBack(B),lf=p.legsFront(B);
  return P.open+T(p.hair||0,0)+P.hairBack+'</g>'+(p.frontFirst?lf.leg+lb.leg:lb.leg+lf.leg)+T(0,0)+P.hips+'</g>'+lb.strap+lf.strap+nWedel(bx+21,by-112)+
    p.arms(B)+T(0,0)+P.torso+P.corset+P.head+P.face+P.hairFront+P.acc+'</g>'+p.armsFront(B)+'</g>'}
const NASTJA_POSEN={
  // A1 Halten: linke Hand oben an der Stange, rechte quer über die Taille auf Hüfthöhe an der Stange; Standbein rechts, Spielbein auf der Spitze gekreuzt
  stange1:{by:0,hair:0,
    legsBack:B=>nLeg(B([9,-134]),B([9.5,-68]),B([8,-20]),{from:[B([10,-141]),B([17,-140])]}),
    legsFront:B=>nLeg(B([-9,-134]),B([2,-70]),B([17,-25]),{from:[B([-10,-141]),B([-17,-140])],tip:1}),
    arms:B=>nArm(B([-17,-195]),[-8,-224],[0,-244],{grip:1}),
    armsFront:B=>nArm(B([17,-195]),B([22,-164]),[1,-150],{grip:1})},
  // A1b Zwischenbild (halbe Bewegung)
  stange2:{by:4*274/500,hair:1.2,frontFirst:1,
    legsBack:B=>nLeg(B([9,-134]),B([12,-70]),[8+NASTJA_BX,-20],{from:[B([10,-141]),B([17,-140])]}),
    legsFront:B=>nLeg(B([-9,-134]),[1,-76],B([8,-38]),{from:[B([-10,-141]),B([-17,-140])],tip:1}),
    arms:B=>nArm(B([-17,-195]),[-8.5,-221],[0,-240],{grip:1}),
    armsFront:B=>nArm(B([17,-195]),B([22,-163]),[1,-147],{grip:1})},
  // A2 Gleiten: 8 px tiefer, Knie gebeugt, Spielbein hakt mit dem Knie um die Stange, obere Hand 10 Einheiten tiefer
  stange3:{by:8*274/500,hair:2.6,frontFirst:1,
    legsBack:B=>nLeg(B([9,-134]),B([14,-72]),[8+NASTJA_BX,-20],{from:[B([10,-141]),B([17,-140])]}),
    legsFront:B=>nLeg(B([-9,-134]),[1,-82],B([10,-52]),{from:[B([-10,-141]),B([-17,-140])],tip:-1}),
    arms:B=>nArm(B([-17,-195]),[-9,-218],[0,-234],{grip:1}),
    armsFront:B=>nArm(B([17,-195]),B([22,-162]),[1,-144],{grip:1})}};
function nastjaFrame(name){return pixSprite(nastjaPose(NASTJA_POSEN[name]),NASTJA_ANIM_BOX,0,NASTJA_NEU_PIX)}
