import { createExam } from "../services/examHandle.js";
// DOM elements for the exam page
const timerDisplay = document.getElementById("timer");
const questionNumbers = document.querySelectorAll(".question-number");
const flagIcon = document.querySelector(".flag-icon");
const questionTitle = document.getElementById("questionTitle");
const prevButton = document.getElementById("prevQuestion");
const nextButton = document.getElementById("nextQuestion");
const divQuestion = document.getElementsByClassName("exam-container")[0];
const divQuestionHeader = divQuestion.children[0];
const divQuestionOptions = divQuestion.children[1];

let totalSeconds = 5 * 60;
let currentQuestion = 1;
let questionDOM = [];
const topic = localStorage.getItem("examTopic");
const difficulty = localStorage.getItem("examDifficulty");

/**
 * Call the createExam function and return the exam object
 * @returns {Promise<Exam>}
 */
async function getExam() {
  return await createExam(topic, difficulty, 5, 10);
}
const exam = await getExam();

function createQuestionElement(exam) {
  const questionsElements = [];
  exam.Questions.forEach((element) => {
    const questionHeader = `<h2 id="questionTitle">${element.question}</h2>`;
    let options = [];
    for (let i = 0; i < 4; i++) {
      options.push(
        `<div class="option" data-option="${String.fromCharCode(i + 65)}">${
          element.option[i]
        }</div>`
      );
    }
    questionsElements.push({ questionHeader, options });
  });
  return questionsElements;
}
questionDOM = createQuestionElement(exam);

// At first, display the first question
divQuestionHeader.innerHTML = questionDOM[0].questionHeader;
let indx = 0;
questionDOM[0].options.forEach((option) => {
  divQuestionOptions.children[indx++].innerHTML = option;
});

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
    alert("Time is up!");
  }
}
updateTimer();

flagIcon.addEventListener("click", () => {
  flagIcon.classList.toggle("active");
  const currentQuestionNumber = document.querySelector(
    `.question-number[data-question="${currentQuestion}"]`
  );
  currentQuestionNumber.classList.toggle("active");
});

function updateQuestion(questionNum) {
  divQuestionHeader.innerHTML = questionDOM[questionNum - 1].questionHeader;
  let indx = 0;
  questionDOM[questionNum - 1].options.forEach((option) => {
    divQuestionOptions.children[indx++].innerHTML = option;
  });

  document
    .querySelector(`.question-number[data-question="${currentQuestion}"]`)
    .classList.remove("active");

  currentQuestion = questionNum;

  questionTitle.textContent = `Question ${currentQuestion}`;

  document
    .querySelector(`.question-number[data-question="${currentQuestion}"]`)
    .classList.add("active");
}

prevButton.addEventListener("click", () => {
  if (currentQuestion > 1) {
    updateQuestion(currentQuestion - 1);
  }
});

nextButton.addEventListener("click", () => {
  if (currentQuestion < 10) {
    updateQuestion(currentQuestion + 1);
  }
});

document
  .querySelector('.question-number[data-question="1"]')
  .classList.add("active");
