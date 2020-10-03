const nameForm = document.querySelector(".input-name");
const checkName = document.querySelector(".check-name");
let greeting = document.querySelector(".greetings");

// Set local storage
let getLSG = localStorage.getItem("name");

if (getLSG) {
  greeting.textContent = `Hellllooooo ${localStorage.getItem("name")}`;
  checkName.style.display = "none";
}

nameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  checkName.style.display = "none";
  localStorage.setItem("name", checkName.value);
  greeting.textContent = `Hellllooooo ${localStorage.getItem("name")}`;
});
