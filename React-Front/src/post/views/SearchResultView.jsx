import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Card, CardContent, CardActions, Button } from '@mui/material';
import { setActivePost } from '../../store';
import { toCapitalizedSentence, getCategoryName } from '../../helpers';

import TimeAgo from 'react-timeago';
import spanishStrings from 'react-timeago/lib/language-strings/es';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

const formatter = buildFormatter(spanishStrings);

export const SearchResultView = ({ result }) => {

    const dispatch = useDispatch();
    const { subscribed } = useSelector(state => state.auth);
    const { isSaving } = useSelector(state => state.post);

    const isLoading = useMemo(() => isSaving === true, [isSaving]);
    const isSubscribed = useMemo(() => subscribed === true, [subscribed]);



    const navigate = useNavigate();
    const onOpenClick = (element) => {
        dispatch(setActivePost(element));
        navigate('/viewer');
    };



    return (
        <Grid container justifyContent='start' mt={3} ml={7}>
            {
                result.map(element => (
                    <Card key={element.id} variant="outlined" sx={{ width: 300, m: 2, backgroundColor: 'disable.main' }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {toCapitalizedSentence(element.title)}
                            </Typography>
                            <Typography variant="body2" sx={{ my: 0.5 }}>
                                {element.description}
                            </Typography>
                            <Typography variant='caption' component="div" color="text.secondary">
                                {getCategoryName(element.category_id)}
                            </Typography>
                            <Typography sx={{ my: 1 }} color="text.secondary">
                                Author: {element.user?.name}
                            </Typography>
                            <Typography variant='caption' color="text.secondary">
                                <TimeAgo date={element.createdAt} formatter={formatter} />
                            </Typography>
                        </CardContent>
                        <CardActions
                            sx={{ m: 0, pb: 0.5 }}
                        >
                            <Button
                                disabled={isLoading || !isSubscribed}
                                size='small'
                                onClick={() => onOpenClick(element)}
                            >
                                Abrir
                            </Button>
                        </CardActions>
                    </Card>

                ))
            }
        </Grid>
    )
}
