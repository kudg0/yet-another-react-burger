import React from 'react';

// Components
import OrdersContainer from '../../components/Orders/OrdersContainer/OrdersContainer';
import StatsContainer from '../../components/Orders/StatsContainer/StatsContainer';

// Styles
import styles from './feed.module.scss';


const Feed: React.FC = () => {

  return (
    <section className={styles.feedContainer}>
      <h1 className={styles.feedContainer__header}>
        Лента заказов
      </h1>
      <div className={styles.feedContainer__content}>
        <OrdersContainer />
        <StatsContainer />
      </div>
    </section>
  );
};

export default React.memo(Feed);