// ================= Taschen als Bündel (Узелок) und gemalte Karte =================
// Taschen (I): Petjas aufgeknotetes rotes Tupfentuch mit Folklore-Bordüre – die Sachen liegen darauf.
//   Oben zwei bestickte Knöpfe: Untersuchen (Lupe) / Kombinieren (Knoten). Unten: Name und Petjas Kommentar.
// Karte (M): von Hand gemalt im Märchenbuch-Stil (Pergament, Wälder, See, Sumpf, Dörfer …), Feldwege statt Strichen,
//   Unerkundetes liegt im Nebel. Klick auf einen besuchten Ort = Schnellreise (ab 5 Orten, wie bisher).

// ---------- kleine Malhelfer ----------
const _rnd=s=>{let v=s;return()=>(v=(v*16807)%2147483647)/2147483647};
const _blob=(x,cx,cy,rx,ry,col,r,n=14)=>{x.fillStyle=col;x.beginPath();for(let i=0;i<=n;i++){const a=i/n*Math.PI*2,k=.82+r()*.3,px=cx+Math.cos(a)*rx*k,py=cy+Math.sin(a)*ry*k;i?x.lineTo(px,py):x.moveTo(px,py)}x.closePath();x.fill()};
const _glow=(x,cx,cy,r,col,a)=>{const g=x.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,`rgba(${col},${a})`);g.addColorStop(1,`rgba(${col},0)`);x.fillStyle=g;x.fillRect(cx-r,cy-r,r*2,r*2)};

// ================= 1) Bündel =================
let BUENDEL_BG=null;
function buendelBild(){if(BUENDEL_BG)return BUENDEL_BG;const c=document.createElement('canvas'),Wb=900,Hb=560;c.width=Wb;c.height=Hb;const x=c.getContext('2d'),r=_rnd(7);
  // Holzboden darunter
  x.fillStyle='#2a1a10';x.fillRect(0,0,Wb,Hb);for(let y=0;y<Hb;y+=46){x.fillStyle=y/46%2?'#2f1e12':'#26170d';x.fillRect(0,y,Wb,44);x.fillStyle='rgba(0,0,0,.35)';x.fillRect(0,y+44,Wb,2);
    for(let i=0;i<8;i++){x.strokeStyle='rgba(70,44,24,.35)';x.lineWidth=1;x.beginPath();const yy=y+6+r()*32;x.moveTo(0,yy);x.bezierCurveTo(300,yy+r()*8-4,600,yy+r()*8-4,Wb,yy);x.stroke()}}
  // Tuch: leicht unregelmäßiges Viereck mit vier Knoten-Zipfeln
  const P=[[70,58],[Wb-62,48],[Wb-50,Hb-60],[58,Hb-50]];
  x.save();x.shadowColor='rgba(0,0,0,.6)';x.shadowBlur=26;x.shadowOffsetY=10;x.fillStyle='#a3191f';x.beginPath();P.forEach(([a,b],i)=>i?x.lineTo(a,b):x.moveTo(a,b));x.closePath();x.fill();x.restore();
  x.save();x.beginPath();P.forEach(([a,b],i)=>i?x.lineTo(a,b):x.moveTo(a,b));x.closePath();x.clip();
  const g=x.createRadialGradient(Wb/2,Hb/2,60,Wb/2,Hb/2,520);g.addColorStop(0,'#c62a2f');g.addColorStop(.7,'#9e171d');g.addColorStop(1,'#6e0d12');x.fillStyle=g;x.fillRect(0,0,Wb,Hb);
  // Falten
  for(let i=0;i<9;i++){const x0=r()*Wb,y0=r()*Hb,a=r()*Math.PI;x.strokeStyle='rgba(60,0,6,.22)';x.lineWidth=10+r()*16;x.lineCap='round';x.beginPath();x.moveTo(x0,y0);x.quadraticCurveTo(x0+Math.cos(a)*120,y0+Math.sin(a)*60,x0+Math.cos(a)*240,y0+Math.sin(a)*40);x.stroke();
    x.strokeStyle='rgba(255,140,140,.10)';x.lineWidth=4;x.stroke()}
  // weiße Tupfen
  for(let yy=40;yy<Hb;yy+=34)for(let xx=(yy/34%2)*17+30;xx<Wb;xx+=34){x.fillStyle='rgba(250,240,225,.85)';x.beginPath();x.arc(xx+r()*2,yy+r()*2,4.2,0,7);x.fill()}
  // Bordüre: gelb-grünes Blütenband
  const band=(ax,ay,bx,by)=>{const L=Math.hypot(bx-ax,by-ay),n=Math.floor(L/38);x.save();x.translate(ax,ay);x.rotate(Math.atan2(by-ay,bx-ax));
    x.fillStyle='#1d0f0a';x.fillRect(0,-4,L,44);x.fillStyle='#e8b12a';x.fillRect(0,-4,L,5);x.fillRect(0,35,L,5);
    for(let i=0;i<n;i++){const cx=19+i*38,cy=18;x.fillStyle='#2f7d3a';x.beginPath();x.ellipse(cx-9,cy,7,3.4,.5,0,7);x.ellipse(cx+9,cy,7,3.4,-.5,0,7);x.fill();
      x.fillStyle=i%2?'#e8b12a':'#d23a3a';for(let k=0;k<5;k++){const a=k/5*Math.PI*2;x.beginPath();x.arc(cx+Math.cos(a)*5.5,cy+Math.sin(a)*5.5,3.6,0,7);x.fill()}x.fillStyle='#f6e6c0';x.beginPath();x.arc(cx,cy,2.6,0,7);x.fill()}x.restore()};
  band(P[0][0],P[0][1]+4,P[1][0],P[1][1]+4);band(P[1][0]-4,P[1][1],P[2][0]-4,P[2][1]);band(P[2][0],P[2][1]-4,P[3][0],P[3][1]-4);band(P[3][0]+4,P[3][1],P[0][0]+4,P[0][1]);
  // Fransen-Schatten innen
  const v=x.createRadialGradient(Wb/2,Hb/2,200,Wb/2,Hb/2,520);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(30,0,0,.45)');x.fillStyle=v;x.fillRect(0,0,Wb,Hb);x.restore();
  // Knoten-Zipfel an den Ecken
  P.forEach(([a,b],i)=>{const dx=a<Wb/2?-1:1,dy=b<Hb/2?-1:1;x.save();x.translate(a,b);x.fillStyle='#8e141a';x.strokeStyle='#4a070b';x.lineWidth=2;
    x.beginPath();x.moveTo(0,0);x.quadraticCurveTo(dx*40,dy*6,dx*58,dy*30);x.quadraticCurveTo(dx*30,dy*30,dx*8,dy*46);x.quadraticCurveTo(dx*2,dy*20,0,0);x.fill();x.stroke();
    x.fillStyle='#b8222a';x.beginPath();x.ellipse(dx*12,dy*12,15,12,0,0,7);x.fill();x.stroke();x.fillStyle='rgba(250,240,225,.8)';x.beginPath();x.arc(dx*30,dy*22,3.5,0,7);x.fill();x.restore()});
  BUENDEL_BG=c.toDataURL('image/jpeg',.9);return BUENDEL_BG}
let BMODUS='look',BSEL=null;
function buendelHTML(){return`<div class="buendel" style="background-image:url(${buendelBild()})">
  <div class="bknoepfe"><button class="bk ${BMODUS=='look'?'on':''}" data-m="look" title="Untersuchen">${ic('spot')}<span>Untersuchen</span></button>
    <div class="bkmitte">Petjas Bündel</div>
    <button class="bk ${BMODUS=='kombi'?'on':''}" data-m="kombi" title="Kombinieren">${ic('hand')}<span>Kombinieren</span></button></div>
  <div class="bsachen">${inv.length?inv.map(id=>`<button class="bsache" data-i="${id}" title="${(ITEMS[id]||['',id])[1]}">${IMG(id)}</button>`).join(''):'<p class="bleer">Leer. Wie mein Kühlschrank.</p>'}</div>
  <div class="bzeile"><b></b><span>${BMODUS=='kombi'?'Erst einen Gegenstand, dann einen zweiten anklicken.':'Klick auf einen Gegenstand: ansehen.'}</span></div></div>`}
function buendelVerdrahten(o){const B=o.querySelector('.buendel');if(!B)return;const zeile=B.querySelector('.bzeile');
  const zeig=(id,txt)=>{zeile.querySelector('b').textContent=ITEMS[id]?ITEMS[id][1]+':':'';zeile.querySelector('span').textContent=txt};
  B.querySelectorAll('.bk').forEach(b=>b.onclick=()=>{BMODUS=b.dataset.m;BSEL=null;openBook('tasche')});
  B.querySelectorAll('.bsache').forEach(b=>{const id=b.dataset.i;
    b.onmouseenter=()=>{if(!BSEL)zeig(id,BMODUS=='kombi'?'… und womit?':(ITEMS[id]||['','',''])[2])};
    b.onclick=()=>{if(BMODUS=='look'){B.querySelectorAll('.bsache').forEach(k=>k.classList.toggle('sel',k===b));zeig(id,UNTERSUCHEN[id]||(ITEMS[id]||['','',''])[2]);return}
      if(!BSEL||BSEL===id){BSEL=BSEL===id?null:id;B.querySelectorAll('.bsache').forEach(k=>k.classList.toggle('sel',k.dataset.i===BSEL));if(BSEL)zeig(id,'… und womit?');return}
      const a=BSEL;BSEL=null;closeO();setTimeout(()=>kombiniere(a,id),60)}})}

// ================= 2) Gemalte Karte: ein Ölbild im Goldrahmen =================
// Die Landschaft in Vogelperspektive, gemalt aus tausenden Pinseltupfern: Himmel und blaue Berge hinten, vorn der Birkenwald.
// Die Lage ist logisch (eigene Koordinaten, nicht das alte Raster MAPN): das Dorf mit Kirche und Schmiede im Norden,
// die Mühle steht am Bach (mit Brücke), Irrwald und Banja im Westen, Sumpf, See und Gnome im Osten, die Höhle im Fels.
// Was zusammengehört, ist EIN Ort: Hütte + Hütte innen, Banja + Bühne + Lounge + Hinterhof, Ufer + Unter dem Pier.
// Brücken entstehen von selbst dort, wo ein Weg Wasser kreuzt.
const KW=1000,KH=620,KR=26,KQ=2;   // Leinwand, Rahmenbreite, Auflösungsfaktor (doppelt, damit die Karte beim Hineinzoomen scharf bleibt)
// Zeichenfläche in KQ-facher Auflösung: jede gesetzte Transformation wird mit KQ multipliziert, gezeichnet wird weiter in Kartenkoordinaten
const kHiRes=(cv,x)=>{cv.width=KW*KQ;cv.height=KH*KQ;const st=x.setTransform.bind(x);x.setTransform=(a,b,c2,d,e,f)=>st(a*KQ,b*KQ,c2*KQ,d*KQ,e*KQ,f*KQ);x.setTransform(1,0,0,1,0,0);return x};
const KORT=[   // Kartenort: m = Schauplätze (der erste ist das Reiseziel), n = Name aus LOCN
  {k:'wald',m:['wald'],x:452,y:532},{k:'gabel',m:['gabel'],x:486,y:422},{k:'huette',m:['huette','innen'],x:376,y:326},
  {k:'dorf',m:['dorf'],x:468,y:216},{k:'dorfstr',m:['dorfstr'],x:574,y:190},{k:'kirche',m:['kirche'],x:668,y:152},{k:'schmiede',m:['schmiede'],x:612,y:266},
  {k:'muehle',m:['muehle'],x:318,y:200},{k:'irrwald',m:['irrwald'],x:184,y:252},{k:'banja',m:['banjaV','banja','banjaH','buehne','lounge'],x:102,y:366,n:'banja'},
  {k:'sperre',m:['sperre'],x:616,y:428},{k:'sumpf',m:['sumpf'],x:730,y:342},{k:'fischer',m:['fischer'],x:676,y:508},{k:'ufer',m:['ufer','unter'],x:820,y:468},
  {k:'gnome',m:['gnome'],x:924,y:400},{k:'garten',m:['garten'],x:866,y:322},{k:'hoehle',m:['hoehle'],x:930,y:216}];
const KG={};KORT.forEach(g=>g.m.forEach(id=>KG[id]=g));
const kSeen=g=>g.m.some(id=>seen[id]),kName=g=>LOCN[g.n||g.m[0]]||g.k;
// Wege zwischen Kartenorten (Wege innerhalb eines Ortes entfallen), jeder als gebogene Linie mit Stützpunkten
function kWege(){const s=new Set(),L=[];MAPE.forEach(([a,b])=>{const A=KG[a],B=KG[b];if(!A||!B||A===B)return;const k=[A.k,B.k].sort().join('|');if(s.has(k))return;s.add(k);
  let h=0;for(const ch of k)h=(h*31+ch.charCodeAt(0))|0;const len=Math.hypot(B.x-A.x,B.y-A.y),off=((h%100)/100-.5)*.22*len,
    mx=(A.x+B.x)/2+(A.y-B.y)/len*off,my=(A.y+B.y)/2+(B.x-A.x)/len*off,P=[];
  for(let i=0;i<=48;i++){const t=i/48,u=1-t;P.push([u*u*A.x+2*u*t*mx+t*t*B.x,u*u*A.y+2*u*t*my+t*t*B.y])}L.push({A,B,P})});return L}
// Catmull-Rom: weiche Linie durch Punkte
const kSpline=(Q,n=10)=>{const R=[];for(let i=0;i<Q.length-1;i++){const p0=Q[i-1]||Q[i],p1=Q[i],p2=Q[i+1],p3=Q[i+2]||p2;
  for(let j=0;j<n;j++){const t=j/n,t2=t*t,t3=t2*t,f=(a,b,c,d)=>.5*(2*b+(-a+c)*t+(2*a-5*b+4*c-d)*t2+(-a+3*b-3*c+d)*t3);R.push([f(p0[0],p1[0],p2[0],p3[0]),f(p0[1],p1[1],p2[1],p3[1])])}}
  R.push(Q[Q.length-1]);return R};
const kDist=(P,a,b)=>{let m=1e9;for(const[u,v]of P){const d=(u-a)*(u-a)+(v-b)*(v-b);if(d<m)m=d}return Math.sqrt(m)};
const kSchnitt=(p,q,r2,s2)=>{const d=(q[0]-p[0])*(s2[1]-r2[1])-(q[1]-p[1])*(s2[0]-r2[0]);if(!d)return null;
  const t=((r2[0]-p[0])*(s2[1]-r2[1])-(r2[1]-p[1])*(s2[0]-r2[0]))/d,u=((r2[0]-p[0])*(q[1]-p[1])-(r2[1]-p[1])*(q[0]-p[0]))/d;return t>=0&&t<=1&&u>=0&&u<=1?[p[0]+t*(q[0]-p[0]),p[1]+t*(q[1]-p[1]),Math.atan2(q[1]-p[1],q[0]-p[0])]:null};
// Gewässer und Fels (fest, damit Bäume und Häuser wissen, wo sie nicht stehen dürfen)
const KFLUSS=kSpline([[258,88],[280,138],[342,180],[350,214],[330,262],[282,302],[238,356],[214,420],[178,500],[152,560],[140,640]],12);
const KBACH=kSpline([[738,368],[750,402],[742,438],[756,470],[768,500]],10);
const KSEE=[870,568,192,82],inSee=(a,b,m=0)=>((a-KSEE[0])/(KSEE[2]+m))**2+((b-KSEE[1])/(KSEE[3]+m))**2<1;
const KTUEMPEL=[[716,352,40,13],[758,338,28,10],[742,372,22,8],[698,334,18,6],[776,356,14,5]];
const KFELS=[[812,282],[846,232],[884,190],[930,156],[1000,138],[1000,300],[962,268],[912,280],[870,296]];
const KDORF=[[432,200,1],[500,196,1],[526,172,.9],[552,230,1],[600,166,.9],[624,212,1],[418,244,1],[642,184,.85],[540,262,.9]];

let KARTE_BG=null,KARTE_L=null;
function karteBild(){const L0=typeof LANG=='string'?LANG:'de';if(KARTE_BG&&KARTE_L===L0)return KARTE_BG;
  const c=document.createElement("canvas"),x=kHiRes(c,c.getContext("2d")),r=_rnd(42),R=(a,b)=>a+r()*(b-a);
  const WEGE=kWege(),HOR=118;
  // Pinseltupfer: gedrehte Ellipse ohne save/restore (schnell genug für zehntausende)
  const dab=(a,b,l,w,ang,col)=>{const co=Math.cos(ang),si=Math.sin(ang);x.setTransform(co,si,-si,co,a,b);x.fillStyle=col;x.beginPath();x.ellipse(0,0,l,w,0,0,7);x.fill();x.setTransform(1,0,0,1,0,0)},
    reset=()=>x.setTransform(1,0,0,1,0,0),hsl=(h,s,l,a=1)=>`hsla(${h},${s}%,${l}%,${a})`,
    tiefe=b=>Math.max(0,Math.min(1,(b-HOR)/(KH-HOR))),   // 0 = am Horizont, 1 = ganz vorn
    sk=b=>.5+tiefe(b)*.75,                                // Maßstab nach Entfernung (Wege, Brücken)
    st=b=>.75+tiefe(b)*.75,sb=b=>1.15+tiefe(b)*.75;       // … für Bäume und Gebäude (größer, damit man sie erkennt)
  // ---------- Himmel ----------
  let g=x.createLinearGradient(0,0,0,HOR+20);g.addColorStop(0,'#7f9fb8');g.addColorStop(.55,'#c9d2c4');g.addColorStop(1,'#efdcae');x.fillStyle=g;x.fillRect(0,0,KW,HOR+30);
  _glow(x,170,40,260,'255,236,190',.55);   // Sonne links oben
  for(let i=0;i<9;i++){const a=R(60,960),b=R(34,82),n=18+r()*16;for(let k=0;k<n;k++)dab(a+R(-60,60),b+R(-10,8),R(10,26),R(4,8),R(-.15,.15),hsl(R(30,45),R(30,50),R(88,97),R(.25,.5)))}reset();
  // ---------- Berge in der Ferne (zwei Schichten, Luftperspektive) ----------
  const grat=(y0,amp,col,col2,seed)=>{const rr=_rnd(seed);x.fillStyle=col;x.beginPath();x.moveTo(0,HOR+30);let h=y0;
    for(let a=0;a<=KW;a+=10){h+=(rr()-.5)*amp;h=Math.max(y0-amp*2.2,Math.min(y0+amp,h));x.lineTo(a,h)}x.lineTo(KW,HOR+30);x.fill();
    for(let i=0;i<500;i++){const a=rr()*KW,b=y0-amp*2+rr()*(HOR+30-y0+amp*2);dab(a,b,R(4,12),R(1.5,3),R(-.6,.6),col2)}reset()};
  grat(84,9,'#8fa0b4','rgba(170,185,205,.25)',3);grat(100,7,'#7f9a8c','rgba(120,150,120,.25)',5);
  // ---------- Land: Grundton, nach vorn wärmer und satter ----------
  g=x.createLinearGradient(0,HOR-6,0,KH);g.addColorStop(0,'#a8b48a');g.addColorStop(.25,'#8fa65e');g.addColorStop(.7,'#7d9a46');g.addColorStop(1,'#6a8434');
  x.fillStyle=g;x.beginPath();x.moveTo(0,HOR+4);for(let a=0;a<=KW;a+=20)x.lineTo(a,HOR-2+Math.sin(a*.02)*4+r()*3);x.lineTo(KW,KH);x.lineTo(0,KH);x.fill();
  // große Farbflächen: sonnige gelbgrüne Wiesen, ockerfarbene trockene Stellen, kühle blaugrüne Senken
  for(let i=0;i<70;i++){const b=R(HOR+10,KH),t=tiefe(b),a=R(0,KW),k=r(),col=k<.4?hsl(R(58,72),R(45,60),R(55,64),.28):k<.65?hsl(R(36,46),R(40,55),R(52,60),.22):hsl(R(110,150),R(20,35),R(30,40),.25);
    for(let j=0;j<40;j++)dab(a+R(-60,60)*(.5+t),b+R(-16,16)*(.5+t),R(10,22)*(.5+t),R(4,8)*(.5+t),R(-.2,.2),col)}reset();
  for(let i=0;i<16000;i++){const b=R(HOR,KH),t=tiefe(b),a=R(0,KW);dab(a,b,R(2,5)+t*6,R(.8,1.6)+t*1.8,R(-.25,.25),hsl(R(62,100),R(25,48),R(30,52)+(1-t)*14,R(.18,.42)))}reset();
  // Lichtflecken (Wolkenschatten und Sonne auf der Wiese)
  for(let i=0;i<14;i++)_glow(x,R(0,KW),R(HOR+40,KH),R(60,140),r()<.5?'255,240,170':'40,60,20',R(.08,.16));
  // ---------- Felder ums Dorf: Streifen mit Pinselstrichen in Ackerrichtung ----------
  [[370,150,74,22,.12,40],[520,136,70,18,-.05,62],[702,214,62,24,.25,44],[650,118,90,14,0,70],[300,128,60,12,-.1,52]].forEach(([a,b,w,h,ang,hue])=>{
    for(let k=0;k<6;k++){const yy=b-h/2+k*h/6;for(let j=0;j<w/4;j++)dab(a-w/2+j*4+R(-2,2)+(yy-b)*Math.tan(ang),yy+R(-1,1),R(3,5),R(1,2.2),ang*.2,hsl(hue+(k%2)*10,R(35,50),R(48,60)-(k%2)*8,.55))}});reset();
  // ---------- Fels mit Höhle (rechts hinten) ----------
  {x.fillStyle='#8a7c66';x.beginPath();KFELS.forEach(([a,b],i)=>i?x.lineTo(a,b):x.moveTo(a,b));x.closePath();x.fill();
    x.save();x.clip();for(let i=0;i<2600;i++){const a=R(800,1000),b=R(130,300);dab(a,b,R(3,9),R(1.5,4),R(-1.2,-.3),hsl(R(25,40),R(8,20),r()<.35?R(68,80):R(34,52),R(.35,.6)))}
      g=x.createLinearGradient(830,150,990,290);g.addColorStop(0,'rgba(255,230,180,.25)');g.addColorStop(1,'rgba(30,20,10,.35)');reset();x.fillStyle=g;x.fillRect(800,120,200,200);x.restore();
    // Grasbüschel am Fuß des Felsens
    for(let i=0;i<260;i++){const a=R(810,1000),b=R(262,306);dab(a,b,R(3,6),R(1,2),R(-.3,.3),hsl(R(70,95),40,R(30,45),.5))}reset()}
  // ---------- See ----------
  {const[cx,cy,rx,ry]=KSEE;x.fillStyle='#5a6a3a';x.beginPath();x.ellipse(cx,cy,rx+8,ry+6,0,0,7);x.fill();
    g=x.createLinearGradient(0,cy-ry,0,cy+ry);g.addColorStop(0,'#a6c2c8');g.addColorStop(.5,'#6e98a8');g.addColorStop(1,'#3e6a80');x.fillStyle=g;x.beginPath();x.ellipse(cx,cy,rx,ry,0,0,7);x.fill();
    x.save();x.clip();for(let i=0;i<1400;i++){const a=R(cx-rx,cx+rx),b=R(cy-ry,cy+ry);dab(a,b,R(4,12),R(.6,1.4),R(-.05,.05),r()<.3?'rgba(240,248,255,.35)':hsl(R(190,205),R(25,40),R(30,55),.35))}reset();
      _glow(x,cx-60,cy-30,90,'255,250,220',.25);x.restore();
    // Schilf am Rand
    for(let i=0;i<220;i++){const w=R(0,Math.PI*2),a=cx+Math.cos(w)*(rx+R(-6,8)),b=cy+Math.sin(w)*(ry+R(-4,6));if(b<cy-ry*.2||r()<.3)dab(a,b-4,R(5,8),R(.8,1.2),-Math.PI/2+R(-.3,.3),hsl(R(45,85),R(35,55),R(30,52),.7))}reset()}
  // ---------- Bach von den Bergen an der Mühle vorbei, Abfluss vom Sumpf in den See ----------
  const wasser=(P,w)=>{x.lineCap='round';x.lineJoin='round';const pfad=()=>{x.beginPath();P.forEach(([a,b],i)=>i?x.lineTo(a,b):x.moveTo(a,b))};
    pfad();x.strokeStyle='rgba(60,70,30,.55)';x.lineWidth=w+7;x.stroke();pfad();x.strokeStyle='#5f8ea2';x.lineWidth=w;x.stroke();pfad();x.strokeStyle='rgba(170,205,215,.55)';x.lineWidth=w*.35;x.stroke();
    P.forEach(([a,b],i)=>{if(i%2)dab(a+R(-1,1),b,R(2,4),R(.5,1),R(-.2,.2),'rgba(240,250,255,.45)')});reset()};
  wasser(KFLUSS,9);wasser(KBACH,5);
  // ---------- Sumpf: trübe Tümpel, Schilf, tote Bäume, Nebel ----------
  {KTUEMPEL.forEach(([a,b,rx,ry])=>{_blob(x,a,b,rx+6,ry+4,'#55603a',r);_blob(x,a,b,rx,ry,'#3e4e3a',r);_blob(x,a-rx*.2,b-ry*.2,rx*.6,ry*.5,'rgba(120,140,110,.45)',r)});
    for(let i=0;i<320;i++){const t=KTUEMPEL[i%KTUEMPEL.length],w=R(0,7),a=t[0]+Math.cos(w)*t[2]*R(.8,1.3),b=t[1]+Math.sin(w)*t[3]*R(.8,1.5);dab(a,b-3,R(3,6),R(.6,1),-Math.PI/2+R(-.4,.4),hsl(R(40,80),R(30,50),R(28,48),.75))}reset();
    [[690,322],[770,330],[748,384]].forEach(([a,b])=>{x.strokeStyle='#3a3226';x.lineWidth=2;x.beginPath();x.moveTo(a,b);x.lineTo(a+1,b-20);x.lineTo(a-5,b-27);x.moveTo(a+1,b-14);x.lineTo(a+7,b-20);x.stroke()});
    for(let i=0;i<5;i++)_glow(x,R(690,780),R(325,375),R(26,46),'225,235,215',.35);_glow(x,712,346,8,'200,255,220',.6);_glow(x,764,334,7,'200,255,220',.5)}   // Irrlichter der Nymphen
  // ---------- Feldwege (Erde, Fahrspuren, Steinchen) ----------
  WEGE.forEach(({P})=>{P.forEach(([a,b],i)=>{if(i==0||i==P.length-1)return;const s=sk(b),ang=Math.atan2(P[i+1][1]-P[i-1][1],P[i+1][0]-P[i-1][0]);
      for(let k=0;k<5;k++)dab(a+R(-1.5,1.5),b+R(-1.5,1.5),R(4,6)*s,R(3.4,4.6)*s,ang,hsl(R(28,36),R(30,42),R(30,38),.5))});
    P.forEach(([a,b],i)=>{if(i==0||i==P.length-1)return;const s=sk(b),ang=Math.atan2(P[i+1][1]-P[i-1][1],P[i+1][0]-P[i-1][0]);
      for(let k=0;k<4;k++)dab(a+R(-1,1),b+R(-1,1),R(4,6)*s,R(1.8,2.8)*s,ang,hsl(R(32,40),R(38,50),R(52,64),.55));if(r()<.5)dab(a+R(-3,3)*s,b+R(-2,2)*s,1.2*s,1*s,0,'rgba(90,70,50,.6)')})});reset();
  // ---------- Brücken: wo ein Weg Bach oder Fluss kreuzt ----------
  WEGE.forEach(({P})=>[KFLUSS,KBACH].forEach(F=>{for(let i=0;i<P.length-1;i++)for(let j=0;j<F.length-1;j++){const q=kSchnitt(P[i],P[i+1],F[j],F[j+1]);if(!q)continue;
    const[a,b,ang]=q,s=sk(b);x.setTransform(Math.cos(ang),Math.sin(ang),-Math.sin(ang),Math.cos(ang),a,b);
    x.fillStyle='rgba(30,20,10,.35)';x.fillRect(-13*s,-5*s,26*s,12*s);x.fillStyle='#7a5432';x.fillRect(-13*s,-6*s,26*s,11*s);
    for(let k=-12;k<12;k+=3){x.fillStyle=k%2?'#8e6440':'#6a4628';x.fillRect(k*s,-6*s,2.4*s,11*s)}x.fillStyle='#4a3018';x.fillRect(-13*s,-7.5*s,26*s,1.6*s);x.fillRect(-13*s,4.5*s,26*s,1.6*s);reset()}}));
  // ---------- Malliste: Bäume und Gebäude, von hinten nach vorn ----------
  const D=[],add=(b,f)=>D.push([b,f]);
  // Bäume
  const baum={
    birke:(a,b,s)=>{dab(a+4*s,b+1*s,7*s,2*s,0,'rgba(30,40,15,.3)');x.fillStyle='#ece8dc';x.fillRect(a-1*s,b-16*s,2*s,16*s);x.fillStyle='#2a2a24';for(let k=0;k<3;k++)x.fillRect(a-1*s,b-(3+k*4.5)*s,1.6*s,1*s);
      for(let k=0;k<9;k++)dab(a+R(-5,5)*s,b-R(16,28)*s,R(3,5)*s,R(2,3.5)*s,R(0,3),hsl(R(72,95),R(40,60),R(38,50),.75));for(let k=0;k<4;k++)dab(a+R(-5,1)*s,b-R(22,29)*s,R(2,3)*s,R(1.5,2)*s,R(0,3),hsl(R(60,75),R(50,70),R(62,72),.7))},
    laub:(a,b,s)=>{dab(a+5*s,b+1*s,9*s,2.6*s,0,'rgba(25,35,12,.35)');x.fillStyle='#4a3420';x.fillRect(a-1.2*s,b-9*s,2.4*s,9*s);
      for(let k=0;k<10;k++)dab(a+R(-7,7)*s,b-R(10,22)*s,R(4,6)*s,R(3,5)*s,R(0,3),hsl(R(85,115),R(30,45),R(20,32),.8));for(let k=0;k<5;k++)dab(a+R(-7,2)*s,b-R(16,24)*s,R(2.5,4)*s,R(2,3)*s,R(0,3),hsl(R(70,90),R(40,55),R(40,52),.7))},
    tanne:(a,b,s,dunkel)=>{dab(a+5*s,b+1*s,8*s,2.4*s,0,'rgba(15,25,10,.4)');x.fillStyle='#3a2a18';x.fillRect(a-.8*s,b-3*s,1.6*s,3*s);
      for(let k=0;k<5;k++){const yy=b-2*s-k*4.2*s,w=(7.5-k*1.4)*s;for(let j=0;j<5;j++){const u=(j-2)/2;dab(a+u*w*.8,yy-Math.abs(u)*-1*s,w*.55,2*s,u*.5,hsl(R(115,150),R(22,34),(dunkel?17:23)+k*1.5+R(-2,2),.85))}
        dab(a-w*.5,yy-1.2*s,w*.35,1*s,-.35,hsl(R(80,105),R(30,42),(dunkel?30:40),.6))}dab(a,b-23*s,1.2*s,3*s,0,hsl(130,28,dunkel?20:26,.9))}};
  const inFels=(()=>{const p=new Path2D();KFELS.forEach(([a,b],i)=>i?p.lineTo(a,b):p.moveTo(a,b));p.closePath();return(a,b)=>x.isPointInPath(p,a*KQ,b*KQ)})();
  const frei=(a,b)=>{if(b<HOR+8||inSee(a,b,14)||inFels(a,b+6))return false;const s=st(b);
    if(KORT.some(g=>Math.hypot(g.x-a,(g.y-b)*1.5)<24*sb(b)+6))return false;if(a>396&&a<664&&b>140&&b<290)return false;   // Lichtungen und Dorf
    if(WEGE.some(({P})=>kDist(P,a,b)<7*s+3))return false;if(kDist(KFLUSS,a,b)<10||kDist(KBACH,a,b)<8)return false;
    if(KTUEMPEL.some(([u,v,rx,ry])=>((a-u)/(rx+8))**2+((b-v)/(ry+8))**2<1))return false;return true};
  const WAELDER=[['birke',452,572,200,56,170],['birke',548,470,90,40,50],['laub',380,330,100,64,90],['tanne',380,330,100,64,30],['tanne',186,252,120,66,170],['tanne',40,430,70,210,110],
   ['laub',196,476,96,64,70],['laub',606,340,100,48,70],['birke',822,248,44,30,22],['laub',650,592,90,26,40],['birke',250,156,70,26,30],
   ['tanne',86,170,90,38,70],['birke',648,404,48,30,30],['laub',780,430,40,30,18],['birke',960,470,50,40,24],['laub',30,560,60,40,30],['birke',300,580,90,36,50]];
  // Waldboden: dichte, dunkle Laubmasse unter den Bäumen, damit Wälder als Fläche gemalt wirken
  WAELDER.forEach(([art,cx,cy,rx,ry,n])=>{for(let i=0;i<n*4;i++){const w=R(0,Math.PI*2),d=Math.sqrt(r()),a=cx+Math.cos(w)*rx*d,b=cy+Math.sin(w)*ry*d;if(!frei(a,b))continue;const s=st(b);
    dab(a,b-3*s,R(5,9)*s,R(3,5)*s,R(-.3,.3),art=='tanne'?hsl(R(120,150),R(20,30),R(16,24),.5):art=='birke'?hsl(R(75,95),R(30,45),R(30,40),.4):hsl(R(90,115),R(28,40),R(20,30),.5))}});reset();
  // ferner Waldsaum am Horizont
  for(let i=0;i<900;i++){const a=R(0,KW),b=HOR+R(0,16)+Math.sin(a*.013)*4;if(inFels(a,b))continue;dab(a,b,R(3,7),R(1.5,3),R(-.2,.2),hsl(R(120,150),R(14,24),R(26,38),.5))}reset();
  WAELDER.forEach(([art,cx,cy,rx,ry,n])=>{
    for(let i=0;i<n;i++){const w=R(0,Math.PI*2),d=Math.sqrt(r()),a=cx+Math.cos(w)*rx*d,b=cy+Math.sin(w)*ry*d;if(!frei(a,b))continue;const s=st(b)*R(.85,1.15),dk=cx<300&&cy<300;add(b,()=>baum[art](a,b,s,dk))}});
  // Gebäude-Baukasten: Izba in Dreiviertelansicht (Giebel nach vorn, Seitenwand rechts oder links)
  const izba=(a,b,s,o={})=>{const f=o.flip?-1:1,X=v=>a+v*f,w=(o.w||16)*s,h=(o.h||10)*s,d=(o.d||10)*s,rh=(o.rh||10)*s;
    dab(a+f*8*s,b+2*s,18*s,4*s,-.1*f,'rgba(25,30,12,.35)');
    x.fillStyle=o.seite||'#6a4226';x.beginPath();x.moveTo(X(w/2),b);x.lineTo(X(w/2+d),b-d*.5);x.lineTo(X(w/2+d),b-d*.5-h);x.lineTo(X(w/2),b-h);x.fill();
    x.fillStyle=o.wand||'#8e5e36';x.fillRect(Math.min(X(-w/2),X(w/2)),b-h,w,h);x.beginPath();x.moveTo(X(-w/2),b-h);x.lineTo(a,b-h-rh);x.lineTo(X(w/2),b-h);x.fill();
    x.fillStyle='rgba(40,20,8,.35)';for(let k=1;k<4;k++)x.fillRect(Math.min(X(-w/2),X(w/2+d)),b-h*k/4,w+d,.7*s);
    x.fillStyle=o.dach2||'#4e3826';x.beginPath();x.moveTo(a,b-h-rh-1*s);x.lineTo(X(d),b-h-rh-d*.5-1*s);x.lineTo(X(w/2+d+2*s),b-h-d*.5+1.5*s);x.lineTo(X(w/2+2*s),b-h+1.5*s);x.fill();
    x.fillStyle=o.dach||'#7a5a3c';x.beginPath();x.moveTo(a,b-h-rh-1*s);x.lineTo(X(-w/2-2*s),b-h+1.5*s);x.lineTo(X(-w/2+1*s),b-h+1.5*s);x.lineTo(a,b-h-rh+2*s);x.fill();
    for(let k=0;k<8;k++)dab(X(R(.1,.9)*(w/2+d)),b-h-R(.1,.9)*(rh+d*.4),R(2,4)*s,R(.6,1)*s,-.45*f,'rgba(255,230,180,.12)');
    x.fillStyle=o.licht||'#f2c860';x.fillRect(a-2.4*s,b-h*.72,4.8*s,3.8*s);_glow(x,a,b-h*.55,8*s,o.glut||'255,210,110',.35);x.fillStyle='#3a2414';x.fillRect(a-.4*s,b-h*.72,.8*s,3.8*s);
    if(o.rauch)for(let k=0;k<10;k++)dab(X(w/2+d*.5)+k*2.2*s,b-h-rh-d*.4-k*4*s,R(2.5,4)*s+k*.4*s,R(1.5,2.5)*s,R(0,3),`rgba(225,225,220,${.45-k*.04})`)};
  // Dorf: Häuser, Opas abgebrannte Ruine mit Ofen, Omas Sonnenblumen
  KDORF.forEach(([a,b,s0],i)=>add(b,()=>izba(a,b,sb(b)*s0*.85,{flip:i%2,rauch:i%3==0,dach:i%2?'#6e5638':'#7c5a3a'})));
  add(244,()=>{const a=506,b=244,s=sb(b)*.85;dab(a+4*s,b,16*s,5*s,0,'rgba(20,15,10,.6)');for(let k=0;k<14;k++)dab(a+R(-12,12)*s,b-R(0,4)*s,R(2,5)*s,R(.8,1.4)*s,R(-.6,.6),'rgba(30,22,16,.85)');
    x.fillStyle='#b8aa98';x.fillRect(a-3*s,b-16*s,6*s,14*s);x.fillStyle='#8a7c6a';x.fillRect(a-1.6*s,b-22*s,3.2*s,8*s);x.fillStyle='#2a1a10';x.fillRect(a-2*s,b-8*s,4*s,3*s)});
  add(204,()=>{for(let k=0;k<6;k++){const a=556+k*3.4,b=202+(k%2)*2,s=sb(b)*.8;x.strokeStyle='#4a7a2a';x.lineWidth=1*s;x.beginPath();x.moveTo(a,b);x.lineTo(a,b-8*s);x.stroke();dab(a,b-9*s,2.2*s,2.2*s,0,'#f0c020');dab(a,b-9*s,.9*s,.9*s,0,'#5a3a12')}});
  // die einzelnen Orte
  const P=k=>KORT.find(g=>g.k===k);
  const V={
    wald:(a,b,s)=>{[[-10,4],[6,8],[14,2]].forEach(([u,v])=>{dab(a+u*s,b+v*s,4*s,2.6*s,0,'#d8302a');dab(a+u*s-1.5*s,b+v*s-.8*s,.8*s,.8*s,0,'#fff');dab(a+u*s+1.8*s,b+v*s-.5*s,.7*s,.7*s,0,'#fff');x.fillStyle='#f0e8d8';x.fillRect(a+u*s-1*s,b+v*s,2*s,3*s)});
      x.fillStyle='#d8d0c0';x.beginPath();x.ellipse(a-2*s,b-2*s,5*s,2.2*s,0,0,7);x.fill();x.fillStyle='#e8e2d4';x.fillRect(a-7*s,b-7*s,10*s,5*s)},
    gabel:(a,b,s)=>{x.fillStyle='#5a3a1e';x.fillRect(a-1*s,b-20*s,2.2*s,20*s);x.fillStyle='#8a6038';x.beginPath();x.moveTo(a-14*s,b-18*s);x.lineTo(a,b-19*s);x.lineTo(a,b-15*s);x.lineTo(a-14*s,b-14*s);x.lineTo(a-17*s,b-16*s);x.fill();
      x.beginPath();x.moveTo(a+1*s,b-13*s);x.lineTo(a+14*s,b-12*s);x.lineTo(a+17*s,b-10*s);x.lineTo(a+14*s,b-8*s);x.lineTo(a+1*s,b-9*s);x.fill()},
    huette:(a,b,s)=>{x.strokeStyle='#d89a3a';x.lineWidth=2.2*s;x.lineCap='round';[[-5,-9],[5,9]].forEach(([u,v])=>{x.beginPath();x.moveTo(a+u*s,b-11*s);x.lineTo(a+(u+v*.3)*s,b-5*s);x.lineTo(a+u*s,b);x.lineTo(a+(u-3)*s,b+1.5*s);x.moveTo(a+u*s,b);x.lineTo(a+(u+3)*s,b+1.5*s);x.stroke()});
      izba(a,b-10*s,s,{w:15,h:9,dach:'#6a7040',dach2:'#4a5230',licht:'#b8f080',glut:'120,255,120',rauch:1});
      for(let k=0;k<7;k++){const w=Math.PI*.15+k/6*Math.PI*.7,u=a+Math.cos(w)*26*s,v=b+Math.sin(w)*9*s;x.fillStyle='#5a4026';x.fillRect(u-.8*s,v-8*s,1.6*s,8*s);dab(u,v-9*s,1.8*s,1.6*s,0,'#ece4d0');dab(u-.6*s,v-9*s,.4*s,.4*s,0,'#222');dab(u+.6*s,v-9*s,.4*s,.4*s,0,'#222')}},
    muehle:(a,b,s)=>{izba(a,b,s,{w:14,h:14,rh:9,flip:1,dach:'#6a4a2c'});const u=a+19*s,v=b-7*s;x.strokeStyle='#3e2614';x.lineWidth=1.6*s;x.beginPath();x.ellipse(u,v,5*s,10*s,0,0,7);x.stroke();
      for(let k=0;k<8;k++){const w=k/8*Math.PI*2;x.beginPath();x.moveTo(u,v);x.lineTo(u+Math.cos(w)*5*s,v+Math.sin(w)*10*s);x.stroke()}for(let k=0;k<6;k++)dab(u+R(-2,6)*s,b+R(0,4)*s,R(2,4)*s,1*s,0,'rgba(240,250,255,.6)')},
    dorf:(a,b,s)=>{x.fillStyle='#6a4a2a';x.fillRect(a-14*s,b-10*s,1.6*s,10*s);x.fillRect(a+12*s,b-10*s,1.6*s,10*s);x.fillRect(a-14*s,b-11*s,27.6*s,2*s);
      x.fillStyle='#7a6a50';x.beginPath();x.ellipse(a+22*s,b-1*s,4*s,2.4*s,0,0,7);x.fill();x.fillStyle='#5a3a1e';x.fillRect(a+19*s,b-9*s,1.2*s,8*s);x.fillRect(a+24*s,b-9*s,1.2*s,8*s);x.fillRect(a+18*s,b-10*s,8*s,1.6*s)},
    dorfstr:()=>{},
    kirche:(a,b,s)=>{izba(a,b,s,{w:18,h:13,d:14,rh:8,dach:'#5a4a3a'});const u=a+2*s,t=b-24*s;x.fillStyle='#7a4e2c';x.fillRect(u-4*s,t-6*s,8*s,10*s);x.fillStyle='#5a3820';x.fillRect(u+2*s,t-6*s,2*s,10*s);
      x.fillStyle='#d8a828';x.beginPath();x.moveTo(u,t-20*s);x.quadraticCurveTo(u+8*s,t-12*s,u+4.5*s,t-6*s);x.lineTo(u-4.5*s,t-6*s);x.quadraticCurveTo(u-8*s,t-12*s,u,t-20*s);x.fill();dab(u-2*s,t-12*s,1.6*s,3*s,.3,'rgba(255,250,200,.7)');
      x.strokeStyle='#e8c040';x.lineWidth=1.2*s;x.beginPath();x.moveTo(u,t-20*s);x.lineTo(u,t-27*s);x.moveTo(u-3*s,t-24.5*s);x.lineTo(u+3*s,t-24.5*s);x.stroke();_glow(x,u,t-14*s,16*s,'255,220,120',.3)},
    schmiede:(a,b,s)=>{izba(a,b,s,{w:18,h:8,rh:6,flip:1,dach:'#5a4c40',dach2:'#3a322a',licht:'#ff8a30',glut:'255,120,30'});_glow(x,a-10*s,b-4*s,14*s,'255,130,40',.55);
      x.fillStyle='#3a3a3e';x.fillRect(a-16*s,b-4*s,7*s,2.4*s);x.fillRect(a-14*s,b-2*s,3*s,3*s);for(let k=0;k<12;k++)dab(a-4*s+k*1.6*s,b-20*s-k*4*s,R(3,5)*s,R(1.5,2.5)*s,R(0,3),`rgba(120,115,110,${.5-k*.035})`)},
    irrwald:(a,b,s)=>{[[-10,-6],[-6,-6],[12,2],[16,2],[2,-14]].forEach(([u,v])=>{_glow(x,a+u*s,b+v*s,6*s,'255,240,120',.8);dab(a+u*s,b+v*s,.9*s,.9*s,0,'#fffbd0')})},
    banja:(a,b,s)=>{izba(a,b,s*1.15,{w:26,h:11,d:16,rh:8,dach:'#5e3a48',dach2:'#3e2430',licht:'#ff7ac8',glut:'255,80,180',rauch:1});
      for(let k=0;k<7;k++){const u=a-14*s+k*5*s,v=b-15*s+Math.sin(k)*1.2*s;_glow(x,u,v,4*s,'255,90,190',.8);dab(u,v,1*s,1*s,0,'#ffd0f0')}
      x.fillStyle='#ff5ab4';x.font=`bold ${Math.round(8*s)}px Georgia`;x.textAlign='center';x.fillText('BANJA',a,b-27*s);
      // Hinterhof: Kisten und Fässer hinter dem Banja
      [[-26,-14],[-20,-12],[-30,-9]].forEach(([u,v],i)=>{x.fillStyle=i==1?'#5a3a24':'#7a5432';x.fillRect(a+u*s,b+v*s,5*s,4.5*s);x.strokeStyle='#3a2210';x.lineWidth=.6*s;x.strokeRect(a+u*s,b+v*s,5*s,4.5*s)})},
    sperre:(a,b,s)=>{const W=WEGE.find(w=>(w.A.k=='sperre'&&w.B.k=='sumpf')||(w.B.k=='sperre'&&w.A.k=='sumpf'));if(!W)return;const Q=W.A.k=='sperre'?W.P:[...W.P].reverse(),[u,v]=Q[14],[u2,v2]=Q[16],ang=Math.atan2(v2-v,u2-u)+Math.PI/2;
      [-.35,.1,.45].forEach((d,i)=>{const cx=u+Math.cos(ang-Math.PI/2)*i*3*s,cy=v+Math.sin(ang-Math.PI/2)*i*3*s,co=Math.cos(ang+d),si=Math.sin(ang+d);x.setTransform(co,si,-si,co,cx,cy);
        x.fillStyle='rgba(20,20,10,.35)';x.fillRect(-15*s,1*s,30*s,3*s);x.fillStyle='#ece8dc';x.fillRect(-15*s,-1.6*s,30*s,3.2*s);x.fillStyle='#2a2a24';for(let k=-12;k<14;k+=5)x.fillRect(k*s,-1.6*s,1.6*s,1.4*s);x.fillStyle='#c8b8a0';x.beginPath();x.ellipse(15*s,0,1.2*s,1.6*s,0,0,7);x.fill()});reset()},
    sumpf:(a,b,s)=>{[[-12,4],[8,-2]].forEach(([u,v])=>{_glow(x,a+u*s,b+v*s,10*s,'220,255,235',.45);dab(a+u*s,b+v*s-3*s,1.6*s,4*s,0,'rgba(230,250,240,.55)');dab(a+u*s,b+v*s-8*s,1.5*s,1.5*s,0,'rgba(230,250,240,.6)')})},
    fischer:(a,b,s)=>{izba(a,b,s,{flip:1,rauch:1});x.strokeStyle='rgba(60,50,40,.7)';x.lineWidth=.6*s;for(let k=0;k<5;k++){x.beginPath();x.moveTo(a-24*s+k*2.4*s,b-10*s);x.lineTo(a-24*s+k*2.4*s,b-2*s);x.stroke();x.beginPath();x.moveTo(a-24*s,b-10*s+k*2*s);x.lineTo(a-14*s,b-10*s+k*2*s);x.stroke()}
      x.fillStyle='#5a3a1e';x.beginPath();x.moveTo(a+14*s,b+6*s);x.quadraticCurveTo(a+22*s,b+10*s,a+30*s,b+6*s);x.lineTo(a+28*s,b+4*s);x.lineTo(a+16*s,b+4*s);x.fill()},
    ufer:(a,b,s)=>{x.fillStyle='rgba(20,30,40,.35)';x.beginPath();x.moveTo(a-3*s,b+4*s);x.lineTo(a+5*s,b+4*s);x.lineTo(a+11*s,b+38*s);x.lineTo(a+2*s,b+38*s);x.fill();
      for(let k=0;k<12;k++){const v=b+2*s+k*3*s;x.fillStyle=k%2?'#8a6440':'#7a5432';x.beginPath();x.moveTo(a-4*s+k*.6*s,v);x.lineTo(a+5*s+k*.6*s,v);x.lineTo(a+5.4*s+k*.6*s,v+3*s);x.lineTo(a-3.6*s+k*.6*s,v+3*s);x.fill()}
      x.fillStyle='#4a2e18';[[-4,12],[5,12],[-1,28],[9,28]].forEach(([u,v])=>x.fillRect(a+u*s,b+v*s,1.4*s,6*s));
      x.fillStyle='#6a3a20';x.beginPath();x.moveTo(a+14*s,b+30*s);x.quadraticCurveTo(a+22*s,b+36*s,a+31*s,b+30*s);x.lineTo(a+29*s,b+28*s);x.lineTo(a+16*s,b+28*s);x.fill();
      for(let k=0;k<6;k++)dab(a+R(-2,30)*s,b+R(34,42)*s,R(3,6)*s,.6*s,0,'rgba(240,250,255,.5)')},
    gnome:(a,b,s)=>{[[-16,2,1.1],[2,-6,1.3],[18,4,1]].forEach(([u,v,q])=>{const X=a+u*s,Y=b+v*s;dab(X+4*s,Y+1*s,12*s*q,3.4*s*q,0,'rgba(20,30,10,.45)');x.fillStyle='#8a6a3e';x.beginPath();x.ellipse(X,Y,10*s*q,9*s*q,0,Math.PI,0);x.fill();
      x.fillStyle='#a8844e';x.beginPath();x.ellipse(X-2*s*q,Y-2*s*q,6*s*q,5.5*s*q,0,Math.PI,0);x.fill();x.fillStyle='#5a7a2e';x.beginPath();x.ellipse(X,Y-6*s*q,8*s*q,3.6*s*q,0,Math.PI,0);x.fill();
      for(let k=0;k<6;k++)dab(X+R(-6,6)*s*q,Y-R(2,7)*s*q,R(2,3)*s,R(1,2)*s,R(0,3),hsl(R(70,100),40,R(36,50),.7));x.fillStyle='#4a2e16';x.beginPath();x.ellipse(X,Y,2.4*s*q,3.6*s*q,0,Math.PI,0);x.fill();_glow(x,X,Y-1.5*s,4*s,'255,200,100',.5);
      x.fillStyle='#7a6a5a';x.fillRect(X+4*s*q,Y-10*s*q,1.6*s,3*s)});x.fillStyle='#c0302a';x.beginPath();x.moveTo(a+8*s,b-1*s);x.lineTo(a+10*s,b-8*s);x.lineTo(a+12*s,b-1*s);x.fill()},
    garten:(a,b,s)=>{for(let k=0;k<4;k++){x.fillStyle='#5a3e24';x.fillRect(a-16*s,b-8*s+k*4*s,30*s,2.4*s);for(let j=0;j<8;j++)dab(a-14*s+j*3.8*s,b-8.5*s+k*4*s,1.4*s,1.4*s,0,hsl([100,20,50,0][k],60,45,.9))}
      [[18,-2,1.2],[22,4,.8]].forEach(([u,v,q])=>{x.fillStyle='#e8dcc0';x.fillRect(a+u*s-1*s*q,b+v*s-5*s*q,2*s*q,5*s*q);dab(a+u*s,b+v*s-5*s*q,4*s*q,2.4*s*q,0,'#c03828');dab(a+u*s-1.2*s*q,b+v*s-6*s*q,.7*s*q,.6*s*q,0,'#fff')})},
    hoehle:(a,b,s)=>{x.fillStyle='#1e1610';x.beginPath();x.ellipse(a,b,9*s,10*s,0,Math.PI,0);x.fill();x.fillRect(a-9*s,b,18*s,2*s);_glow(x,a+5*s,b-2*s,8*s,'255,150,50',.5);dab(a+6*s,b-5*s,1*s,1.6*s,0,'#ffd070')}};
  KORT.forEach(g=>add(g.y+.5,()=>(V[g.k]||(()=>{}))(g.x,g.y,sb(g.y))));
  D.sort((p,q)=>p[0]-q[0]).forEach(([,f])=>{f();reset()});
  // ---------- Malerei: jede Stelle noch einmal mit kurzen Tupfern in ihrer eigenen Farbe übermalt (weiche, gemalte Kanten) ----------
  {const im=x.getImageData(0,0,KW*KQ,KH*KQ).data;for(let i=0;i<22000;i++){const a=R(KR,KW-KR)|0,b=R(KR,KH-KR)|0,o=(b*KQ*KW*KQ+a*KQ)*4,t=tiefe(b);
      dab(a+R(-1,1),b+R(-1,1),R(1.6,3.2)+t*1.6,R(.8,1.3)+t*.5,R(-.7,.7)+(b<HOR?0:.0),`rgba(${im[o]},${im[o+1]},${im[o+2]},.55)`)}reset()}
  // ---------- Luft: Dunst zum Horizont, warmes Licht von links oben, dunklere Ränder ----------
  g=x.createLinearGradient(0,HOR-30,0,HOR+140);g.addColorStop(0,'rgba(230,225,205,.0)');g.addColorStop(.3,'rgba(230,225,205,.35)');g.addColorStop(1,'rgba(230,225,205,0)');x.fillStyle=g;x.fillRect(0,HOR-30,KW,170);
  x.globalCompositeOperation='soft-light';_glow(x,220,120,520,'255,220,150',.6);x.globalCompositeOperation='source-over';
  const rd=x.createRadialGradient(KW/2,KH/2,KH*.4,KW/2,KH/2,KW*.66);rd.addColorStop(0,'rgba(40,25,10,0)');rd.addColorStop(1,'rgba(40,25,10,.5)');x.fillStyle=rd;x.fillRect(0,0,KW,KH);
  // ---------- Leinwand: Gewebe und Firnis ----------
  x.fillStyle='rgba(255,240,210,.035)';for(let b=0;b<KH;b+=3)x.fillRect(0,b,KW,1);x.fillStyle='rgba(40,25,10,.03)';for(let a=0;a<KW;a+=3)x.fillRect(a,0,1,KH);
  x.globalCompositeOperation='multiply';x.fillStyle='rgba(255,236,200,.18)';x.fillRect(0,0,KW,KH);x.globalCompositeOperation='source-over';
  // ---------- Goldrahmen mit Kehle und Perlstab, Messingschild unten ----------
  {const seite=(pts,g0,g1)=>{const gr=x.createLinearGradient(...g0,...g1);gr.addColorStop(0,'#5a3c10');gr.addColorStop(.3,'#e8c470');gr.addColorStop(.55,'#b8862e');gr.addColorStop(.8,'#f4dc94');gr.addColorStop(1,'#6a4612');x.fillStyle=gr;x.beginPath();pts.forEach(([a,b],i)=>i?x.lineTo(a,b):x.moveTo(a,b));x.closePath();x.fill()};
    seite([[0,0],[KW,0],[KW-KR,KR],[KR,KR]],[0,0],[0,KR]);seite([[0,KH],[KW,KH],[KW-KR,KH-KR],[KR,KH-KR]],[0,KH],[0,KH-KR]);
    seite([[0,0],[KR,KR],[KR,KH-KR],[0,KH]],[0,0],[KR,0]);seite([[KW,0],[KW-KR,KR],[KW-KR,KH-KR],[KW,KH]],[KW,0],[KW-KR,0]);
    x.strokeStyle='#3a2408';x.lineWidth=2;x.strokeRect(1,1,KW-2,KH-2);x.strokeRect(KR-1,KR-1,KW-2*KR+2,KH-2*KR+2);x.strokeStyle='rgba(255,240,190,.6)';x.lineWidth=1;x.strokeRect(KR*.45,KR*.45,KW-KR*.9,KH-KR*.9);
    x.fillStyle='rgba(255,236,170,.75)';for(let a=KR+6;a<KW-KR;a+=9){x.beginPath();x.arc(a,KR*.75,1.5,0,7);x.arc(a,KH-KR*.75,1.5,0,7);x.fill()}for(let b=KR+6;b<KH-KR;b+=9){x.beginPath();x.arc(KR*.75,b,1.5,0,7);x.arc(KW-KR*.75,b,1.5,0,7);x.fill()}
    x.fillStyle='rgba(20,10,0,.45)';x.fillRect(KR,KR,KW-2*KR,3);x.fillRect(KR,KR,3,KH-2*KR);
    const a=KW/2,b=KH-KR/2-2,w=320;g=x.createLinearGradient(0,b-15,0,b+15);g.addColorStop(0,'#f6e2a0');g.addColorStop(.5,'#c89a40');g.addColorStop(1,'#7a5418');x.fillStyle=g;x.beginPath();x.roundRect?x.roundRect(a-w/2,b-15,w,30,6):x.rect(a-w/2,b-15,w,30);x.fill();
    x.strokeStyle='#4a300a';x.lineWidth=1.5;x.stroke();[[a-w/2+9,b],[a+w/2-9,b]].forEach(([u,v])=>{x.fillStyle='#6a4a18';x.beginPath();x.arc(u,v,3,0,7);x.fill()});
    x.fillStyle='#3a2208';x.font='italic bold 18px Georgia';x.textAlign='center';x.textBaseline='middle';x.fillText('Der Verfluchte Birkenwald',a,b+1)}
  KARTE_BG=c;KARTE_L=L0;return c}
// Zoom und Verschieben in der Karte, ohne Browserzoom: Mausrad (um den Mauszeiger), Knöpfe + / − / ganze Karte,
// Doppelklick, Ziehen mit der Maus, zwei Finger auf dem Touchscreen. Nadel und Haken bleiben dabei gleich groß.
let KZ={z:1,x:0,y:0};
function kZoom(M){const V=M.querySelector('.kview'),I=M.querySelector('.kinner'),ZMAX=3.5;if(!V||!I)return;
  const setz=()=>{const w=V.clientWidth,h=V.clientHeight;KZ.z=Math.max(1,Math.min(ZMAX,KZ.z));KZ.x=Math.min(0,Math.max(w-w*KZ.z,KZ.x));KZ.y=Math.min(0,Math.max(h-h*KZ.z,KZ.y));
    I.style.transform=`translate(${KZ.x}px,${KZ.y}px) scale(${KZ.z})`;I.style.setProperty('--z',KZ.z);V.classList.toggle('gross',KZ.z>1.01);
    M.querySelector('[data-z="1"]').disabled=KZ.z>=ZMAX-.01;M.querySelector('[data-z="-1"]').disabled=M.querySelector('[data-z="0"]').disabled=KZ.z<=1.01};
  const um=(f,px,py)=>{const z0=KZ.z,z1=Math.max(1,Math.min(ZMAX,z0*f));KZ.x=px-(px-KZ.x)*z1/z0;KZ.y=py-(py-KZ.y)*z1/z0;KZ.z=z1;setz()};
  const rel=e=>{const b=V.getBoundingClientRect();return[e.clientX-b.left,e.clientY-b.top]};
  KZ={z:1,x:0,y:0};setz();   // beim Öffnen: ganze Karte
  V.addEventListener('wheel',e=>{e.preventDefault();const[px,py]=rel(e);um(e.deltaY<0?1.25:1/1.25,px,py)},{passive:false});
  M.querySelectorAll('[data-z]').forEach(b=>b.onclick=e=>{e.stopPropagation();const d=+b.dataset.z;if(!d){KZ={z:1,x:0,y:0};setz();return}um(d>0?1.5:1/1.5,V.clientWidth/2,V.clientHeight/2)});
  // Ziehen (ein Finger / Maus) und Zwei-Finger-Zoom; wer gezogen hat, löst keinen Klick (Schnellreise) aus
  const P=new Map();let st=null,zog=false;
  const werte=()=>[...P.values()],dist=()=>{const[a,b]=werte();return Math.hypot(a[0]-b[0],a[1]-b[1])},mitte=()=>{const[a,b]=werte();return[(a[0]+b[0])/2,(a[1]+b[1])/2]};
  const neu=()=>{st=P.size>=2?{d:dist()||1,m:mitte(),z:KZ.z,x:KZ.x,y:KZ.y}:P.size==1?{p:werte()[0],x:KZ.x,y:KZ.y}:null};
  V.addEventListener('pointerdown',e=>{if(e.target.closest('.kzoom')||(e.pointerType==='mouse'&&e.button!==0))return;P.set(e.pointerId,rel(e));if(P.size==1)zog=false;neu()});
  V.addEventListener('pointermove',e=>{if(!P.has(e.pointerId)||!st)return;P.set(e.pointerId,rel(e));
    if(P.size>=2&&st.d){const m=mitte(),z1=Math.max(1,Math.min(ZMAX,st.z*dist()/st.d));KZ.x=m[0]-(st.m[0]-st.x)*z1/st.z;KZ.y=m[1]-(st.m[1]-st.y)*z1/st.z;KZ.z=z1;zog=true;setz();return}
    const p=P.get(e.pointerId),dx=p[0]-st.p[0],dy=p[1]-st.p[1];if(!zog&&Math.hypot(dx,dy)<5)return;
    if(!zog){zog=true;try{V.setPointerCapture(e.pointerId)}catch(_){}}KZ.x=st.x+dx;KZ.y=st.y+dy;setz()});
  const auf=e=>{if(!P.has(e.pointerId))return;P.delete(e.pointerId);neu()};V.addEventListener('pointerup',auf);V.addEventListener('pointercancel',auf);
  V.addEventListener('click',e=>{if(zog){e.stopPropagation();e.preventDefault();zog=false}},true);
  V.addEventListener('dblclick',e=>{if(e.target.closest('.kzoom'))return;const[px,py]=rel(e);um(KZ.z>=ZMAX-.01?1/ZMAX:2,px,py)})}
function karteHTML(){return`<div class="kmap"><div class="kview"><div class="kinner"><canvas class="kcv"></canvas><div class="korte"></div></div><div class="kzoom"><button data-z="1" title="Hineinzoomen">+</button><button data-z="-1" title="Herauszoomen">−</button><button data-z="0" title="Ganze Karte">⤢</button></div></div><div class="kfuss"></div><div class="khilfe">Mausrad oder + / −: zoomen · Ziehen: verschieben</div></div>`}
function karteMalen(o){const M=o.querySelector('.kmap');if(!M)return;const cv2=M.querySelector(".kcv"),x=kHiRes(cv2,cv2.getContext("2d")),r=_rnd(9);x.drawImage(karteBild(),0,0,KW,KH);kZoom(M);
  const hier=KG[cur];
  // Nebel über Unerkundetem (wie Wolken gemalt); Orte direkt am Weg bekommen ein „?“
  const nachbar=new Set();MAPE.forEach(([a,b])=>{const A=KG[a],B=KG[b];if(!A||!B||A===B)return;if(kSeen(A)&&!kSeen(B))nachbar.add(B);if(kSeen(B)&&!kSeen(A))nachbar.add(A)});
  x.save();x.beginPath();x.rect(KR,KR,KW-2*KR,KH-2*KR);x.clip();
  KORT.forEach(g=>{if(kSeen(g))return;for(let i=0;i<8;i++)_glow(x,g.x+(r()-.5)*70,g.y-10+(r()-.5)*44,44+r()*30,'238,234,222',.6);
    for(let i=0;i<40;i++){const a=g.x+(r()-.5)*90,b=g.y-10+(r()-.5)*50,co=Math.cos(.1),si=Math.sin(.1);x.setTransform(co,si,-si,co,a,b);x.fillStyle=`rgba(245,242,232,${.2+r()*.25})`;x.beginPath();x.ellipse(0,0,8+r()*14,3+r()*4,0,0,7);x.fill()}x.setTransform(1,0,0,1,0,0);
    if(nachbar.has(g)){x.fillStyle='rgba(90,60,30,.85)';x.font='bold 26px Georgia';x.textAlign='center';x.textBaseline='middle';x.fillText('?',g.x,g.y-8)}});x.restore();
  // Ortsnamen auf kleinen Bändern
  x.textAlign='center';x.textBaseline='middle';KORT.forEach(g=>{if(!kSeen(g))return;const a=g.x,b=g.y+16,t=kName(g);x.font='italic bold 14px Georgia';const w=x.measureText(t).width+14;
    x.fillStyle='rgba(244,232,200,.92)';x.strokeStyle='rgba(90,58,30,.8)';x.lineWidth=1;x.beginPath();x.moveTo(a-w/2,b-9);x.lineTo(a+w/2,b-9);x.lineTo(a+w/2+6,b);x.lineTo(a+w/2,b+9);x.lineTo(a-w/2,b+9);x.lineTo(a-w/2-6,b);x.closePath();x.fill();x.stroke();
    x.fillStyle=g===hier?'#a01810':'#3a2210';x.fillText(t,a,b+.5)});
  // Klickflächen + „Du bist hier“-Nadel (HTML über der Leinwand); Reiseziel = erster erreichbarer Schauplatz des Ortes
  const L=M.querySelector('.korte'),reise=reiseOrte().length>=REISE_MIN,offen=typeof openRooms=='function'?openRooms():null;   // ✓ = hier gibt’s gerade nichts zu tun (09b-hinweise.js)
  const ziel=g=>g===hier?null:g.m.find(id=>reiseOk(id));
  L.innerHTML=KORT.filter(kSeen).map(g=>{const ok=reise&&ziel(g),fertig=offen&&!g.m.some(id=>offen.has(id));
    return`<button class="kort ${g===hier?'hier':''} ${ok?'go':''}" data-go="${g.k}" style="left:${g.x/KW*100}%;top:${g.y/KH*100}%" title="${kName(g)}">${g===hier?'<i class="knadel"></i>':''}${fertig?'<i class="kfertig" title="Hier gibt’s gerade nichts zu tun">✓</i>':''}</button>`}).join('');
  M.querySelector('.kfuss').textContent=reise?'Klick auf einen besuchten Ort: Schnellreise':`Schnellreise ab ${REISE_MIN} entdeckten Orten`;
  L.querySelectorAll('.kort.go').forEach(b=>b.onclick=()=>{if(busy||changing)return;const g=KORT.find(k=>k.k===b.dataset.go),id=g&&ziel(g);if(!id)return;closeO();FL.reisen=(FL.reisen||0)+1;enter(id,TTELE[id])})}

// Karte vormalen, solange der Titelbildschirm steht (das Malen dauert einen Moment – dort stört es nicht, im Spiel öffnet M dann sofort)
{const vor=()=>{if(KARTE_BG||!$('#start')||/durchlauf/.test(location.search))return;try{karteBild()}catch(e){console.warn('Karte vormalen',e)}};
  setTimeout(()=>window.requestIdleCallback?requestIdleCallback(vor,{timeout:3000}):vor(),6000)}

// ---------- ins Notizbuch einhängen ----------
{const _ob=openBook;openBook=function(tab){const r=_ob.apply(this,arguments);tab=tab||'tasche';if(!ovl)return r;const bb=ovl.querySelector('.bbody');if(!bb)return r;
  if(tab==='tasche'){bb.innerHTML=buendelHTML();buendelVerdrahten(ovl)}
  if(tab==='karte'){bb.innerHTML=karteHTML();karteMalen(ovl)}return r}}
(function(){const css=document.createElement('style');css.textContent=`
.bbody.b-tasche,.bbody.b-karte{padding:10px 12px;display:flex;align-items:center;justify-content:center}
.buendel{position:relative;width:100%;max-width:900px;aspect-ratio:900/560;background-size:100% 100%;border-radius:6px;display:flex;flex-direction:column}
.bknoepfe{display:flex;align-items:center;justify-content:center;gap:14px;padding:3.2% 12% 0}
.bknoepfe .bk{display:flex;align-items:center;gap:6px;padding:5px 12px;border-radius:16px;border:2px dashed #e8b12a;background:#2f7d3a;color:#f6e6c0;font:bold 13px Georgia,serif;cursor:pointer;box-shadow:0 2px 0 #1d4a22}
.bknoepfe .bk.on{background:#e8b12a;color:#3a1408;border-style:solid;box-shadow:0 0 12px rgba(255,210,90,.7)}.bknoepfe .bk svg,.bknoepfe .bk img{width:18px;height:18px}
.bkmitte{flex:1;text-align:center;font:italic bold 18px Georgia,serif;color:#f6e6c0;text-shadow:0 2px 3px rgba(0,0,0,.7)}
.bsachen{flex:1;display:flex;flex-wrap:wrap;align-content:flex-start;justify-content:center;gap:3% 2.5%;padding:4% 13% 0;overflow:auto}
.bsache{width:14.5%;aspect-ratio:1;border:0;background:none;cursor:pointer;padding:0;transition:transform .12s;filter:drop-shadow(0 6px 5px rgba(40,0,0,.65))}
.bsache img{width:100%;height:100%;object-fit:contain}.bsache:hover{transform:translateY(-4px) scale(1.08)}.bsache.sel{transform:scale(1.12);filter:drop-shadow(0 0 10px #ffd25a) drop-shadow(0 0 3px #fff3b0)}
.bleer{color:#f6e6c0;font:italic 18px Georgia,serif;margin-top:10%;text-shadow:0 2px 3px #000}
.bzeile{margin:0 11% 5.5%;min-height:46px;padding:8px 14px;background:rgba(20,6,4,.72);border:1px solid rgba(232,177,42,.6);border-radius:8px;color:#f6e6c0;font:15px Georgia,serif;line-height:1.35}
.bzeile b{color:#ffd25a;margin-right:6px}
.kmap{position:relative;width:100%;max-width:1000px}
.kview{position:relative;overflow:hidden;aspect-ratio:${KW}/${KH};border-radius:3px;box-shadow:0 8px 24px rgba(0,0,0,.65);touch-action:none}.kview.gross{cursor:grab}.kview.gross:active{cursor:grabbing}
.kinner{position:absolute;inset:0;transform-origin:0 0;--iz:calc(1 / var(--z,1))}.kmap .kcv{width:100%;height:100%;display:block}
.korte{position:absolute;inset:0}
.kzoom{position:absolute;right:3.4%;top:5.6%;display:flex;flex-direction:column;gap:5px;z-index:2}
.kzoom button{width:30px;height:30px;padding:0;border-radius:50%;border:2px solid #6a4418;background:radial-gradient(circle at 40% 35%,#fbecb8,#c89a40);color:#3a2208;font:bold 18px/24px Georgia,serif;cursor:pointer;box-shadow:0 2px 5px rgba(0,0,0,.55)}
.kzoom button:hover:not(:disabled){filter:brightness(1.1)}.kzoom button:disabled{opacity:.4;cursor:default}
.khilfe{text-align:center;font:italic 12px Georgia,serif;opacity:.6;margin-top:3px}
.kort{position:absolute;width:7%;height:12%;transform:translate(-50%,-62%);border:0;background:none;border-radius:50%;cursor:default}
.kort.go{cursor:pointer}.kort.go:hover{background:radial-gradient(rgba(255,220,120,.45),rgba(255,220,120,0) 70%)}
.knadel{position:absolute;left:50%;top:-6%;width:16px;height:16px;margin-left:-8px;border-radius:50% 50% 50% 0;transform:rotate(-45deg) scale(var(--iz,1));background:#c0201a;border:2px solid #fff3d0;box-shadow:0 0 0 0 rgba(255,80,40,.7);animation:knp 1.4s ease-out infinite}
@keyframes knp{0%{box-shadow:0 0 0 0 rgba(255,80,40,.7)}100%{box-shadow:0 0 0 16px rgba(255,80,40,0)}}
.kfertig{position:absolute;right:-4%;top:-8%;transform:scale(var(--iz,1));width:18px;height:18px;border-radius:50%;background:#3a7a3a;border:2px solid #f0e0c0;color:#e8ffe0;font:bold 12px/14px Georgia;font-style:normal;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.5)}
.kfuss{text-align:center;font:italic 14px Georgia,serif;opacity:.85;margin-top:8px}`;document.head.appendChild(css)})();
