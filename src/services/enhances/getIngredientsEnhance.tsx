import { Dispatch } from 'redux';


import { 
  ingredients_request,
  ingredients_request_success,
  ingredients_request_failed
} from './../slicers/appSlice';


import { IngredientType } from './../../services/types/';


import checkApiResponse from './../utils/checkApiResponse';
import handleApiErrors from './../utils/handleApiErrors';



const apiUrl : string = process.env.REACT_APP_API_BASE_URL + "/ingredients"!;

export const getIngredientsEnhance = () => {
  return ( dispatch : Dispatch ) => {

    dispatch(ingredients_request());

    fetch( apiUrl )
      .then(response => {
        checkApiResponse(response)
          .then( (result : {success: boolean, data: IngredientType[]}) => {
            if(!result.success) return Promise.reject(result);

            result.data = result.data.map( (ingredient: IngredientType) => {return {...ingredient, section: 'ingredients'} });

            dispatch(ingredients_request_success(result.data));
          })
          .catch( (error: Error) => {
            handleApiErrors(error);

            dispatch(ingredients_request_failed());
          })
      })
      .catch( (error: Error) => {
        handleApiErrors(error);

        dispatch(ingredients_request_failed());
      })
  }
}