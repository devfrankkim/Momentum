const mainfocusForm = document.querySelector(".mainfocus-form");
const mainfocusInput = document.getElementById("mainfocus__input");
const mainfocusToday = document.getElementById("mainfocus-list__today");

const deleteItem = (e) => {
  e.target.parentElement.remove();
};

const finishItem = (e) => {
  console.log(e.target.parentElement.classList.toggle("done"));
};

const addLists = (e) => {
  e.preventDefault();
  if (mainfocusInput.value) {
    let todayMainValue = mainfocusInput.value;
    let toDoList = document.createElement("li");
    let finishedBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");

    finishedBtn.textContent = "✅";
    deleteBtn.textContent = "❌";

    finishedBtn.classList.add(".finished");
    deleteBtn.classList.add(".delete");

    toDoList.innerHTML = `<span>${todayMainValue}</span> <button class="finished">✅</button><button class="delete">❌</button>`;
    mainfocusToday.appendChild(toDoList);

    saveToDos(todayMainValue);
    mainfocusInput.value = "";

    let deleteB = document.querySelectorAll(".delete");
    let finishB = document.querySelectorAll(".finished");

    //   deleteB.forEach((btn) => {
    //     btn.addEventListener("click", deleteItem);
    //   });
    //   finishB.forEach((btn) => {
    //     btn.addEventListener("click", finishItem);
    //   });
  }
};

function paintToDo(value) {
  mainfocusToday.textContent = value;
}

function loadToDos() {
  let getLSGItem = localStorage.getItem("today-focus");
  if (getLSGItem) {
    const parsedToDos = JSON.parse(getLSGItem);
    console.log(parsedToDos);

    // parsedToDos.forEach(function (toDo) {
    //   console.log(toDo);
    //   paintToDo(toDo.text);
    // });
  }
}

function saveToDos(todayMainValue) {
  localStorage.setItem("today-focus", JSON.stringify(todayMainValue));
}

function init() {
  loadToDos();
  mainfocusForm.addEventListener("submit", addLists);
}

mainfocusToday.addEventListener("click", ({ target }) => {
  if (target.classList.contains("finished")) {
    target.parentElement.classList.toggle("done");
  } else if (target.matches(".delete")) {
    target.parentElement.remove();
  }
});

init();
