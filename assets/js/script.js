//weather API key
const apiKey = "f85207c11a3b25678f5b5937e7203aa2";

// Global variables
let currentInfoEl = document.querySelector("#currentInfo");
let fiveDayEl = document.querySelector("#fiveDay");
let citySearchEl = document.querySelector("#citySearch");
let searchBtnEl = document.querySelector("#searchBtn");
let searchList = document.querySelector("#searchList")
let cityList = [];
let coordinates = {
    name: "",
    latitude: "",
    longitude: ""
}

// Fetch coordinates based on city name by city name
function grabCity() {
    let cityName = citySearchEl.value;
    let queryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`

    fetch(queryURL)
        .then(result => {
            return result.json()
        })
        .then(data => {
            let searchedCityBtn = document.createElement("button");
            searchList.appendChild(searchedCityBtn)
            let city = data[0].name
            let cityLat = data[0].lat
            let cityLon = data[0].lon
            coordinates = {
                name: city,
                latitude: cityLat,
                longitude: cityLon
            }
            cityList = JSON.parse(localStorage.getItem("cities")) || [];
            cityList.push(coordinates);
            console.log("City list", cityList);
            localStorage.setItem("cities", JSON.stringify(cityList))
        })
}

searchBtnEl.addEventListener("click", grabCity);

// Search City Finder