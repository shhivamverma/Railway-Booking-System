import { fetchStations, fetchTravelClasses, searchTrains } from "../services/trainService.js";

class SearchComponent {
  constructor(elements, ui) {
    this.elements = elements;
    this.ui = ui;
  }

  async initialize() {
    const [stations, travelClasses] = await Promise.all([
      fetchStations(),
      fetchTravelClasses()
    ]);
    this.ui.initializeStationOptions(stations);
    this.ui.initializeClassOptions(travelClasses);
  }

  attachFormListener() {
    const bookingForm = document.getElementById("booking-form");
    bookingForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const origin = this.elements.originSelect.value;
      const destination = this.elements.destinationSelect.value;
      const travelDate = document.getElementById("travel-date").value;
      const passengerCount = Number(document.getElementById("passenger-count").value);
      const travelClassElement = this.elements.travelClassSelect.selectedOptions[0];

      if (!origin || !destination || !travelDate || !passengerCount) {
        alert("Please fill From, To, Journey Date, and Passengers.");
        return;
      }

      const matches = await searchTrains({ origin, destination, journeyDate: travelDate });

      if (!matches.length) {
        alert("No trains available for this route.");
        return;
      }

      const searchState = {
        from: origin,
        to: destination,
        date: travelDate,
        class: travelClassElement?.value || "",
        passengerCount,
        matchingTrains: matches
      };

      localStorage.setItem("trainSearchState", JSON.stringify(searchState));
      window.location.href = "booking.html";
    });
  }

  calculateFare(basePrice, multiplier, passengerCount) {
    return Math.round(basePrice * multiplier * passengerCount);
  }
}

export { SearchComponent };
