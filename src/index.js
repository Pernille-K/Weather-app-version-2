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
  let currentDegrees = document.querySelector(".current-degrees");
  let currentDegreesCelsius = Math.round(
    ((madeUpDegreesFahrenheitDay - 32) * 5) / 9
  );
  currentDegrees.innerHTML = `${currentDegreesDayCelsius}&deg;C`;

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
  let currentDegrees = document.querySelector(".current-degrees");
  let currentDegreesFahrenheit = Math.round(
    (madeUpDegreesCelsiusDay * 9) / 5 + 32
  );
  currentDegrees.innerHTML = `${currentDegreesFahrenheit}&deg;F`;

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

function preventDefault(event) {
  event.preventDefault();
}

let searchBarForm = document.querySelector(".search-bar");
searchBarForm.addEventListener("submit", preventDefault);

function updateDescription(response) {
  let currentWeatherDescription = document.querySelector(
    "#current-weather-description"
  );

  let APIresponse = response.data.weather[0].description;
  let APIdescription =
    APIresponse.charAt(0).toUpperCase() + APIresponse.slice(1);

  currentWeatherDescription.innerHTML = `${APIdescription}`;
}

function displayWeather(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let currentDegrees = document.querySelector(".current-degrees");
  currentDegrees.innerHTML = `${temperature}&degC`;

  let city = document.querySelector(".city");
  city.innerHTML = `${response.data.name}`;
}

function changeBackgroundAndPictures(response) {
  let backgroundContainer = document.querySelector("#background-container");
  let weatherDescription = response.data.weather[0].main;
  let mainPicture = document.querySelector("#current-weather-picture");

  let atmosphereDescriptors = [
    "Mist",
    "Smoke",
    "Haze",
    "Dust",
    "Fog",
    "Sand",
    "Ash",
    "Squall",
    "Tornado",
  ];

  if (atmosphereDescriptors.includes(weatherDescription)) {
    backgroundContainer.style.backgroundColor = "#B4C1C9";
    mainPicture.setAttribute(
      "src",
      `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/079/866/original/cloudsadobegray.png?1682952198`
    );
  } else if (weatherDescription == "Snow") {
    backgroundContainer.style.backgroundColor = "#fffafa";
    mainPicture.setAttribute(
      "src",
      `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/079/893/original/snow2.png?1682960045`
    );
  } else if (weatherDescription == "Clear") {
    backgroundContainer.style.backgroundColor = "#fff8bc";
    mainPicture.setAttribute(
      "src",
      `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/079/836/original/sun.png?1682944300`
    );
  } else if (weatherDescription == "Clouds") {
    backgroundContainer.style.backgroundColor = "#ededed";
    mainPicture.setAttribute(
      "src",
      `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/079/848/original/cloudsadobe2.png?1682946292`
    );
  } else if (weatherDescription == "Rain") {
    backgroundContainer.style.backgroundColor = "#e0f2fc";
    mainPicture.setAttribute(
      "src",
      `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/079/764/original/rainy3.png?1682935050`
    );
  } else if (weatherDescription == "Thunderstorm") {
    backgroundContainer.style.backgroundColor = "#d1fdff";
    mainPicture.setAttribute(
      "src",
      `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/079/849/original/thunder.png?1682946763`
    );
  }
}

let searchInput = document.querySelector("#search-input");

function getAxiosOpenWeather() {
  let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
  let city = `${searchInput.value}`;
  let apiUrlOpenWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlOpenWeather).then(displayWeather);
  axios.get(apiUrlOpenWeather).then(changeBackgroundAndPictures);
  axios.get(apiUrlOpenWeather).then(updateDescription);
  axios.get(apiUrlOpenWeather).then(changePictures);
}

searchBarForm.addEventListener("submit", getAxiosOpenWeather);

function displayLocation(response) {
  console.log(response.data);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let temperature = Math.round(response.data.main.temp);
  let currentDegrees = document.querySelector(".current-degrees");
  currentDegrees.innerHTML = `${temperature}&degC`;
}

function getAxiosPosition(response) {
  console.log(response.data);
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;
  let apiKey = "bd3bb6534458ba51b48c49f5155745b6";
  let apiUrlWeatherHere = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlWeatherHere).then(displayLocation);
  axios.get(apiUrlWeatherHere).then(changeBackgroundAndPictures);
  axios.get(apiUrlWeatherHere).then(updateDescription);
  axios.get(apiUrlWeatherHere).then(changePictures);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(getAxiosPosition);
}

let currentButton = document.querySelector(".current-button");
currentButton.addEventListener("click", currentLocation);
