// ================= Nastja: Privattanz-Engine (Puppet-Rig, Jiggle-Physik, 8 Richtungen, Ich-Sicht, Vibe-Meter) =================
// Outfit-Stufen nach Beziehung (Anwerben gibt 15 %, 37-beziehungen.js):
//   < 25 %  kein Privattanz · 25–49 % Standard-Outfit · 50–79 % VIP-Outfit · 80–100 % Dessous · 100 % Polaroid (39-enden.js)
// Beim ersten Tanz in einem neuen Outfit macht Petja die Augen zu, sie zieht sich um, dann geht's los.
//
// Aufbau des Renderers (alles pro Bild, ohne Handarbeit am Sprite):
//   naRig(bild)     zerlegt das Pixelbild einmalig in Schichten: Körper (Stiefel/Beine/Hüfte/Korsett/Oberkörper) und Haare.
//                   Haare = blonde Töne (Farbton ≥ 34,5°, Sättigung ≥ 0,23), Konturpixel gehen zur Schicht, an der sie hängen.
//   naZeichne()     zeichnet beide Schichten in 2-px-Zeilenstreifen. Jede Zeile bekommt eine eigene Verschiebung:
//                   Stiefel fest → Knie → Hüfte (Sinus) → Taille → Brust (gegenläufig + Feder) → Kopf. Das ist ein 1D-Mesh-Warp,
//                   deshalb biegt sich der Körper weich statt zu springen.
//   Federn          Brust: gedämpfte Feder (3 Hz, ζ 0,2), angetrieben von der Beschleunigung des Wippens und der Hüfte.
//                   Haare: hängen dem Kopf 0,15 s hinterher (Ringpuffer) und schwingen mit einer weicheren Feder (1,8 Hz) nach;
//                   bei Drehungen fächern sie auf.
//   8 Richtungen    directionIndex 0–7 (0° vorn, 45° vorn-rechts, 90° Profil rechts … 315° vorn-links). Hat ein Outfit für eine
//                   Richtung ein eigenes Bild (NA_SKINS.<outfit>.dirs[i] = Image), wird es benutzt. Sonst rechnet die Engine die
//                   Drehung aus der Frontansicht: Breite mit |cos θ|, Schattierung zur abgewandten Seite, Rückansicht gespiegelt
//                   und abgedunkelt mit den Haaren VOR dem Körper und Hinterkopf statt Gesicht.
//   Vibe-Meter      Leertaste / Klick im Takt (100 BPM, ±0,13 s) füllt es, daneben kostet etwas; Maus im Kreis bewegen dreht
//                   Nastja mit und gibt auch Vibe. Viel Vibe = größere Bewegungen, mehr Glitzer, am Ende Bonus-Beziehung (max. +10).

const NA_STUFEN=[[80,'dessous'],[50,'vip'],[25,'standard']];
const nastjaSkin=(v=relOf('Nastja'))=>{for(const[g,k]of NA_STUFEN)if(v>=g)return k;return null};
// Zonen als Anteil der Bildhöhe (von oben): Hals, Brust, Taille, Hüfte, Knie, Haarende
const NA_SKINS={
  standard:{bild:()=>typeof nastjaTanzBild=='function'?nastjaTanzBild('tanz1'):null,zonen:{hals:.22,brust:.33,taille:.43,huefte:.53,knie:.76,haar:.62},dirs:[]},
  vip:{bild:()=>NASTJA_VIP_IMG[0],zu:()=>NASTJA_VIP_IMG[1],zonen:{hals:.2,brust:.3,taille:.42,huefte:.52,knie:.75,haar:.62},dirs:[]},
  dessous:{bild:()=>NASTJA_DES_IMG,zonen:{hals:.19,brust:.28,taille:.4,huefte:.5,knie:.74,haar:.62},dirs:[]}};
const NA_RICHTUNG=['vorn','vorn-rechts','Profil rechts','hinten-rechts','hinten','hinten-links','Profil links','vorn-links'];

// Bonus aus dem Vibe-Meter fließt in die Beziehung (je +5, höchstens zweimal)
{const f=REL['Nastja'];REL['Nastja']=()=>f()+Math.min(2,FL.na_vibe||0)*5}

// ---------- Rig: Bild in Körper- und Haarschicht zerlegen ----------
function naRig(img,zonen){if(!img||!img.complete||!img.naturalWidth)return null;if(img._naRig)return img._naRig;
  const w=img.naturalWidth,h=img.naturalHeight,c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');g.drawImage(img,0,0);
  const id=g.getImageData(0,0,w,h),d=id.data,typ=new Uint8Array(w*h),haarBis=h*zonen.haar;   // 0 leer · 1 Körper · 2 Haar · 3 Kontur
  let hr=0,hg=0,hb=0,hn=0;
  for(let k=0;k<w*h;k++){const q=k*4;if(d[q+3]<128)continue;const r=d[q],gg=d[q+1],b=d[q+2];
    if(r===46&&gg===28&&b===16){typ[k]=3;continue}
    const mx=Math.max(r,gg,b),mn=Math.min(r,gg,b),dl=mx-mn,s=mx?dl/mx:0;let H=0;if(dl){H=mx===r?((gg-b)/dl)%6:mx===gg?(b-r)/dl+2:(r-gg)/dl+4;H*=60;if(H<0)H+=360}
    if(H>=34.5&&H<=60&&s>=.23&&mx>=140&&k/w<haarBis){typ[k]=2;hr+=r;hg+=gg;hb+=b;hn++}else typ[k]=1}
  // Kontur: gehört zum Haar, wenn in 2 px Haar liegt und kein Körper
  const t2=typ.slice();for(let y=0;y<h;y++)for(let x=0;x<w;x++){const k=y*w+x;if(typ[k]!==3)continue;let haar=0,koerper=0;
    for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++){const X=x+dx,Y=y+dy;if(X<0||Y<0||X>=w||Y>=h)continue;const t=typ[Y*w+X];if(t===2)haar=1;else if(t===1)koerper=1}
    t2[k]=haar&&!koerper?2:1}
  const lay=want=>{const o=document.createElement('canvas');o.width=w;o.height=h;const og=o.getContext('2d'),oi=og.createImageData(w,h);
    for(let k=0;k<w*h;k++)if(t2[k]===want){const q=k*4;oi.data[q]=d[q];oi.data[q+1]=d[q+1];oi.data[q+2]=d[q+2];oi.data[q+3]=255}og.putImageData(oi,0,0);return o};
  // Kopf (Gesicht) über dem Hals: für die Rückansicht mit Hinterkopf übermalen
  let x0=w,x1=0,y0=h,y1=0;const hals=h*zonen.hals;for(let y=0;y<hals;y++)for(let x=0;x<w;x++)if(t2[y*w+x]===1&&typ[y*w+x]===1){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y)}
  // Rückansicht: Haarvorhang – jede Zeile von der linken bis zur rechten Haarkante, mit Strähnen und Kontur
  const haarFarbe=hn?[hr/hn|0,hg/hn|0,hb/hn|0]:[216,192,138],rk=document.createElement('canvas');rk.width=w;rk.height=h;
  {const rg=rk.getContext('2d'),ri=rg.createImageData(w,h),rd=ri.data,L=new Int16Array(h).fill(-1),R=new Int16Array(h).fill(-1);
    const ende=Math.round(h*(zonen.huefte-.015));   // Vorhang endet knapp über der Hüfte (darunter würden Hautschatten mitzählen)
    for(let y=0;y<ende;y++)for(let x=0;x<w;x++)if(t2[y*w+x]===2){if(L[y]<0)L[y]=x;R[y]=x}
    // Kanten glätten: Median über ±6 Zeilen, Lücken überbrücken
    const med=(A,y)=>{const v=[];for(let i=-6;i<=6;i++){const k=y+i;if(k>=0&&k<ende&&A[k]>=0)v.push(A[k])}if(!v.length)return-1;v.sort((a,b)=>a-b);return v[v.length>>1]};
    const L2=new Int16Array(h).fill(-1),R2=new Int16Array(h).fill(-1);let start=-1;for(let y=0;y<ende;y++)if(L[y]>=0&&R[y]-L[y]>=6){start=y;break}
    if(start>=0)for(let y=start;y<ende;y++){L2[y]=med(L,y);R2[y]=med(R,y)}
    for(let y=start+1;y>0&&y<ende;y++)if(L2[y]<0&&L2[y-1]>=0){L2[y]=L2[y-1];R2[y]=R2[y-1]}
    // unten rund auslaufen lassen
    for(let i=0;i<10;i++){const y=ende-1-i;if(y<0||L2[y]<0)continue;const e=Math.round((1-Math.sqrt(1-((10-i)/10)**2))*(R2[y]-L2[y])*.18);L2[y]+=e;R2[y]-=e}
    L.set(L2);R.set(R2);
    for(let y=0;y<h;y++){if(L[y]<0)continue;const wy=R[y]-L[y];if(wy<6)continue;
      for(let x=L[y];x<=R[y];x++){const q=(y*w+x)*4,rand=x-L[y]<2||R[y]-x<2,unten=y+2<h&&(L[y+2]<0||x<L[y+2]||x>R[y+2]);
        const strähne=.82+.18*Math.sin(x*.9+Math.sin(y*.05+x*.3)*2)+(((x*7+((y/9)|0)*13)%11)===0?-.18:0);
        const f=rand||unten?0:Math.max(.55,Math.min(1.12,strähne));
        if(!f){rd[q]=46;rd[q+1]=28;rd[q+2]=16}else{rd[q]=Math.min(255,haarFarbe[0]*f);rd[q+1]=Math.min(255,haarFarbe[1]*f);rd[q+2]=Math.min(255,haarFarbe[2]*f)}rd[q+3]=255}}
    rg.putImageData(ri,0,0)}
  return img._naRig={w,h,koerper:lay(1),haar:lay(2),ruecken:rk,haarFarbe:`rgb(${haarFarbe.join(',')})`,kopf:x1>x0?{x0,x1,y0,y1}:null}}

// ---------- Weiche Stützstellen-Kurve (Kosinus zwischen den Knoten) ----------
const naKurve=(knoten,y)=>{if(y<=knoten[0][0])return knoten[0][1];for(let i=1;i<knoten.length;i++){const[a,va]=knoten[i-1],[b,vb]=knoten[i];
  if(y<=b){const p=(y-a)/(b-a),e=(1-Math.cos(p*Math.PI))/2;return va+(vb-va)*e}}return knoten[knoten.length-1][1]};

// ---------- Eine Schicht in Zeilenstreifen zeichnen (Ursprung: unten Mitte) ----------
function naStreifen(x,src,w,h,dxF,dyF,sxF){const S=2;for(let y=0;y<h;y+=S){const n=Math.min(S,h-y),a=y+dyF(y),b=y+n+dyF(y+n),sx=sxF?sxF(y):1;
  x.drawImage(src,0,y,w,n,-w/2*sx+dxF(y),a-h,w*sx,b-a+.6)}}

// ---------- Tänzerin zeichnen (in den Zwischenpuffer, dann mit Richtung/Schatten auf die Bühne) ----------
const NA_PUF=document.createElement('canvas');NA_PUF.width=420;NA_PUF.height=560;
function naZeichne(x,rig,z,st,theta){const p=NA_PUF.getContext('2d'),{w,h}=rig,Y=k=>h*k;
  p.setTransform(1,0,0,1,0,0);p.clearRect(0,0,NA_PUF.width,NA_PUF.height);p.imageSmoothingEnabled=false;p.translate(NA_PUF.width/2,NA_PUF.height-14);
  const c=Math.cos(theta),hinten=c<0;
  // Zeilen-Verschiebungen (Sprite-Pixel)
  const knX=[[0,st.kopf],[Y(z.hals),st.kopf*.6+st.brust*.4],[Y(z.brust),st.brust],[Y(z.taille),(st.brust+st.huefte)/2],[Y(z.huefte),st.huefte],[Y(z.knie),st.huefte*.3],[h,0]];
  const bell=y=>Math.exp(-(((y-Y(z.brust))/(h*.045))**2));
  const dxK=y=>naKurve(knX,y)+st.jigX*bell(y);
  const dyK=y=>{const bein=Math.max(0,Math.min(1,(h-y)/(h-Y(z.huefte))));return st.wipp*bein+st.jigY*bell(y)};
  const wH=y=>Math.max(0,Math.min(1,(y-Y(z.hals)+h*.04)/(Y(z.haar)-Y(z.hals))));
  const dxH=y=>st.kopf+wH(y)*st.haar,sxH=y=>1+wH(y)*st.faecher,dyH=y=>st.wipp*.95+wH(y)*st.haarY;
  if(!hinten){naStreifen(p,rig.haar,w,h,dxH,dyH,sxH);naStreifen(p,rig.koerper,w,h,dxK,dyK)}
  else{p.filter='brightness(.72) saturate(.9)';naStreifen(p,rig.koerper,w,h,dxK,dyK);p.filter='none';
    naStreifen(p,rig.haar,w,h,dxH,dyH,sxH);naStreifen(p,rig.ruecken,w,h,dxH,dyH,sxH)}   // Haarspitzen, darüber der Haarvorhang (verdeckt Gesicht und Rücken)
  // Schatten zur abgewandten Seite (nur auf der Figur)
  const s=Math.sin(theta),a=Math.min(.42,Math.abs(s)*.42);if(a>.01){p.setTransform(1,0,0,1,0,0);p.globalCompositeOperation='source-atop';
    const gr=p.createLinearGradient(0,0,NA_PUF.width,0),dunkel=`rgba(25,4,18,${a})`,klar='rgba(25,4,18,0)';
    if(s>0){gr.addColorStop(0,klar);gr.addColorStop(.62,klar);gr.addColorStop(1,dunkel)}else{gr.addColorStop(0,dunkel);gr.addColorStop(.38,klar);gr.addColorStop(1,klar)}
    p.fillStyle=gr;p.fillRect(0,0,NA_PUF.width,NA_PUF.height);p.globalCompositeOperation='source-over'}
  // auf die Bühne: Breite folgt |cos θ| (Pseudo-3D), Rückseite gespiegelt
  const brt=(.35+.65*Math.abs(c))*(hinten?-1:1);
  x.save();x.scale(brt,1);x.imageSmoothingEnabled=false;x.drawImage(NA_PUF,-NA_PUF.width/2,-(NA_PUF.height-14));x.restore()}

// ---------- Die Szene ----------
async function nastjaShow(skin,enthuellen){const SK=NA_SKINS[skin]||NA_SKINS.standard,VON=cur||'buehne',VPOS=cur?[P.x,P.y]:[260,486];
  changing=true;fade.style.opacity=1;await new Promise(r=>setTimeout(r,450));S0=SCN.lounge;s=S0.seed;
  if(!cache.lounge){S0.paint();const k=document.createElement('canvas');k.width=W;k.height=H;k.getContext('2d').drawImage(cv,0,0);cache.lounge=k}
  const cv3=document.createElement('canvas');cv3.id='cut';cv3.width=W;cv3.height=H;cv3.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:15;cursor:crosshair';$('#game').appendChild(cv3);fade.style.opacity=0;
  const x=cv3.getContext('2d'),said=new Set(),BEAT=.6,OFF=enthuellen?3.6:0,ENDE=OFF+25;
  const ease=(a,b,p)=>a+(b-a)*(p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2),seg=(t,a,b)=>Math.max(0,Math.min(1,(t-a)/(b-a)));
  const glow=(X,Y,r,c,a)=>{const g=x.createRadialGradient(X,Y,0,X,Y,r);g.addColorStop(0,`rgba(${c},${a})`);g.addColorStop(1,`rgba(${c},0)`);x.fillStyle=g;x.fillRect(X-r,Y-r,r*2,r*2)};
  // Zustand der Physik (Sprite-Pixel)
  const ph={jy:0,vy:0,jx:0,vx:0,hx:0,hv:0,hy:0,hyv:0,wippV:0,wippA:0,huefV:0,theta:0,thetaZiel:0,maus:0,vibe:40,pop:[],kopfPuffer:[]};
  let fin=false,T0=performance.now(),tAlt=0,mausWinkel=null,mausKreis=0,letzterSchlag=-1;
  // ---- Eingabe: Takt (Leertaste/Klick) und Maus-Kreisen ----
  const schlag=()=>{const t=(performance.now()-T0)/1000-OFF;if(t<0||fin)return;const ph0=t/BEAT,abw=Math.abs(ph0-Math.round(ph0))*BEAT,nr=Math.round(ph0);
    if(nr===letzterSchlag)return;   // pro Takt nur ein Treffer
    if(abw<=.13){letzterSchlag=nr;ph.vibe=Math.min(100,ph.vibe+7);ph.pop.push({t,txt:abw<.06?'Perfekt! ♥':'Im Takt ♪',c:'255,215,120'})}
    else{ph.vibe=Math.max(0,ph.vibe-4);ph.pop.push({t,txt:'Daneben …',c:'200,120,140'})}};
  const key=e=>{if(e.key===' '){e.preventDefault();if(!e.repeat)schlag()}else if(e.key==='Escape')beenden()};
  const pos=e=>{const r=cv3.getBoundingClientRect();return[(e.clientX-r.left)/r.width*800,(e.clientY-r.top)/r.height*500]};
  cv3.onmousedown=e=>{e.stopPropagation();schlag()};
  cv3.onmousemove=e=>{const[mx,my]=pos(e),a=Math.atan2(my-250,mx-400);if(Math.hypot(mx-400,my-250)<40){mausWinkel=null;return}
    if(mausWinkel!==null){let d=a-mausWinkel;if(d>Math.PI)d-=2*Math.PI;if(d<-Math.PI)d+=2*Math.PI;if(Math.abs(d)<.6){ph.maus+=d;mausKreis+=Math.abs(d);
      if(mausKreis>2*Math.PI){mausKreis-=2*Math.PI;ph.vibe=Math.min(100,ph.vibe+6);ph.pop.push({t:(performance.now()-T0)/1000-OFF,txt:'Dreh dich! ✦',c:'255,180,230'})}}}
    mausWinkel=a};
  addEventListener('keydown',key,true);
  // Petjas Augenlider (für das Umziehen): k = 0 offen … 1 zu
  function lider(k,t){if(k<=0)return;x.fillStyle=k>=1?`rgb(${26+Math.sin(t*2)*6|0},4,8)`:'#120206';if(k>=1){x.fillRect(-10,-10,820,520);return}
    const hh=(1-k)*290,f=.35+.65*(1-k)*(1-k),M=215,side=hh*f,ctl=2*hh-side;
    x.beginPath();x.moveTo(-10,-10);x.lineTo(810,-10);x.lineTo(810,M-side);x.quadraticCurveTo(400,M-ctl,-10,M-side);x.fill();
    x.beginPath();x.moveTo(-10,510);x.lineTo(810,510);x.lineTo(810,M+side);x.quadraticCurveTo(400,M+ctl,-10,M+side);x.fill()}
  // Sofa-Rand im Vordergrund (Ich-Sicht)
  function sofa(){x.fillStyle='#3b1626';x.beginPath();x.moveTo(-10,510);x.lineTo(-10,392);x.quadraticCurveTo(70,372,118,430);x.lineTo(150,510);x.fill();
    x.beginPath();x.moveTo(810,510);x.lineTo(810,392);x.quadraticCurveTo(730,372,682,430);x.lineTo(650,510);x.fill();
    x.strokeStyle='rgba(255,170,200,.25)';x.lineWidth=3;x.beginPath();x.moveTo(-10,394);x.quadraticCurveTo(70,374,116,430);x.stroke();x.beginPath();x.moveTo(810,394);x.quadraticCurveTo(730,374,684,430);x.stroke();
    x.fillStyle='rgba(255,210,150,.5)';for(let i=0;i<5;i++){x.beginPath();x.arc(14+i*24,420+i*14,2.2,0,7);x.fill();x.beginPath();x.arc(786-i*24,420+i*14,2.2,0,7);x.fill()}}
  // Vibe-Meter (rechts) mit Taktpuls
  function meter(t,u){const v=ph.vibe/100,X=748,Y0=96,Hm=300,puls=Math.max(0,1-((u%BEAT+BEAT)%BEAT)/BEAT*3);
    x.fillStyle='rgba(15,2,10,.6)';x.fillRect(X-16,Y0-30,32,Hm+60);x.strokeStyle='rgba(255,190,220,.6)';x.lineWidth=1.5;x.strokeRect(X-9,Y0,18,Hm);
    const g=x.createLinearGradient(0,Y0+Hm,0,Y0);g.addColorStop(0,'#6a1b4d');g.addColorStop(.5,'#d0407a');g.addColorStop(1,'#ffd27a');x.fillStyle=g;x.fillRect(X-8,Y0+Hm*(1-v),16,Hm*v);
    x.fillStyle=`rgba(255,${200+puls*55|0},${220-puls*80|0},${.55+.45*puls})`;x.font='bold 11px Georgia';x.textAlign='center';x.fillText('VIBE',X,Y0-12);
    x.font=`${18+puls*6}px Georgia`;x.fillText('♥',X,Y0+Hm+24);x.textAlign='left';
    if(u<0)return;
    for(const q of ph.pop){const a=u-q.t;if(a>1.1)continue;x.fillStyle=`rgba(${q.c},${1-a/1.1})`;x.font='bold 15px Georgia';x.textAlign='right';x.fillText(q.txt,X-22,Y0+Hm*(1-v)-a*40);x.textAlign='left'}
    ph.pop=ph.pop.filter(q=>u-q.t<1.2)}
  const TEXT=NA_SHOW_TEXT[skin]||{};
  function frame(){if(fin)return;const jetzt=(performance.now()-T0)/1000,dt=Math.min(1/30,Math.max(1/240,jetzt-tAlt));tAlt=jetzt;const t=jetzt,u=t-OFF;
    for(const k in TEXT)if(u>=+k&&!said.has(k)){said.add(k);if(busy)advance();say(TEXT[k])}
    if(enthuellen&&!said.has('zu')&&t>=.3){said.add('zu');if(busy)advance();say(NA_SHOW_ZU[skin]||NA_SHOW_ZU.vip)}
    if(t>=ENDE)return beenden();
    // ---- Choreografie → Ziel-Winkel, Ort, Größe ----
    const vib=ph.vibe/100,inten=.6+.65*vib,frei=u>=10.5&&u<17;
    let px=400,py=520,sc=1.5,sit=false;
    if(u<2&&!enthuellen)px=ease(-80,400,seg(u,0,2));   // reinlaufen (nach dem Umziehen steht sie schon da)
    if(u<8)ph.thetaZiel=Math.sin(Math.max(0,u-2)*.8)*.55;                       // kokett hin und her (±30°)
    else if(u<10.5)ph.thetaZiel=ease(0,2*Math.PI,seg(u,8,10.5));                 // langsame 360°-Drehung
    else if(frei)ph.thetaZiel=2*Math.PI+ph.maus;                               // Spieler dreht mit der Maus
    else if(u<19.5)ph.thetaZiel=ease(ph.thetaZiel,Math.round((ph.thetaZiel-Math.PI)/(2*Math.PI))*2*Math.PI+Math.PI,seg(u,17,17.6));   // Rücken zeigen
    else if(u<21)ph.thetaZiel=ease(ph.thetaZiel,Math.round(ph.thetaZiel/(2*Math.PI))*2*Math.PI,seg(u,19.5,20.2));                    // wieder nach vorn
    if(!frei)ph.maus*=Math.pow(.2,dt);
    const thAlt=ph.theta;ph.theta+=(ph.thetaZiel-ph.theta)*Math.min(1,dt*(frei?5:7));const omega=(ph.theta-thAlt)/dt;
    if(u>=21){const a=seg(u,21,22.6),b=seg(u,23.4,24.6);sit=a>.85;sc=b>0?ease(2.6,3.1,b):ease(1.5,2.6,a);py=b>0?ease(780,900,b):ease(520,780,a)}
    // ---- Bewegungs-Wellen (Sinus/Kosinus, im Takt) ----
    const w=2*Math.PI/(BEAT*2),wippZiel=(1-Math.cos(2*w*u))/2*5*inten*(u<2?.4:1)+(sit?Math.abs(Math.sin(u*4.2))*4:0);
    const huefte=Math.sin(w*u)*9*inten,brust=-huefte*.45+Math.sin(w*u+.6)*2.5*inten,kopf=brust*.8+Math.sin(w*u+1.2)*2*inten;
    // Beschleunigungen für die Federn
    const wippV=(wippZiel-(ph.wipp||0))/dt,wippA=(wippV-ph.wippV)/dt;ph.wippV=wippV;ph.wipp=wippZiel;
    const huefV=(huefte-(ph.huef||0))/dt,huefA=(huefV-ph.huefV)/dt;ph.huefV=huefV;ph.huef=huefte;
    // Brust: gedämpfte Feder, 3 Hz, ζ 0,2
    {const k=(2*Math.PI*3)**2,c=2*.2*Math.sqrt(k);ph.vy+=(-k*ph.jy-c*ph.vy-wippA*2.2)*dt;ph.jy+=ph.vy*dt;ph.jy=Math.max(-3.5,Math.min(3.5,ph.jy));
      ph.vx+=(-k*ph.jx-c*ph.vx-huefA*1.0)*dt;ph.jx+=ph.vx*dt;ph.jx=Math.max(-2,Math.min(2,ph.jx))}
    // Haare: hängen dem Kopf 0,15 s hinterher, Feder 1,8 Hz, ζ 0,35; Drehung schleudert sie raus
    const kopfWelt=px/sc+kopf;ph.kopfPuffer.push([t,kopfWelt]);while(ph.kopfPuffer.length>2&&ph.kopfPuffer[1][0]<=t-.15)ph.kopfPuffer.shift();
    {const alt=ph.kopfPuffer[0][1],ziel=Math.max(-16,Math.min(16,(alt-kopfWelt)*1.4-omega*1.6)),k=(2*Math.PI*1.8)**2,c=2*.35*Math.sqrt(k);
      ph.hv+=(k*(ziel-ph.hx)-c*ph.hv)*dt;ph.hx+=ph.hv*dt;ph.hyv+=(-k*ph.hy-c*ph.hyv-wippA*.5)*dt;ph.hy+=ph.hyv*dt;ph.hy=Math.max(-4,Math.min(4,ph.hy))}
    // Vibe zerfällt langsam
    if(u>0)ph.vibe=Math.max(0,ph.vibe-dt*1.5);
    // ---- Bild ----
    x.setTransform(1,0,0,1,0,0);x.filter='blur('+(1.5*SC)+'px)';x.save();x.translate(W/2,H/2);x.scale(1.5,1.5);x.translate(-W/2,-H*.45);x.drawImage(cache.lounge,0,0);x.restore();x.filter='none';
    x.setTransform(SC,0,0,SC,0,0);
    glow(400,300,300,'255,60,140',.12+.18*vib*(.6+.4*Math.sin(u*w*2)));   // Clublicht pulsiert mit dem Vibe
    if(sit){sofa();fpKnees(x)}
    const idx=((Math.round(ph.theta/(Math.PI/4))%8)+8)%8,eigen=idx&&SK.dirs[idx];
    let bild=eigen||SK.bild();if(enthuellen&&SK.zu&&u>-.6&&u<1.4)bild=SK.zu()||bild;   // VIP: erst noch Augen zu, dann Zwinkern
    const rig=naRig(bild,SK.zonen);
    if(u>-.9&&rig){x.save();x.translate(px,py+(sit?-2:0));x.rotate(Math.sin(w*u)*.025*inten);const s0=266/rig.h*sc;x.scale(s0,s0);
      const st={kopf,brust,huefte,wipp:ph.wipp,jigX:ph.jx,jigY:ph.jy,haar:ph.hx,haarY:ph.hy,faecher:Math.min(.35,Math.abs(omega)*.06)};
      naZeichne(x,rig,SK.zonen,st,eigen?0:ph.theta);x.restore()}
    if(!sit){sofa();fpKnees(x)}
    // Glitzer und Noten, mehr bei viel Vibe
    if(u>0){x.save();x.globalCompositeOperation='lighter';const n=4+Math.round(vib*10);for(let j=0;j<n;j++){const p=(u*.4+j/n)%1,X=400+Math.sin(j*7.1)*280,Y=440-p*380;
      x.fillStyle=`rgba(255,235,200,${.8*(1-p)})`;x.save();x.translate(X,Y);x.rotate(t*2+j);x.fillRect(-4,-.8,8,1.6);x.fillRect(-.8,-4,1.6,8);x.restore()}
      for(let j=0;j<4;j++){const p=(u*.25+j/4)%1;x.fillStyle=`rgba(255,180,220,${.6*(1-p)})`;x.font='22px Georgia';x.fillText('♪',120+j*150+Math.sin(t+j)*20,420-p*300)}x.restore()}
    const v=x.createRadialGradient(400,250,150,400,250,520);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(20,0,10,.7)');x.fillStyle=v;x.fillRect(0,0,800,500);
    meter(t,u);
    if(u>0&&u<7){x.fillStyle=`rgba(255,230,240,${Math.min(1,u)*Math.min(1,7-u)*.85})`;x.font='13px Georgia';x.textAlign='center';
      x.fillText('Leertaste / Klick im Takt füllt den Vibe · Maus im Kreis: sie dreht sich mit · Esc beendet',400,30);x.textAlign='left'}
    if(frei){x.fillStyle='rgba(255,220,235,.8)';x.font='italic 13px Georgia';x.textAlign='center';x.fillText(`Freestyle – kreise mit der Maus! (${NA_RICHTUNG[idx]})`,400,30);x.textAlign='left'}
    // Umziehen: Augen zu → auf
    if(enthuellen){const k=t<.4?seg(t,0,.4):t<OFF-1?1:1-seg(t,OFF-1,OFF-.2);lider(k,t);
      if(k>=1){x.fillStyle='rgba(255,200,220,.55)';x.font='italic 15px Georgia';x.textAlign='center';x.fillText(['*raschel*','*Strapse schnalzen*','*Reißverschluss*'][Math.floor(t*1.3)%3],400,250);x.textAlign='left'}
      if(u>-.2&&u<.8){x.save();x.globalCompositeOperation='lighter';glow(400,280,320,'255,200,230',.5*(1-seg(u,-.2,.8)));x.restore()}}
    requestAnimationFrame(frame)}
  requestAnimationFrame(frame);
  async function beenden(){if(fin)return;fin=true;removeEventListener('keydown',key,true);if(busy)advance();
    const vibe=Math.round(ph.vibe),gut=vibe>=70;if(gut)FL.na_vibe=Math.min(2,(FL.na_vibe||0)+1);
    FL['naSkin_'+skin]=1;FL.lounge=1;if(skin!=='standard')FL.naVip=(FL.naVip||0)+1;
    fade.style.opacity=1;await new Promise(r=>setTimeout(r,500));changing=false;x.setTransform(1,0,0,1,0,0);x.fillStyle='rgba(12,0,6,.72)';x.fillRect(0,0,W,H);
    const schluss=gut?[['P',`*Fünf Minuten später. Vibe: ${vibe} %*`],['NA','*außer Atem* Du hast den Takt gehalten, Zwiebel. Das schaffen nicht mal Zinaidas Stammgäste.']]
      :[['P',`*Fünf Minuten später. Vibe: ${vibe} %*`],['NA','*zupft dich am Kragen* Nächstes Mal klatschst du im Takt mit, Süßer. Oder wenigstens in der Nähe vom Takt.']];
    say(schluss.concat(NA_SHOW_ENDE[skin]||[]),()=>{cv3.remove();enter(VON,VPOS)});fade.style.opacity=0}}

// ---------- Texte je Outfit (Zeitpunkt in s nach Tanzbeginn) ----------
const NA_SHOW_ZU={
  vip:[['NA','*haucht* Augen zu, Zwiebel. Ich hab was Neues an. Na ja – weniger Altes.'],['P','*hört Strapse schnalzen* … *SCHLUCK*']],
  dessous:[['NA','Augen zu. Und diesmal wirklich, Süßer. Das hier hat nicht mal Zinaida gesehen.'],['P','(Das war ein Reißverschluss. Das war eindeutig ein Reißverschluss.)']]};
const NA_SHOW_TEXT={
  standard:{.3:[['NA','Hände aufs Sofa, Zwiebel. Ich mach den Rest.']],8:[['NA','Einmal rum … damit du siehst, dass hinten auch was ist.']],
    12:[['NA','Na los, dreh mich. Du hast doch Hände. Benutz sie – an der Maus.']],18.5:[['P','(Die Haare. Die Haare machen mich fertig.)']]},
  vip:{.4:[['NA','*öffnet ein Auge, zieht die Braue hoch* Na? Das Outfit gibt’s nur für Stammkunden. Und für Zwiebeln.']],8:[['NA','Langsam drehen … so. Damit du was zum Erzählen hast.']],
    12:[['NA','Freestyle, Süßer. Du führst. Aber wehe, du trittst mir auf die Stiefel.']],21.5:[['P','Ich … äh … meine Hände sind auf dem Sofa. Beide. Glaub ich.']]},
  dessous:{.4:[['NA','*zwinkert* Dreihundert Jahre im Sumpf, und das hier hat mich noch keiner tragen sehen. Fühl dich geehrt.']],8:[['NA','Ganz rum, Zwiebel. Von hinten bin ich übrigens genauso gefährlich.']],
    12:[['NA','Dreh mich. Schneller. … Nicht so schnell, ich hab Absätze an!']],21.5:[['NA','*haucht* Ganz ruhig atmen, Süßer. Wenn du jetzt umkippst, tanz ich trotzdem zu Ende.']]}};
const NA_SHOW_ENDE={
  vip:[['NA','*zwinkert* Das Outfit bleibt unter uns, Zwiebel. Sonst muss ich dich heiraten. Oder umbringen. Je nach Laune.']],
  dessous:[['NA','Wenn du so weitermachst, kriegst du noch was zum Mitnehmen. Was mit Rand. Zum Aufhängen.'],['P','(Ein … Foto? Meint sie ein Foto?)']]};

// ---------- Privattanz im Menü: Outfit nach Beziehung ----------
naTanz=function(){const v=relOf('Nastja'),skin=nastjaSkin(v);
  if(!skin)return say([['P','Nastja … ein Privattanz?'],['NA','Langsam, Zwiebel. Erst redest du mit mir, dann trinkst du mit mir – und dann reden wir übers Tanzen.'],
    ['P','(Sie will mich erst besser kennenlernen. Reden, anstoßen … ab „Freundlich“ tanzt sie vielleicht.)']]);
  const neu=skin!=='standard'&&!FL['naSkin_'+skin];
  const vor=skin==='dessous'?['NA',neu?'Ein Privattanz? Heute nicht im Korsett, Süßer. Heute gibt’s … weniger. Ab in die Kabine.':'Die Kabine ist frei, Zwiebel. Und ich bin’s auch – fast.']
    :skin==='vip'?['NA',neu?'Ein Privattanz? Für dich gibt’s heute was, das nicht mal Zinaida gesehen hat. Ab in die VIP-Kabine, Süßer.':'VIP-Kabine, wie immer? Natürlich wie immer.']
    :['NA',nastjaMax()?'Für dich gibt’s heute die Version, die Zinaida verboten hat, Süßer.':'Für dich, Zwiebel? Freundschaftspreis: umsonst. Erzähl’s keinem, sonst wollen das alle.'];
  say([['P','Nastja … noch ein Privattanz?'],vor],()=>{naPunkte('tanz',30,10);nastjaShow(skin,neu)})};
// Menü-Kopf zeigt sie im Outfit ihrer Stufe
{const nm=nastjaMenu;nastjaMenu=function(){const r=nm.apply(this,arguments),sk=nastjaSkin(),im=document.querySelector('.namenu .nahead img');
  if(im&&sk==='vip')im.src=NASTJA_VIP_URL[0];else if(im&&sk==='dessous')im.src=NASTJA_DES_URL;return r}}
