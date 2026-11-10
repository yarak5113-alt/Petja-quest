// ================= Geräusche: eigene Kulisse für jeden Ort =================
// 1) Echte Aufnahmen haben Vorrang: assets/sound/amb-<ort>.mp3 (z. B. amb-sumpf.mp3) ersetzt die erzeugte Kulisse (Liste: assets/sound/LIES-MICH.txt).
// 2) Sonst live erzeugt (Web Audio) – bewusst ohne Piep-Töne: Geräusche entstehen aus gefiltertem Rauschen, Blasen, Klick-Folgen und Hall,
//    so wie echte Geräusche auch. Lautstärke: Menü → Einstellungen (OPT.sfx).
let AC=null,MASTER=null,NOISE=null,BROWN=null,ambNow=null,ambCur='';
function initAudio(){if(AC)return;try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){return}
  MASTER=AC.createGain();MASTER.gain.value=OPT.sfx;MASTER.connect(AC.destination);const L=AC.sampleRate*2;
  NOISE=AC.createBuffer(1,L,AC.sampleRate);BROWN=AC.createBuffer(1,L,AC.sampleRate);const w=NOISE.getChannelData(0),b=BROWN.getChannelData(0);let x=0;
  for(let i=0;i<L;i++){w[i]=Math.random()*2-1;x=.98*x+.02*w[i];b[i]=x*7}}
['pointerdown','keydown'].forEach(ev=>addEventListener(ev,()=>{initAudio();if(AC&&AC.state==='suspended'&&!document.hidden)AC.resume()},true));
document.addEventListener('visibilitychange',()=>{if(AC)document.hidden?AC.suspend():AC.resume();if(ambNow&&ambNow.el)document.hidden?ambNow.el.pause():ambNow.el.play().catch(()=>{})});
function sfxVolume(){if(MASTER)MASTER.gain.setTargetAtTime(OPT.sfx,AC.currentTime,.05);if(ambNow&&ambNow.el)ambNow.el.volume=Math.min(1,OPT.sfx)}
const rnd=(a,b)=>a+Math.random()*(b-a),pick=a=>a[Math.random()*a.length|0];

// ----- Echte Sound-Dateien (optional) -----
const LOCS=['wald','gabel','huette','innen','sperre','irrwald','dorf','dorfstr','kirche','muehle','fischer','ufer','unter','sumpf','gnome','hoehle','banjaV','banja','buehne','lounge','titel'];
const SNDOK={};
function probe(name){if(name in SNDOK)return;SNDOK[name]=null;const tryExt=ext=>{const a=new Audio();a.preload='auto';
    a.oncanplaythrough=()=>{if(!SNDOK[name])SNDOK[name]=a.src};a.onerror=()=>{if(ext=='mp3')tryExt('ogg')};a.src='assets/sound/'+name+'.'+ext};tryExt('mp3')}
LOCS.forEach(l=>probe('amb-'+l));['step-grass','step-wood','click','item','done','new'].forEach(probe);
function playFile(name,vol){const src=SNDOK[name];if(!src)return false;const a=new Audio(src);a.volume=Math.max(0,Math.min(1,OPT.sfx*(vol||1)));a.play().catch(()=>{});return true}

// ----- Baukasten -----
function makeAmb(loc){
  if(SNDOK['amb-'+loc]){const el=new Audio(SNDOK['amb-'+loc]);el.loop=true;el.volume=0;el.play().catch(()=>{});let v=0;const fi=setInterval(()=>{v=Math.min(1,v+.05);el.volume=v*Math.min(1,OPT.sfx);if(v>=1)clearInterval(fi)},80);
    return{el,stop(){clearInterval(fi);const fo=setInterval(()=>{el.volume=Math.max(0,el.volume-.05);if(el.volume<=0){clearInterval(fo);el.pause()}},80)}}}
  if(!AC||!RECIPE[loc])return null;
  const out=AC.createGain();out.gain.value=0;out.connect(MASTER);out.gain.setTargetAtTime(1,AC.currentTime,1.2);const src=[],tim=[];let rev=null;
  const T0=at=>AC.currentTime+(at||0);
  const every=(a,b,fn)=>{const go=()=>{try{fn()}catch(e){}tim.push(setTimeout(go,rnd(a,b)))};tim.push(setTimeout(go,rnd(a*.2,b*.6)))};
  const reverb=(sec,dec,wet)=>{const len=AC.sampleRate*sec|0,ir=AC.createBuffer(2,len,AC.sampleRate);for(let c=0;c<2;c++){const d=ir.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,dec)}
    const cv=AC.createConvolver();cv.buffer=ir;const g=AC.createGain();g.gain.value=wet;cv.connect(g);g.connect(out);rev=cv};
  // Ziel mit Stereo-Position (und Hall, falls vorhanden)
  const dest=pan=>{const g=AC.createGain();let last=g;if(pan!=null&&AC.createStereoPanner){const p=AC.createStereoPanner();p.pan.value=Math.max(-1,Math.min(1,pan));g.connect(p);last=p}last.connect(out);if(rev)last.connect(rev);return g};
  const nz=(buf,at,dur)=>{const s=AC.createBufferSource();s.buffer=buf||NOISE;s.start(T0(at),Math.random()*1.5);s.stop(T0(at)+dur+.05);return s};
  const filt=(type,f,q)=>{const x=AC.createBiquadFilter();x.type=type;x.frequency.value=f;if(q)x.Q.value=q;return x};
  const env=(g,at,v,a,d)=>{const t=T0(at);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(.0002,v),t+a);g.gain.exponentialRampToValueAtTime(.0001,t+a+d)};
  // Dauergeräusche
  const bed=(lvl,type,f,q,lfo,depth,buf)=>{const s=AC.createBufferSource(),x=filt(type,f,q||.6),g=AC.createGain();s.buffer=buf||BROWN;s.loop=true;g.gain.value=lvl;
    if(lfo){const o=AC.createOscillator(),og=AC.createGain();o.frequency.value=lfo;og.gain.value=lvl*(depth||.5);o.connect(og);og.connect(g.gain);o.start();src.push(o)}
    s.connect(x);x.connect(g);g.connect(out);s.start(0,Math.random()*1.5);src.push(s)};
  const gusts=(lvl,f)=>{const s=AC.createBufferSource(),x=filt('bandpass',f,.8),g=AC.createGain();s.buffer=NOISE;s.loop=true;g.gain.value=lvl*.4;s.connect(x);x.connect(g);g.connect(out);s.start();src.push(s);
    every(1200,3500,()=>{g.gain.setTargetAtTime(lvl*rnd(.15,1),AC.currentTime,rnd(.6,1.6));x.frequency.setTargetAtTime(f*rnd(.7,1.4),AC.currentTime,1)})};
  const murmur=(lvl,cut)=>{const lp=filt('lowpass',cut);lp.connect(out);[480,950,1650].forEach(f=>{const s=AC.createBufferSource(),x=filt('bandpass',f,2.5),g=AC.createGain();s.buffer=NOISE;s.loop=true;g.gain.value=0;
    s.connect(x);x.connect(g);g.connect(lp);s.start(0,Math.random()*1.5);src.push(s);every(110,280,()=>g.gain.setTargetAtTime(lvl*Math.pow(Math.random(),1.5),AC.currentTime,.06))})};
  // Einzelne Ereignisse
  const plop=(v,pan,f,at)=>{const d=dest(pan),o=AC.createOscillator(),t=T0(at),len=rnd(.05,.11);o.type='sine';o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(f*rnd(1.8,2.8),t+len);
    o.connect(d);env(d,at,v,.004,len);o.start(t);o.stop(t+len+.05)};
  const splash=(v,pan)=>{const d=dest(pan),x=filt('bandpass',2600,1.2),s=nz(NOISE,0,.5);x.frequency.setValueAtTime(2600,T0());x.frequency.exponentialRampToValueAtTime(450,T0(.4));s.connect(x);x.connect(d);env(d,0,v,.01,.45);
    for(let i=0;i<5;i++)plop(v*.5,pan+rnd(-.2,.2),rnd(400,1100),rnd(.03,.35))};
  const rustle=(v,pan)=>{const d=dest(pan),x=filt('highpass',rnd(2000,3500)),dur=rnd(.25,.7);nz(NOISE,0,dur+.1).connect(x);x.connect(d);env(d,0,v,rnd(.06,.15),dur)};
  const knock=(v,pan,f,at,q)=>{const d=dest(pan),x=filt('bandpass',f,q||12);nz(NOISE,at,.03).connect(x);x.connect(d);env(d,at,v,.001,.08)};
  const croak=(v,pan)=>{const f=rnd(420,780),n=rnd(7,14)|0,r=rnd(22,36),reps=Math.random()<.4?2:1;
    for(let k=0;k<reps;k++)for(let i=0;i<n;i++)knock(v*(1-i/n*.5),pan,f*(1+i/n*.08),k*(n/r+.18)+i/r,9)};
  const fly=(v)=>{const d=AC.createGain(),p=AC.createStereoPanner?AC.createStereoPanner():null,o=AC.createOscillator(),vib=AC.createOscillator(),vg=AC.createGain(),x=filt('bandpass',rnd(700,1000),1.3),dur=rnd(2.5,5),t=T0(),p0=rnd(-1,1);
    o.type='sawtooth';o.frequency.value=rnd(175,235);vib.frequency.value=rnd(6,10);vg.gain.value=rnd(6,14);vib.connect(vg);vg.connect(o.frequency);o.connect(x);x.connect(d);
    if(p){p.pan.setValueAtTime(p0,t);p.pan.linearRampToValueAtTime(-p0*rnd(.5,1),t+dur);d.connect(p);p.connect(out)}else d.connect(out);
    d.gain.setValueAtTime(.0001,t);d.gain.exponentialRampToValueAtTime(v,t+dur*.4);d.gain.exponentialRampToValueAtTime(.0001,t+dur);
    o.frequency.setTargetAtTime(o.frequency.value*rnd(.9,1.1),t+dur*.5,.3);o.start(t);vib.start(t);o.stop(t+dur+.1);vib.stop(t+dur+.1)};
  const creak=(v,pan)=>{const d=dest(pan),o=AC.createOscillator(),lfo=AC.createOscillator(),lg=AC.createGain(),x=filt('bandpass',rnd(500,1100),7),dur=rnd(.4,1.1),t=T0();
    o.type='sawtooth';o.frequency.value=rnd(35,70);lfo.frequency.value=rnd(3,7);lg.gain.value=rnd(6,15);lfo.connect(lg);lg.connect(o.frequency);o.connect(x);x.connect(d);
    d.gain.setValueAtTime(.0001,t);d.gain.exponentialRampToValueAtTime(v,t+.12);d.gain.setValueAtTime(v,t+dur*.7);d.gain.exponentialRampToValueAtTime(.0001,t+dur);o.start(t);lfo.start(t);o.stop(t+dur+.05);lfo.stop(t+dur+.05)};
  const partials=(v,pan,fs,dec,at)=>{const d=dest(pan);d.gain.value=1;fs.forEach((f,i)=>{const o=AC.createOscillator(),g=AC.createGain(),t=T0(at);o.frequency.value=f;g.gain.setValueAtTime(v/(i+1.5),t);
    g.gain.exponentialRampToValueAtTime(.0001,t+dec*(1-i*.08));o.connect(g);g.connect(d);o.start(t);o.stop(t+dec+.1)})};
  const bell=(v,pan,at)=>{const f=rnd(190,230);partials(v,pan,[f,f*2,f*2.4,f*3,f*4.2,f*5.4],rnd(5,7),at)};
  const clink=(v,pan)=>{const s=rnd(.9,1.15);partials(v,pan,[2150*s,3350*s,4750*s],rnd(.25,.45));if(Math.random()<.5)partials(v*.7,pan,[2300*s,3500*s,4900*s],.3,.09)};
  const pickaxe=(v,pan)=>{partials(v,pan,[1700,2650,3900,5200].map(f=>f*rnd(.95,1.05)),.22);knock(v,pan,900,0,3)};
  const hoot=(v,pan)=>{[0,.55].forEach((at,i)=>{const d=dest(pan),o=AC.createOscillator(),x=filt('lowpass',900),f=i?345:385,t=T0(at);o.frequency.setValueAtTime(f,t);o.frequency.linearRampToValueAtTime(f*.93,t+.38);
    o.connect(x);x.connect(d);env(d,at,v,.06,.4);o.start(t);o.stop(t+.5);const b=dest(pan),bx=filt('bandpass',f*1.5,3);nz(NOISE,at,.45).connect(bx);bx.connect(b);env(b,at,v*.25,.06,.35)})};
  const whisper=(v,pan)=>{const d=dest(pan),f0=rnd(1200,2000),x=filt('bandpass',f0,4),dur=rnd(.5,1.1);x.frequency.setValueAtTime(f0,T0());x.frequency.exponentialRampToValueAtTime(rnd(2600,3600),T0(dur));nz(NOISE,0,dur+.1).connect(x);x.connect(d);env(d,0,v,dur*.4,dur*.6)};
  const snap=(v,pan)=>{const d=dest(pan),x=filt('highpass',1600);nz(NOISE,0,.03).connect(x);x.connect(d);env(d,0,v,.001,.025);knock(v*.8,pan,rnd(600,900),.005,6)};
  const flap=(v,pan)=>{[0,.12].forEach(at=>{const d=dest(pan),x=filt('lowpass',450);nz(BROWN,at,.2).connect(x);x.connect(d);env(d,at,v,.03,.14)})};
  const woodpecker=(v,pan)=>{const n=rnd(10,15)|0,f=rnd(1300,1800);for(let i=0;i<n;i++)knock(v*(1-i/n*.6),pan,f,i/rnd(15,18),14)};
  const crackle=()=>{const d=dest(rnd(-.3,.3)),x=filt('highpass',rnd(1500,3000));nz(NOISE,0,.04).connect(x);x.connect(d);env(d,0,rnd(.02,.09),.001,rnd(.01,.04))};
  const music=(cut,lvl,crowd)=>{const lp=filt('lowpass',cut),mg=AC.createGain();mg.gain.value=lvl;lp.connect(mg);mg.connect(out);if(rev)mg.connect(rev);const BASS=[55,55,65.4,49,55,73.4,65.4,49];let s=0;
    const kick=t=>{const o=AC.createOscillator(),g=AC.createGain();o.frequency.setValueAtTime(115,t);o.frequency.exponentialRampToValueAtTime(42,t+.16);g.gain.setValueAtTime(.7,t);g.gain.exponentialRampToValueAtTime(.0001,t+.3);o.connect(g);g.connect(lp);o.start(t);o.stop(t+.35)};
    const hat=(t,v)=>{const x=filt('highpass',7000),g=AC.createGain(),sr=AC.createBufferSource();sr.buffer=NOISE;sr.connect(x);x.connect(g);g.connect(lp);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+.05);sr.start(t,Math.random());sr.stop(t+.07)};
    const snare=t=>{const x=filt('bandpass',1800,.8),g=AC.createGain(),sr=AC.createBufferSource();sr.buffer=NOISE;sr.connect(x);x.connect(g);g.connect(lp);g.gain.setValueAtTime(.25,t);g.gain.exponentialRampToValueAtTime(.0001,t+.18);sr.start(t,Math.random());sr.stop(t+.2)};
    const bass=(t,f)=>{const o=AC.createOscillator(),x=filt('lowpass',320),g=AC.createGain();o.type='sawtooth';o.frequency.value=f;o.connect(x);x.connect(g);g.connect(lp);g.gain.setValueAtTime(.18,t);g.gain.exponentialRampToValueAtTime(.0001,t+.24);o.start(t);o.stop(t+.26)};
    tim.push(setInterval(()=>{const t=AC.currentTime+.05;if(s%4==0)kick(t);if(s%2==1)hat(t,.06);if(s%8==4)snare(t);if(s%2==0)bass(t,BASS[(s/2|0)%8]);s++},250));
    if(crowd)murmur(crowd,1400)};
  const P=()=>rnd(-.9,.9);
  RECIPE[loc]({bed,gusts,murmur,plop,splash,rustle,knock,croak,fly,creak,bell,clink,pickaxe,hoot,whisper,snap,flap,woodpecker,crackle,music,reverb,every,P});
  return{stop(){tim.forEach(t=>{clearTimeout(t);clearInterval(t)});out.gain.setTargetAtTime(0,AC.currentTime,.5);setTimeout(()=>{src.forEach(s=>{try{s.stop()}catch(e){}});out.disconnect()},2500)}}}

// ----- Rezepte: was man wo hört -----
const RECIPE={
  // Birkenwald: Blätterrauschen, Windböen, ab und zu ein Specht
  wald(k){k.bed(.06,'lowpass',700);k.gusts(.07,1400);k.every(500,2200,()=>k.rustle(rnd(.03,.07),k.P()));k.every(12000,26000,()=>k.woodpecker(.12,k.P()))},
  // Weggabelung: offener, Wind über die Wiese, eine Fliege am Apfelbaum
  gabel(k){k.bed(.07,'lowpass',800);k.gusts(.08,1100);k.every(800,3000,()=>k.rustle(rnd(.03,.06),k.P()));k.every(14000,30000,()=>k.fly(.05));k.every(25000,45000,()=>k.woodpecker(.08,k.P()))},
  // Vor Baba Jagas Hütte: dunkler Wind, die Hütte knarzt (sie atmet!), Kessel blubbert, Eule
  huette(k){k.reverb(1.6,3,.25);k.bed(.1,'lowpass',380,.6,.08,.6);k.every(4000,9000,()=>k.creak(.09,rnd(-.2,.3)));k.every(250,900,()=>k.plop(.025,-.5,rnd(130,320)));k.every(11000,22000,()=>k.hoot(.07,k.P()))},
  // Hütte innen: Ofenfeuer knistert, Kessel brodelt, alte Dielen
  innen(k){k.reverb(.8,4,.18);k.bed(.06,'lowpass',260,.6,.3,.4);k.every(40,260,()=>k.crackle());k.every(150,600,()=>k.plop(.04,-.6,rnd(110,300)));k.every(7000,15000,()=>k.creak(.06,k.P()))},
  // Birkensperre: dunkel, Äste knarzen, Zweige knacken im Unterholz
  sperre(k){k.reverb(2,3,.2);k.bed(.11,'lowpass',420,.6,.06,.6);k.gusts(.05,600);k.every(3500,8000,()=>k.creak(.07,k.P()));k.every(6000,14000,()=>k.snap(.12,k.P()));k.every(15000,30000,()=>k.hoot(.06,k.P()))},
  // Irrwald: unheimlich – Flüstern links und rechts, Knacken, Eule
  irrwald(k){k.reverb(2.5,2.5,.3);k.bed(.09,'lowpass',380,.6,.05,.7);k.every(4000,10000,()=>k.whisper(.035,k.P()));k.every(5000,12000,()=>k.snap(.1,k.P()));k.every(12000,25000,()=>k.hoot(.06,k.P()))},
  // Dorfeingang: Wind, Wäsche flattert, eine Fliege
  dorf(k){k.bed(.06,'lowpass',800);k.gusts(.06,900);k.every(4000,9000,()=>k.flap(.06,k.P()));k.every(12000,25000,()=>k.fly(.045))},
  // Dorfstraße: Wäscheleine, Galjas Fernseher murmelt, Fliegen
  dorfstr(k){k.bed(.05,'lowpass',800);k.gusts(.05,900);k.murmur(.012,700);k.every(3000,7000,()=>k.flap(.07,rnd(-.6,-.1)));k.every(9000,18000,()=>k.fly(.05))},
  // Kirche & Friedhof: stiller Wind, Blätter, ab und zu die Glocke von weit weg
  kirche(k){k.reverb(3,2,.3);k.bed(.05,'lowpass',700);k.every(1500,4000,()=>k.rustle(.03,k.P()));k.every(30000,55000,()=>{for(let i=0;i<3;i++)k.bell(.05,-.3,i*2.2)})},
  // Mühle: rauschender Bach, Wasserrad poltert im Takt, Spritzer
  muehle(k){k.bed(.16,'lowpass',1500,.5,.4,.3,NOISE);k.bed(.08,'lowpass',300);k.every(2100,2400,()=>{k.knock(.18,.2,rnd(180,240),0,5);k.creak(.04,.2)});k.every(150,500,()=>k.plop(.025,rnd(0,.5),rnd(500,1400)))},
  // Fischerhaus: sanfte Wellen, Wasser gluckert am Ufer, ab und zu springt ein Fisch
  fischer(k){k.bed(.12,'lowpass',600,.5,.13,.8);k.every(900,2600,()=>k.plop(.03,k.P(),rnd(300,700)));k.every(1500,4000,()=>k.rustle(.025,k.P()));k.every(15000,30000,()=>k.splash(.07,k.P()))},
  // Ufer: Wellen etwas stärker, Schilf raschelt, der Steg knarzt
  ufer(k){k.bed(.15,'lowpass',650,.5,.11,.8);k.every(700,2200,()=>k.plop(.03,k.P(),rnd(300,800)));k.every(1000,3000,()=>k.rustle(.04,k.P()));k.every(8000,16000,()=>k.creak(.05,-.6));k.every(18000,35000,()=>k.splash(.06,k.P()))},
  // Unter dem Steg: hohl, Tropfen mit Hall, über dir knarzt Kusmitsch
  unter(k){k.reverb(1.4,2.5,.45);k.bed(.11,'lowpass',420,.5,.15,.7);k.every(500,1800,()=>k.plop(.05,k.P(),rnd(900,1800)));k.every(5000,11000,()=>k.creak(.08,rnd(-.3,.3)))},
  // Sumpf: muffig, Frösche quaken, Fliegen brummen vorbei, es blubbert, manchmal platscht was
  sumpf(k){k.reverb(1.2,3,.15);k.bed(.13,'lowpass',170,.6,.05,.5);k.bed(.03,'lowpass',500,.6,.2,.6,NOISE);
    k.every(900,3500,()=>k.croak(.09,k.P()));k.every(3500,9000,()=>k.fly(.06));k.every(700,2500,()=>{const p=k.P();k.plop(.05,p,rnd(110,260));if(Math.random()<.5)k.plop(.04,p,rnd(130,300),.12)});
    k.every(10000,24000,()=>k.splash(.06,k.P()))},
  // Gnomsiedlung: Wind, aus der Höhle klingen Spitzhacken
  gnome(k){k.reverb(1.5,3,.25);k.bed(.05,'lowpass',700);k.gusts(.05,1000);k.every(1500,4000,()=>k.pickaxe(.035,rnd(.4,.9)));k.every(1500,4000,()=>k.rustle(.03,k.P()))},
  // Höhle: großer Hall, Tropfen, tiefes Grollen, ferne Spitzhacken
  hoehle(k){k.reverb(3.5,2,.55);k.bed(.1,'lowpass',120,.6,.04,.5);k.every(500,2000,()=>k.plop(.05,k.P(),rnd(1000,2000)));k.every(6000,12000,()=>k.pickaxe(.02,k.P()));k.every(9000,20000,()=>k.whisper(.015,k.P()))},
  // Vor dem Banja: Musik dumpf durch die Wand, Wind, Eule
  banjaV(k){k.reverb(2,3,.2);k.music(220,.6,.01);k.bed(.07,'lowpass',400,.6,.07,.6);k.every(14000,28000,()=>k.hoot(.05,k.P()))},
  // Im Banja: Musik, Gemurmel, Gläser klirren
  banja(k){k.reverb(.9,3,.2);k.music(1100,.45,.03);k.every(2000,6000,()=>k.clink(.05,k.P()))},
  // Bühnenrand: Musik laut und nah
  buehne(k){k.reverb(.9,3,.2);k.music(2500,.55,.02);k.every(3000,8000,()=>k.clink(.04,k.P()))},
  // Lounge: Musik hinter dem Vorhang
  lounge(k){k.reverb(.6,4,.15);k.music(500,.4)},
  // Startmenü: Nachtwald
  titel(k){k.reverb(2,3,.25);k.bed(.09,'lowpass',400,.6,.06,.6);k.every(1500,5000,()=>k.rustle(.025,k.P()));k.every(10000,20000,()=>k.hoot(.05,k.P()))}};
setInterval(()=>{if(!AC||AC.state!=='running')return;const want=$('#start')?'titel':(cur||'');if(want===ambCur)return;ambCur=want;if(ambNow)ambNow.stop();ambNow=want?makeAmb(want):null},300);

// ----- Schritte (weiches Rauschen), Effekte nur mit echten Dateien -----
const HARD={innen:1,banja:1,buehne:1,lounge:1,unter:1,hoehle:1};let stepT=0;
setInterval(()=>{if(!AC||AC.state!=='running'||!mv||$('#start'))return;const n=performance.now();if(n-stepT<360)return;stepT=n;
  if(playFile(HARD[cur]?'step-wood':'step-grass',.6))return;
  const t=AC.currentTime,s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=NOISE;f.type='lowpass';f.frequency.value=HARD[cur]?900:500;
  g.gain.setValueAtTime(HARD[cur]?.12:.09,t);g.gain.exponentialRampToValueAtTime(.0001,t+.09);s.connect(f);f.connect(g);g.connect(MASTER);s.start(t,Math.random()*1.5);s.stop(t+.12)},40);
function sfx(k){playFile(k)}
document.addEventListener('click',e=>{if(e.target.closest('button'))sfx('click')},true);
const _toastS=toast;toast=function(m,c){_toastS(m,c);if(c=='item'||c=='done'||c=='new')sfx(c)};
