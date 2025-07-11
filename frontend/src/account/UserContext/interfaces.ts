import { PropsWithChildren } from 'react';

export type Role = 0 | 1;

export interface IUser {
    id: string
    email: string
    name: string
    lastName: string
    birth: string
    country: string
    role: Role
}

export interface IUserRegister extends IUser {
    password: string
}

export interface IUsersContextProps extends PropsWithChildren {

};

export interface IUsersContext {
    getUsers: () => Promise<IUser[]>
    getUser: () => Promise<IUser>
    editUser: (id: string, user: IUser) => Promise<void>
    createUser: (user: IUser) => Promise<void>
    deleteUser: (id: string) => Promise<void>
};