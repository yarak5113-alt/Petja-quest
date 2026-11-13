// ================= Ende Akt 2: Blaue Pilze aus der Höhle → Baba Jaga (Zwischensequenz aus Petjas Sicht) =================
// In der Höhle wachsen links große blaue Traumschwämme. Petja bringt sie Baba Jaga. Dann sieht man durch Petjas Augen:
// Sie stapft schimpfend hin und her, kommt ganz nah ans Gesicht, fuchtelt mit den Händen – und nennt das Rezept für den Ausweg-Joint.

ICONS.blaupilze=ICONS.pilze;
ITEMS.blaupilze=['','Frische Traumschwämme','Große blaue Pilze aus der Höhle der Gnome. Sie leuchten in der Tasche. Das ist bestimmt normal.'];

// ----- Höhle: blaue Traumschwämme links -----
{const hp=SCN.hoehle.paint;SCN.hoehle.paint=function(){hp.apply(this,arguments);const x=lay();
  [[150,452,13],[172,444,10],[196,454,15],[218,446,9],[136,440,8],[232,456,11],[186,432,7]].forEach(([X,Y,r])=>{
    x.save();x.globalCompositeOperation='lighter';dab(x,X,Y-r,r*3.2,[60,110,255],.32);x.restore();
    const sg=x.createLinearGradient(X-r*.3,0,X+r*.3,0);sg.addColorStop(0,'#c8d8ff');sg.addColorStop(1,'#6a80c0');x.fillStyle=sg;x.fillRect(X-r*.22,Y-r*1.1,r*.44,r*1.1);
    const g=x.createRadialGradient(X-r*.35,Y-r*1.45,1,X,Y-r*1.1,r*1.2);g.addColorStop(0,'#a8c8ff');g.addColorStop(.45,'#2a5ae0');g.addColorStop(1,'#0a1a6a');x.fillStyle=g;
    x.beginPath();x.ellipse(X,Y-r*1.1,r,r*.62,0,Math.PI,0);x.closePath();x.fill();x.fillStyle='rgba(10,20,80,.6)';x.fillRect(X-r,Y-r*1.12,r*2,r*.12);
    x.fillStyle='rgba(220,240,255,.85)';[[-.4,-1.45],[.25,-1.55],[.55,-1.3]].forEach(([a,b])=>{x.beginPath();x.arc(X+a*r,Y+b*r,r*.1,0,7);x.fill()})});put(x)}}
{const h=document.querySelector('#r-hoehle [data-id="lpilze"] .hit');if(h)h.setAttribute('d','M40,380L250,380L250,462L40,462Z')}
T.lpilze.n='Leuchtpilze';
wrapFn('lpilze',function(orig){
  if(FL.bjInfo&&!FL.recipe&&!has('blaupilze'))return say([['P','Da! Große blaue Pilze. Die gleiche Farbe wie die Stückchen aus dem Joint.']],()=>{
    // unsichtbarer Platzhalter an den gemalten Pilzen, damit Petja sich bückt und zugreift (grab entfernt ihn danach)
    const r=document.createElementNS('http://www.w3.org/2000/svg','rect');r.id='blauPilzG';Object.entries({x:180,y:430,width:20,height:16,fill:'none'}).forEach(([k,v])=>r.setAttribute(k,v));$('#r-hoehle').appendChild(r);
    grab('blauPilzG','blaupilze',()=>{inv.push('blaupilze');renderInv();say([['P','Sie leuchten. In meiner Hand. Na super.'],['P','Ab damit zu Baba Jaga.']])},{kind:'boden'})});
  if(has('blaupilze'))return say([['P','Ich hab genug. Mehr leuchtende Pilze in der Tasche will ich nicht erklären müssen.']]);
  return orig()});

// ----- Zwischensequenz -----
function bjRezept(){if($('#fg')||$('#cut'))return;changing=true;fade.style.opacity=1;
  setTimeout(()=>{const cv=document.createElement('canvas');cv.id='cut';cv.width=800;cv.height=500;cv.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:15';$('#game').appendChild(cv);
    const x=cv.getContext('2d'),bg=document.createElement('canvas'),img=new Image();bg.width=800;bg.height=500;bg.getContext('2d').drawImage($('#bg'),0,0,800,500);img.src=$('#bjimg').getAttribute('href')||'';
    let phase='pace',T0=performance.now(),tc=0,fin=false,puffs=[];
    const B=[-72,-250,136,256];           // Sprite-Box der Hexe
    const hand=(X,Y,s,a,flip)=>{x.save();x.translate(X,Y);x.rotate(a);x.scale(flip?-s:s,s);x.lineJoin='round';
      // Ärmel (zerfranstes Rot), Handfläche, vier knochige Finger mit Krallen, Daumen – grün wie ihr Gesicht
      x.fillStyle='#6a1c1c';x.strokeStyle='#1e0c06';x.lineWidth=3;x.beginPath();x.moveTo(-44,40);x.lineTo(-40,96);x.lineTo(-20,88);x.lineTo(0,100);x.lineTo(20,88);x.lineTo(44,98);x.lineTo(46,40);x.closePath();x.fill();x.stroke();
      const sk=x.createLinearGradient(-40,-40,40,40);sk.addColorStop(0,'#c4d68a');sk.addColorStop(.6,'#98b060');sk.addColorStop(1,'#6a8240');
      [[-27,-.42,50],[-9,-.14,60],[9,.14,58],[26,.42,48]].forEach(([fx,fa,L])=>{x.save();x.translate(fx,-18);x.rotate(fa);
        x.fillStyle=sk;x.beginPath();x.moveTo(-7,0);x.quadraticCurveTo(-8,-L*.6,-4.5,-L);x.lineTo(4.5,-L);x.quadraticCurveTo(8,-L*.6,7,0);x.closePath();x.fill();x.stroke();
        x.strokeStyle='rgba(40,50,20,.6)';x.lineWidth=1.6;[-.38,-.7].forEach(k=>{x.beginPath();x.moveTo(-5,L*k);x.quadraticCurveTo(0,L*k+3,5,L*k);x.stroke()});
        x.fillStyle='#2a2418';x.beginPath();x.moveTo(-4.5,-L+1);x.quadraticCurveTo(0,-L-16,6,-L-20);x.quadraticCurveTo(3,-L-6,4.5,-L+1);x.closePath();x.fill();x.strokeStyle='#1e0c06';x.lineWidth=3;x.restore()});
      x.save();x.translate(-36,18);x.rotate(-1.05);x.fillStyle=sk;x.beginPath();x.moveTo(-7,0);x.quadraticCurveTo(-8,-26,-4,-38);x.lineTo(4,-38);x.quadraticCurveTo(8,-26,7,0);x.closePath();x.fill();x.stroke();
        x.fillStyle='#2a2418';x.beginPath();x.moveTo(-4,-37);x.quadraticCurveTo(0,-50,5,-52);x.quadraticCurveTo(3,-42,4,-37);x.fill();x.restore();
      x.fillStyle=sk;x.beginPath();x.moveTo(-38,-14);x.quadraticCurveTo(-40,30,-30,44);x.lineTo(32,44);x.quadraticCurveTo(42,20,38,-16);x.quadraticCurveTo(0,-30,-38,-14);x.closePath();x.fill();x.stroke();
      x.strokeStyle='rgba(40,50,20,.55)';x.lineWidth=2;x.beginPath();x.moveTo(-22,6);x.quadraticCurveTo(0,18,24,4);x.moveTo(-14,26);x.quadraticCurveTo(2,32,20,24);x.stroke();
      x.fillStyle='#4a5a2a';[[14,-4],[-8,16]].forEach(([wx,wy])=>{x.beginPath();x.arc(wx,wy,3.4,0,7);x.fill()});x.restore()};
    function frame(){if(fin)return;const t=(performance.now()-T0)/1000;let S,X,Y,rot=0,flip=1,shake=0;
      if(phase=='pace'){S=1.3;X=400+Math.sin(t*1.1)*220;flip=Math.cos(t*1.1)>0?-1:1;const st=Math.abs(Math.sin(t*5.5));Y=468-st*12;rot=Math.sin(t*5.5)*.05;shake=st>.97?3:0;
        if(Math.random()<.06)puffs.push({x:X+(Math.random()-.5)*40,y:Y-B[3]*S*.95,l:1,r:6})}
      else if(phase=='come'){const k=Math.min(1,(performance.now()-tc)/1600),e=k*k*(3-2*k);S=1.3+e*2.3;X=400+(Math.sin((tc-T0)/1000*1.1)*220)*(1-e);Y=468+e*(250+205*3.6-468);rot=Math.sin(t*9)*.03*e}
      else{S=3.6+Math.sin(t*3)*.06;X=400+Math.sin(t*7)*10;Y=250+205*S;rot=Math.sin(t*8)*.045;shake=Math.random()<.08?5:0}
      const cx=(Math.random()-.5)*shake,cy=Math.sin(t*2)*3+(Math.random()-.5)*shake;
      x.save();x.translate(cx,cy);if(bg){const z=phase=='pace'?1.12:1.12+Math.min(1,(performance.now()-(tc||performance.now()))/1600)*.12;x.drawImage(bg,400-400*z,250-250*z,800*z,500*z)}else{x.fillStyle='#2a1a10';x.fillRect(0,0,800,500)}
      x.fillStyle='rgba(20,8,4,.25)';x.fillRect(-10,-10,820,520);
      if(img.complete&&img.naturalWidth){x.save();x.translate(X,Y);x.rotate(rot);x.scale(S*flip,S);x.drawImage(img,B[0],B[1],B[2],B[3]);x.restore()}
      puffs=puffs.filter(p=>(p.l-=.015)>0);puffs.forEach(p=>{p.y-=.8;p.r+=.4;x.fillStyle=`rgba(230,230,230,${p.l*.5})`;x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill()});
      if(phase=='close'){const a=t*6.5;hand(120+Math.sin(a)*55,390+Math.cos(a*1.3)*55,1.3,Math.sin(a)*.5-.35,0);hand(680+Math.sin(a+2)*55,385+Math.cos(a*1.2+1)*55,1.3,-Math.sin(a+2)*.5+.35,1);
        x.strokeStyle='rgba(255,255,255,.35)';x.lineWidth=3;for(const[hx,hy]of[[120,390],[680,385]]){x.beginPath();x.arc(hx,hy,110,a%6.28,a%6.28+.8);x.stroke()}
        x.fillStyle=`rgba(160,0,0,${.08+.06*Math.sin(t*6)})`;x.fillRect(0,0,800,500)}
      x.restore();const v=x.createRadialGradient(400,250,180,400,250,520);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.75)');x.fillStyle=v;x.fillRect(0,0,800,500);
      requestAnimationFrame(frame)}
    requestAnimationFrame(frame);fade.style.opacity=0;
    say([['J2','*schnüff* … Frische blaue Traumschwämme. Und dein Joint war VOLL davon.'],['J2','*stapft hin und her* Weißt du, was das heißt, Bürschchen?! Das ist kein Trip. Das ist ein UMZUG!'],
      ['J2','So tief sitzt das. Bis in die Knochen. Bis in die Träume von deinen Träumen!'],['P','Ist das … schlecht?']],()=>{phase='come';tc=performance.now();
      setTimeout(()=>{phase='close';say([['J2','SCHLECHT?! *ganz nah* Hör mir gut zu!'],['J2','Ohne Gegengift wachst du NIE mehr auf. Nie! Dann wohnst du hier. Bei MIR. Für IMMER!'],['P','*schluck*'],
        ['J2','Ich bau dir einen Ausweg-Joint. Aber dafür brauch ich drei Dinge:'],['J2','Erstens: die Ur-Spore. Wächst nur im Pilzbeet der Gnome. Und nur, wenn du schneller bist als sie.'],
        ['J2','Zweitens: Glut, die nicht ausgeht. Die gibt’s nur aus einer geweihten Esse.'],['J2','Drittens: eine echte Träne einer wirklich schönen Nymphe. Keine gespielte. Eine ECHTE!'],
        ['J2','*drückt ihm eine Phiole in die Hand* Für die Träne. Fallen lassen ist verboten.'],['P','Und Papier? Den Filter vom alten Joint hab ich noch.'],
        ['J2','Gut. Der Filter kennt den Weg schon. Und jetzt RAUS, bevor ich’s mir anders überlege!']],()=>{
          fade.style.opacity=1;setTimeout(()=>{fin=true;cv.remove();changing=false;fade.style.opacity=0;
            FL.recipe=1;FL.a3=1;['pilze','blaupilze'].forEach(i=>{const k=inv.indexOf(i);if(k>=0)inv.splice(k,1)});inv.push('phiole');if(!inv.includes('filter'))inv.push('filter');renderInv()},500)})},1700)})},450)}
