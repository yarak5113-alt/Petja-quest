// ================= Patch Notes (Startmenü) =================
// Neues Update? Einfach OBEN einen Eintrag ergänzen. v muss eindeutig sein – daran erkennt das Spiel, ob der Spieler die Notes schon kennt.
const PATCH=[
  {v:'1.4',d:'10.11.2026',t:'Bessere Bedienung & neue Menüs',n:[
    'Knopfleiste oben rechts: Tipp, Zeigen, Taschen, Aufträge, Karte, Menü – verschwindet während Gesprächen',
    'Leertaste halten zeigt alles, was man anklicken kann',
    '💡 Tipp-Knopf (H): Petja sagt, was als Nächstes dran ist',
    'Meldungen für neue Gegenstände und erledigte Aufträge',
    'Neues Tagebuch, Pausemenü, Speicherplätze und Einstellungen',
    'Kurze Anleitung beim ersten Spielstart',
    'Neuigkeiten wie diese hier im Startmenü']},
  {v:'1.3',d:'10.11.2026',t:'Würmer für den Wels',n:[
    'Kusmitschs Wels beißt jetzt auf Würmer – zu finden vor Baba Jagas Hütte, jederzeit einsammelbar',
    'Mehr Hinweise beim Fischer und an der Angelschnur']},
  {v:'1.2',d:'10.11.2026',t:'Vor dem Banja',n:[
    'Neuer Ort: das Blockhaus im dunklen Wald vor dem Banja',
    'Größere Wegweiser, Irrwald-Schilder besser lesbar',
    'Petja schrumpft nicht mehr so schnell, wenn er nach hinten läuft']},
  {v:'1.1',d:'10.11.2026',t:'Petja hat eine Stimme',n:[
    'Petja spricht seine Zeilen (V schaltet die Stimme an/aus)',
    'Steht Petja zu lange rum, sagt er was zum Ort']}];

(function(){const st=$('#start');if(!st)return;let seenV='';try{seenV=localStorage.getItem('petjaPatch')||''}catch(e){}
  const L=PATCH[0],isNew=seenV!==L.v,tb=st.querySelector('.tbox');
  const b=document.createElement('button');b.id='bNews';b.innerHTML='📰 Neuigkeiten'+(isNew?' <em class="newtag">NEU</em>':'');tb.insertBefore(b,tb.querySelector('.tsub'));
  const card=document.createElement('div');card.id='newsCard';card.innerHTML=`<small>${isNew?'NEU · ':''}Version ${L.v} · ${L.d}</small><b>${L.t}</b><ul>${L.n.slice(0,3).map(x=>`<li>${x}</li>`).join('')}</ul><span>Alle Neuigkeiten ansehen ›</span>`;st.appendChild(card);
  const open=e=>{e.stopPropagation();try{localStorage.setItem('petjaPatch',L.v)}catch(e){}b.innerHTML='📰 Neuigkeiten';card.querySelector('small').textContent=`Version ${L.v} · ${L.d}`;
    openO(`<div class="pan news"><button class="x" title="Schließen (ESC)">✕</button><h3>📰 Neuigkeiten</h3>${PATCH.map((p,i)=>`<div class="pn ${i==0?'latest':''}">
      <div class="pnh"><b>${p.t}</b><span>v${p.v} · ${p.d}</span></div><ul>${p.n.map(x=>`<li>${x}</li>`).join('')}</ul></div>`).join('')}</div>`,'newsO')};
  b.onclick=open;card.onclick=open})();
