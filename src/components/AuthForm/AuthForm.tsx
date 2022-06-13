import React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';


import {
  moveRequestToDefault
} from './../../services/slicers/userSlice';


import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';


import { 
  LocationType, 
  ReduxStore,
  FormDataType,
  InputDataType,
} from './../../services/types/';


import { useFormAndValidation } from './../../services/hooks/useFormAndValidation';

import Styles from './authForm.module.scss';



interface IAuthFormComponent {
  dispatchCallbackFn: (dataFromForm: { name?: string, email?: string, password?: string }) => void;
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  failedMessage: string;
  textOnButton: string;
}

const AuthForm: React.FunctionComponent<IAuthFormComponent> = React.memo(({ 
  dispatchCallbackFn,  
  formData,
  setFormData,
  failedMessage,
  textOnButton,
}) => {

  const dispatch = useDispatch();


  const user = useSelector( (store : ReduxStore) => store.user, shallowEqual);
  const { request } = user;


  const { handleChange, isFailed, setIsFailed } = useFormAndValidation(formData, setFormData);

  const [isPasswordHide, setIsPasswordHide] = React.useState(true);

  const inputsRef = React.useRef<HTMLInputElement[]>([]);



  React.useEffect(() => {
    if(!inputsRef.current || inputsRef.current.length === 0) return;
    
    [...inputsRef.current].forEach(child => child.setAttribute("required", "true"));
    inputsRef.current[0].focus();

    return () => {
      dispatch( moveRequestToDefault() ); setIsFailed(false);
    }
  }, [inputsRef, dispatch, setIsFailed]);

  React.useEffect( () => {
    if(!request.failed || !inputsRef.current) return setIsFailed(false);
    
    setIsFailed(true); inputsRef.current[0].focus();

  }, [request.failed, inputsRef, setIsFailed])


  const handleSubmit : (e: React.FormEvent<HTMLFormElement>) => void  = React.useCallback((e) => {
    e.preventDefault();
    if(request.pending) return;

    let dataFromForm = [...formData].reduce( (prevValue, dataInput: InputDataType) => {
      return (
        {...prevValue, [dataInput.name]: dataInput.value}
      )
    }, {})

    dispatchCallbackFn(dataFromForm)
    
  }, [request.pending, dispatchCallbackFn, formData]);



  return (
    <form 
      className={
        Styles.formContainer + ' ' + 
        (isFailed ? Styles.formContainer_failed : '')
      } 
      onSubmit={handleSubmit}
      style={{
        pointerEvents: request.pending ? 'none' : 'auto'
      }}
    >
      {
        formData.map( (dataInput : InputDataType, dataInputIndex: number) => (
          <label 
            key={dataInput.name}
            className={Styles.formContainer__input}
          >
            {
              dataInput.name === 'password' ?
              <Input
                type={ isPasswordHide ? dataInput.type : 'text' }
                placeholder={ dataInput.placeholder }
                onChange={ handleChange }
                icon={ isPasswordHide ? 'ShowIcon' : 'HideIcon' }
                value={ dataInput.value }
                name={ dataInput.name }
                error={ isFailed }
                onIconClick={ () => setIsPasswordHide( !isPasswordHide ) }
                ref={
                  (ref) => inputsRef.current[dataInputIndex] = ref!
                } 
              /> :
              <Input
                type={ dataInput.type }
                placeholder={ dataInput.placeholder }
                onChange={ handleChange }
                value={ dataInput.value }
                name={ dataInput.name }
                error={ isFailed }
                ref={
                  (ref) => inputsRef.current[dataInputIndex] = ref!
                } 
              />
            }
          </label>
        ))
      }

      <label className={Styles.formContainer__hint}>
        <span> 
          {
            isFailed && failedMessage
          }
        </span>
      </label>
      <Button type="primary" size="medium">
        { textOnButton }
      </Button>
    </form>
  );
})

export default AuthForm;