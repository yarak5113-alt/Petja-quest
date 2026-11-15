// Baut js/33-nastja-pixel.js aus pixel/nastja.json: das freigegebene Array wird im Spiel 1:1 angezeigt (Bühne, Tanz, Lounge, Ich-Sicht).
//   node tools/nastja-insspiel.js   (nach jeder Änderung an pixel/nastja.json erneut ausführen)
const fs=require('fs'),path=require('path'),root=path.join(__dirname,'..');
const o=JSON.parse(fs.readFileSync(path.join(root,'pixel/nastja.json'),'utf8'));
// Lage im Spiel: gleicher Maßstab wie die alte Nastja (266 Einheiten = 500 px), Körpermitte (x=0) bei Pixelspalte 131.3, Füße auf y≈+2
const s=266/500,CX=131.3,G=[+(-CX*s).toFixed(2),-264,+(o.width*s).toFixed(2),266];
fs.writeFileSync(path.join(root,'js/33-nastja-pixel.js'),`// ================= Nastja im Spiel: freigegebenes Pixel-Array =================
// AUTOMATISCH erzeugt aus pixel/nastja.json mit: node tools/nastja-insspiel.js  – nicht von Hand ändern.
// Ersetzt das alte Bühnen-Sprite (DANCER) überall: Bühne, Privattanz, Lounge, Ich-Sicht beim Tanz.
const NASTJA_ARR=${JSON.stringify({w:o.width,h:o.height,palette:o.palette,rows:o.rows})};
const NASTJA_G=${JSON.stringify(G)};
const NASTJA_URL=(()=>{const{w,h,palette,rows}=NASTJA_ARR,c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d'),id=g.createImageData(w,h),d=id.data;
  rows.forEach((r,y)=>{let x=0;for(const m of r.matchAll(/([^0-9])([0-9]*)/g)){const col=palette[m[1]],n=+m[2]||1;if(col){const v=[1,3,5].map(i=>parseInt(col.slice(i,i+2),16));for(let i=0;i<n;i++){const q=(y*w+x+i)*4;d[q]=v[0];d[q+1]=v[1];d[q+2]=v[2];d[q+3]=255}}x+=n}});
  g.putImageData(id,0,0);return c.toDataURL()})();
['dancerimg','dancer2img','poleimg'].forEach(id=>{const e=document.getElementById(id);if(!e)return;e.setAttribute('href',NASTJA_URL);['x','y','width','height'].forEach((k,i)=>e.setAttribute(k,NASTJA_G[i]))});
DANCERIMG.src=NASTJA_URL;DANCER_G.splice(0,4,...NASTJA_G);
`);
console.log('js/33-nastja-pixel.js geschrieben',G);
