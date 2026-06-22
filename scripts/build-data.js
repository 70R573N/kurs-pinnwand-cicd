const fs = require("fs");
const path = require("path");

const entriesDir = path.join(__dirname, "..", "data", "beitraege");
const outputFile = path.join(__dirname, "..", "data", "beitraege.json");
const allowedColors = new Set(["teal", "blue", "green", "amber", "gray"]);
const fileNamePattern = /^[a-z0-9_-]+\.json$/;

function fail(message) {
  throw new Error(message);
}

function readJsonFile(filePath, label) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`${label}: JSON konnte nicht gelesen werden: ${error.message}`);
  }
}

function validateEntry(entry, label) {
  if (!entry || Array.isArray(entry) || typeof entry !== "object") {
    fail(`${label}: Beitrag muss ein JSON-Objekt sein.`);
  }

  for (const field of ["name", "rolle", "beitrag", "farbe"]) {
    if (typeof entry[field] !== "string" || entry[field].trim() === "") {
      fail(`${label}: Feld "${field}" fehlt oder ist leer.`);
    }
  }

  if (!allowedColors.has(entry.farbe)) {
    fail(`${label}: Farbe "${entry.farbe}" ist nicht erlaubt.`);
  }
}

function normalizeEntries(content, fileName) {
  const entries = Array.isArray(content) ? content : [content];

  if (entries.length === 0) {
    fail(`${fileName}: Die Datei darf kein leeres Array enthalten.`);
  }

  entries.forEach((entry, index) => {
    const label = Array.isArray(content) ? `${fileName}, Beitrag ${index + 1}` : fileName;
    validateEntry(entry, label);
  });

  return entries;
}

function loadEntries() {
  if (!fs.existsSync(entriesDir)) {
    fail("Ordner data/beitraege wurde nicht gefunden.");
  }

  const fileNames = fs
    .readdirSync(entriesDir)
    .filter((fileName) => fileName.endsWith(".json"))
    .sort((a, b) => a.localeCompare(b, "de"));

  if (fileNames.length === 0) {
    fail("Im Ordner data/beitraege muss mindestens eine JSON-Datei liegen.");
  }

  return fileNames.flatMap((fileName) => {
    if (!fileNamePattern.test(fileName)) {
      fail(`${fileName}: Dateiname bitte nur mit Kleinbuchstaben, Zahlen, Bindestrich oder Unterstrich schreiben.`);
    }

    const content = readJsonFile(path.join(entriesDir, fileName), fileName);
    return normalizeEntries(content, fileName);
  });
}

function writeEntries(entries) {
  fs.writeFileSync(outputFile, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
}

if (require.main === module) {
  try {
    const entries = loadEntries();
    writeEntries(entries);
    console.log(`${entries.length} Beiträge gebaut: data/beitraege.json`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = {
  loadEntries,
  writeEntries,
};
