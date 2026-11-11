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
// Petja im Tusche/Airbrush-Stil: schlaksig, hängende Schultern, karikiertes Gesicht. open=Mund offen, step=Schrittbild
const PET=(open,step)=>`<g stroke="${INK}" stroke-width="1" stroke-linejoin="round" stroke-linecap="round">
<g transform="scale(${step?.7:1},1)">
<g transform="scale(1.15,1.12)"><path d="M-30,0C-34,-1 -35,-6 -30,-9L-14,-12C-10,-12 -8,-8 -8,-4L-8,0Z" fill="#f2efe6"/><path d="M-31,0C-33,-1 -33,-3 -31,-3.5L-8,-3L-8,0Z" fill="#c9c4b8"/><path d="M-29,-8.6C-26.6,-6.8 -26,-4.6 -26.8,-3.4M-10.6,-11.6C-9.4,-10.6 -8.8,-9.2 -8.6,-7.6" fill="none" stroke-width=".5"/><path d="M-21.4,-10.4L-17.6,-8.4M-21,-8.6L-17.8,-10.6M-18.2,-11.4L-14.6,-9.4M-17.8,-9.4L-14.8,-11.6" fill="none" stroke="#8a867c" stroke-width=".5"/>
<path d="M6,0C5,-5 7,-11 12,-12L24,-10C30,-8 33,-4 31,0Z" fill="#ecebe4"/><path d="M6,0L6,-3L31.6,-2.8C32,-1.4 31.6,-.5 31,0Z" fill="#bdb8ac"/><path d="M29,-7.6C26.8,-5.8 26.2,-3.8 27,-3M7.6,-10.6C6.6,-9.4 6.2,-8 6.2,-6.4" fill="none" stroke-width=".5"/><path d="M14.6,-11.4L18.2,-9.2M14.8,-9.4L18,-11.6M17.8,-11L21.4,-8.8M18,-8.8L21.2,-10.8" fill="none" stroke="#8a867c" stroke-width=".5"/></g>
<path d="M-20,-126C-21,-100 -20,-74 -19,-58C-20,-36 -26,-20 -30,-8C-24,-5 -14,-5 -7,-7C-6,-24 -6,-40 -5,-58C-4,-80 -2,-100 0,-114C2,-100 4,-80 5,-58C6,-40 6,-24 7,-7C14,-5 24,-5 30,-8C26,-20 21,-36 20,-58C21,-76 21,-100 20,-126Z" fill="#aebfe0"/>
<path d="M12,-124L20,-126C21,-100 21,-76 20,-58C21,-36 26,-20 30,-8C27,-7 24,-6.5 21,-6.3C18,-22 14,-40 13,-58C13,-82 13,-104 12,-124Z" fill="#8196c2" stroke="none"/>
<path d="M0,-114L-3,-110C-5,-90 -8,-70 -9,-50C-10,-30 -11,-16 -12,-6.6L-7,-7C-6,-24 -6,-40 -5,-58C-4,-80 -2,-100 0,-114Z" fill="#91a3c8" stroke="none"/>
<path d="M-17,-62C-14,-59 -10,-59 -7,-61M8,-63C11,-60 15,-60 18,-62M-24,-22C-20,-18 -15,-19 -12,-22M10,-22C14,-18 19,-19 24,-22M-2,-112L-1,-122" fill="none" stroke="#6c80ac" stroke-width=".8"/>

<path d="M-21,-126C-8,-129 8,-129 21,-126L21,-121C8,-124 -8,-124 -21,-121Z" fill="#a0b2d6"/>
</g>
<g transform="scale(.9,1)">
<path d="M-22,-200C-31,-196 -35,-182 -36,-164L-37,-150L-25,-148C-25,-160 -24,-176 -21,-186Z" fill="#26aaa2"/>
<path d="M-37,-145C-38,-126 -38,-110 -36,-93L-28,-93C-28,-110 -27,-126 -25,-143Z" fill="#dca46c"/><path d="M-30,-143C-30,-126 -30,-110 -29.5,-93L-28,-93C-28,-110 -27,-126 -25,-143Z" fill="#c08a56" stroke="none"/>

<path d="M-38,-152C-34,-149 -28,-148 -24,-149L-24,-142C-28,-141 -33,-142 -37.5,-145Z" fill="#52cec6"/><path d="M-36,-147C-32,-145.6 -29,-145.4 -25,-146" fill="none" stroke="#1a908a" stroke-width=".6"/><path d="M-36.4,-138C-35,-137 -33.4,-137 -32,-138" fill="none" stroke="#a87444" stroke-width=".45"/>
<g transform="translate(-32,-94) scale(1.05) translate(32,101)"><path d="M-37.6,-105C-39.5,-97 -40,-92 -39,-88C-36,-86.4 -31,-86.4 -28,-88C-27,-93 -27,-98 -27.4,-105Z" fill="#dca46c" stroke="none"/><path d="M-37.5,-102C-39.5,-97 -40,-92 -39,-88M-28,-88C-27,-93 -27,-98 -27.5,-102" fill="none"/><path d="M-39,-88.4C-39.8,-84.6 -39.6,-80.6 -38.6,-78C-37.8,-77 -36.8,-77.4 -36.7,-78.4C-36.9,-81.4 -36.7,-85 -36.4,-87.8Z" fill="#dca46c"/><path d="M-36.4,-87.6C-36.8,-83.4 -36.6,-79 -35.6,-76.2C-34.8,-75.2 -33.7,-75.6 -33.7,-76.6C-33.9,-79.8 -33.8,-84 -33.6,-87.2Z" fill="#dca46c"/><path d="M-33.6,-87.2C-33.8,-83.2 -33.6,-79.4 -32.8,-76.8C-32,-75.9 -31,-76.3 -31,-77.3C-31.2,-80.4 -31,-84 -30.8,-87Z" fill="#d49a60"/><path d="M-30.8,-87C-30.8,-84 -30.6,-81.4 -30,-79.6C-29.3,-78.9 -28.4,-79.3 -28.5,-80.2C-28.6,-82.6 -28.4,-85.4 -28.1,-87.8Z" fill="#c8925c"/><path d="M-28.4,-99.5C-25.6,-97.6 -24.4,-93.6 -25.2,-89.8C-25.6,-88.2 -27.3,-88.1 -27.6,-89.6C-27.4,-92.4 -28,-95.2 -29.2,-97Z" fill="#dca46c"/><path d="M-38.4,-80.6L-37,-80.4M-35.5,-79L-34,-78.8M-32.6,-79.4L-31.2,-79.2M-26.4,-93.4L-25.2,-93" fill="none" stroke="#a87444" stroke-width=".4"/><path d="M-38.6,-89.4C-36,-88.2 -32,-88.2 -28.6,-89.4" fill="none" stroke="#a87444" stroke-width=".45"/></g>
<path d="M22,-200C31,-196 35,-182 36,-164L37,-150L25,-148C25,-160 24,-176 21,-186Z" fill="#16807a"/>
<path d="M37,-145C38,-126 38,-110 36,-93L28,-93C28,-110 27,-126 25,-143Z" fill="#c08a56"/>
<path d="M38,-152C34,-149 28,-148 24,-149L24,-142C28,-141 33,-142 37.5,-145Z" fill="#26aaa2"/><path d="M36,-147C32,-145.6 29,-145.4 25,-146" fill="none" stroke="#147470" stroke-width=".6"/><path d="M36.4,-138C35,-137 33.4,-137 32,-138" fill="none" stroke="#8e5e34" stroke-width=".45"/>
<g transform="translate(32,-94) scale(1.05) translate(-32,101)"><path d="M37.6,-105C39.5,-97 40,-92 39,-88C36,-86.4 31,-86.4 28,-88C27,-93 27,-98 27.4,-105Z" fill="#c08a56" stroke="none"/><path d="M37.5,-102C39.5,-97 40,-92 39,-88M28,-88C27,-93 27,-98 27.5,-102" fill="none"/><path d="M39,-88.4C39.8,-84.6 39.6,-80.6 38.6,-78C37.8,-77 36.8,-77.4 36.7,-78.4C36.9,-81.4 36.7,-85 36.4,-87.8Z" fill="#c08a56"/><path d="M36.4,-87.6C36.8,-83.4 36.6,-79 35.6,-76.2C34.8,-75.2 33.7,-75.6 33.7,-76.6C33.9,-79.8 33.8,-84 33.6,-87.2Z" fill="#c08a56"/><path d="M33.6,-87.2C33.8,-83.2 33.6,-79.4 32.8,-76.8C32,-75.9 31,-76.3 31,-77.3C31.2,-80.4 31,-84 30.8,-87Z" fill="#b8844e"/><path d="M30.8,-87C30.8,-84 30.6,-81.4 30,-79.6C29.3,-78.9 28.4,-79.3 28.5,-80.2C28.6,-82.6 28.4,-85.4 28.1,-87.8Z" fill="#b07c4c"/><path d="M28.4,-99.5C25.6,-97.6 24.4,-93.6 25.2,-89.8C25.6,-88.2 27.3,-88.1 27.6,-89.6C27.4,-92.4 28,-95.2 29.2,-97Z" fill="#c08a56"/><path d="M38.4,-80.6L37,-80.4M35.5,-79L34,-78.8M32.6,-79.4L31.2,-79.2M26.4,-93.4L25.2,-93" fill="none" stroke="#8e5e34" stroke-width=".4"/><path d="M38.6,-89.4C36,-88.2 32,-88.2 28.6,-89.4" fill="none" stroke="#8e5e34" stroke-width=".45"/></g>
<path d="M-5,-218L-6,-202C-2,-199 3,-199 6,-202L5,-218Z" fill="#dca46c"/><path d="M-5.4,-212C-1,-208 3,-208 5.6,-211L5,-218L-5,-218Z" fill="#b07c4c" stroke="none"/><path d="M.5,-208C1,-206 1,-204 .5,-203" fill="none" stroke="#a87444" stroke-width=".5"/>
<path d="M-22,-200C-27,-190 -28,-170 -27,-150C-27,-136 -26,-124 -25,-112C-16,-109 -6,-110 0,-112C8,-110 18,-109 25,-112C26,-126 27,-140 27,-152C28,-172 27,-190 22,-200C14,-205 6,-206 0,-204C-8,-206 -16,-205 -22,-200Z" fill="#26aaa2"/>
<path d="M10,-204C16,-203 20,-202 22,-200C27,-190 28,-172 27,-152C27,-140 26,-126 25,-112C21,-111 17,-110 13,-110C16,-124 15,-140 17,-154C19,-170 15,-186 10,-204Z" fill="#16807a" stroke="none"/>
<path d="M-5.6,-208L5.6,-208L6.4,-203L0,-186L-6.4,-203Z" fill="#c8925c" stroke="none"/><path d="M-6,-204L0,-186L6,-204" fill="none" stroke-width=".8"/><path d="M-3,-203L0,-193L3,-203Z" fill="#b07c4c" stroke="none"/>
<path d="M-9,-205L-1,-186L-13,-194C-12,-199 -11,-202 -9,-205ZM9,-205L1,-186L13,-194C12,-199 11,-202 9,-205Z" fill="#40c0b8" stroke-width=".8"/>
<path d="M0,-186C0,-160 -.5,-136 0,-112" fill="none" stroke-width=".8"/><circle cx="-1.6" cy="-174" r=".9" fill="#e8f4f0" stroke-width=".4"/><circle cx="-1.8" cy="-158" r=".9" fill="#e8f4f0" stroke-width=".4"/><circle cx="-1.8" cy="-142" r=".9" fill="#e8f4f0" stroke-width=".4"/><circle cx="-1.6" cy="-126" r=".9" fill="#e8f4f0" stroke-width=".4"/>
<path d="M-17,-184L-8,-184L-8,-174C-11,-172 -14,-172 -17,-174Z" fill="none" stroke="#147470" stroke-width=".8"/>
<path d="M-18,-170C-13,-162 -12,-152 -14,-144M6,-172C10,-164 10,-154 8,-146M-24,-114C-20,-117 -16,-117 -13,-114M14,-114C17,-117 21,-117 24,-114" fill="none" stroke="#147470" stroke-width=".8"/>
</g>
<g transform="translate(0,2)">
<path d="M-12,-238C-14,-247 -8,-255 0,-255.5C8,-255 14,-247 12,-238C12.6,-232 12.4,-228 11.6,-224L-11.6,-224C-12.4,-228 -12.6,-232 -12,-238Z" fill="#5a3818"/>
<path d="M-10.6,-236C-14,-237.5 -14.5,-231 -12.6,-227.5C-11.8,-226 -10.8,-226.4 -10.6,-227.4Z" fill="#d49a60"/><path d="M10.6,-236C14,-237.5 14.5,-231 12.6,-227.5C11.8,-226 10.8,-226.4 10.6,-227.4Z" fill="#b07c4c"/>
<path d="M-12.4,-234.4C-13.2,-232.4 -13,-230.2 -12.2,-228.8M12.4,-234.4C13.2,-232.4 13,-230.2 12.2,-228.8" fill="none" stroke="#8e5e34" stroke-width=".45"/>
<path d="M-10,-243C-11.5,-236 -11.5,-229 -10.5,-224L-8,-216C-6,-212.5 -3,-211 0,-211C3,-211 6,-212.5 8,-216L10.5,-224C11.5,-229 11.5,-236 10,-243C6,-250 -6,-250 -10,-243Z" fill="#dca46c"/>
<path d="M5,-248C9,-244 11,-236 10.8,-229C10.6,-225 10,-222 8,-216C6,-212.5 3,-211 1,-211C5,-214 7,-219 7.6,-226C8.2,-234 7.6,-242 5,-248Z" fill="#c08a56" stroke="none"/>
<path d="M-7.8,-226C-7,-223 -6,-221 -5,-219.6M7.8,-226C7,-223 6,-221 5,-219.6" fill="none" stroke="#a87444" stroke-width=".85"/>
<path d="M-3.4,-221C-4.4,-219.6 -4.6,-218.2 -4,-217M3.4,-221C4.4,-219.6 4.6,-218.2 4,-217" fill="none" stroke="#a87444" stroke-width=".75"/>
<path d="M-7.2,-231C-6,-232.4 -3.2,-232.4 -2,-231C-3.2,-230.2 -6,-230.2 -7.2,-231Z" fill="#f4ead8" stroke-width=".4"/><path d="M7.2,-231C6,-232.4 3.2,-232.4 2,-231C3.2,-230.2 6,-230.2 7.2,-231Z" fill="#f4ead8" stroke-width=".4"/>
<circle cx="-4.5" cy="-231.1" r="1.05" fill="#3a2410" stroke="none"/><circle cx="4.5" cy="-231.1" r="1.05" fill="#3a2410" stroke="none"/>
<path d="M-7.6,-231C-6.2,-232.8 -3,-232.8 -1.6,-231.2M7.6,-231C6.2,-232.8 3,-232.8 1.6,-231.2" fill="none" stroke-width=".9"/>
<path d="M-8.6,-234.4L-2,-233.8M2,-233.8L8.6,-234.4" fill="none" stroke="#4a2a10" stroke-width="1.35"/>
<path d="M-6.6,-229.6C-5.4,-229 -3.8,-229 -2.8,-229.6M6.6,-229.6C5.4,-229 3.8,-229 2.8,-229.6" fill="none" stroke="#a87444" stroke-width=".4"/>
<path d="M.6,-231C1.2,-227 1.6,-224 2.4,-222L.8,-221.4C.6,-224.4 .4,-227.6 .6,-231Z" fill="#c08a56" stroke="none"/>
<path d="M-1,-232.4C-1.2,-228.4 -1.4,-225.2 -1.8,-222.6" fill="none" stroke-width=".6"/>
<path d="M-2.6,-221.6C-1.6,-220.6 1.6,-220.6 2.6,-221.6M-2.2,-221.8C-2.8,-222.4 -2.6,-223.2 -2,-223.4M2.2,-221.8C2.8,-222.4 2.6,-223.2 2,-223.4" fill="none" stroke-width=".55"/>
${open?'<path d="M-3.4,-216.8C-1.2,-216.2 1.2,-216.2 3.4,-216.9C2.6,-214.6 1,-213.8 0,-213.8C-1,-213.8 -2.6,-214.6 -3.4,-216.8Z" fill="#6a2416" stroke-width=".7"/><path d="M-2.6,-216.5L2.6,-216.6L2.3,-215.9C.8,-215.7 -.8,-215.7 -2.3,-215.8Z" fill="#efe6d4" stroke="none"/>':'<path d="M-3.6,-216.6C-1.2,-216 1.2,-216 3.6,-216.8" fill="none" stroke-width=".8"/><path d="M-1.6,-215C-.5,-214.7 .5,-214.7 1.6,-215" fill="none" stroke="#a87444" stroke-width=".45"/>'}
<path d="M-3.9,-216.9L-4.3,-216.2M3.9,-217.1L4.3,-216.4M-1.8,-212.6C-.6,-212.1 .6,-212.1 1.8,-212.6" fill="none" stroke="#a87444" stroke-width=".45"/>
<path d="M-12.4,-236C-13.6,-246 -8,-253.6 0,-253.6C8,-253.6 13.6,-246 12.4,-236C11.8,-234.4 11,-233.6 10.4,-234C10,-237.6 9,-239.6 7.6,-240.4C7,-238 5.6,-236.6 4.2,-236.8C3.6,-238.4 2.6,-239 1.6,-239.2C1,-237.2 -.6,-236.2 -2,-236.4C-2.6,-238 -3.6,-239 -4.6,-239.4C-5.4,-237.4 -7,-236.2 -8.4,-236.6C-8.8,-238.6 -9.4,-239.8 -10.2,-240.2C-10.8,-238 -11.6,-236.6 -12.4,-236Z" fill="#8a5a2a"/>
<path d="M4,-253C9.6,-251.4 13.4,-245.6 12.4,-236C11.8,-234.4 11,-233.6 10.4,-234C10,-237.6 9,-239.6 7.6,-240.4C8.8,-244.6 7.6,-249.6 4,-253Z" fill="#6e4620" stroke="none"/>
<path d="M-8,-250C-4,-252.6 2,-252.6 6,-250.6M-10.4,-245C-7,-249 -2,-250 1,-249.6M-2.6,-247C-2,-243.6 -2.6,-240.6 -3.6,-239.2M4,-248C5,-245 5,-242 4.4,-237.4" fill="none" stroke="#a87440" stroke-width=".6"/>
<path d="M-7,-246C-6.4,-243 -7,-240.6 -8.2,-238.6M8.6,-246C9.4,-243 9.4,-240 8.6,-238" fill="none" stroke="#5a3818" stroke-width=".5"/>
</g></g>`;
const CROW=`<g stroke="#0c0c10" stroke-width="1" stroke-linejoin="round">
<path d="M-26,10L-12,3C-20,-8 -12,-12 -5,-13C10,-16 15,-9 14,-5C13,6 6,8 0,8L-22,15Z" fill="#20242e"/><path d="M-14,2C-6,-6 2,-6 8,-4C4,4 -2,5 -8,6Z" fill="#3c4458" stroke="none"/>
<path d="M-16,4L-6,2M-18,8L-4,5" fill="none" stroke="#4c5468" stroke-width=".7"/>
<path d="M5,-8C3,-21 9,-22 13,-22C20,-22 21,-18 20,-15C19,-8 16,-6 13,-5Z" fill="#20242e"/><path d="M19,-18L30,-15.4L19,-12.4Z" fill="#4a4a50"/>
<circle cx="15" cy="-17" r="1.5" fill="#d8a030" stroke="none"/><path d="M-2,8v6M4,8v6" stroke="#55555c"/></g>`;
const ROUGH='<defs><filter id="r" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".35" numOctaves="2" seed="5"/><feDisplacementMap in="SourceGraphic" scale="1.3" xChannelSelector="R" yChannelSelector="G"/></filter></defs>';
// Handgezeichneter Cartoon-Stil (Tusche + Airbrush): jede gefüllte Fläche bekommt eine eigene weiche Volumenschattierung
// (Licht von links oben, Filter #v), die ganze Figur eine dünne, unruhige braune Tuschekontur, leichte Wärme und Papierkorn (Filter #r).
// INKSTYLE=false schaltet zurück auf den alten Pixel-Look.
const INKSTYLE=true,VOL_BLUR=3.4,VOL_HEIGHT=16;
const INKF='<defs><filter id="v" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">'+
  `<feGaussianBlur in="SourceAlpha" stdDeviation="${VOL_BLUR}" result="b"/>`+
  `<feDiffuseLighting in="b" surfaceScale="${VOL_HEIGHT}" diffuseConstant="1" lighting-color="#fff" result="l"><feDistantLight azimuth="225" elevation="40"/></feDiffuseLighting>`+
  '<feComponentTransfer in="l" result="lm"><feFuncR type="linear" slope=".55" intercept=".6"/><feFuncG type="linear" slope=".55" intercept=".58"/><feFuncB type="linear" slope=".55" intercept=".55"/></feComponentTransfer>'+
  '<feComposite in="SourceGraphic" in2="lm" operator="arithmetic" k1="1" result="m"/><feComposite in="m" in2="SourceAlpha" operator="in"/></filter>'+
  '<filter id="r" x="-8%" y="-8%" width="116%" height="116%" color-interpolation-filters="sRGB">'+
  '<feTurbulence type="fractalNoise" baseFrequency=".6" numOctaves="2" seed="7" result="n"/>'+
  '<feDisplacementMap in="SourceGraphic" in2="n" scale=".9" xChannelSelector="R" yChannelSelector="G" result="s0"/>'+
  '<feColorMatrix in="s0" type="matrix" values="1.08 0 0 0 .01  0 1.02 0 0 0  0 0 .94 0 0  0 0 0 1 0" result="s"/>'+
  '<feTurbulence type="fractalNoise" baseFrequency=".12" numOctaves="1" seed="3" result="n2"/>'+
  '<feMorphology in="SourceAlpha" operator="dilate" radius=".55" result="d"/>'+
  '<feDisplacementMap in="d" in2="n2" scale="1.4" xChannelSelector="R" yChannelSelector="G" result="dw"/>'+
  '<feFlood flood-color="#2a140a"/><feComposite in2="dw" operator="in" result="ol"/>'+
  '<feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="11"/>'+
  '<feColorMatrix type="matrix" values="0 0 0 0 .16  0 0 0 0 .08  0 0 0 0 .03  .25 0 0 0 -.13"/><feComposite in2="SourceAlpha" operator="in" result="gr"/>'+
  '<feMerge><feMergeNode in="ol"/><feMergeNode in="s"/><feMergeNode in="gr"/></feMerge></filter></defs>';
// PIXELSTYLE: Figuren als Zeichentrick-Sprites, 500 Pixel hoch (≈ Bildschirmgröße). Die Arrays in pixel/ werden aus genau diesen Sprites exportiert.
// Stil wie ein handgemalter Zeichentrick-Cel: braune Federkontur (außen ~2 px, auf der Schattenseite rechts/unten dicker),
// weiche Airbrush-Schattierung (Licht von links oben, Filter #v, innerhalb jeder Farbfläche verwischt), leicht gedämpfte Farben.
// Stellschrauben: PIX_INK Linienfarbe, PIX_SOFT Schattentiefe, PIX_BLUR Weichheit, PIX_SAT Sättigung, PIX_LINE Stärke der Innenlinien,
// PIX_MIX/PIX_NEAR: Durchgänge/Farbabstand für das Verwischen ähnlicher Farben (gezeichnete Schattenflächen, Falten) – verschiedene Materialien bleiben scharf getrennt.
// Tiere (Kiste < 150 Einheiten hoch) bekommen dieselbe Pixeldichte wie Petja. PIXELSTYLE=false -> alter handgezeichneter Stil (INKSTYLE).
const PIXELSTYLE=true,PIX_ROWS=500,PIX_LINE=.55,PIX_INK=[46,28,16],PIX_SOFT=.8,PIX_BLUR=2,PIX_SAT=.8,PIX_MIX=2,PIX_NEAR=62;
if(INKSTYLE&&!PIXELSTYLE)document.documentElement.classList.add('ink');
function pixSprite(inner,[x,y,w,h]){const H=h>=150?PIX_ROWS:Math.round(h*PIX_ROWS/258),W=Math.round(w*H/h),SS=3;
  // feine Innenlinien: Tusche- und Detailstriche (<=1.6) dünner zeichnen; dicke farbige Striche (Haarsträhnen, Stab) bleiben
  const thin=inner.replace(/stroke-width="([\d.]+)"/g,(m,v)=>+v<=1.6?`stroke-width="${(+v*PIX_LINE).toFixed(2)}"`:m);
  const svg=s=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${W*SS}" height="${H*SS}" viewBox="${x} ${y} ${w} ${h}" preserveAspectRatio="none">${s}</svg>`);
  const load=src=>new Promise(r=>{const im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=W*SS;c.height=H*SS;const g=c.getContext('2d');g.drawImage(im,0,0);r(g.getImageData(0,0,c.width,c.height).data)};im.src=src});
  // zweimal rendern: flach (welche Farbe?) und beleuchtet (wie hell?)
  return Promise.all([load(svg(thin)),load(svg(INKF+volumize(thin)))]).then(([d,dl])=>{const cw=W*SS;
    const rgb=s=>{s=s.slice(1);if(s.length==3)s=[...s].map(q=>q+q).join('');return [0,2,4].map(i=>parseInt(s.substr(i,2),16))};
    const base=[PIX_INK,...[...new Set((inner.match(/(fill|stroke)="#[0-9a-fA-F]{3,6}"/g)||[]).map(s=>s.slice(s.indexOf("#"),-1).toLowerCase()))].map(rgb).filter(q=>Math.hypot(q[0]-30,q[1]-16,q[2]-8)>40)],NB=base.length;
    const memo=new Map(),near=(r,gg,b)=>{const key=r<<16|gg<<8|b;let v=memo.get(key);if(v!==undefined)return v;let bd=1e9;v=0;for(let i=0;i<NB;i++){const p=i?base[i]:[16,10,8],dd=(p[0]-r)**2+(p[1]-gg)**2+(p[2]-b)**2;if(dd<bd){bd=dd;v=i}}memo.set(key,v);return v};
    // pro Zielpixel: häufigste Grundfarbe aus SS×SS Unterpixeln (ab 25 % Tinte -> Linie) + Lichtwert (beleuchtet / flach)
    const N=W*H,grid=new Int16Array(N).fill(-1),RT=new Float32Array(N).fill(1),cnt=new Uint16Array(NB);
    for(let Y=0;Y<H;Y++)for(let X=0;X<W;X++){cnt.fill(0);let op=0,lf=0,ul=0;for(let j=0;j<SS;j++)for(let i=0;i<SS;i++){const q=((Y*SS+j)*cw+X*SS+i)*4;if(d[q+3]<128)continue;op++;cnt[near(d[q],d[q+1],d[q+2])]++;lf+=dl[q]+dl[q+1]+dl[q+2];ul+=d[q]+d[q+1]+d[q+2]}
      if(op<SS*SS/2)continue;const k=Y*W+X;if(cnt[0]>=SS*SS*.25){grid[k]=0;continue}let b=1;for(let n=2;n<NB;n++)if(cnt[n]>cnt[b])b=n;grid[k]=b;RT[k]=ul>0?lf/ul/.93:1}
    // Airbrush: Lichtwerte innerhalb derselben Farbfläche verwischen
    for(let p=0;p<PIX_BLUR;p++){const T=RT.slice();for(let Y=0;Y<H;Y++)for(let X=0;X<W;X++){const k=Y*W+X,g0=grid[k];if(g0<=0)continue;let s=0,n=0;
      for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++){const xx=X+dx,yy=Y+dy;if(xx<0||yy<0||xx>=W||yy>=H)continue;const j=yy*W+xx;if(grid[j]!==g0)continue;s+=T[j];n++}RT[k]=s/n}}
    // Federkontur: ein Ring um die ganze Figur, auf der Schattenseite (rechts/unten) ein zweiter -> ungleichmäßig dick
    const fig=(X,Y)=>X>=0&&Y>=0&&X<W&&Y<H&&grid[Y*W+X]>=0,G=grid.slice();
    for(let Y=0;Y<H;Y++)for(let X=0;X<W;X++){const k=Y*W+X;if(grid[k]<0&&(fig(X-1,Y)||fig(X+1,Y)||fig(X,Y-1)||fig(X,Y+1)))G[k]=0}
    const G2=G.slice();for(let Y=0;Y<H;Y++)for(let X=0;X<W;X++){const k=Y*W+X;if(G[k]>=0)continue;if((X>1&&G[k-1]==0&&grid[k-1]<0&&fig(X-2,Y))||(Y>1&&G[k-W]==0&&grid[k-W]<0&&fig(X,Y-2)))G2[k]=0}
    const C=new Float32Array(N*3);
    for(let k=0;k<N;k++){const v=G2[k];if(v<0)continue;let c;
      if(v==0)c=PIX_INK;else{const f=1-(1-Math.min(1.08,Math.max(.68,RT[k])))*PIX_SOFT,p=base[v],r=p[0]*f,g=p[1]*f,b=p[2]*f,L=.299*r+.587*g+.114*b;c=[L+(r-L)*PIX_SAT,L+(g-L)*PIX_SAT,L+(b-L)*PIX_SAT]}
      C[k*3]=c[0];C[k*3+1]=c[1];C[k*3+2]=c[2]}
    // ähnliche Farben weich ineinander verlaufen lassen (kantenerhaltend), Tusche bleibt scharf
    for(let p=0;p<PIX_MIX;p++){const T=C.slice();for(let Y=0;Y<H;Y++)for(let X=0;X<W;X++){const k=Y*W+X;if(G2[k]<=0)continue;let r=0,g=0,b=0,n=0;
      for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++){const xx=X+dx,yy=Y+dy;if(xx<0||yy<0||xx>=W||yy>=H)continue;const j=yy*W+xx;if(G2[j]<=0)continue;
        if(Math.abs(T[j*3]-T[k*3])+Math.abs(T[j*3+1]-T[k*3+1])+Math.abs(T[j*3+2]-T[k*3+2])>PIX_NEAR*1.7)continue;r+=T[j*3];g+=T[j*3+1];b+=T[j*3+2];n++}
      C[k*3]=r/n;C[k*3+1]=g/n;C[k*3+2]=b/n}}
    const o=document.createElement('canvas');o.width=W;o.height=H;const og=o.getContext('2d'),id=og.createImageData(W,H),od=id.data;
    for(let k=0;k<N;k++){if(G2[k]<0)continue;const q=k*4;od[q]=Math.max(0,Math.min(255,C[k*3]));od[q+1]=Math.max(0,Math.min(255,C[k*3+1]));od[q+2]=Math.max(0,Math.min(255,C[k*3+2]));od[q+3]=255}
    og.putImageData(id,0,0);return o.toDataURL()})}
// hängt den Volumen-Filter an jede Form mit Farbfüllung
const volumize=s=>s.replace(/<(path|ellipse|circle|rect|polygon)\b([^>]*)>/g,(m,t,a)=>/\bfill="#/.test(a)&&!/\bfilter=/.test(a)?`<${t} filter="url(#v)"${a}>`:m);
function sprite(inner,[x,y,w,h],k){if(PIXELSTYLE)return pixSprite(inner,[x,y,w,h]);if(INKSTYLE){k*=2.5;inner=volumize(inner)}return new Promise(res=>{const cw=Math.round(w*k),ch=Math.round(h*k),im=new Image();
  im.onload=()=>{const o=document.createElement('canvas');o.width=cw;o.height=ch;const g=o.getContext('2d');g.drawImage(im,0,0,cw,ch);
    if(!INKSTYLE){const id=g.getImageData(0,0,cw,ch),d=id.data;for(let i=0;i<d.length;i+=4){if(d[i+3]<100){d[i+3]=0;continue}d[i+3]=255;for(let j=0;j<3;j++)d[i+j]=d[i+j]&0xF8}
    g.putImageData(id,0,0)}res(o.toDataURL())};
  im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${cw}" height="${ch}" viewBox="${x} ${y} ${w} ${h}">${INKSTYLE?INKF:ROUGH}<g filter="url(#r)">${inner}</g></svg>`)})}
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
  fade.style.opacity=0;changing=false;if(!seen[id]){seen[id]=1;S0.intro&&setTimeout(()=>say(S0.intro),450)}else entryBark(id)},420)}
