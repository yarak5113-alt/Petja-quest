// ================= Dialog-Porträts mit Mimik + CRT-Filter =================
// PORTRÄTS: Spricht Petja (P), Opa Grischa (G) oder Nastja (NA), steht links in der Leseleiste ein Pixel-Porträt (50-portraets-pixel.js).
//   Die Mimik kommt aus dem Text – oder fest als 3. Element einer Zeile: ['G','Твою мать!','angry'].
//   Petja:  neutral · smirk (sarkastisch, genervt, „na klar“) · pain (würgen, husten, Fusel, Schmerz)
//   Opa:    neutral · angry (Großbuchstaben, Flüche, „Твою мать“) · drunk (*hicks*, Prost, Schnaps, Lachen)
//   Nastja: neutral · flirt (Süßer, Zwiebel, *zwinkert*, *haucht*) · laugh (*lacht*, haha, *prustet*)
// CRT: Einstellungen → „CRT-Filter: An/Aus“. Scanlines, leicht versetzte RGB-Kanäle (SVG-Filter), gewölbter Röhrenrand
//   mit 4:3-Bildröhre in der Mitte und ganz leichtem Flimmern. Wird in den Optionen gespeichert (OPT.crt).

const PORTRAIT_FIG={P:'petja',G:'opa',NA:'nastja'};
function portraitMimik(w,t,em){const fig=PORTRAIT_FIG[w];if(!fig)return null;const M=PORTRAETS[fig];
  if(em&&M[em])return em;t=String(t||'');
  if(fig==='petja'){
    if(/\*(würg|hust|keuch|röchel|hick|hicks|schluck|SCHLUCK|kotz)|brennt|\baua?\b|mir ist (schlecht|übel)|fusel|selbstgebrannt|abbeizer|mein (kopf|magen|rücken|hals)/i.test(t)||(typeof DUELL_AKTIV!='undefined'&&DUELL_AKTIV&&DUELL_AKTIV.petja<45))return 'pain';
    const e=typeof emoOf=='function'?emoOf(t):'n';if(e==='genervt'||/\bna (klar|super|toll)\b|\bnatürlich\b|\bsicher doch\b|\bwie praktisch\b|\bein viertel\b/i.test(t))return 'smirk';
    if(e==='schreck')return 'pain';return 'neutral'}
  if(fig==='opa'){
    if(/[A-ZÄÖÜ]{4,}/.test(t.replace(/\*[^*]*\*/g,''))||/твою мать|verdammt|teufel|zum henker|finger weg|\bwehe\b|ey,? wo/i.test(t))return 'angry';
    if(/\*hick|\*rülps|\*grinst|\*lacht|selbstgebrannt|schnaps|самосад|prost|за здоровье|\bha!|haha/i.test(t)||(typeof DUELL_AKTIV!='undefined'&&DUELL_AKTIV&&DUELL_AKTIV.opa<60))return 'drunk';
    return 'neutral'}
  if(/haha|\*(lacht|prustet|kichert|kicher|gackert)|auslach/i.test(t))return 'laugh';
  if(/süßer|zwiebel|schatz|\*(zwinkert|haucht|leckt|beugt sich|fährt dir)/i.test(t))return 'flirt';
  return 'neutral'}

// Bild in der Leseleiste
const PORTRAIT_IMG=(()=>{const im=document.createElement('img');im.id='portrait';im.alt='';$('#box').prepend(im);return im})();
{const _next=next;next=function(){const zeile=queue[0];_next.apply(this,arguments);
  const an=OPT.portraits!==false&&busy&&zeile;const m=an?portraitMimik(zeile[0],zeile[1],zeile[2]):null;
  if(m){PORTRAIT_IMG.src=PORTRAETS[PORTRAIT_FIG[zeile[0]]][m];PORTRAIT_IMG.dataset.fig=PORTRAIT_FIG[zeile[0]];box.classList.add('mitbild')}
  else box.classList.remove('mitbild')}}

// ---------- CRT ----------
document.body.insertAdjacentHTML('beforeend',`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="crtRGB" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
  <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/><feOffset in="r" dx="1.3" dy="0" result="r2"/>
  <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g"/>
  <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b"/><feOffset in="b" dx="-1.3" dy="0" result="b2"/>
  <feBlend in="r2" in2="g" mode="screen" result="rg"/><feBlend in="rg" in2="b2" mode="screen"/></filter></svg>`);
const CRT_EL=(()=>{const d=document.createElement('div');d.id='crt';d.innerHTML='<i class="scan"></i><i class="roehre"></i><i class="glanz"></i>';$('#game').appendChild(d);return d})();
function applyCrt(){document.documentElement.classList.toggle('crt-an',!!OPT.crt)}applyCrt();

// ---------- Einstellungen: zwei neue Schalter ----------
{const om=openMenu;openMenu=function(view){const r=om.apply(this,arguments);if((view||'m')!=='o')return r;const opts=document.querySelector('.opts');if(!opts)return r;
  opts.insertAdjacentHTML('beforeend',`<button class="mb" data-x="crt"><span>📺 CRT-Filter</span> <b>${OPT.crt?'An':'Aus'}</b></button>
    <button class="mb" data-x="portraits"><span>🙂 Porträts im Gespräch</span> <b>${OPT.portraits!==false?'An':'Aus'}</b></button>`);
  opts.querySelector('[data-x=crt]').onclick=()=>{OPT.crt=!OPT.crt;saveOpt();applyCrt();openMenu('o')};
  opts.querySelector('[data-x=portraits]').onclick=()=>{OPT.portraits=OPT.portraits===false;saveOpt();openMenu('o')};return r}}

(function(){const css=document.createElement('style');css.textContent=`
#box #portrait{display:none;position:absolute;left:10px;top:50%;transform:translateY(-50%);height:calc(78px*var(--boxs,1));width:auto;image-rendering:pixelated;
  border:2px solid var(--gold,#c8a04a);border-radius:4px;background:radial-gradient(circle at 50% 40%,#5a3a26,#2a160c);box-shadow:0 2px 0 rgba(0,0,0,.5)}
#box.mitbild{padding-left:calc(122px*var(--boxs,1))!important;min-height:calc(66px*var(--boxs,1))}#box.mitbild #portrait{display:block}
#box #portrait[data-fig=opa]{height:calc(84px*var(--boxs,1))}
#crt{display:none;position:absolute;inset:0;z-index:60;pointer-events:none}
#crt i{position:absolute;inset:0}
#crt .scan{background:repeating-linear-gradient(180deg,rgba(0,0,0,.22) 0 1px,rgba(0,0,0,0) 1px 3px);mix-blend-mode:multiply;animation:crtFlimmer .12s steps(2) infinite}
#crt .roehre{border-radius:5%/8%;box-shadow:inset 0 0 0 3px #050505,inset 0 0 70px 18px rgba(0,0,0,.75);
  background:linear-gradient(90deg,rgba(0,0,0,.42) 0,rgba(0,0,0,.18) 8.3%,rgba(0,0,0,0) 8.4%,rgba(0,0,0,0) 91.6%,rgba(0,0,0,.18) 91.7%,rgba(0,0,0,.42) 100%)}
#crt .glanz{background:radial-gradient(ellipse 70% 55% at 35% 25%,rgba(255,255,255,.07),rgba(255,255,255,0) 60%)}
.crt-an #crt{display:block}
.crt-an #game{filter:url(#crtRGB) saturate(1.12) contrast(1.06)}
@keyframes crtFlimmer{0%{opacity:.85}100%{opacity:1}}`;document.head.appendChild(css)})();
