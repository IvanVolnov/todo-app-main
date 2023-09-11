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

// setting variables
const btnColorToggler = document.querySelector(".mode-link");
console.log(btnColorToggler);

// Color theme toggler
// Check prefered color scheme of the browser
// let browserDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

// console.log(browserDarkMode, "browser");
let darkMode = localStorage.getItem("darkMode");

const enableDarkMode = function () {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = function () {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkMode", null);
};

// if (darkMode === null) {
//   localStorage.setItem("darkMode", browserDarkMode);
// }
// if (darkMode) {
//   enableDarkMode();
// }

btnColorToggler.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "enabled") {
    enableDarkMode();
    console.log("dark on");
  } else {
    disableDarkMode();
    console.log("dark off");
  }
});

setLocalStorage();
getLocalStorage();
