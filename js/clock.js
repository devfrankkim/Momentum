const container = document.querySelector(".clock-container");
const time = container.querySelector("h1");

function getTime() {
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
  let seconds = new Date().getSeconds();

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  time.textContent = `${hours}:${minutes}:${seconds}`;
}
function init() {
  setInterval(getTime, 1000);
  getTime();
}

init();
