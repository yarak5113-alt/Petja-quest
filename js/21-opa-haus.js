// ================= Opas Säge & Opas Haus (Masterplan: „Kein Frust beim Haus“) =================
// Erst nach dem Banja (Madames Liste) muss Petja in den Sumpf. An der Birkensperre denkt er an Opa Grischa.
// Opa leiht ihm die rostige Säge aus dem Ofen der Ruine – aber die Birken am Sumpfweg sind SEIN Bauholz:
// Erst wird das Haus vorbereitet (Teer von Oma Dusja → Gebiss → Kater → Fisch → Angel), dann darf gesägt werden.
// Sägt Petja vorher, pfeift Opa ihn zurück („Ey, wo willst du hin?!“). Schmied Fjodor schärft die Säge auf Pump –
// diese Schuld löst Petja in Akt 3 mit dem Weihwasser ein. Das Haus besteht aus den Birkenstämmen, kein Brett.

// ----- Gegenstände: rostige Säge (Opas Säge umgefärbt) -----
(function(){
  const enc=s=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s),dec=u=>decodeURIComponent(u.slice(u.indexOf(',')+1));
  const rust={'#e8ecf0':'#d49a6a','#9aa4ae':'#a0623a','#5e6874':'#5a3018','#6a7480':'#7a4224'};
  let sv=dec(ICONS.saege);for(const[a,b]of Object.entries(rust))sv=sv.split(a).join(b);
  ICONS.rsaege=enc(sv.replace('</svg>','<g fill="#6a2c0c" opacity=".75"><circle cx="22" cy="31" r="2.4"/><circle cx="33" cy="26" r="1.8"/><circle cx="40" cy="25" r="2.6"/><circle cx="27" cy="36" r="1.4"/></g></svg>'));
  Object.assign(ITEMS,{rsaege:['','Rostige Säge','Opas Säge. Hat den Brand überlebt. Schneiden tut sie aber nur noch Grimassen.'],
    saege:['','Säge','Opas Säge, vom Schmied geschärft. Ausgeliehen. Gegen ein ganzes Haus.'],
    seil:['','Wäscheleine','Tante Galjas alte Wäscheleine. Riecht nach Kernseife. Hält bestimmt einen Fisch.']})})();
// das Brett gibt es nicht mehr – das Haus wird aus Birkenstämmen gebaut
{const b=document.getElementById('brett');if(b)b.remove();const n=document.getElementById('altnetzG');if(n)n.remove()}

// ----- Birkensperre: Opas Bauholz -----
const opaRuf=()=>{if(!FL.opaRuf){FL.opaRuf=1;return say([['P','So. Dann wollen wir mal. *setzt die Säge an*'],['G','*ganz weit hinten* *PFIIIIFF* EEEY! WO WILLST DU HIN?!'],['P','…Opa? Das Dorf ist auf der anderen Seite vom Wald!'],
    ['G','Ich hör meine Säge! Die quietscht, wenn sie an fremdes Holz geht!'],['G','Das ist MEIN Bauholz! Erst bringst du mir den Teer, dann wird gesägt. Abgemacht ist abgemacht!'],['P','(Wie macht der das?)']])}
  hint('opaRuf',[[['G','*aus der Ferne* JUNGE! FINGER WEG VON MEINEN BIRKEN!']],[['G','*aus der Ferne* Ich seh dich! …Na gut, ich seh dich nicht. Aber ich WEISS es!']],
    [['P','(Keine Chance. Erst Opa den Teer bringen. Teer hat Oma Dusja auf der Dorfstraße.)']]])};
T.sHolz.fn=function(){
  if(FL.cut)return say([['P','Hier lagen mal Opas Birken. Jetzt wohnt er drin.']]);
  if(has('rsaege'))return hint('rostsaege',[[['P','*kratz* ... *kratz* ... *quietsch*'],['P','Die Säge rutscht nur drüber. Die ist so rostig, die schneidet nicht mal Butter.']],
    [['P','Mit dem Rostding wird das nix. Die muss jemand schärfen.'],['P','(Wer schärft hier Werkzeug? Jemand mit Feuer und Amboss …)']],
    [['P','Ein Schmied! Auf der Dorfstraße zeigt doch ein Schild zum Schmiedehof.']]]);
  if(has('saege')&&!FL.deal)return opaRuf();
  if(has('saege'))return sawAndBuild();
  if(!FL.clubQ)return say([['P','Umgestürzte Birken. Tonnenweise. Da komm ich nicht durch.'],['P','Muss ich aber auch gerade nicht. Glaub ich.']]);
  this.i=(this.i||0)+1;say(this.i%2?[['P','Da komm ich weder drüber noch drunter. Ich brauch eine Säge.'],['P','Mhh … vielleicht hat Opa eine Säge. Der hat sein Haus ja mal selbst gebaut.']]
    :[['P','Opa Grischa im Dorf. Wer sein Haus selbst abbrennt, hat es vorher auch selbst gebaut. Der hat bestimmt Werkzeug.']])};
// Sägen → Stämme ins Dorf → Haus bauen → zurück an die freie Sperre
function sawAndBuild(){say([['P','So. Mit Opas Segen. *säg* ... *säg* ... *keuch* ... *säg*'],['P','Geschafft. Der Weg zum Sumpf ist frei.'],['P','Und jetzt … die Stämme zu Opa. Alle. Mein Rücken weiß es schon.']],async()=>{
  fade.style.opacity=1;await new Promise(r=>setTimeout(r,900));
  FL.cut=1;FL.haus=1;delete cache.sperre;delete cache.dorf;T.sHolz.n='Holzreste';const h=$('[data-id=sHolz]');if(h)h.style.display='none';renderInv();
  say([['P','*schlepp* … *schlepp* … *schlepp* …'],['G','Na endlich! Stamm auf Stamm, Moos dazwischen, Teer aufs Dach. Wie früher!'],['P','*hämmer* … *hämmer* … *Daumen* … AU.'],['G','Schiefer! Nein, der andere schief!'],['P','*Zwei Tage später*']],()=>{
    enter('dorf',[420,480]);setTimeout(()=>say([['G','Na bitte. Ein Haus! Aus echten Birkenstämmen! Und der Ofen war ja schon da.'],['P','Mein Rücken ist jetzt auch abgebrannt.'],
      ['G','Die Säge behältst du. Hast sie dir verdient. Und jetzt ab in deinen Sumpf, der Weg ist ja frei.']]),1100)})})}

// ----- Opa Grischa: Säge gegen Hausbau -----
wrapFn('opa',function(orig){
  if(has('schnaps')||(FL.bjNo&&!FL.leiter))return orig();   // die Leiter-Sache geht vor
  if(FL.sawQ&&!FL.deal&&has('teer'))return say([['P','Opa! Birkenteer. Von der Dusja. Gegen Rheuma, Läuse und Männer.'],['G','Ha! Teer! Jetzt verfault mir das Holz nicht, bevor’s ein Haus wird.'],
    ['G','*schmiert die Ofenecke ein* So. Der Platz ist vorbereitet. Jetzt darfst du meine Birken sägen.'],['G','Säg sie klein und schlepp die Stämme her. Dann bauen wir. Und der Weg zu deinem Sumpf ist auch gleich frei.']],
    ()=>{FL.deal=1;inv.splice(inv.indexOf('teer'),1);renderInv()});
  if(!FL.sawQ&&FL.clubQ&&seen.sperre&&!FL.cut)return say([['P','Opa, haben Sie zufällig eine Säge? Am Sumpfweg liegen Birken quer.'],
    ['G','Eine Säge? Hab ich. Lag im Ofen. Der Ofen hat das Feuer überlebt, die Säge auch. Halbwegs.'],['G','*kramt in der Asche* Da. Ein bisschen rostig. Rost ist nur Patina, sagt mein Schwager.'],
    ['G','Aber Moment. Die Birken am Sumpfweg? Die hat der Sturm MIR hingelegt. Das ist mein Bauholz für ein neues Haus!'],
    ['P','Und wenn ich die für Sie säge? Dann ist mein Weg frei und Sie haben Ihr Holz.'],['G','Abgemacht! Aber erst wird hier alles vorbereitet. Ohne Teer verfault das Holz, bevor’s ein Haus wird.'],
    ['G','Teer hat die Dusja auf der Dorfstraße. Erst den Teer, DANN die Birken. Und wehe, du sägst vorher. Ich hör meine Säge. Auf zwei Kilometer.'],['P','*bekommt eine rostige Säge*']],
    ()=>{FL.sawQ=1;FL.auftrag=1;inv.push('rsaege');renderInv()});
  if(FL.sawQ&&!FL.haus){
    if(has('rsaege'))return say([['P','Opa, die Säge schneidet nicht. Die ist komplett verrostet.'],['G','Patina, Junge! …Na gut. Rost.'],['G','Geh zum Fjodor in den Schmiedehof. Die Dorfstraße runter. Der schleift alles. Sogar Schwiegermütter.']]);
    if(!FL.deal)return hint('opaTeer',[[['G','Erst den Teer, dann die Birken. Ohne Teer kein Haus.']],[['G','Die Dusja hat Birkenteer. Rückt aber nix raus, ohne vorher zu jammern. Hör ihr halt zu.']],
      [['G','Die Dusja jammert über ihr Gebiss. Seit Wochen. Hilf ihr, dann kriegst du den Teer.']]]);
    return say([['G','Der Teer ist drauf. Jetzt die Birken! Säg sie klein und bring mir die Stämme.']])}
  if(FL.haus)return hint('opaNeu',[[['G','Ein Haus! Mit Ofen! Der Ofen war ja schon da, aber jetzt hat er wieder was zu tun.']],
    [['G','Diesmal pass ich auf. Kein Samowar mehr im Bett.'],['P','Und der Selbstgebrannte?'],['G','Der bleibt. Man muss ja nicht übertreiben.']],
    [['G','Wenn du mal ein Dach überm Kopf brauchst, Junge: Klopf an. Aber nicht zu fest. Ist frisch geteert.']]]);
  return orig()});
wrapFn('ruine',function(orig){if(FL.haus)return say([['P','Opas neues Haus. Krumm, aber es steht. Und ich hab’s gebaut. Halb. Ein Viertel.'],['G','Und es riecht nach Teer! Wie ein richtiges Zuhause.']]);
  if(FL.sawQ)return say([['P','Hier soll also das neue Haus hin. Der Ofen steht schon. Der Rest liegt am Sumpfweg.']]);return orig()});
if(T.ruine)Object.defineProperty(T.ruine,'n',{get:()=>FL.haus?'Opas neues Haus':'Opas abgebranntes Haus',configurable:true});

// ----- Wäscheleine bei Tante Galja: die Schnur für die Angel -----
wrapFn('waesche',function(orig){
  if(FL.angelQ&&!FL.leine&&!has('seil')&&!has('angel')&&!FL.fisch&&!FL.kater)return say([['P','Eine Wäscheleine. Lang, dünn, reißfest. Perfekte Angelschnur.'],['P','*knotet die Leine ab* … Die Unterhose lass ich hängen. Aus Respekt.'],
    ['O','*von drüben* Nimm ruhig, Junge! Die Galja hat mir meine Leine auch nie zurückgegeben!']],()=>{FL.leine=1;inv.push('seil');renderInv()});
  if(FL.leine)return say([['P','Die Wäsche liegt jetzt im Gras. Galja wird sich freuen.']]);
  return orig()});

// ----- Schmied Fjodor: schärft die Säge auf Pump; in Akt 3 wird die Schuld fällig -----
wrapFn('schmied',function(orig){
  if(has('rsaege'))return say([['P','Guten Tag. Könnten Sie mir die Säge schärfen? Die ist von Opa Grischa.'],['SM','Vom Grischa? Der hat damit sein Haus … nein, das war der Samowar.'],
    ['SM','*dreht die Säge* Rost bis auf die Knochen. Gib her.'],['SM','*schleif* … *funk* … *schleif* … *ZING*'],['SM','So. Die schneidet jetzt sogar Ausreden.'],
    ['P','Was bin ich Ihnen schuldig?'],['SM','Hast du Geld?'],['P','Nein.'],['SM','Dann schreib ich’s an. Ich vergess nix, Junge. Irgendwann brauch ich was von dir. Und dann kommst du.']],
    ()=>{inv.splice(inv.indexOf('rsaege'),1);inv.push('saege');FL.schuld=1;renderInv()});
  if(FL.schuld&&FL.recipe&&!FL.glut&&!has('weihwasser'))return FL.glutQ?say([['SM','Weihwasser, Junge. Dann sind wir quitt. Vorher gibt’s keine Glut.']]):say([['P','Ich bräuchte Glut. Glut, die nicht ausgeht.'],['SM','Ah, mein Schuldner! Weißt du noch? Die Säge. Angeschrieben.'],
    ['SM','Jetzt ist es so weit. Meine Esse brennt seit 1993 ungeweiht. Der Pope sollte sie segnen. Dann ist er „in die Stadt“.'],['SM','Bring mir Weihwasser. Dann sind wir quitt. Und du kriegst Glut, die nicht ausgeht, obendrauf.'],
    ['P','Weihwasser. Von einem Popen, der seit dreißig Jahren in der Stadt ist. Klar.']],()=>{FL.glutQ=1});
  if(FL.schuld&&!FL.recipe)return say([['SM','Die Säge schneidet? Gut. Und vergiss nicht: Du stehst bei mir in der Kreide.']]);
  return orig()});

// ----- alte Spielstände -----
function opaMigrate(){
  if((FL.boot||FL.cut)&&!FL.haus){FL.sawQ=1;FL.deal=1;FL.haus=1;FL.cut=1;delete cache.dorf}   // Säge noch vom Fischer bekommen bzw. schon gesägt
  ['holz','brett'].forEach(i=>{const k=inv.indexOf(i);if(k>=0)inv.splice(k,1)});
  if(FL.sawQ&&!FL.deal&&!FL.cut&&FL.teer&&!has('teer')&&!FL.haus)inv.push('teer');     // Zwischenstand 1.71: Teer zurückgeben
  {const b=document.getElementById('brett');if(b)b.remove()}renderInv()}
const _loadOpa=loadState;loadState=function(d){_loadOpa(d);opaMigrate()};
