// ================= Realistischer Birkenwald & Weggabelung =================
// Gleiche Mal-Technik wie die realistischen Gegenstände (Apfel, Netz …): Material, Licht von rechts oben, Relief, Kontaktschatten.
// Gilt nur für Szenen mit real:1 (Birkenwald, Weggabelung) – alle anderen Orte malen wie bisher.
//  - Birken: runder Stamm mit Licht und Schattenseite, papierne Rinde mit Lentizellen (feine Querstriche), schwarze, rissige
//    Borkenbänder und Astnarben („Augenbrauen“), abblätternde Rindenlocken mit rotbrauner Innenrinde, dunkler zerfurchter Stammfuß mit Moos
//  - Laub: einzelne spitze Birkenblätter mit Licht/Schatten statt Farbtupfer, im Gegenlicht leuchtend
//  - Weg: festgetretene Erde mit Fahrspuren, Feuchteflecken und Körnung; Kiesel mit Glanzlicht und Schlagschatten; echte gelbe Birkenblätter
//  - Apfelbaum: Borke mit Rissen, sich verjüngende Äste, glänzende Apfelblätter, Äpfel mit Rotbacke, Stiel und Glanzpunkt
SCN.wald.real=1;SCN.gabel.real=1;
SCN.wald.sand=[[92,70,46],[178,150,106]];SCN.gabel.sand=[[100,76,48],[186,156,108]];
let RQ=1;const rr=()=>(RQ=RQ*16807%2147483647)/2147483647,rseed=v=>{RQ=Math.abs(Math.floor(v*1000))%2147483000+11;rr();rr()};
const isReal=()=>S0&&S0.real;

// ---------- Birke ----------
const _birch=birch;
birch=function(x,X,base,w,L,top=-12,ps){if(!isReal())return _birch(x,X,base,w,L,top,ps);
  ps=ps||birchPath(X,base,w,L,top);const p=new Path2D(ps),h=base-top,s=Math.max(.35,w/16);rseed(X*7.3+base*.37+w);
  const cxk=k=>X+L*k*k,wk=k=>w*(1-k*.42);
  // Grundton: runder Stamm, Licht von rechts oben (wie Laub und Kiesel)
  const g=x.createLinearGradient(X-w/2,0,X+w/2,0);
  [[0,'#3c3934'],[.1,'#6e6a60'],[.3,'#b8b3a4'],[.55,'#e9e5d9'],[.72,'#faf8f1'],[.86,'#d6d1c3'],[1,'#5c584f']].forEach(([o,k])=>g.addColorStop(o,k));
  x.fillStyle=g;x.fill(p);x.save();x.clip(p);
  // warme/kühle Farbwolken (Birkenrinde ist nie reinweiß: rosa, cremig, grau)
  for(let i=0;i<h/18;i++){const k=rr(),Y=base-k*h;dab(x,cxk(k)+(rr()-.5)*wk(k)*.6,Y,wk(k)*(.5+rr()*.7),rr()<.5?[236,212,196]:rr()<.5?[150,150,138]:[240,232,206],.18+rr()*.16)}
  // Lentizellen: feine dunkle Querstriche, zum Rand hin kürzer (Rundung), darunter heller Grat
  const nL=Math.min(3200,h*w/5);x.lineCap='round';
  for(let i=0;i<nL;i++){const k=rr(),Y=base-k*h,c0=cxk(k),ww=wk(k),u=(rr()*2-1)*.96,xm=c0+u*ww/2,len=ww*(.04+rr()*.16)*(1-Math.abs(u)*.65),bend=u*len*.12;
    x.strokeStyle=`rgba(${60+rr()*30},${52+rr()*24},${44+rr()*20},${.28+rr()*.4})`;x.lineWidth=(.22+rr()*.42)*s;x.beginPath();x.moveTo(xm-len/2,Y-bend);x.lineTo(xm+len/2,Y+bend);x.stroke();
    if(rr()<.35){x.strokeStyle='rgba(255,252,244,.4)';x.lineWidth=.25*s;x.beginPath();x.moveTo(xm-len/2,Y-bend+.45*s);x.lineTo(xm+len/2,Y+bend+.45*s);x.stroke()}}
  // schwarze, rissige Borkenbänder: zerfranste Ränder, oft von einer Seite her, unten häufiger
  const jag=(x0,x1,Y,th)=>{const n=Math.max(3,Math.round((x1-x0)/(1.4*s))),up=[],dn=[];for(let i=0;i<=n;i++){const t=i/n,xx=x0+(x1-x0)*t,e=Math.sin(t*Math.PI);up.push([xx,Y-th*e*(.5+rr()*.7)-rr()*.6*s]);dn.push([xx,Y+th*e*(.3+rr()*.6)+rr()*.5*s])}
    x.beginPath();x.moveTo(...up[0]);up.forEach(q=>x.lineTo(...q));dn.reverse().forEach(q=>x.lineTo(...q));x.closePath()};
  for(let i=0;i<h/9;i++){const k=Math.pow(rr(),1.4),Y=base-k*h,c0=cxk(k),ww=wk(k),l=ww*(.18+rr()*.7),side=rr(),x0=side<.4?c0-ww/2-1:side<.8?c0+ww/2-l+1:c0-ww/2+rr()*(ww-l),th=(.5+rr()*2.4)*s*(1+(1-k)*.8);
    jag(x0,x0+l,Y,th);x.fillStyle=`rgba(${18+rr()*14},${16+rr()*12},${14+rr()*10},${.82+rr()*.18})`;x.fill();
    if(th>1.2*s){x.strokeStyle='rgba(120,112,100,.35)';x.lineWidth=.3*s;x.beginPath();x.moveTo(x0+l*.2,Y);x.lineTo(x0+l*.8,Y+(rr()-.5)*th*.4);x.stroke()}}
  // Astnarben: schwarze „Augenbrauen“ (umgedrehtes V) dort, wo früher Äste waren
  if(w>5)for(let i=0;i<h/70;i++){const k=.15+rr()*.75,Y=base-k*h,c0=cxk(k)+(rr()-.5)*wk(k)*.35,a=wk(k)*(.25+rr()*.25),d=a*(.35+rr()*.25),t=(1+rr())*s;
    x.fillStyle='rgba(20,18,16,.9)';x.beginPath();x.moveTo(c0-a,Y+d);x.quadraticCurveTo(c0-a*.4,Y-t,c0,Y-t*.6);x.quadraticCurveTo(c0+a*.4,Y-t,c0+a,Y+d);
    x.quadraticCurveTo(c0+a*.45,Y+t*.4,c0,Y+t*.9);x.quadraticCurveTo(c0-a*.45,Y+t*.4,c0-a,Y+d);x.fill();ell(x,c0,Y+t*.3,t*.7,t*.5,[60,40,30],.8)}
  // abblätternde Rindenlocken: rotbraune Innenrinde, darüber eine helle eingerollte Papierlocke mit Schatten
  if(w>9)for(let i=0;i<h/70;i++){const k=.2+rr()*.7,Y=base-k*h,c0=cxk(k),ww=wk(k),xm=c0+(rr()-.3)*ww*.7,rx=ww*(.05+rr()*.1),ry=(.6+rr()*1.1)*s;
    ell(x,xm,Y,rx,ry,[150+rr()*30,112+rr()*20,88+rr()*14],.5);ell(x,xm,Y+ry*.6,rx*.9,ry*.35,[60,40,30],.45);
    x.strokeStyle='rgba(255,253,246,.95)';x.lineWidth=(.5+rr()*.6)*s;x.beginPath();x.ellipse(xm,Y-ry*.8,rx*1.05,ry*.7,0,Math.PI*1.05,Math.PI*1.95);x.stroke();
    x.strokeStyle='rgba(60,50,40,.4)';x.lineWidth=.35*s;x.beginPath();x.ellipse(xm,Y-ry*.45,rx,ry*.5,0,Math.PI*1.1,Math.PI*1.9);x.stroke()}
  // Stammfuß: dunkle, tief zerfurchte Borke mit gezacktem Übergang, helle Grate, Moos auf der Schattenseite
  if(base>top+20){const bh=Math.min(h*.32,h*(.07+w/140)),wb=w*1.25,n=Math.max(6,Math.round(wb/(1.6*s)));
    // gezackter Übergang: Borkenzungen ziehen unterschiedlich weit hoch, darüber ausfransende dunkle Inseln
    x.beginPath();x.moveTo(X-wb/2,base+2);for(let i=0;i<=n;i++){const t=i/n,xx=X-wb/2+wb*t,tg=rr()<.3?rr()*.9:0;x.lineTo(xx,base-bh*(.3+fbm(xx*.9,base*.1,3)*.6+tg))}x.lineTo(X+wb/2,base+2);x.closePath();
    const bg=x.createLinearGradient(0,base-bh*1.4,0,base);bg.addColorStop(0,'rgba(80,76,68,.88)');bg.addColorStop(.5,'rgba(52,48,42,.94)');bg.addColorStop(1,'rgba(26,24,20,.98)');x.fillStyle=bg;x.fill();
    for(let i=0;i<wb*.5;i++){const xx=X-wb/2+rr()*wb,yy=base-bh*(.8+rr()*.9),l=(1+rr()*3)*s;jag(xx-l,xx+l,yy,(.5+rr()*1.4)*s);x.fillStyle=`rgba(40,36,32,${.5+rr()*.4})`;x.fill()}
    for(let i=0;i<wb*1.6;i++){const xx=X-wb/2+rr()*wb,hh=bh*(.3+rr()*.9),wd=(.4+rr()*1.2)*s;
      x.strokeStyle=`rgba(${120+rr()*40},${114+rr()*36},${100+rr()*30},${.35+rr()*.35})`;x.lineWidth=wd;x.beginPath();x.moveTo(xx,base+1);x.bezierCurveTo(xx+(rr()-.5)*2*s,base-hh*.4,xx+(rr()-.5)*3*s,base-hh*.7,xx+(rr()-.5)*2*s,base-hh);x.stroke();
      x.strokeStyle='rgba(8,7,6,.7)';x.lineWidth=wd*.7;x.beginPath();x.moveTo(xx+wd,base+1);x.lineTo(xx+wd+(rr()-.5)*2*s,base-hh*.8);x.stroke()}
    for(let i=0;i<wb*.9;i++){const xx=X-wb/2+Math.pow(rr(),1.6)*wb*.75,yy=base-rr()*bh*.55;dab(x,xx,yy,(1.2+rr()*2.4)*s,mix([40,70,22],[112,144,44],rr()),.55)}}
  // Rundung über alles: Texturen folgen dem Stamm (Schattenseite links dunkler, Glanzkante rechts)
  const sh=x.createLinearGradient(X-w/2,0,X+w/2,0);sh.addColorStop(0,'rgba(10,12,8,.55)');sh.addColorStop(.32,'rgba(10,12,8,.12)');sh.addColorStop(.6,'rgba(10,12,8,0)');sh.addColorStop(.9,'rgba(10,12,8,.08)');sh.addColorStop(1,'rgba(10,12,8,.45)');
  x.fillStyle=sh;x.fillRect(X-w,top-4,w*2+Math.abs(L),h+8);
  x.save();x.globalCompositeOperation='lighter';const hl=x.createLinearGradient(X-w/2,0,X+w/2,0);hl.addColorStop(.62,'rgba(255,240,210,0)');hl.addColorStop(.74,'rgba(255,240,210,.14)');hl.addColorStop(.84,'rgba(255,240,210,0)');x.fillStyle=hl;x.fillRect(X-w,top-4,w*2+Math.abs(L),h+8);x.restore();
  // Bodenschatten am Fuß, Kronenschatten oben
  const ao=x.createLinearGradient(0,base-h*.05,0,base);ao.addColorStop(0,'rgba(10,14,6,0)');ao.addColorStop(1,'rgba(10,14,6,.55)');x.fillStyle=ao;x.fillRect(X-w*2,base-h*.05,w*4,h*.05+2);
  if(top<100){const tg=x.createLinearGradient(0,top,0,top+150);tg.addColorStop(0,'rgba(24,40,14,.65)');tg.addColorStop(1,'rgba(24,40,14,0)');x.fillStyle=tg;x.fillRect(X-w*2+L,top,w*4,150)}
  x.restore();x.strokeStyle='rgba(30,28,22,.4)';x.lineWidth=.6;x.stroke(p)};

// ---------- Laub: einzelne Birkenblätter ----------
// spitz-eiförmiges Blatt (Birke: dreieckig mit Spitze), Oberseite heller, Mittelrippe bei großen Blättern
function leaf(x,X,Y,sz,rot,k,a){const c=Math.cos(rot),s=Math.sin(rot),P=(u,v)=>[X+u*c-v*s,Y+u*s+v*c],b=P(-sz*.8,0),t=P(sz*1.1,0),l=P(-sz*.1,-sz*.72),r=P(-sz*.1,sz*.72);
  x.fillStyle=rgba(k,a);x.beginPath();x.moveTo(...b);x.quadraticCurveTo(...l,...t);x.quadraticCurveTo(...r,...b);x.fill();
  if(sz>1.6){x.strokeStyle=rgba(mix(k,[0,0,0],.3),.5);x.lineWidth=.22;x.beginPath();x.moveTo(...b);x.lineTo(...t);x.stroke()}}
const _foliage=foliage;
foliage=function(x,X,Y,r,dk,nh){if(!isReal())return _foliage(x,X,Y,r,dk,nh);const f=S0.fol;
  for(let i=0;i<5;i++)dab(x,X+(R()-.5)*r,Y+(R()-.5)*r*.6,r*.75,dk?[8,24,8]:mix(f[0],[0,0,0],.3),.5);
  // feine Zweige im Inneren
  if(!dk&&r>12){x.lineCap='round';for(let i=0;i<r/6;i++){const a=R()*6.283,L0=r*(.4+R()*.5);x.strokeStyle='rgba(54,44,34,.55)';x.lineWidth=.4+R()*.5;x.beginPath();x.moveTo(X,Y);x.quadraticCurveTo(X+Math.cos(a)*L0*.5,Y+Math.sin(a)*L0*.3+3,X+Math.cos(a)*L0,Y+Math.sin(a)*L0*.6+4);x.stroke()}}
  for(let i=0;i<r*r*.3;i++){const a=R()*6.283,dd=Math.pow(R(),.6)*r,ox=Math.cos(a)*dd,oy=Math.sin(a)*dd*.72,lt=cl((ox*SD[0]+oy*SD[1])/r*.6+.45+(R()-.5)*.5);
    const k=dk?mix([10,30,10],[40,80,24],lt):lt<.5?mix(f[0],f[1],lt*2):mix(f[1],f[2],(lt-.5)*2);leaf(x,X+ox,Y+oy,1.1+R()*1.3,1.2+(R()-.5)*1.6,k,.94)}
  // Gegenlicht: einzelne Blätter auf der Lichtseite leuchten gelbgrün durch
  if(!dk){x.save();x.globalCompositeOperation='lighter';for(let i=0;i<r*.9;i++){const a=-.9+(R()-.5)*1.4,dd=r*(.5+R()*.5);leaf(x,X+Math.cos(a)*dd,Y+Math.sin(a)*dd*.72,1.2+R(),1.2+(R()-.5)*1.4,[90,96,30],.35)}x.restore()}
  if(!nh)for(let i=0;i<r/10;i++)hang(x,X+(R()-.5)*r*1.2,Y+r*.3,14+R()*26)};
const _hang=hang;
hang=function(x,X,Y,len){if(!isReal())return _hang(x,X,Y,len);const b=(R()-.5)*14,f=S0.fol;x.strokeStyle='rgba(66,52,40,.75)';x.lineWidth=.55;x.beginPath();x.moveTo(X,Y);x.quadraticCurveTo(X+b,Y+len*.5,X+b*.6,Y+len);x.stroke();
  for(let k=0;k<len;k+=2.4){const t=k/len,px=X+b*2*t*(1-t)+b*.6*t*t;leaf(x,px+(R()-.5)*3.4,Y+k,1+R()*1.1,1.57+(R()-.5)*1.6,mix(f[1],f[2],R()*.8),.92)}};

// ---------- Weg: Erde, Körnung, Kiesel, Laub ----------
const _ground=ground;
ground=function(o){_ground(o);if(!o.real)return;const y0=Math.floor(o.hz*SC),h=H-y0,im=c.getImageData(0,y0,W,h),d=im.data;
  for(let py=0;py<h;py++){const Y=(py+y0)/SC,t=Math.max(0,(Y-o.hz)/(500-o.hz));
    for(let px=0;px<W;px++){const X=px/SC,p=o.pe(X,Y);if(!p||p[0]<-2)continue;const i=(py*W+px)*4,m=sst(-2,6+t*10,p[0]);if(m<=0)continue;
      // Körnung: helle Sandkörner und dunkle Krümel (Größe wächst nach vorn), Feuchteflecken, Fahrspuren, festgetretene Mitte
      const gr=vn(X*(2.6-t*1.6),Y*(5-t*3.2)),gr2=vn(X*1.1+40,Y*2.2),wet=sst(.55,.75,fbm(X/30+3,Y/(6+t*14),3)),rut=Math.exp(-Math.pow((p[1]-p[2]*.42)/(p[2]*.12+1),2)),mid=Math.exp(-Math.pow(p[1]/(p[2]*.3+1),2));
      let f=1+(gr>.78?.22:gr<.2?-.2:0)+(gr2>.82?.1:gr2<.15?-.12:0);f*=1-wet*.22-rut*.2+mid*.06;
      const k=[d[i]*f,d[i+1]*f*.98,d[i+2]*f*.93];d[i]+=(k[0]-d[i])*m;d[i+1]+=(k[1]-d[i+1])*m;d[i+2]+=(k[2]-d[i+2])*m}}
  c.putImageData(im,0,y0)};
// Kiesel: unregelmäßig, mehrfarbig, Glanzlicht rechts oben, Schlagschatten links unten, teils eingesunken
function pebble(x,X,Y,sz){const k=rr()<.6?mix([112,104,94],[196,188,172],rr()):rr()<.5?mix([130,96,70],[186,150,112],rr()):mix([80,82,80],[150,152,146],rr()),rot=(rr()-.5)*.6,ry=sz*(.45+rr()*.25);
  ell(x,X-sz*.35,Y+ry*.45,sz*1.15,ry*.75,[30,22,14],.5);
  const g=x.createRadialGradient(X+sz*.35,Y-ry*.45,0,X,Y,sz*1.05);g.addColorStop(0,rgba(mix(k,[255,255,250],.55)));g.addColorStop(.45,rgba(k));g.addColorStop(1,rgba(mix(k,[0,0,0],.55)));
  x.fillStyle=g;x.beginPath();x.ellipse(X,Y,sz,ry,rot,0,7);x.fill();
  if(rr()<.4)ell(x,X,Y+ry*.55,sz*1.05,ry*.4,[110,86,58],.75)}
const _details=details;
details=function(x){if(!isReal())return _details(x);const o=S0;rseed(o.seed*13);
  for(let i=0;i<o.nfl;i++){const Y=o.hz+8+Math.pow(R(),.8)*(492-o.hz),X=R()*800,t=(Y-o.hz)/(500-o.hz);if(inP(X,Y)||Y<o.gtop(X)+3)continue;
    const k=o.fl[R()*o.fl.length|0],r=.5+t*2.2;dab(x,X,Y,r*1.8,k,.5);ell(x,X,Y,r,r*.7,k,.95);ell(x,X+r*.3,Y-r*.25,r*.35,r*.25,[255,255,240],.5)}
  for(let i=0,n=0;i<3000&&n<170;i++){const Y=o.hz+24+rr()*(474-o.hz),X=rr()*800;if(!inP(X,Y))continue;n++;const t=(Y-o.hz)/(500-o.hz);pebble(x,X,Y,(.5+t*3.6)*(.35+rr()*.9))}};
const _leaves=leavesOnPath;
leavesOnPath=function(x,n){if(!isReal())return _leaves(x,n);rseed(n*3.1);
  for(let i=0,k=0;i<n*6&&k<n;i++){const X=rr()*800,Y=S0.hz+40+rr()*(495-S0.hz-40);if(!inP(X,Y))continue;k++;const t=(Y-S0.hz)/(500-S0.hz),sz=1.2+t*3,rot=rr()*6.28,
    col=[[214,170,52],[196,128,40],[226,198,90],[150,104,44],[176,150,60]][rr()*5|0];
    leaf(x,X-sz*.25,Y+sz*.25,sz,rot,[40,30,16],.35);leaf(x,X,Y,sz,rot,col,.95);x.save();x.globalCompositeOperation='multiply';leaf(x,X+Math.cos(rot)*sz*.2,Y+Math.sin(rot)*sz*.2,sz*.6,rot,[200,170,130],.5);x.restore()}};

// ---------- Apfelbaum ----------
const _apple=appleTree;
appleTree=function(x,X,B){if(!isReal())return _apple(x,X,B);rseed(X+B);shadowAt(x,X,B+2,64,.6);x.lineCap='round';
  // Stamm: leicht gedreht, rissige graubraune Borke
  const tw=11,th=46,tp=new Path2D(`M${X-tw*.75},${B+1}C${X-tw*.55},${B-th*.4} ${X-tw*.6},${B-th*.75} ${X-tw*.35},${B-th}L${X+tw*.4},${B-th}C${X+tw*.55},${B-th*.7} ${X+tw*.45},${B-th*.35} ${X+tw*.8},${B+1}Z`);
  let g=x.createLinearGradient(X-tw,0,X+tw,0);g.addColorStop(0,'#241a12');g.addColorStop(.45,'#5a4a3a');g.addColorStop(.72,'#7e6c58');g.addColorStop(1,'#2e241a');x.fillStyle=g;x.fill(tp);
  x.save();x.clip(tp);for(let i=0;i<40;i++){const xx=X-tw+rr()*tw*2,y1=B+2,y2=B-th*(.3+rr()*.8);x.strokeStyle=rr()<.55?`rgba(14,10,6,${.4+rr()*.4})`:`rgba(150,134,112,${.25+rr()*.3})`;x.lineWidth=.5+rr()*1.1;x.beginPath();x.moveTo(xx,y1);x.bezierCurveTo(xx+(rr()-.5)*4,B-th*.3,xx+(rr()-.5)*4,B-th*.6,xx+(rr()-.5)*3,y2);x.stroke()}
  for(let i=0;i<14;i++)dab(x,X-tw*.6+rr()*tw*.5,B-rr()*th*.6,2+rr()*3,mix([60,90,30],[120,150,50],rr()),.5);x.restore();
  // Äste: verjüngend, Oberseite heller
  const br=(x0,y0,a,l,w,dd)=>{if(dd>4)return;const x1=x0+Math.cos(a)*l,y1=y0+Math.sin(a)*l,mx=(x0+x1)/2+(rr()-.5)*l*.35,my=(y0+y1)/2;
    x.strokeStyle='#33261a';x.lineWidth=w;x.beginPath();x.moveTo(x0,y0);x.quadraticCurveTo(mx,my,x1,y1);x.stroke();
    x.strokeStyle='rgba(150,130,104,.55)';x.lineWidth=w*.35;x.beginPath();x.moveTo(x0+w*.2,y0-w*.25);x.quadraticCurveTo(mx+w*.2,my-w*.25,x1,y1-w*.15);x.stroke();
    for(let i=0;i<2+(dd>1);i++)br(x1,y1,a+(rr()-.5)*1.3,l*.66,w*.6,dd+1)};
  [-2.1,-1.6,-1.05].forEach(a=>br(X+(a+1.6)*4,B-th+2,a,26+rr()*8,6.5,0));
  // Krone: dunkle Tiefe, dann ovale, glänzende Apfelblätter (Licht rechts oben)
  const CY=B-th-30;for(let i=0;i<10;i++)dab(x,X+(rr()-.5)*96,CY+(rr()-.5)*46,26,[18,40,12],.55);
  for(let i=0;i<1300;i++){const a=rr()*6.283,dd=Math.pow(rr(),.55),ox=Math.cos(a)*dd*54,oy=Math.sin(a)*dd*34,lt=cl((ox/54*.6-oy/34*.8)*.5+.5+(rr()-.5)*.45),
    k=lt<.5?mix([22,52,16],[58,104,28],lt*2):mix([58,104,28],[150,184,70],(lt-.5)*2);leaf(x,X+ox,CY+oy,1.8+rr()*1.6,rr()*6.28,k,.95);if(lt>.8&&rr()<.3)leaf(x,X+ox+.3,CY+oy-.3,.9,rr()*6.28,[230,240,190],.45)}
  // Äpfel: Kugel mit Rotbacke, gelbgrüner Grundfarbe unten, Stiel und Glanzpunkt
  const apple=(ax,ay,r)=>{ell(x,ax-r*.25,ay+r*.85,r*1.05,r*.4,[10,20,6],.35);const ag=x.createRadialGradient(ax+r*.35,ay-r*.35,0,ax,ay,r*1.05);
    ag.addColorStop(0,'#ff7a52');ag.addColorStop(.35,'#d42a16');ag.addColorStop(.75,'#8e140a');ag.addColorStop(1,'#4a0804');x.fillStyle=ag;x.beginPath();x.ellipse(ax,ay,r,r*.92,0,0,7);x.fill();
    dab(x,ax-r*.35,ay+r*.45,r*.6,[200,170,50],.45);x.strokeStyle='#3a2a14';x.lineWidth=.5;x.beginPath();x.moveTo(ax,ay-r*.8);x.quadraticCurveTo(ax+.4,ay-r*1.3,ax+1,ay-r*1.6);x.stroke();
    ell(x,ax+r*.38,ay-r*.4,r*.28,r*.18,[255,250,240],.85,-.6)};
  for(let i=0;i<20;i++){const a=rr()*6.283,dd=Math.sqrt(rr())*.9,ax=X+Math.cos(a)*dd*50,ay=CY+Math.sin(a)*dd*30+4;apple(ax,ay,2.6+rr()*.9);if(rr()<.4)leaf(x,ax-2,ay-3,2.4,rr()*6.28,[50,96,26],.95)}
  // Fallobst im Gras
  for(let i=0;i<4;i++){const ax=X-34+rr()*68,ay=B+3+rr()*6;apple(ax,ay,2.4+rr()*.5);dab(x,ax,ay+1.4,3,[40,30,10],.25)}};
