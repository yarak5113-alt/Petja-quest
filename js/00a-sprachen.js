// ================= Sprachen: Deutsch / English / Русский =================
// Der Quelltext bleibt deutsch. Jeder deutsche Text hat eine Kurz-ID (trKey = FNV-Hash), die Übersetzungen stehen in
// lang/en.js und lang/ru.js (gebaut aus lang/src/<sprache>/*.txt mit: node tools/i18n-bau.js; fehlende Texte: node tools/i18n-extrakt.js).
// Übersetzt wird an drei Stellen, ohne dass die Spiel-Dateien davon wissen müssen:
//   1. Dialogzeilen + Sprechernamen (next() in 06-dialog-stimme.js ruft tr())
//   2. jeder Text im DOM (Menüs, Notizbuch, Taschen, Hinweise, Hover-Namen …) über einen MutationObserver
//   3. Schrift, die auf Canvas gemalt wird (Schilder, Minispiele) über fillText/strokeText/measureText
// Fehlt eine Übersetzung, bleibt der deutsche Text stehen. Zahlen im Text: Schlüssel mit „#“ (z. B. „Platz #“) gelten für jede Zahl.
window.LANGS=window.LANGS||{};
const SPRACHEN=[['de','Deutsch'],['en','English'],['ru','Русский']];
let LANG='de';try{LANG=(JSON.parse(localStorage.getItem('petjaOpts')||'{}').lang)||'de'}catch(e){}
if(!SPRACHEN.some(([k])=>k===LANG))LANG='de';
document.documentElement.lang=LANG;
function trKey(s){let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193)}return(h>>>0).toString(36)}
const TR_NUM=/\d+(?:[.,]\d+)?/g;
function tr(s){if(LANG==='de'||typeof s!=='string')return s;const d=LANGS[LANG];if(!d)return s;
  const t=s.replace(/\s+/g,' ').trim();if(!t||!/[A-Za-zÄÖÜäöüß]/.test(t))return s;let r=d[trKey(t)];
  if(r==null&&/\d/.test(t)){const nums=t.match(TR_NUM),p=d[trKey(t.replace(TR_NUM,'#'))];if(p!=null){let i=0;r=p.replace(/#/g,()=>i<nums.length?nums[i++]:'#')}}
  // Muster mit Lücken (lang/src/*/_muster.txt): „Eingesteckt: {}“, „Gold: # / #“ … – Lücken werden selbst übersetzt
  if(r==null)for(const[re,out]of(LANGS[LANG+'_pat']||[])){const m=t.match(re);if(m){let i=1;r=out.replace(/\{\}|#/g,()=>tr(m[i++]||''));break}}
  if(r==null)return s;return s.match(/^\s*/)[0]+r+s.match(/\s*$/)[0]}
// ---- Canvas: gemalte Schrift ----
{const P=CanvasRenderingContext2D.prototype;for(const k of['fillText','strokeText','measureText']){const o=P[k];
  P[k]=function(t,...a){return o.call(this,LANG==='de'||typeof t!=='string'?t:tr(t),...a)}}}
// ---- DOM: Textknoten und title/placeholder ----
const TR_O=new WeakMap(),TR_A=new WeakMap(),TR_NO='#txt,#who,script,style,textarea,.notr';
function trText(n){const p=n.parentElement;if(!p||p.closest(TR_NO))return;const v=n.nodeValue,o=TR_O.get(n);
  const g=o&&v===o.t?o.g:v,t=tr(g);if(g===t&&!o)return;TR_O.set(n,{g,t});if(t!==v)n.nodeValue=t}
function trAttr(e){for(const a of['title','placeholder']){if(!e.hasAttribute(a))continue;const v=e.getAttribute(a),m=TR_A.get(e)||{},o=m[a],g=o&&v===o.t?o.g:v,t=tr(g);
  if(g===t&&!o)continue;m[a]={g,t};TR_A.set(e,m);if(t!==v)e.setAttribute(a,t)}}
function trTree(r){if(!r)return;if(r.nodeType===3)return trText(r);if(r.nodeType!==1)return;if(r.closest&&r.closest(TR_NO))return;trAttr(r);
  const w=document.createTreeWalker(r,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT);let n;while((n=w.nextNode()))n.nodeType===3?trText(n):trAttr(n)}
const TR_TITLE=document.title;
function trAll(){trTree(document.body);document.title=tr(TR_TITLE)}
new MutationObserver(ms=>{if(LANG==='de')return;for(const m of ms){if(m.type==='characterData')trText(m.target);else if(m.type==='attributes')trAttr(m.target);else m.addedNodes.forEach(trTree)}})
  .observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['title','placeholder']});
// ---- Umschalten ----
function setLang(l){if(l===LANG)return;const was=LANG;LANG=l;document.documentElement.lang=l;
  if(typeof OPT!='undefined'){OPT.lang=l;saveOpt()}else try{const o=JSON.parse(localStorage.getItem('petjaOpts')||'{}');o.lang=l;localStorage.setItem('petjaOpts',JSON.stringify(o))}catch(e){}
  if(typeof pickVoice=='function')pickVoice();
  trAll();
  // gemalte Hintergründe (Schilder) neu malen; auf dem Titelbild einfach neu laden – dort geht nichts verloren
  if(document.getElementById('start')){location.reload();return}
  if(typeof cache!='undefined'){for(const k in cache)delete cache[k]}
  if(typeof cur!='undefined'&&cur&&typeof enter=='function'&&!busy&&!changing)enter(cur,[P.x,P.y]);
  if(typeof toast=='function')toast(LANG==='ru'?'Язык: русский':LANG==='en'?'Language: English':'Sprache: Deutsch',0,'tipp');return was}
function langName(l){return(SPRACHEN.find(([k])=>k===(l||LANG))||SPRACHEN[0])[1]}
// Titelbild: drei kleine Knöpfe unter den großen
addEventListener('DOMContentLoaded',()=>{const tb=document.querySelector('#start .tbox');if(!tb)return;const d=document.createElement('div');d.className='tlang notr';
  d.innerHTML=SPRACHEN.map(([k,n])=>`<button data-lang="${k}" class="${k===LANG?'on':''}" title="${n}">${k.toUpperCase()}</button>`).join('');
  const sub=tb.querySelector('.tsub');tb.insertBefore(d,sub||null);d.querySelectorAll('button').forEach(b=>b.onclick=e=>{e.stopPropagation();setLang(b.dataset.lang)})});
if(LANG!=='de')addEventListener('DOMContentLoaded',trAll);
