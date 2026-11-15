// ================= Nebenquest „Die zweite Tänzerin“ (erst nach Nastjas Träne) =================
// Madame Zinaida will eine zweite Tänzerin, damit Nastja Pause machen kann. Neuer Anwerbebogen (Schön · Bühnenerfahrung · Frech · Will raus).
// Die Zweitbeste im Sumpf ist Marfa (schön, Bühne, frech) – nur raus will sie nicht ohne Krone. Die Krone ist Nastjas altes Strass-Diadem,
// und das rückt Nastja nur raus, wenn die Beziehung stimmt (37-beziehungen.js: je öfter man mit ihr redet, desto besser).
// Sobald Marfa da ist: Marfa an der Stange (gleiche Posen wie Nastja, umgefärbt, eigenes Gesicht), Nastja mit Rotweinglas am Tresen / am Bühnenrand.

// ---------- Gegenstände ----------
ITEMS.bogen2=['📝','Anwerbebogen','Madames neuer Bogen: Schön · Bühnenerfahrung · Frech · Will raus. Darunter in Lippenstift: „Die Zweitbeste reicht. Die Beste hab ich schon.“'];
ITEMS.diadem=['👑','Strass-Diadem','Nastjas altes Diadem. Strass, Blech und ein roter Glasstein. Piekt angeblich. Glitzert garantiert.'];

// ---------- Marfa als Tänzerin: aus Nastjas Teilen, umgefärbt (schwarzes Haar, smaragdgrünes Korsett, Goldschmuck, dunkle Federn) ----------
const MARFA_COL={'#e8cc89':'#2c2432','#ceb17a':'#1e1822','#ba9f67':'#4e4662','#7a2230':'#1d5a4a','#561824':'#123a30',
  '#f0d0af':'#efd5c3','#e2bc98':'#d8b8a2','#d8d4cf':'#4a2a48','#f6f3ee':'#6e4068','#f0eeea':'#dcb048'};
// Gesicht: beide Augen offen, schwere Lider mit Kajal, dunkle volle Lippen, Schönheitsfleck
const MARFA_FACE=(()=>{const mir=d=>d.replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g,(m,x,y)=>`${-x},${y}`);
  const eye=`<path d="M-10.4,-229.8C-8,-232.4 -4,-232.4 -1.8,-229.8C-4,-227.6 -8,-227.6 -10.4,-229.8Z" fill="#f6f3ee" stroke-width=".7"/>`,
    lid=`<path d="M-10.6,-230.3C-8,-232.8 -4,-232.8 -1.6,-230.3L-1.9,-229.5C-4,-231 -8,-231 -10.3,-229.5Z" fill="#c9a08c" stroke="none"/>`,
    kohl=`<path d="M-11,-230C-8,-231.6 -4,-231.6 -1.4,-229.8M-11,-230L-13.6,-231.4M-10.4,-229.4C-8,-227.6 -4,-227.6 -1.8,-229.4" fill="none" stroke-width="1.6"/>`;
  return `${eye}<circle cx="-5.6" cy="-229.4" r="1.6" fill="#3a2418" stroke="none"/>${lid}${kohl}
${mir(eye)}<circle cx="5.6" cy="-229.4" r="1.6" fill="#3a2418" stroke="none"/>${mir(lid)}${mir(kohl)}
<path d="M-10.8,-235.6C-8,-238.2 -4,-238.4 -1.8,-236.6M1.8,-236.6C4,-238.4 8,-238.2 10.8,-235.6" fill="none" stroke-width="1.3"/>
<path d="M0.6,-227C0,-223 -1,-221 0,-220.4C1,-220 2,-220.2 2.6,-220.8" fill="none" stroke-width=".8"/>
<path d="M-4.8,-215.6C-2.6,-217.4 -0.6,-216.9 0,-216.4C0.6,-216.9 2.6,-217.4 4.8,-215.6C3.4,-212.8 -3.4,-212.8 -4.8,-215.6Z" fill="#8a1424" stroke-width=".9"/>
<path d="M-4.4,-215.5C-1.5,-214.9 1.5,-214.9 4.4,-215.5" fill="none" stroke="#4a0a14" stroke-width=".7"/>
<circle cx="6.4" cy="-219.6" r=".8" fill="#2e1c10" stroke="none"/>`})();
// Nastjas Strass-Diadem auf dem Kopf
const MARFA_TIARA=`<path d="M-11,-249.5L-8,-256L-4.5,-251L0,-260L4.5,-251L8,-256L11,-249.5C4,-251.5 -4,-251.5 -11,-249.5Z" fill="#dcb048" stroke-width=".9"/><circle cx="0" cy="-255.4" r="1.5" fill="#c02848" stroke-width=".6"/>`;
function marfaSVG(svg){const P=NASTJA_PARTS;svg=svg.split(P.face).join('@@F@@').split(P.acc).join(P.acc+'@@T@@');
  for(const[a,b]of Object.entries(MARFA_COL))svg=svg.split(a).join(b);
  return svg.split('@@F@@').join(MARFA_FACE).split('@@T@@').join(MARFA_TIARA)}
// Bilder erst rendern, wenn sie gebraucht werden (Nebenquest läuft) – pixSprite wie alle Figuren: Federkontur, max. 20 Farben
const MARFA_IMG={stand:null,pole:null};let marfaBusy=false;
function marfaLoad(){if(marfaBusy||MARFA_IMG.pole||typeof pixSprite!='function')return;marfaBusy=true;
  nastjaShift().then(sh=>Promise.all([pixSprite(marfaSVG(NASTJA_NEU),NASTJA_NEU_BOX,0,{...NASTJA_PIX}),
    ...['stange1','stange2','stange3'].map(n=>pixSprite(marfaSVG(nastjaPose(NASTJA_POSEN[n])),NASTJA_STANGE_BOX,500+NASTJA_UP,{...NASTJA_PIX,floor:0,shift:sh}))]))
    .then(([st,...pole])=>{MARFA_IMG.stand=st;MARFA_IMG.pole=pole;marfaBusy=false;marfaSync(1)}).catch(e=>{marfaBusy=false;console.error('Marfa',e)})}

// ---------- Bühne & Tresen: wer tanzt, wer trinkt ----------
const NS2='http://www.w3.org/2000/svg';
function glasG(room,id,x,y,s){const r=document.getElementById('r-'+room);if(!r)return null;const g=document.createElementNS(NS2,'g');g.setAttribute('class','interactive');g.dataset.id=id;
  g.setAttribute('transform',`translate(${x},${y}) scale(${s})`);g.style.display='none';const im=document.createElementNS(NS2,'image');im.setAttribute('class','spr');g.appendChild(im);
  const before=r.querySelector('.gaeste');before?r.insertBefore(g,before):r.appendChild(g);return g}
const POLEG=document.querySelector('#r-buehne [data-id="nastja2"]');   // Stange (Nastja bzw. Marfa)
const NBAR=glasG('banja','nastjaBar',150,452,.92),NBUE=glasG('buehne','nastjaX',628,372,1);
// Rotweinglas-Takt: halten → nippen → halten → Strähne zwirbeln (nach der Uhr, kein Timer-Gewusel)
const GLSEQ=[[0,1700],[1,1000],[0,1500],[2,1300]],GLLEN=GLSEQ.reduce((a,[,m])=>a+m,0);
function glasIdx(){let t=performance.now()%GLLEN;for(const[i,m]of GLSEQ){if(t<m)return i;t-=m}return 0}
let mLast={},gLast=-1;
function marfaSync(force){const on=!!FL.marfa;if((FL.t2Q||on)&&!MARFA_IMG.pole)marfaLoad();
  const ready=on&&MARFA_IMG.pole;window.POLE_SRC=ready?MARFA_IMG.pole:null;
  // Stange im Bühnenraum: anklickbar als Marfa; Nastja steht daneben mit Glas
  if(POLEG)POLEG.dataset.id=ready?'marfa2':'nastja2';
  if(NBUE){NBUE.dataset.id=ready?'nastja2':'nastjaX';NBUE.style.display=ready?'':'none'}
  if(NBAR)NBAR.style.display=ready?'':'none';
  T.nastja2.at=ready?[540,486]:[400,486];
  // kleine Bühne im Club: Marfa statt Nastja
  const di=document.getElementById('dancerimg');if(di&&(force||mLast.d!==ready)){mLast.d=ready;setImg(di,ready?MARFA_IMG.stand:NASTJA_URL,ready?NASTJA_TG:NASTJA_G)}
  if(ready&&typeof NASTJA_GLAS!='undefined'){const i=glasIdx();if(i!==gLast||force){gLast=i;[NBAR,NBUE].forEach(g=>g&&setImg(g.firstChild,NASTJA_GLAS[i],NASTJA_TG))}}
  // Gäste kommen zurück, sobald Marfa tanzt – die Show läuft wieder
  if(ready)document.querySelectorAll('.gaeste').forEach(e=>e.style.display='')}
setInterval(()=>{if(typeof FL!='undefined')marfaSync()},120);
{const _e=enter;enter=function(id,pos){_e(id,pos);setTimeout(()=>marfaSync(1),450)}}

// ---------- Objekte ----------
T.nastjaBar={n:'Nastja',at:[225,476],fn(){T.nastja2.fn()}};
T.nastjaX={n:'Nastja',at:[540,486],fn(){}};
wrapFn('gaeste',function(orig){if(!FL.marfa)return orig();hint('gaesteM',[[['P','Volles Haus. Marfa an der Stange, die Scheine fliegen. Madame zählt schon.']],[['P','Die Jungs wedeln wieder. Diesmal für Marfa. Nastja guckt vom Rand zu und trinkt.']]])});
T.marfa2={n:'Marfa',at:[400,486],l:[
  [['marfa','*gleitet an der Stange runter* Na, Bauer? Guck nicht so. Oder guck ruhig. Aber dann zahl auch.']],
  [['marfa','Nastja trinkt, ich tanze. Sie nennt es Pause. Ich nenne es Thronfolge. Ihre Stammgäste nenne ich jetzt meine.']],
  [['marfa','Hundert Jahre Schlamm zwischen den Zehen. Jetzt hab ich Scheine im Strumpfband. Rate mal, was sich besser anfühlt.']],
  [['marfa','Wenn einer grabscht, lächle ich. Und dann lächelt er nie wieder. Willst du’s ausprobieren? *zwinkert*']],
  [['marfa','Der Choker verdeckt, was die Kaufmannsfrau mit ihren Händen gemacht hat. Da dürfen deine Hände nicht hin. Andere Stellen … verhandelbar.']],
  [['marfa','Komm näher, Süßer. Noch näher. … So. Jetzt riechst du nach mir. Viel Spaß, das Nastja zu erklären.']]]};

// ---------- Madame: Auftrag, Erinnerung, Belohnung ----------
wrapFn('madame',function(orig){
  if(!FL.traene)return orig();
  if(!FL.t2Q)return say([['Z','Petja, Süßer. Auf ein Wort. Unter uns.'],
    ['Z','Nastja ist ein Knaller. Aber ein Knaller brennt ab. Zwischen den Shows trinkt sie mir die Bar leer.'],
    ['Z','Ich brauche eine Zweite. Eine, die die Stange übernimmt, wenn Nastja das Glas übernimmt.'],
    ['P','Und wieder aus dem Sumpf?'],
    ['Z','Wo sonst kriegt man heute noch Personal, das nicht nach Lohn fragt? Hier, mein neuer Anwerbebogen. Diesmal mit Bühnenerfahrung.'],
    ['Z','Das ist kein Muss, Süßer. Nur eine Gefälligkeit. Aber ich vergesse Gefälligkeiten nicht. In keine Richtung.'],
    ['P','(Ein Nebenjob. Den Ausweg-Joint vergess ich deswegen nicht.)']],()=>{FL.t2Q=1;inv.push('bogen2');renderInv();marfaLoad()});
  if(!FL.marfa)return hint('t2Madame',[
    [['Z','Und? Schon eine gefunden? Die Beste hab ich ja. Mir reicht die Zweitbeste.']],
    [['Z','Schön, Bühnenerfahrung, frech, will raus. Alles vier, Süßer. Frag die Mädels im Sumpf aus und kreuz ehrlich an.']],
    FL.marfaKrone?[['Z','Eine Krone? Für eine Nymphe? *lacht* Frag Nastja. Die hat mehr Glitzerkram als ich Schulden.']]
      :[['Z','Hör genau hin, was sie dort unten hält. Jede hat ihren Preis. Wie oben auch.']]]);
  if(!FL.t2Done)return say([['Z','Marfa! Eine echte Königin. Sie hat dem ersten Gast das Trinkgeld aus der Brusttasche gelächelt. Ohne Hände.'],
    ['Z','Und Nastja hat endlich Pause. Die verbringt sie am Tresen. Mit meinem besten Rotwein. Na ja.'],
    ['Z','Du hast was gut bei mir, Süßer. Ich vergesse das nicht.'],
    ['P','(Bei Madame was gut haben. Ich weiß nicht, ob das ein Geschenk ist oder eine Drohung.)']],()=>{FL.t2Done=1;const k=inv.indexOf('bogen2');if(k>=0){inv.splice(k,1);renderInv()}});
  hint('t2Danach',[[['Z','Zwei Tänzerinnen, volles Haus. So muss das, Süßer.']],[['Z','Marfa tanzt, Nastja trinkt, ich zähle. Jede macht, was sie am besten kann.']],
    [['Z','Wenn du wieder mal eine Gefälligkeit loswerden willst – du weißt, wo ich wohne.']]])});

// ---------- Nastja nach der Träne: Menü mit drei Dingen, die Punkte bringen (Privattanz, Gespräch, Anstoßen) + Diadem für Marfa ----------
// Punkte (37-beziehungen.js): Gespräch +6 (bis 30), Privattanz +10 (bis 30), Anstoßen +5 (bis 20). Ab NASTJA_DIADEM gibt sie das Diadem raus.
const NA_TALK=[
  [['NA','Weißt du, was ich an dir mag, Zwiebel? Du guckst mir in die Augen. Meistens. Die anderen Kerle reden mit meinem Ausschnitt.']],
  [['NA','Im Sumpf hat mich mal ein Wassermann angebaggert. Kalte Hände, kalte Füße, kalter … na ja. Du bist wenigstens warm. Glaub ich.']],
  [['NA','Sag mal ehrlich: Hast du beim Tanz an deine Oma gedacht, damit nichts passiert?'],['P','… Vielleicht.'],['NA','*lacht* Hat nicht geklappt, Süßer. Ich saß drauf.']],
  [['NA','Wenn du mir noch einmal so auf die Lippen starrst, berechne ich das als Privattanz. Halbe Stunde. Mit Zuschlag.']],
  [['NA','Ich hab Zinaida gesagt, du bist mein Stammgast. Sie hat gefragt, was du zahlst. Ich hab gesagt: Nerven.']],
  [['NA','Weißt du, was Männer und der Sumpf gemeinsam haben? Wer zu lange drinsteckt, kommt nicht mehr raus. Bleib in Bewegung, Süßer.']],
  [['NA','Dreihundert Jahre hab ich im Schilf die Unschuld vom Lande gespielt. Dann kommst du mit Rauch im Haar und Gemüse in der Tasche. Das Leben ist ein Witz, Zwiebel. Ein schmutziger.']],
  [['NA','Wenn du hier rauskommst, aus diesem Märchen … vergiss mich nicht ganz, ja? Und wenn doch, dann vergiss wenigstens meinen Hintern nicht.']]];
const NA_TALK_M=[
  [['NA','*nippt* Pause, Zwiebel. Marfa hat die Stange, ich hab den Wein. Und ehrlich: Die Stange war nie so gut wie der Wein.']],
  [['NA','Sie tanzt nicht schlecht, die Alte. Für eine, die hundert Jahre im Schlamm lag. *trinkt* Ich lag dreihundert drin und hab trotzdem mehr Hüfte.']],
  [['NA','*schwenkt das Glas* Rotwein. Der einzige Mann hier, der mich nie enttäuscht hat. Und der Einzige, der nicht zu früh fertig ist.']],
  [['NA','Mein Diadem steht ihr. Sag ihr das nicht. Sag ihr lieber, es piekt. Überall.']]];
const NA_DRINK=[
  [['NA','*schenkt zwei Gläser ein* Auf was trinken wir, Zwiebel?'],['P','Auf dich.'],['NA','*klirr* Gute Wahl. Die einzig richtige.'],['P','*schluck* … Das ist kein Wein, das ist Lack.'],['NA','Zinaidas bester. Geht auf deine Rechnung. Kleiner Scherz. … Oder?']],
  [['NA','*klirr* Auf die Frösche! Ohne die hätte ich nie gewusst, wie wenig man von Männern erwarten kann.'],['P','Danke.'],['NA','Dich hab ich nicht gemeint. Noch nicht.']],
  [['NA','Auf ex, Zwiebel! *kippt* … Na? Wird dir warm? Mir auch. Aber das liegt nicht am Wein.']],
  [['NA','*stößt an und beugt sich vor* Weißt du, warum man sich beim Anstoßen in die Augen schaut? Damit man nicht woanders hinschaut. … Du hast verloren.']],
  [['NA','*klirr* Auf Gemüse. Und auf Männer, die wissen, wo man es hinsteckt.'],['P','In die Lüftung.'],['NA','*prustet in den Wein* Genau da, Süßer.']]];
const naPunkte=(k,cap,per)=>{FL['na_'+k]=Math.min(cap/per,(FL['na_'+k]||0)+1)};
function nastjaMenu(){const v=relOf('Nastja'),dia=FL.marfaKrone&&!FL.marfaDia&&!has('diadem');
  const im=typeof NASTJA_GLAS!='undefined'?NASTJA_GLAS[1]:NASTJA_URL;
  const o=openO(`<div class="pan menu namenu"><button class="x" title="Schließen (ESC)">${ic('close')}</button><div class="nahead"><img src="${im}" alt=""><div><h3>Nastja</h3>${relBar('Nastja')}<p class="em">${nastjaMax()?'Sie leckt sich die Lippen und lässt dich nicht aus den Augen.':'Was willst du mit ihr machen?'}</p></div></div>
    <button class="mb big" data-a="tanz">💃 Privattanz <small>+10</small></button><button class="mb big" data-a="talk">💬 Ein Gespräch führen <small>+6</small></button><button class="mb big" data-a="drink">🍷 Mit ihr anstoßen <small>+5</small></button>
    ${dia?'<button class="mb big" data-a="dia">👑 Nach einer Krone für Marfa fragen</button>':''}</div>`,'menuO');
  o.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{closeO();({tanz:naTanz,talk:naTalk,drink:naDrink,dia:naDia})[b.dataset.a]()})}
// ---- Max-Level-Modus: weniger als 10 Punkte bis zum Maximum (100) -> völlig schamlos, neue Posen beim Privattanz (tanz8, sitzmax) ----
const NASTJA_MAXSCORE=100,nastjaMax=()=>NASTJA_MAXSCORE-relOf('Nastja')<10;
const NA_TALK_MAX=[
  [['NA','Du bist fast am Ziel, Süßer … Mal sehen, ob du dir den Hauptgewinn leisten kannst.']],
  [['NA','Hände aufs Sofa, Zwiebel. … Ach, scheiß drauf. Heute dürfen die Hände hin, wo sie wollen. Fast.']],
  [['NA','Dreihundert Jahre hat mich keiner rumgekriegt. Du hast es mit einer Zwiebel fast geschafft. Fast, Süßer. Das letzte Stück musst du dir verdienen.']],
  [['NA','Zinaida sagt, ich soll dich nicht so ansehen, sonst berechnet sie dir Miete. Für den Platz in meinem Kopf. Und in meinem Bett.']],
  [['NA','Noch zwei Gläser und ich vergess, dass du nie Trinkgeld gibst. Noch drei, und ich vergess meine Hausregeln. Alle.']],
  [['NA','*fährt dir mit dem Finger über die Brust* Weißt du, was unter dem Korsett ist? Noch mehr Nastja. Und die ist heute nicht im Angebot. Sie ist ein Geschenk.']]];
const NA_DRINK_MAX=[
  [['NA','*setzt sich auf deinen Schoß und hält dir das Glas an die Lippen* Trink, Zwiebel. Aus meinem Glas. Da ist schon mein Lippenstift dran. Gratisprobe.']],
  [['NA','*klirr* Auf uns. … Guck nicht so. Ja, ich hab „uns“ gesagt. Erzähl’s Marfa, und ich ertränk dich im Wein.']],
  [['NA','Auf ex! *kippt und leckt sich die Lippen* … Wenn du wüsstest, was ich gerade denke, würdest du rot werden. Du wirst schon rot. Süß.']]];
function naTalk(){const M=nastjaMax(),L=M?NA_TALK_MAX:FL.marfa?NA_TALK.concat(NA_TALK_M):NA_TALK,k=M?'naTM':'naT',i=FL[k]||0;FL[k]=i+1;say(L[i%L.length],()=>naPunkte('talk',30,6))}
function naDrink(){const M=nastjaMax(),L=M?NA_DRINK_MAX:NA_DRINK,k=M?'naDM':'naD',i=FL[k]||0;FL[k]=i+1;say(L[i%L.length],()=>naPunkte('drink',20,5))}
function naTanz(){if(nastjaMax())return say([['P','Nastja … noch ein Privattanz?'],['NA','Für dich gibt’s heute die Version, die Zinaida verboten hat, Süßer.'],
    ['NA','Hände aufs Sofa. … Oder auch nicht. Mal sehen, wie lange du durchhältst.']],()=>{naPunkte('tanz',30,10);lapDance()});
  say([['P','Nastja … noch ein Privattanz?'],['NA','Für dich, Zwiebel? Freundschaftspreis: umsonst. Erzähl’s keinem, sonst wollen das alle.'],['NA','Hände aufs Sofa. Und diesmal ohne Gemüse.']],()=>{naPunkte('tanz',30,10);lapDance()})}
function naDia(){if(relOf('Nastja')<NASTJA_DIADEM)return hint('naDiaNein',[
    [['P','Nastja … hast du zufällig eine Krone? Für Marfa. Aus dem Sumpf.'],['NA','Marfa? Die alte Giftspritze? *lacht* Ich hab da was. Aber das kriegt nicht jeder, Zwiebel.'],
      ['NA','So gut kennen wir uns noch nicht. Tanz mit mir, trink mit mir, red mit mir. Nicht nur, wenn du was willst.']],
    [['NA','Das Diadem? Erst ein bisschen Liebe, Zwiebel. Dann vielleicht Schmuck. So läuft das bei Frauen. Und bei Banken.']]]);
  say([['P','Nastja … Marfa will nur mit Krone aus dem Sumpf.'],['NA','Typisch. Hundert Jahre Schlamm und immer noch Ansprüche wie eine Zarin.'],
    ['NA','*kramt in ihrem Ausschnitt* Hier. Mein altes Strass-Diadem. Ich trag’s eh nicht mehr, es piekt. Überall.'],
    ['NA','Aber wenn sie mir die Stange klaut, Zwiebel, dann sind wir geschieden.'],['P','Wir sind doch gar nicht …'],['NA','Eben.']],()=>{inv.push('diadem');renderInv()})}
{const nf=T.nastja2.fn;T.nastja2.fn=function(){
  // bis zur Versöhnung (naV 2) läuft die Geschichte wie bisher, danach das Menü
  if(!FL.traene||(FL.naV||0)<2)return nf.apply(this,arguments);nastjaMenu()}}
(function(){const css=document.createElement('style');css.textContent=`.namenu{max-width:440px}.namenu .nahead{display:flex;gap:14px;align-items:center;margin-bottom:10px}
.namenu .nahead img{height:120px;image-rendering:pixelated}.namenu .nahead>div{flex:1}.namenu .mb.big{display:block;width:100%;margin:6px 0;text-align:left}.namenu small{float:right;opacity:.7}
.namenu .rel{display:flex;align-items:center;gap:8px;font:12px Georgia,serif}.namenu .rel .rl{opacity:.7}.namenu .rel .rb{position:relative;flex:1;height:8px;border-radius:4px;background:rgba(0,0,0,.35);overflow:hidden}
.namenu .rel .rb i{position:absolute;top:0;bottom:0}.namenu .rel .rb u{position:absolute;left:50%;top:0;bottom:0;width:1px;background:rgba(240,220,180,.7)}`;document.head.appendChild(css)})();

// ---------- Sumpf: Nastja ist weg (Banja), Marfa auch, sobald angeworben; solange der Bogen läuft, ist Marfa immer da ----------
updateSwampNymphs=function(){const gone=i=>(NYMPHS[i].id==='nastja'&&FL.rekrut)||(NYMPHS[i].id==='marfa'&&FL.marfa);
  const p=NYMPHS.map((_,i)=>i).filter(i=>!gone(i));for(let i=p.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[p[i],p[j]]=[p[j],p[i]]}
  const mi=NYMPHS.findIndex(n=>n.id==='marfa');if(FL.t2Q&&!FL.marfa&&mi>=0&&!p.slice(0,3).includes(mi)){p.splice(p.indexOf(mi),1);p.splice(Math.random()*3|0,0,mi)}
  nextNymphs=p.slice(0,3)};
{const _e=enter;enter=function(id,pos){if(id==='sumpf'&&cur!=='sumpf'){const mi=NYMPHS.findIndex(n=>n.id==='marfa');
  if(nextNymphs.some(i=>(NYMPHS[i].id==='nastja'&&FL.rekrut)||(NYMPHS[i].id==='marfa'&&FL.marfa))||(FL.t2Q&&!FL.marfa&&!nextNymphs.includes(mi)))updateSwampNymphs()}_e(id,pos)}}

// ---------- Neuer Anwerbebogen: Gespräch mit vier Fragen ----------
const NT2={
  marfa:{s:1,b:1,v:1,r:()=>FL.marfaDia?1:0,a:[
    'Publikum? Süßer, ich hab auf Kaufmannshochzeiten getanzt, bis die Tische brachen. Und die Ehen. Der Bräutigam hat mir sein Erbe ins Mieder gesteckt. Die Braut ihren Dolch.',
    ()=>FL.marfaDia?'Mit Krone? Dann soll die Welt mal schauen, wer da aus dem Sumpf steigt. Tropfnass und unbezahlbar.':'Raus? Pff. Hier unten bin ich Königin. Da oben wär ich nur eine nasse Frau mit schönem Busen und ohne Krone.',
    'Wie mit Schlamm. Erst reinlegen, dann drübersteigen. Und wenn er Glück hat, dazwischen ein bisschen wälzen.',
    ()=>FL.marfaDia?'Nichts mehr. Die Krone sitzt. Ich warte nur noch auf deinen Bogen, Bauer.':'Mein Thron. Na gut, ein Baumstumpf. Eine Königin ohne Krone ist nur eine Frau mit Haltung und nassen Unterröcken. Bring mir eine Krone, Bauer, dann zeig ich dir, wie ich mich bedanke.']},
  ustinja:{s:0,b:1,v:1,r:1,a:['Primaballerina, 1903! Der Zar hat geklatscht. Oder gehustet. Jedenfalls hat er Geräusche gemacht.',
    'Oh ja! Applaus! Blumen! Und eine Treppe, die ich hinunterschreiten kann.','Männer hält man wie Pudel, mein Lieber. An der Leine, mit Schleifchen.','Nichts. Nur die Knie. Die sind jetzt aus Schlamm.']},
  fekla:{s:0,b:0,v:1,r:0,a:['Publikum? Die Aale gucken mir beim Blubbern zu. Zählt das?','Raus? Ich bin hier eingeweicht. Mich kriegt keiner mehr raus.','Ich setz mich drauf. Dann ist Ruhe.','Die Schwerkraft. Und die Würmer. Die sind wie Familie.']},
  glafira:{s:0,b:0,v:1,r:1,a:['Getanzt? Ich hab geschlagen. Manchmal im Takt.','Raus! Und dann such ich den, der mich ersäuft hat.','Mit der Faust. Nächste Frage.','Nichts. Nur dass ich noch nicht weiß, wen ich zuerst erwürge.']},
  alte:{s:0,b:0,v:0,r:0,a:['*klapper* Ich tanze den Knochentanz. Jede Nacht. Alleine. Ohne Zuschauer.','Raus? Wohin denn? Ich war schon überall. Tot.','Höflich, Jungchen. Ich biete ihnen Tee an. Aus Sumpfwasser.','*klapper* Der Fluch. Und meine Nase. Irgendwo hier liegt meine Nase.']},
  nastja:{s:1,b:0,v:1,r:1,a:['Ich? Ich bin doch schon angeworben, Süßer.','Raus? Bin ich längst.','Das weißt du doch.','Nichts. Ich bin im Banja.']}};
function interview2(nd){const idx=NYMPHS.indexOf(nd),tr=NT2[nd.id]||NT2.fekla,hv2=v=>typeof v=='function'?v():v;
  if(nd.id==='marfa')FL.m2met=1;
  const qs=['Hast du schon mal vor Publikum getanzt?','Willst du aus dem Sumpf raus?','Wie gehst du mit Männern um?','Was hält dich hier unten?'];
  const o=openO(`<div class="pan iv"><img src="${NIMG[idx]}" class="por"><h3>${nd.n}</h3></div><div class="pan ivq"><h3>Gespräch</h3>${qs.map((q,i)=>`<button class="qb" data-q="${i}">${q}</button>`).join('')}
  ${nd.id==='marfa'&&has('diadem')?`<button class="qb dia">${IMG('diadem','ico sm')} Das Diadem anbieten</button>`:''}<p class="ans em">Frag sie was.</p>
  <h3>Anwerbebogen</h3><label><input type="checkbox" data-k="s"> Schön</label><label><input type="checkbox" data-k="b"> Bühnenerfahrung</label><label><input type="checkbox" data-k="v"> Frech</label><label><input type="checkbox" data-k="r"> Will raus</label>
  <div class="row"><button class="go">Anwerben</button><button class="bk">Zurück</button></div><p class="res"></p></div><div class="hint">[ESC] schließen</div>`,'two menu2');
  const ans=o.querySelector('.ans');
  o.querySelectorAll('.qb[data-q]').forEach(b=>b.onclick=()=>{const q=+b.dataset.q;ans.textContent='„'+hv2(tr.a[q])+'“';if(nd.id==='marfa'&&q==3&&!FL.marfaDia)FL.marfaKrone=1});
  const dia=o.querySelector('.dia');if(dia)dia.onclick=()=>{const k=inv.indexOf('diadem');if(k>=0){inv.splice(k,1);renderInv()}FL.marfaDia=1;FL.marfaKrone=1;dia.remove();
    ans.textContent='„*setzt das Diadem auf* Strass. Billig. Wunderschön. Wie ich früher. … Na gut, Bauer. Für eine Krone steig ich aus dem Schlamm. Du darfst mir dabei die Hand geben. Nur die Hand.“'};
  o.querySelector('.bk').onclick=closeO;
  o.querySelector('.go').onclick=()=>{const ck={};o.querySelectorAll('input').forEach(i=>ck[i.dataset.k]=i.checked?1:0);const r=o.querySelector('.res'),want={s:tr.s,b:tr.b,v:tr.v,r:hv2(tr.r)};
    if(['s','b','v','r'].some(k=>ck[k]!=want[k])){r.textContent='Hm. Ich glaube, ich hab sie falsch eingeschätzt. Der Bogen stimmt nicht.';return}
    if(!(want.s&&want.b&&want.v&&want.r)){r.textContent=nd.id==='marfa'?'Der Bogen stimmt. Marfa passt fast perfekt – nur raus will sie nicht. Was hält sie hier unten?':'Der Bogen stimmt. Aber Madame will alle vier Kreuze.';return}
    closeO();FL.marfa=1;updateSwampNymphs();
    say([['P','Marfa. Madame Zinaida sucht eine Königin für ihre Bühne. Mit Spiegel, Scheinwerfer und Männern, die zahlen.'],
      ['marfa','Männer, die zahlen? So hab ich sie am liebsten. Gleich nach denen, die schweigen. Und die, die beides können, heirate ich. Kurz.'],
      ['marfa','Ich komme. Sag deiner Madame: Die Königin des Sumpfs gibt sich die Ehre.'],['P','(Die Zweitbeste. Madame wird zufrieden sein.)']])}}
{const _use=use;use=function(id){const o=T[id];if(/^slot\d$/.test(id)&&o&&FL.t2Q&&!FL.marfa&&has('bogen2'))return interview2(o);return _use(id)}}

// ---------- Auftrag (als Nebenquest markiert) ----------
{const _q=quests;quests=function(){const Q=_q();if(!FL.t2Q)return Q;
  Q.push({t:'Die zweite Tänzerin',neben:1,d:'Madame Zinaida will eine zweite Tänzerin, damit Nastja Pause machen kann. Kein Muss – aber Madame vergisst keine Gefälligkeit.',v:1,ok:FL.t2Done,s:[
    {t:'Die Zweitbeste im Sumpf finden',v:1,ok:FL.marfaKrone||FL.marfa,h:'Mit dem Anwerbebogen in den Sumpf, die Nymphen anklicken, ausfragen und den Bogen ehrlich ausfüllen. Gesucht: schön, Bühnenerfahrung, frech, will raus.'},
    {t:'Eine Krone für Marfa',v:FL.marfaKrone,ok:FL.marfaDia||FL.marfa,h:has('diadem')?'Mit dem Diadem in den Sumpf zu Marfa und es ihr im Gespräch anbieten.':'Nastja hat so ein Glitzerding. Aber das gibt sie nur jemandem, den sie richtig mag: öfter mit ihr reden (Beziehung im Notizbuch, Taste C).'},
    {t:'Marfa anwerben',v:FL.marfaDia,ok:FL.marfa,h:'Im Sumpf Marfa anklicken und den Bogen ausfüllen. Mit Krone will sie raus.'},
    {t:'Madame Bescheid sagen',v:FL.marfa,ok:FL.t2Done,h:'Zurück ins Banja zu Madame Zinaida.'}]});
  return Q}}
Object.assign(HINT,{
  'Die Zweitbeste im Sumpf finden':{g:'Die Beste hat Madame schon. Wer im Sumpf kommt gleich danach?',w:'Im Sumpf hinter der Birkensperre.',o:['sumpf']},
  'Eine Krone für Marfa':{g:'Eine Krone. Wer hier hat Glitzerkram und mag mich wenigstens ein bisschen?',w:'Im Banja. Nastja steht an der Stange.',o:['banja']},
  'Marfa anwerben':{g:'Jetzt hat sie, was sie wollte. Jetzt will sie bestimmt.',w:'Im Sumpf.',o:['sumpf']},
  'Madame Bescheid sagen':{g:'Madame wartet auf gute Nachrichten.',w:'Im Banja.',o:['banja']}});
// Nebenquests im Auftragsbaum kennzeichnen
qTree=function(list,lv,NEXT){return list.filter(q=>q.v).map(q=>`<div class="q l${lv} ${q.ok?'done':''} ${q===NEXT?'next':''}"><span>${ic(q.ok?'check':q===NEXT?'next':'todo','q')} ${q.t}${q.neben&&lv==0?' <b class="neben">Nebenquest</b>':''}</span>${q.d&&lv==0?`<i>${q.d}</i>`:''}${q!==NEXT&&qNote(q)?`<em class="qh">${ic('auftrag','sm')} ${qNote(q)}</em>`:''}${q.s&&!q.ok?qTree(q.s,lv+1,NEXT):''}</div>`).join('')};

// ---------- Notizbuch: Steckbrief Marfa ----------
FIGUREN.push({n:'Marfa',w:'Nymphe, jetzt zweite Tänzerin im Banja',s:[
  [()=>FL.m2met||FL.marfa,'War mal die teuerste Frau im ganzen Gouvernement. Lächelt, wenn sie droht. Droht, wenn sie lächelt.'],
  [()=>FL.marfaKrone||FL.marfa,'Geht nur mit Krone aus dem Sumpf. Eine Königin ohne Krone ist für sie bloß eine Frau mit Haltung.'],
  [()=>FL.marfa,'Tanzt jetzt im Banja an der Stange, mit Nastjas altem Strass-Diadem. Der Choker verdeckt die Würgemale. Ich frag nicht.']]});

(function(){const css=document.createElement('style');css.textContent=`.q .neben{font:600 10px/1 Georgia,serif;letter-spacing:.06em;text-transform:uppercase;color:#1a1008;background:#c8a04a;border-radius:3px;padding:2px 5px;margin-left:6px;vertical-align:middle}`;document.head.appendChild(css)})();
