import './App.css'
import { useForm } from 'react-hook-form';
import { useQuestion } from '../hooks/useQuestion';
import { useNavigate } from 'react-router-dom';
import LoginButton from '../components/LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton';
import { useEffect, useState } from 'react';
import { DATA_URL } from '../main';

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { fetchQuestionList } = useQuestion()
  const navigate = useNavigate()
  const {isAuthenticated} = useAuth0()
  const [scoreList, setScoreList] = useState([])

  const onSubmit = async (formData) => {
    console.log("formData",formData)
    await fetchQuestionList(formData)
    navigate("/trivia")
  };

  useEffect(() => {
    getScoresList()
  },[])

  const getScoresList = async () => {
    const response = await fetch(DATA_URL)
    const scoreList = await response.json()
    console.log("scoreList",scoreList)
    setScoreList(scoreList)
  }

  return (
    <div>
      <h1>Trivia Game</h1>
      {
        isAuthenticated ? (<LogoutButton />) : (<LoginButton/>)
      }
      <form onSubmit={handleSubmit(onSubmit)} style={{display: "flex", flexDirection: "column", gap: 15, margin: "20px 0px"}}>
        <label>
          Category:{" "}
          <select {...register("category", { required: true })}>
            <option value="">Select an option</option>
            <option value="0">Arts & Literature</option>
            <option value="1">Film & TV</option>
            <option value="2">Food & Drink</option>
            <option value="3">General Knowledge</option>
            <option value="4">Geography</option>
            <option value="5">History</option>
            <option value="6">Music</option>
            <option value="7">Science</option>
            <option value="8">Society & Culture</option>
            <option value="9">Sport & Leisure</option>
          </select>
        </label>
        <label>
          Dificulty:{" "}
          <select {...register("dificulty", { required: true })}>
            <option value="">Select an option</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <label>
          Number of questions:{" "}
          <select {...register("quantity", { required: true })}>
            <option value="">Select an option</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
        <input type="submit" value="Start Trivia Game"/>
      </form>
      <h2>Ranking Table</h2>
      <table style={{width: "100%"}}>
        <thead>
          <tr>
            <th>Nickname</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {
            scoreList.map(({key, value}) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default App
