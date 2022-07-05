import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';


import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './services/redux/store';


import RoutingProvider from './components/RouterProviders/'


import './styles/index.scss';



const container = document.getElementById('root')!,
      root = createRoot(container);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <RoutingProvider />
      </Router>
    </Provider>
  </React.StrictMode>
);