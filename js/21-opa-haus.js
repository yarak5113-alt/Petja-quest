// ================= Opas Säge & Opas Haus (Masterplan: „Kein Frust beim Haus“) =================
// Erst nach dem Banja (Madames Liste) muss Petja in den Sumpf. An der Birkensperre denkt er an Opa Grischa.
// Opa leiht ihm die rostige Säge aus dem Ofen der Ruine – aber die Birken am Sumpfweg sind SEIN Bauholz:
// Erst wird das Haus vorbereitet (Teer von Oma Dusja → Gebiss → Kater → Fisch → Angel), dann darf gesägt werden.
// Sägt Petja vorher, pfeift Opa ihn zurück („Ey, wo willst du hin?!“). Schmied Fjodor schärft die Säge auf Pump –
// diese Schuld löst Petja in Akt 3 mit dem Weihwasser ein. Das Haus besteht aus den Birkenstämmen, kein Brett.

// ----- Gegenstände: rostige Säge (Opas Säge umgefärbt) -----
(function(){
  const enc=s=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s),dec=u=>decodeURIComponent(u.slice(u.indexOf(',')+1));
  const rust={'#e8ecf0':'#d49a6a','#9aa4ae':'#a0623a','#5e6874':'#5a3018','#6a7480':'#7a4224'};
  let sv=dec(ICONS.saege);for(const[a,b]of Object.entries(rust))sv=sv.split(a).join(b);
  ICONS.rsaege=enc(sv.replace('</svg>','<g fill="#6a2c0c" opacity=".75"><circle cx="22" cy="31" r="2.4"/><circle cx="33" cy="26" r="1.8"/><circle cx="40" cy="25" r="2.6"/><circle cx="27" cy="36" r="1.4"/></g></svg>'));
  Object.assign(ITEMS,{rsaege:['','Rostige Säge','Opas Säge. Hat den Brand überlebt. Schneiden tut sie aber nur noch Grimassen.'],
    saege:['','Säge','Opas Säge, vom Schmied geschärft. Ausgeliehen. Gegen ein ganzes Haus.'],
    seil:['','Wäscheleine','Tante Galjas alte Wäscheleine. Riecht nach Kernseife. Hält bestimmt einen Fisch.']})})();
// das Brett gibt es nicht mehr – das Haus wird aus Birkenstämmen gebaut
{const b=document.getElementById('brett');if(b)b.remove();}

// ----- Birkensperre: Opas Bauholz -----
const opaRuf=()=>{if(!FL.opaRuf){FL.opaRuf=1;return say([['P','So. Dann wollen wir mal. *setzt die Säge an*'],['G','*ganz weit hinten* *PFIIIIFF* EEEY! WO WILLST DU HIN?!'],['P','…Opa? Das Dorf ist auf der anderen Seite vom Wald!'],
    ['G','Ich hör meine Säge! Die quietscht, wenn sie an fremdes Holz geht!'],['G','Das ist MEIN Bauholz! Erst bringst du mir den Teer, dann wird gesägt. Abgemacht ist abgemacht!'],['P','(Wie macht der das?)']])}
  hint('opaRuf',[[['G','*aus der Ferne* JUNGE! FINGER WEG VON MEINEN BIRKEN!']],[['G','*aus der Ferne* Ich seh dich! …Na gut, ich seh dich nicht. Aber ich WEISS es!']],
    [['P','(Keine Chance. Erst Opa den Teer bringen. Teer hat Oma Dusja auf der Dorfstraße.)']]])};
T.sHolz.fn=function(){
  if(FL.cut)return say([['P','Hier lagen mal Opas Birken. Jetzt wohnt er drin.']]);
  if(has('rsaege'))return hint('rostsaege',[[['P','*kratz* ... *kratz* ... *quietsch*'],['P','Die Säge rutscht nur drüber. Die ist so rostig, die schneidet nicht mal Butter.']],
    [['P','Mit dem Rostding wird das nix. Die muss jemand schärfen.'],['P','(Wer schärft hier Werkzeug? Jemand mit Feuer und Amboss …)']],
    [['P','Ein Schmied! Auf der Dorfstraße zeigt doch ein Schild zum Schmiedehof.']]]);
  if(has('saege')&&!FL.deal)return opaRuf();
  if(has('saege'))return sawAndBuild();
  if(!FL.clubQ)return say([['P','Umgestürzte Birken. Tonnenweise. Da komm ich nicht durch.'],['P','Muss ich aber auch gerade nicht. Glaub ich.']]);
  this.i=(this.i||0)+1;say(this.i%2?[['P','Da komm ich weder drüber noch drunter. Ich brauch eine Säge.'],['P','Mhh … vielleicht hat Opa eine Säge. Der hat sein Haus ja mal selbst gebaut.']]
    :[['P','Opa Grischa im Dorf. Wer sein Haus selbst abbrennt, hat es vorher auch selbst gebaut. Der hat bestimmt Werkzeug.']])};
// Sägen → Stämme ins Dorf → Hausbau-Minispiel (Stämme setzen, schälen, Fugen teeren) → Opas neues Haus
function sawAndBuild(){say([['P','So. Mit Opas Segen. *säg* ... *säg* ... *keuch* ... *säg*'],['P','Geschafft. Der Weg zum Sumpf ist frei.'],['P','Und jetzt … die Stämme zu Opa. Alle. Mein Rücken weiß es schon.']],async()=>{
  fade.style.opacity=1;await new Promise(r=>setTimeout(r,900));
  FL.cut=1;delete cache.sperre;T.sHolz.n='Holzreste';const h=$('[data-id=sHolz]');if(h)h.style.display='none';renderInv();
  say([['P','*schlepp* … *schlepp* … *schlepp* …']],()=>{enter('dorf',[420,480]);
    setTimeout(()=>say([['G','Na endlich! Die Stämme sind da. Jetzt wird gebaut, wie früher:'],['G','Stamm auf Stamm. Dann die Rinde runter, sonst frisst der Käfer das Haus. Und zum Schluss Teer in die Fugen.']],hausGame),1100)})})}
function hausWin(){FL.haus=1;delete cache.dorf;say([['P','*Zwei Tage später*']],()=>{enter('dorf',[420,480]);
  setTimeout(()=>say([['G','Na bitte. Ein Haus! Aus echten Birkenstämmen! Und der Ofen war ja schon da.'],['P','Mein Rücken ist jetzt auch abgebrannt.'],
    ['G','Die Säge behältst du. Hast sie dir verdient. Und jetzt ab in deinen Sumpf, der Weg ist ja frei.']]),1100)})}

// ----- Minispiel: eine Hauswand von der Seite, in drei Phasen -----
// 1) Stämme setzen: Der Stamm schwingt am Seil, Klick lässt ihn fallen – er muss auf die Wand treffen.
// 2) Schälen: Mit dem Zugmesser (gedrückt halten und ziehen) die Rinde von allen Stämmen ziehen.
// 3) Teeren: Mit dem Pinsel (gedrückt halten) den Teer in die Fugen zwischen den Stämmen streichen.
function hausRun(){if($('#fg'))return;const{cv2,x,P,pos}=a3Canvas();cv2.style.cursor='none';cv2._st=()=>   // Zustand für automatische Tests
    ({phase,placed,miss,drop:!!drop,bark:pct(bark),seam:pct(seam),down,sx:CX+Math.sin((performance.now()-T0)/1000*(1.3+placed*.22))*230});
  const N=6,LH=34,X0=210,X1=590,BASE=440,SEG=48,CX=(X0+X1)/2;
  let fin=false,phase=0,placed=0,miss=0,drop=null,down=false,msg='Klick, wenn der Stamm genau über der Wand hängt!',sub='',chips=[],T0=performance.now(),last={x:0,y:0},flash=0;
  const bark=[...Array(N)].map(()=>Array(SEG).fill(1)),seam=[...Array(N-1)].map(()=>Array(SEG).fill(0));
  const rowY=i=>BASE-(i+1)*LH,seamY=i=>BASE-(i+1)*LH;                 // Oberkante von Stamm i = Fuge zwischen Stamm i und i+1
  const segAt=X=>Math.floor((X-X0)/(X1-X0)*SEG);
  // Hintergrund: Abendhimmel, Wiese, Opas Ofen mit Schornstein
  const BG=document.createElement('canvas');BG.width=800;BG.height=500;{const t=BG.getContext('2d');
    let g=t.createLinearGradient(0,0,0,440);g.addColorStop(0,'#7aa4c8');g.addColorStop(.7,'#d8c8a0');g.addColorStop(1,'#e8c890');t.fillStyle=g;t.fillRect(0,0,800,440);
    for(let i=0;i<14;i++){t.fillStyle=`rgba(255,255,255,${.15+Math.random()*.2})`;t.beginPath();t.ellipse(Math.random()*800,40+Math.random()*120,40+Math.random()*60,8+Math.random()*8,0,0,7);t.fill()}
    t.fillStyle='#4a6a3a';for(let X=0;X<800;X+=16){t.beginPath();t.moveTo(X,300);t.lineTo(X+8,262+Math.random()*24);t.lineTo(X+16,300);t.fill()}t.fillRect(0,298,800,142);
    g=t.createLinearGradient(0,430,0,500);g.addColorStop(0,'#6a5a3a');g.addColorStop(1,'#3a2e1e');t.fillStyle=g;t.fillRect(0,430,800,70);
    for(let i=0;i<300;i++){t.strokeStyle=`rgba(${60+Math.random()*60},${100+Math.random()*60},40,.8)`;const X=Math.random()*800;t.beginPath();t.moveTo(X,440);t.lineTo(X+(Math.random()-.5)*6,428-Math.random()*14);t.stroke()}
    // Ofen (Kalkputz, verrußt) und Schornstein, steht hinter der Wand
    g=t.createLinearGradient(430,0,560,0);g.addColorStop(0,'#e0dace');g.addColorStop(1,'#9a958a');t.fillStyle=g;t.fillRect(430,300,130,140);t.fillRect(482,120,40,180);
    g=t.createLinearGradient(0,120,0,440);g.addColorStop(0,'rgba(20,16,12,.75)');g.addColorStop(.5,'rgba(20,16,12,.2)');g.addColorStop(1,'rgba(20,16,12,0)');t.fillStyle=g;t.fillRect(430,120,130,320);
    t.fillStyle='#1a120c';t.beginPath();t.moveTo(470,440);t.lineTo(470,400);t.quadraticCurveTo(495,380,520,400);t.lineTo(520,440);t.fill();t.strokeStyle='rgba(40,30,20,.6)';t.strokeRect(430,300,130,140);t.strokeRect(482,120,40,180)}
  // ein Stamm (liegend), mit Rinde oder geschält; Enden ragen über die Ecken hinaus (Blockbau)
  function log(X0_,X1_,Y,b,alpha=1){x.save();x.globalAlpha=alpha;const h=LH-2,y=Y+1,r=h/2;
    for(let s=0;s<SEG;s++){const a=X0_+(X1_-X0_)*s/SEG,w=(X1_-X0_)/SEG+.6,g=x.createLinearGradient(0,y,0,y+h);
      if(b?b[s]:1){g.addColorStop(0,'#8a7a66');g.addColorStop(.35,'#e8e2d4');g.addColorStop(.7,'#c8c0b0');g.addColorStop(1,'#5a5248')}
      else{g.addColorStop(0,'#b88a52');g.addColorStop(.35,'#f0d29a');g.addColorStop(.75,'#d4a868');g.addColorStop(1,'#7a5228')}
      x.fillStyle=g;x.fillRect(a,y,w,h);if(b?b[s]:1){x.fillStyle='#2a2420';if((s*7)%5<2)x.fillRect(a+2,y+6+(s*13)%14,w*.6,2.4)}else{x.strokeStyle='rgba(120,80,30,.35)';x.beginPath();x.moveTo(a,y+h*.3+(s%3));x.lineTo(a+w,y+h*.3+(s%3));x.stroke()}}
    for(const E of[X0_,X1_]){x.fillStyle='#d8b47a';x.beginPath();x.ellipse(E,y+r,7,r,0,0,7);x.fill();x.strokeStyle='#8a6034';x.lineWidth=1;x.stroke();x.beginPath();x.ellipse(E,y+r,3.5,r*.55,0,0,7);x.stroke()}
    x.restore()}
  const tool=(T)=>{x.save();x.translate(P.x,P.y);
    if(phase==1){x.rotate(-.05);x.fillStyle='#c8ccd2';x.beginPath();x.moveTo(-34,-2);x.lineTo(34,-2);x.lineTo(30,6);x.lineTo(-30,6);x.fill();x.strokeStyle='#3a3e44';x.stroke();
      x.fillStyle='#7a4a22';x.fillRect(-46,-16,10,26);x.fillRect(36,-16,10,26);x.fillStyle='#fff';x.fillRect(-30,-1,60,1.4)}
    else if(phase==2){x.rotate(.5);x.fillStyle='#7a4a22';x.fillRect(-3,-46,6,34);x.fillStyle='#9aa0a8';x.fillRect(-6,-14,12,6);x.fillStyle='#1a1410';x.beginPath();x.moveTo(-7,-8);x.lineTo(7,-8);x.lineTo(5,6);x.lineTo(0,10);x.lineTo(-5,6);x.fill()}
    else{x.strokeStyle='#fff';x.lineWidth=2;x.beginPath();x.moveTo(-8,0);x.lineTo(8,0);x.moveTo(0,-8);x.lineTo(0,8);x.stroke()}x.restore()};
  const pct=a=>Math.round(100*a.flat().reduce((s,v)=>s+v,0)/a.flat().length);
  function frame(){if(fin)return;const now=performance.now(),T=(now-T0)/1000,dt=Math.min(.06,(now-(frame.l||now))/1000);frame.l=now;x.drawImage(BG,0,0);
    // fertige Fugen (Teer) und Stämme
    for(let i=0;i<placed;i++)log(X0,X1,rowY(i),bark[i]);
    for(let i=0;i<Math.max(0,placed-1);i++){const Y=seamY(i);for(let s=0;s<SEG;s++){const a=X0+(X1-X0)*s/SEG,w=(X1-X0)/SEG+.6;
      if(seam[i][s]){x.fillStyle='#14100c';x.fillRect(a,Y-3,w,6);x.fillStyle='rgba(255,255,255,.25)';x.fillRect(a,Y-2,w,1.2)}else if(phase==2){x.fillStyle='rgba(120,150,60,.55)';x.fillRect(a,Y-2,w,4)}}}
    // Stapel links: was noch übrig ist
    for(let i=0;i<N-placed-(drop?1:0)-(phase==0&&placed<N?1:0);i++){x.fillStyle='#d8b47a';x.beginPath();x.ellipse(70+(i%3)*28,450-Math.floor(i/3)*26-(i%3==1?6:0),13,13,0,0,7);x.fill();x.strokeStyle='#8a6034';x.stroke()}
    if(phase==0&&placed<N){const sp=1.3+placed*.22,sx=CX+Math.sin(T*sp)*230,ty=rowY(placed);
      if(!drop){x.strokeStyle='#5a4a32';x.lineWidth=2;x.beginPath();x.moveTo(sx-60,0);x.lineTo(sx,70);x.lineTo(sx+60,0);x.stroke();x.lineWidth=1;log(sx-(X1-X0)/2,sx+(X1-X0)/2,70,null);
        x.setLineDash([6,5]);x.strokeStyle=`rgba(255,240,200,${.5+.3*Math.sin(T*4)})`;x.lineWidth=2;x.strokeRect(X0-10,ty-2,X1-X0+20,LH+4);x.setLineDash([]);x.lineWidth=1}
      else{drop.vy+=2600*dt;drop.y+=drop.vy*dt;if(drop.ok&&drop.y>=ty){placed++;drop=null;for(let k=0;k<12;k++)chips.push({x:X0+Math.random()*(X1-X0),y:ty+LH,vx:(Math.random()-.5)*3,vy:-Math.random()*3,l:1,c:'#c8b48a'});
          if(placed>=N){phase=1;msg='Schälen: Maus gedrückt halten und das Zugmesser über die Stämme ziehen.'}else msg=['Sitzt!','Wie angegossen!','Opa nickt.','Gerade wie ein Lineal. Fast.','Noch einer!'][placed%5]}
        else if(!drop.ok&&drop.y>BASE+40){drop=null;msg=['Daneben! Nochmal.','Der rollt weg … Nochmal!','Opa: „Mit Gefühl, Junge!“'][miss%3]}
        else log(drop.x-(X1-X0)/2,drop.x+(X1-X0)/2,drop.y,null,drop.ok?1:.8)}}
    if(phase==1)sub='Rinde ab: '+(100-pct(bark))+' %';if(phase==2)sub='Fugen geteert: '+pct(seam)+' %';if(phase==0)sub='Stämme: '+placed+' / '+N;
    chips=chips.filter(c=>(c.l-=.025)>0);chips.forEach(c=>{c.vy+=.25;c.x+=c.vx;c.y+=c.vy;x.fillStyle=c.c;x.globalAlpha=c.l;x.fillRect(c.x,c.y,4,2.4);x.globalAlpha=1});
    x.fillStyle='rgba(10,6,2,.82)';x.fillRect(0,0,800,60);x.fillStyle='#ffd25a';x.font='bold 18px Georgia';x.textAlign='center';x.fillText(msg,400,28);x.fillStyle='#f6e8c4';x.font='italic 14px Georgia';x.fillText(['Phase 1 von 3 – Stämme setzen','Phase 2 von 3 – Schälen','Phase 3 von 3 – Fugen teeren','Geschafft'][phase]+'   ·   '+sub,400,50);
    x.fillStyle='rgba(10,6,2,.7)';x.fillRect(700,470,100,30);x.fillStyle='#f6e8c4';x.font='bold 13px Georgia';x.fillText('Später',750,490);
    if(flash>0){x.fillStyle=`rgba(255,240,180,${flash*.35})`;x.fillRect(0,0,800,500);flash-=.04}
    tool(T);requestAnimationFrame(frame)}
  function work(){const dx=Math.abs(P.x-last.x)+Math.abs(P.y-last.y);last={x:P.x,y:P.y};if(!down||dx<1)return;
    if(phase==1){const i=Math.floor((BASE-P.y)/LH);if(i<0||i>=N)return;const s0=segAt(P.x-30),s1=segAt(P.x+30);let hit=0;
      for(let s=Math.max(0,s0);s<=Math.min(SEG-1,s1);s++)if(bark[i][s]){bark[i][s]=0;hit=1}
      if(hit)for(let k=0;k<2;k++)chips.push({x:P.x,y:P.y,vx:(Math.random()-.5)*4,vy:-1-Math.random()*2,l:1,c:Math.random()<.5?'#e8e2d4':'#3a3028'});
      if(pct(bark)<=4){bark.forEach(r=>r.fill(0));phase=2;flash=1;msg='Teeren: Mit dem Pinsel den Teer in die Fugen streichen.'}}
    else if(phase==2){for(let i=0;i<N-1;i++){if(Math.abs(P.y-seamY(i))>11)continue;const s0=segAt(P.x-16),s1=segAt(P.x+16);for(let s=Math.max(0,s0);s<=Math.min(SEG-1,s1);s++)seam[i][s]=1}
      if(pct(seam)>=95){seam.forEach(r=>r.fill(1));flash=1;msg='Fertig! Ein echtes Blockhaus.';setTimeout(()=>end(1),900);phase=3}}}
  function press(){if(P.x>700&&P.y>470)return end(0);down=true;last={x:P.x,y:P.y};
    if(phase==0&&placed<N&&!drop){const T=(performance.now()-T0)/1000,sx=CX+Math.sin(T*(1.3+placed*.22))*230,ok=Math.abs(sx-CX)<34;drop={x:ok?CX:sx,y:70,vy:0,ok};if(!ok)miss++}}
  cv2.onmousedown=e=>{e.stopPropagation();pos(e.clientX,e.clientY);press()};cv2.onmousemove=e=>{pos(e.clientX,e.clientY);work()};const mu=()=>{down=false};addEventListener('mouseup',mu);
  cv2.ontouchstart=e=>{e.preventDefault();pos(e.touches[0].clientX,e.touches[0].clientY);press()};cv2.ontouchmove=e=>{e.preventDefault();pos(e.touches[0].clientX,e.touches[0].clientY);work()};cv2.ontouchend=()=>{down=false};cv2.onclick=e=>e.stopPropagation();
  const esc=e=>{if(e.key=='Escape')end(0)};addEventListener('keydown',esc);
  function end(win){if(fin)return;fin=true;cv2.remove();removeEventListener('keydown',esc);removeEventListener('mouseup',mu);
    if(win)hausWin();else say([['G','Pause? Na gut. Die Stämme laufen nicht weg. Sag Bescheid, wenn du weitermachen willst.']])}
  requestAnimationFrame(frame)}
const hausGame=a3Mini('hausbau','Opas Haus bauen',hausRun,()=>!!FL.haus,()=>hausWin());

// ----- Opa Grischa: Säge gegen Hausbau -----
wrapFn('opa',function(orig){
  if(has('schnaps')||(FL.bjNo&&!FL.leiter))return orig();   // die Leiter-Sache geht vor
  if(FL.sawQ&&!FL.deal&&has('teer'))return say([['P','Opa! Birkenteer. Von der Dusja. Gegen Rheuma, Läuse und Männer.'],['G','Ha! Teer! Jetzt verfault mir das Holz nicht, bevor’s ein Haus wird.'],
    ['G','*schmiert die Ofenecke ein* So. Der Platz ist vorbereitet. Jetzt darfst du meine Birken sägen.'],['G','Säg sie klein und schlepp die Stämme her. Dann bauen wir. Und der Weg zu deinem Sumpf ist auch gleich frei.']],
    ()=>{FL.deal=1;inv.splice(inv.indexOf('teer'),1);renderInv()});
  if(!FL.sawQ&&FL.clubQ&&seen.sperre&&!FL.cut)return say([['P','Opa, haben Sie zufällig eine Säge? Am Sumpfweg liegen Birken quer.'],
    ['G','Eine Säge? Hab ich. Lag im Ofen. Der Ofen hat das Feuer überlebt, die Säge auch. Halbwegs.'],['G','*kramt in der Asche* Da. Ein bisschen rostig. Rost ist nur Patina, sagt mein Schwager.'],
    ['G','Aber Moment. Die Birken am Sumpfweg? Die hat der Sturm MIR hingelegt. Das ist mein Bauholz für ein neues Haus!'],
    ['P','Und wenn ich die für Sie säge? Dann ist mein Weg frei und Sie haben Ihr Holz.'],['G','Abgemacht! Aber erst wird hier alles vorbereitet. Ohne Teer verfault das Holz, bevor’s ein Haus wird.'],
    ['G','Teer hat die Dusja auf der Dorfstraße. Erst den Teer, DANN die Birken. Und wehe, du sägst vorher. Ich hör meine Säge. Auf zwei Kilometer.'],['P','*bekommt eine rostige Säge*']],
    ()=>{FL.sawQ=1;FL.auftrag=1;inv.push('rsaege');renderInv()});
  if(FL.sawQ&&!FL.haus){
    if(has('rsaege'))return say([['P','Opa, die Säge schneidet nicht. Die ist komplett verrostet.'],['G','Patina, Junge! …Na gut. Rost.'],['G','Geh zum Fjodor in den Schmiedehof. Die Dorfstraße runter. Der schleift alles. Sogar Schwiegermütter.']]);
    if(!FL.deal)return hint('opaTeer',[[['G','Erst den Teer, dann die Birken. Ohne Teer kein Haus.']],[['G','Die Dusja hat Birkenteer. Rückt aber nix raus, ohne vorher zu jammern. Hör ihr halt zu.']],
      [['G','Die Dusja jammert über ihr Gebiss. Seit Wochen. Hilf ihr, dann kriegst du den Teer.']]]);
    if(FL.cut)return say([['G','Die Stämme liegen bereit. Ärmel hoch, Junge!']],hausGame);
    return say([['G','Der Teer ist drauf. Jetzt die Birken! Säg sie klein und bring mir die Stämme.']])}
  if(FL.haus)return hint('opaNeu',[[['G','Ein Haus! Mit Ofen! Der Ofen war ja schon da, aber jetzt hat er wieder was zu tun.']],
    [['G','Diesmal pass ich auf. Kein Samowar mehr im Bett.'],['P','Und der Selbstgebrannte?'],['G','Der bleibt. Man muss ja nicht übertreiben.']],
    [['G','Wenn du mal ein Dach überm Kopf brauchst, Junge: Klopf an. Aber nicht zu fest. Ist frisch geteert.']]]);
  return orig()});
wrapFn('ruine',function(orig){if(FL.haus)return say([['P','Opas neues Haus. Krumm, aber es steht. Und ich hab’s gebaut. Halb. Ein Viertel.'],['G','Und es riecht nach Teer! Wie ein richtiges Zuhause.']]);
  if(FL.sawQ)return say([['P','Hier soll also das neue Haus hin. Der Ofen steht schon. Der Rest liegt am Sumpfweg.']]);return orig()});
if(T.ruine)Object.defineProperty(T.ruine,'n',{get:()=>FL.haus?'Opas neues Haus':'Opas abgebranntes Haus',configurable:true});

// ----- Wäscheleine bei Tante Galja: die Schnur für die Angel -----
wrapFn('waesche',function(orig){
  if(!FL.leine&&!has('seil')&&!has('angel')&&!FL.fisch&&!FL.kater)return say([['P','Eine Wäscheleine. Lang, dünn, reißfest. Perfekte Angelschnur.'],['P','*knotet die Leine ab* … Die Unterhose lass ich hängen. Aus Respekt.'],
    ['O','*von drüben* Nimm ruhig, Junge! Die Galja hat mir meine Leine auch nie zurückgegeben!']],()=>{FL.leine=1;inv.push('seil');renderInv()});
  if(FL.leine)return say([['P','Die Wäsche liegt jetzt im Gras. Galja wird sich freuen.']]);
  return orig()});

// ----- Schmied Fjodor: schärft die Säge auf Pump; in Akt 3 wird die Schuld fällig -----
wrapFn('schmied',function(orig){
  if(has('rsaege'))return say([['P','Guten Tag. Könnten Sie mir die Säge schärfen? Die ist von Opa Grischa.'],['SM','Vom Grischa? Der hat damit sein Haus … nein, das war der Samowar.'],
    ['SM','*dreht die Säge* Rost bis auf die Knochen. Gib her.'],['SM','*schleif* … *funk* … *schleif* … *ZING*'],['SM','So. Die schneidet jetzt sogar Ausreden.'],
    ['P','Was bin ich Ihnen schuldig?'],['SM','Hast du Geld?'],['P','Nein.'],['SM','Dann schreib ich’s an. Ich vergess nix, Junge. Irgendwann brauch ich was von dir. Und dann kommst du.']],
    ()=>{inv.splice(inv.indexOf('rsaege'),1);inv.push('saege');FL.schuld=1;renderInv()});
  if(FL.schuld&&FL.recipe&&!FL.glut&&!has('weihwasser'))return FL.glutQ?say([['SM','Weihwasser, Junge. Dann sind wir quitt. Vorher gibt’s keine Glut.']]):say([['P','Ich bräuchte Glut. Glut, die nicht ausgeht.'],['SM','Ah, mein Schuldner! Weißt du noch? Die Säge. Angeschrieben.'],
    ['SM','Jetzt ist es so weit. Meine Esse brennt seit 1993 ungeweiht. Der Pope sollte sie segnen. Dann ist er „in die Stadt“.'],['SM','Bring mir Weihwasser. Dann sind wir quitt. Und du kriegst Glut, die nicht ausgeht, obendrauf.'],
    ['P','Weihwasser. Von einem Popen, der seit dreißig Jahren in der Stadt ist. Klar.']],()=>{FL.glutQ=1});
  if(FL.schuld&&!FL.recipe)return say([['SM','Die Säge schneidet? Gut. Und vergiss nicht: Du stehst bei mir in der Kreide.']]);
  return orig()});

// ----- alte Spielstände -----
function opaMigrate(){
  if((FL.boot||(FL.cut&&!FL.sawQ))&&!FL.haus){FL.sawQ=1;FL.deal=1;FL.haus=1;FL.cut=1;delete cache.dorf}   // Säge noch vom Fischer bekommen bzw. schon gesägt
  ['holz','brett'].forEach(i=>{const k=inv.indexOf(i);if(k>=0)inv.splice(k,1)});
  if(FL.sawQ&&!FL.deal&&!FL.cut&&FL.teer&&!has('teer')&&!FL.haus)inv.push('teer');     // Zwischenstand 1.71: Teer zurückgeben
  {const b=document.getElementById('brett');if(b)b.remove()}renderInv()}
const _loadOpa=loadState;loadState=function(d){_loadOpa(d);opaMigrate()};
