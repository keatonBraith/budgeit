import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Auth from "./components/Auth";
import Budget from "./components/Budget";
import Transactions from "./components/Transaction";

export default (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route path="/dash/:userId" component={Dashboard} />
    <Route path="/budget/:monthId" component={Budget} />
    <Route path="/trans" component={Transactions} />
  </Switch>
);
