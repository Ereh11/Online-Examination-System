import { getResults } from "../services/resultExamHandle.js";

const tbody = document.querySelector("tbody");
const email = localStorage.getItem("email");
const userInfoDiv = document.getElementsByClassName("user-info")[0];
const emailDom = userInfoDiv.children[0];
const resultUser = await getResults(email);
emailDom.innerText = email;

resultUser.forEach((element) => {
  if (element.score < 50) {
    tbody.innerHTML += ` <tr>
                <td>${element.examName}</td>
                <td style ="background-color:rgb(201, 71, 71) ; color: white" >${element.score}</td>
              </tr>
            `;
  } else {
    tbody.innerHTML += ` <tr>
                <td>${element.examName}</td>
                <td style ="background-color:rgb(112, 197, 90) ; color: white" >${element.score}</td>
              </tr>
            `;
  }
});
