import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        type: String,
      },
    ],
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const quizModel = mongoose.model("question", quizSchema);

export default quizModel;
