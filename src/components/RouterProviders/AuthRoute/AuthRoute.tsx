import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';


import { ILocationType, IReduxStore } from './../../../services/types/';

import { getCookie } from './../../../services/utils/helpers/workWithCookie';



interface IAuthRouteComponent {
  outlet: React.ReactElement;
};

const AuthRoute: React.FunctionComponent<IAuthRouteComponent> = React.memo(({ outlet }) => {

  const location = useLocation() as ILocationType;


  const user = useSelector((store: IReduxStore) => store.user, shallowEqual);
  const accessToken = user.data.accessToken || getCookie('accessToken');

  const from = location.state?.from?.pathname || '/';



  if (accessToken) return (
    <Navigate
      to={{ pathname: from }}
      state={{ from: { pathname: location.pathname } }}
    />
  )

  return outlet;
});

export default AuthRoute;