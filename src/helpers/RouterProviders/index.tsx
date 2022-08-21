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
} from '../../pages';

// Components
import App from '../../components/App';
import ProfileContent from '../../components/ProfileContent/ProfileContent';

import AuthRoute from './AuthRoute/AuthRoute';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

import Modal from '../../components/Modals/Modal';
import IngredientDetails from '../../components/Modals/IngredientDetails/IngredientDetails';
import FeedOrderDetails from '../../components/Modals/FeedOrderDetails/FeedOrderDetails';

import { ILocationType } from '../../services/types';


const RoutingProvider: React.FC = () => {

  const location = useLocation() as ILocationType;
  const state = location.state;


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
            path='profile/*' 
            element={<ProtectedRoute outlet={<ProfileContent />} />}
          />

          <Route 
            path="ingredients/:id" 
            element={<IngredientDetails />} 
          />

          <Route 
            path='feed' 
            element={<Feed />}
          />
          
          <Route 
            path='feed/:id' 
            element={<ProtectedRoute outlet={<FeedOrderDetails />} />}
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
          <Route 
            path="/feed/:id" 
            element={<ProtectedRoute outlet={<Modal> <FeedOrderDetails /> </Modal>} />} 
          />
        </Routes>
      )}
    </>
  )
};


export default React.memo(RoutingProvider);