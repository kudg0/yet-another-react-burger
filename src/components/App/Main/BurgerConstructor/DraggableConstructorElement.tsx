import React from 'react';

import { useDrag, useDrop } from 'react-dnd';

// Redux
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { ingredientsDecreaseCounter, ingredientUpdatePos } from './../../../../services/redux/slicers/appSlice';

// Ya imports
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Types
import { IIngredientType } from './../../../../services/types/';

// Styles
import Styles from './draggableConstructorElement.module.scss';



interface IDraggableConstructorElementComponent {
  className: string;
  ingredient: IIngredientType;
  ingredientIndex: number;
  type?: "top" | "bottom";
}

const DraggableConstructorElement: React.FunctionComponent<IDraggableConstructorElementComponent> = React.memo(({
  className,
  ingredient,
  ingredientIndex,
  type,
}) => {
  
  const dispatch = useDispatch();

  const [dragFromTop, setDragFromTop] = React.useState(false);


  const [{ isDrag }, ref] = useDrag({
      type: "ingredient_active",
      item: {ingredient: ingredient, index: ingredientIndex},
      collect: monitor => ({
        isDrag: monitor.isDragging()
      })
  });

  const [{ isHover }, dropTarget] = useDrop({
      accept: "ingredient_active",
      drop(item : {ingredient: IIngredientType, index: number}) {
        handleUpdatePosition( item.ingredient, item.index )
      },
      hover(item : {ingredient: IIngredientType, index: number}, monitor){
        if(item.index < ingredientIndex) setDragFromTop(true)
        else setDragFromTop(false)
      },
      collect: monitor => ({
        isHover: monitor.isOver({ shallow: true }),
      })
  });


  const handleUpdatePosition = React.useCallback(( newItem: IIngredientType, newItemIndex: number ) => {
    dispatch(ingredientUpdatePos({currentItem: newItem, currentItemIndex: newItemIndex, toNeededItemIndex: ingredientIndex}))
  }, [dispatch, ingredientIndex])
  const deleteIngredient = React.useCallback(() => {
    dispatch(ingredientsDecreaseCounter(ingredient));
  }, [dispatch, ingredient]);
  


  return (

    type ?
      <li className={className}>
        <div className={Styles.constructorWrapper} >
          <ConstructorElement
            type={type}
            text={
              ingredient.name + (type === 'top' ? ' (верх)' : ' (низ)')
            }
            isLocked={true}
            price={ingredient.price}
            thumbnail={ingredient.image_mobile}
            handleClose={deleteIngredient}
          /> 
        </div>
      </li> : 
      <li className={className} ref={dropTarget}>
        <div 
          className={
            Styles.constructorWrapper + ' ' + 
            (
              isHover && !isDrag ? 
              dragFromTop ? Styles.constructorWrapper_hover_top : Styles.constructorWrapper_hover_bottom : ''
            ) + ' ' + 
            (isDrag ? Styles.constructorWrapper_drag : '')
          } 
          ref={ref}
        >
          <div className={Styles.controlElement}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image_mobile}
            handleClose={deleteIngredient}
          />
        </div>
      </li>
  );
});


export default DraggableConstructorElement;


