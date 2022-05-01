import { compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose,
      enhancer = composeEnhancers(applyMiddleware(thunk));


export default composeEnhancers;