import React from 'react';


import { IngredientType } from './../components/types/types';



export const ProductsContext = React.createContext<{
  ingredients: IngredientType[], 
  setIngredients: React.Dispatch<React.SetStateAction<IngredientType[]>> 
}>({
  ingredients: [], setIngredients: () => {}
});