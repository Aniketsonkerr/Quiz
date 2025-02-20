import quizModel from "../models/quiz.model.js";

export function getQuestion(req, res) {
  quizModel.find().then((questions) => {
    res.status(200).json({
      message: "quiz questions gathered",
      questions: questions,
    });
  });
}

export function registerQuestion(req, res) {
  const { question, options, answer } = req.body;
  const quiz = new quizModel({
    question,
    options,
    answer,
  });
  quiz
    .save()
    .then((quiz) => {
      res.status(200).json({ message: "question registered", quiz: quiz });
    })
    .catch((error) => {
      res.status(500).json({ message: "failed to register", error: error });
    });
}
