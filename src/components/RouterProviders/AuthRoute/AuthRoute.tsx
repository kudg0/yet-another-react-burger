import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';


import { LocationType, ReduxStore } from './../../../services/types/';



const AuthRoute  = ({ outlet, ...rest } : any) => {

  const location = useLocation() as LocationType;

  const { user } = useSelector( (store : ReduxStore) => store.app, shallowEqual);
  const { request, accessToken } = user;


  if(accessToken) {
    const from = location.state?.from?.pathname || '/';

    return <Navigate to={{ pathname: from }} state={{from: {pathname: location.pathname}}} />
  }

  return outlet;
}

export default AuthRoute;