import React from 'react';
import { useLocation } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import {
  removeClickedIngredient
} from './../services/redux/slicers/appSlice';

// Components
import Main from './../components/App/Main/Main';



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