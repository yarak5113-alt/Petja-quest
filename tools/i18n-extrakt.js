// Sammelt alle deutschen Texte, die das Spiel anzeigt (Dialogzeilen, Sprüche, Namen, Gegenstände, Orte, Menüs …),
// gibt jedem eine Kurz-ID (Hash, gleich wie trKey() im Spiel) und schreibt lang/_de.txt:  ID<TAB>Text  (gruppiert nach Datei).
// Übersetzungen liegen in lang/src/<en|ru>/*.txt im selben Format (ID<TAB>Übersetzung) und werden mit
//   node tools/i18n-bau.js
// zu lang/en.js / lang/ru.js gebaut. Dieses Skript zeigt außerdem, wie viele Texte pro Sprache noch fehlen.
//   node tools/i18n-extrakt.js [--fehlt en]   (listet fehlende IDs für eine Sprache)
const fs=require('fs'),path=require('path'),root=path.join(__dirname,'..');
const SKIP=/^(10-tester|12-patchnotes|26-durchlauf|15-musik|3[1-4]-|08b-|00a-)/;
const files=fs.readdirSync(path.join(root,'js')).filter(f=>f.endsWith('.js')&&!SKIP.test(f));
const key=s=>{let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193)}return(h>>>0).toString(36)};
const unesc=s=>{try{return JSON.parse('"'+s.replace(/\\'/g,"'").replace(/\\`/g,'`').replace(/"/g,'\\"').replace(/\\\\"/g,'\\"')+'"')}catch(e){return s}};
const looks=t=>{
  if(t.length<2||!/[a-zäöüß]/.test(t)&&!/^[A-ZÄÖÜ ·!?.…,:-]{3,}$/.test(t))return false;
  if(/^(#|rgba?\(|[Mm]\s?-?\d|translate|scale|rotate|url\(|http|data:|var\(|calc\(|linear|radial|\d)/.test(t))return false;
  if(/[{};=]|=>|\|\||&&|\$\(|\(\)|\w\(|\bfunction\b|\.js\b|\.png\b|px\b/.test(t))return false;
  if(/^[a-z0-9_\-]+( [a-z0-9_\-]+)*$/.test(t)&&!/[äöüß]/.test(t)&&t.split(' ').length<3)return false; // css-klassen, ids
  if(/^[a-zA-Z0-9_]+$/.test(t)&&!/^[A-ZÄÖÜ][a-zäöüß]{2,}$/.test(t))return false;
  if(/^(bold|italic|normal)\b|Georgia|Arial|sans-serif|monospace/.test(t))return false;
  return true};
const out={},seen=new Set();
function add(f,t){t=t.replace(/\s+/g,' ').trim();if(!looks(t)||seen.has(t))return;seen.add(t);(out[f]=out[f]||[]).push(t)}
function segs(f,raw){ // raw = Literal-Inhalt (Quelltext); ${…} und HTML-Tags trennen Abschnitte
  let s=raw,o='',d=0;for(let i=0;i<s.length;i++){if(!d&&s[i]==='$'&&s[i+1]==='{'){d=1;i++;o+='\u0000';continue}if(d){if(s[i]==='{')d++;else if(s[i]==='}')d--;continue}o+=s[i]}
  unesc(o).split(/<[^>]*>|\u0000|&nbsp;/).forEach(x=>add(f,x.replace(/&[a-z]+;/g,m=>({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"'})[m]||m)))}
// Code ab i durchlaufen, bis eine schließende } auf Tiefe 0 kommt (für ${…}) oder das Ende; Strings darin werden gesammelt
function scan(f,s,i=0,inExpr=false){let d=0;while(i<s.length){const c=s[i];
  if(c==='/'&&s[i+1]==='/'){i=s.indexOf('\n',i);if(i<0)return s.length;continue}
  if(c==='/'&&s[i+1]==='*'){i=s.indexOf('*/',i+2)+2;continue}
  if(inExpr){if(c==='{')d++;else if(c==='}'){if(!d)return i+1;d--}}
  if(c==="'"||c==='"'){let j=i+1;while(j<s.length&&s[j]!==c&&s[j]!=='\n'){if(s[j]==='\\')j++;j++}segs(f,s.slice(i+1,j));i=j+1;continue}
  if(c==='`'){let j=i+1,raw='';while(j<s.length&&s[j]!=='`'){if(s[j]==='\\'){raw+=s[j]+s[j+1];j+=2;continue}
      if(s[j]==='$'&&s[j+1]==='{'){raw+='${}';j=scan(f,s,j+2,true);continue}raw+=s[j++]}
    segs(f,raw);i=j+1;continue}
  i++}return i}
for(const f of files)scan(f,fs.readFileSync(path.join(root,'js',f),'utf8'));
// index.html: sichtbarer Text zwischen Tags
{const h=fs.readFileSync(path.join(root,'index.html'),'utf8').replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>/g,'');
  h.split(/<[^>]*>/).forEach(x=>add('index.html',x));(h.match(/title="([^"]+)"/g)||[]).forEach(x=>add('index.html',x.slice(7,-1)))}
let txt='',n=0,c=0;for(const f in out){txt+=`## ${f}\n`+out[f].map(t=>key(t)+'\t'+t.replace(/\n/g,'\\n')).join('\n')+'\n';n+=out[f].length;out[f].forEach(t=>c+=t.length)}
fs.mkdirSync(path.join(root,'lang'),{recursive:true});fs.writeFileSync(path.join(root,'lang/_de.txt'),txt);
console.log('Texte:',n,'Zeichen:',c);
const ids=new Set();for(const f in out)out[f].forEach(t=>ids.add(key(t)));
const wantMiss=process.argv.indexOf('--fehlt')>0?process.argv[process.argv.indexOf('--fehlt')+1]:null;
for(const L of ['en','ru']){const dir=path.join(root,'lang/src',L);if(!fs.existsSync(dir))continue;const have=new Set();
  for(const f of fs.readdirSync(dir))fs.readFileSync(path.join(dir,f),'utf8').split(/\r?\n/).forEach(l=>{const m=l.match(/^([0-9a-z]+)\s/);if(m)have.add(m[1])});
  const miss=[...ids].filter(k=>!have.has(k));console.log(L,'übersetzt:',ids.size-miss.length,'fehlen:',miss.length);
  if(wantMiss===L)for(const f in out){const m=out[f].filter(t=>!have.has(key(t)));if(m.length)console.log('## '+f+'\n'+m.map(t=>key(t)+'\t'+t).join('\n'))}}
