// ================= Sumpf =================
const WC=[440,318],inWater=(X,Y)=>((X-WC[0])/292)**2+((Y-WC[1])/64)**2<1;
function water(x){const pts=[];for(let i=0;i<56;i++){const a=i/56*6.283;pts.push([WC[0]+Math.cos(a)*(282+fbm(i*.35,3,2)*30),WC[1]+Math.sin(a)*(60+fbm(i*.35,9,2)*12)])}
  const p=new Path2D('M'+pts.map(q=>q[0].toFixed(1)+','+q[1].toFixed(1)).join('L')+'Z');
  x.lineWidth=12;x.strokeStyle='rgba(36,28,16,.85)';x.stroke(p);x.lineWidth=5;x.strokeStyle='rgba(96,84,52,.6)';x.stroke(p);
  const g=x.createLinearGradient(0,250,0,392);g.addColorStop(0,'#8c9c86');g.addColorStop(.3,'#4a5e4c');g.addColorStop(1,'#13201a');x.fillStyle=g;x.fill(p);
  x.save();x.clip(p);for(let X=130;X<760;X+=6)dab(x,X,258,8+R()*9,[22,32,26],.35);
  for(let i=0;i<140;i++){const Y=252+Math.pow(R(),1.5)*140,X=140+R()*620,l=10+R()*50;x.strokeStyle=`rgba(205,215,185,${.05+R()*.12})`;x.lineWidth=.6+R();x.beginPath();x.moveTo(X,Y);x.lineTo(X+l,Y);x.stroke()}
  for(let i=0;i<260;i++)ell(x,140+R()*620,252+R()*140,1+R()*4,.5+R()*1.5,mix([40,70,30],[96,126,50],R()),.35);x.restore()}
function lily(x,X,Y,r){ell(x,X+.6,Y+.6,r,r*.42,[10,20,12],.5);ell(x,X,Y,r,r*.42,mix([50,96,36],[96,140,56],R()));x.strokeStyle='rgba(20,40,16,.8)';x.lineWidth=.6;x.beginPath();x.moveTo(X,Y);x.lineTo(X+r*.9,Y-r*.15);x.stroke();
  if(R()<.3){dab(x,X-r*.2,Y-r*.3,r*.8,[255,240,250],.6);ell(x,X-r*.2,Y-r*.35,r*.35,r*.22,[250,236,244]);ell(x,X-r*.2,Y-r*.4,r*.12,r*.08,[240,200,60])}}
function reeds(x,X,Y,n,h,dk){for(let i=0;i<n;i++){const px=X+(R()-.5)*n*2.2,hh=h*(.6+R()*.6),b=(R()-.5)*hh*.3;
  x.strokeStyle=rgba(dk?mix([12,20,10],[30,44,20],R()):mix([50,70,26],[132,142,62],R()));x.lineWidth=.8+R()*1.1*(h/40);x.lineCap='round';x.beginPath();x.moveTo(px,Y);x.quadraticCurveTo(px+b*.3,Y-hh*.6,px+b,Y-hh);x.stroke();
  if(R()<.22)ell(x,px+b*.9,Y-hh*.88,1.5*(h/40)+.6,4.4*(h/40)+1,dk?[30,20,10]:[96,58,28],1,b/hh)}}
function ripple(x,X,Y,r){x.strokeStyle='rgba(210,220,190,.35)';x.lineWidth=.6;for(let k=1;k<4;k++){x.beginPath();x.ellipse(X,Y,r*k*.6,r*k*.16,0,0,7);x.stroke()}}
function swampLog(x,X,Y){shadowAt(x,X,Y+6,50,.5);x.save();x.translate(X,Y);x.rotate(-.06);wood(x,-44,-10,88,15,0);x.strokeStyle='rgba(15,8,2,.8)';x.lineWidth=.8;x.strokeRect(-44,-10,88,15);
  const g=x.createRadialGradient(-45,-3,0,-45,-3,8);g.addColorStop(0,'#b08a5a');g.addColorStop(1,'#3a2410');x.fillStyle=g;x.beginPath();x.ellipse(-45,-2.5,4.5,7.5,0,0,7);x.fill();
  for(let i=0;i<50;i++)ell(x,-40+R()*80,-10+R()*4,1+R()*2,.8+R(),mix([50,80,24],[110,140,40],R()),.85);x.restore()}
function paintSumpf(){const o=S0;sky(o);far(o);ground(o);
  let x=lay();for(let i=0;i<16;i++){const X=R()*800,Y=o.hz+4+R()*40;if(R()<.4){const sh=50+R()*60;for(let k=0;k<sh;k+=3)ell(x,X,Y-sh+k,(k/sh)*15+1,2.4,[22,34,28],.9)}else deadTree(x,X,Y,80+R()*90,2.5+R()*2,'rgba(30,40,34,.92)')}
  bgRow(x,30,206,250,12,22,0);put(x,.8);
  x=lay();grass(x,6000,o.hz,500,1);details(x);dirt(x,30);put(x);
  x=lay();water(x);[[180,300,190,7],[730,292,230,8],[120,334,160,6]].forEach(([X,Y,h,w])=>deadTree(x,X,Y,h,w,'#1a1a14'));
  for(let i=0;i<34;i++){const X=170+R()*560,Y=262+R()*124;if(inWater(X,Y))lily(x,X,Y,(2.5+R()*4)*(.5+(Y-250)/120))}
  ell(x,290,384,34,7,[8,14,10],.5);rock(x,290,380,30,1);ripple(x,290,384,30);ell(x,460,334,22,5,[8,14,10],.5);rock(x,460,330,19,1);ripple(x,460,334,20);swampLog(x,600,384);ripple(x,600,390,40);
  reeds(x,150,262,14,30);reeds(x,720,262,14,32);reeds(x,140,330,18,46);reeds(x,746,320,16,44);reeds(x,200,392,14,40);reeds(x,690,392,16,44);reeds(x,420,392,10,30);
  sign(x,176,398,1.4,[[1,0,'Sumpf der',null],[1,12,'ertrunkenen Huren',null]]);bush(x,70,420,30,0);bush(x,760,416,30,0);put(x);
  x=lay();for(let i=0;i<30;i++)dab(x,140+R()*620,270+R()*110,30+R()*40,[200,220,200],.22);put(x,8,'screen',.5);
  x=lay();sign(x,110,476,1.7,[[-1,0,'Zum Waldweg','hZG2']]);reeds(x,30,500,26,90,1);reeds(x,770,500,26,96,1);grass(x,500,470,515,2.4,1);put(x,1);
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
  const roof=new Path2D('M130,158L176,134L292,212L246,238Z');x.save();x.clip(roof);x.fillStyle='#3a3226';x.fill(roof);for(let i=0;i<40;i++){const t=i/40;x.strokeStyle=R()<.4?'rgba(10,8,4,.8)':'rgba(120,108,84,.4)';x.lineWidth=1.4;x.beginPath();x.moveTo(130+46*t,158-24*t);x.lineTo(246+46*t,238-24*t);x.stroke()}
  for(let i=0;i<120;i++)ell(x,140+R()*140,150+R()*80,1+R()*3,.8+R()*2,mix([40,60,20],[90,110,40],R()),.7,R());x.restore();
  x.lineCap='round';x.strokeStyle='#1a140c';x.lineWidth=7;x.beginPath();x.moveTo(14,240);x.lineTo(130,156);x.lineTo(248,240);x.stroke();x.strokeStyle='#b8b4a4';x.lineWidth=4;x.stroke();
  for(let t=.1;t<.95;t+=.12)for(const s of[-1,1]){const X=130+s*116*t,Y=156+84*t;x.fillStyle='#b8b4a4';x.beginPath();x.arc(X+s*1,Y+4,2.4,0,Math.PI);x.fill()}
  x.fillStyle='#e8dcc0';x.beginPath();x.arc(130,196,8,0,7);x.fill();x.fillStyle='#4a6a8a';x.beginPath();x.arc(130,196,5,0,7);x.fill();
  x.fillStyle='#1c140c';x.fillRect(56,262,46,86);for(let X=58;X<100;X+=8){wood(x,X,264,7,84,1)}x.fillStyle='rgba(0,0,0,.35)';x.fillRect(58,264,42,84);ell(x,92,306,2,2,[30,26,20]);
  const wg=x.createRadialGradient(176,276,2,176,276,26);wg.addColorStop(0,o.win?'#4a525a':'#ffd890');wg.addColorStop(1,o.win?'#101418':'#a8601c');x.fillStyle=wg;x.fillRect(158,260,36,32);x.fillStyle='#2a1a0c';x.fillRect(175,260,2,32);x.fillRect(158,275,36,2);
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
<defs><pattern id="nm" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0,0H6M0,0V6" stroke="#c8bc94" stroke-width=".9"/></pattern></defs>
<path d="M-58,0L-58,-22C-58,-26 -55,-27 -55,-30L-55,-38L-51,-38L-51,-30C-51,-27 -48,-26 -48,-22L-48,0Z" fill="#3c6a40"/><path d="M-56,-20V-4" stroke="#a8d0a0" stroke-width="1.2"/>
<path d="M40,0L42,-18L62,-18L64,0Z" fill="#6a6a70"/><path d="M50,-18L46,-30L52,-26L56,-32L56,-18" fill="#9aa8a0"/>
<path d="M-30,-8L-4,-8L-4,12L-30,12Z" fill="#3c4038"/><path d="M4,-8L30,-8L30,12L4,12Z" fill="#3c4038"/>
<path d="M-28,10L-8,10L-9,58L-27,58Z" fill="#3c4038"/><path d="M8,10L28,10L27,58L9,58Z" fill="#3c4038"/>
<path d="M-29,52L-7,52L-6,74C-10,77 -26,77 -30,74Z" fill="#1c1e1c"/><path d="M7,52L29,52L30,74C26,77 10,77 6,74Z" fill="#1c1e1c"/>
<path d="M-34,-80C-40,-60 -40,-30 -36,-4L36,-4C40,-30 40,-60 34,-80C20,-88 -20,-88 -34,-80Z" fill="#4c5244"/>
<path d="M-36,-68C-12,-64 12,-64 36,-68M-38,-54C-12,-50 12,-50 38,-54M-38,-40C-12,-36 12,-36 38,-40M-37,-26C-12,-22 12,-22 37,-26" fill="none" stroke="#2c3028" stroke-width=".8"/>
<path d="M0,-84V-6" stroke="#2c3028"/>
<path d="M-18,-30C-6,-34 10,-34 22,-28C34,-10 40,20 44,60C30,66 14,64 4,58C2,30 -6,4 -18,-6Z" fill="url(#nm)" stroke="#9a8e6a" stroke-width=".8"/>
<ellipse cx="38" cy="40" rx="3" ry="2" fill="#d8642a"/><ellipse cx="28" cy="58" rx="3" ry="2" fill="#d8642a"/><ellipse cx="-12" cy="-12" rx="3" ry="2" fill="#d8642a"/>
<path d="M-34,-78C-46,-60 -44,-36 -30,-22L-14,-18L-16,-30L-28,-34C-32,-48 -30,-62 -26,-72Z" fill="#4c5244"/><path d="M34,-78C46,-60 44,-36 30,-24L14,-20L16,-32L28,-36C32,-50 30,-62 26,-72Z" fill="#4c5244"/>
<ellipse cx="-12" cy="-22" rx="8" ry="6" fill="#c88a64"/><ellipse cx="12" cy="-24" rx="8" ry="6" fill="#c88a64"/>
<path d="M-8,-86L-8,-92L8,-92L8,-86Z" fill="#c88a64"/>
<ellipse cx="0" cy="-104" rx="15" ry="18" fill="#d09070"/>
<path d="M-15,-102C-18,-88 -12,-74 0,-70C12,-74 18,-88 15,-102C10,-96 4,-94 0,-95C-4,-94 -10,-96 -15,-102Z" fill="#b8b4aa"/>
<path d="M-6,-84C-3,-80 3,-80 6,-84M-9,-90C-6,-86 -2,-85 0,-86" fill="none" stroke="#8a867c" stroke-width=".7"/>
<path d="M-8,-98C-4,-101 4,-101 8,-98C4,-96 -4,-96 -8,-98Z" fill="#a8a498"/>
<ellipse cx="0" cy="-102" rx="4" ry="3.5" fill="#c06050"/>
<path d="M-9,-108C-7,-107 -4,-107 -3,-108M3,-108C4,-107 7,-107 9,-108" fill="none"/>
<path d="M-11,-112C-8,-114 -4,-114 -2,-112.5M2,-112.5C4,-114 8,-114 11,-112" fill="none" stroke="#9a968c" stroke-width="2.2"/>
<path d="M5,-97L17,-94" stroke="#e8e4d8" stroke-width="2"/><circle cx="17.5" cy="-94" r="1.4" fill="#ff7030" stroke="none"/>
<path d="M-18,-114L-22,-94L-14,-92L-14,-112Z" fill="#5a4a3a"/><path d="M18,-114L22,-94L14,-92L14,-112Z" fill="#5a4a3a"/>
<path d="M-18,-112C-20,-130 -10,-138 0,-138C10,-138 20,-130 18,-112Z" fill="#5a4a3a"/>
<path d="M-19,-118C-10,-123 10,-123 19,-118L18,-112C10,-116 -10,-116 -18,-112Z" fill="#6e5c48"/>
<path d="M-12,-130l2,-4M-4,-134l1,-3M6,-133l-1,-3M13,-128l-2,-3" fill="none" stroke="#3a2e22" stroke-width=".7"/></g>`;
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
function paintDorf(){const o=S0;sky(o);far(o);ground(o);
  let x=lay();chapel(x,330,214,.5);bgRow(x,26,208,240,10,18,0);[[150,236,5,0,96],[560,226,4,1,104],[740,234,6,-1,96]].forEach(b=>birch(x,...b));put(x,.6);
  x=lay();grass(x,7000,o.hz,500,1);details(x);dirt(x,50);[[300,336,14],[540,348,18],[396,420,30],[470,472,26],[150,348,12],[700,350,16]].forEach(([X,Y,r])=>mud(x,X,Y,r));put(x);
  x=lay();izba(x,220,300,.5,0,{win:'dark',smoke:0});wood(x,180,246,80,10,0);x.fillStyle='#b8302a';x.font='bold 8px Georgia';x.textAlign='center';x.fillText('LADEN',220,254);
  x.fillStyle='#e8e0c8';x.fillRect(197,274,10,8);izba(x,660,298,.5,1,{win:'board',smoke:0});poles(x);well(x,530,338);sign(x,492,346,1.1,[[1,0,'Ins Dorf','hIns']]);sign(x,330,338,1,[[-1,0,'Zur alten Mühle','hMue']]);bush(x,120,320,16,0);bush(x,760,322,18,0);rock(x,340,330,6,1);put(x);
  x=lay();izba(x,130,412,.95,0,{win:'dark',trim:'#7a6a5a',smoke:0});fence2(x,-10,268,428,[236,262]);bush(x,290,424,14,0);
  ruin(x,712,404,.95);for(let i=0;i<30;i++){const X=560+R()*240;reeds(x,X,410+R()*20,3,16,0)}
  wood(x,530,380,60,5,0);wood(x,536,384,6,48,1);wood(x,578,384,6,48,1);shadowAt(x,560,432,36);
  sign(x,110,484,1.7,[[-1,0,'Zu Baba Jaga','hZB']]);put(x);
  x=lay();birch(x,790,520,40,-6);grass(x,700,470,515,2.4,1);bush(x,730,500,40,1);put(x,1);
  rays(o,[[.3,.05]]);grade(o)}
const OMA=`<g stroke="#2a1a0e" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round">
<path d="M-22,0L-22,-16L-8,-16L-6,0Z" fill="#5a5a5e"/><path d="M22,0L22,-16L8,-16L6,0Z" fill="#5a5a5e"/>
<path d="M-34,-14C-36,-50 -32,-80 -28,-100L28,-100C32,-80 36,-50 34,-14Z" fill="#4a3a30"/>
<path d="M-20,-98L20,-98L24,-24L-24,-24Z" fill="#c8bca0"/><path d="M-22,-40H22M-21,-60H21" stroke="#9a3a30" stroke-width="1.2"/>
<path d="M-30,-100C-34,-120 -32,-140 -24,-150L24,-150C32,-140 34,-120 30,-100Z" fill="#6a5a7a"/><path d="M0,-148V-100" stroke="#3a3048"/><circle cx="3" cy="-136" r="1.4" fill="#d8d0c0"/><circle cx="3" cy="-122" r="1.4" fill="#d8d0c0"/><circle cx="3" cy="-108" r="1.4" fill="#d8d0c0"/>
<path d="M-24,-148C-38,-140 -42,-118 -34,-102L-24,-100C-28,-114 -28,-128 -22,-138Z" fill="#6a5a7a"/><path d="M24,-148C38,-140 42,-118 34,-102L24,-100C28,-114 28,-128 22,-138Z" fill="#6a5a7a"/>
<ellipse cx="-30" cy="-99" rx="6" ry="5" fill="#d89a78"/><ellipse cx="30" cy="-99" rx="6" ry="5" fill="#d89a78"/>
<path d="M-26,-150L0,-126L26,-150C14,-156 -14,-156 -26,-150Z" fill="#b02a20"/>
<path d="M-17,-170C-20,-188 -10,-194 0,-194C10,-194 20,-188 17,-170C18,-160 16,-152 8,-148L0,-146L-8,-148C-16,-152 -18,-160 -17,-170Z" fill="#b02a20"/>
<ellipse cx="0" cy="-166" rx="11.5" ry="13.5" fill="#dca080"/>
<path d="M-5,-146L0,-152L5,-146L2,-140Z" fill="#b02a20"/>
<path d="M-11,-178C-6,-183 6,-183 11,-178C6,-180 -6,-180 -11,-178Z" fill="#b02a20"/>
<circle cx="-12" cy="-186" r="2" fill="#f0e070" stroke="none"/><circle cx="8" cy="-188" r="2" fill="#f4f0e8" stroke="none"/><circle cx="14" cy="-172" r="1.8" fill="#f0e070" stroke="none"/><circle cx="-15" cy="-160" r="1.8" fill="#f4f0e8" stroke="none"/><circle cx="20" cy="-148" r="2" fill="#f0e070" stroke="none"/><circle cx="-18" cy="-144" r="2" fill="#f4f0e8" stroke="none"/>
<path d="M-7,-169C-5.5,-170 -3.5,-170 -2.5,-169M2.5,-169C3.5,-170 5.5,-170 7,-169" fill="none"/><circle cx="-5" cy="-167.6" r=".9" fill="#2a1a0e"/><circle cx="5" cy="-167.6" r=".9" fill="#2a1a0e"/>
<path d="M-8,-172.5L-2.5,-171.5M8,-172.5L2.5,-171.5" stroke="#8a8478" stroke-width="1"/>
<path d="M0,-167L-1.5,-161L1.5,-160.6" fill="none" stroke-width=".8"/><ellipse cx="-7" cy="-160" rx="2.5" ry="1.6" fill="#e88a7a" stroke="none" opacity=".6"/><ellipse cx="7" cy="-160" rx="2.5" ry="1.6" fill="#e88a7a" stroke="none" opacity=".6"/>
<path d="M-3.5,-156C-1,-157 1,-157 3.5,-156" fill="none"/><path d="M-9,-163C-8,-161 -8,-159 -9,-157M9,-163C8,-161 8,-159 9,-157" fill="none" stroke="#b07a5a" stroke-width=".6"/><circle cx="6" cy="-155" r=".9" fill="#5a3a2a" stroke="none"/></g>`;
const OPA=`<g stroke="#2a1a0e" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round">
<path d="M-26,0L-26,-10L-8,-10L-6,0Z" fill="#222"/><path d="M26,0L26,-10L8,-10L6,0Z" fill="#222"/>
<path d="M-23,-10L-9,-10L-9,-50L-24,-50Z" fill="#3a3c44"/><path d="M23,-10L9,-10L9,-50L24,-50Z" fill="#3a3c44"/>
<path d="M-27,-62L-3,-62L-5,-47L-27,-47Z" fill="#40424a"/><path d="M27,-62L3,-62L5,-47L27,-47Z" fill="#40424a"/>
<path d="M-30,-62C-34,-90 -32,-112 -24,-122L24,-122C32,-112 34,-90 30,-62Z" fill="#3e3a34"/>
<path d="M-10,-120L10,-120L12,-64L-12,-64Z" fill="#e8e8e8"/><path d="M-10,-114H10M-10.5,-106H10.5M-11,-98H11M-11,-90H11M-11.5,-82H11.5M-12,-74H12" stroke="#2a4a8a" stroke-width="2.4"/>
<ellipse cx="-16" cy="-100" rx="5" ry="3" fill="#1a1612" stroke="none" opacity=".5"/><ellipse cx="18" cy="-80" rx="6" ry="4" fill="#1a1612" stroke="none" opacity=".45"/>
<path d="M-24,-120C-36,-112 -38,-86 -28,-64L-18,-60L-18,-70C-24,-84 -24,-100 -20,-110Z" fill="#3e3a34"/><path d="M24,-120C36,-112 38,-86 28,-66L16,-62L16,-72C22,-86 22,-100 20,-110Z" fill="#3e3a34"/>
<ellipse cx="-20" cy="-58" rx="6" ry="5" fill="#c08a68"/>
<path d="M14,-80L14,-96C14,-99 16,-100 16,-103L16,-108L20,-108L20,-103C20,-100 22,-99 22,-96L22,-80Z" fill="#7a9a6a"/><ellipse cx="18" cy="-64" rx="6" ry="5" fill="#c08a68"/><path d="M15,-70L15,-80L21,-80L21,-70" fill="#7a9a6a"/>
<path d="M-6,-122L-6,-128L6,-128L6,-122Z" fill="#c08a68"/>
<ellipse cx="0" cy="-140" rx="14" ry="16" fill="#c89070"/>
<path d="M-12,-134C-10,-124 -4,-122 0,-122C4,-122 10,-124 12,-134C8,-130 4,-129 0,-129C-4,-129 -8,-130 -12,-134Z" fill="#9a968e"/>
<ellipse cx="-7" cy="-148" rx="5" ry="3" fill="#2a2420" stroke="none" opacity=".55"/><ellipse cx="8" cy="-132" rx="4" ry="2.5" fill="#2a2420" stroke="none" opacity=".5"/>
<circle cx="-5" cy="-143" r="2.6" fill="#f0e8d8"/><circle cx="-5" cy="-143" r="1" fill="#2a1a0e"/><path d="M3,-143C4.5,-144 6.5,-144 8,-143" fill="none"/>
<path d="M0,-141L-1.5,-136L1.5,-135.6" fill="none" stroke-width=".8"/><ellipse cx="0" cy="-136" rx="3" ry="2.5" fill="#c06050" stroke="none" opacity=".7"/>
<path d="M-4,-130C-1,-128 2,-128 4,-130" fill="none"/>
<path d="M-15,-152L-18,-162M-12,-154L-12,-166M15,-150L19,-160M12,-153L14,-164" fill="none" stroke="#5a5450" stroke-width="1.6"/>
<path d="M-16,-150C-18,-160 -8,-166 2,-165C12,-164 20,-158 22,-150C14,-152 -6,-153 -16,-150Z" fill="#4a4844"/><path d="M-6,-163C-4,-165 0,-165 2,-163C0,-161 -4,-161 -6,-163Z" fill="#111" stroke="none"/>
<path d="M-16,-151C-4,-148 14,-148 24,-148L22,-150" fill="none" stroke-width="1.8"/></g>`;
// ================= Dorfstraße & Kirche =================
function laundry(x){[[300,362,58],[368,352,54]].forEach(([X,B,h])=>{shadowAt(x,X,B,8);wood(x,X-2,B-h,4,h,1)});x.strokeStyle='#2a2a2a';x.lineWidth=.7;x.beginPath();x.moveTo(300,306);x.quadraticCurveTo(334,312,368,300);x.stroke();
  [[306,[220,220,214],12,16],[322,[90,110,170],10,22],[338,[230,190,190],22,14],[356,[200,60,50],8,12]].forEach(([X,k,w,h])=>{const Y=306+Math.sin((X-300)/68*3.14)*5;x.fillStyle=rgba(k);x.fillRect(X,Y,w,h);x.fillStyle='rgba(0,0,0,.2)';x.fillRect(X+w*.6,Y,w*.4,h);x.strokeStyle='rgba(20,20,20,.6)';x.strokeRect(X,Y,w,h)})}
function paintDorfstr(){const o=S0;sky(o);far(o);ground(o);
  let x=lay();chapel(x,440,216,.75);bgRow(x,30,206,236,10,18,0);[[180,234,5,0,96],[700,232,5,1,100],[600,226,4,-1,104]].forEach(b=>birch(x,...b));put(x,.6);
  x=lay();grass(x,7000,o.hz,500,1);details(x);dirt(x,50);[[410,380,20],[470,460,28],[380,440,16],[440,300,8]].forEach(([X,Y,r])=>mud(x,X,Y,r));put(x);
  x=lay();izba(x,250,300,.5,0,{win:'dark',smoke:0});izba(x,620,296,.5,1,{win:'board',smoke:0});bush(x,330,306,14,0);bush(x,540,310,16,0);laundry(x);sign(x,488,360,1.1,[[1,0,'Zur Kirche','hKi']]);put(x);
  x=lay();for(let i=0;i<7;i++)sunflower(x,46+i*30+R()*8,412,40+R()*20);izba(x,140,420,.95,0,{trim:'#4a8a5a'});fence2(x,-10,272,436,[240,266]);
  izba(x,690,410,.9,1,{trim:'#8a4a4a'});fence2(x,560,810,428,null);bush(x,540,428,16,0);bucket(x,300,440);
  sign(x,110,486,1.7,[[-1,0,'Zum Dorfeingang','hDE']]);put(x);
  x=lay();sign(x,488,360,1.1,[[-1,14,'Zum Schmiedehof','hSm']]);put(x); // zweites Brett am Kirchenschild: neuer Ort
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
<path d="M12,-2C24,-2 28,-12 22,-18C18,-21 14,-16 16,-12" fill="none" stroke="#1c1c22" stroke-width="5"/>
<path d="M-15,0C-19,-10 -17,-24 -10,-32L10,-32C17,-24 19,-10 15,0Z" fill="#1c1c22"/><path d="M-7,0V-12M7,0V-12M-4,-28C-2,-20 2,-20 4,-28" fill="none" stroke="#44444e" stroke-width=".8"/>
<path d="M-10,-42L-12,-56L-3,-47Z" fill="#1c1c22"/><path d="M10,-42L12,-55L8,-52L9,-50L4,-47Z" fill="#1c1c22"/>
<ellipse cx="0" cy="-39" rx="11.5" ry="9" fill="#1c1c22"/>
<ellipse cx="-4.6" cy="-40" rx="2.8" ry="2.1" fill="#e8d030"/><ellipse cx="4.6" cy="-40" rx="2.8" ry="2.1" fill="#e8d030"/><path d="M-4.6,-41.8V-38.2M4.6,-41.8V-38.2" stroke="#000" stroke-width="1.1"/>
<path d="M2,-46L7,-36" stroke="#6a5a5a" stroke-width=".8"/><path d="M-1,-35.6L1,-35.6L0,-34.2Z" fill="#a05060"/>
<path d="M-3,-34L-14,-35M-3,-33L-13,-31M3,-34L14,-35M3,-33L13,-31" stroke="#9a9aa4" stroke-width=".5"/></g>`;
function appleTree(x,X,B){shadowAt(x,X,B+2,60,.55);x.lineCap='round';
  const br=(x0,y0,a,l,w,d)=>{if(d>4)return;const x1=x0+Math.cos(a)*l,y1=y0+Math.sin(a)*l;x.lineWidth=w;x.strokeStyle=d?'#4a3a28':'#3a2a1a';x.beginPath();x.moveTo(x0,y0);x.quadraticCurveTo((x0+x1)/2+(R()-.5)*l*.4,(y0+y1)/2,x1,y1);x.stroke();for(let i=0;i<2;i++)br(x1,y1,a+(R()-.5)*1.3,l*.68,w*.62,d+1)};
  br(X,B,-1.57,36,10,0);for(let i=0;i<9;i++)foliage(x,X+(R()-.5)*90,B-70+(R()-.5)*50,22+R()*10,0,1);
  for(let i=0;i<22;i++){const a=R()*6.28,r=Math.sqrt(R())*48,ax=X+Math.cos(a)*r,ay=B-72+Math.sin(a)*r*.6;ell(x,ax,ay,3.2,3,[176,30,20]);ell(x,ax-1,ay-1,1.1,1,[255,140,120],.8)}
  for(let i=0;i<4;i++)ell(x,X-30+R()*60,B+2+R()*6,3,2.4,[150,40,20])}