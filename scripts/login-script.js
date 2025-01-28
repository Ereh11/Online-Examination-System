import { recievedData } from "../services/loginHandle.js";

// DOM Selectors
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginError = document.getElementById("loginError"); // Error message container

// Event Listeners
loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    event.stopPropagation();

    if (!loginForm.checkValidity()) {
        event.stopPropagation();
        loginForm.classList.add("was-validated");
        return;
    }

    try {
        const success = await recievedData(emailInput.value, passwordInput.value);
        if (success) {
            loginError.textContent = "Correct login, welcome!";
            loginError.classList.remove("alert-danger", "d-none");
            loginError.classList.add("alert-success");

            setTimeout(() => {
                window.location.replace("../pages/startExam.html");
            }, 1000);
        }
        else {
            // Display error message
            loginError.classList.remove("d-none");

            // Clear input fields
            emailInput.value = "";
            passwordInput.value = "";

            // Remove validation classes
            emailInput.classList.remove("is-valid");
            passwordInput.classList.remove("is-valid");
        }
    } catch (error) {
        window.location.replace("../pages/error.html");
    }
});

// Input validation
emailInput.addEventListener("input", function () {
    if (emailInput.value !== "") {
        emailInput.classList.remove("is-invalid");
        emailInput.classList.add("is-valid");
    } else {
        emailInput.classList.remove("is-valid");
        emailInput.classList.add("is-invalid");
    }
});
// Input validation
passwordInput.addEventListener("input", function () {
    if (passwordInput.value !== "") {
        passwordInput.classList.remove("is-invalid");
        passwordInput.classList.add("is-valid");
    } else {
        passwordInput.classList.remove("is-valid");
        passwordInput.classList.add("is-invalid");
    }
});