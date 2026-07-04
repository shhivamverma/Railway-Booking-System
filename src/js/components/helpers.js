function generatePNR() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return Array.from({ length: 10 })
    .map((_, index) => (index < 3 ? letters.charAt(Math.floor(Math.random() * letters.length)) : Math.floor(Math.random() * 10)))
    .join("");
}

function generateSeatNumbers(passengerCount) {
  return Array.from({ length: passengerCount }).map(() => {
    const coach = String.fromCharCode(65 + Math.floor(Math.random() * 8));
    const seat = Math.floor(Math.random() * 72) + 1;
    return `${coach}${seat}`;
  });
}

function validateBookingData(bookingData, passengers) {
  if (!bookingData.trainNumber || !bookingData.trainName || !bookingData.sourceStation || !bookingData.destinationStation || !bookingData.journeyDate || !bookingData.contactEmail || !bookingData.contactPhone) {
    return "Please complete all booking fields.";
  }

  if (bookingData.sourceStation === bookingData.destinationStation) {
    return "Source and destination cannot be the same.";
  }

  if (!/^\S+@\S+\.\S+$/.test(bookingData.contactEmail)) {
    return "Please enter a valid email address.";
  }

  if (!/^\d{10}$/.test(bookingData.contactPhone)) {
    return "Please enter a valid 10-digit phone number.";
  }

  if (!passengers.length) {
    return "At least one passenger is required.";
  }

  for (const passenger of passengers) {
    if (!passenger.name || !passenger.age || !passenger.gender) {
      return "Please complete all passenger details.";
    }
    if (Number(passenger.age) <= 0) {
      return "Passenger age must be a positive number.";
    }
  }

  return "";
}

export { generatePNR, generateSeatNumbers, validateBookingData };
