// ================= Geräusche (live erzeugt mit Web Audio, keine Dateien) =================
// Umgebung je Ort, Schritte, Klicks im Menü, Gegenstand eingesteckt. Lautstärke: Menü → Einstellungen (OPT.sfx).
let AC=null,MASTER=null,NOISE=null,ambNow=null,ambCur='';
function initAudio(){if(AC)return;try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){return}
  MASTER=AC.createGain();MASTER.gain.value=OPT.sfx;MASTER.connect(AC.destination);
  NOISE=AC.createBuffer(1,AC.sampleRate*2,AC.sampleRate);const d=NOISE.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1}
['pointerdown','keydown'].forEach(ev=>addEventListener(ev,()=>{initAudio();if(AC&&AC.state==='suspended'&&!document.hidden)AC.resume()},true));
document.addEventListener('visibilitychange',()=>{if(!AC)return;document.hidden?AC.suspend():AC.resume()});
function sfxVolume(){if(MASTER)MASTER.gain.setTargetAtTime(OPT.sfx,AC.currentTime,.05)}
const rnd=(a,b)=>a+Math.random()*(b-a);
function tone(dest,type,f0,f1,dur,vol,at){const t=AC.currentTime+(at||0),o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.setValueAtTime(f0,t);
  if(f1)o.frequency.exponentialRampToValueAtTime(f1,t+dur);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+Math.min(.02,dur/4));g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  o.connect(g);g.connect(dest);o.start(t);o.stop(t+dur+.05)}
function burst(dest,dur,vol,ftype,freq,at){const t=AC.currentTime+(at||0),s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=NOISE;f.type=ftype;f.frequency.value=freq;
  g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0001,t+dur);s.connect(f);f.connect(g);g.connect(dest);s.start(t,Math.random()*1.5);s.stop(t+dur+.05)}

// ----- Umgebungen -----
function makeAmb(type){const out=AC.createGain();out.gain.value=0;out.connect(MASTER);out.gain.setTargetAtTime(1,AC.currentTime,.8);const src=[],tim=[];
  const every=(a,b,fn)=>{const go=()=>{fn();tim.push(setTimeout(go,rnd(a,b)))};tim.push(setTimeout(go,rnd(a*.3,b*.6)))};
  const bed=(lvl,ftype,freq,lfo)=>{const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=NOISE;s.loop=true;f.type=ftype;f.frequency.value=freq;f.Q.value=.7;g.gain.value=lvl;
    if(lfo){const o=AC.createOscillator(),og=AC.createGain();o.frequency.value=lfo;og.gain.value=lvl*.6;o.connect(og);og.connect(g.gain);o.start();src.push(o)}
    s.connect(f);f.connect(g);g.connect(out);s.start();src.push(s)};
  const wind=(l,f)=>bed(l,'bandpass',f||450,.08),water=(l,f)=>bed(l,'lowpass',f||900,.3);
  const birds=(a,b)=>every(a,b,()=>{const n=2+Math.random()*3|0,base=rnd(2400,4200);for(let i=0;i<n;i++)tone(out,'sine',base*rnd(.9,1.15),base*rnd(1.1,1.4),.09,.035,i*.12)});
  const owl=()=>every(7000,15000,()=>{tone(out,'sine',390,350,.35,.06);tone(out,'sine',370,330,.5,.05,.55)});
  const crickets=(v)=>every(500,1100,()=>{for(let i=0;i<3;i++)tone(out,'sine',4300,0,.035,v||.012,i*.06)});
  const frogs=()=>every(1500,4000,()=>{const n=1+Math.random()*3|0;for(let i=0;i<n;i++)tone(out,'sawtooth',rnd(95,130),75,.22,.035,i*.3)});
  const drips=(()=>{let dl=null;return()=>{if(!dl){dl=AC.createDelay();dl.delayTime.value=.27;const fb=AC.createGain();fb.gain.value=.35;dl.connect(fb);fb.connect(dl);dl.connect(out)}
    every(700,2600,()=>{const f=rnd(900,1700);tone(out,'sine',f,f*.7,.25,.05);tone(dl,'sine',f,f*.7,.25,.03)})}})();
  const fire=()=>{bed(.03,'lowpass',300);every(40,260,()=>burst(out,.025,rnd(.02,.08),'highpass',2200))};
  const club=(cut)=>{const lp=AC.createBiquadFilter();lp.type='lowpass';lp.frequency.value=cut;lp.connect(out);const bass=[55,55,65.4,49];let beat=0;
    tim.push(setInterval(()=>{tone(lp,'sine',150,42,.25,.5);if(beat%2==0)tone(lp,'sawtooth',bass[(beat/2|0)%4],0,.42,.12);if(beat%4==2)burst(lp,.08,.12,'highpass',3000);beat++},500))};
  ({forest(){wind(.18);birds(900,3200)},dark(){wind(.28,300);owl();crickets(.008)},village(){wind(.14);birds(2500,7000)},mill(){water(.32,1200);birds(3000,8000)},
    lake(){water(.22,700);wind(.1);birds(4000,9000)},under(){water(.3,500);drips()},swamp(){water(.07,500);frogs();crickets()},cave(){wind(.08,200);drips()},
    indoor(){fire()},clubOut(){club(260);wind(.16,300);owl()},clubIn(){club(1100)},title(){wind(.2,300);crickets(.008);owl()}})[type]();
  return{stop(){tim.forEach(t=>{clearTimeout(t);clearInterval(t)});out.gain.setTargetAtTime(0,AC.currentTime,.4);setTimeout(()=>{src.forEach(s=>{try{s.stop()}catch(e){}});out.disconnect()},2500)}}}
const AMBMAP={wald:'forest',gabel:'forest',gnome:'forest',huette:'dark',sperre:'dark',irrwald:'dark',dorf:'village',dorfstr:'village',kirche:'village',muehle:'mill',
  fischer:'lake',ufer:'lake',unter:'under',sumpf:'swamp',hoehle:'cave',innen:'indoor',banjaV:'clubOut',banja:'clubIn',buehne:'clubIn',lounge:'clubIn'};
setInterval(()=>{if(!AC||AC.state!=='running')return;const want=$('#start')?'title':(AMBMAP[cur]||'');if(want===ambCur)return;ambCur=want;if(ambNow)ambNow.stop();ambNow=want?makeAmb(want):null},300);

// ----- Schritte, Klicks, Gegenstände -----
const HARD={innen:1,banja:1,buehne:1,lounge:1,unter:1,hoehle:1};let stepT=0;
setInterval(()=>{if(!AC||AC.state!=='running'||!mv||$('#start'))return;const n=performance.now();if(n-stepT<340)return;stepT=n;
  HARD[cur]?burst(MASTER,.06,.16,'bandpass',1400):burst(MASTER,.07,.12,'lowpass',700)},40);
function sfx(k){if(!AC||AC.state!=='running')return;
  if(k=='click')tone(MASTER,'sine',880,660,.05,.06);
  if(k=='item'){[660,880,1320].forEach((f,i)=>tone(MASTER,'triangle',f,0,.12,.08,i*.07))}
  if(k=='done'){[523,659,784,1046].forEach((f,i)=>tone(MASTER,'triangle',f,0,.18,.08,i*.09))}
  if(k=='new')tone(MASTER,'sine',700,1050,.15,.06)}
document.addEventListener('click',e=>{if(e.target.closest('button'))sfx('click')},true);
const _toastS=toast;toast=function(m,c){_toastS(m,c);if(c=='item'||c=='done'||c=='new')sfx(c)};
