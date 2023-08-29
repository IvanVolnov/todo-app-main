"use strict";

// testing local storage
const data = [
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

const setLocalStorage = function () {
  localStorage.setItem("todo", JSON.stringify(data));
};

const getLocalStorage = function () {
  const result = JSON.parse(localStorage.getItem("todo"));
  console.log(result);
};

setLocalStorage();
getLocalStorage();
