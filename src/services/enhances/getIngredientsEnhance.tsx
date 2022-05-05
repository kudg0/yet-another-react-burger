import { Dispatch } from 'redux';


import { v4 as uuidv4 } from 'uuid';


import { 
  ingredientsRequest,
  ingredientsRequestSuccess,
  ingredientsRequestFailed
} from './../slicers/appSlice';


import { IngredientType } from './../../services/types/';


import checkApiResponse from './../utils/checkApiResponse';
import handleApiErrors from './../utils/handleApiErrors';



const apiUrl : string = process.env.REACT_APP_API_BASE_URL + "/ingredients"!;

export const getIngredientsEnhance = () => {
  return ( dispatch : Dispatch ) => {

    dispatch(ingredientsRequest());

    fetch( apiUrl )
      .then(response => {
        checkApiResponse(response)
          .then( (result : {success: boolean, data: IngredientType[]}) => {
            if(!result.success) return Promise.reject(result);

            result.data = result.data.map( (ingredient: IngredientType) => {return {...ingredient, uuid: uuidv4()} });

            dispatch(ingredientsRequestSuccess(result.data));
          })
          .catch( (error: Error) => {
            handleApiErrors(error);

            dispatch(ingredientsRequestFailed());
          })
      })
      .catch( (error: Error) => {
        handleApiErrors(error);

        dispatch(ingredientsRequestFailed());
      })
  }
}