function refreshWeather(response) {
  // Get data from API
  let temperature = response.data.temperature.current;
  let city = response.data.city;
  let country = response.data.country;
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  let condition = response.data.condition.description;
  let icon = response.data.condition.icon_url;
  let date = new Date(response.data.time * 1000);

  // select the page element
  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  let tempElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let conditionElement = document.querySelector("#condition");
  let iconElement = document.querySelector("#icon");
  let timeElement = document.querySelector("#time");

  // change the elements to the API Data
  cityElement.innerHTML = city;
  countryElement.innerHTML = country;
  tempElement.innerHTML = Math.round(temperature);
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${wind}km/h`;
  conditionElement.innerHTML = condition;
  iconElement.src = icon;
  timeElement.innerHTML = formatDate(date);

  getForecast(response.data.city);
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
  axios
    .get(apiurl)
    .then(refreshWeather)
    .catch(function (error) {
      if (error.response && error.response.status === 404) {
        alert("City not found. Please try again.");
        console.log(error.response);
        console.log(error.response.status);
      } else {
        alert("City not found, please try again later");
      }
    });
}

function searchSubmit(event) {
  event.preventDefault();
  let searchinput = document.querySelector("#search-input");
  searchCity(searchinput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b01d00745bd8dot3d0a8e8b524fd3417";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiURL).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
          <div class="forecast-day">
            <div class="forecast-date">${formatDay(day.time)}</div>
            <div>
            <img class="forecast-icon" src="${day.condition.icon_url}" />
            </div>
            <div class="forecast-temps">
            <strong><div class="forecast-temp">${Math.round(
              day.temperature.maximum
            )}°</div></strong>
              <div class="forecast-temp">${Math.round(
                day.temperature.minimum
              )}°</div>
              
            </div>
            </div>
`;

      forecastElement.innerHTML = forecastHtml;
    }
  });
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

searchCity("Perth");
displayForecast();
