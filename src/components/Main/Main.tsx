import React from 'react';


import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './BurgerConstructor/BurgerConstructor';

import {IngredientType} from './../types/types';


import Styles from './main.module.scss';


import { ActiveProductsContext } from '../../services/productsContext';



const Main = React.memo(() => {
  const [activeIngredients, setActiveIngredients] = React.useState<IngredientType[]>([]);
  
  
  return (
    <ActiveProductsContext.Provider value={{activeIngredients, setActiveIngredients}}>
      <main className={Styles.mainContainer}>
        <section className={Styles.mainContainer__title}>
          <h1 className={Styles.title__text}>
            Соберите бургер
          </h1>
        </section>
        <section className={Styles.mainContainer__application}>
          <BurgerIngredients />
          <BurgerConstructor />
        </section>
      </main>
    </ActiveProductsContext.Provider>
  )
});

export default Main;