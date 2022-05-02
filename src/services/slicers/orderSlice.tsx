import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { 
  IngredientType,
  ReduxStore__Order
} from './../types/';



const orderSlice = createSlice({
  name: 'order',
  initialState: {
    totalAmount: 0
  } as ReduxStore__Order,
  reducers: {
    updateTotalAmount: (state, action: PayloadAction<number>) => {
      state.totalAmount = action.payload;
    },
  },
});


// Extract the action creators object and the reducer
const { actions, reducer } = orderSlice
// Extract and export each action creator by name
export const {
  updateTotalAmount
} = actions;
// Export the reducer, either as a default or named export
export default reducer