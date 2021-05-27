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






// CODE STARTS BELOW HERE!!!!

var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city-name');
var weatherContainerEl = document.querySelector('#weather-container');
var forecastContainerEl = document.querySelector('#forecast-containers')

var apiKey = '11a28f3b177613b00aee74b2e8b462f4';




// function for user city input into form element
var citySubmit = function (event) {
  // prevent default action
  event.preventDefault();
  var cityName = cityInputEl.value.trim();

  // getting city info and setting it to empty strings for alert
  if (cityName) {
    getCityInfo(cityName)

    cityInputEl.value = '';
    // alert if not value input into form and they click button
  } else {
    alert('Please enter a city')
  }
};
// click event for search button in form
userFormEl.addEventListener('submit', citySubmit);


// function to make api call
getCityInfo = function (city) {
  // weather api call
  var city = cityInputEl.value;
  var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=" + apiKey;
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // setting variables for latitude and longitude to use in apiUrl2
      var lat = data.coord.lat;
      var long = data.coord.lon;

      // onecall api call
      var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&appid=" + apiKey;
      fetch(apiUrl2)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          localStorage.setItem(city, JSON.stringify(data));

          displayWeatherBoard(city)
          displayFutureForecasts(city);

        });
    })
}



// grabbing HTML elements for display weather board
var cityName = document.querySelector('.card-city');
var currentDate = document.querySelector('.card-date');
var temp = document.querySelector('.card-text1');
var wind = document.querySelector('.card-text2');
var humidity = document.querySelector('.card-text3');
var uvIndex = document.querySelector('.card-text4');

function displayWeatherBoard(city) {
  // pulling data out of local storage
  var data = JSON.parse(localStorage.getItem(city));

  // giving the variables data value and creating text content
  cityName.textContent = city
  currentDate.textContent = moment().format('MMMM Do YYYY')
  temp.textContent = 'Temp:' + " " + data.current.temp + "°F";
  wind.textContent = 'Wind:' + " " + data.current.wind_speed + " " + "MPH";
  humidity.textContent = 'Humidity:' + " " + data.current.humidity + '%';
  uvIndex.textContent = 'UV Index:' + " " + data.current.uvi;
};



// creating function to display forecast cards
function displayFutureForecasts(city) {
  // pulling data out of local storage
  var data = JSON.parse(localStorage.getItem(city));
  // grabbing html element for text content
  var forecast = document.querySelectorAll('.card-forecast')

  // looping through data to get daily forecast
  // incrementing daily for 5 day forecast
  for (var i = 0; i < forecast.length; i++) {

    // creating html element
    var date = document.createElement('h5');
    // assigning value to text content
    date.textContent = moment().add((i + 1), 'days').format('MMMM Do YYYY')

    // need to add image icon????

    var temp = document.createElement('p');
    temp.textContent = 'Temp:' + " " + data.daily[i].temp.day + '°F';
    var wind = document.createElement('p');
    wind.textContent = 'Wind:' + " " + data.daily[i].wind_speed + " " + 'MPH';
    var humidity = document.createElement('p');
    humidity.textContent = 'Humidity:' + " " + data.daily[i].humidity + '%';

    // appending created elements
    forecast[i].append(date, temp, wind, humidity);

  }
}









