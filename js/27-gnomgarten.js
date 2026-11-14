// ================= Gnomgarten (eigener Ort neben der Gnomsiedlung) =================
// Links in der Siedlung führt ein Schild „Zum Garten“ hinter den Zaun. Dort liegt nur das Beet: Riesenkohl, Zwiebeln, Pilzbeet.
// Beim ersten Mal stellt sich Grobnik in den Weg, lässt Petja dann aber mit („Gucken ist gratis. Anfassen nicht.“) und steht im Garten Wache.
// Die Sprüche an Kohl/Zwiebeln und Pilzbeet sind dieselben wie vorher in der Siedlung (Handler aus 07, 20, 22 werden nur umgezogen).

// ----- Ort -----
SCN.garten={...SCN.gnome,seed:131,pe:segPath([[-30,488,46,830,480,46]]),ymin:()=>438,ymax:494,x0:40,x1:760,paint:paintGarten,
  intro:[['P','Ein Garten. Kohl so groß wie Kinderwagen, Zwiebeln, über denen die Luft flimmert, und ein Beet mit Pilzen, die glitzern.'],['P','Und Grobnik, der mich anguckt wie ein Türsteher.']]};
function paintGarten(){const o=S0;sky(o);far(o);ground(o);
  let x=lay();bgRow(x,30,206,250,12,22,0);[[70,236,5,0,100],[300,240,4,1,90],[700,238,6,1,96]].forEach(b=>birch(x,...b));put(x,.6);
  x=lay();grass(x,6000,o.hz,500,1);details(x);dirt(x,24);put(x);
  x=lay();gHut(x,640,262,.42);fence2(x,0,620,392,null);
  // dunkle, frisch gehackte Beeterde unter Kohl und Zwiebeln
  shadowAt(x,150,440,150,.35);for(let i=0;i<520;i++){const X=6+R()*290,Y=388+R()*94;dab(x,X,Y,3+R()*6,R()<.7?[46,30,18]:[78,54,32],.55)}
  for(let i=0;i<40;i++){const X=24+R()*224,Y=398+R()*76;ell(x,X,Y,1.4+R()*2,1+R()*1.2,[110,92,70],.7)}
  [[30,404,18],[84,398,21],[142,402,22],[200,398,20],[256,406,19],[56,428,26],[118,432,29],[184,428,27],[246,436,24]].forEach(a=>cabbage(x,...a));
  // Gießkanne und Hacke zwischen den Beeten
  bucket(x,700,420);x.strokeStyle='#5a3a1c';x.lineWidth=3;x.beginPath();x.moveTo(318,436);x.lineTo(300,368);x.stroke();x.fillStyle='#6a6a66';x.beginPath();x.moveTo(292,366);x.lineTo(312,362);x.lineTo(310,372);x.fill();
  // zweites Beet für die Pilze: dunkle Erde
  shadowAt(x,560,452,120,.35);for(let i=0;i<200;i++)dab(x,450+R()*230,410+R()*56,3+R()*5,R()<.7?[40,28,18]:[70,50,30],.5);put(x);
  paintZwiebeln([-39,-131,1.3]);paintPilzbeet([-142,-123.5,1.35]);
  x=lay();sign(x,700,486,1.5,[[1,0,'Zur Siedlung','hGS']]);grass(x,500,470,515,2.4,1);bush(x,790,500,44,1);put(x,1);rays(o,[[.5,.06],[.8,.04]]);grade(o)}

// ----- Klickflächen: neuer Raum, Kohl/Zwiebeln und Pilzbeet ziehen um, Grobnik als Wache -----
{const NS='http://www.w3.org/2000/svg',mk=(tag,at)=>{const e=document.createElementNS(NS,tag);for(const k in at)e.setAttribute(k,at[k]);return e};
  const room=mk('g',{id:'r-garten',class:'room'});document.getElementById('r-gnome').after(room);
  ['kohl','pilzbeet'].forEach(id=>{const e=document.querySelector(`#r-gnome [data-id="${id}"]`);if(e)room.appendChild(e)});
  {const k=room.querySelector('[data-id="kohl"] .hit');if(k)k.setAttribute('d','M4,376L300,376L300,486L4,486Z')}
  {const p=room.querySelector('[data-id="pilzbeet"] .hit');if(p)p.setAttribute('d','M468,454L479,408L641,408L655,454Z')}
  const gw=mk('g',{class:'interactive',transform:'translate(384,464) scale(.86)'});gw.dataset.id='gnomG';
  gw.appendChild(mk('image',{id:'gnomGimg',class:'spr',x:-80,y:-296,width:166,height:300}));room.appendChild(gw);
  const ex=mk('g',{class:'interactive painted exit'});ex.dataset.id='sGS';ex.appendChild(mk('path',{class:'hit',id:'hGS'}));room.appendChild(ex);
  const gs=mk('g',{class:'interactive painted exit'});gs.dataset.id='sGA';gs.appendChild(mk('path',{class:'hit',id:'hGA'}));document.getElementById('r-gnome').appendChild(gs)}
// Grobnik im Garten = dasselbe Bild wie in der Siedlung (wird asynchron gemalt, daher beim Betreten übernehmen)
const _enterGA=enter;enter=function(id,pos){_enterGA(id,pos);if(id==='garten'){const s=$('#gnom1img'),d=$('#gnomGimg');if(s&&d&&s.getAttribute('href'))d.setAttribute('href',s.getAttribute('href'))}};

// ----- Texte & Handlungen -----
Object.assign(T,{
  sGA:{n:'Schild: Zum Garten',at:[170,470],fn(){
    if(FL.gartenOk)return enter('garten',[640,478]);
    say([['N1','HALT, Langer! Wo willst du hin?'],['P','Da lang. Zum Garten.'],['N1','Das ist kein Garten. Das ist Gnomgold. Kohl, Zwiebeln, Pilze. Alles gezählt. Zweimal.'],
      ['P','Ich will nur gucken.'],['N1','…'],['N1','Gucken ist gratis. Anfassen nicht. Ich komm mit. Und ich guck zurück.']],()=>{FL.gartenOk=1;enter('garten',[640,478])})}},
  sGS:{n:'Schild: Zur Siedlung',at:[700,480],go:'gnome',to:[130,440]},
  gnomG:{n:'Grobnik',at:[440,470],l:[[['N1','Ich guck. Du guckst. Alle gucken. Keiner fasst an.']],
    [['N1','Der Kohl da ist älter als du, Langer. Und klüger.'],['P','Das ist keine hohe Latte.']],
    [['P','Bewachen Sie den Garten eigentlich auch nachts?'],['N1','Nachts bewacht der Kohl sich selbst.'],['P','(Ich frag lieber nicht weiter.)']]]}});
T.pilzbeet.at=[560,474];T.kohl.at=[200,478];   // Laufziele im Garten
LOCN.garten='Gnomgarten';MAPN.garten=[138,112];MAPE.push(['gnome','garten']);TTELE.garten=[640,478];TWIG.garten=1;
MOOD.garten=MOOD.gnome;RECIPE.garten=k=>RECIPE.gnome(k);
BARKS.garten=['Hier riecht es nach Erde, Kohl und Zwiebel. In der Reihenfolge, von links nach rechts.','Grobnik guckt. Ich guck zurück. Er gewinnt.','Die Pilze im Beet glitzern. Pilze sollten nicht glitzern.'];
ENTRY.garten=['Der Garten. Grobnik steht schon da. Natürlich.','Wieder im Gnomgarten. Der Kohl ist nicht gewachsen. Glaub ich.'];
