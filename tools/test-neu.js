// Automatischer Testlauf für die neueren Teile (Dorf-Quests, Trafo, Verteilerkasten, Duell, Tanz, Russisch).
//   node tools/test-neu.js
// Läuft in Edge headless (wie die Bild-Werkzeuge), ohne Spielstand anzufassen: die Seite wird mit einem Testskript in einer
// Temp-Datei geöffnet, das Ergebnis aus dem DOM gelesen. Zwei Durchgänge:
//   A) Welt in echter Zeit: Trafohäuschen, Rätsel lösen, Kohle für Oma, Kater, Duell ohne Geld, alle vier Aufgaben,
//      Kusmitschs Kahn (Teer, Haken, Opa verdünnt, Heben, Versöhnung), Russisch.
//   B) Tanz mit angehaltener Zeit (performance.now / requestAnimationFrame werden Bild für Bild weitergestellt):
//      Menüknöpfe je Outfit, kein Geld, Twerken: Start-Pose nur am Anfang, tiefster Frame halten, Übergang hinaus.
// Ausgabe: eine Zeile PASS/FAIL je Prüfung, Exit-Code 1 bei Fehlern.
const fs=require('fs'),path=require('path'),os=require('os'),{execFileSync}=require('child_process');
const root=path.join(__dirname,'..'),EDGE='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const basis=fs.readFileSync(path.join(root,'index.html'),'utf8').replace('<head>',`<head><base href="file:///${root.replace(/\\/g,'/')}/">`);

const GEMEINSAM=`const R=[];const ok=(n,b,info)=>R.push((b?'PASS ':'FAIL ')+n+(info?' – '+info:''));
window.onerror=(m,u,l)=>R.push('FAIL Skriptfehler: '+m+' @'+(u||'').split('/').pop()+':'+l);
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const fertig=()=>{document.getElementById('out').textContent=R.join('\\n')};`;

const WELT=`${GEMEINSAM}
const durch=async(n=25)=>{for(let i=0;i<n&&busy;i++){advance();await wait(60)}};
(async()=>{await wait(1500);try{
  const st=document.querySelector('#start');if(st)st.remove();try{closeO()}catch(e){}
  ok('Kein Geld im Spiel',typeof player==='undefined'&&!('cash' in FL));
  enter('schmiede',[500,470]);await wait(1300);try{closeO()}catch(e){}await durch();
  ok('Trafohäuschen auf dem Schmiedehof',!!document.querySelector('#r-schmiede [data-id=trafo]')&&!!T.trafo);
  busy=false;queue=[];T.trafo.fn();await durch();ok('Trafo ohne Auftrag startet kein Rätsel',!document.getElementById('fg'));
  FL.kabelQ=1;if(!has('kabel'))inv.push('kabel');const _r=Math.random;Math.random=()=>0;busy=false;queue=[];T.trafo.fn();await durch();Math.random=_r;await wait(300);
  const cv=document.getElementById('fg');ok('Trafo mit Auftrag öffnet den Verteilerkasten',!!cv);
  if(cv){const r=cv.getBoundingClientRect(),klick=(i,j,n)=>{for(let k=0;k<n;k++)cv.dispatchEvent(new MouseEvent('click',{bubbles:true,clientX:r.left+(184+i*72+36)/800*r.width,clientY:r.top+(74+j*72+36)/500*r.height}))};
    [[0,0,1],[1,0,3],[1,1,3],[2,1,3],[2,2,1],[2,3,1],[3,1,3],[3,2,3],[4,2,1],[5,2,1]].forEach(a=>klick(...a));await wait(2600);await durch(30)}
  ok('Verteilerkasten gelöst',!!FL.kabel);ok('Fjodor gibt sofort die Kohle',has('kohle')&&!!FL.kohleGeg);
  ok('Kohlensack darf auf Oma gezogen werden',passt('kohle','oma'));
  busy=false;queue=[];T.oma.fn();await durch();ok('Oma nimmt die Kohle',!!FL.omaKohle&&!has('kohle'));
  FL.kater=1;FL.katzeQ=1;FL.weih=1;busy=false;queue=[];katerUnterSteg();await durch();ok('Kater unter dem Pier aufgehoben',has('katze'));
  ok('Kater sitzt im Raum „Unter dem Pier“',document.getElementById('katerSteg').parentNode.id==='r-unter');
  busy=false;queue=[];T.pope2.fn();await durch();ok('Kater zurück bei Vater Ignati',!!FL.katzeHeim&&!has('katze'));
  busy=false;queue=[];duellSieg();await durch();ok('Duell gewonnen, ohne Geld',!!FL.duellSieg&&!('cash' in FL));
  ok('Alle vier Dorf-Aufgaben erledigt',alleVierQuests());
  // Kusmitschs Kahn
  FL.haus=1;FL.welsTalk=1;const relK=relOf('Fischer Kusmitsch');busy=false;queue=[];T.fischer.fn();await durch();ok('Kusmitsch gibt den Auftrag „Kahn“',!!FL.kahnQ);
  busy=false;queue=[];T.oma.fn();await durch();ok('Oma gibt Teer (nach der Kohle)',has('teerdose'));
  busy=false;queue=[];T.schmied.fn();await durch();ok('Fjodor schmiedet den Haken (nach dem Strom)',has('haken'));
  busy=false;queue=[];T.wrack.fn();await durch();ok('Wrack ohne verdünnten Teer: nur Hinweis',!FL.kahn);
  busy=false;queue=[];T.opa.fn();await durch();ok('Opa verdünnt den Teer',has('teerduenn')&&!has('teerdose')&&!document.getElementById('fg'));
  busy=false;queue=[];T.wrack.fn();await durch(40);await wait(2200);await durch(40);
  ok('Kahn gehoben',!!FL.kahn&&!has('haken')&&!has('teerduenn'));ok('Kusmitsch versöhnt',relOf('Fischer Kusmitsch')>=relK+50,relK+' → '+relOf('Fischer Kusmitsch'));
  ok('Auftragsbuch: Kusmitschs Kahn erledigt',quests().some(q=>q.t==='Kusmitschs Kahn'&&q.ok));
  FL.haus=1;ok('Auftragsbuch zeigt „Einer von uns werden“ als erledigt (sobald Opas Haus steht)',quests().some(q=>q.t==='Einer von uns werden'&&q.ok));
  const alt=LANG;LANG='ru';const proben=['Kusmitschs Kahn','Verdünnter Teer','Strom für die Schmiede','Trafohäuschen','Kohle für Oma Dusja','🧻 Tempos zustecken','Trinkduell mit Opa','Petjas Haus'];
  const fehlt=proben.filter(p=>tr(p)===p||!/[а-яё]/i.test(tr(p)));LANG=alt;ok('Russische Übersetzung vorhanden',!fehlt.length,fehlt.join(', '));
 }catch(e){R.push('FAIL Abbruch: '+e.message)}fertig()})();`;

const TANZ=`${GEMEINSAM}
const realNow=performance.now.bind(performance);let VT=null;performance.now=()=>VT===null?realNow():VT;
let pend=[];window.requestAnimationFrame=cb=>{pend.push(cb);return pend.length};   // Warteschlange: mehrere Nutzer (Tanz, Porträt-Leiste) dürfen sich nicht verdrängen
const step=to=>{while(VT<to){VT+=1000/60;const q=pend;pend=[];q.forEach(f=>f(VT))}};
const knoepfe=()=>[...document.querySelectorAll('#tanzmenu button')].map(b=>b.dataset.m);
const schliessen=async T0=>{step(T0+40000);await wait(300);for(let k=0;k<40&&busy;k++){advance();await wait(20)}document.querySelectorAll('#cut,#tanzmenu').forEach(c=>c.remove());VT=null};
(async()=>{await wait(1500);try{FL.rekrut=1;
  nastjaShow('standard',false);await wait(600);VT=realNow();let T0=VT-200;step(T0+3000);
  let k=knoepfe();ok('Standard-Tanz: Tempos und Ranbeugen, kein Twerk, kein Geld',k.join()==='tempo,wink',k.join());await schliessen(T0);
  nastjaShow('dessous',false);await wait(600);VT=realNow();T0=VT-200;step(T0+4000);
  k=knoepfe();ok('Dessous-Tanz: Twerken-Knopf da',k.join()==='tempo,wink,twerk',k.join());
  let zuletzt='-';const _d=NASTJA_TWERK.draw.bind(NASTJA_TWERK);NASTJA_TWERK.draw=(x,X,Y,m,sp,v,fr)=>{zuletzt=fr??NASTJA_TWERK.frame();return _d(x,X,Y,m,sp,v,fr)};
  for(let i=0;i<60&&!NASTJA_TWERK.ready;i++){await wait(50);step(VT+16)}ok('Twerk-Bild wird beim Dessous-Tanz nachgeladen',NASTJA_TWERK.ready);
  document.querySelector('#tanzmenu [data-m=twerk]').click();const t0=VT,seq=[];for(let d=100;d<=3700;d+=100){step(t0+d);seq.push(zuletzt)}
  const s=seq.join('').replace(/-/g,''),erste=s.indexOf('2'),letzte0=s.lastIndexOf('0');
  const P_=document.getElementById('cut')._ph;ok('Twerken: Start-Pose nur am Anfang',s.startsWith('0')&&letzte0<erste,'seq='+seq.join('')+' twerk='+JSON.stringify(P_.twerk)+' cos='+Math.cos(P_.theta).toFixed(2)+' ready='+NASTJA_TWERK.ready+' pause='+P_.pauseBis);
  ok('Twerken: hält den tiefsten Frame',/2{15,}/.test(s),s);ok('Twerken: Übergang hinaus über Frame 1',/21+$/.test(s),s);
  ok('Twerken-Knopf während des Tanzes gesperrt',document.querySelector('#tanzmenu [data-m=twerk]').disabled);
  step(t0+7600);ok('Twerken-Knopf nach der Pause wieder frei',!document.querySelector('#tanzmenu [data-m=twerk]').disabled);
  await schliessen(T0);
 }catch(e){R.push('FAIL Abbruch: '+e.message)}fertig()})();`;

function lauf(name,skript,budget){
  const html=basis.replace('</body>',`<pre id="out"></pre><script>{${skript}}</script></body>`);
  const tmp=path.join(os.tmpdir(),`petja-test-${name}-${Date.now()}.html`);fs.writeFileSync(tmp,html);
  const prof=fs.mkdtempSync(path.join(os.tmpdir(),'petja-test-prof-'));
  let out='';try{out=execFileSync(EDGE,['--headless','--disable-gpu','--allow-file-access-from-files','--window-size=1200,750','--user-data-dir='+prof,`--virtual-time-budget=${budget}`,'--dump-dom','file:///'+tmp.replace(/\\/g,'/')],{maxBuffer:64<<20,timeout:600000}).toString('utf8')}
  catch(e){out=String(e.stdout||'')}
  fs.unlinkSync(tmp);const m=out.match(/<pre id="out">([\s\S]*?)<\/pre>/);
  return(m&&m[1].trim()?m[1].replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"'):'FAIL '+name+': kein Ergebnis (Zeitbudget zu knapp?)').split('\n')}

const zeilen=[...lauf('welt',WELT,40000),...lauf('tanz',TANZ,90000)];
for(const z of zeilen)console.log(z);
const fehler=zeilen.filter(z=>z.startsWith('FAIL')).length;
console.log(`\n${zeilen.length-fehler} von ${zeilen.length} bestanden`);process.exit(fehler?1:0);
