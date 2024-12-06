function refreshWeather(response) {
  // Get data from API
  let temperature = response.data.temperature.current;
  let city = response.data.city;
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  let condition = response.data.condition.description;
  let icon = response.data.condition.icon_url;
  let date = new Date(response.data.time * 1000);

  // change the elements to the API Data
  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let conditionElement = document.querySelector("#condition");
  let iconElement = document.querySelector("#icon");
  let timeElement = document.querySelector("#time");

  cityElement.innerHTML = city;
  tempElement.innerHTML = Math.round(temperature);
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${wind}km/h`;
  conditionElement.innerHTML = condition;
  iconElement.src = icon;
  timeElement.innerHTML = formatDate(date);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (minutes < 10) {
    minutes == `0${minutes}`;
  }

  let day = days[date.getDay()];
  return `${day},  ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "b01d00745bd8dot3d0a8e8b524fd3417";
  let apiurl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiurl).then(refreshWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchinput = document.querySelector("#search-input");
  searchCity(searchinput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

searchCity("Kelowna");
