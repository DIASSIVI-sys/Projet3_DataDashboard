            # Projet3_DataDashboard
# 🌤️ DataDash - Dashboard Météo Interactif

DataDash est une application web moderne de tableau de bord météo interactif développée en HTML5, CSS3 et JavaScript (Vanilla). Elle permet de consulter en temps réel les conditions météorologiques ainsi que les prévisions sur 5 jours pour n'importe quelle ville du monde, avec la possibilité de basculer entre un mode sombre et un mode clair.

---

## Fonctionnalités

### Niveau 1 : Les Fondamentaux
* **Données initiales :** Chargement automatique de la météo par défaut (Brazzaville) au démarrage de l'application.
* **Affichage (DOM) :** Utilisation de CSS Grid pour structurer les widgets de manière élégante et responsive.

### Niveau 2 : L'Interactivité & Algorithmique
* **Moteur de recherche :** Recherche dynamique d'une ville via une barre de saisie interactive (validation avec la touche "Entrée").
* **Formatage des données :** 
  * Arrondi des températures en valeurs entières (`Math.round`).
  * Mise en majuscule automatique de la première lettre des descriptions météo.

### Niveau 3 : Bonus & Persistance
* **Prévisions sur 5 jours :** Utilisation de l'API de prévision d'OpenWeatherMap filtrée intelligemment pour afficher une prévision quotidienne à midi.
* **Historique & `localStorage` :** Sauvegarde automatique des 5 dernières villes recherchées sous forme de tags cliquables permettant de recharger instantanément la météo d'une ville précédente.
* **Mode Sombre / Clair :** Bouton de bascule de thème avec mémorisation de la préférence de l'utilisateur dans le `localStorage`.

---

## Gestion des Branches Git

Le projet utilise un workflow structuré avec plusieurs branches :

* **`main`** : Branche principale contenant la dernière version stable et finale de l'application.
* **`develop`** : Branche de développement où les différentes fonctionnalités ont été rassemblées et consolidées.
* **`feature/dashboard`** : Branche de fonctionnalité sur laquelle le développement complet (regroupant les trois niveaux, le design et le mode sombre) a été réalisé avant d'être fusionné.

---

## Technologies utilisées

* **HTML5** (Structure sémantique)
* **CSS3** (Variables CSS, Flexbox, Grid, Design Responsive)
* **JavaScript (ES6+)** (Async/Await, Fetch API, Manipulation du DOM, localStorage)
* **FontAwesome** (Icônes vectorielles)
* **OpenWeatherMap API** (Données météo en temps réel et prévisions)

---

##  Installation et Utilisation

1. Clonez ce dépôt ou téléchargez les fichiers sources sur votre machine.
2. Basculez sur la branche souhaitée (ex: `git checkout main` ou `git checkout develop`).
3. Ouvrez le projet dans votre éditeur de code favori (ex: **VS Code**).
4. Ouvrez le fichier `index.html` dans votre navigateur web (ou utilisez l'extension *Live Server* de VS Code).
5. *Note : Si vous utilisez votre propre clé API OpenWeatherMap, remplacez la variable `API_KEY` dans le fichier `script.js`.*

---

## Structure du projet

```text
/
├── index.html       # Structure principale de l'application
├── style.css        # Styles et gestion des thèmes (Dark/Light)
└── script.js        # Logique, appels API et gestion du localStorage