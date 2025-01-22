startBtn = document.getElementById("startBtn");
CancelBtn = document.getElementById("CancelBtn");
divBtnContainer = document.getElementsByClassName("btn-container")[0];

divBtnContainer.addEventListener("click", function(e) {
    if(e.target.id == "startBtn"){
        
    }
    else if(e.target.id == "CancelBtn"){
        window.location.href = "../pages/startExam.html";
    }
});