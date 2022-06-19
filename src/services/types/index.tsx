export interface IIngredientType {
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


export interface ILocationType {
  pathname: string;
  state: {
    from: Location;
  };
};

// REDUX STORE
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
    }
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
// END


  export type TFormDataType = IInputDataType[];

  export interface IInputDataType {
    type: "text" | "email" | "password",
    name: string,
    placeholder: string,
    value: string,
  }