import { loadBookings, deleteBooking } from "../services/bookingService.js";

class HistoryComponent {
  constructor(elements) {
    this.elements = elements;
  }

  render() {
    const bookings = loadBookings();
    if (!bookings.length) {
      this.elements.historyContainer.innerHTML = `<div class="empty-state">No booking history yet.</div>`;
      return;
    }

    const rows = bookings
      .map(
        (booking, index) => `
          <div class="history-card">
            <div class="history-card-header">
              <div>
                <h3>${booking.trainName} (${booking.trainNumber})</h3>
                <p>${booking.sourceStation} → ${booking.destinationStation}</p>
              </div>
              <button class="btn btn-danger cancel-booking" data-index="${index}">Cancel</button>
            </div>
            <div class="history-details">
              <span><strong>PNR:</strong> ${booking.pnr}</span>
              <span><strong>Date:</strong> ${new Date(booking.journeyDate).toLocaleDateString()}</span>
              <span><strong>Passengers:</strong> ${booking.passengers.length}</span>
              <span><strong>Fare:</strong> ₹${booking.totalFare || "N/A"}</span>
            </div>
          </div>`
      )
      .join("");

    this.elements.historyContainer.innerHTML = rows;
    this.attachCancelListeners();
  }

  attachCancelListeners() {
    this.elements.historyContainer.querySelectorAll(".cancel-booking").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = Number(event.target.dataset.index);
        deleteBooking(index);
        this.render();
      });
    });
  }
}

export { HistoryComponent };
