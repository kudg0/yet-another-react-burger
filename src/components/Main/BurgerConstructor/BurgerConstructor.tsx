import React from 'react';

import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { submitOrderEnhance } from './../../../services/enhances/submitOrderEnhance';

import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


import Modal from './../../Modals/Modal';
import OrderDetails from './../../Modals/OrderDetails/OrderDetails';


import { IngredientType, ReduxStore } from './../../../services/types/';


import checkApiResponse from './../../../services/utils/checkApiResponse';
import handleApiErrors from './../../../services/utils/handleApiErrors';

import Styles from './burgerConstructor.module.scss';



const BurgerConstructor = React.memo(() => {
  const dispatch = useDispatch();

  const { orderId, totalAmount, burger } = useSelector( (store : ReduxStore) => store.app.order, shallowEqual);

  const [openOrderDetails, setOpenOrderDetails] = React.useState<boolean>(false);
  const [orderDetails, setOrderDetails] = React.useState<{ id: number, name: string }>( {id: 0, name: ''} )



  React.useEffect(() => {
    if(!orderId || !burger.name) return;

    setOrderDetails({id: orderId, name: burger.name})
  }, [orderId, burger.name, setOrderDetails])


  const deleteIngredient : () => void = React.useCallback(() => {
    console.log(true);
  }, []);

  const showOrderDetails : (e: any) => void = React.useCallback((e) => {
    const target : HTMLElement = e.currentTarget!;
    
    target.style.pointerEvents = "none";


    const objForServer : {ingredients: string[]} = {
      ingredients: burger.ingredients.map( (activeIngredient : IngredientType) => activeIngredient._id)
    }

    dispatch( submitOrderEnhance( objForServer ) as any)
      .then( (response : Response) => {
        target.style.pointerEvents = "";

        setOpenOrderDetails(true);
      })
      .catch( (err : Error) => {
        target.style.pointerEvents = "";
      })
    
  }, [burger.ingredients, setOpenOrderDetails, dispatch]);

  const closeOrderDetails : () => void = React.useCallback(() => {
    setOpenOrderDetails(false);
  }, [setOpenOrderDetails]);



  return (
    <>
      <section className={Styles.burgerConstructorContainer}>
        <ul className={Styles.burgerConstructorContainer__header}>
          {
            burger.ingredients
              .filter( (activeIngredient: IngredientType) => activeIngredient.type === "bun")
              .map( (activeIngredient: IngredientType, activeIngredient__index: number) => {
                return (
                  <li key={activeIngredient._id + activeIngredient__index} className={Styles.header__item}>
                    <ConstructorElement
                      type="top"
                      isLocked={true}
                      text={`${activeIngredient.name} (верх)`}
                      price={activeIngredient.price}
                      thumbnail={activeIngredient.image_mobile}
                    />
                  </li>
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
                  <li key={activeIngredient._id + activeIngredient__index} className={Styles.main__item}>
                    <div className={Styles.item__control}>
                      <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                      text={activeIngredient.name}
                      price={activeIngredient.price}
                      thumbnail={activeIngredient.image_mobile}
                      handleClose={deleteIngredient}
                    />
                  </li>
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
                  <li key={activeIngredient._id + activeIngredient__index} className={Styles.footer__item}>
                    <ConstructorElement
                      type="bottom"
                      isLocked={true}
                      text={`${activeIngredient.name} (низ)`}
                      price={activeIngredient.price}
                      thumbnail={activeIngredient.image_mobile}
                    />
                  </li>
                )
              })
          }
        </ul>


        <div className={Styles.burgerConstructorContainer__total}>
          <div className={Styles.total__price}>
            <span>
              {totalAmount}
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
                Оформить заказ
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