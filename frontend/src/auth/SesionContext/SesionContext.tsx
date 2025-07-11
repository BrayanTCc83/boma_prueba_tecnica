import { createContext, JSX } from 'react';

import type { ISesionContext, ISesionContextProps } from './interfaces';

const initSesionContext: ISesionContext = {
    auth: false
};

export const SesionContext = createContext<ISesionContext>(initSesionContext);

const SesionContextProvider = ({ children }: ISesionContextProps): JSX.Element => {
    return (
        <SesionContext.Provider value={initSesionContext}>
            { children }
        </SesionContext.Provider>
    );
};

export default SesionContextProvider;