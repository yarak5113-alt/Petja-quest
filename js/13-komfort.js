// ================= Komfort: Autosave, Weiterspielen, Überspringen, Minispiel-Hilfe, Nymphen-Hinweis, zweite Sprüche =================

// ----- Automatisch speichern: bei jedem Ortswechsel, bei jedem Fortschritt (Gegenstand, Auftrag, Gespräch), alle 20 s und beim Schließen -----
let autoSig=null,autoT=0;
const autoOk=()=>cur&&!busy&&!changing&&!$('#start')&&!$('#fg')&&!$('#cut');
function autoBadge(){let b=$('#autoS');if(!b){b=document.createElement('div');b.id='autoS';b.innerHTML=ic('save','sm')+' gespeichert';
    b.style.cssText='position:absolute;right:12px;bottom:12px;z-index:40;padding:4px 10px;border-radius:12px;background:rgba(20,14,8,.75);color:#f0e0c0;font:13px Georgia,serif;opacity:0;transition:opacity .4s;pointer-events:none';
    ($('#game')||document.body).appendChild(b)}
  b.style.opacity=1;clearTimeout(b._t);b._t=setTimeout(()=>b.style.opacity=0,1400)}
setInterval(()=>{if(!autoOk())return;const s=snapState(),sig=JSON.stringify([s.cur,s.inv,s.FL,s.REM,s.ti]),now=Date.now();
  if(sig!==autoSig){if(autoSave()){const first=autoSig===null;autoSig=sig;autoT=now;if(!first)autoBadge()}}
  else if(now-autoT>20000){if(autoSave())autoT=now}},1000);
addEventListener('pagehide',()=>{if(cur&&!$('#start')&&!$('#cut'))autoSave()});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&cur&&!$('#start')&&!$('#cut'))autoSave()});

// ----- „Weiterspielen“ im Startmenü: lädt den neuesten Spielstand (automatisch oder manuell) -----
function latestSave(){const c=[];const a=autoSlot();if(a)c.push(['auto',a]);slots().forEach((d,i)=>{if(d)c.push([i,d])});
  if(!c.length)return null;c.sort((x,y)=>(y[1].ts||0)-(x[1].ts||0));return c[0][0]}
(function(){const st=$('#start');if(!st||latestSave()===null)return;const tb=st.querySelector('.tbox'),b=document.createElement('button');
  b.id='bCont';b.innerHTML=ic('next')+' Weiterspielen';b.disabled=true;tb.insertBefore(b,$('#bNew'));st.classList.add('hascont');
  const ready=setInterval(()=>{const n=$('#bNew');if(!n||!n.disabled){b.disabled=false;clearInterval(ready)}},200);
  b.onclick=e=>{e.stopPropagation();const k=latestSave();if(k!==null)loadGame(k)}})();

// ----- Gespräch überspringen per Rechtsklick (ESC steht in 09-menue-speichern.js) -----
game.addEventListener('contextmenu',e=>{e.preventDefault();if(busy&&!ovl)skipDialog()});

// ----- Minispiele: Nach 3 Fehlversuchen darf man überspringen -----
// ok(): woran man erkennt, dass es geklappt hat; win(): dasselbe Ergebnis wie ein Sieg im Minispiel
const MG={
  fishing:{n:'Angeln',ok:()=>FL.fisch,win(){FL.fisch=1;inv.push('fisch');renderInv();say([['P','*zieht einfach mit aller Kraft* ...Oh. Ein Fisch. Hat sich wohl selbst erbarmt.'],['F','Der ist ja winzig. Den hätt ich zurückgeworfen.'],['P','Der ist für einen Kater, nicht für Sie.']])}},
  wels:{n:'Der Wels',ok:()=>FL.ablenk,win(){FL.ablenk=1;say([['P','*hält die Schnur einfach fest und wartet*'],['F','(von oben) WAS?! Es zieht! ES ZIEHT! Das ist ER! DER WELS!'],['F','Komm her, du Mistvieh! Dreißig Jahre hab ich auf dich gewartet!'],['P','Perfekt. Der ist jetzt eine Weile beschäftigt.'],['P','Und seine Flasche steht ganz allein auf dem Pier…']])}},
  tableGame:{n:'Joint zerlegen',ok:()=>FL.pilze,win(){inv.splice(inv.indexOf('kippe'),1);inv.push('pilze');renderInv();FL.pilze=1;say([['P','*zupft ganz langsam alles auseinander* ...So. Neun Stück. Alle blau angelaufen.'],['J2','Bring sie her, Bürschchen. Lass die alte Jaga mal schnüffeln.']])}}};
Object.keys(MG).forEach(name=>{const orig=window[name],m=MG[name];if(typeof orig!='function')return;
  const run=()=>{orig();const iv=setInterval(()=>{if($('#fg'))return;clearInterval(iv);if(m.ok())return;
    const f=FL['fail_'+name]=(FL['fail_'+name]||0)+1;if(f==3)setTimeout(()=>toast('Beim nächsten Versuch kannst du „'+m.n+'“ überspringen.',0,'tipp'),400)},200)};
  window[name]=function(){if((FL['fail_'+name]||0)<3)return run();
    const o=openO(`<div class="pan menu"><h3>${ic('dice')} ${m.n}</h3><p class="em">Klappt nicht so recht? Kein Problem – du kannst das Minispiel auch überspringen.</p>
      <button class="mb big" data-m="try">${ic('retry')} Nochmal versuchen</button><button class="mb" data-m="skip">${ic('skip')} Überspringen</button></div>`,'menuO');
    o.querySelector('[data-m=try]').onclick=()=>{closeO();run()};o.querySelector('[data-m=skip]').onclick=()=>{closeO();m.win()}}});

// ----- Sumpf: Ist die Richtige gerade nicht da, merkt Petja das -----
const _enterK=enter;enter=function(id,pos){_enterK(id,pos);if(id==='sumpf')setTimeout(nymphCheck,1200)};
function nymphCheck(){if(cur!=='sumpf'||!FL.clubQ||FL.rekrut)return;const ni=NYMPHS.findIndex(n=>n.id==='nastja');if(ni<0||nextNymphs.includes(ni))return;
  let tries=0;const w=setInterval(()=>{if(cur!=='sumpf'){clearInterval(w);return}if(busy||ovl||changing){if(++tries>40)clearInterval(w);return}clearInterval(w);
    hint('nymphWeg',[[['P','Mhh. Keine von denen sieht nach Madames Liste aus. Zu alt, zu nass oder zu tot.']],
      [['P','Vielleicht sitzen beim nächsten Mal andere hier. Kurz raus und wieder rein. Die wechseln sich bestimmt ab.']]])},250)}

// ----- Zweiter Spruch für Dinge, die bisher nur einen hatten -----
const MORE={
  netz:[['P','Wenn ich lange genug hinschaue, sieht das Netz aus wie mein Lebenslauf. Viele Löcher, nix gefangen.']],
  haus1:[['P','Auf der Fensterbank steht noch ein Kaktus. Der hat als Einziger durchgehalten.']],
  omahaus:[['P','Aus dem Fenster riecht es nach Kohlsuppe. Und nach Vorwürfen.']],
  ruine:[['P','Ein Haus ohne Haus. Nur Ofen. Hat was Ehrliches.']],
  laden:[['P','Im Schaufenster liegt eine Dose Sprotten von 1991. Die ist bestimmt noch gut. Bestimmt.']],
  leer:[['P','Durch einen Spalt sieht man einen Fernseher. Er läuft. Ohne Strom. Ich frag nicht.']],
  brunnen:[['P','Ich könnte was reinwerfen und mir was wünschen. Aber ich hab nur Dreck an den Fingern. Und keine Wünsche, die ein Brunnen erfüllen kann.']],
  kirche:[['P','Die Zwiebel glänzt so, die putzt bestimmt jemand. Jeden Tag. Aus Trotz.']],
  galja:[['P','Gerade hat drinnen jemand „Tor!“ gebrüllt. Seit 1987 vermutlich auch.']],
  waesche:[['P','Die Socken an der Leine sind trockener als meine. Neidisch bin ich trotzdem nicht. ...Doch.']],
  glocke:[['P','Wenn ich jetzt läuten könnte, würde ich’s machen. Nur um zu sehen, wer rauskommt.']],
  graeber:[['P','Ruhig hier. Keiner will was von mir. Fast schon angenehm.']],
  wrack:[['P','Ein Mahnmal für alle, die „mach ich morgen“ sagen. Also für mich.']],
  muell:[['P','Ich würd ja aufräumen. Aber dann wüsste Kusmitsch nicht mehr, wer er ist.']],
  regal:[['P','Auf einem Glas steht „Nicht öffnen“. Auf dem daneben „Wirklich nicht“.']],
  besen:[['P','Er zuckt, wenn ich vorbeigehe. Wir sind uns einig: Wir mögen uns nicht.']],
  kohl:[['P','Wenn man den Kohl ganz leise anklopft, klingt er wie eine Trommel. Ich klopf lieber nicht.']],
  hoehleE:[['P','Aus der Höhle kommt kalte Luft. Und ein Geruch wie aus dem Keller meiner Oma.']],
  kristalle:[['P','Jetzt läuft Schlager. Ganz leise. Ich geh lieber weiter.']],
  lpilze:[['P','Die leuchten im Takt. Als würden sie mich auslachen.']],
  hsee:[['P','Das weiße Ding ist näher gekommen. Ich tu so, als hätte ich nichts gesehen.']],
  mrad:[['P','Rauschen, knarzen, drehen. Wie mein Kopf nach Wowas Party.']],
  rinne:[['P','Ein Blatt fährt die Rinne runter. Es hat mehr Ziel im Leben als ich.']],
  mteich:[['P','Ein Frosch guckt mich an. Ich guck zurück. Unentschieden.','frage']],
  mstein:[['P','Einer hat einen Riss. Wie mein Rücken nach dem Banja.']],
  saecke:[['P','Auf einem Sack steht „MEHL“. Mit drei Ausrufezeichen. Sehr überzeugend.']],
  karren:[['P','Mit einem Rad kommt der nicht weit. Kenn ich.']]};
Object.entries(MORE).forEach(([k,l])=>{const o=T[k];if(o&&o.l&&o.l.length==1&&!o.fn)o.l.push(l)});
