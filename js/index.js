document.addEventListener("DOMContentLoaded", () => {
    fetchDestinations(); // Load destinations when page loads
});

// 1️⃣ Fetch and Display Destinations
function fetchDestinations() {
    fetch("https://phase-1-project-kaizen.onrender.com/destinations")
        .then(response => response.json())
        .then(data => {
            // Process image URLs before displaying
            const destinationsWithFullImagePaths = data.map(destination => {
                return {
                    ...destination,
                    // Ensure image path is complete
                    image: getFullImagePath(destination.image)
                };
            });
            displayDestinations(destinationsWithFullImagePaths);
            addSearchFunctionality(destinationsWithFullImagePaths);
        })
        .catch(error => console.error("Error fetching destinations:", error));
}

// Helper function to construct proper image paths
function getFullImagePath(imagePath) {
    // If it's already a full URL, return as-is
    if (imagePath.startsWith('http')) {
        return imagePath;
    }
    
    // If using local images with JSON server
    // Assuming your images are in a 'public/images' folder
    return `https://phase-1-project-kaizen.onrender.com/images/${imagePath}`;
}

// 2️⃣ Event Listener: Dark Mode Toggle
const darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
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

        // Add fallback image if needed
        const imageUrl = destination.image || 'default-placeholder.jpg';
        
        card.innerHTML = `
            <img src="${imageUrl}" alt="${destination.name}" 
                 onerror="this.src='fallback-image.jpg';this.alt='Image not available'">
            <h3>${destination.name}</h3>
            <p><strong>Location:</strong> ${destination.location}</p>
            <p>${destination.description}</p>
        `;

        // Mouseover effects
        card.addEventListener("mouseover", () => {
            card.style.border = "3px solid gold";
        });
        card.addEventListener("mouseout", () => {
            card.style.border = "none";
        });

        container.appendChild(card);
    });
}

// 4️⃣ Search/Filter Functionality
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

// server.js or app.js

const express = require('express');
const app = express();

// Use the environment variable for port, defaulting to 3000 if not specified
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
