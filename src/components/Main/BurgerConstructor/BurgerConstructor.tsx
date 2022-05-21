import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';

import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { ingredientsIncreaseCounter } from './../../../services/slicers/appSlice';
import { submitOrderEnhance } from './../../../services/enhances/submitOrderEnhance';


import { useDrop } from 'react-dnd';


import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


import DraggableConstructorElement from './DraggableConstructorElement';
import Modal from './../../Modals/Modal';
import OrderDetails from './../../Modals/OrderDetails/OrderDetails';


import { LocationType, IngredientType, ReduxStore } from './../../../services/types/';


import checkApiResponse from './../../../services/utils/checkApiResponse';
import handleApiErrors from './../../../services/utils/handleApiErrors';


import Styles from './burgerConstructor.module.scss';



const BurgerConstructor = React.memo(() => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation() as LocationType;

  const ingredients = useSelector( (store : ReduxStore) => store.app.ingredients, shallowEqual);
  const { orderId, totalAmount, burger, request } = useSelector( (store : ReduxStore) => store.app.order, shallowEqual);
  const { accessToken } = useSelector( (store : ReduxStore) => store.app.user, shallowEqual);

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
    const selectedIngredient : IngredientType = ingredients.data
      .filter( (ingredient : IngredientType) => ingredient._id === ingredientId ).shift()!;


    dispatch(ingredientsIncreaseCounter(selectedIngredient))
  }, [ingredients.data, dispatch]);


  const showOrderDetails : (e: any) => void = React.useCallback((e) => {
    if(!accessToken) return navigate('/login', {state: {from: {pathname: location.pathname}}});
    
    const target : HTMLElement = e.currentTarget!;

    const objForServer : {ingredients: string[]} = {
      ingredients: burger.ingredients.map( (activeIngredient : IngredientType) => activeIngredient._id)
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
              .filter( (activeIngredient: IngredientType) => activeIngredient.type === "bun")
              .map( (activeIngredient: IngredientType, activeIngredient__index: number) => {
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
              .filter( (activeIngredient: IngredientType) => activeIngredient.type !== "bun")
              .map( (activeIngredient: IngredientType, activeIngredient__index: number) => {
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
              .filter( (activeIngredient: IngredientType) => activeIngredient.type === "bun")
              .map( (activeIngredient: IngredientType, activeIngredient__index: number) => {
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
              burger.ingredients.filter( (activeIngredient : IngredientType) => activeIngredient.type === "bun").length > 0 &&
              burger.ingredients.filter( (activeIngredient : IngredientType) => activeIngredient.type === "main").length > 0
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
                  (burger.ingredients.filter( (activeIngredient : IngredientType) => activeIngredient.type === "bun").length > 0) ? 
                  "Осталось выбрать начинку 🥓" : burger.ingredients.filter( (activeIngredient : IngredientType) => activeIngredient.type === "main").length > 0 ? 
                  "Осталось выбрать булку 🥯" : "Выберите булку и начинку 🍔"
                }
              </Button>
            </div>
          }
        </div>
      </section>

      <Modal shouldShow={openOrderDetails} closeModalCallback={closeOrderDetails}>
        <OrderDetails {...orderDetails}/>
      </Modal>
    </>
  )
});

export default BurgerConstructor;