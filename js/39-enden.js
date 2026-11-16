// ================= Drei Enden =================
// 1) Heim     – Ausweg-Joint rauchen, Wowas Sofa, Abspann (wie bisher).
// 2) Nastja   – wie Heim, aber mit Nastjas Polaroid in der Tasche (gibt sie nur bei 100 % Beziehung): Die Szene geht weiter,
//               Petja steht auf und hängt das Foto über seinen Schreibtisch. Auf dem Foto: Nastja, verführerisch, zwinkernd,
//               darunter handschriftlich „Vermiss dich, Zwiebel ♥“ (EN/RU mit eigenem Text, über die Sprachdateien).
// 3) Bleiben  – am Tisch statt Joint „Hierbleiben“ wählen: kurzer Epilog im Dorf, Petja wird ein Zahnrad im Märchen.
// Gefundene Enden merkt sich das Spiel (Abspann zeigt „x von 3“).

// ---------- Polaroid ----------
ITEMS.polaroid=['📸','Nastjas Polaroid','Nastja an der Stange, mit Zwinkern und Schmollmund. Auf dem weißen Rand in Kugelschreiber: „Vermiss dich, Zwiebel ♥“. Hat sie geschrieben, bevor ich überhaupt weg bin.'];
// Foto als Bild: weißer Rahmen, Lounge-Rot, Nastja (Heranwinken, Zwinkern) vom Kopf bis zur Hüfte, Kussmund-Abdruck, Handschrift
function polaroidCanvas(){const c=document.createElement('canvas'),S=6;c.width=90*S;c.height=110*S;const x=c.getContext('2d');x.scale(S,S);
  x.fillStyle='#f6f2e8';x.fillRect(0,0,90,110);x.fillStyle='rgba(0,0,0,.06)';for(let i=0;i<60;i++)x.fillRect(Math.random()*90,Math.random()*110,.6,.6);
  const g=x.createRadialGradient(45,40,4,45,40,60);g.addColorStop(0,'#c8406a');g.addColorStop(.5,'#6a1028');g.addColorStop(1,'#1a0408');x.fillStyle=g;x.fillRect(6,6,78,74);
  x.save();x.globalCompositeOperation='lighter';const sp=x.createRadialGradient(30,18,1,30,18,30);sp.addColorStop(0,'rgba(255,220,240,.35)');sp.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=sp;x.fillRect(6,6,78,74);x.restore();
  const im=typeof nastjaTanzBild=='function'&&nastjaTanzBild('tanz1');
  if(im&&im.complete&&im.naturalWidth){x.save();x.beginPath();x.rect(6,6,78,74);x.clip();x.imageSmoothingEnabled=false;x.drawImage(im,36,14,190,330,4,4,78*190/180,74*330/240);x.restore()}
  // leichter Blitz-Glanz + Vignette wie ein echtes Sofortbild
  const v=x.createRadialGradient(45,43,20,45,43,55);v.addColorStop(0,'rgba(255,240,220,.08)');v.addColorStop(1,'rgba(30,10,10,.35)');x.fillStyle=v;x.fillRect(6,6,78,74);
  x.fillStyle='rgba(190,20,60,.8)';x.beginPath();x.ellipse(78,103,3.4,1.6,-.3,0,Math.PI);x.fill();x.beginPath();x.moveTo(74.8,102.5);x.quadraticCurveTo(76.4,100,78,101.8);x.quadraticCurveTo(79.6,100,81.2,102.5);x.fill();
  x.save();x.translate(45,94);x.rotate(-.04);x.fillStyle='#1c2a78';x.textAlign='center';let fs=9;const cap='Vermiss dich, Zwiebel ♥';do{x.font='italic '+fs+'px "Segoe Script","Brush Script MT","Comic Sans MS",cursive';fs-=.5}while(fs>4&&x.measureText(cap).width>70);x.fillText(cap,0,0);x.restore();   // passt sich der Breite an (auch EN/RU)
  return c}
// Symbol in der Tasche (kleines Foto, leicht schräg)
function polaroidIcon(){const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d'),p=polaroidCanvas();
  x.translate(128,132);x.rotate(-.12);x.shadowColor='rgba(0,0,0,.45)';x.shadowBlur=14;x.shadowOffsetY=6;x.drawImage(p,-78,-95,156,190);ICONS.polaroid=c.toDataURL();if(typeof renderInv=='function'&&has('polaroid'))renderInv()}
setTimeout(function w(){const im=typeof nastjaTanzBild=='function'&&nastjaTanzBild('tanz1');if(!im||!im.complete)return setTimeout(w,300);polaroidIcon()},800);

// Nastja schenkt das Polaroid, sobald die Beziehung 100 % erreicht (beim nächsten Klick auf sie)
{const nm=nastjaMenu;nastjaMenu=function(){if(relOf('Nastja')>=100&&!FL.polaroid)return say([
    ['NA','*kramt eine Sofortbildkamera hinter dem Tresen hervor* Halt mal still, Zwiebel. … Nein, warte. Andersrum. Ich bin das Motiv.'],
    ['NA','*posiert, zwinkert* *KLICK* … *wedelt mit dem Foto* Nicht gucken, das muss erst entwickeln. Wie du.'],
    ['NA','*schreibt etwas auf den Rand* Hier. Damit du mich nicht vergisst, wenn du in deine echte Welt verschwindest.'],
    ['P','Was steht da?'],['NA','Lies es zu Hause, Süßer. Und häng mich irgendwo hin, wo du jeden Tag hinguckst.'],
    ['P','(Mein Herz klopft. Oder der Wein. Eins von beiden.)']],()=>{FL.polaroid=1;inv.push('polaroid');renderInv()});return nm.apply(this,arguments)}}

// ---------- Am Tisch: Joint drehen oder bleiben ----------
// (30-faeden.js ruft nach dem Tischgespräch T.tisch.fn() erneut auf – dann erscheint die Wahl)
wrapFn('tisch',function(orig){if(FL.ende||!FL.recipe||!hasAll()||!FL.tischRede||FL.tischWahl)return orig();
  if(typeof DL!='undefined'&&DL.on){FL.tischWahl=1;return orig()}   // automatischer Durchlauf: Heimweg
  const o=openO(`<div class="pan menu endwahl"><h3>${ic('next')} Wie geht’s weiter?</h3><p class="em">Alles liegt auf dem Tisch. Baba Jaga schaut dich an.</p>
    <button class="mb big" data-e="heim">🚬 Den Ausweg-Joint drehen<small>Zurück in die echte Welt</small></button>
    <button class="mb big" data-e="bleib">🌲 Hierbleiben<small>Ein Zahnrad im Märchen werden</small></button>
    ${has('polaroid')?'<p class="em pol">📸 Nastjas Polaroid steckt in deiner Tasche.</p>':''}</div>`,'menuO');
  o.querySelector('[data-e=heim]').onclick=()=>{closeO();FL.tischWahl=1;orig()};
  o.querySelector('[data-e=bleib]').onclick=()=>{closeO();endeBleiben()}});

// ---------- Ende 3: Bleiben ----------
function endeBleiben(){const sz=(room,pos,lines)=>new Promise(r=>{enter(room,pos);setTimeout(()=>say(lines,r),900)});
  say([['P','Wissen Sie was, Frau Jaga? … Ich bleibe.'],['J2','Wie bitte?'],['P','Drüben bin ich mein eigenes Problem. Hier bin ich wenigstens das Problem von allen.'],
    ['J2','*lacht krächzend* Dummkopf. Aber mein Dummkopf. Die Zutaten kommen in den Schrank. Für schlechte Zeiten.']],async()=>{FL.ende=2;
    await sz('dorfstr',[400,470],[['O','Na, Langer? Du bist ja immer noch da. Dann trag mir die Kohlen rein. Und Finger weg von meinem Gebiss.']]);
    await sz('dorf',[420,470],[['G','Bleibst du, Sohnemann? Dann hilf mir mit dem Dach. Teer ist noch da. Und Selbstgebrannter. Den teilen wir gerecht: ich zwei Drittel.']]);
    await sz('gnome',[520,470],[['N1','Der Lange bleibt? Gut. Wir brauchen einen, der an die oberen Regale kommt. Lohn: eine Laterne. Leihweise.']]);
    await sz('innen',[300,470],[['J2','Na, Zahnrad? Morgen früh Würmer sammeln. Für die Suppe.'],['P','Jawohl, Frau Jaga.'],
      ['P','(Drüben merkt Wowa erst, dass ich weg bin, wenn ihm das Feuerzeug fehlt.)'],['P','(Hier merkt es jeder. Das ist neu.)']]);
    fade.style.opacity=1;setTimeout(()=>{abspannEnde('bleiben');fade.style.opacity=0},900)})}

// ---------- Ende 2: Polaroid über dem Schreibtisch (läuft im Finale nach Wowa weiter, 20-akt3.js) ----------
async function polaroidEnde(cv3){const x=cv3.getContext('2d'),PIC=polaroidCanvas(),wait=ms=>new Promise(r=>setTimeout(r,ms)),talk=l=>new Promise(r=>say(l,r));
  const tween=(ms,f)=>new Promise(r=>{const a=performance.now();(function k(){const p=Math.min(1,(performance.now()-a)/ms);f(p);p<1?requestAnimationFrame(k):r()})()});
  const ease=p=>p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;
  // Petjas Zimmer bei Nacht, nah dran: Tapete, Fenster mit Plattenbau-Lichtern, Heizkörper, Schreibtisch (Holz, Schubladen), Monitor, Tastatur,
  // Tasse, Aschenbecher, Feuerzeug, Zettel, Schreibtischlampe als einzige Lichtquelle. Maßstab wie Petja (≈1,3 px pro cm).
  const Q=2.2,room=document.createElement('canvas');room.width=W*Q;room.height=H*Q;{const r=room.getContext('2d');r.setTransform(SC*Q,0,0,SC*Q,0,0);let sd=7;const rn=()=>(sd=(sd*16807)%2147483647)/2147483647;
    // Tapete mit kleinem Rautenmuster und Bahnen
    r.fillStyle='#6f6a4c';r.fillRect(0,0,800,456);
    for(let Y=0;Y<456;Y+=18)for(let X=(Y/18%2)*11;X<800;X+=22){r.fillStyle='rgba(40,36,20,.22)';r.beginPath();r.moveTo(X,Y-4);r.lineTo(X+3,Y);r.lineTo(X,Y+4);r.lineTo(X-3,Y);r.fill();r.fillStyle='rgba(230,220,170,.07)';r.fillRect(X-.5,Y-7,1,3)}
    for(let X=0;X<800;X+=66){r.fillStyle='rgba(20,16,8,.10)';r.fillRect(X,0,1,456)}
    // Fenster links: Nacht, gegenüber ein Plattenbau mit ein paar Lichtern, Tüllgardine, Vorhang
    r.fillStyle='#e8e2d0';r.fillRect(326,168,108,172);r.fillStyle='#0d1424';r.fillRect(334,176,92,156);
    r.fillStyle='#1a2030';r.fillRect(340,214,80,118);for(let Y=220;Y<330;Y+=12)for(let X=344;X<416;X+=10){if(rn()<.22){r.fillStyle=rn()<.5?'#e8c070':'#c8d0e0';r.fillRect(X,Y,5,6)}}
    r.fillStyle='#e8e2d0';r.fillRect(377,176,5,156);r.fillRect(334,250,92,4);r.fillStyle='#d8d2c0';r.fillRect(320,336,120,8);
    r.fillStyle='rgba(235,232,220,.22)';for(let X=326;X<372;X+=4)r.fillRect(X,160,2.4,186+Math.sin(X)*3);r.fillStyle='#5a2a2a';r.fillRect(312,156,16,200);r.fillStyle='#8a8070';r.fillRect(300,154,150,4);
    // Heizkörper unter dem Fenster
    r.fillStyle='#d8d4c8';for(let X=334;X<426;X+=8)r.fillRect(X,370,6,56);r.fillStyle='#b8b4a8';r.fillRect(332,368,96,4);r.fillRect(332,424,96,4);
    // Fußleiste und Boden (Laminat)
    r.fillStyle='#3a2a1c';r.fillRect(0,448,800,10);r.fillStyle='#5a4230';r.fillRect(0,456,800,44);for(let X=0;X<800;X+=46){r.fillStyle='rgba(20,10,4,.35)';r.fillRect(X+(rn()*10|0),456,1,44)}
    // Poster rechts (Konzertplakat, verblichen), mit Klebestreifen
    r.save();r.translate(722,214);r.rotate(.03);r.fillStyle='#2a3a4a';r.fillRect(-34,-50,68,96);r.fillStyle='#c8502a';r.beginPath();r.arc(0,-8,20,0,7);r.fill();r.fillStyle='#e8d8b0';r.fillRect(-26,24,52,5);r.fillRect(-18,33,36,3);r.fillStyle='rgba(255,255,240,.45)';r.fillRect(-38,-54,10,6);r.fillRect(28,-54,10,6);r.restore();
    // Schreibtisch: Platte, Kante, links ein Bein, rechts ein Schubladen-Container
    r.fillStyle='rgba(0,0,0,.35)';r.fillRect(486,446,200,10);
    wood(r,470,356,224,16,0);r.fillStyle='rgba(255,230,180,.10)';r.fillRect(470,356,224,3);r.fillStyle='#3e2414';r.fillRect(468,372,228,6);
    wood(r,478,378,12,72,1);r.fillStyle='rgba(0,0,0,.25)';r.fillRect(486,378,4,72);
    wood(r,606,378,84,72,1);r.strokeStyle='#2a160a';r.lineWidth=1.2;[384,406,428].forEach(Y=>{r.strokeRect(610,Y,76,20);r.fillStyle='#b8b0a0';r.fillRect(640,Y+8,16,3)});
    // Monitor (flach, Standfuß), Bildschirm schwach blau, Tastatur, Maus
    r.fillStyle='#1c1c1e';r.fillRect(496,292,92,58);r.fillStyle='#22324a';r.fillRect(500,296,84,50);r.fillStyle='rgba(120,170,230,.18)';r.fillRect(500,296,84,50);
    r.fillStyle='rgba(255,255,255,.06)';r.beginPath();r.moveTo(500,296);r.lineTo(540,296);r.lineTo(510,346);r.lineTo(500,346);r.fill();
    r.fillStyle='#2a2a2c';r.fillRect(536,350,12,8);r.fillRect(522,356,40,3);
    r.fillStyle='#2c2c30';r.fillRect(500,362,74,7);r.fillStyle='#46464c';for(let X=502;X<570;X+=4.4){r.fillRect(X,363,3.4,2);r.fillRect(X+1,366,3.4,2)}
    r.fillStyle='#2c2c30';r.beginPath();r.ellipse(588,365,5,3,0,0,7);r.fill();
    // Tasse, Aschenbecher mit Kippe, Wowas Feuerzeug, Zettel
    r.fillStyle='#e8e0d0';r.fillRect(606,340,14,18);r.strokeStyle='#e8e0d0';r.lineWidth=2.2;r.beginPath();r.arc(622,349,5,-1.3,1.3);r.stroke();r.fillStyle='#3a1e10';r.fillRect(607,341,12,2);
    r.fillStyle='#8a9aa8';r.beginPath();r.ellipse(486,364,10,3.4,0,0,7);r.fill();r.fillStyle='#e8e0d0';r.fillRect(484,359,10,2);r.fillStyle='#c84020';r.fillRect(493,359,2,2);
    r.fillStyle='#c83030';r.fillRect(630,358,10,4);r.fillStyle='#ece6d6';r.save();r.translate(642,352);r.rotate(-.12);r.fillRect(0,0,26,16);r.fillStyle='rgba(30,40,110,.5)';for(let Y=4;Y<14;Y+=3)r.fillRect(3,Y,16+rn()*4,.7);r.restore();
    // Schreibtischlampe: Fuß, Gelenkarm, Schirm
    r.fillStyle='#2a2a2a';r.beginPath();r.ellipse(676,358,12,3.6,0,0,7);r.fill();r.strokeStyle='#3a3a3a';r.lineWidth=2.6;r.beginPath();r.moveTo(676,356);r.lineTo(668,312);r.lineTo(642,296);r.stroke();
    r.fillStyle='#3a3a3a';r.beginPath();r.arc(668,312,2.6,0,7);r.fill();r.save();r.translate(642,296);r.rotate(.5);r.fillStyle='#2e4a3a';r.beginPath();r.moveTo(-6,-6);r.lineTo(8,-6);r.lineTo(14,10);r.lineTo(-12,10);r.fill();r.fillStyle='#fff2c0';r.fillRect(-8,9,20,2.4);r.restore();
    // Licht: Lampe ist die einzige Quelle, der Rest Nacht
    r.save();r.globalCompositeOperation='lighter';dab(r,628,360,120,[255,190,100],.30);dab(r,600,300,190,[255,170,80],.12);dab(r,380,250,90,[90,120,200],.08);r.restore();
    const vg=r.createRadialGradient(600,320,90,600,320,520);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(4,2,8,.72)');r.fillStyle=vg;r.fillRect(0,0,800,500)}
  // Kamera: nah im Zimmer (Z0), am Ende bis ins Foto (ZF); die Mitte gleitet so, dass das Foto ruhig in die Bildmitte wandert
  const SPOT=[566,262],PS=.2,Z0=1.7,C0=[560,300],ZF=21;
  let px=330,bob=0,ph={x:0,y:0,s:0,a:0,on:false},pin=0,zoom=0,dark=1,fin=false;
  function draw(){if(fin)return;x.setTransform(1,0,0,1,0,0);x.fillStyle='#000';x.fillRect(0,0,W,H);
    const z=Z0*Math.pow(ZF/Z0,zoom),w=(1-Z0/z)/(1-Z0/ZF),cx=C0[0]+(SPOT[0]-C0[0])*w,cy=C0[1]+(SPOT[1]-C0[1])*w;
    x.setTransform(SC*z,0,0,SC*z,W/2-cx*SC*z,H/2-cy*SC*z);x.drawImage(room,0,0,800,500);
    if(PETIMG.complete&&PETIMG.naturalWidth){x.filter='brightness(.62) sepia(.15)';x.imageSmoothingEnabled=false;x.drawImage(PETIMG,px-48*.95,470-254*.95-bob,96*.95,258*.95);x.imageSmoothingEnabled=true;x.filter='none'}   // Petja im Halbdunkel
    if(ph.on){x.save();x.translate(ph.x,ph.y);x.rotate(ph.a);x.scale(ph.s,ph.s);x.shadowColor='rgba(0,0,0,.5)';x.shadowBlur=6*ph.s*SC*z;x.shadowOffsetY=2;x.drawImage(PIC,-45,-55,90,110);x.restore();
      if(pin){x.fillStyle='#b01818';x.beginPath();x.arc(ph.x,ph.y-50*ph.s,1.1*pin,0,7);x.fill();x.fillStyle='rgba(255,255,255,.6)';x.beginPath();x.arc(ph.x-.3,ph.y-50*ph.s-.3,.35*pin,0,7);x.fill()}}
    x.setTransform(1,0,0,1,0,0);if(dark>0){x.fillStyle=`rgba(0,0,0,${dark})`;x.fillRect(0,0,W,H)}requestAnimationFrame(draw)}
  requestAnimationFrame(draw);
  await talk([['P','*kramt in der Hosentasche* … Moment.'],['P','Das Polaroid. Es ist mitgekommen.']]);
  await tween(900,p=>dark=1-p);
  await tween(2000,p=>{px=330+140*ease(p);bob=Math.abs(Math.sin(p*Math.PI*5))*3});bob=0;await wait(300);
  ph={x:px+26,y:330,s:PS*.8,a:.3,on:true};
  await tween(1200,p=>{const e=ease(p);ph.x=px+26+(SPOT[0]-px-26)*e;ph.y=330+(SPOT[1]-330)*e-Math.sin(p*Math.PI)*10;ph.s=PS*(.8+.2*e);ph.a=.3-.34*e});
  await tween(250,p=>pin=p);
  await tween(300,p=>ph.a=-.04+Math.sin(p*Math.PI*3)*.04*(1-p));
  await talk([['P','Da. Über dem Schreibtisch. Da guck ich jeden Tag hin.']]);
  await tween(3400,p=>zoom=ease(p));await wait(2400);
  await talk([['P','(Wowa wird fragen, wer das ist.)'],['P','(Ich werd sagen: eine Bekannte. Aus dem Sumpf.)']]);
  await wait(400);fin=true}   // letztes Bild bleibt stehen – der Abspann läuft darüber (abspannEnde mit Hintergrund)

// ---------- Abspann je Ende, gefundene Enden zählen ----------
const ENDEN={heim:['Ende.','… oder?'],nastja:['Ende: Ein Foto über dem Schreibtisch','Manche Märchen nimmt man mit nach Hause.'],bleiben:['Ende: Das Zahnrad','Petja blieb im Märchen. Wowa sucht noch sein Feuerzeug.']};
function abspannEnde(id,bg){let found=[];try{found=JSON.parse(localStorage.getItem('petjaEnden')||'[]')}catch(e){}if(!found.includes(id))found.push(id);try{localStorage.setItem('petjaEnden',JSON.stringify(found))}catch(e){}
  FL['ende_'+id]=1;abspann();const o=$('#abspann');if(!o)return;
  // letzter Moment des Endes als Hintergrund hinter den Credits
  if(bg){bg.removeAttribute('id');bg.style.cssText='position:absolute;inset:0;width:100%;height:100%';o.style.background='#000';o.insertBefore(bg,o.firstChild);const sh=document.createElement('div');sh.style.cssText='position:absolute;inset:0;background:linear-gradient(90deg,rgba(10,4,8,.25),rgba(10,4,8,.5) 30%,rgba(10,4,8,.5) 70%,rgba(10,4,8,.25))';bg.after(sh)}
  const[a,b]=ENDEN[id]||ENDEN.heim;o.querySelector('.end').textContent=a;const sm=o.querySelector('.end.small');if(sm){sm.textContent=b;
    sm.insertAdjacentHTML('afterend',`<p class="end small endz">Gefundene Enden: ${found.length} von 3</p>`)}}

(function(){const css=document.createElement('style');css.textContent=`.endwahl{max-width:460px}.endwahl .mb.big{display:block;width:100%;margin:8px 0;text-align:left}.endwahl small{display:block;font-size:12px;opacity:.75;margin-top:2px}.endwahl .pol{margin-top:6px}`;document.head.appendChild(css)})();
