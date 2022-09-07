import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

// Components
import OrdersContainer from '../../Orders/OrdersContainer/OrdersContainer';

import { IReduxStore } from '../../../services/types';

import styles from './OrdersContent.module.scss'


const OrdersContent: React.FC = () => {

    const orders = useSelector((store: IReduxStore) => store.app.orders.data, shallowEqual);


    return (
        <div className={ styles.OrdersContent }>
          <OrdersContainer 
                orders={ orders }
          />
        </div>
    );
};

export default React.memo(OrdersContent);