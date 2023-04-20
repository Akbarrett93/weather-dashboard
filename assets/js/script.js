//weather API key
const apiKey = "f85207c11a3b25678f5b5937e7203aa2";

// Global variables
let currentInfoEl = document.querySelector("#currentInfo");
let fiveDayEl = document.querySelector("#fiveDay");
let citySearchEl = document.querySelector("#citySearch");
let searchBtnEl = document.querySelector("#searchBtn");
let searchList = document.querySelector("#searchList");
let tempInfoEl = document.querySelector("#tempInfo");
let windInfoEl = document.querySelector("#windInfo");
let humInfoEl = document.querySelector("#humInfo");
let cityList = [];
let coordinates = {
  name: "",
  latitude: "",
  longitude: "",
};

// Fetch coordinates based on city name by city name
function grabCity() {
  let cityName = citySearchEl.value;
  let queryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;

  fetch(queryURL)
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      let searchedCityBtn = document.createElement("button");
      searchedCityBtn.innerText = data[0].name;
      searchList.appendChild(searchedCityBtn);
      let city = data[0].name;
      let cityLat = data[0].lat;
      let cityLon = data[0].lon;
      coordinates = {
        name: city,
        latitude: cityLat,
        longitude: cityLon,
      };
      cityList = JSON.parse(localStorage.getItem("cities")) || [];
      cityList.push(coordinates);
      localStorage.setItem("cities", JSON.stringify(cityList));
      currentWeather(coordinates.latitude, coordinates.longitude);
    });
}

// Fetch current weather
function currentWeather(latitude, longitude) {
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  fetch(queryURL)
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      console.log(data);
      tempInfoEl.innerText = `Temperature: ${Math.floor(data.main.temp)} F`;
      windInfoEl.innerText = `Wind Speed: ${Math.floor(data.wind.speed)} mph`;
      humInfoEl.innerText = `Humidity: ${Math.floor(data.main.humidity)}%`;
    });
}

searchBtnEl.addEventListener("click", grabCity);

// Search City Finder