import { combineReducers } from '@reduxjs/toolkit';

import appReducer from './../slicers/appSlice';
import userReducer from './../slicers/userSlice';


export const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>