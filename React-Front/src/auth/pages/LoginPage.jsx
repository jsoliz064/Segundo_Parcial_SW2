import { useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useAuthStore, useForm } from '../../hooks/';

const formData = {
    email: 'danie@gmail.com',
    password: '1234'
};



export const LoginPage = () => {

    const { status } = useSelector(state => state.auth);
    const { startLogin, errorMessage } = useAuthStore();

    const { email, password, onInputChange, formState } = useForm(formData);

    const isAuthenricating = useMemo(() => status === 'checking', [status]);

    const onSubmit = (event) => {
        event.preventDefault();
        startLogin({ email: email, password: password });
    }

    useEffect(() => {
        if (errorMessage !== null) {
            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }
    }, [errorMessage]);


    return (
        <AuthLayout title='Login'>

            <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Correo'
                            type='email'
                            placeholder='correo@google.com'
                            fullWidth
                            name='email'
                            value={email}
                            onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Contraseña'
                            type='password'
                            placeholder='Contraseña'
                            fullWidth
                            name='password'
                            value={password}
                            onChange={onInputChange}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ my: 2 }}>
                    <Grid item xs={12}>
                        <Button
                            disabled={isAuthenricating}
                            type='submit'
                            variant='contained'
                            fullWidth>
                            Login
                        </Button>
                    </Grid>

                </Grid>
                <Grid container direction='row' justifyContent='end'>
                    <Link component={RouterLink} color='inherit' to='/auth/register'>
                        Crear una cuenta
                    </Link>
                </Grid>
            </form>
        </AuthLayout>

    )
}
