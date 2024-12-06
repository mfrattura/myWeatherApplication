function refreshWeather(response) {
  // Get data from API
  let temperature = response.data.temperature.current;
  let city = response.data.city;
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  let icon = response.data.condition.icon_url;

  // change the elements to the API Data
  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = city;
  tempElement.innerHTML = Math.round(temperature);
  humidityElement.innerHTML = humidity;
  windElement.innerHTML = wind;
  iconElement.src = icon;
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
