import React from 'react';

import { useDrag } from 'react-dnd';

// Types
import { IIngredientType } from './../../../services/types/';



interface IDraggabelIngredientComponent {
  ingredientData: IIngredientType;
  className: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
}

const DraggableIngredient: React.FC<IDraggabelIngredientComponent> = ({
  onClick,
  className,
  ingredientData,
  children, 
}) => {

  const [{ }, ref] = useDrag({
      type: "ingredient",
      item: { id: ingredientData._id },
      collect: monitor => ({
        isDrag: monitor.isDragging()
      })
  });


  return (
    
    <li ref={ref} data-id={ingredientData._id} className={className} onClick={onClick}>
      {children}
    </li>
  );
};

export default React.memo(DraggableIngredient);