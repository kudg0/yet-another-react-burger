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
}

// REDUX STORE
  export interface ReduxStore {
    ingredients: ReduxStore__Ingredients,
    order: ReduxStore__Order
  }
  export interface ReduxStore__Ingredients {
    data: IngredientType[],
    request: {
      pending: boolean,
      success: boolean,
      failed: boolean
    }
  }
  export interface ReduxStore__Order {
    totalAmount: number
  }
// END