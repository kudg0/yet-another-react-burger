import React, {useState, useEffect} from 'react';


import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './BurgerConstructor/BurgerConstructor';

import {IngredientType} from './types';


import Styles from './main.module.scss';



const jsonData = require('./../../utils/data.json');



const Main = () => {
  const [activeIngredients, setActiveIngredients] = React.useState<Array<IngredientType>>([]);
  const [ingredients, setIngredients] = React.useState<Array<IngredientType>>([]);
  const [totalAmount, setTotalAmount] = React.useState<number>(0);


  React.useEffect( () => {
    setIngredients( jsonData.BurgerIngredientsData );

    updateActiveIngredients();
  }, [])


  const increaseCounter = (itemId: string) => {
    let activeBun : boolean = false;


    // Собираем в массив выбранные ингредиенты
    let updatedIngredientsArr : Array<IngredientType> = 
        ingredients.map( (ingredient: IngredientType, ingredient_index: number) => {
          if(
            ingredient._id !== itemId || 
            (ingredient.type === 'bun' && ingredient.__v === 1) || 
            (ingredient.type === 'sauce' && ingredient.__v >= 5) || 
            ingredient.__v >= 10
          ){
            return ingredient;
          }
          if(ingredient.type === 'bun'){
            activeBun = true;
          }


          ingredient.__v = ingredient.__v + 1;
          
          return ingredient;
        });
    // END

    // Если уже есть активная булка, убираем ее и заменяем новой
      if(activeBun){
        updatedIngredientsArr = updatedIngredientsArr.map((ingredient: IngredientType, ingredient_index: number) => {
          if(ingredient.type === 'bun' && ingredient._id !== itemId){
            ingredient.__v = 0;

            return ingredient;
          }

          return ingredient;
        });
      }
    // END


    setIngredients( updatedIngredientsArr );

    updateActiveIngredients();
  }


  const updateActiveIngredients = () => {
    let activeIngredients : Array<IngredientType> = [],
        totalAmount : number = 0;


    ingredients.forEach( (ingredient: IngredientType) => {
      for(let i : number = 0; i < ingredient.__v; i++){
        activeIngredients.push(ingredient);
        
        totalAmount += ingredient.type === 'bun' ? (ingredient.price * 2) : ingredient.price;
      }
    });


    setActiveIngredients(activeIngredients);
    setTotalAmount(totalAmount);
  }



  return (
    <main className={Styles.mainContainer}>
      <section className={Styles.mainContainer__title}>
        <span className={Styles.title__text}>
          Соберите бургер
        </span>
      </section>
      <section className={Styles.mainContainer__application}>
        <BurgerIngredients 
          ingredients={ingredients} 
          increaseCounterValue={increaseCounter}
        />
        <BurgerConstructor 
          activeIngredients={activeIngredients} 
          totalAmount={totalAmount}
        />
      </section>
    </main>
  )
}

export default Main;