import React from 'react';

import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';

import Styles from './app.module.scss'

import Lazyload from './../utils/lazyLoad.js';



class App extends React.Component {
  render() {
    return (
      <div className={Styles.appContainer}>
        <AppHeader />
        <Main />
      </div>
    )
  }
};


export default App;