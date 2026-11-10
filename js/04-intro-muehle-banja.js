// ================= Intro-Zwischensequenz =================
const WOWA=`<g stroke="#1a1208" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round">
<path d="M-30,0L-30,-12L-6,-12L-4,0Z" fill="#f0f0ea"/><path d="M4,0L6,-12L30,-12L32,0Z" fill="#f0f0ea"/><path d="M-30,-3H-4M4,-3H32" stroke="#888" stroke-width=".8"/>
<path d="M-24,-12L-22,-130L-2,-130L-6,-12Z" fill="#2a3a7a"/><path d="M6,-12L2,-130L22,-130L24,-12Z" fill="#2a3a7a"/><path d="M-20,-128L-23,-14M20,-128L23,-14" stroke="#f0f0f0" stroke-width="2.4"/>
<path d="M-30,-130L-34,-200C-30,-214 30,-214 34,-200L30,-130Z" fill="#2a3a7a"/><path d="M0,-210V-132" stroke="#c8c8c8" stroke-width="1"/><path d="M-10,-210L0,-196L10,-210" fill="none" stroke="#f0f0f0" stroke-width="2.4"/>
<path d="M-12,-208C-10,-190 10,-190 12,-208" fill="none" stroke="#e8c040" stroke-width="2.2"/><circle cx="0" cy="-192" r="3" fill="#e8c040"/>
<path d="M-34,-200C-46,-180 -48,-150 -44,-126L-34,-126C-36,-150 -34,-176 -26,-190Z" fill="#2a3a7a"/><path d="M-40,-196L-46,-130" stroke="#f0f0f0" stroke-width="2"/><ellipse cx="-39" cy="-122" rx="6" ry="7" fill="#e0b090"/>
<path d="M34,-200C48,-192 52,-176 46,-160L36,-162C40,-174 36,-184 28,-190Z" fill="#2a3a7a"/><path d="M42,-196L48,-166" stroke="#f0f0f0" stroke-width="2"/><ellipse cx="42" cy="-158" rx="6.5" ry="6" fill="#e0b090"/>
<path d="M42,-160L58,-182L62,-179L46,-157Z" fill="#f4f0e2"/><circle cx="60" cy="-181" r="2.4" fill="#ff7030" stroke="none"/>
<path d="M-6,-210L-6,-218L6,-218L6,-210Z" fill="#e0b090"/>
<ellipse cx="-17" cy="-232" rx="4" ry="6" fill="#e0b090"/><ellipse cx="17" cy="-232" rx="4" ry="6" fill="#e0b090"/>
<ellipse cx="0" cy="-232" rx="17" ry="21" fill="#e8b896"/>
<path d="M-18,-240C-18,-258 18,-258 18,-240Z" fill="#a02020"/><path d="M14,-246L32,-243L30,-238L14,-240Z" fill="#801818"/>
<ellipse cx="-7" cy="-251" rx="6" ry="3.5" fill="#1a1a1a"/><ellipse cx="7" cy="-251" rx="6" ry="3.5" fill="#1a1a1a"/><path d="M-1,-251H1" stroke="#1a1a1a" stroke-width="1.6"/>
<path d="M-11,-236C-8,-238 -4,-238 -2,-236M2,-236C4,-238 8,-238 11,-236" fill="none" stroke-width="1.8"/><path d="M-10,-233C-7,-231 -4,-231 -3,-233M3,-233C4,-231 7,-231 10,-233" fill="none" stroke="#c07070" stroke-width=".8"/>
<path d="M0,-234L-2,-226L2,-225" fill="none" stroke-width=".9"/>
<path d="M-10,-219C-4,-212 4,-212 10,-219C4,-216 -4,-216 -10,-219Z" fill="#7a2a2a"/><path d="M-7,-218H-1.5M1.5,-218H7" stroke="#f4f4e8" stroke-width="1.6"/>
<path d="M-12,-222l1,1M-8,-216l1,1M8,-216l1,1M12,-222l1,1M-4,-213l1,1M4,-213l1,1" stroke="#6a5040" stroke-width=".8"/></g>`;
let WOWAIMG=null;const PETIMG=new Image();
function aptPaint(){const o=document.createElement('canvas');o.width=W;o.height=H;const x=o.getContext('2d');x.setTransform(SC,0,0,SC,0,0);s=777;
  x.fillStyle='#7a6a4e';x.fillRect(0,0,800,380);for(let X=0;X<800;X+=24){x.fillStyle=(X/24)%2?'rgba(60,40,20,.18)':'rgba(255,240,200,.06)';x.fillRect(X,0,12,380)}for(let i=0;i<300;i++)ell(x,R()*800,R()*380,2,3,[140,120,80],.25);
  for(let i=0;i<50;i++)dab(x,R()*800,R()*380,10+R()*30,[40,30,20],.15);
  x.fillStyle='#5a3a24';x.fillRect(0,380,800,120);for(let Y=380;Y<500;Y+=14)for(let X=(Y/14%2)*20;X<800;X+=40){x.strokeStyle='rgba(20,10,4,.6)';x.strokeRect(X,Y,40,14)}
  x.fillStyle='#2a1a10';x.fillRect(0,376,800,8);
  const sk=x.createLinearGradient(0,70,0,250);sk.addColorStop(0,'#0a1028');sk.addColorStop(1,'#2a2a48');x.fillStyle=sk;x.fillRect(60,70,170,190);
  [[70,150,40,110],[115,120,50,140],[170,170,50,90]].forEach(([X,Y,w,h])=>{x.fillStyle='#14141c';x.fillRect(X,Y,w,h);for(let a=0;a<w-6;a+=8)for(let b=0;b<h-6;b+=10)if(R()<.4){x.fillStyle=R()<.7?'#f0c860':'#a0c0f0';x.fillRect(X+3+a,Y+4+b,4,5)}});
  x.strokeStyle='#d8d0c0';x.lineWidth=7;x.strokeRect(60,70,170,190);x.lineWidth=4;x.beginPath();x.moveTo(145,70);x.lineTo(145,260);x.moveTo(60,140);x.lineTo(230,140);x.stroke();
  x.fillStyle='rgba(180,140,90,.85)';x.beginPath();x.moveTo(40,60);x.quadraticCurveTo(70,160,48,270);x.lineTo(30,270);x.lineTo(30,60);x.fill();x.beginPath();x.moveTo(250,60);x.quadraticCurveTo(222,160,246,270);x.lineTo(262,270);x.lineTo(262,60);x.fill();
  x.fillStyle='#8a1a1a';x.fillRect(300,70,320,200);x.strokeStyle='#d8b060';x.lineWidth=4;x.strokeRect(310,80,300,180);x.strokeStyle='#1a2a5a';x.lineWidth=6;x.strokeRect(322,92,276,156);
  x.fillStyle='#c84020';x.beginPath();x.moveTo(460,110);x.lineTo(540,170);x.lineTo(460,230);x.lineTo(380,170);x.fill();x.fillStyle='#1a2a5a';x.beginPath();x.moveTo(460,135);x.lineTo(505,170);x.lineTo(460,205);x.lineTo(415,170);x.fill();x.fillStyle='#d8b060';x.beginPath();x.arc(460,170,12,0,7);x.fill();
  for(let i=0;i<60;i++){const X=330+R()*260,Y=100+R()*140;ell(x,X,Y,2,2,P2([[216,176,96],[30,50,100],[220,220,200]]),.8)}
  x.fillStyle='#6a3a1a';x.fillRect(280,250,380,40);x.fillStyle='#8a4a22';x.fillRect(290,290,360,50);x.fillStyle='#5a2a12';x.fillRect(270,240,30,110);x.fillRect(640,240,30,110);
  for(let i=0;i<200;i++)ell(x,280+R()*390,245+R()*100,1,1,[200,120,60],.3);x.fillStyle='#3a1a0a';x.fillRect(290,340,360,14);[[300,354],[630,354]].forEach(([X,Y])=>x.fillRect(X,Y,10,26));
  x.fillStyle='#e8dcc0';x.fillRect(298,262,60,28);
  x.fillStyle='#4a3020';x.fillRect(70,300,140,80);x.fillStyle='#2a2a2a';x.fillRect(84,240,112,64);x.fillStyle='#3a5a6a';x.fillRect(94,248,80,48);x.fillStyle='#5a5a5a';x.fillRect(178,250,12,40);
  x.strokeStyle='#3a3a3a';x.lineWidth=1.5;x.beginPath();x.moveTo(140,240);x.lineTo(120,206);x.moveTo(140,240);x.lineTo(166,210);x.stroke();
  x.strokeStyle='#3a3020';x.lineWidth=3;x.beginPath();x.moveTo(250,380);x.lineTo(250,150);x.stroke();x.fillStyle='#d8b060';x.beginPath();x.moveTo(228,150);x.lineTo(272,150);x.lineTo(262,120);x.lineTo(238,120);x.fill();
  x.save();x.globalCompositeOperation='lighter';dab(x,250,150,120,[255,190,90],.25);x.restore();
  [[330,400],[350,410],[600,396]].forEach(([X,Y],i)=>{x.fillStyle=i==2?'#6a8a5a':'#3a6a3a';x.fillRect(X,Y-26,10,26);x.fillRect(X+3,Y-34,4,8)});ell(x,430,404,16,5,[60,60,60]);ell(x,430,402,12,3,[30,30,30]);
  x.fillStyle='#2a5a8a';x.beginPath();x.ellipse(520,420,18,7,0,0,7);x.fill();x.beginPath();x.ellipse(556,424,18,7,0,0,7);x.fill();
  const vg=x.createRadialGradient(440,240,100,440,240,520);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.55)');x.fillStyle=vg;x.fillRect(0,0,800,500);return o}
function cutscene(){changing=true;const cv3=document.createElement('canvas');cv3.id='cut';cv3.width=W;cv3.height=H;cv3.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:15';$('#game').appendChild(cv3);
  const x=cv3.getContext('2d'),APT=aptPaint(),PI=PETIMG;const FOR=cache.wald||cv;
  let st='room',wx=860,door=0,blur=0,dark=1,lid=0,fin=false,tilt=0;
  const tween=(ms,f)=>new Promise(r=>{const a=performance.now();(function k(){const p=Math.min(1,(performance.now()-a)/ms);f(p);p<1?requestAnimationFrame(k):r()})()}),talk=l=>new Promise(r=>say(l,r)),wait=ms=>new Promise(r=>setTimeout(r,ms));
  function wowa(X,B,sc){if(!WOWAIMG)return;x.drawImage(WOWAIMG,X+(-52)*sc,B-262*sc,104*sc,266*sc)}
  function draw(){if(fin)return;const T=performance.now()/1000;x.setTransform(1,0,0,1,0,0);x.filter='none';x.fillStyle='#000';x.fillRect(0,0,W,H);
    if(st=='room'){x.drawImage(APT,0,0);x.setTransform(SC,0,0,SC,0,0);x.fillStyle='#120c08';x.fillRect(690,100,100,280);x.fillStyle='#6a4a2a';x.fillRect(690,100,100*(1-door*.85),280);x.strokeStyle='#2a1a0c';x.lineWidth=2;x.strokeRect(690,100,100*(1-door*.85),280);
      x.save();x.translate(560,300);x.rotate(-Math.PI/2);x.scale(.8,.8);if(PI.complete&&PI.naturalWidth)x.drawImage(PI,-48,-254,96,258);x.restore();
      x.save();x.globalCompositeOperation='lighter';dab(x,388,292,6+Math.sin(T*3)*2,[255,120,40],.9);x.restore();
      for(let i=0;i<6;i++){const p=(T*.35+i/6)%1;dab(x,388+Math.sin(p*6+i)*12,292-p*120,6+p*20,[200,200,210],.25*(1-p))}
      if(wx<800)wowa(wx,382,.95)}
    if(st=='fp'){x.setTransform(1,0,0,1,0,0);x.filter=`blur(${blur*SC}px) saturate(${1+blur*.2}) hue-rotate(${blur*14}deg)`;x.translate(W/2,H/2);x.rotate(Math.sin(T*1.3)*.012*blur);const z=1.6+Math.sin(T*.9)*.015*blur;x.scale(z,z);x.translate(-W/2,-H/2-30*SC);x.drawImage(APT,0,0);
      x.setTransform(SC,0,0,SC,0,0);if(blur>1){x.globalAlpha=Math.min(.5,blur*.06);x.drawImage(APT,-60,-100,1280,800);x.globalAlpha=1}
      x.filter=`blur(${blur*SC*.8}px)`;wowa(430+Math.sin(T)*blur*4,640,2.3);if(blur>1.5){x.globalAlpha=.35;wowa(430+blur*6,640,2.3);wowa(430-blur*6,640,2.3);x.globalAlpha=1}
      x.filter='none';x.fillStyle='#f4f0e2';x.save();x.translate(606,462);x.rotate(-.85);x.fillRect(-6,-70,12,74);x.restore();x.strokeStyle='#5a3a24';x.lineWidth=2;x.fillStyle='#e0b090';x.beginPath();x.ellipse(680,520,70,46,-.55,0,7);x.fill();x.stroke();[[618,470,16,10,-.6],[634,458,16,10,-.6],[652,450,15,9,-.6],[668,446,13,8,-.6],[598,494,18,10,-1.2]].forEach(([a,b,c,d,r])=>{x.beginPath();x.ellipse(a,b,c,d,r,0,7);x.fill();x.stroke()});x.fillStyle='#2a3a7a';x.fillRect(700,470,120,40);
      x.save();x.globalCompositeOperation='lighter';dab(x,550,420,10+Math.sin(T*4)*3,[255,110,30],.95);x.restore();for(let i=0;i<5;i++){const p=(T*.3+i/5)%1;dab(x,550+Math.sin(p*5+i)*20,420-p*200,10+p*40,[220,220,230],.3*(1-p))}}
    if(st=='wake'){x.setTransform(1,0,0,1,0,0);x.filter=`blur(${blur*SC}px)`;x.translate(W/2,H/2);x.rotate(tilt);x.scale(1.12,1.12);x.translate(-W/2,-H/2);x.drawImage(FOR,0,0,W,H);x.setTransform(1,0,0,1,0,0);x.filter='none';
      if(lid>0){x.fillStyle='#000';const h=H/2*lid;x.beginPath();x.moveTo(0,0);x.lineTo(W,0);x.lineTo(W,h);x.quadraticCurveTo(W/2,h+H*.22*lid,0,h);x.fill();x.beginPath();x.moveTo(0,H);x.lineTo(W,H);x.lineTo(W,H-h);x.quadraticCurveTo(W/2,H-h-H*.22*lid,0,H-h);x.fill()}}
    x.setTransform(1,0,0,1,0,0);if(dark>0){x.fillStyle=`rgba(0,0,0,${dark})`;x.fillRect(0,0,W,H)}requestAnimationFrame(draw)}
  requestAnimationFrame(draw);
  (async()=>{await tween(1500,p=>dark=1-p);
    await talk([['P','Samstag. Kein Geld, kein Job, kein Plan. Perfekt.'],['P','*zieht am Joint* ...Das Zeug war auch schon mal besser.']]);
    await tween(700,p=>door=p);await tween(1500,p=>wx=860-260*p);
    await talk([['WO','Petja! Bruder! Rauchst du immer noch diesen Gartenabfall?'],['P','Wowa. Wie bist du reingekommen?'],['WO','Tür war offen. Wie immer. Hör zu: Ich hab was Neues. Ganz neu. Ganz krass.'],
      ['WO','Kräuter von Oma, Bruder! Hab ich von so ’nem Typen am Markt. Der hatte komische Augen. Und Schwimmhäute. Egal!'],['WO','Er sagt: Ein Zug, und du bist in einer anderen Welt. Märchenwelt!'],['P','Klingt nach Ärger.'],['WO','Klingt nach Samstag!'],['P','...Na gut. Gib her.']]);
    await tween(700,p=>dark=p);st='fp';await tween(700,p=>dark=1-p);
    await talk([['P','*zieht*'],['P','*hust* ...*HUST*']]);await tween(2500,p=>blur=p*3);
    await talk([['WO','Und? Und? Merkst du was?'],['P','Wowa... warum... hast du drei Nasen?'],['WO','Bruder? ...BRUDER?!']]);
    await tween(3500,p=>{blur=3+p*10;dark=p});await wait(1500);
    st='wake';blur=12;lid=1;tilt=-.12;dark=0;await wait(800);await tween(700,p=>lid=1-p*.55);await tween(350,p=>lid=.45+p*.55);await wait(500);
    await tween(2200,p=>{lid=1-p;blur=12*(1-p)+1.5;tilt=-.12*(1-p)});await tween(800,p=>blur=1.5*(1-p));
    await talk([['P','Uhhh... mein Kopf...'],['P','Wo bin ich? Das ist nicht meine Wohnung. Meine Wohnung hat weniger... Birken.'],['P','Der Joint von Wowa. Er hat gesagt, da sind „Kräuter von Oma" drin. Was für eine Oma? ...Natürlich passiert mir das.'],['P','Na super. Dann muss ich wohl irgendwie wieder aufwachen.']]);
    fade.style.opacity=1;await wait(450);fin=true;cv3.remove();changing=false;fade.style.opacity=0})()}
// ================= Die alte Mühle =================
function millHouse(x){shadowAt(x,250,376,170,.6);
  for(let X=120;X<380;X+=18)for(let Y=340;Y<378;Y+=12){const g=x.createRadialGradient(X+6,Y+3,1,X+9,Y+6,14);g.addColorStop(0,'#9a968a');g.addColorStop(1,'#4a4740');x.fillStyle=g;x.beginPath();x.ellipse(X+9+((Y/12)%2)*6,Y+6,9.5,6.5,0,0,7);x.fill()}
  const side=new Path2D('M360,342L360,200L410,176L410,330Z');x.save();x.clip(side);for(let X=356;X<414;X+=9)wood(x,X,160,9,190,1);x.fillStyle='rgba(0,0,0,.4)';x.fill(side);x.restore();
  for(let X=130;X<360;X+=11){wood(x,X,200,11,142,1);x.fillStyle='rgba(120,120,120,.25)';x.fillRect(X,200,11,142);x.fillStyle='rgba(10,8,4,.8)';x.fillRect(X,200,1,142)}
  const gab=new Path2D('M130,202L245,112L360,202Z');x.save();x.clip(gab);for(let X=130;X<360;X+=11){wood(x,X,108,11,96,1);x.fillStyle='rgba(10,8,4,.8)';x.fillRect(X,108,1,96)}x.fillStyle='rgba(120,120,120,.2)';x.fill(gab);x.restore();
  const roof=new Path2D('M245,106L292,82L420,176L374,204Z');x.save();x.clip(roof);x.fillStyle='#3a3026';x.fill(roof);for(let r=0;r<20;r++)for(let k=0;k<12;k++){const t=r/20,u=k/12;const X=245+47*u+129*t,Y=106-24*u+98*t;x.fillStyle=rgba(mix([50,42,32],[100,88,70],R()),1);x.fillRect(X,Y,9,6);x.fillStyle='rgba(0,0,0,.5)';x.fillRect(X,Y+5,9,1)}
  for(let i=0;i<120;i++)ell(x,250+R()*170,90+R()*110,1+R()*3,1+R()*2,mix([50,80,20],[110,140,50],R()),.75);x.restore();
  x.lineCap='round';x.strokeStyle='#1a140c';x.lineWidth=7;x.beginPath();x.moveTo(118,212);x.lineTo(245,104);x.lineTo(372,212);x.stroke();x.strokeStyle='#6a5a44';x.lineWidth=4;x.stroke();
  wood(x,232,96,26,8,0);x.strokeStyle='#3a3a3a';x.lineWidth=1;x.beginPath();x.moveTo(252,104);x.lineTo(252,170);x.stroke();x.fillStyle='#4a4a4a';x.beginPath();x.arc(252,104,4,0,7);x.fill();ell(x,252,176,9,7,[200,186,150]);
  x.fillStyle='#120c06';x.fillRect(196,268,44,74);for(let X=198;X<238;X+=8)wood(x,X,270,8,72,1);x.fillStyle='rgba(0,0,0,.35)';x.fillRect(198,270,40,72);x.strokeStyle='#2a2a2a';x.lineWidth=2;x.beginPath();x.moveTo(200,290);x.lineTo(236,290);x.moveTo(200,320);x.lineTo(236,320);x.stroke();
  [[150,230],[290,230],[290,290]].forEach(([X,Y],i)=>{x.fillStyle='#1a1c1e';x.fillRect(X,Y,30,28);x.strokeStyle='#4a3a28';x.lineWidth=3;x.strokeRect(X,Y,30,28);x.beginPath();x.moveTo(X+15,Y);x.lineTo(X+15,Y+28);x.moveTo(X,Y+14);x.lineTo(X+30,Y+14);x.stroke();
    if(i==1){x.strokeStyle='rgba(220,220,220,.5)';x.lineWidth=.7;x.beginPath();x.moveTo(X+2,Y+2);x.lineTo(X+12,Y+10);x.lineTo(X+6,Y+14);x.stroke()}});
  wood(x,190,160,110,16,0);x.fillStyle='rgba(230,220,190,.55)';x.font='bold 12px Georgia';x.textAlign='center';x.fillText('M Ü H L E',245,172);web(x,130,202,26,0)}
function flume(x){[[620,214],[560,218],[500,222]].forEach(([X,Y])=>{wood(x,X-2,Y,4,130,1);ripple(x,X,Y+128,6)});x.save();x.beginPath();x.moveTo(660,206);x.lineTo(444,222);x.lineTo(444,232);x.lineTo(660,216);x.closePath();x.clip();wood(x,440,200,224,34,0);x.restore();
  x.strokeStyle='rgba(180,210,220,.8)';x.lineWidth=2;x.beginPath();x.moveTo(660,207);x.lineTo(446,223);x.stroke()}
function millPond(x){const p=new Path2D('M330,396C330,376 380,366 440,366C520,366 540,380 536,398C520,408 360,410 330,396Z');const g=x.createLinearGradient(0,366,0,410);g.addColorStop(0,'#5a7a7c');g.addColorStop(1,'#1a2a2a');x.fillStyle=g;x.fill(p);
  x.strokeStyle='rgba(40,30,20,.8)';x.lineWidth=5;x.stroke(p);const ch=new Path2D('M0,360C80,352 200,352 340,384L340,396C200,368 80,368 0,376Z');x.fillStyle='#2a3e40';x.fill(ch);
  for(let i=0;i<40;i++){x.strokeStyle=`rgba(220,235,235,${.1+R()*.3})`;x.lineWidth=1;const X=340+R()*190,Y=372+R()*30;x.beginPath();x.moveTo(X,Y);x.lineTo(X+8+R()*20,Y);x.stroke()}
  for(let i=0;i<30;i++)dab(x,400+R()*50,368+R()*14,4+R()*6,[240,250,250],.5)}
function millstone(x,X,Y,r,lean){x.save();x.translate(X,Y);x.scale(lean,1);const g=x.createRadialGradient(-r*.3,-r*1.2,1,0,-r,r*1.2);g.addColorStop(0,'#b0aca0');g.addColorStop(1,'#5a5850');x.fillStyle=g;x.beginPath();x.arc(0,-r,r,0,7);x.fill();
  x.strokeStyle='rgba(40,40,36,.6)';x.lineWidth=1;for(let k=0;k<8;k++){const a=k/8*6.28;x.beginPath();x.moveTo(Math.cos(a)*r*.25,-r+Math.sin(a)*r*.25);x.lineTo(Math.cos(a+.3)*r*.95,-r+Math.sin(a+.3)*r*.95);x.stroke()}x.fillStyle='#2a2824';x.beginPath();x.arc(0,-r,r*.18,0,7);x.fill();x.restore()}
function sacks(x,X,Y){[[0,0],[22,2],[11,-16],[34,-4]].forEach(([a,b])=>{shadowAt(x,X+a,Y+b+2,14,.4);ell(x,X+a,Y+b-8,12,10,[214,200,166]);ell(x,X+a-3,Y+b-11,5,3,[240,230,200],.7);x.strokeStyle='#8a7a5a';x.lineWidth=1.4;x.beginPath();x.moveTo(X+a-3,Y+b-18);x.lineTo(X+a+3,Y+b-18);x.stroke()});
  for(let i=0;i<20;i++)dab(x,X+10+(R()-.5)*60,Y+4+R()*6,3+R()*4,[240,236,226],.4)}
function cart(x,X,Y){shadowAt(x,X,Y+2,50,.5);wood(x,X-44,Y-26,88,10,0);wood(x,X-44,Y-40,88,6,0);x.strokeStyle='#3a2a18';x.lineWidth=3;x.beginPath();x.moveTo(X-44,Y-26);x.lineTo(X-90,Y-6);x.stroke();
  x.strokeStyle='#3a2a18';x.lineWidth=3;x.beginPath();x.arc(X+28,Y-12,13,0,7);x.stroke();for(let k=0;k<6;k++){const a=k/6*6.28;x.beginPath();x.moveTo(X+28,Y-12);x.lineTo(X+28+Math.cos(a)*13,Y-12+Math.sin(a)*13);x.stroke()}
  x.save();x.translate(X-30,Y+2);x.scale(1,.35);x.beginPath();x.arc(0,0,13,0,7);x.stroke();x.restore()}
function willow(x,X,B){x.strokeStyle='#2a2018';x.lineWidth=10;x.beginPath();x.moveTo(X,B);x.quadraticCurveTo(X-6,B-50,X+4,B-90);x.stroke();for(let i=0;i<5;i++)foliage(x,X+(R()-.5)*70,B-100+(R()-.5)*30,26,0,1);
  for(let i=0;i<50;i++){const sx=X+(R()-.5)*110,sy=B-110+R()*30,L=40+R()*60;x.strokeStyle=rgba(mix(S0.fol[1],S0.fol[2],R()),.8);x.lineWidth=1.2;x.beginPath();x.moveTo(sx,sy);x.quadraticCurveTo(sx+3,sy+L*.5,sx+(R()-.5)*8,sy+L);x.stroke()}}
function paintMuehle(){const o=S0;sky(o);far(o);ground(o);
  let x=lay();bgRow(x,30,206,250,12,22,0);[[80,240,6,0,96],[520,236,5,1,104],[700,244,6,-1,100]].forEach(b=>birch(x,...b));put(x,.6);
  x=lay();grass(x,7000,o.hz,500,1);details(x);dirt(x,30);leavesOnPath(x,80);put(x);
  x=lay();willow(x,700,330);millPond(x);flume(x);millHouse(x);[[520,372,20,32],[300,382,10,24],[560,380,12,28],[20,368,14,30]].forEach(a=>reeds(x,...a));
  millstone(x,150,410,26,.45);millstone(x,182,414,24,.4);sacks(x,410,446);cart(x,600,452);fence2(x,640,820,420,null);rock(x,500,470,14,1);shrooms(x,90,430,4);
  sign(x,700,486,1.6,[[1,0,'Zum Dorf','hMD']]);sign(x,90,472,1.4,[[-1,0,'In den Irrwald','hIW']]);put(x);
  x=lay();grass(x,600,470,515,2.4,1);bush(x,30,500,40,1);put(x,1);rays(o,[[.3,.07],[.55,.05]]);grade(o)}
// ================= Irrwald & Banja =================
function paintIrrwald(){const o=S0;sky(o);far(o);ground(o);
  let x=lay();for(let i=0;i<40;i++){const X=R()*820-10,b=212+R()*70;R()<.5?fir(x,X,b,120+R()*160,40+R()*40,.2):trunk(x,X,b,4+R()*8)}put(x,.8);fog(300,.35);
  x=lay();grass(x,4000,o.hz,500,1);details(x);leavesOnPath(x,60);put(x);
  x=lay();[[60,470],[160,400],[250,330],[600,330],[700,400],[790,470],[330,300],[540,300]].forEach(([X,b])=>{const t=(b-200)/300;R()<.5?trunk(x,X,b,8+t*40):deadTree(x,X,b,200+t*200,6+t*10,'#14120e');bush(x,X,b+4,10+t*30,1)});
  for(let i=0;i<7;i++){const X=60+R()*680,Y=240+R()*90;dab(x,X-4,Y,3,[255,220,60],.9);dab(x,X+4,Y,3,[255,220,60],.9)}
  sign(x,318,392,1.15,[[-1,0,'Links','hIL']]);sign(x,540,392,1.15,[[1,0,'Rechts','hIR']]);sign(x,470,318,.95,[[1,0,'Geradeaus','hIG']]);sign(x,110,486,1.6,[[-1,0,'Zurück zur Mühle','hIM']]);put(x);
  x=lay();for(let i=0;i<40;i++)dab(x,R()*800,280+R()*200,40+R()*50,[150,170,180],.18);put(x,8,'screen',.6);
  grade(o)}
// Vor dem Banja: Blockhaus mit Rotlicht, ringsum dunkler Wald
function paintBanjaV(){const o=S0;sky(o);far(o);ground(o);
  let x=lay();for(let i=0;i<60;i++){const X=R()*820-10,b=206+R()*50;R()<.65?fir(x,X,b,140+R()*170,44+R()*40,.05):trunk(x,X,b,5+R()*8)}put(x,.8);fog(290,.45);
  x=lay();grass(x,3000,o.hz,500,1);details(x);leavesOnPath(x,40);put(x);
  x=lay();const L=262,Rt=578,B=376,T=262;
  // Haus: Blockwand, Giebel, Dach
  shadowAt(x,420,390,300,.7);x.save();x.translate(420,384);x.scale(1.5,1.5);x.translate(-420,-B);x.save();x.beginPath();x.rect(L,T,Rt-L,B-T);x.clip();logWall(x,L,Rt,T,B);x.restore();
  x.fillStyle='rgba(30,0,20,.45)';x.fillRect(L,T,Rt-L,B-T);
  const gab=new Path2D(`M${L+10},${T}L420,182L${Rt-10},${T}Z`);x.save();x.clip(gab);logWall(x,L,Rt,170,T);x.fillStyle='rgba(30,0,20,.5)';x.fillRect(L,170,Rt-L,T-170);x.restore();
  x.lineCap='round';x.strokeStyle='#120a06';x.lineWidth=12;x.beginPath();x.moveTo(L-26,T+14);x.lineTo(420,168);x.lineTo(Rt+26,T+14);x.stroke();x.strokeStyle='#3a2a1a';x.lineWidth=6;x.stroke();
  wood(x,520,150,22,44,1);for(let i=0;i<14;i++)dab(x,531+(R()-.5)*20+i*2,140-i*9,10+i*2,[220,210,220],.18);
  // Fenster mit Rotlicht
  [[290,300],[506,300]].forEach(([X,Y])=>{x.save();x.globalCompositeOperation='lighter';dab(x,X+22,Y+16,60,[255,40,120],.35);x.restore();x.fillStyle='#ff5aa8';x.fillRect(X,Y,44,32);x.fillStyle='rgba(120,0,40,.5)';x.fillRect(X,Y+16,44,16);
    x.strokeStyle='#2a1a10';x.lineWidth=4;x.strokeRect(X,Y,44,32);x.beginPath();x.moveTo(X+22,Y);x.lineTo(X+22,Y+32);x.stroke();x.fillStyle='rgba(20,0,10,.55)';x.beginPath();x.ellipse(X+30,Y+22,6,10,0,0,7);x.fill()});
  // Tür, einen Spalt offen
  x.fillStyle='#1a0a08';x.fillRect(398,294,48,82);x.save();x.globalCompositeOperation='lighter';dab(x,422,376,70,[255,60,140],.45);x.fillStyle='rgba(255,120,190,.9)';x.fillRect(436,296,8,80);x.restore();
  for(let X=398;X<436;X+=9)wood(x,X,296,9,80,1);x.fillStyle='rgba(40,0,20,.35)';x.fillRect(398,296,38,80);x.fillStyle='#c8a040';x.beginPath();x.arc(430,338,2.5,0,7);x.fill();
  wood(x,388,376,68,6,0);
  // Leuchtschrift
  x.save();x.globalCompositeOperation='lighter';dab(x,420,236,110,[255,40,140],.4);x.restore();x.fillStyle='#ff4fb0';x.font='bold 34px Georgia';x.textAlign='center';x.shadowColor='#ff3090';x.shadowBlur=18;x.fillText('BANJA',420,248);x.shadowBlur=0;
  x.font='italic 11px Georgia';x.fillStyle='#ffd0e8';x.fillText('Dampf · Tanz · Wodka',420,264);
  // Laternen
  [[372,300],[470,300]].forEach(([X,Y])=>{x.strokeStyle='#1a1008';x.lineWidth=1.5;x.beginPath();x.moveTo(X,Y-14);x.lineTo(X,Y-4);x.stroke();x.save();x.globalCompositeOperation='lighter';dab(x,X,Y+6,40,[255,40,60],.55);x.restore();ell(x,X,Y+6,7,10,[220,30,40])});
  x.restore();
  // Waldrand vorne: dunkle Stämme und Tannen rahmen das Bild
  [[30,500,40],[120,470,26],[172,410,14],[668,410,14],[720,470,26],[790,500,40]].forEach(([X,b,w])=>trunk(x,X,b,w));
  [[-20,500,360,150],[90,440,300,120],[700,440,300,120],[830,500,360,150]].forEach(([X,b,h,w])=>fir(x,X,b,h,w,0));
  for(let i=0;i<6;i++){const X=R()<.5?40+R()*170:610+R()*170,Y=250+R()*120;dab(x,X-4,Y,2.6,[255,220,60],.9);dab(x,X+4,Y,2.6,[255,220,60],.9)}
  sign(x,120,488,1.5,[[-1,0,'Zur Mühle','hBM']]);put(x);
  x=lay();for(let i=0;i<30;i++)dab(x,R()*800,300+R()*200,40+R()*50,[150,140,170],.16);put(x,8,'screen',.5);
  grade(o)}
function paintBanja(){const o=S0;c.fillStyle='#120808';c.fillRect(0,0,W,H);
  let x=lay();logWall(x,0,800,-10,320);x.fillStyle='rgba(60,0,30,.45)';x.fillRect(0,0,800,320);
  x.fillStyle='#2a1410';x.fillRect(0,320,800,180);for(let i=-12;i<=12;i++){x.strokeStyle='rgba(0,0,0,.6)';x.beginPath();x.moveTo(400+i*18,320);x.lineTo(400+i*80,500);x.stroke()}
  x.save();x.globalCompositeOperation='lighter';dab(x,400,80,160,[255,40,140],.35);x.restore();x.fillStyle='#ff4fb0';x.font='bold 54px Georgia';x.textAlign='center';x.shadowColor='#ff3090';x.shadowBlur=20;x.fillText('BANJA',400,100);x.shadowBlur=0;x.font='italic 16px Georgia';x.fillStyle='#ffd0e8';x.fillText('Dampf · Tanz · Wodka',400,124);
  x.fillStyle='#5a0a14';x.fillRect(520,150,240,180);for(let X=520;X<760;X+=12){x.fillStyle=(X/12)%2?'rgba(0,0,0,.25)':'rgba(255,80,80,.12)';x.fillRect(X,150,12,180)}x.fillStyle='#d8b050';x.fillRect(514,142,252,10);wood(x,510,330,260,14,0);
  if(FL.rekrut){x.fillStyle='#14060a';x.fillRect(560,152,160,178);x.save();x.globalCompositeOperation='lighter';x.fillStyle='rgba(255,220,240,.18)';x.beginPath();x.moveTo(630,0);x.lineTo(660,0);x.lineTo(720,330);x.lineTo(570,330);x.fill();dab(x,640,320,90,[255,120,200],.35);x.restore();for(let X=520;X<560;X+=10){x.fillStyle='#7a1020';x.fillRect(X,150,10,180)}for(let X=720;X<760;X+=10){x.fillStyle='#7a1020';x.fillRect(X,150,10,180)}x.strokeStyle='#c8c8d0';x.lineWidth=3;x.beginPath();x.moveTo(690,150);x.lineTo(690,330);x.stroke()}else{x.fillStyle='#e8d8b0';x.fillRect(612,250,60,24);x.fillStyle='#5a0a14';x.font='bold 10px Georgia';x.fillText('HEUTE KEINE SHOW',642,266)}
  wood(x,40,180,250,8,0);wood(x,40,240,250,8,0);for(let i=0;i<16;i++){const X=52+i*15,Y=i<8?180:240;bottle(x,X,Y,22+R()*10,P2([[60,120,60],[200,200,210],[160,60,40],[200,170,60]]))}
  wood(x,30,330,290,18,0);x.fillStyle='#3a1a10';x.fillRect(30,348,290,80);x.fillStyle='rgba(255,60,150,.2)';x.fillRect(30,348,290,6);
  [[120,322],[200,320],[260,324]].forEach(([X,Y])=>{x.fillStyle='rgba(220,240,255,.7)';x.fillRect(X,Y-12,7,12)});
  [[420,440],[620,450]].forEach(([X,Y])=>{shadowAt(x,X,Y+4,40,.5);ell(x,X,Y-30,36,10,[60,20,16]);wood(x,X-3,Y-30,6,30,1);ell(x,X,Y-32,30,7,[90,40,30]);bottle(x,X-6,Y-34,16,[200,200,210]);ell(x,X+10,Y-34,4,2,[240,200,80])});
  x.fillStyle='#6a1020';x.beginPath();x.moveTo(680,500);x.lineTo(700,410);x.lineTo(800,400);x.lineTo(800,500);x.fill();
  [[80,40],[300,40],[500,40],[720,40]].forEach(([X,Y])=>{x.strokeStyle='#2a1a10';x.beginPath();x.moveTo(X,0);x.lineTo(X,Y);x.stroke();x.save();x.globalCompositeOperation='lighter';dab(x,X,Y+10,50,[255,30,60],.5);x.restore();ell(x,X,Y+10,10,13,[220,30,40])});
  put(x);x=lay();for(let i=0;i<40;i++)dab(x,R()*800,200+R()*300,40+R()*60,[255,200,220],.12);put(x,10,'screen',.6);
  x=lay();sign(x,700,486,1.4,[[1,0,'Nach draußen','hBR']]);put(x);
  const vg=c.createRadialGradient(400,300,120,400,300,540);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.55)');c.fillStyle=vg;c.fillRect(0,0,W,H)}
const ZINA=`<g stroke="#1a0a0a" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round">
<path d="M-14,0L-12,-10L-4,-10L-4,0ZM4,0L4,-10L12,-10L14,0Z" fill="#111"/>
<path d="M-28,-8L-30,-60C-34,-110 -32,-150 -24,-178L24,-178C32,-150 34,-110 30,-60L28,-8Z" fill="#b01830"/><path d="M-2,-120C6,-90 10,-50 16,-10" fill="none" stroke="#7a0a1a"/>
<circle cx="-14" cy="-140" r="1.6" fill="#ffd0d0" stroke="none"/><circle cx="10" cy="-110" r="1.6" fill="#ffd0d0" stroke="none"/><circle cx="-6" cy="-70" r="1.6" fill="#ffd0d0" stroke="none"/><circle cx="18" cy="-40" r="1.6" fill="#ffd0d0" stroke="none"/>
<path d="M-24,-176C-36,-160 -40,-130 -30,-112L-22,-114C-28,-130 -26,-150 -18,-164Z" fill="#e8b494"/><ellipse cx="-26" cy="-110" rx="6" ry="5" fill="#e8b494"/>
<path d="M24,-176C38,-166 42,-150 36,-136L28,-140C32,-150 28,-160 20,-166Z" fill="#e8b494"/><ellipse cx="34" cy="-136" rx="5.5" ry="5" fill="#e8b494"/><path d="M36,-138L58,-168" stroke="#111" stroke-width="2"/><circle cx="58" cy="-168" r="2" fill="#ff7030" stroke="none"/>
<path d="M-30,-176C-20,-168 -10,-184 0,-174C10,-184 20,-168 30,-176C34,-168 28,-160 20,-164C10,-156 -10,-156 -20,-164C-28,-160 -34,-168 -30,-176Z" fill="#f4c8e0"/>
<path d="M-6,-182L-6,-190L6,-190L6,-182Z" fill="#e8b494"/>
<path d="M-24,-200C-34,-250 34,-250 24,-200C20,-224 -20,-224 -24,-200Z" fill="#f0d070"/><path d="M-12,-238C-6,-230 6,-230 12,-238M-18,-226C-8,-218 8,-218 18,-226" fill="none" stroke="#c8a040" stroke-width="1"/>
<ellipse cx="0" cy="-204" rx="15" ry="18" fill="#f0c0a0"/><path d="M-15,-214C-14,-224 14,-224 15,-214C10,-218 -10,-218 -15,-214Z" fill="#f0d070"/>
<path d="M-10,-208C-8,-211 -4,-211 -2,-208M2,-208C4,-211 8,-211 10,-208" fill="#5a90d0" stroke-width=".8"/><path d="M-11,-207l-2,-2M-8,-209l-1,-2M11,-207l2,-2M8,-209l1,-2" stroke-width=".8"/>
<circle cx="-6" cy="-206" r="1.3" fill="#2a1a10" stroke="none"/><circle cx="6" cy="-206" r="1.3" fill="#2a1a10" stroke="none"/><path d="M0,-204L-1,-198L1,-198" fill="none" stroke-width=".7"/>
<path d="M-6,-192C-3,-195 3,-195 6,-192C3,-189 -3,-189 -6,-192Z" fill="#d01030"/><circle cx="8" cy="-196" r=".9" fill="#2a1a10" stroke="none"/><ellipse cx="-9" cy="-198" rx="3" ry="2" fill="#f08080" stroke="none" opacity=".5"/><ellipse cx="9" cy="-198" rx="3" ry="2" fill="#f08080" stroke="none" opacity=".5"/>
<circle cx="-15" cy="-198" r="2.4" fill="#e8c040"/><circle cx="15" cy="-198" r="2.4" fill="#e8c040"/></g>`;
// ================= Nymphen-Bewerbungsgespräch =================
const NT={nastja:{s:1,t:1,v:1,r:1,a:['Tanzen? Süßer, ich hab den ganzen Sumpf um den Finger gewickelt. Mit den Hüften. Die Frösche quaken seitdem anders.','Raus? JA! Hier unten fasst einen nur Schilf an. Und das ist nicht zärtlich.','Du? Riechst nach Rauch und Panik. Aber du guckst mich an wie ein Kater die Sahne. Gefällt mir.']},
  marfa:{s:1,t:1,v:1,r:0,a:['Tanzen? Ich hab auf Kaufmannshochzeiten getanzt, bis die Tische gebrochen sind. Und die Ehen.','Raus? Pff. Hier bin ich die Königin. Draußen bin ich nur eine nasse Frau mit Vergangenheit.','Hübscher Pudel. Komm näher, ich beiß nur, wenn du drum bittest.']},
  ustinja:{s:0,t:1,v:1,r:1,a:['Primaballerina, 1903! ...Gut, die Knie sind jetzt aus Schlamm.','Oh ja! Ich will wieder Publikum! Applaus! Blumen!','Junger Mann, Sie riechen wie der Bodensatz einer Wodkaflasche. Charmant.']},
  fekla:{s:0,t:0,v:1,r:0,a:['Tanzen? Ich kann mich kaum umdrehen. *blubb*','Raus? Ich bin hier eingeweicht. Mich kriegt keiner mehr raus.','Du stinkst. Und ich bin eine Wasserleiche. Also: Respekt.']},
  glafira:{s:0,t:0,v:1,r:1,a:['Nein. Ich schlag eher, als dass ich tanze.','Raus! Und dann such ich den, der mich ersäuft hat.','Halt die Klappe, Grünschnabel, oder ich zieh dich runter.']},
  alte:{s:0,t:1,v:0,r:0,a:['*klapper* Ich tanze den Knochentanz. Jede Nacht. Alleine.','Raus? Wohin denn? Ich war schon überall. Tot.','*klapper* ...Hübscher Junge. Hübsch fleischig.']}};
function interview(nd){const idx=NYMPHS.indexOf(nd),tr=NT[nd.id];const qs=['Kannst du tanzen?','Willst du aus dem Sumpf raus?','Wie findest du mich?'];
  const o=openO(`<div class="pan iv"><img src="${NIMG[idx]}" class="por"><h3>${nd.n}</h3></div><div class="pan ivq"><h3>Gespräch</h3>${qs.map((q,i)=>`<button class="qb" data-q="${i}">${q}</button>`).join('')}<p class="ans em">Frag sie was.</p>
  <h3>Eigenschaftskarte</h3><label><input type="checkbox" data-k="s"> Schön</label><label><input type="checkbox" data-k="t"> Tanzt gern</label><label><input type="checkbox" data-k="v"> Frech / vulgär</label><label><input type="checkbox" data-k="r"> Will raus</label>
  <div class="row"><button class="go">Anwerben</button><button class="bk">Zurück</button></div><p class="res"></p></div><div class="hint">[ESC] schließen</div>`,'two menu2');
  o.querySelectorAll('.qb').forEach(b=>b.onclick=()=>{o.querySelector('.ans').textContent='„'+tr.a[+b.dataset.q]+'“'});o.querySelector('.bk').onclick=closeO;
  o.querySelector('.go').onclick=()=>{const ck={};o.querySelectorAll('input').forEach(i=>ck[i.dataset.k]=i.checked?1:0);const r=o.querySelector('.res');
    if(['s','t','v','r'].some(k=>ck[k]!=tr[k])){r.textContent='Hm. Ich glaube, ich hab sie falsch eingeschätzt. Die Karte stimmt nicht.';return}
    if(!(tr.s&&tr.t&&tr.v&&tr.r)){r.textContent='Die Karte stimmt. Aber auf Madames Liste passt sie nicht.';return}
    closeO();FL.rekrut=1;delete cache.banja;say([['P','Nastja... hättest du Lust auf einen Job? Tanzen. Musik. Wodka. Ein Ort ohne Frösche.'],['NA','Ein Job? Mit Bühne und Publikum? Süßer, ich bin schon unterwegs. Ich wring nur noch die Haare aus.'],['P','Das Banja ist hinterm Irrwald. Sag, Petja schickt dich.'],['P','...Das wird Madame freuen. Und mich hoffentlich auch.']])}}
// ================= Banja-Show & Lounge =================
const DANCER = `<g stroke="#1a0a10" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round">


<!-- Kompletter Körper: Breiterer Oberkörper, breitere untere Rippen, schmale Taille, breite Hüften & getrennte Beine -->
<path d="M-12,-10
         C-15,-30 -21,-50 -18,-70
         C-16,-85 -13,-105 -11,-120
         C-10,-132 -18,-148 -17,-158
         C-16,-165 -5,-167 -5,-172
         L5,-172
         C5,-167 16,-165 17,-158
         C18,-148 10,-132 11,-120
         C13,-105 16,-85 18,-70
         C21,-50 15,-30 12,-10
         L4,-10
         C3,-30 5,-50 3,-68
         C2,-72 -2,-72 -3,-68
         C-5,-50 -3,-30 -4,-10
         Z" fill="#f4dccb"/>

<!-- Bauch & Nabel -->
<circle cx="0" cy="-110" r="1" fill="#c89880" stroke="none"/>
<path d="M-3,-112C-1,-110 1,-110 3,-112" fill="none" stroke="#d8a890" stroke-width="0.7"/>

<!-- BLATT ALS INTIMBEDECKUNG -->
<g fill="#2d8a3d" stroke="#1a4d22" stroke-width="0.9">
  <path d="M0,-83C-6,-50 -9,-63 0,-53C9,-63 6,-76 0,-83Z"/>
  <path d="M0,-80L0,-57" stroke="#1a4d22" stroke-width="0.6" fill="none"/>
</g>

<!-- Brüste (an den breiteren Brustkorb angepasst) -->
<circle cx="-7.5" cy="-143" r="8.5" fill="#eed0bb" stroke="#a06850" stroke-width="1.1"/>
<circle cx="7.5" cy="-143" r="8.5" fill="#eed0bb" stroke="#a06850" stroke-width="1.1"/>
<!-- Schatten unter der Brust -->
<path d="M-13,-134C-10,-131 -5,-131 -2,-134" fill="none" stroke="#d09880" stroke-width="0.8"/>
<path d="M2,-134C5,-131 10,-131 13,-134" fill="none" stroke="#d09880" stroke-width="0.8"/>

<!-- Arme in Pose -->
<path d="M-17,-158C-22,-164 -24,-168 -22,-172L-14,-170Z" fill="#f4dccb"/>
<path d="M17,-158C22,-164 24,-168 22,-172L14,-170Z" fill="#f4dccb"/>
<path d="M-22,-170C-32,-158 -34,-138 -26,-118L-19,-120C-24,-138 -22,-154 -16,-164Z" fill="#f4dccb"/>
<path d="M22,-170C32,-180 36,-198 32,-212L26,-210C28,-198 24,-184 16,-174Z" fill="#f4dccb"/>

<!-- Federspreizer in der Hand -->
<g fill="#fff0f8" stroke="#c8a0b8" stroke-width=".8">
  <ellipse cx="26" cy="-236" rx="7" ry="20" transform="rotate(-30 26 -236)"/>
  <ellipse cx="36" cy="-238" rx="7" ry="21"/>
  <ellipse cx="46" cy="-234" rx="7" ry="20" transform="rotate(30 46 -234)"/>
</g>
<path d="M14,-206C20,-220 24,-224 26,-228" stroke="#fff0f8" stroke-width="3"/>

<!-- HAARSTRÄHNEN (Nahtlos am Kopf angebunden & über den Brüsten) -->
<g fill="#c4ac7c">
  <path d="M-12,-208C-17,-183 -13,-158 -8,-143C-4,-143 -6,-173 -10,-208Z"/>
  <path d="M12,-208C17,-183 13,-158 8,-143C4,-143 6,-173 10,-208Z"/>
  <path d="M-18,-184C-22,-168 -20,-148 -16,-133C-14,-148 -14,-168 -16,-178Z" fill="#b49c6c"/>
  <path d="M18,-184C22,-168 20,-148 16,-133C14,-148 14,-168 16,-178Z" fill="#b49c6c"/>
</g>

<!-- Kopf -->
<ellipse cx="0" cy="-192" rx="13" ry="16" fill="#f4dccb"/>

<!-- Blonde Hauptfrisur & Stirnband -->
<path d="M-15,-194C-18,-210 -6,-214 0,-214C8,-214 18,-210 15,-194C12,-204 6,-208 0,-206C-6,-208 -12,-204 -15,-194Z" fill="#c4ac7c"/>
<path d="M-14,-204C-8,-208 8,-208 14,-204" fill="none" stroke="#2e5090" stroke-width="2"/>

<!-- Gesichtszüge -->
<path d="M-8,-194C-6,-196 -3,-196 -2,-194M2,-194C3,-196 6,-196 8,-194" fill="none"/>
<circle cx="-5" cy="-192.5" r="1.2" fill="#3a6a9a" stroke="none"/>
<circle cx="5" cy="-192.5" r="1.2" fill="#3a6a9a" stroke="none"/>
<path d="M0,-190L-1,-185L1,-185" fill="none" stroke-width=".7"/>
<path d="M-4,-181C-2,-183 2,-183 4,-181C2,-179 -2,-179 -4,-181Z" fill="#c8204a" stroke-width=".7"/>
<ellipse cx="-8" cy="-186" rx="2.6" ry="1.6" fill="#f0a0a0" stroke="none" opacity=".5"/>
<ellipse cx="8" cy="-186" rx="2.6" ry="1.6" fill="#f0a0a0" stroke="none" opacity=".5"/>
</g>`;
function paintLounge(){c.fillStyle='#1a0408';c.fillRect(0,0,W,H);let x=lay();
  for(let X=0;X<800;X+=20){const g=x.createLinearGradient(X,0,X+20,0);g.addColorStop(0,'#3a0610');g.addColorStop(.5,'#6a1020');g.addColorStop(1,'#3a0610');x.fillStyle=g;x.fillRect(X,0,20,330)}
  x.fillStyle='#2a0a10';x.fillRect(0,330,800,170);for(let i=0;i<400;i++)ell(x,R()*800,330+R()*170,2+R()*6,1,[60,10,20],.4);
  x.fillStyle='#d8b050';x.fillRect(0,320,800,8);x.save();x.translate(400,170);x.strokeStyle='#d8b050';x.lineWidth=6;x.beginPath();x.ellipse(0,0,70,90,0,0,7);x.stroke();const mg=x.createLinearGradient(-60,-80,60,80);mg.addColorStop(0,'#5a3a50');mg.addColorStop(1,'#1a0a14');x.fillStyle=mg;x.beginPath();x.ellipse(0,0,64,84,0,0,7);x.fill();x.restore();
  x.fillStyle='#8a0a20';x.beginPath();x.moveTo(180,440);x.quadraticCurveTo(180,330,400,330);x.quadraticCurveTo(620,330,620,440);x.lineTo(600,460);x.lineTo(200,460);x.fill();x.fillStyle='#a8102a';x.beginPath();x.ellipse(400,430,210,34,0,0,7);x.fill();
  for(let i=0;i<9;i++){x.fillStyle='rgba(0,0,0,.25)';x.beginPath();x.arc(230+i*42,370,6,0,7);x.fill()}
  [[120,420],[680,420],[90,300],[710,300]].forEach(([X,Y])=>{x.fillStyle='#e8dcb0';x.fillRect(X-4,Y-24,8,24);x.save();x.globalCompositeOperation='lighter';dab(x,X,Y-30,60,[255,160,80],.4);dab(x,X,Y-28,6,[255,240,180],.9);x.restore()});
  put(x);x=lay();for(let i=0;i<20;i++)dab(x,R()*800,R()*400,40+R()*60,[255,120,160],.1);put(x,10,'screen',.6);
  x=lay();sign(x,700,486,1.4,[[1,0,'Zurück in den Club','hLB']]);put(x);
  const vg=c.createRadialGradient(400,330,100,400,300,520);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.6)');c.fillStyle=vg;c.fillRect(0,0,W,H)}
function animG(g,a,b,ms){return new Promise(r=>{const t0=performance.now();(function k(){const p=Math.min(1,(performance.now()-t0)/ms),e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2,x=a[0]+(b[0]-a[0])*e,y=a[1]+(b[1]-a[1])*e,s=a[2]+(b[2]-a[2])*e;g.setAttribute('transform',`translate(${x},${y}) scale(${s})`);p<1?requestAnimationFrame(k):r()})()})}
async function privatTanz(){const g=$('#dancerG');changing=true;g.querySelector('.dance').classList.remove('dance');
  await animG(g,[640,330,.62],[560,440,.9],1400);walkTo(470,470);await animG(g,[560,440,.9],[760,452,.95],1600);g.style.display='none';
  changing=false;enter('lounge',[260,480]);setTimeout(()=>{$('#loungeG').style.display='';say([['NA','Willkommen in der Lounge, Süßer. Setz dich. Hände bleiben auf dem Sofa. Hausregel.'],['P','Ich... äh... ja. Sofa. Hände. Klar.'],['NA','Und jetzt... Musik!']],async()=>{
    fade.style.opacity=1;await new Promise(r=>setTimeout(r,900));say([['P','*Drei Minuten später*'],['P','...'],['P','Ich glaube, ich brauche einen Wodka. Oder zwei. Oder eine kalte Dusche im Sumpf.'],['NA','Komm wieder, Petja. Aber bring Trinkgeld mit.']],()=>{FL.lounge=1;$('#loungeG').style.display='none';enter('banja',[300,480])})})},700)}
// ================= Bühnenrand & Privattanz (First Person) =================
const DANCERIMG=new Image();
function paintBuehne(){c.fillStyle='#0e0408';c.fillRect(0,0,W,H);let x=lay();
  x.fillStyle='#14060a';x.fillRect(0,0,800,380);for(let X=0;X<170;X+=14){x.fillStyle=(X/14)%2?'#6a0c1c':'#8a1426';x.fillRect(X,0,14,380)}for(let X=630;X<800;X+=14){x.fillStyle=(X/14)%2?'#6a0c1c':'#8a1426';x.fillRect(X,0,14,380)}
  x.fillStyle='#d8b050';x.fillRect(0,0,800,14);
  x.save();x.globalCompositeOperation='lighter';x.fillStyle='rgba(255,220,240,.16)';x.beginPath();x.moveTo(370,0);x.lineTo(430,0);x.lineTo(560,380);x.lineTo(240,380);x.fill();dab(x,400,360,200,[255,90,180],.35);dab(x,180,120,90,[120,80,255],.25);dab(x,620,120,90,[255,60,120],.25);x.restore();
  const g=x.createLinearGradient(0,330,0,400);g.addColorStop(0,'#3a1a10');g.addColorStop(1,'#1a0a06');x.fillStyle=g;x.fillRect(0,330,800,70);for(let X=0;X<800;X+=60){x.fillStyle='rgba(0,0,0,.4)';x.fillRect(X,330,2,70)}
  x.fillStyle='#d8b050';x.fillRect(0,394,800,10);for(let X=20;X<800;X+=40){x.save();x.globalCompositeOperation='lighter';dab(x,X,399,10,[255,240,180],.8);x.restore()}
  const pg=x.createLinearGradient(394,0,406,0);pg.addColorStop(0,'#6a6a72');pg.addColorStop(.5,'#f0f0f8');pg.addColorStop(1,'#5a5a62');x.fillStyle=pg;x.fillRect(395,14,10,346);ell(x,400,360,22,6,[120,120,128]);
  [[300,388,-.2],[470,384,.3],[540,390,-.1]].forEach(([X,Y,a])=>{x.save();x.translate(X,Y);x.rotate(a);x.fillStyle='#6a8a5a';x.fillRect(-12,-5,24,10);x.fillStyle='rgba(0,0,0,.3)';x.fillRect(-6,-3,12,6);x.restore()});
  x.fillStyle='#1a0c10';x.fillRect(0,404,800,96);for(let i=0;i<20;i++)dab(x,R()*800,420+R()*80,30+R()*40,[60,10,30],.4);
  [[90,470],[710,470]].forEach(([X,Y])=>{ell(x,X,Y,36,9,[60,20,16]);wood(x,X-3,Y,6,30,1);bottle(x,X-8,Y-2,16,[200,200,210]);ell(x,X+12,Y-3,5,2,[240,200,80])});put(x);
  x=lay();sign(x,110,486,1.4,[[-1,0,'Zurück an die Bar','hBZ']]);put(x)}
async function lapDance(){changing=true;fade.style.opacity=1;await new Promise(r=>setTimeout(r,450));S0=SCN.lounge;s=S0.seed;if(!cache.lounge){S0.paint();const k=document.createElement('canvas');k.width=W;k.height=H;k.getContext('2d').drawImage(cv,0,0);cache.lounge=k}
  const cv3=document.createElement('canvas');cv3.id='cut';cv3.width=W;cv3.height=H;cv3.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:15';$('#game').appendChild(cv3);fade.style.opacity=0;
  const x=cv3.getContext('2d'),T0=performance.now(),D=16;let fin=false;
  const ease=(a,b,p)=>a+(b-a)*(p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2),seg=(t,a,b)=>Math.max(0,Math.min(1,(t-a)/(b-a)));
  function frame(){if(fin)return;const t=(performance.now()-T0)/1000;x.setTransform(1,0,0,1,0,0);x.filter='blur('+(1.5*SC)+'px)';
    x.save();x.translate(W/2,H/2);x.scale(1.5,1.5);x.translate(-W/2,-H*.45);x.drawImage(cache.lounge,0,0);x.restore();x.filter='none';
    let px=ease(-60,400,seg(t,0,2.5)),py=520,sc=1.5,rot=0,flip=1;
    if(t>2.5&&t<6){const u=t-2.5;rot=Math.sin(u*4.2)*.1;py=520-Math.abs(Math.sin(u*4.2))*14;px=400+Math.sin(u*2.1)*40}
    if(t>=6&&t<8){const p=seg(t,6,8),a=p*Math.PI*4;flip=Math.cos(a);px=400}
    if(t>=8&&t<11){const p=seg(t,8,11);sc=ease(1.5,2.3,Math.min(1,p*2));py=520+ease(0,90,Math.min(1,p*2));rot=Math.sin(p*12)*.06;px=400+Math.sin(p*8)*20}
    if(t>=11&&t<13.5){const p=seg(t,11,13.5);sc=ease(2.3,1.6,p);py=ease(610,520,p);rot=-.25*Math.sin(p*Math.PI);px=400}
    if(t>=13.5){const u=t-13.5;rot=Math.sin(u*5)*.08;py=520-Math.abs(Math.sin(u*5))*10;px=400}
    x.setTransform(SC,0,0,SC,0,0);x.save();x.translate(px,py);x.rotate(rot);x.scale(sc*flip,sc);if(DANCERIMG.complete&&DANCERIMG.naturalWidth)x.drawImage(DANCERIMG,-50,-262,104,266);x.restore();
    x.fillStyle='#b8bccc';x.beginPath();x.ellipse(250,520,150,60,.25,0,7);x.fill();x.beginPath();x.ellipse(550,520,150,60,-.25,0,7);x.fill();x.strokeStyle='rgba(60,60,80,.6)';x.lineWidth=2;x.beginPath();x.ellipse(250,520,150,60,.25,0,7);x.stroke();x.beginPath();x.ellipse(550,520,150,60,-.25,0,7);x.stroke();
    x.save();x.globalCompositeOperation='lighter';for(let i=0;i<4;i++){const p=(t*.25+i/4)%1;x.fillStyle=`rgba(255,180,220,${.6*(1-p)})`;x.font='22px Georgia';x.fillText('♪',120+i*170+Math.sin(t+i)*20,420-p*300)}x.restore();
    const v=x.createRadialGradient(400,250,150,400,250,520);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(20,0,10,.7)');x.fillStyle=v;x.fillRect(0,0,800,500);
    if(t>D){fin=true;return end()}requestAnimationFrame(frame)}
  requestAnimationFrame(frame);
  setTimeout(()=>say([['NA','Hände aufs Sofa, Süßer. Hausregel.']]),2600);setTimeout(()=>{if(busy)advance();say([['P','*schluck*']])},9000);
  async function end(){if(busy)advance();fade.style.opacity=1;await new Promise(r=>setTimeout(r,500));cv3.remove();changing=false;
    say([['P','*Drei Minuten später*'],['P','...Ich glaube, ich brauche einen Wodka. Oder zwei. Oder eine kalte Dusche im Sumpf.'],['NA','Komm wieder, Petja. Aber nächstes Mal mit Trinkgeld.']],()=>{FL.lounge=1;enter('buehne',[260,486])});fade.style.opacity=0}}