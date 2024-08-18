document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '948f963ece2f153da8533b6a8061b7a0'; // Mon API
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const precipitationElement = document.getElementById('precipitation');
    const weatherIconElement = document.getElementById('weather-icon');
    const cityInput = document.getElementById('city-input');
    const searchButton = document.getElementById('search-button');
    const positionElement = document.getElementById('position');

    async function getWeatherByCoords(lat, lon) {
        try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=fr`);
        const data = await response.json();

        if (data.cod === '404') {
            locationElement.textContent = 'Emplacement introuvable';
            temperatureElement.textContent = '';
            descriptionElement.textContent = '';
            precipitationElement.textContent = '';
            return;
        }

        locationElement.textContent = `${data.name}`;
        temperatureElement.textContent = `${data.main.temp.toFixed()}°C`;

        descriptionElement.textContent = `${data.weather[0].description}`;
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIconElement.innerHTML = `<img src="${iconUrl}" alt="${data.weather[0].description}">`;
        } catch (error) {
        console.error('Erreur lors de la récupération des données météorologiques :', error);
        }
    }

    function getCurrentPosition() {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByCoords(lat, lon);
        }, error => {
            console.error('Erreur lors de la géolocalisation :', error);
            locationElement.textContent = 'Impossible de récupérer votre position.';
        });
        } else {
        locationElement.textContent = 'La géolocalisation n\'est pas supporté sur votre navigateur.';
        }
    }

    getCurrentPosition();

    searchButton.addEventListener('click', async () => {
        const city = cityInput.value;
        if (!city) return;

        try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`);
        const data = await response.json();

        if (data.cod === '404') {
            positionElement.remove();
            locationElement.textContent = 'Emplacement introuvable';
            temperatureElement.textContent = '';
            descriptionElement.textContent = '';
            precipitationElement.textContent = '';
            weatherIconElement.innerHTML = '';
            return;
        }

        positionElement.remove();
        locationElement.textContent = `${data.name}`;
        temperatureElement.textContent = `${data.main.temp.toFixed()}°C`;

        descriptionElement.textContent = `${data.weather[0].description}`;
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIconElement.innerHTML = `<img src="${iconUrl}" alt="${data.weather[0].description}">`;
        } catch (error) {
        console.error('Erreur lors de la récupération des données météorologiques :', error);
        }
    });
    });
