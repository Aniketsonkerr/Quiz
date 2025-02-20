import { useState, useEffect } from "react";
import axios from "axios";

const Quiz = ({ section, onRetry }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizEnded, setQuizEnded] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");

  useEffect(() => {
    axios
      .get("https://quiz-phwy.onrender.com/api/quiz/questions")
      .then((response) => {
        const filtered = response.data.questions.filter(
          (q) => q.type === section
        );
        setQuestions(filtered);
      })
      .catch((error) => console.log("Error fetching questions:", error));
  }, [section]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleNextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerSelection = (option) => {
    setUserAnswer(option);
  };

  const handleSubmitAnswer = () => {
    if (!questions.length) return;

    const currentQ = questions[currentQuestionIndex];
    const correctAnswer = currentQ.answer;

    const isCorrect =
      currentQ.type === "multiple-choice"
        ? userAnswer === correctAnswer
        : parseInt(userAnswer) === parseInt(correctAnswer);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(30);
      setUserAnswer("");
    } else {
      setQuizEnded(true);
    }
  };

  if (questions.length === 0)
    return <div className="text-center text-xl">Loading questions...</div>;
  if (quizEnded)
    return (
      <div className=" flex justify-center items-center h-screen w-screen">
        <div className=" text-center p-4 bg-white w-1/3 rounded-md shadow-md ">
          <h2 className="text-2xl font-bold">Quiz Over!</h2>
          <p className="text-lg mt-2">
            Your Score: {score}/{questions.length}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry Quiz
          </button>
        </div>
      </div>
    );

  const currentQ = questions[currentQuestionIndex];

  return (
    <div className=" flex justify-center items-center h-screen w-screen ">
      <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg text-center">
        <h2 className="text-xl font-bold mb-4">{currentQ.question}</h2>
        <p className="text-gray-500 mb-4">Time Left: {timeLeft} seconds</p>
        {currentQ.type === "multiple-choice" ? (
          <div className="flex flex-col space-y-2">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelection(option)}
                className={`py-2 rounded transition-colors ${
                  userAnswer === option
                    ? "bg-blue-700 text-white"
                    : "bg-blue-500 text-white hover:bg-blue-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="border p-2 rounded w-full mb-4"
          />
        )}
        <div className="mt-4 flex space-x-2 justify-center">
          <button
            onClick={handleSubmitAnswer}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit Answer
          </button>
          <button
            onClick={handleNextQuestion}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Skip Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
