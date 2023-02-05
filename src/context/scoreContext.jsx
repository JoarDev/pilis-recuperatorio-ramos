import { createContext, useState } from "react";

export const ScoreContext = createContext({
  score: 0,
  updateScore: () => {},
  saveTriviaScore: () => {},
})

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);

  const updateScore = async (score) => {
    setScore(score)
  }

  const saveTriviaScore = () => {
    console.log("saved")
  }

  const value = { score: score, updateScore, saveTriviaScore };

  return <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>;
}