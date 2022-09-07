import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

// Components
import OrdersContainer from '../../components/Orders/OrdersContainer/OrdersContainer';
import StatsContainer from '../../components/Orders/StatsContainer/StatsContainer';

import { IReduxStore } from '../../services/types';

// Styles
import styles from './feed.module.scss';


const Feed: React.FC = () => {

  const orders = useSelector((store: IReduxStore) => store.app.feed.data, shallowEqual);


  return (
    <section className={styles.feedContainer}>
      <h1 className={styles.feedContainer__header}>
        Лента заказов
      </h1>
      <div className={styles.feedContainer__content}>
        <OrdersContainer 
          orders={ orders }
        />
        <StatsContainer />
      </div>
    </section>
  );
};

export default React.memo(Feed);