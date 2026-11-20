// ================= Nebenaufgabe: Kusmitschs Kahn – das halbe Dorf hebt die „Swetlana“ =================
// Das Bootswrack am Ufer ist Kusmitschs alter Kahn „Swetlana“ (versunken im Sturm von ’91). Freigeschaltet, sobald Opas Haus steht.
//   1) Kusmitsch (Fischer):  erzählt vom Kahn – schwimmt er wieder, verzeiht er sogar den geklauten Schnaps (FL.kahnQ).
//   2) Oma Dusja:            gibt eine Dose Teer zum Abdichten – erst, wenn ihr warm ist (nach der Kohle, FL.omaKohle).
//   3) Opa Grischa:          der Teer ist zu zäh. Opa verdünnt ihn im Gespräch mit Selbstgebranntem und zieht danach mit.
//   4) Schmied Fjodor:       schmiedet einen Bootshaken – erst, wenn er Strom hat (FL.kabel).
//   5) Am Wrack (Ufer):      mit verdünntem Teer und Haken → abdichten, einhaken, Hau-ruck mit Opa und Fjodor → FL.kahn.
//      Kusmitsch ist versöhnt (Beziehung +60), Dorf-Ruf +10, am Ufer liegt danach der geflickte Kahn (Ufer wird neu gemalt).
// Im Ehrenbürger-Ende mit Hausbau bringt Kusmitsch dann Fisch mit (53-dorf-quests.js).

DORF_RUF.kahn=10;
{const f=REL['Fischer Kusmitsch'];REL['Fischer Kusmitsch']=()=>f()+(FL.kahn?60:0)}

// ---------- Gegenstände ----------
{const svg=b=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${b}</svg>`);
  const dose=deckel=>`<path d="M16,20L16,54C16,58 48,58 48,54L48,20Z" fill="#3a3a40" stroke="#111" stroke-width="2"/><ellipse cx="32" cy="20" rx="16" ry="5" fill="${deckel}" stroke="#111" stroke-width="2"/><rect x="16" y="30" width="32" height="12" fill="#c8a04a" stroke="#111"/><path d="M22,36H42" stroke="#3a2a14" stroke-width="2"/>`;
  ICONS.teerdose=svg(dose('#1a1a1c'));
  ICONS.teerduenn=svg(dose('#1a1a1c')+`<path d="M30,15C26,8 34,6 32,2C40,8 36,14 34,16Z" fill="#e8d8a0" stroke="#7a6a3a"/>`);
  ICONS.haken=svg(`<path d="M32,6V40C32,52 18,54 16,44" fill="none" stroke="#2a2a2e" stroke-width="7" stroke-linecap="round"/><path d="M32,6V40C32,52 18,54 16,44" fill="none" stroke="#8a8a90" stroke-width="3" stroke-linecap="round"/><circle cx="32" cy="7" r="5" fill="none" stroke="#2a2a2e" stroke-width="3"/>`);
  Object.assign(ITEMS,{teerdose:['🛢','Dose Teer','Oma Dusjas Birkenteer. Zäh wie ihre Laune vor dem Frühstück. So kriegt den keiner in die Ritzen.'],
    teerduenn:['🛢','Verdünnter Teer','Teer mit einem ordentlichen Schuss von Opas Selbstgebranntem. Riecht, als könnte er auch alleine schwimmen.'],
    haken:['🪝','Bootshaken','Von Fjodor geschmiedet, noch warm. Hält einen Kahn. Oder einen Wels. Oder Kusmitsch, wenn er reinfällt.']})}
for(const[id,it]of[['opa','teerdose'],['wrack','teerduenn'],['wrack','haken']])(ZIELE_EXTRA[id]=ZIELE_EXTRA[id]||[]).push(it);

// Was fehlt noch? Als feste Sätze (übersetzbar): Gedanke am Wrack/bei Kusmitsch und Hinweis im Auftragsbuch
const KAHN_FEHLT={teer:['(Mir fehlt noch Teer. Oma Dusja hat welchen.)','Bei Oma Dusja Teer holen.'],opa:['(Der Teer ist zu zäh. Opa soll ihn verdünnen.)','Den Teer von Opa verdünnen lassen.'],
  haken:['(Mir fehlt noch ein Haken. Den muss der Schmied machen.)','Bei Fjodor einen Bootshaken holen.']};
const kahnFehlt=()=>[has('teerduenn')?'':has('teerdose')?'opa':'teer',has('haken')?'':'haken'].filter(Boolean);

// ---------- 1) Kusmitsch ----------
wrapFn('fischer',function(orig){if(!FL.haus||(FL.ablenk&&!FL.schnaps))return orig();
  if(FL.kahn)return say([['F','*sitzt im Kahn statt auf dem Pier* Die Swetlana. Schwimmt. Und ich sitz drin wie ein Kapitän.'],['F','Setz dich dazu, Junge. Aber fass den Schnaps nicht an. Das sag ich jetzt aus Gewohnheit.']]);
  if(!FL.kahnQ)return say([['F','*starrt aufs Schilf* … Siehst du das Wrack da drüben? Das ist die Swetlana. Mein Kahn.'],['F','Sturm von ’91. Seitdem liegt sie da und ich sitz auf dem Pier wie ein Reiher ohne Beine.'],
    ...(FL.schnaps?[['F','Und DU hast mir meinen Selbstgebrannten geklaut. Glaub nicht, ich wüsste das nicht.'],['P','(Er weiß es.)','pain']]:[]),
    ['F','Wenn die Swetlana wieder schwimmt … dann vergess ich alles. Sogar die Sache mit dem Schnaps.'],['P','Was braucht man, um einen Kahn zu heben?'],
    ['F','Teer für die Löcher – die Dusja hat welchen. Einen Haken, der hält – frag den Schmied. Und Kerle, die ziehen können.'],['F','Grischa zieht alles, wenn es nach Schnaps riecht.']],
    ()=>{FL.kahnQ=1;toast('Neue Aufgabe: Kusmitschs Kahn','done','tipp')});
  const f=kahnFehlt();if(!f.length)return say([['F','Du hast alles? Dann los, ans Ufer! Bevor ich wieder nüchtern werde und es mir anders überlege.']]);
  return say([['F','Die Swetlana wartet. Ich auch. Wir sind beide nicht mehr die Jüngsten.'],...f.map(k=>['P',KAHN_FEHLT[k][0]])])});

// ---------- 2) Oma: Teer ----------
wrapFn('oma',function(orig){if(!FL.kahnQ||FL.teerdoseGeg||has('kohle')||FL.kahn)return orig();
  if(!FL.omaKohle)return hint('omaTeer',[[['P','Oma Dusja, haben Sie Teer? Für Kusmitschs Kahn.'],['O','Teer? Für den alten Fufel? Erft wird mir warm, dann wird geteilt.'],['P','(Ihr ist kalt. Wer hat hier Kohle … der Schmied.)']]],orig);
  say([['P','Oma Dusja, haben Sie noch Teer? Kusmitsch will seinen Kahn heben.'],['O','Die Fwetlana? *lacht* Da hat er mich ’72 mal rumgerudert. Bif er reingefallen ift.'],
    ['O','Hier. Birkenteer. Aber der ift zäh wie Grifcha morgenf. Den muff man verdünnen. Mit waf Fcharfem.'],['P','*bekommt eine Dose Teer*']],()=>{FL.teerdoseGeg=1;inv.push('teerdose');renderInv()})});

// ---------- 4) Fjodor: Haken ----------
wrapFn('schmied',function(orig){if(!FL.kahnQ||FL.hakenGeg||FL.kahn)return orig();
  if(has('weihwasser')||(FL.recipe&&!FL.glutQ&&!FL.glut)||(FL.kabelQ&&!FL.kabel)||(FL.kabel&&!FL.kohleGeg))return orig();   // Hauptgeschichte und Strom gehen vor
  if(!FL.kabel)return say([['P','Fjodor, Kusmitsch braucht einen Bootshaken. Für seinen Kahn.'],['SM','Haken. Später. Erst Strom. Ohne Licht schmied ich mir die Finger krumm.']]);
  say([['P','Fjodor, Kusmitsch braucht einen Bootshaken. Einen, der hält.'],['SM','Für die Swetlana? Hm.'],['SM','*hämmert, zischt, hämmert* … Da. Hält einen Kahn. Und einen Wels. Und Kusmitsch, wenn er reinfällt.'],
    ['SM','Und wenn ihr zieht, ruft mich. Zwei Hände mehr.'],['P','*bekommt einen Bootshaken*']],()=>{FL.hakenGeg=1;inv.push('haken');renderInv()})});

// ---------- 3) Opa: Teer verdünnen ----------
wrapFn('opa',function(orig){if(!FL.haus||!has('teerdose'))return orig();
  say([['P','Opa, Omas Teer ist zu zäh. Sie sagt, er muss mit was Scharfem verdünnt werden.'],['G','Mit MEINEM Selbstgebrannten? … Für Kusmitschs Kahn? Pfui Teufel.','angry'],
    ['G','*seufzt, holt einen Eimer* Na gut. Für die Swetlana. Die hat mich ’72 auch mal nach Hause gerudert.','drunk'],['G','*kippt ab, rührt, schnuppert* … Der Teer ist jetzt so dünn, der läuft dir freiwillig in jede Ritze.','drunk'],
    ['G','Und wenn ihr den Kahn zieht: ich zieh mit. Hab ich ’79 auch, mit einem Panzer.'],['P','*bekommt verdünnten Teer*']],
    ()=>{dropInv('teerdose');if(!has('teerduenn'))inv.push('teerduenn');renderInv();FL.opaZieht=1})});

// ---------- 5) Am Wrack: heben ----------
wrapFn('wrack',function(orig){
  if(FL.kahn)return say([['P','Die Swetlana. Geflickt, geteert, schwimmt. Kusmitsch hat ihr sogar den Namen nachgemalt.'],['P','(Mit Rechtschreibfehler. Aber mit Liebe.)']]);
  if(!FL.kahnQ)return orig();
  const f=kahnFehlt();if(f.length)return say([['P','Kusmitschs Swetlana. Halb im Schlamm, halb im Schilf.'],...f.map(k=>['P',KAHN_FEHLT[k][0]])]);
  kahnHeben()});
function kahnHeben(){
  say([['P','*watet ins Schilf und streicht den verdünnten Teer in jede Ritze*'],['P','(Riecht wie Opas Schuppen nach einem Feiertag.)'],
    ['SM','*stapft durchs Wasser* Haken her. *rammt ihn in den Bug* Der hält.'],['G','*krempelt die Hosen hoch* So. Wer nicht zieht, trinkt nicht mit. Auf drei!','drunk'],
    ['G','Eins … zwei … HAU-RUCK!'],['P','*zieht* HAU-RUCK!'],['SM','HAU-RUCK!'],['P','*SCHMATZ* … *BLUBB* …'],['G','Sie kommt! Sie kommt, die alte Kuh!','drunk']],()=>{
    dropInv('teerduenn');dropInv('haken');FL.kahn=1;delete cache.ufer;fade.style.opacity=1;
    setTimeout(()=>{enter('ufer',[520,440]);fade.style.opacity=0;setTimeout(()=>say([['F','*kommt den Pier runtergerannt* SWETLANA! Mädchen! Du schwimmst!'],
      ['F','*streichelt den Bug* Dreißig Jahre … Und gerochen hast du nie so gut.'],['F','Junge. Die Sache mit dem Schnaps … vergessen. Weggespült. Wir sind quitt.'],
      ['G','Und ICH krieg dafür eine Fahrt über den See. Mit Proviant.','drunk'],['SM','Ich auch. Aber ohne Proviant. Ich will ankommen.'],['P','(Das halbe Dorf in einem Kahn. Was soll da schon schiefgehen.)','smirk']],
      ()=>{rufToast(DORF_RUF.kahn);toast('Kusmitsch mag dich wieder','done','figuren')}),700)},700)})}

// ---------- Geflickter Kahn am Ufer ----------
function malKahn(){const x=lay(),X=596,Y=346;x.save();x.translate(X,Y);
  shadowAt(x,0,6,74,.45);x.fillStyle='rgba(40,60,70,.55)';x.beginPath();x.ellipse(0,6,78,9,0,0,7);x.fill();   // Wasser um den Rumpf
  const p=new Path2D('M-70,-4C-62,-24 52,-26 74,-10L68,4C30,12 -36,12 -70,-4Z');x.save();x.clip(p);wood(x,-72,-28,148,40,0);
  x.fillStyle='rgba(20,14,8,.45)';x.fillRect(-72,-6,148,20);x.restore();x.strokeStyle='#1a120a';x.lineWidth=2;x.stroke(p);
  x.strokeStyle='rgba(20,14,8,.7)';x.lineWidth=1.2;for(let i=-50;i<=50;i+=20){x.beginPath();x.moveTo(i,-16);x.lineTo(i+4,6);x.stroke()}   // Teernähte
  x.fillStyle='#e8e0c8';x.font='bold 9px Georgia';x.fillText('СВЕТЛАНА',-28,-1);
  x.strokeStyle='#4a3a2a';x.lineWidth=3;x.beginPath();x.moveTo(-30,-14);x.lineTo(30,-16);x.stroke();   // Ruderbank
  x.strokeStyle='#6a4a2a';x.lineWidth=3;x.beginPath();x.moveTo(-10,-14);x.lineTo(-48,26);x.stroke();   // Ruder
  x.restore();put(x)}
{const _p=SCN.ufer.paint;SCN.ufer.paint=function(){const r=_p.apply(this,arguments);if(FL.kahn)malKahn();return r}}

// ---------- Auftragsbuch ----------
{const _q=quests;quests=function(){const Q=_q();
  if(FL.kahnQ)Q.push({t:'Kusmitschs Kahn',neben:1,d:'Kusmitschs Kahn „Swetlana“ liegt seit ’91 im Schilf. Schwimmt er wieder, ist die Sache mit dem Schnaps vergessen.',v:1,ok:FL.kahn,
    h:FL.kahn?'':kahnFehlt().length?KAHN_FEHLT[kahnFehlt()[0]][1]:'Alles dabei. Ab zum Wrack am Ufer!'});
  return Q}}
