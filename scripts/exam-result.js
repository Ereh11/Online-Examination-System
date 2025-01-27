// Example of getting the grade dynamically (can be retrieved from URL or API)
const queryParams = new URLSearchParams(window.location.search);
const score = queryParams.get("examresult") || "F"; // Default to 'F' if not provided
const grade = makeGrade(score);

// Display the grade on the page
document.getElementById("grade").textContent = `${score}% (${grade})`;

// Set pass or fail message based on grade
const statusElement = document.querySelector('.status');
const headingElement = document.querySelector('h1');
const imgResult = document.querySelector('img');

if (grade === "F") {
    statusElement.textContent = "failed";
    statusElement.classList.remove("text-warning"); // Remove Bootstrap's warning color
    statusElement.classList.add("text-danger"); // Add Bootstrap's danger color (red)
    headingElement.innerHTML = '<i class="fas fa-times-circle"></i> Sorry!';
    headingElement.classList.remove("text-success"); // Remove green
    headingElement.classList.add("text-danger"); // Add red
    imgResult.src = '../imgs/exam/failed-result.webp';
} else {
    statusElement.textContent = "passed";
    statusElement.classList.remove("text-danger"); // Ensure it uses the warning color for pass
    statusElement.classList.add("text-warning"); // Add Bootstrap's warning color (yellow)
    headingElement.innerHTML = '<i class="fas fa-check-circle"></i> Congratulations!';
    imgResult.src = '../imgs/exam/success-result.jpg';
}

/**
 * Function to make a grade based on the score provided.
 * @param {Number} score 
 * @returns {String} grade A, B, C, D, or F
 */
function makeGrade(score) {
    score = (parseInt(score) / 10) * 100;
    console.log(score);
    if (score >= 80) {
        return "A";
    } else if (score >= 70) {
        return "B";
    } else if (score >= 60) {
        return "C";
    } else if (score >= 50) {
        return "D";
    } else {
        return "F";
    }
}