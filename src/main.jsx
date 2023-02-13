import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App'
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./index.css";
import Trivia from './routes/Trivia';
import { QuestionProvider } from './context/questionContext';
import Result from './routes/Result';
import { ScoreProvider } from './context/scoreContext';
import { Auth0Provider } from "@auth0/auth0-react";

export const DATA_URL = "https://functiontriviaproject.joardev.workers.dev/"

const Auth0ProviderWithRedirectCallback = ({ children, ...props }) => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };
  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
      {children}
    </Auth0Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScoreProvider>
        <QuestionProvider>
            <Auth0ProviderWithRedirectCallback
              domain="dev-aonixml.us.auth0.com"
              clientId="08plAknxq8tkBYN7txqjlzLyebDx8nXs"
              authorizationParams={{redirect_uri: window.location.origin}}
            >
              <Routes>
                <Route path="/" exact element={<App />}/>
                <Route path="/trivia" exact element={<Trivia />}/>
                <Route path="/result" exact element={<Result />}/>
              </Routes>
            </Auth0ProviderWithRedirectCallback>
        </QuestionProvider>
      </ScoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
