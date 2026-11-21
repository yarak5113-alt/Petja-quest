// ================= Patch Notes (Startmenü) =================
// Neues Update? Einfach OBEN einen Eintrag ergänzen. v muss eindeutig sein – daran erkennt das Spiel, ob der Spieler die Notes schon kennt.
const PATCH=[
  {v:'2.57',d:'21.11.2026',t:'Richtfest',n:['Hausbau auf der Wiese: Stamm für Stamm über Rutschbalken, das Dach Schindel für Schindel – und zum Richtfest steht das ganze Dorf vor dem Haus.','Alle Figuren haben jetzt richtige Hände mit Fingern und Daumen wie Petja, dazu Schuhe mit Sohle und Absatz.','Baba Jagas Hütte: neuer Hintergrund mit Fichten im Dunst, toten Bäumen mit Rinde und Bodennebel.','Nastjas erstes Outfit wippt beim Tanz wieder sauber mit, ohne dass etwas verrutscht.','Englisch und Russisch: fehlende Texte nachgetragen (Tastenleiste, Hover-Texte, Schilder, Erfolge, Neuigkeiten, eine Szene in der Lounge).']},
  {v:'2.48',d:'20.11.2026',t:'Hau-ruck',n:['Neue Nebenaufgabe „Kusmitschs Kahn“: Das Wrack am Ufer ist Kusmitschs alte „Swetlana“. Oma gibt Teer, Opa verdünnt ihn mit Selbstgebranntem, Fjodor schmiedet einen Bootshaken – dann ziehen alle zusammen den Kahn aus dem Schilf.','Danach liegt der geflickte Kahn am Ufer, Kusmitsch verzeiht dir den geklauten Schnaps, es gibt Dorf-Ruf, und beim Hausbau-Ende bringt er Fisch mit.']},
  {v:'2.47',d:'18.11.2026',t:'Aufgeräumt',n:['Geld ist komplett raus: kein Geld zustecken beim Tanz, Opa gibt nach dem Duell sein Gefreiten-Abzeichen, Vater Ignati seinen Segen. Nastjas 100 % bleiben über Reden und Trinken erreichbar.','Trafohäuschen auf dem Schmiedehof: klickbar, mit Fjodors Auftrag startet es den Verteilerkasten. Oma Dusja friert jetzt sichtbar und schickt dich zum Schmied.','Russische Fassung vollständig für Tanz, Duell, Dorf-Aufgaben, Verteilerkasten, Auftragsbuch und Ehrenbürger-Ende.','Schnellerer Start: die Twerk-Frames werden erst beim ersten Dessous-Tanz geladen, der ungenutzte Arm aus dem alten Griff ist raus.','Aufgeräumt: Griff-Code entfernt, Skripte in Ladereihenfolge nummeriert, fester Testlauf tools/test-neu.js.']},
  {v:'2.46',d:'18.11.2026',t:'Halten',n:['Twerken: Die ersten beiden Frames sind nur noch der Übergang hinein, danach bleibt Nastja im tiefsten Frame und nur die Wackel-Physik bewegt sie, die Hüfte federt auf jedem Schlag, die Haare schwingen mit. Zum Schluss geht es über die Zwischenstufe zurück.']},
  {v:'2.45',d:'18.11.2026',t:'Startpose',n:['Twerken: Die Pose mit den Händen an der Hüfte kommt nur noch einmal zu Beginn; die Schleife wechselt danach nur zwischen Zwischenstufe und tiefstem Punkt.']},
  {v:'2.44',d:'18.11.2026',t:'Mit Schwung',n:['Twerken läuft halb so schnell: ein Durchgang dauert zwei Takte, jeder Frame bleibt länger stehen.','Wackel-Physik für die gezeichneten Frames: die Hüfte federt beim tiefsten Punkt gedämpft nach, die Haare schwingen verzögert hinterher.']},
  {v:'2.43',d:'18.11.2026',t:'Twerken',n:['Im Dessous-Tanz ersetzt „Twerken“ den Knopf „Riskant anfassen“: Nastja dreht sich um und tanzt 6 Takte lang die gezeichneten Frames, tiefster Punkt auf dem Schlag, Stimmung +12. Danach 3 Sekunden Pause, dann geht es wieder.']},
  {v:'2.42',d:'17.11.2026',t:'Von hinten',n:['Im Dessous-Tanz zeigt Nastja in der Rückenphase jetzt gezeichnete Frames statt des Rigs: aufrecht, Zwischenstufe und tiefster Punkt genau auf dem Schlag, im Takt der Musik.']},
  {v:'2.41',d:'17.11.2026',t:'Nochmal versuchen',n:['Riskant anfassen geht jetzt mehrmals pro Tanz, nach jedem Versuch mit 4 Sekunden Pause.','Drei Zonen: Kopf, Oberkörper (Griff an der Taille) und Hüfte, jeweils mit eigener Reaktion, über 70 Beziehung freundlich, sonst Abfuhr oder Zinaida.','Deutsche Fassung ohne russische Sprüche: Nastja, Zinaida und Opa reden Deutsch; die russischen Originale gibt es jetzt in der russischen Sprachfassung.']},
  {v:'2.40',d:'17.11.2026',t:'Fester Griff',n:['Рискнуть и приобнять hängt jetzt an der Beziehung zu Nastja (über 70) statt an der Stimmung.','Petjas Hand kommt gespreizt heran und drückt sich beim Zugreifen an der Taille zusammen, genau dann mit Squish-Geräusch und einem Wackler bei Nastja. Beim Loslassen öffnet sie sich wieder.']},
  {v:'2.39',d:'17.11.2026',t:'Ab 70 %',n:['Tanzmenü auf Russisch: Скомканные салфетки (Tempos zustecken), Ближе наклониться (näher ranbeugen), Рискнуть и приобнять. Башли erscheint nur mit Geld in der Tasche.','Рискнуть и приобнять hängt jetzt an der Stimmung: unter 70 % schlägt Nastja die Hand weg. Ab 70 % fasst Petja sie an der Taille und zieht sie näher (Kamera lehnt sich tief rein, Flirt, Beziehung +), außer Zinaida guckt gerade: dann reißt sie den Vorhang auf und ruft STOPP.']},
  {v:'2.38',d:'17.11.2026',t:'Lange Arme',n:['Beim riskanten Griff im Tanz streckt sich jetzt Petjas echter Arm aus der Ich-Sicht von rechts unten zur Brust, im türkisen Hemd. Nastja schlägt ihn trotzdem weg.']},
  {v:'2.37',d:'17.11.2026',t:'Verteilerkasten',n:['Fjodors Stromleitung ist jetzt ein Logikrätsel: Kabelstücke drehen, bis Schmiede und Omas Hütte Strom haben, ohne offene Enden.','Schmiede, Omas Hütte und Trafo im Rätsel sehen jetzt aus wie die Häuser im Dorf.','Die Kohle für Oma Dusja gibt Fjodor jetzt direkt nach dem Rätsel. Man kann den Sack auch auf Oma ziehen (genauso den Kater auf Vater Ignati).']},
  {v:'2.36',d:'17.11.2026',t:'Wo ist Murka?',n:['Der weggetretene Kater sitzt jetzt wirklich unter dem Pier (vom Ufer aus über das Schild „Unter den Pier“) statt am Fischerhaus.']},
  {v:'2.35',d:'17.11.2026',t:'Einer von uns',n:['Schmied Fjodor braucht eine neue Stromleitung: Hauptschalter aus, alte Kabel abnehmen, neues Kabel Mast für Mast verlegen, Strom wieder an. Wer zu früh anfasst, kriegt eine neue Frisur','Oma Dusja friert, sagt es aber nicht. Fjodor schickt ihr einen Sack Kohle – über dich','Vater Ignati vermisst seinen Kater. Der ist … geflogen. Gibst du ihm am Friedhof den Fisch, krallt er sich an dein Bein, und dein Tritt schickt ihn im hohen Bogen über die Kirche. Such ihn dort, wo es nach Fisch riecht','Wer alle vier Dorf-Aufgaben schafft (Strom, Kohle, Kater, Trinkduell) und am Ende bleibt, baut sich im Dorf ein eigenes Haus','Das Trinkduell ist leichter: breitere Mitte, ruhigerer Zeiger, Opa verträgt weniger','Porträts im Gespräch sind kleiner und passen sich immer der Höhe der Leseleiste an','Keine englischen Wörter mehr im Spiel: „Stimmung“ statt „Vibe“, „Glas“ statt „Shot“, „Freier Tanz“ statt „Freestyle“; die neuen Szenen gibt es jetzt auch auf Englisch']},
  {v:'2.34',d:'17.11.2026',t:'Hände aufs Sofa',n:['Privattanz mit eigenem Menü: Tempos zustecken (Nastja lacht dich auf Russisch aus), näher ranwinken (die Kamera rückt an sie heran), etwas Riskantes wagen – und mit Rubeln in der Tasche „Башли“','Madame Zinaida passt auf: Ab und zu linst sie hinter dem Vorhang hervor. Wer sich etwas traut, während sie zuschaut, wird erwischt, und der Tanz stockt','Rubel! Opa zahlt nach einem gewonnenen Trinkduell deinen Wetteinsatz aus','Enden: „Hierbleiben“ wird mit hohem Dorf-Ruf automatisch zum Ehrenbürger-Ende. Mit Nastjas Polaroid heimzukehren ist jetzt das wahre Ende','Nastja hat im Standard-Outfit beim Tanzen eine größere Oberweite, passend zu den anderen Outfits']},
  {v:'2.33',d:'17.11.2026',t:'Самосад',n:['Trinkduell mit Opa Grischa: Nach dem Hausbau lädt er dich an seinen Tisch. Kipp den Shot, wenn das zitternde Herz in der grünen Mitte ist (Leertaste oder Klick). Mit jedem Glas wird es schneller, wackliger und du siehst doppelt. Wer zuerst umfällt, verliert','Neu: Dorf-Ruf. Was du fürs Dorf tust, zählt – und ein Sieg im Trinkduell zählt viel. Mit genug Ruf wartet an Baba Jagas Tisch ein viertes Ende: Ehrenbürger','Gespräche mit Porträts: Petja, Opa und Nastja zeigen im Dialog ihr Gesicht – je nach Stimmung neutral, sarkastisch, verkatert, wütend, betrunken, flirtend oder lachend','Einstellungen: CRT-Filter für echten Röhren-Charme (Scanlines, Farbränder, gewölbter Rand) und Porträts an/aus']},
  {v:'2.32',d:'17.11.2026',t:'Feinschliff am Privattanz',n:['Im Takt treffen ist leichter: Ein Ring schrumpft auf einen Kreis zu – drück Leertaste oder klick, wenn er ihn berührt. Das Zeitfenster ist größer, daneben kostet weniger','Nastja sieht beim Tanzen nicht mehr zerschnitten aus: keine Löcher und Risse mehr an Armen und Beinen','Von hinten fallen ihre Haare jetzt als echte Locken in ihren Haarfarben, mit gewellten Spitzen','Beziehung zu Nastja wächst 20 % schneller: Privattanz +13, Gespräch +8, Anstoßen +6 – Dessous-Outfit und Polaroid kommen deutlich früher']},
  {v:'2.31',d:'17.11.2026',t:'Nastjas Bühnenshow',n:['Nastjas Outfits hängen jetzt an eurer Beziehung: Nach dem Anwerben steht ihr bei 15 %. Ab 25 % tanzt sie privat im Standard-Outfit, ab 50 % im VIP-Outfit, ab 80 % in einem neuen Dessous-Outfit, und bei 100 % schenkt sie dir das Polaroid','Neuer Privattanz für alle drei Outfits: Hüfte, Oberkörper und Haare bewegen sich getrennt und weich, die Haare schwingen dem Kopf nach, und Nastja dreht sich einmal ganz um die eigene Achse','Ich-Sicht vom Sofa aus mit Stimmungsbalken: Leertaste oder Klick im Takt füllt es, Maus im Kreis bewegen dreht Nastja mit. Mit viel Stimmung am Ende mag sie dich etwas mehr','Beim ersten Tanz in einem neuen Outfit heißt es: Augen zu, Zwiebel']},
  {v:'2.30',d:'17.11.2026',t:'Madames Liste',n:['Klick auf Madames Liste (in der Taschenleiste oder im Bündel beim Untersuchen) zeigt jetzt den Zettel selbst: rosa Banja-Briefpapier in Madames Handschrift mit den vier Punkten, Kussmund und Unterschrift. Ist die Neue angeworben, ist alles angekreuzt und ein Stempel „Erledigt“ ist drauf. Schließen mit Klick oder Esc']},
  {v:'2.29',d:'17.11.2026',t:'Hand, Schritte, Taschenleiste',n:['Schnell-Inventar oben rechts: höchstens 6 Gegenstände sichtbar, mit Pfeilen links und rechts (oder dem Mausrad) blättert man durch den Rest. Ein neuer Gegenstand ist sofort zu sehen','Laufen nach vorn und hinten: Petja macht jetzt sichtbare Schritte (ein Fuß setzt tiefer auf, der andere höher, die Ferse hebt ab) und wechselt linkes und rechtes Bein ab, statt wie auf einem Laufband zu gleiten','Petjas Hand in der Ich-Sicht (Intro bei Wowa) ist neu gezeichnet: Finger mit Gliedern, Knöcheln und Falten statt gleich dicker Würstchen, ein kräftiger Daumen mit Ballen, Mittel-, Ring- und kleiner Finger zur lockeren Faust eingerollt','Die Fingernägel sind jetzt kurze, flache Nagelplatten mit Nagelhaut und hellem Rand statt weißer Ovale','Keine dunkle Naht mehr quer über dem Zeigefinger, wo er über dem Joint liegt']},
  {v:'2.28',d:'17.11.2026',t:'Zoom, Reihen und Gespräche',n:['Karte: mit dem Mausrad, den Knöpfen + und − oder per Doppelklick hineinzoomen, mit gedrückter Maus verschieben (auf dem Touchscreen mit zwei Fingern). Die Karte ist dafür doppelt so fein gemalt und bleibt scharf','Schnell-Inventar oben rechts: bei vielen Gegenständen mehrere Reihen und kleinere Felder statt einer Leiste quer über den Bildschirm','Gespräche stehen jetzt bei der Person, mit der Petja geredet hat (Notizbuch → Figuren, aufklappbar, neuestes oben). Stimmen ohne Steckbrief stehen unter „Weitere Stimmen“, Petjas Selbstgespräche ganz unten. Der Verlauf wird mit dem Spielstand gespeichert. Taste L öffnet die Figuren','Schneller: Die Karte wird schon im Titelbild vorgemalt, Tanz-Animationen laufen nur noch, wenn man im Raum ist']},
  {v:'2.27',d:'17.11.2026',t:'Der Kater faucht selbst',n:['Am Friedhof faucht jetzt der Kater und nicht mehr Petja – mit eigenem Namen im Dialog','*FAUCH* und *KNACK* sind jetzt auch auf Englisch und Russisch übersetzt']},
  {v:'2.26',d:'17.11.2026',t:'Die Karte als Gemälde',n:['Die Landkarte ist jetzt ein Ölbild im Goldrahmen: Landschaft aus der Vogelperspektive mit Himmel, blauen Bergen, gemalten Wäldern, Wiesen und Feldern','Die Lage der Orte ergibt Sinn: das Dorf mit Kirche und Schmiede im Norden, die Mühle steht am Bach (mit Brücke), Irrwald und Banja im Westen, Sumpf, See und Gnome im Osten, die Höhle im Fels','Was zusammengehört, ist ein Ort: Baba Jagas Hütte und ihr Inneres, das Banja mit Bühne, Lounge und Hinterhof, das Ufer mit dem Platz unter dem Pier','Wo ein Weg über Wasser führt, steht eine Brücke; an der Birkensperre liegen die umgestürzten Birken quer über dem Weg']},
  {v:'2.25',d:'16.11.2026',t:'Russisch mit Schnauze',n:['Die russischen Texte im Stil der alten Kult-Adventures überarbeitet: Petja hat jetzt feste Sprüche («Эх, была не была», «Опа», «Пинцет», «что я, лысый, что ли?») statt in jedem Satz «лажа» und «пофиг»','Baba Jaga spricht öfter in holprigen Reimen, die Gnome reden wie Beamte (Reglement, Pfand, Plomben), dazu Märchen- und Filmzitate wie «иди туда, не знаю куда», «ловись, рыбка» und «тополь на Плющихе»']},
  {v:'2.24',d:'16.11.2026',t:'Bündel und Landkarte',n:['Die Taschen sind jetzt Petjas Bündel: ein aufgeknotetes rotes Tupfentuch mit Blütenbordüre auf dem Dielenboden, die Sachen liegen darauf. Oben die Knöpfe Untersuchen und Kombinieren, unten Name und Petjas Kommentar','Kombinieren geht im Bündel auch per Klick: Gegenstand, dann zweiten Gegenstand','Die Karte ist neu gemalt: Pergament mit Birkenwäldern, dunklem Tann, See, Sumpf, Berg mit Höhle, Dorfhäusern, Kirche mit Goldkuppel, Mühle, Hexenhütte auf Hühnerbeinen, Banja-Neon und Gnomhügeln – Feldwege statt Strichlinien, Unerkundetes liegt im Nebel, eine rote Nadel zeigt, wo du bist']},
  {v:'2.23',d:'16.11.2026',t:'Geht nicht!',n:['Falscher Gegenstand auf Figur oder Ding gezogen: Statt immer desselben Satzes gibt es wechselnde, sarkastische Absagen – Oma, Opa, Baba Jaga, Kusmitsch, Madame, Nastja und Grobnik antworten sogar selbst','Neu: Erfolge (Menü → Erfolge), über alle Spielstände hinweg – z. B. Nervensäge, Tourist, Taxi Petja, Alle Wege führen …','Easter Eggs: zehnmal hintereinander auf dasselbe klicken … und in drei Bildschirmecken liegt etwas Verstecktes ohne jede Quest-Bedeutung','Englisch und Russisch haben bei Absagen, Geheimnissen und einigen Kulissen eigene Anspielungen statt wörtlicher Übersetzung (Memes, Mult-Zitate, Puschkin, Rap-Titel)','Steuerung im Menü ergänzt: Gegenstände untersuchen und ziehen']},
  {v:'2.22',d:'16.11.2026',t:'Mehr anfassen, weniger latschen',n:['Taschen: Klick oder Rechtsklick auf einen Gegenstand = Untersuchen – Petja gibt einen bissigen Kommentar ab. Gegenstände lassen sich ziehen: auf einen anderen Gegenstand zum Kombinieren, auf etwas in der Szene zum Benutzen','Die Angel baut Petja nicht mehr von selbst: Schnur auf den Stock ziehen. Unsinnige Kombinationen kommentiert er trocken','Über 40 Kulissen-Objekte haben jetzt einen Einzeiler: Birken, Pfützen, Strommast, Schädelzaun, Hexenregale, Neonschild, Seerosen, Kristalle, Spiegel …','Karte: Ab 5 entdeckten Orten reicht ein Klick auf einen besuchten Ort – Schnellreise statt fünf leerer Bildschirme','Vorladen: Alle Orte werden schon im Titelbild vorgemalt, damit der erste Besuch nicht ruckelt; beim Laden eines Spielstands bleiben sie erhalten','Zwischensequenzen (Privattanz, VIP-Kabine, Enden) werden in Bildschirmauflösung gezeichnet – Pixel-Art bleibt auf großen Monitoren scharf']},
  {v:'2.21',d:'16.11.2026',t:'Das neue VIP-Bild',n:['Nastja in der VIP-Kabine ist jetzt das neue, fertig gepixelte Bild: Korsett mit Schnürung, Strapse, Strümpfe und Schnürstiefel, Haarspange, Sommersprossen, Zwinkern','Beim Umziehen sind ihre Augen wieder geschlossen (aus demselben Bild)']},
  {v:'2.20',d:'16.11.2026',t:'Echte Pixel',n:['Nastja in der VIP-Kabine ist jetzt ihr eigenes, sauber gepixeltes Bild (zwinkernd, heranwinkend) – nur die Kleidung ist neu gepixelt: kürzeres Korsett mit Spitze, Bauch frei mit Bauchnabel, Träger über den Schultern','Damit ist sie genauso scharf wie in allen anderen Szenen; beim Umziehen sind ihre Augen geschlossen']},
  {v:'2.19',d:'16.11.2026',t:'Nur ein Traum?',n:['Normales Ende: Nachdem Wowa rausgeflogen ist, fragt sich Petja, ob das alles nur ein Traum war – und zieht sich ein Birkenblatt aus den Haaren','Nastja im VIP-Outfit: ruhige, klare Farbflächen statt fleckigem Rauschen in Haaren und Haut']},
  {v:'2.18',d:'16.11.2026',t:'Scharf gestellt',n:['Nastja im VIP-Outfit ist nicht mehr verschwommen: die Vorlage wird vor dem Umwandeln geschärft, mit weniger Farben und klaren dunklen Linien wie ihre anderen Bilder']},
  {v:'2.17',d:'16.11.2026',t:'Ein echtes Polaroid',n:['VIP-Kabine: kein Vorhang mehr – Petja macht die Augen zu, hört sie sich umziehen und blinzelt wieder auf; ihre Augen sind dann noch geschlossen','Das VIP-Outfit hat jetzt Nastjas Farben (kräftigeres Blond, ihr Korsett-Rot, graue Strümpfe) statt des grauen Tons','Nastja-Ende: Petjas Zimmer ist neu und realistischer – nah dran, mit Fenster und Plattenbau-Lichtern, Heizkörper, Schreibtisch mit Schubladen, Monitor, Tastatur, Tasse, Aschenbecher und Lampe als einzigem Licht','Das Polaroid ist jetzt so klein wie ein echtes; die Kamera fährt am Ende ganz hinein, bis das Foto das Bild füllt','Der Abspann läuft über diesem letzten Moment statt über schwarzem Samt']},
  {v:'2.16',d:'16.11.2026',t:'Sauberer Abgang',n:['Behoben: Nach dem Privattanz (und der VIP-Kabine) standen bei „*Drei Minuten später*“ Madame, Nastja, Marfa und die Gäste aus dem Banja in der Lounge herum – jetzt bleibt bis zum Ende der Zeilen das abgedunkelte Tanzbild','Danach landet Petja wieder dort, wo er Nastja angesprochen hat (z. B. an der Bar im Banja), statt immer auf der Bühne']},
  {v:'2.15',d:'16.11.2026',t:'Tester: Nebenquest',n:['Tester-Modus: Unter den Story-Sprungpunkten gibt es jetzt einen eigenen Block für die Nebenquest „Die zweite Tänzerin“ – Bogen von Madame, Marfas Krone, Diadem von Nastja, Marfa angeworben, Madame Bescheid sagen','Dazu Sprungpunkte für Nastjas Beziehung (75 % Diadem, 95 % Max-Level, 100 % Polaroid, VIP-Kabine) und für die Enden am Tisch']},
  {v:'2.14',d:'16.11.2026',t:'VIP-Kabine',n:['Fehlen nur noch weniger als 5 Punkte bis zur besten Beziehung, führt Nastja dich beim Privattanz in die VIP-Kabine – mit eigenem Ablauf in drei Phasen','Erst eine kokette Ansage und eine Kabarett-Pose, dann zieht sie den Samtvorhang zu und zieht sich mit geschlossenen Augen um','Der Vorhang geht auf: neues Bühnen-Outfit mit Strapsen und Strümpfen – sie öffnet ein Auge, zieht die Braue hoch, zwinkert und kommt ganz nah ans Sofa','Im Nastja-Menü zeigt das Bild sie dann schon im VIP-Outfit. Alle neuen Zeilen auch auf Englisch und Russisch']},
  {v:'2.13',d:'16.11.2026',t:'Drei Enden',n:['Am Tisch bei Baba Jaga gibt es jetzt eine echte Wahl: den Ausweg-Joint drehen oder hierbleiben – mit eigenem Epilog im Dorf (Ende „Das Zahnrad“)','Bei 100 % Beziehung schenkt dir Nastja ein Polaroid. Nimmst du es mit nach Hause, geht das Finale weiter: Petja hängt das Foto über seinen Schreibtisch – mit ihrer Handschrift, in jeder Sprache anders','Der Abspann zeigt, welches Ende du erreicht hast und wie viele von 3 du schon gefunden hast']},
  {v:'2.12',d:'15.11.2026',t:'Fast am Ziel',n:['Privattanz: Nastja kommt eine halbe Sekunde länger näher an den Bildschirm, bevor sie sich hinhockt – die Unterschenkel bleiben unten aus dem Bild','Max-Level-Modus: Fehlen bei Nastja weniger als 10 Beziehungspunkte bis zum Maximum („Verrückt nach dir“), wird sie völlig schamlos – neue Tanzposen (tief in die Knie, Hand hinterm Kopf auf dem Schoß), ein neuer Flüstersatz und vulgär-kokette Sprüche beim Reden und Anstoßen']},
  {v:'2.11',d:'15.11.2026',t:'Mehr Nastja',n:['Nach der Versöhnung öffnet ein Klick auf Nastja ein Menü: Privattanz, ein Gespräch führen oder mit ihr anstoßen – jedes bringt Beziehungspunkte (das Diadem für Marfa gibt’s erst bei „Eng verbunden“)','Nastja und Marfa reden frecher, vulgärer und koketter','Im Sumpf erscheinen jetzt genau die Nymphen-Bilder aus pixel/nymphe_*.json (statt zur Laufzeit gerendert)']},
  {v:'2.10',d:'15.11.2026',t:'Erst nah, dann runter',n:['Beim Privattanz kommt Nastja jetzt stehend mit Kussmund ganz nah heran – erst dann hockt sie sich auf deinen Schoß']},
  {v:'2.09',d:'15.11.2026',t:'Die zweite Tänzerin',n:['Neue Nebenquest (im Auftragsbuch markiert): Nach Nastjas Träne will Madame Zinaida eine zweite Tänzerin – mit neuem Anwerbebogen (Schön · Bühnenerfahrung · Frech · Will raus)','Die Zweitbeste aus dem Sumpf ist Marfa – aber ohne Krone geht sie nirgendwohin. Nastjas altes Strass-Diadem könnte helfen …','Marfa tanzt danach an der Stange, Nastja macht Pause und trinkt am Tresen Rotwein, die Gäste kommen zurück','Neu im Notizbuch (Taste C): Beziehungsleiste für jede Figur – Kusmitsch ist sauer wegen des geklauten Selbstgebrannten, Nastja mag dich mehr, je öfter du mit ihr redest. Änderungen melden sich kurz am Bildrand','Neue Texte auch auf Englisch und Russisch']},
  {v:'2.08',d:'15.11.2026',t:'Mehr Tanz, weniger Zähne',n:['Nastja tanzt jetzt deutlich länger vor dir (vorbeugen, Hüfte, nochmal heranwinken), bevor sie sich auf deinen Schoß setzt','Statt des breiten Zähne-Grinsens hat sie ein verruchtes Lächeln mit geschlossenen Lippen und einem hochgezogenen Mundwinkel']},
  {v:'2.07',d:'15.11.2026',t:'Knie und eine Träne',n:['Nastja kommt beim Privattanz erst näher und kniet sich über Petja – man sieht ihre Knie auf seinem Schoß, bevor sie tiefer sinkt','Petjas Knie sind nach außen gedreht und glänzen nicht mehr','Mit der Zwiebel rollt nur noch eine einzige Träne über ihre Wange']},
  {v:'2.06',d:'15.11.2026',t:'Auf dem Schoß',n:['Beim Privattanz aus Petjas Sicht setzt sich Nastja jetzt richtig breitbeinig auf seinen Schoß, die Hände auf seinen Schultern, und wiegt die Hüfte','Dann beugt sie sich an sein Ohr und flüstert ihm etwas Unanständiges zu','Steckt die Zwiebel in der Lüftung, kommen ihr danach sichtbar die Tränen: sie laufen über die Wangen, die Unterlippe zittert','Behoben: Petjas Knie wurden in der Ich-Sicht nie richtig gezeichnet']},
  {v:'2.05',d:'15.11.2026',t:'Ganz nah',n:['Privattanz überarbeitet: keine steife Kniebeuge mehr – Nastja lässt sich auf Petjas Schoß sinken, kommt ganz nah an sein Gesicht, stützt sich auf seiner Schulter ab und hakt den Finger frech in ihr Halsband','Neu: Sie fährt sich mit der Hand durchs Haar, während die Hüfte kreist','In den frechsten Momenten zieht sie jetzt zusätzlich die Augenbraue hoch','Aus Petjas Sicht hat jede Tanzphase ihr eigenes Bild: Heranwinken, Hüfte links/rechts, Haare, auf den Schoß, Kussmund, Kuss zuwerfen']},
  {v:'2.04',d:'15.11.2026',t:'Jeder spricht anders',n:['Englisch und Russisch: Jede Figur hat jetzt ihre eigene Stimme – Wowa hektisch („рубишь?“, „гонишь!“), Nastja charmant und knallhart aufs Geld aus („Халявы не будет“), Opa flucht („Твою мать“, „Ёмаё“), Baba Jaga schimpft („шлында“, „умник“)','Auf Englisch sagt Baba Yaga ständig „bloody“ – „bloody joint“, „bloody map“ –, auf Russisch heißt das „хренов“','Die Gnome reden wie nervöse Kuriere, Kusmitsch flickt alles mit Panzertape, Fjodor redet in Halbsätzen, Vater Ignati findet alles „zum Besten“, die Nymphen lästern übereinander, und Petja sagt auf Russisch „кайф“, „лажа“ und „пофиг“']},
  {v:'2.03',d:'15.11.2026',t:'Nastja legt los',n:['Der Privattanz ist neu choreografiert: Nastja winkt dich mit dem Zeigefinger heran, kreist frech die Hüften, geht breitbeinig tief in die Knie, streicht über ihre Schenkel und wirft dir zum Schluss einen Kussmund samt Herzchen zu','Dazu ein schiefes, freches Grinsen mit Zähnen – das Zwinkern und die Augen bleiben genau wie immer','Sechs Bilder statt vier, in der Lounge und aus Petjas Sicht']},
  {v:'2.02',d:'15.11.2026',t:'Deutsch · English · Русский',n:['Das Spiel gibt es jetzt auch auf Englisch und Russisch: auf dem Titelbild (DE · EN · RU) oder im Menü unter Einstellungen → Sprache umschalten','Nicht wörtlich übersetzt, sondern neu geschrieben: Englisch mit trockenem britischem Humor, Russisch mit Dorf-Slang und Galgenhumor (Oma lispelt auch auf Russisch, Fjodor sagt „Мелок наготове“)','Übersetzt sind alle Dialoge, Sprüche, Gegenstände, Aufträge, Hinweise, Steckbriefe, Menüs und sogar die gemalten Schilder','Die Stimmen sprechen in der gewählten Sprache, sofern der Browser eine passende Stimme hat']},
  {v:'2.01',d:'15.11.2026',t:'Schreibbereitschaft',n:['Schmied Fjodor hat ein Lieblingswort: „Schreibbereitschaft“. Wer bei ihm nicht zahlen kann, kommt mit Kreide an die Wand','Sein Steckbrief im Notizbuch (Taste C) weiß das jetzt auch']},
  {v:'2.00',d:'15.11.2026',t:'Privattanz',n:['Nastja tanzt jetzt wirklich in der privaten Lounge: Hände hinterm Kopf, Hüfte links, Arm hoch, Hüfte rechts, tief in die Knie – in der Lounge und beim Privattanz aus Petjas Sicht','Nach der Sache mit der Zwiebel ist Nastja nicht mehr sauer. Sie lacht unter Tränen, lässt Petja die Träne behalten und nennt ihn seitdem liebevoll „Zwiebel“']},
  {v:'1.99',d:'15.11.2026',t:'Steckbriefe',n:['Neu im Notizbuch: der Reiter „Figuren“ (Taste C). Zu jeder Figur, die Petja trifft, gibt es einen Steckbrief','Je mehr man mit jemandem zu tun hat, desto mehr erfährt man: erst der erste Eindruck, dann ein Stück Vergangenheit, am Ende der wahre Kern. Opa Grischa zum Beispiel war nicht immer nur der Alte vor der Ruine …','Ein Hinweis meldet sich, wenn ein neuer Absatz dazukommt']},
  {v:'1.98',d:'15.11.2026',t:'Um die Stange',n:['Nastja tanzt jetzt mitten an der Stange: beide Hände greifen über dem Kopf, ein Bein schlingt sich um die Stange, sie gleitet herab und wechselt die Seite','In der privaten Lounge steht sie gelangweilt mit einem Glas Rotwein, nippt ab und zu und zwirbelt eine Haarsträhne']},
  {v:'1.97',d:'15.11.2026',t:'An der Stange',n:['Nastja tanzt jetzt wirklich an der Stange: Sie hält sich oben und unten fest, gleitet langsam ein Stück herab, hakt das Bein um die Stange und zieht sich wieder hoch','Der Federwedel steckt dabei im Strumpfband']},
  {v:'1.96',d:'15.11.2026',t:'Die neue Nastja',n:['Nastja im Banja ist neu: blondes Wallehaar mit Haarband, dunkelrotes Korsett, Strapse, Strümpfe, Plateauschuhe, Choker, große Creolen und ein Federwedel','Strenger Pixel-Stil: 500 Pixel hoch, 20 Farben, dunkelbraune Federkontur','Sie zwinkert. Und lächelt dabei, als wüsste sie mehr als du']},
  {v:'1.95',d:'15.11.2026',t:'Nastja neu gepixelt',n:['Nastja im Banja nach den neuen Pixel-Regeln: genau 500 Pixel hoch, höchstens 20 Farben, dunkelbraune Federkontur (rundum 2 Pixel, rechts und unten 4), feine Innenlinien, Füße exakt auf dem Boden','Langes blondes Haar bis zur Hüfte, schmales Haarband, rote Lippen, weißer Fächer – und ein trockener, gelangweilter Blick statt Rouge']},
  {v:'1.94',d:'15.11.2026',t:'Tester bis zum Abspann',n:['Tester-Modus: Die Sprungpunkte gehen jetzt durch ganz Akt 3 – Ur-Spore, Pope, Weihwasser, Glut, Zwiebel, Lüftung, Träne und zuletzt alles beisammen vor Baba Jagas Hütte']},
  {v:'1.93',d:'15.11.2026',t:'20 Farben',n:['Jede Figur hat jetzt höchstens 20 Farben – klarere Flächen, echter Pixel-Look statt weicher Verläufe','Alle Bilder einer Figur (Laufen, Gesichter, Posen) teilen sich dieselbe Palette, damit beim Reden und Laufen nichts flackert','Auch die Nymphen im Sumpfwasser bleiben bei 20 Farben']},
  {v:'1.92',d:'15.11.2026',t:'Kreuz und quer getestet',n:['Für Tester: Ein zweiter automatischer Durchlauf spielt Akt 2 absichtlich in der falschen Reihenfolge (Säge vor Teer, Oma erst nach Opa, Wäscheleine vor dem Ast) und probiert Dinge aus Akt 3 zu früh (Pope wecken, Zwiebel, Pilzbeet, Lüftung). Nichts hängt sich auf, beide Wege führen bis zum Abspann'] },
  {v:'1.91',d:'15.11.2026',t:'Licht im Stollen',n:['Die Gnomlaterne hat jetzt einen Zweck: Hinten in der Höhle ist es stockdunkel, erst mit ihrem Licht findet Petja die blauen Pilze. Danach will Grobnik sie zurück, sie ist Gnom-Inventar','Der Brunnen am Dorfeingang hat wieder seinen eigenen Text, Petja läuft nicht mehr zum falschen Brunnen','Zwiebel und Träne nennen die richtige Herkunft: das Beet der Gnome, nicht Omas'] },
  {v:'1.90',d:'14.11.2026',t:'Tee bei der Hexe',n:['Bevor der Ausweg-Joint gedreht wird, setzt sich Baba Jaga noch einmal mit Petja an den Tisch. Es gibt Tee. Angeblich ist nichts drin','Vater Ignati redet im Schlaf. Und wenn er aufwacht, erzählt er, warum er eigentlich dreißig Jahre im Heu lag'] },
  {v:'1.89',d:'14.11.2026',t:'Kleine Spuren',n:['Oma Dusja erzählt gleich beim ersten Besuch von ihrem Gebiss – die ganze Geschichte mit Kater, Fisch und Angel lässt sich jetzt schon vor dem Banja erledigen. Wer den Teer dann schon hat, gibt ihn Opa direkt mit','Manchmal dringt etwas aus der echten Welt durch …','Kusmitsch hat seinen Wels doch noch gekriegt. Er hängt jetzt an der Hütte. Schau ihn dir mal genauer an','Wer genau hinsieht, findet überall Kleinigkeiten: auf Säcken, hinter der Bar, in Kisten, an Omas Fenster','Die Krähe hat wirklich gepetzt. Und Nastja hat nach der Sache mit der Zwiebel noch etwas zu sagen'] },
  {v:'1.88',d:'14.11.2026',t:'Mit Petjas Augen',n:['Die Szenen aus Petjas Sicht passen jetzt zum Rest des Spiels: Hände und Knie sind im selben Figuren-Stil gezeichnet wie Wowa, Baba Jaga und Nastja','Wowas Wohnung im Intro ist neu gemalt – Stehlampe, Wandteppich, Stoffsofa, Röhrenfernseher, Parkett, Nachtstadt vorm Fenster und eine echte Holztür','Baba Jaga fuchtelt jetzt mit knochigen Hexenfingern statt mit flachen Pfoten','Am Fischerhaus verdeckt die Schnapsflasche das Schild „Zum Ufer“ nicht mehr'] },
  {v:'1.87',d:'14.11.2026',t:'Der Gnomgarten',n:['Neuer Ort: der Gnomgarten. In der Gnomsiedlung links führt ein Schild „Zum Garten“ hinter den Zaun – dort wachsen Riesenkohl, Zwiebeln und die Pilze im Beet','Beim ersten Mal stellt sich Grobnik in den Weg. Er lässt dich dann doch rein, kommt aber mit und passt auf','Alle Gegenstände in der Tasche sind neu gemalt – mit Licht, Schatten und echtem Material wie der Rest der Welt','Neue Augenansicht (Leertaste): Glühwürmchen-Lichter statt Plaketten, Namen auf kleinen Holzbrettchen, Wege als Pfeilschilder, und was man anklicken kann, leuchtet leicht','Am Fischerhaus steht das Schild „Zum Ufer“ nicht mehr hinter der Tanne'] },
  {v:'1.86',d:'14.11.2026',t:'Selbst draufkommen',n:['Die Aufträge verraten nicht mehr gleich die Lösung: Erst steht nur Petjas Gedanke da. „Wo muss ich hin?“ zeigt den Ort, „Lösung zeigen“ erst den genauen Weg','Auch der Tipp (Glühbirne) geht jetzt diese Stufen: Gedanke, Ort, Lösung','Karte: Besuchte Orte, an denen gerade nichts zu tun ist, haben ein grünes Häkchen','Der Wels unter dem Pier ist gnädiger: Der Biss dauert länger, das grüne Band beim Drillen ist breiter, die Schnur reagiert ruhiger, 7 statt 10 Sekunden halten, und am Ende reichen 4 Treffer mit mehr Spielraum'] },
  {v:'1.85',d:'14.11.2026',t:'Aufgeräumte Taschen',n:['Festhänger behoben: Wer zuerst den Ast und dann die Wäscheleine holte, bekam nie eine Angel. Jetzt baut Petja sie in jeder Reihenfolge (auch in alten Spielständen)','Verbrauchte Werkzeuge verschwinden aus der Tasche: Die Leiter bleibt am Fenster der Hütte stehen, die Angel geht nach dem Fang kaputt, Opa nimmt seine Säge nach dem Hausbau zurück','Das Finale-Minispiel lässt sich jetzt wie alle anderen nach drei Abbrüchen überspringen','Aufgeräumt: das alte Brett aus Opas Ruine und Reste des früheren Boot-Auftrags sind weg','Für Tester: Ein automatischer Durchlauf spielt das ganze Spiel vom Intro bis zum Abspann durch und meldet, wo es hängt'] },
  {v:'1.84',d:'13.11.2026',t:'Volles Haus im Banja',n:['Kein Festhängen mehr beim Privattanz: Es gibt ihn nur einmal, und erst wenn die Zwiebel in der Lüftung steckt – vorher hat Nastja keine Zeit','Solange ist im Banja viel los: Gäste stehen um die Bühne und wedeln mit Geldscheinen. Mit der Zwiebel in der Lüftung verziehen sie sich'] },
  {v:'1.83',d:'13.11.2026',t:'Pilze pflücken',n:['Beim Einsammeln der blauen Pilze in der Höhle bückt sich Petja jetzt und pflückt sie – mit Aufheb-Animation wie bei den anderen Gegenständen'] },
  {v:'1.82',d:'13.11.2026',t:'Sägen und Bauen zum Zuschauen',n:['Statt Abblende: kleine Animation beim Sägen der Birken (Petja sägt, Sägemehl fliegt, der Stamm bricht auseinander)','Nach dem Hausbau-Minispiel drei kurze Szenen: Petja trägt Stämme und legt sie auf, deckt auf der Leiter das Dach – und knallt die Tür zu (RUMMS!). Klick überspringt eine Szene','Bessere Hinweise auf den Ast: Kusmitsch erinnert Petja an den Ast der Krähe im Birkenwald (und an die Wäscheleine), und im Birkenwald fällt Petja der Ast von selbst auf'] },
  {v:'1.81',d:'13.11.2026',t:'Schild wieder klickbar',n:['Das Schild „Zum Schmiedehof“ auf der Dorfstraße lässt sich wieder anklicken – die Wäscheleine lag darüber'] },
  {v:'1.80',d:'13.11.2026',t:'Textgröße & kein Spoiler',n:['Neu in den Einstellungen: Textgröße im Gespräch (Klein, Normal, Groß, Sehr groß) mit Vorschau','Der Tipp verrät nicht mehr den Weg durch den Irrwald – er schickt einen zu Baba Jagas Karte in den Taschen'] },
  {v:'1.79',d:'13.11.2026',t:'Einstellungen im Hauptmenü',n:['Auf dem Titelbild gibt es jetzt den Knopf „Einstellungen“: Lautstärke von Musik, Geräuschen und Stimmen, Stimmen an/aus, Sprüche und Textgeschwindigkeit – schon vor dem Spielstart'] },
  {v:'1.78',d:'13.11.2026',t:'Baba Jaga rastet aus',n:['Ende Akt 2: In der Höhle der Gnome wachsen links große blaue Traumschwämme – einsammeln und zu Baba Jaga bringen','Neue Zwischensequenz aus Petjas Sicht: Baba Jaga stapft schimpfend hin und her, kommt ganz nah ans Gesicht, fuchtelt mit den Krallenhänden – und nennt das Rezept für den Ausweg-Joint','Das Rezept kommt jetzt von Baba Jaga, der Pilzmeister zeigt nur noch auf die blauen Pilze'] },
  {v:'1.77',d:'13.11.2026',t:'Kein verschluckter Dialog',n:['Betritt man einen Ort zum ersten Mal und spricht sofort jemanden an, wartet Petjas Kommentar zum Ort jetzt, bis das Gespräch fertig ist – vorher hat er das Gespräch abgeschnitten (z. B. kam Madames Liste dann nicht an)'] },
  {v:'1.76',d:'13.11.2026',t:'Hinter dem Banja',n:['Neuer Ort: Vor dem Banja führt rechts ein Pfad in den Hinterhof – Kisten, leere Flaschen, ein Heuhaufen und die Lüftung der Lounge','Vater Ignati sitzt nicht mehr an der Bar, er schläft seit 1993 im Heu hinterm Banja: alle paar Sekunden steigt ein „Z“ auf, und man hört ihn leise schnarchen','Die Zwiebel wächst jetzt im Gemüsebeet der Gnome neben dem Riesenkohl','Die Zwiebel kommt von draußen in die Lüftung der Lounge, danach den Privattanz bei Madame buchen'] },
  {v:'1.75',d:'13.11.2026',t:'Hausbau-Minispiel',n:['Opas Haus baut man jetzt selbst – in drei Phasen an einer Hauswand von der Seite:','1. Stämme setzen: Der Stamm schwingt am Seil, im richtigen Moment klicken','2. Schälen: Mit dem Zugmesser die Rinde von den Birkenstämmen ziehen','3. Teeren: Mit dem Pinsel den Teer in die Fugen streichen','Nach drei Fehlversuchen lässt sich das Minispiel überspringen, „Später“ geht jederzeit'] },
  {v:'1.74',d:'13.11.2026',t:'Wäscheleine statt Netz',n:['Die Wäscheleine ersetzt das alte Fischernetz ganz: Man kann sie jederzeit mitnehmen, so wie früher das Netz'] },
  {v:'1.73',d:'13.11.2026',t:'Wäscheleine klickbar',n:['Die Wäscheleine auf der Dorfstraße lässt sich jetzt überall anklicken – vorher hat Galjas Haus die Klicks abgefangen'] },
  {v:'1.72',d:'13.11.2026',t:'Opas Birken',n:[
    'Opas Säge gibt es erst nach dem Banja: An der Birkensperre fällt Petja ein, dass Opa eine haben könnte',
    'Die Birken am Sumpfweg sind Opas Bauholz. Erst bekommt Opa den Teer (Oma, Gebiss, Kater …), dann darf gesägt werden – sonst pfeift er Petja zurück',
    'Sägen, Stämme schleppen, Haus bauen: Opas neues Haus besteht aus den Birkenstämmen, das Brett ist weg',
    'Die Angelschnur kommt jetzt von Tante Galjas Wäscheleine, die gut sichtbar rechts auf der Dorfstraße hängt (statt vom Fischernetz)'] },
  {v:'1.71',d:'13.11.2026',t:'Opas Säge',n:[
    'Die Säge kommt jetzt von Opa Grischa: rostig, aus dem Ofen seiner Brandruine – gegen das Versprechen, ihm das Haus wieder aufzubauen',
    'Schmied Fjodor schärft die Säge auf Pump. Die offene Rechnung wird in Akt 3 fällig',
    'Wer mit Opas Säge ohne Hausbau in den Sumpf abhauen will, wird zurückgepfiffen: „Ey, wo willst du hin?!“',
    'Opas neues Haus: Bauholz von den Birken, das Brett vom Ofen, Omas Teer fürs Dach – und das Dorf hat ein Haus mehr',
    'Der Fischer hat keine Säge mehr (warum auch?) und schickt Petja zu Opa'] },
  {v:'1.70',d:'13.11.2026',t:'Akt 3: Der Ausweg-Joint',n:[
    'Neues Rezept vom Pilzmeister: Ur-Spore, geweihte Glut und eine echte Nymphenträne – dazu der Filter vom alten Joint',
    'Ur-Spore: Pilzbeet bei den Gnomen – goldene Pilze pflücken, bevor sie verschwinden (Minispiel)',
    'Neue Figuren: Vater Ignati, der Pope (seit 1993 „in der Stadt“ …), und Schmied Fjodor mit seiner ungeweihten Esse',
    'Die Träne: Omas schärfste Zwiebel, die Lüftung der Lounge und ein Privattanz, bei dem Nastja zum ersten Mal seit dreihundert Jahren weint',
    'Finale: Ausweg-Joint am Tisch der Hexe bauen (Minispiel), anzünden – und dann … Abspann',
    'Aufträge zeigen die neuen Schritte mit Hinweisen; alte Spielstände bekommen Phiole und Filter automatisch'] },
  {v:'1.69',d:'13.11.2026',t:'Seitenwege gerade',n:[
    'Die Seitenwege laufen jetzt gerade quer ab, hinter den vorderen Häusern statt durch sie hindurch',
    'Dorfstraße: Kirche links, Schmiedehof rechts – passend dazu, wo man ankommt'] },
  {v:'1.68',d:'13.11.2026',t:'Neues Titelbild, Augenansicht, Symbole, lebendiges Dorf',n:[
    'Titelbild: der gemalte Birkenwald aus dem Spiel in der Dämmerung – Mond, ziehender Nebel, Glühwürmchen und blinzelnde Augen im Unterholz, Ornamentband unter dem Titel',
    'Augenansicht (Leertaste / Auge): alles Klickbare leuchtet warm auf, dazu Messing-Medaillons mit Symbol – Auge zum Ansehen, Person zum Reden, Hand zum Nehmen, roter Pfeil für Ausgänge',
    'Alle Emojis in Menüs, Reitern, Meldungen, Einstellungen und Aufträgen durch einheitliche gravierte Symbole ersetzt',
    'Dorf und Dorfstraße lebendiger: Häuser unterschiedlich groß und verschieden weit von der Straße, Birken und Büsche dazwischen',
    'Abzweigende Wege: im Dorf links zur Mühle, in der Dorfstraße links zur Kirche und rechts zum Schmiedehof – mit Wegweisern an den Abzweigungen'] },
  {v:'1.67',d:'13.11.2026',t:'Dorf wie ein echtes Dorf',n:[
    'Die Häuser stehen jetzt in Reihen links und rechts der Straße, mit Abstand zueinander und hinter Lattenzäunen – und werden zur Kirche hin gleichmäßig kleiner',
    'Alles wird in Metern platziert (Abstand zur Straßenmitte, Entfernung) und daraus perspektivisch richtig gezeichnet',
    'Omas Vorgarten mit Sonnenblumen, Wäscheleine und offenem Gartentor; das LADEN-Schild ist jetzt lesbar'] },
  {v:'1.66',d:'13.11.2026',t:'Neue Baba Jaga, Dorf in echter Größe',n:[
    'Baba Jaga komplett neu gezeichnet: gebückt, lange Hakennase mit Warze, ein einzelner Zahn, wilde graue Strähnen unter dem gepunkteten Kopftuch, weinrotes Kleid mit geflickter Schürze, Fußwickel und Bastschuhe – und sie winkt Petja mit krummem Finger heran',
    'Dorf und Dorfstraße: Häuser, Zäune, Brunnen, Masten und Sonnenblumen haben jetzt echte Größen im Verhältnis zu Petja (eine Izba ist gut zweieinhalbmal so hoch wie er)',
    'Man steht jetzt mitten auf der Straße: links und rechts ein großes Haus, dahinter reihen sich die Häuser bis zur Kirche',
    'Klickflächen passen sich automatisch an die neuen Häuser an',
    'Alle Figuren-Arrays in pixel/ neu aus dem aktuellen Spiel exportiert (vorher teils alte Fassungen, z. B. Oma ohne Karikatur) – kompakt mit 17–40 Farben'] },
  {v:'1.65',d:'13.11.2026',t:'Petja: Schultern und Hals',n:[
    'Petjas Schultern fallen jetzt glatt ab – keine runden Schulterkugeln mehr am Ärmelansatz',
    'Hals und V-Ausschnitt haben dieselbe Hautfarbe wie die Hände (kein dunkler Streifen mehr)',
    'Alle Figuren-Arrays in pixel/ im neuen Kompaktformat: 18–40 Farben je Figur + Lauflängen, zusammen 0,26 MB statt 3 MB (alte Fassungen liegen in pixel/alt/)'] },
  {v:'1.64',d:'12.11.2026',t:'Nymphen im neuen Stil',n:[
    'Die sechs Sumpf-Nymphen sind jetzt Cel-Sprites wie alle anderen Figuren: braune Federkontur, weiche Airbrush-Schatten, gleiche Pixeldichte wie Petja',
    'Aussehen 1:1 wie vorher: gleiche Posen, Haare, Augen, Lippen, Wunden, Algen, Perlen, Blasen und Schädel',
    'Unter Wasser werden sie in Stufen trüb, an der Wasserlinie glänzt ein heller Saum',
    'Neu als Arrays in pixel/: nymphe_nastja, _marfa, _ustinja, _fekla, _glafira, _alte (Pixel für Pixel wie im Spiel)'] },
  {v:'1.63',d:'12.11.2026',t:'Großer Apfelbaum',n:[
    'Der Apfelbaum an der Weggabelung ist jetzt fast doppelt so hoch und überragt Petja: höherer Stamm, mehr Äste, breite Krone mit mehr Äpfeln',
    'Der Apfel hängt jetzt unten in der Krone – Petja springt danach'] },
  {v:'1.62',d:'12.11.2026',t:'Aufträge mit Notizen',n:[
    'Jeder offene Schritt in den Aufträgen hat jetzt eine Notiz: was genau zu tun ist, wo und bei wem',
    'Der „Nächster Schritt“-Kasten zeigt die Notiz direkt mit, und der Tipp-Knopf (H) sagt sie beim zweiten Drücken laut',
    'Notizen passen sich an: z. B. „Krähe mit dem Apfel bewerfen“, sobald man einen Apfel hat',
    '„Den Wegezoll besorgen“ heißt jetzt „Mehl vom Müller besorgen“',
    'Der Steg heißt jetzt überall Pier'] },
  {v:'1.61',d:'12.11.2026',t:'Saubere Klickflächen',n:[
    'Petja steht nicht mehr im Weg: Man klickt durch ihn hindurch auf alles, was hinter ihm liegt (z. B. den Apfel)',
    'Keine wilden gelben Umrisse mehr beim Drüberfahren – der Name am Mauszeiger zeigt, was man anklickt',
    'Klickflächen korrigiert: Der See verdeckt den Fischer und den Steg nicht mehr, Ziehbrunnen im Dorf, Steg am Ufer und Apfelbaum passen jetzt zur Grafik',
    'Irrwald erst nach Baba Jaga: Vorher weigert sich Petja und sagt, dass er erst zur Hexe muss'] },
  {v:'1.60',d:'12.11.2026',t:'Echte Hand & Autosave',n:[
    'Im Intro hält Petja den Joint jetzt mit einer richtigen Hand: Daumen und Zeigefinger klemmen ihn, die anderen Finger sind eingerollt, dazu Fingernägel, Knöchel und der Ärmel vom Pulli',
    'Autosave speichert jetzt nicht nur beim Ortswechsel, sondern bei jedem Fortschritt (Gegenstand, Auftrag, Gespräch), alle 20 Sekunden und beim Schließen des Tabs',
    'Unten rechts erscheint kurz „💾 gespeichert“'] },
  {v:'1.59',d:'12.11.2026',t:'Intro mit Geräuschen',n:[
    'Keine Musik mehr in der Anfangs-Zwischensequenz – stattdessen Wohnungs-Geräusche: Kühlschrank brummt, Uhr tickt, draußen fahren Autos',
    'Wowa stapft durch den Flur und reißt die Tür auf – sie knallt gegen die Wand und zittert nach',
    'Man hört Petja am Joint ziehen (Glut knistert), ausatmen und husten',
    'Der Rausch dröhnt und pocht wie ein Herzschlag, dann stürzt alles ins Schwarze; beim Aufwachen klingeln die Ohren und der Wald wird hörbar'] },
  {v:'1.58',d:'12.11.2026',t:'Birkenfüße',n:[
    'Der Fuß der Birken sieht nicht mehr aus wie eine dunkle Socke: grau-schwarze, quer aufgerissene Borkenplatten, die nach oben fleckig in die weiße Rinde übergehen',
    'Grashalme wachsen vor den Stämmen – die Bäume stehen im Gras statt darauf'] },
  {v:'1.57',d:'12.11.2026',t:'Echter Birkenwald',n:[
    'Birkenwald und Weggabelung im selben realistischen Stil wie Apfel und Fischernetz: Licht von rechts oben, echtes Material, Kontaktschatten',
    'Birken: runder Stamm mit Licht- und Schattenseite, papierne Rinde mit feinen Querstrichen, schwarze rissige Borkenbänder, Astnarben, abblätternde Rindenlocken und ein dunkler, zerfurchter Stammfuß mit Moos',
    'Laub aus einzelnen spitzen Birkenblättern, im Gegenlicht leuchtend; hängende Zweige mit Blättern',
    'Der Weg ist jetzt festgetretene Erde mit Fahrspuren, feuchten Stellen und Körnung, Kiesel mit Glanz und Schatten, echte gelbe Birkenblätter',
    'Apfelbaum mit rissiger Borke, glänzenden Blättern, Äpfeln mit Rotbacke und Stiel und Fallobst im Gras'] },
  {v:'1.56',d:'12.11.2026',t:'Petja packt mit an',n:[
    'Aufheben ist jetzt eine echte Bewegung: Petja dreht sich zum Gegenstand, geht in die Knie und bückt sich, greift auf Brusthöhe zu oder streckt sich nach oben',
    'Liegt etwas hinter ihm, hebt er es mit dem Rücken zur Kamera auf – er schaut immer in die Richtung, in der er gerade etwas tut',
    'Der Gegenstand verschwindet im Moment des Zugreifens aus der Szene, liegt kurz in seiner Hand und wandert dann in die Hosentasche',
    'Werfen: Petja holt den Apfel aus der Hosentasche, holt weit aus und wirft – der Apfel fliegt im Bogen zur Krähe',
    'Am Ast springt er dreimal hoch, bis er ihn zu fassen kriegt'] },
  {v:'1.55',d:'12.11.2026',t:'Alle Figuren neu gezeichnet',n:[
    'Jede Figur hat jetzt eine eigene Haltung, Falten, Schatten auf der Kleidung und ein Gesicht mit Ausdruck – im Stil der handgezeichneten Zeichentrick-Figuren',
    'Fischer Kusmitsch: hager, Uschanka, langer grauer Bart, flickt das Netz mit Papirossa im Mund',
    'Opa Grischa: gebeugt mit O-Beinen, Kepka, Telnjaschka unter der Steppjacke, Flicken am Knie, Schnapsflasche',
    'Oma Dusja: gebückt, rotes Punkte-Kopftuch, Strickjacke, bestickte Schürze, Filzstiefel',
    'Baba Jaga: Hakennase mit Warze, ein Zahn, wildes graues Haar, Knotenstock, Lockfinger, Bastschuhe mit Fußlappen',
    'Gnome: Grobnik als massiger Raufbold mit Spitzhacke, Schnobbel mit Hängenase, Brille, Pfeife und Ringelstrümpfen',
    'Wowa im Trainingsanzug mit Kepka, Goldkette, Goldzahn und Sonnenblumenkernen; Madame Zinaida mit Hochsteckfrisur, Federboa und Zigarettenspitze; die Tänzerin im Glitzer-Korsett; der Kater mit gelben Schlitzaugen'] },
  {v:'1.54',d:'12.11.2026',t:'Petja von hinten, echte Gegenstände',n:[
    'Petja von hinten: Haare reichen bis in den Nacken (ausgefranster Haaransatz, Wirbel), kein kahles „Kinn“ mehr; Gesäßtaschen an der Jeans',
    'Alle Gegenstände realistisch: Apfel mit Glanz und Blatt, zappelnde Regenwürmer mit Ringen im krümeligen Erdhaufen, Netz mit Korkschwimmern, Schnapsflasche aus Glas mit Etikett, angekohlte Leiter und Brett, Gebiss, Joint mit Glut',
    'Mühlrad aus Holz mit Eisennabe und Moos, Angelschnur mit Metallhaken, Netzgestell beim Fischer mit geknoteten Maschen',
    'Fliegenpilz mit Lamellen, Manschette und plastischen Flocken; Baumstumpf mit Borke, Jahresringen und Rissen; Mühle mit Feldsteinsockel, Schindeldach und echten Fenstern'] },
  {v:'1.53',d:'12.11.2026',t:'Echte Häuser',n:[
    'Alle Gebäude neu gemalt: runde Blockbalken mit Werg in den Fugen, Rissen, Ästen und Hirnholz-Köpfen an den Ecken; Steinfundament',
    'Schindeldächer mit Überlappung, Schatten und Moos; Baba Jagas Hütte mit dichtem Strohdach, Steinschornstein und echten Hühnerbeinen (Federn, Hornschuppen, Krallen)',
    'Kirche: vergoldete Hauptkuppel mit Spiegelung, Nebenkuppeln aus Espenschindeln, Glocke aus Bronze, Ikone über dem Portal',
    'Fenster mit Tiefe, Himmelsspiegelung, Sprossen und geschnitzten, abblätternden Rahmen; Licht von der Sonne der Szene, Regenschlieren und Spritzwasser an den Wänden',
    'Banja, Dorf, Fischerhütte, Schmiede und Brandruine im selben Stil; Holzwände in den Innenräumen sind wieder da'] },
  {v:'1.52',d:'12.11.2026',t:'Neuer Hand-Zeiger',n:[
    'Über allem Anklickbaren erscheint jetzt das eigene Hand-Design als Mauszeiger – im Menü und im Spiel'] },
  {v:'1.51',d:'12.11.2026',t:'Der Sumpf wird realistisch',n:[
    'Tiefes, dunkles Wasser, das Ufer, Schilf und Bäume echt spiegelt – mit Wellen, Glanzstreifen und Funkeln, ohne harte Umrandung; Ufergras hängt über die Kante',
    'Dichte goldene Schilfwände mit Rohrkolben, im Gegenlicht leuchtend – auch am See und beim Fischer',
    'Sonniges Lichtband am anderen Ufer vor dunklem Wald, warmes Gegenlicht und weicher Schein auf hellen Stellen',
    'Herbstliche Farne, Seerosenblätter mit Kerbe und Glanzrand, Seerosen mit vielen Blütenblättern',
    'Steine überall realistischer: unregelmäßige Form, Körnung, Risse, Facetten, Moospolster'] },
  {v:'1.50',d:'12.11.2026',t:'Realistischeres Holz & Häuser, Hand-Zeiger repariert',n:[
    'Die Hand erscheint jetzt auch im Spiel über Personen und Gegenständen – nicht nur im Menü',
    'Neue Hand: hell, kräftige Finger, abgespreizter Daumen, warme braune Kontur',
    'Alles Holz im Spiel hat echte Maserung mit Jahresringen, Fasern und Ästen; Balken sind plastisch gerundet',
    'Hausdächer aus einzelnen verwitterten Brettern mit Fugen; Schatten unter Dachüberstand und Giebelbrettern; Fenster mit Tiefe und Spiegelung'] },
  {v:'1.49',d:'12.11.2026',t:'Neuer Ort: der Schmiedehof',n:[
    'Hinter der Dorfstraße liegt jetzt ein Schmiedehof – das Kirchenschild hat ein neues Brett „Zum Schmiedehof“',
    'Schmiede aus Rundholz mit geschnitztem Giebelpferd, glühender Esse und Rauchfang, Amboss, Hufeisen über der Tür',
    'Strohdach-Unterstand mit Heuhaufen, Fass, Brunnen mit Dach, Holzstapel und Flechtzaun unter blauem Himmel',
    'Alles lässt sich ansehen; eigene Sprüche, Ambiente mit Hammerschlägen, Eintrag auf der Karte'] },
  {v:'1.48',d:'12.11.2026',t:'Petjas Hand als Klick-Zeiger',n:[
    'Über allem Anklickbaren zeigt jetzt Petjas eigene Hand mit dem Zeigefinger – in seinen Hautfarben, mit Tuschekontur wie die Figur'] },
  {v:'1.47',d:'12.11.2026',t:'Eigene Mauszeiger',n:[
    'Normaler Mauszeiger: ein Pfeil aus gewölbtem Gold mit Glanzlicht',
    'Über allem Anklickbaren (Personen, Gegenstände, Knöpfe, Taschen …): eine zeigende Hand im weißen Handschuh mit Goldmanschette',
    'Über Ausgängen weiterhin der rote Lackpfeil'] },
  {v:'1.46',d:'12.11.2026',t:'Realistische Pfeile',n:[
    'Neuer Ausgangs-Mauszeiger: ein gerenderter Pfeil in rotem Lack mit gewölbtem Goldrand und Glanzlicht',
    'Derselbe Pfeil im Namensschild an Ausgängen, beim Zeigen (Leertaste), auf „Weiterspielen“, in der Anleitung und als „weiter“-Zeichen in der Dialogbox'] },
  {v:'1.45',d:'12.11.2026',t:'Realistischere Gegenstände & Materialien',n:[
    'Gegenstände echt gerendert: Holzmaserung, gebürstetes Metall, Papier, Sackleinen, Glas – mit 3D-Licht und Glanzlichtern statt Comic-Konturen',
    'Knöpfe aus gebürstetem Messing, Fenster in gewölbten Messingrahmen mit Eckrosetten',
    'Gemasertes Holz an Leiste, Taschen und Reitern, erhabenes Gold-Ornament',
    'Gegenstände im Tagebuch und in den Taschen größer'] },
  {v:'1.44',d:'12.11.2026',t:'Neue Oberfläche: Holz & Messing',n:[
    'Alle Gegenstände sind jetzt gemalte Bilder statt Emojis – mit Glanzlichtern, Schatten und Kontur',
    'Knöpfe überall als gewölbte Messingplatten, Hauptknöpfe in rotem Lack mit Goldrand',
    'Fenster, Dialogbox und Tagebuch: dunkles Lackfach in Goldrahmen mit geschnitztem Holzrand und Ornamentband',
    'Leiste oben rechts mit gravierten Messing-Symbolen, Taschen als geschnitzte Leiste mit Samtfächern',
    'Titelbild mit goldener Schrift'] },
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
  const b=document.createElement('button');b.id='bNews';b.innerHTML=ic('news')+' Neuigkeiten'+(isNew?' <em class="newtag">NEU</em>':'');tb.insertBefore(b,tb.querySelector('.tsub'));
  const card=document.createElement('div');card.id='newsCard';card.innerHTML=`<small>${isNew?'NEU · ':''}Version ${L.v} · ${L.d}</small><b>${L.t}</b><ul>${L.n.slice(0,3).map(x=>`<li>${x}</li>`).join('')}</ul><span>Alle Neuigkeiten ansehen ›</span>`;st.appendChild(card);
  const open=e=>{e.stopPropagation();try{localStorage.setItem('petjaPatch',L.v)}catch(e){}b.innerHTML=ic('news')+' Neuigkeiten';card.querySelector('small').textContent=`Version ${L.v} · ${L.d}`;
    openO(`<div class="pan news"><button class="x" title="Schließen (ESC)">${ic('close')}</button><h3>${ic('news')} Neuigkeiten</h3>${PATCH.map((p,i)=>`<div class="pn ${i==0?'latest':''}">
      <div class="pnh"><b>${p.t}</b><span>v${p.v} · ${p.d}</span></div><ul>${p.n.map(x=>`<li>${x}</li>`).join('')}</ul></div>`).join('')}</div>`,'newsO')};
  b.onclick=open;card.onclick=open})();
