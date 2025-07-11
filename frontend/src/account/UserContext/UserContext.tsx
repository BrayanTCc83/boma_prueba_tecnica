import { createContext, FormEventHandler, JSX, MouseEventHandler, useEffect, useState } from 'react';

import type { IUser, IUsersContext, IUsersContextProps } from './interfaces';

const initUsersContext: IUsersContext = {
    deleteUser: async () => {},
    editUser: async () => {},
    createUser: async () => {},
    getUser: async () => { return new Promise((res, _) => res({} as IUser)) },
    getUsers: async () => { return new Promise((res, _) => res([])) }
};

export const UsersContext = createContext<IUsersContext>(initUsersContext);

const UsersContextProvider = ({ children }: IUsersContextProps): JSX.Element => {
    const deleteUser = async (id: string) => {
        // Temporal hasta implementar base de datos y API
        console.log(`Eliminando usuario ${id}`);
    }

    const editUser = async (id: string, user: IUser) => {
        // Temporal hasta implementar base de datos y API
        console.log(`Editando usuario ${id} ${Object.entries(user).join(',')}`);
    }

    const createUser = async (user: IUser) => {
        // Temporal hasta implementar base de datos y API
        console.log(`Editando usuario ${Object.entries(user).join(',')}`);
    }

    const getUser = async (): Promise<IUser> => {
        // Temporal hasta implementar base de datos y API
        return new Promise(( res, _ ) => {
            return res({ id: '1', lastName: 'Snow', name: 'Jon', birth: '10-01-2003', country: 'Hidalgo', email: 'brayan.tellez.cruz.000@gmail.com', role: 0 });
        });
    }

    const getUsers = async (): Promise<IUser[]> => {
        // Temporal hasta implementar base de datos y API
        return new Promise(( res, _ ) => {
            return res([
                { id: '1', lastName: 'Snow', name: 'Jon', birth: '10-01-2003', country: 'Hidalgo', email: 'brayan.tellez.cruz.000@gmail.com', role: 0 },
                { id: '2', lastName: 'Lannister', name: 'Cersei', birth: '10-01-2003', country: 'Hidalgo', email: 'brayan.tellez.cruz.000@gmail.com', role: 0 },
                { id: '3', lastName: 'Lannister', name: 'Jaime', birth: '10-01-2003', country: 'Hidalgo', email: 'brayan.tellez.cruz.000@gmail.com', role: 0 },
                { id: '4', lastName: 'Stark', name: 'Arya', birth: '10-01-2003', country: 'Hidalgo', email: 'brayan.tellez.cruz.000@gmail.com', role: 0 },
                { id: '5', lastName: 'Targaryen', name: 'Daenerys', birth: '10-01-2003', country: 'Hidalgo', email: 'brayan.tellez.cruz.000@gmail.com', role: 0 },
                { id: '6', lastName: 'Melisandre', name: 'My name', birth: '10-01-2003', country: 'Hidalgo', email: 'brayan.tellez.cruz.000@gmail.com', role: 0 },
                { id: '7', lastName: 'Clifford', name: 'Ferrara', birth: '10-01-2003', country: 'Hidalgo', email: 'brayan.tellez.cruz.000@gmail.com', role: 0 },
                { id: '8', lastName: 'Frances', name: 'Rossini', birth: '10-01-2003', country: 'Hidalgo', email: 'brayan.tellez.cruz.000@gmail.com', role: 0 },
                { id: '9', lastName: 'Roxie', name: 'Harvey', birth: '10-01-2003', country: 'Hidalgo', email: 'brayan.tellez.cruz.000@gmail.com', role: 0 },
            ]);
        });
    }

    return (
        <UsersContext.Provider value={{
            deleteUser,
            editUser,
            getUser,
            getUsers,
            createUser
        }}>
            { children }
        </UsersContext.Provider>
    );
};

export default UsersContextProvider;