import { getResults } from "../services/resultExamHandle.js"

const tbody = document.querySelector("tbody");
const email = localStorage.getItem("email");
const userInfoDiv = document.getElementsByClassName("user-info")[0];
const emailDom = userInfoDiv.children[0];
const resultUser = await getResults(email);

emailDom.innerText = email;
console.log(resultUser);
resultUser.forEach(element => {
  tbody.innerHTML += ` <tr>
              <td>${element.examName}</td>
              <td>${element.score}</td>
            </tr>
          `;
});
