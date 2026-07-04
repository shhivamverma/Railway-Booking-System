import { generatePNR, generateSeatNumbers, validateBookingData } from "./helpers.js";
import { saveBooking, loadBookings } from "../services/bookingService.js";

class BookingComponent {
  constructor(elements) {
    this.elements = elements;
    this.passengerCount = 0;
  }

  initialize() {
    this.addPassenger();
    this.attachFormEvents();
    this.renderSavedBookings();
  }

  createPassengerCard(index) {
    const wrapper = document.createElement("div");
    wrapper.className = "passenger-card";
    wrapper.dataset.index = index;
    wrapper.innerHTML = `
      <div class="passenger-row">
        <div>
          <label for="passenger-name-${index}">Name</label>
          <input type="text" id="passenger-name-${index}" name="passengerName" placeholder="Full name" required />
        </div>
        <div>
          <label for="passenger-age-${index}">Age</label>
          <input type="number" id="passenger-age-${index}" name="passengerAge" min="1" placeholder="Age" required />
        </div>
        <div>
          <label for="passenger-gender-${index}">Gender</label>
          <select id="passenger-gender-${index}" name="passengerGender" required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <button type="button" class="remove-passenger">Remove</button>
    `;

    wrapper.querySelector(".remove-passenger").addEventListener("click", () => {
      wrapper.remove();
    });

    return wrapper;
  }

  addPassenger() {
    this.passengerCount += 1;
    this.elements.passengerList.appendChild(this.createPassengerCard(this.passengerCount));
  }

  getPassengerDetails() {
    return Array.from(this.elements.passengerList.querySelectorAll(".passenger-card")).map((card) => ({
      name: card.querySelector("input[name='passengerName']").value.trim(),
      age: card.querySelector("input[name='passengerAge']").value.trim(),
      gender: card.querySelector("select[name='passengerGender']").value
    }));
  }

  attachFormEvents() {
    this.elements.addPassengerButton.addEventListener("click", () => this.addPassenger());

    this.elements.bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.elements.formError.textContent = "";

      const bookingFormData = {
        trainNumber: this.elements.trainNumber.value.trim(),
        trainName: this.elements.trainName.value.trim(),
        sourceStation: this.elements.sourceStation.value.trim(),
        destinationStation: this.elements.destinationStation.value.trim(),
        journeyDate: this.elements.journeyDate.value,
        contactEmail: this.elements.contactEmail.value.trim(),
        contactPhone: this.elements.contactPhone.value.trim()
      };

      const passengers = this.getPassengerDetails();
      const validationError = validateBookingData(bookingFormData, passengers);

      if (validationError) {
        this.elements.formError.textContent = validationError;
        return;
      }

      const pnr = generatePNR();
      const seatNumbers = generateSeatNumbers(passengers.length);

      saveBooking({
        ...bookingFormData,
        pnr,
        seatNumbers,
        passengers,
        savedAt: new Date().toISOString()
      });

      this.renderSavedBookings();
      window.location.href = "confirmation.html";
    });
  }

  renderSavedBookings() {
    const bookings = loadBookings();
    if (!bookings.length) {
      this.elements.bookingHistory.innerHTML = `<p class="empty-state">No saved bookings yet.</p>`;
      return;
    }

    this.elements.bookingHistory.innerHTML = bookings
      .slice()
      .reverse()
      .map(
        (booking) => `
          <div class="history-card">
            <div class="history-card-header">
              <strong>${booking.trainName} (${booking.trainNumber})</strong>
              <span>${new Date(booking.journeyDate).toLocaleDateString()}</span>
            </div>
            <div class="history-details">
              <span>${booking.sourceStation} → ${booking.destinationStation}</span>
              <span>${booking.passengers.length} passenger(s)</span>
            </div>
          </div>`
      )
      .join("");
  }
}

export { BookingComponent };
