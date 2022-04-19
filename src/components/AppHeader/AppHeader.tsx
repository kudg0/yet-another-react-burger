import React from 'react';

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';


import Navigation from './Navigation/Navigation';
import Profile from './Profile/Profile';


import Styles from './appHeader.module.scss';



const AppHeader = React.memo(() => {

  return (
    <header className={Styles.headerContainer}>
      <Navigation />
      
      <div className={Styles.headerContainer__logo}>
        <a>
          <Logo />
        </a>
      </div>
      
      <Profile />
    </header>
  )
});

export default AppHeader;