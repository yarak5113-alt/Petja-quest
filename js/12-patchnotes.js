// ================= Patch Notes (Startmenü) =================
// Neues Update? Einfach OBEN einen Eintrag ergänzen. v muss eindeutig sein – daran erkennt das Spiel, ob der Spieler die Notes schon kennt.
const PATCH=[
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
