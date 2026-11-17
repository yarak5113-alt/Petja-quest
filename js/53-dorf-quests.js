// ================= Dorf-Quests: Stromleitung (Schmied), Kohle für Oma, Ignatis Kater · Kater-Flug · eigenes Haus beim Bleiben =================
// 1) Schmied Fjodor (nach der geschärften Säge oder der Glut): Die Dorfleitung von 1971 ist verrottet. Minispiel „Leitung verlegen“:
//    Hauptschalter am Trafo AUS (sonst gibt’s einen Schlag) → alte Kabel abnehmen → neues Kabel Mast für Mast vom Trafo bis zur
//    Schmiede ziehen → Hauptschalter wieder AN → in der Schmiede brennt Licht. Belohnung: Dorf-Ruf + ein Sack Kohle für Oma Dusja.
// 2) Oma Dusja friert, sagt es aber nicht. Kohlensack hinbringen → Ofen an, Dorf-Ruf.
// 3) Ignatis Kater: Gibt Petja dem Kater am Friedhof den Fisch, springt der ihm mit allen Krallen ans Bein – Petja tritt reflexartig aus,
//    und der Kater fliegt wie im Zeichentrick im hohen Bogen über die Kirche. Er landet unter dem Pier (Raum „unter“).
//    Ist Vater Ignati zurück (und das Weihwasser erledigt), sucht er ihn: unter dem Steg einsammeln, zurückbringen → Dorf-Ruf, 1 Rubel.
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
    ['P','Er … ist geflogen. Im hohen Bogen.','smirk'],['PO','*bekreuzigt sich* Ein Wunder. Ich wusste es. Der Herr wirkt durch Kater.'],['PO','Hier, mein Sohn. Aus der Kollekte. Ein Rubel. Sag’s keinem, sonst wollen alle einen.']],
    ()=>{dropInv('katze');FL.katzeHeim=1;player.cash+=1;questVis();toast('+1 Rubel','done','tasche');rufToast(DORF_RUF.katzeHeim)});
  if(!FL.katzeQ)return say([['PO','Mein Sohn, hast du meinen Kater gesehen? Den Dicken vom Friedhof?'],['PO','Die Dusja sagt, er ist über die Kirche geflogen. GEFLOGEN. Sie trinkt zu viel Kräutertee.'],
    ['P','(Oh nein.)','pain'],['P','Ich … halte die Augen offen, Vater.'],['PO','Gott segne dich. Er frisst gern Fisch. Vielleicht ist er beim See.']],()=>{FL.katzeQ=1});
  return hint('katzeSuche',[[['PO','Noch keine Spur von meinem Kater? Er mag Fisch. Und dunkle Ecken.']],[['PO','Beim See, mein Sohn. Wo es nach Fisch riecht. Unter etwas.']],[['P','(Fisch, dunkel, unter etwas … der Steg beim Fischer!)']]])});

// ---------- Schmied: neue Stromleitung ----------
wrapFn('schmied',function(orig){
  if(has('weihwasser')||(FL.recipe&&!FL.glutQ&&!FL.glut)||!(FL.schuld||FL.glut||FL.cut))return orig();   // Hauptgeschichte geht vor
  if(!FL.kabelQ)return say([['SM','Du. Lange. Kannst du Kabel?'],['P','Kabel … gucken?'],['SM','Die Dorfleitung ist von 1971. Die Masten stehen noch, aber die Kabel sind Zunder. Mein Licht flackert, als wär’s besoffen.'],
    ['SM','Hier: neue Kabelrolle und die Zange mit den gelben Griffen. Erst den Hauptschalter am Trafo aus, dann die alten Kabel runter, dann die neuen ran.'],
    ['SM','Und wehe, du fasst an, solange Strom drauf ist. Dann stehen dir die Haare wie meinem Besen.'],['P','*bekommt Kabelrolle und Isolierzange*']],()=>{FL.kabelQ=1;if(!has('kabel'))inv.push('kabel');renderInv()});
  if(!FL.kabel)return say([['SM','Die Leitung, Junge. Trafo, vier Masten, meine Schmiede. Leg los.']],kabelGame);
  if(!FL.kohleGeg){return say([['SM','*schaut zur flackerfreien Lampe* … Na sieh mal an. Licht wie im Kreml.'],['SM','Hier, ein Sack Kohle. Der ist nicht für dich. Der ist für die Dusja.'],
    ['SM','Sie friert in ihrer Hütte, sagt aber nix. Stolz wie ein Ziegenbock. Bring ihn ihr und sag nicht, dass er von mir ist.']],()=>{FL.kohleGeg=1;inv.push('kohle');renderInv()})}
  return orig()});
const kabelGame=a3Mini('kabel','Leitung verlegen',kabelRun,()=>!!FL.kabel,()=>kabelSieg());
function kabelSieg(){FL.kabel=1;dropInv('kabel');rufToast(DORF_RUF.kabel);
  say([['P','*schaltet den Hauptschalter an* … *KLACK*'],['SM','*aus der Schmiede* LICHT! Junge, ich seh meine eigenen Füße! Die sind hässlich, aber ich seh sie!'],['P','Fjodor? Sie wollten mir noch was geben.']])}
function kabelRun(){const{cv2,x,P:M,pos}=a3Canvas(),T0=performance.now();
  // Punkte: Trafo-Isolator, vier Masten, Schmiede
  const PT=[[118,236],[232,168],[372,176],[512,168],[652,176],[748,214]];
  const st={strom:true,alt:[1,1,1,1,1],neu:0,schlaege:0,blitz:-9,fall:[],pop:[],fertig:0,maus:[0,0]};let fin=false;
  const sag=(a,b,durch)=>{const m=[(a[0]+b[0])/2,(a[1]+b[1])/2+durch];return k=>[(1-k)*(1-k)*a[0]+2*(1-k)*k*m[0]+k*k*b[0],(1-k)*(1-k)*a[1]+2*(1-k)*k*m[1]+k*k*b[1]]};
  const nahKabel=(i,X,Y)=>{const f=sag(PT[i],PT[i+1],46);for(let k=0;k<=1;k+=.04){const[px,py]=f(k);if(Math.hypot(px-X,py-Y)<14)return true}return false};
  const hebel={x:52,y:300,w:54,h:70},imHebel=(X,Y)=>X>hebel.x-10&&X<hebel.x+hebel.w+10&&Y>hebel.y-10&&Y<hebel.y+hebel.h+10;
  const t=()=>(performance.now()-T0)/1000,meld=(s,c='255,230,170')=>st.pop.push({t:t(),s,c});
  const schlag=()=>{st.schlaege++;st.blitz=t();meld(['*BZZZT* Au! Strom ist noch drauf!','*BZZZT* Die Haare! Meine Haare!','*BZZZT* … Hauptschalter. Erst den HAUPTSCHALTER.'][Math.min(2,st.schlaege-1)],'255,240,120')};
  cv2.onmousemove=e=>{pos(e.clientX,e.clientY);st.maus=[M.x,M.y]};
  cv2.onclick=e=>{e.stopPropagation();if(fin)return;pos(e.clientX,e.clientY);const X=M.x,Y=M.y;
    if(imHebel(X,Y)){
      if(!st.strom){if(st.alt.some(a=>a)||st.neu<5){st.strom=true;if(st.neu>0){schlag();st.strom=false;meld('Nicht anschalten, solange gearbeitet wird!')}else meld('Strom an. Die alten Kabel knistern wieder.')}
        else{st.strom=true;st.fertig=t();meld('*KLACK* Licht in der Schmiede!','255,255,180')}}
      else{st.strom=false;meld('*KLACK* Hauptschalter aus. Jetzt ist es sicher.','170,230,255')}return}
    // alte Kabel abnehmen
    for(let i=0;i<5;i++)if(st.alt[i]&&nahKabel(i,X,Y)){if(st.strom)return schlag();st.alt[i]=0;st.fall.push({i,t:t()});meld('*schnipp* Altes Kabel runter.');return}
    if(st.alt.some(a=>a))return meld('Erst alle alten Kabel abnehmen.');
    if(st.neu<5){const n=st.neu+1,[px,py]=PT[n];if(Math.hypot(X-px,Y-py)<26){if(st.strom)return schlag();st.neu=n;meld(n<5?'*festschraub* Hält.':'*festschraub* Angeschlossen! Jetzt Strom an.')}
      else{for(let j=n+1;j<6;j++)if(Math.hypot(X-PT[j][0],Y-PT[j][1])<26)return meld('Zu weit – das Kabel muss über jeden Mast.','255,170,150');
        if(st.neu===0&&Math.hypot(X-PT[0][0],Y-PT[0][1])<26)return meld('Am Trafo hängt es schon. Jetzt zum ersten Mast.')}}};
  const esc=e=>{if(e.key==='Escape'){e.stopPropagation();ende(false)}};addEventListener('keydown',esc,true);
  function mast(X,top){x.fillStyle='#5a3e24';x.fillRect(X-6,top,12,420-top);x.fillStyle='#4a321c';x.fillRect(X-38,top+8,76,8);
    x.fillStyle='#e8e2d0';[[X-30,top+2],[X+24,top+2],[X-3,top-4]].forEach(([a,b])=>{x.fillRect(a,b,6,8)})}
  function frame(){if(fin)return;const T=t();
    const g=x.createLinearGradient(0,0,0,420);g.addColorStop(0,'#2a2c5a');g.addColorStop(.6,'#c86a4a');g.addColorStop(1,'#e8a060');x.fillStyle=g;x.fillRect(0,0,800,500);
    x.fillStyle='#3a2a1e';for(let i=0;i<7;i++){const X=60+i*120,h=40+(i*37)%30;x.fillRect(X,330-h,80,h);x.beginPath();x.moveTo(X-8,330-h);x.lineTo(X+40,300-h);x.lineTo(X+88,330-h);x.fill()}
    x.fillStyle='#4a5a2a';x.fillRect(0,330,800,170);x.fillStyle='#6a5a3a';x.beginPath();x.moveTo(300,500);x.lineTo(380,330);x.lineTo(420,330);x.lineTo(560,500);x.fill();
    // Trafo-Häuschen mit Hauptschalter
    x.fillStyle='#7a7a72';x.fillRect(30,220,110,200);x.fillStyle='#5a5a54';x.beginPath();x.moveTo(20,222);x.lineTo(85,196);x.lineTo(150,222);x.fill();
    x.fillStyle='#e8d020';x.beginPath();x.moveTo(85,246);x.lineTo(70,272);x.lineTo(100,272);x.closePath();x.fill();x.fillStyle='#111';x.font='bold 16px Georgia';x.textAlign='center';x.fillText('⚡',85,268);
    x.fillStyle='#2a2a2a';x.fillRect(hebel.x,hebel.y,hebel.w,hebel.h);x.fillStyle=st.strom?'#e83a2a':'#3a8a3a';x.beginPath();x.arc(hebel.x+hebel.w/2,hebel.y+12,6,0,7);x.fill();
    x.strokeStyle='#c8c8c8';x.lineWidth=7;x.beginPath();x.moveTo(hebel.x+hebel.w/2,hebel.y+44);x.lineTo(hebel.x+hebel.w/2+(st.strom?-14:14),hebel.y+(st.strom?26:62));x.stroke();x.lineWidth=1;
    x.fillStyle='#f6ead0';x.font='bold 11px Georgia';x.fillText(st.strom?'AN':'AUS',hebel.x+hebel.w/2,hebel.y+hebel.h+16);x.fillText('Hauptschalter',hebel.x+hebel.w/2,hebel.y-8);
    // Schmiede rechts mit Fenster
    x.fillStyle='#6a4a2a';x.fillRect(700,200,110,220);x.fillStyle='#3a2a1a';x.beginPath();x.moveTo(690,204);x.lineTo(760,160);x.lineTo(820,204);x.fill();
    const licht=st.fertig?Math.min(1,(T-st.fertig)*2):0,flacker=st.strom&&!st.fertig&&st.alt.some(a=>a)?(Math.random()<.3?.5:0):0;
    x.fillStyle=`rgb(${40+200*Math.max(licht,flacker)},${30+180*Math.max(licht,flacker)},${20+90*Math.max(licht,flacker)})`;x.fillRect(722,260,44,36);x.strokeStyle='#2a1a0a';x.lineWidth=4;x.strokeRect(722,260,44,36);x.lineWidth=1;
    if(licht){x.save();x.globalCompositeOperation='lighter';const gl=x.createRadialGradient(744,278,4,744,278,120);gl.addColorStop(0,`rgba(255,220,120,${.6*licht})`);gl.addColorStop(1,'rgba(255,220,120,0)');x.fillStyle=gl;x.fillRect(620,160,200,240);x.restore()}
    x.fillStyle='#e8e2d0';x.fillRect(PT[5][0]-3,PT[5][1]-4,6,8);
    for(let i=1;i<5;i++)mast(PT[i][0],PT[i][1]);
    // alte Kabel: braun, ausgefranst, knistern unter Strom
    for(let i=0;i<5;i++){if(!st.alt[i])continue;const f=sag(PT[i],PT[i+1],46);x.strokeStyle='#5a3a1a';x.lineWidth=3;x.setLineDash([14,4,6,5]);x.beginPath();for(let k=0;k<=1.001;k+=.05){const[a,b]=f(k);k?x.lineTo(a,b):x.moveTo(a,b)}x.stroke();x.setLineDash([]);
      if(st.strom&&Math.random()<.25){const[a,b]=f(.3+Math.random()*.4);x.strokeStyle='#fff27a';x.lineWidth=1.5;x.beginPath();x.moveTo(a,b);x.lineTo(a+(Math.random()-.5)*14,b+(Math.random()-.5)*14);x.stroke()}}
    for(const q of st.fall){const k=Math.min(1,(T-q.t)/.6),f=sag(PT[q.i],PT[q.i+1],46+k*200);if(k>=1)continue;x.globalAlpha=1-k;x.strokeStyle='#5a3a1a';x.lineWidth=3;x.beginPath();for(let j=0;j<=1.001;j+=.05){const[a,b]=f(j);j?x.lineTo(a,b):x.moveTo(a,b)}x.stroke();x.globalAlpha=1}
    // neue Kabel: schwarz, straff
    for(let i=0;i<st.neu;i++){const f=sag(PT[i],PT[i+1],26);x.strokeStyle='#111';x.lineWidth=3.5;x.beginPath();for(let k=0;k<=1.001;k+=.05){const[a,b]=f(k);k?x.lineTo(a,b):x.moveTo(a,b)}x.stroke()}
    const altDa=st.alt.some(a=>a);
    if(!altDa&&st.neu<5){const[a,b]=PT[st.neu],[mx,my]=st.maus;x.strokeStyle='rgba(20,20,20,.7)';x.setLineDash([6,5]);x.lineWidth=2.5;x.beginPath();x.moveTo(a,b);x.quadraticCurveTo((a+mx)/2,(b+my)/2+30,mx,my);x.stroke();x.setLineDash([]);
      const[nx,ny]=PT[st.neu+1],p=.5+.5*Math.sin(T*6);x.strokeStyle=`rgba(120,255,140,${.5+.5*p})`;x.lineWidth=3;x.beginPath();x.arc(nx,ny,14+p*4,0,7);x.stroke()}
    if(!st.fertig&&!altDa&&st.neu>=5&&!st.strom){const p=.5+.5*Math.sin(T*6);x.strokeStyle=`rgba(120,255,140,${.5+.5*p})`;x.lineWidth=3;x.strokeRect(hebel.x-6,hebel.y-6,hebel.w+12,hebel.h+12)}
    if(st.strom&&altDa){const p=.5+.5*Math.sin(T*5);x.strokeStyle=`rgba(255,90,70,${.4+.5*p})`;x.lineWidth=3;x.strokeRect(hebel.x-6,hebel.y-6,hebel.w+12,hebel.h+12)}
    x.lineWidth=1;
    // Anleitung oben
    const ziel=st.fertig?'Licht! Die Schmiede hat wieder Strom.':altDa?(st.strom?'1. Erst den Hauptschalter AUS (links am Trafo).':`2. Alte Kabel anklicken und abnehmen (noch ${st.alt.filter(a=>a).length}).`)
      :st.neu<5?`3. Neues Kabel verlegen: den grün blinkenden Mast anklicken (${st.neu} / 5).`:'4. Hauptschalter wieder AN.';
    x.fillStyle='rgba(15,8,4,.78)';x.fillRect(120,10,560,34);x.fillStyle='#f6ead0';x.font='15px Georgia';x.fillText(ziel,400,32);
    x.font='11px Georgia';x.fillStyle='rgba(246,234,208,.7)';x.fillText('Esc: aufhören',740,490);
    for(const q of st.pop.slice(-1)){const a=T-q.t;if(a>2)continue;   /* nur die neueste Meldung */x.fillStyle=`rgba(${q.c},${1-a/2})`;x.font='bold 17px Georgia';x.fillText(q.s,400,90-a*14)}st.pop=st.pop.filter(q=>T-q.t<2.1);
    if(T-st.blitz<.35){x.fillStyle=`rgba(255,255,200,${.8*(1-(T-st.blitz)/.35)})`;x.fillRect(0,0,800,500)}
    x.textAlign='left';
    if(st.fertig&&T-st.fertig>1.8)return ende(true);
    requestAnimationFrame(frame)}
  function ende(sieg){if(fin)return;fin=true;removeEventListener('keydown',esc,true);cv2.remove();
    if(sieg)return kabelSieg();say([['P','Pause. Mein Herz macht noch Stromstöße.'],['SM','Komm wieder, wenn deine Frisur sich beruhigt hat.']])}
  requestAnimationFrame(frame)}

// ---------- Oma Dusja: Kohle ----------
wrapFn('oma',function(orig){
  if(has('kohle'))return say([['P','Oma Dusja, ich hab hier einen Sack Kohle. Für Ihren Ofen.'],['O','Kohle? Für mich? Ich frier doch nicht! … Wer fagt daf?'],['P','Niemand. Die Kohle ist … einfach übrig.'],
    ['O','*schnuppert am Sack* Daf riecht nach Fjodorf Fchmiede. Der alte Bock.'],['O','*heizt den Ofen an* … Ahhh. Warm. Junge, du bift ein Engel mit langen Beinen.'],['O','Fag ihm danke. Aber nicht fo, daff er ef merkt.']],
    ()=>{dropInv('kohle');FL.omaKohle=1;rufToast(DORF_RUF.omaKohle)});
  if(FL.kohleGeg&&!FL.omaKohle)return say([['O','Brrr … Junge, mach die Tür zu, ef zieht.'],['P','(Die Kohle für sie. Ich hab den Sack doch … wo hab ich den Sack?)']]);
  return orig()});

// ---------- Auftragsbuch ----------
{const _q=quests;quests=function(){const Q=_q();
  if(FL.kabelQ)Q.push({t:'Strom für die Schmiede',neben:1,d:'Fjodors Dorfleitung ist von 1971. Alte Kabel runter, neue ran.',v:1,ok:FL.kabel,
    h:'In der Schmiede mit Fjodor reden. Erst den Hauptschalter aus, dann die alten Kabel abnehmen, neues Kabel Mast für Mast ziehen, Strom wieder an.'});
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
      ['PO','Ich segne es. Und Murka kommt zur Einweihung.'],['O','Ich bring Pirogi. Mit Gebiff gebacken.'],['P','(Ein eigenes Haus. Ich. Der Typ von Wowas Sofa.)','smirk']],()=>
      animShots([{d:2.6,cap:'Petjas eigenes Haus',draw(x,t,k){x.drawImage(bauBG(),0,0);x.fillStyle=`rgba(0,0,0,${.45*(1-k)})`;x.fillRect(0,0,800,500);x.font='bold 40px Georgia';x.textAlign='center';x.lineWidth=6;x.strokeStyle='#000';
        x.strokeText('Petjas Haus',400,200);x.fillStyle='#ffd25a';x.fillText('Petjas Haus',400,200);x.textAlign='left'}},...hausShots()],()=>{enter('dorf',[420,470]);
        setTimeout(()=>say([['G','Ein Haus aus Birken, mit Fjodors Nägeln, Dusjas Pirogi und Ignatis Segen. Jetzt bist du einer von uns, Junge.','drunk'],
          ['P','(Drüben hatte ich ein Sofa, das mir nicht gehört. Hier hab ich ein Haus. Mit Tür.)'],['P','(Ich bleibe.)']],()=>{ENDEN.ehren=['Ende: Ehrenbürger','Petja blieb. Nicht als Zahnrad – als einer von ihnen. Mit Urkunde und eigenem Haus.'];
            fade.style.opacity=1;setTimeout(()=>{abspannEnde('ehren');fade.style.opacity=0},900)}),1000)})),1100)})}}
