import { UI } from "./ui.js";
import { SearchComponent } from "./components/searchComponent.js";

const elements = {
  originSelect: document.getElementById("origin"),
  destinationSelect: document.getElementById("destination"),
  travelClassSelect: document.getElementById("travel-class"),
  trainList: document.getElementById("train-list"),
  bookingSummary: document.getElementById("booking-summary")
};

const ui = new UI(elements);
const searchComponent = new SearchComponent(elements, ui);

function initializeApp() {
  searchComponent.initialize();
  searchComponent.attachFormListener();
  ui.trainList.innerHTML = `<p class="empty-state">Use the form to search for trains by source, destination, and journey date.</p>`;
}

initializeApp();
