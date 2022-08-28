import React from 'react';
import cn from 'classnames';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

// Components
import OrderItem from '../../Orders/OrderItem/OrderItem';

// Types
import { IOrderType, ILocationType, IReduxStore } from '../../../services/types';

// Styles
import styles from './feedOrderDetails.module.scss';


const FeedOrderDetails: React.FC = () => {

    const location = useLocation() as ILocationType;

    const state = location.state;
    const stateSelf = !state?.backgroundLocation;

    const feedOrders = useSelector( (store : IReduxStore) => store.app.feed.data, shallowEqual);
    const userOrders = useSelector( (store : IReduxStore) => store.app.orders.data, shallowEqual);

    const [selectedOrder, setSelectedOrder] = React.useState<IOrderType | null>(null)
    const { id } = useParams<"id">();


    React.useEffect(() => {
      if (!feedOrders || !userOrders) return;
      const neededOrder = feedOrders.find(order => order._id === id) || userOrders.find(order => order._id === id);

      if (!neededOrder) return;

      setSelectedOrder({
        ...neededOrder
      });

    }, [feedOrders, userOrders, id]);


  return (
    selectedOrder &&
    <div className={ cn(
      styles.FeedOrderDetails, 
      stateSelf && styles.FeedOrderDetails_self
    )}> 
      <OrderItem 
        order={ selectedOrder }
        isOrderModal={ true }
        isOrderSelf={ stateSelf }
      />
    </div>
  )
};

export default React.memo(FeedOrderDetails);