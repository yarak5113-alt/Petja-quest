// ================= Sprite-Streifen: horizontales Sheet, im Takt abgespielt =================
// spriteStrip(src, {w, h, anker, folge, anteile, schlag, takte})
//   w/h      Größe eines Frames im Streifen, anker = Punkt im Frame, der auf X/Y gesetzt wird (z. B. Mitte zwischen den Füßen)
//   folge    Reihenfolge der Frames in einem Durchgang, z. B. [0,1,2,1] (3 gezeichnete Frames → 4 Schritte, nahtloser Loop)
//   anteile  Anteil jedes Schritts am Durchgang (Summe 1) – ungleich lange Frames, z. B. der Tiefpunkt länger
//   schlag   welcher Schritt genau auf dem Schlag liegt
//   takte    wie viele Takte ein Durchgang dauert (2 = halb so schnell)
// Laden: das Bild wird erst mit laden() geholt (oder beim ersten draw()), nicht beim Spielstart.
// Abspielen: sync(u, beat) hängt die Animation an die Tanzzeit (u in s, beat = Sekunden pro Schlag; ändert sich das Tempo,
// läuft sie mit) – oder tick(dt, beat) für freies Weiterlaufen.
// draw(x, X, Y, maßstab, spiegeln, versatz, frame): frame erzwingt einen bestimmten Frame (z. B. eine Start-Pose außerhalb der Schleife).
// versatz(yAnteil) → [dx, dy] in Frame-Pixeln verschiebt jede 2-px-Zeile einzeln
// (für Wackel-Physik); ohne versatz wird der Frame in einem Stück gezeichnet.
function spriteStrip(src,{w,h,anker=[w/2,h-2],folge,anteile=null,schlag=0,takte=1}){
  const img=new Image();let geladen=false;const laden=()=>{if(!geladen){geladen=true;img.src=src}};
  const a=anteile||folge.map(()=>1/folge.length),start=[];let s=0;for(const v of a){start.push(s);s+=v}
  const versatz0=start[schlag];let phase=0;
  return{img,takte,laden,
    get ready(){return geladen&&img.complete&&img.naturalWidth>0},
    tick(dt,beat){phase=(phase+dt/(beat*takte))%1},
    sync(u,beat){phase=((u/(beat*takte))%1+1)%1},
    phase(){return(phase+versatz0)%1},
    schritt(){const p=this.phase();let i=folge.length-1;while(i>0&&start[i]>p)i--;return i},
    frame(){return folge[this.schritt()]},
    draw(x,X,Y,mass=1,spiegeln=false,versatz=null,frame=null){if(!this.ready){laden();return}const f=frame??this.frame();
      x.save();x.translate(X,Y);if(spiegeln)x.scale(-1,1);x.imageSmoothingEnabled=false;x.scale(mass,mass);x.translate(-anker[0],-anker[1]);
      if(!versatz)x.drawImage(img,f*w,0,w,h,0,0,w,h);
      else for(let y=0;y<h;y+=2){const n=Math.min(2,h-y),[dx,dy]=versatz(y/h);x.drawImage(img,f*w,y,w,n,Math.round(dx),Math.round(y+dy),w,n+(dy?1:0))}
      x.restore()}}}

// Nastja von hinten (Dessous-Outfit). 49 wählt den Frame selbst (twerkFrame: 0 → 1 → 2 hinein, 2 halten, 1 hinaus) und gibt ihn
// an draw() weiter; folge/takte unten gelten nur, wenn kein Frame erzwungen wird.
const NASTJA_TWERK=spriteStrip(NASTJA_TWERK_URL,{w:NASTJA_TWERK_W,h:NASTJA_TWERK_H,anker:NASTJA_TWERK_ANKER,
  folge:[1,2],anteile:[.5,.5],schlag:1,takte:1});
