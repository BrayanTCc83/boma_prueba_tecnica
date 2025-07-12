import columns from './config';
import Header from '../components/Header/Header';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { DataGrid } from '@mui/x-data-grid';
import { IUser } from '../UserContext/interfaces';
import { ROUTE_PROFILE } from '../profile/Profile';
import { ROUTE_USER_NEW } from '../usersNew/UserNew';
import { UsersContext } from '../UserContext/UserContext';
import { JSX, useContext, useEffect, useState } from 'react';
import { Alert, AlertTitle, IconButton, Paper } from '@mui/material';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { SesionContext } from '../../auth/SesionContext/SesionContext';

import './Users.css'

export const ROUTE_USERS: string = '/users';

const Users = (): JSX.Element => {
    const { isSuperAdmin } = useContext(SesionContext);
    const [ superAdmin, setSuperAdmin ] = useState<boolean>(true);

    const { getUsers, status } = useContext(UsersContext);
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

    useEffect(() => {
        console.log(status);
        if(status.success && status.message?.length > 0){
            getUsers()
                .then( users => setRows(users) )
                .catch( err => console.log(err) );
        }
    }, [ status ]);

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
                        pageSizeOptions={[ rows.length ]}
                        sx={{ border: 0 }}
                    />
                </Paper>
            </main>
            <Outlet/>
            {
                status.message?.length > 0 ?
                    <Alert>
                        <AlertTitle>{status.message}</AlertTitle>
                    </Alert>
                : null
            }
        </>
    );
};

export default Users;