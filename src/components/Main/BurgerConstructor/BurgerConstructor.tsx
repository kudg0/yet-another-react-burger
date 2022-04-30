import React from 'react';

import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


import Modal from './../../Modals/Modal';
import OrderDetails from './../../Modals/OrderDetails/OrderDetails';


import {IngredientType} from './../../types/types';


import Styles from './burgerConstructor.module.scss';


import { ActiveProductsContext } from '../../../services/productsContext';



const BurgerConstructor = React.memo(() => {
  const { activeIngredients } = React.useContext(ActiveProductsContext);

  const [totalAmount, setTotalAmount] = React.useState<number>(0);

  const [openOfferDetails, setOpenOfferDetails] = React.useState<boolean>(false);
  const [offerDetails, setOfferDetails] = React.useState<{ id: number, name: string }>( {id: 0, name: ''} )


  React.useEffect(() => {
    setTotalAmount(
      activeIngredients
        .reduce( (prevActiveIngredient, currentActiveIngredient ) => {
          if(currentActiveIngredient.type === "bun"){
            return (currentActiveIngredient.price * 2);
          }

          return currentActiveIngredient.price;
        }, 0)
    )
  }, [activeIngredients])

  const deleteIngredient : () => void = React.useCallback(() => {
    console.log(true);
  }, []);


  const showOfferDetails : () => void = React.useCallback(() => {
    const mapIdOfActiveIngredients : {ingredients: string[]} = {
      ingredients: activeIngredients.map(activeIngredient => activeIngredient._id)
    }

    fetch("https://norma.nomoreparties.space/api/orders", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mapIdOfActiveIngredients)
    })
      .then(response => {
        response.json()
          .then( (result : {success: boolean, name?: string, order?: {number: number}} ) => {
            if(!result.success || !result.order || !result.name) return Promise.reject(result);

            setOfferDetails({id: result.order.number, name: result.name});
            setOpenOfferDetails(true);
          })
          .catch( (error: Error) => {
            console.log(error);
          })
      })
      .catch( (error: Error) => {
        console.log(error);
      })
    
  }, [activeIngredients]);

  const closeOfferDetails : () => void = React.useCallback(() => {
    setOpenOfferDetails(false);
  }, []);



  return (
    totalAmount > 0 ?
    <>
      <section className={Styles.burgerConstructorContainer}>
        <ul className={Styles.burgerConstructorContainer__header}>
          {
            activeIngredients
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
            activeIngredients
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
            activeIngredients
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
          <div className={Styles.total__button}>
            <Button type="primary" size="medium" onClick={showOfferDetails}>
              Оформить заказ
            </Button>
          </div>
        </div>
      </section>

      <Modal shouldShow={openOfferDetails} closeModalCallback={closeOfferDetails}>
        <OrderDetails {...offerDetails}/>
      </Modal>
    </> : <></>
  )
});

export default BurgerConstructor;