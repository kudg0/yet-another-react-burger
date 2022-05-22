import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';


import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';


import { registerEnhance } from './../../../services/enhances/';

import { 
  ReduxStore, 
  FormDataType, 
  InputDataType, 
} from './../../../services/types/';


import Styles from './register.module.scss';



const Register = React.memo( () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const user = useSelector( (store : ReduxStore) => store.user, shallowEqual);
  const { request } = user;
  

  const [isFailed, setIsFailed] = React.useState(false);
  const [isPasswordHide, setIsPasswordHide] = React.useState(true);

  const nameInputRef = React.useRef<HTMLInputElement>(null);

  const [formData, setFormData] = React.useState<FormDataType>([
    {  
      type: "text",
      name: "name",
      placeholder: "Имя",
      value: '',
    },
    {  
      type: "email",
      name: "email",
      placeholder: "E-mail",
      value: '',
    },
    {  
      type: "password",
      name: "password",
      placeholder: "Пароль",
      value: '',
    },
  ]);



  React.useEffect( () => {
    if(!request.failed || !nameInputRef.current) return;
    
    setIsFailed(request.failed); nameInputRef.current.focus();

  }, [nameInputRef, request.failed, setIsFailed])



  const handleChangeOfInput : (e: React.ChangeEvent<HTMLInputElement>) => void = React.useCallback((e) => {
    const target : HTMLInputElement = e.currentTarget,
        target__name : string = target.name,
        target__value : string = target.value;


    let newFormData = [...formData].map( dataInput => {
      return (
        dataInput.name !== target__name ? 
          dataInput : {
            ...dataInput,
            value: target__value
          }
      )
    });

    setFormData( newFormData );
    setIsFailed( false );

  }, [setFormData, formData, setIsFailed]);


  const handleSubmit : (e: React.FormEvent<HTMLFormElement>) => void  = React.useCallback((e) => {
    e.preventDefault();
    if(request.pending) return;

    let dataFromForm = [...formData].reduce( (prevValue, dataInput: InputDataType) => {
      return (
        {...prevValue, [dataInput.name]: dataInput.value}
      )
    }, {name: '', email: '', password: ''})

    dispatch( registerEnhance(dataFromForm) as any)
  }, [request.pending, formData, dispatch]);


  return (
    <main className={Styles.authContainer}>
      <section className={Styles.authContainer__block}>
        <div className={Styles.block__title}>
          <span>
            Регистрация
          </span>
        </div>

        <form 
          className={
            Styles.block__form + ' ' + 
            (isFailed ? Styles.block__form_failed : '')
          } 
          onSubmit={handleSubmit}
          style={{
            pointerEvents: request.pending ? 'none' : 'auto'
          }}
        >
          {
            formData.map( (dataInput : InputDataType) => (
              <label 
                key={dataInput.name}
                className={Styles.form__input}
              >
                {
                  dataInput.name === 'password' ?
                  <Input
                    type={ isPasswordHide ? dataInput.type : 'text' }
                    placeholder={ dataInput.placeholder }
                    onChange={ handleChangeOfInput }
                    icon={ isPasswordHide ? 'ShowIcon' : 'HideIcon' }
                    value={ dataInput.value }
                    name={ dataInput.name }
                    error={ isFailed }
                    onIconClick={ () => setIsPasswordHide( !isPasswordHide ) }
                  /> : 
                  <Input
                    type={ dataInput.type }
                    placeholder={ dataInput.placeholder }
                    onChange={ handleChangeOfInput }
                    value={ dataInput.value }
                    name={ dataInput.name }
                    error={ isFailed }
                    ref={ dataInput.name === 'name' ? nameInputRef : undefined }
                  />
                }
              </label>
            ))
          }

          <label className={Styles.form__hint}>
            <span> 
              {
                isFailed && "Такой пользователь уже существует"
              }
            </span>
          </label>
          <Button type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </form>

        <div className={Styles.block__addInfo}>
          <span className={Styles.addInfo__text}>
            Уже зарегистрированы?
          </span>
          <Link to='/login' className={Styles.addInfo__link}>
            Войти
          </Link>
        </div>
      </section>
    </main>
  );
})

export default Register;