import { v4 as uuidv4 } from 'uuid';

// Redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
import { 
  IIngredientType, 
  IReduxStore__App,
  IWsMessagePayload
} from './../../types/';


const appSlice = createSlice({
  name: 'app',
  initialState: {
    ingredients: {
      data: [],
      request: {
        pending: false,
        success: false,
        failed: false
      }
    },
    clickedIngredient: {
      isShow: false,
    },
    order: {
      orderId: null,
      totalAmount: 0,
      burger: {
        name: null,
        ingredients: []
      },
      request: {
        pending: false,
        success: false,
        failed: false
      }
    },
    orders: {
      data: [],
      total: 0,
      totalToday: 0, 
      request: {
        success: false,
        failed: false
      }
    },
    feed: {
      data: [],
      total: 0,
      totalToday: 0, 
      request: {
        success: false,
        failed: false
      }
    }
  } as IReduxStore__App,
  reducers: {
    ingredientsRequest: (state) => {
      state.ingredients.request = {
        pending: true,
        success: false,
        failed: false,
      }
    },
    ingredientsRequestSuccess: (state, action: PayloadAction<IIngredientType[]>) => {
      state.ingredients.data = action.payload;

      state.ingredients.request = {
        pending: false,
        success: true,
        failed: false,
      }
    },
    ingredientsRequestFailed: (state) => {
      state.ingredients.request = {
        pending: false,
        success: false,
        failed: true,
      }
    },

    ingredientsIncreaseCounter: (state, action: PayloadAction<IIngredientType>) => {
      // Не даем выбрать больше 10 позиций соуса/начинки
      if ((action.payload.type === 'main' || action.payload.type === 'sauce') && action.payload.__v > 9) return;

      state.ingredients.data = [...state.ingredients.data].map( (ingredient : IIngredientType) => {
        // Если уже была выбрана булка, убираем ее из выбранных
        if(ingredient._id !== action.payload._id && action.payload.type === 'bun' && ingredient.type === 'bun') {
          ingredient.__v = 0;
        } 

        return (
          ingredient._id !== action.payload._id ?
            ingredient : (action.payload.type === 'bun' && action.payload.__v !== 0) ?
              ingredient : { ...ingredient, __v: ingredient.__v + 1 }
        );
      });;


      // Если выбрали другую булку, убираем ее из активного ордера
      state.order.burger.ingredients = [...state.order.burger.ingredients]
        .filter( (ingredient : IIngredientType) => action.payload.type === 'bun' ? ingredient.type !== 'bun' : true);

      state.order.burger.ingredients.push({
        ...action.payload,
        uuid: uuidv4(),
        __v: action.payload.__v + 1
      });
      
      state.order.totalAmount = 
        [...state.order.burger.ingredients].reduce((acc: number, ingredient: IIngredientType) => {
          return (
            acc + (ingredient.price + (ingredient.type === 'bun' ? ingredient.price : 0))
          )
        }, 0);
    },
    ingredientsDecreaseCounter: (state, action: PayloadAction<IIngredientType>) => {
      if (action.payload.__v === 0) return;
      
      state.ingredients.data = [...state.ingredients.data].map( (ingredient : IIngredientType) => 
        ingredient._id !== action.payload._id ? 
        ingredient : { ...ingredient, __v: --ingredient.__v}
      )

      state.order.burger.ingredients = [...state.order.burger.ingredients].map( (ingredient : IIngredientType) => 
        ingredient._id !== action.payload._id ? 
        ingredient : { ...ingredient, __v: --ingredient.__v}
      ).filter( (ingredient : IIngredientType) => ingredient.__v !== 0);


      state.order.totalAmount = [...state.order.burger.ingredients]
        .reduce((acc: number, ingredient : IIngredientType) => 
          acc + (ingredient.price + (ingredient.type === 'bun' ? ingredient.price : 0))
        , 0)
    },
    ingredientsReset: (state) => {
      state.ingredients.data = [...state.ingredients.data].map( (ingredient : IIngredientType) => {
        return { ...ingredient, __v: 0}
      })

      state.order = {
        ...state.order,
        totalAmount:  0,
        burger: {
          ...state.order.burger,
          ingredients: []
        }
      }
    },
    ingredientUpdatePos: (state, action: PayloadAction<{currentItem: IIngredientType, currentItemIndex: number, toNeededItemIndex: number}>) => {
      let ingredientsWithoutBun = [...state.order.burger.ingredients]
        .filter( (activeIngredient: IIngredientType) => activeIngredient.type !== "bun");
      
      ingredientsWithoutBun.splice(
        action.payload.toNeededItemIndex < action.payload.currentItemIndex ? action.payload.toNeededItemIndex : action.payload.toNeededItemIndex + 1, 
        0, action.payload.currentItem);
      
      ingredientsWithoutBun.splice(
        action.payload.toNeededItemIndex < action.payload.currentItemIndex ? 
        action.payload.currentItemIndex + 1 : action.payload.currentItemIndex, 1);


      state.order.burger.ingredients = [
        ...[...state.order.burger.ingredients].filter( (activeIngredient: IIngredientType) => activeIngredient.type === "bun"), 
        ...ingredientsWithoutBun
      ];
    },

    setClickedIngredient: (state, action: PayloadAction<{data: IIngredientType}>) => {
      state.clickedIngredient = {
        isShow: true,
        data: action.payload.data
      }
    },
    removeClickedIngredient: (state) => {
      state.clickedIngredient = {
        isShow: false
      }
    },
    orderRequest: (state) => {
      state.order.request = {
        pending: true,
        success: false,
        failed: false,
      }
    },
    orderRequestSuccess: (state, action: PayloadAction<{orderId: number, name: string}>) => {
      state.order = {
        ...state.order,
        orderId: action.payload.orderId,
        burger: {
          ...state.order.burger,
          name: action.payload.name,
        }
      }

      state.order.request = {
        pending: false,
        success: true,
        failed: false,
      }
    },
    orderRequestFailed: (state) => {
      state.order.request = {
        pending: false,
        success: false,
        failed: true,
      }
    },
    ordersRequestSuccess: (state, action: PayloadAction<{}>) => {
      state.orders.request = {
        success: true,
        failed: false,
      }
    },
    ordersRequestError: (state, action: PayloadAction<{}>) => {
      state.orders.request = {
        success: false,
        failed: true,
      }
    },
    ordersRequestMessage: (state, action: PayloadAction<IWsMessagePayload>) => {

      const sortedOrderState = state.orders.data?.sort((a, b) => b.number - a.number);
      const sortedOrderPayload = action.payload.orders?.sort((a, b) => b.number - a.number);
      if (
        !!sortedOrderState.length && !!sortedOrderPayload.length &&
        sortedOrderPayload[0]._id === sortedOrderState[0]._id &&
        sortedOrderPayload[0].status === sortedOrderState[0].status
      ) return;

      const ordersWithIngredients = sortedOrderPayload.map((order) => {
        let totalAmount = 0;

        const orderIngredients = order.ingredients.map(orderIngredientId => {
          const neededIngredient = state.ingredients.data.find(ingredient => ingredient._id === orderIngredientId)!;
          totalAmount += neededIngredient.price;

          return neededIngredient;
        });

        return {
          ...order,
          totalAmount,
          ingredients: orderIngredients || [],
        }
      });

      state.orders = {
        ...state.orders,
        data: ordersWithIngredients,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      }

    },
    ordersRequestClosed: (state, action: PayloadAction<{}>) => {
      state.orders.request = {
        success: false,
        failed: false,
      }
    },
    feedRequestSuccess: (state, action: PayloadAction<{}>) => {
      state.feed.request = {
        success: true,
        failed: false,
      }

    },
    feedRequestError: (state, action: PayloadAction<{}>) => {
      state.feed.request = {
        success: true,
        failed: false,
      }
    },
    feedRequestMessage: (state, action: PayloadAction<IWsMessagePayload>) => {

      const sortedOrderState = state.feed.data?.sort((a, b) => b.number - a.number);
      const sortedOrderPayload = action.payload.orders?.sort((a, b) => b.number - a.number);
      if (
        !!sortedOrderState.length && !!sortedOrderPayload.length &&
        sortedOrderPayload[0]._id === sortedOrderState[0]._id &&
        sortedOrderPayload[0].status === sortedOrderState[0].status
      ) return;

      const ordersWithIngredients = sortedOrderPayload.slice(0, 10).map((order) => {
        let totalAmount = 0;

        const orderIngredients = order.ingredients.map(orderIngredientId => {
          const neededIngredient = state.ingredients.data.find(ingredient => ingredient._id === orderIngredientId)!;

          totalAmount += neededIngredient.price;

          return neededIngredient;
        });

        return {
          ...order,
          totalAmount,
          ingredients: orderIngredients || [],
        }
      });

      state.feed = {
        ...state.feed,
        data: ordersWithIngredients,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      }
    },
    feedRequestClosed: (state, action: PayloadAction<{}>) => {
      state.feed.request = {
        success: false,
        failed: false,
      }
    },
  },
});


// Extract the action creators object and the reducer
const { actions, reducer } = appSlice
// Extract and export each action creator by name
export const {
  ingredientsRequest,
  ingredientsRequestSuccess,
  ingredientsRequestFailed,
  ingredientsIncreaseCounter,
  ingredientsDecreaseCounter,
  ingredientsReset,
  ingredientUpdatePos,
  setClickedIngredient,
  removeClickedIngredient,
  orderRequest,
  orderRequestSuccess,
  orderRequestFailed,
  ordersRequestSuccess,
  ordersRequestError,
  ordersRequestMessage,
  ordersRequestClosed,
  feedRequestSuccess,
  feedRequestError,
  feedRequestMessage,
  feedRequestClosed,
} = actions;
// Export the reducer, either as a default or named export
export default reducer