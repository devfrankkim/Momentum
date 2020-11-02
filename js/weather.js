let iconWeather = document.querySelector(".icon-weather");
let weatherLocation = document.getElementById("weather-location");
let weatherFeel = document.getElementById("weather-feel");
let weatherTemp = document.getElementById("weather-temperature");
let weatherDescription = document.getElementById("weather-description");

const selectElement = document.getElementById("weather-unit");

let APIKEY = "07e2a8964a052cf6f1c86f9c1c5aea2e";

//  ====== fetch API =======
async function fetchAPI(openWeather) {
  let response = await fetch(openWeather);
  let json = await response.json();

  let {
    sys: { country },
    main: { temp, feels_like },
    name,
    // let { description, icon } = weather[0];
    weather: [{ description, icon }],
  } = json;

  iconWeather.src = `http://openweathermap.org/img/wn/${icon}.png`;
  weatherLocation.textContent = `${name}, ${country}`;
  weatherDescription.textContent = `${description}.`;
  weatherTemp.textContent = `${temp}°C`;
  weatherFeel.textContent = `Feels like ${feels_like}°C`;

  weatherDescription.style.textTransform = "capitalize";
}

let options = { maximumAge: 0, timeout: 10000, enableHighAccuracy: true };

//  ====== API success =======
let saveLatLong = [];

function success(pos) {
  let { latitude, longitude } = pos.coords;
  saveLatLong.push(latitude, longitude);


  let openWeather;
  if (location.protocol === 'http:') {
    openWeather = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}&units=metric`;
  } else {
    openWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}&units=metric`;
  }

  fetchAPI(openWeather);

}
//  ====== API error =======
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
/**
An object able to programmatically obtain the position of the device.
It gives Web content access to the location of the device.
This allows a Web site or app to offer customized results based on the user's location. 
*/

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, options);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
getLocation();

selectElement.addEventListener("change", (event) => {
  let openWeather = `http://api.openweathermap.org/data/2.5/weather?lat=${saveLatLong[0]}&lon=${saveLatLong[1]}&appid=${APIKEY}&units=${event.target.value}`;


  if (event.target.value === "Fahrenheit") {
    openWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${saveLatLong[0]}&lon=${saveLatLong[1]}&appid=${APIKEY}&units=imperial`;
  } else {
    openWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${saveLatLong[0]}&lon=${saveLatLong[1]}&appid=${APIKEY}&units=metric`;
  }
  fetchAPI(openWeather);
});
