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
  // api key
  let url = `http://api.weatherapi.com/v1/current.json?key=2eee5be1c3914c1f93480912231201&q=${city}`;
  fetch(url)
    .then((weather) => {
      //location was incorrect or not main location its shows error
      if (!weather.ok) {
        alert("No weather found !!!");
        throw new Error("No weather found !!!");
      }
      return weather.json();
    })
    .then(displayResults);
}

// to get time & date
function getTime(timeNow) {
  // to get time & date in string format
  let d = new Date(timeNow.location.localtime);
  let weekday = d.toLocaleString("default", { weekday: "short" });
  let month = d.toLocaleString("default", { month: "short" });
  let date = d.getDate();
  let hour = d.getHours();
  let mins = d.getMinutes();

  let period = "AM";

  h = hour > 12 ? hour - 12 : hour;
  hr = h < 10 ? `0${h}` : h;
  m = mins < 10 ? `0${mins}` : mins;
  period = hour >= 12 ? "PM" : "AM";

  return `${weekday}, ${month} ${date} - ${hr} : ${m} ${period}`;
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
  let iconlink = weather.current.condition.icon;
  let iconId = iconlink.substr("//cdn.weatherapi.com/weather/64x64".length);
  icon.src = "./icons/" + iconId;

  // innertext
  city.innerText = `${weather.location.name},`;
  country.innerText = `${weather.location.country}`;
  region.innerText = `${weather.location.region}`;
  temp.innerText = `${weather.current.temp_c}°C`;
  month_date.innerText = getTime(weather);
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
    inputEl.value = "";
  }
});
