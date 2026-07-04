import { getLatestBooking } from "../services/bookingService.js";

class ConfirmationComponent {
  constructor(elements) {
    this.elements = elements;
  }

  render() {
    const booking = getLatestBooking();
    if (!booking) {
      this.elements.ticketContainer.innerHTML = `<p class="empty-state">No ticket found. Please complete a booking first.</p>`;
      return;
    }

    const passengerRows = booking.passengers
      .map(
        (passenger, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${passenger.name}</td>
            <td>${passenger.age}</td>
            <td>${passenger.gender}</td>
          </tr>`
      )
      .join("");

    const ticketHtml = `
      <div class="ticket-card">
        <div class="ticket-header">
          <div>
            <h2>Ticket Confirmation</h2>
            <p class="ticket-meta">PNR: <strong>${booking.pnr}</strong></p>
          </div>
          <button id="print-ticket" class="btn btn-secondary">Print Ticket</button>
        </div>

        <div class="ticket-summary">
          <div><strong>Train:</strong> ${booking.trainName} (${booking.trainNumber})</div>
          <div><strong>Route:</strong> ${booking.sourceStation} → ${booking.destinationStation}</div>
          <div><strong>Date:</strong> ${new Date(booking.journeyDate).toLocaleDateString()}</div>
          <div><strong>Seats:</strong> ${booking.seatNumbers.join(", ")}</div>
          <div><strong>Total Fare:</strong> ₹${booking.totalFare || "N/A"}</div>
        </div>

        <table class="ticket-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Passenger</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>${passengerRows}</tbody>
        </table>

        <div class="ticket-footer">
          <p>Contact: ${booking.contactEmail} | ${booking.contactPhone}</p>
        </div>
      </div>`;

    this.elements.ticketContainer.innerHTML = ticketHtml;

    const printButton = document.getElementById("print-ticket");
    printButton.addEventListener("click", () => window.print());

    const navPrintButton = document.getElementById("print-button");
    if (navPrintButton) {
      navPrintButton.addEventListener("click", () => window.print());
    }
  }
}

export { ConfirmationComponent };
