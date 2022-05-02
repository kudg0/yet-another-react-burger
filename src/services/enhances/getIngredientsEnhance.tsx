import { Dispatch } from 'redux';


import { 
  request,
  request_success, 
  request_failed 
} from './../slicers/ingredientsSlice';


import { IngredientType } from './../../services/types/';


import checkApiResponse from './../utils/checkApiResponse';
import handleApiErrors from './../utils/handleApiErrors';



export const getIngredientsEnhance = () => {
  return ( dispatch : Dispatch ) => {

    dispatch(request());

    fetch(process.env.REACT_APP_API_BASE_URL + "/ingredients")
      .then(response => {
        checkApiResponse(response)
          .then( (result : {success: boolean, data: IngredientType[]}) => {
            if(!result.success) return Promise.reject(result);

            dispatch(request_success(result.data));
          })
          .catch( (error: Error) => {
            handleApiErrors(error);

            dispatch(request_failed());
          })
      })
      .catch( (error: Error) => {
        handleApiErrors(error);

        dispatch(request_failed());
      })
  }
}