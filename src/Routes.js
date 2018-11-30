import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import ForgotPassword from "./containers/ForgotPassword";
import Register from "./containers/Register";
import ResetPassword from "./containers/ResetPassword";
import Activate from "./containers/Activate";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/forgot" exact component={ForgotPassword} />
    <Route path="/register" exact component={Register} />
    <Route path="/reset" exact component={ResetPassword} />
    <Route path="/activate/:id" exact component={Activate} />
    <Route component={NotFound} />
  </Switch>;