import './App.css'
import { useQuestion } from '../hooks/useQuestion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScore } from '../hooks/useScore';

function Trivia() {
  const {questionList} = useQuestion()
  const {updateScore} = useScore()
  const [currentIndexQuestion, setCurrentIndexQuestion] = useState(0)
  const currentQuestion = questionList[currentIndexQuestion]
  const isLastQuestion = questionList.length - 1 == currentIndexQuestion
  const [score, setScore] = useState(0)
  const navigate = useNavigate()

  const answerHandler = ({isCorrect}) => {
    if(isCorrect) {
      setScore((prev) => prev + 100)
    } else {
      setScore((prev) => prev - 100)
    }
    if (isLastQuestion) {
      updateScore( score + (isCorrect ? 100 : -100) )
      navigate("/result")
    } else {
      setCurrentIndexQuestion((prev) => prev + 1)
    }
  }
  
  return (
    <div>
      <h3>Score: {score}</h3>
      <h1>{currentQuestion.question}</h1>
      {
        currentQuestion.answersList.map((answer, index) => (
          <button key={index} onClick={() => answerHandler({isCorrect: answer.isCorrect})} style={{margin: 10}}>{answer.answer}</button>
        ))
      }
    </div>
  )
}

export default Trivia
