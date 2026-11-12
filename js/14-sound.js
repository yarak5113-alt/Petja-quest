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
  // Vogelgesang: jede „Art“ hat feste Stimme und Position; Silben sind schnelle Pfeif-Bögen mit leichtem Flattern (FM)
  const syl=(v,pan,f0,f1,len,at,fm)=>{const d=dest(pan),o=AC.createOscillator(),m=AC.createOscillator(),mg=AC.createGain(),t=T0(at),x=filt('bandpass',(f0+f1)/2,1.2);
    o.type='sine';o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+len);m.frequency.value=fm||rnd(30,60);mg.gain.value=(f0+f1)*.025;m.connect(mg);mg.connect(o.frequency);
    o.connect(x);x.connect(d);d.gain.setValueAtTime(.0001,t);d.gain.exponentialRampToValueAtTime(v,t+len*.25);d.gain.exponentialRampToValueAtTime(.0001,t+len);o.start(t);m.start(t);o.stop(t+len+.03);m.stop(t+len+.03)};
  const birdVoice=()=>{const kind=pick(['pfeifer','triller','zwitscher','amsel']),base=rnd(2600,4600),pan=P(),vol=rnd(.025,.05),motif=[];
    for(let i=0;i<rnd(3,6);i++)motif.push([rnd(.75,1.3),rnd(.7,1.35),rnd(.05,.14)]);
    return()=>{let at=0;const reps=kind=='zwitscher'?rnd(2,4)|0:1;
      if(kind=='triller'){const n=rnd(12,24)|0,r=rnd(16,24);for(let i=0;i<n;i++)syl(vol*(.6+.4*Math.sin(i/n*3.1)),pan,base*1.15,base*.85,.035,i/r);return}
      if(kind=='amsel'){const b=base*.55;motif.forEach(([a,c,l],i)=>{syl(vol*1.1,pan,b*a,b*c,l*1.6,at,rnd(5,12));at+=l*1.6+rnd(.04,.1)});return}
      for(let r=0;r<reps;r++){motif.forEach(([a,c,l])=>{syl(vol,pan,base*a,base*c,kind=='zwitscher'?l*.5:l,at);at+=(kind=='zwitscher'?l*.5:l)+rnd(.03,.09)});at+=rnd(.15,.35)}}};
  const birds=(n,a,b)=>{for(let i=0;i<n;i++){const sing=birdVoice();every(a,b,sing)}};
  // Grashüpfer: gefiltertes Rauschen, schnell getaktet (zirpt, piept nicht)
  const grasshopper=(v,pan)=>{const d=dest(pan),x=filt('bandpass',rnd(6000,8000),3),dur=rnd(.8,2.2),r=rnd(18,28),t=T0();nz(NOISE,0,dur+.1).connect(x);x.connect(d);
    d.gain.setValueAtTime(.0001,t);for(let i=0;i<dur*r;i++){const tt=t+i/r;d.gain.setValueAtTime(v,tt);d.gain.setValueAtTime(.0001,tt+.5/r)}};
  const bee=v=>{fly(v);};
  // Krähe: rauer Ruf aus Sägezahn + Formanten + Rauschen, Tonhöhe fällt ab
  const shaper=(()=>{const c=new Float32Array(256);for(let i=0;i<256;i++){const x=i/128-1;c[i]=Math.tanh(x*4)}return c})();
  const crow=(v,pan)=>{const n=rnd(2,4)|0,gap=rnd(.35,.5),f0=rnd(420,540);for(let i=0;i<n;i++){const at=i*gap,t=T0(at),d=dest(pan),o=AC.createOscillator(),ws=AC.createWaveShaper(),f1=filt('bandpass',1150,3),f2=filt('bandpass',2300,4),mix=AC.createGain();
    ws.curve=shaper;o.type='sawtooth';o.frequency.setValueAtTime(f0*1.05,t);o.frequency.exponentialRampToValueAtTime(f0*.8,t+.28);o.connect(ws);ws.connect(f1);ws.connect(f2);f1.connect(mix);f2.connect(mix);mix.gain.value=.6;mix.connect(d);
    const nx=filt('bandpass',1500,1.5);nz(NOISE,at,.3).connect(nx);nx.connect(d);d.gain.setValueAtTime(.0001,t);d.gain.exponentialRampToValueAtTime(v,t+.025);d.gain.exponentialRampToValueAtTime(.0001,t+.3);o.start(t);o.stop(t+.33)}};
  // Wolf: fernes Heulen, langsam ansteigend und wieder fallend, mit Vibrato und viel Hall
  const wolf=(v,pan)=>{const d=dest(pan),o=AC.createOscillator(),vib=AC.createOscillator(),vg=AC.createGain(),x=filt('bandpass',750,1.5),lp=filt('lowpass',1100),t=T0(),f=rnd(260,320);
    o.type='triangle';o.frequency.setValueAtTime(f,t);o.frequency.linearRampToValueAtTime(f*1.9,t+.9);o.frequency.linearRampToValueAtTime(f*1.75,t+2);o.frequency.linearRampToValueAtTime(f*1.25,t+3);
    vib.frequency.value=5;vg.gain.value=6;vib.connect(vg);vg.connect(o.frequency);o.connect(x);x.connect(lp);lp.connect(d);
    d.gain.setValueAtTime(.0001,t);d.gain.exponentialRampToValueAtTime(v,t+.7);d.gain.setValueAtTime(v,t+2.2);d.gain.exponentialRampToValueAtTime(.0001,t+3.2);o.start(t);vib.start(t);o.stop(t+3.3);vib.stop(t+3.3)};
  // Ast bricht: mehrere trockene Knackser kurz hintereinander, danach raschelt es
  const crack=(v,pan,at)=>{const d=dest(pan),x=filt('highpass',1400);nz(NOISE,at,.03).connect(x);x.connect(d);env(d,at,v,.001,.02);knock(v*.8,pan,rnd(500,900),at+.004,5)};
  const branch=(v,pan,at)=>{at=at||0;const n=rnd(2,5)|0;let tt=at;for(let i=0;i<n;i++){crack(v*rnd(.6,1),pan,tt);tt+=rnd(.025,.11)}
    if(Math.random()<.6){const d=dest(pan),x=filt('highpass',2500),dur=rnd(.2,.4);nz(NOISE,tt,dur+.1).connect(x);x.connect(d);env(d,tt,v*.25,.05,dur)}};
  // Schritte im Laub: jemand läuft vorbei (wird lauter, wandert durchs Stereobild, wird leiser), manchmal knackt dabei ein Ast
  const steps=(v,pan)=>{const n=rnd(4,10)|0,gap=rnd(.42,.62),p1=Math.max(-1,Math.min(1,pan+rnd(-.9,.9)));
    for(let i=0;i<n;i++){const at=i*gap+rnd(-.03,.03),p=pan+(p1-pan)*i/n,lv=v*(.5+.5*Math.sin(Math.PI*(i+.5)/n));
      const d=dest(p),x=filt('lowpass',rnd(380,600));nz(BROWN,at,.12).connect(x);x.connect(d);env(d,at,lv,.005,.1);
      const c=dest(p),cx=filt('bandpass',rnd(2500,4500),1.2);nz(NOISE,at+.01,.1).connect(cx);cx.connect(c);env(c,at+.01,lv*.35,.01,rnd(.05,.1));
      if(Math.random()<.12)crack(lv*.9,p,at+.02)}
    if(Math.random()<.3)branch(v*1.1,p1,n*gap+rnd(.1,.6))};
  // Tierstimmen-Baukasten: Stimmband (Säge, Tonhöhenverlauf) → Formantfilter (Mund/Maul, Verlauf) → Hüllkurve; optional rau, Vibrato, Hauch
  const voc=(v,pan,at,dur,fs,fm,o)=>{o=o||{};const d=dest(pan),t=T0(at),src=AC.createOscillator();src.type=o.type||'sawtooth';
    src.frequency.setValueAtTime(fs[0][1],t);fs.slice(1).forEach(([x,f])=>src.frequency.linearRampToValueAtTime(f,t+x*dur));
    let n=src;if(o.rough){const ws=AC.createWaveShaper();ws.curve=shaper;src.connect(ws);n=ws}
    if(o.vib){const vb=AC.createOscillator(),vg=AC.createGain();vb.frequency.value=o.vib[0];vg.gain.value=o.vib[1];vb.connect(vg);vg.connect(src.frequency);vb.start(t);vb.stop(t+dur+.05)}
    fm.forEach(([q,pts,a])=>{const x=filt('bandpass',pts[0][1],q),g=AC.createGain();g.gain.value=a||1;x.frequency.setValueAtTime(pts[0][1],t);pts.slice(1).forEach(([xx,f])=>x.frequency.linearRampToValueAtTime(f,t+xx*dur));n.connect(x);x.connect(g);g.connect(d)});
    if(o.noise){const nx=filt('bandpass',o.noise[1],1),ng=AC.createGain();ng.gain.value=o.noise[0];nz(NOISE,at,dur).connect(nx);nx.connect(ng);ng.connect(d)}
    const a=o.att||.03;d.gain.setValueAtTime(.0001,t);d.gain.exponentialRampToValueAtTime(v,t+a);d.gain.setValueAtTime(v,t+Math.max(a,dur*.7));d.gain.exponentialRampToValueAtTime(.0001,t+dur);
    src.start(t);src.stop(t+dur+.05)};
  // Dorf-Tiere
  const dog=(v,pan)=>{const n=rnd(2,5)|0,f=rnd(260,380),gap=rnd(.25,.45);for(let i=0;i<n;i++)voc(v*rnd(.8,1),pan,i*gap+rnd(0,.05),.16,[[0,f*1.1],[.3,f*1.25],[1,f*.75]],[[3,[[0,700],[1,500]]],[4,[[0,1500],[1,1100]],.6]],{rough:1,noise:[.4,1200],att:.01})};
  const cat=(v,pan)=>{const f=rnd(450,650),dur=rnd(.6,1);voc(v,pan,0,dur,[[0,f],[.35,f*1.5],[1,f*.85]],[[5,[[0,800],[.4,1900],[1,700]]],[6,[[0,2400],[.4,3200],[1,1500]],.5]],{vib:[7,f*.02],att:.06})};
  const cow=(v,pan)=>{const f=rnd(95,125),dur=rnd(1.3,2.2);voc(v,pan,0,dur,[[0,f],[.2,f*1.25],[.8,f*1.15],[1,f*.85]],[[3,[[0,250],[.25,700],[1,350]]],[5,[[0,900],[.3,1300],[1,700]],.4]],{vib:[4,2],att:.15,noise:[.15,500]})};
  const pig=(v,pan)=>{const n=rnd(2,5)|0;let at=0;for(let i=0;i<n;i++){const f=rnd(70,110),du=rnd(.12,.22);voc(v*rnd(.7,1),pan,at,du,[[0,f],[1,f*.8]],[[4,[[0,450],[1,380]]],[6,[[0,1100],[1,900]],.5]],{rough:1,vib:[30,f*.4],noise:[.5,600],att:.01});at+=du+rnd(.05,.15)}};
  const rooster=(v,pan)=>{const f=rnd(550,650);let at=0;[[.13,1,1.15],[.13,1.2,1.3],[.15,1.25,1.2],[.75,1.35,1]].forEach(([du,a,b],i)=>{voc(v,pan,at,du,[[0,f*a],[.3,f*a*1.05],[1,f*b]],[[4,[[0,1100],[1,1000]]],[6,[[0,2600],[1,2400]],.6]],{rough:1,noise:[.2,2500],att:.015,vib:i==3?[18,f*.03]:null});at+=du+.03})};
  // Grille: kurze reine Zirp-Pulse in Dreiergruppen
  const cricket=(v,pan)=>{const f=rnd(4200,5000),n=rnd(3,8)|0,gap=rnd(.45,.6);for(let c=0;c<n;c++)for(let i=0;i<3;i++){const t=T0(c*gap+i*.03),d=dest(pan),o=AC.createOscillator();o.frequency.value=f;o.connect(d);
    d.gain.setValueAtTime(.0001,t);d.gain.exponentialRampToValueAtTime(v,t+.005);d.gain.exponentialRampToValueAtTime(.0001,t+.022);o.start(t);o.stop(t+.03)}};
  // Schmetterling: ganz leises Flügelflattern, das vorbeizieht
  const butterfly=v=>{const p0=rnd(-1,1),n=rnd(6,12)|0;let at=0;for(let i=0;i<n;i++){const d=dest(p0-1.2*p0*i/n),x=filt('bandpass',rnd(500,900),.8);nz(BROWN,at,.06).connect(x);x.connect(d);env(d,at,v*Math.sin(Math.PI*(i+.5)/n),.01,.05);at+=rnd(.09,.13)}};
  // Sumpf: Ochsenfrosch (tiefes Brummen) und Unke (glockiges „uuh“)
  const bullfrog=(v,pan)=>{const n=rnd(1,4)|0;for(let i=0;i<n;i++)voc(v,pan,i*rnd(.6,.9),rnd(.35,.5),[[0,rnd(90,120)],[1,rnd(80,95)]],[[3,[[0,300],[1,250]]],[5,[[0,700],[1,600]],.4]],{rough:1,vib:[25,15],att:.04})};
  const unke=(v,pan)=>{const f=rnd(380,460);for(let i=0;i<(rnd(1,4)|0);i++){const at=i*rnd(.9,1.3),t=T0(at),d=dest(pan),o=AC.createOscillator();o.frequency.value=f;o.connect(d);env(d,at,v,.04,.3);o.start(t);o.stop(t+.4)}};
  const P=()=>rnd(-.9,.9);
  RECIPE[loc]({bed,gusts,murmur,plop,splash,rustle,knock,croak,fly,creak,bell,clink,pickaxe,hoot,whisper,snap,flap,woodpecker,crackle,music,reverb,every,P,birds,grasshopper,bee,crow,wolf,steps,branch,
    dog,cat,cow,pig,rooster,cricket,butterfly,bullfrog,unke});
  return{stop(){tim.forEach(t=>{clearTimeout(t);clearInterval(t)});out.gain.setTargetAtTime(0,AC.currentTime,.5);setTimeout(()=>{src.forEach(s=>{try{s.stop()}catch(e){}});out.disconnect()},2500)}}}

// ----- Rezepte: was man wo hört -----
const RECIPE={
  // Birkenwald: sonnig – viele Vögel, Grashüpfer, Bienen, Blätter, ab und zu ein Specht, kaum Wind
  wald(k){k.reverb(1.2,3,.18);k.every(6000,14000,()=>k.cricket(.03,k.P()));k.every(15000,30000,()=>k.butterfly(.05));k.every(25000,50000,()=>k.steps(.06,k.P()));k.every(12000,26000,()=>k.branch(.05,k.P()));k.bed(.025,'lowpass',900);k.birds(4,2500,7000);k.every(1500,4500,()=>k.grasshopper(.012,k.P()));
    k.every(9000,18000,()=>k.bee(.03));k.every(900,3000,()=>k.rustle(rnd(.02,.04),k.P()));k.every(15000,30000,()=>k.woodpecker(.1,k.P()))},
  // Weggabelung: sonnige Wiese – Grashüpfer im Gras, Vögel, Bienen und Fliegen am Apfelbaum
  gabel(k){k.reverb(1,3,.12);k.every(4000,10000,()=>k.cricket(.032,k.P()));k.every(10000,22000,()=>k.butterfly(.06));k.every(30000,60000,()=>k.steps(.05,k.P()));k.every(18000,35000,()=>k.branch(.04,k.P()));k.bed(.025,'lowpass',900);k.birds(3,3000,8000);k.every(800,2500,()=>k.grasshopper(.014,k.P()));
    k.every(6000,12000,()=>k.bee(.035));k.every(12000,24000,()=>k.fly(.03));k.every(1200,3500,()=>k.rustle(.025,k.P()))},
  // Vor Baba Jagas Hütte: düster – kalter Wind, Krähen, die Hütte knarzt, der Kessel blubbert
  huette(k){k.reverb(1.8,3,.25);k.every(22000,45000,()=>k.wolf(.035,k.P()));k.every(14000,28000,()=>k.hoot(.05,k.P()));k.every(20000,40000,()=>k.steps(.07,k.P()));k.every(9000,20000,()=>k.branch(.08,k.P()));k.bed(.08,'lowpass',380,.6,.08,.6);k.gusts(.06,500);k.every(5000,12000,()=>k.crow(.07,k.P()));
    k.every(4000,9000,()=>k.creak(.08,rnd(-.2,.3)));k.every(300,900,()=>k.plop(.022,-.5,rnd(130,320)));k.every(18000,35000,()=>k.hoot(.05,k.P()))},
  // Hütte innen: Ofenfeuer knistert, Kessel brodelt, alte Dielen
  innen(k){k.reverb(.8,4,.18);k.bed(.06,'lowpass',260,.6,.3,.4);k.every(40,260,()=>k.crackle());k.every(150,600,()=>k.plop(.04,-.6,rnd(110,300)));k.every(7000,15000,()=>k.creak(.06,k.P()))},
  // Dunkler Wald: tiefes Dröhnen, Äste knarzen, Zweige knacken, Eule, ein Wolf in der Ferne
  sperre(k){k.reverb(2.2,2.5,.3);k.every(16000,32000,()=>k.wolf(.04,k.P()));k.every(10000,20000,()=>k.hoot(.05,k.P()));k.every(15000,30000,()=>k.steps(.08,k.P()));k.every(8000,16000,()=>k.branch(.09,k.P()));k.bed(.1,'lowpass',160,.6,.04,.5);k.every(3500,8000,()=>k.creak(.07,k.P()));k.every(6000,14000,()=>k.snap(.11,k.P()));
    k.every(14000,28000,()=>k.hoot(.06,k.P()));k.every(25000,50000,()=>k.wolf(.04,k.P()))},
  // Irrwald: noch düsterer – Flüstern, Knacken, Krähe, Wolf, Eule
  irrwald(k){k.reverb(2.8,2.2,.35);k.every(16000,32000,()=>k.wolf(.04,k.P()));k.every(10000,20000,()=>k.hoot(.05,k.P()));k.every(14000,28000,()=>k.steps(.08,k.P()));k.every(7000,15000,()=>k.branch(.09,k.P()));k.bed(.1,'lowpass',140,.6,.03,.6);k.every(4000,10000,()=>k.whisper(.035,k.P()));k.every(5000,12000,()=>k.snap(.1,k.P()));
    k.every(12000,24000,()=>k.crow(.05,k.P()));k.every(20000,40000,()=>k.wolf(.045,k.P()));k.every(15000,30000,()=>k.hoot(.05,k.P()))},
  // Dorfeingang: Spatzen, Wäsche flattert, Fliegen (Musik: Balalaika)
  dorf(k){k.reverb(1,3,.12);k.every(10000,22000,()=>k.dog(.07,k.P()));k.every(25000,50000,()=>k.cat(.08,k.P()));k.every(18000,36000,()=>k.cow(.08,k.P()));k.every(16000,32000,()=>k.pig(.08,k.P()));k.every(30000,60000,()=>k.rooster(.05,k.P()));k.bed(.02,'lowpass',800);k.birds(2,4000,10000);k.every(4000,9000,()=>k.flap(.05,k.P()));k.every(12000,25000,()=>k.fly(.04))},
  // Dorfstraße: Wäscheleine, Galjas Fernseher murmelt, Spatzen, Fliegen (Musik: Balalaika)
  dorfstr(k){k.reverb(1,3,.12);k.every(12000,26000,()=>k.dog(.07,k.P()));k.every(18000,36000,()=>k.cat(.085,k.P()));k.every(22000,44000,()=>k.cow(.075,k.P()));k.every(14000,30000,()=>k.pig(.08,k.P()));k.every(35000,70000,()=>k.rooster(.05,k.P()));k.bed(.02,'lowpass',800);k.murmur(.012,700);k.birds(2,5000,12000);k.every(3000,7000,()=>k.flap(.06,rnd(-.6,-.1)));k.every(9000,18000,()=>k.fly(.045))},
  // Kirche & Friedhof: Krähen auf dem Friedhof, Glocke von weit weg, Blätter (Musik: Balalaika aus der Ferne)
  kirche(k){k.reverb(3,2,.3);k.every(20000,40000,()=>k.dog(.025,k.P()));k.every(40000,80000,()=>k.rooster(.025,k.P()));k.every(8000,16000,()=>k.cricket(.015,k.P()));k.bed(.02,'lowpass',700);k.every(7000,15000,()=>k.crow(.05,k.P()));k.every(2000,5000,()=>k.rustle(.025,k.P()));k.every(30000,55000,()=>{for(let i=0;i<3;i++)k.bell(.05,-.3,i*2.2)})},
  // Mühle: rauschender Bach, Wasserrad poltert im Takt, Spritzer, ein paar Vögel
  muehle(k){k.bed(.16,'lowpass',1500,.5,.4,.3,NOISE);k.bed(.08,'lowpass',300);k.every(2100,2400,()=>{k.knock(.18,.2,rnd(180,240),0,5);k.creak(.04,.2)});k.every(150,500,()=>k.plop(.025,rnd(0,.5),rnd(500,1400)));k.birds(1,6000,14000)},
  // Fischerhaus: Wellen, Glucksen am Ufer, Plätschern, ein Fisch springt, Schilf
  fischer(k){k.every(14000,28000,()=>k.croak(.045,k.P()));k.bed(.13,'lowpass',600,.5,.13,.8);k.every(500,1600,()=>k.plop(.035,k.P(),rnd(300,800)));k.every(4000,9000,()=>{const p=k.P();for(let i=0;i<4;i++)k.plop(.03,p,rnd(500,1200),i*rnd(.06,.15))});
    k.every(1500,4000,()=>k.rustle(.025,k.P()));k.every(14000,28000,()=>k.splash(.07,k.P()));k.birds(1,8000,16000)},
  // Ufer: Wellen schwappen, Plätschern, Schilf, der Pier knarzt
  ufer(k){k.every(10000,22000,()=>k.croak(.05,k.P()));k.bed(.16,'lowpass',650,.5,.11,.8);k.every(400,1400,()=>k.plop(.035,k.P(),rnd(300,900)));k.every(3000,7000,()=>{const p=k.P();for(let i=0;i<5;i++)k.plop(.03,p,rnd(400,1100),i*rnd(.05,.12))});
    k.every(1000,3000,()=>k.rustle(.035,k.P()));k.every(8000,16000,()=>k.creak(.05,-.6));k.every(16000,32000,()=>k.splash(.06,k.P()))},
  // Unter dem Pier: Wasser schwappt hohl, Tropfen mit Hall, über dir knarzt Kusmitsch
  unter(k){k.reverb(1.4,2.5,.45);k.bed(.13,'lowpass',420,.5,.15,.7);k.every(400,1500,()=>k.plop(.05,k.P(),rnd(900,1800)));k.every(2500,6000,()=>{const p=k.P();for(let i=0;i<3;i++)k.plop(.04,p,rnd(250,600),i*.1)});
    k.every(5000,11000,()=>k.creak(.08,rnd(-.3,.3)))},
  // Sumpf: muffig, Frösche quaken, Fliegen brummen vorbei, es blubbert, manchmal platscht was
  sumpf(k){k.reverb(1.2,3,.15);k.every(5000,12000,()=>k.bullfrog(.07,k.P()));k.every(3000,8000,()=>k.unke(.035,k.P()));k.every(7000,15000,()=>k.cricket(.015,k.P()));k.every(20000,40000,()=>k.branch(.05,k.P()));k.bed(.13,'lowpass',170,.6,.05,.5);k.bed(.03,'lowpass',500,.6,.2,.6,NOISE);
    k.every(900,3500,()=>k.croak(.09,k.P()));k.every(3500,9000,()=>k.fly(.06));k.every(700,2500,()=>{const p=k.P();k.plop(.05,p,rnd(110,260));if(Math.random()<.5)k.plop(.04,p,rnd(130,300),.12)});
    k.every(10000,24000,()=>k.splash(.06,k.P()))},
  // Gnomsiedlung: Spitzhacken aus der Höhle, Vögel, Grashüpfer im Kohlbeet
  gnome(k){k.reverb(1.5,3,.25);k.every(8000,16000,()=>k.cricket(.026,k.P()));k.every(18000,35000,()=>k.butterfly(.05));k.every(25000,50000,()=>k.steps(.05,k.P()));k.bed(.025,'lowpass',800);k.every(1500,4000,()=>k.pickaxe(.035,rnd(.4,.9)));k.birds(2,4000,9000);k.every(2000,5000,()=>k.grasshopper(.01,rnd(-.9,-.2)))},
  // Höhle: großer Hall, Tropfen, tiefes Grollen, ferne Spitzhacken
  hoehle(k){k.reverb(3.5,2,.55);k.bed(.1,'lowpass',120,.6,.04,.5);k.every(500,2000,()=>k.plop(.05,k.P(),rnd(1000,2000)));k.every(6000,12000,()=>k.pickaxe(.02,k.P()));k.every(9000,20000,()=>k.whisper(.015,k.P()))},
  // Vor dem Banja: Musik dumpf durch die Wand, dunkler Wald, Eule
  banjaV(k){k.reverb(2,3,.2);k.every(20000,40000,()=>k.wolf(.035,k.P()));k.every(18000,36000,()=>k.steps(.07,k.P()));k.every(10000,22000,()=>k.branch(.07,k.P()));k.music(220,.6,.01);k.bed(.05,'lowpass',300,.6,.07,.6);k.every(14000,28000,()=>k.hoot(.05,k.P()))},
  // Im Banja: Musik, Gemurmel, Gläser klirren
  banja(k){k.reverb(.9,3,.2);k.music(1100,.45,.03);k.every(2000,6000,()=>k.clink(.05,k.P()))},
  // Bühnenrand: Musik laut und nah
  buehne(k){k.reverb(.9,3,.2);k.music(2500,.55,.02);k.every(3000,8000,()=>k.clink(.04,k.P()))},
  // Lounge: Musik hinter dem Vorhang
  lounge(k){k.reverb(.6,4,.15);k.music(500,.4)},
  // Startmenü: Nachtwald, Eule, ganz fern ein Wolf
  titel(k){k.reverb(2,3,.25);k.every(12000,24000,()=>k.hoot(.045,k.P()));k.every(20000,40000,()=>k.steps(.05,k.P()));k.every(10000,22000,()=>k.branch(.06,k.P()));k.bed(.06,'lowpass',300,.6,.06,.6);k.every(1500,5000,()=>k.rustle(.02,k.P()));k.every(10000,20000,()=>k.hoot(.05,k.P()));k.every(30000,60000,()=>k.wolf(.03,k.P()))}};
// ----- Anfangs-Zwischensequenz: eigene Geräusche (Wohnung, Tür, Joint, Husten, Rausch, Aufwachen) -----
let CUTAMB=null;// während der Zwischensequenz: welche Kulisse läuft ('' = keine, 'wald' beim Aufwachen)
const CS=(()=>{const T=at=>AC.currentTime+(at||0);
  const out=()=>{const g=AC.createGain();g.connect(MASTER);return g};
  const filt=(type,f,q)=>{const x=AC.createBiquadFilter();x.type=type;x.frequency.value=f;if(q)x.Q.value=q;return x};
  const nz=(buf,at,dur)=>{const s=AC.createBufferSource();s.buffer=buf||NOISE;s.start(T(at),Math.random()*1.5);s.stop(T(at)+dur+.05);return s};
  const env=(g,at,v,a,d)=>{const t=T(at);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(.0002,v),t+a);g.gain.exponentialRampToValueAtTime(.0001,t+a+d)};
  const hit=(v,f,at,dur,q,buf)=>{const g=out(),x=filt('bandpass',f,q||1.5);nz(buf||NOISE,at,dur+.05).connect(x);x.connect(g);env(g,at,v,.003,dur)};
  const thump=(v,f,at,dur)=>{const g=out(),o=AC.createOscillator(),t=T(at);o.frequency.setValueAtTime(f*1.8,t);o.frequency.exponentialRampToValueAtTime(f,t+.06);o.connect(g);env(g,at,v,.003,dur);o.start(t);o.stop(t+dur+.05)};
  const creak=(v,at,dur,f0,f1)=>{const g=out(),o=AC.createOscillator(),l=AC.createOscillator(),lg=AC.createGain(),x=filt('bandpass',900,6),t=T(at);
    o.type='sawtooth';o.frequency.setValueAtTime(f0,t);o.frequency.linearRampToValueAtTime(f1,t+dur);l.frequency.value=9;lg.gain.value=12;l.connect(lg);lg.connect(o.frequency);o.connect(x);x.connect(g);
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.05);g.gain.setValueAtTime(v,t+dur*.8);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.start(t);l.start(t);o.stop(t+dur+.05);l.stop(t+dur+.05)};
  const step=(v,at,hard)=>{hit(v,hard?260:180,at,.09,1.2,BROWN);hit(v*.4,hard?1800:1200,at+.005,.04,2)};
  let room=null,trip=null;
  const api={
    // Wohnungs-Kulisse: Kühlschrank-Brummen, Uhr tickt, Stadt draußen leise, ab und zu ein Auto
    roomOn(){if(!AC||room)return;const g=out();g.gain.value=0;g.gain.setTargetAtTime(1,T(),.8);const src=[],tim=[];
      const hum=AC.createOscillator(),hg=AC.createGain(),hx=filt('lowpass',180);hum.type='sawtooth';hum.frequency.value=50;hg.gain.value=.012;hum.connect(hx);hx.connect(hg);hg.connect(g);hum.start();src.push(hum);
      const city=AC.createBufferSource(),cx=filt('lowpass',400),cg=AC.createGain();city.buffer=BROWN;city.loop=true;cg.gain.value=.03;city.connect(cx);cx.connect(cg);cg.connect(g);city.start();src.push(city);
      let k=0;tim.push(setInterval(()=>{const t=AC.currentTime+.02,s=AC.createBufferSource(),x=filt('bandpass',k++%2?3200:2600,8),tg=AC.createGain();s.buffer=NOISE;s.connect(x);x.connect(tg);tg.connect(g);
        tg.gain.setValueAtTime(.06,t);tg.gain.exponentialRampToValueAtTime(.0001,t+.03);s.start(t,Math.random());s.stop(t+.05)},1000));
      const car=()=>{const t=AC.currentTime,s=AC.createBufferSource(),x=filt('lowpass',300),cg2=AC.createGain(),d=rnd(3,5);s.buffer=BROWN;s.connect(x);x.connect(cg2);cg2.connect(g);
        x.frequency.setValueAtTime(250,t);x.frequency.linearRampToValueAtTime(700,t+d/2);x.frequency.linearRampToValueAtTime(250,t+d);
        cg2.gain.setValueAtTime(.0001,t);cg2.gain.exponentialRampToValueAtTime(.08,t+d/2);cg2.gain.exponentialRampToValueAtTime(.0001,t+d);s.start(t);s.stop(t+d+.1);tim.push(setTimeout(car,rnd(7000,14000)))};
      tim.push(setTimeout(car,2500));
      room={stop(){tim.forEach(t=>{clearTimeout(t);clearInterval(t)});g.gain.setTargetAtTime(0,T(),.4);setTimeout(()=>{src.forEach(s=>{try{s.stop()}catch(e){}});g.disconnect()},2000)}}},
    roomOff(){if(room){room.stop();room=null}},
    // Am Joint ziehen: Glut knistert, Luft wird eingesogen
    drag(at){if(!AC)return;at=at||0;const g=out(),x=filt('bandpass',900,1.2),d=1.3;nz(NOISE,at,d).connect(x);x.connect(g);x.frequency.setValueAtTime(600,T(at));x.frequency.linearRampToValueAtTime(1400,T(at+d));
      g.gain.setValueAtTime(.0001,T(at));g.gain.exponentialRampToValueAtTime(.05,T(at+.3));g.gain.setValueAtTime(.05,T(at+d*.8));g.gain.exponentialRampToValueAtTime(.0001,T(at+d));
      for(let i=0;i<14;i++)hit(rnd(.04,.12),rnd(2500,5000),at+rnd(.1,d),.015,3)},
    // Ausatmen
    exhale(at){if(!AC)return;at=at||0;const g=out(),x=filt('bandpass',700,.8),d=1.6;nz(NOISE,at,d).connect(x);x.connect(g);x.frequency.setValueAtTime(1100,T(at));x.frequency.linearRampToValueAtTime(400,T(at+d));env(g,at,.04,.15,d-.15)},
    // Schritte im Flur, kommen näher
    hallSteps(n){if(!AC)return;for(let i=0;i<n;i++)step(.06+.12*i/n,i*.38,1)},
    // Wowa reißt die Tür auf: Klinke, Tür fliegt auf, knallt gegen die Wand, zittert nach
    doorBurst(){if(!AC)return;hit(.35,2200,0,.04,4);hit(.25,1500,.03,.05,5);
      creak(.06,.06,.22,90,140);
      thump(.6,70,.24,.35);hit(.5,400,.24,.25,1,BROWN);hit(.25,1800,.24,.08,2);
      for(let i=0;i<5;i++)hit(.12*(1-i/5),rnd(300,500),.36+i*.07,.05,4,BROWN);
      hit(.08,3000,.28,.25,6)},
    // Schritte auf Dielen (Wowa kommt rein)
    steps(n,v){if(!AC)return;for(let i=0;i<n;i++)step((v||.25)*rnd(.8,1),i*.33+rnd(-.02,.02),1)},
    // Husten
    cough(n,v){if(!AC)return;let at=0;for(let i=0;i<n;i++){const g=out(),x=filt('bandpass',rnd(500,800),1.5),x2=filt('bandpass',rnd(1600,2200),3),d=rnd(.14,.22);const s=nz(NOISE,at,d);s.connect(x);s.connect(x2);x.connect(g);x2.connect(g);
      env(g,at,(v||.25)*rnd(.8,1),.008,d);thump((v||.25)*.4,110,at,.1);at+=d+rnd(.08,.18)}},
    // Rausch: tiefes Dröhnen + flirrender Ton, Herzschlag, wird immer stärker
    tripOn(){if(!AC||trip)return;const g=out();g.gain.value=.0001;const src=[],tim=[];
      const drone=AC.createBufferSource(),dx=filt('lowpass',200,4),dg=AC.createGain();drone.buffer=BROWN;drone.loop=true;dg.gain.value=.25;drone.connect(dx);dx.connect(dg);dg.connect(g);drone.start();src.push(drone);
      dx.frequency.setTargetAtTime(700,T(),3);
      [110,110*1.498,220*1.01].forEach(f=>{const o=AC.createOscillator(),og=AC.createGain(),l=AC.createOscillator(),lg=AC.createGain();o.type='sine';o.frequency.value=f;l.frequency.value=rnd(.2,.6);lg.gain.value=f*.03;l.connect(lg);lg.connect(o.frequency);og.gain.value=.04;o.connect(og);og.connect(g);o.start();l.start();src.push(o,l)});
      const beat=()=>{thump(.25,48,0,.18);thump(.18,44,.22,.2);tim.push(setTimeout(beat,rnd(820,900)))};beat();
      g.gain.exponentialRampToValueAtTime(.6,T(4));g.gain.exponentialRampToValueAtTime(1,T(9));
      trip={src,tim,g}},
    // Absturz in die Ohnmacht: Rauschen fällt, dann Stille
    fall(){if(!AC)return;const g=out(),x=filt('bandpass',2400,1.5),d=2.6;nz(NOISE,0,d).connect(x);x.connect(g);x.frequency.setValueAtTime(2400,T());x.frequency.exponentialRampToValueAtTime(120,T(d));env(g,0,.18,.4,d-.4);
      thump(.5,40,d-.3,.8);
      if(trip){const t=trip;trip=null;t.tim.forEach(clearTimeout);t.g.gain.setTargetAtTime(.0001,T(1),.6);setTimeout(()=>{t.src.forEach(s=>{try{s.stop()}catch(e){}});t.g.disconnect()},5000)}},
    // Aufwachen: dumpfes Ohrenklingeln, das abklingt
    ring(){if(!AC)return;const g=out(),o=AC.createOscillator(),t=T();o.frequency.value=3900;o.connect(g);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.02,t+.4);g.gain.exponentialRampToValueAtTime(.0001,t+4.5);o.start(t);o.stop(t+4.6)},
    // Stöhnen beim Aufwachen
    groan(at){if(!AC)return;at=at||0;const g=out(),o=AC.createOscillator(),x=filt('bandpass',550,3),x2=filt('bandpass',1100,5),t=T(at),d=1.1;o.type='sawtooth';o.frequency.setValueAtTime(120,t);o.frequency.linearRampToValueAtTime(135,t+.3);o.frequency.linearRampToValueAtTime(95,t+d);
      o.connect(x);o.connect(x2);x.connect(g);x2.connect(g);env(g,at,.08,.15,d-.15);o.start(t);o.stop(t+d+.05)},
    end(){api.roomOff();if(trip)api.fall();CUTAMB=null}};
  return api})();
setInterval(()=>{if(!AC||AC.state!=='running')return;const want=$('#start')?'titel':$('#cut')&&CUTAMB!=null?CUTAMB:(cur||'');if(want===ambCur)return;ambCur=want;if(ambNow)ambNow.stop();ambNow=want?makeAmb(want):null},300);

// ----- Schritte (weiches Rauschen), Effekte nur mit echten Dateien -----
const HARD={innen:1,banja:1,buehne:1,lounge:1,unter:1,hoehle:1};let stepT=0;
setInterval(()=>{if(!AC||AC.state!=='running'||!mv||$('#start'))return;const n=performance.now();if(n-stepT<360)return;stepT=n;
  if(playFile(HARD[cur]?'step-wood':'step-grass',.6))return;
  const t=AC.currentTime,s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=NOISE;f.type='lowpass';f.frequency.value=HARD[cur]?900:500;
  g.gain.setValueAtTime(HARD[cur]?.12:.09,t);g.gain.exponentialRampToValueAtTime(.0001,t+.09);s.connect(f);f.connect(g);g.connect(MASTER);s.start(t,Math.random()*1.5);s.stop(t+.12);
  // Draußen im Wald tritt Petja ab und zu auf einen Zweig
  if(TWIG[cur]&&Math.random()<.07){const n=1+(Math.random()*3|0);for(let i=0;i<n;i++){const tt=t+.02+i*rnd(.02,.07),c=AC.createBufferSource(),x=AC.createBiquadFilter(),cg=AC.createGain(),b=AC.createBiquadFilter(),bg=AC.createGain(),c2=AC.createBufferSource();
    c.buffer=c2.buffer=NOISE;x.type='highpass';x.frequency.value=1400;b.type='bandpass';b.frequency.value=rnd(500,900);b.Q.value=5;
    cg.gain.setValueAtTime(.12,tt);cg.gain.exponentialRampToValueAtTime(.0001,tt+.025);bg.gain.setValueAtTime(.1,tt);bg.gain.exponentialRampToValueAtTime(.0001,tt+.07);
    c.connect(x);x.connect(cg);cg.connect(MASTER);c2.connect(b);b.connect(bg);bg.connect(MASTER);c.start(tt,Math.random()*1.5);c.stop(tt+.05);c2.start(tt,Math.random()*1.5);c2.stop(tt+.1)}}},40);
const TWIG={wald:1,gabel:1,huette:1,sperre:1,irrwald:1,gnome:1,banjaV:1,kirche:1};
function sfx(k){playFile(k)}
document.addEventListener('click',e=>{if(e.target.closest('button'))sfx('click')},true);
const _toastS=toast;toast=function(m,c){_toastS(m,c);if(c=='item'||c=='done'||c=='new')sfx(c)};
