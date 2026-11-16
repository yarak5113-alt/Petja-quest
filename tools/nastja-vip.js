// Baut Nastjas VIP-Outfit aus ihrem freigegebenen Pixel-Bild pixel/nastja_tanz1.json (zwinkert, winkt heran) –
// nur die Kleidung wird umgepixelt, Gesicht, Haare, Arme und Beine bleiben ihre:
//   • Korsett endet höher (Spitze in der Mitte), darunter Bauch frei mit Bauchnabel, das Höschen bleibt
//   • Träger über beide Schultern
// Schreibt pixel/nastja_vip.json (zwinkert), pixel/nastja_vip_zu.json (beide Augen zu) und js/40-nastja-vip-pixel.js.
//   node tools/nastja-vip.js
const fs=require('fs'),path=require('path'),root=path.join(__dirname,'..');
const o=JSON.parse(fs.readFileSync(path.join(root,'pixel/nastja_tanz1.json'),'utf8'));
const dec=r=>{const a=[];for(const m of r.matchAll(/([^0-9])([0-9]*)/g))for(let i=0;i<(+m[2]||1);i++)a.push(m[1]);while(a.length<o.width)a.push('.');return a};
const enc=a=>{let s='',x=0,last=a.length-1;while(last>=0&&a[last]==='.')last--;while(x<=last){let n=1;while(x+n<=last&&a[x+n]===a[x])n++;s+=a[x]+(n>1?n:'');x+=n}return s};
const G=o.rows.map(dec),at=(x,y)=>G[y]&&G[y][x],set=(x,y,c)=>{G[y][x]=c};
// Palette von tanz1: Korsett R (hell) · S · O · T (Schatten); Haut I (hell) · J · L · M (Schatten); K = Tusche
const KORSETT='RSOT',HAUT={R:'I',S:'J',O:'L',T:'M'};
const runH=(x,y)=>{let a=x,b=x;while(at(a-1,y)==='K')a--;while(at(b+1,y)==='K')b++;return b-a+1};

// ---- 1) Bauch frei: ab Zeile 227 nach unten Korsett → Haut, bis zur Unterkante des Korsetts (waagrechte Tuschelinie) ----
const Y0=227,spalten=[];
for(let x=100;x<=175;x++){let hit=false;for(let y=Y0;y<=250;y++){const c=at(x,y);
    if(KORSETT.includes(c)){set(x,y,HAUT[c]);hit=true;continue}
    if(c==='K'&&runH(x,y)<=2&&y<240){const l=at(x-1,y);set(x,y,HAUT[l]||(Object.values(HAUT).includes(l)?l:'J'));continue}   // Schnürung
    break}
  if(hit)spalten.push(x)}
// neue Korsett-Unterkante: 2 px Tusche, in der Mitte eine kleine Spitze nach unten
const xl=Math.min(...spalten),xr=Math.max(...spalten),xm=141;
for(let x=xl;x<=xr;x++){const e=Y0-1+Math.round(Math.max(0,3-Math.abs(x-xm)*.45));for(let y=Y0-2;y<=e;y++)if(y>=e-1)set(x,y,'K');
  for(let y=Y0;y<=e;y++)if(y<e-1)set(x,y,'K')}
// Spitze unten füllen (Korsettstoff bis zur Linie)
for(let x=xl;x<=xr;x++){const e=Y0-1+Math.round(Math.max(0,3-Math.abs(x-xm)*.45));for(let y=Y0-1;y<e-1;y++)set(x,y,x<xm-8?'S':x>xm+12?'O':'R')}
// Bauchnabel und leichte Bauchmitte
set(xm,236,'K');set(xm,235,'M');set(xm-1,236,'M');set(xm+1,236,'L');for(let y=230;y<=233;y++)if(at(xm,y)==='I'||at(xm,y)==='J')set(xm,y,'L');

// ---- 2) Träger: von der Körbchen-Oberkante schräg zur Schulter, 2 px Stoff mit Tuschekante ----
const traeger=(xa,ya,xb,yb,stoff)=>{for(let y=yb;y<=ya;y++){const p=(y-yb)/(ya-yb),xc=Math.round(xb+(xa-xb)*p);
  if('IJLMN'.includes(at(xc-1,y))||at(xc-1,y)==='K')set(xc-1,y,'K');set(xc,y,stoff);set(xc+1,y,stoff);if(at(xc+2,y)!=='.')set(xc+2,y,'K')}};
traeger(116,154,120,131,'R');traeger(159,153,155,131,'O');

const vip={...o,name:'nastja_vip',rows:G.map(enc)};

// ---- 3) Augen zu: offenes Auge (x 119–134, y 71–80) mit Haut füllen, geschlossener Lidbogen, kurze Wimpern ----
for(let y=71;y<=80;y++)for(let x=119;x<=134;x++)set(x,y,x<=131?'I':'J');
[[121,75],[122,75],[123,76],[124,76],[132,76],[133,75]].forEach(([x,y])=>set(x,y,'K'));for(let x=125;x<=131;x++)set(x,77,'K');
[[120,74],[119,73]].forEach(([x,y])=>set(x,y,'K'));[[125,78],[128,78],[131,78]].forEach(([x,y])=>set(x,y,'K'));
const zu={...o,name:'nastja_vip_zu',rows:G.map(enc)};

fs.writeFileSync(path.join(root,'pixel/nastja_vip.json'),JSON.stringify(vip));
fs.writeFileSync(path.join(root,'pixel/nastja_vip_zu.json'),JSON.stringify(zu));
const arr=q=>({w:q.width,h:q.height,palette:q.palette,rows:q.rows}),s=266/500;
fs.writeFileSync(path.join(root,'js/40-nastja-vip-pixel.js'),`// ================= Nastja im VIP-Outfit (Pixel-Arrays) =================
// AUTOMATISCH erzeugt mit: node tools/nastja-vip.js  (Grundlage pixel/nastja_tanz1.json, nur die Kleidung umgepixelt) – nicht von Hand ändern.
// [0] zwinkert (Enthüllung) · [1] beide Augen zu (beim Umziehen)
const NASTJA_VIP_URL=${JSON.stringify([vip,zu].map(arr))}.map(nastjaURL);
const NASTJA_VIP_IMG=NASTJA_VIP_URL.map(u=>{const im=new Image();im.src=u;return im});
const NASTJA_VIP_G=${JSON.stringify([+(-o.pole_x*s).toFixed(2),+(-264-(o.top_extra||0)*s).toFixed(2),+(o.width*s).toFixed(2),+(o.height*s).toFixed(2)])};
`);
console.log('ok',o.width,o.height,'Bauch-Spalten',xl,'–',xr);
