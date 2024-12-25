document.addEventListener("DOMContentLoaded", () => { 
    const resultDiv = document.querySelector("#result");
    let intervalId;

    // Populate days dynamically
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const populateDays = (selectId) => {
        const select = document.querySelector(`#${selectId}`);
        days.forEach((day) => {
            const option = document.createElement("option");
            option.value = day;
            option.textContent = day;
            select.appendChild(option);
        });
    };

    populateDays("dobDay");
    populateDays("currentDay");

    // Populate the current month and year with the system's date
    const now = new Date();
    document.querySelector("#currentMonth").value = now.getMonth() + 1; // Set current month (0-based index in JavaScript)
    document.querySelector("#currentYear").value = now.getFullYear(); // Set current year
    document.querySelector("#currentDay").value = now.getDate(); // Set current day

    // Calculate age in multiple formats and refresh seconds dynamically
    const calculateAge = () => {
        const dobDay = parseInt(document.querySelector("#dobDay").value);
        const dobMonth = parseInt(document.querySelector("#dobMonth").value);
        const dobYear = parseInt(document.querySelector("#dobYear").value);

        if (!dobDay || !dobMonth || !dobYear) {
            resultDiv.innerHTML = "Please enter your Date of Birth!";
            return;
        }

        // Use the system date if the user has not selected a date
        const currentDay = parseInt(document.querySelector("#currentDay").value) || now.getDate();
        const currentMonth = parseInt(document.querySelector("#currentMonth").value) || (now.getMonth() + 1);
        const currentYear = parseInt(document.querySelector("#currentYear").value) || now.getFullYear();

        const dob = new Date(dobYear, dobMonth - 1, dobDay); // Date of Birth
        const currentDate = new Date(currentYear, currentMonth - 1, currentDay); // Current Date

        if (dob > currentDate) {
            resultDiv.innerHTML = "Date of Birth cannot be in the future!";
            return;
        }

        const diff = currentDate - dob; // Time difference in milliseconds
        const ageYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        const ageMonths = Math.floor((diff / (1000 * 60 * 60 * 24 * 30.44)));
        const ageWeeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
        const ageDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        const ageHours = Math.floor(diff / (1000 * 60 * 60));
        const ageMinutes = Math.floor(diff / (1000 * 60));
        const ageSeconds = Math.floor(diff / 1000);

        // Detailed output with a Refresh button
        resultDiv.innerHTML = `
            <p><strong>Total Age:</strong></p>
            <p>${ageYears} years, ${ageMonths % 12} months, ${ageDays % 30} days</p>
            <p>Total ${ageMonths} months, ${ageDays % 30} days</p>
            <p>Total ${ageWeeks} weeks, ${ageDays % 7} days</p>
            <p>Total ${ageDays} days</p>
            <p>Total ${ageHours} hours</p>
            <p>Total ${ageMinutes} minutes</p>
            <p>Total <strong>${ageSeconds}</strong> seconds</p>
            <button id="refreshPage">Refresh</button>
        `;

        // Add event listener for Refresh button
        document.querySelector("#refreshPage").addEventListener("click", () => {
            location.reload(); // Refresh the page
        });
    };

    // Add Calculate button event listener
    document.querySelector("#calculateAge").addEventListener("click", () => {
        clearInterval(intervalId); // Stop any previous interval
        calculateAge();
        intervalId = setInterval(calculateAge, 1000); // Update every second
    });
});
