import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = ({actionBefore}) => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    if (actionBefore) {
      actionBefore()
    }
    loginWithRedirect({appState:{returnTo: window.location.pathname}})
  }

  return <button onClick={handleLogin}>Log In</button>;
};

export default LoginButton;