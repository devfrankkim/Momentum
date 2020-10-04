const nameForm = document.querySelector(".input-name");
const checkName = document.querySelector(".check-name");
let greeting = document.querySelector(".greetings");
let getLSG = localStorage.getItem("name");

if (getLSG) {
  checkMorningNight(getLSG);
}

function checkMorningNight(value) {
  checkName.style.display = "none";
  let time = new Date().getHours();
  let checkTime =
    time < 12
      ? `Good morning, ${value}`
      : time < 18
      ? `Good afternoon, ${value}`
      : `Good evening, ${value}`;

  greeting.textContent = checkTime;
  greeting.style.textTransform = "capitalize";
}

nameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let checkValue = checkName.value;
  checkName.style.display = "none";
  localStorage.setItem("name", checkValue);
  checkMorningNight(checkValue);
});
