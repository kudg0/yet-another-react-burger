import { Dispatch } from 'redux';


import { 
  orderRequest,
  orderRequestSuccess,
  orderRequestFailed,
  ingredientsReset
} from './../slicers/appSlice';


import checkApiResponse from './../utils/checkApiResponse';
import handleApiErrors from './../utils/handleApiErrors';



const apiUrl : string = process.env.REACT_APP_API_BASE_URL + "/orders"!;

export const submitOrderEnhance = ( objForServer : {ingredients : string[]} ) => {
  return ( dispatch : Dispatch ) => {
    return new Promise ((resolve, reject) => {
      dispatch(orderRequest());

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

              dispatch(orderRequestSuccess({orderId: result.order.number, name: result.name}));
              dispatch(ingredientsReset());

              return resolve(result)
            })
            .catch( (error: Error) => {
              handleApiErrors(error);

              dispatch(orderRequestFailed());
              return reject(error)
            })
        })
        .catch( (error: Error) => {
          handleApiErrors(error);

          dispatch(orderRequestFailed());
          return reject(error)
        })
    })
  }
}