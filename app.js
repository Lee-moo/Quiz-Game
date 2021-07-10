const express = require("express");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
const nunjucks = require("nunjucks");
const mainRouter = require("./routes/main");
dotenv.config();

const app = express();

app.set("questions", [
  {
    question: "다이나믹 프로그래밍과 분할 정복은 같다.",
    answers: {
      a: "같다.",
      b: "다르다",
    },
    correctAnswer: "a",
  },
  {
    question: "다이나믹 프로그래밍과 분할 정복은 같다.",
    answers: {
      a: "같다.",
      b: "다르다",
    },
    correctAnswer: "a",
  },
  {
    question: "다이나믹 프로그래밍과 분할 정복은 같다.",
    answers: {
      a: "같다.",
      b: "다르다",
    },
    correctAnswer: "a",
  },
  {
    question: "다이나믹 프로그래밍과 분할 정복은 같다.",
    answers: {
      a: "같다.",
      b: "다르다",
    },
    correctAnswer: "a",
  },
  {
    question: "다이나믹 프로그래밍과 분할 정복은 같다.",
    answers: {
      a: "같다.",
      b: "다르다",
    },
    correctAnswer: "a",
  },
  {
    question: "다이나믹 프로그래밍과 분할 정복은 같다.",
    answers: {
      a: "같다.",
      b: "다르다",
    },
    correctAnswer: "a",
  },
  {
    question: "다이나믹 프로그래밍과 분할 정복은 같다.",
    answers: {
      a: "같다.",
      b: "다르다",
    },
    correctAnswer: "a",
  },
]);

app.set("port", process.env_PORT || 3001);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "js")));

app.use("/", mainRouter);

app.use((req, res, next) => {
  const error = new Error();
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log("server on");
});
