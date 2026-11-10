// ================= Nymphen-Pool (gemalte Figuren, wechseln beim Verlassen des Sumpfs) =================
const NYMPHS=[
 {id:'nastja',n:'Nastja',col:'#c8d0e0',age:.24,build:.05,beauty:1,skin:[238,228,218],shade:[120,104,118],hair:[196,172,124],eye:[84,128,160],pose:1,lips:[184,124,140],l:[
  [['nastja','Na, Stadtjunge? Glotzen kostet nix. Anfassen kostet dich die Lunge.'],['P','Ich... glotz nicht. Ich... orientier mich.'],['nastja','Klar. Und ich bin hier nur zum Baden.']],
  [['nastja','Weißt du, was das Schlimmste am Ertrinken ist? Die Frisur. Hundert Jahre nasse Haare und kein einziger Kerl, der ein Handtuch bringt.']],
  [['nastja','Die Frösche hier sind die einzigen Männer, die mir hinterherhüpfen. Und selbst die haben mehr Mumm als du.']]]},
 {id:'marfa',n:'Marfa',col:'#d8a8c8',age:.3,build:.3,beauty:1,skin:[234,214,196],shade:[124,96,104],hair:[26,20,28],eye:[96,72,46],pose:1,kohl:1,strangle:1,earring:1,lips:[176,58,72],l:[
  [['marfa','Komm näher, Petja. Der Letzte, der so geschaut hat, liegt jetzt unter mir. Er hat sich nicht beschwert. Er hat sich gar nicht mehr bewegt.']],
  [['marfa','Ich war die teuerste Frau im ganzen Gouvernement. Jetzt bin ich gratis und keiner traut sich. Typisch Männer.'],['P','Vielleicht liegt’s am Schlamm.'],['marfa','Schlamm ist ein Peeling, du Bauer.']],
  [['marfa','Seine Frau hat mich ertränkt. Mit beiden Händen. Ich hab gelächelt, bis zum Schluss.'],['P','Warum erzählst du mir das?'],['marfa','Damit du weißt, was ich mit Händen anstellen kann.']]]},
 {id:'ustinja',n:'Matrone Ustinja',col:'#e0c890',age:.78,build:.12,skin:[208,190,166],hair:[176,172,162],eye:[96,84,70],pose:0,gaunt:1,updo:1,pearls:1,rouge:1,gold:1,stole:1,marble:.4,l:[
  [['ustinja','Im Bordell hätte ich dich nicht mal die Treppe putzen lassen, Bürschchen. Aber hier unten nimmt man, was der Sumpf anspült.']],
  [['ustinja','Meine eigenen Mädchen haben mich hier versenkt. Undankbares Pack.'],['ustinja','Das Haus am Fluss gehört immer noch mir. Den Schlüssel kriegst du, wenn du mir einen Gefallen tust.'],['P','Was für ein Haus?'],['ustinja','Das wirst du noch sehen, Süßer.']]]},
 {id:'fekla',n:'Fekla',col:'#c0d098',age:.45,build:1,skin:[178,184,152],hair:[92,66,40],eye:[96,84,62],pose:0,bloat:1,milky:1,blisters:1,marble:1,shade:[44,78,58],l:[
  [['fekla','Riechst du das? Das bin ich. Und in zwei Wochen bist das du, wenn du weiter so dumm am Ufer rumstehst.']],
  [['fekla','Früher war ich die Dickste im Dorf. Jetzt bin ich die Dickste im Sumpf. Karriere, was?']],
  [['fekla','Willst du mal anfassen? Ist wie Wackelpudding. Mit Würmern drin.'],['P','Ich... verzichte.'],['fekla','Feigling. Die Aale haben weniger Hemmungen.']]]},
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
game.addEventListener('mousemove',e=>{if(typeof hoverLabel=='function')hoverLabel(e)});game.addEventListener('mouseleave',()=>label.style.opacity=0);

setTimeout(()=>{enter('wald',[400,476]);setTimeout(()=>{const b=$('#bNew');if(b){b.disabled=false;b.textContent='Neues Spiel'}testerBoot()},500)},30);
$('#bNew').onclick=e=>{e.stopPropagation();rm('start');cutscene()};$('#bLoad').onclick=e=>{e.stopPropagation();openMenu('l')};$('#bKeys').onclick=e=>{e.stopPropagation();openMenu('k')};
(function title(){const tc=$('#tcv'),x=tc.getContext('2d'),FF=Array.from({length:30},()=>[Math.random()*800,250+Math.random()*230,Math.random()*6.28]),EY=[[150,380],[640,360],[90,300],[720,420]];
  const bg=document.createElement('canvas');bg.width=800;bg.height=500;{const b=bg.getContext('2d');let g=b.createLinearGradient(0,0,0,500);g.addColorStop(0,'#05070f');g.addColorStop(.55,'#141c2a');g.addColorStop(1,'#060806');b.fillStyle=g;b.fillRect(0,0,800,500);
    g=b.createRadialGradient(560,120,10,560,120,160);g.addColorStop(0,'rgba(240,236,210,1)');g.addColorStop(.12,'rgba(230,226,200,.9)');g.addColorStop(.14,'rgba(160,170,190,.25)');g.addColorStop(1,'rgba(0,0,0,0)');b.fillStyle=g;b.fillRect(0,0,800,500);
    for(let i=0;i<120;i++){b.fillStyle='rgba(255,255,255,'+Math.random()*.6+')';b.fillRect(Math.random()*800,Math.random()*260,1,1)}
    for(let i=0;i<34;i++){const X=Math.random()*820-10,w=4+Math.random()*16*(i/34+.3),t=(i%3)*20;b.fillStyle=i<20?'#1a1e24':'#0c0e10';b.fillRect(X,t+Math.random()*40,w,500);b.fillStyle='rgba(220,220,210,'+(i<20?.25:.5)+')';b.fillRect(X+w*.3,t+60,w*.4,440);
      for(let k=0;k<12;k++){b.fillStyle='rgba(0,0,0,.8)';b.fillRect(X,80+Math.random()*400,w,2+Math.random()*3)}}
    g=b.createLinearGradient(0,360,0,500);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.9)');b.fillStyle=g;b.fillRect(0,360,800,140)}
  (function L(t){if(!$('#start'))return;x.drawImage(bg,0,0);const T=t/1000;
    for(let i=0;i<6;i++){const fx=((T*12+i*160)%1000)-100,g=x.createRadialGradient(fx,380+i*14,10,fx,380+i*14,140);g.addColorStop(0,'rgba(170,190,200,.13)');g.addColorStop(1,'rgba(170,190,200,0)');x.fillStyle=g;x.fillRect(fx-140,240+i*14,280,280)}
    FF.forEach(f=>{const a=.4+.6*Math.abs(Math.sin(T*1.5+f[2]));x.fillStyle='rgba(220,255,140,'+a+')';x.beginPath();x.arc(f[0]+Math.sin(T+f[2])*12,f[1]+Math.cos(T*.8+f[2])*8,1.6,0,7);x.fill()});
    EY.forEach((e,i)=>{if(Math.sin(T*.7+i*2)>.6)return;x.fillStyle='rgba(255,200,40,.85)';x.fillRect(e[0],e[1],3,2);x.fillRect(e[0]+8,e[1],3,2)});
    requestAnimationFrame(L)})(0)})();
