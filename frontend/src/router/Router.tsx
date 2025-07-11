import Login, { ROUTE_LOGIN } from '../auth/login/Login';
import Users, { ROUTE_USERS } from '../account/users/Users';
import Profile, { ROUTE_PROFILE } from '../account/profile/Profile';
import UserNew, { ROUTE_USER_NEW } from '../account/usersNew/UserNew';
import UserEdit, { ROUTE_USER_EDIT } from '../account/userEdit/UserEdit';
import UserDelete, { ROUTE_USER_DELETE } from '../account/userDelete/UserDelete';

import { JSX, useContext } from 'react';
import { createBrowserRouter, Navigate, } from 'react-router-dom';
import { SesionContext } from '../auth/SesionContext/SesionContext';
import UsersContextProvider from '../account/UserContext/UserContext';

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
    element: <UsersContextProvider>
      <Profile/>
    </UsersContextProvider>
  },
  {
    path: ROUTE_USERS,
    element: <UsersContextProvider>
      <Users/>
    </UsersContextProvider>,
    children: [
      {
        path: ROUTE_USER_NEW,
        element: <UserNew/>
      },
      {
        path: ROUTE_USER_EDIT,
        element: <UserEdit/>
      },
      {
        path: ROUTE_USER_DELETE,
        element: <UserDelete/>
      }
    ]
  }
]);

export default router;