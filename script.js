"use strict";

const API_KEY = "d5f7294ce9a1b85ab5ba3d5ce4603c02";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const cityNameElem = document.getElementById("city-name");
const tempValueElem = document.getElementById("temp-value");
const descValueElem = document.getElementById("desc-value");
const humidityValueElem = document.getElementById("humidity-value");
const searchInput = document.getElementById("search-input");
const forecastGrid = document.getElementById("forecast-grid");
const historyTagsElem = document.getElementById("history-tags");

// Récupérer la météo actuelle et les prévisions
async function fetchWeather(city = "Brazzaville") {
    try {
        cityNameElem.textContent = "Chargement...";
        
        // 1. Météo actuelle
        const response = await fetch(`${BASE_URL}/weather?q=${city}&units=metric&lang=fr&appid=${API_KEY}`);
        if (!response.ok) throw new Error("Ville introuvable");
        const data = await response.json();
        displayWeather(data);

        // Sauvegarder dans l'historique
        saveToHistory(data.name);

        // 2. Prévisions sur 5 jours
        const forecastResponse = await fetch(`${BASE_URL}/forecast?q=${city}&units=metric&lang=fr&appid=${API_KEY}`);
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
        }

    } catch (error) {
        console.error(error);
        cityNameElem.textContent = "Ville introuvable ❌";
        tempValueElem.textContent = "--°C";
        descValueElem.textContent = "--";
        humidityValueElem.textContent = "--%";
        forecastGrid.innerHTML = "";
    }
}

// Afficher la météo actuelle
function displayWeather(data) {
    cityNameElem.textContent = `${data.name}, ${data.sys.country}`;
    const temp = Math.round(data.main.temp);
    tempValueElem.textContent = `${temp}°C`;
    
    let description = data.weather[0].description;
    descValueElem.textContent = description.charAt(0).toUpperCase() + description.slice(1);
    humidityValueElem.textContent = `${data.main.humidity}%`;
}

// Afficher les prévisions sur 5 jours
function displayForecast(data) {
    forecastGrid.innerHTML = "";
    
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    dailyForecasts.forEach(forecast => {
        const dateObj = new Date(forecast.dt * 1000);
        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        const formattedDate = dateObj.toLocaleDateString('fr-FR', options);

        const temp = Math.round(forecast.main.temp);
        let description = forecast.weather[0].description;
        description = description.charAt(0).toUpperCase() + description.slice(1);

        const card = document.createElement("div");
        card.className = "widget forecast-card";
        card.innerHTML = `
            <h4 class="forecast-date">${formattedDate}</h4>
            <p class="forecast-temp">${temp}°C</p>
            <p class="forecast-desc">${description}</p>
        `;
        forecastGrid.appendChild(card);
    });
}

// Gestion de l'historique
function saveToHistory(cityName) {
    let history = JSON.parse(localStorage.getItem("weather_history")) || [];
    
    history = history.filter(city => city.toLowerCase() !== cityName.toLowerCase());
    history.unshift(cityName);
    
    if (history.length > 5) history.pop();
    
    localStorage.setItem("weather_history", JSON.stringify(history));
    displayHistory();
}

// Afficher les tags
function displayHistory() {
    const history = JSON.parse(localStorage.getItem("weather_history")) || [];
    historyTagsElem.innerHTML = "";

    history.forEach(city => {
        const tag = document.createElement("button");
        tag.textContent = city;
        tag.className = "history-tag";
        
        tag.addEventListener("click", () => {
            fetchWeather(city);
        });

        historyTagsElem.appendChild(tag);
    });
}

// Moteur de recherche
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = searchInput.value.trim();
        if (city) {
            fetchWeather(city);
            searchInput.value = "";
        }
    }
});

displayHistory();
fetchWeather("Brazzaville");