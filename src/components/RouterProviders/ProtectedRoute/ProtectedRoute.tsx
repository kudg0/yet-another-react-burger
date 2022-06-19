import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';


import { ILocationType, IReduxStore } from './../../../services/types/';

import { getCookie } from './../../../services/utils/helpers/workWithCookie';



interface IProtectedRouteComponent {
  outlet: React.ReactElement;
};

const ProtectedRoute: React.FunctionComponent<IProtectedRouteComponent> = React.memo(({ outlet }) => {

  const location = useLocation() as ILocationType;


  const user = useSelector((store: IReduxStore) => store.user, shallowEqual);
  const accessToken = user.data.accessToken || getCookie('accessToken');

  const from = location.pathname.includes('logout') ? '/profile' : location.pathname;



  if (!accessToken) return (
    <Navigate
      to={{ pathname: "/login" }}
      state={{ from: { pathname: from } }}
    />
  )

  return outlet;
});

export default ProtectedRoute;