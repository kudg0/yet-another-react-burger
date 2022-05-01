import { combineReducers } from 'redux';

import ingredientsReducer from './ingredientsReducer';


export const rootReducers = combineReducers({
  ingredients: ingredientsReducer
});