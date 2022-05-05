import React from 'react';

import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { ingredientsDecreaseCounter, ingredientUpdatePos } from './../../../services/slicers/appSlice';


import { useDrag, useDrop } from 'react-dnd';


import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


import { IngredientType } from './../../../services/types/';


import Styles from './draggableConstructorElement.module.scss';



const DraggableConstructorElement = React.memo((props: {
  className: string,
  ingredient: IngredientType,
  ingredientIndex: number,
  type?: "top" | "bottom"
}) => {
  
  const dispatch = useDispatch();

  const [{ isDrag }, ref] = useDrag({
      type: "ingredient_active",
      item: {ingredient: props.ingredient, index: props.ingredientIndex},
      collect: monitor => ({
        isDrag: monitor.isDragging()
      })
  });

  const [, dropTarget] = useDrop({
      accept: "ingredient_active",
      drop(item : {ingredient: IngredientType, index: number}) {
        handleUpdatePosition( item.ingredient, item.index )
      },
  });


  const handleUpdatePosition = React.useCallback(( newItem: IngredientType, newItemIndex: number ) => {
    dispatch(ingredientUpdatePos({currentItem: newItem, currentItemIndex: newItemIndex, toNeededItemIndex: props.ingredientIndex}))
  }, [dispatch, props.ingredientIndex])
  const deleteIngredient = React.useCallback(() => {
    dispatch(ingredientsDecreaseCounter(props.ingredient));
  }, [dispatch, props.ingredient]);
  


  return (

    props.type ?
      <li className={props.className}>
        <div className={Styles.constructorWrapper} >
          <ConstructorElement
            type={props.type}
            text={
              props.ingredient.name + (props.type === 'top' ? ' (верх)' : ' (низ)')
            }
            isLocked={true}
            price={props.ingredient.price}
            thumbnail={props.ingredient.image_mobile}
            handleClose={deleteIngredient}
          /> 
        </div>
      </li> : 
      <li className={props.className} ref={dropTarget}>
        <div className={Styles.constructorWrapper} ref={ref}>
          <div className={Styles.controlElement}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            text={props.ingredient.name}
            price={props.ingredient.price}
            thumbnail={props.ingredient.image_mobile}
            handleClose={deleteIngredient}
          />
        </div>
      </li>
  );
});


export default DraggableConstructorElement;


