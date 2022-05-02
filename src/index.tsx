import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';

import { store } from './reduxDevToolsInit';


import App from './components/App/App';




import './styles/index.scss';


const container = document.getElementById('root')!,
      root = createRoot(container);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);