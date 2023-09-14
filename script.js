"use strict";
import { ListenClick } from "./helpers.js";

// query selectors
const todosFeild = document.querySelector(".main-feild");
const toggleBtnList = document.querySelectorAll(".toggle-btn");

// data operations

let data;
const sampleData = [
  { item: "Complete online JavaScript course", completed: true },
  { item: "Jog around the park 3x", completed: false },
  { item: "10 minutes meditation", completed: true },
  { item: "Read for 1 hour", completed: false },
  { item: "Pick up groceries", completed: false },
  { item: "Complete Todo App on Frontend Mentor", completed: false },
  { item: "attend a meeting", completed: true },
  { item: "cook dinner", completed: false },
  { item: "plan a vacation", completed: true },
  { item: "do the laundry", completed: true },
  { item: "visit the dentist", completed: false },
  { item: "call a friend", completed: true },
];

const setLocalStorage = function (d) {
  localStorage.setItem("todo", JSON.stringify(d));
  data = sampleData;
};

const adjustLocalStorage = function () {
  data = JSON.parse(localStorage.getItem("todo"));
  console.log(data, "data");
  if (!data) {
    setLocalStorage(sampleData);
    console.log("there was no local Storage");
  }
};

//Renderi todos

const renderTodos = function (mode = "All") {
  todosFeild.innerHTML = "";
  let filter;
  switch (mode) {
    case "All":
      filter = data;
      break;
    case "Active":
      filter = data.filter((x) => !x.completed);
      break;
    case "Completed":
      filter = data.filter((x) => x.completed);
      break;
  }
  filter.forEach((x) =>
    todosFeild.insertAdjacentHTML(
      "beforeend",
      `<form class="task-container" autocomplete="off">
      <label class="task-left">
        <input type="checkbox" class="checkbox" name="checkbox" ${
          x.completed ? "checked" : ""
        }/>
        <p class="task-text ${x.completed ? "task-text__checked" : ""}">
          ${x.item}
        </p>
      </label>
      <a href="#" class="delete-todo-link">
        <img
          class="close-icon"
          src="images/icon-cross.svg"
          alt="delete todo"
      /></a>
    </form>
  `
    )
  );
};

// attach envent listeners

toggleBtnList.forEach((x) => {
  x.addEventListener("click", function (e) {
    e.preventDefault();
    toggleBtnList.forEach((x) => x.classList.remove("toggle-btn__active"));
    renderTodos(x.innerText);
    x.classList.add("toggle-btn__active");
  });
});

adjustLocalStorage();
renderTodos();
