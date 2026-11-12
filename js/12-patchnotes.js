// ================= Patch Notes (Startmenü) =================
// Neues Update? Einfach OBEN einen Eintrag ergänzen. v muss eindeutig sein – daran erkennt das Spiel, ob der Spieler die Notes schon kennt.
const PATCH=[
  {v:'1.41',d:'12.11.2026',t:'Birkenwald neu gemalt',n:[
    'Hinter den Birken steht jetzt ein tiefer Wald aus hohen Stämmen, die im Gegenlicht und Dunst nach hinten immer heller werden',
    'Dunkles, grünes Kronendach, in der Mitte offen, damit das Licht durchfällt; Bodennebel am Waldrand',
    'Rot-orange Herbstbüsche am Waldrand',
    'Sattes Gras mit weißen Margeriten und lila Blüten',
    'Bläulich schimmernder Bildrand wie auf alten gemalten Kulissen'] },
  {v:'1.40',d:'12.11.2026',t:'Feinschliff Ellbogen',n:[
    'Petjas Ellbogen sitzen ein kleines Stück weiter außen'] },
  {v:'1.39',d:'12.11.2026',t:'Petjas Augen',n:[
    'Augen im Zeichentrick-Stil: schweres Oberlid hängt über der Pupille, dicke Lidlinie und Lidfalte – der typische verschlafene Blick',
    'Bei Schreck und Staunen reißt er die Augen weit auf, genervt sind sie fast zu',
    'Zwischen Unterarm und Bauch ist wieder etwas Luft'] },
  {v:'1.38',d:'12.11.2026',t:'Petja: kürzere Arme',n:[
    'Ober- und Unterarme deutlich kürzer – die Hände enden etwa auf halber Oberschenkelhöhe',
    'Hände etwas kleiner, aber weiter klobig und eckig',
    'Schultern laufen glatt und abfallend in den Rumpf, keine Wölbung mehr',
    'Arme liegen ohne Lücke eng am Körper'] },
  {v:'1.37',d:'12.11.2026',t:'Petjas Figur überarbeitet',n:[
    'Schmale, abfallende Schultern direkt am Hals statt runder Kugelgelenke',
    'Oberarme liegen eng am Rumpf, die Unterarme spreizen nach unten leicht ab',
    'Riesige, klobige Klauenhände mit dicken Fingern',
    'Kopf wieder klein und schmal'] },
  {v:'1.36',d:'12.11.2026',t:'Petja als Karikatur',n:[
    'Richtige Cartoon-Hände: vier einzelne, leicht gekrümmte Finger, Daumen und Knöchelreihe statt Bananen-Fäustling',
    'Karikatur-Proportionen: größerer Kopf, etwas gedrungenerer Körper, größere Hände'] },
  {v:'1.35',d:'11.11.2026',t:'Petja hat jetzt Mimik',n:[
    'Sechs Gesichtsausdrücke: neutral, erschrocken, erstaunt, fragend/interessiert, froh und genervt',
    'Die Gesichtsmuskeln arbeiten mit: Brauen heben und senken sich, Lider öffnen und schließen, Pupillen werden klein vor Schreck, Wangen und Nasolabialfalten ziehen sich beim Lächeln hoch, der Kiefer geht beim Reden mit',
    'Beim Reden wechselt er zwischen mehreren Mundformen (zu, halb offen, offen mit Zähnen, O-Mund), passend zur Stimmung',
    'Fragend zieht er eine Braue hoch und legt den Kopf schief, erschrocken bekommt er eine Schweißperle',
    'Die Stimmung ergibt sich aus dem, was er sagt; erschrickt oder staunt jemand anderes, reagiert Petja mit',
    'Er blinzelt jetzt ab und zu'] },
  {v:'1.34',d:'11.11.2026',t:'Seitenansicht sauber',n:[
    'Kragen in der Seitenansicht liegt jetzt als schräges Band um den Hals (hinten hoch, vorne tiefer) statt davor zu schweben',
    'Arm in der Seitenansicht mit durchgehender Kontur hinten bis zur Schulter, zerstückelte Falten entfernt'] },
  {v:'1.33',d:'11.11.2026',t:'Kragen-Fix',n:[
    'Schrägansicht: Der V-Ausschnitt saß neben dem Hals und ein Hautstück ragte über die Schulter – Kragen, Knopfleiste und Hals sind jetzt sauber ausgerichtet'] },
  {v:'1.32',d:'11.11.2026',t:'Schlankere Taille',n:[
    'Unterer Brustkorb schmaler – der Oberkörper verjüngt sich jetzt gleichmäßig von der Brust zur Hüfte',
    'Ellbogen und Unterarme rücken entsprechend näher an den Körper'] },
  {v:'1.31',d:'11.11.2026',t:'Arme nachjustiert',n:[
    'Ellbogen und Unterarme sitzen wieder etwas näher am Körper – breite Haltung bleibt, aber weniger abgespreizt'] },
  {v:'1.30',d:'11.11.2026',t:'Petja macht sich breit',n:[
    'Breite Haltung: Schultern zurück, Brust raus – in der Seitenansicht sind die Arme jetzt hinter dem Brustkorb',
    'Oberarme stehen etwas vom Körper ab, die Ellbogen deutlich weiter nach außen',
    'Unterarme hängen locker mit Abstand zum Körper, die Hände kippen leicht mit'] },
  {v:'1.29',d:'11.11.2026',t:'Arme wie gezeichnet',n:[
    'Petjas Oberarme liegen jetzt am Körper an – geschlossene Silhouette, getrennt nur durch eine geschwungene Linie und Stofffalten',
    'Leicht hängende Schultern, der Ärmel wächst weich aus der Schulterlinie (keine Kugelgelenke mehr)',
    'Ärmelenden als weiche Stoffwulst statt harter Kante']},
  {v:'1.28',d:'11.11.2026',t:'Lockerer Petja',n:[
    'Oberkörper ist in der Schräg- und Seitenansicht nicht mehr zu breit',
    'Arme hängen locker vom Körper weg, die Hände liegen nicht mehr am Oberschenkel an',
    'Entspanntere Hände mit leicht gekrümmten Fingern']},
  {v:'1.27',d:'11.11.2026',t:'Petja dreht sich um',n:[
    'Petja hat jetzt 8 Blickrichtungen: vorne, hinten, beide Seiten und alle Schrägen – er schaut immer dahin, wohin er läuft',
    'Beim Reden dreht er sich zu dir nach vorne',
    'Kürzere, geformte Arme; die Hände liegen mit der Innenfläche am Oberschenkel; klobige Schuhe zeigen nach vorne',
    'Neuer Maus-Hover: dezentes, blassgelbes Leuchten statt dicker schwarzer Kontur']},
  {v:'1.26',d:'11.11.2026',t:'Petja schaut dich an',n:[
    'Petja blickt jetzt frontal in die Kamera – neuer Kopf mit kantigem Kiefer, schweren Brauen, schmalen Augen und langer Nase',
    'Wärmere, goldene Hautfarbe',
    'Comic-Anatomie: längere Arme, größere Hände und Schuhe',
    'Ruhigere Kleidung: weniger Nähte und Falten, die wichtigsten bleiben']},
  {v:'1.25',d:'11.11.2026',t:'Gemalt statt glatt',n:[
    'Alle Figuren sehen jetzt aus wie handgemalte Zeichentrick-Folien: weiche Airbrush-Schatten statt harter Kanten',
    'Warm-braune Federkontur, außen kräftiger und auf der Schattenseite dicker – wie mit der Hand gezogen',
    'Etwas gedämpftere Farben, Falten und gemalte Schatten verlaufen weich ineinander']},
  {v:'1.24',d:'11.11.2026',t:'Folk-Banger im Startmenü',n:[
    'Neue Titelmusik: ein eigener Folk-Banger mit 128 BPM – Balalaika und Bajan spielen eine Ohrwurm-Melodie über Kick, hüpfendem Bass und Klatschen',
    'Mit Intro, Trommelwirbel und Drop, ruhigem Flöten-Teil und zweitem Drop mit Domra-Gegenstimme',
    'Läuft in Schleife, solange das Startmenü offen ist']},
  {v:'1.23',d:'11.11.2026',t:'Petja im Detail',n:[
    'Petja hat jetzt richtige Hände mit Fingern, Daumen und Fingergliedern',
    'Turnschuhe mit Schnürung, Kappe, Ferse und Sohlennaht',
    'Mehr Details: Nähte und Falten am Hemd, gekrempelte Ärmel, Gürtelschlaufen, Lidfalten, Lippen, Haarsträhnen',
    'Fehler behoben: keine schwarze Linie mehr quer über Hals und Handgelenke']},
  {v:'1.22',d:'11.11.2026',t:'Wie gezeichnet',n:[
    'Figuren in doppelter Auflösung (500 Pixel hoch): die Linien sind jetzt so fein, dass sie gezeichnet statt gepixelt wirken',
    'Zeichentrick-Schatten: jede Fläche hat eine Licht- und eine Schattenseite mit harter Kante, im Farbton der Fläche',
    'Konturen und Detailstriche halb so dick']},
  {v:'1.21',d:'11.11.2026',t:'Freundlicher Petja',n:[
    'Figuren jetzt 250 Pixel hoch mit dünnen schwarzen Linien statt dicker Doppelkontur',
    'Petja sieht nicht mehr gruselig aus: offene Augen, kurze Nase, leichtes Lächeln, schmaleres Hemd',
    'Farben stimmen besser: z. B. Baba Jagas Haare grau statt gelb, Stab braun']},
  {v:'1.20',d:'11.11.2026',t:'Pixel-Figuren',n:[
    'Alle Figuren sind jetzt echte Pixel-Sprites: 200 Pixel hoch, scharfe Pixel, feste Farbpalette und schwarze Pixel-Kontur',
    'Auch in den Zwischensequenzen bleiben die Pixel scharf']},
  {v:'1.19',d:'11.11.2026',t:'Figuren als Pixel-Arrays',n:[
    'Alle 10 Figuren gibt es jetzt auch als 200 Pixel hohe Pixel-Grafik zum Weiterverwenden (Ordner pixel/, mit Farb-Legende)',
    'Mit python pixel/render.py werden daraus PNG-Bilder']},
  {v:'1.18',d:'11.11.2026',t:'Updates kommen sofort an',n:[
    'Nach einem Update lädt der Browser die neuen Spieldateien direkt, statt alte aus dem Zwischenspeicher zu zeigen']},
  {v:'1.17',d:'11.11.2026',t:'Neuer Zeichenstil',n:[
    'Figuren wie handgezeichnet: dünne Tuschelinien und weiche Airbrush-Schatten statt Pixel',
    'Petja komplett neu gezeichnet: schlaksig, müde Augen, Bartstoppeln, Falten im Hemd',
    'Baba Jaga mit Runzeln, Warze, Krallen und geflickter Schürze']},
  {v:'1.16',d:'10.11.2026',t:'Tiere überall',n:[
    'Dorf: Hunde bellen, Katzen miauen, Kühe muhen, Schweine grunzen, und der Hahn kräht',
    'Dunkle Orte: öfter Wolfsheulen und Eulenrufe',
    'Helle Orte: Grillen zirpen, Schmetterlinge flattern vorbei, dazu die Vögel',
    'Sumpf: Ochsenfrösche und Unken zu den quakenden Fröschen – auch am Ufer quakt es mal']},
  {v:'1.15',d:'10.11.2026',t:'Da ist doch wer …',n:[
    'Im Wald hört man ab und zu Schritte im Laub, die an dir vorbeiziehen',
    'Äste knacken – im Birkenwald selten, im dunklen Wald und Irrwald deutlich öfter',
    'Petja tritt beim Laufen draußen manchmal selbst auf einen Zweig']},
  {v:'1.14',d:'10.11.2026',t:'Größeres Bild, echte Stücke',n:[
    'Das Spiel füllt jetzt den ganzen Bildschirm aus – F schaltet Vollbild an/aus',
    'Schluss mit Fahrstuhlmusik: Jeder Ort hat ein eigenes Stück mit Melodie, die man wiedererkennt',
    'Reigen im 6/8 im Birkenwald, Zwergenmarsch bei den Gnomen, Walzer am Wasser, Klagebass bei Baba Jaga',
    'Sumpf-Blues mit abrutschender Schaleika, und in der Hexenküche wird die Musik immer schneller']},
  {v:'1.13',d:'10.11.2026',t:'Russische Volksinstrumente',n:[
    'Balalaika, Domra, Gusli, Bajan, Swirel-Flöte, Schaleika, Holzlöffel und Schellentrommel',
    'Jeder Ort hat seine eigene Besetzung: Gusli und Flöte im Birkenwald, Bajan und Domra im dunklen Wald, Schaleika im Sumpf …',
    'Im Dorf ein kleines Dorffest mit Balalaika, Bajan und Löffeln']},
  {v:'1.12',d:'10.11.2026',t:'Mehr Groove',n:[
    'Neue Musik: entspannter Lo-Fi-Groove mit E-Piano, Bass, Gitarre und lockerem Beat statt trauriger Klangflächen',
    'Der Beat kommt und geht – mal nur Akkorde, mal mit Schlagzeug, mal kurz Pause',
    'Balalaika im Dorf jetzt schneller und tanzbarer, mit Tamburin',
    'Kein Triangel-Klang mehr im Birkenwald']},
  {v:'1.11',d:'10.11.2026',t:'Sonne, Krähen und Balalaika',n:[
    'Birkenwald und Weggabelung klingen sonnig: Vogelgesang, zirpende Grashüpfer, summende Bienen',
    'Baba Jagas Hütte: kalter Wind und Krähen – dunkler Wald und Irrwald mit Wolfsheulen in der Ferne',
    'Im Dorf spielt jemand Balalaika, am Friedhof hört man sie von weitem',
    'See, Ufer und Steg: mehr Wellen und Plätschern, weniger Wind']},
  {v:'1.10',d:'10.11.2026',t:'Ein bisschen Musik',n:[
    'Leise Hintergrundmusik, die sich der Stimmung anpasst – hell im Wald, düster im Irrwald, trüb im Sumpf, fast still in der Höhle',
    'Keine Lieder in Dauerschleife: Die Melodie entsteht immer wieder neu',
    'Eigener Regler für die Musik-Lautstärke']},
  {v:'1.9',d:'10.11.2026',t:'Jeder Ort klingt anders',n:[
    'Sumpf: Frösche quaken, Fliegen brummen vorbei, es blubbert und platscht',
    'Birkenwald mit Specht, Hütte die knarzt, Irrwald mit Flüstern, Mühle mit Wasserrad',
    'See mit Wellen und springenden Fischen, Höhle mit Tropfen und Hall',
    'Banja mit Musik durch die Wand, drinnen Gemurmel und klirrende Gläser']},
  {v:'1.8',d:'10.11.2026',t:'Weniger Roboter',n:[
    'Die Vorlesestimme ist jetzt standardmäßig aus (in den Einstellungen wieder einschaltbar)',
    'Keine künstlichen Piep-Töne mehr – nur noch leises Wind-, Wasser- und Feuerrauschen',
    'Vorbereitet für echte Geräusch-Aufnahmen']},
  {v:'1.7',d:'10.11.2026',t:'Hören, speichern, weiterspielen',n:[
    'Der Wald lebt: Wind, Vögel, Wasser, Frösche, Höhlentropfen und Bass vor dem Banja – dazu Schritte und Klicks',
    'Alle Figuren sprechen jetzt mit eigener Stimme (einstellbar: alle, nur Petja, aus)',
    'Lautstärke-Regler für Stimmen und Geräusche',
    'Automatisches Speichern bei jedem Ortswechsel und „Weiterspielen“ im Startmenü',
    'Gespräche mit ESC oder Rechtsklick überspringen, Gesprächsverlauf im Tagebuch (L)',
    'Tipp-Knopf in Stufen mit kurzer Denkpause',
    'Minispiele lassen sich nach 3 Fehlversuchen überspringen',
    'Petja merkt im Sumpf, wenn die Richtige gerade nicht da ist',
    'Viele Dinge haben jetzt einen zweiten Spruch']},
  {v:'1.6',d:'10.11.2026',t:'Wer fragt, kommt weiter',n:[
    'Figuren geben bei mehrmaligem Ansprechen immer deutlichere Hinweise – aber nie die Lösung',
    'Petja denkt öfter selbst nach („Mhh. Ohne Leiter komm ich hier nicht weiter.“) – geholfen wird nur, wenn jemand was davon hat',
    'Neue Gespräche, nachdem man bestimmte Dinge gesehen oder gefunden hat',
    'Am Anfang schicken dich alle zur Hexe – Sonne, Pilz, Birke, Krähe, Fischer und Gnome',
    'Über doppelt so viele Sprüche, wenn Petja rumsteht',
    'Petja kommentiert jetzt auch, wenn er an einen bekannten Ort zurückkommt']},
  {v:'1.5',d:'10.11.2026',t:'Petja bleibt locker',n:[
    'Petja klingt jetzt durchgehend trocken und entspannt – weniger Geschrei, mehr „Na super…“',
    'Neue Sprüche, wenn Petja eine Weile rumsteht']},
  {v:'1.4',d:'10.11.2026',t:'Bessere Bedienung & neue Menüs',n:[
    'Knopfleiste oben rechts: Tipp, Zeigen, Taschen, Aufträge, Karte, Menü – verschwindet während Gesprächen',
    'Leertaste halten zeigt alles, was man anklicken kann',
    '💡 Tipp-Knopf (H): Petja sagt, was als Nächstes dran ist',
    'Meldungen für neue Gegenstände und erledigte Aufträge',
    'Neues Tagebuch, Pausemenü, Speicherplätze und Einstellungen',
    'Kurze Anleitung beim ersten Spielstart',
    'Neuigkeiten wie diese hier im Startmenü']},
  {v:'1.3',d:'10.11.2026',t:'Würmer für den Wels',n:[
    'Kusmitschs Wels beißt jetzt auf Würmer – zu finden vor Baba Jagas Hütte, jederzeit einsammelbar',
    'Mehr Hinweise beim Fischer und an der Angelschnur']},
  {v:'1.2',d:'10.11.2026',t:'Vor dem Banja',n:[
    'Neuer Ort: das Blockhaus im dunklen Wald vor dem Banja',
    'Größere Wegweiser, Irrwald-Schilder besser lesbar',
    'Petja schrumpft nicht mehr so schnell, wenn er nach hinten läuft']},
  {v:'1.1',d:'10.11.2026',t:'Petja hat eine Stimme',n:[
    'Petja spricht seine Zeilen (V schaltet die Stimme an/aus)',
    'Steht Petja zu lange rum, sagt er was zum Ort']}];

(function(){const st=$('#start');if(!st)return;let seenV='';try{seenV=localStorage.getItem('petjaPatch')||''}catch(e){}
  const L=PATCH[0],isNew=seenV!==L.v,tb=st.querySelector('.tbox');
  const b=document.createElement('button');b.id='bNews';b.innerHTML='📰 Neuigkeiten'+(isNew?' <em class="newtag">NEU</em>':'');tb.insertBefore(b,tb.querySelector('.tsub'));
  const card=document.createElement('div');card.id='newsCard';card.innerHTML=`<small>${isNew?'NEU · ':''}Version ${L.v} · ${L.d}</small><b>${L.t}</b><ul>${L.n.slice(0,3).map(x=>`<li>${x}</li>`).join('')}</ul><span>Alle Neuigkeiten ansehen ›</span>`;st.appendChild(card);
  const open=e=>{e.stopPropagation();try{localStorage.setItem('petjaPatch',L.v)}catch(e){}b.innerHTML='📰 Neuigkeiten';card.querySelector('small').textContent=`Version ${L.v} · ${L.d}`;
    openO(`<div class="pan news"><button class="x" title="Schließen (ESC)">✕</button><h3>📰 Neuigkeiten</h3>${PATCH.map((p,i)=>`<div class="pn ${i==0?'latest':''}">
      <div class="pnh"><b>${p.t}</b><span>v${p.v} · ${p.d}</span></div><ul>${p.n.map(x=>`<li>${x}</li>`).join('')}</ul></div>`).join('')}</div>`,'newsO')};
  b.onclick=open;card.onclick=open})();
