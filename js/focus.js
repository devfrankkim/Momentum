const mainfocusForm = document.querySelector(".mainfocus-form");
const mainfocusInput = document.getElementById("mainfocus__input");
const mainfocusToday = document.getElementById("mainfocus-list__today");

let getLSGItem = localStorage.getItem("today-focus");

if (getLSGItem) {
  localStorage.getItem("today-focus");

  mainfocusToday.textContent = getLSGItem;
}

mainfocusForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (mainfocusInput.value) {
    let todayMainValue = mainfocusInput.value;

    localStorage.setItem("today-focus", todayMainValue);
    mainfocusToday.innerText = todayMainValue;
    mainfocusInput.value = "";
  }
});
