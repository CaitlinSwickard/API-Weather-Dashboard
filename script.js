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

// first function is on submit button on click to get the 1st api
// second function store long and lat into variables to pass it into the second api call

//nested url request
// variable for long and lat
// 
// then create i for loop to loop through both api calls again
// then append all the data info that you need
// function to store to local data
// function to leave on page at refresh





// CODE STARTS BELOW HERE!!!!

var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city-name');
var weatherContainerEl = document.querySelector('#weather-container');
var forecastContainerEl = document.querySelector('#forecast-containers')

var apiKey = '11a28f3b177613b00aee74b2e8b462f4';
var city = cityInputEl.value;





// function for user city input into form element
var citySubmit = function (event) {
  // prevent default action
  event.preventDefault();
  var cityName = cityInputEl.value.trim();
  // getting city info and setting it to empty strings 
  if (cityName) {
    getCityInfo(cityName)

    weatherContainerEl.textContent = '';
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
          // storing city searched to local storage
          localStorage.setItem(city, JSON.stringify(data))
          console.log(localStorage.setItem(city, JSON.stringify(data)))

          displayWeatherBoard(city);
          console.log(city);

        });
    })
}




function displayWeatherBoard(city) {
  var data = JSON.parse(localStorage.getItem(city));
  console.log(JSON.parse(localStorage.getItem(city)))

  // grabbing HTML elements for display weather board
  var cityName = document.querySelector('.card-city');
  var currentDate = document.querySelector('.card-date');
  var temp = document.querySelector('.card-text1');
  var wind = document.querySelector('.card-text2');
  var humidity = document.querySelector('.card-text3');
  var uvIndex = document.querySelector('.card-text4');

  // giving the variables data value 
  cityName.textContent = data.name;
  temp.textContent = data.current.temp;
  wind.textContent = data.current.wind_speed;
  humidity.textContent = data.current.humidity;
  uvIndex.textContent = data.current.uvi;
}








