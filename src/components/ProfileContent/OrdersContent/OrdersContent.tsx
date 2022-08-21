import React from 'react';

// Components
import OrdersContainer from '../../Orders/OrdersContainer/OrdersContainer';

import styles from './OrdersContent.module.scss'


const OrdersContent: React.FC = () => {
  return (
    <div className={ styles.OrdersContent }>
      <OrdersContainer />
    </div>
  );
};

export default React.memo(OrdersContent);