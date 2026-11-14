// ================= Ich-Perspektive im Stil des Spiels =================
// Die Szenen aus Petjas Augen (Intro bei Wowa, Baba Jaga ganz nah, Privattanz) nutzen jetzt dieselben Mittel wie der Rest:
// - Hände und Knie sind SVG-Figuren und laufen durch die Pixel-Pipeline der Figuren (sprite → pixSprite): Federkontur, Airbrush-Licht,
//   gedämpfte Farben. Die Pixeldichte passt jeweils zur Figur, die in der Szene daneben steht (Wowa, Baba Jaga, Nastja).
// - Wowas Wohnung ist gemalt wie die anderen Innenräume (Licht der Stehlampe, Tapete, Teppich, Stoffsofa, Röhrenfernseher, Parkett).

// ---------- Figuren-Teile (Koordinaten wie die alten Canvas-Zeichnungen) ----------
const FP_INK='#2a1a0e',FP_SKIN='#e6b48c',FP_SKIN2='#c98e66';
// Petjas rechte Hand von hinten (Ursprung = Griffpunkt des Joints), Ärmel vom türkisen Hemd mit hochgekrempeltem Bündchen
const finger=(d,w,col)=>`<path d="${d}" fill="none" stroke="${FP_INK}" stroke-width="${w+3}"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}"/>`;
const FPH_BACK=`<g stroke="${FP_INK}" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round">
<path d="M118,58C150,50 200,60 260,90L260,250L110,250C100,180 104,110 118,58Z" fill="#30b4ab"/>
<path d="M150,90Q164,120 140,150M190,90Q204,130 180,170M225,110Q238,150 215,190" fill="none" stroke="#147470" stroke-width="1.2"/>
<path d="M112,62C124,54 140,54 150,60L138,130C124,128 110,124 100,118Z" fill="#2aa198"/>
<path d="M118,62L108,120M126,58L116,124M134,57L124,127M142,58L132,129" fill="none" stroke="#147470" stroke-width=".9"/>
<path d="M44,2C62,-6 84,0 100,14C112,26 120,44 118,66C116,86 108,108 96,116C84,112 70,100 60,86C48,66 38,34 44,2Z" fill="${FP_SKIN}"/>
<path d="M60,6Q85,17 98,40M62,20Q85,33 96,58M64,34Q85,48 94,74" fill="none" stroke="${FP_SKIN2}" stroke-width="1.2"/>
${finger('M62,16C38,12 28,24 36,34',17,FP_SKIN)}<path d="M40,10Q36,18 40,24" fill="none" stroke="${FP_SKIN2}" stroke-width="1.1"/>
${finger('M64,34C42,30 34,42 42,50',16,FP_SKIN)}<path d="M44,28Q40,36 44,42" fill="none" stroke="${FP_SKIN2}" stroke-width="1.1"/>
${finger('M66,52C50,48 44,58 50,64',13,FP_SKIN2)}
${finger('M80,82C54,64 30,38 6,10',17,FP_SKIN)}<path d="M44,52Q40,46 36,44" fill="none" stroke="${FP_SKIN2}" stroke-width="1.1"/>
<ellipse cx="10" cy="12" rx="5" ry="3.5" transform="rotate(-52 10 12)" fill="#f2d4c0" stroke="#a87058" stroke-width=".9"/></g>`;
const FPH_FRONT=`<g stroke="${FP_INK}" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round">
${finger('M68,10C48,-12 22,-16 3,-5',16,FP_SKIN)}<path d="M44,-6Q38,-12 32,-13M20,-14Q16,-10 14,-6" fill="none" stroke="${FP_SKIN2}" stroke-width="1.1"/>
<ellipse cx="5" cy="-10" rx="5.5" ry="4" transform="rotate(29 5 -10)" fill="#f2d4c0" stroke="#a87058" stroke-width=".9"/></g>`;
// Baba Jagas Hand (grün, knochig, Krallen) mit zerfranstem rotem Ärmel – lokal wie früher: Finger nach oben, Ärmel unten
const BJH=(()=>{let f='';const SK='#a9b866',INK='#1e1a10';
  // Finger aus drei Gliedern, jedes etwas dünner und leicht nach innen gekrümmt; Knöchel als Verdickung, Kralle an der Spitze
  [[-26,-16,-.38,56],[-9,-22,-.12,64],[9,-22,.1,62],[25,-16,.36,52]].forEach(([X,Y,a,L],n)=>{let px=X,py=Y,ang=a;const seg=[.44,.33,.23],w=[13,11,9],pts=[[px,py]];
    seg.forEach((k,i)=>{ang+=(n<2?.1:-.1)*(i?1:0);px+=Math.sin(ang)*L*k;py-=Math.cos(ang)*L*k;pts.push([px,py])});
    for(let i=0;i<3;i++){const[a1,b1]=pts[i],[a2,b2]=pts[i+1];f+=`<path d="M${a1.toFixed(1)},${b1.toFixed(1)}L${a2.toFixed(1)},${b2.toFixed(1)}" stroke="${INK}" stroke-width="${w[i]+3}"/><path d="M${a1.toFixed(1)},${b1.toFixed(1)}L${a2.toFixed(1)},${b2.toFixed(1)}" stroke="${SK}" stroke-width="${w[i]}"/>`}
    for(let i=1;i<3;i++){const[a1,b1]=pts[i];f+=`<ellipse cx="${a1.toFixed(1)}" cy="${b1.toFixed(1)}" rx="${(w[i-1]/2+.6).toFixed(1)}" ry="${(w[i-1]/2-.4).toFixed(1)}" fill="${SK}"/><path d="M${(a1-3).toFixed(1)},${(b1+1).toFixed(1)}q3,2 6,0" fill="none" stroke="#5c6a30" stroke-width="1.8"/>`}
    const[tx,ty]=pts[3],dx=Math.sin(ang),dy=-Math.cos(ang);f+=`<path d="M${(tx-4*dy*-1-3).toFixed(1)},${ty.toFixed(1)}Q${(tx+dx*10).toFixed(1)},${(ty+dy*10).toFixed(1)} ${(tx+dx*18+3).toFixed(1)},${(ty+dy*18-2).toFixed(1)}Q${(tx+dx*6+2).toFixed(1)},${(ty+dy*6).toFixed(1)} ${(tx+3.5).toFixed(1)},${(ty+1).toFixed(1)}Z" fill="#2a2418"/>`});
  return `<g stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round" fill="none">
<path d="M-44,40L-40,96L-20,88L0,100L20,88L44,98L46,40Z" fill="#7c2c2a"/><path d="M-30,46L-28,90M-8,46L-6,92M14,46L16,90M34,46L34,92" stroke="#5c1e1e" stroke-width="2"/>
<path d="M-22,44C-32,28 -38,6 -34,-14Q0,-28 34,-16C38,6 32,28 22,44Z" fill="${SK}"/>
${f}<path d="M-30,10L-50,-6L-62,-26" stroke="${INK}" stroke-width="15"/><path d="M-30,10L-50,-6L-62,-26" stroke="${SK}" stroke-width="12"/><ellipse cx="-50" cy="-6" rx="7" ry="6" fill="${SK}"/>
<path d="M-62,-26Q-70,-38 -66,-48Q-64,-38 -57,-30Z" fill="#2a2418"/>
<path d="M-16,-8Q-6,8 -12,34M6,-14Q2,0 10,8" stroke="#5c6a30" stroke-width="1.8"/><circle cx="18" cy="22" r="2.4" fill="#7a8a40"/></g>`})();
// Petjas Knie in Jeans (Blick nach unten aufs Sofa), linke und rechte Seite
const KNEES=`<g stroke="${FP_INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
<path d="M70,512C96,470 196,448 290,446C338,444 360,462 356,484C352,502 332,512 318,512Z" fill="#7f98c8"/>
<path d="M730,512C704,470 604,448 510,446C462,444 440,462 444,484C448,502 468,512 482,512Z" fill="#7f98c8"/>
<path d="M300,452C328,456 344,470 340,490C330,474 316,462 300,452ZM500,452C472,456 456,470 460,490C470,474 484,462 500,452Z" fill="#a8bce0" stroke="none"/>
<path d="M110,500C186,470 262,462 334,468M690,500C614,470 538,462 466,468" fill="none" stroke="#4a5e8e" stroke-width="2.2"/>
<path d="M210,470Q236,486 228,506M590,470Q564,486 572,506M270,458Q290,470 284,492M530,458Q510,470 516,492" fill="none" stroke="#5a6e9e" stroke-width="2"/></g>`;
// Pixeldichte wie die Nachbarfigur: Einheiten pro Pixel der Figur × deren Skalierung ÷ eigene Skalierung
const fpRows=(boxH,ownScale,figH,figScale)=>Math.round(boxH*ownScale/(figH/PIX_ROWS*figScale));
const FPIMG={};
const FPDEF={hb:[FPH_BACK,[-14,-24,280,280],fpRows(280,1.4,280,2.3)],hf:[FPH_FRONT,[-8,-30,82,46],fpRows(46,1.4,280,2.3)],
  bj:[BJH,[-78,-104,130,208],fpRows(208,1.3,256,3.6)],knees:[KNEES,[60,436,680,80],fpRows(80,1,266,1.5)]};
function fpLoad(){Object.entries(FPDEF).forEach(([k,[svg,box,rows]])=>{if(FPIMG[k])return;Promise.resolve(PIXELSTYLE?pixSprite(svg,box,rows):sprite(svg,box,2)).then(u=>{const im=new Image();im.onload=()=>FPIMG[k]={im,box};im.src=u}).catch(e=>console.error('Ego-Sicht',k,e))})}
setTimeout(fpLoad,1500);   // nach dem Laden der Figuren, damit der Start nicht ruckelt
const fpDraw=(x,k)=>{const f=FPIMG[k];if(!f)return false;const[bx,by,bw,bh]=f.box;x.save();x.imageSmoothingEnabled=false;x.drawImage(f.im,bx,by,bw,bh);x.restore();return true};

// ---------- Einhängen ----------
const _fpHandOld=fpHand;fpHand=function(x,part){if(!fpDraw(x,part=='back'?'hb':'hf'))_fpHandOld(x,part)};
function bjHand(x,X,Y,s,a,flip){x.save();x.translate(X,Y);x.rotate(a);x.scale(flip?-s:s,s);fpDraw(x,'bj');x.restore()}
function fpKnees(x){if(fpDraw(x,'knees'))return;x.fillStyle='#a2b4d8';x.beginPath();x.ellipse(250,520,150,60,.25,0,7);x.fill();x.beginPath();x.ellipse(550,520,150,60,-.25,0,7);x.fill()}

// ---------- Tür im Intro: gemalte Holztür mit Füllungen, Klinke und Spion; dahinter der Hausflur ----------
let FPDOOR=null;function fpDoorPaint(){const K=3,o=document.createElement('canvas');o.width=100*K;o.height=280*K;const x=o.getContext('2d');x.scale(K,K);
  wood(x,0,0,100,280,1);x.fillStyle='rgba(60,30,10,.35)';x.fillRect(0,0,100,280);
  [[12,14,76,110],[12,138,76,128]].forEach(([X,Y,w,h])=>{x.fillStyle='rgba(0,0,0,.35)';x.fillRect(X,Y,w,h);wood(x,X+4,Y+4,w-8,h-8,1);x.fillStyle='rgba(255,220,170,.18)';x.fillRect(X,Y,w,2);x.fillRect(X,Y,2,h);x.fillStyle='rgba(0,0,0,.35)';x.fillRect(X+w-2,Y,2,h);x.fillRect(X,Y+h-2,w,2)});
  x.fillStyle='rgba(0,0,0,.4)';x.fillRect(97,0,3,280);x.fillStyle='rgba(255,220,170,.2)';x.fillRect(0,0,2,280);
  const g=x.createLinearGradient(74,150,90,150);g.addColorStop(0,'#6a5020');g.addColorStop(.5,'#f0d080');g.addColorStop(1,'#5a4018');x.fillStyle=g;x.fillRect(76,146,6,22);x.fillRect(76,148,18,5);
  x.fillStyle='#c8a050';x.beginPath();x.arc(50,64,3,0,7);x.fill();x.fillStyle='#101010';x.beginPath();x.arc(50,64,1.4,0,7);x.fill();FPDOOR=o}
function fpDoor(x,door){x.fillStyle='#0e0a08';x.fillRect(690,100,100,280);const g=x.createLinearGradient(690,100,790,380);g.addColorStop(0,'rgba(255,220,150,.22)');g.addColorStop(1,'rgba(255,220,150,0)');x.fillStyle=g;x.fillRect(690,100,100,280);
  wood(x,682,92,8,290,1);wood(x,790,92,8,290,1);wood(x,682,92,116,8,0);x.fillStyle='rgba(0,0,0,.4)';x.fillRect(682,92,116,2);
  if(!FPDOOR)fpDoorPaint();const w=100*(1-door*.85);x.drawImage(FPDOOR,690,100,w,280);x.fillStyle=`rgba(0,0,0,${door*.45})`;x.fillRect(690,100,w,280)}

// ---------- Wowas Wohnung, gemalt ----------
aptPaint=function(){const o=document.createElement('canvas');o.width=W;o.height=H;const x=o.getContext('2d');x.setTransform(SC,0,0,SC,0,0);s=777;
  const lg=(a,b,c,d,st)=>{const g=x.createLinearGradient(a,b,c,d);st.forEach(([p,k])=>g.addColorStop(p,k));return g};
  const add=(X,Y,r,k,a)=>{x.save();x.globalCompositeOperation='lighter';dab(x,X,Y,r,k,a);x.restore()};
  const grain=(X0,Y0,w,h,n,c0,c1,a0,a1,sz=1.2)=>{for(let i=0;i<n;i++){x.fillStyle=rgba(mix(c0,c1,R()),a0+R()*(a1-a0));x.fillRect(X0+R()*w,Y0+R()*h,sz*(.4+R()),sz*(.4+R()))}};
  // Tapete: warmes Ocker mit Streifen und kleinen Medaillons, Wasserflecken, Licht der Lampe
  x.fillStyle=lg(0,0,0,380,[[0,'#5e4e36'],[.5,'#7a6646'],[1,'#5a4a32']]);x.fillRect(0,0,800,380);
  for(let X=0;X<800;X+=32){x.fillStyle='rgba(40,28,14,.13)';x.fillRect(X,0,3,380);x.fillStyle='rgba(255,236,190,.05)';x.fillRect(X+14,0,6,380)}
  for(let Y=18;Y<380;Y+=36)for(let X=(Y/36%2)*16+8;X<800;X+=32){x.fillStyle='rgba(60,40,18,.16)';x.beginPath();x.moveTo(X,Y-6);x.lineTo(X+4,Y);x.lineTo(X,Y+6);x.lineTo(X-4,Y);x.fill();ell(x,X,Y,1.2,1.2,[230,206,150],.18)}
  grain(0,0,800,380,5000,[60,44,26],[150,126,90],.05,.16);for(let i=0;i<26;i++)dab(x,R()*800,R()*380,20+R()*50,[60,42,22],.14);
  for(let i=0;i<6;i++){const X=R()*800;x.fillStyle=lg(X,0,X,90,[[0,'rgba(80,60,30,.25)'],[1,'rgba(80,60,30,0)']]);x.fillRect(X-30,0,60,90)}
  // Parkett: Dielen mit Fugen, nach vorn breiter, abgedunkelt; Fußleiste
  for(let Y=380,h=9;Y<500;Y+=h,h*=1.14){let X=-R()*120;while(X<800){const w=90+R()*90;wood(x,X,Y,w,h,0);x.fillStyle='rgba(20,10,4,.6)';x.fillRect(X,Y,1,h);X+=w}x.fillStyle='rgba(16,8,2,.55)';x.fillRect(0,Y,800,1)}
  x.fillStyle='rgba(30,16,6,.42)';x.fillRect(0,380,800,120);wood(x,0,368,800,12,0);x.fillStyle='rgba(0,0,0,.45)';x.fillRect(0,379,800,3);x.fillStyle='rgba(255,220,170,.18)';x.fillRect(0,368,800,1.4);
  // Fenster: Nachtstadt, beleuchtete Fenster mit Schein, Spiegelung im Glas, weiß lackierter Rahmen, Fensterbank
  x.fillStyle=lg(0,70,0,260,[[0,'#060a1e'],[.7,'#1c2240'],[1,'#3a3450']]);x.fillRect(60,70,170,190);
  for(let i=0;i<60;i++)ell(x,62+R()*166,72+R()*60,.5,.5,[220,220,255],.3+R()*.5);
  [[62,170,34,90,'#0e0f18'],[96,128,46,132,'#121420'],[142,150,30,110,'#0c0e16'],[172,112,56,148,'#141622'],[66,200,60,60,'#18182a']].forEach(([X,Y,w,h,k])=>{x.fillStyle=k;x.fillRect(X,Y,w,h);
    for(let a=3;a<w-5;a+=7)for(let b=5;b<h-5;b+=9)if(R()<.38){const c=R()<.75?[255,206,110]:[150,190,255];x.fillStyle=rgba(c,.8);x.fillRect(X+a,Y+b,3.2,4.2);add(X+a+1.6,Y+b+2,7,c,.25)}});
  x.fillStyle=lg(60,70,230,260,[[0,'rgba(255,255,255,0)'],[.42,'rgba(255,255,255,0)'],[.47,'rgba(255,255,255,.1)'],[.55,'rgba(255,255,255,0)'],[.7,'rgba(255,255,255,.06)'],[.74,'rgba(255,255,255,0)']]);x.fillRect(60,70,170,190);
  const frame=(X,Y,w,h)=>{x.fillStyle=lg(X,Y,X+w,Y+h,[[0,'#efe8d8'],[.5,'#cfc6b2'],[1,'#8e8676']]);x.fillRect(X,Y,w,h);x.fillStyle='rgba(0,0,0,.18)';x.fillRect(X+w-1.5,Y,1.5,h);x.fillRect(X,Y+h-1.5,w,1.5)};
  frame(56,66,178,7);frame(56,256,178,7);frame(56,66,7,197);frame(227,66,7,197);frame(142,70,6,190);frame(60,137,170,5);
  wood(x,48,262,194,10,0);x.fillStyle='rgba(0,0,0,.4)';x.fillRect(48,272,194,4);
  // Vorhänge mit Falten
  const curtain=(X0,X1,dir)=>{for(let X=X0;X<X1;X+=1.5){const f=.5+.5*Math.sin((X-X0)*.32),k=mix([90,56,30],[200,150,96],f*.85);x.fillStyle=rgba(k);x.fillRect(X,54,1.6,226+Math.sin(X*.2)*4)}
    x.fillStyle=lg(X0,0,X1,0,dir?[[0,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,.4)']]:[[0,'rgba(0,0,0,.4)'],[1,'rgba(0,0,0,0)']]);x.fillRect(X0,54,X1-X0,230)};
  curtain(28,62,0);curtain(228,264,1);wood(x,20,48,252,6,0);
  // Wandteppich: rot mit Bordüren, Rauten-Medaillon, Fransen, Struktur und leichte Wellen
  dab(x,466,182,190,[0,0,0],.35);
  x.fillStyle='#7e1a18';x.fillRect(300,70,320,200);
  x.strokeStyle='#c99a50';x.lineWidth=5;x.strokeRect(310,80,300,180);x.strokeStyle='#1c2a56';x.lineWidth=7;x.strokeRect(322,92,276,156);x.strokeStyle='#c99a50';x.lineWidth=1.5;x.strokeRect(330,100,260,140);
  for(let X=314;X<608;X+=10){x.fillStyle=X/10%2?'#c99a50':'#e8d8b0';x.beginPath();x.moveTo(X,80);x.lineTo(X+5,85);x.lineTo(X,90);x.lineTo(X-5,85);x.fill();x.beginPath();x.moveTo(X,250);x.lineTo(X+5,255);x.lineTo(X,260);x.lineTo(X-5,255);x.fill()}
  [[460,170,92,64,'#c84020'],[460,170,64,44,'#1c2a56'],[460,170,38,26,'#c99a50'],[460,170,16,11,'#7e1a18']].forEach(([X,Y,w,h,k])=>{x.fillStyle=k;x.beginPath();x.moveTo(X,Y-h);x.lineTo(X+w,Y);x.lineTo(X,Y+h);x.lineTo(X-w,Y);x.fill()});
  [[350,120],[570,120],[350,220],[570,220]].forEach(([X,Y])=>{x.fillStyle='#1c2a56';x.beginPath();x.arc(X,Y,12,0,7);x.fill();x.fillStyle='#c99a50';x.beginPath();x.arc(X,Y,6,0,7);x.fill();x.fillStyle='#c84020';x.beginPath();x.arc(X,Y,2.6,0,7);x.fill()});
  grain(300,70,320,200,9000,[40,8,6],[230,200,150],.06,.2,1);
  for(let X=300;X<620;X+=2){const f=Math.sin(X*.045)*.5+.5;x.fillStyle=`rgba(0,0,0,${.12*f})`;x.fillRect(X,70,2,200);x.fillStyle=`rgba(255,220,180,${.05*(1-f)})`;x.fillRect(X,70,2,200)}
  for(let X=302;X<620;X+=3){x.strokeStyle=rgba(mix([200,170,120],[120,90,60],R()),.9);x.lineWidth=1;x.beginPath();x.moveTo(X,270);x.lineTo(X+(R()-.5)*2,277+R()*4);x.stroke()}
  x.fillStyle='rgba(255,210,150,.1)';x.fillRect(300,70,320,4);
  // Fernseher auf Holzschrank: Röhre mit gewölbtem, bläulich leuchtendem Glas
  wood(x,66,300,148,80,0);x.fillStyle='rgba(0,0,0,.35)';x.fillRect(66,300,148,80);x.strokeStyle='rgba(0,0,0,.6)';x.lineWidth=1.2;x.strokeRect(74,312,64,60);x.strokeRect(142,312,64,60);ell(x,132,342,2,2,[200,170,110]);ell(x,148,342,2,2,[200,170,110]);
  x.fillStyle='rgba(0,0,0,.5)';x.fillRect(66,378,148,4);
  {const b=new Path2D();b.roundRect(82,236,118,68,8);x.fillStyle=lg(82,236,82,304,[[0,'#4a4640'],[.15,'#2e2c2a'],[1,'#141312']]);x.fill(b);x.fillStyle='rgba(255,255,255,.12)';x.fillRect(86,239,110,2)}
  {const sc=new Path2D();sc.roundRect(92,246,82,50,10);const g=x.createRadialGradient(126,266,4,133,271,52);g.addColorStop(0,'#9ad0e8');g.addColorStop(.55,'#3a6e8a');g.addColorStop(1,'#10202a');x.fillStyle=g;x.fill(sc);
    x.save();x.clip(sc);for(let Y=246;Y<296;Y+=2){x.fillStyle='rgba(0,0,0,.14)';x.fillRect(92,Y,82,1)}x.fillStyle=lg(92,246,174,296,[[0,'rgba(255,255,255,.28)'],[.35,'rgba(255,255,255,0)']]);x.fillRect(92,246,82,50);x.restore();add(132,270,90,[120,180,230],.16)}
  [[186,256],[186,270]].forEach(([X,Y])=>{x.fillStyle=lg(X-4,0,X+4,0,[[0,'#9a9690'],[.5,'#e0dcd4'],[1,'#5a5650']]);x.beginPath();x.arc(X,Y,4,0,7);x.fill()});x.fillStyle='#6a6660';x.fillRect(180,282,12,12);
  x.strokeStyle='#8a8680';x.lineWidth=1.4;x.beginPath();x.moveTo(141,236);x.lineTo(118,200);x.moveTo(141,236);x.lineTo(168,204);x.stroke();ell(x,118,200,2,2,[200,196,186]);ell(x,168,204,2,2,[200,196,186]);ell(x,141,236,7,3,[40,38,36]);
  // Sofa: Stoffbezug mit Struktur, Rückenkissen, Sitzpolster, Armlehnen, Kissen
  dab(x,470,384,240,[0,0,0],.45);
  const pad=(X,Y,w,h,r,c,lift=1)=>{const p=new Path2D();p.roundRect(X,Y,w,h,r);x.fillStyle=lg(X,Y,X,Y+h,[[0,rgba(mix(c,[255,230,190],.18*lift))],[.4,rgba(c)],[1,rgba(mix(c,[0,0,0],.45))]]);x.fill(p);
    x.save();x.clip(p);grain(X,Y,w,h,w*h/9,mix(c,[0,0,0],.4),mix(c,[255,220,180],.3),.12,.28,1);x.fillStyle=lg(X,0,X+w,0,[[0,'rgba(0,0,0,.25)'],[.15,'rgba(0,0,0,0)'],[.85,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,.3)']]);x.fillRect(X,Y,w,h);x.restore()};
  pad(286,244,368,62,14,[120,64,30]);[[296,252],[420,252],[544,252]].forEach(([X])=>pad(X,252,118,52,12,[134,72,34]));
  pad(286,296,368,50,10,[126,68,32]);[[296,298],[476,298]].forEach(([X])=>pad(X,298,174,38,10,[140,78,38]));
  pad(266,236,40,118,14,[110,58,26]);pad(634,236,40,118,14,[104,54,24],.8);
  x.fillStyle=lg(0,340,0,356,[[0,'#3e1e0c'],[1,'#20100a']]);x.fillRect(290,340,360,14);[[300,354],[630,354]].forEach(([X,Y])=>{x.fillStyle=lg(X,0,X+10,0,[[0,'#2a1608'],[.5,'#6a4024'],[1,'#1a0c04']]);x.fillRect(X,Y,10,26)});
  pad(298,258,62,32,10,[226,214,190]);x.strokeStyle='rgba(120,100,80,.5)';x.lineWidth=1;x.beginPath();x.moveTo(306,274);x.quadraticCurveTo(329,270,352,276);x.stroke();
  // Stehlampe mit Stoffschirm und warmem Lichtkegel
  x.strokeStyle=lg(246,0,254,0,[[0,'#5a4420'],[.5,'#d8b060'],[1,'#4a3418']]);x.lineWidth=4;x.beginPath();x.moveTo(250,380);x.lineTo(250,148);x.stroke();ell(x,250,380,16,4,[60,44,20]);ell(x,250,378,14,3,[180,140,70]);
  {const sh=new Path2D('M226,152L274,152L264,118L236,118Z');x.fillStyle=lg(226,0,274,0,[[0,'#c8903c'],[.4,'#ffe0a0'],[1,'#b07830']]);x.fill(sh);x.save();x.clip(sh);for(let X=226;X<276;X+=3){x.fillStyle='rgba(120,70,20,.18)';x.fillRect(X,118,1,36)}x.restore();x.strokeStyle='rgba(90,50,10,.6)';x.lineWidth=1;x.stroke(sh)}
  add(250,140,150,[255,190,100],.3);add(250,170,60,[255,220,150],.25);x.save();x.globalCompositeOperation='lighter';x.fillStyle=lg(0,152,0,380,[[0,'rgba(255,200,120,.16)'],[1,'rgba(255,200,120,0)']]);x.beginPath();x.moveTo(228,152);x.lineTo(272,152);x.lineTo(330,380);x.lineTo(170,380);x.fill();x.restore();
  // Kram auf dem Boden: Flaschen, Aschenbecher, Hausschuhe
  [[330,400,'#2e5a30'],[350,410,'#2a5232'],[600,396,'#4a6a3a']].forEach(([X,Y,k])=>{dab(x,X+5,Y+2,12,[0,0,0],.5);const b=new Path2D();b.roundRect(X,Y-26,10,26,2.5);b.rect(X+3,Y-36,4,10);
    x.fillStyle=lg(X,0,X+10,0,[[0,k],[.3,'#8ac08a'],[.45,k],[1,'#0a1a0c']]);x.fill(b);x.fillStyle='rgba(255,255,255,.55)';x.fillRect(X+2,Y-22,1.2,16);x.fillStyle='#c8b070';x.fillRect(X+1,Y-18,8,7)});
  dab(x,432,408,22,[0,0,0],.45);ell(x,430,404,16,5.5,[70,70,74]);ell(x,430,402,12,3.5,[26,26,28]);ell(x,426,401,5,1.2,[230,226,214]);ell(x,436,402,4,1.1,[200,190,170]);
  [[520,420],[556,424]].forEach(([X,Y])=>{dab(x,X+2,Y+4,22,[0,0,0],.4);ell(x,X,Y,18,7,[34,70,120]);ell(x,X-3,Y-1.5,13,4.5,[60,104,160]);ell(x,X+6,Y,6,4,[20,40,70])});
  // Farbstimmung: warmes Lampenlicht, kalter Fernseher, dunkle Ecken
  x.fillStyle='rgba(255,170,90,.06)';x.fillRect(0,0,800,500);
  const vg=x.createRadialGradient(330,220,120,400,250,560);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.65)');x.fillStyle=vg;x.fillRect(0,0,800,500);return o};
