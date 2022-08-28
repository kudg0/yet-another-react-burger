import React from 'react';
import { Routes, Route, Link, useParams, useLocation, useNavigate } from 'react-router-dom';

// Components
import OrdersContent from './OrdersContent/OrdersContent';
import EditContent from './EditContent/EditContent';
import LogoutContent from './LogoutContent/LogoutContent';
import ProtectedRoute from './../../helpers/RoutingProvider/ProtectedRoute/ProtectedRoute';
import FeedOrderDetails from './../Modals/FeedOrderDetails/FeedOrderDetails';
import Modal from './../Modals/Modal';

// Types
import { ILocationType } from '../../services/types';

// Styles
import Styles from './profileContent.module.scss';


const ProfileContent: React.FC = () => {
  
  const location = useLocation() as ILocationType;
  const navigate = useNavigate()


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
                (location.pathname.includes('/profile/orders') ? Styles.item__link_active : '')
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
            location.pathname.includes('/profile/orders') &&
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
            element={<EditContent />}
          />

          <Route 
            path='orders'
            element={<OrdersContent />}
          />

          <Route 
            path='logout'
            element={<LogoutContent />}
          />
        </Routes>
      </div>
    </section>
  );
};

export default React.memo(ProfileContent);