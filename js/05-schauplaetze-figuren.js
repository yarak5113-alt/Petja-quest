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
   intro:[['P','Ein Sumpf. Es stinkt nach Moder und... Parfüm?'],['P','Da sitzen nackte Frauen im Wasser. Klar. Warum auch nicht. Nicht hinstarren, Petja.'],['P','...Manche davon sind über hundert. Okay, jetzt starr ich aus anderen Gründen.']]},
 fischer:{...BASE,seed:53,hz:200,sun:[640,150],sunr:40,top:[70,80,96],hor:[200,190,170],sunc:[250,220,170],cl:[200,200,204],cs:[96,100,116],cov:.42,masses:[[-30,830,150,40]],spruce:1,trunks:0,band:[0,800],bc:[[60,74,80],[90,104,108]],lit:[[50,66,50],[80,96,70]],dark:[[18,28,24],[34,46,40]],haze:[170,176,176],
   g:[[30,40,20],[58,72,32],[96,100,58]],sand:[[96,80,56],[150,130,96]],gh:[120,130,120],dapple:.04,b0:[[24,36,14],[44,58,22]],b1:[[90,108,50],[140,146,86]],fol:[[16,30,14],[44,66,26],[110,124,64]],fl:[[220,220,230],[200,200,140]],nfl:60,rayc:[255,220,170],raya:.15,gr:['rgba(255,190,130,.3)','rgba(30,50,80,.45)'],vig:.6,
   pe:segPath([[-30,488,60,240,440,34],[240,440,34,150,352,14],[240,440,34,690,386,20]]),gtop:()=>201,k:1/270,x0:40,x1:770,ymin:x=>x<250?356:338+(x-250)*.05+14,ymax:494,paint:paintFischer,
   intro:[['P','Ein See. Und ein Fischer. Endlich mal jemand, der nicht nackt ist oder auf Hühnerbeinen steht.'],['P','Gut, bei dem Bart weiß man nie.']]},
 dorf:{...BASE,seed:67,hz:200,sun:[220,90],sunr:50,top:[104,116,130],hor:[214,210,198],sunc:[240,236,220],cl:[226,226,228],cs:[120,124,136],cov:.4,masses:[[-30,330,60,60],[480,830,60,60],[300,560,110,50]],trunks:0,band:[200,640],
   lit:[[80,100,56],[130,140,84]],haze:[196,200,198],g:[[44,54,26],[84,96,44],[130,128,76]],sand:[[66,52,36],[124,104,78]],gh:[170,176,166],dapple:.06,b1:[[110,130,56],[170,170,96]],fol:[[22,40,16],[66,94,32],[160,170,86]],nfl:90,rayc:[255,240,210],raya:.15,gr:['rgba(240,220,180,.3)','rgba(40,50,80,.35)'],vig:.5,
   pe:segPath([[430,512,190,436,330,46],[436,330,46,446,206,5],[-30,352,26,436,322,40],[436,322,40,830,344,30],[380,470,60,262,432,18]]),gtop:X=>201+Math.pow(Math.abs(X-440)/440,1.6)*12,k:1.05/286,x0:40,x1:760,ymin:x=>x<300?440:x>530?446:330,ymax:494,paint:paintDorf,
   intro:[['P','Ein Dorf. Mit Häusern. Und sogar Strom.'],['P','...Nein. Die Leitungen hängen nur so rum.'],['P','Ein Laden, ein Brunnen, eine Kirche und ein abgebranntes Haus. Klassisches Dorf.']]},
 dorfstr:{},
 kirche:{},
 sperre:{...BASE,seed:41,hz:200,sun:[450,40],sunr:30,top:[26,34,38],hor:[60,74,68],sunc:[150,170,150],cl:[80,90,88],cs:[40,48,50],cov:.5,masses:[[-30,830,0,40]],spruce:1,trunks:0,band:[0,800],bc:[[24,32,32],[40,50,48]],
   lit:[[30,44,26],[50,64,36]],dark:[[8,14,10],[18,26,18]],haze:[50,62,60],g:[[20,28,14],[38,50,22],[58,64,34]],sand:[[58,46,30],[100,84,58]],gh:[50,62,58],dapple:.03,b0:[[14,22,10],[28,38,16]],b1:[[46,62,26],[78,90,46]],d0:[[4,8,4],[12,18,8]],d1:[[20,30,14],[36,48,22]],
   fol:[[10,18,8],[30,46,20],[74,92,46]],fl:[[150,150,170],[170,180,140]],nfl:30,rayc:[180,210,190],raya:.22,gr:['rgba(120,150,130,.3)','rgba(10,20,40,.55)'],vig:.75,xr:y=>{const e=cxS(y),w=opS(y)-40;return[e-w,y>384&&y<466?770:e+w]},
   pe:segPath([[400,512,170,420,420,70],[420,420,70,440,330,24],[440,330,24,452,250,6],[430,446,50,620,420,32],[620,420,32,840,398,24]]),gtop:X=>201+Math.pow(Math.abs(X-440)/440,1.6)*14,k:1.05/286,x0:60,x1:760,ymin:()=>FL.cut?340:398,ymax:494,paint:paintSperre,
   intro:[['P','Na toll. Alles voller Birken. Als hätte sie jemand absichtlich hier hingeworfen.'],['P','Und links und rechts nur Wald. Dicht wie eine Mauer. Und dunkel wie im Arsch eines Bären.'],['P','Ohne Säge komm ich da nicht durch.']]}
};
SCN.buehne={...BASE,seed:181,hz:200,pe:()=>null,gtop:()=>500,k:1.1/270,x0:60,x1:740,ymin:()=>480,ymax:494,paint:paintBuehne,gr:['rgba(255,120,180,.3)','rgba(60,0,40,.45)'],vig:.4,
  intro:[['P','Ganz vorne an der Bühne. Von hier sieht man... alles. Also, die Choreografie.']]};
SCN.lounge={...BASE,seed:171,hz:200,pe:()=>null,gtop:()=>500,k:1.1/270,x0:60,x1:740,ymin:()=>440,ymax:494,paint:paintLounge,gr:['rgba(255,120,160,.3)','rgba(60,0,30,.5)'],vig:.4};
SCN.irrwald={...SCN.sperre,seed:151,xr:null,vig:.5,top:[60,74,84],hor:[120,136,128],g:[[30,40,22],[56,70,34],[86,92,52]],pe:segPath([[420,512,150,420,380,40],[420,380,40,150,250,8],[420,380,40,450,214,5],[420,380,40,700,250,8]]),gtop:X=>201+Math.pow(Math.abs(X-440)/440,1.6)*14,ymin:()=>384,paint:paintIrrwald,
  intro:[['P','Der Irrwald. Drei Wege, alle sehen gleich aus. Und irgendwas glotzt mich aus dem Dunkeln an.']]};
SCN.banjaV={...SCN.irrwald,seed:167,top:[18,14,30],hor:[60,40,62],sunc:[200,160,200],cl:[60,50,70],cs:[30,24,40],haze:[60,50,70],vig:.7,gr:['rgba(255,80,160,.28)','rgba(10,0,30,.6)'],
  g:[[18,24,14],[34,44,22],[56,60,36]],pe:segPath([[420,512,150,422,388,60]]),gtop:X=>201+Math.pow(Math.abs(X-440)/440,1.6)*14,k:.8/286,x0:60,x1:760,ymin:()=>392,ymax:494,paint:paintBanjaV,
  intro:[['P','Mitten im finsteren Wald ein Blockhaus. Rotes Licht, Musik, Dampf aus dem Schornstein. Klar.'],['P','Das muss das Banja sein. Hier draußen ist es so dunkel, dass selbst die Eulen Angst haben.']]};
SCN.banja={...BASE,seed:163,hz:200,pe:()=>null,gtop:()=>500,k:1.1/270,x0:60,x1:740,ymin:()=>424,ymax:494,paint:paintBanja,gr:['rgba(255,120,180,.3)','rgba(60,0,40,.45)'],vig:.4,
  intro:[['P','Das Banja. Dampf, rotes Licht, Wodka-Geruch. Und eine Bühne mit Vorhang.'],['Z','Neues Gesicht! Komm rein, Süßer. Füße abputzen, Hose zulassen, Geld locker machen. In der Reihenfolge.']]};
SCN.muehle={...BASE,seed:139,hz:200,sun:[180,110],sunr:50,top:[70,100,150],hor:[236,214,170],sunc:[255,226,170],cs:[130,120,120],cl:[244,230,210],cov:.47,masses:[[-30,330,30,80],[480,830,30,80]],band:[250,560],
  fol:[[50,36,10],[150,104,30],[230,176,70]],lit:[[150,110,40],[210,170,80]],b1:[[150,140,50],[220,200,100]],nfl:80,gr:['rgba(255,200,120,.4)','rgba(50,50,90,.3)'],vig:.5,raya:.3,rayc:[255,220,160],
  pe:segPath([[830,478,50,520,432,40],[520,432,40,218,346,14]]),gtop:X=>201+Math.pow(Math.abs(X-400)/400,1.6)*12,k:1/270,x0:40,x1:760,ymin:x=>x<540?410:384,ymax:494,paint:paintMuehle,
  intro:[['P','Eine alte Wassermühle. Das Rad dreht sich, das Wasser rauscht.'],['P','Und keiner ist da. Wer hat das Ding angeschaltet? Wasser... ja gut. Aber trotzdem.']]};
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
Promise.all([sprite(PET(0,0),PB,K),sprite(PET(1,0),PB,K),sprite(PET(0,1),PB,K),sprite(CROW,[-30,-26,64,44],K),sprite(FISHER,[-64,-142,134,224],K),sprite(OMA,[-46,-200,92,204],K),sprite(OPA,[-42,-170,84,174],K)]).then(([a,b,st,cr,fi,om,op])=>{$('#omaimg').setAttribute('href',om);$('#opaimg').setAttribute('href',op);sprite(GNOM1,[-66,-296,140,300],K).then(k=>$('#gnom1img').setAttribute('href',k));sprite(GNOM2,[-52,-232,106,236],K).then(k=>$('#gnom2img').setAttribute('href',k));sprite(WOWA,[-52,-262,104,266],K).then(u=>{WOWAIMG=new Image();WOWAIMG.src=u});sprite(DANCER,[-50,-262,104,266],K).then(k=>{$('#dancerimg').setAttribute('href',k);$('#poleimg').setAttribute('href',k);DANCERIMG.src=k;$('#dancer2img').setAttribute('href',k)});sprite(ZINA,[-44,-262,106,266],K).then(k=>$('#zinaimg').setAttribute('href',k));sprite(BJ,[-62,-250,108,256],K).then(k=>$('#bjimg').setAttribute('href',k));sprite(KATER,[-22,-58,52,62],K).then(k=>$('#katerimg').setAttribute('href',k));document.querySelectorAll('.fishimg').forEach(e=>e.setAttribute('href',fi));frames=[a,b,st];PETIMG.src=a;petimg.setAttribute('href',a);$('#crowimg').setAttribute('href',cr)});
setInterval(()=>{if(!frames[2])return;ft=1-ft;petimg.setAttribute('href',frames[mv?(ft?2:0):talking?ft:0])},150);

// ================= Laufen & Szenenwechsel =================
const P={x:400,y:476,dir:1};let mv=null,cur=null,changing=false;const cache={},seen={wald:1};
function scaleAt(y){const o=S0,sN=o.k*(494-o.hz),t=Math.max(.05,(y-o.hz)/(494-o.hz));return sN*Math.pow(t,o.pp||1.15)}
function render(){const sc=scaleAt(P.y);petG.setAttribute('transform',`translate(${P.x.toFixed(1)},${P.y.toFixed(1)}) scale(${(sc*P.dir).toFixed(3)},${sc.toFixed(3)})`)}
function walkTo(tx,ty,cb){const o=S0;tx=Math.max(o.x0,Math.min(o.x1,tx));ty=Math.max(o.ymin(tx),Math.min(o.ymax,ty));if(o.xr){const[a,b]=o.xr(ty);tx=Math.max(a,Math.min(b,tx))}mv={tx,ty,cb}}
let last=0;(function loop(t){const dt=Math.min(.05,(t-last)/1000||0);last=t;
  if(mv&&S0){const dx=mv.tx-P.x,dy=mv.ty-P.y,d=Math.hypot(dx,dy),sp=140*scaleAt(P.y)*dt+.3;
    if(d<=sp){P.x=mv.tx;P.y=mv.ty;const cb=mv.cb;mv=null;cb&&cb()}else{P.x+=dx/d*sp;P.y+=dy/d*sp;if(Math.abs(dx)>1)P.dir=dx<0?-1:1}render()}
  requestAnimationFrame(loop)})(0);
const fade=$('#fade');
function enter(id,pos){if(cur&&cur!==id)onLocationLeave(cur);changing=true;mv=null;fade.style.opacity=1;setTimeout(()=>{S0=SCN[id];
  if(cache[id])c.drawImage(cache[id],0,0);else{s=S0.seed;S0.paint();const k=document.createElement('canvas');k.width=W;k.height=H;k.getContext('2d').drawImage(cv,0,0);cache[id]=k}
  document.querySelectorAll('.room').forEach(r=>r.classList.toggle('on',r.id=='r-'+id));cur=id;document.getElementById('petimg').style.filter=id=='sperre'?'brightness(.6) saturate(.75)':id=='banjaV'?'brightness(.7) saturate(.8)':'';if(id=='sumpf')applySwampNymphs();if(id=='banja'){const d=$('#dancerG');d.style.display=FL.rekrut?'':'none';d.setAttribute('transform','translate(640,330) scale(.62)');d.querySelector('g').classList.add('dance')}P.x=pos[0];P.y=pos[1];render();
  fade.style.opacity=0;changing=false;if(!seen[id]){seen[id]=1;S0.intro&&setTimeout(()=>say(S0.intro),450)}},420)}
