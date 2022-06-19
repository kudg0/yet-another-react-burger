import { Dispatch } from 'redux';


import { 
  resetPasswordRequest,
  resetPasswordRequestSuccess,
  resetPasswordRequestFailed
} from './../../slicers/userSlice';


import { IIngredientType } from './../../../services/types/';


import checkApiResponse from './../../utils/checkApiResponse';
import handleApiErrors from './../../utils/handleApiErrors';



const apiUrl : string = process.env.REACT_APP_API_BASE_URL + "/password-reset/reset"!;

export const resetPasswordEnhance = (formData: {password: string, token: string}) => {
  return ( dispatch : Dispatch ) => {
    return new Promise((resolve, reject) => {

      dispatch(resetPasswordRequest());

      fetch( apiUrl, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify( formData )
      })
        .then(response => {
          checkApiResponse(response)
            .then( (result : {
              "success": boolean,
              "message": string
            }) => {
              if(!result.success) return Promise.reject(result);
              dispatch(resetPasswordRequestSuccess());

              return resolve(result);
            })
            .catch( (error: Error) => {
              handleApiErrors(error);
              dispatch(resetPasswordRequestFailed());

              return reject(error);
            })
        })
        .catch( (error: Error) => {
          handleApiErrors(error);
          dispatch(resetPasswordRequestFailed());

          return reject(error);
        })
    });
  }
}