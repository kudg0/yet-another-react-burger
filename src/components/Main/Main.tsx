import React from 'react';


import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './BurgerConstructor/BurgerConstructor';

import { IngredientType } from './../../services/types/';


import Styles from './main.module.scss';



const Main = React.memo(() => {
  
  return (
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
  )
});

export default Main;