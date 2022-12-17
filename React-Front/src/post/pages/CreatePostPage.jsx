import { useMemo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Button, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText, Chip } from '@mui/material';
import { AttachFileOutlined, Backup, SaveOutlined } from '@mui/icons-material';
import { PostLayout } from '../layout/PostLayout';
import { useForm, usePostStore } from '../../hooks';

const categories = [
    {
        id: 1,
        name: 'Cientificos'
    },
    {
        id: 2,
        name: 'Monografias'
    },
    {
        id: 3,
        name: 'Recreativos'
    },
    {
        id: 4,
        name: 'Ficcion'
    },
    {
        id: 5,
        name: 'Comedia'
    }
];

const formData = {
    title: '',
    description: '',
    categoryId: '',
};

const formValidations = {
    title: [(value) => value.length >= 1, 'El titulo es obligatorio.'],
    description: [(value) => value.length >= 1, 'La descripcion es obligatoria'],
    categoryId: [(value) => value !== '', 'La categoria es obligatoria'],

};

export const CreatePostPage = () => {
    const { subscribed } = useSelector(state => state.auth);
    const { isSaving } = useSelector(state => state.post);
    const { newPost, errorMessage, msgSaved } = usePostStore();

    const isLoading = useMemo(() => isSaving === true, [isSaving]);

    const [formSummited, setFormSubmitted] = useState(false);
    const isSubscribed = useMemo(() => subscribed === true, [subscribed]);

    const {
        formState, title, description, categoryId, onInputChange,
        isFormValid, titleValid, descriptionValid, categoryIdValid,
        onResetForm
    } = useForm(formData, formValidations);

    const [file, setFile] = useState();

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;
        setFile(target.files[0]);
    }

    const onRemoveFile = () => {
        setFile(undefined);
    }



    const onSubmit = (event) => {
        event.preventDefault();

        setFormSubmitted(true);
        if (!isFormValid || file === undefined) return;
        newPost({
            title: title,
            description: description,
            category_id: categoryId,
            archivo: file
        });
        setFormSubmitted(false);
        setFile(undefined);
        onResetForm();

    };

    useEffect(() => {
        if (errorMessage !== null) {
            Swal.fire('Error en la llamada a servicio', errorMessage, 'error');
        }
    }, [errorMessage]);

    useEffect(() => {
        if (msgSaved !== null) {
            Swal.fire('Genial!', msgSaved, 'success');
        }
    }, [msgSaved]);

    return (
        <PostLayout>
            <form onSubmit={onSubmit}>
                <Grid container direction='row' justifyContent='space-between' alignItems='center' px={2}>
                    <Grid item >
                        <Typography fontSize={39} fontWeight='light'>Crear Publicacion</Typography>
                    </Grid>
                    <Grid item >
                        <Button
                            disabled={isLoading || !isSubscribed}
                            type='submit'
                            color='primary'
                            sx={{ padding: 2 }}
                        >
                            <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                            Publicar
                        </Button>
                    </Grid>
                    <Grid container mt={5}>
                        <TextField
                            type='text'
                            variant='filled'
                            fullWidth
                            placeholder='Ingrese un Titulo'
                            label='Titulo'
                            sx={{ border: 'none', mb: 2 }}
                            name='title'
                            value={title}
                            onChange={onInputChange}
                            error={!!titleValid && formSummited}
                            helperText={titleValid}
                        />

                        <TextField
                            type='text'
                            variant='filled'
                            fullWidth
                            multiline
                            placeholder='Descripcion...'
                            label='Descripcion'
                            minRows={5}
                            sx={{ border: 'none', mb: 3 }}
                            name='description'
                            value={description}
                            onChange={onInputChange}
                            error={!!descriptionValid && formSummited}
                            helperText={descriptionValid}
                        />

                        <FormControl fullWidth error={!!categoryIdValid && formSummited}>
                            <InputLabel id='category-select'>Categoria</InputLabel>
                            <Select
                                variant='filled'
                                labelId='category-select'
                                label='Categoria'
                                sx={{ border: 'none', mb: 1 }}
                                name='categoryId'
                                value={categoryId}
                                onChange={onInputChange}
                            >
                                <MenuItem value=''>
                                    <em>None</em>
                                </MenuItem>
                                {
                                    categories.map(option => (
                                        <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                                    ))
                                }
                            </Select>
                            <FormHelperText>{categoryIdValid}</FormHelperText>
                        </FormControl>

                        <Button
                            variant='contained'
                            component='label'
                            endIcon={file === undefined ? <AttachFileOutlined /> : <Backup />}
                            sx={{ mt: 2 }}
                        >
                            {file === undefined ? 'Upload' : 'Cambiar'}
                            <input
                                hidden accept='application/pdf'
                                type='file'
                                onChange={onFileInputChange}
                            />
                        </Button>
                        <Chip
                            label={file === undefined ? 'file.pdf' : file.name}
                            color="success"
                            onDelete={onRemoveFile}
                            sx={{
                                mt: 2.5,
                                mx: 2,
                                display: file === undefined ? 'none' : 'true',
                            }}
                        />
                    </Grid>
                    <Grid item sx={{ display: file === undefined ? 'true' : 'none' }}>
                        <Typography
                            fontSize={12}
                            color={file === undefined && formSummited ? 'red' : 'inherit'}
                            fontWeight='light'
                            sx={{ mt: 1 }}
                        >
                            Debes subir un archivo pdf
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </PostLayout>
    )
}
