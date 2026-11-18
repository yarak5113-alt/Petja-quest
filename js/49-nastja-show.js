// ================= Nastja: Privattanz-Engine (Puppet-Rig, Jiggle-Physik, 8 Richtungen, Ich-Sicht, Vibe-Meter) =================
// Outfit-Stufen nach Beziehung (Anwerben gibt 15 %, 37-beziehungen.js):
//   < 25 %  kein Privattanz · 25–49 % Standard-Outfit · 50–79 % VIP-Outfit · 80–100 % Dessous · 100 % Polaroid (39-enden.js)
// Beim ersten Tanz in einem neuen Outfit macht Petja die Augen zu, sie zieht sich um, dann geht's los.
//
// Aufbau des Renderers (alles pro Bild, ohne Handarbeit am Sprite):
//   naRig(bild)     zerlegt das Pixelbild einmalig in Schichten: Körper (Stiefel/Beine/Hüfte/Korsett/Oberkörper) und Haare.
//                   Haare = blonde Töne (Farbton ≥ 34,5°, Sättigung ≥ 0,23), Konturpixel gehen zur Schicht, an der sie hängen.
//   naZeichne()     zeichnet beide Schichten in 2-px-Zeilenstreifen. Jede Zeile bekommt eine eigene Verschiebung:
//                   Stiefel fest → Knie → Hüfte (Sinus) → Taille → Brust (gegenläufig + Feder) → Kopf. Das ist ein 1D-Mesh-Warp,
//                   deshalb biegt sich der Körper weich statt zu springen.
//   Federn          Brust: gedämpfte Feder (3 Hz, ζ 0,2), angetrieben von der Beschleunigung des Wippens und der Hüfte.
//                   Haare: hängen dem Kopf 0,15 s hinterher (Ringpuffer) und schwingen mit einer weicheren Feder (1,8 Hz) nach;
//                   bei Drehungen fächern sie auf.
//   8 Richtungen    directionIndex 0–7 (0° vorn, 45° vorn-rechts, 90° Profil rechts … 315° vorn-links). Hat ein Outfit für eine
//                   Richtung ein eigenes Bild (NA_SKINS.<outfit>.dirs[i] = Image), wird es benutzt. Sonst rechnet die Engine die
//                   Drehung aus der Frontansicht: Breite mit |cos θ|, Schattierung zur abgewandten Seite, Rückansicht gespiegelt
//                   und abgedunkelt mit den Haaren VOR dem Körper und Hinterkopf statt Gesicht.
//   Stimmungsbalken Leertaste / Klick im Takt (100 BPM, ±0,2 s, Taktring zeigt den Moment) füllt es, daneben kostet etwas; Maus im Kreis bewegen dreht
//                   Nastja mit und gibt auch Vibe. Viel Vibe = größere Bewegungen, mehr Glitzer, am Ende Bonus-Beziehung.
// Punkte: alle Beziehungspunkte außer dem Anwerben zählen ×1,25 (20 % schneller zu 80 % / 100 %).
// Tanzmenü (unten links, während des Tanzes):
//   🧻 Скомканные салфетки / Tempos zustecken (immer, einmal pro Tanz) → Nastja lacht dich auf Russisch aus, Stimmung leicht +
//   👋 Ближе наклониться (näher ranbeugen)       → Kamera zoomt auf den Oberkörper (mehrfach = näher), geht nach 6 s zurück
//   💃 Twerken (nur im Dessous-Outfit, ersetzt „Riskant anfassen“) → Nastja dreht sich um und tanzt TWERK_TAKTE Takte lang die
//        gezeichneten Frames (55-sprite-strip.js, ein Durchgang = 2 Takte, tiefster Punkt auf dem Schlag, Wackel-Physik: twerkZeichnen), dreht sich zurück; Stimmung +12; danach TWERK_PAUSE s Pause.
//        Der Griff-Code unten (Zonen, Arm, Squish) ist ohne Knopf derzeit nicht erreichbar, bleibt aber erhalten.
//   (früher) ✋ Рискнуть и приобнять – danach auf eine von DREI Zonen klicken (ph.zoneOben / ph.torso / ph.zoneUnten), entscheidet
//        jeweils Nastjas BEZIEHUNG (relOf > GRIFF_SCHWELLE = 70). Kopf und Hüfte nur mit Dialog, der POV-Arm nur in der Mitte:
//        Kopf/Haare  > 70 → „Na gut, an die Haare kommst du nicht ran …“ Stimmung +5   · ≤ 70 → „Finger weg von der Frisur!“
//        Hüfte       > 70 → „Du legst es drauf an, Pjotr.“ Stimmung +8                 · ≤ 70 → Zinaida: „Schluss mit dem Zirkus!“ (STOPP, Stimmung −10)
//        Nach jedem Versuch ist „Riskant anfassen“ RISK_PAUSE (4 s) gesperrt, nach einem gelungenen Griff 2 s länger.
//        Alle Sprüche stehen auf Deutsch im Code; die russische Fassung kommt aus lang/src/ru/49-53.txt.
//        Mitte (Oberkörper):
//        ≤ 70                → Hand-Wegschlag nach rechts unten (siehe unten).
//        > 70, Zinaida guckt → Zinaida reißt den Vorhang auf: Arm zuckt zurück, Stimmung −15, Tanz stockt kurz.
//        > 70, freie Bahn    → Hand-Zustandsautomat (griffZustand): heran (gespreizt) → greifen (Hand drückt sich zusammen,
//                              im selben Bild: playSquishSound() + Wackel-Impuls bei Nastja) → halten (zieht sie näher, Kamera
//                              lehnt sich tief rein, Zoom 2,15) → loslassen (Hand spreizt sich) → weg. Gegriffen wird an der Taille.
//                              Flirt-Reaktion, Stimmung +20, Beziehung + (na_mut).
//   ✋ Riskant (RISKY_CONTACT, einmal pro Tanz)  → danach auf die Trefferzone upper_torso_zone klicken: Petjas ausgestreckter Arm (Ich-Sicht, PETJA_ARM_IMG aus
//        54-petja-arm-pixel.js) schiebt sich von RECHTS UNTEN ins Bild Richtung Brust. Bevor die Hand ankommt, schlägt Nastja sie
//        blitzschnell zur Seite (*KLATSCH*, «Клешни свои убрал с верхнего этажа!»). Kein Beziehungs-Boost, nur Stimmung −12,
//        und Zinaida grinst hämisch hinter dem Vorhang. Alle passiven Ebenen haben pointer-events: none, damit die Zone klickbar bleibt.
//   💸 Башли (nur wenn player.cash > 0)          → ein Rubel ins Strumpfband, Vibe und Beziehung +
// Zinaida (Aufpasserin) linst ab und zu hinter dem Vorhang hervor – dann lieber nichts Riskantes.
// player.cash = Rubel (FL.cash). Petja startet pleite; Opa zahlt nach gewonnenem Trinkduell aus (52-trinkduell.js).
const player={get cash(){return FL.cash||0},set cash(v){FL.cash=Math.max(0,v|0)}};
const ZIN_IMG=(()=>{const im=new Image();im.src=ZINAIDA_GANZ;return im})();

const NA_STUFEN=[[80,'dessous'],[50,'vip'],[25,'standard']];
const nastjaSkin=(v=relOf('Nastja'))=>{for(const[g,k]of NA_STUFEN)if(v>=g)return k;return null};
// Zonen als Anteil der Bildhöhe (von oben): Hals, Brust, Taille, Hüfte, Knie, Haarende
const NA_SKINS={
  standard:{bild:()=>typeof nastjaTanzBild=='function'?nastjaTanzBild('tanz1'):null,zonen:{hals:.22,brust:.33,taille:.43,huefte:.53,knie:.76,haar:.62},dirs:[],
    brust:{box:[108,148,64,46],anker:[140,194],s:[1.22,1.3]}},   // Korsett-Oberteil größer (wie bei VIP/Dessous): Ausschnitt vergrößert, unten am Unterbrustbogen verankert
  vip:{bild:()=>NASTJA_VIP_IMG[0],zu:()=>NASTJA_VIP_IMG[1],zonen:{hals:.2,brust:.3,taille:.42,huefte:.52,knie:.75,haar:.62},dirs:[]},
  dessous:{bild:()=>NASTJA_DES_IMG,zonen:{hals:.19,brust:.28,taille:.4,huefte:.5,knie:.74,haar:.62},dirs:[]}};
const NA_RICHTUNG=['vorn','vorn-rechts','Profil rechts','hinten-rechts','hinten','hinten-links','Profil links','vorn-links'];

// Bonus aus dem Vibe-Meter fließt in die Beziehung (je +5, höchstens zweimal)
// Alles außer den 15 % fürs Anwerben zählt ×1,25 → bis 100 % braucht man 20 % weniger Gespräche, Tänze und Drinks.
{const f=REL['Nastja'];REL['Nastja']=()=>{const rek=FL.rekrut?15:0;return rek+(f()-rek+Math.min(2,FL.na_vibe||0)*5+Math.min(2,FL.na_tempo||0)*4+Math.min(2,FL.na_mut||0)*6+Math.min(3,FL.na_tip||0)*5)*1.25}}

// ---------- Rig: Bild in Körper- und Haarschicht zerlegen ----------
function naRig(img,zonen,brust){if(!img||!img.complete||!img.naturalWidth)return null;if(img._naRig)return img._naRig;
  const w=img.naturalWidth,h=img.naturalHeight,c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');g.drawImage(img,0,0);
  const id=g.getImageData(0,0,w,h),d=id.data,typ=new Uint8Array(w*h),haarBis=h*zonen.haar;   // 0 leer · 1 Körper · 2 Haar · 3 Kontur
  let hr=0,hg=0,hb=0,hn=0;
  for(let k=0;k<w*h;k++){const q=k*4;if(d[q+3]<128)continue;const r=d[q],gg=d[q+1],b=d[q+2];
    if(r===46&&gg===28&&b===16){typ[k]=3;continue}
    const mx=Math.max(r,gg,b),mn=Math.min(r,gg,b),dl=mx-mn,s=mx?dl/mx:0;let H=0;if(dl){H=mx===r?((gg-b)/dl)%6:mx===gg?(b-r)/dl+2:(r-gg)/dl+4;H*=60;if(H<0)H+=360}
    if(H>=34.5&&H<=60&&s>=.23&&mx>=140&&k/w<haarBis){typ[k]=2;hr+=r;hg+=gg;hb+=b;hn++}else typ[k]=1}
  // Aufräumen 1: kleine Haar-Inseln (Hautlichter mit Haar-Farbton) gehören zum Körper – sonst entstehen beim Bewegen Löcher
  {const lab=new Int32Array(w*h).fill(-1);for(let s0=0;s0<w*h;s0++){if(typ[s0]!==2||lab[s0]>=0)continue;const comp=[s0],st=[s0];lab[s0]=s0;
    while(st.length){const k=st.pop(),x=k%w,y=(k-x)/w;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const X=x+dx,Y=y+dy;if(X<0||Y<0||X>=w||Y>=h)continue;const j=Y*w+X;if(typ[j]===2&&lab[j]<0){lab[j]=s0;st.push(j);comp.push(j)}}}
    if(comp.length<250)comp.forEach(k=>typ[k]=1)}}
  // Aufräumen 2: Haarpixel, die links UND rechts UND oben UND unten (≤ 5 px) Körper haben, liegen im Körper → Körper
  {const istK=(x,y)=>x>=0&&y>=0&&x<w&&y<h&&typ[y*w+x]===1,neu=[];
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){if(typ[y*w+x]!==2)continue;let l=0,r=0,o=0,u=0;
      for(let i=1;i<=5;i++){l|=istK(x-i,y);r|=istK(x+i,y);o|=istK(x,y-i);u|=istK(x,y+i)}if(l&&r&&o&&u)neu.push(y*w+x)}
    neu.forEach(k=>typ[k]=1)}
  hr=hg=hb=hn=0;const toene=[];for(let k=0;k<w*h;k++)if(typ[k]===2){const q=k*4;hr+=d[q];hg+=d[q+1];hb+=d[q+2];hn++;toene.push([d[q],d[q+1],d[q+2]])}
  // Kontur: gehört zum Haar, wenn in 2 px Haar liegt und kein Körper
  const t2=typ.slice();for(let y=0;y<h;y++)for(let x=0;x<w;x++){const k=y*w+x;if(typ[k]!==3)continue;let haar=0,koerper=0;
    for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++){const X=x+dx,Y=y+dy;if(X<0||Y<0||X>=w||Y>=h)continue;const t=typ[Y*w+X];if(t===2)haar=1;else if(t===1)koerper=1}
    t2[k]=haar&&!koerper?2:1}
  const lay=want=>{const o=document.createElement('canvas');o.width=w;o.height=h;const og=o.getContext('2d'),oi=og.createImageData(w,h);
    for(let k=0;k<w*h;k++)if(t2[k]===want){const q=k*4;oi.data[q]=d[q];oi.data[q+1]=d[q+1];oi.data[q+2]=d[q+2];oi.data[q+3]=255}og.putImageData(oi,0,0);return o};
  // Kopf (Gesicht) über dem Hals: für die Rückansicht mit Hinterkopf übermalen
  let x0=w,x1=0,y0=h,y1=0;const hals=h*zonen.hals;for(let y=0;y<hals;y++)for(let x=0;x<w;x++)if(t2[y*w+x]===1&&typ[y*w+x]===1){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y)}
  // Rückansicht: Haarvorhang aus Locken in den echten Haarfarben des Bildes (4 Töne), unten gewellte Spitzen
  const haarFarbe=hn?[hr/hn|0,hg/hn|0,hb/hn|0]:[216,192,138],rk=document.createElement('canvas');rk.width=w;rk.height=h;
  {const lum=c=>.299*c[0]+.587*c[1]+.114*c[2];toene.sort((p,q)=>lum(p)-lum(q));
    const ton=p=>toene.length?toene[Math.min(toene.length-1,Math.floor(p*toene.length))]:haarFarbe,T=[ton(.08),ton(.35),ton(.62),ton(.9)];
    const rg=rk.getContext('2d'),ri=rg.createImageData(w,h),rd=ri.data,L=new Int16Array(h).fill(-1),R=new Int16Array(h).fill(-1),bis=Math.round(h*zonen.haar);
    for(let y=0;y<bis;y++)for(let x=0;x<w;x++)if(t2[y*w+x]===2){if(L[y]<0)L[y]=x;R[y]=x}
    const med=(A,y)=>{const v=[];for(let i=-6;i<=6;i++){const k=y+i;if(k>=0&&k<bis&&A[k]>=0)v.push(A[k])}if(!v.length)return-1;v.sort((p,q)=>p-q);return v[v.length>>1]};
    const L2=new Int16Array(h).fill(-1),R2=new Int16Array(h).fill(-1);for(let y=0;y<bis;y++){L2[y]=med(L,y);R2[y]=med(R,y)}
    let breit=0;for(let y=0;y<bis;y++)if(L2[y]>=0)breit=Math.max(breit,R2[y]-L2[y]);
    let ende=0;for(let y=0;y<bis;y++)if(L2[y]>=0&&R2[y]-L2[y]>=breit*.55)ende=y;ende=Math.min(ende,Math.round(h*(zonen.huefte+.03)));
    for(let y=ende+1;y<ende+14&&y<h;y++){L2[y]=L2[ende];R2[y]=R2[ende]}   // Platz für die Spitzen
    const px=(x,y,c)=>{const q=(y*w+x)*4;rd[q]=c[0];rd[q+1]=c[1];rd[q+2]=c[2];rd[q+3]=255},K=[46,28,16];
    const drin=(x,y)=>{if(y<0||y>=h||L2[y]<0||x<L2[y]||x>R2[y])return false;const cx=(L2[y]+R2[y])/2,u=(x-cx+Math.sin(y*.03+x*.01)*6)/15,i=Math.floor(u),f=u-i;
      const spitze=ende+5+Math.round(6*Math.sin(i*2.3+1));return y<=spitze+Math.round(8*(1-(2*f-1)**2))};
    for(let y=0;y<h;y++){if(L2[y]<0)continue;for(let x=L2[y];x<=R2[y];x++){if(!drin(x,y))continue;
      if(!drin(x-1,y)||!drin(x+1,y)||!drin(x,y+1)||!drin(x,y-1)||!drin(x-2,y)||!drin(x+2,y)||!drin(x,y+2)){px(x,y,K);continue}   // Kontur 2 px
      const cx=(L2[y]+R2[y])/2,u=(x-cx+Math.sin(y*.03+x*.01)*6)/15,f=u-Math.floor(u);
      let t=f<.07?0:f<.22||f>.86?1:f>.38&&f<.62?3:2;if(Math.min(x-L2[y],R2[y]-x)<6||y>ende-4)t=Math.max(0,t-1);   // Locke: dunkle Kante, helle Mitte; außen und unten etwas dunkler
      px(x,y,T[t])}}
    rg.putImageData(ri,0,0)}
  let brustCv=null;if(brust){const[bx,by,bw,bh]=brust.box;brustCv=document.createElement('canvas');brustCv.width=bw;brustCv.height=bh;const bg=brustCv.getContext('2d'),bi=bg.createImageData(bw,bh);
    for(let y=0;y<bh;y++)for(let x=0;x<bw;x++){const k=(by+y)*w+bx+x;if(t2[k]!==1)continue;const q=k*4,o=(y*bw+x)*4;bi.data[o]=d[q];bi.data[o+1]=d[q+1];bi.data[o+2]=d[q+2];bi.data[o+3]=255}bg.putImageData(bi,0,0)}
  return img._naRig={w,h,koerper:lay(1),haar:lay(2),ruecken:rk,brustCv,brust,haarFarbe:`rgb(${haarFarbe.join(',')})`,kopf:x1>x0?{x0,x1,y0,y1}:null}}

// ---------- Weiche Stützstellen-Kurve (Kosinus zwischen den Knoten) ----------
const naKurve=(knoten,y)=>{if(y<=knoten[0][0])return knoten[0][1];for(let i=1;i<knoten.length;i++){const[a,va]=knoten[i-1],[b,vb]=knoten[i];
  if(y<=b){const p=(y-a)/(b-a),e=(1-Math.cos(p*Math.PI))/2;return va+(vb-va)*e}}return knoten[knoten.length-1][1]};

// ---------- Eine Schicht in Zeilenstreifen zeichnen (Ursprung: unten Mitte) ----------
function naStreifen(x,src,w,h,dxF,dyF,sxF){const S=2;for(let y=0;y<h;y+=S){const n=Math.min(S,h-y),a=y+dyF(y),b=y+n+dyF(y+n),sx=sxF?sxF(y):1;
  x.drawImage(src,0,y,w,n,Math.round(-w/2*sx+dxF(y)),Math.round(a-h),Math.round(w*sx),Math.max(1,Math.round(b-h)-Math.round(a-h)))}}   // lückenlos aneinander

// ---------- Tänzerin zeichnen (in den Zwischenpuffer, dann mit Richtung/Schatten auf die Bühne) ----------
const NA_PUF=document.createElement('canvas');NA_PUF.width=420;NA_PUF.height=560;
function naZeichne(x,rig,z,st,theta){const p=NA_PUF.getContext('2d'),{w,h}=rig,Y=k=>h*k;
  p.setTransform(1,0,0,1,0,0);p.clearRect(0,0,NA_PUF.width,NA_PUF.height);p.imageSmoothingEnabled=false;p.translate(NA_PUF.width/2,NA_PUF.height-14);
  const c=Math.cos(theta),hinten=c<0;
  // Zeilen-Verschiebungen (Sprite-Pixel)
  const knX=[[0,st.kopf],[Y(z.hals),st.kopf*.6+st.brust*.4],[Y(z.brust),st.brust],[Y(z.taille),(st.brust+st.huefte)/2],[Y(z.huefte),st.huefte],[Y(z.knie),st.huefte*.3],[h,0]];
  const bell=y=>Math.exp(-(((y-Y(z.brust))/(h*.045))**2));
  const dxK=y=>naKurve(knX,y)+st.jigX*bell(y);
  const dyK=y=>{const bein=Math.max(0,Math.min(1,(h-y)/(h-Y(z.huefte))));return st.wipp*bein+st.jigY*bell(y)};
  const wH=y=>Math.max(0,Math.min(1,(y-Y(z.hals)+h*.04)/(Y(z.haar)-Y(z.hals))));
  const dxH=y=>st.kopf+wH(y)*st.haar,sxH=y=>1+wH(y)*st.faecher,dyH=y=>st.wipp*.95+wH(y)*st.haarY;
  if(!hinten){naStreifen(p,rig.haar,w,h,y=>st.kopf,y=>st.wipp*.95);naStreifen(p,rig.haar,w,h,dxH,dyH,sxH);naStreifen(p,rig.koerper,w,h,dxK,dyK);   // Haare: fester Grund + nachschwingende Lage
    if(rig.brustCv){const[bx,by,bw,bh]=rig.brust.box,[ax,ay]=rig.brust.anker,[sx,sy]=rig.brust.s;   // größere Brust (Standard-Outfit), wippt mit
      p.drawImage(rig.brustCv,Math.round(-w/2+ax+dxK(ay)+(bx-ax)*sx),Math.round(-h+ay+dyK(ay)+(by-ay)*sy+st.jigY*.7),Math.round(bw*sx),Math.round(bh*sy))}}
  else{p.filter='brightness(.72) saturate(.9)';naStreifen(p,rig.koerper,w,h,dxK,dyK);p.filter='none';
    naStreifen(p,rig.haar,w,h,dxH,dyH,sxH);naStreifen(p,rig.ruecken,w,h,dxH,dyH,sxH)}   // Haarspitzen, darüber der Haarvorhang (verdeckt Gesicht und Rücken)
  // Schatten zur abgewandten Seite (nur auf der Figur)
  const s=Math.sin(theta),a=Math.min(.42,Math.abs(s)*.42);if(a>.01){p.setTransform(1,0,0,1,0,0);p.globalCompositeOperation='source-atop';
    const gr=p.createLinearGradient(0,0,NA_PUF.width,0),dunkel=`rgba(25,4,18,${a})`,klar='rgba(25,4,18,0)';
    if(s>0){gr.addColorStop(0,klar);gr.addColorStop(.62,klar);gr.addColorStop(1,dunkel)}else{gr.addColorStop(0,dunkel);gr.addColorStop(.38,klar);gr.addColorStop(1,klar)}
    p.fillStyle=gr;p.fillRect(0,0,NA_PUF.width,NA_PUF.height);p.globalCompositeOperation='source-over'}
  // auf die Bühne: Breite folgt |cos θ| (Pseudo-3D), Rückseite gespiegelt
  const brt=(.35+.65*Math.abs(c))*(hinten?-1:1);
  x.save();x.scale(brt,1);x.imageSmoothingEnabled=false;x.drawImage(NA_PUF,-NA_PUF.width/2,-(NA_PUF.height-14));x.restore()}

// ---------- Die Szene ----------
async function nastjaShow(skin,enthuellen){const SK=NA_SKINS[skin]||NA_SKINS.standard,VON=cur||'buehne',VPOS=cur?[P.x,P.y]:[260,486];
  changing=true;fade.style.opacity=1;await new Promise(r=>setTimeout(r,450));S0=SCN.lounge;s=S0.seed;
  if(!cache.lounge){S0.paint();const k=document.createElement('canvas');k.width=W;k.height=H;k.getContext('2d').drawImage(cv,0,0);cache.lounge=k}
  const cv3=document.createElement('canvas');cv3.id='cut';cv3.width=W;cv3.height=H;cv3.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:15;cursor:crosshair';$('#game').appendChild(cv3);fade.style.opacity=0;
  const x=cv3.getContext('2d'),said=new Set(),BEAT=.6,OFF=enthuellen?3.6:0,ENDE=OFF+25;
  const ease=(a,b,p)=>a+(b-a)*(p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2),seg=(t,a,b)=>Math.max(0,Math.min(1,(t-a)/(b-a)));
  const glow=(X,Y,r,c,a)=>{const g=x.createRadialGradient(X,Y,0,X,Y,r);g.addColorStop(0,`rgba(${c},${a})`);g.addColorStop(1,`rgba(${c},0)`);x.fillStyle=g;x.fillRect(X-r,Y-r,r*2,r*2)};
  // Zustand der Physik (Sprite-Pixel)
  const ph={jy:0,vy:0,jx:0,vx:0,hx:0,hv:0,hy:0,hyv:0,wippV:0,wippA:0,huefV:0,theta:0,thetaZiel:0,maus:0,vibe:40,pop:[],kopfPuffer:[],
    pauseSum:0,pauseBis:0,zoom:1,zoomZiel:1,zoomBis:0,torso:null,risiko:null,handT:0,handZiel:null,erfolg:false,tempoDa:0,riskBis:0,winkN:0,twerk:null,twerkPause:0,
    zin:{sicht:false,ab:0,naechste:6+Math.random()*5,auftritt:-9}};cv3._ph=ph;   // Zustand für automatische Tests
  let fin=false,T0=performance.now(),tAlt=0,mausWinkel=null,mausKreis=0,letzterSchlag=-1;
  // ---- Eingabe: Takt (Leertaste/Klick) und Maus-Kreisen ----
  const schlag=()=>{const t=(performance.now()-T0)/1000-OFF-ph.pauseSum;if(t<0||fin)return;const ph0=t/BEAT,abw=Math.abs(ph0-Math.round(ph0))*BEAT,nr=Math.round(ph0);
    if(nr===letzterSchlag)return;   // pro Takt nur ein Treffer
    if(abw<=.2){letzterSchlag=nr;ph.vibe=Math.min(100,ph.vibe+(abw<.09?10:7));ph.pop.push({t,txt:abw<.09?'Perfekt! ♥':'Im Takt ♪',c:'255,215,120'})}
    else{ph.vibe=Math.max(0,ph.vibe-2);ph.pop.push({t,txt:'Daneben …',c:'200,120,140'})}};
  const key=e=>{if(e.key===' '){e.preventDefault();if(!e.repeat)schlag()}else if(e.key==='Escape')beenden()};
  const pos=e=>{const r=cv3.getBoundingClientRect();return[(e.clientX-r.left)/r.width*800,(e.clientY-r.top)/r.height*500]};
  cv3.onmousedown=e=>{e.stopPropagation();if(ph.risiko==='wählen')return griff(e);schlag()};
  // ---- Tanzmenü ----
  const jetztT=()=>(performance.now()-T0)/1000;
  const sprich=l=>{if(busy)advance();say(l)};
  const menu=document.createElement('div');menu.id='tanzmenu';$('#game').appendChild(menu);
  function menuBau(){const c=player.cash;
    menu.innerHTML=`<button data-m="tempo" ${ph.tempoDa?'disabled':''}>🧻 Tempos zustecken</button><button data-m="wink">👋 Näher ranbeugen</button>
      ${skin==='dessous'?`<button data-m="twerk" ${ph.twerk||jetztT()<ph.twerkPause?'disabled':''}>💃 Twerken</button>`:''}${c>0?`<button data-m="geld">💸 Geld zustecken <small>${c} ₽</small></button>`:''}`;
    menu.querySelectorAll('button').forEach(b=>{b.onmousedown=e=>{e.preventDefault();e.stopPropagation()};b.onclick=e=>{e.stopPropagation();aktion(b.dataset.m)}})}
  function aktion(m){const t=jetztT(),u=t-OFF-ph.pauseSum;if(t<ph.pauseBis)return;
    if(m==='tempo'&&!ph.tempoDa){ph.tempoDa=1;FL.na_tempo=Math.min(2,(FL.na_tempo||0)+1);ph.vibe=Math.min(100,ph.vibe+8);ph.pop.push({t:u,txt:'+ Frechheit',c:'255,220,160'});
      sprich([['NA','*zieht das zerknüllte Taschentuch aus dem Strumpfband und hält es hoch* Sag mal, du Pleitegeier, hast du komplett die Orientierung verloren? Na gut, für die Frechheit gibt’s einen Punkt.','laugh'],
        ['P','(Ich glaube, das war ein Kompliment. Auf Russisch klingt alles wie eine Drohung.)','smirk']])}
    if(m==='wink'){ph.zoomZiel=Math.min(1.9,ph.zoomZiel+.3);ph.zoomBis=t+6;ph.vibe=Math.min(100,ph.vibe+3);
      if(!ph.winkN++)sprich([['NA','*beugt sich vor* Näher, Zwiebel? Noch näher kostet Aufpreis.','flirt']])}
    if(m==='twerk'&&skin==='dessous'&&!ph.twerk&&t>=ph.twerkPause){ph.twerk={ende:t+TWERK_TAKTE*BEAT};ph.vibe=Math.min(100,ph.vibe+12);
      ph.pop.push({t:u,txt:'Twerk! ♥',c:'255,215,120'});
      sprich([['NA',['*dreht sich um und wirft dir einen Blick über die Schulter zu* Schön im Takt bleiben, Zwiebel.','*dreht sich um* Augen nach vorn, Süßer. Also … nach hinten.','*über die Schulter* Zähl mit. Eins, zwei …'][(ph.twerkN=(ph.twerkN||0)+1)%3],'flirt']])}
    if(m==='risk'&&!ph.risiko&&t>=ph.riskBis){ph.risiko='wählen';cv3.style.cursor='grab';$('#box').style.pointerEvents='none';ph.pop.push({t:u,txt:'✋ Klick auf Kopf, Oberkörper oder Hüfte …',c:'255,200,160'})}
    if(m==='geld'&&player.cash>0){player.cash--;FL.na_tip=Math.min(3,(FL.na_tip||0)+1);ph.vibe=Math.min(100,ph.vibe+15);ph.pop.push({t:u,txt:'+ Rubel ₽',c:'160,255,170'});
      sprich([['NA','*nimmt den Rubel und steckt ihn ins Strumpfband* Na also. Geht doch, Zwiebel. Für Geld tanz ich sogar mit Gefühl.','flirt']])}
    menuBau()}
  // RISKY_CONTACT: Klick in upper_torso_zone
  function griff(e){const[mx,my]=pos(e),b=ph.torso,t=jetztT();cv3.style.cursor='crosshair';
    $('#box').style.pointerEvents='';
    if(Math.cos(ph.theta)<.5){ph.risiko=null;ph.pop.push({t:t-OFF-ph.pauseSum,txt:'Sie dreht dir den Rücken zu …',c:'200,170,190'});menuBau();return}
    const drin=z=>z&&mx>=z.x0&&mx<=z.x1&&my>=z.y0&&my<=z.y1,ok=relOf('Nastja')>GRIFF_SCHWELLE;
    if(drin(ph.zoneOben)||drin(ph.zoneUnten)){ph.risiko=null;ph.riskBis=t+RISK_PAUSE;zoneKlick(drin(ph.zoneOben)?'oben':'unten',ok,t);menuBau();return}
    if(!b||mx<b.x0||mx>b.x1||my<b.y0||my>b.y1){ph.risiko=null;ph.pop.push({t:t-OFF-ph.pauseSum,txt:'… doch nicht. Feigling.',c:'200,170,190'});menuBau();return}
    ph.risiko='hand';ph.riskBis=t+RISK_PAUSE+(relOf('Nastja')>GRIFF_SCHWELLE?2:0);ph.handT=t;ph.handAus=0;$('#box').style.pointerEvents='';
    ph.griffArt=relOf('Nastja')<=GRIFF_SCHWELLE?'nein':ph.zin.sicht?'zin':'ja';
    if(ph.griffArt==='ja')ph.handZiel=[b.x1-(b.x1-b.x0)*.12,b.y1-(b.y1-b.y0)*.08];   // Hand an ihre Taille (Seite zu Petja)
    else{const d=Math.hypot(900-mx,620-my);ph.handZiel=[mx+(900-mx)/d*34,my+(620-my)/d*34]}   // Hand bleibt 34 px vor dem Ziel in der Luft
    menuBau()}
  // Gezeichnete Rücken-Frames mit Wackel-Physik (wie beim Rig, nur auf die Frames übertragen):
  //   Hüfte: gedämpfte Feder 4 Hz, ζ 0,22 – Impuls beim Wechsel in den tiefsten Frame, Gegenimpuls beim Hochkommen.
  //   Haare: Feder 1,8 Hz, ζ 0,3, folgen dem seitlichen Hüftschwung verzögert; die Spitzen schwingen am meisten.
  //   Umsetzung: der Frame wird in 2-px-Zeilen gezeichnet, jede Zeile bekommt ihren eigenen Versatz.
  const TJ_HUEFTE=[.40,.64],TJ_HAAR=.45;   // Zeilenbereiche im Frame (Anteil der Höhe)
  function twerkZeichnen(x,X,Y,mass,dt){const sch=NASTJA_TWERK.schritt(),J=ph.tj||(ph.tj={y:0,vy:0,hx:0,hv:0,alt:sch});
    if(sch!==J.alt){if(sch===2){J.vy+=120;J.hv-=40}else if(J.alt===2){J.vy-=70;J.hv+=25}J.alt=sch}
    {const k=(2*Math.PI*4)**2,c=2*.22*Math.sqrt(k);J.vy+=(-k*J.y-c*J.vy)*dt;J.y=Math.max(-5,Math.min(5,J.y+J.vy*dt))}
    {const ziel=Math.sin(NASTJA_TWERK.phase()*2*Math.PI)*4,k=(2*Math.PI*1.8)**2,c=2*.3*Math.sqrt(k);J.hv+=(k*(ziel-J.hx)-c*J.hv)*dt;J.hx=Math.max(-6,Math.min(6,J.hx+J.hv*dt))}
    const[A,B]=TJ_HUEFTE;
    NASTJA_TWERK.draw(x,X,Y,mass,false,yr=>[yr<TJ_HAAR?J.hx*yr/TJ_HAAR:yr<TJ_HAAR+.06?J.hx*(1-(yr-TJ_HAAR)/.06):0,
      yr>A&&yr<B?J.y*Math.sin(Math.PI*(yr-A)/(B-A)):0])}
  // Kopf- und Hüft-Zone: nur Dialog und Stimmung, kein Arm
  function zoneKlick(zone,ok,t){const u=t-OFF-ph.pauseSum;
    if(zone==='oben'){if(ok){ph.vibe=Math.min(100,ph.vibe+5);ph.hv+=18;ph.pop.push({t:u,txt:'♥',c:'255,215,120'});
        sprich([['NA','*streicht sich die Strähne zurück* Na gut. An die Haare kommst du nicht ran … aber so geht’s. Die Frisur ist heilig, Zwiebel.']])}
      else{ph.pop.push({t:u,txt:'Nö.',c:'255,140,120'});
        sprich([['NA','Finger weg von der Frisur! Die hat zwei Stunden und eine Dose Haarspray gekostet.','laugh']])}}
    else{if(ok){ph.vibe=Math.min(100,ph.vibe+8);ph.vx+=14;ph.pop.push({t:u,txt:'Frech! ♥',c:'255,215,120'});
        sprich([['NA','*zieht eine Augenbraue hoch* Du legst es drauf an, Pjotr. Ich merk mir das.','flirt']])}
      else{ph.vibe=Math.max(0,ph.vibe-10);ph.pauseBis=t+2.2;ph.zin.stopp=t;ph.zin.sicht=false;ph.pop.push({t:u,txt:'Erwischt!',c:'255,110,110'});
        sprich([['Z','*reißt den Vorhang auf* Schluss mit dem Zirkus, ihr zwei! Hände aufs Sofa, Süßer!'],['P','(Herzinfarkt. Fast.)','pain']])}}}
  // Mitte, Beziehung > 70 und Zinaida guckt weg: sie lässt sich näher ziehen
  function griffErfolg(t){const u=t-OFF-ph.pauseSum;playSquishSound();ph.vx+=26;ph.hv+=34;ph.hyv-=10;   // im selben Bild wie das Zusammendrücken
    ph.vibe=Math.min(100,ph.vibe+15);FL.na_mut=Math.min(2,(FL.na_mut||0)+1);
    ph.zoomZiel=2.15;ph.zoomBis=t+3.2;ph.pop.push({t:u,txt:'Mutig! ♥♥',c:'255,215,120'});
    sprich([['NA','Oh … du bist ja ein ganz Frecher.','flirt'],['NA','*lässt sich von dir an der Taille ein Stück näher ziehen* Mutig, Zwiebel. Dir lass ich das durchgehen. Einmal. Hände bleiben, wo ich sie sehe.','flirt'],
      ['P','(Sie riecht nach Vanille und Haarspray. Ich darf jetzt nie wieder blinzeln.)']])}
  // Stimmung ≥ 70, aber Zinaida guckt: sie geht dazwischen
  function griffZinaida(t){const u=t-OFF-ph.pauseSum;ph.vibe=Math.max(0,ph.vibe-15);ph.pauseBis=t+2.2;ph.zin.stopp=t;ph.zin.sicht=false;
    ph.pop.push({t:u,txt:'Erwischt!',c:'255,110,110'});
    sprich([['Z','*reißt den Vorhang auf* STOPP! Hände aufs Sofa, Süßer! In meinem Haus wird geguckt, nicht gegrapscht!'],
      ['NA','*verdreht die Augen* Danke, Mamotschka. Wir hatten’s gerade so gemütlich.','laugh'],['P','(Herzinfarkt. Fast.)','pain']])}
  // Nastjas Konter: Hand wegschlagen, Stimmung runter, Zinaida grinst
  function griffAusgang(t){const u=t-OFF-ph.pauseSum;ph.vibe=Math.max(0,ph.vibe-10);ph.zin.grinst=t;ph.zin.sicht=false;
    ph.pop.push({t:u,txt:'*KLATSCH*',c:'255,140,120'});
    sprich([['NA','*schlägt deine Hand genervt zur Seite* Pfoten weg, du Pleitegeier!','laugh'],['NA','Schaufelhände weg, Zwiebel. Gucken ja, Baustelle nein.'],
      ['P','(Meine Hand pocht. Mein Stolz auch.)','pain']])}
  menuBau();
  cv3.onmousemove=e=>{const[mx,my]=pos(e),a=Math.atan2(my-250,mx-400);if(Math.hypot(mx-400,my-250)<40){mausWinkel=null;return}
    if(mausWinkel!==null){let d=a-mausWinkel;if(d>Math.PI)d-=2*Math.PI;if(d<-Math.PI)d+=2*Math.PI;if(Math.abs(d)<.6){ph.maus+=d;mausKreis+=Math.abs(d);
      if(mausKreis>2*Math.PI){mausKreis-=2*Math.PI;ph.vibe=Math.min(100,ph.vibe+6);ph.pop.push({t:(performance.now()-T0)/1000-OFF,txt:'Dreh dich! ✦',c:'255,180,230'})}}}
    mausWinkel=a};
  addEventListener('keydown',key,true);
  // Petjas Augenlider (für das Umziehen): k = 0 offen … 1 zu
  function lider(k,t){if(k<=0)return;x.fillStyle=k>=1?`rgb(${26+Math.sin(t*2)*6|0},4,8)`:'#120206';if(k>=1){x.fillRect(-10,-10,820,520);return}
    const hh=(1-k)*290,f=.35+.65*(1-k)*(1-k),M=215,side=hh*f,ctl=2*hh-side;
    x.beginPath();x.moveTo(-10,-10);x.lineTo(810,-10);x.lineTo(810,M-side);x.quadraticCurveTo(400,M-ctl,-10,M-side);x.fill();
    x.beginPath();x.moveTo(-10,510);x.lineTo(810,510);x.lineTo(810,M+side);x.quadraticCurveTo(400,M+ctl,-10,M+side);x.fill()}
  // Sofa-Rand im Vordergrund (Ich-Sicht)
  function sofa(){x.fillStyle='#3b1626';x.beginPath();x.moveTo(-10,510);x.lineTo(-10,392);x.quadraticCurveTo(70,372,118,430);x.lineTo(150,510);x.fill();
    x.beginPath();x.moveTo(810,510);x.lineTo(810,392);x.quadraticCurveTo(730,372,682,430);x.lineTo(650,510);x.fill();
    x.strokeStyle='rgba(255,170,200,.25)';x.lineWidth=3;x.beginPath();x.moveTo(-10,394);x.quadraticCurveTo(70,374,116,430);x.stroke();x.beginPath();x.moveTo(810,394);x.quadraticCurveTo(730,374,684,430);x.stroke();
    x.fillStyle='rgba(255,210,150,.5)';for(let i=0;i<5;i++){x.beginPath();x.arc(14+i*24,420+i*14,2.2,0,7);x.fill();x.beginPath();x.arc(786-i*24,420+i*14,2.2,0,7);x.fill()}}
  // Vibe-Meter (rechts) mit Taktpuls
  function meter(t,u){const v=ph.vibe/100,X=748,Y0=96,Hm=300,puls=Math.max(0,1-((u%BEAT+BEAT)%BEAT)/BEAT*3);
    x.fillStyle='rgba(15,2,10,.6)';x.fillRect(X-30,Y0-30,60,Hm+60);x.strokeStyle='rgba(255,190,220,.6)';x.lineWidth=1.5;x.strokeRect(X-9,Y0,18,Hm);
    const g=x.createLinearGradient(0,Y0+Hm,0,Y0);g.addColorStop(0,'#6a1b4d');g.addColorStop(.5,'#d0407a');g.addColorStop(1,'#ffd27a');x.fillStyle=g;x.fillRect(X-8,Y0+Hm*(1-v),16,Hm*v);
    x.fillStyle=`rgba(255,${200+puls*55|0},${220-puls*80|0},${.55+.45*puls})`;x.font='bold 11px Georgia';x.textAlign='center';x.font='bold 9px Georgia';x.fillText('STIMMUNG',X,Y0-12);
    x.font=`${18+puls*6}px Georgia`;x.fillText('♥',X,Y0+Hm+24);x.textAlign='left';
    if(u<0)return;
    // Taktring: schrumpft auf den Kreis zu – genau wenn er ihn berührt, drücken
    {const ph0=((u%BEAT)+BEAT)%BEAT/BEAT,r=12+28*(1-ph0),CX=400,CY=470,treff=ph0>.75||ph0<.12;
      x.strokeStyle='rgba(255,230,240,.85)';x.lineWidth=2.5;x.beginPath();x.arc(CX,CY,12,0,7);x.stroke();
      x.strokeStyle=treff?'rgba(255,215,120,.95)':'rgba(255,150,200,.6)';x.lineWidth=3;x.beginPath();x.arc(CX,CY,r,0,7);x.stroke();
      if(ph0<.12){x.fillStyle=`rgba(255,215,120,${.8*(1-ph0/.12)})`;x.beginPath();x.arc(CX,CY,11,0,7);x.fill()}
      x.fillStyle='rgba(255,230,240,.8)';x.font='11px Georgia';x.textAlign='center';x.fillText('Leertaste',CX,CY+30);x.textAlign='left'}
    for(const q of ph.pop){const a=u-q.t;if(a>1.1)continue;x.fillStyle=`rgba(${q.c},${1-a/1.1})`;x.font='bold 15px Georgia';x.textAlign='right';x.fillText(q.txt,X-22,Y0+Hm*(1-v)-a*40);x.textAlign='left'}
    ph.pop=ph.pop.filter(q=>u-q.t<1.2)}
  const TEXT=NA_SHOW_TEXT[skin]||{};
  function frame(){if(fin)return;const jetzt=(performance.now()-T0)/1000,dt=Math.min(1/30,Math.max(1/240,jetzt-tAlt));tAlt=jetzt;const t=jetzt;
    if(t<ph.pauseBis)ph.pauseSum+=dt;const u=t-OFF-ph.pauseSum;   // Zinaida unterbricht: Choreografie steht still
    // Zinaida linst ab und zu hinter dem Vorhang hervor
    {const Z=ph.zin;if(!Z.sicht&&u>2&&u<21&&u>=Z.naechste&&t>ph.pauseBis){Z.sicht=true;Z.ab=t}
      if(Z.sicht&&t-Z.ab>2.6){Z.sicht=false;Z.naechste=u+7+Math.random()*6}}
    if(ph.riskBis&&t>=ph.riskBis&&!ph.risiko){ph.riskBis=0;menuBau()}
    if(ph.risiko==='hand'&&!ph.handAus){const a=t-ph.handT;
      if(ph.griffArt==='ja'&&a>=GRIFF_T.heran){ph.handAus=1;griffErfolg(t)}else if(ph.griffArt==='zin'&&a>=.42){ph.handAus=1;griffZinaida(t)}else if(ph.griffArt==='nein'&&a>=.52){ph.handAus=1;griffAusgang(t)}}
    if(ph.risiko==='hand'&&t-ph.handT>(ph.griffArt==='ja'?GRIFF_T.weg:1.4)){ph.risiko=null;ph.handAus=0;menuBau()}
    if(t>ph.zoomBis)ph.zoomZiel=1;ph.zoom+=(ph.zoomZiel-ph.zoom)*Math.min(1,dt*3);
    menu.style.display=u>1.5&&u<21&&t>=ph.pauseBis&&!fin?'flex':'none';
    for(const k in TEXT)if(u>=+k&&!said.has(k)){said.add(k);if(busy)advance();say(TEXT[k])}
    if(enthuellen&&!said.has('zu')&&t>=.3){said.add('zu');if(busy)advance();say(NA_SHOW_ZU[skin]||NA_SHOW_ZU.vip)}
    if(u>=ENDE-OFF)return beenden();
    // ---- Choreografie → Ziel-Winkel, Ort, Größe ----
    const vib=ph.vibe/100,inten=.6+.65*vib,frei=u>=10.5&&u<17;
    let px=400,py=520,sc=1.5,sit=false;
    if(u<2&&!enthuellen)px=ease(-80,400,seg(u,0,2));   // reinlaufen (nach dem Umziehen steht sie schon da)
    if(u<8)ph.thetaZiel=Math.sin(Math.max(0,u-2)*.8)*.55;                       // kokett hin und her (±30°)
    else if(u<10.5)ph.thetaZiel=ease(0,2*Math.PI,seg(u,8,10.5));                 // langsame 360°-Drehung
    else if(frei)ph.thetaZiel=2*Math.PI+ph.maus;                               // Spieler dreht mit der Maus
    else if(u<19.5)ph.thetaZiel=ease(ph.thetaZiel,Math.round((ph.thetaZiel-Math.PI)/(2*Math.PI))*2*Math.PI+Math.PI,seg(u,17,17.6));   // Rücken zeigen
    else if(u<21)ph.thetaZiel=ease(ph.thetaZiel,Math.round(ph.thetaZiel/(2*Math.PI))*2*Math.PI,seg(u,19.5,20.2));                    // wieder nach vorn
    if(ph.twerk){const T2=2*Math.PI;
      if(t<ph.twerk.ende)ph.thetaZiel=Math.round((ph.theta-Math.PI)/T2)*T2+Math.PI;   // Rücken zum Sofa
      else if(t<ph.twerk.ende+.6)ph.thetaZiel=Math.round(ph.theta/T2)*T2;             // wieder nach vorn
      else{ph.twerk=null;ph.twerkPause=t+TWERK_PAUSE;menuBau()}}
    if(!ph.twerk&&ph.twerkPause&&t>=ph.twerkPause){ph.twerkPause=0;menuBau()}
    if(!frei)ph.maus*=Math.pow(.2,dt);
    const thAlt=ph.theta;ph.theta+=(ph.thetaZiel-ph.theta)*Math.min(1,dt*(frei?5:7));const omega=(ph.theta-thAlt)/dt;
    if(u>=21){const a=seg(u,21,22.6),b=seg(u,23.4,24.6);sit=a>.85;sc=b>0?ease(2.6,3.1,b):ease(1.5,2.6,a);py=b>0?ease(780,900,b):ease(520,780,a)}
    // ---- Bewegungs-Wellen (Sinus/Kosinus, im Takt) ----
    const w=2*Math.PI/(BEAT*2),wippZiel=(1-Math.cos(2*w*u))/2*5*inten*(u<2?.4:1)+(sit?Math.abs(Math.sin(u*4.2))*4:0);
    const huefte=Math.sin(w*u)*9*inten,brust=-huefte*.45+Math.sin(w*u+.6)*2.5*inten,kopf=brust*.8+Math.sin(w*u+1.2)*2*inten;
    // Beschleunigungen für die Federn
    const wippV=(wippZiel-(ph.wipp||0))/dt,wippA=(wippV-ph.wippV)/dt;ph.wippV=wippV;ph.wipp=wippZiel;
    const huefV=(huefte-(ph.huef||0))/dt,huefA=(huefV-ph.huefV)/dt;ph.huefV=huefV;ph.huef=huefte;
    // Brust: gedämpfte Feder, 3 Hz, ζ 0,2
    {const k=(2*Math.PI*3)**2,c=2*.2*Math.sqrt(k);ph.vy+=(-k*ph.jy-c*ph.vy-wippA*2.2)*dt;ph.jy+=ph.vy*dt;ph.jy=Math.max(-3.5,Math.min(3.5,ph.jy));
      ph.vx+=(-k*ph.jx-c*ph.vx-huefA*1.0)*dt;ph.jx+=ph.vx*dt;ph.jx=Math.max(-2,Math.min(2,ph.jx))}
    // Haare: hängen dem Kopf 0,15 s hinterher, Feder 1,8 Hz, ζ 0,35; Drehung schleudert sie raus
    const kopfWelt=px/sc+kopf;ph.kopfPuffer.push([t,kopfWelt]);while(ph.kopfPuffer.length>2&&ph.kopfPuffer[1][0]<=t-.15)ph.kopfPuffer.shift();
    {const alt=ph.kopfPuffer[0][1],ziel=Math.max(-7,Math.min(7,(alt-kopfWelt)*1.2-omega*1.2)),k=(2*Math.PI*1.8)**2,c=2*.35*Math.sqrt(k);
      ph.hv+=(k*(ziel-ph.hx)-c*ph.hv)*dt;ph.hx+=ph.hv*dt;ph.hyv+=(-k*ph.hy-c*ph.hyv-wippA*.5)*dt;ph.hy+=ph.hyv*dt;ph.hy=Math.max(-4,Math.min(4,ph.hy))}
    // Vibe zerfällt langsam
    if(u>0)ph.vibe=Math.max(0,ph.vibe-dt*1.5);
    // ---- Bild ----
    x.setTransform(1,0,0,1,0,0);x.filter='blur('+(1.5*SC)+'px)';x.save();x.translate(W/2,H/2);x.scale(1.5,1.5);x.translate(-W/2,-H*.45);x.drawImage(cache.lounge,0,0);x.restore();x.filter='none';
    x.setTransform(SC,0,0,SC,0,0);
    glow(400,300,300,'255,60,140',.12+.18*vib*(.6+.4*Math.sin(u*w*2)));   // Clublicht pulsiert mit dem Vibe
    if(ph.zin.sicht&&ZIN_IMG.complete&&ZIN_IMG.naturalWidth){const a=Math.max(0,Math.min(1,(t-ph.zin.ab)/.4,(ph.zin.ab+2.6-t)/.4)),zs=.42;x.save();x.globalAlpha=a;
      x.filter='brightness(.7)';x.drawImage(ZIN_IMG,-ZIN_IMG.naturalWidth*zs*.55+a*70,470-500*zs,ZIN_IMG.naturalWidth*zs,500*zs);x.filter='none';
      x.fillStyle='rgba(255,220,120,.9)';x.font='bold 16px Georgia';x.fillText('👁',30+a*70,455-500*zs);x.restore()}   // Aufpasserin am Rand
    if(sit){sofa();fpKnees(x)}
    const idx=((Math.round(ph.theta/(Math.PI/4))%8)+8)%8,eigen=idx&&SK.dirs[idx];
    let bild=eigen||SK.bild();if(enthuellen&&SK.zu&&u>-.6&&u<1.4)bild=SK.zu()||bild;   // VIP: erst noch Augen zu, dann Zwinkern
    const rig=naRig(bild,SK.zonen,eigen?null:SK.brust);
    const fy=py-266*sc*(1-SK.zonen.brust),zm=ph.zoom;   // Kamera-Zoom auf den Oberkörper
    if(rig){const w0=rig.w*266/rig.h*sc,hh=266*sc,P2=(sx,sy)=>[px+sx*w0*zm,fy+(py-hh+sy*hh-fy)*zm],[ax0,ay0]=P2(-.17,SK.zonen.hals),[ax1,ay1]=P2(.17,SK.zonen.taille);
      ph.torso={x0:Math.min(ax0,ax1),x1:Math.max(ax0,ax1),y0:ay0,y1:ay1};
      const[kx0,ky0]=P2(-.2,.01),[kx1]=P2(.2,.01),[ux0,uy1]=P2(-.21,SK.zonen.huefte+.03),[ux1]=P2(.21,SK.zonen.huefte);
      ph.zoneOben={x0:Math.min(kx0,kx1),x1:Math.max(kx0,kx1),y0:ky0,y1:ay0};ph.zoneUnten={x0:Math.min(ux0,ux1),x1:Math.max(ux0,ux1),y0:ay1,y1:uy1}}   // upper_torso_zone in Bildschirm-Koordinaten (800×500)
    x.save();x.translate(px,fy);x.scale(zm,zm);x.translate(-px,-fy);
    const twerk=skin==='dessous'&&NASTJA_TWERK.ready&&Math.cos(ph.theta)<-.85&&((ph.twerk&&t<ph.twerk.ende)||(u>=17.5&&u<19.4));   // Rücken zum Sofa: gezeichnete Frames statt Rig
    if(twerk){NASTJA_TWERK.sync(u,BEAT);twerkZeichnen(x,px,py,266/500*sc,dt)}
    else if(u>-.9&&rig){x.save();x.translate(px,py+(sit?-2:0));x.rotate(Math.sin(w*u)*.025*inten);const s0=266/rig.h*sc;x.scale(s0,s0);
      const st={kopf,brust,huefte,wipp:ph.wipp,jigX:ph.jx,jigY:ph.jy,haar:ph.hx,haarY:ph.hy,faecher:Math.min(.18,Math.abs(omega)*.04)};
      naZeichne(x,rig,SK.zonen,st,eigen?0:ph.theta);x.restore()}
    x.restore();
    if(!sit){sofa();fpKnees(x)}
    // RISKY_CONTACT: Petjas Arm streckt sich von rechts unten zur Brust, Nastja schlägt ihn weg
    if(ph.risiko==='hand'&&ph.handZiel&&ph.griffArt==='ja'){const a=t-ph.handT,b=ph.torso||{x0:380,x1:430,y0:200,y1:260},hh=b.y1-b.y0;   // Erfolg: Arm fasst die Taille, zieht, lässt los
      const zx=b.x1+(b.x1-b.x0)*.12,zy=b.y1+hh*.22;   // Taille an ihrer Seite, folgt ihr beim Zoom
      const g=griffZustand(a);petjaArm(x,zx+ARM_DIR[0]*g.w,zy+ARM_DIR[1]*g.w,g.dreh,g.druck)}
    if(ph.risiko==='hand'&&ph.handZiel&&ph.griffArt==='zin'){const a=t-ph.handT,[zx,zy]=ph.handZiel;   // Zinaida: Arm zuckt erschrocken zurück
      const w=a<.42?(1-(1-Math.pow(1-a/.42,2)))*430:Math.pow(Math.min(1,(a-.42)/.3),2)*480;petjaArm(x,zx+ARM_DIR[0]*w,zy+ARM_DIR[1]*w+(a>.42?-8*Math.sin(Math.min(1,(a-.42)/.3)*Math.PI):0),0)}
    if(ph.risiko==='hand'&&ph.handZiel&&ph.griffArt==='nein'){const a=t-ph.handT,[zx,zy]=ph.handZiel;
      let hx=zx,hy=zy,dreh=0;
      if(a<.5){const k=1-Math.pow(1-a/.5,2),w=(1-k)*430;hx=zx+ARM_DIR[0]*w+Math.sin(a*19)*3*(1-k);hy=zy+ARM_DIR[1]*w}   // Arm schiebt sich ins Bild
      else{const k=Math.min(1,(a-.5)/.45),w=k*k*480;hx=zx+ARM_DIR[0]*w+38*Math.sin(Math.min(1,k*3)*Math.PI)*(1-k);hy=zy+ARM_DIR[1]*w+12*Math.sin(Math.min(1,k*3)*Math.PI);dreh=.32*Math.sin(Math.min(1,k*2.2)*Math.PI/2)}   // weggeschlagen, zuckt zurück
      petjaArm(x,hx,hy,dreh);
      if(a>.36&&a<.74){const k=a<.52?(a-.36)/.16:1+(a-.52)*1.2,al=a<.52?1:1-(a-.52)/.22;   // Nastjas Hand schnellt von links vor, wischt durch und ist weg
        x.save();x.globalAlpha=Math.max(0,al);naHand(x,zx-150+130*k,zy+40-24*k,.6,'#f2d2b8',true,-1.35);x.restore()}
      if(a>.5&&a<.75){x.save();x.font='bold 30px Georgia';x.textAlign='center';x.lineWidth=5;x.strokeStyle='#000';x.strokeText('*KLATSCH*',zx,zy-30);x.fillStyle='#ffd25a';x.fillText('*KLATSCH*',zx,zy-30);x.restore()}}
    if(t-(ph.zin.stopp||-9)<2.4&&ZIN_IMG.complete&&ZIN_IMG.naturalWidth){const a=t-ph.zin.stopp,k=Math.max(0,Math.min(1,a/.25,(2.4-a)/.35)),zs=.62;
      x.save();x.globalAlpha=k;x.drawImage(ZIN_IMG,-ZIN_IMG.naturalWidth*zs*.7+k*120,500-500*zs*.92,ZIN_IMG.naturalWidth*zs,500*zs);
      x.font='bold 30px Georgia';x.lineWidth=5;x.strokeStyle='#000';x.strokeText('STOPP!',40+k*60,190);x.fillStyle='#ff7a6a';x.fillText('STOPP!',40+k*60,190);x.restore()}
    if(t-(ph.zin.grinst||-9)<2.8&&ZIN_IMG.complete&&ZIN_IMG.naturalWidth){const a=t-ph.zin.grinst,k=Math.max(0,Math.min(1,a/.35,(2.8-a)/.4)),zs=.42;   // Zinaida grinst hämisch am Rand
      x.save();x.globalAlpha=k;x.filter='brightness(.75)';x.drawImage(ZIN_IMG,-ZIN_IMG.naturalWidth*zs*.55+k*70,470-500*zs,ZIN_IMG.naturalWidth*zs,500*zs);x.filter='none';
      x.font='italic 13px Georgia';x.fillStyle='rgba(255,220,150,.95)';x.fillText('*grinst hämisch*',20+k*40,450-500*zs);x.restore()}
    // Glitzer und Noten, mehr bei viel Vibe
    if(u>0){x.save();x.globalCompositeOperation='lighter';const n=4+Math.round(vib*10);for(let j=0;j<n;j++){const p=(u*.4+j/n)%1,X=400+Math.sin(j*7.1)*280,Y=440-p*380;
      x.fillStyle=`rgba(255,235,200,${.8*(1-p)})`;x.save();x.translate(X,Y);x.rotate(t*2+j);x.fillRect(-4,-.8,8,1.6);x.fillRect(-.8,-4,1.6,8);x.restore()}
      for(let j=0;j<4;j++){const p=(u*.25+j/4)%1;x.fillStyle=`rgba(255,180,220,${.6*(1-p)})`;x.font='22px Georgia';x.fillText('♪',120+j*150+Math.sin(t+j)*20,420-p*300)}x.restore()}
    const v=x.createRadialGradient(400,250,150,400,250,520);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(20,0,10,.7)');x.fillStyle=v;x.fillRect(0,0,800,500);
    meter(t,u);
    if(u>0&&u<7){x.fillStyle=`rgba(255,230,240,${Math.min(1,u)*Math.min(1,7-u)*.85})`;x.font='13px Georgia';x.textAlign='center';
      x.fillText('Leertaste / Klick, wenn der Ring den Kreis trifft · Maus im Kreis: sie dreht sich mit · Esc beendet',400,30);x.textAlign='left'}
    if(ph.risiko==='wählen'){x.strokeStyle='rgba(255,200,160,.55)';x.setLineDash([5,4]);const b=ph.torso;if(b)x.strokeRect(b.x0,b.y0,b.x1-b.x0,b.y1-b.y0);x.setLineDash([]);
      x.fillStyle='rgba(255,220,200,.95)';x.font='italic 14px Georgia';x.textAlign='center';x.fillText('✋ Klick auf ihren Oberkörper – auf eigene Gefahr! (daneben klicken = lassen)',400,52);x.textAlign='left'}
    if(frei){x.fillStyle='rgba(255,220,235,.8)';x.font='italic 13px Georgia';x.textAlign='center';x.fillText(`Freier Tanz – kreise mit der Maus! (${NA_RICHTUNG[idx]})`,400,30);x.textAlign='left'}
    // Umziehen: Augen zu → auf
    if(enthuellen){const k=t<.4?seg(t,0,.4):t<OFF-1?1:1-seg(t,OFF-1,OFF-.2);lider(k,t);
      if(k>=1){x.fillStyle='rgba(255,200,220,.55)';x.font='italic 15px Georgia';x.textAlign='center';x.fillText(['*raschel*','*Strapse schnalzen*','*Reißverschluss*'][Math.floor(t*1.3)%3],400,250);x.textAlign='left'}
      if(u>-.2&&u<.8){x.save();x.globalCompositeOperation='lighter';glow(400,280,320,'255,200,230',.5*(1-seg(u,-.2,.8)));x.restore()}}
    requestAnimationFrame(frame)}
  requestAnimationFrame(frame);
  async function beenden(){if(fin)return;fin=true;removeEventListener('keydown',key,true);menu.remove();$('#box').style.pointerEvents='';if(busy)advance();
    const vibe=Math.round(ph.vibe),gut=vibe>=70;if(gut)FL.na_vibe=Math.min(2,(FL.na_vibe||0)+1);
    FL['naSkin_'+skin]=1;FL.lounge=1;if(skin!=='standard')FL.naVip=(FL.naVip||0)+1;
    fade.style.opacity=1;await new Promise(r=>setTimeout(r,500));changing=false;x.setTransform(1,0,0,1,0,0);x.fillStyle='rgba(12,0,6,.72)';x.fillRect(0,0,W,H);
    const schluss=gut?[['P',`*Fünf Minuten später. Stimmung: ${vibe} %*`],['NA','*außer Atem* Du hast den Takt gehalten, Zwiebel. Das schaffen nicht mal Zinaidas Stammgäste.']]
      :[['P',`*Fünf Minuten später. Stimmung: ${vibe} %*`],['NA','*zupft dich am Kragen* Nächstes Mal klatschst du im Takt mit, Süßer. Oder wenigstens in der Nähe vom Takt.']];
    say(schluss.concat(NA_SHOW_ENDE[skin]||[]),()=>{cv3.remove();enter(VON,VPOS)});fade.style.opacity=0}}

// Petjas ausgestreckter Arm aus der Ich-Sicht: Handfläche (PETJA_ARM_ANKER) liegt auf X/Y, Ärmel läuft nach rechts unten aus dem Bild.
// rot dreht um die Handfläche (weggeschlagen = im Uhrzeigersinn). Solange das Bild noch lädt, springt die klobige Hand ein.
const TWERK_TAKTE=6,TWERK_PAUSE=3;   // Twerken: 6 Takte lang, danach 3 s Pause bis zum nächsten Mal
const RISK_PAUSE=4;   // Sekunden, bis „Riskant anfassen“ wieder geht
const GRIFF_SCHWELLE=70;   // über dieser Beziehung lässt Nastja sich anfassen
const ARM_S=.7,ARM_DIR=(()=>{const v=[PETJA_ARM_W-PETJA_ARM_ANKER[0],PETJA_ARM_H*.85-PETJA_ARM_ANKER[1]],l=Math.hypot(...v);return[v[0]/l,v[1]/l]})();
// druck 0 = Hand gespreizt (wie im Bild), 1 = zusammengedrückt. Statt eines zweiten Sprites verformt eine Skalierungs-Matrix nur die Hand:
// sie wird zum Handgelenk hin gestaucht (Finger schließen sich), Unterarm und Ärmel bleiben unverändert.
const ARM_GELENK=[122,74];   // Handgelenk im Arm-Bild (Bildpixel), Grenze Hand | Unterarm
function petjaArm(x,X,Y,rot,druck=0){if(!PETJA_ARM_IMG.complete||!PETJA_ARM_IMG.naturalWidth)return klobigeHand(x,X,Y,-2.3+rot);
  x.save();x.translate(X,Y);x.rotate(rot);x.imageSmoothingEnabled=false;x.scale(ARM_S,ARM_S);x.translate(-PETJA_ARM_ANKER[0],-PETJA_ARM_ANKER[1]);
  if(druck<=0){x.drawImage(PETJA_ARM_IMG,0,0);x.restore();return}
  const[gx,gy]=ARM_GELENK,W=PETJA_ARM_W,H=PETJA_ARM_H;
  x.save();x.beginPath();x.rect(gx,0,W-gx,H);x.clip();x.drawImage(PETJA_ARM_IMG,0,0);x.restore();   // Unterarm + Ärmel
  x.save();x.beginPath();x.rect(0,0,gx+1,H);x.clip();x.translate(gx,gy);x.scale(1-.28*druck,1-.14*druck);x.rotate(.07*druck);x.translate(-gx,-gy);x.drawImage(PETJA_ARM_IMG,0,0);x.restore();   // Hand gestaucht
  x.restore()}
// Zustandsautomat der Erfolgs-Hand: liefert Abstand entlang des Arms (w), Drehung und Druck für den Zeitpunkt a nach dem Klick.
const GRIFF_T={heran:.62,greifen:.74,halten:2.3,loslassen:2.42,weg:3};
function griffZustand(a){const T=GRIFF_T;
  if(a<T.heran){const k=1-Math.pow(1-a/T.heran,2);return{zustand:'heran',w:(1-k)*440,dreh:0,druck:0}}            // gespreizt heran
  if(a<T.greifen){const k=(a-T.heran)/(T.greifen-T.heran);return{zustand:'greifen',w:-4*k,dreh:-.02*k,druck:k}}  // drückt zu
  if(a<T.halten){const k=Math.min(1,(a-T.heran)/.5);return{zustand:'halten',w:-10*Math.sin(k*Math.PI/2)+1.5*Math.sin(a*7),dreh:-.05*k,druck:1}}   // hält und zieht
  if(a<T.loslassen){const k=(a-T.halten)/(T.loslassen-T.halten);return{zustand:'loslassen',w:-10*(1-k),dreh:-.05,druck:1-k}}
  const k=Math.min(1,(a-T.loslassen)/(T.weg-T.loslassen));return{zustand:'weg',w:k*k*470,dreh:-.05*(1-k),druck:0}}
// Squish: synthetischer Frequenz-Sweep 180 → 340 → 120 Hz (Web Audio), hängt an der Geräusch-Lautstärke (MASTER, 14-sound.js)
function playSquishSound(){try{initAudio();if(!AC||!MASTER)return;const t=AC.currentTime,o=AC.createOscillator(),g=AC.createGain(),f=AC.createBiquadFilter();
  o.type='sine';o.frequency.setValueAtTime(180,t);o.frequency.exponentialRampToValueAtTime(340,t+.08);o.frequency.exponentialRampToValueAtTime(120,t+.18);
  f.type='lowpass';f.frequency.value=1200;
  g.gain.setValueAtTime(.01,t);g.gain.linearRampToValueAtTime(.35,t+.04);g.gain.exponentialRampToValueAtTime(.001,t+.2);
  o.connect(f);f.connect(g);g.connect(MASTER);o.start(t);o.stop(t+.2)}catch(e){}}
// Petjas klobige Hand (Ersatz): grobe Pixel-Art (9-px-Blöcke), Ärmel nach oben, Finger nach unten; rot dreht den Ärmel zur Einflugrichtung.
// Sauberer Hautton, nur massiv und unförmig – ein Klotz neben Nastjas feinem Korsett.
const KLOBIG=['...KKKKK...','..KAAAAAK..','..KAAAAAK..','..KAABAAK..','..KAAAAAK..','..KKKKKKK..','..KSSSSSK..','.KSSSSSSDK.','KSHSSSSSSDK','KSHSSSSSSDK','KSSSSSSSSDK',
  'KSSSSSSSSDK','.KSSKSSKSSK','.KSSKSSKSSK','.KSSKSSKSDK','..KKKKKKKK.'];
const KLOBIG_FARBE={K:'#3a2414',S:'#e9b48e',H:'#f6d0b0',D:'#c98e68',A:'#2f8f86',B:'#ecebe2'};
function klobigeHand(x,X,Y,rot){const B=9,w=KLOBIG[0].length*B,h=KLOBIG.length*B;x.save();x.translate(X,Y);x.rotate(rot);x.translate(-w/2,-h+B);
  KLOBIG.forEach((r,j)=>[...r].forEach((c,i)=>{if(c==='.')return;x.fillStyle=KLOBIG_FARBE[c];x.fillRect(i*B,j*B,B+.5,B+.5)}));
  x.fillStyle='rgba(0,0,0,.18)';x.fillRect(w-2*B,6*B,B,9*B);x.restore()}
// Nastjas Hand (oben=true: rote Nägel)
function naHand(x,X,Y,s,farbe,oben,rot){x.save();x.translate(X,Y);if(rot)x.rotate(rot);x.scale(s,oben?-s:s);x.fillStyle=farbe;x.strokeStyle='#2e1c10';x.lineWidth=2.2;
  x.beginPath();x.moveTo(-15,44);x.lineTo(-17,110);x.lineTo(17,110);x.lineTo(15,44);x.fill();x.stroke();   // Unterarm
  x.beginPath();x.ellipse(0,28,21,24,0,0,7);x.fill();x.stroke();
  [[-15,-2,8,30],[-5,-10,8,36],[5,-8,8,34],[14,0,7,28]].forEach(([fx,fy,fw,fh])=>{x.beginPath();if(x.roundRect)x.roundRect(fx-fw/2,fy,fw,fh+10,fw/2);else x.rect(fx-fw/2,fy,fw,fh+10);x.fill();x.stroke();
    if(oben){x.fillStyle='#c0203a';x.fillRect(fx-fw/2+1,fy+1,fw-2,5);x.fillStyle=farbe}});
  x.beginPath();x.ellipse(-21,24,7,14,-.6,0,7);x.fill();x.stroke();   // Daumen
  x.fillStyle='rgba(120,60,40,.25)';x.beginPath();x.ellipse(3,34,12,9,0,0,7);x.fill();x.restore()}
(function(){const css=document.createElement('style');css.textContent=`#tanzmenu{position:absolute;left:1.5%;bottom:3%;z-index:16;display:none;flex-direction:column;gap:6px;pointer-events:none}#tanzmenu button{pointer-events:auto}
#toasts,#crt,#crt i,#box #portrait{pointer-events:none}
#tanzmenu button{font:13px Georgia,serif;color:#f6ead0;background:rgba(40,8,24,.82);border:1px solid rgba(255,190,220,.55);border-radius:6px;padding:6px 10px;text-align:left;cursor:pointer}
#tanzmenu button:hover:not([disabled]){background:rgba(110,20,60,.9)}#tanzmenu button[disabled]{opacity:.4;cursor:default}#tanzmenu small{display:block;font-size:11px;opacity:.75}`;document.head.appendChild(css)})();

// ---------- Texte je Outfit (Zeitpunkt in s nach Tanzbeginn) ----------
const NA_SHOW_ZU={
  vip:[['NA','*haucht* Augen zu, Zwiebel. Ich hab was Neues an. Na ja – weniger Altes.'],['P','*hört Strapse schnalzen* … *SCHLUCK*']],
  dessous:[['NA','Augen zu. Und diesmal wirklich, Süßer. Das hier hat nicht mal Zinaida gesehen.'],['P','(Das war ein Reißverschluss. Das war eindeutig ein Reißverschluss.)']]};
const NA_SHOW_TEXT={
  standard:{.3:[['NA','Hände aufs Sofa, Zwiebel. Ich mach den Rest.']],8:[['NA','Einmal rum … damit du siehst, dass hinten auch was ist.']],
    12:[['NA','Na los, dreh mich. Du hast doch Hände. Benutz sie – an der Maus.']],18.5:[['P','(Die Haare. Die Haare machen mich fertig.)']]},
  vip:{.4:[['NA','*öffnet ein Auge, zieht die Braue hoch* Na? Das Outfit gibt’s nur für Stammkunden. Und für Zwiebeln.']],8:[['NA','Langsam drehen … so. Damit du was zum Erzählen hast.']],
    12:[['NA','Freier Tanz, Süßer. Du führst. Aber wehe, du trittst mir auf die Stiefel.']],21.5:[['P','Ich … äh … meine Hände sind auf dem Sofa. Beide. Glaub ich.']]},
  dessous:{.4:[['NA','*zwinkert* Dreihundert Jahre im Sumpf, und das hier hat mich noch keiner tragen sehen. Fühl dich geehrt.']],8:[['NA','Ganz rum, Zwiebel. Von hinten bin ich übrigens genauso gefährlich.']],
    12:[['NA','Dreh mich. Schneller. … Nicht so schnell, ich hab Absätze an!']],21.5:[['NA','*haucht* Ganz ruhig atmen, Süßer. Wenn du jetzt umkippst, tanz ich trotzdem zu Ende.']]}};
const NA_SHOW_ENDE={
  vip:[['NA','*zwinkert* Das Outfit bleibt unter uns, Zwiebel. Sonst muss ich dich heiraten. Oder umbringen. Je nach Laune.']],
  dessous:[['NA','Wenn du so weitermachst, kriegst du noch was zum Mitnehmen. Was mit Rand. Zum Aufhängen.'],['P','(Ein … Foto? Meint sie ein Foto?)']]};

// ---------- Privattanz im Menü: Outfit nach Beziehung ----------
naTanz=function(){const v=relOf('Nastja'),skin=nastjaSkin(v);
  if(!skin)return say([['P','Nastja … ein Privattanz?'],['NA','Langsam, Zwiebel. Erst redest du mit mir, dann trinkst du mit mir – und dann reden wir übers Tanzen.'],
    ['P','(Sie will mich erst besser kennenlernen. Reden, anstoßen … ab „Freundlich“ tanzt sie vielleicht.)']]);
  const neu=skin!=='standard'&&!FL['naSkin_'+skin];
  const vor=skin==='dessous'?['NA',neu?'Ein Privattanz? Heute nicht im Korsett, Süßer. Heute gibt’s … weniger. Ab in die Kabine.':'Die Kabine ist frei, Zwiebel. Und ich bin’s auch – fast.']
    :skin==='vip'?['NA',neu?'Ein Privattanz? Für dich gibt’s heute was, das nicht mal Zinaida gesehen hat. Ab in die VIP-Kabine, Süßer.':'VIP-Kabine, wie immer? Natürlich wie immer.']
    :['NA',nastjaMax()?'Für dich gibt’s heute die Version, die Zinaida verboten hat, Süßer.':'Für dich, Zwiebel? Freundschaftspreis: umsonst. Erzähl’s keinem, sonst wollen das alle.'];
  say([['P','Nastja … noch ein Privattanz?'],vor],()=>{naPunkte('tanz',30,10);nastjaShow(skin,neu)})};
// Menü-Kopf zeigt sie im Outfit ihrer Stufe
{const nm=nastjaMenu;nastjaMenu=function(){const r=nm.apply(this,arguments),sk=nastjaSkin(),im=document.querySelector('.namenu .nahead img');
  if(im&&sk==='vip')im.src=NASTJA_VIP_URL[0];else if(im&&sk==='dessous')im.src=NASTJA_DES_URL;
  const plus={tanz:'+13',talk:'+8',drink:'+6'};document.querySelectorAll('.namenu [data-a] small').forEach(e=>{const a=e.parentNode.dataset.a;if(plus[a])e.textContent=plus[a]});return r}}
