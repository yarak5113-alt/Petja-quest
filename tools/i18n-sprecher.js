// Ordnet jede Dialogzeile ihrem Sprecher zu (['SM','Text'] im Quelltext) und listet die aktuellen Übersetzungen pro Figur.
//   node tools/i18n-sprecher.js            -> Übersicht: Anzahl Zeilen pro Sprecher
//   node tools/i18n-sprecher.js SM ru      -> alle Zeilen von SM mit ID, Deutsch und aktueller ru-Übersetzung
const fs=require('fs'),path=require('path'),root=path.join(__dirname,'..');
const key=s=>{let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193)}return(h>>>0).toString(36)};
const unq=s=>{try{return JSON.parse('"'+s.replace(/\\'/g,"'").replace(/"/g,'\\"')+'"')}catch(e){return s}};
const who={};
for(const f of fs.readdirSync(path.join(root,'js')).filter(f=>f.endsWith('.js')&&!/^(10-|12-|26-|08b-)/.test(f))){
  const s=fs.readFileSync(path.join(root,'js',f),'utf8');
  for(const m of s.matchAll(/\[\s*'([A-Za-z0-9_]+)'\s*,\s*'((?:[^'\\\r\n]|\\.)*)'/g)){const t=unq(m[2]).replace(/\s+/g,' ').trim();if(!/[a-zäöü]/i.test(t))continue;
    const k=key(t);(who[k]=who[k]||{c:new Set(),t,f}).c.add(m[1])}}
const tr={};for(const L of['en','ru']){tr[L]={};const dir=path.join(root,'lang/src',L);
  for(const f of fs.readdirSync(dir).sort())fs.readFileSync(path.join(dir,f),'utf8').split(/\r?\n/).forEach(l=>{const m=l.match(/^([0-9a-z]+)\s+(.*)$/);if(m)tr[L][m[1]]=m[2]})}
const [code,L]=process.argv.slice(2);
if(!code){const n={};for(const k in who)for(const c of who[k].c)n[c]=(n[c]||0)+1;console.log(n)}
else for(const k in who)if(who[k].c.has(code))console.log(k+'\t'+who[k].t+'\n\t'+(tr[L||'ru'][k]||'—'))
