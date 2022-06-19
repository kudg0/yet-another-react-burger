import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logoutEnhance } from './../../services/enhances/';

import { ILocationType } from './../../services/types/';



const Logout = React.memo( () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  React.useEffect(() => {
    dispatch( logoutEnhance() as any );

    navigate("/login");
  }, [dispatch, navigate])


  return null
});


export default Logout;