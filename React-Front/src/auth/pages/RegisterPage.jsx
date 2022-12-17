import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm, useAuthStore } from '../../hooks';

const formData = {
    email: 'fernando@gmail.com',
    password: '1234',
    displayName: 'Fernando Herrera'
};
const formValidations = {
    email: [(value) => value.includes('@'), 'El email debe tener @.'],
    password: [(value) => value.length >= 4, 'El password debe de tener mas de 6 caracteres.'],
    displayName: [(value) => value.length >= 1, 'El nombre es obligatorio.'],
};

export const RegisterPage = () => {

    const { status } = useSelector(state => state.auth);
    const [formSummited, setFormSubmitted] = useState(false);
    const { startRegister, errorMessage } = useAuthStore();
    const isAuthenricating = useMemo(() => status === 'checking', [status]);
    const {
        formState, displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid,
    } = useForm(formData, formValidations);

    const onSubmit = (event) => {
        event.preventDefault();

        setFormSubmitted(true);
        if (!isFormValid) return;

        startRegister({ email: email, password: password, name: displayName });
    };

    useEffect(() => {
        if (errorMessage !== null) {
            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }
    }, [errorMessage]);


    return (
        <AuthLayout title='Crear Cuenta'>
            <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Nombre Completo'
                            type='text'
                            placeholder='e.j Fernando Herrera'
                            fullWidth
                            name='displayName'
                            value={displayName}
                            onChange={onInputChange}
                            error={!!displayNameValid && formSummited}
                            helperText={displayNameValid}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Correo'
                            type='email'
                            placeholder='correo@google.com'
                            fullWidth
                            name='email'
                            value={email}
                            onChange={onInputChange}
                            error={!!emailValid && formSummited}
                            helperText={emailValid}
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
                            error={!!passwordValid && formSummited}
                            helperText={passwordValid}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ my: 2 }}>
                    <Grid item xs={12}>
                        <Button
                            disabled={isAuthenricating}
                            type='submit'
                            variant='contained'
                            fullWidth
                        >
                            Crear Cuenta
                        </Button>
                    </Grid>

                </Grid>
                <Grid container direction='row' justifyContent='end'>
                    <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
                    <Link component={RouterLink} color='inherit' to='/auth/login'>
                        Ingresar
                    </Link>
                </Grid>
            </form>
        </AuthLayout>

    )
}
