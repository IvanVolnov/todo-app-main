// setting selector for mode switcher
const btnColorToggler = document.querySelector(".mode-link");

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
  localStorage.setItem("darkMode", "disabled");
};

// If there is no information on localStorage, then set color mode depending of system color scheme
if (!darkMode) {
  darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "enabled"
    : "disabled";
}

// Switch theme when after loading the page, depanding the state of localStorage
if (darkMode === "enabled") enableDarkMode();

btnColorToggler.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});
