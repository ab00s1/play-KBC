const correctSound = new Audio("audio/correct.mp3");
const inCorrectSound = new Audio("audio/incorrect.mp3");
const timeUpSound = new Audio("audio/timesUp.mp3");

document
  .querySelector("body > div > div.head > div > div.sound-icon > img")
  .addEventListener("click", (e) => {
    if (e.target.src.includes("Up")) {
      e.target.src = "images/🦆 icon _Volume Mute_.svg";
      correctSound.muted = true;
      inCorrectSound.muted = true;
      timeUpSound.muted = true;
    } else {
      e.target.src = "images/🦆 icon _Volume Up_.svg";
      correctSound.muted = false;
      inCorrectSound.muted = false;
      timeUpSound.muted = false;
    }
  });

let timer;
const timerElm = document.querySelector("body > div > div.quiz > div.timer");

const questions = [
  {
    question: "Which is the tallest building in India?",
    answers: [
      { text: "a) Eifel Tower", correct: false },
      { text: "b) Trump Tower", correct: false },
      { text: "c) Palais Royale", correct: true },
      { text: "d) The Imperial II", correct: false },
    ],
  },
  {
    question: "What is the temperature at which liquid water has the highest density?",
    answers: [
      { text: "a) 0 K", correct: false },
      { text: "b) 98.6 °F", correct: false },
      { text: "c) 4 °C", correct: true },
      { text: "d) 23 °F", correct: false },
    ],
  },
  {
    question:
      "In a certain code, “ROAD” is written as “URDG”. How is “MILE” written in that code?",
    answers: [
      { text: "a) PLOH", correct: true },
      { text: "b) OJMF", correct: false },
      { text: "c) NIMH", correct: false },
      { text: "d) QJOF", correct: false },
    ],
  },
  {
    question: "Who was the second President of the India?",
    answers: [
      { text: "a) Lal Bahadur Shastri", correct: false },
      { text: "b) Sarvepalli Radhakrishnan", correct: true },
      { text: "c) Mahatma Gandhi", correct: false },
      { text: "d) Gulzarilal Nanda", correct: false },
    ],
  },
  {
    question: "Which of the following vitamins is a water-soluble vitamin?",
    answers: [
      { text: "a) Vitamin A", correct: false },
      { text: "b) Vitamin D", correct: false },
      { text: "c) Vitamin K", correct: false },
      { text: "d) Vitamin C", correct: true },
    ],
  },
  {
    question:
      "In a factory, 12 workers can complete a project in 15 days. If 4 workers leave the job after 5 days of work, how many more days will it take to complete the project with the remaining workers?",
    answers: [
      { text: "a) 21", correct: false },
      { text: "b) 15", correct: true },
      { text: "c) 20", correct: false },
      { text: "d) 40", correct: false },
    ],
  },
  {
    question: "Who wrote the famous play 'Hamlet'?",
    answers: [
      { text: "a) Charles Dickens", correct: false },
      { text: "b) Mark Twain", correct: false },
      { text: "c) William Shakespeare", correct: true },
      { text: "d) Jane Austen", correct: false },
    ],
  },
  {
    question:
      "Which organ in the human body is primarily responsible for filtering blood?",
    answers: [
      { text: "a) Liver", correct: false },
      { text: "b) Heart", correct: false },
      { text: "c) Lungs", correct: false },
      { text: "d) Kidneys", correct: true },
    ],
  },
  {
    question: "If a triangle has two equal sides, what is it called?",
    answers: [
      { text: "a) Scalene", correct: false },
      { text: "b) Right-angled", correct: false },
      { text: "c) Isosceles", correct: true },
      { text: "d) Equilateral", correct: false },
    ],
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    answers: [
      { text: "a) India", correct: false },
      { text: "b) China", correct: false },
      { text: "c) Japan", correct: true },
      { text: "d) South Korea", correct: false },
    ],
  },
  {
    question: "Which gas is most abundant in Earth's atmosphere?",
    answers: [
      { text: "a) Oxygen", correct: false },
      { text: "b) Nitrogen", correct: true },
      { text: "c) Carbon dioxide", correct: false },
      { text: "d) Hydrogen", correct: false },
    ],
  },
  {
    question: "What is the value of π (pi) to two decimal places?",
    answers: [
      { text: "a) 3.12", correct: false },
      { text: "b) 3.14", correct: true },
      { text: "c) 3.16", correct: false },
      { text: "d) 3.18", correct: false },
    ],
  },
  {
    question: "What is the smallest country in the world by land area?",
    answers: [
      { text: "a) Monaco", correct: false },
      { text: "b) Nauru", correct: false },
      { text: "c) Vatican City", correct: true },
      { text: "d) San Marino", correct: false },
    ],
  },
  {
    question: "What is the powerhouse of the cell?",
    answers: [
      { text: "a) Nucleus", correct: false },
      { text: "b) Ribosome", correct: false },
      { text: "c) Mitochondria", correct: true },
      { text: "d) Chloroplast", correct: false },
    ],
  },
  {
    question: "Which number is missing in the sequence? 3, 9, 27, ?, 243",
    answers: [
      { text: "a) 54", correct: false },
      { text: "b) 81", correct: true },
      { text: "c) 108", correct: false },
      { text: "d) 162", correct: false },
    ],
  },
];

const questionElm = document.getElementById("question");
const allAnswers = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let questionNumber = 0;
let score = 0;

function resetState() {
  while (allAnswers.firstChild) {
    allAnswers.removeChild(allAnswers.firstChild);
  }
}

function selectAnswer(e) {
  const isCorrect = e.target.dataset.correct === "true";
  if (isCorrect) {
    e.target.classList.add("correct");
    correctSound.play();
    score++;
  } else {
    e.target.classList.add("incorrect");
    inCorrectSound.play();
  }
  Array.from(allAnswers.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
    clearInterval(timer);
  });
}

function setQuestion() {
  resetState();
  document.querySelector("body").style.backgroundColor = "#cce2c2";
  timerElm.style.backgroundColor = "rgba(2, 164, 10, 0.644)";
  correctSound.pause();
  correctSound.currentTime = 0;
  inCorrectSound.pause();
  inCorrectSound.currentTime = 0;
  timeUpSound.pause();
  timeUpSound.currentTime = 0;
  let currentQues = questions[questionNumber];
  questionElm.innerHTML = currentQues.question;

  currentQues.answers.forEach((ans) => {
    const button = document.createElement("button");
    button.innerHTML = ans.text;
    button.classList.add("btn");
    allAnswers.appendChild(button);
    if (ans.correct) {
      button.dataset.correct = ans.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
  startTimer(60);
}

function startQuiz() {
  questionNumber = 0;
  score = 0;
  questionElm.style.textAlign = "left";
  document.querySelector("body > div > div.quiz > div.timer").style.display =
    "flex";
  document.querySelector(
    "body > div > div.head > div > div.ques-no"
  ).style.display = "flex";
  document.querySelector(
    "body > div > div.head > div > div.ques-no"
  ).innerHTML = `${Math.floor((questionNumber + 1) / 10)}${
    (questionNumber + 1) % 10
  }/15`;
  document.querySelector(
    "body > div > div.head > div > div.sound-icon"
  ).style.marginInlineStart = "60%";
  nextButton.innerHTML = "Next >";
  nextButton.style.float = "right";
  nextButton.style.display = "inline-block";
  setQuestion();
}

function showScore() {
  resetState();
  questionElm.innerHTML = "! Game Over !<br>Results";
  questionElm.style.textAlign = "center";
  allAnswers.innerHTML = `<div class="result-bar"><div class="neg-result-bar"></div></div>
    <p style="text-align: center; font-weight: 600;">You Scored ${score} out of ${questions.length} !<br>Share with your Friends !!!</p>`;

  const footer = document.createElement("footer");
  footer.innerHTML = "Made with ❤️ by Abhinav";
  document.querySelector("body").appendChild(footer);

  if (score >= +localStorage.getItem("highScore"))
    localStorage.setItem("highScore", score);
  document.querySelector("#answer-buttons > div > div").style.width = `${
    ((questions.length - score) * 100) / questions.length
  }%`;
  document.querySelector("body > div > div.quiz > div.timer").style.display =
    "none";
  document.querySelector(
    "body > div > div.head > div > div.ques-no"
  ).style.display = "none";
  document.querySelector(
    "body > div > div.head > div > div.sound-icon"
  ).style.marginInlineStart = "0";
  nextButton.innerHTML = "<<< Retry";
  nextButton.style.float = "none";
  nextButton.style.display = "block";
  nextButton.style.marginInline = "auto";
}

function goToNext() {
  questionNumber++;
  document.querySelector(
    "body > div > div.head > div > div.ques-no"
  ).innerHTML = `${Math.floor((questionNumber + 1) / 10)}${
    (questionNumber + 1) % 10
  }/15`;
  if (questionNumber < questions.length) {
    setQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  clearInterval(timer);
  if (questionNumber < questions.length) {
    goToNext();
  } else {
    startQuiz();
  }
});

function startTimer(duration) {
  let timeLeft = duration;
  if (timeLeft === 60) timerElm.innerHTML = "01:00";
  else if (timeLeft >= 10) timerElm.innerHTML = `00:${timeLeft}`;
  else timerElm.innerHTML = `00:0${timeLeft}`;
  timer = setInterval(() => {
    timeLeft--;

    if (timeLeft <= 30) {
      document.querySelector("body").style.backgroundColor =
        "rgba(212, 214, 159, 0.55)";
      timerElm.style.backgroundColor = "rgba(197, 177, 0, 0.43)";
    }

    if (timeLeft === 60) timerElm.innerHTML = "01:00";
    else if (timeLeft >= 10) timerElm.innerHTML = `00:${timeLeft}`;
    else {
      document.querySelector("body").style.backgroundColor = "#DBADAD";
      timerElm.style.backgroundColor = "rgba(197, 12, 0, 0.43)";
      timerElm.innerHTML = `00:0${timeLeft}`;
    }

    if (timeLeft <= 0) {
      timeUpSound.play();
      Array.from(allAnswers.children).forEach((button) => {
        if (button.dataset.correct === "true") {
          button.classList.add("correct");
        }
        button.disabled = true;
      });
      clearInterval(timer);
    }
  }, 1000);
}

startQuiz();
