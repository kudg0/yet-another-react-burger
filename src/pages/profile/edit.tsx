import React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';


import { updateUserDataEnhance } from './../../services/enhances/';


import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';


import { 
  ReduxStore,
  FormDataType,
  InputDataType
} from './../../services/types/';


import Styles from './edit.module.scss';



const Edit = React.memo( () => {

  const dispatch = useDispatch();

  const user = useSelector( (store : ReduxStore) => store.user, shallowEqual);
  const { request } = user;
  const { accessToken } = user.data;


  const [inputsSuccessChanging, setInputsSuccessChanging] = React.useState<boolean[]>([false, false, false]);
  const [inputsCanBeChanged, setInputsCanBeChanged] = React.useState<boolean[]>([false, false, false]);
  const [dataChanged, setDataChanged] = React.useState<boolean>(false);


  const defaultValueForPassword = '**********';

  const [formData, setFormData] = React.useState<FormDataType>([
    {  
      type: "text",
      name: "name",
      placeholder: "Имя",
      value: user.data.name || '',
    },
    {  
      type: "email",
      name: "email",
      placeholder: "Логин",
      value: user.data.email || '',
    },
    {  
      type: "password",
      name: "password",
      placeholder: "Пароль",
      value: defaultValueForPassword,
    },
  ]);



  /* 
    Проверяем обновились какие-то данные в инпутах:
      если обновились – отображаем контролы для сохранения/сброса изменений
      если нет – не отображаем :)
  */
    React.useEffect( () => {
      setDataChanged( 
        formData.filter( editInput => {
          return (
            editInput.name === 'password' ?
              editInput.value.length !== 0 ? 
                editInput.value !== defaultValueForPassword : false :
              editInput.value !== user.data[editInput.name as 'name' | 'email']
          )
        }).length > 0
      )
    }, [ user.data, formData, setDataChanged ])


  /* 
    Трекаем включение редактирования на инпуте пароля:
      если начали изменять – удаляем у него value;
      если отменили изменения – ставим дефолтное значение;
  */
    const changePasswordValueOnEdit = React.useCallback(( isCanBeChanged : boolean ) => {
      const newDataState = [ ...formData ],
            neededIndex = inputsCanBeChanged.length - 1;


      if( isCanBeChanged ){
        newDataState[ neededIndex ].value = '';
      } else {
        newDataState[ neededIndex ].value = defaultValueForPassword;
      }

      setFormData( newDataState );

    }, [ formData, setFormData, inputsCanBeChanged ]);



  const movePasswordToDefaultState = React.useCallback(() => {
    const newState = [ ...formData ].map( (dataInput: InputDataType) => {
      return (
        dataInput.name !== 'password' ? 
          dataInput : {...dataInput, value: defaultValueForPassword}
      )
    });

    setFormData( newState ); setInputsCanBeChanged([false, false, false]);  
  }, [ formData, setFormData, setInputsCanBeChanged ]);

  
  const handleChangeOfInput : (e: React.ChangeEvent<HTMLInputElement>) => void = React.useCallback((e) => {
    const target : HTMLInputElement = e.currentTarget,
          target__name : string = target.name,
          target__value : string = target.value;


    const newFormData = [...formData].map( dataInput => {
      return (
        dataInput.name !== target__name ? 
          dataInput : {
            ...dataInput,
            value: target__value
          }
      )
    });

    setFormData( newFormData );

  }, [setFormData, formData]);


  const handleSubmit : (e: React.FormEvent<HTMLFormElement>) => void  = React.useCallback((e) => {
    e.preventDefault();
    if(request.pending) return;


    const dataFromForm = [...formData].reduce( (prevValue, dataInput: InputDataType) => {
      return (
        dataInput.name !== 'password' ? 
          dataInput.value === user.data[dataInput.name as 'name' | 'email'] ? 
            prevValue : {...prevValue, [dataInput.name]: dataInput.value} :
          dataInput.name === 'password' && dataInput.value === defaultValueForPassword ?
            prevValue : {...prevValue, [dataInput.name]: dataInput.value}
      )
    }, {})


    let isChangegData = [false, false, false];
    
    for(let name in dataFromForm) {
      const selectedDataItem = formData.find( (dataInput: InputDataType) => dataInput.name === name);

      if(!selectedDataItem) return;
      const selectedDataItem__index = formData.indexOf(selectedDataItem);
      if(selectedDataItem__index === -1) return;

      isChangegData[selectedDataItem__index] = true;
    }

    dispatch( updateUserDataEnhance(dataFromForm) as any )
      .then( () => {
        movePasswordToDefaultState();

        setInputsSuccessChanging(isChangegData);
      })
      .catch( () => movePasswordToDefaultState());
  }, [request.pending, user.data, dispatch, formData, movePasswordToDefaultState]);

  
  const handleReset : (e: React.FormEvent<HTMLFormElement>) => void = React.useCallback((e) => {
    e.preventDefault();
    if(request.pending) return false;


    const newState = [...formData].map((dataInput: InputDataType) => {
      return (
        dataInput.name !== 'password' ? 
          {...dataInput, value: user.data[dataInput.name as 'name' | 'email'] || ''} : {...dataInput, value: defaultValueForPassword}
      )
    });
    
    setFormData( newState ); setInputsCanBeChanged([false, false, false])
  }, [request.pending, user.data, formData, setFormData, setInputsCanBeChanged]);



  return (

    <form 
      className={Styles.editContainer}
      onSubmit={ handleSubmit }
      onReset={ handleReset }
      style={{
        pointerEvents: request.pending ? 'none' : 'auto'
      }}
    >
      {
        formData.map( (dataInput : InputDataType, dataInputIndex : number) => (
          <label 
            key={dataInput.name}
            className={Styles.editContainer__label}
          >
          
            <Input
              type={ dataInput.type }
              placeholder={ dataInput.placeholder }
              onChange={ handleChangeOfInput }
              icon={ inputsCanBeChanged[dataInputIndex] ? 'CloseIcon' : 'EditIcon' }
              value={ dataInput.value }
              name={ dataInput.name }
              onIconClick={ 
                dataInputIndex !== formData.length - 1 ? 
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
            />
          </label>
        ))
      }

      {
        dataChanged &&
        <div className={Styles.editContainer__controls}>
          <button 
            type='reset'
            className={Styles.controls__button + ' ' + Styles.controls__button_reset}
          >
            <span>
              Отмена
            </span>
          </button>
          <Button 
            type="primary" 
            size="medium"
          >
            Сохранить
          </Button>
        </div>
      }
    </form>
  );
});

export default Edit;