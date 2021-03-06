import React from 'react';

import GlobalStyle from './styles/global';
import SignIn from './pages/Sigin';
import SignUp from './pages/SignUP/index';

const App: React.FC = () => (
  <>
    <SignUp />
    <GlobalStyle />
  </>
);
export default App;
