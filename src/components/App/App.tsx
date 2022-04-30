import React from 'react';


import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';

import { IngredientType } from './../types/types';


import Styles from './app.module.scss';


import { ProductsContext } from '../../services/productsContext';



const apiUrl : string = "https://norma.nomoreparties.space/api/ingredients"!;
const templateData : {burgerIngredientsData: IngredientType[]} = require('./../../utils/data.json');


const App = React.memo(() => {
  const [ingredients, setIngredients] = React.useState<IngredientType[]>(templateData.burgerIngredientsData);

  
  React.useEffect( () => {
    fetch(apiUrl)
      .then(response => {
        response.json()
          .then( (result : {success: boolean, data: IngredientType[]}) => {
            if(!result.success) return Promise.reject(result);

            setIngredients(result.data);
          })
          .catch( (error: Error) => {
            console.log(error);
          })
      })
      .catch( (error: Error) => {
        console.log(error);
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