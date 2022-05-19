import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';


import Styles from './appHeader.module.scss';



const AppHeader = React.memo(() => {

  const location = useLocation();


  return (
    <header className={Styles.headerContainer}>
      <nav className={Styles.navigationContainer}>
        <ul className={Styles.navigationContainer__nav}>
          <li 
            className={
              Styles.nav__item + ' ' + 
              (location.pathname === '/' ? Styles.active : '')
            }
          >
            <Link to='/' className={Styles.item__link}>
              <div className={Styles.link__icon}>
                <BurgerIcon type="primary"/>
              </div>
              <span className={Styles.link__text}>
                Конструктор
              </span>
            </Link>
          </li>
          <li 
            className={
              Styles.nav__item + ' ' + 
              (location.pathname === '/profile/orders' ? Styles.active : '')
            }
          >
            <Link to='/profile/orders' className={Styles.item__link}>
              <div className={Styles.link__icon}>
                <ListIcon type="primary"/>
              </div>
              <span className={Styles.link__text}>
                Лента заказов
              </span>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className={Styles.headerContainer__logo}>
        <a>
          <Logo />
        </a>
      </div>
      
      <div 
        className={
          Styles.profileContainer + ' ' + 
          (location.pathname === '/profile' ? Styles.active : '')
        }
      >
        <Link to='/profile' className={Styles.profileContainer__link} >
          <div className={Styles.link__icon}>
            <ProfileIcon type="primary"/>
          </div>
          <span className={Styles.link__text}>
            Личный кабинет
          </span>
        </Link>
      </div>
    </header>
  )
});

export default AppHeader;
