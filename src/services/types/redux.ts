import { IIngredientType, IOrderType } from './';


export interface IReduxStore {
  app: IReduxStore__App,
  user: IReduxStore__User
}
export interface IReduxStore__App {
  ingredients: {
    data: IIngredientType[],
    request: {
      pending: boolean,
      success: boolean,
      failed: boolean
    }
  },
  clickedIngredient: {
    isShow: boolean,
    data?: IIngredientType
  },
  order: {
    totalAmount: number,
    orderId: number | null,
    burger: {
      name: string | null,
      ingredients: IIngredientType[]
    },
    request: {
      pending: boolean,
      success: boolean,
      failed: boolean
    }
  },
  orders: {
    data: IOrderType[],
    total: number,
    totalToday: number, 
    request: {
      success: boolean,
      failed: boolean
    }
  },
  feed: {
    data: IOrderType[],
    total: number,
    totalToday: number, 
    request: {
      success: boolean,
      failed: boolean
    }
  },
}
export interface IReduxStore__User {
  data: {
    id?: string,
    name?: string,
    email?: string,
    accessToken?: string,
    refreshToken?: string,
  }
  request: {
    pending: boolean,
    success: boolean,
    failed: boolean
  }
}

interface IOrderPayload extends Omit<IOrderType, 'ingredients' | 'totalAmount'> {
  ingredients: string[]
};

export interface IWsMessagePayload {
  total: number, 
  totalToday: number, 
  orders: IOrderPayload[],
}