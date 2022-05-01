import React from 'react';


import { IngredientType } from './../components/../services/types/';



export const OrderContext = React.createContext<{
  totalAmount: number,
  activeIngredients: IngredientType[],
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>,
  setActiveIngredients: React.Dispatch<React.SetStateAction<IngredientType[]>>,
}>({
  totalAmount: 0, activeIngredients: [],
  setTotalAmount: () => {}, setActiveIngredients: () => {}
});