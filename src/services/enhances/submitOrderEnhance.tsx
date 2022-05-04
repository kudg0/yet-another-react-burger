import { Dispatch } from 'redux';


import { 
  order_request,
  order_request_success,
  order_request_failed,
  ingredients_reset
} from './../slicers/appSlice';


import checkApiResponse from './../utils/checkApiResponse';
import handleApiErrors from './../utils/handleApiErrors';



const apiUrl : string = process.env.REACT_APP_API_BASE_URL + "/orders"!;

export const submitOrderEnhance = ( objForServer : {ingredients : string[]} ) => {
  return ( dispatch : Dispatch ) => {
    return new Promise ((resolve, reject) => {
      dispatch(order_request());

      fetch( apiUrl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(objForServer)
      })
        .then(response => {
          checkApiResponse(response)
            .then( (result : {success: boolean, name?: string, order?: {number: number} }) => {
              if(!result.success || !result.order || !result.name) return Promise.reject(result);

              dispatch(order_request_success({orderId: result.order.number, name: result.name}));
              dispatch(ingredients_reset());

              return resolve(result)
            })
            .catch( (error: Error) => {
              handleApiErrors(error);

              dispatch(order_request_failed());
              return reject(error)
            })
        })
        .catch( (error: Error) => {
          handleApiErrors(error);

          dispatch(order_request_failed());
          return reject(error)
        })
    })
  }
}