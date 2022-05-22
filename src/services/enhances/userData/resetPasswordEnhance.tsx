import { Dispatch } from 'redux';


import { 
  loginRequest,
  loginRequestSuccess,
  loginRequestFailed
} from './../../slicers/userSlice';


import { IngredientType } from './../../../services/types/';


import checkApiResponse from './../../utils/checkApiResponse';
import handleApiErrors from './../../utils/handleApiErrors';



const apiUrl : string = process.env.REACT_APP_API_BASE_URL + "/password-reset/reset"!;

export const resetPasswordEnhance = (formData: FormData) => {
  return ( dispatch : Dispatch ) => {
    return new Promise((resolve, reject) => {
      let objForServer = Object.fromEntries(formData);


      fetch( apiUrl, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      })
        .then(response => {
          checkApiResponse(response)
            .then( (result : {
              "success": boolean,
              "message": string
            }) => {
              if(!result.success) return Promise.reject(result);

              return resolve(result);
            })
            .catch( (error: Error) => {
              handleApiErrors(error);

              return reject(Error);
            })
        })
        .catch( (error: Error) => {
          handleApiErrors(error);

          return reject(Error);
        })
    });
  }
}