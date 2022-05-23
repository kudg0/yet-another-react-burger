import {useState, useCallback} from 'react';


import { FormDataType } from './../types/';


export function useFormAndValidation( 
  initValues? : any, 
  initSetValues? : React.Dispatch<React.SetStateAction<FormDataType>>
) {
  const [ values, setValues ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ isValid, setIsValid ] = useState(true);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target : HTMLInputElement = e.currentTarget;
    const {name, value} = target;
    const assignedForm = target.closest('form');

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
    setErrors({...errors, [name]: e.target.validationMessage});

    if(!assignedForm) return
    setIsValid(assignedForm.checkValidity());
  };


  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    initSetValues ? initSetValues(newValues) : setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid, initSetValues]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}