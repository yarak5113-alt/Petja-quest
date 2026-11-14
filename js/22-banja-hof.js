// ================= Hinter dem Banja (neuer Ort) + Gnom-Zwiebeln =================
// Vor dem Banja führt rechts ein Trampelpfad in den Hinterhof: Rückwand mit der Lüftung der Lounge (dort kommt die Zwiebel rein),
// Kisten mit leeren Flaschen und ein Heuhaufen, in dem Vater Ignati seit 1993 schläft – alle 3 Sekunden steigt ein „Z“ auf, dazu leises Schnarchen.
// Die scharfe Zwiebel wächst im Gemüsebeet der Gnome (neben dem Riesenkohl).

// ----- Ort -----
SCN.banjaH={...SCN.banjaV,seed:171,pe:segPath([[130,512,170,330,448,100],[330,448,100,540,456,70]]),ymin:()=>420,paint:paintBanjaH,
  intro:[['P','Hinterm Banja. Kisten, leere Flaschen, ein Heuhaufen. Und die Lüftung pustet Parfüm in den Wald.'],['P','Moment. Der Heuhaufen … schnarcht.']]};
function paintBanjaH(){const o=S0;sky(o);far(o);ground(o);
  let x=lay();for(let i=0;i<60;i++){const X=R()*820-10,b=206+R()*50;R()<.65?fir(x,X,b,140+R()*170,44+R()*40,.05):trunk(x,X,b,5+R()*8)}put(x,.8);fog(290,.45);
  x=lay();grass(x,3000,o.hz,500,1);details(x);leavesOnPath(x,40);put(x);
  x=lay();const L=40,Rt=500,B=384,T=244,lx=1;
  // Dach von hinten (Traufe mit Schindelenden), dann die Rundholz-Rückwand
  x.fillStyle='#120c14';x.beginPath();x.moveTo(10,T+8);x.lineTo(L+20,150);x.lineTo(Rt-20,150);x.lineTo(Rt+30,T+8);x.fill();
  for(let q=12;q<Rt+28;q+=6){x.fillStyle=rgba(mix([30,24,26],[70,60,56],rn(q|0,5)));x.fillRect(q,T+2,5.4,6)}x.fillStyle='rgba(255,80,170,.15)';x.fillRect(12,T+8,Rt+16,1.4);
  x.save();x.beginPath();x.rect(L-12,T,Rt-L+24,B-T);x.clip();roundLogs(x,L,Rt,B-4,T+8,12,{lx,grey:.2,tone:[100,70,46],ends:[1,1],seed:63});x.restore();
  wallFX(x,QP([[L,T+8],[Rt,T+8],[Rt,B],[L,B]]),L,Rt,T+8,B,{lx,eave:16,dark:.5,side:.15,streaks:[[120,160,330]]});footing(x,L-14,Rt+14,B,8,{lx,grass:false,dark:.6});
  // Hintertür (zu), darüber eine Funzel
  x.fillStyle='#0a0608';x.fillRect(96,292,52,92);for(let X=99;X<145;X+=9.2)wood(x,X,295,9.2,89,1);x.fillStyle='rgba(20,6,16,.55)';x.fillRect(99,295,46,89);
  x.save();x.globalCompositeOperation='lighter';dab(x,122,284,46,[255,170,90],.35);x.restore();ell(x,122,282,4,3,[255,220,150]);
  // Lüftung der Lounge: Blechkasten mit Lamellen, rosa Licht und Dampf
  x.save();x.globalCompositeOperation='lighter';dab(x,330,308,64,[255,60,150],.42);x.restore();
  x.fillStyle='#1a0c12';x.fillRect(298,284,64,48);{const g=x.createLinearGradient(298,284,362,332);g.addColorStop(0,'#b8b4ac');g.addColorStop(.5,'#6a6660');g.addColorStop(1,'#2e2c2a');x.strokeStyle=g}
  x.lineWidth=4;x.strokeRect(300,286,60,44);x.lineWidth=2.6;for(let Y=294;Y<328;Y+=6){x.beginPath();x.moveTo(304,Y);x.lineTo(356,Y);x.stroke()}
  x.fillStyle='rgba(255,90,170,.5)';for(let Y=296;Y<328;Y+=6)x.fillRect(304,Y,52,1.2);[[303,289],[357,289],[303,327],[357,327]].forEach(([X,Y])=>ell(x,X,Y,1.6,1.6,[200,196,186]));
  for(let i=0;i<12;i++)dab(x,330+(rn(i,7)-.5)*16+i*3,278-i*9,8+i*2,[230,210,226],.14);
  // Kisten und leere Flaschen
  [[180,384,46,34],[226,384,40,30],[198,350,40,34]].forEach(([X,Y,w,h])=>{x.fillStyle='rgba(0,0,0,.45)';x.fillRect(X+3,Y-h+3,w,h);wood(x,X,Y-h,w,h,0);x.fillStyle='rgba(20,8,16,.45)';x.fillRect(X,Y-h,w,h);
    x.strokeStyle='rgba(0,0,0,.6)';x.lineWidth=1.2;x.strokeRect(X,Y-h,w,h);x.beginPath();x.moveTo(X,Y-h);x.lineTo(X+w,Y);x.stroke()});
  [[276,390],[288,392],[298,388],[262,394],[312,393]].forEach(([X,Y],i)=>{const g=x.createLinearGradient(X-3,0,X+3,0);g.addColorStop(0,'#1a4a2a');g.addColorStop(.4,'#4a9a6a');g.addColorStop(1,'#0e2a18');x.fillStyle=g;
    if(i==4){x.save();x.translate(X,Y);x.rotate(1.4);x.fillRect(-3,-16,6,16);x.fillRect(-1.4,-22,2.8,6);x.restore()}else{x.fillRect(X-3,Y-16,6,16);x.fillRect(X-1.4,Y-22,2.8,6)}});
  // Heuhaufen (hier schläft der Pope)
  hay(x,610,440,134,66);
  // Bäume vorn, Augen im Dunkeln, Schild zurück
  [[30,500,40],[760,470,26],[800,500,40]].forEach(([X,b,w])=>trunk(x,X,b,w));[[-20,500,360,150],[830,500,360,150],[770,440,300,110]].forEach(([X,b,h,w])=>fir(x,X,b,h,w,0));
  for(let i=0;i<4;i++){const X=560+R()*200,Y=230+R()*90;dab(x,X-4,Y,2.6,[255,220,60],.9);dab(x,X+4,Y,2.6,[255,220,60],.9)}
  sign(x,110,488,1.5,[[-1,0,'Zum Eingang','hBV']]);put(x);
  x=lay();for(let i=0;i<30;i++)dab(x,R()*800,300+R()*200,40+R()*50,[150,140,170],.16);put(x,8,'screen',.5);grade(o)}
// Vor dem Banja: Trampelpfad nach rechts in den Hinterhof, mit Schild
{const pv=SCN.banjaV.paint;SCN.banjaV.paint=function(){pv.apply(this,arguments);const x=lay();
  for(let i=0;i<160;i++){const t=R(),X=560+t*250,Y=468-t*36+(R()-.5)*(26-t*12);dab(x,X,Y,5+R()*7,R()<.6?[46,32,26]:[70,52,40],.45)}
  for(let i=0;i<18;i++){const t=R();dab(x,580+t*220,462-t*34,2+R()*2,[180,120,80],.35)}
  sign(x,690,486,1.5,[[1,0,'Hinterhof','hBH']]);put(x)}}

// ----- Klickflächen (eigener Raum, direkt nach „Vor dem Banja“) -----
{const NS='http://www.w3.org/2000/svg',mk=(tag,at)=>{const e=document.createElementNS(NS,tag);for(const k in at)e.setAttribute(k,at[k]);return e};
  const room=mk('g',{id:'r-banjaH',class:'room'});document.getElementById('r-banjaV').after(room);
  const hit=(id,d,hid)=>{const g=mk('g',{class:'interactive painted'});g.dataset.id=id;const p=mk('path',{class:'hit'});if(d)p.setAttribute('d',d);if(hid)p.id=hid;g.appendChild(p);room.appendChild(g);return g};
  hit('wandH','M40,252L500,252L500,386L40,386Z');hit('tuerH','M96,292L148,292L148,386L96,386Z');hit('kistenH','M176,316L322,316L322,396L176,396Z');
  hit('lueftungH','M292,280L368,280L368,338L292,338Z');hit('heuH','M476,440C486,392 560,374 610,374C660,374 734,392 744,440Z');
  hit('sBV',null,'hBV').classList.add('exit');
  const b=document.querySelector('#r-banjaV');const g=mk('g',{class:'interactive painted exit'});g.dataset.id='sBH';const p=mk('path',{class:'hit',id:'hBH'});g.appendChild(p);b.appendChild(g);
  // Der Pope wandert vom Tresen ins Heu: liegend, mit Strohhalmen drüber und aufsteigenden „Z“
  const pg=document.querySelector('[data-id="pope"]');room.appendChild(pg);delete pg.dataset.a3;
  const s=1.72/1.8*pjAt('banjaH',432)/194,FX=700,FY=396;pg.setAttribute('transform',`translate(${FX},${FY}) rotate(-84) scale(${s.toFixed(3)})`);
  const st=mk('g',{id:'popeStroh','pointer-events':'none'});let d='';for(let i=0;i<26;i++){const X=FX-8-Math.random()*90*s*1.6,Y=FY-14+Math.random()*28;d+=`M${X.toFixed(1)},${Y.toFixed(1)}l${(Math.random()*16-8).toFixed(1)},${(Math.random()*6-3).toFixed(1)}`}
  st.appendChild(mk('path',{d,stroke:'#d8b860','stroke-width':'1.6','stroke-linecap':'round',fill:'none'}));room.appendChild(st);
  const zz=mk('g',{id:'popeZ','pointer-events':'none',transform:`translate(${(FX-196*s).toFixed(0)},${(FY-40*s).toFixed(0)})`});room.appendChild(zz);
  const css=document.createElement('style');css.textContent=`.zzz{font:bold 26px Georgia,serif;fill:#ece4ff;stroke:#241a3a;stroke-width:1.4px;paint-order:stroke;transform-box:fill-box;transform-origin:center;animation:zfly 2.8s ease-out forwards}
  @keyframes zfly{0%{opacity:0;transform:translate(0,0) scale(.45)}18%{opacity:1}100%{opacity:0;transform:translate(22px,-62px) scale(1.35) rotate(-14deg)}}`;document.head.appendChild(css)}
// leises Schnarchen: Einatmen (gefiltertes Rauschen, steigend) + Ausatmen mit tiefem Flattern
function snore(){if(!AC||!MASTER||!BROWN||AC.state!=='running')return;const t=AC.currentTime,v=.05;
  const n=AC.createBufferSource();n.buffer=BROWN;const f=AC.createBiquadFilter();f.type='bandpass';f.Q.value=2.2;f.frequency.setValueAtTime(260,t);f.frequency.linearRampToValueAtTime(520,t+1);
  const g=AC.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.9);g.gain.linearRampToValueAtTime(0,t+1.15);n.connect(f).connect(g).connect(MASTER);n.start(t);n.stop(t+1.2);
  const o=AC.createOscillator();o.type='sawtooth';o.frequency.setValueAtTime(62,t+1.25);o.frequency.linearRampToValueAtTime(48,t+2.2);const lp=AC.createBiquadFilter();lp.type='lowpass';lp.frequency.value=320;
  const tr=AC.createGain(),lfo=AC.createOscillator();lfo.frequency.value=22;const lg=AC.createGain();lg.gain.value=.5;lfo.connect(lg).connect(tr.gain);tr.gain.value=.5;
  const g2=AC.createGain();g2.gain.setValueAtTime(0,t+1.2);g2.gain.linearRampToValueAtTime(v*.7,t+1.4);g2.gain.linearRampToValueAtTime(0,t+2.3);o.connect(lp).connect(tr).connect(g2).connect(MASTER);
  o.start(t+1.2);o.stop(t+2.4);lfo.start(t+1.2);lfo.stop(t+2.4)}
setInterval(()=>{if(cur!=='banjaH'||FL.popeBack||document.hidden)return;const zz=document.getElementById('popeZ');if(!zz)return;
  const z=document.createElementNS('http://www.w3.org/2000/svg','text');z.setAttribute('class','zzz');z.textContent='Z';zz.appendChild(z);setTimeout(()=>z.remove(),3000);snore()},3000);
const popeVis=()=>{const on=!FL.popeBack;['popeStroh','popeZ'].forEach(id=>{const e=document.getElementById(id);if(e)e.style.display=on?'':'none'});const p=document.querySelector('[data-id="pope"]');if(p)p.style.display=on?'':'none'};
const _enterBH=enter;enter=function(id,pos){_enterBH(id,pos);popeVis()};popeVis();

// ----- Texte & Handlungen -----
Object.assign(T,{
  sBH:{n:'Schild: Hinterhof',at:[690,480],go:'banjaH',to:[200,478]},
  sBV:{n:'Schild: Zum Eingang',at:[120,484],go:'banjaV',to:[560,476]},
  wandH:{n:'Rückwand',at:[300,430],l:[[['P','Die Rückwand vom Banja. Durch die Bretter wummert der Bass.'],['P','Die Wand tanzt mehr als ich.']]]},
  tuerH:{n:'Hintertür',at:[122,436],l:[[['P','Die Hintertür. Abgeschlossen. Hier tragen sie nachts die Gäste raus, schätze ich.']]]},
  kistenH:{n:'Leere Flaschen',at:[250,430],l:[[['P','Kisten voller leerer Wodkaflaschen. Das Banja hat einen guten Monat.'],['P','Oder einen schlechten. Kommt drauf an, wen man fragt.']]]},
  heuH:{n:'Heuhaufen',at:[560,452],fn(){if(!FL.popeBack)return T.pope.fn();say([['P','Da ist noch eine Kuhle im Heu. In Popenform. Dreißig Jahre tief.']])}},
  lueftungH:{n:'Lüftung der Lounge',at:[330,430],fn(){
    if(FL.zwIn||FL.traene)return say([['P','Da drin steckt eine Zwiebel. Die Lüftung riecht jetzt wie ein Gemüsemarkt.']]);
    if(has('zwiebel'))return say([['P','Die Lüftung der Lounge. Bläst direkt aufs Sofa, hat Nastja gesagt.'],['P','*quetscht die Zwiebel durchs Gitter* … Rein mit dir.'],['P','Jetzt nur noch einen Privattanz buchen. Und nicht atmen.']],
      ()=>{inv.splice(inv.indexOf('zwiebel'),1);FL.zwIn=1;renderInv()});
    say(FL.trQ&&!FL.zwiebel?[['P','Die Lüftung der Lounge. Warme Luft, Parfüm und Bass.'],['P','(Wenn hier was richtig Scharfes reinkäme … dann heult da drin jeder.)']]
      :[['P','Eine Lüftung. Warme Luft, Parfüm und Bass. Da drin muss die private Lounge sein.']])}},
  pope:{n:'Vater Ignati',at:[560,452],fn(){
    if(!FL.recipe)return hint('popeSchlaf',[[['P','Im Heu liegt ein Pope. Hinter einem Stripclub. Und schnarcht.'],['P','Ich lass ihn schlafen. Wer so schnarcht, hat es sich verdient.']],
      [['P','*leise* Hallo? …'],['P','*Schnarch*. Okay. Der wacht nicht mal auf, wenn die Kirche einstürzt.']],
      [['PO','*murmelt im Schlaf* …nur ein blaues … Pilzchen … zum Entspannen … nur kurz die Augen zu …'],['P','(Ein Pope, der von blauen Pilzen träumt. Ich frag lieber nicht.)']]]);
    say([['P','Vater? … VATER!'],['PO','*schnarch* … nur noch fünf Minuten …'],['P','*kitzelt ihn mit einem Strohhalm an der Nase*'],['PO','HAAA-TSCHI! Wer? Was? Wo bin ich?'],
      ['P','Hinterm Banja. Im Heu. An Ihrer Kirche hängt ein Zettel: „Pope in der Stadt.“ Von 1993.'],['PO','1993?! Ich wollte nach dem Bier nur kurz die Augen zumachen …'],['PO','Das Bier … und so ein blaues Pilzchen dazu. Von der Alten im Wald. „Zum Entspannen“, hat sie gesagt.'],['PO','Seitdem ist alles so … zäh. Als wäre ich nie richtig aufgewacht. Dreißig Jahre, sagst du?'],['P','(Blaue Pilze. Dreißig Jahre im Heu. Notiz an mich: hier nichts essen, was blau ist. Und nirgends lange liegen bleiben.)'],['PO','Herr im Himmel. Die Glocken! Der Kater! Meine Gemeinde!'],
      ['P','Ihre Gemeinde besteht aus einer Oma und einem Kater. Beide sauer.'],['PO','Ich muss zurück. Aber durch den Irrwald? Den find ich nüchtern nicht. Und nüchtern war ich zuletzt 1993.'],
      ['P','Links, links, rechts, geradeaus. Nur halt rückwärts. Also: geradeaus, rechts, links, links.'],['PO','Gott segne dich, mein Sohn. Wir sehen uns an der Kirche.']],
      ()=>{FL.popeBack=1;popeVis();if(typeof a3Vis=='function')a3Vis()})}}});
LOCN.banjaH='Hinter dem Banja';MAPN.banjaH=[10,36];MAPE.push(['banjaV','banjaH']);TTELE.banjaH=[300,470];
MOOD.banjaH=MOOD.banjaV;RECIPE.banjaH=k=>RECIPE.banjaV(k);
BARKS.banjaH=['Der Bass wummert durch die Wand. Die Kisten zittern mit.','Hier hinten riecht es nach Heu, Wodka und Parfüm. In der Reihenfolge.','Im Wald glühen wieder Augen. Ich bleib im Licht.'];
ENTRY.banjaH=['Hinterm Banja. Der Heuhaufen ist noch da.','Wieder hinterm Banja. Hier ist es ruhiger. Bis auf den Bass.'];

// ----- Gemüsebeet der Gnome: Zwiebeln neben dem Riesenkohl -----
function paintZwiebeln(tf){const x=lay();x.save();if(tf){x.translate(tf[0],tf[1]);x.scale(tf[2],tf[2])}
  [[44,466],[70,470],[96,466],[198,462],[222,466],[124,470],[34,424],[208,428]].forEach(([X,Y])=>{shadowAt(x,X,Y+2,8,.5);
    const g=x.createRadialGradient(X-3,Y-6,1,X,Y-4,9);g.addColorStop(0,'#e890c0');g.addColorStop(.5,'#a83a6a');g.addColorStop(1,'#5a1434');x.fillStyle=g;
    x.beginPath();x.moveTo(X,Y-14);x.bezierCurveTo(X+4,Y-10,X+9,Y-7,X+8,Y-2);x.bezierCurveTo(X+7,Y+2,X-7,Y+2,X-8,Y-2);x.bezierCurveTo(X-9,Y-7,X-4,Y-10,X,Y-14);x.fill();
    x.strokeStyle='#4a9a3a';x.lineWidth=1.6;x.lineCap='round';[[-5,-30],[0,-34],[5,-28]].forEach(([dx,dy])=>{x.beginPath();x.moveTo(X,Y-13);x.quadraticCurveTo(X+dx*.4,Y+dy*.6,X+dx,Y+dy);x.stroke()})});x.restore();put(x)}
T.kohl.n='Gemüsebeet';
wrapFn('kohl',function(orig){
  if(FL.recipe&&!FL.zwiebel&&!FL.traene&&!has('traene'))return say([['P','Zwiebeln! Neben dem Riesenkohl wachsen Zwiebeln.'],['P','*zieht eine raus* … AAH. Meine Augen. Schon beim Rausziehen.'],
    ['N1','He! Finger weg von Schnobbels Gemüse!'],['P','Nur eine. Für einen guten Zweck. Ich will eine Nymphe zum Weinen bringen.'],['N1','… Das ist der schlechteste gute Zweck, den ich je gehört hab. Nimm sie und geh.']],
    ()=>{FL.zwiebel=1;inv.push('zwiebel');renderInv()});
  if(!FL.recipe)return say([['P','Ein Gemüsebeet. Riesenkohl und Zwiebeln, so scharf, dass die Luft flimmert.'],['N1','Finger weg! Das ist Schnobbels Rente!']]);
  return orig()});
Object.assign(ITEMS.zwiebel,{1:'Gnomzwiebel',2:'Aus dem Gemüsebeet der Gnome. Schon durch die Tasche tränen mir die Augen.'});
ITEMS.traene[2]='Eine echte Träne von Nastja. Dank einer Gnomzwiebel in der Lüftung. Ich bin kein guter Mensch.';
