divExamTopic = document.getElementsByClassName("examTopic")[0];
divexamDifficulty = document.getElementsByClassName("examDifficulty")[0];

containerExamTopic = document.getElementsByClassName("container-examTopic")[0];
containerExamDifficulty = document.getElementsByClassName("container-examDifficulty")[0];

ExamTopicBtn = document.getElementsByClassName("ExamTopicnextBtn")[0];
ExamDifficultyBtn = document.getElementsByClassName("ExamDifficultynextBtn")[0];


Event(divExamTopic, ExamTopicBtn);
Event(divexamDifficulty, ExamDifficultyBtn);

ExamTopicBtn.addEventListener("click", function() {
    containerExamTopic.classList.toggle("hidden");
    containerExamDifficulty.classList.toggle("hidden");
});

ExamDifficultyBtn.addEventListener("click", function() {
    window.location.href = "../pages/examInstruction.html";
});


/**
 * Event function: This function will add an event listener to the element and if user choose option it will make next button clickable.
 * @param {Event} event 
 * @returns {void}
 */
function Event(event, button){
    event.addEventListener("click", function(e) {
        if(e.target){
            button.classList.toggle("hidden-nextBtn");
        }
    });
}