// ================= Ambient-Musik (leise, generativ, kein Musikplayer) =================
// Weicher Klangteppich (Pad) + vereinzelte Töne mit viel Hall. Jede Stimmung hat Tonart, Akkorde, Helligkeit und Dichte.
// Kein Loop, keine festen Lieder: Akkorde und Töne werden laufend neu gewürfelt. Wechselt nur, wenn die Stimmung wechselt.
// Lautstärke: Menü → Einstellungen (OPT.mus). Liegt assets/sound/mus-<stimmung>.mp3 vor, wird stattdessen die Datei leise geloopt.
if(OPT.mus==null)OPT.mus=.35;
const MOOD={wald:'wald',gabel:'wald',gnome:'wald',huette:'dunkel',sperre:'dunkel',irrwald:'dunkel',dorf:'dorf',dorfstr:'dorf',kirche:'dorf',
  muehle:'wasser',fischer:'wasser',ufer:'wasser',unter:'wasser',sumpf:'sumpf',hoehle:'hoehle',innen:'innen'};
// root = Grundton (MIDI), sc = Tonleiter, ch = Akkorde als Stufen, cut = Helligkeit des Teppichs, gap = Pause zwischen Tönen (ms), oct = Lage der Töne
const MUSIK={
  wald:  {root:50,sc:[0,2,3,5,7,9,10],ch:[[0,2,4],[3,5,7],[6,1,3],[4,6,8]],cut:1100,gap:[2200,6000],oct:[24,36],pad:.05,tone:.05},
  dunkel:{root:45,sc:[0,1,3,5,7,8,10],ch:[[0,2,4],[5,0,2],[1,3,5],[0,2,4]],cut:550,gap:[5000,12000],oct:[12,24],pad:.06,tone:.04},
  dorf:  {root:43,sc:[0,2,3,5,7,8,10],ch:[[0,2,4],[5,0,2],[2,4,6],[6,1,3]],cut:900,gap:[2500,7000],oct:[24,31],pad:.05,tone:.05},
  wasser:{root:48,sc:[0,2,4,7,9],ch:[[0,1,2],[3,4,1],[1,2,3],[4,1,2]],cut:1300,gap:[1800,5000],oct:[24,36],pad:.045,tone:.045},
  sumpf: {root:40,sc:[0,1,3,5,7,8,10],ch:[[0,2,4],[1,3,5],[0,2,4],[6,1,3]],cut:420,gap:[4000,10000],oct:[12,24],pad:.065,tone:.035,detune:14},
  hoehle:{root:42,sc:[0,2,3,5,7,8,10],ch:[[0,2,4],[0,2,4],[5,0,2]],cut:380,gap:[7000,16000],oct:[31,43],pad:.04,tone:.03},
  innen: {root:38,sc:[0,2,3,5,7,8,11],ch:[[0,2,4],[3,5,0],[4,6,1],[0,2,4]],cut:700,gap:[3500,9000],oct:[19,31],pad:.05,tone:.04},
  titel: {root:50,sc:[0,2,3,5,7,8,10],ch:[[0,2,4],[5,0,2],[3,5,0],[4,6,1]],cut:700,gap:[3000,8000],oct:[19,31],pad:.05,tone:.045}};
['wald','dunkel','dorf','wasser','sumpf','hoehle','innen','titel'].forEach(m=>probe('mus-'+m));
let MUS=null,MREV=null,musNow=null,musCur='';
const mtof=m=>440*Math.pow(2,(m-69)/12);
function musInit(){if(MUS||!AC)return;MUS=AC.createGain();MUS.gain.value=OPT.mus;MUS.connect(AC.destination);
  const len=AC.sampleRate*4.5|0,ir=AC.createBuffer(2,len,AC.sampleRate);for(let c=0;c<2;c++){const d=ir.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.2)}
  MREV=AC.createConvolver();MREV.buffer=ir;const w=AC.createGain();w.gain.value=.9;MREV.connect(w);w.connect(MUS)}
function musVolume(){if(MUS)MUS.gain.setTargetAtTime(OPT.mus,AC.currentTime,.1);if(musNow&&musNow.el)musNow.el.volume=Math.min(1,OPT.mus)}
function makeMusic(name){const M=MUSIK[name];if(!M)return null;
  if(SNDOK['mus-'+name]){const el=new Audio(SNDOK['mus-'+name]);el.loop=true;el.volume=0;el.play().catch(()=>{});let v=0;const fi=setInterval(()=>{v=Math.min(1,v+.03);el.volume=v*Math.min(1,OPT.mus);if(v>=1)clearInterval(fi)},100);
    return{el,stop(){clearInterval(fi);const fo=setInterval(()=>{el.volume=Math.max(0,el.volume-.03);if(el.volume<=0){clearInterval(fo);el.pause()}},100)}}}
  const out=AC.createGain();out.gain.value=0;out.connect(MUS);out.connect(MREV);out.gain.setTargetAtTime(1,AC.currentTime,2.5);const tim=[];let alive=true,chordIdx=0;
  const deg=(d,o)=>M.root+(o||0)+M.sc[((d%M.sc.length)+M.sc.length)%M.sc.length]+12*Math.floor(d/M.sc.length);
  // Teppich: pro Akkordton zwei leicht verstimmte Sägezähne hinter einem weichen Tiefpass, langsames Ein- und Ausblenden
  const padChord=()=>{if(!alive)return;const ch=M.ch[chordIdx++%M.ch.length],t=AC.currentTime,dur=rnd(14,22),lp=AC.createBiquadFilter(),g=AC.createGain(),lfo=AC.createOscillator(),lg=AC.createGain();
    lp.type='lowpass';lp.frequency.value=M.cut;lp.Q.value=.3;lfo.frequency.value=rnd(.05,.12);lg.gain.value=M.cut*.25;lfo.connect(lg);lg.connect(lp.frequency);
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(M.pad,t+5);g.gain.setValueAtTime(M.pad,t+dur);g.gain.exponentialRampToValueAtTime(.0001,t+dur+6);lp.connect(g);g.connect(out);
    const os=[lfo];ch.forEach(d=>{[-1,1].forEach(s=>{const o=AC.createOscillator();o.type='sawtooth';o.frequency.value=mtof(deg(d,12));o.detune.value=s*(M.detune||6);o.connect(lp);os.push(o)})});
    const b=AC.createOscillator(),bg=AC.createGain();b.type='sine';b.frequency.value=mtof(deg(ch[0]));bg.gain.value=.5;b.connect(bg);bg.connect(lp);os.push(b);
    os.forEach(o=>{o.start(t);o.stop(t+dur+7)});tim.push(setTimeout(padChord,dur*1000))};
  // Einzelne Töne: weich angeschlagen, lang ausklingend, meist in kleinen Gruppen von 1–3, dann wieder Ruhe
  const note=(m,at,v)=>{const t=AC.currentTime+at,f=mtof(m),g=AC.createGain(),lp=AC.createBiquadFilter(),dec=rnd(2.5,4.5);lp.type='lowpass';lp.frequency.value=Math.min(2600,f*3);
    [[f,'triangle',1],[f*2,'sine',.25]].forEach(([fr,ty,a])=>{const o=AC.createOscillator(),og=AC.createGain();o.type=ty;o.frequency.value=fr;og.gain.value=a;o.connect(og);og.connect(lp);o.start(t);o.stop(t+dec+.2)});
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.09);g.gain.exponentialRampToValueAtTime(.0001,t+dec);lp.connect(g);g.connect(out)};
  let last=rnd(0,5)|0;
  const phrase=()=>{if(!alive)return;const n=1+(Math.random()*3|0);let at=0;
    for(let i=0;i<n;i++){last=Math.max(0,Math.min(12,last+pick([-2,-1,1,2,0,-3,3])));const oct=M.oct[Math.random()*M.oct.length|0];note(deg(last,oct),at,M.tone*rnd(.6,1));at+=rnd(.5,1.4)}
    tim.push(setTimeout(phrase,rnd(M.gap[0],M.gap[1])+at*1000))};
  padChord();tim.push(setTimeout(phrase,rnd(2000,5000)));
  return{stop(){alive=false;tim.forEach(clearTimeout);out.gain.setTargetAtTime(0,AC.currentTime,2);setTimeout(()=>out.disconnect(),9000)}}}
setInterval(()=>{if(!AC||AC.state!=='running')return;musInit();const want=$('#start')?'titel':(MOOD[cur]||'');if(want===musCur)return;musCur=want;if(musNow)musNow.stop();musNow=want?makeMusic(want):null},400);
