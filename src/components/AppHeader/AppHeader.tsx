import React from 'react';

import Navigation from './Navigation/Navigation';
import Profile from './Profile/Profile';

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

import Styles from './appHeader.module.scss';



class AppHeader extends React.Component {
  render() {
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
  }
}

export default AppHeader;