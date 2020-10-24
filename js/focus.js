const mainfocusForm = document.querySelector(".mainfocus-form");
const mainfocusInput = document.getElementById("mainfocus__input");
const mainfocusToday = document.getElementById("mainfocus-list__today");

let toDos = [];
let finished = [];

const finishOn = (e) => {
  let onID = new Date().getTime();
  let finishObj = {
    id: onID,
    toggle: "ON",
  };
  finished.push(finishObj);

  localStorage.setItem("toggle", JSON.stringify(finished));
  e.target.parentElement.classList.toggle("done");
};

const finishOff = (e) => {
  localStorage.setItem("toggle", null);
  e.target.parentElement.classList.toggle("done");
  console.log("OFF");
};

const deleteItem = (e) => {
  e.target.parentElement.remove();
};

let parsedFinished = JSON.parse(localStorage.getItem("toggle"));

const toggleParsed = (e) => {
  if (parsedFinished) {
    console.log(parsedFinished);
    parsedFinished.forEach((finish) => {
      if (finish["toggle"] === "ON") {
        localStorage.setItem("padding");
      }
    });
  }
};

const finishItem = (e) => {
  let target = e.target;
  let id = new Date().getTime();
  target.classList.add(id);

  // if (localStorage.getItem("toggle")) {
  //   console.log("ON");
  // }

  finishOn(e);
  // toggleParsed(e);
};
mainfocusToday.addEventListener("click", (e) => {
  if (e.target.classList.contains("finished")) {
    finishItem(e);
    var event = e;
    console.log(event);
  } else if (e.target.matches(".delete")) {
    deleteItem(e);
  }
});

function saveToDos() {
  localStorage.setItem("today-focus", JSON.stringify(toDos));
}

function addLists(todayMainValue) {
  let toDoList = document.createElement("li");
  let span = document.createElement("span");
  let finishBtn = document.createElement("button");
  let deleteBtn = document.createElement("button");
  let newId = toDos.length + 1;

  span.textContent = todayMainValue;
  finishBtn.textContent = "✅";
  deleteBtn.textContent = "❌";
  finishBtn.classList.add("finished");
  deleteBtn.classList.add("delete");

  toDoList.appendChild(span);
  toDoList.appendChild(finishBtn);
  toDoList.appendChild(deleteBtn);

  mainfocusToday.appendChild(toDoList);

  let toDoObj = {
    value: todayMainValue,
    id: newId,
  };

  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(e) {
  e.preventDefault();
  let todayMainValue = mainfocusInput.value;
  addLists(todayMainValue);
  mainfocusInput.value = "";
}

function loadToDos() {
  let getLSGItem = localStorage.getItem("today-focus");
  let finishedItem = localStorage.getItem("finished");

  if (getLSGItem !== null) {
    const parsedToDos = JSON.parse(getLSGItem);

    parsedToDos.forEach((btn) => {
      addLists(btn.value);
    });
  }
  //   if (finishedItem !== null) {
  //     const parsedToDos = JSON.parse(finishedItem);
  //     console.log(parsedToDos);
  //   }
}

function init() {
  loadToDos();
  mainfocusForm.addEventListener("submit", handleSubmit);
}

init();

// if (getLSGItem !== null) {
//   const parsedToDos = JSON.parse(getLSGItem);

//   parsedToDos.forEach((btn) => {
//     addLists(btn.value);
//   });
// }

// if (target.classList.contains(id)) {
//   finishOn(e);
// }
// let finishedId = {
//   clikedId: `${target.classList.add(id)}`,
//   toggle: `${JSON.parse(localStorage.getItem("toggle"))}`,
// };
// console.log(finishedId);

// finishToggle = localStorage.getItem("toggle");
// if (finishToggle === "ON") {
//   finishOff(e);
// } else {
//   finishOn(e);
// }

// finished.push(finishedId);
// console.log(finished);
