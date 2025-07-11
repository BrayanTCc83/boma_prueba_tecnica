import { Button, Checkbox, FormControl, FormControlLabel, Input, InputLabel } from '@mui/material';
import { JSX, useContext } from "react";
import './Login.css';
import { SesionContext } from "../SesionContext/SesionContext";
import { Navigate } from "react-router-dom";
import { ROUTE_PROFILE } from "../../account/profile/Profile";

export const ROUTE_LOGIN: string = '/login';

const Login = (): JSX.Element => {
    const { auth, login } = useContext(SesionContext);

    return (
        auth ? <Navigate to={ROUTE_PROFILE}/> :
        <main>
            <section>
                <img src='/office.jpg' alt='Imagen de oficina.'/>
            </section>
            <form id='login_form' name='login_form' onSubmit={login}>
                <h1>Inicio de Sesión</h1>
                <FormControl margin='normal'>
                    <InputLabel htmlFor='email'>Correo:</InputLabel>
                    <Input id='email' name='email' type='email' placeholder='correo@example.com'/>
                </FormControl>
                <FormControl margin='normal'>
                    <InputLabel htmlFor='password'>Contraseña:</InputLabel>
                    <Input id='password' name='password' type='password' placeholder='ThisIsMyPassword'/>
                </FormControl>
                <FormControlLabel
                    label='Manten mi sesión iniciada.'
                    control={
                        <Checkbox name='remember'/>
                    }
                />
                <Button type='submit' variant='contained'>Iniciar Sesión</Button>
                <Button type='reset' variant='outlined'>Cancelar</Button>
            </form>
        </main>
    );
}

export default Login;