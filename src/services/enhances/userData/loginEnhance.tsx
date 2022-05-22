import { Dispatch } from 'redux';


import { 
  loginRequest,
  loginRequestSuccess,
  loginRequestFailed
} from './../../slicers/userSlice';


import checkApiResponse from './../../utils/checkApiResponse';
import handleApiErrors from './../../utils/handleApiErrors';

import { setCookie } from './../../utils/helpers/workWithCookie';



const apiUrl : string = process.env.REACT_APP_API_BASE_URL + "/auth/login"!;

export const loginEnhance = (formData: FormData) => {
  return ( dispatch : Dispatch ) => {
    let objForServer = Object.fromEntries(formData);

    dispatch(loginRequest());

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
      body: JSON.stringify(objForServer)
    })
      .then(response => {
        checkApiResponse(response)
          .then( (result : {
            "success": boolean,
            "accessToken": string,
            "refreshToken": string,
            "user": {
              "email": string,
              "name": string
            }
          }) => {
            if(!result.success) return Promise.reject(result);

            const accessToken = result.accessToken.split("Bearer ")[1];

            setCookie('refreshToken', result.refreshToken);
            setCookie('accessToken', accessToken, 20);
            
            
            dispatch(
              loginRequestSuccess({ 
                accessToken: accessToken,
                refreshToken: result.refreshToken,
                email: result.user.email,
                name: result.user.name,
              })
            );
          })
          .catch( (error: Error) => {
            handleApiErrors(error);

            dispatch(loginRequestFailed());
          })
      })
      .catch( (error: Error) => {
        handleApiErrors(error);

        dispatch(loginRequestFailed());
      })
  }
}