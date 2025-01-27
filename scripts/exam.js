import { createExam } from "../services/examHandle.js";
// DOM elements for the exam page
const timerDisplay = document.getElementById("timer");
const questionNumbers = document.querySelectorAll(".question-number");
const flagIcon = document.querySelector(".flag-icon");
const questionTitle = document.getElementById("questionTitle");
const prevButton = document.getElementById("prevQuestion");
const nextButton = document.getElementById("nextQuestion");
const divQuestion = document.getElementsByClassName("exam-container")[0];
const submitbtn = document.getElementById("submitBtn");
const confirmationModal = document.getElementById("confirmationModal");
const confirmSubmit = document.getElementById("confirmSubmit");
const cancelSubmit = document.getElementById("cancelSubmit");
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
  let cnt = 0;
  exam.Questions.forEach((element) => {
    const questionHeader = `<h2 id="questionTitle" class="${cnt++}">${
      element.question
    }</h2>`;
    let options = [];
    for (let i = 0; i < 4; i++) {
      options.push(
        `<button class="option" data-option="${String.fromCharCode(i + 65)}">${
          element.option[i]
        }</button>`
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
divQuestionOptions.innerHTML = "";
questionDOM[0].options.forEach((option) => {
  divQuestionOptions.innerHTML += option;
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
  divQuestionOptions.innerHTML = "";
  questionDOM[questionNum - 1].options.forEach((option) => {
    divQuestionOptions.innerHTML += option;
  });

  document
    .querySelector(`.question-number[data-question="${currentQuestion}"]`)
    .classList.remove("active");

  currentQuestion = questionNum;

  questionTitle.textContent = `Question ${currentQuestion}`;

  document
    .querySelector(`.question-number[data-question="${currentQuestion}"]`)
    .classList.add("active");

  if (questionNum == 10) {
    submitbtn.classList.remove("hidden");
  } else {
    submitbtn.classList.add("hidden");
  }
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

submitBtn.addEventListener("click", () => {
  confirmationModal.style.display = "flex";
});
confirmSubmit.addEventListener("click", () => {
  confirmationModal.style.display = "none";
  const correctAnswers = correctExam();

  alert(`Exam submitted successfully! ${correctAnswers}`);
});
cancelSubmit.addEventListener("click", () => {
  confirmationModal.style.display = "none";
});

divQuestionOptions.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const parentDiv = e.target.parentElement;
    const NumberOfQuestion =
      parentDiv.previousElementSibling.children[0].classList[0];

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
          console.log(textContent);
          if (textContent === question.answer) {
            correctAnswers++;
          }
        }
      });
    }
  }
  return correctAnswers;
}
