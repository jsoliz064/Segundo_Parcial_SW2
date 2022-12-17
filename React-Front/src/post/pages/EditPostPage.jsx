import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Button, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText, Chip } from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';
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



const formValidations = {
    title: [(value) => value.length >= 1, 'El titulo es obligatorio.'],
    description: [(value) => value.length >= 1, 'La descripcion es obligatoria'],
    categoryId: [(value) => value !== '', 'La categoria es obligatoria'],
};

export const EditPostPage = () => {

    const { isSaving, active: post } = useSelector(state => state.post);
    const { editPost, errorMessage, msgSaved } = usePostStore();

    const isLoading = useMemo(() => isSaving === true, [isSaving]);

    const [formSummited, setFormSubmitted] = useState(false);

    const {
        formState, id, title, description, category_id, onInputChange,
        isFormValid, titleValid, descriptionValid, categoryIdValid
    } = useForm(post, formValidations);


    const onSubmit = (event) => {
        event.preventDefault();

        setFormSubmitted(true);
        if (!isFormValid) return;
        editPost({
            id: id,
            title: title,
            description: description,
            category_id: category_id
        });
        setFormSubmitted(false);

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
                        <Typography fontSize={39} fontWeight='light'>Editar Publicacion</Typography>
                    </Grid>
                    <Grid item >
                        <Button
                            disabled={isLoading}
                            type='submit'
                            color='primary'
                            sx={{ padding: 2 }}
                        >
                            <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                            Guardar
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
                                value={category_id}
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


                    </Grid>

                </Grid>
            </form>
        </PostLayout>
    )
}
