// ================= Automatischer Durchlauf (Regressionstest) =================
// Spielt das komplette Spiel vom Intro bis zum Abspann mit den ECHTEN Klick-Handlern durch:
// - Ortswechsel nur über Schilder/Türen, die im aktuellen Ort sichtbar sind (gesperrte Wege fallen auf)
// - Objekte nur anklicken, wenn sie im aktuellen Ort sichtbar sind
// - Dialoge werden weitergeklickt, Minispiele über den eingebauten „Überspringen“-Weg gelöst
// - nach jedem Schritt wird geprüft, ob das erwartete Flag/der Gegenstand da ist
// Starten: Tester-Menü → „Durchlauf“ oder index.html?durchlauf (headless: node tools/durchlauf.js)
// Spielstände werden dabei NICHT angefasst (Autosave ist während des Laufs aus).
const DL={on:false,log:[],t0:0};
function dlLog(m){DL.log.push(m);console.log('DURCHLAUF| '+m);const p=document.getElementById('dlPanel');if(p)p.textContent=DL.log.slice(-12).join('\n')}
const dlSleep=ms=>new Promise(r=>setTimeout(r,ms));
// offene kurze Timer des Spiels (Pausen zwischen zwei Gesprächen, Szenenwechsel …) – wird erst im Durchlauf eingehängt
const DLT=new Set();function dlTimers(){const st=window.setTimeout,ct=window.clearTimeout;
  window.setTimeout=function(f,ms,...a){if(typeof f!=='function'||!(ms>0&&ms<=2600))return st(f,ms,...a);const id=st(()=>{DLT.delete(id);f(...a)},ms);DLT.add(id);return id};
  window.clearTimeout=id=>{DLT.delete(id);ct(id)}}
const dlBusy=()=>DLT.size>0||busy||changing||!!$('#fg')||!!$('#cut')||!!ovl||!!ACT||!!mv||!!$('#start');
const dlVis=id=>{const e=document.querySelector(`#r-${cur} [data-id="${id}"]`);return!!e&&getComputedStyle(e).display!=='none'&&!e.closest('[style*="display: none"]')};

// Warten, bis Ruhe ist: Dialoge weiterklicken, „Überspringen“ bei Minispielen wählen, sonstige Fenster schließen
async function dlIdle(max=120000){const t0=Date.now();let calm=0;
  while(Date.now()-t0<max){
    if(ovl){const sk=ovl.querySelector('[data-m=skip]');if(sk)sk.click();else closeO()}
    else if(busy)advance();
    calm=dlBusy()?0:calm+1;if(calm>=5)return;
    await dlSleep(50)}
  throw new Error(`hängt fest in „${LOCN[cur]||cur}“ (Dialog=${busy}, Wechsel=${changing}, Minispiel=${!!$('#fg')}, Szene=${!!$('#cut')}, Fenster=${!!ovl}, Aktion=${ACT})`)}

// Klick auf ein Objekt im aktuellen Ort – nur wenn es dort sichtbar ist
function dlClick(id){if(!dlVis(id))throw new Error(`„${(T[id]||{}).n||id}“ ist in „${LOCN[cur]||cur}“ nicht klickbar`);use(id)}

// Wegenetz aus den Schildern/Türen bauen (Schilder mit eigener Logik von Hand)
const DL_FN={sSumpf2:'sumpf',sFisch:'fischer',sUfer:'ufer',sGN:'gnome',sHO:'hoehle',tuer:'innen',buehne:'buehne'};
function dlGraph(){const g={},roomOf=id=>{const e=document.querySelector(`.room [data-id="${id}"]`);return e&&e.closest('.room').id.slice(2)};
  Object.keys(T).forEach(id=>{const o=T[id],to=o.go||DL_FN[id],from=roomOf(id);if(to&&from&&from!==to)(g[from]=g[from]||[]).push({to,via:id})});
  (g.muehle=g.muehle||[]).push({to:'banjaV',via:'IRRWALD'});return g}
async function dlGoto(target){if(cur===target)return;const g=dlGraph(),prev={[cur]:null},q=[cur];
  while(q.length){const r=q.shift();if(r===target)break;(g[r]||[]).forEach(e=>{if(!(e.to in prev)){prev[e.to]={from:r,e};q.push(e.to)}})}
  if(!(target in prev))throw new Error(`kein Weg von „${LOCN[cur]}“ nach „${LOCN[target]||target}“`);
  const path=[];for(let r=target;prev[r];r=prev[r].from)path.unshift(prev[r].e);
  for(const e of path){await dlIdle();const from=cur;
    if(e.via==='IRRWALD'){dlClick('sIW');await dlIdle();for(const d of'LLRG'){dlClick('sI'+d);await dlIdle()}}   // Weg laut Baba Jagas Karte
    else{dlClick(e.via);await dlIdle()}
    if(cur!==e.to)throw new Error(`Weg „${LOCN[from]}“ → „${LOCN[e.to]||e.to}“ über „${(T[e.via]||{}).n||e.via}“ ist gesperrt`)}}

// Ein Schritt: in Ort gehen, Objekt anklicken (bis zu max-mal), bis die Bedingung erfüllt ist
async function dlStep(t,room,id,until,max=6){await dlGoto(room);
  for(let i=0;i<max&&!until();i++){await dlIdle();if(cur!==room)await dlGoto(room);dlClick(id);await dlIdle()}
  if(!until())throw new Error(`„${t}“ klappt nicht: ${max}× auf „${(T[id]||{}).n||id}“ in „${LOCN[room]||room}“ geklickt`);dlLog('✓ '+t)}
// Gegenprobe: falsche Reihenfolge darf nichts kaputt machen
async function dlProbe(t,room,id,check){await dlGoto(room);await dlIdle();dlClick(id);await dlIdle();
  if(!check())throw new Error(`Gegenprobe „${t}“ fehlgeschlagen`);dlLog('✓ Gegenprobe: '+t)}
function dlExpect(t,c){if(!c())throw new Error('Erwartung verletzt: '+t);dlLog('✓ '+t)}

// Nymphen-Interview: Eigenschaftskarte ehrlich ausfüllen, die passende anwerben
// Im Sumpf stehen immer 3 zufällige Nymphen; neu gemischt wird beim Verlassen – also notfalls raus und wieder rein
async function dlRecruit(){
  for(let round=0;round<25&&!FL.rekrut;round++){if(round){await dlGoto('sperre')}await dlGoto('sumpf');
    for(const s of['slot0','slot1','slot2']){if(FL.rekrut)break;if(!dlVis(s))continue;await dlIdle();use(s);
      if(!ovl||!ovl.querySelector('.go'))throw new Error('Interview-Fenster geht nicht auf');
      const tr=NT[T[s].id];ovl.querySelectorAll('input').forEach(i=>i.checked=!!tr[i.dataset.k]);
      if(tr.s&&tr.t&&tr.v&&tr.r)ovl.querySelector('.go').click();else closeO();await dlIdle()}}
  if(!FL.rekrut)throw new Error('keine Nymphe passt auf Madames Liste (25× den Sumpf neu betreten)');dlLog('✓ Nymphe angeworben')}

async function durchlauf(){if(DL.on)return;DL.on=true;DL.log=[];DL.t0=Date.now();
  const pnl=document.createElement('pre');pnl.id='dlPanel';pnl.style.cssText='position:absolute;left:8px;top:8px;z-index:99;max-width:60%;margin:0;padding:6px 10px;background:rgba(0,0,0,.75);color:#bfe;font:12px monospace;pointer-events:none;white-space:pre-wrap';$('#game').appendChild(pnl);
  // Testumgebung: kein Laufen (sofort da), kein Autosave, keine Leerlauf-Sprüche, stumm
  dlTimers();walkTo=(tx,ty,cb)=>{P.x=tx;P.y=ty;render();if(cb)setTimeout(cb,0)};autoSave=()=>false;OPT.barks=false;OPT.sfx=0;OPT.vox=0;VOICE_ON=false;
  const has=i=>inv.includes(i);
  try{
    dlLog('Start: Neues Spiel');
    while(!$('#bNew')||$('#bNew').disabled)await dlSleep(100);
    $('#bNew').click();await dlIdle();
    ['fishing','wels','tableGame','pilzbeet','hausbau','craft'].forEach(n=>FL['fail_'+n]=3);   // Minispiele über „Überspringen“
    dlExpect('Intro vorbei, Petja im Birkenwald',()=>cur==='wald');

    // ---- Akt 1: in Baba Jagas Hütte ----
    await dlStep('Joint-Stummel eingesteckt','wald','kippe',()=>has('kippe'));
    await dlStep('Baba Jagas Tür ist nur Deko','huette','tuer',()=>FL.bjNo);
    await dlStep('Opa will Schnaps für die Leiter','dorf','opa',()=>FL.leiterQ);
    await dlStep('Kusmitsch rückt den Schnaps nicht raus','fischer','fischer',()=>FL.schnapsQ);
    await dlProbe('Schnaps klauen, während Kusmitsch hinschaut','fischer','schnaps',()=>!has('schnaps'));
    await dlStep('Würmer gesammelt','huette','wuermer',()=>has('wuermer'));
    await dlStep('Würmer an Kusmitschs Schnur','unter','schnur',()=>FL.tied);
    await dlStep('Wels lenkt Kusmitsch ab','unter','schnur',()=>FL.ablenk);
    await dlStep('Selbstgebrannter geschnappt','fischer','schnaps',()=>has('schnaps'));
    await dlStep('Leiter von Opa','dorf','opa',()=>has('leiter'));
    await dlStep('Durchs Fenster in die Hütte','huette','tuer',()=>FL.drin&&cur==='innen');
    dlExpect('Leiter nach dem Einstieg weg',()=>!has('leiter'));
    await dlGoto('huette');await dlGoto('innen');dlLog('✓ Wieder rein ohne Leiter');
    await dlStep('Joint zerlegt (blaue Pilze)','innen','tisch',()=>FL.pilze);
    await dlStep('Baba Jaga schickt mich zu den Gnomen','innen','baba',()=>FL.bjInfo&&FL.labQ);

    // ---- Akt 2: Mehl, Banja, Sperre, Opas Haus ----
    await dlStep('Gnome wollen Mehl','gnome','sHO',()=>FL.mehlQ);
    await dlStep('Müller will eine Braut','muehle','muehle',()=>FL.mullerQ);
    await dlStep('Wegkarte von Baba Jaga','innen','baba',()=>has('karte'));
    await dlStep('Madame will eine Neue','banja','madame',()=>FL.clubQ&&has('liste'));
    await dlStep('Opas rostige Säge','dorf','opa',()=>has('rsaege'));
    await dlStep('Säge beim Schmied geschärft','schmiede','schmied',()=>has('saege')&&FL.schuld);
    await dlProbe('Sägen ohne Opas Erlaubnis','sperre','sHolz',()=>FL.opaRuf&&!FL.cut&&has('saege'));
    await dlStep('Oma vermisst ihr Gebiss','dorfstr','oma',()=>FL.gq);
    await dlProbe('Kater ohne Fisch','kirche','kater',()=>FL.ks&&!FL.kater);
    await dlStep('Kusmitsch angelt nicht für mich','fischer','fischer',()=>FL.angelQ);
    await dlStep('Apfel gepflückt','gabel','apfel',()=>has('apfel'));
    await dlStep('Krähe vom Ast geworfen','wald','kraehe',()=>FL.kraehe);
    await dlStep('Ast geholt','wald','ast',()=>FL.ast);
    await dlStep('Wäscheleine → Angel','dorfstr','waesche',()=>has('angel'));
    await dlStep('Fisch geangelt','fischer','see',()=>FL.fisch);
    dlExpect('Angel nach dem Fang weg',()=>!has('angel'));
    await dlStep('Kater lässt das Gebiss los','kirche','kater',()=>FL.kater);
    await dlStep('Gebiss aufgehoben','kirche','gebiss',()=>has('gebiss'));
    await dlStep('Teer von Oma','dorfstr','oma',()=>has('teer'));
    await dlStep('Teer zu Opa, Birken frei','dorf','opa',()=>FL.deal);
    await dlStep('Birken gesägt, Opas Haus gebaut','sperre','sHolz',()=>FL.cut&&FL.haus);
    dlExpect('Säge nach dem Hausbau zurück bei Opa',()=>!has('saege'));
    await dlRecruit();
    await dlStep('Gutschein von Madame','banja','madame',()=>has('gutschein'));
    await dlStep('„Mehl“ vom Müller','muehle','muehle',()=>has('mehl'));
    await dlStep('Stollen offen','gnome','gnom1',()=>FL.stollen);
    await dlStep('Blaue Pilze in der Höhle','hoehle','lpilze',()=>has('blaupilze'));
    await dlStep('Rezept von Baba Jaga','innen','baba',()=>FL.recipe&&has('phiole')&&has('filter'));

    // ---- Akt 3: drei Zutaten, dann das Finale ----
    await dlProbe('Privattanz vor der Zwiebel','banja','madame',()=>!FL.booked&&!FL.traene);
    await dlProbe('Glut ohne Weihwasser','schmiede','schmied',()=>FL.glutQ&&!FL.glut);
    await dlStep('Ur-Spore aus dem Pilzbeet','gnome','pilzbeet',()=>has('spore'));
    await dlStep('Pope hinterm Banja geweckt','banjaH','pope',()=>FL.popeBack);
    await dlStep('Weihwasser vom Popen','kirche','pope2',()=>has('weihwasser'));
    await dlStep('Glut vom Schmied','schmiede','schmied',()=>has('glut'));
    await dlStep('Zwiebel aus dem Gnombeet','gnome','kohl',()=>has('zwiebel'));
    await dlStep('Zwiebel in die Lüftung','banjaH','lueftungH',()=>FL.zwIn);
    await dlProbe('Madame bucht nicht selbst, schickt zu Nastja','banja','madame',()=>!FL.booked&&cur==='banja');
    await dlStep('Privattanz → Nastjas Träne','buehne','nastja2',()=>has('traene'));
    await dlStep('Ausweg-Joint gebaut','innen','tisch',()=>FL.ende);
    const t0=Date.now();while(!$('#abspann')&&Date.now()-t0<90000){if(busy)advance();await dlSleep(100)}
    dlExpect('Abspann läuft',()=>!!$('#abspann'));
    dlLog(`Taschen am Ende: ${inv.join(', ')||'leer'}`);
    dlLog(`ERFOLG – Durchlauf komplett in ${Math.round((Date.now()-DL.t0)/1000)} s`);document.title='DURCHLAUF OK'}
  catch(e){dlLog('FEHLER: '+e.message);dlLog(`Stand: Ort=${cur}, Taschen=[${inv.join(', ')}]`);dlLog('Flags: '+Object.keys(FL).filter(k=>FL[k]&&!/^(h_|s_|fail_)/.test(k)).join(' '));document.title='DURCHLAUF FEHLER'}
  dlLog('ENDE');pnl.style.pointerEvents='auto'}
if(/[?&]durchlauf\b/.test(location.search))setTimeout(durchlauf,300);
