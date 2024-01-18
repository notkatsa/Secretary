// history.js

document.addEventListener("DOMContentLoaded", function () {
    // Assuming you have the 'sec' data in localStorage
    const secData = JSON.parse(localStorage.getItem("sec")) || [];

    // Get the container where you want to dynamically create elements
    const historyContainer = document.querySelector(".content");

    // Assuming you have the 'login' object in sessionStorage
    const loginData = JSON.parse(sessionStorage.getItem("login")) || {};
    const targetSdi = loginData.sdi;

    // Find the sec request with the target sdi
    const targetSecRequest = secData.find(secRequest => secRequest.sdi === targetSdi);

    if (targetSecRequest && targetSecRequest.reqs.length > 0) {
        // Assuming you have the 'selectedCourses' data in localStorage
        const selectedCourses = JSON.parse(localStorage.getItem("selectedCourses")) || [];

        // Loop through each request in the 'reqs' array
        targetSecRequest.reqs.forEach(request => {
            const { value, date } = request;
            let title;

            // Set title based on the value
            switch (value) {
                case "grades":
                    title = "Αναλυτική Βαθμολογία";
                    break;
                case "military":
                    title = "Στρατολογία";
                    break;
                case "tax":
                    title = "ΔΟΥ";
                    break;
                default:
                    title = "Άλλο";
            }

            // Create a div for each request
            const secDiv = document.createElement("div");
            secDiv.className = "history-card-sec";
            secDiv.innerHTML = `
                <h3>${title}</h3>
                <p>Status: Pending</p>
                <p>Date: ${new Date(date).toLocaleDateString()}</p>
            `;

            // Append the created div to the history container
            historyContainer.appendChild(secDiv);
        });

        // Create a div for selected courses
        const selectedCoursesDiv = document.createElement("div");
        selectedCoursesDiv.className = "history-card-selected-courses";
        selectedCoursesDiv.innerHTML = `
            <h3>Δήλωση Μαθημάτων</h3>
            ${selectedCourses.length > 0 ? selectedCourses.map(course => `<p>${course}</p>`).join("") : "No selected courses"}
        `;

        // Append the created div to the history container
        historyContainer.appendChild(selectedCoursesDiv);
    }
});
