import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import Landing from "./pages/landing/landing";
import About from "./pages/about/about";
import NotFound from "./pages/404/notFound";
import Dashboard from "./pages/app/dashboard/dashboard";
import SignUp from "./pages/auth/signUp";
import Login from "./pages/auth/login";

const PrivateRoute = ({
  component: Component,
  ...rest
}) => {
  <Route
    {...rest}
    render={
      props => {
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    }
  />
}

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/about" component={About} />
        <PrivateRoute path="/app" component={Dashboard} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;