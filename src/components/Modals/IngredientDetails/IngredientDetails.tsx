import React from 'react';


import Modal from './../Modal';


import { IngredientType } from './../../../services/types/';


import LazyLoadPicture from './../../../services/utils/LazyLoad/';

import Styles from './ingredientDetails.module.scss';



const nutritionalValues = [
  {
    name: "Калории,ккал",
    id: "calories"
  },
  {
    name: "Белки, г",
    id: "proteins"
  },
  {
    name: "Жиры, г",
    id: "fat"
  },
  {
    name: "Углеводы, г",
    id: "carbohydrates"
  },
];


const IngredientDetails = React.memo((props: {
  ingredient: IngredientType
}) => {

  return (

    <div className={Styles.ingredientDetails}>
      <section className={Styles.ingredientDetails__title}>
        <span> 
          Детали ингредиента
        </span>
      </section>
      <section className={Styles.ingredientDetails__content}>
        <div className={Styles.content__image}>
          <LazyLoadPicture 
            image={props.ingredient.image_large}
            width={480} height={240}
            alt={props.ingredient.name} 
          />
        </div>
        <div className={Styles.content__name}>
          <span>
            {props.ingredient.name}
          </span>
        </div>
        <div className={Styles.content__details}>
          {
            nutritionalValues.map( (nutritionalValue: {name: string, id: string}) => {
              return (
                <div key={nutritionalValue.id} className={Styles.details__detail}>
                  <span className={Styles.detail__name}>
                    {nutritionalValue.name}
                  </span>
                  <span className={Styles.detail__prop}>
                    {props.ingredient[nutritionalValue.id as keyof IngredientType]}
                  </span>
                </div>
              )
            })
          }
        </div>
      </section>
    </div>
  )

});

export default IngredientDetails;