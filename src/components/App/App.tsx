import React from 'react';


import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';

import { IngredientType } from './../types/types';


import checkApiResponse from './../utils/checkApiResponse';
import handleApiErrors from './../utils/handleApiErrors';

import Styles from './app.module.scss';


import { ProductsContext } from '../../services/productsContext';



const apiUrl : string = process.env.REACT_APP_API_BASE_URL + "/ingredients"!;

const templateData : {burgerIngredientsData: IngredientType[]} = require('./../../utils/data.json');


const App = React.memo(() => {
  const [ingredients, setIngredients] = React.useState<IngredientType[]>(templateData.burgerIngredientsData);

  
  React.useEffect( () => {
    fetch( apiUrl )
      .then(response => {
        checkApiResponse(response)
          .then( (result : {success: boolean, data: IngredientType[]}) => {
            if(!result.success) return Promise.reject(result);

            setIngredients(result.data);
          })
          .catch( (error: Error) => {
            handleApiErrors(error)
          })
      })
      .catch( (error: Error) => {
        handleApiErrors(error)
      })
  }, []);


  return (
    <ProductsContext.Provider value={{ingredients, setIngredients}}>
      <div className={Styles.appContainer}>
        <AppHeader />
        <Main />
      </div>
    </ProductsContext.Provider>
  )
});


export default App;