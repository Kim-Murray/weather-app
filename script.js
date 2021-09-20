//Formatting Date and Time

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

//Collecting weather data from openweathermap.org API

function weather(response) {
  console.log(response);
  let newCity = response.data.name;
  let displayCity = document.querySelector("h1");
  displayCity.innerHTML = `${newCity}`;

  celsiusTemp = response.data.main.temp;

  let currentTemp = Math.round(celsiusTemp);
  let displayCurrentTemp = document.querySelector("#current-T");
  displayCurrentTemp.innerHTML = `${currentTemp}°C`;

  let description = response.data.weather[0].description;
  description = tidyString(description);
  let descriptionPage = document.querySelector("#description");
  descriptionPage.innerHTML = description;

  let weatherIcon = response.data.weather[0].icon;
  let iconURL = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  let todayIcon = document.querySelector("#today-icon");
  todayIcon.setAttribute("src", iconURL);
  todayIcon.setAttribute("alt", description);

  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let humidityWind = document.querySelector("#humidity-wind");
  humidityWind.innerHTML = `Wind: ${wind} km/hr<br />Humidity: ${humidity}%`;

  let time = response.data.dt * 1000;
  let localDayAndTime = document.querySelector("#current-day-time");
  localDayAndTime.innerHTML = formatDateTime(days);
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

//Searching input city from search bar after tidying string

function city(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#location").value;
  if (cityInput !== "") {
    cityInput = tidyString(cityInput);
    findCity(cityInput);
  }
}

//Searching user local weather

function displayLocalWeather(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "8592322f23646cdf44bbdae2ec743ec1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=`;
  axios.get(`${apiUrl}${apiKey}`).then(weather);
}

function getCoordinates() {
  navigator.geolocation.getCurrentPosition(displayLocalWeather);
}

//Unit conversion

function changeTemptoC(event) {
  event.preventDefault();
  let displayTemp = document.querySelector(".today-T");
  tempCelsius.classList.add("active");
  tempFahr.classList.remove("active");
  displayTemp.innerHTML = `${Math.round(celsiusTemp)}°C`;
}

function changeTemptoF(event) {
  event.preventDefault();
  let fahrTemp = (celsiusTemp * 9) / 5 + 32;
  tempFahr.classList.add("active");
  tempCelsius.classList.remove("active");
  let displayTemp = document.querySelector(".today-T");
  displayTemp.innerHTML = `${Math.round(fahrTemp)}°F`;
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

//Creating global celsius value

let celsiusTemp = null;

//Listening for user activity on page

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", city);

let localWeather = document.querySelector("#local-weather");
localWeather.addEventListener("click", getCoordinates);

let tempCelsius = document.querySelector("#temp-celsius");
tempCelsius.addEventListener("click", changeTemptoC);

let tempFahr = document.querySelector("#temp-fahr");
tempFahr.addEventListener("click", changeTemptoF);

//Default display city

findCity("London");
