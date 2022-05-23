import {useState, useCallback} from 'react';


import { FormDataType } from './../types/';


const useFormAndValidation =( 
  initValues? : any, 
  initSetValues? : React.Dispatch<React.SetStateAction<FormDataType>>
) => {

  const [ values, setValues ] = useState({});
  const [ isFailed, setIsFailed ] = useState(false);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };


  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    initSetValues ? initSetValues(newValues) : setValues(newValues);

    setIsFailed(false);
  }, [setValues, setIsFailed, initSetValues]);



  return { values, handleChange, isFailed, resetForm, setValues, setIsFailed };
}

export { useFormAndValidation };