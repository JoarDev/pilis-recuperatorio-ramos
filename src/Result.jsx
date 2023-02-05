import { Link } from 'react-router-dom'
import './App.css'
import { useScore } from './hooks/useScore'

function Result() {
  const {score} = useScore()

  return (
    <div>
      <h3>Final Score: {score}</h3>
      <Link to={"/"}>Retry</Link>
    </div>
  )
}

export default Result
