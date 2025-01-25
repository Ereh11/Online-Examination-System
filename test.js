import { Exam } from '../models/exam.js';
let urlQuestions = 'http://localhost:3001';
/**
 * Take examTopic, examDifficulty, examDuration and create an exam object
 * @param {string} examTopic 
 * @param {string} examDifficulty 
 * @param {Number} examDuration 
 * @param {Number} examQuestionsNumber
 * @returns {Exam} exam object
 */
async function createExam(Topic, Difficulty, Duration, QuestionsNumber) {
    const exam = new Exam(Topic, Difficulty, Duration, QuestionsNumber);
    urlQuestions += checkReturn(Topic, Difficulty);

    const questions = await getQuestions(urlQuestions, exam.QuestionsNumber);
    questions.forEach(question => {
        console.log(question.question, question.options, question.correctAnswer);
    });
}

/**
 * Fetch questions from the Database and return a list of questions based on the number of questions required
 * @param {string} urlQuestions 
 * @param {Number} QuestionsNumber 
 * @returns {Array} selectedQuestions
 */
async function getQuestions(urlQuestions, QuestionsNumber) {
    try{
        const response = await fetch(urlQuestions);
        if(!response.ok) {
            throw new Error('Failed to fetch questions');
        }
        
        const questions = await response.json();

        const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
        const selectedQuestions = shuffledQuestions.slice(0, QuestionsNumber);
        
        return selectedQuestions;
    }
    catch(error) {
        console.error('Error fetching questions:', error);
    }
}

function checkReturn(Topic, Difficulty)
{
    let path = '';
    switch(Topic){
        case "JavaScript":
            path = '/javascript';
            break;
        case "C#":
            path = '/Csharp';
            break;
        case "TypeScript":
            path = '/TypeScript';
            break;
    }

    switch(Difficulty){
        case "easy":
            path += '-easy';
            break;
        case "medium":
            path += '-medium';
            break;
        case "hard":
            path += '-hard';
            break;
    }
    
    return path;
}
createExam('JavaScript', 'easy', 10, 5);