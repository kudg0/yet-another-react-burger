import React from 'react';

import { Outlet, useLocation } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { getIngredientsEnhance, reLoginEnhance } from './../../services/redux/enhances/';

// Components
import Header from './Header/Header';

// Styles
import Styles from './app.module.scss';



const App: React.FunctionComponent = React.memo(() => {
  
  const dispatch = useDispatch();

 
  React.useEffect( () => {
    dispatch(getIngredientsEnhance() as any);
    dispatch(reLoginEnhance() as any);
  }, [dispatch]);


  return (
    <div className={Styles.appContainer}>
      <Header />
      <Outlet />
    </div>
  )
});


export default App;