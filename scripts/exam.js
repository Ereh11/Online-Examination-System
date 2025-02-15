// Purpose: To handle the exam page and its functionalities
import { addResult, getResults } from "../services/resultExamHandle.js";
import { createExam } from "../services/examHandle.js";
// DOM Selectors for the exam page
const timerDisplay = document.getElementById("timer");
const flagIcon = document.querySelector(".flag-icon");
const prevButton = document.getElementById("prevQuestion");
const nextButton = document.getElementById("nextQuestion");
const divQuestion = document.getElementsByClassName("exam-container")[0];
const submitbtn = document.getElementById("submitBtn");
const confirmationModal = document.getElementById("confirmationModal");
const confirmSubmit = document.getElementById("confirmSubmit");
const cancelSubmit = document.getElementById("cancelSubmit");
const divQuestionNumbers =
  document.getElementsByClassName("question-navigator")[0];
const divQuestionHeader = divQuestion.children[0];
const divQuestionOptions = divQuestion.children[1];
// Variables for the exam page
let totalSeconds = 5 * 60;
let currentQuestion = 1;
let questionDOM = [];
let flaggedQuestions = {}; // Object to track flagged questions
const topic = localStorage.getItem("examTopic");
const difficulty = localStorage.getItem("examDifficulty");
const userEmail = localStorage.getItem("email");

/**
 * Call the createExam function and return the exam object
 * @returns {Promise<Exam>}
 */
async function getExam() {
  return await createExam(topic, difficulty, 5, 10);
}
const exam = await getExam(); // Get the exam object


/**
 * // Create the question elements for the exam page for first time only
 * @param {*} exam 
 * @returns Array of html question elements
 */
function createQuestionElement(exam) {
  const questionsElements = [];
  let cnt = 0;
  exam.Questions.forEach((element) => {
    const questionNumber = cnt++;
    const questionHeader = element.question;

    let options = [];
    for (let i = 0; i < 4; i++) {
      options.push(
        `<button class="option" data-option="${String.fromCharCode(i + 65)}">${element.option[i]
        }</button>`
      );
    }
    questionsElements.push({ questionHeader, options, questionNumber });
  });
  return questionsElements;
}
questionDOM = createQuestionElement(exam);

// At first, display the first question
divQuestionHeader.children[0].innerText = questionDOM[0].questionHeader;
let classList = Array.from(divQuestionHeader.children[0].classList);
classList[1] = questionDOM[0].questionNumber;
divQuestionHeader.children[0].classList = classList.join(" ");

divQuestionOptions.innerHTML = "";
questionDOM[0].options.forEach((option) => {
  divQuestionOptions.innerHTML += option;
});


/**
 * Update the timer every second
 * @returns {void}
 */
function updateTimer() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
  timerDisplay.textContent = formattedTime;

  if (totalSeconds <= 120) {
    timerDisplay.classList.add("warning");
  }

  if (totalSeconds > 0) {
    totalSeconds--;
    setTimeout(updateTimer, 1000);
  } else {
    const correctAnswers = correctExam();
    addResult({ email: userEmail, examName: topic, score: correctAnswers }); // to show the result in the result page
    window.location.replace(`../pages/timeover.html`);
  }
}
updateTimer(); // Start the timer

// Event listener for the flag icon
flagIcon.addEventListener("click", () => {
  console.log(flagIcon);
  // console.log("flag icon clicked");
  // Toggle the flagged state for the current question
  flaggedQuestions[currentQuestion] = !flaggedQuestions[currentQuestion];

  // Update the flag icon's appearance
  if (flaggedQuestions[currentQuestion]) {
    flagIcon.classList.add("flagged"); // Add the 'flagged' class to turn the icon orange
  } else {
    flagIcon.classList.remove("flagged"); // Remove the 'flagged' class to revert to the default color
  }

  // Update the question number div's background for the current question
  const currentQuestionNumber = document.querySelector(
    `.question-number[data-question="${currentQuestion}"]`
  );

  if (flaggedQuestions[currentQuestion]) {
    currentQuestionNumber.classList.add("flagged");
  } else {
    currentQuestionNumber.classList.remove("flagged");
  }
});
/**
 * Update the question header and options based on the question number passed as an argument.
 * @param {Number} questionNum
 */
function updateQuestion(questionNum) {
  // Update the question header and options
  divQuestionHeader.children[0].innerText =
    questionDOM[questionNum - 1].questionHeader;
  let classList = Array.from(divQuestionHeader.children[0].classList);
  classList[1] = questionDOM[questionNum - 1].questionNumber;
  divQuestionHeader.children[0].classList = classList.join(" ");
  divQuestionOptions.innerHTML = "";
  questionDOM[questionNum - 1].options.forEach((option) => {
    divQuestionOptions.innerHTML += option;
  });
  // Remove the active class from the previous question number
  document
    .querySelector(`.question-number[data-question="${currentQuestion}"]`)
    .classList.remove("active");

  // Update the current question
  currentQuestion = questionNum;

  // Add the active class to the new question number
  document
    .querySelector(`.question-number[data-question="${currentQuestion}"]`)
    .classList.add("active");

  // Show/hide the submit button based on the question number
 

  // Update the flag icon and question number div based on the flagged state
  if (flaggedQuestions[currentQuestion]) {
    flagIcon.classList.add("flagged"); // Add the 'flagged' class to turn the icon orange
  } else {
    flagIcon.classList.remove("flagged"); // Remove the 'flagged' class to revert to the default color
  }

  const currentQuestionNumber = document.querySelector(
    `.question-number[data-question="${currentQuestion}"]`
  );
  if (flaggedQuestions[currentQuestion]) {
    currentQuestionNumber.classList.add("flagged");
  } else {
    currentQuestionNumber.classList.remove("flagged");
  }
}

// Event listener for the previous button
prevButton.addEventListener("click", () => {
  if (currentQuestion > 1) {
    updateQuestion(currentQuestion - 1);
    updateLeftRightStatus(currentQuestion - 1);
  }
  updateLeftRightStatus(currentQuestion);
});
// Event listener for the next button
nextButton.addEventListener("click", () => {
  if (currentQuestion < 10) {
    updateQuestion(currentQuestion + 1);
    updateLeftRightStatus(currentQuestion + 1);
  }
  updateLeftRightStatus(currentQuestion);
});
// Set the first question number to active
document
  .querySelector('.question-number[data-question="1"]')
  .classList.add("active");
// Event listener for the submit button
submitBtn.addEventListener("click", () => {
  confirmationModal.style.display = "flex";
});
// Event listener for the confirm button in confirmation modal
confirmSubmit.addEventListener("click", () => {
  confirmationModal.style.display = "none";
  const correctAnswers = correctExam();
  addResult({ email: userEmail, examName: topic, score: correctAnswers });
  window.location.replace(`../pages/exam-result.html?examresult=${correctAnswers}`);
});
// Event listener for the cancel button in confirmation modal
cancelSubmit.addEventListener("click", () => {
  confirmationModal.style.display = "none";
});
// Event listener for the question numbers
divQuestionOptions.addEventListener("click", (e) => {
  const parentDiv = e.target.parentElement;

  if (e.target.tagName === "BUTTON") {
    const classList = Array.from(
      e.target.parentElement.previousElementSibling.children[0].classList
    );

    const NumberOfQuestion = classList[1];

    for (let i = 0; i < parentDiv.children.length; i++) {
      if (parentDiv.children[i].classList.contains("option-clicked")) {
        parentDiv.children[i].classList.remove("option-clicked");
      }
    }
    e.target.classList.add("option-clicked");
    for (let i = 0; i < parentDiv.children.length; i++) {
      questionDOM[NumberOfQuestion].options[i] =
        parentDiv.children[i].outerHTML;
    }
  }
});

/**
 * Count the correct answers in the exam
 * @returns {number} correctAnswers
 */
function correctExam() {
  let correctAnswers = 0;
  // Loop through the questions
  for (let i = 0; i < 10; i++) {
    const question = exam.Questions[i];
    const userOptions = questionDOM[i].options;
    // Check if the user has clicked on the correct answer
    for (let i = 0; i < 4; i++) {
      userOptions[i].split("=").forEach((element) => {
        if (element.includes("option-clicked")) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(userOptions[i], "text/html");
          const button = doc.querySelector("button");
          const textContent = button.textContent;

          if (textContent === question.answer) {
            correctAnswers++;
          }
        }
      });
    }
  }
  return correctAnswers * 10;
}

getResults(userEmail);

divQuestionNumbers.addEventListener("click", (e) => {
  const value = parseInt(e.target.innerText);
  updateLeftRightStatus(value);
  updateQuestion(value);
});

/**
 * Update the left and right status of the question number Buttons
 * @param {Number} questionNumber 
 * @returns {void}
 */
function updateLeftRightStatus(questionNumber){
  if(questionNumber == 1){
    prevButton.classList.add("hidden-left-rightBtn");
  }
  else{
    prevButton.classList.remove("hidden-left-rightBtn");
  }
  if(questionNumber == 10){
    nextButton.classList.add("hidden-left-rightBtn");
  }
  else{
    nextButton.classList.remove("hidden-left-rightBtn");
  }
}