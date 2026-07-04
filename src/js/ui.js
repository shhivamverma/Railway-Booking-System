class UI {
  constructor(elements) {
    this.originSelect = elements.originSelect;
    this.destinationSelect = elements.destinationSelect;
    this.travelClassSelect = elements.travelClassSelect;
    this.trainList = elements.trainList;
    this.bookingSummary = elements.bookingSummary;
  }

  initializeStationOptions(stations) {
    this.populateSelect(this.originSelect, stations);
    this.populateSelect(this.destinationSelect, stations);
  }

  initializeClassOptions(travelClasses) {
    this.travelClassSelect.innerHTML = travelClasses
      .map(
        (travelClass) =>
          `<option value="${travelClass.id}" data-multiplier="${travelClass.multiplier}">${travelClass.label}</option>`
      )
      .join("");
  }

  populateSelect(selectElement, items) {
    selectElement.innerHTML = items
      .map((item) => `<option value="${item}">${item}</option>`)
      .join("");
  }

  renderTrains(trainItems, bookingHandler) {
    if (!trainItems.length) {
      this.trainList.innerHTML = `<p class="empty-state">No trains found for this route.</p>`;
      return;
    }

    this.trainList.innerHTML = trainItems
      .map(
        (train) => `
        <article class="train-card">
          <h3>${train.name} <span>(${train.number})</span></h3>
          <div class="train-meta">
            <span><strong>Route:</strong> ${train.origin} → ${train.destination}</span>
            <span><strong>Departure:</strong> ${train.departure}</span>
            <span><strong>Arrival:</strong> ${train.arrival}</span>
            <span><strong>Seats:</strong> ${train.seatAvailability}</span>
          </div>
          <p>Ticket price per passenger: ₹${train.ticketPrice}</p>
          <button data-train-number="${train.number}" type="button">Select this train</button>
        </article>`
      )
      .join("");

    this.trainList.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        const trainNumber = button.dataset.trainNumber;
        bookingHandler(trainNumber);
      });
    });
  }

  renderBookingSummary(summary) {
    this.bookingSummary.innerHTML = `
      <div class="summary-item"><span>Passenger</span><strong>${summary.passengerName}</strong></div>
      <div class="summary-item"><span>Train</span><strong>${summary.trainName} (${summary.trainNumber})</strong></div>
      <div class="summary-item"><span>Route</span><strong>${summary.route}</strong></div>
      <div class="summary-item"><span>Date</span><strong>${summary.travelDate}</strong></div>
      <div class="summary-item"><span>Class</span><strong>${summary.travelClass}</strong></div>
      <div class="summary-item"><span>Passengers</span><strong>${summary.passengerCount}</strong></div>
      <div class="summary-item"><span>Total Fare</span><strong>₹${summary.totalFare}</strong></div>
      <p class="summary-note">Your ticket has been reserved. Proceed with payment in the next stage.</p>
    `;
  }
}

export { UI };
