// ================= Sprite-Streifen: horizontales Sheet, im Takt abgespielt =================
// spriteStrip(src, {w, h, anker, folge, anteile, schlag})
//   w/h      Größe eines Frames im Streifen, anker = Punkt im Frame, der auf X/Y gesetzt wird (z. B. Mitte zwischen den Füßen)
//   folge    Reihenfolge der Frames in einem Takt, z. B. [0,1,2,1] (3 gezeichnete Frames → 4 Schritte, nahtloser Loop)
//   anteile  Anteil jedes Schritts am Takt (Summe 1) – ungleich lange Frames, z. B. der Tiefpunkt länger
//   schlag   welcher Schritt genau auf dem Schlag liegt
// Abspielen: sync(u, beat) hängt die Animation an die Tanzzeit (u in s, beat = Sekunden pro Schlag; ändert sich das Tempo,
// läuft sie mit) – oder tick(dt, beat) für freies Weiterlaufen. draw(x, X, Y, maßstab) zeichnet pixelscharf.
function spriteStrip(src,{w,h,anker=[w/2,h-2],folge,anteile=null,schlag=0}){
  const img=new Image();img.src=src;
  const a=anteile||folge.map(()=>1/folge.length),start=[];let s=0;for(const v of a){start.push(s);s+=v}
  const versatz=start[schlag];let phase=0;
  return{img,
    get ready(){return img.complete&&img.naturalWidth>0},
    tick(dt,beat){phase=(phase+dt/beat)%1},
    sync(u,beat){phase=((u/beat)%1+1)%1},
    schritt(){const p=(phase+versatz)%1;let i=folge.length-1;while(i>0&&start[i]>p)i--;return i},
    frame(){return folge[this.schritt()]},
    draw(x,X,Y,mass=1,spiegeln=false){if(!this.ready)return;const f=this.frame();
      x.save();x.translate(X,Y);if(spiegeln)x.scale(-1,1);x.imageSmoothingEnabled=false;
      x.drawImage(img,f*w,0,w,h,-anker[0]*mass,-anker[1]*mass,w*mass,h*mass);x.restore()}}}

// Nastja von hinten (Dessous-Outfit): aufrecht → Zwischenstufe → tief (auf dem Schlag) → Zwischenstufe
const NASTJA_TWERK=spriteStrip(NASTJA_TWERK_URL,{w:NASTJA_TWERK_W,h:NASTJA_TWERK_H,anker:NASTJA_TWERK_ANKER,
  folge:[0,1,2,1],anteile:[.3,.2,.3,.2],schlag:2});
