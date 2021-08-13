//imports React
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
//imports composants
import AuthApi from "./AuthApi";
//import pages
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Articles from "../pages/Articles";
import Home from "../pages/Home";

export default function Routes() {
  const Auth = React.useContext(AuthApi);

  return (
    <Switch>
      <ProtectedLogin path="/" exact component={Home} />
      <ProtectedLogin path="/signup" component={Signup} />
      <ProtectedLogin path="/login" component={Login} auth={Auth.auth} />
      <ProtectedRoute path="/articles" auth={Auth.auth} component={Articles} />
    </Switch>
  );
}

const ProtectedLogin = function ({ auth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        !auth ? (
          <>
            <Component />
          </>
        ) : (
          <Redirect to="/articles" />
        )
      }
    />
  );
};

const ProtectedRoute = function ({ auth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        auth ? (
          <>
            <Component />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
