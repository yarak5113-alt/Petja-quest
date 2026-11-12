// ================= Nymphen-Pool (gemalte Figuren, wechseln beim Verlassen des Sumpfs) =================
const NYMPHS=[
 {id:'nastja',n:'Nastja',col:'#c8d0e0',age:.24,build:.05,beauty:1,skin:[238,228,218],shade:[120,104,118],hair:[196,172,124],eye:[84,128,160],pose:1,lips:[184,124,140],l:[
  [['nastja','Na, Stadtjunge? Glotzen kostet nix. Anfassen kostet dich die Lunge.'],['P','Ich... glotz nicht. Ich... orientier mich.'],['nastja','Klar. Und ich bin hier nur zum Baden.']],
  [['nastja','Weißt du, was das Schlimmste am Ertrinken ist? Die Frisur. Hundert Jahre nasse Haare und kein einziger Kerl, der ein Handtuch bringt.']],
  [['nastja','Die Frösche hier sind die einzigen Männer, die mir hinterherhüpfen. Und selbst die haben mehr Mumm als du.']]]},
 {id:'marfa',n:'Marfa',col:'#d8a8c8',age:.3,build:.3,beauty:1,skin:[234,214,196],shade:[124,96,104],hair:[26,20,28],eye:[96,72,46],pose:1,kohl:1,strangle:1,earring:1,lips:[176,58,72],l:[
  [['marfa','Komm näher, Petja. Der Letzte, der so geschaut hat, liegt jetzt unter mir. Er hat sich nicht beschwert. Er hat sich gar nicht mehr bewegt.']],
  [['marfa','Ich war die teuerste Frau im ganzen Gouvernement. Jetzt bin ich gratis und keiner traut sich. Typisch Männer.'],['P','Vielleicht liegt’s am Schlamm.'],['marfa','Schlamm ist ein Peeling, du Bauer.']],
  [['marfa','Seine Frau hat mich ertränkt. Mit beiden Händen. Ich hab gelächelt, bis zum Schluss.'],['P','Warum erzählst du mir das?'],['marfa','Damit du weißt, was ich mit Händen anstellen kann.']]]},
 {id:'ustinja',n:'Matrone Ustinja',col:'#e0c890',age:.78,build:.12,skin:[208,190,166],hair:[176,172,162],eye:[96,84,70],pose:0,gaunt:1,updo:1,pearls:1,rouge:1,gold:1,stole:1,marble:.4,l:[
  [['ustinja','Im Bordell hätte ich dich nicht mal die Treppe putzen lassen, Bürschchen. Aber hier unten nimmt man, was der Sumpf anspült.']],
  [['ustinja','Meine eigenen Mädchen haben mich hier versenkt. Undankbares Pack.'],['ustinja','Das Haus am Fluss gehört immer noch mir. Den Schlüssel kriegst du, wenn du mir einen Gefallen tust.'],['P','Was für ein Haus?'],['ustinja','Das wirst du noch sehen, Süßer.']]]},
 {id:'fekla',n:'Fekla',col:'#c0d098',age:.45,build:1,skin:[178,184,152],hair:[92,66,40],eye:[96,84,62],pose:0,bloat:1,milky:1,blisters:1,marble:1,shade:[44,78,58],l:[
  [['fekla','Riechst du das? Das bin ich. Und in zwei Wochen bist das du, wenn du weiter so dumm am Ufer rumstehst.']],
  [['fekla','Früher war ich die Dickste im Dorf. Jetzt bin ich die Dickste im Sumpf. Karriere, was?']],
  [['fekla','Willst du mal anfassen? Ist wie Wackelpudding. Mit Würmern drin.'],['P','Ich... verzichte.'],['fekla','Feigling. Die Aale haben weniger Hemmungen.']]]},
 {id:'glafira',n:'Glafira',col:'#f0a070',age:.25,build:.2,skin:[214,194,168],hair:[128,54,24],eye:[156,132,52],pose:0,scar:1,wounds:1,broken:1,algaeHair:1},
 {id:'alte',n:'Die Alte',col:'#c8c4b0',age:1,build:0,skin:[188,184,162],hair:[52,70,36],eye:[0,0,0],pose:0,skel:1,marble:.6,algaeHair:1,l:[
  [['alte','Blub... Jungchen... hast du... meine Nase... gesehen? Irgendein Hecht... hat sie... mitgenommen.']],
  [['alte','Ich war... die Erste hier... Der Fluch... ist älter... als die Hexe...'],['P','Welcher Fluch?'],['alte','Blub... später... ich bin müde...']]]}];
NYMPHS[4].fn=function(){
  if(inv.includes('kippe')){inv.splice(inv.indexOf('kippe'),1);renderInv();this.done=1;say([['P','Hier. Ein Rest. Von Wowa.'],['glafira','Na endlich mal einer mit Manieren. ...Kräuter von Oma. Gutes Zeug.'],['glafira','Hör zu, Stadtjunge: Wer hier aufwachen will, braucht den Segen der Baba Jaga.'],['glafira','Und die alte Hexe macht keinen Finger krumm, ohne dass du blutest. Bring ihr was Schönes.']])}
  else if(this.done)say([['glafira','Was denn noch? Verpiss dich zur Hexe.']]);
  else say([['glafira','Was glotzt du, du Wichser? Der, der mir das angetan hat, sah aus wie du. Nur mit mehr Mut.'],['glafira','Hast du was zu rauchen? Nein? Dann halt die Fresse.']])};
NYMPHS.forEach(n=>N[n.id]=[n.n,n.col]);

// Bilder der Nymphen: Cel-Sprites aus js/08b-nymphen-sprite.js (bis sie fertig sind, leer)
const NIMG=NYMPHS.map(()=>"");
// Eigene Bilder: liegt assets/nymphe-<id>.png vor (z. B. assets/nymphe-mila.png), ersetzt sie das gemalte Sprite
NYMPHS.forEach((n,i)=>{const im=new Image();im.onload=()=>{n.own=1;NIMG[i]=im.src;if(cur==="sumpf")applySwampNymphs()};im.src="assets/nymphe-"+n.id+".png"});
const SLOT_AT=[[300,412],[460,408],[588,414]];let shown=[-1,-1,-1];
// Sumpf-Besetzung: wird NUR beim Verlassen des Sumpfs neu gemischt und beim nächsten Betreten angezeigt
let nextNymphs=[];
function updateSwampNymphs(){const p=NYMPHS.map((_,i)=>i);for(let i=p.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[p[i],p[j]]=[p[j],p[i]]}nextNymphs=p.slice(0,3)}
function applySwampNymphs(){nextNymphs.forEach((idx,i)=>{const nd=NYMPHS[idx];nd.at=SLOT_AT[i];T['slot'+i]=nd;const im=$('#slot'+i+'img');im.style.opacity=1;im.setAttribute('href',NIMG[idx])})}
function onLocationLeave(from){if(from==='sumpf')updateSwampNymphs()}
updateSwampNymphs();
const game=$('#game'),label=$('#label'),svg=$('#scene');
function svgPt(e){const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse())}
game.addEventListener('click',e=>{if($('#fg')||ACT)return;if(busy)return advance();if(changing||!S0)return;const h=e.target.closest('.interactive');
  if(h){const id=h.dataset.id,o=T[id];if(!o)return;if(id=='petja'||!o.at)return use(id);return walkTo(o.at[0],o.at[1],()=>use(id))}
  if(e.target.closest('#scene')){const p=svgPt(e);walkTo(p.x,p.y)}});
game.addEventListener('mousemove',e=>{if(typeof hoverLabel=='function')hoverLabel(e)});game.addEventListener('mouseleave',()=>label.style.opacity=0);

setTimeout(()=>{enter('wald',[400,476]);setTimeout(()=>{const b=$('#bNew');if(b){b.disabled=false;b.textContent='Neues Spiel'}testerBoot()},500)},30);
$('#bNew').onclick=e=>{e.stopPropagation();rm('start');cutscene()};$('#bLoad').onclick=e=>{e.stopPropagation();openMenu('l')};$('#bKeys').onclick=e=>{e.stopPropagation();openMenu('k')};
(function title(){const tc=$('#tcv'),x=tc.getContext('2d'),FF=Array.from({length:30},()=>[Math.random()*800,250+Math.random()*230,Math.random()*6.28]),EY=[[150,380],[640,360],[90,300],[720,420]];
  const bg=document.createElement('canvas');bg.width=800;bg.height=500;{const b=bg.getContext('2d');let g=b.createLinearGradient(0,0,0,500);g.addColorStop(0,'#05070f');g.addColorStop(.55,'#141c2a');g.addColorStop(1,'#060806');b.fillStyle=g;b.fillRect(0,0,800,500);
    g=b.createRadialGradient(560,120,10,560,120,160);g.addColorStop(0,'rgba(240,236,210,1)');g.addColorStop(.12,'rgba(230,226,200,.9)');g.addColorStop(.14,'rgba(160,170,190,.25)');g.addColorStop(1,'rgba(0,0,0,0)');b.fillStyle=g;b.fillRect(0,0,800,500);
    for(let i=0;i<120;i++){b.fillStyle='rgba(255,255,255,'+Math.random()*.6+')';b.fillRect(Math.random()*800,Math.random()*260,1,1)}
    for(let i=0;i<34;i++){const X=Math.random()*820-10,w=4+Math.random()*16*(i/34+.3),t=(i%3)*20;b.fillStyle=i<20?'#1a1e24':'#0c0e10';b.fillRect(X,t+Math.random()*40,w,500);b.fillStyle='rgba(220,220,210,'+(i<20?.25:.5)+')';b.fillRect(X+w*.3,t+60,w*.4,440);
      for(let k=0;k<12;k++){b.fillStyle='rgba(0,0,0,.8)';b.fillRect(X,80+Math.random()*400,w,2+Math.random()*3)}}
    g=b.createLinearGradient(0,360,0,500);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.9)');b.fillStyle=g;b.fillRect(0,360,800,140)}
  (function L(t){if(!$('#start'))return;x.drawImage(bg,0,0);const T=t/1000;
    for(let i=0;i<6;i++){const fx=((T*12+i*160)%1000)-100,g=x.createRadialGradient(fx,380+i*14,10,fx,380+i*14,140);g.addColorStop(0,'rgba(170,190,200,.13)');g.addColorStop(1,'rgba(170,190,200,0)');x.fillStyle=g;x.fillRect(fx-140,240+i*14,280,280)}
    FF.forEach(f=>{const a=.4+.6*Math.abs(Math.sin(T*1.5+f[2]));x.fillStyle='rgba(220,255,140,'+a+')';x.beginPath();x.arc(f[0]+Math.sin(T+f[2])*12,f[1]+Math.cos(T*.8+f[2])*8,1.6,0,7);x.fill()});
    EY.forEach((e,i)=>{if(Math.sin(T*.7+i*2)>.6)return;x.fillStyle='rgba(255,200,40,.85)';x.fillRect(e[0],e[1],3,2);x.fillRect(e[0]+8,e[1],3,2)});
    requestAnimationFrame(L)})(0)})();
