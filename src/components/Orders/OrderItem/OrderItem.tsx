import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import LazyLoadPicture from './../../LazyLoad/';

import getFormattedDate from './helpers/getFormattedDate';

import { ILocationType, IOrderType } from './../../../services/types/';

import styles from './orderItem.module.scss';


const COUNT_INGREDIENTS_SHOW = 5;
const STATUS_TEXTS = {
    "created": 'Создан',
    "pending": 'Готовиться',
    "done": 'Готов',
}

interface OrderItemProps {
    order: IOrderType;
    isOrderModal: boolean;
    isOrderSelf?: boolean;
}
const OrderItem: React.FC<OrderItemProps> = ({
    order,
    isOrderModal,
    isOrderSelf,
}) => {

    const location = useLocation() as ILocationType;
    const navigate = useNavigate();

    const isOrderProfile = location.pathname.startsWith('/profile');


    const showOrderDetails : (e: React.MouseEvent<HTMLElement>) => void = React.useCallback((e) => {
        e.stopPropagation();

        const target__id = e.currentTarget!.getAttribute("data-id")!;

        navigate(isOrderProfile ? `/profile/orders/${target__id}` : `/feed/${target__id}`, { 
            state: { 
                from: location.pathname,
                backgroundLocation: location.pathname 
            },
        });
    }, [navigate, location.pathname, isOrderProfile]);


    const showIngredientDetails: (e: React.MouseEvent<HTMLElement>) => void = React.useCallback((e) => {
        e.stopPropagation();

        const target__id = e.currentTarget!.getAttribute("data-id")!;

        navigate(`/ingredients/${target__id}`, {
            state: {
                from: location.pathname,
                backgroundLocation: location.pathname
            },
        });
    }, [navigate, location.pathname]);


    return (
        <div 
            className={ cn(
                styles.OrderItem, 
                isOrderModal && styles.OrderItem_modal,
                isOrderSelf && styles.OrderItem_self,
            )}
            data-id={ order._id || 1 }
            data-order-status={ order.status }
            {...(!isOrderModal && {
                onClick: showOrderDetails
            })}
        >
            <div className={ styles.OrderItem__header }>
                <div className={ styles.header__id }>
                    #{ order.number }
                </div>
                {
                    !isOrderModal &&
                    <div className={ styles.header__date }>
                            {  getFormattedDate({ createdAt: order.createdAt })  } 
                    </div>
                }
            </div>
            <div className={ styles.OrderItem__main }>
                <div className={ styles.main__title }>
                    { order.name }
                </div>
                {
                    (isOrderModal || isOrderProfile) &&
                    <div className={ styles.main__status }>
                        {
                            STATUS_TEXTS[ order.status ]
                        }
                    </div>
                }
            </div>
            <div className={ styles.OrderItem__footer }>
                <div className={ styles.footer__ingredients }>
                    {
                        isOrderModal && 
                        <div className={ styles.ingredients__title }> 
                            Состав
                        </div>
                    }   
                    <ul 
                        className={ styles.ingredients__list } 
                    > 
                        {
                            order.ingredients.map((ingredient, ingredientIndex, ingredientArr) => {
                                if(!isOrderModal && (ingredientIndex + 1 > COUNT_INGREDIENTS_SHOW)) return null;

                                return (
                                    <li 
                                        key={ uuidv4() }
                                        className={ styles.list__item }
                                        {...(!isOrderModal && ingredientArr.length > COUNT_INGREDIENTS_SHOW &&
                                            (ingredientIndex + 1 === COUNT_INGREDIENTS_SHOW) && {
                                            "data-hide-count": `+${(ingredientArr.length - 1) - ingredientIndex }`
                                        })}
                                    >
                                        <div 
                                            data-id={ingredient._id}
                                            onClick={showIngredientDetails} 
                                            className={ styles.item__icon}
                                        >
                                            <LazyLoadPicture
                                                image={ingredient.image_mobile}
                                                width={64} height={64}
                                                alt={ingredient.name}
                                            />
                                        </div>
                                        {
                                            isOrderModal &&
                                            <>
                                                <span className={ styles.item__title }>
                                                    { ingredient.name }
                                                </span>
                                                <div className={ styles.item__price }>
                                                    <span className={ styles.price__text }>
                                                        {ingredient.price.toLocaleString()}
                                                    </span>
                                                    <div className={ styles.price__icon }>
                                                        <CurrencyIcon type="primary" />
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

                <div className={ styles.footer__info }>
                    {
                        isOrderModal &&
                        <div className={ styles.info__date }>
                            { getFormattedDate({ createdAt: order.createdAt }) } 
                        </div>
                    }
                
                    <div className={ styles.info__price }>
                        <span className={ styles.price__text }>
                            {order.totalAmount.toLocaleString()}
                        </span>
                        <div className={ styles.price__icon }>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default React.memo(OrderItem);