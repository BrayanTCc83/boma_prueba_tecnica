import Login, { ROUTE_LOGIN } from '../auth/login/Login';
import Users, { ROUTE_USERS } from '../account/users/Users';
import Profile, { ROUTE_PROFILE } from '../account/profile/Profile';

import { JSX, useContext } from 'react';
import { createBrowserRouter, Navigate, } from 'react-router-dom';
import { SesionContext } from '../auth/SesionContext/SesionContext';

const HandleRedirection = (): JSX.Element => {
    const sesion = useContext(SesionContext);
    
    return sesion.auth ? <Navigate to={ROUTE_PROFILE}/> : <Navigate to={ROUTE_LOGIN}/>;
};

const router = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: <HandleRedirection/>
  },
  {
    path: ROUTE_LOGIN,
    element: <Login/>
  },
  {
    path: ROUTE_PROFILE,
    element: <Profile/>
  },
  {
    path: ROUTE_USERS,
    element: <Users/>
  }
]);

export default router;