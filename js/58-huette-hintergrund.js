// ================= Baba Jagas Hütte (außen): realistischer Hintergrund =================
// Statt flacher Kegel und Strich-Bäume: Luftperspektive in drei Ebenen, Licht von der tiefen Abendsonne (S0.sun).
//  - fern:  Fichten-Silhouetten mit hängenden Zweigen und Nadelbüscheln, im Dunst (hell, violett, weich gezeichnet)
//  - Mitte: abgestorbene Bäume mit sich verjüngenden, gebogenen Ästen, abgebrochenen Stümpfen, Rindenfurchen und Flechten,
//           Gegenlicht-Kante auf der Sonnenseite; Bodennebel um den Stammfuß
//  - vorn:  die beiden großen toten Bäume am Bildrand in derselben Technik, dunkler und schärfer
// Aufruf aus paintHuette (05-schauplaetze-figuren.js).

// Ast/Stamm als sich verjüngendes, leicht gebogenes Stück mit Lichtkante auf der Sonnenseite
function hhAst(x,x0,y0,x1,y1,w0,w1,bend,col,rim,ra,lx){const dx=x1-x0,dy=y1-y0,L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L,mx=(x0+x1)/2+nx*bend,my=(y0+y1)/2+ny*bend,wm=(w0+w1)/2,P=(a,b)=>a.toFixed(2)+','+b.toFixed(2);
  x.fillStyle=rgba(col);x.fill(new Path2D(`M${P(x0+nx*w0/2,y0+ny*w0/2)}Q${P(mx+nx*wm/2,my+ny*wm/2)} ${P(x1+nx*w1/2,y1+ny*w1/2)}L${P(x1-nx*w1/2,y1-ny*w1/2)}Q${P(mx-nx*wm/2,my-ny*wm/2)} ${P(x0-nx*w0/2,y0-ny*w0/2)}Z`));
  if(ra<=0)return;const s=Math.abs(nx)>.25?(Math.sign(nx)===lx?1:-1):(ny<0?1:-1),k=.3;   // Seite, die zur Sonne zeigt (bei waagrechten Ästen: oben)
  x.strokeStyle=rgba(rim,ra);x.lineWidth=Math.max(.35,wm*.2);x.lineCap='round';x.beginPath();x.moveTo(x0+s*nx*w0*k,y0+s*ny*w0*k);x.quadraticCurveTo(mx+s*nx*wm*k,my+s*ny*wm*k,x1+s*nx*w1*k,y1+s*ny*w1*k);x.stroke();
  if(wm>2.4){x.strokeStyle='rgba(0,0,0,.35)';x.lineWidth=.45;for(let j=0;j<wm/1.6;j++){const t=(R()-.5)*.8,a0=.05+R()*.3,a1=Math.min(1,a0+.25+R()*.6),q=u=>[x0+dx*u+nx*t*(w0+(w1-w0)*u),y0+dy*u+ny*t*(w0+(w1-w0)*u)];
    const A=q(a0),B=q(a1);x.beginPath();x.moveTo(A[0],A[1]);x.lineTo(B[0],B[1]);x.stroke()}}}   // Rindenfurchen

function hhToterBaum(x,X,Y,h,w,o){const col=o.col,rim=o.rim,ra=o.ra??.45,lx=o.lx??-1,dunkel=mix(col,[0,0,0],.35);
  for(let i=0;i<4;i++){const d=i-1.5;hhAst(x,X+d*w*.35,Y-w*.9,X+d*w*1.5+(R()-.5)*w,Y+1,w*.55,w*.12,(R()-.5)*w*.4,col,rim,ra*.6,lx)}   // Wurzelanläufe
  const ast=(x0,y0,a,l,wd,dp)=>{if(dp>7||wd<.28)return;const x1=x0+Math.cos(a)*l,y1=y0+Math.sin(a)*l,w1=wd*(dp?.7:.78);
    hhAst(x,x0,y0,x1,y1,wd,w1,(R()-.5)*l*.2,dp>4?mix(col,o.fern||col,.15):col,rim,ra*(dp>4?.7:1),lx);
    if(dp<3&&R()<.35)ell(x,x0+Math.cos(a)*l*.5,y0+Math.sin(a)*l*.5,wd*.32,wd*.22,dunkel,.9);   // Astloch
    if(dp>1&&R()<.13){ell(x,x1,y1,w1*.55,w1*.45,mix(col,[150,130,110],.25),.8);return}     // abgebrochen: helles Bruchholz
    const n=dp<1?3:R()<.6?2:3;for(let i=0;i<n;i++){let b=a+(R()-.5)*(dp<2?1.1:1.5);b+=(-Math.PI/2-b)*(dp<3?.12:-.04);   // oben streben die Äste nach oben, außen hängen sie leicht
      ast(x1,y1,b,l*(.56+R()*.28)*(i?1:1.05),w1*(i?.58+R()*.12:.82),dp+1)}};
  ast(X,Y-w*.5,-Math.PI/2+(R()-.5)*.18,h*.3,w,0);
  if(o.flechte)for(let i=0;i<w*6;i++)ell(x,X+lx*w*(.1+R()*.3),Y-R()*h*.28,.6+R()*1.4,.5+R()*.9,mix([96,112,84],[150,158,120],R()),.35);   // Flechten auf der Lichtseite
  for(let i=0;i<w*5;i++)ell(x,X+(R()-.5)*w*2.2,Y-R()*w*2.2,1+R()*2,.8+R()*1.2,mix([22,34,14],[60,76,30],R()),.7)}   // Moos am Stammfuß

function hhFichte(x,X,b,h,w,col,rim,ra,lx){const top=b-h;hhAst(x,X,b,X,top,Math.max(1.2,w*.06),.4,0,col,rim,0,lx);
  for(let y=top+2;y<b-h*.06;y+=1.8+R()*1.6){const t=(y-top)/h;ell(x,X,y+1,w*(.05+t*.18),1.6,col,.85);
    for(const s of[-1,1]){if(R()<.12)continue;const len=w*(.06+t*.94)*(.7+R()*.45)*.62,ex=X+s*len,ey=y+len*(.22+R()*.3),cx=X+s*len*.55,cy=y-len*.06;
      x.strokeStyle=rgba(col,.95);x.lineWidth=.6+(1-t)*.3+t*.9;x.lineCap='round';x.beginPath();x.moveTo(X,y);x.quadraticCurveTo(cx,cy,ex,ey);x.stroke();
      x.lineWidth=.5;for(let k=0;k<len/2.2;k++){const u=.25+R()*.75,px=X+(cx-X)*2*u*(1-u)+(ex-X)*u*u,py=y+(cy-y)*2*u*(1-u)+(ey-y)*u*u;x.beginPath();x.moveTo(px,py);x.lineTo(px+s*(R()*1.5),py+1.5+R()*3.5);x.stroke()}   // hängende Nadelbüschel
      if(s===lx&&ra>0){x.strokeStyle=rgba(rim,ra);x.lineWidth=.55;x.beginPath();x.moveTo(X+s*len*.3,y-.6);x.quadraticCurveTo(cx,cy-.8,ex,ey-.8);x.stroke()}}}}

function huetteHinten(o){const sx=o.sun?o.sun[0]:150,hz=o.hz,licht=X=>Math.sign(sx-X)||-1,dunst=mix(o.cs,o.hor,.35);
  // fern: Fichtenreihe im Dunst
  let x=lay();for(let i=0;i<26;i++){const X=R()*840-20,b=hz+4+R()*26,f=(b-hz)/30;hhFichte(x,X,b,60+R()*70+f*30,40+R()*26,mix(dunst,o.cs,.35+f*.4),o.sunc,.28,licht(X))}
  put(x,.9);x=lay();for(let i=0;i<30;i++)dab(x,R()*800,hz+18+R()*24,40+R()*30,o.hor,.12);put(x,4,'screen',.55);   // Dunstband vor der Fichtenreihe
  // Mitte: abgestorbene Bäume, Büsche, Bodennebel
  x=lay();for(let i=0;i<9;i++){const X=40+i*90+(R()-.5)*60;if(X>360&&X<600&&R()<.7)continue;const Y=hz+22+R()*40;
    hhToterBaum(x,X,Y,110+R()*110,2.6+R()*2.4,{col:mix([46,36,50],dunst,.25),rim:o.sunc,ra:.32,lx:licht(X),fern:dunst})}
  bgRow(x,34,212,262,12,22,1);put(x,.7);
  x=lay();for(let i=0;i<46;i++)dab(x,R()*800,hz+40+R()*30,24+R()*26,[200,170,200],.16);put(x,5,'screen',.5)}

// vorn: die zwei großen toten Bäume links und rechts
function huetteVorneBaeume(x,o){const sx=o.sun?o.sun[0]:150;[[150,405,280,9],[705,412,320,11]].forEach(([X,Y,h,w])=>
  hhToterBaum(x,X,Y,h,w,{col:[34,26,22],rim:o.sunc,ra:.55,lx:Math.sign(sx-X)||-1,flechte:1}))}
