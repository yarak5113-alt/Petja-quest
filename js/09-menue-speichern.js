// ================= Menü, Speichern, Inventar & Aufträge, Karte =================
const REM=[];function rm(id){const e=document.getElementById(id);if(e)e.remove();if(!REM.includes(id))REM.push(id)}
const LOCN={wald:'Birkenwald',gabel:'Weggabelung',huette:'Baba Jagas Hütte',innen:'Hütte (innen)',buehne:'Bühnenrand',lounge:'Private Lounge',irrwald:'Irrwald',banjaV:'Vor dem Banja',banja:'Banja',dorf:'Dorfeingang',dorfstr:'Dorfstraße',kirche:'Kirche',muehle:'Alte Mühle',sperre:'Birkensperre',sumpf:'Sumpf',fischer:'Fischerhaus',ufer:'Ufer',unter:'Unter dem Pier',gnome:'Gnomsiedlung',hoehle:'Höhle'};
const has=i=>inv.includes(i);
// h = Notiz: was genau zu tun ist und wo (wird bei offenen Schritten in der Auftragsansicht und beim Tipp gezeigt)
function quests(){const Q=[];
  Q.push({t:'Raus aus dem Märchen',d:'Irgendwas stimmt nicht. Ich muss hier wieder aufwachen.',v:1,ok:FL.ende,s:[
    {t:'Jemanden finden, der sich hier auskennt',v:1,ok:seen.huette,h:'Vom Birkenwald zur Weggabelung, dann dem Schild „Zu Baba Jaga“ folgen. Eine Hexe weiß bestimmt, wie man hier rauskommt.'},
    {t:'In Baba Jagas Hütte kommen',v:FL.bjNo,ok:FL.drin,h:has('leiter')?'Mit der Leiter zur Hütte und auf die Tür oder die Hühnerbeine klicken – dann geht’s durchs Fenster rein.':'Die Tür ist nur Deko, rein geht’s nur durchs Fenster. Dafür brauch ich eine Leiter (siehe „Hoch hinaus“).'},
    {t:'Herausfinden, was mit mir los ist',v:FL.drin,ok:FL.recipe,h:FL.bjInfo?'Baba Jaga braucht frische blaue Traumschwämme aus der Höhle der Gnome (siehe „Das Pilzlabor“).':'Baba Jaga in ihrer Hütte fragen. Sie will wissen, was in meinem Joint war (siehe „Der Joint“).'},
    {t:'Den Ausweg-Joint bauen',v:FL.recipe,ok:FL.ende,s:[
      {t:'Die Ur-Spore',v:FL.recipe,ok:has('spore')||FL.ende,h:'In der Gnomsiedlung auf das Pilzbeet klicken und fünf goldene Pilze pflücken.'},
      {t:'Glut, die nicht ausgeht',v:FL.recipe,ok:has('glut')||FL.ende,s:[
        {t:'Den Popen finden',v:FL.recipe,ok:FL.popeBack,h:'An der Kirche hängt ein Zettel: „Pope in der Stadt“, seit 1993. Hinterm Banja (vor dem Banja rechts zum Hinterhof) schnarcht doch jemand im Heu …'},
        {t:'Weihwasser holen',v:FL.popeBack,ok:FL.weih,h:'Vater Ignati ist zurück an der Kirche (Dorfstraße → „Zur Kirche“). Mit ihm reden.'},
        {t:'Den Schmied überzeugen',v:FL.recipe,ok:FL.glut,h:has('weihwasser')?'Das Weihwasser zu Schmied Fjodor in den Schmiedehof bringen.':'Schmied Fjodor im Schmiedehof (Dorfstraße → „Zum Schmiedehof“) fragen.'}]},
      {t:'Eine echte Träne',v:FL.recipe,ok:has('traene')||FL.ende,s:[
        {t:'Etwas, das jeden zum Heulen bringt',v:FL.recipe,ok:FL.zwiebel,h:'Nastja im Banja weint nie. Eine scharfe Zwiebel? Die Gnome haben neben dem Riesenkohl ein Gemüsebeet.'},
        {t:'Die Zwiebel in die Lüftung',v:FL.zwiebel,ok:FL.zwIn,h:'Die Lüftung der Lounge geht nach draußen: vor dem Banja rechts in den Hinterhof, dort auf die Lüftung klicken.'},
        {t:'Einen Privattanz bekommen',v:FL.zwIn,ok:FL.booked||FL.traene,h:'Die Gäste sind weg. Im Banja auf die Bühne klicken und Nastja ansprechen – jetzt hat sie Zeit.'},
        {t:'Die Träne auffangen',v:FL.zwIn,ok:FL.traene,h:'Einfach sitzen bleiben und die Phiole bereithalten.'}]},
      {t:'Alles zu Baba Jaga',v:['filter','spore','glut','traene'].every(has),ok:FL.ende,h:'In Baba Jagas Hütte auf den Tisch klicken und den Ausweg-Joint bauen.'}]}]});
  Q.push({t:'Das Pilzlabor',d:'Baba Jaga braucht frische blaue Traumschwämme aus der Höhle der Gnome. Aber umsonst lassen die Gnome keinen rein.',v:FL.labQ,ok:FL.recipe,s:[
    {t:'In den Stollen kommen',v:FL.labQ,ok:FL.stollen,h:'Zur Gnomsiedlung (vom Fischerhaus am Ufer entlang) und auf das Schild „Zur Höhle“ klicken. Grobnik will dafür etwas.',s:[
      {t:'Mehl vom Müller besorgen',v:FL.mehlQ,ok:FL.mehl,h:has('gutschein')?'Den Gutschein zum Müller bringen: an der Alten Mühle auf die Mühle klicken.':!FL.mullerQ?'Die Gnome wollen das „Mehl“ vom Müller. Vom Dorfeingang aufs Schild „Zur alten Mühle“ und dort an die Tür klopfen (auf die Mühle klicken).':'Der Müller rückt das Mehl nur gegen etwas aus dem Banja raus.',s:[
        {t:'Ein Wunsch des Müllers',v:FL.mullerQ,ok:FL.gutschein||FL.mehl,h:FL.rekrut?'Nastja ist unterwegs. Zurück ins Banja zu Madame Zinaida – sie schuldet mir einen Gutschein für den Müller.':'Der Müller will eine Braut aus dem Banja hinterm Irrwald – oder wenigstens einen Tanz.',s:[
          {t:'Den Weg nicht verlieren',v:FL.mullerQ,ok:FL.karte,h:'Nur Baba Jaga kennt den Weg durch den Irrwald. In ihrer Hütte mit ihr reden und nach dem Banja fragen.'},
          {t:'Das Banja finden',v:FL.mullerQ,ok:seen.banja,h:'An der Alten Mühle aufs Schild „In den Irrwald“. Den Weg verrät Baba Jagas Karte – in den Taschen anklicken und genau lesen. Falsch abgebogen = zurück zur Mühle.'},
          {t:'Eine Neue für Madame',v:FL.clubQ,ok:FL.rekrut,h:'Madames Liste in den Taschen lesen. Dann im Sumpf (hinter der Birkensperre) die Nymphen anklicken, mit ihnen reden und die finden, die genau auf die Liste passt.'}]}]}]},
    {t:'Frische blaue Pilze holen',v:FL.stollen,ok:has('blaupilze')||FL.recipe,h:'In der Höhle wachsen links große blaue Traumschwämme. Anklicken und einsammeln.'},
    {t:'Die Pilze zu Baba Jaga bringen',v:has('blaupilze')||FL.recipe,ok:FL.recipe,h:'Zurück in Baba Jagas Hütte und mit ihr reden.'}]});
  Q.push({t:'Der versperrte Weg',d:'Umgestürzte Birken versperren den Weg zum Sumpf.',v:seen.sperre,ok:FL.cut,s:[
    {t:'Eine Säge finden',v:seen.sperre&&FL.clubQ,ok:FL.sawQ||FL.cut,h:'Vielleicht hat Opa Grischa eine Säge? Er steht im Dorf (hinter Baba Jagas Hütte) vor seiner Brandruine.'},
    {t:'Die Säge schärfen lassen',v:FL.sawQ,ok:has('saege')||FL.cut,h:'Opas Säge ist verrostet. Dorfstraße → „Zum Schmiedehof“, Schmied Fjodor fragen.'},
    {t:'Opas Haus vorbereiten',v:FL.sawQ,ok:FL.deal||FL.cut,h:'Die Birken am Sumpfweg sind Opas Bauholz. Erst will er Teer – Oma Dusja auf der Dorfstraße hat welchen (siehe „Omas Gebiss“). Den Teer dann zu Opa bringen.'},
    {t:'Opas Birken zersägen',v:FL.deal||FL.cut,ok:FL.cut,h:'Mit der geschärften Säge zur Birkensperre und auf die umgestürzten Birken klicken. Aus den Stämmen wird Opas Haus.'}]});
  Q.push({t:'Opas neues Haus',d:'Die Stämme liegen bei Opa. Jetzt wird gebaut: Stämme setzen, schälen, teeren.',v:FL.cut&&FL.sawQ,ok:FL.haus,h:'Zu Opa Grischa ins Dorf und mit ihm reden.'});
  Q.push({t:'Eine offene Rechnung',d:'Schmied Fjodor hat Opas Säge auf Pump geschärft. „Ich vergess nix, Junge.“',v:FL.schuld,ok:FL.glut,h:'Irgendwann will der Schmied was von mir. Wenn er’s sagt, weiß ich’s.'});
  Q.push({t:'Omas Gebiss',d:'Oma hat ihr Gebiss verloren. Ohne das gibt’s keinen Teer.',v:FL.gq,ok:FL.teer,s:[
    {t:'Das Gebiss finden',v:FL.gq,ok:FL.ks,h:'Oma sagt, der Kater vom Popen hockt drauf. Also: Friedhof an der Kirche (Dorfstraße → „Zur Kirche“).'},
    {t:'Den Wächter loswerden',v:FL.ks,ok:FL.kater,s:[
      {t:'Etwas, das er nicht ablehnen kann',v:FL.ks,ok:FL.fisch||FL.kater,h:has('angel')?'Mit der Angel zum Fischerhaus und auf den See klicken. Beim Drill dagegenhalten!':'Ein Kater will Fisch. Kusmitsch am Fischerhaus fragen – wenn er nichts rausrückt, selbst angeln.',s:[
        {t:'Selbst ist der Mann',v:FL.angelQ,ok:has('angel')||FL.fisch||FL.kater,h:'Stock + Schnur = Angel. Die baut Petja von selbst zusammen, sobald er beides hat.',s:[
          {t:'Ein Stock',v:FL.angelQ,ok:FL.ast,h:FL.kraehe?'Der Ast im Birkenwald ist frei. Anklicken – Petja springt danach.':has('apfel')?'Die Krähe im Birkenwald mit dem Apfel bewerfen (auf die Krähe klicken), dann ist der Ast frei.':'Im Birkenwald hängt ein gerader Ast – aber die Krähe sitzt drauf. Mit etwas bewerfen? An der Weggabelung wachsen Äpfel.'},
          {t:'Eine Schnur',v:FL.angelQ,ok:has('seil')||has('angel')||FL.fisch||FL.kater,h:'Auf der Dorfstraße hängt bei Tante Galja (rechts) eine Wäscheleine.'}]}]},
      {t:'Dem Kater den Fisch geben',v:FL.fisch&&!FL.kater,ok:FL.kater,h:'Mit dem Fisch zum Friedhof an der Kirche und auf den Kater klicken.'}]},
    {t:'Das Gebiss zurückbringen',v:has('gebiss')||FL.teer,ok:FL.teer,h:'Zu Oma auf die Dorfstraße.'}]});
  Q.push({t:'Hoch hinaus',d:'Durch die Tür kommt man bei Baba Jaga nicht rein – nur durchs Fenster.',v:FL.bjNo,ok:FL.leiter||FL.drin,s:[
    {t:'Jemanden mit einer Leiter finden',v:FL.bjNo,ok:FL.leiterQ,h:'Hinter Baba Jagas Hütte geht’s zum Dorf. Am Ofen der abgebrannten Ruine lehnt eine Leiter – Opa Grischa davor fragen.'},
    {t:'Den Preis bezahlen',v:FL.leiterQ,ok:FL.leiter,h:'Den Selbstgebrannten zu Opa Grischa am Dorfeingang bringen.',s:[
      {t:'An die Flasche kommen',v:FL.schnapsQ,ok:FL.schnaps,h:FL.ablenk?'Kusmitsch kämpft mit dem Wels! Jetzt am Fischerhaus die Flasche auf dem Pier schnappen.':'Kusmitschs Flasche steht neben ihm auf dem Pier am Fischerhaus. Solange er hinschaut, keine Chance.'},
      {t:'Für Ablenkung sorgen',v:FL.schnapsQ,ok:FL.ablenk,h:'Wenn der Wels unterm Pier an Kusmitschs Schnur anbeißt, vergisst der alles andere.',s:[
        {t:'Ein Köder für etwas Großes',v:FL.schnapsQ,ok:FL.tied||FL.ablenk,s:[
          {t:'Würmer sammeln',v:FL.schnapsQ,ok:has('wuermer')||FL.tied||FL.ablenk,h:'Vor Baba Jagas Hütte ist die Erde feucht – dort liegen fette Würmer.'},
          {t:'Die Würmer an Kusmitschs Schnur hängen',v:has('wuermer')||FL.tied,ok:FL.tied||FL.ablenk,h:'Vom Ufer aufs Schild „Unter den Pier“. Dort auf die Angelschnur klicken, die durch die Bretter hängt.'}]}]}]}]});
  Q.push({t:'Der Joint',d:'Baba Jaga will wissen, was drin war.',v:FL.drin,ok:FL.bjInfo,s:[
    {t:'Den Joint untersuchen',v:FL.drin,ok:FL.pilze,h:has('kippe')?'In Baba Jagas Hütte auf den Tisch klicken und den Joint dort zerlegen.':'Der Joint-Stummel liegt im Birkenwald auf dem Baumstumpf. Mitnehmen und in Baba Jagas Hütte auf den Tisch legen.'},
    {t:'Das Ergebnis zeigen',v:FL.pilze,ok:FL.bjInfo,h:'Die blauen Pilzstücke Baba Jaga zeigen (auf sie klicken).'}]});
  return Q.filter(q=>q.v)}
// Offene Blätter des Auftragsbaums; der tiefste (konkreteste) zuerst, bei Gleichstand der neuere Auftrag
function nextSteps(Q){const out=[];const walk=(q,d,top)=>{if(!q.v||q.ok)return;const kids=(q.s||[]).filter(c=>c.v&&!c.ok);if(!kids.length)out.push({q,d,top});else kids.forEach(c=>walk(c,d+1,top))};
  (Q||quests()).forEach((q,i)=>walk(q,0,i));return out.sort((a,b)=>b.d-a.d||b.top-a.top)}
function qTree(list,lv,NEXT){return list.filter(q=>q.v).map(q=>`<div class="q l${lv} ${q.ok?'done':''} ${q===NEXT?'next':''}"><span>${ic(q.ok?'check':q===NEXT?'next':'todo','q')} ${q.t}</span>${q.d&&lv==0?`<i>${q.d}</i>`:''}${q!==NEXT&&qNote(q)?`<em class="qh">${ic('auftrag','sm')} ${qNote(q)}</em>`:''}${q.s&&!q.ok?qTree(q.s,lv+1,NEXT):''}</div>`).join('')}
// Notiz nur bei offenen Schritten, die gerade selbst dran sind (keine offenen Unterschritte mehr)
function qNote(q){return!q.ok&&q.h&&!(q.s||[]).some(c=>c.v&&!c.ok)?q.h:''}
let ovl=null;function closeO(){if(ovl){ovl.remove();ovl=null}}
function openO(html,cls){closeO();ovl=document.createElement('div');ovl.className='ovl '+(cls||'');ovl.innerHTML=html;ovl.onclick=e=>{e.stopPropagation();if(e.target===ovl)closeO()};
  ovl.querySelectorAll('.x').forEach(b=>b.onclick=closeO);$('#game').appendChild(ovl);return ovl}
// ===== Tagebuch: Taschen | Aufträge | Karte =====
const BOOKT=[['tasche','Taschen','I'],['auftrag','Aufträge','J'],['karte','Karte','M'],['log','Gespräche','L']];
// Gesprächsverlauf: die letzten Sätze zum Nachlesen, Regieanweisungen kursiv
function logHTML(){if(!LOG.length)return'<p class="empty">'+ic('log','big')+'<br><span class="em">Noch hat niemand was gesagt.</span></p>';
  const esc=s=>s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])).replace(/\*([^*]+)\*/g,'<i>$1</i>');
  return'<div class="log">'+LOG.map(([w,t])=>`<p><b style="color:${(N[w]||['?','#ccc'])[1]}">${(N[w]||[w])[0]}:</b> ${esc(t)}</p>`).join('')+'</div>'}
function openBook(tab){tab=tab||'tasche';let body='';
  if(tab=='tasche')body=inv.length?`<div class="grid">${inv.map(id=>{const it=ITEMS[id]||['❔',id,id];return`<button class="card" data-i="${id}"><b>${IMG(id)}</b><span>${it[1]}</span></button>`}).join('')}</div>
      <div class="detail"><span class="em">Klick auf einen Gegenstand, um ihn anzusehen.</span></div>`:'<p class="empty">'+ic('web','big')+'<br>Leer. Wie mein Kühlschrank.<br><span class="em">Sammle Dinge ein, indem du sie in der Welt anklickst.</span></p>';
  if(tab=='auftrag'){const Q=quests(),ns=nextSteps(Q),NEXT=ns[0]&&ns[0].q,open=Q.filter(q=>!q.ok),fin=Q.filter(q=>q.ok);
    body=`${NEXT?`<div class="nextbox"><small>Nächster Schritt</small>${ic('next')} ${NEXT.t}${NEXT.h?`<p class="nh">${NEXT.h}</p>`:''}</div>`:''}${qTree(open,0,NEXT)||'<p class="em">Gerade nichts offen.</p>'}
      ${fin.length?`<details class="fin"><summary>Erledigt (${fin.length})</summary>${qTree(fin,0)}</details>`:''}`;if(typeof badge=='function')badge('auftrag',0)}
  if(tab=='log')body=logHTML();
  if(tab=='karte')body=mapSVG()+`<p class="legend"><span class="lg here"></span> Du bist hier <span class="lg"></span> Besucht <span class="lg unk">?</span> Noch unerkundet</p>`;
  if(tab=='tasche'&&typeof badge=='function')badge('tasche',0);
  const o=openO(`<div class="pan book"><div class="tabs">${BOOKT.map(([k,t,key])=>`<button class="tab ${k==tab?'on':''}" data-tab="${k}">${ic(k)} ${t} <kbd>${key}</kbd></button>`).join('')}<button class="x" title="Schließen (ESC)">${ic('close')}</button></div>
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
const KEYS=[['Linksklick','Laufen, ansehen, benutzen, sprechen'],['Klick / Leertaste im Dialog','Text weiter'],['ESC / Rechtsklick im Dialog','Gespräch überspringen'],['Schilder & Türen (Pfeil)','Zu einem anderen Ort'],['Leertaste (halten)','Alles Klickbare zeigen'],['H','Tipp: Was soll ich als Nächstes tun?'],['I','Taschen'],['J','Aufträge'],['M','Karte'],['L','Gesprächsverlauf'],['V','Stimmen an/aus'],['F','Vollbild'],['ESC','Menü / schließen']];
const BOXS=[[.85,'Klein'],[1,'Normal'],[1.25,'Groß'],[1.5,'Sehr groß']];
const SPEEDS=[[45,'Langsam'],[28,'Normal'],[14,'Schnell'],[4,'Sofort']];
function openMenu(view){view=view||'m';const a=slots(),inGame=cur&&!$('#start'),back=`<button class="mb back" data-v="${inGame?'m':'x'}">${ic('back')} Zurück</button>`;
  const slot=(mode,n)=>{const d=a[n];return`<button class="slotc" data-${mode}="${n}" ${mode=='l'&&!d?'disabled':''}><b>Platz ${n+1}</b><span>${d?ic('pin','sm')+' '+(LOCN[d.cur]||d.cur)+'<br><small>'+d.date+'</small>':'<i>leer</i>'}</span></button>`};
  const sp=SPEEDS.find(s=>s[0]==OPT.speed)||SPEEDS[1];
  const body=view=='s'?`<h3>${ic('save')} Spiel speichern</h3>${inGame?`<div class="slots3">${[0,1,2].map(n=>slot('s',n)).join('')}</div><p class="msg em">Wähl einen Platz.</p>`:'<p class="em">Erst spielen, dann speichern.</p>'}${back}`
    :view=='l'?`<h3>${ic('load')} Spielstand laden</h3><div class="slots3">${(()=>{const d=autoSlot();return`<button class="slotc" data-l="auto" ${d?'':'disabled'}><b>Auto</b><span>${d?ic('pin','sm')+' '+(LOCN[d.cur]||d.cur)+'<br><small>Automatisch · '+d.date+'</small>':'<i>noch nichts</i>'}</span></button>`})()}${[0,1,2].map(n=>slot('l',n)).join('')}</div>${back}`
    :view=='o'?`<h3>${ic('gear')} Einstellungen</h3><div class="opts">
        <button class="mb" data-o="voice"><span>${ic('voice')} Stimmen</span> <b>${!VOICE_ON?'Aus':OPT.voices==='petja'?'Nur Petja':'Alle Figuren'}</b></button>
        <label class="sl">${ic('talk')} Lautstärke Stimmen <input type="range" min="0" max="100" value="${Math.round(OPT.vox*100)}" data-r="vox"></label>
        <label class="sl">${ic('music')} Lautstärke Musik <input type="range" min="0" max="100" value="${Math.round((OPT.mus==null?.35:OPT.mus)*100)}" data-r="mus"></label>
        <label class="sl">${ic('tree')} Lautstärke Geräusche <input type="range" min="0" max="100" value="${Math.round(OPT.sfx*100)}" data-r="sfx"></label>
        <button class="mb" data-o="barks"><span>${ic('log')} Sprüche beim Rumstehen</span> <b>${OPT.barks?'An':'Aus'}</b></button>
        <button class="mb" data-o="speed"><span>${ic('speed')} Textgeschwindigkeit</span> <b>${sp[1]}</b></button>
        <button class="mb" data-o="box"><span>${ic('talk')} Textgröße im Gespräch</span> <b>${(BOXS.find(s=>s[0]==OPT.box)||BOXS[1])[1]}</b></button>
        <p class="boxprev" style="font-size:calc(15px*${OPT.box||1})"><b>Petja:</b> So groß steht der Text in der Leseleiste.</p></div>${back}`
    :view=='k'?`<h3>${ic('keys')} Steuerung</h3><table>${KEYS.map(([k,t])=>`<tr><td>${k}</td><td>${t}</td></tr>`).join('')}</table><button class="mb" data-v="tut">${ic('help')} Anleitung nochmal zeigen</button>${back}`
    :`<h3>${inGame?ic('pause')+' Pause':ic('menu')+' Menü'}</h3>
      ${inGame?`<button class="mb big" data-v="x">${ARR()}Weiterspielen</button>`:''}
      <button class="mb" data-v="s" ${inGame?'':'disabled'}>${ic('save')} Spiel speichern</button><button class="mb" data-v="l">${ic('load')} Spielstand laden</button>
      ${inGame?`<button class="mb" data-v="i">${ic('tasche')} Taschen</button><button class="mb" data-v="j">${ic('auftrag')} Aufträge</button><button class="mb" data-v="map">${ic('karte')} Karte</button>`:''}
      <button class="mb" data-v="o">${ic('gear')} Einstellungen</button><button class="mb" data-v="k">${ic('keys')} Steuerung</button>${inGame?`<button class="mb quit" data-v="home">${ic('home')} Zum Titelbild</button>`:''}`;
  const o=openO(`<div class="pan menu"><button class="x" title="Schließen (ESC)">${ic('close')}</button>${body}</div>`,'menuO');o.dataset.menu=view;
  o.querySelectorAll('button[data-v]').forEach(b=>b.onclick=()=>{const v=b.dataset.v;
    if(v=='x')return closeO();if(v=='i')return openBook('tasche');if(v=='j')return openBook('auftrag');if(v=='map')return openBook('karte');if(v=='tut'){closeO();return typeof showTutorial=='function'&&showTutorial()}
    if(v=='home'){if(b.dataset.armed)return location.reload();b.dataset.armed=1;b.innerHTML=ic('warn')+' Wirklich? Nicht Gespeichertes geht verloren. <b>Nochmal klicken</b>';return}
    openMenu(v)});
  o.querySelectorAll('button[data-o]').forEach(b=>b.onclick=()=>{const k=b.dataset.o;
    if(k=='voice'){if(!VOICE_ON){VOICE_ON=true;OPT.voices='alle'}else if(OPT.voices!=='petja')OPT.voices='petja';else VOICE_ON=false;
      try{localStorage.setItem('petjaVoice2',VOICE_ON?'1':'0')}catch(e){}saveOpt();if(TTS)TTS.cancel();if(VOICE_ON)voice(OPT.voices==='petja'?'So klinge ich.':'So klingen wir alle.','P')}if(k=='barks'){OPT.barks=!OPT.barks;saveOpt()}if(k=='speed'){const i=SPEEDS.findIndex(s=>s[0]==OPT.speed);OPT.speed=SPEEDS[(i+1)%SPEEDS.length][0];saveOpt()}if(k=='box'){const i=BOXS.findIndex(s=>s[0]==(OPT.box||1));OPT.box=BOXS[(i+1)%BOXS.length][0];saveOpt();applyBox()}openMenu('o')});
  o.querySelectorAll('button[data-s]').forEach(b=>b.onclick=()=>{const n=+b.dataset.s;
    if(a[n]&&!b.dataset.armed){o.querySelectorAll('[data-armed]').forEach(x=>delete x.dataset.armed);b.dataset.armed=1;b.classList.add('warn');o.querySelector('.msg').textContent='Platz '+(n+1)+' ist belegt. Nochmal klicken zum Überschreiben.';return}
    const ok=saveGame(n);openMenu('s');ovl.querySelector('.msg').innerHTML=ok?ic('check','sm')+' Gespeichert auf Platz '+(n+1)+'!':'Speichern nicht möglich (Browser blockiert Speicher).';ovl.querySelector('.msg').classList.toggle('ok',!!ok)});
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
