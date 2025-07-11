import Header from '../components/Header/Header';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { DataGrid } from '@mui/x-data-grid';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { IUser } from '../UserContext/interfaces';
import { IconButton, Paper } from '@mui/material';
import { ROUTE_USER_NEW } from '../usersNew/UserNew';
import { UsersContext } from '../UserContext/UserContext';
import { JSX, useContext, useEffect, useState } from 'react';

import './Users.css'
import columns from './config';
import { SesionContext } from '../../auth/SesionContext/SesionContext';
import { ROUTE_PROFILE } from '../profile/Profile';

export const ROUTE_USERS: string = '/users';

const paginationModel = { page: 0, pageSize: 10 };

const Users = (): JSX.Element => {
    const { isSuperAdmin } = useContext(SesionContext);
    const [ superAdmin, setSuperAdmin ] = useState<boolean>(true);

    const { getUsers } = useContext(UsersContext);
    const [ rows, setRows ] = useState<IUser[]>([]);
    
    const navigate = useNavigate();

    useEffect(()=> {
        isSuperAdmin()
            .then( res => setSuperAdmin(res) )
            .catch( _ => navigate(ROUTE_PROFILE) );
        getUsers()
            .then( users => setRows(users) )
            .catch( err => console.log(err) );
    }, []);

    return (
        !superAdmin ? <Navigate to={ROUTE_PROFILE}/> : 
        <>
            <Header/>
            <main id='users'>
                <div className='flex'>
                    <h1>Lista de Usuarios</h1>
                    <Link to={ROUTE_USER_NEW}>
                        <IconButton>
                            <PersonAddIcon color='success'/>
                            <span>Agregar Usuario</span>
                        </IconButton>
                    </Link>
                </div>
                <Paper sx={{ height: '600px' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[10, 20]}
                        sx={{ border: 0 }}
                    />
                </Paper>
            </main>
            <Outlet />
        </>
    );
};

export default Users;