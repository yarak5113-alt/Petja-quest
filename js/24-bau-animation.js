// ================= Kleine Animationen statt Abblende: Sägen an der Birkensperre, Hausbau (Holz legen, Dach, Tür zu) =================
// animShots(shots,done): spielt kurze Szenen auf einer Leinwand über dem Spiel ab. Jede Szene: {d:Dauer in s, cap:Untertitel, draw(x,t,k)}
// (t = Sekunden seit Szenenbeginn, k = 0..1 Fortschritt). Klick überspringt die laufende Szene.
function animShots(shots,done){changing=true;const cv=document.createElement('canvas');cv.id='cut';cv.width=800;cv.height=500;
  cv.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:15;cursor:pointer';$('#game').appendChild(cv);const x=cv.getContext('2d');
  let i=0,T0=performance.now(),fin=false;cv.onclick=e=>{e.stopPropagation();next()};
  function next(){i++;T0=performance.now();if(i>=shots.length)end()}
  function end(){if(fin)return;fin=true;fade.style.opacity=1;setTimeout(()=>{cv.remove();changing=false;fade.style.opacity=0;done&&done()},420)}
  function frame(){if(fin)return;const s=shots[i],t=(performance.now()-T0)/1000;if(t>=s.d){next();if(fin)return;return requestAnimationFrame(frame)}
    x.save();s.draw(x,t,t/s.d);x.restore();
    const a=Math.min(1,t/.3,(s.d-t)/.3);if(a<1){x.fillStyle=`rgba(0,0,0,${1-a})`;x.fillRect(0,0,800,500)}
    if(s.cap){x.font='italic bold 22px Georgia';x.textAlign='center';x.lineWidth=5;x.strokeStyle='rgba(0,0,0,.8)';x.strokeText(s.cap,400,476);x.fillStyle='#ffe8b0';x.fillText(s.cap,400,476)}
    requestAnimationFrame(frame)}
  requestAnimationFrame(frame)}
// Petja als Bild (Seitenansicht, wenn vorhanden)
const petPic=side=>{const u=side&&PFR[90]?PFR[90][0]:frames[0];const im=new Image();im.src=u||'';return im};
function drawPet(x,im,X,B,s,flip,rot=0){if(!im.complete||!im.naturalWidth)return;x.save();x.translate(X,B);x.rotate(rot);x.scale(flip?-s:s,s);x.drawImage(im,PB[0],PB[1],PB[2],PB[3]);x.restore()}
// geschälter Stamm (liegend) bzw. Birkenstamm mit Rinde
function logH(x,X0,X1,Y,h,bark){const g=x.createLinearGradient(0,Y,0,Y+h);
  if(bark){g.addColorStop(0,'#8a7a66');g.addColorStop(.35,'#ece6d8');g.addColorStop(.75,'#c8c0b0');g.addColorStop(1,'#5a5248')}else{g.addColorStop(0,'#b88a52');g.addColorStop(.35,'#f0d29a');g.addColorStop(.75,'#d4a868');g.addColorStop(1,'#7a5228')}
  x.fillStyle=g;x.fillRect(X0,Y,X1-X0,h);if(bark){x.fillStyle='#2a2420';for(let X=X0+8;X<X1-8;X+=23)x.fillRect(X,Y+h*.3+((X*7)%9),10,2.6)}
  for(const E of[X0,X1]){x.fillStyle='#d8b47a';x.beginPath();x.ellipse(E,Y+h/2,h*.22,h/2,0,0,7);x.fill();x.strokeStyle='#8a6034';x.lineWidth=1;x.stroke()}}
// Hintergrund wie im Hausbau-Minispiel: Himmel, Wiese, Opas Ofen mit Schornstein
const BAUBG={};function bauBG(oven=1){if(BAUBG[oven])return BAUBG[oven];const c=document.createElement('canvas');c.width=800;c.height=500;const t=c.getContext('2d');
  let g=t.createLinearGradient(0,0,0,440);g.addColorStop(0,'#7aa4c8');g.addColorStop(.7,'#d8c8a0');g.addColorStop(1,'#e8c890');t.fillStyle=g;t.fillRect(0,0,800,440);
  for(let i=0;i<12;i++){t.fillStyle='rgba(255,255,255,.25)';t.beginPath();t.ellipse((i*137)%800,50+(i*53)%110,60,10,0,0,7);t.fill()}
  t.fillStyle='#4a6a3a';for(let X=0;X<800;X+=16){t.beginPath();t.moveTo(X,300);t.lineTo(X+8,266+((X*13)%22));t.lineTo(X+16,300);t.fill()}t.fillRect(0,298,800,142);
  g=t.createLinearGradient(0,430,0,500);g.addColorStop(0,'#6a5a3a');g.addColorStop(1,'#3a2e1e');t.fillStyle=g;t.fillRect(0,430,800,70);
  if(oven){g=t.createLinearGradient(430,0,560,0);g.addColorStop(0,'#e0dace');g.addColorStop(1,'#9a958a');t.fillStyle=g;t.fillRect(430,300,130,140);t.fillRect(482,120,40,180);
  t.fillStyle='rgba(20,16,12,.35)';t.fillRect(430,120,130,60)}return BAUBG[oven]=c}
const snapBG=()=>{const c=document.createElement('canvas');c.width=800;c.height=500;c.getContext('2d').drawImage($('#bg'),0,0,800,500);return c};
const dust=[];function puff(X,Y,n,col){for(let i=0;i<n;i++)dust.push({x:X+(Math.random()-.5)*30,y:Y,vx:(Math.random()-.5)*3,vy:-Math.random()*2.4,l:1,c:col||'200,180,140'})}
function drawDust(x){for(let i=dust.length-1;i>=0;i--){const p=dust[i];p.x+=p.vx;p.y+=p.vy;p.vy+=.06;p.l-=.02;if(p.l<=0){dust.splice(i,1);continue}x.fillStyle=`rgba(${p.c},${p.l})`;x.beginPath();x.arc(p.x,p.y,2+3*(1-p.l),0,7);x.fill()}}

// ----- Sägen an der Birkensperre -----
function sawShots(){const bg=snapBG(),pet=petPic(1);return[{d:3.6,cap:'*säg* … *säg* … *keuch* … *säg*',draw(x,t,k){x.drawImage(bg,0,0);x.fillStyle='rgba(0,0,0,.25)';x.fillRect(0,0,800,500);
    const sp=k>.85?(k-.85)/.15*30:0;logH(x,250,450-sp,392,46,1);logH(x,456+sp,690,392,46,1);
    const cut=Math.min(46,k*54);x.fillStyle='#1a1410';x.fillRect(450-sp,392,6+sp*2,cut);
    const sx=Math.sin(t*14),hx=548+sx*22,hy=356+sx*9,cx=453,cy=392+cut,an=Math.atan2(hy-cy,hx-cx),L=Math.hypot(hx-cx,hy-cy);
    x.save();x.translate(cx,cy);x.rotate(an);x.fillStyle='#c8ccd2';x.beginPath();x.moveTo(-50,-2);x.lineTo(L-14,-6);x.lineTo(L-14,6);x.lineTo(-50,4);x.closePath();x.fill();x.strokeStyle='#3a3e44';x.stroke();
    x.fillStyle='#3a3e44';for(let q=-46;q<L-18;q+=6){x.beginPath();x.moveTo(q,4);x.lineTo(q+3,8);x.lineTo(q+6,4);x.fill()}x.fillStyle='#7a4a22';x.fillRect(L-16,-10,24,20);x.restore();
    if(Math.random()<.6)puff(453,392+cut,1,'230,210,170');drawDust(x);
    drawPet(x,pet,568+sx*10,476,1.05,1,sx*.03)}}]}

// ----- Hausbau nach dem Minispiel: Holz legen, Dach machen, Tür zuschlagen -----
function hausShots(){const pet=petPic(1),petF=petPic(0),LH=34,X0=210,X1=590,BASE=440;
  const wall=(x,n)=>{for(let i=0;i<n;i++)logH(x,X0,X1,BASE-(i+1)*LH,LH-2,0);for(let i=0;i<n-1;i++){x.fillStyle='#14100c';x.fillRect(X0,BASE-(i+1)*LH-2,X1-X0,4)}};
  return[
  {d:4.2,cap:'Stamm für Stamm …',draw(x,t,k){x.drawImage(bauBG(),0,0);const c=t%2.1,n=4+Math.min(2,Math.floor(t/2.1));wall(x,n);
    if(n<6){if(c<1.3){const px=90+c/1.3*170;drawPet(x,pet,px,470,.95,0);logH(x,px-90,px+70,470-184,26,0)}
      else{const q=(c-1.3)/.8,ly=286+(BASE-(n+1)*LH-286)*q;drawPet(x,pet,260,470,.95,0,-.08*q);logH(x,X0+(1-q)*-40,X1+(1-q)*-170,ly,LH-2,0);if(q>.92)puff(400,BASE-n*LH,3)}}
    else drawPet(x,petF,140,470,.95,0);drawDust(x)}},
  {d:4.2,cap:'*hämmer* … *hämmer* … Dach drauf!',draw(x,t,k){x.drawImage(bauBG(),0,0);wall(x,6);const top=BASE-6*LH,ap=top-120,rows=Math.floor(k*9);
    x.save();x.beginPath();x.moveTo(X0-30,top);x.lineTo(400,ap);x.lineTo(X1+30,top);x.closePath();x.clip();const fillTo=top-(top-ap)*k;
      for(let y=top;y>fillTo;y-=14){const g=x.createLinearGradient(0,y-14,0,y);g.addColorStop(0,'#6a5642');g.addColorStop(1,'#3a2e24');x.fillStyle=g;x.fillRect(X0-40,y-14,X1-X0+80,14);x.strokeStyle='rgba(0,0,0,.55)';x.beginPath();x.moveTo(X0-40,y);x.lineTo(X1+40,y);x.stroke()}x.restore();
    x.strokeStyle='rgba(0,0,0,.25)';x.setLineDash([5,5]);x.beginPath();x.moveTo(X0-30,top);x.lineTo(400,ap);x.lineTo(X1+30,top);x.stroke();x.setLineDash([]);
    // Leiter rechts, Petja oben mit Hammer
    x.strokeStyle='#7a5a32';x.lineWidth=5;x.beginPath();x.moveTo(640,BASE);x.lineTo(600,top-10);x.moveTo(670,BASE);x.lineTo(630,top-10);x.stroke();x.lineWidth=3;for(let y=BASE-20;y>top;y-=26){const f=(BASE-y)/(BASE-top);x.beginPath();x.moveTo(640-40*f,y);x.lineTo(670-40*f,y);x.stroke()}
    const hy=Math.abs(Math.sin(t*9));drawPet(x,pet,615,top+120,.62,1);x.save();x.translate(585,top+44);x.rotate(-1.2+hy*1.1);x.fillStyle='#7a4a22';x.fillRect(-3,-34,6,34);x.fillStyle='#4a4e54';x.fillRect(-10,-40,20,9);x.restore();
    if(hy>.97)puff(560,top-(top-ap)*k+6,2,'120,100,80');drawDust(x);x.lineWidth=1}},
  {d:3.4,cap:'',draw(x,t,k){const sh=t>1.2&&t<1.6?(Math.random()-.5)*10:0;x.translate(sh,sh*.5);x.drawImage(bauBG(0),0,0);x.fillStyle='#8a8478';x.fillRect(470,BASE-300,30,70);x.fillStyle='#5a564e';x.fillRect(466,BASE-306,38,8);
    // fertiges Haus von vorn: Rundholzwand, Dach, Fenster, Tür
    for(let i=0;i<6;i++)logH(x,250,550,BASE-(i+1)*34,32,0);x.fillStyle='#3a2e24';x.beginPath();x.moveTo(220,BASE-204);x.lineTo(400,BASE-320);x.lineTo(580,BASE-204);x.fill();
    x.fillStyle='#6a5034';x.fillRect(214,BASE-210,372,8);x.fillStyle='#1a1410';x.fillRect(300,BASE-150,52,40);x.strokeStyle='#d8b070';x.lineWidth=5;x.strokeRect(300,BASE-150,52,40);x.lineWidth=1;
    x.fillStyle='#120c08';x.fillRect(400,BASE-110,58,110);const op=t<1.2?1-Math.pow(t/1.2,3):0,dw=58*(1-op*.85);
    const g=x.createLinearGradient(400,0,400+dw,0);g.addColorStop(0,'#8a6234');g.addColorStop(1,'#5a3c1c');x.fillStyle=g;x.fillRect(400,BASE-110,dw,110);x.strokeStyle='#d8b070';x.lineWidth=4;x.strokeRect(398,BASE-112,62,114);x.lineWidth=1;
    if(t>1.2&&!this.p){this.p=1;puff(430,BASE-4,16,'210,190,150');puff(430,BASE-110,8,'210,190,150')}drawDust(x);
    drawPet(x,petF,520,476,.9,0);
    if(t>1.2){x.font='bold 46px Georgia';x.textAlign='center';x.lineWidth=7;x.strokeStyle='#000';const s=1+Math.max(0,.4-(t-1.2))*1.2;x.save();x.translate(400,90);x.scale(s,s);x.strokeText('RUMMS!',0,0);x.fillStyle='#ffd25a';x.fillText('RUMMS!',0,0);x.restore()}}}]}

// ----- Einhängen: Sägen und Hausbau benutzen die Animationen -----
sawAndBuild=function(){say([['P','So. Mit Opas Segen.']],()=>animShots(sawShots(),()=>{
  FL.cut=1;delete cache.sperre;T.sHolz.n='Holzreste';const h=$('[data-id=sHolz]');if(h)h.style.display='none';renderInv();enter('sperre',[P.x,P.y]);
  setTimeout(()=>say([['P','Geschafft. Der Weg zum Sumpf ist frei.'],['P','Und jetzt … die Stämme zu Opa. Alle. Mein Rücken weiß es schon.']],()=>{enter('dorf',[420,480]);
    setTimeout(()=>say([['G','Na endlich! Die Stämme sind da. Jetzt wird gebaut, wie früher:'],['G','Stamm auf Stamm. Dann die Rinde runter, sonst frisst der Käfer das Haus. Und zum Schluss Teer in die Fugen.']],hausGame),1100)}),700)}))};
hausWin=function(){FL.haus=1;delete cache.dorf;dropInv('saege');animShots(hausShots(),()=>{enter('dorf',[420,480]);
  setTimeout(()=>say([['G','Na bitte. Ein Haus! Aus echten Birkenstämmen! Und der Ofen war ja schon da.'],['P','Mein Rücken ist jetzt auch abgebrannt.'],
    ['G','Die Säge häng ich wieder an den Nagel. So scharf war sie seit 1987 nicht mehr.'],['G','Und jetzt ab in deinen Sumpf, der Weg ist ja frei.']]),1100)})};

// ----- Hinweis auf den Ast: Im Birkenwald fällt Petja der Ast der Krähe von selbst auf -----
{const _e=enter;enter=function(id,pos){_e(id,pos);if(id==='wald'&&FL.angelQ&&!FL.ast&&!FL.astTipp&&!has('stock')&&!has('angel'))setTimeout(()=>{if(cur!=='wald'||busy||ovl)return;FL.astTipp=1;
  say([['P','Moment. Die Krähe da drüben hockt auf einem richtig schönen, geraden Ast.'],['P','Das wär ein perfekter Angelstock. Wenn das Vieh da nur runtergehen würde …']])},1600)}}
