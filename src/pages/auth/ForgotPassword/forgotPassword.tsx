import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';


import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';


import { remindPasswordEnhance } from './../../../services/enhances/';

import { 
  ReduxStore,
  FormDataType,
  InputDataType,
} from './../../../services/types/';


import Styles from './../auth.module.scss';



const ForgotPassword = React.memo( () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector( (store : ReduxStore) => store.user, shallowEqual);
  const { request } = user;
  
  const [isFailed, setIsFailed] = React.useState(false);
  const [isFailedMessage, setIsFailedMessage] = React.useState("");

  const emailInputRef = React.useRef<HTMLInputElement>(null);

  const [formData, setFormData] = React.useState<FormDataType>([
    {  
      type: "email",
      name: "email",
      placeholder: "Укажите e-mail",
      value: '',
    }
  ]);



  React.useEffect( () => {
    if(!request.failed || !emailInputRef.current) return;
    
    setIsFailed(true); emailInputRef.current.focus();

  }, [request, setIsFailed])



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
    }, {email: ''})

    dispatch( remindPasswordEnhance( dataFromForm ) as any)
      .then( ( result: { 
        "success": boolean, 
        "message": string 
      }) => {

        if(!result) return;

        return navigate("/reset-password", {
          state: {
            from: {
              pathname: "/forgot-password"
            }
          }
        });
      })
      .catch( ( error: Error) => { setIsFailed(true); setIsFailedMessage(error.message) })
  }, [request.pending, formData, dispatch, navigate, setIsFailed, setIsFailedMessage]);



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
          {
            formData.map( (dataInput : InputDataType) => (
              <label 
                key={dataInput.name}
                className={Styles.form__input}
              >
                {
                  <Input
                    type={ dataInput.type }
                    placeholder={ dataInput.placeholder }
                    onChange={ handleChangeOfInput }
                    value={ dataInput.value }
                    name={ dataInput.name }
                    error={ isFailed }
                    ref={ emailInputRef }
                  />
                }
              </label>
            ))
          }

          <label className={Styles.form__hint}>
            <span> 
              {
                isFailed && isFailedMessage
              }
            </span>
          </label>
          <Button type="primary" size="medium">
            Восстановить
          </Button>
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