document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/bookings")
        .then(response => response.json())
        .then(bookings => displayBookings(bookings))
        .catch(error => console.error("Error fetching bookings:", error));
});

function displayBookings(bookings) {
    const tableBody = document.querySelector("#bookings-table tbody");
    tableBody.innerHTML = ""; // Clear existing data

    bookings.forEach(booking => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${booking.customer}</td>
            <td>${getDestinationName(booking.destination)}</td>
            <td>${getAgencyName(booking.agency)}</td>
            <td>${booking.date}</td>
            <td>${booking.status}</td>
            <td>
                <button class="confirm-btn" onclick="updateStatus(${booking.id}, 'Confirmed')">Confirm</button>
                <button class="cancel-btn" onclick="updateStatus(${booking.id}, 'Cancelled')">Cancel</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Fetch Destination Name
function getDestinationName(id) {
    const destinations = {
        1: "Maasai Mara",
        2: "Victoria Falls",
        3: "Serengeti",
        4: "Table Mountain",
        5: "Pyramids of Giza"
    };
    return destinations[id] || "Unknown";
}

// Fetch Agency Name
function getAgencyName(id) {
    const agencies = {
        1: "Safari Experts",
        2: "African Treks",
        3: "Sahara Adventures",
        4: "Wildlife Tours",
        5: "Zambezi Safaris"
    };
    return agencies[id] || "Unknown";
}

// Update Booking Status
function updateStatus(bookingId, newStatus) {
    fetch(`http://localhost:3000/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
    })
    .then(response => response.json())
    .then(() => location.reload()) // Refresh to reflect changes
    .catch(error => console.error("Error updating booking:", error));
}
