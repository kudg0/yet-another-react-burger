import React from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';


import { LocationType, ReduxStore } from './../../../services/types/';



const ProtectedRoute  = ({ outlet, ...rest } : any) => {

  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector( (store : ReduxStore) => store.app, shallowEqual);
  const { request, accessToken } = user;


  const from = location.pathname.includes('logout') ? '/profile' : location.pathname; 


  if(!accessToken) return <Navigate to={{ pathname: "/login" }} state={{from: {pathname: from}}} />
  
  return outlet;
}

export default ProtectedRoute;