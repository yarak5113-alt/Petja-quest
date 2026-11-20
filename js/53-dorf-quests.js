// ================= Dorf-Quests: Stromleitung (Schmied), Kohle für Oma, Ignatis Kater · Kater-Flug · eigenes Haus beim Bleiben =================
// 1) Schmied Fjodor (nach der geschärften Säge oder der Glut): Die Dorfleitung von 1971 ist durcheinander. Logikrätsel „Verteilerkasten“:
//    6×4 Kabelstücke (gerade, Ecke, T), Klick dreht ein Stück um 90°. Strom fließt vom Trafo (links oben) los. Gelöst, wenn die
//    Schmiede (rechts) UND Omas Hütte (unten) Strom haben und kein unter Strom stehendes Kabel ins Leere zeigt (offene Enden funken).
//    Belohnung: Dorf-Ruf + Fjodor gibt sofort einen Sack Kohle für Oma Dusja.
// 2) Oma Dusja friert, sagt es aber nicht. Kohlensack hinbringen (anklicken oder Sack auf sie ziehen) → Ofen an, Dorf-Ruf.
// 3) Ignatis Kater: Gibt Petja dem Kater am Friedhof den Fisch, springt der ihm mit allen Krallen ans Bein – Petja tritt reflexartig aus,
//    und der Kater fliegt wie im Zeichentrick im hohen Bogen über die Kirche. Er landet unter dem Pier (Raum „unter“).
//    Ist Vater Ignati zurück (und das Weihwasser erledigt), sucht er ihn: unter dem Pier einsammeln, zurückbringen → Dorf-Ruf und Ignatis Segen.
// 4) Das Trinkduell mit Opa (52-trinkduell.js).
// Alle vier geschafft + „Hierbleiben“ am Tisch → Ehrenbürger-Ende mit Hausbau: Petja baut sich sein eigenes Haus im Dorf.

const NS_SVG='http://www.w3.org/2000/svg';
const alleVierQuests=()=>!!(FL.kabel&&FL.omaKohle&&FL.katzeHeim&&FL.duellSieg);
const rufToast=n=>setTimeout(()=>toast(`Dorf-Ruf +${n} · jetzt ${dorfRuf()} / 100`,'done','figuren'),300);

// ---------- Gegenstände ----------
{const svg=b=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${b}</svg>`);
  ICONS.kabel=svg(`<circle cx="30" cy="34" r="20" fill="#2a2a2e" stroke="#111" stroke-width="2"/><circle cx="30" cy="34" r="13" fill="none" stroke="#c8641e" stroke-width="5"/><circle cx="30" cy="34" r="6" fill="#8a6a3a" stroke="#111"/><path d="M44,22C54,14 58,24 52,30" stroke="#c8641e" stroke-width="4" fill="none"/><path d="M40,46L58,58M44,52L52,46" stroke="#d8c020" stroke-width="5" stroke-linecap="round"/>`);
  ICONS.kohle=svg(`<path d="M14,22C12,40 12,52 18,58L46,58C52,52 52,40 50,22Z" fill="#a08a5a" stroke="#3a2a14" stroke-width="2"/><path d="M14,22L50,22L46,14L18,14Z" fill="#8a744a" stroke="#3a2a14" stroke-width="2"/><g fill="#1c1c20" stroke="#000"><circle cx="24" cy="18" r="5"/><circle cx="34" cy="15" r="6"/><circle cx="43" cy="18" r="4.5"/></g><path d="M22,38L42,38" stroke="#3a2a14" stroke-width="2"/>`);
  ICONS.katze=svg(`<ellipse cx="32" cy="42" rx="18" ry="14" fill="#2a2a30" stroke="#000" stroke-width="2"/><circle cx="32" cy="24" r="12" fill="#2a2a30" stroke="#000" stroke-width="2"/><path d="M22,18L20,6L29,14M42,18L44,6L35,14" fill="#2a2a30" stroke="#000" stroke-width="2"/><circle cx="27" cy="23" r="2.4" fill="#e8d040"/><circle cx="37" cy="23" r="2.4" fill="#e8d040"/><path d="M48,48C58,46 58,36 54,32" stroke="#2a2a30" stroke-width="5" fill="none"/><path d="M14,40L4,38M14,44L4,46" stroke="#ddd" stroke-width="1"/>`);
  Object.assign(ITEMS,{kabel:['🧵','Kabelrolle und Isolierzange','Fjodors neues Kabel. Kupfer, schwarz ummantelt, schwer wie ein Gewissen. Die Zange hat gelbe Griffe. Gegen Strom. Hoffentlich.'],
    kohle:['⚫','Kohlensack','Ein Sack Steinkohle aus der Schmiede. Für Oma Dusja. Sie friert, sagt Fjodor. Sie würde es nie zugeben.'],
    katze:['🐈','Vater Ignatis Kater','Nass, beleidigt, riecht nach Fisch und Steg. Krallt sich in meine Jacke, als wäre ich ein Baum. Ich hab’s verdient.']})}

// ---------- Dorf-Ruf neu gewichtet (52-trinkduell.js liest DORF_RUF) ----------
Object.keys(DORF_RUF).forEach(k=>delete DORF_RUF[k]);
Object.assign(DORF_RUF,{haus:10,teer:5,glut:5,mehl:5,weih:5,kabel:15,omaKohle:10,katzeHeim:15,duellSieg:30});

// ---------- Kater: Fisch geben → Tritt → Zeichentrick-Flug ----------
wrapFn('kater',function(orig){if(!inv.includes('fisch')||FL.kater)return orig();FL.ks=1;
  say([['P','Hier, Mieze. Ein Fisch. Frisch aus dem See.'],['KA','*springt mit allen Krallen an mein Bein* MRRRAAAAU!'],['P','AU! AU! LOS! LASS LOS!']],()=>katerFlug(()=>{
    FL.kater=1;inv.splice(inv.indexOf('fisch'),1);renderInv();rm('katerG');questVis();
    say([['P','… Ups.'],['P','Der landet bestimmt weich. Katzen landen immer weich. Steht in jedem Buch.','smirk'],['P','Und da liegt … Omas Gebiss. Na lecker.']])}))});
function katerFlug(done){const g=document.getElementById('katerG');if(!g)return done();changing=true;const room=g.parentNode;
  const tx=document.createElementNS(NS_SVG,'text');tx.setAttribute('font-family','Georgia');tx.setAttribute('font-weight','bold');tx.setAttribute('text-anchor','middle');tx.setAttribute('stroke','#000');tx.setAttribute('stroke-width','4');tx.setAttribute('paint-order','stroke');room.appendChild(tx);
  const zeig=(t,X,Y,s,c)=>{tx.textContent=t;tx.setAttribute('x',X);tx.setAttribute('y',Y);tx.setAttribute('font-size',s);tx.setAttribute('fill',c)};
  const T0=performance.now();(function f(){const t=(performance.now()-T0)/1000;
    if(t<.35){zeig('*TRITT*',560,380,34+t*30,'#ffd25a');g.setAttribute('transform',`translate(${606-t*20},${438-t*30}) scale(.88)`)}
    else{const k=Math.min(1,(t-.35)/1.5),X=596+330*k,Y=428-820*k+420*k*k,r=k*1080,s=.88*(1-.55*k);
      g.setAttribute('transform',`translate(${X},${Y}) rotate(${r}) scale(${s})`);zeig('MIAAAUUUUU!',Math.min(700,X-30),Math.max(60,Y-40),26,'#ffffff');
      if(k>=1){if(t<2.4){zeig('✦',760,60,30+Math.sin(t*30)*8,'#fff6c0');g.style.display='none'}else{tx.remove();changing=false;return done()}}}
    requestAnimationFrame(f)})()}

// ---------- Der Kater unter dem Pier (Raum „Unter dem Pier“, vom Ufer aus) ----------
const KATER_STEG=(()=>{const g=document.createElementNS(NS_SVG,'g');g.id='katerSteg';g.setAttribute('class','interactive');g.dataset.id='katerSteg';g.setAttribute('transform','translate(232,468) scale(.8)');
  const im=document.createElementNS(NS_SVG,'image');im.setAttribute('class','spr');im.setAttribute('x','-22');im.setAttribute('y','-58');im.setAttribute('width','52');im.setAttribute('height','62');im.style.filter='brightness(.88)';g.appendChild(im);
  const r=document.getElementById('r-unter');if(r)r.appendChild(g);
  const kopie=setInterval(()=>{const k=document.getElementById('katerimg'),h=k&&(k.getAttribute('href')||k.getAttribute('xlink:href'));if(h){im.setAttribute('href',h);clearInterval(kopie)}},500);return g})();
function questVis(){KATER_STEG.style.display=FL.kater&&!FL.katzeHeim&&!has('katze')?'':'none'}
{const _e=enter;enter=function(){const r=_e.apply(this,arguments);setTimeout(questVis,450);return r}}questVis();
function katerUnterSteg(){if(!FL.katzeQ)return hint('katerSteg',[[['P','Da unten, zwischen den Pfählen … zwei gelbe Augen. Der Kater vom Friedhof!'],['P','Er sitzt auf den Gräten von meinem Fisch und guckt, als hätte ich ihn getreten.'],['P','… Hab ich ja auch.']],
    [['KA','*FAUCH*'],['P','Okay. Ich lass dich in Ruhe. Für heute.']]]);
  say([['P','*kriecht auf allen vieren unter den Steg* Komm, Mieze. Dein Herrchen vermisst dich.'],['KA','*FAUCH* … *mrrr* …'],['P','*packt den nassen Kater* Na also. Ganz ruhig. Ich trete heute niemanden mehr. Versprochen.']],
    ()=>{inv.push('katze');renderInv();questVis()})}
T.katerSteg={n:'Kater',at:[270,478],fn:katerUnterSteg};

// ---------- Vater Ignati sucht seinen Kater ----------
wrapFn('pope2',function(orig){if(!FL.weih||!FL.kater||FL.katzeHeim)return orig();
  if(has('katze'))return say([['P','Vater Ignati … ich hab da was. Unter dem Steg beim Fischer gefunden.'],['PO','MURKA! Mein Kater! *drückt ihn an die Brust* Wie ist er bloß unter den Steg gekommen?'],
    ['P','Er … ist geflogen. Im hohen Bogen.','smirk'],['PO','*bekreuzigt sich* Ein Wunder. Ich wusste es. Der Herr wirkt durch Kater.'],['PO','Gott vergelt’s dir, mein Sohn. Ich bete für deine Beine. Die langen.']],
    ()=>{dropInv('katze');FL.katzeHeim=1;questVis();rufToast(DORF_RUF.katzeHeim)});
  if(!FL.katzeQ)return say([['PO','Mein Sohn, hast du meinen Kater gesehen? Den Dicken vom Friedhof?'],['PO','Die Dusja sagt, er ist über die Kirche geflogen. GEFLOGEN. Sie trinkt zu viel Kräutertee.'],
    ['P','(Oh nein.)','pain'],['P','Ich … halte die Augen offen, Vater.'],['PO','Gott segne dich. Er frisst gern Fisch. Vielleicht ist er beim See.']],()=>{FL.katzeQ=1});
  return hint('katzeSuche',[[['PO','Noch keine Spur von meinem Kater? Er mag Fisch. Und dunkle Ecken.']],[['PO','Beim See, mein Sohn. Wo es nach Fisch riecht. Unter etwas.']],[['P','(Fisch, dunkel, unter etwas … der Steg beim Fischer!)']]])});

// ---------- Schmied: neue Stromleitung ----------
wrapFn('schmied',function(orig){
  if(has('weihwasser')||(FL.recipe&&!FL.glutQ&&!FL.glut)||!(FL.schuld||FL.glut||FL.cut))return orig();   // Hauptgeschichte geht vor
  if(!FL.kabelQ)return say([['SM','Du. Lange. Kannst du Kabel?'],['P','Kabel … gucken?'],['SM','Die Dorfleitung ist von 1971. Mein Licht flackert, als wär’s besoffen, und bei der Dusja ist es ganz dunkel.'],
    ['SM','Im Verteilerkasten am Trafo liegen die Kabelstücke kreuz und quer. Dreh sie so, dass der Strom zu mir UND zur Dusja kommt.'],
    ['SM','Und keine offenen Enden! Wo ein Kabel ins Leere zeigt, funkt es. Dann brennt das Dorf und nicht meine Lampe.'],['P','*bekommt Kabelrolle und Isolierzange*']],()=>{FL.kabelQ=1;if(!has('kabel'))inv.push('kabel');renderInv()});
  if(!FL.kabel)return say([['SM','Der Verteilerkasten, Junge. Vom Trafo zu meiner Schmiede und zu Dusjas Hütte. Leg los.']],kabelGame);
  if(!FL.kohleGeg){return say([['SM','*schaut zur flackerfreien Lampe* … Na sieh mal an. Licht wie im Kreml.'],['SM','Hier, ein Sack Kohle. Der ist nicht für dich. Der ist für die Dusja.'],
    ['SM','Sie friert in ihrer Hütte, sagt aber nix. Stolz wie ein Ziegenbock. Bring ihn ihr und sag nicht, dass er von mir ist.']],()=>{FL.kohleGeg=1;inv.push('kohle');renderInv()})}
  return orig()});
const kabelGame=a3Mini('kabel','Verteilerkasten',kabelRun,()=>!!FL.kabel,()=>kabelSieg());
function kabelSieg(){FL.kabel=1;dropInv('kabel');rufToast(DORF_RUF.kabel);
  say([['P','*dreht das letzte Stück* … *KLACK*'],['SM','*aus der Schmiede* LICHT! Junge, ich seh meine eigenen Füße! Die sind hässlich, aber ich seh sie!'],
    ['SM','Und bei der Dusja brennt auch Licht. Aber Licht wärmt nicht. Die Alte friert, sagt aber nix. Stolz wie ein Ziegenbock.'],
    ['SM','Hier, ein Sack Kohle. Der ist nicht für dich, der ist für sie. Bring ihn ihr und sag nicht, dass er von mir ist.'],['P','*bekommt einen Sack Kohle*']],
    ()=>{if(!FL.kohleGeg){FL.kohleGeg=1;if(!has('kohle'))inv.push('kohle');renderInv();toast('Neue Aufgabe: Kohle für Oma Dusja','done','tipp')}})}
// Logikrätsel Verteilerkasten. Richtungen als Bitmaske: N=1, O=2, S=4, W=8. Klick dreht ein Stück im Uhrzeigersinn.
function kabelRun(){const{cv2,x,P:M,pos}=a3Canvas(),T0=performance.now(),t=()=>(performance.now()-T0)/1000;
  const C=6,R=4,Z=72,X0=184,Y0=74,N=1,O=2,S=4,W=8,gegen={1:4,2:8,4:1,8:2},schritt={1:[0,-1],2:[1,0],4:[0,1],8:[-1,0]};
  const dreh=m=>((m<<1)|(m>>3))&15;
  // Lösungsweg: Trafo → (0,0) … T bei (2,1) → runter zu Omas Hütte (2,3) und rechts zur Schmiede (5,2)
  const LOES={'0,0':W|O,'1,0':W|S,'1,1':N|O,'2,1':W|O|S,'2,2':N|S,'2,3':N|S,'3,1':W|S,'3,2':N|O,'4,2':W|O,'5,2':W|O};
  const AUSGANG={'0,0':W,'5,2':O,'2,3':S};   // Randöffnungen, die zählen: Trafo, Schmiede, Oma
  const feld=[];for(let j=0;j<R;j++)for(let i=0;i<C;i++){let m=LOES[i+','+j];
    if(m===undefined)m=[N|S,N|O,O|S,N|O][(i*7+j*3)%4];   // Füllstücke
    const gerade=m===5||m===10,n=gerade?1:1+Math.floor(Math.random()*3);for(let k=0;k<n;k++)m=dreh(m);
    feld.push({i,j,m,anim:-9})}
  const at=(i,j)=>i>=0&&j>=0&&i<C&&j<R?feld[j*C+i]:null;
  let fin=false,zuege=0,geloest=0,info={an:new Set(),lecks:[],schmiede:false,oma:false};
  function rechne(){const an=new Set(),lecks=[];let schmiede=false,oma=false;const st=at(0,0);
    if(st.m&W){const q=[st];an.add(st);while(q.length){const z=q.shift();
      for(const d of[N,O,S,W]){if(!(z.m&d))continue;const k=z.i+','+z.j;
        if(AUSGANG[k]===d){if(k==='5,2')schmiede=true;if(k==='2,3')oma=true;continue}
        const[dx,dy]=schritt[d],nb=at(z.i+dx,z.j+dy);
        if(nb&&(nb.m&gegen[d])){if(!an.has(nb)){an.add(nb);q.push(nb)}}else lecks.push([z,d])}}}
    info={an,lecks,schmiede,oma}}
  rechne();if(info.schmiede&&info.oma&&!info.lecks.length){feld[1].m=dreh(feld[1].m);rechne()}   // nie schon gelöst starten
  const kachel=(X,Y)=>X<X0||Y<Y0?null:at(Math.floor((X-X0)/Z),Math.floor((Y-Y0)/Z));
  cv2.onmousemove=e=>{pos(e.clientX,e.clientY)};
  cv2.onclick=e=>{e.stopPropagation();if(fin||geloest)return;pos(e.clientX,e.clientY);const k=kachel(M.x,M.y);if(!k)return;
    k.m=dreh(k.m);k.anim=t();zuege++;rechne();
    if(info.schmiede&&info.oma&&!info.lecks.length)geloest=t()};
  const esc=e=>{if(e.key==='Escape'){e.stopPropagation();ende(false)}};addEventListener('keydown',esc,true);
  // Schmiede und Omas Hütte im Dorfstil: dieselbe Izba wie im Dorf (izba aus 02-orte), einmal dunkel und einmal mit Licht vorgerendert
  const HAUS=(()=>{const mk=(cx,B,sk,flip,win)=>{const c=document.createElement('canvas');c.width=800*SC;c.height=500*SC;const g=c.getContext('2d');g.setTransform(SC,0,0,SC,0,0);
      try{izba(g,cx,B,sk,flip,{win,smoke:0,trim:cx>500?'#8a5a3a':'#d8b070'})}catch(e){console.warn(e)}return c};
    return{sd:mk(712,306,.5,1,'dark'),sl:mk(712,306,.5,1,0),od:mk(366,494,.42,0,'dark'),ol:mk(366,494,.42,0,0)}})();
  const haus=(dunkel,hell,k)=>{x.drawImage(dunkel,0,0,800,500);if(k>0){x.globalAlpha=Math.min(1,k);x.drawImage(hell,0,0,800,500);x.globalAlpha=1}};
  function frame(){if(fin)return;const T=t(),hov=kachel(M.x,M.y);
    const g=x.createLinearGradient(0,0,0,500);g.addColorStop(0,'#1e2046');g.addColorStop(.7,'#4a3a4a');g.addColorStop(1,'#2a2a22');x.fillStyle=g;x.fillRect(0,0,800,500);
    // Trafo links oben
    {const gw=x.createLinearGradient(40,0,150,0);gw.addColorStop(0,'#8a867a');gw.addColorStop(1,'#5e5b52');x.fillStyle=gw;x.fillRect(40,60,110,130);   // Trafohäuschen: verwitterter Beton
      x.fillStyle='rgba(0,0,0,.12)';for(let r=0;r<6;r++)x.fillRect(40,72+r*20,110,1.5);x.fillStyle='rgba(120,60,20,.35)';[[58,4,60],[118,3,46],[134,5,70]].forEach(([a,w,h])=>x.fillRect(a,64,w,h));
      x.fillStyle='#4a4038';x.fillRect(66,128,34,62);x.strokeStyle='#2a221a';x.lineWidth=2;x.strokeRect(66,128,34,62);x.fillStyle='#8a7a5a';x.fillRect(94,158,3,6);
      x.fillStyle='#3e3a34';x.beginPath();x.moveTo(30,64);x.lineTo(95,38);x.lineTo(160,64);x.fill();x.fillStyle='rgba(0,0,0,.35)';x.fillRect(40,64,110,5);}
    x.fillStyle='#e8d020';x.beginPath();x.moveTo(95,84);x.lineTo(78,114);x.lineTo(112,114);x.closePath();x.fill();x.fillStyle='#111';x.font='bold 16px Georgia';x.textAlign='center';x.fillText('⚡',95,109);
    x.font='bold 12px Georgia';x.lineWidth=3;x.strokeStyle='rgba(0,0,0,.8)';x.strokeText('Trafo',95,208);x.fillStyle='#f6ead0';x.fillText('Trafo',95,208);x.lineWidth=1;
    x.strokeStyle='#ffd23a';x.lineWidth=8;x.beginPath();x.moveTo(150,Y0+Z/2);x.lineTo(X0,Y0+Z/2);x.stroke();
    // Schmiede rechts, Omas Hütte unten
    const fertigK=geloest?Math.min(1,(T-geloest)*2):0;
    x.strokeStyle=info.schmiede?'#ffd23a':'#3a3a3a';x.lineWidth=8;x.beginPath();x.moveTo(X0+C*Z,Y0+2.5*Z);x.lineTo(690,Y0+2.5*Z);x.stroke();
    x.strokeStyle=info.oma?'#ffd23a':'#3a3a3a';x.beginPath();x.moveTo(X0+2.5*Z,Y0+R*Z);x.lineTo(X0+2.5*Z,Y0+R*Z+50);x.stroke();
    haus(HAUS.sd,HAUS.sl,info.schmiede?(geloest?.35+.65*fertigK:.35):0);haus(HAUS.od,HAUS.ol,info.oma?(geloest?.35+.65*fertigK:.35):0);
    x.font='bold 12px Georgia';x.textAlign='center';x.lineWidth=3;x.strokeStyle='rgba(0,0,0,.8)';
    for(const[txt,tx,ty]of[['Schmiede',712,326],['Omas Hütte',486,476]]){x.strokeText(txt,tx,ty);x.fillStyle='#f6ead0';x.fillText(txt,tx,ty)}x.textAlign='left';
    // Kasten
    x.fillStyle='#3c4044';x.fillRect(X0-10,Y0-10,C*Z+20,R*Z+20);x.strokeStyle='#22262a';x.lineWidth=4;x.strokeRect(X0-10,Y0-10,C*Z+20,R*Z+20);
    for(const k of feld){const cx=X0+k.i*Z+Z/2,cy=Y0+k.j*Z+Z/2,an=info.an.has(k);
      x.fillStyle=k===hov&&!geloest?'#5a6066':'#4a5056';x.fillRect(cx-Z/2+3,cy-Z/2+3,Z-6,Z-6);
      x.fillStyle='#2e3236';[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>{x.beginPath();x.arc(cx+a*(Z/2-10),cy+b*(Z/2-10),2.5,0,7);x.fill()});
      const a=Math.min(1,(T-k.anim)/.15);x.save();x.translate(cx,cy);x.rotate(-(1-a)*Math.PI/2);x.lineCap='round';
      const zeichne=()=>{x.beginPath();for(const d of[N,O,S,W])if(k.m&d){const[dx,dy]=schritt[d];x.moveTo(0,0);x.lineTo(dx*Z/2,dy*Z/2)}x.stroke()};
      x.strokeStyle='#1a1a1a';x.lineWidth=14;zeichne();
      x.strokeStyle=an?`rgb(255,${Math.round(200+40*Math.sin(T*8+k.i))},70)`:'#6a6a64';x.lineWidth=8;zeichne();
      x.fillStyle=an?'#ffe48a':'#7a7a72';x.beginPath();x.arc(0,0,7,0,7);x.fill();x.restore()}
    // offene Enden funken
    for(const[z,d]of info.lecks){const[dx,dy]=schritt[d],ex=X0+z.i*Z+Z/2+dx*Z/2,ey=Y0+z.j*Z+Z/2+dy*Z/2;x.strokeStyle='#fff27a';x.lineWidth=2;
      for(let n=0;n<3;n++){const w=Math.random()*7;x.beginPath();x.moveTo(ex,ey);x.lineTo(ex+Math.cos(w)*12,ey+Math.sin(w)*12);x.stroke()}}
    x.lineWidth=1;x.lineCap='butt';
    // Anleitung + Stand
    x.textAlign='center';x.fillStyle='rgba(15,8,4,.82)';x.fillRect(130,4,540,48);x.fillStyle='#f6ead0';x.font='14px Georgia';
    x.fillText(geloest?'Strom überall, kein Funke. Sauber!':'Klick dreht ein Kabelstück. Strom zur Schmiede UND zu Omas Hütte, kein offenes Ende.',400,23);
    x.font='12px Georgia';x.fillStyle='#e8d8b0';
    x.fillText(`Schmiede ${info.schmiede?'✓':'✗'}   ·   Omas Hütte ${info.oma?'✓':'✗'}   ·   Offene Enden: ${info.lecks.length}   ·   Züge: ${zuege}`,400,43);
    x.font='11px Georgia';x.fillStyle='rgba(246,234,208,.7)';x.fillText('Esc: aufhören',740,490);x.textAlign='left';
    if(geloest&&T-geloest>1.8)return ende(true);
    requestAnimationFrame(frame)}
  function ende(sieg){if(fin)return;fin=true;removeEventListener('keydown',esc,true);cv2.remove();
    if(sieg)return kabelSieg();say([['P','Pause. Mir drehen sich die Kabel vor den Augen.'],['SM','Komm wieder, wenn dein Kopf sortiert ist.']])}
  requestAnimationFrame(frame)}

// ---------- Trafohäuschen auf dem Schmiedehof (rechts hinter dem Flechtzaun) ----------
// Gemalt wie die übrige Szene (verwitterter Beton, Blechtür, Warnschild, Isolatoren, Leitung zur Schmiede), klickbar:
// mit Fjodors Auftrag startet es den Verteilerkasten, danach brummt es zufrieden, vorher beschreibt Petja es und denkt an den Schmied.
function malTrafo(){const x=lay(),X=716,B=380,w=74,h=96;shadowAt(x,X,B+3,62,.55);
  const g=x.createLinearGradient(X-w/2,0,X+w/2,0);g.addColorStop(0,'#a9a493');g.addColorStop(.55,'#8e8a7c');g.addColorStop(1,'#6c695f');x.fillStyle=g;x.fillRect(X-w/2,B-h,w,h);
  x.fillStyle='rgba(60,50,40,.18)';for(let r=0;r<7;r++)x.fillRect(X-w/2,B-h+8+r*13,w,1.2);   // Betonfugen
  [[X-24,3,34],[X+10,2,22],[X+26,3,44]].forEach(([a,bw,bh])=>{const rg=x.createLinearGradient(0,B-h+6,0,B-h+6+bh);rg.addColorStop(0,'rgba(120,64,24,.55)');rg.addColorStop(1,'rgba(120,64,24,0)');x.fillStyle=rg;x.fillRect(a,B-h+6,bw,bh)});   // Roststreifen
  x.fillStyle='#4c4a44';x.beginPath();x.moveTo(X-w/2-7,B-h+2);x.lineTo(X,B-h-20);x.lineTo(X+w/2+7,B-h+2);x.closePath();x.fill();   // Blechdach
  x.strokeStyle='rgba(20,16,12,.8)';x.lineWidth=1.2;x.stroke();x.fillStyle='rgba(0,0,0,.3)';x.fillRect(X-w/2,B-h+2,w,5);
  x.fillStyle='#5a5246';x.fillRect(X-16,B-56,30,56);x.strokeStyle='#2a241c';x.lineWidth=1.6;x.strokeRect(X-16,B-56,30,56);   // Blechtür
  x.strokeStyle='rgba(255,255,255,.12)';x.lineWidth=1;for(let i=0;i<4;i++){x.beginPath();x.moveTo(X-14,B-50+i*13);x.lineTo(X+12,B-50+i*13);x.stroke()}
  x.strokeStyle='#8a7a5a';x.lineWidth=1.4;x.beginPath();x.moveTo(X+8,B-30);x.lineTo(X+18,B-28);x.stroke();   // Draht statt Schloss
  x.fillStyle='#e8c820';x.beginPath();x.moveTo(X-1,B-h+16);x.lineTo(X-11,B-h+33);x.lineTo(X+9,B-h+33);x.closePath();x.fill();x.strokeStyle='#2a2010';x.lineWidth=1;x.stroke();
  x.fillStyle='#1a1408';x.font='bold 11px Georgia';x.textAlign='center';x.fillText('⚡',X-1,B-h+31);x.textAlign='left';
  [X-20,X,X+20].forEach(px=>{x.fillStyle='#d8d4c8';x.fillRect(px-2,B-h-14+Math.abs(px-X)*.55,4,9);x.fillStyle='#6a665c';x.fillRect(px-.5,B-h-6+Math.abs(px-X)*.55,1,6)});   // Isolatoren
  x.strokeStyle='rgba(24,20,16,.85)';x.lineWidth=1.3;x.beginPath();x.moveTo(X-20,B-h-3);x.quadraticCurveTo(620,B-h+40,560,262);x.stroke();   // Leitung zur Schmiede
  put(x)}
{const _p=SCN.schmiede.paint;SCN.schmiede.paint=function(){const r=_p.apply(this,arguments);malTrafo();return r}}
(()=>{const g=document.createElementNS(NS_SVG,'g');g.setAttribute('class','interactive painted');g.dataset.id='trafo';
  const p=document.createElementNS(NS_SVG,'path');p.setAttribute('class','hit');p.setAttribute('d','M672,382L672,286L716,262L760,286L760,382Z');g.appendChild(p);
  const r=document.getElementById('r-schmiede');if(r)r.appendChild(g)})();
T.trafo={n:'Trafohäuschen',at:[700,440],fn(){
  if(FL.kabelQ&&!FL.kabel)return say([['P','Der Verteilerkasten. Fjodor sagt, die Kabelstücke darin liegen kreuz und quer.'],['P','*biegt den Draht an der Tür auf* Na dann. Mit der gelben Zange.']],kabelGame);
  if(FL.kabel)return say([['P','*Das Trafohäuschen brummt zufrieden.*'],['P','(Strom bis zur Schmiede und zu Oma Dusja. Mein erstes Bauwerk. Na ja, mein erstes Umgedrehtes.)']]);
  return hint('trafo',[[['P','Ein Trafohäuschen. Beton, Baujahr 1971, schätze ich. Es brummt wie Opa nach dem Mittagessen.'],['P','Die Tür ist mit Draht zugebunden. Ohne Werkzeug und ohne Plan fass ich da nichts an.']],
    [['P','(Die Leitung geht direkt zur Schmiede. Der Schmied weiß bestimmt, was damit los ist.)']]])}};
(ZIELE_EXTRA.trafo=ZIELE_EXTRA.trafo||[]).push('kabel');

// ---------- Oma Dusja: Kohle ----------
for(const[id,it]of[['oma','kohle'],['pope2','katze'],['schmied','kabel']])(ZIELE_EXTRA[id]=ZIELE_EXTRA[id]||[]).push(it);   // Gegenstand auf Figur ziehen = anklicken
wrapFn('oma',function(orig){
  if(has('kohle'))return say([['P','Oma Dusja, ich hab hier einen Sack Kohle. Für Ihren Ofen.'],['O','Kohle? Für mich? Ich frier doch nicht! … Wer fagt daf?'],['P','Niemand. Die Kohle ist … einfach übrig.'],
    ['O','*schnuppert am Sack* Daf riecht nach Fjodorf Fchmiede. Der alte Bock.'],['O','*heizt den Ofen an* … Ahhh. Warm. Junge, du bift ein Engel mit langen Beinen.'],['O','Fag ihm danke. Aber nicht fo, daff er ef merkt.']],
    ()=>{dropInv('kohle');FL.omaKohle=1;rufToast(DORF_RUF.omaKohle)});
  if(FL.kohleGeg&&!FL.omaKohle)return say([['O','Brrr … Junge, mach die Tür zu, ef zieht.'],['P','(Die Kohle für sie. Ich hab den Sack doch … wo hab ich den Sack?)']]);
  // Oma friert sichtbar – einmal pro Stufe ein Hinweis Richtung Schmied, danach wieder ihr normales Gespräch
  if(!FL.omaKohle&&FL.kabelQ&&!FL.kabel&&!FL.omaBrr2){FL.omaBrr2=1;return say([['O','*reibt fich die Hände* Brrr. Feit die Leitung fpinnt, ift ef bei mir dunkel UND kalt.'],
    ['O','Fag dem Fjodor, er foll endlich feinen Kaften reparieren. Der am Trafo, hinter feinem Zaun.'],['P','(Der Trafo auf dem Schmiedehof. Da bin ich eh dran.)']])}
  if(!FL.omaKohle&&!FL.kabelQ&&(FL.schuld||FL.glut||FL.cut)&&!FL.omaBrr1){FL.omaBrr1=1;return say([['O','*zieht daf Tuch enger und zittert* … Waf guckft du? Ich frier nicht. Ich doch nicht.'],
    ['O','Aber der Fjodor, der hat Kohle in der Fchmiede. Und Ftrom. Und ich hab Gänfehaut. Nur fo.'],['P','(Sie friert. Und sie wird es nie zugeben. Vielleicht hat der Schmied was für sie.)']])}
  return orig()});

// ---------- Auftragsbuch ----------
{const _q=quests;quests=function(){const Q=_q();
  if(FL.kabelQ)Q.push({t:'Strom für die Schmiede',neben:1,d:'Fjodors Dorfleitung ist von 1971. Im Verteilerkasten liegen die Kabelstücke kreuz und quer.',v:1,ok:FL.kabel,
    h:'In der Schmiede mit Fjodor reden. Die Kabelstücke drehen, bis Schmiede und Omas Hütte Strom haben. Kein Kabel darf ins Leere zeigen.'});
  if(FL.kohleGeg)Q.push({t:'Kohle für Oma Dusja',neben:1,d:'Oma Dusja friert, sagt aber nix. Fjodor hat einen Sack Kohle für sie.',v:1,ok:FL.omaKohle,h:'Den Kohlensack zu Oma Dusja an der Dorfstraße bringen.'});
  if(FL.katzeQ)Q.push({t:'Ignatis Kater',neben:1,d:'Vater Ignati vermisst seinen Kater. Er ist … geflogen. Meinetwegen.',v:1,ok:FL.katzeHeim,
    h:has('katze')?'Den Kater zu Vater Ignati an der Kirche bringen.':'Wo riecht es nach Fisch, und wo ist es dunkel? Unter dem Pier nachsehen (vom Ufer aus).'});
  if(FL.haus)Q.push({t:'Einer von uns werden',neben:1,d:'Vier Dinge machen dich im Dorf zu einem von ihnen: Strom für Fjodor, Kohle für Dusja, Ignatis Kater und ein Trinkduell gegen Opa.',v:1,ok:alleVierQuests(),
    h:`Geschafft: ${[FL.kabel,FL.omaKohle,FL.katzeHeim,FL.duellSieg].filter(Boolean).length} von 4. Wer alle vier schafft und am Ende bleibt, baut sich ein eigenes Haus.`});
  return Q}}

// ---------- Ende „Bleiben“ mit allen vier Quests: Petja baut sich ein Haus ----------
{const _ee=endeEhren;endeEhren=function(){if(!alleVierQuests())return _ee.apply(this,arguments);
  say([['P','Frau Jaga … das Dorf hat mich gefragt, ob ich bleibe.'],['J2','Das Dorf fragt nie jemanden. Was hast du angestellt?'],['P','Strom gelegt. Kohle geschleppt. Einen Kater gefunden. Grischa untern Tisch getrunken.'],
    ['J2','*lacht krächzend* Dann bist du verloren. Geh. Die warten schon.']],()=>{FL.ende=3;enter('dorf',[420,470]);
    setTimeout(()=>say([['G','Achtung! Hiermit ernenne ich, Grischa, Gefreiter a. D., dich zum Ehrenbürger!','drunk'],['SM','Und ein Ehrenbürger braucht ein Dach. Das Holz liegt bereit. Ich hab die Nägel geschmiedet.'],
      ['PO','Ich segne es. Und Murka kommt zur Einweihung.'],['O','Ich bring Pirogi. Mit Gebiff gebacken.'],...(FL.kahn?[['F','Und ich bring Fisch. Frisch aus der Swetlana. Ohne Schnaps-Diebe an Bord.']]:[]),['P','(Ein eigenes Haus. Ich. Der Typ von Wowas Sofa.)','smirk']],()=>
      animShots([{d:2.6,cap:'Petjas eigenes Haus',draw(x,t,k){x.drawImage(bauBG(),0,0);x.fillStyle=`rgba(0,0,0,${.45*(1-k)})`;x.fillRect(0,0,800,500);x.font='bold 40px Georgia';x.textAlign='center';x.lineWidth=6;x.strokeStyle='#000';
        x.strokeText('Petjas Haus',400,200);x.fillStyle='#ffd25a';x.fillText('Petjas Haus',400,200);x.textAlign='left'}},...hausShots()],()=>{enter('dorf',[420,470]);
        setTimeout(()=>say([['G','Ein Haus aus Birken, mit Fjodors Nägeln, Dusjas Pirogi und Ignatis Segen. Jetzt bist du einer von uns, Junge.','drunk'],
          ['P','(Drüben hatte ich ein Sofa, das mir nicht gehört. Hier hab ich ein Haus. Mit Tür.)'],['P','(Ich bleibe.)']],()=>{ENDEN.ehren=['Ende: Ehrenbürger','Petja blieb. Nicht als Zahnrad – als einer von ihnen. Mit Urkunde und eigenem Haus.'];
            fade.style.opacity=1;setTimeout(()=>{abspannEnde('ehren');fade.style.opacity=0},900)}),1000)})),1100)})}}
