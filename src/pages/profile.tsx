import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { ReduxStore } from './../services/types/';


const Profile = React.memo( () => {
  
  const navigate = useNavigate();

  const { user } = useSelector( (store : ReduxStore) => store.app, shallowEqual);
  const { request, accessToken } = user;


  React.useEffect(() => {
    if(!accessToken) return navigate("/login");
  }, [accessToken, request, navigate]);


  return (
    <>
      Привет <b>{user.name}</b>
      Вот твоя почта – {user.email}
    </>
  );
});

export default Profile;