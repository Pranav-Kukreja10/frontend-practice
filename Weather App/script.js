const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
    try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length == 0) {
            alert("City not found. Please try another name.");
            return;
        }


        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;
        const cityName = geoData.results[0].name;

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        document.querySelector(".city").innerHTML = cityName;

        document.querySelector(".temp").innerHTML = Math.round(weatherData.current.temperature_2m) + "°C";

        document.querySelector(".humidity").innerHTML = weatherData.current.relative_humidity_2m + "%";

        document.querySelector(".wind").innerHTML = weatherData.current.wind_speed_10m + " km/h";

        const weatherCode = weatherData.current.weather_code;
        const isDay = weatherData.current.is_day;

        const weatherIcon = document.querySelector(".weather-icon");
        const weatherInfo = document.querySelector(".weather-info");

        const timeOfDay = isDay === 1 ? "d" : "n";

        //Map Open-Meteo WMO codes to the external CDN icon codes
        const wmoToIconMap = {
            0: "01", // Clear sky
            1: "02", // Mainly clear
            2: "03", // Partly cloudy
            3: "04", // Overcast
            45: "50", 48: "50", // Fog
            51: "09", 53: "09", 55: "09", 56: "09", 57: "09", // Drizzle / Freezing Drizzle
            61: "10", 63: "10", 65: "10", // Rain
            66: "13", 67: "13", // Freezing Rain
            71: "13", 73: "13", 75: "13", 77: "13", // Snow
            80: "09", 81: "09", 82: "09", // Rain showers
            85: "13", 86: "13", // Snow showers
            95: "11", 96: "11", 99: "11" // Thunderstorms
        };

        const iconCode = wmoToIconMap[weatherCode] || "01";

        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}${timeOfDay}@4x.png`;
        const weatherCodeMap = {
            0: "Clear Sky",
            1: "Mainly Clear",
            2: "Partly Cloudy",
            3: "Overcast",
            45: "Fog",
            48: "Fog",
            51: "Drizzle",
            53: "Drizzle",
            55: "Drizzle",
            56: "Drizzle",
            57: "Freezing Drizzle",
            61: "Rain",
            63: "Rain",
            65: "Heavy Rain",
            66: "Freezing Rain",
            67: "Freezing Rain",
            71: "Snow",
            73: "Snow",
            75: "Snow Grains",
            77: "Snow Grains",
            80: "Rain Showers",
            81: "Rain Showers",
            82: "Heavy Rain Showers",
            85: "Snow Showers",
            86: "Snow Showers",
            95: "Thunderstorm",
            96: "Thunderstorm",
            99: "Thunderstorm",
        };

        weatherInfo.innerHTML = weatherCodeMap[weatherCode] || "Unknown Weather";

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city !== "") {
        checkWeather(city);
    }
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = searchBox.value.trim();
        if (city !== "") {
            checkWeather(city);
        }
    }
})