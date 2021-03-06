import React from 'react';

// Redux
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { updateUserDataEnhance } from './../../services/redux/enhances/';

// Ya imports
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

// Types
import { 
  IReduxStore,
  TFormDataType,
  IInputDataType
} from './../../services/types/';

// Components
import EditForm from './../../components/Forms/Edit/EditForm';

// Styles
import Styles from './edit.module.scss';



const Edit = React.memo( () => {

  const dispatch = useDispatch();

  const user = useSelector( (store : IReduxStore) => store.user, shallowEqual);
  const { request } = user;



  const defaultValueForPassword = '**********';

  const [formData, setFormData] = React.useState<TFormDataType>([
    {  
      type: "text",
      name: "name",
      placeholder: "Имя",
      value: '',
    },
    {  
      type: "email",
      name: "email",
      placeholder: "Логин",
      value: '',
    },
    {  
      type: "password",
      name: "password",
      placeholder: "Пароль",
      value: defaultValueForPassword,
    },
  ]);


  React.useEffect(() => {
    const newState = [...formData].map( (dataInput: IInputDataType) => {
      return (
        dataInput.name === 'password' ? 
          {...dataInput} : {...dataInput, value: user.data[dataInput.name as 'name' | 'email'] || dataInput.value}
      )
    });

    setFormData( newState );
  }, [user.data.name, user.data.email, setFormData])
  
  
  const dispatcherHelper = React.useCallback((dataFromForm) => {

    dispatch( updateUserDataEnhance(dataFromForm) as any )
  }, [dispatch]);



  return (
    <EditForm
      dispatchCallbackFn={dispatcherHelper}
      formData={formData}
      setFormData={setFormData}
      defaultValueForPassword={defaultValueForPassword}
    />
  );
});

export default Edit;