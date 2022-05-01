import React from 'react';


import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './BurgerConstructor/BurgerConstructor';

import { IngredientType } from './../../services/types/';


import Styles from './main.module.scss';


import { OrderContext } from '../../services/orderContext';



const Main = React.memo(() => {
  const [activeIngredients, setActiveIngredients] = React.useState<IngredientType[]>([]);
  const [totalAmount, setTotalAmount] = React.useState<number>(0);
  
  
  return (
    <OrderContext.Provider value={{activeIngredients, setActiveIngredients, totalAmount, setTotalAmount}}>
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
    </OrderContext.Provider>
  )
});

export default Main;