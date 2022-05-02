import { combineReducers } from '@reduxjs/toolkit';

import ingredientsReducer from './../slicers/ingredientsSlice';
import orderReducer from './../slicers/orderSlice';


export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer
});

export type RootState = ReturnType<typeof rootReducer>