// ================= Beziehungen (Notizbuch → Figuren, Taste C) =================
// Jede Figur hat einen Wert von -100 (Feindselig) bis +100 (Eng verbunden). Er ergibt sich aus dem, was Petja getan hat
// (Schnaps geklaut, Haus gebaut, Krähe beworfen …) plus wie oft er mit jemandem redet. So bleibt er auch für alte Spielstände stimmig.
// Ändert sich ein Wert spürbar, meldet sich das Spiel kurz: „Nastja mag dich mehr“ / „Kusmitsch mag dich weniger“.
const RTALK={fischer:'kusmitsch',oma:'oma',opa:'opa',baba:'baba',gnom1:'grobnik',madame:'zinaida',nastja2:'nastja',nastjaBar:'nastja',
  pope:'pope',pope2:'pope',schmied:'fjodor',marfa2:'marfa',muehle:'mueller'};
const rt=(k,per,cap)=>Math.min(cap,(FL['rt_'+k]||0)*per);
const NASTJA_DIADEM=75;   // ab hier rückt Nastja ihr Diadem für Marfa raus
const REL={
  'Wowa':()=>50+(FL.echo1?5:0)+(FL.echo3?10:0),
  'Baba Jaga':()=>-15+(FL.drin?10:0)+(FL.bjInfo?15:0)+(FL.recipe?15:0)+(FL.petzt?5:0)+(FL.tischRede?15:0)+rt('baba',2,10),
  'Opa Grischa':()=>-5+(FL.leiter?25:0)+(FL.deal?10:0)+(FL.haus?40:0)+rt('opa',2,10),
  'Oma Dusja':()=>-10+(FL.teer?40:0)+(FL.zwiebel?5:0)+rt('oma',2,10),
  'Fischer Kusmitsch':()=>-(FL.ablenk?10:0)-(FL.schnaps?55:0)+(FL.welsSeen?10:0)+rt('kusmitsch',1,5),
  'Madame Zinaida':()=>(FL.clubQ?5:0)+(FL.rekrut?25:0)-(FL.zwIn?15:0)+(FL.traene?5:0)+(FL.t2Q?5:0)+(FL.marfa?30:0)+(FL.t2Done?10:0)+rt('zinaida',1,5),
  'Nastja':()=>(FL.rekrut?15:0)+(FL.lounge?5:0)+(FL.traene?15:0)+(FL.marfaDia?5:0)+(FL.na_talk||0)*6+(FL.na_tanz||0)*10+(FL.na_drink||0)*5,
  'Grobnik':()=>(FL.stollen?20:0)+rt('grobnik',1,5),
  'Der Müller':()=>(FL.mullerQ?5:0)+(FL.mehl?30:0)+rt('mueller',1,5),
  'Vater Ignati':()=>(FL.popeBack?20:0)+(FL.weih?20:0)+rt('pope',2,10),
  'Schmied Fjodor':()=>(FL.schuld?-10:0)+(FL.glut?45:0)+rt('fjodor',1,5),
  'Die Krähe':()=>(FL.kraehe?-60:0)-(FL.petzt?10:0),
  'Marfa':()=>(FL.marfaKrone?5:0)+(FL.marfaDia?30:0)+(FL.marfa?20:0)+rt('marfa',4,20)};
const relOf=n=>Math.max(-100,Math.min(100,Math.round(REL[n]?REL[n]():0)));
const relWort=v=>v<=-50?'Feindselig':v<=-15?'Misstrauisch':v<15?'Neutral':v<45?'Freundlich':v<75?'Vertraut':'Eng verbunden';
// Gespräche zählen (Nymphe Marfa im Sumpf zählt als Marfa)
{const _use=use;use=function(id){const o=T[id];let k=RTALK[id];if(!k&&/^slot\d$/.test(id)&&o&&o.id==='marfa')k='marfa';if(k)FL['rt_'+k]=(FL['rt_'+k]||0)+1;return _use(id)}}

// Leiste im Steckbrief
function relBar(n){const v=relOf(n),w=Math.abs(v)/2,col=v<=-15?'#c0392b':v<15?'#a89a80':v<45?'#c8a04a':'#5fa84a';
  return`<div class="rel" title="${v}"><span class="rl">Beziehung</span><span class="rb"><i style="${v<0?`right:50%`:`left:50%`};width:${w}%;background:${col}"></i><u></u></span><b style="color:${col}">${relWort(v)}</b></div>`}
figurenHTML=function(){const known=FIGUREN.filter(f=>f.s[0][0]());if(!known.length)return'<p class="empty">Noch niemanden getroffen. Gut so, eigentlich.</p>';
  return`<div class="figs">${known.map(f=>{const lv=f.s.filter(([c])=>c()).length;
    return`<div class="fig"><h4>${f.n} <small>${f.w}</small><span class="lvl">${'●'.repeat(lv)}${'○'.repeat(f.s.length-lv)}</span></h4>${REL[f.n]?relBar(f.n):''}${f.s.map(([c,t])=>c()?`<p>${t}</p>`:'<p class="lock">… Da steckt noch mehr dahinter.</p>').join('')}</div>`}).join('')}</div>`};

// Meldung bei spürbarer Änderung (nur Figuren, die man schon kennt)
{let base=null;const snap=()=>{const m={};FIGUREN.forEach(f=>{if(REL[f.n]&&f.s[0][0]())m[f.n]=relOf(f.n)});return m};
  const _ls=loadState;loadState=function(d){const r=_ls.apply(this,arguments);base=null;return r};
  setInterval(()=>{if(typeof FL==='undefined'||$('#start')||$('#cut')){base=null;return}const s=snap();
    if(base)for(const n in s){const a=s[n],b=base[n];if(b===undefined||Math.abs(a-b)<4)continue;
      const kurz=n.replace(/^(Fischer|Madame|Opa|Oma|Vater|Schmied|Der|Die) /,'');
      toast(a>b?`${kurz} mag dich mehr`:`${kurz} mag dich weniger`,a>b?'done':'warnT','figuren');
      if(relWort(a)!==relWort(b))setTimeout(()=>toast(`Beziehung zu ${kurz}: ${relWort(a)}`,a>b?'done':'warnT','figuren'),600)}
    base=s},1200)}

(function(){const css=document.createElement('style');css.textContent=`.fig .rel{display:flex;align-items:center;gap:8px;margin:2px 0 6px;font:12px Georgia,serif}
.fig .rel .rl{opacity:.7;min-width:70px}.fig .rel .rb{position:relative;flex:1;height:8px;border-radius:4px;background:rgba(0,0,0,.35);box-shadow:inset 0 0 0 1px rgba(200,170,110,.35);overflow:hidden}
.fig .rel .rb i{position:absolute;top:0;bottom:0;border-radius:3px}.fig .rel .rb u{position:absolute;left:50%;top:-2px;bottom:-2px;width:1px;background:rgba(240,220,180,.7)}
.fig .rel b{min-width:96px;text-align:right;font-weight:600}.toast.warnT{border-color:#c0392b}`;document.head.appendChild(css)})();
