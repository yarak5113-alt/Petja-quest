// ================= Höchstens 20 Farben je Figur =================
// pixSprite reduziert jede Figur schon selbst (05-schauplaetze-figuren.js, PIX_COLORS). Die Nymphen werden danach noch
// nachbearbeitet (Sumpfwasser über den Beinen, heller Wasserring) – das bringt neue Mischfarben, also hier ein zweites Mal reduzieren.
{const nf=nymFinish;nymFinish=(u,p)=>nf(u,p).then(q=>pixQuantURL(q,PIX_COLORS))}
// Falls eine Nymphe schon fertig war, bevor diese Datei geladen wurde: beim Anzeigen nachziehen (eigene Bilder bleiben unberührt)
{const QD=new Set(),as=applySwampNymphs;applySwampNymphs=function(){as.apply(this,arguments);
  NYMPHS.forEach((n,i)=>{const u=NIMG[i];if(n.own||!u||QD.has(u)||!/^data:/.test(u))return;QD.add(u);
    pixQuantURL(u).then(q=>{QD.add(q);if(NIMG[i]!==u)return;NIMG[i]=q;if(cur==='sumpf')as()})})}}
// Prüfen (Konsole): pixFarben() -> Farbanzahl jeder gerade sichtbaren Figur
function pixFarben(){const out={};document.querySelectorAll(`#r-${cur} image`).forEach(im=>{const h=im.getAttribute('href')||'';if(!/^data:image\/png/.test(h))return;
  const i=new Image();i.src=h;const c=document.createElement('canvas');c.width=i.width;c.height=i.height;if(!c.width)return;const g=c.getContext('2d');g.drawImage(i,0,0);
  const d=g.getImageData(0,0,c.width,c.height).data,S=new Set();for(let q=0;q<d.length;q+=4)if(d[q+3])S.add(d[q]<<16|d[q+1]<<8|d[q+2]);
  out[(im.closest('[data-id]')||im).dataset.id||im.id||'?']=S.size});return out}
