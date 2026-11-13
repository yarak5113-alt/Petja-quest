// ================= Opas Säge & Opas Haus (Masterplan: „Kein Frust beim Haus“) =================
// Die Säge kommt jetzt von Opa Grischa: Sein Haus ist abgebrannt, die Säge hat im Ofen überlebt – rostig.
// Er leiht sie Petja gegen das Versprechen, ihm das Haus wieder aufzubauen (Bauholz von den Birken, Brett, Omas Teer).
// Schmied Fjodor schärft sie auf Pump. Die Schuld löst Petja in Akt 3 ein: Weihwasser für die Esse.
// Wer nach dem Sägen ohne Hausbau in den Sumpf will, wird von Opa zurückgepfiffen („Ey, wo willst du hin?!“).

// ----- Gegenstände: rostige Säge (Opas Säge umgefärbt), Bauholz -----
(function(){
  const enc=s=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s),dec=u=>decodeURIComponent(u.slice(u.indexOf(',')+1));
  const rust={'#e8ecf0':'#d49a6a','#9aa4ae':'#a0623a','#5e6874':'#5a3018','#6a7480':'#7a4224'};
  let sv=dec(ICONS.saege);for(const[a,b]of Object.entries(rust))sv=sv.split(a).join(b);
  ICONS.rsaege=enc(sv.replace('</svg>','<g fill="#6a2c0c" opacity=".75"><circle cx="22" cy="31" r="2.4"/><circle cx="33" cy="26" r="1.8"/><circle cx="40" cy="25" r="2.6"/><circle cx="27" cy="36" r="1.4"/></g></svg>'));
  const log=(x,y,l)=>`<path d="M${x},${y-5}L${x+l},${y-5}L${x+l},${y+5}L${x},${y+5}Z" fill="#e8e2d2"/><path d="M${x+6},${y-3}l4,0M${x+18},${y+1}l5,0M${x+30},${y-2}l3,0" stroke="#3a3430" stroke-width="1.6"/>`+
    `<ellipse cx="${x+l}" cy="${y}" rx="3.4" ry="5" fill="#d8b47a"/><ellipse cx="${x+l}" cy="${y}" rx="1.6" ry="2.6" fill="none" stroke="#9a7040" stroke-width=".8"/>`;
  ICONS.holz=enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feGaussianBlur in="SourceAlpha" stdDeviation="1.6"/><feOffset dx="1.5" dy="3" result="o"/><feComponentTransfer in="o" result="t"><feFuncA type="linear" slope=".5"/></feComponentTransfer><feMerge><feMergeNode in="t"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`+
    `<g filter="url(#sh)" stroke="#140a04" stroke-opacity=".5" stroke-width=".7">${log(8,46,44)}${log(4,35,46)}${log(12,24,40)}<path d="M10,52L52,52" stroke="#6a4a2a" stroke-width="2.4"/></g></svg>`);
  Object.assign(ITEMS,{rsaege:['','Rostige Säge','Opas Säge. Hat den Brand überlebt. Schneiden tut sie aber nur noch Grimassen.'],
    saege:['','Säge','Opas Säge, vom Schmied geschärft. Ausgeliehen. Gegen ein ganzes Haus.'],
    holz:['','Bauholz','Die Birken vom Sumpfweg, in handliche Stämme gesägt. Opas neues Haus. Mein Rücken weiß es schon.']})})();

// ----- Birkensperre: nur die geschärfte Säge schneidet -----
T.sHolz.fn=function(){
  if(FL.cut)return say([['P','Feuerholz für drei Winter. Wowa würde es verkaufen.']]);
  if(has('saege'))return say([['P','So. Dann wollen wir mal.'],['P','*säg* ... *säg* ... *keuch* ... *säg*'],['P','Geschafft. Der Weg zum Sumpf ist frei.'],['P','Und das Holz … gehört Opa. Abgemacht ist abgemacht. *schultert die Stämme*']],
    ()=>{FL.cut=1;delete cache.sperre;this.n='Holzstapel';$('[data-id=sHolz]').style.display='none';if(!FL.haus&&!has('holz'))inv.push('holz');renderInv();enter('sperre',[P.x,P.y])});
  if(has('rsaege'))return hint('rostsaege',[[['P','*kratz* ... *kratz* ... *quietsch*'],['P','Die Säge rutscht nur drüber. Die ist so rostig, die schneidet nicht mal Butter.']],
    [['P','Mit dem Rostding wird das nix. Die muss jemand schärfen.'],['P','(Wer schärft hier Werkzeug? Jemand mit Feuer und Amboss …)']],
    [['P','Ein Schmied! Auf der Dorfstraße zeigt doch ein Schild zum Schmiedehof.']]]);
  this.i=(this.i||0)+1;say(this.i%2?[['P','Da komm ich weder drüber noch drunter. Ich brauch eine Säge.']]
    :seen.dorf?[['P','Wer hat hier Werkzeug? ...Opa Grischa im Dorf. Wer sein Haus selbst abbrennt, hat es ja vorher auch selbst gebaut.']]
    :[['P','Wer hat hier Werkzeug? Irgendwo muss es Leute geben, die was bauen. Ein Dorf oder so.']])};

// ----- Weg zum Sumpf: Opa pfeift Petja zurück, solange das Haus nicht steht -----
T.sSumpf2.fn=function(){
  if(!FL.cut)return say([['P','Das Schild zeigt zum Sumpf. Nur leider liegen ein paar Tonnen Birke dazwischen.']]);
  if(FL.haus)return walkTo(505,346,()=>enter('sumpf',[540,488]));
  if(!FL.opaRuf){FL.opaRuf=1;return say([['G','*ganz weit hinten* *PFIIIIFF* EEEY! WO WILLST DU HIN?!'],['P','…Opa? Das Dorf ist auf der anderen Seite vom Wald!'],
    ['G','Ich hör meine Säge! Die quietscht, wenn sie abhauen will!'],['G','Abgemacht ist abgemacht: Holz zu mir, dann bauen wir. Danach kannst du von mir aus im Sumpf wohnen!'],['P','(Wie macht der das? …Okay. Erst das Haus.)']])}
  hint('opaRuf',[[['G','*aus der Ferne* JUNGE! MEIN HOLZ!']],[['G','*aus der Ferne* Ich seh dich! …Na gut, ich seh dich nicht. Aber ich WEISS es!']],
    [['P','(Keine Chance. Erst Opas Haus: Bauholz, das Brett vom Ofen und Teer fürs Dach. Dann der Sumpf.)']]])};

// ----- Opa Grischa: Säge gegen Hausbau -----
const haveHaus=()=>['holz','brett','teer'].every(has);
wrapFn('opa',function(orig){
  if(has('schnaps')||(FL.bjNo&&!FL.leiter))return orig();   // die Leiter-Sache geht vor
  if(FL.sawQ&&!FL.haus&&haveHaus())return buildHaus();
  if(!FL.sawQ&&seen.sperre&&!FL.cut)return say([['P','Opa, haben Sie zufällig eine Säge? Am Sumpfweg liegen Birken quer.'],
    ['G','Eine Säge? Hab ich. Lag im Ofen. Der Ofen hat das Feuer überlebt, die Säge auch. Halbwegs.'],['G','*kramt in der Asche* Da. Ein bisschen rostig. Rost ist nur Patina, sagt mein Schwager.'],
    ['G','Aber umsonst gibt’s nix. Die Birken da draußen, das ist mein Bauholz! Du sägst, du schleppst, und dann bauen wir mir ein neues Haus.'],
    ['P','Ich? Ein Haus? Ich hab mal ein Regal falsch rum aufgebaut. Es steht heute noch. Falsch rum.'],
    ['G','Dann wird’s Zeit. Holz von den Birken, ein Brett für die Tür – liegt da am Ofen. Und Teer fürs Dach, den hat die Dusja.'],
    ['G','Und wehe, du haust mit meiner Säge ab. Ich hör die quietschen. Auf zwei Kilometer.'],['P','*bekommt eine rostige Säge*']],
    ()=>{FL.sawQ=1;FL.auftrag=1;inv.push('rsaege');renderInv()});
  if(FL.sawQ&&!FL.haus){
    if(has('rsaege'))return say([['P','Opa, die Säge schneidet nicht. Die ist komplett verrostet.'],['G','Patina, Junge! …Na gut. Rost.'],['G','Geh zum Fjodor in den Schmiedehof. Die Dorfstraße runter. Der schleift alles. Sogar Schwiegermütter.']]);
    if(!FL.cut)return say([['G','Scharf ist sie jetzt? Dann ab zu den Birken! Mein Haus baut sich nicht von allein.']]);
    const miss=[];if(!has('brett'))miss.push(['G','Das Brett für die Tür liegt da am Ofen. Brennt nicht, das Ding. Physik.']);
    if(!has('teer'))miss.push(['G','Ohne Teer regnet’s rein. Die Dusja auf der Dorfstraße hat Birkenteer. Rückt aber nix raus, ohne vorher zu jammern.']);
    return say([['G','Das Holz ist da? Schön! Riecht nach Birke und Schweiß.'],...miss])}
  if(FL.haus)return hint('opaNeu',[[['G','Ein Haus! Mit Ofen! Der Ofen war ja schon da, aber jetzt hat er wieder was zu tun.']],
    [['G','Diesmal pass ich auf. Kein Samowar mehr im Bett.'],['P','Und der Selbstgebrannte?'],['G','Der bleibt. Man muss ja nicht übertreiben.']],
    [['G','Wenn du mal ein Dach überm Kopf brauchst, Junge: Klopf an. Aber nicht zu fest. Ist frisch geteert.']]]);
  return orig()});
function buildHaus(){say([['P','Opa! Bauholz, ein Brett und Birkenteer. Wie versprochen.'],['G','Ha! Ich wusste, aus dir wird noch was. Ärmel hoch!']],async()=>{
  fade.style.opacity=1;await new Promise(r=>setTimeout(r,900));
  ['holz','brett','teer'].forEach(i=>{const k=inv.indexOf(i);if(k>=0)inv.splice(k,1)});FL.haus=1;delete cache.dorf;renderInv();
  say([['P','*säg* … *hämmer* … *hämmer* … *Daumen* … AU.'],['G','Schiefer! Nein, der andere schief!'],['P','*teer* … *schmier* … *hust*'],['P','*Zwei Tage später*']],()=>{enter('dorf',[P.x,P.y]);
    setTimeout(()=>say([['G','Na bitte. Ein Haus! Mit Ofen! Der Ofen war ja schon da.'],['P','Mein Rücken ist jetzt auch abgebrannt.'],
      ['G','Die Säge behältst du. Hast sie dir verdient. Und jetzt ab in deinen Sumpf, bevor du mir das frische Dach vollheulst.']]),1100)})})}
wrapFn('ruine',function(orig){if(FL.haus)return say([['P','Opas neues Haus. Krumm, aber es steht. Und ich hab’s gebaut. Halb. Ein Viertel.'],['G','Und es riecht nach Teer! Wie ein richtiges Zuhause.']]);
  if(FL.sawQ)return say([['P','Hier soll also das neue Haus hin. Der Ofen steht schon. Der Rest kommt von den Birken.']]);return orig()});
if(T.ruine)Object.defineProperty(T.ruine,'n',{get:()=>FL.haus?'Opas neues Haus':'Opas abgebranntes Haus',configurable:true});

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

// ----- alte Spielstände: Säge noch vom Fischer bekommen → Opas Haus gilt als erledigt -----
function opaMigrate(){if(FL.boot&&!FL.sawQ){FL.sawQ=1;FL.haus=1;delete cache.dorf}}
const _loadOpa=loadState;loadState=function(d){_loadOpa(d);opaMigrate()};
