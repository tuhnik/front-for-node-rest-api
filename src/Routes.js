import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import ForgotPassword from "./containers/ForgotPassword";
import Register from "./containers/Register";
import ResetPassword from "./containers/ResetPassword";
import Activate from "./containers/Activate";
import Users from "./containers/Users";

const Routes = (props) =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/forgot" exact component={ForgotPassword} />
    <Route path="/register" exact component={Register} />
    <Route path="/reset" exact component={ResetPassword} />
    {props.authed && <Route path="/users" exact component={Users} />}
    <Route path="/activate/:id" exact component={Activate} />
    <Route component={NotFound} />
  </Switch>;

const mapStateToProps = (state) => {
  return {authed: state.authed};
}

export default withRouter(connect(mapStateToProps)(Routes))