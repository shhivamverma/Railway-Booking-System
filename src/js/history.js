import { HistoryComponent } from "./components/historyComponent.js";

const elements = {
  historyContainer: document.getElementById("history-list")
};

const historyComponent = new HistoryComponent(elements);
historyComponent.render();
