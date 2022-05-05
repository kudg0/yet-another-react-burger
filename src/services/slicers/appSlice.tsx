import { createSlice, PayloadAction } from '@reduxjs/toolkit';


import { 
  IngredientType, 
  ReduxStore__App
} from './../types/';



const appSlice = createSlice({
  name: 'ingredients',
  initialState: {
    ingredients: {
      data: [],
      request: {
        pending: false,
        success: false,
        failed: false
      }
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
    ingredients_request: (state) => {
      state.ingredients.request.pending = true
    },
    ingredients_request_success: (state, action: PayloadAction<IngredientType[]>) => {
      state.ingredients.request.pending = false;
      state.ingredients.request.success = true;

      state.ingredients.data = action.payload;
    },
    ingredients_request_failed: (state) => {
      state.ingredients.request.pending = false;
      state.ingredients.request.failed = true;
    },
    ingredients_increaseCounter: (state, action: PayloadAction<IngredientType>) => {
      state.ingredients.data = [...state.ingredients.data].map( (ingredient : IngredientType) => {
        // Если уже была выбрана булка, убираем ее из выбранных
        if(ingredient._id !== action.payload._id && action.payload.type === 'bun' && ingredient.type === 'bun') {
          ingredient.__v = 0;
        } 

        return ingredient._id !== action.payload._id ? 
          ingredient : ( (action.payload.type === 'bun' || action.payload.type === 'sauce') && action.payload.__v !== 0) ? 
          ingredient : (action.payload.type === 'main' && action.payload.__v > 9) ? 
          ingredient : { ...ingredient, __v: ++ingredient.__v};
      })

      state.order.burger.ingredients = [];
      state.ingredients.data
        .filter( (ingredient : IngredientType) => ingredient.__v > 0)
        .forEach( (ingredient: IngredientType) => {
          for(let i = 0; i < ingredient.__v; i++){
            state.order.burger.ingredients.push(ingredient)
          }
        });

      state.order.totalAmount = state.order.burger.ingredients
        .reduce((acc: number, ingredient : IngredientType) => 
          acc + (ingredient.price + (ingredient.type === 'bun' ? ingredient.price : 0))
        , 0)
    },
    ingredients_decreaseCounter: (state, action: PayloadAction<IngredientType>) => {
      state.ingredients.data = [...state.ingredients.data].map( (ingredient : IngredientType) => 
        ingredient._id !== action.payload._id ? 
        ingredient : action.payload.__v === 0 ? 
        ingredient : { ...ingredient, __v: --ingredient.__v}
      )

      state.order.burger.ingredients.splice(state.order.burger.ingredients.indexOf(action.payload), 1);
      state.order.totalAmount =  state.order.burger.ingredients.reduce((acc: number, ingredient : IngredientType) => acc + ingredient.price * ingredient.__v, 0)
    },
    ingredients_reset: (state) => {
      state.ingredients.data = [...state.ingredients.data].map( (ingredient : IngredientType) => {
        return { ...ingredient, __v: 0}
      })

      state.order.totalAmount =  0;
      state.order.burger.ingredients = [];
    },
    order_request: (state) => {
      state.order.request.pending = true
    },
    order_request_success: (state, action: PayloadAction<{orderId: number, name: string}>) => {
      state.order.request.pending = false;
      state.order.request.success = true;

      state.order.orderId = action.payload.orderId;
      state.order.burger.name = action.payload.name;
    },
    order_request_failed: (state) => {
      state.order.request.pending = false;
      state.order.request.failed = true;
    },
  },
});


// Extract the action creators object and the reducer
const { actions, reducer } = appSlice
// Extract and export each action creator by name
export const {
  ingredients_request,
  ingredients_request_success,
  ingredients_request_failed,
  ingredients_increaseCounter,
  ingredients_decreaseCounter,
  ingredients_reset,
  order_request,
  order_request_success,
  order_request_failed,
} = actions;
// Export the reducer, either as a default or named export
export default reducer