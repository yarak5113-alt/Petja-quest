// ================= Realistische Spielobjekte =================
// Die anklickbaren Gegenstände (Joint, Apfel, Würmer, Netz, Schnaps, Leiter, Brett, Gebiss, Mühlrad, Angelschnur) werden
// einmal beim Laden mit Licht, Material und Kontaktschatten auf ein Canvas gemalt und als Bild in ihre SVG-Gruppe gesetzt.
// Position, Klickfläche, IDs und Animationen (Würmer, Rauch, Rad, Schnur) bleiben unverändert.
(()=>{let q=4242;const r=()=>(q=q*16807%2147483647)/2147483647,sd=v=>{q=Math.abs(v|0)%2147483000+17;r();r()};
// Bild im lokalen Koordinatensystem der Gruppe: Ausschnitt x0..x0+w, y0..y0+h, Auflösung K
const pic=(x0,y0,w,h,draw,K=8)=>{const c0=document.createElement('canvas');c0.width=Math.ceil(w*K);c0.height=Math.ceil(h*K);const x=c0.getContext('2d');x.scale(K,K);x.translate(-x0,-y0);x.lineCap='round';x.lineJoin='round';draw(x);
  return `<image href="${c0.toDataURL()}" x="${x0}" y="${y0}" width="${w}" height="${h}"/>`};
const G=id=>document.getElementById(id)||document.querySelector(`[data-id="${id}"]`);
const shade=(x,X,Y,rx,ry,a=.5)=>{x.save();x.translate(X,Y);x.scale(1,ry/rx);const g=x.createRadialGradient(0,0,0,0,0,rx);g.addColorStop(0,`rgba(0,0,0,${a})`);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(-rx,-rx,2*rx,2*rx);x.restore()};
const grad=(x,a,b,stops)=>{const g=x.createLinearGradient(...a,...b);stops.forEach(([s,c])=>g.addColorStop(s,c));return g};

// ---------- Joint-Stummel ----------
function kippe(){const g=G('kippe');if(!g)return;const sm=g.querySelector('.smoke');sm&&sm.remove();
  g.innerHTML=pic(-18,-35,34,16,x=>{sd(1);shade(x,-3,-22.6,15,2.6,.55);
    const body=new Path2D('M-9,-27.9C-4,-28.6 3,-29.6 8,-30.3L8.7,-25.9C3,-25.3 -4,-24.6 -8.6,-24.1Z');
    x.fillStyle=grad(x,[0,-30],[0,-24],[[0,'#fbf8f0'],[.35,'#f2ece0'],[.75,'#d6cfc0'],[1,'#a8a090']]);x.fill(body);x.save();x.clip(body);
    for(let i=0;i<14;i++){const X=-8+r()*16;x.strokeStyle=`rgba(120,110,96,${.15+r()*.25})`;x.lineWidth=.12+r()*.12;x.beginPath();x.moveTo(X,-30);x.lineTo(X+(r()-.5)*2.4,-24);x.stroke()}
    x.strokeStyle='rgba(140,130,112,.45)';x.lineWidth=.18;x.beginPath();x.moveTo(-8.8,-26.7);x.lineTo(8.4,-28.8);x.stroke();
    const st=x.createRadialGradient(6,-28,0,6,-28,4.5);st.addColorStop(0,'rgba(150,110,40,.55)');st.addColorStop(1,'rgba(150,110,40,0)');x.fillStyle=st;x.fillRect(0,-31,9,7);x.restore();
    x.strokeStyle='rgba(60,50,40,.55)';x.lineWidth=.22;x.stroke(body);
    // Filter/Tip aus gerolltem Karton
    const tip=new Path2D('M-15,-27L-9,-27.9L-8.6,-24.1L-14.6,-23.6Z');x.fillStyle=grad(x,[0,-28],[0,-23.5],[[0,'#e4cfa4'],[.4,'#d2b884'],[1,'#8a7148']]);x.fill(tip);x.strokeStyle='rgba(60,40,20,.5)';x.lineWidth=.2;x.stroke(tip);
    x.save();x.translate(-14.85,-25.3);x.scale(.32,1);x.fillStyle='#c8ae7c';x.beginPath();x.arc(0,0,1.75,0,7);x.fill();x.strokeStyle='rgba(90,66,36,.85)';x.lineWidth=.35;x.beginPath();for(let a=0;a<12;a+=.3)x.lineTo(Math.cos(a)*a*.13,Math.sin(a)*a*.13);x.stroke();x.restore();
    // Asche und Glut
    x.save();x.translate(8.4,-28.1);x.rotate(-.12);x.fillStyle=grad(x,[-1,0],[1.6,0],[[0,'#6a6660'],[1,'#b8b4ac']]);x.beginPath();x.ellipse(.2,0,1.3,2.2,0,0,7);x.fill();
    const em=x.createRadialGradient(.9,0,0,.9,0,1.8);em.addColorStop(0,'#fff2a0');em.addColorStop(.35,'#ff8a1a');em.addColorStop(.8,'#a01e08');em.addColorStop(1,'rgba(60,10,4,0)');x.fillStyle=em;x.beginPath();x.ellipse(.9,0,1.2,1.9,0,0,7);x.fill();
    x.globalCompositeOperation='lighter';const gl=x.createRadialGradient(1,0,0,1,0,6);gl.addColorStop(0,'rgba(255,120,30,.45)');gl.addColorStop(1,'rgba(255,120,30,0)');x.fillStyle=gl;x.fillRect(-5,-6,12,12);x.restore()})+(sm?sm.outerHTML:'')}

// ---------- Apfel ----------
function apfel(){const g=G('apfelG');if(!g)return;g.innerHTML='<circle r="11" fill="#000" fill-opacity="0"/>'+pic(-9,-12,18,19,x=>{sd(2);
  const p=new Path2D('M0,-3.6C2.4,-5.8 6,-4.6 5.6,.2C5.3,3.6 3,5.4 1.2,5.2C.6,5.1 -.6,5.1 -1.2,5.2C-3,5.4 -5.3,3.6 -5.6,.2C-6,-4.6 -2.4,-5.8 0,-3.6Z');
  const b=x.createRadialGradient(-1.8,-2,0,0,0,6.4);b.addColorStop(0,'#e8452a');b.addColorStop(.45,'#b81e12');b.addColorStop(.85,'#6e0c08');b.addColorStop(1,'#3e0604');x.fillStyle=b;x.fill(p);x.save();x.clip(p);
  const y0=x.createRadialGradient(2.4,3.2,0,2.4,3.2,4);y0.addColorStop(0,'rgba(220,190,60,.75)');y0.addColorStop(1,'rgba(220,190,60,0)');x.fillStyle=y0;x.fillRect(-6,-6,12,12);
  for(let i=0;i<26;i++){const a=-Math.PI*.95+r()*Math.PI*.9+(r()<.5?0:Math.PI),L=3+r()*3;x.strokeStyle=`rgba(${r()<.5?'90,4,4':'230,90,50'},${.18+r()*.2})`;x.lineWidth=.2+r()*.3;x.beginPath();x.moveTo(0,-3.4);x.quadraticCurveTo(Math.cos(a)*L*.6,-3.4+Math.sin(a)*L*.3+L*.4,Math.cos(a)*L,-3.4+Math.abs(Math.sin(a))*L*.6+L*.6);x.stroke()}
  for(let i=0;i<40;i++){const X=(r()-.5)*10,Y=(r()-.5)*9;x.fillStyle='rgba(250,220,170,.55)';x.beginPath();x.arc(X,Y,.11,0,7);x.fill()}
  const sp=x.createRadialGradient(-2.4,-1.8,0,-2.4,-1.8,2);sp.addColorStop(0,'rgba(255,255,255,.85)');sp.addColorStop(.4,'rgba(255,240,230,.3)');sp.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=sp;x.fillRect(-5,-5,6,6);
  x.fillStyle=grad(x,[-6,0],[6,0],[[0,'rgba(0,0,0,0)'],[.7,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,.35)']]);x.fill(p);
  const dm=x.createRadialGradient(0,-3.4,0,0,-3.4,1.6);dm.addColorStop(0,'rgba(40,4,2,.8)');dm.addColorStop(1,'rgba(40,4,2,0)');x.fillStyle=dm;x.fillRect(-2,-5.4,4,4);x.restore();
  x.strokeStyle='rgba(40,6,4,.6)';x.lineWidth=.25;x.stroke(p);
  x.strokeStyle='#4a3218';x.lineWidth=.55;x.beginPath();x.moveTo(0,-3.4);x.quadraticCurveTo(.2,-6,1.2,-7.6);x.stroke();x.strokeStyle='rgba(200,170,120,.5)';x.lineWidth=.2;x.beginPath();x.moveTo(-.1,-4);x.quadraticCurveTo(.1,-6,1,-7.4);x.stroke();
  const lf=new Path2D('M1,-6.6C2.4,-9.2 5.6,-9.6 7.4,-8.6C6.4,-6.4 3.6,-5.6 1,-6.6Z');x.fillStyle=grad(x,[1,-9],[6,-6],[[0,'#7aa83a'],[.6,'#4a7a22'],[1,'#2a4a12']]);x.fill(lf);x.strokeStyle='rgba(20,40,8,.7)';x.lineWidth=.2;x.stroke(lf);
  x.strokeStyle='rgba(190,220,140,.6)';x.lineWidth=.15;x.beginPath();x.moveTo(1.2,-6.7);x.quadraticCurveTo(4,-8,7,-8.5);x.stroke()})}

// ---------- Würmer im Erdhaufen ----------
function wuermer(){const g=G('wuermerG');if(!g)return;const worms=[...g.querySelectorAll('path')];
  const soil=pic(-21,-11,42,19,x=>{sd(3);shade(x,0,4,20,5,.6);
    const m=new Path2D('M-17,3C-16,-1 -11,-4.6 -3,-5C5,-5.4 13,-3 16.6,1.4C17.4,3.6 14,5.6 8,6.2C0,6.8 -10,6.6 -15,5.4C-16.8,4.8 -17.4,4 -17,3Z');
    x.fillStyle=grad(x,[0,-5],[0,6],[[0,'#5a4430'],[.45,'#3a2a1c'],[1,'#1a120a']]);x.fill(m);x.save();x.clip(m);
    for(let i=0;i<420;i++){const X=-17+r()*34,Y=-5.5+r()*12,k=r(),c=k<.3?[30,20,12]:k<.75?[74,56,38]:[112,90,64];x.fillStyle=`rgba(${c},${.55+r()*.4})`;x.beginPath();x.ellipse(X,Y,.25+r()*.75,.2+r()*.5,r()*3,0,7);x.fill()}
    [[-10,0,1.4],[6,2,1.1],[11,-.6,.9],[-4,3.6,.8]].forEach(([X,Y,s])=>{const pg=x.createRadialGradient(X-s*.4,Y-s*.4,0,X,Y,s);pg.addColorStop(0,'#c8c0b0');pg.addColorStop(.6,'#807868');pg.addColorStop(1,'#3a342c');x.fillStyle=pg;x.beginPath();x.ellipse(X,Y,s,s*.7,0,0,7);x.fill()});
    x.strokeStyle='rgba(150,120,80,.6)';x.lineWidth=.2;for(let i=0;i<8;i++){const X=-14+r()*28,Y=-2+r()*6;x.beginPath();x.moveTo(X,Y);x.quadraticCurveTo(X+2,Y-1.5,X+3+r()*2,Y+r());x.stroke()}
    x.fillStyle='rgba(255,255,255,.08)';x.beginPath();x.ellipse(-3,-3,9,1.6,0,0,7);x.fill();
    x.fillStyle=grad(x,[-17,0],[17,0],[[0,'rgba(255,230,190,.1)'],[.6,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,.35)']]);x.fill(m);x.restore();
    [[-9,0],[2,0],[-3,2]].forEach(([X,Y])=>{x.fillStyle='rgba(8,4,2,.9)';x.beginPath();x.ellipse(X,Y,1.3,.6,0,0,7);x.fill()})});
  const layer=(stroke,w,extra='')=>`<g fill="none" stroke-linecap="round" stroke="${stroke}" stroke-width="${w}" ${extra}>${worms.map(p=>p.outerHTML.replace(/stroke="[^"]*"/,'')).join('')}</g>`;
  g.innerHTML='<rect x="-20" y="-12" width="40" height="18" fill="#000" fill-opacity="0"/>'+soil+layer('#5a2a26',2.6)+layer('#b86a64',2.1)+layer('#7a3a36',2.1,'stroke-dasharray=".22 .7" opacity=".55"')+layer('#f2b8b0',.55,'opacity=".55" transform="translate(-.25,-.35)"')}

// ---------- kaputtes Netz (Haufen) ----------
function altnetz(){const g=G('altnetzG');if(!g)return;g.innerHTML=pic(-21,-17,48,22,x=>{sd(4);shade(x,0,1,20,4,.6);
  const heap=new Path2D('M-17,-1C-18,-6 -12,-11 -4,-12C4,-13 12,-10 15,-5C17,-2 15,1 8,1.6C0,2.2 -10,1.8 -15,.8Z');
  x.fillStyle='rgba(30,26,18,.85)';x.fill(heap);x.save();x.clip(heap);
  [[ '70,64,48',.9,.3],['130,120,92',.8,.28],['196,186,150',.9,.22]].forEach(([c,a,w],L)=>{for(let i=0;i<70;i++){const X=-18+r()*34,Y=-13+r()*15,dx=(r()-.5)*14,dy=(r()-.5)*6;x.strokeStyle=`rgba(${c},${a*(.5+r()*.5)})`;x.lineWidth=w;x.beginPath();x.moveTo(X,Y);x.bezierCurveTo(X+dx*.3,Y+dy+2,X+dx*.7,Y-dy+1,X+dx,Y+dy*.5);x.stroke()}
    for(let i=0;i<40;i++){x.fillStyle=`rgba(${c},.9)`;x.beginPath();x.arc(-17+r()*32,-12+r()*13,.3,0,7);x.fill()}});
  x.fillStyle=grad(x,[0,-12],[0,2],[[0,'rgba(255,240,200,.12)'],[.6,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,.45)']]);x.fill(heap);x.restore();
  // abgerissene Maschen am Rand
  for(let i=0;i<12;i++){const a=r()*Math.PI*2,X=Math.cos(a)*15,Y=-5+Math.sin(a)*6;x.strokeStyle='rgba(200,190,155,.8)';x.lineWidth=.25;x.beginPath();x.moveTo(X,Y);x.quadraticCurveTo(X+Math.cos(a)*2,Y+2,X+Math.cos(a)*3.4+(r()-.5)*2,Y+2.6);x.stroke()}
  x.strokeStyle='rgba(176,164,128,.9)';x.lineWidth=.35;x.beginPath();x.moveTo(13,-4);x.bezierCurveTo(16,-10,19,-2,24,-1);x.stroke();x.strokeStyle='rgba(220,210,170,.5)';x.lineWidth=.15;x.stroke();
  // Korkschwimmer
  [[-9,-8,2.4,-.3],[5,-10.4,2,.5],[11,-3,1.8,.2]].forEach(([X,Y,s,a])=>{x.save();x.translate(X,Y);x.rotate(a);shade(x,.6,1.2,s*1.3,s*.6,.5);const cg=x.createRadialGradient(-s*.4,-s*.35,0,0,0,s*1.2);cg.addColorStop(0,'#e89a58');cg.addColorStop(.6,'#b45a24');cg.addColorStop(1,'#5a2a10');x.fillStyle=cg;x.beginPath();x.ellipse(0,0,s,s*.62,0,0,7);x.fill();
    for(let i=0;i<12;i++){x.fillStyle='rgba(60,24,8,.5)';x.beginPath();x.arc((r()-.5)*s*1.6,(r()-.5)*s,.15,0,7);x.fill()}x.strokeStyle='rgba(210,200,160,.8)';x.lineWidth=.25;x.beginPath();x.moveTo(-s,0);x.lineTo(s,0);x.stroke();x.restore()});
  for(let i=0;i<5;i++){const X=-12+r()*24,Y=-9+r()*8;x.strokeStyle='rgba(70,80,30,.7)';x.lineWidth=.5;x.beginPath();x.moveTo(X,Y);x.quadraticCurveTo(X+1.5,Y+1,X+3,Y+.2);x.stroke()}})}

// ---------- Schnapsflasche ----------
function schnaps(){const g=G('schnapsG');if(!g)return;g.innerHTML=pic(-8,-31,18,34,x=>{sd(5);shade(x,1,0,8,1.8,.55);
  const b=new Path2D('M-4,0V-14C-4,-17 -2,-18 -2,-21V-26H2V-21C2,-18 4,-17 4,-14V0Z');
  x.fillStyle='rgba(170,196,182,.28)';x.fill(b);x.save();x.clip(b);
  x.fillStyle=grad(x,[-4,0],[4,0],[[0,'rgba(220,226,190,.5)'],[.5,'rgba(236,232,200,.25)'],[1,'rgba(150,150,110,.55)']]);x.fillRect(-4,-16,8,16);
  x.fillStyle='rgba(255,255,240,.55)';x.fillRect(-4,-16.2,8,.35);
  x.fillStyle=grad(x,[-4,0],[4,0],[[0,'rgba(10,30,20,.55)'],[.15,'rgba(10,30,20,0)'],[.85,'rgba(10,30,20,0)'],[1,'rgba(10,30,20,.6)']]);x.fillRect(-4,-27,8,27);
  x.fillStyle='rgba(255,255,255,.75)';x.fillRect(-2.9,-13.5,.55,11.5);x.fillStyle='rgba(255,255,255,.35)';x.fillRect(2.3,-12,.35,9);x.fillRect(-1.4,-25,.4,6);
  x.fillStyle='rgba(30,50,40,.45)';x.beginPath();x.ellipse(0,-.4,4,.8,0,0,7);x.fill();x.restore();
  x.strokeStyle='rgba(30,50,40,.75)';x.lineWidth=.3;x.stroke(b);
  // Etikett: altes Papier, handbeschrieben
  const lb=new Path2D('M-3.4,-10.6H3.4V-3.6H-3.4Z');x.fillStyle=grad(x,[-3.4,0],[3.4,0],[[0,'#b8a878'],[.35,'#efe2b8'],[1,'#8a7a52']]);x.fill(lb);x.save();x.clip(lb);for(let i=0;i<10;i++){const g2=x.createRadialGradient(-3+r()*6,-10+r()*6,0,-3+r()*6,-10+r()*6,1.2);g2.addColorStop(0,'rgba(120,90,40,.35)');g2.addColorStop(1,'rgba(120,90,40,0)');x.fillStyle=g2;x.fillRect(-4,-11,8,8)}
  x.strokeStyle='rgba(40,30,60,.85)';x.lineWidth=.22;x.beginPath();x.moveTo(-2.6,-8.4);for(let X=-2.6;X<2.6;X+=.4)x.lineTo(X,-8.4+Math.sin(X*7)*.35);x.moveTo(-2,-6.2);for(let X=-2;X<1.6;X+=.4)x.lineTo(X,-6.2+Math.sin(X*9)*.3);x.stroke();x.restore();
  x.fillStyle=grad(x,[-2,0],[2,0],[[0,'#5a3818'],[.4,'#a8784a'],[1,'#3a2410']]);x.fillRect(-2.1,-28.4,4.2,3);for(let i=0;i<10;i++){x.fillStyle='rgba(40,24,10,.6)';x.fillRect(-2+r()*4,-28.2+r()*2.6,.25,.25)}
  x.fillStyle='rgba(220,200,170,.5)';x.fillRect(-2.1,-28.4,4.2,.3)})}

// ---------- Leiter (halb verkohlt) ----------
function leiter(){const g=G('leiterG');if(!g)return;g.innerHTML=pic(-13,-115,26,120,x=>{sd(6);shade(x,0,1,12,2,.55);
  [-102,-84,-66,-48,-30,-12].forEach(Y=>{wood(x,-8,Y-1.3,16,2.6,0);x.fillStyle=grad(x,[0,Y-1.3],[0,Y+1.3],[[0,'rgba(255,236,200,.18)'],[.5,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,.55)']]);x.fillRect(-8,Y-1.3,16,2.6);x.fillStyle='rgba(0,0,0,.35)';x.fillRect(-8,Y+1.3,16,.8)});
  [-8,8].forEach((X,i)=>{wood(x,X-1.7,-110,3.4,110,1);x.fillStyle=grad(x,[X-1.7,0],[X+1.7,0],[[0,'rgba(255,236,200,.22)'],[.4,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,.6)']]);x.fillRect(X-1.7,-110,3.4,110);x.fillStyle='rgba(140,136,126,.25)';x.fillRect(X-1.7,-110,3.4,110);
    for(let Y=-102;Y<0;Y+=18){x.fillStyle='rgba(20,14,8,.7)';x.beginPath();x.arc(X,Y,.6,0,7);x.fill()}});
  // verkohlter Holm oben links
  x.save();x.beginPath();x.rect(-9.8,-111,3.6,52);x.clip();x.fillStyle='rgba(10,8,6,.92)';x.fillRect(-10,-111,4,52);for(let Y=-110;Y<-59;Y+=1.4+r()*1.2){x.fillStyle='rgba(0,0,0,.9)';x.fillRect(-9.8,Y,3.6,.35);x.fillStyle='rgba(120,112,100,.35)';x.fillRect(-9.6+r()*2,Y+.4,1+r(),.25)}
  const tr=grad(x,[0,-66],[0,-58],[[0,'rgba(10,8,6,0)'],[1,'rgba(90,60,30,0)']]);x.fillStyle=tr;x.fillRect(-10,-66,4,8);x.restore();
  for(let i=0;i<10;i++){x.fillStyle=`rgba(20,16,12,${.3+r()*.4})`;x.beginPath();x.arc(-8+(r()-.5)*2,-60+r()*6,.5+r(),0,7);x.fill()}
  x.fillStyle='rgba(40,60,20,.5)';for(let i=0;i<14;i++){const X=(r()<.5?-8:8)+(r()-.5)*2;x.beginPath();x.ellipse(X,-2-r()*8,.5,.8,0,0,7);x.fill()}})}

// ---------- angekokeltes Brett ----------
function brett(){const g=G('brett');if(!g)return;g.innerHTML=pic(-3,-9,71,21,x=>{sd(7);shade(x,32,7,34,3,.55);
  const face=new Path2D('M0,0L64,-5L65,3L1,8Z');x.save();x.clip(face);x.translate(0,0);x.rotate(-5/64);wood(x,-2,-1,70,10,0);x.restore();
  x.save();x.clip(face);x.fillStyle='rgba(150,146,136,.25)';x.fill(face);x.fillStyle=grad(x,[0,-4],[0,8],[[0,'rgba(255,236,200,.18)'],[.5,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,.4)']]);x.fill(face);
  // Brandende mit Krokodilhaut-Rissen
  x.fillStyle=grad(x,[44,0],[54,0],[[0,'rgba(20,12,6,0)'],[.5,'rgba(30,18,8,.7)'],[1,'rgba(8,6,4,.98)']]);x.fillRect(42,-8,24,18);
  for(let X=50;X<66;X+=1.2+r()){for(let Y=-6;Y<9;Y+=1.6+r()*1.4){x.fillStyle='rgba(0,0,0,.95)';x.fillRect(X,Y,.25,1.2);x.fillRect(X,Y+1.2,1.1,.22);if(r()<.4){x.fillStyle='rgba(150,144,134,.35)';x.fillRect(X+.3,Y+.2,.7,.5)}}}x.restore();
  const edge=new Path2D('M1,8L65,3L65,4.6L1,9.8Z');x.fillStyle='#2e2014';x.fill(edge);x.fillStyle='rgba(0,0,0,.6)';x.fillRect(50,2,16,8);
  x.strokeStyle='rgba(16,10,4,.8)';x.lineWidth=.3;x.stroke(face);
  x.fillStyle='#3a3a3a';[[8,2.4],[40,0]].forEach(([X,Y])=>{x.beginPath();x.arc(X,Y,.7,0,7);x.fill();x.fillStyle='rgba(120,50,20,.5)';x.beginPath();x.ellipse(X+1,Y+.6,1.4,.5,0,0,7);x.fill();x.fillStyle='#3a3a3a'})})}

// ---------- Gebiss ----------
function gebiss(){const g=G('gebissG');if(!g)return;g.innerHTML='<rect x="-12" y="-10" width="24" height="16" fill="#000" fill-opacity="0"/>'+pic(-11,-8,22,12,x=>{sd(8);shade(x,0,1.6,10,1.8,.55);
  const gum=new Path2D('M-8.6,0C-9,-4 -6,-6.6 0,-6.6C6,-6.6 9,-4 8.6,0C6,1.6 3,2.2 0,2.2C-3,2.2 -6,1.6 -8.6,0Z');
  x.fillStyle=grad(x,[0,-6.6],[0,2.2],[[0,'#f0a4a8'],[.5,'#d8707a'],[1,'#8a3a44']]);x.fill(gum);x.save();x.clip(gum);for(let i=0;i<14;i++){x.strokeStyle='rgba(150,40,60,.25)';x.lineWidth=.12;x.beginPath();const X=-8+r()*16;x.moveTo(X,-6);x.quadraticCurveTo(X+(r()-.5)*2,-4,X+(r()-.5)*2,-2);x.stroke()}
  x.fillStyle='rgba(255,230,230,.45)';x.beginPath();x.ellipse(-2.4,-5.2,4,.7,-.1,0,7);x.fill();x.restore();x.strokeStyle='rgba(90,30,36,.6)';x.lineWidth=.2;x.stroke(gum);
  const T=[[-6.6,1.5,2.8],[-4.6,1.8,3.2],[-2.4,2,3.6],[0,2.1,3.8],[2.4,2,3.6],[4.6,1.8,3.2],[6.6,1.5,2.8]];
  T.forEach(([X,w,h],i)=>{const top=-2.4+Math.abs(X)*.12,p=new Path2D(`M${X-w/2},${top}L${X+w/2},${top}L${X+w*.46},${top+h-.5}Q${X},${top+h+.3} ${X-w*.46},${top+h-.5}Z`);
    x.fillStyle=grad(x,[X-w/2,0],[X+w/2,0],[[0,'#b8ae94'],[.35,'#f8f2e2'],[.7,'#ece2c8'],[1,'#9a907a']]);x.fill(p);x.fillStyle=grad(x,[0,top],[0,top+h],[[0,'rgba(160,120,60,.35)'],[.4,'rgba(0,0,0,0)'],[1,'rgba(255,255,255,.2)']]);x.fill(p);
    x.strokeStyle='rgba(90,80,60,.6)';x.lineWidth=.15;x.stroke(p);x.fillStyle='rgba(255,255,255,.7)';x.fillRect(X-w*.25,top+.6,w*.12,h*.45)});
  x.fillStyle='rgba(140,50,60,.6)';x.beginPath();x.ellipse(0,-2.4,8,.5,0,0,7);x.fill()})}

// ---------- Mühlrad ----------
function mrad(){const g=document.querySelector('[data-id="mrad"] .wheel');if(!g)return;g.innerHTML=pic(350,220,160,160,x=>{sd(9);const C=[430,300];
  const beam=(a,r0,r1,w,dk)=>{x.save();x.translate(...C);x.rotate(a);wood(x,r0,-w/2,r1-r0,w,0);x.fillStyle=grad(x,[0,-w/2],[0,w/2],[[0,'rgba(255,236,200,.18)'],[.45,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,.6)']]);x.fillRect(r0,-w/2,r1-r0,w);
    if(dk){x.fillStyle=`rgba(20,30,20,${dk})`;x.fillRect(r0,-w/2,r1-r0,w)}x.strokeStyle='rgba(16,10,4,.7)';x.lineWidth=.4;x.strokeRect(r0,-w/2,r1-r0,w);x.restore()};
  // Speichen
  for(let i=0;i<12;i++)beam(i*Math.PI/6,8,70,4.4,.15);
  // Felgen aus Segmenten
  [[72,7],[56,4.2]].forEach(([R0,w])=>{for(let i=0;i<24;i++){const a0=i*Math.PI/12,a1=a0+Math.PI/12+.01;x.save();x.beginPath();x.arc(...C,R0+w/2,a0,a1);x.arc(...C,R0-w/2,a1,a0,true);x.closePath();x.clip();
    x.translate(...C);x.rotate(a0+Math.PI/24+Math.PI/2);wood(x,-R0*.15,-R0-w,R0*.3,w*2,0);x.restore()}
    const rg=x.createRadialGradient(...C,R0-w/2,...C,R0+w/2);rg.addColorStop(0,'rgba(0,0,0,.5)');rg.addColorStop(.35,'rgba(255,236,200,.12)');rg.addColorStop(1,'rgba(0,0,0,.55)');x.fillStyle=rg;x.beginPath();x.arc(...C,R0+w/2,0,7);x.arc(...C,R0-w/2,0,7,true);x.fill();
    for(let i=0;i<24;i++){const a=i*Math.PI/12;x.strokeStyle='rgba(10,6,2,.85)';x.lineWidth=.5;x.beginPath();x.moveTo(C[0]+Math.cos(a)*(R0-w/2),C[1]+Math.sin(a)*(R0-w/2));x.lineTo(C[0]+Math.cos(a)*(R0+w/2),C[1]+Math.sin(a)*(R0+w/2));x.stroke()}
    for(let i=0;i<70;i++){const a=r()*7,rr=R0+(r()-.5)*w;x.fillStyle=`rgba(${r()<.6?'60,90,40':'30,50,24'},${.4+r()*.4})`;x.beginPath();x.ellipse(C[0]+Math.cos(a)*rr,C[1]+Math.sin(a)*rr,.5+r()*1.2,.4+r()*.7,a,0,7);x.fill()}});
  // Schaufeln
  for(let i=0;i<8;i++){const a=i*Math.PI/4-Math.PI/2;x.save();x.translate(...C);x.rotate(a);x.fillStyle='rgba(0,0,0,.4)';x.fillRect(65,-6.2,16,13.4);wood(x,64,-7,16,13,1);
    x.fillStyle=grad(x,[64,0],[80,0],[[0,'rgba(0,0,0,.4)'],[.3,'rgba(255,236,200,.1)'],[1,'rgba(10,20,10,.45)']]);x.fillRect(64,-7,16,13);x.fillStyle='rgba(30,50,26,.35)';x.fillRect(74,-7,6,13);
    x.fillStyle='rgba(220,236,240,.35)';x.fillRect(79.2,-7,.6,13);x.strokeStyle='rgba(16,10,4,.8)';x.lineWidth=.5;x.strokeRect(64,-7,16,13);
    [[-4],[4]].forEach(([Y])=>{x.fillStyle='#2a2a28';x.beginPath();x.arc(67,Y,.6,0,7);x.fill()});x.restore()}
  // Nabe mit Eisenband
  const hg=x.createRadialGradient(426,296,0,...C,13);hg.addColorStop(0,'#8a6a44');hg.addColorStop(.7,'#4a3018');hg.addColorStop(1,'#1a1008');x.fillStyle=hg;x.beginPath();x.arc(...C,12,0,7);x.fill();
  x.strokeStyle='#2a2a2c';x.lineWidth=2;x.beginPath();x.arc(...C,10.5,0,7);x.stroke();x.strokeStyle='rgba(200,200,200,.35)';x.lineWidth=.5;x.beginPath();x.arc(...C,11,3.6,5.2);x.stroke();
  for(let i=0;i<6;i++){const a=i*Math.PI/3;x.fillStyle='#1a1a1a';x.beginPath();x.arc(C[0]+Math.cos(a)*10.5,C[1]+Math.sin(a)*10.5,.8,0,7);x.fill()}
  const ag=x.createRadialGradient(428.5,298.5,0,...C,4.5);ag.addColorStop(0,'#c8c8c4');ag.addColorStop(.5,'#6a6a68');ag.addColorStop(1,'#1e1e1e');x.fillStyle=ag;x.beginPath();x.arc(...C,4.2,0,7);x.fill();
  x.fillStyle='rgba(120,60,20,.5)';x.beginPath();x.arc(431,301,2,0,7);x.fill()},5)}

// ---------- Angelschnur unter dem Steg ----------
function schnur(){const g=document.querySelector('[data-id="schnur"] .sway');if(!g)return;
  g.innerHTML='<path d="M430.4,0V300" stroke="#2a2a24" stroke-opacity=".35" stroke-width="1.1" fill="none"/><path d="M430,0V300" stroke="#d8d2bc" stroke-width=".7" fill="none"/><path d="M430,0V300" stroke="#fff" stroke-opacity=".4" stroke-width=".25" stroke-dasharray="3 5" fill="none"/>'+
    '<path d="M430,296v2.6" stroke="#5a5048" stroke-width="1.6" stroke-linecap="round"/>'+
    pic(421,297,12,14,x=>{x.strokeStyle='#3a3a3c';x.lineWidth=1.4;x.beginPath();x.moveTo(430,298);x.lineTo(430,306);x.bezierCurveTo(430,310.6,424,310.6,424,306.6);x.lineTo(425.4,305);x.stroke();
      x.strokeStyle='#c8ccd0';x.lineWidth=.45;x.beginPath();x.moveTo(429.6,298.4);x.lineTo(429.6,306);x.bezierCurveTo(429.6,309.6,425,309.8,424.6,307);x.stroke();
      x.fillStyle='#2a2a2c';x.beginPath();x.moveTo(424,306.6);x.lineTo(426,304.4);x.lineTo(425.2,307.4);x.fill()})}

// ---------- Netzgestell beim Fischer (Hintergrund) ----------
window.netRack=function(x){[[268,372],[338,366]].forEach(([X,Y])=>{shadowAt(x,X,Y,10);wood(x,X-2.2,Y-82,4.4,82,1);x.fillStyle=grad(x,[X-2.2,0],[X+2.2,0],[[0,'rgba(255,236,200,.2)'],[.5,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,.55)']]);x.fillRect(X-2.2,Y-82,4.4,82)});
  x.save();x.translate(0,0);wood(x,264,291,80,3,0);x.restore();sd(10);
  const N=16,M=10,P=(i,j)=>{const t=i/N,X=268+70*t,Y=293-6*t,sag=Math.sin(t*Math.PI)*j*1.1;return[X+Math.sin(t*3+j*.7)*1.6+(j>6?(r()-.5)*.6:0),Y+j*5.6+sag+Math.sin(t*3.1)*j*.8]};
  const pts=[];for(let i=0;i<=N;i++){pts[i]=[];for(let j=0;j<=M;j++)pts[i][j]=P(i,j)}
  const strand=(a,b,c0)=>{x.strokeStyle=c0;x.beginPath();x.moveTo(...a);x.quadraticCurveTo((a[0]+b[0])/2+.4,(a[1]+b[1])/2+.6,...b);x.stroke()};
  [['rgba(20,16,10,.55)',1.1,.5],['rgba(196,184,150,.85)',.55,0],['rgba(240,232,200,.4)',.2,-.25]].forEach(([c0,w,o])=>{x.lineWidth=w;x.save();x.translate(o,o);
    for(let i=0;i<N;i++)for(let j=0;j<M;j++){if((i*7+j*3)%23==0)continue;const a=pts[i][j],b=pts[i+1][j+1],c=pts[i+1][j],d=pts[i][j+1];strand(a,(i+j)%2?b:c,c0);if(j<M-1||i%3)strand(a,d,c0)}x.restore()});
  for(let i=0;i<=N;i++)for(let j=0;j<=M;j++){if(r()<.5)continue;x.fillStyle='rgba(120,108,80,.9)';x.beginPath();x.arc(...pts[i][j],.45,0,7);x.fill()}
  for(let i=0;i<6;i++){const [X,Y]=pts[i*3>N?N:i*3][0],f=x.createRadialGradient(X+3-1,Y-1,0,X+3,Y,2.6);f.addColorStop(0,'#f0a060');f.addColorStop(.6,'#c05a24');f.addColorStop(1,'#5a2410');x.fillStyle=f;x.beginPath();x.ellipse(X+3,Y-.6,2.4,1.5,0,0,7);x.fill()}
  for(let i=0;i<8;i++){const [X,Y]=pts[2+r()*12|0][3+r()*6|0];x.strokeStyle='rgba(60,80,30,.7)';x.lineWidth=.6;x.beginPath();x.moveTo(X,Y);x.quadraticCurveTo(X+1,Y+3,X-.5,Y+5);x.stroke()}};

[kippe,apfel,wuermer,altnetz,schnaps,leiter,brett,gebiss,mrad,schnur].forEach(f=>{try{f()}catch(e){console.error('Objekt',f.name,e)}});
})();

// ================= gemalte Objekte im Hintergrund (Fliegenpilz, Baumstumpf, Mühle, Mühlsteine) =================
(()=>{let q=99;const r=()=>(q=q*16807%2147483647)/2147483647,sd=v=>{q=Math.abs(v|0)%2147483000+17;r();r()};
const LG=(x,a,b,st)=>{const g=x.createLinearGradient(...a,...b);st.forEach(([s,c])=>g.addColorStop(s,c));return g};
// Feldsteinmauer mit Mörtelfugen
function stoneWall(x,x0,x1,y0,y1,sz,lx=-1){sd(x0*3+y0);x.fillStyle='#3a362e';x.fillRect(x0,y0,x1-x0,y1-y0);
  for(let Y=y0,row=0;Y<y1;row++){const h=sz*(.7+r()*.4);for(let X=x0-(row%2)*sz*.5;X<x1;){const w=sz*(1+r()*.8),c=mix([96,92,82],[156,150,134],r()),cx=X+w/2,cy=Y+h/2;
    const g=x.createRadialGradient(cx+lx*w*.25,cy-h*.3,0,cx,cy,w*.7);g.addColorStop(0,rgba(mix(c,[226,220,204],.35)));g.addColorStop(.6,rgba(c));g.addColorStop(1,rgba(mix(c,[20,18,14],.55)));x.fillStyle=g;x.beginPath();
    for(let a=0;a<6.28;a+=.55){const k=.86+r()*.2;x.lineTo(cx+Math.cos(a)*w*.5*k,cy+Math.sin(a)*h*.5*k)}x.closePath();x.fill();
    if(r()<.35){x.fillStyle=r()<.5?'rgba(70,96,36,.45)':'rgba(120,130,110,.45)';x.beginPath();x.ellipse(cx-w*.1,cy-h*.25,w*.3,h*.15,0,0,7);x.fill()}X+=w+.6}Y+=h+.5}
  const g=x.createLinearGradient(0,y0,0,y1);g.addColorStop(0,'rgba(0,0,0,.5)');g.addColorStop(.3,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.35)');x.fillStyle=g;x.fillRect(x0,y0,x1-x0,y1-y0)}
window.stoneWall=stoneWall;

window.mushroom=function(x,X,Y){sd(X+Y);x.save();x.translate(X-6,Y+1);x.scale(1,.22);dab(x,0,0,40,[10,20,6],.7);x.restore();
  x.fillStyle=LG(x,[X-12,0],[X+12,0],[[0,'#a89c80'],[.35,'#f4eedc'],[1,'#8a8068']]);x.beginPath();x.ellipse(X+1,Y-3,12,6,0,0,7);x.fill();
  for(let i=0;i<4;i++){x.strokeStyle='rgba(200,190,160,.9)';x.lineWidth=1.2;x.beginPath();x.arc(X+1,Y-2-i*2.2,10-i*1.2,Math.PI*.1,Math.PI*.9);x.stroke()}
  const st=new Path2D(`M${X-8},${Y-3}C${X-10},${Y-16} ${X-8},${Y-26} ${X-6},${Y-34}L${X+7},${Y-33}C${X+8},${Y-24} ${X+9},${Y-14} ${X+10},${Y-3}Z`);
  x.fillStyle=LG(x,[X-9,0],[X+10,0],[[0,'#b8ae94'],[.3,'#fbf8ee'],[.65,'#e4dccb'],[1,'#7a7262']]);x.fill(st);x.save();x.clip(st);
  for(let i=0;i<40;i++){const sx=X-8+r()*17;x.strokeStyle=r()<.5?`rgba(150,140,118,${.3+r()*.3})`:`rgba(255,255,250,${.3+r()*.3})`;x.lineWidth=.3+r()*.4;x.beginPath();x.moveTo(sx,Y-34);x.quadraticCurveTo(sx+(r()-.5)*2,Y-18,sx+(r()-.5)*3,Y-2);x.stroke()}
  for(let i=0;i<14;i++){const yy=Y-6-r()*24;x.strokeStyle='rgba(170,160,136,.5)';x.lineWidth=.4;x.beginPath();x.moveTo(X-9,yy);x.quadraticCurveTo(X,yy+1.2,X+10,yy);x.stroke()}x.restore();
  const ring=new Path2D(`M${X-9},${Y-25}C${X-11},${Y-21} ${X-8},${Y-18} ${X-4},${Y-19}C${X},${Y-17} ${X+5},${Y-18} ${X+8},${Y-19}C${X+11},${Y-20} ${X+12},${Y-23} ${X+10},${Y-26}Z`);
  x.fillStyle=LG(x,[0,Y-27],[0,Y-17],[[0,'#f6f2e6'],[.6,'#ddd4c0'],[1,'#a49a82']]);x.fill(ring);x.strokeStyle='rgba(120,110,90,.6)';x.lineWidth=.4;x.stroke(ring);
  for(let k=-8;k<10;k+=2.4){x.strokeStyle='rgba(150,140,118,.5)';x.beginPath();x.moveTo(X+k,Y-25.5);x.lineTo(X+k*1.05,Y-18.6);x.stroke()}
  x.save();x.beginPath();x.ellipse(X+1,Y-32,31,5,0,0,7);x.clip();x.fillStyle='#d8ccae';x.fillRect(X-32,Y-38,66,12);for(let a=0;a<6.28;a+=.06){x.strokeStyle='rgba(140,120,90,.55)';x.lineWidth=.35;x.beginPath();x.moveTo(X+1,Y-32);x.lineTo(X+1+Math.cos(a)*31,Y-32+Math.sin(a)*5);x.stroke()}
  const ug=x.createRadialGradient(X+1,Y-33,0,X+1,Y-32,30);ug.addColorStop(0,'rgba(60,40,20,.65)');ug.addColorStop(.5,'rgba(60,40,20,.2)');ug.addColorStop(1,'rgba(60,40,20,0)');x.fillStyle=ug;x.fillRect(X-32,Y-38,66,12);x.restore();
  const cap=new Path2D(`M${X-33},${Y-31}Q${X-31},${Y-60} ${X-3},${Y-63}Q${X+29},${Y-63} ${X+35},${Y-34}Q${X+18},${Y-29} ${X},${Y-31}Q${X-18},${Y-28} ${X-33},${Y-31}Z`);
  const g=x.createRadialGradient(X-8,Y-56,2,X,Y-44,44);g.addColorStop(0,'#ff6a3a');g.addColorStop(.3,'#dc2a12');g.addColorStop(.7,'#9a1206');g.addColorStop(1,'#4a0602');x.fillStyle=g;x.fill(cap);x.save();x.clip(cap);
  const yb=x.createLinearGradient(0,Y-40,0,Y-29);yb.addColorStop(0,'rgba(230,120,30,0)');yb.addColorStop(1,'rgba(230,140,40,.55)');x.fillStyle=yb;x.fillRect(X-34,Y-40,70,12);
  for(let a=0;a<6.28;a+=.09){x.strokeStyle='rgba(80,8,2,.35)';x.lineWidth=.35;x.beginPath();x.moveTo(X+Math.cos(a)*34,Y-31+Math.sin(a)*3);x.lineTo(X+Math.cos(a)*28,Y-34+Math.sin(a)*3);x.stroke()}
  x.save();x.translate(X-10,Y-54);x.rotate(-.35);x.scale(1,.42);const sp=x.createRadialGradient(0,0,0,0,0,14);sp.addColorStop(0,'rgba(255,240,230,.7)');sp.addColorStop(.5,'rgba(255,200,180,.18)');sp.addColorStop(1,'rgba(255,200,180,0)');x.fillStyle=sp;x.fillRect(-14,-14,28,28);x.restore();
  x.fillStyle=LG(x,[X-34,0],[X+36,0],[[0,'rgba(0,0,0,.25)'],[.55,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,.4)']]);x.fill(cap);x.restore();
  [[-18,-50,4],[-4,-58,3.4],[12,-53,4],[-25,-39,2.6],[24,-42,2.8],[0,-44,3],[20,-56,2.4],[-12,-42,2.2],[6,-37,1.8],[-28,-45,1.6],[30,-38,1.6],[-8,-50,1.6],[16,-46,1.8]].forEach(([a,b,s])=>{const cx=X+a,cy=Y+b;
    x.fillStyle='rgba(80,10,4,.45)';x.beginPath();x.ellipse(cx+.8,cy+1,s*1.05,s*.62,0,0,7);x.fill();x.beginPath();for(let t=0;t<6.28;t+=.7){const k=.75+r()*.35;x.lineTo(cx+Math.cos(t)*s*k,cy+Math.sin(t)*s*.6*k)}x.closePath();
    const wg=x.createRadialGradient(cx-s*.35,cy-s*.35,0,cx,cy,s*1.1);wg.addColorStop(0,'#fffdf4');wg.addColorStop(.6,'#ece2c8');wg.addColorStop(1,'#a89878');x.fillStyle=wg;x.fill();
    for(let k=0;k<3;k++){x.fillStyle='rgba(150,130,100,.5)';x.beginPath();x.arc(cx+(r()-.5)*s,cy+(r()-.5)*s*.5,s*.12,0,7);x.fill()}})};

window.stump=function(x,X,Y){sd(X*7+Y);x.save();x.translate(X-10,Y+10);x.scale(1,.2);dab(x,0,0,64,[10,20,6],.7);x.restore();
  const p=new Path2D(`M${X-40},${Y+10}Q${X-31},${Y+4} ${X-30},${Y-26}H${X+30}Q${X+31},${Y+4} ${X+42},${Y+11}Q${X+26},${Y+8} ${X+18},${Y+13}Q${X+4},${Y+8} ${X-8},${Y+13}Q${X-22},${Y+8} ${X-40},${Y+10}Z`);
  x.fillStyle='#2a1c10';x.fill(p);x.save();x.clip(p);
  for(let i=0;i<34;i++){const sx=X-40+i*2.5+(r()-.5)*1.6,w=1.6+r()*2.2,c=mix([60,44,28],[130,104,74],r());const g=x.createLinearGradient(sx-w,0,sx+w,0);g.addColorStop(0,rgba(mix(c,[0,0,0],.6)));g.addColorStop(.35,rgba(mix(c,[230,210,180],.18)));g.addColorStop(1,rgba(mix(c,[0,0,0],.5)));
    x.fillStyle=g;x.beginPath();x.moveTo(sx-w,Y-27);x.bezierCurveTo(sx-w+(r()-.5)*3,Y-12,sx-w+(r()-.5)*3,Y,sx-w*1.4+(r()-.5)*4,Y+14);x.lineTo(sx+w*1.4,Y+14);x.bezierCurveTo(sx+w,Y,sx+w,Y-12,sx+w,Y-27);x.fill();
    for(let k=0;k<5;k++){x.fillStyle='rgba(10,6,2,.6)';x.fillRect(sx-w*.8,Y-24+r()*36,w*1.6,.45)}}
  x.fillStyle=LG(x,[X-40,0],[X+42,0],[[0,'rgba(0,0,0,.55)'],[.35,'rgba(255,230,190,.08)'],[.6,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,.6)']]);x.fill(p);
  for(let i=0;i<180;i++){const mx=X-38+r()*26,my=Y-8+r()*20;if(fbm(mx/9,my/7,2)<.45)continue;ell(x,mx,my,.6+r()*1.8,.5+r()*1.2,mix([34,60,16],[120,160,50],r()),.85,r()*3)}
  const ao=x.createLinearGradient(0,Y,0,Y+14);ao.addColorStop(0,'rgba(0,0,0,0)');ao.addColorStop(1,'rgba(0,0,0,.6)');x.fillStyle=ao;x.fillRect(X-42,Y,86,15);x.restore();
  const top=new Path2D();top.ellipse(X,Y-26,30,9,0,0,7);x.fillStyle='#1a1008';x.beginPath();x.ellipse(X,Y-25,31,9.6,0,0,7);x.fill();
  const g=x.createRadialGradient(X-6,Y-29,1,X,Y-26,30);g.addColorStop(0,'#e2c496');g.addColorStop(.6,'#b8905e');g.addColorStop(.9,'#7a5a34');g.addColorStop(1,'#3a2614');x.fillStyle=g;x.fill(top);x.save();x.clip(top);
  x.fillStyle='rgba(150,146,136,.3)';x.fill(top);
  for(let rr=2;rr<29;rr+=1.1+r()*1.4){x.strokeStyle=`rgba(110,70,34,${.25+r()*.35})`;x.lineWidth=.3+r()*.4;x.beginPath();x.ellipse(X+1+(r()-.5)*.6,Y-26.3,rr*(1+(r()-.5)*.05),rr*.3,0,0,7);x.stroke()}
  const rot=x.createRadialGradient(X+1,Y-26.3,0,X+1,Y-26.3,6);rot.addColorStop(0,'rgba(50,30,14,.85)');rot.addColorStop(1,'rgba(50,30,14,0)');x.fillStyle=rot;x.fillRect(X-8,Y-30,18,8);
  for(let k=0;k<5;k++){const a=r()*6.28;x.strokeStyle='rgba(20,10,4,.85)';x.lineWidth=.5;x.beginPath();x.moveTo(X+1+Math.cos(a)*3,Y-26.3+Math.sin(a)*1);x.lineTo(X+1+Math.cos(a)*(14+r()*14),Y-26.3+Math.sin(a)*(4+r()*4));x.stroke()}
  for(let k=0;k<14;k++){const yy=Y-34+k*1.3;x.strokeStyle='rgba(255,236,200,.12)';x.lineWidth=.4;x.beginPath();x.moveTo(X-30,yy);x.quadraticCurveTo(X,yy-1.5,X+30,yy);x.stroke()}
  x.fillStyle=LG(x,[X-30,0],[X+30,0],[[0,'rgba(255,240,210,.15)'],[1,'rgba(0,0,0,.35)']]);x.fill(top);x.restore();
  x.strokeStyle='rgba(30,18,8,.9)';x.lineWidth=1.4;x.beginPath();x.ellipse(X,Y-26,30,9,0,0,7);x.stroke()};

window.millstone=function(x,X,Y,r0,lean){sd(X+Y);x.save();x.translate(X,Y);x.scale(lean,1);
  x.fillStyle='#2e2c28';x.beginPath();x.ellipse(2.5,-r0,r0,r0,0,0,7);x.fill();
  const g=x.createRadialGradient(-r0*.35,-r0*1.35,1,0,-r0,r0*1.15);g.addColorStop(0,'#c8c2b4');g.addColorStop(.6,'#8a867a');g.addColorStop(1,'#3e3c36');x.fillStyle=g;x.beginPath();x.arc(0,-r0,r0,0,7);x.fill();
  x.save();x.beginPath();x.arc(0,-r0,r0,0,7);x.clip();for(let i=0;i<r0*r0*1.6;i++){const a=r()*6.28,d=Math.sqrt(r())*r0;x.fillStyle=r()<.5?'rgba(30,28,26,.55)':'rgba(236,230,220,.5)';x.fillRect(Math.cos(a)*d,-r0+Math.sin(a)*d,.5,.5)}
  for(let k=0;k<10;k++){const a=k/10*6.28;for(let j=0;j<3;j++){const b=a+j*.16;x.strokeStyle='rgba(30,28,24,.55)';x.lineWidth=.9;x.beginPath();x.moveTo(Math.cos(b)*r0*.22,-r0+Math.sin(b)*r0*.22);x.lineTo(Math.cos(b+.35)*r0*.95,-r0+Math.sin(b+.35)*r0*.95);x.stroke();
    x.strokeStyle='rgba(220,214,200,.3)';x.lineWidth=.4;x.beginPath();x.moveTo(Math.cos(b)*r0*.22+.6,-r0+Math.sin(b)*r0*.22+.6);x.lineTo(Math.cos(b+.35)*r0*.95+.6,-r0+Math.sin(b+.35)*r0*.95+.6);x.stroke()}}
  for(let i=0;i<10;i++)ell(x,(r()-.5)*r0*1.6,-r0*.3-r()*r0*.6,1+r()*3,.8+r()*2,mix([40,70,24],[100,130,50],r()),.6);x.restore();
  const eye=x.createRadialGradient(-1,-r0-1,0,0,-r0,r0*.2);eye.addColorStop(0,'#141210');eye.addColorStop(1,'#3a3630');x.fillStyle=eye;x.beginPath();x.arc(0,-r0,r0*.17,0,7);x.fill();
  x.strokeStyle='#5a3a24';x.lineWidth=1.6;x.beginPath();x.arc(0,-r0,r0*.2,0,7);x.stroke();x.strokeStyle='rgba(20,18,16,.8)';x.lineWidth=1;x.beginPath();x.arc(0,-r0,r0,0,7);x.stroke();x.restore()};

window.millHouse=function(x){shadowAt(x,250,376,170,.65);const lx=-1;
  stoneWall(x,118,412,338,378,11,lx);
  const side=QP([[360,342],[360,200],[410,176],[410,330]]);boards(x,side,356,414,170,346,{lx,bw:9,grey:.4});wallFX(x,side,360,410,176,342,{lx,dark:.35,eave:26});
  const front=QP([[130,200],[360,200],[360,342],[130,342]]);boards(x,front,130,360,198,344,{lx,bw:11,grey:.45});wallFX(x,front,130,360,200,342,{lx,eave:22,streaks:[[150,180,258],[290,320,258],[196,240,268]]});
  const gab=QP([[130,202],[245,112],[360,202]]);boards(x,gab,130,360,108,204,{lx,bw:11,grey:.45});wallFX(x,gab,130,360,112,202,{lx,eave:18});
  shingleRoof(x,[245,106],[292,82],[420,176],[374,204],{rows:15,sw:8,lx,grey:.55,moss:.55,seed:77});
  [-1,1].forEach(s=>{const ax=245,ay=102,bx=245+s*130,by=212,L=Math.hypot(bx-ax,by-ay),an=Math.atan2(by-ay,bx-ax);x.save();x.translate(ax,ay);x.rotate(an);x.fillStyle='rgba(0,0,0,.4)';x.fillRect(0,4,L,6);wood(x,0,-3.5,L,7,0);x.fillStyle='rgba(150,146,136,.35)';x.fillRect(0,-3.5,L,7);x.fillStyle='rgba(255,240,215,.2)';x.fillRect(0,-3.5,L,1.2);x.fillStyle='rgba(0,0,0,.4)';x.fillRect(0,2.4,L,1.1);x.restore()});
  wood(x,232,96,26,8,0);x.fillStyle='rgba(0,0,0,.4)';x.fillRect(232,104,26,2);x.strokeStyle='#4a4236';x.lineWidth=1;x.beginPath();x.moveTo(252,104);x.lineTo(252,170);x.stroke();
  {const g=x.createRadialGradient(250.6,102.6,0,252,104,4.4);g.addColorStop(0,'#a8a8a4');g.addColorStop(1,'#2a2a2a');x.fillStyle=g;x.beginPath();x.arc(252,104,4,0,7);x.fill()}
  {const g=x.createRadialGradient(249,172,1,252,176,10);g.addColorStop(0,'#e8dcc0');g.addColorStop(.7,'#b8a47c');g.addColorStop(1,'#6a5a3a');x.fillStyle=g;x.beginPath();x.ellipse(252,176,9,7,0,0,7);x.fill();x.strokeStyle='#6a5a3a';x.lineWidth=.8;x.beginPath();x.moveTo(248,169.6);x.lineTo(256,169.6);x.stroke()}
  x.fillStyle='rgba(0,0,0,.55)';x.fillRect(193,265,50,77);x.fillStyle='#0c0805';x.fillRect(196,268,44,74);for(let X=198;X<238;X+=8)wood(x,X,270,8,72,1);x.fillStyle='rgba(120,116,108,.3)';x.fillRect(198,270,40,72);
  x.fillStyle=LG(x,[198,0],[238,0],[[0,'rgba(255,236,200,.08)'],[1,'rgba(0,0,0,.45)']]);x.fillRect(198,270,40,72);x.fillStyle='rgba(0,0,0,.6)';x.fillRect(198,270,40,5);
  [289,319].forEach(Y=>{x.fillStyle='#1e1c1a';x.fillRect(198,Y,36,2.6);x.fillStyle='rgba(200,190,170,.25)';x.fillRect(198,Y,36,.6);x.fillStyle='rgba(120,50,20,.4)';x.fillRect(200,Y+2.6,32,3)});
  wood(x,190,340,56,5,0);
  [[150,230],[290,230],[290,290]].forEach(([X,Y],i)=>{winR(x,X,Y,30,28,{lx,trim:'#5a4a38',kok:false});if(i==1){x.fillStyle='#050505';x.beginPath();x.moveTo(X+3,Y+2);x.lineTo(X+10,Y+8);x.lineTo(X+14,Y+2);x.fill();x.strokeStyle='rgba(230,230,230,.6)';x.lineWidth=.6;x.beginPath();x.moveTo(X+2,Y+2);x.lineTo(X+11,Y+9);x.lineTo(X+5,Y+12.5);x.moveTo(X+11,Y+9);x.lineTo(X+14,Y+4);x.stroke()}});
  x.fillStyle='rgba(0,0,0,.4)';x.fillRect(192,164,110,16);wood(x,190,160,110,16,0);x.fillStyle='rgba(150,146,136,.3)';x.fillRect(190,160,110,16);x.fillStyle=LG(x,[0,160],[0,176],[[0,'rgba(255,240,215,.2)'],[1,'rgba(0,0,0,.4)']]);x.fillRect(190,160,110,16);
  x.font='bold 12px Georgia';x.textAlign='center';x.fillStyle='rgba(0,0,0,.55)';x.fillText('M Ü H L E',245.6,172.8);x.fillStyle='rgba(232,222,192,.75)';x.fillText('M Ü H L E',245,172);
  [[192,162],[298,162],[192,174],[298,174]].forEach(([a,b])=>{x.fillStyle='#2a2a2a';x.beginPath();x.arc(a,b,.9,0,7);x.fill()});
  web(x,130,202,26,0)};
})();
