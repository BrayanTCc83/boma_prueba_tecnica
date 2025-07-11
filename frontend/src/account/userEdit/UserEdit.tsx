import UserForm from '../components/UserForm/UserForm';

import { ROUTE_USERS } from '../users/Users';
import { IUser, Role } from '../UserContext/interfaces';
import { UsersContext } from '../UserContext/UserContext';
import { FormEventHandler, JSX, useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const ROUTE_USER_EDIT: string = '/users/:id/edit';

const UserEdit = (): JSX.Element => {
    const location = useLocation();
    const navigate = useNavigate();

    const { id } = useParams();
    const { editUser } = useContext(UsersContext);

    const handleEdit:FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const data = new FormData(e.target as HTMLFormElement);
        if(data.get('email') && data.get('birth') && data.get('country') && data.get('lastName') && data.get('name')) {
            const user: IUser = {
                id: id??'',
                email: data.get('email') as string,
                birth: data.get('birth') as string,
                country: data.get('country') as string,
                lastName: data.get('lastName') as string,
                name: data.get('name') as string,
                role: Number(data.get('role')) as Role
            };

            editUser(id??'', user)
                .then( () => navigate(ROUTE_USERS) )
                .catch( _ => {})
        } else {
            alert('Datos faltantes.')
        }
    };

    const user = location.state?.user;

    return (
        <UserForm title='Editar Usuario' submitMessage='Editar' data={user} onSubmit={handleEdit}/>
    );
};

export default UserEdit;