function submitDose() {
    let doseAmount = parseFloat(document.querySelector('input[name="dose"]:checked').value);
    let doseTime = new Date();

    // Store the submitted dose information in localStorage
    let doses = JSON.parse(localStorage.getItem("doses")) || [];
    doses.push({ amount: doseAmount, time: doseTime });
    localStorage.setItem("doses", JSON.stringify(doses));

    // Update the last dose time and amount
    document.getElementById("last-dose-time").innerHTML = doseTime.toLocaleTimeString();
    document.getElementById("last-dose-amount").innerHTML = doseAmount;

    // Update the total dose amount
    let totalDoseAmount = doses.reduce((total, dose) => total + parseFloat(dose.amount), 0);
    document.getElementById("total-dose-amount").innerHTML = totalDoseAmount;
}

function resetDoses() {
    // Clear the dose data from localStorage
    localStorage.removeItem("doses");

    // Reset the dose tracker labels
    document.getElementById("total-doses").innerHTML = 0;
    document.getElementById("last-dose-time").innerHTML = "";
    document.getElementById("last-dose-amount").innerHTML = "";
    document.getElementById("total-dose-amount").innerHTML = 0;
}

// Update the current time, total doses, total dose amount, and time since last dose every second
setInterval(function() {
    let currentTime = new Date();
    document.getElementById("current-time").innerHTML = currentTime.toLocaleTimeString();

    let doses = JSON.parse(localStorage.getItem("doses")) || [];
    document.getElementById("total-doses").innerHTML = doses.length;

    let totalDoseAmount = doses.reduce((total, dose) => total + parseFloat(dose.amount), 0);
    document.getElementById("total-dose-amount").innerHTML = totalDoseAmount;

    if (doses.length > 0) {
        let lastDoseTime = new Date(doses[doses.length - 1].time);
        let timeSinceLastDoseMs = currentTime - lastDoseTime;
        let timeSinceLastDoseMins = Math.floor(timeSinceLastDoseMs / 60000);
        let timeSinceLastDoseHours = Math.floor(timeSinceLastDoseMins / 60);
        let timeSinceLastDoseDays = Math.floor(timeSinceLastDoseHours / 24);

        let timeSinceLastDoseStr = "";
        if (timeSinceLastDoseMins < 5) {
            // If the elapsed time is less than 5 minutes, display "like a second "
            timeSinceLastDoseStr = "like a second ";
        } else {
            if (timeSinceLastDoseDays > 0) {
                timeSinceLastDoseStr += timeSinceLastDoseDays + " days ";
                timeSinceLastDoseHours %= 24;
            }
            if (timeSinceLastDoseHours > 0) {
                timeSinceLastDoseStr += timeSinceLastDoseHours + " hours ";
                timeSinceLastDoseMins %= 60;
            }
            if (timeSinceLastDoseMins > 0) {
                timeSinceLastDoseStr += timeSinceLastDoseMins + " minutes";
            }
        }
        document.getElementById("time-since-last-dose").innerHTML = timeSinceLastDoseStr;
    } else {
        document.getElementById("time-since-last-dose").innerHTML = "";
    }
}, 1000);

// Display the last dose information when the page loads
window.onload = function() {
    let doses = JSON.parse(localStorage.getItem("doses")) || [];
    if (doses.length > 0) {
        let lastDose = doses[doses.length - 1];
        document.getElementById("last-dose-time").innerHTML = new Date(lastDose.time).toLocaleTimeString();
        document.getElementById("last-dose-amount").innerHTML = lastDose.amount;
    }
}

const container = document.querySelector('.container');
const text = document.querySelector('.text');

// Adjust container width based on text content
container.style.width = text.offsetWidth + 'px';