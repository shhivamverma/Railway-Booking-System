const stations = [
  "New Delhi",
  "Mumbai Central",
  "Kolkata",
  "Chennai Central",
  "Bangalore City",
  "Hyderabad Deccan",
  "Ahmedabad Junction",
  "Pune Junction",
  "Jaipur",
  "Lucknow",
  "Patna",
  "Visakhapatnam",
  "Delhi",
  "Varanasi",
  "Siliguri"
];

const travelClasses = [
  { id: "ac", label: "AC Chair Car", multiplier: 1.8 },
  { id: "sleeper", label: "Sleeper Class", multiplier: 1.0 },
  { id: "first-ac", label: "First Class AC", multiplier: 2.4 }
];

const trains = [
  {
    number: "12612",
    name: "Rajdhani Express",
    origin: "New Delhi",
    destination: "Kolkata",
    departure: "16:20",
    arrival: "07:45",
    seatAvailability: 32,
    ticketPrice: 3100
  },
  {
    number: "12952",
    name: "Mumbai Rajdhani",
    origin: "New Delhi",
    destination: "Mumbai Central",
    departure: "16:00",
    arrival: "08:35",
    seatAvailability: 24,
    ticketPrice: 3500
  },
  {
    number: "12002",
    name: "Bangalore Rajdhani",
    origin: "New Delhi",
    destination: "Bangalore City",
    departure: "16:25",
    arrival: "10:20",
    seatAvailability: 18,
    ticketPrice: 4200
  },
  {
    number: "22691",
    name: "Garibrath Express",
    origin: "Mumbai Central",
    destination: "Chennai Central",
    departure: "13:20",
    arrival: "06:55",
    seatAvailability: 46,
    ticketPrice: 1700
  },
  {
    number: "12311",
    name: "Howrah Mail",
    origin: "Kolkata",
    destination: "Hyderabad Deccan",
    departure: "22:15",
    arrival: "14:10",
    seatAvailability: 40,
    ticketPrice: 2200
  },
  {
    number: "12627",
    name: "Shatabdi Express",
    origin: "New Delhi",
    destination: "Lucknow",
    departure: "06:00",
    arrival: "12:15",
    seatAvailability: 58,
    ticketPrice: 1250
  },
  {
    number: "12217",
    name: "Patna Express",
    origin: "Mumbai Central",
    destination: "Patna",
    departure: "23:45",
    arrival: "17:05",
    seatAvailability: 35,
    ticketPrice: 2700
  },
  {
    number: "12283",
    name: "Jaipur Superfast",
    origin: "Delhi",
    destination: "Jaipur",
    departure: "18:45",
    arrival: "22:00",
    seatAvailability: 60,
    ticketPrice: 650
  },
  {
    number: "22806",
    name: "Padmavati Express",
    origin: "Ahmedabad Junction",
    destination: "Varanasi",
    departure: "04:30",
    arrival: "01:50",
    seatAvailability: 22,
    ticketPrice: 2400
  },
  {
    number: "12721",
    name: "Tamil Nadu Express",
    origin: "Delhi",
    destination: "Chennai Central",
    departure: "23:50",
    arrival: "13:20",
    seatAvailability: 20,
    ticketPrice: 3600
  },
  {
    number: "12607",
    name: "Howrah Duronto",
    origin: "Kolkata",
    destination: "New Delhi",
    departure: "20:15",
    arrival: "10:40",
    seatAvailability: 16,
    ticketPrice: 3300
  },
  {
    number: "12466",
    name: "Gour Express",
    origin: "New Delhi",
    destination: "Sealdah",
    departure: "11:10",
    arrival: "05:40",
    seatAvailability: 28,
    ticketPrice: 1900
  },
  {
    number: "12213",
    name: "Kanyakumari Express",
    origin: "Bangalore City",
    destination: "Chennai Central",
    departure: "07:55",
    arrival: "13:27",
    seatAvailability: 50,
    ticketPrice: 900
  },
  {
    number: "12615",
    name: "Narmada Express",
    origin: "Mumbai Central",
    destination: "Ahmedabad Junction",
    departure: "09:00",
    arrival: "17:20",
    seatAvailability: 44,
    ticketPrice: 950
  },
  {
    number: "12930",
    name: "Duronto Express",
    origin: "Chennai Central",
    destination: "New Delhi",
    departure: "23:15",
    arrival: "15:10",
    seatAvailability: 14,
    ticketPrice: 4100
  },
  {
    number: "12658",
    name: "Goa Express",
    origin: "Mumbai Central",
    destination: "Bangalore City",
    departure: "21:00",
    arrival: "10:15",
    seatAvailability: 38,
    ticketPrice: 1600
  },
  {
    number: "12781",
    name: "Humsafar Express",
    origin: "Hyderabad Deccan",
    destination: "Pune Junction",
    departure: "18:40",
    arrival: "07:35",
    seatAvailability: 42,
    ticketPrice: 1450
  },
  {
    number: "22957",
    name: "Sampark Kranti",
    origin: "Ahmedabad Junction",
    destination: "Delhi",
    departure: "12:30",
    arrival: "05:15",
    seatAvailability: 26,
    ticketPrice: 2100
  },
  {
    number: "12644",
    name: "Magadh Express",
    origin: "Patna",
    destination: "New Delhi",
    departure: "19:45",
    arrival: "11:40",
    seatAvailability: 30,
    ticketPrice: 2300
  },
  {
    number: "12477",
    name: "Mahananda Express",
    origin: "New Delhi",
    destination: "Siliguri",
    departure: "10:35",
    arrival: "00:45",
    seatAvailability: 20,
    ticketPrice: 2800
  }
];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchStations() {
  await delay(200);
  return stations.slice();
}

async function fetchTravelClasses() {
  await delay(150);
  return travelClasses.slice();
}

async function searchTrains({ origin, destination, journeyDate }) {
  await delay(400);

  const selectedDate = new Date(journeyDate);
  if (!origin || !destination || Number.isNaN(selectedDate.getTime())) {
    return [];
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selectedDate < today) {
    return [];
  }

  return trains.filter((train) => train.origin === origin && train.destination === destination);
}

async function getTrainByNumber(number) {
  await delay(150);
  return trains.find((train) => train.number === number) || null;
}

export { fetchStations, fetchTravelClasses, searchTrains, getTrainByNumber };
