document.addEventListener("DOMContentLoaded", () => {
    fetchDestinations(); // Load destinations when page loads
});

// 1️⃣ Event Listener: Fetch destinations from JSON Server
function fetchDestinations() {
    fetch("http://localhost:3000/destinations")
        .then(response => response.json())
        .then(data => displayDestinations(data))
        .catch(error => console.error("Error fetching destinations:", error));
}

// 2️⃣ Event Listener: Dark mode toggle
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

function displayDestinations(destinations) {
    const container = document.getElementById("destinations-container");
    container.innerHTML = ""; // Clear previous content

    destinations.forEach(destination => {
        const card = document.createElement("div");
        card.className = "destination-card";

        card.innerHTML = `
            <img src="${destination.image}" alt="${destination.name}">
            <h3>${destination.name}</h3>
            <p><strong>Location:</strong> ${destination.location}</p> <!-- FIXED: Added location -->
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
