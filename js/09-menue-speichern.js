// ================= Menü, Speichern, Inventar & Aufträge, Karte =================
const REM=[];function rm(id){const e=document.getElementById(id);if(e)e.remove();if(!REM.includes(id))REM.push(id)}
const LOCN={wald:'Birkenwald',gabel:'Weggabelung',huette:'Baba Jagas Hütte',innen:'Hütte (innen)',buehne:'Bühnenrand',lounge:'Private Lounge',irrwald:'Irrwald',banjaV:'Vor dem Banja',banja:'Banja',dorf:'Dorfeingang',dorfstr:'Dorfstraße',kirche:'Kirche',muehle:'Alte Mühle',sperre:'Birkensperre',sumpf:'Sumpf',fischer:'Fischerhaus',ufer:'Ufer',unter:'Unter dem Pier',gnome:'Gnomsiedlung',hoehle:'Höhle'};
const has=i=>inv.includes(i);
function quests(){const Q=[];
  Q.push({t:'Raus aus dem Märchen',d:'Irgendwas stimmt nicht. Ich muss hier wieder aufwachen.',v:1,ok:0,s:[
    {t:'Jemanden finden, der sich hier auskennt',v:1,ok:seen.huette},
    {t:'In Baba Jagas Hütte kommen',v:FL.bjNo,ok:FL.drin},
    {t:'Herausfinden, was mit mir los ist',v:FL.drin,ok:FL.recipe},
    {t:'Zutaten für das Gegengift besorgen',v:FL.recipe,ok:0,s:[{t:'Eine Träne',v:FL.recipe,ok:0},{t:'Eine Feder',v:FL.recipe,ok:0},{t:'Ein besonderer Saft',v:FL.recipe,ok:0}]}]});
  Q.push({t:'Das Pilzlabor',d:'Jemand in der Höhle kennt sich mit Pilzen aus. Aber umsonst ist nichts.',v:FL.labQ,ok:FL.recipe,s:[{t:'In den Stollen kommen',v:FL.labQ,ok:FL.stollen,s:[
    {t:'Den Wegezoll besorgen',v:FL.mehlQ,ok:FL.mehl,s:[{t:'Ein Wunsch des Müllers',v:FL.mullerQ,ok:FL.gutschein||FL.mehl,s:[{t:'Den Weg nicht verlieren',v:FL.mullerQ,ok:FL.karte},{t:'Das Banja finden',v:FL.mullerQ,ok:seen.banja},{t:'Eine Neue für Madame',v:FL.clubQ,ok:FL.rekrut}]}]}]},
    {t:'Die Pilze untersuchen lassen',v:FL.stollen,ok:FL.recipe}]});
  Q.push({t:'Der versperrte Weg',d:'Umgestürzte Birken versperren den Weg zum Sumpf.',v:seen.sperre,ok:FL.cut,s:[
    {t:'Etwas zum Zerkleinern finden',v:seen.sperre,ok:has('saege')||FL.cut},
    {t:'Dem Fischer einen Gefallen tun',v:FL.auftrag,ok:FL.boot,s:[{t:'Ein Brett',v:FL.auftrag,ok:has('brett')||FL.boot},{t:'Etwas zum Abdichten',v:FL.auftrag,ok:has('teer')||FL.boot}]},
    {t:'Den Weg freiräumen',v:has('saege')||FL.cut,ok:FL.cut}]});
  Q.push({t:'Omas Gebiss',d:'Oma hat etwas verloren. Ohne das gibt’s keinen Teer.',v:FL.gq,ok:FL.teer,s:[
    {t:'Das Gebiss finden',v:FL.gq,ok:FL.ks},
    {t:'Den Wächter loswerden',v:FL.ks,ok:FL.kater,s:[{t:'Etwas, das er nicht ablehnen kann',v:FL.ks,ok:FL.fisch||FL.kater},
      {t:'Selbst ist der Mann',v:FL.angelQ,ok:has('angel')||FL.fisch||FL.kater,s:[{t:'Ein Stock',v:FL.angelQ,ok:FL.ast},{t:'Eine Schnur',v:FL.angelQ,ok:REM.includes('altnetzG')}]}]},
    {t:'Das Gebiss zurückbringen',v:has('gebiss')||FL.teer,ok:FL.teer}]});
  Q.push({t:'Hoch hinaus',d:'Durch die Tür kommt man bei Baba Jaga nicht rein.',v:FL.bjNo,ok:FL.leiter||FL.drin,s:[
    {t:'Jemanden mit einer Leiter finden',v:FL.bjNo,ok:FL.leiterQ},
    {t:'Den Preis bezahlen',v:FL.leiterQ,ok:FL.leiter,s:[{t:'An die Flasche kommen',v:FL.schnapsQ,ok:FL.schnaps},{t:'Für Ablenkung sorgen',v:FL.schnapsQ,ok:FL.ablenk},{t:'Ein Köder für etwas Großes',v:FL.schnapsQ,ok:FL.tied||FL.ablenk,s:[{t:'Würmer sammeln – vor Baba Jagas Hütte ist die Erde feucht',v:FL.schnapsQ,ok:has('wuermer')||FL.tied||FL.ablenk},{t:'Die Würmer an Kusmitschs Schnur unterm Steg hängen',v:has('wuermer')||FL.tied,ok:FL.tied||FL.ablenk}]}]}]});
  Q.push({t:'Der Joint',d:'Baba Jaga will wissen, was drin war.',v:FL.drin,ok:FL.bjInfo,s:[{t:'Den Joint untersuchen',v:FL.drin,ok:FL.pilze},{t:'Das Ergebnis zeigen',v:FL.pilze,ok:FL.bjInfo}]});
  return Q.filter(q=>q.v)}
// Offene Blätter des Auftragsbaums; der tiefste (konkreteste) zuerst, bei Gleichstand der neuere Auftrag
function nextSteps(Q){const out=[];const walk=(q,d,top)=>{if(!q.v||q.ok)return;const kids=(q.s||[]).filter(c=>c.v&&!c.ok);if(!kids.length)out.push({q,d,top});else kids.forEach(c=>walk(c,d+1,top))};
  (Q||quests()).forEach((q,i)=>walk(q,0,i));return out.sort((a,b)=>b.d-a.d||b.top-a.top)}
function qTree(list,lv,NEXT){return list.filter(q=>q.v).map(q=>`<div class="q l${lv} ${q.ok?'done':''} ${q===NEXT?'next':''}"><span>${q.ok?'✔':q===NEXT?'➤':'○'} ${q.t}</span>${q.d&&lv==0?`<i>${q.d}</i>`:''}${q.s&&!q.ok?qTree(q.s,lv+1,NEXT):''}</div>`).join('')}
let ovl=null;function closeO(){if(ovl){ovl.remove();ovl=null}}
function openO(html,cls){closeO();ovl=document.createElement('div');ovl.className='ovl '+(cls||'');ovl.innerHTML=html;ovl.onclick=e=>{e.stopPropagation();if(e.target===ovl)closeO()};
  ovl.querySelectorAll('.x').forEach(b=>b.onclick=closeO);$('#game').appendChild(ovl);return ovl}
// ===== Tagebuch: Taschen | Aufträge | Karte =====
const BOOKT=[['tasche','🎒','Taschen','I'],['auftrag','📜','Aufträge','J'],['karte','🗺️','Karte','M'],['log','💬','Gespräche','L']];
// Gesprächsverlauf: die letzten Sätze zum Nachlesen, Regieanweisungen kursiv
function logHTML(){if(!LOG.length)return'<p class="empty">💬<br><span class="em">Noch hat niemand was gesagt.</span></p>';
  const esc=s=>s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])).replace(/\*([^*]+)\*/g,'<i>$1</i>');
  return'<div class="log">'+LOG.map(([w,t])=>`<p><b style="color:${(N[w]||['?','#ccc'])[1]}">${(N[w]||[w])[0]}:</b> ${esc(t)}</p>`).join('')+'</div>'}
function openBook(tab){tab=tab||'tasche';let body='';
  if(tab=='tasche')body=inv.length?`<div class="grid">${inv.map(id=>{const it=ITEMS[id]||['❔',id,id];return`<button class="card" data-i="${id}"><b>${IMG(id)}</b><span>${it[1]}</span></button>`}).join('')}</div>
      <div class="detail"><span class="em">Klick auf einen Gegenstand, um ihn anzusehen.</span></div>`:'<p class="empty">🕸️<br>Leer. Wie mein Kühlschrank.<br><span class="em">Sammle Dinge ein, indem du sie in der Welt anklickst.</span></p>';
  if(tab=='auftrag'){const Q=quests(),ns=nextSteps(Q),NEXT=ns[0]&&ns[0].q,open=Q.filter(q=>!q.ok),fin=Q.filter(q=>q.ok);
    body=`${NEXT?`<div class="nextbox"><small>Nächster Schritt</small>➤ ${NEXT.t}</div>`:''}${qTree(open,0,NEXT)||'<p class="em">Gerade nichts offen.</p>'}
      ${fin.length?`<details class="fin"><summary>Erledigt (${fin.length})</summary>${qTree(fin,0)}</details>`:''}`;if(typeof badge=='function')badge('auftrag',0)}
  if(tab=='log')body=logHTML();
  if(tab=='karte')body=mapSVG()+`<p class="legend"><span class="lg here"></span> Du bist hier <span class="lg"></span> Besucht <span class="lg unk">?</span> Noch unerkundet</p>`;
  if(tab=='tasche'&&typeof badge=='function')badge('tasche',0);
  const o=openO(`<div class="pan book"><div class="tabs">${BOOKT.map(([k,ic,t,key])=>`<button class="tab ${k==tab?'on':''}" data-tab="${k}">${ic} ${t} <kbd>${key}</kbd></button>`).join('')}<button class="x" title="Schließen (ESC)">✕</button></div>
    <div class="bbody b-${tab}">${body}</div></div>`,'bookO');o.dataset.book=tab;if(tab=='log'){const bb=o.querySelector('.bbody');bb.scrollTop=bb.scrollHeight}
  o.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>openBook(b.dataset.tab));
  o.querySelectorAll('.card').forEach(c=>c.onclick=()=>{o.querySelectorAll('.card').forEach(k=>k.classList.toggle('sel',k===c));const it=ITEMS[c.dataset.i];
    o.querySelector('.detail').innerHTML=it?`<b class="big">${IMG(c.dataset.i)}</b><div><h4>${it[1]}</h4><p>${it[2]}</p></div>`:''})}
function openInv(){openBook('tasche')}function openMap(){openBook('karte')}
function toggleBook(tab){if(ovl&&ovl.dataset.book==tab)closeO();else openBook(tab)}
const MAPN={irrwald:[-22,10],banjaV:[-22,36],banja:[-22,62],muehle:[10,10],dorf:[42,10],dorfstr:[74,10],kirche:[106,10],huette:[42,36],innen:[74,36],wald:[10,62],gabel:[42,62],sperre:[74,62],sumpf:[106,62],fischer:[74,88],ufer:[106,88],unter:[106,112],gnome:[138,88],hoehle:[170,88]};
const MAPE=[['muehle','irrwald'],['irrwald','banjaV'],['banjaV','banja'],['banjaV','muehle'],['wald','gabel'],['gabel','huette'],['gabel','sperre'],['huette','dorf'],['huette','innen'],['dorf','dorfstr'],['dorfstr','kirche'],['dorf','muehle'],['sperre','sumpf'],['sperre','fischer'],['fischer','ufer'],['ufer','unter'],['ufer','gnome'],['gnome','hoehle']];
// Karte: besuchte Orte, Wege dazwischen, und angrenzende unerkundete Orte als „?“
function mapSVG(){const P2=id=>MAPN[id],unk={};let s=`<svg viewBox="-44 -2 232 124" class="map">`;
  MAPE.forEach(([a,b])=>{if(!seen[a]&&!seen[b])return;const both=seen[a]&&seen[b];if(!both)unk[seen[a]?b:a]=1;
    s+=`<line x1="${P2(a)[0]}" y1="${P2(a)[1]}" x2="${P2(b)[0]}" y2="${P2(b)[1]}" stroke="${both?'#a8885a':'#5a4a34'}" stroke-width="${both?1.4:1}" stroke-dasharray="${both?'none':'1.5 1.5'}"/>`});
  Object.keys(unk).forEach(id=>{const[x,y]=P2(id);s+=`<circle cx="${x}" cy="${y}" r="2.6" fill="#2a2016" stroke="#6a5a40" stroke-width=".5"/><text x="${x}" y="${y+1.2}" font-size="3.4" text-anchor="middle" fill="#8a7a5a">?</text>`});
  Object.keys(MAPN).forEach(id=>{if(!seen[id])return;const[x,y]=P2(id),c=id==cur;
    s+=`${c?`<circle class="pulse" cx="${x}" cy="${y}" r="4" fill="none" stroke="#ff6040" stroke-width=".8"/>`:''}<circle cx="${x}" cy="${y}" r="${c?3.2:2.4}" fill="${c?'#e04020':'#d8b070'}" stroke="#2a1a0a" stroke-width=".6"/>
      <text x="${x}" y="${y+6.4}" font-size="${c?3.6:3.1}" font-weight="${c?'bold':'normal'}" text-anchor="middle" fill="${c?'#ffd890':'#f0e0c0'}" stroke="#1a1008" stroke-width=".6" paint-order="stroke">${LOCN[id]}</text>`});
  return s+'</svg>'}
const SKEY='petjaQuestSave';
function slots(){try{return JSON.parse(localStorage.getItem(SKEY)||'[]')}catch(e){return[]}}
function snapState(){return{inv:[...inv],FL:{...FL},seen:{...seen},cur,P:{x:P.x,y:P.y},REM:[...REM],ti:Object.fromEntries(Object.entries(T).map(([k,o])=>[k,o.i||0])),date:new Date().toLocaleString('de-DE'),ts:Date.now()}}
function saveGame(n){if(!cur)return;const d=snapState();
  const a=slots();a[n]=d;try{localStorage.setItem(SKEY,JSON.stringify(a));return true}catch(e){return false}}
// Automatisch speichern (bei jedem Ortswechsel, siehe 13-komfort.js)
const AKEY='petjaQuestAuto';
function autoSlot(){try{return JSON.parse(localStorage.getItem(AKEY)||'null')}catch(e){return null}}
function autoSave(){if(!cur||$('#start'))return false;try{localStorage.setItem(AKEY,JSON.stringify(snapState()));return true}catch(e){return false}}
function loadGame(n){const d=n==='auto'?autoSlot():slots()[n];if(d)loadState(d)}
function loadState(d){closeO();if($('#start'))rm('start');
  // alte Spielstände: Knochen wurde zu Würmern
  d.inv=d.inv.map(i=>i=='knochen'?'wuermer':i);d.REM=d.REM.map(r=>r=='knochenG'?'wuermerG':r);
  inv.length=0;inv.push(...d.inv);Object.keys(FL).forEach(k=>delete FL[k]);Object.assign(FL,d.FL);Object.assign(seen,d.seen);d.REM.forEach(rm);
  Object.entries(d.ti||{}).forEach(([k,v])=>{if(T[k])T[k].i=v});if(FL.cut){const h=$('[data-id=sHolz]');if(h)h.style.display='none'}
  for(const k in cache)delete cache[k];renderInv();busy=false;box.style.display='none';enter(d.cur,[d.P.x,d.P.y])}
// ===== Pausemenü =====
const KEYS=[['Linksklick','Laufen, ansehen, benutzen, sprechen'],['Klick / Leertaste im Dialog','Text weiter'],['ESC / Rechtsklick im Dialog','Gespräch überspringen'],['➜ Schilder & Türen','Zu einem anderen Ort'],['Leertaste (halten)','Alles Klickbare zeigen'],['H','Tipp: Was soll ich als Nächstes tun?'],['I','Taschen'],['J','Aufträge'],['M','Karte'],['L','Gesprächsverlauf'],['V','Stimmen an/aus'],['F','Vollbild'],['ESC','Menü / schließen']];
const SPEEDS=[[45,'Langsam'],[28,'Normal'],[14,'Schnell'],[4,'Sofort']];
function openMenu(view){view=view||'m';const a=slots(),inGame=cur&&!$('#start'),back=`<button class="mb back" data-v="m">← Zurück</button>`;
  const slot=(mode,n)=>{const d=a[n];return`<button class="slotc" data-${mode}="${n}" ${mode=='l'&&!d?'disabled':''}><b>Platz ${n+1}</b><span>${d?'📍 '+(LOCN[d.cur]||d.cur)+'<br><small>'+d.date+'</small>':'<i>leer</i>'}</span></button>`};
  const sp=SPEEDS.find(s=>s[0]==OPT.speed)||SPEEDS[1];
  const body=view=='s'?`<h3>💾 Spiel speichern</h3>${inGame?`<div class="slots3">${[0,1,2].map(n=>slot('s',n)).join('')}</div><p class="msg em">Wähl einen Platz.</p>`:'<p class="em">Erst spielen, dann speichern.</p>'}${back}`
    :view=='l'?`<h3>📂 Spielstand laden</h3><div class="slots3">${(()=>{const d=autoSlot();return`<button class="slotc" data-l="auto" ${d?'':'disabled'}><b>Auto</b><span>${d?'📍 '+(LOCN[d.cur]||d.cur)+'<br><small>Automatisch · '+d.date+'</small>':'<i>noch nichts</i>'}</span></button>`})()}${[0,1,2].map(n=>slot('l',n)).join('')}</div>${back}`
    :view=='o'?`<h3>⚙️ Einstellungen</h3><div class="opts">
        <button class="mb" data-o="voice">🔊 Stimmen <b>${!VOICE_ON?'Aus':OPT.voices==='petja'?'Nur Petja':'Alle Figuren'}</b></button>
        <label class="sl">🗣️ Lautstärke Stimmen <input type="range" min="0" max="100" value="${Math.round(OPT.vox*100)}" data-r="vox"></label>
        <label class="sl">🎵 Lautstärke Musik <input type="range" min="0" max="100" value="${Math.round((OPT.mus==null?.35:OPT.mus)*100)}" data-r="mus"></label>
        <label class="sl">🌲 Lautstärke Geräusche <input type="range" min="0" max="100" value="${Math.round(OPT.sfx*100)}" data-r="sfx"></label>
        <button class="mb" data-o="barks">💬 Sprüche beim Rumstehen <b>${OPT.barks?'An':'Aus'}</b></button>
        <button class="mb" data-o="speed">⏩ Textgeschwindigkeit <b>${sp[1]}</b></button></div>${back}`
    :view=='k'?`<h3>⌨️ Steuerung</h3><table>${KEYS.map(([k,t])=>`<tr><td>${k}</td><td>${t}</td></tr>`).join('')}</table><button class="mb" data-v="tut">❓ Anleitung nochmal zeigen</button>${back}`
    :`<h3>${inGame?'⏸ Pause':'Menü'}</h3>
      ${inGame?`<button class="mb big" data-v="x">▶ Weiterspielen</button>`:''}
      <button class="mb" data-v="s" ${inGame?'':'disabled'}>💾 Spiel speichern</button><button class="mb" data-v="l">📂 Spielstand laden</button>
      ${inGame?`<button class="mb" data-v="i">🎒 Taschen</button><button class="mb" data-v="j">📜 Aufträge</button><button class="mb" data-v="map">🗺️ Karte</button>`:''}
      <button class="mb" data-v="o">⚙️ Einstellungen</button><button class="mb" data-v="k">⌨️ Steuerung</button>${inGame?`<button class="mb quit" data-v="home">🏠 Zum Titelbild</button>`:''}`;
  const o=openO(`<div class="pan menu"><button class="x" title="Schließen (ESC)">✕</button>${body}</div>`,'menuO');o.dataset.menu=view;
  o.querySelectorAll('button[data-v]').forEach(b=>b.onclick=()=>{const v=b.dataset.v;
    if(v=='x')return closeO();if(v=='i')return openBook('tasche');if(v=='j')return openBook('auftrag');if(v=='map')return openBook('karte');if(v=='tut'){closeO();return typeof showTutorial=='function'&&showTutorial()}
    if(v=='home'){if(b.dataset.armed)return location.reload();b.dataset.armed=1;b.innerHTML='⚠️ Wirklich? Nicht Gespeichertes geht verloren. <b>Nochmal klicken</b>';return}
    openMenu(v)});
  o.querySelectorAll('button[data-o]').forEach(b=>b.onclick=()=>{const k=b.dataset.o;
    if(k=='voice'){if(!VOICE_ON){VOICE_ON=true;OPT.voices='alle'}else if(OPT.voices!=='petja')OPT.voices='petja';else VOICE_ON=false;
      try{localStorage.setItem('petjaVoice2',VOICE_ON?'1':'0')}catch(e){}saveOpt();if(TTS)TTS.cancel();if(VOICE_ON)voice(OPT.voices==='petja'?'So klinge ich.':'So klingen wir alle.','P')}if(k=='barks'){OPT.barks=!OPT.barks;saveOpt()}if(k=='speed'){const i=SPEEDS.findIndex(s=>s[0]==OPT.speed);OPT.speed=SPEEDS[(i+1)%SPEEDS.length][0];saveOpt()}openMenu('o')});
  o.querySelectorAll('button[data-s]').forEach(b=>b.onclick=()=>{const n=+b.dataset.s;
    if(a[n]&&!b.dataset.armed){o.querySelectorAll('[data-armed]').forEach(x=>delete x.dataset.armed);b.dataset.armed=1;b.classList.add('warn');o.querySelector('.msg').textContent='Platz '+(n+1)+' ist belegt. Nochmal klicken zum Überschreiben.';return}
    const ok=saveGame(n);openMenu('s');ovl.querySelector('.msg').textContent=ok?'✔ Gespeichert auf Platz '+(n+1)+'!':'Speichern nicht möglich (Browser blockiert Speicher).';ovl.querySelector('.msg').classList.toggle('ok',!!ok)});
  o.querySelectorAll('button[data-l]').forEach(b=>b.onclick=()=>loadGame(b.dataset.l==='auto'?'auto':+b.dataset.l));
  o.querySelectorAll('input[data-r]').forEach(r=>{r.oninput=()=>{OPT[r.dataset.r]=r.value/100;saveOpt();if(r.dataset.r=='sfx'&&typeof sfxVolume=='function')sfxVolume();if(r.dataset.r=='mus'&&typeof musVolume=='function')musVolume()};
    r.onchange=()=>{if(r.dataset.r=='vox')voice('So laut bin ich jetzt.','P');else if(typeof sfx=='function')sfx('click')}})}
addEventListener('keydown',e=>{if($('#fg')||$('#cut')||e.repeat&&e.key!=' ')return;const k=e.key.toLowerCase(),play=!$('#start');
  if(k=='escape'){if(ovl)closeO();else if(busy)skipDialog();else openMenu()}
  else if(ovl&&ovl.classList.contains('tutO'))return
  else if(k=='i'&&play)toggleBook('tasche');else if(k=='j'&&play)toggleBook('auftrag');else if(k=='m'&&play)toggleBook('karte');else if(k=='l'&&play)toggleBook('log');
  else if(k=='h'&&play&&!ovl)typeof tipp=='function'&&tipp();
  else if(k=='v')toggleVoice();
  else if(k=='f'&&!/input|textarea/i.test(e.target.tagName))toggleFull()});
// Vollbild (F)
function toggleFull(){try{if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen()}catch(e){}}
