// ================= Geräusche =================
// 1) Echte Aufnahmen haben Vorrang: Liegt eine Datei in assets/sound/, wird sie benutzt (siehe SOUNDFILES unten).
// 2) Sonst nur dezentes, erzeugtes Rauschen (Wind, Wasser, Feuer), Schritte und der dumpfe Bass am Banja.
//    Keine erzeugten Piep-Töne (Vögel, Klicks …) – die klangen zu sehr nach Roboter.
// Lautstärke: Menü → Einstellungen (OPT.sfx).
let AC=null,MASTER=null,NOISE=null,ambNow=null,ambCur='';
function initAudio(){if(AC)return;try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){return}
  MASTER=AC.createGain();MASTER.gain.value=OPT.sfx;MASTER.connect(AC.destination);
  NOISE=AC.createBuffer(1,AC.sampleRate*2,AC.sampleRate);const d=NOISE.getChannelData(0);let b=0;for(let i=0;i<d.length;i++){b=.97*b+.03*(Math.random()*2-1);d[i]=b*6}}
['pointerdown','keydown'].forEach(ev=>addEventListener(ev,()=>{initAudio();if(AC&&AC.state==='suspended'&&!document.hidden)AC.resume()},true));
document.addEventListener('visibilitychange',()=>{if(AC)document.hidden?AC.suspend():AC.resume();if(ambNow&&ambNow.el)document.hidden?ambNow.el.pause():ambNow.el.play().catch(()=>{})});
function sfxVolume(){if(MASTER)MASTER.gain.setTargetAtTime(OPT.sfx,AC.currentTime,.05);if(ambNow&&ambNow.el)ambNow.el.volume=Math.min(1,OPT.sfx)}
const rnd=(a,b)=>a+Math.random()*(b-a);

// ----- Echte Sound-Dateien (optional). Einfach mit diesen Namen in assets/sound/ legen (mp3 oder ogg). -----
// Umgebung: amb-forest, amb-dark, amb-village, amb-mill, amb-lake, amb-under, amb-swamp, amb-cave, amb-indoor, amb-clubOut, amb-clubIn, amb-title
// Effekte:  step-grass, step-wood, click, item, done, new
const SNDOK={};
function probe(name){if(name in SNDOK)return;SNDOK[name]=null;const tryExt=ext=>{const a=new Audio();a.preload='auto';
    a.oncanplaythrough=()=>{if(!SNDOK[name])SNDOK[name]=a.src};a.onerror=()=>{if(ext=='mp3')tryExt('ogg')};a.src='assets/sound/'+name+'.'+ext};tryExt('mp3')}
['forest','dark','village','mill','lake','under','swamp','cave','indoor','clubOut','clubIn','title'].forEach(t=>probe('amb-'+t));
['step-grass','step-wood','click','item','done','new'].forEach(probe);
function playFile(name,vol){const src=SNDOK[name];if(!src)return false;const a=new Audio(src);a.volume=Math.max(0,Math.min(1,OPT.sfx*(vol||1)));a.play().catch(()=>{});return true}

// ----- Erzeugte Umgebung: nur Rauschen, kein Piepen -----
function makeAmb(type){
  if(SNDOK['amb-'+type]){const el=new Audio(SNDOK['amb-'+type]);el.loop=true;el.volume=0;el.play().catch(()=>{});let v=0;const fi=setInterval(()=>{v=Math.min(1,v+.05);el.volume=v*Math.min(1,OPT.sfx);if(v>=1)clearInterval(fi)},80);
    return{el,stop(){clearInterval(fi);const fo=setInterval(()=>{el.volume=Math.max(0,el.volume-.05);if(el.volume<=0){clearInterval(fo);el.pause()}},80)}}}
  if(!AC)return null;const out=AC.createGain();out.gain.value=0;out.connect(MASTER);out.gain.setTargetAtTime(1,AC.currentTime,1.2);const src=[],tim=[];
  const every=(a,b,fn)=>{const go=()=>{fn();tim.push(setTimeout(go,rnd(a,b)))};tim.push(setTimeout(go,rnd(a*.3,b*.6)))};
  const bed=(lvl,ftype,freq,lfo)=>{const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=NOISE;s.loop=true;f.type=ftype;f.frequency.value=freq;f.Q.value=.5;g.gain.value=lvl;
    if(lfo){const o=AC.createOscillator(),og=AC.createGain();o.frequency.value=lfo;og.gain.value=lvl*.5;o.connect(og);og.connect(g.gain);o.start();src.push(o)}
    s.connect(f);f.connect(g);g.connect(out);s.start(0,Math.random()*1.5);src.push(s)};
  const crackle=(t,vol)=>{const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain(),now=AC.currentTime;s.buffer=NOISE;f.type='highpass';f.frequency.value=1800;
    g.gain.setValueAtTime(vol,now);g.gain.exponentialRampToValueAtTime(.0001,now+t);s.connect(f);f.connect(g);g.connect(out);s.start(now,Math.random()*1.5);s.stop(now+t+.05)};
  const wind=(l,f)=>bed(l,'lowpass',f||600,.07),water=(l,f)=>bed(l,'lowpass',f||900,.25);
  const club=(cut)=>{const lp=AC.createBiquadFilter();lp.type='lowpass';lp.frequency.value=cut;lp.connect(out);
    tim.push(setInterval(()=>{const t=AC.currentTime,o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.setValueAtTime(110,t);o.frequency.exponentialRampToValueAtTime(42,t+.18);
      g.gain.setValueAtTime(.45,t);g.gain.exponentialRampToValueAtTime(.0001,t+.3);o.connect(g);g.connect(lp);o.start(t);o.stop(t+.35)},500))};
  ({forest(){wind(.16)},dark(){wind(.24,400)},village(){wind(.12)},mill(){water(.3,1100)},lake(){water(.2,700);wind(.08)},under(){water(.28,500)},
    swamp(){water(.08,450);wind(.08,350)},cave(){wind(.08,250)},indoor(){bed(.03,'lowpass',250);every(60,320,()=>crackle(.03,rnd(.02,.07)))},
    clubOut(){club(180);wind(.14,400)},clubIn(){club(700)},title(){wind(.18,400)}})[type]();
  return{stop(){tim.forEach(t=>{clearTimeout(t);clearInterval(t)});out.gain.setTargetAtTime(0,AC.currentTime,.5);setTimeout(()=>{src.forEach(s=>{try{s.stop()}catch(e){}});out.disconnect()},2500)}}}
const AMBMAP={wald:'forest',gabel:'forest',gnome:'forest',huette:'dark',sperre:'dark',irrwald:'dark',dorf:'village',dorfstr:'village',kirche:'village',muehle:'mill',
  fischer:'lake',ufer:'lake',unter:'under',sumpf:'swamp',hoehle:'cave',innen:'indoor',banjaV:'clubOut',banja:'clubIn',buehne:'clubIn',lounge:'clubIn'};
setInterval(()=>{if(!AC||AC.state!=='running')return;const want=$('#start')?'title':(AMBMAP[cur]||'');if(want===ambCur)return;ambCur=want;if(ambNow)ambNow.stop();ambNow=want?makeAmb(want):null},300);

// ----- Schritte (weiches Rauschen), Effekte nur mit echten Dateien -----
const HARD={innen:1,banja:1,buehne:1,lounge:1,unter:1,hoehle:1};let stepT=0;
setInterval(()=>{if(!AC||AC.state!=='running'||!mv||$('#start'))return;const n=performance.now();if(n-stepT<360)return;stepT=n;
  if(playFile(HARD[cur]?'step-wood':'step-grass',.6))return;
  const t=AC.currentTime,s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=NOISE;f.type='lowpass';f.frequency.value=HARD[cur]?900:500;
  g.gain.setValueAtTime(HARD[cur]?.12:.09,t);g.gain.exponentialRampToValueAtTime(.0001,t+.09);s.connect(f);f.connect(g);g.connect(MASTER);s.start(t,Math.random()*1.5);s.stop(t+.12)},40);
function sfx(k){playFile(k)}
document.addEventListener('click',e=>{if(e.target.closest('button'))sfx('click')},true);
const _toastS=toast;toast=function(m,c){_toastS(m,c);if(c=='item'||c=='done'||c=='new')sfx(c)};
