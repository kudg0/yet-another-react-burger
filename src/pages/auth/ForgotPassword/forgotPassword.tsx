import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


import { remindPasswordEnhance } from './../../../services/enhances/';


import { 
  LocationType, 
  FormDataType,
} from './../../../services/types/';


import AuthForm from './../../../components/AuthForm/AuthForm';

import Styles from './../auth.module.scss';



const ForgotPassword = React.memo( () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [failedMessage, setFailedMessage] = React.useState("");

  const [formData, setFormData] = React.useState<FormDataType>([
    {  
      type: "email",
      name: "email",
      placeholder: "Укажите e-mail",
      value: '',
    }
  ]);



  const dispatcherHelper = React.useCallback((dataFromForm) => {
    dispatch( remindPasswordEnhance( dataFromForm ) as any)
      .then( ( result: { 
        "success": boolean, 
        "message": string 
      }) => {

        if(!result.success) return;

        return navigate("/reset-password", {
          state: {
            from: {
              pathname: "/forgot-password"
            }
          }
        });
      })
      .catch( ( error: Error) => { setFailedMessage(error.message) })
  }, [dispatch, setFailedMessage])



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
          textOnButton={"Восстановить"}
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