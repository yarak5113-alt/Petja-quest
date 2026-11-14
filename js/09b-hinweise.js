// ================= Gestufte Hinweise & erledigte Orte =================
// Jeder Auftragsschritt hat drei Stufen:
//   0 = Petjas Gedanke (g)  ·  1 = der Ort (w)  ·  2 = die Komplettlösung (h aus quests())
// Im Tagebuch steht erst nur Stufe 0. „Wo muss ich hin?“ / „Lösung zeigen“ schalten weiter (pro Schritt, wird gespeichert).
// o = Orte, an denen der Schritt erledigt wird. Daraus ergibt die Karte: besuchte Orte ohne offenen Schritt = erledigt.
// w und o dürfen Funktionen sein (wenn der Ort vom Spielstand abhängt).
const HINT={
  // Raus aus dem Märchen
  'Jemanden finden, der sich hier auskennt':{g:'Allein komm ich hier nicht raus. Wer wohnt freiwillig in so einem Wald? Jemand Unheimliches, wahrscheinlich.',w:'Vom Birkenwald zur Weggabelung. Da stehen Schilder.',o:['gabel','huette']},
  'In Baba Jagas Hütte kommen':{g:'Die Tür ist Deko. Aber ein Haus hat ja nicht nur Türen.',w:'An der Hütte. Irgendwo weiter oben.',o:['huette']},
  'Herausfinden, was mit mir los ist':{g:'Die Hexe weiß was. Sie muss es nur sagen wollen.',w:'In Baba Jagas Hütte.',o:['innen']},
  'Die Ur-Spore':{g:'Goldene Sporen. Wer züchtet hier Pilze, und zwar ernsthaft?',w:'Bei den Gnomen.',o:['gnome']},
  'Den Popen finden':{g:'Ein Pope, der seit 1993 „in der Stadt“ ist. Vielleicht ist er nie weit gekommen. Popen mögen Wodka …',w:'Hinter dem Banja.',o:['banjaH']},
  'Weihwasser holen':{g:'Der Pope ist wieder da. Popen haben Weihwasser. Meistens.',w:'An der Kirche.',o:['kirche']},
  'Den Schmied überzeugen':{g:'Glut, die nicht ausgeht. Wer hier hat ein Feuer, das nie ausgeht?',w:'Im Schmiedehof.',o:['schmiede']},
  'Etwas, das jeden zum Heulen bringt':{g:'Was bringt jeden zum Heulen? Außer meinem Leben, meine ich.',w:'Bei den Gnomen wächst Gemüse.',o:['gnome']},
  'Die Zwiebel in die Lüftung':{g:'Die Zwiebel muss dahin, wo Nastja sitzt. Ohne dass sie’s merkt.',w:'Hinter dem Banja.',o:['banjaH']},
  'Einen Privattanz bekommen':{g:'Jetzt muss Nastja nur noch Zeit für mich haben.',w:'Im Banja, an der Bühne.',o:['banja','buehne']},
  'Die Träne auffangen':{g:'Sitzen bleiben. Phiole bereithalten. Nicht atmen.',w:'In der Lounge.',o:['lounge']},
  'Alles zu Baba Jaga':{g:'Alles beisammen. Fehlt nur noch die Hexe mit ihrem Tisch.',w:'In Baba Jagas Hütte.',o:['innen']},
  // Das Pilzlabor
  'In den Stollen kommen':{g:'Die Gnome lassen niemanden umsonst rein. Was wollen die?',w:'Bei den Gnomen, am Schild zur Höhle.',o:['gnome']},
  'Mehl vom Müller besorgen':{g:'Die Gnome wollen „Mehl“. Wer hat hier Mehl? Außer Oma.',w:'An der Alten Mühle.',o:['muehle']},
  'Ein Wunsch des Müllers':{g:'Der Müller will was aus dem Banja. Wer da wohl Bescheid weiß?',w:'Im Banja, bei Madame.',o:['banja']},
  'Den Weg nicht verlieren':{g:'Durch den Irrwald findet keiner allein. Wer kennt sich hier überall aus?',w:'Bei Baba Jaga.',o:['innen']},
  'Das Banja finden':{g:'Die Karte. Genau lesen. Und mitzählen.',w:'An der Alten Mühle geht’s in den Irrwald.',o:['muehle','irrwald']},
  'Eine Neue für Madame':{g:'Madame hat eine Liste. Irgendwo gibt’s Frauen, die raus wollen. Aus was Nassem.',w:'Im Sumpf, hinter der Birkensperre.',o:['sumpf']},
  'Frische blaue Pilze holen':{g:'Blaue Pilze wie im Joint. Die wachsen nicht in der Sonne.',w:'In der Höhle der Gnome.',o:['hoehle']},
  'Die Pilze zu Baba Jaga bringen':{g:'Die Hexe wollte frische Pilze. Jetzt hat sie welche. Fast.',w:'In Baba Jagas Hütte.',o:['innen']},
  // Der versperrte Weg & Opas Haus
  'Eine Säge finden':{g:'Birken weg heißt: Säge her. Wer hier hat mal selbst gebaut?',w:'Im Dorf, bei Opa Grischa.',o:['dorf']},
  'Die Säge schärfen lassen':{g:'Rost bis auf die Knochen. Wer schärft hier Werkzeug? Jemand mit Feuer und Amboss.',w:'Im Schmiedehof.',o:['schmiede']},
  'Opas Haus vorbereiten':{g:'Opa will erst was für sein Haus, bevor ich seine Birken anfasse.',w:'Auf der Dorfstraße, bei Oma Dusja.',o:()=>has('teer')?['dorf']:['dorfstr']},
  'Opas Birken zersägen':{g:'Opa ist einverstanden. Also: sägen.',w:'An der Birkensperre.',o:['sperre']},
  'Opas neues Haus':{g:'Die Stämme liegen bei Opa. Der will jetzt bauen.',w:'Im Dorf, bei Opa.',o:['dorf']},
  'Eine offene Rechnung':{g:'Irgendwann will der Schmied was von mir. Wenn er’s sagt, weiß ich’s.',o:[]},
  // Omas Gebiss
  'Das Gebiss finden':{g:'Oma sagt, der Kater vom Popen hockt drauf. Wo hocken Kater vom Popen?',w:'Auf dem Friedhof an der Kirche.',o:['kirche']},
  'Etwas, das er nicht ablehnen kann':{g:'Ein Kater. Was mögen Kater? Außer Ärger.',w:'Am Fischerhaus.',o:['fischer']},
  'Selbst ist der Mann':{g:'Wenn mir keiner einen Fisch gibt, angel ich eben selbst. Fehlt nur die Angel.',w:'Stock plus Schnur.',o:[]},
  'Ein Stock':{g:'Ein schöner gerader Ast. Hab ich doch schon mal gesehen.',w:'Im Birkenwald, wo ich aufgewacht bin.',o:()=>FL.kraehe||has('apfel')?['wald']:['wald','gabel']},
  'Eine Schnur':{g:'Was Langes, Dünnes, Reißfestes. Hängt bestimmt irgendwo rum.',w:'Auf der Dorfstraße.',o:['dorfstr']},
  'Dem Kater den Fisch geben':{g:'Fisch ist da. Kater wartet.',w:'Auf dem Friedhof an der Kirche.',o:['kirche']},
  'Das Gebiss zurückbringen':{g:'Oma wartet. Mit leerem Mund.',w:'Auf der Dorfstraße.',o:['dorfstr']},
  // Hoch hinaus
  'Jemanden mit einer Leiter finden':{g:'Ich brauch was zum Hochklettern. Wer hat sowas rumstehen?',w:'Im Dorf hinter Baba Jagas Hütte.',o:['dorf']},
  'Den Preis bezahlen':{g:'Opa will was zu trinken. Was Starkes.',w:'Im Dorf, bei Opa.',o:['dorf']},
  'An die Flasche kommen':{g:'Kusmitsch passt auf seine Flasche auf. Solange er hinschaut, wird das nix.',w:'Am Fischerhaus.',o:['fischer']},
  'Für Ablenkung sorgen':{g:'Was lenkt einen Angler ab? Ein richtig großer Fang.',w:'Unter dem Pier.',o:['unter']},
  'Würmer sammeln':{g:'Fische wollen was Lebendiges. Und Würmer gibt’s, wo’s matschig ist.',w:'Vor Baba Jagas Hütte.',o:['huette']},
  'Die Würmer an Kusmitschs Schnur hängen':{g:'Kusmitschs Schnur hängt durch die Bretter. Von unten käme man ran.',w:'Unter dem Pier.',o:['unter']},
  // Der Joint
  'Den Joint untersuchen':{g:'Was war eigentlich in dem Joint?',w:()=>has('kippe')?'In Baba Jagas Hütte.':'Im Birkenwald, wo ich aufgewacht bin.',o:()=>has('kippe')?['innen']:['wald']},
  'Das Ergebnis zeigen':{g:'Die Hexe wollte wissen, was drin war.',w:'In Baba Jagas Hütte.',o:['innen']}};
const hv=v=>typeof v=='function'?v():v;
const tipLvl=q=>Math.min(2,FL['tip_'+q.t]||0);
function tipUp(q){FL['tip_'+q.t]=Math.min(2,tipLvl(q)+1)}
// Text einer Stufe (bis einschließlich lvl)
function hintParts(q,lvl){const H=HINT[q.t]||{},out=[];
  if(H.g)out.push(H.g);if(lvl>=1&&H.w)out.push(hv(H.w));if(lvl>=2&&q.h)out.push(q.h);
  if(!out.length&&q.h&&lvl>=2)out.push(q.h);return out}
const isLeaf=q=>!q.ok&&!(q.s||[]).some(c=>c.v&&!c.ok);
// Baumansicht: nur der Gedanke bzw. die schon aufgedeckte Stufe
qNote=function(q){if(!isLeaf(q))return'';return hintParts(q,tipLvl(q)).join(' ')};
// Kasten „Nächster Schritt“ mit Knopf für die nächste Stufe
function nextHint(q){const l=tipLvl(q),p=hintParts(q,l),H=HINT[q.t]||{};
  const more=l==0&&H.w?'Wo muss ich hin?':l<2&&q.h?'Lösung zeigen':'';
  return`${p.map((t,i)=>`<p class="nh ${i==2||(i==1&&!H.w)?'sol':''}">${t}</p>`).join('')}${more?`<button class="mb tipmore">${ic('tipp','sm')} ${more}</button>`:''}`}
// Karte: Orte mit offenem Schritt (Nebenräume zählen zum Ort auf der Karte)
const MAPALIAS={schmiede:'dorfstr',banjaH:'banjaV',buehne:'banja',lounge:'banja'};
function openRooms(){const r=new Set();nextSteps(quests()).forEach(({q})=>{const H=HINT[q.t];if(H&&H.o)(hv(H.o)||[]).forEach(id=>r.add(MAPALIAS[id]||id))});return r}
const _mapSVG=mapSVG;mapSVG=function(){const s=_mapSVG(),open=openRooms();let add='';
  Object.keys(MAPN).forEach(id=>{if(!seen[id]||open.has(id))return;const[x,y]=MAPN[id];
    add+=`<circle cx="${x+3.2}" cy="${y-2.6}" r="1.9" fill="#3a7a3a" stroke="#1a1008" stroke-width=".4"/><path d="M${x+2.3},${y-2.6}L${x+3},${y-1.8}L${x+4.2},${y-3.4}" fill="none" stroke="#e8ffe0" stroke-width=".55" stroke-linecap="round" stroke-linejoin="round"/>`});
  return s.replace(/<\/svg>$/,add+'</svg>')};
