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

export interface IOrderType {
  _id: string;
  status: "done";
  number: number;
  createdAt: Date;
  updatedAt: Date;
  ingredients: IIngredientType[];
}


export type TFormDataType = IInputDataType[];

export interface IInputDataType {
  type: "text" | "email" | "password",
  name: string,
  placeholder: string,
  value: string,
}


export interface ILocationType {
  pathname: string;
  state: {
    from?: Location;
    backgroundLocation?: string;
  };
};


// REDUX STORE
export type { IReduxStore, IReduxStore__App, IReduxStore__User } from './redux';

