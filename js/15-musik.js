// ================= Musik: Russische Volksmusik – jeder Ort hat sein eigenes Stück =================
// Kein endloses Gedudel: Jeder Ort spielt einen eigenen Tanz mit eigener Taktart, eigenen Instrumenten und einer
// Melodie, die sich innerhalb eines Stücks WIEDERHOLT (Form: Intro → A → A → B → A → Pause). Das nächste Stück wird neu gewürfelt.
//   Birkenwald/Gabelung  Chorowod (Reigen) im 6/8 – Swirel-Flöte, Domra, Gusli, Holzlöffel – Dur, hüpfend
//   Gnome                Zwergenmarsch – Schleich-Bass, Balalaika-Stöße, Schaleika, Holzklötze wie Spitzhacken
//   Wasser-Orte          Wolga-Walzer im 3/4 – Bajan-Melodie, Domra-Tremolo, Kontrabass-Balalaika
//   Hütte/dunkler Wald   Hexenhaus – absteigender Klagebass, Bajan-Brummen, Herzschlag-Trommel, spärliche Melodie
//   Sumpf                Sumpf-Blues – träge, geschleppt, Schaleika rutscht ab, Bajan seufzt
//   Hütte innen          Hexenküche – orientalische Tonleiter, wird immer schneller (wie ein Volkstanz), dann Stopp
//   Startmenü            Straßenmusikant – Bajan mit Bass-und-Akkord-Begleitung, Swirel/Domra
//   Dorf                 Dorffest (schnelle Balalaika)
//   Irrwald, Höhle, Kirche bleiben Klangflächen (band)
// Lautstärke: Menü → Einstellungen (OPT.mus). Liegt assets/sound/mus-<stimmung>.mp3 vor, wird stattdessen die Datei leise geloopt.
if(OPT.mus==null)OPT.mus=.35;
const MOOD={wald:'wald',gabel:'wald',gnome:'gnome',huette:'dunkel',sperre:'dunkel',irrwald:'irrwald',dorf:'dorf',dorfstr:'dorf',kirche:'kirche',
  muehle:'wasser',fischer:'wasser',ufer:'wasser',unter:'wasser',sumpf:'sumpf',hoehle:'hoehle',innen:'innen'};
const C=(n,b)=>({n,b});
// Klangflächen (ohne festes Stück): comp = Begleitung, lead = Melodie-Instrumente, kit = Beat
const MUSIK={
  // Irrwald: unheimlich – Gusli-Tropfen im Hall, Schaleika von weit weg, kein Beat
  irrwald:{bpm:[66,72],swing:.5,kit:'none',comp:'gusli',lead:['schaleika','gusli'],cut:2000,space:1,mel:[57,58,61,62,64,65,68],
    progs:[[C([57,61,64],45),C([58,62,65],46),C([57,61,64],45),C([56,59,62],44)]]},
  // Höhle: nur Gusli-Töne mit viel Hall
  hoehle:{bpm:[60,64],swing:.5,kit:'none',comp:'gusli',sparse:1,lead:[],cut:2200,mel:[57,60,64,67,69,72],progs:[[C([57,60,64,67],45),C([57,60,64,65],41)]]},
  // Kirche: ruhig – Gusli und Swirel von fern
  kirche:{bpm:[64,70],swing:.5,kit:'none',comp:'gusli',lead:['swirel'],cut:1800,space:1,mel:[62,64,65,67,69,72],
    progs:[[C([62,65,69],38),C([60,64,67],36),C([58,62,65],46),C([57,61,64],45)]]},
  // Dorf: Dorffest – schnelle Balalaika, Bajan-Begleitung, Holzlöffel, Schellentrommel
  dorf:{balalaika:1}};

// ----- Stücke: root = Grundton, sc = Tonleiter, bar = Zählzeiten pro Takt, bpm = Zählzeiten pro Minute,
//       CH = Akkorde (Abstände zum Grundton, b = Basston), A/B = Akkordfolgen, rh = Rhythmen (Summe = bar), cad = Schluss-Rhythmen,
//       lead = [Instrument Teil A, Instrument Teil B], acc/perc = Begleitung & Schlagwerk pro Takt (k = Werkzeugkasten)
const MAJ=[0,2,4,5,7,9,11],HMIN=[0,2,3,5,7,8,11];
const FOLK={
  wald:{root:62,sc:MAJ,bar:6,bpm:[264,288],rng:[69,86],long:3,bassI:'gusli',vol:.34,rev:.25,
    CH:{I:[0,4,7],IV:[5,9,12],V:[7,11,14],vi:[9,12,16],ii:[2,5,9]},
    A:[['I','V','I','V'],['I','IV','V','I'],['I','I','IV','V']],B:[['vi','IV','I','V'],['IV','I','ii','V'],['vi','V','IV','V']],
    rh:[[3,3],[2,1,3],[2,1,2,1],[1,1,1,3],[3,2,1],[2,1,1,1,1]],cad:[[3,3],[2,1,3]],
    lead:[['swirel','domra'],['domra','swirel'],['swirel','balalaika']],
    acc(k,ch,t,u){k.bass(ch.b,t,.38);k.I.arp('gusli',k.abs(ch),t+u,.04,.13);k.bass(ch.b+7,t+3*u,.28);k.I.arp('gusli',k.abs(ch),t+4*u,.04,.1)},
    perc(k,t,u,sec){if(sec=='i')return;[0,2,3,5].forEach(p=>k.I.loschki(t+p*u,p%3?.05:.09,p>=3));if(sec=='B')k.I.buben(t+3*u,.04)}},
  gnome:{root:64,sc:HMIN,bar:4,bpm:[220,240],rng:[71,88],long:2,bassI:'kbass',stacc:1,vol:.34,rev:.3,
    CH:{i:[0,3,7],iv:[5,8,12],V:[7,11,14],VI:[8,12,15],III:[3,7,10]},
    A:[['i','iv','V','i'],['i','VI','iv','V'],['i','V','i','V']],B:[['III','VI','iv','V'],['iv','i','V','i'],['VI','III','iv','V']],
    rh:[[1,1,1,1],[.5,.5,1,1,1],[1,.5,.5,2],[2,1,1],[1,1,2],[.5,.5,.5,.5,1,1]],cad:[[1,1,2],[2,2]],
    lead:[['balalaika','schaleika'],['schaleika','balalaika']],
    acc(k,ch,t,u){[0,12,7,12].forEach((o,p)=>k.bass(ch.b+o,t+p*u,p%2?.22:.34));k.I.arp('balalaika',k.abs(ch),t+u,.008,.16);k.I.arp('balalaika',k.abs(ch),t+3*u,.008,.13)},
    perc(k,t,u,sec){k.I.hit(t,'bandpass',780,11,.16,.07);k.I.hit(t+2*u,'bandpass',780,11,.12,.07);if(sec!='i'){k.I.loschki(t+u,.05,1);k.I.loschki(t+3*u,.05,1)}}},
  wasser:{root:57,sc:HMIN,bar:3,bpm:[138,150],rng:[64,84],long:2,bassI:'kbass',vol:.34,rev:.35,form:['i','A','B','A'],
    CH:{i:[0,3,7],iv:[5,8,12],V:[7,11,14],III:[3,7,10],VI:[8,12,15]},
    A:[['i','iv','V','i'],['i','III','iv','V'],['VI','iv','V','i']],B:[['III','VI','iv','V'],['iv','i','V','V'],['III','iv','V','i']],
    rh:[[2,1],[1,1,1],[3],[1.5,.5,1],[1,2],[.5,.5,1,1]],cad:[[3],[2,1]],
    lead:[['bajan','domra'],['domra','bajan'],['gusli','bajan']],
    acc(k,ch,t,u){k.bass(ch.b,t,.4);[1,2].forEach(p=>k.I.arp('gusli',k.abs(ch),t+p*u,.012,.09))},
    perc(){}},
  dunkel:{root:62,sc:HMIN,bar:4,bpm:[70,78],rng:[62,77],long:1,bassI:'kbass',sparse:.45,vol:.36,rev:.45,form:['i','A','B','A'],
    CH:{Dm:C([0,3,7],0),AC:C([7,11,16],-1),DmC:C([0,3,7],-2),GB:C([5,9,12],-3),Bb:C([8,12,15],-4),A:C([7,11,14],-5)},
    A:[['Dm','AC','DmC','GB']],B:[['Bb','GB','A','A'],['Bb','A','Dm','A']],
    rh:[[2,2],[3,1],[1,1,2],[4],[1.5,.5,2]],cad:[[4],[2,2]],
    lead:[['domra','schaleika'],['schaleika','domra']],
    acc(k,ch,t,u){k.I.bajan(k.abs(ch,-12),t,4*u,.045,1);k.bass(ch.b,t,.4);k.bass(ch.b,t+2*u,.3)},
    perc(k,t,u,sec){k.I.drum(t,.3);k.I.drum(t+.42*u,.18);if(sec!='i'&&Math.random()<.3)k.I.loschki(t+3.5*u,.05)}},
  sumpf:{root:64,sc:[0,2,3,5,7,9,10],bar:4,bpm:[64,70],rng:[64,81],long:1,bassI:'kbass',bend:1,hum:.035,vol:.6,rev:.3,form:['i','A','A','B','A'],
    CH:{i:[0,3,7,10],IV:[5,9,12,15],v:[7,10,14]},
    A:[['i','i','IV','i'],['i','IV','i','v']],B:[['IV','IV','i','i'],['v','IV','i','i']],
    rh:[[1.33,.67,2],[2,1.33,.67],[.67,.67,.67,2],[3,1],[1.33,.67,1.33,.67],[4]],cad:[[4],[3,1]],
    lead:[['schaleika','bajan'],['bajan','schaleika']],
    acc(k,ch,t,u){k.I.bajan(k.abs(ch,-12),t+.05,3.6*u,.04,1);k.bass(ch.b,t,.38);k.bass(ch.b+7,t+2.67*u,.26)},
    perc(k,t,u,sec){if(sec=='i')return;[.67,1.67,2.67,3.67].forEach(p=>k.I.hit(t+p*u,'bandpass',5200,1.4,rnd(.03,.05),.08))}},
  innen:{root:57,sc:[0,1,4,5,7,8,10],bar:2,bpm:[92,100],accel:1.035,bpmMax:172,rng:[64,81],long:1,bassI:'gusli',vol:.34,rev:.25,form:['i','A','A','B','B','A','A'],
    CH:{I:[0,4,7],II:[1,5,8],iv:[5,8,12],vii:[10,13,17]},
    A:[['I','II','I','I'],['I','iv','II','I'],['iv','II','I','I']],B:[['iv','iv','I','I'],['vii','II','I','I']],
    rh:[[.5,.5,.5,.5],[1,.5,.5],[.5,.5,1],[.25,.25,.5,1],[1,1],[.5,.25,.25,.5,.5]],cad:[[1,1],[.5,.5,1]],
    lead:[['balalaika','schaleika'],['gusli','balalaika']],
    acc(k,ch,t,u){k.bass(ch.b,t,.36);k.bass(ch.b+7,t+u,.28);k.I.arp('balalaika',k.abs(ch),t+.5*u,.01,.15);k.I.arp('balalaika',k.abs(ch),t+1.5*u,.01,.13)},
    perc(k,t,u,sec,bpm){if(sec=='i')return;[0,.5,1,1.5].forEach((p,i)=>k.I.loschki(t+p*u,i%2?.05:.08,i>1));if(bpm>125)k.I.buben(t+u,.05)}},
  titel:{root:57,sc:HMIN,bar:4,bpm:[88,96],rng:[64,84],long:1,bassI:'bajan',vol:.52,rev:.3,form:['i','A','B','A'],
    CH:{i:[0,3,7],iv:[5,8,12],V:[7,11,14],III:[3,7,10],VI:[8,12,15]},
    A:[['i','iv','V','i'],['i','VI','III','V']],B:[['III','VI','iv','V'],['iv','i','V','i']],
    rh:[[1,1,2],[1.5,.5,1,1],[2,1,1],[1,.5,.5,2],[4],[.5,.5,1,2]],cad:[[4],[2,2]],
    lead:[['bajan','swirel'],['domra','bajan']],
    acc(k,ch,t,u){k.bass(ch.b,t,1,u*.7);k.I.bajan(k.abs(ch),t+u,u*.5,.035);k.bass(ch.b+7,t+2*u,1,u*.7);k.I.bajan(k.abs(ch),t+3*u,u*.5,.035)},
    perc(k,t,u,sec){if(sec!='i'){k.I.loschki(t+u,.05);k.I.loschki(t+3*u,.05)}}}};

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
  // [Dämpfung, Korpus-Resonanz Hz, Resonanz dB, Tiefpass Hz, Ausklang s, Hochpass Hz]
  const body={},BODY={balalaika:[.997,1700,5,4200,1.8],domra:[.998,1050,4,2800,2],gusli:[.9994,2600,2,5200,3.5],gitarre:[.997,900,2,2600,1.8],kbass:[.996,200,5,1100,1.4,35]};
  const chain=k=>{if(body[k])return body[k];const[, f,g,lpf,,hpf]=BODY[k],hp=AC.createBiquadFilter(),pk=AC.createBiquadFilter(),lp=AC.createBiquadFilter();hp.type='highpass';hp.frequency.value=hpf||150;
    pk.type='peaking';pk.frequency.value=f;pk.gain.value=g;pk.Q.value=1.1;lp.type='lowpass';lp.frequency.value=lpf;hp.connect(pk);pk.connect(lp);lp.connect(dest);return body[k]=hp};
  const pluck=(k,m,t,v)=>{const[damp,,,,len]=BODY[k],s=AC.createBufferSource(),g=AC.createGain();s.buffer=ksBuf(m,damp,len);s.playbackRate.value=1+(Math.random()-.5)*.003;g.gain.value=v;s.connect(g);g.connect(chain(k));s.start(t);s.stop(t+len)};
  const trem=(k,m,t,dur,v,rate)=>{const r=rate||rnd(11,13);let n=0;for(let tt=t;tt<t+dur-.04;tt+=1/r,n++)pluck(k,m,tt,v*(n%2?.7:1)*(1-.2*(tt-t)/dur))};
  const arp=(k,ms,t,step,v,down)=>{(down?[...ms].reverse():ms).forEach((m,i)=>pluck(k,m,t+i*step,v*(1-i*.06)))};
  // Bajan: zwei leicht gegeneinander verstimmte Zungen + Bass-Zunge, Formant, Balg schwillt an und ab
  const bajan=(ms,t,dur,v,low)=>{const g=AC.createGain(),bp=AC.createBiquadFilter(),lp=AC.createBiquadFilter(),bel=AC.createOscillator(),bg=AC.createGain();
    bp.type='bandpass';bp.frequency.value=low?800:1150;bp.Q.value=.6;lp.type='lowpass';lp.frequency.value=low?1800:3000;bp.connect(lp);lp.connect(g);g.connect(dest);
    bel.frequency.value=rnd(.4,.7);bg.gain.value=v*.18;bel.connect(bg);bg.connect(g.gain);
    const at=Math.min(.07,dur*.3);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+at);g.gain.setValueAtTime(v,t+Math.max(at,dur-.08));g.gain.exponentialRampToValueAtTime(.0001,t+dur+.1);
    const os=[bel];ms.forEach(m=>{const f=mtof(m);[[-8,'sawtooth',.5],[8,'sawtooth',.5],[0,'square',.18]].forEach(([dt,ty,a])=>{const o=AC.createOscillator(),og=AC.createGain();o.type=ty;o.frequency.value=f*(ty=='square'?.5:1);o.detune.value=dt;og.gain.value=a/ms.length;o.connect(og);og.connect(bp);os.push(o)})});
    os.forEach(o=>{o.start(t);o.stop(t+dur+.15)})};
  // Swirel: Flöte – Grundton + leiser Oberton + Atemgeräusch, Vibrato setzt spät ein
  const swirel=(m,t,dur,v)=>{const f=mtof(m),g=AC.createGain(),lp=AC.createBiquadFilter(),o=AC.createOscillator(),o2=AC.createOscillator(),g2=AC.createGain(),vib=AC.createOscillator(),vg=AC.createGain();
    lp.type='lowpass';lp.frequency.value=3200;o.frequency.value=f;o2.frequency.value=f*2;g2.gain.value=.12;vib.frequency.value=5.3;vg.gain.setValueAtTime(0,t);vg.gain.linearRampToValueAtTime(f*.007,t+Math.min(.5,dur*.6));
    vib.connect(vg);vg.connect(o.frequency);vg.connect(o2.frequency);o.connect(lp);o2.connect(g2);g2.connect(lp);lp.connect(g);g.connect(dest);
    const s=AC.createBufferSource(),bx=AC.createBiquadFilter(),bg=AC.createGain();s.buffer=NOISE;bx.type='bandpass';bx.frequency.value=f*1.5;bx.Q.value=4;bg.gain.value=.35;s.connect(bx);bx.connect(bg);bg.connect(g);
    const at=Math.min(.07,dur*.3);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+at);g.gain.setValueAtTime(v,t+Math.max(at,dur-.1));g.gain.exponentialRampToValueAtTime(.0001,t+dur+.12);
    [o,o2,vib].forEach(x=>{x.start(t);x.stop(t+dur+.15)});s.start(t,Math.random());s.stop(t+dur+.15)};
  // Schaleika: nasale Rohrblatt-Pfeife – Rechteck + Säge durch Formantfilter, Ton rutscht von unten an (bend: rutscht am Ende ab)
  const schaleika=(m,t,dur,v,bend)=>{const f=mtof(m),g=AC.createGain(),bp=AC.createBiquadFilter(),lp=AC.createBiquadFilter(),o=AC.createOscillator(),o2=AC.createOscillator(),g2=AC.createGain(),vib=AC.createOscillator(),vg=AC.createGain();
    bp.type='bandpass';bp.frequency.value=1500;bp.Q.value=1.6;lp.type='lowpass';lp.frequency.value=3600;o.type='square';o2.type='sawtooth';g2.gain.value=.5;
    [o,o2].forEach(x=>{x.frequency.setValueAtTime(f*.955,t);x.frequency.exponentialRampToValueAtTime(f,t+.07);if(bend&&dur>.4){x.frequency.setValueAtTime(f,t+dur*.55);x.frequency.exponentialRampToValueAtTime(f*Math.pow(2,-bend/12),t+dur)}});
    vib.frequency.value=6;vg.gain.value=f*.009;vib.connect(vg);vg.connect(o.frequency);vg.connect(o2.frequency);
    o.connect(bp);o2.connect(g2);g2.connect(bp);bp.connect(lp);lp.connect(g);g.connect(dest);
    const at=Math.min(.04,dur*.3);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+at);g.gain.setValueAtTime(v*.85,t+Math.max(at,dur-.08));g.gain.exponentialRampToValueAtTime(.0001,t+dur+.08);
    [o,o2,vib].forEach(x=>{x.start(t);x.stop(t+dur+.1)})};
  const hit=(t,type,f,q,v,dec)=>{const s=AC.createBufferSource(),x=AC.createBiquadFilter(),g=AC.createGain();s.buffer=NOISE;x.type=type;x.frequency.value=f;x.Q.value=q;s.connect(x);x.connect(g);g.connect(dest);
    g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+dec);s.start(t,Math.random()*1.5);s.stop(t+dec+.02)};
  const loschki=(t,v,hi)=>{hit(t,'bandpass',hi?2500:1650,16,v,.05);hit(t+.012,'bandpass',hi?2500:1650,16,v*.5,.04)};
  const buben=(t,v)=>hit(t,'highpass',6500,.5,v,.12);
  // Rahmentrommel: dumpfer Schlag
  const drum=(t,v)=>{const o=AC.createOscillator(),g=AC.createGain();o.frequency.setValueAtTime(95,t);o.frequency.exponentialRampToValueAtTime(52,t+.15);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+.45);o.connect(g);g.connect(dest);o.start(t);o.stop(t+.5);hit(t,'lowpass',400,.7,v*.3,.08)};
  return{pluck,trem,arp,bajan,swirel,schaleika,loschki,buben,hit,drum}}

function makeMusic(name){const M=MUSIK[name],F=FOLK[name];if(!M&&!F)return null;
  if(SNDOK['mus-'+name]){const el=new Audio(SNDOK['mus-'+name]);el.loop=true;el.volume=0;el.play().catch(()=>{});let v=0;const fi=setInterval(()=>{v=Math.min(1,v+.03);el.volume=v*Math.min(1,OPT.mus);if(v>=1)clearInterval(fi)},100);
    return{el,stop(){clearInterval(fi);const fo=setInterval(()=>{el.volume=Math.max(0,el.volume-.03);if(el.volume<=0){clearInterval(fo);el.pause()}},100)}}}
  const out=AC.createGain();out.gain.value=0;out.connect(MUS);out.gain.setTargetAtTime(1,AC.currentTime,2.5);const tim=[];let alive=true;
  const stop=()=>{alive=false;tim.forEach(t=>{clearTimeout(t);clearInterval(t)});out.gain.setTargetAtTime(0,AC.currentTime,2);setTimeout(()=>out.disconnect(),9000)};
  if(F){folk(F,out,tim,()=>alive);return{stop}}
  if(M.balalaika){out.connect(MREV);dorffest(out,tim,()=>alive);return{stop}}
  band(M,out,tim,()=>alive);return{stop}}

// ----- Volksstück: komponiert Teil A und B, wiederholt sie (wiedererkennbare Melodie), Begleitung & Schlagwerk je nach Stil -----
function folk(S,out,tim,alive){
  const g=AC.createGain();g.gain.value=S.vol;g.connect(out);const send=AC.createGain();send.gain.value=S.rev;g.connect(send);send.connect(MREV);
  const I=instruments(g),R=S.root,pc=m=>((m-R)%12+12)%12,inSc=m=>S.sc.includes(pc(m));
  const chord=n=>{const c=S.CH[n];return c.n?c:{n:c,b:c[0]}};
  const k={I,abs:(ch,o)=>ch.n.map(x=>R+x+(o||0)),
    bass(off,t,v,dur){const m=R+off;if(S.bassI=='kbass')I.pluck('kbass',m-24,t,v);else if(S.bassI=='bajan')I.bajan([m-12],t,dur||.3,.06,1);else I.pluck('gusli',m-12,t,v)}};
  // Melodie-Ton je nach Instrument
  const note=(L,m,t,d,v)=>{if(S.hum)t+=rnd(0,S.hum);
    if(L=='swirel')I.swirel(m,t,d*.95,.1*v);
    else if(L=='schaleika')I.schaleika(m,t,S.stacc?Math.min(d,.16):d*.9,.07*v,S.bend);
    else if(L=='bajan')I.bajan([m],t,S.stacc?Math.min(d,.18):d*.92,.075*v);
    else if(L=='gusli')I.pluck('gusli',m,t,.32*v);
    else if(d>=.38&&!S.stacc)I.trem(L,m,t,d,(L=='domra'?.3:.32)*v,L=='balalaika'?13:11);
    else I.pluck(L,m,t,(L=='domra'?.4:.42)*v)};
  let mel=Math.round((S.rng[0]+S.rng[1])/2);
  // Einen Takt Melodie erfinden: lange/betonte Töne auf Akkordtöne, sonst schrittweise; Schluss-Takt endet auf dem Grundton des Akkords
  const invent=(ch,rh,cad)=>{const pcs=ch.n.map(x=>((x%12)+12)%12);return rh.map((d,i)=>{let cand=[];for(let m=mel-5;m<=mel+5;m++)if(m>=S.rng[0]&&m<=S.rng[1]&&inSc(m))cand.push(m);
      if(i==0||d>=S.long){const ct=cand.filter(m=>pcs.includes(pc(m)));if(ct.length)cand=ct}if(!cand.length)cand=[mel];
      if(cad&&i==rh.length-1){const rt=cand.filter(m=>pc(m)==pcs[0]);if(rt.length)cand=rt}
      mel=pick(cand.sort((a,b)=>Math.abs(a-mel)-Math.abs(b-mel)).slice(0,3));return mel})};
  const compose=prog=>{const r0=pick(S.rh),r1=pick(S.rh);return prog.map((n,i)=>{const ch=chord(n),last=i==prog.length-1,rh=last?pick(S.cad):i%2?r1:r0;
    const rest=S.sparse&&!last&&Math.random()<S.sparse;return{ch,rh,notes:rest?null:invent(ch,rh,last)}})};
  // Ein ganzes Stück: Form durchgehen, Teil für Teil kurz vor seinem Einsatz einplanen
  const song=()=>{if(!alive())return;let bpm=rnd(S.bpm[0],S.bpm[1]),t=AC.currentTime+.3;
    const form=S.form||['i','A','A','B','A'],L=pick(S.lead),parts={A:compose(pick(S.A)),B:compose(pick(S.B))};let seenA=0;
    const playSec=(i)=>{if(!alive())return;
      if(i>=form.length){const ch=parts.A[0].ch,u=60/bpm;S.acc(k,ch,t,u);k.bass(ch.b,t,.4,u);
        tim.push(setTimeout(song,(t+S.bar*u-AC.currentTime)*1000+rnd(7000,15000)));return}
      const sec=form[i];let bars;
      if(sec=='i')bars=parts.A.slice(0,2).map(b=>({ch:b.ch,rh:null,notes:null}));
      else{if(sec=='A'&&seenA++>0&&Math.random()<.5){const last=parts.A[3];last.notes=invent(last.ch,last.rh,true)}bars=parts[sec]}
      const lead=sec=='B'?L[1]:L[0];
      bars.forEach(b=>{const u=60/bpm;S.acc(k,b.ch,t,u);S.perc(k,t,u,sec,bpm);
        if(b.notes){let bt=0;b.rh.forEach((d,j)=>{note(lead,b.notes[j],t+bt*u,d*u,j==0?1:.85);bt+=d})}
        t+=S.bar*u;if(S.accel)bpm=Math.min(S.bpmMax,bpm*S.accel)});
      tim.push(setTimeout(()=>playSec(i+1),Math.max(0,(t-AC.currentTime-1)*1000)))};
    playSec(0)};
  tim.push(setTimeout(song,rnd(800,2500)))}

// ----- Klangfläche: Begleitung + gelegentliche Melodie-Töne, ohne festes Stück (Irrwald, Höhle, Kirche) -----
function band(M,out,tim,alive){
  const bus=AC.createGain(),lp=AC.createBiquadFilter();lp.type='lowpass';lp.frequency.value=M.cut;lp.Q.value=.4;bus.gain.value=.5;bus.connect(lp);lp.connect(out);
  const send=AC.createGain();send.gain.value=M.sparse||M.space?.9:.3;send.connect(MREV);bus.connect(send);
  const I=instruments(bus);
  const bass=(m,t,dur,v)=>{const o=AC.createOscillator(),g=AC.createGain(),x=AC.createBiquadFilter();x.type='lowpass';x.frequency.value=260;o.frequency.value=mtof(m);o.connect(x);x.connect(g);g.connect(bus);
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.02);g.gain.exponentialRampToValueAtTime(v*.6,t+dur*.6);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.start(t);o.stop(t+dur+.05)};
  const comp=(ch,t,beat,sec)=>{if(M.comp=='bajan')I.bajan(ch.n.map(m=>M.low?m-12:m),t,beat*(sec=='pad'?4:1.8),.07,M.low);
    else I.arp('gusli',ch.n.concat([ch.n[0]+12]),t,.09,.2)};
  const bpm=rnd(M.bpm[0],M.bpm[1]),s16=60/bpm/4,sw=M.swing;let step=0,nextT=AC.currentTime+.4,prog=pick(M.progs),mel=pick(M.mel),melBar=false,lead=pick(M.lead.length?M.lead:['gusli']),hold=0;
  const section=bar=>{const b=bar%32;if(M.sparse)return b%2?'rest':'pad';if(b<4)return'intro';if(b<12)return'groove';if(b<14)return'break';if(b<28)return'groove';if(b<30)return'outro';return'rest'};
  const sched=(st,t)=>{const bar=st/16|0,pos=st%16,sec=section(bar),ch=prog[bar%prog.length],beat=s16*4;
    if(pos==0&&bar%prog.length==0){if(bar>0)prog=pick(M.progs);if(M.lead.length)lead=pick(M.lead)}
    if(pos==0)melBar=M.lead.length&&(sec=='groove'||sec=='break'||(sec=='intro'&&bar%4==3))&&Math.random()<.6;
    if(sec=='rest')return;
    if(pos==0)comp(ch,t,beat,sec);
    if(pos==8&&M.comp=='gusli'&&sec!='pad'&&Math.random()<.6)I.arp('gusli',ch.n.concat([ch.n[0]+12]),t,.08,.16,true);
    if((sec=='groove'||sec=='break'||sec=='outro')&&pos==0)bass(ch.b,t,beat*1.6,.18);
    if(hold>0){hold--;return}
    if(melBar&&[0,2,3,6,8,10,12,14].includes(pos)&&Math.random()<.5){const i=M.mel.indexOf(mel);mel=M.mel[Math.max(0,Math.min(M.mel.length-1,i+pick([-2,-1,1,1,2,0,-1])))];
      const n16=pick([2,3,4,6]),dur=n16*s16;hold=n16-1;
      if(lead=='swirel')I.swirel(mel,t,dur,.1);else if(lead=='schaleika')I.schaleika(mel,t,dur,.07);
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
