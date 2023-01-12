// elements
const inputEl = document.getElementById("city-input");

// btn
const btnSearch = document.getElementById("btn");

// api
const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/",
};

// functions
// loader
window.addEventListener("load", () => {
  const loadEl = document.querySelector(".loader");

  loadEl.style.display = "none";
});

// api function
function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

// displaying results
function displayResults(weather) {
  console.log(weather);
  // getting el
  let displayEl = document.querySelector(".output-container");
  displayEl.style.visibility = "visible";

  let city = document.querySelector(".city");
  let month_date = document.querySelector(".date");
  let temp = document.querySelector(".celcius");
  let weather_el = document.querySelector(".type");
  let range = document.querySelector(".range");

  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let dateTime = new Date(weather.dt * 1000 + weather.timezone * 1000);

  let minutes = dateTime.getMinutes();
  let weekday = dateTime.toLocaleString("default", { weekday: "short" });
  let month = dateTime.toLocaleString("default", { month: "short" });
  let date = dateTime.getDate();
  let year = dateTime.getFullYear();

  month_date.innerText = `${weekday} ${date} - ${month} ${year}`;

  temp.innerText = `${Math.round(weather.main.temp)}°C`;

  weather_el.innerHTML = `${weather.weather[0].main} <i class="fa-solid fa-cloud"></i>`;

  range.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max
  )}°c`;
}

// event listneres
// for button
btnSearch.addEventListener("click", () => {
  if (inputEl.value === "") {
    alert("Please Enter A valid City Name");
  } else {
    getResults(inputEl.value);
  }

  inputEl.value = "";
});

// type & enter give you the output
inputEl.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    getResults(inputEl.value);
  }
  // console.log(cityValue);
});
