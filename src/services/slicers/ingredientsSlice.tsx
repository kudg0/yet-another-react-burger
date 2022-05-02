import { createSlice, PayloadAction } from '@reduxjs/toolkit';


import { 
  IngredientType, 
  ReduxStore__Ingredients
} from './../types/';



const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    data: [],
    request: {
      pending: false,
      success: false,
      failed: false
    }
  } as ReduxStore__Ingredients,
  reducers: {
    request: (state) => {
      state.request.pending = true
    },
    request_success: (state, action: PayloadAction<IngredientType[]>) => {
      state.request.pending = false;
      state.request.success = true;

      state.data = action.payload;
    },
    request_failed: (state) => {
      state.request.pending = false;
      state.request.failed = true;
    },
    increaseCounter: (state, action: PayloadAction<IngredientType>) => {
      state.data = [...state.data].map( (ingredient : IngredientType) => {
        // Если уже была выбрана булка, убираем ее из выбранных
        if(ingredient._id !== action.payload._id && action.payload.type === 'bun' && ingredient.type === 'bun') {
          ingredient.__v = 0;
        } 

        return ingredient._id !== action.payload._id ? 
          ingredient : ( (action.payload.type === 'bun' || action.payload.type === 'sauce') && action.payload.__v !== 0) ? 
          ingredient : (action.payload.type === 'main' && action.payload.__v > 14) ? 
          ingredient : { ...ingredient, __v: ++ingredient.__v};
      })
    },
    decreaseCounter: (state, action: PayloadAction<IngredientType>) => {
      state.data = [...state.data].map( (ingredient : IngredientType) => 
        ingredient._id !== action.payload._id ? 
        ingredient : action.payload.__v === 0 ? 
        ingredient : { ...ingredient, __v: --ingredient.__v}
      )
    }
  },
});


// Extract the action creators object and the reducer
const { actions, reducer } = ingredientsSlice
// Extract and export each action creator by name
export const {
  request,
  request_success,
  request_failed,
  increaseCounter,
  decreaseCounter 
} = actions;
// Export the reducer, either as a default or named export
export default reducer