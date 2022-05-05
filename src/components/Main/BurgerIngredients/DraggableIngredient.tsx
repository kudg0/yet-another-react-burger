import React from 'react';


import { useDrag } from 'react-dnd';


import { IngredientType, ReduxStore } from './../../../services/types/';



const DraggableIngredient = React.memo((props: {
  children: React.ReactNode, 
  ingredientData: IngredientType,
  className: string,
  onClick: (e : React.MouseEvent<HTMLElement>) => void
}) => {

  const [{ isDrag }, ref] = useDrag({
      type: "ingredient",
      item: { id: props.ingredientData._id },
      collect: monitor => ({
        isDrag: monitor.isDragging()
      })
  });


  return (
    
    <li ref={ref} data-id={props.ingredientData._id} className={props.className} onClick={props.onClick}>
      {props.children}
    </li>
  );
});

export default DraggableIngredient;