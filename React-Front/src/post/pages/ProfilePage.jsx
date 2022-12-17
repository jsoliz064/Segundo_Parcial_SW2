import { Button, Grid, Input, TextField, Typography, Box, Avatar } from '@mui/material';
import { PhotoCamera, SaveOutlined } from '@mui/icons-material';
import { PostLayout } from '../layout/PostLayout';
import { useSelector } from 'react-redux';


export const ProfilePage = () => {

    const { email, displayName } = useSelector(state => state.auth);
    return (
        <PostLayout>

            <Grid container direction='row' justifyContent='space-between' alignItems='center' px={2} mb={2}>
                <Grid item >
                    <Typography fontSize={39} fontWeight='light'>Perfil</Typography>
                </Grid>
                <Grid item >
                    <Button color='primary' sx={{ padding: 2 }}>
                        <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                        Guardar
                    </Button>
                </Grid>
            </Grid>


            <Grid container my={5} justifyContent='center' >

                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    label='Nombre'
                    value={displayName}
                    sx={{ border: 'none', mb: 1 }}
                />

                <TextField
                    type='email'
                    variant='filled'
                    fullWidth
                    label='Correo'
                    value={email}
                    minRows={5}
                    sx={{ border: 'none', mb: 1 }}
                />

                <TextField
                    type='password'
                    variant='filled'
                    fullWidth
                    label='Contraseña'
                    minRows={5}
                    sx={{ border: 'none', mb: 1 }}
                />

                <TextField
                    type='password'
                    variant='filled'
                    fullWidth
                    label='Nueva Contraseña'
                    minRows={5}
                    sx={{ border: 'none', mb: 1 }}
                />

            </Grid>

        </PostLayout>
    )
}
