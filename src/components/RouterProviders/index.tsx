import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';


import App from './../App/App';
import ProfileContainer from './..//ProfileContainer/ProfileContainer';

import AuthRoute from './..//RouterProviders/AuthRoute/AuthRoute';
import ProtectedRoute from './../RouterProviders/ProtectedRoute/ProtectedRoute';


import { 
  Home, 
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
} from './../../pages/';

import Modal from './../Modals/Modal';
import IngredientDetails from './../Modals/IngredientDetails/IngredientDetails';



const RoutingProvider = React.memo(() => {

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
            element={<ProtectedRoute outlet={<ProfileContainer />} />}
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