import { useRouter } from "next/router";
import React from "react";

const ResultPage = () => {
  const router = useRouter();
  const { points } = router.query;

  const playAgain = () => {
    router.push("/");
  };
  return (
    <div className="min-h-screen bg-orange-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-500">
            Game Over
          </h2>
          <p className="mt-2 text-center text-xl text-purple-700">
            Your Score: {points}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <button
            onClick={playAgain}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
