// ================= Hausbau-Animation auf der Wiese (im Spielstil) =================
// Ersetzt die flache 2D-Bauanimation aus 24-bau-animation.js:
//  - Neuer Ort „Wiese“ (SCN.wiese) NUR für die Animation: keine Räume, keine Ausgänge, nie per enter() erreichbar.
//    Gemalt mit der normalen Szenen-Pipeline (Himmel, Ferne, Boden, Gras, Blumen, Birken, Lichtstrahlen).
//  - Das Haus ist genau Opas fertiges Haus aus dem Dorf (fisherHut aus 17-gebaeude.js, trim '#d8b070').
//    Es entsteht aus denselben Bauteilen: Fundament + Rundholzwände Balken für Balken, Giebelbretter, Schindeln von der Traufe aufwärts,
//    zum Schluss Tür, Fenster, Windbretter und Schornstein.
// Alle Bauteile werden beim Start einmal vorgerendert (wenige Leinwände) und in der Animation nur noch per Ausschnitt aufgedeckt.

SCN.wiese={...BASE,seed:71,hz:212,sun:[640,64],sunr:56,top:[92,138,196],hor:[222,226,212],sunc:[255,248,222],cl:[252,252,248],cs:[168,178,198],cov:.5,
  masses:[[-30,250,40,70],[560,830,30,80]],band:[220,600],trunks:0,nfl:300,raya:.3,
  sand:[[120,98,64],[196,170,124]],
  pe:segPath([[236,437,10,566,437,10],[300,520,40,298,440,16]]),   // zertrampelter Streifen unter dem Fundament und ein Trampelpfad zur Tür
  gtop:X=>213+Math.pow(Math.abs(X-400)/400,1.6)*8,paint:paintWiese};

function paintWiese(){const o=S0;sky(o);far(o);ground(o);
  let x=lay();bgRow(x,30,214,244,10,18,0);[[120,236,4,1,100],[200,240,5,-1,96],[620,238,4,0,102],[700,242,5,1,96],[760,236,4,-1,104]].forEach(b=>birch(x,...b));put(x,.6);
  shadows([[40,470,22],[770,462,20]],.36);
  x=lay();grass(x,8000,o.hz,500,1);details(x);put(x);
  x=lay();birch(x,40,476,22,-3);birch(x,772,466,20,2);for(let i=0;i<3;i++){foliage(x,40+(R()-.5)*90,30+R()*120,30+R()*14);foliage(x,770+(R()-.5)*90,20+R()*120,30+R()*14)}
  bush(x,110,452,26,0);bush(x,700,446,24,0);woodpile(x,120,436);put(x);
  x=lay();for(let i=0;i<300;i++){const X=R()<.5?R()*200-20:620+R()*200;dab(x,X,456+R()*50,6+R()*8,mix([20,44,12],[60,104,30],R()),.55)}grass(x,500,466,515,2.2,1);put(x,1);
  rays(o,[[-.5,.07],[-.2,.09],[.15,.05]]);grade(o)}

// Wiese als fertiges Bild (800×500). Malt kurz auf die Spiel-Leinwand und stellt danach alles wieder her (Bild, Szene, Zufall).
let WIESE_BG=null;
function wieseBG(){if(WIESE_BG)return WIESE_BG;const keep=document.createElement('canvas');keep.width=W;keep.height=H;keep.getContext('2d').drawImage(cv,0,0);
  const altS0=S0,altS=s;try{S0=SCN.wiese;s=S0.seed;c.save();c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,W,H);c.restore();S0.paint();
    const o=document.createElement('canvas');o.width=800;o.height=500;const g=o.getContext('2d');g.drawImage(cv,0,0,800,500);WIESE_BG=o}
  finally{S0=altS0;s=altS;c.save();c.setTransform(1,0,0,1,0,0);c.drawImage(keep,0,0);c.restore()}
  return WIESE_BG}
// alte Funktion: Titelbild „Petjas eigenes Haus“ (53-dorf-quests.js) bekommt ebenfalls die Wiese
function bauBG(){return wieseBG()}

// ----- Haus: Lage auf der Wiese (Hauskoordinaten wie fisherHut: Front 24..236, Boden 348) -----
const BW={S:1.3,X:400-158*1.3,Y:432-348*1.3,box:[0,120,310,240]};   // box: Ausschnitt in Hauskoordinaten, der vorgerendert wird
const bwP=(lx,ly)=>[BW.X+lx*BW.S,BW.Y+ly*BW.S];
// ein Bauteil in eine eigene Leinwand rendern (doppelte Auflösung wie das Spiel), Ergebnis wird an den Hauskoordinaten gezeichnet
function bwTeil(f){const[bx,by,bw,bh]=BW.box,k=BW.S*SC,o=document.createElement('canvas');o.width=Math.ceil(bw*k);o.height=Math.ceil(bh*k);const x=o.getContext('2d');
  x.setTransform(k,0,0,k,-bx*k,-by*k);const altS0=S0;S0=SCN.wiese;try{f(x)}finally{S0=altS0}return o}
// gezeichnetes Bauteil zeigen, optional nur den Teil unterhalb von yMin (Hauskoordinaten) – so wächst es von unten nach oben
function bwZeig(x,cvs,yMin,a=1){const[bx,by,bw,bh]=BW.box,[X,Y]=bwP(bx,by),w=bw*BW.S,h=bh*BW.S;x.save();x.globalAlpha=a;
  if(yMin!=null){const cut=Math.max(0,Math.min(bh,yMin-by)),sy=cut/bh;x.drawImage(cvs,0,cvs.height*sy,cvs.width,cvs.height*(1-sy),X,Y+h*sy,w,h*(1-sy))}else x.drawImage(cvs,X,Y,w,h);x.restore()}

let BWT=null;
function bwTeile(){if(BWT)return BWT;const B=348;
  const rohbau=bwTeil(x=>{const lx=litSide(x,130);shadowAt(x,150,B+4,160,.65);
    const side=QP([[230,B],[230,230],[276,206],[276,B-26]]);x.save();x.clip(side);x.transform(1,-24/46,0,1,0,230*24/46);roundLogs(x,226,280,B+6,190,10,{lx,grey:.4,seed:7});x.restore();
    wallFX(x,side,230,276,206,B,{lx,side:.1,dark:lx<0?.4:.12,eave:22});
    x.save();x.clip(new Path2D('M10,'+(B+2)+'L10,226L250,226L250,'+(B+2)+'Z'));roundLogs(x,30,230,B-6,230,10,{lx,grey:.38,ends:[1,1],seed:3});x.restore();
    wallFX(x,QP([[30,B],[30,230],[230,230],[230,B]]),30,230,230,B,{lx,eave:18,streaks:[[156,198,300]]});footing(x,26,276,B+1,7,{lx})});
  const giebel=bwTeil(x=>{const lx=litSide(x,130),gab=QP([[30,230],[130,162],[230,230]]);boards(x,gab,30,230,160,232,{lx,bw:8});wallFX(x,gab,30,230,162,232,{lx,eave:16,side:.18})});
  const dach=bwTeil(x=>{const lx=litSide(x,130);shingleRoof(x,[130,158],[176,134],[292,212],[246,238],{rows:13,sw:7,lx,moss:.45,grey:.55,seed:5,side:.2})});
  const fertig=bwTeil(x=>fisherHut(x,{trim:'#d8b070',smoke:1}));
  return BWT={rohbau,giebel,dach,fertig}}

// geschälter Stamm im Spielstil: runder Querschnitt (Licht oben), Maserung, Hirnholz am Ende
function bwStamm(x,x0,x1,y,d){const g=x.createLinearGradient(0,y-d/2,0,y+d/2);g.addColorStop(0,'#e8cc96');g.addColorStop(.3,'#d2a868');g.addColorStop(.75,'#9a6c38');g.addColorStop(1,'#4a3018');
  x.fillStyle='rgba(0,0,0,.3)';x.fillRect(x0+3,y+d/2,x1-x0,2.4);x.fillStyle=g;x.fillRect(x0,y-d/2,x1-x0,d);
  x.strokeStyle='rgba(90,56,24,.35)';x.lineWidth=.6;for(let i=0;i<5;i++){const yy=y-d*.35+i*d*.17;x.beginPath();x.moveTo(x0+4,yy);x.bezierCurveTo(x0+(x1-x0)*.3,yy+1.2,x0+(x1-x0)*.6,yy-1,x1-4,yy+.4);x.stroke()}
  x.strokeStyle='rgba(30,18,8,.8)';x.lineWidth=1;x.strokeRect(x0,y-d/2,x1-x0,d);logEnd(x,x1,y,d/2,1,(x0*7+y)|0);ell(x,x0,y,d*.2,d/2,[120,86,48])}
// Leiter aus Holz (Holztextur aus dem Spiel)
function bwLeiter(x,ax,ay,bx,by){const L=Math.hypot(bx-ax,by-ay),a=Math.atan2(by-ay,bx-ax);x.save();x.translate(ax,ay);x.rotate(a);
  x.fillStyle='rgba(0,0,0,.25)';x.fillRect(0,-14,L,30);for(let q=14;q<L-6;q+=24)wood(x,q,-11,5,24,1);wood(x,0,-15,L,5,0);wood(x,0,10,L,5,0);
  x.strokeStyle='rgba(20,12,4,.7)';x.lineWidth=.8;x.strokeRect(0,-15,L,5);x.strokeRect(0,10,L,5);x.restore()}

// ----- Dorfbewohner für die Schlussszene (fertige Sprites aus dem Spiel; Box + Fußlinie in Figuren-Einheiten) -----
function bwLeute(){const bild=h=>{if(!h)return null;const im=new Image();im.src=h;return im},href=e=>e&&(e.getAttribute('href')||e.getAttribute('xlink:href'));
  const L=[{n:'Oma',im:bild(href($('#omaimg'))),box:[-46,-200,92,204],fuss:2,X:140,Y:470,s:1},
    {n:'Opa',im:bild(href($('#opaimg'))),box:[-44,-184,88,188],fuss:1,X:250,Y:484,s:1.1,flip:1},
    {n:'Kusmitsch',im:bild(href($('#fishimg'))),box:[-64,-142,134,224],fuss:82,X:560,Y:478,s:1.02},
    {n:'Fjodor',im:bild(typeof A3IMG!='undefined'&&href(A3IMG.schmied)),box:[-56,-220,112,224],fuss:0,X:690,Y:468,s:1.12,flip:1}];
  if(typeof FL!='undefined'&&FL.popeBack)L.push({n:'Pope',im:bild(typeof A3IMG!='undefined'&&href(A3IMG.pope2)),box:[-56,-220,112,224],fuss:0,X:50,Y:462,s:1.05});
  return L.filter(q=>q.im)}
function bwFigur(x,q,t){if(!q.im.complete||!q.im.naturalWidth)return;const[bx,by,bw,bh]=q.box,atm=1+Math.sin(t*2.2+q.X)*.008;   // leichtes Atmen
  ell(x,q.X,q.Y+2,bw*q.s*.36,5,[10,20,6],.35);x.save();x.translate(q.X,q.Y);x.scale(q.flip?-q.s:q.s,q.s*atm);x.drawImage(q.im,bx,by-q.fuss,bw,bh);x.restore()}

// Rutschbalken: zwei schräge Stangen, über die die Stämme auf die Wand geschoben werden (alte Blockbau-Technik)
function bwRutschen(x,yTop){[[262,250],[520,532]].forEach(([a,b])=>{const ax=a,ay=470,bx=b,by=yTop,L=Math.hypot(bx-ax,by-ay),ang=Math.atan2(by-ay,bx-ax);x.save();x.translate(ax,ay);x.rotate(ang);
  x.fillStyle='rgba(0,0,0,.25)';x.fillRect(0,3,L,4);wood(x,0,-3,L,6,0);x.strokeStyle='rgba(20,12,4,.75)';x.lineWidth=.8;x.strokeRect(0,-3,L,6);x.restore()})}

// offene Tür, die zuknallt (op 1 = offen, 0 = zu)
function bwTuer(x,op){const[dx0,dy0]=bwP(58,264),dw=42*BW.S,dh=84*BW.S,lw=dw*(1-op*.85);
  x.fillStyle='#0a0705';x.fillRect(dx0,dy0,dw,dh);x.save();x.globalCompositeOperation='lighter';dab(x,dx0+dw*.6,dy0+dh*.7,dh*.5,[255,170,70],.2);x.restore();
  x.save();x.beginPath();x.rect(dx0,dy0,lw,dh);x.clip();for(let X=dx0;X<dx0+lw;X+=lw/6)wood(x,X,dy0,lw/6+.5,dh,1);x.fillStyle='rgba(0,0,0,'+(.15+op*.3)+')';x.fillRect(dx0,dy0,lw,dh);x.restore();
  x.strokeStyle='rgba(10,6,2,.9)';x.lineWidth=1.2;x.strokeRect(dx0,dy0,lw,dh)}
function bwRumms(x,t){x.font='bold 46px Georgia';x.textAlign='center';x.lineWidth=7;x.strokeStyle='#000';const s2=1+Math.max(0,.4-t)*1.2;x.save();x.translate(400,90);x.scale(s2,s2);x.strokeText('RUMMS!',0,0);x.fillStyle='#ffd25a';x.fillText('RUMMS!',0,0);x.restore()}

// ----- Hausbau: Wände (zwei Tage), Dach, Tür zu, Richtfest mit dem ganzen Dorf -----
function hausShots(){const pet=petPic(1),petF=petPic(0),T=bwTeile(),bg=wieseBG(),B=348,REIHEN=12,ZYK=1.15,leute=bwLeute();
  const wandBis=r=>B-Math.min(1,r/REIHEN)*(B-206),[x0]=bwP(30,0),[x1]=bwP(230,0),D=13;
  // ein Tag Wandbau: Stamm vom Stapel heranrollen, über die Rutschbalken hochschieben, auflegen – erst dann wächst die Wand um eine Reihe
  const wandTag=(r0,cap)=>({d:6*ZYK+.6,cap,draw(x,t){x.drawImage(bg,0,0);const n=Math.floor(t/ZYK),u=(t%ZYK)/ZYK,fertig=r0+Math.min(6,n);
    bwZeig(x,T.rohbau,wandBis(fertig));const[,wy]=bwP(0,wandBis(fertig));if(fertig>=1)bwRutschen(x,wy+4);
    if(n<6){let lx=0,ly=452,px,py=472,rot=0;
      if(u<.35){const q=u/.35;lx=-320*(1-q);px=x0-46+lx;rot=Math.sin(t*14)*.03}                        // heranrollen, Petja schiebt von hinten
      else if(u<.88){const q=(u-.35)/.53,e=q*q*(3-2*q);ly=452+(wy-D/2-452)*e;px=x0-58;rot=-.06}           // hochschieben
      else{ly=wy-D/2;px=x0-58;if(!this['p'+n]){this['p'+n]=1;puff((x0+x1)/2,wy,6);puff(x0+20,wy,3)}}   // liegt auf, Staub
      drawPet(x,pet,px,py,.95,0,rot);
      if(u>=.35){const sx=px+18,sy=py-150;x.save();x.strokeStyle='#6a4a28';x.lineWidth=4;x.lineCap='round';x.beginPath();x.moveTo(sx,sy);x.lineTo(x0+lx+4,ly+2);x.stroke();x.restore()}   // Schiebestange
      bwStamm(x,x0+lx,x1+lx,ly,D)}
    else drawPet(x,petF,x0-70,472,.95,0);
    drawDust(x)}});
  // Dach: jeder Hammerschlag setzt ein Giebelbrett (4 Abschnitte) bzw. eine Schindelreihe (13)
  const GIEB=4,SCH=13,HZ=9/Math.PI;   // Schläge pro Sekunde
  return[
  wandTag(0,'Tag 1. Stamm für Stamm …'),
  wandTag(6,'Tag 2. Die Wand wächst. Mein Rücken schrumpft.'),
  {d:(GIEB+SCH)/HZ+1.2,cap:'*hämmer* … *hämmer* … Dach drauf!',draw(x,t){x.drawImage(bg,0,0);bwZeig(x,T.rohbau);
    const hits=Math.floor(t*HZ+.5),kg=Math.min(1,hits/GIEB),kd=Math.max(0,Math.min(1,(hits-GIEB)/SCH));
    if(kg>0)bwZeig(x,T.giebel,232-(232-160)*kg);if(kd>0)bwZeig(x,T.dach,238-(238-134)*kd);
    const[lx1,ly1]=bwP(286,214);bwLeiter(x,662,446,lx1,ly1);
    const fertig=hits>=GIEB+SCH,hy=fertig?.2:Math.abs(Math.sin(t*9)),PX=612,PY=348;drawPet(x,pet,PX,PY,.62,1);
    const hx=PX-18,hyy=PY-100;x.save();x.translate(hx,hyy);x.rotate(-1.2+hy*1.1);wood(x,-3,-32,6,32,1);x.fillStyle='#4a4e54';x.fillRect(-10,-40,20,9);x.fillStyle='rgba(255,255,255,.25)';x.fillRect(-10,-40,20,2);x.restore();
    if(!fertig&&hy>.97)puff(hx-22,hyy-6,2,'120,100,80');drawDust(x)}},
  {d:3.6,cap:'Zwei Tage später: Fenster, Tür, Schornstein.',draw(x,t){const sh=t>1.6&&t<2?(Math.random()-.5)*10:0;x.translate(sh,sh*.5);x.drawImage(bg,0,0);bwZeig(x,T.fertig);
    const op=t<1.6?1-Math.pow(Math.max(0,t-.4)/1.2,3):0;if(op>0)bwTuer(x,op);
    if(t>1.6&&!this.p){this.p=1;const[px,py]=bwP(79,348);puff(px,py-4,16,'210,190,150');puff(px,py-110,8,'210,190,150')}drawDust(x);
    drawPet(x,petF,650,478,.9,0);if(t>1.6)bwRumms(x,t-1.6)}},
  // Schlussbild: das ganze Dorf steht mit Petja vor dem neuen Haus, dann langsam ausblenden
  {d:5.6,cap:'Richtfest. Das halbe Dorf ist da. Also alle.',draw(x,t){x.drawImage(bg,0,0);bwZeig(x,T.fertig);
    const alle=[...leute,{n:'Petja',P:1,X:400,Y:490}].sort((a,b)=>a.Y-b.Y);
    alle.forEach(q=>{if(q.P){ell(x,q.X,q.Y+2,34,5,[10,20,6],.35);drawPet(x,petF,q.X,q.Y,.92,0)}else bwFigur(x,q,t)});
    const a=Math.max(0,Math.min(1,(t-4.2)/1.2));if(a>0){x.fillStyle='rgba(0,0,0,'+(a*.85)+')';x.fillRect(0,0,800,500)}}}]}
