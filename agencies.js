document.addEventListener("DOMContentLoaded", () => {
    const agencyList = document.getElementById("agency-list");
    const searchBox = document.getElementById("search-box");
    const loadingMessage = document.getElementById("loading-message");

    // 🌍 Fetch Agencies from db.json
    function fetchAgencies() {
        loadingMessage.style.display = "block"; // Show loading message
        fetch("http://localhost:3000/agencies")
            .then((response) => response.json())
            .then((agencies) => {
                loadingMessage.style.display = "none"; // Hide loading message
                displayAgencies(agencies);
            })
            .catch((error) => {
                console.error("Error fetching agencies:", error);
                loadingMessage.textContent = "Failed to load agencies.";
            });
    }

    // 🏢 Display Agencies
    function displayAgencies(agencies) {
        agencyList.innerHTML = ""; // Clear existing content
        agencies.forEach((agency) => {
            const li = document.createElement("li");
            li.classList.add("agency-item");
            li.innerHTML = `
                <h3>${agency.name}</h3>
                <p><strong>Location:</strong> ${agency.location}</p>
                <p><strong>Services:</strong> ${agency.services.join(", ")}</p>
            `;
            agencyList.appendChild(li);
        });
    }

    // 🔍 Live Search Filter
    searchBox.addEventListener("input", () => {
        const searchText = searchBox.value.toLowerCase();
        const agencies = document.querySelectorAll(".agency-item");
        agencies.forEach((agency) => {
            const agencyName = agency.querySelector("h3").textContent.toLowerCase();
            agency.style.display = agencyName.includes(searchText) ? "block" : "none";
        });
    });

    // 🚀 Load Agencies on Page Load
    fetchAgencies();
});
