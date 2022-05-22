export interface IngredientType {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uuid: string;
}


export interface LocationType {
  pathname: string;
  state: {
    from: Location;
  };
};

// REDUX STORE
  export interface ReduxStore {
    app: ReduxStore__App,
    user: ReduxStore__User
  }
  export interface ReduxStore__App {
    ingredients: {
      data: IngredientType[],
      request: {
        pending: boolean,
        success: boolean,
        failed: boolean
      }
    },
    clickedIngredient: {
      isShow: boolean,
      data?: IngredientType
    },
    order: {
      totalAmount: number,
      orderId: number | null,
      burger: {
        name: string | null,
        ingredients: IngredientType[]
      },
      request: {
        pending: boolean,
        success: boolean,
        failed: boolean
      }
    }
  }
  export interface ReduxStore__User {
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
// END