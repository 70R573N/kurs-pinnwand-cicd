# Kurs-Pinnwand

Dieses Mini-Projekt ist für den Git- und GitHub-Einstieg gedacht.

Online:

- Repository: <https://github.com/stoykow/kurs-pinnwand-cicd>
- Veröffentlichte Seite: <https://stoykow.github.io/kurs-pinnwand-cicd/>

Die Idee:

- Eine einfache Webseite zeigt Beiträge aus einer automatisch gebauten Datei `data/beitraege.json`.
- Jede Person ergänzt eine eigene kleine Datei in `data/beitraege/`.
- Die Änderung wird über Git, GitHub und Pull Request sichtbar.
- Nach dem Merge kann die Seite automatisch über GitHub Pages aktualisiert werden.

Das Projekt ist bewusst einfach. Es geht nicht um perfekte Webentwicklung, sondern um den Ablauf:

```text
Fork/Branch -> Änderung -> Commit -> Push -> Pull Request -> Check/Build -> Merge -> sichtbares Ergebnis
```

## Lokal öffnen

Baue zuerst die gemeinsame Beitragsdatei:

```bash
node scripts/build-data.js
```

Starte danach im Projektordner einen kleinen lokalen Webserver:

```bash
python -m http.server 8000
```

Öffne danach im Browser:

```text
http://localhost:8000
```

Hinweis: Ein direkter Doppelklick auf `index.html` kann je nach Browser nicht funktionieren, weil die Seite die erzeugte Datei `data/beitraege.json` nachlädt.

## Beitrag ergänzen

Lege im Ordner `data/beitraege/` eine eigene Datei an.

Mehrere Beiträge entstehen durch mehrere Dateien oder durch mehrere Einträge in einer Datei. Der Build-Schritt führt alle Beiträge zu `data/beitraege.json` zusammen.

Datei:

```text
data/beitraege/vorname.json
```

Inhalt für einen Beitrag:

```json
{
  "name": "Niko",
  "rolle": "Trainer",
  "beitrag": "Ich teste heute Pull Requests.",
  "farbe": "teal"
}
```

Inhalt für mehrere Beiträge in einer Datei:

```json
[
  {
    "name": "Niko",
    "rolle": "Trainer",
    "beitrag": "Mein erster Beitrag.",
    "farbe": "teal"
  },
  {
    "name": "Niko",
    "rolle": "Trainer",
    "beitrag": "Mein zweiter Beitrag.",
    "farbe": "green"
  }
]
```

Erlaubte Farben:

- `teal`
- `blue`
- `green`
- `amber`
- `gray`

## Einfache Prüfung

Wenn Node.js verfügbar ist:

```bash
node scripts/check-data.js
```

Die Prüfung kontrolliert:

- Sind alle Dateien in `data/beitraege/` gültiges JSON?
- Enthält jede Datei einen Beitrag oder ein Array mit mehreren Beiträgen?
- Haben alle Beiträge die Pflichtfelder?

Für die lokale Vorschau wird daraus anschließend die gemeinsame Datei gebaut:

```bash
node scripts/build-data.js
```

## GitHub Pages

Wenn das Repository auf GitHub liegt, kann die Seite mit GitHub Pages veröffentlicht werden.

Der Workflow in `.github/workflows/pages.yml` prüft die Daten und veröffentlicht die statische Webseite. Dafür muss GitHub Pages im Repository auf **GitHub Actions** als Quelle eingestellt sein.

## Didaktischer Zweck

Dieses Projekt zeigt das CI/CD-Prinzip in klein:

- Änderung wird versioniert
- Pull Request macht die Änderung prüfbar
- automatische Prüfung schützt vor kaputten JSON-Dateien
- Build-Schritt erzeugt die gemeinsame Beitragsdatei
- Deployment macht das Ergebnis sichtbar
