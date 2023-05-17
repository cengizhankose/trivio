import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FirebaseDBService from "../../firebase/dbService";
import QuestionLoader from "@/components/QuestionLoader";

const GamePage = () => {
  const [questionData, setQuestionData] = useState(null);
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const fetch = async () => {
    const questionsFromDB = await FirebaseDBService.getQuestions();
    setQuestionData(questionsFromDB);
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleAnswerClick = (answer) => {
    console.log(
      "🚀 ~ file: index.js:11 ~ handleAnswerClick ~ data.length:",
      questionData.length
    );
    console.log(
      "🚀 ~ file: index.js:12 ~ handleAnswerClick ~ currentQuestion:",
      currentQuestion + 1
    );
    if (currentQuestion + 1 >= questionData.length) {
      router.push("/result");
    } else {
      if (answer === questionData[currentQuestion].correctAnswer) {
        // Do something when the answer is correct
      } else {
        // Do something when the answer is incorrect
      }
    }

    setCurrentQuestion(currentQuestion + 1); // Move to the next question
  };

  return questionData !== null ? (
    <div className="min-h-screen bg-orange-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-500">
            Trivia Time!
          </h2>
          <p className="mt-2 text-center text-xl text-purple-700">
            {questionData[currentQuestion]?.question}
          </p>
        </div>
        <div>
          {questionData[currentQuestion]?.answers.map((answer, index) => (
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
  ) : (
    <QuestionLoader />
  );
};

export default GamePage;
