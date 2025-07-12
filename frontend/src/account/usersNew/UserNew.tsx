import { ROUTE_USERS } from '../users/Users';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm/UserForm';
import { IUser, Role } from '../UserContext/interfaces';
import { UsersContext } from '../UserContext/UserContext';
import { FormEventHandler, JSX, useContext } from 'react';

export const ROUTE_USER_NEW: string = '/users/new';

const UserNew = (): JSX.Element => {
    const navigate = useNavigate();

    const { createUser } = useContext(UsersContext);

    const handleCreate:FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const data = new FormData(e.target as HTMLFormElement);
        if(data.get('email') && data.get('birth') && data.get('country') && data.get('lastName') && data.get('name')) {
            const user: IUser = {
                id: '',
                email: data.get('email') as string,
                password: data.get('password') as string,
                birth: data.get('birth') as string,
                country: data.get('country') as string,
                lastName: data.get('lastName') as string,
                name: data.get('name') as string,
                role: Number(data.get('role')) as Role
            };

            createUser(user)
                .then( () => navigate(ROUTE_USERS) )
                .catch( _ => {})
        } else {
            alert('Datos faltantes.')
        }
    };

    return (
        <UserForm title='Nuevo Usuario' submitMessage='Crear' onSubmit={handleCreate} password={true}/>
    );
};

export default UserNew;