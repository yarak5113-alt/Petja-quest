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
  {t:'In Baba Jagas Hütte',f:['drin'],s:['innen'],at:['innen',250,470]},
  {t:'Joint zerlegt (blaue Pilze)',f:['pilze'],del:['kippe'],add:['pilze'],at:['innen',250,470]},
  {t:'Baba Jaga: Ab zu den Gnomen',f:['bjInfo','labQ'],at:['innen',250,470]},
  {t:'Gnome wollen Mehl',f:['mehlQ'],s:['gnome'],at:['gnome',60,472]},
  {t:'Müller will eine Braut',f:['mullerQ'],s:['muehle'],at:['muehle',700,470]},
  {t:'Wegkarte von Baba Jaga',f:['karte'],add:['karte'],at:['innen',250,470]},
  {t:'Banja gefunden, Madames Liste',f:['clubQ'],add:['liste'],s:['irrwald','banjaV','banja'],at:['banja',300,480]},
  {t:'Fischer-Auftrag + Omas Gebiss',f:['auftrag','gq','ks'],s:['dorfstr','kirche'],at:['kirche',420,488]},
  {t:'Angel gebaut, Brett geholt',f:['angelQ','kraehe','ast'],add:['angel','brett'],rm:['apfelG','kraeheG','altnetzG','brett'],at:['fischer',90,476]},
  {t:'Fisch → Gebiss → Teer',f:['fisch','kater','teer'],add:['teer'],rm:['katerG','gebissG'],at:['fischer',90,476]},
  {t:'Boot geflickt, Säge bekommen',f:['boot'],del:['brett','teer'],add:['saege'],at:['sperre',400,488]},
  {t:'Weg zum Sumpf frei',f:['cut'],s:['sumpf'],at:['sumpf',540,488]},
  {t:'Nastja angeworben',f:['rekrut'],at:['banja',300,480]},
  {t:'Gutschein von Madame',f:['gutschein'],add:['gutschein'],at:['banja',300,480]},
  {t:'„Mehl“ vom Müller',f:['mehl'],del:['gutschein'],add:['mehl'],at:['muehle',700,470]},
  {t:'Stollen offen (Laterne)',f:['stollen'],del:['mehl'],add:['laterne'],s:['hoehle'],at:['hoehle',400,486]},
  {t:'Rezept vom Pilzmeister',f:['recipe'],del:['pilze'],at:['hoehle',400,486]}];
function tState(n){const d={inv:[],FL:{},seen:{wald:1},REM:[],cur:'wald',P:{x:400,y:476},ti:{}};
  TSTEPS.slice(0,n+1).forEach(st=>{(st.f||[]).forEach(k=>d.FL[k]=1);(st.del||[]).forEach(i=>{const j=d.inv.indexOf(i);if(j>=0)d.inv.splice(j,1)});
    (st.add||[]).forEach(i=>d.inv.push(i));(st.rm||[]).forEach(r=>d.REM.push(r));(st.s||[]).forEach(s=>d.seen[s]=1);
    if(st.at){d.cur=st.at[0];d.P={x:st.at[1],y:st.at[2]};d.seen[st.at[0]]=1}});return d}
function tJump(d){if(ss.set(TJUMP,JSON.stringify(d)))location.reload();else loadState(d)}
function testerBoot(){const j=ss.get(TJUMP);if(!j)return;ss.del(TJUMP);try{loadState(JSON.parse(j));setTimeout(()=>testerToast('Tester: Sprung ausgeführt'),600)}catch(e){}}
function testerToast(m){label.textContent=m;setTimeout(()=>{if(label.textContent===m)label.textContent=''},1800)}
const TTELE={wald:[400,476],gabel:[320,488],huette:[640,488],innen:[250,470],dorf:[150,486],dorfstr:[420,488],kirche:[420,488],muehle:[700,470],irrwald:[420,486],banjaV:[420,486],banja:[300,480],sperre:[400,488],sumpf:[540,488],fischer:[90,476],ufer:[60,452],unter:[640,470],gnome:[60,472],hoehle:[400,486]};
function openTester(tab){ss.set(TKEY,'1');tab=tab||'p';const B='style="text-align:left;width:100%"';
  const body=tab=='p'?`<p class="em">Springt zu einem Story-Punkt (Seite lädt neu).</p>${TSTEPS.map((s,i)=>`<button ${B} data-j="${i}">${i+1}. ${s.t}</button>`).join('')}`:
    tab=='o'?`<p class="em">Nur hinbeamen – am Fortschritt ändert sich nichts.</p>${Object.keys(TTELE).map(id=>`<button ${B} data-o="${id}">${LOCN[id]}</button>`).join('')}`:
    `<p class="em">Gegenstand in die Taschen legen.</p>${Object.keys(ITEMS).map(id=>`<button ${B} data-g="${id}" ${has(id)?'disabled':''}>${ITEMS[id][0]} ${ITEMS[id][1]}</button>`).join('')}`;
  const o=openO(`<div class="pan menu" style="max-height:82vh;overflow:auto"><h3>🛠 Tester-Modus</h3><div class="row"><button data-t="p">Fortschritt</button><button data-t="o">Orte</button><button data-t="g">Gegenstände</button></div>${body}</div><div class="hint">[F9] oder [ESC] schließen</div>`);
  o.querySelectorAll('button').forEach(b=>b.onclick=()=>{const v=b.dataset;
    if(v.t)return openTester(v.t);
    if(v.j!=null)return tJump(tState(+v.j));
    if(v.o){closeO();if($('#start'))rm('start');busy=false;box.style.display='none';return enter(v.o,TTELE[v.o])}
    if(v.g){if(!has(v.g)){inv.push(v.g);renderInv()}return openTester('g')}})}
addEventListener('keydown',e=>{if(e.target&&/input|textarea/i.test(e.target.tagName))return;
  if(e.key=='F9'&&ss.get(TKEY)){e.preventDefault();if(ovl&&ovl.querySelector('[data-t]'))closeO();else openTester();return}
  if(e.key.length!=1)return;tbuf=(tbuf+e.key.toLowerCase()).slice(-TCODE.length);if(tbuf==TCODE){tbuf='';openTester()}});
