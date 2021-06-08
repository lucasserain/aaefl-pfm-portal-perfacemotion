import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn/index';
import SignUp from '../pages/SignUP/index';
import Dashboard from '../pages/Dashboard/index';
import Route from './routes';
import App from '../pages/Recorder/App.js';
import Report from '../pages/Report';
import Record from '../pages/Record';
import CadastroDisciplina from '../pages/CadastroDisciplinas';
import Disciplina from '../pages/Disciplina';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/report" component={Report} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/teste" component={Record} />
    <Route path="/caddisciplinas" component={CadastroDisciplina} />
    <Route path="/disciplinas/:disciplina+" component={Disciplina} />
  </Switch>
);

export default Routes;
