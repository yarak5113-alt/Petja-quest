// ================= Inventar: realistisch gemalte Gegenstände =================
// Wie die Objekte in der Welt (18-objekte-real.js) werden die Gegenstände in der Tasche auf ein Canvas gemalt:
// Licht von links oben, Materialstruktur (Holz, Metall, Glas, Papier, Sackleinen), Innenschatten, Glanzlichter, weicher Bodenschatten.
// Jedes Bild ist 64×64 Einheiten groß, wird 4-fach aufgelöst gerendert und ersetzt das bisherige SVG-Symbol in ICONS.
(()=>{const K=4,S=64;let q=1;const r=()=>(q=q*16807%2147483647)/2147483647,seed=v=>{q=(v*7919)%2147483000+11;r();r()};
const C=(c,a=1)=>`rgba(${c[0]|0},${c[1]|0},${c[2]|0},${a})`,mx=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t),sc=(c,f)=>c.map(v=>Math.max(0,Math.min(255,v*f)));
const lg=(x,a,b,c,d,st)=>{const g=x.createLinearGradient(a,b,c,d);st.forEach(([o,k])=>g.addColorStop(o,k));return g};
const rg=(x,a,b,r0,c,d,r1,st)=>{const g=x.createRadialGradient(a,b,r0,c,d,r1);st.forEach(([o,k])=>g.addColorStop(o,k));return g};
// weicher Kontaktschatten
const ground=(x,cx,cy,rx,ry,a=.5)=>{x.save();x.translate(cx,cy);x.scale(1,ry/rx);x.fillStyle=rg(x,0,0,0,0,0,rx,[[0,`rgba(0,0,0,${a})`],[.55,`rgba(0,0,0,${a*.4})`],[1,'rgba(0,0,0,0)']]);x.fillRect(-rx,-rx,2*rx,2*rx);x.restore()};
// Innenschatten (Rundung): Schatten fällt von links oben nach rechts unten in die Form
const inner=(x,p,col,blur,dx,dy)=>{x.save();x.clip(p);const R=new Path2D();R.rect(-80,-80,240,240);R.addPath(p);x.shadowColor=col;x.shadowBlur=blur*K;x.shadowOffsetX=dx*K;x.shadowOffsetY=dy*K;x.fillStyle='#000';x.fill(R,'evenodd');x.restore()};
// Körnung / Struktur innerhalb einer Form
const grain=(x,p,n,col,a0,a1,s0,s1)=>{x.save();x.clip(p);for(let i=0;i<n;i++){x.fillStyle=C(col,a0+r()*(a1-a0));const s=s0+r()*(s1-s0);x.fillRect(r()*S,r()*S,s,s)}x.restore()};
const gloss=(x,X,Y,rx,ry,a=.8,rot=0)=>{x.save();x.translate(X,Y);x.rotate(rot);x.scale(1,ry/rx);x.fillStyle=rg(x,0,0,0,0,0,rx,[[0,`rgba(255,255,255,${a})`],[.4,`rgba(255,255,255,${a*.35})`],[1,'rgba(255,255,255,0)']]);x.fillRect(-rx,-rx,2*rx,2*rx);x.restore()};
const glow=(x,X,Y,R,col,a)=>{x.save();x.globalCompositeOperation='lighter';x.fillStyle=rg(x,X,Y,0,X,Y,R,[[0,C(col,a)],[1,C(col,0)]]);x.fillRect(X-R,Y-R,2*R,2*R);x.restore()};
const edge=(x,p,a=.55,w=.5)=>{x.strokeStyle=`rgba(20,12,6,${a})`;x.lineWidth=w;x.stroke(p)};
// Zylinder entlang einer Linie (Holz, Papier, Metall); tex(x,L,w) malt Struktur im lokalen System (x längs, y quer)
function tube(x,x1,y1,x2,y2,w,col,tex,caps=true){const L=Math.hypot(x2-x1,y2-y1),a=Math.atan2(y2-y1,x2-x1);x.save();x.translate(x1,y1);x.rotate(a);
  const p=new Path2D();if(caps){p.moveTo(0,-w/2);p.lineTo(L,-w/2);p.ellipse(L,0,w*.22,w/2,0,-Math.PI/2,Math.PI/2);p.lineTo(0,w/2);p.ellipse(0,0,w*.22,w/2,0,Math.PI/2,Math.PI*1.5)}else p.rect(0,-w/2,L,w);
  x.fillStyle=lg(x,0,-w/2,0,w/2,[[0,C(sc(col,.62))],[.22,C(sc(col,1.22))],[.45,C(col)],[.85,C(sc(col,.62))],[1,C(sc(col,.42))]]);x.fill(p);
  if(tex){x.save();x.clip(p);tex(x,L,w);x.restore()}x.restore();return{L,a}}
const W=(c,s)=>c;   // Lesbarkeit
// Holzmaserung auf einem Rechteck (lokal)
const woodTex=(x,L,w,col,n=10)=>{for(let i=0;i<n;i++){const y=-w/2+r()*w;x.strokeStyle=C(sc(col,.55+r()*.25),.35+r()*.3);x.lineWidth=.25+r()*.35;x.beginPath();x.moveTo(-1,y);
  for(let X=0;X<=L+1;X+=3)x.lineTo(X,y+Math.sin(X*.18+i)*.35*w/6);x.stroke()}};
function make(id,draw){const c=document.createElement('canvas');c.width=c.height=S*K;const x=c.getContext('2d');x.scale(K,K);x.lineCap='round';x.lineJoin='round';
  seed([...id].reduce((s,ch)=>s+ch.charCodeAt(0)*7,3));try{draw(x);ICONS[id]=c.toDataURL()}catch(e){console.error('Gegenstand',id,e)}}

// ---------- Joint-Stummel ----------
make('kippe',x=>{ground(x,32,46,24,4);
  tube(x,14,42,44,26,7.5,[244,238,224],(x,L,w)=>{for(let i=0;i<16;i++){const X=6+r()*(L-6);x.strokeStyle=`rgba(120,108,90,${.12+r()*.2})`;x.lineWidth=.2;x.beginPath();x.moveTo(X,-w/2);x.lineTo(X+(r()-.5)*3,w/2);x.stroke()}
    x.fillStyle=lg(x,0,0,9,0,[[0,'#c9a46a'],[1,'#d8bd88']]);x.fillRect(-2,-w/2,9,w);x.strokeStyle='rgba(90,60,30,.5)';x.lineWidth=.3;x.beginPath();x.moveTo(9,-w/2);x.lineTo(9,w/2);x.stroke();
    x.fillStyle=rg(x,L-6,0,0,L-6,0,8,[[0,'rgba(160,120,50,.45)'],[1,'rgba(160,120,50,0)']]);x.fillRect(L-14,-w/2,14,w);
    x.fillStyle=lg(x,L-4,0,L+2,0,[[0,'#5a5650'],[.6,'#a8a49c'],[1,'#d0ccc4']]);x.fillRect(L-4,-w/2,6,w)});
  glow(x,45,25.5,9,[255,120,30],.55);x.fillStyle=rg(x,45.4,25.4,0,45.4,25.4,3,[[0,'#fff3b0'],[.4,'#ff8a1a'],[1,'rgba(150,30,8,0)']]);x.beginPath();x.arc(45.4,25.4,3,0,7);x.fill();
  // Filterende mit gerollter Pappe
  x.save();x.translate(14,42);x.rotate(Math.atan2(-16,30));x.scale(.4,1);x.fillStyle='#d4b884';x.beginPath();x.arc(0,0,3.7,0,7);x.fill();x.strokeStyle='rgba(100,70,40,.9)';x.lineWidth=.45;x.beginPath();for(let a=0;a<14;a+=.25)x.lineTo(Math.cos(a)*a*.25,Math.sin(a)*a*.25);x.stroke();x.restore();
  for(let i=0;i<4;i++){x.strokeStyle=`rgba(210,210,215,${.25-i*.05})`;x.lineWidth=1.2;x.beginPath();x.moveTo(46,23);x.bezierCurveTo(44+i*2,16,52-i,12,48+i*2,4+i);x.stroke()}});

// ---------- Säge (geschärft) und rostige Säge ----------
function saw(x,rust){ground(x,32,52,27,4);
  const bl=new Path2D('M16,27L57,11L60,19L60,22L20,42Z');x.fillStyle=lg(x,18,14,46,40,[[0,'#e8ecf0'],[.3,'#9aa2aa'],[.55,'#d8dde2'],[.8,'#7c848c'],[1,'#a8b0b8']]);x.fill(bl);
  x.save();x.clip(bl);for(let i=0;i<70;i++){const y=14+r()*34;x.strokeStyle=`rgba(${r()<.5?255:40},${r()<.5?255:44},${r()<.5?255:50},${.06+r()*.12})`;x.lineWidth=.2;x.beginPath();x.moveTo(0,y+8);x.lineTo(60,y-12);x.stroke()}
  if(rust){for(let i=0;i<520;i++){const X=14+r()*46,Y=10+r()*34,s=.3+r()*1.3;x.fillStyle=C(mx([150,64,24],[96,40,18],r()),.35+r()*.5);x.beginPath();x.arc(X,Y,s,0,7);x.fill()}
    for(let i=0;i<40;i++){x.fillStyle=C([210,120,50],.3+r()*.4);x.fillRect(8+r()*44,16+r()*28,.6,.6)}}x.restore();
  // Zähne
  x.fillStyle=rust?'#6a3a1c':'#5a6068';x.beginPath();x.moveTo(20,42);for(let t=0;t<=1;t+=.05){const X=20+t*40,Y=42-t*20;x.lineTo(X,Y);x.lineTo(X+1.1,Y+2.2)}x.lineTo(60,22);x.closePath();x.fill();
  inner(x,bl,'rgba(0,0,0,.45)',2,-1,-1);gloss(x,36,24,18,2.2,rust?.12:.55,-.42);edge(x,bl,.6,.4);
  x.fillStyle='#2a2e32';[[20,32],[21.5,37]].forEach(([X,Y])=>{x.beginPath();x.arc(X,Y,.9,0,7);x.fill()});
  // Griff aus Holz
  const h0=new Path2D();h0.roundRect(-10,-9,21,18,6);h0.ellipse(.5,.5,5,3.4,0,0,Math.PI*2);const h=new Path2D();h.addPath(h0,new DOMMatrix().translate(12,38).rotate(-24));
  x.fillStyle=lg(x,2,28,22,48,[[0,rust?'#8a6040':'#b07a44'],[.5,rust?'#5a3c22':'#7a4a22'],[1,'#3a220e']]);x.fill(h,'evenodd');x.save();x.clip(h,'evenodd');for(let i=0;i<14;i++){x.strokeStyle=`rgba(40,20,8,${.2+r()*.3})`;x.lineWidth=.3;x.beginPath();x.moveTo(0,22+i*1.8);x.bezierCurveTo(8,24+i*1.8,14,30+i*1.6,22,30+i*1.8);x.stroke()}x.restore();
  inner(x,h,'rgba(0,0,0,.6)',2,-1,-1);gloss(x,6,33,3,5,.35,.3);edge(x,h,.6,.4)}
make('saege',x=>saw(x,0));make('rsaege',x=>saw(x,1));

// ---------- Apfel ----------
make('apfel',x=>{ground(x,33,54,19,4,.55);const p=new Path2D();p.moveTo(32,17);p.bezierCurveTo(40,11,54,16,53,32);p.bezierCurveTo(52,46,42,54,33,51);p.bezierCurveTo(24,54,12,46,11,32);p.bezierCurveTo(10,16,24,11,32,17);
  x.fillStyle=rg(x,24,26,2,32,34,24,[[0,'#ff6a50'],[.35,'#d42418'],[.75,'#8e0e0c'],[1,'#4a0606']]);x.fill(p);
  x.save();x.clip(p);for(let i=0;i<46;i++){const X=12+r()*40;x.strokeStyle=C(r()<.3?[250,200,90]:[120,10,10],.12+r()*.18);x.lineWidth=.4+r()*.9;x.beginPath();x.moveTo(X,15);x.quadraticCurveTo(X+(X-32)*.5,34,X+(X-32)*.15,54);x.stroke()}
  for(let i=0;i<60;i++){x.fillStyle=`rgba(255,230,170,${.15+r()*.3})`;x.beginPath();x.arc(12+r()*40,16+r()*36,.25+r()*.3,0,7);x.fill()}x.restore();
  inner(x,p,'rgba(30,0,0,.7)',5,-3,-3);x.fillStyle=rg(x,32,18,0,32,18,6,[[0,'rgba(40,10,0,.6)'],[1,'rgba(40,10,0,0)']]);x.fillRect(24,12,16,12);
  gloss(x,22,26,6,4,.75,-.6);gloss(x,44,40,3,2,.2);
  x.strokeStyle='#4a2c12';x.lineWidth=1.8;x.beginPath();x.moveTo(32,19);x.quadraticCurveTo(31,12,34,7);x.stroke();x.strokeStyle='rgba(160,110,60,.6)';x.lineWidth=.5;x.beginPath();x.moveTo(31.6,17);x.quadraticCurveTo(30.8,12,33.4,8);x.stroke();
  const lf=new Path2D('M34,11C38,5 46,4 50,7C46,12 39,14 34,11Z');x.fillStyle=lg(x,34,6,50,12,[[0,'#7ab83a'],[.6,'#3e7a1c'],[1,'#25500e']]);x.fill(lf);x.strokeStyle='rgba(220,255,180,.5)';x.lineWidth=.35;x.beginPath();x.moveTo(35,10.6);x.quadraticCurveTo(42,8,49,7.2);x.stroke();edge(x,lf,.4,.3)});

// ---------- Stock ----------
const bark=[112,82,52];
make('stock',x=>{ground(x,32,50,26,3.5);tube(x,8,50,56,14,6.6,bark,(x,L,w)=>{woodTex(x,L,w,bark,14);for(let i=0;i<5;i++){const X=6+r()*(L-12);x.fillStyle='rgba(40,24,10,.7)';x.beginPath();x.ellipse(X,(r()-.5)*w*.5,1.4,.9,0,0,7);x.fill();x.fillStyle='rgba(200,160,110,.35)';x.beginPath();x.ellipse(X-.4,(r()-.5)*.6-.3,.5,.3,0,0,7);x.fill()}
    for(let i=0;i<20;i++){x.fillStyle=`rgba(${r()<.5?220:30},${r()<.5?200:20},${r()<.5?160:10},${.1+r()*.15})`;x.fillRect(r()*L,-w/2+r()*w,1.6,.4)}});
  x.save();x.translate(56,14);x.rotate(Math.atan2(-36,48));x.scale(.35,1);x.fillStyle=rg(x,0,0,0,0,0,2.6,[[0,'#e8cc98'],[.7,'#c09a64'],[1,'#7a5a34']]);x.beginPath();x.arc(0,0,2.6,0,7);x.fill();x.restore();
  tube(x,40,26,47,16,2,bark,null)});

// ---------- Wäscheleine (aufgerollt, mit Wäscheklammer) ----------
make('seil',x=>{ground(x,32,50,24,5);const rope=[226,214,188];
  for(let k=0;k<6;k++){const rx=19-k*.6,ry=12-k*.4,cy=32+k*.5,cx=32+(k-2.5)*.9;
    x.lineWidth=2.8;x.strokeStyle=C(sc(rope,.55));x.beginPath();x.ellipse(cx+.3,cy+.4,rx,ry,-.08,0,7);x.stroke();
    x.strokeStyle=lg(x,cx-rx,cy-ry,cx+rx,cy+ry,[[0,C(sc(rope,1.15))],[.5,C(rope)],[1,C(sc(rope,.62))]]);x.lineWidth=2.3;x.beginPath();x.ellipse(cx,cy,rx,ry,-.08,0,7);x.stroke();
    x.save();x.setLineDash([.7,1.1]);x.lineDashOffset=k;x.strokeStyle='rgba(110,96,70,.55)';x.lineWidth=2.1;x.beginPath();x.ellipse(cx,cy,rx,ry,-.08,0,7);x.stroke();x.restore()}
  x.strokeStyle='rgba(255,255,255,.35)';x.lineWidth=.6;x.beginPath();x.ellipse(30,30,17,10,-.08,3.4,4.6);x.stroke();
  // loses Ende
  x.lineWidth=2.3;x.strokeStyle=C(rope);x.beginPath();x.moveTo(48,38);x.bezierCurveTo(54,44,50,52,58,54);x.stroke();x.setLineDash([.7,1.1]);x.strokeStyle='rgba(110,96,70,.55)';x.stroke();x.setLineDash([]);
  // Wäscheklammer aus Holz
  x.save();x.translate(18,22);x.rotate(-.6);const pg=new Path2D('M-1.6,-9L1.6,-9L2,8L-2,8Z');x.fillStyle=lg(x,-2,0,2,0,[[0,'#8a6038'],[.4,'#e0bc88'],[1,'#9a7048']]);x.fill(pg);x.fillStyle='#3a2a1a';x.fillRect(-.25,-9,.5,17);
  x.fillStyle=lg(x,-2.4,0,2.4,0,[[0,'#7a7e84'],[.5,'#e8eaee'],[1,'#6a6e74']]);x.fillRect(-2.3,-1,4.6,2.2);edge(x,pg,.5,.3);x.restore()});

// ---------- Angel ----------
make('angel',x=>{ground(x,32,54,26,3.5);tube(x,6,56,50,10,4,bark,(x,L,w)=>woodTex(x,L,w,bark,10));
  x.strokeStyle='#4a4a4a';x.lineWidth=.9;for(const t of[.18,.45,.7]){const X=6+44*t,Y=56-46*t;x.beginPath();x.arc(X+1,Y+1,1.4,0,7);x.stroke()}
  x.strokeStyle='rgba(240,240,240,.85)';x.lineWidth=.45;x.beginPath();x.moveTo(50,10);x.quadraticCurveTo(57,22,54,36);x.stroke();
  // Schwimmer
  x.fillStyle=lg(x,51,34,57,34,[[0,'#a01010'],[.4,'#ff4a30'],[1,'#700808']]);x.beginPath();x.ellipse(54,36,2.6,3.2,0,Math.PI,0);x.fill();x.fillStyle=lg(x,51,38,57,38,[[0,'#b0b0b0'],[.4,'#ffffff'],[1,'#8a8a8a']]);x.beginPath();x.ellipse(54,36,2.6,3.2,0,0,Math.PI);x.fill();gloss(x,53,34.6,1.2,1,.8);
  x.strokeStyle='rgba(240,240,240,.85)';x.lineWidth=.4;x.beginPath();x.moveTo(54,39);x.lineTo(54,46);x.stroke();
  // Sicherheitsnadel als Haken
  x.strokeStyle=lg(x,51,46,57,54,[[0,'#f0f2f4'],[1,'#7a8088']]);x.lineWidth=.8;x.beginPath();x.moveTo(54,46);x.lineTo(54,52);x.arc(52.4,52,1.6,0,Math.PI);x.lineTo(50.8,49);x.stroke()});

// ---------- Blaue Pilzstücke (aus dem Joint) ----------
make('pilze',x=>{ground(x,32,48,22,5);
  for(let i=0;i<9;i++){const X=14+(i%3)*12+(r()-.5)*6,Y=28+((i/3)|0)*7+(r()-.5)*4,s=4+r()*2.4,a=r()*6;x.save();x.translate(X,Y);x.rotate(a);
    const p=new Path2D();p.moveTo(-s,0);for(let k=1;k<7;k++){const an=k/7*Math.PI*2,rr=s*(.6+r()*.5);p.lineTo(Math.cos(an)*rr*-1,Math.sin(an)*rr*.75)}p.closePath();
    x.fillStyle=rg(x,-s*.4,-s*.4,0,0,0,s*1.3,[[0,'#9ad8ff'],[.45,'#3a86d0'],[1,'#173a72']]);x.fill(p);x.save();x.clip(p);x.fillStyle='rgba(225,235,245,.55)';x.fillRect(-s,s*.15,2*s,s);
    for(let k=0;k<16;k++){x.fillStyle=`rgba(${r()<.5?20:200},${r()<.5?40:230},${r()<.5?90:255},${.2+r()*.3})`;x.fillRect((r()-.5)*2*s,(r()-.5)*2*s,.5,.5)}x.restore();
    inner(x,p,'rgba(0,10,40,.7)',1.4,-.6,-.6);edge(x,p,.5,.25);x.restore()}
  glow(x,32,34,20,[80,150,255],.15)});

// ---------- Angekokelte Karte ----------
make('karte',x=>{ground(x,32,52,26,4,.45);const p=new Path2D('M7,14L22,10L34,13L49,9L58,13L56,26L59,38L54,50L40,52L28,49L14,53L6,46L8,32Z');
  x.fillStyle=lg(x,6,10,58,52,[[0,'#f0dfb4'],[.5,'#d8bf88'],[1,'#a88454']]);x.fill(p);x.save();x.clip(p);
  for(let i=0;i<300;i++){x.fillStyle=`rgba(${r()<.5?120:255},${r()<.5?90:240},${r()<.5?50:200},${.05+r()*.12})`;x.fillRect(r()*64,r()*64,.5+r(),.5+r())}
  [[22,30,9],[44,22,7],[36,42,8]].forEach(([X,Y,R])=>{x.fillStyle=rg(x,X,Y,0,X,Y,R,[[0,'rgba(130,90,40,.25)'],[1,'rgba(130,90,40,0)']]);x.fillRect(X-R,Y-R,2*R,2*R)});
  x.strokeStyle='rgba(60,40,20,.25)';x.lineWidth=.6;[[22,9,22,53],[40,9,40,53],[6,31,59,31]].forEach(([a,b,c,d])=>{x.beginPath();x.moveTo(a,b);x.lineTo(c,d);x.stroke()});
  x.fillStyle='rgba(255,255,255,.12)';x.fillRect(22,9,3,44);x.fillRect(6,31,53,2);
  // Weg mit Tinte: 2× links, 1× rechts, 1× geradeaus
  x.strokeStyle='rgba(70,30,14,.85)';x.lineWidth=.9;x.setLineDash([1.6,1]);x.beginPath();x.moveTo(48,46);x.lineTo(44,38);x.lineTo(34,36);x.lineTo(24,32);x.lineTo(28,24);x.lineTo(30,15);x.stroke();x.setLineDash([]);
  x.strokeStyle='rgba(140,20,10,.9)';x.lineWidth=1.1;x.beginPath();x.moveTo(27.5,12.5);x.lineTo(32.5,17.5);x.moveTo(32.5,12.5);x.lineTo(27.5,17.5);x.stroke();
  for(let i=0;i<10;i++){const X=12+r()*40,Y=18+r()*28;x.fillStyle='rgba(40,70,30,.55)';x.beginPath();x.moveTo(X,Y-2.4);x.lineTo(X+1.6,Y+.6);x.lineTo(X-1.6,Y+.6);x.fill()}
  x.restore();
  // Brandkante
  x.save();x.clip(p);x.strokeStyle='rgba(40,18,6,.95)';x.lineWidth=2.6;x.stroke(p);x.strokeStyle='rgba(120,60,20,.6)';x.lineWidth=5;x.globalAlpha=.5;x.stroke(p);x.restore();
  glow(x,56,40,4,[255,120,40],.35);inner(x,p,'rgba(60,30,10,.35)',3,-1,-1)});

// ---------- Madames Liste ----------
make('liste',x=>{ground(x,32,54,22,4,.45);x.save();x.translate(32,32);x.rotate(-.12);const p=new Path2D('M-16,-24L16,-24L17,24L-15,25Z');
  x.fillStyle=lg(x,-16,-24,16,24,[[0,'#fffdf6'],[1,'#e6dccb']]);x.fill(p);x.save();x.clip(p);for(let i=0;i<120;i++){x.fillStyle=`rgba(150,130,110,${.05+r()*.08})`;x.fillRect(-17+r()*34,-25+r()*50,.6,.6)}
  x.strokeStyle='rgba(120,150,200,.45)';x.lineWidth=.3;for(let Y=-14;Y<22;Y+=5){x.beginPath();x.moveTo(-16,Y);x.lineTo(17,Y);x.stroke()}
  x.strokeStyle='#8a1a4a';x.lineWidth=.7;x.beginPath();x.moveTo(-11,-18);for(let X=-11;X<6;X+=1.4)x.lineTo(X,-18-((X*7)%3));x.stroke();
  [-13,-8,-3,2,7].forEach((Y,i)=>{x.strokeStyle='rgba(40,30,60,.8)';x.lineWidth=.45;x.beginPath();x.moveTo(-12,Y+.5);for(let X=-12;X<6+((i*5)%7);X+=1.1)x.lineTo(X,Y-Math.abs(Math.sin(X*1.7+i))*1.2);x.stroke();
    x.strokeStyle='#2a7a2a';x.lineWidth=.6;x.beginPath();x.moveTo(9,Y-1);x.lineTo(10.5,Y+.5);x.lineTo(13.5,Y-2.6);x.stroke()});
  // Kussmund
  x.fillStyle='rgba(200,20,70,.75)';x.beginPath();x.ellipse(5,16,3.2,1.5,-.2,0,Math.PI);x.fill();x.beginPath();x.moveTo(1.8,15.6);x.quadraticCurveTo(3.5,13,5,15);x.quadraticCurveTo(6.5,13,8.2,15);x.fill();x.restore();
  inner(x,p,'rgba(80,60,40,.25)',2,-.6,-.6);edge(x,p,.35,.3);
  // Stecknadel
  x.fillStyle=rg(x,-1,-26,0,0,-25,2.2,[[0,'#ff9aa8'],[.5,'#d01838'],[1,'#600010']]);x.beginPath();x.arc(0,-25,2.2,0,7);x.fill();gloss(x,-.8,-25.8,.8,.7,.9);x.restore()});

// ---------- Gutschein ----------
make('gutschein',x=>{ground(x,32,48,26,4,.45);x.save();x.translate(32,32);x.rotate(-.2);const p=new Path2D();p.rect(-24,-12,48,24);for(let Y=-10;Y<=10;Y+=4)p.arc(-24,Y,1.1,0,7);
  x.fillStyle=lg(x,-24,-12,24,12,[[0,'#ffd2e4'],[.5,'#f08ab6'],[1,'#b84a7e']]);x.fill(p,'evenodd');x.save();x.clip(p,'evenodd');for(let i=0;i<160;i++){x.fillStyle=`rgba(255,255,255,${.04+r()*.1})`;x.fillRect(-25+r()*50,-13+r()*26,.6,.6)}
  x.strokeStyle='rgba(212,170,70,.95)';x.lineWidth=1;x.strokeRect(-20,-9,40,18);x.strokeStyle='rgba(255,240,180,.6)';x.lineWidth=.3;x.strokeRect(-19,-8,38,16);
  x.setLineDash([.8,.8]);x.strokeStyle='rgba(90,20,50,.6)';x.lineWidth=.4;x.beginPath();x.moveTo(10,-12);x.lineTo(10,12);x.stroke();x.setLineDash([]);
  x.fillStyle='#5a0a30';x.font='bold 4.6px Georgia';x.textAlign='center';x.fillText('GUTSCHEIN',-4,1);x.font='italic 3.4px Georgia';x.fillText('Privattanz · aufs Haus',-4,6);
  x.fillStyle=lg(x,12,-6,22,6,[[0,'#fff0a0'],[.5,'#d4a020'],[1,'#8a6010']]);x.beginPath();x.arc(16,0,4.6,0,7);x.fill();x.fillStyle='#7a4a0a';x.font='bold 5px Georgia';x.fillText('Z',16,1.8);x.restore();
  gloss(x,-10,-8,14,3,.35,0);inner(x,p,'rgba(80,0,40,.4)',2,-.8,-.8);x.restore()});

// ---------- Drei Säcke „Mehl“ ----------
function sack(x,X,Y,s,dark){x.save();x.translate(X,Y);x.scale(s,s);const p=new Path2D('M-11,12C-14,4 -12,-6 -7,-10C-5,-12 -4,-14 -3,-17L3,-17C4,-14 5,-12 7,-10C12,-6 14,4 11,12C6,15 -6,15 -11,12Z');
  const b=dark?[150,120,80]:[196,166,116];x.fillStyle=rg(x,-5,-4,1,0,2,16,[[0,C(sc(b,1.15))],[.6,C(b)],[1,C(sc(b,.55))]]);x.fill(p);x.save();x.clip(p);
  for(let Y2=-18;Y2<16;Y2+=.9){x.strokeStyle=`rgba(80,60,30,${.14+r()*.1})`;x.lineWidth=.3;x.beginPath();x.moveTo(-14,Y2);x.lineTo(14,Y2+(r()-.5)*.4);x.stroke()}
  for(let X2=-14;X2<14;X2+=.9){x.strokeStyle=`rgba(255,240,200,${.06+r()*.08})`;x.lineWidth=.3;x.beginPath();x.moveTo(X2,-18);x.lineTo(X2,16);x.stroke()}
  x.fillStyle='rgba(120,30,20,.55)';x.font='bold 5px Georgia';x.textAlign='center';x.fillText('МУКА',0,4);x.restore();
  inner(x,p,'rgba(40,20,0,.6)',3,-1.2,-1.2);x.strokeStyle='#6a4a22';x.lineWidth=1.3;x.beginPath();x.moveTo(-4,-12.5);x.quadraticCurveTo(0,-11,4,-12.5);x.stroke();
  x.fillStyle='rgba(250,250,250,.85)';for(let i=0;i<8;i++){x.beginPath();x.arc((r()-.5)*5,-17-r()*1.5,.35+r()*.4,0,7);x.fill()}edge(x,p,.45,.4);x.restore()}
make('mehl',x=>{ground(x,32,52,28,5);sack(x,19,36,.95,1);sack(x,45,37,.95,1);sack(x,32,40,1.05,0);
  x.fillStyle='rgba(245,245,245,.6)';for(let i=0;i<30;i++){x.beginPath();x.arc(14+r()*36,52+r()*3,.3+r()*.5,0,7);x.fill()}});

// ---------- Gnomlaterne ----------
make('laterne',x=>{ground(x,32,56,16,3.5);glow(x,32,36,26,[90,255,120],.35);
  x.strokeStyle=lg(x,24,4,40,14,[[0,'#4a4036'],[.5,'#b8a888'],[1,'#3a3028']]);x.lineWidth=1.6;x.beginPath();x.arc(32,13,6,Math.PI,0);x.stroke();
  const cap=new Path2D('M21,22L32,13L43,22Z');x.fillStyle=lg(x,21,14,43,22,[[0,'#6a5a46'],[.4,'#c8b494'],[1,'#3a2e22']]);x.fill(cap);edge(x,cap,.6,.4);
  const gl=new Path2D('M23,22L41,22L40,48L24,48Z');x.fillStyle=rg(x,32,36,1,32,36,14,[[0,'#f0ffb0'],[.35,'#6aff7a'],[.8,'#1a8a3a'],[1,'#0a3a1a']]);x.fill(gl);
  x.save();x.clip(gl);for(let i=0;i<14;i++)glow(x,28+r()*8,30+r()*12,2+r()*3,[220,255,160],.4);x.fillStyle='rgba(255,255,255,.22)';x.fillRect(24,22,3,26);x.restore();
  x.strokeStyle=lg(x,22,22,42,48,[[0,'#8a7a62'],[.5,'#3a3026'],[1,'#1a140e']]);x.lineWidth=1.8;x.stroke(gl);x.lineWidth=1.1;x.beginPath();x.moveTo(32,22);x.lineTo(32,48);x.stroke();
  const ft=new Path2D('M21,48L43,48L44,53L20,53Z');x.fillStyle=lg(x,20,48,44,53,[[0,'#7a6a52'],[.5,'#4a3e30'],[1,'#20180e']]);x.fill(ft);edge(x,ft,.6,.4);
  x.fillStyle='#e8c060';[[22,22],[42,22],[22,48],[42,48]].forEach(([X,Y])=>{x.beginPath();x.arc(X,Y,.8,0,7);x.fill()})});

// ---------- Würmer ----------
make('wuermer',x=>{ground(x,32,48,24,6,.5);
  for(let i=0;i<70;i++){x.fillStyle=C(mx([40,26,14],[96,70,44],r()),.6);x.beginPath();x.ellipse(12+r()*40,42+r()*10,1+r()*2.4,.6+r()*1.2,0,0,7);x.fill()}
  const worms=[[[10,40],[18,30],[28,38],[36,30],[46,34]],[[18,48],[26,44],[34,50],[44,44],[54,46]],[[30,26],[38,20],[48,26],[52,20]]];
  worms.forEach((pts,k)=>{const w=3.4-k*.3;x.lineWidth=w+.8;x.strokeStyle='rgba(60,20,20,.6)';const path=()=>{x.beginPath();x.moveTo(...pts[0]);for(let i=1;i<pts.length-1;i++){const mx2=(pts[i][0]+pts[i+1][0])/2,my2=(pts[i][1]+pts[i+1][1])/2;x.quadraticCurveTo(pts[i][0],pts[i][1],mx2,my2)}x.lineTo(...pts[pts.length-1])};
    path();x.stroke();x.lineWidth=w;x.strokeStyle=lg(x,10,20,54,50,[[0,'#d88a8a'],[.5,'#b25a62'],[1,'#8a3a44']]);path();x.stroke();
    x.save();x.setLineDash([.35,1.1]);x.lineWidth=w;x.strokeStyle='rgba(90,30,40,.55)';path();x.stroke();x.restore();
    x.lineWidth=w*.3;x.strokeStyle='rgba(255,220,220,.55)';x.save();x.translate(-.5,-.7);path();x.stroke();x.restore();
    const[a,b]=pts[1];x.fillStyle='rgba(230,140,140,.8)';x.beginPath();x.ellipse(a,b,w*.7,w*.55,0,0,7);x.fill()})});

// ---------- Selbstgebrannter ----------
function bottle(x,o){const{X=32,body='#cfe4ec',liq=null,lvl=.6,label=null,neck=6,h=42,w=18,cork=true}=o;const top=56-h;
  const p=new Path2D();p.moveTo(X-neck/2+.5,top+2);p.lineTo(X-neck/2,top+12);p.bezierCurveTo(X-neck/2,top+16,X-w/2,top+17,X-w/2,top+22);p.lineTo(X-w/2,52);p.quadraticCurveTo(X-w/2,55,X-w/2+3,55);p.lineTo(X+w/2-3,55);p.quadraticCurveTo(X+w/2,55,X+w/2,52);
  p.lineTo(X+w/2,top+22);p.bezierCurveTo(X+w/2,top+17,X+neck/2,top+16,X+neck/2,top+12);p.lineTo(X+neck/2-.5,top+2);p.closePath();
  x.fillStyle='rgba(0,0,0,.18)';x.fill(p);
  if(liq){const Y=55-(55-top-22)*lvl;x.save();x.clip(p);x.fillStyle=lg(x,X-w/2,0,X+w/2,0,[[0,C(sc(liq,.55),.95)],[.3,C(sc(liq,1.2),.9)],[1,C(sc(liq,.45),.95)]]);x.fillRect(X-w/2,Y,w,60);
    x.fillStyle=C(sc(liq,1.35),.8);x.beginPath();x.ellipse(X,Y,w/2,1.2,0,0,7);x.fill();x.restore()}
  x.fillStyle=lg(x,X-w/2,0,X+w/2,0,[[0,'rgba(255,255,255,.08)'],[.2,'rgba(255,255,255,.45)'],[.32,'rgba(255,255,255,.06)'],[.8,'rgba(255,255,255,.04)'],[.92,'rgba(255,255,255,.25)'],[1,'rgba(255,255,255,.05)']]);x.fill(p);
  if(label)label(x,X,w,top);
  x.strokeStyle=body;x.lineWidth=.7;x.globalAlpha=.8;x.stroke(p);x.globalAlpha=1;x.strokeStyle='rgba(0,0,0,.35)';x.lineWidth=.35;x.stroke(p);
  gloss(x,X-w/4,top+30,1.6,7,.7);
  if(cork){const cp=new Path2D();cp.rect(X-neck/2+.3,top-3,neck-.6,6);x.fillStyle=lg(x,X-neck/2,0,X+neck/2,0,[[0,'#7a5a34'],[.4,'#d4ac74'],[1,'#6a4a28']]);x.fill(cp);x.save();x.clip(cp);for(let i=0;i<30;i++){x.fillStyle=`rgba(70,40,20,${.3+r()*.4})`;x.fillRect(X-neck/2+r()*neck,top-3+r()*6,.5,.5)}x.restore();edge(x,cp,.5,.3)}
  return p}
make('schnaps',x=>{ground(x,32,56,15,3.5);bottle(x,{liq:[226,222,200],lvl:.7,label:(x,X,w,top)=>{const lp=new Path2D();lp.rect(X-w/2+.6,top+26,w-1.2,13);x.fillStyle=lg(x,X-w/2,0,X+w/2,0,[[0,'#b8a888'],[.4,'#f2e8cc'],[1,'#a89878']]);x.fill(lp);
  x.save();x.clip(lp);for(let i=0;i<60;i++){x.fillStyle=`rgba(120,90,50,${.05+r()*.15})`;x.fillRect(X-w/2+r()*w,top+26+r()*13,.8,.8)}x.restore();
  x.fillStyle='#3a1a0a';x.font='bold 4px Georgia';x.textAlign='center';x.fillText('САМОГОН',X,top+31.5);x.strokeStyle='rgba(60,30,10,.7)';x.lineWidth=.4;x.beginPath();x.moveTo(X-5,top+35);x.lineTo(X+5,top+35.5);x.moveTo(X-4,top+37);x.lineTo(X+3,top+37);x.stroke()}})});

// ---------- Leiter ----------
make('leiter',x=>{ground(x,32,56,24,3.5);const wd=[150,108,66];
  const rail=(a,b,c,d)=>tube(x,a,b,c,d,3.6,wd,(x,L,w)=>{woodTex(x,L,w,wd,8);x.fillStyle=lg(x,0,0,L*.35,0,[[0,'rgba(20,12,8,.95)'],[.7,'rgba(30,18,10,.5)'],[1,'rgba(30,18,10,0)']]);x.fillRect(0,-w/2,L*.35,w);
    for(let i=0;i<12;i++){x.fillStyle='rgba(0,0,0,.8)';x.fillRect(r()*L*.3,-w/2+r()*w,.3,1.2)}},false);
  for(let i=0;i<5;i++){const t=.1+i*.2;tube(x,16+24*t,58-52*t,36+24*t,60-52*t,2.4,wd,(x,L,w)=>woodTex(x,L,w,wd,4))}
  rail(16,58,40,6);rail(36,60,60,8);glow(x,20,52,5,[255,120,40],.25)});

// ---------- Fisch ----------
make('fisch',x=>{ground(x,32,50,24,4);const p=new Path2D('M8,32C14,22 30,18 42,24C46,26 49,28 51,30L58,22C59,27 58,33 59,40L51,34C48,37 44,39 40,40C28,44 14,42 8,32Z');
  x.fillStyle=lg(x,0,20,0,44,[[0,'#3a5a4a'],[.35,'#8aa898'],[.6,'#d8e4dc'],[1,'#f4f6f0']]);x.fill(p);x.save();x.clip(p);
  for(let X=14;X<52;X+=2.2)for(let Y=20;Y<44;Y+=1.9){const o=((X/2.2|0)%2)*.95;x.strokeStyle=`rgba(40,60,50,${.18+r()*.12})`;x.lineWidth=.3;x.beginPath();x.arc(X,Y+o,1.3,-.9,.9);x.stroke()}
  x.fillStyle=lg(x,0,24,0,34,[[0,'rgba(255,255,255,0)'],[.5,'rgba(200,255,230,.35)'],[1,'rgba(255,255,255,0)']]);x.fillRect(10,28,42,4);
  for(let i=0;i<10;i++){x.fillStyle='rgba(30,40,30,.45)';x.beginPath();x.arc(18+r()*26,23+r()*6,.5+r()*.6,0,7);x.fill()}x.restore();
  inner(x,p,'rgba(10,30,20,.55)',3,-1,-1);
  x.strokeStyle='rgba(30,40,30,.6)';x.lineWidth=.6;x.beginPath();x.moveTo(17,25);x.quadraticCurveTo(14,32,18,39);x.stroke();
  x.fillStyle='#f0e8c0';x.beginPath();x.arc(13,29,2.3,0,7);x.fill();x.fillStyle='#101010';x.beginPath();x.arc(13.3,29.2,1.4,0,7);x.fill();gloss(x,12.5,28.4,.6,.6,1);
  x.fillStyle='rgba(120,140,110,.75)';x.beginPath();x.moveTo(26,22);x.quadraticCurveTo(32,15,40,21);x.fill();x.beginPath();x.moveTo(24,38);x.quadraticCurveTo(28,46,34,40);x.fill();
  gloss(x,28,25,10,2.2,.55,-.1);edge(x,p,.55,.4)});

// ---------- Omas Gebiss ----------
make('gebiss',x=>{ground(x,32,50,24,4.5);const gum=new Path2D('M8,34C8,18 20,12 32,12C44,12 56,18 56,34C56,40 52,42 48,40C46,30 40,24 32,24C24,24 18,30 16,40C12,42 8,40 8,34Z');
  x.fillStyle=rg(x,24,20,2,32,30,28,[[0,'#ffb0b8'],[.5,'#e06878'],[1,'#8a2a3a']]);x.fill(gum);x.save();x.clip(gum);for(let i=0;i<80;i++){x.fillStyle=`rgba(255,255,255,${.05+r()*.12})`;x.beginPath();x.arc(r()*64,r()*64,.3+r()*.5,0,7);x.fill()}x.restore();
  inner(x,gum,'rgba(60,0,10,.55)',3,-1,-1);gloss(x,22,18,8,3,.5,-.4);
  for(let i=0;i<12;i++){const a=Math.PI*(1.06+i*.0805),R=19.5,X=32+Math.cos(a)*R*1.04,Y=37+Math.sin(a)*R*.95,big=i>=4&&i<=7;
    x.save();x.translate(X,Y);x.rotate(a+Math.PI/2);const tw=big?4:3.6,th=big?6.4:5.6,tp=new Path2D();tp.moveTo(-tw/2,0);tp.lineTo(-tw/2,th*.75);tp.quadraticCurveTo(0,th*1.15,tw/2,th*.75);tp.lineTo(tw/2,0);tp.closePath();
    x.fillStyle=lg(x,-tw/2,0,tw/2,0,[[0,'#cfc4a6'],[.35,'#fffbea'],[1,'#b8ac8c']]);x.fill(tp);x.fillStyle='rgba(180,160,100,.3)';x.fillRect(-tw/2,th*.6,tw,th*.4);edge(x,tp,.4,.25);x.restore()}});

// ---------- Birkenteer ----------
make('teer',x=>{ground(x,32,56,20,4);const can=new Path2D('M14,22L50,22L48,54C48,56 44,57 32,57C20,57 16,56 16,54Z');
  x.fillStyle=lg(x,14,0,50,0,[[0,'#5a3a1e'],[.25,'#b88a54'],[.5,'#8a5a2e'],[1,'#3a220e']]);x.fill(can);x.save();x.clip(can);for(let i=0;i<5;i++){const X=17+i*7;x.fillStyle='rgba(30,16,6,.35)';x.fillRect(X,22,.6,36)}woodTexAt(x);x.restore();
  x.fillStyle=lg(x,14,0,50,0,[[0,'#3a3a3e'],[.3,'#aeb0b4'],[1,'#2a2a2e']]);[30,46].forEach(Y=>x.fillRect(14.6,Y,34.8,2.4));
  inner(x,can,'rgba(0,0,0,.5)',3,-1,-1);
  x.fillStyle=rg(x,26,20,1,32,22,18,[[0,'#3a3634'],[.5,'#0a0806'],[1,'#000']]);x.beginPath();x.ellipse(32,22,18,4.5,0,0,7);x.fill();gloss(x,26,21,6,1.3,.6);
  x.fillStyle='#050403';x.beginPath();x.moveTo(40,22);x.quadraticCurveTo(42,30,41,34);x.quadraticCurveTo(43,36,44,33);x.quadraticCurveTo(44,28,45,22);x.fill();gloss(x,42,30,.6,2.4,.5);
  x.strokeStyle=lg(x,10,4,54,4,[[0,'#3a3a3e'],[.5,'#c8cacc'],[1,'#2a2a2e']]);x.lineWidth=1.3;x.beginPath();x.moveTo(15,23);x.quadraticCurveTo(32,4,49,23);x.stroke()});
function woodTexAt(x){for(let i=0;i<26;i++){x.strokeStyle=`rgba(50,26,10,${.2+r()*.25})`;x.lineWidth=.3;const X=14+r()*36;x.beginPath();x.moveTo(X,22);x.lineTo(X+(r()-.5)*1.5,58);x.stroke()}}

// ---------- Papierfilter ----------
make('filter',x=>{ground(x,32,46,20,4);tube(x,14,40,48,28,10,[214,186,138],(x,L,w)=>{for(let i=0;i<20;i++){x.strokeStyle=`rgba(110,80,40,${.1+r()*.2})`;x.lineWidth=.25;x.beginPath();x.moveTo(r()*L,-w/2);x.lineTo(r()*L,w/2);x.stroke()}
  x.strokeStyle='rgba(90,60,30,.4)';x.lineWidth=.4;x.beginPath();x.moveTo(0,-w*.1);x.lineTo(L,-w*.25);x.stroke();for(let i=0;i<6;i++){x.fillStyle='rgba(60,90,160,.4)';x.beginPath();x.arc(L-2-r()*6,(r()-.5)*w*.6,.5,0,7);x.fill()}},true);
  x.save();x.translate(14,40);x.rotate(Math.atan2(-12,34));x.scale(.32,1);x.fillStyle='#e0c898';x.beginPath();x.arc(0,0,5,0,7);x.fill();x.strokeStyle='rgba(110,76,40,.95)';x.lineWidth=.6;x.beginPath();for(let a=0;a<17;a+=.2)x.lineTo(Math.cos(a)*a*.28,Math.sin(a)*a*.28);x.stroke();x.restore()});

// ---------- Kleine Gläser: Ur-Spore, leere Phiole, Träne, Weihwasser ----------
function vial(x,fill){ground(x,32,57,12,3);const p=new Path2D('M27,12L37,12L37,16C38,17 40,18 40,22L40,52C40,56 36,57 32,57C28,57 24,56 24,52L24,22C24,18 26,17 27,16Z');
  x.fillStyle='rgba(0,0,0,.15)';x.fill(p);if(fill){x.save();x.clip(p);fill(x);x.restore()}
  x.fillStyle=lg(x,24,0,40,0,[[0,'rgba(255,255,255,.1)'],[.2,'rgba(255,255,255,.55)'],[.32,'rgba(255,255,255,.05)'],[.85,'rgba(255,255,255,.05)'],[.95,'rgba(255,255,255,.3)'],[1,'rgba(255,255,255,.05)']]);x.fill(p);
  x.strokeStyle='rgba(220,240,250,.8)';x.lineWidth=.7;x.stroke(p);x.strokeStyle='rgba(0,0,0,.3)';x.lineWidth=.3;x.stroke(p);gloss(x,27.5,34,1.2,9,.7);
  const cp=new Path2D('M27.4,6L36.6,6L36.2,13L27.8,13Z');x.fillStyle=lg(x,27,0,37,0,[[0,'#6a4a28'],[.4,'#d4ac74'],[1,'#5a3a1c']]);x.fill(cp);x.save();x.clip(cp);for(let i=0;i<30;i++){x.fillStyle=`rgba(70,40,20,${.3+r()*.4})`;x.fillRect(27+r()*10,6+r()*7,.5,.5)}x.restore();edge(x,cp,.5,.3);return p}
make('spore',x=>{vial(x,x=>{x.fillStyle=lg(x,0,36,0,57,[[0,'#ffe680'],[1,'#a06a10']]);x.beginPath();x.moveTo(24,40);x.quadraticCurveTo(32,35,40,40);x.lineTo(40,60);x.lineTo(24,60);x.fill();
  for(let i=0;i<60;i++){const X=25+r()*14,Y=20+r()*36;x.fillStyle=`rgba(255,${200+r()*55|0},${80+r()*80|0},${.4+r()*.6})`;x.beginPath();x.arc(X,Y,.25+r()*.5,0,7);x.fill()}});
  for(let i=0;i<7;i++){const X=24+r()*16,Y=22+r()*32;glow(x,X,Y,2.4,[255,220,100],.6);x.fillStyle='#fff';x.fillRect(X-.15,Y-1.2,.3,2.4);x.fillRect(X-1.2,Y-.15,2.4,.3)}});
make('phiole',x=>vial(x,null));
make('traene',x=>{vial(x,x=>{x.fillStyle=lg(x,24,0,40,0,[[0,'rgba(60,130,220,.85)'],[.4,'rgba(160,220,255,.85)'],[1,'rgba(40,100,190,.9)']]);x.fillRect(24,48,16,12);x.fillStyle='rgba(220,245,255,.9)';x.beginPath();x.ellipse(32,48,8,1,0,0,7);x.fill()});
  const d=new Path2D('M32,26C34,30 36,33 36,36C36,39 34,41 32,41C30,41 28,39 28,36C28,33 30,30 32,26Z');glow(x,32,36,12,[120,200,255],.45);
  x.fillStyle=rg(x,30.5,34,0,32,36,6,[[0,'#ffffff'],[.3,'#bfe8ff'],[1,'#3a8ad8']]);x.fill(d);gloss(x,30.6,34.5,.9,1.6,.95);edge(x,d,.3,.3)});
make('weihwasser',x=>{ground(x,32,56,14,3.5);bottle(x,{liq:[120,190,236],lvl:.75,w:20,h:40,neck:7,label:(x,X,w,top)=>{x.fillStyle='#e2c264';const c=top+30;x.fillRect(X-1.3,c-6,2.6,13);x.fillRect(X-5,c-2.5,10,2.6);x.fillStyle='rgba(255,255,255,.4)';x.fillRect(X-1.3,c-6,.8,13)}})});

// ---------- Glut in der Dose ----------
make('glut',x=>{ground(x,32,57,20,3.5);glow(x,32,26,28,[255,110,20],.45);
  const can=new Path2D('M12,28L52,28L50,54C50,57 46,58 32,58C18,58 14,57 14,54Z');x.fillStyle=lg(x,12,0,52,0,[[0,'#4a4c52'],[.22,'#c8ccd2'],[.4,'#8a8e96'],[.8,'#4a4e56'],[1,'#2a2c30']]);x.fill(can);
  x.save();x.clip(can);for(let Y=34;Y<58;Y+=6){x.fillStyle='rgba(0,0,0,.25)';x.fillRect(12,Y,40,.8);x.fillStyle='rgba(255,255,255,.15)';x.fillRect(12,Y+.8,40,.5)}x.fillStyle=lg(x,0,28,0,40,[[0,'rgba(255,120,40,.4)'],[1,'rgba(255,120,40,0)']]);x.fillRect(12,28,40,14);x.restore();
  inner(x,can,'rgba(0,0,0,.5)',3,-1,-1);
  x.fillStyle='#1a120e';x.beginPath();x.ellipse(32,28,20,5,0,0,7);x.fill();
  for(let i=0;i<9;i++){const X=17+i*3.6+(r()-.5)*2,Y=27+(r()-.5)*3,R=2+r()*1.8;x.fillStyle=rg(x,X-.5,Y-.6,0,X,Y,R,[[0,'#fff2a0'],[.35,'#ff8a1a'],[.8,'#a02008'],[1,'#3a0c04']]);x.beginPath();x.ellipse(X,Y,R,R*.7,0,0,7);x.fill()}
  glow(x,32,27,12,[255,170,60],.5);
  for(let i=0;i<3;i++){x.strokeStyle=`rgba(200,200,205,${.3-i*.08})`;x.lineWidth=1.4;x.beginPath();x.moveTo(26+i*6,22);x.bezierCurveTo(22+i*6,14,32+i*4,10,28+i*6,2);x.stroke()}
  x.strokeStyle=lg(x,50,30,58,46,[[0,'#c8ccd2'],[1,'#3a3c40']]);x.lineWidth=2;x.beginPath();x.moveTo(51,33);x.bezierCurveTo(58,33,58,44,50,45);x.stroke()});

// ---------- Der fertige Ausweg-Joint ----------
make('joint2',x=>{ground(x,32,50,26,4);glow(x,34,36,26,[255,210,90],.25);
  x.save();x.translate(8,48);x.rotate(Math.atan2(-30,44));const L=52,p=new Path2D();p.moveTo(0,-2.2);p.lineTo(L-6,-4.6);p.quadraticCurveTo(L+2,-5,L+4,-1);p.quadraticCurveTo(L+1,4,L-6,4.6);p.lineTo(0,2.2);p.closePath();
  x.fillStyle=lg(x,0,-5,0,5,[[0,'#bfb8a4'],[.25,'#fffdf4'],[.6,'#ece4d0'],[1,'#9a9280']]);x.fill(p);x.save();x.clip(p);
  for(let i=0;i<22;i++){x.fillStyle=r()<.5?'rgba(80,150,255,.8)':'rgba(240,190,50,.9)';x.beginPath();x.arc(10+r()*(L-12),(r()-.5)*7,.35+r()*.4,0,7);x.fill()}
  for(let i=0;i<12;i++){x.strokeStyle='rgba(140,130,110,.3)';x.lineWidth=.2;const X=6+r()*(L-6);x.beginPath();x.moveTo(X,-5);x.lineTo(X+2,5);x.stroke()}x.fillStyle=lg(x,0,0,9,0,[[0,'#c9a46a'],[1,'#dcc28e']]);x.fillRect(0,-3,9,6);x.restore();
  inner(x,p,'rgba(60,50,30,.35)',1.5,-.5,-.5);edge(x,p,.4,.3);x.fillStyle='#e8e0cc';x.beginPath();x.moveTo(L+3,-1.4);x.quadraticCurveTo(L+7,-3,L+8,0);x.quadraticCurveTo(L+6,1,L+3,.8);x.fill();x.restore();
  for(let i=0;i<6;i++){const X=12+r()*40,Y=14+r()*26;glow(x,X,Y,2.2,[255,230,140],.6)}});

// ---------- Blaue Traumschwämme (frisch aus der Höhle) ----------
function shroom(x,X,Y,s,cap){x.save();x.translate(X,Y);x.scale(s,s);
  const st=new Path2D('M-3,0C-3.6,-6 -2.4,-12 -2,-16L2,-16C2.6,-12 3.4,-6 3,0C1.6,1.2 -1.6,1.2 -3,0Z');x.fillStyle=lg(x,-3,0,3,0,[[0,'#9aa8c0'],[.35,'#eef2fa'],[1,'#7a88a2']]);x.fill(st);inner(x,st,'rgba(20,30,60,.4)',1.5,-.5,-.5);
  const cp=new Path2D('M-12,-15C-12,-24 -6,-29 0,-29C6,-29 12,-24 12,-15C8,-13 -8,-13 -12,-15Z');x.fillStyle=rg(x,-4,-25,1,0,-20,14,[[0,cap[0]],[.5,cap[1]],[1,cap[2]]]);x.fill(cp);
  x.save();x.clip(cp);for(let i=0;i<7;i++){x.fillStyle='rgba(230,245,255,.85)';x.beginPath();x.ellipse((r()-.5)*18,-17-r()*10,.8+r()*1,.6+r()*.7,0,0,7);x.fill()}x.restore();
  inner(x,cp,'rgba(0,10,50,.6)',2,-.8,-.8);gloss(x,-4,-25,4,2,.55,-.3);x.fillStyle='rgba(20,30,70,.5)';x.beginPath();x.ellipse(0,-14.6,11,1.2,0,0,7);x.fill();x.restore()}
make('blaupilze',x=>{ground(x,32,56,24,4);glow(x,32,34,28,[80,160,255],.35);const cap=['#9ae0ff','#2a7ad8','#0e2a6a'];
  shroom(x,20,54,.9,cap);shroom(x,44,55,.8,cap);shroom(x,32,57,1.12,cap);
  for(let i=0;i<10;i++)glow(x,12+r()*40,20+r()*30,1.6,[160,220,255],.7)});

// ---------- Zwiebel ----------
make('zwiebel',x=>{ground(x,32,56,16,3.5);const p=new Path2D('M32,16C36,22 50,28 50,40C50,50 42,56 32,56C22,56 14,50 14,40C14,28 28,22 32,16Z');
  x.fillStyle=rg(x,26,34,1,32,40,22,[[0,'#ff9ac8'],[.4,'#c03a7a'],[.85,'#6a1240'],[1,'#3a0820']]);x.fill(p);x.save();x.clip(p);
  for(let i=0;i<12;i++){const t=i/11,X=15+t*34;x.strokeStyle=`rgba(${i%3?90:255},${i%3?10:200},${i%3?40:230},${.18+r()*.15})`;x.lineWidth=.5+r()*.6;x.beginPath();x.moveTo(32,16);x.quadraticCurveTo(X+(X-32)*.4,38,32+(X-32)*.5,57);x.stroke()}
  x.fillStyle='rgba(230,200,170,.35)';x.beginPath();x.moveTo(36,24);x.quadraticCurveTo(50,30,47,46);x.quadraticCurveTo(44,34,36,24);x.fill();x.restore();
  inner(x,p,'rgba(40,0,20,.6)',4,-2,-2);gloss(x,24,34,4,6,.6,.3);edge(x,p,.4,.35);
  x.strokeStyle='rgba(230,210,170,.85)';x.lineWidth=.4;for(let i=0;i<9;i++){x.beginPath();x.moveTo(30+i*.5,56);x.quadraticCurveTo(28+i*.8+(r()-.5)*4,59,26+i*1.5,61);x.stroke()}
  [[-5,-14],[0,-16],[5,-12]].forEach(([dx,dy],i)=>{x.strokeStyle=lg(x,32,16,32+dx,16+dy,[[0,'#4a8a2a'],[1,'#a8d870']]);x.lineWidth=2.2-i*.3;x.beginPath();x.moveTo(32,17);x.quadraticCurveTo(32+dx*.4,16+dy*.6,32+dx,16+dy);x.stroke()});
  glow(x,32,24,4,[255,255,255],.1)});

if(typeof renderInv=='function')renderInv()})();
