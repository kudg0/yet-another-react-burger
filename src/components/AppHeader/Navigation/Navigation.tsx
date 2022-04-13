import React from 'react';

import Styles from './navigation.module.scss';

import {BurgerIcon, ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';


class Navigation extends React.Component {
  render(){
    return (
      <nav className={Styles.navigationContainer}>
        <ul className={Styles.navigationContainer__nav}>
          <li className={Styles.nav__item + ' ' + Styles.active}>
            <div className={Styles.item__icon}>
              <BurgerIcon type="primary"/>
            </div>
            <span className={Styles.item__text}>
              Конструктор
            </span>
          </li>
          <li className={Styles.nav__item}>
            <div className={Styles.item__icon}>
              <ListIcon type="primary"/>
            </div>
            <span className={Styles.item__text}>
              Лента заказов
            </span>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navigation;