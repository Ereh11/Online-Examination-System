import { Exam } from "../models/exam.js";
import { Question } from "../models/question.js";
let urlQuestions = "http://localhost:3000";
/**
 * Take examTopic, examDifficulty, examDuration and create an exam object
 * @param {string} examTopic
 * @param {string} examDifficulty
 * @param {Number} examDuration
 * @param {Number} examQuestionsNumber
 * @returns {Exam} exam object
 */
export async function createExam(Topic, Difficulty, Duration, QuestionsNumber) {
  const exam = new Exam(Topic, Difficulty, Duration, QuestionsNumber);
  urlQuestions += checkReturn(Topic, Difficulty);

  const questions = await getQuestions(urlQuestions, exam.questionsNumber);
  questions.forEach((question) => {
    exam.Questions.push(
      new Question(question.question, question.options, question.correctAnswer)
    );
  });

  return exam;
}

/**
 * Fetch questions from the Database and return a list of questions based on the number of questions required
 * @param {string} urlQuestions
 * @param {Number} QuestionsNumber
 * @returns {Array} selectedQuestions
 */
async function getQuestions(urlQuestions, QuestionsNumber) {
  try {
    const response = await fetch(urlQuestions);
    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }

    const questions = await response.json();

    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffledQuestions.slice(0, QuestionsNumber);

    return selectedQuestions;
  } catch (error) {
    window.location.replace("../pages/error.html");
  }
}

/**
 * Return the path based on the Topic and Difficulty
 * @param {String} Topic
 * @param {String} Difficulty
 * @returns string path
 */
function checkReturn(Topic, Difficulty) {
  let path = "";
  switch (Topic) {
    case "JavaScript":
      path = "/javascript";
      break;
    case "C#":
      path = "/Csharp";
      break;
    case "TypeScript":
      path = "/TypeScript";
      break;
  }

  switch (Difficulty) {
    case "easy":
      path += "-easy";
      break;
    case "medium":
      path += "-medium";
      break;
    case "hard":
      path += "-hard";
      break;
  }

  return path;
}
