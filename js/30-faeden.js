// ================= Erzählfäden: Wowa-Echo, Kettenkommentar, der Wels, Spuren der blauen Pilze, Krähe & Nastja =================
// Nichts davon wird erklärt. Die Welt zeigt nur kleine Spuren: Wer genau hinsieht, merkt, dass hier alle an denselben blauen Pilzen hängen.

// ---------- 1. Wowa-Echo: ein einziger Satz aus der echten Welt, gedehnt über das ganze Spiel ----------
// „Bru…“ (Ende Akt 1) → „…der?“ (Ende Akt 2) → „…BRUDER?!“ (alles beisammen, kurz vor dem Finale). Das Intro endet mit genau diesem Ruf.
function wowaEcho(n,lines){for(let i=1;i<=n;i++)FL['echo'+i]=1;changing=true;
  const cv=document.createElement('canvas');cv.id='cut';cv.width=W;cv.height=H;cv.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:15;pointer-events:none;opacity:0;transition:opacity .7s';$('#game').appendChild(cv);
  const x=cv.getContext('2d'),A=aptPaint();x.filter=`blur(${7*SC}px) saturate(.6)`;x.drawImage(A,-W*.04,-H*.04,W*1.08,H*1.08);x.filter='none';
  x.fillStyle='rgba(0,0,0,.25)';x.fillRect(0,0,W,H);const v=x.createRadialGradient(W/2,H/2,H*.2,W/2,H/2,W*.65);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.9)');x.fillStyle=v;x.fillRect(0,0,W,H);
  if(typeof sfx=='function')try{sfx('click')}catch(e){}
  requestAnimationFrame(()=>cv.style.opacity=n==3?.7:n==2?.55:.4);
  setTimeout(()=>{changing=false;say(lines,()=>{cv.style.opacity=0;setTimeout(()=>cv.remove(),700)})},900)}
const ECHO=[
  [1,id=>id==='huette'&&FL.bjInfo,[['WO','*von ganz weit weg* …Bru…'],['P','Wowa?'],['P','…'],['P','(Ich hab Wowa gehört. Hier. Im Märchen. Das ist entweder ein gutes Zeichen. Oder ein sehr schlechtes.)']]],
  [2,id=>id==='huette'&&FL.recipe,[['WO','*näher* …der? …'],['P','(Schon wieder. Lauter diesmal.)'],['P','(Ob er merkt, dass ich weg bin? …Wahrscheinlich nicht. Ist auch egal.)'],['P','(…Ist es.)']]],
  [3,id=>id==='innen'&&['filter','spore','glut','traene'].every(i=>inv.includes(i)),[['WO','*ganz nah, als stünde er im Raum* …BRUDER?!'],['P','(Gleich, Wowa. Gleich.)']]]];
const _enterF=enter;enter=function(id,pos){
  if(id==='fischer'&&FL.leiter&&!FL.welsPainted){FL.welsPainted=1;delete cache.fischer}   // Trophäe an der Hütte erst malen, wenn sie da ist
  _enterF(id,pos);welsVis();
  const e=ECHO.slice().reverse().find(([n,ok])=>!FL['echo'+n]&&ok(id));if(!e)return;
  const go=()=>{if(cur!==id)return;if(busy||ovl||changing||$('#fg')||$('#cut'))return setTimeout(go,400);wowaEcho(e[0],e[2])};setTimeout(go,900)};

// ---------- 2. Der eine Kettenkommentar: beim ersten Auswerfen der Angel ----------
wrapFn('see',function(orig){if(!(has('angel')&&!FL.fisch&&!FL.kater)||FL.kette)return orig();FL.kette=1;
  const L=['Für einen Kater.','Damit er Omas Gebiss rausrückt.','Damit Oma mir Teer gibt.'];
  if(FL.sawQ)L.push('Damit Opa mich seine Birken sägen lässt.','Damit ich in den Sumpf komm.');
  if(FL.clubQ)L.push('Damit Madame eine Neue kriegt.','Damit der Müller sein „Mehl“ rausrückt.');
  if(FL.labQ)L.push('Damit die Gnome mich in ihre Höhle lassen.','Damit die Hexe mir hilft.');
  const end=FL.labQ?[['P','Damit ich nach Hause komm. Auf mein Sofa. Wo ich nichts tue.'],['P','…Na super.']]:[['P','Und wofür ich Teer brauch? Keine Ahnung. Aber im Märchen braucht man irgendwann alles.']];
  say([['P','Mal kurz zusammenfassen.'],['P','Ich angle. '+L.join(' ')],...end],()=>orig())});

// ---------- 3. Der Wels: Kusmitsch hat ihn doch gekriegt. Jetzt hängt er an der Hütte. Er ist kein normaler Fisch. ----------
// Gemalt an die Hüttenwand rechts vom Fenster: am Schwanz an einem Nagel, Kopf nach unten, Barteln, Brustflossen mit Fingern und Schwimmhäuten,
// eine billige Armbanduhr an der Flosse, blaue Krümel im Bart. Erklärt wird nichts.
function paintWels(){const x=lay(),X=236,T=226;x.save();
  shadowAt(x,X+5,T+50,22,.35);x.strokeStyle='#3a2a1a';x.lineWidth=1.2;x.beginPath();x.moveTo(X,T-6);x.lineTo(X-4,T+8);x.moveTo(X,T-6);x.lineTo(X+4,T+8);x.stroke();
  ell(x,X,T-7,2,2,[120,120,120]);ell(x,X-.5,T-7.5,.8,.8,[220,220,220]);
  const tail=new Path2D(`M${X-11},${T+4}L${X},${T+16}L${X+11},${T+4}L${X+6},${T+20}L${X-6},${T+20}Z`);x.fillStyle='#3e3a24';x.fill(tail);
  const body=new Path2D(`M${X-6},${T+18}C${X-12},${T+40} ${X-14},${T+64} ${X-12},${T+84}C${X-10},${T+92} ${X+10},${T+92} ${X+12},${T+84}C${X+14},${T+64} ${X+12},${T+40} ${X+6},${T+18}Z`);
  const g=x.createLinearGradient(X-14,0,X+14,0);g.addColorStop(0,'#2a2a18');g.addColorStop(.35,'#5a5636');g.addColorStop(.6,'#8a8460');g.addColorStop(1,'#26261a');x.fillStyle=g;x.fill(body);
  x.save();x.clip(body);for(let i=0;i<70;i++)ell(x,X-13+R()*26,T+18+R()*72,.6+R()*1.6,.5+R()*1.2,R()<.6?[30,30,18]:[150,146,110],.45);
  x.fillStyle='rgba(255,255,230,.18)';x.fillRect(X-6,T+20,3,66);x.restore();
  // Kopf: breites Maul, kleine Augen
  ell(x,X,T+88,13,6,[60,56,36]);x.strokeStyle='#14140c';x.lineWidth=1.4;x.beginPath();x.moveTo(X-11,T+90);x.quadraticCurveTo(X,T+95,X+11,T+90);x.stroke();
  ell(x,X-7,T+82,1.4,1.4,[230,220,150]);ell(x,X+7,T+82,1.4,1.4,[230,220,150]);ell(x,X-7,T+82,.6,.6,[10,10,10]);ell(x,X+7,T+82,.6,.6,[10,10,10]);
  // Barteln (Schnurrbart) mit blauen Krümeln
  x.strokeStyle='#2a2618';x.lineWidth=1.3;[[-10,-26,30],[10,26,30],[-6,-12,40],[6,12,40]].forEach(([s0,dx,dy])=>{x.beginPath();x.moveTo(X+s0,T+90);x.quadraticCurveTo(X+s0+dx*.4,T+90+dy*.6,X+s0+dx,T+90+dy*.9);x.stroke()});
  for(let i=0;i<9;i++){const bx=X-14+R()*28,by=T+94+R()*20;ell(x,bx,by,.9,.9,[80,150,255]);dab(x,bx,by,3,[90,170,255],.35)}
  // Brustflossen: vier Finger mit Schwimmhäuten
  [[-1,X-11],[1,X+11]].forEach(([d,fx])=>{const fy=T+68,tips=[];for(let k=0;k<4;k++){const an=-.45+k*.36;tips.push([fx+d*Math.cos(an)*17,fy+6+Math.sin(an)*17])}
    x.fillStyle='rgba(176,166,124,.85)';x.beginPath();x.moveTo(fx,fy);tips.forEach(([tx,ty])=>x.lineTo(tx,ty));x.lineTo(fx,fy+9);x.fill();
    x.strokeStyle='rgba(90,84,54,.9)';x.lineWidth=.6;x.beginPath();for(let k=0;k<3;k++){const[a1,b1]=tips[k],[a2,b2]=tips[k+1];x.moveTo(a1,b1);x.quadraticCurveTo((a1+a2)/2-d*3,(b1+b2)/2,a2,b2)}x.stroke();
    tips.forEach(([tx,ty])=>{x.strokeStyle='#4a4630';x.lineWidth=2.2;x.beginPath();x.moveTo(fx,fy+4);x.lineTo(tx,ty);x.stroke();x.strokeStyle='#8a8460';x.lineWidth=1;x.beginPath();x.moveTo(fx,fy+3.4);x.lineTo(tx,ty-.6);x.stroke();ell(x,tx,ty,1.6,1.6,[186,176,136])})});
  // Armbanduhr an der linken Flosse
  x.fillStyle='#3a2a18';x.fillRect(X-17,T+72,6,3.4);x.fillStyle='#d8b048';x.fillRect(X-16,T+70.4,4.2,6.4);x.fillStyle='#f4ecd0';x.fillRect(X-15.4,T+71.2,3,4.8);x.fillStyle='#222';x.fillRect(X-14,T+72,.5,2);
  x.restore();put(x)}
{const pf=SCN.fischer.paint;SCN.fischer.paint=function(){pf.apply(this,arguments);if(FL.leiter)paintWels()}}
{const NS='http://www.w3.org/2000/svg',g=document.createElementNS(NS,'g'),p=document.createElementNS(NS,'path');g.setAttribute('class','interactive painted');g.dataset.id='welsT';
  p.setAttribute('class','hit');p.setAttribute('d','M214,214L258,214L258,334L214,334Z');g.appendChild(p);document.getElementById('r-fischer').appendChild(g)}
function welsVis(){const e=document.querySelector('[data-id="welsT"]');if(e)e.style.display=FL.leiter?'':'none'}welsVis();
T.welsT={n:'Der Wels',at:[236,380],l:[
  [['P','Der Wels. Kusmitsch hat ihn doch noch gekriegt. Respekt.'],['P','…Der hat Finger. Vier Stück. Mit Schwimmhäuten dazwischen.'],['P','Und eine Armbanduhr. „Slawa“. Geht sogar noch.'],
   ['P','Und im Bart hängen blaue Krümel.'],['P','…Ich hab nichts gesehen. Ich bin nur ein Typ, der nach Hause will.']],
  [['P','Die Uhr tickt. Der Fisch nicht. Ich geh jetzt.']],
  [['P','Komische Augen hat der. Irgendwo hab ich so welche schon mal … Nein. Hab ich nicht.']]],after(){FL.welsSeen=1}};
wrapFn('fischer',function(orig){if(!FL.leiter||FL.welsTalk||(FL.ks&&!FL.fisch&&!FL.kater))return orig();FL.welsTalk=1;
  say([['F','Hast du ihn gesehen?! An der Wand! DER WELS! Dreißig Jahre!'],['F','Hat gekämpft wie ein Mensch. Hat sogar geflucht, glaub ich.'],['P','(Fische fluchen nicht.)'],
    ['F','Und meinen Selbstgebrannten hat er mir in der Zeit auch geklaut, der Mistkerl. Muss er gewesen sein.'],['P','…Bestimmt.']],()=>orig())});

// ---------- 4. Spuren der blauen Pilze: überall eine Kleinigkeit, nie eine Erklärung ----------
T.saecke.l.push([['P','Auf einem Sack ein Stempel. Ein kleiner Pilz. Blau.'],['P','Für eine Mühle ein seltsames Logo. Geht mich nichts an.']]);
T.bar.l.push([['P','Hinter der Theke eine Blechdose. „Gewürz“, steht drauf. Drin: blaue Krümel.'],['Z','Finger weg, Süßer. Das ist für Stammgäste.']]);
T.omahaus.l.push([['P','Am Fenster trocknen Kräuter. Kamille, Minze … und was Blaues.'],['O','*von drüben* Daf ift für meinen Rücken! Fon feit fünfzig Jahren!'],['P','(Kräuter von Oma. Nein. Nein, nein. …Nein.)']]);
T.kistenH.l=[[['P','Kisten voller leerer Wodkaflaschen. Das Banja hat einen guten Monat.'],['P','Oder einen schlechten. Kommt drauf an, wen man fragt.']],
  [['P','Die unterste Kiste ist anders. Blauer Staub in den Ritzen. Und ein Stempel drauf: ein kleiner Pilz.'],['P','Den hab ich schon mal gesehen. …Wo eigentlich?']]];
{const u=NYMPHS.find(n=>n.id==='ustinja');if(u)u.l.push([['ustinja','Bei Vollmond trocknen wir der Alten die blauen Schwämme. Auf den warmen Steinen.'],['P','Welcher Alten?'],
  ['ustinja','Der mit den Hühnerbeinen. Dafür lässt sie uns in Ruhe. Und schickt ab und zu einen Langen wie dich vorbei.'],['P','(Ich bin nicht „geschickt“ worden. …Oder?)']])}
ITEMS.mehl[2]='Riecht nicht nach Mehl. Riecht nach Ärger. Auf dem Stempel: ein kleiner blauer Pilz.';
// Banja-Hinterhof: Stempel und blauer Staub an der untersten Kiste (gemalt)
{const pb=SCN.banjaH.paint;SCN.banjaH.paint=function(){pb.apply(this,arguments);const x=lay();
  for(let i=0;i<40;i++)dab(x,182+R()*44,378+R()*6,2+R()*2.4,[80,150,255],.35);for(let i=0;i<30;i++)ell(x,184+R()*40,370+R()*14,.5,.5,[120,180,255],.8);
  x.strokeStyle='rgba(40,70,140,.8)';x.lineWidth=1.2;x.beginPath();x.arc(203,366,6,0,7);x.stroke();x.fillStyle='rgba(40,70,140,.8)';x.beginPath();x.ellipse(203,364.5,3.6,2.2,0,Math.PI,0);x.fill();x.fillRect(202.3,364.5,1.4,3.6);put(x)}}

// ---------- 5. Abschlüsse: die Krähe hat wirklich gepetzt, Nastja verzeiht (fast) ----------
wrapFn('baba',function(orig){if(!FL.kraehe||FL.petzt||!FL.drin)return orig();FL.petzt=1;
  say([['J2','Die Krähe war hier. Hat gepetzt. Du hast sie mit einem APFEL beworfen?'],['P','Sie saß auf meinem Ast.'],['J2','*kichert* Gut. Die nervt mich seit hundert Jahren. Und jetzt red.']],()=>orig())});
{const nf=T.nastja2.fn;T.nastja2.fn=function(){if(!FL.traene)return nf.apply(this,arguments);FL.naV=(FL.naV||0)+1;
  if(FL.naV==1)return nf.apply(this,arguments);
  if(FL.naV==2)return say([['NA','…Weißt du was, Zwiebel? Dreihundert Jahre hab ich nichts gefühlt. Gar nichts.'],['NA','Und dann heul ich. Wegen dir. Wegen einer Gnomzwiebel.'],
    ['NA','Das war das Ehrlichste, was mir seit dem Sumpf passiert ist. …Jetzt raus.'],['P','(Ich glaub, das war ein Danke.)']]);
  say([['NA','Raus, Zwiebel. *lächelt fast*']])}}

// ----- Am Tisch, bevor der Ausweg-Joint gedreht wird: Baba Jagas Geschäft + Einsamkeit, Petjas Entscheidung (einmalig) -----
wrapFn('tisch',orig=>{if(FL.ende||!FL.recipe||!hasAll()||FL.tischRede)return orig();
  say([['J2','Setz dich. Nicht auf den Stuhl links, der beißt. Den anderen.'],
    ['P','Bevor wir anfangen. Die blauen Pilze. Der Stempel auf den Säcken. Der Staub hinterm Banja. Das sind Ihre, oder?'],
    ['J2','Bürschchen. Ich bin dreihundert Jahre alt und wohne auf Hühnerbeinen. Glaubst du, so ein Haus füttert sich von allein?'],
    ['J2','Die Gnome züchten, die Nymphen trocknen, das Dorf guckt weg. Jeder verdient ein bisschen. Das nennt man Märchenwirtschaft.'],
    ['P','Und Wowas Joint?'],['J2','Streuverlust. Kommt in den besten Familien vor.'],
    ['J2','*schiebt ihm einen Becher hin* Tee. Ist nichts drin. Diesmal.'],
    ['J2','Die meisten, die an diesem Tisch sitzen, liegen hinterher im Ofen. Du bist der Erste seit Jahrzehnten, der zurückredet.'],
    ['J2','Du könntest auch bleiben. Die Gnome brauchen einen Langen. Die Oma braucht jemanden fürs Gebiss. Und ich … hätte wen zum Anmeckern.'],
    ['P','Da drüben vermisst mich keiner. Wowa merkt erst, dass ich weg bin, wenn ihm das Feuerzeug fehlt.'],
    ['J2','Na also.'],
    ['P','Aber hier hängt alles an allem. Säge gegen Teer, Teer gegen Gebiss, Gebiss gegen Fisch. Wenn ich bleibe, bin ich nur noch ein Zahnrad.'],
    ['P','Drüben bin ich auch nichts Besonderes. Aber da bin ich wenigstens mein eigenes Problem.'],
    ['J2','… Dummkopf. *trinkt seinen Tee aus* Na gut. Dreh deinen Joint.'],
    ['J2','Und falls du drüben mal einen blauen Stempel siehst: Du warst nie hier.']],()=>{FL.tischRede=1;orig()})});
