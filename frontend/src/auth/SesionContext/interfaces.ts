import { FormEventHandler, MouseEventHandler, PropsWithChildren } from 'react';

export interface ISesionContextProps extends PropsWithChildren {

};

export interface ISesionContext {
    auth: boolean
    login: FormEventHandler<HTMLFormElement>
    logout: MouseEventHandler<HTMLButtonElement>
    isSuperAdmin: () => Promise<boolean>
};