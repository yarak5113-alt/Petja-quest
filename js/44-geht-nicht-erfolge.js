// ================= „Geht nicht“-Absagen, Erfolge und Easter Eggs =================

// ---------- 1) Falscher Gegenstand auf Figur/Objekt: abwechslungsreiche, sarkastische Absagen ----------
// Was wo passt, steht in ITEM_ZIELE (43-item-ziele.js, aus dem Code erzeugt) plus ein paar Ergänzungen von Hand.
const ZIELE_EXTRA={lueftung:['zwiebel'],pilzbeet:['spore','glut','weihwasser','blaupilze'],pope:['weihwasser','glut','spore'],pope2:['weihwasser','glut','spore'],kohl:['zwiebel','traene']};
const passt=(item,id)=>{const o=T[id];if(!o||o.deko)return false;if(o.go||isExit(o))return true;const L=(ITEM_ZIELE[id]||[]).concat(ZIELE_EXTRA[id]||[]);return L.includes(item)};
const NEIN_FIGUR=[
  'Bist du komplett durch? Das passt doch vorne und hinten nicht.',
  'Ich halt es hin. Die Figur guckt mich an wie einen Vertreter für Staubsauger.',
  'Nein. Einfach nein. Selbst im Märchen gibt es Grenzen.',
  'Das will keiner haben. Nicht mal geschenkt. Nicht mal hier.'];
const NEIN_DING=[
  'Ich reib das eine am anderen. Nichts. Außer peinlich.',
  'Bist du komplett durch? Das passt doch vorne und hinten nicht.',
  'Wenn ich das da reinstecke, ruft garantiert jemand die Miliz.',
  'Nö. Das Ding und das Ding haben sich nichts zu sagen.'];
const NEIN_SELBST=['Ich soll das … an mir benutzen? So verzweifelt bin ich noch nicht. Fast.','Nein. Mein Körper ist ein Tempel. Ein verfallener, aber trotzdem.','Ich steck mir das nicht an. Ich steck mir das nicht rein. Ich steck es zurück in die Tasche.'];
// Einige Figuren antworten selbst
const NEIN_NPC={
  oma:['O',['Was soll ich damit, Langer? Ich hab nicht mal Zähne, um mich darüber aufzuregen.','Steck das weg, bevor ich’s in den Ofen werf.']],
  opa:['G',['Sohnemann, das nehm ich nicht. Es sei denn, es brennt. Oder man kann’s trinken.','Was ist das? Kann man das rauchen? Nein? Dann weg damit.']],
  fischer:['F',['Damit? Damit fang ich nicht mal Ärger. Den hab ich schon. Dich.','Gib mir lieber meinen Schnaps wieder, Dieb.']],
  baba:['J2',['Was soll ich mit dem Krempel, Bürschchen? Ich koche Zaubertränke, keine Flohmärkte.','Noch einmal so was, und du landest im Kessel. Als Einlage.']],
  madame:['Z',['Nee, Süßer. Das kannst du dir sonst wohin stecken. Ich zeig dir auch gern, wohin.','Das ist kein Trinkgeld. Das ist eine Beleidigung.']],
  nastja2:['NA',['Was ist das, Zwiebel? Ein Geschenk? Dann üb noch ein bisschen.','Wenn du schon was in meine Hand drückst, dann bitte Geld. Oder dich.']],
  nastjaBar:['NA',['Was ist das, Zwiebel? Ein Geschenk? Dann üb noch ein bisschen.','Wenn du schon was in meine Hand drückst, dann bitte Geld. Oder dich.']],
  gnom1:['N1',['Das ist kein Mehl. Und kein Zoll. Also verschwinde.','Gnome nehmen nur zwei Dinge: Mehl und Bestechung. Das da ist keins von beiden.']]};
function zieheAuf(item,id,el){if(busy||changing)return true;if(passt(item,id))return false;
  const o=T[id],figur=!!(NEIN_NPC[id]||(el&&el.querySelector('image.spr'))||RTALK[id]);FL.neinZ=(FL.neinZ||0)+1;erfolgZaehl('nein',8);
  if(id==='petja')return say([['P',NEIN_SELBST[FL.neinZ%NEIN_SELBST.length]]]),true;
  const zeig=()=>{if(NEIN_NPC[id]&&FL.neinZ%2){const[sp,L]=NEIN_NPC[id];return say([['P',ITEMS[item]?'Hier, '+ITEMS[item][1]+'?':'Hier?'],[sp,L[FL.neinZ%L.length]]])}
    const L=figur?NEIN_FIGUR:NEIN_DING;say([['P',L[FL.neinZ%L.length]]])};
  if(o&&o.at)walkTo(o.at[0],o.at[1],zeig);else zeig();return true}

// ---------- 2) Erfolge (bleiben über alle Spielstände erhalten) ----------
const ERFOLGE=[
  ['nervensaege','Nervensäge','Zehnmal hintereinander auf dasselbe geklickt.'],
  ['matrjoschka','Russische Seele','Die versteckte Matrjoschka in der Höhle gefunden.'],
  ['socke','Wiedervereinigung','Petjas verlorene Socke im Sumpf gefunden.'],
  ['kassette','Mixtape ’98','Die Kassette hinter der Kirche gefunden.'],
  ['schatz','Schatzsucher','Alle drei versteckten Dinge gefunden.'],
  ['tourist','Tourist','15 verschiedene Kulissen-Dinge angeschaut.'],
  ['bastler','Bastler ohne Plan','5 unsinnige Dinge kombiniert.'],
  ['nein','Mit dem Kopf durch die Wand','8 Mal etwas Unpassendes angeboten.'],
  ['taxi','Taxi Petja','5 Mal per Karte gereist.'],
  ['enden','Alle Wege führen …','Alle drei Enden gesehen.']];
const ERF_KEY='petjaErfolge';
const erfolge=()=>{try{return JSON.parse(localStorage.getItem(ERF_KEY)||'[]')}catch(e){return[]}};
function erfolg(id){const a=erfolge();if(a.includes(id))return;a.push(id);try{localStorage.setItem(ERF_KEY,JSON.stringify(a))}catch(e){}
  const e=ERFOLGE.find(x=>x[0]===id);if(e)setTimeout(()=>toast('Erfolg: '+e[1],'done','trophy'),300);
  if(['matrjoschka','socke','kassette'].every(k=>a.includes(k)))erfolg('schatz')}
const erfolgZaehl=(k,n)=>{if((FL['ez_'+k]=(FL['ez_'+k]||0)+1)>=n)erfolg(k)};
// Zähler aus vorhandenen Aktionen
{const _k=kombiniere;kombiniere=function(a,b){const vor=FL.kNein||0;const r=_k.apply(this,arguments);if((FL.kNein||0)>vor)erfolgZaehl('bastler',5);return r}}
setInterval(()=>{if(typeof FL==='undefined')return;if((FL.reisen||0)>=5)erfolg('taxi');
  try{const e=JSON.parse(localStorage.getItem('petjaEnden')||'[]');if(e.length>=3)erfolg('enden')}catch(x){}},2000);
function openErfolge(){const a=erfolge();const o=openO(`<div class="pan menu erfolge"><button class="x" title="Schließen (ESC)">${ic('close')}</button><h3>${ic('trophy')} Erfolge <small>${a.length} / ${ERFOLGE.length}</small></h3>
  ${ERFOLGE.map(([id,n,t])=>a.includes(id)?`<div class="erf ok"><b>${ic('trophy')} ${n}</b><span>${t}</span></div>`:`<div class="erf"><b>${ic('trophy')} ???</b><span>Noch nicht gefunden.</span></div>`).join('')}</div>`,'menuO');
  o.querySelector('.x').onclick=()=>closeO()}
{const _om=openMenu;openMenu=function(view){const r=_om.apply(this,arguments);const v=view||'m';if(v!=='m'||!ovl)return r;
  const ein=ovl.querySelector('button[data-v="o"]');if(ein&&!ovl.querySelector('[data-v="erf"]')){const b=document.createElement('button');b.className='mb';b.dataset.v='erf';b.innerHTML=ic('trophy')+' Erfolge';b.onclick=()=>openErfolge();ein.before(b)}return r}}
(function(){const css=document.createElement('style');css.textContent=`.erfolge{max-width:460px}.erfolge h3 small{opacity:.6;font-weight:normal;margin-left:6px}
.erfolge .erf{display:flex;flex-direction:column;gap:2px;padding:7px 4px;border-bottom:1px solid rgba(200,148,58,.25);opacity:.5}.erfolge .erf.ok{opacity:1}
.erfolge .erf b{color:#ffd25a;font:bold 14px Georgia,serif}.erfolge .erf span{font:italic 13px Georgia,serif;opacity:.85}.erfolge .erf .ico,.erfolge .erf svg{width:16px;height:16px;vertical-align:-3px}`;document.head.appendChild(css)})();

// ---------- 3) Easter Eggs ----------
// a) zehnmal hintereinander dasselbe anklicken
const ZEHN=['Zehnmal. Ich hab zehnmal draufgeklickt. Da werden Sie geholfen? Nein. Hier wird keinem geholfen.',
  'Elf, zwölf … Ich hör jetzt auf. Wirklich. Gleich.'];
{let letzt=null,n=0;const _u=use;use=function(id){if(id===letzt)n++;else{letzt=id;n=1}const r=_u.apply(this,arguments);
  if(n===10){setTimeout(()=>{const z=()=>{if(busy)return setTimeout(z,300);say([['P',ZEHN[0]]]);erfolg('nervensaege')};z()},200)}
  const o=T[id];if(o&&o.deko){const s=new Set(FL.dekoSeen||[]);s.add(id);FL.dekoSeen=[...s];if(s.size>=15)erfolg('tourist')}return r}}
// b) versteckte Dinge in Bildschirmecken (winzig, ohne Quest-Bezug)
const VERSTECK=[
  ['hoehle','matrjoschka','Matrjoschka',[772,470],g=>`<ellipse cx="0" cy="2" rx="5" ry="6" fill="#c0302a" stroke="#2e1c10" stroke-width="1"/><circle cx="0" cy="-5" r="3.6" fill="#c0302a" stroke="#2e1c10" stroke-width="1"/><circle cx="0" cy="-5" r="2.2" fill="#f0d8b8"/><ellipse cx="0" cy="3" rx="2.6" ry="2.4" fill="#f0c040"/>`,
    ['Eine Matrjoschka. Ich mach sie auf. Noch eine. Und noch eine. Und noch eine.','Ganz innen ein Zettel: „Geh raus und triff Leute.“ … Mama, bist du das?']],
  ['sumpf','socke','Socke',[28,478],g=>`<path d="M-6,-6L1,-6L1,2L6,2Q8,6 4,7L-4,7Q-7,6 -6,2Z" fill="#e8e4dc" stroke="#2e1c10" stroke-width="1"/><path d="M-6,-3L1,-3M-6,0L1,0" stroke="#c0302a" stroke-width="1.2"/>`,
    ['Meine Socke! Die hab ich 2019 in der Waschmaschine verloren.','Sie war die ganze Zeit hier. Im Sumpf. Das erklärt so einiges über Waschmaschinen.']],
  ['kirche','kassette','Kassette',[786,452],g=>`<rect x="-8" y="-5" width="16" height="10" rx="1.5" fill="#2a2a2e" stroke="#2e1c10" stroke-width="1"/><rect x="-6" y="-3" width="12" height="4" fill="#e8d8a8"/><circle cx="-3" cy="2.6" r="1.6" fill="#888"/><circle cx="3" cy="2.6" r="1.6" fill="#888"/>`,
    ['Eine Kassette. Aufschrift: „Mixtape ’98 – nicht überspielen!!!“','Ohne Rekorder nutzlos. Wie alles aus ’98. Mich eingeschlossen.']]];
{const NS='http://www.w3.org/2000/svg';VERSTECK.forEach(([room,erf,n,[x,y],svg,lines])=>{const r=document.getElementById('r-'+room);if(!r)return;const id='geheim_'+erf;
  T[id]={n,geheim:1,fn(){say(lines.map(t=>['P',t]),()=>erfolg(erf))}};
  const g=document.createElementNS(NS,'g');g.setAttribute('class','interactive geheim');g.dataset.id=id;g.setAttribute('transform',`translate(${x},${y})`);
  g.innerHTML=`<rect x="-11" y="-11" width="22" height="22" fill="transparent"/>`+svg();r.appendChild(g)})}

// Steuerung (Menü → Steuerung): neue Taschen-Bedienung ergänzen
if(typeof KEYS!=='undefined')KEYS.splice(1,0,['Klick / Rechtsklick auf Gegenstand','Untersuchen'],['Gegenstand ziehen','Auf anderen Gegenstand: kombinieren · auf Figur/Ding: benutzen']);
