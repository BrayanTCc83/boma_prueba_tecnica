import { JSX, useContext } from 'react';
import { Link, Navigate, redirect, useNavigate, useParams } from 'react-router-dom';
import { ROUTE_USERS } from '../users/Users';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { UsersContext } from '../UserContext/UserContext';

export const ROUTE_USER_DELETE: string = '/users/:id/delete';

const UserDelete = (): JSX.Element => {
    const navigate = useNavigate();

    const { id } = useParams();
    const { deleteUser } = useContext(UsersContext);

    const handleDelete = () => {
        deleteUser(id??'')
            .then( () => navigate(ROUTE_USERS) )
            .catch( _ => {})
    };

    return (
        !id ? <Navigate to={ROUTE_USERS}/> :
        <Dialog open>
            <DialogTitle>Confirmación de eliminación.</DialogTitle>
            <DialogContent>¿Está seguro de querer eliminar al usuario con ID '{id}'?</DialogContent>
            <DialogActions>
                <Button onClick={handleDelete} variant='outlined'>Confirmar</Button>
                <Link to={ROUTE_USERS}>
                    <Button>Cancelar</Button>
                </Link>
            </DialogActions>
        </Dialog>
    );
};

export default UserDelete;