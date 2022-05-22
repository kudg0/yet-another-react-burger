import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

import { v4 as uuidv4 } from 'uuid';


import { 
  ReduxStore__User
} from './../types/';



const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {},
    request: {
      pending: false,
      success: false,
      failed: false,
    }
  } as ReduxStore__User,
  reducers: {
    loginRequest: (state) => {
      state.request.pending = true;
      state.request.failed = false;
      state.request.success = false;
    },
    loginRequestSuccess: (state, action: PayloadAction<{accessToken?: string, refreshToken?: string, email: string, name: string}>) => {
      state.data = {
        id: uuidv4(),
        name: action.payload.name,
        email: action.payload.email,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      }
      state.request = {
        pending: false,
        success: true,
        failed: false
      }
    },
    loginRequestFailed: (state) => {
      state.request.pending = false;
      state.request.failed = true;
      state.request.success = false;
    },

    registerRequest: (state) => {
      state.request.pending = true;
      state.request.failed = false;
      state.request.success = false;
    },
    registerRequestSuccess: (state, action: PayloadAction<{accessToken: string, refreshToken: string, email: string, name: string}>) => {
      state.data = {
        id: uuidv4(),
        name: action.payload.name,
        email: action.payload.email,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      }
      state.request ={
        pending: false,
        success: true,
        failed: false
      }
    },
    registerRequestFailed: (state) => {
      state.request.pending = false;
      state.request.failed = true;
      state.request.success = false;
    },

    changeUserDataRequest: (state) => {
      state.request.pending = true;
      state.request.failed = false;
      state.request.success = false;
    },
    changeUserDataRequestSuccess: (state, action: PayloadAction<{email: string, name: string}>) => {
      state.data = {
        ...state.data,
        name: action.payload.name,
        email: action.payload.email,
      }

      state.request = {
        pending: false,
        success: true,
        failed: false
      }
    },
    changeUserDataRequestFailed: (state) => {
      state.request.pending = false;
      state.request.failed = true;
      state.request.success = false;
    },

    logoutRequest: (state) => {
      state.request.pending = true;
      state.request.failed = false;
      state.request.success = false;
    },
    logoutRequestSuccess: (state) => {
      state.data = {};
      
      state.request = {
        pending: false,
        success: false,
        failed: false
      }
    },
    logoutRequestFailed: (state) => {
      state.request.pending = false;
      state.request.failed = true;
      state.request.success = false;
    },
  },
});


// Extract the action creators object and the reducer
const { actions, reducer } = userSlice
// Extract and export each action creator by name
export const {
  loginRequest,
  loginRequestSuccess,
  loginRequestFailed,
  registerRequest,
  registerRequestSuccess,
  registerRequestFailed,
  changeUserDataRequest,
  changeUserDataRequestSuccess,
  changeUserDataRequestFailed,
  logoutRequest,
  logoutRequestSuccess,
  logoutRequestFailed,
} = actions;
// Export the reducer, either as a default or named export
export default reducer