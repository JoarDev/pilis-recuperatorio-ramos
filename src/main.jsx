import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Trivia from './Trivia';
import { QuestionProvider } from './context/questionContext';
import Result from './Result';
import { ScoreContext, ScoreProvider } from './context/scoreContext';
import Form from './Form';
import { Auth0Provider } from '@auth0/auth0-react';

const router = createBrowserRouter([

  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Form />,
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
  <Auth0Provider domain='dev-bb4l7j2i4vy8icmp.us.auth0.com'clientId='l9axReHv5PmDdivpuFOpDygZE5Yr2kJW' redirectUri={windows.location.origin}>
    <React.StrictMode>
      <ScoreProvider>
        <QuestionProvider>
          <RouterProvider router={router} />
        </QuestionProvider>
      </ScoreProvider>
    </React.StrictMode>,
  </Auth0Provider>
)
