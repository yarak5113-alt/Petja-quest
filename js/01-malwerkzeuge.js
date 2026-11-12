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
// Realistische Holzmaserung: einmal berechnete Texturen (Jahresringe, Fasern, Äste, leichte Verwitterung) als Muster;
// darüber die Rundung des Bretts/Balkens (Licht von oben bzw. links) und feine Risse. Die Zufallsfolge R() bleibt wie früher.
const WOODTEX={};
function woodTex(vert){const k=vert?'v':'h';if(WOODTEX[k])return WOODTEX[k];const TW=384,TH=96,c0=document.createElement('canvas');c0.width=TW;c0.height=TH;const g0=c0.getContext('2d'),im=g0.createImageData(TW,TH),d=im.data;
  const knots=[[60,30,9],[170,70,7],[290,22,11],[340,64,6],[120,84,5]];
  for(let py=0;py<TH;py++)for(let px=0;px<TW;px++){let ph=py*.62+fbm(px/70,py/9,4)*16+Math.sin(px/37)*1.5,dk=0;
    for(const[kx,ky,kr]of knots){const dx=(px-kx)/(kr*2.6),dy=(py-ky)/kr,dd=dx*dx+dy*dy;ph+=7*Math.exp(-dd*.8)*Math.sign(py-ky||1);if(dd<1.1)dk=Math.max(dk,1-dd/1.1)}
    const ring=.5+.5*Math.sin(ph),late=Math.pow(ring,6),fib=vn(px/1.3,py*2.6),blot=fbm(px/40+5,py/14,3);
    let r=96+60*ring-34*late+22*(fib-.5)+30*(blot-.5),gg=r*.68+4,b=r*.4+2;const gr=(r+gg+b)/3,wt=.18*sst(.55,.8,blot);r+=(gr-r)*wt;gg+=(gr-gg)*wt;b+=(gr-b)*wt;
    r*=1-dk*.62;gg*=1-dk*.66;b*=1-dk*.7;const i=(py*TW+px)*4;d[i]=r;d[i+1]=gg;d[i+2]=b;d[i+3]=255}
  g0.putImageData(im,0,0);let c1=c0;if(vert){c1=document.createElement('canvas');c1.width=TH;c1.height=TW;const g1=c1.getContext('2d');g1.translate(TH,0);g1.rotate(Math.PI/2);g1.drawImage(c0,0,0)}
  return WOODTEX[k]=c1}
// Bretterfläche (Dach): Viereck A-B oben, D-C unten; n Bretter von oben nach unten, jedes mit Maserung, eigener Helligkeit,
// dunkler Fuge und heller Kante; gr = Verwitterung (vergraut). Keine Zufallszahlen aus R() -> Szenen bleiben unverändert.
function planks(x,A,B,D,C,n,gr=.35){const L=(p,q,t)=>[p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t],ang=Math.atan2(D[1]-A[1],D[0]-A[0])-Math.PI/2,pat=x.createPattern(woodTex(true),'repeat');
  pat.setTransform(new DOMMatrix().translate(A[0],A[1]).rotate(ang*180/Math.PI).scale(.5));
  for(let i=0;i<n;i++){const t0=i/n,t1=(i+1)/n,a=L(A,B,t0),b=L(A,B,t1),c=L(D,C,t1),d=L(D,C,t0),p=new Path2D('M'+[a,b,c,d].map(q=>q.join(',')).join('L')+'Z'),v=rn(i*13+(A[0]|0),i*7+(A[1]|0));
    x.fillStyle=pat;x.fill(p);x.fillStyle=`rgba(${120+v*30|0},${118+v*26|0},${112+v*20|0},${gr})`;x.fill(p);x.fillStyle=`rgba(0,0,0,${.08+v*.22})`;x.fill(p);
    x.strokeStyle='rgba(8,5,2,.85)';x.lineWidth=1.1;x.beginPath();x.moveTo(...a);x.lineTo(...d);x.stroke();x.strokeStyle='rgba(255,236,200,.18)';x.lineWidth=.7;const e=L(a,b,.12),f=L(d,c,.12);x.beginPath();x.moveTo(...e);x.lineTo(...f);x.stroke()}
  const g=x.createLinearGradient(...A,...D);g.addColorStop(0,'rgba(0,0,0,.25)');g.addColorStop(.2,'rgba(0,0,0,0)');g.addColorStop(.85,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.4)');x.fillStyle=g;x.fill(new Path2D('M'+[A,B,C,D].map(q=>q.join(',')).join('L')+'Z'))}
function wood(x,x0,y0,w,h,vert){x.save();x.beginPath();x.rect(x0,y0,w,h);x.clip();
  const pat=x.createPattern(woodTex(vert),'repeat'),ox=rn(x0*7|0,y0*3|0)*384,oy=rn(y0*5|0,x0*11|0)*96;pat.setTransform(new DOMMatrix().translate(vert?x0-oy:x0-ox,vert?y0-ox:y0-oy).scale(.55));
  x.fillStyle=pat;x.fillRect(x0,y0,w,h);
  // Rundung: Licht oben/links, Schatten unten/rechts, dunkle Kanten
  const g=vert?x.createLinearGradient(x0,0,x0+w,0):x.createLinearGradient(0,y0,0,y0+h);
  g.addColorStop(0,'rgba(18,10,2,.62)');g.addColorStop(.18,'rgba(255,226,176,.2)');g.addColorStop(.42,'rgba(255,226,176,.06)');g.addColorStop(.7,'rgba(10,6,0,.12)');g.addColorStop(.92,'rgba(10,6,0,.45)');g.addColorStop(1,'rgba(6,3,0,.75)');
  x.fillStyle=g;x.fillRect(x0,y0,w,h);
  for(let i=0;i<(vert?h:w)/2;i++){x.strokeStyle=`rgba(30,18,6,${(.2+R()*.4)*.45})`;x.lineWidth=.3+R()*.4;x.beginPath();if(vert){const px=x0+R()*w;x.moveTo(px,y0);x.lineTo(px+(R()-.5)*1.5,y0+h)}else{const py=y0+R()*h;x.moveTo(x0,py);x.lineTo(x0+w,py+(R()-.5)*1.5)}x.stroke()}
  x.restore()}
// Holzschild: Pfosten + Bretter [Richtung -1/1, Versatz y, Text, Hit-ID]; setzt die Klickflächen im SVG
function sign(x,X,B,s,boards){s*=1.35;
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