import { createContext, FormEventHandler, JSX, MouseEventHandler, useEffect, useState } from 'react';

import type { IStatus, IUser, IUsersContext, IUsersContextProps } from './interfaces';

const initUsersContext: IUsersContext = {
    deleteUser: async () => {},
    editUser: async () => {},
    createUser: async () => {},
    getUser: async () => { return new Promise((res, _) => res({} as IUser)) },
    getUsers: async () => { return new Promise((res, _) => res([])) },
    status: { message: '', success: true }
};

const FetchConfiguration: RequestInit = {
    credentials: 'include',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

export const UsersContext = createContext<IUsersContext>(initUsersContext);

const UsersContextProvider = ({ children }: IUsersContextProps): JSX.Element => {
    const [ status, setStatus ] = useState<IStatus>({ message: '', success: true });

    const deleteUser = async (id: string) => {
        fetch(`${import.meta.env.VITE_API_URL}/admin/users/${id}`, {
            ...FetchConfiguration,
            method: 'DELETE'
        })
            .then( res => {
                if(!res.ok) throw res;
                return res.json();
            })
            .then( json => {
                setStatus(_ => ({
                    message: json.message,
                    success: true
                }));
            })
            .catch(err => {
                setStatus(_ => ({
                    message: err.message,
                    success: false
                }));
            });
    }

    const editUser = async (id: string, user: IUser) => {
        fetch(`${import.meta.env.VITE_API_URL}/admin/users/${id}`, {
            ...FetchConfiguration,
            method: 'PATCH',
            body: JSON.stringify(user)
        })
            .then( res => {
                if(!res.ok) throw res;
                return res.json();
            })
            .then( json => {
                setStatus(_ => ({
                    message: json.message,
                    success: true
                }));
            })
            .catch(err => {
                setStatus(_ => ({
                    message: err.message,
                    success: false
                }));
            });
    }

    const createUser = async (user: IUser) => {
        fetch(`${import.meta.env.VITE_API_URL}/admin/users`, {
            ...FetchConfiguration,
            method: 'POST',
            body: JSON.stringify(user)
        })
            .then( res => {
                if(!res.ok) throw res;
                return res.json();
            })
            .then( json => {
                setStatus(_ => ({
                    message: json.message,
                    success: true
                }));
            })
            .catch(err => {
                setStatus(_ => ({
                    message: err.message,
                    success: false
                }));
            });
    }

    const getUser = async (): Promise<IUser|null> => {
        return fetch(`${import.meta.env.VITE_API_URL}/session/user`, {
            ...FetchConfiguration,
            method: 'GET'
        })
            .then( res => {
                if(!res.ok) throw res.statusText;
                return res.json();
            })
            .then( json => {
                return json.user as IUser;
            } )
            .catch(_ => {
                return null;
            });
    }

    const getUsers = async (): Promise<IUser[]> => {
        return fetch(`${import.meta.env.VITE_API_URL}/admin/users`, {
            ...FetchConfiguration,
            method: 'GET',
        })
            .then( res => {
                if(!res.ok) throw res;
                return res.json();
            })
            .then( json => {
                return json.users as IUser[];
            })
            .catch(_ => {
                return [];
            });
    }

    useEffect(() => {
        if(status.message?.length > 0) {
            setTimeout(() => {
                setStatus(_ => ({
                    message: '',
                    success: true
                }));
            }, 5000);
        }
    }, [ status ]);

    return (
        <UsersContext.Provider value={{
            deleteUser,
            editUser,
            getUser,
            getUsers,
            createUser,
            status
        }}>
            { children }
        </UsersContext.Provider>
    );
};

export default UsersContextProvider;