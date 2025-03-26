// Wait for the DOM to load before running scripts
document.addEventListener("DOMContentLoaded", () => {
    fetchDestinations();
    setupEventListeners();
});

// Function to fetch and display destinations
function fetchDestinations() {
    fetch("http://localhost:3000/destinations") // Fetch data from db.json
        .then(response => response.json())
        .then(destinations => {
            const destinationsContainer = document.getElementById("destinations-list");
            destinationsContainer.innerHTML = ""; // Clear existing content

            destinations.forEach(destination => {
                const card = document.createElement("div");
                card.classList.add("destination-card");
                card.innerHTML = `
                    <img src="${destination.image}" alt="${destination.name}">
                    <h3>${destination.name}</h3>
                    <p>${destination.description}</p>
                    <button class="book-btn" data-id="${destination.id}">Book Now</button>
                `;
                destinationsContainer.appendChild(card);
            });

            // Add event listeners to booking buttons
            document.querySelectorAll(".book-btn").forEach(button => {
                button.addEventListener("click", (event) => {
                    const destinationId = event.target.getAttribute("data-id");
                    window.location.href = `bookings.html?destination=${destinationId}`;
                });
            });
        })
        .catch(error => console.error("Error fetching destinations:", error));
}

// Function to setup additional event listeners (e.g., dark mode toggle)
function setupEventListeners() {
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
        });
    }
}
