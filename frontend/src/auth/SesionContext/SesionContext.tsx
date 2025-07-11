import { createContext, FormEventHandler, JSX, MouseEventHandler, useEffect, useState } from 'react';

import type { ISesionContext, ISesionContextProps } from './interfaces';

const initSesionContext: ISesionContext = {
    auth: false,
    login: () => {},
    logout: () => {},
    isSuperAdmin: async () => { return new Promise((res, _) => res(false)) }
};

export const SesionContext = createContext<ISesionContext>(initSesionContext);

const SesionContextProvider = ({ children }: ISesionContextProps): JSX.Element => {
    const [ auth, setAuth ] = useState<boolean>(false);

    const login: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        // Temporal hasta implementar base de datos y API
        if(data.get('email') && data.get('password')) {
            setAuth(true);
        }
    }

    const logout: MouseEventHandler<HTMLButtonElement> = (e) => {
        // Temporal hasta implementar base de datos y API
        setAuth(false);
    }

    const isSuperAdmin = async (): Promise<boolean> => {
        // Temporal hasta implementar base de datos y API
        return new Promise((res, _) => res(true));
    }

    useEffect(() => {
        // Temporal hasta implementar base de datos y API
        setAuth(false);
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