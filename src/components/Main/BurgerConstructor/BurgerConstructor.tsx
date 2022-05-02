import React from 'react';

import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { updateTotalAmount } from './../../../services/slicers/orderSlice';


import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


import Modal from './../../Modals/Modal';
import OrderDetails from './../../Modals/OrderDetails/OrderDetails';


import { IngredientType, ReduxStore } from './../../../services/types/';


import checkApiResponse from './../../../services/utils/checkApiResponse';
import handleApiErrors from './../../../services/utils/handleApiErrors';

import Styles from './burgerConstructor.module.scss';



const apiUrl : string = process.env.REACT_APP_API_BASE_URL + "/orders"!;


const BurgerConstructor = React.memo(() => {
  const dispatch = useDispatch();

  const { totalAmount } = useSelector( (store : ReduxStore) => store.order);
  const ingredients = useSelector( (store : ReduxStore) => store.ingredients).data;

  const [ activeIngredients, setActiveIngredients ] = React.useState<IngredientType[]>([]);

  const [openOfferDetails, setOpenOfferDetails] = React.useState<boolean>(false);
  const [offerDetails, setOfferDetails] = React.useState<{ id: number, name: string }>( {id: 0, name: ''} )



  React.useEffect(() => {
    let tempActiveIngredients : IngredientType[] = [];

    ingredients
      .filter( (ingredient : IngredientType) => ingredient.__v > 0)
      .forEach( (ingredient: IngredientType) => {
        for(let i = 0; i < ingredient.__v; i++){
          tempActiveIngredients.push(ingredient)
        }
      });

    setActiveIngredients( tempActiveIngredients )
  }, [setActiveIngredients, ingredients])

  React.useEffect(() => {
    dispatch(
      updateTotalAmount(
        activeIngredients.reduce((prevAmount: number, ingredient: IngredientType) => {
          if(ingredient.type === 'bun') return prevAmount + (ingredient.price * ingredient.__v) * 2;

          return prevAmount + ingredient.price * ingredient.__v;
        }, 0)
      )
    )
  }, [dispatch, activeIngredients])


  const deleteIngredient : () => void = React.useCallback(() => {
    console.log(true);
  }, []);


  const showOfferDetails : (e: any) => void = React.useCallback((e) => {
    const target : HTMLElement = e.currentTarget!;
    
    target.style.pointerEvents = "none";


    const objForServer : {ingredients: string[]} = {
      ingredients: activeIngredients.map( (activeIngredient : IngredientType) => activeIngredient._id)
    }

    fetch(apiUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(objForServer)
    })
      .then( response => {
        checkApiResponse(response)
          .then( (result : {success: boolean, name?: string, order?: {number: number}} ) => {
            if(!result.success || !result.order || !result.name) return Promise.reject(result);

            setOfferDetails({id: result.order.number, name: result.name});
            setOpenOfferDetails(true);

            target.style.pointerEvents = "";
          })
          .catch( (error : Error) => {
            handleApiErrors(error, () => {target.style.pointerEvents = "";})
          })
      })
      .catch( (error: Error) => {
        handleApiErrors(error, () => {target.style.pointerEvents = "";})
      })
    
  }, [activeIngredients, setOfferDetails, setOpenOfferDetails]);

  const closeOfferDetails : () => void = React.useCallback(() => {
    setOpenOfferDetails(false);
  }, [setOpenOfferDetails]);



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
          {
            (
              activeIngredients.filter( (activeIngredient : IngredientType) => activeIngredient.type === "bun").length > 0 &&
              activeIngredients.filter( (activeIngredient : IngredientType) => activeIngredient.type === "main").length > 0
            ) ?
            <div className={Styles.total__button}>
              <Button type="primary" size="medium" onClick={showOfferDetails}>
                Оформить заказ
              </Button>
            </div>
            : 
            <div className={Styles.total__button + " " + Styles.total__button_disabled} >
              <Button type="primary" size="medium">
                {
                  (activeIngredients.filter( (activeIngredient : IngredientType) => activeIngredient.type === "bun").length > 0) ? 
                  "Осталось выбрать начинку 🥓" : activeIngredients.filter( (activeIngredient : IngredientType) => activeIngredient.type === "main").length > 0 ? 
                  "Осталось выбрать булку 🥯" : "Выберите булку и начинку 🍔"
                }
              </Button>
            </div>
          }
        </div>
      </section>

      <Modal shouldShow={openOfferDetails} closeModalCallback={closeOfferDetails}>
        <OrderDetails {...offerDetails}/>
      </Modal>
    </> : <></>
  )
});

export default BurgerConstructor;