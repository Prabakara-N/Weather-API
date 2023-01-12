// elements
const inputEl = document.getElementById("city-input");

// btn
const btnSearch = document.getElementById("btn");

// functions
// loader
window.addEventListener("load", () => {
  const loadEl = document.querySelector(".loader");

  loadEl.style.display = "none";
});

// fetch api
function getResults(city) {
  let url = `http://api.weatherapi.com/v1/current.json?key=2eee5be1c3914c1f93480912231201&q=${city}&aqi=yes`;
  fetch(url)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

// displaying results
function displayResults(weather) {
  // to show the output container
  const displayEl = document.querySelector(".output-container");
  displayEl.style.visibility = "visible";

  // getting el
  let city = document.querySelector(".city");
  let country = document.querySelector(".country");
  let month_date = document.querySelector(".date");
  let region = document.querySelector(".region");
  let temp = document.querySelector(".celcius");
  let weather_el = document.querySelector(".type");
  let range = document.querySelector(".range");
  let icon = document.querySelector(".weather-icon");

  // icon
  const iconId = weather.current.condition.icon.substr(
    "//cdn.weatherapi.com/weather/64x64".length
  );
  icon.src = "./icons/" + iconId;

  // innertext
  city.innerText = `${weather.location.name},`;
  country.innerText = `${weather.location.country}`;
  region.innerText = `${weather.location.region}`;
  temp.innerText = `${weather.current.temp_c}°C`;
  month_date.innerText = `${weather.location.localtime}`;
  weather_el.innerHTML = `${weather.current.condition.text}`;
  range.innerHTML = `${weather.current.feelslike_c}°C / ${weather.current.temp_c}°C <i class="fa-solid fa-temperature-high">`;
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
});
