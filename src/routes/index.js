import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ConnectedLogin from '../views/Login/Login';
import ConnectedRequestsPage from '../views/RequestsPage/RequestsPage';
import RequireAuth from '../hoc/authHoc';
import ApprovalsPage from '../views/ApprovalsPage';
import Checkbox from '../components/CheckBox';
import ConnectedRole from '../views/Role';


const Routes = () => (
  <Switch>
    <Route
      path="/"
      exact
      component={ConnectedLogin}
    />
    <Route
      path="/requests"
      exact
      component={RequireAuth(ConnectedRequestsPage)}
    />
    <Route
      path="/requests/my-approvals"
      exact
      component={RequireAuth(ApprovalsPage)}
    />
    <Route
      path="/settings/roles"
      exact
      component={RequireAuth(ConnectedRole)}
    />
    <Route
      path="/checkbox"
      exact
      component={Checkbox}
    />
  </Switch>
);

export default Routes;
