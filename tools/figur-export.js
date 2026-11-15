// Rendert eine Figur aus dem Spiel (über pixSprite) und speichert sie als Array + PNG.
//   node tools/figur-export.js "<js-ausdruck, der ein Promise auf die data-URL liefert>" <name> <aus.json> <aus.png>
//   z. B. node tools/figur-export.js "pixSprite(NASTJA_NEU,NASTJA_NEU_BOX,0,NASTJA_PIX)" nastja pixel/nastja.json pixel/nastja.png
const fs=require('fs'),path=require('path'),os=require('os'),{execFileSync}=require('child_process');
const [EXPR,NAME,OUT,PNG]=process.argv.slice(2),root=path.join(__dirname,'..');
let h=fs.readFileSync(path.join(root,'index.html'),'utf8');
h=h.replace('</body>',`<pre id="xjson"></pre><pre id="xpng"></pre><script>setTimeout(()=>Promise.resolve(${EXPR}).then(u=>{document.getElementById('xpng').textContent=u;return pixArray(u,${JSON.stringify(NAME)})}).then(t=>document.getElementById('xjson').textContent=t),500)</script></body>`);
const tmp=path.join(root,'_export_'+Date.now()+'.html');fs.writeFileSync(tmp,h);
const prof=fs.mkdtempSync(path.join(os.tmpdir(),'figexp-'));let out;
try{out=execFileSync('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',['--headless=new','--dump-dom','--virtual-time-budget=30000','--user-data-dir='+prof,'file:///'+tmp.split(path.sep).join('/')],{maxBuffer:64<<20,timeout:180000,stdio:['ignore','pipe','ignore']}).toString('utf8')}finally{fs.unlinkSync(tmp)}
const dec=s=>s.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,'&');
const j=out.match(/<pre id="xjson">([\s\S]*?)<\/pre>/),p=out.match(/<pre id="xpng">([\s\S]*?)<\/pre>/);
if(!j||!j[1])throw new Error('kein Ergebnis');const json=dec(j[1]),o=JSON.parse(json);fs.writeFileSync(OUT,json);
if(PNG)fs.writeFileSync(PNG,Buffer.from(dec(p[1]).split(',')[1],'base64'));
console.log(`${o.width}x${o.height}, ${Object.keys(o.palette).length-1} Farben`);
