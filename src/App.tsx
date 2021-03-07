import React from 'react';

import GlobalStyle from './styles/global';
import SignIn from './pages/Sigin';
import SignUp from './pages/SignUP/index';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>

    <GlobalStyle />
  </>
);
export default App;
