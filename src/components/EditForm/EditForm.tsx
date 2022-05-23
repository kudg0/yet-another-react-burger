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

import Styles from './editForm.module.scss';



const EditForm = React.memo((props: {
  dispatchCallbackFn: (dataFromForm : {name?: string, email?: string, password?: string}) => void,
  formData: FormDataType,
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>,
  defaultValueForPassword: string
}) => {

  const dispatch = useDispatch();


  const user = useSelector( (store : ReduxStore) => store.user, shallowEqual);
  const { request } = user;


  const { handleChange, isFailed, setIsFailed } = useFormAndValidation(props.formData, props.setFormData);
  
  const [inputsSuccessChanging, setInputsSuccessChanging] = React.useState<boolean[]>([false, false, false]);
  const [inputsCanBeChanged, setInputsCanBeChanged] = React.useState<boolean[]>([false, false, false]);

  const [dataChanged, setDataChanged] = React.useState<boolean>(false);

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

  /* 
    Проверяем обновились какие-то данные в инпутах:
      если обновились – отображаем контролы для сохранения/сброса изменений
      если нет – не отображаем :)
  */
    React.useEffect( () => {
      setDataChanged( 
        props.formData.filter( editInput => {
          return (
            editInput.name === 'password' ?
              editInput.value.length !== 0 ? 
                editInput.value !== props.defaultValueForPassword : false :
              editInput.value !== user.data[editInput.name as 'name' | 'email']
          )
        }).length > 0
      )
    }, [ user.data, props.defaultValueForPassword, props.formData, setDataChanged ])

  /* 
    Трекаем включение редактирования на инпуте пароля:
      если начали изменять – удаляем у него value;
      если отменили изменения – ставим дефолтное значение;
  */
    const changePasswordValueOnEdit = React.useCallback(( isCanBeChanged : boolean ) => {
      const newDataState = [ ...props.formData ],
            neededIndex = inputsCanBeChanged.length - 1;


      if( isCanBeChanged ){
        newDataState[ neededIndex ].value = '';
      } else {
        newDataState[ neededIndex ].value = props.defaultValueForPassword;
      }

      props.setFormData( newDataState );

    }, [ props, inputsCanBeChanged ]);


  const movePasswordToDefaultState = React.useCallback(() => {
    const newState = [ ...props.formData ].map( (dataInput: InputDataType) => {
      return (
        dataInput.name !== 'password' ? 
          dataInput : {...dataInput, value: props.defaultValueForPassword}
      )
    });

    props.setFormData( newState ); setInputsCanBeChanged([false, false, false]);  
  }, [ props, setInputsCanBeChanged ]);



  const handleSubmit : (e: React.FormEvent<HTMLFormElement>) => void  = React.useCallback((e) => {
    e.preventDefault();
    if(request.pending) return;

    const dataFromForm = [...props.formData].reduce( (prevValue, dataInput: InputDataType) => {
      return (
        dataInput.name !== 'password' ? 
          dataInput.value === user.data[dataInput.name as 'name' | 'email'] ? 
            prevValue : {...prevValue, [dataInput.name]: dataInput.value} :
          dataInput.name === 'password' && dataInput.value === props.defaultValueForPassword ?
            prevValue : {...prevValue, [dataInput.name]: dataInput.value}
      )
    }, {})

    let isChangegData = [false, false, false];
    
    for(let name in dataFromForm) {
      const selectedDataItem = [...props.formData].find( (dataInput: InputDataType) => dataInput.name === name);

      if(!selectedDataItem) return;
      const selectedDataItem__index = [...props.formData].indexOf(selectedDataItem);
      if(selectedDataItem__index === -1) return;

      isChangegData[selectedDataItem__index] = true;
    }

    movePasswordToDefaultState();
    setInputsSuccessChanging(isChangegData);


    props.dispatchCallbackFn(dataFromForm)
    
  }, [request.pending, props, movePasswordToDefaultState, user.data, setInputsSuccessChanging]);


  const handleReset : (e: React.FormEvent<HTMLFormElement>) => void = React.useCallback((e) => {
    e.preventDefault();
    if(request.pending) return false;


    const newState = [...props.formData].map((dataInput: InputDataType) => {
      return (
        dataInput.name !== 'password' ? 
          {...dataInput, value: user.data[dataInput.name as 'name' | 'email'] || ''} : {...dataInput, value: props.defaultValueForPassword}
      )
    });

    props.setFormData(newState);
    
    setInputsCanBeChanged([false, false, false])
  }, [request.pending, user.data, props, setInputsCanBeChanged]);



  return (
    <form 
      className={
        Styles.formContainer + ' ' + 
        (isFailed ? Styles.formContainer_failed : '')
      } 
      onSubmit={handleSubmit}
      onReset={handleReset}
      style={{
        pointerEvents: request.pending ? 'none' : 'auto'
      }}
    >
      {
        props.formData.map( (dataInput : InputDataType, dataInputIndex: number) => (
          <label 
            key={dataInput.name}
            className={Styles.formContainer__input}
          >
            {
              <Input
                type={ dataInput.type }
                placeholder={ dataInput.placeholder }
                onChange={ handleChange }
                icon={ inputsCanBeChanged[dataInputIndex] ? 'CloseIcon' : 'EditIcon' }
                value={ dataInput.value }
                name={ dataInput.name }
                error={ isFailed }
                onIconClick={ 
                dataInputIndex !== props.formData.length - 1 ? 
                  () => {
                    let newState = [...inputsCanBeChanged];
                    newState.splice(dataInputIndex, 1, !inputsCanBeChanged[dataInputIndex]);
                    setInputsCanBeChanged(newState);
                  } : 
                  () => {
                    let newState = [...inputsCanBeChanged];
                    newState.splice(dataInputIndex, 1, !inputsCanBeChanged[dataInputIndex]);
                    setInputsCanBeChanged(newState);

                    changePasswordValueOnEdit( !inputsCanBeChanged[dataInputIndex] );
                  }
                }
                disabled={ !inputsCanBeChanged[dataInputIndex] }
                success={ inputsSuccessChanging[dataInputIndex] }
                ref={
                  (ref) => inputsRef.current[dataInputIndex] = ref!
                } 
              />
            }
          </label>
        ))
      }

      {
        dataChanged &&
        <div className={Styles.formContainer__controls}>
          <button 
            type='reset'
            className={Styles.controls__button + ' ' + Styles.controls__button_reset}
          >
            <span>
              Отмена
            </span>
          </button>
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      }
    </form>
  );
})

export default EditForm;