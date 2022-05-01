import React from 'react';
import { createRoot } from 'react-dom/client';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import composeEnhancers from './reduxDevToolsInit';


import App from './components/App/App';


import { rootReducers } from './services/reducers';

import './styles/index.scss';


const store = createStore(rootReducers, composeEnhancers());

const container = document.getElementById('root')!,
      root = createRoot(container);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);