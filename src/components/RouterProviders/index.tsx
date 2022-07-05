import React from 'react';

import { Routes, Route, useLocation } from 'react-router-dom';

// Pages
import { 
  Home, 
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
} from './../../pages/';

// Components
import App from './../App/App';
import ProfileContent from './..//ProfileContent/ProfileContent';

import AuthRoute from './..//RouterProviders/AuthRoute/AuthRoute';
import ProtectedRoute from './../RouterProviders/ProtectedRoute/ProtectedRoute';

import Modal from './../Modals/Modal';
import IngredientDetails from './../Modals/IngredientDetails/IngredientDetails';



const RoutingProvider: React.FunctionComponent = React.memo(() => {

  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };


  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route 
          path="/" 
          element={<App />}
        >

          <Route 
            index
            element={<Home />}
          />

          <Route 
            path="ingredients/:id" 
            element={<IngredientDetails />} 
          />
          
          <Route 
            path='profile/*' 
            element={<ProtectedRoute outlet={<ProfileContent />} />}
          />
          <Route 
            path='feed' 
            element={<Feed />}
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
            element={<ResetPassword />}
          />

        </Route>
      </Routes>
      
      {state?.backgroundLocation && (
        <Routes>
          <Route 
            path="/ingredients/:id" 
            element={<Modal> <IngredientDetails /> </Modal>} 
          />
        </Routes>
      )}
    </>
  )
});


export default RoutingProvider;