const board = document.querySelector("#board");
const cardTemplate = document.querySelector("#cardTemplate");
const count = document.querySelector("#count");
const updated = document.querySelector("#updated");

const allowedColors = new Set(["teal", "blue", "green", "amber", "gray"]);

function createCard(entry) {
  const card = cardTemplate.content.firstElementChild.cloneNode(true);
  const color = allowedColors.has(entry.farbe) ? entry.farbe : "gray";

  card.classList.add(color);
  card.querySelector(".badge").textContent = entry.rolle;
  card.querySelector("h2").textContent = entry.name;
  card.querySelector("p").textContent = entry.beitrag;

  return card;
}

function render(entries) {
  board.replaceChildren(...entries.map(createCard));
  count.textContent = `${entries.length} Beiträge`;
  updated.textContent = `Stand: ${new Date().toLocaleDateString("de-DE")}`;
}

async function loadEntries() {
  try {
    const response = await fetch("data/beitraege.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const entries = await response.json();
    render(entries);
  } catch (error) {
    count.textContent = "Beiträge konnten nicht geladen werden.";
    updated.textContent = "Tipp: Erst node scripts/build-data.js ausführen und dann per lokalem Webserver öffnen.";
  }
}

loadEntries();
