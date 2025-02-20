import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    type: {
      type: String,
      enum: ["multiple-choice", "integer"],
      required: true,
    }, // Add type field
    options: {
      type: [String],
      required: function () {
        return this.type === "multiple-choice";
      },
    }, // Conditional required
    answer: { type: String, required: true },
  },
  { timestamps: true }
);

const quizModel = mongoose.model("question", quizSchema);

export default quizModel;
