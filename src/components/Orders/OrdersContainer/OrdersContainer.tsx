import React from 'react';

import OrderItem from './../OrderItem/OrderItem';

import styles from './ordersContainer.module.scss';


const OrdersContainer: React.FC = () => {
    return (
        <div className={ styles.OrdersContainer }>
            <ul className={ styles.OrdersContainer__scrollable }>
                <li className={ styles.OrdersContainer__item }>
                    <OrderItem isOrderModal={ false }/>
                </li>
            </ul>
        </div>
    )
}

export default React.memo(OrdersContainer);