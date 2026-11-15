// ================= Notizbuch: Reiter „Figuren“ =================
// Jede Figur hat einen Steckbrief in Petjas trockenem Ton. Stufe 0 = erster Eindruck (sobald man sie getroffen hat),
// Stufe 1 = kleiner Hintergrund (nach dem ersten richtigen Gespräch / Tausch), Stufe 2 = der Kern (nach der Quest / einem tiefen Gespräch).
// Gesperrte Stufen stehen als „…“ da, damit man sieht, dass da noch was kommt. Neue Einträge melden sich mit einem Hinweis.
UIC.figuren='<circle cx="12" cy="11" r="4.5"/><path d="M4,26C4,20 8,17 12,17C16,17 20,20 20,26"/><circle cx="22.5" cy="12.5" r="3.5"/><path d="M20,18.5C24.5,17.5 28,20.5 28,25"/>';
BOOKT.push(['figuren','Figuren','C']);
const FIGUREN=[
  {n:'Wowa',w:'Kumpel aus der echten Welt',s:[
    [()=>1,'Mein Kumpel. Couch, Röhrenfernseher, immer was zu rauchen da. Hat mir den Joint gegeben, mit dem das alles anfing.'],
    [()=>FL.echo1,'Manchmal höre ich ihn. Von ganz weit weg, durch die Wand zwischen den Welten. Er sucht mich. Glaube ich.'],
    [()=>FL.echo3,'Er hat „Bruder“ gerufen. Wowa sagt nie „Bruder“. Vielleicht merkt er doch, wenn ich weg bin.']]},
  {n:'Baba Jaga',w:'Hexe im Birkenwald',s:[
    [()=>FL.bjNo||FL.drin,'Wohnt in einer Hütte auf Hühnerbeinen. Die Tür ist Deko. Gäste kommen durchs Fenster, oder gar nicht.'],
    [()=>FL.bjInfo,'Kennt die blauen Pilze aus Wowas Joint. Kennt sie sogar sehr gut. Hat mir ein Gegengift versprochen, wenn ich laufe.'],
    [()=>FL.tischRede,'Die blauen Pilze sind ihr Geschäft: Gnome züchten, Nymphen trocknen, das Dorf schaut weg. Und sie ist einsam. Hätte nie gedacht, dass ich das über eine Hexe schreibe.']]},
  {n:'Opa Grischa',w:'Alter Mann vor seiner Brandruine',s:[
    [()=>FL.leiterQ,'Steht vor dem, was von seinem Haus übrig ist. Will Selbstgebrannten, gibt dafür eine Leiter. Fairer Kurs.'],
    [()=>FL.leiter||FL.sawQ,'War Soldat. Sowjetarmee, Uniform, Orden, das ganze Programm. Dann fiel die Sowjetunion, und mit ihr Sold, Rente und Respekt. Er stand plötzlich in einem Land, das es nicht mehr gab.'],
    [()=>FL.haus,'Dann brannte auch noch das Haus ab. Nur der Ofen blieb stehen, und daneben hat er geschlafen, jahrelang. Jetzt hat er wieder Wände. Aus Birken, die ich gesägt habe. Er hat sich nicht bedankt. Er hat genickt. Das ist bei ihm mehr.']]},
  {n:'Oma Dusja',w:'Dorfstraße, immer am Fenster',s:[
    [()=>FL.gq,'Weiß alles über jeden im Dorf. Erzählt es auch. Zahnlos, seit der Kater des Popen ihr Gebiss geklaut hat.'],
    [()=>FL.kater||has('gebiss'),'Hat Birkenteer gegen Rheuma, Läuse und Männer. Wendet alle drei Anwendungen regelmäßig an.'],
    [()=>FL.teer||FL.deal,'Trocknet blaue „Kräuter“ an ihrem Fenster. Sagt, die sind für den Tee. Ich trinke bei ihr keinen Tee mehr.']]},
  {n:'Fischer Kusmitsch',w:'Hütte am See',s:[
    [()=>FL.schnapsQ,'Brennt Schnaps, angelt, flucht. Rückt nichts raus, schon gar nicht freiwillig.'],
    [()=>FL.ablenk||FL.angelQ,'Jagt seit Jahren denselben Wels. Gibt dem Wels die Schuld an allem: verlorene Netze, geklauter Schnaps, kaputte Ehe.'],
    [()=>FL.welsSeen,'Hat ihn endlich. Der Wels hängt an seiner Hütte, mit Schwimmhäuten zwischen den Fingern und einer goldenen Uhr am Handgelenk. Kusmitsch findet das normal. Ich hab nichts gesehen.']]},
  {n:'Madame Zinaida',w:'Chefin des Banja',s:[
    [()=>FL.clubQ,'Führt das Banja. Dampf, Tanz, Wodka. Sucht neue Mädchen und nennt jeden „Süßer“, der zahlt.'],
    [()=>FL.rekrut,'Hat eine Liste: schön, tanzt gern, frech, will raus. Ich hab ihr eine Nymphe aus dem Sumpf gebracht. Sie hat nicht mal gefragt, wie.'],
    [()=>FL.gutschein&&(FL.lounge||FL.traene),'Im Hinterhof stapeln sich Kisten mit blauem Staub und einem Pilzstempel. Zinaida verkauft nicht nur Wodka. Ich frag nicht nach. Ich will den Gutschein behalten.']]},
  {n:'Nastja',w:'Nymphe, jetzt Tänzerin im Banja',s:[
    [()=>FL.rekrut||seen.sumpf&&FL.clubQ,'Kam aus dem Sumpf, tanzt jetzt an der Stange. Zwinkert, als wüsste sie mehr als du. Tut sie auch.'],
    [()=>FL.lounge||FL.traene,'Dreihundert Jahre im Sumpf. Hat Kaufleute, Soldaten und einen Popen kommen und gehen sehen. Hält das Banja für eine Beförderung.'],
    [()=>(FL.naV||0)>=2,'Hat seit dreihundert Jahren nichts gefühlt. Dann kam eine Gnomzwiebel und ich. Sie hat geweint und mich dafür rausgeschmissen. Ich glaube, das war ein Danke.']]},
  {n:'Grobnik',w:'Gnom, Wächter der Höhle',s:[
    [()=>FL.mehlQ,'Steht vor der Höhle und lässt keinen rein. Will „Mehl“. Sagt „Geschäftsgeheimnis“ öfter, als gut für ihn ist.'],
    [()=>FL.stollen,'Hat am „Mehl“ geschnüffelt wie ein Zollhund im Urlaub. Gab mir dafür seine Laterne. Leihweise.'],
    [()=>FL.latHoch&&!has('laterne'),'Zählt jeden Abend die Laternen. Danke zählt er nicht. Das Gnomreich ist eine Buchhaltung mit Bärten.']]},
  {n:'Der Müller',w:'Alte Mühle',s:[
    [()=>FL.mullerQ,'Stimme aus der Mühle. Will eine Braut. Mahlt angeblich Mehl.'],
    [()=>FL.mehl,'Hat mir drei Säcke „Mehl“ gegeben. Für einen Gutschein auf einen Privattanz. Das Mehl riecht nicht nach Mehl.'],
    [()=>FL.mehl&&FL.bjInfo&&FL.stollen,'Auf seinen Säcken ist ein blauer Pilzstempel. Die Mühle ist keine Mühle. Sie ist ein Lager.']]},
  {n:'Vater Ignati',w:'Pope der Holzkirche',s:[
    [()=>FL.h_popeSchlaf||FL.popeBack,'Schläft im Heu hinter dem Banja. Seit 1993. An seiner Kirche hängt ein Zettel: „Pope in der Stadt“.'],
    [()=>FL.popeBack,'Wollte nach dem Bier nur kurz die Augen zumachen. Dazu ein blaues Pilzchen, „zum Entspannen“, von der Alten im Wald. Dreißig Jahre Entspannung.'],
    [()=>FL.weih,'Streckt sein Weihwasser mit Wodka. „Zur Haltbarkeit.“ Der Kater sitzt jetzt auf dem Altar und ist länger in der Gemeinde als er.']]},
  {n:'Schmied Fjodor',w:'Schmiedehof',s:[
    [()=>FL.schuld||seen.schmiede,'Groß, rußig, ehrlich. Der Einzige im Dorf, der für Arbeit Geld will und nicht für Gefallen.'],
    [()=>FL.schuld,'Hat Opas Säge geschärft. Jetzt schulde ich ihm was. Bei ihm ist das kein Gefühl, sondern ein Eintrag im Kopf.'],
    [()=>FL.glut,'Seine Esse brannte seit 1993 ungeweiht, weil der Pope „in der Stadt“ war. Jetzt glüht sie geweiht und riecht leicht nach Wodka. Er hat zum ersten Mal gelächelt.']]},
  {n:'Die Krähe',w:'Birkenwald, auf dem Ast',s:[
    [()=>FL.kraehe||seen.wald,'Sitzt auf dem besten Ast im Wald und verteidigt ihn wie eine Datscha.'],
    [()=>FL.kraehe,'Hat einen Apfel abgekriegt. Von mir. Musste sein.'],
    [()=>FL.petzt,'Hat mich bei Baba Jaga verpfiffen. Krähen sind die Stasi des Waldes.']]}];
function figurenHTML(){const known=FIGUREN.filter(f=>f.s[0][0]());if(!known.length)return'<p class="empty">Noch niemanden getroffen. Gut so, eigentlich.</p>';
  return`<div class="figs">${known.map(f=>{const lv=f.s.filter(([c])=>c()).length;
    return`<div class="fig"><h4>${f.n} <small>${f.w}</small><span class="lvl">${'●'.repeat(lv)}${'○'.repeat(f.s.length-lv)}</span></h4>${f.s.map(([c,t])=>c()?`<p>${t}</p>`:'<p class="lock">… Da steckt noch mehr dahinter.</p>').join('')}</div>`}).join('')}</div>`}
// in openBook einhängen: Reiter „figuren“ füllen
{const ob=openBook;openBook=function(tab){const r=ob.apply(this,arguments);if(tab==='figuren'){const bb=ovl&&ovl.querySelector('.bbody');if(bb)bb.innerHTML=figurenHTML()}return r}}
// Taste C
addEventListener('keydown',e=>{if($('#fg')||$('#cut')||e.repeat||/input|textarea/i.test((e.target||{}).tagName||''))return;if(e.key.toLowerCase()==='c'&&!$('#start')&&!(ovl&&ovl.classList.contains('tutO')))toggleBook('figuren')});
// Neuer Steckbrief-Absatz -> kurzer Hinweis
{let last=null;const count=()=>FIGUREN.reduce((n,f)=>n+(f.s[0][0]()?f.s.filter(([c])=>c()).length:0),0);
  setInterval(()=>{if(typeof FL==='undefined'||$('#start'))return;const n=count();if(last!==null&&n>last&&typeof toast=='function')toast('Notizbuch: Neues über eine Figur (Taste C)',0,'tipp');last=n},1500)}
