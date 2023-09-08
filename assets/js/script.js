let screen1 = document.querySelector("#screen-1");
let screen2 = document.querySelector("#screen-2");
let screen3 = document.querySelector("#screen-3");
let screen4 = document.querySelector("#screen-4");
let answerBtns = document.querySelectorAll(".answer");
let formBtn = document.querySelector("form").children[2];
let input = document.querySelector("form").children[1];
let startQuizBtn = document.querySelector("#screen-1 .btn");
let highScoreBtn = document.querySelector("nav .nav-btn");
let timeLeft = document.querySelector("nav span");
let goBackBtn = document.querySelector("#screen-4").children[2];
let cLearScoreBtn = document.querySelector("#screen-4").children[3];
let message = document.querySelector("h3");
let olEl = document.querySelector("ol");

let timer;

startQuizBtn.addEventListener("click", () => {
  timer = setInterval(() => {
    timeLeft.textContent--;

    if (timeLeft.textContent <= 0) {
      clearInterval(timer);
      screen2.style.display = "none";
      screen3.style.display = "block";
      document.querySelector("#screen-3 span").textContent =
        timeLeft.textContent;
    }
  }, 1000);

  let index = 0;
  screen1.style.display = "none";
  screen2.style.display = "block";
  screen2.children[0].textContent = quizData[0].question;

  answerBtns.forEach((btn, i) => {
    btn.textContent = quizData[0].answers[i];
    btn.addEventListener("click", () => {
      if (btn.textContent === quizData[index]?.trueAnswer) {
        message.textContent = "Correct!";
      } else {
        message.textContent = "Wrong!";
        timeLeft.textContent -= 10;
      }

      index++;
      if (index === quizData.length) {
        screen2.style.display = "none";
        screen3.style.display = "block";
        clearInterval(timer);
        document.querySelector("#screen-3 span").textContent =
          timeLeft.textContent;
      } else if (index < quizData.length) {
        screen2.children[0].textContent = quizData[index].question;
        answerBtns.forEach((btn, i) => {
          btn.textContent = quizData[index].answers[i];
        });
      }
    });
  });
});

let highScores = JSON.parse(localStorage.getItem("scores")) || [];

let createHighScores = () => {
  highScores.forEach((score) => {
    let liEl = document.createElement("li");
    liEl.textContent = score.toUpperCase();
    olEl.append(liEl);
  });

  return highScores;
};

formBtn.addEventListener("click", (event) => {
  event.preventDefault();

  if (input.value === "") {
    message.textContent = "Please enter your initials!";
  } else if (!input.value.match(/^[A-Za-z]+$/)) {
    input.value = "";
    message.textContent = "Must be a letter!";
  } else {
    message.textContent = "";
    screen3.style.display = "none";
    screen4.style.display = "block";

    highScores.push(`${input.value} - ${timeLeft.textContent}`);
    highScores.sort((a, b) => (a.slice(-2) > b.slice(-2) ? -1 : 1));

    localStorage.setItem("scores", JSON.stringify(highScores));

    olEl.textContent = "";

    createHighScores();
  }
});

highScoreBtn.addEventListener("click", () => {
  clearInterval(timer);
  timeLeft.textContent = 75;

  message.textContent = "";
  screen1.style.display = "none";
  screen2.style.display = "none";
  screen3.style.display = "none";
  screen4.style.display = "block";

  if (localStorage.getItem("scores") === null) {
    olEl.textContent = "No scores yet!";
  }
});

goBackBtn.addEventListener("click", () => {
  location.reload();
});

cLearScoreBtn.addEventListener("click", () => {
  localStorage.removeItem("scores");

  olEl.textContent = "No scores yet!";
  timeLeft.textContent = 75;
});

createHighScores();
