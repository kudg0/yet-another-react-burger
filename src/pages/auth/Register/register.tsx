import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


import { registerEnhance } from './../../../services/enhances/';


import { 
  LocationType, 
  FormDataType,
} from './../../../services/types/';


import AuthForm from './../../../components/AuthForm/AuthForm';

import Styles from './../auth.module.scss';



const Register = React.memo( () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [failedMessage, setFailedMessage] = React.useState("");

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



  const dispatcherHelper = React.useCallback((dataFromForm) => {
    dispatch( registerEnhance(dataFromForm) as any)
      .catch((error: Error) => setFailedMessage(error.message))
  }, [dispatch, setFailedMessage])



  return (
    <main className={Styles.authContainer}>
      <section className={Styles.authContainer__block}>
        <div className={Styles.block__title}>
          <span>
            Регистрация
          </span>
        </div>

        <AuthForm 
          dispatchCallbackFn={dispatcherHelper}
          formData={formData}
          setFormData={setFormData}
          failedMessage={failedMessage}
          textOnButton={"Зарегистрироваться"}
        />

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