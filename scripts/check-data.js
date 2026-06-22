try {
  const { loadEntries } = require("./build-data");
  const entries = loadEntries();
  console.log(`${entries.length} Beitragsdateien geprüft.`);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
