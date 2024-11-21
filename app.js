const apiKey = 'ed58872a931d8984fca6992ea6335843';
const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('city');
const weatherInfo = document.getElementById('weatherInfo');
const videoElement = document.getElementById('background-video');

getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    } else {
        alert('Пожалуйста, введите название города!');
    }
});

function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Город не найден');
            }
            return response.json();
        })
        .then(data => {
            const weatherDescription = data.weather[0].main.toLowerCase();
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            weatherInfo.innerHTML = `
                <h2>${city}</h2>
                <p>Погода: ${data.weather[0].description}</p>
                <p>Температура: ${temperature}°C</p>
                <p>Влажность: ${humidity}%</p>
                <p>Скорость ветра: ${windSpeed} м/с</p>
            `;

            changeBackgroundVideo(weatherDescription);
        })
        .catch(error => {
            weatherInfo.innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
        });
}

function changeBackgroundVideo(weather) {
    switch(weather) {
        case 'clear':
            videoElement.src = 'videos/sunny.mp4';
            break;
        case 'clouds':
            videoElement.src = 'videos/cloudy.mp4';
            break;
        case 'rain':
            videoElement.src = 'videos/rain.mp4';
            break;
        case 'snow':
            videoElement.src = 'videos/snow.mp4';
            break;
        case 'thunderstorm':
            videoElement.src = 'videos/thunderstorm.mp4';
            break;
        case 'drizzle':
            videoElement.src = 'videos/drizzle.mp4';
            break;
        default:
            videoElement.src = 'videos/default.mp4';
    }
    videoElement.play();
}



