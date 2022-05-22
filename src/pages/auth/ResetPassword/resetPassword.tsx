import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';


import { resetPasswordEnhance } from './../../../services/enhances/';


import { 
  LocationType, 
  FormDataType,
} from './../../../services/types/';


import AuthForm from './../../../components/AuthForm/AuthForm';

import Styles from './../auth.module.scss';



const ForgotPassword = React.memo( () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation() as LocationType;


  const [failedMessage, setFailedMessage] = React.useState("");


  const [formData, setFormData] = React.useState<FormDataType>([
    {  
      type: "password",
      name: "password",
      placeholder: "Введите новый пароль",
      value: '',
    },
    {  
      type: "text",
      name: "token",
      placeholder: "Введите код из письма",
      value: '',
    },
  ]);



  React.useEffect(() => {
    const from = location.state?.from?.pathname || '/';

    if(from !== '/forgot-password') return navigate("/forgot-password");
  }, [navigate, location]);
  

  const dispatcherHelper = React.useCallback((dataFromForm) => {

    dispatch( resetPasswordEnhance(dataFromForm) as any)
      .then( () => {
        return navigate("/login", {
          state: {
            from: {
              pathname: "/forgot-password"
            }
          }
        });
      })
      .catch( (error : any) => { setFailedMessage(error.message) })
  }, [dispatch, navigate, setFailedMessage]);



  return (
    <main className={Styles.authContainer}>
      <section className={Styles.authContainer__block}>
        <div className={Styles.block__title}>
          <span>
            Восстановление пароля
          </span>
        </div>
        
        <AuthForm 
          dispatchCallbackFn={dispatcherHelper}
          formData={formData}
          setFormData={setFormData}
          failedMessage={failedMessage}
          textOnButton={"Сохранить"}
        />

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