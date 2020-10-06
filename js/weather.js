// http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={"07e2a8964a052cf6f1c86f9c1c5aea2e"}

let iconWeather = document.querySelector(".icon-weather");
let APIKEY = "07e2a8964a052cf6f1c86f9c1c5aea2e";

//  ====== fetch API =======
async function fetchAPI(openWeather) {
  let response = await fetch(openWeather);
  let json = await response.json();
  let { clouds, main, name, weather } = json;

  iconWeather.innerHTML = `${weather[0].icon}`;
  console.log(iconWeather);
}

let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

//  ====== API success =======
function success(pos) {
  let { latitude, longitude } = pos.coords;
  let openWeather = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`;
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
