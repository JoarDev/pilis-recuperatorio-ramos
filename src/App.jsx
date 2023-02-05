import './App.css'
import { useForm } from 'react-hook-form';
import { useQuestion } from './hooks/useQuestion';
import { useNavigate } from 'react-router-dom';

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { fetchQuestionList } = useQuestion()
  const navigate = useNavigate()

  const onSubmit = async (formData) => {
    console.log("formData",formData)
    await fetchQuestionList(formData)
    navigate("/trivia")
  };

  return (
    <div>
      <h1>Trivia Game</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{display: "flex", flexDirection: "column", gap: 15}}>
        <label>
          Categoria:{" "}
          <select {...register("category", { required: true })}>
            <option value="">Seleccione</option>
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
          Dificultad:{" "}
          <select {...register("dificulty", { required: true })}>
            <option value="">Seleccione</option>
            <option value="easy">Facil</option>
            <option value="medium">Medio</option>
            <option value="hard">Dificil</option>
          </select>
        </label>
        <label>
          Cantidad de preguntas:{" "}
          <select {...register("quantity", { required: true })}>
            <option value="">Seleccione</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
        <input type="submit" value="Empezar"/>
      </form>
    </div>
  )
}

export default App
