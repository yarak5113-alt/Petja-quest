// ================= Bedienung: Leiste, Maus-Label, Zeigen, Tipp, Meldungen, Anleitung =================

// ----- Meldungen oben rechts (neuer Gegenstand, Auftrag erledigt, Einstellungen …) -----
function toast(msg,cls){let w=$('#toasts');if(!w){w=document.createElement('div');w.id='toasts';game.appendChild(w)}
  const t=document.createElement('div');t.className='toast '+(cls||'');t.textContent=msg;w.appendChild(t);
  while(w.children.length>4)w.firstChild.remove();setTimeout(()=>t.classList.add('out'),3200);setTimeout(()=>t.remove(),3700)}

// ----- Leiste unten rechts -----
const HUDB=[['tipp','💡','Tipp','H'],['spot','👁','Zeigen','Leertaste'],['tasche','🎒','Taschen','I'],['auftrag','📜','Aufträge','J'],['karte','🗺️','Karte','M'],['menu','☰','Menü','ESC']];
(function(){const old=$('#keys');if(old)old.remove();const h=document.createElement('div');h.id='hud';
  h.innerHTML=HUDB.map(([k,ic,t,key])=>`<button data-h="${k}" title="${t} (${key})"><i>${ic}</i><span>${t}</span><em class="badge"></em></button>`).join('');
  h.onclick=e=>{e.stopPropagation();const b=e.target.closest('button');if(!b)return;b.blur();const k=b.dataset.h;
    if(k=='tipp')tipp();else if(k=='spot')flashSpots();else if(k=='menu')openMenu();else toggleBook(k)};game.appendChild(h)})();
// Leiste und Taschen während Dialogen ausblenden, damit sie nicht im Weg sind
setInterval(()=>game.classList.toggle('busy',busy),100);
function badge(k,on){const b=document.querySelector(`#hud [data-h="${k}"]`);if(b)b.classList.toggle('new',!!on)}

// ----- Name am Mauszeiger; Ausgänge mit ➜ und eigenem Mauszeiger -----
const isExit=o=>!!o&&(!!o.go||/^(Schild|Ausgang|Tür zum|Fenster)/.test(o.n));
document.querySelectorAll('.interactive[data-id]').forEach(el=>{if(isExit(T[el.dataset.id]))el.classList.add('exit')});
function hoverLabel(e){const h=e.target.closest('.interactive'),o=h&&T[h.dataset.id];
  if(busy||ovl||!o||$('#start')||$('#fg')||$('#cut')){label.style.opacity=0;return}
  label.textContent=isExit(o)?'➜ '+o.n.replace(/^Schild: /,''):o.n;label.classList.toggle('ex',isExit(o));
  const r=game.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,w=label.offsetWidth/2+4;
  label.style.left=Math.max(w,Math.min(r.width-w,x))+'px';label.style.top=(y<60?y+28:y-36)+'px';label.style.opacity=1}

// ----- Alles Klickbare zeigen (Leertaste halten oder 👁) -----
let spotT=null;
function showSpots(on){let d=$('#spots');if(!on){if(d)d.remove();return}
  if(d||busy||ovl||changing||!cur||$('#start')||$('#fg')||$('#cut'))return;d=document.createElement('div');d.id='spots';const r=game.getBoundingClientRect();
  document.querySelectorAll('.interactive[data-id]').forEach(el=>{const id=el.dataset.id,o=T[id];if(!o||id=='petja')return;const room=el.closest('.room');if(room&&!room.classList.contains('on'))return;
    const b=el.getBoundingClientRect();if(b.width<2||b.height<2)return;const s=document.createElement('div');s.className='spot'+(isExit(o)?' ex':'');
    s.style.left=(b.left+b.width/2-r.left)+'px';s.style.top=(b.top+b.height/2-r.top)+'px';s.innerHTML=`<i></i><span>${isExit(o)?'➜ '+o.n.replace(/^Schild: /,''):o.n}</span>`;d.appendChild(s)});
  game.appendChild(d)}
function flashSpots(){showSpots(true);clearTimeout(spotT);spotT=setTimeout(()=>showSpots(false),2600)}
addEventListener('keydown',e=>{if(e.key!==' '||/input|textarea|button/i.test(e.target.tagName))return;e.preventDefault();
  if($('#fg')||$('#cut')||$('#start'))return;if(busy){if(!e.repeat)advance();return}if(!e.repeat)showSpots(true)});
addEventListener('keyup',e=>{if(e.key===' '){clearTimeout(spotT);showSpots(false)}});
game.addEventListener('mousedown',()=>showSpots(false));

// ----- Tipp: Petja überlegt laut, was als Nächstes dran ist -----
function tipp(){if(busy||ovl||changing||!cur||$('#start')||$('#fg')||$('#cut'))return;const ns=nextSteps();
  if(!ns.length)return say([['P','Hm. Keine Ahnung. Natürlich.'],['P','Vielleicht red ich nochmal mit allen. Oder ich schau mich genauer um. (Leertaste zeigt alles Klickbare.)']]);
  const L=[['P',['Mal überlegen...','Na gut. Denken. Muss ja.','Was war nochmal der Plan? Ach ja.'][Math.random()*3|0]],['P','Als Nächstes: '+ns[0].q.t+'.']];
  if(ns[1]&&ns[1].top!==ns[0].top)L.push(['P','Oder ich kümmere mich erst um: '+ns[1].q.t+'.']);say(L)}

// ----- Meldungen bei neuen Gegenständen und Auftragsfortschritt -----
let invSeen=null,quiet=0,qBase=null;
const _renderInv=renderInv;renderInv=function(){_renderInv();
  if(invSeen&&!quiet)inv.filter(i=>!invSeen.includes(i)).forEach(i=>{const it=ITEMS[i];if(it){toast(it[0]+' Eingesteckt: '+it[1],'item');badge('tasche',1)}});invSeen=[...inv]};
const _loadState=loadState;loadState=function(d){quiet=1;try{_loadState(d)}finally{quiet=0;invSeen=[...inv];qBase=null;entryT=Date.now()}};
function qSnap(){const m={};const walk=(q,lv,p)=>{if(!q.v)return;const k=p+'/'+q.t;m[k]={ok:!!q.ok,lv,t:q.t};(q.s||[]).forEach(c=>walk(c,lv+1,k))};quests().forEach(q=>walk(q,0,''));return m}
setInterval(()=>{if(!cur||$('#start')||$('#cut')){qBase=null;return}const s=qSnap();
  if(qBase){let n=0,upd=0;for(const k in s){const a=s[k],b=qBase[k];
      if(!b){if(a.lv==0){if(n++<3)toast('📜 Neuer Auftrag: '+a.t,'new')}else upd=1}
      else if(a.ok&&!b.ok&&n++<3)toast((a.lv==0?'🏆 Auftrag erledigt: ':'✔ ')+a.t,'done')}
    if(upd&&!n)toast('📜 Aufträge aktualisiert','new');if(n||upd)badge('auftrag',1)}
  qBase=s},700);

// ----- Anleitung beim ersten Spielen (und über Menü → Steuerung) -----
function showTutorial(){const o=openO(`<div class="pan tut"><h3>So spielst du</h3>
  <div class="tips"><div><b>🖱️</b><p><strong>Klick in die Welt</strong>, um Petja laufen zu lassen. Klick auf Dinge und Leute, um sie anzusehen, zu nehmen oder mit ihnen zu reden.</p></div>
  <div><b>➜</b><p><strong>Schilder und Türen</strong> führen zu neuen Orten. Der Mauszeiger wird dort zum Pfeil.</p></div>
  <div><b>👁</b><p><strong>Leertaste halten</strong> zeigt alles, was man in der Szene anklicken kann.</p></div>
  <div><b>💡</b><p><strong>Kommst du nicht weiter?</strong> Der Tipp-Knopf (H) sagt dir, was als Nächstes dran ist. Alle Aufträge stehen unter 📜 (J).</p></div></div>
  <button class="mb big go">Los geht's!</button></div>`,'tutO');o.querySelector('.go').onclick=()=>{closeO();try{localStorage.setItem('petjaTut','1')}catch(e){}}}
setInterval(()=>{let d=0;try{d=localStorage.getItem('petjaTut')}catch(e){d=1}if(d||!cur||busy||ovl||changing||$('#start')||$('#cut')||$('#fg'))return;
  try{localStorage.setItem('petjaTut','1')}catch(e){}showTutorial()},1500);
