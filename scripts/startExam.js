//DOM Selectors.
divExamTopic = document.getElementsByClassName("examTopic")[0];
divexamDifficulty = document.getElementsByClassName("examDifficulty")[0];
containerExamTopic = document.getElementsByClassName("container-examTopic")[0];
containerExamDifficulty = document.getElementsByClassName(
  "container-examDifficulty"
)[0];
ExamTopicBtn = document.getElementsByClassName("ExamTopicnextBtn")[0];
ExamDifficultyBtn = document.getElementsByClassName("ExamDifficultynextBtn")[0];

Event(divExamTopic, ExamTopicBtn);
Event(divexamDifficulty, ExamDifficultyBtn);

ExamTopicBtn.addEventListener("click", function () {
  containerExamTopic.classList.toggle("hidden");
  containerExamDifficulty.classList.toggle("hidden");
});

ExamDifficultyBtn.addEventListener("click", function () {
  window.location.replace("../pages/examInstruction.html");
});

/**
 * Event function: This function will add an event listener to the element and if user choose option it will make next button clickable.
 * @param {Event} event
 * @returns {void}
 */
function Event(event, button) {
  event.addEventListener("click", function (e) {
    if (e.target.tagName === "INPUT") {
      button.classList.remove("display-nextBtn");
      button.parentElement.classList.remove("cursor-point");
      checkOptions(e.target); // send span that is clicked by the user.
    } else {
      button.classList.add("display-nextBtn");
      button.parentElement.classList.add("cursor-point");
    }
  });
}

/**
 * check the options selected by the user and store it in the variable based on it is examTopic or examSubject will be decided.
 * @param {*} e span that is clicked by the user.
 * @returns {void}
 */
let examTopicOption = null, examSubjectOption = null;
function checkOptions(e) {
  e.name == "examTopic"
    ? (examTopicOption = e.value)
    : (examSubjectOption = e.value);
    if(examSubjectOption != null)
      localStorage.setItem("examDifficulty", examSubjectOption);
    if(examTopicOption != null)
      localStorage.setItem("examTopic", examTopicOption);
}
