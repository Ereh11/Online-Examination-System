import { Exam } from "../models/exam.js";
import { Question } from "../models/question.js";

const baseUrl = "https://e432-45-104-203-212.ngrok-free.app"; // Base URL without credentials

/**
 * Take examTopic, examDifficulty, examDuration, and examQuestionsNumber to create an exam object
 * @param {string} Topic - The topic of the exam
 * @param {string} Difficulty - The difficulty level of the exam
 * @param {Number} Duration - The duration of the exam in minutes
 * @param {Number} QuestionsNumber - The number of questions in the exam
 * @returns {Exam} - The created exam object
 */
export async function createExam(Topic, Difficulty, Duration, QuestionsNumber) {
  const exam = new Exam(Topic, Difficulty, Duration, QuestionsNumber);
  const path = checkReturn(Topic, Difficulty);
  const urlQuestions = `${baseUrl}${path}`;

  const questions = await getQuestions(urlQuestions, exam.questionsNumber);
  questions.forEach((question) => {
    exam.Questions.push(
      new Question(question.question, question.options, question.correctAnswer)
    );
  });

  return exam;
}

/**
 * Fetch questions from the database and return a list of questions based on the number of questions required
 * @param {string} urlQuestions - The URL to fetch questions from
 * @param {Number} QuestionsNumber - The number of questions to fetch
 * @returns {Array} - A list of selected questions
 */
async function getQuestions(urlQuestions, QuestionsNumber) {
  try {
    const response = await fetch(urlQuestions, {
      headers: {
        'Authorization': 'Basic ' + btoa('killua:2000Hani') // Add credentials here
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }

    const questions = await response.json();
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffledQuestions.slice(0, QuestionsNumber);

    return selectedQuestions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return []; // Return an empty array in case of error
  }
}

/**
 * Return the path based on the Topic and Difficulty
 * @param {String} Topic - The topic of the exam
 * @param {String} Difficulty - The difficulty level of the exam
 * @returns {string} - The constructed path
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
    default:
      throw new Error("Invalid topic");
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
    default:
      throw new Error("Invalid difficulty");
  }

  return path;
}