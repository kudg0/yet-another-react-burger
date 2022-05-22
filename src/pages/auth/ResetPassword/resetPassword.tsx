import React from 'react';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';


import { ShowIcon, HideIcon } from '@ya.praktikum/react-developer-burger-ui-components';


import { resetPasswordEnhance } from './../../../services/enhances/';

import { LocationType, ReduxStore } from './../../../services/types/';


import Styles from './../auth.module.scss';



const ForgotPassword = React.memo( () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation() as LocationType;


  const user = useSelector( (store : ReduxStore) => store.user, shallowEqual);
  const { request } = user;
  
  const [isFailed, setIsFailed] = React.useState(false);
  const [isPasswordHide, setIsPasswordHide] = React.useState(true);

  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);



  React.useEffect( () => {
    if(!request.failed || !emailInputRef.current) return;
    
    setIsFailed(true); emailInputRef.current.focus();

  }, [request.failed, emailInputRef, setIsFailed])



  const handleSubmit : (e: React.FormEvent<HTMLFormElement>) => void  = React.useCallback((e) => {
    e.preventDefault();

    let form : HTMLFormElement = e.currentTarget,
        formData = new FormData(form);

    dispatch( resetPasswordEnhance(formData) as any)
  }, [dispatch]);

  const togglePasswordVisibility : (e: React.MouseEvent<HTMLElement>) => void = React.useCallback((e) => {
    if(!passwordInputRef.current) return;

    setIsPasswordHide(!isPasswordHide);

    isPasswordHide ? passwordInputRef.current.setAttribute("type", "text") : passwordInputRef.current.setAttribute("type", "password")
  }, [setIsPasswordHide, isPasswordHide]);




  React.useEffect(() => {
    const from = location.state?.from?.pathname || '/';

    if(from !== '/forgot-password') return navigate("/forgot-password");
  }, [navigate, location])



  return (
    <main className={Styles.authContainer}>
      <section className={Styles.authContainer__block}>
        <div className={Styles.block__title}>
          <span>
            Восстановление пароля
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
              name='password' 
              type='password' 
              placeholder="Введите новый пароль"
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
          <label className={Styles.form__input}>
            <input 
              name='token' 
              type='text' 
              placeholder="Введите код из письма"
              ref={emailInputRef}
              onInput={() => setIsFailed(false)}
              required
            />
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
              Сохранить
            </span>
          </button>
        </form>

        <div className={Styles.block__addInfo}>
          <span className={Styles.addInfo__text}>
            Вспомнили пароль?
          </span>
          <Link to='/login' className={Styles.addInfo__link}>
            Войти
          </Link>
        </div>
      </section>
    </main>
  );
})

export default ForgotPassword;