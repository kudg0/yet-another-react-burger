import React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';


import OrderItem from './../OrderItem/OrderItem';

import { IOrderType, IReduxStore } from './../../../services/types/';

import styles from './ordersContainer.module.scss';


interface IOrdersContainerProps {
    orders: IOrderType[]
}

const OrdersContainer: React.FC<IOrdersContainerProps> = ({
    orders,
}) => {

    return (
        <div className={ styles.OrdersContainer }>
            <ul className={ styles.OrdersContainer__scrollable }>
                {
                    orders.map((order) => {
                        return (
                            <li 
                                key={ order._id }
                                className={styles.OrdersContainer__item}
                            >
                                <OrderItem 
                                    order={order}
                                    isOrderModal={false} 
                                />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default React.memo(OrdersContainer);