import React from "react";
import styles from "./QuestionLoader.module.css";

const QuestionLoader = () => {
  return (
    <div className="min-h-screen bg-orange-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-2xl">
        <div className={styles.loader}>Trivio</div>
      </div>
    </div>
  );
};

export default QuestionLoader;
