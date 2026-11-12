// ================= Angel-Minispiel =================
function craft(){if(inv.includes('stock')&&inv.includes('seil')){['stock','seil'].forEach(i=>inv.splice(inv.indexOf(i),1));inv.push('angel');renderInv();
  setTimeout(()=>say([['P','Stock... Schnur dran... und als Haken eine Sicherheitsnadel aus meiner Hose.'],['P','Fertig ist die Angel. Wenn mein Vater mich jetzt sehen könnte... würde er sich schämen. Wie immer.']]),300)}}
function fishing(){if($('#fg'))return;const cv2=document.createElement('canvas');cv2.id='fg';cv2.width=800;cv2.height=500;cv2.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:20;cursor:none';$('#game').appendChild(cv2);
  const x=cv2.getContext('2d');let mx=400,my=250,m=[400,250],ang=Math.random()*6.28,prog=0,out=0,fin=false;const t0=performance.now();let last=t0;
  const pos=(cx,cy)=>{const r=cv2.getBoundingClientRect();mx=(cx-r.left)/r.width*800;my=(cy-r.top)/r.height*500};
  cv2.onmousemove=e=>pos(e.clientX,e.clientY);cv2.ontouchmove=e=>{e.preventDefault();pos(e.touches[0].clientX,e.touches[0].clientY)};
  cv2.onclick=e=>{e.stopPropagation();if(mx>680&&my>455)end(0)};const esc=e=>{if(e.key=='Escape')end(0)};addEventListener('keydown',esc);
  function end(win){if(fin)return;fin=true;cv2.remove();removeEventListener('keydown',esc);
    if(win){FL.fisch=1;inv.push('fisch');renderInv();say([['P','Oh. Ich hab tatsächlich einen. Einen echten Fisch. Wer hätte das gedacht.'],['F','Der ist ja winzig. Den hätt ich zurückgeworfen.'],['P','Der ist für einen Kater, nicht für Sie.']])}
    else say([['P','Weg ist er. Der Fisch hat mehr Kraft als ich.'],['F','Nochmal! Und halt dagegen, Junge! Wie beim Tanzen mit meiner ersten Frau.']])}
  function frame(){if(fin)return;const t=performance.now(),dt=Math.max(0,Math.min(.05,(t-last)/1000));last=t;const el=Math.max(0,(t-t0)/1000);
    ang+=(Math.random()-.5)*dt*6+Math.sin(el*1.3)*dt*1.5;if(Math.random()<dt*.6)ang+=Math.random()*3-1.5;
    const str=110+70*Math.sin(el*2.1)+50*Math.sin(el*5.3)+Math.min(60,el*6);
    m[0]+=((mx-m[0])*3.4+Math.cos(ang)*str)*dt;m[1]+=((my-m[1])*3.4+Math.sin(ang)*str*.75)*dt;m[0]=Math.max(10,Math.min(790,m[0]));m[1]=Math.max(10,Math.min(490,m[1]));
    const d=Math.hypot(m[0]-400,m[1]-250),ins=d<30;if(ins)prog+=dt;else prog=Math.max(0,prog-dt*.6);if(d>190)out+=dt;else out=Math.max(0,out-dt*.5);
    let g=x.createRadialGradient(400,250,20,400,250,520);g.addColorStop(0,'#3a5a62');g.addColorStop(1,'#0c1a1e');x.fillStyle=g;x.fillRect(0,0,800,500);
    for(let k=0;k<6;k++){const r=((el*30+k*60)%360);x.strokeStyle=`rgba(200,220,220,${.18*(1-r/360)})`;x.lineWidth=1;x.beginPath();x.ellipse(400,250,r,r*.45,0,0,7);x.stroke()}
    x.setLineDash([8,8]);x.strokeStyle=out>0?'rgba(255,90,60,.8)':'rgba(255,120,90,.4)';x.lineWidth=2;x.beginPath();x.arc(400,250,190,0,7);x.stroke();x.setLineDash([]);
    x.fillStyle=ins?'rgba(120,230,120,.25)':'rgba(255,255,255,.08)';x.strokeStyle=ins?'#8ef08e':'#e8e8d8';x.lineWidth=3;x.beginPath();x.arc(400,250,30,0,7);x.fill();x.stroke();
    const fx=m[0]+Math.cos(ang)*46,fy=m[1]+Math.sin(ang)*30;x.save();x.translate(fx,fy);x.rotate(ang);x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.ellipse(0,0,26,9,0,0,7);x.moveTo(-22,0);x.lineTo(-36,-9);x.lineTo(-36,9);x.fill();x.restore();
    x.strokeStyle='rgba(230,230,220,.8)';x.lineWidth=1.2;x.beginPath();x.moveTo(400,520);x.quadraticCurveTo((400+m[0])/2,(520+m[1])/2+40-Math.min(40,str/6),m[0],m[1]);x.stroke();
    x.fillStyle='#f4f0e8';x.beginPath();x.arc(m[0],m[1],9,0,Math.PI);x.fill();x.fillStyle='#d02818';x.beginPath();x.arc(m[0],m[1],9,Math.PI,0);x.fill();x.strokeStyle='#200';x.lineWidth=1.2;x.beginPath();x.arc(m[0],m[1],9,0,7);x.stroke();
    x.strokeStyle='rgba(255,255,255,.7)';x.lineWidth=1;x.beginPath();x.moveTo(mx-7,my);x.lineTo(mx+7,my);x.moveTo(mx,my-7);x.lineTo(mx,my+7);x.stroke();
    x.fillStyle='rgba(0,0,0,.55)';x.fillRect(200,14,400,26);x.fillStyle='#7ad06a';x.fillRect(204,18,392*Math.min(1,prog/22),18);x.fillStyle='#fff';x.font='bold 14px Arial';x.textAlign='center';x.fillText('Fisch: '+prog.toFixed(1)+' / 22 s',400,32);
    x.font='15px Arial';x.fillText(out>0?'Er reißt sich los! Zieh dagegen!':'Halte den Schwimmer im Kreis – der Fisch zieht dagegen!',400,474);
    x.textAlign='right';x.font='13px Arial';x.fillStyle='rgba(255,255,255,.6)';x.fillText('[Aufgeben]',790,490);
    if(prog>=22)return end(1);if(out>1.6)return end(0);requestAnimationFrame(frame)}
  requestAnimationFrame(frame)}
// ================= Ufer & Unter dem Pier =================
const LAKE2='M-10,200L830,200L830,330C700,340 560,350 420,346C300,342 160,352 -10,360Z';
function pierSide(x){const D=(X)=>330-X*.084;x.fillStyle='rgba(6,10,10,.85)';x.beginPath();x.moveTo(-10,D(-10)+10);x.lineTo(330,D(330)+10);x.lineTo(330,D(330)+40);x.lineTo(150,350);x.lineTo(-10,372);x.fill();
  for(let X=0;X<=330;X+=55){const y=D(X);wood(x,X-3,y,6,62-X*.06,1);x.fillStyle='rgba(0,0,0,.35)';x.fillRect(X-3,y,6,62-X*.06);ripple(x,X,y+58-X*.06,7)}
  x.strokeStyle='#2a2018';x.lineWidth=3;for(let X=0;X<330;X+=55){x.beginPath();x.moveTo(X,D(X)+12);x.lineTo(X+55,D(X+55)+44);x.moveTo(X,D(X)+44);x.lineTo(X+55,D(X+55)+12);x.stroke()}
  x.save();x.beginPath();x.moveTo(-10,D(-10));x.lineTo(330,D(330));x.lineTo(330,D(330)+10);x.lineTo(-10,D(-10)+10);x.closePath();x.clip();wood(x,-10,290,340,50,0);x.restore();
  x.fillStyle='#8a7c66';x.beginPath();x.moveTo(-10,D(-10)-4);x.lineTo(330,D(330)-3);x.lineTo(330,D(330));x.lineTo(-10,D(-10));x.fill();
  x.save();x.translate(330,D(330));for(let i=0;i<3;i++)ell(x,0,8+i*10,40-i*8,3,[0,0,0],.15);x.restore()}
function wreck(x,X,Y){x.save();x.translate(X,Y);x.rotate(.12);const p=new Path2D('M-60,0C-50,-22 40,-24 62,-6L56,6C20,10 -30,10 -60,0Z');x.save();x.clip(p);wood(x,-62,-26,126,36,0);x.fillStyle='rgba(20,30,30,.35)';x.fillRect(-62,-26,126,36);x.restore();
  x.strokeStyle='#120c06';x.lineWidth=1;x.stroke(p);for(let k=-40;k<50;k+=14){x.beginPath();x.moveTo(k,-16);x.lineTo(k+2,4);x.stroke()}dab(x,10,-6,10,[0,0,0],.8);x.restore();ripple(x,X,Y+8,40)}
function paintUfer(){const o=S0;sky(o);far(o);ground(o);
  let x=lay();grass(x,6000,o.hz,500,1);details(x);dirt(x,30);put(x);
  x=lay();lake(x,LAKE2,'M830,330C700,340 560,350 420,346C300,342 160,352 -10,360');put(x);
  x=lay();for(let i=0;i<24;i++)dab(x,R()*800,200+R()*60,30+R()*50,[190,196,196],.25);put(x,8,'screen',.6);
  x=lay();pierSide(x);wreck(x,600,350);deadTree(x,730,356,240,8,'#1e1a14');
  [[440,352,14,34],[500,356,12,30],[690,362,18,44],[770,364,14,40],[220,358,10,28]].forEach(a=>reeds(x,...a));rock(x,380,380,12,1);rock(x,560,420,16,1);rock(x,250,440,10,1);
  shadowAt(x,700,452,20);ell(x,700,446,18,7,[24,24,24]);ell(x,700,446,9,3.5,[60,70,60]);bucket(x,320,402);bone(x,470,460,.3,10);
  sign(x,196,400,1.2,[[-1,0,'Unter den Pier','hUP']]);sign(x,676,470,1.3,[[1,0,'Zur Gnomsiedlung','hGN']]);sign(x,110,484,1.7,[[-1,0,'Zum Fischerhaus','hFH']]);put(x);
  x=lay();reeds(x,640,500,24,80,1);reeds(x,780,500,20,90,1);grass(x,600,470,515,2.4,1);bush(x,30,500,40,1);put(x,1);rays(o,[[.4,.06]]);grade(o)}
function paintUnter(){const o=S0;let g=c.createLinearGradient(0,0,0,500);g.addColorStop(0,'#0c0a08');g.addColorStop(.4,'#1c2624');g.addColorStop(.75,'#0e1614');g.addColorStop(1,'#1a1612');c.fillStyle=g;c.fillRect(0,0,W,H);
  let x=lay();const wg=x.createLinearGradient(0,150,0,400);wg.addColorStop(0,'#5a7470');wg.addColorStop(.5,'#22363a');wg.addColorStop(1,'#0c1618');x.fillStyle=wg;x.fillRect(0,150,800,250);
  for(let i=0;i<260;i++){const Y=160+Math.pow(R(),1.3)*240,X=R()*800;x.strokeStyle=`rgba(200,220,210,${.04+R()*.12})`;x.lineWidth=.6+R()*(Y-150)/90;x.beginPath();x.moveTo(X,Y);x.lineTo(X+10+R()*40,Y);x.stroke()}
  const SL=[90,250,430,600,740];SL.forEach(X=>{for(let i=0;i<40;i++)ell(x,X+(R()-.5)*30,170+R()*220,2+R()*10,.6,[230,236,210],.15+R()*.25)});put(x);
  x=lay();for(let Y=-10;Y<130;Y+=12)for(let X=-20;X<820;X+=150){wood(x,X,Y,148,11,0)}x.fillStyle='rgba(0,0,0,.45)';x.fillRect(0,0,800,140);
  SL.forEach(X=>{x.fillStyle='rgba(255,250,220,.9)';x.fillRect(X-3,0,6,140)});
  for(let k=0;k<3;k++){const Y=40+k*44;wood(x,-10,Y,820,14,0);x.fillStyle='rgba(0,0,0,.5)';x.fillRect(-10,Y+11,820,4)}put(x);
  x=lay();x.fillStyle='rgba(255,246,210,.5)';SL.forEach(X=>{x.beginPath();x.moveTo(X-3,140);x.lineTo(X+3,140);x.lineTo(X+40,420);x.lineTo(X-20,420);x.fill()});put(x,10,'screen',.35);
  x=lay();[[150,30],[350,34],[560,32],[690,40]].forEach(([X,w])=>{wood(x,X-w/2,0,w,410,1);x.fillStyle='rgba(0,0,0,.45)';x.fillRect(X-w/2,0,w*.45,410);x.fillStyle='rgba(40,70,40,.7)';x.fillRect(X-w/2,330,w,40);ripple(x,X,404,w)});
  x.strokeStyle='#1a120a';x.lineWidth=7;[[150,350],[560,690]].forEach(([a,b])=>{x.beginPath();x.moveTo(a,150);x.lineTo(b,320);x.moveTo(a,320);x.lineTo(b,150);x.stroke()});
  for(let i=0;i<6;i++){x.strokeStyle='rgba(220,220,220,.25)';x.lineWidth=.5;const X=150+i*3,Y=150;x.beginPath();x.arc(X+16,Y,10+i*4,0,3.14);x.stroke()}put(x);
  x=lay();const bank=new Path2D('M-10,500L-10,404C120,396 260,410 400,400C540,392 680,406 810,398L810,500Z');const bg=x.createLinearGradient(0,396,0,500);bg.addColorStop(0,'#4a4232');bg.addColorStop(1,'#1e1a14');x.fillStyle=bg;x.fill(bank);
  x.save();x.clip(bank);for(let i=0;i<400;i++)ell(x,R()*800,400+R()*100,1+R()*4,.6+R()*2,mix([60,54,44],[140,130,110],R()),.8);for(let i=0;i<60;i++)dab(x,R()*800,410+R()*90,10+R()*20,[20,18,14],.4);x.restore();
  rock(x,90,440,18,1);rock(x,740,470,24,1);rock(x,260,420,10,0);ell(x,520,446,16,6,[24,24,24]);ell(x,520,446,8,3,[50,60,50]);
  x.save();x.translate(320,470);x.rotate(-.4);x.fillStyle='#2a5a3a';x.fillRect(-4,-16,8,16);x.fillRect(-2,-22,4,7);x.restore();x.fillStyle='#2a2420';x.fillRect(600,452,18,20);x.fillRect(600,468,30,8);
  grass(x,300,420,500,1.8,1);sign(x,700,486,1.6,[[1,0,'Zurück zum Ufer','hUZ']]);put(x);
  const vg=c.createRadialGradient(430,300,100,430,300,560);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.6)');c.fillStyle=vg;c.fillRect(0,0,W,H)}
// ================= Wels-Minispiel (unter dem Pier) =================
function wels(){if($('#fg'))return;const cv2=document.createElement('canvas');cv2.id='fg';cv2.width=800;cv2.height=500;cv2.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:20;cursor:crosshair';$('#game').appendChild(cv2);
  const x=cv2.getContext('2d'),T0=performance.now();let last=T0,pt=T0,fin=false,mx=400,my=250,down=false,ph=0,msg='Warte auf den Biss… Klicke erst, wenn er RICHTIG zieht!',
    nib=0,nibT=2,bite=0,miss=0,bmiss=0,ten=.45,fx=400,ftx=400,hold=0,low=0,surge=0,sta=1,ring=3,hits=0,bad=0,rs=1.2;
  const pos=(cx,cy)=>{const r=cv2.getBoundingClientRect();mx=(cx-r.left)/r.width*800;my=(cy-r.top)/r.height*500};
  cv2.onmousemove=e=>pos(e.clientX,e.clientY);cv2.onmousedown=e=>{e.preventDefault();down=true;act()};addEventListener('mouseup',onup);
  cv2.ontouchstart=e=>{e.preventDefault();pos(e.touches[0].clientX,e.touches[0].clientY);down=true;act()};cv2.ontouchmove=e=>{e.preventDefault();pos(e.touches[0].clientX,e.touches[0].clientY)};cv2.ontouchend=()=>down=false;
  cv2.onclick=e=>e.stopPropagation();const esc=e=>{if(e.key=='Escape')end(0,'Aufgegeben.')};addEventListener('keydown',esc);
  function onup(){down=false}
  function act(){if(mx>680&&my>455)return end(0,'Aufgegeben.');
    if(ph==0){if(bite>0){ph=1;pt=performance.now();msg='ANGEBISSEN! Maustaste halten = ziehen, loslassen = Schnur geben. Folge dem Wels!'}else{miss++;msg='Zu früh! Das war nur Knabbern. ('+miss+'/3)';if(miss>=3)end(0,'Zu oft zu früh gezogen. Der Wels traut den Würmern nicht mehr.')}}
    else if(ph==2){if(Math.abs(ring-1)<.16){hits++;sta-=.2;msg='Treffer! Er wird müde…';ring=3;rs=Math.min(2.4,rs+.12)}else{bad++;sta=Math.min(1,sta+.15);msg='Falscher Moment! Er holt wieder Kraft. ('+bad+'/4)';ring=3;if(bad>=4)end(0,'Der Wels hat sich mit letzter Kraft losgerissen.')}}}
  function end(win,m){if(fin)return;fin=true;cv2.remove();removeEventListener('keydown',esc);removeEventListener('mouseup',onup);
    if(win){FL.ablenk=1;say([['F','(von oben) WAS?! Es zieht! ES ZIEHT! Das ist ER! DER WELS!'],['F','Komm her, du Mistvieh! Dreißig Jahre hab ich auf dich gewartet!'],['P','Perfekt. Der ist jetzt eine Weile beschäftigt.'],['P','Und seine Flasche steht ganz allein auf dem Steg…']])}
    else say([['P',m],['P','Nochmal. Ein paar Würmer zappeln ja noch dran.']])}
  function frame(){if(fin)return;const t=performance.now(),dt=Math.max(0,Math.min(.05,(t-last)/1000));last=t;const el=(t-T0)/1000,pe=(t-pt)/1000;
    let g=x.createLinearGradient(0,0,0,500);g.addColorStop(0,'#2a4446');g.addColorStop(1,'#060e10');x.fillStyle=g;x.fillRect(0,0,800,500);
    for(let i=0;i<5;i++){x.fillStyle='rgba(255,250,220,.05)';x.beginPath();x.moveTo(80+i*170,0);x.lineTo(110+i*170,0);x.lineTo(150+i*170,500);x.lineTo(60+i*170,500);x.fill()}
    let hx=400,hy=230;
    if(ph==0){nibT-=dt;if(nibT<=0){if(Math.random()<.45)bite=.5;else nib=.4;nibT=1+Math.random()*1.5}nib=Math.max(0,nib-dt);
      if(bite>0){bite-=dt;if(bite<=0){bmiss++;msg='Verpasst! ('+bmiss+'/3)';if(bmiss>=3)return end(0,'Dreimal den Biss verpasst. Der Wels hat die Würmer abgefressen und ist weg.')}}
      hy+=bite>0?60:nib>0?Math.sin(t/40)*7:Math.sin(el*2)*3;const wx=400+Math.cos(el*.8)*160,wy=330+Math.sin(el*.8)*40;x.fillStyle='rgba(0,0,0,.4)';x.beginPath();x.ellipse(wx,wy,90,24,Math.cos(el*.8)>0?.1:-.1,0,7);x.fill();
      if(bite>0)for(let k=1;k<4;k++){x.strokeStyle='rgba(220,240,230,.4)';x.beginPath();x.ellipse(hx,hy,k*18,k*6,0,0,7);x.stroke()}}
    if(ph==1){if(Math.random()<dt*.5)ftx=120+Math.random()*560;fx+=(ftx-fx)*dt*1.2;if(surge<=0&&Math.random()<dt*.35)surge=.8;surge=Math.max(0,surge-dt);
      const f=.3+.18*Math.sin(el*1.7)+.12*Math.sin(el*4.3)+(surge>0?.5:0);ten+=((down?.62:-.5)+(f-.35)*1.3+(Math.abs(mx-fx)>90?.45:0))*dt;ten=Math.max(0,ten);
      const bc=.55+.12*Math.sin(el*.7),bw=Math.max(.12,.17-pe*.004),B0=bc-bw,B1=bc+bw;if(ten>=1)return end(0,'RISS! Zu fest gezogen – die Schnur ist gerissen.');
      if(ten<.08){low+=dt;if(low>1.5)return end(0,'Zu locker! Der Wels hat die Würmer ausgespuckt.')}else low=0;if(ten>B0&&ten<B1)hold+=dt;if(hold>=10){ph=2;msg='Er ermüdet! Klicke genau, wenn der Ring den Kreis berührt!'}
      hx=fx;hy=320+Math.sin(el*3)*14;x.fillStyle='rgba(0,0,0,.55)';x.beginPath();x.ellipse(fx,330,95,26,(ftx-fx)/900,0,7);x.fill();
      x.fillStyle='rgba(0,0,0,.6)';x.fillRect(752,80,26,340);x.fillStyle='rgba(120,220,120,.6)';x.fillRect(754,80+340*(1-B1),22,340*(B1-B0));x.fillStyle=ten>.9?'#ff4030':'#f0e0a0';x.fillRect(748,80+340*(1-Math.min(1,ten))-3,34,6);
      x.fillStyle='#fff';x.font='12px Arial';x.textAlign='center';x.fillText('Spannung',765,72);if(surge>0){x.fillStyle='#ff8060';x.font='bold 18px Arial';x.fillText('ER ZIEHT!',fx,280)}
      x.strokeStyle=Math.abs(mx-fx)>90?'rgba(255,90,60,.8)':'rgba(255,255,255,.5)';x.beginPath();x.moveTo(mx,440);x.lineTo(mx,470);x.stroke()}
    if(ph==2){if(Math.random()<dt*.6)ftx=150+Math.random()*500;fx+=(ftx-fx)*dt*1.6;hx=fx;hy=300;ring-=dt*rs;if(ring<.75){bad++;sta=Math.min(1,sta+.15);ring=3;msg='Zu spät! ('+bad+'/4)';if(bad>=4)return end(0,'Der Wels hat sich mit letzter Kraft losgerissen.')}
      x.fillStyle='rgba(0,0,0,.55)';x.beginPath();x.ellipse(fx,320,95,26,0,0,7);x.fill();x.strokeStyle='#f0e8c0';x.lineWidth=3;x.beginPath();x.arc(fx,300,34,0,7);x.stroke();x.strokeStyle='rgba(120,230,120,.9)';x.beginPath();x.arc(fx,300,34*ring,0,7);x.stroke();
      x.fillStyle='rgba(0,0,0,.6)';x.fillRect(200,52,400,14);x.fillStyle='#e06040';x.fillRect(202,54,396*Math.max(0,sta),10);x.fillStyle='#fff';x.font='12px Arial';x.textAlign='center';x.fillText('Kraft des Welses',400,80);if(sta<=0)return end(1)}
    x.strokeStyle='rgba(230,230,220,.85)';x.lineWidth=1.3;x.beginPath();x.moveTo(400,0);x.quadraticCurveTo((400+hx)/2,hy*.5+(ph==1?40-ten*40:0),hx,hy);x.stroke();
    // Haken mit zappelnden Würmern
    x.save();x.translate(hx,hy);x.scale(1.7,1.7);x.strokeStyle='#b8b8b0';x.lineWidth=1.6;x.beginPath();x.moveTo(0,0);x.lineTo(0,10);x.arc(-4,10,4,0,Math.PI*.9);x.stroke();
    x.lineCap='round';x.lineWidth=3;[[-1,1.6,'#d07a7a'],[1,2.1,'#c06868'],[0,1.3,'#e08a8a']].forEach(([d,sp,c],k)=>{const w=Math.sin(el*sp*4+k*2);x.strokeStyle=c;x.beginPath();x.moveTo(-1,6+k*2);
      x.bezierCurveTo(d*8+w*5,2+k*3,d*12-w*4,14+k*2,d*6+w*6,20+k*2);x.stroke()});x.restore();
    x.fillStyle='rgba(0,0,0,.55)';x.fillRect(150,10,500,30);const prog=ph==0?0:ph==1?hold/10*.7:.7+(1-sta)*.3;x.fillStyle='#7ad06a';x.fillRect(154,14,492*prog,22);
    x.fillStyle='#fff';x.font='bold 13px Arial';x.textAlign='center';x.fillText(['Phase 1: Anbiss','Phase 2: Kampf – '+hold.toFixed(1)+' / 10 s in der Zone','Phase 3: Auspowern'][ph],400,30);
    x.font='15px Arial';x.fillText(msg,400,474);x.textAlign='right';x.font='13px Arial';x.fillStyle='rgba(255,255,255,.6)';x.fillText('[Aufgeben]',790,494);
    requestAnimationFrame(frame)}
  requestAnimationFrame(frame)}
// ================= Baba Jagas Hütte (innen) =================
function logWall(x,x0,x1,y0,y1){for(let y=y0;y<y1;y+=26){const g=x.createLinearGradient(0,y,0,y+26);g.addColorStop(0,'#2a1c10');g.addColorStop(.25,'#7a5a36');g.addColorStop(.55,'#8a6a42');g.addColorStop(.9,'#3a2814');g.addColorStop(1,'#140c06');x.fillStyle=g;x.fillRect(x0,y,x1-x0,26);
  for(let i=0;i<(x1-x0)/6;i++){x.strokeStyle=`rgba(${R()<.5?30:150},${R()<.5?20:120},10,.25)`;x.lineWidth=.6;const X=x0+R()*(x1-x0),Y=y+4+R()*18;x.beginPath();x.moveTo(X,Y);x.lineTo(X+10+R()*40,Y+(R()-.5)*2);x.stroke()}
  for(let i=0;i<(x1-x0)/20;i++)ell(x,x0+R()*(x1-x0),y+25,3+R()*6,1.5,[60,80,30],.6)}}
function web(x,X,Y,r,a0){x.strokeStyle='rgba(220,220,220,.35)';x.lineWidth=.5;for(let k=0;k<6;k++){const a=a0+k/5*1.57;x.beginPath();x.moveTo(X,Y);x.lineTo(X+Math.cos(a)*r,Y+Math.sin(a)*r);x.stroke()}
  for(let j=1;j<5;j++){x.beginPath();for(let k=0;k<6;k++){const a=a0+k/5*1.57,rr=r*j/5;x.lineTo(X+Math.cos(a)*rr,Y+Math.sin(a)*rr+2)}x.stroke()}}
function jar(x,X,Y,h,k){ell(x,X,Y,h*.36,h*.1,[0,0,0],.4);x.fillStyle=rgba(k,.7);x.fillRect(X-h*.32,Y-h,h*.64,h);x.fillStyle='rgba(255,255,255,.25)';x.fillRect(X-h*.24,Y-h*.9,h*.08,h*.75);x.fillStyle='#5a4a3a';x.fillRect(X-h*.34,Y-h-3,h*.68,4)}
const ICOL=[[120,160,60],[160,60,50],[80,110,160],[200,170,80],[90,60,110],[60,120,90],[170,120,60]];
function bottle(x,X,Y,h,k){x.fillStyle=rgba(k,.75);x.beginPath();x.moveTo(X-h*.22,Y);x.lineTo(X-h*.22,Y-h*.55);x.quadraticCurveTo(X-h*.22,Y-h*.7,X-h*.07,Y-h*.75);x.lineTo(X-h*.07,Y-h);x.lineTo(X+h*.07,Y-h);x.lineTo(X+h*.07,Y-h*.75);x.quadraticCurveTo(X+h*.22,Y-h*.7,X+h*.22,Y-h*.55);x.lineTo(X+h*.22,Y);x.fill();
  x.fillStyle='rgba(255,255,255,.3)';x.fillRect(X-h*.15,Y-h*.6,h*.05,h*.5);x.fillStyle='#6a4a2a';x.fillRect(X-h*.08,Y-h-3,h*.16,4)}
function ipot(x,X,Y,r){shadowAt(x,X,Y+2,r*1.3,.5);const g=x.createRadialGradient(X-r*.4,Y-r*.8,1,X,Y-r*.5,r*1.2);g.addColorStop(0,'#5a5a5a');g.addColorStop(1,'#0e0e0e');x.fillStyle=g;x.beginPath();x.ellipse(X,Y-r*.55,r,r*.75,0,0,7);x.fill();ell(x,X,Y-r*1.15,r*.8,r*.22,[30,30,30]);ell(x,X,Y-r*1.12,r*.62,r*.15,[8,8,8])}
function innenWall(x){wood(x,420,70,150,6,0);wood(x,428,128,140,6,0);
  [[432,70],[452,70],[474,70],[498,70],[526,70],[552,70],[440,128],[466,128],[520,128],[548,128]].forEach(([X,Y])=>R()<.5?bottle(x,X,Y,16+R()*10,P2(ICOL)):jar(x,X,Y,12+R()*8,P2(ICOL)));skull(x,494,122,1.1);
  [[608,110],[694,110],[656,172],[742,172],[660,234],[700,234]].forEach(([X,Y])=>bottle(x,X,Y,16+R()*12,P2(ICOL)));bone(x,640,166,.1,16);
  x.save();x.translate(470,205);x.rotate(.13);wood(x,-28,-34,56,68,1);x.fillStyle='#1a1410';x.fillRect(-22,-28,44,56);x.fillStyle='#8a8a70';x.beginPath();x.ellipse(0,-6,10,13,0,0,7);x.fill();x.fillStyle='#1a1410';x.fillRect(-6,-10,4,4);x.fillRect(2,-10,4,4);x.fillRect(-4,0,8,2);x.fillStyle='#2a2a40';x.fillRect(-16,10,32,16);x.restore();
  x.save();x.translate(570,200);x.rotate(-.09);wood(x,-40,-28,80,56,0);x.fillStyle='#1c201c';x.fillRect(-35,-23,70,46);x.strokeStyle='rgba(230,230,220,.75)';x.lineWidth=1;x.beginPath();x.moveTo(-28,-14);x.lineTo(-10,-14);x.moveTo(-28,-6);x.lineTo(4,-6);x.moveTo(-28,2);x.lineTo(-14,2);
    for(let k=0;k<5;k++){const a=-1.57+k*2.51;x.lineTo(16+Math.cos(a)*12,4+Math.sin(a)*12)}x.stroke();x.fillStyle='rgba(230,230,220,.8)';x.font='7px Georgia';x.fillText('Kröte + Mond',-30,16);x.restore();
  x.strokeStyle='#4a3a2a';x.lineWidth=.8;[[246,70,'b'],[262,60,'r'],[278,78,'f'],[292,56,'b']].forEach(([X,L,t])=>{x.beginPath();x.moveTo(X,26);x.lineTo(X,26+L);x.stroke();if(t=='b')bone(x,X,30+L,1.57,10);else if(t=='r'){x.strokeStyle='#c8a050';x.lineWidth=1.6;x.beginPath();x.arc(X,32+L,6,0,7);x.stroke();x.strokeStyle='#4a3a2a';x.lineWidth=.8}else{ell(x,X,34+L,2.5,9,[20,20,24],1,.3)}});
  for(let i=0;i<9;i++)ell(x,400,34+i*7,4,3.4,[230,226,210]);x.strokeStyle='#b8a878';x.lineWidth=1.5;x.beginPath();x.moveTo(400,26);x.lineTo(400,96);x.stroke();
  for(let i=0;i<6;i++){const X=240+i*8;ell(x,X,40+i*3,3,3,[160,110,60])}
  web(x,430,26,36,0);web(x,760,26,40,1.57);web(x,232,128,26,0);web(x,600,60,24,1.57)}
function innenFloor(x){for(let i=0;i<50;i++)dab(x,70+R()*160,424+R()*26,6+R()*12,[120,116,110],.45);
  ipot(x,214,476,14);ipot(x,46,468,18);bucket(x,82,486);x.strokeStyle='#4a3218';x.lineWidth=3;x.beginPath();x.moveTo(250,300);x.lineTo(262,478);x.stroke();x.beginPath();x.moveTo(242,304);x.quadraticCurveTo(250,290,258,302);x.stroke();
  [[300,486,.4],[330,480,-.3],[200,490,.9]].forEach(([X,Y,a])=>{x.save();x.translate(X,Y);x.rotate(a);wood(x,-14,-4,28,8,0);x.restore()});
  bone(x,612,488,.5,14);bone(x,632,482,-.4,10);skull(x,716,484,1.4);for(let i=0;i<40;i++){x.strokeStyle='rgba(200,170,90,.7)';x.lineWidth=.8;const X=R()*800,Y=440+R()*55;x.beginPath();x.moveTo(X,Y);x.lineTo(X+6+R()*8,Y+(R()-.5)*3);x.stroke()}
  [[560,492],[574,486]].forEach(([X,Y])=>{x.fillStyle='#8a4a2a';x.beginPath();x.moveTo(X,Y);x.lineTo(X+8,Y-5);x.lineTo(X+12,Y+2);x.fill()});
  x.save();x.translate(110,332);for(let i=0;i<3;i++){x.save();x.rotate(-.2+i*.2);wood(x,-18,-4-i*3,36,7,0);x.restore()}x.restore();ipot(x,90,128,12);for(let i=0;i<20;i++)dab(x,70+R()*120,338+R()*4,4+R()*6,[150,146,140],.5)}
function tableClutter(x){x.save();x.translate(420,362);x.rotate(-.12);x.fillStyle='#4a1a14';x.fillRect(-18,-8,36,14);x.fillStyle='#e8dcb8';x.fillRect(-16,-6,32,3);x.restore();jar(x,486,368,14,[120,160,60]);bottle(x,508,370,16,[90,60,110]);bone(x,456,374,.2,10)}
function paintInnen(){const o=S0;c.fillStyle='#120c08';c.fillRect(0,0,W,H);
  let x=lay();logWall(x,0,800,-10,300);x.fillStyle='rgba(0,0,0,.35)';x.fillRect(0,0,800,300);
  x.save();x.beginPath();x.moveTo(300,90);x.lineTo(384,84);x.lineTo(388,170);x.lineTo(304,176);x.closePath();const wg=x.createLinearGradient(300,84,388,176);wg.addColorStop(0,'#c8a0b0');wg.addColorStop(1,'#6a4a6a');x.fillStyle=wg;x.fill();x.restore();
  x.strokeStyle='#2a1a0c';x.lineWidth=5;x.beginPath();x.moveTo(300,90);x.lineTo(384,84);x.lineTo(388,170);x.lineTo(304,176);x.closePath();x.moveTo(342,87);x.lineTo(346,173);x.moveTo(302,133);x.lineTo(386,127);x.stroke();web(x,304,92,30,0);
  const fl=new Path2D('M0,300L800,300L800,500L0,500Z');x.fillStyle='#4a3420';x.fill(fl);for(let i=-12;i<=12;i++){x.strokeStyle='rgba(20,12,6,.8)';x.lineWidth=1.2;x.beginPath();x.moveTo(400+i*18,300);x.lineTo(400+i*80,500);x.stroke()}
  for(let i=0;i<600;i++){const Y=300+R()*200;ell(x,R()*800,Y,2+R()*10*(Y-280)/200,.6,R()<.5?[90,66,40]:[30,20,12],.35)}
  for(let i=0;i<40;i++)dab(x,R()*800,320+R()*170,10+R()*24,[20,14,8],.35);
  x.fillStyle='rgba(0,0,0,.45)';x.beginPath();x.moveTo(0,0);x.lineTo(60,30);x.lineTo(60,300);x.lineTo(0,330);x.fill();x.beginPath();x.moveTo(800,0);x.lineTo(740,30);x.lineTo(740,300);x.lineTo(800,330);x.fill();
  wood(x,-10,14,820,12,0);for(let i=0;i<7;i++){const X=430+i*40+R()*10;x.strokeStyle='#5a4a2a';x.lineWidth=1;x.beginPath();x.moveTo(X,26);x.lineTo(X,40);x.stroke();for(let k=0;k<14;k++){x.strokeStyle=rgba(mix([60,80,30],[150,130,60],R()),.9);x.beginPath();x.moveTo(X,40);x.lineTo(X+(R()-.5)*14,70+R()*20);x.stroke()}}
  put(x);
  x=lay();for(let k=0;k<3;k++)wood(x,600,110+k*62,160,6,0);[[612,110],[640,110],[668,110],[700,172],[624,172],[730,234],[612,234]].forEach(([X,Y],i)=>jar(x,X,Y,20+R()*16,P2([[120,160,60],[160,60,50],[80,110,160],[200,170,80],[90,60,110]])));skull(x,736,100,1.6);skull(x,672,224,1.3);
  web(x,800,0,60,1.57);web(x,0,0,50,0);innenWall(x);
  x.fillStyle='#d8d0c0';x.fillRect(30,140,200,280);const sg=x.createLinearGradient(30,0,230,0);sg.addColorStop(0,'rgba(0,0,0,.35)');sg.addColorStop(.6,'rgba(0,0,0,0)');sg.addColorStop(1,'rgba(0,0,0,.25)');x.fillStyle=sg;x.fillRect(30,140,200,280);
  for(let i=0;i<30;i++){x.strokeStyle='rgba(90,80,70,.4)';x.lineWidth=.6;const X=30+R()*200,Y=140+R()*280;x.beginPath();x.moveTo(X,Y);x.lineTo(X+(R()-.5)*20,Y+R()*20);x.stroke()}
  x.fillStyle='#bab2a2';x.fillRect(20,128,220,14);x.fillStyle='#c8c0b0';x.fillRect(150,-10,50,140);x.fillStyle='rgba(30,20,10,.5)';x.fillRect(150,-10,50,30);
  const sog=x.createLinearGradient(0,240,0,330);sog.addColorStop(0,'rgba(20,14,10,.8)');sog.addColorStop(1,'rgba(20,14,10,0)');x.fillStyle=sog;x.fillRect(60,230,140,100);
  x.fillStyle='#0c0806';x.beginPath();x.moveTo(70,340);x.lineTo(70,280);x.quadraticCurveTo(130,236,190,280);x.lineTo(190,340);x.fill();
  x.save();x.globalCompositeOperation='lighter';for(let i=0;i<10;i++)dab(x,110+R()*40,330-R()*14,8+R()*10,R()<.5?[255,120,30]:[255,200,80],.6);dab(x,130,320,70,[255,120,40],.25);x.restore();
  ell(x,130,316,18,6,[20,20,20]);x.fillStyle='#1a1a1a';x.beginPath();x.ellipse(130,306,16,12,0,0,7);x.fill();
  x.fillStyle='#8a8070';x.fillRect(60,340,140,8);x.fillRect(20,410,220,10);woodpile(x,270,440);innenFloor(x);
  x.fillStyle='#5a2a2a';x.beginPath();x.ellipse(450,450,190,34,0,0,7);x.fill();x.strokeStyle='#c8a050';x.lineWidth=2;x.beginPath();x.ellipse(450,450,170,28,0,0,7);x.stroke();x.strokeStyle='#2a1010';x.beginPath();x.ellipse(450,450,140,22,0,0,7);x.stroke();
  shadowAt(x,450,446,140,.6);[[336,384],[564,384],[350,360],[550,360]].forEach(([X,Y],i)=>wood(x,X-5,Y,10,(i<2?62:20),1));
  x.save();x.beginPath();x.moveTo(340,352);x.lineTo(560,352);x.lineTo(588,384);x.lineTo(312,384);x.closePath();x.clip();wood(x,300,350,300,36,0);for(let X=320;X<600;X+=30){x.strokeStyle='rgba(20,10,4,.7)';x.beginPath();x.moveTo(X+20,352);x.lineTo(X,384);x.stroke()}x.restore();
  wood(x,312,384,276,10,0);x.fillStyle='rgba(0,0,0,.4)';x.fillRect(312,384,276,10);
  x.fillStyle='#6a6a66';x.beginPath();x.moveTo(520,370);x.lineTo(524,356);x.lineTo(546,356);x.lineTo(550,370);x.fill();x.strokeStyle='#4a3a2a';x.lineWidth=4;x.beginPath();x.moveTo(536,358);x.lineTo(552,334);x.stroke();
  tableClutter(x);x.fillStyle='#e8dcb0';x.fillRect(372,348,6,16);x.save();x.globalCompositeOperation='lighter';dab(x,375,342,40,[255,190,90],.4);dab(x,375,344,5,[255,240,180],.9);x.restore();
  x.strokeStyle='#5a3a1c';x.lineWidth=4;x.beginPath();x.moveTo(770,470);x.lineTo(752,250);x.stroke();for(let i=0;i<30;i++){x.strokeStyle='rgba(150,120,60,.9)';x.lineWidth=1;x.beginPath();x.moveTo(768,440);x.lineTo(760+(R()-.5)*30,490+R()*8);x.stroke()}
  x.fillStyle='rgba(240,230,210,.8)';x.save();x.translate(240,470);x.rotate(.3);x.fillRect(0,0,26,18);x.restore();put(x);
  x=lay();x.fillStyle='rgba(220,180,200,.5)';x.beginPath();x.moveTo(300,90);x.lineTo(388,84);x.lineTo(560,420);x.lineTo(420,440);x.fill();put(x,14,'screen',.25);
  const vg=c.createRadialGradient(420,330,120,420,300,560);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.65)');c.fillStyle=vg;c.fillRect(0,0,W,H);grade(o)}
const BJ=`<g stroke="#141a0c" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round">
<path d="M-50,2C-52,-40 -50,-90 -54,-130C-55,-142 -52,-152 -48,-158C-44,-162 -40,-160 -42,-154C-45,-146 -46,-136 -45,-126C-44,-90 -45,-40 -44,2Z" fill="#5a4028"/>
<path d="M-48,-130C-49,-110 -49,-80 -48,-50M-46,-40l2,3M-49,-90l-2,3" fill="none" stroke="#3a2818" stroke-width=".8"/><ellipse cx="-48" cy="-100" rx="4" ry="2.4" fill="#4a3220"/>
<path d="M-50,-158C-54,-166 -50,-174 -44,-172C-38,-170 -38,-162 -42,-158Z" fill="#6a4c30"/>
<path d="M-30,-2C-33,-6 -32,-12 -26,-14L-14,-14C-10,-10 -8,-5 -10,-2Z" fill="#c8b07a"/><path d="M-28,-10L-14,-4M-28,-4L-14,-12M-24,-13L-24,-2M-18,-13L-18,-2" fill="none" stroke="#8a7044" stroke-width=".6"/>
<path d="M2,-2C0,-6 1,-12 6,-14L18,-14C22,-10 23,-5 21,-2Z" fill="#b8a06a"/><path d="M4,-10L18,-4M4,-4L18,-12M8,-13L8,-2M14,-13L14,-2" fill="none" stroke="#7a6034" stroke-width=".6"/>
<path d="M-24,-14L-25,-42L-17,-42L-17,-14Z" fill="#b8b2a4"/><path d="M-25,-36L-17,-30M-25,-28L-17,-22M-25,-20L-17,-14M-25,-30L-17,-36M-25,-22L-17,-28" fill="none" stroke="#6a5a40" stroke-width=".6"/>
<path d="M8,-14L8,-42L16,-42L16,-14Z" fill="#a8a294"/><path d="M8,-36L16,-30M8,-28L16,-22M8,-20L16,-14M8,-30L16,-36M8,-22L16,-28" fill="none" stroke="#5a4a30" stroke-width=".6"/>
<path d="M-34,-112C-40,-90 -42,-66 -40,-40L-34,-46L-30,-36L-24,-44L-18,-34L-12,-42L-6,-32L0,-42L6,-34L12,-44L18,-36L24,-46L30,-38L32,-44C32,-66 30,-90 26,-112Z" fill="#4a3c34"/>
<path d="M14,-110C20,-90 24,-66 26,-44L30,-38L32,-44C32,-66 30,-90 26,-112Z" fill="#362a24" stroke="none"/>
<path d="M-28,-96C-30,-80 -31,-64 -30,-48M2,-100C2,-84 3,-66 4,-48M20,-98C21,-82 22,-64 22,-50" fill="none" stroke="#2a201a" stroke-width=".9"/>
<path d="M-30,-66L-20,-66L-21,-56L-31,-56Z" fill="#6a5a40" stroke-width=".9"/><path d="M-29,-64l2,1M-22,-64l-1,1M-29,-58l2,-1M-23,-58l-1,-1" fill="none" stroke="#c8b890" stroke-width=".5"/>
<path d="M-24,-108C-28,-90 -28,-70 -24,-54C-18,-50 -2,-50 8,-54C12,-72 12,-92 8,-108Z" fill="#8a8270"/>
<path d="M0,-106C4,-90 5,-70 3,-54C5,-54 7,-54 8,-54C12,-72 12,-92 8,-108Z" fill="#706a5a" stroke="none"/>
<path d="M-20,-80C-16,-76 -12,-78 -10,-82M-4,-70C0,-66 4,-68 4,-72" fill="none" stroke="#5a5444" stroke-width=".8"/><ellipse cx="-14" cy="-66" rx="4" ry="2.6" fill="#6a6250" stroke="none" opacity=".7"/>
<path d="M-26,-112C-24,-114 10,-114 12,-112L12,-106L-26,-106Z" fill="#5a4a30"/>
<path d="M-36,-150C-42,-138 -40,-120 -34,-110C-24,-104 6,-104 26,-110C32,-124 32,-144 24,-160C16,-174 4,-182 -8,-180C-20,-178 -30,-166 -36,-150Z" fill="#3a3a46"/>
<path d="M14,-172C26,-162 32,-144 30,-126C29,-118 28,-114 26,-110C20,-108 14,-108 10,-108C18,-124 22,-150 14,-172Z" fill="#2c2c36" stroke="none"/>
<path d="M-34,-112C-28,-106 -16,-104 -6,-104M26,-110C22,-106 14,-104 6,-104" fill="none" stroke="#24242c" stroke-width=".9"/>
<g fill="none" stroke="#3a3a46" stroke-width="1.6"><path d="M-34,-110l-2,6M-28,-106l-1,6M-20,-104l-1,6M-12,-104l0,6M-4,-104l0,6M4,-104l1,6M12,-105l1,6M20,-107l2,6M26,-110l2,5"/></g>
<path d="M-34,-140C-42,-130 -48,-122 -52,-118C-54,-114 -50,-110 -46,-112C-42,-116 -38,-122 -32,-128Z" fill="#3a3a46"/>
<path d="M-54,-122C-58,-118 -56,-112 -52,-110C-48,-108 -44,-110 -43,-114C-42,-118 -44,-122 -48,-124C-50,-124 -52,-124 -54,-122Z" fill="#8a9a6a"/><path d="M-53,-116C-50,-114 -47,-114 -45,-116M-52,-112C-49,-111 -47,-111 -45,-112" fill="none" stroke="#4a5a30" stroke-width=".7"/>
<path d="M14,-146C26,-150 34,-160 38,-174C40,-180 37,-184 33,-182C30,-174 26,-166 18,-160Z" fill="#3a3a46"/>
<path d="M33,-178C30,-186 32,-194 37,-198C40,-200 44,-199 46,-196C48,-193 47,-188 44,-184C42,-180 38,-178 35,-177Z" fill="#8a9a6a"/>
<path d="M38,-198C38,-204 40,-210 44,-211C47,-211 47,-208 45,-204C44,-201 43,-199 42,-197Z" fill="#8a9a6a"/>
<path d="M44,-196C46,-202 50,-208 55,-210C58,-211 59,-208 57,-206C54,-204 51,-200 48,-195" fill="#8a9a6a"/><path d="M55,-210C58,-214 61,-212 59,-208" fill="#8a9a6a" stroke-width="1"/>
<path d="M46,-192C49,-195 53,-196 55,-194C56,-192 53,-190 49,-189Z" fill="#8a9a6a"/>
<path d="M36,-190C38,-192 40,-193 42,-192M38,-184C40,-186 42,-186 44,-185M41,-204C42,-206 43,-207 44,-206" fill="none" stroke="#4a5a30" stroke-width=".7"/>
<path d="M2,-186C10,-182 16,-170 18,-156C20,-146 22,-136 24,-128C16,-130 10,-136 6,-144C0,-156 -2,-170 2,-186Z" fill="#b4b4ac"/>
<path d="M-6,-170C-10,-164 -10,-156 -8,-148L2,-150C2,-156 2,-162 0,-168Z" fill="#7a8a5a"/>
<path d="M0,-184C-4,-198 -22,-206 -34,-196C-38,-192 -38,-186 -37,-180C-44,-176 -52,-168 -56,-160C-57,-155 -54,-153 -51,-156C-48,-159 -44,-161 -40,-161C-38,-158 -38,-156 -37,-154C-35,-152 -34,-151 -36,-149C-42,-149 -47,-146 -46,-142C-45,-138 -39,-137 -32,-139C-24,-141 -14,-145 -8,-151C-2,-159 2,-172 0,-184Z" fill="#8a9a6a"/>
<path d="M-10,-196C-2,-188 0,-174 -4,-160C-6,-154 -8,-151 -10,-149C-6,-160 -4,-178 -10,-196Z" fill="#6e7e52" stroke="none"/>
<path d="M-40,-178C-46,-172 -51,-166 -53,-160C-50,-162 -46,-164 -42,-163Z" fill="#a4b482" stroke="none"/>
<path d="M-6,-172C-12,-176 -16,-170 -14,-164C-13,-160 -9,-158 -6,-160Z" fill="#7a8a5a"/><path d="M-10,-170C-12,-168 -12,-165 -10,-163" fill="none" stroke="#4a5a30" stroke-width=".7"/>
<ellipse cx="-49" cy="-163" rx="2" ry="1.7" fill="#6a7a48" stroke-width=".6"/><path d="M-49,-165l-1,-2M-48,-165l1,-2" fill="none" stroke="#4a4a40" stroke-width=".5"/>
<path d="M-40,-158C-42,-160 -44,-159 -45,-157" fill="none" stroke="#3a4a24" stroke-width=".8"/>
<path d="M-37,-153C-34,-152 -30,-152 -26,-154" fill="none" stroke-width="1.1"/><path d="M-34,-152.6L-33,-149L-31.6,-152.8Z" fill="#e8e0b0" stroke-width=".5"/>
<path d="M-26,-154C-24,-152 -22,-150 -22,-147M-30,-148C-28,-146 -24,-145 -20,-146M-42,-144C-40,-142 -37,-141 -34,-142" fill="none" stroke="#4a5a30" stroke-width=".6"/>
<path d="M-34,-182C-31,-185 -26,-185 -23,-182C-26,-179 -31,-179 -34,-182Z" fill="#f0e090" stroke-width=".8"/><circle cx="-28" cy="-182" r="1.6" fill="#1a0a04" stroke="none"/><circle cx="-28.6" cy="-182.6" r=".5" fill="#fff" stroke="none"/>
<path d="M-34.6,-182.6C-31,-185.4 -26,-185.6 -22.4,-182.8" fill="none" stroke-width="1.5"/><path d="M-34,-180C-31,-178.6 -27,-178.6 -24,-180" fill="none" stroke="#a83020" stroke-width=".7"/>
<path d="M-36,-177C-33,-175 -29,-174.6 -25,-176M-22,-180C-20,-177 -20,-174 -21,-171" fill="none" stroke="#4a5a30" stroke-width=".6"/>
<path d="M-40,-183C-39.4,-182 -38.6,-181.4 -37.6,-181.4" fill="none" stroke-width="1"/>
<path d="M-38,-188C-33,-191 -26,-191 -20,-188" fill="none" stroke="#d0d0c8" stroke-width="3"/><path d="M-36,-189L-38,-193M-30,-190L-31,-194M-24,-190L-23,-194" fill="none" stroke="#d0d0c8" stroke-width="1.4"/>
<path d="M-14,-198C-18,-190 -20,-184 -18,-176M-22,-200C-24,-196 -26,-194 -28,-194" fill="none" stroke="#4a5a30" stroke-width=".6"/>
<path d="M-34,-196C-30,-206 -16,-210 -4,-204C6,-198 8,-186 4,-176C2,-184 -2,-192 -10,-196C-18,-200 -28,-200 -34,-196Z" fill="#c4c4bc"/>
<path d="M-34,-196C-40,-192 -42,-184 -40,-176C-38,-182 -36,-188 -30,-192Z" fill="#c4c4bc"/>
<g fill="none" stroke="#d4d4cc" stroke-width="2.2"><path d="M-30,-202C-38,-204 -46,-200 -50,-190"/><path d="M-20,-206C-28,-212 -38,-212 -44,-204"/><path d="M-6,-205C0,-212 8,-212 13,-205"/><path d="M2,-198C10,-198 16,-192 18,-182"/><path d="M-40,-190C-44,-186 -46,-180 -46,-174"/></g>
<g fill="none" stroke="#8a8a84" stroke-width="1"><path d="M-26,-200C-32,-205 -40,-206 -46,-203"/><path d="M-4,-202C0,-208 4,-212 10,-214"/><path d="M4,-190C10,-186 14,-180 16,-172"/><path d="M8,-176C12,-164 16,-150 20,-136"/><path d="M4,-170C8,-158 10,-146 14,-136"/></g>
</g>`;
// ================= Tisch-Minispiel: Joint zerlegen & sortieren =================
function tableGame(){if($('#fg'))return;const cv2=document.createElement('canvas');cv2.id='fg';cv2.width=800;cv2.height=500;cv2.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:20;cursor:grab';$('#game').appendChild(cv2);
  const x=cv2.getContext('2d');let fin=false,ph=0,mx=0,my=0,drag=null,un=0,unA=false,miss=0,msg='Zieh den Filter vom Joint ab und leg ihn ins Feld „Filter“.';
  const ZP=[60,40,180,110],ZF=[560,40,180,110],BOWL=[640,380,70];let filt={x:560,y:250},paper={x:400,y:250,on:false},PT=[];
  const inR=(p,[a,b,w,h])=>p.x>a&&p.x<a+w&&p.y>b&&p.y<b+h,inB=p=>Math.hypot(p.x-BOWL[0],p.y-BOWL[1])<BOWL[2];
  function scatter(){PT=[];for(let i=0;i<34;i++){const t=i<9?2:i<15?1:0;PT.push({t,x:250+Math.random()*300,y:200+Math.random()*190,a:Math.random()*6.28,s:1.35+Math.random()*.5,inb:0})}}
  const pos=(cx,cy)=>{const r=cv2.getBoundingClientRect();mx=(cx-r.left)/r.width*800;my=(cy-r.top)/r.height*500};
  function down(){if(mx>680&&my>470)return end(0);
    if(ph==0){if(Math.hypot(mx-filt.x,my-filt.y)<26)drag=filt}else if(ph==1){if(mx<300&&Math.abs(my-250)<30)unA=true}else if(ph==2){if(Math.abs(mx-paper.x)<140&&Math.abs(my-paper.y)<34)drag=paper}
    else if(ph==3){for(let i=PT.length-1;i>=0;i--){const p=PT[i];if(!p.inb&&Math.hypot(mx-p.x,my-p.y)<10*p.s+4){drag=p;break}}}if(drag){drag.ox=drag.x-mx;drag.oy=drag.y-my}}
  function move(){if(drag){drag.x=mx+drag.ox;drag.y=my+drag.oy}if(ph==1&&unA){un=Math.max(un,Math.min(1,(mx-260)/280));if(un>=1){ph=2;unA=false;msg='Aufgerollt! Jetzt das Papier ins Feld „Papier“ legen.'}}}
  function up(){unA=false;if(!drag)return;const d=drag;drag=null;
    if(ph==0){if(inR(d,ZF)){ph=1;msg='Jetzt das Papier aufrollen: Von links nach rechts über den Joint ziehen.'}else{d.x=560;d.y=250}}
    else if(ph==2){if(inR(d,ZP)){ph=3;scatter();msg='Sortiere die blau angelaufenen Pilzstücke in die Schale. Nur die! (Fehler: 0/3)'}else{d.x=400;d.y=250}}
    else if(ph==3&&inB(d)){if(d.t==2){d.inb=1;d.x=BOWL[0]+(Math.random()-.5)*60;d.y=BOWL[1]+(Math.random()-.5)*30;if(PT.filter(p=>p.t==2&&!p.inb).length==0)return end(1)}
      else{miss++;d.x=300+Math.random()*200;d.y=220+Math.random()*150;msg=(d.t==1?'Das ist ein normaler Champignon! ':'Das ist Tabak! ')+'(Fehler: '+miss+'/3)';if(miss>=3){miss=0;scatter();msg='Die Schale ist verunreinigt! Alles nochmal sortieren. (Fehler: 0/3)'}}}}
  cv2.onmousedown=e=>{pos(e.clientX,e.clientY);down()};cv2.onmousemove=e=>{pos(e.clientX,e.clientY);move()};const mu=()=>up();addEventListener('mouseup',mu);
  cv2.ontouchstart=e=>{e.preventDefault();pos(e.touches[0].clientX,e.touches[0].clientY);down()};cv2.ontouchmove=e=>{e.preventDefault();pos(e.touches[0].clientX,e.touches[0].clientY);move()};cv2.ontouchend=()=>up();
  cv2.onclick=e=>e.stopPropagation();const esc=e=>{if(e.key=='Escape')end(0)};addEventListener('keydown',esc);
  function end(win){if(fin)return;fin=true;cv2.remove();removeEventListener('keydown',esc);removeEventListener('mouseup',mu);
    if(win){inv.splice(inv.indexOf('kippe'),1);inv.push('pilze');renderInv();FL.pilze=1;say([['P','Neun Stück. Alle blau angelaufen. Das sind keine normalen Pilze.'],['J2','Bring sie her, Bürschchen. Lass die alte Jaga mal schnüffeln.']])}
    else say([['P','Später. Meine Finger haben heute keine Lust.']])}
  const TB=document.createElement('canvas');TB.width=800;TB.height=500;{const t=TB.getContext('2d');for(let i=0;i<9;i++){const g=t.createLinearGradient(0,i*56,0,i*56+56);g.addColorStop(0,'#6a4a2a');g.addColorStop(.5,'#8a6a42');g.addColorStop(1,'#4a3018');t.fillStyle=g;t.fillRect(0,i*56,800,56);t.fillStyle='#1a0e06';t.fillRect(0,i*56+54,800,2)}
    for(let i=0;i<500;i++){t.strokeStyle=`rgba(${Math.random()<.5?30:160},${Math.random()<.5?20:120},10,.2)`;t.beginPath();const X=Math.random()*800,Y=Math.random()*500;t.moveTo(X,Y);t.lineTo(X+20+Math.random()*60,Y);t.stroke()}
    for(let i=0;i<12;i++){t.fillStyle='rgba(20,10,4,.25)';t.beginPath();t.ellipse(Math.random()*800,Math.random()*500,10+Math.random()*30,6+Math.random()*12,0,0,7);t.fill()}}
  const BI=Array.from({length:70},()=>[Math.random(),Math.random(),Math.random()<.2?'#c8c0a0':'#5a4022']);
  function zone([a,b,w,h],t){x.setLineDash([6,5]);x.strokeStyle='rgba(255,240,200,.7)';x.lineWidth=2;x.strokeRect(a,b,w,h);x.setLineDash([]);x.fillStyle='rgba(255,240,200,.8)';x.font='bold 15px Georgia';x.textAlign='center';x.fillText(t,a+w/2,b+h-10)}
  function frame(){if(fin)return;x.drawImage(TB,0,0);zone(ZP,'Papier');zone(ZF,'Filter');
    x.fillStyle='#3a3a40';x.beginPath();x.ellipse(BOWL[0],BOWL[1],BOWL[2],BOWL[2]*.55,0,0,7);x.fill();x.fillStyle='#22222a';x.beginPath();x.ellipse(BOWL[0],BOWL[1]-4,BOWL[2]-8,BOWL[2]*.45,0,0,7);x.fill();x.fillStyle='rgba(255,240,200,.7)';x.font='bold 14px Georgia';x.textAlign='center';x.fillText('Schale',BOWL[0],BOWL[1]+BOWL[2]*.55+18);
    if(ph<=1){const L=260+un*280;x.fillStyle='#6a5a3a';for(let i=0;i<40;i++){x.fillRect(260+i*7,240+Math.sin(i*1.7)*6,3,2)}if(un>0){x.fillStyle='#f0ead8';x.fillRect(260,232,L-260,36);BI.forEach(([u,v,k])=>{if(260+u*280<L){x.fillStyle=k;x.fillRect(260+u*280,244+v*12,3,2)}})}
      x.fillStyle='#f4f0e2';x.beginPath();x.moveTo(L,236);x.lineTo(540,240);x.lineTo(540,260);x.lineTo(L,264);x.closePath();x.fill();x.strokeStyle='rgba(120,110,90,.6)';x.stroke();x.fillStyle='#2a2a2a';x.beginPath();x.ellipse(L,250,4,14,0,0,7);x.fill()}
    if(ph==2){x.fillStyle='#f0ead8';x.fillRect(paper.x-140,paper.y-18,280,36);x.strokeStyle='rgba(120,110,90,.6)';x.strokeRect(paper.x-140,paper.y-18,280,36);BI.forEach(([u,v])=>{x.fillStyle='#5a4022';x.fillRect(300+u*200,300+v*50,3,2)})}
    if(ph>=3){x.fillStyle='#f0ead8';x.fillRect(80,60,140,20)}
    if(ph>=1){x.fillStyle='#e8dcc0';x.fillRect(filt.x-10,filt.y-12,20,24);x.strokeStyle='#8a7a5a';for(let k=-8;k<10;k+=4){x.beginPath();x.moveTo(filt.x+k,filt.y-12);x.lineTo(filt.x+k,filt.y+12);x.stroke()}}
    else{x.fillStyle='#e8dcc0';x.fillRect(filt.x-10,filt.y-12,20,24);x.strokeStyle='#8a7a5a';x.strokeRect(filt.x-10,filt.y-12,20,24)}
    if(ph==3)PT.forEach(p=>{x.save();x.translate(p.x,p.y);x.rotate(p.a);x.scale(p.s,p.s);
      if(p.t==0){x.strokeStyle='#5a3a1a';x.lineWidth=2.4;x.beginPath();x.moveTo(-9,0);x.quadraticCurveTo(0,-4,9,1);x.stroke();x.strokeStyle='#7a5a2a';x.lineWidth=1;x.beginPath();x.moveTo(-7,2);x.lineTo(6,3);x.stroke()}
      else{x.fillStyle='#d8ccb0';x.beginPath();x.moveTo(-8,3);x.quadraticCurveTo(-8,-8,0,-8);x.quadraticCurveTo(8,-8,8,3);x.closePath();x.fill();x.fillStyle='#c8bca0';x.fillRect(-2.5,2,5,7);
        if(p.t==2){x.fillStyle='rgba(60,110,200,.75)';x.beginPath();x.ellipse(-2,-3,3.5,2.5,0,0,7);x.fill();x.beginPath();x.ellipse(3,1,2,3,0,0,7);x.fill()}x.strokeStyle='rgba(60,50,30,.6)';x.lineWidth=.6;x.stroke()}x.restore()});
    const done=PT.filter(p=>p.t==2&&p.inb).length;x.fillStyle='rgba(0,0,0,.6)';x.fillRect(150,452,500,40);x.fillStyle='#fff';x.font='15px Arial';x.textAlign='center';x.fillText(msg,400,470);
    x.font='bold 13px Arial';x.fillText(['Schritt 1/4: Filter ab','Schritt 2/4: Aufrollen','Schritt 3/4: Papier weg','Schritt 4/4: Sortieren – '+done+' / 9 Pilze'][ph],400,486);x.textAlign='right';x.fillStyle='rgba(255,255,255,.6)';x.fillText('[Später]',790,492);
    requestAnimationFrame(frame)}
  requestAnimationFrame(frame)}
// ================= Gnomsiedlung & Höhle =================
function gHut(x,X,B,s){const w=110*s,h=120*s;shadowAt(x,X,B+3,w*1.2,.55);const p=new Path2D(`M${X-w},${B}C${X-w},${B-h*.9} ${X-w*.5},${B-h} ${X},${B-h}C${X+w*.5},${B-h} ${X+w},${B-h*.9} ${X+w},${B}Z`);
  x.save();x.clip(p);const g=x.createLinearGradient(X-w,0,X+w,0);g.addColorStop(0,'#5a4430');g.addColorStop(.6,'#8a6a48');g.addColorStop(1,'#4a3424');x.fillStyle=g;x.fill(p);
  for(let i=0;i<w*1.2;i++)ell(x,X+(R()-.5)*w*2,B-R()*h*.5,2+R()*4*s,1.5+R()*3*s,mix([90,80,70],[150,140,120],R()),.8);
  for(let i=0;i<w*4;i++){const a=R()*3.14,r=Math.sqrt(R());ell(x,X-Math.cos(a)*w*r,B-h*.45-Math.sin(a)*h*.6*r,1+R()*2,1+R()*3,mix([50,90,30],[120,150,60],R()),.9,R())}x.restore();
  x.strokeStyle='rgba(20,30,10,.7)';x.lineWidth=1;x.stroke(p);for(let i=0;i<30;i++){const t=R(),Xx=X-w+t*w*2;x.strokeStyle='#4a7a2a';x.beginPath();x.moveTo(Xx,B-h*Math.sin(t*3.14)*.95);x.lineTo(Xx+(R()-.5)*4,B-h*Math.sin(t*3.14)*.95-4-R()*6*s);x.stroke()}
  const dw=26*s,dh=56*s;x.fillStyle='#2a1a0c';x.beginPath();x.arc(X-w*.25,B-dh+dw,dw+3,3.14,0);x.lineTo(X-w*.25+dw+3,B);x.lineTo(X-w*.25-dw-3,B);x.fill();x.save();x.beginPath();x.arc(X-w*.25,B-dh+dw,dw,3.14,0);x.lineTo(X-w*.25+dw,B);x.lineTo(X-w*.25-dw,B);x.clip();
  for(let k=-dw;k<dw;k+=7*s)wood(x,X-w*.25+k,B-dh-2,7*s,dh+2,1);x.restore();x.strokeStyle='#8a8a80';x.lineWidth=1.4*s;x.beginPath();x.arc(X-w*.25+dw*.5,B-dh*.45,4*s,0,7);x.stroke();
  const wg=x.createRadialGradient(X+w*.4,B-h*.55,1,X+w*.4,B-h*.55,13*s);wg.addColorStop(0,'#ffe0a0');wg.addColorStop(1,'#b0601c');x.fillStyle=wg;x.beginPath();x.arc(X+w*.4,B-h*.55,12*s,0,7);x.fill();x.strokeStyle='#3a2a18';x.lineWidth=3*s;x.stroke();x.beginPath();x.moveTo(X+w*.4-12*s,B-h*.55);x.lineTo(X+w*.4+12*s,B-h*.55);x.stroke();
  x.save();x.globalCompositeOperation='lighter';dab(x,X+w*.4,B-h*.55,30*s,[255,170,70],.3);x.restore();
  x.fillStyle='#6a6458';x.beginPath();x.moveTo(X+w*.2,B-h*.9);x.lineTo(X+w*.24,B-h*1.25);x.lineTo(X+w*.38,B-h*1.28);x.lineTo(X+w*.36,B-h*.8);x.fill();for(let i=0;i<10;i++)dab(x,X+w*.31+i*3,B-h*1.3-i*8,5+i*1.5,[180,180,180],.14)}
function cabbage(x,X,Y,r){shadowAt(x,X,Y+2,r*1.2,.5);for(let i=0;i<9;i++){const a=i/9*6.28;ell(x,X+Math.cos(a)*r*.55,Y-r*.5+Math.sin(a)*r*.25,r*.6,r*.42,mix([70,120,50],[150,190,110],R()),.95,a)}ell(x,X,Y-r*.6,r*.5,r*.4,[180,210,140]);x.strokeStyle='rgba(40,70,30,.6)';x.lineWidth=.8;for(let k=0;k<5;k++){x.beginPath();x.moveTo(X,Y-r*.6);x.lineTo(X+(R()-.5)*r*1.6,Y-r*.2);x.stroke()}}
function cliff(x){const p=new Path2D('M590,420C600,330 610,240 650,170C690,110 760,80 830,70L830,420Z');x.save();x.clip(p);const g=x.createLinearGradient(590,0,830,0);g.addColorStop(0,'#6a645a');g.addColorStop(1,'#3a3630');x.fillStyle=g;x.fill(p);
  for(let i=0;i<500;i++)ell(x,590+R()*240,70+R()*350,4+R()*16,3+R()*10,mix([60,56,50],[140,132,118],R()),.35,R());for(let i=0;i<40;i++){x.strokeStyle='rgba(20,18,14,.6)';x.lineWidth=1+R();const X=600+R()*220,Y=100+R()*300;x.beginPath();x.moveTo(X,Y);x.lineTo(X+(R()-.5)*30,Y+10+R()*30);x.stroke()}
  for(let i=0;i<160;i++)ell(x,600+R()*220,80+R()*200,1+R()*3,1+R()*2,mix([50,80,30],[110,140,50],R()),.8);
  const m=new Path2D('M650,412L652,330C656,280 690,252 712,252C736,252 770,282 772,330L774,412Z');const mg=x.createRadialGradient(712,330,10,712,340,90);mg.addColorStop(0,'#000');mg.addColorStop(1,'#1a1612');x.fillStyle=mg;x.fill(m);x.strokeStyle='#2a2620';x.lineWidth=6;x.stroke(m);
  x.fillStyle='#4a453c';for(let k=0;k<7;k++){const X=664+k*16;x.beginPath();x.moveTo(X-5,270+Math.abs(k-3)*-6+18);x.lineTo(X,300+Math.abs(k-3)*-6);x.lineTo(X+5,270+Math.abs(k-3)*-6+18);x.fill()}x.restore();
  [[636,372],[790,372]].forEach(([X,Y])=>{wood(x,X-2,Y,4,40,1);x.save();x.globalCompositeOperation='lighter';dab(x,X,Y-8,40,[255,130,40],.4);dab(x,X,Y-6,8,[255,220,120],.9);x.restore()})}
function paintGnome(){const o=S0;sky(o);far(o);ground(o);
  let x=lay();bgRow(x,30,206,250,12,22,0);[[120,240,6,0,96],[360,236,5,1,104],[520,240,5,-1,100]].forEach(b=>birch(x,...b));put(x,.6);
  x=lay();grass(x,7000,o.hz,500,1);details(x);dirt(x,30);put(x);
  x=lay();cliff(x);gHut(x,450,282,.55);gHut(x,190,304,.75);x.fillStyle='#5a3a1c';x.beginPath();x.ellipse(240,392,22,8,0,0,7);x.fill();wood(x,220,374,40,18,1);ell(x,240,374,20,6,[200,160,110]);
  [[60,440,22],[120,452,26],[178,436,20],[90,404,16],[150,410,18]].forEach(a=>cabbage(x,...a));fence2(x,30,240,470,null);
  x.strokeStyle='#3a2a18';x.lineWidth=1;x.beginPath();x.moveTo(300,320);x.quadraticCurveTo(350,330,400,316);x.stroke();[[312,[200,60,50],14,22],[336,[60,110,60],20,14],[364,[220,200,120],12,26]].forEach(([X,k,w,h])=>{const Y=322+Math.sin((X-300)/100*3.14)*6;x.fillStyle=rgba(k);x.fillRect(X,Y,w,h);x.strokeStyle='rgba(20,20,20,.6)';x.strokeRect(X,Y,w,h)});
  [[300,322,58],[400,316,56]].forEach(([X,Y,h])=>wood(x,X-2,Y-4,4,h,1));bucket(x,520,350);rock(x,560,440,12,1);shrooms(x,470,380,5);
  sign(x,604,412,1.2,[[1,0,'Zur Höhle','hHO']]);sign(x,110,486,1.7,[[-1,0,'Zum Ufer','hZU']]);put(x);
  x=lay();grass(x,600,470,515,2.4,1);bush(x,30,500,40,1);put(x,1);rays(o,[[.5,.06],[.8,.04]]);grade(o)}
function paintHoehle(){const o=S0;c.fillStyle='#0a0908';c.fillRect(0,0,W,H);
  let x=lay();let g=x.createRadialGradient(420,320,40,420,300,520);g.addColorStop(0,'#6e6450');g.addColorStop(1,'#16120e');x.fillStyle=g;x.fillRect(0,0,800,500);
  for(let i=0;i<700;i++)ell(x,R()*800,R()*400,4+R()*20,3+R()*12,mix([30,28,24],[110,100,86],R()),.25,R());
  const gm=new Path2D('M370,330C372,270 396,236 420,236C446,236 470,270 472,330Z');x.fillStyle='#000';x.fill(gm);
  for(let i=0;i<26;i++){const X=R()*800,L=20+R()*80,w=6+R()*14;const sg=x.createLinearGradient(X,0,X+w,0);sg.addColorStop(0,'#2a2620');sg.addColorStop(.5,'#6a6252');sg.addColorStop(1,'#1a1814');x.fillStyle=sg;x.beginPath();x.moveTo(X-w/2,-5);x.lineTo(X+w/2,-5);x.lineTo(X,L);x.fill()}
  const fl=new Path2D('M-10,500L-10,380C140,370 300,384 420,376C560,368 700,384 810,372L810,500Z');x.fillStyle='#2a261e';x.fill(fl);x.save();x.clip(fl);for(let i=0;i<300;i++)ell(x,R()*800,370+R()*130,2+R()*8,1+R()*3,mix([40,36,30],[100,92,80],R()),.6);x.restore();
  x.fillStyle='#0e1a1e';x.beginPath();x.ellipse(430,392,130,16,0,0,7);x.fill();for(let i=0;i<40;i++){x.strokeStyle=`rgba(120,200,220,${.05+R()*.15})`;x.beginPath();const X=310+R()*240,Y=384+R()*16;x.moveTo(X,Y);x.lineTo(X+10+R()*20,Y);x.stroke()}
  [[90,420],[150,436],[120,404],[60,446]].forEach(([X,Y])=>{for(let k=0;k<4;k++){const h=8+R()*14,px=X+(R()-.5)*30;x.strokeStyle='#bfe8f0';x.lineWidth=2;x.beginPath();x.moveTo(px,Y);x.lineTo(px,Y-h);x.stroke();ell(x,px,Y-h,6,3,[140,230,255])}});
  [[640,420],[680,432],[720,410],[760,428]].forEach(([X,Y])=>{for(let k=0;k<3;k++){const h=20+R()*30,a=(R()-.5)*.6;x.save();x.translate(X+k*8,Y);x.rotate(a);x.fillStyle=rgba(mix([150,80,200],[220,160,255],R()),.9);x.beginPath();x.moveTo(-5,0);x.lineTo(-4,-h*.8);x.lineTo(0,-h);x.lineTo(4,-h*.8);x.lineTo(5,0);x.fill();x.fillStyle='rgba(255,255,255,.4)';x.fillRect(-2,-h*.8,1.5,h*.6);x.restore()}});
  for(let i=0;i<14;i++){const X=R()*800,h=14+R()*40;x.fillStyle='#3a342a';x.beginPath();x.moveTo(X-8,384+R()*10);x.lineTo(X,384-h);x.lineTo(X+8,384+R()*10);x.fill()}
  bone(x,520,450,.3,16);skull(x,560,456,1.3);wood(x,240,460,40,6,0);put(x);
  x=lay();x.globalCompositeOperation='lighter';dab(x,110,420,140,[60,180,220],.6);dab(x,700,410,150,[160,70,220],.6);dab(x,420,300,80,[40,40,60],.2);put(x,8,'screen',.9);
  x=lay();sign(x,110,486,1.7,[[-1,0,'Zum Ausgang','hAU']]);put(x);
  const vg=c.createRadialGradient(420,330,100,420,300,540);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.5)');c.fillStyle=vg;c.fillRect(0,0,W,H)}
const GNOM1=`<g stroke="#1a1208" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round">
<path d="M40,-196L60,-262L66,-258L48,-194Z" fill="#7a5630"/><path d="M42,-200L58,-256" fill="none" stroke="#a87c48" stroke-width="1.2"/>
<path d="M40,-264C50,-276 70,-282 84,-276C76,-272 66,-270 60,-266C66,-262 72,-256 74,-248C64,-252 54,-258 46,-260Z" fill="#7c8288"/><path d="M48,-264C58,-272 70,-276 80,-275" fill="none" stroke="#c0c6cc" stroke-width="1.2"/>
<path d="M-40,-4C-42,-10 -40,-18 -32,-22L-30,-40L-8,-40L-8,-18C-4,-14 -2,-8 -4,-2C-12,2 -32,2 -40,-4Z" fill="#4a3220"/><path d="M-42,-4C-34,1 -10,1 -3,-3L-3,1C-12,4 -34,4 -42,0Z" fill="#1e140c"/>
<path d="M8,-2C6,-8 8,-14 10,-18L10,-40L32,-40L34,-22C42,-18 44,-10 42,-4C34,2 14,2 8,-2Z" fill="#3e2a1a"/><path d="M7,-3C14,1 36,1 43,-4L43,0C34,4 12,4 7,1Z" fill="#1e140c"/>
<path d="M-32,-36C-34,-30 -30,-26 -20,-26C-10,-26 -6,-30 -8,-36ZM10,-36C8,-30 12,-26 22,-26C32,-26 36,-30 34,-36Z" fill="#5a4028"/>
<path d="M-36,-82C-40,-66 -38,-50 -32,-36L-8,-36L-4,-60L4,-60L10,-36L34,-36C40,-50 42,-66 38,-82Z" fill="#4a4a6a"/>
<path d="M18,-80C24,-66 26,-50 24,-36L34,-36C40,-50 42,-66 38,-82Z" fill="#383852" stroke="none"/><path d="M-24,-60C-22,-52 -20,-46 -18,-40M22,-58C22,-52 21,-46 20,-40" fill="none" stroke="#2c2c44" stroke-width=".9"/>
<path d="M-46,-150C-58,-130 -60,-104 -50,-84C-36,-74 36,-74 50,-84C60,-104 58,-130 46,-150C30,-164 -30,-164 -46,-150Z" fill="#d8ccac"/>
<path d="M30,-158C46,-146 56,-126 54,-106C52,-94 50,-88 46,-84C40,-80 32,-78 26,-78C38,-100 40,-130 30,-158Z" fill="#b4a888" stroke="none"/>
<path d="M-40,-100C-30,-92 -14,-88 0,-88M8,-90C20,-90 32,-94 40,-102M-30,-120C-26,-110 -24,-100 -24,-92" fill="none" stroke="#9a8e70" stroke-width=".9"/>
<path d="M-48,-148C-54,-124 -54,-100 -48,-80L-36,-80C-38,-104 -36,-128 -30,-150Z" fill="#6a4426"/><path d="M48,-148C54,-124 54,-100 48,-80L36,-80C38,-104 36,-128 30,-150Z" fill="#583820"/>
<path d="M-50,-90C-30,-84 30,-84 50,-90L50,-78C30,-72 -30,-72 -50,-78Z" fill="#3a2414"/><path d="M-8,-92L10,-92L10,-74L-8,-74Z" fill="#c8a040"/><path d="M-4,-88L6,-88L6,-78L-4,-78Z" fill="#3a2414" stroke-width="1"/><path d="M1,-83L8,-83" fill="none" stroke="#c8a040" stroke-width="1.6"/>
<path d="M-46,-152C-62,-150 -70,-134 -70,-116C-70,-104 -66,-96 -60,-90C-56,-100 -52,-112 -50,-124C-48,-134 -46,-144 -40,-152Z" fill="#d8ccac"/>
<path d="M-70,-116C-74,-104 -74,-92 -68,-84C-62,-80 -54,-82 -50,-88C-50,-96 -54,-104 -60,-108Z" fill="#e0a882"/>
<path d="M-68,-108C-66,-100 -64,-94 -60,-90M-62,-108C-60,-102 -58,-96 -56,-92" fill="none" stroke="#b07a58" stroke-width=".9"/>
<path d="M-66,-86C-74,-84 -76,-74 -72,-68C-68,-62 -58,-62 -54,-66C-50,-70 -50,-78 -54,-84C-58,-88 -62,-88 -66,-86Z" fill="#e0a882"/>
<path d="M-70,-76C-66,-72 -62,-72 -58,-74M-71,-71C-67,-67 -62,-67 -58,-69M-68,-80C-64,-77 -60,-77 -57,-79" fill="none" stroke="#a8684a" stroke-width=".9"/><path d="M-58,-84C-54,-82 -52,-78 -54,-74" fill="none" stroke="#a8684a" stroke-width=".9"/>
<path d="M46,-152C58,-148 64,-140 64,-128C64,-118 60,-108 54,-100L44,-108C48,-116 50,-124 48,-132C46,-140 42,-146 40,-150Z" fill="#c8bc9c"/>
<path d="M46,-104C40,-118 40,-142 44,-160C46,-172 44,-182 40,-190L62,-194C68,-180 70,-164 68,-148C66,-132 64,-116 60,-104Z" fill="#e0a882"/><path d="M60,-104C64,-116 66,-132 68,-148C70,-164 68,-180 62,-194L56,-192C62,-176 62,-150 56,-104Z" fill="#c4885e" stroke="none"/>
<path d="M54,-150C56,-140 57,-128 56,-116M52,-176C55,-170 57,-162 57,-154" fill="none" stroke="#b07a58" stroke-width=".9"/>
<path d="M42,-194C40,-202 44,-210 52,-210C58,-210 62,-206 62,-200C62,-194 58,-188 52,-188C48,-188 44,-190 42,-194Z" fill="#e0a882"/><path d="M44,-202C48,-204 52,-204 56,-202M44,-197C48,-199 52,-199 56,-197" fill="none" stroke="#a8684a" stroke-width=".9"/>
<path d="M-10,-166L-10,-152L10,-152L10,-166Z" fill="#c88a64"/>
<path d="M-30,-194C-32,-176 -26,-160 -14,-152C-6,-148 6,-148 14,-152C26,-160 32,-176 30,-194C28,-210 16,-218 0,-218C-16,-218 -28,-210 -30,-194Z" fill="#e0a882"/>
<path d="M14,-214C26,-206 31,-192 30,-178C28,-166 22,-156 14,-152C22,-166 24,-190 14,-214Z" fill="#c4885e" stroke="none"/>
<path d="M-32,-190C-38,-192 -40,-184 -38,-178C-36,-174 -32,-174 -30,-178Z" fill="#e0a882"/><path d="M32,-190C38,-192 40,-184 38,-178C36,-174 32,-174 30,-178Z" fill="#c4885e"/>
<path d="M-30,-176C-40,-160 -44,-136 -40,-118C-36,-104 -26,-94 -14,-90C-6,-88 0,-86 4,-82C8,-86 14,-88 22,-90C34,-96 40,-108 42,-124C44,-144 38,-162 30,-176C26,-168 18,-164 10,-166C4,-170 -4,-170 -10,-166C-18,-164 -26,-168 -30,-176Z" fill="#c05a1e"/>
<path d="M10,-166C22,-164 30,-170 32,-174C40,-160 44,-140 42,-124C40,-108 34,-96 22,-90C14,-88 8,-86 4,-82C10,-100 16,-130 10,-166Z" fill="#9a4614" stroke="none"/>
<path d="M-24,-158C-28,-140 -28,-122 -22,-106M-12,-160C-14,-140 -14,-120 -8,-100M0,-162C0,-142 0,-120 2,-96M12,-160C14,-140 16,-120 14,-100M24,-158C28,-140 30,-122 26,-106M-34,-150C-36,-136 -34,-124 -30,-114M34,-150C36,-136 36,-124 32,-112" fill="none" stroke="#7a3410" stroke-width="1"/>
<path d="M-18,-170C-10,-178 -2,-176 0,-170C2,-176 10,-178 18,-170C14,-164 8,-162 0,-165C-8,-162 -14,-164 -18,-170Z" fill="#c05a1e"/>
<path d="M-6,-190C-12,-188 -14,-180 -12,-174C-10,-168 -2,-166 2,-168C8,-166 14,-170 14,-176C14,-184 10,-190 2,-191Z" fill="#d8786a"/><ellipse cx="-5" cy="-184" rx="2.4" ry="1.6" fill="#f4b0a4" stroke="none"/><path d="M-6,-172C-4,-170 -2,-170 0,-171M4,-171C6,-170 8,-170 10,-172" fill="none" stroke="#9a4a3a" stroke-width=".8"/>
<path d="M-20,-194C-18,-196 -13,-196 -11,-194C-13,-192 -18,-192 -20,-194Z" fill="#f4ecd8" stroke-width=".8"/><circle cx="-15.4" cy="-194" r="1.4" fill="#2a1408" stroke="none"/>
<path d="M11,-194C13,-196 18,-196 20,-194C18,-192 13,-192 11,-194Z" fill="#f4ecd8" stroke-width=".8"/><circle cx="15.4" cy="-194" r="1.4" fill="#2a1408" stroke="none"/>
<path d="M-24,-200L-9,-195M24,-200L9,-195" fill="none" stroke="#a84a14" stroke-width="3.4"/><path d="M-2,-198C-1,-195 1,-195 2,-198" fill="none" stroke="#a8684a" stroke-width=".8"/>
<path d="M-22,-190C-20,-188 -18,-187 -15,-187M22,-190C20,-188 18,-187 15,-187" fill="none" stroke="#a8684a" stroke-width=".6"/>
<path d="M-34,-206C-38,-218 -30,-226 -20,-224C-8,-222 8,-222 20,-224C30,-226 38,-218 34,-206C22,-212 -22,-212 -34,-206Z" fill="#2e5a2a"/>
<path d="M-26,-222C-26,-250 -12,-276 6,-292C14,-298 22,-296 24,-288C26,-280 20,-270 18,-260C22,-246 26,-234 28,-222C14,-226 -12,-226 -26,-222Z" fill="#3a6a32"/>
<path d="M10,-280C18,-268 22,-250 28,-222L18,-224C16,-240 14,-260 10,-280Z" fill="#2a5226" stroke="none"/>
<path d="M-12,-238C-8,-252 0,-266 10,-280M-20,-224C-16,-236 -10,-248 -4,-258" fill="none" stroke="#24481e" stroke-width=".9"/>
<path d="M-34,-206C-22,-212 22,-212 34,-206" fill="none" stroke="#24481e" stroke-width=".9"/><path d="M-20,-214l1,3M-6,-216l0,3M8,-216l0,3M22,-214l-1,3" fill="none" stroke="#24481e" stroke-width=".8"/>
</g>`;
const GNOM2=`<g stroke="#1a1208" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round">
<path d="M-30,-2C-36,-2 -42,-4 -44,-8C-38,-10 -30,-12 -22,-12L-12,-12C-10,-8 -10,-4 -12,-2Z" fill="#5a3a22"/><path d="M-44,-8C-46,-10 -46,-12 -44,-12" fill="none" stroke-width="1.2"/>
<path d="M10,-2C8,-6 8,-10 12,-12L24,-12C32,-12 40,-10 46,-8C44,-4 38,-2 30,-2Z" fill="#4a3018"/><path d="M46,-8C48,-10 48,-12 46,-13" fill="none" stroke-width="1.2"/>
<path d="M-22,-12L-22,-46L-14,-46L-13,-12Z" fill="#e8e2d0"/><path d="M-22,-40H-14M-22,-32H-14M-22,-24H-13M-22,-16H-13" fill="none" stroke="#b03a2a" stroke-width="2.4"/>
<path d="M14,-12L14,-46L22,-46L23,-12Z" fill="#d8d2c0"/><path d="M14,-40H22M14,-32H22M14,-24H23M14,-16H23" fill="none" stroke="#9a3022" stroke-width="2.4"/>
<path d="M-32,-130C-38,-104 -40,-74 -36,-44C-24,-40 -8,-42 0,-46C8,-42 24,-40 36,-44C40,-74 38,-104 32,-130Z" fill="#4a6088"/>
<path d="M16,-128C24,-104 28,-74 26,-44C30,-43 33,-43 36,-44C40,-74 38,-104 32,-130Z" fill="#3a4c6c" stroke="none"/>
<path d="M-26,-90C-28,-74 -28,-60 -26,-46M-6,-74C-6,-62 -4,-52 -2,-46M24,-92C26,-76 26,-60 26,-46" fill="none" stroke="#2c3a54" stroke-width=".9"/>
<path d="M-36,-44C-24,-40 -8,-42 0,-46C8,-42 24,-40 36,-44" fill="none" stroke="#c8a048" stroke-width="1.6"/>
<path d="M-34,-128C-46,-118 -50,-100 -46,-84C-44,-78 -40,-76 -36,-78C-36,-94 -34,-108 -28,-120Z" fill="#4a6088"/>
<path d="M-44,-84C-48,-80 -48,-72 -44,-68C-40,-66 -36,-68 -35,-72C-34,-76 -36,-82 -40,-84Z" fill="#e0b088"/><path d="M-44,-76C-42,-74 -40,-74 -38,-75" fill="none" stroke="#a8684a" stroke-width=".7"/>
<path d="M30,-128C40,-122 44,-112 42,-104C40,-98 34,-96 28,-98L26,-106C30,-106 32,-108 32,-112C32,-116 30,-120 26,-124Z" fill="#3a4c6c"/>
<path d="M-18,-122C-26,-110 -30,-92 -26,-76C-22,-64 -12,-56 0,-54C12,-56 22,-64 26,-76C30,-92 26,-110 18,-122C10,-118 4,-120 0,-124C-4,-120 -10,-118 -18,-122Z" fill="#ecebe4"/>
<path d="M8,-120C18,-116 24,-104 24,-90C24,-78 20,-66 12,-58C6,-55 2,-54 0,-54C10,-70 14,-96 8,-120Z" fill="#c8c6bc" stroke="none"/>
<path d="M-14,-112C-18,-98 -18,-84 -14,-72M-6,-116C-8,-100 -8,-82 -4,-66M2,-118C2,-100 2,-80 2,-62M10,-116C12,-100 12,-84 10,-70M-20,-104C-22,-94 -22,-86 -20,-80" fill="none" stroke="#a8a69c" stroke-width=".7"/>
<path d="M-4,-60C-4,-56 -2,-52 0,-50C2,-52 4,-56 4,-60" fill="#ecebe4" stroke-width="1"/>
<path d="M-6,-136L-6,-126L6,-126L6,-136Z" fill="#d8a080"/>
<path d="M-22,-150C-24,-140 -20,-130 -12,-126C-6,-122 6,-122 12,-126C20,-130 24,-140 22,-150C20,-162 12,-168 0,-168C-12,-168 -20,-162 -22,-150Z" fill="#e8b892"/>
<path d="M10,-166C18,-160 23,-150 22,-140C21,-134 18,-129 12,-126C18,-138 18,-154 10,-166Z" fill="#cc9a74" stroke="none"/>
<path d="M-24,-150C-30,-152 -32,-144 -28,-140C-26,-138 -24,-139 -23,-141Z" fill="#e8b892"/><path d="M24,-150C30,-152 32,-144 28,-140C26,-138 24,-139 23,-141Z" fill="#cc9a74"/>
<path d="M-20,-140C-22,-132 -20,-124 -14,-120C-8,-116 -2,-118 0,-122C2,-118 8,-116 14,-120C20,-124 22,-132 20,-140C14,-136 8,-134 0,-136C-8,-134 -14,-136 -20,-140Z" fill="#ecebe4"/>
<path d="M-12,-134C-6,-138 -2,-138 0,-136C2,-138 6,-138 12,-134C8,-130 4,-130 0,-132C-4,-130 -8,-130 -12,-134Z" fill="#dcdad0"/>
<path d="M-3,-152C-6,-146 -8,-136 -8,-126C-8,-116 -6,-108 -2,-104C1,-102 4,-104 4,-108C5,-116 4,-130 3,-140C2,-146 1,-150 0,-152Z" fill="#e0a07c"/><path d="M1,-142C3,-130 3,-118 2,-108" fill="none" stroke="#b07050" stroke-width=".7"/><ellipse cx="-4" cy="-110" rx="1.6" ry="2.6" fill="#f4c0a4" stroke="none"/>
<path d="M-6,-150C-8,-148 -9,-146 -9,-144M5,-150C7,-148 8,-146 8,-144" fill="none" stroke="#b07050" stroke-width=".6"/>
<circle cx="-9" cy="-152" r="5" fill="#cfe0ea" fill-opacity=".45" stroke-width="1.1"/><circle cx="9" cy="-152" r="5" fill="#cfe0ea" fill-opacity=".45" stroke-width="1.1"/><path d="M-4,-152C-2,-154 2,-154 4,-152M-14,-153L-21,-155M14,-153L21,-155" fill="none" stroke-width="1"/>
<circle cx="-8" cy="-152" r="1.3" fill="#2a1a10" stroke="none"/><circle cx="8" cy="-152" r="1.3" fill="#2a1a10" stroke="none"/><path d="M-11,-154L-7,-155M7,-155L11,-154" fill="none" stroke="#fff" stroke-width=".6" opacity=".7"/>
<path d="M-15,-160C-12,-162 -7,-162 -4,-160M4,-160C7,-162 12,-162 15,-160" fill="none" stroke="#e4e2d8" stroke-width="2.6"/>
<path d="M2,-128C10,-126 18,-124 26,-122L28,-118C20,-120 12,-122 2,-124Z" fill="#6a4a2a"/>
<path d="M24,-124C24,-132 28,-136 32,-136C36,-136 38,-132 37,-126C36,-120 32,-118 28,-118C26,-118 24,-120 24,-124Z" fill="#7a5430"/><ellipse cx="30.6" cy="-135" rx="4.6" ry="1.6" fill="#2a1a10" stroke-width=".8"/><circle cx="30" cy="-135.4" r="1" fill="#ff7a30" stroke="none"/>
<path d="M32,-140C28,-148 34,-154 30,-162C27,-168 32,-174 30,-180" fill="none" stroke="#e0dcd4" stroke-width="2" opacity=".7"/><path d="M36,-146C40,-152 38,-158 42,-164" fill="none" stroke="#e0dcd4" stroke-width="1.6" opacity=".55"/>
<path d="M26,-118C28,-112 30,-108 28,-104C24,-102 20,-104 20,-108C20,-112 22,-116 26,-118Z" fill="#e0b088"/><path d="M21,-110C23,-108 25,-108 27,-109" fill="none" stroke="#a8684a" stroke-width=".7"/>
<path d="M-26,-160C-28,-170 -20,-176 -8,-176C6,-176 22,-174 26,-164C24,-158 22,-156 20,-156C6,-160 -10,-160 -26,-160Z" fill="#c8302a"/>
<path d="M-22,-172C-22,-196 -12,-214 2,-222C12,-228 24,-230 34,-226C42,-222 46,-214 44,-206C40,-210 34,-212 28,-210C24,-200 22,-188 22,-174C8,-178 -10,-178 -22,-172Z" fill="#c8302a"/>
<path d="M44,-206C46,-200 46,-194 42,-192C40,-196 38,-200 38,-204Z" fill="#c8302a"/><circle cx="42" cy="-190" r="3.4" fill="#ecebe4"/>
<path d="M12,-218C22,-214 26,-206 28,-210C24,-200 22,-188 22,-174L14,-176C14,-190 16,-204 12,-218Z" fill="#9a221c" stroke="none"/>
<path d="M-12,-190C-6,-202 4,-212 16,-218M-16,-176C-14,-184 -10,-192 -6,-198" fill="none" stroke="#8a1c18" stroke-width=".9"/>
<path d="M-26,-162C-12,-166 12,-166 26,-162L26,-156C12,-160 -12,-160 -26,-156Z" fill="#9a221c"/>
</g>`;