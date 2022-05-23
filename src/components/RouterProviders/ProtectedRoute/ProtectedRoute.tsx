import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';


import { LocationType, ReduxStore } from './../../../services/types/';

import { getCookie } from './../../../services/utils/helpers/workWithCookie';



const ProtectedRoute  = ({ outlet, ...rest } : any) => {

  const location = useLocation() as LocationType;


  const user = useSelector( (store : ReduxStore) => store.user, shallowEqual);
  const accessToken = user.data.accessToken || getCookie('accessToken');

  const from = location.pathname.includes('logout') ? '/profile' : location.pathname; 



  if(!accessToken) return (
    <Navigate 
      to={{ pathname: "/login" }} 
      state={{from: {pathname: from}}} 
    />
  )
  
  return outlet;
}

export default ProtectedRoute;