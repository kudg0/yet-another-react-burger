import React from 'react';

// Redux
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { updateUserDataEnhance } from './../../../services/redux/enhances/';

// Types
import { 
  IReduxStore,
  TFormDataType,
  IInputDataType
} from './../../../services/types/';

// Components
import EditForm from './../../Forms/Edit/EditForm';

import styles from './editContent.module.scss'


const Edit: React.FC = () => {

  const dispatch = useDispatch();

  const user = useSelector( (store : IReduxStore) => store.user, shallowEqual);


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
    <div className={ styles.EditContent }>
      <EditForm
        dispatchCallbackFn={dispatcherHelper}
        formData={formData}
        setFormData={setFormData}
        defaultValueForPassword={defaultValueForPassword}
      />
    </div>
  );
};

export default React.memo(Edit);