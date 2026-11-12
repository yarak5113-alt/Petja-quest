// ================= Nymphen als Cel-Sprites (wie alle anderen Figuren) =================
// Die Nymphen werden 1:1 nach dem alten Maler (paintNym) als Vektorfigur gebaut – gleiche Körper-, Kopf- und Haarformen,
// gleiche Merkmale (Pose, Haarfarbe, Augen, Wunden, Algen …) – und dann durch dieselbe Pipeline wie Petja & Co. geschickt
// (sprite() -> pixSprite: Federkontur, Airbrush-Schatten, feste Farbpalette). Danach: Wasserlinie abschneiden und den Teil
// kurz über dem Wasser ins Trübe abdunkeln. Genau dieses Ergebnis liegt auch als Array in pixel/nymphe_<id>.json.
// Bildausschnitt wie bisher: x -40..40, y -100..10 (Wasserlinie bei y = 0).
const NYM_BOX=[-40,-100,80,110];
function nymRng(id){let h=2166136261;for(const c of id)h=Math.imul(h^c.charCodeAt(0),16777619);return()=>{h+=0x6D2B79F5;let t=h;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
function nymSVG(p){
  const r=nymRng(p.id),q3=()=>Math.round(r()*2)/2,A=p.age,F=p.build,BE=!!p.beauty;
  // Farben: wie im alten Maler; zu dunkle Töne etwas anheben, sonst hält die Pipeline sie für Tusche
  const away=c=>{c=c.slice();for(let i=0;i<12&&Math.hypot(c[0]-30,c[1]-16,c[2]-8)<46;i++)c=c.map(v=>v+7);return c};
  const hx=c=>'#'+away(c).map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('');
  const sk=p.skin,sh=mix(sk,p.shade||[70,84,100],.5),dk=mix(sk,[24,22,30],.72),hi=mix(sk,[255,252,244],.35),hc=p.hair,hd=mix(hc,[8,8,8],.55),
    hl=(hc[0]+hc[1]+hc[2]<200)?mix(hc,[96,104,128],.5):mix(hc,[255,250,230],.35);
  const nk=BE?3.1:3.8,sw=14+F*6,ww=(BE?7.4:9)+F*9,hw=11+F*9,sag=A*3+(p.gaunt?1:0),aw=4.5+F*3,fx=(7.6+F*1.6-(p.gaunt?.6:0))/7.6,he=p.updo?-60:-28;
  const f=(d,c,x)=>`<path d="${d}" fill="${hx(c)}"${x||''}/>`,ln=(d,c,w)=>`<path d="${d}" fill="none" stroke="${hx(c)}" stroke-width="${w}"/>`,
    el=(x,y,rx,ry,c,rot,x2)=>`<ellipse cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" rx="${rx}" ry="${ry}" fill="${hx(c)}"${rot?` transform="rotate(${(rot*57.3).toFixed(1)} ${x.toFixed(2)} ${y.toFixed(2)})"`:''}${x2||''}/>`;
  const NS=' stroke="none"';let s='';
  // ---------- Haare hinten
  const HB=p.updo?'':f(`M${-8*fx},-94C${-12*fx},-90 ${-sw-2},-70 ${-sw-3},${he}C${-sw+4},${he+2} ${sw-4},${he+2} ${sw+3},${he}C${sw+2},-70 ${12*fx},-90 ${8*fx},-94Z`,hd);
  // ---------- Körper
  const torso=`M${-hw},6C${-hw-1},-12 ${-ww-1},-28 ${-ww},-40C${-ww+1},-50 ${-sw+3},-56 ${-sw},${-60+sag}C${-sw+2},${-64+sag} -9,-65 -4.4,-67L${-nk},-74L${nk},-74L4.4,-67C9,-65 ${sw-2},${-64+sag} ${sw},${-60+sag}C${sw-3},-56 ${ww-1},-50 ${ww},-40C${ww+1},-28 ${hw+1},-12 ${hw},6Z`;
  const down=k=>`M${k*(sw-1)},${-61+sag}C${k*(sw+5)},-58 ${k*(sw+6+F*2)},-44 ${k*(sw+6+F*2)},-30C${k*(sw+6+F*2)},-18 ${k*(sw+5+F*2)},-6 ${k*(sw+4+F*2)},6L${k*(sw+4+F*2-aw)},6C${k*(sw-aw+4)},-8 ${k*(sw-aw+5)},-20 ${k*(sw-aw+5)},-30C${k*(sw-aw+5)},-42 ${k*(sw-3)},-50 ${k*(sw-4)},-54Z`;
  const stump=k=>`M${k*(sw-1)},${-61+sag}C${k*(sw+4)},-58 ${k*(sw+6)},-50 ${k*(sw+6)},-44L${k*sw},-44C${k*sw},-50 ${k*(sw-2)},-54 ${k*(sw-4)},-55Z`;
  const up=[`M${sw-1},${-62+sag}C${sw+5},-64 ${sw+9},-70 ${sw+10},-77L${sw+5},-79C${sw+4},-73 ${sw+1},-68 ${sw-4},-64Z`,`M${sw+10},-77C${sw+8},-84 ${sw+2},-90 11,-93L9.5,-89C${sw},-86 ${sw+4},-81 ${sw+5},-79Z`];
  const hip=[`M${sw-1},${-61+sag}C${sw+5},-58 ${sw+8},-52 ${sw+8},-44L${sw+3},-43C${sw+3},-50 ${sw},-54 ${sw-4},-56Z`,`M${sw+8},-44C${sw+6},-38 ${ww+5},-34 ${ww+1.5},-33L${ww+.5},-37C${ww+4},-38 ${sw+2},-41 ${sw+3},-43Z`];
  let B='';
  if(!BE)B+=f(p.skel?stump(-1):down(-1),mix(sk,sh,.25));
  if(p.pose){up.forEach(d=>B+=f(d,sk));B+=el(10.4,-92,3.4,2.6,sk,-.5)}else{hip.forEach(d=>B+=f(d,mix(sk,sh,.2)));B+=el(ww+1.6,-35,3,2.4,mix(sk,sh,.2),.6)}
  B+=f(torso,sk);
  // Schatten-/Lichtflächen wie im alten Maler (Hals unter dem Kinn, Achseln, Seite rechts)
  B+=f(`M${-nk},-74L${nk},-74L${nk-.3},-68C1.5,-66.5 -1.5,-66.5 ${-nk+.3},-68Z`,mix(sk,dk,.35),NS);
  B+=f(`M${sw-4},${-58+sag}C${sw-2},-50 ${ww},-44 ${ww},-40C${ww+1},-28 ${hw+1},-12 ${hw},6L${hw-4},6C${hw-3},-14 ${ww-3},-30 ${ww-3},-40C${ww-3},-46 ${sw-5},-52 ${sw-6},${-57+sag}Z`,mix(sk,sh,.45),NS);
  B+=ln(`M-3,-66C-7,-65.5 ${-sw+5},-64 ${-sw+2},${-62+sag}M3,-66C7,-65.5 ${sw-5},-64 ${sw-2},${-62+sag}`,mix(sk,dk,.5),.8);
  B+=ln('M0,-64C0,-56 0,-48 0,-40',mix(sk,sh,.4),.6);
  if(p.gaunt||p.skel)for(let i=0;i<6;i++){const y=-56+i*4.2;B+=ln(`M${-ww-1},${y}C${-ww+3},${y-2} -5,${y+1} -3,${y+2.5}M${ww+1},${y}C${ww-3},${y-2} 5,${y+1} 3,${y+2.5}`,mix(sk,dk,p.skel?.7:.45),.7)}
  B+=el(0,-22+F*2,.7,1,mix(sk,dk,.55),0,NS);
  if(p.bloat){B+=el(-4,-26,10,8,mix(sk,hi,.35),0,NS);B+=el(9,-18,7,6,mix(sk,sh,.4),0,NS)}
  if(p.marble)for(let i=0;i<Math.round(16*p.marble);i++){let X=(r()-.5)*sw*2,Y=-64+r()*50,d=`M${X.toFixed(1)},${Y.toFixed(1)}`;for(let k=0;k<6;k++){X+=(r()-.5)*5;Y+=(r()-.3)*4;d+=`L${X.toFixed(1)},${Y.toFixed(1)}`}B+=ln(d,mix(sk,[70,58,96],.6),.5)}
  if(p.blisters)for(let i=0;i<9;i++){const X=(r()-.5)*sw*2.2,Y=-60+r()*44;B+=el(X,Y,1.5,1.1,[200,196,150],0,NS);B+=el(X-.4,Y-.4,.5,.4,[255,255,232],0,NS)}
  if(p.strangle)B+=ln('M-4,-71C-1,-70 1,-70 4,-71',mix(sk,[90,58,100],.7),2.2);
  if(p.wounds)[[-ww+3,-34,.4],[ww-3,-46,-.3],[-sw-3,-28,1.4]].forEach(([X,Y,a])=>{B+=el(X,Y,3.4,1.4,[128,72,60],a);B+=el(X,Y,2.6,.6,[58,24,20],a,NS);for(let k=0;k<4;k++)B+=el(X+(r()-.5)*5,Y+(r()-.5)*2.4,.6,.5,[70,100,40],0,NS)});
  if(p.pose)for(let k=0;k<4;k++)B+=ln(`M${8.4+k*1.2},-93.6l.4,2.6`,mix(sk,sh,.6),.4);
  if(p.skel)B+=ln(`M${-sw-3},-44L${-sw-3.4},-39`,[216,207,180],1.4);
  // ---------- Kopf
  const face=BE?`M0,-70.6C${3.4*fx},-70.6 ${6.2*fx},-73.6 ${7.1*fx},-77.6C${7.9*fx},-82 ${8.1*fx},-88 ${7.3*fx},-92C${6*fx},-97 ${2.5*fx},-98.5 0,-98.5C${-2.5*fx},-98.5 ${-6*fx},-97 ${-7.3*fx},-92C${-8.1*fx},-88 ${-7.9*fx},-82 ${-7.1*fx},-77.6C${-6.2*fx},-73.6 ${-3.4*fx},-70.6 0,-70.6Z`
    :`M0,-70C${4*fx},-70 ${7*fx},-73 ${7.6*fx},-77C${8.4*fx},-82 ${8.4*fx},-88 ${7.4*fx},-92C${6*fx},-97 ${2.5*fx},-98.5 0,-98.5C${-2.5*fx},-98.5 ${-6*fx},-97 ${-7.4*fx},-92C${-8.4*fx},-88 ${-8.4*fx},-82 ${-7.6*fx},-77C${-7*fx},-73 -4,-70 0,-70Z`;
  let H='';[-1,1].forEach(k=>H+=el(k*7.9*fx,-84.5,1.3,2.4,k<0?sk:mix(sk,sh,.5)));
  H+=f(face,sk);
  H+=f(`M${5*fx},-96C${7.4*fx},-92 ${8*fx},-84 ${7.2*fx},-78C${6.4*fx},-74 ${3.6*fx},-71 0,-70.6C${3*fx},-73 ${5.6*fx},-77 ${6*fx},-82C${6.4*fx},-87 ${6.2*fx},-92 ${5*fx},-96Z`,mix(sk,sh,.45),NS);
  const hol=(BE?.08:.32)+A*.2+(p.skel?.25:0);[-3.2,3.2].forEach(ex=>H+=el(ex,-85.2,3.2,2.6,mix(sk,dk,hol*.9),0,NS));
  if(p.gaunt||p.skel){H+=el(-4.8*fx,-77.4,2.2,2.6,mix(sk,dk,.38),0,NS);H+=el(4.8*fx,-77.4,2.2,2.6,mix(sk,dk,.5),0,NS)}
  if(p.scar)H+=f(`M-7,-90C-4,-91 -2,-88 -2.4,-84C-2.8,-80 -1.6,-76 -3,-73.4C-5,-74 -6.6,-77 -7.2,-80C-7.6,-84 -7.8,-87 -7,-90Z`,mix(sk,[196,134,122],.6),NS)+ln('M-5,-89C-4.6,-85 -4.4,-80 -4.6,-75',[150,104,96],.5);
  if(!p.skel&&!BE){H+=ln('M.6,-88C1,-85 1.4,-82 1.7,-80',mix(sk,sh,.6),.8);H+=el(-1.1,-79.2,.7,.45,mix(sk,dk,.7));H+=el(1.3,-79.2,.7,.45,mix(sk,dk,.8));H+=ln('M-1.6,-79.6C-.8,-78.8 .8,-78.8 1.8,-79.6',mix(sk,sh,.4),.5)}
  if(p.broken)H+=ln('M.2,-87C1.8,-85 -.6,-83 1.3,-80.5',mix(sk,dk,.7),.8);
  const lc=p.lips||mix(sk,[160,70,76],.5);
  if(p.skel){H+=el(0,-75,4,2.1,[52,32,24]);for(let i=-2;i<=2;i++)H+=el(i*1.45,-75.2,.6,1.2,[220,210,186],0,NS);H+=el(4.8,-77.4,2.5,1.9,[56,36,26]);for(let i=0;i<3;i++)H+=el(4+i*.8,-76.6,.35,.6,[214,204,180],0,NS);
    H+=el(-.2,-80,1.4,1.1,[58,40,30]);H+=el(-3.2,-85,1.3,1.1,[150,118,78])}
  else if(BE){
    H+=ln('M.5,-88C.7,-85 1,-82.4 1.3,-80.6',mix(sk,sh,.45),.6);H+=el(-.9,-79.5,.45,.3,mix(sk,dk,.5),0,NS);H+=el(1.1,-79.5,.45,.3,mix(sk,dk,.55),0,NS);
    H+=f('M-3.2,-75.7C-2.2,-76.4 -1,-77 -.1,-76.4C.8,-77 2,-76.4 3.2,-75.7C1.6,-75.3 -1.6,-75.3 -3.2,-75.7Z',mix(lc,[0,0,0],.14));
    H+=f('M-3,-75.6C-2,-73.5 2,-73.5 3,-75.6C1.6,-75.2 -1.6,-75.2 -3,-75.6Z',mix(lc,[255,226,226],.14));H+=el(-.5,-74.5,1.1,.35,mix(lc,[255,242,242],.5),0,NS);
    [-3.3,3.3].forEach(ex=>{const ey=-85.2;
      if(p.kohl)H+=el(ex+.1,ey,3.2,2,mix(sk,[20,16,22],.45),0,NS);
      H+=f(`M${ex-2.6},${ey}C${ex-1.4},${ey-1.55} ${ex+1.2},${ey-1.65} ${ex+2.7},${ey-.2}C${ex+1.4},${ey+1.2} ${ex-1.3},${ey+1.2} ${ex-2.6},${ey}Z`,[234,232,226]);
      H+=`<circle cx="${ex+.15}" cy="${ey-.05}" r="1.22" fill="${hx(p.eye)}" stroke="none"/>`+el(ex+.15,ey-.05,.5,.5,[60,40,40],0,NS)+el(ex-.28,ey-.48,.3,.26,[255,255,255],0,NS);
      H+=ln(`M${ex-2.7},${ey+.05}C${ex-1.4},${ey-1.8} ${ex+1.3},${ey-1.85} ${ex+2.9},${ey-.35}`,[60,36,32],.6);
      });
    const bc=mix(hd,sk,.35);H+=ln('M-5.9,-88.9C-4.8,-90.4 -2.8,-90.6 -1.2,-89.8M1.2,-89.8C2.8,-90.6 4.8,-90.4 5.9,-88.9',bc,1.1);
    H+=el(-4.4,-80.4,2.2,1.5,mix(sk,[238,150,150],.3),0,NS)+el(4.4,-80.4,2.2,1.5,mix(sk,[238,150,150],.22),0,NS)}
  else{H+=f('M-3,-75.6C-1.6,-76.6 -.4,-76.3 0,-75.9C.4,-76.3 1.6,-76.6 3,-75.6C1.6,-75.2 -1.6,-75.2 -3,-75.6Z',mix(lc,[0,0,0],.15));H+=f('M-2.6,-75.4C-1.4,-73.8 1.4,-73.8 2.6,-75.4Z',lc);
    if(p.gold)H+=el(.9,-75.3,.5,.36,[226,186,64],0,NS);
    [-3.2,3.2].forEach((ex,i)=>{const ey=-85,mk=p.milky&&i==1;if(p.kohl)H+=el(ex,ey,3,1.9,mix(sk,[20,16,22],.4),0,NS);
      H+=el(ex,ey,2.2,1.05,[206,204,192]);H+=el(ex+.2,ey+.05,1,1,mk?[222,224,216]:mix(p.eye,[170,176,170],.45),0,NS);if(!mk)H+=el(ex+.2,ey+.05,.42,.42,[56,40,36],0,NS);
      H+=ln(`M${ex-2.4},${ey+.1}C${ex-1},${ey-1.5} ${ex+1},${ey-1.5} ${ex+2.4},${ey-.1}`,[64,40,34],.55);
      H+=ln(`M${ex-1.9},${ey+.9}C${ex-.6},${ey+1.4} ${ex+.7},${ey+1.4} ${ex+2},${ey+.8}`,mix(sk,sh,.5),.35)});
    H+=ln('M-5.6,-88.4C-4,-89.4 -2.2,-89.3 -1,-88.6M1,-88.6C2.2,-89.3 4,-89.4 5.6,-88.4',hd,1.1);
    if(p.rouge){H+=el(-4.6,-80,2,1.4,mix(sk,[200,80,80],.32),0,NS);H+=el(4.4,-80,2,1.4,mix(sk,[200,80,80],.25),0,NS)}}
  if(A>.5)H+=ln('M-4,-93C-1,-93.8 1,-93.8 4,-93M-3.5,-91.4C-1,-92 1,-92 3.5,-91.4M-2.4,-78.4C-3.6,-76.8 -3.8,-75 -3.4,-73.6M2.6,-78.4C3.8,-76.8 4,-75 3.6,-73.6M-5.8,-85l-1.4,-.8M-5.8,-84.4l-1.5,.3M5.8,-85l1.4,-.8M5.8,-84.4l1.5,.3',mix(sk,sh,.6),.4);
  if(p.earring)H+=el(-8.1*fx,-81.6,.75,.75,[216,174,70]);
  // ---------- Haare vorne
  const cap=`M${-8.2*fx},-84C${-9*fx},-95 ${-5*fx},-101.5 0,-101.5C${5*fx},-101.5 ${9*fx},-95 ${8.2*fx},-84C${7*fx},-90 ${4*fx},-93.5 0,-93C${-2.5*fx},-93.4 ${-5.5*fx},-91.5 ${-8.2*fx},-84Z`;
  const clump=k=>`M${k*7.6*fx},-90C${k*9*fx},-80 ${k*8},-70 ${k*10},-62C${k*12},-54 ${k*11.5},-44 ${k*9.5},-33C${k*6},-38 ${k*3},-46 ${k*2},-54C${k*1.8},-60 ${k*5},-66 ${k*6.6*fx},-74C${k*7.4*fx},-80 ${k*7.2*fx},-86 ${k*7.6*fx},-90Z`;
  let HF='';
  if(p.stole){[-1,1].forEach(k=>{HF+=f(clump(k),[92,76,58]);for(let i=0;i<14;i++){const t=r(),X=k*(3+t*8+r()*2),Y=-70+r()*36;HF+=ln(`M${X.toFixed(1)},${Y.toFixed(1)}l${k*.6},1.6`,mix([60,50,40],[110,96,78],q3()),.4)}});
    HF+=f(cap,hc)+el(0,-101,5,3.6,hc);for(let i=0;i<6;i++)HF+=ln(`M${((r()-.5)*12).toFixed(1)},-96C${((r()-.5)*16).toFixed(1)},-88 ${((r()-.5)*14).toFixed(1)},-94 ${((r()-.5)*10).toFixed(1)},-99`,hl,.35);
    if(p.pearls)for(let i=0;i<13;i++){const t=i/12,X=-7+t*14,Y=-67+Math.sin(t*3.14)*5;HF+=el(X,Y,.95,.95,[226,222,210],0,NS)}}
  else{[-1,1].forEach(k=>HF+=f(clump(k),k<0?hc:mix(hc,hd,.4)));HF+=f(cap,hc);
    for(let i=0;i<34;i++){const k=r()<.5?-1:1,t=r(),a0=-1.5+k*(.2+t*1.2),sx=k*Math.max(Math.abs(Math.cos(a0)*8*fx),7.6*fx),sy=-91+Math.sin(a0)*7+7,ex=k*(2.5+r()*9),ey=-58+r()*26,cx1=k*(8+r()*4),cy1=-76+r()*8;
      HF+=ln(`M${sx.toFixed(1)},${sy.toFixed(1)}C${cx1.toFixed(1)},${cy1.toFixed(1)} ${(k*(9+r()*3)).toFixed(1)},${(ey-14).toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)}`,r()<.6?hd:hl,(.3+r()*.3).toFixed(2))}
    for(let i=0;i<10;i++){const k=r()<.5?-1:1;HF+=ln(`M${(k*(sw-2+r()*4)).toFixed(1)},${(-66+r()*4).toFixed(1)}C${k*(sw+1)},-56 ${k*(sw+2)},-44 ${(k*(sw+1+r()*2)).toFixed(1)},${(he+r()*8).toFixed(1)}`,mix(hd,hc,q3()),.4)}
    if(p.algaeHair)for(let i=0;i<10;i++){const k=r()<.5?-1:1,X=k*(4+r()*8);HF+=ln(`M${X.toFixed(1)},-88C${(X+k*2).toFixed(1)},-74 ${(X-k).toFixed(1)},-60 ${(X+k*1.5).toFixed(1)},${(-44+r()*10).toFixed(1)}`,mix([40,70,26],[90,116,44],q3()),1.5)}}
  if(BE){for(let i=0;i<18;i++){const k=r()<.5?-1:1,t=r();HF+=ln(`M${k*.4},-101.2C${(k*(3+t*3)*fx).toFixed(1)},-100.9 ${(k*(7+t*1.5)*fx).toFixed(1)},-98 ${(k*(8.4+t*1.2)*fx).toFixed(1)},${(-90+r()*6).toFixed(1)}`,r()<.5?hd:hl,.3)}
    HF+=ln('M0,-101.4C0,-99 0,-97 0,-95.5',hd,.4)}
  // ---------- Arm vor der Brust (die Schönen)
  let AR='';if(BE){AR+=f(`M${-sw+1},${-61+sag}C${-sw-3},-56 ${-sw-2.5},-48 ${-sw+.5},-42L${-sw+5},-44C${-sw+3},-49 ${-sw+3},-54 ${-sw+4},-56Z`,sk)+f(`M${-sw+1},-40C-6,-42 2,-48 ${sw-7},-56L${sw-8},-60C2,-52 -6,-46 ${-sw+3},-45Z`,sk)+el(sw-6,-59,3.2,2.2,sk,-.6);
    AR+=ln(`M${-sw+3},-38C-6,-40 2,-46 ${sw-6},-53`,mix(sk,dk,.4),.8);for(let k=0;k<3;k++)AR+=ln(`M${sw-7.5+k*1.1},-60.6l1.2,1.8`,mix(sk,sh,.6),.3)}
  // ---------- Schlamm/Algen am Körper (nicht bei den Schönen)
  let W='';if(!BE)for(let i=0;i<5;i++){const X=(r()-.5)*sw*2,Y=-64+r()*36;W+=ln(`M${X.toFixed(1)},${(Y-12).toFixed(1)}C${(X+4).toFixed(1)},${(Y-5).toFixed(1)} ${(X-4).toFixed(1)},${(Y+4).toFixed(1)} ${(X+2).toFixed(1)},${(Y+14).toFixed(1)}`,mix([38,66,26],[84,110,40],q3()),1)}
  if(p.foam)for(let i=0;i<6;i++)W+=el(2.6+r()*1.5,-75.6+r()*1.2,.45,.4,[242,246,242],0,NS);
  s=HB+`<g stroke="#2a1a0e" stroke-width="1" stroke-linejoin="round" stroke-linecap="round">`+B+H+'</g>'+`<g stroke-linecap="round">`+HF+'</g>'+`<g stroke="#2a1a0e" stroke-width="1" stroke-linejoin="round" stroke-linecap="round">`+AR+'</g>'+`<g stroke-linecap="round">`+W+'</g>';
  return s}
// Wasserlinie abschneiden (alles ab y = 0) und den Teil kurz darüber ins trübe Sumpfwasser übergehen lassen – direkt in den Pixeln,
// damit Spiel und Array exakt gleich sind
function nymFinish(url,p){return new Promise(res=>{const im=new Image();im.onload=()=>{const W=im.width,H=im.height,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');g.drawImage(im,0,0);
  const id=g.getImageData(0,0,W,H),d=id.data,row=y=>Math.round((y-NYM_BOX[1])/NYM_BOX[3]*H),y0=row(0),yA=row(p.beauty?-14:-34),murk=[30,30,20];
  for(let Y=0;Y<H;Y++)for(let X=0;X<W;X++){const q=(Y*W+X)*4;if(!d[q+3])continue;if(Y>=y0-1){d[q+3]=0;continue}
    if(Y>yA){const t=Math.min(1,(Y-yA)/(y0-1-yA)),a=Math.round((t<.7?t/.7*.65:.65+(t-.7)/.3*.27)*6)/6;for(let j=0;j<3;j++)d[q+j]=Math.round(d[q+j]+(murk[j]-d[q+j])*a)}}
  // Wasserring: heller Saum direkt über der Linie
  for(let X=0;X<W;X++){const q=((y0-2)*W+X)*4;if(d[q+3]){d[q]=Math.min(255,d[q]+70);d[q+1]=Math.min(255,d[q+1]+78);d[q+2]=Math.min(255,d[q+2]+66)}}
  g.putImageData(id,0,0);res(c.toDataURL())};im.src=url})}
// Alle Nymphen rendern; eigene Bilder (assets/nymphe-<id>.png) haben weiter Vorrang
NYMPHS.forEach((n,i)=>sprite(nymSVG(n),NYM_BOX,1).then(u=>nymFinish(u,n)).then(u=>{if(n.own)return;NIMG[i]=u;if(cur==='sumpf')applySwampNymphs()}));
// Export als Array wie die anderen Figuren (pixel/nymphe_<id>.json): nymExport('nastja') -> JSON-Text
function nymExport(id){const i=NYMPHS.findIndex(n=>n.id==id);return new Promise(res=>{const im=new Image();im.onload=()=>{const W=im.width,H=im.height,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');g.drawImage(im,0,0);
  const d=g.getImageData(0,0,W,H).data,hx2=(a,b,cc)=>'#'+[a,b,cc].map(v=>v.toString(16).padStart(2,'0')).join(''),ink=hx2(...PIX_INK);
  // erst alle Farben sammeln (häufigste zuerst), dann Codes vergeben: 2 Zeichen wie bei den anderen Figuren, 3 Zeichen falls es mehr Töne sind
  const cnt=new Map();for(let q=0;q<d.length;q+=4)if(d[q+3]>=128){const h=hx2(d[q],d[q+1],d[q+2]);cnt.set(h,(cnt.get(h)||0)+1)}
  const cols=[...cnt.keys()].filter(h=>h!==ink).sort((a,b)=>cnt.get(b)-cnt.get(a)),A1='ABCDEFGHIJLMNOPQRSTUVWXYZ',A2='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    cl=cols.length<=A1.length*A2.length?2:3,pal={[cl==2?'..':'...']:null,[cl==2?'KK':'KKK']:ink},codeOf={[ink]:cl==2?'KK':'KKK'};
  cols.forEach((h,n)=>{const k=cl==2?A1[n/A2.length|0]+A2[n%A2.length]:A1[n/(A2.length*A2.length)|0]+A2[(n/A2.length|0)%A2.length]+A2[n%A2.length];codeOf[h]=k;pal[k]=h});
  const grid=[];for(let Y=0;Y<H;Y++){let s='';for(let X=0;X<W;X++){const q=(Y*W+X)*4;s+=d[q+3]<128?(cl==2?'..':'...'):codeOf[hx2(d[q],d[q+1],d[q+2])]}grid.push(s)}
  res(JSON.stringify({name:'nymphe_'+id,width:W,height:H,code_len:cl,palette:pal,grid},null,2))};im.src=NIMG[i]})}
