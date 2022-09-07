import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Redux

import { logoutEnhance } from './../../../services/redux/enhances/';


const Logout: React.FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  React.useEffect(() => {
    dispatch( logoutEnhance() as any );

    navigate("/login");
  }, [dispatch, navigate])


  return null
};


export default React.memo(Logout);