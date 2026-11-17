// ================= Tester-Modus =================
// Code "petjatest" eintippen (irgendwo im Spiel, auch im Titelbild) → Tester-Menü.
// Danach öffnet [F9] das Menü direkt. Sprungpunkte laden die Seite neu und setzen einen sauberen Spielstand.
const TCODE='petjatest',TKEY='petjaTester',TJUMP='petjaTesterJump';let tbuf='';
const ss={get:k=>{try{return sessionStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{sessionStorage.setItem(k,v);return true}catch(e){return false}},del:k=>{try{sessionStorage.removeItem(k)}catch(e){}}};
// Jeder Schritt baut auf den vorherigen auf. f=Flags, add/del=Inventar, rm=entfernte Szenen-Objekte, s=besuchte Orte, at=[Ort,x,y]
const TSTEPS=[
  {t:'Start im Birkenwald',at:['wald',400,476]},
  {t:'Joint-Stummel eingesteckt',add:['kippe'],rm:['kippe'],s:['gabel','huette'],at:['huette',640,488]},
  {t:'Hütte: Tür zu, Leiter gesucht',f:['bjNo'],s:['dorf'],at:['dorf',150,486]},
  {t:'Opa will Selbstgebrannten',f:['leiterQ','schnapsQ'],s:['sperre','fischer'],at:['fischer',90,476]},
  {t:'Wels lenkt Fischer ab',f:['tied','ablenk'],rm:['wuermerG'],s:['ufer','unter'],at:['fischer',90,476]},
  {t:'Leiter von Opa bekommen',f:['schnaps','leiter'],add:['leiter'],rm:['schnapsG','leiterG'],at:['huette',640,474]},
  {t:'In Baba Jagas Hütte',f:['drin'],del:['leiter'],s:['innen'],at:['innen',250,470]},
  {t:'Joint zerlegt (blaue Pilze)',f:['pilze'],del:['kippe'],add:['pilze'],at:['innen',250,470]},
  {t:'Baba Jaga: Ab zu den Gnomen',f:['bjInfo','labQ','echo1'],at:['innen',250,470]},
  {t:'Gnome wollen Mehl',f:['mehlQ'],s:['gnome'],at:['gnome',60,472]},
  {t:'Müller will eine Braut',f:['mullerQ'],s:['muehle'],at:['muehle',700,470]},
  {t:'Wegkarte von Baba Jaga',f:['karte'],add:['karte'],at:['innen',250,470]},
  {t:'Banja gefunden, Madames Liste',f:['clubQ'],add:['liste'],s:['irrwald','banjaV','banja'],at:['banja',300,480]},
  {t:'Opas rostige Säge + Omas Gebiss',f:['sawQ','auftrag','gq','ks'],add:['rsaege'],s:['dorfstr','kirche','sperre'],at:['kirche',420,488]},
  {t:'Angel gebaut (Wäscheleine)',f:['angelQ','kraehe','ast','leine'],add:['angel'],rm:['apfelG','kraeheG'],at:['fischer',90,476]},
  {t:'Fisch → Gebiss → Teer',f:['fisch','kater','teer','kette'],del:['angel'],add:['teer'],rm:['katerG','gebissG'],at:['fischer',90,476]},
  {t:'Säge geschärft (Schuld beim Schmied)',f:['schuld'],del:['rsaege'],add:['saege'],s:['schmiede'],at:['dorf',150,486]},
  {t:'Teer bei Opa, Birken freigegeben',f:['deal'],del:['teer'],at:['sperre',400,488]},
  {t:'Birken zersägt, Opas Haus steht',f:['cut','haus'],del:['saege'],s:['sumpf'],at:['sumpf',540,488]},
  {t:'Nastja angeworben',f:['rekrut'],at:['banja',300,480]},
  {t:'Gutschein von Madame',f:['gutschein'],add:['gutschein'],at:['banja',300,480]},
  {t:'„Mehl“ vom Müller',f:['mehl'],del:['gutschein'],add:['mehl'],at:['muehle',700,470]},
  {t:'Stollen offen (Laterne)',f:['stollen'],del:['mehl'],add:['laterne'],s:['hoehle'],at:['hoehle',400,486]},
  {t:'Blaue Pilze aus der Höhle',add:['blaupilze'],at:['hoehle',400,486]},
  {t:'Rezept von Baba Jaga',f:['recipe','a3','latHoch','echo2'],del:['pilze','blaupilze','laterne'],add:['phiole','filter'],at:['innen',250,470]},
  // ---- Akt 3 ----
  {t:'Akt 3: Ur-Spore aus dem Pilzbeet',f:['sporeQ','gartenOk'],add:['spore'],s:['garten'],at:['garten',640,478]},
  {t:'Pope hinterm Banja geweckt',f:['popeBack'],s:['banjaH'],at:['banjaH',300,470]},
  {t:'Weihwasser vom Popen',f:['weih'],add:['weihwasser'],at:['kirche',420,488]},
  {t:'Glut vom Schmied',f:['glutQ','glut'],del:['weihwasser'],add:['glut'],s:['schmiede'],at:['schmiede',300,470]},
  {t:'Zwiebel aus dem Gnombeet',f:['trQ','zwiebel'],add:['zwiebel'],at:['garten',640,478]},
  {t:'Zwiebel in der Lounge-Lüftung',f:['zwIn'],del:['zwiebel'],at:['banjaH',300,470]},
  {t:'Privattanz → Nastjas Träne',f:['booked','traene','lounge'],del:['phiole'],add:['traene'],s:['buehne','lounge'],at:['buehne',260,486]},
  {t:'Alles beisammen – ab zu Baba Jagas Tisch (Echo 3 beim Betreten)',at:['huette',640,488]}];
// Nebenquest & Enden: bauen auf dem letzten Story-Punkt auf (alles beisammen, Träne da), dann Schritt für Schritt weiter.
// v = Zahlen-Flags (Beziehungspunkte: na_talk ×6, na_tanz ×10, na_drink ×5, alles außer Anwerben ×1,25 (49-nastja-show.js); Basis Nastja 40 %, mit Diadem-Bonus 46 %)
const TNEBEN=[
  {t:'Nebenquest: Madame will eine zweite Tänzerin (Anwerbebogen)',f:['t2Q','booked'],v:{naV:2},add:['bogen2'],at:['banja',300,480]},
  {t:'Marfa will nur mit Krone aus dem Sumpf',f:['marfaKrone','m2met'],at:['sumpf',540,488]},
  {t:'Nastja: Beziehung 54 % – Privattanz im VIP-Outfit',v:{na_talk:1,na_drink:1},at:['buehne',260,486]},
  {t:'Nastja: Beziehung 75 % – rückt das Diadem raus',v:{na_talk:3,na_drink:2},at:['buehne',260,486]},
  {t:'Diadem von Nastja bekommen',add:['diadem'],at:['buehne',260,486]},
  {t:'Marfa mit Krone angeworben (Nastja jetzt 81 % – Privattanz im Dessous-Outfit)',f:['marfaDia','marfa'],del:['diadem'],at:['sumpf',540,488]},
  {t:'Nebenquest erledigt (Madame Bescheid gesagt)',f:['t2Done'],del:['bogen2'],at:['banja',300,480]},
  {t:'Nastja: Max-Level-Modus (95 %)',v:{na_talk:4,na_drink:3},at:['buehne',260,486]},
  {t:'Nastja: 100 % – Klick auf sie gibt das Polaroid',v:{na_talk:5,na_drink:3},at:['buehne',260,486]},
  {t:'VIP-Kabine (100 %, Polaroid schon in der Tasche) – Nastja → Privattanz',f:['polaroid'],add:['polaroid'],at:['buehne',260,486]},
  {t:'3 Rubel in der Tasche – beim Privattanz gibt es „Башли“',v:{cash:3},at:['buehne',260,486]},
  {t:'Trinkduell: zu Opa (Haus steht) – Klick auf Opa → Trinkduell',at:['dorf',420,480]},
  {t:'Trinkduell gewonnen – „Hierbleiben“ am Tisch wird zum Ehrenbürger-Ende (bei Dorf-Ruf ≥ 70)',f:['duellSieg'],at:['huette',640,488]},
  {t:'Dorf-Aufgaben: Strom gelegt, Kohle bei Oma, Kater zurück (mit Duellsieg = alle vier)',f:['kabelQ','kabel','kohleGeg','omaKohle','kater','katzeQ','katzeHeim'],at:['dorf',420,480]},
  {t:'Enden: mit Polaroid zu Baba Jagas Tisch (Joint = Nastja-Ende, Hierbleiben = Zahnrad)',at:['huette',640,488]}];
function tNeben(n){const d=tState(TSTEPS.length-1);TNEBEN.slice(0,n+1).forEach(st=>{(st.f||[]).forEach(k=>d.FL[k]=1);Object.assign(d.FL,st.v||{});
  (st.del||[]).forEach(i=>{const j=d.inv.indexOf(i);if(j>=0)d.inv.splice(j,1)});(st.add||[]).forEach(i=>d.inv.push(i));
  if(st.at){d.cur=st.at[0];d.P={x:st.at[1],y:st.at[2]};d.seen[st.at[0]]=1}});return d}
function tState(n){const d={inv:[],FL:{},seen:{wald:1},REM:[],cur:'wald',P:{x:400,y:476},ti:{}};
  TSTEPS.slice(0,n+1).forEach(st=>{(st.f||[]).forEach(k=>d.FL[k]=1);(st.del||[]).forEach(i=>{const j=d.inv.indexOf(i);if(j>=0)d.inv.splice(j,1)});
    (st.add||[]).forEach(i=>d.inv.push(i));(st.rm||[]).forEach(r=>d.REM.push(r));(st.s||[]).forEach(s=>d.seen[s]=1);
    if(st.at){d.cur=st.at[0];d.P={x:st.at[1],y:st.at[2]};d.seen[st.at[0]]=1}});return d}
function tJump(d){if(ss.set(TJUMP,JSON.stringify(d)))location.reload();else loadState(d)}
function testerBoot(){const j=ss.get(TJUMP);if(!j)return;ss.del(TJUMP);try{loadState(JSON.parse(j));setTimeout(()=>testerToast('Tester: Sprung ausgeführt'),600)}catch(e){}}
function testerToast(m){toast(m,0,'tool')}
const TTELE={wald:[400,476],gabel:[320,488],huette:[640,488],innen:[250,470],dorf:[150,486],dorfstr:[420,488],kirche:[420,488],muehle:[700,470],irrwald:[420,486],banjaV:[420,486],banja:[300,480],sperre:[400,488],sumpf:[540,488],fischer:[90,476],ufer:[60,452],unter:[640,470],gnome:[60,472],hoehle:[400,486]};
function openTester(tab){ss.set(TKEY,'1');tab=tab||'p';const B='style="text-align:left;width:100%"';
  const body=tab=='p'?`<button ${B} data-dl="1">▶ Durchlauf: ganzes Spiel automatisch testen (Seite lädt neu, Spielstände bleiben)</button><button ${B} data-dl="b">▶ Durchlauf B: falsche Reihenfolgen (Säge vor Teer, Pope/Zwiebel/Pilzbeet zu früh …)</button><p class="em">Springt zu einem Story-Punkt (Seite lädt neu).</p>${TSTEPS.map((s,i)=>`<button ${B} data-j="${i}">${i+1}. ${s.t}</button>`).join('')}<p class="em" style="margin-top:12px">Nebenquest „Die zweite Tänzerin“, Nastjas Beziehung und die Enden (nach der Träne):</p>${TNEBEN.map((s,i)=>`<button ${B} data-n="${i}">N${i+1}. ${s.t}</button>`).join('')}`:
    tab=='o'?`<p class="em">Nur hinbeamen – am Fortschritt ändert sich nichts.</p>${Object.keys(TTELE).map(id=>`<button ${B} data-o="${id}">${LOCN[id]}</button>`).join('')}`:
    `<p class="em">Gegenstand in die Taschen legen.</p>${Object.keys(ITEMS).map(id=>`<button ${B} data-g="${id}" ${has(id)?'disabled':''}>${IMG(id,'ico sm')} ${ITEMS[id][1]}</button>`).join('')}`;
  const o=openO(`<div class="pan menu" style="max-height:82vh;overflow:auto"><h3>${ic('tool')} Tester-Modus</h3><div class="row"><button data-t="p">Fortschritt</button><button data-t="o">Orte</button><button data-t="g">Gegenstände</button></div>${body}</div><div class="hint">[F9] oder [ESC] schließen</div>`);
  o.querySelectorAll('button').forEach(b=>b.onclick=()=>{const v=b.dataset;
    if(v.t)return openTester(v.t);
    if(v.dl)return location.search='?durchlauf='+(v.dl=='b'?'b':'a');
    if(v.j!=null)return tJump(tState(+v.j));
    if(v.n!=null)return tJump(tNeben(+v.n));
    if(v.o){closeO();if($('#start'))rm('start');busy=false;box.style.display='none';return enter(v.o,TTELE[v.o])}
    if(v.g){if(!has(v.g)){inv.push(v.g);renderInv()}return openTester('g')}})}
addEventListener('keydown',e=>{if(e.target&&/input|textarea/i.test(e.target.tagName))return;
  if(e.key=='F9'&&ss.get(TKEY)){e.preventDefault();if(ovl&&ovl.querySelector('[data-t]'))closeO();else openTester();return}
  if(e.key.length!=1)return;tbuf=(tbuf+e.key.toLowerCase()).slice(-TCODE.length);if(tbuf==TCODE){tbuf='';openTester()}});
