Kaizen Connect – Smart Tourism Management System
🚀 A modern web-based tourism management system that connects travelers with destinations and travel agencies seamlessly.

📌 Project Overview
Kaizen Connect is designed to simplify tourism management in Africa. It allows users to:
✅ Browse tourist destinations with images and details.
✅ View and interact with verified travel agencies.
✅ Book trips easily by selecting a destination and agency.
✅ Manage bookings (confirm or cancel) dynamically.
✅ Switch between dark mode and light mode for better user experience.
✅ Search for destinations and agencies in real time.
✅ Contact support via Contact Us Form.

📂 Project Structure
graphql
Copy
Edit
📂 kaizen-connect/
 ┣ 📂 assets/       # (Images, logos, icons)
 ┣ 📂 css/  
 ┃ ┗ 📜 styles.css  # (Main CSS file with African brown theme)
 ┣ 📂 js/  
 ┃ ┣ 📜 index.js       # (Handles homepage functions)
 ┃ ┣ 📜 bookings.js    # (Manages bookings and form interactions)
 ┃ ┣ 📜 agencies.js    # (Fetches and displays agencies)
 ┃ ┣ 📜 search.js      # (Implements search functionality)
 ┃ ┗ 📜 theme.js       # (Handles dark mode toggle)
 ┣ 📜 db.json         # (Fake API data for destinations, agencies, and bookings)
 ┣ 📜 index.html      # (Homepage)
 ┣ 📜 bookings.html   # (Bookings page)
 ┣ 📜 agencies.html   # (Travel agencies page)
 ┗ 📜 README.md       # (This file)
📊 MVPs (Minimum Viable Product) Achieved
✅ JSON Server Backend: Serves tourism data via a local API.
✅ Asynchronous Fetching: Uses fetch() to load destinations, agencies, and bookings.
✅ Dynamic Bookings: Users can add, confirm, and delete bookings.
✅ Event Listeners: Handles form submissions, button clicks, and UI interactions.
✅ Array Iteration Methods: Uses .map(), .filter(), .forEach() to manipulate data.
✅ Dark Mode & Light Mode Toggle: Improves UI accessibility.
✅ Live Search Functionality: Searches destinations and agencies without reloading.

💡 Key Features & Code Highlights
1️⃣ Fetching Data from JSON Server
This function loads and displays destinations dynamically:

js
Copy
Edit
fetch("http://localhost:3000/destinations")
  .then(res => res.json())
  .then(destinations => {
    destinations.forEach(destination => {
      document.querySelector("#destinations-list").innerHTML += `
        <div class="destination">
          <img src="${destination.image}" alt="${destination.name}">
          <h3>${destination.name}</h3>
          <p>${destination.description}</p>
        </div>`;
    });
  });
2️⃣ Handling Bookings with Event Listeners
js
Copy
Edit
document.querySelector("#booking-form").addEventListener("submit", (e) => {
  e.preventDefault();
  
  let newBooking = {
    customer: document.querySelector("#name").value,
    destination: document.querySelector("#destination").value,
    agency: document.querySelector("#agency").value,
    date: document.querySelector("#date").value,
    status: "Pending"
  };

  fetch("http://localhost:3000/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newBooking)
  }).then(() => {
    alert("Booking Successful!");
    location.reload();
  });
});
3️⃣ Implementing Dark Mode
js
Copy
Edit
document.querySelector("#dark-mode-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
4️⃣ Search Feature
js
Copy
Edit
document.querySelector("#search").addEventListener("input", (e) => {
  let searchTerm = e.target.value.toLowerCase();
  let filteredDestinations = destinations.filter(dest => dest.name.toLowerCase().includes(searchTerm));
  displayDestinations(filteredDestinations);
});
