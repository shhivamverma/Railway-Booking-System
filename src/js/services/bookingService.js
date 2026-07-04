const STORAGE_KEY_BOOKINGS = "railwayBookings";
const STORAGE_KEY_LATEST_BOOKING = "latestConfirmedBooking";

function loadBookings() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY_BOOKINGS) || "[]");
}

function saveBookings(bookings) {
  localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
}

function saveBooking(booking) {
  const bookings = loadBookings();
  bookings.push(booking);
  saveBookings(bookings);
  localStorage.setItem(STORAGE_KEY_LATEST_BOOKING, JSON.stringify(booking));
}

function getLatestBooking() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY_LATEST_BOOKING) || "null");
}

function removeLatestBooking() {
  localStorage.removeItem(STORAGE_KEY_LATEST_BOOKING);
}

function deleteBooking(index) {
  const bookings = loadBookings();
  const removed = bookings.splice(index, 1)[0];
  saveBookings(bookings);
  return removed;
}

export { loadBookings, saveBooking, getLatestBooking, removeLatestBooking, deleteBooking };
