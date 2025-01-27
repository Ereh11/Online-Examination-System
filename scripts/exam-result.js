// Example of getting the grade dynamically (can be retrieved from URL or API)
const queryParams = new URLSearchParams(window.location.search);
const score = queryParams.get("examresult") || "F";  // Default to 'A' if not provided
const grade = makeGrade(score); 
// Display the grade on the page
document.getElementById("grade").textContent = score;

// Set pass or fail message based on grade
const statusElement = document.querySelector('.status');
if (grade === "F") {
    statusElement.textContent = "failed";
    statusElement.style.color = "red";
    document.querySelector("h1").innerHTML = '<i class="fas fa-times-circle"></i> Sorry!';
}

/**
 * Function to make a grade based on the score provided.
 * @param {Number} score 
 * @returns {String} grade A, B, C, D, or F
 */
function makeGrade(score){
    let grade = "";
    if (score >= 80) {
        grade = "A";
    } else if (score >= 70) {
        grade = "B";
    } else if (score >= 60) {
        grade = "C";
    } else if (score >= 50) {
        grade = "D";
    } else {
        grade = "F";
    }
    return grade;
}
