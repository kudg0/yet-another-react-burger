import React from 'react';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';


import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './BurgerConstructor/BurgerConstructor';

import { IIngredientType } from './../../services/types/';


import Styles from './main.module.scss';



const Main: React.FunctionComponent = React.memo(() => {
  
  return (
    <main className={Styles.mainContainer}>
      <section className={Styles.mainContainer__title}>
        <h1 className={Styles.title__text}>
          Соберите бургер
        </h1>
      </section>
      <section className={Styles.mainContainer__application}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </section>
    </main>
  )
});

export default Main;