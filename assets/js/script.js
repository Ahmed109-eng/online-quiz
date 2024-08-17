import { questions } from './questions.js';
const question = document.getElementById('question');
const answerButtons = document.getElementById('answer-btns');
const nextQuestion = document.getElementById('next-question');


let currentIndex = 0;
let score = 0;

const stratQuiz = () => {
    currentIndex = 0;
    score = 0;
    nextQuestion.innerHTML = "Next";
    displayQuestions();
}

const displayQuestions = () => {
    resetQuestions();
    let currentQestion = questions[currentIndex];
    question.innerHTML = currentQestion.question;

    currentQestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", clickHandler);
    })
}

const clickHandler = (event) => {
    const selectedAnswer = event.target;
    const isCorrect = selectedAnswer.dataset.correct === "true";
    if(isCorrect) {
        selectedAnswer.classList.add("correct");
    } else {
        selectedAnswer.classList.add("incorrect");
    }
}
const resetQuestions = () => {
    nextQuestion.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
stratQuiz();