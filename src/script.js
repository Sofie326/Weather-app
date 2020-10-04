function formatHours(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
function currentDateTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let date = now.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let dateTime = document.querySelector("#date-time");
  dateTime.innerHTML = `${day} ${date} ${month} ${formatHours(now)}`;
}

function showWeather(response) {
  celciusTemp = response.data.main.temp;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp-display").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#visibility").innerHTML = response.data.visibility;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
  currentDateTime();
}
function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
      <div class="col-sm">
        <p class="time">${formatHours(forecast.dt * 1000)}</p>
        <hr />
        <p class="weather-emoji">
          <img src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png" alt="${forecast.weather[0].description}">
        </p>
        <p class="temperature">${Math.round(forecast.main.temp)}°C</p>
      </div>`;
  }
}
function search(city) {
  let apiKey = "fc119741c476f1c5aa5601dcd5623127";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showForecast);
}
function getCurrentData(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".input-bar");
  let city = cityInput.value;
  search(city);
}
function getCoords(position) {
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
  let units = "metric";
  let apiKey = "fc119741c476f1c5aa5601dcd5623127";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}
function getCurrentLocation(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(getCoords);
}
function tempToFarenheit(event) {
  event.preventDefault();
  let unitsDisplay = document.querySelector("#temp-units");
  unitsDisplay.innerHTML = `<a id="farenheit" href="#"class="active">
        °F</a>| <a id="celcius" href="#">
        °C
      </a>`;
  let tempDisplay = document.querySelector("#temp-display");
  let tempInFarenheit = Math.round((celciusTemp * 9) / 5 + 32);
  tempDisplay.innerHTML = tempInFarenheit;
  let celciusLink = document.querySelector("#celcius");
  celciusLink.addEventListener("click", tempToCelcius);
}
function tempToCelcius(event) {
  event.preventDefault();
  let unitsDisplay = document.querySelector("#temp-units");
  unitsDisplay.innerHTML = `<a id="celcius" href="#" class="active">
        °C</a>| <a id="farenheit" href="#">
        °F
      </a>`;
  let tempDisplay = document.querySelector("#temp-display");
  tempDisplay.innerHTML = Math.round(celciusTemp);
  let farenheitLink = document.querySelector("#farenheit");
  farenheitLink.addEventListener("click", tempToFarenheit);
}
let celciusTemp = null;
search("New York");
let searchForm = document.querySelector(".search");
searchForm.addEventListener("submit", getCurrentData);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", tempToFarenheit);
