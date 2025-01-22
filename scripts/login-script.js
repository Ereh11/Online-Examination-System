document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (event) {
    if (!loginForm.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    loginForm.classList.add("was-validated");
  });

  const emailInput = document.getElementById("email");
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

  const passwordInput = document.getElementById("password");
  passwordInput.addEventListener("input", function () {
    if (passwordInput.value.length >= 6) {
      passwordInput.classList.remove("is-invalid");
      passwordInput.classList.add("is-valid");
    } else {
      passwordInput.classList.remove("is-valid");
      passwordInput.classList.add("is-invalid");
    }
  });

  const signupLink = document.getElementById("signupLink");
  signupLink.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "signup.html";
  });
});
