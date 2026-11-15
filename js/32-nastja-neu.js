// ================= Nastja (Banja), neue Fassung: frontal =================
// Vorlage: Grok-Bild (pixel/nastja.json, schräg). Hier frontal nachgezeichnet: langes welliges Blondhaar, schmales schwarzes Haarband,
// dunkelrotes Korsett mit Schnürung, Slip mit Seitenschleifen, Strapse, dunkle Strümpfe, Plateauschuhe mit Fesselriemen, Federwedel.
// Gerendert wie alle Figuren (pixSprite) mit NASTJA_PIX: 500 px hoch, max. 20 Farben, Kontur 2 px / rechts+unten 4 px, Füße auf der Bodenzeile.
// Noch NICHT im Spiel eingesetzt – Vorschau/Export: nastjaNeuExport() -> JSON-Text im Array-Format von pixel/
const NASTJA_NEU_BOX=[-74,-270,134,274];
const NASTJA_NEU=(()=>{const mir=d=>d.replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g,(m,x,y)=>`${-x},${y}`);   // Pfad an der Mittelachse spiegeln
  const both=(d,a)=>`<path d="${d}" ${a}/><path d="${mir(d)}" ${a}/>`;
  const wave=(pts,amp)=>pts.slice(1).map((p,i)=>{const q=pts[i],mx=(p[0]+q[0])/2,my=(p[1]+q[1])/2,dx=p[0]-q[0],dy=p[1]-q[1],l=Math.hypot(dx,dy)||1;return`Q${(mx+dy/l*amp).toFixed(1)},${(my-dx/l*amp).toFixed(1)} ${p[0]},${p[1]}`}).join(' ');
  const HL=[[-14,-251],[-24,-246],[-30,-234],[-32,-220],[-35,-207],[-36,-194],[-39,-181],[-38,-168],[-41,-155],[-37,-146]];
  const hairBack=`M0,-257C-6,-257 -10,-255 -14,-251 ${wave(HL,-3.6)} Q-31,-148 -27,-154 Q-24,-150 -20,-158 L20,-158 Q24,-150 27,-154 Q31,-148 37,-146 ${wave(HL.map(([x,y])=>[-x,y]).reverse(),-3.6)} C10,-255 6,-257 0,-257Z`;
  const SK='#f0d0af',SK2='#e2bc98',HA='#e8cc89',HA2='#ceb17a',HA3='#ba9f67',CO='#7a2230',CO2='#561824',ST='#4a4844',ST2='#5e5b55',BK='#343238';
  // Federn: Fächer um die Wedelspitze
  let fe='';for(let i=0;i<9;i++){const a=(-160+i*17)*Math.PI/180,L=20+((i*7)%5)*2,cx=-51,cy=-216,ex=cx+Math.cos(a)*L,ey=cy+Math.sin(a)*L,nx=-Math.sin(a)*5,ny=Math.cos(a)*5;
    fe+=`<path d="M${cx},${cy}C${(cx+ex)/2+nx},${(cy+ey)/2+ny} ${ex+nx*.4},${ey+ny*.4} ${ex},${ey}C${ex-nx*.4},${ey-ny*.4} ${(cx+ex)/2-nx},${(cy+ey)/2-ny} ${cx},${cy}Z" fill="${i%3==1?'#d8d4cf':'#f6f3ee'}"/>`}
  return `<g stroke="#1a0a10" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round">
<!-- Haar hinten -->
<path d="${hairBack}" fill="${HA}"/>
<path d="M16,-246C26,-238 30,-224 31,-210C33,-196 36,-186 35,-174C36,-164 34,-156 35,-150C30,-152 27,-155 23,-160C27,-180 28,-204 24,-226C22,-236 19,-242 16,-246Z" fill="${HA2}" stroke="none"/>
<path d="M-26,-226Q-30,-214 -28,-204Q-26,-194 -31,-184Q-35,-172 -32,-162M-30,-200Q-34,-190 -33,-180M26,-226Q30,-214 28,-204Q26,-194 31,-184Q35,-172 32,-162M30,-200Q34,-190 33,-180" fill="none" stroke="${HA3}" stroke-width="1.7"/>
<!-- Beine: Oberschenkel, Strümpfe, Schuhe -->
${both('M-19,-136C-19,-124 -17,-114 -16.5,-104L-1.5,-104C-1,-114 0,-124 0,-132Z',`fill="${SK}"`)}
${both('M-16.5,-106C-15,-90 -13,-78 -13,-68C-14,-56 -15,-46 -13,-34C-12,-28 -11,-23 -10.5,-20L-5,-20C-5,-25 -4,-32 -4,-42C-4,-54 -5,-62 -5,-70C-4,-82 -3,-94 -2,-106Z',`fill="${ST}"`)}
<path d="M-10,-100C-9,-86 -8,-76 -8.5,-66M-9,-58C-10,-48 -10,-40 -8.5,-30M10,-100C9,-86 8,-76 8.5,-66M9,-58C10,-48 10,-40 8.5,-30" fill="none" stroke="${ST2}" stroke-width="1.8"/>
${both('M-17,-108L-1.5,-108L-1.8,-102L-16.4,-102Z',`fill="${BK}"`)}
${both('M-12.5,-23C-17,-19 -19,-14 -19,-10L-1.5,-10C-1.5,-14 -2.5,-19 -5,-23Z',`fill="${BK}"`)}
${both('M-20,-10.5L-0.8,-10.5L-0.8,0L-20,0Z',`fill="#2c2c32"`)}
<path d="M-16,-17C-14,-19.5 -10,-20 -7,-19.5M7,-19.5C10,-20 14,-19.5 16,-17M-18,-6L-3,-6M3,-6L18,-6" fill="none" stroke="#5a5a60" stroke-width="1.8"/>
<path d="M-12.6,-22.5L-4.8,-22.5M4.8,-22.5L12.6,-22.5" fill="none" stroke-width="1.4"/>
<!-- Hüfte + Slip mit Seitenschleifen -->
<path d="M-14,-152C-16,-146 -19,-140 -19.5,-133L19.5,-133C19,-140 16,-146 14,-152Z" fill="${SK}"/>
<path d="M-19,-139L19,-139C18,-133 13,-127 4,-122C2,-121 -2,-121 -4,-122C-13,-127 -18,-133 -19,-139Z" fill="${CO}"/>
<path d="M6,-139L19,-139C18,-133 13,-127 4,-122Z" fill="${CO2}" stroke="none"/>
<path d="M-19,-138C-23,-140 -24,-135 -20.5,-135.5M-20,-136L-22,-130M19,-138C23,-140 24,-135 20.5,-135.5M20,-136L22,-130" fill="none" stroke-width="1"/>
<!-- Strapse -->
<path d="M-10,-141L-10,-108M-17,-140L-16.5,-108M10,-141L10,-108M17,-140L16.5,-108" fill="none" stroke-width="1.3"/>
<!-- Hals, Schultern, Dekolleté -->
<path d="M-6,-212L-6,-202C-12,-200 -20,-199 -24,-196C-26,-192 -26,-188 -24,-183L24,-183C26,-188 26,-192 24,-196C20,-199 12,-200 6,-202L6,-212Z" fill="${SK}"/>
<path d="M2,-212L6,-212L6,-202C12,-200 20,-199 24,-196C26,-192 26,-188 24,-183L14,-183C18,-190 10,-198 2,-202Z" fill="${SK2}" stroke="none"/>
<!-- rechter Arm (hängt) -->
<path d="M19,-196C26,-196 28,-188 27.5,-178C27,-165 26.5,-152 26.5,-140C26.5,-132 27,-126 27,-121L21.5,-121C21.5,-128 21,-136 21,-142C21,-156 20,-168 19,-178Z" fill="${SK}"/>
<path d="M24.5,-123C28,-123 29,-118 28,-113C27,-109 23,-109 22,-112C21,-116 21.5,-122 24.5,-123Z" fill="${SK}"/>
<path d="M23.5,-115L23.8,-110.5M25.6,-115L26,-110.8" fill="none" stroke-width=".8"/>
<!-- linker Arm (hält den Federwedel) -->
<path d="M-20,-197C-27,-197 -30,-190 -32,-182C-34,-175 -37,-168 -38.5,-162C-37,-157 -32,-157 -31,-161C-29,-168 -26,-176 -24,-183Z" fill="${SK}"/>
<path d="M-38.5,-162C-42,-172 -44,-182 -45,-190L-39,-192C-38.5,-184 -36,-172 -31,-160Z" fill="${SK}"/>
<path d="M-42.5,-186L-50,-214" fill="none" stroke="${BK}" stroke-width="3.4"/>
${fe}
<path d="M-45,-199C-40.5,-201 -37.5,-198 -38,-193C-38.5,-188 -42.5,-186 -45.5,-188C-48,-190 -48,-197 -45,-199Z" fill="${SK}"/>
<path d="M-46,-195L-40,-196.5M-46.5,-191.5L-40.5,-192.5" fill="none" stroke-width=".8"/>
<!-- Korsett -->
<path d="M-19,-186C-15,-192 -6,-191 0,-183C6,-191 15,-192 19,-186C17,-172 13,-163 13,-155C13,-150 16,-145 18,-139L0,-136L-18,-139C-16,-145 -13,-150 -13,-155C-13,-163 -17,-172 -19,-186Z" fill="${CO}"/>
<path d="M8,-185C13,-190 17,-189 19,-186C17,-172 13,-163 13,-155C13,-150 16,-145 18,-139L8,-137Z" fill="${CO2}" stroke="none"/>
<path d="M-8,-182C-7,-166 -7,-152 -9,-139M8,-182C7,-166 7,-152 9,-139M-15,-176C-12,-166 -11,-156 -14,-142M15,-176C12,-166 11,-156 14,-142" fill="none" stroke="${CO2}" stroke-width="1.8"/>
${Array.from({length:7},(_,i)=>{const y=-179+i*5.6;return `<path d="M-2.6,${y}L2.6,${y+4}M2.6,${y}L-2.6,${y+4}" fill="none" stroke-width="1.1"/>`}).join('')}
<path d="M0,-183L0,-177M-12,-190L-15,-199M12,-190L15,-199" fill="none" stroke-width="1.1"/>
<!-- Kopf -->
<path d="M-13,-232C-13,-220 -10,-213 -5,-209.5C-2,-207.5 2,-207.5 5,-209.5C10,-213 13,-220 13,-232C13,-244 7,-250 0,-250C-7,-250 -13,-244 -13,-232Z" fill="${SK}"/>
<path d="M6,-248C11,-244 13,-238 13,-232C13,-220 10,-213 5,-209.5C9,-216 10,-226 9,-236C8,-242 7,-246 6,-248Z" fill="${SK2}" stroke="none"/>
${both('M-10.4,-229.6C-8,-231.4 -4,-231.4 -1.8,-229.6C-4,-228.2 -8,-228.2 -10.4,-229.6Z',`fill="#f6f3ee" stroke-width=".7"`)}
<circle cx="-6" cy="-229.3" r="1.4" fill="#4a3020" stroke="none"/><circle cx="6" cy="-229.3" r="1.4" fill="#4a3020" stroke="none"/>
${both('M-10.6,-230C-8,-232.4 -4,-232.4 -1.6,-230L-2,-229.4C-4,-230.4 -8,-230.4 -10.2,-229.4Z',`fill="${SK2}" stroke="none"`)}
<path d="M-10.8,-229.7C-8,-230.8 -4,-230.8 -1.6,-229.7M1.6,-229.7C4,-230.8 8,-230.8 10.8,-229.7M-11,-229.8L-12.6,-231M11,-229.8L12.6,-231" fill="none" stroke-width="1.5"/>
<path d="M-10,-235C-7,-237 -4,-237 -2,-235.8M2,-235.8C4,-237 7,-237 10,-235" fill="none" stroke-width="1"/>
<path d="M0.6,-227C0,-223 -1,-221 0,-220.4C1,-220 2,-220.2 2.6,-220.8" fill="none" stroke-width=".8"/>
<path d="M-4.6,-215.6C-2,-217.6 0,-216.6 0,-216.2C0,-216.6 2,-217.6 4.6,-215.6C2.6,-212.4 -2.6,-212.4 -4.6,-215.6Z" fill="#8a1a2a" stroke-width=".8"/>
<path d="M-4.2,-215.4C-1,-214.7 1,-214.7 4.2,-215.4" fill="none" stroke-width=".8"/>
<!-- Haar vorne: Scheitel, Stirnpartie, Locken über die Schultern -->
<path d="M-14,-231C-16,-246 -8,-257 0,-257C8,-257 16,-246 14,-231C11,-239 6,-244 1,-245C-4,-244 -11,-239 -14,-231Z" fill="${HA}"/>
<path d="M-13.5,-241.5C-8,-251.5 8,-251.5 13.5,-241.5L13,-239C8,-248.5 -8,-248.5 -13,-239Z" fill="${BK}"/>
${both('M-13,-240C-18,-232 -17,-222 -19,-212C-21,-204 -27,-198 -27,-190C-28,-182 -25,-176 -27,-168C-23,-171 -20,-178 -21,-186C-20,-194 -16,-200 -15,-208C-14,-216 -13.5,-226 -12,-234Z',`fill="${HA}"`)}
<path d="M-16,-226C-17,-216 -19,-208 -22,-200M16,-226C17,-216 19,-208 22,-200M-6,-252C-9,-248 -11,-244 -12,-238M6,-252C9,-248 11,-244 12,-238" fill="none" stroke="${HA3}" stroke-width="1.7"/>
</g>`})();
// Vorschau-Export im Format von pixel/*.json (rle). Aufruf in der Konsole: nastjaNeuExport().then(t=>copy(t))
function pixArray(url,name){return new Promise(res=>{const im=new Image();im.onload=()=>{const W=im.width,H=im.height,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');g.drawImage(im,0,0);
  const d=g.getImageData(0,0,W,H).data,pal={},sym={},CH='ABCDEFGHIJLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';let ci=0;const hex=q=>'#'+[d[q],d[q+1],d[q+2]].map(v=>v.toString(16).padStart(2,'0')).join('');
  const sy=q=>{if(!d[q+3])return'.';const h=hex(q);if(!(h in sym)){sym[h]=h=='#2e1c10'?'K':CH[ci++];pal[sym[h]]=h}return sym[h]};
  // leere Spalten links/rechts weg
  let x0=W,x1=-1;for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(d[(y*W+x)*4+3]){x0=Math.min(x0,x);x1=Math.max(x1,x)}
  const rows=[];for(let y=0;y<H;y++){let last=-1;for(let x=x0;x<=x1;x++)if(d[(y*W+x)*4+3])last=x;let s='',x=x0;while(x<=last){const ch=sy((y*W+x)*4);let n=1;while(x+n<=last&&sy((y*W+x+n)*4)===ch)n++;s+=ch+(n>1?n:'');x+=n}rows.push(s)}
  const P={'.':null};if(pal.K)P.K=pal.K;Object.keys(pal).filter(k=>k!='K').sort().forEach(k=>P[k]=pal[k]);
  res(`{"name":"${name}",\n"width":${x1-x0+1},"height":${H},"format":"rle",\n"info":"Pro Zeile: Zeichen + Anzahl (ohne Zahl = 1). \\".\\" = transparent, fehlendes Zeilenende = transparent.",\n"palette":{${Object.entries(P).map(([k,v])=>JSON.stringify(k)+':'+JSON.stringify(v)).join(',\n')}},"rows":[\n${rows.map(r=>JSON.stringify(r)).join(',\n')}]}`)};im.src=url})}
function nastjaNeuExport(){return pixSprite(NASTJA_NEU,NASTJA_NEU_BOX,0,NASTJA_PIX).then(u=>pixArray(u,'nastja'))}
