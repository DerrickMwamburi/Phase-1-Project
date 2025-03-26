document.addEventListener("DOMContentLoaded", () => {
    const bookingForm = document.getElementById("booking-form");
    const nameInput = document.getElementById("name");
    const destinationSelect = document.getElementById("destination");
    const bookingList = document.getElementById("booking-list");

    // Fetch available destinations from db.json
    fetch("http://localhost:3000/destinations")
        .then(response => response.json())
        .then(destinations => {
            destinations.forEach(destination => {
                const option = document.createElement("option");
                option.value = destination.name;
                option.textContent = destination.name;
                destinationSelect.appendChild(option);
            });
        });

    // Handle booking submission
    bookingForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const destination = destinationSelect.value;

        if (!name) {
            alert("Please enter your name before booking.");
            return;
        }

        const booking = { name, destination };

        // Send booking data to json-server
        fetch("http://localhost:3000/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(booking)
        })
        .then(response => response.json())
        .then(newBooking => {
            displayBooking(newBooking);
            nameInput.value = ""; // Clear input after booking
            alert("🎉 Booking confirmed!");
        })
        .catch(error => console.error("Error:", error));
    });

    // Function to display a booking
    function displayBooking(booking) {
        const listItem = document.createElement("li");
        listItem.textContent = `${booking.name} booked ${booking.destination}`;
        bookingList.appendChild(listItem);
    }

    // Load existing bookings
    fetch("http://localhost:3000/bookings")
        .then(response => response.json())
        .then(bookings => {
            bookings.forEach(displayBooking);
        });
});

