//Toggle Menu
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');

    menuToggle.addEventListener('click', function () {
        menu.classList.toggle('open'); // Alterna a classe 'open'
        menuToggle.textContent = menu.classList.contains('open') ? '✖' : '☰'; // Altera o ícone
    });
});

// Função para calcular os dias faltantes
function missingDays() {
    const dateCOP30 = new Date('2025-11-10');
    const hoje = new Date();
    const diffTime = dateCOP30 - hoje;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}

// Modal Message
function showModal() {
    const diasFaltantes = missingDays();
    const modalMessage = document.getElementById('modalMessage');

    if (modalMessage) {
        if (diasFaltantes > 0) {
            modalMessage.textContent = `${diasFaltantes} days left until the start of COP-30`;
        } else {
            modalMessage.textContent = 'COP-30 has already taken place';
        }

        const modal = document.getElementById('myModal');
        if (modal) {
            modal.style.display = 'block';
        }
    } else {
        console.error('Elemento modalMessage não encontrado no DOM');
    }
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
        modal.style.display = 'none';
    }
}


//API Weather
const apiKey = "5ca622b2540cfdbfae0a3d45bc3af423";
const city = "Belém, BR";
const units = "metric"; // (°C)
const lang = "en";      // Language
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=${units}&lang=${lang}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=${units}&lang=${lang}&appid=${apiKey}`;

async function fetchWeatherData() {
    try {
        // Get Current Weather
        const currentWeatherResponse = await fetch(currentWeatherUrl);
        const currentWeatherData = await currentWeatherResponse.json();

        // Save data
        const maxTemp = Math.round(currentWeatherData.main.temp_max);
        const minTemp = Math.round(currentWeatherData.main.temp_min);
        const humidity = currentWeatherData.main.humidity;
        const sunrise = new Date(currentWeatherData.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const sunset = new Date(currentWeatherData.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const weatherIcon = currentWeatherData.weather[0].icon;
        const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;

        const weatherIconElement = document.getElementById('weatherIcon');
        if (weatherIconElement) {
            weatherIconElement.src = weatherIconUrl;
        }

        const gridCurrent = document.querySelector('.currentParagraphs');
        if (gridCurrent) {
            const currentTemperature = document.createElement('h5');
            currentTemperature.textContent = `${Math.round(currentWeatherData.main.temp)} °C`;
            const currentWeatherDescription = document.createElement('h5');
            currentWeatherDescription.textContent = currentWeatherData.weather[0].description;

            const tempMax = document.createElement('h5');
            tempMax.textContent = `High: ${maxTemp} °C`;
            const tempMin = document.createElement('h5');
            tempMin.textContent = `Low: ${minTemp} °C`;

            const hum = document.createElement('h5');
            hum.textContent = `Humidity: ${humidity}%`;
            const rise = document.createElement('h5');
            rise.textContent = `Sunrise: ${sunrise}`;
            const set = document.createElement('h5');
            set.textContent = `Sunset: ${sunset}`;

            gridCurrent.appendChild(currentTemperature);
            gridCurrent.appendChild(currentWeatherDescription);
            gridCurrent.appendChild(tempMax);
            gridCurrent.appendChild(tempMin);
            gridCurrent.appendChild(hum);
            gridCurrent.appendChild(rise);
            gridCurrent.appendChild(set);
        }

        const forecastParagraphs = document.querySelector('.forecastParagraphs');
        if (forecastParagraphs) {
            const forecastResponse = await fetch(forecastUrl);
            const forecastData = await forecastResponse.json();
            const dailyForecasts = forecastData.list.filter((item, index) => index % 8 === 0).slice(0, 3);

            dailyForecasts.forEach((forecast, index) => {
                const date = new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
                const temp = Math.round(forecast.main.temp);

                const setForecast = document.createElement('h4');
                setForecast.textContent = `${date}: ${temp}°C`;

                forecastParagraphs.appendChild(setForecast);
            });
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

//Get the file name from the url
function getFileNameFromUrl() {
    const path = window.location.pathname;
    const fileName = path.substring(path.lastIndexOf('/') + 1); // Pega o nome do arquivo, sem o caminho completo
    return fileName;
}

//Load the cards data
async function loadCardData() {
    try {
        const fileName = getFileNameFromUrl();
        
        let jsonFile, imagesPath;

        if (fileName === 'cuisine.html') {
            jsonFile = 'data/foods.json';
            imagesPath = 'images/foods-images/';
        } else if (fileName === 'attractions.html') {
            jsonFile = 'data/attractions.json';
            imagesPath = 'images/attractions-images/';
        } else {
            return;
        }

        const response = await fetch(jsonFile);
        const data = await response.json();
        const container = document.getElementById('cards_container');

        if (!container) {
            return;
        }

        data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');

            const cardContent = `
                <img src="${imagesPath}${item.url_photo}" alt="${item.name}" class="card-image" loading="lazy">
                <div class="card-content">
                    <h3 class="card-title">${item.name}</h3>
                    <p class="card-description">${item.description}</p>
                </div>
            `;
            card.innerHTML = cardContent;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error to load JSON:', error);
    }
}


// Footer current year and moddification
document.addEventListener('DOMContentLoaded', function() {
    let currentYear = new Date().getFullYear();
    let lastModification = document.lastModified;
    
    document.getElementById('currentyear').textContent = currentYear;
    document.getElementById('lastModified').textContent = 'Last modification: ' + lastModification;
});


// Call all the funtions
fetchWeatherData();
window.onload = loadCardData;
window.onload = function() {
    const fileName = getFileNameFromUrl();

    if (fileName === 'index.html') { // Exibe o modal apenas na página inicial
        showModal();
    }

    // Chama outras funções conforme necessário
    fetchWeatherData();
    loadCardData();
};