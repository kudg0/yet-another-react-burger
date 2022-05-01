import React from 'react';

import { useDispatch } from 'react-redux';
import { INGREDIENTS_SET } from './../../services/actions/ingredientsActions';


import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';

import { IngredientType } from './../../services/types/';


import checkApiResponse from './../utils/checkApiResponse';
import handleApiErrors from './../utils/handleApiErrors';

import Styles from './app.module.scss';



const apiUrl : string = process.env.REACT_APP_API_BASE_URL + "/ingredients"!;


const App = React.memo(() => {
  const dispatch = useDispatch();

  
  React.useEffect( () => {
    fetch( apiUrl )
      .then(response => {
        checkApiResponse(response)
          .then( (result : {success: boolean, data: IngredientType[]}) => {
            if(!result.success) return Promise.reject(result);

            dispatch({type: INGREDIENTS_SET, ingredients: result.data});
          })
          .catch( (error: Error) => {
            handleApiErrors(error)
          })
      })
      .catch( (error: Error) => {
        handleApiErrors(error)
      })
  }, [dispatch]);


  return (
    <div className={Styles.appContainer}>
      <AppHeader />
      <Main />
    </div>
  )
});


export default App;