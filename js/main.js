let questions = null;
let currentIndex = 1;
const quizWidth = 600;
const slideSpeed = 0.3;
let currentTime = 30;
let timer = null;

window.onload = async () => {
  const response = await axios({
    method: "get",
    url: "questions",
  });

  if (response.status === 200) {
    questions = response.data.questions;
    bulidQuiz();
    setTimer(timer, 1000);
  }
};

function setTimer(timer, tick) {
  timer = setInterval(() => {
    if (currentTime === 0) {
      nextQuiz();
    } else {
      document.querySelector(".timer").textContent = currentTime;
      currentTime--;
    }
  }, tick);
}

function clearTimer(timer) {
  clearInterval(timer);
}

function bulidQuiz() {
  let quizzes = [];
  for (let i = 0; i < questions.length; i++) {
    let quiz = `<li class="quiz">
    <p>${i + 1}번 : ${questions[i].question}</p>`;

    for (answer in questions[i].answers) {
      quiz += `
      <div>
      <input type="radio" name=${i} value="${answer}" /><span>${questions[i].answers[answer]}</span>
      </div>`;
    }
    quiz += `<button class="next" onclick="nextQuiz();">다음 문제</button>
    </li>`;

    quizzes.push(quiz);
  }

  document.querySelector(".quiz-list").innerHTML = quizzes.join("");
}

async function buildResult() {
  document.querySelector(".quiz-list").className += " hide";
  document.querySelector(".timer").className += " hide";
  const right = document.querySelector(".right");
  const wrong = document.querySelector(".wrong");
  const answerSheet = [];

  for (let i = 0; i < questions.length; i++) {
    let answer = null;
    for (let j = 0; j < document.getElementsByName(`${i}`).length; j++) {
      if (document.getElementsByName(`${i}`)[j].checked === true) {
        answer = document.getElementsByName(`${i}`)[j].value;
      }
    }
    answerSheet.push([i, answer]);
  }

  const response = await axios({
    url: "/grading",
    method: "post",
    data: answerSheet,
  });

  if (response.status === 200) {
    right.textContent = `맞힌 문제 : ${response.data.right}`;
    wrong.textContent = `틀린 문제 : ${response.data.wrong}`;
  }
}

function nextQuiz() {
  if (currentIndex < questions.length) {
    const quizList = document.querySelector(".quiz-list");

    quizList.style.transitionDuration = 1 + "s";
    quizList.style.transform = "translateX(-" + currentIndex * quizWidth + "px";

    currentIndex += 1;
    currentTime = 30;
  } else {
    clearTimer(timer);
    buildResult();
  }
}
