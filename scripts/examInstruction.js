startBtn = document.getElementById("startBtn");
CancelBtn = document.getElementById("CancelBtn");
divBtnContainer = document.getElementsByClassName("btn-container")[0];
window.history.replaceState(null, null, "../pages/examInstruction.html"); 
divBtnContainer.addEventListener("click", function(e) {
    if(e.target.id == "startBtn"){
        window.location.href = "../pages/exam.html";
    }
    else if(e.target.id == "CancelBtn"){
        window.location.href = "../pages/startExam.html";
    }
});