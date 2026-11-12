// ================= Schmiedehof (neuer Ort, hinter der Dorfstraße) =================
// Heller Dorfhof: Strohdach-Unterstand mit Heu, Schmiede aus Rundholz mit geschnitztem Giebelpferd, offener Esse und Rauchfang,
// Amboss, Brunnen mit Dach, Holzstapel, Flechtzaun; Hügel und Wolken im Hintergrund. Ausgang: zurück zur Dorfstraße.
SCN.schmiede={...BASE,seed:131,hz:200,sun:[640,70],sunr:46,top:[34,112,214],hor:[176,214,240],sunc:[255,250,232],cl:[264,266,270],cs:[178,196,220],cov:.47,
  masses:[[-30,380,120,34],[460,830,104,40]],trunks:0,spruce:1,band:[160,700],bc:[[110,150,120],[160,190,160]],lit:[[96,150,56],[160,196,86]],dark:[[36,70,30],[66,104,44]],haze:[200,222,236],
  g:[[52,104,24],[110,164,44],[170,190,80]],sand:[[120,92,58],[208,176,124]],gh:[184,210,190],dapple:.12,b1:[[120,170,50],[196,214,100]],fol:[[26,58,18],[78,128,36],[176,206,90]],nfl:160,
  rayc:[255,244,214],raya:.18,gr:['rgba(255,236,190,.32)','rgba(40,60,110,.28)'],vig:.32,
  pe:segPath([[420,512,170,410,420,80],[410,420,80,330,402,34],[410,420,80,560,404,30],[330,402,34,210,388,16]]),gtop:X=>201+Math.pow(Math.abs(X-420)/420,1.6)*12,
  k:1.05/286,x0:50,x1:750,ymin:x=>x<120?452:x<300?420:x<620?414:432,ymax:494,paint:paintSchmiede,
  intro:[['P','Ein Schmiedehof. Strohdach, Brunnen, Holzstapel, ein geschnitztes Pferd auf dem Giebel.'],['P','Die Esse glüht noch. Vom Schmied keine Spur. Wahrscheinlich holt er Bier. Würd ich auch.']]};
// ----- Malhelfer -----
// Rundholzwand mit Balkenköpfen an den Ecken (x0..x1, Unterkante B, Höhe h)
function logWall(x,x0,x1,B,h,ends=[1,1]){for(let y=B-10;y>=B-h;y-=10){wood(x,x0,y,x1-x0,10,0);x.strokeStyle='rgba(16,10,4,.85)';x.lineWidth=1.2;x.beginPath();x.moveTo(x0,y+10);x.lineTo(x1,y+10);x.stroke();
    [ends[0]?x0:null,ends[1]?x1:null].forEach(X=>{if(X==null)return;const g=x.createRadialGradient(X-1.4,y+4,0,X,y+5,6.4);g.addColorStop(0,'#e0b880');g.addColorStop(.55,'#a87a48');g.addColorStop(.85,'#6a4624');g.addColorStop(1,'#2a1a0a');x.fillStyle=g;x.beginPath();x.arc(X,y+5,6,0,7);x.fill();
      x.strokeStyle='rgba(110,70,30,.6)';x.lineWidth=.5;x.beginPath();x.arc(X,y+5,3,0,7);x.stroke()})}}
// geschnitzter Pferdekopf (Konek) auf dem Giebel; d = Blickrichtung
function konek(x,X,Y,s,d){x.save();x.translate(X,Y);x.scale(d*s,s);const p=new Path2D('M0,4C-2,-8 2,-20 10,-28C14,-32 20,-34 26,-32C30,-30 32,-26 30,-22L24,-20C22,-16 20,-14 16,-14C18,-10 18,-4 14,0C10,2 4,6 0,4Z');
  const g=x.createLinearGradient(0,-34,20,4);g.addColorStop(0,'#e8c890');g.addColorStop(.5,'#b08048');g.addColorStop(1,'#5a3a18');x.fillStyle=g;x.fill(p);x.strokeStyle='rgba(30,18,6,.9)';x.lineWidth=1.2;x.stroke(p);
  x.fillStyle='#2a1a0a';x.beginPath();x.arc(19,-26,1.6,0,7);x.fill();x.strokeStyle='rgba(60,36,12,.8)';x.lineWidth=.8;x.beginPath();x.moveTo(8,-22);x.quadraticCurveTo(12,-14,8,-4);x.moveTo(2,-12);x.lineTo(6,-18);x.moveTo(4,-4);x.lineTo(8,-10);x.stroke();
  for(let i=0;i<5;i++){x.strokeStyle='#8a5a2a';x.lineWidth=1.4;x.beginPath();x.moveTo(6-i*1.5,-24+i*3);x.lineTo(-2-i*1.5,-26+i*3);x.stroke()}x.restore()}
// Strohdach: Fläche aus vielen Halmen, unten ausgefranst
function thatch(x,pts,dirX,dirY){const p=new Path2D('M'+pts.map(q=>q.join(',')).join('L')+'Z');x.save();const g=x.createLinearGradient(0,Math.min(...pts.map(q=>q[1])),0,Math.max(...pts.map(q=>q[1])));
  g.addColorStop(0,'#c8a860');g.addColorStop(.6,'#a8843e');g.addColorStop(1,'#6a5020');x.fillStyle=g;x.fill(p);x.clip(p);
  const xs=pts.map(q=>q[0]),ys=pts.map(q=>q[1]),x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);
  for(let i=0;i<(x1-x0)*(y1-y0)/14;i++){const X=x0+R()*(x1-x0),Y=y0+R()*(y1-y0),l=6+R()*12;x.strokeStyle=R()<.5?`rgba(232,208,140,${.4+R()*.4})`:`rgba(90,64,24,${.3+R()*.4})`;x.lineWidth=.5+R()*.8;
    x.beginPath();x.moveTo(X,Y);x.lineTo(X+dirX*l+(R()-.5)*2,Y+dirY*l);x.stroke()}
  for(let k=0;k<3;k++){x.strokeStyle='rgba(70,50,18,.55)';x.lineWidth=1.6;x.beginPath();const t=.3+k*.22;x.moveTo(pts[0][0]+(pts[1][0]-pts[0][0])*t,pts[0][1]+(pts[1][1]-pts[0][1])*t);x.lineTo(pts[3][0]+(pts[2][0]-pts[3][0])*t,pts[3][1]+(pts[2][1]-pts[3][1])*t);x.stroke()}x.restore();
  for(let X=pts[3][0];X<pts[2][0];X+=2.2){const t=(X-pts[3][0])/(pts[2][0]-pts[3][0]),Y=pts[3][1]+(pts[2][1]-pts[3][1])*t;x.strokeStyle=R()<.5?'#d8b868':'#8a6a2a';x.lineWidth=.9;x.beginPath();x.moveTo(X,Y-2);x.lineTo(X+(R()-.5)*3,Y+3+R()*6);x.stroke()}}
function post(x,X,top,B,w=8){shadowAt(x,X,B,w*1.5,.5);wood(x,X-w/2,top,w,B-top,1);x.strokeStyle='rgba(16,10,4,.8)';x.lineWidth=.8;x.strokeRect(X-w/2,top,w,B-top)}
function hay(x,X,B,rw,h){shadowAt(x,X,B+2,rw*1.1,.55);const p=new Path2D(`M${X-rw},${B}C${X-rw*.9},${B-h*.7} ${X-rw*.4},${B-h} ${X},${B-h}C${X+rw*.5},${B-h} ${X+rw*.95},${B-h*.6} ${X+rw},${B}Z`);
  const g=x.createRadialGradient(X-rw*.3,B-h*.8,4,X,B-h*.4,rw*1.1);g.addColorStop(0,'#e8cc78');g.addColorStop(.6,'#b89448');g.addColorStop(1,'#6a5222');x.fillStyle=g;x.fill(p);x.save();x.clip(p);
  for(let i=0;i<rw*h*.5;i++){const a=R()*6.28,X0=X+(R()-.5)*rw*2,Y0=B-R()*h,l=4+R()*9;x.strokeStyle=R()<.55?`rgba(240,214,140,${.35+R()*.45})`:`rgba(96,70,26,${.3+R()*.4})`;x.lineWidth=.5+R()*.6;x.beginPath();x.moveTo(X0,Y0);x.lineTo(X0+Math.cos(a)*l,Y0+Math.sin(a)*l*.5);x.stroke()}x.restore();
  for(let i=0;i<40;i++){const X0=X-rw+R()*rw*2;x.strokeStyle=R()<.5?'#d8b868':'#8a6a2a';x.lineWidth=.7;x.beginPath();x.moveTo(X0,B-2);x.lineTo(X0+(R()-.5)*10,B-2-R()*8);x.stroke()}}
function barrel(x,X,B,s){shadowAt(x,X,B+1,16*s,.55);const w=14*s,h=30*s,p=new Path2D(`M${X-w*.85},${B}C${X-w*1.1},${B-h*.5} ${X-w*1.1},${B-h*.5} ${X-w*.85},${B-h}L${X+w*.85},${B-h}C${X+w*1.1},${B-h*.5} ${X+w*1.1},${B-h*.5} ${X+w*.85},${B}Z`);
  x.save();x.clip(p);wood(x,X-w*1.2,B-h,w*2.4,h,1);const sh=x.createLinearGradient(X-w,0,X+w,0);sh.addColorStop(0,'rgba(0,0,0,.45)');sh.addColorStop(.4,'rgba(255,230,180,.12)');sh.addColorStop(1,'rgba(0,0,0,.55)');x.fillStyle=sh;x.fill(p);x.restore();
  [.18,.82].forEach(t=>{x.strokeStyle='#2e2e2c';x.lineWidth=2.4*s;x.beginPath();x.moveTo(X-w*1.02,B-h*t);x.quadraticCurveTo(X,B-h*t+2*s,X+w*1.02,B-h*t);x.stroke()});ell(x,X,B-h,w*.85,3*s,[60,40,20]);ell(x,X,B-h+.6,w*.7,2*s,[24,20,16])}
function anvil(x,X,B){shadowAt(x,X,B+2,26,.6);wood(x,X-11,B-20,22,20,1);ell(x,X,B-20,11,3,[160,120,80]);x.strokeStyle='rgba(110,70,30,.6)';x.lineWidth=.5;for(let r=3;r<10;r+=2.5){x.beginPath();x.ellipse(X,B-20,r,r*.28,0,0,7);x.stroke()}
  const p=new Path2D(`M${X-8},${B-21}L${X-6},${B-28}L${X-16},${B-30}C${X-26},${B-31} ${X-30},${B-34} ${X-30},${B-36}L${X+18},${B-36}L${X+18},${B-30}L${X+8},${B-28}L${X+10},${B-21}Z`);
  const g=x.createLinearGradient(0,B-37,0,B-20);g.addColorStop(0,'#8a9096');g.addColorStop(.25,'#3e4246');g.addColorStop(1,'#16181a');x.fillStyle=g;x.fill(p);x.strokeStyle='#0a0a0a';x.lineWidth=.8;x.stroke(p);
  x.strokeStyle='rgba(220,230,240,.6)';x.lineWidth=1;x.beginPath();x.moveTo(X-28,B-36);x.lineTo(X+17,B-36);x.stroke();
  x.save();x.translate(X+6,B-38);x.rotate(-.5);wood(x,0,-1.6,22,3.2,0);x.fillStyle='#2a2c2e';x.fillRect(18,-4,7,8);x.restore()}
function horseshoe(x,X,Y,s){x.strokeStyle='#26282a';x.lineWidth=3.4*s;x.lineCap='butt';x.beginPath();x.arc(X,Y,6*s,Math.PI*.15,Math.PI*.85,true);x.stroke();x.strokeStyle='rgba(200,200,200,.5)';x.lineWidth=.8*s;x.beginPath();x.arc(X,Y,7*s,Math.PI*1.15,Math.PI*1.6);x.stroke();
  for(let a=-.7;a<=3.9;a+=.92){x.fillStyle='#8a8a86';x.beginPath();x.arc(X+Math.cos(a)*6*s,Y-Math.sin(a)*6*s,.6*s,0,7);x.fill()}}
function forge(x,X,B){// Esse: Steinsockel, glühende Kohle, schwarzer Rauchfang mit Rohr
  x.fillStyle='#1a1612';x.fillRect(X-48,B-42,96,42);for(let r=0;r<4;r++)for(let i=0;i<7;i++){const sx=X-44+i*14.5+(r%2)*6+(rn(i,r)-.5)*3,sy=B-6-r*10,rw=6+rn(i+3,r)*3,rh=4.2+rn(i,r+5)*1.4,c=mix([92,86,76],[150,142,128],rn(i*3,r*7)),g=x.createRadialGradient(sx-rw*.35,sy-rh*.5,0,sx,sy,rw*1.1);g.addColorStop(0,rgba(mix(c,[230,222,204],.35)));g.addColorStop(.6,rgba(c));g.addColorStop(1,rgba(mix(c,[10,8,6],.7)));x.fillStyle=g;x.beginPath();for(let a=0;a<6.28;a+=.7){const q=.82+rn(i*7+(a*10|0),r)*.3;x.lineTo(sx+Math.cos(a)*rw*q,sy+Math.sin(a)*rh*q)}x.fill();if(rn(i,r*3)<.3)ell(x,sx,sy-rh*.6,rw*.5,rh*.25,[30,26,22],.5)}
  {const sg=x.createLinearGradient(0,B-42,0,B);sg.addColorStop(0,'rgba(255,120,40,.18)');sg.addColorStop(.4,'rgba(0,0,0,0)');sg.addColorStop(1,'rgba(0,0,0,.45)');x.fillStyle=sg;x.fillRect(X-48,B-42,96,42)}
  for(let i=0;i<60;i++){const cx=X-34+R()*68,cy=B-44+R()*6;ell(x,cx,cy,2+R()*2,1.4+R(),R()<.5?[20,16,14]:[50,30,20])}
  x.save();x.globalCompositeOperation='lighter';for(let i=0;i<26;i++)dab(x,X-28+R()*56,B-44+R()*4,4+R()*6,R()<.5?[255,120,30]:[255,200,80],.5);dab(x,X,B-46,60,[255,120,40],.22);x.restore();
  const h=new Path2D(`M${X-40},${B-58}L${X+40},${B-58}L${X+14},${B-104}L${X-14},${B-104}Z`),g=x.createLinearGradient(X-40,0,X+40,0);g.addColorStop(0,'#3a3e40');g.addColorStop(.35,'#5a6064');g.addColorStop(1,'#141618');x.fillStyle=g;x.fill(h);x.strokeStyle='#0a0a0a';x.lineWidth=1;x.stroke(h);
  x.fillStyle='#222628';x.fillRect(X-42,B-60,84,5);x.fillStyle='#1c1e20';x.fillRect(X-7,B-176,14,74);x.fillStyle='rgba(160,170,176,.35)';x.fillRect(X-5,B-176,3,74);
  x.save();x.globalCompositeOperation='lighter';const gl=x.createLinearGradient(0,B-58,0,B-30);gl.addColorStop(0,'rgba(255,140,40,.45)');gl.addColorStop(1,'rgba(255,140,40,0)');x.fillStyle=gl;x.fillRect(X-40,B-58,80,28);x.restore();
  for(let i=0;i<12;i++)dab(x,X+2+i*1.6+R()*4,B-182-i*8,5+i*1.8,[190,194,196],.14)}
// Schmiede: Rundholzwände links/rechts, offene Mitte mit Esse, Giebel aus Brettern mit Pferdekopf, Brettdach
function smithy(x,X,B){shadowAt(x,X,B+6,190,.55);
  x.fillStyle='#160e08';x.fillRect(X-120,B-110,240,110);const ig=x.createRadialGradient(X+10,B-40,10,X+10,B-50,140);ig.addColorStop(0,'rgba(120,60,20,.6)');ig.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=ig;x.fillRect(X-120,B-110,240,110);
  // Werkzeug an der Rückwand
  [[X-70,B-96,30],[X-58,B-98,34],[X+70,B-96,28]].forEach(([tx,ty,l])=>{x.strokeStyle='#5a3e20';x.lineWidth=2.4;x.beginPath();x.moveTo(tx,ty);x.lineTo(tx,ty+l);x.stroke();x.fillStyle='#2a2c2e';x.fillRect(tx-4,ty+l-2,8,6)});
  forge(x,X+16,B);
  logWall(x,X-140,X-86,B,112,[1,0]);logWall(x,X+92,X+140,B,112,[0,1]);
  // Querbalken über der Öffnung
  wood(x,X-140,B-122,280,12,0);x.strokeStyle='rgba(16,10,4,.9)';x.lineWidth=1;x.strokeRect(X-140,B-122,280,12);
  // Giebel aus senkrechten Brettern
  const gab=new Path2D(`M${X-140},${B-122}L${X},${B-200}L${X+140},${B-122}Z`);boards(x,gab,X-140,X+140,B-202,B-120,{bw:9,grey:.3});wallFX(x,gab,X-140,X+140,B-200,B-122,{eave:22,side:.2});winR(x,X-12,B-168,24,16,{trim:'#6a5a48',kok:false,curtain:false});
  // Dachbretter (Ortgang) mit Zierschnitt
  [[-1],[1]].forEach(([d])=>{x.save();x.translate(X,B-204);x.rotate(d*Math.atan2(82,150));x.scale(d,1);wood(x,0,-6,170,12,0);x.strokeStyle='rgba(16,10,4,.9)';x.lineWidth=1;x.strokeRect(0,-6,170,12);
    for(let t=20;t<165;t+=14){x.fillStyle='#2a1a0a';x.beginPath();x.arc(t,6,3.4,0,Math.PI);x.fill()}x.restore()});
  konek(x,X-2,B-204,.78,1);horseshoe(x,X-112,B-100,1.3);
  // Dachfläche nach hinten (Bretter) sichtbar über dem Giebel
  {const t=lay();t.setTransform(x.getTransform());shingleRoof(t,[X+6,B-210],[X+40,B-216],[X+190,B-126],[X+150,B-122],{rows:12,sw:6,grey:.5,moss:.35,seed:131});x.save();x.setTransform(1,0,0,1,0,0);x.globalCompositeOperation='destination-over';x.drawImage(t.canvas,0,0);x.restore()}}
// Brunnen mit kleinem Dach und Kurbel
function well(x,X,B){shadowAt(x,X,B+3,46,.6);x.save();x.beginPath();x.rect(X-40,B-47,80,47);x.clip();roundLogs(x,X-30,X+30,B-1,B-46,9,{ends:[1,1],grey:.4});x.restore();wallFX(x,new Path2D(`M${X-30},${B-46}H${X+30}V${B}H${X-30}Z`),X-30,X+30,B-46,B,{eave:0});
  ell(x,X,B-46,30,6,[40,28,16]);ell(x,X,B-45,24,4,[8,10,14]);post(x,X-26,B-104,B-40,6);post(x,X+26,B-104,B-40,6);
  wood(x,X-30,B-84,60,7,0);x.fillStyle='#2a2a28';x.fillRect(X-2,B-80,4,30);x.strokeStyle='#2e2e2c';x.lineWidth=2;x.beginPath();x.moveTo(X+30,B-80);x.lineTo(X+40,B-80);x.lineTo(X+40,B-70);x.stroke();
  const rf=new Path2D(`M${X-44},${B-98}L${X},${B-132}L${X+44},${B-98}L${X+40},${B-94}L${X},${B-124}L${X-40},${B-94}Z`);x.save();x.clip(rf);for(let rx=X-44;rx<X+44;rx+=7){wood(x,rx,B-134,7,42,1);x.fillStyle='rgba(16,10,4,.7)';x.fillRect(rx,B-134,.8,42)}x.restore();x.strokeStyle='rgba(16,10,4,.9)';x.lineWidth=1;x.stroke(rf);
  x.fillStyle='#5a4a3a';x.beginPath();x.ellipse(X+12,B-58,5,6,0,0,7);x.fill();x.strokeStyle='#2e2e2c';x.lineWidth=1.2;x.beginPath();x.moveTo(X+12,B-64);x.lineTo(X+12,B-80);x.stroke()}
function paintSchmiede(){const o=S0;sky(o);far(o);ground(o);
  // Ferne: kleine Hütten auf dem Hügel, Birken
  let x=lay();izba(x,120,212,.28,0,{win:'dark',smoke:0});izba(x,690,214,.3,1,{trim:'#8a5a3a'});bgRow(x,26,204,232,10,18,0);put(x,.7);
  x=lay();grass(x,7000,o.hz,500,1);details(x);dirt(x,30);put(x);
  // Mittelgrund: Strohdach-Unterstand mit Heu, Fass, Schmiede, Holzstapel, Flechtzaun
  x=lay();wattle(x,600,800,384);bush(x,770,388,26,0);
  [[40,380],[150,384],[262,388]].forEach(([X,B])=>post(x,X,272,B,9));wood(x,26,282,252,8,0);hay(x,150,388,104,46);barrel(x,300,400,1.1);
  thatch(x,[[6,300],[150,214],[318,262],[296,300]],.7,.5);
  smithy(x,470,386);anvil(x,392,420);woodpile(x,664,412);woodpile(x,706,420);put(x);
  // Vordergrund: Brunnen, Büsche, Schild zurück
  x=lay();well(x,600,490);bush(x,40,470,24,0);bucket(x,662,486);sign(x,140,494,1.6,[[-1,0,'Zur Dorfstraße','hSD']]);put(x);
  x=lay();grass(x,600,470,515,2.4,1);bush(x,780,505,36,1);put(x,1);rays(o,[[.4,.06],[.7,.05]]);grade(o)}
// ----- Gegenstände & Texte -----
Object.assign(T,{
  schmiedeH:{n:'Schmiede',at:[470,420],l:[[['P','Eine Schmiede aus dicken Stämmen. Offen, warm, und es riecht nach Eisen.'],['P','Wenn hier einer was repariert kriegt, dann der Schmied. Wenn er mal da wäre.']],[['P','Auf dem Giebel sitzt ein geschnitztes Pferd. Soll Glück bringen.'],['P','Mir hat bisher nur Pech was gebracht. Aber das gratis.']]]},
  esse:{n:'Esse',at:[490,416],l:[[['P','Die Kohle glüht noch. Der Schmied kann nicht weit sein.'],['P','Ich halt mal die Hände hin. ...Herrlich. Das Einzige im Märchen, das mich nicht beißen will.']]]},
  amboss:{n:'Amboss',at:[410,428],l:[[['P','Ein Amboss. Schwer, schwarz, ehrlich.'],['P','Den klaut keiner. Ich hab es versucht. Gedanklich.']]]},
  hufeisen:{n:'Hufeisen',at:[360,418],l:[[['P','Ein Hufeisen über der Tür. Mit der Öffnung nach oben, damit das Glück nicht rausfällt.'],['P','Bei mir ist es schon lange rausgefallen.']]]},
  heu:{n:'Heuhaufen',at:[180,424],l:[[['P','Ein Heuhaufen. Riecht nach Sommer und nach Mäusen.'],['P','Wenn ich mich jetzt reinlege, steh ich erst nächstes Jahr wieder auf.']]]},
  fass:{n:'Fass',at:[300,418],l:[[['P','Ein Fass. Drin ist Wasser. Leider.']]]},
  brunnen:{n:'Brunnen',at:[660,492],l:[[['P','Ein Brunnen mit eigenem Dach. Hat mehr Dach als ich.'],['P','*ruft rein* Hallo? ...Nur Echo. Und ein Frosch, der genervt guckt.']]]},
  holz:{n:'Holzstapel',at:[640,436],l:[[['P','Ordentlich gestapelt. Jemand hier hat sein Leben im Griff.'],['P','Ich nicht. Aber das wussten wir ja.']]]},
  sSD:{n:'Schild: Zur Dorfstraße',at:[150,488],go:'dorfstr',to:[470,372]},
  sSm:{n:'Schild: Zum Schmiedehof',at:[470,372],go:'schmiede',to:[160,486]}});
BARKS.schmiede=['Hier riecht es nach Eisen, Heu und Arbeit. Zwei davon mag ich.','Der Brunnen gluckert. Ich krieg Durst. Auf Kwas.','Irgendwo hämmert einer. Oder mein Kopf. Schwer zu sagen.','Das Pferd auf dem Giebel guckt, als wüsste es was.'];
ENTRY.schmiede=['Der Schmiedehof. Die Esse glüht immer noch.','Wieder beim Schmied. Er ist immer noch Bier holen. Respekt.'];
MORE.esse=[['P','Ein paar Funken springen hoch. Ich spring auch. Nach hinten.']];MORE.brunnen=[['P','Der Frosch ist immer noch da. Wir sind jetzt quasi Kollegen.']];
LOCN.schmiede='Schmiedehof';MAPN.schmiede=[106,36];MAPE.push(['dorfstr','schmiede']);
// Ausgangs-Schilder als Ausgang markieren (diese Datei lädt nach der Bedienung), Ambiente, Musik, Tester-Sprung
document.querySelectorAll('[data-id="sSD"],[data-id="sSm"]').forEach(e=>e.classList.add('exit'));
RECIPE.schmiede=k=>{RECIPE.dorfstr(k);k.every(2600,6500,()=>{const p=k.P(),n=2+(Math.random()*3|0);for(let i=0;i<n;i++)setTimeout(()=>k.pickaxe(.05,p),i*420)})};
MOOD.schmiede='dorf';TTELE.schmiede=[300,470];
