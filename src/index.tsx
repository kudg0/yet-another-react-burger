import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './reduxDevToolsInit';


import App from './components/App/App';
import ProfileContainer from './components/ProfileContainer/ProfileContainer';

import AuthRoute from './components/RouterProviders/AuthRoute/AuthRoute';
import ProtectedRoute from './components/RouterProviders/ProtectedRoute/ProtectedRoute';


import { 
  Home, 
  Ingredients, 
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
} from './pages/';


import './styles/index.scss';



const container = document.getElementById('root')!,
      root = createRoot(container);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={<App />}
          >

            <Route 
              index
              element={<Home />}
            />
            
            <Route 
              path='profile/*' 
              element={<ProtectedRoute outlet={<ProfileContainer />} />}
            />
            <Route 
              path='feed' 
              element={<Feed />}
            />

            <Route 
              path='ingredients/:id'  
              element={<Ingredients />}
            />
            <Route 
              path='login'  
              element={<AuthRoute outlet={<Login />} />}
            />
            <Route 
              path='register'  
              element={<AuthRoute outlet={<Register />} />}
            />
            <Route 
              path='forgot-password'  
              element={<AuthRoute outlet={<ForgotPassword />} />}
            />
            <Route 
              path='reset-password'  
              element={<AuthRoute outlet={<ResetPassword />} />}
            />

          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);