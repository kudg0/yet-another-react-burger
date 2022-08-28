import { v4 as uuidv4 } from 'uuid';

// Redux
import { Dispatch } from 'redux';
import { 
  ingredientsRequest,
  ingredientsRequestSuccess,
  ingredientsRequestFailed
} from './../../slicers/appSlice';

// Enhances 
import { wsSocketEnhance } from './../';

// Types
import { IIngredientType } from './../../../types/';

// Helpers
import checkApiResponse from './../../../utils/checkApiResponse';
import handleApiErrors from './../../../utils/handleApiErrors';



const apiUrl : string = process.env.REACT_APP_API_BASE_URL + "/ingredients"!;

export const getIngredientsEnhance = () => {
  return ( dispatch: Dispatch ) => {

    dispatch(ingredientsRequest());

    fetch( apiUrl )
      .then(response => {
        checkApiResponse(response)
          .then( (result : {success: boolean, data: IIngredientType[]}) => {
            if(!result.success) return Promise.reject(result);

            result.data = result.data.map( (ingredient: IIngredientType) => {return {...ingredient, uuid: uuidv4()} });

            dispatch(ingredientsRequestSuccess(result.data));

            dispatch(wsSocketEnhance({ isUserWs: false, type: "WS_CONNECTION_START" }) as any);
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