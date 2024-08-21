import { questions } from "./questions.js";
const question = document.getElementById("question");
const answerButtons = document.getElementById("answers");
const nextQuestion = document.getElementById("next-question");

let currentQuestionNumber = 0;
let score = 0;

const loadQuiz = () => {
  currentQuestionNumber = 0;
  score = 0;
  nextQuestion.innerHTML = "Next";
  displayQuestions();
};


const displayQuestions = () => {
  resetQuestions();
  let currentQestion = questions[currentQuestionNumber];
  question.innerHTML = currentQestion.question;
  currentQestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", clickHandler);
  });
};


const clickHandler = (event) => {
  const selectedAnswer = event.target;
  const isCorrect = selectedAnswer.dataset.correct === "true";
  if (isCorrect) {
    selectedAnswer.classList.add("correct");
    score++;
  } else {
    selectedAnswer.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct == "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextQuestion.style.display = "block";
};

const resetQuestions = () => {
  nextQuestion.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
};
nextQuestion.addEventListener("click", () => {
  if (currentQuestionNumber < questions.length) {
    nextQuestionButton();
  } else {
    loadQuiz();
  }
});

const nextQuestionButton = () => {
  currentQuestionNumber++;
  if (currentQuestionNumber < questions.length) {
    displayQuestions();
  } else {
    displayScore();
  }
};

const displayScore = () => {
  resetQuestions();
  question.innerHTML = `You get ${score} out of ${questions.length} questions right.`;
  nextQuestion.innerHTML = "Try again";
  nextQuestion.style.display = "block";
};

loadQuiz();
