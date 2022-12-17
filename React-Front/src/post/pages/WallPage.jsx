import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Search } from '@mui/icons-material';
import { IconButton, TextField, Grid, CircularProgress } from '@mui/material';
import { useForm, usePostStore } from '../../hooks';
import { PostLayout } from '../layout/PostLayout';
import { EmptyHistoryView, SearchResultView } from '../views';



const formData = {
    query: '',
};

export const WallPage = () => {

    const { isSaving } = useSelector(state => state.post);

    const isLoading = useMemo(() => isSaving === true, [isSaving]);

    const [formSummited, setFormSubmitted] = useState(false);

    const { queryResults } = useSelector(state => state.post);
    const { searchPosts } = usePostStore();

    const { query, onInputChange, onResetForm } = useForm(formData);


    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        searchPosts({ query: query });
    };

    useEffect(() => {
        if (!formSummited) {
            searchPosts({ query: query });
        }
    }, [formSummited]);

    return (
        <PostLayout>
            <form onSubmit={onSubmit}>
                <Grid container direction='row' justifyContent='space-evenly' alignItems='center' mt={1}>
                    <Grid item xs={10} sx={{ mt: 2 }}>
                        <TextField
                            label='Buscar...'
                            type='text'
                            fullWidth
                            name='query'
                            value={query}
                            onChange={onInputChange}
                        />
                    </Grid>

                    <IconButton
                        disabled={isLoading}
                        type='submit'
                        size='large'
                        sx={{
                            mt: 1.5,
                            color: 'white',
                            backgroundColor: 'secondary.main',
                            ':hover': { backgroundColor: 'secondary.main', opacity: 0.8 }
                        }}
                    >
                        <Search sx={{ fontSize: 30 }} />
                    </IconButton>
                </Grid>
            </form>

            {
                queryResults.length == 0
                    ? (<EmptyHistoryView />)
                    : isLoading
                        ? (
                            <Grid container
                                direction='row'
                                justifyContent='center'
                                sx={{ mt: 10 }}
                            >
                                <CircularProgress color='primary' />
                            </Grid>
                        )
                        : (<SearchResultView result={queryResults} />)
            }
        </PostLayout >
    )
}
