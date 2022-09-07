import React from 'react';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

// Components
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './BurgerConstructor/BurgerConstructor';

// Styles
import Styles from './main.module.scss';



const Main: React.FC = () => {
  
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
};

export default React.memo(Main);