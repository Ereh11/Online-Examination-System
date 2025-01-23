// DOM Selectors
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupLink = document.getElementById("signupLink");

// Event Listeners
loginForm.addEventListener("submit", function (event) {
  if (!loginForm.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }
  loginForm.classList.add("was-validated");
});

emailInput.addEventListener("input", function () {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailPattern.test(emailInput.value)) {
    emailInput.classList.remove("is-invalid");
    emailInput.classList.add("is-valid");
  } else {
    emailInput.classList.remove("is-valid");
    emailInput.classList.add("is-invalid");
  }
});

passwordInput.addEventListener("input", function () {
  if (passwordInput.value.length >= 6) {
    passwordInput.classList.remove("is-invalid");
    passwordInput.classList.add("is-valid");
  } else {
    passwordInput.classList.remove("is-valid");
    passwordInput.classList.add("is-invalid");
  }
});

signupLink.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "signup.html";
});
