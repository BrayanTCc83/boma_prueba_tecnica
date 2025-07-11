import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import { useContext, useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { ROUTE_USERS } from '../../users/Users';
import { Link, Navigate, redirect } from 'react-router-dom';
import { ROUTE_PROFILE } from '../../profile/Profile';
import { SesionContext } from '../../../auth/SesionContext/SesionContext';

import './Header.css';
import { ROUTE_LOGIN } from '../../../auth/login/Login';

const Header = () => {
    const { auth, logout, isSuperAdmin } = useContext(SesionContext);
    const [ superAdmin, setSuperAdmin ] = useState<boolean>(false);

    useEffect(() => {
        isSuperAdmin()
            .then( res => setSuperAdmin(res) )
            .catch( _ => {} );
    }, []);

    return (
        !auth ? <Navigate to={ROUTE_LOGIN}/> :
        <header>
            <nav>
                <ul>
                    <li>
                        <IconButton onClick={logout}>
                            <LogoutIcon/>
                            <span>Cerrar Sesión</span>
                        </IconButton>
                    </li>
                    {
                        superAdmin ? 
                        <li>
                            <Link to={ROUTE_USERS}>
                                <IconButton>
                                    <PeopleAltIcon/>
                                    <span>Usuarios</span>
                                </IconButton>
                            </Link>
                        </li> : null
                    }
                    <li>
                        <Link to={ROUTE_PROFILE}>
                            <IconButton onClick={() => redirect(ROUTE_PROFILE)}>
                                <PersonIcon/>
                                <span>Perfil</span>
                            </IconButton>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;