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
function polaroidCanvas(){const c=document.createElement('canvas'),S=4;c.width=90*S;c.height=110*S;const x=c.getContext('2d');x.scale(S,S);
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
  // Bühne: Wand, Dielen, Schreibtisch mit Lampe, Röhrenmonitor, Papierkram und Tasse
  const room=document.createElement('canvas');room.width=W;room.height=H;{const r=room.getContext('2d');r.setTransform(SC,0,0,SC,0,0);
    r.fillStyle='#7a6a4e';r.fillRect(0,0,800,390);for(let X=0;X<800;X+=24){r.fillStyle=(X/24)%2?'rgba(60,40,20,.18)':'rgba(255,240,200,.06)';r.fillRect(X,0,12,390)}
    r.fillStyle='#5a3a24';r.fillRect(0,390,800,110);for(let Y=390;Y<500;Y+=14)for(let X=(Y/14%2)*20;X<800;X+=40){r.strokeStyle='rgba(20,10,4,.6)';r.strokeRect(X,Y,40,14)}r.fillStyle='#2a1a10';r.fillRect(0,386,800,8);
    r.fillStyle='#6a4226';r.fillRect(430,318,300,16);r.fillStyle='#4a2c18';r.fillRect(440,334,14,62);r.fillRect(706,334,14,62);r.fillRect(600,334,106,46);r.strokeStyle='#2a1a0c';r.lineWidth=1.5;r.strokeRect(606,342,94,30);r.fillStyle='#c8a060';r.fillRect(648,354,10,4);
    r.fillStyle='#2a2a2a';r.fillRect(470,250,96,70);r.fillStyle='#3a5a6a';r.fillRect(480,258,76,52);r.fillStyle='#202020';r.fillRect(500,310,40,10);
    r.fillStyle='#e8dcc0';r.save();r.translate(580,312);r.rotate(.1);r.fillRect(0,0,40,6);r.restore();r.fillStyle='#d8ccb0';r.fillRect(574,310,34,5);
    r.fillStyle='#c84020';r.fillRect(620,300,14,18);r.strokeStyle='#c84020';r.lineWidth=2;r.beginPath();r.arc(636,309,4,-1.2,1.2);r.stroke();
    r.strokeStyle='#3a3020';r.lineWidth=3;r.beginPath();r.moveTo(690,318);r.lineTo(680,250);r.lineTo(700,230);r.stroke();r.fillStyle='#d8b060';r.beginPath();r.moveTo(686,224);r.lineTo(716,230);r.lineTo(708,246);r.lineTo(684,236);r.fill();
    r.save();r.globalCompositeOperation='lighter';dab(r,620,280,140,[255,190,90],.28);r.restore();
    const vg=r.createRadialGradient(560,240,100,560,240,560);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.6)');r.fillStyle=vg;r.fillRect(0,0,800,500)}
  let px=120,bob=0,ph={x:0,y:0,s:0,a:0,on:false},pin=0,zoom=0,dark=1,fin=false;const SPOT=[575,150];
  // Kamera: Zoom auf das Foto (zoom 0..1), Mitte gleitet von der Bildmitte zum Foto
  function draw(){if(fin)return;x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,W,H);x.save();
    const z=1+zoom*2.5,cx=400+(SPOT[0]-400)*zoom,cy=250+(SPOT[1]+4-250)*zoom;x.setTransform(SC*z,0,0,SC*z,W/2-cx*SC*z,H/2-cy*SC*z);
    x.drawImage(room,0,0,800,500);
    if(ph.on){x.save();x.translate(ph.x,ph.y);x.rotate(ph.a);x.scale(ph.s,ph.s);x.shadowColor='rgba(0,0,0,.45)';x.shadowBlur=8;x.shadowOffsetY=3;x.drawImage(PIC,-45,-55,90,110);x.restore();
      if(pin){x.fillStyle='#b01818';x.beginPath();x.arc(ph.x,ph.y-50,3.4*pin,0,7);x.fill();x.fillStyle='rgba(255,255,255,.6)';x.beginPath();x.arc(ph.x-1,ph.y-51,1.1*pin,0,7);x.fill()}}
    if(PETIMG.complete&&PETIMG.naturalWidth&&zoom<1){x.imageSmoothingEnabled=false;x.drawImage(PETIMG,px-48*.95,470-254*.95-bob,96*.95,258*.95);x.imageSmoothingEnabled=true}
    x.restore();if(dark>0){x.setTransform(1,0,0,1,0,0);x.fillStyle=`rgba(0,0,0,${dark})`;x.fillRect(0,0,W,H)}requestAnimationFrame(draw)}
  requestAnimationFrame(draw);
  await talk([['P','*kramt in der Hosentasche* … Moment.'],['P','Das Polaroid. Es ist mitgekommen.']]);
  await tween(900,p=>dark=1-p);
  await tween(2200,p=>{px=120+260*ease(p);bob=Math.abs(Math.sin(p*Math.PI*6))*4});bob=0;await wait(300);
  ph={x:px+30,y:330,s:.35,a:.3,on:true};
  await tween(1300,p=>{const e=ease(p);ph.x=px+30+(SPOT[0]-px-30)*e;ph.y=330+(SPOT[1]-330)*e-Math.sin(p*Math.PI)*40;ph.s=.35+.65*e;ph.a=.3-.36*e});
  await tween(250,p=>pin=p);
  await tween(300,p=>ph.a=-.06+Math.sin(p*Math.PI*3)*.04*(1-p));
  await talk([['P','Da. Über dem Schreibtisch. Da guck ich jeden Tag hin.']]);
  await tween(2200,p=>zoom=ease(p));await wait(3200);
  await talk([['P','(Wowa wird fragen, wer das ist.)'],['P','(Ich werd sagen: eine Bekannte. Aus dem Sumpf.)']]);
  await tween(1600,p=>dark=p);fin=true}

// ---------- Abspann je Ende, gefundene Enden zählen ----------
const ENDEN={heim:['Ende.','… oder?'],nastja:['Ende: Ein Foto über dem Schreibtisch','Manche Märchen nimmt man mit nach Hause.'],bleiben:['Ende: Das Zahnrad','Petja blieb im Märchen. Wowa sucht noch sein Feuerzeug.']};
function abspannEnde(id){let found=[];try{found=JSON.parse(localStorage.getItem('petjaEnden')||'[]')}catch(e){}if(!found.includes(id))found.push(id);try{localStorage.setItem('petjaEnden',JSON.stringify(found))}catch(e){}
  FL['ende_'+id]=1;abspann();const o=$('#abspann');if(!o)return;const[a,b]=ENDEN[id]||ENDEN.heim;o.querySelector('.end').textContent=a;const sm=o.querySelector('.end.small');if(sm){sm.textContent=b;
    sm.insertAdjacentHTML('afterend',`<p class="end small endz">Gefundene Enden: ${found.length} von 3</p>`)}}

(function(){const css=document.createElement('style');css.textContent=`.endwahl{max-width:460px}.endwahl .mb.big{display:block;width:100%;margin:8px 0;text-align:left}.endwahl small{display:block;font-size:12px;opacity:.75;margin-top:2px}.endwahl .pol{margin-top:6px}`;document.head.appendChild(css)})();
