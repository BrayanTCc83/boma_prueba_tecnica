import Header from '../components/Header/Header';

import { JSX, useContext, useEffect, useState } from 'react';
import { IUser } from '../UserContext/interfaces';
import { UsersContext } from '../UserContext/UserContext';

import './Profile.css';

export const ROUTE_PROFILE: string = '/profile';

const Profile = (): JSX.Element => {
    const { getUser } = useContext(UsersContext);
    const [ data, setData ] = useState<IUser>({
        birth: '',
        country: '',
        email: '',
        id: '',
        lastName: '',
        name: '',
        role: 0
    });

    useEffect(() => {
        getUser()
            .then( data => setData(_ => data) )
            .catch( err => console.log(err) );
    }, []);

    return (
        <>
            <Header/>
            <main id='profile'>
                <h1>Perfil</h1>
                <section id='image'>
                    <img src='/office.jpg' alt='Imagen de oficina.'/>
                </section>
                <aside id='data'>
                    <h2>{data.name} {data.lastName}</h2>
                    <span><b>Fecha de nacimiento:</b> {data.birth}</span><br/>
                    <span><b>Estado:</b> {data.country}</span><br/>
                    <span><b>Correo:</b> {data.email}</span><br/>
                </aside>
            </main>
        </>
    );
};

export default Profile;