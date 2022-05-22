import { Dispatch } from 'redux';


import { 
  loginRequest,
  loginRequestSuccess,
  loginRequestFailed
} from './../../slicers/userSlice';


import checkApiResponse from './../../utils/checkApiResponse';
import handleApiErrors from './../../utils/handleApiErrors';
  
import { setCookie, getCookie } from './../../utils/helpers/workWithCookie';



const apiUrl : string = process.env.REACT_APP_API_BASE_URL + "/auth/user"!;
const apiRefreshToken : string = process.env.REACT_APP_API_BASE_URL + "/auth/token"!;

export const reLoginEnhance = () => {
  return async ( dispatch : Dispatch ) => {
    let refreshToken = getCookie('refreshToken'),
        accessToken = getCookie('accessToken');

    
    if(!refreshToken) return false;


    if(!accessToken){
      const data = await refreshTokens( refreshToken );

      if(!data.success) return false;
      
      refreshToken = data.refreshToken;
      accessToken = data.accessToken.split("Bearer ")[1];

      setCookie('refreshToken', refreshToken);
      setCookie('accessToken', accessToken, 20);
    }


    dispatch(loginRequest());

    fetch( apiUrl, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + accessToken
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
      .then(response => {
        checkApiResponse(response)
          .then( (result : {
            "success": boolean,
            "user": {
              "email": string,
              "name": string
            }
          }) => {
            if(!result.success) return Promise.reject(result);
            
            dispatch(
              loginRequestSuccess({
                accessToken: accessToken,
                refreshToken: refreshToken,
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

export async function refreshTokens( token : string ){
  const response = await fetch( apiRefreshToken, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({token})
  });

  return await response.json();
}