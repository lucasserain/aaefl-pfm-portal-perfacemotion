import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn/index';
import SignUp from '../pages/SignUP/index';
import Dashboard from '../pages/Dashboard/index';
import Route from './routes';
import App from '../pages/Recorder/App.js';
import Record from '../pages/Record';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/teste" component={Record} />
  </Switch>
);

export default Routes;
