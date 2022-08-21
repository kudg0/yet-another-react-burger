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

    const ingredients = useSelector( (store : IReduxStore) => store.app.ingredients.data, shallowEqual);

    const [selectedOrder, setSelectedOrder] = React.useState<IOrderType | null>(null)
    const { id } = useParams<"id">();


    React.useEffect(() => {

      setSelectedOrder({
        _id: "31331",
      } as IOrderType );

    }, [ingredients, id]);


  return (
    selectedOrder &&
    <div className={ cn(
      styles.FeedOrderDetails, 
      !state?.backgroundLocation && styles.FeedOrderDetails_self
    )}> 
      <OrderItem isOrderModal={ true }/>
    </div>
  )
};

export default React.memo(FeedOrderDetails);