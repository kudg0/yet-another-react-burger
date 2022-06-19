import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';


import { ILocationType, IReduxStore } from './../../services/types/';


import Styles from './appHeader.module.scss';



const AppHeader: React.FunctionComponent = React.memo(() => {

  const location = useLocation() as ILocationType;
  const user = useSelector( (store : IReduxStore) => store.user, shallowEqual);
  
  const { request } = user;
  const { accessToken } = user.data;


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
            <Link 
              to='/' 
              state={ {from: {pathname: location.pathname }} }
              className={Styles.item__link}
            >
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
              (location.pathname === '/feed' ? Styles.active : '')
            }
          >
            <Link 
              to='/feed' 
              state={ {from: {pathname: location.pathname }} }
              className={Styles.item__link}
            >
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
        <Link 
          to='/'
          state={ {from: {pathname: location.pathname }} }
        >
          <Logo />
        </Link>
      </div>
      
      <div 
        className={
          Styles.profileContainer + ' ' + 
          ((location.pathname.includes('/profile') || location.pathname === '/login') ? Styles.active : '')
        }
      >
        <Link 
          to={ accessToken ? '/profile' : '/login' } 
          className={Styles.profileContainer__link}
        >
          <div className={Styles.link__icon}>
            <ProfileIcon type="primary"/>
          </div>
          <span className={Styles.link__text}>
            {
              accessToken ? "Личный кабинет" : "Войти в аккаунт"
            }
          </span>
        </Link>
      </div>
    </header>
  )
});

export default AppHeader;
