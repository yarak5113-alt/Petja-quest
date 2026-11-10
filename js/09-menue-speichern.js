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
function qHTML(list,lv){return list.filter(q=>q.v).map(q=>`<div class="q l${lv} ${q.ok?'done':''}"><span>${q.ok?'☑':'☐'} ${q.t}</span>${q.d?`<i>${q.d}</i>`:''}${q.s?qHTML(q.s,lv+1):''}</div>`).join('')}
let ovl=null;function closeO(){if(ovl){ovl.remove();ovl=null}}
function openO(html,cls){closeO();ovl=document.createElement('div');ovl.className='ovl '+(cls||'');ovl.innerHTML=html;ovl.onclick=e=>e.stopPropagation();$('#game').appendChild(ovl);return ovl}
function openInv(){const o=openO(`<div class="pan inv2"><h3>Taschen</h3><div class="grid">${inv.length?inv.map(id=>{const it=ITEMS[id]||['❔',id,id];return`<div class="card" data-i="${id}"><b>${it[0]}</b><span>${it[1]}</span></div>`}).join(''):'<p class="em">Leer. Wie mein Kühlschrank.</p>'}</div><p class="desc">Klick auf einen Gegenstand.</p></div>
  <div class="pan qs"><h3>Aufträge</h3>${qHTML(quests(),0)}</div><div class="hint">[I] oder [ESC] schließen</div>`,'two');
  o.querySelectorAll('.card').forEach(c=>c.onclick=()=>{const it=ITEMS[c.dataset.i];o.querySelector('.desc').textContent=it?it[1]+': '+it[2]:''})}
const MAPN={irrwald:[-22,10],banjaV:[-22,36],banja:[-22,62],muehle:[10,10],dorf:[42,10],dorfstr:[74,10],kirche:[106,10],huette:[42,36],innen:[74,36],wald:[10,62],gabel:[42,62],sperre:[74,62],sumpf:[106,62],fischer:[74,88],ufer:[106,88],unter:[106,112],gnome:[138,88],hoehle:[170,88]};
const MAPE=[['muehle','irrwald'],['irrwald','banjaV'],['banjaV','banja'],['banjaV','muehle'],['wald','gabel'],['gabel','huette'],['gabel','sperre'],['huette','dorf'],['huette','innen'],['dorf','dorfstr'],['dorfstr','kirche'],['dorf','muehle'],['sperre','sumpf'],['sperre','fischer'],['fischer','ufer'],['ufer','unter'],['ufer','gnome'],['gnome','hoehle']];
function openMap(){const P2=(id)=>MAPN[id];let svg=`<svg viewBox="-44 0 232 122" class="map">`;
  MAPE.forEach(([a,b])=>{if(seen[a]&&seen[b])svg+=`<line x1="${P2(a)[0]}" y1="${P2(a)[1]}" x2="${P2(b)[0]}" y2="${P2(b)[1]}" stroke="#8a7050" stroke-width="1.2" stroke-dasharray="2 1.5"/>`});
  Object.keys(MAPN).forEach(id=>{if(!seen[id])return;const[x,y]=P2(id),c=id==cur;svg+=`<circle cx="${x}" cy="${y}" r="${c?3.4:2.4}" fill="${c?'#e04020':'#c8a060'}" stroke="#2a1a0a" stroke-width=".6"/><text x="${x}" y="${y+6}" font-size="3.2" text-anchor="middle" fill="#f0e0c0">${LOCN[id]}</text>`});
  openO(`<div class="pan mp"><h3>Karte</h3>${svg}</svg><p class="em">● Du bist hier · Nur besuchte Orte</p></div><div class="hint">[M] oder [ESC] schließen</div>`)}
const SKEY='petjaQuestSave';
function slots(){try{return JSON.parse(localStorage.getItem(SKEY)||'[]')}catch(e){return[]}}
function saveGame(n){if(!cur)return;const d={inv:[...inv],FL:{...FL},seen:{...seen},cur,P:{x:P.x,y:P.y},REM:[...REM],ti:Object.fromEntries(Object.entries(T).map(([k,o])=>[k,o.i||0])),date:new Date().toLocaleString('de-DE')};
  const a=slots();a[n]=d;try{localStorage.setItem(SKEY,JSON.stringify(a));return true}catch(e){return false}}
function loadGame(n){const d=slots()[n];if(d)loadState(d)}
function loadState(d){closeO();if($('#start'))rm('start');
  // alte Spielstände: Knochen wurde zu Würmern
  d.inv=d.inv.map(i=>i=='knochen'?'wuermer':i);d.REM=d.REM.map(r=>r=='knochenG'?'wuermerG':r);
  inv.length=0;inv.push(...d.inv);Object.keys(FL).forEach(k=>delete FL[k]);Object.assign(FL,d.FL);Object.assign(seen,d.seen);d.REM.forEach(rm);
  Object.entries(d.ti||{}).forEach(([k,v])=>{if(T[k])T[k].i=v});if(FL.cut){const h=$('[data-id=sHolz]');if(h)h.style.display='none'}
  for(const k in cache)delete cache[k];renderInv();busy=false;box.style.display='none';enter(d.cur,[d.P.x,d.P.y])}
function openMenu(view){const a=slots(),sl=(mode)=>[0,1,2].map(n=>`<button data-${mode}="${n}" ${mode=='l'&&!a[n]?'disabled':''}>Slot ${n+1}: ${a[n]?LOCN[a[n].cur]+' – '+a[n].date:'leer'}</button>`).join('');
  const body=view=='s'?`<h3>Speichern</h3>${cur&&!$('#start')?sl('s'):'<p class="em">Erst spielen, dann speichern.</p>'}<button data-v="m">Zurück</button>`:view=='l'?`<h3>Laden</h3>${sl('l')}<button data-v="m">Zurück</button>`:
    view=='k'?`<h3>Steuerung</h3><table><tr><td>Linksklick</td><td>Laufen, ansehen, benutzen, sprechen</td></tr><tr><td>Klick in den Text</td><td>Dialog weiter</td></tr><tr><td>Schilder</td><td>Zum nächsten Ort</td></tr><tr><td>I</td><td>Taschen &amp; Aufträge</td></tr><tr><td>M</td><td>Karte</td></tr><tr><td>V</td><td>Petjas Stimme an/aus</td></tr><tr><td>ESC</td><td>Menü / schließen</td></tr></table><button data-v="m">Zurück</button>`:
    `<h3>Menü</h3><button data-v="x">Weiterspielen</button><button data-v="s">Spiel speichern</button><button data-v="l">Spielstand laden</button><button data-v="i">Taschen &amp; Aufträge</button><button data-v="map">Karte</button><button data-v="k">Steuerung</button>`;
  const o=openO(`<div class="pan menu">${body}</div><div class="hint">[ESC] schließen</div>`);
  o.querySelectorAll('button').forEach(b=>b.onclick=()=>{const v=b.dataset.v;if(v=='x')return closeO();if(v=='i')return openInv();if(v=='map')return openMap();if(v)return openMenu(v);
    if(b.dataset.s!=null){const ok=saveGame(+b.dataset.s);openMenu('s');const m=document.createElement('p');m.className='em';m.textContent=ok?'Gespeichert!':'Speichern nicht möglich (Browser blockiert Speicher).';ovl.querySelector('.pan').appendChild(m)}
    if(b.dataset.l!=null)loadGame(+b.dataset.l)})}
addEventListener('keydown',e=>{if($('#fg')||$('#cut'))return;const k=e.key.toLowerCase();
  if(k=='escape'){if(ovl)closeO();else openMenu()}
  else if(k=='i'&&!$('#start')){if(ovl&&ovl.classList.contains('two'))closeO();else openInv()}
  else if(k=='m'&&!$('#start')){if(ovl&&ovl.querySelector('.mp'))closeO();else openMap()}
  else if(k=='v')toggleVoice()});
