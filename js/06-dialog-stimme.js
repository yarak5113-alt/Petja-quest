// ================= Dialog =================
const N={P:['Petja','#ffb070'],K:['Krähe','#b0bcd8'],S:['Sonne','#ffe680'],M:['Fliegenpilz','#ff8a70'],B:['Birke','#c8e09a'],J:['Stimme aus der Hütte','#e0a0ff'],M1:['Mila','#a8e0b0'],W:['Wera','#c8b8f0'],D:['Dunja','#f0a070'],F:['Fischer Kusmitsch','#9cc8e0'],O:['Oma Dusja','#f0a0a0'],Z:['Madame Zinaida','#ff80c0'],MU:['Stimme aus der Mühle','#e8dcb0'],PK:['Pilzmeister Knolle','#c0e080'],MA:['Marfa','#d8a8c8'],NA:['Nastja','#c8e0ff'],WO:['Wowa','#9ad0ff'],N1:['Grobnik','#d8a060'],N2:['Opa Schnobbel','#a0b8e0'],J2:['Baba Jaga','#e0a0ff'],G:['Opa Grischa','#d8c890']};
const box=$('#box'),who=$('#who'),txt=$('#txt');
let queue=[],typing=null,full='',busy=false,done=null;
// Einstellungen (Menü → Einstellungen): Textgeschwindigkeit in ms pro Buchstabe, Leerlauf-Sprüche an/aus
// voices: 'alle' = jede Figur spricht, 'petja' = nur Petja; sfx/vox = Lautstärke Geräusche/Stimmen (0..1)
const OPT={speed:28,barks:true,voices:'alle',sfx:.6,vox:1};try{Object.assign(OPT,JSON.parse(localStorage.getItem('petjaOpts')||'{}'))}catch(e){}
function saveOpt(){try{localStorage.setItem('petjaOpts',JSON.stringify(OPT))}catch(e){}}
function say(lines,cb){queue=lines.slice();done=cb;busy=true;box.style.display='block';next()}
function next(){
  clearInterval(typing);typing=null;talking=false;box.classList.remove('done');
  if(!queue.length){box.style.display='none';busy=false;const d=done;done=null;d&&d();return}
  const [w,t]=queue.shift();who.textContent=N[w][0]+':';who.style.color=N[w][1];full=t;txt.textContent='';
  LOG.push([w,t]);if(LOG.length>120)LOG.shift();
  if(w==='P')talking=true;voice(t,w);
  let i=0;typing=setInterval(()=>{txt.textContent=t.slice(0,++i);if(i>=t.length){clearInterval(typing);typing=null;talking=false;box.classList.add('done')}},OPT.speed);
}
function advance(){if(typing){clearInterval(typing);typing=null;txt.textContent=full;talking=false;box.classList.add('done')}else next()}
// Gespräch überspringen (ESC / Rechtsklick): restliche Zeilen weg, aber was danach passieren soll (Gegenstand, Flag …) passiert trotzdem
function skipDialog(){if(!busy)return;queue.length=0;clearInterval(typing);typing=null;talking=false;if(TTS)TTS.cancel();next()}
// Gesprächsverlauf fürs Tagebuch
const LOG=[];

// ================= Stimmen & Sprüche =================
// Sprachausgabe (Browser-TTS, Deutsch). Jede Figur hat eine eigene Stimmlage: [weiblich?, Tonhöhe, Tempo]. [V] schaltet an/aus.
let VOICE_ON=true;try{VOICE_ON=localStorage.getItem('petjaVoice')!=='0'}catch(e){}
let deVoice=null,deVoiceF=null;const TTS=window.speechSynthesis;
const VOX={P:[0,.8,.95],F:[0,.6,.85],G:[0,.7,.82],N1:[0,.3,.9],N2:[0,.5,.75],MU:[0,.95,1.12],PK:[0,1.25,1.1],WO:[0,1.05,1.15],K:[0,1.8,1.3],M:[0,1.5,1.2],
  J:[1,1.7,1.0],J2:[1,1.7,1.0],O:[1,1.35,.82],Z:[1,1.0,.95],NA:[1,1.2,1.05],S:[1,1.15,.9],B:[1,.6,.78],alte:[1,.5,.7],fekla:[1,.8,.85],ustinja:[1,1.1,.9]};
function pickVoice(){if(!TTS)return;const v=TTS.getVoices().filter(v=>/^de/i.test(v.lang)),fem=/female|frau|katja|hedda|marlene|vicki|anna|petra|seraphina|amala|louisa|elke|gisela|klarissa|maja|tanja/i;
  deVoiceF=v.find(x=>fem.test(x.name))||null;deVoice=v.find(x=>!fem.test(x.name)&&/male|mann|stefan|conrad|killian|hans|florian|ralf|bernd|christoph/i.test(x.name))||v.find(x=>!fem.test(x.name))||v[0]||null}
if(TTS){pickVoice();TTS.onvoiceschanged=pickVoice}
function voice(t,w){if(!TTS)return;TTS.cancel();w=w||'P';if(!VOICE_ON||!t||(w!=='P'&&OPT.voices==='petja'))return;
  t=t.replace(/\*[^*]*\*/g,' ').replace(/\.{2,}/g,', ').replace(/[()]/g,'').trim();if(!t||!/[a-zäöüß]/i.test(t))return;
  const s=VOX[w]||[1,1.1,.95],u=new SpeechSynthesisUtterance(t);u.lang='de-DE';const vo=s[0]?(deVoiceF||deVoice):deVoice;if(vo)u.voice=vo;
  u.pitch=s[1];u.rate=s[2];u.volume=Math.max(0,Math.min(1,OPT.vox));TTS.speak(u)}
function toggleVoice(){VOICE_ON=!VOICE_ON;try{localStorage.setItem('petjaVoice',VOICE_ON?'1':'0')}catch(e){}if(!VOICE_ON&&TTS)TTS.cancel();
  toast('🔊 Stimmen: '+(VOICE_ON?'an':'aus'))}

// Leerlauf-Sprüche: Steht Petja eine Weile rum, sagt er was zum aktuellen Ort.
const BARKS={
  _:['Wenn ich hier rauskomme, rauch ich nie wieder was. ...Fast nie.','Hallo? Spieler? Ich steh hier nur rum.','Meine Füße schlafen. Wenigstens die.','Ich hab Hunger. Auf Pelmeni. Oder auf irgendwas, das nicht redet.',
    'Mama hat immer gesagt, aus mir wird nichts. Jetzt bin ich in einem Märchen. ...Na ja. Immerhin.','Wenn ich lang genug still stehe, wach ich vielleicht einfach auf.','Ich zähl bis drei, dann ist alles normal. Eins... zwei... Nein. Immer noch Märchen.',
    'Irgendwo da draußen liegt mein Körper auf einem Sofa. Hoffentlich mit Decke.','Na super. Ich steh im Wald und warte auf ein Wunder. Wie jeden Samstag.','Natürlich passiert mir das. Wem auch sonst.',
    'Ob jemand merkt, dass ich weg bin? ...Wahrscheinlich nicht. Ist auch egal. ...Ist es.','Mama ruft sonntags immer an. ...Hoffentlich geht da jemand ran. Egal. Weiter.',
    'Wenn das hier ein Traum ist, ist er schlecht geschrieben.','Ich könnte jetzt was Sinnvolles tun. Könnte.','Ich hab meine Schlüssel noch. Bringt mir hier nur nichts.',
    'Wowa schuldet mir was. Mindestens ein Bier. Eher ein Leben.','Kurze Pause. Hab ich mir verdient. Glaub ich.','Mein Handy hat keinen Empfang. Im Märchen. Wer hätte das gedacht.',
    'Wenn ich das irgendwem erzähle, glaubt mir das keiner. Gut so eigentlich.','Ich warte. Bin gut im Warten. Hab ich lange geübt.','Ein bisschen vermiss ich mein Sofa. Und den Kühlschrank. Den leeren.',
    'Wenn mir jetzt noch ein Pilz zuzwinkert, geh ich.','Meine Oma hätte hier ihren Spaß gehabt. Die mochte schräge Leute.'],
  wald:['Diese Birken flüstern über mich. Ich hör das genau.','Gestern war das hier noch mein Wohnzimmer. Glaub ich.','Ich schwör, der Fliegenpilz hat mir gerade zugezwinkert.',
    'Viel Wald. Wenig Ausgang.','Die Krähe guckt, als hätte sie Wetten auf mich laufen.','Hier hat alles angefangen. Und ich hab nicht mal ein Foto.'],
  gabel:['Links, rechts, geradeaus. Alles fühlt sich nach falsch an.','Ein Wegweiser wäre nett. Einer, der nicht lügt.','Drei Wege. Und alle wollen was von mir.','Wenn ich mich nicht entscheide, kann ich mich auch nicht falsch entscheiden. Stark.'],
  huette:['Ein Haus auf Hühnerbeinen. Ganz normal. Total normal.','Wenn die Hütte gleich wegrennt, renn ich mit.','Die Schädel am Zaun grinsen. Wenigstens hat hier wer gute Laune.',
    'Die Hütte hat gerade gegähnt. Ich bild mir das ein. ...Bestimmt.','Riecht nach Kohl und Magie. Hauptsächlich Kohl.'],
  innen:['Hier riecht alles nach Kräutern und schlechten Entscheidungen.','Ich fass hier besser nichts an. Außer vielleicht die Piroggen.','Im Regal hat sich was bewegt. Ich guck nicht hin.','Gemütlich. Für eine Hexe. Für mich eher nicht.'],
  buehne:['Laute Musik, rotes Licht. Fast wie zu Hause am Freitag.','Ganz entspannt, Petja. Hände in die Taschen.','Ich guck nur. Rein kulturell.'],
  lounge:['Ich... sollte vielleicht einfach gehen. Gleich. Bald.'],
  irrwald:['Ich bin hier schon zum dritten Mal. Oder zum ersten Mal. Dreimal.','Die Bäume stehen anders als vorhin. Ich schwör.','Wenn ich hier verhungere, bitte keine Grabrede.','Ich hätte eine Brotkrümel-Spur legen sollen. Hätte die Krähe eh gefressen.'],
  banjaV:['Rotes Licht im Wald. Sieht man auch nicht alle Tage.','Drinnen wummert der Bass. Draußen wummern die Augen im Wald. Ich geh mal lieber rein.','Ich steh vor einem Club im Märchenwald. Mein Leben hat eine sehr seltsame Richtung genommen.'],
  banja:['Dampf, Birkenzweige, Wodka. Endlich ein Ort, den ich verstehe.','Ich krieg Durst vom Zuschauen.','Die Musik ist schlecht. Aber laut. Das gleicht sich aus.','Wenn Wowa das hier sehen könnte. Er wär sofort Stammgast.'],
  dorf:['Ein Dorf. Mit Menschen. ...Hoffentlich mit Menschen.','Irgendwer hier hat bestimmt Kwas. Ich muss nur fragen.','Hier ist seit 1991 nichts passiert. Und dann kam ich.','Strommasten ohne Strom. Kenn ich. Ich wohne in so einer Wohnung.'],
  dorfstr:['Die Leute gucken mich an, als wär ich der Komische hier.','Riecht nach Rauch und Kohlsuppe. Wie bei Oma.','Eine Unterhose als Segel. Hier wird nichts verschwendet.','Die Hühner hier haben mehr Selbstbewusstsein als ich.'],
  kirche:['Pssst, Petja. Hier drin nicht fluchen.','Wenn hier einer ein Wunder braucht, dann ich.','Der Kater guckt mich an. Ich guck zurück. Er gewinnt. Wieder.','Friedhöfe sind eigentlich ganz entspannt. Keiner redet. Meistens.'],
  muehle:['Die Mühle knarzt. Oder ist das mein Rücken?','Mehl überall. Ich seh aus wie ein Gespenst. Ein hungriges.','Das Wasserrad dreht sich. Ich dreh mich auch gleich. Vom Zugucken.','Hinter der Tür atmet jemand. Schwer. Und schüchtern.'],
  sperre:['Wer hat die Birken umgeschubst? Ich war das nicht. Glaub ich.','Mit bloßen Händen krieg ich das nie weg.','Dunkel hier. So dunkel, dass ich meine eigene Faulheit nicht sehe.','Irgendwas raschelt im Unterholz. Ich nenn es Kevin. Dann ist es weniger gruselig.'],
  sumpf:['Nicht hinstarren. Nicht hinstarren. ...Mist.','Wenn ich hier einsinke, sucht mich keiner.','Es blubbert. Ich hoffe, das war der Sumpf.','Ich hab nasse Socken. Und das ist noch das Normalste hier.'],
  fischer:['Fischgeruch. Ich glaub, der wohnt jetzt in meiner Jacke.','Ein Fischer ohne Boot. Ein Petja ohne Plan. Wir passen zusammen.','Kusmitsch hat seit 1987 nichts gefangen. Ich fühl mich verstanden.','Der See glitzert. Der einzige hier, der sich Mühe gibt.'],
  ufer:['Das Wasser ist so ruhig. Viel zu ruhig.','Wenn ich jetzt reinspringe, bin ich wenigstens wach.','Schilf, Schlamm, Stille. Klingt wie ein schlechter Wellness-Urlaub.'],
  unter:['Dunkel, nass, und irgendwas tropft mir in den Kragen.','Hier unten hört mich keiner schreien. Gut zu wissen.','Über mir knarzt Kusmitsch. Unter mir knarzt der Steg. Ich knarz gleich mit.'],
  gnome:['Alles so klein hier. Ich fühl mich wie ein Riese. Ein müder Riese.','Ich hoffe, die Gnome beißen nicht. Die gucken so.','Riesenkohl und Riesennasen. Hier ist alles eine Nummer zu groß. Außer den Leuten.','Pfeifenrauch und Kohl. Fast wie bei meinem Onkel.'],
  hoehle:['Pilze an den Wänden. Na super. Genau mein Problem.','Echo. ...Echo? Keine Antwort. Nicht mal das Echo mag mich.','Die Kristalle summen. Hoffentlich nicht Radio Moskau.','Kalt hier. Und irgendwo kichert was. Ganz normale Höhle.']};
// Sprüche beim erneuten Betreten eines Ortes (beim ersten Besuch gibt es die Ortsbeschreibung)
const ENTRY={
  wald:['Zurück am Anfang. Fühlt sich nicht nach Fortschritt an.','Der Birkenwald. Riecht immer noch nach meinem Fehler.','Hallo, Krähe. Hast mich vermisst? Nein? Dachte ich mir.'],
  gabel:['Die Weggabelung. Ich kenn mich langsam aus. Schlimm eigentlich.','Wieder hier. Die Schilder lügen hoffentlich immer noch gleich.'],
  huette:['Die Hütte steht noch. Schade eigentlich.','Hühnerbeine, Schädelzaun, Kohlgeruch. Wie heimkommen. Nur schlimmer.','Hallo, Hütte. Bitte nicht weglaufen.'],
  innen:['Wieder drin. Nichts anfassen, Petja. Vor allem nicht das, was zwinkert.','Es riecht immer noch nach Socken und Magie.'],
  banjaV:['Das rote Licht. Fühlt sich schon fast vertraut an. Bedenklich.','Wieder vor dem Banja. Mein Leben ist eine Abfolge von schlechten Ideen.'],
  banja:['Zurück im Banja. Ich bin hier fast schon Stammgast. Das sollte mir zu denken geben.','Dampf, Bass, Madame. Alles wie immer.'],
  dorf:['Das Dorf. Immer noch kein Strom. Immer noch keine Überraschung.','Wieder hier. Opa Grischa riecht man schon vom Dorfeingang.'],
  dorfstr:['Die Dorfstraße. Die Oma am Gartentor guckt schon wieder.','Hühnerdreck und Sonnenblumen. Klassiker.'],
  kirche:['Der Friedhof. Der Kater ist auch noch da. Natürlich.','Zurück bei den Toten. Ruhigste Nachbarschaft im ganzen Wald.'],
  muehle:['Die Mühle. Die Tür ist immer noch zugenagelt. Von innen. Immer noch komisch.','Das Wasserrad dreht sich. Ich hätte es enttäuschend gefunden, wenn nicht.'],
  sperre:['Der dunkle Weg. Mein Lieblingsort. Nicht.','Wieder hier. Ich nehme an, die Birken haben mich vermisst.'],
  sumpf:['Der Sumpf. Ich hab die Socken noch nicht trocken von letztem Mal.','Hallo, Damen. Ich bin nur auf der Durchreise. Wie immer.'],
  fischer:['Kusmitsch sitzt da wie immer. Ich glaub, der ist festgewachsen.','Der See. Riecht nach Fisch und Resignation.'],
  ufer:['Das Ufer. Das Boot hat immer noch aufgegeben. Respekt.','Wieder am Wasser. Ich spring trotzdem nicht rein.'],
  unter:['Unterm Steg. Zieht immer noch. Tropft immer noch.','Zurück im Dunkeln. Hier sieht mich wenigstens keiner.'],
  gnome:['Die Gnome. Die Nasen sind seit letztem Mal nicht kleiner geworden.','Wieder bei den Gnomen. Ich duck mich mal lieber. Aus Respekt.'],
  hoehle:['Die Höhle. Das Kichern hinten ist auch noch da. Schön.','Kalt, feucht, Pilze. Fühlt sich an wie meine alte WG.']};
let entryT=Date.now(),entryBag={};
function entryBark(id){const pool=ENTRY[id];if(!pool||Date.now()-entryT<20000||Math.random()>.45)return;entryT=Date.now();
  let b=entryBag[id];if(!b||!b.length)b=entryBag[id]=pool.slice().sort(()=>Math.random()-.5);const line=b.pop();
  setTimeout(()=>{if(!busy&&!ovl&&!changing&&cur===id&&!$('#fg')&&!$('#cut'))say([['P',line]])},550)}
const IDLE_MS=25000;let lastAct=Date.now(),barkBag={};
function nextBark(id){const pool=(BARKS[id]||[]).concat(BARKS._);let b=barkBag[id];if(!b||!b.length){b=barkBag[id]=pool.slice().sort(()=>Math.random()-.5)}return b.pop()}
['click','keydown','mousemove'].forEach(ev=>addEventListener(ev,()=>lastAct=Date.now(),true));
setInterval(()=>{if(typeof ovl=='undefined'||typeof entryBark!='function')return;if(!OPT.barks||busy||mv||ovl||changing||!cur||$('#start')||$('#fg')||$('#cut')||document.hidden){lastAct=Date.now();return}
  if(Date.now()-lastAct<IDLE_MS)return;lastAct=Date.now();say([['P',nextBark(cur)]])},1000);
