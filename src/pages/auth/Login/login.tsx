import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';


import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';


import { loginEnhance } from './../../../services/enhances/';

import { 
  LocationType, 
  ReduxStore,
  FormDataType,
  InputDataType,
} from './../../../services/types/';


import Styles from './../auth.module.scss';





const Login = React.memo( () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation() as LocationType;


  const user = useSelector( (store : ReduxStore) => store.user, shallowEqual);
  const { request } = user;
  

  const [isFailed, setIsFailed] = React.useState(false);
  const [isPasswordHide, setIsPasswordHide] = React.useState(true);

  const emailInputRef = React.useRef<HTMLInputElement>(null);

  const [formData, setFormData] = React.useState<FormDataType>([
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
    if(!request.failed || !emailInputRef.current) return;
    
    setIsFailed(true); emailInputRef.current.focus();

  }, [request.failed, emailInputRef, setIsFailed])


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
    }, {email: '', password: ''})

    dispatch( loginEnhance(dataFromForm) as any)
  }, [request.pending, formData, dispatch]);



  return (
    <main className={Styles.authContainer}>
      <section className={Styles.authContainer__block}>
        <div className={Styles.block__title}>
          <span>
            Вход
          </span>
        </div>
        <form 
          className={
            Styles.block__form + ' ' + 
            (isFailed ? Styles.block__form_failed : '')
          } 
          onSubmit={ handleSubmit }
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
                    ref={emailInputRef}
                  />
                }
              </label>
            ))
          }

          <label className={Styles.form__hint}>
            <span> 
              {
                isFailed && "Неверные данные для входа"
              }
            </span>
          </label>
          <Button type="primary" size="medium">
            Войти
          </Button>
        </form>

        <div className={Styles.block__addInfo}>
          <span className={Styles.addInfo__text}>
            Вы — новый пользователь?
          </span>
          <Link to='/register' className={Styles.addInfo__link}>
            Зарегистрироваться
          </Link>
        </div>
        <div className={Styles.block__addInfo}>
          <span className={Styles.addInfo__text}>
            Забыли пароль?
          </span>
          <Link to='/forgot-password' className={Styles.addInfo__link}>
            Восстановить пароль
          </Link>
        </div>
      </section>
    </main>
  );
})

export default Login;