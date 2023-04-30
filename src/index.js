const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const now = new Date();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

const currentTime = document.querySelector(".currentTime");
currentTime.innerHTML = `${hours}:${minutes}`;

const day = document.querySelector(".currentDay");
const currentDay = days[now.getDay()];
day.innerHTML = `${currentDay}`;

const currentDate = document.querySelector(".currentDate");
currentDate.innerHTML = `${now.getDate()}. ${now.getMonth() + 1}`;

const day2 = document.querySelector("#day2");
day2.innerHTML = days[(now.getDay() + 1) % 7];

const day3 = document.querySelector("#day3");
day3.innerHTML = days[(now.getDay() + 2) % 7];

const day4 = document.querySelector("#day4");
day4.innerHTML = days[(now.getDay() + 3) % 7];

const day5 = document.querySelector("#day5");
day5.innerHTML = days[(now.getDay() + 4) % 7];

const day6 = document.querySelector("#day6");
day6.innerHTML = days[(now.getDay() + 5) % 7];

function changeToCelsius() {
  const madeUpDegreesFahrenheitDay = 41;
  const madeUpDegreesFahrenheitNight = 37;
  let todayDegreesDay = document.querySelector(".today-degrees-day");
  let todayDegreesDayCelsius = Math.round(
    ((madeUpDegreesFahrenheitDay - 32) * 5) / 9
  );
  todayDegreesDay.innerHTML = `${todayDegreesDayCelsius}&deg;C`;

  let todayDegreesNight = document.querySelector(".today-degrees-night");
  let todayDegreesNightCelsius = Math.round(
    ((madeUpDegreesFahrenheitNight - 32) * 5) / 9
  );
  todayDegreesNight.innerHTML = `${todayDegreesNightCelsius}&deg;C`;

  let degreesDay = document.querySelectorAll(".degrees-day");
  for (let i = 0; i < degreesDay.length; i++) {
    degreesDay[i].innerHTML = "7";
  }

  let degreesNight = document.querySelectorAll(".degrees-night");
  for (let i = 0; i < degreesNight.length; i++) {
    degreesNight[i].innerHTML = "-1";
  }

  let temperatureSign = document.querySelectorAll(".temperature-sign");
  temperatureSign.forEach((sign) => (sign.innerHTML = "C"));
}

function changeToFahrenheit() {
  const madeUpDegreesCelsiusDay = 5;
  const madeUpDegreesCelsiusNight = 3;
  let todayDegreesDay = document.querySelector(".today-degrees-day");
  let todayDegreesDayFahrenheit = Math.round(
    (madeUpDegreesCelsiusDay * 9) / 5 + 32
  );
  todayDegreesDay.innerHTML = `${todayDegreesDayFahrenheit}&deg;F`;

  let todayDegreesNight = document.querySelector(".today-degrees-night");
  let todayDegreesNightFahrenheit = Math.round(
    (madeUpDegreesCelsiusNight * 9) / 5 + 32
  );
  todayDegreesNight.innerHTML = `${todayDegreesNightFahrenheit}&deg;F`;

  let degreesDay = document.querySelectorAll(".degrees-day");
  for (let i = 0; i < degreesDay.length; i++) {
    degreesDay[i].innerHTML = "45";
  }

  let degreesNight = document.querySelectorAll(".degrees-night");
  for (let i = 0; i < degreesNight.length; i++) {
    degreesNight[i].innerHTML = "30";
  }
  let temperatureSign = document.querySelectorAll(".temperature-sign");
  temperatureSign.forEach((sign) => (sign.innerHTML = "F"));
}

let celsiusButton = document.querySelector(".celsius-button");
let fahrenheitButton = document.querySelector(".fahrenheit-button");

celsiusButton.addEventListener("click", changeToCelsius);
fahrenheitButton.addEventListener("click", changeToFahrenheit);

function changeCurrentCity(event) {
  event.preventDefault();
  let currentCityH1 = document.querySelector(".current-city-h1");

  currentCityH1.innerHTML = `${searchInput.value}`;
}

let searchBarForm = document.querySelector(".search-bar");
let searchInput = document.querySelector("#search-input");

searchBarForm.addEventListener("submit", changeCurrentCity);

function displayTemp(response) {
  let temperatureDay = Math.round(response.data.main.temp);
  let todayDegreesDay = document.querySelector(".today-degrees-day");
  todayDegreesDay.innerHTML = `${temperatureDay}&degC`;
}

function getAxios() {
  let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
  let city = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

searchBarForm.addEventListener("submit", getAxios);

function displayLocation(response) {
  console.log(response.data);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let temperature = Math.round(response.data.main.temp);
  let todayDegreesDay = document.querySelector(".today-degrees-day");
  todayDegreesDay.innerHTML = `${temperature} &degC`;
}

function getPositionAxios(response) {
  console.log(response.data);
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;
  let apiKey = `2bd326a60dc89a53287e446e819664df`;
  let apiUrlWeatherHere = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlWeatherHere).then(displayLocation);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(getPositionAxios);
}

let currentButton = document.querySelector(".current-button");
currentButton.addEventListener("click", currentLocation);
