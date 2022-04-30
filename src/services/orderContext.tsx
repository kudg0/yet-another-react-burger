import React from 'react';


import { IngredientType } from './../components/types/types';



export const OrderContext = React.createContext<{
  activeIngredients: IngredientType[], 
  totalAmount: number,
  setActiveIngredients: React.Dispatch<React.SetStateAction<IngredientType[]>>,
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>
}>({
  activeIngredients: [], totalAmount: 0, 
  setActiveIngredients: () => {}, setTotalAmount: () => {}
});