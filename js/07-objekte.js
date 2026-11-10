// ================= Objekte =================
const inv=[];
const T={
  petja:{n:'Petja',l:[
    [['P','Ich bin Petja. Glaub ich. Meine Beine fühlen sich an wie kalte Pelmeni.']],
    [['P','Kneif mich mal einer.'],['P','...Keiner da. Typisch.']],
    [['P','Ist nur ein Trip. Ein sehr, sehr langer Trip. Passiert. ...Mir zumindest.']]]},
  sonne:{n:'Sonne',l:[
    [['S','Guten Morgen, Petja. Es ist schon Mittag.'],['P','Die Sonne redet mit mir. Na super. Jetzt auch noch die.']],
    [['S','Wer in diesem Wald einschläft, wacht nicht so leicht wieder auf.'],['P','Danke. Sehr beruhigend.']]]},
  pilz:{n:'Fliegenpilz',at:[250,470],l:[
    [['M','Psst. Iss mich, und du siehst Farben, die es gar nicht gibt.'],['P','Ich seh die schon, Kumpel. Alle.']],
    [['P','Nein, Petja. Du hast heute schon genug probiert.']]]},
  birke:{n:'Alte Birke',at:[640,400],l:[
    [['P','Die Birke guckt mich an.'],['B','...'],['P','Sie guckt immer noch.']],
    [['B','Geh weg, du riechst nach Stadt.'],['P','Und du nach Brennholz.']]]},
  kraehe:{n:'Krähe',at:[680,400],fn(){if(inv.includes('apfel'))return say([['P','Hey, Krähe. Fang.'],['P','*wirft den Apfel*'],['K','KRAH! Bist du irre?! Ich hab dir den Weg gezeigt, du Undankbarer!'],['K','Ich geh zur Baba Jaga petzen! Krah!'],['P','So. Der Ast ist frei.']],()=>{FL.kraehe=1;inv.splice(inv.indexOf('apfel'),1);renderInv();rm('kraeheG')});
    if(FL.angelQ&&!FL.kraehe&&R()<.5)return say([['P','Der Ast, auf dem die Krähe sitzt, wäre ein guter Angelstock.'],['P','Aber die geht da nicht runter. Vielleicht muss ich sie verscheuchen. Mit irgendwas werfen.']]);
    this.i=(this.i||0);say(this.l[this.i++%this.l.length])},l:[
    [['K','Krah! Noch einer, der nicht aufwacht!'],['P','Noch einer? Wie viele gibt es denn?'],['K','Frag die Baba Jaga. Ihre Hütte steht tiefer im Wald. Krah!']],
    [['P','Die mit dem Haus auf Hühnerbeinen?'],['K','Krah! Und sie macht nichts umsonst.']]]},
  stumpf:{n:'Baumstumpf',at:[565,470],l:[
    [['P','Ein Baumstumpf. Jemand hat hier mal Holz gemacht.'],['P','Oder die Birken haben ihn gefressen.']],
    [['P','Ich setz mich lieber nicht drauf. Wer weiß, ob der auch redet.']]]},
  kippe:{n:'Joint-Stummel',at:[565,470],l:[
    [['P','Da ist er. Der Rest von meinem Joint. Der Schuldige.'],['P','Den nehm ich mit. Als Beweismittel.']]],
    after(){rm('kippe');inv.push('kippe');renderInv()}},
  sPfad:{n:'Schild: Zum Pfad',at:[330,425],go:'gabel',to:[320,488]},
  sBaba:{n:'Schild: Zu Baba Jaga',at:[404,350],go:'huette',to:[640,488]},
  sUnbek:{n:'Schild: Zum Sumpf',at:[462,350],go:'sperre',to:[400,488]},
  sHolz:{n:'Umgestürzte Birken',at:[440,402],fn(){
    if(FL.cut)return say([['P','Feuerholz für drei Winter. Wowa würde es verkaufen.']]);
    if(inv.includes('saege'))return say([['P','So. Dann wollen wir mal.'],['P','*säg* ... *säg* ... *keuch* ... *säg*'],['P','Geschafft. Der Weg zum Sumpf ist frei.']],()=>{FL.cut=1;delete cache.sperre;this.n='Holzstapel';$('[data-id=sHolz]').style.display='none';enter('sperre',[P.x,P.y])});
    this.i=(this.i||0)+1;say(this.i%2?[['P','Da komm ich weder drüber noch drunter. Ich brauch eine Säge.']]:[['P','Vielleicht hat der Fischer eine. Fischer haben doch immer Werkzeug, oder?']])}},
  sSumpf2:{n:'Schild: Zum Sumpf',at:[490,404],fn(){if(FL.cut)walkTo(505,346,()=>enter('sumpf',[540,488]));else say([['P','Das Schild zeigt zum Sumpf. Nur leider liegen ein paar Tonnen Birke dazwischen.']])}},
  sZG3:{n:'Schild: Zur Weggabelung',at:[232,484],go:'gabel',to:[462,356]},
  sZW:{n:'Schild: Zum Birkenwald',at:[215,482],go:'wald',to:[330,430]},
  sZG:{n:'Schild: Zur Weggabelung',at:[665,480],go:'gabel',to:[400,352]},
  baum:{n:'Umgestürzte Birke',at:[590,372],l:[
    [['P','Eine umgestürzte Birke. Man kann drübersteigen, wenn man nicht nachdenkt.']],
    [['P','Dahinter riecht es nach Sumpf. Und nach Ärger.']]]},
  sFisch:{n:'Schild: Zum Fischerhaus',at:[660,432],fn(){walkTo(760,404,()=>enter('fischer',[90,476]))}},
  sZD:{n:'Schild: Zum dunklen Wald',at:[130,484],go:'sperre',to:[730,412]},
  fischer:{n:'Fischer',at:[690,394],fn(){if(FL.ablenk&&!FL.schnaps)return say([['F','NICHT JETZT! DER WELS! Er zieht mich gleich vom Steg!'],['P','Lassen Sie sich Zeit.']]);
    if(FL.schnapsQ&&!FL.ablenk&&R()<.6)return say(has('wuermer')?[['F','Was zappelt da in deiner Tasche?'],['P','Nichts. ...Nur ein paar Würmer. Für später.'],['P','(Unter dem Steg hängt seine Schnur. Da kommen die Würmer dran.)']]
      :[['F','Seit 1987 wart ich auf den Wels. Der beißt nur auf Würmer. Fette, glitschige. Mein Brot verschmäht er.'],['F','Meine Schnur hängt unterm Steg. Leer. Wie mein Kühlschrank.'],['P','(Würmer an seinem Haken... dann hätte er mit dem Wels alle Hände voll zu tun.)']]);
    if(FL.leiterQ&&!FL.schnapsQ){FL.schnapsQ=1;return say([['P','Herr Kusmitsch, könnten Sie mir Ihren Selbstgebrannten geben? Für den Opa.'],['F','Meinen Selbstgebrannten?! Für den Brandstifter? Eher fress ich mein Netz.'],['F','Die Flasche lass ich nicht aus den Augen. Nur wenn einer anbeißt. Und hier beißt seit 1987 nix Großes mehr an.'],['F','Außer dem Wels. Der wohnt unterm Steg. Aber der beißt nur auf Würmer. Fette Würmer. Mit meinem Brot lockst du den nicht.']])}
    if(FL.ks&&!FL.fisch&&!FL.kater){if(inv.includes('angel'))return say([['F','Na, eine Angel! Selbst gebaut? Sieht aus wie ein Unfall.'],['F','Dann zeig mal. Schwimmer in der Mitte halten, nicht vom Fisch wegziehen lassen!']],fishing);
    FL.angelQ=1;return say([['P','Könnten Sie mir einen Fisch geben? Für einen Kater.'],['F','Für den Kater vom Popen? Der Satan hat mir mal den ganzen Fang geklaut. Von mir kriegt der nix.'],['F','Fang dir selber einen. Keine Angel? Dann bau dir eine.'],['F','Ein Stock und eine Schnur. Mehr braucht ein Mann nicht. Und Wodka.'],['P','Und wo krieg ich die her?'],['F','Stöcke wachsen an Bäumen, Junge. Und Schnur... frag nicht mich, ich sitz hier seit 1987.']])}if(!FL.boot){if(inv.includes('brett')&&inv.includes('teer'))return repairBoat();
    if(!FL.auftrag){FL.auftrag=1;return say([['P','Sie haben nicht zufällig eine Säge? Da liegen Birken auf dem Weg.'],['F','Hab ich. Aber umsonst gibt’s nix. Erst flickst du mein Boot. Da, wo der Wels durch ist.'],['F','Du brauchst ein ordentliches Brett und Teer. Beides gibt’s im Dorf hinter der Hütte von der Alten.'],['P','Hinter Baba Jagas Hütte?'],['F','Na, wo denn sonst. Ist ja nicht so, dass sie umziehen könnte. ...Obwohl. Mit den Beinen.']])}
    if(R()<.5)return say([['F','Brett UND Teer, Junge. Ohne Teer säuft der Kahn ab. Ohne Brett auch. Ohne beides sowieso.']])}
    this.i=(this.i||0);say(this.l[this.i++%this.l.length])},l:[
    [['P','Tag. Beißen sie?'],['F','Die Fische? Nein. Die Weiber im Sumpf, ja.'],['F','Dreißig Jahre sitz ich hier. Gefangen hab ich: zwei Stiefel, ein Fahrrad und meine erste Frau.'],['P','Ihre... Frau.'],['F','Hab sie wieder reingeworfen. Zu klein.']],
    [['P','Was machen Sie mit dem Netz?'],['F','Flicken. Ein Wels hat ein Loch reingebissen. So groß wie ein Traktor.'],['P','Das Loch?'],['F','Der Wels, Junge. Obwohl... das Loch auch.']],
    [['P','Wissen Sie, wie ich hier rauskomme?'],['F','Raus? Aus dem Wald kommt keiner raus. Ich wollte 1987 nur Zigaretten holen.'],['F','Frag die Alte in der Hütte auf Hühnerbeinen. Aber nimm Wodka mit. Nüchtern ist sie unerträglich.']]]},
  fhaus:{n:'Fischerhütte',at:[160,362],l:[[['P','Die Hütte vom Fischer. Riecht nach Rauch, Fisch und Einsamkeit.']],[['P','Abgeschlossen.'],['F','Da ist nur Wodka drin! Und Fisch! Und Wodka!']]]},
  boot:{n:'Altes Boot',at:[400,394],fn(){if(!FL.boot&&inv.includes('brett')&&inv.includes('teer'))return repairBoat();say(FL.boot?[['P','Geflickt. Hält bestimmt. Eine Woche. Oder bis zum ersten Wels.']]:this.l[0])},l:[[['P','Ein umgedrehtes Boot. Unten hat es mehr Löcher als Boden.'],['F','Das schwimmt noch! Nur nicht nach oben.']]]},
  see:{n:'See',at:[480,356],fn(){if(inv.includes('angel')&&!FL.fisch&&!FL.kater)return say([['P','Dann wollen wir mal. Auswerfen... und warten...'],['P','Oh. Es zieht. Tatsächlich.']],fishing);this.i=(this.i||0);say(this.l[this.i++%this.l.length])},l:[[['P','Der See ist so still, als würde er die Luft anhalten.']],[['P','Da unten hat sich was bewegt. Groß. Ich geh nicht schwimmen.']]]},
  netz:{n:'Fischernetze',at:[300,382],l:[[['P','Fischernetze zum Trocknen. Oder moderne Kunst. Schwer zu sagen.']]]},
  sDorf:{n:'Schild: Zum Dorf',at:[650,480],go:'dorf',to:[150,486]},
  sZB:{n:'Schild: Zu Baba Jaga',at:[130,488],go:'huette',to:[640,474]},
  oma:{n:'Oma Dusja',at:[330,454],fn(){
    if(FL.teer)return say([['O','Iff waf... ach nein, ich hab ja wieder Zähne. Iss was, du bist zu dünn! Baba Jaga mag keine Knochen.']]);
    if(inv.includes('gebiss'))return say([['P','Oma, ich hab Ihr Gebiss gefunden.'],['O','Mein Gebiff! Wo war ef?'],['P','Unter dem Kater vom Popen. Auf dem Friedhof.'],['O','*klack* ...Ah. Viel besser. Schmeckt nach Kater, aber egal.'],['O','Teer willst du? Hier, Birkenteer. Gegen Rheuma, Läuse und Männer.'],['P','*bekommt eine Flasche Birkenteer*']],()=>{FL.teer=1;inv.splice(inv.indexOf('gebiss'),1);inv.push('teer');renderInv()});
    if(!FL.gq){FL.gq=1;return say([['P','Tag, Oma. Sie haben nicht zufällig Teer?'],['O','Teer? Hab ich. Birkenteer. Aber erft... erft...'],['P','Was ist mit Ihren Zähnen?'],['O','Weg! Bei Fjodorf Beerdigung hab ich fo geheult, da ift mir daf Gebiff raufgeflogen.'],['O','Und jetft hockt der Kater vom Popen drauf. Daf Miftvieh! Faucht jeden an.'],['O','Bring mir mein Gebiff, dann kriegft du den Teer. Und waf zu effen. Du bift fo dünn.']])}
    this.i=(this.i||0)+1;say(this.i%2?[['O','Mein Gebiff, Junge! Friedhof! Hinter der Kirche! Der Kater!']]:[['O','Den Grifcha am Dorfeingang hab ich angezeigt. Wegen Brandgefahr. Eine Woche vorher. Keiner hört auf Oma.']])}},
  opa:{n:'Opa Grischa',at:[504,452],fn(){if(inv.includes('schnaps'))return say([['P','Opa, ich hab da was für Sie.'],['G','Ist das... Kusmitschs Selbstgebrannter?! Riecht nach Teer und Trauer. Perfekt!'],['G','*gluck* *gluck* ...AAAH. Da wird mir ganz warm. Wie damals beim Brand.'],['G','Die Leiter gehört dir. Hat das Feuer überlebt. Wie ich.'],['P','*bekommt eine Leiter*']],()=>{FL.leiter=1;inv.splice(inv.indexOf('schnaps'),1);inv.push('leiter');renderInv();rm('leiterG')});
    if(FL.bjNo&&!FL.leiterQ){FL.leiterQ=1;return say([['P','Opa, haben Sie eine Leiter? Ich muss in Baba Jagas Hütte. Die steht auf Hühnerbeinen.'],['G','Eine Leiter hab ich. Da, am Ofen. Hat das Feuer überlebt.'],['G','Aber umsonst gibt’s nix. Bring mir was zu trinken. Mein Selbstgebrannter ist ja... verdampft.'],['G','Der Kusmitsch am See brennt den besten. Aber der rückt nix raus. Der schläft sogar mit der Flasche.']])}
    this.i=(this.i||0);say(this.l[this.i++%this.l.length])},l:[
    [['P','Was ist denn mit Ihrem Haus passiert?'],['G','Der Samowar. Oder der Selbstgebrannte. Oder ich. Die Untersuchung läuft noch.'],['G','Die Feuerwehr kam aus der Stadt. Drei Tage später. Haben Fotos gemacht.']],
    [['P','Kann ich hier was mitnehmen?'],['G','Nimm, was nicht verbrannt ist. Also nix.'],['G','Höchstens das Brett da. Das lag unterm Ofen. Ofen brennt nicht, Brett brennt nicht. Physik.']],
    [['G','Die Dusja aus dem Dorf hat mich angezeigt. Eine Woche bevor’s gebrannt hat.'],['G','Hexe. Die zweite im Wald. Die eine hat Hühnerbeine, die andre ’ne Gartenschere.']]]},
  brett:{n:'Brett',at:[664,458],l:[[['P','Ein Brett. Nur ein bisschen angekokelt.'],['G','Nimm’s mit! Ist eh versichert. ...War. War versichert.']]],after(){rm('brett');inv.push('brett');renderInv()}},
  haus1:{n:'Leeres Haus',at:[300,446],l:[[['P','Ein leeres Haus. Die Gardinen sind noch da, die Leute nicht.']]]},
  omahaus:{n:'Omas Haus',at:[300,452],l:[[['P','Omas Haus. Sonnenblumen, Gardinen, frisch gestrichen. Das einzige Haus hier, das nicht stirbt.']]]},
  ruine:{n:'Opas abgebranntes Haus',at:[600,452],l:[[['P','Opas Haus. Übrig ist nur der Ofen.'],['G','Der Ofen ist das Wichtigste! Der Rest war eh nur Dekoration.']]]},
  laden:{n:'Dorfladen',at:[300,340],l:[[['P','„Laden“. Am Zettel steht: „Geschlossen seit 1991. Kommen bald wieder.“'],['P','Ich glaube, die kommen nicht wieder.']]]},
  leer:{n:'Vernageltes Haus',at:[560,350],l:[[['P','Vernagelt. Hier wohnt keiner mehr.'],['G','Doch, der Kolja. Der macht nur nicht auf. Seit der Wahl.']]]},
  brunnen:{n:'Ziehbrunnen',at:[500,350],l:[[['P','Ein Ziehbrunnen. Unten glitzert was.'],['P','...Eine Bierdose. Natürlich.']]]},
  kirche:{n:'Kapelle',at:[440,336],l:[[['P','Eine kleine Kapelle mit goldener Zwiebel. Die einzige Sache im Dorf, die noch glänzt.']]]},
  sIns:{n:'Schild: Ins Dorf',at:[480,352],go:'dorfstr',to:[420,488]},
  sDE:{n:'Schild: Zum Dorfeingang',at:[130,488],go:'dorf',to:[470,354]},
  sKi:{n:'Schild: Zur Kirche',at:[474,368],go:'kirche',to:[420,488]},
  sZD2:{n:'Schild: Zurück ins Dorf',at:[130,488],go:'dorfstr',to:[466,374]},
  galja:{n:'Tante Galjas Haus',at:[560,452],l:[[['P','Tante Galjas Haus. Steht zumindest auf dem Briefkasten.'],['P','Drinnen läuft ein Fernseher. Laut. Seit 1987 vermutlich.']]]},
  waesche:{n:'Wäscheleine',at:[340,370],l:[[['P','Wäsche. Eine Unterhose so groß wie ein Segel.'],['P','Wenn Galja die anzieht, kann sie damit über den See.']]]},
  kirche2:{n:'Holzkirche',at:[460,336],l:[[['P','Abgeschlossen. Ein Zettel: „Pope in der Stadt. Zurück bald.“ Datiert 1993.']],[['P','Die Kuppeln sind vergoldet. Das Dach leckt. Prioritäten.']]]},
  glocke:{n:'Glocke',at:[360,340],l:[[['P','Eine Glocke im Turm. Ich komm nicht ran. Zum Glück. Sonst würd ich läuten.']]]},
  graeber:{n:'Gräber',at:[250,450],l:[[['P','„Fjodor, 1931–2024. Hat nie gewonnen.“ Wobei, was?'],['P','Plastikblumen. Die halten länger als die Leute.']]]},
  kater:{n:'Kater',at:[560,452],fn(){FL.ks=1;if(inv.includes('fisch'))return say([['P','Hier, Mieze. Ein Fisch. Frisch aus dem See.'],['P','*der Kater schnappt sich den Fisch und verschwindet hinter der Kirche*'],['P','Und da liegt... Omas Gebiss. Na lecker.']],()=>{FL.kater=1;inv.splice(inv.indexOf('fisch'),1);renderInv();rm('katerG')});
    this.i=(this.i||0)+1;say(this.i%2?[['P','Na, Mieze? Gehst du mal kurz runter da?'],['P','*FAUCH*'],['P','Okay. Verstanden. Er sitzt auf irgendwas. Das glitzert.']]:[['P','Der geht da nicht weg. Vielleicht mit Futter.'],['P','Was fressen Kater? Fisch. Und wer hat Fisch? ...Genau.']])}},
  gebiss:{n:'Gebiss',at:[580,452],fn(){if(!FL.kater)return say([['P','Da komm ich nicht ran. Der Kater sitzt drauf und guckt böse.']]);say([['P','Omas Gebiss. Ich fass das nur mit zwei Fingern an.']],()=>{rm('gebissG');inv.push('gebiss');renderInv()})}},
  apfel:{n:'Apfel',at:[300,400],fn(){say([['P','Ein Apfel. Schön rot. Zum Essen zu schade...'],['P','...zum Werfen genau richtig.']],()=>{rm('apfelG');inv.push('apfel');renderInv()})}},
  apfelbaum:{n:'Apfelbaum',at:[300,400],l:[[['P','Ein Apfelbaum mitten im Birkenwald. Den hat bestimmt jemand gepflanzt. Oder verloren.']],[['P','Die anderen Äpfel hängen zu hoch.']]]},
  ast:{n:'Ast',at:[690,400],fn(){if(!FL.kraehe)return say([['P','Ein schöner gerader Ast. Aber da sitzt die Krähe drauf.'],['K','Krah! Finger weg, das ist meiner!']]);
    say([['P','*spring* ... *spring* ... *SPRING*'],['P','*KNACK*'],['P','Ein Stock. Wird eine Angel. Ich bin heute so produktiv, das macht mir fast Sorgen.']],()=>{FL.ast=1;delete cache.wald;inv.push('stock');renderInv();enter('wald',[P.x,P.y]);craft()})}},
  altnetz:{n:'Kaputtes Netz',at:[262,372],fn(){say([['P','Ein kaputtes Fischernetz, versteckt neben der Hütte.'],['F','He! Das ist... ach, nimm. Das hat der Wels zerfetzt.'],['P','Da zieh ich mir eine lange Schnur raus.']],()=>{rm('altnetzG');inv.push('seil');renderInv();craft()})}},
  sUfer:{n:'Schild: Zum Ufer',at:[716,480],fn(){walkTo(770,470,()=>enter('ufer',[60,452]))}},
  sFH:{n:'Schild: Zum Fischerhaus',at:[130,486],go:'fischer',to:[740,470]},
  sUP:{n:'Schild: Unter den Pier',at:[176,404],go:'unter',to:[640,470]},
  sUZ:{n:'Schild: Zurück zum Ufer',at:[690,486],go:'ufer',to:[180,406]},
  wrack:{n:'Bootswrack',at:[560,420],l:[[['P','Ein Boot, halb versunken. Das ist wohl das, was passiert, wenn man es NICHT flickt.']]]},
  steg:{n:'Steg',at:[200,404],l:[[['P','Der Steg vom Fischer. Unten drunter kann man gebückt durchkriechen.']],[['P','Ganz hinten sitzt Kusmitsch. Er hat mich nicht gesehen. Gut so.']]]},
  schnur:{n:'Angelschnur',at:[430,430],fn(){if(FL.ablenk)return say([['P','Die Schnur zappelt wie verrückt. Oben flucht Kusmitsch. Herrlich.']]);
    if(FL.tied)return say([['P','Die Würmer zappeln am Haken. Jetzt muss nur noch der Wels anbeißen.']],wels);
    if(inv.includes('wuermer'))return say([['P','Ich spieß die Würmer auf seinen Haken. Einen nach dem anderen. Sorry, Jungs.'],['P','Und jetzt halt ich die Schnur fest und warte. Der Wels muss richtig ziehen, damit Kusmitsch was merkt.']],()=>{FL.tied=1;inv.splice(inv.indexOf('wuermer'),1);renderInv();wels()});
    this.i=(this.i||0)+1;say(this.i%2?[['P','Die Angelschnur vom Fischer. Leerer Haken.'],['P','Wenn hier was richtig Großes dranziehen würde, wäre Kusmitsch eine Weile beschäftigt...'],['P','Der Wels. Kusmitsch hat gesagt, der beißt nur auf Würmer. Fette Würmer.']]
      :[['P','Brot lockt den Wels nicht. Ich brauch Würmer für den Haken.'],['P','Vor Baba Jagas Hütte ist die Erde so feucht und matschig... da wimmelt es bestimmt von Würmern.']])}},
  muell:{n:'Müll',at:[540,460],l:[[['P','Eine leere Flasche, ein Stiefel, ein Reifen. Kusmitschs Lebenslauf.']]]},
  wuermer:{n:'Würmer',at:[540,474],fn(){
    say([['P',FL.schnapsQ?'Fette Würmer. Genau das Richtige für einen Wels. Und für niemanden sonst.':'Ein Haufen Erde voller fetter Würmer. Wer weiß, wofür die mal gut sind.'],['P','*buddel* *glitsch* ...Eine Handvoll. Rein in die Tasche. Igitt.'],['J','Finger weg von meinen Würmern, Bürschchen! Die sind für die Suppe!'],['P','Ich leih sie nur aus.']],()=>{rm('wuermerG');inv.push('wuermer');renderInv()})}},
  schnaps:{n:'Selbstgebrannter',at:[680,392],fn(){if(!FL.ablenk)return say([['F','FINGER WEG! Das ist mein Selbstgebrannter! Den hab ich im Auge, Junge!']]);
    say([['P','*schnapp*'],['F','(kämpfend) KOMM HER! KOMM HER, DU MISTVIEH!'],['P','Der merkt gar nichts. Dreißig Jahre Warten machen blind.']],()=>{FL.schnaps=1;rm('schnapsG');inv.push('schnaps');renderInv()})}},
  leiter:{n:'Leiter',at:[700,452],fn(){say(FL.leiterQ?[['G','Die Leiter gibt’s gegen Selbstgebrannten. Nicht gegen Bitte-Bitte.']]:[['P','Eine alte Leiter am Ofen. Angekokelt, aber stabil.'],['G','Finger weg! Das ist das Einzige, was mir geblieben ist. Außer dem Ofen.']])}},
  baba:{n:'Baba Jaga',at:[540,460],fn(){
    if(inv.includes('pilze')&&!FL.bjInfo)return say([['P','Hier. Die waren in dem Joint. Blau angelaufen.'],['J2','*schnüffel* ...*schnüffel*... HA! Traumschwamm. Aber welche Sorte? Da gibt es hundert.'],
      ['J2','Wer den raucht, wacht in MEINEM Märchen auf. Darum kommst du nicht raus, Bürschchen.'],['P','Wowa. Natürlich. Natürlich war es Wowa.'],['J2','Welche Sorte genau, weiß nur der Pilzmeister der Gnome. Tief in ihrer Höhle. Bring ihm die Pilze.'],
      ['J2','Aber die Gnome lassen keinen umsonst in ihren Stollen. Gnome sind schlimmer als Steuerprüfer.']],()=>{FL.bjInfo=1;FL.labQ=1});
    if(FL.mullerQ&&!FL.karte)return say([['P','Ich muss ins Banja. Hinter dem Irrwald. Kennen Sie den Weg?'],['J2','Ins BANJA? Du? Hihihi! Warte...'],['J2','*kramt im Ofen* ...*hust* ...Da! Meine alte Wegkarte. Nur ein bisschen angekokelt.'],['P','Da steht: 2× links, 1× rechts, 1× geradeaus.'],['J2','Verlauf dich nicht. Im Irrwald fressen einen die Bäume. Langsam.']],()=>{FL.karte=1;inv.push('karte');renderInv()});
    if(FL.recipe)return say([['J2','Träne, Feder, Birkensaft. Bring mir alles, dann brau ich. Na los!']]);
    if(FL.bjInfo)return say([['J2','Zu den Gnomen mit den Pilzen! Und lass dich nicht übers Ohr hauen. Die haben große Ohren. Und Nasen.']]);
    if(inv.includes('kippe'))return say([['J2','Auf den Tisch damit! Zerlegen! Papier, Filter, Kraut. Ich will sehen, was drin ist.']]);
    say([['J2','Wo ist der Stummel? Du hast ihn doch nicht etwa geraucht? Bring ihn her!']])}},
  tisch:{n:'Tisch',at:[450,460],fn(){if(FL.pilze)return say([['P','Hier hab ich einen Joint zerlegt. Vor einer Hexe. Ein Satz, den ich nie sagen wollte.']]);
    if(inv.includes('kippe'))return say([['P','Ich leg den Joint auf den Tisch.'],['J2','Vorsichtig! Erst den Filter ab, dann aufrollen, dann sortieren.']],tableGame);
    say([['P','Ein schwerer Holztisch. Voller Kerben und Flecken. Ich frag nicht, wovon.']])}},
  ofen:{n:'Ofen',at:[260,440],l:[[['P','Ein russischer Ofen. Warm. Zu warm. Und groß genug für einen Petja.'],['J2','Der ist für Piroggen! ...Meistens.']],[['P','Im Topf blubbert was. Es riecht nach Pilzen und Socken.']]]},
  regal:{n:'Regal',at:[640,420],l:[[['P','Gläser mit Kräutern, Augen und etwas, das mir zuwinkt.'],['P','Und zwei Schädel. Hoffentlich keine Stadtkinder.']]]},
  besen:{n:'Besen',at:[700,450],l:[[['P','Ihr Besen. Ich glaub, der fliegt. Ich setz mich lieber nicht drauf.']]]},
  fenster:{n:'Fenster (raus)',at:[300,430],go:'huette',to:[600,474]},
  sGN:{n:'Schild: Zur Gnomsiedlung',at:[700,474],fn(){walkTo(770,458,()=>enter('gnome',[60,472]))}},
  sZU:{n:'Schild: Zum Ufer',at:[130,488],go:'ufer',to:[740,456]},
  sHO:{n:'Schild: Zur Höhle',at:[640,428],fn(){if(!FL.stollen)return say([['N1','HALT, Langer! In die Höhle kommt keiner ohne Wegezoll.'],['N1','Die Höhle ist Gnomgebiet. Geschäftsgeheimnis. Sehr geheim. Sehr... geschäftlich.']],()=>{if(FL.labQ)FL.mehlQ=1});walkTo(712,418,()=>enter('hoehle',[400,486]))}},
  sAU:{n:'Schild: Zum Ausgang',at:[130,488],go:'gnome',to:[640,428]},
  gnom1:{n:'Grobnik',at:[300,462],fn(){
    if(inv.includes('mehl'))return say([['P','Drei Säcke Mehl. Wie bestellt.'],['N1','*schnüff* ...*SCHNÜFF* ...OH ja. Das ist gutes... Mehl.'],['N1','Der Stollen ist offen für dich, Langer. Der Pilzmeister wartet hinten im Dunkeln. Hier, nimm die Laterne.']],()=>{FL.stollen=1;inv.splice(inv.indexOf('mehl'),1);inv.push('laterne');renderInv()});
    if(FL.labQ&&!FL.mehlQ){FL.mehlQ=1;return say([['P','Ich muss zu eurem Pilzmeister. In den Stollen.'],['N1','In den Stollen? Ohne Wegezoll kommt da keiner rein. Drei Säcke Mehl.'],['P','Mehl? Ihr backt?'],['N1','...Ja. Wir backen. Sehr viel. Den ganzen Tag. *schnief*'],['N1','Der Müller hat das gute Zeug. Das ganz gute. Aber der rückt nix raus.']])}
    if(FL.mehlQ&&!FL.stollen)return say([['N1','Drei Säcke. Vom Müller. Vorher kein Stollen. *schnief*']]);
    this.i=(this.i||0);say(this.l[this.i++%this.l.length])},l:[
    [['P','Hallo. Sind Sie... ein Gnom?'],['N1','GROSS-Gnom! Kleine Gnome gibt’s in Deutschland. In Vorgärten. Mit Angel. Peinlich.'],['N1','Wir sind die Nasigen vom See. Je größer die Nase, desto höher der Rang. Ich bin Vorarbeiter.']],
    [['P','Was machen Sie mit der Spitzhacke?'],['N1','Graben. In der Höhle. Seit dreihundert Jahren.'],['P','Und was suchen Sie?'],['N1','Weiß keiner mehr. Aber jetzt aufhören wäre unhöflich.']],
    [['N1','Geh nicht zu tief in die Höhle, Langer. Da hinten ist es dunkel. Und dunkel ist erst der Anfang.']]]},
  gnom2:{n:'Opa Schnobbel',at:[300,420],l:[
    [['N2','*paff* ...Noch ein Langer. Letzte Woche war einer da. Hat nach dem Weg nach Hause gefragt.'],['P','Und?'],['N2','Wir haben gelacht. Lange. *paff*']],
    [['P','Ihre Nase ist... beeindruckend.'],['N2','Danke. Hab sie seit 1612. Sie hat mal einen Bären gerochen, bevor er geboren war.']],
    [['N2','Die Baba Jaga? Die schuldet mir drei Pfund Pilze. Grüß sie nicht von mir. *paff*']]]},
  ghut:{n:'Gnomhütte',at:[230,360],l:[[['P','Runde Tür, rundes Fenster, runde Bewohner.']],[['P','Drinnen schnarcht jemand. Die Wände wackeln.']]]},
  kohl:{n:'Riesenkohl',at:[200,470],l:[[['P','Kohl. So groß wie ein Kinderwagen.'],['N1','Finger weg! Das ist Schnobbels Rente!']]]},
  hoehleE:{n:'Höhleneingang',at:[680,420],l:[[['P','Ein Höhleneingang mit Fackeln. Kalter Wind kommt raus. Und Gemurmel.']]]},
  gang:{n:'Dunkler Gang',at:[420,430],fn(){if(FL.stollen&&!FL.recipe)return say([['P','*mit der Laterne in den Gang* ...Hallo? Pilzmeister?'],['PK','Psst! Nicht so laut, die Pilze schlafen. Zeig her...'],['PK','*schnüff* ...Traumschwamm. Edelsorte. Von Nymphenhand im Mondlicht getrocknet. Teures Zeug.'],
      ['PK','Ohne Gegengift wachst du nie mehr auf, Langer. Die Hexe kann es brauen. Sie braucht drei Dinge:'],['PK','Eine Träne von einer wirklich schönen Nymphe. Eine schwarze Krähenfeder. Und Saft aus der ältesten Birke im Wald.'],['PK','Und jetzt raus. Du störst die Pilze beim Wachsen.']],()=>{FL.recipe=1;inv.splice(inv.indexOf('pilze'),1);renderInv()});
    if(FL.recipe)return say([['PK','*aus dem Dunkeln* Träne, Feder, Birkensaft! Und leise sein!']]);this.i=(this.i||0);say(this.l[this.i++%this.l.length])},l:[[['P','Der Gang führt tiefer. Stockdunkel. Ohne Licht geh ich da nicht rein.']],[['P','Da hinten hat was gekichert. Nein. Nein, danke.']]]},
  kristalle:{n:'Kristalle',at:[640,446],l:[[['P','Lila Kristalle. Sie summen leise.'],['P','Wenn man das Ohr ranhält, hört man... Radio Moskau?']]]},
  lpilze:{n:'Leuchtpilze',at:[180,450],l:[[['P','Leuchtpilze. Hoffentlich nicht verwandt mit denen aus dem Joint.']]]},
  hsee:{n:'Unterirdischer See',at:[430,430],l:[[['P','Ein unterirdischer See. Da schwimmt was Weißes ohne Augen.'],['P','Es winkt. Ich winke nicht zurück.']]]},
  sMue:{n:'Schild: Zur alten Mühle',at:[330,344],go:'muehle',to:[700,470]},
  sMD:{n:'Schild: Zum Dorf',at:[690,486],go:'dorf',to:[340,346]},
  muehle:{n:'Alte Mühle',at:[250,414],fn(){
    if(inv.includes('gutschein'))return say([['P','*klopf klopf* Ich hab was für Sie. Einen Gutschein. Fürs Banja. Ein Abend mit Privattanz.'],['MU','...EIN WAS?! *Bretter krachen* *Nägel fliegen*'],['MU','*Tür geht einen Spalt auf* Gib her! ...Oh. Oh ja. Ich muss mich rasieren. Überall.'],['MU','Hier, drei Säcke. Das „Mehl“. Frag nicht, was drin ist. Ich frag auch nicht, was im Banja passiert.']],()=>{inv.splice(inv.indexOf('gutschein'),1);inv.push('mehl');renderInv();FL.mehl=1});
    if(FL.mehlQ&&!FL.mullerQ){FL.mullerQ=1;return say([['P','*klopf klopf* Hallo? Ich bräuchte Mehl.'],['MU','Mehl? Hab ich. Das besondere. Die Gnome sind ganz wild drauf.'],['MU','Aber umsonst gibt’s nix. Ich will was anderes. Eine Frau. Eine schöne Braut.'],['MU','Vierzig Jahre sitz ich hier allein. Mit sechs Zehen. Da kommt keine freiwillig.'],['MU','Im Banja, hinterm Irrwald, da sollen die Schönsten sein. Aber durch den Irrwald findet keiner. Nur die Hexe kennt den Weg.']])}
    if(FL.mullerQ&&!FL.mehl)return say([['MU','Bring mir was aus dem Banja! Eine Braut... oder wenigstens einen Tanz.']]);
    this.i=(this.i||0);say(this.l[this.i++%this.l.length])},l:[[['P','Die Tür ist zu. Mit Brettern vernagelt. Von innen.'],['P','Von innen. Wer nagelt eine Tür von innen zu? ...Will ich gar nicht wissen.']],[['P','Drinnen knarzt es. Wie Schritte. Oder Mahlsteine. Hoffentlich Mahlsteine.']]]},
  mrad:{n:'Wasserrad',at:[470,412],l:[[['P','Ein Wasserrad. Es dreht sich und dreht sich. Seit hundert Jahren vermutlich.'],['P','Wenn ich lange genug draufschaue, werd ich wieder high. Lieber nicht.']]]},
  rinne:{n:'Wasserrinne',at:[560,404],l:[[['P','Eine Holzrinne bringt das Wasser vom Bach zum Rad. Clever. Für 1820.']]]},
  mteich:{n:'Mühlteich',at:[440,414],l:[[['P','Unten am Rad schäumt das Wasser. Da glitzert was zwischen den Steinen.'],['P','...Ein Kronkorken. Diese Welt hat ein Müllproblem.']]]},
  mstein:{n:'Mühlsteine',at:[200,430],l:[[['P','Alte Mühlsteine. Schwer wie Omas Kuchen.']]]},
  saecke:{n:'Mehlsäcke',at:[400,462],l:[[['P','Mehlsäcke. Einer ist aufgeplatzt. Hier war jemand. Vor Kurzem.'],['P','Fußspuren im Mehl. Barfuß. Mit... sechs Zehen.']]]},
  karren:{n:'Alter Karren',at:[600,470],l:[[['P','Ein Karren mit einem Rad. Das andere ist wohl auch abgehauen.']]]},
  sIW:{n:'Schild: In den Irrwald',at:[130,476],go:'irrwald',to:[420,486]},
  sIM:{n:'Schild: Zurück zur Mühle',at:[130,488],go:'muehle',to:[150,470]},
  sIL:{n:'Weg links',at:[360,396],fn(){irrGo('L')}},sIR:{n:'Weg rechts',at:[500,396],fn(){irrGo('R')}},sIG:{n:'Weg geradeaus',at:[440,388],fn(){irrGo('G')}},
  sBM:{n:'Schild: Abkürzung zur Mühle',at:[150,486],go:'muehle',to:[150,470]},
  sBR:{n:'Ausgang',at:[690,486],go:'banjaV',to:[422,400]},
  tuerB:{n:'Tür zum Banja',at:[422,396],go:'banja',to:[300,480]},
  banjaHaus:{n:'Banja',at:[330,396],l:[[['P','Ein Blockhaus mit rosa Fenstern. Drinnen wummert Musik. Draußen wummert mein Herz.']],[['P','Aus dem Schornstein kommt Dampf. Oder Parfüm. Oder beides.']]]},
  dunkelwald:{n:'Dunkler Wald',at:[200,470],l:[[['P','Da drin glühen Augen. Gelbe. Viele.'],['P','Ich bleib schön im Licht.']],[['P','Kein Weg, kein Pfad. Nur Bäume und Schwärze. Da geh ich nicht rein.']]]},
  madame:{n:'Madame Zinaida',at:[320,470],fn(){
    if(FL.rekrut&&!FL.gutschein)return say([['Z','Nastja ist da! Ein Knaller! Sie tanzt, sie flirtet, sie trinkt die Gäste unter den Tisch. Perfekt!'],['Z','Hier, Süßer. Ein Gutschein: Ein Abend im Banja mit Privattanz. Geht aufs Haus.'],['P','Der ist nicht für mich. Ich kenn da einen Müller...'],['Z','Mir egal, wer kommt. Hauptsache, er zahlt die Getränke.']],()=>{FL.gutschein=1;inv.push('gutschein');renderInv()});
    if(FL.gutschein)return say([['Z','Nastja ist der Star! Guck dir die Show an, Süßer.']]);
    if(FL.clubQ)return say([['Z','Na? Schon eine gefunden? Denk an meine Liste. Und bring mir keine, die nur blubbert.']]);
    say([['P','Guten Abend, Madame. Ein Müller schickt mich. Er hätte gern eine... Braut.'],['Z','Eine Braut? Hier? Süßer, das ist ein Tanzlokal, kein Standesamt.'],['Z','Aber gut. Wir können uns helfen. Mir laufen die Tänzerinnen weg. Die letzte ist mit einem Gnom durchgebrannt.'],
      ['Z','Bring mir eine Neue. Aus dem Sumpf, da sitzen genug, die sich langweilen. Aber nicht irgendeine. Hier ist meine Liste.'],['Z','Wenn sie passt, kriegst du einen Gutschein. Für deinen Müller. Oder für dich.']],()=>{FL.clubQ=1;inv.push('liste');renderInv()})}},
  bar:{n:'Bar',at:[220,446],l:[[['P','Einen Kwas, bitte.'],['Z','Kwas? Hier? Süßer, hier gibt es Wodka oder Wodka.'],['P','...Dann Wodka.'],['P','*kipp* ...UARGH. Das ist kein Wodka, das ist Abflussreiniger.']],[['Z','Noch einen?'],['P','Ich seh jetzt schon doppelt. Zwei Madames. Das ist zu viel Madame.'],['Z','Süßer, von mir gibt’s nie zu viel. Frag die Feuerwehr. Die kommt jeden Freitag. Ohne Feuer.']],[['Z','Trinkgeld geht in den Ausschnitt, Beschwerden in den Sumpf.']],[['P','Nein danke. Ich muss noch durch einen Irrwald.']]]},
  buehne:{n:'Bühne',at:[600,446],fn(){if(FL.rekrut)return T.taenzerin.fn();say([['P','Heute keine Show. Die Tänzerinnen sind... ausgegangen. Für immer.']])}},
  taenzerin:{n:'Nastja (auf der Bühne)',at:[600,470],fn(){say([['P','Ich geh mal näher ran. Nur um... die Technik zu studieren.']],()=>enter('buehne',[260,486]))}},
  nastja2:{n:'Nastja',at:[400,486],fn(){if(FL.lounge)return say([['NA','Nochmal, Süßer? Die zweite Runde kostet extra. Und du hast nicht mal Trinkgeld.']]);
    say([['NA','*dreht sich an der Stange* Na, Petja? Kiefer wieder hochklappen, du sabberst auf meine Bühne.'],['NA','Guckst du nur, oder willst du mehr?'],['P','Ich... äh... Madame sagt, hier gibt’s Privattänze?'],['NA','Für den Mann, der mich aus dem Schlamm gezogen hat? Aufs Haus. Komm mit in die Lounge.']],lapDance)}},
  sBZ:{n:'Schild: Zurück an die Bar',at:[130,488],go:'banja',to:[300,480]},
  sLB:{n:'Schild: Zurück in den Club',at:[690,486],go:'banja',to:[300,480]},
  sZG2:{n:'Schild: Zum Waldweg',at:[150,484],go:'sperre',to:[505,350]},
  huette:{n:'Baba Jagas Hütte',at:[470,438],fn(){if(inv.includes('leiter'))return bjEnter();this.i=(this.i||0);say(this.l[this.i++%this.l.length])},l:[
    [['P','Schief, alt, und ich schwör, sie atmet. Die Hütte atmet.']],
    [['P','Aus dem Schornstein riecht es nach Kohl. Und nach... etwas, das kein Kohl ist.']]]},
  tuer:{n:'Tür',at:[478,436],fn(){if(inv.includes('leiter'))return bjEnter();if(!FL.bjNo){FL.bjNo=1;return say([['P','Hallo? Frau Jaga? Darf ich reinkommen?'],['J','Durch die Tür kommt hier keiner rein! Die Tür ist Dekoration!'],['J','Wer was von mir will, kommt durchs Fenster. Wenn er hochkommt. Hihihi!'],['P','Das Fenster ist drei Meter hoch. Und die Hütte steht auf Hühnerbeinen.'],['P','Ich brauch eine Leiter.']])}this.i=(this.i||0);say(this.l[this.i++%this.l.length])},l:[
    [['P','Hallo? Ich wollte nur fragen, wie man hier wieder aufwacht.'],['J','Erst klopfen, dann reden! Und die Füße abputzen!']],
    [['P','*klopf klopf*'],['J','Jetzt nicht! Der Ofen ist heiß. Komm später wieder.']]]},
  beine:{n:'Hühnerbeine',at:[492,438],l:[
    [['P','Die Beine zucken. Wie bei einem Huhn, das träumt.']],
    [['P','Ich fass da nichts an. Die treten bestimmt.']]]},
  zaun:{n:'Schädelzaun',at:[300,445],l:[
    [['P','Ein Zaun aus Schädeln. Und die Augen leuchten.']],
    [['P','Ist das Deko oder eine Warnung?'],['P','...Beides. Ganz sicher beides.']]]},
  _:{}
};
function use(id){const o=T[id];if(!o)return;if(/^slot\d$/.test(id)&&FL.clubQ&&!FL.rekrut)return interview(o);if(o.go)return enter(o.go,o.to);if(o.fn)return o.fn();o.i=o.i||0;const set=o.l[o.i%o.l.length];o.i++;say(set,o.after)}
const ITEMS={kippe:['🚬','Joint-Stummel','Lieber nicht. Sonst wach ich in einem noch schlimmeren Märchen auf.'],saege:['🪚','Säge','Eine Säge vom Fischer. Damit könnte man Birken klein machen.'],apfel:['🍎','Apfel','Ein roter Apfel. Liegt gut in der Hand. Wurfgewicht: perfekt.'],stock:['🌿','Stock','Ein gerader Ast. Daraus wird was.'],seil:['🧶','Schnur','Schnur aus einem kaputten Fischernetz.'],angel:['🎣','Angel','Selbst gebaut. Stock, Schnur, Sicherheitsnadel. Hält bestimmt.'],pilze:['🍄','Blaue Pilze','Neun blau angelaufene Pilzstücke aus dem Joint. Traumschwamm?'],karte:['🗺️','Angekokelte Karte','Baba Jagas Wegkarte: „2× links, 1× rechts, 1× geradeaus“.'],liste:['📋','Madames Liste','Gesucht: schön, tanzt gern, frech, will raus. Keine Blubberer.'],gutschein:['🎟️','Gutschein','„Ein Abend im Banja mit Privattanz“. Geht aufs Haus.'],mehl:['🥡','3 Säcke „Mehl“','Riecht nicht nach Mehl. Riecht nach Ärger.'],laterne:['🏮','Laterne','Eine Gnomlaterne. Brennt mit irgendwas Grünem.'],wuermer:['🪱','Würmer','Eine Handvoll fetter Würmer von Baba Jagas Hof. Sie zappeln in der Tasche.'],schnaps:['🍶','Selbstgebrannter','Kusmitschs Selbstgebrannter. Schon der Geruch macht blind.'],leiter:['🪜','Leiter','Opas Leiter. Angekokelt, aber stabil.'],fisch:['🐟','Fisch','Ein kleiner Fisch. Guckt komisch.'],gebiss:['🦷','Omas Gebiss','Ein Gebiss. Riecht nach Kater und Friedhof.'],brett:['🪵','Brett','Ein Brett aus Opas Ruine. Nur ein bisschen angekokelt.'],teer:['🛢️','Birkenteer','Riecht nach Lagerfeuer und Omas Rheuma.']};
function irrGo(d){const SEQ='LLRG';FL.irrs=(FL.irrs||'')+d;
  if(!SEQ.startsWith(FL.irrs)){FL.irrs='';return say([['P','Moment... den Baum kenn ich doch. Und den. Und den da auch.'],['P','Na super. Verlaufen. Zurück, bevor mich die Bäume fressen.']],()=>enter('muehle',[150,470]))}
  if(FL.irrs==SEQ){FL.irrs='';return enter('banjaV',[420,486])}
  enter('irrwald',[420,486]);setTimeout(()=>say([['P',['Bäume. Noch mehr Bäume.','War das ein Kichern?','Hier riecht es nach Parfüm... und Sauna.'][FL.irrs.length-1]]]),500)}
function bjEnter(){if(FL.drin)return enter('innen',[250,470]);say([['P','So. Leiter ans Fenster... festhalten, liebe Hühnerbeine... nicht wackeln...'],['P','*kletter* *kletter* *knarz*']],()=>{FL.drin=1;enter('innen',[250,470])})}
function repairBoat(){say([['P','Brett und Teer. Ich flick Ihnen das Boot. Erwarten Sie nicht zu viel.'],['P','*klopf* ... *schmier* ... *klopf* ... *Daumen* ... Au. Natürlich.'],['F','Junge, du bist ein Held. Das Ding hält jetzt bestimmt eine Woche.'],['F','Hier, meine Säge. Pass auf die Finger auf, die hast du ja schon geübt.'],['P','*bekommt eine Säge*']],()=>{FL.boot=1;['brett','teer'].forEach(i=>inv.splice(inv.indexOf(i),1));inv.push('saege');renderInv()})};
function renderInv(){$('#slots').innerHTML='';inv.forEach(id=>{const it=ITEMS[id]||['❔',id,id],d=document.createElement('div');d.className='slot';d.textContent=it[0];d.title=it[1];
  d.onclick=e=>{e.stopPropagation();if(!busy)say([['P',it[2]]])};$('#slots').appendChild(d)})}
