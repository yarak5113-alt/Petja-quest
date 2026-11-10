// ================= Musik: entspannter Lo-Fi-Groove + Balalaika im Dorf =================
// Keine Lieder in Schleife: Akkordfolgen, Melodien und Aufbau (Intro → Beat → Break → Pause) werden laufend neu gewürfelt.
// Instrumente: E-Piano (FM, Rhodes-artig), weicher Bass, gezupfte Gitarre (Saitenmodell), Lo-Fi-Schlagzeug mit Swing, Vinyl-Knistern.
// Wechselt nur, wenn die Stimmung wechselt (lange Überblendung). Lautstärke: Menü → Einstellungen (OPT.mus).
// Liegt assets/sound/mus-<stimmung>.mp3 vor, wird stattdessen die Datei leise geloopt.
if(OPT.mus==null)OPT.mus=.35;
const MOOD={wald:'wald',gabel:'wald',gnome:'wald',huette:'dunkel',sperre:'dunkel',irrwald:'dunkel',dorf:'dorf',dorfstr:'dorf',kirche:'kirche',
  muehle:'wasser',fischer:'wasser',ufer:'wasser',unter:'wasser',sumpf:'sumpf',hoehle:'hoehle',innen:'innen'};
// Akkorde als MIDI-Töne (Mittellage), bass = Grundton, mel = Melodietöne, bpm, drums: full|soft|shaker|none, cut = Helligkeit
const C=(n,b)=>({n,b});
const MUSIK={
  // Birkenwald/Gabelung/Gnome: sonnig, D-Dur mit Septakkorden
  wald:{bpm:[86,94],swing:.58,drums:'full',cut:3200,vol:1,mel:[62,64,66,69,71,74,76,78],
    progs:[[C([62,66,69,73],38),C([59,62,66,69],35+12),C([55,59,62,66],43),C([57,61,64,67],45)],
           [C([55,59,62,66],43),C([57,61,64,67],45),C([62,66,69,73],38),C([59,62,66,69],47)],
           [C([62,66,69,73],38),C([55,59,62,66],43),C([55,59,62,64],40),C([57,61,64,67],45)]]},
  // Wasser: chillig-jazzig, F-Lydisch
  wasser:{bpm:[76,84],swing:.6,drums:'soft',cut:2600,vol:1,mel:[60,62,64,67,69,72,74,76],
    progs:[[C([57,60,64,65],41),C([55,59,62,64],40),C([57,60,62,65],38),C([55,59,60,64],36)],
           [C([57,60,64,65],41),C([55,59,60,64],36),C([57,60,62,65],38),C([55,59,62,64],40)]]},
  // Dunkel (Hütte, dunkler Wald, Irrwald): cooles Moll mit Spannung statt traurig
  dunkel:{bpm:[72,80],swing:.57,drums:'soft',cut:1500,vol:.9,mel:[57,60,62,64,67,69,72],
    progs:[[C([60,64,67,71],45),C([57,60,64,65],41),C([57,60,64,65],38),C([56,62,67],40)],
           [C([60,64,67,71],45),C([60,64,67,71],45),C([57,60,64,65],41),C([56,62,67],40)]]},
  // Sumpf: schwül und träge, E-Moll, Shaker
  sumpf:{bpm:[68,74],swing:.62,drums:'shaker',cut:1100,vol:.9,wobble:18,mel:[52,55,57,59,62,64,67,69],
    progs:[[C([55,59,62,64],40),C([55,59,60,64],36),C([55,57,60,64],45),C([57,59,63,66],47)]]},
  // Hütte innen: verspielt, ii–V–I
  innen:{bpm:[88,96],swing:.6,drums:'soft',cut:2400,vol:.9,mel:[60,62,64,67,69,72,74],
    progs:[[C([57,60,62,65],38),C([55,59,62,65],43),C([55,59,60,64],36),C([55,57,61,64],45)]]},
  // Höhle: kein Beat, nur ab und zu ein E-Piano-Akkord mit viel Hall
  hoehle:{bpm:[60,64],swing:.5,drums:'none',cut:1300,vol:2.4,sparse:1,mel:[57,60,64,67,69,72],
    progs:[[C([60,64,67,71],45),C([57,60,64,65],41)]]},
  // Startmenü: entspannt
  titel:{bpm:[78,84],swing:.58,drums:'soft',cut:2200,vol:.9,mel:[57,60,62,64,67,69,72],
    progs:[[C([57,60,64,67],45),C([57,60,62,65],38),C([55,59,62,65],43),C([55,59,60,64],36)]]},
  // Dorf: Balalaika – schnell und tanzbar, mit Tamburin; Kirche: dieselbe Balalaika aus der Ferne
  dorf:{balalaika:1,far:0},kirche:{balalaika:1,far:1}};
['wald','dunkel','dorf','kirche','wasser','sumpf','hoehle','innen','titel'].forEach(m=>probe('mus-'+m));
let MUS=null,MREV=null,musNow=null,musCur='';
const mtof=m=>440*Math.pow(2,(m-69)/12);
function musInit(){if(MUS||!AC)return;MUS=AC.createGain();MUS.gain.value=OPT.mus;MUS.connect(AC.destination);
  const len=AC.sampleRate*3|0,ir=AC.createBuffer(2,len,AC.sampleRate);for(let c=0;c<2;c++){const d=ir.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.6)}
  MREV=AC.createConvolver();MREV.buffer=ir;const w=AC.createGain();w.gain.value=.5;MREV.connect(w);w.connect(MUS)}
function musVolume(){if(MUS)MUS.gain.setTargetAtTime(OPT.mus,AC.currentTime,.1);if(musNow&&musNow.el)musNow.el.volume=Math.min(1,OPT.mus)}

// Saitenmodell (Karplus-Strong) – für Gitarre und Balalaika
const KS={};
function ksBuf(m){if(KS[m])return KS[m];const sr=AC.sampleRate,N=Math.max(2,Math.round(sr/mtof(m))),len=sr*1.8|0,b=AC.createBuffer(1,len,sr),y=b.getChannelData(0);
  for(let i=0;i<N;i++)y[i]=Math.random()*2-1;for(let i=1;i<N;i++)y[i]=.6*y[i]+.4*y[i-1];
  const damp=m>76?.993:.997;for(let i=N;i<len;i++)y[i]=damp*.5*(y[i-N]+y[i-N+1]);return KS[m]=b}

function makeMusic(name){const M=MUSIK[name];if(!M)return null;
  if(SNDOK['mus-'+name]){const el=new Audio(SNDOK['mus-'+name]);el.loop=true;el.volume=0;el.play().catch(()=>{});let v=0;const fi=setInterval(()=>{v=Math.min(1,v+.03);el.volume=v*Math.min(1,OPT.mus);if(v>=1)clearInterval(fi)},100);
    return{el,stop(){clearInterval(fi);const fo=setInterval(()=>{el.volume=Math.max(0,el.volume-.03);if(el.volume<=0){clearInterval(fo);el.pause()}},100)}}}
  const out=AC.createGain();out.gain.value=0;out.connect(MUS);out.gain.setTargetAtTime(1,AC.currentTime,2.5);const tim=[];let alive=true;
  const stop=()=>{alive=false;tim.forEach(t=>{clearTimeout(t);clearInterval(t)});out.gain.setTargetAtTime(0,AC.currentTime,2);setTimeout(()=>out.disconnect(),9000)};
  if(M.balalaika){out.connect(MREV);balalaika(M,out,tim,()=>alive);return{stop}}
  lofi(M,out,tim,()=>alive);return{stop}}

// ----- Lo-Fi-Engine -----
function lofi(M,out,tim,alive){
  const bus=AC.createGain(),lp=AC.createBiquadFilter();lp.type='lowpass';lp.frequency.value=M.cut;lp.Q.value=.4;bus.gain.value=.5*(M.vol||1);bus.connect(lp);lp.connect(out);
  const send=AC.createGain();send.gain.value=M.sparse?.8:.25;send.connect(MREV);bus.connect(send);
  // „Wow“: leichtes Leiern wie bei alten Kassetten
  const wow=AC.createOscillator(),wg=AC.createGain();wow.frequency.value=.35;wg.gain.value=M.wobble||7;wow.connect(wg);wow.start();
  const ep=(m,t,dur,v)=>{const f=mtof(m),c=AC.createOscillator(),mo=AC.createOscillator(),mi=AC.createGain(),tn=AC.createOscillator(),ti=AC.createGain(),g=AC.createGain();
    c.frequency.value=f;mo.frequency.value=f;tn.frequency.value=f*14;wg.connect(c.detune);
    mi.gain.setValueAtTime(f*1.1,t);mi.gain.exponentialRampToValueAtTime(f*.15,t+.7);ti.gain.setValueAtTime(f*.4,t);ti.gain.exponentialRampToValueAtTime(1,t+.08);
    mo.connect(mi);mi.connect(c.frequency);tn.connect(ti);ti.connect(c.frequency);c.connect(g);g.connect(bus);
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.008);g.gain.exponentialRampToValueAtTime(v*.45,t+.35);g.gain.exponentialRampToValueAtTime(.0001,t+dur+.6);
    [c,mo,tn].forEach(o=>{o.start(t);o.stop(t+dur+.7)})};
  const chord=(ch,t,dur,v)=>ch.n.forEach((m,i)=>ep(m,t+i*.012,dur,v*(i?0.8:1)));
  const bass=(m,t,dur,v)=>{const o=AC.createOscillator(),o2=AC.createOscillator(),g=AC.createGain(),x=AC.createBiquadFilter();x.type='lowpass';x.frequency.value=260;
    o.type='sine';o2.type='triangle';o.frequency.value=mtof(m);o2.frequency.value=mtof(m);const g2=AC.createGain();g2.gain.value=.3;o2.connect(g2);g2.connect(x);o.connect(x);x.connect(g);g.connect(bus);
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.02);g.gain.exponentialRampToValueAtTime(v*.6,t+dur*.6);g.gain.exponentialRampToValueAtTime(.0001,t+dur);[o,o2].forEach(z=>{z.start(t);z.stop(t+dur+.05)})};
  const guitar=(m,t,v)=>{const s=AC.createBufferSource(),g=AC.createGain(),x=AC.createBiquadFilter();x.type='lowpass';x.frequency.value=2600;s.buffer=ksBuf(m);g.gain.value=v;s.connect(x);x.connect(g);g.connect(bus);s.start(t);s.stop(t+1.8)};
  const nzHit=(t,type,f,q,v,dec)=>{const s=AC.createBufferSource(),x=AC.createBiquadFilter(),g=AC.createGain();s.buffer=NOISE;x.type=type;x.frequency.value=f;x.Q.value=q;s.connect(x);x.connect(g);g.connect(bus);
    g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+dec);s.start(t,Math.random()*1.5);s.stop(t+dec+.02)};
  const kick=(t,v)=>{const o=AC.createOscillator(),g=AC.createGain();o.frequency.setValueAtTime(130,t);o.frequency.exponentialRampToValueAtTime(46,t+.12);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+.38);o.connect(g);g.connect(bus);o.start(t);o.stop(t+.4)};
  const snare=(t,v)=>{nzHit(t,'bandpass',1900,.7,v,.16);const o=AC.createOscillator(),g=AC.createGain();o.frequency.value=190;g.gain.setValueAtTime(v*.5,t);g.gain.exponentialRampToValueAtTime(.0001,t+.08);o.connect(g);g.connect(bus);o.start(t);o.stop(t+.1)};
  const rim=(t,v)=>nzHit(t,'bandpass',1700,9,v,.035),hat=(t,v)=>nzHit(t,'highpass',7500,.5,v,.035),shaker=(t,v)=>nzHit(t,'bandpass',5200,1.4,v,.07);
  // Vinyl-Knistern
  tim.push(setInterval(()=>{if(Math.random()<.5)nzHit(AC.currentTime+Math.random()*.2,'lowpass',3000,.5,rnd(.01,.035),.01)},180));
  // Taktgeber mit Vorausplanung
  const bpm=rnd(M.bpm[0],M.bpm[1]),s16=60/bpm/4,sw=M.swing;let step=0,nextT=AC.currentTime+.4,prog=pick(M.progs),mel=pick(M.mel),melBar=false;
  const section=bar=>{const b=bar%32;if(M.sparse)return b%2?'rest':'pad';if(b<4)return'intro';if(b<12)return'groove';if(b<14)return'break';if(b<28)return'groove';if(b<30)return'outro';return'rest'};
  const sched=(st,t)=>{const bar=st/16|0,pos=st%16,sec=section(bar),ch=prog[bar%prog.length],beat=s16*4;
    if(pos==0&&bar%prog.length==0&&bar>0)prog=pick(M.progs);
    if(pos==0)melBar=(sec=='groove'||sec=='break')&&Math.random()<.55;
    if(sec=='rest')return;
    // Akkorde: Schlag 1 lang, auf „und“ von 2 manchmal ein kurzer Nachschlag
    if(pos==0)chord(ch,t,beat*(sec=='pad'?6:2.2),sec=='intro'||sec=='pad'?.05:.06);
    if(pos==6&&sec!='pad'&&Math.random()<.5)chord(ch,t,beat*.8,.04);
    if(pos==10&&sec=='groove'&&Math.random()<.3)chord(ch,t,beat*.8,.035);
    // Bass
    if((sec=='groove'||sec=='break'||sec=='outro')){if(pos==0)bass(ch.b,t,beat*1.6,.22);if(pos==8&&Math.random()<.7)bass(ch.b+(Math.random()<.5?7:0),t,beat*1.2,.18);if(pos==14&&Math.random()<.3)bass(ch.b+pick([-2,-1,2]),t,beat*.5,.14)}
    // Schlagzeug
    if(sec=='groove'&&M.drums!='none'){const full=M.drums=='full';
      if(pos==0||(pos==10&&Math.random()<.6)||(full&&pos==7&&Math.random()<.25))kick(t,full?.5:.38);
      if(pos==4||pos==12)M.drums=='shaker'?rim(t,.12):full?snare(t,.2):rim(t,.16);
      if(pos%2==0)M.drums=='shaker'?shaker(t,rnd(.03,.06)):hat(t,(pos%4==0?.05:.03)*rnd(.7,1.1));
      if(M.drums=='shaker'&&pos%2==1&&Math.random()<.5)shaker(t,.025)}
    if(sec=='outro'&&pos==0)kick(t,.3);
    // Gitarren-Melodie: kleine Motive, nicht in jedem Takt
    if(melBar&&[0,3,6,8,10,13].includes(pos)&&Math.random()<.45){const i=M.mel.indexOf(mel);mel=M.mel[Math.max(0,Math.min(M.mel.length-1,i+pick([-2,-1,1,1,2,0])))];guitar(mel,t,.22)}};
  tim.push(setInterval(()=>{if(!alive())return;while(nextT<AC.currentTime+.3){sched(step,nextT);nextT+=s16*2*(step%2==0?sw:1-sw);step++}},60))}

// ----- Balalaika: schnell, tanzbar, mit Tamburin; Dur/Moll im Wechsel -----
function balalaika(M,out,tim,alive){
  const hp=AC.createBiquadFilter(),pk=AC.createBiquadFilter(),lp=AC.createBiquadFilter(),g=AC.createGain();hp.type='highpass';hp.frequency.value=170;
  pk.type='peaking';pk.frequency.value=1700;pk.gain.value=5;pk.Q.value=1.1;lp.type='lowpass';lp.frequency.value=M.far?1300:4200;g.gain.value=M.far?.18:.36;hp.connect(pk);pk.connect(lp);lp.connect(g);g.connect(out);
  const pluck=(m,t,v)=>{const s=AC.createBufferSource(),pg=AC.createGain();s.buffer=ksBuf(m);s.playbackRate.value=1+(Math.random()-.5)*.003;pg.gain.value=v;s.connect(pg);pg.connect(hp);s.start(t);s.stop(t+1.8)};
  const trem=(m,t,dur,v)=>{const r=rnd(12,14);let k=0;for(let tt=t;tt<t+dur-.04;tt+=1/r,k++)pluck(m,tt,v*(k%2?.7:1)*(1-.2*(tt-t)/dur))};
  const strum=(ms,t,v)=>ms.forEach((m,i)=>pluck(m,t+i*.012,v*(1-i*.1)));
  const tamb=(t,v)=>{const s=AC.createBufferSource(),x=AC.createBiquadFilter(),tg=AC.createGain();s.buffer=NOISE;x.type='highpass';x.frequency.value=6500;s.connect(x);x.connect(tg);tg.connect(lp);
    tg.gain.setValueAtTime(v,t);tg.gain.exponentialRampToValueAtTime(.0001,t+.12);s.start(t,Math.random());s.stop(t+.14)};
  const A=57,CH={Am:[0,3,7],Dm:[5,8,12],E:[7,11,14],G:[-2,2,5],C:[3,7,10],F:[-4,0,3]};
  const PROGS=[{p:['Am','E','E','Am'],sc:[0,2,3,5,7,8,11]},{p:['C','G','G','C'],sc:[0,2,3,5,7,8,10]},{p:['Am','Dm','G','C'],sc:[0,2,3,5,7,8,10]},
    {p:['F','C','E','Am'],sc:[0,2,3,5,7,8,11]},{p:['Am','Dm','E','Am'],sc:[0,2,3,5,7,8,11]}];
  const RHY=[[.5,.5,.5,.5,1,1],[1,.5,.5,1,1],[.5,.5,1,.5,.5,1],[1,1,.5,.5,1],[.5,.5,.5,.5,2],[1,.5,.5,2]];
  let mel=69;
  const phrase=(t0,bpm)=>{const beat=60/bpm,P=pick(PROGS),inSc=m=>P.sc.includes(((m-A)%12+12)%12);let t=t0;
    for(let bar=0;bar<4;bar++){const ch=CH[P.p[bar]],pcs=ch.map(c=>((c%12)+12)%12);
      pluck(A-12+ch[0],t,.5);pluck(A-12+ch[0]+7,t+2*beat,.4);strum(ch.map(c=>A+c),t+beat,.24);strum(ch.map(c=>A+c),t+3*beat,.22);
      [1,3].forEach(b=>tamb(t+b*beat,.05));[.5,1.5,2.5,3.5].forEach(b=>tamb(t+b*beat,.02));
      const last=bar==3,rh=last?[.5,.5,1,2]:pick(RHY);let bt=0;
      rh.forEach((d,i)=>{let cand=[];for(let m=mel-5;m<=mel+5;m++)if(m>=64&&m<=81&&inSc(m))cand.push(m);
        if(i==0||d>=1){const ct=cand.filter(m=>pcs.includes(((m-A)%12+12)%12));if(ct.length)cand=ct}if(!cand.length)cand=[mel];
        mel=last&&i==rh.length-1?A+12+ch[0]:pick(cand.sort((a,b)=>Math.abs(a-mel)-Math.abs(b-mel)).slice(0,3));
        const st=t+bt*beat,du=d*beat;d>=1?trem(mel,st,du,.4):pluck(mel,st,.5);bt+=d});
      t+=4*beat}
    return t};
  const loop=()=>{if(!alive())return;const bpm=rnd(120,138);let t=AC.currentTime+.2;const n=2+(Math.random()*2|0);for(let i=0;i<n;i++)t=phrase(t,bpm);
    tim.push(setTimeout(loop,(t-AC.currentTime)*1000+rnd(8000,18000)))};
  tim.push(setTimeout(loop,rnd(1500,4000)))}

setInterval(()=>{if(!AC||AC.state!=='running')return;musInit();const want=$('#start')?'titel':(MOOD[cur]||'');if(want===musCur)return;musCur=want;if(musNow)musNow.stop();musNow=want?makeMusic(want):null},400);
