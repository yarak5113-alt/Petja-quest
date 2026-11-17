// ================= Madames Liste zum Ansehen =================
// Klick auf „Madames Liste“ (Schnell-Inventar oder Bündel → Untersuchen) zeigt den Zettel selbst: rosa Briefpapier aus dem Banja,
// Madames Handschrift mit vier Kästchen, Lippenstift-Kuss und Parfümfleck. Ist Nastja angeworben, sind alle Kästchen angekreuzt
// und ein Stempel „Erledigt“ ist drauf. Darunter Petjas Kommentar. Schließen: Klick irgendwo oder Esc.
// Der Zettel liegt über allem (eigenes Element, nicht ovl), damit ein offenes Bündel dahinter erhalten bleibt.
function zeigeListe(){if($('#zettel'))return;const fertig=!!FL.rekrut,G=$('#game')||document.body;
  const punkte=['schön','tanzt gern','frech','will raus'];
  const kuss=`<svg class="zkuss" viewBox="0 0 60 40" aria-hidden="true"><path d="M4,20C10,8 22,4 30,12C38,4 50,8 56,20C48,22 40,22 30,20C20,22 12,22 4,20Z" fill="#c4204a" opacity=".85"/>
<path d="M6,21C14,24 22,25 30,22C38,25 46,24 54,21C48,34 38,38 30,37C22,38 12,34 6,21Z" fill="#b01a40" opacity=".85"/><path d="M10,20Q30,23 50,20" fill="none" stroke="#7a0e28" stroke-width="1.2" opacity=".6"/>
<path d="M14,14Q22,10 28,15M34,15Q40,10 46,14M14,28Q22,33 28,31M34,31Q40,33 46,28" fill="none" stroke="#e86a8a" stroke-width=".8" opacity=".6"/></svg>`;
  const z=document.createElement('div');z.id='zettel';z.innerHTML=`<div class="zblatt">
  <div class="zkopf">✦ ${tr("Banja")} ✦</div>
  <h3>${tr('Madames Liste')}</h3>
  <p class="zsub">${tr('Gesucht: eine neue Tänzerin')}</p>
  <ul>${punkte.map((p,i)=>`<li><span class="zbox">${fertig?'<i>✓</i>':''}</span><span class="zw" style="--r:${[-1.5,1,-.5,1.8][i]}deg">${tr(p)}</span></li>`).join('')}</ul>
  <p class="zno">${tr('Keine Blubberer!')}</p>
  <div class="zsig">${tr('Madame Zinaida')}</div>${kuss}<div class="zfleck"></div>
  ${fertig?`<div class="zstempel">${tr('Erledigt')}</div>`:''}</div>
  <p class="zkomm">${tr(UNTERSUCHEN.liste||ITEMS.liste[2])}</p><p class="zzu">${tr('Klick zum Schließen')}</p>`;
  z.classList.add('notr');
  const zu=e=>{if(e&&e.type==='keydown'&&e.key!=='Escape')return;if(e){e.stopPropagation();e.preventDefault()}z.remove();removeEventListener('keydown',zu,true)};
  z.addEventListener('click',zu);z.addEventListener('contextmenu',zu);addEventListener('keydown',zu,true);G.appendChild(z)}
// Schnell-Inventar (Klick/Rechtsklick → untersuche) und Bündel im Untersuchen-Modus
{const _u=untersuche;untersuche=function(id){if(id==='liste'&&!busy&&!changing)return zeigeListe();return _u.apply(this,arguments)}}
{const _bv=buendelVerdrahten;buendelVerdrahten=function(o){const r=_bv.apply(this,arguments);const b=o&&o.querySelector('.bsache[data-i="liste"]');
  if(b){const alt=b.onclick;b.onclick=e=>{if(BMODUS==='look')return zeigeListe();return alt&&alt.call(b,e)}}return r}}
(function(){const css=document.createElement('style');css.textContent=`
#zettel{position:absolute;inset:0;z-index:60;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(10,4,8,.62);cursor:pointer;animation:zIn .22s ease-out}
@keyframes zIn{from{opacity:0}to{opacity:1}}
.zblatt{position:relative;width:min(340px,70%);padding:22px 30px 26px;transform:rotate(-2.5deg);animation:zDreh .3s ease-out;
  background:radial-gradient(circle at 78% 82%,rgba(160,90,60,.18),rgba(0,0,0,0) 24%),linear-gradient(#fbe8ea,#f6dcdc 60%,#efcfcd);
  background-image:radial-gradient(circle at 78% 82%,rgba(160,90,60,.16),rgba(0,0,0,0) 22%),repeating-linear-gradient(rgba(0,0,0,0) 0 27px,rgba(170,90,110,.22) 27px 28px),linear-gradient(#fbe8ea,#f2d6d6);
  box-shadow:0 14px 32px rgba(0,0,0,.6),inset 0 0 30px rgba(150,60,70,.18);border-radius:2px;color:#4a1028;font-family:'Segoe Script','Bradley Hand','Brush Script MT','Comic Sans MS',cursive}
@keyframes zDreh{from{transform:rotate(-8deg) scale(.85)}to{transform:rotate(-2.5deg) scale(1)}}
.zblatt::before{content:'';position:absolute;left:50%;top:-10px;width:70px;height:20px;margin-left:-35px;background:rgba(240,232,200,.75);transform:rotate(3deg);box-shadow:0 1px 2px rgba(0,0,0,.2)}
.zkopf{text-align:center;font:bold 11px Georgia,serif;letter-spacing:4px;text-transform:uppercase;color:#a02050;opacity:.75}
.zblatt h3{margin:4px 0 2px;text-align:center;font-size:24px;font-weight:bold;color:#7a0e38}
.zsub{margin:0 0 10px;text-align:center;font-size:15px}
.zblatt ul{list-style:none;margin:0;padding:0 0 0 10px}.zblatt li{display:flex;align-items:center;gap:12px;height:28px;font-size:19px}
.zbox{position:relative;flex:none;width:16px;height:16px;border:2px solid #6a1430;border-radius:2px;transform:rotate(-4deg)}
.zbox i{position:absolute;left:0;top:-12px;font:bold 26px/1 'Segoe Script',cursive;color:#1a3a8a;font-style:normal}
.zw{display:inline-block;transform:rotate(var(--r))}
.zno{margin:10px 0 0;font-size:18px;font-weight:bold;color:#9a0e3a;text-decoration:underline double;text-underline-offset:4px}
.zsig{margin:14px 34px 0 0;text-align:right;font-size:17px;font-style:italic;color:#6a0e30}
.zkuss{position:absolute;right:-6px;bottom:-10px;width:54px;transform:rotate(-14deg);opacity:.9}
.zfleck{position:absolute;left:14px;bottom:16px;width:46px;height:46px;border-radius:50%;border:3px solid rgba(140,80,40,.18);box-shadow:inset 0 0 6px rgba(140,80,40,.15)}
.zstempel{position:absolute;left:50%;top:48%;padding:2px 14px;transform:translate(-50%,-50%) rotate(-18deg);border:3px solid rgba(40,120,60,.75);border-radius:4px;color:rgba(40,120,60,.8);font:bold 30px/1.1 Georgia,serif;letter-spacing:3px;text-transform:uppercase}
.zkomm{max-width:min(460px,80%);margin:22px 0 0;padding:8px 14px;background:rgba(20,8,4,.7);border:1px solid rgba(232,177,42,.5);border-radius:6px;color:#f6e6c0;font:italic 15px Georgia,serif;text-align:center}
.zzu{margin:8px 0 0;color:#e8d4a8;font:italic 12px Georgia,serif;opacity:.7}`;document.head.appendChild(css)})();
