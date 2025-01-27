// In login-script.js
import { recievedData } from "../services/loginHandle.js";



// When you need to show an error
showError("Invalid email or password. Please try again.");

// For server errors
try {
  
  // DOM Selectors
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  
  // Event Listeners
  loginForm.addEventListener("submit", function (event) {
    if (!loginForm.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    else{
      recievedData(emailInput.value, passwordInput.value);
    }
    loginForm.classList.add("was-validated");
  });
  
  //need edit
  emailInput.addEventListener("input", function () {
    if(emailInput.value != "") {
      emailInput.classList.remove("is-invalid");
      emailInput.classList.add("is-valid");
    }
    else {
      emailInput.classList.remove("is-valid");
      emailInput.classList.add("is-invalid");
    }
  });
  //need edit
  passwordInput.addEventListener("input", function () {
    if(passwordInput.value != "") {
      passwordInput.classList.remove("is-invalid");
      passwordInput.classList.add("is-valid");
    } else {
      passwordInput.classList.remove("is-valid");
      passwordInput.classList.add("is-invalid");
    }
  });
  
} catch (error) {
  showError("Service unavailable. Please try again later.");
  localStorage.setItem('lastLoginError', JSON.stringify({
    message: error.message,
    timestamp: new Date().toISOString()
  }));
}