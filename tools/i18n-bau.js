// Baut lang/en.js und lang/ru.js aus lang/src/<sprache>/*.txt
//   Zeilenformat:  ID<Leerzeichen/TAB>Übersetzung        (ID aus lang/_de.txt, erzeugt von tools/i18n-extrakt.js)
//              oder =Deutscher Text => Übersetzung   (für Texte, die der Extraktor nicht findet; „#“ = beliebige Zahl)
//   „\n“ im Text = Zeilenumbruch. Zeilen mit # am Anfang sind Kommentare.
//   node tools/i18n-bau.js
const fs=require('fs'),path=require('path'),root=path.join(__dirname,'..');
const key=s=>{let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193)}return(h>>>0).toString(36)};
const known=new Set();fs.readFileSync(path.join(root,'lang/_de.txt'),'utf8').split(/\r?\n/).forEach(l=>{const m=l.match(/^([0-9a-z]+)\t/);if(m)known.add(m[1])});
//              oder ~Text mit {} und # => Übersetzung mit {} und #   (Muster: {} = beliebiger Text, # = Zahl; Lücken in gleicher Reihenfolge)
const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
for(const L of ['en','ru']){const dir=path.join(root,'lang/src',L),d={},pat=[];let unk=0;
  if(fs.existsSync(dir))for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.txt')).sort())
    fs.readFileSync(path.join(dir,f),'utf8').split(/\r?\n/).forEach((l,i)=>{if(!l.trim()||l[0]==='#')return;
      if(l[0]==='~'){const m=l.slice(1).match(/^(.+?) => (.*)$/);if(!m)return console.warn(`${L}/${f}:${i+1} Muster unlesbar`);
        pat.push(['^'+m[1].trim().split(/(\{\}|#)/).map(p=>p==='{}'?'(.+?)':p==='#'?'(\\d+(?:[.,]\\d+)?)':esc(p)).join('')+'$',m[2].trim()]);return}
      const eq=l[0]==='=',m=eq?l.slice(1).match(/^(.+?)(?:\t| => )(.*)$/):l.match(/^([0-9a-z]+)\s+(.*)$/);
      if(!m)return console.warn(`${L}/${f}:${i+1} unlesbar`);
      const id=eq?key(m[1].replace(/\s+/g,' ').trim()):m[1],v=m[2].replace(/\\n/g,'\n').trim();
      if(!eq&&!known.has(id)){unk++;console.warn(`${L}/${f}:${i+1} unbekannte ID ${id}`)}
      if(v)d[id]=v});
  fs.writeFileSync(path.join(root,'lang',L+'.js'),`// AUTOMATISCH gebaut aus lang/src/${L}/*.txt mit: node tools/i18n-bau.js – nicht von Hand ändern.\nwindow.LANGS=window.LANGS||{};LANGS.${L}=${JSON.stringify(d)};\nLANGS.${L}_pat=${JSON.stringify(pat)}.map(([r,o])=>[new RegExp(r),o]);\n`);
  console.log(`lang/${L}.js: ${Object.keys(d).length} Texte`+(unk?`, ${unk} unbekannte IDs`:''))}
