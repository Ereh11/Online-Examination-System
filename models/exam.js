export class Exam
{   
    constructor(topic, difficulty, time, questionsNumber, Questions = [])
    {
        this.topic = topic;
        this.difficulty = difficulty;
        this.time = time;
        this.questionsNumber = questionsNumber;
        this.Questions = [];
    }
}