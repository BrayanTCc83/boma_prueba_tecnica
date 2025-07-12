import { createContext, FormEventHandler, JSX, MouseEventHandler, useEffect, useState } from 'react';

import type { ISesionContext, ISesionContextProps } from './interfaces';

const initSesionContext: ISesionContext = {
    auth: false,
    login: () => {},
    logout: () => {},
    isSuperAdmin: async () => { return new Promise((res, _) => res(false)) }
};

const FetchConfiguration: RequestInit = {
    credentials: 'include',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

export const SesionContext = createContext<ISesionContext>(initSesionContext);
const SesionContextProvider = ({ children }: ISesionContextProps): JSX.Element => {
    const [ auth, setAuth ] = useState<boolean>(false);

    const login: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        fetch(`${import.meta.env.VITE_API_URL}/login`, {
            ...FetchConfiguration,
            method: 'POST',
            body: JSON.stringify({
                email: data.get('email'),
                password: data.get('password'),
                remember: data.get('remember') === 'on'
            })
        })
            .then( res => {
                if(!res.ok) throw res.statusText;
                setAuth(true);
            })
            .catch(_ => {
                setAuth(false);
            });
    }

    const logout: MouseEventHandler<HTMLButtonElement> = (e) => {
        fetch(`${import.meta.env.VITE_API_URL}/session/logout`, {
            ...FetchConfiguration,
            method: 'DELETE'
        })
            .then( res => {
                if(!res.ok) throw res.statusText;
                setAuth(false);
            })
            .catch(_ => {
                setAuth(true);
            });
    }

    const isSuperAdmin = async (): Promise<boolean> => {
        return fetch(`${import.meta.env.VITE_API_URL}/session/is-admin`, {
            ...FetchConfiguration,
            method: 'GET'
        })
            .then( res => {
                if(!res.ok) throw res.statusText;
                return true;
            })
            .catch(_ => {
                return false;
            });
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/session/user`, {
            ...FetchConfiguration,
            method: 'GET'
        })
            .then( res => {
                if(!res.ok) throw res.statusText;
                setAuth(true);
            })
            .catch(_ => {
                setAuth(false);
            });
    }, []);

    return (
        <SesionContext.Provider value={{
            auth,
            login,
            logout,
            isSuperAdmin
        }}>
            { children }
        </SesionContext.Provider>
    );
};

export default SesionContextProvider;