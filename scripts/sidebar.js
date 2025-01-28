let list = document.getElementsByClassName("list")[0];
let sidebar = document.getElementsByClassName("sidebar")[0];
let close_btn = document.getElementById("close");
let close_sidebar = document.getElementById("close-sidebar");
let logout = document.getElementsByClassName("logout")[0];
let info = document.getElementsByClassName("info")[0];




list.addEventListener("click", function() {
    sidebar.style.visibility = "visible";
    list.style.display ="none";
});

close_btn.addEventListener("click", function() {
    sidebar.style.visibility = "hidden";
    list.style.display ="flex";
});

logout.addEventListener("click", function() {
    window.location.href = "../pages/login.html"
});

info.addEventListener("click", function() {
    window.location.href = "../pages/user-profile.html"
});

document.addEventListener('click', (event) => {
    if (!sidebar.contains(event.target) && !list.contains(event.target)) {
        sidebar.style.visibility = "hidden";
        list.style.display = "flex";
    }
});
  





