"use strict";

const API_KEY = "d5f7294ce9a1b85ab5ba3d5ce4603c02";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const cityNameElem = document.getElementById("city-name");
const tempValueElem = document.getElementById("temp-value");
const descValueElem = document.getElementById("desc-value");
const humidityValueElem = document.getElementById("humidity-value");
const searchInput = document.getElementById("search-input");

// Récupérer la météo d'une ville
async function fetchWeather(city = "Brazzaville") {
    try {
        cityNameElem.textContent = "Chargement...";
        const response = await fetch(`${BASE_URL}/weather?q=${city}&units=metric&lang=fr&appid=${API_KEY}`);
        
        if (!response.ok) {
            throw new Error("Ville introuvable");
        }
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error(error);
        cityNameElem.textContent = "Ville introuvable ❌";
        tempValueElem.textContent = "--°C";
        descValueElem.textContent = "--";
        humidityValueElem.textContent = "--%";
    }
}

// Afficher les données sur le Dashboard
function displayWeather(data) {
    cityNameElem.textContent = `${data.name}, ${data.sys.country}`;
    
    // Arrondir la température (Niveau 2)
    const temp = Math.round(data.main.temp);
    tempValueElem.textContent = `${temp}°C`;
    
    // Mettre la première lettre de la description en majuscule (Niveau 2)
    let description = data.weather[0].description;
    descValueElem.textContent = description.charAt(0).toUpperCase() + description.slice(1);
    
    humidityValueElem.textContent = `${data.main.humidity}%`;
}

// Moteur de recherche via la barre input (Niveau 2)
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