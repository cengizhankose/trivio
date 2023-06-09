import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import FirebaseDBService from "../../firebase/dbService";
import QuestionLoader from "@/components/QuestionLoader";
import axios from "axios";
import { toast } from "react-toastify";

const GamePage = () => {
  const [points, setPoints] = useState(0);
  const [questionData, setQuestionData] = useState(null);
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const fetch = async () => {
    try {
      const questionsFromDB = await axios.get(
        "http://localhost:5115/questions"
      );
      console.log(
        "🚀 ~ file: index.js:13 ~ fetch ~ questionsFromDB:",
        questionsFromDB
      );
      setQuestionData(questionsFromDB.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleAnswerClick = (answer) => {
    if (answer === questionData[currentQuestion].correctAnswer) {
      toast.success("Correct Answer");
      setPoints(points + 1);
    } else {
      toast.error("Wrong Answer");
    }
    if (currentQuestion + 1 >= questionData.length) {
      router.push({
        pathname: "/result",
        query: { points },
      });
    }

    setCurrentQuestion(currentQuestion + 1); // Move to the next question
  };

  return questionData !== null ? (
    <div className="min-h-screen bg-orange-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-2xl">
        <div>
          <h2 className=" text-center text-3xl font-extrabold text-blue-500">
            Trivio
          </h2>
          <p className="mt-8 text-center text-xl text-purple-700">
            {questionData[currentQuestion]?.questionText}
          </p>
        </div>
        <div>
          {questionData[currentQuestion]?.incorrectAnswers.map(
            (answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(answer)}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4"
              >
                {answer}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  ) : (
    <QuestionLoader />
  );
};

export default GamePage;
