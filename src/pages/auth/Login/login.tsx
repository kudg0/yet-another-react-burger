import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


import { loginEnhance } from './../../../services/enhances/';


import { 
  ILocationType, 
  TFormDataType,
} from './../../../services/types/';


import AuthForm from './../../../components/AuthForm/AuthForm';

import Styles from './../auth.module.scss';



const Login = React.memo( () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [failedMessage, setFailedMessage] = React.useState("");

  const [formData, setFormData] = React.useState<TFormDataType>([
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



  const dispatcherHelper = React.useCallback((dataFromForm) => {
    dispatch( loginEnhance(dataFromForm) as any)
      .catch( ( error: Error) => { setFailedMessage(error.message) })
  }, [dispatch, setFailedMessage])



  return (
    <main className={Styles.authContainer}>
      <section className={Styles.authContainer__block}>
        <div className={Styles.block__title}>
          <span>
            Вход
          </span>
        </div>

        <AuthForm 
          dispatchCallbackFn={dispatcherHelper}
          formData={formData}
          setFormData={setFormData}
          failedMessage={"Неверные данные для входа"}
          textOnButton={"Войти"}
        />

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