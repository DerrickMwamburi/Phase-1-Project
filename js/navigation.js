document.addEventListener("DOMContentLoaded", () => {
    const links = {
        home: "index.html",
        bookings: "bookings.html",
        agencies: "agencies.html"
    };

    // Function to change page without reload
    function navigateTo(page) {
        history.pushState(null, "", page);
        fetch(page)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const newDoc = parser.parseFromString(html, "text/html");
                document.body.innerHTML = newDoc.body.innerHTML;
                attachEventListeners(); // Reattach listeners after loading new content
            })
            .catch(error => console.error("Navigation Error:", error));
    }

    // Attach event listeners to navigation links
    function attachEventListeners() {
        document.getElementById("home-link")?.addEventListener("click", () => navigateTo(links.home));
        document.getElementById("bookings-link")?.addEventListener("click", () => navigateTo(links.bookings));
        document.getElementById("agencies-link")?.addEventListener("click", () => navigateTo(links.agencies));
    }

    attachEventListeners(); // Initial call
});
