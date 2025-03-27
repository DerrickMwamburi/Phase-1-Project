document.addEventListener("DOMContentLoaded", () => {
    const bookingForm = document.getElementById("booking-form");
    const bookingsTableBody = document.getElementById("bookings-table-body");
    const destinationSelect = document.getElementById("destination");
    const agencySelect = document.getElementById("agency");

    // Fetch Destinations and Populate Dropdown
    fetch("https://phase-1-project-one-beige.vercel.app/api/destinations")
        .then(response => response.json())
        .then(destinations => {
            destinations.forEach(destination => {
                const option = document.createElement("option");
                option.value = destination.id;
                option.textContent = destination.name;
                destinationSelect.appendChild(option);
            });
        });

    // Fetch Agencies and Populate Dropdown
    fetch("https://phase-1-project-one-beige.vercel.app/api/destinations")
        .then(response => response.json())
        .then(agencies => {
            agencies.forEach(agency => {
                const option = document.createElement("option");
                option.value = agency.id;
                option.textContent = agency.name;
                agencySelect.appendChild(option);
            });
        });

    // Fetch and Display Existing Bookings
    function loadBookings() {
        fetch("https://phase-1-project-one-beige.vercel.app/api/destinations")
        .then(res => res.json())
        .then(bookings => {
            bookings.forEach(booking => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${booking.customer}</td>
                    <td>${booking.destination}</td>
                    <td>${booking.agency}</td>
                    <td>${booking.date}</td>
                    <td>${booking.status}</td>
                    <td>
                        <button class="confirm-btn" data-id="${booking.id}">Confirm</button>
                        <button class="remove-btn" data-id="${booking.id}">Remove</button>
                    </td>
                `;
                bookingsTableBody.appendChild(row);

                // Add Event Listener to Delete Button
                row.querySelector(".remove-btn").addEventListener("click", () => {
                    deleteBooking(booking.id);
                });
            });
        });
    }

    // Handle Form Submission
    bookingForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const customer = document.getElementById("customer-name").value;
        const destinationId = destinationSelect.value;
        const agencyId = agencySelect.value;
        const date = document.getElementById("date").value;
        const status = "Pending"; // Default status

        // Get Destination & Agency Names
        const destinationName = destinationSelect.options[destinationSelect.selectedIndex].text;
        const agencyName = agencySelect.options[agencySelect.selectedIndex].text;

        // Create Booking Object
        const newBooking = { 
            customer, 
            destination: destinationId, 
            destinationName,
            agency: agencyId, 
            agencyName,
            date, 
            status 
        };

        // Send POST Request to JSON Server
        fetch("https://phase-1-project-one-beige.vercel.app/api/destinations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newBooking)
        })
        .then(response => response.json())
        .then(booking => {
            displayBooking(booking); // Show new booking immediately
            bookingForm.reset(); // Clear form
        });
    });

    // Function to Delete a Booking
    function deleteBooking(id) {
        fetch(`https://phase-1-project-one-beige.vercel.app/api/bookings/${id}`, {
            method: "DELETE"
        })
        .then(() => loadBookings()); // Refresh bookings
    }
});


