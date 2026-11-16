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

// ================= 2) Gemalte Karte =================
const KW=1000,KH=540,KX=mx=>(mx+44)/232*KW,KY=my=>(my+2)/124*KH+6;   // Kartenkoordinaten (MAPN) → Leinwand
let KARTE_BG=null;
function karteBild(){if(KARTE_BG)return KARTE_BG;const c=document.createElement('canvas');c.width=KW;c.height=KH;const x=c.getContext('2d'),r=_rnd(42);
  // Pergament mit Flecken und angekokeltem Rand
  const g=x.createRadialGradient(KW/2,KH/2,100,KW/2,KH/2,620);g.addColorStop(0,'#efdcae');g.addColorStop(.75,'#ddc18a');g.addColorStop(1,'#a8844c');x.fillStyle=g;x.fillRect(0,0,KW,KH);
  for(let i=0;i<5000;i++){x.fillStyle=`rgba(${100+r()*60},${70+r()*40},30,${r()*.06})`;x.fillRect(r()*KW,r()*KH,1+r()*2,1+r()*2)}
  for(let i=0;i<14;i++)_glow(x,r()*KW,r()*KH,30+r()*70,'140,100,50',.10);
  // Gelände: Wiesen, Wälder, See, Sumpf, Berg
  const P=id=>[KX(MAPN[id][0]),KY(MAPN[id][1])];
  for(let i=0;i<26;i++)_blob(x,r()*KW,r()*KH,60+r()*90,30+r()*50,`rgba(${120+r()*30},${150+r()*30},80,.18)`,r);
  // See unten rechts
  {const[a,b]=P('ufer');x.save();_blob(x,a-10,b+20,170,70,'#7fa7b8',r,22);_blob(x,a-10,b+20,150,58,'#8fb6c6',r,22);x.strokeStyle='rgba(40,70,90,.5)';x.lineWidth=2;
    for(let i=0;i<14;i++){const xx=a-150+r()*280,yy=b-20+r()*70;x.beginPath();x.moveTo(xx,yy);x.quadraticCurveTo(xx+7,yy-4,xx+14,yy);x.stroke()}x.restore()}
  // Sumpf
  {const[a,b]=P('sumpf');_blob(x,a,b+4,62,34,'#6f7a4a',r);_blob(x,a,b+4,48,24,'#556236',r);for(let i=0;i<16;i++){const xx=a-50+r()*100,yy=b-18+r()*40;x.strokeStyle='#4a5a2a';x.lineWidth=2;x.beginPath();x.moveTo(xx,yy);x.lineTo(xx+r()*4-2,yy-14);x.stroke();x.fillStyle='#6a4a2a';x.fillRect(xx-1.5,yy-18,3,6)}}
  // Berg mit Höhle
  {const[a,b]=P('hoehle');x.fillStyle='#8a7a68';x.beginPath();x.moveTo(a-70,b+26);x.lineTo(a-20,b-50);x.lineTo(a+10,b-30);x.lineTo(a+40,b-62);x.lineTo(a+80,b+26);x.fill();x.fillStyle='#a8978a';x.beginPath();x.moveTo(a-20,b-50);x.lineTo(a-6,b-20);x.lineTo(a+10,b-30);x.fill();
    x.fillStyle='#2a201a';x.beginPath();x.ellipse(a+6,b+12,14,16,0,Math.PI,0);x.fill();x.fillRect(a-8,b+12,28,8)}
  // Wälder: Birken (hell) und dunkler Tann (Irrwald, Sperre)
  const birke=(a,b,s)=>{x.fillStyle='#f2efe6';x.fillRect(a-1.5*s,b-18*s,3*s,18*s);x.fillStyle='#222';for(let k=0;k<3;k++)x.fillRect(a-1.5*s,b-(4+k*5)*s,2*s,1.2*s);x.fillStyle=`rgb(${90+r()*30},${140+r()*30},${60+r()*20})`;x.beginPath();x.ellipse(a,b-22*s,7*s,10*s,0,0,7);x.fill()};
  const tanne=(a,b,s)=>{x.fillStyle='#2e3e2a';x.beginPath();x.moveTo(a,b-26*s);x.lineTo(a+8*s,b-4*s);x.lineTo(a-8*s,b-4*s);x.fill();x.fillStyle='#3a2a1a';x.fillRect(a-1.2*s,b-4*s,2.4*s,5*s)};
  const wald=(cx,cy,w,h,f,n)=>{const L=[];for(let i=0;i<n;i++)L.push([cx-w/2+r()*w,cy-h/2+r()*h]);L.sort((p,q)=>p[1]-q[1]).forEach(([a,b])=>f(a,b,.9+r()*.5))};
  {const[a,b]=P('wald');wald(a,b+4,110,60,birke,22)}{const[a,b]=P('gabel');wald(a+10,b-14,70,30,birke,9)}
  {const[a,b]=P('irrwald');wald(a,b,110,56,tanne,26)}{const[a,b]=P('sperre');wald(a+4,b-6,80,40,tanne,14)}
  wald(KX(-30),KY(100),120,60,birke,16);wald(KX(150),KY(40),130,60,birke,18);wald(KX(110),KY(30),40,40,birke,6);
  // Feldwege (MAPE) – breite, unregelmäßige Erdwege mit Steinchen
  MAPE.forEach(([p,q])=>{const[a,b]=P(p),[c2,d]=P(q),mxp=(a+c2)/2+(r()-.5)*24,myp=(b+d)/2+(r()-.5)*24;x.lineCap='round';
    x.strokeStyle='#8a6a3e';x.lineWidth=12;x.beginPath();x.moveTo(a,b);x.quadraticCurveTo(mxp,myp,c2,d);x.stroke();
    x.strokeStyle='#c8a46a';x.lineWidth=7;x.stroke();x.strokeStyle='rgba(120,90,50,.45)';x.lineWidth=1.4;x.setLineDash([2,7]);x.stroke();x.setLineDash([])});
  // Vignetten der Orte
  const izba=(a,b,s,dach='#7a4a2a')=>{x.fillStyle='#8a5a32';x.fillRect(a-10*s,b-10*s,20*s,12*s);x.fillStyle=dach;x.beginPath();x.moveTo(a-13*s,b-9*s);x.lineTo(a,b-20*s);x.lineTo(a+13*s,b-9*s);x.fill();x.fillStyle='#f2d070';x.fillRect(a-3*s,b-7*s,5*s,4*s);for(let k=0;k<3;k++){x.fillStyle='rgba(50,25,10,.4)';x.fillRect(a-10*s,b-(7-k*4)*s,20*s,.8*s)}};
  const V={
    wald:(a,b)=>{x.fillStyle='#d8302a';x.beginPath();x.ellipse(a+14,b+8,8,5,0,Math.PI,0);x.fill();x.fillStyle='#fff';[[10,6],[16,5],[19,7]].forEach(([u,v])=>{x.beginPath();x.arc(a+u,b+v,1.3,0,7);x.fill()});x.fillStyle='#f0e8d8';x.fillRect(a+12,b+8,4,6)},
    gabel:(a,b)=>{x.fillStyle='#5a3a1e';x.fillRect(a-1.5,b-22,3,24);x.fillRect(a-14,b-20,14,5);x.fillRect(a+1,b-14,14,5)},
    huette:(a,b)=>{x.strokeStyle='#d8a040';x.lineWidth=2.4;x.beginPath();x.moveTo(a-6,b+4);x.lineTo(a-9,b+14);x.lineTo(a-14,b+16);x.moveTo(a+6,b+4);x.lineTo(a+9,b+14);x.lineTo(a+14,b+16);x.stroke();izba(a,b+4,1,'#9a8a5a')},
    innen:(a,b)=>{x.fillStyle='#2a2422';x.beginPath();x.ellipse(a,b,13,9,0,0,Math.PI);x.fill();x.fillRect(a-13,b-3,26,4);_glow(x,a,b+12,14,'255,140,40',.6);x.fillStyle='rgba(120,200,90,.8)';x.beginPath();x.arc(a-4,b-6,3,0,7);x.arc(a+5,b-9,2.4,0,7);x.fill()},
    dorf:(a,b)=>{izba(a-16,b+2,1);izba(a+14,b-2,1.1);izba(a,b+10,.9)},
    dorfstr:(a,b)=>{izba(a+10,b+2,1);for(let k=0;k<3;k++){const u=a-16+k*7;x.strokeStyle='#4a7a2a';x.lineWidth=1.5;x.beginPath();x.moveTo(u,b+8);x.lineTo(u,b-8);x.stroke();x.fillStyle='#f0c020';x.beginPath();x.arc(u,b-10,4,0,7);x.fill();x.fillStyle='#5a3a12';x.beginPath();x.arc(u,b-10,1.8,0,7);x.fill()}},
    kirche:(a,b)=>{x.fillStyle='#8a5a32';x.fillRect(a-12,b-12,24,16);x.fillStyle='#6a4024';x.fillRect(a-4,b-24,8,12);x.fillStyle='#e8b830';x.beginPath();x.moveTo(a,b-38);x.quadraticCurveTo(a+9,b-30,a+5,b-24);x.lineTo(a-5,b-24);x.quadraticCurveTo(a-9,b-30,a,b-38);x.fill();x.strokeStyle='#e8b830';x.lineWidth=1.5;x.beginPath();x.moveTo(a,b-38);x.lineTo(a,b-44);x.moveTo(a-3,b-42);x.lineTo(a+3,b-42);x.stroke()},
    muehle:(a,b)=>{x.fillStyle='#8a5a32';x.fillRect(a-10,b-14,18,18);x.fillStyle='#5a3a1e';x.beginPath();x.moveTo(a-13,b-13);x.lineTo(a-1,b-24);x.lineTo(a+11,b-13);x.fill();x.strokeStyle='#4a2a14';x.lineWidth=2;x.beginPath();x.arc(a+13,b-2,9,0,7);x.stroke();for(let k=0;k<6;k++){const w=k/6*Math.PI*2;x.beginPath();x.moveTo(a+13,b-2);x.lineTo(a+13+Math.cos(w)*9,b-2+Math.sin(w)*9);x.stroke()}},
    irrwald:(a,b)=>{x.fillStyle='rgba(255,240,120,.9)';[[-8,0],[-4,0],[10,6],[14,6]].forEach(([u,v])=>{x.beginPath();x.arc(a+u,b+v,1.6,0,7);x.fill()})},
    banjaV:(a,b)=>{izba(a,b,1.2,'#4a2a3a');_glow(x,a,b-12,22,'255,60,170',.55);x.fillStyle='#ff5ab4';x.font='bold 9px Georgia';x.textAlign='center';x.fillText('BANJA',a,b-24)},
    banja:(a,b)=>{x.fillStyle='#e0c040';[[-8,4],[0,0],[8,4]].forEach(([u,v])=>{x.fillRect(a+u-1.5,b+v-8,3,9);x.beginPath();x.arc(a+u,b+v-9,2,0,7);x.fill()});_glow(x,a,b,16,'255,80,180',.35)},
    sperre:(a,b)=>{x.strokeStyle='#f0ece0';x.lineWidth=4;x.beginPath();x.moveTo(a-16,b-6);x.lineTo(a+14,b+8);x.moveTo(a-14,b+8);x.lineTo(a+16,b-6);x.stroke();x.strokeStyle='#222';x.lineWidth=1;x.beginPath();x.moveTo(a-6,b-1);x.lineTo(a-4,b);x.moveTo(a+6,b+3);x.lineTo(a+8,b+4);x.stroke()},
    sumpf:(a,b)=>{x.fillStyle='rgba(220,240,220,.8)';[[-10,0],[8,-2]].forEach(([u,v])=>{x.beginPath();x.ellipse(a+u,b+v,3,6,0,0,7);x.fill();x.beginPath();x.arc(a+u,b+v-8,2.6,0,7);x.fill()})},
    fischer:(a,b)=>{izba(a-8,b,1);x.fillStyle='#7a5a32';x.fillRect(a+2,b+4,24,4);[6,14,22].forEach(u=>x.fillRect(a+u,b+8,2,8))},
    ufer:(a,b)=>{x.fillStyle='#6a4024';x.beginPath();x.moveTo(a-14,b);x.quadraticCurveTo(a,b+10,a+14,b);x.closePath();x.fill();x.strokeStyle='#4a2a14';x.lineWidth=1.5;x.beginPath();x.moveTo(a-4,b+1);x.lineTo(a+6,b-8);x.stroke()},
    unter:(a,b)=>{x.fillStyle='rgba(230,245,255,.8)';[[-6,0,3],[2,-6,2.2],[6,2,1.6]].forEach(([u,v,s])=>{x.beginPath();x.arc(a+u,b+v,s,0,7);x.fill()});x.fillStyle='#5a4024';x.fillRect(a-14,b-14,28,3)},
    gnome:(a,b)=>{[[-12,4,1],[10,0,1.2]].forEach(([u,v,s])=>{x.fillStyle='#7a6a3a';x.beginPath();x.ellipse(a+u,b+v,9*s,8*s,0,Math.PI,0);x.fill();x.fillStyle='#5a3a1e';x.fillRect(a+u-2*s,b+v-5*s,4*s,5*s)});x.fillStyle='#c0302a';x.beginPath();x.moveTo(a,b-14);x.lineTo(a+4,b-2);x.lineTo(a-4,b-2);x.fill()},
    hoehle:()=>{},
    banjaH:(a,b)=>{x.fillStyle='#6a4a2a';x.fillRect(a-12,b-6,10,9);x.fillRect(a,b-3,9,6);x.strokeStyle='#3a2210';x.lineWidth=1;x.strokeRect(a-12,b-6,10,9);x.strokeRect(a,b-3,9,6);_glow(x,a,b-12,12,'255,60,170',.4)},
    schmiede:(a,b)=>{x.fillStyle='#3a3a3e';x.fillRect(a-10,b-2,20,5);x.fillRect(a-5,b+3,10,7);x.beginPath();x.moveTo(a+10,b-2);x.lineTo(a+16,b);x.lineTo(a+10,b+3);x.fill();_glow(x,a-14,b-6,12,'255,140,40',.7)},
    garten:(a,b)=>{[[-10,2],[0,-2],[10,3]].forEach(([u,v])=>{x.fillStyle='#7aa84a';x.beginPath();x.arc(a+u,b+v,6,0,7);x.fill();x.fillStyle='#a8d070';x.beginPath();x.arc(a+u,b+v,3,0,7);x.fill()})}};
  Object.keys(MAPN).forEach(id=>{const[a,b]=P(id);x.save();x.translate(a,b-14);x.scale(1.75,1.75);(V[id]||(()=>{}))(0,0);x.restore()});
  // Windrose und Titel-Kartusche
  {const a=KW-70,b=KH-70;x.save();x.translate(a,b);x.strokeStyle='#5a3a1e';x.fillStyle='#5a3a1e';x.lineWidth=1.5;x.beginPath();x.arc(0,0,28,0,7);x.stroke();
    for(let k=0;k<4;k++){x.rotate(Math.PI/2);x.beginPath();x.moveTo(0,-34);x.lineTo(6,0);x.lineTo(-6,0);x.fill()}x.font='bold 13px Georgia';x.textAlign='center';x.fillText('N',0,-40);x.restore()}
  {x.save();x.translate(250,KH-34);x.fillStyle='#c8a46a';x.strokeStyle='#5a3a1e';x.lineWidth=2;x.beginPath();x.moveTo(-190,-18);x.lineTo(190,-18);x.lineTo(206,0);x.lineTo(190,18);x.lineTo(-190,18);x.lineTo(-206,0);x.closePath();x.fill();x.stroke();
    x.fillStyle='#3a2210';x.font='italic bold 20px Georgia';x.textAlign='center';x.textBaseline='middle';x.fillText('Der Verfluchte Birkenwald',0,1);x.restore()}
  // angekokelter Rand
  const rd=x.createRadialGradient(KW/2,KH/2,KH*.42,KW/2,KH/2,KW*.62);rd.addColorStop(0,'rgba(60,30,10,0)');rd.addColorStop(1,'rgba(60,30,10,.55)');x.fillStyle=rd;x.fillRect(0,0,KW,KH);
  KARTE_BG=c;return c}
function karteHTML(){return`<div class="kmap"><canvas class="kcv" width="${KW}" height="${KH}"></canvas><div class="korte"></div><div class="kfuss"></div></div>`}
function karteMalen(o){const M=o.querySelector('.kmap');if(!M)return;const cv2=M.querySelector('.kcv'),x=cv2.getContext('2d'),r=_rnd(9);x.drawImage(karteBild(),0,0);
  // Nebel über unbekannten Orten (und Orte daneben mit „?“)
  const nachbar=new Set();MAPE.forEach(([a,b])=>{if(seen[a]&&!seen[b])nachbar.add(b);if(seen[b]&&!seen[a])nachbar.add(a)});
  Object.keys(MAPN).forEach(id=>{if(seen[id])return;const a=KX(MAPN[id][0]),b=KY(MAPN[id][1]);for(let i=0;i<7;i++)_glow(x,a+(r()-.5)*60,b+(r()-.5)*40,46+r()*26,'236,230,215',.55);
    if(nachbar.has(id)){x.fillStyle='rgba(90,60,30,.85)';x.font='bold 26px Georgia';x.textAlign='center';x.textBaseline='middle';x.fillText('?',a,b)}});
  // Ortsnamen auf Bändern
  x.textAlign='center';x.textBaseline='middle';Object.keys(MAPN).forEach(id=>{if(!seen[id])return;const a=KX(MAPN[id][0]),b=KY(MAPN[id][1])+24,t=LOCN[id];x.font='italic bold 15px Georgia';const w=x.measureText(t).width+14;
    x.fillStyle='rgba(240,225,190,.9)';x.strokeStyle='rgba(90,58,30,.8)';x.lineWidth=1;x.beginPath();x.moveTo(a-w/2,b-10);x.lineTo(a+w/2,b-10);x.lineTo(a+w/2+6,b);x.lineTo(a+w/2,b+10);x.lineTo(a-w/2,b+10);x.lineTo(a-w/2-6,b);x.closePath();x.fill();x.stroke();
    x.fillStyle=id===cur?'#a01810':'#3a2210';x.fillText(t,a,b+.5)});
  // Klickflächen + „Du bist hier“-Nadel (HTML über der Leinwand)
  const L=M.querySelector('.korte'),reise=reiseOrte().length>=REISE_MIN,offen=typeof openRooms=='function'?openRooms():null;   // ✓ = hier gibt’s gerade nichts zu tun (09b-hinweise.js)
  L.innerHTML=Object.keys(MAPN).filter(id=>seen[id]).map(id=>{const a=KX(MAPN[id][0])/KW*100,b=KY(MAPN[id][1])/KH*100,ok=reise&&reiseOk(id);
    return`<button class="kort ${id===cur?'hier':''} ${ok?'go':''}" data-go="${id}" style="left:${a}%;top:${b}%" title="${LOCN[id]}">${id===cur?'<i class="knadel"></i>':''}${offen&&!offen.has(id)?'<i class="kfertig" title="Hier gibt’s gerade nichts zu tun">✓</i>':''}</button>`}).join('');
  M.querySelector('.kfuss').textContent=reise?'Klick auf einen besuchten Ort: Schnellreise':`Schnellreise ab ${REISE_MIN} entdeckten Orten`;
  L.querySelectorAll('.kort.go').forEach(b=>b.onclick=()=>{if(busy||changing)return;const id=b.dataset.go;closeO();FL.reisen=(FL.reisen||0)+1;enter(id,TTELE[id])})}

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
.kmap{position:relative;width:100%;max-width:1000px;aspect-ratio:${KW}/${KH+34}}.kmap .kcv{width:100%;display:block;border-radius:6px;box-shadow:0 6px 18px rgba(0,0,0,.6);border:3px solid #6a4418}
.korte{position:absolute;left:3px;top:3px;right:3px;aspect-ratio:${KW}/${KH}}
.kort{position:absolute;width:7%;height:12%;transform:translate(-50%,-62%);border:0;background:none;border-radius:50%;cursor:default}
.kort.go{cursor:pointer}.kort.go:hover{background:radial-gradient(rgba(255,220,120,.45),rgba(255,220,120,0) 70%)}
.knadel{position:absolute;left:50%;top:-6%;width:16px;height:16px;margin-left:-8px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#c0201a;border:2px solid #fff3d0;box-shadow:0 0 0 0 rgba(255,80,40,.7);animation:knp 1.4s ease-out infinite}
@keyframes knp{0%{box-shadow:0 0 0 0 rgba(255,80,40,.7)}100%{box-shadow:0 0 0 16px rgba(255,80,40,0)}}
.kfertig{position:absolute;right:-4%;top:-8%;width:18px;height:18px;border-radius:50%;background:#3a7a3a;border:2px solid #f0e0c0;color:#e8ffe0;font:bold 12px/14px Georgia;font-style:normal;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.5)}
.kfuss{text-align:center;font:italic 14px Georgia,serif;opacity:.85;margin-top:8px}`;document.head.appendChild(css)})();
