import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  removeClickedIngredient
} from './../services/slicers/appSlice';

import Main from './../components/Main/Main';


const Home = React.memo( () => {
    
  const dispatch = useDispatch();  
  const location = useLocation();
  

  React.useEffect(() => {
    if(!location.pathname.includes("ingredients/")) dispatch( removeClickedIngredient() );
  }, [dispatch, location])


  return (
    <Main />
  );
});

export default Home;