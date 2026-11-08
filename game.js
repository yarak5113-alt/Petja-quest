const $=q=>document.querySelector(q),NS='http://www.w3.org/2000/svg';
window.onerror=(m,f,l)=>{const d=document.createElement('div');d.style.cssText='position:absolute;left:0;right:0;bottom:0;background:#a00;color:#fff;font:14px Arial;padding:6px;z-index:9';d.textContent='Fehler: '+m+' (Zeile '+l+')';$('#game').appendChild(d)};
let s=5;const R=()=>(s=(s*9301+49297)%233280)/233280;

// ================= Mal-Werkzeuge =================
const SC=1.5,W=1200,H=750;let S0;
const cv=$('#bg');cv.width=W;cv.height=H;const c=cv.getContext('2d');
const lay=()=>{const o=document.createElement('canvas');o.width=W;o.height=H;const x=o.getContext('2d');x.setTransform(SC,0,0,SC,0,0);return x};
const put=(x,blur=0,op='source-over',a=1)=>{c.save();c.filter=blur?`blur(${blur*SC}px)`:'none';c.globalCompositeOperation=op;c.globalAlpha=a;c.drawImage(x.canvas,0,0);c.restore()};
const cl=v=>v<0?0:v>1?1:v,sst=(a,b,v)=>{const t=cl((v-a)/(b-a));return t*t*(3-2*t)};
const mix=(a,b,t)=>{t=cl(t);return[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t]};
const rgba=(k,a=1)=>`rgba(${k[0]|0},${k[1]|0},${k[2]|0},${a})`;
const perm=new Uint8Array(512);{const p=[...Array(256).keys()];for(let i=255;i>0;i--){const j=R()*(i+1)|0;[p[i],p[j]]=[p[j],p[i]]}for(let i=0;i<512;i++)perm[i]=p[i&255]}
const rn=(x,y)=>perm[(perm[x&255]+(y&255))&511]/255;
function vn(x,y){const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi,u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf),a=rn(xi,yi),b=rn(xi+1,yi),e=rn(xi,yi+1),d=rn(xi+1,yi+1);return a+(b-a)*u+(e-a)*v+(a-b-e+d)*u*v}
function fbm(x,y,o){let t=0,a=.5,f=1;for(let i=0;i<o;i++){t+=a*vn(x*f,y*f);f*=2.03;a*=.5}return t/(1-Math.pow(.5,o))}
function dab(x,X,Y,r,k,a){const g=x.createRadialGradient(X,Y,0,X,Y,r);g.addColorStop(0,rgba(k,a));g.addColorStop(1,rgba(k,0));x.fillStyle=g;x.fillRect(X-r,Y-r,2*r,2*r)}
function ell(x,X,Y,rx,ry,k,a=1,rot=0){x.fillStyle=rgba(k,a);x.beginPath();x.ellipse(X,Y,Math.abs(rx)+.01,Math.abs(ry)+.01,rot,0,7);x.fill()}
const inP=(X,Y)=>{const p=S0.pe(X,Y);return p&&p[0]>0};
// Weg aus Segmenten [x1,y1,halbe Breite1,x2,y2,halbe Breite2] -> [Randabstand, Abstand zur Mitte, halbe Breite]
const segPath=sg=>(X,Y)=>{if(Y<S0.hz)return null;let b=null;for(const[a,q,wa,e,f,wb]of sg){const dx=e-a,dy=f-q,t=cl(((X-a)*dx+(Y-q)*dy)/(dx*dx+dy*dy)),d=Math.hypot(X-a-dx*t,Y-q-dy*t),hw=wa+(wb-wa)*t;if(!b||hw-d>b[0])b=[hw-d,d,hw]}return b};
function pWald(X,Y){if(Y<258)return null;const t=(Y-258)/242,cx=474-t*60+Math.sin(t*6)*34*Math.sqrt(t),hw=3+Math.pow(t,1.7)*230+Math.sin(t*9)*6*t,d=Math.abs(X-cx);return[hw-d,d,hw]}

// ================= Himmel, Ferne, Boden =================
function sky(o){const h=Math.ceil((o.hz+30)*SC),im=c.createImageData(W,h),d=im.data;
  for(let py=0;py<h;py++){const Y=py/SC,t=Math.pow(Math.min(1,Y/o.hz),.9),base=mix(o.top,o.hor,t),band=sst(8,55,Y)*(1-sst(o.hz*.58,o.hz*.92,Y));
    for(let px=0;px<W;px++){const X=px/SC,i=(py*W+px)*4;let k=base;
      if(band>0){const n=fbm(X/150+o.seed,Y/46,5),dn=sst(o.cov,o.cov+.2,n)*band;
        if(dn>0){const nd=fbm(X/150+o.seed,(Y+9)/46,5),lt=cl((.84+(n-nd)*4.5-.62)/.44);k=mix(k,mix(o.cs,o.cl,lt),dn)}}
      const dx=X-o.sun[0],dy=Y-o.sun[1],sd=Math.sqrt(dx*dx+dy*dy),gl=Math.min(1,Math.exp(-sd/o.sunr)*1.1+Math.exp(-sd/(o.sunr*3.8))*.3);
      d[i]=k[0]+(o.sunc[0]-k[0])*gl;d[i+1]=k[1]+(o.sunc[1]-k[1])*gl;d[i+2]=k[2]+(o.sunc[2]-k[2])*gl;d[i+3]=255}}
  c.putImageData(im,0,0)}
function far(o){const x=lay(),hz=o.hz;
  for(let X=o.band[0];X<o.band[1];X+=3){const top=hz-6-fbm(X/18,1,3)*24;for(let Y=top;Y<hz+8;Y+=3)dab(x,X+(R()-.5)*3,Y,4+R()*3,mix(o.bc[0],o.bc[1],R()*.6),.5)}
  if(o.hutSil){x.fillStyle='rgba(70,100,92,.7)';x.fillRect(352,hz-22,13,9);x.beginPath();x.moveTo(349,hz-21);x.lineTo(358,hz-30);x.lineTo(368,hz-21);x.fill();
    x.strokeStyle='rgba(70,100,92,.7)';x.lineWidth=1.3;x.beginPath();x.moveTo(355,hz-13);x.lineTo(353,hz-6);x.moveTo(362,hz-13);x.lineTo(364,hz-6);x.stroke()}
  o.masses.forEach(([a,b,tb=12,tv=95],mi)=>{
    for(let X=a;X<b;X+=4){let top=tb+fbm(X/35,7+mi,4)*tv;if(mi==0&&X>b-90)top+=(X-b+90)*1.8;if(mi==1&&X<a+90)top+=(a+90-X)*1.8;
      for(let Y=top;Y<hz+26;Y+=4){const lit=fbm(X/16,Y/16,3)>.55&&Y<top+70;dab(x,X+(R()-.5)*5,Y,5+R()*4,lit?mix(o.lit[0],o.lit[1],R()):mix(o.dark[0],o.dark[1],R()),.55)}
      if(o.spruce&&R()<.06){const sh=40+R()*60,sb=hz+10;for(let k=0;k<sh;k+=3){const ww=(k/sh)*14+1;ell(x,X,sb-sh+k,ww,2.2,mix(o.dark[0],[10,24,14],.5),.8)}}}
    if(o.trunks)for(let i=0;i<24;i++){const X=a+15+R()*(b-a-30),y0=60+R()*110,w=1.4+R()*2.6,g=x.createLinearGradient(X,0,X+w,0);
      g.addColorStop(0,'rgba(140,146,140,.85)');g.addColorStop(.65,'rgba(226,228,220,.9)');g.addColorStop(1,'rgba(150,156,150,.85)');x.fillStyle=g;x.fillRect(X,y0,w,hz+24-y0);
      for(let k=0;k<7;k++){x.fillStyle='rgba(30,30,25,.5)';x.fillRect(X,y0+R()*(hz-y0),w,.7+R()*1.3)}}});
  if(o.dead)for(let i=0;i<14;i++)deadTree(x,R()*800,hz+20,120+R()*120,3+R()*3,rgba(o.dark[0]));
  const g=x.createLinearGradient(0,hz-120,0,hz+26);g.addColorStop(0,rgba(o.haze,0));g.addColorStop(1,rgba(o.haze,.5));x.fillStyle=g;x.fillRect(0,hz-120,800,146);
  put(x,1.3)}
function ground(o){const hz=o.hz,y0=Math.floor((hz-1)*SC),h=H-y0,im=c.getImageData(0,y0,W,h),d=im.data;
  for(let py=0;py<h;py++){const Y=(py+y0)/SC,t=Math.max(0,(Y-hz)/(500-hz)),ew=1+t*9;
    for(let px=0;px<W;px++){const X=px/SC;if(Y<o.gtop(X))continue;const i=(py*W+px)*4;
      const n1=fbm(X/55,Y/(7+t*22),4),n2=vn(X/2.5,Y/(1.2+t*2.5));
      let k=mix(o.g[0],o.g[1],sst(.3,.7,n1));k=mix(k,o.g[2],sst(.62,.82,n1)*.55);
      const sh=(.78+n2*.36)*(1.06-t*.32);k=[k[0]*sh,k[1]*sh,k[2]*sh];
      const p=o.pe(X,Y);
      if(p){const e=p[0]+(n2-.5)*ew*1.4,pm=sst(-ew*.4,ew,e);
        if(pm>0){const sn=fbm(X/12,Y/(2.5+t*6),4),fi=vn(X*1.4,Y*1.4);let sd=mix(o.sand[0],o.sand[1],sst(.25,.78,sn));
          const rut=Math.abs(p[1]-p[2]*.35)/(p[2]*.09+.4),f=(.84+fi*.28)*(.8+.2*Math.min(1,rut));sd=[sd[0]*f,sd[1]*f,sd[2]*f];k=mix(k,sd,pm)}}
      k=mix(k,o.gh,(1-sst(0,.22,t))*.38);
      const lp=sst(.56,.7,fbm(X/42+9,Y/(9+t*16),3))*o.dapple+1;
      d[i]=k[0]*lp;d[i+1]=k[1]*lp;d[i+2]=k[2]*lp*.96;d[i+3]=255}}
  c.putImageData(im,0,y0)}

// ================= Bäume, Gras, Details =================
const SD=[.6,-.8];
function birchPath(X,base,w,L,top=-12){const h=base-top,n=Math.ceil(h/10),lp=[],rp=[];
  for(let i=0;i<=n;i++){const k=i/n,Y=base-k*h,ww=w*(1-k*.42)/2*(1+(vn(i*.7,X)-.5)*.1),cx=X+L*k*k;lp.push([cx-ww,Y]);rp.push([cx+ww,Y])}
  lp[0][0]-=w*.2;rp[0][0]+=w*.2;
  return'M'+lp.concat(rp.reverse()).map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join('L')+'Z'}
function birch(x,X,base,w,L,top=-12,ps){ps=ps||birchPath(X,base,w,L,top);const p=new Path2D(ps),h=base-top,g=x.createLinearGradient(X-w/2,0,X+w/2,0);
  [[0,'#5a5850'],[.22,'#a8a598'],[.58,'#f4f2ea'],[.8,'#e0dcd0'],[1,'#767268']].forEach(([o,k])=>g.addColorStop(o,k));
  x.fillStyle=g;x.fill(p);x.save();x.clip(p);
  for(let i=0;i<h/2;i++){const Y=base-R()*h,k=(base-Y)/h,cx=X+L*k*k,ww=w*(1-k*.42),l=ww*(.15+R()*.4),x0=cx-ww/2+R()*(ww-l);
    x.strokeStyle=`rgba(96,90,78,${.12+R()*.25})`;x.lineWidth=.35+R()*.5;x.beginPath();x.moveTo(x0,Y);x.lineTo(x0+l,Y+(R()-.5)*.6);x.stroke()}
  for(let i=0;i<h/8;i++){const k=Math.pow(R(),1.5),Y=base-k*h,cx=X+L*k*k,ww=w*(1-k*.42),l=ww*(.2+R()*.6),x0=R()<.5?cx-ww/2-1:cx+ww/2-l+1,th=.6+R()*2.2*(w/16);
    x.fillStyle=`rgba(24,22,18,${.7+R()*.3})`;x.beginPath();x.moveTo(x0,Y);x.quadraticCurveTo(x0+l*.5,Y-th*1.6,x0+l,Y+(R()-.5)*1.5);x.quadraticCurveTo(x0+l*.5,Y+th*.7,x0,Y);x.fill()}
  const bh=h*(.08+R()*.06),bg=x.createLinearGradient(0,base-bh,0,base);bg.addColorStop(0,'rgba(46,40,30,0)');bg.addColorStop(.5,'rgba(46,40,30,.6)');bg.addColorStop(1,'rgba(34,30,22,.95)');x.fillStyle=bg;x.fillRect(X-w*2,base-bh,w*4,bh);
  if(top<100){const tg=x.createLinearGradient(0,top,0,top+130);tg.addColorStop(0,'rgba(28,44,18,.6)');tg.addColorStop(1,'rgba(28,44,18,0)');x.fillStyle=tg;x.fillRect(X-w*2+L,top,w*4,130)}
  x.restore();x.strokeStyle='rgba(40,38,30,.35)';x.lineWidth=.7;x.stroke(p)}
function foliage(x,X,Y,r,dk,nh){const f=S0.fol;
  for(let i=0;i<5;i++)dab(x,X+(R()-.5)*r,Y+(R()-.5)*r*.6,r*.75,dk?[8,24,8]:mix(f[0],[0,0,0],.2),.45);
  for(let i=0;i<r*r*.32;i++){const a=R()*6.283,dd=Math.pow(R(),.6)*r,ox=Math.cos(a)*dd,oy=Math.sin(a)*dd*.72,lt=cl((ox*SD[0]+oy*SD[1])/r*.6+.45+(R()-.5)*.5);
    const k=dk?mix([10,30,10],[40,80,24],lt):lt<.5?mix(f[0],f[1],lt*2):mix(f[1],f[2],(lt-.5)*2);ell(x,X+ox,Y+oy,.9+R()*1.6,.6+R(),k,.92,R()*3)}
  if(!nh)for(let i=0;i<r/10;i++)hang(x,X+(R()-.5)*r*1.2,Y+r*.3,14+R()*26)}
function hang(x,X,Y,len){const b=(R()-.5)*14,f=S0.fol;x.strokeStyle='rgba(70,60,45,.7)';x.lineWidth=.6;x.beginPath();x.moveTo(X,Y);x.quadraticCurveTo(X+b,Y+len*.5,X+b*.6,Y+len);x.stroke();
  for(let k=0;k<len;k+=2.2){const t=k/len;ell(x,X+b*2*t*(1-t)+b*.6*t*t+(R()-.5)*3,Y+k,1+R()*1.2,.7+R()*.6,mix(f[1],f[2],R()),.9,R()*3)}}
function deadTree(x,X,Y,h,w,col){x.strokeStyle=col;x.lineCap='round';
  const br=(x0,y0,a,l,wd,dp)=>{if(dp>6||wd<.35)return;const x1=x0+Math.cos(a)*l,y1=y0+Math.sin(a)*l;x.lineWidth=wd;x.beginPath();x.moveTo(x0,y0);x.quadraticCurveTo((x0+x1)/2+(R()-.5)*l*.35,(y0+y1)/2+(R()-.5)*l*.2,x1,y1);x.stroke();
    const n=dp<2?2:R()<.7?2:3;for(let i=0;i<n;i++)br(x1,y1,a+(R()-.5)*1.4,l*(.58+R()*.25),wd*.62,dp+1)};
  br(X,Y,-Math.PI/2+(R()-.5)*.25,h*.38,w,0)}
function grass(x,n,y1,y2,sc,dk){const o=S0;for(let i=0;i<n;i++){const Y=y1+Math.pow(R(),.75)*(y2-y1),X=dk?(R()<.5?R()*250-20:580+R()*240):R()*820-10,t=Math.max(0,(Y-o.hz)/(500-o.hz));if(!dk&&(Y<o.gtop(X)||inP(X,Y-1)&&R()<.94))continue;
  const len=(2+t*14)*sc*(.6+R()*.8),b=(R()-.5)*len*.8,w=(.35+t*1.1)*sc,k0=dk?mix(o.d0[0],o.d0[1],R()):mix(o.b0[0],o.b0[1],R()),k1=dk?mix(o.d1[0],o.d1[1],R()):mix(o.b1[0],o.b1[1],R());
  x.lineCap='round';x.lineWidth=w;x.strokeStyle=rgba(k0,.92);x.beginPath();x.moveTo(X,Y);x.quadraticCurveTo(X+b*.2,Y-len*.6,X+b,Y-len);x.stroke();
  x.lineWidth=w*.65;x.strokeStyle=rgba(k1,.85);x.beginPath();x.moveTo(X+b*.08,Y-len*.45);x.quadraticCurveTo(X+b*.35,Y-len*.78,X+b,Y-len);x.stroke()}}
function details(x){const o=S0;
  for(let i=0;i<o.nfl;i++){const Y=o.hz+8+Math.pow(R(),.8)*(492-o.hz),X=R()*800,t=(Y-o.hz)/(500-o.hz);if(inP(X,Y)||Y<o.gtop(X)+3)continue;
    const k=o.fl[R()*o.fl.length|0],r=.5+t*2.2;dab(x,X,Y,r*1.8,k,.5);ell(x,X,Y,r,r*.7,k,.95)}
  for(let i=0,n=0;i<600&&n<40;i++){const Y=o.hz+30+R()*(470-o.hz),X=R()*800;if(!inP(X,Y))continue;n++;const t=(Y-o.hz)/(500-o.hz),sz=1.5+t*5;
    ell(x,X-sz*.4,Y+sz*.3,sz*1.1,sz*.5,[60,45,25],.45);const g=x.createRadialGradient(X+sz*.3,Y-sz*.4,0,X,Y,sz);g.addColorStop(0,'#e4ded2');g.addColorStop(1,'#7a7468');x.fillStyle=g;x.beginPath();x.ellipse(X,Y,sz,sz*.6,0,0,7);x.fill()}}
function shadows(list,a=.38){const x=lay();x.fillStyle='rgba(20,40,10,1)';list.forEach(([X,b,w])=>{x.beginPath();x.ellipse(X-w*2.2,b+4,w*3.2,4+w*.2,-.05,0,7);x.fill()});
  x.beginPath();x.ellipse(-10,470,140,30,0,0,7);x.fill();x.beginPath();x.ellipse(820,460,150,34,0,0,7);x.fill();put(x,5,'source-over',a)}
function rays(o,list){const x=lay();x.fillStyle=rgba(o.rayc,.5);list.forEach(([a,wd])=>{x.beginPath();x.moveTo(o.sun[0],o.sun[1]);x.lineTo(o.sun[0]+Math.sin(a-wd)*800,o.sun[1]+Math.cos(a-wd)*800);x.lineTo(o.sun[0]+Math.sin(a+wd)*800,o.sun[1]+Math.cos(a+wd)*800);x.fill()});put(x,14,'screen',o.raya)}
function grade(o){c.save();c.globalCompositeOperation='soft-light';let g=c.createLinearGradient(W,0,0,H);g.addColorStop(0,o.gr[0]);g.addColorStop(1,o.gr[1]);c.fillStyle=g;c.fillRect(0,0,W,H);c.restore();
  g=c.createRadialGradient(W/2,H*.55,W*.3,W/2,H*.55,W*.75);g.addColorStop(0,'rgba(10,16,4,0)');g.addColorStop(1,`rgba(10,12,4,${o.vig})`);c.fillStyle=g;c.fillRect(0,0,W,H);
  const im=c.getImageData(0,0,W,H),d=im.data;for(let i=0;i<d.length;i+=4){const n=(Math.random()-.5)*9;d[i]+=n;d[i+1]+=n;d[i+2]+=n}c.putImageData(im,0,0)}

// ================= Gemalte Objekte =================
function mushroom(x,X,Y){
  x.save();x.translate(X-8,Y+1);x.scale(1,.22);dab(x,0,0,36,[16,28,8],.6);x.restore();
  let g=x.createLinearGradient(X-9,0,X+10,0);g.addColorStop(0,'#c8bea4');g.addColorStop(.35,'#fbf7ea');g.addColorStop(1,'#9a9078');x.fillStyle=g;
  x.beginPath();x.moveTo(X-8,Y);x.quadraticCurveTo(X-11,Y-16,X-6,Y-34);x.lineTo(X+7,Y-33);x.quadraticCurveTo(X+9,Y-16,X+10,Y);x.quadraticCurveTo(X+1,Y+3,X-8,Y);x.fill();
  ell(x,X+1,Y-25,10,3,[226,218,196]);ell(x,X+1,Y-24,9,2,[170,160,136],.6);ell(x,X+1,Y-32,31,4.5,[176,156,118]);ell(x,X+1,Y-32.5,26,2.8,[120,98,70],.6);
  g=x.createRadialGradient(X+9,Y-57,2,X,Y-44,42);g.addColorStop(0,'#ff8a5a');g.addColorStop(.3,'#e2341a');g.addColorStop(.78,'#9a1608');g.addColorStop(1,'#560a02');x.fillStyle=g;
  x.beginPath();x.moveTo(X-33,Y-31);x.quadraticCurveTo(X-31,Y-60,X-3,Y-63);x.quadraticCurveTo(X+29,Y-63,X+35,Y-34);x.quadraticCurveTo(X+18,Y-29,X,Y-31);x.quadraticCurveTo(X-18,Y-28,X-33,Y-31);x.fill();
  x.save();x.globalCompositeOperation='screen';dab(x,X+10,Y-55,11,[255,190,160],.55);x.restore();
  [[-18,-50,4],[-4,-58,3.4],[12,-53,4],[-25,-39,2.6],[24,-42,2.8],[0,-44,3],[20,-56,2.4],[-12,-42,2.2]].forEach(([a,b,r])=>{
    ell(x,X+a-.6,Y+b+.9,r,r*.6,[110,24,14],.5);const wg=x.createRadialGradient(X+a+r*.3,Y+b-r*.3,0,X+a,Y+b,r);wg.addColorStop(0,'#fffef6');wg.addColorStop(1,'#d2c6aa');x.fillStyle=wg;x.beginPath();x.ellipse(X+a,Y+b,r,r*.62,0,0,7);x.fill()})}
function stump(x,X,Y){
  x.save();x.translate(X-12,Y+10);x.scale(1,.2);dab(x,0,0,60,[16,28,8],.6);x.restore();
  const p=new Path2D(`M${X-40},${Y+10}Q${X-31},${Y+4} ${X-30},${Y-26}H${X+30}Q${X+31},${Y+4} ${X+42},${Y+11}Q${X+26},${Y+8} ${X+18},${Y+13}Q${X+4},${Y+8} ${X-8},${Y+13}Q${X-22},${Y+8} ${X-40},${Y+10}Z`);
  let g=x.createLinearGradient(X-40,0,X+42,0);g.addColorStop(0,'#2e1e0e');g.addColorStop(.3,'#6a4a2a');g.addColorStop(.55,'#8a6640');g.addColorStop(1,'#24160a');x.fillStyle=g;x.fill(p);
  x.save();x.clip(p);for(let i=0;i<70;i++){const sx=X-40+R()*82;x.strokeStyle=R()<.6?`rgba(20,12,4,${.3+R()*.4})`:`rgba(170,130,90,${.2+R()*.3})`;x.lineWidth=.5+R()*1.4;x.beginPath();x.moveTo(sx,Y-28);x.bezierCurveTo(sx+(R()-.5)*4,Y-12,sx+(R()-.5)*4,Y,sx+(R()-.5)*6,Y+14);x.stroke()}
  for(let i=0;i<60;i++)ell(x,X-36+R()*22,Y-6+R()*16,1+R()*2.5,.8+R()*1.5,mix([50,90,20],[130,170,50],R()),.85,R()*3);x.restore();
  g=x.createRadialGradient(X+4,Y-28,2,X,Y-26,30);g.addColorStop(0,'#ecd0a0');g.addColorStop(.75,'#c8a06a');g.addColorStop(1,'#6a4a28');x.fillStyle=g;x.beginPath();x.ellipse(X,Y-26,30,9,0,0,7);x.fill();
  x.strokeStyle='rgba(120,84,44,.55)';x.lineWidth=.6;for(let r=4;r<28;r+=2.5+R()*2){x.beginPath();x.ellipse(X+(R()-.5),Y-26,r,r*.3,0,0,7);x.stroke()}}
function wood(x,x0,y0,w,h,vert){const g=vert?x.createLinearGradient(x0,0,x0+w,0):x.createLinearGradient(0,y0,0,y0+h);g.addColorStop(0,'#4a3218');g.addColorStop(.4,'#8a6a42');g.addColorStop(1,'#3a2410');x.fillStyle=g;x.fillRect(x0,y0,w,h);
  for(let i=0;i<(vert?h:w)/2;i++){x.strokeStyle=`rgba(30,18,6,${.2+R()*.4})`;x.lineWidth=.4+R()*.6;x.beginPath();if(vert){const px=x0+R()*w;x.moveTo(px,y0);x.lineTo(px+(R()-.5)*1.5,y0+h)}else{const py=y0+R()*h;x.moveTo(x0,py);x.lineTo(x0+w,py+(R()-.5)*1.5)}x.stroke()}}
// Holzschild: Pfosten + Bretter [Richtung -1/1, Versatz y, Text, Hit-ID]; setzt die Klickflächen im SVG
function sign(x,X,B,s,boards){
  x.save();x.translate(X+6*s,B);x.scale(1,.25);dab(x,0,0,22*s,[16,24,8],.6);x.restore();
  wood(x,X-3.5*s,B-95*s,7*s,95*s,1);x.strokeStyle='rgba(20,12,4,.7)';x.lineWidth=.7;x.strokeRect(X-3.5*s,B-95*s,7*s,95*s);
  boards.forEach(([dir,dy,t,id])=>{const y=B-91*s+dy*s,w=50*s,h=11*s,x0=dir<0?X-w+3*s:X-3*s,
      pts=dir<0?[[x0-6*s,y+h/2],[x0,y],[x0+w,y],[x0+w,y+h],[x0,y+h]]:[[x0,y],[x0+w,y],[x0+w+6*s,y+h/2],[x0+w,y+h],[x0,y+h]],
      pa=new Path2D('M'+pts.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join('L')+'Z');
    x.save();x.clip(pa);wood(x,x0-8*s,y,w+16*s,h,0);x.restore();x.strokeStyle='rgba(20,12,4,.85)';x.lineWidth=.8;x.stroke(pa);
    x.save();x.fillStyle='rgba(238,228,204,.9)';x.font=`bold ${5.8*s}px Georgia`;const mw=x.measureText(t).width,fw=w-12*s;if(mw>fw)x.font=`bold ${5.8*s*fw/mw}px Georgia`;x.textAlign='center';x.translate(x0+w/2+dir*4*s,y+h*.72);x.rotate((R()-.5)*.05);x.fillText(t,0,0);x.restore();
    x.fillStyle='#1e160e';x.beginPath();x.arc(X,y+h/2,.9*s,0,7);x.fill();
    id&&$('#'+id).setAttribute('d','M'+pts.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join('L')+'Z')})}
function fallenBirch(x){
  for(let i=0;i<30;i++){const a=R()*6.28,l=6+R()*14;x.strokeStyle=`rgba(${50+R()*30},${36+R()*20},20,.9)`;x.lineWidth=1+R()*2;x.beginPath();x.moveTo(500,285);x.lineTo(500+Math.cos(a)*l,285+Math.sin(a)*l*.8);x.stroke()}
  dab(x,500,287,20,[40,30,18],.85);
  x.save();x.translate(500,285);x.rotate(1.982);birch(x,0,0,18,0,-163);x.restore();
  [[560,311,-1.4],[590,324,-1.1],[620,337,-1.8]].forEach(([a,b,ang])=>{x.strokeStyle='#4a4236';x.lineWidth=1.4;x.beginPath();x.moveTo(a,b);x.lineTo(a+Math.cos(ang)*14,b+Math.sin(ang)*10);x.stroke();foliage(x,a+Math.cos(ang)*14,b+Math.sin(ang)*10,7)})}
const SKULLS=[];
function fence(x){x.strokeStyle='#3a2a18';x.lineWidth=3;x.beginPath();x.moveTo(248,372);x.lineTo(352,369);x.stroke();
  for(let i=0;i<9;i++){const X=254+i*12+(R()-.5)*3,top=346+R()*8,base=398-i*.5,g=x.createLinearGradient(X-3,0,X+3,0);
    g.addColorStop(0,'#2a1e14');g.addColorStop(.4,'#6a5236');g.addColorStop(1,'#1e140c');x.fillStyle=g;x.beginPath();x.moveTo(X-3,base);x.lineTo(X-2.6,top+4);x.lineTo(X,top);x.lineTo(X+2.6,top+4);x.lineTo(X+3,base);x.fill();
    if(i%2==0){const Y=top-3,sg=x.createRadialGradient(X+1.5,Y-2,0,X,Y,7);sg.addColorStop(0,'#f0e8d4');sg.addColorStop(1,'#8a8068');x.fillStyle=sg;x.beginPath();x.ellipse(X,Y,5.5,6,0,0,7);x.fill();x.fillRect(X-3.5,Y+3,7,4);
      ell(x,X-2.2,Y,1.6,1.9,[20,14,10]);ell(x,X+2.2,Y,1.6,1.9,[20,14,10]);ell(x,X,Y+3,.8,1,[40,30,20]);SKULLS.push([X,Y])}}}
function hut(x){
  x.save();x.translate(478,398);x.scale(1,.16);dab(x,0,0,130,[8,6,12],.75);x.restore();
  const leg=(hx,kx,ky,ax,ay,toes)=>{
    for(let i=0;i<50;i++){const t=R();ell(x,hx+(kx-hx)*t*.6+(R()-.5)*12,302+(ky-302)*t*.6,3+R()*3,2+R()*2,mix([60,42,26],[130,96,60],R()),1,R()*3)}
    x.lineCap='round';x.strokeStyle='#2a1808';x.lineWidth=12;x.beginPath();x.moveTo((hx+kx)/2,(302+ky)/2);x.lineTo(kx,ky);x.lineTo(ax,ay);x.stroke();x.strokeStyle='#b87a30';x.lineWidth=9.5;x.stroke();
    x.strokeStyle='#d0984a';x.lineWidth=3;x.beginPath();x.moveTo(kx+2,ky);x.lineTo(ax+1.5,ay);x.stroke();
    for(let k=0;k<1;k+=.09){x.strokeStyle='rgba(70,40,14,.7)';x.lineWidth=.8;x.beginPath();x.arc(kx+(ax-kx)*k,ky+(ay-ky)*k,3.4,.2,2.9);x.stroke()}
    toes.forEach(([tx,ty])=>{x.strokeStyle='#8a5a22';x.lineWidth=3.6;x.beginPath();x.moveTo(ax,ay);x.quadraticCurveTo((ax+tx)/2,ay+3,tx,ty);x.stroke();x.fillStyle='#1e160e';x.beginPath();x.moveTo(tx,ty-2);x.lineTo(tx+(tx-ax)*.3,ty+1.5);x.lineTo(tx,ty+2);x.fill()})};
  leg(431,448,340,438,384,[[418,394],[440,397],[460,392]]);leg(515,532,342,520,386,[[500,396],[522,399],[542,394]]);
  x.save();x.beginPath();x.rect(396,222,164,80);x.clip();
  for(let y=302;y>222;y-=10){const g=x.createLinearGradient(0,y-10,0,y);g.addColorStop(0,'#2e1e0e');g.addColorStop(.35,'#6e4e2e');g.addColorStop(.6,'#563a20');g.addColorStop(1,'#1e1208');x.fillStyle=g;x.fillRect(396,y-10,164,10);
    for(let i=0;i<26;i++){const px=396+R()*164,py=y-9+R()*8;x.strokeStyle=`rgba(20,12,4,${.3+R()*.4})`;x.lineWidth=.5;x.beginPath();x.moveTo(px,py);x.lineTo(px+8+R()*20,py+(R()-.5));x.stroke()}}
  for(let i=0;i<90;i++)ell(x,398+R()*40,280+R()*22,1+R()*2.4,.8+R()*1.4,mix([40,70,22],[90,120,40],R()),.85,R()*3);
  const sh=x.createLinearGradient(396,0,560,0);sh.addColorStop(0,'rgba(0,0,0,.35)');sh.addColorStop(.5,'rgba(0,0,0,0)');sh.addColorStop(1,'rgba(0,0,0,.45)');x.fillStyle=sh;x.fillRect(396,222,164,80);x.restore();
  for(let y=297;y>222;y-=10)[[393,y],[563,y]].forEach(([lx,ly])=>{const g=x.createRadialGradient(lx-1,ly-1,0,lx,ly,5.5);g.addColorStop(0,'#a8845a');g.addColorStop(.7,'#6a4a2c');g.addColorStop(1,'#20140a');x.fillStyle=g;x.beginPath();x.ellipse(lx,ly,4.5,5,0,0,7);x.fill()});
  x.save();x.translate(423,252);x.rotate(.07);x.translate(-423,-252);x.fillStyle='#140c06';x.fillRect(410,240,26,24);let g=x.createRadialGradient(423,252,1,423,252,15);g.addColorStop(0,'#ffe68a');g.addColorStop(1,'#d0600c');x.fillStyle=g;x.fillRect(412,242,22,20);
  x.strokeStyle='#24160a';x.lineWidth=2;x.beginPath();x.moveTo(423,242);x.lineTo(423,262);x.moveTo(412,252);x.lineTo(434,252);x.stroke();
  wood(x,401,238,9,28,1);wood(x,436,238,9,28,1);x.restore();
  x.save();const dp=new Path2D('M456,302V246Q472,238 488,246V302Z');x.clip(dp);wood(x,454,236,36,68,1);for(let i=0;i<4;i++){x.strokeStyle='rgba(15,8,2,.8)';x.lineWidth=.9;x.beginPath();x.moveTo(456+i*8+8,240);x.lineTo(456+i*8+8,302);x.stroke()}x.restore();
  x.fillStyle='#1a1410';x.fillRect(457,254,14,2.5);x.fillRect(457,286,14,2.5);x.strokeStyle='#2a2420';x.lineWidth=1.3;x.beginPath();x.arc(482,274,3,0,7);x.stroke();
  x.strokeStyle='rgba(10,6,2,.9)';x.lineWidth=1.2;x.stroke(dp);
  x.fillStyle='#2a1c10';x.beginPath();x.moveTo(530,192);x.lineTo(533,160);x.lineTo(548,158);x.lineTo(545,200);x.fill();
  for(let i=0;i<30;i++)ell(x,533+R()*13,162+R()*34,2+R()*2,1.5+R(),mix([50,44,40],[100,92,84],R()),.9);
  const rp=new Path2D('M370,228Q420,190 472,146Q522,182 584,224Q560,232 540,229Q478,238 398,232Z');
  g=x.createLinearGradient(0,146,0,235);g.addColorStop(0,'#5a4c36');g.addColorStop(1,'#2a2014');x.fillStyle=g;x.fill(rp);x.save();x.clip(rp);
  for(let i=0;i<1400;i++){const u=R(),v=R()*(1-u),X=370+u*102+v*214,Y=228-u*82-v*4+R()*6,dx=X<472?-.8:.8;x.strokeStyle=rgba(mix([60,50,34],[150,128,90],R()),.8);x.lineWidth=.6+R()*.7;x.beginPath();x.moveTo(X,Y);x.lineTo(X+dx*5,Y+5);x.stroke()}
  for(let i=0;i<120;i++)ell(x,380+R()*190,175+R()*55,1.5+R()*3,1+R()*2,mix([40,64,24],[96,120,44],R()),.8,R()*3);
  x.fillStyle='rgba(0,0,0,.45)';x.fillRect(370,224,214,12);x.restore();
  x.save();x.globalCompositeOperation='lighter';dab(x,423,252,40,[255,150,40],.25);x.restore();
  hutDetails(x)}

// ================= Deko =================
const shadowAt=(x,X,Y,r,a=.6)=>{x.save();x.translate(X,Y);x.scale(1,.28);dab(x,0,0,r,[8,8,6],a);x.restore()};
function bush(x,X,Y,r,dk){shadowAt(x,X,Y+2,r*1.3,.5);for(let i=0;i<3;i++)foliage(x,X+(R()-.5)*r,Y-r*.35-R()*r*.3,r*(.55+R()*.3),dk,1)}
function bgRow(x,n,y1,y2,r0,r1,dk){for(let i=0;i<n;i++){const X=R()*820-10,Y=y1+R()*(y2-y1),r=r0+R()*(r1-r0);for(let k=0;k<2;k++)foliage(x,X+(R()-.5)*r,Y-r*.3,r*(.6+R()*.3),dk,1)}}
function fern(x,X,Y,s){const f=S0.fol;for(let i=0;i<7;i++){const a=-Math.PI*(.12+i*.125)+(R()-.5)*.1,L=(26+R()*12)*s,tx=X+Math.cos(a)*L,ty=Y+Math.sin(a)*L*.7,qx=X+Math.cos(a)*L*.45,qy=Y-L*.5;
  for(let k=1;k<14;k++){const t=k/14,u=1-t,px=u*u*X+2*u*t*qx+t*t*tx,py=u*u*Y+2*u*t*qy+t*t*ty,rr=u*4.5*s+1,an=Math.atan2(2*u*(qy-Y)+2*t*(ty-qy),2*u*(qx-X)+2*t*(tx-qx));
    for(const g of[-1,1])ell(x,px+Math.cos(an+g*1.2)*rr*.7,py+Math.sin(an+g*1.2)*rr*.7,rr,rr*.32,mix(f[0],f[2],.2+t*.5+(R()-.5)*.2),.95,an+g*1.2)}}}
function rock(x,X,Y,r,moss){shadowAt(x,X-r*.3,Y+r*.1,r*1.4,.55);
  const g=x.createRadialGradient(X+r*.3,Y-r*.6,r*.1,X,Y-r*.2,r*1.1);g.addColorStop(0,'#aaa69a');g.addColorStop(.6,'#6a675e');g.addColorStop(1,'#302e28');x.fillStyle=g;
  x.beginPath();x.moveTo(X-r,Y);x.bezierCurveTo(X-r*1.05,Y-r*.7,X-r*.4,Y-r*1.05,X+r*.1,Y-r);x.bezierCurveTo(X+r*.8,Y-r*.95,X+r*1.05,Y-r*.4,X+r,Y);x.closePath();x.fill();
  if(moss)for(let i=0;i<r*3;i++)ell(x,X+(R()-.5)*r*1.3,Y-r*.65-R()*r*.35,1+R()*2,.8+R()*1.2,mix([50,80,24],[110,140,40],R()),.85,R()*3)}
function shrooms(x,X,Y,n){for(let i=0;i<n;i++){const px=X+(R()-.5)*18,py=Y+(R()-.5)*5,h=3+R()*5,r=2+R()*2.5;x.strokeStyle='#e8e0cc';x.lineWidth=1.2;x.beginPath();x.moveTo(px,py);x.lineTo(px,py-h);x.stroke();
  x.fillStyle=R()<.5?'#a8501c':'#c89a52';x.beginPath();x.ellipse(px,py-h,r,r*.6,0,Math.PI,0);x.fill();ell(x,px-r*.3,py-h-r*.3,r*.3,r*.15,[255,230,200],.6)}}
function leavesOnPath(x,n){for(let i=0,k=0;i<n*6&&k<n;i++){const X=R()*800,Y=S0.hz+40+R()*(495-S0.hz-40);if(!inP(X,Y))continue;k++;const t=(Y-S0.hz)/(500-S0.hz);ell(x,X,Y,1+t*2.4,.5+t*1.1,P2([[200,140,40],[170,90,30],[220,180,70],[120,80,30]]),.9,R()*3)}}
const P2=a=>a[R()*a.length|0];
function woodpile(x,X,Y){shadowAt(x,X+16,Y+2,50);const L=[];[[0,4],[1,3],[2,2],[3,1]].forEach(([row,n])=>{for(let i=0;i<n;i++)L.push([X+(i-(n-1)/2)*12.5+(R()-.5)*1.5,Y-6-row*10.5])});
  L.forEach(([cx,cy])=>wood(x,cx,cy-6,26,12,0));
  L.forEach(([cx,cy])=>{const g=x.createRadialGradient(cx-1,cy-1,0,cx,cy,6.5);g.addColorStop(0,'#d8b07a');g.addColorStop(.72,'#9a7044');g.addColorStop(.88,'#4a3018');g.addColorStop(1,'#1e1208');x.fillStyle=g;x.beginPath();x.arc(cx,cy,6.3,0,7);x.fill();
    x.strokeStyle='rgba(110,70,30,.6)';x.lineWidth=.5;x.beginPath();x.arc(cx,cy,3.4,0,7);x.stroke()});
  x.save();x.translate(X+30,Y-4);x.rotate(-.5);wood(x,0,-2,4,26,1);x.restore();x.fillStyle='#7a7470';x.beginPath();x.moveTo(X+28,Y-27);x.lineTo(X+40,Y-31);x.lineTo(X+38,Y-22);x.fill()}
function bucket(x,X,Y){shadowAt(x,X,Y+1,18);const p=new Path2D(`M${X-9},${Y}L${X-11},${Y-20}H${X+11}L${X+9},${Y}Z`);x.save();x.clip(p);wood(x,X-12,Y-22,24,24,1);x.restore();
  x.fillStyle='#24201c';x.fillRect(X-10.6,Y-16,21.2,2);x.fillRect(X-9.6,Y-5,19.2,2);ell(x,X,Y-20,11,3,[44,30,16]);ell(x,X,Y-19.6,9,2.2,[14,10,6]);
  x.strokeStyle='#3a3530';x.lineWidth=1;x.beginPath();x.ellipse(X,Y-20,11,12,0,Math.PI,0);x.stroke()}
function bone(x,X,Y,a,l){const c=Math.cos(a)*l/2,d=Math.sin(a)*l/2;x.strokeStyle='#d6cdb8';x.lineWidth=2.2;x.lineCap='round';x.beginPath();x.moveTo(X-c,Y-d);x.lineTo(X+c,Y+d);x.stroke();
  for(const k of[-1,1]){ell(x,X+k*c+Math.sin(a)*1.4,Y+k*d-Math.cos(a)*1.4,1.9,1.9,[226,218,198]);ell(x,X+k*c-Math.sin(a)*1.4,Y+k*d+Math.cos(a)*1.4,1.9,1.9,[190,180,160])}}
function skull(x,X,Y,s){shadowAt(x,X,Y+5*s,9*s);const g=x.createRadialGradient(X+1.5*s,Y-2*s,0,X,Y,7*s);g.addColorStop(0,'#f0e8d4');g.addColorStop(1,'#8a8068');x.fillStyle=g;x.beginPath();x.ellipse(X,Y,5.5*s,6*s,0,0,7);x.fill();x.fillRect(X-3.5*s,Y+3*s,7*s,4*s);
  ell(x,X-2.2*s,Y,1.6*s,1.9*s,[20,14,10]);ell(x,X+2.2*s,Y,1.6*s,1.9*s,[20,14,10]);ell(x,X,Y+3*s,.8*s,1*s,[40,30,20])}
function fallenSign(x,X,Y){shadowAt(x,X+20,Y+3,34);x.save();x.translate(X,Y);x.rotate(.18);wood(x,0,-11,52,12,0);x.strokeStyle='rgba(15,8,2,.8)';x.lineWidth=.8;x.strokeRect(0,-11,52,12);
  x.fillStyle='rgba(200,60,40,.85)';x.font='bold 5.6px Georgia';x.fillText('BETRETEN',5,-6.5);x.fillText('VERBOTEN',5,-1.2);x.restore();x.save();x.translate(X+50,Y+6);x.rotate(-1.2);wood(x,0,-2.5,22,5,0);x.restore()}
function cauldron(x,X,Y){shadowAt(x,X,Y+2,30);x.save();x.globalCompositeOperation='lighter';dab(x,X,Y,40,[255,120,30],.25);x.restore();
  x.strokeStyle='#2a1c10';x.lineWidth=2;x.beginPath();x.moveTo(X-20,Y+2);x.lineTo(X,Y-40);x.lineTo(X+20,Y+2);x.moveTo(X,Y-40);x.lineTo(X+4,Y+4);x.stroke();
  for(let i=0;i<10;i++){const fx=X+(R()-.5)*14;dab(x,fx,Y-2-R()*6,4+R()*4,R()<.5?[255,140,30]:[255,210,90],.8)}
  const g=x.createRadialGradient(X-4,Y-20,1,X,Y-14,15);g.addColorStop(0,'#4a4844');g.addColorStop(1,'#0c0c0c');x.fillStyle=g;x.beginPath();x.ellipse(X,Y-14,13,10,0,0,7);x.fill();
  ell(x,X,Y-23,12,3,[30,30,28]);ell(x,X,Y-22.6,10,2,[70,110,40]);x.strokeStyle='#1a1a1a';x.lineWidth=1;x.beginPath();x.moveTo(X-11,Y-23);x.lineTo(X,Y-40);x.lineTo(X+11,Y-23);x.stroke();
  for(let i=0;i<8;i++)dab(x,X+(R()-.5)*6+i,Y-30-i*6,4+i,[170,190,150],.12)}
function wattle(x,X0,X1,Y){for(let X=X0;X<=X1;X+=11){const lean=(R()-.5)*6;x.strokeStyle='#3a2a18';x.lineWidth=2.4;x.beginPath();x.moveTo(X,Y);x.lineTo(X+lean,Y-34-R()*6);x.stroke()}
  for(let r=0;r<4;r++){x.strokeStyle=r%2?'#5a4428':'#4a3620';x.lineWidth=2.2;x.beginPath();for(let X=X0;X<=X1;X+=11)x.lineTo(X+(r%2?0:2),Y-8-r*6+((X/11|0)%2?1.5:-1.5)+(X-X0)*.04);x.stroke()}}
function puddle(x,X,Y,rx){const g=x.createLinearGradient(0,Y-rx*.3,0,Y+rx*.3);g.addColorStop(0,'rgba(30,24,34,.92)');g.addColorStop(.5,'rgba(120,80,84,.55)');g.addColorStop(1,'rgba(24,20,24,.92)');
  ell(x,X,Y,rx+3,rx*.3+1.5,[50,38,24],.8);x.fillStyle=g;x.beginPath();x.ellipse(X,Y,rx,rx*.28,0,0,7);x.fill();ell(x,X-rx*.3,Y-rx*.05,rx*.4,rx*.05,[255,200,160],.18)}
function dirt(x,n){for(let i=0;i<n;i++){const X=R()*800,Y=S0.hz+60+R()*(490-S0.hz-60),t=(Y-S0.hz)/(500-S0.hz);dab(x,X,Y,(8+R()*16)*t+4,[50,38,26],.45)}}
function hutDecoBack(x){dirt(x,40);bush(x,362,414,34,0);bush(x,616,408,36,0);bush(x,236,420,30,0);wattle(x,598,700,416);grass(x,500,380,430,1.3)}
function hutDecoFront(x){puddle(x,524,466,22);puddle(x,610,486,26);puddle(x,456,489,14);woodpile(x,628,442);bucket(x,588,450);
  bone(x,262,452,.4,12);bone(x,278,456,-.6,10);skull(x,332,458,1.1);bone(x,520,484,1.2,11);fallenSign(x,128,452);cauldron(x,250,482);
  bush(x,392,448,20,0);bush(x,688,458,26,0);fern(x,170,470,1.6);grass(x,300,430,470,1.6)}
function gabelDeco(x){bush(x,240,318,34,0);bush(x,478,290,24,0);bush(x,646,322,30,0);bush(x,60,420,30,0);rock(x,524,428,18,1);rock(x,96,398,14,1);rock(x,668,474,22,1);rock(x,326,368,11,1);
  fern(x,322,432,1.8);fern(x,570,448,1.9);fern(x,118,452,1.8);fern(x,700,414,1.6);shrooms(x,118,302,6);shrooms(x,716,300,5);shrooms(x,384,472,4);leavesOnPath(x,160)}
function hutDetails(x){
  x.strokeStyle='rgba(235,235,235,.45)';x.lineWidth=.35;for(let a=0;a<6;a++){x.beginPath();x.moveTo(397,233);x.lineTo(397+Math.cos(a*.3)*16,233+Math.sin(a*.3)*16);x.stroke()}
  for(let r=4;r<16;r+=3){x.beginPath();x.arc(397,233,r,0,1.5);x.stroke()}
  [[410,233],[540,232],[552,233]].forEach(([X,Y])=>{x.strokeStyle='#2a2018';x.lineWidth=.6;x.beginPath();x.moveTo(X,Y);x.lineTo(X,Y+5);x.stroke();
    for(let i=0;i<9;i++){x.strokeStyle=rgba(mix([70,80,30],[150,130,60],R()),.95);x.lineWidth=.9;x.beginPath();x.moveTo(X,Y+5);x.lineTo(X+(i-4)*.9,Y+15+R()*3);x.stroke()}x.fillStyle='#5a2a14';x.fillRect(X-1.6,Y+5,3.2,1.6)});
  [[500,233,9],[520,233,13]].forEach(([X,Y,l])=>{x.strokeStyle='#2a2018';x.lineWidth=.5;x.beginPath();x.moveTo(X,Y);x.lineTo(X,Y+l);x.stroke();x.strokeStyle='#b89a6a';x.lineWidth=1.2;x.beginPath();x.arc(X,Y+l+3,3,0,7);x.moveTo(X-3,Y+l+3);x.lineTo(X+3,Y+l+3);x.moveTo(X,Y+l);x.lineTo(X,Y+l+6);x.stroke()});
  x.strokeStyle='#2a2018';x.lineWidth=.6;x.beginPath();x.moveTo(447,234);x.lineTo(447,246);x.stroke();x.fillStyle='#24180c';x.fillRect(443.5,246,7,9);
  const lg=x.createRadialGradient(447,250.5,0,447,250.5,4);lg.addColorStop(0,'#fff0a0');lg.addColorStop(1,'#e07010');x.fillStyle=lg;x.fillRect(444.6,247.2,4.8,6.6);
  x.save();x.globalCompositeOperation='lighter';dab(x,447,251,18,[255,160,50],.3);x.restore();
  for(let i=0;i<22;i++)dab(x,539+i*2.2+(R()-.5)*8,154-i*6.5,5+i*1.3,[160,150,160],.16)}
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
function paintSperre(){const o=S0;sky(o);far(o);ground(o);
  let x=lay();bgRow(x,30,206,250,12,22,0);[[300,236,4,1,110],[540,234,5,-1,104],[250,250,6,0,96],[620,246,5,1,100],[420,226,3,0,120]].forEach(b=>birch(x,...b));
  [[300,110,14],[540,104,14],[250,96,16],[620,100,14],[420,120,10]].forEach(([a,b,r])=>foliage(x,a,b,r));put(x,.6);
  const MB=[[40,340,24,-3],[110,300,14,2],[180,270,10,-1],[660,262,9,1],[712,296,16,3],[772,330,12,-2]];shadows(MB,.42);
  x=lay();grass(x,8000,o.hz,500,1);details(x);leavesOnPath(x,90);put(x);
  x=lay();MB.forEach(b=>birch(x,...b));MB.forEach(([X,,w,L])=>{for(let i=0;i<3;i++)foliage(x,X+L*.8+(R()-.5)*60,10+R()*160,22+R()*18)});
  for(let X=-10;X<820;X+=32){if(X>330&&X<520)continue;foliage(x,X,R()*44-6,30+R()*14)}
  bush(x,250,300,26,0);bush(x,640,296,26,0);sign(x,520,330,1.2,[[1,0,'Zum Sumpf','hSumpf2']]);
  if(!FL.cut){[[255,356,1.8,320,17],[650,340,-1.34,320,16],[292,322,1.36,280,12],[618,374,-1.84,300,15],[372,318,1.66,190,10],[470,392,-1.15,150,11]].forEach(a=>fallen(x,...a));
    [[330,338,-1.3],[450,330,-1.6],[560,350,-1.1],[500,322,-1.9],[420,372,-1.4]].forEach(([a,b,ang])=>{x.strokeStyle='#4a4236';x.lineWidth=1.6;x.beginPath();x.moveTo(a,b);x.lineTo(a+Math.cos(ang)*16,b+Math.sin(ang)*14);x.stroke();foliage(x,a+Math.cos(ang)*16,b+Math.sin(ang)*14,9)})}
  else{[[255,352],[650,344]].forEach(([X,Y])=>{dab(x,X,Y+2,18,[40,30,18],.85);for(let i=0;i<14;i++){const a=R()*6.28,l=5+R()*10;x.strokeStyle='rgba(60,42,22,.9)';x.lineWidth=1.5;x.beginPath();x.moveTo(X,Y);x.lineTo(X+Math.cos(a)*l,Y+Math.sin(a)*l*.8);x.stroke()}});
    for(let i=0;i<5;i++)logPiece(x,168+(i%2)*6,394-i*10,52,14);for(let i=0;i<4;i++)logPiece(x,636+(i%2)*5,392-i*10,48,13);
    for(let i=0;i<70;i++)ell(x,380+R()*130,356+R()*36,1+R()*1.6,.6+R(),[228,204,152],.85)}
  rock(x,560,432,14,1);fern(x,300,442,1.6);fern(x,604,452,1.7);shrooms(x,112,302,5);sign(x,150,474,1.7,[[-1,0,'Zur Weggabelung','hZG3']]);put(x);
  x=lay();birch(x,780,520,44,-5);for(let i=0;i<500;i++){const X=R()<.5?R()*230-20:600+R()*220;dab(x,X,440+R()*70,6+R()*8,mix([10,30,8],[40,84,24],R()),.6)}
  grass(x,700,470,515,2.4,1);foliage(x,-10,22,58,1);foliage(x,812,12,62,1);put(x,1.1);
  rays(o,[[.1,.08],[.4,.1]]);grade(o)}
// ================= Schauplätze =================
const BASE={seed:3,cov:.52,cs:[156,160,175],cl:[258,262,268],sunc:[255,252,228],sunr:60,band:[250,620],bc:[[88,134,112],[140,176,160]],lit:[[84,140,48],[150,190,72]],dark:[[20,50,26],[46,84,40]],haze:[196,218,228],trunks:1,
  g:[[44,92,20],[116,168,40],[176,190,72]],sand:[[146,114,68],[226,200,146]],gh:[176,204,178],dapple:.2,b0:[[36,80,18],[70,118,28]],b1:[[120,172,46],[214,222,112]],d0:[[12,34,10],[26,60,16]],d1:[[36,80,22],[70,120,36]],
  fol:[[20,50,16],[68,118,30],[198,222,98]],fl:[[70,120,230],[110,160,245],[245,226,60],[250,250,245],[230,150,210]],nfl:320,rayc:[255,246,210],raya:.35,gr:['rgba(255,220,150,.45)','rgba(40,70,120,.3)'],vig:.42};
const SCN={
 wald:{...BASE,hz:258,sun:[560,42],top:[16,74,206],hor:[180,216,242],masses:[[-30,310],[540,830]],hutSil:1,pe:pWald,gtop:X=>259+Math.pow(Math.abs(X-430)/430,1.6)*22,
   k:1.05/218,x0:70,x1:740,ymin:x=>395-57*Math.max(0,1-Math.abs(x-468)/45),ymax:492,paint:paintWald},
 gabel:{...BASE,seed:11,hz:200,sun:[250,70],nfl:170,sunr:70,top:[38,92,196],hor:[238,214,170],sunc:[255,236,190],cl:[262,246,226],cs:[170,150,150],masses:[[-30,330],[520,830],[290,560,95,70]],spruce:1,band:[300,520],
   lit:[[96,130,44],[170,180,70]],haze:[220,210,190],gh:[200,196,160],fol:[[24,48,14],[86,116,30],[216,206,96]],rayc:[255,226,170],raya:.4,gr:['rgba(255,200,120,.5)','rgba(60,60,110,.3)'],
   pe:segPath([[400,512,180,415,440,100],[415,440,100,430,365,40],[430,365,40,300,300,20],[300,300,20,170,250,9],[170,250,9,60,222,3],[430,365,40,570,300,20],[570,300,20,700,250,9],[700,250,9,790,224,3]]),
   gtop:X=>201+Math.pow(Math.abs(X-440)/440,1.6)*14,k:1.05/286,x0:60,x1:760,ymin:()=>340,ymax:494,paint:paintGabel,
   intro:[['P','Der Weg teilt sich. Natürlich. Im Märchen teilt sich der Weg immer.'],['P','Und da ist ein Schild. Wenigstens ist hier jemand ordentlich.']]},
 huette:{...BASE,seed:23,hz:200,fol:[[24,32,16],[64,76,36],[134,130,78]],sun:[150,192],nfl:40,sunr:50,top:[34,26,62],hor:[236,138,84],sunc:[255,170,90],cs:[56,40,70],cl:[214,128,108],cov:.48,masses:[[-30,330],[600,830],[300,620,90,80]],trunks:0,dead:1,band:[300,620],
   bc:[[70,62,92],[104,92,118]],lit:[[60,58,72],[90,84,100]],dark:[[22,18,32],[38,32,50]],haze:[150,118,140],g:[[30,40,20],[62,74,32],[104,104,60]],sand:[[80,62,42],[144,118,84]],gh:[120,100,120],dapple:.05,
   b0:[[24,32,14],[44,56,22]],b1:[[84,94,48],[132,130,76]],d0:[[8,10,6],[18,22,12]],d1:[[30,36,20],[50,56,30]],fl:[[160,150,190],[200,190,170]],nfl:60,rayc:[255,170,110],raya:.2,gr:['rgba(255,150,80,.4)','rgba(60,30,110,.45)'],vig:.6,
   pe:segPath([[650,512,130,580,460,70],[580,460,70,500,428,26]]),gtop:X=>201+Math.pow(Math.abs(X-400)/400,1.5)*10,k:.7/246,x0:130,x1:740,ymin:()=>432,ymax:494,paint:paintHuette,
   intro:[['P','Da ist sie. Eine Hütte auf Hühnerbeinen.'],['P','Wowa, wenn ich hier rauskomme, bring ich dich um.'],['J','Wer schleicht da um mein Haus? Ich rieche Stadtluft!']]},
 sumpf:{...BASE,seed:31,hz:200,sun:[620,150],sunr:60,top:[52,64,70],hor:[190,196,160],sunc:[230,236,200],cs:[90,96,96],cl:[205,210,195],cov:.45,masses:[[-30,330],[520,830],[290,560,95,70]],trunks:0,dead:1,spruce:1,band:[300,520],bc:[[90,110,100],[120,140,124]],lit:[[60,90,50],[100,120,70]],dark:[[16,30,22],[30,46,34]],haze:[170,190,170],
   g:[[30,46,22],[64,86,34],[110,120,64]],sand:[[70,58,38],[120,104,70]],gh:[150,170,150],dapple:.08,b0:[[24,40,14],[46,66,22]],b1:[[96,118,50],[150,160,86]],fol:[[22,36,16],[56,80,30],[130,150,70]],fl:[[230,230,240],[200,220,150]],nfl:60,rayc:[220,240,200],raya:.2,gr:['rgba(200,230,180,.35)','rgba(30,60,60,.4)'],vig:.55,
   pe:segPath([[560,512,120,520,450,55],[520,450,55,470,404,26]]),gtop:X=>201+Math.pow(Math.abs(X-400)/400,1.5)*10,k:1/270,x0:60,x1:740,ymin:()=>404,ymax:494,paint:paintSumpf,
   intro:[['P','Ein Sumpf. Es stinkt nach Moder und... Parfüm?'],['P','Da sitzen nackte Frauen im Wasser. Ganz ruhig, Petja. Nicht hinstarren.'],['P','...Manche davon sind über hundert. Okay, jetzt starr ich aus anderen Gründen.']]},
 sperre:{...BASE,seed:41,hz:200,sun:[600,80],sunr:60,top:[70,96,140],hor:[214,210,186],sunc:[250,240,210],cl:[240,240,236],cs:[150,150,160],cov:.5,masses:[[-30,330],[520,830],[290,560,95,70]],spruce:1,band:[300,520],
   lit:[[80,120,44],[150,170,70]],haze:[200,206,200],gh:[180,190,170],fol:[[22,46,16],[70,104,30],[190,200,90]],nfl:120,raya:.25,gr:['rgba(240,220,170,.35)','rgba(40,60,90,.35)'],vig:.5,
   pe:segPath([[400,512,170,420,420,70],[420,420,70,440,330,24],[440,330,24,452,250,6]]),gtop:X=>201+Math.pow(Math.abs(X-440)/440,1.6)*14,k:1.05/286,x0:60,x1:760,ymin:()=>FL.cut?340:398,ymax:494,paint:paintSperre,
   intro:[['P','Na toll. Alles voller Birken. Als hätte sie jemand absichtlich hier hingeworfen.'],['P','Ohne Säge komm ich da nicht durch.']]}
};
function paintWald(){const o=S0;sky(o);far(o);ground(o);
  let x=lay();[[300,286,5,1,150],[322,280,4,-1,170],[540,282,4,1,165],[562,288,6,-2,140],[280,292,6,0,120],[600,294,7,1,110]].forEach(b=>birch(x,...b));
  [[300,150,16],[322,170,13],[540,165,13],[562,140,16],[280,120,20],[600,110,22]].forEach(([a,b,r])=>foliage(x,a,b,r));put(x,.6);
  const MB=[[60,330,22,-3],[128,318,12,2],[185,322,16,-2],[250,305,9,1],[578,306,9,2],[650,322,20,-4],[722,332,15,3],[772,316,10,-1]];shadows(MB);
  x=lay();grass(x,9000,o.hz,500,1);details(x);put(x);
  x=lay();const eb=birchPath(650,322,20,-4);$('#ebhit').setAttribute('d',eb);
  MB.forEach(b=>b[0]==650?birch(x,650,322,20,-4,-12,eb):birch(x,...b));
  x.fillStyle='rgba(18,14,8,.92)';x.beginPath();x.ellipse(643,231,5.5,2.4,.05,0,7);x.ellipse(656.5,230,5,2.2,-.1,0,7);x.fill();
  x.strokeStyle='rgba(18,14,8,.85)';x.lineWidth=1.8;x.beginPath();x.moveTo(642,246);x.quadraticCurveTo(649,250,656,245);x.stroke();
  x.lineCap='round';x.strokeStyle='#3e3428';x.lineWidth=4.5;x.beginPath();x.moveTo(652,206);x.quadraticCurveTo(690,193,732,190);x.moveTo(700,197);x.lineTo(713,185);x.moveTo(722,191);x.lineTo(740,180);x.stroke();
  MB.forEach(([X,,w,L])=>{for(let i=0;i<3;i++)foliage(x,X+L*.8+(R()-.5)*60,10+R()*150,22+R()*18)});
  for(let X=-10;X<820;X+=32){if(X>290&&X<560)continue;foliage(x,X,R()*40-6,30+R()*14)}put(x);
  x=lay();sign(x,300,415,1.3,[[1,0,'Zum Pfad','hPfad']]);mushroom(x,212,460);stump(x,612,452);grass(x,160,440,470,1);put(x);
  x=lay();birch(x,22,520,48,5);for(let i=0;i<500;i++){const X=R()<.5?R()*230-20:600+R()*220;dab(x,X,440+R()*70,6+R()*8,mix([10,30,8],[40,84,24],R()),.6)}
  grass(x,700,470,515,2.4,1);foliage(x,-10,22,58,1);foliage(x,812,12,62,1);put(x,1.1);
  rays(o,[[-.5,.12],[-.15,.07],[.25,.1],[.55,.06]]);grade(o)}
function paintGabel(){const o=S0;sky(o);far(o);ground(o);
  let x=lay();bgRow(x,30,206,236,10,18,0);const FB=[[300,222,4,1,110],[520,224,5,-1,105],[372,214,3,0,125],[590,220,4,1,112],[340,230,5,0,100],[470,212,3,1,130],[410,226,4,-1,112],[560,232,5,1,104],[250,234,6,0,96],[640,230,5,-1,100],[200,240,6,1,92],[690,238,6,0,94]];FB.forEach(b=>birch(x,...b));FB.slice(4).forEach(([a,,,,t])=>foliage(x,a,t,12+R()*5));bgRow(x,24,232,262,12,22,0);
  [[300,110,14],[520,105,14],[372,125,10],[590,112,13]].forEach(([a,b,r])=>foliage(x,a,b,r));put(x,.6);
  const MB=[[45,330,24,-3],[115,300,14,2],[190,262,10,-1],[262,236,6,1],[640,244,8,1],[712,296,18,3],[778,320,12,-2]];shadows(MB,.42);
  x=lay();grass(x,9000,o.hz,500,1);details(x);put(x);
  x=lay();MB.forEach(b=>birch(x,...b));MB.forEach(([X,,w,L])=>{for(let i=0;i<3;i++)foliage(x,X+L*.8+(R()-.5)*60,10+R()*160,22+R()*18)});
  for(let X=-10;X<820;X+=32){if(X>330&&X<520)continue;foliage(x,X,R()*44-6,30+R()*14)}
  gabelDeco(x);fallenBirch(x);sign(x,432,338,1.3,[[-1,0,'Zu Baba Jaga','hBaba'],[1,14,'Zum Sumpf','hUnbek']]);sign(x,170,472,1.8,[[-1,0,'Zum Birkenwald','hZW']]);grass(x,240,270,345,1);put(x);
  x=lay();birch(x,780,520,44,-5);for(let i=0;i<500;i++){const X=R()<.5?R()*230-20:600+R()*220;dab(x,X,440+R()*70,6+R()*8,mix([10,30,8],[40,84,24],R()),.6)}
  grass(x,700,470,515,2.4,1);foliage(x,-10,22,58,1);foliage(x,812,12,62,1);put(x,1.1);
  rays(o,[[.1,.08],[.4,.1],[.75,.06],[1.0,.05]]);grade(o)}
function paintHuette(){const o=S0;sky(o);far(o);ground(o);
  let x=lay();for(let i=0;i<20;i++){const X=R()*800,Y=o.hz+6+R()*50;if(R()<.35){const sh=50+R()*50;for(let k=0;k<sh;k+=3)ell(x,X,Y-sh+k,(k/sh)*16+1,2.4,[26,22,34],.9)}else deadTree(x,X,Y,90+R()*90,2.5+R()*2.5,'rgba(36,30,46,.92)')}bgRow(x,34,212,262,12,22,1);put(x,.8);
  x=lay();for(let i=0;i<40;i++)dab(x,R()*800,o.hz+10+R()*40,30+R()*40,[200,170,200],.25);put(x,6,'screen',.5);
  x=lay();grass(x,6000,o.hz,500,1);details(x);hutDecoBack(x);x.save();x.translate(300,425);x.scale(1.25,1.25);x.translate(-300,-398);fence(x);x.restore();x.save();x.translate(478,420);x.scale(1.25,1.25);x.translate(-478,-398);hut(x);x.restore();hutDecoFront(x);
  deadTree(x,150,405,280,9,'#1e1814');deadTree(x,705,412,320,11,'#1e1814');sign(x,700,470,1.6,[[1,0,'Zur Weggabelung','hZG']]);put(x);
  x=lay();deadTree(x,20,520,420,18,'#0e0a08');for(let i=0;i<400;i++){const X=R()<.5?R()*230-20:600+R()*220;dab(x,X,450+R()*60,6+R()*8,mix([6,8,6],[24,28,16],R()),.6)}grass(x,600,470,515,2.4,1);put(x,1.1);
  x=lay();for(let i=0;i<30;i++)dab(x,R()*800,400+R()*80,30+R()*40,[190,170,200],.18);put(x,8,'screen',.6);
  rays(o,[[1.2,.1],[1.45,.06]]);grade(o);
  const g=$('#skulleyes');g.innerHTML='';SKULLS.forEach(([X,Y])=>[-2.2,2.2].forEach(d=>{const e=document.createElementNS(NS,'circle');e.setAttribute('cx',X+d);e.setAttribute('cy',Y);e.setAttribute('r',1.2);e.setAttribute('fill','#ffb030');g.appendChild(e)}))}

// ================= Figuren (raue Pixel-Sprites) =================
const INK='#2a1a0e';
const PET=(open,step)=>`<g stroke="${INK}" stroke-width="1.1" stroke-linejoin="round" stroke-linecap="round"><g transform="scale(1.22,1)"><g transform="scale(${step?.7:1},1)">
<path d="M-27,0C-30,-3 -28,-8 -22,-9L-10,-10C-7,-7 -6,-3 -7,0Z" fill="#f4f2ec"/><path d="M-27,0C-28,-1.5 -28,-3 -27,-3.5L-7,-3C-6.8,-2 -6.9,-1 -7,0Z" fill="#b4b0a8"/>
<path d="M5,0C4,-4 7,-9 11,-10L22,-9C28,-7 30,-3 28,0Z" fill="#e4e2dc"/><path d="M5,0L5.4,-3.2L28.8,-3C29,-1.6 28.6,-.6 28,0Z" fill="#a4a098"/>
<path d="M-17,-122C-6,-124 6,-124 17,-122L18,-66C20,-40 24,-20 27,-8C20,-6 12,-6 5,-7C5,-28 3,-50 1,-70L0,-102L-2,-70C-4,-50 -5,-28 -6,-7C-12,-6 -20,-6 -27,-8C-24,-20 -20,-40 -18,-66Z" fill="#c8cede"/>
<path d="M8,-122L17,-122L18,-66C20,-40 24,-20 27,-8C24,-7 21,-6.6 18,-6.5C17,-24 14,-46 12,-66C11,-90 10,-108 8,-122ZM-2,-70L0,-102L-3,-98C-5,-80 -7,-60 -9,-40C-11,-26 -12,-14 -13,-6.6L-6,-7C-5,-28 -4,-50 -2,-70Z" fill="#9aa2bc" stroke="none"/>
<path d="M-15,-76C-12,-73 -8,-73 -6,-75M6,-78C9,-75 13,-75 15,-77M-19,-34C-17,-30 -13,-31 -11,-33M9,-36C11,-32 15,-33 18,-35M-25,-13C-20,-11 -15,-12 -11,-14M9,-14C14,-12 19,-12 25,-13M-1,-104L0,-118" fill="none" stroke="#7a82a0" stroke-width=".8"/>
</g>
<path d="M-4,-212L-5,-198C-2,-196 3,-196 5,-198L4,-212Z" fill="#ecb890"/><path d="M-4.4,-206C-1,-203 2,-203 4.5,-206L4,-212L-4,-212Z" fill="#c8906a" stroke="none"/>
<path d="M-23,-196C-31,-192 -34,-178 -34,-160L-24,-158C-24,-170 -23,-180 -21,-186Z" fill="#26aaa2"/>
<path d="M-33,-160C-35,-140 -34,-122 -32,-108L-26,-108C-25,-124 -25,-142 -24,-158Z" fill="#ecb890"/><path d="M-29,-158C-29,-140 -28,-124 -27,-108L-26,-108C-25,-124 -25,-142 -24,-158Z" fill="#cc946c" stroke="none"/>
<path d="M-35,-163C-31,-161 -27,-160 -23.5,-161L-23.6,-156C-27,-155 -31,-156 -34.5,-158Z" fill="#52cec6"/>
<path d="M-33,-109C-36,-102 -35,-95 -31,-92C-28,-91 -26,-94 -26,-98L-26,-108Z" fill="#ecb890"/><path d="M-32,-102C-32,-99 -31,-96 -30,-94M-29,-102C-29,-99 -28.5,-97 -28,-95" fill="none" stroke="#a86e48" stroke-width=".7"/>
<path d="M-23,-196C-27,-176 -28,-150 -26,-118C-14,-114 12,-114 26,-118C27,-150 26,-176 23,-196C14,-201 6,-201 0,-200C-8,-201 -16,-200 -23,-196Z" fill="#26aaa2"/>
<path d="M10,-200C17,-199 21,-198 23,-196C26,-176 27,-150 26,-118C22,-117 18,-116 14,-116C17,-128 15,-140 17,-152C19,-166 15,-178 13,-188C12,-193 11,-197 10,-200Z" fill="#16807a" stroke="none"/>
<path d="M-6,-200L0,-183L6,-200Z" fill="#ecb890" stroke-width=".9"/><path d="M-3,-199L0,-189L3,-199Z" fill="#c8906a" stroke="none"/>
<path d="M-8,-201L-1,-185L-12,-191C-11,-195 -10,-198 -8,-201ZM8,-201L1,-185L12,-191C11,-195 10,-198 8,-201Z" fill="#40c0b8" stroke-width=".9"/>
<path d="M0,-184C0,-160 -.5,-136 0,-115" fill="none" stroke-width=".8"/>
<path d="M-16,-182C-12,-176 -11,-168 -13,-160M-21,-150C-15,-147 -9,-146 -4,-148M-18,-124C-12,-127 -7,-127 -3,-124M7,-170C10,-162 10,-152 8,-144M4,-130C8,-128 10,-124 11,-119" fill="none" stroke="#147470" stroke-width=".8"/>
<path d="M23,-196C31,-192 34,-178 34,-160L24,-158C24,-170 23,-180 21,-186Z" fill="#16807a"/>
<path d="M33,-160C35,-140 34,-122 32,-108L26,-108C25,-124 25,-142 24,-158Z" fill="#cc946c"/>
<path d="M35,-163C31,-161 27,-160 23.5,-161L23.6,-156C27,-155 31,-156 34.5,-158Z" fill="#26aaa2"/>
<path d="M33,-109C36,-102 35,-95 31,-92C28,-91 26,-94 26,-98L26,-108Z" fill="#cc946c"/><path d="M31,-102C31,-99 30.5,-97 30,-95" fill="none" stroke="#8e5a38" stroke-width=".7"/>
</g><g transform="translate(0,-212) scale(1.08) translate(0,212)">
<path d="M-10,-226C-13,-227 -14,-223 -13,-220C-12,-217 -10,-217 -9.6,-218M10,-226C13,-227 14,-223 13,-220C12,-217 10,-217 9.6,-218" fill="#ecb890" stroke-width=".9"/>
<path d="M-10,-236C-12,-229 -12,-222 -10,-216C-8,-211 -4,-207 1,-207C6,-207 9,-211 10,-216C12,-223 12,-230 10,-236C4,-241 -4,-241 -10,-236Z" fill="#ecb890"/>
<path d="M5,-238C11,-234 11,-226 10,-218C9,-212 6,-208 2,-207C7,-212 8,-220 7,-228C7,-232 6,-235 5,-238Z" fill="#cc946c" stroke="none"/>
<path d="M-9,-219C-7,-216 -6,-214 -6,-212M8.6,-219C7,-216 6.4,-214 6.2,-212" fill="none" stroke="#c08860" stroke-width=".7"/>
<path d="M-7.5,-226C-6,-227.6 -3.5,-227.6 -2,-226.2C-3.5,-225.2 -6,-225.2 -7.5,-226ZM2.2,-226.2C3.7,-227.6 6.2,-227.6 7.6,-226C6.2,-225.2 3.7,-225.2 2.2,-226.2Z" fill="#fbf6ee" stroke-width=".5"/>
<circle cx="-4.6" cy="-226.3" r="1.15" fill="#3a2410" stroke="none"/><circle cx="4.8" cy="-226.3" r="1.15" fill="#3a2410" stroke="none"/>
<path d="M-8,-226.3C-6,-228.4 -3.5,-228.4 -1.6,-226.4M1.8,-226.4C3.7,-228.4 6.2,-228.4 8,-226.3" fill="none" stroke-width="1"/>
<path d="M-7,-224.6C-5.4,-223.9 -3.8,-223.9 -2.4,-224.5M2.6,-224.5C4,-223.9 5.6,-223.9 7.2,-224.6" fill="none" stroke="#b47a54" stroke-width=".55"/>
<path d="M-8.5,-230C-6,-231.4 -3.5,-231.3 -1.5,-230.3M2,-230.4C4,-231.4 6.5,-231.4 8.5,-230" fill="none" stroke="#5a3418" stroke-width="1.1"/>
<path d="M-.5,-226C-.8,-222 -1.8,-219.4 -2.8,-217.6C-1.6,-216.5 0,-216.3 1.6,-216.9" fill="none" stroke-width=".9"/>
<path d="M.4,-225C.8,-222 1.6,-219.6 2.2,-218" fill="none" stroke="#c08860" stroke-width=".7"/>
${open?'<path d="M-3.6,-212.6C-1,-212 1.6,-212 3.8,-212.8C3,-210.4 1.2,-209.4 0,-209.4C-1.6,-209.4 -3,-210.6 -3.6,-212.6Z" fill="#6a2416" stroke-width=".8"/>':'<path d="M-3.5,-212.4C-1,-211.6 1.5,-211.7 3.8,-212.6" fill="none" stroke-width=".9"/>'}
<path d="M-1.6,-210.4C-.4,-210 .8,-210 1.8,-210.4" fill="none" stroke="#b47a54" stroke-width=".6"/>
<path d="M-12,-226C-14,-236 -10,-244 -2,-245C6,-246 13,-241 12,-230C11.6,-227 11,-225 10.5,-222C10,-229 8,-233 5,-234C2,-231 -3,-230.6 -6,-233C-8,-231 -10,-229 -11,-225Z" fill="#8a5a2a"/>
<path d="M4,-245C10,-243 13,-238 12,-230C11.6,-227 11,-225 10.5,-222C10,-229 8,-233 5,-234C8,-238 7,-242 4,-245Z" fill="#603c1a" stroke="none"/>
<path d="M-8,-240C-4,-243 1,-243 5,-241M-10,-234C-8,-238 -5,-240 -2,-240M-4,-237C-2,-235 0,-233 1,-231" fill="none" stroke="#b07c44" stroke-width=".7"/></g>
</g>`;
const CROW=`<g stroke="#0c0c10" stroke-width="1" stroke-linejoin="round">
<path d="M-26,10L-12,3C-20,-8 -12,-12 -5,-13C10,-16 15,-9 14,-5C13,6 6,8 0,8L-22,15Z" fill="#20242e"/><path d="M-14,2C-6,-6 2,-6 8,-4C4,4 -2,5 -8,6Z" fill="#3c4458" stroke="none"/>
<path d="M-16,4L-6,2M-18,8L-4,5" fill="none" stroke="#4c5468" stroke-width=".7"/>
<path d="M5,-8C3,-21 9,-22 13,-22C20,-22 21,-18 20,-15C19,-8 16,-6 13,-5Z" fill="#20242e"/><path d="M19,-18L30,-15.4L19,-12.4Z" fill="#4a4a50"/>
<circle cx="15" cy="-17" r="1.5" fill="#d8a030" stroke="none"/><path d="M-2,8v6M4,8v6" stroke="#55555c"/></g>`;
const ROUGH='<defs><filter id="r" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".35" numOctaves="2" seed="5"/><feDisplacementMap in="SourceGraphic" scale="1.3" xChannelSelector="R" yChannelSelector="G"/></filter></defs>';
function sprite(inner,[x,y,w,h],k){return new Promise(res=>{const cw=Math.round(w*k),ch=Math.round(h*k),im=new Image();
  im.onload=()=>{const o=document.createElement('canvas');o.width=cw;o.height=ch;const g=o.getContext('2d');g.drawImage(im,0,0,cw,ch);
    const id=g.getImageData(0,0,cw,ch),d=id.data;for(let i=0;i<d.length;i+=4){if(d[i+3]<100){d[i+3]=0;continue}d[i+3]=255;for(let j=0;j<3;j++)d[i+j]=d[i+j]&0xF8}
    g.putImageData(id,0,0);res(o.toDataURL())};
  im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${cw}" height="${ch}" viewBox="${x} ${y} ${w} ${h}">${ROUGH}<g filter="url(#r)">${inner}</g></svg>`)})}
const petimg=$('#petimg'),petG=$('#petja'),PB=[-48,-254,96,258],K=1.15;let frames=[],talking=false,ft=0;
const NB=[-30,-100,60,104];
Promise.all([sprite(PET(0,0),PB,K),sprite(PET(1,0),PB,K),sprite(PET(0,1),PB,K),sprite(CROW,[-30,-26,64,44],K)]).then(([a,b,st,cr])=>{frames=[a,b,st];petimg.setAttribute('href',a);$('#crowimg').setAttribute('href',cr)});
setInterval(()=>{if(!frames[2])return;ft=1-ft;petimg.setAttribute('href',frames[mv?(ft?2:0):talking?ft:0])},150);

// ================= Laufen & Szenenwechsel =================
const P={x:400,y:476,dir:1};let mv=null,cur=null,changing=false;const cache={},seen={wald:1};
function render(){const sc=S0.k*(P.y-S0.hz);petG.setAttribute('transform',`translate(${P.x.toFixed(1)},${P.y.toFixed(1)}) scale(${(sc*P.dir).toFixed(3)},${sc.toFixed(3)})`)}
function walkTo(tx,ty,cb){const o=S0;tx=Math.max(o.x0,Math.min(o.x1,tx));ty=Math.max(o.ymin(tx),Math.min(o.ymax,ty));mv={tx,ty,cb}}
let last=0;(function loop(t){const dt=Math.min(.05,(t-last)/1000||0);last=t;
  if(mv&&S0){const dx=mv.tx-P.x,dy=mv.ty-P.y,d=Math.hypot(dx,dy),sp=140*S0.k*(P.y-S0.hz)*dt+.3;
    if(d<=sp){P.x=mv.tx;P.y=mv.ty;const cb=mv.cb;mv=null;cb&&cb()}else{P.x+=dx/d*sp;P.y+=dy/d*sp;if(Math.abs(dx)>1)P.dir=dx<0?-1:1}render()}
  requestAnimationFrame(loop)})(0);
const fade=$('#fade');
function enter(id,pos){if(cur&&cur!==id)onLocationLeave(cur);changing=true;mv=null;fade.style.opacity=1;setTimeout(()=>{S0=SCN[id];
  if(cache[id])c.drawImage(cache[id],0,0);else{s=S0.seed;S0.paint();const k=document.createElement('canvas');k.width=W;k.height=H;k.getContext('2d').drawImage(cv,0,0);cache[id]=k}
  document.querySelectorAll('.room').forEach(r=>r.classList.toggle('on',r.id=='r-'+id));cur=id;if(id=='sumpf')applySwampNymphs();P.x=pos[0];P.y=pos[1];render();
  fade.style.opacity=0;changing=false;if(!seen[id]){seen[id]=1;S0.intro&&setTimeout(()=>say(S0.intro),450)}},420)}

// ================= Dialog =================
const N={P:['Petja','#ffb070'],K:['Krähe','#b0bcd8'],S:['Sonne','#ffe680'],M:['Fliegenpilz','#ff8a70'],B:['Birke','#c8e09a'],J:['Stimme aus der Hütte','#e0a0ff'],M1:['Mila','#a8e0b0'],W:['Wera','#c8b8f0'],D:['Dunja','#f0a070']};
const box=$('#box'),who=$('#who'),txt=$('#txt');
let queue=[],typing=null,full='',busy=false,done=null;
function say(lines,cb){queue=lines.slice();done=cb;busy=true;box.style.display='block';next()}
function next(){
  clearInterval(typing);typing=null;talking=false;
  if(!queue.length){box.style.display='none';busy=false;const d=done;done=null;d&&d();return}
  const [w,t]=queue.shift();who.textContent=N[w][0]+':';who.style.color=N[w][1];full=t;txt.textContent='';
  if(w==='P')talking=true;
  let i=0;typing=setInterval(()=>{txt.textContent=t.slice(0,++i);if(i>=t.length){clearInterval(typing);typing=null;talking=false}},28);
}
function advance(){if(typing){clearInterval(typing);typing=null;txt.textContent=full;talking=false}else next()}

// ================= Objekte =================
const inv=[];
const T={
  petja:{n:'Petja',l:[
    [['P','Ich bin Petja. Glaub ich. Meine Beine fühlen sich an wie kalte Pelmeni.']],
    [['P','Kneif mich mal einer!'],['P','...Keiner da. Typisch.']],
    [['P','Okay, Petja. Ruhig atmen. Das ist nur ein Trip. Ein sehr, sehr langer Trip.']]]},
  sonne:{n:'Sonne',l:[
    [['S','Guten Morgen, Petja. Es ist schon Mittag.'],['P','Die Sonne redet mit mir. Ganz ruhig bleiben.']],
    [['S','Wer in diesem Wald einschläft, wacht nicht so leicht wieder auf.'],['P','Danke. Sehr beruhigend.']]]},
  pilz:{n:'Fliegenpilz',at:[250,470],l:[
    [['M','Psst. Iss mich, und du siehst Farben, die es gar nicht gibt.'],['P','Ich seh die schon, Kumpel. Alle.']],
    [['P','Nein, Petja. Du hast heute schon genug probiert.']]]},
  birke:{n:'Alte Birke',at:[640,400],l:[
    [['P','Die Birke guckt mich an.'],['B','...'],['P','Sie guckt immer noch.']],
    [['B','Geh weg, du riechst nach Stadt.'],['P','Und du nach Brennholz.']]]},
  kraehe:{n:'Krähe',at:[680,400],l:[
    [['K','Krah! Noch einer, der nicht aufwacht!'],['P','Noch einer? Wie viele gibt es denn?'],['K','Frag die Baba Jaga. Ihre Hütte steht tiefer im Wald. Krah!']],
    [['P','Die mit dem Haus auf Hühnerbeinen?'],['K','Krah! Und sie macht nichts umsonst.']]]},
  stumpf:{n:'Baumstumpf',at:[565,470],l:[
    [['P','Ein Baumstumpf. Jemand hat hier mal Holz gemacht.'],['P','Oder die Birken haben ihn gefressen.']],
    [['P','Ich setz mich lieber nicht drauf. Wer weiß, ob der auch redet.']]]},
  kippe:{n:'Joint-Stummel',at:[565,470],l:[
    [['P','Da ist er. Der Rest von meinem Joint. Der Schuldige.'],['P','Den nehm ich mit. Als Beweismittel.']]],
    after(){$('#kippe').remove();inv.push('kippe');renderInv()}},
  sPfad:{n:'Schild: Zum Pfad',at:[330,425],go:'gabel',to:[320,488]},
  sBaba:{n:'Schild: Zu Baba Jaga',at:[404,350],go:'huette',to:[640,488]},
  sUnbek:{n:'Schild: Zum Sumpf',at:[462,350],go:'sperre',to:[400,488]},
  sHolz:{n:'Umgestürzte Birken',at:[440,402],fn(){
    if(FL.cut)return say([['P','Feuerholz für drei Winter. Wowa würde es verkaufen.']]);
    if(inv.includes('saege'))return say([['P','So. Dann wollen wir mal.'],['P','*säg* ... *säg* ... *keuch* ... *säg*'],['P','Geschafft. Der Weg zum Sumpf ist frei.']],()=>{FL.cut=1;delete cache.sperre;this.n='Holzstapel';$('[data-id=sHolz]').style.display='none';enter('sperre',[P.x,P.y])});
    this.i=(this.i||0)+1;say(this.i%2?[['P','Da komm ich weder drüber noch drunter. Ich brauch eine Säge.']]:[['P','Vielleicht hat die Baba Jaga eine. Hexen haben doch immer Werkzeug, oder?']])}},
  sSumpf2:{n:'Schild: Zum Sumpf',at:[490,404],fn(){if(FL.cut)walkTo(505,346,()=>enter('sumpf',[540,488]));else say([['P','Das Schild zeigt zum Sumpf. Nur leider liegen ein paar Tonnen Birke dazwischen.']])}},
  sZG3:{n:'Schild: Zur Weggabelung',at:[200,482],go:'gabel',to:[462,356]},
  saege:{n:'Säge',at:[630,444],l:[[['P','Eine alte Säge. Rostig, aber scharf.'],['P','Die Baba Jaga merkt das bestimmt nicht. ...Hoffentlich.']]],after(){$('#saege').remove();inv.push('saege');renderInv()}},
  sZW:{n:'Schild: Zum Birkenwald',at:[215,482],go:'wald',to:[330,430]},
  sZG:{n:'Schild: Zur Weggabelung',at:[665,480],go:'gabel',to:[400,352]},
  baum:{n:'Umgestürzte Birke',at:[590,372],l:[
    [['P','Eine umgestürzte Birke. Man kann drübersteigen, wenn man nicht nachdenkt.']],
    [['P','Dahinter riecht es nach Sumpf. Und nach Ärger.']]]},
  sZG2:{n:'Schild: Zum Waldweg',at:[150,484],go:'sperre',to:[505,350]},
  huette:{n:'Baba Jagas Hütte',at:[470,438],l:[
    [['P','Schief, alt, und ich schwör, sie atmet. Die Hütte atmet.']],
    [['P','Aus dem Schornstein riecht es nach Kohl. Und nach... etwas, das kein Kohl ist.']]]},
  tuer:{n:'Tür',at:[478,436],l:[
    [['P','Hallo? Ich wollte nur fragen, wie man hier wieder aufwacht.'],['J','Erst klopfen, dann reden! Und die Füße abputzen!']],
    [['P','*klopf klopf*'],['J','Jetzt nicht! Der Ofen ist heiß. Komm später wieder.']]]},
  beine:{n:'Hühnerbeine',at:[492,438],l:[
    [['P','Die Beine zucken. Wie bei einem Huhn, das träumt.']],
    [['P','Ich fass da nichts an. Die treten bestimmt.']]]},
  zaun:{n:'Schädelzaun',at:[300,445],l:[
    [['P','Ein Zaun aus Schädeln. Und die Augen leuchten.']],
    [['P','Ist das Deko oder eine Warnung?'],['P','...Beides. Ganz sicher beides.']]]},
  _:{}
};
function use(id){const o=T[id];if(!o)return;if(o.go)return enter(o.go,o.to);if(o.fn)return o.fn();o.i=o.i||0;const set=o.l[o.i%o.l.length];o.i++;say(set,o.after)}
const ITEMS={kippe:['🚬','Joint-Stummel','Lieber nicht. Sonst wach ich in einem noch schlimmeren Märchen auf.'],saege:['🪚','Säge','Eine Säge. Damit könnte man Birken klein machen.']};
function renderInv(){$('#slots').innerHTML='';inv.forEach(id=>{const it=ITEMS[id],d=document.createElement('div');d.className='slot';d.textContent=it[0];d.title=it[1];
  d.onclick=e=>{e.stopPropagation();if(!busy)say([['P',it[2]]])};$('#slots').appendChild(d)})}

// ================= Nymphen-Pool (gemalte Figuren, wechseln beim Verlassen des Sumpfs) =================
const NYMPHS=[
 {id:'nastja',n:'Nastja',col:'#c8d0e0',age:.05,build:.05,beauty:1,skin:[238,228,218],shade:[120,104,118],hair:[196,172,124],eye:[84,128,160],pose:1,lips:[184,124,140],l:[
  [['nastja','Bitte guck mich nicht so an. Ich bin erst seit Dienstag tot, ich weiß noch nicht, wie man das macht.']],
  [['nastja','Mir ist so kalt. Warum ist mir kalt, wenn ich tot bin?'],['P','Ich... hab keine Ahnung. Tut mir leid.'],['nastja','Lauf weg, solange du noch kannst. Die anderen wollen dich reinziehen.']]]},
 {id:'marfa',n:'Marfa',col:'#d8a8c8',age:.3,build:.3,beauty:1,skin:[234,214,196],shade:[124,96,104],hair:[26,20,28],eye:[96,72,46],pose:1,kohl:1,strangle:1,earring:1,lips:[176,58,72],l:[
  [['marfa','Komm näher, Petja. Der Letzte, der so geschaut hat, liegt jetzt unter mir. Er hat sich nicht beschwert.']],
  [['marfa','Seine Frau hat mich ertränkt. Mit beiden Händen. Ich hab gelächelt, bis zum Schluss.'],['P','Warum erzählst du mir das?'],['marfa','Damit du weißt, was ich mit Händen anstellen kann.']]]},
 {id:'ustinja',n:'Matrone Ustinja',col:'#e0c890',age:.78,build:.12,skin:[208,190,166],hair:[176,172,162],eye:[96,84,70],pose:0,gaunt:1,updo:1,pearls:1,rouge:1,gold:1,stole:1,marble:.4,l:[
  [['ustinja','Im Bordell hätte ich dich nicht mal die Treppe putzen lassen, Bürschchen. Aber hier unten nimmt man, was der Sumpf anspült.']],
  [['ustinja','Meine eigenen Mädchen haben mich hier versenkt. Undankbares Pack.'],['ustinja','Das Haus am Fluss gehört immer noch mir. Den Schlüssel kriegst du, wenn du mir einen Gefallen tust.'],['P','Was für ein Haus?'],['ustinja','Das wirst du noch sehen, Süßer.']]]},
 {id:'fekla',n:'Fekla',col:'#c0d098',age:.45,build:1,skin:[178,184,152],hair:[92,66,40],eye:[96,84,62],pose:0,bloat:1,milky:1,blisters:1,marble:1,shade:[44,78,58],l:[
  [['fekla','Riechst du das? Das bin ich. Und in zwei Wochen bist das du, wenn du weiter so dumm am Ufer rumstehst.']],
  [['fekla','Früher war ich die Dickste im Dorf. Jetzt bin ich die Dickste im Sumpf. Karriere, was?']]]},
 {id:'glafira',n:'Glafira',col:'#f0a070',age:.25,build:.2,skin:[214,194,168],hair:[128,54,24],eye:[156,132,52],pose:0,scar:1,wounds:1,broken:1,algaeHair:1},
 {id:'alte',n:'Die Alte',col:'#c8c4b0',age:1,build:0,skin:[188,184,162],hair:[52,70,36],eye:[0,0,0],pose:0,skel:1,marble:.6,algaeHair:1,l:[
  [['alte','Blub... Jungchen... hast du... meine Nase... gesehen? Irgendein Hecht... hat sie... mitgenommen.']],
  [['alte','Ich war... die Erste hier... Der Fluch... ist älter... als die Hexe...'],['P','Welcher Fluch?'],['alte','Blub... später... ich bin müde...']]]}];
NYMPHS[4].fn=function(){
  if(inv.includes('kippe')){inv.splice(inv.indexOf('kippe'),1);renderInv();this.done=1;say([['P','Hier. Ein Rest. Von Wowa.'],['glafira','Na endlich mal einer mit Manieren. ...Kräuter von Oma. Gutes Zeug.'],['glafira','Hör zu, Stadtjunge: Wer hier aufwachen will, braucht den Segen der Baba Jaga.'],['glafira','Und die alte Hexe macht keinen Finger krumm, ohne dass du blutest. Bring ihr was Schönes.']])}
  else if(this.done)say([['glafira','Was denn noch? Verpiss dich zur Hexe.']]);
  else say([['glafira','Was glotzt du, du Wichser? Der, der mir das angetan hat, sah aus wie du. Nur mit mehr Mut.'],['glafira','Hast du was zu rauchen? Nein? Dann halt die Fresse.']])};
NYMPHS.forEach(n=>N[n.id]=[n.n,n.col]);

function paintNym(p){
  const S2=4,CW=80*S2,CH=110*S2,mkc=()=>{const c2=document.createElement('canvas');c2.width=CW;c2.height=CH;const g=c2.getContext('2d');g.setTransform(S2,0,0,S2,40*S2,100*S2);return g};
  const r=Math.random,A=p.age,F=p.build,sk=p.skin,sh=mix(sk,p.shade||[70,84,100],.5),dk=mix(sk,[24,22,30],.72),hi=mix(sk,[255,252,244],.35),hc=p.hair,hd=mix(hc,[8,8,8],.55),hl=(hc[0]+hc[1]+hc[2]<200)?mix(hc,[96,104,128],.5):mix(hc,[255,250,230],.35);
  const P2=d=>new Path2D(d),soft=(g,d,k,a,w,b)=>{g.save();g.filter=`blur(${b*S2}px)`;g.strokeStyle=rgba(k,a);g.lineWidth=w;g.lineCap='round';g.stroke(P2(d));g.restore()};
  const BE=!!p.beauty,nk=BE?3.1:3.8,sw=14+F*6,ww=(BE?7.4:9)+F*9,hw=11+F*9,sag=A*3+(p.gaunt?1:0),aw=4.5+F*3,fx=(7.6+F*1.6-(p.gaunt?.6:0))/7.6,he=p.updo?-60:-28;
  // --- Körper
  const torso=`M${-hw},6C${-hw-1},-12 ${-ww-1},-28 ${-ww},-40C${-ww+1},-50 ${-sw+3},-56 ${-sw},${-60+sag}C${-sw+2},${-64+sag} -9,-65 -4.4,-67L${-nk},-74L${nk},-74L4.4,-67C9,-65 ${sw-2},${-64+sag} ${sw},${-60+sag}C${sw-3},-56 ${ww-1},-50 ${ww},-40C${ww+1},-28 ${hw+1},-12 ${hw},6Z`;
  const down=s=>`M${s*(sw-1)},${-61+sag}C${s*(sw+5)},-58 ${s*(sw+6+F*2)},-44 ${s*(sw+6+F*2)},-30C${s*(sw+6+F*2)},-18 ${s*(sw+5+F*2)},-6 ${s*(sw+4+F*2)},6L${s*(sw+4+F*2-aw)},6C${s*(sw-aw+4)},-8 ${s*(sw-aw+5)},-20 ${s*(sw-aw+5)},-30C${s*(sw-aw+5)},-42 ${s*(sw-3)},-50 ${s*(sw-4)},-54Z`;
  const stump=s=>`M${s*(sw-1)},${-61+sag}C${s*(sw+4)},-58 ${s*(sw+6)},-50 ${s*(sw+6)},-44L${s*sw},-44C${s*sw},-50 ${s*(sw-2)},-54 ${s*(sw-4)},-55Z`;
  const up=[`M${sw-1},${-62+sag}C${sw+5},-64 ${sw+9},-70 ${sw+10},-77L${sw+5},-79C${sw+4},-73 ${sw+1},-68 ${sw-4},-64Z`,`M${sw+10},-77C${sw+8},-84 ${sw+2},-90 11,-93L9.5,-89C${sw},-86 ${sw+4},-81 ${sw+5},-79Z`];
  const hip=[`M${sw-1},${-61+sag}C${sw+5},-58 ${sw+8},-52 ${sw+8},-44L${sw+3},-43C${sw+3},-50 ${sw},-54 ${sw-4},-56Z`,`M${sw+8},-44C${sw+6},-38 ${ww+5},-34 ${ww+1.5},-33L${ww+.5},-37C${ww+4},-38 ${sw+2},-41 ${sw+3},-43Z`];
  const B=mkc();B.fillStyle=rgba(sk);B.fill(P2(torso));if(!BE)B.fill(P2(p.skel?stump(-1):down(-1)));
  if(p.pose){up.forEach(d=>B.fill(P2(d)));B.beginPath();B.ellipse(10.4,-92,3.4,2.6,-.5,0,7);B.fill()}else{hip.forEach(d=>B.fill(P2(d)));B.beginPath();B.ellipse(ww+1.6,-35,3,2.4,.6,0,7);B.fill()}
  B.globalCompositeOperation='source-atop';
  let g=B.createLinearGradient(-sw-8,0,sw+10,0);g.addColorStop(0,rgba(hi,.35));g.addColorStop(.35,rgba(hi,0));g.addColorStop(.6,rgba(sh,0));g.addColorStop(1,rgba(sh,.8));B.fillStyle=g;B.fillRect(-40,-100,80,110);
  g=B.createLinearGradient(0,-40,0,6);g.addColorStop(0,rgba(dk,0));g.addColorStop(1,rgba(dk,.5));B.fillStyle=g;B.fillRect(-40,-40,80,50);
  dab(B,0,-70,7,dk,.55);
  soft(B,`M-3,-66C-7,-65.5 ${-sw+5},-64 ${-sw+2},${-62+sag}M3,-66C7,-65.5 ${sw-5},-64 ${sw-2},${-62+sag}`,dk,.45,1.1,.5);
  soft(B,`M-3,-67.4C-7,-67 ${-sw+5},-65.6 ${-sw+2},${-63.6+sag}`,hi,.4,.8,.4);
  dab(B,-sw+3,-52,5,dk,.45);dab(B,sw-3,-52,5,dk,.55);
  soft(B,`M${-sw+4},-54C${-sw+3},-40 ${-sw+2},-20 ${-sw+1},4`,dk,.28,1.4,1.4);if(!p.pose)dab(B,sw+2,-46,5,dk,.35);
  soft(B,'M0,-64C0,-56 0,-48 0,-40',sh,.25,1.5,1);
  if(p.gaunt||p.skel)for(let i=0;i<6;i++){const y=-56+i*4.2;soft(B,`M${-ww-1},${y}C${-ww+3},${y-2} -5,${y+1} -3,${y+2.5}M${ww+1},${y}C${ww-3},${y-2} 5,${y+1} 3,${y+2.5}`,dk,p.skel?.6:.32,1,.5)}
  dab(B,0,-22+F*2,1.5,dk,.6);
  if(p.bloat){dab(B,-4,-26,15,hi,.3);dab(B,9,-18,11,sh,.35)}
  if(p.marble)for(let i=0;i<16*p.marble;i++){let X=(r()-.5)*sw*2,Y=-64+r()*50,d=`M${X},${Y}`;for(let k=0;k<6;k++){X+=(r()-.5)*5;Y+=(r()-.3)*4;d+=`L${X},${Y}`}soft(B,d,[70,58,96],.5,.5,.25)}
  if(p.blisters)for(let i=0;i<9;i++){const X=(r()-.5)*sw*2.2,Y=-60+r()*44;ell(B,X,Y,1.5,1.1,[200,196,150],.9);ell(B,X-.4,Y-.4,.5,.4,[255,255,232],.8)}
  if(p.strangle)soft(B,'M-4,-71C-1,-70 1,-70 4,-71',[90,58,100],.75,2.4,.6);
  if(p.wounds)[[-ww+3,-34,.4],[ww-3,-46,-.3],[-sw-3,-28,1.4]].forEach(([X,Y,a])=>{B.save();B.translate(X,Y);B.rotate(a);ell(B,0,0,3.4,1.4,[128,72,60],.8);ell(B,0,0,2.6,.6,[30,14,12]);for(let k=0;k<6;k++)ell(B,(r()-.5)*5,(r()-.5)*2.4,.6,.5,[70,100,40],.9);B.restore()});
  if(p.pose)for(let k=0;k<4;k++)soft(B,`M${8.4+k*1.2},-93.6l.4,2.6`,sh,.6,.35,.1);
  if(p.skel){B.globalCompositeOperation='source-over';B.strokeStyle='#d8cfb4';B.lineWidth=1.4;B.lineCap='round';B.beginPath();B.moveTo(-sw-3,-44);B.lineTo(-sw-3.4,-39);B.stroke()}
  // --- Kopf
  const H=mkc(),face=BE?`M0,-70.6C${3.4*fx},-70.6 ${6.2*fx},-73.6 ${7.1*fx},-77.6C${7.9*fx},-82 ${8.1*fx},-88 ${7.3*fx},-92C${6*fx},-97 ${2.5*fx},-98.5 0,-98.5C${-2.5*fx},-98.5 ${-6*fx},-97 ${-7.3*fx},-92C${-8.1*fx},-88 ${-7.9*fx},-82 ${-7.1*fx},-77.6C${-6.2*fx},-73.6 ${-3.4*fx},-70.6 0,-70.6Z`:`M0,-70C${4*fx},-70 ${7*fx},-73 ${7.6*fx},-77C${8.4*fx},-82 ${8.4*fx},-88 ${7.4*fx},-92C${6*fx},-97 ${2.5*fx},-98.5 0,-98.5C${-2.5*fx},-98.5 ${-6*fx},-97 ${-7.4*fx},-92C${-8.4*fx},-88 ${-8.4*fx},-82 ${-7.6*fx},-77C${-7*fx},-73 -4,-70 0,-70Z`;
  [-1,1].forEach(s=>{ell(H,s*7.9*fx,-84.5,1.3,2.4,s<0?sk:sh)});
  H.fillStyle=rgba(sk);H.fill(P2(face));H.globalCompositeOperation='source-atop';
  g=H.createLinearGradient(-8,0,9,0);g.addColorStop(0,rgba(hi,.3));g.addColorStop(.42,rgba(hi,0));g.addColorStop(1,rgba(sh,.75));H.fillStyle=g;H.fillRect(-12,-100,24,32);
  g=H.createLinearGradient(0,-77,0,-70);g.addColorStop(0,rgba(sh,0));g.addColorStop(1,rgba(sh,.45));H.fillStyle=g;H.fillRect(-12,-77,24,8);
  [-3.2,3.2].forEach(ex=>dab(H,ex,-85.4,3.6,dk,(BE?.08:.32)+A*.2+(p.skel?.55:0)));
  dab(H,-4.6*fx,-81,3,hi,.32);dab(H,4.6*fx,-81,3,hi,.1);
  if(p.gaunt||p.skel){dab(H,-4.8*fx,-77.4,3,dk,.42);dab(H,4.8*fx,-77.4,3,dk,.55)}
  if(p.bloat){dab(H,-4,-78,4,hi,.25);dab(H,0,-71.5,6,sh,.3)}
  if(p.scar)for(let i=0;i<90;i++)ell(H,-7+r()*6,-91+r()*18,.5+r()*1.4,.4+r(),r()<.5?[196,134,122]:[150,104,96],.35);
  if(!p.skel&&!BE){soft(H,'M.6,-88C1,-85 1.4,-82 1.7,-80',sh,.55,1.2,.4);dab(H,0,-80.8,1.6,hi,.35);ell(H,-1.1,-79.2,.7,.45,dk,.7);ell(H,1.3,-79.2,.7,.45,dk,.8);soft(H,'M-1.6,-79.6C-.8,-78.8 .8,-78.8 1.8,-79.6',sh,.35,.6,.3)}
  if(p.broken)soft(H,'M.2,-87C1.8,-85 -.6,-83 1.3,-80.5',dk,.65,.8,.2);
  const lc=p.lips||mix(sk,[160,70,76],.5);
  if(p.skel){ell(H,0,-75,3.6,1.7,[24,16,12]);for(let i=-3;i<=3;i++)ell(H,i*.95,-75.3,.42,.8,[214,204,180]);ell(H,4.8,-77.4,2.5,1.9,[26,18,12]);for(let i=0;i<3;i++)ell(H,4+i*.8,-76.6,.35,.6,[214,204,180]);
    ell(H,-.2,-80,1.4,1.1,[30,22,16]);ell(H,-3.2,-85,1.3,1.1,[150,118,78]);soft(H,'M-3.6,-85.2a.7,.7 0 1 1 .8,.4',[90,64,40],.9,.25,0)}
  else if(BE)beautyFace(H);else{H.fillStyle=rgba(mix(lc,[0,0,0],.15));H.fill(P2('M-3,-75.6C-1.6,-76.6 -.4,-76.3 0,-75.9C.4,-76.3 1.6,-76.6 3,-75.6C1.6,-75.2 -1.6,-75.2 -3,-75.6Z'));
    H.fillStyle=rgba(lc);H.fill(P2('M-2.6,-75.4C-1.4,-73.8 1.4,-73.8 2.6,-75.4Z'));dab(H,0,-74.6,.9,hi,.35);soft(H,'M-3,-75.5C-1,-75.2 1,-75.2 3,-75.5',dk,.7,.45,.1);dab(H,0,-72.6,2,sh,.3);
    if(p.gold){ell(H,.9,-75.3,.5,.36,[226,186,64])}
    [-3.2,3.2].forEach((ex,i)=>{const ey=-85;ell(H,ex,ey,2.2,1.05,[206,204,192]);const mk=p.milky&&i==1;ell(H,ex+.2,ey+.05,1,1,mk?[222,224,216]:mix(p.eye,[170,176,170],.45));if(!mk)ell(H,ex+.2,ey+.05,.42,.42,[18,14,12]);
      soft(H,`M${ex-2.4},${ey+.1}C${ex-1},${ey-1.5} ${ex+1},${ey-1.5} ${ex+2.4},${ey-.1}`,[24,16,14],.85,.55,.15);
      soft(H,`M${ex-2},${ey-1.6}C${ex-.6},${ey-2.6} ${ex+.8},${ey-2.6} ${ex+2.1},${ey-1.5}`,sh,.5,.4,.2);
      soft(H,`M${ex-1.9},${ey+.9}C${ex-.6},${ey+1.4} ${ex+.7},${ey+1.4} ${ex+2},${ey+.8}`,sh,.45,.35,.2);
      if(p.kohl)dab(H,ex,ey,3.2,[20,16,22],.38);
      if(A<.4)for(let k=0;k<4;k++)soft(H,`M${ex-1.4+k*.9},${ey-1.1}l${(k-1.5)*.3},-.9`,[20,14,12],.8,.25,0)});
    if(!BE)soft(H,'M-5.6,-88.4C-4,-89.4 -2.2,-89.3 -1,-88.6M1,-88.6C2.2,-89.3 4,-89.4 5.6,-88.4',hd,.85,.7,.2);
    if(p.rouge){dab(H,-4.6,-80,2.6,[200,80,80],.32);dab(H,4.4,-80,2.6,[200,80,80],.25)}
    if(p.foam)for(let i=0;i<6;i++)ell(H,2.6+r()*1.5,-75.6+r()*1.2,.45,.4,[242,246,242],.9)}
  function beautyFace(H){
    soft(H,'M.5,-88C.7,-85 1,-82.4 1.3,-80.6',sh,.35,.8,.4);dab(H,-.1,-80.9,1.3,hi,.45);ell(H,-.9,-79.5,.45,.3,dk,.5);ell(H,1.1,-79.5,.45,.3,dk,.55);soft(H,'M-1.4,-79.7C-.6,-79.1 .7,-79.1 1.5,-79.7',sh,.3,.5,.2);
    const lu=mix(lc,[0,0,0],.14),ll=mix(lc,[255,226,226],.14);
    H.fillStyle=rgba(lu);H.fill(P2('M-3.2,-75.7C-2.2,-76.4 -1,-77 -.1,-76.4C.8,-77 2,-76.4 3.2,-75.7C1.6,-75.3 -1.6,-75.3 -3.2,-75.7Z'));
    H.fillStyle=rgba(ll);H.fill(P2('M-3,-75.6C-2,-73.5 2,-73.5 3,-75.6C1.6,-75.2 -1.6,-75.2 -3,-75.6Z'));
    ell(H,-.5,-74.5,1.1,.35,[255,242,242],.5);soft(H,'M-3.1,-75.6C-1.2,-75.1 1.2,-75.1 3.1,-75.6',mix(lc,[0,0,0],.55),.75,.35,.08);dab(H,-3.3,-75.5,.8,dk,.3);dab(H,3.3,-75.5,.8,dk,.3);dab(H,0,-72.5,1.8,sh,.2);dab(H,0,-71.4,1.4,hi,.25);
    [-3.3,3.3].forEach(ex=>{const ey=-85.2;dab(H,ex,ey-1.3,2.9,mix(sh,[90,60,84],.35),.24);
      H.fillStyle='rgb(234,232,226)';H.fill(P2(`M${ex-2.6},${ey}C${ex-1.4},${ey-1.55} ${ex+1.2},${ey-1.65} ${ex+2.7},${ey-.2}C${ex+1.4},${ey+1.2} ${ex-1.3},${ey+1.2} ${ex-2.6},${ey}Z`));
      const g2=H.createRadialGradient(ex+.15,ey-.1,.1,ex+.15,ey,1.28);g2.addColorStop(0,rgba(mix(p.eye,[255,255,255],.3)));g2.addColorStop(.65,rgba(p.eye));g2.addColorStop(1,rgba(mix(p.eye,[0,0,0],.65)));H.fillStyle=g2;H.beginPath();H.arc(ex+.15,ey-.05,1.22,0,7);H.fill();
      ell(H,ex+.15,ey-.05,.5,.5,[10,8,8]);ell(H,ex-.28,ey-.48,.3,.26,[255,255,255],.95);ell(H,ex+.6,ey+.4,.14,.12,[255,255,255],.6);
      soft(H,`M${ex-2.7},${ey+.05}C${ex-1.4},${ey-1.8} ${ex+1.3},${ey-1.85} ${ex+2.9},${ey-.35}`,[30,20,20],.6,.42,.08);
      for(let k=0;k<5;k++){const t=.35+k/4*.65,lx=ex-2.3+t*4.9,ly=ey-1.35-Math.sin(t*3.14)*.4;soft(H,`M${lx},${ly}l${.2+t*.5},${-.55-Math.sin(t*3.14)*.2}`,[20,14,14],.7,.18,0)}
      soft(H,`M${ex-2.2},${ey-2.3}C${ex-.8},${ey-3.2} ${ex+1},${ey-3.2} ${ex+2.4},${ey-2.1}`,sh,.18,.3,.25);
      soft(H,`M${ex-2},${ey+.9}C${ex-.6},${ey+1.3} ${ex+.8},${ey+1.3} ${ex+2.2},${ey+.6}`,mix(sh,[0,0,0],.2),.35,.3,.1);
      if(p.kohl){soft(H,`M${ex-2.6},${ey+.3}C${ex-.6},${ey+1.4} ${ex+1},${ey+1.3} ${ex+2.8},${ey}`,[18,14,18],.55,.5,.3);dab(H,ex+2.7,ey-.5,1.4,[20,16,20],.32)}});
    const bc=mix(hd,sk,.35);soft(H,'M-5.9,-88.9C-4.8,-90.4 -2.8,-90.6 -1.2,-89.8',bc,.85,.5,.1);soft(H,'M1.2,-89.8C2.8,-90.6 4.8,-90.4 5.9,-88.9',bc,.85,.5,.1);
    dab(H,-4.4,-80.4,2.9,[238,150,150],.3);dab(H,4.4,-80.4,2.9,[238,150,150],.2);dab(H,-3.8,-82.3,1.7,[255,252,246],.4);dab(H,0,-90.5,2.6,[255,252,246],.22);dab(H,-.2,-72,1,[255,252,246],.2)}
  if(A>.5){soft(H,'M-4,-93C-1,-93.8 1,-93.8 4,-93M-3.5,-91.4C-1,-92 1,-92 3.5,-91.4',sh,.45,.35,.2);soft(H,'M-2.4,-78.4C-3.6,-76.8 -3.8,-75 -3.4,-73.6M2.6,-78.4C3.8,-76.8 4,-75 3.6,-73.6',sh,.55,.45,.25);
    soft(H,'M-5.8,-85l-1.4,-.8M-5.8,-84.4l-1.5,.3M5.8,-85l1.4,-.8M5.8,-84.4l1.5,.3',sh,.6,.3,.1)}
  H.globalCompositeOperation='source-over';if(p.earring)ell(H,-8.1*fx,-81.6,.75,.75,[216,174,70]);
  // --- Haare
  const HB=mkc(),HF=mkc();
  if(!p.updo){g=HB.createLinearGradient(-sw,0,sw,0);g.addColorStop(0,rgba(hd));g.addColorStop(.5,rgba(hc));g.addColorStop(1,rgba(hd));HB.fillStyle=g;
    HB.fill(P2(`M${-8*fx},-94C${-12*fx},-90 ${-sw-2},-70 ${-sw-3},${he}C${-sw+4},${he+2} ${sw-4},${he+2} ${sw+3},${he}C${sw+2},-70 ${12*fx},-90 ${8*fx},-94Z`))}
  const cap=`M${-8.2*fx},-84C${-9*fx},-95 ${-5*fx},-101.5 0,-101.5C${5*fx},-101.5 ${9*fx},-95 ${8.2*fx},-84C${7*fx},-90 ${4*fx},-93.5 0,-93C${-2.5*fx},-93.4 ${-5.5*fx},-91.5 ${-8.2*fx},-84Z`;
  const clump=s=>`M${s*7.6*fx},-90C${s*9*fx},-80 ${s*8},-70 ${s*10},-62C${s*12},-54 ${s*11.5},-44 ${s*9.5},-33C${s*6},-38 ${s*3},-46 ${s*2},-54C${s*1.8},-60 ${s*5},-66 ${s*6.6*fx},-74C${s*7.4*fx},-80 ${s*7.2*fx},-86 ${s*7.6*fx},-90Z`;
  HF.fillStyle=rgba(hc);HF.fill(P2(cap));
  if(p.stole){[-1,1].forEach(s=>{HF.fillStyle='#3a3026';HF.fill(P2(clump(s)));for(let i=0;i<90;i++){const t=r(),X=s*(3+t*8+r()*2),Y=-70+r()*36;soft(HF,`M${X},${Y}l${s*.6},1.6`,mix([60,50,40],[110,96,78],r()),.8,.4,0)}});
    ell(HF,0,-101,5,3.6,hc);for(let i=0;i<10;i++)soft(HF,`M${(r()-.5)*12},-96C${(r()-.5)*16},-86 ${(r()-.5)*20},-76 ${(r()-.5)*22},-66`,hl,.6,.3,0);
    if(p.pearls)for(let i=0;i<13;i++){const t=i/12,X=-7+t*14,Y=-67+Math.sin(t*3.14)*5;ell(HF,X,Y,.7,.7,[222,218,206]);ell(HF,X-.2,Y-.2,.25,.25,[255,255,255])}}
  else{[-1,1].forEach(s=>{g=HF.createLinearGradient(s*2,0,s*12,0);g.addColorStop(0,rgba(hc));g.addColorStop(1,rgba(hd));HF.fillStyle=g;HF.fill(P2(clump(s)))});
    for(let i=0;i<260;i++){const s=r()<.5?-1:1,t=r(),a0=-1.5+s*(.2+t*1.2),sx=Math.cos(a0)*8*fx,sy=-91+Math.sin(a0)*7+7,ex=s*(2.5+r()*9),ey=-58+r()*26,cx1=s*(8+r()*4),cy1=-76+r()*8;
      soft(HF,`M${sx},${sy}C${cx1},${cy1} ${s*(9+r()*3)},${ey-14} ${ex},${ey}`,r()<.6?mix(hd,hc,r()):mix(hc,hl,r()),.55+r()*.4,.25+r()*.45,0)}
    if(BE)for(let i=0;i<70;i++){const s=r()<.5?-1:1,t=r();soft(HF,`M${s*(4+t*4)},${-92+t*4}C${s*(9+t*2)},-80 ${s*(9+t*3)},-68 ${s*(4+t*7)},${-50+r()*12}`,hl,.7,.22,0)}
    for(let i=0;i<40;i++){const s=r()<.5?-1:1;soft(HF,`M${s*(sw-2+r()*4)},${-66+r()*4}C${s*(sw+1)},${-56} ${s*(sw+2)},${-44} ${s*(sw+1+r()*2)},${he+r()*8}`,mix(hd,hc,r()),.6,.35,0)}
    if(p.algaeHair)for(let i=0;i<10;i++){const s=r()<.5?-1:1,X=s*(4+r()*8);soft(HF,`M${X},-88C${X+s*2},-74 ${X-s},-60 ${X+s*1.5},${-44+r()*10}`,mix([40,70,26],[90,116,44],r()),.85,.9,.1)}}
  if(BE){for(let i=0;i<120;i++){const s=r()<.5?-1:1,t=r();soft(HF,`M${s*.4},-101.2C${s*(3+t*3)*fx},-100.5 ${s*(7+t*1.5)*fx},-96 ${s*(7.8+t*1.2)*fx},${-88+r()*6}`,r()<.5?mix(hd,hc,r()):mix(hc,hl,r()),.8,.28,0)}
    soft(HF,'M0,-101.4C0,-99 0,-97 0,-95.5',hd,.5,.4,.2)}
  const AR=mkc();if(BE){const ap=[`M${-sw+1},${-61+sag}C${-sw-3},-56 ${-sw-2.5},-48 ${-sw+.5},-42L${-sw+5},-44C${-sw+3},-49 ${-sw+3},-54 ${-sw+4},-56Z`,`M${-sw+1},-40C-6,-42 2,-48 ${sw-7},-56L${sw-8},-60C2,-52 -6,-46 ${-sw+3},-45Z`];
    AR.fillStyle=rgba(sk);ap.forEach(d=>AR.fill(P2(d)));AR.beginPath();AR.ellipse(sw-6,-59,3.2,2.2,-.6,0,7);AR.fill();AR.globalCompositeOperation='source-atop';
    g=AR.createLinearGradient(0,-60,0,-38);g.addColorStop(0,rgba(hi,.45));g.addColorStop(.5,rgba(sk,0));g.addColorStop(1,rgba(sh,.6));AR.fillStyle=g;AR.fillRect(-40,-66,80,30);
    dab(AR,-sw+2,-42,4,sh,.4);for(let k=0;k<3;k++)soft(AR,`M${sw-7.5+k*1.1},-60.6l1.2,1.8`,sh,.6,.3,.1);AR.globalCompositeOperation='source-over';
    soft(B,`M${-sw+3},-38C-6,-40 2,-46 ${sw-6},-53`,dk,.45,3,1.6)}
  // --- zusammensetzen
  const o=mkc();o.setTransform(1,0,0,1,0,0);[HB,B,H,HF,AR].forEach(L=>o.drawImage(L.canvas,0,0));o.setTransform(S2,0,0,S2,40*S2,100*S2);
  o.globalCompositeOperation='source-atop';
  g=o.createLinearGradient(0,BE?-14:-34,0,4);g.addColorStop(0,'rgba(26,20,12,0)');g.addColorStop(.7,'rgba(26,20,12,.65)');g.addColorStop(1,'rgba(18,14,8,.9)');o.fillStyle=g;o.fillRect(-40,-34,80,40);
  for(let i=0;i<(BE?6:34);i++)dab(o,(r()-.5)*44,(BE?-12:-34)+Math.pow(r(),.5)*(BE?12:32),3+r()*6,[26,20,12],.18+r()*.25);
  for(let i=0;i<(BE?0:8);i++){const X=(r()-.5)*34,Y=-36+r()*12;soft(o,`M${X},${Y}C${X+1},${Y-5} ${X-1},${Y-10} ${X+.4},${Y-13-r()*8}`,[28,22,14],.5,.8,.2)}
  for(let i=0;i<(BE?0:5);i++){const X=(r()-.5)*sw*2,Y=-64+r()*36,k=mix([38,66,26],[84,110,40],r());soft(o,`M${X},${Y-12}C${X+4},${Y-5} ${X-4},${Y+4} ${X+2},${Y+14}`,k,.75,1.1,.15)}
  g=o.createLinearGradient(0,-6,0,6);g.addColorStop(0,'rgba(44,58,48,0)');g.addColorStop(.45,'rgba(44,58,48,.85)');g.addColorStop(1,'rgba(36,48,40,1)');o.fillStyle=g;o.fillRect(-40,-6,80,16);
  for(let i=0;i<60;i++)ell(o,(r()-.5)*36,-62+r()*58,.3,.3,[236,244,226],.55);
  soft(o,`M${-hw-8},-1.4C-6,-2.4 6,-.6 ${hw+8},-1.6`,[210,220,200],.6,.6,.2);o.globalCompositeOperation='source-over';
  const im=o.getImageData(0,0,CW,CH),d=im.data;for(let i=0;i<d.length;i+=4)if(d[i+3]>0){const n=(r()-.5)*(BE?3:10);d[i]+=n;d[i+1]+=n;d[i+2]+=n}o.putImageData(im,0,0);
  const fin=document.createElement('canvas');fin.width=CW;fin.height=CH;const f=fin.getContext('2d');
  for(const[dx,dy]of[[-1,0],[1,0],[0,-1],[0,1]])f.drawImage(o.canvas,dx*2,dy*2);f.globalCompositeOperation='source-in';f.fillStyle=BE?'rgba(30,22,18,.45)':'rgba(20,16,12,.75)';f.fillRect(0,0,CW,CH);f.globalCompositeOperation='source-over';f.drawImage(o.canvas,0,0);f.clearRect(0,100*S2,CW,CH);
  return fin.toDataURL()}
const NIMG=NYMPHS.map(paintNym);
// Eigene Bilder: liegt assets/nymphe-<id>.png vor (z. B. assets/nymphe-mila.png), ersetzt sie das gemalte Sprite
NYMPHS.forEach((n,i)=>{const im=new Image();im.onload=()=>{NIMG[i]=im.src;if(cur==="sumpf")applySwampNymphs()};im.src="assets/nymphe-"+n.id+".png"});
const SLOT_AT=[[300,412],[460,408],[588,414]];let shown=[-1,-1,-1];
// Sumpf-Besetzung: wird NUR beim Verlassen des Sumpfs neu gemischt und beim nächsten Betreten angezeigt
let nextNymphs=[];
function updateSwampNymphs(){const p=NYMPHS.map((_,i)=>i);for(let i=p.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[p[i],p[j]]=[p[j],p[i]]}nextNymphs=p.slice(0,3)}
function applySwampNymphs(){nextNymphs.forEach((idx,i)=>{const nd=NYMPHS[idx];nd.at=SLOT_AT[i];T['slot'+i]=nd;const im=$('#slot'+i+'img');im.style.opacity=1;im.setAttribute('href',NIMG[idx])})}
function onLocationLeave(from){if(from==='sumpf')updateSwampNymphs()}
updateSwampNymphs();
const game=$('#game'),label=$('#label'),svg=$('#scene');
function svgPt(e){const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse())}
game.addEventListener('click',e=>{if(busy)return advance();if(changing||!S0)return;const h=e.target.closest('.interactive');
  if(h){const id=h.dataset.id,o=T[id];if(!o)return;if(id=='petja'||!o.at)return use(id);return walkTo(o.at[0],o.at[1],()=>use(id))}
  if(e.target.closest('#scene')){const p=svgPt(e);walkTo(p.x,p.y)}});
game.addEventListener('mousemove',e=>{const h=e.target.closest('.interactive');label.textContent=!busy&&h&&T[h.dataset.id]?T[h.dataset.id].n:''});

setTimeout(()=>{enter('wald',[400,476]);setTimeout(()=>{const b=$('#start button');if(b){b.disabled=false;b.textContent='Neues Spiel'}},500)},30);
$('#start button').onclick=e=>{e.stopPropagation();$('#start').remove();say([
  ['P','Uhhh... mein Kopf...'],
  ['P','Wo bin ich? Das ist nicht mein Balkon. Mein Balkon hat weniger... Birken.'],
  ['P','Der Joint von Wowa. Er hat gesagt, da sind „Kräuter von Oma" drin. Was für eine Oma?!'],
  ['P','Ich muss hier irgendwie wieder aufwachen.']])};
