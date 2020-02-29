import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthContext } from "./shared/Context/AuthContext";
import Users from "./components/Users/Users";
import Auth from "./components/Auth/Auth";
import { useAuth } from "./shared/Hooks/auth-hooks";

const App = () => {
  const { token, login, logout } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout
      }}
    >
      <Router>
        {<Route exact path="/" render={() => token ? <Users/> : <Auth/> }/>}
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
