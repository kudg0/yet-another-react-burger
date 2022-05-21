import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';


import {
  setClickedIngredient,
} from './../services/slicers/appSlice';


import { LocationType, ReduxStore, IngredientType } from './../services/types/';


import { Home } from './';
import IngredientDetails from './../components/Modals/IngredientDetails/IngredientDetails';



const Ingredients = React.memo( () => {

  const dispatch = useDispatch();
  
  const location = useLocation() as LocationType;
  const from = location.state?.from?.pathname || null;


  const ingredients = useSelector( (store : ReduxStore) => store.app.ingredients.data, shallowEqual);
  const clickedIngredient = useSelector( (store : ReduxStore) => store.app.clickedIngredient.data, shallowEqual);
  const clickedIngredientId = location.pathname.split('/').pop();



  React.useEffect(() => {
    const selectedIngredient = ingredients.filter( (ingredient : IngredientType) => ingredient._id === clickedIngredientId ).shift()!

    if(!selectedIngredient) return;

    dispatch(setClickedIngredient({ data: selectedIngredient }))
  }, [ingredients, dispatch, clickedIngredientId]);

  
  return from ? (
    <Home />
  ) : (
    <section 
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "120px"
      }}
    >
      {
        clickedIngredient && <IngredientDetails ingredient={clickedIngredient!}/>
      }
    </section>
  );
});

export default Ingredients;