//imports needed for this script
import {recievedData} from '../services/signupHandle.js';
// DOM elements
const signUP = document.getElementById("signupForm");
const emailInput = document.getElementById("email");
const usernameInput = document.getElementById("fullName");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

// Event listeners
signUP.addEventListener("submit", function (event) {
  const form = event.target;
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  } else {
    recievedData(usernameInput.value, emailInput.value, passwordInput.value);
  }
  form.classList.add("was-validated");
});

passwordInput.addEventListener("input", function () {
  validatePasswords();
  if (passwordInput.value === confirmPasswordInput.value) {
    confirmPasswordInput.setCustomValidity("");
  }
});

confirmPasswordInput.addEventListener("input", validatePasswords);

emailInput.addEventListener("input", function () {
  const emailValue = emailInput.value;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailPattern.test(emailValue)) {
    emailInput.setCustomValidity("Please enter a valid email.");
  } else {
    emailInput.setCustomValidity("");
  }
});

//Functions
/**
 * Validates the password and confirm password inputs.
 */
function validatePasswords() {
  const passwordValue = passwordInput.value;
  const confirmPasswordValue = confirmPasswordInput.value;

  if (passwordValue !== confirmPasswordValue) {
    confirmPasswordInput.setCustomValidity("Passwords do not match.");
  } else {
    confirmPasswordInput.setCustomValidity("");
  }
}
