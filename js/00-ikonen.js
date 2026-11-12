// ================= Gemalte Gegenstände & Symbole =================
// Jeder Gegenstand ist ein kleines, plastisch gemaltes SVG-Bild (Verläufe, Glanzlicht, dunkle Kontur, Schlagschatten) –
// passend zur geschnitzten Holz-/Messing-Oberfläche. ICON(id) liefert eine data:-URL, IMG(id,cls) ein fertiges <img>.
// HUD-Symbole (Leiste) sind als „Gravur“ in dunklem Braun gezeichnet, weil sie auf Messingplatten sitzen.
const ICONS=(()=>{
  const O='#1e1208';
  const L=(id,...st)=>`<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">${st.map((c,i)=>`<stop offset="${(i/(st.length-1)).toFixed(2)}" stop-color="${c}"/>`).join('')}</linearGradient>`;
  const LH=(id,...st)=>`<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0">${st.map((c,i)=>`<stop offset="${(i/(st.length-1)).toFixed(2)}" stop-color="${c}"/>`).join('')}</linearGradient>`;
  const RG=(id,cx,cy,...st)=>`<radialGradient id="${id}" cx="${cx}" cy="${cy}" r=".75">${st.map((c,i)=>`<stop offset="${(i/(st.length-1)).toFixed(2)}" stop-color="${c}"/>`).join('')}</radialGradient>`;
  const SH='<filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="1.2" dy="2.2" stdDeviation="1.1" flood-color="#000" flood-opacity=".65"/></filter>';
  const S=(defs,body)=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs>${SH}${defs}</defs><g filter="url(#sh)" stroke="${O}" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round">${body}</g></svg>`);
  const hi=(d,a=.55)=>`<path d="${d}" fill="none" stroke="#fff" stroke-opacity="${a}" stroke-width="1.4"/>`;
  return{
  kippe:S(LH('p','#cfc4a8','#fffaf0','#b8ac90')+L('f','#e8a85a','#a8662a'),
    `<path d="M12,40L44,24L48,32L16,48Z" fill="url(#p)"/><path d="M40,26L44,24L48,32L44,34Z" fill="url(#f)"/><path d="M12,40L16,48L13,47C10,46 9,42 12,40Z" fill="#3a2a20"/>`+
    `<circle cx="12" cy="44" r="2" fill="#ff7a2a" stroke="none"/><path d="M8,38C5,33 9,30 6,25M11,36C10,31 13,29 12,24" fill="none" stroke="#c8c4bc" stroke-opacity=".6" stroke-width="1.2"/>`+hi('M18,40L40,29',.4)),
  saege:S(L('b','#f4f6f8','#a8b0b8','#5a6470')+L('h','#b8743a','#6a3a14'),
    `<path d="M10,30L44,18L48,30L14,42Z" fill="url(#b)"/><path d="M14,42L16,38L18,41L20,37L22,40L24,36L26,39L28,35L30,38L32,34L34,37L36,33L38,36L40,32L42,35L44,31L46,34L48,30" fill="none" stroke-width="1.1"/>`+
    `<path d="M42,16C50,12 58,16 58,24C58,32 52,36 48,34L44,22Z" fill="url(#h)"/><ellipse cx="51" cy="24" rx="3.6" ry="4.4" fill="#2a1408"/><circle cx="45" cy="21" r="1.2" fill="#d8c070"/><circle cx="47" cy="30" r="1.2" fill="#d8c070"/>`+hi('M13,31L42,21')),
  apfel:S(RG('a','.35','.3','#ff9a7a','#d8261a','#7a0a06')+L('l','#8ad048','#2e6a14'),
    `<path d="M32,18C24,12 10,16 10,32C10,46 20,56 28,54C30,53 34,53 36,54C44,56 54,46 54,32C54,16 40,12 32,18Z" fill="url(#a)"/>`+
    `<path d="M32,19C32,14 33,10 36,7" fill="none" stroke="#4a2a10" stroke-width="2.4"/><path d="M35,12C40,6 48,7 50,10C46,15 40,15 35,12Z" fill="url(#l)"/>`+
    `<ellipse cx="21" cy="27" rx="4" ry="6" fill="#fff" fill-opacity=".45" stroke="none" transform="rotate(-25 21 27)"/>`),
  stock:S(LH('w','#8a5a2a','#c89058','#5a3414'),
    `<path d="M10,54L50,10L54,13L14,57Z" fill="url(#w)"/><path d="M36,26C40,24 44,26 46,30" fill="none" stroke="#5a3414" stroke-width="2.4"/><path d="M45,29C50,27 55,31 54,35C49,36 45,33 45,29Z" fill="#5aa030"/>`+
    `<path d="M20,46L24,42M30,36L33,33M42,22L45,19" stroke="#3a2008" stroke-width="1"/><ellipse cx="52" cy="11.5" rx="2.4" ry="1.6" fill="#e8c890" transform="rotate(-48 52 11.5)"/>`),
  seil:S(L('r','#f0d8a0','#b08848','#6a4a1e'),
    `<ellipse cx="32" cy="34" rx="22" ry="16" fill="none" stroke="url(#r)" stroke-width="7"/><ellipse cx="32" cy="34" rx="22" ry="16" fill="none" stroke="${O}" stroke-width="1" stroke-dasharray="3 3"/>`+
    `<ellipse cx="32" cy="34" rx="14" ry="9" fill="none" stroke="url(#r)" stroke-width="6"/><path d="M50,24C56,18 58,12 54,8" fill="none" stroke="url(#r)" stroke-width="5"/><path d="M50,24C56,18 58,12 54,8" fill="none" stroke-width="1"/>`),
  angel:S(LH('w','#8a5a2a','#d8a060','#5a3414')+L('m','#e0e4e8','#6a7480'),
    `<path d="M8,56L50,8L53,10L11,58Z" fill="url(#w)"/><circle cx="18" cy="46" r="5" fill="url(#m)"/><circle cx="18" cy="46" r="1.6" fill="${O}"/>`+
    `<path d="M51,9C56,20 56,34 52,44" fill="none" stroke="#f0f0f0" stroke-width=".9"/><path d="M52,44C52,50 46,50 46,46" fill="none" stroke="#c8ccd0" stroke-width="1.8"/><path d="M46,46L47.5,43.5" stroke="#c8ccd0" stroke-width="1.6"/>`),
  pilze:S(RG('c','.35','.3','#a0c8ff','#3a64c8','#1a2a6a')+LH('s','#d8d0c0','#fffaf0','#b8b0a0'),
    [[16,40,1],[34,46,.9],[46,32,1.1]].map(([x,y,k])=>`<g transform="translate(${x},${y}) scale(${k})"><path d="M-3,0L-2.6,-10L2.6,-10L3,0Z" fill="url(#s)"/><path d="M-10,-9C-10,-18 10,-18 10,-9C4,-7 -4,-7 -10,-9Z" fill="url(#c)"/><ellipse cx="-3" cy="-13" rx="2.4" ry="1.4" fill="#fff" fill-opacity=".5" stroke="none"/></g>`).join('')),
  karte:S(L('p','#f6e6b8','#d8b878','#a87c40'),
    `<path d="M8,14L22,10L34,14L48,10L56,14L54,50L46,52L40,48L32,52L22,48L12,52L10,44L6,40Z" fill="url(#p)"/><path d="M22,10L22,48M34,14L32,52M48,10L46,52" fill="none" stroke="#8a6030" stroke-opacity=".6" stroke-width="1"/>`+
    `<path d="M12,40C18,34 22,38 28,30C32,26 38,30 42,22" fill="none" stroke="#7a2a10" stroke-width="1.4" stroke-dasharray="2 2.4"/><path d="M42,18L48,24M48,18L42,24" stroke="#b81a10" stroke-width="2"/>`+
    `<path d="M6,40L10,44L12,52L16,50L12,46Z" fill="#2a1a10"/><path d="M56,14L54,22L52,18Z" fill="#3a2414"/>`),
  liste:S(L('p','#fffaf0','#e8dcc0','#c0ac80'),
    `<path d="M14,8L46,8L50,12L50,56L14,56Z" fill="url(#p)"/><path d="M46,8L46,12L50,12" fill="#d8c8a0"/>`+
    [18,24,30,36,42,48].map((y,i)=>`<path d="M19,${y}L${i%2?36:44},${y}" stroke="#4a3a2a" stroke-width="1" stroke-opacity=".7"/><path d="M19,${y-2}l1.2,1.2l2.2,-2.6" stroke="${i<3?'#b81a10':'none'}" stroke-width="1.1" fill="none"/>`).join('')+
    `<path d="M40,52C44,46 52,40 58,36L56,34C50,38 42,44 38,50Z" fill="#e8e0d0"/><path d="M38,50L36,54L40,52Z" fill="${O}"/>`),
  gutschein:S(L('g','#fff0a8','#e8b840','#a8741a'),
    `<path d="M6,20L58,20L58,28C55,28 55,36 58,36L58,44L6,44L6,36C9,36 9,28 6,28Z" fill="url(#g)"/><path d="M42,20L42,44" stroke-dasharray="2 2" stroke-width="1"/>`+
    `<path d="M24,25L26,30L31,30L27,33L28.5,38L24,35L19.5,38L21,33L17,30L22,30Z" fill="#c8261a" stroke-width="1"/><circle cx="50" cy="32" r="3.2" fill="#c8261a" stroke-width="1"/>`+hi('M8,22L40,22',.6)),
  mehl:S(L('s','#f0e0b8','#c8a870','#7a5a30'),
    [[14,34],[34,30],[24,44]].map(([x,y])=>`<g transform="translate(${x},${y})"><path d="M-10,12C-12,4 -10,-6 -6,-10L-3,-14L3,-14L6,-10C10,-6 12,4 10,12Z" fill="url(#s)"/><path d="M-4,-12L4,-12" stroke="#7a4a1a" stroke-width="2.4"/><path d="M-6,2C-2,4 2,4 6,2" fill="none" stroke="#8a6a3a" stroke-width=".9"/><text x="0" y="8" text-anchor="middle" font-family="Georgia" font-size="7" font-weight="bold" fill="#7a2a10" stroke="none">M</text></g>`).join('')),
  laterne:S(L('b','#ffe08a','#c8902e','#6a4210')+RG('fl','.5','.6','#f0ffb0','#7aff4a','#1a8a20'),
    `<path d="M26,8C26,4 38,4 38,8" fill="none" stroke-width="2.4"/><path d="M22,14L42,14L40,10L24,10Z" fill="url(#b)"/><path d="M20,14L44,14L44,48L20,48Z" fill="url(#fl)" fill-opacity=".85"/>`+
    `<path d="M32,40C26,36 28,30 32,24C36,30 38,36 32,40Z" fill="#eaffc0" stroke="none" opacity=".9"/><path d="M20,14L20,48M44,14L44,48M32,14L32,48" stroke="url(#b)" stroke-width="2.4"/><path d="M20,14L20,48M44,14L44,48" fill="none"/>`+
    `<path d="M18,48L46,48L48,54L16,54Z" fill="url(#b)"/>`+hi('M22,18L22,44',.5)),
  wuermer:S(L('w','#ffb0a8','#d86a6a','#8a3a3a'),
    [`M8,44C14,36 22,48 28,40C32,34 38,40 40,36`,`M24,24C30,18 36,28 44,22C48,19 52,24 56,22`,`M14,30C18,26 22,32 26,28`].map(d=>`<path d="${d}" fill="none" stroke="${O}" stroke-width="7.6"/><path d="${d}" fill="none" stroke="url(#w)" stroke-width="5.4"/><path d="${d}" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.2" transform="translate(0,-1.2)"/>`).join('')),
  schnaps:S(LH('g','#9ab8a8','#e8fff4','#6a8a7a')+L('c','#c89a60','#7a5428'),
    `<path d="M28,6L36,6L36,18C44,22 46,28 46,34L46,54C46,57 44,58 42,58L22,58C20,58 18,57 18,54L18,34C18,28 20,22 28,18Z" fill="url(#g)" fill-opacity=".9"/>`+
    `<path d="M19,36L45,36L45,54C45,56 44,57 42,57L22,57C20,57 19,56 19,54Z" fill="#e8f0d8" fill-opacity=".75" stroke="none"/><path d="M27,2L37,2L37,8L27,8Z" fill="url(#c)"/>`+
    `<path d="M22,40L42,40L42,50L22,50Z" fill="#f4e8c8" stroke-width="1"/><text x="32" y="48" text-anchor="middle" font-family="Georgia" font-size="8" font-weight="bold" fill="#8a1a10" stroke="none">XXX</text>`+hi('M23,30L23,52',.7)),
  leiter:S(LH('w','#7a4a1e','#c08850','#5a3414'),
    `<path d="M12,58L28,6L32,7L16,59Z" fill="url(#w)"/><path d="M34,59L48,6L52,7L38,60Z" fill="url(#w)"/>`+
    [14,24,34,44,52].map(y=>`<path d="M${28-(y-6)*.31},${y}L${49-(y-6)*.28},${y}L${48.5-(y-6)*.28},${y+3}L${27.5-(y-6)*.31},${y+3}Z" fill="#a87440"/>`).join('')+
    `<path d="M12,58L15,48L18,52L16,59Z" fill="#2a1a10"/>`),
  fisch:S(L('f','#e8f0f4','#8aa0b0','#3a5060'),
    `<path d="M8,32C16,20 36,18 46,30L56,22L54,32L56,42L46,34C36,46 16,44 8,32Z" fill="url(#f)"/><path d="M30,24C32,28 32,36 30,40" fill="none" stroke-width="1"/>`+
    `<circle cx="15" cy="30" r="2.4" fill="#fff"/><circle cx="15.4" cy="30" r="1.2" fill="${O}"/><path d="M9,34C11,35 13,35 15,34" fill="none" stroke-width="1"/>`+
    `<path d="M24,22L30,16L34,22" fill="#7a90a0"/>`+[[22,32],[28,30],[34,32],[28,36],[38,30]].map(([x,y])=>`<path d="M${x},${y}c1.5,-1.5 3,-1.5 4,0" fill="none" stroke="#3a5060" stroke-width=".8"/>`).join('')+hi('M14,26C22,22 32,22 40,26',.6)),
  gebiss:S(L('g','#ffb0b0','#e06878','#8a2a3a'),
    `<path d="M8,30C8,16 56,16 56,30C56,36 50,38 44,36L20,36C14,38 8,36 8,30Z" fill="url(#g)"/><path d="M8,36C8,50 56,50 56,36C50,32 14,32 8,36Z" fill="url(#g)"/>`+
    [14,20,26,32,38,44,50].map(x=>`<path d="M${x-2.8},30L${x+2.8},30L${x+2.4},36L${x-2.4},36Z" fill="#fffaf0" stroke-width="1"/><path d="M${x-2.8},37L${x+2.8},37L${x+2.4},42L${x-2.4},42Z" fill="#f4ecdc" stroke-width="1"/>`).join('')+hi('M14,22C24,18 40,18 50,22',.6)),
  brett:S(L('w','#e0b078','#a87040','#6a4020'),
    `<path d="M6,40L50,14L58,24L14,50Z" fill="url(#w)"/><path d="M10,42C24,34 36,26 52,17M12,46C26,38 40,30 55,21" fill="none" stroke="#7a4a20" stroke-width=".9"/>`+
    `<ellipse cx="32" cy="32" rx="2.6" ry="1.6" fill="#7a4a20" transform="rotate(-30 32 32)"/><path d="M50,14L58,24L54,26L48,18Z" fill="#2a1a10"/><circle cx="20" cy="40" r="1" fill="#3a3a3a"/><circle cx="40" cy="28" r="1" fill="#3a3a3a"/>`+hi('M8,40L48,16',.4)),
  teer:S(LH('w','#5a3818','#a8784a','#3a2410')+RG('t','.4','.35','#5a5a5a','#0a0a0a'),
    `<path d="M14,22L50,22L46,56L18,56Z" fill="url(#w)"/><path d="M16,30L48,30M17,46L47,46" stroke="#2a2a2a" stroke-width="2.6"/><ellipse cx="32" cy="22" rx="18" ry="5" fill="url(#t)"/>`+
    `<path d="M24,20C26,26 28,28 27,32" fill="none" stroke="#0a0a0a" stroke-width="3"/><path d="M18,22C18,8 46,8 46,22" fill="none" stroke="#3a3a3a" stroke-width="1.8"/><ellipse cx="27" cy="20.5" rx="5" ry="1.2" fill="#fff" fill-opacity=".35" stroke="none"/>`),
  _:S(RG('q','.4','.35','#f0e0b0','#8a6a3a'),`<circle cx="32" cy="32" r="20" fill="url(#q)"/><text x="32" y="41" text-anchor="middle" font-family="Georgia" font-size="26" font-weight="bold" fill="#3a2410" stroke="none">?</text>`)}})();
// HUD-Symbole: dunkelbraune „Gravur“ für Messingknöpfe
const HUDICONS=(()=>{const G='#2a1806',W='#fff3c8';
  const S=b=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g fill="none" stroke="${W}" stroke-opacity=".55" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" transform="translate(.6,.8)">${b}</g><g fill="none" stroke="${G}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${b}</g></svg>`);
  return{
  tipp:S('<path d="M16,4C10,4 7,9 8,14C9,18 12,19 12,23L20,23C20,19 23,18 24,14C25,9 22,4 16,4Z"/><path d="M12.5,26.5L19.5,26.5M14,29.5L18,29.5"/><path d="M16,23L16,16M13.5,14.5L16,16L18.5,14.5"/>'),
  spot:S('<path d="M3,16C8,8 24,8 29,16C24,24 8,24 3,16Z"/><circle cx="16" cy="16" r="4.5"/><circle cx="16" cy="16" r="1" fill="#2a1806"/>'),
  tasche:S('<path d="M8,12C6,18 6,26 9,29L23,29C26,26 26,18 24,12Z"/><path d="M10,12L22,12M12,12C12,6 20,6 20,12"/><path d="M12,19L20,19"/>'),
  auftrag:S('<path d="M9,5L25,5C27,5 27,9 25,9L25,25C25,28 22,28 22,28L7,28C4,28 4,24 7,24L9,24Z"/><path d="M12,12L21,12M12,16L21,16M12,20L18,20"/>'),
  karte:S('<path d="M4,8L11,5L21,8L28,5L28,24L21,27L11,24L4,27Z"/><path d="M11,5L11,24M21,8L21,27"/><path d="M14,15L18,19M18,15L14,19"/>'),
  menu:S('<path d="M6,9L26,9M6,16L26,16M6,23L26,23"/><circle cx="6" cy="9" r=".6"/><circle cx="6" cy="16" r=".6"/><circle cx="6" cy="23" r=".6"/>')}})();
const ICON=id=>ICONS[id]||ICONS._;
const IMG=(id,cls='ico')=>`<img class="${cls}" src="${ICON(id)}" alt="" draggable="false">`;
