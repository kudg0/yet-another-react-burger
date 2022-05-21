import { Dispatch } from 'redux';


import { 
  logoutRequest,
  logoutRequestSuccess,
  logoutRequestFailed
} from './../slicers/appSlice';


import checkApiResponse from './../utils/checkApiResponse';
import handleApiErrors from './../utils/handleApiErrors';
  
import { deleteCookie, getCookie } from './../utils/helpers/workWithCookie';



const apiUrl : string = process.env.REACT_APP_API_BASE_URL + "/auth/logout"!;

export const logoutEnhance = () => {
  return async ( dispatch : Dispatch ) => {
    let refreshToken = getCookie('refreshToken');
    
    if(!refreshToken) return false;

    dispatch(logoutRequest());

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
      body: JSON.stringify({token: refreshToken})
    })
      .then(response => {
        checkApiResponse(response)
          .then( (result : {
            "success": boolean,
            "message": string,
          }) => {
            if(!result.success) return Promise.reject(result);
              
            dispatch( logoutRequestSuccess() );
             

            deleteCookie("refreshToken");
            deleteCookie("accessToken");
          })
          .catch( (error: Error) => {
            handleApiErrors(error);

            dispatch(logoutRequestFailed());
          })
      })
      .catch( (error: Error) => {
        handleApiErrors(error);

        dispatch(logoutRequestFailed());
      })
  }
}