// ================= Gebäude-Realismus =================
// Gemeinsamer Material-Baukasten für alle Häuser: runde Blockbalken mit Werg in den Fugen, Rissen, Ästen und
// Hirnholz-Köpfen; Schindel- und Strohdächer mit Überlappung, Schlagschatten und Moos; tiefe Fenster mit
// Himmelsspiegelung und geschnitzten, abblätternden Rahmen; Metall- und Holzschuppen-Kuppeln; Verwitterung
// (Regenschlieren, Spritzwasserzone, Umgebungsverdeckung). Licht kommt immer von der Sonne der Szene.
// Eigene Zufallsfolge (gr) -> die übrige Szene (R()) bleibt unverändert.
let GS7=1;const gr=()=>(GS7=GS7*16807%2147483647)/2147483647,gseed=v=>{GS7=Math.abs(Math.round(v*97))%2147483000+11;gr();gr()};
// Lichtseite in lokalen Koordinaten: -1 = Licht von links, 1 = von rechts (berücksichtigt Spiegelung/Skalierung)
function litSide(x,X){const t=x.getTransform(),wx=(t.a*X+t.e)/SC,s=S0&&S0.sun?S0.sun[0]:300;return(Math.sign(s-wx)||-1)*(Math.sign(t.a)||1)}
const QP=pts=>new Path2D('M'+pts.map(q=>q[0].toFixed(2)+','+q[1].toFixed(2)).join('L')+'Z');

// ----- Hirnholz (Balkenkopf) -----
function logEnd(x,X,Y,r,lx,k){ell(x,X-lx*r*.45,Y+r*.3,r*1.02,r*.92,[0,0,0],.38);
  const g=x.createRadialGradient(X+lx*r*.35,Y-r*.4,r*.05,X,Y,r);g.addColorStop(0,'#c9ab84');g.addColorStop(.55,'#93745a');g.addColorStop(1,'#4c3826');x.fillStyle=g;x.beginPath();x.arc(X,Y,r,0,7);x.fill();
  x.fillStyle=`rgba(140,136,128,${.25+rn(k,1)*.25})`;x.fill();
  const cx=X+(rn(k,3)-.5)*r*.35,cy=Y+(rn(k,5)-.5)*r*.35;x.lineWidth=Math.max(.25,r*.05);
  for(let q=r*.1;q<r*.86;q+=r*.12){x.strokeStyle=`rgba(64,40,20,${.22+rn(k,q*31|0)*.3})`;x.beginPath();x.ellipse(cx,cy,q*(1.04+(rn(k,q*7|0)-.5)*.12),q,0,0,7);x.stroke()}
  ell(x,cx,cy,r*.1,r*.09,[60,36,16],.7);
  x.strokeStyle='rgba(16,8,2,.85)';x.lineWidth=Math.max(.4,r*.07);const a=rn(k,11)*6.28;x.beginPath();x.moveTo(cx,cy);x.lineTo(X+Math.cos(a)*r*.96,Y+Math.sin(a)*r*.96);x.stroke();
  if(rn(k,13)<.5){const b=a+1.5+rn(k,17)*2;x.lineWidth*=.6;x.beginPath();x.moveTo(cx,cy);x.lineTo(X+Math.cos(b)*r*.7,Y+Math.sin(b)*r*.7);x.stroke()}
  x.strokeStyle='rgba(34,22,12,.95)';x.lineWidth=r*.15;x.beginPath();x.arc(X,Y,r*.93,0,7);x.stroke();
  x.strokeStyle='rgba(255,236,200,.28)';x.lineWidth=r*.08;x.beginPath();x.arc(X,Y,r*.8,lx<0?Math.PI*.95:Math.PI*1.55,lx<0?Math.PI*1.45:Math.PI*2.05);x.stroke();
  x.strokeStyle='rgba(0,0,0,.4)';x.beginPath();x.arc(X,Y,r*.8,lx<0?-.2:Math.PI*.55,lx<0?Math.PI*.45:Math.PI*1.2);x.stroke()}

// ----- Rundholzwand: Balken von unten (yB) nach oben (yT), Durchmesser d -----
function roundLogs(x,x0,x1,yB,yT,d,o={}){const lx=o.lx??litSide(x,(x0+x1)/2),grey=o.grey??.35,tone=o.tone||[118,84,52],W=x1-x0;gseed(o.seed??(x0*13+yB*7+d));
  const pat=x.createPattern(woodTex(false),'repeat');x.fillStyle='#140d07';x.fillRect(x0,yT-1,W,yB-yT+1);
  const rows=[];for(let y=yB;y>yT+.5;){const h=d*(.9+gr()*.2);rows.push([y-h,h]);y-=h}
  rows.forEach(([y,h],i)=>{const ph=gr()*9,amp=Math.min(1.3,h*.08),eT=X=>Math.sin(X/(15+i%4*3)+ph)*amp*.5+(vn(X/8+ph*3,i*1.7)-.5)*amp,eB=X=>(vn(X/10+ph*2,i*2.3+5)-.5)*amp*.7;
    const p=new Path2D();p.moveTo(x0,y+eT(x0));for(let X=x0+3;X<x1;X+=3)p.lineTo(X,y+eT(X));p.lineTo(x1,y+eT(x1));for(let X=x1;X>x0;X-=3)p.lineTo(X,y+h+eB(X));p.lineTo(x0,y+h+eB(x0));p.closePath();
    x.save();x.clip(p);pat.setTransform(new DOMMatrix().translate(x0-gr()*380,y-gr()*90).scale(.5,.3+h/90));x.fillStyle=pat;x.fillRect(x0,y-2,W,h+4);
    x.fillStyle=rgba(mix(tone,[150,146,138],grey*(.5+gr()*.7)),.4);x.fillRect(x0,y-2,W,h+4);
    const wg=x.createLinearGradient(x0,0,x1,0),nk=Math.max(3,Math.round(W/22));for(let k=0;k<=nk;k++){const n=vn(k*1.37+i*4.1,ph*2);wg.addColorStop(k/nk,n>.5?`rgba(200,196,186,${(n-.5)*grey*.9})`:`rgba(24,14,4,${(.5-n)*.55})`)}x.fillStyle=wg;x.fillRect(x0,y-2,W,h+4);
    const g=x.createLinearGradient(0,y,0,y+h);g.addColorStop(0,'rgba(8,4,0,.85)');g.addColorStop(.1,'rgba(8,4,0,.35)');g.addColorStop(.26,'rgba(255,238,205,.24)');g.addColorStop(.4,'rgba(255,238,205,.1)');
    g.addColorStop(.62,'rgba(0,0,0,0)');g.addColorStop(.85,'rgba(6,3,0,.42)');g.addColorStop(1,'rgba(4,2,0,.85)');x.fillStyle=g;x.fillRect(x0,y-2,W,h+4);
    const nc=Math.floor(W/70*(.5+gr())+gr()*1.6);for(let k=0;k<nc;k++){const cx=x0+gr()*W,cy=y+h*(.32+gr()*.3),L=10+gr()*Math.min(80,W*.45);
      x.strokeStyle='rgba(10,5,0,.8)';x.lineWidth=Math.max(.35,h*.05);x.beginPath();x.moveTo(cx,cy);for(let s=4;s<=L;s+=4)x.lineTo(cx+s,cy+Math.sin(s/7+k)*h*.025);x.stroke();
      x.strokeStyle='rgba(255,236,200,.16)';x.lineWidth=Math.max(.3,h*.035);x.beginPath();x.moveTo(cx+1,cy+h*.06);x.lineTo(cx+L,cy+h*.06);x.stroke()}
    if(gr()<.55){const kx=x0+gr()*W,ky=y+h*(.35+gr()*.3),kr=h*(.1+gr()*.07);ell(x,kx,ky,kr*1.4,kr,[36,22,8],.85);ell(x,kx-kr*.3,ky-kr*.3,kr*.6,kr*.35,[150,120,90],.35)}
    x.restore();
    // Werg/Moos in der Fuge darüber
    if(i<rows.length-1)for(let X=x0;X<x1;X+=Math.max(.9,h*.13)){if(gr()<.5)continue;x.strokeStyle=rgba(mix([92,84,58],[176,164,122],gr()),.7+gr()*.3);x.lineWidth=Math.max(.3,h*.05);x.beginPath();x.moveTo(X,y-h*.08);x.lineTo(X+(gr()-.5)*h*.3,y+h*(.06+gr()*.12));x.stroke()}});
  if(o.ends)rows.forEach(([y,h],i)=>[[0,x0],[1,x1]].forEach(([s,X])=>{if(!o.ends[s])return;logEnd(x,X+(s?1:-1)*h*.24,y+h*.52,h*.6,lx,i*7+s+(o.seed||x0))}));
  return rows}

// ----- Licht, Verwitterung und Schatten auf einer Wandfläche (clip = Path2D der Wand) -----
function wallFX(x,clip,x0,x1,yT,yB,o={}){const lx=o.lx??litSide(x,(x0+x1)/2),H=yB-yT,W=x1-x0;gseed(x0*3+yB);x.save();x.clip(clip);
  const sg=x.createLinearGradient(x0,0,x1,0);sg.addColorStop(lx<0?0:1,'rgba(255,232,190,.07)');sg.addColorStop(lx<0?1:0,`rgba(0,0,10,${o.side??.22})`);x.fillStyle=sg;x.fillRect(x0,yT,W,H);
  if(o.dark){x.fillStyle=`rgba(4,6,12,${o.dark})`;x.fillRect(x0,yT,W,H)}
  const eh=o.eave??H*.16;if(eh>0){const eg=x.createLinearGradient(0,yT,0,yT+eh);eg.addColorStop(0,'rgba(0,0,0,.72)');eg.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=eg;x.fillRect(x0,yT,W,eh)}
  for(let X=x0;X<x1;X+=Math.max(1.2,W/90)){const n=Math.pow(vn(X/6.5,yT*.1+3),3);if(n<.12)continue;const L=H*(.25+vn(X/11,9)*.6),g=x.createLinearGradient(0,yT,0,yT+L);g.addColorStop(0,`rgba(20,16,10,${n*.42})`);g.addColorStop(1,'rgba(20,16,10,0)');x.fillStyle=g;x.fillRect(X,yT,Math.max(.8,W/140),L)}
  (o.streaks||[]).forEach(([a,b,Y])=>{for(let X=a;X<b;X+=1.3){const L=(yB-Y)*(.3+vn(X/3,Y)*.7),g=x.createLinearGradient(0,Y,0,Y+L);g.addColorStop(0,`rgba(16,12,8,${.12+vn(X/2,Y+1)*.25})`);g.addColorStop(1,'rgba(16,12,8,0)');x.fillStyle=g;x.fillRect(X,Y,1.1,L)}});
  const sp=Math.min(H*.22,26),bg=x.createLinearGradient(0,yB-sp,0,yB);bg.addColorStop(0,'rgba(22,26,12,0)');bg.addColorStop(.6,'rgba(22,26,12,.35)');bg.addColorStop(1,'rgba(8,8,4,.75)');x.fillStyle=bg;x.fillRect(x0,yB-sp,W,sp);
  for(let i=0;i<W*.15;i++){const X=x0+gr()*W,Y=yB-gr()*sp*.9;ell(x,X,Y,.6+gr()*1.6,.4+gr(),gr()<.6?[60,74,30]:[30,26,18],.25+gr()*.3)}
  x.restore()}

// ----- Schindeldach (A,B = First links/rechts, C,D = Traufe rechts/links); A==B ergibt ein Zeltdach -----
function shingleRoof(x,A,B,C,D,o={}){gseed(o.seed??(A[0]*7+A[1]*3+C[0]));const n=o.rows||10,sw=o.sw||8,tone=o.tone||[104,92,76],lx=o.lx??litSide(x,(A[0]+C[0])/2),moss=o.moss??.3,grey=o.grey??.45,lem=o.lemekh;
  const P=(u,t)=>{const tx=A[0]+(B[0]-A[0])*u,ty=A[1]+(B[1]-A[1])*u,bx=D[0]+(C[0]-D[0])*u,by=D[1]+(C[1]-D[1])*u;return[tx+(bx-tx)*t,ty+(by-ty)*t]};
  const poly=QP([A,B,C,D]);x.save();x.clip(poly);x.fillStyle='#100c08';x.fill(poly);
  for(let r=n-1;r>=0;r--){const t0=r/n-.004,t1=(r+1)/n,pa=P(0,(t0+t1)/2),pb=P(1,(t0+t1)/2),wid=Math.hypot(pb[0]-pa[0],pb[1]-pa[1]),k=Math.max(1,Math.round(wid/sw)),off=(r%2)*.5/k,dt=1/n;
    for(let j=-1;j<=k;j++){const u0=j/k+off+(gr()-.5)*.12/k,u1=(j+1)/k+off-(.05+gr()*.07)/k,tb=t1+(gr()-.3)*.18*dt;
      const v=gr(),col=mix(mix(tone,[164,160,150],grey*(.4+v*.8)),[26,20,14],gr()*.3),a=P(u0,t0),b=P(u1,t0),c=P(u1,tb),d=P(u0,tb);
      const p=new Path2D();p.moveTo(...a);p.lineTo(...b);p.lineTo(...c);if(lem){const m=P((u0+u1)/2,tb+.45*dt);p.quadraticCurveTo(c[0]+(m[0]-c[0])*.2,m[1],...m);p.quadraticCurveTo(d[0]+(m[0]-d[0])*.2,m[1],...d)}else p.lineTo(...d);p.closePath();
      x.fillStyle=rgba(col);x.fill(p);
      const gg=x.createLinearGradient(...a,...(lem?P((u0+u1)/2,tb+.45*dt):d));gg.addColorStop(0,'rgba(0,0,0,.45)');gg.addColorStop(.35,'rgba(0,0,0,0)');gg.addColorStop(.8,'rgba(255,240,214,.12)');gg.addColorStop(1,'rgba(0,0,0,.15)');x.fillStyle=gg;x.fill(p);
      x.strokeStyle='rgba(20,14,8,.35)';x.lineWidth=.35;for(let s=0;s<2;s++){const u=u0+(u1-u0)*(.25+gr()*.5),q0=P(u,t0+.2*dt),q1=P(u+(gr()-.5)*.02,tb);x.beginPath();x.moveTo(...q0);x.lineTo(...q1);x.stroke()}
      x.strokeStyle='rgba(6,4,2,.8)';x.lineWidth=.6;x.beginPath();x.moveTo(...a);x.lineTo(...d);x.stroke();
      const mv=vn(u0*5+3,t1*4+(o.seed||0))*(.5+t1*.7);if(mv>1-moss*.75){const q=P((u0+u1)/2,tb-.25*dt),mr=Math.max(1,wid/k*.4);for(let m=0;m<5;m++)ell(x,q[0]+(gr()-.5)*mr*2,q[1]+(gr()-.5)*mr,mr*(.4+gr()*.5),mr*(.25+gr()*.3),mix([40,62,22],[110,128,46],gr()),.85)}}
    const s0=P(0,t1),s1=P(1,t1),s2=P(1,t1+.3*dt),s3=P(0,t1+.3*dt);if(r<n-1){const sg=x.createLinearGradient(...P(.5,t1),...P(.5,t1+.3*dt));sg.addColorStop(0,'rgba(0,0,0,.5)');sg.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=sg;x.fill(QP([s0,s1,s2,s3]))}}
  const lg=x.createLinearGradient(Math.min(A[0],D[0]),0,Math.max(B[0],C[0]),0);lg.addColorStop(lx<0?0:1,'rgba(255,236,200,.12)');lg.addColorStop(lx<0?1:0,`rgba(0,0,8,${o.side??.3})`);x.fillStyle=lg;x.fill(poly);
  const eg=x.createLinearGradient(...P(.5,.82),...P(.5,1));eg.addColorStop(0,'rgba(0,0,0,0)');eg.addColorStop(1,'rgba(0,0,0,.35)');x.fillStyle=eg;x.fill(poly);
  if(o.dark){x.fillStyle=`rgba(4,6,12,${o.dark})`;x.fill(poly)}x.restore()}

// ----- Strohdach (Pfad, Spitze apex, Traufpunkte eL..eR) -----
function thatchRoof(x,path,apex,eL,eR,o={}){gseed(o.seed??apex[0]);const lx=o.lx??litSide(x,apex[0]),E=u=>[eL[0]+(eR[0]-eL[0])*u,eL[1]+(eR[1]-eL[1])*u+Math.sin(u*Math.PI)*(o.sag||4)];
  x.save();x.clip(path);x.fillStyle='#1c150c';x.fill(path);
  const cl=[[150,128,86],[118,98,62],[176,156,108],[84,70,46]];
  for(const tc of[.28,.5,.7,.9,1.08]){for(let i=0;i<1300;i++){const u=gr(),t=tc-.3+gr()*.3,e=E(u),X=apex[0]+(e[0]-apex[0])*t,Y=apex[1]+(e[1]-apex[1])*t,dx=e[0]-apex[0],dy=e[1]-apex[1],L=Math.hypot(dx,dy),l=4+gr()*7;
      const sideL=(u<.5)===(lx<0),br=(sideL?1:.62)*(.7+t*.35);x.strokeStyle=rgba(mix(cl[i%4],[0,0,0],1-br),.75);x.lineWidth=.45+gr()*.55;x.beginPath();x.moveTo(X,Y);x.lineTo(X+dx/L*l+(gr()-.5),Y+dy/L*l);x.stroke()}
    const sg=new Path2D();for(let u=0;u<=1.001;u+=.02){const e=E(u),X=apex[0]+(e[0]-apex[0])*tc,Y=apex[1]+(e[1]-apex[1])*tc;u?sg.lineTo(X,Y):sg.moveTo(X,Y)}x.strokeStyle='rgba(10,6,2,.55)';x.lineWidth=2.6;x.stroke(sg);x.strokeStyle='rgba(220,200,150,.25)';x.lineWidth=.7;x.translate(0,-1.4);x.stroke(sg);x.translate(0,1.4)}
  for(let i=0;i<1400;i++){const u=gr(),t=.3+gr()*.75,m=fbm(u*5+2,t*4+7,3);if(m<.66-(o.moss??.3)*.12)continue;const e=E(u),X=apex[0]+(e[0]-apex[0])*t,Y=apex[1]+(e[1]-apex[1])*t;ell(x,X,Y,.5+gr()*1.3,.4+gr()*.8,mix([24,36,14],[74,92,34],gr()*(m-.4)*2),.7,gr()*3)}
  const lg=x.createLinearGradient(eL[0],0,eR[0],0);lg.addColorStop(lx<0?0:1,'rgba(255,220,170,.1)');lg.addColorStop(lx<0?1:0,'rgba(0,0,10,.4)');x.fillStyle=lg;x.fill(path);
  if(o.dark){x.fillStyle=`rgba(4,6,12,${o.dark})`;x.fill(path)}x.restore();
  for(let u=0;u<=1;u+=.006){const e=E(u),l=2+gr()*6;x.strokeStyle=gr()<.5?'rgba(150,128,86,.9)':'rgba(40,30,16,.9)';x.lineWidth=.6;x.beginPath();x.moveTo(e[0],e[1]-2);x.lineTo(e[0]+(e[0]-apex[0])*.02*l+(gr()-.5)*2,e[1]+l);x.stroke()}}

// ----- Fenster: Öffnung X,Y,w,h; o: {lit, glow:[r,g,b], board, trim:'#…', arch, sky:[r,g,b], kok (Giebelkrone), lx} -----
function winR(x,X,Y,w,h,o={}){const lx=o.lx??litSide(x,X+w/2),sky=o.sky||(S0&&S0.hor)||[180,190,200],k=(X*7+Y*3)|0;gseed(k);
  const open=new Path2D();if(o.arch){open.moveTo(X,Y+h);open.lineTo(X,Y+w*.5);open.arc(X+w/2,Y+w*.5,w/2,Math.PI,0);open.lineTo(X+w,Y+h);open.closePath()}else open.rect(X,Y,w,h);
  const t=Math.max(2,w*.17);
  // Rahmen-Schatten auf die Wand
  if(o.trim!==false){x.fillStyle='rgba(0,0,0,.35)';x.fillRect(X-t-lx*t*.35+.5,Y-t*.4+t*.45,w+2*t,h+t*1.4)}
  x.save();x.clip(open);
  if(o.lit){const k0=o.glow||[255,206,120],g=x.createRadialGradient(X+w*.5,Y+h*.6,1,X+w*.5,Y+h*.5,Math.max(w,h)*.8);g.addColorStop(0,rgba(mix(k0,[255,255,240],.4)));g.addColorStop(.6,rgba(k0));g.addColorStop(1,rgba(mix(k0,[40,10,0],.6)));x.fillStyle=g;x.fillRect(X,Y,w,h);
    if(o.curtain!==false){x.fillStyle=rgba(mix(k0,[255,250,235],.55),.85);x.beginPath();x.moveTo(X,Y);x.lineTo(X+w*.42,Y);x.quadraticCurveTo(X+w*.18,Y+h*.5,X+w*.3,Y+h);x.lineTo(X,Y+h);x.fill();x.beginPath();x.moveTo(X+w,Y);x.lineTo(X+w*.58,Y);x.quadraticCurveTo(X+w*.82,Y+h*.5,X+w*.7,Y+h);x.lineTo(X+w,Y+h);x.fill();
      x.strokeStyle=rgba(mix(k0,[90,30,0],.6),.45);x.lineWidth=.5;for(let i=1;i<4;i++){x.beginPath();x.moveTo(X+w*.1*i,Y);x.lineTo(X+w*.08*i,Y+h);x.moveTo(X+w-w*.1*i,Y);x.lineTo(X+w-w*.08*i,Y+h);x.stroke()}}
    if(o.steam){for(let i=0;i<14;i++)dab(x,X+gr()*w,Y+gr()*h,w*.25,[255,230,245],.18);for(let i=0;i<w*.8;i++)ell(x,X+gr()*w,Y+h*.3+gr()*h*.7,.4+gr()*.6,.6+gr()*.9,[255,240,250],.5)}}
  else{x.fillStyle='#0b0c0e';x.fillRect(X,Y,w,h);const g=x.createLinearGradient(X+(lx<0?0:w),Y,X+(lx<0?w:0),Y+h);g.addColorStop(0,rgba(mix(sky,[255,255,255],.25),.75));g.addColorStop(.45,rgba(sky,.3));g.addColorStop(.7,'rgba(20,24,28,.15)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(X,Y,w,h);
    x.fillStyle='rgba(255,255,255,.12)';x.beginPath();x.moveTo(X+w*.15,Y+h);x.lineTo(X+w*.45,Y);x.lineTo(X+w*.62,Y);x.lineTo(X+w*.32,Y+h);x.fill();
    if(o.curtain){x.fillStyle='rgba(200,196,180,.25)';x.fillRect(X,Y,w*.25,h);x.fillRect(X+w*.75,Y,w*.25,h)}}
  for(let i=0;i<6;i++)dab(x,X+gr()*w,Y+h*(.6+gr()*.4),w*.2,[150,140,120],.12);
  // Laibung (Tiefe): Schatten oben und auf der Schattenseite
  x.fillStyle='rgba(0,0,0,.55)';x.fillRect(X,Y,w,Math.max(1,h*.1));x.fillRect(lx<0?X+w-w*.1:X,Y,w*.1,h);
  // Sprossen
  const bw=Math.max(.7,w*.07),bar=(a,b,c2,d)=>{x.strokeStyle='rgba(0,0,0,.4)';x.lineWidth=bw;x.beginPath();x.moveTo(a-lx*bw*.6,b+bw*.6);x.lineTo(c2-lx*bw*.6,d+bw*.6);x.stroke();x.strokeStyle='#2c2016';x.beginPath();x.moveTo(a,b);x.lineTo(c2,d);x.stroke();x.strokeStyle='rgba(255,236,200,.25)';x.lineWidth=bw*.35;x.beginPath();x.moveTo(a+lx*bw*.25,b-bw*.2);x.lineTo(c2+lx*bw*.25,d-bw*.2);x.stroke()};
  if(o.bars!==false){bar(X+w/2,Y,X+w/2,Y+h);bar(X,Y+h*.42,X+w,Y+h*.42);if(h>w*1.6&&!o.arch)bar(X,Y+h*.75,X+w,Y+h*.75)}
  x.restore();
  if(o.board){x.save();x.translate(X+w/2,Y+h/2);[.5,-.42].forEach((a,i)=>{x.save();x.rotate(a);ell(x,1,3,w*.62,h*.09,[0,0,0],.4);wood(x,-w*.62,-h*.09,w*1.24,h*.18,0);x.fillStyle='rgba(120,116,108,.3)';x.fillRect(-w*.62,-h*.09,w*1.24,h*.18);
    [-w*.5,w*.5].forEach(q=>{ell(x,q,0,.9,.9,[40,36,32]);ell(x,q-.3,-.3,.4,.4,[160,150,140])});x.restore()});x.restore()}
  if(o.trim!==false){const col=o.trim||'#6a5a48',pc=[parseInt(col.slice(1,3),16),parseInt(col.slice(3,5),16),parseInt(col.slice(5,7),16)];
    const board=(bx,by,bw2,bh,vert)=>{wood(x,bx,by,bw2,bh,vert);x.fillStyle=rgba(pc,.82);x.fillRect(bx,by,bw2,bh);
      for(let i=0;i<bw2*bh*.025;i++){const cx=bx+gr()*bw2,cy=by+gr()*bh,cr=.4+gr()*Math.min(bw2,bh)*.22;x.fillStyle='rgba(118,110,98,.6)';x.beginPath();for(let a=0;a<6.28;a+=1.1)x.lineTo(cx+Math.cos(a)*cr*(.6+gr()*.6),cy+Math.sin(a)*cr*(.4+gr()*.4));x.fill()}
      const g=vert?x.createLinearGradient(bx,0,bx+bw2,0):x.createLinearGradient(0,by,0,by+bh);g.addColorStop(0,'rgba(255,240,215,.25)');g.addColorStop(.5,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.45)');x.fillStyle=g;x.fillRect(bx,by,bw2,bh);
      x.strokeStyle='rgba(10,6,2,.6)';x.lineWidth=.5;x.strokeRect(bx,by,bw2,bh);if(o.dark){x.fillStyle=`rgba(4,6,12,${o.dark})`;x.fillRect(bx,by,bw2,bh)}};
    board(X-t,Y-t*.4,t,h+t*.8,1);board(X+w,Y-t*.4,t,h+t*.8,1);board(X-t*1.4,Y+h+t*.2,w+t*2.8,t*.8,0);ell(x,X+w/2,Y+h+t*1.05,w*.6,t*.25,[0,0,0],.35);
    if(o.arch){x.strokeStyle=rgba(pc);x.lineWidth=t*.9;x.beginPath();x.arc(X+w/2,Y+w*.5,w/2+t*.45,Math.PI,0);x.stroke();x.strokeStyle='rgba(255,240,215,.3)';x.lineWidth=t*.25;x.beginPath();x.arc(X+w/2,Y+w*.5,w/2+t*.7,Math.PI*1.1,Math.PI*1.6);x.stroke()}
    else{board(X-t*1.3,Y-t*1.3,w+t*2.6,t,0);if(o.kok!==false){const p=new Path2D(`M${X-t*1.3},${Y-t*1.3}L${X+w/2},${Y-t*1.3-w*.32}L${X+w+t*1.3},${Y-t*1.3}Z`);x.save();x.clip(p);wood(x,X-t*1.4,Y-t*1.4-w*.34,w+t*2.8,w*.36,0);x.fillStyle=rgba(pc,.82);x.fill(p);
      const g=x.createLinearGradient(0,Y-t*1.3-w*.32,0,Y-t*1.3);g.addColorStop(0,'rgba(255,240,215,.22)');g.addColorStop(1,'rgba(0,0,0,.4)');x.fillStyle=g;x.fill(p);
      for(let i=-2;i<=2;i++)ell(x,X+w/2+i*w*.16,Y-t*1.3-w*.1+Math.abs(i)*w*.03,w*.035,w*.035,[16,10,6],.9);x.restore();x.strokeStyle='rgba(10,6,2,.6)';x.lineWidth=.5;x.stroke(p);
      for(let s=0;s<w+t*2.6;s+=Math.max(2,w*.12))ell(x,X-t*1.3+s+w*.05,Y-t*.3,w*.03,w*.045,[16,10,6],.85)}}}}

// ----- Zwiebelkuppel: Metall (gold/kupfer) oder Holzschuppen (lemekh) -----
function domeProfile(X,Y,r){const P=[[X-.55*r,Y],[X-1.5*r,Y-.6*r],[X-.7*r,Y-1.5*r],[X,Y-2.3*r]],pts=[];for(let i=0;i<=24;i++){const s=i/24,m=1-s,bx=m*m*m*P[0][0]+3*m*m*s*P[1][0]+3*m*s*s*P[2][0]+s*s*s*P[3][0],by=m*m*m*P[0][1]+3*m*m*s*P[1][1]+3*m*s*s*P[2][1]+s*s*s*P[3][1];pts.push([X-bx,by])}return pts}
function dome(x,X,Y,r,kind='gold',o={}){const lx=o.lx??litSide(x,X),pr=domeProfile(X,Y,r),path=new Path2D();pr.forEach(([hw,y],i)=>i?path.lineTo(X-hw,y):path.moveTo(X-hw,y));for(let i=pr.length-1;i>=0;i--)path.lineTo(X+pr[i][0],pr[i][1]);path.closePath();
  ell(x,X,Y+r*.08,r*.62,r*.14,[0,0,0],.5);x.save();x.clip(path);
  if(kind=='gold'||kind=='copper'){const st=kind=='gold'?['#3a2204','#f2d888','#fffbe6','#e2b444','#a86e14','#4a2a04','#7a5420','#2a1802']:['#1a2420','#7ab8a0','#d8f0e4','#4a9a7e','#2a6a54','#12302a','#3a5a50','#0a1814'];
    const g=x.createLinearGradient(X+lx*r*1.15,0,X-lx*r*1.15,0);[0,.14,.24,.36,.6,.84,.94,1].forEach((s,i)=>g.addColorStop(s,st[i]));x.fillStyle=g;x.fill(path);
    const v=x.createLinearGradient(0,Y-2.3*r,0,Y);v.addColorStop(0,'rgba(235,242,255,.3)');v.addColorStop(.3,'rgba(235,242,255,.08)');v.addColorStop(.55,'rgba(30,24,8,.38)');v.addColorStop(.75,'rgba(120,90,40,.08)');v.addColorStop(1,'rgba(0,0,0,.45)');x.fillStyle=v;x.fill(path);
    x.lineWidth=Math.max(.3,r*.025);for(let a=-75;a<=75;a+=18){const sn=Math.sin(a*Math.PI/180);x.strokeStyle=`rgba(40,24,4,${.25+.15*Math.abs(sn)})`;x.beginPath();pr.forEach(([hw,y],i)=>i?x.lineTo(X+hw*sn,y):x.moveTo(X+hw*sn,y));x.stroke()}
    x.save();x.translate(X+lx*r*.42,Y-r*1.05);x.scale(.32,1);dab(x,0,0,r*.5,[255,255,250],.95);x.restore();dab(x,X+lx*r*.3,Y-r*1.7,r*.18,[255,255,255],.8);
    if(kind=='copper')for(let i=0;i<30;i++){const yy=Y-gr()*r*2;ell(x,X+(gr()-.5)*r*1.6,yy,r*.04,r*.25,[30,60,50],.25)}}
  else{x.fillStyle='#2a2620';x.fill(path);const rowsN=Math.max(5,Math.round(r*.55)),base=o.tone||[150,142,128];
    for(let i=0;i<rowsN;i++){const s0=i/rowsN,s1=(i+1.25)/rowsN,i0=Math.round(s0*24),i1=Math.min(24,Math.round(s1*24)),[h0,y0]=pr[i0],[h1,y1]=pr[i1],hw=Math.max(h0,h1,.5),nS=Math.max(3,Math.round(hw*2*Math.PI/(r*.42)));
      for(let j=0;j<nS;j++){const a=(j+(i%2)*.5)/nS*Math.PI*2-Math.PI;if(Math.cos(a)<-.05)continue;const sa=Math.sin(a),ca=Math.cos(a),xb=X+h0*sa,xt=X+h1*sa,ww=Math.max(.6,hw*Math.PI*2/nS*.5*Math.max(.15,ca));
        const br=.45+.55*Math.max(0,Math.cos(a+lx*.9))*(.65+.35*(1-s0)),c0=mix([30,26,20],mix(base,[200,196,186],gr()*.3),br);
        x.fillStyle=rgba(c0);x.beginPath();x.moveTo(xt-ww,y1);x.lineTo(xt+ww,y1);x.lineTo(xb+ww*.95,y0-r*.05);x.quadraticCurveTo(xb+ww*.6,y0+r*.12,xb,y0+r*.16);x.quadraticCurveTo(xb-ww*.6,y0+r*.12,xb-ww*.95,y0-r*.05);x.closePath();x.fill();
        x.strokeStyle='rgba(10,8,4,.55)';x.lineWidth=Math.max(.25,r*.02);x.stroke()}}
    const v=x.createLinearGradient(0,Y-2.3*r,0,Y);v.addColorStop(0,'rgba(220,230,240,.18)');v.addColorStop(1,'rgba(0,0,0,.35)');x.fillStyle=v;x.fill(path)}
  if(o.dark){x.fillStyle=`rgba(4,6,12,${o.dark})`;x.fill(path)}
  x.restore();x.strokeStyle='rgba(20,12,2,.55)';x.lineWidth=Math.max(.3,r*.03);x.stroke(path);goldCross(x,X,Y-2.3*r,r*1.3,lx)}
function goldCross(x,X,Y,h,lx){const w=Math.max(.8,h*.09),seg=(a,b,c2,d)=>{x.beginPath();x.moveTo(a,b);x.lineTo(c2,d);x.stroke()},draw=()=>{seg(X,Y,X,Y-h);seg(X-h*.14,Y-h*.86,X+h*.14,Y-h*.86);seg(X-h*.32,Y-h*.66,X+h*.32,Y-h*.66);seg(X-h*.2,Y-h*.2,X+h*.2,Y-h*.34)};
  x.lineCap='butt';x.save();x.translate(-lx*w*.5,w*.5);x.strokeStyle='rgba(0,0,0,.35)';x.lineWidth=w;draw();x.restore();x.strokeStyle='#8a6418';x.lineWidth=w;draw();x.save();x.translate(lx*w*.25,-w*.2);x.strokeStyle='#f6dc8a';x.lineWidth=w*.4;draw();x.restore()}
// alte Namen weiter nutzbar
function onion(x,X,Y,r,c0){dome(x,X,Y,r,/^#[c-f]/i.test(c0)?'gold':'lemekh')}
function orthCross(x,X,Y,h,col,w){const lx=litSide(x,X);if(col=='#c8a850')return goldCross(x,X,Y,h,lx);// Holzkreuz (Gräber): Grundfarbe, Lichtkante, Schatten
  const seg=(a,b,c2,d)=>{x.beginPath();x.moveTo(a,b);x.lineTo(c2,d);x.stroke()},draw=()=>{seg(X,Y,X,Y-h);seg(X-h*.14,Y-h*.86,X+h*.14,Y-h*.86);seg(X-h*.3,Y-h*.68,X+h*.3,Y-h*.68);seg(X-h*.18,Y-h*.22,X+h*.18,Y-h*.34)};x.lineCap='butt';
  x.save();x.translate(-lx*w*.5,w*.4);x.strokeStyle='rgba(0,0,0,.35)';x.lineWidth=w;draw();x.restore();x.strokeStyle=col;x.lineWidth=w;draw();x.strokeStyle='rgba(150,146,136,.35)';draw();x.save();x.translate(lx*w*.25,-w*.15);x.strokeStyle='rgba(255,236,200,.25)';x.lineWidth=w*.35;draw();x.restore()}

// ----- Bretter (senkrecht) mit Deckleisten, z. B. Giebel -----
function boards(x,clip,x0,x1,y0,y1,o={}){const lx=o.lx??litSide(x,(x0+x1)/2),bw=o.bw||8;gseed(x0+y0*3);x.save();x.clip(clip);
  for(let X=x0;X<x1;X+=bw){wood(x,X,y0,bw,y1-y0,1);x.fillStyle=`rgba(150,146,136,${(o.grey??.35)*(.6+gr()*.6)})`;x.fillRect(X,y0,bw,y1-y0);x.fillStyle=`rgba(0,0,0,${gr()*.2})`;x.fillRect(X,y0,bw,y1-y0)}
  for(let X=x0;X<x1;X+=bw){x.fillStyle='rgba(0,0,0,.4)';x.fillRect(X-lx*1.2+.6,y0,1.6,y1-y0);wood(x,X-1,y0,2.2,y1-y0,1);x.fillStyle='rgba(255,236,200,.12)';x.fillRect(X+(lx<0?-1:.6),y0,.6,y1-y0)}
  x.restore()}

// ----- Ziegelschornstein -----
function chimneyB(x,X0,Y0,w,h,o={}){const lx=o.lx??litSide(x,X0);gseed(X0+Y0);x.fillStyle='#3a2a24';x.fillRect(X0,Y0,w,h);const bh=Math.max(1.6,w*.17),bwid=bh*2.1;
  for(let y=Y0,r=0;y<Y0+h;y+=bh,r++)for(let X=X0-(r%2)*bwid*.5;X<X0+w;X+=bwid){const c=mix([116,52,36],[170,90,64],gr());x.fillStyle=rgba(mix(c,[40,36,34],gr()*.3));x.fillRect(Math.max(X0,X+.35),y+.35,Math.min(bwid-.7,X0+w-X-.35),bh-.7)}
  const g=x.createLinearGradient(X0,0,X0+w,0);g.addColorStop(lx<0?0:1,'rgba(255,230,200,.12)');g.addColorStop(lx<0?1:0,'rgba(0,0,0,.5)');x.fillStyle=g;x.fillRect(X0,Y0,w,h);
  const s=x.createLinearGradient(0,Y0,0,Y0+h*.5);s.addColorStop(0,'rgba(8,6,6,.75)');s.addColorStop(1,'rgba(8,6,6,0)');x.fillStyle=s;x.fillRect(X0,Y0,w,h*.5);
  x.fillStyle='#2a2422';x.fillRect(X0-w*.12,Y0-bh*1.1,w*1.24,bh*1.2);x.fillStyle='rgba(255,240,220,.15)';x.fillRect(X0-w*.12,Y0-bh*1.1,w*1.24,bh*.3);x.fillStyle='#0a0808';x.fillRect(X0+w*.15,Y0-bh*1.1,w*.7,bh*.4)}
function smoke(x,X,Y,n,s,a=.15){gseed(X*3+Y);for(let i=0;i<n;i++)dab(x,X+i*s*.4+gr()*s*.5,Y-i*s*1.1,s*(.6+i*.16),[170,172,172],a*(1-i/n*.5))}

// ----- Bodenkontakt: Feldsteinfundament + Gras davor -----
function footing(x,x0,x1,Y,h,o={}){const lx=o.lx??litSide(x,(x0+x1)/2);gseed(x0*5+Y);x.fillStyle='rgba(0,0,0,.7)';x.fillRect(x0,Y-h,x1-x0,h);
  for(let X=x0;X<x1;){const w=h*(1.1+gr()*1.2),c=mix([78,76,70],[140,136,124],gr());const g=x.createRadialGradient(X+w*(lx<0?.3:.7),Y-h*.75,0,X+w/2,Y-h*.5,w*.7);g.addColorStop(0,rgba(mix(c,[220,216,200],.35)));g.addColorStop(1,rgba(mix(c,[20,18,16],.5)));
    x.fillStyle=g;x.beginPath();x.ellipse(X+w/2,Y-h*.48,w*.52,h*.55,0,0,7);x.fill();if(gr()<.4)ell(x,X+w*.4,Y-h*.8,w*.25,h*.15,[70,96,36],.6);X+=w*.9}
  const ag=x.createLinearGradient(0,Y-h,0,Y-h*.4);ag.addColorStop(0,'rgba(0,0,0,.55)');ag.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=ag;x.fillRect(x0,Y-h,x1-x0,h*.6);if(o.dark){x.fillStyle=`rgba(4,6,12,${o.dark})`;x.fillRect(x0-2,Y-h-2,x1-x0+4,h+3)}
  if(o.grass!==false)for(let X=x0-4;X<x1+4;X+=.8){const l=2+gr()*h*1.2;x.strokeStyle=rgba(mix([30,46,16],[96,120,44],gr()),.9);x.lineWidth=.6;x.beginPath();x.moveTo(X,Y+1);x.quadraticCurveTo(X+(gr()-.5)*2,Y-l*.5,X+(gr()-.5)*3,Y-l);x.stroke()}}

// ================= Izba (Dorf, Fischer, Hintergründe) =================
// Lokale Koordinaten wie bisher (Unterkante B=348, Front 30..230, Giebel bis 162, Seitenwand bis 276).
function fisherHut(x,o={}){const B=348,lx=litSide(x,130),k=x.getTransform().a,small=Math.abs(k)<.5*SC,trim=o.trim||'#6a5a48';
  shadowAt(x,150,B+4,160,.65);
  // Seitenwand (perspektivisch, im Schatten)
  const side=QP([[230,B],[230,230],[276,206],[276,B-26]]);x.save();x.clip(side);x.transform(1,-24/46,0,1,0,230*24/46);roundLogs(x,226,280,B+6,190,10,{lx,grey:.4,seed:7});x.restore();
  wallFX(x,side,230,276,206,B,{lx,side:.1,dark:lx<0?.4:.12,eave:22});
  // Giebel: senkrechte Bretter
  const gab=QP([[30,230],[130,162],[230,230]]);boards(x,gab,30,230,160,232,{lx,bw:8});wallFX(x,gab,30,230,162,232,{lx,eave:16,side:.18});
  // Dachgaube/Rundfenster im Giebel
  ell(x,130,197,10,10,[0,0,0],.35);const rg=x.createRadialGradient(127,193,1,130,196,9);rg.addColorStop(0,'#d8d0bc');rg.addColorStop(1,'#6a6252');x.fillStyle=rg;x.beginPath();x.arc(130,196,9,0,7);x.fill();
  x.fillStyle='#0c0d10';x.beginPath();x.arc(130,196,6,0,7);x.fill();x.fillStyle=rgba(mix(S0.hor||[180,190,200],[255,255,255],.2),.45);x.beginPath();x.arc(130,196,6,Math.PI*.9,Math.PI*1.9);x.fill();
  x.strokeStyle='#2a2016';x.lineWidth=1.2;x.beginPath();x.moveTo(124,196);x.lineTo(136,196);x.moveTo(130,190);x.lineTo(130,202);x.stroke();
  // Frontwand aus Rundholz mit Balkenköpfen
  const front=QP([[24,B],[24,230],[236,230],[236,B]]);x.save();x.clip(new Path2D('M10,'+(B+2)+'L10,226L250,226L250,'+(B+2)+'Z'));roundLogs(x,30,230,B-6,230,10,{lx,grey:.38,ends:[1,1],seed:3});x.restore();
  wallFX(x,QP([[30,B],[30,230],[230,230],[230,B]]),30,230,230,B,{lx,eave:18,streaks:[[156,198,300]]});
  footing(x,26,276,B+1,7,{lx});
  // Dach: Holzschindeln mit Moos
  shingleRoof(x,[130,158],[176,134],[292,212],[246,238],{rows:small?9:13,sw:small?9:7,lx,moss:.45,grey:.55,seed:5,side:.2});
  // Windbretter (Pritschelina) mit ausgesägten Bögen und Firstbrett
  const barge=(sx)=>{const ax=130,ay=154,bx=130+sx*120,by=242,L=Math.hypot(bx-ax,by-ay),ang=Math.atan2(by-ay,bx-ax);x.save();x.translate(ax,ay);x.rotate(ang);
    x.fillStyle='rgba(0,0,0,.35)';x.fillRect(0,5,L,6);wood(x,0,-3.5,L,7,0);x.fillStyle='rgba(150,146,136,.35)';x.fillRect(0,-3.5,L,7);
    for(let s=8;s<L-4;s+=9){x.fillStyle='#d8d0c0';x.beginPath();x.arc(s,3.5,3,0,Math.PI);x.fill();x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.arc(s,3.5,3,0,Math.PI*.5);x.fill();x.fillStyle='rgba(0,0,0,.25)';x.fillRect(s-3,6.2,6,1.5)}
    x.fillStyle='rgba(255,240,215,.2)';x.fillRect(0,-3.5,L,1.2);x.fillStyle='rgba(0,0,0,.45)';x.fillRect(0,2.6,L,1);x.restore()};
  barge(-1);barge(1);x.save();x.translate(130,166);wood(x,-4,-8,8,30,1);x.fillStyle='#d8d0c0';x.beginPath();x.moveTo(-4,22);x.lineTo(0,30);x.lineTo(4,22);x.fill();x.restore();
  // Tür in Laibung
  x.fillStyle='#0a0705';x.fillRect(54,260,50,88);for(let X=58;X<100;X+=7)wood(x,X,264,7,84,1);x.fillStyle='rgba(120,116,108,.3)';x.fillRect(58,264,42,84);
  const dg=x.createLinearGradient(58,0,100,0);dg.addColorStop(lx<0?0:1,'rgba(0,0,0,0)');dg.addColorStop(lx<0?1:0,'rgba(0,0,0,.45)');x.fillStyle=dg;x.fillRect(58,264,42,84);x.fillStyle='rgba(0,0,0,.6)';x.fillRect(58,264,42,6);
  [[276],[330]].forEach(([Y])=>{x.fillStyle='#1e1c1a';x.fillRect(58,Y,26,2.6);ell(x,82,Y+1.3,2.2,2.2,[30,28,26]);x.fillStyle='rgba(200,190,170,.25)';x.fillRect(58,Y,26,.7);x.fillStyle='rgba(120,50,20,.35)';x.fillRect(60,Y+2.6,22,3)});
  ell(x,94,306,2.2,2.2,[26,24,22]);ell(x,93.4,305.4,.8,.8,[170,160,140]);
  [[52,258,6,92,1],[100,258,6,92,1],[48,252,60,7,0]].forEach(([a,b,c2,d,v])=>{wood(x,a,b,c2,d,v);x.fillStyle=rgba(mix([parseInt(trim.slice(1,3),16),parseInt(trim.slice(3,5),16),parseInt(trim.slice(5,7),16)],[90,80,70],.35),.55);x.fillRect(a,b,c2,d)});
  wood(x,46,B-3,66,6,0);ell(x,79,B+4,34,3,[0,0,0],.4);
  // Fenster mit Nalitschnik
  winR(x,158,262,36,32,{lit:!o.win,trim,board:o.win=='board',curtain:true,lx});if(!o.win){x.save();x.globalCompositeOperation='lighter';dab(x,176,284,54,[255,170,70],.22);x.restore()}
  // Schornstein
  chimneyB(x,194,168,18,44,{lx});if(o.smoke!==0)smoke(x,203,156,14,7)}

// ================= Kapelle im Hintergrund =================
function chapel(x,X,B,s){x.save();x.translate(X,B);x.scale(s,s);const lx=litSide(x,0);
  x.save();x.beginPath();x.rect(-24,-52,48,52);x.clip();roundLogs(x,-22,22,0,-52,5,{lx,grey:.5,ends:[1,1],seed:91});x.restore();wallFX(x,QP([[-22,0],[-22,-52],[22,-52],[22,0]]),-22,22,-52,0,{lx,eave:8});
  shingleRoof(x,[0,-72],[0,-72],[30,-50],[-30,-50],{rows:5,sw:5,lx,grey:.6,moss:.2,seed:92});
  x.save();x.beginPath();x.rect(-9,-94,18,24);x.clip();roundLogs(x,-8,8,-70,-94,4,{lx,grey:.5,seed:93});x.restore();
  dome(x,0,-92,11,'gold',{lx});x.fillStyle='#0c0a08';x.fillRect(-5,-30,10,30);x.fillStyle='rgba(0,0,0,.4)';x.fillRect(-5,-30,10,4);
  const hz=S0.haze||S0.hor||[200,210,220];x.globalCompositeOperation='source-atop';x.fillStyle=rgba(hz,.28);x.fillRect(-40,-150,80,152);x.restore()}

// ================= Kirche =================
function logs(x,x0,y0,w,h){x.save();x.beginPath();x.rect(x0-10,y0-1,w+20,h+1);x.clip();roundLogs(x,x0,x0+w,y0+h,y0,Math.min(10,Math.max(4,w/9)),{grey:.55,ends:[1,1]});x.restore();wallFX(x,QP([[x0,y0],[x0+w,y0],[x0+w,y0+h],[x0,y0+h]]),x0,x0+w,y0,y0+h,{eave:Math.min(14,h*.25)})}
function churchBig(x,X,B){const lx=litSide(x,X),wall=(x0,x1,yT,yB,d,ends,seed,fx={})=>{x.save();x.beginPath();x.rect(x0-d,yT-1,x1-x0+2*d,yB-yT+1);x.clip();roundLogs(x,x0,x1,yB,yT,d,{lx,grey:.55,tone:[112,86,60],ends,seed});x.restore();wallFX(x,QP([[x0,yT],[x1,yT],[x1,yB],[x0,yB]]),x0,x1,yT,yB,{lx,...fx})};
  shadowAt(x,X,B+6,230,.6);
  // Glockenturm
  wall(X-150,X-102,B-170,B,9,[1,1],21,{eave:12,streaks:[[X-142,X-110,B-124]]});
  x.fillStyle='#070605';x.fillRect(X-144,B-162,36,38);const ig=x.createLinearGradient(0,B-162,0,B-124);ig.addColorStop(0,'rgba(40,36,30,.6)');ig.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=ig;x.fillRect(X-144,B-162,36,38);
  wood(x,X-144,B-160,36,3,0);x.strokeStyle='#4a3a28';x.lineWidth=.8;x.beginPath();x.moveTo(X-126,B-157);x.lineTo(X-126,B-153);x.stroke();
  {const bx=X-126,by=B-153,p=new Path2D(`M${bx-3},${by}C${bx-4},${by+4} ${bx-6},${by+12} ${bx-10},${by+17}L${bx+10},${by+17}C${bx+6},${by+12} ${bx+4},${by+4} ${bx+3},${by}Z`);
    const g=x.createLinearGradient(bx+lx*11,0,bx-lx*11,0);g.addColorStop(0,'#2a1a08');g.addColorStop(.18,'#e8c070');g.addColorStop(.3,'#fff0c0');g.addColorStop(.5,'#a87028');g.addColorStop(.85,'#3a2408');g.addColorStop(1,'#5a3a14');x.fillStyle=g;x.fill(p);
    ell(x,bx,by+17,10,2,[60,36,10]);ell(x,bx,by+17,8,1.3,[10,6,2]);x.strokeStyle='rgba(40,24,6,.6)';x.lineWidth=.6;x.beginPath();x.moveTo(bx-6,by+11);x.lineTo(bx+6,by+11);x.stroke();x.strokeStyle='#3a3020';x.lineWidth=.6;x.beginPath();x.moveTo(bx,by+17);x.quadraticCurveTo(bx+3,by+28,bx+1,by+36);x.stroke()}
  [X-144,X-127.5,X-111].forEach(px=>{wood(x,px,B-162,3.5,38,1);x.fillStyle='rgba(0,0,0,.3)';x.fillRect(px+3.5,B-162,1.2,38)});
  wood(x,X-146,B-128,40,4,0);for(let px=X-142;px<X-108;px+=4)wood(x,px,B-136,1.6,8,1);wood(x,X-146,B-137,40,2,0);
  shingleRoof(x,[X-126,B-226],[X-126,B-226],[X-92,B-168],[X-160,B-168],{rows:12,sw:5,lx,grey:.65,moss:.15,lemekh:1,seed:22,tone:[120,110,96]});
  wood(x,X-162,B-172,72,4,0);x.save();x.beginPath();x.rect(X-133,B-238,14,13);x.clip();roundLogs(x,X-132,X-120,B-225,B-238,3.2,{lx,grey:.5,seed:23});x.restore();dome(x,X-126,B-236,8,'lemekh',{lx});
  // Anbau rechts
  wall(X+80,X+154,B-74,B,9,[0,1],24,{eave:12});
  shingleRoof(x,[X+118,B-104],[X+118,B-104],[X+162,B-72],[X+72,B-72],{rows:8,sw:6,lx,grey:.6,moss:.35,seed:25});wood(x,X+72,B-76,90,4,0);
  // Hauptschiff
  wall(X-84,X+84,B-110,B,9,[1,1],26,{eave:16,streaks:[[X-58,X-42,B-44],[X+42,X+58,B-44]]});
  footing(x,X-158,X+160,B+1,6,{lx});
  shingleRoof(x,[X-44,B-158],[X+44,B-158],[X+96,B-108],[X-96,B-108],{rows:13,sw:7,lx,grey:.6,moss:.3,seed:27,tone:[110,100,86]});wood(x,X-98,B-112,196,4,0);x.fillStyle='rgba(0,0,0,.4)';x.fillRect(X-84,B-108,168,3);
  // Tambour + Hauptkuppel (vergoldet)
  x.save();x.beginPath();x.rect(X-24,B-206,48,50);x.clip();roundLogs(x,X-22,X+22,B-156,B-206,6,{lx,grey:.55,seed:28});x.restore();
  {const cg=x.createLinearGradient(X-22,0,X+22,0);cg.addColorStop(lx<0?0:1,'rgba(255,236,200,.18)');cg.addColorStop(.5,'rgba(0,0,0,0)');cg.addColorStop(lx<0?1:0,'rgba(0,0,0,.55)');x.fillStyle=cg;x.fillRect(X-22,B-206,44,50)}
  [-12,0,12].forEach(d=>winR(x,X+d-3,B-196,6,16,{arch:1,trim:'#d8d0bc',lx,bars:false}));
  wood(x,X-27,B-210,54,5,0);x.fillStyle='rgba(0,0,0,.45)';x.fillRect(X-22,B-205,44,3);dome(x,X,B-208,24,'gold',{lx});
  [[-58,-158],[58,-158]].forEach(([dx,dy])=>{x.save();x.beginPath();x.rect(X+dx-10,B+dy-23,20,23);x.clip();roundLogs(x,X+dx-8,X+dx+8,B+dy,B+dy-22,3.6,{lx,grey:.55,seed:30+dx});x.restore();
    const cg=x.createLinearGradient(X+dx-8,0,X+dx+8,0);cg.addColorStop(lx<0?0:1,'rgba(255,236,200,.15)');cg.addColorStop(lx<0?1:0,'rgba(0,0,0,.55)');x.fillStyle=cg;x.fillRect(X+dx-8,B+dy-22,16,22);dome(x,X+dx,B+dy-22,10,'lemekh',{lx})});
  // Portal
  x.fillStyle='rgba(0,0,0,.4)';x.beginPath();x.moveTo(X-22,B);x.lineTo(X-22,B-42);x.quadraticCurveTo(X,B-68,X+22,B-42);x.lineTo(X+22,B);x.fill();
  const dp=new Path2D(`M${X-16},${B}L${X-16},${B-40}Q${X},${B-60} ${X+16},${B-40}L${X+16},${B}Z`);x.save();x.clip(dp);for(let px=X-16;px<X+16;px+=6.4)wood(x,px,B-62,6.4,62,1);x.fillStyle='rgba(60,30,10,.35)';x.fill(dp);
  x.fillStyle='rgba(0,0,0,.55)';x.fillRect(X-16,B-62,32,8);x.fillRect(lx<0?X+12:X-16,B-62,4,62);x.fillStyle='#1c1a18';[B-36,B-14].forEach(Y=>{x.fillRect(X-16,Y,32,2.2)});x.restore();
  ell(x,X+lx*-9,B-26,1.6,1.6,[200,170,90]);x.strokeStyle='#d8d0bc';x.lineWidth=3.2;x.stroke(dp);x.strokeStyle='rgba(0,0,0,.35)';x.lineWidth=1;x.beginPath();x.moveTo(X+18,B);x.lineTo(X+18,B-40);x.stroke();
  wood(x,X-24,B-2,48,5,0);wood(x,X-28,B+2,56,5,0);x.fillStyle='rgba(150,146,136,.35)';x.fillRect(X-28,B-2,56,9);
  // Ikone über dem Portal
  x.fillStyle='rgba(0,0,0,.4)';x.fillRect(X-6,B-82,14,16);wood(x,X-7,B-84,14,16,0);{const ig2=x.createLinearGradient(0,B-82,0,B-70);ig2.addColorStop(0,'#c8a040');ig2.addColorStop(1,'#6a4a10');x.fillStyle=ig2;x.fillRect(X-5,B-82,10,12)}
  ell(x,X,B-78,2.6,2.6,[230,200,110]);x.fillStyle='#4a2010';x.fillRect(X-2,B-76,4,6);ell(x,X,B-78,1.8,2,[200,150,110]);
  [[-56,-70],[44,-70],[100,-50],[128,-50]].forEach(([dx,dy])=>winR(x,X+dx,B+dy,12,24,{arch:1,trim:'#d8d0bc',lx,sky:S0.hor}))}

// ================= Hütte der Baba Jaga =================
function chickenLeg(x,hx,kx,ky,ax,ay,toes,lx){gseed(hx*3+ky);
  // Oberschenkel: zerzauste Federn
  for(let i=0;i<220;i++){const t=gr(),X=hx+(kx-hx)*t*.75+(gr()-.5)*(18-t*9),Y=300+(ky-300)*t*.8+gr()*6,l=6+gr()*9,a=Math.PI/2+(gr()-.5)*.9+(X<hx?.25:-.25);
    const br=(X-hx)*-lx>0?.8:.45,c=mix([22,16,12],mix([96,70,46],[134,104,72],gr()),br*(.3+gr()*.6));x.fillStyle=rgba(c,.95);x.beginPath();x.ellipse(X+Math.cos(a)*l*.4,Y+Math.sin(a)*l*.4,l*.5,1.6+gr()*1.2,a,0,7);x.fill();
    x.strokeStyle='rgba(20,12,6,.5)';x.lineWidth=.35;x.beginPath();x.moveTo(X,Y);x.lineTo(X+Math.cos(a)*l*.85,Y+Math.sin(a)*l*.85);x.stroke()}
  // Lauf: konisch mit Hornschuppen
  const L=Math.hypot(ax-kx,ay-ky),ang=Math.atan2(ay-ky,ax-kx);x.save();x.translate(kx,ky);x.rotate(ang);
  const sh=new Path2D(`M-2,-6.5C${L*.3},-5.6 ${L*.7},-4.4 ${L+1},-4.2L${L+1},4.2C${L*.7},4.4 ${L*.3},5.6 -2,6.5Z`),side=Math.sign(Math.cos(ang))*lx;
  const g=x.createLinearGradient(0,-6.5,0,6.5);g.addColorStop(0,side<0?'#c8ac78':'#4a3a20');g.addColorStop(.3,side<0?'#a88c58':'#7a6236');g.addColorStop(.7,'#76602e');g.addColorStop(1,side<0?'#2e2410':'#a88c58');x.fillStyle=g;x.fill(sh);x.save();x.clip(sh);
  for(let s=2;s<L;s+=2.6+gr()*1.6){const q=(gr()-.5)*1.4;x.strokeStyle=`rgba(40,28,8,${.4+gr()*.35})`;x.lineWidth=.6;x.beginPath();x.moveTo(s,-5.5);x.quadraticCurveTo(s+2+q,0,s+q*.5,5.5);x.stroke();x.strokeStyle=`rgba(240,226,190,${.12+gr()*.18})`;x.lineWidth=.45;x.beginPath();x.moveTo(s+.8,-5);x.quadraticCurveTo(s+2.6+q,-1,s+1.4,2);x.stroke()}
  for(let i=0;i<L*2;i++)ell(x,gr()*L,(gr()-.5)*10,.5,.4,[60,40,10],.35);const dg=x.createLinearGradient(0,0,L,0);dg.addColorStop(0,'rgba(40,24,10,0)');dg.addColorStop(.75,'rgba(40,24,10,0)');dg.addColorStop(1,'rgba(40,24,10,.6)');x.fillStyle=dg;x.fill(sh);x.restore();
  x.strokeStyle='rgba(30,18,4,.85)';x.lineWidth=.8;x.stroke(sh);x.fillStyle='#3a2410';x.beginPath();x.moveTo(L*.72,-4.6);x.lineTo(L*.66,-10);x.lineTo(L*.8,-4.4);x.fill();x.restore();
  ell(x,kx,ky,7.5,6.5,[110,86,46]);ell(x,kx-lx*2,ky-2,4,3,[190,166,120],.35);
  // Zehen
  ell(x,ax,ay+8,26,4,[0,0,0],.45);toes.forEach(([tx,ty],i)=>{const tl=Math.hypot(tx-ax,ty-ay),ta=Math.atan2(ty-ay,tx-ax);x.save();x.translate(ax,ay);x.rotate(ta);
    const tp=new Path2D(`M0,-3.6C${tl*.4},-3.4 ${tl*.8},-2.4 ${tl},-1.6L${tl},1.8C${tl*.8},2.6 ${tl*.4},3.6 0,3.8Z`),tg=x.createLinearGradient(0,-3.6,0,3.8);tg.addColorStop(0,'#b8a070');tg.addColorStop(.5,'#7a6232');tg.addColorStop(1,'#2e2410');x.fillStyle=tg;x.fill(tp);
    for(let s=3;s<tl-1;s+=2.6){x.strokeStyle='rgba(60,36,8,.75)';x.lineWidth=.55;x.beginPath();x.moveTo(s,-3);x.quadraticCurveTo(s+1.4,0,s,3);x.stroke()}x.strokeStyle='rgba(30,18,4,.8)';x.lineWidth=.6;x.stroke(tp);
    const cp=new Path2D(`M${tl-.5},-1.8Q${tl+6},-2.2 ${tl+8},3.6Q${tl+4},.8 ${tl-.5},1.8Z`),cg=x.createLinearGradient(tl,-2,tl+8,4);cg.addColorStop(0,'#3a3430');cg.addColorStop(.5,'#141210');cg.addColorStop(1,'#000');x.fillStyle=cg;x.fill(cp);x.strokeStyle='rgba(220,210,190,.45)';x.lineWidth=.4;x.beginPath();x.moveTo(tl+.5,-1.6);x.quadraticCurveTo(tl+5,-1.8,tl+7,2);x.stroke();x.restore()});
  ell(x,ax,ay,6,5,[118,94,52]);ell(x,ax-lx*1.5,ay-1.5,3,2,[200,176,130],.35);x.save();x.translate(ax,ay);x.scale(1,.5);dab(x,0,0,30,[20,16,26],.35);x.restore()}
function hut(x){const lx=litSide(x,478);x.save();x.translate(478,398);x.scale(1,.16);dab(x,0,0,140,[8,6,12],.8);x.restore();
  chickenLeg(x,431,448,340,438,384,[[416,394],[440,398],[462,392]],lx);chickenLeg(x,515,532,342,520,386,[[498,396],[522,400],[544,394]],lx);
  // Bodenbalken + Wand
  x.save();x.beginPath();x.rect(380,220,196,84);x.clip();roundLogs(x,396,560,302,222,10,{lx,grey:.25,tone:[96,70,44],ends:[1,1],seed:41});x.fillStyle='rgba(10,6,20,.28)';x.fillRect(380,220,196,84);x.restore();
  wallFX(x,QP([[396,222],[560,222],[560,302],[396,302]]),396,560,222,302,{lx,eave:16,dark:.12,streaks:[[410,436,266]]});
  x.save();x.beginPath();x.rect(396,270,70,32);x.clip();for(let i=0;i<160;i++){const X=396+gr()*60,Y=302-gr()*30*Math.pow(gr(),.5);if(vn(X/9,Y/7)<.45)continue;ell(x,X,Y,1+gr()*2.2,.7+gr()*1.3,mix([34,58,18],[100,124,44],gr()),.85,gr()*3)}x.restore();
  // Unterseite (Bodenbretter, Schatten)
  x.fillStyle='rgba(0,0,0,.6)';x.fillRect(396,302,164,4);
  // Fenster schief, beleuchtet, mit Fensterläden
  x.save();x.translate(423,252);x.rotate(.07);x.translate(-423,-252);winR(x,411,241,24,22,{lit:1,trim:'#5a4a38',kok:false,curtain:false,lx});
  [[399,240],[437,240]].forEach(([a,b],i)=>{x.fillStyle='rgba(0,0,0,.45)';x.fillRect(a+1.5,b+1.5,9,28);for(let s=0;s<3;s++)wood(x,a+s*3,b,3,28,1);x.fillStyle='rgba(90,80,70,.35)';x.fillRect(a,b,9,28);x.fillStyle='#1e1a18';x.fillRect(i?a:a+5,b+5,4,1.6);x.fillRect(i?a:a+5,b+21,4,1.6)});x.restore();
  x.save();x.globalCompositeOperation='lighter';dab(x,423,252,44,[255,150,40],.28);x.restore();
  // Tür
  const dp=new Path2D('M456,302V246Q472,238 488,246V302Z');x.fillStyle='rgba(0,0,0,.6)';x.fill(new Path2D('M453,303V245Q472,235 491,245V303Z'));x.save();x.clip(dp);for(let X=456;X<488;X+=8)wood(x,X,236,8,68,1);x.fillStyle='rgba(60,40,20,.3)';x.fill(dp);
  const dg=x.createLinearGradient(456,0,488,0);dg.addColorStop(lx<0?0:1,'rgba(0,0,0,0)');dg.addColorStop(lx<0?1:0,'rgba(0,0,0,.5)');x.fillStyle=dg;x.fill(dp);x.fillStyle='rgba(0,0,0,.55)';x.fillRect(456,238,32,8);
  [256,288].forEach(Y=>{x.fillStyle='#1a1614';x.fillRect(456,Y,22,2.6);x.fillStyle='rgba(120,50,20,.45)';x.fillRect(458,Y+2.6,18,2.4);ell(x,476,Y+1.3,2,2,[26,22,20])});x.restore();
  x.strokeStyle='#2a2420';x.lineWidth=1.4;x.beginPath();x.arc(482,274,3,0,7);x.stroke();x.strokeStyle='rgba(200,180,150,.3)';x.lineWidth=.5;x.beginPath();x.arc(482,273.5,3,3.4,5);x.stroke();
  x.strokeStyle='rgba(10,6,2,.9)';x.lineWidth=1.2;x.stroke(dp);
  // Steinschornstein
  {const p=QP([[530,200],[533,160],[548,158],[545,202]]);x.fillStyle='#14100c';x.fill(p);x.save();x.clip(p);gseed(77);for(let Y=204;Y>154;Y-=4.2)for(let X=529+(Y%8?2:0);X<550;X+=5+gr()*2){const c=mix([60,56,50],[130,124,112],gr());const g=x.createRadialGradient(X+1-lx,Y-1.4,0,X+2.5,Y-2,3.4);g.addColorStop(0,rgba(mix(c,[220,210,190],.3)));g.addColorStop(1,rgba(mix(c,[0,0,0],.5)));x.fillStyle=g;x.beginPath();x.ellipse(X+2.5,Y-2,2.6+gr(),1.9,0,0,7);x.fill()}
    const sg=x.createLinearGradient(530,0,548,0);sg.addColorStop(lx<0?0:1,'rgba(255,230,200,.1)');sg.addColorStop(lx<0?1:0,'rgba(0,0,0,.55)');x.fillStyle=sg;x.fill(p);x.fillStyle='rgba(0,0,0,.5)';x.fillRect(528,156,22,6);x.restore()}
  // Strohdach
  const rp=new Path2D('M370,228Q420,190 472,146Q522,182 584,224Q560,232 540,229Q478,238 398,232Z');ell(x,476,236,104,6,[0,0,0],.55);
  thatchRoof(x,rp,[472,146],[372,230],[582,226],{lx,moss:.55,sag:6,seed:43,dark:.22});
  hutDetails(x)}

// ================= Banja (außen) =================
function paintBanjaV(){const o=S0;sky(o);far(o);ground(o);
  let x=lay();for(let i=0;i<60;i++){const X=R()*820-10,b=206+R()*50;R()<.65?fir(x,X,b,140+R()*170,44+R()*40,.05):trunk(x,X,b,5+R()*8)}put(x,.8);fog(290,.45);
  x=lay();grass(x,3000,o.hz,500,1);details(x);leavesOnPath(x,40);put(x);
  x=lay();const L=262,Rt=578,B=376,T=262,lx=-1,nightK=.5;
  shadowAt(x,420,390,300,.7);x.save();x.translate(420,384);x.scale(1.5,1.5);x.translate(-420,-B);
  // Wand + Giebel
  x.save();x.beginPath();x.rect(L-12,T,Rt-L+24,B-T);x.clip();roundLogs(x,L,Rt,B-4,T,12,{lx,grey:.2,tone:[100,70,46],ends:[1,1],seed:61});x.restore();
  wallFX(x,QP([[L,T],[Rt,T],[Rt,B],[L,B]]),L,Rt,T,B,{lx,eave:14,dark:nightK,side:.15,streaks:[[290,334,332],[506,550,332]]});
  const gab=QP([[L+6,T],[420,180],[Rt-6,T]]);boards(x,gab,L,Rt,176,T+2,{lx,bw:10,grey:.2});wallFX(x,gab,L,Rt,180,T,{lx,eave:22,dark:nightK+.05});
  footing(x,L-14,Rt+14,B,8,{lx,grass:false,dark:.6});
  // Ofenrohr mit Dampf
  {const px=520,g=x.createLinearGradient(px,0,px+16,0);g.addColorStop(0,'#5a5450');g.addColorStop(.3,'#a8a098');g.addColorStop(.6,'#4a4440');g.addColorStop(1,'#1a1816');x.fillStyle=g;x.fillRect(px,148,16,86);
    for(let i=0;i<14;i++)ell(x,px+gr()*16,150+gr()*54,1+gr()*2,1+gr()*3,[120,60,30],.4);x.fillStyle='#2a2624';x.fillRect(px-3,144,22,5);x.fillStyle=`rgba(10,6,20,${nightK})`;x.fillRect(px-3,144,22,90);
    for(let i=0;i<14;i++)dab(x,528+(rn(i,3)-.5)*20+i*2,138-i*9,10+i*2,[220,210,220],.16)}
  // Dachkante mit Schindelenden und Windbrettern
  [[-1],[1]].forEach(([s])=>{const ax=420,ay=166,bx=s<0?L-30:Rt+30,by=T+16,len=Math.hypot(bx-ax,by-ay),ang=Math.atan2(by-ay,bx-ax);x.save();x.translate(ax,ay);x.rotate(ang);
    x.fillStyle='rgba(0,0,0,.55)';x.fillRect(0,6,len,10);for(let q=0;q<len;q+=6){x.fillStyle=rgba(mix([40,32,26],[96,86,74],rn(q|0,s+3)));x.fillRect(q,-7,5.4,5)}wood(x,0,-2,len,8,0);x.fillStyle=`rgba(10,6,20,${nightK})`;x.fillRect(0,-7,len,13);
    x.fillStyle='rgba(255,90,170,.18)';x.fillRect(0,4.5,len,1.5);x.restore()});
  // Fenster mit beschlagenem Rotlicht
  [[290,300],[506,300]].forEach(([X,Y])=>{x.save();x.globalCompositeOperation='lighter';dab(x,X+22,Y+16,64,[255,40,120],.38);x.restore();winR(x,X,Y,44,32,{lit:1,glow:[255,70,160],steam:1,trim:'#3a2a20',kok:false,curtain:false,lx,dark:.45});
    x.fillStyle='rgba(60,0,30,.45)';x.beginPath();x.ellipse(X+30,Y+21,6,10,0,0,7);x.fill();x.beginPath();x.arc(X+30,Y+10,4,0,7);x.fill()});
  // Tür, einen Spalt offen
  x.fillStyle='#0a0406';x.fillRect(394,290,56,86);x.save();x.globalCompositeOperation='lighter';dab(x,422,376,76,[255,60,140],.45);const sg=x.createLinearGradient(436,0,446,0);sg.addColorStop(0,'rgba(255,140,200,1)');sg.addColorStop(1,'rgba(255,60,150,.6)');x.fillStyle=sg;x.fillRect(436,294,10,82);x.restore();
  for(let X=398;X<436;X+=9.5)wood(x,X,294,9.5,82,1);x.fillStyle='rgba(40,0,20,.4)';x.fillRect(398,294,38,82);[306,360].forEach(Y=>{x.fillStyle='#141012';x.fillRect(398,Y,30,3);x.fillStyle='rgba(255,90,170,.35)';x.fillRect(398,Y,30,.6)});
  x.fillStyle='rgba(255,80,170,.3)';x.fillRect(434,294,2,82);ell(x,430,338,2.6,2.6,[200,160,70]);ell(x,429.4,337.4,1,1,[255,230,180]);
  wood(x,384,374,76,7,0);x.fillStyle='rgba(255,80,170,.25)';x.fillRect(384,374,76,1.4);
  // Leuchtschrift (Neonröhre an Halterungen)
  [[352,226],[488,226]].forEach(([a,b])=>{x.fillStyle='#1a1418';x.fillRect(a,b,3,16)});
  x.save();x.globalCompositeOperation='lighter';dab(x,420,236,120,[255,40,140],.42);x.restore();x.textAlign='center';x.font='bold 34px Georgia';x.lineJoin='round';
  x.shadowColor='#ff2a90';x.shadowBlur=22;x.strokeStyle='#ff3aa0';x.lineWidth=3.2;x.strokeText('BANJA',420,248);x.shadowBlur=8;x.strokeStyle='#ff9ad0';x.lineWidth=1.6;x.strokeText('BANJA',420,248);x.shadowBlur=0;x.strokeStyle='#fff0f8';x.lineWidth=.6;x.strokeText('BANJA',420,248);
  x.font='italic 11px Georgia';x.shadowColor='#ff60b0';x.shadowBlur=8;x.fillStyle='#ffd0e8';x.fillText('Dampf · Tanz · Wodka',420,264);x.shadowBlur=0;
  // Papierlaternen
  [[372,300],[470,300]].forEach(([X,Y])=>{x.strokeStyle='#1a1008';x.lineWidth=1.2;x.beginPath();x.moveTo(X,Y-14);x.lineTo(X,Y-4);x.stroke();x.save();x.globalCompositeOperation='lighter';dab(x,X,Y+6,44,[255,40,60],.55);x.restore();
    const g=x.createRadialGradient(X-2,Y+3,1,X,Y+6,11);g.addColorStop(0,'#ffd080');g.addColorStop(.45,'#f03a30');g.addColorStop(1,'#801018');x.fillStyle=g;x.beginPath();x.ellipse(X,Y+6,7,10,0,0,7);x.fill();
    x.strokeStyle='rgba(90,10,10,.6)';x.lineWidth=.5;for(let k=-2;k<=2;k++){x.beginPath();x.ellipse(X,Y+6,Math.abs(k)*1.6+.3,10,0,0,7);x.stroke()}x.fillStyle='#1a1008';x.fillRect(X-4,Y-4,8,2);x.fillRect(X-4,Y+15,8,2)});
  x.restore();
  [[30,500,40],[120,470,26],[172,410,14],[668,410,14],[720,470,26],[790,500,40]].forEach(([X,b,w])=>trunk(x,X,b,w));
  [[-20,500,360,150],[90,440,300,120],[700,440,300,120],[830,500,360,150]].forEach(([X,b,h,w])=>fir(x,X,b,h,w,0));
  for(let i=0;i<6;i++){const X=R()<.5?40+R()*170:610+R()*170,Y=250+R()*120;dab(x,X-4,Y,2.6,[255,220,60],.9);dab(x,X+4,Y,2.6,[255,220,60],.9)}
  sign(x,120,488,1.5,[[-1,0,'Zur Mühle','hBM']]);put(x);
  x=lay();for(let i=0;i<30;i++)dab(x,R()*800,300+R()*200,40+R()*50,[150,140,170],.16);put(x,8,'screen',.5);
  grade(o)}
SCN.banjaV.paint=paintBanjaV;

// ----- Rundholzwand für Innenräume (alt: x0,x1,y0,y1) und Schmiede (x0,x1,Unterkante,Höhe,Köpfe) -----
function logWall(x,x0,x1,a,b,ends){if(ends===undefined&&a<b){x.save();x.beginPath();x.rect(x0,a,x1-x0,b-a);x.clip();roundLogs(x,x0,x1,b,a,26,{grey:.15,tone:[110,74,44],lx:-1});x.restore();return}
  const B=a,h=b;x.save();x.beginPath();x.rect(x0-10,B-h-1,x1-x0+20,h+1);x.clip();roundLogs(x,x0,x1,B,B-h,10,{grey:.35,ends:ends||[1,1]});x.restore();wallFX(x,QP([[x0,B-h],[x1,B-h],[x1,B],[x0,B]]),x0,x1,B-h,B,{eave:12})}

// ================= Brandruine (Dorf) =================
// verkohlte Rundhölzer mit Schuppenrissen (Krokodilhaut), Asche und Glutresten
function charWall(x,pts){const p=QP(pts);x.save();x.clip(p);roundLogs(x,-160,160,4,-262,9,{tone:[34,28,24],grey:.04,lx:1,seed:pts.length*7});x.fillStyle='rgba(8,6,5,.55)';x.fill(p);
  gseed(pts.length*13);for(let y=4;y>-262;y-=9.4)for(let X=-160;X<160;X+=2+gr()*4){x.fillStyle='rgba(0,0,0,.75)';x.fillRect(X,y-7+gr()*2,.7,3+gr()*3);if(gr()<.35){x.fillStyle='rgba(150,140,128,.22)';x.fillRect(X+.8,y-6+gr()*3,1.6+gr()*2.5,.6)}}
  for(let i=0;i<60;i++)ell(x,-150+gr()*300,-gr()*220,.6+gr()*1.4,.4+gr()*.6,[255,90+gr()*80,20],.18+gr()*.3);x.restore()}
function ruin(x,cx,B,s){shadowAt(x,cx,B+4,160*s,.5);x.save();x.translate(cx,B);x.scale(-s,s);
  for(let i=0;i<70;i++)dab(x,-120+R()*280,-14+R()*24,10+R()*22,R()<.5?[24,22,20]:[96,92,86],.5);
  const top=(a,b,y0,y1,h0,h1,n)=>{const r=[];for(let i=0;i<=n;i++){const t=i/n,X=a+(b-a)*t,h=h0+(h1-h0)*t;r.push([X,y0+(y1-y0)*t-h*(.25+R()*.75)])}return r};
  charWall(x,[[100,0],...top(100,146,0,-26,88,40,8),[146,-26]]);
  // russischer Ofen: verrußter Kalkputz mit Rissen
  {const X0=-24,Y0=-70,w=60,h=70;gseed(321);const g=x.createLinearGradient(X0,0,X0+w,0);g.addColorStop(0,'#cfc8b8');g.addColorStop(.7,'#a8a294');g.addColorStop(1,'#6a665c');x.fillStyle=g;x.fillRect(X0,Y0,w,h);
    for(let i=0;i<120;i++)dab(x,X0+gr()*w,Y0+gr()*h,2+gr()*6,gr()<.5?[90,86,78]:[230,226,216],.18);
    const sg=x.createLinearGradient(0,Y0,0,0);sg.addColorStop(0,'rgba(16,14,12,.9)');sg.addColorStop(.55,'rgba(16,14,12,.35)');sg.addColorStop(1,'rgba(16,14,12,.1)');x.fillStyle=sg;x.fillRect(X0,Y0,w,h);
    x.strokeStyle='rgba(30,26,22,.8)';x.lineWidth=.6;for(let k=0;k<5;k++){let px=X0+gr()*w,py=Y0+gr()*h*.6;x.beginPath();x.moveTo(px,py);for(let j=0;j<6;j++){px+=(gr()-.5)*8;py+=2+gr()*5;x.lineTo(px,py)}x.stroke()}
    for(let i=0;i<10;i++){const X=X0+4+gr()*(w-12),Y=Y0+20+gr()*(h-30);x.fillStyle='rgba(140,60,40,.75)';x.fillRect(X,Y,6,3);x.strokeStyle='rgba(60,20,10,.6)';x.lineWidth=.3;x.strokeRect(X,Y,6,3)}
    x.fillStyle='#0c0a08';x.beginPath();x.moveTo(-8,0);x.lineTo(-8,-26);x.quadraticCurveTo(6,-40,20,-26);x.lineTo(20,0);x.fill();x.save();x.globalCompositeOperation='lighter';dab(x,6,-6,12,[255,90,20],.35);x.restore();
    x.strokeStyle='rgba(0,0,0,.6)';x.lineWidth=1;x.strokeRect(X0,Y0,w,h);x.fillStyle='rgba(0,0,0,.4)';x.fillRect(X0,Y0-3,w,3)}
  chimneyB(x,2,-200,24,130,{lx:1});
  charWall(x,[[-100,4],...top(-100,-30,4,4,94,30,10),...top(-30,30,4,4,10,14,4),...top(30,100,4,4,40,86,10),[100,4]]);
  x.lineCap='round';[[-90,-60,-20,6],[60,-70,120,4],[-40,-30,40,-4],[100,-80,30,4]].forEach(([a,b,c2,d],i)=>{const L=Math.hypot(c2-a,d-b),an=Math.atan2(d-b,c2-a);x.save();x.translate(a,b);x.rotate(an);ell(x,L/2,6,L/2,3,[0,0,0],.4);
    x.beginPath();x.rect(-1,-4,L+2,8);x.clip();roundLogs(x,-1,L+1,4,-4,8,{tone:[30,26,22],grey:.05,lx:1,seed:i*5});x.fillStyle='rgba(6,5,4,.5)';x.fillRect(-1,-4,L+2,8);gseed(i*9);for(let X=0;X<L;X+=2+gr()*3){x.fillStyle='rgba(0,0,0,.8)';x.fillRect(X,-3,.6,5)}x.restore()});
  for(let i=0;i<8;i++)dab(x,14+(R()-.5)*6+i*3,-210-i*12,6+i*2,[140,140,140],.12);x.restore()}
