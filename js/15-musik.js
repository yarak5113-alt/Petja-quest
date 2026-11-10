// ================= Musik: Russischer Lo-Fi – Volksinstrumente auf entspanntem Groove =================
// Keine Lieder in Schleife: Akkordfolgen, Melodien, Instrumentwahl und Aufbau (Intro → Groove → Break → Pause) werden laufend neu gewürfelt.
// Instrumente (alle live erzeugt):
//   Balalaika  – dreieckige Zupflaute, hell/twangy (Saitenmodell + heller Korpus)
//   Domra      – runde Zupflaute, weich, mit Tremolo (Saitenmodell + runder Korpus)
//   Gusli      – Brettzither, harfenartig, lange klingende Arpeggios
//   Bajan      – Knopfakkordeon: verstimmte Zungen (Musette) + Balg-Schwellen
//   Swirel     – Hirtenflöte mit Atemgeräusch und spätem Vibrato
//   Schaleika  – nasale Rohrblatt-Pfeife, Ton rutscht von unten an
//   Loschki (Holzlöffel), Buben (Schellentrommel), dazu leiser Lo-Fi-Beat, E-Piano und Bass
// Wechselt nur, wenn die Stimmung wechselt. Lautstärke: Menü → Einstellungen (OPT.mus).
// Liegt assets/sound/mus-<stimmung>.mp3 vor, wird stattdessen die Datei leise geloopt.
if(OPT.mus==null)OPT.mus=.35;
const MOOD={wald:'wald',gabel:'wald',gnome:'gnome',huette:'dunkel',sperre:'dunkel',irrwald:'irrwald',dorf:'dorf',dorfstr:'dorf',kirche:'kirche',
  muehle:'wasser',fischer:'wasser',ufer:'wasser',unter:'wasser',sumpf:'sumpf',hoehle:'hoehle',innen:'innen'};
const C=(n,b)=>({n,b});
// comp = Begleitung (gusli | bajan | ep), lead = Melodie-Instrumente (pro Phrase gewürfelt), kit = Beat (full|soft|shaker|none), loschki/buben = Volks-Percussion
const MUSIK={
  // Birkenwald/Gabelung: sonnig – Gusli-Arpeggios, Swirel und Domra, Holzlöffel, leichter Beat
  wald:{bpm:[88,96],swing:.58,kit:'soft',loschki:1,comp:'gusli',lead:['swirel','domra','swirel'],cut:4000,mel:[62,64,66,69,71,74,76,78],
    progs:[[C([62,66,69,73],38),C([59,62,66,69],47),C([55,59,62,66],43),C([57,61,64,67],45)],
           [C([55,59,62,66],43),C([57,61,64,67],45),C([62,66,69,73],38),C([59,62,66,69],47)]]},
  // Gnome: verschmitzt – Bajan-Nachschläge, Balalaika, Löffel und Schellentrommel
  gnome:{bpm:[100,108],swing:.55,kit:'soft',loschki:1,buben:1,comp:'bajan',lead:['balalaika','schaleika'],cut:3800,mel:[64,67,69,71,74,76],
    progs:[[C([60,64,67],36),C([62,65,69],38),C([59,64,67],40),C([60,64,67],36)],[C([60,64,67],36),C([57,60,64],45),C([62,65,69],38),C([59,62,67],43)]]},
  // Wasser: chillig – E-Piano, Domra-Tremolo und Gusli-Tropfen
  wasser:{bpm:[76,84],swing:.6,kit:'soft',comp:'ep',lead:['domra','gusli'],cut:3000,mel:[60,62,64,67,69,72,74,76],
    progs:[[C([57,60,64,65],41),C([55,59,62,64],40),C([57,60,62,65],38),C([55,59,60,64],36)],
           [C([57,60,64,65],41),C([55,59,60,64],36),C([57,60,62,65],38),C([55,59,62,64],40)]]},
  // Dunkel (Hütte, dunkler Wald): tiefer Bajan, Domra in Moll, nur Rimshot
  dunkel:{bpm:[72,80],swing:.57,kit:'soft',comp:'bajan',low:1,lead:['domra'],cut:1800,mel:[57,60,62,64,65,68,69],
    progs:[[C([57,60,64],45),C([53,57,62],38),C([56,59,64],40),C([57,60,64],45)],[C([57,60,64],45),C([57,60,65],41),C([56,59,62],40),C([57,60,64],45)]]},
  // Irrwald: unheimlich – Gusli-Tropfen im Hall, Schaleika von weit weg, kein Beat
  irrwald:{bpm:[66,72],swing:.5,kit:'none',comp:'gusli',lead:['schaleika','gusli'],cut:2000,space:1,mel:[57,58,61,62,64,65,68],
    progs:[[C([57,61,64],45),C([58,62,65],46),C([57,61,64],45),C([56,59,62],44)]]},
  // Sumpf: schwül – Bajan-Brummen, faule Schaleika, Shaker
  sumpf:{bpm:[66,72],swing:.62,kit:'shaker',comp:'bajan',low:1,lead:['schaleika'],cut:1500,mel:[52,55,57,59,62,64,67],
    progs:[[C([55,59,62,64],40),C([55,59,60,64],36),C([55,57,60,64],45),C([57,59,63,66],47)]]},
  // Hütte innen: Hexenküche – Gusli, Schaleika, Holzlöffel, kein Beat
  innen:{bpm:[92,100],swing:.6,kit:'none',loschki:1,comp:'gusli',lead:['schaleika','balalaika'],cut:3000,mel:[62,63,66,67,69,70,74],
    progs:[[C([62,66,69],38),C([63,67,70],39),C([62,66,69],38),C([60,63,67],36)]]},
  // Höhle: nur Gusli-Töne mit viel Hall
  hoehle:{bpm:[60,64],swing:.5,kit:'none',comp:'gusli',sparse:1,lead:[],cut:2200,mel:[57,60,64,67,69,72],progs:[[C([57,60,64,67],45),C([57,60,64,65],41)]]},
  // Kirche: ruhig – Gusli und Swirel von fern
  kirche:{bpm:[64,70],swing:.5,kit:'none',comp:'gusli',lead:['swirel'],cut:1800,space:1,mel:[62,64,65,67,69,72],
    progs:[[C([62,65,69],38),C([60,64,67],36),C([58,62,65],46),C([57,61,64],45)]]},
  // Startmenü: Bajan und Domra, ganz entspannt
  titel:{bpm:[78,84],swing:.58,kit:'soft',comp:'bajan',lead:['domra','swirel'],cut:2600,mel:[57,60,62,64,67,69,72],
    progs:[[C([57,60,64,67],45),C([57,60,62,65],38),C([55,59,62,65],43),C([55,59,60,64],36)]]},
  // Dorf: Dorffest – schnelle Balalaika, Bajan-Begleitung, Holzlöffel, Schellentrommel
  dorf:{balalaika:1}};
['wald','gnome','dunkel','irrwald','dorf','kirche','wasser','sumpf','hoehle','innen','titel'].forEach(m=>probe('mus-'+m));
let MUS=null,MREV=null,musNow=null,musCur='';
const mtof=m=>440*Math.pow(2,(m-69)/12);
function musInit(){if(MUS||!AC)return;MUS=AC.createGain();MUS.gain.value=OPT.mus;MUS.connect(AC.destination);
  const len=AC.sampleRate*3|0,ir=AC.createBuffer(2,len,AC.sampleRate);for(let c=0;c<2;c++){const d=ir.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.6)}
  MREV=AC.createConvolver();MREV.buffer=ir;const w=AC.createGain();w.gain.value=.5;MREV.connect(w);w.connect(MUS)}
function musVolume(){if(MUS)MUS.gain.setTargetAtTime(OPT.mus,AC.currentTime,.1);if(musNow&&musNow.el)musNow.el.volume=Math.min(1,OPT.mus)}

// ----- Saitenmodell (Karplus-Strong): Rauschimpuls in einer Verzögerungsschleife wird zur Saite -----
const KS={};
function ksBuf(m,damp,len){const key=m+'_'+damp;if(KS[key])return KS[key];const sr=AC.sampleRate,N=Math.max(2,Math.round(sr/mtof(m))),L=sr*(len||1.8)|0,b=AC.createBuffer(1,L,sr),y=b.getChannelData(0);
  for(let i=0;i<N;i++)y[i]=Math.random()*2-1;for(let i=1;i<N;i++)y[i]=.6*y[i]+.4*y[i-1];
  const d=damp*(m>76?.997:1);for(let i=N;i<L;i++)y[i]=d*.5*(y[i-N]+y[i-N+1]);return KS[key]=b}

// ----- Instrumente (Ziel = Gain-Knoten) -----
function instruments(dest){
  const body={},BODY={balalaika:[.997,1700,5,4200,1.8],domra:[.998,1050,4,2800,2],gusli:[.9994,2600,2,5200,3.5],gitarre:[.997,900,2,2600,1.8]};
  const chain=k=>{if(body[k])return body[k];const[, f,g,lpf]=BODY[k],hp=AC.createBiquadFilter(),pk=AC.createBiquadFilter(),lp=AC.createBiquadFilter();hp.type='highpass';hp.frequency.value=150;
    pk.type='peaking';pk.frequency.value=f;pk.gain.value=g;pk.Q.value=1.1;lp.type='lowpass';lp.frequency.value=lpf;hp.connect(pk);pk.connect(lp);lp.connect(dest);return body[k]=hp};
  const pluck=(k,m,t,v)=>{const[damp,,,,len]=BODY[k],s=AC.createBufferSource(),g=AC.createGain();s.buffer=ksBuf(m,damp,len);s.playbackRate.value=1+(Math.random()-.5)*.003;g.gain.value=v;s.connect(g);g.connect(chain(k));s.start(t);s.stop(t+len)};
  const trem=(k,m,t,dur,v,rate)=>{const r=rate||rnd(11,13);let n=0;for(let tt=t;tt<t+dur-.04;tt+=1/r,n++)pluck(k,m,tt,v*(n%2?.7:1)*(1-.2*(tt-t)/dur))};
  const arp=(k,ms,t,step,v,down)=>{(down?[...ms].reverse():ms).forEach((m,i)=>pluck(k,m,t+i*step,v*(1-i*.06)))};
  // Bajan: zwei leicht gegeneinander verstimmte Zungen + Bass-Zunge, Formant, Balg schwillt an und ab
  const bajan=(ms,t,dur,v,low)=>{const g=AC.createGain(),bp=AC.createBiquadFilter(),lp=AC.createBiquadFilter(),bel=AC.createOscillator(),bg=AC.createGain();
    bp.type='bandpass';bp.frequency.value=low?800:1150;bp.Q.value=.6;lp.type='lowpass';lp.frequency.value=low?1800:3000;bp.connect(lp);lp.connect(g);g.connect(dest);
    bel.frequency.value=rnd(.4,.7);bg.gain.value=v*.18;bel.connect(bg);bg.connect(g.gain);
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.07);g.gain.setValueAtTime(v,t+dur-.08);g.gain.exponentialRampToValueAtTime(.0001,t+dur+.1);
    const os=[bel];ms.forEach(m=>{const f=mtof(m);[[-8,'sawtooth',.5],[8,'sawtooth',.5],[0,'square',.18]].forEach(([dt,ty,a])=>{const o=AC.createOscillator(),og=AC.createGain();o.type=ty;o.frequency.value=f*(ty=='square'?.5:1);o.detune.value=dt;og.gain.value=a/ms.length;o.connect(og);og.connect(bp);os.push(o)})});
    os.forEach(o=>{o.start(t);o.stop(t+dur+.15)})};
  // Swirel: Flöte – Grundton + leiser Oberton + Atemgeräusch, Vibrato setzt spät ein
  const swirel=(m,t,dur,v)=>{const f=mtof(m),g=AC.createGain(),lp=AC.createBiquadFilter(),o=AC.createOscillator(),o2=AC.createOscillator(),g2=AC.createGain(),vib=AC.createOscillator(),vg=AC.createGain();
    lp.type='lowpass';lp.frequency.value=3200;o.frequency.value=f;o2.frequency.value=f*2;g2.gain.value=.12;vib.frequency.value=5.3;vg.gain.setValueAtTime(0,t);vg.gain.linearRampToValueAtTime(f*.007,t+Math.min(.5,dur*.6));
    vib.connect(vg);vg.connect(o.frequency);vg.connect(o2.frequency);o.connect(lp);o2.connect(g2);g2.connect(lp);lp.connect(g);g.connect(dest);
    const s=AC.createBufferSource(),bx=AC.createBiquadFilter(),bg=AC.createGain();s.buffer=NOISE;bx.type='bandpass';bx.frequency.value=f*1.5;bx.Q.value=4;bg.gain.value=.35;s.connect(bx);bx.connect(bg);bg.connect(g);
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.07);g.gain.setValueAtTime(v,t+dur-.1);g.gain.exponentialRampToValueAtTime(.0001,t+dur+.12);
    [o,o2,vib].forEach(x=>{x.start(t);x.stop(t+dur+.15)});s.start(t,Math.random());s.stop(t+dur+.15)};
  // Schaleika: nasale Rohrblatt-Pfeife – Rechteck + Säge durch enges Formantfilter, Ton rutscht von unten an
  const schaleika=(m,t,dur,v)=>{const f=mtof(m),g=AC.createGain(),bp=AC.createBiquadFilter(),lp=AC.createBiquadFilter(),o=AC.createOscillator(),o2=AC.createOscillator(),g2=AC.createGain(),vib=AC.createOscillator(),vg=AC.createGain();
    bp.type='bandpass';bp.frequency.value=1500;bp.Q.value=1.6;lp.type='lowpass';lp.frequency.value=3600;o.type='square';o2.type='sawtooth';g2.gain.value=.5;
    [o,o2].forEach(x=>{x.frequency.setValueAtTime(f*.955,t);x.frequency.exponentialRampToValueAtTime(f,t+.07)});vib.frequency.value=6;vg.gain.value=f*.009;vib.connect(vg);vg.connect(o.frequency);vg.connect(o2.frequency);
    o.connect(bp);o2.connect(g2);g2.connect(bp);bp.connect(lp);lp.connect(g);g.connect(dest);
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.04);g.gain.setValueAtTime(v*.85,t+dur-.08);g.gain.exponentialRampToValueAtTime(.0001,t+dur+.08);
    [o,o2,vib].forEach(x=>{x.start(t);x.stop(t+dur+.1)})};
  const hit=(t,type,f,q,v,dec)=>{const s=AC.createBufferSource(),x=AC.createBiquadFilter(),g=AC.createGain();s.buffer=NOISE;x.type=type;x.frequency.value=f;x.Q.value=q;s.connect(x);x.connect(g);g.connect(dest);
    g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+dec);s.start(t,Math.random()*1.5);s.stop(t+dec+.02)};
  const loschki=(t,v,hi)=>{hit(t,'bandpass',hi?2500:1650,16,v,.05);hit(t+.012,'bandpass',hi?2500:1650,16,v*.5,.04)};
  const buben=(t,v)=>hit(t,'highpass',6500,.5,v,.12);
  return{pluck,trem,arp,bajan,swirel,schaleika,loschki,buben,hit}}

function makeMusic(name){const M=MUSIK[name];if(!M)return null;
  if(SNDOK['mus-'+name]){const el=new Audio(SNDOK['mus-'+name]);el.loop=true;el.volume=0;el.play().catch(()=>{});let v=0;const fi=setInterval(()=>{v=Math.min(1,v+.03);el.volume=v*Math.min(1,OPT.mus);if(v>=1)clearInterval(fi)},100);
    return{el,stop(){clearInterval(fi);const fo=setInterval(()=>{el.volume=Math.max(0,el.volume-.03);if(el.volume<=0){clearInterval(fo);el.pause()}},100)}}}
  const out=AC.createGain();out.gain.value=0;out.connect(MUS);out.gain.setTargetAtTime(1,AC.currentTime,2.5);const tim=[];let alive=true;
  const stop=()=>{alive=false;tim.forEach(t=>{clearTimeout(t);clearInterval(t)});out.gain.setTargetAtTime(0,AC.currentTime,2);setTimeout(()=>out.disconnect(),9000)};
  if(M.balalaika){out.connect(MREV);dorffest(out,tim,()=>alive);return{stop}}
  band(M,out,tim,()=>alive);return{stop}}

// ----- Band: Groove + Volksinstrumente -----
function band(M,out,tim,alive){
  const bus=AC.createGain(),lp=AC.createBiquadFilter();lp.type='lowpass';lp.frequency.value=M.cut;lp.Q.value=.4;bus.gain.value=.5;bus.connect(lp);lp.connect(out);
  const send=AC.createGain();send.gain.value=M.sparse||M.space?.9:.3;send.connect(MREV);bus.connect(send);
  const I=instruments(bus);
  const wow=AC.createOscillator(),wg=AC.createGain();wow.frequency.value=.35;wg.gain.value=6;wow.connect(wg);wow.start();
  const ep=(m,t,dur,v)=>{const f=mtof(m),c=AC.createOscillator(),mo=AC.createOscillator(),mi=AC.createGain(),g=AC.createGain();c.frequency.value=f;mo.frequency.value=f;wg.connect(c.detune);
    mi.gain.setValueAtTime(f*1.1,t);mi.gain.exponentialRampToValueAtTime(f*.15,t+.7);mo.connect(mi);mi.connect(c.frequency);c.connect(g);g.connect(bus);
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.008);g.gain.exponentialRampToValueAtTime(v*.45,t+.35);g.gain.exponentialRampToValueAtTime(.0001,t+dur+.6);[c,mo].forEach(o=>{o.start(t);o.stop(t+dur+.7)})};
  const bass=(m,t,dur,v)=>{const o=AC.createOscillator(),g=AC.createGain(),x=AC.createBiquadFilter();x.type='lowpass';x.frequency.value=260;o.frequency.value=mtof(m);o.connect(x);x.connect(g);g.connect(bus);
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.02);g.gain.exponentialRampToValueAtTime(v*.6,t+dur*.6);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.start(t);o.stop(t+dur+.05)};
  const kick=(t,v)=>{const o=AC.createOscillator(),g=AC.createGain();o.frequency.setValueAtTime(130,t);o.frequency.exponentialRampToValueAtTime(46,t+.12);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+.38);o.connect(g);g.connect(bus);o.start(t);o.stop(t+.4)};
  const snare=(t,v)=>{I.hit(t,'bandpass',1900,.7,v,.16)},rim=(t,v)=>I.hit(t,'bandpass',1700,9,v,.035),hat=(t,v)=>I.hit(t,'highpass',7500,.5,v,.035),shaker=(t,v)=>I.hit(t,'bandpass',5200,1.4,v,.07);
  tim.push(setInterval(()=>{if(Math.random()<.4)I.hit(AC.currentTime+Math.random()*.2,'lowpass',3000,.5,rnd(.008,.025),.01)},200));
  const comp=(ch,t,beat,sec)=>{const k=M.comp;
    if(k=='ep')ch.n.forEach((m,i)=>ep(m,t+i*.012,beat*2.2,.055*(i?.8:1)));
    else if(k=='bajan')I.bajan(ch.n.map(m=>M.low?m-12:m),t,beat*(sec=='pad'?4:1.8),.07,M.low);
    else{const ms=ch.n.concat([ch.n[0]+12]);I.arp('gusli',ms,t,.09,.2)}};
  const bpm=rnd(M.bpm[0],M.bpm[1]),s16=60/bpm/4,sw=M.swing;let step=0,nextT=AC.currentTime+.4,prog=pick(M.progs),mel=pick(M.mel),melBar=false,lead=pick(M.lead.length?M.lead:['gusli']),hold=0;
  const section=bar=>{const b=bar%32;if(M.sparse)return b%2?'rest':'pad';if(b<4)return'intro';if(b<12)return'groove';if(b<14)return'break';if(b<28)return'groove';if(b<30)return'outro';return'rest'};
  const sched=(st,t)=>{const bar=st/16|0,pos=st%16,sec=section(bar),ch=prog[bar%prog.length],beat=s16*4;
    if(pos==0&&bar%prog.length==0){if(bar>0)prog=pick(M.progs);if(M.lead.length)lead=pick(M.lead)}
    if(pos==0)melBar=M.lead.length&&(sec=='groove'||sec=='break'||(sec=='intro'&&bar%4==3))&&Math.random()<.6;
    if(sec=='rest')return;
    // Begleitung
    if(pos==0)comp(ch,t,beat,sec);
    if(pos==8&&M.comp=='gusli'&&sec!='pad'&&Math.random()<.6)I.arp('gusli',ch.n.concat([ch.n[0]+12]),t,.08,.16,true);
    if(M.comp=='bajan'&&(pos==8)&&sec=='groove')I.bajan(ch.n.map(m=>M.low?m-12:m),t,beat*1.6,.06,M.low);
    if(M.comp=='ep'&&pos==6&&Math.random()<.5)ch.n.forEach((m,i)=>ep(m,t+i*.012,beat*.8,.04));
    // Bass
    if(sec=='groove'||sec=='break'||sec=='outro'){if(pos==0)bass(ch.b,t,beat*1.6,.22);if(pos==8&&Math.random()<.7)bass(ch.b+(Math.random()<.5?7:0),t,beat*1.2,.18)}
    // Beat
    if(sec=='groove'&&M.kit!='none'){const full=M.kit=='full';
      if(pos==0||(pos==10&&Math.random()<.6))kick(t,full?.5:.36);
      if(pos==4||pos==12)M.kit=='shaker'?rim(t,.12):full?snare(t,.2):rim(t,.15);
      if(pos%2==0)M.kit=='shaker'?shaker(t,rnd(.03,.06)):hat(t,(pos%4==0?.045:.028)*rnd(.7,1.1))}
    // Volks-Percussion: Holzlöffel (Hi/Lo im Wechsel), Schellentrommel
    if(M.loschki&&(sec=='groove'||sec=='break')&&[0,3,4,6,8,11,12,14].includes(pos)&&Math.random()<.85)I.loschki(t,pos%4==0?.13:.08,pos%8>=4);
    if(M.buben&&sec=='groove'){if(pos==4||pos==12)I.buben(t,.06);else if(pos%2==1&&Math.random()<.4)I.buben(t,.02)}
    // Melodie
    if(hold>0){hold--;return}
    if(melBar&&[0,2,3,6,8,10,12,14].includes(pos)&&Math.random()<.5){const i=M.mel.indexOf(mel);mel=M.mel[Math.max(0,Math.min(M.mel.length-1,i+pick([-2,-1,1,1,2,0,-1])))];
      const n16=pick([2,3,4,6]),dur=n16*s16;hold=n16-1;
      if(lead=='swirel')I.swirel(mel,t,dur,.1);else if(lead=='schaleika')I.schaleika(mel,t,dur,.07);
      else if(lead=='domra'){n16>=4?I.trem('domra',mel,t,dur,.3):I.pluck('domra',mel,t,.38)}
      else if(lead=='balalaika'){n16>=4?I.trem('balalaika',mel,t,dur,.28,13):I.pluck('balalaika',mel,t,.36)}
      else{I.pluck('gusli',mel+12,t,.3);hold=0}}};
  tim.push(setInterval(()=>{if(!alive())return;while(nextT<AC.currentTime+.3){sched(step,nextT);nextT+=s16*2*(step%2==0?sw:1-sw);step++}},60))}

// ----- Dorffest: schnelle Balalaika-Phrasen, Bajan-Begleitung, Holzlöffel, Schellentrommel; dazwischen Pausen -----
function dorffest(out,tim,alive){
  const g=AC.createGain();g.gain.value=.36;g.connect(out);const I=instruments(g);
  const A=57,CH={Am:[0,3,7],Dm:[5,8,12],E:[7,11,14],G:[-2,2,5],C:[3,7,10],F:[-4,0,3]};
  const PROGS=[{p:['Am','E','E','Am'],sc:[0,2,3,5,7,8,11]},{p:['C','G','G','C'],sc:[0,2,3,5,7,8,10]},{p:['Am','Dm','G','C'],sc:[0,2,3,5,7,8,10]},
    {p:['F','C','E','Am'],sc:[0,2,3,5,7,8,11]},{p:['Am','Dm','E','Am'],sc:[0,2,3,5,7,8,11]}];
  const RHY=[[.5,.5,.5,.5,1,1],[1,.5,.5,1,1],[.5,.5,1,.5,.5,1],[1,1,.5,.5,1],[.5,.5,.5,.5,2],[1,.5,.5,2]];
  let mel=69;
  const phrase=(t0,bpm,withBajan)=>{const beat=60/bpm,P=pick(PROGS),inSc=m=>P.sc.includes(((m-A)%12+12)%12);let t=t0;
    for(let bar=0;bar<4;bar++){const ch=CH[P.p[bar]],pcs=ch.map(c=>((c%12)+12)%12);
      I.pluck('balalaika',A-12+ch[0],t,.45);I.pluck('balalaika',A-12+ch[0]+7,t+2*beat,.36);
      if(withBajan){I.bajan(ch.map(c=>A+c),t+beat,beat*.8,.05);I.bajan(ch.map(c=>A+c),t+3*beat,beat*.8,.05)}
      else{[1,3].forEach(b=>I.arp('balalaika',ch.map(c=>A+c),t+b*beat,.012,.22))}
      [1,3].forEach(b=>I.buben(t+b*beat,.05));[0,.5,1,1.5,2,2.5,3,3.5].forEach((b,i)=>I.loschki(t+b*beat,i%2?.06:.1,i%4>=2));
      const last=bar==3,rh=last?[.5,.5,1,2]:pick(RHY);let bt=0;
      rh.forEach((d,i)=>{let cand=[];for(let m=mel-5;m<=mel+5;m++)if(m>=64&&m<=81&&inSc(m))cand.push(m);
        if(i==0||d>=1){const ct=cand.filter(m=>pcs.includes(((m-A)%12+12)%12));if(ct.length)cand=ct}if(!cand.length)cand=[mel];
        mel=last&&i==rh.length-1?A+12+ch[0]:pick(cand.sort((a,b)=>Math.abs(a-mel)-Math.abs(b-mel)).slice(0,3));
        const st=t+bt*beat,du=d*beat;d>=1?I.trem('balalaika',mel,st,du,.4,13):I.pluck('balalaika',mel,st,.5);bt+=d});
      t+=4*beat}
    return t};
  const loop=()=>{if(!alive())return;const bpm=rnd(120,138);let t=AC.currentTime+.2;const n=2+(Math.random()*2|0),bj=Math.random()<.7;for(let i=0;i<n;i++)t=phrase(t,bpm,bj);
    tim.push(setTimeout(loop,(t-AC.currentTime)*1000+rnd(8000,18000)))};
  tim.push(setTimeout(loop,rnd(1500,4000)))}

setInterval(()=>{if(!AC||AC.state!=='running')return;musInit();const want=$('#start')?'titel':(MOOD[cur]||'');if(want===musCur)return;musCur=want;if(musNow)musNow.stop();musNow=want?makeMusic(want):null},400);
