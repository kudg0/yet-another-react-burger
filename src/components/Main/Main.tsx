import React from 'react';


import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './BurgerConstructor/BurgerConstructor';

import { IngredientType } from './../types/types';


import Styles from './main.module.scss';


import { OfferContext } from '../../services/offerContext';



const Main = React.memo(() => {
  const [activeIngredients, setActiveIngredients] = React.useState<IngredientType[]>([]);
  const [totalAmount, setTotalAmount] = React.useState<number>(0);
  
  
  return (
    <OfferContext.Provider value={{activeIngredients, setActiveIngredients, totalAmount, setTotalAmount}}>
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
    </OfferContext.Provider>
  )
});

export default Main;