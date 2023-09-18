// setting selector for mode switcher
const btnColorToggler = document.querySelector(".mode-link");

// variable to store dark mode state
let darkMode = localStorage.getItem("darkMode");

const enableDarkMode = function () {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = function () {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkMode", "disabled");
};

// If there is no information on localStorage, then set color mode depending of system color scheme
if (!darkMode) {
  darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "enabled"
    : "disabled";
}

// Switch theme after loading the page, depending of the state of localStorage
if (darkMode === "enabled") enableDarkMode();

btnColorToggler.addEventListener("click", (e) => {
  e.preventDefault();
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});
