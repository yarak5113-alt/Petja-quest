// ================= Trinkduell mit Opa Grischa (Ich-Sicht, QTE) + Dorf-Ruf + Ende „Ehrenbürger“ =================
// Nach dem Hausbau: Klick auf Opa → „Trinkduell“. Ich-Sicht auf Opas Holztisch: Plastikflasche Самосад, Gurken, Brot, zwei Gläser.
//   Unten pendelt ein zitternder Herzschlag-Zeiger hin und her. Leertaste / Klick, wenn er in der grünen Mitte ist → Shot runtergewürgt.
//   Oben ein geteilter Balken: Petjas und Opas Standfestigkeit. Jeder Shot kostet; daneben (verschluckt) kostet viel mehr.
//   Pro Shot wird der Zeiger schneller und zittert stärker, die grüne Mitte schmaler, das Bild kippt (Schlagseite) und sieht doppelt.
//   Wer zuerst auf 0 ist, liegt unterm Tisch. Nach 3 Niederlagen lässt es sich überspringen (wie die anderen Minispiele).
// Sieg: viel Dorf-Ruf (+40) und Rubel (player.cash: 3 beim ersten Sieg, danach je 1) – damit geht beim Privattanz „Башли“.
//
// ENDE-MATRIX (an Baba Jagas Tisch, Hauptentscheidung return = Joint / stay = Hierbleiben):
//   return + Polaroid            → 'nastja'  Wahres Ende (Beweis in der echten Welt: das Foto über dem Schreibtisch)
//   return ohne Polaroid         → 'heim'    Standard-Ende
//   stay   + Dorf-Ruf ≥ 70       → 'ehren'   Ehrenbürger (Opas Dorf, Orden, Freitagsduell)
//   stay   sonst                 → 'bleiben' Das Zahnrad
//   Dorf-Ruf ≥ 70 geht nur mit gewonnenem Trinkduell (ohne Duell höchstens 60).

let DUELL_AKTIV=null;   // {petja,opa} während des Duells – für die Porträt-Mimik (51-portraets-crt.js)
const DORF_RUF={haus:15,teer:10,glut:10,mehl:10,weih:10,popeBack:5,duellSieg:40};
const dorfRuf=()=>Math.min(100,Object.entries(DORF_RUF).reduce((s,[k,v])=>s+(FL[k]?v:0),0));
const EHREN_RUF=70,ehrenOk=()=>dorfRuf()>=EHREN_RUF;
function endeMatrix(wahl){return wahl==='return'?(has('polaroid')?'nastja':'heim'):(ehrenOk()?'ehren':'bleiben')}

// ---------- Texte ----------
const DUELL_OPA_TRINKT=[
  [['G','За здоровье! *kipp* … Ahh. Wie Muttermilch. Wenn die Mutter ein Traktor war.']],
  [['G','*kipp* Der ist vom Februar. Guter Monat. Kurzer Monat.']],
  [['G','*hicks* Noch einer, Städter? Oder brauchst du ein Kissen?']],
  [['G','*kipp* *rülps* Für die Sowjetunion! Die war auch irgendwann alle.']],
  [['G','*hicks* … Der Tisch wackelt. Nicht ich. Der Tisch.']],
  [['G','*kipp* *hicks* Ich seh dich doppelt, Junge. Beide sehen blass aus.']]];
const DUELL_PETJA_DANEBEN=[
  [['P','*HUST* *würg* … Das ist kein Schnaps, das ist Abbeizer!'],['G','Ha! Wie ein Spatz am Brunnen!']],
  [['P','*röchel* Mein Hals … ich glaub, mein Hals ist ausgezogen.'],['G','*lacht* Durch die Nase! Der Junge trinkt durch die Nase!']],
  [['P','*keuch* Der brennt bis in die Schuhe.'],['G','Dafür ist er ja da. Wärmt auch die Füße.']]];
const DUELL_PETJA_TREFFER=[[['P','*schluck* … Geht. Geht doch.']],[['P','*kipp* Ich spür meine Zunge nicht mehr. Ist das gut?']],[['P','*schluck* Na klar. Wie Wasser. Brennendes Wasser.']]];

// ---------- Opa: Menü nach dem Hausbau ----------
wrapFn('opa',function(orig){if(!FL.haus||has('schnaps'))return orig();
  const ruf=dorfRuf(),bild=PORTRAETS.opa[FL.duellSieg?'drunk':FL.duellNied?'angry':'neutral'];
  const o=openO(`<div class="pan menu namenu duellmenu"><button class="x" title="Schließen (ESC)">${ic('close')}</button><div class="nahead"><img src="${bild}" alt="" style="image-rendering:pixelated"><div><h3>Opa Grischa</h3>
    <p class="em">Dorf-Ruf: <b>${ruf}</b> / 100${FL.duellSieg?' · 🏅 Trinkduell gewonnen':''}</p></div></div>
    <button class="mb big" data-a="duell">🥃 Trinkduell <small>Самосад, bis einer liegt</small></button><button class="mb big" data-a="reden">💬 Reden</button></div>`,'menuO');
  o.querySelector('[data-a=reden]').onclick=()=>{closeO();orig()};
  o.querySelector('[data-a=duell]').onclick=()=>{closeO();duellStart()}});

function duellStart(){
  const intro=FL.duellSieg?[['G','Revanche? *hicks* Ich hab extra den vom März aufgemacht. Der ist böser.','drunk']]
    :FL.duellNied?[['G','Na, Städter? Wieder wach? Dann setz dich. Diesmal halt ich dir die Stirn fest.','drunk']]
    :[['P','Opa … was ist das für eine Flasche?'],['G','Самосад. Selbstgebrannt. Aus Kartoffeln, Zucker und Groll.'],
      ['G','Wer im Dorf was gelten will, muss mit Grischa trinken. Wer zuerst umfällt, verliert. Wer gewinnt, ist einer von uns.'],
      ['P','Und wenn ich verliere?'],['G','Dann schläfst du unterm Tisch. Ist auch gemütlich. Frisch geteert.','drunk'],
      ['P','(Kipp ihn, wenn das Herz in der Mitte ist. Leertaste oder Klick.)']];
  say(intro,duellGame)}
const duellGame=a3Mini('duell','Trinkduell mit Opa',duellRun,()=>!!FL.duellSieg,()=>duellSieg(true));

// ---------- Das Minispiel ----------
function duellRun(){const{cv2,x}=a3Canvas(),T0=performance.now(),opaBild=DUELL_OPA;
  const st={petja:100,opa:100,shot:1,phase:'zug',tPhase:0,pos:0,phi:Math.random()*6,treffer:null,pop:[],flasche:1,wackel:0};DUELL_AKTIV=st;
  let fin=false,tAlt=0;
  const zone=()=>Math.max(.11,.19-st.shot*.01),tempo=()=>2.3+st.shot*.42,zitter=()=>.03+st.shot*.028+(1-st.petja/100)*.1;
  const sprich=l=>{if(busy)advance();say(l)},zufall=a=>a[Math.floor(Math.random()*a.length)];
  // Eingabe
  const kippen=()=>{if(fin||st.phase!=='zug')return;const a=Math.abs(st.pos),z=zone();const t=(performance.now()-T0)/1000;
    if(a<=z){const perfekt=a<=z*.4;st.petja-=perfekt?6+st.shot:8+st.shot;st.treffer=perfekt?'perfekt':'ok';st.pop.push({t,txt:perfekt?'Perfekt runter! ♥':'Runtergewürgt',c:'255,220,120'});if(Math.random()<.4)sprich(zufall(DUELL_PETJA_TREFFER))}
    else{st.petja-=20+st.shot*1.5;st.treffer='daneben';st.wackel=1;st.pop.push({t,txt:'*HUST* Verschluckt!',c:'255,120,120'});sprich(zufall(DUELL_PETJA_DANEBEN))}
    st.petja=Math.max(0,st.petja);st.flasche=Math.max(.05,st.flasche-.06);st.phase='petjaTrinkt';st.tPhase=t};
  const key=e=>{if(e.key===' '){e.preventDefault();e.stopPropagation();if(!e.repeat)kippen()}else if(e.key==='Escape'){e.stopPropagation();ende(null)}};
  addEventListener('keydown',key,true);cv2.onclick=e=>{e.stopPropagation();kippen()};
  // ---- Zeichnen ----
  function wand(t){const g=x.createLinearGradient(0,0,0,300);g.addColorStop(0,'#2a1810');g.addColorStop(1,'#4a2c1a');x.fillStyle=g;x.fillRect(-120,-120,1040,440);x.fillStyle='#24140a';x.fillRect(-120,300,1040,320);   // Wand und Boden über den Rand (Schlagseite)
    x.strokeStyle='rgba(0,0,0,.35)';x.lineWidth=2;for(let i=-2;i<16;i++){const X=i*62+((((i%7)+7)*37)%20);x.beginPath();x.moveTo(X,-120);x.lineTo(X,320);x.stroke()}
    // Fenster mit Nacht und Mond
    x.fillStyle='#14203a';x.fillRect(600,60,120,100);x.fillStyle='#e8e2c0';x.beginPath();x.arc(690,88,12,0,7);x.fill();x.fillStyle='#14203a';x.beginPath();x.arc(684,84,11,0,7);x.fill();
    x.strokeStyle='#6a4428';x.lineWidth=7;x.strokeRect(600,60,120,100);x.beginPath();x.moveTo(660,60);x.lineTo(660,160);x.moveTo(600,110);x.lineTo(720,110);x.stroke();
    // Regal mit Gläsern
    x.fillStyle='#3a2212';x.fillRect(60,120,170,8);[[80,'#9ab060'],[115,'#c8a050'],[150,'#a06040'],[190,'#8aa0b0']].forEach(([X,c])=>{x.fillStyle=c;x.globalAlpha=.8;x.fillRect(X,88,24,32);x.globalAlpha=1;x.fillStyle='#d8d0b8';x.fillRect(X-2,84,28,6)});
    // Glühbirne
    const sw=Math.sin(t*.8)*6;x.strokeStyle='#111';x.lineWidth=2;x.beginPath();x.moveTo(400,0);x.lineTo(400+sw,46);x.stroke();
    const gl=x.createRadialGradient(400+sw,54,2,400+sw,54,260);gl.addColorStop(0,'rgba(255,220,150,.55)');gl.addColorStop(1,'rgba(255,220,150,0)');x.fillStyle=gl;x.fillRect(0,0,800,400);
    x.fillStyle='#fff3c0';x.beginPath();x.arc(400+sw,54,9,0,7);x.fill()}
  function opa(t){const s=1.12,schwank=(1-st.opa/100)*.06,trink=st.phase==='opaTrinkt'?Math.sin(Math.min(1,(t-st.tPhase)/1.4)*Math.PI):0;
    const fall=st.phase==='ende'&&st.sieger==='petja'?Math.min(1,(t-st.tPhase)/1.2):0;
    x.save();x.translate(400,330+fall*260);x.rotate(Math.sin(t*1.3)*schwank-trink*.12+fall*.5);
    if(opaBild&&opaBild.complete&&opaBild.naturalWidth){const w=opaBild.naturalWidth,h=opaBild.naturalHeight,sc=s*500/h;x.imageSmoothingEnabled=false;
      x.drawImage(opaBild,-w*sc/2,-300,w*sc,h*sc);
      // Gesicht mit Mimik: Porträt aus derselben Vorlage, pixelgenau an seiner Stelle
      const m=st.phase==='ende'?(st.sieger==='opa'?'drunk':'angry'):st.treffer==='daneben'&&st.phase==='petjaTrinkt'?'drunk':st.opa<60?'drunk':'neutral';
      const pim=DUELL_PIMG.opa[m],[bx,by]=PORTRAET_BOX.opa;if(pim.complete&&pim.naturalWidth)x.drawImage(pim,-w*sc/2+bx*sc,-300+by*sc,pim.naturalWidth*sc,pim.naturalHeight*sc);x.imageSmoothingEnabled=true}
    else{x.fillStyle='#5a4a3a';x.fillRect(-90,-260,180,300)}
    // Opas Glas: steht vor ihm, beim Trinken an den Mund
    const gx=70-trink*60,gy=-20-trink*140;glas(gx,gy,.55,st.phase==='opaTrinkt'&&(t-st.tPhase)<.7?1:.15);x.restore()}
  function glas(X,Y,s,voll){x.save();x.translate(X,Y);x.scale(s,s);   // Granenyj stakan: Facettenglas
    x.fillStyle='rgba(220,235,240,.35)';x.beginPath();x.moveTo(-22,-60);x.lineTo(22,-60);x.lineTo(18,0);x.lineTo(-18,0);x.closePath();x.fill();
    if(voll>0){x.fillStyle='rgba(235,230,200,.75)';const h=56*voll;x.beginPath();x.moveTo(-18-4*voll,-h);x.lineTo(18+4*voll,-h);x.lineTo(18,0);x.lineTo(-18,0);x.fill()}
    x.strokeStyle='rgba(255,255,255,.55)';x.lineWidth=1.5;for(let i=-2;i<=2;i++){x.beginPath();x.moveTo(i*9,-60);x.lineTo(i*7.5,0);x.stroke()}
    x.strokeStyle='rgba(90,80,60,.6)';x.lineWidth=2;x.strokeRect(-22,-62,44,8);x.restore()}
  function tisch(){x.fillStyle='#6a4426';x.beginPath();x.moveTo(110,300);x.lineTo(690,300);x.lineTo(860,500);x.lineTo(-60,500);x.fill();
    x.strokeStyle='rgba(30,15,5,.5)';x.lineWidth=2;for(let i=0;i<=8;i++){x.beginPath();x.moveTo(110+i*72.5,300);x.lineTo(-60+i*115,500);x.stroke()}
    x.fillStyle='rgba(0,0,0,.25)';x.fillRect(110,300,580,6);
    x.fillStyle='rgba(80,50,20,.45)';[[260,360,30,10],[520,420,40,12],[380,330,22,7]].forEach(([X,Y,a,b])=>{x.beginPath();x.ellipse(X,Y,a,b,0,0,7);x.fill()});   // Flecken
    // Gurken auf dem Teller, Brot
    x.fillStyle='#e8e0d0';x.beginPath();x.ellipse(590,350,62,20,0,0,7);x.fill();x.fillStyle='#4a6a2a';for(let i=0;i<4;i++){x.save();x.translate(560+i*20,345);x.rotate(.3*i-.4);x.beginPath();x.ellipse(0,0,16,6,0,0,7);x.fill();x.restore()}
    x.fillStyle='#8a5a2a';x.beginPath();x.ellipse(200,370,44,18,-.15,0,7);x.fill();x.fillStyle='#c89a60';x.beginPath();x.ellipse(206,366,30,11,-.15,0,7);x.fill()}
  function flasche(){x.save();x.translate(290,330);   // Plastikflasche mit trübem Selbstgebrannten
    x.fillStyle='rgba(200,215,210,.35)';x.beginPath();x.moveTo(-26,0);x.lineTo(-26,-110);x.quadraticCurveTo(-26,-128,-10,-138);x.lineTo(-10,-158);x.lineTo(10,-158);x.lineTo(10,-138);x.quadraticCurveTo(26,-128,26,-110);x.lineTo(26,0);x.fill();
    const h=108*st.flasche;x.fillStyle='rgba(230,225,190,.7)';x.fillRect(-24,-h,48,h);
    x.fillStyle='#2a5aa0';x.fillRect(-10,-168,20,12);x.fillStyle='#f4efe0';x.fillRect(-24,-86,48,34);x.fillStyle='#2a2a6a';x.font='bold 10px Georgia';x.textAlign='center';x.fillText('САМОСАД',0,-70);x.font='8px Georgia';x.fillText('№ 3 · 72°',0,-58);x.textAlign='left';
    x.strokeStyle='rgba(255,255,255,.35)';x.lineWidth=2;x.beginPath();x.moveTo(-18,-120);x.lineTo(-18,-6);x.stroke();x.restore()}
  function hud(t){// geteilter Balken oben
    const M=400,B=230,Y=16;x.fillStyle='rgba(15,8,4,.75)';x.fillRect(M-B-70,Y-8,2*B+140,34);
    x.fillStyle='#3a2216';x.fillRect(M-B,Y,2*B,16);x.fillStyle='#e8903a';x.fillRect(M-B*st.petja/100,Y,B*st.petja/100,16);x.fillStyle='#c0392b';x.fillRect(M,Y,B*st.opa/100,16);
    x.fillStyle='#f6ead0';x.fillRect(M-1,Y-4,2,24);x.font='bold 13px Georgia';x.textAlign='right';x.fillText('PETJA',M-B-8,Y+13);x.textAlign='left';x.fillText('OPA',M+B+8,Y+13);
    x.textAlign='center';x.font='12px Georgia';x.fillStyle='#ffd27a';x.fillText(`Shot ${st.shot}`,M,Y+32);x.textAlign='left';
    // Herzschlag-Zeiger unten
    const QY=468,QB=210,z=zone();x.fillStyle='rgba(15,8,4,.8)';x.fillRect(M-QB-20,QY-22,2*QB+40,44);
    const g=x.createLinearGradient(M-QB,0,M+QB,0);g.addColorStop(0,'#8a1a1a');g.addColorStop(.5-z/2,'#c8902a');g.addColorStop(.5,'#3aa04a');g.addColorStop(.5+z/2,'#c8902a');g.addColorStop(1,'#8a1a1a');
    x.fillStyle=g;x.fillRect(M-QB,QY-8,2*QB,16);x.strokeStyle='#7ee08a';x.lineWidth=2;x.strokeRect(M-QB*z,QY-11,2*QB*z,22);
    if(st.phase==='zug'){const px=M+st.pos*QB,puls=1+.25*Math.max(0,Math.sin(t*(6+st.shot)));x.fillStyle='#ff4060';x.font=`${Math.round(22*puls)}px Georgia`;x.textAlign='center';x.fillText('♥',px,QY+8);
      x.fillStyle='#f6ead0';x.fillRect(px-1,QY-16,2,32);x.font='11px Georgia';x.fillText('Leertaste / Klick: kippen!',M,QY-28);x.textAlign='left'}
    for(const q of st.pop){const a=(t-q.t);if(a>1.3)continue;x.fillStyle=`rgba(${q.c},${1-a/1.3})`;x.font='bold 18px Georgia';x.textAlign='center';x.fillText(q.txt,M,QY-50-a*40);x.textAlign='left'}
    st.pop=st.pop.filter(q=>t-q.t<1.4)}
  function frame(){if(fin)return;const t=(performance.now()-T0)/1000,dt=Math.min(.05,t-tAlt);tAlt=t;
    // Zeiger: Sinus + zwei langsame „Herzflattern“-Wellen als Zittern
    if(st.phase==='zug'){st.phi+=dt*tempo();const zi=zitter();st.pos=Math.max(-1,Math.min(1,Math.sin(st.phi)*.95+zi*(Math.sin(t*13.7)+.6*Math.sin(t*23.1+1)+.4*Math.sin(t*5.3))));
      if(t-st.tPhase>8&&st.tPhase>0){st.pos=9;kippen();sprich([['G','Trink endlich! Der Schnaps wird nicht jünger!','angry']])}}   // zu lange gezögert = daneben
    if(st.phase==='petjaTrinkt'&&t-st.tPhase>1.2){if(st.petja<=0){verloren(t);return requestAnimationFrame(frame)}st.phase='opaTrinkt';st.tPhase=t;
      st.opa=Math.max(0,st.opa-(7+st.shot*1.8+Math.random()*4));if(st.opa>0&&Math.random()<.55)sprich(zufall(DUELL_OPA_TRINKT))}
    if(st.phase==='opaTrinkt'&&t-st.tPhase>1.6){if(st.opa<=0){gewonnen(t);return requestAnimationFrame(frame)}st.shot++;st.phase='zug';st.tPhase=t;st.treffer=null}
    if(st.phase==='ende'&&t-st.tPhase>2.2)return ende(st.sieger);
    st.wackel=Math.max(0,st.wackel-dt*1.5);
    // ---- Bild mit Schlagseite ----
    const dr=1-st.petja/100,kipp=Math.sin(t*.7)*dr*.07+(st.phase==='ende'&&st.sieger==='opa'?Math.min(1,(t-st.tPhase)/1.5)*1.3:0);
    x.setTransform(1,0,0,1,0,0);x.fillStyle='#000';x.fillRect(0,0,800,500);
    x.save();x.translate(400,250);x.rotate(kipp);x.translate(-400+Math.sin(t*40)*st.wackel*8,-250);
    wand(t);opa(t);tisch();flasche();
    // Petjas Glas: beim Trinken zur Kamera
    const p=st.phase==='petjaTrinkt'?Math.min(1,(t-st.tPhase)/.6):0,zur=Math.sin(p*Math.PI*.5)*(st.phase==='petjaTrinkt'&&t-st.tPhase>.9?1-(t-st.tPhase-.9)/.3:1);
    glas(470-zur*70,430-zur*120,1+zur*1.6,st.phase==='zug'?1:1-p);
    x.restore();
    // doppelt sehen
    if(dr>.15){x.save();x.globalAlpha=.22*dr;x.drawImage(cv2,Math.sin(t*1.3)*14*dr,Math.cos(t*.9)*4*dr);x.restore()}
    if(st.treffer==='daneben'&&st.phase==='petjaTrinkt'){x.fillStyle=`rgba(255,60,40,${.35*(1-(t-st.tPhase)/1.2)})`;x.fillRect(0,0,800,500)}
    const v=x.createRadialGradient(400,250,180,400,250,520);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,`rgba(0,0,0,${.45+dr*.4})`);x.fillStyle=v;x.fillRect(0,0,800,500);
    hud(t);requestAnimationFrame(frame)}
  function gewonnen(t){st.phase='ende';st.sieger='petja';st.tPhase=t;sprich([['G','*hicks* … Твою мать! … Der Boden … der Boden kommt hoch!','angry'],['P','*RUMMS*'],['P','(Opa liegt unterm Tisch. Ich sitze noch. Glaube ich.)']])}
  function verloren(t){st.phase='ende';st.sieger='opa';st.tPhase=t;sprich([['P','*würg* … Opa … warum dreht sich Ihr Haus?'],['G','*lacht* Städter! Weich wie Butter!','drunk']])}
  function ende(sieger){if(fin)return;fin=true;removeEventListener('keydown',key,true);DUELL_AKTIV=null;cv2.remove();if(busy)advance();
    if(sieger==='petja')duellSieg(false);
    else if(sieger==='opa'){FL.duellNied=(FL.duellNied||0)+1;say([['P','*Später. Unterm Tisch.*'],['P','(Es riecht nach Teer und Kartoffeln. Und nach Niederlage.)','pain'],
      ['G','*von oben* Morgen nochmal, Junge. Dann trink ich mit links.','drunk']])}
    else say([['G','Aufhören mittendrin? Pfff. Feigling. … Der Schnaps läuft nicht weg. Du schon.','angry']])}
  requestAnimationFrame(frame)}
const DUELL_OPA=(()=>{const im=new Image();im.src=OPA_GANZ;return im})();   // pixel/portraets/opa_drinking.png
const DUELL_PIMG={opa:Object.fromEntries(Object.entries(PORTRAETS.opa).map(([k,u])=>{const im=new Image();im.src=u;return[k,im]}))};

function duellSieg(übersprungen){const neu=!FL.duellSieg;FL.duellSieg=1;const rubel=neu?3:1;player.cash+=rubel;
  say([['G','*kriecht unterm Tisch hervor* … Junge. Du hast Grischa untern Tisch getrunken.','drunk'],['G','Das hat seit Breschnew keiner geschafft. Du bist einer von uns. Ab heute.'],
    ['G',neu?'Und hier. Dein Wetteinsatz. Drei Rubel. Gib sie nicht für Schnaps aus. Schnaps kriegst du bei mir.':'Hier, ein Rubel. Revanche ist Revanche.','drunk'],
    ['P','(Ich hab gerade das Dorf erobert. Mit der Leber.)','smirk']],()=>{toast(`+${rubel} Rubel · jetzt ${player.cash} ₽`,'done','tasche');if(neu){toast(`Dorf-Ruf +${DORF_RUF.duellSieg} · jetzt ${dorfRuf()} / 100`,'done','figuren');
      if(ehrenOk())setTimeout(()=>toast('Das Dorf will dich ehren. An Baba Jagas Tisch gibt es jetzt eine neue Wahl.','done','tipp'),900);
      else setTimeout(()=>toast(`Für „Ehrenbürger“ fehlt noch Dorf-Ruf: ${dorfRuf()} / ${EHREN_RUF}. Hilf den Leuten im Dorf.`,0,'tipp'),900)}})}

// ---------- Ende 4: Ehrenbürger ----------
ENDEN.ehren=['Ende: Ehrenbürger','Petja blieb. Nicht als Zahnrad – als einer von ihnen. Mit Urkunde.'];
// „Hierbleiben“ am Tisch läuft über die Ende-Matrix: mit hohem Dorf-Ruf wird es das Ehrenbürger-Ende
wrapFn('tisch',function(orig){const r=orig();setTimeout(()=>{const o=document.querySelector('.endwahl'),b=o&&o.querySelector('[data-e=bleib]');if(!b||b.dataset.matrix)return;b.dataset.matrix=1;
  if(endeMatrix('stay')==='ehren'){b.innerHTML='🎖 Hierbleiben – als Ehrenbürger<small>Das Dorf will dich behalten: Orden, Urkunde, Freitagsduell</small>';b.onclick=()=>{closeO();endeEhren()}}
  else b.insertAdjacentHTML('afterend',`<p class="em">🎖 Dorf-Ruf ${dorfRuf()} / ${EHREN_RUF}${dorfRuf()<EHREN_RUF?' – mit mehr Ruf würde das Dorf dich als Ehrenbürger behalten':''}</p>`)},0);return r});
function endeEhren(){const sz=(room,pos,lines)=>new Promise(r=>{enter(room,pos);setTimeout(()=>say(lines,r),900)});
  say([['P','Frau Jaga … das Dorf hat mich gefragt, ob ich bleibe.'],['J2','Das Dorf fragt nie jemanden. Was hast du angestellt?'],['P','Grischa untern Tisch getrunken.'],
    ['J2','*lacht krächzend* Dann bist du verloren. Geh. Die warten schon.']],async()=>{FL.ende=3;
    await sz('dorf',[420,470],[['G','*steht stramm, schwankt leicht* Achtung! Hiermit ernenne ich, Grischa, Gefreiter a. D., dich zum Ehrenbürger!'],
      ['G','*heftet dir einen Orden an* Почётный гражданин. Der war mal für 30 Jahre Melkbetrieb. Jetzt ist er deiner.','drunk'],['P','Ich … danke. Ehrlich.','smirk']]);
    await sz('dorfstr',[400,470],[['O','Ehrenbürger! Dann darfst du mir jetzt auch offiziell die Kohlen reintragen. Mit Orden.'],['P','Natürlich, Oma Dusja.','smirk']]);
    await sz('dorf',[420,470],[['G','Und jeden Freitag: Duell. Ehrenbürger trinken nicht weniger. Ehrenbürger trinken pünktlich.','drunk'],
      ['P','(Drüben war ich der Typ auf Wowas Sofa. Hier hab ich einen Orden. Für Saufen. Aber einen Orden.)'],['P','(Ich glaube, ich bleibe.)']]);
    fade.style.opacity=1;setTimeout(()=>{abspannEnde('ehren');fade.style.opacity=0},900)})}

(function(){const css=document.createElement('style');css.textContent=`.duellmenu{max-width:440px}.duellmenu .nahead img{width:96px;height:auto;border-radius:6px;background:#2a160c}`;document.head.appendChild(css)})();
