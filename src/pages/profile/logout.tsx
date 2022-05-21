import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logoutEnhance } from './../../services/enhances/logoutEnhance';

import { LocationType } from './../../services/types/';



const Logout = React.memo( () => {

  const dispatch = useDispatch();
  const location = useLocation() as LocationType;
  

  React.useEffect(() => {
    dispatch( logoutEnhance() as any );
  }, [dispatch])


  return null;
});


export default Logout;