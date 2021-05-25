// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5 - day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// current weather api for lat and long
// then api call for one call


// var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city-name');
var searchButton = document.querySelector('.btn');

var weatherContainerEl = document.querySelector('#weather-container');

var apiKey = '2586e568fcf6978353d85f4ef3914364';
var city;



searchButton.addEventListener('click', citySubmit);
var citySubmit = function (event) {
  event.preventDefault();
};


var getCityInfo = function () {
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)

    });
}
getCityInfo();