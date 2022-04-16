import React from 'react';


import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './BurgerConstructor/BurgerConstructor';

import {IngredientType} from './../types/types';


import Styles from './main.module.scss';



const Main = React.memo((props: {
  ingredients: IngredientType[], 
  increaseCounterCallback: (updatedIngredientsArr: IngredientType[]) => void
}) => {
  const [activeIngredients, setActiveIngredients] = React.useState<IngredientType[]>([]);
  const [totalAmount, setTotalAmount] = React.useState<number>(0);


  React.useEffect( () => {
    updateActiveIngredients();
  }, [])


  const increaseCounter = React.useCallback((clickedIngredientId: string) => {
    let activeBun : boolean = false;

    // Собираем в массив выбранные ингредиенты
    let updatedIngredientsArr : IngredientType[] = 
        props.ingredients.map( (ingredient: IngredientType, ingredient_index: number) => {
          if(
            ingredient._id !== clickedIngredientId || 
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

    // Если уже есть активная булка, убираем ее
      if(activeBun){
        updatedIngredientsArr = updatedIngredientsArr.map((ingredient: IngredientType, ingredient_index: number) => {
          if(ingredient.type === 'bun' && ingredient._id !== clickedIngredientId){
            ingredient.__v = 0;

            return ingredient;
          }

          return ingredient;
        });
      }
    // END


    props.increaseCounterCallback(updatedIngredientsArr);

    updateActiveIngredients();
  }, [props.ingredients, activeIngredients]);


  const updateActiveIngredients = React.useCallback(() => {
    let activeIngredients : IngredientType[] = [],
        totalAmount : number = 0;


    props.ingredients.forEach( (ingredient: IngredientType) => {
      for(let i : number = 0; i < ingredient.__v; i++){
        activeIngredients.push(ingredient);
        
        totalAmount += ingredient.type === 'bun' ? (ingredient.price * 2) : ingredient.price;
      }
    });


    setTotalAmount(totalAmount);
    setActiveIngredients(activeIngredients);
  }, [props.ingredients, activeIngredients, totalAmount]);



  return (
    <main className={Styles.mainContainer}>
      <section className={Styles.mainContainer__title}>
        <h1 className={Styles.title__text}>
          Соберите бургер
        </h1>
      </section>
      <section className={Styles.mainContainer__application}>
        <BurgerIngredients 
          ingredients={props.ingredients} 
          increaseCounterCallback={increaseCounter}
        />
        <BurgerConstructor 
          activeIngredients={activeIngredients} 
          totalAmount={totalAmount}
        />
      </section>
    </main>
  )
});

export default Main;