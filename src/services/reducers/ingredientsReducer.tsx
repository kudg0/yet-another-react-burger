import { 
  INGREDIENTS_SET, 
  INGREDIENT_INCREASE_COUNTER, 
  INGREDIENT_DECREASE_COUNTER 
} from '../actions/ingredientsActions';


import { IngredientType } from './../types/';



const templateData : {burgerIngredientsData: IngredientType[]} = require('./../utils/data.json');


const ingredientsReducer = (
  state : IngredientType[] = templateData.burgerIngredientsData, 
  action: {
    type: string,
    ingredients: IngredientType[],
    selectedIngredient: IngredientType
  }
) => {

  switch (action.type) {
    case INGREDIENTS_SET: {
      return action.ingredients;
    }
    case INGREDIENT_INCREASE_COUNTER: {
      return [...state].map( (ingredient : IngredientType) => {
        if(action.selectedIngredient.type === 'bun' && ingredient._id !== action.selectedIngredient._id) {
          ingredient.__v = 0;
        } 

        return ingredient._id !== action.selectedIngredient._id ? 
          ingredient : (action.selectedIngredient.type === 'bun' && action.selectedIngredient.__v !== 0) ? 
          ingredient : (action.selectedIngredient.type === 'sauce' && action.selectedIngredient.__v > 4) ? 
          ingredient : (action.selectedIngredient.type === 'main' && action.selectedIngredient.__v > 14) ? 
          ingredient : { ...ingredient, __v: ++ingredient.__v};
      })
    }
    case INGREDIENT_DECREASE_COUNTER: {
      return [...state].map( (ingredient : IngredientType) => 
        ingredient._id !== action.selectedIngredient._id ? 
        ingredient : action.selectedIngredient.__v === 0 ? 
        ingredient : { ...ingredient, __v: --ingredient.__v}
      )
    }
    default: {
      return state;
    }
  }
};

export default ingredientsReducer;