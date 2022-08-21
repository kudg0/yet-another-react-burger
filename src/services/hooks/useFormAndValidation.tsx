import React from 'react';

import { TFormDataType } from './../types/';


const useFormAndValidation = ( 
  initValues? : any, 
  initSetValues? : React.Dispatch<React.SetStateAction<TFormDataType>>
) => {

  const [ values, setValues ] = React.useState({});
  const [ isFailed, setIsFailed ] = React.useState(false);


  const handleChange = React.useCallback<(e: React.ChangeEvent<HTMLInputElement>) => void>((e) => {
    const target : HTMLInputElement = e.currentTarget;
    const {name, value} = target;

    const newFormData = [...(initValues || values)].map( dataInput => {
      return (
        dataInput.name !== name ? 
          dataInput : {
            ...dataInput,
            value: value
          }
      )
    });

    initSetValues ? initSetValues(newFormData) : setValues(newFormData);
      
    setIsFailed(false);
  }, [initValues, initSetValues, setValues, setIsFailed]);


  const resetForm = React.useCallback<(newValues?: TFormDataType) => void>((newValues = {} as TFormDataType) => {
    initSetValues ? initSetValues(newValues) : setValues(newValues);

    setIsFailed(false);
  }, [setValues, setIsFailed, initSetValues]);


  return { values, handleChange, isFailed, resetForm, setValues, setIsFailed };
}

export { useFormAndValidation };