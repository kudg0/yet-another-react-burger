import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './reduxDevToolsInit';


import App from './components/App/App';

import { 
  Home, 
  Profile, 
  Orders,
  Login,
  Ingredients,
  Register,
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
              path='profile' 
              element={<Profile />}
            >
              <Route 
                path='orders'
                element={<Orders />}
              />
                <Route 
                  path=':id'
                  element={<> </>}
                />
            </Route>
            <Route 
              path='ingredients/:id'  
              element={<Ingredients />}
            />
            <Route 
              path='login'  
              element={<Login />}
            />
            <Route 
              path='register'  
              element={<Register />}
            />
            <Route 
              path='reset-password'  
              element={<ResetPassword />}
            />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);