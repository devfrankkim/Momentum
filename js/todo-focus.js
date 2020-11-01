const mainfocusForm = document.querySelector(".mainfocus-form");
const mainfocusInput = document.getElementById("mainfocus__input");
const mainfocusToday = document.getElementById("mainfocus-list__today");
const completedItems = document.getElementById("completed-items");
let toDos = [];
/*********************************************
  FUNCTIONS
*********************************************/
function getLocalStorage() {
  const items = localStorage.getItem("todos");
  return items !== null ? JSON.parse(items) : [];
}
function setLocalStorage(items) {
  localStorage.setItem("todos", JSON.stringify(items));
}
function deleteItem(id) {
};
function addItem(todayMainValue) {
  let newId = toDos.length + 1;
  const toDoItem = {
    value: todayMainValue,
    id: newId,
    completed: false
  };
  toDos.push(toDoItem);
  console.log(toDos, "HEH")
}
function createItemElement(item) {
  const toDoItem = document.createElement("li");
  const span = document.createElement("span");
  const checkbox = document.createElement("INPUT");
  const deleteBtn = document.createElement("button");
  toDoItem.dataset.id = item.id;
  checkbox.setAttribute("type", "checkbox");
  span.textContent = item.value;
  deleteBtn.textContent = ":x:";
  item.completed ? checkbox.checked = true : checkbox.checked = false;
  deleteBtn.classList.add("delete");
  toDoItem.appendChild(span);
  toDoItem.appendChild(checkbox);
  toDoItem.appendChild(deleteBtn);
  return toDoItem;
}
function renderHTML(items, completed, containerDiv) {
  containerDiv.innerHTML = '';
  items.forEach(item => item.completed === completed && containerDiv.appendChild(createItemElement(item)));
}
function handleAddItem(e) {
  e.preventDefault();
  const userInput = mainfocusInput.value;
  addItem(userInput);
  mainfocusInput.value = "";
  renderHTML(toDos, false, mainfocusToday);
  renderHTML(toDos, true, completedItems);
  setLocalStorage(toDos);
}
function checkboxAction(e, completed) {
  if (e.target.type === 'checkbox') {
    toDos = toDos.map(item => item.id == e.target.parentElement.getAttribute('data-id') 
      ? {...item, completed: completed} : item)
  }
}
function delelteAction(e) {
  if (e.target.classList.contains('delete')) {
    toDos = toDos.filter(item => item.id != e.target.parentElement.getAttribute('data-id'));
  }
}
/*********************************************
  EVENT LISTENERS
*********************************************/
mainfocusToday.addEventListener("click", (e) => {
    checkboxAction(e, true);
    delelteAction(e);  
    renderHTML(toDos, false, mainfocusToday);
    renderHTML(toDos, true, completedItems);  
    setLocalStorage(toDos);
});
completedItems.addEventListener("click", (e) => {
  checkboxAction(e, false);
  delelteAction(e);
  renderHTML(toDos, false, mainfocusToday);
  renderHTML(toDos, true, completedItems);  
  setLocalStorage(toDos);
});
/*********************************************
  MAIN FUNCTION
*********************************************/
function init() {
  toDos = getLocalStorage();
  mainfocusForm.addEventListener("submit", handleAddItem);
  renderHTML(toDos, false, mainfocusToday);
  renderHTML(toDos, true, completedItems);
}
init();