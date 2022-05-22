import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

import { v4 as uuidv4 } from 'uuid';


import { 
  IngredientType, 
  ReduxStore__App
} from './../types/';



const appSlice = createSlice({
  name: 'app',
  initialState: {
    ingredients: {
      data: [],
      request: {
        pending: false,
        success: false,
        failed: false
      }
    },
    clickedIngredient: {
      isShow: false,
    },
    order: {
      orderId: null,
      totalAmount: 0,
      burger: {
        name: null,
        ingredients: []
      },
      request: {
        pending: false,
        success: false,
        failed: false
      }
    }
  } as ReduxStore__App,
  reducers: {
    ingredientsRequest: (state) => {
      state.ingredients.request = {
        pending: true,
        success: false,
        failed: false,
      }
    },
    ingredientsRequestSuccess: (state, action: PayloadAction<IngredientType[]>) => {
      state.ingredients.data = action.payload;

      state.ingredients.request = {
        pending: false,
        success: true,
        failed: false,
      }
    },
    ingredientsRequestFailed: (state) => {
      state.ingredients.request = {
        pending: false,
        success: false,
        failed: true,
      }
    },

    ingredientsIncreaseCounter: (state, action: PayloadAction<IngredientType>) => {
      state.ingredients.data = [...state.ingredients.data].map( (ingredient : IngredientType) => {
        // Если уже была выбрана булка, убираем ее из выбранных
        if(ingredient._id !== action.payload._id && action.payload.type === 'bun' && ingredient.type === 'bun') {
          ingredient.__v = 0;
        } 

        return ingredient._id !== action.payload._id ? 
          ingredient : ( action.payload.type === 'bun' && action.payload.__v !== 0) ? 
          ingredient : ( (action.payload.type === 'main' || action.payload.type === 'sauce') && action.payload.__v > 9) ? 
          ingredient : { ...ingredient, __v: ++ingredient.__v};
      })

      state.order.burger.ingredients = [...state.order.burger.ingredients]
        .filter( (ingredient : IngredientType) => action.payload.type === 'bun' ? ingredient.type !== 'bun' : true);

      state.order.burger.ingredients.push({...action.payload, uuid: uuidv4(), __v: action.payload.__v + 1})

      
      state.order.totalAmount = [...state.order.burger.ingredients]
        .reduce((acc: number, ingredient : IngredientType) => 
          acc + (ingredient.price + (ingredient.type === 'bun' ? ingredient.price : 0))
        , 0)
    },
    ingredientsDecreaseCounter: (state, action: PayloadAction<IngredientType>) => {
      state.ingredients.data = [...state.ingredients.data].map( (ingredient : IngredientType) => 
        ingredient._id !== action.payload._id ? 
        ingredient : action.payload.__v === 0 ? 
        ingredient : { ...ingredient, __v: --ingredient.__v}
      )

      state.order.burger.ingredients = [...state.order.burger.ingredients].map( (ingredient : IngredientType) => 
        ingredient._id !== action.payload._id ? 
        ingredient : action.payload.__v === 0 ? 
        ingredient : { ...ingredient, __v: --ingredient.__v}
      ).filter( (ingredient : IngredientType) => ingredient.__v !== 0);


      state.order.totalAmount = [...state.order.burger.ingredients]
        .reduce((acc: number, ingredient : IngredientType) => 
          acc + (ingredient.price + (ingredient.type === 'bun' ? ingredient.price : 0))
        , 0)
    },
    ingredientsReset: (state) => {
      state.ingredients.data = [...state.ingredients.data].map( (ingredient : IngredientType) => {
        return { ...ingredient, __v: 0}
      })

      state.order = {
        ...state.order,
        totalAmount:  0,
        burger: {
          ...state.order.burger,
          ingredients: []
        }
      }
    },
    ingredientUpdatePos: (state, action: PayloadAction<{currentItem: IngredientType, currentItemIndex: number, toNeededItemIndex: number}>) => {
      let ingredientsWithoutBun = [...state.order.burger.ingredients]
        .filter( (activeIngredient: IngredientType) => activeIngredient.type !== "bun");
      
      ingredientsWithoutBun.splice(
        action.payload.toNeededItemIndex < action.payload.currentItemIndex ? action.payload.toNeededItemIndex : action.payload.toNeededItemIndex + 1, 
        0, action.payload.currentItem);
      
      ingredientsWithoutBun.splice(
        action.payload.toNeededItemIndex < action.payload.currentItemIndex ? 
        action.payload.currentItemIndex + 1 : action.payload.currentItemIndex, 1);


      state.order.burger.ingredients = [
        ...[...state.order.burger.ingredients].filter( (activeIngredient: IngredientType) => activeIngredient.type === "bun"), 
        ...ingredientsWithoutBun
      ];
    },

    setClickedIngredient: (state, action: PayloadAction<{data: IngredientType}>) => {
      state.clickedIngredient = {
        isShow: true,
        data: action.payload.data
      }
    },
    removeClickedIngredient: (state) => {
      state.clickedIngredient = {
        isShow: false
      }
    },
    orderRequest: (state) => {
      state.order.request = {
        pending: true,
        success: false,
        failed: false,
      }
    },
    orderRequestSuccess: (state, action: PayloadAction<{orderId: number, name: string}>) => {
      state.order = {
        ...state.order,
        orderId: action.payload.orderId,
        burger: {
          ...state.order.burger,
          name: action.payload.name,
        }
      }

      state.order.request = {
        pending: false,
        success: true,
        failed: false,
      }
    },
    orderRequestFailed: (state) => {
      state.order.request = {
        pending: false,
        success: false,
        failed: true,
      }
    },
  },
});


// Extract the action creators object and the reducer
const { actions, reducer } = appSlice
// Extract and export each action creator by name
export const {
  ingredientsRequest,
  ingredientsRequestSuccess,
  ingredientsRequestFailed,
  ingredientsIncreaseCounter,
  ingredientsDecreaseCounter,
  ingredientsReset,
  ingredientUpdatePos,
  setClickedIngredient,
  removeClickedIngredient,
  orderRequest,
  orderRequestSuccess,
  orderRequestFailed,
} = actions;
// Export the reducer, either as a default or named export
export default reducer