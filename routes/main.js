const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("main.html");
});

router.get("/quiz", (req, res) => {
  res.render("quiz.html");
});

router.get("/questions", (req, res) => {
  res.json({
    questions: req.app.get("questions").map((element) => {
      return {
        question: element.question,
        answers: element.answers,
      };
    }),
  });
});

router.post("/grading", (req, res) => {
  const answerSheet = req.body;
  const questions = req.app.get("questions");
  let [right, wrong] = [0, 0];

  for (let i = 0; i < answerSheet.length; i++) {
    if (questions[answerSheet[i][0]].correctAnswer == answerSheet[i][1]) {
      right += 1;
    } else {
      wrong += 1;
    }
  }

  res.status(200).json({
    right,
    wrong,
  });
});
module.exports = router;
