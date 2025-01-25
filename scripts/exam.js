import {createExam} from "../services/examHandle.js";
const timerDisplay = document.getElementById("timer");
const questionNumbers = document.querySelectorAll(".question-number");
const flagIcon = document.querySelector(".flag-icon");
const questionTitle = document.getElementById("questionTitle");
const prevButton = document.getElementById("prevQuestion");
const nextButton = document.getElementById("nextQuestion");
let totalSeconds = 5 * 60;
let currentQuestion = 1;

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

const topic = localStorage.getItem("examTopic");
const difficulty = localStorage.getItem("examDifficulty");


async function getExam(){
  return await createExam(topic, difficulty, 5, 10);
}
const exam = await getExam();
