import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useDrop } from 'react-dnd';

// Redux
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { ingredientsIncreaseCounter } from './../../../services/redux/slicers/appSlice';

import { submitOrderEnhance } from './../../../services/redux/enhances/';

// Ya imports
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Components
import DraggableConstructorElement from './DraggableConstructorElement';
import Modal from './../../Modals/Modal';
import OrderDetails from './../../Modals/OrderDetails/OrderDetails';

// Types
import { ILocationType, IIngredientType, IReduxStore } from './../../../services/types/';

// Styles
import Styles from './burgerConstructor.module.scss';

const BurgerConstructor: React.FC = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation() as ILocationType;

  const ingredients = useSelector( (store : IReduxStore) => store.app.ingredients, shallowEqual);
  const { orderId, totalAmount, burger, request } = useSelector( (store : IReduxStore) => store.app.order, shallowEqual);
  const { accessToken } = useSelector( (store : IReduxStore) => store.user.data, shallowEqual);

  const [openOrderDetails, setOpenOrderDetails] = React.useState<boolean>(false);
  const [orderDetails, setOrderDetails] = React.useState<{ id: number, name: string }>( {id: 0, name: ''} )


  const [, dropTarget] = useDrop({
      accept: "ingredient",
      drop(item : {id: string}) {
        handleIncreaseCounter( item.id )
      },
  });


  React.useEffect(() => {
    if(!orderId || !burger.name) return;

    setOrderDetails({id: orderId, name: burger.name})
  }, [orderId, burger.name, setOrderDetails])



  const handleIncreaseCounter = React.useCallback(( ingredientId : string ) => {
    const selectedIngredient : IIngredientType = ingredients.data
      .filter( (ingredient : IIngredientType) => ingredient._id === ingredientId ).shift()!;


    dispatch(ingredientsIncreaseCounter(selectedIngredient))
  }, [ingredients.data, dispatch]);


  const showOrderDetails : (e: any) => void = React.useCallback((e) => {
    if(!accessToken) return navigate('/login', {state: {from: {pathname: location.pathname}}});
    
    const target : HTMLElement = e.currentTarget!;

    const objForServer : {ingredients: string[]} = {
      ingredients: burger.ingredients.map( (activeIngredient : IIngredientType) => activeIngredient._id)
    }

    dispatch( submitOrderEnhance( objForServer ) as any)
      .then( (response : Response) => {
        setOpenOrderDetails(true);
      })
    
  }, [burger.ingredients, setOpenOrderDetails, dispatch, accessToken, location.pathname, navigate]);

  const closeOrderDetails : () => void = React.useCallback(() => {
    setOpenOrderDetails(false);
  }, [setOpenOrderDetails]);



  return (
    
    <>
      <section className={Styles.burgerConstructorContainer} ref={dropTarget}>
        <ul className={Styles.burgerConstructorContainer__header}>
          {
            burger.ingredients
              .filter( (activeIngredient: IIngredientType) => activeIngredient.type === "bun")
              .map( (activeIngredient: IIngredientType, activeIngredient__index: number) => {
                return (
                  <DraggableConstructorElement 
                    key={activeIngredient.uuid} 
                    className={Styles.header__item}
                    ingredient={activeIngredient} 
                    ingredientIndex={activeIngredient__index}
                    type="top"
                  />
                )
              })
          }
        </ul>

        <ul className={Styles.burgerConstructorContainer__main}>
          {
            burger.ingredients
              .filter( (activeIngredient: IIngredientType) => activeIngredient.type !== "bun")
              .map( (activeIngredient: IIngredientType, activeIngredient__index: number) => {
                return (
                  <DraggableConstructorElement 
                    key={activeIngredient.uuid} 
                    className={Styles.main__item}
                    ingredient={activeIngredient} 
                    ingredientIndex={activeIngredient__index}
                  />
                )
              })
          }
        </ul>

        <ul className={Styles.burgerConstructorContainer__footer}>
          {
            burger.ingredients
              .filter( (activeIngredient: IIngredientType) => activeIngredient.type === "bun")
              .map( (activeIngredient: IIngredientType, activeIngredient__index: number) => {
                return (
                  <DraggableConstructorElement 
                    key={activeIngredient.uuid} 
                    className={Styles.footer__item}
                    ingredient={activeIngredient} 
                    ingredientIndex={activeIngredient__index}
                    type="bottom"
                  />
                )
              })
          }
        </ul>


        <div className={Styles.burgerConstructorContainer__total} style={{pointerEvents: request.pending ? "none" : 'auto'}}>
          <div className={Styles.total__price}>
            <span>
              {totalAmount.toLocaleString()}
            </span>
            <div className={Styles.total__icon}>
              <CurrencyIcon type="primary" />
            </div>
          </div>
          {
            (
              burger.ingredients.filter( (activeIngredient : IIngredientType) => activeIngredient.type === "bun").length > 0 &&
              burger.ingredients.filter( (activeIngredient : IIngredientType) => activeIngredient.type === "main").length > 0
            ) ?
            <div className={Styles.total__button}>
              <Button type="primary" size="medium" onClick={showOrderDetails}>
                {
                  request.pending ? <>Оформляем заказ...</> : <>Оформить заказ</>
                }
              </Button>
            </div>
            : 
            <div className={Styles.total__button + " " + Styles.total__button_disabled} >
              <Button type="primary" size="medium">
                {
                  (burger.ingredients.filter( (activeIngredient : IIngredientType) => activeIngredient.type === "bun").length > 0) ? 
                  "Осталось выбрать начинку 🥓" : burger.ingredients.filter( (activeIngredient : IIngredientType) => activeIngredient.type === "main").length > 0 ? 
                  "Осталось выбрать булку 🥯" : "Выберите булку и начинку 🍔"
                }
              </Button>
            </div>
          }
        </div>
      </section>
      
      {
        openOrderDetails &&
        <Modal closeModalCallback={closeOrderDetails}>
          <OrderDetails {...orderDetails}/>
        </Modal>
      }
    </>
  )
};

export default React.memo(BurgerConstructor);