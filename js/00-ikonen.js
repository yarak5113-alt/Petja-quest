// ================= Gemalte Gegenstände & Symbole (realistisch gerendert) =================
// Jeder Gegenstand ist ein SVG mit echtem Material-Rendering: Oberflächenstruktur per Rauschen (Holzmaserung, gebürstetes Metall,
// Papier, Sackleinen, Haut) und 3D-Beleuchtung per Lichtfilter (Relief aus der Form, diffuses Licht + Glanzlicht von links oben),
// dazu weicher Kontaktschatten. ICON(id) liefert eine data:-URL, IMG(id,cls) ein fertiges <img>.
const ICONS=(()=>{
  // Material-Filter: tex=[Frequenz x, Frequenz y, Oktaven, Stärke], bl=Rundung (Weichheit des Reliefs), sc=Relieftiefe, ks/ex=Glanz
  const M=(id,{tex,bl=2,sc=4,kd=1.25,ks=.5,ex=18,el=42})=>`<filter id="${id}" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB">`+
    (tex?`<feTurbulence type="fractalNoise" baseFrequency="${tex[0]} ${tex[1]}" numOctaves="${tex[2]}" seed="7" result="n"/><feColorMatrix in="n" type="matrix" values="1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 0 1" result="g"/>`+
      `<feComposite in="SourceGraphic" in2="g" operator="arithmetic" k1="${2*tex[3]}" k2="${1-tex[3]}" result="t"/>`:'<feOffset in="SourceGraphic" result="t"/>')+
    `<feGaussianBlur in="SourceAlpha" stdDeviation="${bl}" result="b"/>`+
    `<feDiffuseLighting in="b" surfaceScale="${sc}" diffuseConstant="1" result="d"><feDistantLight azimuth="225" elevation="${el}"/></feDiffuseLighting>`+
    `<feSpecularLighting in="b" surfaceScale="${sc}" specularConstant="1" specularExponent="${ex}" result="s"><feDistantLight azimuth="225" elevation="${el+12}"/></feSpecularLighting>`+
    `<feComposite in="t" in2="d" operator="arithmetic" k1="${kd}" result="l"/><feComposite in="s" in2="SourceAlpha" operator="in" result="s2"/>`+
    `<feComposite in="l" in2="s2" operator="arithmetic" k2="1" k3="${ks}" result="o"/><feComposite in="o" in2="SourceAlpha" operator="in"/></filter>`;
  const DEFS=M('wd',{tex:[.025,.42,3,.42],bl:1.6,sc:3,ks:.22,ex:12})+M('bk',{tex:[.08,.5,4,.55],bl:1.4,sc:3.5,ks:.15,ex:10})+
    M('mt',{tex:[.9,.02,2,.12],bl:1.8,sc:5,kd:1.3,ks:1.1,ex:28,el:48})+M('pp',{tex:[.45,.45,4,.22],bl:1.2,sc:1.6,ks:.12,ex:8})+
    M('fb',{tex:[.7,.7,3,.38],bl:2,sc:3.5,ks:.1,ex:6})+M('sk',{tex:[.25,.25,3,.1],bl:2.6,sc:5,ks:.75,ex:24})+
    M('gl',{bl:2,sc:6,kd:1.05,ks:1.4,ex:40,el:55})+M('fl',{bl:1.2,sc:2,ks:.3,ex:14})+
    '<filter id="sh" x="-30%" y="-30%" width="160%" height="170%"><feGaussianBlur in="SourceAlpha" stdDeviation="1.6"/><feOffset dx="1.6" dy="2.8" result="o"/><feComponentTransfer><feFuncA type="linear" slope=".7"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
  const L=(id,...st)=>`<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">${st.map((c,i)=>`<stop offset="${(i/(st.length-1)).toFixed(2)}" stop-color="${c}"/>`).join('')}</linearGradient>`;
  const RG=(id,cx,cy,...st)=>`<radialGradient id="${id}" cx="${cx}" cy="${cy}" r=".8">${st.map((c,i)=>`<stop offset="${(i/(st.length-1)).toFixed(2)}" stop-color="${c}"/>`).join('')}</radialGradient>`;
  // Material-Gruppe; a = Drehung der Maserung (für schräg liegende Holzteile)
  const G=(f,body,a=0)=>a?`<g transform="rotate(${a} 32 32)" filter="url(#${f})"><g transform="rotate(${-a} 32 32)">${body}</g></g>`:`<g filter="url(#${f})">${body}</g>`;
  const S=(defs,body)=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs>${DEFS}${defs}</defs><g filter="url(#sh)" stroke="#140a04" stroke-opacity=".45" stroke-width=".6" stroke-linejoin="round" stroke-linecap="round">${body}</g></svg>`);
  const N='stroke="none"';
  return{
  kippe:S('',G('pp',`<path d="M12,40L42,25L47,33L17,48Z" fill="#ece4d0"/><path d="M14,41L42,27" stroke="#c8bca0" stroke-width=".5" fill="none"/>`)+
    G('fb',`<path d="M39,26.5L42,25L47,33L44,34.5Z" fill="#c8884a"/>`)+G('fl',`<path d="M12,40L17,48L14,47.6C10,46 9.6,42 12,40Z" fill="#2a1e18"/>`)+
    `<circle cx="12.6" cy="44" r="1.8" fill="#ff8a3a" ${N} opacity=".9"/><path d="M9,38C6,33 10,30 7,25M12,36C11,31 14,29 13,24" fill="none" stroke="#d8d4cc" stroke-opacity=".5" stroke-width="1.4"/>`),
  saege:S(L('b','#e8ecf0','#9aa4ae','#5e6874'),G('mt',`<path d="M10,30L44,18L48,30L14,42Z" fill="url(#b)"/><path d="M14,42${[...Array(17)].map((_,i)=>{const x=14+i*2,y=42-(x-14)*12/34;return i%2?'L'+x+','+(y+4.6).toFixed(1):'L'+x+','+(y-.6).toFixed(1)}).join('')}L48,30Z" fill="#6a7480" stroke-opacity=".8"/>`)+
    G('wd',`<path d="M42,16C50,12 58,16 58,24C58,32 52,36 48,34L44,22Z" fill="#9a5a26"/>`,-30)+`<ellipse cx="51" cy="24" rx="3.6" ry="4.4" fill="#1a0c04"/>`+
    G('mt',`<circle cx="45" cy="21" r="1.4" fill="#d8b860"/><circle cx="47" cy="30" r="1.4" fill="#d8b860"/>`)),
  apfel:S(RG('a','.32','.28','#ff8a6a','#d0201a','#6a0804')+L('l','#7ac040','#2a5a10'),
    G('sk',`<path d="M32,18C24,12 10,16 10,32C10,46 20,56 28,54C30,53 34,53 36,54C44,56 54,46 54,32C54,16 40,12 32,18Z" fill="url(#a)"/>`)+
    [[20,38],[26,46],[40,44],[44,30],[36,26],[18,28],[30,36],[46,40]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".6" fill="#ffd8a0" ${N} opacity=".55"/>`).join('')+
    `<path d="M30,20C32,24 34,24 34,20" fill="none" stroke="#4a0a04" stroke-opacity=".6" stroke-width="1.2"/>`+G('wd',`<path d="M31,19C31,14 33,10 36,7L38,8C35,11 34,14 33.6,19Z" fill="#5a3414"/>`)+
    G('fl',`<path d="M35,12C40,6 48,7 50,10C46,15 40,15 35,12Z" fill="url(#l)"/><path d="M36,12C41,11 45,10 49,10" fill="none" stroke="#2a5010" stroke-width=".6"/>`)),
  stock:S('',G('bk',`<path d="M10,54L50,10L54,13L14,57Z" fill="#8a5a2c"/><path d="M36,26C40,24 44,26 46,30L44,31C42,28 40,27 37,28Z" fill="#7a4a20"/>`,-48)+
    G('fl',`<path d="M45,29C50,27 55,31 54,35C49,36 45,33 45,29Z" fill="#5a9a2a"/>`)+G('wd',`<ellipse cx="52" cy="11.5" rx="2.6" ry="1.8" fill="#e0c088" transform="rotate(-48 52 11.5)"/>`)),
  seil:S('',G('fb',`<ellipse cx="32" cy="34" rx="22" ry="16" fill="none" stroke="#c8a466" stroke-opacity="1" stroke-width="7"/><ellipse cx="32" cy="34" rx="14" ry="9" fill="none" stroke="#b8945a" stroke-opacity="1" stroke-width="6"/><path d="M50,24C56,18 58,12 54,8" fill="none" stroke="#c8a466" stroke-opacity="1" stroke-width="5"/>`)+
    `<g fill="none" stroke="#6a4a1e" stroke-opacity=".7" stroke-width=".8">${[0,30,60,90,120,150,180,210,240,270,300,330].map(a=>{const r=a*Math.PI/180,x=32+Math.cos(r)*22,y=34+Math.sin(r)*16;return`<path d="M${(x-2).toFixed(1)},${(y-2.4).toFixed(1)}l3,4.6"/>`}).join('')}</g>`),
  angel:S(L('m','#f0f2f4','#6a7480'),G('wd',`<path d="M8,56L50,8L53,10L11,58Z" fill="#a8743a"/><path d="M8,56L20,42L23,44L11,58Z" fill="#5a3418"/>`,-49)+G('mt',`<circle cx="18" cy="46" r="5.4" fill="url(#m)"/><circle cx="18" cy="46" r="1.6" fill="#2a2e34"/>`)+
    `<path d="M51,9C56,20 56,34 52,44" fill="none" stroke="#f4f4f4" stroke-opacity=".9" stroke-width=".7"/>`+G('mt',`<path d="M52,44C52,50 46,50 46,46" fill="none" stroke="#c8ccd0" stroke-opacity="1" stroke-width="1.8"/>`)),
  pilze:S(RG('c','.35','.3','#98c0ff','#3460c0','#14205a'),[[16,40,1],[34,46,.9],[46,32,1.1]].map(([x,y,k])=>`<g transform="translate(${x},${y}) scale(${k})">${G('sk',`<path d="M-3,0L-2.6,-10L2.6,-10L3,0Z" fill="#e8e0d0"/>`)}${G('sk',`<path d="M-10,-9C-10,-18 10,-18 10,-9C4,-7 -4,-7 -10,-9Z" fill="url(#c)"/>`)}<path d="M-8,-8.6C-4,-7.6 4,-7.6 8,-8.6" fill="none" stroke="#c8d0e8" stroke-opacity=".6" stroke-width=".5"/></g>`).join('')),
  karte:S(L('p','#f2e0b0','#d0ac6c','#9a6c34'),G('pp',`<path d="M8,14L22,10L34,14L48,10L56,14L54,50L46,52L40,48L32,52L22,48L12,52L10,44L6,40Z" fill="url(#p)"/>`)+
    `<path d="M22,10L22,48M34,14L32,52M48,10L46,52" fill="none" stroke="#7a5228" stroke-opacity=".5" stroke-width="1"/><path d="M12,40C18,34 22,38 28,30C32,26 38,30 42,22" fill="none" stroke="#6a2410" stroke-opacity=".85" stroke-width="1.2" stroke-dasharray="2 2.4"/>`+
    `<path d="M42,18L48,24M48,18L42,24" stroke="#9a1408" stroke-opacity=".9" stroke-width="1.8"/>`+G('fl',`<path d="M6,40L10,44L12,52L16,50L12,46Z" fill="#1e140c"/><path d="M56,14L54,22L52,18Z" fill="#2a1a10"/>`)+
    `<path d="M10,44L14,47L12,46Z" fill="#ff8a3a" ${N} opacity=".6"/>`),
  liste:S(L('p','#fbf6ea','#e0d4b8','#bca878'),G('pp',`<path d="M14,8L46,8L50,12L50,56L14,56Z" fill="url(#p)"/><path d="M46,8L46,12L50,12Z" fill="#cdbb90"/>`)+
    [18,24,30,36,42,48].map((y,i)=>`<path d="M19,${y}L${i%2?36:44},${y}" stroke="#3a2a1a" stroke-opacity=".55" stroke-width=".9"/>${i<3?`<path d="M19,${y-2}l1.2,1.2l2.2,-2.6" stroke="#a81408" stroke-opacity=".9" stroke-width="1" fill="none"/>`:''}`).join('')+
    G('fb',`<path d="M40,52C44,46 52,40 58,36L56,34C50,38 42,44 38,50Z" fill="#f4f0e6"/>`)+`<path d="M38,50L36,54L40,52Z" fill="#1a1a1a"/>`),
  gutschein:S(L('g','#fff0a8','#e0b040','#9a6a18'),G('pp',`<path d="M6,20L58,20L58,28C55,28 55,36 58,36L58,44L6,44L6,36C9,36 9,28 6,28Z" fill="url(#g)"/>`)+`<path d="M42,21L42,43" stroke-dasharray="2 2" stroke-width=".8"/>`+
    G('fl',`<path d="M24,25L26,30L31,30L27,33L28.5,38L24,35L19.5,38L21,33L17,30L22,30Z" fill="#c0201a"/><circle cx="50" cy="32" r="3.2" fill="#c0201a"/>`)+`<path d="M9,40L39,40" stroke="#7a4a10" stroke-opacity=".5" stroke-width=".7"/>`),
  mehl:S('',[[14,34],[34,30],[24,44]].map(([x,y])=>`<g transform="translate(${x},${y})">${G('fb',`<path d="M-10,12C-12,4 -10,-6 -6,-10L-3,-14L3,-14L6,-10C10,-6 12,4 10,12Z" fill="#d8bf8c"/><path d="M-3,-14C-4,-17 4,-17 3,-14Z" fill="#c8ac78"/>`)}${G('fb',`<path d="M-5,-12L5,-12L5,-10L-5,-10Z" fill="#6a3a14"/>`)}<path d="M-6,2C-2,4 2,4 6,2M-8,-2C-4,0 4,0 8,-2" fill="none" stroke="#7a5a2a" stroke-opacity=".5" stroke-width=".7"/><text x="0" y="8" text-anchor="middle" font-family="Georgia" font-size="7" font-weight="bold" fill="#6a1a08" fill-opacity=".75" ${N}>M</text></g>`).join('')),
  laterne:S(RG('lg','.5','.6','#f4ffc0','#7cff50','#1a7a20'),`<path d="M26,8C26,3 38,3 38,8" fill="none" stroke="#3a3020" stroke-opacity="1" stroke-width="2"/>`+G('gl',`<path d="M20,14L44,14L44,48L20,48Z" fill="url(#lg)" fill-opacity=".9"/>`)+
    `<path d="M32,40C26,36 28,30 32,23C36,30 38,36 32,40Z" fill="#f4ffd0" ${N} opacity=".95"/>`+G('mt',`<path d="M22,14L42,14L40,10L24,10Z" fill="#c8902e"/><path d="M19,14L21,14L21,48L19,48ZM43,14L45,14L45,48L43,48ZM31,14L33,14L33,48L31,48Z" fill="#b8822a"/><path d="M17,48L47,48L49,54L15,54Z" fill="#c8902e"/>`)),
  wuermer:S(L('w','#ffb4a8','#d06a6a','#7a3030'),[`M8,44C14,36 22,48 28,40C32,34 38,40 40,36`,`M24,24C30,18 36,28 44,22C48,19 52,24 56,22`,`M14,30C18,26 22,32 26,28`].map(d=>G('sk',`<path d="${d}" fill="none" stroke="url(#w)" stroke-opacity="1" stroke-width="5.4"/>`)+`<path d="${d}" fill="none" stroke="#7a2a2a" stroke-opacity=".35" stroke-width="5.4" stroke-dasharray=".6 2.2"/>`).join('')),
  schnaps:S(L('c','#c89a60','#6a4420'),G('gl',`<path d="M28,6L36,6L36,18C44,22 46,28 46,34L46,54C46,57 44,58 42,58L22,58C20,58 18,57 18,54L18,34C18,28 20,22 28,18Z" fill="#a8c4b4" fill-opacity=".85"/>`)+
    `<path d="M19,36L45,36L45,54C45,56 44,57 42,57L22,57C20,57 19,56 19,54Z" fill="#e8f0d8" fill-opacity=".45" ${N}/>`+G('pp',`<path d="M22,40L42,40L42,50L22,50Z" fill="#efe2c0"/>`)+`<text x="32" y="48" text-anchor="middle" font-family="Georgia" font-size="7.5" font-weight="bold" fill="#8a1a10" ${N}>XXX</text>`+
    G('wd',`<path d="M27,2L37,2L37,8L27,8Z" fill="url(#c)"/>`,90)+`<path d="M22,26C21,32 21,44 22,52" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="1.6"/>`),
  leiter:S('',G('wd',`<path d="M12,58L28,6L32,7L16,59Z" fill="#9a6432"/><path d="M34,59L48,6L52,7L38,60Z" fill="#9a6432"/>`,-74)+
    G('wd',[14,24,34,44,52].map(y=>`<path d="M${28-(y-6)*.31},${y}L${49-(y-6)*.28},${y}L${48.5-(y-6)*.28},${y+3}L${27.5-(y-6)*.31},${y+3}Z" fill="#b07a44"/>`).join(''))+
    G('fl',`<path d="M12,58L15,48L18,52L16,59Z" fill="#1e140c"/><path d="M34,59L36,53L39,55L38,60Z" fill="#2a1a10"/>`)),
  fisch:S(L('f','#eef4f6','#8aa0ae','#34485a'),G('sk',`<path d="M8,32C16,20 36,18 46,30L56,22L54,32L56,42L46,34C36,46 16,44 8,32Z" fill="url(#f)"/>`)+
    `<g fill="none" stroke="#2a3a4a" stroke-opacity=".35" stroke-width=".6">${[20,25,30,35,40].flatMap(x=>[27,31,35].map(y=>`<path d="M${x},${y}c1.6,-1.6 3.2,-1.6 4,0"/>`)).join('')}</g>`+
    `<path d="M30,24C32,28 32,36 30,40" fill="none" stroke-opacity=".6" stroke-width=".8"/>`+G('gl',`<circle cx="15" cy="30" r="2.6" fill="#e8e4d0"/><circle cx="15.4" cy="30" r="1.3" fill="#0a0a0a"/>`)+
    G('fl',`<path d="M24,22L30,15L35,22Z" fill="#6a8090"/><path d="M48,30L56,22L54,32L56,42L48,34Z" fill="#7a90a0"/>`)),
  gebiss:S(L('g','#ffa8a8','#d86070','#7a2030'),G('sk',`<path d="M8,30C8,16 56,16 56,30C56,36 50,38 44,36L20,36C14,38 8,36 8,30Z" fill="url(#g)"/><path d="M8,36C8,50 56,50 56,36C50,32 14,32 8,36Z" fill="url(#g)"/>`)+
    G('gl',[14,20,26,32,38,44,50].map(x=>`<path d="M${x-2.8},30L${x+2.8},30L${x+2.4},36L${x-2.4},36Z" fill="#f6f0e0"/><path d="M${x-2.8},37L${x+2.8},37L${x+2.4},42L${x-2.4},42Z" fill="#ece2cc"/>`).join(''))),
  brett:S('',G('wd',`<path d="M6,40L50,14L58,24L14,50Z" fill="#c08a52"/>`,-30)+`<ellipse cx="32" cy="32" rx="2.6" ry="1.6" fill="#6a3a18" opacity=".8" transform="rotate(-30 32 32)"/>`+
    G('fl',`<path d="M50,14L58,24L54,26L48,18Z" fill="#1a120a"/>`)+G('mt',`<circle cx="20" cy="40" r="1.2" fill="#5a5a5a"/><circle cx="40" cy="28" r="1.2" fill="#5a5a5a"/>`)),
  teer:S(RG('t','.4','.35','#6a6a6a','#0a0a0a'),G('wd',`<path d="M14,22L50,22L46,56L18,56Z" fill="#8a5a2c"/>`,90)+G('mt',`<path d="M15,28L49,28L48.6,32L15.4,32ZM16.8,44L47.2,44L46.9,48L17.1,48Z" fill="#3a3a3a"/>`)+
    G('gl',`<ellipse cx="32" cy="22" rx="18" ry="5" fill="url(#t)"/><path d="M24,20C26,26 28,28 27,32" fill="none" stroke="#0a0a0a" stroke-opacity="1" stroke-width="3"/>`)+G('mt',`<path d="M18,22C18,8 46,8 46,22" fill="none" stroke="#4a4a4a" stroke-opacity="1" stroke-width="1.8"/>`)),
  _:S(RG('q','.4','.35','#f0e0b0','#8a6a3a'),G('mt',`<circle cx="32" cy="32" r="20" fill="url(#q)"/>`)+`<text x="32" y="41" text-anchor="middle" font-family="Georgia" font-size="26" font-weight="bold" fill="#3a2410" ${N}>?</text>`)}})();
// HUD-Symbole: in Messing geprägte Gravur (dunkle Vertiefung mit heller Unterkante)
const HUDICONS=(()=>{const G='#2a1806',W='#fff3c8';
  const S=b=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g fill="none" stroke="${W}" stroke-opacity=".6" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" transform="translate(.5,.9)">${b}</g><g fill="none" stroke="${G}" stroke-opacity=".9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${b}</g></svg>`);
  return{
  tipp:S('<path d="M16,4C10,4 7,9 8,14C9,18 12,19 12,23L20,23C20,19 23,18 24,14C25,9 22,4 16,4Z"/><path d="M12.5,26.5L19.5,26.5M14,29.5L18,29.5"/><path d="M16,23L16,16M13.5,14.5L16,16L18.5,14.5"/>'),
  spot:S('<path d="M3,16C8,8 24,8 29,16C24,24 8,24 3,16Z"/><circle cx="16" cy="16" r="4.5"/><circle cx="16" cy="16" r="1" fill="#2a1806"/>'),
  tasche:S('<path d="M8,12C6,18 6,26 9,29L23,29C26,26 26,18 24,12Z"/><path d="M10,12L22,12M12,12C12,6 20,6 20,12"/><path d="M12,19L20,19"/>'),
  auftrag:S('<path d="M9,5L25,5C27,5 27,9 25,9L25,25C25,28 22,28 22,28L7,28C4,28 4,24 7,24L9,24Z"/><path d="M12,12L21,12M12,16L21,16M12,20L18,20"/>'),
  karte:S('<path d="M4,8L11,5L21,8L28,5L28,24L21,27L11,24L4,27Z"/><path d="M11,5L11,24M21,8L21,27"/><path d="M14,15L18,19M18,15L14,19"/>'),
  menu:S('<path d="M6,9L26,9M6,16L26,16M6,23L26,23"/><circle cx="6" cy="9" r=".6"/><circle cx="6" cy="16" r=".6"/><circle cx="6" cy="23" r=".6"/>')}})();
const ICON=id=>ICONS[id]||ICONS._;
const IMG=(id,cls='ico')=>`<img class="${cls}" src="${ICON(id)}" alt="" draggable="false">`;
// Realistischer Pfeil: roter Lack mit gewölbtem Goldrand, Glanzlicht und Schatten. ARROW(px,grad) -> data-URL (Richtung in Grad, 0 = nach rechts)
const ARROW=(px=64,deg=0)=>{const bev=(id,bl,sc,ks,ex)=>`<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB"><feGaussianBlur in="SourceAlpha" stdDeviation="${bl}" result="b"/>`+
    `<feDiffuseLighting in="b" surfaceScale="${sc}" diffuseConstant="1" result="d"><feDistantLight azimuth="225" elevation="42"/></feDiffuseLighting><feSpecularLighting in="b" surfaceScale="${sc}" specularConstant="1.2" specularExponent="${ex}" result="s"><feDistantLight azimuth="225" elevation="55"/></feSpecularLighting>`+
    `<feComposite in="SourceGraphic" in2="d" operator="arithmetic" k1="1.3" result="l"/><feComposite in="s" in2="SourceAlpha" operator="in" result="s2"/><feComposite in="l" in2="s2" operator="arithmetic" k2="1" k3="${ks}" result="o"/><feComposite in="o" in2="SourceAlpha" operator="in"/></filter>`;
  const P='M5,23H33V8L60,32L33,56V41H5Z',Pi='M10,27.5H37.5V18L53,32L37.5,46V36.5H10Z';
  return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 64 64"><defs>`+
    `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0b0"/><stop offset=".45" stop-color="#d09a3a"/><stop offset="1" stop-color="#8a5a18"/></linearGradient>`+
    `<linearGradient id="r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff7a5a"/><stop offset=".5" stop-color="#c8200e"/><stop offset="1" stop-color="#6a0804"/></linearGradient>`+
    bev('a',2,4,.9,24)+bev('c',1.6,3,1.3,36)+`<filter id="sh" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="1.6" dy="2.4" stdDeviation="1.3" flood-opacity=".7"/></filter></defs>`+
    `<g transform="rotate(${deg} 32 32)" filter="url(#sh)"><path d="${P}" fill="url(#g)" filter="url(#a)" stroke="#2a1404" stroke-width="1.2" stroke-linejoin="round"/>`+
    `<path d="${Pi}" fill="url(#r)" filter="url(#c)" stroke="#3a0802" stroke-width=".8" stroke-linejoin="round"/>`+
    `<path d="M12,29.5H38.5V22.5L47,30" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.4" stroke-linecap="round"/></g></svg>`)};
const ARR=(cls='arr')=>`<img class="${cls}" src="${ARROW(64)}" alt="" draggable="false">`;
// Ausgangs-Mauszeiger: derselbe Pfeil (32 px, Hotspot in der Mitte)
document.head.insertAdjacentHTML('beforeend',`<style>.interactive.exit{cursor:url("${ARROW(32)}") 16 16,pointer}</style>`);
// Pfeil auch als „weiter“-Zeichen in der Dialogbox (nach unten)
document.head.insertAdjacentHTML('beforeend',`<style>#box.done::after{content:'';border:none;width:20px;height:20px;right:10px;bottom:4px;filter:none;background:url("${ARROW(40,90)}") center/contain no-repeat}</style>`);
// ===== Eigene Mauszeiger (im ganzen Spiel) =====
// Normal: klassischer Mauspfeil aus gewölbtem Gold; Klick: zeigende Hand im weißen Handschuh mit Goldmanschette; Ausgänge: roter Lackpfeil (oben)
const CURSORS=(()=>{const bev=(id,bl,sc,ks,ex,k1=1.3)=>`<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB"><feGaussianBlur in="SourceAlpha" stdDeviation="${bl}" result="b"/>`+
    `<feDiffuseLighting in="b" surfaceScale="${sc}" diffuseConstant="1" result="d"><feDistantLight azimuth="225" elevation="45"/></feDiffuseLighting><feSpecularLighting in="b" surfaceScale="${sc}" specularConstant="1.1" specularExponent="${ex}" result="s"><feDistantLight azimuth="225" elevation="58"/></feSpecularLighting>`+
    `<feComposite in="SourceGraphic" in2="d" operator="arithmetic" k1="${k1}" result="l"/><feComposite in="s" in2="SourceAlpha" operator="in" result="s2"/><feComposite in="l" in2="s2" operator="arithmetic" k2="1" k3="${ks}" result="o"/><feComposite in="o" in2="SourceAlpha" operator="in"/></filter>`;
  const SH='<filter id="sh" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="1.4" dy="2" stdDeviation="1.1" flood-opacity=".65"/></filter>';
  const GD='<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff4c0"/><stop offset=".45" stop-color="#e0aa48"/><stop offset="1" stop-color="#8a5a18"/></linearGradient>';
  const U=s=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s);
  const arrow=U(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 64 64"><defs>${GD}${SH}${bev('a',1.6,3.2,1,26)}</defs><g filter="url(#sh)">`+
    `<path d="M4,3L4,48L15,38L23,57L32,53L24,35L39,35Z" fill="url(#g)" filter="url(#a)" stroke="#1e1004" stroke-width="2.2" stroke-linejoin="round"/>`+
    `<path d="M8,11L8,38" stroke="#fff" stroke-opacity=".6" stroke-width="1.6" stroke-linecap="round"/></g></svg>`);
  // Klick-Zeiger: das vom Spieler vorgegebene Hand-Design (assets/zeiger-hand.png, 24x40, Fingerspitze bei 11,1)
  const hand='assets/zeiger-hand.png';
  return{arrow,hand}})();
document.head.insertAdjacentHTML('beforeend',`<style>
*{cursor:url("${CURSORS.arrow}") 2 1,default !important}
${(()=>{const L=['button','a','summary','label','select','input[type=range]','input[type=checkbox]','.interactive','.slot','.card','.tab','.x','.mb','.slotc','#box','#newsCard','[onclick]'];
  // auch alle Innenteile (Klickfläche, Figurenbild, Symbol im Knopf), sonst würde die Grundregel „*“ sie wieder zum Pfeil machen
  return L.join(',')+','+L.map(s=>s+' *').join(',')})()}{cursor:url("${CURSORS.hand}") 11 1,pointer !important}
button:disabled,button:disabled *,.mb:disabled,.slotc:disabled{cursor:url("${CURSORS.arrow}") 2 1,default !important}
.interactive.exit,.interactive.exit *{cursor:url("${ARROW(32)}") 16 16,pointer !important}</style>`);
