document.addEventListener("DOMContentLoaded", () => {
    const bookingForm = document.getElementById("booking-form");
    const destinationSelect = document.getElementById("destination-select");
    const agencySelect = document.getElementById("agency-select");
    const bookingTableBody = document.getElementById("booking-table-body");

    // Fetch destinations and populate the dropdown
    fetch("http://localhost:3000/destinations")
        .then(res => res.json())
        .then(destinations => {
            destinations.forEach(destination => {
                const option = document.createElement("option");
                option.value = destination.id;
                option.textContent = destination.name;
                destinationSelect.appendChild(option);
            });
        });

    // Fetch agencies and populate the dropdown
    fetch("http://localhost:3000/agencies")
        .then(res => res.json())
        .then(agencies => {
            agencies.forEach(agency => {
                const option = document.createElement("option");
                option.value = agency.id;
                option.textContent = agency.name;
                agencySelect.appendChild(option);
            });
        });

    // Fetch existing bookings and display
    function loadBookings() {
        bookingTableBody.innerHTML = "";
        fetch("http://localhost:3000/bookings")
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
                    bookingTableBody.appendChild(row);
                });
            });
    }

    loadBookings(); // Initial load

    // Handle form submission
    bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const customer = document.getElementById("customer-name").value;
        const destinationId = destinationSelect.value;
        const agencyId = agencySelect.value;
        const bookingDate = document.getElementById("booking-date").value;

        if (!customer || !destinationId || !agencyId || !bookingDate) return;

        // Save new booking
        fetch("http://localhost:3000/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                customer,
                destination: destinationId,
                agency: agencyId,
                date: bookingDate,
                status: "Pending"
            })
        }).then(() => {
            bookingForm.reset();
            loadBookings(); // Reload bookings
        });
    });

    // Handle Confirm and Remove actions
    bookingTableBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("confirm-btn")) {
            const id = e.target.dataset.id;
            fetch(`http://localhost:3000/bookings/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "Confirmed" })
            }).then(() => loadBookings());
        }

        if (e.target.classList.contains("remove-btn")) {
            const id = e.target.dataset.id;
            fetch(`http://localhost:3000/bookings/${id}`, { method: "DELETE" })
                .then(() => loadBookings());
        }
    });
});
