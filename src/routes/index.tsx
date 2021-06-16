import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn/index';
import SignUp from '../pages/SignUP/index';
import Dashboard from '../pages/Dashboard/index';
import Route from './routes';
import Report from '../pages/Report';
import CadastroDisciplina from '../pages/CadastroDisciplinas';
import Disciplina from '../pages/Disciplina';
import ListaDisciplina from '../pages/ListaDiscplinas';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/record/:aula+" component={Dashboard} isPrivate />
    <Route path="/caddisciplinas" component={CadastroDisciplina} isPrivate />
    <Route path="/disciplinas/:disciplina+" component={Disciplina} isPrivate />
    <Route path="/listadisciplinas" component={ListaDisciplina} isPrivate />
    <Route path="/report/:coddisciplina+" component={Report} isPrivate />
  </Switch>
);

export default Routes;
