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
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dateTime = document.querySelector("#date-time");
  dateTime.innerHTML = `${day} ${date} ${month} ${hours}:${minutes}`;
}
function tempToFarenheit(event) {
  event.preventDefault();
  let tempDisplay = document.querySelector("#temp-display");
  let temp = tempDisplay.innerHTML;
  if (temp < 45) {
    let tempInFarenheit = Math.round((temp * 9) / 5 + 32);
    tempDisplay.innerHTML = `${tempInFarenheit}`;
  }
}
function tempToCelcius(event) {
  event.preventDefault();
  let tempDisplay = document.querySelector("#temp-display");
  let temp = tempDisplay.innerHTML;
  if (temp > 45) {
    let tempInCelcius = Math.round(((temp - 32) * 5) / 9);
    tempDisplay.innerHTML = `${tempInCelcius}`;
  }
}
function showWeather(response) {
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
}
function search(city) {
  let apiKey = "fc119741c476f1c5aa5601dcd5623127";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
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
currentDateTime();
search("New York");
let searchForm = document.querySelector(".search");
searchForm.addEventListener("submit", getCurrentData);
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);
let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", tempToFarenheit);
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", tempToCelcius);
