import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContext } from "./shared/Context/AuthContext";
import Users from "./components/Users/pages/Users";
import Auth from "./components/Users/pages/Auth";
import { useAuth } from "./shared/Hooks/auth-hooks";

const App = () => {
  const { token, login, logout } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/contacts" exact />
        <Users />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/">
          <Auth />
        </Route>
      </Switch>
    );
  }

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
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
