// ================= Aktionen: Aufheben & Werfen =================
// Petja dreht sich zum Gegenstand (liegt er hinter ihm, mit dem Rücken zur Kamera), geht je nach Höhe in die Knie und bückt sich,
// greift auf Brusthöhe zu oder streckt sich nach oben – der Gegenstand verschwindet im Moment des Zugreifens aus der Szene
// und liegt in seiner Hand. Werfen: holt ihn aus der Hosentasche, holt aus und wirft – der Gegenstand fliegt im Bogen zum Ziel.
// Posen werden wie Petjas Laufbilder als Sprites gerendert (größere Kiste, weil Arm/Oberkörper herausragen) und gecacht.
const PBA=[-64,-302,212,306],PBA_ROWS=Math.round(306*PIX_ROWS/258);
const POSE={
  bodenA:{crouch:.45,lean:22,arm:34},bodenB:{crouch:1,lean:46,arm:62},
  mitteA:{lean:5,arm:40},mitteB:{lean:12,arm:84},
  hochA:{lean:-3,arm:105},hochB:{lean:-7,arm:168},
  halten:{arm:38},tasche:{lean:3,arm:-16},
  ausholen:{lean:-12,arm:205},wurf:{lean:16,arm:72},nach:{lean:22,arm:28}};
const ACTF={};
function actFrame(name,th){const k=name+th;if(ACTF[k])return ACTF[k];
  const po=Object.assign({},POSE[name]);
  return ACTF[k]=sprite(PETV(th,0,0,'n',0,po),PBA,K,PBA_ROWS).then(u=>({u,hand:po.hand,behind:po.behind}))}
// Gegenstand in der Hand (liegt über dem Sprite, wandert mit der Hand mit)
const petItem=document.createElementNS('http://www.w3.org/2000/svg','image');petItem.setAttribute('class','spr');petItem.style.display='none';petG.appendChild(petItem);
const ITEMSZ={brett:46,stock:54,seil:26,schnaps:24,gebiss:20,kippe:14,apfel:15,wuermer:20};
let HELD=null;
function showItem(f){if(!HELD||!f.hand||f.behind){petItem.style.display='none';return}
  const z=ITEMSZ[HELD]||20;petItem.setAttribute('href',ICON(HELD));petItem.setAttribute('x',(f.hand[0]-z/2).toFixed(1));petItem.setAttribute('y',(f.hand[1]-z/2).toFixed(1));
  petItem.setAttribute('width',z);petItem.setAttribute('height',z);petItem.style.display=''}
function setBox(b){petimg.setAttribute('x',b[0]);petimg.setAttribute('y',b[1]);petimg.setAttribute('width',b[2]);petimg.setAttribute('height',b[3])}
const actWait=ms=>new Promise(r=>setTimeout(r,ms));
// Mittelpunkt eines Szenen-Elements in Szenenkoordinaten
function objPt(id){const e=document.getElementById(id)||document.querySelector(`[data-id="${id}"]`);if(!e)return null;const b=e.getBoundingClientRect();
  if(!b.width&&!b.height)return null;const p=svgPt({clientX:b.left+b.width/2,clientY:b.top+b.height/2});return{x:p.x,y:p.y,bot:svgPt({clientX:0,clientY:b.bottom}).y}}
// zum Punkt drehen: dy zählt doppelt (Bodenebene ist perspektivisch gestaucht); oben im Bild = hinter ihm
function faceTo(x,y){const dx=x-P.x,dy=(y-P.y)*2;if(Math.abs(dx)>2)P.dir=dx<0?-1:1;PVIEW=Math.min(180,Math.round(Math.abs(Math.atan2(dx,dy))*4/Math.PI)*45);render()}
// Bildfolge abspielen: steps=[[Pose, ms, {jy, at()}], ...]
async function playAct(steps){const th=PVIEW,fr=await Promise.all(steps.map(s=>actFrame(s[0],th)));setBox(PBA);
  for(let i=0;i<steps.length;i++){const[,ms,o={}]=steps[i];if(o.at)o.at();PJY=(o.jy||0)*scaleAt(P.y);render();petimg.setAttribute('href',fr[i].u);showItem(fr[i]);await actWait(ms)}
  PJY=0;render()}
function endAct(){HELD=null;petItem.style.display='none';setBox(PB);petimg.setAttribute('href',(PFR[PVIEW]||frames)[0]);ACT=null}
// Aufheben: el = Element-ID in der Szene, item = Inventar-Symbol, opt.kind erzwingt boden/mitte/hoch/sprung, opt.gy = Bodenhöhe unter dem Gegenstand
function grab(el,item,cb,opt={}){if(ACT){cb&&cb();return}const o=objPt(el);
  if(!o||!frames[2]){rm(el);cb&&cb();return}
  ACT='grab';faceTo(o.x,opt.gy||o.bot);
  // Höhe über dem Boden relativ zu Petjas Größe (gleiche Tiefe angenommen, er steht ja direkt davor)
  const rel=((opt.gy||P.y)-o.y)/(scaleAt(P.y)*250),kind=opt.kind||(rel<.3?'boden':rel<.62?'mitte':'hoch'),A=kind=='sprung'?'hoch':kind,
    take=()=>{if(document.getElementById(el))rm(el);HELD=item},
    small=!/^(brett|stock|leiter|seil)$/.test(item);
  const seq=kind=='sprung'?[[A+'A',140,{jy:-10}],[A+'B',190,{jy:-26}],[A+'A',150],[A+'B',190,{jy:-30}],[A+'A',150],[A+'B',260,{jy:-34,at:take}],[A+'A',200,{jy:-8}]]
    :[[A+'A',kind=='boden'?200:150],[A+'B',380,{at:take}],[A+'A',kind=='boden'?220:160]];
  seq.push(['halten',small?420:600]);if(small)seq.push(['tasche',260,{at:()=>{HELD=null}}]);
  playAct(seq).then(()=>{endAct();cb&&cb()})}
// Werfen: holt den Gegenstand aus der Hosentasche, holt aus und wirft ihn im Bogen auf das Ziel-Element
function throwAt(target,item,cb){const o=objPt(target);if(ACT||!o||!frames[2]){cb&&cb();return}
  ACT='throw';faceTo(o.x,P.y+6);
  playAct([['tasche',320,{at:()=>{HELD=item}}],['halten',200],['ausholen',380],['wurf',110],['nach',380,{at:()=>{const f=ACTF['wurf'+PVIEW];f.then(w=>fly(item,w.hand,o,()=>{}));HELD=null}}]])
    .then(()=>{endAct();setTimeout(()=>cb&&cb(),250)})}
function fly(item,hand,to,cb){const sc=scaleAt(P.y),x0=P.x+(hand?hand[0]:0)*sc*P.dir,y0=P.y+(hand?hand[1]:-150)*sc,z=(ITEMSZ[item]||20)*sc,
    im=document.createElementNS('http://www.w3.org/2000/svg','image');im.setAttribute('href',ICON(item));im.setAttribute('width',z);im.setAttribute('height',z);svg.appendChild(im);
  const t0=performance.now(),D=Math.max(380,Math.hypot(to.x-x0,to.y-y0)*1.4),arc=Math.min(120,Math.abs(to.x-x0)*.35+40);
  (function k(){const p=Math.min(1,(performance.now()-t0)/D),x=x0+(to.x-x0)*p,y=y0+(to.y-y0)*p-arc*4*p*(1-p);
    im.setAttribute('transform',`translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(p*540).toFixed(0)}) translate(${-z/2},${-z/2})`);
    if(p<1)requestAnimationFrame(k);else{im.remove();cb&&cb()}})()}
// Posen im Hintergrund vorrendern (nach den Gesichtern), damit die erste Aktion nicht hängt
setTimeout(async function preAct(){if(!frames[2])return setTimeout(preAct,800);
  for(const n of ['bodenA','bodenB','halten','tasche','mitteA','mitteB','hochA','hochB','ausholen','wurf','nach'])for(const th of [90,135,180,45,0]){await actFrame(n,th);await actWait(120)}},9000);
