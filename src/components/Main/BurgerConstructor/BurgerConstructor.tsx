import React from 'react';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';


import {IngredientType} from './../types.jsx';


class BurgerConstructor extends React.Component<{ activeIngredients: Array<IngredientType> }, { menuItems: any, topMargin: number }> {
  constructor(props: any) {
    super(props);    

    this.deleteIngredient = this.deleteIngredient.bind(this);
  }
  componentDidUpdate(){

  }

  deleteIngredient(){

  }

  render() {
    return (
      <section>
        {
          this.props.activeIngredients.filter( (activeIngredient: IngredientType) => activeIngredient.type === "bun").map( (activeIngredient: IngredientType, activeIngredient__index: number) => {
            return (
              <div key={activeIngredient._id + activeIngredient__index}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={activeIngredient.name}
                  price={activeIngredient.price}
                  thumbnail={""}
                />
              </div>
            )
          })
        }
        {
          this.props.activeIngredients.filter( (activeIngredient: IngredientType) => activeIngredient.type !== "bun").map( (activeIngredient: IngredientType, activeIngredient__index: number) => {
            return (
              <div key={activeIngredient._id + activeIngredient__index}>
                <ConstructorElement
                  text={activeIngredient.name}
                  price={activeIngredient.price}
                  thumbnail={""}
                />
              </div>
            )
          })
        }
      </section>
    )
  }
}

export default BurgerConstructor;