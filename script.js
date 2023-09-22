"use strict";
import { listenClick } from "./helpers.js";

// query selectors
const todosFeild = document.querySelector(".main-feild");
const toggleBtnList = document.querySelectorAll(".toggle-btn");
const mainFeild = document.querySelector(".main-feild");
const btnClearCompleted = document.getElementById("clear-btn");
const formNewTodo = document.getElementById("input");
const counter = document.getElementById("counter");
// const allDraggables = document.querySelectorAll(".task-container");

// variables
let modeStatus = "All";
let data;
const sampleData = [
  { item: "Complete online JavaScript course", completed: true },
  { item: "Jog around the park 3x", completed: false },
  { item: "10 minutes meditation", completed: true },
  { item: "Read for 1 hour", completed: false },
  { item: "Pick up groceries", completed: false },
  { item: "Complete Todo App on Frontend Mentor", completed: false },
];

// LocalStorage operations

const setLocalStorage = function (d) {
  localStorage.setItem("todo", JSON.stringify(d));
};

const adjustLocalStorage = function () {
  data = JSON.parse(localStorage.getItem("todo"));
  console.log(data, "data");
  if (!data) {
    setLocalStorage(sampleData);
    data = sampleData;
    console.log("there was no local Storage");
  }
};

//Updating counter

const updateCounter = function () {
  counter.innerHTML = `${data.filter((x) => !x.completed).length} items left`;
};

// Drag and Drop

const initSortableList = (e) => {
  const draggingItem = mainFeild.querySelector(".task-container__dragged");
  const siblings = [
    ...mainFeild.querySelectorAll(
      ".task-container:not(.task-container__dragged)"
    ),
  ];
  let nextSibling = siblings.find((el) => {
    return e.pageY <= el.offsetTop + el.offsetHeight / 2;
  });
  mainFeild.insertBefore(draggingItem, nextSibling);
};

const attachDragEvents = function () {
  const allDraggables = document.querySelectorAll(".task-container");
  allDraggables.forEach((x) => {
    x.addEventListener("dragstart", () =>
      setTimeout(() => x.classList.add("task-container__dragged"), 0)
    );
    x.addEventListener("dragend", () => {
      x.classList.remove("task-container__dragged");
      const oldIndex = x.getAttribute("order");
      const grabbedItem = data[oldIndex];
      const newIndex = [...x.parentElement.children].indexOf(x);
      data.splice(oldIndex, 1);
      data.splice(newIndex, 0, grabbedItem);
      setLocalStorage(data);
    });
  });
  mainFeild.addEventListener("dragover", initSortableList);
};

//Render todos

const renderTodos = function () {
  todosFeild.innerHTML = "";
  let filter;
  switch (modeStatus) {
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
  filter.forEach((x, i) =>
    todosFeild.insertAdjacentHTML(
      "beforeend",
      `<form class="task-container" autocomplete="off" order = ${i} draggable="true">
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
  updateCounter();
  attachDragEvents();
};

// checkbox mechanic

listenClick(mainFeild, ".checkbox", (e) => {
  e.target.nextElementSibling.classList.toggle("task-text__checked");
  let todoOrder = e.target.form.attributes.order.value;
  data[todoOrder].completed
    ? (data[todoOrder].completed = false)
    : (data[todoOrder].completed = true);
  setLocalStorage(data);
  updateCounter();
});

// deleting todo mechanic

listenClick(mainFeild, ".delete-todo-link", (e) => {
  e.preventDefault();
  let todoOrder =
    e.target.localName === "img"
      ? +e.target.parentElement.parentElement.attributes.order.value
      : +e.target.parentElement.attributes.order.value;
  data.splice(todoOrder, 1);
  renderTodos();
  setLocalStorage(data);
});

// adding new todo

formNewTodo.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTodo = {
    item: document.getElementById("new-todo-text").value,
    completed: false,
  };
  data.unshift(newTodo);
  renderTodos();
  setLocalStorage(data);
  document.getElementById("new-todo-text").value = "";
});

// clear completed

btnClearCompleted.addEventListener("click", (e) => {
  e.preventDefault();
  data = data.filter((x) => !x.completed);
  renderTodos();
  setLocalStorage(data);
});

// toggle filter buttons

toggleBtnList.forEach((x) => {
  x.addEventListener("click", (e) => {
    e.preventDefault();
    toggleBtnList.forEach((x) => x.classList.remove("toggle-btn__active"));
    modeStatus = x.innerText;
    renderTodos();
    x.classList.add("toggle-btn__active");
  });
});

//

// init
adjustLocalStorage();
renderTodos();
