import React from 'react';


import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './BurgerConstructor/BurgerConstructor';

import {IngredientType} from './types';


import Styles from './main.module.scss';



const jsonData = require('./../../utils/data.json');



class Main extends React.Component<{}, { activeIngredients: Array<IngredientType>, ingredients: Array<IngredientType>, totalAmount: number }> {
  constructor(props: any){
    super(props);

    this.state = {
      activeIngredients: [],
      ingredients: [],
      totalAmount: 0
    }

    this.increaseCounter = this.increaseCounter.bind(this);
    this.updateActiveIngredients = this.updateActiveIngredients.bind(this);
  }


  componentDidMount(){
    this.setState({ ingredients: jsonData.BurgerIngredientsData })
    this.updateActiveIngredients();   
  }

  increaseCounter(itemId: string){
    let target__index : number = this.state.ingredients.findIndex( (ingredient: IngredientType) => ingredient._id === itemId),
        activeBun : boolean  = false;


    // Собираем в массив выбранные ингредиенты
    let updatedIngredientsArr : Array<IngredientType> = 
        this.state.ingredients.map( (ingredient: IngredientType, ingredient_index: number) => {
          if(
            ingredient_index !== target__index || 
            (ingredient.type === 'bun' && ingredient.__v === 1) || 
            (ingredient.type === 'sauce' && ingredient.__v >= 5)
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

    this.setState({
      ingredients: updatedIngredientsArr
    });
    
    this.updateActiveIngredients();
  }

  updateActiveIngredients(){
    let activeIngredients : Array<IngredientType> = [],
        totalAmount : number = 0;


    this.state.ingredients.forEach((ingredient: IngredientType) => {
      for(let i = 0; i < ingredient.__v; i++){
        activeIngredients.push(ingredient);
        
        totalAmount += ingredient.type === 'bun' ? ingredient.price * 2 : ingredient.price;
      }
    });

    this.setState({
      activeIngredients: activeIngredients,
      totalAmount: totalAmount
    });
  }


  render() {
    return (
      <main className={Styles.mainContainer}>
        <section className={Styles.mainContainer__title}>
          <span className={Styles.title__text}>
            Соберите бургер
          </span>
        </section>
        <section className={Styles.mainContainer__application}>
          <BurgerIngredients ingredients={this.state.ingredients} increaseCounterValue={this.increaseCounter}/>
          <BurgerConstructor activeIngredients={this.state.activeIngredients} totalAmount={this.state.totalAmount}/>
        </section>
      </main>
    )
  }
}

export default Main;