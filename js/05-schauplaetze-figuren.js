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
   intro:[['P','Da ist sie. Eine Hütte auf Hühnerbeinen.','staunen'],['P','Wowa, wenn ich hier rauskomme, bring ich dich um.'],['J','Wer schleicht da um mein Haus? Ich rieche Stadtluft!']]},
 sumpf:{...BASE,seed:31,hz:200,sun:[620,150],sunr:70,top:[34,52,62],hor:[214,206,160],sunc:[255,232,170],cs:[90,96,96],cl:[205,210,195],cov:.45,masses:[[-30,330],[520,830],[290,560,95,70]],trunks:0,dead:1,spruce:1,band:[300,520],bc:[[90,110,100],[120,140,124]],lit:[[60,90,50],[100,120,70]],dark:[[16,30,22],[30,46,34]],haze:[170,190,170],
   g:[[30,46,22],[64,86,34],[110,120,64]],sand:[[70,58,38],[120,104,70]],gh:[150,170,150],dapple:.08,b0:[[24,40,14],[46,66,22]],b1:[[96,118,50],[150,160,86]],fol:[[22,36,16],[56,80,30],[130,150,70]],fl:[[230,230,240],[200,220,150]],nfl:60,rayc:[255,228,160],raya:.3,gr:['rgba(255,214,140,.38)','rgba(8,36,52,.5)'],vig:.68,
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
  intro:[['P','Das Ufer. Schilf, Schlamm und ein Boot, das schon lange aufgegeben hat.'],['P','Da vorne fängt der Pier an. Unten drunter ist es dunkel. Natürlich.']]};
SCN.unter={...BASE,seed:97,hz:200,pe:()=>null,gtop:()=>500,k:1/270,x0:60,x1:740,ymin:()=>412,ymax:494,paint:paintUnter,
  intro:[['P','Unter dem Pier. Es riecht nach Algen, Fisch und Kusmitschs Füßen.'],['P','Da hängt seine Schnur durch die Bretter. Mit leerem Haken. Kein Wunder, dass nie was beißt.']]};
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
// Petja aus 8 Richtungen: PETV(th,open,step) – th = Drehung in Grad (0 vorne, 45 schräg vorne, 90 Profil nach rechts, 135 schräg hinten, 180 hinten).
// Die linken Richtungen entstehen durch Spiegeln (P.dir). Körper (Beine, Schuhe, Arme, Hände, Hemd) wird aus 3D-Gelenkpunkten projiziert,
// die Köpfe sind je Ansicht gezeichnet. open = Mund offen (Reden), step = Schrittbild (Beine und Arme schwingen gegeneinander).
const PSK='#dca46c',PSK2='#c08a56',PSKL='#a87444',PTE='#26aaa2',PTE2='#16807a',PTE3='#40c0b8',PJE='#aebfe0',PJEL='#6c80ac';
const f1=v=>Math.round(v*100)/100;
// Röhre mit runden Enden von (x1,y1,r1) nach (x2,y2,r2)
function tube(x1,y1,r1,x2,y2,r2){const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L;
  return `M${f1(x1+nx*r1)},${f1(y1+ny*r1)}L${f1(x2+nx*r2)},${f1(y2+ny*r2)}A${r2},${r2} 0 0 0 ${f1(x2-nx*r2)},${f1(y2-ny*r2)}L${f1(x1-nx*r1)},${f1(y1-ny*r1)}A${r1},${r1} 0 0 0 ${f1(x1+nx*r1)},${f1(y1+ny*r1)}Z`}
// Hand von der Seite (Innenfläche zum Oberschenkel): u = nach vorne, v = nach unten ab Handgelenk
// Cartoon-Hand: Handrücken mit Knöchelreihe, vier einzelne, leicht nach vorn gekrümmte Finger (kleiner Finger hinten, Zeigefinger vorn)
// Finger: [Mitte u, Breite, Spitze v, Krümmung nach vorn]
const PFING=[[-4.3,3,15.4,1.8],[-1.45,3.2,17.8,2.4],[1.6,3.3,18.4,2.9],[4.5,3.1,16.8,3.2]];
const PHAND=col=>{let s='';PFING.forEach(([cx,w,t,k],i)=>{const L=cx-w/2,R=cx+w/2,e=t-w/2,P=(a,b)=>f1(a)+','+f1(b);
    s+=`<path d="M${P(L,7)}Q${P(L-.3,e*.7)} ${P(L+k,e)}C${P(L+k,t+.3)} ${P(R+k,t+.3)} ${P(R+k,e)}Q${P(R+.2,e*.7)} ${P(R,7)}Z" fill="${i?col:PSK2}"/>`+
      `<path d="M${P(L+k*.55+.3,e-3.6)}Q${P(cx+k*.55,e-3.1)} ${P(R+k*.55-.3,e-3.6)}" fill="none" stroke="${PSKL}" stroke-width=".4"/>`});
  return s+`<path d="M-3,0C-4,3 -5.6,6 -6,9.4Q-4.3,11 -2.9,9.9Q-1.4,11.2 .1,9.9Q1.6,11.4 3.1,9.9Q4.6,11 6,9.6C5.8,6 4.4,3 3,0Z" fill="${col}"/>`+
    `<path d="M-2.6,-1.4L2.6,-1.4L2.7,1.2L-2.7,1.2Z" fill="${col}" stroke="none"/><path d="M-2,3.4C-2.6,5 -3,6.6 -3.1,8M1.6,3.6C1.8,5.2 1.8,6.8 1.4,8.2" fill="none" stroke="${PSKL}" stroke-width=".4"/>`};
const PTHUMB=col=>`<path d="M2.4,2.4C5.8,3.2 8,6.6 8.2,10.4C8.3,12.4 7,13.4 5.8,12.6C5,10.4 4,7.8 2,6.2Z" fill="${col}"/><path d="M5.2,8C5.8,8.4 6.2,8.8 6.4,9.4" fill="none" stroke="${PSKL}" stroke-width=".4"/>`;
// Proportionen: kleiner, schmaler Kopf (PHEADX = Breite), riesige klobige Hände
const PHEADS=1,PHEADX=.9,PBODY=1,PHANDS=1.3;
// kurze Arme: Ellbogen EY höher als früher, Handgelenk auf Höhe WY (Hände enden etwa auf halber Oberschenkelhöhe)
const EY=-8,WY=-121;
// Rumpf: schmale, abfallende Schultern direkt am Hals, darunter Kasten-Schnitt
const PTORSO=`<path d="M-16,-199C-22,-194 -25.6,-184 -26.4,-168C-26,-152 -23.6,-142 -23.2,-132C-23,-124 -23.6,-118 -24,-112C-15,-109 -6,-110 0,-112C8,-110 18,-109 24,-112C23.6,-118 23,-124 23.2,-132C23.6,-142 26,-152 26.4,-168C25.6,-184 22,-194 16,-199C11,-203 6,-205.4 0,-205C-6,-205.4 -11,-203 -16,-199Z" fill="${PTE}"/><path d="M8,-203.6C12,-202 14.4,-200.6 16,-199C22,-194 25.6,-184 26.4,-168C26,-152 23.6,-142 23.2,-132C23,-124 23.6,-118 24,-112C21,-111 17,-110 13,-110C15,-124 14.6,-140 16,-154C18,-170 14,-186 8,-203.6Z" fill="${PTE2}" stroke="none"/>`;
const PFRONT=`<path d="M-5.6,-208L5.6,-208L6.4,-203L0,-186L-6.4,-203Z" fill="#c8925c" stroke="none"/><path d="M-3,-203L0,-193L3,-203Z" fill="#b07c4c" stroke="none"/><path d="M-6,-204L0,-186L6,-204" fill="none" stroke-width=".8"/>`+
  `<path d="M-9,-205L-1,-186L-13,-194C-12,-199 -11,-202 -9,-205ZM9,-205L1,-186L13,-194C12,-199 11,-202 9,-205Z" fill="${PTE3}" stroke-width=".8"/><path d="M0,-186C0,-160 -.5,-136 0,-112" fill="none" stroke-width=".8"/>`+
  [-174,-158,-142,-126].map(y=>`<circle cx="-1.6" cy="${y}" r=".9" fill="#e8f4f0" stroke-width=".4"/>`).join('')+
  `<path d="M-17,-184L-8,-184L-8,-174C-11,-172 -14,-172 -17,-174Z" fill="none" stroke="#147470" stroke-width=".8"/><path d="M-18,-170C-13,-162 -12,-152 -14,-144M6,-172C10,-164 10,-154 8,-146M-24,-114C-20,-117 -16,-117 -13,-114M14,-114C17,-117 21,-117 24,-114" fill="none" stroke="#147470" stroke-width=".8"/>`;
const PBACK=`<path d="M-9,-206C-4,-208 4,-208 9,-206L8.4,-201C3,-203 -3,-203 -8.4,-201Z" fill="${PTE3}"/><path d="M-17,-194C-8,-190 8,-190 17,-194M0,-190L0,-180M-16,-150C-12,-140 -12,-128 -14,-118M15,-148C12,-138 12,-128 13,-118" fill="none" stroke="#147470" stroke-width=".7"/>`;
// ---- Köpfe je Ansicht ----
// ===== Mimik =====
// Pro Emotion: Brauen bL/bR=[außen-y, innen-y, Bogen], Augen eL/eR=[Oberlid-Öffnung, Unterlid, Lächel-Unterlid], Pupille r + Blick px/py,
// ck=Wangen hoch, nl=Nasolabial-Spreizung, tilt=Kopfneigung; m=[Ruhe-Mund, 3 Sprech-Münder] als [Breite, Öffnung, Winkel links, Winkel rechts, Versatz, O-Form, Zähne]
const PEMOS={
  n:{bL:[-234.4,-233.8,0],bR:[-234.4,-233.8,0],eL:[1.4,.8],eR:[1.4,.8],lid:.55,r:1.05,px:0,py:0,ck:0,nl:0,
     m:[[3.6,0,.1,.1],[3,1.3,.1,.1],[3.4,2.2,.1,.1,0,0,1],[2,2.2,0,0,0,1]]},
  schreck:{bL:[-235,-237.8,-.5],bR:[-235,-237.8,-.5],eL:[2.4,1.5],eR:[2.4,1.5],lid:0,r:.72,px:0,py:0,ck:-.4,nl:.8,worry:1,sweat:1,
     m:[[3.4,1,-.7,-.7,0,0,1],[3.8,1.8,-.8,-.8,0,0,1],[4.2,2.6,-.9,-.9,0,0,1],[2.4,2.6,0,0,0,1]]},
  staunen:{bL:[-236,-235.6,1.3],bR:[-236,-235.6,1.3],eL:[2.2,1.3],eR:[2.2,1.3],lid:.12,r:.95,px:0,py:0,ck:0,nl:.3,
     m:[[1.3,1.4,0,0,0,1],[1.8,2.2,0,0,0,1],[2.4,2.8,0,0,0,1],[3,2.2,.1,.1,0,0,1]]},
  frage:{bL:[-236,-235.8,.9],bR:[-233.8,-232.6,-.2],eL:[1.7,.9],eR:[.9,.6],lid:.35,r:1.05,px:.7,py:-.25,ck:0,nl:0,tilt:-4,furrow:1,
     m:[[3,0,.1,.9,.6],[2.8,1.2,.1,.8,.6],[3.2,2,.1,.8,.5,0,1],[1.8,1.8,0,.3,.5,1]]},
  froh:{bL:[-235,-234.8,.7],bR:[-235,-234.8,.7],eL:[1.2,.15,1],eR:[1.2,.15,1],lid:.4,r:1.05,px:0,py:0,ck:1.3,nl:1,
     m:[[4,0,1.3,1.3],[4,1.6,1.2,1.2,0,0,1],[4.3,2.4,1.3,1.3,0,0,1],[3.4,2.8,1,1,0,0,1]]},
  genervt:{bL:[-233.7,-233.3,.1],bR:[-233.9,-233.1,.1],eL:[.55,.7],eR:[.6,.7],lid:.25,heavy:1,r:1.05,px:0,py:.3,ck:0,nl:0,
     m:[[3.2,0,-.4,.3,.5],[3,1,-.4,.3,.5],[3.2,1.7,-.3,.3,.4,0,1],[2.2,1.5,-.2,.2,.4]]}};
// Auge einer Seite (sg -1 links, +1 rechts): Weiß, Pupille (auf das Weiß geclippt), schweres Oberlid (hängt je nach E.lid über der Pupille,
// typischer verschlafener Zeichentrick-Blick), Lidfalte darüber, Unterlid; bl = Blinzeln
const PEYE=(sg,[T,B,sm],E,bl)=>{const x=v=>f1(sg*v),y=-231;
  if(bl)return `<path d="M${x(1.6)},${y}C${x(3)},${f1(y+1)} ${x(6.2)},${f1(y+1)} ${x(7.6)},${f1(y-.2)}" fill="none" stroke-width="1"/><path d="M${x(2.6)},${f1(y+1.6)}C${x(3.8)},${f1(y+2.1)} ${x(5.4)},${f1(y+2.1)} ${x(6.6)},${f1(y+1.6)}" fill="none" stroke="${PSKL}" stroke-width=".4"/>`;
  const w=`M${x(2)},${y}C${x(3.2)},${f1(y-T)} ${x(6)},${f1(y-T)} ${x(7.2)},${y}C${x(6)},${f1(y+B)} ${x(3.2)},${f1(y+B)} ${x(2)},${y}Z`,id='pe'+(sg<0?'l':'r'),px=f1(sg*4.5+E.px),py=f1(y-.1+E.py);
  return `<clipPath id="${id}"><path d="${w}"/></clipPath><path d="${w}" fill="#f4ead8" stroke-width=".4"/>`+
    `<circle cx="${px}" cy="${py}" r="${E.r}" fill="#3a2410" stroke="none" clip-path="url(#${id})"/>`+
    (()=>{const lh=f1(y-.2-(T+.25)*(1-(E.lid??.5))),top=f1(y-T-1.4);
      return `<path d="M${x(1.4)},${f1(y-.2)}C${x(3)},${lh} ${x(6.2)},${lh} ${x(7.8)},${y}L${x(7.8)},${top}L${x(1.4)},${top}Z" fill="${PSK}" stroke="none" clip-path="url(#${id})"/>`+
        `<path d="M${x(1.4)},${f1(y-.2)}C${x(3)},${lh} ${x(6.2)},${lh} ${x(7.8)},${y}" fill="none" stroke-width="${E.heavy?1.5:1.3}"/>`+
        `<path d="M${x(2)},${f1(y-.6)}C${x(3.2)},${f1(y-T-.9)} ${x(6)},${f1(y-T-.9)} ${x(7.4)},${f1(y-.5)}" fill="none" stroke="${PSKL}" stroke-width=".45"/>`})()+
    `<path d="M${x(2.8)},${f1(y+B+.6)}C${x(3.8)},${f1(y+B+(sm?.05:1.2))} ${x(5.4)},${f1(y+B+(sm?.05:1.2))} ${x(6.6)},${f1(y+B+.6)}" fill="none" stroke="${PSKL}" stroke-width=".4"/>`};
const PBROW=(sg,[o,i,a])=>`M${f1(sg*8.6)},${o}Q${f1(sg*5.3)},${f1((o+i)/2-a)} ${f1(sg*2)},${i}`;
// Mund: Linie (geschlossen), offene Form mit Zähnen/Zunge oder O-Form; Unterlippe und Kinn gehen mit dem Kiefer runter
const PMOUTH=([w,h,uL,uR,dx=0,O=0,th=0])=>{h*=1.2;const y=-216.6,P=(a,b)=>f1(a)+','+f1(b),Ax=dx-w,Ay=y-uL,Bx=dx+w,By=y-uR,su=(uL+uR)/2;let s='';
  if(O)s=`<ellipse cx="${f1(dx)}" cy="${f1(y+h*.3)}" rx="${f1(w)}" ry="${f1(h*.62)}" fill="#6a2416" stroke-width=".7"/>`+(h>2?`<ellipse cx="${f1(dx)}" cy="${f1(y+h*.68)}" rx="${f1(w*.55)}" ry="${f1(h*.2)}" fill="#a84a3a" stroke="none"/>`:'');
  else if(h<.3)s=`<path d="M${P(Ax,Ay)}C${P(dx-w*.35,y+.6+su*.5)} ${P(dx+w*.35,y+.6+su*.5)} ${P(Bx,By)}" fill="none" stroke-width=".8"/>`;
  else{const tY=y-.3+su*.35,bY=y+h+su*.4;
    s=`<path d="M${P(Ax,Ay)}C${P(dx-w*.4,tY)} ${P(dx+w*.4,tY)} ${P(Bx,By)}C${P(dx+w*.6,bY)} ${P(dx-w*.6,bY)} ${P(Ax,Ay)}Z" fill="#6a2416" stroke-width=".7"/>`;
    if(h>1.8)s+=`<ellipse cx="${f1(dx)}" cy="${f1(y+h*.6)}" rx="${f1(w*.45)}" ry="${f1(h*.2)}" fill="#a84a3a" stroke="none"/>`;
    if(th)s+=`<path d="M${P(dx-w*.78,y-uL*.8+.15)}C${P(dx-w*.35,tY+.15)} ${P(dx+w*.35,tY+.15)} ${P(dx+w*.78,y-uR*.8+.15)}L${P(dx+w*.62,y-uR*.6+.8)}C${P(dx+w*.3,tY+.9)} ${P(dx-w*.3,tY+.9)} ${P(dx-w*.62,y-uL*.6+.8)}Z" fill="#efe6d4" stroke="none"/>`}
  const ly=y+(O?h*.95:h*.75)+1.5,jw=h*.25;
  return s+`<path d="${O?'':`M${P(Ax-.3,Ay-.3)}L${P(Ax-.7,Ay+.4)}M${P(Bx+.3,By-.3)}L${P(Bx+.7,By+.4)}`}M${P(dx-1.6,ly)}C${P(dx-.5,ly+.3)} ${P(dx+.5,ly+.3)} ${P(dx+1.6,ly)}M${P(-1.8,-212.6+jw)}C${P(-.6,-212.1+jw)} ${P(.6,-212.1+jw)} ${P(1.8,-212.6+jw)}" fill="none" stroke="${PSKL}" stroke-width=".45"/>`};
const PHEAD={
f:(open,em,bl)=>{const E=PEMOS[em]||PEMOS.n,mo=E.m[Math.min(3,+open||0)],k=E.ck,nl=E.nl,cl=(sg,v,w)=>f1(sg*v);
  // Wangen (beim Lächeln hochgezogen) und Nasolabialfalten (spreizen sich bei breitem Mund)
  const cheek=[-1,1].map(sg=>`M${cl(sg,7.8)},${f1(-226-k)}C${cl(sg,7)},${f1(-223-k)} ${cl(sg,6-k*.3)},${f1(-221-k*.6)} ${cl(sg,5-k*.2)},${f1(-219.6-k*.4)}`).join(''),
    naso=[-1,1].map(sg=>`M${cl(sg,3.4+nl*.2)},-221C${cl(sg,4.4+nl*.8)},-219.6 ${cl(sg,4.8+nl)},-218.2 ${cl(sg,4.2+nl*.8)},${f1(-216.8+nl*.3)}`).join('');
  return `<g transform="rotate(${E.tilt||0} 0 -222)">`+`<path d="M-12,-238C-14,-247 -8,-255 0,-255.5C8,-255 14,-247 12,-238C12.6,-232 12.4,-228 11.6,-224L-11.6,-224C-12.4,-228 -12.6,-232 -12,-238Z" fill="#5a3818"/>
<path d="M-10.6,-236C-14,-237.5 -14.5,-231 -12.6,-227.5C-11.8,-226 -10.8,-226.4 -10.6,-227.4Z" fill="#d49a60"/><path d="M10.6,-236C14,-237.5 14.5,-231 12.6,-227.5C11.8,-226 10.8,-226.4 10.6,-227.4Z" fill="#b07c4c"/>
<path d="M-12.4,-234.4C-13.2,-232.4 -13,-230.2 -12.2,-228.8M12.4,-234.4C13.2,-232.4 13,-230.2 12.2,-228.8" fill="none" stroke="#8e5e34" stroke-width=".45"/>
<path d="M-10,-243C-11.5,-236 -11.5,-229 -10.5,-224L-8,-216C-6,-212.5 -3,-211 0,-211C3,-211 6,-212.5 8,-216L10.5,-224C11.5,-229 11.5,-236 10,-243C6,-250 -6,-250 -10,-243Z" fill="${PSK}"/>
<path d="M5,-248C9,-244 11,-236 10.8,-229C10.6,-225 10,-222 8,-216C6,-212.5 3,-211 1,-211C5,-214 7,-219 7.6,-226C8.2,-234 7.6,-242 5,-248Z" fill="${PSK2}" stroke="none"/>`+
  `<path d="${cheek}" fill="none" stroke="${PSKL}" stroke-width=".85"/><path d="${naso}" fill="none" stroke="${PSKL}" stroke-width=".75"/>`+
  PEYE(-1,E.eL,E,bl)+PEYE(1,E.eR,E,bl)+`<path d="M.6,-231C1.2,-227 1.6,-224 2.4,-222L.8,-221.4C.6,-224.4 .4,-227.6 .6,-231Z" fill="${PSK2}" stroke="none"/>
<path d="M-1,-232.4C-1.2,-228.4 -1.4,-225.2 -1.8,-222.6" fill="none" stroke-width=".6"/>
<path d="M-2.6,-221.6C-1.6,-220.6 1.6,-220.6 2.6,-221.6M-2.2,-221.8C-2.8,-222.4 -2.6,-223.2 -2,-223.4M2.2,-221.8C2.8,-222.4 2.6,-223.2 2,-223.4" fill="none" stroke-width=".55"/>`+PMOUTH(mo)+`<path d="M-12.4,-236C-13.6,-246 -8,-253.6 0,-253.6C8,-253.6 13.6,-246 12.4,-236C11.8,-234.4 11,-233.6 10.4,-234C10,-237.6 9,-239.6 7.6,-240.4C7,-238 5.6,-236.6 4.2,-236.8C3.6,-238.4 2.6,-239 1.6,-239.2C1,-237.2 -.6,-236.2 -2,-236.4C-2.6,-238 -3.6,-239 -4.6,-239.4C-5.4,-237.4 -7,-236.2 -8.4,-236.6C-8.8,-238.6 -9.4,-239.8 -10.2,-240.2C-10.8,-238 -11.6,-236.6 -12.4,-236Z" fill="#8a5a2a"/>
<path d="M4,-253C9.6,-251.4 13.4,-245.6 12.4,-236C11.8,-234.4 11,-233.6 10.4,-234C10,-237.6 9,-239.6 7.6,-240.4C8.8,-244.6 7.6,-249.6 4,-253Z" fill="#6e4620" stroke="none"/>
<path d="M-8,-250C-4,-252.6 2,-252.6 6,-250.6M-10.4,-245C-7,-249 -2,-250 1,-249.6M-2.6,-247C-2,-243.6 -2.6,-240.6 -3.6,-239.2M4,-248C5,-245 5,-242 4.4,-237.4" fill="none" stroke="#a87440" stroke-width=".6"/>
<path d="M-7,-246C-6.4,-243 -7,-240.6 -8.2,-238.6M8.6,-246C9.4,-243 9.4,-240 8.6,-238" fill="none" stroke="#5a3818" stroke-width=".5"/>`+
  `<path d="${PBROW(-1,E.bL)}${PBROW(1,E.bR)}" fill="none" stroke="#3c220c" stroke-width="1.6"/>`+
  (E.worry?`<path d="M-1.3,-235.8C-1,-235 -.9,-234.2 -1,-233.4M1.3,-235.8C1,-235 .9,-234.2 1,-233.4" fill="none" stroke="${PSKL}" stroke-width=".45"/>`:'')+
  (E.furrow?`<path d="M1.2,-235C1.7,-234.2 1.8,-233.4 1.5,-232.6" fill="none" stroke="${PSKL}" stroke-width=".5"/>`:'')+
  (E.sweat?'<path d="M12.6,-241.4C14,-239 14.6,-237.2 13.6,-236.2C12.6,-235.6 11.6,-236.6 12,-238.4Z" fill="#cfeaf6" stroke-width=".5"/>':'')+'</g>'},
// schräg vorne (nach rechts gedreht)
q:open=>`<path d="M-12.4,-238C-14,-247 -7,-255.6 1,-255.6C8.6,-255.4 13,-248 12,-238L11,-234L-11,-224C-12.6,-228 -13,-233 -12.4,-238Z" fill="#5a3818"/>
<path d="M-9.4,-236C-12.6,-237.4 -13.2,-231 -11.4,-227.6C-10.6,-226.2 -9.6,-226.6 -9.4,-227.6Z" fill="#d49a60"/><path d="M-11.4,-234.2C-12,-232.2 -11.8,-230.2 -11,-228.8" fill="none" stroke="#8e5e34" stroke-width=".45"/>
<path d="M-9.6,-243C-11.4,-236 -11.6,-229 -10.6,-224C-9.6,-219.6 -7,-214.6 -3.6,-212C-.8,-210.6 2.6,-210.8 5.4,-212.4C7.8,-214.2 9.4,-217.4 10.2,-221C10.8,-223 11.2,-225 11,-227C11.4,-230.4 11.4,-233.6 11,-236.6C10.6,-247 -5,-251 -9.6,-243Z" fill="${PSK}"/>
<path d="M6,-247C9.6,-243 11.4,-236 11,-229C10.8,-224 9.6,-218 6.6,-214C5,-212.6 3.4,-211.4 1.6,-211C5,-215 7.4,-221 8,-228C8.4,-236 7.8,-243 6,-247Z" fill="${PSK2}" stroke="none"/>
<path d="M-6,-226C-5.4,-223 -4.6,-221 -3.6,-219.6" fill="none" stroke="${PSKL}" stroke-width=".85"/><path d="M.4,-221.4C-.6,-219.8 -.8,-218.4 -.2,-217.2" fill="none" stroke="${PSKL}" stroke-width=".75"/>
<path d="M-5.6,-231C-4.4,-232.4 -1.6,-232.4 -.4,-231C-1.6,-230.2 -4.4,-230.2 -5.6,-231Z" fill="#f4ead8" stroke-width=".4"/><path d="M4.4,-231C5.2,-232.2 7,-232.2 7.8,-231C7,-230.3 5.2,-230.3 4.4,-231Z" fill="#f4ead8" stroke-width=".4"/>
<circle cx="-2.4" cy="-231.1" r="1.05" fill="#3a2410" stroke="none"/><circle cx="6.5" cy="-231.1" r=".95" fill="#3a2410" stroke="none"/>
<path d="M-5.6,-231C-4.4,-232.4 -1.6,-232.4 -.4,-231C-1.4,-231.8 -4.6,-231.8 -5.6,-231ZM4.4,-231C5.2,-232.2 7,-232.2 7.8,-231C7,-231.7 5,-231.7 4.4,-231Z" fill="${PSK}" stroke="none"/><path d="M-6,-231C-4.6,-231.9 -1.4,-231.9 0,-231.1M4.2,-231C5,-231.8 7,-231.8 8.2,-231.1" fill="none" stroke-width="1.3"/><path d="M-5.4,-231.9C-4,-233.3 -1.8,-233.3 -.6,-232M4.6,-231.8C5.4,-232.9 6.8,-232.9 7.6,-231.9" fill="none" stroke="${PSKL}" stroke-width=".45"/>
<path d="M-6.8,-234.4L-.4,-233.8M3.8,-233.8L8.8,-234.4" fill="none" stroke="#4a2a10" stroke-width="1.35"/>
<path d="M2.2,-232C2.8,-228.6 4.4,-225 6.2,-222.6C6.4,-221.6 5.4,-221 4.2,-221.4C3.4,-220.8 2.2,-221 1.4,-221.6" fill="none" stroke-width=".7"/><path d="M3,-231C3.8,-227.6 4.8,-225 6,-223L4.6,-222.4C3.8,-225 3.2,-228 3,-231Z" fill="${PSK2}" stroke="none"/>
${open?'<path d="M-1.8,-216.8C.4,-216.2 2.6,-216.2 4.6,-217C3.8,-214.8 2.4,-214 1.4,-214C.4,-214 -1.2,-214.8 -1.8,-216.8Z" fill="#6a2416" stroke-width=".7"/>':'<path d="M-1.8,-216.6C.4,-216 2.6,-216 4.8,-216.9" fill="none" stroke-width=".8"/>'}
<path d="M.2,-212.8C1.4,-212.3 2.6,-212.3 3.6,-212.8" fill="none" stroke="${PSKL}" stroke-width=".45"/>
<g transform="translate(1.6,0) scale(.94,1)"><path d="M-12.4,-236C-13.6,-246 -8,-253.6 0,-253.6C8,-253.6 13.6,-246 12.4,-236C11.8,-234.4 11,-233.6 10.4,-234C10,-237.6 9,-239.6 7.6,-240.4C7,-238 5.6,-236.6 4.2,-236.8C3.6,-238.4 2.6,-239 1.6,-239.2C1,-237.2 -.6,-236.2 -2,-236.4C-2.6,-238 -3.6,-239 -4.6,-239.4C-5.4,-237.4 -7,-236.2 -8.4,-236.6C-8.8,-238.6 -9.4,-239.8 -10.2,-240.2C-10.8,-238 -11.6,-236.6 -12.4,-236Z" fill="#8a5a2a"/>
<path d="M4,-253C9.6,-251.4 13.4,-245.6 12.4,-236C11.8,-234.4 11,-233.6 10.4,-234C10,-237.6 9,-239.6 7.6,-240.4C8.8,-244.6 7.6,-249.6 4,-253Z" fill="#6e4620" stroke="none"/>
<path d="M-8,-250C-4,-252.6 2,-252.6 6,-250.6M-10.4,-245C-7,-249 -2,-250 1,-249.6M4,-248C5,-245 5,-242 4.4,-237.4" fill="none" stroke="#a87440" stroke-width=".6"/></g>`,
// Profil nach rechts
s:open=>`<path d="M-6,-246C-1,-251 6,-250 9,-245C10.4,-242 10.6,-238 10.2,-235.4C10.8,-234.4 10.8,-233.4 10.2,-232.4C11.4,-229.6 12.8,-226 13.6,-223.2C13.8,-222.2 12.8,-221.6 11.2,-221.8C11,-221 10.8,-220.2 10.6,-219.4C10.9,-218.6 10.8,-217.8 10.2,-217.4C10.6,-216.6 10.4,-215.8 9.8,-215.2C9.9,-213.6 9.6,-212.2 8.4,-211.4C6,-210.6 2,-211 -1,-212.6C-3,-214 -5,-216.6 -6.4,-219C-9,-222 -11.4,-228 -11.2,-234C-11,-240 -9,-244 -6,-246Z" fill="${PSK}"/>
<path d="M-1,-212.6C2,-211 6,-210.6 8.4,-211.4C6,-213.4 2,-214 -1.6,-215.4Z" fill="${PSK2}" stroke="none"/>
<path d="M7,-231.6C7.8,-232.2 8.8,-231.9 9.2,-231.2C8.6,-230.6 7.6,-230.6 7,-231.6Z" fill="#f4ead8" stroke-width=".4"/><circle cx="8.5" cy="-231.3" r=".8" fill="#3a2410" stroke="none"/>
<path d="M7,-231.6C7.8,-232.2 8.8,-231.9 9.2,-231.2C8.6,-231.5 7.8,-231.7 7,-231.6Z" fill="${PSK}" stroke="none"/><path d="M6.8,-231.6C7.8,-232 8.8,-231.9 9.4,-231.2" fill="none" stroke-width="1.3"/><path d="M7,-232.4C7.8,-233.1 8.6,-233 9.2,-232.2" fill="none" stroke="${PSKL}" stroke-width=".45"/><path d="M5.6,-234.4L10,-234.2" fill="none" stroke="#4a2a10" stroke-width="1.35"/>
<path d="M11.2,-222C11.6,-222.6 12.2,-222.6 12.4,-222.2M6.6,-224C6.2,-221 5.6,-219 4.6,-217.6" fill="none" stroke="${PSKL}" stroke-width=".6"/>
${open?'<path d="M8.6,-217.2L10.6,-217.6L10.2,-215.6Z" fill="#6a2416" stroke-width=".6"/>':'<path d="M8.6,-216.8L10.4,-217" fill="none" stroke-width=".7"/>'}
<path d="M-12,-236C-13,-247 -6,-255 2,-255C8.6,-255 12,-250 11.6,-243C11.2,-241 10.4,-239.6 9.6,-239.6C8.6,-241 7.4,-241.6 6,-241.2C5.6,-239.6 4.6,-238.8 3.4,-238.8C2.6,-240 1.4,-240.6 0,-240.4C-.6,-237 -1.4,-235 -2.8,-234C-3,-230 -3.6,-226 -5.4,-222.6C-7.4,-219.8 -9.4,-219.6 -10.6,-221C-12,-225 -12.4,-230 -12,-236Z" fill="#8a5a2a"/>
<path d="M-12,-236C-12.4,-230 -12,-225 -10.6,-221C-9.4,-219.6 -7.4,-219.8 -5.4,-222.6C-7.6,-226 -9,-231 -9,-237C-9.4,-243 -7,-249 -3,-252.6C-8,-251 -12.6,-245 -12,-236Z" fill="#6e4620" stroke="none"/>
<path d="M-6,-252C-2,-249 2,-247 6,-246M-10,-246C-7,-241 -6,-236 -6.6,-228M-3,-250C0,-246 1,-243 1.6,-240.6" fill="none" stroke="#a87440" stroke-width=".6"/>
<path d="M-1.6,-233.6C1.6,-234.4 3,-231.4 2.4,-228.6C2,-226.6 0,-225.8 -1.4,-226.6C-2.6,-228.6 -2.8,-231.6 -1.6,-233.6Z" fill="${PSK}"/><path d="M-.4,-232C1,-231.6 1.4,-230 1,-228.6" fill="none" stroke="#8e5e34" stroke-width=".5"/>`,
// schräg hinten (nach rechts weggedreht)
bq:()=>`<path d="M-6.2,-223C-6.4,-217 -5.8,-212.6 -5,-209L5.4,-209C7.6,-211 9.4,-214.4 10.2,-218.4L10.6,-224C11.4,-229 11.4,-236 10,-243L-2,-243Z" fill="${PSK2}"/>
<path d="M10.2,-219C9.4,-215.6 7.8,-212.6 5.6,-210.6" fill="none" stroke="${PSKL}" stroke-width=".6"/>
<path d="M-12.4,-237C-13.6,-247 -7,-255.4 0,-255.4C7,-255.4 12.8,-249 12.4,-240C11.6,-238.6 10.6,-238 9.6,-238.4C9.4,-233.4 8.6,-229.4 7.4,-226C5.6,-222.4 3,-219.6 .4,-217.8L-.6,-215.4L-2.2,-217.6L-3.8,-215.6L-5.2,-218.2L-6.6,-216.6L-7.4,-219.4C-9.4,-220.8 -10.8,-222.6 -11.6,-225C-12.4,-228.6 -12.6,-232.4 -12.4,-237Z" fill="#8a5a2a"/>
<path d="M-12.4,-237C-12.6,-232.4 -12.4,-228.6 -11.6,-225C-10.8,-222.6 -9.4,-220.8 -7.4,-219.4L-6.6,-216.6L-5.2,-218.2C-8.4,-223 -9.8,-230 -9.6,-236C-9.4,-243 -6.6,-249.6 -2,-254.4C-8,-253 -13,-246 -12.4,-237Z" fill="#6e4620" stroke="none"/>
<path d="M1,-252.4C-.6,-249 -.4,-247 1.4,-246.6C3,-246.4 3.4,-248.4 2,-249M1.4,-246.6C-1.6,-242 -3.6,-234 -4.4,-222M2.4,-247C3.6,-241 3.6,-232 2,-221M-1,-251C-5,-247 -7.6,-238 -8,-226M3.6,-251.6C7,-249 8.8,-244 9,-238" fill="none" stroke="#5a3818" stroke-width=".45"/>
<path d="M8.4,-235.6C11.4,-236.8 12.4,-231.6 11,-228C10.2,-226.4 9,-226.6 8.6,-227.6Z" fill="${PSK}"/><path d="M9.6,-234C10.6,-232.4 10.6,-230.4 9.8,-229" fill="none" stroke="#8e5e34" stroke-width=".45"/>`,
// hinten: Haar bis in den Nacken mit ausgefranstem Ansatz und Wirbel am Hinterkopf; nur der schmale Nacken bleibt frei
b:()=>`<path d="M-6.4,-224C-6.6,-218 -6,-213 -5.2,-209L5.2,-209C6,-213 6.6,-218 6.4,-224Z" fill="${PSK2}"/>
<path d="M-4.6,-217C-2,-215.6 2,-215.6 4.6,-217L4.8,-213.6C2,-212.6 -2,-212.6 -4.8,-213.6Z" fill="#9a6a40" stroke="none" opacity=".55"/>
<path d="M-10.8,-235.4C-13.8,-236.6 -14.4,-231 -12.8,-227.6C-12,-226.2 -10.8,-226.2 -10.4,-227.4Z" fill="${PSK}"/><path d="M-11.6,-233.6C-12.6,-232 -12.6,-230 -11.8,-228.6" fill="none" stroke="${PSKL}" stroke-width=".5"/>
<path d="M10.8,-235.4C13.8,-236.6 14.4,-231 12.8,-227.6C12,-226.2 10.8,-226.2 10.4,-227.4Z" fill="${PSK2}"/><path d="M11.6,-233.6C12.6,-232 12.6,-230 11.8,-228.6" fill="none" stroke="${PSKL}" stroke-width=".5"/>
<path d="M-12.4,-237C-13.6,-247 -7,-255.4 0,-255.4C7,-255.4 13.6,-247 12.4,-237C12.2,-231.4 11.2,-226.6 9.4,-223.2C8.2,-221.2 7,-220.2 6,-219.4L5.2,-216.8L3.6,-218.6L2.2,-215.8L.6,-218L-.8,-215.4L-2.4,-217.8L-3.8,-215.8L-5.2,-218.6C-6.8,-219.8 -8.2,-221.2 -9.4,-223.2C-11.2,-226.6 -12.2,-231.4 -12.4,-237Z" fill="#8a5a2a"/>
<path d="M4,-254.6C10,-251.6 13.4,-245 12.4,-237C12.2,-231.4 11.2,-226.6 9.4,-223.2C8.2,-221.2 7,-220.2 6,-219.4L5.2,-216.8L3.6,-218.6C6.4,-224 8.4,-232 8,-241C7.6,-246.6 6.2,-251 4,-254.6Z" fill="#6e4620" stroke="none"/>
<path d="M-1.6,-248.6C-.2,-250 2,-249.6 2.2,-247.8C2.4,-246 .4,-245.2 -.8,-246.2C-1.8,-247 -1.2,-248.4 0,-248.2" fill="none" stroke="#5a3818" stroke-width=".55"/>
<path d="M-.8,-246.2C-4,-243 -6.4,-236 -7.4,-226M.6,-245.4C1,-240 1.2,-232 .4,-219M2.2,-247.4C5.6,-244 7.6,-236 7.6,-226M-1.6,-248.6C-6,-247.6 -9.6,-242 -10.6,-232M2,-249C7,-250 10.4,-246 11.2,-238M-3.6,-238C-4.2,-232 -4.6,-226 -3.8,-220M4.4,-238C4.8,-232 4.6,-226 3.8,-221" fill="none" stroke="#5a3818" stroke-width=".45"/>
<path d="M-5,-252C-2,-253.6 2,-253.6 5,-252.4M-9,-247C-7,-250 -4,-251.6 -1.6,-251.6" fill="none" stroke="#a87440" stroke-width=".55"/>`};
function PETV(th,open,step,em,bl,po){const r=th*Math.PI/180,c=Math.cos(r),s=Math.sin(r),X=(x,z)=>x*c+z*s,D=(x,z)=>-x*s+z*c,st=step?8:0,out=[];
  // Pose (Aufheben, Werfen): po={crouch 0..1 (in die Knie), lean Grad (Oberkörper vor), arm Grad (aktiver Arm nach vorn/oben)}; po.hand bekommt die Handposition
  const cr=po&&po.crouch||0,drop=cr*52,hy=-124+drop,lean=po&&po.lean||0,AS=s>.1?-1:1;
  // Knie per Zweigelenk-Kette (Oberschenkel 64, Unterschenkel 56): je tiefer die Hüfte, desto weiter schiebt sich das Knie nach vorn
  const kd=-8-hy,ka=(64*64-56*56+kd*kd)/(2*kd),kz=cr?Math.sqrt(Math.max(0,4096-ka*ka))-15.5:0,ky=cr?hy+ka:-60;
  // Bein + Schuh einer Seite (side -1 = links im Bild, +1 = rechts); linkes Bein vorn, wenn Schritt
  const leg=side=>{const zf=side<0?st:-st,Xh=X(10.5*side,0),Xk=X((11+cr*6)*side,zf*.5+kz),Xm=X(13.5*side,zf);
    const xf=12.5*side,Xhe=X(xf,zf-3),Xto=X(xf+2.8*side,zf+10.6),mn=Math.min(Xhe-5,Xto-6.4),mx=Math.max(Xhe+5,Xto+6.4),Xl=Xhe+(Xto-Xhe)*.62;
    let shoe=`<path d="${tube(Xhe,-5.8,5,Xto,-5.4,6.4)}" fill="#f2efe6"/><path d="M${f1(mn+1)},-2.4L${f1(mx-1)},-2.4Q${f1(mx+.6)},-2.4 ${f1(mx+.4)},0L${f1(mn-.4)},0Q${f1(mn-.6)},-2.4 ${f1(mn+1)},-2.4Z" fill="#c9c4b8"/>`;
    if(c>.25)shoe+=`<path d="M${f1(Xto-4.8)},-3.4C${f1(Xto-2)},-1.8 ${f1(Xto+2)},-1.8 ${f1(Xto+4.8)},-3.4" fill="none" stroke-width=".5"/>`;
    if(c>-.2)shoe+=`<path d="M${f1(Xl-2)},-9.4L${f1(Xl+2)},-8M${f1(Xl-2)},-8L${f1(Xl+2)},-9.4" fill="none" stroke="#8a867c" stroke-width=".5"/>`;
    else shoe+=`<path d="M${f1(Xhe)},-9.6L${f1(Xhe)},-5" fill="none" stroke-width=".5"/>`;
    // Hocke: Hosenbein als geknickte Röhre (Hüfte -> Knie -> Knöchel), Breite senkrecht zur jeweiligen Beinrichtung
    const nrm=(ax,ay,bx,by)=>{const L=Math.hypot(bx-ax,by-ay)||1;return[(by-ay)/L,-(bx-ax)/L]},n1=nrm(Xh,hy,Xk,ky),n2=nrm(Xk,ky,Xm,-8.4),nk=[(n1[0]+n2[0])/2,(n1[1]+n2[1])/2],
      Q=(x,y,n,w)=>f1(x+n[0]*w)+','+f1(y+n[1]*w);
    const pants=(cr?`<path d="M${Q(Xh,hy,n1,10.5)}L${Q(Xk,ky,nk,9)}L${Q(Xm,-8.4,n2,9.8)}L${Q(Xm,-8.4,n2,-9.8)}L${Q(Xk,ky,nk,-8.4)}L${Q(Xh,hy,n1,-10.5)}Z" fill="${PJE}"/>`
      :`<path d="M${f1(Xh-10.5)},${f1(hy)}Q${f1(Xk-5.6)},${f1(ky)} ${f1(Xm-9.8)},-8.4L${f1(Xm+9.8)},-8.4Q${f1(Xk+5.6)},${f1(ky)} ${f1(Xh+10.5)},${f1(hy)}Z" fill="${PJE}"/>`)+
      `<path d="M${f1(Xk-4)},${f1(ky-2)}C${f1(Xk-1)},${f1(ky+.5)} ${f1(Xk+2)},${f1(ky+.5)} ${f1(Xk+4)},${f1(ky-2)}M${f1(Xm-7)},-22C${f1(Xm-3)},-18 ${f1(Xm+3)},-18 ${f1(Xm+7)},-22" fill="none" stroke="${PJEL}" stroke-width=".8"/>`;
    const back=c<-.3?`<g transform="translate(0,${f1(drop)})"><path d="M${f1(Xh-6.6)},-112L${f1(Xh+6.6)},-112L${f1(Xh+6)},-97C${f1(Xh+3)},-95 ${f1(Xh-3)},-95 ${f1(Xh-6)},-97Z" fill="#a2b4d8" stroke="${PJEL}" stroke-width=".7"/><path d="M${f1(Xh-5.6)},-110.6L${f1(Xh+5.6)},-110.6M${f1(Xh-5)},-98.4C${f1(Xh-2.4)},-96.8 ${f1(Xh+2.4)},-96.8 ${f1(Xh+5)},-98.4" fill="none" stroke="#e0c890" stroke-width=".4" stroke-dasharray="1 .8"/><path d="M${f1(Xk-4)},-66C${f1(Xk-1.4)},-67.4 ${f1(Xk+1.4)},-67.4 ${f1(Xk+4)},-66M${f1(Xk-3.4)},-62.6C${f1(Xk-1)},-63.6 ${f1(Xk+1)},-63.6 ${f1(Xk+3.4)},-62.6" fill="none" stroke="${PJEL}" stroke-width=".6"/></g>`:'';
    return{d:D(10.5*side,zf*.5),svg:c>.3?pants+shoe:shoe+pants+back}};
  // Arm einer Seite – breite Haltung: Schultern zurück, Oberarm vom Rumpf weg, Ellbogen nach außen,
  // Unterarm locker hängend mit Abstand zum Körper; Ärmelende als weiche Stoffwulst, Hand mit Innenfläche zum Oberschenkel
  const arm=side=>{const sw=(side<0?-st:st)*.7,zs=-2,ze=sw*.5-5.5,zw=sw-4,Xs=X(16.5*side,zs),Xe=X(23*side,ze),Xw=X(27.5*side,zw),d=D(21*side,ze+2);
    const near=d>4,shade=!near&&Xs>0,sl=shade?PTE2:PTE,sk=shade?PSK2:PSK,o=Math.abs(c)>.3?side*Math.sign(c):1;
    const kx=Math.max(.78,Math.abs(s)),sg=Math.abs(s)>.3?Math.sign(s):-side,hand=c<0?PTHUMB(sk)+PHAND(sk):PHAND(sk)+PTHUMB(sk),P=(x,y)=>f1(x)+','+y;
    const sv=Math.abs(c)<.3,tilt=f1(-5*o*(Math.abs(c)>.3?1:0));
    // Ärmel: Schulterlinie geht weich in den Oberarm über; innen eigene Kontur, weil der Arm jetzt frei steht
    // schmale, abfallende Schulter ohne Kugel; Oberarm liegt eng am Rumpf
    const top=P(Xs-o*2.4,-199),del=P(Xs+o*5.4,-184),eo=P(Xe+o*6.2,-152+EY),ei=P(Xe-o*5.6,-152+EY),pit=P(Xs-o*4.4,-180),inn=P(Xs-o*5,-195);
    const outer=`M${top}C${P(Xs+o*1.4,-196.6)} ${P(Xs+o*3.8,-190.6)} ${del}C${P(Xs+o*5.8,-176)} ${P(Xe+o*6.6,-164+EY)} ${eo}`;
    // Seitenansicht: Arm liegt vor dem Rumpf, also auch hinten durchgehende Kontur bis zur Schulter
    const inner=sv?`M${ei}C${P(Xe-o*6,-162+EY)} ${P(Xs-o*5.6,-172)} ${P(Xs-o*5.6,-184)}C${P(Xs-o*5.6,-192)} ${P(Xs-o*3.6,-197.6)} ${top}`:`M${ei}C${P(Xe-o*6,-160+EY)} ${P(Xs-o*2.6,-170)} ${pit}`;
    const sleeve=(sv?`<path d="${outer}L${ei}C${P(Xe-o*6,-162+EY)} ${P(Xs-o*5.6,-172)} ${P(Xs-o*5.6,-184)}C${P(Xs-o*5.6,-192)} ${P(Xs-o*3.6,-197.6)} ${top}Z" fill="${sl}" stroke="none"/>`:`<path d="${outer}L${ei}C${P(Xe-o*6,-160+EY)} ${P(Xs-o*2.6,-170)} ${pit}L${inn}Z" fill="${sl}" stroke="none"/>`)+
      `<path d="${outer}" fill="none"/><path d="${inner}" fill="none" stroke-width=".85"/>`+
      `<path d="M${P(Xe-o*1.4,-163+EY)}C${P(Xe-o*.4,-160+EY)} ${P(Xe+o*1.6,-158+EY)} ${P(Xe+o*4.2,-156.6+EY)}" fill="none" stroke="#147470" stroke-width=".6"/>`;
    // Ärmelende: weiche Wulst mit organisch gewellter Unterkante
    const roll=`<path d="M${P(Xe-o*5.8,-153.4+EY)}C${P(Xe-o*7,-150+EY)} ${P(Xe-o*6.6,-146.6+EY)} ${P(Xe-o*5.2,-145.4+EY)}C${P(Xe-o*3,-144+EY)} ${P(Xe-o*.6,-145.2+EY)} ${P(Xe+o*1.6,-144.4+EY)}C${P(Xe+o*3.8,-143.8+EY)} ${P(Xe+o*6.4,-144.6+EY)} ${P(Xe+o*7,-146.6+EY)}C${P(Xe+o*7.6,-149+EY)} ${P(Xe+o*7.2,-151.6+EY)} ${P(Xe+o*6.4,-153.4+EY)}C${P(Xe+o*2,-152.2+EY)} ${P(Xe-o*2,-152.4+EY)} ${P(Xe-o*5.8,-153.4+EY)}Z" fill="${shade?PTE:'#30b4ab'}"/>`+
      `<path d="M${P(Xe-o*5,-149+EY)}C${P(Xe-o*1.4,-148.2+EY)} ${P(Xe+o*2.6,-148.6+EY)} ${P(Xe+o*6.4,-149.8+EY)}" fill="none" stroke="#147470" stroke-width=".55"/>`;
    // Unterarm: locker, leicht nach außen fallend, Muskelbauch oben außen
    const fore=`<path d="M${P(Xe-o*4.4,-147+EY)}C${P(Xe-o*5,-138+EY)} ${P(Xw-o*4.2,WY-11)} ${P(Xw-o*3,WY)}L${P(Xw+o*3,WY)}C${P(Xw+o*4,WY-13)} ${P(Xe+o*7.4,-136+EY)} ${P(Xe+o*4.8,-147+EY)}Z" fill="${sk}"/>`+
      `<path d="M${P(Xe-o*2.4,-141+EY)}C${P(Xe-o*.8,-140+EY)} ${P(Xe+o*1.2,-140+EY)} ${P(Xe+o*2.8,-141+EY)}" fill="none" stroke="${PSKL}" stroke-width=".45"/>`;
    let svg=fore+sleeve+roll+`<g transform="translate(${f1(Xw)},${WY-1}) rotate(${tilt}) scale(${f1(kx*sg*PHANDS)},${PHANDS})">${hand}</g>`,dd=d;
    // aktiver Arm in Pose: um die Schulter geschwenkt (Seitenansicht = Drehung, von vorn/hinten = Verkürzung zur Kamera hin)
    // von vorn/hinten: Armlänge so, dass er nach dem Vorbeugen des Oberkörpers (Stauchung fy) wieder richtig lang nach unten reicht
    if(po&&side===AS&&po.arm!=null){const a=po.arm*Math.PI/180,lr=lean*Math.PI/180,fy=1-(1-Math.cos(lr))*Math.abs(c),
        wx=s*Math.sin(a),wy=Math.cos(a)*(1-Math.abs(c))+Math.abs(c)*Math.cos(a-lr)/fy,Ln=Math.max(.3,Math.hypot(wx,wy)),
        M=MM(MT(Xs,-192),MM(MR(Math.atan2(-wx,wy)*180/Math.PI),MM(MS(1,Ln),MT(-Xs,192))));
      svg=`<g transform="matrix(${M.map(f1)})">${svg}</g>`;dd=D(27.5*side,zw+70*Math.sin(a-lr));AM=M;AP=[Xw,WY+16];AD=dd}
    return{d:dd,svg}};
  let AM=null,AP=null,AD=0;
  const L=[leg(-1),leg(1)].sort((a,b)=>a.d-b.d),A=[arm(-1),arm(1)],ch=Math.tan(-2.4*s*Math.PI/180),Xn=1.6*s-96*ch;
  // Oberkörper (mit Armen) kippt um die Hüfte nach vorn und sinkt beim In-die-Knie-Gehen mit ab
  const UP=MM(MT(0,drop-124),MM(MR(lean*s),MM(MS(1,1-(1-Math.cos(lean*Math.PI/180))*Math.abs(c)),MT(0,124))));
  out.push(`<g transform="scale(1,${PBODY})">`,L[0].svg,L[1].svg,'</g>',`<g transform="matrix(${UP.map(f1)})">`,`<g transform="scale(1,${PBODY})">`);A.filter(a=>a.d<-4).forEach(a=>out.push(a.svg));
  out.push(`<path d="M${f1(Xn-5)},-218L${f1(Xn-6)},-202C${f1(Xn-2)},-199 ${f1(Xn+3)},-199 ${f1(Xn+6)},-202L${f1(Xn+5)},-218Z" fill="${PSK}"/><path d="M${f1(Xn-5.4)},-212C${f1(Xn-1)},-208 ${f1(Xn+3)},-208 ${f1(Xn+5.6)},-211L${f1(Xn+5)},-218L${f1(Xn-5)},-218Z" fill="#b07c4c" stroke="none"/>`);
  // Brust raus: Oberkörper oben leicht nach vorn geneigt (nur sichtbar in Seiten-/Schrägansicht)
  out.push(`<g transform="translate(${f1(112*ch)},0) skewX(${f1(-2.4*s)})">`);
  out.push(`<g transform="scale(${f1(.9*Math.hypot(c,.5*s))},1)">${PTORSO}</g>`);
  if(c>.15)out.push(`<g transform="translate(${f1(6.4*s)},0) scale(${f1(.9*c)},1)">${PFRONT}</g>`);
  else if(c<-.15)out.push(`<g transform="translate(${f1(-6.4*s)},0) scale(${f1(.9*c)},1)">${PBACK}</g>`);
  // Seitenansicht: Kragen als schräges Band um den Hals (hinten hoch, vorne tiefer) – liegt in der Brust-Neigung, daher Basis ohne Neigungs-Versatz
  else{const k=1.6*s,f=Math.sign(s)||1,Q=(x,y)=>f1(k+f*x)+','+y;out.push(`<path d="M${Q(-6.6,-210.4)}C${Q(-3,-210.6)} ${Q(2,-208.4)} ${Q(5,-205)}L${Q(4.2,-200.6)}C${Q(1.6,-202.4)} ${Q(-2.4,-202.8)} ${Q(-6.8,-202.6)}Z" fill="${PTE3}"/><path d="M${Q(-4.4,-206.4)}C${Q(-1.4,-206.6)} ${Q(1.6,-205.4)} ${Q(3.6,-203.4)}" fill="none" stroke="#147470" stroke-width=".5"/>`)}
  out.push('</g>');
  A.filter(a=>a.d>=-4).forEach(a=>out.push(a.svg));
  const hk=th<23?'f':th<68?'q':th<113?'s':th<158?'bq':'b';
  const HN=MP(UP,[Xn,-209*PBODY]);
  out.push('</g></g>',`<g transform="translate(${f1(HN[0])},${f1(HN[1])}) rotate(${f1(lean*s*.8)}) scale(${PHEADX},${PHEADS}) translate(0,211)">${PHEAD[hk](open,em,bl)}</g>`);
  if(po){po.hand=AM?MP(UP,MP(AM,AP)):null;po.behind=AD<-4&&c<-.3}
  return `<g stroke="${INK}" stroke-width="1" stroke-linejoin="round" stroke-linecap="round">${out.join('')}</g>`}
const PET=(open,step)=>PETV(0,open,step);
// 2D-Matrizen wie SVG matrix(a,b,c,d,e,f): MM(A,B) = erst B, dann A
function MM(A,B){return[A[0]*B[0]+A[2]*B[1],A[1]*B[0]+A[3]*B[1],A[0]*B[2]+A[2]*B[3],A[1]*B[2]+A[3]*B[3],A[0]*B[4]+A[2]*B[5]+A[4],A[1]*B[4]+A[3]*B[5]+A[5]]}
const MT=(x,y)=>[1,0,0,1,x,y],MS=(x,y)=>[x,0,0,y,0,0],MR=g=>{const q=g*Math.PI/180;return[Math.cos(q),Math.sin(q),-Math.sin(q),Math.cos(q),0,0]},MP=(M,[x,y])=>[M[0]*x+M[2]*y+M[4],M[1]*x+M[3]*y+M[5]];
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
function pixSprite(inner,[x,y,w,h],rows){const H=rows?rows:h>=150?PIX_ROWS:Math.round(h*PIX_ROWS/258),W=Math.round(w*H/h),SS=3;
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
function sprite(inner,[x,y,w,h],k,rows){if(PIXELSTYLE)return pixSprite(inner,[x,y,w,h],rows);if(INKSTYLE){k*=2.5;inner=volumize(inner)}return new Promise(res=>{const cw=Math.round(w*k),ch=Math.round(h*k),im=new Image();
  im.onload=()=>{const o=document.createElement('canvas');o.width=cw;o.height=ch;const g=o.getContext('2d');g.drawImage(im,0,0,cw,ch);
    if(!INKSTYLE){const id=g.getImageData(0,0,cw,ch),d=id.data;for(let i=0;i<d.length;i+=4){if(d[i+3]<100){d[i+3]=0;continue}d[i+3]=255;for(let j=0;j<3;j++)d[i+j]=d[i+j]&0xF8}
    g.putImageData(id,0,0)}res(o.toDataURL())};
  im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${cw}" height="${ch}" viewBox="${x} ${y} ${w} ${h}">${INKSTYLE?INKF:ROUGH}<g filter="url(#r)">${inner}</g></svg>`)})}
const petimg=$('#petimg'),petG=$('#petja'),PB=[-48,-254,96,258],K=1.15;let frames=[],talking=false,ft=0;
// Petjas Ansichten: PFR[Winkel] = [Stehen, Reden, Schritt]; PVIEW wird beim Laufen aus der Richtung gewählt, beim Reden schaut er nach vorn
const PFR={};let PVIEW=0,ACT=null,PJY=0;
const NB=[-30,-100,60,104];
Promise.all([sprite(PET(0,0),PB,K),sprite(PET(1,0),PB,K),sprite(PET(0,1),PB,K),sprite(CROW,[-30,-26,64,44],K),sprite(FISHER,[-64,-142,134,224],K),sprite(OMA,[-46,-200,92,204],K),sprite(OPA,[-44,-184,88,188],K)]).then(([a,b,st,cr,fi,om,op])=>{$('#omaimg').setAttribute('href',om);$('#opaimg').setAttribute('href',op);sprite(GNOM1,[-80,-296,166,300],K).then(k=>$('#gnom1img').setAttribute('href',k));sprite(GNOM2,[-52,-232,106,236],K).then(k=>$('#gnom2img').setAttribute('href',k));sprite(WOWA,[-52,-276,104,280],K).then(u=>{WOWAIMG=new Image();WOWAIMG.src=u});sprite(DANCER,[-50,-262,104,266],K).then(k=>{$('#dancerimg').setAttribute('href',k);$('#poleimg').setAttribute('href',k);DANCERIMG.src=k;$('#dancer2img').setAttribute('href',k)});sprite(ZINA,[-60,-282,140,286],K).then(k=>$('#zinaimg').setAttribute('href',k));sprite(BJ,[-64,-250,128,256],K).then(k=>$('#bjimg').setAttribute('href',k));sprite(KATER,[-22,-58,52,62],K).then(k=>$('#katerimg').setAttribute('href',k));document.querySelectorAll('.fishimg').forEach(e=>e.setAttribute('href',fi));frames=[a,b,st];PFR[0]=frames;(async()=>{for(const th of [45,90,135,180])PFR[th]=await Promise.all([sprite(PETV(th,0,0),PB,K),sprite(PETV(th,1,0),PB,K),sprite(PETV(th,0,1),PB,K)])})();PETIMG.src=a;petimg.setAttribute('href',a);$('#crowimg').setAttribute('href',cr)});
// ===== Mimik im Spiel =====
// PEMO = aktuelle Emotion (n, schreck, staunen, frage, froh, genervt); setEmo(e,ms) setzt sie, optional nur für ms Millisekunden.
// Gesichter (Emotion × Mund 0–3 + Blinzeln) werden im Hintergrund vorgerendert und gecacht; fehlt eins noch, nimmt er das neutrale.
let PEMO='n',PEMO_T=0,blinkN=25;const FACE={};
function setEmo(e,ms){PEMO=PEMOS[e]?e:'n';PEMO_T=ms?Date.now()+ms:0}
function face(e,m,b){const k=e+m+(b?'b':'');if(!(k in FACE)){FACE[k]=null;sprite(PETV(0,m,0,e,b),PB,K).then(u=>FACE[k]=u)}return FACE[k]}
setTimeout(async function pre(){if(!frames[2])return setTimeout(pre,500);for(const e of Object.keys(PEMOS))for(const m of [0,1,2,3,'b']){const k=e+(m==='b'?'0b':m);if(!(k in FACE)){FACE[k]=null;FACE[k]=await sprite(PETV(0,m==='b'?0:m,0,e,m==='b'),PB,K)}}},1500);
setInterval(()=>{if(!frames[2])return;ft=1-ft;if(ACT)return;
  if(PEMO_T&&Date.now()>PEMO_T){PEMO='n';PEMO_T=0}
  if(mv){petimg.setAttribute('href',(PFR[PVIEW]||frames)[ft?2:0]);return}
  // seitlich/hinten stehend ohne Gefühlsregung: normale Ansicht; sonst dreht er sich zum Spieler und zeigt Mimik
  if(!talking&&PVIEW&&PEMO==='n'){petimg.setAttribute('href',(PFR[PVIEW]||frames)[0]);return}
  let m=0,b=false;
  if(talking)m=ft?1+Math.floor(Math.random()*3):(Math.random()<.35?1:0);
  else if(--blinkN<=0){b=true;blinkN=18+Math.floor(Math.random()*24)}
  petimg.setAttribute('href',face(PEMO,m,b)||face('n',m,0)||frames[m?1:0])},150);

// ================= Laufen & Szenenwechsel =================
const P={x:400,y:476,dir:1};let mv=null,cur=null,changing=false;const cache={},seen={wald:1};
function scaleAt(y){const o=S0,sN=o.k*(494-o.hz),t=Math.max(.05,(y-o.hz)/(494-o.hz));return sN*Math.pow(t,o.pp||1.15)}
function render(){const sc=scaleAt(P.y);petG.setAttribute('transform',`translate(${P.x.toFixed(1)},${(P.y+PJY).toFixed(1)}) scale(${(sc*P.dir).toFixed(3)},${sc.toFixed(3)})`)}
function walkTo(tx,ty,cb){const o=S0;tx=Math.max(o.x0,Math.min(o.x1,tx));ty=Math.max(o.ymin(tx),Math.min(o.ymax,ty));if(o.xr){const[a,b]=o.xr(ty);tx=Math.max(a,Math.min(b,tx))}mv={tx,ty,cb}}
let last=0;(function loop(t){const dt=Math.min(.05,(t-last)/1000||0);last=t;
  if(mv&&S0){const dx=mv.tx-P.x,dy=mv.ty-P.y,d=Math.hypot(dx,dy),sp=140*scaleAt(P.y)*dt+.3;
    if(d<=sp){P.x=mv.tx;P.y=mv.ty;const cb=mv.cb;mv=null;cb&&cb()}else{P.x+=dx/d*sp;P.y+=dy/d*sp;if(Math.abs(dx)>1)P.dir=dx<0?-1:1;PVIEW=Math.min(180,Math.round(Math.abs(Math.atan2(dx,dy))*4/Math.PI)*45)}render()}
  requestAnimationFrame(loop)})(0);
const fade=$('#fade');
function enter(id,pos){if(cur&&cur!==id)onLocationLeave(cur);changing=true;mv=null;fade.style.opacity=1;setTimeout(()=>{S0=SCN[id];
  if(cache[id])c.drawImage(cache[id],0,0);else{s=S0.seed;S0.paint();const k=document.createElement('canvas');k.width=W;k.height=H;k.getContext('2d').drawImage(cv,0,0);cache[id]=k}
  document.querySelectorAll('.room').forEach(r=>r.classList.toggle('on',r.id=='r-'+id));cur=id;document.getElementById('petimg').style.filter=id=='sperre'?'brightness(.6) saturate(.75)':id=='banjaV'?'brightness(.7) saturate(.8)':'';if(id=='sumpf')applySwampNymphs();if(id=='banja'){const d=$('#dancerG');d.style.display=FL.rekrut?'':'none';d.setAttribute('transform','translate(640,330) scale(.62)');d.querySelector('g').classList.add('dance')}P.x=pos[0];P.y=pos[1];render();
  fade.style.opacity=0;changing=false;if(!seen[id]){seen[id]=1;S0.intro&&setTimeout(()=>say(S0.intro),450)}else entryBark(id)},420)}
