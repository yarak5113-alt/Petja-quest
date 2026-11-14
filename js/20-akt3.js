// ================= Akt 3: Der Ausweg-Joint (siehe PLAN-AKT3.md) =================
// Rezept vom Pilzmeister: Ur-Spore (Pilzbeet der Gnome), geweihte Glut (Pope → Weihwasser → Schmied), echte Träne (Zwiebel in der Lounge-Lüftung)
// + der Papierfilter vom alten Joint. Am Tisch bei Baba Jaga zusammenbauen → anzünden → zurück auf Wowas Sofa → Abspann.
// Flags: recipe, a3 (Akt-3-Gegenstände verteilt), popeBack, weih, glutQ, glut, zwiebel, trQ, booked, zwIn, traene, sporeQ, ende

// ----- neue Sprecher -----
N.PO=['Vater Ignati','#e8d8a0'];N.SM=['Schmied Fjodor','#e8a070'];VOX.PO=[0,.55,.88];VOX.SM=[0,.35,.86];

// ----- Figuren (gleiche Zeichen-Pipeline wie alle anderen) -----
// Vater Ignati: orthodoxer Pope, seit 1993 „in der Stadt“ (= schläft im Heu hinterm Banja, siehe 22-banja-hof.js). Kamilavka, riesiger grauer Bart, rote Nase, Goldkreuz, Schnapsglas
const POPE=`<g stroke="#1e140c" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round">
<path d="M-21,-2C-23,-8 -19,-13 -12,-13L-3,-13C-1,-8 -1,-4 -3,-2Z" fill="#1e1a1c"/><path d="M3,-2C1,-8 5,-13 12,-13L21,-13C23,-8 23,-4 21,-2Z" fill="#1e1a1c"/>
<path d="M-26,-150C-33,-110 -37,-60 -35,-10L35,-10C37,-60 33,-110 26,-150C14,-158 -14,-158 -26,-150Z" fill="#2c2a34"/>
<path d="M12,-152C20,-112 24,-60 22,-10L35,-10C37,-60 33,-110 26,-150Z" fill="#1c1a22" stroke="none"/>
<path d="M0,-140L0,-14" fill="none" stroke="#4a4856" stroke-width=".9"/><path d="M-20,-60C-22,-44 -22,-28 -21,-14M18,-62C20,-44 20,-28 19,-14" fill="none" stroke="#14121a" stroke-width=".8"/>
<path d="M-31,-98C-10,-93 10,-93 31,-98L31,-91C10,-86 -10,-86 -31,-91Z" fill="#6e2c2a"/><path d="M-6,-90L-9,-70M-2,-90L-1,-72" fill="none" stroke="#6e2c2a" stroke-width="2.4"/>
<path d="M-24,-146C-35,-130 -39,-104 -37,-82C-33,-77 -27,-79 -27,-85C-27,-104 -23,-122 -16,-136Z" fill="#2c2a34"/>
<path d="M-37,-84C-39,-78 -36,-72 -31,-72C-27,-72 -25,-77 -27,-83Z" fill="#e6b090"/>
<path d="M22,-146C35,-141 42,-126 44,-112C45,-106 38,-102 33,-107C29,-119 23,-127 16,-132Z" fill="#2c2a34"/>
<path d="M34,-108C32,-114 36,-119 41,-118C46,-117 47,-111 44,-107C41,-104 36,-104 34,-108Z" fill="#e6b090"/>
<path d="M37,-117L36,-128L46,-128L45,-117Z" fill="#cfe2e6" fill-opacity=".85" stroke-width="1"/><path d="M36.6,-123L45.4,-123L45,-117L37,-117Z" fill="#e8e4d0" stroke="none" opacity=".8"/>
<path d="M-13,-150C-9,-128 9,-128 13,-150" fill="none" stroke="#d8b860" stroke-width="1.6"/>
<path d="M-2,-116L2,-116L2,-98L-2,-98Z" fill="#e2c264"/><path d="M-7,-111L7,-111L7,-107L-7,-107Z" fill="#e2c264"/><path d="M-4,-102L4,-104" fill="none" stroke="#a8862c" stroke-width="1.2"/>
<path d="M-16,-186C-23,-176 -23,-160 -19,-150L-14,-163Z" fill="#a8a8a2"/><path d="M16,-186C23,-176 23,-160 19,-150L14,-163Z" fill="#a8a8a2"/>
<path d="M-16,-176C-18,-197 18,-197 16,-176C16,-167 -16,-167 -16,-176Z" fill="#e8b494"/>
<path d="M-19,-171C-24,-150 -17,-128 0,-121C17,-128 24,-150 19,-171C11,-162 -11,-162 -19,-171Z" fill="#bcbcb4"/>
<path d="M-12,-158C-12,-148 -9,-138 -5,-131M0,-160C0,-150 0,-138 0,-126M12,-158C12,-148 9,-138 5,-131" fill="none" stroke="#8a8a84" stroke-width=".9"/>
<path d="M-11,-170C-7,-175 -2,-173 0,-170C2,-173 7,-175 11,-170C7,-165 -7,-165 -11,-170Z" fill="#a4a49c"/>
<circle cx="0" cy="-176" r="4.6" fill="#dc6c5c"/><circle cx="-1.4" cy="-177.6" r="1.2" fill="#f6b0a0" stroke="none"/>
<path d="M-10,-183C-8,-185.4 -4.6,-185.4 -3,-183M3,-183C4.6,-185.4 8,-185.4 10,-183" fill="none" stroke-width="1.3"/><path d="M-9,-182.4C-7,-181.4 -5,-181.4 -3.4,-182.4M3.4,-182.4C5,-181.4 7,-181.4 9,-182.4" fill="none" stroke="#b07060" stroke-width=".7"/>
<path d="M-11,-188C-8,-190.6 -4,-190.6 -2,-188.6M2,-188.6C4,-190.6 8,-190.6 11,-188" fill="none" stroke="#c8c8c0" stroke-width="2.4"/>
<path d="M-15,-189L-17,-215L17,-215L15,-189Z" fill="#1e1c24"/><path d="M8,-189L10,-215L17,-215L15,-189Z" fill="#141218" stroke="none"/>
<path d="M-17,-215C-6,-217 6,-217 17,-215" fill="none" stroke="#3a3842" stroke-width="1"/><path d="M-15.4,-192C-5,-193.6 5,-193.6 15.4,-192" fill="none" stroke="#3a3842" stroke-width=".8"/>
</g>`;
// Schmied Fjodor: breit, Glatze, schwarzer Vollbart, Lederschürze, aufgekrempelte Ärmel, Hammer, Ruß im Gesicht
const SMITH=`<g stroke="#1e140c" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round">
<path d="M-24,-2C-26,-10 -22,-15 -13,-15L-2,-15C0,-9 0,-4 -2,-2Z" fill="#2a2018"/><path d="M2,-2C0,-9 2,-15 13,-15L24,-15C26,-10 26,-4 24,-2Z" fill="#2a2018"/>
<path d="M-23,-14L-21,-92L21,-92L23,-14L4,-14L0,-72L-4,-14Z" fill="#3c3c44"/><path d="M8,-90L21,-92L23,-14L12,-14Z" fill="#2c2c34" stroke="none"/>
<path d="M-31,-152C-41,-142 -45,-126 -46,-113L-35,-111C-35,-123 -31,-135 -25,-141Z" fill="#cbb994"/><path d="M-46,-113L-35,-111L-35,-117C-38,-118 -42,-118 -46,-117Z" fill="#b0a07a"/>
<path d="M31,-152C41,-142 45,-126 46,-113L35,-111C35,-123 31,-135 25,-141Z" fill="#cbb994"/><path d="M46,-113L35,-111L35,-117C38,-118 42,-118 46,-117Z" fill="#b0a07a"/>
<path d="M-31,-152C-38,-130 -31,-102 -25,-90L25,-90C31,-102 38,-130 31,-152C18,-161 -18,-161 -31,-152Z" fill="#cbb994"/>
<path d="M14,-158C26,-150 33,-130 27,-104L25,-90L14,-90C20,-112 22,-136 14,-158Z" fill="#a8966e" stroke="none"/>
<path d="M-46,-113C-48,-97 -46,-83 -44,-75L-33,-75C-33,-87 -33,-99 -35,-111Z" fill="#d49c74"/>
<path d="M-41,-100C-39,-96 -37,-94 -35,-94" fill="none" stroke="#a46a48" stroke-width=".7"/>
<path d="M-38,-82L-38,-26" fill="none" stroke="#6a4428" stroke-width="4"/><path d="M-48,-36L-28,-36L-28,-24L-48,-24Z" fill="#5a5a64"/><path d="M-48,-33L-28,-33" fill="none" stroke="#8a8a96" stroke-width="1"/>
<path d="M-45,-80C-46,-71 -42,-66 -38,-66C-33,-66 -30,-71 -32,-79C-35,-83 -42,-84 -45,-80Z" fill="#d49c74"/>
<path d="M46,-113C42,-100 33,-94 24,-92L22,-101C28,-104 32,-108 35,-112Z" fill="#d49c74"/>
<path d="M27,-104C22,-106 17,-102 18,-96C19,-91 25,-90 28,-94C30,-97 30,-101 27,-104Z" fill="#d49c74"/>
<path d="M-21,-142L21,-142L25,-40C11,-35 -11,-35 -25,-40Z" fill="#6c4428"/><path d="M8,-142L21,-142L25,-40C20,-38 15,-37 11,-37C13,-70 12,-110 8,-142Z" fill="#54341c" stroke="none"/>
<path d="M-21,-142L-14,-158M21,-142L14,-158" fill="none" stroke="#4a2a14" stroke-width="2.4"/><path d="M-12,-108L8,-108L8,-92L-12,-92Z" fill="#5c3a20" stroke-width="1"/>
<ellipse cx="-6" cy="-70" rx="6" ry="3.4" fill="#3a2414" stroke="none" opacity=".6"/><ellipse cx="10" cy="-56" rx="4" ry="2.4" fill="#3a2414" stroke="none" opacity=".5"/>
<path d="M-9,-162L9,-162L11,-150L-11,-150Z" fill="#d49c74"/>
<path d="M-17,-170C-20,-197 20,-197 17,-170C15,-160 -15,-160 -17,-170Z" fill="#d8a078"/><ellipse cx="-4" cy="-188" rx="5" ry="2" fill="#f0c4a0" stroke="none" opacity=".7"/>
<path d="M-17,-178C-21,-178 -22,-172 -18,-170M17,-178C21,-178 22,-172 18,-170" fill="#d8a078"/>
<path d="M-18,-174C-21,-158 -13,-144 0,-142C13,-144 21,-158 18,-174C11,-167 -11,-167 -18,-174Z" fill="#2a201a"/>
<path d="M-10,-168C-6,-172 -2,-171 0,-168C2,-171 6,-172 10,-168C6,-164 -6,-164 -10,-168Z" fill="#1e1612"/>
<path d="M-4,-176C-5,-172 -3,-170 0,-170C3,-170 5,-172 4,-176C3,-180 -3,-180 -4,-176Z" fill="#c88a64"/>
<path d="M-11,-183L-4,-182M4,-182L11,-183" fill="none" stroke="#1a1410" stroke-width="2.8"/><circle cx="-7.4" cy="-179.4" r="1.4" fill="#1a1006" stroke="none"/><circle cx="7.4" cy="-179.4" r="1.4" fill="#1a1006" stroke="none"/>
<ellipse cx="-11" cy="-173" rx="4" ry="2.4" fill="#3a2a20" stroke="none" opacity=".45"/><ellipse cx="9" cy="-188" rx="3" ry="1.6" fill="#3a2a20" stroke="none" opacity=".4"/>
</g>`;
const NPCBOX=[-56,-220,112,224];

// ----- neue Gegenstände (gemalt wie die anderen: Licht von links oben, weicher Schatten) -----
(function(){
  const F=`<filter id="l" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB"><feGaussianBlur in="SourceAlpha" stdDeviation="1.8" result="b"/><feDiffuseLighting in="b" surfaceScale="4" diffuseConstant="1.2" result="d"><feDistantLight azimuth="225" elevation="42"/></feDiffuseLighting><feSpecularLighting in="b" surfaceScale="4" specularConstant=".6" specularExponent="18" result="s"><feDistantLight azimuth="225" elevation="42"/></feSpecularLighting><feComposite in="SourceGraphic" in2="d" operator="arithmetic" k1="1.2" result="c"/><feComposite in="c" in2="s" operator="arithmetic" k2="1" k3="1"/><feComposite in2="SourceAlpha" operator="in"/></filter>`+
    `<filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feGaussianBlur in="SourceAlpha" stdDeviation="1.6"/><feOffset dx="1.5" dy="3" result="o"/><feComponentTransfer in="o" result="t"><feFuncA type="linear" slope=".5"/></feComponentTransfer><feMerge><feMergeNode in="t"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`+
    `<radialGradient id="glow"><stop offset="0" stop-color="#fff6c0"/><stop offset=".4" stop-color="#ffc040" stop-opacity=".8"/><stop offset="1" stop-color="#ff8020" stop-opacity="0"/></radialGradient>`;
  const S=(body,extra='')=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs>${F}</defs>${extra}<g filter="url(#sh)" stroke="#140a04" stroke-opacity=".5" stroke-width=".7" stroke-linejoin="round"><g filter="url(#l)">${body}</g></g></svg>`);
  const vial=inner=>`<path d="M27,8L37,8L37,14L36,16L36,22C42,25 45,31 45,38L45,50C45,55 41,58 32,58C23,58 19,55 19,50L19,38C19,31 22,25 28,22L28,16L27,14Z" fill="#cfe4ec" fill-opacity=".55"/>${inner}<path d="M26,4L38,4L38,10L26,10Z" fill="#a8743c"/><path d="M23,34C23,30 25,27 27,26" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="2"/>`;
  Object.assign(ICONS,{
    filter:S(`<path d="M14,40L44,22C48,20 52,26 48,29L18,47C14,49 10,43 14,40Z" fill="#e8dcc0"/><path d="M20,37C22,40 22,43 21,45M28,32C30,35 30,38 29,40M36,27C38,30 38,33 37,35" fill="none" stroke="#b8a888" stroke-width="1.2"/><ellipse cx="46" cy="25.5" rx="3" ry="4.4" fill="#c8b894" transform="rotate(-31 46 25.5)"/><path d="M45,23.5C47,24.5 47.4,26.6 46.4,27.6" fill="none" stroke="#9a8a68" stroke-width="1"/>`),
    spore:S(`<path d="M18,22L46,22L48,54C48,57 45,58 32,58C19,58 16,57 16,54Z" fill="#c8dce0" fill-opacity=".5"/><path d="M17,16L47,16L47,23L17,23Z" fill="#8a6a3a"/><path d="M26,52L25,42L39,42L38,52Z" fill="#e8dcc0"/><path d="M20,43C20,30 44,30 44,43C38,46 26,46 20,43Z" fill="#f0c040"/><g fill="#fff4b0"><circle cx="27" cy="37" r="1.6"/><circle cx="34" cy="35" r="1.3"/><circle cx="39" cy="39" r="1.2"/></g><path d="M22,30C24,26 27,25 29,26" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="1.6"/>`,`<circle cx="32" cy="40" r="22" fill="url(#glow)" opacity=".7"/>`),
    phiole:S(vial('')),
    traene:S(vial(`<path d="M20,44C20,40 44,40 44,44L44,50C44,55 40,57 32,57C24,57 20,55 20,50Z" fill="#6ab8ff" fill-opacity=".85"/><path d="M32,28C35,33 37,36 37,39C37,42 35,44 32,44C29,44 27,42 27,39C27,36 29,33 32,28Z" fill="#a8dcff"/>`),`<circle cx="32" cy="40" r="20" fill="#80c8ff" opacity=".25"/>`),
    zwiebel:S(`<path d="M32,10C34,16 44,22 48,32C52,44 44,56 32,56C20,56 12,44 16,32C20,22 30,16 32,10Z" fill="#a83a6a"/><path d="M32,12C30,24 28,38 30,55M32,12C36,24 40,38 38,55M32,12C24,22 20,36 22,52M32,12C40,22 44,36 42,52" fill="none" stroke="#7a1e48" stroke-width="1"/><path d="M28,56L26,61M32,56L32,62M36,56L38,61" fill="none" stroke="#c8b890" stroke-width="1.2"/><path d="M30,10C31,6 33,4 35,3" fill="none" stroke="#a89060" stroke-width="2"/><path d="M22,30C24,24 28,21 30,20" fill="none" stroke="#e8a0c0" stroke-opacity=".7" stroke-width="1.6"/>`),
    weihwasser:S(`<path d="M26,6L38,6L38,16C46,19 50,27 50,36L50,50C50,56 46,58 32,58C18,58 14,56 14,50L14,36C14,27 18,19 26,16Z" fill="#cfe4ec" fill-opacity=".6"/><path d="M15,40L49,40L49,50C49,55 45,57 32,57C19,57 15,55 15,50Z" fill="#8cc8ec" fill-opacity=".8"/><path d="M29,26L35,26L35,30L41,30L41,36L35,36L35,48L29,48L29,36L23,36L23,30L29,30Z" fill="#e2c264"/><path d="M25,3L39,3L39,8L25,8Z" fill="#8a6a3a"/><path d="M19,32C19,26 22,22 25,21" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="2"/>`),
    glut:S(`<path d="M12,30L52,30L50,54C50,57 47,58 32,58C17,58 14,57 14,54Z" fill="#8a8e96"/><path d="M12,30C12,26 52,26 52,30C52,34 12,34 12,30Z" fill="#3a2a22"/><g fill="#ff7a20"><circle cx="24" cy="29" r="4"/><circle cx="33" cy="28" r="4.6"/><circle cx="42" cy="29.4" r="3.6"/></g><g fill="#ffe080"><circle cx="24" cy="28" r="1.6"/><circle cx="33" cy="27" r="2"/><circle cx="42" cy="28.6" r="1.4"/></g><path d="M16,38L48,38M16,46L48,46" fill="none" stroke="#5a5e66" stroke-width="1"/><path d="M50,36C56,36 58,44 52,46" fill="none" stroke="#5a5e66" stroke-width="2.6"/>`,`<circle cx="32" cy="28" r="22" fill="url(#glow)" opacity=".8"/><path d="M28,20C26,14 30,10 28,4M36,18C38,12 34,8 36,2" fill="none" stroke="#c8c8c8" stroke-opacity=".5" stroke-width="2"/>`),
    joint2:S(`<path d="M8,46L48,20L54,28L14,54Z" fill="#f4eedc"/><path d="M44,22.6L48,20L54,28L50,30.6Z" fill="#e8dcc0"/><path d="M8,46L14,54L11,53C7,51 6,48 8,46Z" fill="#2a1e18"/><g fill="#6ab8ff" opacity=".7"><circle cx="22" cy="42" r="1.4"/><circle cx="30" cy="36" r="1.2"/><circle cx="38" cy="31" r="1.4"/></g><g fill="#f0c040"><circle cx="26" cy="40" r="1.1"/><circle cx="34" cy="34" r="1"/></g>`,`<circle cx="32" cy="37" r="24" fill="#ffd060" opacity=".22"/>`)})})();
Object.assign(ITEMS,{filter:['','Papierfilter','Der Filter vom alten Joint. Hat alles mitgemacht. Wie ich.'],spore:['','Ur-Spore','Goldene Sporen aus dem Pilzbeet der Gnome. Glitzern. Riechen nach Keller und Zukunft.'],
  phiole:['','Leere Phiole','Von Baba Jaga. Für eine echte Träne. Fallen lassen ist verboten.'],traene:['','Nymphenträne','Eine echte Träne von Nastja. Dank Omas Zwiebel. Ich bin kein guter Mensch.'],
  zwiebel:['','Omas Zwiebel','Die schärfste aus Omas Beet. Schon durch die Tasche tränen mir die Augen.'],weihwasser:['','Weihwasser','Von Vater Ignati. „Zur Haltbarkeit“ mit Wodka gestreckt.'],
  glut:['','Glut in der Dose','Geweihte Glut aus Fjodors Esse. Geht nicht aus. Nicht mal im Sumpf.'],joint2:['','Ausweg-Joint','Mein Weg nach Hause. Hoffentlich.']});

// ----- Figuren und Klickflächen in die Orte setzen -----
const pjAt=(id,y)=>{const o=SCN[id],sN=o.k*(494-o.hz),t=Math.max(.05,(y-o.hz)/(494-o.hz));return sN*Math.pow(t,o.pp||1.15)*258};
function a3npc(room,id,X,Y,meters,headU){const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.setAttribute('class','interactive');g.dataset.id=id;g.dataset.a3=JSON.stringify([room,X,Y,meters,headU]);
  const im=document.createElementNS('http://www.w3.org/2000/svg','image');im.setAttribute('class','spr');im.setAttribute('x',NPCBOX[0]);im.setAttribute('y',NPCBOX[1]);im.setAttribute('width',NPCBOX[2]);im.setAttribute('height',NPCBOX[3]);
  g.appendChild(im);document.getElementById('r-'+room).appendChild(g);return im}
function a3hot(room,id,d){const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.setAttribute('class','interactive painted');g.dataset.id=id;
  const p=document.createElementNS('http://www.w3.org/2000/svg','path');p.setAttribute('class','hit');p.setAttribute('d',d);g.appendChild(p);document.getElementById('r-'+room).appendChild(g)}
const A3IMG={pope:a3npc('banja','pope',96,468,1.72,194),pope2:a3npc('kirche','pope2',548,396,1.72,194),schmied:a3npc('schmiede','schmied',522,448,1.86,192)};
a3hot('gnome','pilzbeet','M452,428L460,394L580,394L590,428Z');a3hot('lounge','lueftung','M586,94L650,94L650,142L586,142Z');
sprite(POPE,NPCBOX,K).then(u=>{A3IMG.pope.setAttribute('href',u);A3IMG.pope2.setAttribute('href',u)});sprite(SMITH,NPCBOX,K).then(u=>A3IMG.schmied.setAttribute('href',u));
// Größe aus der Bildtiefe: so groß wie ein echter Mensch neben Petja
document.querySelectorAll('[data-a3]').forEach(g=>{const[room,X,Y,m,hu]=JSON.parse(g.dataset.a3);g.setAttribute('transform',`translate(${X},${Y}) scale(${(m/1.8*pjAt(room,Y)/hu).toFixed(3)})`)});
function a3Vis(){const show=(id,on)=>{const e=document.querySelector(`[data-id="${id}"]`);if(e)e.style.display=on?'':'none'};show('pope',!FL.popeBack);show('pope2',!!FL.popeBack);
  if(FL.recipe&&!FL.a3){FL.a3=1;if(!has('phiole')&&!has('traene'))inv.push('phiole');if(!has('filter'))inv.push('filter');renderInv()}}
const _enterA3=enter;enter=function(id,pos){_enterA3(id,pos);a3Vis();if(id==='lounge'&&FL.booked&&!FL.zwIn)setTimeout(()=>{if(cur==='lounge'&&!busy)say([['P','Nastja macht sich frisch. Ich hab vielleicht eine Minute.'],['P','(Und die Lüftung da oben bläst direkt aufs Sofa …)']])},1300)};
a3Vis();
// Pilzbeet und Lüftung in die gemalten Orte (vor dem ersten Betreten eingehängt)
{const pg=SCN.gnome.paint;SCN.gnome.paint=function(){pg.apply(this,arguments);const x=lay();shadowAt(x,520,430,80,.5);
  x.fillStyle='#2a1c10';x.beginPath();x.moveTo(460,428);x.lineTo(468,398);x.lineTo(572,398);x.lineTo(582,428);x.fill();for(let i=0;i<60;i++)dab(x,470+R()*104,404+R()*22,3+R()*4,[60,40,24],.6);
  wood(x,452,424,138,8,0);wood(x,462,394,116,6,0);wood(x,452,394,8,36,1);wood(x,582,394,8,36,1);
  for(let i=0;i<14;i++){const X=474+R()*94,Y=410+R()*14,gold=i%5==0,r=gold?5:3.6+R()*2;x.fillStyle='#e8dcc0';x.fillRect(X-1.2,Y-r*1.2,2.4,r*1.2);
    if(gold){x.save();x.globalCompositeOperation='lighter';dab(x,X,Y-r*1.4,12,[255,200,60],.6);x.restore()}ell(x,X,Y-r*1.3,r,r*.6,gold?[240,190,50]:[140,96,60])}
  wood(x,596,384,4,44,1);wood(x,584,384,30,14,0);x.fillStyle='#2a1808';x.font='bold 6px Georgia';x.textAlign='center';x.fillText('FINGER',599,390);x.fillText('WEG!',599,396);put(x)}}
{const pl=SCN.lounge.paint;SCN.lounge.paint=function(){pl.apply(this,arguments);const x=lay();x.fillStyle='#1a0c08';x.fillRect(586,94,64,48);
  const g=x.createLinearGradient(586,94,650,142);g.addColorStop(0,'#f4d88a');g.addColorStop(.5,'#b8862c');g.addColorStop(1,'#6a4410');x.strokeStyle=g;x.lineWidth=4;x.strokeRect(588,96,60,44);
  x.lineWidth=2.4;for(let Y=104;Y<138;Y+=6){x.beginPath();x.moveTo(592,Y);x.lineTo(644,Y);x.stroke()}x.fillStyle='#e8c870';[[592,100],[644,100],[592,136],[644,136]].forEach(([X,Y])=>{x.beginPath();x.arc(X,Y,1.8,0,7);x.fill()});put(x)}}

// ----- Dialoge und Objekte -----
const hasAll=()=>['filter','spore','glut','traene'].every(has);
Object.assign(T,{
  pope:{n:'Vater Ignati',at:[190,476],fn(){say([['P','Entschuldigung … Sind Sie zufällig der Pope aus dem Dorf?'],['PO','*hicks* Vater Ignati. Zu Diensten. Ich bin nur kurz hier. Auf ein Bier.'],
      ['P','An Ihrer Kirche hängt ein Zettel. „Kollege kommt gleich wieder.“ Von 1993.'],['PO','1993?! … Welches Jahr haben wir denn?'],['P','Ehrlich gesagt weiß ich das hier auch nicht so genau.'],
      ['PO','Herr im Himmel. Die Glocken! Der Kater! Meine Gemeinde!'],['P','Ihre Gemeinde besteht aus einer Oma und einem Kater. Beide sauer.'],
      ['PO','Ich muss zurück. Aber durch den Irrwald? Den find ich nüchtern nicht. Und nüchtern war ich zuletzt 1993.'],
      ['P','Links, links, rechts, geradeaus. Nur halt rückwärts. Also: geradeaus, rechts, links, links.'],['PO','Gott segne dich, mein Sohn. Wir sehen uns an der Kirche. Ich nehm nur noch einen für den Weg.']],
      ()=>{FL.popeBack=1;a3Vis()})}},
  pope2:{n:'Vater Ignati',at:[470,440],fn(){
    if(!FL.weih)return say([['PO','Mein Sohn! Die Kirche steht noch. Der Kater auch. Er ist dick geworden.'],['P','Ich bräuchte Glut aus einer geweihten Esse. Nur hat der Schmied keine geweihte Esse.'],
      ['PO','Fjodor? Dem schulde ich seit 1993 die Weihe seiner Esse. Er hat mich jedes Jahr dran erinnert. Laut.'],['PO','Hier: Weihwasser. Echtes. Ich hab nur ein bisschen Wodka reingetan. Zur Haltbarkeit.'],
      ['P','Natürlich.'],['PO','Bring es ihm. Sag ihm: Damit sind wir quitt.']],()=>{FL.weih=1;inv.push('weihwasser');renderInv()});
    hint('pope2',[[['PO','Grüß Fjodor von mir. Und sag ihm: Quitt heißt quitt.']],[['PO','Der Kater sitzt jetzt auf dem Altar. Ich lass ihn. Er ist länger in der Gemeinde als ich.']],[['PO','Möge der Herr dich nach Hause führen. Und wenn nicht, gibt’s im Banja Wodka.']]])}},
  schmied:{n:'Schmied Fjodor',at:[440,472],fn(){
    if(FL.glut)return say([['SM','Pass auf die Dose auf. Und auf deine Finger.']]);
    if(has('weihwasser'))return say([['P','Schöne Grüße von Vater Ignati. Weihwasser. Er sagt: quitt.'],['SM','*kippt es in die Esse* *ZISCHHH*'],['SM','… Riecht nach Wodka.'],['P','Zur Haltbarkeit, sagt er.'],
      ['SM','Dann ist es echt. Hier – Glut in der Dose. Die geht nicht aus, nicht mal im Sumpf.'],['P','*nimmt die Dose* Heiß. Natürlich.']],()=>{inv.splice(inv.indexOf('weihwasser'),1);inv.push('glut');FL.glut=1;renderInv()});
    if(FL.recipe)return say([['P','Ich bräuchte Glut. Glut, die nicht ausgeht.'],['SM','Aus meiner Esse? Die brennt seit dreißig Jahren ungeweiht. Der Pope sollte sie segnen. 1993. Dann ist er „in die Stadt“.'],
      ['SM','Seitdem schuldet er mir die Weihe. Ohne Segen keine Glut, die nicht ausgeht.'],['P','Und wenn ich Ihnen den Segen bringe?'],['SM','Dann kriegst du die beste Glut im ganzen Märchen.']],()=>{FL.glutQ=1});
    hint('schmied',[[['SM','Was glotzt du? Noch nie einen Schmied gesehen?'],['P','Doch. Im Fernsehen. Die waren kleiner.']],[['SM','Hufeisen, Nägel, Sensen. Keine Wunder. Für Wunder geh zur Hexe.']],[['SM','Ich hau auf Eisen. Nicht auf Leute. Meistens.']]])}},
  pilzbeet:{n:'Pilzbeet',at:[520,446],fn(){
    if(has('spore')||FL.ende)return say([['P','Das Beet hat mir schon genug gegeben. Die Pilze gucken beleidigt.']]);
    if(!FL.recipe)return hint('pilzbeet',[[['P','Ein Pilzbeet. Die Pilze gucken mich an. Ich guck lieber weg.']],[['N1','Finger weg, Langer! Das ist Gnomgold.']]]);
    if(!FL.sporeQ)return say([['N1','Die Ur-Spore? Knolle schickt dich? *seufz*'],['N1','Die goldenen Pilze sind’s. Die tauchen auf und sind wieder weg, schneller als du gucken kannst.'],
      ['N1','Fünf goldene, dann hast du genug Sporen. Aber pflück keinen falschen, sonst kriegt das Beet schlechte Laune.'],['P','Ein Pilz-Reaktionstest. Mein Lieblingssport. Direkt nach Liegen.']],()=>{FL.sporeQ=1;pilzbeetGame()});
    pilzbeetGame()}},
  lueftung:{n:'Lüftung',at:[600,470],fn(){
    if(FL.zwIn)return say([['P','Da drin liegt jetzt eine Zwiebel. Respekt an die Lüftung.']]);
    if(has('zwiebel'))return say([['P','Die Lüftung bläst direkt aufs Sofa. Aber hier drin sieht Nastja alles.'],['P','(Von draußen wär das unauffälliger. Hinterm Banja.)']]);
    say([['P','Eine Lüftung. Bläst warme Luft direkt aufs Sofa. Wer baut sowas?']])}}});

// bestehende Figuren und Orte erweitern
const wrapFn=(id,f)=>{const o=T[id];if(!o)return;const orig=o.fn?o.fn.bind(o):()=>{o.i=o.i||0;const set=o.l[o.i%o.l.length];o.i++;say(set,o.after)};o.fn=function(){return f.call(o,orig)}};
wrapFn('oma',orig=>{if(FL.recipe&&!FL.zwiebel&&!has('traene'))return say([['P','Oma, haben Sie zufällig eine Zwiebel? Eine richtig scharfe?'],
  FL.teer?['O','Meine Zwiebeln sind alle in der Suppe, Junge. Aber die Gnome züchten welche. So scharf, dass der Kohl daneben weint.']:['O','Fwiebeln? Alle in der Fuppe. Die Gnome haben welche. Ffarfe.']]);return orig()});
wrapFn('nastja2',orig=>{if(FL.recipe&&!has('traene')&&!FL.traene){
  if(!FL.trQ)return say([['P','Nastja … ganz komische Frage. Könntest du mal weinen? Nur eine Träne?'],['NA','Weinen? Süßer, ich hab dreihundert Jahre im Sumpf gelegen. Ich hab keine Tränen mehr. Nur noch Schlamm.'],
    ['P','(Eine echte Träne von einer, die nie weint. Na super.)'],['P','(Irgendwas, das jeden zum Heulen bringt … Zwiebeln. Bei den Gnomen wächst doch Gemüse.)']],()=>{FL.trQ=1});
  return say([['NA','Privattanz? Frag Madame, Süßer. Die führt das Buch.']])}return orig()});
wrapFn('madame',orig=>{if(FL.recipe&&!FL.traene&&!has('traene')){
  if(FL.zwIn)return say([['P','Madame, ich bräuchte nochmal einen Privattanz. Mit Nastja.'],['Z','Nochmal? Süßer, du wirst ja süchtig.'],['Z','Na gut. Für meinen besten Rekrutierer. Die Lounge ist frei.']],
    ()=>{FL.booked=1;enter('lounge',[260,480]);setTimeout(()=>say([['NA','So, Süßer. Ich bin da. Hände aufs Sofa.'],['P','(Nicht atmen. Die Lüftung arbeitet schon.)']],lapDance),1500)});
  if(has('zwiebel'))return say([['P','(Moment. Wenn ich mit einer Zwiebel in der Hand in die Lounge gehe, merkt Nastja das sofort.)'],['P','(Die Lüftung der Lounge muss ja irgendwo nach draußen gehen. Hinterm Banja vielleicht?)']])}return orig()});
wrapFn('kirche2',orig=>{if(FL.popeBack&&cur==='kirche')return say([['P','Die Tür ist offen. Drinnen riecht es nach Weihrauch. Und nach Wodka.']]);return orig()});
wrapFn('esse',orig=>{if(FL.glut)return say([['P','Jetzt glüht sie geweiht. Und riecht leicht nach Wodka.']]);return say([['P','Fjodors Esse. Die Kohle glüht. Aber irgendwie … ungeweiht.']])});
wrapFn('tisch',orig=>{if(FL.ende)return say([['P','Hier hab ich meinen Ausweg gebaut. Ein Satz, den ich nie sagen wollte.']]);
  if(FL.recipe){if(hasAll())return say([['J2','Na? Ur-Spore, geweihte Glut, eine echte Träne. Und der alte Filter. Leg alles auf den Tisch, Bürschchen.'],['J2','Und dreh ihn ordentlich. Ein schiefer Joint bringt dich nur ins nächste Märchen.']],craftGame);
    return say([['P','Hier bau ich den Ausweg-Joint. Sobald ich alles hab.'],['J2','Ur-Spore, geweihte Glut, echte Träne. Und den Filter. Vorher fass ich nichts an.']])}return orig()});

// ----- Minispiel-Hülle: nach 3 Fehlversuchen darf man überspringen (wie bei den anderen) -----
function a3Mini(name,title,run,ok,win){return function(){const go=()=>{run();const iv=setInterval(()=>{if($('#fg'))return;clearInterval(iv);if(ok())return;
  const f=FL['fail_'+name]=(FL['fail_'+name]||0)+1;if(f==3)setTimeout(()=>toast('Beim nächsten Versuch kannst du „'+title+'“ überspringen.',0,'tipp'),400)},200)};
  if((FL['fail_'+name]||0)<3)return go();
  const o=openO(`<div class="pan menu"><h3>${ic('dice')} ${title}</h3><p class="em">Klappt nicht so recht? Kein Problem – du kannst das Minispiel auch überspringen.</p>
    <button class="mb big" data-m="try">${ic('retry')} Nochmal versuchen</button><button class="mb" data-m="skip">${ic('skip')} Überspringen</button></div>`,'menuO');
  o.querySelector('[data-m=try]').onclick=()=>{closeO();go()};o.querySelector('[data-m=skip]').onclick=()=>{closeO();win()}}}
function a3Canvas(){const cv2=document.createElement('canvas');cv2.id='fg';cv2.width=800;cv2.height=500;cv2.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:30;cursor:pointer';$('#game').appendChild(cv2);
  const P={x:0,y:0};const pos=(cx,cy)=>{const r=cv2.getBoundingClientRect();P.x=(cx-r.left)/r.width*800;P.y=(cy-r.top)/r.height*500};return{cv2,x:cv2.getContext('2d'),P,pos}}
const icoImg={};const II=id=>{if(!icoImg[id]){icoImg[id]=new Image();icoImg[id].src=ICON(id)}return icoImg[id]};

// ----- Pilzbeet: goldene Pilze pflücken, bevor sie wieder verschwinden (5 Stück in 40 s, max. 3 falsche) -----
const sporeWin=()=>{inv.push('spore');renderInv();say([['P','Fünf goldene Pilze. Die Sporen glitzern. Riecht nach Keller und Zukunft.'],['N1','Gut. Und jetzt raus aus meinem Beet, Langer.']])};
function pilzbeetRun(){if($('#fg'))return;const{cv2,x,P,pos}=a3Canvas();let fin=false,got=0,miss=0,T0=performance.now(),next=0,msg='Klick die GOLDENEN Pilze an, bevor sie verschwinden! Braune und rote nicht.',flash=0;
  const H=[];for(let r=0;r<3;r++)for(let c=0;c<4;c++)H.push({x:190+c*140+(r%2?40:0),y:230+r*85,m:null});
  const BG=document.createElement('canvas');BG.width=800;BG.height=500;{const b=BG.getContext('2d');let g=b.createLinearGradient(0,0,0,500);g.addColorStop(0,'#2a3a1a');g.addColorStop(1,'#141a0c');b.fillStyle=g;b.fillRect(0,0,800,500);
    b.fillStyle='#3a2414';b.beginPath();b.moveTo(110,170);b.lineTo(690,170);b.lineTo(740,470);b.lineTo(60,470);b.fill();for(let i=0;i<900;i++){b.fillStyle=`rgba(${20+Math.random()*60},${14+Math.random()*30},${8+Math.random()*16},.6)`;b.beginPath();b.arc(80+Math.random()*640,175+Math.random()*290,1+Math.random()*3,0,7);b.fill()}
    for(const[a,c,d,e]of[[100,160,700,176],[50,460,750,480]]){g=b.createLinearGradient(0,c,0,e);g.addColorStop(0,'#8a6038');g.addColorStop(1,'#4a2c14');b.fillStyle=g;b.fillRect(a,c,d-a,e-c)}
    H.forEach(h=>{b.fillStyle='#120a04';b.beginPath();b.ellipse(h.x,h.y,40,13,0,0,7);b.fill();b.strokeStyle='#5a3a20';b.lineWidth=3;b.beginPath();b.ellipse(h.x,h.y-2,42,14,0,Math.PI,0);b.stroke()})}
  const shroom=(h,p)=>{const m=h.m,up=Math.sin(Math.min(1,p)*Math.PI),H2=56*up;if(H2<2)return;x.save();x.beginPath();x.rect(h.x-60,h.y-120,120,120);x.clip();const y=h.y+4-H2;
    x.fillStyle='#ece2c8';x.fillRect(h.x-6,y,12,H2);const col=m.t=='g'?['#fff2a0','#f0b020','#8a5a08']:m.t=='r'?['#ff8a7a','#d01e14','#6a0804']:['#d8a878','#8a5a34','#3a2410'];
    const g=x.createRadialGradient(h.x-8,y-12,2,h.x,y-4,30);g.addColorStop(0,col[0]);g.addColorStop(.6,col[1]);g.addColorStop(1,col[2]);x.fillStyle=g;x.beginPath();x.ellipse(h.x,y-2,30,20,0,Math.PI,0);x.closePath();x.fill();x.strokeStyle='#1a0e04';x.lineWidth=2;x.stroke();
    if(m.t=='r'){x.fillStyle='#fff';[[-12,-10],[2,-16],[14,-8],[-2,-6]].forEach(([a,b])=>{x.beginPath();x.arc(h.x+a,y+b,3,0,7);x.fill()})}
    if(m.t=='g'){x.globalCompositeOperation='lighter';const gg=x.createRadialGradient(h.x,y-8,4,h.x,y-8,60);gg.addColorStop(0,'rgba(255,220,90,.55)');gg.addColorStop(1,'rgba(255,200,60,0)');x.fillStyle=gg;x.fillRect(h.x-60,y-70,120,120);x.globalCompositeOperation='source-over'}x.restore()};
  function frame(t){if(fin)return;const el=(t-T0)/1000,left=Math.max(0,40-el);x.drawImage(BG,0,0);
    if(t>next){const free=H.filter(h=>!h.m);if(free.length){const h=free[Math.floor(Math.random()*free.length)],r=Math.random(),k=r<.34?'g':r<.6?'r':'b';h.m={t:k,t0:t,d:k=='g'?950-got*60:1500}}next=t+420+Math.random()*420}
    H.forEach(h=>{if(h.m&&t-h.m.t0>h.m.d)h.m=null;if(h.m)shroom(h,(t-h.m.t0)/h.m.d)});
    x.fillStyle='rgba(10,6,2,.8)';x.fillRect(0,0,800,64);x.fillStyle='#ffd25a';x.font='bold 22px Georgia';x.textAlign='left';x.fillText('Gold: '+got+' / 5',20,40);x.textAlign='center';x.fillText(Math.ceil(left)+' s',400,40);x.textAlign='right';x.fillStyle=miss?'#ff8a7a':'#ffd25a';x.fillText('Falsch: '+miss+' / 3',780,40);
    x.textAlign='center';x.font='italic 15px Georgia';x.fillStyle='#f6e8c4';x.fillText(msg,400,92);x.fillStyle='rgba(10,6,2,.7)';x.fillRect(700,470,100,30);x.fillStyle='#f6e8c4';x.font='bold 13px Georgia';x.fillText('Abbrechen',750,490);
    if(flash>0){x.fillStyle=`rgba(255,${flash>0?60:220},40,${flash*.3})`;x.fillRect(0,0,800,500);flash-=.05}
    if(left<=0)return end(0);requestAnimationFrame(frame)}
  function click(){if(P.x>700&&P.y>470)return end(0);for(const h of H){if(!h.m)continue;if(Math.abs(P.x-h.x)<36&&P.y<h.y+8&&P.y>h.y-80){const k=h.m.t;h.m=null;
      if(k=='g'){got++;msg=got<5?'Erwischt! Noch '+(5-got)+'.':'';if(got>=5)return end(1)}else{miss++;flash=1;msg=k=='r'?'Fliegenpilz! Finger weg!':'Das ist ein ganz normaler Pilz.';if(miss>=3){msg='Das Beet ist beleidigt.';return end(0)}}return}}}
  cv2.onmousedown=e=>{e.stopPropagation();pos(e.clientX,e.clientY);click()};cv2.ontouchstart=e=>{e.preventDefault();pos(e.touches[0].clientX,e.touches[0].clientY);click()};cv2.onclick=e=>e.stopPropagation();
  const esc=e=>{if(e.key=='Escape')end(0)};addEventListener('keydown',esc);
  function end(win){if(fin)return;fin=true;cv2.remove();removeEventListener('keydown',esc);if(win)sporeWin();else say([['P','Die Pilze waren schneller. Peinlich. Gegen Pilze.']])}
  requestAnimationFrame(frame)}
const pilzbeetGame=a3Mini('pilzbeet','Pilzbeet',pilzbeetRun,()=>has('spore'),sporeWin);

// ----- Finale am Tisch: Ausweg-Joint bauen (Filter → Ur-Spore → Träne → rollen → mit der Glut anzünden) -----
function craftRun(){if($('#fg'))return;const{cv2,x,P,pos}=a3Canvas();let fin=false,step=0,drag=null,roll=0,rollA=false,lit=0,msg='Leg den Filter ans rechte Ende des Papiers.',spark=[];
  const PAPER=[250,250,330,46],TIP=[262,273],FILT=[560,273];
  const it=[{id:'filter',x:90,y:110},{id:'spore',x:90,y:200},{id:'traene',x:90,y:290},{id:'glut',x:90,y:380}].map(o=>({...o,hx:o.x,hy:o.y}));
  const ORDER=['filter','spore','traene',null,'glut'],TXT=['Erst der Filter, Bürschchen!','Erst die Ur-Spore drauf!','Jetzt die Träne!','Erst rollen!','Jetzt anzünden!'];
  const BG=document.createElement('canvas');BG.width=800;BG.height=500;{const t=BG.getContext('2d');for(let i=0;i<9;i++){const g=t.createLinearGradient(0,i*56,0,i*56+56);g.addColorStop(0,'#6a4a2a');g.addColorStop(.5,'#8a6a42');g.addColorStop(1,'#4a3018');t.fillStyle=g;t.fillRect(0,i*56,800,56);t.fillStyle='#1a0e06';t.fillRect(0,i*56+54,800,2)}
    for(let i=0;i<400;i++){t.strokeStyle=`rgba(${Math.random()<.5?30:160},${Math.random()<.5?20:120},10,.2)`;t.beginPath();const X=Math.random()*800,Y=Math.random()*500;t.moveTo(X,Y);t.lineTo(X+20+Math.random()*60,Y);t.stroke()}
    const g=t.createRadialGradient(420,270,60,420,270,460);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.6)');t.fillStyle=g;t.fillRect(0,0,800,500)}
  const inP=p=>p.x>PAPER[0]-20&&p.x<PAPER[0]+PAPER[2]+20&&p.y>PAPER[1]-30&&p.y<PAPER[1]+PAPER[3]+30;
  function frame(t){if(fin)return;x.drawImage(BG,0,0);const T=t/1000;
    // Papier bzw. Joint
    if(roll<1){x.fillStyle='#f4eedc';x.fillRect(PAPER[0],PAPER[1]+roll*16,PAPER[2],PAPER[3]*(1-roll*.75));x.strokeStyle='#b8b0a0';x.strokeRect(PAPER[0],PAPER[1]+roll*16,PAPER[2],PAPER[3]*(1-roll*.75))}
    else{x.fillStyle='#f4eedc';x.beginPath();x.moveTo(TIP[0],TIP[1]-7);x.lineTo(FILT[0],FILT[1]-9);x.lineTo(FILT[0],FILT[1]+9);x.lineTo(TIP[0],TIP[1]+7);x.closePath();x.fill();x.strokeStyle='#b8b0a0';x.stroke()}
    // Zielfeld des aktuellen Schritts gestrichelt markieren
    const zone=(a,b,w,h,t)=>{x.setLineDash([6,5]);x.strokeStyle=`rgba(255,240,200,${.5+.3*Math.sin(T*4)})`;x.lineWidth=2;x.strokeRect(a,b,w,h);x.setLineDash([]);x.fillStyle='rgba(255,240,200,.85)';x.font='bold 14px Georgia';x.textAlign='center';x.fillText(t,a+w/2,b+h+18)};
    if(step==0)zone(FILT[0]-40,FILT[1]-34,70,68,'Filter');if(step==1||step==2)zone(PAPER[0]-8,PAPER[1]-8,PAPER[2]+16,PAPER[3]+16,step==1?'Ur-Spore aufs Papier':'Ein Tropfen Träne');if(step==4)zone(TIP[0]-34,TIP[1]-34,68,68,'Glut an die Spitze');
    if(step>=1){x.fillStyle='#d8c8a0';x.fillRect(FILT[0]-22,FILT[1]-(roll>=1?9:12),22,roll>=1?18:24)}
    if(step>=2&&roll<1)for(let i=0;i<40;i++){const a=i*2.4;x.fillStyle=i%3?'#f0c040':'#fff2a0';x.beginPath();x.arc(PAPER[0]+20+((i*37)%290),PAPER[1]+12+((i*13)%24)+roll*12,1.8,0,7);x.fill()}
    if(step>=3&&roll<1){x.fillStyle='rgba(120,190,255,.45)';x.beginPath();x.ellipse(PAPER[0]+170,PAPER[1]+24+roll*10,40,8,0,0,7);x.fill()}
    if(step==3){x.fillStyle='rgba(255,240,200,.75)';x.font='bold 15px Georgia';x.textAlign='center';x.fillText('→ → →',PAPER[0]+PAPER[2]/2,PAPER[1]-14);x.fillStyle='rgba(255,240,200,.25)';x.fillRect(PAPER[0],PAPER[1]+PAPER[3]+8,PAPER[2]*roll,4)}
    if(lit>0){x.save();x.globalCompositeOperation='lighter';const g=x.createRadialGradient(TIP[0],TIP[1],1,TIP[0],TIP[1],30*lit);g.addColorStop(0,'rgba(255,230,140,1)');g.addColorStop(1,'rgba(255,120,30,0)');x.fillStyle=g;x.fillRect(TIP[0]-40,TIP[1]-40,80,80);x.restore()}
    spark=spark.filter(s=>(s.l-=.02)>0);spark.forEach(s=>{s.x+=s.vx;s.y+=s.vy;x.fillStyle=`rgba(255,220,120,${s.l})`;x.beginPath();x.arc(s.x,s.y,2,0,7);x.fill()});
    // Zutaten
    it.forEach(o=>{if(o.used)return;const im=II(o.id),z=o===drag?84:72;if(o.id=='glut'){x.save();x.globalCompositeOperation='lighter';x.globalAlpha=.4+.2*Math.sin(T*4);const g=x.createRadialGradient(o.x,o.y,4,o.x,o.y,50);g.addColorStop(0,'#ffb040');g.addColorStop(1,'rgba(255,100,0,0)');x.fillStyle=g;x.fillRect(o.x-50,o.y-50,100,100);x.restore()}
      if(im.complete)x.drawImage(im,o.x-z/2,o.y-z/2,z,z);if(!drag&&ORDER[step]===o.id){x.strokeStyle=`rgba(255,210,90,${.5+.4*Math.sin(T*5)})`;x.lineWidth=3;x.beginPath();x.arc(o.x,o.y,42,0,7);x.stroke()}});
    x.fillStyle='rgba(10,6,2,.82)';x.fillRect(0,0,800,56);x.fillStyle='#ffd25a';x.font='bold 18px Georgia';x.textAlign='center';x.fillText(msg,400,35);
    x.fillStyle='rgba(10,6,2,.7)';x.fillRect(700,470,100,30);x.fillStyle='#f6e8c4';x.font='bold 13px Georgia';x.fillText('Später',750,490);
    if(step==4&&drag&&drag.id=='glut'&&Math.hypot(drag.x-TIP[0],drag.y-TIP[1])<40){lit=Math.min(1,lit+.012);if(Math.random()<.5)spark.push({x:TIP[0],y:TIP[1],vx:(Math.random()-.5)*3,vy:-Math.random()*3,l:1});if(lit>=1)return end(1)}
    requestAnimationFrame(frame)}
  function down(){if(P.x>700&&P.y>470)return end(0);if(step==3&&inP(P)&&P.x<PAPER[0]+90){rollA=true;return}
    for(const o of it){if(!o.used&&Math.hypot(P.x-o.x,P.y-o.y)<36){drag=o;o.ox=o.x-P.x;o.oy=o.y-P.y;return}}}
  function move(){if(drag){drag.x=P.x+drag.ox;drag.y=P.y+drag.oy}if(rollA){roll=Math.max(roll,Math.min(1,(P.x-PAPER[0]-40)/(PAPER[2]-80)));if(roll>=1){rollA=false;step=4;msg='Jetzt anzünden: Halt die Glut an die Spitze links.'}}}
  function up(){rollA=false;if(!drag)return;const o=drag;drag=null;
    if(o.id=='glut'&&step==4){o.x=o.hx;o.y=o.hy;lit=0;return}
    const ok=ORDER[step]===o.id&&(o.id=='filter'?Math.hypot(o.x-FILT[0],o.y-FILT[1])<70:inP(o));
    if(ok){o.used=1;for(let i=0;i<14;i++)spark.push({x:o.x,y:o.y,vx:(Math.random()-.5)*4,vy:(Math.random()-.5)*4,l:1});step++;
      msg=['','Jetzt die Ur-Spore aufs Papier streuen.','Ein Tropfen von der Träne dazu.','Jetzt rollen: Von links nach rechts übers Papier ziehen.'][step]||msg}
    else{if(inP(o)||Math.hypot(o.x-FILT[0],o.y-FILT[1])<70)msg=TXT[step];o.x=o.hx;o.y=o.hy}}
  cv2.onmousedown=e=>{e.stopPropagation();pos(e.clientX,e.clientY);down()};cv2.onmousemove=e=>{pos(e.clientX,e.clientY);move()};const mu=()=>up();addEventListener('mouseup',mu);
  cv2.ontouchstart=e=>{e.preventDefault();pos(e.touches[0].clientX,e.touches[0].clientY);down()};cv2.ontouchmove=e=>{e.preventDefault();pos(e.touches[0].clientX,e.touches[0].clientY);move()};cv2.ontouchend=()=>up();cv2.onclick=e=>e.stopPropagation();
  const esc=e=>{if(e.key=='Escape')end(0)};addEventListener('keydown',esc);
  function end(win){if(fin)return;fin=true;cv2.remove();removeEventListener('keydown',esc);removeEventListener('mouseup',mu);
    if(win)craftWin();
    else say([['J2','Später? Das Märchen wartet nicht ewig, Bürschchen. … Na gut, es wartet doch. Es hat ja sonst nichts vor.']])}
  requestAnimationFrame(frame)}
function craftWin(){['filter','spore','traene','glut'].forEach(i=>{const k=inv.indexOf(i);if(k>=0)inv.splice(k,1)});inv.push('joint2');renderInv();finale()}
// wie die anderen Minispiele: nach 3 abgebrochenen Versuchen darf man überspringen
const craftGame=a3Mini('craft','Ausweg-Joint bauen',craftRun,()=>!!FL.ende,craftWin);

// ----- Finale: anzünden → Lichtblitz → zurück auf Wowas Sofa (Loop) → Abspann -----
function finale(){FL.ende=1;say([['J2','Fertig. Der schönste Ausweg-Joint, den ich je gesehen hab. Und ich hab viele gesehen.'],['J2','Zieh, Bürschchen. Und grüß mir die echte Welt.'],
  ['P','Na dann. Auf den Ausweg.'],['P','*zieht*']],async()=>{changing=true;const cv3=document.createElement('canvas');cv3.id='cut';cv3.width=W;cv3.height=H;cv3.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:15';$('#game').appendChild(cv3);
  const x=cv3.getContext('2d'),APT=aptPaint(),PI=PETIMG,wait=ms=>new Promise(r=>setTimeout(r,ms)),talk=l=>new Promise(r=>say(l,r));
  let st='flash',wf=0,dark=0,wx=860,door=0,fin=false;const cs=(f,...a)=>{try{typeof CS!='undefined'&&CS[f]&&CS[f](...a)}catch(e){}};
  const tween=(ms,f)=>new Promise(r=>{const a=performance.now();(function k(){const p=Math.min(1,(performance.now()-a)/ms);f(p);p<1?requestAnimationFrame(k):r()})()});
  function draw(){if(fin)return;const T=performance.now()/1000;x.setTransform(1,0,0,1,0,0);
    if(st=='flash'){x.drawImage(cv,0,0);x.fillStyle=`rgba(255,250,235,${wf})`;x.fillRect(0,0,W,H);const g=x.createRadialGradient(W/2,H/2,10,W/2,H/2,W*.7*wf+1);g.addColorStop(0,`rgba(255,255,255,${wf})`);g.addColorStop(1,'rgba(255,240,200,0)');x.fillStyle=g;x.fillRect(0,0,W,H)}
    if(st=='room'){x.drawImage(APT,0,0);x.setTransform(SC,0,0,SC,0,0);x.fillStyle='#120c08';x.fillRect(690,100,100,280);x.fillStyle='#6a4a2a';x.fillRect(690,100,100*(1-door*.85),280);x.strokeStyle='#2a1a0c';x.lineWidth=2;x.strokeRect(690,100,100*(1-door*.85),280);
      x.save();x.translate(560,300);x.rotate(-Math.PI/2);x.scale(.8,.8);if(PI.complete&&PI.naturalWidth){x.imageSmoothingEnabled=false;x.drawImage(PI,-48,-254,96,258);x.imageSmoothingEnabled=true}x.restore();
      for(let i=0;i<6;i++){const p=(T*.35+i/6)%1;dab(x,388+Math.sin(p*6+i)*12,292-p*120,6+p*20,[200,200,210],.25*(1-p))}
      if(wx<800&&WOWAIMG){x.imageSmoothingEnabled=false;x.drawImage(WOWAIMG,wx-52*.95,382-276*.95,104*.95,280*.95);x.imageSmoothingEnabled=true}
      x.setTransform(1,0,0,1,0,0);if(wf>0){x.fillStyle=`rgba(255,250,235,${wf})`;x.fillRect(0,0,W,H)}}
    if(dark>0){x.setTransform(1,0,0,1,0,0);x.fillStyle=`rgba(0,0,0,${dark})`;x.fillRect(0,0,W,H)}requestAnimationFrame(draw)}
  requestAnimationFrame(draw);cs('tripOn');await tween(2200,p=>wf=p*p);await wait(400);st='room';cs('roomOn');await tween(1800,p=>wf=1-p);
  await talk([['P','*hust* … *HUST*'],['P','Sofa. Samstag. Meine Wohnung.'],['P','Ich bin … zurück?']]);
  cs('hallSteps',5);await wait(1200);cs('doorBurst');await tween(200,p=>door=p);await wait(250);cs('steps',5);await tween(1500,p=>wx=860-260*p);
  await talk([['WO','Petja! Bruder! Rauchst du immer noch diesen Gartenabfall?'],['P','…'],['WO','Hör zu: Ich hab was Neues. Ganz neu. Ganz krass. Kräuter von Oma, Bruder!'],
    ['WO','Er sagt: Ein Zug, und du bist in einer anderen Welt. Märchenwelt!'],['P','Wowa.'],['WO','Ja?'],['P','Raus.'],['WO','Aber da sind so lustige blaue Pilze drin …'],['P','*starrt auf die Pilze*'],['P','… Na super.']]);
  await tween(1600,p=>dark=p);fin=true;cv3.remove();changing=false;abspann()})}
function abspann(){const cast=[['Petja','der Typ auf dem Sofa'],['Wowa','der Grund für alles'],['Baba Jaga','Hexe, Köchin, Lebensberaterin'],['Pilzmeister Knolle','Wissenschaft'],['Grobnik & Opa Schnobbel','Gnome, Wegezoll'],
  ['Kusmitsch','Fischer, Selbstbrenner'],['Oma Dusja','Gebiss, Teer, Zwiebel'],['Opa Grischa','Leiter, Säge, neues Haus'],['Madame Zinaida','Banja'],['Nastja','Star des Banja, weint nie'],['Vater Ignati','im Heu seit 1993'],['Schmied Fjodor','hat seine Weihe'],['Die Krähe','Krah'],['Der Kater vom Popen','spielte sich selbst']];
  const o=document.createElement('div');o.id='abspann';o.innerHTML=`<div class="roll"><h1>Petja</h1><h2>und der Verfluchte Birkenwald</h2><p class="end">Ende.</p><p class="end small">… oder?</p>
    <h3>Mitwirkende</h3>${cast.map(([a,b])=>`<div class="c"><b>${a}</b><span>${b}</span></div>`).join('')}
    <h3>Keine Pilze wurden verletzt</h3><p>Außer neun blauen. Und fünf goldenen.<br>Und einer Zwiebel.</p><h3>Danke fürs Spielen!</h3>
    <div class="btns"><button class="mb big" data-a="t">${ic('home')} Zum Titelbild</button><button class="mb" data-a="w">${ic('next')} Weiter umsehen</button></div></div>`;
  $('#game').appendChild(o);o.querySelector('[data-a=t]').onclick=()=>location.reload();o.querySelector('[data-a=w]').onclick=()=>{o.remove();enter('innen',[250,470])};try{autoSave()}catch(e){}}
