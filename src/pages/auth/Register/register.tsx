import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';


import { ShowIcon, HideIcon } from '@ya.praktikum/react-developer-burger-ui-components';


import { registerEnhance } from './../../../services/enhances/registerEnhance';

import { ReduxStore } from './../../../services/types/';


import Styles from './register.module.scss';



const Register = React.memo( () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { request, refreshToken } = useSelector( (store : ReduxStore) => store.app.user, shallowEqual);
  
  const [isFailed, setIsFailed] = React.useState(false);
  const [isPasswordHide, setIsPasswordHide] = React.useState(true);

  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);




  React.useEffect( () => {
    if(!request.failed || !nameInputRef.current) return;
    
    setIsFailed(request.failed); nameInputRef.current.focus();

  }, [nameInputRef, request, setIsFailed])


  const handleSubmit : (e: React.FormEvent<HTMLFormElement>) => void  = React.useCallback((e) => {
    e.preventDefault();

    let form : HTMLFormElement = e.currentTarget,
        formData = new FormData(form);

    dispatch( registerEnhance(formData) as any)
      .then( (res : any)  => console.log(res))
      .catch( (error : Error)  => console.log(error));
  }, [dispatch]);

  const togglePasswordVisibility : (e: React.MouseEvent<HTMLElement>) => void = React.useCallback((e) => {
    if(!passwordInputRef.current) return;

    setIsPasswordHide(!isPasswordHide);

    isPasswordHide ? passwordInputRef.current.setAttribute("type", "text") : passwordInputRef.current.setAttribute("type", "password")
  }, [setIsPasswordHide, isPasswordHide]);


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
          <label className={Styles.form__input}>
            <input 
              name='name' 
              type='text' 
              placeholder="Имя"
              ref={nameInputRef}
              onInput={() => setIsFailed(false)}
              required
            />
          </label>
          <label className={Styles.form__input}>
            <input 
              name='email' 
              type='email' 
              placeholder="E-mail"
              onInput={() => setIsFailed(false)}
              required
            />
          </label>
          <label className={Styles.form__input}>
            <input 
              name='password' 
              type='password' 
              placeholder="Пароль"
              ref={passwordInputRef}
              onInput={() => setIsFailed(false)}
              required
            />
            <div 
              className={
                Styles.input__show + ' ' + 
                (isPasswordHide ? Styles.input__show_hide : '')
              } 
              onClick={togglePasswordVisibility}
            >
              <ShowIcon type="primary" />
              <HideIcon type="primary" />
            </div>
          </label>
        
          <label className={Styles.form__hint}>
            <span> 
              {
                isFailed && "Такой пользователь уже существует"
              }
            </span>
          </label>
          <button className={Styles.form__button}>
            <span>
              Зарегистрироваться
            </span>
          </button>
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