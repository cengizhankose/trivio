import React, { useState } from "react";
import data from "../../mockData.json";
import { useRouter } from "next/router";

const GamePage = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswerClick = (answer) => {
    console.log(
      "🚀 ~ file: index.js:11 ~ handleAnswerClick ~ data.length:",
      data.length
    );
    console.log(
      "🚀 ~ file: index.js:12 ~ handleAnswerClick ~ currentQuestion:",
      currentQuestion + 1
    );
    if (currentQuestion + 1 >= data.length) {
      router.push("/result");
    } else {
      if (answer === data[currentQuestion].correctAnswer) {
        // Do something when the answer is correct
      } else {
        // Do something when the answer is incorrect
      }
    }

    setCurrentQuestion(currentQuestion + 1); // Move to the next question
  };

  return (
    <div className="min-h-screen bg-orange-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-500">
            Trivia Time!
          </h2>
          <p className="mt-2 text-center text-xl text-purple-700">
            {data[currentQuestion]?.question}
          </p>
        </div>
        <div>
          {data[currentQuestion]?.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(answer)}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4"
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
