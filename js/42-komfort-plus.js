// ================= Komfort+: Taschen-Interaktion, Kulissen-Sprüche, Schnellreise, Vorladen, scharfe Zwischensequenzen =================

// ---------- 1) Taschen: Untersuchen (Klick / Rechtsklick), Kombinieren und Anwenden per Ziehen ----------
// Untersuchen: ein bissiger Kommentar von Petja (statt nur der Beschreibung). Fehlt einer, kommt die Beschreibung.
const UNTERSUCHEN={
  kippe:'Ein Joint-Stummel. Das letzte Stück meiner Würde. Leicht angekokelt.',
  saege:'Frisch geschärft. Jetzt schneidet sie Birken. Vorher hat sie nur Ausreden geschnitten.',
  rsaege:'Rostiger als Opas Witze. Und genauso stumpf.',
  apfel:'Ein Apfel. Gesund, sagt man. Ich nutz ihn lieber als Wurfgeschoss. Das ist auch Sport.',
  stock:'Ein Stock. Mit Schnur dran wär er eine Angel. Ohne Schnur ist er … ein Stock. So wie ich ohne Kaffee.',
  seil:'Schnur. Zum Angeln, zum Knoten, zum … nein. So schlimm ist es noch nicht.',
  angel:'Stock, Schnur, Sicherheitsnadel. Meine bisher größte Ingenieursleistung. Traurig, eigentlich.',
  pilze:'Neun blaue Pilzstücke. Wenn Mama wüsste, was ich in der Tasche hab. Sie würde fragen, ob ich genug esse.',
  blaupilze:'Frische Traumschwämme. Leuchten blau. Ich ess die nicht. Ich hab aus dem letzten Mal gelernt. Glaub ich.',
  karte:'Baba Jagas Karte. Halb verbrannt. Wie meine Pläne fürs Wochenende.',
  liste:'Madames Wunschliste: schön, frech, will raus. Ich bin keins davon. Okay, raus will ich.',
  gutschein:'Ein Gutschein für den Banja. Das Wertvollste, was ich je besessen hab. Erschreckend.',
  mehl:'„Mehl“. In Anführungszeichen. Ich stell keine Fragen. Ich trag nur.',
  laterne:'Grünes Licht. Brennt mit irgendwas Gnomischem. Mein Abstellraum hatte nie so viel Atmosphäre.',
  wuermer:'Würmer. Sie zappeln. Ich auch, innerlich.',
  schnaps:'Kusmitschs Selbstgebrannter. Riecht nach Benzin und Reue. Ich hab ihn geklaut. Er weiß es. Ich weiß, dass er es weiß.',
  leiter:'Eine Leiter. Nach oben geht’s für mich sonst nie.',
  fisch:'Ein Fisch. Guckt mich an, als hätte ich was falsch gemacht. Hab ich auch. Ich hab ihn gefangen.',
  gebiss:'Omas Gebiss. Ich halt es mit zwei Fingern. Mehr Berührung verkraftet meine Seele nicht.',
  teer:'Birkenteer. Klebt an allem. Vor allem an mir.',
  filter:'Der Filter vom alten Joint. Hat alles mitgemacht. Wir verstehen uns.',
  spore:'Goldene Sporen. Glitzern wie Kryptowährung. Und sind genauso stabil.',
  glut:'Glut vom Schmied, in einer Dose. Heiß. Ich halte sie wie ein rohes Ei. Ein brennendes rohes Ei.',
  weihwasser:'Weihwasser. Ich hab mal dran gerochen. Riecht nach Wasser. Enttäuschend heilig.',
  zwiebel:'Eine Zwiebel. Bringt Leute zum Weinen. Wie meine Lebensgeschichte, nur schneller.',
  phiole:'Eine leere Phiole. Für eine Träne. Ich hätte meine eigene anbieten können. Hab genug.',
  traene:'Nastjas Träne. Dreihundert Jahre lang aufgespart. Für mich. Und eine Zwiebel.',
  joint2:'Der Ausweg-Joint. Mein Ticket nach Hause. Hoffentlich ohne Umsteigen.',
  bogen2:'Madames neuer Bogen: „Die Zweitbeste reicht.“ Das Motto meines Lebens, endlich schriftlich.',
  diadem:'Ein Strass-Diadem. Piekt angeblich überall. Ich probier’s nicht an. Heute nicht.',
  polaroid:'Nastja. Zwinkert. Ich guck nicht zu lange hin. … Okay, ein bisschen.'};
const UNT_STD=['Sieht aus wie immer. Ich auch.','Hm. Ja. Ein Ding. In meiner Tasche. Spannend.'];
function untersuche(id){if(busy||changing)return;const t=UNTERSUCHEN[id]||(ITEMS[id]&&ITEMS[id][2])||UNT_STD[0];say([['P',t]])}

// Kombinieren: Rezepte (Reihenfolge egal) und ein paar Sprüche für Unsinn
const KOMBI={
  'seil+stock':()=>{_craftOrig()},
  'angel+wuermer':()=>say([['P','Würmer an die Angel? Gute Idee. Aber erst, wenn ich weiß, wo der Fisch ist. Ich verschwende keine Würmer.']]),
  'apfel+stock':()=>say([['P','Apfel auf den Stock spießen? Toffee-Apfel ohne Toffee. Nein, danke.']]),
  'filter+pilze':()=>say([['P','Pilze in den Filter? Nein. Das hat mich überhaupt erst hierher gebracht.']]),
  'gebiss+fisch':()=>say([['P','Das Gebiss frisst den Fisch nicht von allein. Hab ich ausprobiert. Im Kopf.']]),
  'schnaps+zwiebel':()=>say([['P','Wodka und Zwiebel. Klingt nach Opas Frühstück.']]),
  'laterne+karte':()=>say([['P','Mit der Laterne auf die Karte leuchten. Jetzt seh ich deutlicher, dass ich mich verlaufen werde.']]),
  'glut+kippe':()=>say([['P','Die Glut an den Stummel? Und dann? Noch tiefer ins Märchen? Lieber nicht.']])};
const KOMBI_NEIN=['Das passt nicht zusammen. Wie ich und Frühaufstehen.','Nein. Das ergibt nicht mal im Märchen Sinn.','Ich halte das eine ans andere. Nichts passiert. Wie bei mir montags.','Wenn ich das kombiniere, krieg ich nur Ärger. Und ein Loch in der Hose.'];
function kombiniere(a,b){if(a===b||busy||changing)return;const k=[a,b].sort().join('+'),f=KOMBI[k];if(f)return f();FL.kNein=(FL.kNein||0)+1;say([['P',KOMBI_NEIN[FL.kNein%KOMBI_NEIN.length]]])}

// Die Angel baut sich nicht mehr von selbst: Petja merkt nur an, dass es ginge (im automatischen Durchlauf wie bisher)
const _craftOrig=craft;
craft=function(){if(!(has('stock')&&has('seil')))return;if(typeof DL!='undefined'&&DL.on)return _craftOrig();
  if(!FL.angelTipp){FL.angelTipp=1;setTimeout(()=>say([['P','(Ein Stock. Und Schnur. Wenn ich das eine an das andere knote … )'],['P','(Zieh die Schnur in der Tasche auf den Stock.)']]),400)}};

// Ziehen: Gegenstand auf einen anderen = kombinieren, auf etwas in der Szene = dort benutzen; kurzer Klick/Rechtsklick = untersuchen
{let drag=null,schlucken=false;
  const geist=document.createElement('img');geist.id='invGeist';geist.draggable=false;document.body.appendChild(geist);
  const css=document.createElement('style');css.textContent=`#invGeist{position:fixed;z-index:9999;width:58px;height:58px;pointer-events:none;display:none;transform:translate(-50%,-60%) rotate(-8deg);filter:drop-shadow(0 6px 8px rgba(0,0,0,.6))}
#slots .slot.ziel{outline:2px solid #ffd25a;outline-offset:-2px;background:rgba(255,210,90,.18)}#slots .slot.zieht{opacity:.35}
.interactive.ziel .hit,.interactive.ziel image{filter:drop-shadow(0 0 4px #ffd25a)}`;document.head.appendChild(css);
  const slotAt=(x,y)=>{const e=document.elementFromPoint(x,y);return e&&e.closest&&e.closest('#slots .slot')};
  const hotAt=(x,y)=>{const e=document.elementFromPoint(x,y),h=e&&e.closest&&e.closest('.interactive[data-id]');if(!h)return null;const room=h.closest('.room');return room&&!room.classList.contains('on')?null:h};
  const markiere=(x,y)=>{document.querySelectorAll('.ziel').forEach(e=>e.classList.remove('ziel'));const s=slotAt(x,y);if(s&&s.dataset.item!==drag.id)s.classList.add('ziel');else{const h=hotAt(x,y);if(h)h.classList.add('ziel')}};
  const _ri=renderInv;renderInv=function(){_ri.apply(this,arguments);const S=$('#slots');if(!S)return;[...S.children].forEach((d,i)=>{const id=inv[i];if(!id)return;d.dataset.item=id;
    d.title=(ITEMS[id]?ITEMS[id][1]:id)+' – Klick: untersuchen · ziehen: kombinieren oder benutzen';
    d.onclick=e=>{e.stopPropagation();if(schlucken){schlucken=false;return}untersuche(id)};
    d.oncontextmenu=e=>{e.preventDefault();e.stopPropagation();untersuche(id)};
    d.onpointerdown=e=>{if(e.button!==0||busy||changing)return;drag={id,x:e.clientX,y:e.clientY,el:d,an:false}}})};
  addEventListener('pointermove',e=>{if(!drag)return;if(!drag.an){if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)<7)return;drag.an=true;geist.src=ICON(drag.id);geist.style.display='block';drag.el.classList.add('zieht');document.body.classList.add('ziehen')}
    geist.style.left=e.clientX+'px';geist.style.top=e.clientY+'px';markiere(e.clientX,e.clientY)});
  addEventListener('pointerup',e=>{if(!drag)return;const d=drag;drag=null;document.querySelectorAll('.ziel').forEach(x=>x.classList.remove('ziel'));d.el.classList.remove('zieht');document.body.classList.remove('ziehen');geist.style.display='none';
    if(!d.an)return;schlucken=true;setTimeout(()=>schlucken=false,50);
    const s=slotAt(e.clientX,e.clientY);if(s&&s.dataset.item)return kombiniere(d.id,s.dataset.item);
    const h=hotAt(e.clientX,e.clientY);if(h){const id=h.dataset.id,o=T[id];if(!o)return;FL.zugDrauf=d.id;
      if(typeof zieheAuf=='function'&&zieheAuf(d.id,id,h))return;   // passt nicht → sarkastische Absage (44-geht-nicht-erfolge.js)
      if(id=='petja'||!o.at)return use(id);return walkTo(o.at[0],o.at[1],()=>use(id))}});
  if(typeof inv!='undefined')renderInv()}

// ---------- 2) Kulissen: fast alles hat einen trockenen Einzeiler ----------
// [Ort, Name, Rechteck x,y,b,h (Spielkoordinaten 800×500), Sprüche (wechseln bei jedem Klick)]. Liegt UNTER den echten Hotspots.
const DEKO=[
  ['wald','Birken',[0,0,70,440],['Birken. Tausende. Wenn man eine gesehen hat, hat man alle gesehen. Und ich hab alle gesehen.','Ich glaube, die Birken tuscheln über mich.']],
  ['wald','Baumstumpf',[570,415,60,30],['Ein Baumstumpf. Der einzige hier, der noch weniger vorhat als ich.']],
  ['wald','Himmel',[220,0,260,160],['Blauer Himmel, Sonne, Vögel. Viel zu fröhlich für meinen Zustand.']],
  ['gabel','Birkenstamm',[0,60,40,380],['Noch eine Birke. Ich glaube, die folgen mir.']],
  ['gabel','Umgestürzter Baum',[490,260,120,70],['Ein umgestürzter Baum. Hat auch einfach aufgegeben. Respekt.']],
  ['huette','Schädelzaun',[160,380,210,70],['Ein Zaun aus Schädeln. Bei uns stehen Gartenzwerge im Vorgarten. Hier ist der Gartenzwerg der Zaun.','Ich zähle die Schädel. Ich hoffe, ich werde nicht der nächste.']],
  ['huette','Feuerholz',[600,405,80,50],['Feuerholz. Ordentlich gestapelt. Das Ordentlichste an diesem ganzen Grundstück.']],
  ['huette','Tote Bäume',[0,60,150,250],['Kahle Bäume. Selbst die Natur hat hier keine Lust mehr.']],
  ['innen','Hexenfenster',[300,90,90,85],['Ein Fenster mit Gardine. Sogar Hexen wollen nicht, dass die Nachbarn reingucken.']],
  ['innen','Regale',[420,60,380,100],['Gläser über Gläser: „Krötenschleim“, „Augen, gemischt“, „NICHT ANFASSEN, PETJA“. Woher kennt die meinen Namen?']],
  ['innen','Porträt',[435,165,60,60],['Ein Porträt. Der Typ guckt, als hätte er auch mal einen Joint geraucht. Und dann nie wieder irgendwas.']],
  ['innen','Tafel',[525,170,75,60],['„Kräuter + Mond … ?“ Ich hab in Mathe auch nie die Lösung gewusst.']],
  ['dorf','Pfütze',[260,400,80,30],['Eine Pfütze. Tiefer als sie aussieht. Mein Schuh weiß das jetzt.']],
  ['dorf','Strommast',[275,0,30,150],['Ein Strommast. Hier gibt’s Strom? Aber kein WLAN. Ich hasse es hier.']],
  ['dorf','Schornstein',[700,80,60,220],['Ein Schornstein ohne Haus. Postsowjetische Architektur in Reinform.']],
  ['dorfstr','Sonnenblumen',[40,180,140,90],['Sonnenblumen. Größer als ich. Und mit mehr Lebensfreude.']],
  ['dorfstr','Pfütze',[380,435,70,30],['Noch eine Pfütze. Das Dorf besteht zu dreißig Prozent aus Pfützen.']],
  ['kirche','Friedhof',[50,410,180,80],['Ein Friedhof. Ruhige Nachbarschaft. Keiner beschwert sich über laute Musik.']],
  ['kirche','Zwiebelturm',[415,25,60,90],['Eine goldene Zwiebel auf dem Dach. Selbst die Kirche hier hat was mit Gemüse.']],
  ['muehle','Mühlrad',[350,250,150,150],['Das Mühlrad dreht sich. Im Gegensatz zu mir. Ich dreh nur durch.']],
  ['muehle','Bank',[530,430,70,40],['Eine Bank. Ich setz mich nicht. Wenn ich sitze, steh ich nie wieder auf.']],
  ['irrwald','Augen im Gebüsch',[40,290,180,50],['Da leuchten Augen im Gebüsch. Ich winke. Sie winken nicht zurück.']],
  ['banjaV','Neonschild',[310,140,220,80],['„BANJA – Dampf, Tanz, Wodka.“ Drei Dinge, von denen ich zwei verstehe.']],
  ['banja','Flaschenregal',[30,250,250,120],['Wodka, Wodka, etwas Grünes, Wodka. Die Getränkekarte ist kurz und ehrlich.']],
  ['banja','Pappschild',[300,375,60,25],['„… KEINE S…“ Keine Socken? Keine Sorgen? Keine Seele? Ich tippe auf alles drei.']],
  ['sperre','Dunkler Wald',[0,0,130,500],['Da drin ist es so dunkel, dass selbst die Dunkelheit eine Taschenlampe bräuchte.']],
  ['sumpf','Schilf',[680,250,70,130],['Schilf. Ideal zum Verstecken. Oder zum Ertrinken. Der Sumpf lässt einem die Wahl.']],
  ['sumpf','Seerosen',[480,360,90,30],['Seerosen. Hübsch. Bestimmt giftig. Wie alles Hübsche hier.']],
  ['fischer','Boot',[340,355,100,30],['Ein Boot, kieloben. Wie mein Leben.']],
  ['fischer','See',[610,140,190,160],['Der See. Spiegelglatt. Irgendwo da unten liegt bestimmt mein Selbstwertgefühl.']],
  ['ufer','Ruderboot',[540,335,120,40],['Noch ein Boot. Halb versunken. Das Ufer ist ein Friedhof für Boote.']],
  ['ufer','Kahler Baum',[620,100,180,220],['Ein kahler Baum am Wasser. Sieht aus wie ich nach einer Party.']],
  ['unter','Pfähle',[120,100,60,300],['Glitschige Pfähle mit Algen. Hier unten wohnt garantiert was mit Zähnen.']],
  ['gnome','Fass',[495,315,40,40],['Ein Fass in Gnomgröße. Für mich ein Schnapsglas.']],
  ['hoehle','Kristalle',[600,350,200,70],['Lila Kristalle, leuchten von selbst. Entweder Magie oder Radioaktivität. In Russland weiß man das nie so genau.']],
  ['hoehle','Schädel',[540,435,40,30],['Ein Schädel. Der Vorgänger von dem, der hier zu laut war.']],
  ['buehne','Geldscheine',[270,370,160,30],['Geldscheine auf der Bühne. Bücken wäre unhöflich. Und Madame sieht alles.']],
  ['lounge','Spiegel',[325,70,145,190],['Ein ovaler Spiegel. Ich seh darin einen Mann, der nach Zwiebel riecht. Er guckt zurück.']],
  ['lounge','Kerzen',[70,270,40,40],['Kerzen. Romantisch. Oder Brandschutz-Albtraum. Je nach Perspektive.']],
  ['garten','Riesenkohl',[0,380,200,80],['Riesenkohl. Gnome düngen offenbar mit Größenwahn.']],
  ['banjaH','Kisten',[175,305,80,65],['Kisten. „Wodka – nicht Wodka“ steht drauf. Ich frag lieber nicht.']],
  ['schmiede','Holzstapel',[640,375,110,50],['Holz für die Esse. Mehr Holz, als dieses Dorf Birken hat. Und das will was heißen.']]];
{const NS='http://www.w3.org/2000/svg';DEKO.forEach(([room,n,[x,y,w,h],l],i)=>{const r=document.getElementById('r-'+room);if(!r)return;const id='deko'+i;
  T[id]={n,deko:1,l:l.map(t=>[['P',t]])};const g=document.createElementNS(NS,'g');g.setAttribute('class','interactive painted deko');g.dataset.id=id;
  const p=document.createElementNS(NS,'rect');p.setAttribute('class','hit');['x','y','width','height'].forEach((k,j)=>p.setAttribute(k,[x,y,w,h][j]));p.setAttribute('fill','transparent');g.appendChild(p);
  r.insertBefore(g,r.firstChild)})}   // ganz nach unten: echte Hotspots liegen darüber und gewinnen

// ---------- 3) Karten-Schnellreise (ab 5 entdeckten Orten): Klick auf einen besuchten Ort ----------
const REISE_MIN=5,REISE_NICHT=['unter','irrwald'];
const reiseOrte=()=>Object.keys(MAPN).filter(id=>seen[id]);
const reiseOk=id=>seen[id]&&id!==cur&&!REISE_NICHT.includes(id)&&!(id==='innen'&&!FL.drin)&&TTELE[id];
{const _ms=mapSVG;mapSVG=function(){let s=_ms.apply(this,arguments);if(reiseOrte().length<REISE_MIN)return s;
    const add=Object.keys(MAPN).filter(reiseOk).map(id=>{const[x,y]=MAPN[id];return`<circle class="mapgo" data-go="${id}" cx="${x}" cy="${y+2}" r="7" fill="transparent"><title>${LOCN[id]}</title></circle>`}).join('');
    return s.replace('</svg>',add+'</svg>')};
  const _ob=openBook;openBook=function(tab){const r=_ob.apply(this,arguments);if((tab||'tasche')!=='karte'||!ovl)return r;
    const lg=ovl.querySelector('.legend');if(lg)lg.insertAdjacentHTML('afterend',reiseOrte().length>=REISE_MIN?'<p class="legend reise">Klick auf einen besuchten Ort: Schnellreise</p>':`<p class="legend reise">Schnellreise ab ${REISE_MIN} entdeckten Orten</p>`);
    ovl.querySelectorAll('.mapgo').forEach(c=>c.onclick=e=>{e.stopPropagation();const id=c.dataset.go;if(busy||changing)return;closeO();FL.reisen=(FL.reisen||0)+1;enter(id,TTELE[id])});return r};
  const css=document.createElement('style');css.textContent=`.map .mapgo{cursor:pointer}.map .mapgo:hover{fill:rgba(255,210,90,.28);stroke:#ffd25a;stroke-width:.6}.legend.reise{opacity:.8;font-style:italic}`;document.head.appendChild(css)}

// ---------- 4) Vorladen: alle Orte schon im Titelbild vormalen (sonst friert der erste Besuch ~1 s ein), Bilder vordekodieren ----------
// Gemalt wird synchron auf die Hauptleinwand und sofort zurückgesetzt – im selben Schritt, also nie sichtbar.
// Orte, deren Bild vom Spielstand abhängt, werden beim Laden eines Spielstands trotzdem neu gemalt.
const ZUSTANDS_ORTE=['wald','sperre','dorf','fischer','banja'];
{const vormal=()=>{if(!$('#start')||/durchlauf/.test(location.search)||(typeof DL!='undefined'&&DL.on))return;
    const id=Object.keys(SCN).find(k=>!cache[k]);if(!id)return dekodiere();
    const snap=document.createElement('canvas');snap.width=cv.width;snap.height=cv.height;snap.getContext('2d').drawImage(cv,0,0);const S1=S0,s1=s;
    try{S0=SCN[id];s=S0.seed;S0.paint();const k=document.createElement('canvas');k.width=W;k.height=H;k.getContext('2d').drawImage(cv,0,0);cache[id]=k}catch(e){cache[id]=null;delete cache[id];console.warn('vormalen',id,e)}
    c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.drawImage(snap,0,0);S0=S1;s=s1;setTimeout(vormal,80)};
  let dekodiert=false;const dekodiere=()=>{if(dekodiert)return;dekodiert=true;const seen2=new Set();document.querySelectorAll('#scene image').forEach(im=>{const u=im.getAttribute('href');if(u&&!seen2.has(u)){seen2.add(u);const i=new Image();i.src=u;if(i.decode)i.decode().catch(()=>{})}})};
  setTimeout(vormal,2500);
  // Spielstand laden: nur die vom Spielstand abhängigen Orte neu malen, die übrigen Vorab-Bilder behalten
  const _ls=loadState;loadState=function(d){const keep={};for(const k in cache)if(!ZUSTANDS_ORTE.includes(k))keep[k]=cache[k];const r=_ls.apply(this,arguments);Object.assign(cache,keep);return r}}

// ---------- 5) Scharfe Zwischensequenzen: Leinwände für Szenen (#cut) in Bildschirmauflösung statt 1200×750 hochgezogen ----------
// Der Zeichencode bleibt unverändert (Koordinaten wie bisher), nur setTransform wird um den Faktor q skaliert.
{const gc=HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext=function(t,o){
    if(t==='2d'&&!this._q&&this.id==='cut'&&this.width===W&&this.height===H&&this.isConnected){
      const g=$('#game'),r=g?g.getBoundingClientRect():{width:W},q=Math.max(1,Math.min(2.5,Math.round(r.width*(window.devicePixelRatio||1)/W*4)/4));
      if(q>1){this._q=q;this.width=Math.round(W*q);this.height=Math.round(H*q);const x=gc.call(this,t,o),st=x.setTransform.bind(x),gt=x.getTransform.bind(x);
        x.setTransform=function(a,b,c2,d,e,f){if(a&&typeof a==='object')return st(a.a*q,a.b*q,a.c*q,a.d*q,a.e*q,a.f*q);return st(a*q,b*q,c2*q,d*q,e*q,f*q)};
        x.resetTransform=function(){st(q,0,0,q,0,0)};x.getTransform=function(){const m=gt();return new DOMMatrix([m.a/q,m.b/q,m.c/q,m.d/q,m.e/q,m.f/q])};
        st(q,0,0,q,0,0);return x}}
    return gc.call(this,t,o)}}
