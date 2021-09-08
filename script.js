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

function weather(response) {
  console.log(response);
  let newCity = response.data.name;
  let displayCity = document.querySelector("h1");
  if (newCity.length > 7) {
    displayCity.innerHTML = `<font size="6.5">${newCity}</font>`;
  } else {
    displayCity.innerHTML = `${newCity}`;
  }

  let currentTemp = Math.round(response.data.main.temp);
  let displayCurrentTemp = document.querySelector("#current-T");
  displayCurrentTemp.innerHTML = `${currentTemp}°C`;

  let description = response.data.weather[0].description;
  description = tidyString(description);
  let descriptionPage = document.querySelector("#description");
  descriptionPage.innerHTML = description;

  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let humidityWind = document.querySelector("#humidity-wind");
  humidityWind.innerHTML = `Wind: ${wind} km/hr<br />Humidity: ${humidity}%`;
}

function findCity(city) {
  let apiKey = "8592322f23646cdf44bbdae2ec743ec1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=`;
  console.log(city);

  axios.get(`${apiUrl}${apiKey}`).then(weather);
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

function city(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#location").value;
  cityInput = tidyString(cityInput);
  findCity(cityInput);
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
let newCity = searchCity.addEventListener("submit", city);
