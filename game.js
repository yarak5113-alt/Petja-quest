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
  x.fillStyle='#e8e0c8';x.fillRect(197,274,10,8);izba(x,660,298,.5,1,{win:'board',smoke:0});poles(x);well(x,530,338);sign(x,492,346,1.1,[[1,0,'Ins Dorf','hIns']]);bush(x,120,320,16,0);bush(x,760,322,18,0);rock(x,340,330,6,1);put(x);
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
// ================= Angel-Minispiel =================
function craft(){if(inv.includes('stock')&&inv.includes('seil')){['stock','seil'].forEach(i=>inv.splice(inv.indexOf(i),1));inv.push('angel');renderInv();
  setTimeout(()=>say([['P','Stock... Schnur dran... und als Haken eine Sicherheitsnadel aus meiner Hose.'],['P','Fertig ist die Angel! Wenn mein Vater mich jetzt sehen könnte. Er würde sich schämen.']]),300)}}
function fishing(){if($('#fg'))return;const cv2=document.createElement('canvas');cv2.id='fg';cv2.width=800;cv2.height=500;cv2.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:20;cursor:none';$('#game').appendChild(cv2);
  const x=cv2.getContext('2d');let mx=400,my=250,m=[400,250],ang=Math.random()*6.28,prog=0,out=0,fin=false;const t0=performance.now();let last=t0;
  const pos=(cx,cy)=>{const r=cv2.getBoundingClientRect();mx=(cx-r.left)/r.width*800;my=(cy-r.top)/r.height*500};
  cv2.onmousemove=e=>pos(e.clientX,e.clientY);cv2.ontouchmove=e=>{e.preventDefault();pos(e.touches[0].clientX,e.touches[0].clientY)};
  cv2.onclick=e=>{e.stopPropagation();if(mx>680&&my>455)end(0)};const esc=e=>{if(e.key=='Escape')end(0)};addEventListener('keydown',esc);
  function end(win){if(fin)return;fin=true;cv2.remove();removeEventListener('keydown',esc);
    if(win){FL.fisch=1;inv.push('fisch');renderInv();say([['P','Ich hab einen! Einen echten Fisch!'],['F','Der ist ja winzig. Den hätt ich zurückgeworfen.'],['P','Der ist für einen Kater, nicht für Sie.']])}
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
    if(ph==0){if(bite>0){ph=1;pt=performance.now();msg='ANGEBISSEN! Maustaste halten = ziehen, loslassen = Schnur geben. Folge dem Wels!'}else{miss++;msg='Zu früh! Das war nur Knabbern. ('+miss+'/3)';if(miss>=3)end(0,'Zu oft zu früh gezogen. Der Wels traut dem Knochen nicht mehr.')}}
    else if(ph==2){if(Math.abs(ring-1)<.16){hits++;sta-=.2;msg='Treffer! Er wird müde…';ring=3;rs=Math.min(2.4,rs+.12)}else{bad++;sta=Math.min(1,sta+.15);msg='Falscher Moment! Er holt wieder Kraft. ('+bad+'/4)';ring=3;if(bad>=4)end(0,'Der Wels hat sich mit letzter Kraft losgerissen.')}}}
  function end(win,m){if(fin)return;fin=true;cv2.remove();removeEventListener('keydown',esc);removeEventListener('mouseup',onup);
    if(win){FL.ablenk=1;say([['F','(von oben) WAS?! Es zieht! ES ZIEHT! Das ist ER! DER WELS!'],['F','Komm her, du Mistvieh! Dreißig Jahre hab ich auf dich gewartet!'],['P','Perfekt. Der ist jetzt eine Weile beschäftigt.'],['P','Und seine Flasche steht ganz allein auf dem Steg…']])}
    else say([['P',m],['P','Nochmal. Der Knochen hängt ja noch dran.']])}
  function frame(){if(fin)return;const t=performance.now(),dt=Math.max(0,Math.min(.05,(t-last)/1000));last=t;const el=(t-T0)/1000,pe=(t-pt)/1000;
    let g=x.createLinearGradient(0,0,0,500);g.addColorStop(0,'#2a4446');g.addColorStop(1,'#060e10');x.fillStyle=g;x.fillRect(0,0,800,500);
    for(let i=0;i<5;i++){x.fillStyle='rgba(255,250,220,.05)';x.beginPath();x.moveTo(80+i*170,0);x.lineTo(110+i*170,0);x.lineTo(150+i*170,500);x.lineTo(60+i*170,500);x.fill()}
    let hx=400,hy=230;
    if(ph==0){nibT-=dt;if(nibT<=0){if(Math.random()<.45)bite=.5;else nib=.4;nibT=1+Math.random()*1.5}nib=Math.max(0,nib-dt);
      if(bite>0){bite-=dt;if(bite<=0){bmiss++;msg='Verpasst! ('+bmiss+'/3)';if(bmiss>=3)return end(0,'Dreimal den Biss verpasst. Der Wels hat den Knochen abgenagt und ist weg.')}}
      hy+=bite>0?60:nib>0?Math.sin(t/40)*7:Math.sin(el*2)*3;const wx=400+Math.cos(el*.8)*160,wy=330+Math.sin(el*.8)*40;x.fillStyle='rgba(0,0,0,.4)';x.beginPath();x.ellipse(wx,wy,90,24,Math.cos(el*.8)>0?.1:-.1,0,7);x.fill();
      if(bite>0)for(let k=1;k<4;k++){x.strokeStyle='rgba(220,240,230,.4)';x.beginPath();x.ellipse(hx,hy,k*18,k*6,0,0,7);x.stroke()}}
    if(ph==1){if(Math.random()<dt*.5)ftx=120+Math.random()*560;fx+=(ftx-fx)*dt*1.2;if(surge<=0&&Math.random()<dt*.35)surge=.8;surge=Math.max(0,surge-dt);
      const f=.3+.18*Math.sin(el*1.7)+.12*Math.sin(el*4.3)+(surge>0?.5:0);ten+=((down?.62:-.5)+(f-.35)*1.3+(Math.abs(mx-fx)>90?.45:0))*dt;ten=Math.max(0,ten);
      const bc=.55+.12*Math.sin(el*.7),bw=Math.max(.12,.17-pe*.004),B0=bc-bw,B1=bc+bw;if(ten>=1)return end(0,'RISS! Zu fest gezogen – die Schnur ist gerissen.');
      if(ten<.08){low+=dt;if(low>1.5)return end(0,'Zu locker! Der Wels hat den Knochen ausgespuckt.')}else low=0;if(ten>B0&&ten<B1)hold+=dt;if(hold>=10){ph=2;msg='Er ermüdet! Klicke genau, wenn der Ring den Kreis berührt!'}
      hx=fx;hy=320+Math.sin(el*3)*14;x.fillStyle='rgba(0,0,0,.55)';x.beginPath();x.ellipse(fx,330,95,26,(ftx-fx)/900,0,7);x.fill();
      x.fillStyle='rgba(0,0,0,.6)';x.fillRect(752,80,26,340);x.fillStyle='rgba(120,220,120,.6)';x.fillRect(754,80+340*(1-B1),22,340*(B1-B0));x.fillStyle=ten>.9?'#ff4030':'#f0e0a0';x.fillRect(748,80+340*(1-Math.min(1,ten))-3,34,6);
      x.fillStyle='#fff';x.font='12px Arial';x.textAlign='center';x.fillText('Spannung',765,72);if(surge>0){x.fillStyle='#ff8060';x.font='bold 18px Arial';x.fillText('ER ZIEHT!',fx,280)}
      x.strokeStyle=Math.abs(mx-fx)>90?'rgba(255,90,60,.8)':'rgba(255,255,255,.5)';x.beginPath();x.moveTo(mx,440);x.lineTo(mx,470);x.stroke()}
    if(ph==2){if(Math.random()<dt*.6)ftx=150+Math.random()*500;fx+=(ftx-fx)*dt*1.6;hx=fx;hy=300;ring-=dt*rs;if(ring<.75){bad++;sta=Math.min(1,sta+.15);ring=3;msg='Zu spät! ('+bad+'/4)';if(bad>=4)return end(0,'Der Wels hat sich mit letzter Kraft losgerissen.')}
      x.fillStyle='rgba(0,0,0,.55)';x.beginPath();x.ellipse(fx,320,95,26,0,0,7);x.fill();x.strokeStyle='#f0e8c0';x.lineWidth=3;x.beginPath();x.arc(fx,300,34,0,7);x.stroke();x.strokeStyle='rgba(120,230,120,.9)';x.beginPath();x.arc(fx,300,34*ring,0,7);x.stroke();
      x.fillStyle='rgba(0,0,0,.6)';x.fillRect(200,52,400,14);x.fillStyle='#e06040';x.fillRect(202,54,396*Math.max(0,sta),10);x.fillStyle='#fff';x.font='12px Arial';x.textAlign='center';x.fillText('Kraft des Welses',400,80);if(sta<=0)return end(1)}
    x.strokeStyle='rgba(230,230,220,.85)';x.lineWidth=1.3;x.beginPath();x.moveTo(400,0);x.quadraticCurveTo((400+hx)/2,hy*.5+(ph==1?40-ten*40:0),hx,hy);x.stroke();
    x.save();x.translate(hx,hy);x.rotate(.4);x.fillStyle='#e8e0cc';x.fillRect(-10,-2,20,4);[[-10,0],[10,0]].forEach(([a])=>{x.beginPath();x.arc(a,-2,3,0,7);x.arc(a,2,3,0,7);x.fill()});x.restore();
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
const BJ=`<g stroke="#141a0c" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round">
<path d="M-20,-232C-30,-220 -32,-180 -34,-130C-30,-118 -24,-114 -18,-112L22,-114C28,-140 26,-190 14,-228C6,-240 -12,-240 -20,-232Z" fill="#9a9a90"/>
<path d="M-44,-150C-44,-100 -44,-50 -40,4" fill="none" stroke="#4a3018" stroke-width="4.5"/><path d="M-44,-150C-50,-158 -48,-168 -40,-166C-36,-162 -40,-156 -44,-154" fill="none" stroke="#4a3018" stroke-width="4"/>
<path d="M-17,-42L-16,-4M5,-42L7,-4" stroke="#7e8e5e" stroke-width="5"/>
<path d="M-16,-4L-28,0L-30,2L-14,2ZM-26,0L-30,-2M7,-4L-4,0L-6,2L10,2ZM-2,0L-6,-2" fill="#7e8e5e"/>
<path d="M-12,-176C-24,-172 -30,-156 -30,-130C-32,-100 -34,-70 -38,-44L-32,-38L-28,-46L-22,-36L-16,-46L-10,-36L-4,-46L2,-36L8,-46L14,-38L20,-46L26,-40C24,-70 22,-100 22,-130C22,-156 18,-170 8,-176Z" fill="#55504a"/>
<path d="M-20,-140L14,-140L18,-52L-26,-52Z" fill="#b8ad8c"/><path d="M-12,-110L-2,-110L-2,-98L-12,-98Z" fill="#8a7a5a"/><ellipse cx="6" cy="-80" rx="6" ry="4" fill="#6a7040" stroke="none" opacity=".6"/><ellipse cx="-14" cy="-66" rx="4" ry="3" fill="#7a3a2a" stroke="none" opacity=".5"/>
<path d="M-24,-142C-10,-138 6,-138 20,-142" fill="none" stroke="#8a6a3a" stroke-width="2.4"/><path d="M-4,-140L-6,-126M-2,-140L2,-128" stroke="#8a6a3a" stroke-width="1.6"/>
<path d="M10,-172C22,-168 28,-160 30,-150L24,-146C20,-154 14,-160 8,-162Z" fill="#55504a"/><path d="M27,-149C32,-162 34,-180 32,-194" fill="none" stroke="#8a9a70" stroke-width="5"/>
<path d="M32,-194L28,-206M32,-194L33,-208M32,-194L37,-205M32,-194L40,-198M30,-196L24,-200" fill="none" stroke="#8a9a70" stroke-width="2.2"/>
<path d="M-22,-170C-32,-154 -38,-136 -40,-120L-34,-118C-30,-132 -24,-146 -16,-158Z" fill="#55504a"/><path d="M-38,-120L-42,-110" stroke="#8a9a70" stroke-width="5"/><ellipse cx="-43" cy="-112" rx="4.5" ry="5" fill="#8a9a70"/>
<path d="M-6,-176L-6,-184L4,-184L4,-176Z" fill="#8a9a70"/>
<path d="M-20,-214C-22,-226 -10,-232 0,-230C10,-228 14,-218 12,-206C11,-196 8,-186 2,-180C-4,-176 -14,-176 -18,-182C-22,-190 -22,-204 -20,-214Z" fill="#8a9a70"/>
<path d="M10,-212C16,-216 18,-206 12,-200Z" fill="#7e8e64"/>
<ellipse cx="-13" cy="-210" rx="5" ry="4" fill="#4a5634" stroke="none"/><ellipse cx="-1" cy="-211" rx="4.5" ry="4" fill="#4a5634" stroke="none"/>
<circle cx="-14" cy="-210" r="2.2" fill="#f0d030"/><circle cx="-2" cy="-211" r="2" fill="#f0d030"/><circle cx="-14.6" cy="-210" r=".9" fill="#000" stroke="none"/><circle cx="-2.6" cy="-211" r=".9" fill="#000" stroke="none"/>
<path d="M-20,-218L-9,-213M-6,-214L4,-218" stroke="#b8b8b0" stroke-width="2.4"/>
<path d="M-8,-208C-14,-204 -24,-198 -34,-186C-36,-182 -32,-182 -28,-184C-24,-188 -18,-192 -12,-196C-10,-198 -8,-202 -6,-204Z" fill="#7e8e64"/><circle cx="-24" cy="-192" r="1.8" fill="#5e6e48"/>
<path d="M-22,-186C-14,-180 -4,-182 4,-190" fill="none" stroke-width="1.2"/><path d="M-16,-184L-15,-180L-13,-184ZM-6,-185L-5,-181L-3,-186Z" fill="#e8e0a0" stroke-width=".6"/>
<path d="M-20,-182C-24,-178 -22,-172 -16,-172C-12,-174 -12,-178 -14,-182" fill="#8a9a70"/>
<path d="M4,-202C2,-196 2,-192 4,-188M-18,-200C-20,-196 -20,-192 -19,-189" fill="none" stroke="#6a7848" stroke-width=".8"/>
<path d="M-20,-220C-28,-200 -32,-170 -30,-130M-16,-226C-26,-210 -24,-180 -26,-150M8,-224C18,-200 20,-170 18,-130M12,-218C22,-196 24,-160 22,-140M2,-230C10,-226 14,-216 16,-200" fill="none" stroke="#c8c8c0" stroke-width="2.2"/>
<path d="M-14,-230L-20,-242M-4,-232L-2,-246M6,-230L14,-240M-20,-226L-30,-232" fill="none" stroke="#b8b8b0" stroke-width="1.8"/></g>`;
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
    else say([['P','Später. Mir zittern die Finger.']])}
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
<path d="M60,-150L28,-222" stroke="#6a4a24" stroke-width="5"/><path d="M8,-228C24,-240 46,-236 58,-224L52,-216C42,-226 26,-228 12,-220Z" fill="#8a8a90"/>
<path d="M-30,0L-30,-18L-6,-18L-4,0Z" fill="#3a2a1a"/><path d="M4,0L6,-18L30,-18L34,0Z" fill="#3a2a1a"/>
<path d="M-26,-18L-24,-52L-6,-52L-8,-18Z" fill="#5a4a6a"/><path d="M8,-18L6,-52L24,-52L26,-18Z" fill="#5a4a6a"/>
<path d="M-44,-50C-54,-90 -50,-140 -32,-160L32,-160C50,-140 54,-90 44,-50Z" fill="#8a3a2a"/><path d="M-30,-156C-36,-120 -34,-80 -28,-56L28,-56C34,-80 36,-120 30,-156Z" fill="#6a4a2a"/>
<path d="M-46,-66L46,-66L46,-56L-46,-56Z" fill="#2a1a0a"/><path d="M-8,-68H8V-54H-8Z" fill="#d8b040"/>
<path d="M-40,-150C-62,-130 -64,-100 -58,-78L-44,-76C-46,-98 -42,-120 -32,-136Z" fill="#8a3a2a"/><ellipse cx="-52" cy="-74" rx="10" ry="9" fill="#e0a080"/>
<path d="M38,-152C58,-144 64,-160 56,-178L44,-172C46,-162 40,-154 32,-144Z" fill="#8a3a2a"/><ellipse cx="50" cy="-178" rx="9" ry="8" fill="#e0a080"/>
<ellipse cx="-30" cy="-192" rx="8" ry="12" fill="#e0a080"/><ellipse cx="30" cy="-192" rx="8" ry="12" fill="#e0a080"/>
<ellipse cx="0" cy="-192" rx="30" ry="30" fill="#e8aa86"/>
<path d="M-36,-180C-46,-140 -30,-98 0,-88C30,-98 46,-140 36,-180C22,-168 -22,-168 -36,-180Z" fill="#b8642a"/><path d="M-20,-150L-16,-110M0,-152V-96M20,-150L16,-110M-28,-162L-24,-130M28,-162L24,-130" fill="none" stroke="#8a4a1a" stroke-width="1"/>
<path d="M-22,-170C-10,-164 10,-164 22,-170C16,-158 -16,-158 -22,-170Z" fill="#a8541a"/>
<ellipse cx="0" cy="-180" rx="17" ry="15" fill="#d86a5a"/><ellipse cx="-6" cy="-186" rx="5" ry="3.5" fill="#f0a090" stroke="none"/><ellipse cx="-6" cy="-172" rx="3" ry="2" fill="#7a2a2a" stroke="none"/><ellipse cx="6" cy="-172" rx="3" ry="2" fill="#7a2a2a" stroke="none"/>
<circle cx="-13" cy="-200" r="2.6" fill="#1a1208"/><circle cx="13" cy="-200" r="2.6" fill="#1a1208"/><path d="M-22,-206C-16,-212 -8,-210 -5,-205M5,-205C8,-210 16,-212 22,-206" fill="none" stroke="#b8642a" stroke-width="4"/>
<path d="M-32,-206C-30,-240 -10,-280 20,-292C30,-294 40,-288 34,-282C20,-276 16,-250 32,-206Z" fill="#3a5a2a"/><path d="M-34,-210C-12,-204 12,-204 34,-210L34,-202C12,-196 -12,-196 -34,-202Z" fill="#2a4020"/></g>`;
const GNOM2=`<g stroke="#1a1208" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round">
<path d="M-30,0L-30,-12L-8,-12L-6,0Z" fill="#2a2018"/><path d="M8,0L8,-12L30,-12L32,0Z" fill="#2a2018"/>
<path d="M-28,-12L-26,-44L-10,-44L-10,-12Z" fill="#5a4030"/><path d="M28,-12L26,-44L10,-44L10,-12Z" fill="#5a4030"/>
<path d="M-32,-58L-4,-58L-6,-42L-32,-42Z" fill="#5a4030"/><path d="M32,-58L4,-58L6,-42L32,-42Z" fill="#5a4030"/>
<path d="M-40,-56C-46,-90 -42,-120 -28,-136L28,-136C42,-120 46,-90 40,-56Z" fill="#4a5a7a"/><path d="M-24,-80h10v10h-10z" fill="#6a7a4a"/>
<ellipse cx="-26" cy="-58" rx="9" ry="7" fill="#e0a080"/><ellipse cx="26" cy="-58" rx="9" ry="7" fill="#e0a080"/>
<ellipse cx="-26" cy="-164" rx="7" ry="10" fill="#e0a080"/><ellipse cx="26" cy="-164" rx="7" ry="10" fill="#e0a080"/>
<ellipse cx="0" cy="-164" rx="26" ry="26" fill="#e8aa86"/>
<path d="M-30,-152C-38,-110 -20,-64 0,-56C20,-64 38,-110 30,-152C16,-144 -16,-144 -30,-152Z" fill="#d8d4cc"/><path d="M-14,-130L-10,-80M0,-132V-64M14,-130L10,-80" fill="none" stroke="#a8a49c" stroke-width="1"/>
<path d="M-8,-172C-12,-150 -8,-124 4,-118C14,-120 14,-136 10,-150C8,-162 8,-168 6,-174Z" fill="#d27a66"/><ellipse cx="0" cy="-130" rx="4" ry="3" fill="#f0a090" stroke="none"/>
<path d="M-16,-172C-13,-170 -9,-170 -6,-172M8,-173C11,-171 15,-171 18,-173" fill="none" stroke-width="1.6"/><path d="M-20,-178L-6,-176M8,-177L22,-179" stroke="#f0f0e8" stroke-width="3.4"/>
<path d="M12,-140L36,-132" stroke="#5a3a1c" stroke-width="2.6"/><path d="M32,-144h8v12h-8z" fill="#5a3a1c"/><circle cx="40" cy="-152" r="3" fill="#ccc" stroke="none" opacity=".5"/><circle cx="44" cy="-162" r="4" fill="#ccc" stroke="none" opacity=".35"/>
<path d="M-28,-176C-24,-206 0,-226 30,-220C44,-218 52,-206 46,-198C38,-208 24,-206 26,-176Z" fill="#a82a20"/><path d="M-30,-180C-10,-174 10,-174 28,-180L28,-172C10,-166 -10,-166 -30,-172Z" fill="#7a1a14"/></g>`;
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
 fischer:{...BASE,seed:53,hz:200,sun:[640,150],sunr:40,top:[70,80,96],hor:[200,190,170],sunc:[250,220,170],cl:[200,200,204],cs:[96,100,116],cov:.42,masses:[[-30,830,150,40]],spruce:1,trunks:0,band:[0,800],bc:[[60,74,80],[90,104,108]],lit:[[50,66,50],[80,96,70]],dark:[[18,28,24],[34,46,40]],haze:[170,176,176],
   g:[[30,40,20],[58,72,32],[96,100,58]],sand:[[96,80,56],[150,130,96]],gh:[120,130,120],dapple:.04,b0:[[24,36,14],[44,58,22]],b1:[[90,108,50],[140,146,86]],fol:[[16,30,14],[44,66,26],[110,124,64]],fl:[[220,220,230],[200,200,140]],nfl:60,rayc:[255,220,170],raya:.15,gr:['rgba(255,190,130,.3)','rgba(30,50,80,.45)'],vig:.6,
   pe:segPath([[-30,488,60,240,440,34],[240,440,34,150,352,14],[240,440,34,690,386,20]]),gtop:()=>201,k:1/270,x0:40,x1:770,ymin:x=>x<250?356:338+(x-250)*.05+14,ymax:494,paint:paintFischer,
   intro:[['P','Ein See. Und ein Fischer. Endlich mal jemand, der nicht nackt ist oder auf Hühnerbeinen steht.'],['P','Gut, bei dem Bart weiß man nie.']]},
 dorf:{...BASE,seed:67,hz:200,sun:[220,90],sunr:50,top:[104,116,130],hor:[214,210,198],sunc:[240,236,220],cl:[226,226,228],cs:[120,124,136],cov:.4,masses:[[-30,330,60,60],[480,830,60,60],[300,560,110,50]],trunks:0,band:[200,640],
   lit:[[80,100,56],[130,140,84]],haze:[196,200,198],g:[[44,54,26],[84,96,44],[130,128,76]],sand:[[66,52,36],[124,104,78]],gh:[170,176,166],dapple:.06,b1:[[110,130,56],[170,170,96]],fol:[[22,40,16],[66,94,32],[160,170,86]],nfl:90,rayc:[255,240,210],raya:.15,gr:['rgba(240,220,180,.3)','rgba(40,50,80,.35)'],vig:.5,
   pe:segPath([[430,512,190,436,330,46],[436,330,46,446,206,5],[-30,352,26,436,322,40],[436,322,40,830,344,30],[380,470,60,262,432,18]]),gtop:X=>201+Math.pow(Math.abs(X-440)/440,1.6)*12,k:1.05/286,x0:40,x1:760,ymin:x=>x<300?440:x>530?446:330,ymax:494,paint:paintDorf,
   intro:[['P','Ein Dorf! Mit Häusern! Und Strom!'],['P','...Nein. Die Leitungen hängen nur so rum.'],['P','Ein Laden, ein Brunnen, eine Kirche und ein abgebranntes Haus. Klassisches Dorf.']]},
 dorfstr:{},
 kirche:{},
 sperre:{...BASE,seed:41,hz:200,sun:[450,40],sunr:30,top:[26,34,38],hor:[60,74,68],sunc:[150,170,150],cl:[80,90,88],cs:[40,48,50],cov:.5,masses:[[-30,830,0,40]],spruce:1,trunks:0,band:[0,800],bc:[[24,32,32],[40,50,48]],
   lit:[[30,44,26],[50,64,36]],dark:[[8,14,10],[18,26,18]],haze:[50,62,60],g:[[20,28,14],[38,50,22],[58,64,34]],sand:[[58,46,30],[100,84,58]],gh:[50,62,58],dapple:.03,b0:[[14,22,10],[28,38,16]],b1:[[46,62,26],[78,90,46]],d0:[[4,8,4],[12,18,8]],d1:[[20,30,14],[36,48,22]],
   fol:[[10,18,8],[30,46,20],[74,92,46]],fl:[[150,150,170],[170,180,140]],nfl:30,rayc:[180,210,190],raya:.22,gr:['rgba(120,150,130,.3)','rgba(10,20,40,.55)'],vig:.75,xr:y=>{const e=cxS(y),w=opS(y)-40;return[e-w,y>384&&y<466?770:e+w]},
   pe:segPath([[400,512,170,420,420,70],[420,420,70,440,330,24],[440,330,24,452,250,6],[430,446,50,620,420,32],[620,420,32,840,398,24]]),gtop:X=>201+Math.pow(Math.abs(X-440)/440,1.6)*14,k:1.05/286,x0:60,x1:760,ymin:()=>FL.cut?340:398,ymax:494,paint:paintSperre,
   intro:[['P','Na toll. Alles voller Birken. Als hätte sie jemand absichtlich hier hingeworfen.'],['P','Und links und rechts nur Wald. Dicht wie eine Mauer. Und dunkel wie im Arsch eines Bären.'],['P','Ohne Säge komm ich da nicht durch.']]}
};
SCN.gnome={...BASE,seed:113,hz:200,sun:[300,120],sunr:50,top:[60,90,140],hor:[230,200,150],sunc:[255,220,160],cs:[120,110,120],cl:[240,220,200],cov:.45,masses:[[-30,600,40,70]],spruce:1,band:[0,600],nfl:120,gr:['rgba(255,200,130,.35)','rgba(40,50,90,.35)'],vig:.5,raya:.3,rayc:[255,220,160],
  pe:segPath([[-30,476,50,300,440,40],[300,440,40,600,420,30],[600,420,30,712,406,20],[300,440,30,190,314,10],[400,436,20,440,292,8]]),gtop:X=>201+Math.pow(Math.abs(X-400)/400,1.6)*12,k:1/270,x0:40,x1:760,ymin:x=>x>590?416:350,ymax:494,paint:paintGnome,
  intro:[['P','Eine Siedlung. Runde Hütten, Riesenkohl... und da stehen Gnome.'],['P','Große Gnome. Sehr große Gnome. Mit sehr, sehr großen Nasen.']]};
SCN.hoehle={...BASE,seed:127,hz:200,pe:()=>null,gtop:()=>500,k:1.05/270,x0:60,x1:740,ymin:()=>420,ymax:494,paint:paintHoehle,
  intro:[['P','Eine Höhle. Kalt, feucht und irgendwo tropft es.'],['P','Leuchtpilze, Kristalle, ein unterirdischer See. Und hinten ein Gang ins Schwarze.']]};
SCN.innen={...BASE,seed:101,hz:200,pe:()=>null,gtop:()=>500,k:1.1/270,x0:60,x1:740,ymin:x=>x>300&&x<600?452:404,ymax:494,paint:paintInnen,gr:['rgba(255,170,90,.3)','rgba(40,20,60,.45)'],vig:.4,
  intro:[['J2','Na sieh mal an! Ein Gast durchs Fenster. Wie es sich gehört!'],['J2','Du riechst nach Rauch, Bürschchen. Und nach etwas anderem... Zeig mal, was du in der Tasche hast.'],['P','Nur einen alten Joint-Stummel.'],['J2','Leg ihn auf den Tisch und zerleg ihn. Ich fass sowas nicht an. Gicht in den Fingern.']]};
SCN.ufer={...SCN.fischer,seed:91,pe:segPath([[-30,470,60,400,432,50],[400,432,50,830,452,60],[100,440,30,60,392,14]]),ymin:x=>x<160?396:366,x0:30,x1:770,paint:paintUfer,
  intro:[['P','Das Ufer. Schilf, Schlamm und ein Boot, das schon lange aufgegeben hat.'],['P','Da vorne fängt der Steg an. Unten drunter ist es dunkel. Natürlich.']]};
SCN.unter={...BASE,seed:97,hz:200,pe:()=>null,gtop:()=>500,k:1/270,x0:60,x1:740,ymin:()=>412,ymax:494,paint:paintUnter,
  intro:[['P','Unter dem Steg. Es riecht nach Algen, Fisch und Kusmitschs Füßen.'],['P','Da hängt seine Schnur durch die Bretter. Mit leerem Haken. Kein Wunder, dass nie was beißt.']]};
Object.assign(SCN.dorfstr,SCN.dorf,{seed:71,pe:segPath([[420,512,170,430,360,60],[430,360,60,440,214,6],[300,452,20,236,438,10],[540,452,20,600,432,10]]),ymin:x=>x<300?448:x>560?446:342,paint:paintDorfstr,
  intro:[['P','Die Dorfstraße. Sonnenblumen, Wäscheleinen, Hühnerdreck. Fast gemütlich.'],['P','Hinten ist eine Kirche. Und hier schaut eine Oma aus dem Gartentor. Die schauen immer.']]});
Object.assign(SCN.kirche,SCN.dorf,{seed:83,top:[86,96,112],hor:[196,192,184],cov:.36,vig:.6,gr:['rgba(220,200,170,.3)','rgba(30,40,70,.45)'],pe:segPath([[420,512,160,450,330,40],[450,330,40,460,302,14]]),ymin:x=>x<300||x>600?446:332,paint:paintKirche,
  intro:[['P','Eine Holzkirche mit Zwiebeltürmen. Und ein Friedhof mit blauen Gittern.'],['P','Da auf dem Grab hockt ein fetter schwarzer Kater. Er starrt mich an. Ich starre zurück. Er gewinnt.']]});
function paintWald(){const o=S0;sky(o);far(o);ground(o);
  let x=lay();[[300,286,5,1,150],[322,280,4,-1,170],[540,282,4,1,165],[562,288,6,-2,140],[280,292,6,0,120],[600,294,7,1,110]].forEach(b=>birch(x,...b));
  [[300,150,16],[322,170,13],[540,165,13],[562,140,16],[280,120,20],[600,110,22]].forEach(([a,b,r])=>foliage(x,a,b,r));put(x,.6);
  const MB=[[60,330,22,-3],[128,318,12,2],[185,322,16,-2],[250,305,9,1],[578,306,9,2],[650,322,20,-4],[722,332,15,3],[772,316,10,-1]];shadows(MB);
  x=lay();grass(x,9000,o.hz,500,1);details(x);put(x);
  x=lay();const eb=birchPath(650,322,20,-4);$('#ebhit').setAttribute('d',eb);
  MB.forEach(b=>b[0]==650?birch(x,650,322,20,-4,-12,eb):birch(x,...b));
  x.fillStyle='rgba(18,14,8,.92)';x.beginPath();x.ellipse(643,231,5.5,2.4,.05,0,7);x.ellipse(656.5,230,5,2.2,-.1,0,7);x.fill();
  x.strokeStyle='rgba(18,14,8,.85)';x.lineWidth=1.8;x.beginPath();x.moveTo(642,246);x.quadraticCurveTo(649,250,656,245);x.stroke();
  if(!FL.ast){x.lineCap='round';x.strokeStyle='#3e3428';x.lineWidth=4.5;x.beginPath();x.moveTo(652,206);x.quadraticCurveTo(690,193,732,190);x.moveTo(700,197);x.lineTo(713,185);x.moveTo(722,191);x.lineTo(740,180);x.stroke()}else{x.strokeStyle='#d8c8a0';x.lineWidth=3;x.beginPath();x.moveTo(650,203);x.lineTo(658,208);x.stroke()}
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
  appleTree(x,290,376);gabelDeco(x);fallenBirch(x);sign(x,432,338,1.3,[[-1,0,'Zu Baba Jaga','hBaba'],[1,14,'Zum Sumpf','hUnbek']]);sign(x,170,472,1.8,[[-1,0,'Zum Birkenwald','hZW']]);grass(x,240,270,345,1);put(x);
  x=lay();birch(x,780,520,44,-5);for(let i=0;i<500;i++){const X=R()<.5?R()*230-20:600+R()*220;dab(x,X,440+R()*70,6+R()*8,mix([10,30,8],[40,84,24],R()),.6)}
  grass(x,700,470,515,2.4,1);foliage(x,-10,22,58,1);foliage(x,812,12,62,1);put(x,1.1);
  rays(o,[[.1,.08],[.4,.1],[.75,.06],[1.0,.05]]);grade(o)}
function paintHuette(){const o=S0;sky(o);far(o);ground(o);
  let x=lay();for(let i=0;i<20;i++){const X=R()*800,Y=o.hz+6+R()*50;if(R()<.35){const sh=50+R()*50;for(let k=0;k<sh;k+=3)ell(x,X,Y-sh+k,(k/sh)*16+1,2.4,[26,22,34],.9)}else deadTree(x,X,Y,90+R()*90,2.5+R()*2.5,'rgba(36,30,46,.92)')}bgRow(x,34,212,262,12,22,1);put(x,.8);
  x=lay();for(let i=0;i<40;i++)dab(x,R()*800,o.hz+10+R()*40,30+R()*40,[200,170,200],.25);put(x,6,'screen',.5);
  x=lay();grass(x,6000,o.hz,500,1);details(x);hutDecoBack(x);x.save();x.translate(300,425);x.scale(1.25,1.25);x.translate(-300,-398);fence(x);x.restore();x.save();x.translate(478,420);x.scale(1.25,1.25);x.translate(-478,-398);hut(x);x.restore();hutDecoFront(x);
  deadTree(x,150,405,280,9,'#1e1814');deadTree(x,705,412,320,11,'#1e1814');sign(x,700,470,1.6,[[1,0,'Zur Weggabelung','hZG'],[-1,14,'Zum Dorf','hDorf']]);put(x);
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
Promise.all([sprite(PET(0,0),PB,K),sprite(PET(1,0),PB,K),sprite(PET(0,1),PB,K),sprite(CROW,[-30,-26,64,44],K),sprite(FISHER,[-64,-142,134,224],K),sprite(OMA,[-46,-200,92,204],K),sprite(OPA,[-42,-170,84,174],K)]).then(([a,b,st,cr,fi,om,op])=>{$('#omaimg').setAttribute('href',om);$('#opaimg').setAttribute('href',op);sprite(GNOM1,[-66,-296,140,300],K).then(k=>$('#gnom1img').setAttribute('href',k));sprite(GNOM2,[-52,-232,106,236],K).then(k=>$('#gnom2img').setAttribute('href',k));sprite(BJ,[-62,-250,108,256],K).then(k=>$('#bjimg').setAttribute('href',k));sprite(KATER,[-22,-58,52,62],K).then(k=>$('#katerimg').setAttribute('href',k));document.querySelectorAll('.fishimg').forEach(e=>e.setAttribute('href',fi));frames=[a,b,st];petimg.setAttribute('href',a);$('#crowimg').setAttribute('href',cr)});
setInterval(()=>{if(!frames[2])return;ft=1-ft;petimg.setAttribute('href',frames[mv?(ft?2:0):talking?ft:0])},150);

// ================= Laufen & Szenenwechsel =================
const P={x:400,y:476,dir:1};let mv=null,cur=null,changing=false;const cache={},seen={wald:1};
function render(){const sc=S0.k*(P.y-S0.hz);petG.setAttribute('transform',`translate(${P.x.toFixed(1)},${P.y.toFixed(1)}) scale(${(sc*P.dir).toFixed(3)},${sc.toFixed(3)})`)}
function walkTo(tx,ty,cb){const o=S0;tx=Math.max(o.x0,Math.min(o.x1,tx));ty=Math.max(o.ymin(tx),Math.min(o.ymax,ty));if(o.xr){const[a,b]=o.xr(ty);tx=Math.max(a,Math.min(b,tx))}mv={tx,ty,cb}}
let last=0;(function loop(t){const dt=Math.min(.05,(t-last)/1000||0);last=t;
  if(mv&&S0){const dx=mv.tx-P.x,dy=mv.ty-P.y,d=Math.hypot(dx,dy),sp=140*S0.k*(P.y-S0.hz)*dt+.3;
    if(d<=sp){P.x=mv.tx;P.y=mv.ty;const cb=mv.cb;mv=null;cb&&cb()}else{P.x+=dx/d*sp;P.y+=dy/d*sp;if(Math.abs(dx)>1)P.dir=dx<0?-1:1}render()}
  requestAnimationFrame(loop)})(0);
const fade=$('#fade');
function enter(id,pos){if(cur&&cur!==id)onLocationLeave(cur);changing=true;mv=null;fade.style.opacity=1;setTimeout(()=>{S0=SCN[id];
  if(cache[id])c.drawImage(cache[id],0,0);else{s=S0.seed;S0.paint();const k=document.createElement('canvas');k.width=W;k.height=H;k.getContext('2d').drawImage(cv,0,0);cache[id]=k}
  document.querySelectorAll('.room').forEach(r=>r.classList.toggle('on',r.id=='r-'+id));cur=id;document.getElementById('petimg').style.filter=id=='sperre'?'brightness(.6) saturate(.75)':'';if(id=='sumpf')applySwampNymphs();P.x=pos[0];P.y=pos[1];render();
  fade.style.opacity=0;changing=false;if(!seen[id]){seen[id]=1;S0.intro&&setTimeout(()=>say(S0.intro),450)}},420)}

// ================= Dialog =================
const N={P:['Petja','#ffb070'],K:['Krähe','#b0bcd8'],S:['Sonne','#ffe680'],M:['Fliegenpilz','#ff8a70'],B:['Birke','#c8e09a'],J:['Stimme aus der Hütte','#e0a0ff'],M1:['Mila','#a8e0b0'],W:['Wera','#c8b8f0'],D:['Dunja','#f0a070'],F:['Fischer Kusmitsch','#9cc8e0'],O:['Oma Dusja','#f0a0a0'],N1:['Grobnik','#d8a060'],N2:['Opa Schnobbel','#a0b8e0'],J2:['Baba Jaga','#e0a0ff'],G:['Opa Grischa','#d8c890']};
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
  kraehe:{n:'Krähe',at:[680,400],fn(){if(inv.includes('apfel'))return say([['P','Hey, Krähe! Fang!'],['P','*wirft den Apfel*'],['K','KRAH! Bist du irre?! Ich hab dir den Weg gezeigt, du Undankbarer!'],['K','Ich geh zur Baba Jaga petzen! Krah!'],['P','So. Der Ast ist frei.']],()=>{FL.kraehe=1;inv.splice(inv.indexOf('apfel'),1);renderInv();$('#kraeheG').remove()});
    if(FL.angelQ&&!FL.kraehe&&R()<.5)return say([['P','Der Ast, auf dem die Krähe sitzt, wäre ein guter Angelstock.'],['P','Aber die geht da nicht runter. Vielleicht muss ich sie verscheuchen. Mit irgendwas werfen.']]);
    this.i=(this.i||0);say(this.l[this.i++%this.l.length])},l:[
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
    this.i=(this.i||0)+1;say(this.i%2?[['P','Da komm ich weder drüber noch drunter. Ich brauch eine Säge.']]:[['P','Vielleicht hat der Fischer eine. Fischer haben doch immer Werkzeug, oder?']])}},
  sSumpf2:{n:'Schild: Zum Sumpf',at:[490,404],fn(){if(FL.cut)walkTo(505,346,()=>enter('sumpf',[540,488]));else say([['P','Das Schild zeigt zum Sumpf. Nur leider liegen ein paar Tonnen Birke dazwischen.']])}},
  sZG3:{n:'Schild: Zur Weggabelung',at:[232,484],go:'gabel',to:[462,356]},
  sZW:{n:'Schild: Zum Birkenwald',at:[215,482],go:'wald',to:[330,430]},
  sZG:{n:'Schild: Zur Weggabelung',at:[665,480],go:'gabel',to:[400,352]},
  baum:{n:'Umgestürzte Birke',at:[590,372],l:[
    [['P','Eine umgestürzte Birke. Man kann drübersteigen, wenn man nicht nachdenkt.']],
    [['P','Dahinter riecht es nach Sumpf. Und nach Ärger.']]]},
  sFisch:{n:'Schild: Zum Fischerhaus',at:[660,432],fn(){walkTo(760,404,()=>enter('fischer',[90,476]))}},
  sZD:{n:'Schild: Zum dunklen Wald',at:[130,484],go:'sperre',to:[730,412]},
  fischer:{n:'Fischer',at:[690,394],fn(){if(FL.ablenk&&!FL.schnaps)return say([['F','NICHT JETZT! DER WELS! Er zieht mich gleich vom Steg!'],['P','Lassen Sie sich Zeit.']]);
    if(FL.leiterQ&&!FL.schnapsQ){FL.schnapsQ=1;return say([['P','Herr Kusmitsch, könnten Sie mir Ihren Selbstgebrannten geben? Für den Opa.'],['F','Meinen Selbstgebrannten?! Für den Brandstifter? Eher fress ich mein Netz.'],['F','Die Flasche lass ich nicht aus den Augen. Nur wenn einer anbeißt. Und hier beißt seit 1987 nix Großes mehr an.'],['F','Außer dem Wels. Der wohnt unterm Steg. Aber der frisst nur Fleisch. Knochen und so. Mit meinem Brot lockst du den nicht.']])}
    if(FL.ks&&!FL.fisch&&!FL.kater){if(inv.includes('angel'))return say([['F','Na, eine Angel! Selbst gebaut? Sieht aus wie ein Unfall.'],['F','Dann zeig mal. Schwimmer in der Mitte halten, nicht vom Fisch wegziehen lassen!']],fishing);
    FL.angelQ=1;return say([['P','Könnten Sie mir einen Fisch geben? Für einen Kater.'],['F','Für den Kater vom Popen? Der Satan hat mir mal den ganzen Fang geklaut. Von mir kriegt der nix.'],['F','Fang dir selber einen. Keine Angel? Dann bau dir eine.'],['F','Ein Stock und eine Schnur. Mehr braucht ein Mann nicht. Und Wodka.'],['P','Und wo krieg ich die her?'],['F','Stöcke wachsen an Bäumen, Junge. Und Schnur... frag nicht mich, ich sitz hier seit 1987.']])}if(!FL.boot){if(inv.includes('brett')&&inv.includes('teer'))return repairBoat();
    if(!FL.auftrag){FL.auftrag=1;return say([['P','Sie haben nicht zufällig eine Säge? Da liegen Birken auf dem Weg.'],['F','Hab ich. Aber umsonst gibt’s nix. Erst flickst du mein Boot. Da, wo der Wels durch ist.'],['F','Du brauchst ein ordentliches Brett und Teer. Beides gibt’s im Dorf hinter der Hütte von der Alten.'],['P','Hinter Baba Jagas Hütte?'],['F','Na, wo denn sonst. Ist ja nicht so, dass sie umziehen könnte. ...Obwohl. Mit den Beinen.']])}
    if(R()<.5)return say([['F','Brett UND Teer, Junge. Ohne Teer säuft der Kahn ab. Ohne Brett auch. Ohne beides sowieso.']])}
    this.i=(this.i||0);say(this.l[this.i++%this.l.length])},l:[
    [['P','Guten Tag! Beißen sie?'],['F','Die Fische? Nein. Die Weiber im Sumpf, ja.'],['F','Dreißig Jahre sitz ich hier. Gefangen hab ich: zwei Stiefel, ein Fahrrad und meine erste Frau.'],['P','Ihre Frau?!'],['F','Hab sie wieder reingeworfen. Zu klein.']],
    [['P','Was machen Sie mit dem Netz?'],['F','Flicken. Ein Wels hat ein Loch reingebissen. So groß wie ein Traktor.'],['P','Das Loch?'],['F','Der Wels, Junge. Obwohl... das Loch auch.']],
    [['P','Wissen Sie, wie ich hier rauskomme?'],['F','Raus? Aus dem Wald kommt keiner raus. Ich wollte 1987 nur Zigaretten holen.'],['F','Frag die Alte in der Hütte auf Hühnerbeinen. Aber nimm Wodka mit. Nüchtern ist sie unerträglich.']]]},
  fhaus:{n:'Fischerhütte',at:[160,362],l:[[['P','Die Hütte vom Fischer. Riecht nach Rauch, Fisch und Einsamkeit.']],[['P','Abgeschlossen.'],['F','Da ist nur Wodka drin! Und Fisch! Und Wodka!']]]},
  boot:{n:'Altes Boot',at:[400,394],fn(){if(!FL.boot&&inv.includes('brett')&&inv.includes('teer'))return repairBoat();say(FL.boot?[['P','Geflickt. Hält bestimmt. Eine Woche. Oder bis zum ersten Wels.']]:this.l[0])},l:[[['P','Ein umgedrehtes Boot. Unten hat es mehr Löcher als Boden.'],['F','Das schwimmt noch! Nur nicht nach oben.']]]},
  see:{n:'See',at:[480,356],fn(){if(inv.includes('angel')&&!FL.fisch&&!FL.kater)return say([['P','Dann wollen wir mal. Auswerfen... und warten...'],['P','Da! Es zieht!']],fishing);this.i=(this.i||0);say(this.l[this.i++%this.l.length])},l:[[['P','Der See ist so still, als würde er die Luft anhalten.']],[['P','Da unten hat sich was bewegt. Groß. Ich geh nicht schwimmen.']]]},
  netz:{n:'Fischernetze',at:[300,382],l:[[['P','Fischernetze zum Trocknen. Oder moderne Kunst. Schwer zu sagen.']]]},
  sDorf:{n:'Schild: Zum Dorf',at:[650,480],go:'dorf',to:[150,486]},
  sZB:{n:'Schild: Zu Baba Jaga',at:[130,488],go:'huette',to:[640,474]},
  oma:{n:'Oma Dusja',at:[330,454],fn(){
    if(FL.teer)return say([['O','Iff waf... ach nein, ich hab ja wieder Zähne. Iss was, du bist zu dünn! Baba Jaga mag keine Knochen.']]);
    if(inv.includes('gebiss'))return say([['P','Oma, ich hab Ihr Gebiss gefunden.'],['O','Mein Gebiff! Wo war ef?'],['P','Unter dem Kater vom Popen. Auf dem Friedhof.'],['O','*klack* ...Ah. Viel besser. Schmeckt nach Kater, aber egal.'],['O','Teer willst du? Hier, Birkenteer. Gegen Rheuma, Läuse und Männer.'],['P','*bekommt eine Flasche Birkenteer*']],()=>{FL.teer=1;inv.splice(inv.indexOf('gebiss'),1);inv.push('teer');renderInv()});
    if(!FL.gq){FL.gq=1;return say([['P','Guten Tag, Oma! Haben Sie zufällig Teer?'],['O','Teer? Hab ich. Birkenteer. Aber erft... erft...'],['P','Was ist mit Ihren Zähnen?'],['O','Weg! Bei Fjodorf Beerdigung hab ich fo geheult, da ift mir daf Gebiff raufgeflogen.'],['O','Und jetft hockt der Kater vom Popen drauf. Daf Miftvieh! Faucht jeden an.'],['O','Bring mir mein Gebiff, dann kriegft du den Teer. Und waf zu effen. Du bift fo dünn.']])}
    this.i=(this.i||0)+1;say(this.i%2?[['O','Mein Gebiff, Junge! Friedhof! Hinter der Kirche! Der Kater!']]:[['O','Den Grifcha am Dorfeingang hab ich angezeigt. Wegen Brandgefahr. Eine Woche vorher. Keiner hört auf Oma.']])}},
  opa:{n:'Opa Grischa',at:[504,452],fn(){if(inv.includes('schnaps'))return say([['P','Opa, ich hab da was für Sie.'],['G','Ist das... Kusmitschs Selbstgebrannter?! Riecht nach Teer und Trauer. Perfekt!'],['G','*gluck* *gluck* ...AAAH. Da wird mir ganz warm. Wie damals beim Brand.'],['G','Die Leiter gehört dir. Hat das Feuer überlebt. Wie ich.'],['P','*bekommt eine Leiter*']],()=>{FL.leiter=1;inv.splice(inv.indexOf('schnaps'),1);inv.push('leiter');renderInv();$('#leiterG').remove()});
    if(FL.bjNo&&!FL.leiterQ){FL.leiterQ=1;return say([['P','Opa, haben Sie eine Leiter? Ich muss in Baba Jagas Hütte. Die steht auf Hühnerbeinen.'],['G','Eine Leiter hab ich. Da, am Ofen. Hat das Feuer überlebt.'],['G','Aber umsonst gibt’s nix. Bring mir was zu trinken. Mein Selbstgebrannter ist ja... verdampft.'],['G','Der Kusmitsch am See brennt den besten. Aber der rückt nix raus. Der schläft sogar mit der Flasche.']])}
    this.i=(this.i||0);say(this.l[this.i++%this.l.length])},l:[
    [['P','Was ist denn mit Ihrem Haus passiert?'],['G','Der Samowar. Oder der Selbstgebrannte. Oder ich. Die Untersuchung läuft noch.'],['G','Die Feuerwehr kam aus der Stadt. Drei Tage später. Haben Fotos gemacht.']],
    [['P','Kann ich hier was mitnehmen?'],['G','Nimm, was nicht verbrannt ist. Also nix.'],['G','Höchstens das Brett da. Das lag unterm Ofen. Ofen brennt nicht, Brett brennt nicht. Physik.']],
    [['G','Die Dusja aus dem Dorf hat mich angezeigt. Eine Woche bevor’s gebrannt hat.'],['G','Hexe. Die zweite im Wald. Die eine hat Hühnerbeine, die andre ’ne Gartenschere.']]]},
  brett:{n:'Brett',at:[664,458],l:[[['P','Ein Brett. Nur ein bisschen angekokelt.'],['G','Nimm’s mit! Ist eh versichert. ...War. War versichert.']]],after(){$('#brett').remove();inv.push('brett');renderInv()}},
  haus1:{n:'Leeres Haus',at:[300,446],l:[[['P','Ein leeres Haus. Die Gardinen sind noch da, die Leute nicht.']]]},
  omahaus:{n:'Omas Haus',at:[300,452],l:[[['P','Omas Haus. Sonnenblumen, Gardinen, frisch gestrichen. Das einzige Haus hier, das nicht stirbt.']]]},
  ruine:{n:'Opas abgebranntes Haus',at:[600,452],l:[[['P','Opas Haus. Übrig ist nur der Ofen.'],['G','Der Ofen ist das Wichtigste! Der Rest war eh nur Dekoration.']]]},
  laden:{n:'Dorfladen',at:[300,340],l:[[['P','„Laden“. Am Zettel steht: „Geschlossen seit 1991. Kommen bald wieder.“'],['P','Ich glaube, die kommen nicht wieder.']]]},
  leer:{n:'Vernageltes Haus',at:[560,350],l:[[['P','Vernagelt. Hier wohnt keiner mehr.'],['G','Doch, der Kolja. Der macht nur nicht auf. Seit der Wahl.']]]},
  brunnen:{n:'Ziehbrunnen',at:[500,350],l:[[['P','Ein Ziehbrunnen. Unten glitzert was.'],['P','...Eine Bierdose. Natürlich.']]]},
  kirche:{n:'Kapelle',at:[440,336],l:[[['P','Eine kleine Kapelle mit goldener Zwiebel. Die einzige Sache im Dorf, die noch glänzt.']]]},
  sIns:{n:'Schild: Ins Dorf',at:[480,352],go:'dorfstr',to:[420,488]},
  sDE:{n:'Schild: Zum Dorfeingang',at:[130,488],go:'dorf',to:[470,354]},
  sKi:{n:'Schild: Zur Kirche',at:[474,368],go:'kirche',to:[420,488]},
  sZD2:{n:'Schild: Zurück ins Dorf',at:[130,488],go:'dorfstr',to:[466,374]},
  galja:{n:'Tante Galjas Haus',at:[560,452],l:[[['P','Tante Galjas Haus. Steht zumindest auf dem Briefkasten.'],['P','Drinnen läuft ein Fernseher. Laut. Seit 1987 vermutlich.']]]},
  waesche:{n:'Wäscheleine',at:[340,370],l:[[['P','Wäsche. Eine Unterhose so groß wie ein Segel.'],['P','Wenn Galja die anzieht, kann sie damit über den See.']]]},
  kirche2:{n:'Holzkirche',at:[460,336],l:[[['P','Abgeschlossen. Ein Zettel: „Pope in der Stadt. Zurück bald.“ Datiert 1993.']],[['P','Die Kuppeln sind vergoldet. Das Dach leckt. Prioritäten.']]]},
  glocke:{n:'Glocke',at:[360,340],l:[[['P','Eine Glocke im Turm. Ich komm nicht ran. Zum Glück. Sonst würd ich läuten.']]]},
  graeber:{n:'Gräber',at:[250,450],l:[[['P','„Fjodor, 1931–2024. Hat nie gewonnen.“ Wobei, was?'],['P','Plastikblumen. Die halten länger als die Leute.']]]},
  kater:{n:'Kater',at:[560,452],fn(){FL.ks=1;if(inv.includes('fisch'))return say([['P','Hier, Mieze. Ein Fisch. Frisch aus dem See.'],['P','*der Kater schnappt sich den Fisch und verschwindet hinter der Kirche*'],['P','Und da liegt... Omas Gebiss. Na lecker.']],()=>{FL.kater=1;inv.splice(inv.indexOf('fisch'),1);renderInv();$('#katerG').remove()});
    this.i=(this.i||0)+1;say(this.i%2?[['P','Na, Mieze? Gehst du mal kurz runter da?'],['P','*FAUCH*'],['P','Okay. Okay! Er sitzt auf irgendwas. Das glitzert.']]:[['P','Der geht da nicht weg. Vielleicht mit Futter.'],['P','Was fressen Kater? Fisch. Und wer hat Fisch? ...Genau.']])}},
  gebiss:{n:'Gebiss',at:[580,452],fn(){if(!FL.kater)return say([['P','Da komm ich nicht ran. Der Kater sitzt drauf und guckt böse.']]);say([['P','Omas Gebiss. Ich fass das nur mit zwei Fingern an.']],()=>{$('#gebissG').remove();inv.push('gebiss');renderInv()})}},
  apfel:{n:'Apfel',at:[300,400],fn(){say([['P','Ein Apfel. Schön rot. Zum Essen zu schade...'],['P','...zum Werfen genau richtig.']],()=>{$('#apfelG').remove();inv.push('apfel');renderInv()})}},
  apfelbaum:{n:'Apfelbaum',at:[300,400],l:[[['P','Ein Apfelbaum mitten im Birkenwald. Den hat bestimmt jemand gepflanzt. Oder verloren.']],[['P','Die anderen Äpfel hängen zu hoch.']]]},
  ast:{n:'Ast',at:[690,400],fn(){if(!FL.kraehe)return say([['P','Ein schöner gerader Ast. Aber da sitzt die Krähe drauf.'],['K','Krah! Finger weg, das ist meiner!']]);
    say([['P','*spring* ... *spring* ... *SPRING*'],['P','*KNACK*'],['P','Ein Stock! Perfekt für eine Angel.']],()=>{FL.ast=1;delete cache.wald;inv.push('stock');renderInv();enter('wald',[P.x,P.y]);craft()})}},
  altnetz:{n:'Kaputtes Netz',at:[262,372],fn(){say([['P','Ein kaputtes Fischernetz, versteckt neben der Hütte.'],['F','He! Das ist... ach, nimm. Das hat der Wels zerfetzt.'],['P','Da zieh ich mir eine lange Schnur raus.']],()=>{$('#altnetzG').remove();inv.push('seil');renderInv();craft()})}},
  sUfer:{n:'Schild: Zum Ufer',at:[716,480],fn(){walkTo(770,470,()=>enter('ufer',[60,452]))}},
  sFH:{n:'Schild: Zum Fischerhaus',at:[130,486],go:'fischer',to:[740,470]},
  sUP:{n:'Schild: Unter den Pier',at:[176,404],go:'unter',to:[640,470]},
  sUZ:{n:'Schild: Zurück zum Ufer',at:[690,486],go:'ufer',to:[180,406]},
  wrack:{n:'Bootswrack',at:[560,420],l:[[['P','Ein Boot, halb versunken. Das ist wohl das, was passiert, wenn man es NICHT flickt.']]]},
  steg:{n:'Steg',at:[200,404],l:[[['P','Der Steg vom Fischer. Unten drunter kann man gebückt durchkriechen.']],[['P','Ganz hinten sitzt Kusmitsch. Er hat mich nicht gesehen. Gut so.']]]},
  schnur:{n:'Angelschnur',at:[430,430],fn(){if(FL.ablenk)return say([['P','Die Schnur zappelt wie verrückt. Oben flucht Kusmitsch. Herrlich.']]);
    if(FL.tied)return say([['P','Der Knochen hängt dran. Jetzt muss nur noch der Wels anbeißen.']],wels);
    if(inv.includes('knochen'))return say([['P','Ich bind den Knochen an seinen Haken. Doppelter Knoten. Wie Opa es mir beigebracht hat. Also mein Opa, nicht der verbrannte.'],['P','Und jetzt halt ich die Schnur fest und warte. Der Wels muss richtig ziehen, damit Kusmitsch was merkt.']],()=>{FL.tied=1;inv.splice(inv.indexOf('knochen'),1);renderInv();wels()});
    say([['P','Die Angelschnur vom Fischer. Leerer Haken.'],['P','Wenn hier was richtig Großes dranziehen würde, wäre Kusmitsch eine Weile beschäftigt...']])}},
  muell:{n:'Müll',at:[540,460],l:[[['P','Eine leere Flasche, ein Stiefel, ein Reifen. Kusmitschs Lebenslauf.']]]},
  knochen:{n:'Knochen',at:[540,474],fn(){say([['P','Ein Knochen. Von wem, will ich gar nicht wissen.'],['J','Lass meine Knochen liegen, Bürschchen!'],['P','Ich leih ihn nur aus!']],()=>{$('#knochenG').remove();inv.push('knochen');renderInv()})}},
  schnaps:{n:'Selbstgebrannter',at:[680,392],fn(){if(!FL.ablenk)return say([['F','FINGER WEG! Das ist mein Selbstgebrannter! Den hab ich im Auge, Junge!']]);
    say([['P','*schnapp*'],['F','(kämpfend) KOMM HER! KOMM HER, DU MISTVIEH!'],['P','Der merkt gar nichts. Dreißig Jahre Warten machen blind.']],()=>{FL.schnaps=1;$('#schnapsG').remove();inv.push('schnaps');renderInv()})}},
  leiter:{n:'Leiter',at:[700,452],fn(){say(FL.leiterQ?[['G','Die Leiter gibt’s gegen Selbstgebrannten. Nicht gegen Bitte-Bitte.']]:[['P','Eine alte Leiter am Ofen. Angekokelt, aber stabil.'],['G','Finger weg! Das ist das Einzige, was mir geblieben ist. Außer dem Ofen.']])}},
  baba:{n:'Baba Jaga',at:[540,460],fn(){
    if(inv.includes('pilze'))return say([['P','Hier. Die waren in dem Joint. Blau angelaufen.'],['J2','*schnüffel* ...*schnüffel*... HA! Wusst ich’s. Traumschwamm.'],['J2','Wächst nur im Sumpf der ertrunkenen Huren, unter den Seerosen. Die Nymphen trocknen ihn und verkaufen ihn an Dummköpfe.'],
      ['J2','Wer den raucht, schläft ein und wacht im Märchen auf. In MEINEM Märchen. Darum kommst du nicht raus, Bürschchen.'],['P','Wowa! Dieser Idiot hat mir das Ding gedreht!'],['J2','Dein Wowa ist mir egal. Aufwachen kannst du nur mit einem Gegengift. Ich brau’s dir.'],
      ['J2','Aber ich brauche drei Dinge: Eine Träne von einer wirklich schönen Nymphe. Eine schwarze Krähenfeder. Und Saft aus der ältesten Birke im Wald.'],['J2','Und bis du alles hast, fegst du mir nicht die Hütte voll. Raus mit dir. Hihihi!']],()=>{inv.splice(inv.indexOf('pilze'),1);renderInv();FL.bjInfo=1});
    if(FL.bjInfo)return say([['J2','Träne, Feder, Birkensaft. Kann doch nicht so schwer sein. Na los!']]);
    if(inv.includes('kippe'))return say([['J2','Auf den Tisch damit! Zerlegen! Papier, Filter, Kraut. Ich will sehen, was drin ist.']]);
    say([['J2','Wo ist der Stummel? Du hast ihn doch nicht etwa geraucht? Bring ihn her!']])}},
  tisch:{n:'Tisch',at:[450,460],fn(){if(FL.pilze)return say([['P','Hier hab ich einen Joint zerlegt. Vor einer Hexe. Ein Satz, den ich nie sagen wollte.']]);
    if(inv.includes('kippe'))return say([['P','Ich leg den Joint auf den Tisch.'],['J2','Vorsichtig! Erst den Filter ab, dann aufrollen, dann sortieren.']],tableGame);
    say([['P','Ein schwerer Holztisch. Voller Kerben und Flecken. Ich frag nicht, wovon.']])}},
  ofen:{n:'Ofen',at:[260,440],l:[[['P','Ein russischer Ofen. Warm. Zu warm. Und groß genug für einen Petja.'],['J2','Der ist für Piroggen! ...Meistens.']],[['P','Im Topf blubbert was. Es riecht nach Pilzen und Socken.']]]},
  regal:{n:'Regal',at:[640,420],l:[[['P','Gläser mit Kräutern, Augen und etwas, das mir zuwinkt.'],['P','Und zwei Schädel. Hoffentlich keine Stadtkinder.']]]},
  besen:{n:'Besen',at:[700,450],l:[[['P','Ihr Besen. Ich glaub, der fliegt. Ich setz mich lieber nicht drauf.']]]},
  fenster:{n:'Fenster (raus)',at:[300,430],go:'huette',to:[600,474]},
  sGN:{n:'Schild: Zur Gnomsiedlung',at:[700,474],fn(){walkTo(770,458,()=>enter('gnome',[60,472]))}},
  sZU:{n:'Schild: Zum Ufer',at:[130,488],go:'ufer',to:[740,456]},
  sHO:{n:'Schild: Zur Höhle',at:[640,428],fn(){walkTo(712,418,()=>enter('hoehle',[400,486]))}},
  sAU:{n:'Schild: Zum Ausgang',at:[130,488],go:'gnome',to:[640,428]},
  gnom1:{n:'Grobnik',at:[300,462],l:[
    [['P','Hallo! Sind Sie... ein Gnom?'],['N1','GROSS-Gnom! Kleine Gnome gibt’s in Deutschland. In Vorgärten. Mit Angel. Peinlich.'],['N1','Wir sind die Nasigen vom See. Je größer die Nase, desto höher der Rang. Ich bin Vorarbeiter.']],
    [['P','Was machen Sie mit der Spitzhacke?'],['N1','Graben. In der Höhle. Seit dreihundert Jahren.'],['P','Und was suchen Sie?'],['N1','Weiß keiner mehr. Aber jetzt aufhören wäre unhöflich.']],
    [['N1','Geh nicht zu tief in die Höhle, Langer. Da hinten ist es dunkel. Und dunkel ist erst der Anfang.']]]},
  gnom2:{n:'Opa Schnobbel',at:[300,420],l:[
    [['N2','*paff* ...Noch ein Langer. Letzte Woche war einer da. Hat nach dem Weg nach Hause gefragt.'],['P','Und?'],['N2','Wir haben gelacht. Lange. *paff*']],
    [['P','Ihre Nase ist... beeindruckend.'],['N2','Danke. Hab sie seit 1612. Sie hat mal einen Bären gerochen, bevor er geboren war.']],
    [['N2','Die Baba Jaga? Die schuldet mir drei Pfund Pilze. Grüß sie nicht von mir. *paff*']]]},
  ghut:{n:'Gnomhütte',at:[230,360],l:[[['P','Runde Tür, rundes Fenster, runde Bewohner.']],[['P','Drinnen schnarcht jemand. Die Wände wackeln.']]]},
  kohl:{n:'Riesenkohl',at:[200,470],l:[[['P','Kohl. So groß wie ein Kinderwagen.'],['N1','Finger weg! Das ist Schnobbels Rente!']]]},
  hoehleE:{n:'Höhleneingang',at:[680,420],l:[[['P','Ein Höhleneingang mit Fackeln. Kalter Wind kommt raus. Und Gemurmel.']]]},
  gang:{n:'Dunkler Gang',at:[420,430],l:[[['P','Der Gang führt tiefer. Stockdunkel. Ohne Licht geh ich da nicht rein.']],[['P','Da hinten hat was gekichert. Nein. Nein, danke.']]]},
  kristalle:{n:'Kristalle',at:[640,446],l:[[['P','Lila Kristalle. Sie summen leise.'],['P','Wenn man das Ohr ranhält, hört man... Radio Moskau?']]]},
  lpilze:{n:'Leuchtpilze',at:[180,450],l:[[['P','Leuchtpilze. Hoffentlich nicht verwandt mit denen aus dem Joint.']]]},
  hsee:{n:'Unterirdischer See',at:[430,430],l:[[['P','Ein unterirdischer See. Da schwimmt was Weißes ohne Augen.'],['P','Es winkt. Ich winke nicht zurück.']]]},
  sZG2:{n:'Schild: Zum Waldweg',at:[150,484],go:'sperre',to:[505,350]},
  huette:{n:'Baba Jagas Hütte',at:[470,438],fn(){if(inv.includes('leiter'))return bjEnter();this.i=(this.i||0);say(this.l[this.i++%this.l.length])},l:[
    [['P','Schief, alt, und ich schwör, sie atmet. Die Hütte atmet.']],
    [['P','Aus dem Schornstein riecht es nach Kohl. Und nach... etwas, das kein Kohl ist.']]]},
  tuer:{n:'Tür',at:[478,436],fn(){if(inv.includes('leiter'))return bjEnter();if(!FL.bjNo){FL.bjNo=1;return say([['P','Hallo? Frau Jaga? Darf ich reinkommen?'],['J','Durch die Tür kommt hier keiner rein! Die Tür ist Dekoration!'],['J','Wer was von mir will, kommt durchs Fenster. Wenn er hochkommt. Hihihi!'],['P','Das Fenster ist drei Meter hoch. Und die Hütte steht auf Hühnerbeinen.'],['P','Ich brauch eine Leiter.']])}this.i=(this.i||0);say(this.l[this.i++%this.l.length])},l:[
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
const ITEMS={kippe:['🚬','Joint-Stummel','Lieber nicht. Sonst wach ich in einem noch schlimmeren Märchen auf.'],saege:['🪚','Säge','Eine Säge vom Fischer. Damit könnte man Birken klein machen.'],apfel:['🍎','Apfel','Ein roter Apfel. Liegt gut in der Hand. Wurfgewicht: perfekt.'],stock:['🌿','Stock','Ein gerader Ast. Daraus wird was.'],seil:['🧶','Schnur','Schnur aus einem kaputten Fischernetz.'],angel:['🎣','Angel','Selbst gebaut. Stock, Schnur, Sicherheitsnadel. Hält bestimmt.'],pilze:['🍄','Blaue Pilze','Neun blau angelaufene Pilzstücke aus dem Joint. Traumschwamm?'],knochen:['🦴','Knochen','Ein Knochen von Baba Jagas Hof. Riecht nach Suppe.'],schnaps:['🍶','Selbstgebrannter','Kusmitschs Selbstgebrannter. Schon der Geruch macht blind.'],leiter:['🪜','Leiter','Opas Leiter. Angekokelt, aber stabil.'],fisch:['🐟','Fisch','Ein kleiner Fisch. Guckt komisch.'],gebiss:['🦷','Omas Gebiss','Ein Gebiss. Riecht nach Kater und Friedhof.'],brett:['🪵','Brett','Ein Brett aus Opas Ruine. Nur ein bisschen angekokelt.'],teer:['🛢️','Birkenteer','Riecht nach Lagerfeuer und Omas Rheuma.']};
function bjEnter(){if(FL.drin)return enter('innen',[250,470]);say([['P','So. Leiter ans Fenster... festhalten, liebe Hühnerbeine... nicht wackeln...'],['P','*kletter* *kletter* *knarz*']],()=>{FL.drin=1;enter('innen',[250,470])})}
function repairBoat(){say([['P','Brett und Teer! Ich flick Ihnen das Boot.'],['P','*klopf* ... *schmier* ... *klopf* ... *Daumen* ... AUA!'],['F','Junge, du bist ein Held. Das Ding hält jetzt bestimmt eine Woche.'],['F','Hier, meine Säge. Pass auf die Finger auf, die hast du ja schon geübt.'],['P','*bekommt eine Säge*']],()=>{FL.boot=1;['brett','teer'].forEach(i=>inv.splice(inv.indexOf(i),1));inv.push('saege');renderInv()})};
function renderInv(){$('#slots').innerHTML='';inv.forEach(id=>{const it=ITEMS[id]||['❔',id,id],d=document.createElement('div');d.className='slot';d.textContent=it[0];d.title=it[1];
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
game.addEventListener('click',e=>{if($('#fg'))return;if(busy)return advance();if(changing||!S0)return;const h=e.target.closest('.interactive');
  if(h){const id=h.dataset.id,o=T[id];if(!o)return;if(id=='petja'||!o.at)return use(id);return walkTo(o.at[0],o.at[1],()=>use(id))}
  if(e.target.closest('#scene')){const p=svgPt(e);walkTo(p.x,p.y)}});
game.addEventListener('mousemove',e=>{const h=e.target.closest('.interactive');label.textContent=!busy&&h&&T[h.dataset.id]?T[h.dataset.id].n:''});

setTimeout(()=>{enter('wald',[400,476]);setTimeout(()=>{const b=$('#start button');if(b){b.disabled=false;b.textContent='Neues Spiel'}},500)},30);
$('#start button').onclick=e=>{e.stopPropagation();$('#start').remove();say([
  ['P','Uhhh... mein Kopf...'],
  ['P','Wo bin ich? Das ist nicht mein Balkon. Mein Balkon hat weniger... Birken.'],
  ['P','Der Joint von Wowa. Er hat gesagt, da sind „Kräuter von Oma" drin. Was für eine Oma?!'],
  ['P','Ich muss hier irgendwie wieder aufwachen.']])};
