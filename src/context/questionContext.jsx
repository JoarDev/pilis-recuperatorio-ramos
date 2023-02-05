import { createContext, useState } from "react";

export const QuestionContext = createContext({
  questionList: [],
  fetchQuestionList: async () => {},
})

const INITIAL_QUESTION_LIST = []

export const QuestionProvider = ({ children }) => {
  const [questionList, setQuestionList] = useState(INITIAL_QUESTION_LIST);

  const fetchQuestionList = async (data) => {
    //fetch from api
    const categoryList = ["arts_and_literature","film_and_tv","food_and_drink","general_knowledge","geography","history","music","science","society_and_culture","sport_and_leisure"]
    console.log("owo")

    const getTriviaUrl = ({ category, quantity,dificulty }) => `https://the-trivia-api.com/api/questions?categories=${categoryList[category]}&limit=${quantity}&difficulty=${dificulty}`
    try {
      const response = await fetch(getTriviaUrl(data))
      const body = await response.json()
      console.log("response",body)
      //save on context
      const formatQuestionList = body.map((question) => {
        const formatAnswersList = question.incorrectAnswers.map((answer) => ({ answer: answer, isCorrect: false })).concat({ answer: question.correctAnswer, isCorrect: true})
        //TASK: random questions up
        return {question: question.question, answersList: formatAnswersList}
      })
      setQuestionList(formatQuestionList)
      return new Promise(resolve => resolve())
    } catch (error) {
      console.error("error",error)
    }
  }

  const value = { questionList: questionList, fetchQuestionList };

  return <QuestionContext.Provider value={value}>{children}</QuestionContext.Provider>;
}