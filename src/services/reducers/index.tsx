import { combineReducers } from '@reduxjs/toolkit';

import appReducer from './../slicers/appSlice';


export const rootReducer = combineReducers({
  app: appReducer
});

export type RootState = ReturnType<typeof rootReducer>