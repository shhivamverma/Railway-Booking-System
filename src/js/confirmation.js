import { ConfirmationComponent } from "./components/confirmationComponent.js";

const elements = {
  ticketContainer: document.getElementById("ticket-details")
};

const confirmationComponent = new ConfirmationComponent(elements);
confirmationComponent.render();
