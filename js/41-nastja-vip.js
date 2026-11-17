// ================= Nastja: VIP-Kabine (alte Einzelszene) =================
// Seit 2.31 läuft jeder Privattanz über die Engine in 49-nastja-show.js (Outfit nach Beziehung: 25 Standard, 50 VIP, 80 Dessous).
// Diese Szene bleibt als Vorlage erhalten (z. B. für den Tester), wird aber vom Menü nicht mehr aufgerufen.
// Statt des normalen Privattanzes läuft eine eigene Szene als kleiner Zustandsautomat:
//   TRANSITION_PREP  – kokette Ansage, Kabarett-Pose (vorgebeugt, Hohlkreuz)
//   OUTFIT_SWAP      – Petja macht die Augen zu (eyes_closed) → sie zieht sich um (swap_sprite) → Augen auf, ihre sind noch zu
//   VIP_REVEAL       – Augen auf (zwinkert, Braue hoch), dann die enge Sofa-Choreografie und die letzte Pointe
// Bilder: NASTJA_VIP_IMG[0] zwinkernd, [1] Augen zu (40-nastja-vip-pixel.js); vorher die normalen Tanzbilder.
const nastjaVipStufe=()=>relOf('Nastja')>=50;

const VIP_PHASEN=[   // [Zustand, Start in s, Sprite-Schritt]
  ['TRANSITION_PREP',0,null],
  ['OUTFIT_SWAP',5.2,'eyes_closed'],
  ['OUTFIT_SWAP',6.1,'swap_sprite'],
  ['VIP_REVEAL',9.4,'eyes_open'],
  ['SOFA',11.2,'eyes_open'],
  ['ENDE',25,null]];
const VIP_TEXT={   // Zeile beim Betreten eines Schritts (auf Englisch/Russisch über lang/src/*/41.txt)
  0.9:[['NA','Mach es dir bequem, Süßer … gleich wird es hier drin deutlich wärmer.']],
  5.4:[['NA','*haucht* Augen zu, Zwiebel. … Meine sind auch zu. Das ist nur gerecht.']],
  6.6:[['P','*hört Strapse schnalzen* … *SCHLUCK*']],
  9.5:[['NA','*öffnet ein Auge, zieht die Braue hoch* Na? Das hier hat Zinaida verboten. Herzinfarkte sind schlecht fürs Geschäft.']],
  14.6:[['P','Ich … äh … meine Hände sind auf dem Sofa. Beide. Glaub ich.']],
  18.2:[['NA','*haucht* Ganz ruhig atmen, Süßer. Wenn du jetzt umkippst, tanz ich trotzdem zu Ende. Und morgen erzähl ich allen, du hättest gebettelt.']]};

async function nastjaVip(){const VON=cur||'buehne',VPOS=cur?[P.x,P.y]:[260,486];changing=true;fade.style.opacity=1;await new Promise(r=>setTimeout(r,450));S0=SCN.lounge;s=S0.seed;
  if(!cache.lounge){S0.paint();const k=document.createElement('canvas');k.width=W;k.height=H;k.getContext('2d').drawImage(cv,0,0);cache.lounge=k}
  const cv3=document.createElement('canvas');cv3.id='cut';cv3.width=W;cv3.height=H;cv3.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:15';$('#game').appendChild(cv3);fade.style.opacity=0;
  const x=cv3.getContext('2d'),T0=performance.now(),said=new Set();let fin=false,zustand='',schritt=null;
  const ease=(a,b,p)=>a+(b-a)*(p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2),seg=(t,a,b)=>Math.max(0,Math.min(1,(t-a)/(b-a)));
  const glow=(X,Y,r,c,a)=>{const g=x.createRadialGradient(X,Y,0,X,Y,r);g.addColorStop(0,`rgba(${c},${a})`);g.addColorStop(1,`rgba(${c},0)`);x.fillStyle=g;x.fillRect(X-r,Y-r,r*2,r*2)};
  // Petjas Augenlider (Ich-Sicht): k = 0 offen … 1 zu; durch die Lider schimmert das rote Licht
  // Lidspalt wie ein Auge: in der Mitte am weitesten offen, an den Rändern enger; bei k = 1 ganz zu
  function lider(k,t){if(k<=0)return;x.fillStyle=k>=1?`rgb(${26+Math.sin(t*2)*6|0},4,8)`:'#120206';if(k>=1){x.fillRect(-10,-10,820,520);return}
    const h=(1-k)*290,f=.35+.65*(1-k)*(1-k),M=215,side=h*f,ctl=2*h-side;   // h: halbe Öffnung in der Mitte, side: an den Rändern
    x.beginPath();x.moveTo(-10,-10);x.lineTo(810,-10);x.lineTo(810,M-side);x.quadraticCurveTo(400,M-ctl,-10,M-side);x.fill();
    x.beginPath();x.moveTo(-10,510);x.lineTo(810,510);x.lineTo(810,M+side);x.quadraticCurveTo(400,M+ctl,-10,M+side);x.fill();
    if(k<1){const g=x.createLinearGradient(0,0,0,500);g.addColorStop(0,'rgba(20,0,6,.5)');g.addColorStop(.5,'rgba(20,0,6,0)');g.addColorStop(1,'rgba(20,0,6,.5)');x.fillStyle=g;x.globalAlpha=k;x.fillRect(0,0,800,500);x.globalAlpha=1}}
  function frame(){if(fin)return;const t=(performance.now()-T0)/1000;
    // ---- Zustand bestimmen (Phasen-Tabelle), Text beim Eintritt ----
    let i=VIP_PHASEN.length-1;while(i>0&&t<VIP_PHASEN[i][1])i--;zustand=VIP_PHASEN[i][0];schritt=VIP_PHASEN[i][2];
    for(const k in VIP_TEXT)if(t>=+k&&!said.has(k)){said.add(k);if(busy)advance();say(VIP_TEXT[k])}
    if(zustand==='ENDE'){fin=true;return ende()}
    x.setTransform(1,0,0,1,0,0);x.filter='blur('+(1.5*SC)+'px)';
    x.save();x.translate(W/2,H/2);x.scale(1.5,1.5);x.translate(-W/2,-H*.45);x.drawImage(cache.lounge,0,0);x.restore();x.filter='none';
    x.setTransform(SC,0,0,SC,0,0);
    let px=400,py=520,sc=1.5,rot=0,bild=null,sit=false,vk=0,blitz=0;
    if(zustand==='TRANSITION_PREP'){px=ease(-60,400,seg(t,0,2.2));
      if(t<2.2)bild=nastjaTanzBild('tanz1');
      else{const u=t-2.2;bild=nastjaTanzBild('tanz8');rot=Math.sin(u*3.2)*.06;py=520-Math.abs(Math.sin(u*3.2))*8;px=400+Math.sin(u*1.6)*16}}   // vorgebeugt, Hohlkreuz, Hüfte
    else if(zustand==='OUTFIT_SWAP'){
      // eyes_closed: Petja macht die Augen zu (5,2–6,1) · swap_sprite: sie zieht sich um, er blinzelt 7,8–8,9 wieder auf – ihre Augen bleiben zu
      const p=seg(t,7.8,8.9);vk=t<6.1?ease(0,1,seg(t,5.2,6.1)):t<7.8?1:p<.4?1-p/.4*.6:p<.55?.4+(p-.4)/.15*.45:.85*(1-(p-.55)/.45);
      bild=schritt==='eyes_closed'?nastjaTanzBild('tanz8'):NASTJA_VIP_IMG[1];
      if(schritt==='swap_sprite'){const u=t-6.1;rot=Math.sin(u*1.4)*.025;py=520-Math.sin(u*1.4)*3}}
    else if(zustand==='VIP_REVEAL'){const u=t-9.4;bild=NASTJA_VIP_IMG[0];blitz=Math.max(0,1-u*2.2);sc=1.5+.06*Math.sin(Math.min(1,u*3)*Math.PI);rot=Math.sin(u*2.6)*.04}
    else if(zustand==='SOFA'){const u=t-11.2,a=seg(t,11.2,13.4),b=seg(t,16.5,18.2),sway=Math.sin(u*2.4);bild=NASTJA_VIP_IMG[0];
      // kommt ganz nah ans Sofa (Beine laufen unten aus dem Bild), sitzt auf, wippt, rückt dann noch näher
      sit=a>.85;sc=b>0?ease(2.7,3.25,b):ease(1.5,2.7,a);py=b>0?ease(800,930,b):ease(520,800,a);
      const bob=sit?Math.abs(Math.sin(u*4.2))*(11-5*b):0;py-=bob;px=400+sway*(sit?16:24);rot=sway*(sit?.035:.05)}
    if(sit){fpKnees(x);x.fillStyle='#55688f';x.beginPath();x.ellipse(400,540,150,70,0,0,7);x.fill()}
    x.save();x.translate(px,py);x.rotate(rot);x.scale(sc,sc);
    if(bild&&bild.complete&&bild.naturalWidth){const vip=bild===NASTJA_VIP_IMG[0]||bild===NASTJA_VIP_IMG[1];x.imageSmoothingEnabled=false;x.drawImage(bild,...(vip?NASTJA_VIP_G:NASTJA_TG));x.imageSmoothingEnabled=true}
    x.restore();
    if(!sit)fpKnees(x);
    // Glitzer beim Enthüllen
    if(blitz>0){x.save();x.globalCompositeOperation='lighter';glow(400,280,320,'255,200,230',.5*blitz);x.restore()}
    if(zustand==='VIP_REVEAL'||zustand==='SOFA'){x.save();x.globalCompositeOperation='lighter';for(let j=0;j<9;j++){const p=((t-9.4)*.4+j/9)%1,X=400+Math.sin(j*7.1)*260,Y=440-p*380;
      x.fillStyle=`rgba(255,235,200,${.8*(1-p)})`;x.save();x.translate(X,Y);x.rotate(t*2+j);x.fillRect(-4,-.8,8,1.6);x.fillRect(-.8,-4,1.6,8);x.restore()}x.restore()}
    x.save();x.globalCompositeOperation='lighter';for(let j=0;j<4;j++){const p=(t*.25+j/4)%1;x.fillStyle=`rgba(255,180,220,${.6*(1-p)})`;x.font='22px Georgia';x.fillText('♪',120+j*170+Math.sin(t+j)*20,420-p*300)}x.restore();
    const v=x.createRadialGradient(400,250,150,400,250,520);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(20,0,10,.7)');x.fillStyle=v;x.fillRect(0,0,800,500);
    lider(vk,t);
    requestAnimationFrame(frame)}
  requestAnimationFrame(frame);
  async function ende(){if(busy)advance();fade.style.opacity=1;await new Promise(r=>setTimeout(r,500));changing=false;x.setTransform(1,0,0,1,0,0);x.fillStyle='rgba(12,0,6,.72)';x.fillRect(0,0,W,H);
    say([['P','*Fünf Minuten später*'],['P','(Ich glaube, ich hab vergessen, wie man atmet. Und wie ich heiße.)'],
      ['NA','*zwinkert* Das Outfit bleibt unter uns, Zwiebel. Sonst muss ich dich heiraten. Oder umbringen. Je nach Laune.']],()=>{cv3.remove();FL.lounge=1;FL.naVip=(FL.naVip||0)+1;enter(VON,VPOS)});fade.style.opacity=0}}
// Privattanz im Menü und Menü-Kopf: siehe 49-nastja-show.js
