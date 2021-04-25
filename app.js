const app = {};

apikey = `d7fc3ef58680f5283c9ec164da9f40d9`

app.displayWeather = function(result) {
    const weatherHtml = `
    <div class="container">
      <p class="weather-city">${result.name}</p>
      <p class="weather-temp">Temperature is ${result.main.temp}<span>&#8451;</span></p>
      <p class="weather-feels-like">Feels like ${result.main.feels_like}<span>&#8451;</span></p>
      <p class="weather-description">${result.weather[0].description}</p>
      </div>
  `
  $('.results').append(weatherHtml);
};    

app.getWeather = function(query) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?`,
        method: 'GET',
        dataType: 'json',
        data: {
            q: query,
            appid: apikey,
            units: 'metric',
        }
    }).then(function(result) {
        $('.results').empty();
        app.displayWeather(result);
    });
}

app.init = function() {
    $('form').on('submit', function(event) {
        event.preventDefault();
        const userInput = $('#search-input').val();
        // console.log(userInput);
        app.getWeather(userInput);
      });
};

$(function() {
    app.init();
});
