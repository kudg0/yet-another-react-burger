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

// REDUX STORE
  export interface ReduxStore {
    app: ReduxStore__App,
  }
  export interface ReduxStore__App {
    user: {
      id?: string,
      name?: string,
      email?: string,
      accessToken?: string,
      refreshToken?: string,
      request: {
        pending: boolean,
        success: boolean,
        failed: boolean
      }
    },
    ingredients: {
      data: IngredientType[],
      request: {
        pending: boolean,
        success: boolean,
        failed: boolean
      }
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
// END