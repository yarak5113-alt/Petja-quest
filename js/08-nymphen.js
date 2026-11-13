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

setTimeout(()=>{enter('wald',[400,476]);setTimeout(()=>{const b=$('#bNew');if(b){b.disabled=false;b.innerHTML=ic('play')+' Neues Spiel'}testerBoot()},500)},30);
$('#bLoad').innerHTML=ic('load')+' Spiel laden';$('#bKeys').innerHTML=ic('keys')+' Steuerung';$('#bOpts').innerHTML=ic('gear')+' Einstellungen';
$('#bNew').onclick=e=>{e.stopPropagation();rm('start');cutscene()};$('#bLoad').onclick=e=>{e.stopPropagation();openMenu('l')};$('#bKeys').onclick=e=>{e.stopPropagation();openMenu('k')};$('#bOpts').onclick=e=>{e.stopPropagation();openMenu('o')};
// ----- Titelbild: der gemalte Birkenwald aus dem Spiel in der Dämmerung, mit Mond, Nebel, Glühwürmchen und Augen im Unterholz -----
(function title(){const tc=$('#tcv'),x=tc.getContext('2d'),FF=Array.from({length:40},()=>[Math.random()*800,230+Math.random()*250,Math.random()*6.28]),EY=[[118,392],[690,372],[60,318],[752,428],[250,350]];
  // Ersatz, solange der Wald noch gemalt wird: Nachthimmel mit Mond
  const night=document.createElement('canvas');night.width=800;night.height=500;{const b=night.getContext('2d');const g=b.createLinearGradient(0,0,0,500);g.addColorStop(0,'#070a16');g.addColorStop(.6,'#151d2c');g.addColorStop(1,'#050705');b.fillStyle=g;b.fillRect(0,0,800,500)}
  let bg=null,pimg=null;
  const build=()=>{const c=document.createElement('canvas');c.width=800;c.height=500;const b=c.getContext('2d');b.drawImage(cache.wald,0,0,800,500);
    if(pimg){const h=150,w=h*96/258;b.drawImage(pimg,404-w/2,474-h*(254/258),w,h)}
    // Dämmerung: kühles Blau multiplizieren, oben dunkler, Mondlicht von rechts oben
    b.globalCompositeOperation='multiply';b.fillStyle='#56648e';b.fillRect(0,0,800,500);let g=b.createLinearGradient(0,0,0,500);g.addColorStop(0,'#3a4466');g.addColorStop(.5,'#9aa4c0');g.addColorStop(1,'#4a5068');b.fillStyle=g;b.fillRect(0,0,800,500);
    b.globalCompositeOperation='screen';g=b.createRadialGradient(600,96,6,600,96,320);g.addColorStop(0,'rgba(255,248,220,.95)');g.addColorStop(.07,'rgba(250,240,210,.85)');g.addColorStop(.09,'rgba(150,170,210,.35)');g.addColorStop(1,'rgba(0,0,0,0)');b.fillStyle=g;b.fillRect(0,0,800,500);
    b.globalCompositeOperation='source-over';g=b.createRadialGradient(400,250,150,400,260,520);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(2,3,8,.85)');b.fillStyle=g;b.fillRect(0,0,800,500);
    g=b.createLinearGradient(0,0,800,0);g.addColorStop(.3,'rgba(0,0,0,0)');g.addColorStop(.5,'rgba(4,4,10,.45)');g.addColorStop(.7,'rgba(0,0,0,0)');b.fillStyle=g;b.fillRect(0,80,800,330);bg=c};
  (function L(t){if(!$('#start'))return;if(!bg&&typeof cache!='undefined'&&cache.wald){if(!pimg&&frames[0]){pimg=new Image();pimg.src=frames[0]}if(!frames[0]||(pimg&&pimg.complete))build()}
    x.drawImage(bg||night,0,0);const T=t/1000;
    for(let i=0;i<7;i++){const fx=((T*10+i*150)%1100)-150,fy=360+i*16,g=x.createRadialGradient(fx,fy,10,fx,fy,170);g.addColorStop(0,'rgba(170,190,215,.16)');g.addColorStop(1,'rgba(170,190,215,0)');x.fillStyle=g;x.fillRect(fx-170,fy-170,340,340)}
    FF.forEach(f=>{const a=.3+.7*Math.abs(Math.sin(T*1.5+f[2])),X=f[0]+Math.sin(T*.9+f[2])*14,Y=f[1]+Math.cos(T*.7+f[2])*9,g=x.createRadialGradient(X,Y,0,X,Y,7);g.addColorStop(0,'rgba(230,255,150,'+a+')');g.addColorStop(1,'rgba(230,255,150,0)');x.fillStyle=g;x.fillRect(X-7,Y-7,14,14)});
    EY.forEach((e,i)=>{const s=Math.sin(T*.6+i*2.3);if(s>.55||(s>.5&&s<.53))return;x.fillStyle='rgba(255,196,40,.9)';x.shadowColor='#ffb020';x.shadowBlur=6;x.beginPath();x.ellipse(e[0],e[1],2.2,1.3,0,0,7);x.ellipse(e[0]+9,e[1],2.2,1.3,0,0,7);x.fill();x.shadowBlur=0});
    requestAnimationFrame(L)})(0)})();
