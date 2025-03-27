document.addEventListener("DOMContentLoaded", () => {
    fetchDestinations(); // Load destinations when page loads
});

// 1️⃣ Fetch and Display Destinations
function fetchDestinations() {
    fetch("http://localhost:3000/destinations")
        .then(response => response.json())
        .then(data => {
            displayDestinations(data);
            addSearchFunctionality(data); // 🔥 Add search filter functionality
        })
        .catch(error => console.error("Error fetching destinations:", error));
}

// 2️⃣ Event Listener: Dark Mode Toggle
const darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Save dark mode preference to localStorage
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
});

// Apply dark mode preference on page load
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}

// 3️⃣ Display Destinations
function displayDestinations(destinations) {
    const container = document.getElementById("destinations-container");
    container.innerHTML = ""; // Clear previous content

    destinations.forEach(destination => {
        const card = document.createElement("div");
        card.className = "destination-card";

        card.innerHTML = `
            <img src="${destination.image}" alt="${destination.name}">
            <h3>${destination.name}</h3>
            <p><strong>Location:</strong> ${destination.location}</p>
            <p>${destination.description}</p>
        `;

        // Mouseover Event: Change border color on hover
        card.addEventListener("mouseover", () => {
            card.style.border = "3px solid gold";
        });

        card.addEventListener("mouseout", () => {
            card.style.border = "none";
        });

        container.appendChild(card);
    });
}

// 4️⃣ Event Listener: Search/Filter Destinations
function addSearchFunctionality(destinations) {
    const searchInput = document.getElementById("search");

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredDestinations = destinations.filter(destination =>
            destination.name.toLowerCase().includes(searchTerm)
        );
        displayDestinations(filteredDestinations);
    });
}

