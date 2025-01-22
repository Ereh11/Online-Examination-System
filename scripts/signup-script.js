document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let valid = true;

    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    if (fullName.value.trim() === "") {
      fullName.classList.add("is-invalid");
      valid = false;
    } else {
      fullName.classList.remove("is-invalid");
    }

    if (email.value.trim() === "" || !email.value.includes("@")) {
      email.classList.add("is-invalid");
      valid = false;
    } else {
      email.classList.remove("is-invalid");
    }

    if (password.value.length < 6) {
      password.classList.add("is-invalid");
      valid = false;
    } else {
      password.classList.remove("is-invalid");
    }

    if (confirmPassword.value !== password.value) {
      confirmPassword.classList.add("is-invalid");
      valid = false;
    } else {
      confirmPassword.classList.remove("is-invalid");
    }

    if (valid) {
      alert("Signup successful!");
      window.location.href = "login.html";
    }
  });
