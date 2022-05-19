import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';


import { ShowIcon, HideIcon } from '@ya.praktikum/react-developer-burger-ui-components';


import { loginEnhance } from './../../../services/enhances/loginEnhance';

import { ReduxStore } from './../../../services/types/';


import Styles from './../auth.module.scss';


const Login = React.memo( () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { request, refreshToken } = useSelector( (store : ReduxStore) => store.app.user, shallowEqual);
  
  const [isFailed, setIsFailed] = React.useState(false);
  const [isPasswordHide, setIsPasswordHide] = React.useState(true);

  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);




  React.useEffect( () => {
    if(!request.failed || !emailInputRef.current) return;
    
    setIsFailed(true); emailInputRef.current.focus();

  }, [request, setIsFailed])



  const handleSubmit : (e: React.FormEvent<HTMLFormElement>) => void  = React.useCallback((e) => {
    e.preventDefault();

    let form : HTMLFormElement = e.currentTarget,
        formData = new FormData(form);

    dispatch( loginEnhance(formData) as any)
  }, [dispatch]);

  const togglePasswordVisibility : (e: React.MouseEvent<HTMLElement>) => void = React.useCallback((e) => {
    if(!passwordInputRef.current) return;

    setIsPasswordHide(!isPasswordHide);

    isPasswordHide ? passwordInputRef.current.setAttribute("type", "text") : passwordInputRef.current.setAttribute("type", "password")
  }, [setIsPasswordHide, isPasswordHide]);


  React.useEffect(() => {
    if(refreshToken) return navigate("/");
  }, [refreshToken, navigate]);



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
          onSubmit={handleSubmit}
          style={{
            pointerEvents: request.pending ? 'none' : 'auto'
          }}
        >
          <label className={Styles.form__input}>
            <input 
              name='email' 
              type='email' 
              placeholder="E-mail"
              ref={emailInputRef}
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
                isFailed && "Неверные данные для входа"
              }
            </span>
          </label>
          <button className={Styles.form__button}>
            <span>
              Войти
            </span>
          </button>
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