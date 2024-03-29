//weather API key
const apiKey = "f85207c11a3b25678f5b5937e7203aa2";

// Global variables
let citySearchEl = document.querySelector("#citySearch");
let cityNameEl = document.querySelector("#city");
let searchBtnEl = document.querySelector("#searchBtn");
let searchList = document.querySelector("#searchList");
let tempInfoEl = document.querySelector("#tempInfo");
let windInfoEl = document.querySelector("#windInfo");
let humInfoEl = document.querySelector("#humInfo");
let cardInfoEl = document.querySelectorAll("#card");
let cityList = [];
let coordinates = {
  name: "",
  latitude: "",
  longitude: "",
};

// Date converter from UTC
function dateConverter(dt) {
  let newDay = new Date(dt * 1000);
  return newDay.toDateString("en-us");
}

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
      cityList.push(coordinates);
      currentWeather(coordinates.latitude, coordinates.longitude);

      fiveDay(coordinates.latitude, coordinates.longitude);
      cityList = JSON.parse(localStorage.getItem("cities")) || [];
      localStorage.setItem("cities", JSON.stringify(cityList));
      searchedCityBtn.addEventListener("click", function recallCity() {
        currentWeather(data[0].lat, data[0].lon);
        fiveDay(data[0].lat, data[0].lon);
      });
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
      tempInfoEl.innerText = `Temperature: ${Math.floor(data.main.temp)} F`;
      windInfoEl.innerText = `Wind Speed: ${Math.floor(data.wind.speed)} mph`;
      humInfoEl.innerText = `Humidity: ${Math.floor(data.main.humidity)}%`;
    });
}

// Fetch 5 day forecast
function fiveDay(latitude, longitude) {
  let queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  fetch(queryURL)
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      // Making an array to populate the 5 days of cards
      infoArray = [];
      for (let i = 0; i < data.list.length; i += 8) {
        infoArray.push(data.list[i]);
      }
      console.log(infoArray);
      cityNameEl.innerText = data.city.name;
      for (let i = 0; i < cardInfoEl.length; i++) {
        cardInfoEl[i].children[0].innerText = `${dateConverter(
          infoArray[i].dt
        )}`;
        cardInfoEl[i].children[1].innerText = `Temperature: ${Math.floor(
          infoArray[i].main.temp
        )} F`;
        cardInfoEl[i].children[2].innerText = `Wind Speed: ${Math.floor(
          infoArray[i].wind.speed
        )} mph`;
        cardInfoEl[i].children[3].innerText = `Humidity: ${Math.floor(
          infoArray[i].main.humidity
        )}%`;
      }
    });
}

// Function for already searched buttons
function buttonClicks() {
  cityList = JSON.parse(localStorage.getItem("cities")) || [];
  localStorage.setItem("cities", JSON.stringify(cityList));
  console.log(cityList);
  for (let i = 0; i < cityList.length; i++) {
    let searchedBtn = document.createElement("button");
    searchedBtn.innerText = cityList[i].name;
    searchList.appendChild(searchedBtn);
    searchedBtn.addEventListener("click", function recallCity() {
      currentWeather(cityList[i].latitude, cityList[i].longitude);
      fiveDay(cityList[i].latitude, cityList[i].longitude);
    });
  }
}

// Display a default city
function onLoad() {
  currentWeather(35.8235, -78.8256);
  fiveDay(35.8235, -78.8256);
}

onLoad();
buttonClicks();
searchBtnEl.addEventListener("click", grabCity);