/** @format */

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";

import "./components/Style/Style.scss";

ReactDOM.render(
  <HashRouter name="">
    <Switch>
      <Route path={`/auth`} component={AuthLayout} />
      <Route path={`/admin`} component={AdminLayout} />
      <Redirect from={`/`} to="/auth/SignIn" />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
