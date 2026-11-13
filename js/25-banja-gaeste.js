// ================= Volles Haus im Banja: Gäste stecken Geld zu, Nastja hat keine Zeit (kein Soft-Lock beim Privattanz) =================
// Den Privattanz gibt es nur einmal – und zwar erst, wenn die Zwiebel in der Lüftung der Lounge steckt. Vorher ist im Club viel los:
// Männer stehen um die Bühne und wedeln mit Geldscheinen (2-Bild-Animation), Nastja hat keine Zeit. Mit der Zwiebel in der Lüftung
// verziehen sich die Gäste (es riecht komisch …), und Nastja nimmt sich Zeit für Petja.

// ----- Gäste als Silhouetten mit rosa Lichtkante; Bild A: Arm hoch mit Schein, Bild B: Arm angewinkelt -----
function gastSVG(v){const c='#1c0e16',rim='rgba(255,90,170,.65)',note=(x,y,a)=>`<g transform="translate(${x},${y}) rotate(${a})"><rect x="-17" y="-9" width="34" height="18" rx="2" fill="#6ab06a" stroke="#2a5a2a" stroke-width="2"/><circle r="5" fill="none" stroke="#2a5a2a" stroke-width="1.6"/></g>`;
  const body=`<path d="M-24,0L-22,-120L22,-120L24,0Z" fill="${c}"/><path d="M-46,-118L-50,-220Q-48,-240 -28,-244L28,-244Q48,-240 50,-220L46,-118Z" fill="${c}" stroke="${rim}" stroke-width="3"/>
    <ellipse cx="0" cy="-270" rx="23" ry="27" fill="${c}" stroke="${rim}" stroke-width="3"/>${v%2?'<path d="M-22,-282Q0,-306 22,-282Q14,-296 0,-298Q-14,-296 -22,-282Z" fill="#0a0408"/>':'<ellipse cx="-23" cy="-268" rx="5" ry="8" fill="'+c+'" stroke="'+rim+'" stroke-width="2"/>'}
    <path d="M-44,-230L-60,-140" stroke="${c}" stroke-width="16" stroke-linecap="round"/>`;
  const A=`<g class="fa"><path d="M40,-234L58,-330" stroke="${c}" stroke-width="16" stroke-linecap="round"/><path d="M46,-236L62,-328" stroke="${rim}" stroke-width="2" fill="none"/><circle cx="59" cy="-336" r="10" fill="${c}"/>${note(58,-360,-12)}</g>`;
  const B=`<g class="fb"><path d="M40,-234L74,-268L66,-300" stroke="${c}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="65" cy="-306" r="10" fill="${c}"/>${note(60,-328,18)}</g>`;
  return body+A+B}
(function(){const css=document.createElement('style');css.textContent=`.gaeste .fa{animation:gwA .9s steps(1) infinite}.gaeste .fb{animation:gwB .9s steps(1) infinite}
  @keyframes gwA{0%{opacity:1}50%{opacity:0}}@keyframes gwB{0%{opacity:0}50%{opacity:1}}`;document.head.appendChild(css);
  const NS='http://www.w3.org/2000/svg',crowd=(room,list,click)=>{const g=document.createElementNS(NS,'g');g.setAttribute('class',(click?'interactive ':'')+'gaeste');if(click)g.dataset.id='gaeste';else g.style.pointerEvents='none';
    g.innerHTML=list.map(([x,y,s,f],i)=>`<g transform="translate(${x},${y}) scale(${f?-s:s},${s})">${gastSVG(i)}</g>`).join('');
    g.querySelectorAll('.fa,.fb').forEach((e,k)=>e.style.animationDelay=(-Math.floor(k/2)*.37)+'s');document.getElementById('r-'+room).appendChild(g)};
  crowd('buehne',[[470,560,.78,0],[575,575,.84,1],[690,555,.76,0],[770,580,.86,1]],1);   // vorn am Bühnenrand, von hinten gesehen
  crowd('banja',[[540,392,.3,0],[592,398,.32,1],[648,394,.3,0]],0)})();   // klein vor der Bühne im Club
const gaesteVis=()=>{const on=!!FL.rekrut&&!FL.zwIn&&!FL.traene;document.querySelectorAll('.gaeste').forEach(e=>e.style.display=on?'':'none')};
{const _e=enter;enter=function(id,pos){_e(id,pos);gaesteVis()}}gaesteVis();

// ----- Texte -----
T.gaeste={n:'Gäste',at:[560,470],fn(){hint('gaeste',[[['P','Volles Haus. Alle wedeln mit Scheinen. Ich hab nicht mal Kleingeld.']],
  [['P','Solange die hier stehen, hat Nastja für mich keine Zeit. Logisch. Die zahlen.']],
  FL.recipe&&!FL.zwIn?[['P','(Wenn es hier plötzlich richtig scharf riechen würde … dann würden die bestimmt gehen.)'],['P','(Die Lüftung der Lounge … die geht hinten raus.)']]:[['P','Die Typen bleiben bis zum Morgengrauen. Mindestens.']]])}};
T.nastja2.fn=function(){
  if(FL.traene)return say([['NA','DU! Du riechst immer noch nach Zwiebel. Raus aus meiner Lounge, Süßer!']]);
  if(FL.zwIn){gaesteVis();return say([['NA','Wo sind denn plötzlich alle hin? Und warum riecht es hier so … komisch?'],['P','Keine Ahnung. Aber jetzt hast du doch Zeit, oder?'],
    ['NA','Für den Mann, der mich aus dem Schlamm gezogen hat? Immer. Komm mit in die Lounge. Aufs Haus.']],()=>{FL.booked=1;lapDance()})}
  if(FL.recipe&&!FL.trQ)return say([['P','Nastja … ganz komische Frage. Könntest du mal weinen? Nur eine Träne?'],['NA','Weinen? Süßer, ich hab dreihundert Jahre im Sumpf gelegen. Ich hab keine Tränen mehr. Nur noch Schlamm.'],
    ['P','(Eine echte Träne von einer, die nie weint. Na super.)'],['P','(Irgendwas, das jeden zum Heulen bringt … Zwiebeln. Bei den Gnomen wächst doch Gemüse.)']],()=>{FL.trQ=1});
  hint('nastjaBusy',[[['NA','*dreht sich an der Stange* Na, Petja? Siehst du doch: volles Haus!'],['NA','Für Privattänze hab ich gerade keine Zeit, Süßer. Die Jungs da zahlen.']],
    [['NA','Später, Süßer. Wenn die Bude leer ist.']],
    FL.recipe?(has('zwiebel')?[['P','(Die Zwiebel. Wenn die in die Lüftung der Lounge kommt … hinterm Banja …)']]:[['NA','Kein Geld, keine Lounge. Hausregel. Außer, hier ist plötzlich keiner mehr.']])
      :[['NA','Komm wieder, wenn hier weniger los ist. Vielleicht passiert ja mal ein Wunder.']]])};
// Madame bucht keinen Tanz mehr – das macht Nastja selbst, sobald Zeit ist
wrapFn('madame',function(orig){if(FL.recipe&&FL.zwIn&&!FL.traene)return say([['Z','Riecht hier irgendwie nach Gemüse. Und alle Gäste sind weg!'],['Z','Na ja. Nastja hat jetzt jedenfalls Zeit für dich, Süßer. Frag sie selbst.']]);return orig()});
