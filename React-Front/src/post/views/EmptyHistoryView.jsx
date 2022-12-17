import { RunningWithErrors, StartOutlined } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'

export const EmptyHistoryView = () => {
    return (
        <Grid
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{ minHeight: 'calc(100vh - 110px)' }}
        >
            <Grid item xs={12}>
                <RunningWithErrors sx={{ fontSize: 100 }} />
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h5'>No se encontraron resultados </Typography>
            </Grid>
        </Grid>
    )
}
