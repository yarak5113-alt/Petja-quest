// Baut js/38-nymphen-pixel.js aus pixel/nymphe_<id>.json: im Sumpf erscheinen genau diese Arrays (statt der zur Laufzeit gerenderten Vektorfiguren).
//   node tools/nymphen-insspiel.js   (nach jeder Änderung an pixel/nymphe_*.json erneut ausführen)
// Lage: Bildkasten im Spiel 80×110 Einheiten für 213 Zeilen (ungekürzt 155 px breit). Die Arrays sind seitlich gekürzt,
// deshalb wird die Körpermitte (Mittel der deckenden Pixel kurz über der Wasserlinie) auf x = 0 gelegt.
const fs=require('fs'),path=require('path'),root=path.join(__dirname,'..');
const IDS=['nastja','marfa','ustinja','fekla','glafira','alte'],U=110/213;   // Einheiten pro Pixel
const out={};
for(const id of IDS){const f=path.join(root,'pixel',`nymphe_${id}.json`);if(!fs.existsSync(f))continue;const o=JSON.parse(fs.readFileSync(f,'utf8'));
  // Körpermitte aus den Zeilen 150–185 (Taille/Hüfte über dem Wasser, ohne Arme über dem Kopf)
  let s=0,n=0;o.rows.slice(150,186).forEach(r=>{let x=0;for(const m of r.matchAll(/([^0-9])([0-9]*)/g)){const k=+m[2]||1;if(o.palette[m[1]])for(let i=0;i<k;i++){s+=x+i;n++}x+=k}});
  const cx=n?s/n:o.width/2;out[id]={w:o.width,h:o.height,palette:o.palette,rows:o.rows,g:[+(-cx*U).toFixed(2),-100,+(o.width*U).toFixed(2),110]}}
fs.writeFileSync(path.join(root,'js/38-nymphen-pixel.js'),`// ================= Sumpf-Nymphen: freigegebene Pixel-Arrays aus pixel/nymphe_*.json =================
// AUTOMATISCH erzeugt mit: node tools/nymphen-insspiel.js – nicht von Hand ändern.
// Ersetzt die zur Laufzeit gerenderten Vektor-Nymphen (08b-nymphen-sprite.js): Sumpf und Gesprächsbild zeigen genau diese Arrays.
const NYM_PIX=${JSON.stringify(out)};
{const url=({w,h,palette,rows})=>{const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d'),id=g.createImageData(w,h),d=id.data;
  rows.forEach((r,y)=>{let x=0;for(const m of r.matchAll(/([^0-9])([0-9]*)/g)){const col=palette[m[1]],n=+m[2]||1;if(col){const v=[1,3,5].map(i=>parseInt(col.slice(i,i+2),16));for(let i=0;i<n;i++){const q=(y*w+x+i)*4;d[q]=v[0];d[q+1]=v[1];d[q+2]=v[2];d[q+3]=255}}x+=n}});
  g.putImageData(id,0,0);return c.toDataURL()};
  NYMPHS.forEach((n,i)=>{const a=NYM_PIX[n.id];if(!a||n.own)return;n.own=1;n.pixG=a.g;NIMG[i]=url(a)});
  // Bildkasten pro Nymphe an das gekürzte Array anpassen
  const as=applySwampNymphs;applySwampNymphs=function(){as.apply(this,arguments);nextNymphs.forEach((idx,i)=>{const G=NYMPHS[idx].pixG||[-40,-100,80,110],im=document.getElementById('slot'+i+'img');
    if(im)['x','y','width','height'].forEach((k,j)=>im.setAttribute(k,G[j]))})};
  if(typeof cur!='undefined'&&cur==='sumpf')applySwampNymphs()}
`);
console.log('js/38-nymphen-pixel.js geschrieben:',Object.keys(out).map(k=>k+' '+out[k].w+'x'+out[k].h+' x0='+out[k].g[0]).join(', '));
