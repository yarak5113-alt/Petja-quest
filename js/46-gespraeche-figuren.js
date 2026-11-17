// ================= Gespräche bei den Figuren (statt eigenem Reiter) & Schnell-Inventar =================
// Jedes Gespräch (ein say()-Aufruf) gehört der Person, mit der Petja redet: dem ersten Sprecher, der nicht Petja ist.
// Es steht im Notizbuch → Figuren im Steckbrief dieser Person („Gespräche“ zum Aufklappen, neuestes oben).
// Stimmen ohne Steckbrief (Pilzmeister Knolle, die Sonne …) kommen unter „Weitere Stimmen“, Petjas Selbstgespräche ganz unten.
// Der Verlauf wird mit dem Spielstand gespeichert (begrenzt, damit Spielstände klein bleiben). Taste L öffnet jetzt die Figuren.
const GSPR={n:0,cur:null,by:{}},GSPR_MAX=12,GSPR_ZEILEN=40;
// Sprecher → Name im Steckbrief (wo der Dialogname anders lautet)
const GSPR_ALIAS={K:'Die Krähe',MU:'Der Müller',J:'Baba Jaga'};
const gsprKey=w=>w==='P'?'P':GSPR_ALIAS[w]||(N[w]?N[w][0]:w);
{const _say=say;say=function(lines,cb){const o=Array.isArray(lines)&&lines.find(l=>l&&l[0]!=='P');GSPR.cur={k:o?gsprKey(o[0]):'P',id:++GSPR.n};return _say.apply(this,arguments)}}
LOG.push=function(e){const r=Array.prototype.push.apply(this,arguments);const c=GSPR.cur;
  if(c&&e&&!(typeof DL!='undefined'&&DL.on)){const L=GSPR.by[c.k]||(GSPR.by[c.k]=[]);let g=L[L.length-1];
    if(!g||g.id!==c.id){g={id:c.id,z:[]};L.push(g);if(L.length>GSPR_MAX)L.shift()}if(g.z.length<GSPR_ZEILEN)g.z.push([e[0],e[1]])}
  return r};
// mit dem Spielstand speichern und laden (alte Spielstände ohne Verlauf: leer)
{const _ss=snapState;snapState=function(){const s=_ss.apply(this,arguments);s.gspr=GSPR.by;return s}
  const _ls=loadState;loadState=function(d){GSPR.by=d&&d.gspr&&typeof d.gspr=='object'?JSON.parse(JSON.stringify(d.gspr)):{};GSPR.cur=null;
    GSPR.n=Math.max(0,...Object.values(GSPR.by).flat().map(g=>g.id||0));return _ls.apply(this,arguments)}}

// ---------- Anzeige im Reiter „Figuren“ ----------
function gsprHTML(k){const L=GSPR.by[k];if(!L||!L.length)return'';
  const esc=s=>s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])).replace(/\*([^*]+)\*/g,'<i>$1</i>');
  return`<details class="gspr notr"><summary>${ic('log','sm')} ${tr('Gespräche')} <em>${L.length}</em></summary><div class="glog">${L.slice().reverse().map(g=>`<div class="gsp">${g.z.map(([w,t])=>
    `<p><b style="color:${(N[w]||['?','#ccc'])[1]}">${esc(tr((N[w]||[w])[0]))}:</b> ${esc(tr(t))}</p>`).join('')}</div>`).join('')}</div></details>`}
{const _ob=openBook;openBook=function(tab){if(tab==='log')tab='figuren';const r=_ob.call(this,tab);if(tab!=='figuren'||!ovl)return r;const bb=ovl.querySelector('.bbody');if(!bb)return r;
  const known=FIGUREN.filter(f=>f.s[0][0]()),namen=new Set(known.map(f=>f.n)),karten=bb.querySelectorAll('.fig');
  known.forEach((f,i)=>{const h=gsprHTML(f.n);if(h&&karten[i])karten[i].insertAdjacentHTML('beforeend',h)});
  // Stimmen ohne (sichtbaren) Steckbrief und Petjas Selbstgespräche
  const rest=Object.keys(GSPR.by).filter(k=>k!=='P'&&!namen.has(k)&&GSPR.by[k].length);let extra='';
  if(rest.length)extra+=`<h3 class="gsprH">${tr('Weitere Stimmen')}</h3>`+rest.map(k=>`<div class="fig"><h4>${k}</h4>${gsprHTML(k)}</div>`).join('');
  if(GSPR.by.P&&GSPR.by.P.length)extra+=`<h3 class="gsprH">${tr('Selbstgespräche')}</h3><div class="fig"><h4>Petja</h4>${gsprHTML('P')}</div>`;
  if(extra){let F=bb.querySelector('.figs');if(!F){bb.insertAdjacentHTML('beforeend','<div class="figs"></div>');F=bb.querySelector('.figs')}F.insertAdjacentHTML('beforeend',extra)}
  return r}}
// toggleBook('log') (Taste L) → Figuren; der eigene Reiter „Gespräche“ entfällt
{const i=BOOKT.findIndex(b=>b[0]==='log');if(i>=0)BOOKT.splice(i,1)}
{const _tb=toggleBook;toggleBook=function(k){return _tb.call(this,k==='log'?'figuren':k)}}
{const k=KEYS.find(k=>k[0]==='L');if(k){k[0]='C / L';k[1]='Figuren und Gespräche'}}

// ---------- Schnell-Inventar: bei vielen Sachen mehrere Reihen und kleinere Felder statt einer endlos langen Leiste ----------
{const _ri=renderInv;renderInv=function(){const r=_ri.apply(this,arguments);const S=$('#slots');if(S){S.classList.toggle('viel',inv.length>6);S.classList.toggle('sehrviel',inv.length>12)}return r}}

(function(){const css=document.createElement('style');css.textContent=`
.gspr{margin:6px 0 2px;border-top:1px dashed rgba(200,170,110,.35);padding-top:4px}
.gspr summary{cursor:pointer;font:bold 13px Georgia,serif;color:#e8c878;list-style:none;display:flex;align-items:center;gap:6px}.gspr summary::-webkit-details-marker{display:none}
.gspr summary::after{content:'▸';margin-left:2px;opacity:.7}.gspr[open] summary::after{content:'▾'}
.gspr summary em{font-style:normal;font-size:11px;padding:0 6px;border-radius:8px;background:rgba(200,160,80,.25)}
.glog{max-height:260px;overflow:auto;margin-top:6px;padding-right:4px}
.gsp{margin:0 0 8px;padding:6px 8px;border-left:2px solid rgba(200,160,80,.45);background:rgba(0,0,0,.18);border-radius:3px}
.gsp p{margin:0 0 4px;line-height:1.4;font-size:13px}.gsp p:last-child{margin:0}.gsp b{font-family:Arial,sans-serif}.gsp i{color:var(--muted)}
.gsprH{grid-column:1/-1;margin:10px 0 0;font:italic bold 15px Georgia,serif;color:#e8c878}
#slots{flex-wrap:wrap;justify-content:flex-end;max-width:calc(6 * 46px + 5 * 5px)}
#slots.viel{gap:4px;max-width:calc(8 * 36px + 7 * 4px)}#slots.viel .slot{width:36px;height:36px}#slots.viel .slot img{width:30px;height:30px}
#slots.sehrviel{max-width:calc(10 * 30px + 9 * 3px);gap:3px}#slots.sehrviel .slot{width:30px;height:30px}#slots.sehrviel .slot img{width:25px;height:25px}`;document.head.appendChild(css)})();
