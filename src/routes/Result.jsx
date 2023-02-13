import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import LoginButton from '../components/LoginButton'
import { useScore } from '../hooks/useScore'
import { DATA_URL } from '../main'

function Result() {
  const {score, updateScore} = useScore()
  const {isAuthenticated, user} = useAuth0()

  useEffect(() => {
    const scoreFromStorage = localStorage.getItem("score")
    if (scoreFromStorage !== null) {
      updateScore(Number.parseInt(scoreFromStorage))
    }
  }, [])

  const handleSaveScore = async () => {
    console.log("score",score)
    try {
      const response = await fetch(DATA_URL, {
        method: "POST",
        body: JSON.stringify({
          name: user.nickname,
          score: score,
        })
      })
      const body = await response.text()
      console.log("response", {
        body: body,
        ok: response.ok
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Final Score: {score}</h1>
      <div style={{display: "flex", flexDirection: "column", gap: 20}}>
        {
          isAuthenticated ? (
            <>
              <p>Click to save your score on the ranking table</p>
              <button onClick={handleSaveScore}>Save score</button>
            </>
          ) : (
            <>
              <p>Login to save your score on the ranking table</p>
              <LoginButton actionBefore={() => localStorage.setItem("score", score)}/>
            </>
          )
        }
        <Link to={"/"} onClick={() => localStorage.removeItem("score")}>Return to ranking table</Link>
      </div>
    </div>
  )
}

export default Result
