import React from 'react';
import cn from 'classnames';
import { useSelector, shallowEqual } from 'react-redux';

import { IReduxStore } from '../../../services/types';

import styles from './statsContainer.module.scss';


const StatsContainer: React.FC = () => {

    const feedOrdersData = useSelector((store: IReduxStore) => store.app.feed, shallowEqual);
    const { data, total, totalToday } = feedOrdersData;

    const ordersReady = data.filter(order => order.status === 'done');
    const ordersInProgress = data.filter(order => order.status !== 'done');

    return ( 
        <section className={ styles.StatsContainer }>
            <div className={styles.StatsContainer__header}>
                <div className={cn(styles.header__order, styles.header__order_ready)}>
                    <span className={styles.order__title}>
                        Готовы:
                    </span>

                    <div className={styles.order__items}>
                        {
                            ordersReady.map(order => {
                                return (
                                    <span className={styles.items__item} key={order._id}>
                                        {order.number}
                                    </span>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={cn(styles.header__order, styles.header__order_inProgress)}>
                    <span className={styles.order__title}>
                        В работе:
                    </span>

                    <div className={styles.order__items}>
                        {
                            ordersInProgress.map(order => {
                                return (
                                    <span className={styles.items__item} key={order._id}>
                                        {order.number}
                                    </span>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={styles.StatsContainer__main}>
                <span className={styles.main__title}>
                    Выполнено за все время:
                </span>
                <span className={styles.main__subtitle}>
                    {total.toLocaleString()}
                </span>
            </div>
            <div className={styles.StatsContainer__main}>
                <span className={styles.main__title}>
                    Выполнено за сегодня:
                </span>
                <span className={styles.main__subtitle}>
                    {totalToday.toLocaleString()}
                </span>
            </div>
        </section>
    )
};

export default React.memo(StatsContainer);