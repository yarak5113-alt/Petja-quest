// Automatischer Durchlauf im Hintergrund (ohne Fenster): node tools/durchlauf.js
// Startet Edge/Chrome headless mit index.html?durchlauf und gibt das Protokoll aus.
// Exit-Code 0 = Spiel komplett durchspielbar, 1 = Fehler (Schritt + Spielstand stehen im Protokoll).
// Browser-Pfad notfalls per Umgebungsvariable BROWSER angeben.
const {spawn}=require('child_process'),fs=require('fs'),os=require('os'),path=require('path'),{pathToFileURL}=require('url');
const cands=[process.env.BROWSER,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe','/usr/bin/google-chrome','/usr/bin/chromium','/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].filter(Boolean);
const exe=cands.find(p=>fs.existsSync(p));if(!exe){console.error('Kein Edge/Chrome gefunden – Pfad per BROWSER=... angeben.');process.exit(2)}
const prof=fs.mkdtempSync(path.join(os.tmpdir(),'petja-durchlauf-'));   // frisches Profil: echte Spielstände bleiben unberührt
const url=pathToFileURL(path.join(__dirname,'..','index.html')).href+'?durchlauf';
const b=spawn(exe,['--headless=new','--enable-logging=stderr','--v=0','--no-first-run','--mute-audio','--autoplay-policy=no-user-gesture-required',
  '--window-size=1280,800','--user-data-dir='+prof,url],{stdio:['ignore','ignore','pipe']});
let ok=null,buf='';
const done=code=>{try{b.kill()}catch(e){}setTimeout(()=>{try{fs.rmSync(prof,{recursive:true,force:true})}catch(e){}process.exit(code)},500)};
const timer=setTimeout(()=>{console.log('ABBRUCH: Zeitlimit (20 min) überschritten');done(1)},20*60*1000);
b.stderr.on('data',d=>{buf+=d.toString('utf8');let i;while((i=buf.indexOf('\n'))>=0){const line=buf.slice(0,i);buf=buf.slice(i+1);
  const m=line.match(/"DURCHLAUF\| (.*)", source/);if(!m)continue;const msg=JSON.parse('"'+m[1].replace(/\\'/g,"'")+'"');console.log(msg);
  if(msg.startsWith('ERFOLG'))ok=true;if(msg.startsWith('FEHLER'))ok=false;if(msg==='ENDE'){clearTimeout(timer);done(ok?0:1)}}});
b.on('exit',()=>{if(ok===null){console.log('Browser beendet, bevor der Durchlauf fertig war');done(1)}});
