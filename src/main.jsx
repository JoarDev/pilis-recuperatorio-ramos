import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Trivia from './Trivia';
import { QuestionProvider } from './context/questionContext';
import Result from './Result';
import { ScoreContext, ScoreProvider } from './context/scoreContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/trivia",
    element: <Trivia />,
  },
  {
    path: "/result",
    element: <Result />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ScoreProvider>
      <QuestionProvider>
        <RouterProvider router={router} />
      </QuestionProvider>
    </ScoreProvider>
  </React.StrictMode>,
)
