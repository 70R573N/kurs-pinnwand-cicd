try {
  const { loadEntries } = require("./build-data");
  const entries = loadEntries();
  console.log(`${entries.length} Beiträge aus Beitragsdateien geprüft.`);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
