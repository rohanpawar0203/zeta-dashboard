import React, { useState, useContext } from "react";

export const QuestionsContext = React.createContext();

const QuestionsContextProvider = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [quiz, setQuiz] = useState(false);
  return (
    <QuestionsContext.Provider
      value={{
        currentQuestion,
        setCurrentQuestion,
        quiz,
        setQuiz,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export const GetQuestionsContextValues = () => {
 const {
    currentQuestion,
    setCurrentQuestion,
    quiz,
    setQuiz,
  } = useContext(QuestionsContext);

  return {
    currentQuestion,
    setCurrentQuestion,
    quiz,
    setQuiz,
  };
}

export default QuestionsContextProvider;
