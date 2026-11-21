// ================= Hände für alle Figuren (nach Petjas Vorbild) =================
// Ein gemeinsamer Hand-Baukasten, damit alle Figuren dieselbe Anatomie haben wie Petjas Hände (PHAND/PTHUMB in 05):
// vier einzeln gezeichnete Finger mit Gelenkfalten, eigener Daumen, Handrücken/Ballen als eigene Fläche, kleiner Finger einen Ton dunkler.
// Die Schattierung macht pixSprite (Licht von links oben); hier kommen nur saubere Flächen mit 1-px-Innenlinien rein.
//
// HAND({x,y,rot,s,flip,pose,sk,sh,ln,sw})
//   x,y   Handgelenk in Figuren-Koordinaten      rot  Drehung in Grad (0 = Finger zeigen nach unten)
//   s     Größe (1 = Handlänge 18 Einheiten, Petja hat 1.3)   flip  spiegeln (Daumen auf die andere Seite)
//   pose  'offen'  hängend, Seitenansicht wie Petja (Daumen vorn)
//         'griff'  Faust um einen Gegenstand (Finger gestapelt entlang der Hand-Achse, Daumen über dem Zeigefinger);
//                  den Gegenstand VOR der Hand zeichnen, dann liegt die Faust darüber
//         'faust'  leere Faust (wie griff)
//         'ruecken' Handrücken von vorn, Finger leicht gespreizt (Hand auf Hüfte/Bauch, gefaltete Hände)
//   sk    Hautton (Grundton), sh Schattenton (kleiner Finger, Daumenballen), ln Faltenlinie – sh/ln werden sonst aus sk abgeleitet
//   sw    Konturstärke in Figuren-Einheiten (Standard 1.4, wird gegen die Skalierung ausgeglichen)
const HAND=(()=>{
  const f=v=>Math.round(v*100)/100,P=(a,b)=>f(a)+','+f(b);
  const dunkler=(hex,k)=>'#'+[1,3,5].map(i=>Math.round(parseInt(hex.slice(i,i+2),16)*k).toString(16).padStart(2,'0')).join('');
  const kapsel=(L,R,t,b)=>{const r=(b-t)/2;return `M${P(L+r,t)}H${f(R-r)}A${f(r)},${f(r)} 0 0 1 ${P(R-r,b)}H${f(L+r)}A${f(r)},${f(r)} 0 0 1 ${P(L+r,t)}Z`};
  // Seitenansicht, hängend (Petjas Hand): [Mitte u, Breite, Spitze v, Krümmung nach vorn]
  const FING=[[-4.3,3,15.4,1.8],[-1.45,3.2,17.8,2.4],[1.6,3.3,18.4,2.9],[4.5,3.1,16.8,3.2]];
  function offen(sk,sh,ln){let s='';FING.forEach(([cx,w,t,k],i)=>{const L=cx-w/2,R=cx+w/2,e=t-w/2;
      s+=`<path d="M${P(L,7)}Q${P(L-.3,e*.7)} ${P(L+k,e)}C${P(L+k,t+.3)} ${P(R+k,t+.3)} ${P(R+k,e)}Q${P(R+.2,e*.7)} ${P(R,7)}Z" fill="${i?sk:sh}"/>`+
        `<path d="M${P(L+k*.55+.3,e-3.6)}Q${P(cx+k*.55,e-3.1)} ${P(R+k*.55-.3,e-3.6)}" fill="none" stroke="${ln}" stroke-width=".4"/>`});
    s+=`<path d="M-3,0C-4,3 -5.6,6 -6,9.4Q-4.3,11 -2.9,9.9Q-1.4,11.2 .1,9.9Q1.6,11.4 3.1,9.9Q4.6,11 6,9.6C5.8,6 4.4,3 3,0Z" fill="${sk}"/>`+
      `<path d="M-2.6,-1.4L2.6,-1.4L2.7,1.2L-2.7,1.2Z" fill="${sk}" stroke="none"/><path d="M-2,3.4C-2.6,5 -3,6.6 -3.1,8M1.6,3.6C1.8,5.2 1.8,6.8 1.4,8.2" fill="none" stroke="${ln}" stroke-width=".4"/>`;
    return s+`<path d="M2.4,2.4C5.8,3.2 8,6.6 8.2,10.4C8.3,12.4 7,13.4 5.8,12.6C5,10.4 4,7.8 2,6.2Z" fill="${sk}"/><path d="M5.2,8C5.8,8.4 6.2,8.8 6.4,9.4" fill="none" stroke="${ln}" stroke-width=".4"/>`}
  // Faust von der Daumenseite: geschlossener Handrücken (hinten, +x) mit Knöchelschatten, vorn (-x) vier gestaffelte Fingerknöchel,
  // Fingerfalten nur bis zur Mitte (sonst sieht die Faust aus wie gerippt), Daumen legt sich vorn über den Zeigefinger.
  // Der Gegenstand liegt bei x=0 im Ring aus Daumen und Zeigefinger: VOR der Hand zeichnen.
  function griff(sk,sh,ln){return `<g transform="translate(2.2,0)">`+
      `<path d="M-4.6,-1L4.2,-1C5.8,2 6.8,6 6.6,10C6.4,13.6 5,15.8 1.8,15.9L-4.4,15.9Q-7.2,15.9 -7,14.4Q-6.9,13.3 -5.9,13.1Q-7.4,12.7 -7.2,11.4Q-7,10.3 -6,10.1Q-7.4,9.7 -7.2,8.4Q-7,7.3 -6,7.1C-6.6,4.4 -6,1.6 -4.6,-1Z" fill="${sk}"/>`+
      `<path d="M5.2,3C6.4,6 6.4,11 4.8,14.6C4,11 4.2,6 5.2,3Z" fill="${sh}" stroke="none"/><path d="M-4.6,14.2Q-2,15.4 1.6,15.2" fill="none" stroke="${sh}" stroke-width="1.2"/>`+
      `<path d="M-5.9,13.1Q-3,13.5 .4,13M-6,10.1Q-3.2,10.5 .2,10M-6,7.1Q-3.4,7.5 0,7" fill="none" stroke-width=".9"/>`+
      `<path d="M1.6,1C2.2,3 2.4,5 2.2,7" fill="none" stroke="${ln}" stroke-width=".4"/>`+
      `<path d="M-7,2.6C-5.8,.9 -2.6,1.6 .2,3.6C1.4,4.6 .8,6.6 -.8,6.3C-2.8,6 -5,6.4 -7.2,7.2Z" fill="${sk}"/><path d="M-1.4,3.7C-.8,4.3 -.6,5 -.9,5.8" fill="none" stroke="${ln}" stroke-width=".4"/></g>`}
  // Handrücken von vorn: Finger leicht gefächert, Knöchelreihe, Sehnen, Daumen seitlich (+x)
  const RF=[[-4.1,2.6,15,-5],[-1.4,2.9,17.2,-1.6],[1.4,2.9,17.8,1.4],[4,2.8,16.4,4]];   // [Mitte, Breite, Spitze, Fächerwinkel]
  function ruecken(sk,sh,ln){let s=`<path d="M5,1.4C7.8,2.8 9.4,6 9.4,9.6C9.4,11.6 7.8,12.4 6.8,11.2C6.2,9 5.6,7.2 4.4,5.8Z" fill="${sk}"/><path d="M7.2,7.6C7.8,8.2 8.2,8.8 8.2,9.6" fill="none" stroke="${ln}" stroke-width=".4"/>`;
    RF.forEach(([cx,w,t,a],i)=>{const L=cx-w/2,R=cx+w/2,r=w/2;
      s+=`<g transform="rotate(${a} ${f(cx)} 6.6)"><path d="M${P(L,6)}L${P(L,t-r)}A${f(r)},${f(r)} 0 0 0 ${P(R,t-r)}L${P(R,6)}Z" fill="${i?sk:sh}"/>`+
        `<path d="M${P(L+.5,t-4.4)}Q${P(cx,t-3.9)} ${P(R-.5,t-4.4)}M${P(L+.6,t-1.9)}Q${P(cx,t-1.5)} ${P(R-.6,t-1.9)}" fill="none" stroke="${ln}" stroke-width=".4"/></g>`});
    return s+`<path d="M-4.4,-.8L4.2,-.8C5.4,2 5.9,4.4 5.6,7.4Q4.2,8.6 2.8,7.8Q1.4,8.8 0,8Q-1.4,8.8 -2.9,7.9Q-4.3,8.6 -5.6,7.4C-5.8,4.4 -5.4,2 -4.4,-.8Z" fill="${sk}"/>`+
      `<path d="M-2.2,1.8C-2.5,3.6 -2.7,5.2 -2.8,6.8M.1,1.6V7M2.2,1.8C2.5,3.6 2.7,5.2 2.7,6.8" fill="none" stroke="${ln}" stroke-width=".35"/>`}
  const POSEN={offen,griff,faust:griff,ruecken};
  return o=>{const sk=o.sk||'#d8a078',sh=o.sh||dunkler(sk,.86),ln=o.ln||dunkler(sk,.66),s=o.s||1,sw=o.sw||1.4;
    // Kontur als style (nicht als Attribut): pixSprite dünnt Attribute <=1.6 auf 55 % aus – hier vorab erledigt und gegen s ausgeglichen
    return `<g transform="translate(${f(o.x||0)},${f(o.y||0)}) rotate(${f(o.rot||0)}) scale(${f(o.flip?-s:s)},${f(s)})" style="stroke-width:${f(sw*.55/s)}">${POSEN[o.pose||'offen'](sk,sh,ln)}</g>`}
})();

// ================= Sohlen mit Absatz (Stiefel/Schuhe der Figuren) =================
// SOHLE({x,w,y,h,toe,c,naht}): Laufsohle von x bis x+w, Unterkante y (Boden), Höhe h. toe -1 = Spitze links, 1 = rechts.
// Absatz hinten als eigener Block, dazwischen das hochgezogene Gewölbe, vorn eine helle Rahmennaht. Nach dem Schuh zeichnen.
const SOHLE=o=>{const f=v=>Math.round(v*100)/100,w=o.w,h=o.h||3,c=o.c||'#141010',n=o.naht||'#4a4038';
  const d=`M.8,${f(-h)}L${f(w-.3)},${f(-h)}L${f(w)},-.4Q${f(w)},0 ${f(w-.4)},0L${f(w*.7)},0L${f(w*.67)},-1.3Q${f(w*.6)},-1.8 ${f(w*.52)},-1.2L${f(w*.48)},0L1.2,0Q-.4,0 0,-1.4Q.2,${f(-h+.4)} .8,${f(-h)}Z`;
  const t=o.toe>0?`translate(${f(o.x+w)},${f(o.y)}) scale(-1,1)`:`translate(${f(o.x)},${f(o.y)})`;
  return `<g transform="${t}"><path d="${d}" fill="${c}"/><path d="M1.6,${f(-h+1)}H${f(w*.48)}M${f(w*.72)},${f(-h+1)}H${f(w-1)}" fill="none" stroke="${n}" stroke-width=".5" stroke-dasharray="1 .8"/></g>`};
