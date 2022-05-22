import React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';


import { updateUserDataEnhance } from './../../services/enhances/';


import { EditIcon, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


import { ReduxStore } from './../../services/types/';


import Styles from './edit.module.scss';



const Edit = React.memo( () => {

  const dispatch = useDispatch();

  const user = useSelector( (store : ReduxStore) => store.user, shallowEqual);
  const { request } = user;
  const { accessToken } = user.data;


  const [editData, setEditData] = 
    React.useState<{
      id: string, 
      placeholder: string, 
      value: string
    }[]>([
      {
        id: "name",
        placeholder: "Имя",
        value: ''
      },
      {
        id: "email",
        placeholder: "Логин",
        value: ''
      },
      {
        id: "password",
        placeholder: "Пароль",
        value: '*****'
      },
    ]);

  const [inputsCanChanging, setInputsCanChanging] = React.useState<[boolean, boolean, boolean]>([false, false, false]);
  const [dataChanged, setDataChanged] = React.useState<boolean>(false);


  React.useEffect( () => {
    let newState : {
        id: string, 
        placeholder: string, 
        value: string
      }[] = [ 
      {
        id: "name",
        placeholder: "Имя",
        value: user.data.name || ''
      },
      {
        id: "email",
        placeholder: "Логин",
        value: user.data.email || ''
      },
      {
        id: "password",
        placeholder: "Пароль",
        value: '*****'
      }
    ];

    setEditData( newState );
  }, [ setEditData, user.data.name, user.data.email ]);  


  React.useEffect( () => {
    setDataChanged( 
      editData.filter( editInput => {
        if(editInput.id === 'password') return editInput.value.length === 0 ? false : editInput.value !== '*****';
        return editInput.value !== user.data[editInput.id as 'name' | 'email']
      }).length > 0
    )
  }, [ user.data, editData, setEditData ])


  const toggleCanChangeInput : (e : React.MouseEvent<HTMLElement>) => void = React.useCallback((e) => {
    const target : HTMLElement = e.currentTarget!,
        target__index : number = parseInt(target.getAttribute("data-index")!);


    let newState : [boolean, boolean, boolean] = [...inputsCanChanging];
    newState[target__index] = !inputsCanChanging[target__index];


    setInputsCanChanging( newState );


    let newDataState = [ ...editData ];
    if(newState[target__index] && target__index === 2){
      newDataState[2].value = '';
    } else {
      newDataState[2].value = '*****';
    }

    setEditData( newDataState );

  }, [ editData, setEditData, setInputsCanChanging, inputsCanChanging]);


  const moveToDefaultState = React.useCallback(() => {
    let newState = [ ...editData ];

    newState[2].value = '*****';

    setEditData( newState ); setInputsCanChanging([false, false, false]);  
  }, [setEditData, setInputsCanChanging, editData]);

  const handleChangeOfInput : (e: React.ChangeEvent<HTMLInputElement>) => void = React.useCallback((e) => {
    let target : HTMLInputElement = e.currentTarget,
        target__value = target.value,
        target__index : number = parseInt(target.getAttribute("data-index")!);


    let newState = [ ...editData ];
    newState[target__index].value = target__value;

    setEditData( newState );
  }, [setEditData, editData]);


  const handleSubmit : (e: React.FormEvent<HTMLFormElement>) => void = React.useCallback((e) => {
    e.preventDefault();

    if(request.pending) return false;

    let target : HTMLFormElement = e.currentTarget,
        target__data : FormData = new FormData(target);

    const data__entries = Array.from(target__data.entries());

    for (let [key, val] of data__entries) {
      if(key === 'password' && val === '*****') target__data.delete( key );

      if(user.data[key as 'name' | 'email'] === val) target__data.delete( key );
    }

    if(Object.keys(Object.fromEntries(target__data)).length === 0) return false;
    
    dispatch( updateUserDataEnhance(target__data) as any )
      .then( () => moveToDefaultState())
      .catch( () => moveToDefaultState());

  }, [request.pending, user.data, dispatch, moveToDefaultState]);
  

  const handleReset : (e: React.FormEvent<HTMLFormElement>) => void = React.useCallback((e) => {
    e.preventDefault();
    if(request.pending) return false;

    let newState = [ ...editData ];

    newState[0].value = user.data.name || '';
    newState[1].value = user.data.email || '';
    
    setEditData( newState );
    
    moveToDefaultState();
  }, [request.pending, user.data, setEditData, editData, moveToDefaultState]);



  return (
    <form 
      className={Styles.editContainer}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      {
        editData.map( (editInput : {id: string, placeholder: string, value: string}, editInputIndex) => {
          return (
            <label key={ editInput.id } className={Styles.editContainer__label} data-placeholder={ editInput.placeholder }>
              <input 
                type={ editInput.id }
                name={ editInput.id }
                value={ editInput.value }
                data-index={editInputIndex}
                {...(
                  !inputsCanChanging[editInputIndex] && {readOnly: true}
                )}
                onChange={handleChangeOfInput}
              />
              <div 
                className={Styles.label__icon} 
                data-index={editInputIndex}
                onClick={toggleCanChangeInput}
              >
                {
                  !inputsCanChanging[editInputIndex] ?
                    <div className={Styles.icon__edit}>
                      <EditIcon type="primary" />
                    </div> :
                    <div className={Styles.icon__confirm}>
                      <CloseIcon type="primary" />
                    </div>
                }
              </div>
            </label>
          )
        })
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
          <button 
            type='submit'
            className={Styles.controls__button + ' ' + Styles.controls__button_submit}
          >
            <span>
              Сохранить
            </span>
          </button>
        </div>
      }
    </form>
  );
});

export default Edit;