import React from 'react';
import { Outlet } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { getIngredientsEnhance } from './../../services/enhances/getIngredientsEnhance';


import AppHeader from '../AppHeader/AppHeader';




import Styles from './app.module.scss';



const App = React.memo(() => {
  const dispatch = useDispatch();

  
  React.useEffect( () => {
    dispatch(getIngredientsEnhance() as any);
  }, [dispatch]);


  return (
    <div className={Styles.appContainer}>
      <AppHeader />
      
      <Outlet />
    </div>
  )
});


export default App;