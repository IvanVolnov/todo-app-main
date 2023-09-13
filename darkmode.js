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

// If there is no information on localStorage, then set colot mode depending of system color scheme
if (!darkMode) {
  console.log("localstorage os empty");
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
    console.log("dark on");
  } else {
    disableDarkMode();
    console.log("dark off");
  }
});
