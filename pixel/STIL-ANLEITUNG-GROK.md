# Stil-Anleitung: Figuren für „Petja-Quest“

Diese Anleitung ist für eine KI (z. B. Grok) gedacht, die neue Figuren oder neue Posen im Stil des Spiels zeichnen soll.
Erst lesen, dann zeichnen. Die Regeln unter „Harte Regeln“ sind Pflicht.

---

## 1. Der Look in einem Satz

Handgezeichneter **Zeichentrick-Cel** wie in osteuropäischen Flash-Adventures der 2000er (Richtung „Недетские сказки“):
**Karikatur-Figuren** mit dunkelbrauner Federkontur, wenigen, leicht gedämpften Farbflächen und weicher Schattierung, Licht von links oben.
Am Ende wird alles auf **höchstens 20 Farben** reduziert. Das ergibt klare Flächen mit 3–4 Helligkeitsstufen pro Material, keine Fotorealistik, keine Verläufe über die ganze Figur.

## 2. Harte Regeln

| Regel | Wert |
|---|---|
| Farben pro Figur | **max. 20**, inklusive Konturfarbe. Transparenz zählt nicht. |
| Konturfarbe (Tusche) | **#2e1c10** (dunkles Braun, nie reines Schwarz) |
| Hintergrund | **transparent**, kein Boden, kein Schlagschatten |
| Höhe | Erwachsene **500 px** (Scheitel bis Schuhsohle). Kleinere Wesen proportional kleiner. Nymphen (nur Oberkörper über dem Wasser): **213 px** |
| Breite | so schmal wie möglich, leere Spalten links/rechts abschneiden |
| Ansicht | frontal oder leicht schräg (max. ¾), Figur steht, Füße auf der untersten Zeile |
| Pixel | harte Pixel, **kein Anti-Aliasing gegen den Hintergrund**: jedes Pixel ist entweder voll deckend oder ganz transparent |
| Licht | von **links oben**. Rechts und unten wird es dunkler. |

## 3. Kontur (das Wichtigste am Stil)

- Außenkontur rund um die ganze Figur: **2 px** in #2e1c10.
- Auf der **Schattenseite (rechts und unten)** ist die Außenkontur **3–4 px** dick, also ungleichmäßig wie mit einer Feder gezogen.
- Innenlinien (Falten, Knöpfe, Finger, Augenlider): **1 px**, dieselbe Farbe oder ein dunkler Ton des jeweiligen Materials.
- Dicke farbige Striche (Haarsträhnen, Stab, Gürtel) sind keine Kontur, sondern eigene Farbflächen.

## 4. Schattierung

- Jede Farbfläche (Hemd, Hose, Haut, Haar …) bekommt **3, höchstens 4 Töne**: Licht, Grundton, Schatten, eventuell tiefer Schatten.
- Die Übergänge innerhalb einer Fläche sind weich gestuft wie Airbrush, aber eben nur in diesen 3–4 Stufen.
- Zwischen verschiedenen Materialien gibt es **keine** Übergänge: harte Kante, meist mit 1-px-Innenlinie.
- Die Farben sind etwas **entsättigt** (etwa 80 % der „reinen“ Farbe). Nichts ist knallig, auch Rot und Türkis nicht.
- Kein Glanz, keine Lichtkanten, kein Rim-Light. Höchstens ein kleiner Glanzpunkt in Augen oder auf Glas.

So verteilen sich 20 Farben typischerweise:
`1 Kontur + Haut (3) + Haar (3) + Oberteil (4) + Hose/Rock (3) + Schuhe (2) + Details (Augen, Mund, Knöpfe) (3–4)`

## 5. Figuren-Design

- **Karikatur, nicht niedlich:** übertriebene Proportionen, die zum Charakter passen. Petja ist lang und dünn mit hängenden Schultern, die Oma ist klein und rund, der Fischer bullig mit Bauch.
- Gesichter: schmale Augen, kräftige Nase, trockener Ausdruck. Eher müde, misstrauisch oder verschmitzt als fröhlich.
- Kleidung: postsowjetischer Alltag, abgetragen, Flicken erlaubt. Kopftücher, Ballonmützen, Gummistiefel, Kittelschürzen, Streifenhemden.
- Hände: 4–5 Finger, deutlich gezeichnet, eher etwas zu groß.

## 6. Beispiel-Palette (Petja, 21 Farben)

```
Kontur  #2e1c10
Haut    #d3a679  #b78e66  #9e7a57
Haar    #845e38  #67482a  #533920
Hemd    #4cb4ae  #3aa49d  #389791  #318782  #277873  #1e625e
Jeans   #b0bed8  #8d98ae  #7687ab
Schuhe  #f2f0e9  #d1cfc7  #b7b5af  #99968f  #66645e
```

Die Hemdfarbe hat hier mehrere Stufen, weil das Hemd die größte Fläche ist. So darf man gewichten: große Flächen bekommen mehr Töne, kleine weniger.

## 7. Liefern als Bild (PNG)

- PNG mit Alphakanal, transparenter Hintergrund, genau die Höhe aus Abschnitt 2.
- Nicht hochskaliert, nicht weichgezeichnet. 1 Spielpixel ist genau 1 Bildpixel.
- Vor dem Abgeben nachzählen: höchstens 20 verschiedene deckende Farben.

## 8. Liefern als Array (JSON, wie die Dateien in `pixel/`)

```json
{"name":"figur_name",
"width":139,"height":500,"format":"rle",
"info":"Pro Zeile: Zeichen + Anzahl (ohne Zahl = 1). \".\" = transparent, fehlendes Zeilenende = transparent.",
"palette":{".":null,"K":"#2e1c10","A":"#d3a679","B":"#b78e66"},
"rows":[
".64K10",
".61K16",
".60K5A2B6K6"
]}
```

- `palette`: ein Zeichen pro Farbe. `"."` = transparent (null). **`"K"` ist immer die Konturfarbe #2e1c10.** Höchstens 20 Einträge außer `"."`.
- `rows`: genau `height` Zeilen, von oben nach unten. Jede Zeile besteht aus Lauflängen: Zeichen plus Anzahl, ohne Zahl bedeutet 1.
  `".60K5A2B6K6"` heißt: 60× transparent, 5× Kontur, 2× A, 6× B, 6× Kontur, der Rest der Zeile ist transparent.
- Die Summe einer Zeile darf `width` nicht überschreiten.

## 9. Checkliste vor dem Abgeben

- [ ] höchstens 20 Farben, Kontur ist #2e1c10
- [ ] Außenkontur 2 px, rechts und unten dicker
- [ ] Licht von links oben, 3–4 Töne pro Material, Farben leicht gedämpft
- [ ] transparenter Hintergrund, keine halbtransparenten Randpixel
- [ ] richtige Höhe (500 px bzw. 213 px bei Nymphen), Füße unten
- [ ] Karikatur mit trockenem Ausdruck, nicht niedlich, nicht realistisch

---

## Fertiger Prompt zum Reinkopieren

> Zeichne eine Spielfigur für ein 2D-Point-and-Click-Adventure im Stil osteuropäischer Flash-Spiele der 2000er: handgezeichneter Zeichentrick-Cel, Karikatur mit übertriebenen Proportionen und trockenem, leicht mürrischem Ausdruck.
> Dunkelbraune Federkontur (#2e1c10), außen 2 px, auf der rechten und unteren Seite dicker (3–4 px), Innenlinien 1 px.
> Licht von links oben, jede Farbfläche nur 3–4 weich gestufte Töne, Farben leicht entsättigt, kein Glanz, kein Rim-Light.
> Insgesamt höchstens 20 Farben inklusive Kontur. Harte Pixel ohne Anti-Aliasing, transparenter Hintergrund, kein Boden, kein Schatten.
> Figur frontal stehend, Füße auf der untersten Bildzeile, genau 500 px hoch, Breite so schmal wie möglich.
> Figur: **[hier beschreiben, z. B. „alter Dorfpolizist, dicker Bauch, zu kleine Uniformmütze, Schnurrbart, Gummistiefel“]**
