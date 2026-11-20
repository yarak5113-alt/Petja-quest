// ================= Nastja: „Kleiner Unfall“ in der Privat-Lounge (Ich-Sicht, einmalig ab Beziehung 60) =================
// Läuft mitten im Privattanz (49-nastja-show.js ruft naBeuleStart() auf und hängt die Hooks tick/pose/ruhe/zeichne/vorne/oben ein).
// Bedingung: Outfit VIP oder Dessous, relOf('Nastja') >= NASTJA_BEULE, noch nicht gesehen (FL.na_beule), kein Auto-Durchlauf.
//
// Ablauf (b = Szenen-Uhr in s; die Tanz-Choreografie steht so lange still). Die Szenen-Uhr HÄLT AN JEDER TEXTZEILE AN und läuft
// erst weiter, wenn der Spieler die Zeile weggeklickt hat (Klick oder Leertaste) – keine Animation läuft dem Text davon.
//   0,4–2,6   Petja kriegt eine Beule (Zelt in der Hose zwischen seinen Knien, Pixel-Sprite wie fpKnees)   → Zeile 2,7
//   3,6–7     Nastja kommt nah heran (Original-Sprite, unverzerrt)                                  → Zeilen 7,1–7,7
//   8–9,4     sie greift zu: IHR ECHTER ARM aus dem Sprite (Oberarm + Unterarm/Hand) per 2-Gelenk-IK zur Beule
//   9,4–12,4  zwei langsame Auf-und-ab-Bewegungen der Hand (HUBE)
//   12,4      Weißblitz; Spritzer und Tropfen auf der „Kameralinse“ laufen ab da in echter Zeit           → Zeile 13,5
//   13,7–16   Arm zurück, sie richtet sich halb auf                                               → Zeilen 16,5–17,3
//   bis 18,9  zurück in die Tanzpose, danach tanzt sie weiter
//
// Der Arm: Für jedes Outfit ist er als Polygon in Sprite-Pixeln eingetragen (NA_ARM). naArmBau() schneidet die Pixel aus,
// teilt sie am Ellbogen in zwei Teile und füllt das Loch im Körper/Haar Schicht für Schicht mit Nachbarpixeln (Onion-Peel).
// Der Körper wird aus diesem Rest-Bild mit dem normalen Rig (naRig/naZeichne) gezeichnet – es gibt also nie eine dritte Hand.
const NASTJA_BEULE=60;

const NA_ARM={
  vip:{S:[116,132],E:[129,190],H:[115,231],poly:[[107,120],[109,130],[110,140],[113,150],[118,158],[121,166],[124,176],[126,186],[126,197],[123,206],[120,213],[117,220],[115,225],[110,227],[106,232],[105,240],
    [108,245],[113,242],[117,239],[121,236],[122,229],[125,225],[128,220],[130,213],[131,206],[132,197],[132,186],[131,176],[129,166],[129,158],[129,150],[126,140],[121,130],[116,122],[111,118]]},
  dessous:{S:[118,124],E:[143,171],H:[117,215],poly:[[113,114],[122,118],[131,130],[138,141],[144,153],[149,164],[150,173],[149,176],[144,187],[137,197],[131,206],[127,216],[120,225],[112,226],[107,219],[107,210],
    [111,208],[122,205],[126,198],[131,186],[137,171],[129,157],[120,146],[111,119]]}};

// ---------- Arm ausschneiden, Loch füllen ----------
function naArmBau(img,def){if(!img||!img.complete||!img.naturalWidth)return null;
  const w=img.naturalWidth,h=img.naturalHeight,mk=()=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c};
  const src=mk(),g=src.getContext('2d');g.drawImage(img,0,0);const id=g.getImageData(0,0,w,h),d=id.data;
  const P=def.poly,innen=(x,y)=>{let r=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const[xi,yi]=P[i],[xj,yj]=P[j];if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)r=!r}return r};
  const arm=new Uint8Array(w*h);for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(innen(x+.5,y+.5))arm[y*w+x]=1;
  // Teilung am Ellbogen: Normale = Richtung Unterarm minus Richtung Oberarm; 2 px Überlappung gegen Lücken
  const[Sx,Sy]=def.S,[Ex,Ey]=def.E,[Hx,Hy]=def.H,nz=(a,b)=>{const l=Math.hypot(a,b)||1;return[a/l,b/l]};
  const u1=nz(Hx-Ex,Hy-Ey),u2=nz(Sx-Ex,Sy-Ey),n=nz(u1[0]-u2[0],u1[1]-u2[1]);
  const ober=mk(),unter=mk(),go=ober.getContext('2d'),gu=unter.getContext('2d'),io=go.createImageData(w,h),iu=gu.createImageData(w,h);
  for(let k=0;k<w*h;k++){if(!arm[k]||d[k*4+3]<128)continue;const x=k%w,y=(k-x)/w,v=(x+.5-Ex)*n[0]+(y+.5-Ey)*n[1];
    for(const[ziel,ok]of[[io,v<=2],[iu,v>=-2]])if(ok)for(let c=0;c<4;c++)ziel.data[k*4+c]=d[k*4+c]}
  go.putImageData(io,0,0);gu.putImageData(iu,0,0);
  // Onion-Peel: unbekannte Pixel übernehmen schichtweise die Farbe eines zufälligen bekannten Nachbarn (auch „leer“ am Rand)
  let rnd=12345;const R=()=>(rnd=(rnd*1103515245+12345)&0x7fffffff)/0x7fffffff;
  const bekannt=new Uint8Array(w*h);for(let k=0;k<w*h;k++)bekannt[k]=arm[k]?0:1;
  for(let pass=0;pass<60;pass++){const neu=[];
    for(let k=0;k<w*h;k++){if(bekannt[k])continue;const x=k%w,y=(k-x)/w,nb=[];
      for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const X=x+dx,Y=y+dy;if((dx||dy)&&X>=0&&Y>=0&&X<w&&Y<h&&bekannt[Y*w+X])nb.push(Y*w+X)}
      // helle Flächen und Leere zuerst, dann Nicht-Tusche – sonst entsteht aus Konturen und Schatten ein Streifenmuster
      const hell=q=>d[q*4+3]<128||Math.max(d[q*4],d[q*4+1],d[q*4+2])>=90,tusche=q=>d[q*4]===46&&d[q*4+1]===28&&d[q*4+2]===16;
      const f1=nb.filter(hell),f2=nb.filter(q=>!tusche(q)),wahl=f1.length?f1:f2.length?f2:nb;
      if(wahl.length)neu.push([k,wahl[Math.floor(R()*wahl.length)]])}
    if(!neu.length)break;for(const[k,q]of neu)for(let c=0;c<4;c++)d[k*4+c]=d[q*4+c];for(const[k]of neu)bekannt[k]=1}
  // gefülltes Loch: wo es an Leere grenzt, 1 px Tusche-Kontur
  {const leer=k=>d[k*4+3]<128,neuK=[];for(let k=0;k<w*h;k++){if(!arm[k]||leer(k))continue;const x=k%w,y=(k-x)/w;
    if(x===0||y===0||x===w-1||y===h-1||leer(k-1)||leer(k+1)||leer(k-w)||leer(k+w))neuK.push(k)}
    for(const k of neuK){d[k*4]=46;d[k*4+1]=28;d[k*4+2]=16;d[k*4+3]=255}}
  g.putImageData(id,0,0);src.complete=true;src.naturalWidth=w;src.naturalHeight=h;   // naRig erwartet ein „Bild“
  return{rest:src,ober,unter,w,h}}

// ---------- Beule (Petjas Hose, gleiche Pixeldichte wie seine Knie) ----------
let NA_ZELT=null;
function naZeltLaden(){if(NA_ZELT)return;NA_ZELT={im:null};
  const svg=`<g stroke="${FP_INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
<path d="M312,522C340,506 362,452 386,404C392,392 408,392 414,404C438,452 460,506 488,522Z" fill="#6a80a8"/>
<path d="M402,396C416,402 424,432 440,470C452,496 468,512 488,522L424,522C418,480 410,430 402,396Z" fill="#4c5d80" stroke="none"/>
<path d="M312,522C340,506 362,452 386,404C392,392 408,392 414,404C438,452 460,506 488,522" fill="none"/>
<path d="M346,510Q366,476 382,432M458,510Q440,478 422,438M372,520Q384,490 392,452" fill="none" stroke="#3f4e6c" stroke-width="2"/>
<path d="M401,398C400,440 399,484 398,522" fill="none" stroke="#33405c" stroke-width="2"/>
<path d="M390,410Q397,398 406,401M378,446Q382,428 388,416" fill="none" stroke="#b4c4e0" stroke-width="3"/></g>`,box=[300,384,200,140];
  Promise.resolve(PIXELSTYLE?pixSprite(svg,box,fpRows(140,1,266,1.5)):sprite(svg,box,2)).then(u=>{const im=new Image();im.onload=()=>NA_ZELT.im=im;im.src=u}).catch(e=>console.error('Beule',e))}
setTimeout(naZeltLaden,2500);   // vorab, damit die Beule in der Szene sofort da ist

// ---------- Die Szene ----------
function naBeuleStart(skin,SK,ph){
  const def=NA_ARM[skin];
  const darf=()=>def&&!FL.na_beule&&relOf('Nastja')>=NASTJA_BEULE&&!(typeof DL!='undefined'&&DL.on);
  if(!darf())return null;
  naZeltLaden();
  const sm=(b,a,e)=>{const p=Math.max(0,Math.min(1,(b-a)/(e-a)));return p*p*(3-2*p)};
  const lerpW=(a,b,p)=>{let d=b-a;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;return a+d*p};
  const LR=document.createElement('canvas');LR.width=200;LR.height=125;   // Spritzer in grober Pixelauflösung (4 Einheiten pro Pixel)
  let A=null,M=null,lean=0,said=new Set(),tropfen=null,linse=null,bs=0,tAlt=0,offen=false,tF=null;
  const ENDE=18.9,G0=9.4,TF=12.4,HUBE=2;   // Szenen-Uhr: Ende, Zugreifen, Blitz; dazwischen HUBE langsame Auf-und-ab-Bewegungen
  const ZEILEN=[
    [2.7,[['P','(Oh nein. Nein, nein, nein. Nicht jetzt. Denk an Oma Dusja. Denk an den Wels. DENK AN DEN WELS!)']]],
    [3.4,[['NA','*hört mitten in der Bewegung auf, ihr Blick wandert langsam nach unten* … Na sieh mal einer an.','smirk']]],
    [7.1,[['NA','*kommt ganz nah, beugt sich vor und grinst von unten zu dir hoch* Ist das ein Zauberstab in deiner Hose, Zwiebel, oder freust du dich nur, mich zu sehen?','flirt']]],
    [7.3,[['P','Das … das ist … mein Schlüsselbund.']]],
    [7.5,[['NA','Dein Schlüsselbund. Klar. Der zuckt ja auch immer so, wenn du ihn anguckst.','laugh']]],
    [7.7,[['NA','Mal sehen, ob der Schlüssel auch passt …','flirt']]],
    [13.5,[['P','…']]],
    [16.5,[['NA','*richtet sich auf und wischt sich gelassen die Hand am Strumpfband ab* Ups. Das kann jedem mal passieren.','smirk']]],
    [16.7,[['NA','Drei Sekunden, Zwiebel. Ich hab Kerle gesehen, die beim Hinsetzen länger durchgehalten haben.','laugh']]],
    [16.9,[['P','Das war … die Aufregung. Und der Wein. Und das Märchen.']]],
    [17.1,[['NA','Ja, ja. Passiert den Besten. Dir halt nur schneller.','smirk']]],
    [17.3,[['NA','*zwinkert* Lehn dich zurück, der Tanz ist bezahlt. Für dich ist er zwar schon vorbei, aber ich tanz trotzdem zu Ende.','flirt']]]];
  // Kurven über b
  const nah=b=>sm(b,3.6,5.8)*(1-.12*sm(b,14.7,16.1))*(1-sm(b,ENDE-1.5,ENDE-.3));
  const vor=b=>sm(b,4.6,7)*(1-.45*sm(b,14.7,16.1))*(1-sm(b,ENDE-1.5,ENDE-.3));
  const greif=b=>sm(b,8,G0)*(1-sm(b,13.7,14.9));
  const zelt=b=>sm(b,.4,2.6)*(1-.8*sm(b,TF+.1,TF+1.7))*(1-sm(b,ENDE-1.5,ENDE-.3))+(b>G0&&b<TF?.02*Math.sin((b-G0)/(TF-G0)*HUBE*2*Math.PI):0);
  // Bücken: Platz für ECHT GEZEICHNETE Bück-Frames. Gibt es NASTJA_BUECKEN.<outfit> = {img:[Bild1,Bild2,Bild3], schulter:[[x,y],…]}
  // (Bilder ohne den Zugreif-Arm, gleiche Größe und Fußlinie wie das Outfit), werden sie je nach Vorbeugen gezeigt. Sonst bleibt
  // sie im Original-Sprite stehen – verzerrte Bilder sehen schlechter aus als gar kein Bücken.
  const NB=typeof NASTJA_BUECKEN!='undefined'?NASTJA_BUECKEN[skin]:null;
  const stufe=()=>NB&&NB.img.every(i=>i.complete&&i.naturalWidth)?Math.round(lean*NB.img.length):0;
  let k0=0;

  // Leertaste schaltet während der Szene den Text weiter (die Tanz-Engine nimmt sie sonst nur als Takt)
  const taste=e=>{if(!document.getElementById('cut')){removeEventListener('keydown',taste,true);return}
    if(e.key===' '&&BE.on&&busy&&!e.repeat)advance()};
  const BE={on:false,
    tick(t,u){
      if(!BE.on){if(BE.fertig||u<5||ph.twerk||t<ph.pauseBis||!darf())return;
        A=naArmBau(SK.bild(),def);if(!A){BE.fertig=true;return}
        FL.na_beule=1;BE.on=true;tAlt=t;addEventListener('keydown',taste,true)}
      const dt=Math.min(.1,Math.max(0,t-tAlt));tAlt=t;ph.pauseBis=t+.1;ph.zoomZiel=1;ph.zoomBis=0;
      // Szenen-Uhr läuft nur, solange keine Zeile auf einen Klick wartet; an der nächsten Zeile bleibt sie stehen
      if(!offen){const g=ZEILEN.find(([z])=>!said.has(z));bs=Math.min(bs+dt,g?g[0]:Infinity);
        if(g&&bs>=g[0]){said.add(g[0]);offen=true;if(busy)advance();say(g[1],()=>{offen=false})}}
      if(tF===null&&bs>=TF)tF=t;lean=vor(bs);
      if(bs>=ENDE){BE.on=false;BE.fertig=true;ph.pauseBis=t;removeEventListener('keydown',taste,true)}},
    ruhe:t=>{const b=bs;return sm(b,0,2.5)*(1-sm(b,ENDE-1.5,ENDE-.3))*.9},
    pose(t,px,py,sc){const c=nah(bs);return{px:px+(400-px)*c,py:py+(760-py)*c,sc:sc+(2.5-sc)*c}},
    // Körper ohne Arm im Frame der aktuellen Bück-Stufe, mit dem normalen Tanz-Rig (Haare schwingen weiter)
    zeichne(x,st){const k=stufe(),rig=naRig(k?NB.img[k-1]:A.rest,SK.zonen);if(!rig)return;
      naZeichne(x,rig,SK.zonen,st,0);k0=k;M=x.getTransform()},
    // Beule und Nastjas Arm (vor Petjas Knien)
    vorne(x,t){const b=bs;
      const zb=Math.max(0,zelt(b));if(NA_ZELT&&NA_ZELT.im&&zb>.01){x.save();x.imageSmoothingEnabled=false;const hh=140*zb,sk=Math.sin(b*7)*.02*zb;
        x.transform(1,0,sk,1,-sk*520,0);x.drawImage(NA_ZELT.im,300,524-hh,200,hh);x.restore()}
      if(!M||!A)return;x.save();x.setTransform(M);x.imageSmoothingEnabled=false;
      const[Sx,Sy]=def.S,[Ex,Ey]=def.E,[Hx,Hy]=def.H,g0=1,S1=k0?NB.schulter[k0-1]:def.S,Sp=[S1[0]-A.w/2,S1[1]-A.h];
      const a1r=Math.atan2(Ey-Sy,Ex-Sx),a2r=Math.atan2(Hy-Ey,Hx-Ex),l1=Math.hypot(Ex-Sx,Ey-Sy)*g0,l2=Math.hypot(Hx-Ex,Hy-Ey)*g0;
      const R=greif(b);let w1=a1r,w2=a2r,s1=g0,s2=g0;
      if(R>0){// Ziel: Spitze der Beule (Bildschirm) → lokale Koordinaten; beim Zugreifen drückt sie etwas nach
        // langsam auf und ab (HUBE-mal): von der Spitze ein Stück die Beule hinunter und wieder hoch
        const druck=b>G0&&b<TF?(1-Math.cos((b-G0)/(TF-G0)*HUBE*2*Math.PI))/2*26:0;
        const T=M.inverse().transformPoint(new DOMPoint(402*SC,(524-118*zb+druck)*SC)),dx=T.x-Sp[0],dy=T.y-Sp[1],dist=Math.hypot(dx,dy);
        // Arm und Hand behalten ihre Größe (höchstens 8 % Perspektive, gleichmäßig) – sonst wirkt die Hand an manchen Stellen riesig
        const a=Math.min(1.08,Math.max(1,dist*1.02/(l1+l2))),a1=a,a2=a,L1=l1*a1,L2=l2*a2;
        const D=Math.max(Math.abs(L1-L2)+.01,Math.min(L1+L2-.01,dist)),basis=Math.atan2(dy,dx),al=Math.acos(Math.max(-1,Math.min(1,(L1*L1+D*D-L2*L2)/(2*L1*D))));
        const k1=[basis+al,basis-al].map(wk=>[wk,Sp[0]+Math.cos(wk)*L1]).sort((p,q)=>q[1]-p[1])[0][0];   // Ellbogen nach außen
        const Eik=[Sp[0]+Math.cos(k1)*L1,Sp[1]+Math.sin(k1)*L1],k2=Math.atan2(T.y-Eik[1],T.x-Eik[0]);
        w1=lerpW(a1r,k1,R);w2=lerpW(a2r,k2,R);s1=g0*(1+(a1-1)*R);s2=g0*(1+(a2-1)*R)}
      // Hand ausschütteln
      const quetsch=b>G0&&b<TF?1-.05*(1-Math.cos((b-G0)/(TF-G0)*HUBE*2*Math.PI))/2:1;
      const Ep=[Sp[0]+Math.cos(w1)*l1/g0*s1,Sp[1]+Math.sin(w1)*l1/g0*s1];
      const teil=(im,P,Q,wink,ruhW,s,sy)=>{x.save();x.translate(P[0],P[1]);x.rotate(wink-ruhW);x.scale(s,s*(sy||1));x.translate(-(Q[0]-A.w/2),-(Q[1]-A.h));x.drawImage(im,-A.w/2,-A.h);x.restore()};
      teil(A.ober,Sp,def.S,w1,a1r,s1);teil(A.unter,Ep,def.E,w2,a2r,s2,quetsch);
      x.restore()},
    // Blitz, Spritzer, Tropfen auf der Linse (ganz oben)
    oben(x,t){if(tF===null)return;const f=t-tF;if(f<0||f>3.2)return;x.setTransform(SC,0,0,SC,0,0);
      const L=LR.getContext('2d');L.clearRect(0,0,200,125);
      if(!tropfen){tropfen=[];for(let i=0;i<34;i++){const wk=-Math.PI/2+(Math.random()-.5)*2.2,v=80+Math.random()*150;tropfen.push({vx:Math.cos(wk)*v,vy:Math.sin(wk)*v,r:1+Math.random()*2.6,d:Math.random()*.08})}
        linse=[];for(let i=0;i<4;i++){const r=2.5+Math.random()*3;linse.push({x:30+Math.random()*140,y:14+Math.random()*60,r,v:4+Math.random()*6,d:.2+Math.random()*.25,
          teile:[...Array(4)].map(()=>[(Math.random()-.5)*r*1.6,(Math.random()-.5)*r*1.2,r*(.35+Math.random()*.4)])})}}
      const klecks=(X,Y,r,a)=>{L.fillStyle=`rgba(196,206,220,${a})`;L.beginPath();L.arc(X,Y+.6,r+.7,0,7);L.fill();L.fillStyle=`rgba(252,252,248,${a})`;L.beginPath();L.arc(X,Y,r,0,7);L.fill();
        if(r>1.5){L.fillStyle=`rgba(255,255,255,${a})`;L.fillRect(Math.round(X-r*.45),Math.round(Y-r*.5),1,1)}};
      // Fontäne aus der Beule
      if(f>.08&&f<1.1){const s=f-.08,fa=Math.max(0,1-s/1);const bahn=(p,u)=>[100+p.vx*u,101+p.vy*u+150*u*u];
        for(const p of tropfen){const u=Math.max(0,s-p.d);if(!u)continue;const[X,Y]=bahn(p,u),[X0,Y0]=bahn(p,Math.max(0,u-.06)),r=p.r*.8*(1+u*.6);   // Spritzer mit Schweif
          L.lineCap='round';L.strokeStyle=`rgba(196,206,220,${fa})`;L.lineWidth=r*2+1.2;L.beginPath();L.moveTo(X0,Y0);L.lineTo(X,Y);L.stroke();
          L.strokeStyle=`rgba(252,252,248,${fa})`;L.lineWidth=r*2;L.beginPath();L.moveTo(X0,Y0);L.lineTo(X,Y);L.stroke()}
        const sc=Math.min(1,s*7)*(1+.1*Math.sin(s*38));L.save();L.translate(100,40);L.rotate(-.1);L.scale(sc,sc);L.globalAlpha=fa;L.font='bold 26px Georgia';L.textAlign='center';L.textBaseline='middle';
        L.lineWidth=4;L.strokeStyle='#2a1806';L.strokeText('SPLOOSH!',0,0);L.fillStyle='#fff3c8';L.fillText('SPLOOSH!',0,0);L.restore()}
      // Tropfen klatschen auf die „Linse“ und rutschen langsam runter
      for(const k of linse){if(f<k.d)continue;const u=f-k.d,a=Math.max(0,Math.min(1,u*8,(3.2-f)/1));const r=k.r*Math.min(1,u*10)*(1+.06*Math.sin(u*9));
        klecks(k.x,k.y+u*k.v,r,a*.92);for(const[dx,dy,rr]of k.teile)klecks(k.x+dx*Math.min(1,u*10),k.y+u*k.v+dy,rr*Math.min(1,u*10),a*.92);L.fillStyle=`rgba(250,250,246,${a*.85})`;L.fillRect(Math.round(k.x-r*.25),Math.round(k.y),Math.max(1,Math.round(r*.5)),Math.round(u*k.v*1.6))}
      x.save();x.imageSmoothingEnabled=false;x.drawImage(LR,0,0,800,500);x.restore();
      // reiner Weißblitz: 0,16 s voll, dann aus
      const wf=f<.16?1:Math.max(0,1-(f-.16)/.3);if(wf>0){x.fillStyle=`rgba(255,255,255,${wf})`;x.fillRect(0,0,800,500)}}};
  return BE}
