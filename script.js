"use strict";

const API_KEY = "d5f7294ce9a1b85ab5ba3d5ce4603c02";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const cityNameElem = document.getElementById("city-name");
const tempValueElem = document.getElementById("temp-value");
const descValueElem = document.getElementById("desc-value");
const humidityValueElem = document.getElementById("humidity-value");
const searchInput = document.getElementById("search-input");

// Récupérer la météo par défaut (ex: Brazzaville)
async function fetchWeather(city = "Brazzaville") {
    try {
        const response = await fetch(`${BASE_URL}/weather?q=${city}&units=metric&lang=fr&appid=${API_KEY}`);
        if (!response.ok) throw new Error("Ville introuvable");
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error(error);
        cityNameElem.textContent = "Ville introuvable ou erreur réseau";
    }
}

// Afficher les données sur le Dashboard
function displayWeather(data) {
    cityNameElem.textContent = `${data.name}, ${data.sys.country}`;
    
    // Arrondir la température (Niveau 2)
    const temp = Math.round(data.main.temp);
    tempValueElem.textContent = `${temp}°C`;
    
    descValueElem.textContent = data.weather[0].description;
    humidityValueElem.textContent = `${data.main.humidity}%`;
}

// Recherche par la barre de input
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = searchInput.value.trim();
        if (city) {
            fetchWeather(city);
            searchInput.value = "";
        }
    }
});

// Lancer au chargement initial
fetchWeather("Brazzaville");