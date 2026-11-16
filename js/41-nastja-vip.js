// ================= Nastja: VIP-Kabine (weniger als 5 Punkte bis zur besten Beziehung) =================
// Statt des normalen Privattanzes läuft eine eigene Szene als kleiner Zustandsautomat:
//   TRANSITION_PREP  – kokette Ansage, Kabarett-Pose (vorgebeugt, Hohlkreuz)
//   OUTFIT_SWAP      – Vorhang zu (eyes_closed) → Umziehen dahinter (swap_sprite) → Vorhang auf, Augen noch zu
//   VIP_REVEAL       – Augen auf (zwinkert, Braue hoch), dann die enge Sofa-Choreografie und die letzte Pointe
// Bilder: NASTJA_VIP_IMG[0] zwinkernd, [1] Augen zu (40-nastja-vip-pixel.js); vorher die normalen Tanzbilder.
const nastjaVipStufe=()=>NASTJA_MAXSCORE-relOf('Nastja')<5;

const VIP_PHASEN=[   // [Zustand, Start in s, Sprite-Schritt]
  ['TRANSITION_PREP',0,null],
  ['OUTFIT_SWAP',5.2,'eyes_closed'],
  ['OUTFIT_SWAP',6.1,'swap_sprite'],
  ['VIP_REVEAL',9.4,'eyes_open'],
  ['SOFA',11.2,'eyes_open'],
  ['ENDE',25,null]];
const VIP_TEXT={   // Zeile beim Betreten eines Schritts (auf Englisch/Russisch über lang/src/*/41.txt)
  0.9:[['NA','Mach es dir bequem, Süßer … gleich wird es hier drin deutlich wärmer.']],
  5.4:[['NA','*zieht den Vorhang zu* Augen zu, Zwiebel. … Meine sind auch zu. Das ist nur gerecht.']],
  7.6:[['P','*hört Strapse schnalzen* … *SCHLUCK*']],
  9.5:[['NA','*öffnet ein Auge, zieht die Braue hoch* Na? Das hier hat Zinaida verboten. Herzinfarkte sind schlecht fürs Geschäft.']],
  14.6:[['P','Ich … äh … meine Hände sind auf dem Sofa. Beide. Glaub ich.']],
  18.2:[['NA','*haucht* Ganz ruhig atmen, Süßer. Wenn du jetzt umkippst, tanz ich trotzdem zu Ende. Und morgen erzähl ich allen, du hättest gebettelt.']]};

async function nastjaVip(){const VON=cur||'buehne',VPOS=cur?[P.x,P.y]:[260,486];changing=true;fade.style.opacity=1;await new Promise(r=>setTimeout(r,450));S0=SCN.lounge;s=S0.seed;
  if(!cache.lounge){S0.paint();const k=document.createElement('canvas');k.width=W;k.height=H;k.getContext('2d').drawImage(cv,0,0);cache.lounge=k}
  const cv3=document.createElement('canvas');cv3.id='cut';cv3.width=W;cv3.height=H;cv3.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:15';$('#game').appendChild(cv3);fade.style.opacity=0;
  const x=cv3.getContext('2d'),T0=performance.now(),said=new Set();let fin=false,zustand='',schritt=null;
  const ease=(a,b,p)=>a+(b-a)*(p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2),seg=(t,a,b)=>Math.max(0,Math.min(1,(t-a)/(b-a)));
  const glow=(X,Y,r,c,a)=>{const g=x.createRadialGradient(X,Y,0,X,Y,r);g.addColorStop(0,`rgba(${c},${a})`);g.addColorStop(1,`rgba(${c},0)`);x.fillStyle=g;x.fillRect(X-r,Y-r,r*2,r*2)};
  // Samtvorhang: zwei Hälften schließen sich über ihr (k = 0 offen … 1 zu)
  function vorhang(k){if(k<=0)return;const halb=Math.max(0,k)*410;
    [[0,1],[800,-1]].forEach(([X0,d])=>{const w=halb;x.save();x.translate(X0,0);x.scale(d,1);
      const g=x.createLinearGradient(0,0,46,0);g.addColorStop(0,'#5a0a14');g.addColorStop(.5,'#a3182a');g.addColorStop(1,'#5a0a14');
      x.fillStyle=g;for(let F=0;F<w;F+=46){x.save();x.translate(F,0);x.fillRect(0,0,Math.min(46,w-F),500);x.restore()}
      x.fillStyle='#d8b050';for(let F=0;F<w;F+=8)x.fillRect(F,486+(F/8%2)*4,5,14-(F/8%2)*4);   // Goldfransen
      x.fillStyle='rgba(0,0,0,.35)';x.fillRect(w-6,0,6,500);x.restore()})}
  function frame(){if(fin)return;const t=(performance.now()-T0)/1000;
    // ---- Zustand bestimmen (Phasen-Tabelle), Text beim Eintritt ----
    let i=VIP_PHASEN.length-1;while(i>0&&t<VIP_PHASEN[i][1])i--;zustand=VIP_PHASEN[i][0];schritt=VIP_PHASEN[i][2];
    for(const k in VIP_TEXT)if(t>=+k&&!said.has(k)){said.add(k);if(busy)advance();say(VIP_TEXT[k])}
    if(zustand==='ENDE'){fin=true;return ende()}
    x.setTransform(1,0,0,1,0,0);x.filter='blur('+(1.5*SC)+'px)';
    x.save();x.translate(W/2,H/2);x.scale(1.5,1.5);x.translate(-W/2,-H*.45);x.drawImage(cache.lounge,0,0);x.restore();x.filter='none';
    x.setTransform(SC,0,0,SC,0,0);
    let px=400,py=520,sc=1.5,rot=0,bild=null,sit=false,vk=0,blitz=0;
    if(zustand==='TRANSITION_PREP'){px=ease(-60,400,seg(t,0,2.2));
      if(t<2.2)bild=nastjaTanzBild('tanz1');
      else{const u=t-2.2;bild=nastjaTanzBild('tanz8');rot=Math.sin(u*3.2)*.06;py=520-Math.abs(Math.sin(u*3.2))*8;px=400+Math.sin(u*1.6)*16}}   // vorgebeugt, Hohlkreuz, Hüfte
    else if(zustand==='OUTFIT_SWAP'){
      // eyes_closed: Vorhang schließt (5,2–6,1) · swap_sprite: dahinter umziehen, Vorhang geht 7,8–8,9 wieder auf – Augen bleiben zu
      vk=t<6.1?ease(0,1,seg(t,5.2,6.1)):t<7.8?1:ease(1,0,seg(t,7.8,8.9));
      bild=schritt==='eyes_closed'?nastjaTanzBild('tanz8'):NASTJA_VIP_IMG[1];
      if(schritt==='swap_sprite'){const u=t-6.1;rot=Math.sin(u*1.4)*.025;py=520-Math.sin(u*1.4)*3}}
    else if(zustand==='VIP_REVEAL'){const u=t-9.4;bild=NASTJA_VIP_IMG[0];blitz=Math.max(0,1-u*2.2);sc=1.5+.06*Math.sin(Math.min(1,u*3)*Math.PI);rot=Math.sin(u*2.6)*.04}
    else if(zustand==='SOFA'){const u=t-11.2,a=seg(t,11.2,13.4),b=seg(t,16.5,18.2),sway=Math.sin(u*2.4);bild=NASTJA_VIP_IMG[0];
      // kommt ganz nah ans Sofa (Beine laufen unten aus dem Bild), sitzt auf, wippt, rückt dann noch näher
      sit=a>.85;sc=b>0?ease(2.7,3.25,b):ease(1.5,2.7,a);py=b>0?ease(800,930,b):ease(520,800,a);
      const bob=sit?Math.abs(Math.sin(u*4.2))*(11-5*b):0;py-=bob;px=400+sway*(sit?16:24);rot=sway*(sit?.035:.05)}
    if(sit){fpKnees(x);x.fillStyle='#55688f';x.beginPath();x.ellipse(400,540,150,70,0,0,7);x.fill()}
    x.save();x.translate(px,py);x.rotate(rot);x.scale(sc,sc);
    if(bild&&bild.complete&&bild.naturalWidth){const vip=bild===NASTJA_VIP_IMG[0]||bild===NASTJA_VIP_IMG[1];x.imageSmoothingEnabled=false;x.drawImage(bild,...(vip?NASTJA_VIP_G:NASTJA_TG));x.imageSmoothingEnabled=true}
    x.restore();
    if(!sit)fpKnees(x);
    vorhang(vk);
    // Rauch am Vorhangspalt beim Umziehen, Glitzer beim Enthüllen
    if(zustand==='OUTFIT_SWAP'){x.save();x.globalCompositeOperation='lighter';for(let j=0;j<7;j++){const p=((t-5.2)*.35+j/7)%1;glow(400+Math.sin(j*2.3+t)*40*p,470-p*360,40+p*50,'255,210,230',.12*(1-p)*Math.min(1,vk*2))}x.restore()}
    if(blitz>0){x.save();x.globalCompositeOperation='lighter';glow(400,280,320,'255,200,230',.5*blitz);x.restore()}
    if(zustand==='VIP_REVEAL'||zustand==='SOFA'){x.save();x.globalCompositeOperation='lighter';for(let j=0;j<9;j++){const p=((t-9.4)*.4+j/9)%1,X=400+Math.sin(j*7.1)*260,Y=440-p*380;
      x.fillStyle=`rgba(255,235,200,${.8*(1-p)})`;x.save();x.translate(X,Y);x.rotate(t*2+j);x.fillRect(-4,-.8,8,1.6);x.fillRect(-.8,-4,1.6,8);x.restore()}x.restore()}
    x.save();x.globalCompositeOperation='lighter';for(let j=0;j<4;j++){const p=(t*.25+j/4)%1;x.fillStyle=`rgba(255,180,220,${.6*(1-p)})`;x.font='22px Georgia';x.fillText('♪',120+j*170+Math.sin(t+j)*20,420-p*300)}x.restore();
    const v=x.createRadialGradient(400,250,150,400,250,520);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(20,0,10,.7)');x.fillStyle=v;x.fillRect(0,0,800,500);
    requestAnimationFrame(frame)}
  requestAnimationFrame(frame);
  async function ende(){if(busy)advance();fade.style.opacity=1;await new Promise(r=>setTimeout(r,500));changing=false;x.setTransform(1,0,0,1,0,0);x.fillStyle='rgba(12,0,6,.72)';x.fillRect(0,0,W,H);
    say([['P','*Fünf Minuten später*'],['P','(Ich glaube, ich hab vergessen, wie man atmet. Und wie ich heiße.)'],
      ['NA','*zwinkert* Das Outfit bleibt unter uns, Zwiebel. Sonst muss ich dich heiraten. Oder umbringen. Je nach Laune.']],()=>{cv3.remove();FL.lounge=1;FL.naVip=(FL.naVip||0)+1;enter(VON,VPOS)});fade.style.opacity=0}}

// Privattanz im Menü: kurz vor der besten Beziehung geht’s in die VIP-Kabine
{const nt=naTanz;naTanz=function(){if(!nastjaVipStufe())return nt.apply(this,arguments);
  say([['P','Nastja … noch ein Privattanz?'],['NA','Ein Privattanz? Für dich gibt’s heute was, das nicht mal Zinaida gesehen hat. Ab in die VIP-Kabine, Süßer.']],()=>{naPunkte('tanz',30,10);nastjaVip()})}}
// Menü-Kopf zeigt sie dann im VIP-Outfit
{const nm=nastjaMenu;nastjaMenu=function(){const r=nm.apply(this,arguments);if(nastjaVipStufe()){const im=document.querySelector('.namenu .nahead img');if(im)im.src=NASTJA_VIP_URL[0]}return r}}
