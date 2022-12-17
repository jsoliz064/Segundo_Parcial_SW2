import { CloudOff } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'

export const NoPostsView = () => {
    return (
        <Grid
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{ my: 5 }}
        >
            <Grid item xs={12}>
                <CloudOff sx={{ fontSize: 80 }} />
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h5'>Todavia no tienes publicaciones </Typography>
            </Grid>
        </Grid>
    )
}
