import React from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';


import { ReduxStore } from './../../services/types/';


import Orders from './../../pages/profile/orders';
import Edit from './../../pages/profile/edit';
import Logout from './../../pages/profile/logout';


import Styles from './profileContainer.module.scss';



const ProfileContainer = React.memo( () => {
  
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector( (store : ReduxStore) => store.user, shallowEqual);
  const { accessToken } = user.data;


  React.useEffect(() => {
    if(!accessToken) return navigate("/login");
  }, [accessToken, navigate]);


  return (
    <section className={Styles.profileContainer}>
      <div className={Styles.profileContainer__menu}>
        <ul className={Styles.menu__items}>
          <li className={Styles.items__item}>
            <Link 
              to='/profile' 
              className={
                Styles.item__link + ' ' + 
                (location.pathname === '/profile' ? Styles.item__link_active : '')
              }
            >
              Профиль
            </Link>
          </li>
          <li className={Styles.items__item}>
            <Link 
              to='/profile/orders' 
              className={
                Styles.item__link + ' ' + 
                (location.pathname === '/profile/orders' ? Styles.item__link_active : '')
              }
            >
              История заказов
            </Link>
          </li>
          <li className={Styles.items__item}>
            <Link 
              to='/profile/logout' 
              className={
                Styles.item__link
              }
            >
              Выход
            </Link>
          </li>
        </ul>
        <div className={Styles.menu__hint}>
          {
            location.pathname === '/profile' &&
            <span>
              В этом разделе вы можете<br/>
              изменить свои персональные данные
            </span>
          }
          {
            location.pathname === '/profile/orders' &&
            <span>
              В этом разделе вы можете<br/>
              просмотреть свою историю заказов
            </span>
          }
        </div>
      </div>
      <div className={Styles.profileContainer__content}>

        <Routes>
          <Route 
            path='/'
            element={<Edit />}
          />
          <Route 
            path='orders'
            element={<Orders />}
          />
          <Route 
            path='logout'
            element={<Logout />}
          />
        </Routes>
      </div>
    </section>
  );
});

export default ProfileContainer;