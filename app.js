const app = {};

apikey = `d7fc3ef58680f5283c9ec164da9f40d9`
url = `https://api.openweathermap.org/data/2.5/weather?`

app.displayWeather = function(result) {
    const weatherHtml = `
    <div class="container">
      <p>${result.name}</p>
      <p>Temperature is ${result.main.temp}<span>&#8451;</span></p>
      <p>Feels like ${result.main.feels_like}<span>&#8451;</span></p>
      <p>${result.weather[0].description}</p>
      </div>
  `
  $('.results').append(weatherHtml);
};  

app.returnError = function(result) {
    const errorHtml = `
    <div class="container">
      <p class="error-message">No city found with that name.</p>
      <p class="error-message">Try again!</p>
      </div>
  `
  $('.results').append(errorHtml);
}

app.getWeather = function(query) {
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        data: {
            q: query,
            appid: apikey,
            units: 'metric',
        }
    }).then(function(result) {
        $('.results').empty();
        app.displayWeather(result)
    }).fail(function(result) {
        $('.results').empty();
        app.returnError(result)
    });
}

app.init = function() {
    $('form').on('submit', function(event) {
        event.preventDefault();
        const userInput = $('#search-input').val();
        app.getWeather(userInput);
      });
};

$(function() {
    app.init();
});
