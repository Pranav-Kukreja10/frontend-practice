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

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;
    const weatherResponse = await fetch(weatherUrl); 
    const weatherData = await weatherResponse.json(); 

    document.querySelector(".city").innerHTML = cityName; 

    document.querySelector(".temp").innerHTML = Math.round(weatherData.current.temperature_2m) + "°C";

    document.querySelector(".humidity").innerHTML = weatherData.current.relative_humidity_2m + "%";

    document.querySelector(".wind").innerHTML = weatherData.current.wind_speed_10m + " km/h"; 
     
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