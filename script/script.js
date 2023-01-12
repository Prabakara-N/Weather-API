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
  let temp = document.querySelector(".celcius");
  let weather_el = document.querySelector(".type");
  let range = document.querySelector(".range");

  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".date");
  date.innerText = dateBuilder(now);

  temp.innerText = `${Math.round(weather.main.temp)}°C`;

  weather_el.innerHTML = `${weather.weather[0].main} <i class="fa-solid fa-cloud"></i>`;

  range.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max
  )}°c`;
}

// to get date & month
function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} - ${month} ${year}`;
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
