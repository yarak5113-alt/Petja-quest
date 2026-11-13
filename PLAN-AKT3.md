# Akt 3 – Das Finale (Masterplan)

Verbindlicher Plan für Akt 3 und den roten Faden des Spiels. Stand: 13.11.2026.

## Übergang aus Akt 1

- Am Ende von Akt 1 klärt Baba Jaga Petja auf: Er muss **blaue Pilze** als Basis finden.
- Bringt er sie zurück, stellt Baba Jaga fest, dass der Trip viel zu tief sitzt.
- Dann gibt sie ihm das Rezept für den finalen **„Ausweg-Joint“**, das Gegengift.

## Die drei Zutaten

Der Spieler kann sie in beliebiger Reihenfolge besorgen.

### 1. Die Ur-Spore – bei den Gnomen

- **Aufgabe:** Petja geht noch einmal zu den Gnomen, die er aus Akt 2 kennt.
- **Umsetzung:** Keine neue, riesige Höhle. Stattdessen gibt es ein kurzes, knackiges **Pilzbeet-Minispiel** direkt bei den Gnomen. Dabei erntet Petja die pure Essenz.

### 2. Die glühende Kohle – über Kirche und Schmiede

- **Kirche:** Petja entdeckt die Kirche und findet einen verstaubten Zettel von 1993 („Kollege kommt gleich wieder …“). Er muss den verpeilten Popen draußen in der Welt finden und zurückbringen.
- **Belohnung:** Als Dank bekommt Petja vom Popen das **Weihwasser**.
- **Schmiede:** Petja bringt das Weihwasser zum Schmied. Damit begleicht er seine alte „Schuld“ bzw. den offenen Gefallen. Der Schmied gibt ihm dafür die **glühende Kohle** (oder ein Spezialwerkzeug), mit der Baba Jaga den Joint anzündet.

### 3. Die Zwiebel-Träne – im Stripclub (Banja)

- **Aufgabe:** Baba Jaga braucht die Träne der Nymphe, die dort als Top-Tänzerin arbeitet. Die hat keinen Grund zu weinen, also muss Petja tricksen.
- **Umsetzung:**
  1. Petja besorgt im Dorf eine extrem scharfe **Zwiebel**.
  2. Er schmuggelt sie in die **Lüftung der Privatkabine**.
  3. Er bucht einen **privaten Lap Dance**.
  4. Vom Zwiebelgeruch fängt sie an zu heulen, und Petja sammelt die Tränen im **Fläschchen** ein.

## Das Finale: Crafting und Loop

1. Petja hat alle Zutaten zusammen: **Papierfilter** vom alten Joint, **Ur-Spore**, **Schmiede-Glut** und **Nymphen-Träne**.
2. Zurück an Baba Jagas Tisch spielt er das finale **Crafting-Minispiel**.
3. Er zündet den Joint an. Bumms, Cutscene-Loop zurück an den Anfang, dann der **Abspann**.

## Design-Regeln

- **Spielzeit:** Mit diesem Aufbau dauert das Spiel 75–90 Minuten. Das ist ein runder Indie-Point-and-Click ohne Längen.
- **Kein Frust beim Haus:** Versucht Petja, den Opa mit dem abgebrannten Haus und der rostigen Säge zu betrügen und ohne Hausbau abzuhauen, pfeift ihn der Opa humorvoll zurück („Ey, wo willst du hin?!“).
- **Charakter-Biografien (optional, später):** Gestufte Biografien im Journal, die man durch mehrfaches Anklicken der Figuren freischaltet. Sie dürfen den Hauptfluss nicht stören.

---

## Abgleich mit dem aktuellen Spiel (Stand 1.69)

Was schon da ist und wo der Plan vom Spiel abweicht. Vor dem Umsetzen klären.

| Thema | Im Spiel heute | Laut Plan |
|---|---|---|
| Rezept / Zutaten | Baba Jaga verlangt **Nymphen-Träne, schwarze Krähenfeder, Saft der ältesten Birke** (Aufträge in `js/09-menue-speichern.js`, Dialog in `js/07-objekte.js`) | **Ur-Spore, glühende Kohle, Zwiebel-Träne** (+ Papierfilter). Feder und Birkensaft fallen weg. |
| Blaue Pilze | Vorhanden: Joint zerlegen → 9 blaue Pilze → Baba Jaga schickt Petja zum Pilzmeister der Gnome | Passt |
| Gnome / Höhle | Es gibt schon eine **Höhle mit Stollen und Pilzmeister** (Pilzlabor, Wegezoll) | Ur-Spore per Pilzbeet-Minispiel bei den Gnomen, keine neue Höhle. Die vorhandene Höhle kann bleiben. |
| Kirche | Holzkirche abgeschlossen, Zettel „Pope in der Stadt. Zurück bald.“ **datiert 1993** | Passt. Fehlt noch: Popen suchen, zurückbringen, Weihwasser. |
| Schmiede | Schmiedehof mit Esse und glühender Kohle vorhanden | Fehlt noch: Schuld beim Schmied, Tausch Weihwasser → Kohle |
| Banja / Tänzerin | Banja und Tänzerin vorhanden | Fehlt noch: Zwiebel, Lüftung, Privatkabine, Fläschchen |
| Finale | Kein Crafting-Finale, kein Loop, kein Abspann | Alles neu |
| Opa ruft zurück | Nicht gefunden | Neu (umgesetzt in 1.71) |

## Umsetzungsstand (Version 1.70)

Umgesetzt in `js/20-akt3.js` (plus Anpassungen in `07-objekte.js`, `09-menue-speichern.js`, `04-intro-muehle-banja.js`):

- [x] Rezept vom Pilzmeister umgestellt (Ur-Spore, geweihte Glut, echte Träne + Papierfilter); Phiole und Filter kommen automatisch, auch bei alten Spielständen
- [x] Ur-Spore: Pilzbeet bei den Gnomen mit Minispiel (5 goldene Pilze in 40 s, max. 3 falsche; nach 3 Fehlversuchen überspringbar)
- [x] Kirche → Pope: Vater Ignati sitzt seit 1993 an der Bar im Banja, kommt zurück zur Kirche, gibt Weihwasser
- [x] Schmiede: Schmied Fjodor (neue Figur) – die Weihe seiner Esse war die alte Schuld des Popen; Weihwasser → Glut in der Dose
- [x] Zwiebel-Träne: Omas Zwiebel → Privattanz bei Madame buchen → Zwiebel in die Lounge-Lüftung → Nastja weint → Träne in die Phiole
- [x] Finale: Crafting-Minispiel am Tisch (Filter → Ur-Spore → Träne → rollen → mit der Glut anzünden), Lichtblitz, Loop zurück auf Wowas Sofa, Abspann
- [x] Aufträge mit allen neuen Schritten und Hinweisen

Offen:

- [x] Opas Säge und Opas Haus (1.72, `js/21-opa-haus.js`): Erst nach dem Banja denkt Petja an der Birkensperre an Opa. Opa leiht die rostige Säge, aber die Birken am Sumpfweg sind sein Bauholz. Schmied Fjodor schärft die Säge auf Pump (Schuld wird in Akt 3 mit dem Weihwasser beglichen). Opa will erst Teer (Oma, Gebiss, Kater, Fisch, Angel mit Schnur von Tante Galjas Wäscheleine). Sägt Petja vorher, pfeift Opa ihn zurück („Ey, wo willst du hin?!“). Mit dem Teer gibt Opa die Birken frei: Sägen macht den Weg frei, aus den Stämmen wird Opas Haus. Kein Brett, kein Fischernetz, kein Boot-Auftrag mehr.
- [ ] Optionale Charakter-Biografien im Journal
