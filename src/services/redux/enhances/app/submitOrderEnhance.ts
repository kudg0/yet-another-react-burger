// Redux
import { Dispatch } from 'redux';
import { 
  orderRequest,
  orderRequestSuccess,
  orderRequestFailed,
  ingredientsReset
} from './../../slicers/appSlice';

// Enhances 
import { wsSocketEnhance } from './../';

// Helpers
import checkApiResponse from './../../../utils/checkApiResponse';
import handleApiErrors from './../../../utils/handleApiErrors';

import { refreshTokens } from './../userData/utils/refreshTokens';

import { setLocalStorageWithExpiry, getLocalStorageWithExpiry } from './../../../utils/helpers/workWithLocalStorage';



const apiUrl : string = process.env.REACT_APP_API_BASE_URL + "/orders"!;

export const submitOrderEnhance = ( objForServer : {ingredients : string[]} ) => {
  return ( dispatch : Dispatch ) => {
    return new Promise( async (resolve) => {
      dispatch(orderRequest());

      let refreshToken = getLocalStorageWithExpiry('refreshToken'),
        accessToken = getLocalStorageWithExpiry('accessToken');

      if (!refreshToken) return false;



      if (!accessToken) {
        const data = await refreshTokens(refreshToken);

        if (!data.success) return false;

        refreshToken = data.refreshToken;
        accessToken = data.accessToken;
      }


      fetch( apiUrl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + accessToken
        },
        body: JSON.stringify(objForServer)
      })
      
      fetch( apiUrl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objForServer)
      })
        .then(response => {
          checkApiResponse(response)
            .then( (result : {success: boolean, name?: string, order?: {number: number} }) => {
              if(!result.success || !result.order || !result.name) return Promise.reject(result);

              dispatch(orderRequestSuccess({orderId: result.order.number, name: result.name}));
              dispatch(ingredientsReset()); 

              resolve(result)
            })
            .catch( (error: Error) => {
              handleApiErrors(error);

              dispatch(orderRequestFailed());
            })
        })
        .catch( (error: Error) => {
          handleApiErrors(error);

          dispatch(orderRequestFailed());
        })
    })
  }
}