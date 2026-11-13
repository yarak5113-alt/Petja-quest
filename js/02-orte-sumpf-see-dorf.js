// ================= Sumpf =================
// Realismus nach Vorbild gemalter Kulissen: tiefes, dunkles Wasser mit echter Spiegelung des schon gemalten Ufers (aus dem Bild gelesen,
// gestaucht und gewellt), Fresnel (vorn dunkler, hinten mehr Spiegelung), Glanzstreifen statt Umrandung; dichtes Gegenlicht-Schilf
// (unten grün, oben golden), herbstliche Farne, sonniges Lichtband am anderen Ufer vor dunklem Wald.
const WC=[440,318],inWater=(X,Y)=>((X-WC[0])/292)**2+((Y-WC[1])/64)**2<1;
function waterPath(){const pts=[];for(let i=0;i<56;i++){const a=i/56*6.283;pts.push([WC[0]+Math.cos(a)*(282+fbm(i*.35,3,2)*30),WC[1]+Math.sin(a)*(60+fbm(i*.35,9,2)*12)])}
  return new Path2D('M'+pts.map(q=>q[0].toFixed(1)+','+q[1].toFixed(1)).join('L')+'Z')}
function water(x){const p=waterPath(),top=WC[1]-66,bot=WC[1]+76,axis=top+2;x.save();x.clip(p);
  const g=x.createLinearGradient(0,top,0,bot);g.addColorStop(0,'#2a4a50');g.addColorStop(.35,'#123038');g.addColorStop(1,'#04100f');x.fillStyle=g;x.fillRect(0,top,800,bot-top);
  // Spiegelung: Bildzeilen oberhalb des Ufers gespiegelt, nach unten gestreckt und leicht gewellt
  for(let y=top;y<bot;y+=1.5){const d=y-axis,sy=axis-d*1.45-4,wob=Math.sin(y*.9+fbm(y*.05,2,2)*6)*(.6+d*.03);if(sy<0)continue;
    x.globalAlpha=Math.max(0,.92-d/220);x.drawImage(cv,0,sy*SC,W,2*SC,wob,y,800,1.6)}
  x.globalAlpha=1;
  // Fresnel: vorne sieht man mehr Tiefe (dunkel), hinten mehr Himmel/Ufer
  const fr=x.createLinearGradient(0,top,0,bot);fr.addColorStop(0,'rgba(8,30,36,.08)');fr.addColorStop(.5,'rgba(6,24,30,.32)');fr.addColorStop(1,'rgba(2,10,12,.7)');x.fillStyle=fr;x.fillRect(0,top,800,bot-top);
  // Glanzstreifen und Funkeln (Licht vom anderen Ufer)
  for(let i=0;i<120;i++){const Y=top+6+Math.pow(R(),1.6)*(bot-top-10),X=150+R()*600,l=6+R()*40*(1-(Y-top)/(bot-top)*.5);x.strokeStyle=`rgba(${R()<.5?'255,236,190':'190,220,230'},${.05+R()*.16})`;x.lineWidth=.5+R()*.8;x.beginPath();x.moveTo(X,Y);x.lineTo(X+l,Y);x.stroke()}
  x.save();x.globalCompositeOperation='lighter';for(let i=0;i<40;i++)dab(x,200+R()*500,top+8+R()*40,1.5+R()*3,[255,240,200],.5);x.restore();
  // Uferschatten innen (das Ufer wirft Schatten aufs Wasser) statt einer Umrandung
  x.lineWidth=16;x.strokeStyle='rgba(2,8,6,.55)';x.filter='blur(4px)';x.stroke(p);x.filter='none';x.restore();
  // Ufergras hängt über die Wasserkante
  for(let i=0;i<220;i++){const a=R()*6.283,rx=282+fbm(a*8.9,3,2)*30,ry=60+fbm(a*8.9,9,2)*12,X=WC[0]+Math.cos(a)*rx,Y=WC[1]+Math.sin(a)*ry,l=4+R()*9,dx=-Math.cos(a)*l*.5+(R()-.5)*3,dy=-Math.sin(a)*l*.3-l*.6;
    x.strokeStyle=rgba(mix([40,70,22],[150,150,60],R()),.9);x.lineWidth=.7+R()*.6;x.lineCap='round';x.beginPath();x.moveTo(X-dx*.3,Y-dy*.3+2);x.quadraticCurveTo(X,Y-l*.4,X+dx,Y+dy);x.stroke()}}
function lily(x,X,Y,r){const ry=r*.42,n=.32,rot=R()*6.28;ell(x,X+.8,Y+.8,r,ry,[2,8,6],.55);x.save();x.translate(X,Y);x.scale(1,ry/r);x.rotate(rot);
  const g=x.createRadialGradient(-r*.3,-r*.3,0,0,0,r);g.addColorStop(0,'#8ac050');g.addColorStop(.7,'#3e7a2a');g.addColorStop(1,'#1e4416');x.fillStyle=g;x.beginPath();x.moveTo(0,0);x.arc(0,0,r,n,6.283-n*.4);x.closePath();x.fill();
  x.strokeStyle='rgba(200,230,140,.55)';x.lineWidth=.8*r/6;x.beginPath();x.arc(0,0,r*.92,3.6,5.6);x.stroke();x.strokeStyle='rgba(20,50,16,.7)';x.lineWidth=.5;for(let k=0;k<5;k++){const a=n+k*1.1;x.beginPath();x.moveTo(0,0);x.lineTo(Math.cos(a)*r*.85,Math.sin(a)*r*.85);x.stroke()}x.restore();
  if(R()<.3){dab(x,X-r*.2,Y-r*.3,r*.9,[255,240,250],.45);for(let k=0;k<7;k++){const a=k/7*6.28;ell(x,X-r*.2+Math.cos(a)*r*.22,Y-r*.42+Math.sin(a)*r*.08,r*.24,r*.11,k%2?[255,250,252]:[240,214,226],1,a)}ell(x,X-r*.2,Y-r*.48,r*.12,r*.08,[250,206,60])}}
// Schilf: dichte, sich verjüngende Halme mit Farbverlauf (unten grün, oben golden/orange), Lichtkante im Gegenlicht, ab und zu Rohrkolben
function reeds(x,X,Y,n,h,dk){n=Math.round(n*1.6);for(let i=0;i<n;i++){const px=X+(R()-.5)*n*1.5,hh=h*(.55+R()*.65),b=(R()-.5)*hh*.32,w=(.9+R()*1.2)*(h/40)+.5,
    g=x.createLinearGradient(px,Y,px+b,Y-hh),warm=R();
  if(dk){g.addColorStop(0,'#060a04');g.addColorStop(.7,rgba(mix([14,22,10],[40,46,18],R())));g.addColorStop(1,rgba(mix([60,50,20],[110,80,30],warm)))}
  else{g.addColorStop(0,rgba(mix([28,48,16],[50,74,24],R())));g.addColorStop(.45,rgba(mix([96,118,40],[140,140,50],R())));g.addColorStop(1,rgba(mix([214,180,80],[226,128,44],warm)))}
  x.fillStyle=g;x.beginPath();x.moveTo(px-w/2,Y);x.quadraticCurveTo(px+b*.3-w*.35,Y-hh*.6,px+b,Y-hh);x.quadraticCurveTo(px+b*.3+w*.35,Y-hh*.6,px+w/2,Y);x.closePath();x.fill();
  x.strokeStyle=dk?'rgba(255,200,120,.18)':'rgba(255,236,170,.4)';x.lineWidth=Math.max(.3,w*.25);x.beginPath();x.moveTo(px+w*.3,Y-hh*.15);x.quadraticCurveTo(px+b*.3+w*.2,Y-hh*.6,px+b,Y-hh);x.stroke();
  if(R()<.16){const cx=px+b*.9,cy=Y-hh*.86,s=h/40,cg=x.createLinearGradient(cx-2*s,0,cx+2*s,0);cg.addColorStop(0,dk?'#1a0e04':'#5a2e10');cg.addColorStop(.4,dk?'#3a2210':'#a8622a');cg.addColorStop(1,'#2a1406');x.fillStyle=cg;x.beginPath();x.ellipse(cx,cy,1.7*s+.6,4.6*s+1,b/hh,0,7);x.fill()}}}
function ripple(x,X,Y,r){x.strokeStyle='rgba(220,236,230,.28)';x.lineWidth=.6;for(let k=1;k<4;k++){x.beginPath();x.ellipse(X,Y,r*k*.6,r*k*.16,0,0,7);x.stroke()}}
function swampLog(x,X,Y){shadowAt(x,X,Y+6,50,.5);x.save();x.translate(X,Y);x.rotate(-.06);wood(x,-44,-10,88,15,0);x.strokeStyle='rgba(15,8,2,.8)';x.lineWidth=.8;x.strokeRect(-44,-10,88,15);
  const g=x.createRadialGradient(-45,-3,0,-45,-3,8);g.addColorStop(0,'#b08a5a');g.addColorStop(1,'#3a2410');x.fillStyle=g;x.beginPath();x.ellipse(-45,-2.5,4.5,7.5,0,0,7);x.fill();
  for(let i=0;i<50;i++)ell(x,-40+R()*80,-10+R()*4,1+R()*2,.8+R(),mix([50,80,24],[110,140,40],R()),.85);x.restore()}
function autumnFern(x,X,Y,s){const f=S0.fol;S0.fol=[[80,30,10],[196,104,34],[244,196,90]];fern(x,X,Y,s);S0.fol=f}
function paintSumpf(){const o=S0;sky(o);far(o);ground(o);
  let x=lay();for(let i=0;i<16;i++){const X=R()*800,Y=o.hz+4+R()*40;if(R()<.4){const sh=50+R()*60;for(let k=0;k<sh;k+=3)ell(x,X,Y-sh+k,(k/sh)*15+1,2.4,[16,26,20],.9)}else deadTree(x,X,Y,80+R()*90,2.5+R()*2,'rgba(22,30,26,.94)')}
  bgRow(x,30,206,250,12,22,0);put(x,.8);
  // dunkler Wald oben, sonniges Lichtband am anderen Ufer
  x=lay();const gg=x.createLinearGradient(0,0,0,230);gg.addColorStop(0,'rgba(6,12,10,.7)');gg.addColorStop(1,'rgba(6,12,10,0)');x.fillStyle=gg;x.fillRect(0,0,800,230);put(x);
  x=lay();grass(x,6000,o.hz,500,1);details(x);dirt(x,30);put(x);
  x=lay();for(let i=0;i<26;i++)dab(x,120+R()*620,226+R()*30,40+R()*50,[255,214,120],.22);put(x,10,'screen',.9);
  // Schilf am anderen Ufer (wird im Wasser gespiegelt)
  x=lay();for(let X=150;X<740;X+=38+R()*40)reeds(x,X,262+R()*4,8+R()*8,24+R()*16);put(x);
  // Wasser mit Spiegelung, Seerosen, Steine, Stamm
  x=lay();water(x);[[180,300,190,7],[730,292,230,8],[120,334,160,6]].forEach(([X,Y,h,w])=>deadTree(x,X,Y,h,w,'#120e0a'));
  for(let i=0;i<34;i++){const X=170+R()*560,Y=262+R()*124;if(inWater(X,Y))lily(x,X,Y,(2.5+R()*4)*(.5+(Y-250)/120))}
  ell(x,290,384,34,7,[2,8,6],.6);rock(x,290,380,30,1);ripple(x,290,384,30);ell(x,460,334,22,5,[2,8,6],.6);rock(x,460,330,19,1);ripple(x,460,334,20);swampLog(x,600,384);ripple(x,600,390,40);
  reeds(x,140,330,18,52);reeds(x,746,320,16,50);reeds(x,200,392,14,44);reeds(x,690,392,16,48);reeds(x,420,394,10,34);
  // dichte goldene Schilfwände am nahen Ufer (links und rechts, der Blick auf den Weg bleibt frei)
  for(let X=150;X<246;X+=14)reeds(x,X,392+R()*6,6,62+R()*28);for(let X=672;X<760;X+=14)reeds(x,X,394+R()*6,6,66+R()*28);for(let Y=300;Y<380;Y+=14){reeds(x,152+(Y-300)*.1,Y,5,40+R()*20);reeds(x,736-(Y-300)*.1,Y,5,40+R()*20)}
  autumnFern(x,110,402,1.6);autumnFern(x,780,398,1.7);autumnFern(x,250,410,1.2);autumnFern(x,640,412,1.3);
  sign(x,176,398,1.4,[[1,0,'Sumpf der',null],[1,12,'ertrunkenen Huren',null]]);bush(x,70,420,30,0);bush(x,760,416,30,0);put(x);
  x=lay();for(let i=0;i<30;i++)dab(x,140+R()*620,270+R()*110,30+R()*40,[210,230,220],.16);put(x,8,'screen',.4);
  x=lay();sign(x,110,476,1.7,[[-1,0,'Zum Waldweg','hZG2']]);reeds(x,30,500,26,96,1);reeds(x,770,500,26,100,1);grass(x,500,470,515,2.4,1);put(x,1);
  // Leuchten: helle Stellen bekommen einen weichen Schein (Bloom)
  x=lay();x.drawImage(cv,0,0,W,H,0,0,800,500);x.globalCompositeOperation='multiply';x.drawImage(cv,0,0,W,H,0,0,800,500);x.drawImage(cv,0,0,W,H,0,0,800,500);put(x,6,'screen',.32);
  rays(o,[[-.3,.06],[0,.08]]);grade(o)}
const NYM=(hair,sk,sh,fl)=>`<g stroke="${INK}" stroke-width="1" stroke-linejoin="round" stroke-linecap="round">
<path d="M-10,-90C-19,-86 -21,-62 -23,-30C-18,-33 -14,-38 -12,-46L12,-46C14,-38 18,-33 23,-30C21,-62 19,-86 10,-90Z" fill="${hair}"/>
<path d="M-17,0C-19,-8 -12,-12 0,-12C12,-12 19,-8 17,0Z" fill="${sk}"/><path d="M-1,-1C0,-6 1,-9 3,-11" fill="none" stroke="${sh}" stroke-width=".8"/>
<path d="M-14,-10C-15,-22 -11,-34 -9,-44L9,-44C11,-34 15,-22 14,-10Z" fill="${sk}"/>
<path d="M-9,-44C-12,-52 -16,-58 -18,-62C-10,-66 10,-66 18,-62C16,-58 12,-52 9,-44Z" fill="${sk}"/>
<path d="M6,-62C12,-60 15,-56 12,-46C14,-34 15,-22 14,-10L8,-10C10,-24 9,-36 8,-46Z" fill="${sh}" stroke="none"/>
<path d="M-1,-30C-.5,-28 .5,-28 1,-30" fill="none" stroke="${sh}" stroke-width=".8"/>
<path d="M-18,-62C-23,-50 -24,-36 -22,-20L-17,-20C-18,-36 -17,-48 -14,-56Z" fill="${sk}"/><path d="M-23,-21C-25,-15 -22,-11 -18,-11C-16,-13 -16,-17 -17,-21Z" fill="${sk}"/>
<path d="M18,-62C24,-70 26,-80 20,-88L16,-85C19,-79 18,-71 14,-62Z" fill="${sh}"/>
<path d="M-3,-66L-3,-72L3,-72L3,-66Z" fill="${sk}"/>
<path d="M-8,-82C-9,-74 -5,-70 0,-70C5,-70 9,-74 8,-82C8,-90 4,-94 0,-94C-4,-94 -8,-90 -8,-82Z" fill="${sk}"/>
<path d="M3,-93C7,-90 8,-86 8,-82C9,-76 6,-71 1,-70C5,-74 6,-79 5,-84C5,-88 4,-91 3,-93Z" fill="${sh}" stroke="none"/>
<path d="M-6,-83C-5,-81.6 -3,-81.6 -2,-83M2,-83C3,-81.6 5,-81.6 6,-83" fill="none" stroke-width=".9"/><path d="M-6,-83l-1,-.8M6,-83l1,-.8" stroke-width=".6"/>
<path d="M-6.5,-86C-5,-87 -3,-87 -2,-86.4M2,-86.4C3,-87 5,-87 6.5,-86" fill="none" stroke="#3a3020" stroke-width=".6"/>
<path d="M0,-82L-.8,-78.6L.8,-78.4" fill="none" stroke-width=".6"/>
<path d="M-2.2,-75.6C-1,-76.4 1,-76.4 2.2,-75.6C1,-74.4 -1,-74.4 -2.2,-75.6Z" fill="#a85a5a" stroke-width=".5"/>
<path d="M-8,-88C-12,-76 -10,-60 -4,-46C-2,-40 -6,-34 -8,-26C-1,-31 2,-40 0,-50C-2,-62 -3,-76 -2,-90Z" fill="${hair}"/>
<path d="M8,-88C12,-76 10,-60 4,-46C2,-40 6,-34 8,-26C1,-31 -2,-40 0,-50C2,-62 3,-76 2,-90Z" fill="${hair}"/>
<path d="M-9,-83C-10,-94 -4,-99 0,-99C4,-99 10,-94 9,-83C7,-89 3,-91 0,-91C-3,-91 -7,-89 -9,-83Z" fill="${hair}"/>
<path d="M-6,-80C-8,-68 -6,-56 -3,-48M6,-80C8,-68 6,-56 3,-48" fill="none" stroke="rgba(255,255,255,.3)" stroke-width=".6"/>
<ellipse cx="18" cy="-88" rx="3" ry="2.5" fill="${sh}"/>
${fl?'<circle cx="-7" cy="-92" r="2.6" fill="#f4f0f4" stroke-width=".6"/><circle cx="-7" cy="-92" r="1" fill="#f0d040" stroke="none"/>':''}</g>`;
// ================= Birkensperre =================
const FL={};
function fallen(x,X,Y,ang,len,w){for(let i=0;i<18;i++){const a=R()*6.28,l=5+R()*12;x.strokeStyle=`rgba(${50+R()*30},${36+R()*20},20,.9)`;x.lineWidth=1+R()*2;x.beginPath();x.moveTo(X,Y);x.lineTo(X+Math.cos(a)*l,Y+Math.sin(a)*l*.8);x.stroke()}
  dab(x,X,Y+2,w*1.2,[40,30,18],.85);shadowAt(x,X+Math.sin(ang)*len*.5,Y+8,len*.55,.35);x.save();x.translate(X,Y);x.rotate(ang);birch(x,0,0,w,0,-len);x.restore()}
function logPiece(x,X,Y,len,w){x.save();x.translate(X,Y);x.rotate(1.57+(R()-.5)*.08);birch(x,0,0,w,0,-len);
  [[0,w*.5],[-len,w*.32]].forEach(([yy,rx])=>{const g=x.createRadialGradient(0,yy,0,0,yy,rx*1.2);g.addColorStop(0,'#ecd09c');g.addColorStop(.75,'#c8a068');g.addColorStop(1,'#5a4028');x.fillStyle=g;x.beginPath();x.ellipse(0,yy,rx,rx*.55,0,0,7);x.fill()});x.restore()}
const cxS=y=>452-(y-250)*.19,opS=y=>60+(y-200)*.75;
function fir(x,X,b,h,w,lt){const k0=[5,10,8],k1=[22+lt*22,36+lt*26,28+lt*12];x.fillStyle='#0a0b08';x.fillRect(X-w*.03-1,b-h*.5,w*.06+2,h*.5);
  for(let y=0;y<h*.95;y+=2.5){const t=y/h,Y=b-h+y,ww=(t*.92+.08)*w*.5*(.8+R()*.35);
    for(const s of[-1,1]){x.strokeStyle=rgba(mix(k0,k1,R()*.5),.95);x.lineWidth=1.2+t*w*.025;x.beginPath();x.moveTo(X,Y);x.quadraticCurveTo(X+s*ww*.5,Y-1,X+s*ww,Y+4+t*w*.06);x.stroke()}}
  for(let i=0;i<h*w/150;i++){const t=Math.sqrt(R()),Y=b-h+t*h*.94,ww=(t*.92+.08)*w*.5,ox=(R()*2-1)*ww;ell(x,X+ox,Y+Math.abs(ox)/w*8,1+t*w*.03,.6+t*w*.012,mix(k0,k1,cl(.35+ox/w+R()*.4)),.9,R())}}
function trunk(x,X,b,w){const g=x.createLinearGradient(X-w/2,0,X+w/2,0);g.addColorStop(0,'#0a0b08');g.addColorStop(.62,'#34322a');g.addColorStop(1,'#12120e');x.fillStyle=g;
  x.beginPath();x.moveTo(X-w*.8,b+2);x.quadraticCurveTo(X-w*.5,b-w*.6,X-w*.45,b-w*2);x.lineTo(X-w*.4,-12);x.lineTo(X+w*.4,-12);x.lineTo(X+w*.45,b-w*2);x.quadraticCurveTo(X+w*.5,b-w*.6,X+w*.8,b+2);x.fill();
  for(let i=0;i<(b+12)/2.5;i++){const yy=-12+R()*(b+12),xx=X+(R()-.5)*w*.8;x.strokeStyle=R()<.5?'rgba(90,86,66,.3)':'rgba(0,0,0,.45)';x.lineWidth=.5+R()*w*.05;x.beginPath();x.moveTo(xx,yy);x.lineTo(xx+(R()-.5)*1.5,yy+5+R()*12);x.stroke()}
  for(let i=0;i<w*.6;i++)ell(x,X-w*.3+(R()-.5)*w*.4,b-R()*w*3,1+R()*w*.06,.8+R()*w*.04,mix([24,40,16],[56,76,30],R()),.8,R())}
function wallItem(x,[b,X,r]){const t=(b-200)/300;
  if(r<.5)fir(x,X,b,150+t*560,40+t*170,cl(.6-t));else if(r<.82)trunk(x,X,b,5+t*42);else birch(x,X,b,4+t*30,(R()-.5)*10,-12);
  if(R()<.7)bush(x,X+(R()-.5)*40*t,b+2,8+t*34,1);
  for(let i=0;i<3+t*6;i++){x.strokeStyle='rgba(14,12,8,.85)';x.lineWidth=.6+t*1.6;const a=X+(R()-.5)*60*(t+.3),yy=b-R()*30*(t+.3);x.beginPath();x.moveTo(a,yy);x.bezierCurveTo(a+(R()-.5)*40,yy-R()*30,a+(R()-.5)*50,yy+R()*10,a+(R()-.5)*70*(t+.3),yy-R()*20);x.stroke()}}
function fog(y1,a){const x=lay(),g=x.createLinearGradient(0,0,0,y1+20);g.addColorStop(0,`rgba(10,16,16,${a})`);g.addColorStop(.85,`rgba(14,22,20,${a})`);g.addColorStop(1,'rgba(14,22,20,0)');x.fillStyle=g;x.fillRect(0,0,800,y1+20);put(x)}
function paintSperre(){const o=S0;sky(o);far(o);ground(o);
  const IT=[];for(let i=0;i<110;i++){const b=212+Math.pow(R(),.85)*272,s=R()<.5?-1:1,e=cxS(b)+s*opS(b),X=e+s*Math.pow(R(),1.3)*(s<0?e+40:840-e);if(s>0&&b>350&&X<800)continue;IT.push([b,X,R()])}
  for(let X=330;X<580;X+=8+R()*12)if(Math.abs(X-452)>26)IT.push([206+R()*22,X,.6]);IT.sort((a,b)=>a[0]-b[0]);
  let x=lay();IT.filter(i=>i[0]<290).forEach(i=>wallItem(x,i));put(x,.7);fog(290,.38);
  x=lay();grass(x,5000,o.hz,500,1);details(x);leavesOnPath(x,60);put(x);
  x=lay();IT.filter(i=>i[0]>=290&&i[0]<390).forEach(i=>wallItem(x,i));put(x,.3);fog(390,.22);
  x=lay();sign(x,520,330,1.2,[[1,0,'Zum Sumpf','hSumpf2']]);sign(x,640,440,1.3,[[1,0,'Zum Fischerhaus','hFisch']]);
  if(!FL.cut){[[255,356,1.8,320,17],[650,340,-1.34,320,16],[292,322,1.36,280,12],[618,374,-1.84,300,15],[372,318,1.66,190,10],[470,392,-1.15,150,11]].forEach(a=>fallen(x,...a));
    [[330,338,-1.3],[450,330,-1.6],[560,350,-1.1],[500,322,-1.9],[420,372,-1.4]].forEach(([a,b,ang])=>{x.strokeStyle='#4a4236';x.lineWidth=1.6;x.beginPath();x.moveTo(a,b);x.lineTo(a+Math.cos(ang)*16,b+Math.sin(ang)*14);x.stroke();foliage(x,a+Math.cos(ang)*16,b+Math.sin(ang)*14,9)})}
  else{[[255,352],[650,344]].forEach(([X,Y])=>{dab(x,X,Y+2,18,[40,30,18],.85);for(let i=0;i<14;i++){const a=R()*6.28,l=5+R()*10;x.strokeStyle='rgba(60,42,22,.9)';x.lineWidth=1.5;x.beginPath();x.moveTo(X,Y);x.lineTo(X+Math.cos(a)*l,Y+Math.sin(a)*l*.8);x.stroke()}});
    for(let i=0;i<5;i++)logPiece(x,266+(i%2)*6,404-i*10,52,14);for(let i=0;i<4;i++)logPiece(x,584+(i%2)*5,402-i*10,48,13);
    for(let i=0;i<70;i++)ell(x,380+R()*130,356+R()*36,1+R()*1.6,.6+R(),[228,204,152],.85)}
  IT.filter(i=>i[0]>=390).forEach(i=>wallItem(x,i));
  rock(x,520,440,14,1);fern(x,330,452,1.5);fern(x,560,458,1.6);shrooms(x,262,446,4);put(x);
  x=lay();for(let X=-20;X<830;X+=24){if(Math.abs(X-450)<50&&R()<.75)continue;foliage(x,X,R()*70-24,34+R()*18,1)}
  for(let i=0;i<14;i++)hang(x,R()*800,30+R()*30,30+R()*60);put(x,.5);
  x=lay();trunk(x,22,520,70);trunk(x,792,516,62);fir(x,-40,530,560,260,0);bush(x,90,500,46,1);bush(x,740,500,50,1);
  sign(x,196,478,1.7,[[-1,0,'Zur Weggabelung','hZG3']]);grass(x,700,470,515,2.4,1);put(x,.8);
  rays(o,[[.04,.05],[-.06,.03]]);
  x=lay();let g=x.createRadialGradient(445,400,30,445,370,540);g.addColorStop(0,'rgb(236,240,230)');g.addColorStop(.45,'rgb(130,140,138)');g.addColorStop(1,'rgb(58,66,76)');x.fillStyle=g;x.fillRect(0,0,800,500);put(x,0,'multiply');
  x=lay();for(let i=0;i<26;i++)dab(x,300+R()*300,250+R()*130,30+R()*40,[150,180,170],.18);put(x,10,'screen',.5);
  x=lay();dab(x,840,410,190,[180,205,195],.55);put(x,6,'screen');grade(o)}
// ================= Fischerhaus am See =================
const LAKE='M232,200C252,272 300,318 400,326C520,334 680,344 830,352L830,200Z';
function lake(x,LP=LAKE,SH=LAKE.split('L830')[0]){const p=new Path2D(LP),sh=new Path2D(SH);x.lineWidth=12;x.strokeStyle='rgba(34,28,18,.85)';x.stroke(sh);x.lineWidth=5;x.strokeStyle='rgba(100,90,64,.6)';x.stroke(sh);
  const g=x.createLinearGradient(0,200,0,352);g.addColorStop(0,'#a8acaa');g.addColorStop(.25,'#6c7c82');g.addColorStop(1,'#1e2c30');x.fillStyle=g;x.fill(p);
  x.save();x.clip(p);x.save();x.translate(0,400);x.scale(1,-1);for(let k=0;k<7;k++){x.globalAlpha=.55*(1-k/7);const y=190-k*10;x.drawImage(cv,0,y*SC,W,10*SC,0,y,800,10)}x.restore();
  for(let i=0;i<200;i++){const Y=202+Math.pow(R(),1.4)*150,X=230+R()*600,l=8+R()*50*(Y-190)/100;x.strokeStyle=`rgba(210,216,214,${.04+R()*.12})`;x.lineWidth=.5+R()*(Y-200)/80;x.beginPath();x.moveTo(X,Y);x.lineTo(X+l,Y);x.stroke()}
  for(let i=0;i<120;i++){const Y=202+Math.pow(R(),1.3)*150,X=230+R()*600;x.strokeStyle=`rgba(10,18,20,${.1+R()*.2})`;x.lineWidth=.6+R();x.beginPath();x.moveTo(X,Y);x.lineTo(X+10+R()*30,Y);x.stroke()}
  for(let i=0;i<260;i++){const Y=202+Math.pow(R(),1.5)*140,X=640+(R()-.5)*(10+(Y-200)*1.3);ell(x,X,Y,1.5+R()*5,.5,[255,226,180],.25+R()*.45)}
  [[470,300,7],[500,316,9],[430,312,6],[760,320,8],[790,336,10],[360,318,6]].forEach(([X,Y,r])=>lily(x,X,Y,r));x.restore()}
function pier(x){const a=[700,384],b=[556,296],v=[.96,-.28],aw=44,bw=26,P=(t,s)=>{const w=aw+(bw-aw)*t;return[a[0]+(b[0]-a[0])*t+v[0]*w/2*s,a[1]+(b[1]-a[1])*t+v[1]*w/2*s]};
  for(let t=0;t<=1.001;t+=.25)for(const s of[1,-1]){const[X,Y]=P(t,s),h=10+(1-t)*10;if(s<0&&t<.9)continue;x.fillStyle='#1e1810';x.fillRect(X-1.5-(1-t)*1.5,Y,3+(1-t)*3,h+8);ripple(x,X,Y+h+8,6+(1-t)*6)}
  const A1=P(0,-1),A2=P(0,1),B1=P(1,-1),B2=P(1,1);x.fillStyle='#2a2218';x.beginPath();x.moveTo(...A2);x.lineTo(...B2);x.lineTo(B2[0],B2[1]+5);x.lineTo(A2[0],A2[1]+9);x.fill();
  x.beginPath();x.moveTo(...B1);x.lineTo(...B2);x.lineTo(B2[0],B2[1]+5);x.lineTo(B1[0],B1[1]+5);x.fill();
  const dk=new Path2D(`M${A1}L${B1}L${B2}L${A2}Z`);x.save();x.clip(dk);x.fillStyle='#7a6c58';x.fill(dk);
  for(let i=0;i<60;i++){const t=i/60,[X1,Y1]=P(t,-1),[X2,Y2]=P(t,1);x.strokeStyle=R()<.25?'rgba(20,14,8,.8)':`rgba(${150+R()*50},${136+R()*40},${110+R()*30},.35)`;x.lineWidth=.6+(1-t);x.beginPath();x.moveTo(X1,Y1);x.lineTo(X2,Y2);x.stroke()}x.restore();
  x.strokeStyle='rgba(20,14,8,.8)';x.lineWidth=.8;x.stroke(dk)}
function fisherHut(x,o={}){const B=348;shadowAt(x,150,B+4,150,.6);
  const side=new Path2D(`M230,${B}L230,230L276,206L276,${B-26}Z`);x.save();x.clip(side);wood(x,228,200,50,150,0);for(let y=B;y>200;y-=10){x.strokeStyle='rgba(16,10,4,.85)';x.lineWidth=1;x.beginPath();x.moveTo(230,y);x.lineTo(276,y-24);x.stroke()}x.fillStyle='rgba(0,0,0,.4)';x.fill(side);x.restore();
  for(let y=B-10;y>=230;y-=10){wood(x,30,y,200,10,0);x.strokeStyle='rgba(16,10,4,.9)';x.lineWidth=1.2;x.beginPath();x.moveTo(28,y);x.lineTo(232,y);x.stroke();
    for(const X of[30,230]){const g=x.createRadialGradient(X-1,y+4,0,X,y+5,6);g.addColorStop(0,'#c8a070');g.addColorStop(.7,'#7a5430');g.addColorStop(1,'#2a1a0a');x.fillStyle=g;x.beginPath();x.arc(X,y+5,5.4,0,7);x.fill()}}
  const gab=new Path2D('M30,230L130,162L230,230Z');x.save();x.clip(gab);for(let X=30;X<230;X+=8){wood(x,X,160,8,72,1);x.fillStyle='rgba(16,10,4,.8)';x.fillRect(X,160,.8,72)}x.restore();
  const roof=new Path2D('M130,158L176,134L292,212L246,238Z');x.save();x.clip(roof);planks(x,[130,158],[176,134],[246,238],[292,212],11,.4);for(let i=0;i<40;i++){const t=i/40;x.strokeStyle=R()<.4?'rgba(10,8,4,.25)':'rgba(120,108,84,.1)';x.lineWidth=1.4;x.beginPath();x.moveTo(130+46*t,158-24*t);x.lineTo(246+46*t,238-24*t);x.stroke()}
  for(let i=0;i<120;i++)ell(x,140+R()*140,150+R()*80,1+R()*3,.8+R()*2,mix([40,60,20],[90,110,40],R()),.7,R());x.restore();
  // Tiefe: Schatten unter den Giebelbrettern und unter dem Dachüberstand an der Seitenwand
  x.save();x.clip(gab);x.strokeStyle='rgba(0,0,0,.42)';x.lineWidth=20;x.beginPath();x.moveTo(14,240);x.lineTo(130,156);x.lineTo(248,240);x.stroke();x.restore();
  x.save();x.clip(side);{const sg=x.createLinearGradient(253,214,253,262);sg.addColorStop(0,'rgba(0,0,0,.7)');sg.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=sg;x.fillRect(226,200,54,64)}x.restore();
  {const ag=x.createLinearGradient(0,B-26,0,B);ag.addColorStop(0,'rgba(0,0,0,0)');ag.addColorStop(1,'rgba(0,0,0,.45)');x.fillStyle=ag;x.fillRect(26,B-26,252,26)}
  x.lineCap='round';x.strokeStyle='#1a140c';x.lineWidth=7;x.beginPath();x.moveTo(14,240);x.lineTo(130,156);x.lineTo(248,240);x.stroke();x.strokeStyle='#b8b4a4';x.lineWidth=4;x.stroke();
  for(let t=.1;t<.95;t+=.12)for(const s of[-1,1]){const X=130+s*116*t,Y=156+84*t;x.fillStyle='#b8b4a4';x.beginPath();x.arc(X+s*1,Y+4,2.4,0,Math.PI);x.fill()}
  x.fillStyle='#e8dcc0';x.beginPath();x.arc(130,196,8,0,7);x.fill();x.fillStyle='#4a6a8a';x.beginPath();x.arc(130,196,5,0,7);x.fill();
  x.fillStyle='#1c140c';x.fillRect(56,262,46,86);for(let X=58;X<100;X+=8){wood(x,X,264,7,84,1)}x.fillStyle='rgba(0,0,0,.35)';x.fillRect(58,264,42,84);ell(x,92,306,2,2,[30,26,20]);
  const wg=x.createRadialGradient(176,276,2,176,276,26);wg.addColorStop(0,o.win?'#4a525a':'#ffd890');wg.addColorStop(1,o.win?'#101418':'#a8601c');x.fillStyle=wg;x.fillRect(158,260,36,32);x.fillStyle='rgba(0,0,0,.4)';x.fillRect(158,260,36,4);x.fillRect(158,260,4,32);x.strokeStyle='rgba(255,255,255,.22)';x.lineWidth=3;x.beginPath();x.moveTo(162,288);x.lineTo(172,264);x.moveTo(180,288);x.lineTo(190,264);x.stroke();x.fillStyle='#2a1a0c';x.fillRect(175,260,2,32);x.fillRect(158,275,36,2);
  x.fillStyle=o.trim||'#5a7aa0';x.fillRect(152,254,48,6);x.fillRect(152,292,48,6);x.fillRect(152,254,6,44);x.fillRect(194,254,6,44);x.fillStyle='#c8c4b4';x.beginPath();x.moveTo(150,254);x.lineTo(176,240);x.lineTo(202,254);x.fill();
  if(o.win=='board'){x.save();x.translate(176,276);[.5,-.45].forEach(a=>{x.save();x.rotate(a);wood(x,-30,-4,60,8,0);x.restore()});x.restore()}if(!o.win){x.save();x.globalCompositeOperation='lighter';dab(x,176,280,50,[255,170,70],.25);x.restore()}
  x.fillStyle='#3a3028';x.fillRect(196,170,16,40);x.fillStyle='#2a221a';x.fillRect(194,166,20,6);if(o.smoke!==0)for(let i=0;i<14;i++)dab(x,204+i*4+R()*4,160-i*9,6+i*1.6,[170,172,170],.16)}
function boat(x,X,Y){shadowAt(x,X,Y+3,70,.6);const p=new Path2D(`M${X-58},${Y}C${X-52},${Y-26} ${X+38},${Y-30} ${X+60},${Y-4}L${X+56},${Y}Z`);x.save();x.clip(p);wood(x,X-60,Y-32,122,34,0);
  for(let k=1;k<5;k++){x.strokeStyle='rgba(12,8,4,.8)';x.lineWidth=1;x.beginPath();x.moveTo(X-58+k*2,Y-k*1);x.quadraticCurveTo(X,Y-6-k*6,X+58-k*1.5,Y-4-k*.5);x.stroke()}x.fillStyle='rgba(10,10,10,.35)';x.fill(p);
  dab(x,X+10,Y-14,8,[0,0,0],.9);x.restore();x.strokeStyle='#120c06';x.lineWidth=1;x.stroke(p);x.save();x.translate(X+40,Y+6);x.rotate(-.2);wood(x,0,-2,50,3.5,0);x.fillStyle='#4a3218';x.fillRect(46,-5,12,9);x.restore()}
function netRack(x){[[268,372],[338,366]].forEach(([X,Y])=>{shadowAt(x,X,Y,10);wood(x,X-2,Y-80,4,80,1)});x.strokeStyle='#3a2a18';x.lineWidth=2;x.beginPath();x.moveTo(266,294);x.lineTo(340,288);x.stroke();
  x.strokeStyle='rgba(190,180,150,.75)';x.lineWidth=.6;for(let i=0;i<=14;i++){const t=i/14,X=268+70*t,Y=293-6*t;x.beginPath();x.moveTo(X,Y);x.quadraticCurveTo(X+(R()-.5)*4,Y+30,X+(R()-.5)*6+Math.sin(t*3)*3,Y+52+Math.sin(t*3.1)*12);x.stroke()}
  for(let r=1;r<10;r++){x.beginPath();for(let i=0;i<=14;i++){const t=i/14;x.lineTo(268+70*t+(R()-.5),293-6*t+r*5.6+Math.sin(t*3.1)*r*1.3)}x.stroke()}
  for(let i=0;i<6;i++)ell(x,272+i*13,290-i*1.1,2,1.3,[210,100,40])}
function paintFischer(){const o=S0;sky(o);far(o);ground(o);
  let x=lay();grass(x,6000,o.hz,500,1);details(x);dirt(x,30);put(x);
  x=lay();lake(x);put(x);
  x=lay();for(let i=0;i<30;i++)dab(x,240+R()*580,200+R()*60,30+R()*50,[190,196,196],.25);put(x,8,'screen',.6);
  x=lay();[[250,286,8,26],[300,322,10,32],[470,334,12,30],[540,340,9,28],[760,356,14,36],[810,360,10,30]].forEach(a=>reeds(x,...a));
  fisherHut(x);netRack(x);boat(x,400,380);pier(x);bush(x,330,352,16,0);bush(x,24,360,22,1);rock(x,470,372,10,1);rock(x,620,452,14,1);fern(x,240,450,1.4);shrooms(x,300,392,4);bucket(x,120,372);
  sign(x,110,482,1.7,[[-1,0,'Zum dunklen Wald','hZD']]);sign(x,690,476,1.3,[[1,0,'Zum Ufer','hUfer']]);put(x);
  x=lay();trunk(x,-6,520,60);fir(x,812,540,560,230,.3);bush(x,760,498,44,1);reeds(x,620,500,20,70,1);grass(x,600,470,515,2.4,1);put(x,1);
  rays(o,[[.4,.06]]);grade(o)}
const FISHER=`<g stroke="#2a1a0e" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round">
<defs><pattern id="nm" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><path d="M0,0H5M0,0V5" stroke="#d2c69c" stroke-width=".8"/></pattern></defs>
<path d="M-60,0L-60,-24C-60,-28 -57,-29 -57,-32L-57,-41L-52,-41L-52,-32C-52,-29 -49,-28 -49,-24L-49,0Z" fill="#3c6a40"/><path d="M-58,-22V-4" stroke="#a8d0a0" stroke-width="1.2"/><path d="M-59,-18H-50V-9H-59Z" fill="#e2d8b4" stroke-width=".7"/><path d="M-57.4,-42H-51.6V-45H-57.4Z" fill="#8a5a2a"/>
<path d="M44,0L41,-22L67,-22L64,0Z" fill="#6c6e72"/><path d="M41,-22C46,-25 62,-25 67,-22" fill="none" stroke="#9a9ca0" stroke-width="1"/><path d="M43,-14H65" fill="none" stroke="#4a4c50" stroke-width="1"/><path d="M47,-20C50,-14 50,-6 48,-2" fill="none" stroke="#8a8c90" stroke-width=".6"/>
<path d="M50,-22L44,-36L51,-31L55,-38L56,-23" fill="#9aa8a0"/><path d="M47,-31L52,-28" fill="none" stroke="#6a7870" stroke-width=".6"/>
<path d="M-30,4L-28,48C-30,56 -31,64 -30,70C-34,72 -36,76 -34,80L-10,80C-9,74 -10,66 -12,60L-12,8Z" fill="#2e4232"/>
<path d="M30,4L28,48C30,56 31,64 30,70C34,72 36,76 34,80L10,80C9,74 10,66 12,60L12,8Z" fill="#26382a"/>
<path d="M-34,80L-10,80L-10,83L-35,83Z" fill="#121614"/><path d="M10,80L34,80L35,83L10,83Z" fill="#121614"/>
<path d="M-26,20C-26,34 -27,46 -28,56M24,22C25,36 26,48 27,56" fill="none" stroke="#1c2a20" stroke-width=".9"/><path d="M-28,50L-12,52M28,50L12,52" fill="none" stroke="#4e6a54" stroke-width="1.6"/>
<path d="M-36,-8C-38,4 -34,12 -26,14L26,14C34,12 38,4 36,-8Z" fill="#3c4234"/>
<path d="M-38,-74C-44,-56 -44,-30 -38,-6L38,-6C44,-30 44,-56 38,-74C26,-86 -26,-86 -38,-74Z" fill="#4e5444"/>
<path d="M22,-82C34,-76 40,-62 41,-44C42,-28 40,-16 38,-6L24,-6C28,-24 30,-50 22,-82Z" fill="#3c4234" stroke="none"/>
<path d="M-40,-62C-14,-58 14,-58 40,-62M-42,-48C-14,-44 14,-44 42,-48M-42,-34C-14,-30 14,-30 42,-34M-40,-20C-14,-16 14,-16 40,-20" fill="none" stroke="#2c3226" stroke-width=".8"/>
<path d="M-38,-10C-14,-6 14,-6 38,-10" fill="none" stroke="#8a7650" stroke-width="2.4"/><path d="M-4,-8C-6,-2 -6,4 -4,8M-2,-8C0,-2 2,2 4,6" fill="none" stroke="#8a7650" stroke-width="1.6"/>
<path d="M-30,-40C-30,-36 -22,-34 -18,-36C-17,-42 -20,-46 -26,-46C-29,-45 -30,-43 -30,-40Z" fill="#6a5e44" stroke-width=".9"/><path d="M-28,-44l1,1M-20,-44l-1,1M-28,-37l1,-1M-20,-37l-1,-1" fill="none" stroke="#c8b890" stroke-width=".5"/>
<path d="M-22,-34C-10,-38 10,-38 22,-32C34,-12 40,22 44,64C30,70 14,68 4,62C2,34 -4,6 -18,-4C-24,-12 -26,-24 -22,-34Z" fill="url(#nm)" stroke="#a89a70" stroke-width=".9"/>
<path d="M-18,-4C-20,10 -16,30 -10,52C-16,56 -24,56 -28,52C-30,30 -28,10 -22,-4Z" fill="url(#nm)" stroke="#a89a70" stroke-width=".9"/>
<g stroke="#5a2a10" stroke-width=".7"><ellipse cx="40" cy="44" rx="3.4" ry="2.2" fill="#d8642a"/><ellipse cx="30" cy="60" rx="3.4" ry="2.2" fill="#c85a24"/><ellipse cx="-14" cy="-14" rx="3.4" ry="2.2" fill="#d8642a"/><ellipse cx="-22" cy="44" rx="3" ry="2" fill="#c85a24"/></g>
<path d="M-38,-74C-50,-58 -50,-36 -38,-22L-20,-18L-20,-30L-30,-34C-34,-48 -32,-62 -28,-70Z" fill="#4e5444"/>
<path d="M38,-74C50,-58 50,-36 38,-24L20,-20L20,-32L30,-36C34,-50 32,-62 28,-70Z" fill="#3c4234"/>
<path d="M-44,-46C-40,-44 -36,-44 -33,-46M44,-48C40,-46 36,-46 33,-48" fill="none" stroke="#2c3226" stroke-width=".8"/>
<path d="M-22,-30C-28,-30 -32,-26 -31,-21C-30,-16 -24,-14 -18,-16C-12,-17 -10,-22 -12,-26C-14,-29 -18,-30 -22,-30Z" fill="#b88262"/><path d="M-20,-22C-17,-20 -14,-20 -12,-22M-21,-18C-18,-16 -15,-16 -13,-18" fill="none" stroke="#7a4a30" stroke-width=".7"/>
<path d="M22,-32C28,-32 32,-28 31,-23C30,-18 24,-16 18,-18C12,-19 10,-24 12,-28C14,-31 18,-32 22,-32Z" fill="#a87456"/><path d="M14,-24C17,-22 20,-22 22,-24M15,-20C18,-18 21,-18 23,-20" fill="none" stroke="#7a4a30" stroke-width=".7"/>
<path d="M-8,-90L-8,-82C-4,-80 4,-80 8,-82L8,-90Z" fill="#b88262"/>
<path d="M-16,-102C-18,-94 -16,-88 -12,-84C-8,-80 -4,-78 0,-78C4,-78 8,-80 12,-84C16,-88 18,-94 16,-102C14,-112 10,-118 0,-118C-10,-118 -14,-112 -16,-102Z" fill="#c89070"/>
<path d="M8,-116C14,-110 17,-102 16,-94C15,-88 12,-84 8,-81C12,-90 13,-104 8,-116Z" fill="#a87456" stroke="none"/>
<path d="M-17,-104C-21,-106 -23,-100 -21,-96C-20,-94 -18,-94 -17,-95Z" fill="#c89070"/><path d="M17,-104C21,-106 23,-100 21,-96C20,-94 18,-94 17,-95Z" fill="#a87456"/>
<path d="M-15,-98C-18,-88 -14,-74 -10,-62C-8,-54 -4,-44 0,-38C4,-44 8,-54 10,-62C14,-74 18,-88 15,-98C12,-92 6,-89 0,-90C-6,-89 -12,-92 -15,-98Z" fill="#c4c0b6"/>
<path d="M4,-90C10,-86 14,-80 12,-70C10,-60 6,-50 0,-38C4,-50 6,-64 4,-90Z" fill="#a8a49a" stroke="none"/>
<path d="M-8,-84C-7,-74 -5,-62 -2,-50M-2,-86C-1,-74 0,-62 0,-48M5,-84C4,-72 3,-62 2,-52M-12,-88C-11,-78 -8,-68 -6,-60M10,-88C9,-78 7,-68 5,-60" fill="none" stroke="#8a867c" stroke-width=".6"/>
<path d="M-10,-94C-6,-98 -2,-97 0,-95C2,-97 6,-98 10,-94C8,-90 4,-89 0,-91C-4,-89 -8,-90 -10,-94Z" fill="#b0aca2"/>
<path d="M-2,-104C-5,-100 -6,-97 -4,-95C-2,-94 1,-94 2,-95C4,-95 4,-97 3,-99C2,-101 1,-103 0,-105Z" fill="#c0685a"/><ellipse cx="-2" cy="-99" rx="1.2" ry=".9" fill="#f0a8a0" stroke="none"/>
<path d="M-11,-106C-9,-107.4 -6,-107.4 -4,-106" fill="none" stroke-width="1.3"/><path d="M4,-106C6,-107.4 9,-107.4 11,-106" fill="none" stroke-width="1.3"/>
<path d="M-11,-104C-9,-103 -6,-103 -4,-104M4,-104C6,-103 9,-103 11,-104" fill="none" stroke="#8a5a40" stroke-width=".6"/>
<path d="M-12,-110C-9,-112 -5,-112 -2,-110.6M2,-110.6C5,-112 9,-112 12,-110" fill="none" stroke="#9a968c" stroke-width="2.2"/>
<path d="M-6,-115C-2,-116 2,-116 6,-115" fill="none" stroke="#a8745a" stroke-width=".55"/>
<path d="M5,-93L17,-89" stroke="#ece6d8" stroke-width="2.2"/><path d="M5,-93L8,-92" stroke="#c8a870" stroke-width="2.2"/><circle cx="17.6" cy="-88.8" r="1.4" fill="#ff7030" stroke="none"/>
<path d="M18,-92C16,-98 20,-102 18,-108C16,-112 20,-116 19,-120" fill="none" stroke="#d8d6d0" stroke-width="1" opacity=".7"/>
<path d="M-20,-112L-24,-90C-24,-86 -20,-84 -16,-86L-14,-108Z" fill="#6a5644"/><path d="M20,-112L24,-90C24,-86 20,-84 16,-86L14,-108Z" fill="#584634"/>
<path d="M-22,-102L-20,-92M22,-102L20,-92" fill="none" stroke="#4a3a2a" stroke-width=".7"/>
<path d="M-20,-110C-22,-128 -12,-136 0,-136C12,-136 22,-128 20,-110Z" fill="#5a4a3a"/>
<path d="M8,-134C16,-130 21,-122 20,-110L12,-110C14,-118 13,-126 8,-134Z" fill="#46382a" stroke="none"/>
<path d="M-22,-116C-12,-122 12,-122 22,-116L21,-108C12,-113 -12,-113 -21,-108Z" fill="#7a6650"/>
<path d="M-12,-128l2,-4M-5,-132l1,-3M4,-131l-1,-3M12,-126l-2,-3M-16,-114l1,-2M-6,-116l0,-2M6,-116l0,-2M16,-114l-1,-2" fill="none" stroke="#3a2e22" stroke-width=".7"/>
</g>`;
// ================= Dorf =================
function izba(x,cx,B,s,flip,o){x.save();x.translate(cx,B);x.scale(flip?-s:s,s);x.translate(-130,-348);fisherHut(x,o);x.restore()}
function mud(x,X,Y,rx){ell(x,X,Y,rx+3,rx*.3+1.5,[44,34,22],.85);const g=x.createLinearGradient(0,Y-rx*.3,0,Y+rx*.3);g.addColorStop(0,'rgba(90,96,104,.95)');g.addColorStop(.5,'rgba(176,180,182,.8)');g.addColorStop(1,'rgba(60,62,66,.95)');
  x.fillStyle=g;x.beginPath();x.ellipse(X,Y,rx,rx*.28,0,0,7);x.fill();ell(x,X-rx*.3,Y-rx*.05,rx*.4,rx*.05,[230,232,230],.4)}
function charWall(x,pts){const p=new Path2D('M'+pts.map(q=>q[0].toFixed(1)+','+q[1].toFixed(1)).join('L')+'Z');x.save();x.clip(p);x.fillStyle='#1a1614';x.fill(p);
  for(let y=4;y>-260;y-=9){x.fillStyle='rgba(70,64,58,.5)';x.fillRect(-160,y,320,1.2);x.fillStyle='rgba(0,0,0,.9)';x.fillRect(-160,y+1.2,320,1.6)}
  for(let i=0;i<500;i++){const X=-150+R()*300,Y=-R()*240;x.fillStyle=R()<.5?'rgba(110,100,92,.35)':'rgba(0,0,0,.6)';x.fillRect(X,Y,.8+R()*3,.6)}
  for(let i=0;i<40;i++)ell(x,-150+R()*300,-R()*200,1+R()*2,.8,[150,60,30],.25);x.restore()}
function ruin(x,cx,B,s){shadowAt(x,cx,B+4,160*s,.5);x.save();x.translate(cx,B);x.scale(-s,s);
  for(let i=0;i<70;i++)dab(x,-120+R()*280,-14+R()*24,10+R()*22,R()<.5?[24,22,20]:[96,92,86],.5);
  const top=(a,b,y0,y1,h0,h1,n)=>{const r=[];for(let i=0;i<=n;i++){const t=i/n,X=a+(b-a)*t,h=h0+(h1-h0)*t;r.push([X,y0+(y1-y0)*t-h*(.25+R()*.75)])}return r};
  charWall(x,[[100,0],...top(100,146,0,-26,88,40,8),[146,-26]]);
  const st=[[-36,0],[-36,-70],[0,-70],[0,0]].map(([a,b])=>[a+12,b]);
  x.fillStyle='#c8c0b0';x.fillRect(-24,-70,60,70);const sg=x.createLinearGradient(0,-70,0,0);sg.addColorStop(0,'rgba(20,18,16,.85)');sg.addColorStop(1,'rgba(20,18,16,.15)');x.fillStyle=sg;x.fillRect(-24,-70,60,70);
  x.fillStyle='#0c0a08';x.beginPath();x.moveTo(-8,0);x.lineTo(-8,-26);x.quadraticCurveTo(6,-40,20,-26);x.lineTo(20,0);x.fill();
  for(let y=-70;y>-200;y-=6){for(let X=2+((y/6)%2?5:0);X<26;X+=10){x.fillStyle=mix([120,50,34],[160,80,56],R()).map?rgba(mix([110,46,30],[160,80,56],R())):'#8a3a26';x.fillRect(X,y-5,9,5)}}
  x.strokeStyle='rgba(200,190,170,.5)';x.lineWidth=.6;for(let y=-70;y>-200;y-=6){x.beginPath();x.moveTo(2,y);x.lineTo(26,y);x.stroke()}
  const cg=x.createLinearGradient(0,-200,0,-120);cg.addColorStop(0,'rgba(10,8,6,.95)');cg.addColorStop(1,'rgba(10,8,6,0)');x.fillStyle=cg;x.fillRect(1,-200,26,80);
  charWall(x,[[-100,4],...top(-100,-30,4,4,94,30,10),...top(-30,30,4,4,10,14,4),...top(30,100,4,4,40,86,10),[100,4]]);
  x.lineCap='round';[[-90,-60,-20,6],[60,-70,120,4],[-40,-30,40,-4],[100,-80,30,4]].forEach(([a,b,c2,d])=>{x.strokeStyle='#0e0c0a';x.lineWidth=7;x.beginPath();x.moveTo(a,b);x.lineTo(c2,d);x.stroke();x.strokeStyle='rgba(90,84,76,.5)';x.lineWidth=1.2;x.beginPath();x.moveTo(a,b-2);x.lineTo(c2,d-2);x.stroke()});
  for(let i=0;i<8;i++)dab(x,14+(R()-.5)*6+i*3,-210-i*12,6+i*2,[140,140,140],.12);x.restore()}
function chapel(x,X,B,s){x.save();x.translate(X,B);x.scale(s,s);x.globalAlpha=.85;wood(x,-22,-52,44,52,1);x.fillStyle='rgba(60,70,80,.45)';x.fillRect(-22,-52,44,52);
  x.fillStyle='#3a3a40';x.beginPath();x.moveTo(-28,-50);x.lineTo(0,-70);x.lineTo(28,-50);x.fill();wood(x,-8,-92,16,24,1);
  const g=x.createRadialGradient(-4,-108,1,0,-104,16);g.addColorStop(0,'#c8a850');g.addColorStop(1,'#5a4a20');x.fillStyle=g;x.beginPath();x.moveTo(-10,-92);x.bezierCurveTo(-18,-100,-10,-112,0,-124);x.bezierCurveTo(10,-112,18,-100,10,-92);x.fill();
  x.strokeStyle='#2a2418';x.lineWidth=1.6;x.beginPath();x.moveTo(0,-124);x.lineTo(0,-140);x.moveTo(-5,-134);x.lineTo(5,-134);x.moveTo(-4,-128);x.lineTo(4,-130);x.stroke();
  x.fillStyle='#1a1a1a';x.fillRect(-4,-30,8,30);x.restore()}
function well(x,X,B){shadowAt(x,X,B+2,30);for(let i=0;i<4;i++)wood(x,X-16,B-6-i*6,32,6,0);x.strokeStyle='#1a1008';x.lineWidth=.8;x.strokeRect(X-16,B-24,32,24);
  wood(x,X+26,B-74,4,76,1);x.save();x.translate(X+28,B-70);x.rotate(-.62);wood(x,-70,-1.5,150,3,0);x.restore();
  const ex=X+28-Math.cos(.62)*70,ey=B-70+Math.sin(.62)*70;x.strokeStyle='#3a3228';x.lineWidth=1;x.beginPath();x.moveTo(ex,ey);x.lineTo(ex+2,B-26);x.stroke();bucket(x,ex+2,B-20)}
function fence2(x,X0,X1,Y,gap){x.fillStyle='#3a2a18';x.fillRect(X0,Y-26,X1-X0,3);x.fillRect(X0,Y-12,X1-X0,3);
  for(let X=X0;X<X1;X+=9){if(gap&&X>gap[0]-8&&X<gap[1])continue;const h=32+R()*6;wood(x,X,Y-h,7,h,1);x.fillStyle='rgba(120,120,110,.35)';x.fillRect(X,Y-h,7,h);x.fillStyle='#4a3a28';x.beginPath();x.moveTo(X,Y-h);x.lineTo(X+3.5,Y-h-5);x.lineTo(X+7,Y-h);x.fill()}
  if(gap){wood(x,gap[0]-4,Y-46,6,46,1);wood(x,gap[1],Y-46,6,46,1)}}
function sunflower(x,X,Y,h){x.strokeStyle='#4a6a22';x.lineWidth=2;x.beginPath();x.moveTo(X,Y);x.quadraticCurveTo(X+3,Y-h*.5,X+1,Y-h);x.stroke();
  for(let i=0;i<3;i++)ell(x,X+(i%2?7:-7),Y-h*(.3+i*.2),7,3,[60,96,30],.95,i%2?.5:-.5);
  for(let i=0;i<14;i++){const a=i/14*6.28;ell(x,X+1+Math.cos(a)*8,Y-h+Math.sin(a)*7,4,1.8,[230,180,30],1,a)}ell(x,X+1,Y-h,6,5.5,[70,44,20]);ell(x,X,Y-h-1,3,2.5,[110,70,30],.7)}
function poles(x){const PL=[[30,356,120],[250,318,62],[640,320,64],[800,350,104]];
  PL.forEach(([X,B,h])=>{wood(x,X-h*.035,B-h,h*.07,h,1);x.fillStyle='#2a2018';x.fillRect(X-h*.16,B-h*.9,h*.32,h*.035)});
  x.strokeStyle='rgba(20,20,20,.75)';x.lineWidth=.7;for(let i=0;i<PL.length-1;i++)for(const s of[-1,1]){const[a,b,h]=PL[i],[c2,d,h2]=PL[i+1];if(i==1)continue;
    x.beginPath();x.moveTo(a+s*h*.12,b-h*.9);x.quadraticCurveTo((a+c2)/2,(b-h*.9+d-h2*.9)/2+16,c2+s*h2*.12,d-h2*.9);x.stroke()}
  x.beginPath();x.moveTo(250+7,318-56);x.quadraticCurveTo(330,300,440,290);x.stroke();x.beginPath();x.moveTo(640-7,320-58);x.quadraticCurveTo(560,300,470,292);x.stroke()}
// ===== Dorf in echten Größen =====
// PJ(B) = Petjas Höhe in Pixeln, wenn er bei y=B steht. Alles im Dorf wird daran gemessen:
// Izba bis First ≈ 4,6 m (186 Einheiten, Petja ≈ 73), Zaun ≈ 1 m, Brunnen mit Dach ≈ 2,6 m, Strommast ≈ 7,5 m, Sonnenblume ≈ 1,8 m.
const PJ=B=>scaleAt(B)*258;
function at(x,X,Y,k,f){x.save();x.translate(X,Y);x.scale(k,k);f();x.restore()}
function izbaR(x,cx,B,flip,o){const s=PJ(B)/73;izba(x,cx,B,s,flip,o);return s}
function fenceR(x,X0,X1,Y,gap){const k=.55*PJ(Y)/37;at(x,X0,Y,k,()=>fence2(x,0,(X1-X0)/k,0,gap&&[(gap[0]-X0)/k,(gap[1]-X0)/k]))}
function wellR(x,X,B){const k=1.45*PJ(B)/132;at(x,X,B,k,()=>well(x,0,0));return k}
function bushR(x,X,Y,dk,f=1){bush(x,X,Y,.28*f*PJ(Y),dk)}
function sunR(x,X,Y,h){at(x,X,Y,PJ(Y)/90,()=>sunflower(x,0,0,h))}
function polesR(x,rows){rows.forEach(row=>{const P=row.map(([X,B])=>[X,B,4.2*PJ(B)]);P.forEach(([X,B,h])=>{wood(x,X-h*.02,B-h,h*.04,h,1);x.fillStyle='#2a2018';x.fillRect(X-h*.1,B-h*.92,h*.2,h*.02)});
  x.strokeStyle='rgba(20,20,20,.7)';x.lineWidth=.7;for(let i=0;i<P.length-1;i++)for(const s of[-1,1]){const[a,b,h]=P[i],[c2,d,h2]=P[i+1];
    x.beginPath();x.moveTo(a+s*h*.08,b-h*.92);x.quadraticCurveTo((a+c2)/2,(b-h*.92+d-h2*.92)/2+h*.05,c2+s*h2*.08,d-h2*.92);x.stroke()}})}
// Klickflächen passend zur Zeichnung setzen (Umriss einer Izba bzw. Polygon in Zeichen-Einheiten)
const IZ=[[-112,0],[-112,-111],[0,-192],[46,-216],[162,-138],[146,-28],[100,0]];
function setHit(id,pts,cx,B,s,flip,room=''){const h=document.querySelector(`${room} [data-id="${id}"] .hit`);if(h)h.setAttribute('d','M'+pts.map(([a,b])=>(cx+(flip?-a:a)*s).toFixed(0)+','+(B+b*s).toFixed(0)).join('L')+'Z')}
// ----- Straße in Perspektive: jedes Ding steht seitlich (lat, Meter; links negativ) und in Entfernung d (Meter) -----
// Petja ist 1,8 m; in Entfernung d ist er KD/d Pixel hoch. Daraus folgen Bildhöhe y und Pixel pro Meter.
const VPX=446,KD=834;
function yOfPJ(p){let a=S0.hz+1,b=560;for(let i=0;i<28;i++){const m=(a+b)/2;PJ(m)<p?a=m:b=m}return(a+b)/2}
function sp(lat,d){const p=KD/d;return[VPX+lat*p/1.8,yOfPJ(p),p]}
// Izba: Giebel zum Betrachter, Seitenwand zur Straße (links normal, rechts gespiegelt)
function house(x,lat,d,o,id,f=1){const[X,B,p]=sp(lat,d),s=f*p/73,flip=lat>0;izba(x,X,B,s,flip,o);if(id)setHit(id,IZ,X,B,s,flip);return{X,B,s,p}}
// Lattenzaun entlang der Straße (≈1,1 m hoch), von fern nach nah; gaps = [[d0,d1],…] für Tore
function fenceLine(x,lat,d0,d1,gaps=[]){const pts=[];for(let d=d1;d>=d0;d-=.22){if(gaps.some(([a,b])=>d>a&&d<b))continue;const[X,Y,p]=sp(lat,d);if(Y>540)continue;const m=p/1.8,h=1.1*m,w=Math.max(1,.1*m);
    wood(x,X-w/2,Y-h,w,h,1);x.fillStyle='rgba(120,120,110,.3)';x.fillRect(X-w/2,Y-h,w,h);x.fillStyle='#4a3a28';x.beginPath();x.moveTo(X-w/2,Y-h);x.lineTo(X,Y-h-w*.8);x.lineTo(X+w/2,Y-h);x.fill();pts.push([X,Y,m])}
  for(const f of[.35,.8]){x.strokeStyle='#3a2a18';let prev=null;for(const[X,Y,m]of pts){if(prev&&Math.abs(prev[0]-X)<m*.5){x.lineWidth=Math.max(1,.05*m);x.beginPath();x.moveTo(prev[0],prev[1]-f*1.1*prev[2]);x.lineTo(X,Y-f*1.1*m);x.stroke()}prev=[X,Y,m]}}}
// Seitenweg: zweigt bei Entfernung dA..dB von der Straße ab und läuft nach links (side=-1) oder rechts (1) aus dem Bild
function sidePath(x,side,dA,dB){const P=[sp(side*1.8,dA),sp(side*1.8,dB),sp(side*40,dB),sp(side*40,dA)];x.save();x.beginPath();P.forEach(([X,Y],i)=>i?x.lineTo(X,Y):x.moveTo(X,Y));x.closePath();x.clip();
  const sd=S0.sand,y0=Math.min(...P.map(q=>q[1])),y1=Math.max(...P.map(q=>q[1]));x.fillStyle=rgba(mix(sd[0],sd[1],.45));x.fillRect(0,y0-2,800,y1-y0+4);
  for(let i=0;i<260;i++){const X=R()*800,Y=y0+R()*(y1-y0),t=(Y-S0.hz)/(500-S0.hz);dab(x,X,Y,(3+R()*7)*t+1,R()<.5?mix(sd[0],sd[1],R()):[50,38,26],.35)}
  x.restore()}
// Birke zwischen den Häusern (≈ 12 m)
function tree(x,lat,d,f=1){const[X,Y,p]=sp(lat,d),m=p/1.8,top=Y-11*f*m;birch(x,X,Y,Math.max(2,.3*m),(R()-.5)*3,top+3*m);
  for(let k=0;k<9;k++)foliage(x,X+(R()-.5)*4.4*m,top+R()*5.5*m,1.5*m*(.7+R()*.5),k<3?1:0,1)}
function bushAt(x,lat,d,f=1,dk=0){const[X,Y,p]=sp(lat,d);bush(x,X,Y,.28*f*p,dk)}
function sunAt(x,lat,d,h){const[X,Y,p]=sp(lat,d);at(x,X,Y,p/90,()=>sunflower(x,0,0,h))}
function poleRow(x,lat,ds){const P=ds.map(d=>{const[X,Y,p]=sp(lat,d);return[X,Y,4.2*p]});
  P.forEach(([X,B,h])=>{wood(x,X-h*.02,B-h,h*.04,h,1);x.fillStyle='#2a2018';x.fillRect(X-h*.1,B-h*.92,h*.2,h*.02)});
  x.strokeStyle='rgba(20,20,20,.7)';x.lineWidth=.7;for(let i=0;i<P.length-1;i++)for(const s of[-1,1]){const[a,b,h]=P[i],[c2,dd,h2]=P[i+1];
    x.beginPath();x.moveTo(a+s*h*.08,b-h*.92);x.quadraticCurveTo((a+c2)/2,(b-h*.92+dd-h2*.92)/2+h*.04,c2+s*h2*.08,dd-h2*.92);x.stroke()}}
function paintDorf(){const o=S0;sky(o);far(o);ground(o);
  let x=lay();chapel(x,452,208,.5);setHit('kirche',[[-14,0],[-14,-24],[0,-44],[14,-24],[14,0]],452,208,1);bgRow(x,26,204,232,10,18,0);[[150,236,5,0,96],[740,234,6,-1,96]].forEach(b=>birch(x,...b));put(x,.6);
  x=lay();grass(x,7000,o.hz,500,1);details(x);dirt(x,50);[[396,420,30],[470,472,26],[440,352,14],[300,452,20]].forEach(([X,Y,r])=>mud(x,X,Y,r));
  sidePath(x,-1,17,20);put(x);   // Weg links zur alten Mühle (hinter dem leeren Haus, vor dem Laden)
  // Häuserreihen: unterschiedlich weit von der Straße, verschieden groß, mit Lücken, Birken und Büschen
  x=lay();house(x,-8.6,66,{win:'dark',smoke:0});house(x,7.4,60,{win:'dark',smoke:1},0,.9);house(x,-7.0,51,{trim:'#6a8a4a',smoke:1},0,.9);house(x,9.2,45,{trim:'#8a6a3a',smoke:0},0,1.1);
  house(x,-9.4,39,{win:'dark',smoke:0},0,1.12);tree(x,6.2,36);house(x,6.8,31,{win:'dark',smoke:1},0,.92);tree(x,-5.6,31,.9);
  poleRow(x,-3.6,[62,42,26,11]);fenceLine(x,2.9,13,66,[[16,17.5],[29.5,31]]);fenceLine(x,-2.9,20,66,[[24.5,26],[37,38.5],[49.5,51]]);bushAt(x,-4.6,44,1.2);bushAt(x,4.2,40,1);put(x);
  // Laden (links) und Koljas vernageltes Haus (rechts), Brunnen am Straßenrand
  x=lay();let h=house(x,-9.4,23,{win:'dark',smoke:0},'laden');
  at(x,h.X,h.B,h.s,()=>{wood(x,-92,-122,184,30,0);x.fillStyle='#c83a2e';x.font='bold 24px Georgia';x.textAlign='center';x.fillText('LADEN',0,-99);x.fillStyle='#e8e0c8';x.fillRect(-46,-52,20,16)});
  house(x,8.4,18,{win:'board',smoke:0},'leer',1.05);bushAt(x,5.6,22,1.3);bushAt(x,-4.4,18,1.1);
  const[wx,wy]=sp(3.5,11);const wk=wellR(x,wx,wy);setHit('brunnen',[[-40,7],[-40,-102],[26,-102],[42,-86],[32,7]],wx,wy,wk);put(x);
  // vorn links: das leere Haus hinter dem Zaun, davor die Abzweigung zur Mühle
  x=lay();house(x,-8.2,9.5,{win:'dark',trim:'#7a6a5a',smoke:0},'haus1',1.05);fenceLine(x,-2.9,2.6,17,[[5.2,6.6]]);bushAt(x,-4.6,7,1.2);
  const[mx,my,mp]=sp(-2.4,16.4);sign(x,mx,my,2.2*mp/1.8/128,[[-1,0,'Zur alten Mühle','hMue']]);sign(x,486,346,1.1,[[1,0,'Ins Dorf','hIns']]);rock(x,350,332,6,1);put(x);
  // vorn rechts: Opas abgebranntes Haus (Ruine ≈ 5 m breit, Ofen mit Schornstein ≈ 3,3 m)
  x=lay();if(FL.haus){const hs=PJ(384)/112;izba(x,800,384,hs,1,{trim:'#d8b070',smoke:1});setHit('ruine',IZ,800,384,hs,1)}   // Opas neues Haus (mit Petja gebaut)
  else{const rs=PJ(384)/111;ruin(x,760,384,rs);setHit('ruine',[[-150,10],[-150,-80],[-36,-80],[-36,-200],[24,-200],[24,-80],[120,-80],[120,10]],760,384,rs)}
  for(let i=0;i<30;i++){const X=560+R()*240;reeds(x,X,410+R()*20,3,16,0)}
  wood(x,530,380,60,5,0);wood(x,536,384,6,48,1);wood(x,578,384,6,48,1);shadowAt(x,560,432,36);
  sign(x,110,484,1.7,[[-1,0,'Zu Baba Jaga','hZB']]);put(x);
  x=lay();birch(x,790,520,40,-6);grass(x,700,470,515,2.4,1);bush(x,730,500,40,1);put(x,1);
  rays(o,[[.3,.05]]);grade(o)}
const OMA=`<g stroke="#2a1a0e" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round">
<path d="M-27,-3C-28,-10 -26,-20 -24,-24L-10,-24C-8,-18 -8,-9 -6,-4C-10,0 -24,1 -27,-3Z" fill="#8a8478"/>
<path d="M-28,-4C-26,0 -10,1 -5,-3L-5,0C-12,2.4 -24,2.4 -29,0Z" fill="#1e1e22"/><path d="M-22,-20C-21,-14 -21,-8 -20,-5" fill="none" stroke="#6a6458" stroke-width=".8"/>
<path d="M4,-3C3,-10 5,-20 7,-24L21,-24C23,-18 24,-10 27,-5C25,0 8,1 4,-3Z" fill="#7a7468"/>
<path d="M3,-4C6,0 22,1 28,-3L28,0C20,2.4 8,2.4 3,0Z" fill="#1e1e22"/><path d="M11,-20C12,-14 12,-8 13,-5" fill="none" stroke="#5e584e" stroke-width=".8"/>
<path d="M-33,-22C-36,-50 -34,-80 -27,-104L28,-104C35,-82 38,-50 37,-22C30,-17 20,-19 12,-16C2,-21 -6,-17 -14,-20C-22,-17 -28,-18 -33,-22Z" fill="#5c3a4c"/>
<path d="M18,-102C26,-80 30,-48 32,-20C28,-18 22,-18 18,-17C20,-44 20,-76 14,-100Z" fill="#462a3a" stroke="none"/>
<path d="M-24,-60C-26,-46 -27,-32 -26,-21M30,-62C31,-48 32,-34 31,-22" fill="none" stroke="#3a2230" stroke-width=".9"/>
<g fill="#d8b860" stroke="none"><circle cx="-29" cy="-40" r="1.4"/><circle cx="-26" cy="-70" r="1.4"/><circle cx="33" cy="-46" r="1.4"/><circle cx="29" cy="-76" r="1.4"/><circle cx="34" cy="-30" r="1.2"/></g>
<path d="M-20,-98C-23,-72 -24,-44 -22,-26C-12,-22 2,-22 14,-25C17,-46 17,-74 13,-98Z" fill="#e6dcc2"/>
<path d="M4,-97C9,-74 10,-46 9,-24L14,-25C17,-46 17,-74 13,-98Z" fill="#c8bea2" stroke="none"/>
<path d="M-21,-34C-10,-31 4,-31 15,-34M-21.6,-30C-10,-27 4,-27 15.4,-30" fill="none" stroke="#b03a2a" stroke-width="1.6"/>
<g fill="#b03a2a" stroke="none"><path d="M-18,-40l2,-3l2,3l-2,3Z"/><path d="M-10,-40l2,-3l2,3l-2,3Z"/><path d="M-2,-40l2,-3l2,3l-2,3Z"/><path d="M6,-40l2,-3l2,3l-2,3Z"/></g>
<path d="M-12,-90C-13,-70 -14,-52 -13,-38M2,-92C3,-74 3,-56 2,-40" fill="none" stroke="#b8ae92" stroke-width=".8"/>
<path d="M-30,-104C-34,-122 -30,-142 -20,-150C-8,-156 16,-156 26,-148C38,-138 40,-120 36,-104C30,-98 20,-97 14,-98L-20,-98C-26,-98 -29,-100 -30,-104Z" fill="#4c5a7c"/>
<path d="M24,-148C36,-138 39,-120 35,-104C30,-99 24,-98 18,-98C24,-112 26,-130 20,-146Z" fill="#3a4662" stroke="none"/>
<path d="M-4,-150C-5,-132 -5,-116 -4,-100" fill="none" stroke="#2e3850" stroke-width=".9"/><g fill="#c8c0a8" stroke="#2e3850" stroke-width=".6"><circle cx="-2" cy="-140" r="1.6"/><circle cx="-2" cy="-127" r="1.6"/><circle cx="-2" cy="-114" r="1.6"/></g>
<path d="M-30,-144C-40,-128 -40,-110 -34,-100C-28,-96 -20,-98 -14,-103L-18,-110C-24,-108 -27,-112 -27,-118C-26,-128 -24,-136 -20,-142Z" fill="#4c5a7c"/>
<path d="M-31,-118C-30,-110 -28,-104 -24,-102" fill="none" stroke="#2e3850" stroke-width=".8"/>
<path d="M30,-142C40,-128 40,-110 32,-102C26,-98 18,-99 12,-103L14,-110C20,-108 24,-111 25,-118C26,-126 24,-134 22,-140Z" fill="#3a4662"/>
<path d="M-20,-104C-24,-110 -20,-117 -13,-116C-8,-118 -2,-117 0,-114C4,-117 10,-118 14,-115C20,-114 22,-108 18,-104C14,-100 6,-100 0,-102C-6,-99 -15,-99 -20,-104Z" fill="#d89a78"/>
<path d="M-14,-112C-12,-108 -12,-105 -14,-103M-8,-113C-6,-109 -6,-105 -8,-102M5,-113C7,-109 7,-105 5,-102M11,-112C13,-108 13,-105 11,-103" fill="none" stroke="#8a4a30" stroke-width="1"/><path d="M-2,-114C-4,-110 -2,-106 2,-106C4,-108 4,-112 2,-114Z" fill="#c88a68" stroke-width=".8"/>
<path d="M-18,-142C-26,-150 -26,-160 -22,-168L22,-166C26,-158 24,-148 16,-140C8,-136 -10,-136 -18,-142Z" fill="#b8302a"/>
<path d="M-26,-158C-36,-150 -40,-136 -36,-124C-30,-130 -26,-138 -24,-146Z" fill="#b8302a"/>
<path d="M-4,-188C-20,-188 -30,-176 -30,-160C-30,-150 -26,-142 -20,-138L-10,-140C-16,-148 -18,-158 -16,-166C-12,-176 4,-178 12,-170C16,-164 16,-152 12,-142L20,-140C26,-148 28,-158 26,-168C22,-182 10,-188 -4,-188Z" fill="#b8302a"/>
<path d="M14,-184C22,-178 27,-168 26,-158C25,-150 22,-144 20,-140L14,-142C18,-152 18,-166 12,-176Z" fill="#922420" stroke="none"/>
<path d="M-16,-166C-12,-176 4,-178 12,-170C16,-164 16,-152 12,-142C8,-136 2,-134 -4,-134C-12,-136 -16,-140 -18,-148C-19,-154 -18,-160 -16,-166Z" fill="#e2ae8c"/>
<path d="M6,-174C12,-170 15,-160 13,-150C12,-144 9,-140 6,-138C9,-146 10,-158 6,-168Z" fill="#c88e6c" stroke="none"/>
<path d="M-15,-165C-11,-170 -3,-172 6,-170M-13,-163.4C-9,-167 -3,-168 3,-167.4" fill="none" stroke="#bab6ac" stroke-width="2"/>
<path d="M-12,-159C-10,-161 -6,-161 -5,-159M1,-159C3,-161 7,-161 8,-159" fill="none" stroke-width="1.1"/>
<path d="M-12,-162C-10,-164 -6,-164 -4,-162.6M1,-162.6C3,-164 7,-164 9,-162" fill="none" stroke="#9a9488" stroke-width="1.1"/>
<path d="M-14,-157C-15,-156 -16,-154 -16,-153M-13,-157.6C-14.6,-157.4 -16,-158 -17,-159M9.6,-157.6C11,-157 12,-156 12.4,-154.6" fill="none" stroke="#a8684a" stroke-width=".6"/>
<path d="M-3,-160C-5,-156 -7,-152 -6,-149C-4,-146 0,-146 1,-148C3,-147 4,-149 3,-151C2,-154 0,-157 -1,-160Z" fill="#d08a6a"/><path d="M-5.6,-149.6C-4,-148.4 -1.6,-148.4 0,-149.4" fill="none" stroke="#9a5a40" stroke-width=".6"/>
<ellipse cx="-11" cy="-151" rx="3.6" ry="2.4" fill="#e88a7a" stroke="none" opacity=".55"/><ellipse cx="8" cy="-151" rx="3" ry="2.2" fill="#e88a7a" stroke="none" opacity=".5"/>
<path d="M-8,-144C-5,-141.6 -1,-141.4 3,-143.4" fill="none" stroke-width="1"/><path d="M-9.6,-145.4C-9,-144 -8.4,-143.6 -7.6,-143.6M4.4,-145C4,-143.8 3.4,-143.4 2.6,-143.4" fill="none" stroke="#a8684a" stroke-width=".6"/>
<path d="M-14,-147C-13,-144 -11,-141 -8,-139.6M10,-147C10,-144 8,-141 6,-139.6" fill="none" stroke="#b8785a" stroke-width=".55"/>
<path d="M-6,-138C-2,-136 2,-136 4,-138" fill="none" stroke="#b8785a" stroke-width=".55"/>
<path d="M-8,-136C-12,-132 -14,-126 -12,-122C-8,-126 -4,-130 -2,-134Z" fill="#b8302a"/><path d="M-2,-135C0,-130 2,-124 6,-121C8,-126 6,-132 2,-136Z" fill="#922420"/><ellipse cx="-3" cy="-136" rx="3.4" ry="2.6" fill="#b8302a"/>
<g fill="#f4ecd8" stroke="none"><circle cx="-22" cy="-176" r="1.7"/><circle cx="-26" cy="-160" r="1.5"/><circle cx="-8" cy="-184" r="1.6"/><circle cx="8" cy="-182" r="1.5"/><circle cx="20" cy="-172" r="1.6"/><circle cx="22" cy="-156" r="1.4"/><circle cx="-34" cy="-136" r="1.4"/><circle cx="-24" cy="-146" r="1.3"/><circle cx="16" cy="-146" r="1.3"/><circle cx="-12" cy="-128" r="1.2"/><circle cx="-20" cy="-152" r="1.2"/></g>
</g>`;
const OPA=`<g stroke="#2a1a0e" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round">
<path d="M-27,-2C-28,-8 -25,-14 -20,-16L-20,-34L-8,-34L-7,-14C-4,-10 -3,-5 -5,-2Z" fill="#2c2420"/><path d="M-28,-2L-4,-2L-4,1L-28,1Z" fill="#141010"/><path d="M-18,-30C-17,-24 -17,-18 -16,-15" fill="none" stroke="#4a3e36" stroke-width=".8"/>
<path d="M6,-2C5,-8 7,-14 9,-16L9,-34L21,-34L22,-15C26,-11 28,-6 27,-2Z" fill="#241e1a"/><path d="M5,-2L28,-2L28,1L5,1Z" fill="#141010"/>
<path d="M-24,-88C-27,-70 -26,-54 -22,-44C-21,-40 -21,-36 -21,-32L-7,-32C-6,-44 -6,-56 -4,-66L4,-66C6,-56 7,-44 8,-32L22,-32C23,-38 23,-44 25,-50C28,-62 28,-76 25,-88Z" fill="#3c4250"/>
<path d="M12,-86C16,-70 16,-54 14,-34L22,-32C23,-44 26,-54 27,-66C27,-76 26,-82 25,-88Z" fill="#2c3240" stroke="none"/>
<path d="M-22,-62C-20,-58 -16,-56 -12,-57M14,-60C16,-56 20,-54 24,-56M-4,-66C-2,-74 0,-80 0,-86" fill="none" stroke="#252a36" stroke-width=".9"/>
<path d="M-23,-58C-23,-50 -14,-48 -8,-50C-7,-56 -8,-62 -12,-64C-18,-64 -22,-62 -23,-58Z" fill="#6a5a48" stroke-width="1"/><path d="M-21,-60l2,1M-20,-53l2,-1M-11,-62l1,2M-10,-52l-2,-1" fill="none" stroke="#c8b890" stroke-width=".6"/>
<path d="M-24,-92C-24,-96 26,-96 26,-92L26,-86L-24,-86Z" fill="#3a2a1c"/><path d="M-2,-94L4,-94L4,-85L-2,-85Z" fill="#8a7a50"/>
<path d="M-16,-138C-22,-130 -24,-112 -22,-92C-12,-88 10,-88 20,-92C22,-108 20,-128 14,-138Z" fill="#ecebe4"/>
<g fill="none" stroke="#2a4a8a" stroke-width="2.6"><path d="M-21,-128C-10,-126 4,-126 17,-128"/><path d="M-22,-121C-10,-119 6,-119 19,-121"/><path d="M-23,-114C-10,-112 6,-112 20,-114"/><path d="M-23,-107C-10,-105 6,-105 21,-107"/><path d="M-23,-100C-10,-98 6,-98 21,-100"/></g>
<path d="M4,-130C10,-120 12,-104 10,-90L20,-92C22,-108 20,-126 14,-136Z" fill="#000" fill-opacity=".18" stroke="none"/>
<path d="M-18,-142C-30,-136 -36,-124 -36,-108C-36,-98 -32,-90 -26,-86C-22,-92 -20,-108 -18,-124C-16,-132 -10,-138 -6,-140Z" fill="#4a4a3a"/>
<path d="M6,-142C14,-140 20,-134 22,-126C24,-112 24,-98 28,-86C34,-90 38,-98 38,-108C38,-124 30,-138 18,-144Z" fill="#4a4a3a"/>
<path d="M18,-142C30,-136 37,-124 38,-108C38,-98 34,-90 28,-86C27,-96 28,-112 26,-124C24,-134 22,-138 18,-142Z" fill="#3a3a2c" stroke="none"/>
<path d="M-34,-120C-30,-118 -24,-118 -20,-120M-35,-108C-30,-106 -25,-106 -21,-108M-33,-96C-29,-94 -26,-94 -23,-96M24,-122C28,-120 32,-120 36,-122M25,-110C29,-108 33,-108 37,-110M27,-98C30,-96 33,-96 36,-98" fill="none" stroke="#2e2e22" stroke-width=".8"/>
<path d="M-26,-86C-28,-88 -30,-92 -28,-94M28,-86C30,-88 32,-90 30,-94" fill="none" stroke="#2e2e22" stroke-width=".8"/>
<path d="M-30,-130C-38,-120 -42,-102 -40,-86C-39,-80 -38,-76 -36,-72L-29,-74C-31,-84 -31,-98 -27,-112Z" fill="#4a4a3a"/>
<path d="M-38,-80C-40,-76 -39,-72 -36,-70L-29,-72C-30,-76 -30,-80 -29,-82Z" fill="#3a3a2c"/>
<path d="M-38,-73C-42,-70 -42,-62 -38,-58C-34,-56 -28,-58 -27,-62C-26,-66 -28,-72 -31,-74Z" fill="#c88c68"/><path d="M-37,-64C-35,-62 -32,-62 -30,-63M-38,-60C-36,-58 -33,-58 -31,-59" fill="none" stroke="#8a5038" stroke-width=".7"/>
<path d="M-36,-60L-35,-48C-38,-46 -40,-42 -40,-36L-40,-12C-40,-9 -28,-9 -28,-12L-28,-36C-28,-42 -30,-46 -32,-48L-31,-60Z" fill="#3c6a3c"/><path d="M-37,-62L-30,-62L-30,-58L-37,-58Z" fill="#b8a070"/>
<path d="M-38,-34L-38,-16" fill="none" stroke="#a8d0a0" stroke-width="1.4"/><path d="M-39,-30L-29,-30L-29,-20L-39,-20Z" fill="#e6dcb8" stroke-width=".8"/><path d="M-37,-27H-31M-37,-24H-32" fill="none" stroke="#6a5a3a" stroke-width=".5"/>
<path d="M30,-136C38,-128 42,-118 40,-110C38,-104 32,-100 26,-98L22,-104C26,-108 30,-112 30,-116C30,-122 28,-128 24,-132Z" fill="#3a3a2c"/>
<path d="M27,-104C22,-104 18,-100 18,-95C18,-90 22,-87 27,-88C31,-89 33,-93 32,-97C31,-101 30,-103 27,-104Z" fill="#c08260"/><path d="M20,-97C22,-95 25,-94 27,-95M20,-93C22,-91 25,-91 27,-92" fill="none" stroke="#8a5038" stroke-width=".7"/>
<path d="M-8,-146L-6,-136C-2,-133 2,-133 6,-136L6,-146Z" fill="#c08260"/><path d="M-2,-142C-1,-140 0,-139 1,-138" fill="none" stroke="#8a5038" stroke-width=".7"/>
<path d="M-6,-136C-10,-140 -14,-142 -18,-142L-10,-132ZM6,-136C10,-140 14,-142 18,-142L10,-132Z" fill="#4a4a3a"/>
<path d="M-17,-158C-19,-150 -18,-142 -14,-138C-10,-134 -4,-132 0,-132C6,-132 10,-136 12,-142C14,-148 14,-156 12,-162Z" fill="#c88c68"/>
<path d="M4,-158C10,-154 11,-146 9,-140C8,-136 6,-134 3,-133C6,-140 7,-150 4,-158Z" fill="#a87050" stroke="none"/>
<path d="M-19,-156C-23,-158 -25,-152 -23,-148C-22,-146 -19,-145 -18,-147Z" fill="#c88c68"/><path d="M-21,-154C-22,-152 -22,-150 -20,-149" fill="none" stroke="#8a5038" stroke-width=".6"/>
<path d="M12,-156C16,-158 18,-152 16,-148C15,-146 13,-145 12,-147Z" fill="#b07a58"/>
<path d="M-17,-148C-18,-142 -14,-136 -8,-133C-4,-131 2,-131 6,-133C10,-136 12,-140 12,-146C8,-142 4,-140 0,-141C-4,-140 -8,-142 -10,-144C-12,-144 -15,-146 -17,-148Z" fill="#9a968c"/>
<g stroke="#6e6a62" stroke-width=".6"><path d="M-14,-140l-1,1.4M-11,-137l-.6,1.6M-7,-135l0,1.6M-3,-134l0,1.6M1,-134l.4,1.6M5,-135l.6,1.4M8,-138l1,1.2M-15,-143l-1.2,.8M10,-141l1.2,.8"/></g>
<path d="M-9,-146C-6,-149 -2,-149 0,-147C2,-149 6,-149 8,-146C6,-144 2,-144 0,-145C-2,-144 -6,-144 -9,-146Z" fill="#b8b4aa"/>
<path d="M-4,-157C-7,-153 -8,-149 -6,-147C-4,-145 0,-145 2,-146C4,-146 5,-148 4,-150C3,-153 1,-156 -1,-158Z" fill="#c8605a"/><ellipse cx="-3" cy="-152" rx="1.4" ry="1" fill="#f0a8a0" stroke="none"/>
<path d="M-14,-159C-12,-161 -8,-161 -6,-159C-8,-157.4 -12,-157.4 -14,-159Z" fill="#f0e8d8" stroke-width=".7"/><circle cx="-10" cy="-159" r="1.3" fill="#3a2410" stroke="none"/>
<path d="M-14.6,-159.6C-12,-161.6 -8,-161.6 -5.6,-159.4" fill="none" stroke-width="1.2"/><path d="M-14,-156.6C-12,-155.4 -9,-155.4 -7,-156.4" fill="none" stroke="#9a6044" stroke-width=".6"/>
<path d="M2,-159C4,-157.6 7,-157.6 9,-159.4" fill="none" stroke-width="1.3"/><path d="M8.6,-158C10,-157 11,-156 11.4,-154.6M9,-160C10.4,-160.4 11.6,-161 12.4,-162" fill="none" stroke="#9a6044" stroke-width=".6"/>
<path d="M-16,-163L-6,-162.6M1,-163.4L9,-165" fill="none" stroke="#6a6660" stroke-width="1.8"/>
<path d="M-12,-166C-8,-167 -2,-167 4,-166" fill="none" stroke="#a8684a" stroke-width=".55"/>
<path d="M-22,-160C-24,-168 -18,-176 -6,-178C6,-180 16,-176 18,-168C18,-164 16,-162 14,-161C4,-164 -10,-164 -22,-160Z" fill="#5a5650"/>
<path d="M4,-178C12,-177 18,-172 18,-166C18,-163 16,-162 14,-161C14,-166 10,-174 4,-178Z" fill="#46423e" stroke="none"/>
<path d="M-22,-160C-26,-159 -30,-158 -32,-156C-26,-154 -18,-156 -10,-159C-14,-160 -18,-160 -22,-160Z" fill="#46423e"/>
<path d="M-16,-170C-10,-173 0,-174 10,-172M-8,-177L-6,-163" fill="none" stroke="#3a3632" stroke-width=".7"/><circle cx="-5" cy="-178" r="1.4" fill="#46423e" stroke-width=".7"/>
</g>`;
// ================= Dorfstraße & Kirche =================
function laundry(x){[[300,362,58],[368,352,54]].forEach(([X,B,h])=>{shadowAt(x,X,B,8);wood(x,X-2,B-h,4,h,1)});x.strokeStyle='#2a2a2a';x.lineWidth=.7;x.beginPath();x.moveTo(300,306);x.quadraticCurveTo(334,312,368,300);x.stroke();
  [[306,[220,220,214],12,16],[322,[90,110,170],10,22],[338,[230,190,190],22,14],[356,[200,60,50],8,12]].forEach(([X,k,w,h])=>{const Y=306+Math.sin((X-300)/68*3.14)*5;x.fillStyle=rgba(k);x.fillRect(X,Y,w,h);x.fillStyle='rgba(0,0,0,.2)';x.fillRect(X+w*.6,Y,w*.4,h);x.strokeStyle='rgba(20,20,20,.6)';x.strokeRect(X,Y,w,h)})}
function paintDorfstr(){const o=S0;sky(o);far(o);ground(o);
  // die Holzkirche steht links hinter den Häusern – dorthin führt der Weg links
  let x=lay();const[kx,ky]=sp(-9,110);chapel(x,kx,ky,.75);setHit('kirche2',[[-14,0],[-14,-24],[0,-44],[14,-24],[14,0]],kx,ky,1.5,0,'#r-dorfstr');
  bgRow(x,30,206,236,10,18,0);[[180,234,5,0,96],[700,232,5,1,100]].forEach(b=>birch(x,...b));put(x,.6);
  x=lay();grass(x,7000,o.hz,500,1);details(x);dirt(x,50);[[410,380,20],[470,460,28],[380,440,16],[440,300,8]].forEach(([X,Y,r])=>mud(x,X,Y,r));
  sidePath(x,-1,18.5,21.5);sidePath(x,1,21,24);put(x);   // links zur Kirche, rechts zum Schmiedehof
  // Häuserreihen: unregelmäßig, mit Lücken, Birken und Büschen
  x=lay();house(x,-7.6,66,{win:'dark',smoke:0});house(x,8.6,62,{trim:'#5a7a9a',smoke:1},0,1.1);house(x,-9.2,50,{trim:'#8a6a3a',smoke:1},0,1.1);house(x,7.2,46,{win:'board',smoke:0},0,.9);
  house(x,-7.0,38,{win:'dark',smoke:0},0,.88);tree(x,-5.4,31);house(x,8.8,35,{trim:'#6a8a4a',smoke:0},0,1.05);tree(x,5.8,30,.9);
  house(x,-8.8,24,{trim:'#9a5a5a',smoke:1},0,1.1);house(x,7.0,27,{win:'dark',smoke:0},0,.92);
  fenceLine(x,-2.9,21.5,66,[[24,25.5],[37,38.5],[49,50.5]]);fenceLine(x,2.9,24,66,[[34,35.5],[45,46.5]]);
  bushAt(x,4.3,17,1.1);bushAt(x,-4.6,28,1.2);bushAt(x,4.8,42,1);put(x);
  // vorn: Omas Haus (links) und Tante Galjas Haus (rechts)
  x=lay();house(x,-7.6,11,{trim:'#4a8a5a'},'omahaus');house(x,8.4,13.5,{trim:'#8a4a4a'},'galja',1.08);
  // Wäscheleine in Tante Galjas Vorgarten rechts vorn (Pfosten ≈ 1,8 m) – gut sichtbar, da kommt die Angelschnur her
  const[l1,ly]=sp(3.7,11),[l2]=sp(6.9,11),lk=(l2-l1)/68;at(x,l1,ly,lk,()=>{x.translate(-300,-362);laundry(x)});setHit('waesche',[[-4,-66],[72,-66],[72,-32],[-4,-32]],l1,ly,lk);
  // Omas Vorgarten mit Sonnenblumen, Zaun mit offenem Gartentor; Wegweiser an der Abzweigung
  for(let i=0;i<6;i++)sunAt(x,-3.5-R()*.6,4.4+i*.8,84+R()*20);fenceLine(x,-2.9,2.6,18.5,[[3.3,4.4]]);
  fenceLine(x,2.9,2.6,21,[[9,10.2]]);bushAt(x,4.2,8,1.1);
  const[bx,by,bp]=sp(-1.6,3.7);at(x,bx,by,.2*bp/20,()=>bucket(x,0,0));
  const[gx,gy,gp]=sp(2.2,8);sign(x,gx,gy,2.2*gp/1.8/128,[[-1,0,'Zur Kirche','hKi'],[1,14,'Zum Schmiedehof','hSm']]);
  sign(x,110,486,1.7,[[-1,0,'Zum Dorfeingang','hDE']]);put(x);
  x=lay();grass(x,700,470,515,2.4,1);bush(x,770,500,40,1);put(x,1);rays(o,[[.3,.05]]);grade(o)}
function onion(x,X,Y,r,c0,c1){const g=x.createRadialGradient(X-r*.4,Y-r*1.1,1,X,Y-r,r*1.4);g.addColorStop(0,c0);g.addColorStop(1,c1);x.fillStyle=g;x.beginPath();x.moveTo(X-r*.55,Y);
  x.bezierCurveTo(X-r*1.5,Y-r*.6,X-r*.7,Y-r*1.5,X,Y-r*2.3);x.bezierCurveTo(X+r*.7,Y-r*1.5,X+r*1.5,Y-r*.6,X+r*.55,Y);x.fill();x.strokeStyle='rgba(20,14,6,.7)';x.lineWidth=.8;x.stroke();orthCross(x,X,Y-r*2.3,r*1.3,'#c8a850',1.4)}
function orthCross(x,X,Y,h,col,w){x.strokeStyle=col;x.lineWidth=w;x.lineCap='butt';x.beginPath();x.moveTo(X,Y);x.lineTo(X,Y-h);x.moveTo(X-h*.14,Y-h*.86);x.lineTo(X+h*.14,Y-h*.86);x.moveTo(X-h*.3,Y-h*.68);x.lineTo(X+h*.3,Y-h*.68);x.moveTo(X-h*.18,Y-h*.22);x.lineTo(X+h*.18,Y-h*.34);x.stroke()}
function logs(x,x0,y0,w,h){for(let y=y0+h-9;y>=y0-1;y-=9){wood(x,x0,y,w,9,0);x.fillStyle='rgba(10,6,2,.85)';x.fillRect(x0,y+8,w,1.2)}x.fillStyle='rgba(60,70,90,.18)';x.fillRect(x0,y0,w,h)}
function churchBig(x,X,B){shadowAt(x,X,B+6,220,.55);
  logs(x,X-150,B-170,48,170);x.fillStyle='#0c0a08';x.fillRect(X-142,B-160,32,34);const bg=x.createRadialGradient(X-128,B-146,1,X-126,B-142,12);bg.addColorStop(0,'#e8c860');bg.addColorStop(1,'#6a4a10');x.fillStyle=bg;x.beginPath();x.moveTo(X-134,B-132);x.quadraticCurveTo(X-134,B-152,X-126,B-153);x.quadraticCurveTo(X-118,B-152,X-118,B-132);x.fill();
  x.fillStyle='#2e2a26';x.beginPath();x.moveTo(X-158,B-170);x.lineTo(X-126,B-226);x.lineTo(X-94,B-170);x.fill();onion(x,X-126,B-226,8,'#6aa070','#1e4a2a');
  logs(x,X+80,B-74,74,74);x.fillStyle='#2e2a26';x.beginPath();x.moveTo(X+74,B-74);x.lineTo(X+118,B-104);x.lineTo(X+160,B-74);x.fill();
  logs(x,X-84,B-110,168,110);x.fillStyle='#2e2a26';x.beginPath();x.moveTo(X-96,B-110);x.lineTo(X+96,B-110);x.lineTo(X+44,B-158);x.lineTo(X-44,B-158);x.fill();
  for(let i=0;i<30;i++){x.strokeStyle='rgba(120,110,96,.35)';x.lineWidth=1;const t=i/30;x.beginPath();x.moveTo(X-96+192*t,B-110);x.lineTo(X-44+88*t,B-158);x.stroke()}
  logs(x,X-22,B-204,44,48);x.fillStyle='#2e2a26';x.fillRect(X-26,B-208,52,6);onion(x,X,B-208,24,'#e8c860','#7a5a18');
  [[-58,-158],[58,-158]].forEach(([dx,dy])=>{logs(x,X+dx-8,B+dy-22,16,22);onion(x,X+dx,B+dy-22,10,'#6aa070','#1e4a2a')});
  x.fillStyle='#120c06';x.beginPath();x.moveTo(X-16,B);x.lineTo(X-16,B-40);x.quadraticCurveTo(X,B-60,X+16,B-40);x.lineTo(X+16,B);x.fill();x.strokeStyle='#c8c0a8';x.lineWidth=3;x.stroke();
  [[-56,-70],[44,-70],[100,-50],[128,-50]].forEach(([dx,dy])=>{const g=x.createLinearGradient(0,B+dy,0,B+dy+24);g.addColorStop(0,'#3a3020');g.addColorStop(1,'#0a0806');x.fillStyle=g;x.beginPath();x.moveTo(X+dx,B+dy+24);x.lineTo(X+dx,B+dy+6);x.quadraticCurveTo(X+dx+6,B+dy-2,X+dx+12,B+dy+6);x.lineTo(X+dx+12,B+dy+24);x.fill();x.strokeStyle='#c8c0a8';x.lineWidth=1.5;x.stroke()});
  orthCross(x,X,B-66,14,'#c8a850',1.6)}
function grave(x,X,Y,s,blue){shadowAt(x,X,Y+2,20*s,.5);ell(x,X,Y,18*s,6*s,[60,46,30]);ell(x,X,Y-1.5*s,15*s,4.5*s,[80,62,40]);for(let i=0;i<8;i++)ell(x,X+(R()-.5)*24*s,Y-1+(R()-.5)*6*s,1.5*s,1*s,P2([[200,40,60],[240,200,60],[230,230,240],[60,120,200]]),.9);
  wood(x,X-1.5*s,Y-40*s,3*s,38*s,1);x.save();x.translate(X,Y-2*s);orthCross(x,0,0,38*s,'#5a4a36',2.6*s);x.restore();
  if(blue){x.strokeStyle='#4a7ab0';x.lineWidth=1.2*s;x.beginPath();x.rect(X-22*s,Y-14*s,44*s,16*s);x.stroke();for(let k=-22;k<=22;k+=4){x.beginPath();x.moveTo(X+k*s,Y+2*s);x.lineTo(X+k*s,Y-14*s);x.stroke()}}}
function paintKirche(){const o=S0;sky(o);far(o);ground(o);
  let x=lay();bgRow(x,30,206,250,12,22,0);[[250,250,6,0,96],[680,250,6,1,100],[760,256,7,-1,96],[160,256,6,1,92]].forEach(b=>birch(x,...b));[[250,110,16],[680,100,16],[760,110,18],[160,104,16]].forEach(([a,b,r])=>foliage(x,a,b,r));put(x,.5);
  x=lay();grass(x,7000,o.hz,500,1);details(x);dirt(x,30);put(x);
  x=lay();churchBig(x,460,302);fence2(x,-10,330,340,null);fence2(x,590,820,342,null);
  [[90,360,.7,1],[200,372,.75,0],[300,384,.8,1],[640,370,.75,0],[740,378,.8,1],[150,420,.95,0],[290,440,1,1],[700,430,.95,1],[606,436,1,0]].forEach(([X,Y,s,b])=>grave(x,X,Y,s,b));
  deadTree(x,60,440,260,8,'#1e1a14');sign(x,110,486,1.7,[[-1,0,'Zurück ins Dorf','hZD2']]);put(x);
  x=lay();birch(x,790,520,42,-6);foliage(x,770,30,60);grass(x,700,470,515,2.4,1);bush(x,20,500,40,1);put(x,1);
  x=lay();for(let i=0;i<24;i++)dab(x,R()*800,380+R()*100,30+R()*40,[200,200,210],.16);put(x,8,'screen',.5);rays(o,[[.2,.06]]);grade(o)}
const KATER=`<g stroke="#0a0a0c" stroke-width="1" stroke-linejoin="round" stroke-linecap="round">
<path d="M8,0C18,1 26,-3 27,-10C28,-16 24,-20 20,-18C18,-16 20,-12 18,-9C16,-6 12,-5 6,-5Z" fill="#1e1e24"/>
<path d="M-15,0C-19,-8 -19,-20 -14,-28C-11,-33 -8,-36 -6,-38L8,-38C12,-34 15,-28 16,-20C17,-12 16,-5 12,0Z" fill="#1e1e24"/>
<path d="M6,-36C11,-30 14,-22 14,-14C14,-8 13,-3 12,0C16,-5 17,-12 16,-20C15,-28 12,-34 8,-38Z" fill="#141418" stroke="none"/>
<path d="M-12,-26C-14,-18 -14,-10 -12,-4M-4,-20C-6,-12 -6,-6 -5,0M4,-20C4,-12 5,-6 6,0" fill="none" stroke="#3a3a44" stroke-width=".6"/>
<path d="M-9,0C-10,-3 -9,-6 -6,-6C-3,-6 -2,-3 -3,0ZM-1,0C-2,-3 -1,-6 2,-6C5,-6 6,-3 5,0Z" fill="#24242a"/><path d="M-7,-1V-3M-5,-1V-3M1,-1V-3M3,-1V-3" fill="none" stroke="#4a4a52" stroke-width=".4"/>
<path d="M-4,-30C-6,-24 -6,-18 -4,-14C-2,-12 2,-12 4,-14C5,-18 5,-24 3,-30Z" fill="#2a2a32" stroke="none"/>
<path d="M-12,-46L-14,-58L-5,-50Z" fill="#1e1e24"/><path d="M-11.6,-48L-12.6,-55L-7,-50.4Z" fill="#5a3a44" stroke="none"/>
<path d="M10,-48L13,-58L4,-51Z" fill="#1e1e24"/><path d="M9.6,-50L11.6,-55.4L6,-51Z" fill="#4a2e38" stroke="none"/>
<path d="M-14,-42C-15,-48 -10,-52 -2,-52C6,-52 12,-48 12,-42C12,-36 7,-31 -1,-31C-8,-31 -13,-36 -14,-42Z" fill="#1e1e24"/>
<path d="M4,-51C10,-48 12,-44 12,-40C11,-36 8,-33 4,-32C8,-36 8,-44 4,-51Z" fill="#141418" stroke="none"/>
<path d="M-9,-43C-7,-45.4 -4,-45.4 -3,-43C-4,-41.2 -7.6,-41.2 -9,-43Z" fill="#e8d030" stroke-width=".6"/><path d="M1,-43C2,-45.4 5,-45.4 7,-43C5.6,-41.2 2,-41.2 1,-43Z" fill="#e8d030" stroke-width=".6"/>
<path d="M-6,-45V-41M4,-45V-41" stroke="#000" stroke-width="1"/><path d="M-9.4,-44C-7,-46.4 -4,-46.6 -2.6,-44.6M.6,-44.6C2,-46.6 5,-46.4 7.4,-44" fill="none" stroke-width="1.1"/>
<path d="M-2,-38L0,-38L-1,-36.6Z" fill="#a05060" stroke-width=".4"/><path d="M-1,-36.6C-1,-35 -3,-34.4 -4,-35.2M-1,-36.6C-1,-35 1,-34.4 2,-35.2" fill="none" stroke="#3a3a44" stroke-width=".5"/>
<path d="M-4,-37L-16,-38.6M-4,-36L-15,-34M2,-37L14,-38.6M2,-36L13,-34" fill="none" stroke="#a8a8b0" stroke-width=".4"/>
<path d="M-8,-50C-6,-49 -4,-48.6 -2,-49M2,-49C4,-48.6 6,-49 8,-50" fill="none" stroke="#3a3a44" stroke-width=".5"/>
</g>`;
function appleTree(x,X,B){shadowAt(x,X,B+2,60,.55);x.lineCap='round';
  const br=(x0,y0,a,l,w,d)=>{if(d>4)return;const x1=x0+Math.cos(a)*l,y1=y0+Math.sin(a)*l;x.lineWidth=w;x.strokeStyle=d?'#4a3a28':'#3a2a1a';x.beginPath();x.moveTo(x0,y0);x.quadraticCurveTo((x0+x1)/2+(R()-.5)*l*.4,(y0+y1)/2,x1,y1);x.stroke();for(let i=0;i<2;i++)br(x1,y1,a+(R()-.5)*1.3,l*.68,w*.62,d+1)};
  br(X,B,-1.57,36,10,0);for(let i=0;i<9;i++)foliage(x,X+(R()-.5)*90,B-70+(R()-.5)*50,22+R()*10,0,1);
  for(let i=0;i<22;i++){const a=R()*6.28,r=Math.sqrt(R())*48,ax=X+Math.cos(a)*r,ay=B-72+Math.sin(a)*r*.6;ell(x,ax,ay,3.2,3,[176,30,20]);ell(x,ax-1,ay-1,1.1,1,[255,140,120],.8)}
  for(let i=0;i<4;i++)ell(x,X-30+R()*60,B+2+R()*6,3,2.4,[150,40,20])}