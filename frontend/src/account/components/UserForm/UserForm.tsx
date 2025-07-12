import { Link } from 'react-router-dom';
import { FormEventHandler, JSX, useEffect, useState } from 'react';
import { ROUTE_USERS } from '../../users/Users';
import { IUser, Role } from '../../UserContext/interfaces';
import { Button, Dialog, FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface IUserFormProps {
    title: string
    submitMessage: string
    data?: IUser
    password?: boolean
    onSubmit: FormEventHandler<HTMLFormElement>
}

const UserForm = ({ title, data, submitMessage, onSubmit, password = false}: IUserFormProps): JSX.Element => {
  const [formData, setFormData] = useState<IUser>({
    id: '',
    email: '',
    name: '',
    lastName: '',
    country: '',
    birth: '',
    role: 0,
    ...( password ? {password: ''} : {})
  });

  useEffect(() => {
    if (data) {
      setFormData(prev => ({
        ...prev,
        ...data,
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleChangeSelect = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value) as Role,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Dialog open>
      <form onSubmit={handleSubmit}>
        <h1>{title}</h1>

        <FormControl margin='normal'>
          <InputLabel htmlFor='email'>Correo:</InputLabel>
          <Input
            id='email'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='correo@example.com'
          />
        </FormControl>

        {
          password ? 
            <FormControl margin='normal'>
              <InputLabel htmlFor='password'>Contraseña:</InputLabel>
              <Input
                id='password'
                name='password'
                type='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='unacontraseña'
              />
            </FormControl>
          : null
        }

        <FormControl margin='normal'>
          <InputLabel htmlFor='name'>Nombre:</InputLabel>
          <Input
            id='name'
            name='name'
            type='text'
            value={formData.name}
            onChange={handleChange}
            placeholder='Rubén'
          />
        </FormControl>

        <FormControl margin='normal'>
          <InputLabel htmlFor='lastName'>Apellidos:</InputLabel>
          <Input
            id='lastName'
            name='lastName'
            type='text'
            value={formData.lastName}
            onChange={handleChange}
            placeholder='Vargas'
          />
        </FormControl>

        <FormControl margin='normal'>
          <InputLabel htmlFor='country'>Estado:</InputLabel>
          <Input
            id='country'
            name='country'
            type='text'
            value={formData.country}
            onChange={handleChange}
            placeholder='Mi Estado'
          />
        </FormControl>

        <FormControl margin='normal'>
          <Input
            id='birth'
            name='birth'
            type='date'
            value={formData.birth.split('T')[0]}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl margin='normal'>
          <Select name='role' id='role' value={`${formData.role}`} onChange={handleChangeSelect}>
            <MenuItem value={'0'}>Administrador</MenuItem>
            <MenuItem value={'1'}>Super Administrador</MenuItem>
          </Select>
        </FormControl>

        <Button variant='contained' type='submit'>
          {submitMessage}
        </Button>
        <Link to='/users'>
          <Button variant='outlined' type='button'>Cancelar</Button>
        </Link>
      </form>
    </Dialog>
  );
};

export default UserForm;