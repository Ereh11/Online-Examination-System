// Example of getting the grade dynamically (can be retrieved from URL or API)
const queryParams = new URLSearchParams(window.location.search);
const grade = queryParams.get("grade") || "F";  // Default to 'A' if not provided

// Display the grade on the page
document.getElementById("grade").textContent = grade;

// Set pass or fail message based on grade
const statusElement = document.querySelector('.status');
if (grade === "F") {
    statusElement.textContent = "failed";
    statusElement.style.color = "red";
    document.querySelector("h1").innerHTML = '<i class="fas fa-times-circle"></i> Sorry!';
}
