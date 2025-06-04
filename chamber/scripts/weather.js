const apiKey = "16bb2adec1aa18acac8ea513f7c5ab16"; 
const city = "Windhoek, NA";
const units = "metric";
const lang = "en";

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=${units}&lang=${lang}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=${units}&lang=${lang}&appid=${apiKey}`;

async function fetchWeatherData() {
    try {
        
        const currentResponse = await fetch(currentWeatherUrl);
        const currentData = await currentResponse.json();

        const iconCode = currentData.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        document.getElementById("weatherIcon").src = iconUrl;

        const currentParagraphs = document.querySelector(".currentParagraphs");
        currentParagraphs.innerHTML = `
      <p><strong>${Math.round(currentData.main.temp)}°C</strong></p>
      <p>${currentData.weather[0].description}</p>
      <p>High: ${Math.round(currentData.main.temp_max)}°C</p>
      <p>Low: ${Math.round(currentData.main.temp_min)}°C</p>
      <p>Humidity: ${currentData.main.humidity}%</p>
      <p>Sunrise: ${new Date(currentData.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Windhoek' })}</p>
      <p>Sunset: ${new Date(currentData.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Windhoek' })}</p>
    `;

        
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        const forecastParagraphs = document.querySelector(".forecastParagraphs");
        forecastParagraphs.innerHTML = "";

        const dailyForecasts = forecastData.list.filter((_, index) => index % 8 === 0).slice(0, 3);

        dailyForecasts.forEach(forecast => {
            const day = new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
            const temp = Math.round(forecast.main.temp);

            const p = document.createElement("p");
            p.textContent = `${day}: ${temp}°C`;
            forecastParagraphs.appendChild(p);
        });

    } catch (error) {
        console.error("Weather fetch error:", error);
    }
}

fetchWeatherData();
