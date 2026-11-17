// Dialog-Porträts: schneidet die Köpfe aus pixel/petja.json, pixel/opa.json, pixel/nastja.json und malt die Mimik pixelgenau drauf.
//   node tools/portraets.js
// Schreibt pixel/portraets/<figur>_<mimik>.png (Originalgröße) und js/50-portraets-pixel.js (Data-URLs fürs Spiel).
//   Petja:  neutral · smirk (sarkastisch) · pain (nach dem Fusel)
//   Opa:    neutral · angry (flucht) · drunk (grinst, rote Nase)
//   Nastja: neutral · flirt (zwinkert) · laugh (lacht dich aus)
// Gesichts-Koordinaten unten in FIG sind Sprite-Pixel der 500-px-Figuren.
const fs=require('fs'),path=require('path'),zlib=require('zlib'),root=path.join(__dirname,'..');
const hex=h=>h?[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)):null,INK=[46,28,16];
function laden(name){const o=JSON.parse(fs.readFileSync(path.join(root,'pixel',name+'.json'),'utf8')),W=o.width,H=o.height,px=[];
  o.rows.forEach(r=>{const a=[];for(const m of r.matchAll(/(\D)(\d*)/g))for(let i=0;i<(+m[2]||1);i++)a.push(hex(o.palette[m[1]]));while(a.length<W)a.push(null);px.push(a)});
  while(px.length<H)px.push(new Array(W).fill(null));return{W,H,px}}
// kleines Malwerkzeug auf einem Ausschnitt
function bild(src,[x0,y0,w,h]){const p=[];for(let y=0;y<h;y++){const r=[];for(let x=0;x<w;x++)r.push(src.px[y0+y]&&src.px[y0+y][x0+x]?src.px[y0+y][x0+x].slice():null);p.push(r)}
  const B={w,h,p,x0,y0,
    get:(x,y)=>{x-=x0;y-=y0;return y>=0&&y<h&&x>=0&&x<w?p[y][x]:null},
    set:(x,y,c)=>{x=Math.round(x)-x0;y=Math.round(y)-y0;if(y>=0&&y<h&&x>=0&&x<w)p[y][x]=c.slice(0,3)},
    rect:(x,y,rw,rh,c)=>{for(let j=0;j<rh;j++)for(let i=0;i<rw;i++)B.set(x+i,y+j,c)},
    linie:(xa,ya,xb,yb,c,d=1)=>{const n=Math.max(Math.abs(xb-xa),Math.abs(yb-ya))*2+1;for(let i=0;i<=n;i++){const t=i/n,x=xa+(xb-xa)*t,y=ya+(yb-ya)*t;B.rect(Math.round(x-(d-1)/2),Math.round(y-(d-1)/2),d,d,c)}},
    bogen:(cx,cy,rx,ry,a0,a1,c,d=1)=>{const n=Math.ceil(Math.max(rx,ry)*Math.abs(a1-a0)*2)+2;for(let i=0;i<=n;i++){const a=a0+(a1-a0)*i/n;B.rect(Math.round(cx+Math.cos(a)*rx-(d-1)/2),Math.round(cy+Math.sin(a)*ry-(d-1)/2),d,d,c)}},
    oval:(cx,cy,rx,ry,c)=>{for(let y=Math.floor(cy-ry);y<=cy+ry;y++)for(let x=Math.floor(cx-rx);x<=cx+rx;x++)if(((x-cx)/rx)**2+((y-cy)/ry)**2<=1)B.set(x,y,c)},
    // Fläche mit Haut übermalen: pro Zeile Verlauf zwischen der nächsten hellen Farbe links und rechts (folgt der Schattierung)
    haut:(x,y,rw,rh,fest)=>{const such=(X,Y,d)=>{for(let i=0;i<12;i++){const q=B.get(X+d*i,Y);if(q&&!dunkel(q))return q}return null};let zuletzt=null;
      for(let j=0;j<rh;j++){let l=fest||such(x-1,y+j,-1),r=fest||such(x+rw,y+j,1);l=l||r||zuletzt||[220,180,140];r=r||l;zuletzt=l;
        for(let i=0;i<rw;i++){const soll=misch(l,r,rw>1?i/(rw-1):0),ist=B.get(x+i,y+j);   // nur Linien/Augenweiß übermalen, echte Hautschattierung bleibt
          if(!ist||Math.hypot(ist[0]-soll[0],ist[1]-soll[1],ist[2]-soll[2])>(fest?60:34))B.set(x+i,y+j,soll)}}},
    farbe:(x,y)=>B.get(x,y),
    tönen:(cx,cy,rx,ry,c,a)=>{for(let y=Math.floor(cy-ry);y<=cy+ry;y++)for(let x=Math.floor(cx-rx);x<=cx+rx;x++){const q=B.get(x,y);if(!q||dunkel(q))continue;const d=((x-cx)/rx)**2+((y-cy)/ry)**2;if(d>1)continue;const k=a*(1-d);B.set(x,y,q.map((v,i)=>Math.round(v+(c[i]-v)*k)))}}};
  return B}
const dunkel=c=>.299*c[0]+.587*c[1]+.114*c[2]<70;
const misch=(a,b,t)=>a.map((v,i)=>Math.round(v+(b[i]-v)*t));

// ---------- Figuren: Ausschnitt [x,y,b,h] und Mimik ----------
const FIG={
  petja:{datei:'petja',box:[27,0,86,100],mimik:{
    neutral:B=>{},
    smirk:B=>{   // linke Braue hoch, rechte tief, schiefes Grinsen
      B.haut(56,39,12,6);B.linie(56,41,66,38,INK,1);B.linie(57,41,66,38,INK,1);B.linie(72,44,82,43,INK,1);
      B.haut(60,73,18,5);B.linie(61,76,69,76,INK);B.linie(69,76,74,74,INK);B.linie(74,74,76,72,INK);B.set(76,73,INK)},
    pain:B=>{    // Brauen schräg nach oben innen, Augen zugekniffen, Zickzack-Mund, grün im Gesicht, Schweißtropfen
      B.haut(55,38,30,15);B.linie(57,44,65,40,INK);B.linie(73,40,81,44,INK);
      B.linie(57,48,61,47,INK);B.linie(61,47,65,49,INK);B.linie(73,49,77,47,INK);B.linie(77,47,81,48,INK);
      B.haut(59,72,20,6);[[60,75],[63,73],[66,76],[69,73],[72,76],[75,73],[77,75]].reduce((a,b)=>{B.linie(a[0],a[1],b[0],b[1],INK);return b});
      B.tönen(70,60,26,26,[150,200,110],.45);B.oval(90,38,2,3,[150,200,240]);B.set(90,34,[150,200,240]);B.set(89,37,[230,245,255])}}},
  opa:{datei:'opa',box:[20,8,150,132],mimik:{
    neutral:B=>{},
    angry:B=>{   // dicke Brauen als V, rotes Gesicht, Zornesader, Mund offen im Bart
      B.tönen(105,85,45,40,[220,70,50],.4);
      B.linie(80,61,96,66,INK,3);B.linie(112,66,130,60,INK,3);
      B.rect(98,104,20,8,[70,20,20]);B.linie(98,104,117,104,INK);B.linie(98,111,117,111,INK);B.linie(98,104,98,111,INK);B.linie(117,104,117,111,INK);B.rect(101,105,14,2,[240,236,220]);
      [[148,74],[153,70],[150,67]].forEach(([x,y])=>{B.linie(x-3,y,x+3,y,[200,30,30],2);B.linie(x,y-3,x,y+3,[200,30,30],2)})},
    drunk:B=>{   // Augen als zufriedene Bögen, knallrote Nase, Bäckchen, Grinsen
      B.haut(82,62,14,8,B.get(86,71));B.haut(113,60,24,9,B.get(125,72));B.bogen(88,68,6,4,Math.PI*1.1,Math.PI*1.9,INK,2);B.bogen(124,67,7,4,Math.PI*1.1,Math.PI*1.9,INK,2);
      B.tönen(107,85,16,15,[235,40,50],.7);B.tönen(80,88,9,6,[240,90,90],.55);B.tönen(140,86,9,6,[240,90,90],.55);
      B.bogen(108,103,14,6,.15,Math.PI-.15,INK,2);B.rect(98,107,20,2,[240,236,220]);
      B.oval(150,52,3,3,[220,240,255]);B.oval(156,44,2,2,[220,240,255])}}},
  nastja:{datei:'nastja',box:[82,22,96,104],mimik:{
    neutral:B=>{   // beide Augen offen: zugekniffenes rechtes Auge mit dem gespiegelten linken ersetzen
      const L=[];for(let y=70;y<=82;y++){const r=[];for(let x=110;x<=129;x++)r.push(B.farbe(x,y));L.push(r)}
      B.haut(132,62,20,12,B.get(141,79));const hautL=B.get(108,84);L.forEach((r,j)=>r.forEach((c,i)=>{const lu=c&&.299*c[0]+.587*c[1]+.114*c[2];if(c&&(dunkel(c)||lu<150||(Math.max(...c)-Math.min(...c)<22&&lu>205)))B.set(150-i,70+j-5,c)}))   /* nur Auge, nicht die Haut drumherum */},
    flirt:B=>{   // Zwinkern wie im Original, Braue hoch, Herz
      B.haut(108,63,18,5,B.get(116,86));B.linie(109,67,124,64,INK);B.linie(124,64,127,66,INK);
      const R=[205,40,70];[[0,0],[1,0],[3,0],[4,0],[-1,1],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[0,2],[1,2],[2,2],[3,2],[4,2],[1,3],[2,3],[3,3],[2,4]].forEach(([x,y])=>B.set(160+x,60+y,R))},
    laugh:B=>{   // beide Augen als lachende Bögen, Mund weit offen, rote Wangen
      B.haut(110,68,20,14,B.get(116,86));B.haut(132,61,20,12,B.get(141,79));B.bogen(119,77,6,4,Math.PI*1.1,Math.PI*1.9,INK,2);B.bogen(141,70,6,4,Math.PI*1.1,Math.PI*1.9,INK,2);
      B.haut(117,96,26,12);B.oval(129,102,8,5,[90,20,30]);B.rect(123,98,12,2,[245,240,235]);B.oval(129,105,4,2,[200,80,90]);B.bogen(129,102,8,5,0,Math.PI*2,INK,1);
      B.tönen(116,92,6,4,[235,110,120],.6);B.tönen(146,86,6,4,[235,110,120],.6)}}}};

// ---------- PNG schreiben ----------
const crcT=[];for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;crcT[n]=c>>>0}
const crc=b=>{let c=0xffffffff;for(const v of b)c=crcT[(c^v)&255]^(c>>>8);return(c^0xffffffff)>>>0};
const chunk=(t,d)=>{const l=Buffer.alloc(4);l.writeUInt32BE(d.length);const td=Buffer.concat([Buffer.from(t),d]);const c=Buffer.alloc(4);c.writeUInt32BE(crc(td));return Buffer.concat([l,td,c])};
function png(B){const raw=Buffer.alloc((B.w*4+1)*B.h);B.p.forEach((r,y)=>r.forEach((c,x)=>{if(!c)return;const q=y*(B.w*4+1)+1+x*4;raw[q]=c[0];raw[q+1]=c[1];raw[q+2]=c[2];raw[q+3]=255}));
  const ih=Buffer.alloc(13);ih.writeUInt32BE(B.w,0);ih.writeUInt32BE(B.h,4);ih[8]=8;ih[9]=6;
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',ih),chunk('IDAT',zlib.deflateSync(raw,{level:9})),chunk('IEND',Buffer.alloc(0))])}

const aus=path.join(root,'pixel/portraets');fs.mkdirSync(aus,{recursive:true});const urls={};
for(const[name,f]of Object.entries(FIG)){const src=laden(f.datei);urls[name]={};
  for(const[m,mal]of Object.entries(f.mimik)){const B=bild(src,f.box);mal(B);const buf=png(B);fs.writeFileSync(path.join(aus,`${name}_${m}.png`),buf);urls[name][m]='data:image/png;base64,'+buf.toString('base64')}}
// ganze Opa-Figur (für das Trinkduell: das Mimik-Porträt liegt bei FIG.opa.box pixelgenau darauf)
const opaGanz=laden('opa'),opaB=bild(opaGanz,[0,0,opaGanz.W,opaGanz.H]),opaPng=png(opaB);fs.writeFileSync(path.join(aus,'opa_drinking.png'),opaPng);
const zin=laden('zinaida'),zinPng=png(bild(zin,[0,0,zin.W,zin.H]));   // Zinaida als Aufpasserin beim Privattanz (49-nastja-show.js)
fs.writeFileSync(path.join(root,'js/50-portraets-pixel.js'),`// ================= Dialog-Porträts (Pixel, 3 Mimiken je Figur) =================
// AUTOMATISCH erzeugt aus pixel/{petja,opa,nastja}.json mit: node tools/portraets.js  – nicht von Hand ändern.
// Gleiche Bilder liegen als PNG in pixel/portraets/. OPA_GANZ = ganze Opa-Figur fürs Trinkduell, Porträt-Ausschnitt bei PORTRAET_BOX.opa. ZINAIDA_GANZ = Aufpasserin beim Privattanz.
const PORTRAETS=${JSON.stringify(urls)};
const PORTRAET_BOX=${JSON.stringify(Object.fromEntries(Object.entries(FIG).map(([k,f])=>[k,f.box])))};
const OPA_GANZ='data:image/png;base64,${opaPng.toString('base64')}';
const ZINAIDA_GANZ='data:image/png;base64,${zinPng.toString('base64')}';
`);
console.log('ok',Object.keys(urls).map(k=>k+':'+Object.keys(urls[k]).join('/')).join('  '));
