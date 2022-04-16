import React from 'react';

import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


import OfferInfo from './../../Modals/OfferInfo';

import {IngredientType} from './../types.jsx';


import Styles from './burgerConstructor.module.scss';



const modal__offerInfo = OfferInfo();


const BurgerConstructor = (props: {activeIngredients: Array<IngredientType>, totalAmount: number}) => {
  const [openOfferInfo, setOpenOfferInfo] = React.useState<boolean>(false);
  
  const deleteIngredient = () => {
    setOpenOfferInfo(!openOfferInfo);
  }



  // Если ничего не выбрали, возвращаем пустой компонент
  if(props.totalAmount <= 0){
    return (<></>);
  }
  
  return (
    <>
      <section className={Styles.burgerConstructorContainer}>
        <ul className={Styles.burgerConstructorContainer__header}>
          {
            props.activeIngredients.filter( (activeIngredient: IngredientType) => activeIngredient.type === "bun")
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
            props.activeIngredients.filter( (activeIngredient: IngredientType) => activeIngredient.type !== "bun")
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
            props.activeIngredients.filter( (activeIngredient: IngredientType) => activeIngredient.type === "bun")
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
              {props.totalAmount}
            </span>
            <div className={Styles.total__icon}>
              <CurrencyIcon type="primary" />
            </div>
          </div>
          <div className={Styles.total__button}>
            <Button type="primary" size="medium">
              Оформить заказ
            </Button>
          </div>
        </div>
      </section>
      {openOfferInfo && modal__offerInfo}
    </>
  )
}

export default BurgerConstructor;