import { BookingComponent } from "./components/bookingComponent.js";

const elements = {
  bookingForm: document.getElementById("booking-form"),
  addPassengerButton: document.getElementById("add-passenger"),
  passengerList: document.getElementById("passenger-list"),
  bookingHistory: document.getElementById("booking-history"),
  formError: document.getElementById("form-error"),
  trainNumber: document.getElementById("train-number"),
  trainName: document.getElementById("train-name"),
  sourceStation: document.getElementById("source-station"),
  destinationStation: document.getElementById("destination-station"),
  journeyDate: document.getElementById("journey-date"),
  contactEmail: document.getElementById("contact-email"),
  contactPhone: document.getElementById("contact-phone")
};

const bookingComponent = new BookingComponent(elements);
bookingComponent.initialize();
