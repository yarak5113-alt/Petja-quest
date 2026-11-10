// ================= Dialog =================
const N={P:['Petja','#ffb070'],K:['Krähe','#b0bcd8'],S:['Sonne','#ffe680'],M:['Fliegenpilz','#ff8a70'],B:['Birke','#c8e09a'],J:['Stimme aus der Hütte','#e0a0ff'],M1:['Mila','#a8e0b0'],W:['Wera','#c8b8f0'],D:['Dunja','#f0a070'],F:['Fischer Kusmitsch','#9cc8e0'],O:['Oma Dusja','#f0a0a0'],Z:['Madame Zinaida','#ff80c0'],MU:['Stimme aus der Mühle','#e8dcb0'],PK:['Pilzmeister Knolle','#c0e080'],MA:['Marfa','#d8a8c8'],NA:['Nastja','#c8e0ff'],WO:['Wowa','#9ad0ff'],N1:['Grobnik','#d8a060'],N2:['Opa Schnobbel','#a0b8e0'],J2:['Baba Jaga','#e0a0ff'],G:['Opa Grischa','#d8c890']};
const box=$('#box'),who=$('#who'),txt=$('#txt');
let queue=[],typing=null,full='',busy=false,done=null;
// Einstellungen (Menü → Einstellungen): Textgeschwindigkeit in ms pro Buchstabe, Leerlauf-Sprüche an/aus
const OPT={speed:28,barks:true};try{Object.assign(OPT,JSON.parse(localStorage.getItem('petjaOpts')||'{}'))}catch(e){}
function saveOpt(){try{localStorage.setItem('petjaOpts',JSON.stringify(OPT))}catch(e){}}
function say(lines,cb){queue=lines.slice();done=cb;busy=true;box.style.display='block';next()}
function next(){
  clearInterval(typing);typing=null;talking=false;box.classList.remove('done');
  if(!queue.length){box.style.display='none';busy=false;const d=done;done=null;d&&d();return}
  const [w,t]=queue.shift();who.textContent=N[w][0]+':';who.style.color=N[w][1];full=t;txt.textContent='';
  if(w==='P'){talking=true;voice(t)}else voice('');
  let i=0;typing=setInterval(()=>{txt.textContent=t.slice(0,++i);if(i>=t.length){clearInterval(typing);typing=null;talking=false;box.classList.add('done')}},OPT.speed);
}
function advance(){if(typing){clearInterval(typing);typing=null;txt.textContent=full;talking=false;box.classList.add('done')}else next()}

// ================= Petjas Stimme & Sprüche =================
// Sprachausgabe für Petjas Zeilen (Browser-TTS, Deutsch). [V] schaltet an/aus.
let VOICE_ON=true;try{VOICE_ON=localStorage.getItem('petjaVoice')!=='0'}catch(e){}
let deVoice=null;const TTS=window.speechSynthesis;
function pickVoice(){if(!TTS)return;const v=TTS.getVoices().filter(v=>/^de/i.test(v.lang));deVoice=v.find(v=>/male|mann|stefan|conrad|killian|hans/i.test(v.name))||v[0]||null}
if(TTS){pickVoice();TTS.onvoiceschanged=pickVoice}
function voice(t){if(!TTS)return;TTS.cancel();if(!VOICE_ON||!t)return;
  t=t.replace(/\*[^*]*\*/g,' ').replace(/\.{2,}/g,', ').trim();if(!t||!/[a-zäöüß]/i.test(t))return;
  const u=new SpeechSynthesisUtterance(t);u.lang='de-DE';if(deVoice)u.voice=deVoice;u.pitch=.8;u.rate=.95;TTS.speak(u)}
function toggleVoice(){VOICE_ON=!VOICE_ON;try{localStorage.setItem('petjaVoice',VOICE_ON?'1':'0')}catch(e){}if(!VOICE_ON&&TTS)TTS.cancel();
  toast('🔊 Petjas Stimme: '+(VOICE_ON?'an':'aus'))}

// Leerlauf-Sprüche: Steht Petja eine Weile rum, sagt er was zum aktuellen Ort.
const BARKS={
  _:['Wenn ich hier rauskomme, rauch ich nie wieder was. ...Fast nie.','Hallo? Spieler? Ich steh hier nur rum.','Meine Füße schlafen. Wenigstens die.','Ich hab Hunger. Auf Pelmeni. Oder auf irgendwas, das nicht redet.','Mama hat immer gesagt, aus mir wird nichts. Jetzt bin ich in einem Märchen. ...Na ja. Immerhin.','Wenn ich lang genug still stehe, wach ich vielleicht einfach auf.','Ich zähl bis drei, dann ist alles normal. Eins... zwei... Nein. Immer noch Märchen.','Irgendwo da draußen liegt mein Körper auf einem Sofa. Hoffentlich mit Decke.','Na super. Ich steh im Wald und warte auf ein Wunder. Wie jeden Samstag.','Natürlich passiert mir das. Wem auch sonst.','Ob jemand merkt, dass ich weg bin? ...Wahrscheinlich nicht. Ist auch egal. ...Ist es.','Mama ruft sonntags immer an. ...Hoffentlich geht da jemand ran. Egal. Weiter.'],
  wald:['Diese Birken flüstern über mich. Ich hör das genau.','Gestern war das hier noch mein Wohnzimmer. Glaub ich.','Ich schwör, der Fliegenpilz hat mir gerade zugezwinkert.'],
  gabel:['Links, rechts, geradeaus. Alles fühlt sich nach falsch an.','Ein Wegweiser wäre nett. Einer, der nicht lügt.'],
  huette:['Ein Haus auf Hühnerbeinen. Ganz normal. Total normal.','Wenn die Hütte gleich wegrennt, renn ich mit.'],
  innen:['Hier riecht alles nach Kräutern und schlechten Entscheidungen.','Ich fass hier besser nichts an. Außer vielleicht die Piroggen.'],
  buehne:['Laute Musik, rotes Licht. Fast wie zu Hause am Freitag.','Ganz ruhig, Petja. Hände in die Taschen.'],
  lounge:['Ich... sollte vielleicht einfach gehen. Gleich. Bald.'],
  irrwald:['Ich bin hier schon zum dritten Mal. Oder zum ersten Mal. Dreimal.','Die Bäume stehen anders als vorhin. Ich schwör.'],
  banja:['Dampf, Birkenzweige, Wodka. Endlich ein Ort, den ich verstehe.','Ich krieg Durst vom Zuschauen.'],
  dorf:['Ein Dorf. Mit Menschen. ...Hoffentlich mit Menschen.','Irgendwer hier hat bestimmt Kwas. Ich muss nur fragen.'],
  dorfstr:['Die Leute gucken mich an, als wär ich der Komische hier.','Riecht nach Rauch und Kohlsuppe. Wie bei Oma.'],
  kirche:['Pssst, Petja. Hier drin nicht fluchen.','Wenn hier einer ein Wunder braucht, dann ich.'],
  muehle:['Die Mühle knarzt. Oder ist das mein Rücken?','Mehl überall. Ich seh aus wie ein Gespenst. Ein hungriges.'],
  sperre:['Wer hat die Birken umgeschubst? Ich war das nicht. Glaub ich.','Mit bloßen Händen krieg ich das nie weg.'],
  sumpf:['Nicht hinstarren. Nicht hinstarren. ...Mist.','Wenn ich hier einsinke, sucht mich keiner.'],
  fischer:['Fischgeruch. Ich glaub, der wohnt jetzt in meiner Jacke.','Ein Fischer ohne Boot. Ein Petja ohne Plan. Wir passen zusammen.'],
  ufer:['Das Wasser ist so ruhig. Viel zu ruhig.','Wenn ich jetzt reinspringe, bin ich wenigstens wach.'],
  unter:['Dunkel, nass, und irgendwas tropft mir in den Kragen.','Hier unten hört mich keiner schreien. Gut zu wissen.'],
  gnome:['Alles so klein hier. Ich fühl mich wie ein Riese. Ein müder Riese.','Ich hoffe, die Gnome beißen nicht. Die gucken so.'],
  hoehle:['Pilze an den Wänden. Na super. Genau mein Problem.','Echo. ...Echo? Keine Antwort. Nicht mal das Echo mag mich.']};
const IDLE_MS=35000;let lastAct=Date.now(),barkBag={};
function nextBark(id){const pool=(BARKS[id]||[]).concat(BARKS._);let b=barkBag[id];if(!b||!b.length){b=barkBag[id]=pool.slice().sort(()=>Math.random()-.5)}return b.pop()}
['click','keydown','mousemove'].forEach(ev=>addEventListener(ev,()=>lastAct=Date.now(),true));
setInterval(()=>{if(!OPT.barks||busy||mv||ovl||changing||!cur||$('#start')||$('#fg')||$('#cut')||document.hidden){lastAct=Date.now();return}
  if(Date.now()-lastAct<IDLE_MS)return;lastAct=Date.now();say([['P',nextBark(cur)]])},1000);
