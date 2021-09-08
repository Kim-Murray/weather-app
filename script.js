function addZero(time) {
  if (time < 10) {
    return "0" + time;
  } else {
    return time;
  }
}

function formatDateTime(days) {
  let today = new Date();
  let day = days[today.getDay()];
  let hour = addZero(today.getHours());
  let minutes = addZero(today.getMinutes());
  return `${day} ${hour}:${minutes}`;
}

function tidyString(string) {
  string = string.trim();
  string = string.toLowerCase();
  string = string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return string;
}

function formatCity(city) {
  newCity = document.querySelector("h1");
  if (city.length > 7) {
    newCity.innerHTML = `<font size="6.5">${city}</font>`;
  } else newCity.innerHTML = `${city}`;
}

function city(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#location").value;
  cityInput = tidyString(cityInput);
  formatCity(cityInput);
}

function changeTemptoC(event) {
  event.preventDefault();
  let displayTemp = document.querySelector(".today-T");
  displayTemp.innerHTML = "20°C";
}

function changeTemptoF(event) {
  event.preventDefault();
  let displayTemp = document.querySelector(".today-T");
  displayTemp.innerHTML = "68°F";
}

days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDayAndTime = document.querySelector("#today");
currentDayAndTime.innerHTML = formatDateTime(days);

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", city);

let tempCelsius = document.querySelector("#temp-celsius");
tempCelsius.addEventListener("click", changeTemptoC);

let tempFahr = document.querySelector("#temp-fahr");
tempFahr.addEventListener("click", changeTemptoF);
